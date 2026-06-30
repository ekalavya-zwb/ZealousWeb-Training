import EditContactForm from "@/app/_components/EditContactForm";
import { Contact } from "@/app/_types/contact";
import { User } from "@/app/_types/user";
import { prisma } from "@/app/lib/prisma";
import { getSession } from "@/app/lib/session";
import Link from "next/link";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
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

  const contact: Contact | null = await prisma.contact.findFirst({
    where: { id, userId: user?.id },
  });

  if (!contact) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <h1 className="mb-2 text-4xl font-bold text-red-500">
          Contact Not Found
        </h1>
        <p className="text-lg text-gray-600">
          The contact you are looking for does not exist.
        </p>
        <p className="mt-2 text-lg text-gray-600">
          Return to{" "}
          <Link href="/contacts" className="text-blue-500 hover:underline">
            contacts
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="min-w-md rounded-md bg-white p-8 shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Edit Contact</h1>
        <EditContactForm contact={contact} />
      </div>
    </div>
  );
}
