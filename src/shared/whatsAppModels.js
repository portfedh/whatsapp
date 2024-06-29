// Modelos dedicados al caso de uso de el bot.

function messageText(textResponse, number) {
  const data = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: number,
    type: "text",
    text: {
      preview_url: false,
      body: textResponse,
    },
  });
  return data;
}

module.exports = {
  messageText,
};
