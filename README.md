# Digital Wedding Invite

Invitación digital estática creada con Vite, React y TypeScript. Incluye sobre animado, hero, cuenta regresiva real, historia, galería, itinerario, detalles del evento, RSVP con Google Sheets y WhatsApp opcional.

## Stack

- Vite
- React
- TypeScript
- CSS propio
- Google Apps Script para guardar RSVP en Google Sheets

Plantilla estática desarrollada con Vite + React + TypeScript, pensada para deploy simple como sitio estático.

## Estructura

```text
index.html
src/
  main.tsx
  App.tsx
  styles.css
  data/
    wedding.ts
  components/
    Countdown.tsx
    Envelope.tsx
    RSVPForm.tsx
    Section.tsx
public/
  images/
README.md
GOOGLE_SHEETS_RSVP.md
vercel.json
vite.config.ts
```

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Build

```bash
npm run build
```

El build final se genera en `dist/`.

## Preview local

```bash
npm run preview
```

## Deploy en Vercel

1. Importa el repositorio en Vercel.
2. Framework: `Vite`.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Publica el proyecto.

`vercel.json` ya contiene esa configuración básica.

## Cambiar datos de la boda

Edita `src/data/wedding.ts`.

Ahí están centralizados:

- novia
- novio
- iniciales
- fecha ISO del evento
- fecha visible
- lugar
- dirección
- Google Maps
- dress code
- frase destacada
- historia
- itinerario
- datos de regalo opcionales
- imágenes
- configuración RSVP

## Cambiar fecha del countdown

En `src/data/wedding.ts`, modifica:

```ts
isoDate: "2026-12-12T20:00:00-03:00",
```

Usa una fecha ISO con zona horaria para evitar diferencias entre navegadores.

## Cambiar fotos

1. Copia tus imágenes en `public/images/`.
2. Actualiza las rutas en `src/data/wedding.ts`.

Ejemplo:

```ts
hero: "/images/mi-foto-principal.jpg",
```

No hay imágenes externas.

## Configurar Google Sheets RSVP

Lee `GOOGLE_SHEETS_RSVP.md`.

Resumen:

1. Crea una Google Sheet.
2. Agrega las columnas requeridas.
3. Crea un Apps Script con `doPost`.
4. Despliega como Web App.
5. Pega la URL en `src/data/wedding.ts`.

## Configurar WhatsApp

En `src/data/wedding.ts`, cambia:

```ts
whatsappNumber: "549XXXXXXXXXX",
```

Usa el número en formato internacional, sin `+`, espacios ni guiones.

## Modos RSVP

```ts
mode: "whatsapp"
mode: "googleSheets"
mode: "sheetsAndWhatsApp"
```

Recomendado:

```ts
mode: "sheetsAndWhatsApp"
```

Con ese modo, Google Sheets es la fuente principal y WhatsApp aparece como acción opcional después de guardar.

## Columnas Google Sheets

```text
timestamp
nombre y apellido
teléfono
asistencia
acompañantes
restricción alimentaria
comentario
```

## Notas

- No hay SSR.
- No hay backend propio.
- No hay autoenvío de WhatsApp.
- La confirmación por WhatsApp solo se abre cuando el invitado toca el botón.
- Si la fecha del evento ya pasó, el countdown muestra el estado final configurado en `wedding.ts`.
