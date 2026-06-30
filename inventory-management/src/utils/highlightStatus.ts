const highlightStatus = (status: string) => {
  switch (status) {
    case "PLACED":
      return "font-semibold text-yellow-600";
    case "COMPLETED":
      return "font-semibold text-green-600";
    case "CANCELLED":
      return "font-semibold text-red-600";
    default:
      return "";
  }
};

export default highlightStatus;
