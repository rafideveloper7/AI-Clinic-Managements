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
    <div>
      <Navbar
        title="Receptionist Dashboard"
        subtitle="Keep front-desk operations moving with patient intake and booking support."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <DashboardCard title="Patient Records" value={patientCount} hint="Patients visible to this receptionist." accent="sky" />
        <DashboardCard title="Doctors Available" value={doctorCount} hint="Doctors available for bookings." accent="emerald" />
        <DashboardCard title="Workflow" value="Ready" hint="Patients and booking pages are live." accent="amber" />
      </div>

      <section className="mt-8 rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <h2 className="text-xl font-semibold text-slate-950">Front desk priorities</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            "Register or update patient details",
            "Book appointments for incoming patients",
            "Keep scheduling polished for the live demo",
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
