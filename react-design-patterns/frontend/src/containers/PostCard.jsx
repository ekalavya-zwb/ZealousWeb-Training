export default function PostCard({ children }) {
  return (
    <>
      <h2 className="text-center text-xl">Compound Component Pattern</h2>
      <div className="m-6 flex w-xs flex-col gap-2 rounded-md bg-neutral-800 p-4 text-white shadow-lg">
        {children}
      </div>
    </>
  );
}

PostCard.Title = function PostCardTitle({ title }) {
  return <h2 className="text-xl font-bold">{title}</h2>;
};

PostCard.Content = function PostCardContent({ content }) {
  return <p className="text-gray-300">{content}</p>;
};

PostCard.User = function PostCardUser({ author }) {
  return <span className="text-sm text-gray-400">By {author}</span>;
};

PostCard.Buttons = function PostCardButtons() {
  return (
    <div className="mt-2 flex gap-4">
      <button
        type="button"
        className="cursor-pointer rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Read More
      </button>
      <button
        type="button"
        className="cursor-pointer rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
      >
        Comments
      </button>
    </div>
  );
};
