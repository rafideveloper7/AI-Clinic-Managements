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
    <aside className="flex min-h-screen w-full max-w-[300px] flex-col justify-between border-r border-[rgba(179,136,235,0.16)] bg-[linear-gradient(180deg,#4a2875_0%,#6d39b8_42%,#8447ff_100%)] px-5 py-6 text-white shadow-[20px_0_60px_rgba(132,71,255,0.14)]">
      <div>
        <div className="rounded-[28px] border border-white/10 bg-white/8 p-5">
          <p className="text-xs uppercase tracking-[0.4em] text-[#72ddf7]">AI Clinic</p>
          <h2 className="mt-3 text-2xl font-semibold">CareOps Console</h2>
          <p className="mt-2 text-sm text-[#f7eaff]">
            Premium medical workflows for your final submission.
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
                    ? "bg-white text-[#5d2ea8] shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
                    : "text-[#f4e8ff] hover:bg-white/12 hover:text-white"
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
          <p className="text-xs uppercase tracking-[0.25em] text-[#72ddf7]">Current user</p>
          <p className="mt-2 font-semibold">{user?.name || "Clinic member"}</p>
          <p className="text-sm text-[#f0ddff]">{user?.email || "No email loaded"}</p>
        </div>

        <button
          onClick={logout}
          className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#5f2fac] transition hover:bg-[#f8efff]"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
