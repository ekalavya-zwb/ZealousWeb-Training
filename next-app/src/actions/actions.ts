"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../prisma/lib/prisma";
import { redirect } from "next/navigation";

export async function createPost(data: FormData) {
  const title = data.get("title")?.toString() ?? "";
  const content = data.get("content")?.toString() ?? "";
  const published = data.get("published")?.toString() === "true";
  const authorId = Number(data.get("authorId"));

  await prisma.post.create({
    data: {
      title,
      content,
      published,
      authorId,
    },
  });

  revalidatePath("/posts");
}

export async function updatePost(data: FormData) {
  const id = Number(data.get("id"));
  const title = data.get("title")?.toString() ?? "";
  const content = data.get("content")?.toString() ?? "";
  const published = data.get("published")?.toString() === "true";

  await prisma.post.update({
    where: { id },
    data: {
      title,
      content,
      published,
    },
  });

  revalidatePath(`/posts/${id}`);
}

export async function deletePost(data: FormData) {
  const id = Number(data.get("id"));
  await prisma.post.delete({
    where: { id },
  });

  redirect("/posts");
}
