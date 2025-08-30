# Getting Familiar with Your WhatsApp Chatbot Codebase

## 🏗️ Project Overview

Your WhatsApp chatbot is a sophisticated Node.js/Express application that integrates with both WhatsApp's Cloud API and OpenAI's ChatGPT. The project is nearly complete and has evolved from using predefined responses to full ChatGPT integration.

### Current Architecture

```
src/
├── index.js                    # Main entry point (Express server on port 3131)
├── routes/home.js             # Webhook routes (GET/POST /)
├── controllers/whatsAppControllers.js  # Request handling & message parsing
├── services/
│   ├── whatsAppService.js     # Facebook Graph API integration
│   ├── chatGptService.js      # OpenAI GPT-4 integration
│   └── logger.js              # Custom logging service
└── shared/
    ├── processMessage.js      # Central message routing (ChatGPT active)
    ├── whatsAppModels.js      # WhatsApp message templates
    └── sampleModels.js        # Example message formats
```

## 🔄 Current Message Flow

1. **Webhook Verification**: GET `/` validates with token "AngryTurkeys"
2. **Message Reception**: POST `/` receives WhatsApp messages
3. **Message Processing**: All messages → ChatGPT GPT-4 (100 token limit)
4. **Response**: ChatGPT response sent back via WhatsApp API

## 📊 Current State Analysis

### ✅ What's Working

- **ChatGPT Integration**: Fully active and processing all messages
- **WhatsApp API**: Connected to Facebook Graph API v19.0
- **Message Parsing**: Handles text, interactive buttons, and list replies
- **Phone Number Normalization**: Mexican numbers (52x format)

## 🚀 Recommended Getting Familiar Steps

### 1. **Immediate Testing** (Start Here!)

```bash
# Start development server
npm run dev

# Server will run on http://localhost:3131
# Test webhook verification with token "AngryTurkeys"

```

### 2. **Code Review Priority**

1. **`processMessage.js`**: See current ChatGPT integration vs commented predefined logic
2. **`whatsAppControllers.js`**: Understand message parsing and phone number handling
3. **`chatGptService.js`**: Review OpenAI configuration and limits
4. **`whatsAppService.js`**: Note hardcoded token security issue

### 3. **Configuration Review**

- **Environment Setup**: Check `.env` file has valid OpenAI API key
- **Dependencies**: Run `npm install` if needed
- **ToDos File**: Contains environment variables and deployment URLs

### 4. **Security Fixes Needed**

```javascript
// Current (INSECURE):
Authorization: "Bearer EAAGbC7g2ej8BO..."; // hardcoded

// Should be:
Authorization: `Bearer ${process.env.WA_TOKEN}`;
```

### 5. **Deployment Context**

- **Azure Deployment**: `https://salsacandelawhatsapp.azurewebsites.net`
- **Facebook App**: Configured for webhook integration
- **Production Ready**: Except for security token issues

## 🎯 Next Development Priorities

### Immediate (Security)

1. Move hardcoded tokens to environment variables
2. Regenerate exposed API keys
3. Test current ChatGPT functionality

### Short-term (Enhancements)

1. Add error handling improvements
2. Consider message rate limiting
3. Add logging for debugging

### Optional (Features)

1. Toggle between predefined responses and ChatGPT
2. Add conversation context/memory
3. Implement user session management

## 🔍 Key Files to Study

| File                     | Purpose                                   | Priority |
| ------------------------ | ----------------------------------------- | -------- |
| `processMessage.js`      | **Current logic** - ChatGPT integration   | HIGH     |
| `whatsAppControllers.js` | Message parsing and webhook handling      | HIGH     |
| `chatGptService.js`      | OpenAI API integration                    | MEDIUM   |
| `whatsAppService.js`     | WhatsApp API calls (security issue here)  | HIGH     |
| `ToDos`                  | Environment variables and deployment info | MEDIUM   |

## 💡 Quick Start Recommendations

1. **Run the server**: `npm run dev`
2. **Check functionality**: Test with a simple message
3. **Review security**: Fix hardcoded tokens first
4. **Study evolution**: Compare current `processMessage.js` with git history
5. **Test ChatGPT**: Verify OpenAI integration works

## 📝 Technical Details

### Dependencies

- **Express**: Web framework
- **OpenAI**: ChatGPT integration (`openai` package)
- **libphonenumber-js**: Phone number validation
- **dotenv**: Environment variable management
- **nodemon**: Development auto-reloading

### Environment Variables (from ToDos)

```
PORT=3131
NODE_ENV=development
MY_TOKEN=679e95b74f7b417c97b40413cdf798d9
WA_TOKEN=EAAGbC7g2ej8BO... (should replace hardcoded token)
OPENAI_API_KEY=sk-proj-... (in .env file)
```

### OpenAI Configuration

- **Organization**: org-RvC0L5PTJO7pgs7NTrNGkl4P
- **Project**: proj_jeoQk7mO14A1lWr603eJKPnX
- **Model**: GPT-4
- **Max Tokens**: 100

This codebase is well-structured and nearly production-ready, with ChatGPT integration as the main feature. The primary concern is securing the hardcoded tokens before any production use.
