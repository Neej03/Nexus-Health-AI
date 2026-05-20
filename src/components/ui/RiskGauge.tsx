import React from 'react';

interface RiskGaugeProps {
  value: number;
  color: string;
}

export function RiskGauge({ value, color }: RiskGaugeProps) {
  const angle = (value / 100) * 180 - 90;
  const r = 70;
  const cx = 90, cy = 90;
  
  const toRad = (d: number) => (d * Math.PI) / 180;
  const arcX = (deg: number) => cx + r * Math.cos(toRad(deg - 90));
  const arcY = (deg: number) => cy + r * Math.sin(toRad(deg - 90));
  
  const arcD = `M ${arcX(-90)} ${arcY(-90)} A ${r} ${r} 0 0 1 ${arcX(90)} ${arcY(90)}`;
  const fillD = `M ${arcX(-90)} ${arcY(-90)} A ${r} ${r} 0 ${value > 50 ? 1 : 0} 1 ${arcX(angle)} ${arcY(angle)}`;
  const needleX = cx + (r - 15) * Math.cos(toRad(angle - 90));
  const needleY = cy + (r - 15) * Math.sin(toRad(angle - 90));
  
  return (
    <svg viewBox="0 0 180 100" width="180" height="100">
      <path d={arcD} fill="none" stroke="#e5e7eb" strokeWidth="12" strokeLinecap="round" />
      <path d={fillD} fill="none" stroke={color} strokeWidth="12" strokeLinecap="round" opacity="0.9" />
      <line x1={cx} y1={cy} x2={needleX} y2={needleY} stroke="#374151" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="5" fill="#374151" />
      <text x={cx} y={cy + 18} textAnchor="middle" fontSize="14" fontWeight="700" fill={color}>
        {Math.round(value)}%
      </text>
    </svg>
  );
}
