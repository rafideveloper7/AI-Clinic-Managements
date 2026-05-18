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
    <main className="min-h-screen px-6 py-10 lg:px-10">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[40px] border border-stone-300/70 bg-[rgba(255,252,247,0.92)] shadow-[0_30px_90px_rgba(28,25,23,0.12)] backdrop-blur lg:grid-cols-[1fr_0.95fr]">
        <section className="bg-[#2f2a25] p-8 text-stone-100 lg:p-12">
          <p className="text-sm uppercase tracking-[0.45em] text-emerald-200">CareOps</p>
          <h1 className="mt-6 text-4xl font-semibold leading-tight lg:text-5xl">
            Run your clinic from one intelligent command center.
          </h1>
          <p className="mt-5 max-w-xl text-stone-300">
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
              <div key={item} className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-stone-200">
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-stone-400">Demo roles</p>
            {DEMO_LOGINS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleDemoLogin(item)}
                className="flex w-full items-center justify-between rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-left text-sm text-stone-200 transition hover:bg-white/10"
              >
                <span>{item.label}</span>
                <span className="text-[#d9c8af]">{item.role}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="p-8 lg:p-12">
          <div className="max-w-md">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-700">
              Login
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-stone-900">Welcome back</h2>
            <p className="mt-3 text-sm text-stone-600">
              Sign in with your project credentials to open the role-based dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <label className="block space-y-2 text-sm font-medium text-stone-700">
              <span>Email</span>
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none transition focus:border-[#8aa59c]"
                placeholder="doctor@clinic.com"
                required
              />
            </label>

            <label className="block space-y-2 text-sm font-medium text-stone-700">
              <span>Password</span>
              <input
                type="password"
                value={form.password}
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none transition focus:border-[#8aa59c]"
                placeholder="password"
                required
              />
            </label>

            {error ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-stone-50 transition hover:bg-stone-800 disabled:opacity-60"
            >
              {busy ? "Signing in..." : "Login to dashboard"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
