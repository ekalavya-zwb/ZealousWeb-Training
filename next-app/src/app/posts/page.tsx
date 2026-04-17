import Link from "next/link";
import { prisma } from "../../../prisma/lib/prisma";
import { createPost } from "@/src/actions/actions";

type Post = {
  id: number;
  title: string;
};

export default async function page() {
  const posts = await prisma.post.findMany();
  return (
    <div className="text-center mt-10 mb-10">
      <h1 className="text-3xl capitalize font-bold mb-3">Posts</h1>
      <ul>
        {posts.map((post: Post) => (
          <li key={post.id} className="text-lg">
            <Link
              href={`/posts/${post.id}`}
              className="text-blue-500 hover:underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>

      <form action={createPost} className="mx-auto mt-10 max-w-md text-left">
        <label htmlFor="title" className="text-lg font-semibold">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          className="border p-2 rounded mb-2 w-full"
        />
        <label htmlFor="content" className="text-lg font-semibold">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          placeholder="Content"
          className="border p-2 rounded mb-2 w-full"
        ></textarea>
        <label htmlFor="published" className="text-lg font-semibold">
          Published
        </label>
        <select
          name="published"
          id="published"
          className="border p-2 rounded mb-2 w-full"
        >
          <option value="">Select an option</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <label htmlFor="authorId" className="text-lg font-semibold">
          Author
        </label>
        <input
          type="number"
          id="authorId"
          name="authorId"
          placeholder="Author"
          className="border p-2 rounded mb-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600 cursor-pointer"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
