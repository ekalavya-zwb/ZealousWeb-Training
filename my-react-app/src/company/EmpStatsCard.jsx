import React from "react";
import PropTypes from "prop-types";

const EmpStatsCard = ({
  totalEmployees = 0,
  activeEmployees = 0,
  avgSalary = 0,
}) => {
  return (
    <div className="StatsCard">
      <h2>Employee Stats</h2>
      <p>Total: {totalEmployees}</p>
      <p>Active: {activeEmployees}</p>
      <p>Avg Sal: ${avgSalary.toLocaleString()}</p>
    </div>
  );
};

EmpStatsCard.propTypes = {
  totalEmployees: PropTypes.number,
  activeEmployees: PropTypes.number,
  avgSalary: PropTypes.number,
};

export default EmpStatsCard;
