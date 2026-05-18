"use client";

export default function PrescriptionForm({
  patients = [],
  value,
  onChange,
  onMedicineChange,
  onAddMedicine,
  onSubmit,
  busy = false,
}) {
  return (
    <form onSubmit={onSubmit} className="medical-surface rounded-[28px] p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-[#2e2143]">Prescription Form</h2>
          <p className="text-sm text-[#7a688f]">Issue structured prescriptions and keep them export-ready.</p>
        </div>
        <button
          type="button"
          onClick={onAddMedicine}
          className="medical-button-secondary px-4 py-2 text-sm font-semibold transition hover:bg-white"
        >
          Add medicine
        </button>
      </div>

      <label className="space-y-2 text-sm font-medium text-[#5f5070]">
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

      <div className="mt-4 space-y-4">
        {value.medicines.map((medicine, index) => (
          <div key={medicine.id || index} className="medical-panel grid gap-4 rounded-2xl p-4 md:grid-cols-2">
            <input
              placeholder="Medicine name"
              className="medical-input"
              value={medicine.name}
              onChange={(event) => onMedicineChange(index, "name", event.target.value)}
              required
            />
            <input
              placeholder="Dosage"
              className="medical-input"
              value={medicine.dosage}
              onChange={(event) => onMedicineChange(index, "dosage", event.target.value)}
              required
            />
            <input
              placeholder="Duration"
              className="medical-input"
              value={medicine.duration}
              onChange={(event) => onMedicineChange(index, "duration", event.target.value)}
            />
            <input
              placeholder="Medicine instructions"
              className="medical-input"
              value={medicine.instructions}
              onChange={(event) => onMedicineChange(index, "instructions", event.target.value)}
            />
          </div>
        ))}
      </div>

      <label className="mt-4 block space-y-2 text-sm font-medium text-[#5f5070]">
        <span>General instructions</span>
        <textarea
          rows={3}
          className="medical-input"
          value={value.instructions}
          onChange={(event) => onChange("instructions", event.target.value)}
        />
      </label>

      <button
        type="submit"
        disabled={busy}
        className="medical-button-primary mt-6 px-5 py-3 text-sm font-semibold transition hover:brightness-105 disabled:opacity-60"
      >
        {busy ? "Saving..." : "Create prescription"}
      </button>
    </form>
  );
}
