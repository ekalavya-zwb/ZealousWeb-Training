import { headers } from "next/headers";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_RULES = {
  login: { limit: 5, windowMs: 15 * 60 * 1000 }, // 5 attempts / 15 min
  register: { limit: 3, windowMs: 60 * 60 * 1000 }, // 3 attempts / 1 hour
};

export function isRateLimited(
  ip: string,
  action: keyof typeof RATE_LIMIT_RULES,
): boolean {
  const { limit, windowMs } = RATE_LIMIT_RULES[action];
  const key = `${ip}:${action}`;
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (entry.count >= limit) return true;

  entry.count++;
  return false;
}

export async function getIp(): Promise<string> {
  const headersList = await headers();
  return headersList.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
}
