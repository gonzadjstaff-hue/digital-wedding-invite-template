import { useEffect, useState, type CSSProperties } from "react";

import type { WeddingData } from "../data/wedding";

type EnvelopeProps = {
  wedding: WeddingData;
  onOpen: () => void;
};

export function Envelope({ wedding, onOpen }: EnvelopeProps) {
  const [opening, setOpening] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(800);

  useEffect(() => {
    setViewportHeight(window.innerHeight);
  }, []);

  function handleOpen() {
    setOpening(true);
    window.setTimeout(onOpen, 1500);
  }

  return (
    <div className={`envelope-screen ${opening ? "is-opening" : ""}`}>
      <p className="envelope-eyebrow">{wedding.copy.envelopeEyebrow}</p>

      <button
        className="envelope"
        style={{ "--lift-height": `-${viewportHeight}px` } as CSSProperties}
        type="button"
        onClick={handleOpen}
        aria-label={wedding.copy.envelopeHint}
      >
        <span className="envelope-body" />
        <span className="envelope-lines" />
        <span className="envelope-bottom" />
        <span className="envelope-flap" />
        <span className="wax-seal">
          <span>{wedding.couple.initials}</span>
        </span>
      </button>

      <p className="envelope-hint">{wedding.copy.envelopeHint}</p>
    </div>
  );
}
