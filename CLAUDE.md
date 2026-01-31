# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # Install dependencies
npm run build        # Compile TypeScript to dist/
npm run dev          # Run with ts-node (development)
npm start            # Run compiled JS (production)
npm test             # Run all tests
npm test -- --watch  # Run tests in watch mode
npm test -- path/to/file.test.ts  # Run a single test file
npm run lint         # Run ESLint
npm run lint:fix     # Run ESLint with auto-fix
```

## Architecture

This is a TypeScript REST API following a layered architecture pattern:

**Request Flow:** Routes → Controllers → Services → Repositories

- **Routes** (`src/routes/`): Define Express endpoints and map them to controller methods
- **Controllers** (`src/controllers/`): Handle HTTP request/response, validate input, call services
- **Services** (`src/services/`): Contain business logic, throw domain errors (e.g., `TaskNotFoundError`)
- **Repositories** (`src/repositories/`): Data access layer (currently in-memory, designed for easy swap to database)
- **Models** (`src/models/`): TypeScript interfaces for entities and DTOs

**Entry Points:**
- `src/index.ts` - Server startup
- `src/app.ts` - Express app configuration (exported separately for testing)

## Frontend

Matrix-style terminal landing page with n8n chatbot integration served from `public/`.

**Structure:**
- `public/index.html` - Main page with terminal UI
- `public/js/config.js` - Configuration (n8n webhook URL, visual settings)
- `public/js/matrix-rain.js` - Canvas-based digital rain animation
- `public/js/chat.js` - Chat interface and webhook communication
- `public/css/matrix.css` - Matrix theme, CRT effects, scanlines
- `public/css/chat.css` - Chat message and input styling

**Configuration:** Edit `public/js/config.js` to set your n8n webhook URL:
```javascript
N8N_WEBHOOK_URL: 'https://your-n8n-instance.com/webhook/your-id'
```
