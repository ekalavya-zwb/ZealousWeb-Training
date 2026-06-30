import { Status } from "@/generated/prisma/enums";

export type Order = {
  id: number;
  customerName: string;
  email: string;
  orderDate: Date;
  status: Status;
  totalPrice?: number;
  totalProducts?: number;
};
