# Google Sheets RSVP

Esta invitación usa Google Sheets como fuente principal para registrar confirmaciones. WhatsApp queda como envío opcional después de guardar la respuesta.

## 1. Crear la planilla

1. Crea una Google Sheet nueva.
2. Renombra la primera hoja como `RSVP`.
3. Agrega esta fila de encabezados en la fila 1:

```text
timestamp | nombre y apellido | teléfono | asistencia | acompañantes | restricción alimentaria | comentario
```

## 2. Crear Apps Script

1. En la planilla, abre `Extensiones > Apps Script`.
2. Borra el contenido inicial.
3. Pega este código completo:

```js
const SHEET_NAME = "RSVP";

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      return jsonResponse({ ok: false, error: "Sheet not found" }, 500);
    }

    const data = JSON.parse(e.postData.contents || "{}");

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.fullName || "",
      data.phone || "",
      data.attendance || "",
      data.guests || 0,
      data.dietary || "",
      data.comment || "",
    ]);

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) }, 500);
  }
}

function jsonResponse(payload, statusCode) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 3. Desplegar como Web App

1. Haz clic en `Implementar > Nueva implementación`.
2. Selecciona el tipo `Aplicación web`.
3. Configura:
   - `Ejecutar como`: tú.
   - `Quién tiene acceso`: cualquier usuario.
4. Haz clic en `Implementar`.
5. Autoriza los permisos.
6. Copia la URL de la Web App.

## 4. Pegar la URL en la invitación

Abre `src/data/wedding.ts` y reemplaza:

```ts
googleScriptUrl: "https://script.google.com/macros/s/XXXX/exec",
```

por la URL real de Apps Script.

## 5. Configurar el modo RSVP

En `src/data/wedding.ts`, `rsvp.mode` soporta:

```ts
mode: "whatsapp"
mode: "googleSheets"
mode: "sheetsAndWhatsApp"
```

Recomendado:

```ts
mode: "sheetsAndWhatsApp"
```

Con ese modo:

1. El invitado completa el formulario.
2. La respuesta se guarda en Google Sheets.
3. Se muestra el mensaje de éxito.
4. Recién después aparece el botón para enviar también por WhatsApp.

## 6. Probar

1. Ejecuta la app con `npm run dev`.
2. Completa el formulario RSVP.
3. Envía una respuesta.
4. Verifica que aparezca en la hoja `RSVP`.
5. Si usas `sheetsAndWhatsApp`, prueba el botón de WhatsApp después del éxito.

Si aparece el error de configuración, revisa que la URL de Apps Script no siga usando `XXXX`.
