"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const MENUS = {
  admin: [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/doctors", label: "Doctors" },
    { href: "/admin/receptionists", label: "Receptionists" },
    { href: "/admin/analytics", label: "Analytics" },
  ],
  doctor: [
    { href: "/doctor", label: "Dashboard" },
    { href: "/doctor/patients", label: "Patients" },
    { href: "/doctor/appointments", label: "Appointments" },
    { href: "/doctor/prescriptions", label: "Prescriptions" },
  ],
  receptionist: [
    { href: "/receptionist", label: "Dashboard" },
    { href: "/receptionist/patients", label: "Patients" },
    { href: "/receptionist/book", label: "Book Appointment" },
  ],
  patient: [
    { href: "/patient", label: "Dashboard" },
    { href: "/patient/history", label: "History" },
    { href: "/patient/prescriptions", label: "Prescriptions" },
  ],
};

export default function Sidebar({ role }) {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  return (
    <aside className="flex min-h-screen w-full max-w-[300px] flex-col justify-between border-r border-[var(--border)] bg-gradient-to-b from-[var(--primary)] to-[var(--secondary)] px-5 py-6 text-white shadow-[20px_0_60px_rgba(44,94,173,0.14)]">
      <div>
        <div className="rounded-[28px] border border-white/10 bg-white/8 p-5">
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--primary-light)]">AI Clinic</p>
          <h2 className="mt-3 text-2xl font-semibold">CareOps Console</h2>
          <p className="mt-2 text-sm text-blue-100">
            Premium medical workflows for your clinic.
          </p>
        </div>

        <nav className="mt-8 space-y-2">
          {MENUS[role]?.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-white text-[var(--primary)] shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
                    : "text-blue-100 hover:bg-white/12 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-4">
        <div className="rounded-[24px] border border-white/10 bg-white/8 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--primary-light)]">Current user</p>
          <p className="mt-2 font-semibold">{user?.name || "Clinic member"}</p>
          <p className="text-sm text-blue-100">{user?.email || "No email loaded"}</p>
        </div>

        <button
          onClick={logout}
          className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[var(--primary)] transition hover:bg-[var(--primary-lighter)]"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}