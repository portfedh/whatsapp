const myConsole = require("../services/logger");
const whatsAppModel = require("../shared/whatsAppModels");
const whatsAppService = require("../services/whatsAppService");
const chatGptService = require("../services/chatGptService");


/**
 * Processes a user's WhatsApp message and sends an appropriate response.
 * Uses ChatGPT to generate a reply, or falls back to a default message if needed.
 * Sends the response(s) using the WhatsApp service.
 * @param {string} textUser - The user's message text
 * @param {string} number - The user's WhatsApp number
 * @returns {Promise<void>}
 */
async function process(textUser, number) {
  textUser = textUser.toLowerCase();
  let models = [];

  // #region Sin ChatGPT
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
    models.push(model);
    // Contacto
  } else if (textUser.includes("contacto")) {
    let model = whatsAppModel.messageText(
      "*Centro de contacto:* \n 55-1069-0000",
      number
    );
    models.push(model);
    // Fiesta
  } else if (textUser.includes("fiesta")) {
    let model = whatsAppModel.messageFiesta(number);
    models.push(model);
    // Clases
  } else if (textUser.includes("clases")) {
    let modelInfo = whatsAppModel.messageWorkshopInfo(number);
    models.push(modelInfo);
    let modelLocations = whatsAppModel.messageWorkshopLocations(number);
    models.push(modelLocations);
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
  // #endregion Sin ChatGPT

  // #region Con ChatGPT
  // const resultChatGPT = await chatGptService.getMessageChatGPT(textUser);
  // myConsole.log("Response from ChatGPT: ", resultChatGPT); // Temp

  // if (resultChatGPT != null) {
  //   let model = whatsAppModel.messageText(resultChatGPT, number);
  //   models.push(model);
  // } else {
  //   let model = whatsAppModel.messageText("No entiendo el mensaje.", number);
  //   models.push(model);
  // }
  // #endregion con chatGPT

  models.forEach((model) => {
    whatsAppService.sendMessageWhatsApp(model);
  });
}

module.exports = {
  process,
};
