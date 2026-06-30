export type OrderInfo = {
  id: number;
  customerName: string;
  email: string;
  orderDate: Date;
  status: string;
  warehouseName: string;
  warehouseId: number;
  orderItems: {
    productId: number;
    quantity: number;
    productName: string;
    price: number;
    sku: string;
    status: string;
    totalPrice: number;
  }[];
  totalProducts: number;
  totalPrice: number;
};
