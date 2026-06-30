export function slugify(text: string) {
  return (
    crypto.randomUUID() +
    "-" +
    text
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
  );
}
