import "dotenv/config";
import { PrismaClient } from "./generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function insertPost() {
  try {
    const post = await prisma.post.createMany({
      data: [
        {
          title: "My First Post",
          content: "This is the content of my first post.",
          slug: "my-first-post",
          published: false,
        },
        {
          title: "My Second Post",
          content: "This is the content of my second post.",
          slug: "my-second-post",
          published: true,
        },
      ],
    });
    console.log("Post created successfully:", post.count);
  } catch (error) {
    console.error("Error creating post:", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function insertUser() {
  try {
    const user = await prisma.user.create({
      data: {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "gfsfdsdfsffdffsfwew",
      },
    });
    console.log("User created successfully:", user);
  } catch (error) {
    console.error("Error creating user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

insertUser();
insertPost();
