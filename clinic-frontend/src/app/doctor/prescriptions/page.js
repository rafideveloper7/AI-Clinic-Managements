"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import PrescriptionForm from "@/components/PrescriptionForm";
import { getPatients } from "@/services/patient";
import {
  createPrescription,
  getAiHistory,
  getAiSuggestion,
  getPrescriptions,
} from "@/services/prescription";

const createMedicineRow = () => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  name: "",
  dosage: "",
  duration: "",
  instructions: "",
});

const EMPTY_PRESCRIPTION = {
  patient: "",
  instructions: "",
  medicines: [createMedicineRow()],
};

const EMPTY_AI = {
  patientId: "",
  symptoms: "",
  age: "",
  gender: "male",
};

export default function DoctorPrescriptionsPage() {
  const [patients, setPatients] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [aiHistory, setAiHistory] = useState([]);
  const [form, setForm] = useState(EMPTY_PRESCRIPTION);
  const [aiForm, setAiForm] = useState(EMPTY_AI);
  const [aiResult, setAiResult] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [checkingAi, setCheckingAi] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [patientsData, prescriptionsData, aiHistoryData] = await Promise.all([
          getPatients(),
          getPrescriptions(),
          getAiHistory().catch(() => []),
        ]);
        setPatients(patientsData);
        setPrescriptions(prescriptionsData);
        setAiHistory(aiHistoryData);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handlePrescriptionSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const created = await createPrescription(form);
      setPrescriptions((current) => [created, ...current]);
      setForm({
        patient: "",
        instructions: "",
        medicines: [createMedicineRow()],
      });
      setMessage("Prescription created successfully.");
    } catch {
      setMessage("Prescription creation failed. Cloudinary PDF generation may need backend attention.");
    } finally {
      setSaving(false);
    }
  };

  const handleAiSubmit = async (event) => {
    event.preventDefault();
    setCheckingAi(true);
    setMessage("");

    try {
      const response = await getAiSuggestion(aiForm);
      setAiResult(response.result);
      if (response.log) {
        setAiHistory((current) => [response.log, ...current]);
      }
      setAiForm(EMPTY_AI);
      setMessage("AI suggestion generated.");
    } catch (error) {
      setAiResult("");
      setMessage(error.response?.data?.message || "AI suggestion unavailable for this account.");
    } finally {
      setCheckingAi(false);
    }
  };

  const selectedPatient = patients.find((patient) => patient._id === aiForm.patientId);

  if (loading) {
    return <Loader label="Loading prescriptions..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--primary-lighter)]/30 via-white to-[var(--primary-light)]/20 p-6">
      <Navbar
        title="Prescriptions"
        subtitle="Create prescriptions and use the AI suggestion box during consultation when the doctor plan allows it."
      />

      {message ? (
        <div className="mb-6 rounded-2xl border border-[var(--border)] bg-[var(--primary-lighter)]/30 px-4 py-3 text-sm text-[var(--primary)]">
          {message}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <PrescriptionForm
            patients={patients}
            value={form}
            onChange={(field, value) => setForm((current) => ({ ...current, [field]: value }))}
            onMedicineChange={(index, field, value) =>
              setForm((current) => ({
                ...current,
                medicines: current.medicines.map((medicine, medicineIndex) =>
                  medicineIndex === index ? { ...medicine, [field]: value } : medicine
                ),
              }))
            }
            onAddMedicine={() =>
              setForm((current) => ({
                ...current,
                medicines: [...current.medicines, createMedicineRow()],
              }))
            }
            onSubmit={handlePrescriptionSubmit}
            busy={saving}
          />

          <form onSubmit={handleAiSubmit} className="rounded-[28px] border border-[var(--border)] bg-gradient-to-b from-[var(--primary)] to-[var(--secondary)] p-6 text-white shadow-[0_20px_60px_rgba(44,94,173,0.2)]">
            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--primary-lighter)]">AI Suggestion Box</p>
              <h2 className="mt-3 text-2xl font-semibold">Symptom checker</h2>
              <p className="mt-2 text-sm text-blue-100">
                Available to doctors on the `pro` plan according to backend policy.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-blue-100">
                <span>Patient</span>
                <select
                  value={aiForm.patientId}
                  onChange={(event) => {
                    const nextPatient = patients.find((patient) => patient._id === event.target.value);
                    setAiForm((current) => ({
                      ...current,
                      patientId: event.target.value,
                      age: nextPatient?.age ? String(nextPatient.age) : current.age,
                      gender: nextPatient?.gender || current.gender,
                    }));
                  }}
                  className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none"
                  required
                >
                  <option value="" className="text-slate-900">Select patient</option>
                  {patients.map((patient) => (
                    <option key={patient._id} value={patient._id} className="text-slate-900">
                      {patient.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2 text-sm font-medium text-blue-100">
                <span>Age</span>
                <input
                  type="number"
                  placeholder="Age"
                  value={aiForm.age}
                  onChange={(event) => setAiForm((current) => ({ ...current, age: event.target.value }))}
                  className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-300"
                  required
                />
              </label>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
              <label className="space-y-2 text-sm font-medium text-blue-100">
                <span>Gender</span>
                <select
                  value={aiForm.gender}
                  onChange={(event) => setAiForm((current) => ({ ...current, gender: event.target.value }))}
                  className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none"
                >
                  <option value="male" className="text-slate-900">Male</option>
                  <option value="female" className="text-slate-900">Female</option>
                  <option value="other" className="text-slate-900">Other</option>
                </select>
              </label>

              <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-blue-100">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--primary-lighter)]">Selected patient</p>
                <p className="mt-2 font-semibold text-white">{selectedPatient?.name || "No patient selected"}</p>
                <p className="mt-1 text-blue-200">
                  {selectedPatient
                    ? `${selectedPatient.age} years • ${selectedPatient.gender}`
                    : "Choose a patient to auto-fill details."}
                </p>
              </div>
            </div>

            <label className="mt-4 block space-y-2 text-sm font-medium text-blue-100">
              <span>Symptoms</span>
              <textarea
                rows={4}
                value={aiForm.symptoms}
                onChange={(event) => setAiForm((current) => ({ ...current, symptoms: event.target.value }))}
                className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-300"
                placeholder="e.g. fever, sore throat, dry cough for 3 days"
                required
              />
            </label>

            <button
              type="submit"
              disabled={checkingAi}
              className="mt-4 rounded-full bg-[var(--primary-light)] px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white disabled:opacity-60"
            >
              {checkingAi ? "Checking..." : "Generate AI suggestion"}
            </button>

            <div className="mt-5 rounded-2xl border border-white/20 bg-white/10 p-4 text-sm text-blue-100 whitespace-pre-wrap">
              {aiResult || "AI output will appear here immediately after symptom analysis."}
            </div>

            <div className="mt-5 rounded-2xl border border-[var(--primary-light)]/30 bg-[var(--primary-light)]/20 p-4 text-xs text-[var(--primary-lighter)]">
              After you click Generate, the suggestion appears above immediately and is also added to the AI records list on the right.
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <section className="rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[0_20px_60px_rgba(44,94,173,0.05)]">
            <h2 className="text-xl font-semibold text-slate-950">AI Suggestion Records</h2>
            <div className="mt-6 space-y-4">
              {aiHistory.length ? aiHistory.map((entry) => (
                <article key={entry._id} className="rounded-2xl border border-[var(--border)] bg-[var(--primary-lighter)]/20 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{entry.patient?.name || "Unknown patient"}</h3>
                      <p className="mt-2 text-sm text-slate-500">
                        {entry.createdAt ? new Date(entry.createdAt).toLocaleString() : "Recent AI suggestion"}
                      </p>
                    </div>
                    <span className="rounded-full bg-[var(--primary-lighter)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
                      {entry.riskLevel || "low"} risk
                    </span>
                  </div>
                  <div className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm text-slate-700">
                    <p className="font-semibold text-slate-900">Symptoms</p>
                    <p className="mt-2 whitespace-pre-wrap">{entry.symptoms}</p>
                  </div>
                  <div className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm text-slate-700">
                    <p className="font-semibold text-slate-900">AI suggestion</p>
                    <p className="mt-2 whitespace-pre-wrap">{entry.aiResponse || "No AI response saved."}</p>
                  </div>
                </article>
              )) : (
                <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--primary-lighter)]/20 px-4 py-8 text-center text-sm text-slate-500">
                  No AI suggestion records yet.
                </div>
              )}
            </div>
          </section>

          <section className="rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[0_20px_60px_rgba(44,94,173,0.05)]">
            <h2 className="text-xl font-semibold text-slate-950">Prescription Records</h2>
            <div className="mt-6 space-y-4">
              {prescriptions.map((prescription) => (
                <article key={prescription._id} className="rounded-2xl border border-[var(--border)] bg-[var(--primary-lighter)]/20 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{prescription.patient?.name || "Unknown patient"}</h3>
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
                        className="rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white transition hover:shadow-[0_0_0_4px_var(--primary-lighter)]"
                      >
                        Open PDF
                      </a>
                    ) : null}
                  </div>

                  <ul className="mt-4 space-y-2 text-sm text-slate-700">
                    {(prescription.medicines || []).map((medicine, index) => (
                      <li key={`${medicine.name}-${index}`} className="rounded-2xl bg-white px-4 py-3">
                        {medicine.name} • {medicine.dosage} • {medicine.duration || "As advised"}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-4 text-sm text-slate-600">
                    {prescription.instructions || "No general instructions added."}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}