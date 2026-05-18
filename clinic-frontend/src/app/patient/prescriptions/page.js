"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import { getPrescriptions } from "@/services/prescription";

export default function PatientPrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPrescriptions() {
      try {
        const data = await getPrescriptions();
        setPrescriptions(data);
      } finally {
        setLoading(false);
      }
    }

    loadPrescriptions();
  }, []);

  if (loading) {
    return <Loader label="Loading prescriptions..." />;
  }

  return (
    <div>
      <Navbar
        title="My Prescriptions"
        subtitle="Review medicines and download PDFs when the backend has generated them."
      />

      <section className="space-y-4">
        {prescriptions.map((prescription) => (
          <article key={prescription._id} className="rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-950">{prescription.doctor?.name || "Doctor unavailable"}</h2>
                <p className="mt-2 text-sm text-slate-500">
                  {prescription.createdAt
                    ? new Date(prescription.createdAt).toLocaleString()
                    : "Recent prescription"}
                </p>
              </div>
              {prescription.pdfUrl ? (
                <a
                  href={prescription.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
                >
                  Download PDF
                </a>
              ) : null}
            </div>

            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {(prescription.medicines || []).map((medicine, index) => (
                <li key={`${medicine.name}-${index}`} className="rounded-2xl bg-slate-50 px-4 py-3">
                  {medicine.name} • {medicine.dosage} • {medicine.duration || "As advised"}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </div>
  );
}
