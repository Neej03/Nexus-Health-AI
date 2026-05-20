import React from 'react';
import { useAppContext } from '../context/AppContext';
import { DISEASE_CONFIG } from '../config/constants';
import { getThemeStyles } from '../styles/theme';
import { MiniChart } from '../components/ui/MiniChart';
import { DiseaseType, HistoryItem } from '../types';

export function DashboardPage() {
  const { history, setPage, darkMode } = useAppContext();
  const styles = getThemeStyles(darkMode);
  const { textMuted, surfaceAlt, border } = styles.colors;

  const historyByDisease = Object.keys(DISEASE_CONFIG).map(d => {
    const dHistory = history.filter(h => h.disease === d);
    return {
      disease: d,
      count: dHistory.length,
      lastRisk: dHistory[0]?.risk || null,
      avgProb: dHistory.length
        ? Math.round(dHistory.reduce((s, h) => s + h.probability, 0) / dHistory.length)
        : 0,
      trend: dHistory.slice(0, 5).map(h => h.probability).reverse(),
    };
  });

  return (
    <div style={styles.section}>
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Health Analytics Dashboard</h2>
        <p style={{ color: textMuted }}>Monitor your health risk trends and prediction history</p>
      </div>
      
      <div style={styles.grid3}>
        {[
          { label: "Total Predictions", val: history.length, icon: "🔬", color: "#6366f1" },
          { label: "High Risk Alerts", val: history.filter(h => h.risk === "High").length, icon: "⚠️", color: "#e05252" },
          { label: "Health Score", val: history.length ? Math.max(0, 100 - Math.round(history.reduce((s, h) => s + h.probability, 0) / history.length)) : 85, icon: "💚", color: "#10b981" },
          { label: "Diseases Tracked", val: new Set(history.map(h => h.disease)).size, icon: "📊", color: "#8b5cf6" },
        ].map(m => (
          <div key={m.label} style={styles.card}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{m.icon}</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: m.color }}>{m.val}</div>
            <div style={{ fontSize: 13, color: textMuted, marginTop: 4 }}>{m.label}</div>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 350px), 1fr))", gap: "1.5rem" }}>
        <div style={styles.card}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: "1.5rem" }}>Disease Risk Overview</h3>
          {historyByDisease.map(d => (
            <div key={d.disease} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span>{DISEASE_CONFIG[d.disease].icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{DISEASE_CONFIG[d.disease].label}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {d.trend.length > 1 && <div style={{ width: 80 }}><MiniChart data={d.trend} color={DISEASE_CONFIG[d.disease].color} /></div>}
                  <span style={{ fontSize: 13, fontWeight: 700, color: DISEASE_CONFIG[d.disease].color }}>{d.avgProb}%</span>
                </div>
              </div>
              <div style={{ height: 8, background: `${border}`, borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${d.avgProb}%`, background: DISEASE_CONFIG[d.disease].color, borderRadius: 4, transition: "width 1s ease" }} />
              </div>
            </div>
          ))}
        </div>
        
        <div style={styles.card}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: "1.5rem" }}>Prediction History</h3>
          {history.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem", color: textMuted }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🔬</div>
              <p style={{ fontSize: 14 }}>No predictions yet. Start analyzing your health risk!</p>
              <button style={{ ...styles.btn(), marginTop: 12 }} onClick={() => setPage("predict")}>Make First Prediction</button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {history.slice(0, 6).map((h: HistoryItem) => (
                <div key={h.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: surfaceAlt, borderRadius: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 20 }}>{DISEASE_CONFIG[h.disease].icon}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{DISEASE_CONFIG[h.disease].label}</div>
                      <div style={{ fontSize: 11, color: textMuted }}>{h.date} · {h.time}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: DISEASE_CONFIG[h.disease].color }}>{Math.round(h.probability)}%</span>
                    <span style={styles.riskBadge(h.risk)}>{h.risk}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
