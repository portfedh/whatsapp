// Modelos dedicados al caso de uso de el bot.

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

module.exports = {
  messageText,
  messageList,
  messageComprar,
};
