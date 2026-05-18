export default function DashboardCard({ title, value, hint, accent = "sky" }) {
  const accents = {
    sky: "from-[#72ddf7] to-[#b388eb]",
    emerald: "from-[#9a52ff] to-[#72ddf7]",
    violet: "from-[#8447ff] to-[#b388eb]",
    amber: "from-[#ffb2e6] to-[#f7aef8]",
    rose: "from-[#e382f9] to-[#ffb2e6]",
  };

  return (
    <div className="overflow-hidden rounded-[28px] border border-[rgba(179,136,235,0.16)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(253,246,255,0.96))] shadow-[0_20px_55px_rgba(132,71,255,0.08)] backdrop-blur">
      <div className={`h-1.5 bg-gradient-to-r ${accents[accent] || accents.sky}`} />
      <div className="p-6">
        <p className="text-sm font-medium text-[#7a688f]">{title}</p>
        <p className="mt-3 text-4xl font-semibold text-[#2e2143]">{value}</p>
        <p className="mt-2 text-sm text-[#6f5a85]">{hint}</p>
      </div>
    </div>
  );
}
