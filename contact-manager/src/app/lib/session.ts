import { cookies } from "next/headers";
import { User } from "../_types/user";
import { signValue, verifyAndExtract } from "./crypto";

// set session cookie or local storage
export async function setSession(user: User) {
  const cookieStore = await cookies();
  const payload = JSON.stringify(user);
  const signed = await signValue(payload);

  cookieStore.set("session", signed, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });
}

// get session cookie or local storage
export async function getSession(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  if (!sessionCookie?.value) {
    return null;
  }

  try {
    const payload = await verifyAndExtract(sessionCookie.value);
    if (!payload) {
      console.warn("Cookie signature verification failed");
      return null;
    }
    return JSON.parse(payload) as User;
  } catch (error) {
    console.error("Failed to parse session cookie", error);
    return null;
  }
}

// clear session cookie or local storage
export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
