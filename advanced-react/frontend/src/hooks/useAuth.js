import useAuthStore from "../Zustand/store/authStore";

const useAuth = () => {
  const user = useAuthStore((s) => s.user);
  const login = useAuthStore((s) => s.login);
  const logout = useAuthStore((s) => s.logout);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);
  const error = useAuthStore((s) => s.error);

  return { user, login, logout, isAuthenticated, isLoading, error };
};

export default useAuth;
