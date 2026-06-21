import { useEffect, useState } from "react";

import { Countdown } from "./components/Countdown";
import { Envelope } from "./components/Envelope";
import { RSVPForm } from "./components/RSVPForm";
import { Divider, Section } from "./components/Section";
import { wedding } from "./data/wedding";

export default function App() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.body.style.overflow = opened ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [opened]);

  return (
    <main>
      {!opened && <Envelope wedding={wedding} onOpen={() => setOpened(true)} />}
      <Invitation />
    </main>
  );
}

function Invitation() {
  return (
    <div className="page">
      <Hero />
      <Intro />
      <Countdown wedding={wedding} />
      <Story />
      <Gallery />
      <Schedule />
      <Details />
      <RSVPForm wedding={wedding} />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="hero grain">
      <img src={wedding.images.hero} alt="" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="hero-eyebrow">{wedding.copy.heroEyebrow}</p>
        <h1>{wedding.couple.bride}</h1>
        <span>&amp;</span>
        <h1>{wedding.couple.groom}</h1>
        <div className="hero-date">
          {wedding.event.heroDateParts.map((part) => (
            <span key={part}>{part}</span>
          ))}
        </div>
      </div>
      <div className="scroll-hint">
        <span>{wedding.copy.scrollHint}</span>
        <i />
      </div>
    </section>
  );
}

function Intro() {
  return (
    <Section className="intro-section">
      <div className="narrow center">
        <p className="quote">“{wedding.copy.introQuote}”</p>
        <Divider />
        <p className="intro-copy">{wedding.copy.introText}</p>
      </div>
    </Section>
  );
}

function Story() {
  return (
    <Section className="story-section">
      <div className="narrow center">
        <p className="eyebrow">{wedding.copy.storyEyebrow}</p>
        <h2>{wedding.copy.storyTitle}</h2>
        <img src={wedding.images.story} alt={wedding.copy.storyTitle} loading="lazy" />
        <p className="story-copy">{wedding.copy.storyText}</p>
      </div>
    </Section>
  );
}

function Gallery() {
  return (
    <Section className="gallery-section">
      <div className="gallery-grid">
        {wedding.images.gallery.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`${wedding.copy.galleryAlt} ${index + 1}`}
            loading="lazy"
            className={index % 3 === 0 ? "portrait" : ""}
          />
        ))}
      </div>
    </Section>
  );
}

function Schedule() {
  return (
    <Section className="schedule-section">
      <div className="narrow center">
        <p className="eyebrow">{wedding.copy.scheduleEyebrow}</p>
        <h2>{wedding.copy.scheduleTitle}</h2>
        <ul className="schedule-list">
          {wedding.itinerary.map((item) => (
            <li key={`${item.time}-${item.title}`}>
              <span>{item.time}</span>
              <div>
                <p>{item.title}</p>
                <small>{item.place}</small>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function Details() {
  return (
    <Section className="details-section">
      <div className="details-grid">
        <InfoCard
          label={wedding.copy.details.venueLabel}
          title={wedding.event.venue}
          lines={wedding.event.address}
          cta={{ href: wedding.event.googleMapsUrl, text: wedding.copy.details.mapCta }}
        />
        <InfoCard
          label={wedding.copy.details.dressCodeLabel}
          title={wedding.event.dressCode.title}
          lines={wedding.event.dressCode.lines}
        />
        {wedding.gifts && (
          <InfoCard
            label={wedding.copy.details.giftLabel}
            title={wedding.gifts.title}
            lines={wedding.gifts.lines}
          />
        )}
      </div>
    </Section>
  );
}

function InfoCard({
  label,
  title,
  lines,
  cta,
}: {
  label: string;
  title: string;
  lines: string[];
  cta?: { href: string; text: string };
}) {
  return (
    <article className="info-card">
      <span>{label}</span>
      <h3>{title}</h3>
      {lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
      {cta && (
        <a href={cta.href} target="_blank" rel="noreferrer">
          {cta.text}
        </a>
      )}
    </article>
  );
}

function Footer() {
  return (
    <footer className="footer grain">
      <div>{wedding.couple.initials}</div>
      <p>
        {wedding.copy.footerText} · {wedding.event.displayDate}
      </p>
    </footer>
  );
}
