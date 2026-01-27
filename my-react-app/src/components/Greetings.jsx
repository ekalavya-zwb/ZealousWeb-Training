import React from "react";
import PropTypes from "prop-types";

const Greetings = ({ name, age }) => {
  return (
    <>
      <h1>
        Hello {name}, You are {age} years old!
      </h1>
    </>
  );
};

Greetings.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
};

export default Greetings;
