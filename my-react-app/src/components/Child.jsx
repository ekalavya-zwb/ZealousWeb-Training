import React from "react";

const Child = ({ onIncrement }) => {
  console.log("Child rendered!");

  return (
    <>
      <button type="button" onClick={onIncrement}>
        Increment from child
      </button>
    </>
  );
};

export default React.memo(Child);
