import { prisma } from "../../../../prisma/lib/prisma";
import { notFound } from "next/navigation";
import { updatePost } from "@/src/actions/actions";
import { deletePost } from "@/src/actions/actions";
import UpvoteBtn from "@/src/components/UpvoteBtn";

type PostContent = {
  id: number;
  title: string;
  content: string | null;
  published: boolean;
};

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post: PostContent | null = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="text-center mt-10 mb-10">
      <h1 className="text-3xl capitalize font-bold mb-3">{post.title}</h1>
      <p className="text-lg">{post.content}</p>

      <div className="flex justify-center gap-4 mt-4">
        <form action={deletePost}>
          <input type="hidden" name="id" value={post.id} />
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
          >
            Delete
          </button>
        </form>

        <UpvoteBtn />
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
          className="border p-2 rounded mb-2 w-full"
        />
        <label htmlFor="content" className="text-lg font-semibold">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          defaultValue={post.content ?? ""}
          placeholder="Content"
          className="border p-2 rounded mb-2 w-full"
        ></textarea>
        <label htmlFor="published" className="text-lg font-semibold">
          Published
        </label>
        <select
          key={post.published.toString()}
          name="published"
          id="published"
          defaultValue={post.published.toString()}
          className="border p-2 rounded mb-2 w-full"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600 cursor-pointer"
        >
          Update Post
        </button>
      </form>
    </div>
  );
}
