import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function WithAuth(Component) {
  const navigate = useNavigate();

  return function AuthenticatedComponent(props) {
    const isAuthenticated = false; // Simulate authentication status (replace with real logic)

    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/");
      }
    }, [isAuthenticated]);

    return <Component {...props} />;
  };
}
