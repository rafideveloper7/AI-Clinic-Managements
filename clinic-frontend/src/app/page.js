import Link from "next/link";

const FEATURES = [
  {
    title: "Patient Management",
    description: "Create, update, and organize patient records with role-based access for doctors and reception staff.",
    gradient: "from-[var(--primary)] to-[var(--secondary)]",
  },
  {
    title: "Appointment Workflow",
    description: "Doctors and receptionists can schedule visits, track status, and keep consultations organized.",
    gradient: "from-[var(--secondary)] to-[var(--primary-light)]",
  },
  {
    title: "Prescription Module",
    description: "Generate medicine plans, store prescription records, and prepare patient-ready clinical output.",
    gradient: "from-[var(--primary-light)] to-[var(--secondary)]",
  },
  {
    title: "AI Suggestion Box",
    description: "Pro doctors can generate symptom-based AI suggestions that also appear in patient-facing history.",
    gradient: "from-[var(--primary-lighter)] to-[var(--primary-light)]",
  },
];

const ROLES = [
  {
    title: "Admin",
    details: "Manages doctors, receptionists, plans, demo accounts, and analytics.",
  },
  {
    title: "Doctor",
    details: "Handles patients, appointments, prescriptions, and AI-assisted care suggestions.",
  },
  {
    title: "Receptionist",
    details: "Registers patients, books appointments, and reviews patient-side AI record visibility.",
  },
  {
    title: "Patient",
    details: "Views prescription history, care timeline, and AI-generated suggestion records.",
  },
];

const DEMO_USERS = [
  "Admin: clinicmanagement@gmail.com",
  "Doctor Pro: doctor.pro@clinic.com",
  "Doctor Free: doctor.free@clinic.com",
  "Receptionist: reception@clinic.com",
  "Patient: patient.demo@clinic.com",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[var(--primary-lighter)]/30 via-white to-[var(--primary-light)]/20 px-6 py-8 lg:px-10">
      <section className="mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-[var(--border)] bg-white shadow-[0_30px_90px_rgba(44,94,173,0.12)]">
        <div className="grid gap-8 px-8 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:px-12 lg:py-14">
          <div className="flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)]/10 px-4 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--primary-light)] opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--primary-light)]"></span>
                </span>
                <p className="text-xs uppercase tracking-[0.45em] text-[var(--primary)] font-semibold">
                  AI Clinic Management System
                </p>
              </div>
              <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-tight text-balance lg:text-7xl text-slate-900">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--primary-light)]">
                  Smart clinic operations
                </span>
                <br />with role-based workflows and AI-assisted care.
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-slate-600">
                A complete healthcare management platform for admins, doctors, receptionists,
                and patients with appointments, prescriptions, analytics, and AI-generated
                medical suggestions.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/login"
                className="rounded-full bg-[var(--primary)] px-8 py-3.5 text-sm font-semibold text-white transition hover:shadow-[0_0_0_4px_var(--primary-lighter)] hover:scale-105"
              >
                Go to Login
              </Link>
              <div className="rounded-full border border-[var(--border)] bg-white/80 px-6 py-3 text-sm text-slate-700 shadow-sm">
                Admin • Doctor • Receptionist • Patient
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[28px] border border-[var(--border)] bg-gradient-to-br from-[var(--primary-lighter)]/20 to-[var(--primary-light)]/30 p-6 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--primary)] font-semibold">System Highlights</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/70 p-4 border border-[var(--border)] shadow-sm">
                  <p className="text-3xl font-bold text-[var(--primary)]">4</p>
                  <p className="mt-2 text-sm text-slate-600">Role-based dashboards</p>
                </div>
                <div className="rounded-2xl bg-white/70 p-4 border border-[var(--border)] shadow-sm">
                  <p className="text-3xl font-bold text-[var(--secondary)]">CRUD</p>
                  <p className="mt-2 text-sm text-slate-600">Doctors, patients, receptionists</p>
                </div>
                <div className="rounded-2xl bg-white/70 p-4 border border-[var(--border)] shadow-sm">
                  <p className="text-3xl font-bold text-[var(--primary-light)]">AI</p>
                  <p className="mt-2 text-sm text-slate-600">Pro doctor symptom suggestions</p>
                </div>
                <div className="rounded-2xl bg-white/70 p-4 border border-[var(--border)] shadow-sm">
                  <p className="text-3xl font-bold text-[var(--primary)]">Live</p>
                  <p className="mt-2 text-sm text-slate-600">Appointments and records flow</p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-[var(--border)] bg-gradient-to-br from-[var(--primary-lighter)]/30 to-white p-6">
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--primary)] font-semibold">Demo Access</p>
              <div className="mt-4 space-y-2 text-sm text-slate-700">
                {DEMO_USERS.map((item) => (
                  <div key={item} className="rounded-2xl bg-white/80 px-4 py-3 border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[32px] border border-[var(--border)] bg-white/80 p-6 shadow-[0_18px_50px_rgba(44,94,173,0.08)] backdrop-blur">
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--primary)] font-semibold">Core Modules</p>
          <div className="mt-6 grid gap-4">
            {FEATURES.map((feature) => (
              <article key={feature.title} className="rounded-2xl border border-[var(--border)] bg-white p-5 hover:shadow-md transition-shadow">
                <h2 className="text-lg font-semibold text-slate-900">{feature.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-[var(--border)] bg-white/80 p-6 shadow-[0_18px_50px_rgba(44,94,173,0.08)] backdrop-blur">
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--primary)] font-semibold">User Roles</p>
          <div className="mt-6 grid gap-4">
            {ROLES.map((role) => (
              <article key={role.title} className="rounded-2xl border border-[var(--border)] bg-white p-5 hover:shadow-md transition-shadow">
                <h2 className="text-lg font-semibold text-slate-900">{role.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{role.details}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-7xl rounded-[32px] border border-[var(--border)] bg-white/80 p-6 shadow-[0_18px_50px_rgba(44,94,173,0.08)] backdrop-blur">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--primary)] font-semibold">Why This System</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Built for a complete clinic workflow, not just isolated pages.
            </h2>
            <p className="mt-3 max-w-3xl text-sm text-slate-600">
              This platform connects operational staff, doctors, and patients in one
              system. Admin controls staffing and plans, reception manages intake and bookings,
              doctors handle appointments and AI-assisted care, and patients can review
              prescriptions and generated history.
            </p>
          </div>

          <Link
            href="/login"
            className="inline-flex rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white transition hover:shadow-[0_0_0_4px_var(--primary-lighter)] hover:scale-105"
          >
            Login to System
          </Link>
        </div>
      </section>
    </main>
  );
}