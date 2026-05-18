"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";

export default function PatientShell({ children }) {
  return (
    <ProtectedRoute role="patient">
      <div className="flex min-h-screen">
        <Sidebar role="patient" />
        <main className="flex-1 px-5 py-6 lg:px-8">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
