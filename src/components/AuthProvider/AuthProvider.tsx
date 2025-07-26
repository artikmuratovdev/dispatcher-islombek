// components/AuthProvider.tsx
import { getTokenFromCache } from "@/app/api/baseApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getTokenFromCache();
    if (!token) {
      navigate("/login");
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Yuklanmoqda...</div>;

  return <>{children}</>;
};
