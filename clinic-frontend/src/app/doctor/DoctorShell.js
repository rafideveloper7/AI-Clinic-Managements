"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";

export default function DoctorShell({ children }) {
  return (
    <ProtectedRoute role="doctor">
      <div className="flex min-h-screen">
        <Sidebar role="doctor" />
        <main className="flex-1 px-5 py-6 lg:px-8">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
