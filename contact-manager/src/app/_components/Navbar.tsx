import Link from "next/link";
import LogoutBtn from "./LogoutBtn";
import { User } from "@/app/_types/user";

export default function Navbar({ session }: { session: User | null }) {
  return (
    <div className="flex items-center justify-between bg-blue-900 p-4">
      <Link href="/" className="text-xl font-bold text-white">
        Contact Manager
      </Link>
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-white hover:underline">
          Home
        </Link>
        {session ? (
          <div className="flex items-center space-x-4">
            <Link href="/contacts" className="text-white hover:underline">
              Contacts
            </Link>
            <LogoutBtn />
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-white hover:underline">
              Login
            </Link>
            <Link href="/register" className="text-white hover:underline">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
