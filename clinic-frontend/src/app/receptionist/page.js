"use client";

import { useEffect, useState } from "react";
import DashboardCard from "@/components/DashboardCard";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import { getPatients } from "@/services/patient";
import api from "@/services/api";

export default function ReceptionistDashboard() {
  const [patientCount, setPatientCount] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [patients, doctorsResponse] = await Promise.all([
          getPatients(),
          api.get("/users/doctors"),
        ]);
        setPatientCount(patients.length);
        setDoctorCount(doctorsResponse.data.length);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return <Loader label="Loading receptionist dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--primary-lighter)]/30 via-white to-[var(--primary-light)]/20 p-6">
      <Navbar
        title="Receptionist Dashboard"
        subtitle="Keep front-desk operations moving with patient intake and booking support."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <DashboardCard title="Patient Records" value={patientCount} hint="Patients visible to this receptionist." accent="primary" />
        <DashboardCard title="Doctors Available" value={doctorCount} hint="Doctors available for bookings." accent="light" />
        <DashboardCard title="Workflow" value="Ready" hint="Patients and booking pages are live." accent="blue" />
      </div>

      <section className="mt-8 rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[0_20px_60px_rgba(44,94,173,0.05)]">
        <h2 className="text-xl font-semibold text-slate-950">Front desk priorities</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            "Register or update patient details",
            "Book appointments for incoming patients",
            "Keep scheduling polished for the live demo",
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-[var(--border)] bg-[var(--primary-lighter)]/20 p-4 text-sm text-slate-700 hover:shadow-md transition-shadow">
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}