import AddContactForm from "@/app/_components/AddContactForm";
import Link from "next/link";
import { User } from "../../_types/user";
import { getSession } from "@/app/lib/session";

export default async function AddContactPage() {
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
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="min-w-md rounded-md bg-white p-8 shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Add Contact</h1>
        <AddContactForm />
      </div>
    </div>
  );
}
