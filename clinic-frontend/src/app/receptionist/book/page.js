"use client";

import { useEffect, useState } from "react";
import AppointmentForm from "@/components/AppointmentForm";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import { createAppointment, getAppointments } from "@/services/appointment";
import { getPatients } from "@/services/patient";
import api from "@/services/api";

const EMPTY_FORM = {
  patient: "",
  doctor: "",
  date: "",
  status: "pending",
  notes: "",
};

export default function ReceptionistBookPage() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const [patientsData, doctorsResponse, appointmentsData] = await Promise.all([
          getPatients(),
          api.get("/users/doctors"),
          getAppointments(),
        ]);
        setPatients(patientsData);
        setDoctors(doctorsResponse.data);
        setAppointments(appointmentsData);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const created = await createAppointment(form);
      setAppointments((current) => [created, ...current]);
      setForm(EMPTY_FORM);
      setMessage("Appointment booked successfully.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to book appointment.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader label="Loading booking form..." />;
  }

  return (
    <div>
      <Navbar
        title="Book Appointment"
        subtitle="Schedule patients with the right doctor and keep intake flowing."
      />

      {message ? (
        <div className="mb-6 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-700">
          {message}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <AppointmentForm
          patients={patients}
          doctors={doctors}
          value={form}
          onChange={(field, value) => setForm((current) => ({ ...current, [field]: value }))}
          onSubmit={handleSubmit}
          busy={saving}
        />

        <section className="rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-950">Scheduled Appointments</h2>
              <p className="mt-2 text-sm text-slate-600">
                Every new booking appears here immediately so the frontend feels complete.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white">
              {appointments.length} total
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {appointments.length ? appointments.map((appointment) => (
              <article key={appointment._id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {appointment.patient?.name || "Unknown patient"}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      Doctor: {appointment.doctor?.name || "Unknown doctor"}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {appointment.date ? new Date(appointment.date).toLocaleString() : "No date"}
                    </p>
                    <p className="mt-2 text-sm text-slate-500">
                      {appointment.notes || "No notes added."}
                    </p>
                  </div>
                  <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                    {appointment.status}
                  </span>
                </div>
              </article>
            )) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
                No appointments booked yet.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
