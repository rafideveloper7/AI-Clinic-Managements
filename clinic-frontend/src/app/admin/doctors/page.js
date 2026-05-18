"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import {
  createDoctorAccount,
  deleteDoctorAccount,
  getDoctors,
  updateDoctorAccount,
  updateUserPlan,
} from "@/services/user";

const EMPTY_FORM = {
  name: "",
  email: "",
  password: "",
  plan: "free",
};

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    async function loadDoctors() {
      try {
        const data = await getDoctors();
        setDoctors(data);
      } finally {
        setLoading(false);
      }
    }

    loadDoctors();
  }, []);

  const resetForm = () => {
    setEditingId("");
    setForm(EMPTY_FORM);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      if (editingId) {
        const payload = {
          name: form.name,
          email: form.email,
          plan: form.plan,
        };
        if (form.password) payload.password = form.password;

        const updated = await updateDoctorAccount(editingId, payload);
        setDoctors((current) => current.map((doctor) => (doctor._id === editingId ? updated : doctor)));
        setMessage("Doctor updated successfully.");
      } else {
        const created = await createDoctorAccount(form);
        setDoctors((current) => [created, ...current]);
        setMessage("Doctor created successfully.");
      }

      resetForm();
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to save doctor.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (doctor) => {
    setEditingId(doctor._id);
    setForm({
      name: doctor.name || "",
      email: doctor.email || "",
      password: "",
      plan: doctor.plan || "free",
    });
  };

  const handleDelete = async (doctor) => {
    setMessage("");
    try {
      await deleteDoctorAccount(doctor._id);
      setDoctors((current) => current.filter((item) => item._id !== doctor._id));
      if (editingId === doctor._id) {
        resetForm();
      }
      setMessage("Doctor deleted successfully.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to delete doctor.");
    }
  };

  const togglePlan = async (doctor) => {
    setMessage("");
    const nextPlan = doctor.plan === "pro" ? "free" : "pro";

    try {
      const updated = await updateUserPlan(doctor._id, nextPlan);
      setDoctors((current) =>
        current.map((item) => (item._id === doctor._id ? updated : item))
      );
      if (editingId === doctor._id) {
        setForm((current) => ({ ...current, plan: updated.plan || nextPlan }));
      }
      setMessage(`${doctor.name} is now on the ${nextPlan} plan.`);
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to update plan.");
    }
  };

  if (loading) {
    return <Loader label="Loading doctors..." />;
  }

  return (
    <div className="min-h-screen bg-[#f0f0f0] p-6 text-slate-900">
      <Navbar
        title="Doctors"
        subtitle="Admin can create, update, delete, and manage Free or Pro doctor accounts from one screen."
      />

      {message ? (
        <div className="mb-6 rounded-2xl border border-[#add8e6] bg-[#e6f3ff] px-4 py-3 text-sm text-[#007bff] font-medium">
          {message}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        {/* Management Form Container */}
        <form onSubmit={handleSubmit} className="h-fit rounded-[28px] border border-white bg-white p-6 shadow-[0_20px_60px_rgba(0,123,255,0.03)]">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-950">
              {editingId ? "Update Doctor" : "Create Doctor"}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {editingId
                ? "Edit doctor identity, password, and plan."
                : "Add a new doctor account for the clinic."}
            </p>
          </div>

          <div className="grid gap-4">
            <input
              placeholder="Doctor name"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              className="rounded-2xl border border-slate-200 bg-[#f0f0f0]/30 px-4 py-3 outline-none focus:border-[#007bff]"
              required
            />
            <input
              type="email"
              placeholder="Doctor email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              className="rounded-2xl border border-slate-200 bg-[#f0f0f0]/30 px-4 py-3 outline-none focus:border-[#007bff]"
              required
            />
            <input
              type="password"
              placeholder={editingId ? "New password (optional)" : "Doctor password"}
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              className="rounded-2xl border border-slate-200 bg-[#f0f0f0]/30 px-4 py-3 outline-none focus:border-[#007bff]"
              required={!editingId}
            />
            <select
              value={form.plan}
              onChange={(event) => setForm((current) => ({ ...current, plan: event.target.value }))}
              className="rounded-2xl border border-slate-200 bg-[#f0f0f0]/30 px-4 py-3 outline-none focus:border-[#007bff]"
            >
              <option value="free">Free Plan</option>
              <option value="pro">Pro Plan</option>
            </select>
          </div>

          <div className="mt-5 rounded-2xl bg-[#e6f3ff]/60 p-4 text-sm text-slate-700 border border-[#add8e6]/40">
            <span className="font-semibold text-[#007bff]">Free:</span> limited patients, no AI features.
            <br />
            <span className="font-semibold text-[#007bff]">Pro:</span> unlimited patients, AI features enabled, advanced analytics.
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-[#007bff] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0056b3] disabled:opacity-60 shadow-sm"
            >
              {saving ? "Saving..." : editingId ? "Update doctor" : "Create doctor"}
            </button>
            {editingId ? (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-[#f0f0f0]"
              >
                Cancel
              </button>
            ) : null}
          </div>
        </form>

        {/* Doctors Grid Cards */}
        <div className="grid gap-4 lg:grid-cols-2 content-start">
          {doctors.map((doctor) => (
            <article key={doctor._id} className="rounded-[28px] border border-white bg-white p-6 shadow-[0_20px_60px_rgba(0,123,255,0.03)] flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="truncate">
                    <h2 className="text-xl font-semibold text-slate-950 truncate">{doctor.name}</h2>
                    <p className="mt-1 text-sm text-slate-600 truncate">{doctor.email}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider border ${
                    doctor.plan === "pro" 
                      ? "bg-[#e6f3ff] text-[#007bff] border-[#add8e6]/60" 
                      : "bg-[#f0f0f0] text-slate-600 border-slate-200"
                  }`}>
                    {doctor.plan || "free"}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl bg-[#f0f0f0]/50 p-4 border border-slate-100">
                    <p className="text-xs text-slate-500 uppercase font-medium tracking-wider">Role</p>
                    <p className="mt-1 font-semibold text-slate-900 truncate">{doctor.role}</p>
                  </div>
                  <div className="rounded-2xl bg-[#f0f0f0]/50 p-4 border border-slate-100">
                    <p className="text-xs text-slate-500 uppercase font-medium tracking-wider">Account type</p>
                    <p className="mt-1 font-semibold text-slate-900 truncate">
                      {doctor.plan === "pro" ? "AI Enabled" : "Standard"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-[#e6f3ff]/40 p-4 text-xs text-slate-600 border border-[#add8e6]/20">
                  {doctor.plan === "pro"
                    ? "Pro: unlimited patients, AI features enabled, advanced analytics."
                    : "Free: limited patients, no AI features, basic analytics only."}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2 pt-4 border-t border-slate-100">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(doctor)}
                    className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-[#f0f0f0]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => togglePlan(doctor)}
                    className="flex-1 rounded-full bg-[#007bff] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#0056b3] shadow-sm"
                  >
                    {doctor.plan === "pro" ? "Downgrade" : "Upgrade"}
                  </button>
                </div>
                <button
                  onClick={() => handleDelete(doctor)}
                  className="w-full rounded-full bg-rose-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-rose-600"
                >
                  Delete Doctor Account
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}