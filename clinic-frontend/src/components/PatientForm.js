"use client";

const EMPTY_FORM = {
  name: "",
  age: "",
  gender: "male",
  phone: "",
  address: "",
};

export default function PatientForm({
  value = EMPTY_FORM,
  onChange,
  onSubmit,
  onCancel,
  submitLabel = "Save patient",
  busy = false,
}) {
  return (
    <form onSubmit={onSubmit} className="medical-surface rounded-[28px] p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">Patient Form</h2>
        <p className="text-sm text-slate-600">Create or update core patient records.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Full name</span>
          <input
            className="medical-input"
            value={value.name}
            onChange={(event) => onChange("name", event.target.value)}
            required
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Age</span>
          <input
            type="number"
            min="0"
            className="medical-input"
            value={value.age}
            onChange={(event) => onChange("age", event.target.value)}
            required
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Gender</span>
          <select
            className="medical-input"
            value={value.gender}
            onChange={(event) => onChange("gender", event.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Phone</span>
          <input
            className="medical-input"
            value={value.phone}
            onChange={(event) => onChange("phone", event.target.value)}
          />
        </label>
      </div>

      <label className="mt-4 block space-y-2 text-sm font-medium text-slate-700">
        <span>Address</span>
        <textarea
          rows={3}
          className="medical-input"
          value={value.address}
          onChange={(event) => onChange("address", event.target.value)}
        />
      </label>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={busy}
          className="medical-button-primary px-5 py-3 text-sm font-semibold transition hover:brightness-105 disabled:opacity-60"
        >
          {busy ? "Saving..." : submitLabel}
        </button>
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="medical-button-secondary px-5 py-3 text-sm font-semibold transition hover:bg-white"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}