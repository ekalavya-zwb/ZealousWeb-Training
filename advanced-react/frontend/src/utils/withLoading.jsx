import React from "react";
import Skeleton from "../components/Skeleton";

const withLoading = (Component) => {
  return function WrappedComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <Skeleton />;
    }

    return <Component {...props} />;
  };
};

export default withLoading;
