import React from 'react';
import { useAppContext } from '../context/AppContext';
import { DISEASE_CONFIG, FIELD_CONFIG, CHAT_RESPONSES } from '../config/constants';
import { getThemeStyles } from '../styles/theme';
import { RiskGauge } from '../components/ui/RiskGauge';
import { FeatureBar } from '../components/ui/FeatureBar';
import { DiseaseType } from '../types';

export function PredictPage() {
  const { selectedDisease, setSelectedDisease, formData, setFormData, result, setResult, loading, handlePredict, darkMode } = useAppContext();
  const styles = getThemeStyles(darkMode);
  const config = DISEASE_CONFIG[selectedDisease];
  const { textMuted, surfaceAlt, border, text } = styles.colors;

  return (
    <div style={styles.section}>
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Disease Risk Predictor</h2>
        <p style={{ color: textMuted }}>Select a disease and fill in your medical parameters</p>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "2rem" }}>
        {(Object.keys(DISEASE_CONFIG) as DiseaseType[]).map((key) => {
          const c = DISEASE_CONFIG[key];
          const isSelected = key === selectedDisease;
          return (
            <button key={key} 
              style={{ 
                padding: "8px 16px", borderRadius: 20, 
                border: `2px solid ${isSelected ? c.color : border}`, 
                background: isSelected ? `${c.color}18` : "transparent", 
                color: isSelected ? c.color : textMuted, cursor: "pointer", 
                fontWeight: 600, fontSize: 13, transition: "all 0.2s" 
              }}
              onClick={() => { setSelectedDisease(key); setResult(null); setFormData({}); }}>
              {c.icon} {c.label}
            </button>
          );
        })}
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: result ? "repeat(auto-fit, minmax(min(100%, 350px), 1fr))" : "1fr", gap: "2rem" }}>
        <div style={styles.card}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${config.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{config.icon}</div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 2 }}>{config.label} Risk Analysis</h3>
              <p style={{ fontSize: 13, color: textMuted }}>Fill in your health parameters below</p>
            </div>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
            {config.features.map((field: string) => {
              const fc = FIELD_CONFIG[field];
              if (!fc) return null;
              return (
                <div key={field}>
                  <label style={styles.label}>{fc.label}{fc.unit ? ` (${fc.unit})` : ""}</label>
                  {fc.type === "select" ? (
                    <select style={styles.select} value={formData[field] || ""} onChange={e => setFormData(f => ({ ...f, [field]: e.target.value }))}>
                      <option value="">Select...</option>
                      {fc.options.map((o: string) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input style={styles.input} type="number" placeholder={fc.placeholder} min={fc.min} max={fc.max} step={fc.step || "1"}
                      value={formData[field] || ""}
                      onChange={e => setFormData(f => ({ ...f, [field]: e.target.value }))} />
                  )}
                </div>
              );
            })}
          </div>
          
          <button style={{ ...styles.btn("lg"), width: "100%", opacity: loading ? 0.7 : 1 }} onClick={handlePredict} disabled={loading}>
            {loading ? "🔄 Analyzing with AI..." : "🔬 Run AI Prediction"}
          </button>
          
          {loading && (
            <div style={{ marginTop: 16 }}>
              <div style={{ height: 4, background: `${border}`, borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", background: "linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)", borderRadius: 2, animation: "progress 1.8s ease-in-out", width: "100%" }} />
              </div>
              <style>{`@keyframes progress{0%{transform:translateX(-100%)}100%{transform:translateX(0)}}`}</style>
              <p style={{ fontSize: 13, color: textMuted, textAlign: "center", marginTop: 8 }}>Processing biomarkers through ML ensemble...</p>
            </div>
          )}
        </div>

        {result && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ ...styles.card, borderTopWidth: 3, borderTopColor: config.color, textAlign: "center" }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Risk Assessment Result</h3>
              <RiskGauge value={result.probability} color={config.color} />
              <div style={{ marginTop: 12, marginBottom: 16 }}>
                <span style={styles.riskBadge(result.risk)}>{result.risk === "High" ? "⚠️" : result.risk === "Moderate" ? "⚡" : "✅"} {result.risk} Risk</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12 }}>
                <div style={{ background: surfaceAlt, borderRadius: 10, padding: "12px" }}>
                  <div style={{ fontSize: 11, color: textMuted, textTransform: "uppercase", fontWeight: 600 }}>Probability</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: config.color }}>{Math.round(result.probability)}%</div>
                </div>
                <div style={{ background: surfaceAlt, borderRadius: 10, padding: "12px" }}>
                  <div style={{ fontSize: 11, color: textMuted, textTransform: "uppercase", fontWeight: 600 }}>Confidence</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#6366f1" }}>{Math.round(result.confidence)}%</div>
                </div>
              </div>
            </div>
            
            <div style={styles.card}>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Top Risk Factors</h4>
              {result.features.map(f => <FeatureBar key={f.name} name={f.name} importance={f.importance} color={config.color} />)}
            </div>
            
            <div style={{ ...styles.card, background: result.risk === "High" ? "#fff1f2" : result.risk === "Moderate" ? "#fffbeb" : "#f0fdf4", borderColor: result.risk === "High" ? "#fca5a5" : result.risk === "Moderate" ? "#fcd34d" : "#86efac" }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10, color: "#111827" }}>💊 Key Recommendations</h4>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.8, color: "#111827" }}>
                {CHAT_RESPONSES[selectedDisease].split("(").filter((_, i) => i > 0).slice(0, 4).map((r, i) => (
                  <li key={i}>{r.split(")")[0].trim()}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
