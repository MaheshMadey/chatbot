# AI Chatbot

A full-stack conversational AI chatbot powered by Google Gemini 2.5 Flash.

**Frontend:** React + Tailwind CSS, deployed on GitHub Pages  
**Backend:** Node.js + Express, uses the Gemini API

## Features

- Real-time chat with Google Gemini AI
- Persistent conversation context within a session
- Dark theme UI

## Getting Started

### Prerequisites

- Node.js 20+
- A [Google Gemini API key](https://aistudio.google.com/app/apikey)

### Setup

**1. Clone the repo**

```bash
git clone https://github.com/maheshmadey/chatbot.git
cd chatbot
```

**2. Configure the server**

```bash
cd server
cp ../.env.example .env
# Edit .env and add your GEMINI_API_KEY
npm install
npm start
```

**3. Run the client**

```bash
cd client
npm install
npm start
```

The app runs at `http://localhost:3000` and connects to the server at `http://localhost:8000`.

## Deployment

### Client (GitHub Pages)

Set the `REACT_APP_API_URL` secret in your repository settings to your deployed server URL. The `client-deploy.yml` workflow builds and deploys on every push to `master` that touches the `client/` directory.

### Server

Set the following secrets in your repository settings for the `server-deploy.yml` workflow:

| Secret | Description |
|---|---|
| `PORT` | Port the server listens on |
| `GEMINI_API_KEY` | Your Google Gemini API key |

## Project Structure

```
chatbot/
├── client/               # React frontend
│   └── src/
│       ├── components/
│       │   ├── ChatWindow.jsx
│       │   ├── InputBox.jsx
│       │   └── Message.jsx
│       └── App.js
└── server/               # Express backend
    └── index.js
```

## License

MIT
