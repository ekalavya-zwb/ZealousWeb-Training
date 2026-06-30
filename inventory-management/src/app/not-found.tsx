import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-semibold text-red-600">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-600">
        The page you are looking for does not exist.
      </p>
      <Link className="text-md text-blue-500 hover:text-blue-600" href="/">
        Return to Dashboard
      </Link>
    </div>
  );
}
