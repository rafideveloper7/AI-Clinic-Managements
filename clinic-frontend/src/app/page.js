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
    <main className="min-h-screen px-6 py-8 lg:px-10">
      <section className="mx-auto max-w-7xl overflow-hidden rounded-[40px] border border-stone-300/70 bg-[#2f2a25] text-stone-100 shadow-[0_30px_90px_rgba(28,25,23,0.18)]">
        <div className="grid gap-8 px-8 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:px-12 lg:py-14">
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.45em] text-emerald-200">
                AI Clinic Management System
              </p>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-tight text-balance lg:text-7xl">
                Smart clinic operations with role-based workflows and AI-assisted care.
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-stone-300">
                A complete healthcare management platform for admins, doctors, receptionists,
                and patients with appointments, prescriptions, analytics, and AI-generated
                medical suggestions.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/login"
                className="rounded-full bg-[#e6dac5] px-6 py-3 text-sm font-semibold text-stone-900 transition hover:bg-[#dac9ae]"
              >
                Go to Login
              </Link>
              <div className="rounded-full border border-white/10 px-6 py-3 text-sm text-stone-200">
                Admin • Doctor • Receptionist • Patient
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[28px] border border-white/8 bg-white/5 p-6 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.35em] text-emerald-200">System Highlights</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-3xl font-semibold">4</p>
                  <p className="mt-2 text-sm text-stone-300">Role-based dashboards</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-3xl font-semibold">CRUD</p>
                  <p className="mt-2 text-sm text-stone-300">Doctors, patients, receptionists</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-3xl font-semibold">AI</p>
                  <p className="mt-2 text-sm text-stone-300">Pro doctor symptom suggestions</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-3xl font-semibold">Live</p>
                  <p className="mt-2 text-sm text-stone-300">Appointments and records flow</p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-[#d4c3ab]/20 bg-[#d4c3ab]/10 p-6">
              <p className="text-xs uppercase tracking-[0.35em] text-[#f0e6d7]">Demo Access</p>
              <div className="mt-4 space-y-2 text-sm text-stone-100">
                {DEMO_USERS.map((item) => (
                  <div key={item} className="rounded-2xl bg-white/5 px-4 py-3">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[32px] border border-stone-200/80 bg-[rgba(255,252,247,0.92)] p-6 shadow-[0_18px_50px_rgba(41,37,36,0.08)]">
          <p className="text-xs uppercase tracking-[0.35em] text-teal-700">Core Modules</p>
          <div className="mt-6 grid gap-4">
            {FEATURES.map((feature) => (
              <article key={feature.title} className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
                <h2 className="text-lg font-semibold text-stone-900">{feature.title}</h2>
                <p className="mt-2 text-sm text-stone-600">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-stone-200/80 bg-[rgba(255,252,247,0.92)] p-6 shadow-[0_18px_50px_rgba(41,37,36,0.08)]">
          <p className="text-xs uppercase tracking-[0.35em] text-teal-700">User Roles</p>
          <div className="mt-6 grid gap-4">
            {ROLES.map((role) => (
              <article key={role.title} className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
                <h2 className="text-lg font-semibold text-stone-900">{role.title}</h2>
                <p className="mt-2 text-sm text-stone-600">{role.details}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-7xl rounded-[32px] border border-stone-200/80 bg-[rgba(255,252,247,0.92)] p-6 shadow-[0_18px_50px_rgba(41,37,36,0.08)]">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-teal-700">Why This System</p>
            <h2 className="mt-3 text-3xl font-semibold text-stone-900">
              Built for a complete clinic workflow, not just isolated pages.
            </h2>
            <p className="mt-3 max-w-3xl text-sm text-stone-600">
              This platform connects operational staff, doctors, and patients in one
              system. Admin controls staffing and plans, reception manages intake and bookings,
              doctors handle appointments and AI-assisted care, and patients can review
              prescriptions and generated history.
            </p>
          </div>

          <Link
            href="/login"
            className="inline-flex rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-stone-50 transition hover:bg-stone-800"
          >
            Login to System
          </Link>
        </div>
      </section>
    </main>
  );
}
