"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../lib/prisma";
import { Prisma } from "@/generated/prisma/client";

export async function createPost(data: FormData) {
  try {
    if (!data.get("title") || !data.get("content")) {
      throw new Error("Title and content are required");
    }

    await prisma.post.create({
      data: {
        title: data.get("title") as string,
        slug: (data.get("title") as string).toLowerCase().replace(/\s+/g, "-"),
        content: data.get("content") as string,
        published: data.get("published") === "true",
        author: {
          connect: { email: data.get("author") as string },
        },
      },
    });

    revalidatePath("/posts");
  } catch (error) {
    console.error("Error in createPost:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error(
          "There is a unique constraint violation. A post with this title already exists or the author email already exists.",
        );
      }
    }
    console.error("Error creating post:", error);
    throw error;
  }
}

export async function updatePost(data: FormData) {
  const id = data.get("id") as string;

  try {
    if (!data.get("title") || !data.get("content")) {
      throw new Error("Title and content are required");
    }

    await prisma.post.update({
      data: {
        title: data.get("title") as string,
        slug: (data.get("title") as string).toLowerCase().replace(/\s+/g, "-"),
        content: data.get("content") as string,
        published: data.get("published") === "true",
      },
      where: {
        id,
      },
    });

    revalidatePath(`/posts/${id}`);
  } catch (error) {
    console.error("Error in updatePost:", error);
    throw error;
  }
}

export async function deletePost(data: FormData) {
  const id = data.get("id") as string;

  try {
    await prisma.post.delete({
      where: {
        id,
      },
    });

    revalidatePath("/posts");
    redirect("/posts");
  } catch (error) {
    console.error("Error in deletePost:", error);
    throw error;
  }
}
