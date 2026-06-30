import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { createHash } from "@/app/_utils/bcrypt";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

const users = [
  {
    name: "user1",
    email: "user1@example.com",
    password: "password123",
    contacts: {
      create: [
        {
          name: "John Doe",
          email: "john.doe@example.com",
        },
        {
          name: "Jane Smith",
          email: "jane.smith@example.com",
        },
      ],
    },
  },
  {
    name: "user2",
    email: "user2@example.com",
    password: "password123",
    contacts: {
      create: [
        {
          name: "Bob Johnson",
          email: "bob.johnson@example.com",
        },
      ],
    },
  },
];

async function main() {
  console.log("Seeding database...");

  for (const user of users) {
    await prisma.user.create({
      data: {
        ...user,
        password: await createHash(user.password),
      },
    });
    console.log(`Created user: ${user.email}`);
  }
}

main()
  .then(() => {
    console.log("Seeding finished successfully.");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
