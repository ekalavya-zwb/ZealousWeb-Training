import { z } from "zod";

export const orderDetailsSchema = z.object({
  name: z.string().min(1, "Customer name is required"),
  email: z.string().email("Invalid email address"),
  orderDate: z.string().min(1, "Order date is required"),
  warehouse: z.string().min(1, "Please select a warehouse"),
});
