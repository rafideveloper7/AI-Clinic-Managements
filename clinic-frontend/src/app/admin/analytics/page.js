"use client";

import { useEffect, useState } from "react";
import { MetricsBarChart, StatusPieChart } from "@/components/Charts";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import api from "@/services/api";

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function loadStats() {
      const { data } = await api.get("/analytics/admin");
      setStats(data);
    }

    loadStats();
  }, []);

  if (!stats) {
    return <Loader label="Loading analytics..." />;
  }

  const chartData = [
    { name: "Patients", value: stats.totalPatients },
    { name: "Doctors", value: stats.totalDoctors },
    { name: "Appointments", value: stats.totalAppointments },
    { name: "AI Usage", value: stats.aiUsageCount },
  ];

  const pieData = [
    { name: "Patients", value: stats.totalPatients },
    { name: "Appointments", value: stats.totalAppointments },
    { name: "AI Requests", value: stats.aiUsageCount },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--primary-lighter)]/30 via-white to-[var(--primary-light)]/20 p-6">
      <Navbar
        title="Analytics"
        subtitle="Visual metrics for your final presentation, investor-style walkthrough, or judge demo."
      />

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <div className="rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[0_20px_60px_rgba(44,94,173,0.03)] transition hover:shadow-[0_20px_60px_rgba(44,94,173,0.06)]">
          <MetricsBarChart data={chartData} title="Operational volume" />
        </div>
        
        <div className="rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[0_20px_60px_rgba(44,94,173,0.03)] transition hover:shadow-[0_20px_60px_rgba(44,94,173,0.06)]">
          <StatusPieChart data={pieData} title="Usage mix" />
        </div>
      </div>
    </div>
  );
}