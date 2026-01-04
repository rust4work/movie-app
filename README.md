# 🎬 Movie Discovery App
> A high-performance movie search application built with **Next.js 15**, **React 19**, and **TypeScript**.
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Ant Design](https://img.shields.io/badge/Ant%20Design-1890FF?style=for-the-badge&logo=antdesign&logoColor=white)
## 🚀 Overview
This project is a modern frontend application designed to demonstrate the capabilities of the **Next.js App Router** and **Server Components**. It interfaces with the TMDB API to provide real-time movie searching, rating functionality, and top-rated lists, all wrapped in a responsive, polished UI.

---
## Live Demo  
- 
https://movie-app-one-mu-47.vercel.app/

<img width="400" height="200" alt="Снимок экрана 2026-01-03 141406" src="https://github.com/user-attachments/assets/f8deb8c6-0ca1-403b-8265-bad3033bbab5" />

## ✨ Key Features
- **⚡ Real-Time Search**: Implements **lodash.debounce** to provide instant search results while minimizing API calls and avoiding race conditions.
- **🎨 Modern UI/UX**: Built with **Ant Design** components and custom **Tailwind CSS** styling for a clean, consistent, and mobile-responsive look.
- **📶 Offline Resilience**: Includes a custom `OfflineDetector` to gracefully handle network interruptions and inform the user.
- **🚀 Optimistic Updates**: The UI responds immediately to user actions (like rating a movie) for a snappy perceived performance.
- **📄 Server-Side Pagination**: Efficiently handles large datasets with server-side pagination logic.
- **🔒 Secure API Handling**: Utilizes Next.js API Routes to proxy requests, keeping sensitive API keys hidden from the client-side.
---
## 🛠 Tech Stack & Engineering Decisions
### Core Architecture
- **Framework**: Next.js 15 (App Router) - simply the best choice for React applications today, offering SSR, server components, and intuitive routing.
- **Language**: TypeScript - strict typing ensures code reliability and easier refactoring.
- **Styling**: Tailwind CSS v4 + Ant Design - combines the utility-first speed of Tailwind with the rich, accessible components of AntD.
### "Under the Hood" (Why I built it this way)
_Intended for technical reviewers_
1.  **Debouncing Strategy**: To prevent hitting TMDB's API rate limits during typing, I implemented a 500ms debounce on the search input. This creates a smoother experience and reduces backend load.
2.  **Server vs. Client Components**: I strategically used Client Components only where interactivity was needed (search input, rating interactions), leaving the rest as Server Components to minimize the JS bundle size sent to the browser.
3.  **Guest Session Management**: The app initiates a guest session with TMDB upon first load, persisting the Session ID in local storage to allow non-logged-in users to rate movies seamlessly.
---
## 🔮 Roadmap & Planned Improvements
- [ ] **Unit Testing**: Add Jest and React Testing Library for component unit tests.
- [ ] **Unified API Layer**: Refactor direct client-side API calls to use the internal API proxy exclusively for better security and consistency.
- [ ] **E2E Testing**: Implement Cypress or Playwright for critical user flows.
