import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const user = {
    isAuthenticated: true,
    role: "admin",
    name: "John",
  };

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
