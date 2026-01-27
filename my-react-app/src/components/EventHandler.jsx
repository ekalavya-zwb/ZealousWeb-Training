import React from "react";

const EventHandler = () => {
  const shoot = (msg) => {
    alert(msg);
  };
  return (
    <>
      <button type="button" onClick={() => shoot("Great Shot!")}>
        Take the shot!
      </button>
    </>
  );
};

export default EventHandler;
