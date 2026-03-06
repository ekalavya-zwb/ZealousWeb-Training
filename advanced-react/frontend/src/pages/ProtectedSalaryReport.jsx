import withAuth from "../utils/withAuth";
import withLoading from "../utils/withLoading";
import SalaryReport from "../components/SalaryReport";

const ProtectedSalaryReport = withAuth(withLoading(SalaryReport), "admin");

export default ProtectedSalaryReport;
