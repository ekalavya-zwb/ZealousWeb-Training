import Link from "next/link";

export default function Header() {
  return (
    <div className="border-black/10 border-b flex items-center justify-between px-4 py-2">
      <Link href="/" className="text-2xl font-semibold">
        Logo
      </Link>

      <ul className="flex items-center gap-3 text-lg">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/posts">Posts</Link>
        </li>
      </ul>
    </div>
  );
}
