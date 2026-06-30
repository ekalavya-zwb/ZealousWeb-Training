export type WarehouseStock = {
  stock: number;
  warehouse: {
    warehouseName: string;
  };
  product: {
    productName: string;
    sku: string;
    price: number;
  };
};
