export default function DashboardCard({ title, value, hint, accent = "primary" }) {
  const accents = {
    primary: "from-[var(--primary)] to-[var(--secondary)]",
    light: "from-[var(--primary-light)] to-[var(--secondary)]",
    blue: "from-[var(--primary-lighter)] to-[var(--primary-light)]",
  };

  return (
    <div className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-white shadow-[0_20px_55px_rgba(44,94,173,0.08)]">
      <div className={`h-1.5 bg-gradient-to-r ${accents[accent] || accents.primary}`} />
      <div className="p-6">
        <p className="text-sm font-medium text-slate-600">{title}</p>
        <p className="mt-3 text-4xl font-bold text-slate-900">{value}</p>
        <p className="mt-2 text-sm text-slate-500">{hint}</p>
      </div>
    </div>
  );
}