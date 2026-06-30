import PostCardContext from "../context/PostCardContext";

export default function PostCardProvider({ children }) {
  return <PostCardContext.Provider>{children}</PostCardContext.Provider>;
}
