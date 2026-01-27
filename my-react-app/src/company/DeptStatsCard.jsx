import React from "react";
import PropTypes from "prop-types";

const DeptStatsCard = ({ totalDepartments = 0, activeDepartments = 0 }) => {
  return (
    <div className="StatsCard">
      <h2>Department Stats</h2>
      <p>Total: {totalDepartments}</p>
      <p>Active: {activeDepartments}</p>
    </div>
  );
};

DeptStatsCard.propTypes = {
  totalDepartments: PropTypes.number,
  activeDepartments: PropTypes.number,
};

export default DeptStatsCard;
