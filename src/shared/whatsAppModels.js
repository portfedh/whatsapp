/**
 * whatsAppModels.js
 *
 * PRODUCTION MESSAGE TEMPLATES
 *
 * This file contains the actual message templates actively used by the Salsa Candela chatbot.
 * These functions are called by processMessage.js to generate responses based on user keywords.
 *
 * Key functions:
 * - messageText(): Simple text responses
 * - messageList(): Interactive list menus for course selection
 * - messageComprar(): Button-based purchase flow
 * - messageLocation(): Share business location with users
 *
 * Note: For reference examples of other WhatsApp message types (images, videos, audio, etc.),
 * see sampleModels.js instead.
 */

/**
 * Generates a WhatsApp text message payload for the bot use case.
 * @param {string} textResponse - The text to send
 * @param {string} number - The recipient's WhatsApp number
 * @returns {string} JSON string payload
 */
function messageText(textResponse, number) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: number,
    type: "text",
    text: {
      preview_url: true,
      body: textResponse,
    },
  });
  return data;
}

/**
 * Generates a WhatsApp interactive list message payload for the bot use case.
 * @param {string} number - The recipient's WhatsApp number
 * @returns {string} JSON string payload
 */
function messageList(number) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: number,
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: "Selecciona uno de nuestros talleres:",
      },
      body: {
        text: "Talleres Disponibles",
      },
      footer: {
        text: "Salsa Candela",
      },
      action: {
        sections: [
          {
            title: "Talleres de baile",
            rows: [
              {
                id: "S",
                title: "Salsa",
                description: "Taller de 5 semanas",
              },
              {
                id: "B",
                title: "Bachata",
                description: "Taller de 5 semanas",
              },
              {
                id: "M",
                title: "Movimiento Corporal",
                description: "Taller de 5 semanas",
              },
              /* Additional rows would go here*/
            ],
          },
          /* Additional sections would go here */
        ],
        button: "Seleccionar Opción",
      },
    },
  });
  return data;
}

/**
 * Generates a WhatsApp interactive button message payload for course selection.
 * @param {string} number - The recipient's WhatsApp number
 * @returns {string} JSON string payload
 */
function messageComprar(number) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: number,
    type: "interactive",
    interactive: {
      type: "button",
      body: {
        text: "Selecciona uno de los cursos:",
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: "option-salsa",
              title: "Salsa",
            },
          },
          {
            type: "reply",
            reply: {
              id: "option-bachata",
              title: "Bachata",
            },
          },
        ],
      },
    },
  });
  return data;
}

/**
 * Generates a WhatsApp location message payload for the bot use case.
 * @param {string} number - The recipient's WhatsApp number
 * @returns {string} JSON string payload
 */
function messageLocation(number) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: number,
    type: "location",
    location: {
      latitude: "19.390611106716637",
      longitude: "-99.14289041155234",
      name: "Salsa Candela Xola",
      address:
        "Estafetas 99, Postal, Benito Juárez, 03410 Ciudad de México, CDMX",
    },
  });
  return data;
}

/**
 * Generates a WhatsApp image message with party event details.
 * Note: Update the image link with your actual hosted image URL.
 * Place your event image in: assets/images/fiesta-event.jpg
 * Then host it or use WhatsApp's media upload API.
 * @param {string} number - The recipient's WhatsApp number
 * @returns {string} JSON string payload
 */
function messageFiesta(number) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: number,
    type: "image",
    image: {
      link: "https://salsa-candela.com/img/party/fiesta_2025_11_14.jpeg",
      caption: `¡Te esperamos HOY 24 de octubre para una noche llena de baile en Salsatélite! Toda la comunidad Candela estará presente. Porque tu lo pediste, hemos revolucionado el evento para darte la mejor experiencia, sigue leyendo…

Salsatélite —> info completa en FB -> https://www.facebook.com/events/816268047698631
📍Av. Lomas Verdes 896 (CCM) —> ubicación  https://maps.app.goo.gl/ogjyCuoZLmJ8WsxD7
🕥 vie 24 oct / 8:30pm - 2:30am
🔹espacio amplio y bien ventilado
🔹luz y sonido profesionales.
🔹estacionamiento

🚫NO MÁS FILAS
🔸Podrás adquirir tus bebidas en nuestra nuevo bar digital desde tu cel —> https://bar.salsa-candela.com

Si aun no tienes tu boleto, puedes adquirirlo en preventa ($100 por boleto) aun hoy antes de las 6pm utilizando cualquiera de nuestras formas de pago:

🔸Pago con tarjeta en https://admin.salsa-candela.com/fiesta/boletos
🔸Depósito o transferencia en:
BBVA (Rodrigo Chávez Calvillo)
CLABE: 012180027842910184
Cuenta: 2784291018
Tarjeta: 4152 3145 0520 6972

¡Te esperamos!`,
    },
  });
  return data;
}

/**
 * Generates a WhatsApp image message with workshop information and pre-sale discount.
 * This is the first message in a two-part sequence for workshop inquiries.
 * Images are served from the public folder via Express static middleware.
 * Image file: src/public/images/aprende-salsa-desde-cero.jpg
 * @param {string} number - The recipient's WhatsApp number
 * @returns {string} JSON string payload
 */
function messageWorkshopInfo(number) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: number,
    type: "image",
    image: {
      link: "https://whatsapp-salsa-candela.up.railway.app/images/aprende-salsa-desde-cero.jpg",
      caption: `Gracias por pedir informes sobre nuestras clases!  Te recordamos que nuestro taller Aprende salsa desde cero comienza el próximo 15 de noviembre  y tenemos 50% de descuento por preventa hasta el día de HOY viernes 7 de noviembre:

🔹paga sólo $650  en vez de $1300  (pase individual / 5 semanas)
🔹o paga $1000 en lugar de $2000 (pase en pareja).

📸 —> Por favor revisa la info completa y un video del curso en www.salsacandela.net/taller.

✔️nunca más sentad@ en las fiestas
✔️no es necesario llevar pareja
✔️aprende desde cero
✔️12 años de experiencia en Mexico, Cuba y Alemania.
✔️todas las edades
✔️sigue aprendiendo hasta niveles avanzados
✔️conoce gente. ¡Diviértete!

Puedes elegir la sucursal y horario que te acomode mejor:`,
    },
  });
  return data;
}

/**
 * Generates a WhatsApp image message showing branch locations and schedules.
 * This is the second message in a two-part sequence for workshop inquiries.
 * Send this after messageWorkshopInfo().
 * Image is served from: src/public/images/sucursal-xola.jpeg
 * @param {string} number - The recipient's WhatsApp number
 * @returns {string} JSON string payload
 */
function messageWorkshopLocations(number) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: number,
    type: "image",
    image: {
      link: "https://whatsapp-salsa-candela.up.railway.app/images/sucursal-xola.jpeg",
    },
  });
  return data;
}

module.exports = {
  messageText,
  messageList,
  messageComprar,
  messageLocation,
  messageFiesta,
  messageWorkshopInfo,
  messageWorkshopLocations,
};
