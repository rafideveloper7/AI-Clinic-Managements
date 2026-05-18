"use client";

import { useEffect, useMemo, useState } from "react";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import PatientForm from "@/components/PatientForm";
import { createPatient, deletePatient, getPatients, updatePatient } from "@/services/patient";

const EMPTY_FORM = {
  name: "",
  age: "",
  gender: "male",
  phone: "",
  address: "",
};

export default function DoctorPatientsPage() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadPatients() {
      try {
        const data = await getPatients();
        setPatients(data);
      } finally {
        setLoading(false);
      }
    }

    loadPatients();
  }, []);

  const selectedPatient = useMemo(
    () => patients.find((patient) => patient._id === selectedId),
    [patients, selectedId]
  );

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setSelectedId("");
  };

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
        setMessage("Patient created successfully.");
      }

      resetForm();
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to save patient right now.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (patient) => {
    setSelectedId(patient._id);
    setForm({
      name: patient.name || "",
      age: String(patient.age || ""),
      gender: patient.gender || "male",
      phone: patient.phone || "",
      address: patient.address || "",
    });
  };

  const handleDelete = async (id) => {
    setMessage("");
    try {
      await deletePatient(id);
      setPatients((current) => current.filter((patient) => patient._id !== id));
      if (selectedId === id) {
        resetForm();
      }
      setMessage("Patient removed successfully.");
    } catch {
      setMessage("Delete failed. Admin-only delete may be enforced by the backend.");
    }
  };

  if (loading) {
    return <Loader label="Loading patients..." />;
  }

  return (
    <div>
      <Navbar
        title="Patients"
        subtitle="Create and maintain patient records directly from the doctor workspace."
      />

      {message ? (
        <div className="mb-6 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-700">
          {message}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <PatientForm
          value={form}
          onChange={(field, value) => setForm((current) => ({ ...current, [field]: value }))}
          onSubmit={handleSubmit}
          onCancel={selectedId ? resetForm : undefined}
          submitLabel={selectedId ? "Update patient" : "Create patient"}
          busy={saving}
        />

        <section className="rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <h2 className="text-xl font-semibold text-slate-950">Patient Directory</h2>
          <div className="mt-6 space-y-4">
            {patients.map((patient) => (
              <article key={patient._id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{patient.name}</h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {patient.age} years • {patient.gender}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">{patient.phone || "No phone added"}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(patient)}
                      className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(patient._id)}
                      className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-600">{patient.address || "No address provided."}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
