import { AreaChart } from "@tremor/react";

const data = [
  { date: "Aug 01", value: 22 },
  { date: "Aug 02", value: 29 },
  { date: "Aug 03", value: 35 },
  { date: "Aug 04", value: 28 },
  { date: "Aug 05", value: 44 },
  { date: "Aug 06", value: 51 },
  { date: "Aug 07", value: 58 },
];

export default function AreaDemo() {
  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Signal capture</p>
          <h3 className="mt-1 text-base font-semibold text-slate-900">Weekly intent volume</h3>
        </div>
        <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700">Tremor</span>
      </div>
      <AreaChart data={data} index="date" categories={["value"]} colors={["blue"]} className="h-56" />
    </div>
  );
}
