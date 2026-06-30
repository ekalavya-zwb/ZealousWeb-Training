"use client";

import { loginAction } from "../actions/auth";
import { useActionState, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthActionState } from "../_types/authActionState";

export default function LoginForm() {
  const [state, action, isPending] = useActionState<AuthActionState, FormData>(
    loginAction,
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!state || !("error" in state)) {
      return;
    }

    const setTimer = setTimeout(() => {
      setError(state.error);
    }, 0);

    const clearTimer = setTimeout(() => {
      setError(null);
    }, 3000); // disappears after 3 seconds

    return () => {
      clearTimeout(setTimer);
      clearTimeout(clearTimer);
    };
  }, [state]);

  useEffect(() => {
    if (!state || !("success" in state)) {
      return;
    }

    const timer = setTimeout(() => {
      router.push("/contacts");
    }, 1000); // redirect after 1 second

    return () => clearTimeout(timer);
  }, [state, router]);

  return (
    <form action={action} className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-semibold text-gray-900">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          className="rounded border border-gray-500 p-2 ring-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="font-semibold text-gray-900">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          className="rounded border border-gray-500 p-2 ring-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="mt-2 cursor-pointer rounded bg-blue-500 px-2 py-1 text-lg text-white hover:bg-blue-600"
      >
        Login
      </button>
      {isPending && <p className="text-center text-gray-500">Logging in...</p>}
      {error && (
        <p className="rounded-sm bg-red-50 p-1 text-center text-red-500">
          {error}
        </p>
      )}
      {state && "success" in state && (
        <p className="rounded-sm bg-green-50 p-1 text-center text-green-500">
          {state.success}
        </p>
      )}
    </form>
  );
}
