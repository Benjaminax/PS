Tremor Integration Guide

Overview

This project uses React + Vite + Tailwind. Tremor (tremor.so) provides production-ready dashboard components built for React + Tailwind.

1) Install

Run in your project root:

```bash
npm install @tremor/react
# or
pnpm add @tremor/react
```

2) Tailwind

Tremor expects Tailwind v4. This project already uses Tailwind v4 per package.json. No additional setup required, but ensure `tailwind.config.js` exposes the project files.

3) Example: Donut Chart (copy/paste)

Create a demo component (e.g., `src/app/components/tremor/DonutDemo.tsx`) and paste the example below:

```tsx
import React from 'react'
import { DonutChart } from '@tremor/react'

const data = [
  { name: 'Product A', sales: 450 },
  { name: 'Product B', sales: 300 },
  { name: 'Product C', sales: 150 },
]

export default function DonutDemo() {
  return (
    <div className="p-4 rounded-xl bg-white/90 border border-slate-200">
      <DonutChart data={data} category="name" value="sales" className="w-48 h-48" />
    </div>
  )
}
```

4) Example: Area Chart (copy/paste)

```tsx
import React from 'react'
import { AreaChart } from '@tremor/react'

const series = [
  { date: '2026-08-01', value: 400 },
  { date: '2026-08-02', value: 520 },
  { date: '2026-08-03', value: 610 },
  { date: '2026-08-04', value: 720 },
]

export default function AreaDemo() {
  return (
    <div className="p-4 rounded-xl bg-white/90 border border-slate-200">
      <AreaChart
        data={series}
        index="date"
        categories={["value"]}
        colors={["blue"]}
        className="h-48"
      />
    </div>
  )
}
```

5) How to use in your screens

Import the demo component and render it in any screen (Overview, PipelineAnalytics, etc.):

```tsx
import DonutDemo from '../components/tremor/DonutDemo'

// inside JSX
<DonutDemo />
```

6) Notes & Fallbacks

- If you prefer not to install Tremor, use the existing `recharts` components already in the repo. Tremor components are wrappers and conveniences around Recharts + utilities.
- After installing, run the dev server: `npm run dev` and verify the components render.

If you want, I can: 
- create the demo components in this repo and wire one into `Overview.tsx` now, or
- install the package in the workspace (runs `npm install`) and add the demo components for immediate testing.

Which would you prefer?