const whatsAppModel = require("../shared/whatsAppModels");
const whatsAppService = require("../services/whatsAppService");

function process(textUser, number) {
  textUser = textUser.toLowerCase();
  let models = [];

  if (textUser.includes("hola")) {
    // Saludo
    let model = whatsAppModel.messageText("Hola, un gusto saludarte", number);
    models.push(model);
  } else if (textUser.includes("gracias")) {
    // Agradecimiento
    let model = whatsAppModel.messageText(
      "Gracias a ti por escribirme",
      number
    );
    models.push(model);
  } else if (textUser.includes("adios") || textUser.includes("bye")) {
    // Despedida
    let model = whatsAppModel.messageText("Hasta luego", number);
    models.push(model);
  } else {
    let model = whatsAppModel.messageText("No entiendo el mensaje.", number);
    models.push(model);
  }

  models.forEach((model) => {
    whatsAppService.sendMessageWhatsApp(model);
  });
}

module.exports = {
  process,
};
