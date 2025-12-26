import { Redis } from "@upstash/redis";

export default async function handler(req) {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  try {
    const { email } = await req.json();
    if (!email) return new Response(JSON.stringify({ error: "Email gerekli" }), { status: 400 });

    await redis.hdel("members", email);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Hata" }), { status: 500 });
  }
}
