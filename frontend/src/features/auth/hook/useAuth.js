import { useContext } from "react";
import { authContext } from "../auth.context";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { user, setUser, loading, setLoading } = context;

  const handleRegister = async (userData) => {
    setLoading(true);
    try {
      const response = await registerUser(userData);
      setUser(response.user);
      return response;
    } catch (error) {
      return {
        error:
          error.response?.data?.message ||
          "Unable to create your account. Please try again.",
      };
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (userData) => {
    setLoading(true);
    try {
      const response = await loginUser(userData);
      setUser(response.user);
      return response;
    } catch (error) {
      const message = error.response?.data?.message;
      return {
        error:
          message === "Invalid password" || message === "User not found"
            ? "Email or password is incorrect."
            : message || "Unable to sign in. Please try again.",
      };
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutUser();
    } catch (error) {
      console.error(
        "Logout request failed:",
        error.response?.data || error.message,
      );
    } finally {
      setUser(null);
      setLoading(false);
    }
  };

  const handleGetCurrentUser = async () => {
    setLoading(true);
    try {
      const response = await getCurrentUser();
      setUser(response.user);
      return response;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handleLogout,
    handleGetCurrentUser,
  };
};
