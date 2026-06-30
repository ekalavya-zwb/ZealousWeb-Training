function highlightStockStatus({ stock }: { stock: number }) {
  switch (stock > 10 ? "inStock" : stock > 0 ? "lowStock" : "outOfStock") {
    case "inStock":
      return "font-semibold text-green-600";
    case "lowStock":
      return "font-semibold text-yellow-600";
    case "outOfStock":
      return "font-semibold text-red-600";
    default:
      return "font-semibold text-gray-600";
  }
}

export default highlightStockStatus;
