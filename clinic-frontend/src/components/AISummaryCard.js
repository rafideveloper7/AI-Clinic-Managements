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
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8447ff]">{label}</p>
      <p className="mt-2 text-sm leading-6 text-[#47335f] whitespace-pre-wrap">{value}</p>
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
          <h3 className="text-lg font-semibold text-[#2e2143]">{title}</h3>
          {subtitle ? <p className="mt-1 text-sm text-[#7a688f]">{subtitle}</p> : null}
        </div>
        {parsedRisk ? (
          <span className="medical-badge bg-[rgba(114,221,247,0.18)] text-[#5c2db8]">
            {String(parsedRisk).replace(/_/g, " ")} risk
          </span>
        ) : null}
      </div>

      {symptoms ? (
        <div className="mt-4 rounded-2xl bg-[rgba(255,178,230,0.16)] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a52ff]">Symptoms</p>
          <p className="mt-2 text-sm leading-6 text-[#4a3b5f] whitespace-pre-wrap">{symptoms}</p>
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
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8447ff]">AI Suggestion</p>
          <p className="mt-2 text-sm leading-6 text-[#47335f] whitespace-pre-wrap">
            {rawResponse || "No AI suggestion saved."}
          </p>
        </div>
      )}
    </article>
  );
}
