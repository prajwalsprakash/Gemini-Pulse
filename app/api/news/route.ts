import { NextResponse } from 'next/server';
import Redis from 'ioredis';

// Initialize Redis using your secret URL
const redis = new Redis(process.env.REDIS_URL as string);

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const CACHE_KEY = 'gemini_news_vault';
const CACHE_TTL = 86400; // 24 Hours

export async function GET() {
  try {
    // 1. Check Redis Cache
    const cachedString = await redis.get(CACHE_KEY);
    const cachedData = cachedString ? JSON.parse(cachedString) : null;
    const now = Date.now();

    if (cachedData && (now - cachedData.lastUpdated < CACHE_TTL * 1000)) {
      return NextResponse.json(cachedData.articles);
    }

    // 2. Fetch fresh news if cache is old
    const res = await fetch(
      `https://newsapi.org/v2/everything?q="Google Gemini" OR "Google AI"&sortBy=publishedAt&language=en&apiKey=${NEWS_API_KEY}`
    );
    const data = await res.json();

    if (data.status === 'error') return NextResponse.json(cachedData?.articles || []);

    const merged = [...(data.articles || []), ...(cachedData?.articles || [])]
      .filter((v, i, a) => a.findIndex(t => t.url === v.url) === i)
      .slice(0, 500);

    // 3. Save back to Redis (Must stringify for standard Redis)
    const updatedVault = { lastUpdated: now, articles: merged };
    await redis.set(CACHE_KEY, JSON.stringify(updatedVault));

    return NextResponse.json(merged);
  } catch (e) {
    console.error("Redis Error:", e);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
