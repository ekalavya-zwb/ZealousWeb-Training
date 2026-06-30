import AddContactBtn from "../_components/AddContactBtn";
import ContactList from "../_components/ContactList";
import { getSession } from "../lib/session";
import { User } from "../_types/user";
import { Suspense } from "react";
import Link from "next/link";

export default async function ContactPage() {
  const user: User | null = await getSession();

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <h1 className="mb-2 text-4xl font-bold text-red-500">User Not Found</h1>
        <p className="text-lg text-gray-600">
          Please{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            login
          </Link>{" "}
          to view contacts.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Contacts</h1>
        <AddContactBtn />
      </div>
      <Suspense
        fallback={<p className="mt-4 text-gray-600">Loading Contacts...</p>}
      >
        <ContactList userId={user.id} />
      </Suspense>
    </div>
  );
}
