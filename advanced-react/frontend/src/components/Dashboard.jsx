import React from "react";
import withAuth from "../utils/withAuth";
import withDarkMode from "../utils/withDarkMode";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { logout } = useAuth();
  return (
    <div className="dashboard">
      <h2>Welcome to the Employee Dashboard</h2>
      <button type="button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

// const AuthDashboard = withDarkMode(withAuth(Dashboard));
// export default AuthDashboard;

export default Dashboard;
