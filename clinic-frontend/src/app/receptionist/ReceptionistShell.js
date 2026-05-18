"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";

export default function ReceptionistShell({ children }) {
  return (
    <ProtectedRoute role="receptionist">
      <div className="flex min-h-screen">
        <Sidebar role="receptionist" />
        <main className="flex-1 px-5 py-6 lg:px-8">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
