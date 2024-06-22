const https = require("https");
const { WA_TOKEN } = process.env;

function sendMessageWhatsApp(textResponse, number) {
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
      Authorization:
        "Bearer EAAGbC7g2ej8BOwmdkr4x1bORZC5h5WUKnghttc0lGVeznKE2bnN4Ii0J3zz9UTa0hwuOxdVQVqmKy7ZBMAFTxTpFFO6abLbwaafryCAo7yqkZCPqqaiqmcK20rcycPSToANxkwCX2ObLj2HZBodxQuJTl0lkgZCXiBhOsrHPrdNZCyfN08Tz38CT8io8VQPw7AJS68LllD7iXEUr0N33LRHICWkjk4LKkL",
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
