import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SESSION_SECRET!;

export async function getKey(): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(SECRET_KEY);
  return crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export function base64urlToUint8Array(base64url: string): Uint8Array {
  // Edge-safe: no Buffer, use atob after converting base64url → base64
  const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "=",
  );
  const binary = atob(padded);
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

export async function signValue(value: string): Promise<string> {
  const key = await getKey();
  const encoder = new TextEncoder();
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(value),
  );
  const sigHex = Buffer.from(signature).toString("base64url");
  // Format: <payload>.<signature>
  return `${value}.${sigHex}`;
}

export async function verifyAndExtract(
  signedValue: string,
): Promise<string | null> {
  const lastDot = signedValue.lastIndexOf(".");
  if (lastDot === -1) return null;

  const value = signedValue.slice(0, lastDot);
  const sigHex = signedValue.slice(lastDot + 1);

  const key = await getKey();
  const encoder = new TextEncoder();
  const signature = Buffer.from(sigHex, "base64url");

  const valid = await crypto.subtle.verify(
    "HMAC",
    key,
    signature,
    encoder.encode(value),
  );
  return valid ? value : null;
}
