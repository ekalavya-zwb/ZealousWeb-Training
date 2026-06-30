import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

const initialPosts = [
  {
    title: "My First Post",
    slug: "my-first-post",
    content: "This is the content of my first post.",
    published: false,
    author: {
      connectOrCreate: {
        where: { email: "john.doe@example.com" },
        create: {
          name: "John Doe",
          email: "john.doe@example.com",
          password: "john@123",
        },
      },
    },
  },
  {
    title: "My Second Post",
    content: "This is the content of my second post.",
    slug: "my-second-post",
    published: true,
    author: {
      connectOrCreate: {
        where: { email: "jane.smith@example.com" },
        create: {
          name: "Jane Smith",
          email: "jane.smith@example.com",
          password: "jane@123",
        },
      },
    },
  },
  {
    title: "My Third Post",
    content: "This is the content of my third post.",
    slug: "my-third-post",
    published: true,
    author: {
      connectOrCreate: {
        where: { email: "jane.smith@example.com" },
        create: {
          name: "Jane Smith",
          email: "jane.smith@example.com",
          password: "jane@123",
        },
      },
    },
  },
];

async function main() {
  console.log("Start seeding...");
  for (const post of initialPosts) {
    await prisma.post.create({
      data: post,
    });
    console.log(`Created post: ${post.title}`);
  }
  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
