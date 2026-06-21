export type RsvpMode = "whatsapp" | "googleSheets" | "sheetsAndWhatsApp";

export type WeddingData = {
  couple: {
    bride: string;
    groom: string;
    initials: string;
  };
  event: {
    isoDate: string;
    displayDate: string;
    heroDateParts: string[];
    venue: string;
    address: string[];
    googleMapsUrl: string;
    dressCode: {
      title: string;
      lines: string[];
    };
  };
  copy: {
    envelopeEyebrow: string;
    envelopeHint: string;
    heroEyebrow: string;
    scrollHint: string;
    introQuote: string;
    introText: string;
    countdownTitle: string;
    countdownFinished: string;
    countdownUnits: {
      days: string;
      hours: string;
      minutes: string;
      seconds: string;
    };
    storyEyebrow: string;
    storyTitle: string;
    storyText: string;
    galleryAlt: string;
    scheduleEyebrow: string;
    scheduleTitle: string;
    details: {
      venueLabel: string;
      mapCta: string;
      dressCodeLabel: string;
      giftLabel: string;
    };
    rsvp: {
      eyebrow: string;
      title: string;
      deadline: string;
      success: string;
      error: string;
      configError: string;
      submit: string;
      sending: string;
      whatsappCta: string;
      whatsappOnlyCta: string;
      requiredHint: string;
      fields: {
        fullName: string;
        phone: string;
        attendance: string;
        guests: string;
        dietary: string;
        comment: string;
      };
      placeholders: {
        fullName: string;
        phone: string;
        dietary: string;
        comment: string;
      };
      attendanceOptions: {
        yes: string;
        no: string;
      };
      whatsappMessage: {
        greeting: string;
        fullName: string;
        phone: string;
        attendance: string;
        yes: string;
        no: string;
        guests: string;
        dietary: string;
        comment: string;
        empty: string;
      };
    };
    footerText: string;
  };
  itinerary: Array<{
    time: string;
    title: string;
    place: string;
  }>;
  gifts?: {
    title: string;
    lines: string[];
  };
  images: {
    hero: string;
    story: string;
    gallery: string[];
  };
  rsvp: {
    mode: RsvpMode;
    googleScriptUrl: string;
    whatsappNumber: string;
  };
};

export const wedding: WeddingData = {
  couple: {
    bride: "Sofía",
    groom: "Mateo",
    initials: "S&M",
  },
  event: {
    isoDate: "2026-12-12T20:00:00-03:00",
    displayDate: "12 de diciembre de 2026",
    heroDateParts: ["12", "12", "2026"],
    venue: "Hacienda El Olivar",
    address: ["Camino de los Cipreses 14", "Valle de los Pinos"],
    googleMapsUrl: "https://maps.google.com",
    dressCode: {
      title: "Formal · tonos tierra",
      lines: ["Damas: vestido largo", "Caballeros: traje claro"],
    },
  },
  copy: {
    envelopeEyebrow: "Una invitación para ti",
    envelopeHint: "Toca el sobre para abrir",
    heroEyebrow: "Nos casamos",
    scrollHint: "Desliza",
    introQuote:
      "Y de pronto, supimos que el resto del mundo podía esperar, porque ya estábamos donde queríamos estar.",
    introText: "Con la bendición de nuestras familias nos complace invitarte",
    countdownTitle: "Cuenta regresiva",
    countdownFinished: "Hoy celebramos",
    countdownUnits: {
      days: "días",
      hours: "hrs",
      minutes: "min",
      seconds: "seg",
    },
    storyEyebrow: "Nuestra historia",
    storyTitle: "Un café, una mirada, para siempre",
    storyText:
      "Nos conocimos un martes cualquiera de octubre. Cinco años después, en el mismo café, una pregunta cambió el rumbo de todo. Hoy queremos que formes parte del siguiente capítulo.",
    galleryAlt: "Momentos de la pareja",
    scheduleEyebrow: "El día",
    scheduleTitle: "Itinerario",
    details: {
      venueLabel: "Lugar",
      mapCta: "Ver en mapa",
      dressCodeLabel: "Código de vestimenta",
      giftLabel: "Mesa de regalos",
    },
    rsvp: {
      eyebrow: "Confirma tu asistencia",
      title: "Te esperamos",
      deadline: "Antes del 1 de agosto, 2026",
      success: "¡Gracias! Tu respuesta fue registrada correctamente.",
      error: "No pudimos registrar tu respuesta. Intenta nuevamente en unos minutos.",
      configError:
        "Falta configurar la URL de Google Apps Script en src/data/wedding.ts.",
      submit: "Confirmar asistencia",
      sending: "Registrando...",
      whatsappCta: "Enviar también por WhatsApp",
      whatsappOnlyCta: "Enviar por WhatsApp",
      requiredHint: "Los campos marcados son necesarios para confirmar.",
      fields: {
        fullName: "Nombre y apellido",
        phone: "Teléfono",
        attendance: "¿Asistirás?",
        guests: "Cantidad de acompañantes",
        dietary: "Restricción alimentaria",
        comment: "Comentario opcional",
      },
      placeholders: {
        fullName: "Tu nombre completo",
        phone: "Ej. +54 9 11 1234 5678",
        dietary: "Ej. vegetariano, celíaco, sin restricciones",
        comment: "Algo que quieras contarnos",
      },
      attendanceOptions: {
        yes: "Sí, asistiré",
        no: "No podré asistir",
      },
      whatsappMessage: {
        greeting: "Hola, somos invitados de la boda de",
        fullName: "Nombre",
        phone: "Teléfono",
        attendance: "Asistencia",
        yes: "Sí",
        no: "No",
        guests: "Acompañantes",
        dietary: "Restricción alimentaria",
        comment: "Comentario",
        empty: "-",
      },
    },
    footerText: "Con amor",
  },
  itinerary: [
    { time: "17:00", title: "Ceremonia", place: "Iglesia San Miguel" },
    { time: "18:30", title: "Cóctel de bienvenida", place: "Jardín de los olivos" },
    { time: "20:00", title: "Cena", place: "Salón principal" },
    { time: "22:00", title: "Baile", place: "Hasta que el cuerpo aguante" },
  ],
  gifts: {
    title: "Tu presencia es nuestro mejor regalo",
    lines: ["Si deseas obsequiarnos algo más,", "encuentra los detalles abajo."],
  },
  images: {
    hero: "/images/couple-1.jpg",
    story: "/images/couple-3.jpg",
    gallery: [
      "/images/couple-2.jpg",
      "/images/wedding-details.jpg",
      "/images/couple-1.jpg",
      "/images/couple-3.jpg",
    ],
  },
  rsvp: {
    mode: "sheetsAndWhatsApp",
    googleScriptUrl:
      "https://script.google.com/macros/s/AKfycbztWm0UjTI0T15RIjrhC7zRgVIS2Z1A7tvyjeUmFi3arXd0Sh1tT55Q5y7hLi9L2Sxytw/exec",
    whatsappNumber: "549XXXXXXXXXX",
  },
};
