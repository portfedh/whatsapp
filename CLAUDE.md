# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WhatsApp chatbot application for "Salsa Candela" built with Node.js and Express. The bot receives messages via WhatsApp Cloud API webhooks, processes them with keyword-based logic (with optional ChatGPT integration), and sends responses back through the WhatsApp Business API.

## Development Commands

```bash
# Install dependencies
npm install

# Run in development mode (with nodemon)
npm run dev

# Run in production mode
npm start

# Test webhook locally with ngrok
ngrok http http://localhost:3131
```

## Environment Variables

Create a `.env` file with:

```
WHATSAPP_ACCESS_TOKEN=<your_24_hour_token_from_meta>
WHATSAPP_VERIFY_TOKEN=<your_custom_verification_token>
OPENAI_API_KEY=<your_openai_key>  # Optional, for ChatGPT integration
PORT=3131  # Optional, defaults to 3131
```

**Important:** WhatsApp access tokens from Meta are temporary (24-hour tokens for development). Update regularly from the Meta Developer Console.

## Architecture

### Request Flow

1. **Webhook Verification (GET /)**: Meta verifies the webhook endpoint during initial setup using `verifyTokenController`
2. **Message Reception (POST /)**: WhatsApp sends incoming messages to the webhook endpoint handled by `ReceiveMessage` controller
3. **Message Processing**: `processMessage` extracts user text, normalizes phone numbers, and determines responses
4. **Response Sending**: `whatsAppService` sends responses back via Meta Graph API

### Directory Structure

```
src/
├── index.js                 # Express app entry point, server setup
├── swagger.js              # Swagger/OpenAPI documentation config
├── routes/
│   └── home.js             # Main webhook routes (GET/POST /)
├── controllers/
│   ├── ReceiveMessage.js   # Processes incoming webhook events
│   └── verifyTokenController.js  # Handles webhook verification
├── services/
│   ├── whatsAppService.js  # Sends messages via Meta Graph API
│   ├── chatGptService.js   # OpenAI ChatGPT integration (optional)
│   └── logger.js           # Custom console logger
├── shared/
│   ├── processMessage.js   # Core message routing logic (keyword matching)
│   ├── whatsAppModels.js   # Message payload templates for WhatsApp API
│   └── sampleModels.js     # Sample message templates (text, image, buttons, etc.)
└── utils/
    ├── getTextUser.js      # Extracts text from message object
    └── normalizeNumber.js  # Formats phone numbers
```

### Key Components

**Message Processing (`processMessage.js`)**:
- Currently uses keyword-based matching (hola, comprar, vender, contacto, gracias, adios)
- ChatGPT integration is implemented but commented out (see #region comments)
- To enable ChatGPT: uncomment lines 61-72, comment out lines 19-59

**WhatsApp Service (`whatsAppService.js`)**:
- Uses Meta Graph API v19.0
- Hardcoded phone number ID: `344985858695654`
- Sends POST requests to `graph.facebook.com/v19.0/{phone_number_id}/messages`

**Message Models (`whatsAppModels.js`)**:
- Provides templates for different WhatsApp message types
- Common methods: `messageText()`, `messageList()`, `messageComprar()`, etc.

**Sample Models (`sampleModels.js`)**:
- Contains examples for testing various message types (text, image, audio, video, document, buttons, lists, location)

## Webhook Setup

1. Start local server: `npm run dev`
2. Expose with ngrok: `ngrok http http://localhost:3131`
3. Configure webhook in Meta Developer Console:
   - URL: `https://{your-ngrok-url}/`
   - Verify token: Value from `WHATSAPP_VERIFY_TOKEN` env variable
   - Subscribe to: `messages` field

## API Documentation

Swagger docs available at: `http://localhost:3131/api-docs`

## Production Deployment

Production URL: `https://whatsapp-salsa-candela.up.railway.app`

## Meta Developer Resources

- WhatsApp Cloud API: https://developers.facebook.com/docs/whatsapp/cloud-api/
- Meta Developer Console: https://developers.facebook.com
- Business Manager: https://business.facebook.com/
