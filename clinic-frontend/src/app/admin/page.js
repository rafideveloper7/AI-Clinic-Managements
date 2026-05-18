"use client";

import { useEffect, useState } from "react";
import DashboardCard from "@/components/DashboardCard";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import api from "@/services/api";
import {
  createDoctorAccount,
  createPatientAccount,
  getAdminPatients,
  getDoctors,
} from "@/services/user";

const EMPTY_DOCTOR_FORM = {
  name: "",
  email: "",
  password: "",
  plan: "free",
};

const EMPTY_PATIENT_FORM = {
  name: "",
  email: "",
  password: "",
  age: "",
  gender: "male",
  phone: "",
  address: "",
  createdBy: "",
};

const EMPTY_STATS = {
  totalPatients: 0,
  totalDoctors: 0,
  totalAppointments: 0,
  aiUsageCount: 0,
};

export default function AdminDashboard() {
  const [stats, setStats] = useState(EMPTY_STATS);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctorForm, setDoctorForm] = useState(EMPTY_DOCTOR_FORM);
  const [patientForm, setPatientForm] = useState(EMPTY_PATIENT_FORM);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [savingDoctor, setSavingDoctor] = useState(false);
  const [savingPatient, setSavingPatient] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [{ data: statsData }, doctorsData, patientsData] = await Promise.all([
          api.get("/analytics/admin"),
          getDoctors(),
          getAdminPatients(),
        ]);

        setStats(statsData);
        setDoctors(doctorsData);
        setPatients(patientsData);
        setPatientForm((current) => ({
          ...current,
          createdBy: doctorsData[0]?._id || "",
        }));
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const refreshStats = async () => {
    const { data } = await api.get("/analytics/admin");
    setStats(data);
  };

  const handleDoctorSubmit = async (event) => {
    event.preventDefault();
    setSavingDoctor(true);
    setMessage("");

    try {
      const doctor = await createDoctorAccount(doctorForm);
      setDoctors((current) => [doctor, ...current]);
      setDoctorForm(EMPTY_DOCTOR_FORM);
      await refreshStats();
      setMessage("Doctor account created successfully.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to create doctor account.");
    } finally {
      setSavingDoctor(false);
    }
  };

  const handlePatientSubmit = async (event) => {
    event.preventDefault();
    setSavingPatient(true);
    setMessage("");

    try {
      const patient = await createPatientAccount({
        ...patientForm,
        age: Number(patientForm.age),
      });
      setPatients((current) => [patient, ...current]);
      setPatientForm((current) => ({
        ...EMPTY_PATIENT_FORM,
        createdBy: current.createdBy,
      }));
      await refreshStats();
      setMessage("Patient account created successfully.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to create patient account.");
    } finally {
      setSavingPatient(false);
    }
  };

  if (loading) {
    return <Loader label="Loading admin metrics..." />;
  }

  return (
    <div className="min-h-screen bg-[#f0f0f0] p-6 text-slate-900">
      <Navbar
        title="Admin Dashboard"
        subtitle="Manage doctors, patient logins, subscription plans, and demo-ready clinic operations from one command center."
      />

      {message ? (
        <div className="mb-6 rounded-2xl border border-[#add8e6] bg-[#e6f3ff] px-4 py-3 text-sm text-[#007bff] font-medium">
          {message}
        </div>
      ) : null}

      {/* Stats Section with clean theme-aligned color configurations */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard title="Total Patients" value={stats.totalPatients} hint="All patient records in the system." accent="blue" />
        <DashboardCard title="Doctors" value={stats.totalDoctors} hint="Available doctors onboarded." accent="blue" />
        <DashboardCard title="Appointments" value={stats.totalAppointments} hint="End-to-end booking volume." accent="blue" />
        <DashboardCard title="AI Usage" value={stats.aiUsageCount} hint="Symptom suggestion requests logged." accent="blue" />
      </div>

      <section className="mt-8 grid gap-6 xl:grid-cols-2">
        {/* Create Doctor Form */}
        <form onSubmit={handleDoctorSubmit} className="rounded-[28px] border border-white/70 bg-white p-6 shadow-[0_20px_60px_rgba(0,123,255,0.05)]">
          <h2 className="text-xl font-semibold text-slate-950">Create Doctor</h2>
          <p className="mt-2 text-sm text-slate-600">Admin can create free or pro doctor accounts directly.</p>
          <div className="mt-6 grid gap-4">
            <input
              placeholder="Doctor name"
              value={doctorForm.name}
              onChange={(event) => setDoctorForm((current) => ({ ...current, name: event.target.value }))}
              className="rounded-2xl border border-slate-200 bg-[#f0f0f0]/30 px-4 py-3 outline-none focus:border-[#007bff]"
              required
            />
            <input
              type="email"
              placeholder="Doctor email"
              value={doctorForm.email}
              onChange={(event) => setDoctorForm((current) => ({ ...current, email: event.target.value }))}
              className="rounded-2xl border border-slate-200 bg-[#f0f0f0]/30 px-4 py-3 outline-none focus:border-[#007bff]"
              required
            />
            <input
              type="password"
              placeholder="Doctor password"
              value={doctorForm.password}
              onChange={(event) => setDoctorForm((current) => ({ ...current, password: event.target.value }))}
              className="rounded-2xl border border-slate-200 bg-[#f0f0f0]/30 px-4 py-3 outline-none focus:border-[#007bff]"
              required
            />
            <select
              value={doctorForm.plan}
              onChange={(event) => setDoctorForm((current) => ({ ...current, plan: event.target.value }))}
              className="rounded-2xl border border-slate-200 bg-[#f0f0f0]/30 px-4 py-3 outline-none focus:border-[#007bff]"
            >
              <option value="free">Free Plan</option>
              <option value="pro">Pro Plan</option>
            </select>
          </div>
          <div className="mt-5 rounded-2xl bg-[#e6f3ff] p-4 text-sm text-slate-700 border border-[#add8e6]/40">
            <span className="font-semibold text-[#007bff]">Free:</span> limited patients, no AI.
            <br />
            <span className="font-semibold text-[#007bff]">Pro:</span> unlimited patients, AI features, advanced analytics.
          </div>
          <button
            type="submit"
            disabled={savingDoctor}
            className="mt-6 rounded-full bg-[#007bff] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0056b3] disabled:opacity-60 shadow-sm"
          >
            {savingDoctor ? "Creating..." : "Create doctor"}
          </button>
        </form>

        {/* Create Patient Form */}
        <form onSubmit={handlePatientSubmit} className="rounded-[28px] border border-white/70 bg-white p-6 shadow-[0_20px_60px_rgba(0,123,255,0.05)]">
          <h2 className="text-xl font-semibold text-slate-950">Create Patient Login</h2>
          <p className="mt-2 text-sm text-slate-600">Create a patient account and linked patient record together.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              placeholder="Patient name"
              value={patientForm.name}
              onChange={(event) => setPatientForm((current) => ({ ...current, name: event.target.value }))}
              className="rounded-2xl border border-slate-200 bg-[#f0f0f0]/30 px-4 py-3 outline-none focus:border-[#007bff]"
              required
            />
            <input
              type="email"
              placeholder="Patient email"
              value={patientForm.email}
              onChange={(event) => setPatientForm((current) => ({ ...current, email: event.target.value }))}
              className="rounded-2xl border border-slate-200 bg-[#f0f0f0]/30 px-4 py-3 outline-none focus:border-[#007bff]"
              required
            />
            <input
              type="password"
              placeholder="Patient password"
              value={patientForm.password}
              onChange={(event) => setPatientForm((current) => ({ ...current, password: event.target.value }))}
              className="rounded-2xl border border-slate-200 bg-[#f0f0f0]/30 px-4 py-3 outline-none focus:border-[#007bff]"
              required
            />
            <input
              type="number"
              placeholder="Age"
              value={patientForm.age}
              onChange={(event) => setPatientForm((current) => ({ ...current, age: event.target.value }))}
              className="rounded-2xl border border-slate-200 bg-[#f0f0f0]/30 px-4 py-3 outline-none focus:border-[#007bff]"
              required
            />
            <select
              value={patientForm.gender}
              onChange={(event) => setPatientForm((current) => ({ ...current, gender: event.target.value }))}
              className="rounded-2xl border border-slate-200 bg-[#f0f0f0]/30 px-4 py-3 outline-none focus:border-[#007bff]"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <select
              value={patientForm.createdBy}
              onChange={(event) => setPatientForm((current) => ({ ...current, createdBy: event.target.value }))}
              className="rounded-2xl border border-slate-200 bg-[#f0f0f0]/30 px-4 py-3 outline-none focus:border-[#007bff]"
            >
              <option value="">Assign doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.name}
                </option>
              ))}
            </select>
            <input
              placeholder="Phone"
              value={patientForm.phone}
              onChange={(event) => setPatientForm((current) => ({ ...current, phone: event.target.value }))}
              className="rounded-2xl border border-slate-200 bg-[#f0f0f0]/30 px-4 py-3 outline-none md:col-span-2 focus:border-[#007bff]"
            />
            <textarea
              placeholder="Address"
              value={patientForm.address}
              onChange={(event) => setPatientForm((current) => ({ ...current, address: event.target.value }))}
              className="rounded-2xl border border-slate-200 bg-[#f0f0f0]/30 px-4 py-3 outline-none md:col-span-2 focus:border-[#007bff]"
              rows={3}
            />
          </div>
          <button
            type="submit"
            disabled={savingPatient}
            className="mt-6 rounded-full bg-[#007bff] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0056b3] disabled:opacity-60 shadow-sm"
          >
            {savingPatient ? "Creating..." : "Create patient account"}
          </button>
        </form>
      </section>

      {/* Admin Shortcuts */}
      <section className="mt-8 rounded-[28px] border border-white/70 bg-white p-6 shadow-[0_20px_60px_rgba(0,123,255,0.05)]">
        <h2 className="text-xl font-semibold text-slate-950">Admin Shortcuts</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <a href="/admin/doctors" className="rounded-2xl border border-slate-200 bg-[#e6f3ff]/40 p-4 text-sm text-slate-700 transition hover:bg-[#e6f3ff] hover:text-[#007bff] font-medium group">
            Open doctors list and switch Free/Pro plans <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a href="/admin/analytics" className="rounded-2xl border border-slate-200 bg-[#e6f3ff]/40 p-4 text-sm text-slate-700 transition hover:bg-[#e6f3ff] hover:text-[#007bff] font-medium group">
            Open analytics charts for the final demo <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </section>
    </div>
  );
}