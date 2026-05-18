"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import { getAiHistory, getPrescriptions } from "@/services/prescription";

export default function PatientHistoryPage() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [aiHistory, setAiHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      try {
        const [prescriptionData, aiHistoryData] = await Promise.all([
          getPrescriptions(),
          getAiHistory().catch(() => []),
        ]);
        setPrescriptions(prescriptionData);
        setAiHistory(aiHistoryData);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, []);

  if (loading) {
    return <Loader label="Loading history..." />;
  }

  return (
    <div>
      <Navbar
        title="History"
        subtitle="Clinical history view for prescriptions and AI-generated suggestions tied to this patient account."
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-950">Prescription History</h2>
          {prescriptions.map((prescription) => (
            <article key={prescription._id} className="rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-950">{prescription.doctor?.name || "Doctor record unavailable"}</h2>
                  <p className="mt-2 text-sm text-slate-500">
                    {prescription.createdAt
                      ? new Date(prescription.createdAt).toLocaleString()
                      : "Recent record"}
                  </p>
                </div>
                {prescription.pdfUrl ? (
                  <a
                    href={prescription.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
                  >
                    Open PDF
                  </a>
                ) : null}
              </div>

              <p className="mt-4 text-sm text-slate-600">
                {prescription.instructions || "No extra instructions added to this record."}
              </p>
            </article>
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-950">AI Generated Suggestions</h2>
          {aiHistory.length ? aiHistory.map((entry) => (
            <article key={entry._id} className="rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-950">{entry.doctor?.name || "Doctor unavailable"}</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    {entry.createdAt ? new Date(entry.createdAt).toLocaleString() : "Recent AI record"}
                  </p>
                </div>
                <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
                  {entry.riskLevel || "low"} risk
                </span>
              </div>
              <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">Symptoms</p>
                <p className="mt-2 whitespace-pre-wrap">{entry.symptoms}</p>
              </div>
              <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">AI suggestion</p>
                <p className="mt-2 whitespace-pre-wrap">{entry.aiResponse || "No AI suggestion saved."}</p>
              </div>
            </article>
          )) : (
            <div className="rounded-[28px] border border-dashed border-slate-300 bg-white/70 p-10 text-center text-sm text-slate-500">
              No AI-generated records found for this patient yet.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
