function sampleText(textResponse, number) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: number,
    type: "text",
    text: {
      preview_url: false, // para no mostrar un preview
      body: textResponse,
    },
  });
  return data;
}

function sampleImage(number) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: number,
    type: "image",
    image: {
      link: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1199px-Cat03.jpg",
    },
  });
  return data;
}

function sampleAudio(number) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: number,
    type: "audio",
    audio: {
      link: "https://www.freesoundeffects.com/files/mp3_89353.mp3",
    },
  });
  return data;
}

function sampleVideo(number) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: number,
    type: "video",
    video: {
      link: "https://images.all-free-download.com/footage_preview/mp4/closeup_of_cute_small_bird_6892300.mp4",
      caption: "This is a video caption",
    },
  });
  return data;
}

function sampleDocument(number) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: number,
    type: "document",
    document: {
      link: "https://fund-docs.vanguard.com/FA0968_SPM.pdf",
      caption: "VOO Fact Sheet",
    },
  });
  return data;
}

function sampleButtons(number) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: number,
    type: "interactive",
    interactive: {
      type: "button",
      body: {
        text: "Confirmar Registro?",
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: "<UNIQUE_BUTTON_ID_1>",
              title: "Si",
            },
          },
          {
            type: "reply",
            reply: {
              id: "<UNIQUE_BUTTON_ID_2>",
              title: "No",
            },
          },
        ],
      },
    },
  });
  return data;
}

function sampleList(number) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: number,
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: "<MESSAGE_HEADER_TEXT>",
      },
      body: {
        text: "<MESSAGE_BODY_TEXT>",
      },
      footer: {
        text: "<MESSAGE_FOOTER_TEXT>",
      },
      action: {
        sections: [
          {
            title: "<SECTION_TITLE_TEXT>",
            rows: [
              {
                id: "<ROW_ID>",
                title: "<ROW_TITLE_TEXT>",
                description: "<ROW_DESCRIPTION_TEXT>",
              },
              {
                id: "<ROW_ID_2>",
                title: "<ROW_TITLE_TEXT_2>",
                description: "<ROW_DESCRIPTION_TEXT_2>",
              },
              /* Additional rows would go here*/
            ],
          },
          /* Additional sections would go here */
        ],
        button: "<BUTTON_TEXT>",
      },
    },
  });
  return data;
}

function sampleLocation(number) {
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

module.exports = {
  sampleText,
  sampleImage,
  sampleAudio,
  sampleVideo,
  sampleDocument,
  sampleButtons,
  sampleList,
  sampleLocation,
};
