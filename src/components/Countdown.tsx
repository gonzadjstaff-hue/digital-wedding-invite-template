import { useEffect, useMemo, useState } from "react";

import type { WeddingData } from "../data/wedding";
import { Section } from "./Section";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  finished: boolean;
};

type CountdownProps = {
  wedding: WeddingData;
};

export function Countdown({ wedding }: CountdownProps) {
  const eventTime = useMemo(
    () => new Date(wedding.event.isoDate).getTime(),
    [wedding.event.isoDate],
  );
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(eventTime));

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTimeLeft(getTimeLeft(eventTime));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [eventTime]);

  return (
    <Section className="countdown-section">
      <div className="narrow center">
        <p className="eyebrow">{wedding.copy.countdownTitle}</p>
        {timeLeft.finished ? (
          <p className="countdown-finished">{wedding.copy.countdownFinished}</p>
        ) : (
          <div className="countdown-grid">
            <CountdownItem label={wedding.copy.countdownUnits.days} value={timeLeft.days} />
            <CountdownItem label={wedding.copy.countdownUnits.hours} value={timeLeft.hours} />
            <CountdownItem label={wedding.copy.countdownUnits.minutes} value={timeLeft.minutes} />
            <CountdownItem label={wedding.copy.countdownUnits.seconds} value={timeLeft.seconds} />
          </div>
        )}
      </div>
    </Section>
  );
}

function CountdownItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="countdown-item">
      <span>{String(value).padStart(2, "0")}</span>
      <small>{label}</small>
    </div>
  );
}

function getTimeLeft(eventTime: number): TimeLeft {
  const diff = Math.max(0, eventTime - Date.now());

  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
    finished: diff <= 0,
  };
}
