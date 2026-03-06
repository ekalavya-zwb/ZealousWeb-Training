import withAuth from "../utils/withAuth";
import withLoading from "../utils/withLoading";
import Dashboard from "../components/Dashboard";

const ProtectedDashboard = withAuth(withLoading(Dashboard), "employee");

export default ProtectedDashboard;
