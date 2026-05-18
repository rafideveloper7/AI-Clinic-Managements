"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/Loader";

export default function ProtectedRoute({ role, children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || (role && user.role !== role))) {
      router.replace("/login");
    }
  }, [loading, role, router, user]);

  if (loading) {
    return <Loader label="Checking secure access..." />;
  }

  if (!user || (role && user.role !== role)) {
    return null;
  }

  return children;
}
