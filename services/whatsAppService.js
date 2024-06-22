const https = require("https");
require("dotenv").config({ path: "../config/.env" });

function sendMessageWhatsApp(textResponse, number) {
  console.log("WA Token: ", WA_TOKEN); // Debugging Temp
  console.log("My Token: ", MY_TOKEN); // Debugging Temp

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

  const options = {
    host: "graph.facebook.com",
    path: "/v19.0/344985858695654/messages",
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
      Authorization: "Bearer " + WA_TOKEN,
    },
  };

  const req = https.request(options, (res) => {
    res.on("data", (d) => {
      process.stdout.write(d);
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });
  req.write(data);
  req.end();
}

module.exports = { sendMessageWhatsApp };
