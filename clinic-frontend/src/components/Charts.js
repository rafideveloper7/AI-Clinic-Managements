"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#ffb2e6", "#f7aef8", "#e382f9", "#b388eb", "#72ddf7"];

export function MetricsBarChart({ data, title }) {
  return (
    <section className="medical-surface rounded-[28px] p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#2e2143]">{title}</h2>
        <p className="text-sm text-[#7a688f]">Live summary from the clinic API.</p>
      </div>
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="4 4" stroke="#efdff9" vertical={false} />
            <XAxis dataKey="name" stroke="#6f5a85" />
            <YAxis stroke="#6f5a85" allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" radius={[12, 12, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export function StatusPieChart({ data, title }) {
  return (
    <section className="medical-surface rounded-[28px] p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#2e2143]">{title}</h2>
        <p className="text-sm text-[#7a688f]">Breakdown for faster decision making.</p>
      </div>
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={72}
              outerRadius={110}
              paddingAngle={4}
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        {data.map((item, index) => (
          <div key={item.name} className="inline-flex items-center gap-2 rounded-full bg-[rgba(247,174,248,0.18)] px-3 py-1 text-xs font-medium text-[#5f2fac]">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
            {item.name}: {item.value}
          </div>
        ))}
      </div>
    </section>
  );
}
