import Link from "next/link";

const FEATURES = [
  {
    title: "Patient Management",
    description: "Create, update, and organize patient records with role-based access for doctors and reception staff.",
  },
  {
    title: "Appointment Workflow",
    description: "Doctors and receptionists can schedule visits, track status, and keep consultations organized.",
  },
  {
    title: "Prescription Module",
    description: "Generate medicine plans, store prescription records, and prepare patient-ready clinical output.",
  },
  {
    title: "AI Suggestion Box",
    description: "Pro doctors can generate symptom-based AI suggestions that also appear in patient-facing history.",
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
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[var(--primary-lighter)]/40 via-white to-[var(--primary-light)]/30">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-[var(--primary)]/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-[var(--secondary)]/10 blur-3xl animation-delay-2000" />
      </div>

      <section className="relative mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)]/10 px-4 py-1.5 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--primary-light)] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--primary-light)]"></span>
            </span>
            <p className="text-xs uppercase tracking-[0.45em] text-[var(--primary)] font-semibold">
              AI Clinic Management System
            </p>
          </div>

          <h1 className="mt-8 text-5xl font-bold leading-tight text-balance lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--primary-light)] animate-slide-up">
            Smart clinic operations
            <br />with AI-assisted care
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 animate-fade-in animation-delay-500">
            A complete healthcare management platform connecting admins, doctors, receptionists,
            and patients with appointments, prescriptions, analytics, and AI-generated medical suggestions.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in animation-delay-700">
            <Link
              href="/login"
              className="group relative overflow-hidden rounded-full bg-[var(--primary)] px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_0_8px_var(--primary-lighter)] hover:scale-105"
            >
              <span className="relative z-10">Go to Login</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700" />
            </Link>
            <div className="rounded-full border border-[var(--border)] bg-white/80 px-6 py-4 text-sm text-slate-700 shadow-sm backdrop-blur">
              Admin • Doctor • Receptionist • Patient
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-[32px] border border-[var(--border)] bg-white/70 p-8 shadow-[0_30px_90px_rgba(44,94,173,0.1)] backdrop-blur animate-fade-in animation-delay-1000">
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--primary)] font-semibold">Core Modules</p>
              <div className="mt-6 grid gap-4">
                {FEATURES.map((feature, index) => (
                  <article 
                    key={feature.title} 
                    className="group rounded-2xl border border-[var(--border)] bg-white/80 p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    style={{ animationDelay: `${1100 + index * 100}ms` }}
                  >
                    <h2 className="text-lg font-semibold text-slate-900">{feature.title}</h2>
                    <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[32px] border border-[var(--border)] bg-white/70 p-8 shadow-[0_30px_90px_rgba(44,94,173,0.1)] backdrop-blur animate-fade-in animation-delay-1400">
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--primary)] font-semibold">User Roles</p>
              <div className="mt-6 grid gap-4">
                {ROLES.map((role, index) => (
                  <article 
                    key={role.title} 
                    className="group rounded-2xl border border-[var(--border)] bg-white/80 p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    style={{ animationDelay: `${1500 + index * 100}ms` }}
                  >
                    <h2 className="text-lg font-semibold text-slate-900">{role.title}</h2>
                    <p className="mt-2 text-sm text-slate-600">{role.details}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section className="mx-auto mt-16 max-w-3xl rounded-[32px] border border-[var(--border)] bg-white/70 p-8 shadow-[0_30px_90px_rgba(44,94,173,0.1)] backdrop-blur animate-fade-in animation-delay-1800">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--primary)] font-semibold">Why This System</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">
                Built for a complete clinic workflow, not just isolated pages.
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-slate-600">
                This platform connects operational staff, doctors, and patients in one
                system. Admin controls staffing and plans, reception manages intake and bookings,
                doctors handle appointments and AI-assisted care, and patients can review
                prescriptions and generated history.
              </p>
            </div>

            <Link
              href="/login"
              className="inline-flex rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_0_8px_var(--primary-lighter)] hover:scale-105"
            >
              Login to System
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}