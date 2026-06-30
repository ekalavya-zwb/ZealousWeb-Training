import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { createPost } from "@/src/actions/actions";

export default async function PostsPage() {
  // const email = "john.doe@example.com";
  const email = "Jane.smith@example.com";

  const user = await prisma.user.findUnique({
    where: { email },
    include: { posts: true },
  });
  const postsCount = user ? user.posts.length : 0;

  return (
    <div className="mt-10 text-center">
      {postsCount > 0 ? (
        <>
          <h1 className="text-3xl font-semibold">All Posts ({postsCount})</h1>
          <ul className="mt-2">
            {user?.posts.map((post) => (
              <li
                key={post.id}
                className="text-lg text-blue-500 hover:text-blue-600 hover:underline"
              >
                <Link href={`/posts/${post.slug}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-semibold text-red-600">
            No posts found
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            There are no posts to display.
          </p>
        </>
      )}

      <form action={createPost} className="mx-auto mt-10 max-w-md text-left">
        <input type="hidden" name="author" value={email} />
        <label htmlFor="title" className="text-lg font-semibold">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          className="mb-2 w-full rounded border p-2"
        />
        <label htmlFor="content" className="text-lg font-semibold">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          placeholder="Content"
          className="mb-2 w-full rounded border p-2"
        ></textarea>
        <label htmlFor="published" className="text-lg font-semibold">
          Published
        </label>
        <select
          name="published"
          id="published"
          className="mb-2 w-full rounded border p-2"
        >
          <option value="">Select an option</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <button
          type="submit"
          className="mt-2 cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
