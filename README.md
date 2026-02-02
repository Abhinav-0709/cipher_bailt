# Cipher Bait - Agentic Honey-Pot System

This project is a Next.js 15 application designed to detect and engage scammers using an AI Persona "Dada Ji".

## Setup Instructions

1.  **Environment Variables**:
    Open `.env.local` and fill in the following:
    ```env
    GEMINI_API_KEY=your_gemini_key
    MONGODB_URI=your_mongodb_connection_string
    GUVI_AUTH_KEY=secret-key-for-authenticating-guvi-evaluator
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```

4.  **Build for Production**:
    ```bash
    npm run build
    npm start
    ```

## deployment
Deploy to Vercel:
1.  Push to GitHub.
2.  Import project in Vercel.
3.  Add the Environment Variables in Vercel Settings.

## API Endpoint
`POST /api/honeypot`

Headers:
`x-api-key: <GUVI_AUTH_KEY>`

Body:
```json
{
  "message": "Hello sir, please send OTP",
  "history": [], 
  "sessionId": "optional-session-id"
}
```

## Features
- **Scam Detection**: Uses Gemini 1.5 Flash.
- **Persona**: "Dada Ji" (72yo grandfather).
- **Memory**: Stores conversations in MongoDB.
- **Intel Extraction**: Extracts UPI, Bank AC, and Links.

## Project Structure
- `app/api/honeypot/route.ts`: Main API Logic.
- `models/Conversation.ts`: MongoDB Schema.
- `lib/db.ts`: Database connection helper.
