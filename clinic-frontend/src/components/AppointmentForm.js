"use client";

export default function AppointmentForm({
  patients = [],
  doctors = [],
  value,
  onChange,
  onSubmit,
  busy = false,
}) {
  return (
    <form onSubmit={onSubmit} className="medical-surface rounded-[28px] p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">Appointment Form</h2>
        <p className="text-sm text-slate-600">Book appointments in under a minute.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Patient</span>
          <select
            className="medical-input"
            value={value.patient}
            onChange={(event) => onChange("patient", event.target.value)}
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
          <span>Doctor</span>
          <select
            className="medical-input"
            value={value.doctor}
            onChange={(event) => onChange("doctor", event.target.value)}
            required
          >
            <option value="">Select doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Date and time</span>
          <input
            type="datetime-local"
            className="medical-input"
            value={value.date}
            onChange={(event) => onChange("date", event.target.value)}
            required
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Status</span>
          <select
            className="medical-input"
            value={value.status}
            onChange={(event) => onChange("status", event.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>
      </div>

      <label className="mt-4 block space-y-2 text-sm font-medium text-slate-700">
        <span>Notes</span>
        <textarea
          rows={3}
          className="medical-input"
          value={value.notes}
          onChange={(event) => onChange("notes", event.target.value)}
        />
      </label>

      <button
        type="submit"
        disabled={busy}
        className="medical-button-primary mt-6 px-5 py-3 text-sm font-semibold transition hover:brightness-105 disabled:opacity-60"
      >
        {busy ? "Saving..." : "Book appointment"}
      </button>
    </form>
  );
}