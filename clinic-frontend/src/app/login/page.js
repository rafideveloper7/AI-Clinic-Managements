"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const DEMO_LOGINS = [
  {
    label: "Login as Admin",
    email: "clinicmanagement@gmail.com",
    password: "Clinic1234@",
    role: "Admin",
  },
  {
    label: "Login as Pro Doctor",
    email: "doctor.pro@clinic.com",
    password: "Doctor1234@",
    role: "Doctor Pro",
  },
  {
    label: "Login as Free Doctor",
    email: "doctor.free@clinic.com",
    password: "Doctor1234@",
    role: "Doctor Free",
  },
  {
    label: "Login as Patient",
    email: "patient.demo@clinic.com",
    password: "Patient1234@",
    role: "Patient",
  },
];

export default function LoginPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      await login(form.email, form.password);
    } catch (message) {
      setError(message);
      setBusy(false);
    }
  };

  const handleDemoLogin = async (credentials) => {
    setBusy(true);
    setError("");
    setForm({ email: credentials.email, password: credentials.password });

    try {
      await login(credentials.email, credentials.password);
    } catch (message) {
      setError(message);
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[var(--primary-lighter)]/30 via-white to-[var(--primary-light)]/20 px-6 py-10 lg:px-10 flex items-center justify-center">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[32px] border border-[var(--border)] bg-white shadow-[0_30px_90px_rgba(44,94,173,0.12)] backdrop-blur lg:grid-cols-[1fr_0.95fr]">
        <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] p-8 text-white lg:p-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--primary-light)] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--primary-light)]"></span>
            </span>
            <p className="text-xs uppercase tracking-[0.45em] text-white font-semibold">CareOps</p>
          </div>
          <h1 className="mt-6 text-4xl font-bold leading-tight lg:text-5xl">
            Run your clinic from one intelligent command center.
          </h1>
          <p className="mt-5 max-w-xl text-stone-200">
            Secure access for admin, doctor, receptionist, and patient roles with
            analytics, medical records, prescriptions, and AI-assisted workflows.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              "Real-time clinic dashboards",
              "Patients and appointments CRUD",
              "Prescription generation",
              "AI suggestion box for pro doctors",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white shadow-sm">
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--primary-lighter)]">Demo roles</p>
            {DEMO_LOGINS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleDemoLogin(item)}
                className="flex w-full items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-left text-sm text-white transition hover:bg-white/20"
              >
                <span>{item.label}</span>
                <span className="text-[var(--primary-lighter)]">{item.role}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="p-8 lg:p-12 bg-white">
          <div className="max-w-md">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
              Login
            </p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900">Welcome back</h2>
            <p className="mt-3 text-sm text-slate-600">
              Sign in with your project credentials to open the role-based dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <label className="block space-y-2 text-sm font-medium text-slate-700">
              <span>Email</span>
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--primary)]"
                placeholder="doctor@clinic.com"
                required
              />
            </label>

            <label className="block space-y-2 text-sm font-medium text-slate-700">
              <span>Password</span>
              <input
                type="password"
                value={form.password}
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--primary)]"
                placeholder="password"
                required
              />
            </label>

            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:shadow-[0_0_0_4px_var(--primary-lighter)] disabled:opacity-60"
            >
              {busy ? "Signing in..." : "Login to dashboard"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}