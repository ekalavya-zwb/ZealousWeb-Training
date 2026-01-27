import React from "react";
import "./styles/Cards.css";
import PropTypes from "prop-types";

const DepartmentCard = ({
  dept_id = 100,
  dept_name = "Engineering",
  location = "New York",
  isActive = true,
}) => {
  return (
    <div className="DepartmentCard">
      {isActive ? (
        <small
          style={{
            backgroundColor: "lightgreen",
            padding: "3px",
            borderRadius: "3px",
            fontWeight: "bold",
          }}
        >
          ACTIVE
        </small>
      ) : (
        <small
          style={{
            backgroundColor: "tomato",
            padding: "3px",
            borderRadius: "3px",
            fontWeight: "bold",
          }}
        >
          INACTIVE
        </small>
      )}

      <h2>Department details</h2>
      <p>Department Id: {dept_id}</p>
      <p>Department Name: {dept_name}</p>
      <p>Location: {location}</p>
    </div>
  );
};

DepartmentCard.propTypes = {
  dept_id: PropTypes.number,
  dept_name: PropTypes.string,
  location: PropTypes.string,
  isActive: PropTypes.bool,
};

export default DepartmentCard;
