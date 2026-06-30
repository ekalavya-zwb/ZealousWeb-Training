import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { Status } from "../generated/prisma/enums";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

const warehouses = [
  {
    warehouseName: "North Warehouse",
    location: "321 North St, Hamletville",
    warehouseStocks: {
      create: [
        {
          productId: 1,
          stock: 50,
        },
        {
          productId: 2,
          stock: 30,
        },
        {
          productId: 3,
          stock: 20,
        },
        {
          productId: 4,
          stock: 10,
        },
        {
          productId: 5,
          stock: 20,
        },
      ],
    },
  },
  {
    warehouseName: "South Warehouse",
    location: "654 South St, Boroughville",
    warehouseStocks: {
      create: [
        {
          productId: 1,
          stock: 40,
        },
        {
          productId: 2,
          stock: 25,
        },
        {
          productId: 3,
          stock: 15,
        },
        {
          productId: 4,
          stock: 8,
        },
        {
          productId: 5,
          stock: 12,
        },
      ],
    },
  },
];

const products = [
  {
    productName: "Laptop",
    sku: "LAP-001",
    price: 999.99,
  },
  {
    productName: "Headphones",
    sku: "HDP-001",
    price: 199.99,
  },
  {
    productName: "Monitor",
    sku: "MNT-001",
    price: 299.99,
  },
  {
    productName: "Keyboard",
    sku: "KBD-001",
    price: 49.99,
  },
  {
    productName: "Mouse",
    sku: "MSE-001",
    price: 29.99,
  },
];

const statuses: Status[] = [Status.PLACED, Status.COMPLETED, Status.CANCELLED];
const names = [
  { name: "Alice Johnson", email: "alice.johnson@example.com" },
  { name: "Bob Smith", email: "bob.smith@example.com" },
  { name: "Charlie Brown", email: "charlie.brown@example.com" },
  { name: "Diana Prince", email: "diana.prince@example.com" },
  { name: "Ethan Hunt", email: "ethan.hunt@example.com" },
  { name: "Fiona Glenanne", email: "fiona.glenanne@example.com" },
  { name: "George Bluth", email: "george.bluth@example.com" },
  { name: "Hannah Abbott", email: "hannah.abbott@example.com" },
  { name: "Ian Wright", email: "ian.wright@example.com" },
  { name: "Julia Roberts", email: "julia.roberts@example.com" },
  { name: "Kevin McCallister", email: "kevin.mccallister@example.com" },
  { name: "Laura Palmer", email: "laura.palmer@example.com" },
];

// Generate 12 dynamic orders
const orders = Array.from({ length: 12 }).map((_, index) => {
  // Randomly pick a name, warehouse (1 or 2), and status
  const randomName = names[index].name;
  const randomEmail = names[index].email;
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  const randomWarehouseId = Math.floor(Math.random() * 2) + 1;

  // Pick 2 different random product IDs
  const productId1 = Math.floor(Math.random() * 5) + 1;
  let productId2 = Math.floor(Math.random() * 5) + 1;
  // Ensure productId2 is different from productId1
  while (productId2 === productId1) {
    productId2 = Math.floor(Math.random() * 5) + 1;
  }

  return {
    customerName: randomName,
    email: randomEmail,
    warehouseId: randomWarehouseId,
    status: randomStatus,
    orderItems: {
      create: [
        {
          productId: productId1,
          quantity: Math.floor(Math.random() * 5) + 1,
          status: randomStatus,
        },
        {
          productId: productId2,
          quantity: Math.floor(Math.random() * 5) + 1,
          status: randomStatus,
        },
      ],
    },
  };
});

async function main() {
  console.log("Seeding database...");

  // 1. Seed Products (Use upsert to avoid duplicates if re-running)
  for (const product of products) {
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: {},
      create: product,
    });
  }
  console.log("Products Seeded");

  // 2. Seed Warehouses
  for (const warehouse of warehouses) {
    await prisma.warehouse.create({
      data: warehouse,
    });
  }
  console.log("Warehouses Seeded");

  // 3. Seed the 12 Dynamic Orders
  for (const order of orders) {
    await prisma.order.create({
      data: order,
    });
  }
  console.log("12 Orders Seeded with mixed statuses");
}

main()
  .then(() => console.log("Seeding finished successfully."))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
