# 🚀 TheGeminiPulse - Google AI News Hub

A sophisticated, high-performance news aggregator for **Google AI** and **Gemini** updates. Built with the cutting-edge **Next.js 16**, **React 19**, and **Tailwind CSS** ecosystem. This platform features a dual-mode architecture, a research-grade search engine, and an intelligent Redis caching layer.

---

## ✨ Features

* **Dynamic News Aggregation**: Pulls real-time headlines and updates across the Google AI ecosystem from across the web.
* **Intelligent Redis Caching Engine**: Implements **ioredis** to maintain a rolling archive while bypassing NewsAPI's 100-request/day limit. Implements `ioredis` to maintain a 1-year news archive while respecting NewsAPI rate limits.
* **One-Click Sharing**: Native Web Share API integration for instant distribution to social platforms.
* **Serverless Optimized**: Architecture specifically designed for Vercel’s edge runtime and low-latency response.
* **System-Aware Theme**: Automatically syncs with your OS (Mac/Windows/Linux) to provide a seamless Light or Dark "Deep Space" experience.
* **Intelligent Filtering**: Real-time search and category filtering (Models, Research, Enterprise) using React `useMemo` for zero-lag performance.
* **Bento Grid UI**: A modern, responsive layout built with CSS Modules to ensure structural integrity across all devices.
* **Hydration Optimized**: Specifically engineered to handle React 19 hydration patterns and bypass browser extension interference.

---

## 🛠️ Tech Stack

* **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
* **Library**: [React 19](https://react.dev/)
* **Database/Cache**: [Redis Labs](https://redis.com/) (via `ioredis`)
* **Styling**: CSS Modules & Global Variables (Tailwind-free for maximum stability)
* **Icons**: [Lucide React](https://lucide.dev/)
---

## 🚀 Local Setup

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/prajwalsprakash/gemini-ai-hub.git](https://github.com/prajwalsprakash/gemini-ai-hub.git)
    cd Gemini-Pulse
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env.local` file in the root directory:
    ```env
    # Your Redis Labs Connection String (from redis-14710.crce220...)
    REDIS_URL="redis://default:your_password@your_endpoint:14710"

    # Your NewsAPI.org API Key
    NEWS_API_KEY="your_api_key_here"
    ```

4.  **Run Development Server**
    ```bash
    npm run dev --webpack
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the hub.

---

## 🌐 Vercel Deployment

1.  Push your code to your GitHub repository.
2.  Go to the [Vercel Dashboard](https://vercel.com) and click **"Add New" > "Project"**.
3.  Import your `gemini-ai-hub` repository.
4.  Under **Environment Variables**, add the following keys from your `.env.local`:
    * `REDIS_URL`
    * `NEWS_API_KEY`
5.  Click **Deploy**.

---

## 📄 License & Copyright

Copyright (c) 2026 **Prajwal S Prakash** ([@prajwalsprakash](https://github.com/prajwalsprakash))

This project is licensed under the **MIT License**. See the `LICENSE` file for more details.

---

**© TheGeminiPulse - Google AI News Hub - by [Prajwal](https://github.com/prajwalsprakash)**
