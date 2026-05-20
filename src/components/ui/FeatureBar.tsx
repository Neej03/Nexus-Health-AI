import React from 'react';

interface FeatureBarProps {
  key?: React.Key;
  name: string;
  importance: number;
  color: string;
}

export function FeatureBar({ name, importance, color }: FeatureBarProps) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4, color: "#6b7280" }}>
        <span>{name}</span>
        <span style={{ fontWeight: 600, color }}>{Math.round(importance)}%</span>
      </div>
      <div style={{ height: 6, background: "#f3f4f6", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${importance}%`, background: color, borderRadius: 3, transition: "width 1s ease" }} />
      </div>
    </div>
  );
}
