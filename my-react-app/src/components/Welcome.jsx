import React from "react";

const Welcome = ({ name = "Company Name", tagline = "Tagline" }) => {
  const year = new Date().getFullYear();
  return (
    <>
      <h1>{name}</h1>
      <h2>{tagline}</h2>
      <h3>{year}</h3>
    </>
  );
};

export default Welcome;
