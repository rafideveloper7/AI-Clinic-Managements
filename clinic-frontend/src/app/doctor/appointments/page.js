"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import { createAppointment, getDoctorAppointments, updateAppointment } from "@/services/appointment";
import { getPatients } from "@/services/patient";

const STATUSES = ["pending", "confirmed", "completed", "cancelled"];
const EMPTY_FORM = {
  patient: "",
  date: "",
  status: "pending",
  notes: "",
};

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadAppointments() {
      try {
        const [appointmentData, patientData] = await Promise.all([
          getDoctorAppointments(),
          getPatients(),
        ]);
        setAppointments(appointmentData);
        setPatients(patientData);
      } finally {
        setLoading(false);
      }
    }

    loadAppointments();
  }, []);

  const handleStatusChange = async (appointmentId, status) => {
    setMessage("");
    try {
      const updated = await updateAppointment(appointmentId, { status });
      setAppointments((current) =>
        current.map((appointment) => (appointment._id === appointmentId ? { ...appointment, ...updated } : appointment))
      );
      setMessage("Appointment status updated.");
    } catch {
      setMessage("Could not update appointment.");
    }
  };

  const handleCreateAppointment = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const created = await createAppointment(form);
      setAppointments((current) => [created, ...current]);
      setForm(EMPTY_FORM);
      setMessage("Appointment created successfully.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not create appointment.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader label="Loading appointments..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--primary-lighter)]/30 via-white to-[var(--primary-light)]/20 p-6">
      <Navbar
        title="Appointments"
        subtitle="Doctors can create appointments for their patients and update each visit status directly."
      />

      {message ? (
        <div className="mb-6 rounded-2xl border border-[var(--border)] bg-[var(--primary-lighter)]/30 px-4 py-3 text-sm text-[var(--primary)]">
          {message}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <form onSubmit={handleCreateAppointment} className="rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[0_20px_60px_rgba(44,94,173,0.05)]">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-950">Add Appointment</h2>
            <p className="text-sm text-slate-500">Schedule a consultation for one of your existing patients.</p>
          </div>

          <div className="grid gap-4">
            <label className="space-y-2 text-sm font-medium text-slate-700">
              <span>Patient</span>
              <select
                className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--primary)]"
                value={form.patient}
                onChange={(event) => setForm((current) => ({ ...current, patient: event.target.value }))}
                required
              >
                <option value="">Select patient</option>
                {patients.map((patient) => (
                  <option key={patient._id} value={patient._id}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              <span>Date and time</span>
              <input
                type="datetime-local"
                className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--primary)]"
                value={form.date}
                onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))}
                required
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              <span>Status</span>
              <select
                className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--primary)]"
                value={form.status}
                onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              <span>Notes</span>
              <textarea
                rows={4}
                className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--primary)]"
                value={form.notes}
                onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
                placeholder="Add context for the consultation"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="mt-6 rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:shadow-[0_0_0_4px_var(--primary-lighter)] disabled:opacity-60"
          >
            {saving ? "Creating..." : "Create appointment"}
          </button>
        </form>

        <section className="space-y-4">
          {appointments.length ? appointments.map((appointment) => (
            <article key={appointment._id} className="rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[0_20px_60px_rgba(44,94,173,0.05)] hover:shadow-md transition-shadow">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-950">{appointment.patient?.name || "Unknown patient"}</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    {new Date(appointment.date).toLocaleString()}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">{appointment.notes || "No notes added."}</p>
                </div>

                <select
                  value={appointment.status}
                  onChange={(event) => handleStatusChange(appointment._id, event.target.value)}
                  className="rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold capitalize text-slate-700 outline-none"
                >
                  {STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </article>
          )) : (
            <div className="rounded-[28px] border border-dashed border-[var(--border)] bg-white/70 p-10 text-center text-sm text-slate-500">
              No appointments yet. Use the form to create one for a patient.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}