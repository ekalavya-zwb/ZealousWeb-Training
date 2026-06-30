export type WarehouseProducts = {
  id: number;
  productName: string;
  price: number;
  sku: string;
  warehouseStocks: {
    stock: number;
    warehouseId: number;
  }[];
};
