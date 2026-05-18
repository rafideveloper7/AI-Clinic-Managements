"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import PatientForm from "@/components/PatientForm";
import { createPatient, getPatients, updatePatient } from "@/services/patient";
import { getAiHistory } from "@/services/prescription";

const EMPTY_FORM = {
  name: "",
  age: "",
  gender: "male",
  phone: "",
  address: "",
};

export default function ReceptionistPatientsPage() {
  const [patients, setPatients] = useState([]);
  const [aiHistory, setAiHistory] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadPatients() {
      try {
        const [patientData, aiHistoryData] = await Promise.all([
          getPatients(),
          getAiHistory().catch(() => []),
        ]);
        setPatients(patientData);
        setAiHistory(aiHistoryData);
      } finally {
        setLoading(false);
      }
    }

    loadPatients();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    const payload = { ...form, age: Number(form.age) };

    try {
      if (selectedId) {
        const updated = await updatePatient(selectedId, payload);
        setPatients((current) => current.map((item) => (item._id === selectedId ? updated : item)));
        setMessage("Patient updated successfully.");
      } else {
        const created = await createPatient(payload);
        setPatients((current) => [created, ...current]);
        setMessage("Patient added successfully.");
      }
      setSelectedId("");
      setForm(EMPTY_FORM);
    } catch {
      setMessage("Unable to save patient.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader label="Loading patients..." />;
  }

  const aiHistoryByPatient = aiHistory.reduce((accumulator, entry) => {
    const patientId = entry.patient?._id;
    if (!patientId) return accumulator;

    if (!accumulator[patientId]) {
      accumulator[patientId] = [];
    }

    accumulator[patientId].push(entry);
    return accumulator;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--primary-lighter)]/30 via-white to-[var(--primary-light)]/20 p-6">
      <Navbar
        title="Patients"
        subtitle="Reception can register and update patient records before appointments."
      />

      {message ? (
        <div className="mb-6 rounded-2xl border border-[var(--border)] bg-[var(--primary-lighter)]/30 px-4 py-3 text-sm text-[var(--primary)]">
          {message}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <PatientForm
          value={form}
          onChange={(field, value) => setForm((current) => ({ ...current, [field]: value }))}
          onSubmit={handleSubmit}
          onCancel={selectedId ? () => {
            setSelectedId("");
            setForm(EMPTY_FORM);
          } : undefined}
          submitLabel={selectedId ? "Update patient" : "Create patient"}
          busy={saving}
        />

        <section className="rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[0_20px_60px_rgba(44,94,173,0.05)]">
          <h2 className="text-xl font-semibold text-slate-950">Patient List</h2>
          <div className="mt-6 space-y-4">
            {patients.map((patient) => (
              <article key={patient._id} className="rounded-2xl border border-[var(--border)] bg-[var(--primary-lighter)]/20 p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{patient.name}</h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {patient.age} years • {patient.gender}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">{patient.phone || "No phone added"}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedId(patient._id);
                      setForm({
                        name: patient.name || "",
                        age: String(patient.age || ""),
                        gender: patient.gender || "male",
                        phone: patient.phone || "",
                        address: patient.address || "",
                      });
                    }}
                    className="rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-[var(--primary-lighter)]/20"
                  >
                    Edit
                  </button>
                </div>
                <p className="mt-3 text-sm text-slate-600">{patient.address || "No address provided."}</p>
                <div className="mt-4 rounded-2xl bg-white p-4 text-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-semibold text-slate-900">AI-generated records</p>
                    <span className="rounded-full bg-[var(--primary-lighter)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
                      {aiHistoryByPatient[patient._id]?.length || 0} records
                    </span>
                  </div>
                  {aiHistoryByPatient[patient._id]?.length ? (
                    <div className="mt-3 rounded-2xl bg-[var(--primary-lighter)]/20 p-3 text-slate-700">
                      <p className="font-medium text-slate-900">
                        Last AI entry by {aiHistoryByPatient[patient._id][0].doctor?.name || "doctor"}
                      </p>
                      <p className="mt-2 whitespace-pre-wrap">{aiHistoryByPatient[patient._id][0].aiResponse}</p>
                    </div>
                  ) : (
                    <p className="mt-3 text-slate-500">No AI-generated suggestions saved for this patient yet.</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}