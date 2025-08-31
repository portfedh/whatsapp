const myConsole = require("../services/logger");

/**
 * Extracts the text content from a WhatsApp message object.
 * Handles both plain text and interactive message types (button, list).
 * Logs if no message is found.
 * @param {Object} messages - The WhatsApp message object
 * @returns {string|undefined} The extracted text, or undefined if not found
 */
function getTextUser(messages) {
  let text;
  let typeMessage = messages["type"];
  if (typeMessage === "text") {
    // Text
    text = messages["text"]["body"];
  } else if (typeMessage === "interactive") {
    // Interactive
    let interactiveObject = messages["interactive"];
    let typeInteractive = interactiveObject["type"];
    if (typeInteractive === "button_reply") {
      // Interactive Button pressed
      text = interactiveObject["button_reply"]["title"];
    } else if (typeInteractive === "list_reply") {
      // Interactive List reply
      text = interactiveObject["list_reply"]["title"];
    } else {
      myConsole.log("Sin mensaje");
    }
  } else {
    myConsole.log("Sin mensaje");
  }
  return text;
}

module.exports = getTextUser;
