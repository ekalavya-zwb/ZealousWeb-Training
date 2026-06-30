import { prisma } from "../../../lib/prisma";
import { updatePost } from "@/src/actions/actions";
import { deletePost } from "@/src/actions/actions";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post) {
    return (
      <div className="mt-10 text-center">
        <h1 className="text-3xl font-semibold text-red-600">Post not found</h1>
        <p className="mt-2 text-lg text-gray-600">
          The post with slug &quot;{slug}&quot; does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 text-center">
      <h1 className="text-3xl font-semibold">{post.title}</h1>
      <p className="mt-2 text-lg text-gray-600">{post.content}</p>

      <div className="mt-4 flex justify-center gap-4">
        <form action={deletePost}>
          <input type="hidden" name="id" value={post.id} />
          <button
            type="submit"
            className="cursor-pointer rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </form>
      </div>

      <form action={updatePost} className="mx-auto mt-10 max-w-md text-left">
        <input type="hidden" name="id" value={post.id} />
        <label htmlFor="title" className="text-lg font-semibold">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={post.title}
          placeholder="Title"
          className="mb-2 w-full rounded border p-2"
        />
        <label htmlFor="content" className="text-lg font-semibold">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          defaultValue={post.content}
          placeholder="Content"
          className="mb-2 w-full rounded border p-2"
        ></textarea>
        <label htmlFor="published" className="text-lg font-semibold">
          Published
        </label>
        <select
          key={post.published.toString()}
          name="published"
          id="published"
          defaultValue={post.published.toString()}
          className="mb-2 w-full rounded border p-2"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <button
          type="submit"
          className="mt-2 cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Update Post
        </button>
      </form>
    </div>
  );
}
