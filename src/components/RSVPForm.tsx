import { useMemo, useState, type FormEvent, type ReactNode } from "react";

import type { WeddingData } from "../data/wedding";
import { Section } from "./Section";

type FormState = {
  fullName: string;
  phone: string;
  attendance: "yes" | "no";
  guests: string;
  dietary: string;
  comment: string;
};

type RSVPFormProps = {
  wedding: WeddingData;
};

const initialForm: FormState = {
  fullName: "",
  phone: "",
  attendance: "yes",
  guests: "0",
  dietary: "",
  comment: "",
};

export function RSVPForm({ wedding }: RSVPFormProps) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const needsSheets = wedding.rsvp.mode !== "whatsapp";
  const usesWhatsapp = wedding.rsvp.mode !== "googleSheets";
  const whatsappUrl = useMemo(() => buildWhatsappUrl(wedding, form), [wedding, form]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (wedding.rsvp.mode === "whatsapp") {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      setStatus("success");
      return;
    }

    if (!isConfiguredScriptUrl(wedding.rsvp.googleScriptUrl)) {
      setStatus("error");
      setErrorMessage(wedding.copy.rsvp.configError);
      return;
    }

    setStatus("saving");

    try {
      const payload = {
        timestamp: new Date().toISOString(),
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        attendance: form.attendance === "yes" ? "sí" : "no",
        guests: Number(form.guests || 0),
        dietary: form.dietary.trim(),
        comment: form.comment.trim(),
      };

      const response = await fetch(wedding.rsvp.googleScriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Google Sheets responded with ${response.status}`);
      }

      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage(wedding.copy.rsvp.error);
    }
  }

  function updateField(name: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  return (
    <Section className="rsvp-section">
      <div className="narrow center">
        <p className="eyebrow">{wedding.copy.rsvp.eyebrow}</p>
        <h2>{wedding.copy.rsvp.title}</h2>

        {status === "success" ? (
          <div className="success-panel">
            <p>{wedding.copy.rsvp.success}</p>
            {usesWhatsapp && (
              <a className="button secondary-button" href={whatsappUrl} target="_blank" rel="noreferrer">
                {wedding.copy.rsvp.whatsappCta}
              </a>
            )}
          </div>
        ) : (
          <form className="rsvp-form" onSubmit={handleSubmit}>
            <p className="form-hint">{wedding.copy.rsvp.requiredHint}</p>

            <Field label={wedding.copy.rsvp.fields.fullName}>
              <input
                required
                value={form.fullName}
                placeholder={wedding.copy.rsvp.placeholders.fullName}
                onChange={(event) => updateField("fullName", event.target.value)}
              />
            </Field>

            <Field label={wedding.copy.rsvp.fields.phone}>
              <input
                required
                value={form.phone}
                placeholder={wedding.copy.rsvp.placeholders.phone}
                onChange={(event) => updateField("phone", event.target.value)}
              />
            </Field>

            <Field label={wedding.copy.rsvp.fields.attendance}>
              <select
                value={form.attendance}
                onChange={(event) => updateField("attendance", event.target.value)}
              >
                <option value="yes">{wedding.copy.rsvp.attendanceOptions.yes}</option>
                <option value="no">{wedding.copy.rsvp.attendanceOptions.no}</option>
              </select>
            </Field>

            <Field label={wedding.copy.rsvp.fields.guests}>
              <input
                type="number"
                min="0"
                max="10"
                value={form.guests}
                onChange={(event) => updateField("guests", event.target.value)}
              />
            </Field>

            <Field label={wedding.copy.rsvp.fields.dietary}>
              <input
                value={form.dietary}
                placeholder={wedding.copy.rsvp.placeholders.dietary}
                onChange={(event) => updateField("dietary", event.target.value)}
              />
            </Field>

            <Field label={wedding.copy.rsvp.fields.comment}>
              <textarea
                rows={4}
                value={form.comment}
                placeholder={wedding.copy.rsvp.placeholders.comment}
                onChange={(event) => updateField("comment", event.target.value)}
              />
            </Field>

            {status === "error" && <p className="form-error">{errorMessage}</p>}

            <button className="button primary-button" type="submit" disabled={status === "saving"}>
              {status === "saving"
                ? wedding.copy.rsvp.sending
                : needsSheets
                  ? wedding.copy.rsvp.submit
                  : wedding.copy.rsvp.whatsappOnlyCta}
            </button>
          </form>
        )}

        <p className="deadline">{wedding.copy.rsvp.deadline}</p>
      </div>
    </Section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function buildWhatsappUrl(wedding: WeddingData, form: FormState) {
  const text = wedding.copy.rsvp.whatsappMessage;
  const empty = text.empty;
  const lines = [
    `${text.greeting} ${wedding.couple.bride} y ${wedding.couple.groom}.`,
    `${text.fullName}: ${form.fullName || empty}`,
    `${text.phone}: ${form.phone || empty}`,
    `${text.attendance}: ${form.attendance === "yes" ? text.yes : text.no}`,
    `${text.guests}: ${form.guests || "0"}`,
    `${text.dietary}: ${form.dietary || empty}`,
    `${text.comment}: ${form.comment || empty}`,
  ];

  return `https://wa.me/${wedding.rsvp.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
}

function isConfiguredScriptUrl(url: string) {
  return url.startsWith("https://script.google.com/macros/s/") && !url.includes("XXXX");
}
