# 📹 JoinFlow – Video Conferencing App

JoinFlow is a full-featured, modern video conferencing platform built with cutting-edge technologies like **Next.js**, **TypeScript**, **Tailwind CSS**, **Clerk**, **ShadCN UI**, and **GetStream.io**. It allows users to host and join meetings, chat, and manage calls with ease.

---

## 🌐 Live Demo
https://join-flow.vercel.app/

---

## 📸 Screenshots

<img src="/public/images/ProjectPic1.png" alt="ProjectPic" width="600" height="330"/>
<img src="/public/images/ProjectPic2.png" alt="ProjectPic" width="600" height="330"/>
<img src="/public/images/ProjectPic3.png" alt="ProjectPic" width="600" height="330"/>

---

## ✨ Features


- 🔐 Authentication with Clerk
- 📞 Video calling using GetStream.io
- 💬 Real-time chat integration
- 🧭 Protected routing and layouts
- 📋 Dynamic call history (Join, Leave, End)
- ⚙️ Responsive UI with ShadCN UI + Tailwind CSS
- 🔄 Reusable hooks & utility-based architecture

---

## 🛠 Tech Stack

| Area         | Tech Used                               |
|--------------|-----------------------------------------|
| Frontend     | Next.js 14 (App Router) + TypeScript    |
| Styling      | Tailwind CSS, ShadCN UI                 |
| Auth         | Clerk                                   |
| Video & Chat | GetStream.io                            |
| State Mgmt   | React Hooks                             |
| Hosting      | Vercel (Recommended)                    |

---

## 📁 Folder Structure

```txt
.
├── actions/                 # Server actions
│   └── stream.actions.ts
│
├── app/                    # Next.js App Router (auth, routes, layout)
│   ├── (auth)/
│   ├── (root)/
│   ├── globals.css
│   └── layout.tsx
│
├── components/
│   ├── ui/                 # Reusable UI elements
│   │   ├── CallList.tsx
│   │   ├── EndcallButton.tsx
│   │   ├── HomeCard.tsx
│   │   ├── Loader.tsx
│   │   ├── MeetingCard.tsx
│   │   ├── MeetingModel.tsx
│   │   ├── MeetingRoom.tsx
│   │   ├── MeetingSetup.tsx
│   │   ├── MeetingTypeList.tsx
│   │   ├── MobileNav.tsx
│   │   ├── Navbar.tsx
│   │   └── Sidebar.tsx
│
├── constants/
│   └── index.ts
│
├── hooks/
│   ├── useGetCallById.ts
│   └── useGetCalls.ts
│
├── lib/
│   └── utils.ts
│
├── providers/              # Context providers (Clerk, Theme, etc.)
│
├── public/
│   ├── icons/
│   └── images/
│
├── src/                    # Extra sources (optional)
├── middleware.ts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── .env.local              # Environment variables
└── README.md
```
---

## 🔧 Getting Started

1. Clone the repository

git clone https://github.com/AvishekxD/JoinFlow
cd JoinFlow

2. Install dependencies

npm install
# or
yarn install

3. Setup environment variables
Create a .env.local file and add:

CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_key
NEXT_PUBLIC_STREAM_API_KEY=your_key
STREAM_SECRET=your_key

4. Run the development server

npm run dev
# or
yarn dev

---

### 📄 License
This project is licensed under the MIT License.