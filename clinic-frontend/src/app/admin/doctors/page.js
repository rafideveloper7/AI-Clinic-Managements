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
    <div className="min-h-screen bg-gradient-to-br from-[var(--primary-lighter)]/30 via-white to-[var(--primary-light)]/20 p-6">
      <Navbar
        title="Doctors"
        subtitle="Admin can create, update, delete, and manage Free or Pro doctor accounts from one screen."
      />

      {message ? (
        <div className="mb-6 rounded-2xl border border-[var(--border)] bg-[var(--primary-lighter)]/30 px-4 py-3 text-sm text-[var(--primary)] font-medium">
          {message}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <form onSubmit={handleSubmit} className="h-fit rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[0_20px_60px_rgba(44,94,173,0.03)]">
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
              className="rounded-2xl border border-[var(--border)] bg-white px-4 py-3 outline-none focus:border-[var(--primary)]"
              required
            />
            <input
              type="email"
              placeholder="Doctor email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              className="rounded-2xl border border-[var(--border)] bg-white px-4 py-3 outline-none focus:border-[var(--primary)]"
              required
            />
            <input
              type="password"
              placeholder={editingId ? "New password (optional)" : "Doctor password"}
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              className="rounded-2xl border border-[var(--border)] bg-white px-4 py-3 outline-none focus:border-[var(--primary)]"
              required={!editingId}
            />
            <select
              value={form.plan}
              onChange={(event) => setForm((current) => ({ ...current, plan: event.target.value }))}
              className="rounded-2xl border border-[var(--border)] bg-white px-4 py-3 outline-none focus:border-[var(--primary)]"
            >
              <option value="free">Free Plan</option>
              <option value="pro">Pro Plan</option>
            </select>
          </div>

          <div className="mt-5 rounded-2xl bg-[var(--primary-lighter)]/20 p-4 text-sm text-slate-700 border border-[var(--border)]">
            <span className="font-semibold text-[var(--primary)]">Free:</span> limited patients, no AI features.
            <br />
            <span className="font-semibold text-[var(--primary)]">Pro:</span> unlimited patients, AI features enabled, advanced analytics.
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:shadow-[0_0_0_4px_var(--primary-lighter)] disabled:opacity-60"
            >
              {saving ? "Saving..." : editingId ? "Update doctor" : "Create doctor"}
            </button>
            {editingId ? (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-full border border-[var(--border)] bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-[var(--primary-lighter)]/20"
              >
                Cancel
              </button>
            ) : null}
          </div>
        </form>

        <div className="grid gap-4 lg:grid-cols-2 content-start">
          {doctors.map((doctor) => (
            <article key={doctor._id} className="rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[0_20px_60px_rgba(44,94,173,0.03)] flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="truncate">
                    <h2 className="text-xl font-semibold text-slate-950 truncate">{doctor.name}</h2>
                    <p className="mt-1 text-sm text-slate-600 truncate">{doctor.email}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider border ${
                    doctor.plan === "pro"
                      ? "bg-[var(--primary-lighter)] text-[var(--primary)] border-[var(--border)]"
                      : "bg-[var(--primary-lighter)]/30 text-slate-600 border-[var(--border)]"
                  }`}>
                    {doctor.plan || "free"}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl bg-[var(--primary-lighter)]/20 p-4 border border-[var(--border)]">
                    <p className="text-xs text-slate-500 uppercase font-medium tracking-wider">Role</p>
                    <p className="mt-1 font-semibold text-slate-900 truncate">{doctor.role}</p>
                  </div>
                  <div className="rounded-2xl bg-[var(--primary-lighter)]/20 p-4 border border-[var(--border)]">
                    <p className="text-xs text-slate-500 uppercase font-medium tracking-wider">Account type</p>
                    <p className="mt-1 font-semibold text-slate-900 truncate">
                      {doctor.plan === "pro" ? "AI Enabled" : "Standard"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-[var(--primary-lighter)]/20 p-4 text-xs text-slate-600 border border-[var(--border)]">
                  {doctor.plan === "pro"
                    ? "Pro: unlimited patients, AI features enabled, advanced analytics."
                    : "Free: limited patients, no AI features, basic analytics only."}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2 pt-4 border-t border-[var(--border)]">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(doctor)}
                    className="flex-1 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-[var(--primary-lighter)]/20"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => togglePlan(doctor)}
                    className="flex-1 rounded-full bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-white transition hover:shadow-[0_0_0_4px_var(--primary-lighter)] shadow-sm"
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