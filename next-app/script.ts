import { prisma } from "./prisma/lib/prisma";

async function main() {
  await prisma.user.create({
    data: {
      email: "john@example.com",
      name: "John Doe",
      posts: {
        create: [
          {
            title: "Getting Started with Prisma",
            content: "This is a beginner guide to Prisma ORM.",
            published: true,
          },
          {
            title: "Next.js Tips",
            content: "Some useful tips for building apps with Next.js.",
            published: false,
          },
        ],
      },
    },
  });

  await prisma.user.create({
    data: {
      email: "jane@example.com",
      name: "Jane Smith",
      posts: {
        create: [
          {
            title: "Understanding Databases",
            content: "Relational vs NoSQL databases explained.",
            published: true,
          },
        ],
      },
    },
  });

  await prisma.user.create({
    data: {
      email: "alex@example.com",
      name: "Alex Johnson",
      posts: {
        create: [
          {
            title: "Backend Best Practices",
            content: "How to structure scalable backend systems.",
            published: false,
          },
        ],
      },
    },
  });

  // Fetch all users with their posts
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  console.log("All users:", JSON.stringify(allUsers, null, 2));
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
