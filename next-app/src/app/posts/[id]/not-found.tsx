import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center mt-10 mb-10">
      <h1 className="text-3xl capitalize font-bold mb-3">Post Not Found</h1>
      <p className="text-lg">The post you are looking for does not exist.</p>
      <Link
        href="/posts"
        className="text-blue-500 hover:underline mt-2 inline-block"
      >
        Back to Posts
      </Link>
    </div>
  );
}
