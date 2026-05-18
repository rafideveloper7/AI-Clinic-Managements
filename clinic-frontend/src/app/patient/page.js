"use client";

import { useEffect, useState } from "react";
import DashboardCard from "@/components/DashboardCard";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import { getPatients } from "@/services/patient";
import { getPrescriptions } from "@/services/prescription";

export default function PatientDashboard() {
  const [patients, setPatients] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [prescriptionData, patientData] = await Promise.all([
          getPrescriptions(),
          getPatients(),
        ]);
        setPrescriptions(prescriptionData);
        setPatients(patientData);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return <Loader label="Loading patient dashboard..." />;
  }

  const latestPrescription = prescriptions[0];
  const patientProfile = patients[0];

  return (
    <div>
      <Navbar
        title="Patient Dashboard"
        subtitle="A clean view of available prescription history and care records from the patient side."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <DashboardCard title="Prescriptions" value={prescriptions.length} hint="Available records tied to this patient account." accent="sky" />
        <DashboardCard title="Latest Doctor" value={latestPrescription?.doctor?.name || "--"} hint="Most recent prescribing doctor." accent="emerald" />
        <DashboardCard title="Patient Profile" value={patientProfile?.name || "Ready"} hint={patientProfile?.phone || "Linked patient account is active."} accent="violet" />
      </div>

      <section className="mt-8 rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <h2 className="text-xl font-semibold text-slate-950">Care overview</h2>
        <p className="mt-3 text-sm text-slate-600">
          This patient-facing experience surfaces current prescription records and historical clinical notes available from the backend.
        </p>
      </section>
    </div>
  );
}
