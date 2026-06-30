"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  // If there are no pages or only one page, don't show pagination
  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = (page: number) => {
    // Validate page bounds
    if (page < 1 || page > totalPages) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    if (page > 1) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }
    router.push(`?${params.toString()}`);
  };

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <div className="mt-6 flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={isFirstPage}
        className="text-md cursor-pointer rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-700"
      >
        Previous
      </button>
      <span className="font-medium">
        Page {currentPage} of {totalPages}
      </span>
      <button
        type="button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={isLastPage}
        className="text-md cursor-pointer rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-700"
      >
        Next
      </button>
    </div>
  );
}
