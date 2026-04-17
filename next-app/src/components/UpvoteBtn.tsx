"use client";

export default function UpvoteBtn() {
  return (
    <button
      onClick={() => alert("Post Upvoted! 👍")}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
    >
      Upvote
    </button>
  );
}
