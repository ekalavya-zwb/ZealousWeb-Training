import Link from "next/link";
import { FiEdit } from "react-icons/fi";
import DeleteContactBtn from "./DeleteContactBtn";
import { Contact } from "../_types/contact";
import { prisma } from "../lib/prisma";

export default async function ContactList({ userId }: { userId: string }) {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading delay
  const contacts: Contact[] = await prisma.contact.findMany({
    where: { userId },
  });

  if (!contacts || contacts.length === 0) {
    return <p className="mt-4 text-gray-600">No contacts found. Add some!</p>;
  }

  return (
    <div>
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="mb-2 rounded border p-2 hover:bg-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">{contact.name}</h2>
              <p className="text-gray-600">{contact.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/contacts/edit/${contact.id}`}
                className="rounded border border-blue-500 px-2 py-1 text-blue-500 hover:bg-blue-100 hover:text-blue-700"
              >
                <div className="flex items-center gap-1">
                  <FiEdit /> Edit
                </div>
              </Link>
              <DeleteContactBtn id={contact.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
