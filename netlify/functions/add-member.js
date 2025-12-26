// netlify/functions/add-member.js
import { Redis } from "@upstash/redis";

export default async function handler(req, context) {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  try {
    const body = await req.json();
    const { name, email } = body;

    if (!name || !email) {
      return new Response(JSON.stringify({ error: "Eksik bilgi" }), { status: 400 });
    }

    // Üyeleri hash olarak saklayalım (key: "members", field: email, value: name)
    await redis.hset("members", email, name);

    return new Response(JSON.stringify({ success: true, message: "Üye eklendi" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Sunucu hatası" }), { status: 500 });
  }
}
