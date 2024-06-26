const https = require("https");

/* 
SendMessageWhatsApp:
Function to send messages to WhatsApp a user. 
- Requires Token from Meta Developer Console
- The path is also provided by Meta
*/
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
      "Content-Length": data,
      Authorization:
        "Bearer EAAGbC7g2ej8BO8tVhAoZBHc7alvODhP7QRrUZBhJlXPmr6RIZAYH2JbUVV6V4bghvkFZC8cxlhDwKDdvgwvlKEzAbKze6j8ABk3YWayLZAa22RViEZAmd5XCNZCoEVuqRP0RxkGgXjDLykdvc2BF4ipZCFHdwUczdJoodjZCXM8mBbl2ZA08cbtpD1uBAqEfTsKB9W66sw1eDpVn2ZBEZBxkgr6Sw0s7OjVPV1lkrXhca2U29tBaLp5AB11J",
    },
  }; // Substitute & make env variable

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
