export type Product = {
  id: number;
  productName: string;
  price: number;
  sku: string;
  warehouseStocks: {
    stock: number;
    warehouse: {
      warehouseName: string;
    };
  }[];
};
