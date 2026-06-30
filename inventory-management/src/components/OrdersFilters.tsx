"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

export default function OrdersFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [customerName, setCustomerName] = useState(
    searchParams.get("customerName") || "",
  );

  const [email, setEmail] = useState(searchParams.get("email") || "");

  const [orderDateFrom, setOrderDateFrom] = useState(
    searchParams.get("orderDateFrom") || "",
  );

  const [orderDateTo, setOrderDateTo] = useState(
    searchParams.get("orderDateTo") || "",
  );

  const [totalAmountMin, setTotalAmountMin] = useState(
    searchParams.get("totalAmountMin") || "",
  );

  const [totalAmountMax, setTotalAmountMax] = useState(
    searchParams.get("totalAmountMax") || "",
  );

  const [status, setStatus] = useState(searchParams.get("status") || "");

  const handleFilterChange = useCallback(
    (filters: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "1"); // Reset to first page on filter change

      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const urlCustomerName = searchParams.get("customerName") || "";
      const urlEmail = searchParams.get("email") || "";
      const urlTotalAmountMin = searchParams.get("totalAmountMin") || "";
      const urlTotalAmountMax = searchParams.get("totalAmountMax") || "";

      // Only update the URL if any current state differs from the URL parameters
      if (
        customerName !== urlCustomerName ||
        email !== urlEmail ||
        totalAmountMin !== urlTotalAmountMin ||
        totalAmountMax !== urlTotalAmountMax
      ) {
        // Merge all filter changes into a single call to avoid race conditions
        handleFilterChange({
          customerName,
          email,
          totalAmountMin,
          totalAmountMax,
        });
      }
    }, 500); // Debounce by 500ms

    return () => clearTimeout(timer);
  }, [
    customerName,
    email,
    totalAmountMin,
    totalAmountMax,
    searchParams,
    handleFilterChange,
  ]);

  const clearFilters = () => {
    setCustomerName("");
    setEmail("");
    setOrderDateFrom("");
    setOrderDateTo("");
    setTotalAmountMin("");
    setTotalAmountMax("");
    setStatus(""); // Fix: reset status state along with the rest
    router.push("/orders");
  };

  return (
    <div className="mb-6 flex w-full flex-wrap items-center gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="customerName" className="font-semibold text-gray-900">
          Customer Name:
        </label>
        <input
          type="text"
          name="customerName"
          id="customerName"
          placeholder="Search customers by name..."
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="text-md w-62.5 rounded-md border border-gray-500 p-2 ring-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="font-semibold text-gray-900">
          Email:
        </label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Search customers by email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-md w-62.5 rounded-md border border-gray-500 p-2 ring-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="orderDateFrom" className="font-semibold text-gray-900">
          From Date:
        </label>
        <input
          type="date"
          name="orderDateFrom"
          id="orderDateFrom"
          value={orderDateFrom}
          onChange={(e) => {
            handleFilterChange({ orderDateFrom: e.target.value });
            setOrderDateFrom(e.target.value);
          }}
          className="text-md rounded-md border border-gray-500 p-2 ring-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="orderDateTo" className="font-semibold text-gray-900">
          To Date:
        </label>
        <input
          type="date"
          name="orderDateTo"
          id="orderDateTo"
          value={orderDateTo}
          onChange={(e) => {
            handleFilterChange({ orderDateTo: e.target.value });
            setOrderDateTo(e.target.value);
          }}
          className="text-md rounded-md border border-gray-500 p-2 ring-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="totalAmountMin" className="font-semibold text-gray-900">
          Min Amount:
        </label>
        <input
          type="number"
          name="totalAmountMin"
          id="totalAmountMin"
          placeholder="Min Amount"
          value={totalAmountMin}
          onChange={(e) => setTotalAmountMin(e.target.value)}
          className="text-md w-40 rounded-md border border-gray-500 p-2 ring-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="totalAmountMax" className="font-semibold text-gray-900">
          Max Amount:
        </label>
        <input
          type="number"
          name="totalAmountMax"
          id="totalAmountMax"
          placeholder="Max Amount"
          value={totalAmountMax}
          onChange={(e) => setTotalAmountMax(e.target.value)}
          className="text-md w-40 rounded-md border border-gray-500 p-2 ring-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="status" className="font-semibold text-gray-900">
          Order Status:
        </label>
        <select
          name="status"
          id="status"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            handleFilterChange({ status: e.target.value });
          }}
          className="text-md w-35 rounded-md border border-gray-500 p-2 ring-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">All Status</option>
          <option value="PLACED">Placed</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>
      <button
        type="button"
        onClick={clearFilters}
        className="text-md mt-7 cursor-pointer rounded-md border border-gray-500 p-2 font-medium text-gray-500 transition-colors hover:bg-gray-200"
      >
        Clear Filters
      </button>
    </div>
  );
}
