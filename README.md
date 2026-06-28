## Project Overview

MERN Chat Frontend is a modern React application that provides a real-time chat interface powered by Socket.IO. Users can join chat rooms, communicate instantly with other connected users, receive typing indicators, and switch between multiple chat rooms.

This project was developed as part of **Week 12 – Sprint 12: Real-Time Systems & UI Isolation**.

---

## Live Demo

**Frontend (Vercel):**

https://mern-chat-frontend-ruddy.vercel.app/

---

## Backend Repository

https://github.com/Sriniketh-Vangipuram/mern-chat-backend

---

## Technologies Used

* React
* Vite
* JavaScript (ES6+)
* Socket.IO Client
* Tailwind CSS
* HTML5
* CSS3

---

## Features

* Real-time messaging
* Multiple chat rooms
* Username-based chat
* Typing indicator
* Join room notifications
* Leave room notifications
* Dark modern UI
* Responsive design
* Socket.IO client integration
* Clean component-based architecture

---

## Folder Structure

```text
src/
│
├── components/
│   └── HomePage.jsx
│
├── socket/
│   └── socket.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/Sriniketh-Vangipuram/mern-chat-frontend.git
```

Navigate to the project

```bash
cd mern-chat-frontend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
VITE_SOCKET_URL= https://mern-chat-backend-p9b6.onrender.com
```

Start the development server

```bash
npm run dev
```

---

## Production Build

```bash
npm run build
```

Preview the production build

```bash
npm run preview
```

---

## How It Works

1. User enters a username.
2. User selects a chat room.
3. React establishes a Socket.IO connection.
4. Messages are emitted to the backend.
5. Backend broadcasts messages to users in the same room.
6. Users receive messages instantly without refreshing the page.
7. Typing indicators are displayed in real time.
8. Join and leave events are broadcast to room members.

---

## Learning Outcomes

Through this project, I learned:

* WebSocket fundamentals
* Real-time communication
* Socket.IO client integration
* React state management
* Event-driven architecture
* Room-based communication
* Typing event implementation
* Modern UI development with Tailwind CSS
* Environment variable management
* Deployment using Vercel

---

## Backend

The backend for this application is maintained in a separate repository.

Repository:

https://github.com/Sriniketh-Vangipuram/mern-chat-backend

---

## Deployment

Frontend: Vercel

Backend: Render

---

## Future Improvements

* Authentication
* Private messaging
* Message history
* Emoji support
* Online user list
* Read receipts
* File sharing
* Voice messages
* Persistent chat storage
* User avatars

---

## Author

**Sriniketh Vangipuram**

Developed as part of the Prodesk IT Internship – Week 12 Sprint 12.
