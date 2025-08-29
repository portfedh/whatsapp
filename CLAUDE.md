# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` - Uses nodemon with `./src/index.js`
- **Start production server**: `npm start` - Runs `./src/index.js` with node directly
- **Server runs on**: Port 3131 (default) or PORT environment variable
- **Node.js requirement**: >=20.0.0

## Architecture Overview

This is a sophisticated Node.js/Express WhatsApp chatbot with ChatGPT integration, organized in a `src/` directory structure:

### Project Structure

```
src/
├── index.js                    # Main entry point
├── routes/home.js             # Webhook route definitions
├── controllers/whatsAppControllers.js  # Request handling logic
├── services/
│   ├── whatsAppService.js     # WhatsApp API integration
│   ├── chatGptService.js      # OpenAI ChatGPT integration
│   └── logger.js              # Custom logging service
└── shared/
    ├── processMessage.js      # Central message routing logic
    ├── whatsAppModels.js      # WhatsApp message templates
    └── sampleModels.js        # Example message formats
```

### Core Functionality

- **Webhook Verification**: Validates WhatsApp webhook with custom token "AngryTurkeys"
- **Intelligent Message Processing**: Routes messages through predefined logic or ChatGPT
- **Rich WhatsApp Features**: Interactive buttons, lists, location sharing, media support
- **ChatGPT Fallback**: Uses OpenAI GPT-4 for unhandled messages (100 token limit)
- **Professional Logging**: Structured logging with custom logger service

### Key Dependencies

- **Express**: Web framework (no templating in this version)
- **OpenAI**: ChatGPT integration (`openai` package)
- **WhatsApp**: Facebook Graph API v19.0 integration
- **Phone Numbers**: `libphonenumber-js` for number validation
- **Development**: Nodemon for auto-reloading

### Message Processing Flow

1. **Webhook Verification**: GET `/` validates with "AngryTurkeys" token
2. **Message Reception**: POST `/` receives WhatsApp messages
3. **Message Processing**: `processMessage.js` routes based on content:
   - Predefined responses for: "hola", "comprar", "vender", "contacto"
   - ChatGPT integration for unrecognized messages
4. **Response Generation**: Uses message templates from `whatsAppModels.js`
5. **Message Delivery**: Sends via Facebook Graph API

### ChatGPT Integration

- **Model**: GPT-4 with 100 token limit
- **Configuration**: Requires `OPENAI_API_KEY` environment variable
- **Organization**: org-RvC0L5PTJO7pgs7NTrNGkl4P
- **Project**: proj_jeoQk7mO14A1lWr603eJKPnX

### Security Notes

- WhatsApp access token still hardcoded (should use environment variables)
- Verify token: "AngryTurkeys"
- OpenAI API key properly uses environment variables
- Facebook Graph API path: `/v19.0/344985858695654/messages`

### Available Message Types

- Text messages with/without preview URLs
- Interactive button responses
- List selections
- Location sharing
- Media messages (images, documents, etc.)
- Product catalogs for e-commerce

No test suite or linting configuration exists in the project.
