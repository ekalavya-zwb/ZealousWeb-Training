"use client";

import { useRouter } from "next/navigation";

export default function AddContactBtn() {
  const router = useRouter();

  return (
    <button
      type="button"
      className="cursor-pointer rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600"
      onClick={() => router.push("/contacts/add")}
    >
      Add Contact
    </button>
  );
}
