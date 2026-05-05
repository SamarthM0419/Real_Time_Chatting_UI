# PingTalk — Real-Time Chat UI

A React-based frontend for a real-time chatting application. Built with Vite, Redux, and Socket.IO, it communicates with a microservices backend to support direct messaging, group chats, friend connections, and file sharing.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 19 + Vite | UI framework & build tool |
| Tailwind CSS + DaisyUI | Styling & component library |
| Redux Toolkit | Global state management |
| React Router DOM 7 | Client-side routing |
| Socket.IO Client | Real-time WebSocket messaging |
| Axios | HTTP requests to backend services |

---

## Features

- **Authentication** — Login and signup with persistent cookie-based sessions
- **Profile Management** — Edit name, age, gender, bio, and profile picture
- **Friend Connections** — Send/accept/reject/cancel connection invites by email
- **Direct Messaging** — One-on-one chat with connected users
- **Group Chats** — Create group conversations with multiple participants
- **File Sharing** — Attach images and files (up to 5 MB) with inline preview
- **Real-Time Updates** — Live message delivery via Socket.IO
- **Message History** — Timestamped messages with Today/Yesterday separators

---

## Project Structure

```
chat-web/
├── src/
│   ├── components/
│   │   ├── Login.jsx         # Login & signup form
│   │   ├── Body.jsx          # Layout wrapper, session guard
│   │   ├── NavBar.jsx        # Top navigation
│   │   ├── Chat.jsx          # Chat page (sidebar + message window)
│   │   ├── Friends.jsx       # Connection management (discover, sent, received)
│   │   ├── EditProfile.jsx   # Profile editor with image upload
│   │   ├── PreviewCard.jsx   # Profile preview card
│   │   └── ErrorPage.jsx     # 404 / error fallback
│   ├── utils/
│   │   ├── appStore.js       # Redux store
│   │   ├── userSlice.js      # User state slice
│   │   └── constants.js      # Backend service URLs
│   ├── App.jsx               # Root component with routes
│   └── main.jsx              # React entry point
├── index.html
├── vite.config.js
└── tailwind.config.js
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- The [Real_Time_Chatting_Backend](../Real_Time_Chatting_Backend) services running locally (or update URLs in `constants.js`)

### Install & Run

```bash
cd chat-web
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

### Available Scripts

```bash
npm run dev       # Start dev server with hot module reload
npm run build     # Production build
npm run preview   # Preview the production build
npm run lint      # Run ESLint
```

---

## Backend Services

The frontend expects four backend services running on localhost. These URLs are configured in [src/utils/constants.js](chat-web/src/utils/constants.js):

| Service | Port | Handles |
|---|---|---|
| Auth Service | 5000 | Login, signup, logout |
| Profile Service | 5001 | User profiles & photos |
| Request Service | 5002 | Friend invites & connection management |
| Chat Service | 5003 | Messages, group chats, Socket.IO |

To point the frontend at a different backend (e.g., a deployed API gateway), update the URL constants in `src/utils/constants.js`.

---

## Theming

The app uses DaisyUI and defaults to the **luxury** theme. The available themes are configured in [tailwind.config.js](chat-web/tailwind.config.js):

`light`, `dark`, `cupcake`, `bumblebee`, `dracula`, `forest`, `luxury`, `coffee`, `sunset`, `dim`
