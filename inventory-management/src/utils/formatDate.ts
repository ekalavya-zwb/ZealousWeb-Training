const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const formatDate = (isoStr: string) => {
  const date = new Date(isoStr);
  return date.toLocaleString("en-US", options);
};

export default formatDate;
