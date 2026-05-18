function parseSuggestion(raw) {
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function Detail({ label, value }) {
  if (!value) return null;

  return (
    <div className="rounded-2xl bg-white/80 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">{label}</p>
      <p className="mt-2 text-sm leading-6 text-slate-700 whitespace-pre-wrap">{value}</p>
    </div>
  );
}

export default function AISummaryCard({ title, subtitle, symptoms, rawResponse, riskLevel }) {
  const parsed = parseSuggestion(rawResponse);
  const condition = parsed?.condition || parsed?.possibleCondition || parsed?.possible_condition;
  const tests = parsed?.tests || parsed?.suggestedTests || parsed?.suggested_tests;
  const advice = parsed?.advice || parsed?.lifestyleAdvice || parsed?.lifestyle_advice;
  const parsedRisk = parsed?.riskLevel || parsed?.risk_level || riskLevel;

  return (
    <article className="medical-panel rounded-[24px] p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          {subtitle ? <p className="mt-1 text-sm text-slate-600">{subtitle}</p> : null}
        </div>
        {parsedRisk ? (
          <span className="medical-badge bg-[var(--primary-lighter)]/50 text-[var(--primary)]">
            {String(parsedRisk).replace(/_/g, " ")} risk
          </span>
        ) : null}
      </div>

      {symptoms ? (
        <div className="mt-4 rounded-2xl bg-[var(--primary-lighter)]/30 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">Symptoms</p>
          <p className="mt-2 text-sm leading-6 text-slate-700 whitespace-pre-wrap">{symptoms}</p>
        </div>
      ) : null}

      {parsed ? (
        <div className="mt-4 grid gap-3">
          <Detail label="Possible Condition" value={condition} />
          <Detail label="Suggested Tests" value={tests} />
          <Detail label="Lifestyle Advice" value={advice} />
        </div>
      ) : (
        <div className="mt-4 rounded-2xl bg-white/80 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">AI Suggestion</p>
          <p className="mt-2 text-sm leading-6 text-slate-700 whitespace-pre-wrap">
            {rawResponse || "No AI suggestion saved."}
          </p>
        </div>
      )}
    </article>
  );
}