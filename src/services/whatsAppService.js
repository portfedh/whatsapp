const https = require("https");
const fs = require("fs");
const myConsole = require("./logger");

/**
 * Sends a message to a WhatsApp user using the Meta (Facebook) API.
 * Requires a valid access token and endpoint path from the Meta Developer Console.
 * Logs errors using the custom logger.
 * @param {string} data - The message payload as a JSON string
 */
function sendMessageWhatsApp(data) {
  // myConsole.log("Data to be sent: ", data);

  const options = {
    host: "graph.facebook.com",
    path: "/v19.0/344985858695654/messages",
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(data), //data.length,
      Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
    },
  }; // Substitute for new token & make env variable
  const req = https.request(options, (res) => {
    let responseData = "";

    res.on("data", (chunk) => {
      responseData += chunk;
    });

    res.on("end", () => {
      // myConsole.log("Response from WhatsApp API: ", responseData);
    });
  });

  req.on("error", (error) => {
    myConsole.log("Error: ", error);
  });

  req.write(data);
  req.end();

  // Codigo del tutorial:
  // const req = https.request(options, (res) => {
  //   res.on("data", (d) => {
  //     process.stdout.write(d);
  //   });
  // });

  // req.on("error", (error) => {
  //   console.error(error);
  // });
  // req.write(data);
  // req.end();
}

module.exports = { sendMessageWhatsApp };
