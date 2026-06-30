"use server";

import { User } from "../_types/user";
import { prisma } from "../lib/prisma";
import { clearSession, setSession } from "../lib/session";
import bcrypt from "bcryptjs";
import { createHash } from "../_utils/bcrypt";
import { registerSchema, loginSchema } from "../lib/zodSchemas";
import { AuthActionState } from "../_types/authActionState";
import { redirect } from "next/navigation";
import { isRateLimited, getIp } from "../lib/rateLimit";

export async function loginAction(
  previousState: AuthActionState,
  authData: FormData,
): Promise<AuthActionState> {
  const ip = await getIp();
  if (isRateLimited(ip, "login")) {
    return {
      error: "Too many login attempts. Please wait 15 minutes and try again.",
    };
  }

  const rawData = {
    email: authData.get("email"),
    password: authData.get("password"),
  };

  const validationResult = loginSchema.safeParse(rawData);

  if (!validationResult.success) {
    return { error: validationResult.error.issues[0].message };
  }

  const { email, password } = validationResult.data;

  try {
    const foundUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!foundUser) {
      return { error: "User with this email does not exist" };
    }

    const isPasswordValid = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordValid) {
      return { error: "Wrong password. Please try again." };
    }

    const user: User = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
    };

    // set user in cookie or local storage
    await setSession(user);
  } catch (error) {
    console.error("Error login user:", error);
    return { error: "Error login user" };
  }

  return { success: "Login successful!" };
}

export async function registerAction(
  previousState: AuthActionState,
  authData: FormData,
): Promise<AuthActionState> {
  const ip = await getIp();
  if (isRateLimited(ip, "register")) {
    return {
      error:
        "Too many registration attempts. Please wait 1 hour and try again.",
    };
  }

  const rawData = {
    name: authData.get("name"),
    email: authData.get("email"),
    password: authData.get("password"),
    confirmPassword: authData.get("confirmPassword"),
  };

  const validationResult = registerSchema.safeParse(rawData);

  if (!validationResult.success) {
    return { error: validationResult.error.issues[0].message };
  }

  const { name, email, password } = validationResult.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "User with this email already exists" };
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: await createHash(password), // hash the password before storing
      },
    });

    const user: User = {
      id: newUser.id,
      name,
      email,
    };

    // set user in cookie or local storage
    await setSession(user);
  } catch (error) {
    console.error("Error registering user:", error);
    return { error: "Error registering user" };
  }

  return { success: "Registration successful!" };
}

export async function logoutAction() {
  try {
    // clear user from cookie or local storage
    await clearSession();
  } catch (error) {
    console.error("Error logging out user:", error);
    throw new Error("Error logging out user");
  }

  redirect("/login");
}
