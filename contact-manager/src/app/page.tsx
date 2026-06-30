import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-[90vh] flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Welcome to Contacts Manager</h1>
        <p className="mt-4 text-lg text-gray-600">
          Manage your contacts efficiently and effortlessly.
        </p>
        <Image
          src="/contacts.png"
          alt="Contact Manager Logo"
          width={350}
          height={350}
          priority
          className="mx-auto mt-4 h-auto w-auto rounded-md shadow-md"
        />
        <p className="mt-4 text-lg text-gray-600">
          Start managing your contacts today!
        </p>
      </div>
    </div>
  );
}
