
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthGuard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const isAuthenticated = () => {
    return !!localStorage.getItem("ACCESS_TOKEN");
  };

  return { isAuthenticated };
};
