"use client";

export default function Loader({ label = "Loading dashboard..." }) {
  return (
    <div className="medical-surface flex min-h-[240px] flex-col items-center justify-center gap-4 rounded-3xl p-10 text-slate-600">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-[rgba(44,94,173,0.2)] border-t-[var(--primary)]" />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}