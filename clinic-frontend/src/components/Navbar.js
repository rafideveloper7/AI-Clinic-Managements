"use client";

import { useAuth } from "@/context/AuthContext";

export default function Navbar({ title, subtitle, actions }) {
  const { user } = useAuth();

  return (
    <header className="medical-surface mb-8 flex flex-col gap-5 rounded-[28px] px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--primary)]">
          Smart Clinic Suite
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          {subtitle || "Manage your clinic operations from one live workspace."}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {actions}
        <div className="min-w-[220px] rounded-2xl border border-[var(--border)] bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] px-4 py-3 text-white shadow-[0_18px_34px_rgba(44,94,173,0.2)]">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--primary-lighter)]">
            Signed in
          </p>
          <p className="mt-1 font-semibold">{user?.name || "Clinic user"}</p>
          <p className="text-sm text-blue-100">
            {user?.role || "guest"}{user?.plan ? ` • ${user.plan}` : ""}
          </p>
        </div>
      </div>
    </header>
  );
}