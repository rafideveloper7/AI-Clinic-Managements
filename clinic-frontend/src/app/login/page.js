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
  const [showPassword, setShowPassword] = useState(false);

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
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[var(--primary-lighter)]/40 via-white to-[var(--primary-light)]/30">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 animate-pulse rounded-full bg-[var(--primary)]/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 animate-pulse rounded-full bg-[var(--secondary)]/10 blur-3xl animation-delay-2000" />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-6xl items-center overflow-hidden rounded-[40px] border border-[var(--border)] bg-white/70 shadow-[0_30px_90px_rgba(44,94,173,0.15)] backdrop-blur lg:grid-cols-[1fr_0.95fr]">
        <section className="hidden bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] p-8 text-white lg:block lg:p-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--primary-light)] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--primary-light)]"></span>
            </span>
            <p className="text-xs uppercase tracking-[0.45em] text-white font-semibold">CareOps</p>
          </div>
          <h1 className="text-4xl font-bold leading-tight lg:text-5xl">
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
              <div key={item} className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white shadow-sm transition-all duration-300 hover:bg-white/20">
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
                className="flex w-full items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-left text-sm text-white transition-all duration-300 hover:bg-white/20 hover:scale-[1.02]"
              >
                <span>{item.label}</span>
                <span className="text-[var(--primary-lighter)]">{item.role}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="flex flex-col justify-center p-8 lg:p-12">
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
              <div className="relative">
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 pl-11 outline-none transition-all duration-300 focus:border-[var(--primary)] focus:shadow-[0_0_0_4px_var(--primary-lighter)]"
                  placeholder="doctor@clinic.com"
                  required
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </label>

            <label className="block space-y-2 text-sm font-medium text-slate-700">
              <span>Password</span>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                  className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 pl-11 pr-11 outline-none transition-all duration-300 focus:border-[var(--primary)] focus:shadow-[0_0_0_4px_var(--primary-lighter)]"
                  placeholder="password"
                  required
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.158-7a9.97 9.97 0 012.188-3.39M6.75 6.75L17.25 17.25M17.25 6.75L6.75 17.25" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.158 7-1.274 4.057-5.064 7-9.158 7-4.477 0-8.268-2.943-9.158-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </label>

            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 animate-shake">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={busy}
              className="relative w-full overflow-hidden rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_0_8px_var(--primary-lighter)] disabled:opacity-60 group"
            >
              <span className="relative z-10">{busy ? "Signing in..." : "Login to dashboard"}</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700" />
            </button>
          </form>

          <div className="mt-8 lg:hidden">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-3">Demo roles</p>
            <div className="grid gap-2">
              {DEMO_LOGINS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleDemoLogin(item)}
                  className="flex w-full items-center justify-between rounded-xl border border-[var(--border)] bg-white px-3 py-2.5 text-left text-sm text-slate-700 transition-all duration-300 hover:bg-[var(--primary-lighter)]/20"
                >
                  <span>{item.label}</span>
                  <span className="text-[var(--primary)] font-medium">{item.role}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

<style jsx>{`
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-4px); }
    75% { transform: translateX(4px); }
  }
  .animate-shake {
    animation: shake 0.3s ease-in-out;
  }
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.6s ease-out forwards;
  }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-slide-up {
    animation: slide-up 0.8s ease-out forwards;
  }
  .animation-delay-500 { animation-delay: 500ms; }
  .animation-delay-700 { animation-delay: 700ms; }
  .animation-delay-1000 { animation-delay: 1000ms; }
  .animation-delay-1400 { animation-delay: 1400ms; }
  .animation-delay-1800 { animation-delay: 1800ms; }
`}</style>