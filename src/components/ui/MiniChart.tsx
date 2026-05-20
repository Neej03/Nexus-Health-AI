import React from 'react';

interface MiniChartProps {
  data: number[];
  color: string;
}

export function MiniChart({ data, color }: MiniChartProps) {
  if (!data.length) return null;
  const max = Math.max(...data, 1);
  const w = 200, h = 60;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * h}`).join(" ");
  
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      <polyline points={`0,${h} ${pts} ${w},${h}`} fill={color} fillOpacity="0.12" strokeWidth="0" />
    </svg>
  );
}
