"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import {
  createReceptionistAccount,
  deleteReceptionistAccount,
  getReceptionists,
  updateReceptionistAccount,
} from "@/services/user";

const EMPTY_FORM = {
  name: "",
  email: "",
  password: "",
  plan: "free",
};

export default function AdminReceptionistsPage() {
  const [receptionists, setReceptionists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    async function loadReceptionists() {
      try {
        const data = await getReceptionists();
        setReceptionists(data);
      } finally {
        setLoading(false);
      }
    }

    loadReceptionists();
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

        const updated = await updateReceptionistAccount(editingId, payload);
        setReceptionists((current) => current.map((member) => (member._id === editingId ? updated : member)));
        setMessage("Receptionist updated successfully.");
      } else {
        const created = await createReceptionistAccount(form);
        setReceptionists((current) => [created, ...current]);
        setMessage("Receptionist created successfully.");
      }

      resetForm();
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to save receptionist.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (member) => {
    setEditingId(member._id);
    setForm({
      name: member.name || "",
      email: member.email || "",
      password: "",
      plan: member.plan || "free",
    });
  };

  const handleDelete = async (member) => {
    setMessage("");
    try {
      await deleteReceptionistAccount(member._id);
      setReceptionists((current) => current.filter((item) => item._id !== member._id));
      if (editingId === member._id) {
        resetForm();
      }
      setMessage("Receptionist deleted successfully.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to delete receptionist.");
    }
  };

  if (loading) {
    return <Loader label="Loading reception team..." />;
  }

  return (
    <div className="min-h-screen bg-[#f0f0f0] p-6 text-slate-900">
      <Navbar
        title="Receptionists"
        subtitle="Admin can create, update, and delete front-desk accounts so the reception area feels complete."
      />

      {message ? (
        <div className="mb-6 rounded-2xl border border-[#add8e6] bg-[#e6f3ff] px-4 py-3 text-sm text-[#007bff] font-medium">
          {message}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        {/* Form Container */}
        <form onSubmit={handleSubmit} className="h-fit rounded-[28px] border border-white bg-white p-6 shadow-[0_20px_60px_rgba(0,123,255,0.03)]">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-950">
              {editingId ? "Update Receptionist" : "Create Receptionist"}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {editingId
                ? "Edit receptionist identity and password."
                : "Add a new receptionist account for front-desk workflows."}
            </p>
          </div>

          <div className="grid gap-4">
            <input
              placeholder="Receptionist name"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              className="rounded-2xl border border-slate-200 bg-[#f0f0f0]/30 px-4 py-3 outline-none focus:border-[#007bff]"
              required
            />
            <input
              type="email"
              placeholder="Receptionist email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              className="rounded-2xl border border-slate-200 bg-[#f0f0f0]/30 px-4 py-3 outline-none focus:border-[#007bff]"
              required
            />
            <input
              type="password"
              placeholder={editingId ? "New password (optional)" : "Receptionist password"}
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

          <div className="mt-6 flex flex-col gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-[#007bff] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0056b3] disabled:opacity-60 shadow-sm"
            >
              {saving ? "Saving..." : editingId ? "Update receptionist" : "Create receptionist"}
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

        {/* List Section Grid */}
        <div className="grid gap-4 lg:grid-cols-2 content-start">
          {receptionists.length ? receptionists.map((member) => (
            <article key={member._id} className="rounded-[28px] border border-white bg-white p-6 shadow-[0_20px_60px_rgba(0,123,255,0.03)] flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="truncate">
                    <h2 className="text-xl font-semibold text-slate-950 truncate">{member.name}</h2>
                    <p className="mt-1 text-sm text-slate-600 truncate">{member.email}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-[#e6f3ff] border border-[#add8e6]/60 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#007bff]">
                    {member.role || "Staff"}
                  </span>
                </div>

                <div className="mt-6 grid gap-3 text-sm">
                  <div className="rounded-2xl bg-[#f0f0f0]/50 p-4 border border-slate-100">
                    <p className="text-xs text-slate-500 uppercase font-medium tracking-wider">Plan</p>
                    <p className="mt-1 font-semibold text-slate-900 capitalize">{member.plan || "free"}</p>
                  </div>
                  <div className="rounded-2xl bg-[#f0f0f0]/50 p-4 border border-slate-100">
                    <p className="text-xs text-slate-500 uppercase font-medium tracking-wider">Operational focus</p>
                    <p className="mt-1 font-semibold text-slate-900">Front-desk workflows</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleEdit(member)}
                  className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-[#f0f0f0]"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(member)}
                  className="flex-1 rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
                >
                  Delete
                </button>
              </div>
            </article>
          )) : (
            <div className="rounded-[28px] border border-dashed border-slate-300 bg-white/70 p-10 text-center text-sm text-slate-500 lg:col-span-2">
              No receptionists found yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}