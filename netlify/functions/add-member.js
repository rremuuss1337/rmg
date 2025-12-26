import { Redis } from "@upstash/redis";

export default async function handler(req) {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  try {
    const { name, email } = await req.json();
    if (!name || !email) return new Response(JSON.stringify({ error: "Eksik bilgi" }), { status: 400 });

    await redis.hset("members", email, name);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Sunucu hatası" }), { status: 500 });
  }
}
