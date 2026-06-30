import { Status } from "@/generated/prisma/enums";

export type OrderFilter = {
  customerName?: string;
  email?: string;
  status?: Status;
  orderDateFrom?: Date;
  orderDateTo?: Date;
  totalAmountMin?: number;
  totalAmountMax?: number;
  page?: number;
};
