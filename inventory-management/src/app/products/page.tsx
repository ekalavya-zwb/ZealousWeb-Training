import { getProducts } from "@/src/actions/products";
import ProductsTable from "@/src/components/ProductsTable";

export default async function ProductsPage() {
  const { products } = await getProducts();

  return (
    <div className="p-4">
      <h1 className="mb-4 text-3xl font-bold">Products</h1>
      <ProductsTable products={products} />
    </div>
  );
}
