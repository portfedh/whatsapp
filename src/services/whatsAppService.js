const https = require("https");
const fs = require("fs");
const myConsole = require("./logger");

/* 
SendMessageWhatsApp:
Function to send messages to WhatsApp a user. 
- Requires Token from Meta Developer Console
- The path is also provided by Meta
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
