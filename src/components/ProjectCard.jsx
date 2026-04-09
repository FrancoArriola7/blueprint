export function ProjectCard({ title, category, summary }) {
  return (
    <a
      href="#contact"
      className="group rounded-[2rem] border border-white/70 bg-white/85 p-7 shadow-[0_18px_60px_rgba(15,23,42,0.08)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_80px_rgba(15,23,42,0.12)]"
    >
      <div className="mb-10 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            {category}
          </p>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">{title}</h3>
        </div>
        <span className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500">
          Placeholder
        </span>
      </div>
      <p className="max-w-md text-base leading-7 text-slate-600">{summary}</p>
      <div className="mt-8 text-sm font-semibold text-slate-900">Replace with real case study →</div>
    </a>
  )
}
