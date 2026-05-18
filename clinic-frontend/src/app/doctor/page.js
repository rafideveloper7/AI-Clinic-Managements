"use client";

import { useEffect, useState } from "react";
import DashboardCard from "@/components/DashboardCard";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import api from "@/services/api";

const EMPTY_STATS = {
  plan: "free",
  patientLimit: null,
  aiEnabled: false,
  advancedAnalyticsEnabled: false,
  todayAppointments: 0,
  prescriptionCount: 0,
  patientCount: 0,
};

export default function DoctorDashboard() {
  const [stats, setStats] = useState(EMPTY_STATS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const { data } = await api.get("/analytics/doctor");
        setStats(data);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  if (loading) {
    return <Loader label="Loading doctor dashboard..." />;
  }

  return (
    <div>
      <Navbar
        title="Doctor Dashboard"
        subtitle="See today’s patient load, prescription count, and your care pipeline at a glance."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <DashboardCard title="Today's Appointments" value={stats.todayAppointments} hint="Scheduled for the current day." accent="sky" />
        <DashboardCard title="Prescriptions" value={stats.prescriptionCount} hint="Issued under your account." accent="emerald" />
        <DashboardCard
          title="Patients"
          value={stats.patientCount}
          hint={stats.patientLimit ? `Free plan limit: ${stats.patientLimit}` : "Unlimited patients on Pro."}
          accent="violet"
        />
      </div>

      <section className="mt-8 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <h2 className="text-xl font-semibold text-slate-950">Clinical workflow</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["Patients", "Maintain patient records and details."],
              ["Appointments", "Review and update consultation status."],
              ["AI Suggestions", "Generate symptom guidance for pro doctors."],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">{title}</p>
                <p className="mt-2 text-sm text-slate-600">{copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/70 bg-slate-950 p-6 text-white shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">Plan features</p>
          <h2 className="mt-4 text-2xl font-semibold capitalize">{stats.plan} doctor access</h2>
          <p className="mt-3 text-sm text-slate-300">
            {stats.plan === "pro"
              ? "Pro doctors get unlimited patients, AI suggestions, and advanced analytics."
              : "Free doctors can manage a limited patient count and do not get AI features."}
          </p>
          <div className="mt-6 space-y-3 text-sm text-slate-200">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              AI suggestions: {stats.aiEnabled ? "Enabled" : "Locked"}
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              Advanced analytics: {stats.advancedAnalyticsEnabled ? "Enabled" : "Locked"}
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              Patient limit: {stats.patientLimit || "Unlimited"}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
