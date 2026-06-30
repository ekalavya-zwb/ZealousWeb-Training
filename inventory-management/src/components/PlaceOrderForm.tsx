"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { getProductsByWarehouse } from "../actions/products";
import { placeOrder, getOrderInfo } from "../actions/orders";
import { getCurrentDate } from "../utils/getCurrentDate";
import highlightStockStatus from "../utils/highlightStockStatus";
import formatDate from "../utils/formatDate";
import { orderDetailsSchema } from "../schema/orderDetails";
import { Warehouse } from "../types/Warehouse";
import { OrderInfo } from "../types/OrderInfo";
import { WarehouseProducts } from "../types/WarehouseProducts";
import { FiUser } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";
import { FiHome } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";

const totalSteps = 4;

export default function PlaceOrderForm({
  warehouses,
}: {
  warehouses: Warehouse[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initialize state from URL parameters to ensure consistency on page reloads and navigation
  const currentStep = Number(searchParams.get("step") ?? 1);
  const orderIdFromUrl = searchParams.get("orderId") ?? null;

  const initialValues = useRef({
    name: searchParams.get("customerName") ?? "",
    email: searchParams.get("email") ?? "",
    orderDate: getCurrentDate(),
    warehouse: searchParams.get("warehouse") ?? "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(orderDetailsSchema),
    defaultValues: initialValues.current,
    mode: "onTouched",
  });

  const watchedName = watch("name");
  const watchedEmail = watch("email");
  const watchedOrderDate = watch("orderDate");
  const watchedWarehouse = watch("warehouse");

  const [products, setProducts] = useState<WarehouseProducts[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<
    { productId: number; quantity: number }[]
  >([]);
  const [orderDetails, setOrderDetails] = useState<OrderInfo | null>(null);

  const [orderId, setOrderId] = useState<number | null>(
    orderIdFromUrl ? Number(orderIdFromUrl) : null,
  );

  const [loadingProducts, setLoadingProducts] = useState(
    currentStep === 2 && !!watchedWarehouse, // Only set to true if we're on step 2 and have a warehouse selected from URL
  );
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to update URL parameters and navigate to the specified step
  const goToStep = useCallback(
    (step: number, newOrderId?: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("step", String(step));
      params.set("customerName", watchedName || "");
      params.set("email", watchedEmail || "");
      params.set("warehouse", watchedWarehouse || "");

      // Only set orderId in URL if we have a new one from placing the order, otherwise keep existing orderId in URL for consistency
      if (newOrderId) {
        params.set("orderId", String(newOrderId));
      } else if (orderId) {
        params.set("orderId", String(orderId));
      }

      router.push(`?${params.toString()}`);
    },
    [
      router,
      searchParams,
      watchedName,
      watchedEmail,
      watchedWarehouse,
      orderId,
    ],
  );

  const prevStep = () => {
    goToStep(currentStep - 1);
    setError(null);
  };

  const nextStep = () => {
    goToStep(currentStep + 1);
  };

  const fetchProducts = useCallback(async () => {
    try {
      setLoadingProducts(true);
      setError(null);
      const response = await getProductsByWarehouse(Number(watchedWarehouse));
      setProducts(response.products);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load products. Please try again.",
      );
      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  }, [watchedWarehouse]);

  const fetchOrderInfo = useCallback(async (orderId: number) => {
    try {
      setLoadingOrder(true);
      setError(null); // Clear previous errors
      const orderInfo = await getOrderInfo(orderId);
      setOrderDetails(orderInfo);
    } catch (error) {
      console.error("Error fetching order info:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load order info. Please try again.",
      );
      setOrderDetails(null); // Ensure it's null on error
      setProducts([]); // Clear products on error
    } finally {
      setLoadingOrder(false);
    }
  }, []);

  const handleQuantityChange = (productId: number, quantity: number) => {
    setSelectedProducts((prev) => {
      if (quantity === 0) {
        return prev.filter((p) => p.productId !== productId);
      }

      const existingProduct = prev.find((p) => p.productId === productId);
      if (existingProduct) {
        return prev.map((p) =>
          p.productId === productId ? { ...p, quantity } : p,
        );
      } else {
        return [...prev, { productId, quantity }];
      }
    });
  };

  const handlePlaceOrder = async () => {
    if (selectedProducts.length === 0) {
      setError("Please add at least one product to the order.");
      return;
    }

    try {
      setLoadingOrder(true);
      setError(null);

      const newOrderId = await placeOrder({
        customerName: watchedName,
        email: watchedEmail,
        orderDate: new Date(watchedOrderDate),
        warehouseId: Number(watchedWarehouse),
        items: selectedProducts,
      });

      // After successfully placing the order, navigate to the confirmation step with the new orderId in the URL
      goToStep(4, newOrderId);
      setOrderId(newOrderId); // Update local state with new orderId for consistency
    } catch (error) {
      console.error("Error placing order:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to place order. Please try again.",
      );
    } finally {
      setLoadingOrder(false);
    }
  };

  // Hydrate from localStorage on mount (client-side only)
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    const storedSelectedProducts = localStorage.getItem("selectedProducts");

    if (storedProducts) {
      try {
        setProducts(JSON.parse(storedProducts));
      } catch (e) {
        console.error("Failed to parse products from localStorage", e);
      }
    }

    if (storedSelectedProducts) {
      try {
        setSelectedProducts(JSON.parse(storedSelectedProducts));
      } catch (e) {
        console.error("Failed to parse selectedProducts from localStorage", e);
      }
    }
  }, []);

  useEffect(() => {
    if (currentStep === 2 && watchedWarehouse && products.length === 0) {
      fetchProducts();
    }
  }, [currentStep, watchedWarehouse, fetchProducts, products.length]);

  useEffect(() => {
    if (currentStep === 4 && orderId && !orderDetails) {
      fetchOrderInfo(orderId);
    }
  }, [currentStep, orderId, fetchOrderInfo, orderDetails]);

  useEffect(() => {
    // Reset selected products when warehouse changes (but not on initial mount)
    const warehouseChanged = watchedWarehouse !== searchParams.get("warehouse");
    if (warehouseChanged) {
      setSelectedProducts([]);
    }
  }, [watchedWarehouse, searchParams]);

  useEffect(() => {
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  return (
    <div className="w-full">
      {currentStep === 1 && (
        <>
          <p className="mt-4 text-center font-semibold">
            Page {currentStep} of {totalSteps}
          </p>

          <div className="mx-auto mt-6 max-w-lg rounded-md bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">
              Step 1: Enter Order Details
            </h2>
            <form
              onSubmit={handleSubmit(nextStep)}
              className="flex flex-col gap-2"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-semibold text-gray-900">
                  Customer Name:
                </label>
                <input
                  {...register("name")}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  className="rounded-md border border-gray-500 p-2 ring-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-semibold text-gray-900">
                  Email:
                </label>
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="rounded-md border border-gray-500 p-2 ring-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="orderDate"
                  className="font-semibold text-gray-900"
                >
                  Order Date:
                </label>
                <input
                  {...register("orderDate")}
                  type="date"
                  id="orderDate"
                  name="orderDate"
                  className="rounded-md border border-gray-500 p-2 ring-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
                {errors.orderDate && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.orderDate.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="warehouse"
                  className="font-semibold text-gray-900"
                >
                  Select Warehouse:
                </label>
                <select
                  {...register("warehouse")}
                  id="warehouse"
                  name="warehouse"
                  className="rounded-md border border-gray-500 p-2 ring-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="" disabled>
                    Choose a Warehouse
                  </option>
                  {warehouses.map((warehouse) => (
                    <option key={warehouse.id} value={warehouse.id}>
                      {warehouse.warehouseName} - {warehouse.location}
                    </option>
                  ))}
                </select>
                {errors.warehouse && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.warehouse.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="mt-4 cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-lg font-medium text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-500"
                disabled={!isValid || loadingProducts}
              >
                {loadingProducts ? "Loading Products..." : "Next"}
              </button>
            </form>
          </div>
        </>
      )}

      {currentStep === 2 && (
        <>
          <p className="mt-4 text-center font-semibold">
            Page {currentStep} of {totalSteps}
          </p>

          <div className="p-6">
            <h2 className="mb-4 text-2xl font-bold">Step 2: Select Products</h2>

            <table className="w-full table-auto border-collapse border border-gray-300 text-center">
              <thead>
                <tr>
                  <th className="border border-gray-300 bg-white px-4 py-2">
                    Product Name
                  </th>
                  <th className="border border-gray-300 bg-white px-4 py-2">
                    SKU
                  </th>
                  <th className="border border-gray-300 bg-white px-4 py-2">
                    Price
                  </th>
                  <th className="border border-gray-300 bg-white px-4 py-2">
                    Available Stock
                  </th>
                  <th className="border border-gray-300 bg-white px-4 py-2">
                    Stock Status
                  </th>
                  <th className="border border-gray-300 bg-white px-4 py-2">
                    Quantity
                  </th>
                </tr>
              </thead>
              {loadingProducts ? (
                <tbody>
                  <tr>
                    <td
                      colSpan={6}
                      className="border border-gray-300 px-4 py-2 text-gray-600"
                    >
                      Loading products...
                    </td>
                  </tr>
                </tbody>
              ) : products && products.length > 0 ? (
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-white">
                      <td className="border border-gray-300 px-4 py-2">
                        {product.productName}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {product.sku}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {product.warehouseStocks[0]?.stock || 0}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <span
                          className={highlightStockStatus({
                            stock: product.warehouseStocks[0]?.stock || 0,
                          })}
                        >
                          {product.warehouseStocks[0]?.stock &&
                          product.warehouseStocks[0].stock > 10
                            ? "In Stock"
                            : product.warehouseStocks[0]?.stock &&
                                product.warehouseStocks[0].stock > 0
                              ? "Low Stock"
                              : "Out of Stock"}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="number"
                          min="0"
                          value={
                            selectedProducts.find(
                              (p) => p.productId === product.id,
                            )?.quantity || 0
                          }
                          onChange={(e) =>
                            handleQuantityChange(
                              product.id,
                              Number(e.target.value) || 0,
                            )
                          }
                          className="w-15 rounded-md border border-gray-500 p-2 text-center font-semibold ring-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td
                      colSpan={6}
                      className="border border-gray-300 px-4 py-2 text-gray-600"
                    >
                      No products available for this warehouse.
                    </td>
                  </tr>
                </tbody>
              )}
            </table>

            <div className="mt-6 flex items-center gap-2">
              {currentStep > 1 && (
                <button
                  type="button"
                  className="text-md cursor-pointer rounded-md bg-gray-500 px-4 py-2 font-medium text-white hover:bg-gray-600"
                  onClick={prevStep}
                >
                  Previous
                </button>
              )}
              <button
                type="button"
                className="text-md cursor-pointer rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-500"
                onClick={nextStep}
                disabled={
                  selectedProducts.length === 0 ||
                  loadingProducts ||
                  products.length === 0
                }
              >
                Next
              </button>
            </div>

            <div className="mt-6 rounded-md border border-gray-300 bg-gray-50 p-4">
              <h3 className="mb-1 text-xl font-bold">Order Summary:</h3>
              <p className="font-semibold text-gray-900">
                Total Items:{" "}
                {selectedProducts.reduce(
                  (total, item) => total + item.quantity,
                  0,
                )}
              </p>
              <p className="font-semibold text-gray-900">
                Total Price: $
                {selectedProducts
                  .reduce((total, item) => {
                    const product = products.find(
                      (p) => p.id === item.productId,
                    );
                    return total + (product?.price ?? 0) * item.quantity;
                  }, 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>
        </>
      )}

      {currentStep === 3 && (
        <>
          <p className="mt-4 text-center font-semibold">
            Page {currentStep} of {totalSteps}
          </p>

          <div className="p-6">
            <h2 className="mb-2 text-2xl font-bold">
              Step 3: Review Order Details
            </h2>
            <p className="mb-4 text-gray-700">
              Please review your order details before placing the order.
            </p>

            {error && (
              <p className="mb-4 rounded-md bg-red-100 p-4 font-semibold text-red-500">
                {error}
              </p>
            )}

            <div className="mb-6 flex flex-row items-center justify-around gap-4 rounded-md border border-gray-300 bg-gray-50 p-4 text-lg">
              <p className="flex items-center gap-1 font-semibold text-gray-900">
                <FiUser className="inline-block" />
                {watchedName || "N/A"}
              </p>
              <p className="flex items-center gap-1 font-semibold text-gray-900">
                <FiMail className="inline-block" />
                {watchedEmail || "N/A"}
              </p>
              <p className="flex items-center gap-1 font-semibold text-gray-900">
                <FiCalendar className="inline-block" />
                {watchedOrderDate || "N/A"}
              </p>
              <p className="flex items-center gap-1 font-semibold text-gray-900">
                <FiHome className="inline-block" />
                {warehouses.find((w) => w.id === Number(watchedWarehouse))
                  ?.warehouseName || "N/A"}
              </p>
            </div>

            {loadingProducts ||
            !products ||
            (products.length === 0 && !error) ? (
              <div className="mb-6">Loading product details...</div>
            ) : (
              <>
                {selectedProducts.map((item) => {
                  const product = products.find((p) => p.id === item.productId);
                  return (
                    <div
                      key={item.productId}
                      className="rounded-md border-t border-gray-300 p-4"
                    >
                      <p className="mb-1 text-gray-900">
                        <strong>Product Name:</strong> {product?.productName}
                      </p>
                      <p className="mb-1 text-gray-900">
                        <strong>Quantity:</strong> {item.quantity}
                      </p>
                      <p className="mb-1 text-gray-900">
                        <strong>Price:</strong> ${product?.price.toFixed(2)}
                      </p>
                      <p className="mb-1 text-gray-900">
                        <strong>Subtotal:</strong> $
                        {((product?.price ?? 0) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  );
                })}

                <p className="border-t border-gray-300 pt-4 text-lg font-bold text-gray-900">
                  Grand Total: $
                  {selectedProducts
                    .reduce((total, item) => {
                      const product = products.find(
                        (p) => p.id === item.productId,
                      );
                      return total + (product?.price ?? 0) * item.quantity;
                    }, 0)
                    .toFixed(2)}
                </p>
              </>
            )}

            <div className="mt-4 flex items-center gap-2">
              {currentStep > 1 && (
                <button
                  type="button"
                  className="text-md cursor-pointer rounded-md bg-gray-500 px-4 py-2 font-medium text-white hover:bg-gray-600"
                  onClick={prevStep}
                >
                  Previous
                </button>
              )}
              <button
                type="button"
                className="text-md flex cursor-pointer items-center gap-1 rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-500"
                onClick={() => {
                  if (
                    window.confirm("Are you sure you want to place this order?")
                  ) {
                    handlePlaceOrder();
                  }
                }}
                disabled={
                  loadingOrder || loadingProducts || products.length === 0
                }
              >
                {loadingOrder ? "Placing Order..." : "Place Order"}
                <FiShoppingCart className="inline-block" />
              </button>
            </div>
          </div>
        </>
      )}

      {currentStep === 4 && (
        <>
          <p className="mt-4 text-center font-semibold">
            Page {currentStep} of {totalSteps}
          </p>

          <div className="mx-auto mt-6 max-w-lg rounded-md bg-white p-6 shadow-md">
            <div className="text-center">
              <h2 className="mb-2 text-3xl font-bold text-green-500">
                Order Placed Successfully!
              </h2>
              <p className="text-lg text-gray-700">
                Thank you for shopping with us!
              </p>
            </div>

            {loadingOrder || (orderId && !orderDetails && !error) ? (
              <div className="mt-6 rounded-md border border-gray-300 bg-gray-50 p-4 text-center text-gray-600">
                Loading order details...
              </div>
            ) : orderDetails && !error ? (
              <>
                <div className="mt-6 rounded-md border border-gray-300 bg-gray-50 p-4 text-lg">
                  <p>
                    <span className="font-semibold text-gray-900">Order #</span>
                    {orderId}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-900">
                      Customer Name:{" "}
                    </span>
                    {orderDetails.customerName}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-900">Email: </span>
                    {orderDetails.email}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-900">
                      Order Date:{" "}
                    </span>
                    {formatDate(orderDetails.orderDate.toISOString())}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-900">
                      Warehouse:{" "}
                    </span>
                    {orderDetails.warehouseName}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-900">
                      Total Items:{" "}
                    </span>
                    {orderDetails.totalProducts}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-900">
                      Total Price:{" "}
                    </span>
                    ${orderDetails.totalPrice.toFixed(2)}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2">
                  <Link
                    href={`/orders/${orderId}`}
                    className="text-md cursor-pointer rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
                  >
                    View Order
                  </Link>
                  <button
                    type="button"
                    className="text-md cursor-pointer rounded-md bg-green-500 px-4 py-2 font-medium text-white hover:bg-green-600"
                    onClick={() => {
                      // Reset form and navigate back to step 1 for placing a new order
                      const params = new URLSearchParams(
                        searchParams.toString(),
                      );
                      params.set("step", "1");
                      params.delete("customerName");
                      params.delete("email");
                      params.delete("warehouse");
                      params.delete("orderId");
                      router.push(`?${params.toString()}`);

                      setTimeout(() => {
                        reset({
                          name: "",
                          email: "",
                          orderDate: getCurrentDate(),
                          warehouse: "",
                        });

                        setProducts([]);
                        setSelectedProducts([]);
                        setOrderDetails(null);
                        setOrderId(null);
                        setError(null);

                        // Clear localStorage
                        localStorage.removeItem("products");
                        localStorage.removeItem("selectedProducts");
                      }, 50);
                    }}
                  >
                    Place Another Order
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-6 rounded-md border border-gray-300 bg-red-50 p-4 text-center text-red-600">
                Failed to load order details. Please try refreshing the page.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
