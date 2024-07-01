const whatsAppModel = require("../shared/whatsAppModels");
const whatsAppService = require("../services/whatsAppService");

function process(textUser, number) {
  textUser = textUser.toLowerCase();
  let models = [];

  // Saludo
  if (textUser.includes("hola")) {
    let model = whatsAppModel.messageText("Hola, un gusto saludarte", number);
    models.push(model);
    let modelList = whatsAppModel.messageList(number);
    models.push(modelList);
    // Comprar
  } else if (textUser.includes("comprar")) {
    let model = whatsAppModel.messageComprar(number);
    models.push(model);
    // Vender
  } else if (textUser.includes("vender")) {
    let model = whatsAppModel.messageText(
      "Por favor inscribete aqui: https://admin.salsa-candela.com/classstripeform",
      number
    );
    // Contacto
  } else if (textUser.includes("contacto")) {
    let model = whatsAppModel.messageText(
      "*Centro de contacto:* \n 55-1069-0000",
      number
    );
    models.push(model);
    // Agradecimiento
  } else if (textUser.includes("gracias")) {
    let model = whatsAppModel.messageText(
      "Gracias a ti por escribirme",
      number
    );
    models.push(model);
    // Despedida
  } else if (textUser.includes("adios") || textUser.includes("bye")) {
    let model = whatsAppModel.messageText("Hasta luego", number);
    models.push(model);
    // Error
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
