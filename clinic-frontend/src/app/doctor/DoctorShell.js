"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";

export default function DoctorShell({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <ProtectedRoute role="doctor">
      <div className="flex min-h-screen">
        <div className="hidden lg:block">
          <Sidebar role="doctor" />
        </div>

        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/30" onClick={() => setMobileMenuOpen(false)} />
            <div className="absolute left-0 top-0 h-full w-80">
              <Sidebar role="doctor" />
            </div>
          </div>
        )}

        <main className="flex-1 px-5 py-6 lg:px-8">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="mb-4 flex items-center gap-2 rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm font-medium text-slate-700 lg:hidden"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Menu
          </button>
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}