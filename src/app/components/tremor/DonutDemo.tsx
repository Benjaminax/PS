import { DonutChart } from "@tremor/react";

const data = [
  { category: "Growth", value: 38 },
  { category: "Retention", value: 24 },
  { category: "Infrastructure", value: 16 },
  { category: "Developer Experience", value: 12 },
  { category: "Operations", value: 10 },
];

export default function DonutDemo() {
  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Research cluster</p>
          <h3 className="mt-1 text-base font-semibold text-slate-900">Pain point distribution</h3>
        </div>
        <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700">Tremor</span>
      </div>
      <DonutChart data={data} category="value" index="category" colors={["indigo", "sky", "emerald", "amber", "rose"]} className="h-56" />
    </div>
  );
}
