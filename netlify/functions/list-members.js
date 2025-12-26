
// netlify/functions/list-members.js
import { Redis } from "@upstash/redis";

export default async function handler(req) {
  if (req.method !== "GET") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  try {
    const members = await redis.hgetall("members");  // Tüm hash'i getirir { email1: name1, email2: name2 }
    return new Response(JSON.stringify(members || {}), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Hata oluştu" }), { status: 500 });
  }
}
