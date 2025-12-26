import { Redis } from "@upstash/redis";

export default async function handler(req) {
  if (req.method !== "GET") return new Response("Method Not Allowed", { status: 405 });

  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  try {
    const members = await redis.hgetall("members");
    return new Response(JSON.stringify(members || {}), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Hata" }), { status: 500 });
  }
}
