"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, registerUser } from "@/services/auth";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const token = window.localStorage.getItem("token");
    const savedUser = window.localStorage.getItem("user");
    Promise.resolve().then(() => {
      if (token && savedUser) {
        setUser(JSON.parse(savedUser));
      }

      setLoading(false);
    });
  }, []);

  const persistSession = (session) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("token", session.token);
      window.localStorage.setItem("user", JSON.stringify(session.user));
    }
    setUser(session.user);
  };

  const login = async (email, password) => {
    try {
      const session = await loginUser({ email, password });
      persistSession(session);
      router.push(`/${session.user.role}`);
    } catch (error) {
      throw error.response?.data?.message || "Login failed";
    }
  };

  const register = async (name, email, password, role) => {
    try {
      const session = await registerUser({ name, email, password, role });
      persistSession(session);
      router.push(`/${session.user.role}`);
    } catch (error) {
      throw error.response?.data?.message || "Registration failed";
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
    }
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
