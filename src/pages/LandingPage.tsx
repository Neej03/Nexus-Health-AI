import React from 'react';
import { useAppContext } from '../context/AppContext';
import { DISEASE_CONFIG } from '../config/constants';
import { getThemeStyles } from '../styles/theme';
import { DiseaseType } from '../types';

export function LandingPage() {
  const { setPage, setSelectedDisease, darkMode } = useAppContext();
  const styles = getThemeStyles(darkMode);
  const textMuted = styles.colors.textMuted;

  return (
    <div>
      <div style={styles.hero}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ position: "absolute", borderRadius: "50%", background: `radial-gradient(circle, ${["#6366f1","#8b5cf6","#ec4899","#06b6d4","#10b981","#f59e0b"][i]}22 0%, transparent 70%)`, width: `${200 + i * 80}px`, height: `${200 + i * 80}px`, left: `${[10,60,30,70,5,80][i]}%`, top: `${[20,10,60,50,80,30][i]}%`, transform: "translate(-50%,-50%)", animation: `pulse ${3 + i}s ease-in-out infinite alternate` }} />
          ))}
        </div>
        <style>{`@keyframes pulse{0%{transform:translate(-50%,-50%) scale(1)}100%{transform:translate(-50%,-50%) scale(1.2)}}`}</style>
        <div style={{ position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: darkMode ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 20, padding: "6px 16px", fontSize: 13, color: "#6366f1", fontWeight: 600, marginBottom: "1.5rem" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#6366f1", animation: "pulse 1.5s ease-in-out infinite" }} />
            AI-Powered Health Risk Analysis
          </div>
          <h1 style={styles.heroTitle}>Predict Your Health Risks<br />Before They Happen</h1>
          <p style={{ fontSize: 18, color: textMuted, maxWidth: 600, margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
            Advanced machine learning models analyze 50+ biomarkers to predict risks for 6 critical diseases with clinical-grade accuracy.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button style={styles.btn("lg")} onClick={() => setPage("predict")}>Start Free Analysis →</button>
            <button style={styles.btn("outline")} onClick={() => setPage("dashboard")}>View Dashboard</button>
          </div>
          <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: "3rem", flexWrap: "wrap" }}>
            {[["6", "Diseases Detected"], ["98.3%", "Model Accuracy"], ["50+", "Biomarkers Analyzed"], ["<2s", "Prediction Time"]].map(([val, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 900, background: "linear-gradient(135deg, #6366f1, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{val}</div>
                <div style={{ fontSize: 13, color: textMuted }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>6 Disease Risk Predictions</h2>
          <p style={{ color: textMuted, fontSize: 16 }}>Powered by ensemble ML models trained on clinical datasets</p>
        </div>
        <div style={styles.grid3}>
          {Object.entries(DISEASE_CONFIG).map(([key, config]) => (
            <div key={key} style={{ ...styles.card, cursor: "pointer", borderTopWidth: 3, borderTopColor: config.color, transition: "transform 0.2s, box-shadow 0.2s" }}
              onClick={() => { setSelectedDisease(key as DiseaseType); setPage("predict"); }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 32px ${config.color}33`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = styles.card?.boxShadow as string; }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{config.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{config.label}</h3>
              <p style={{ fontSize: 13, color: textMuted, lineHeight: 1.6 }}>
                Analyze {config.features.length} key biomarkers using Random Forest & XGBoost ensemble
              </p>
              <div style={{ marginTop: 16, fontSize: 12, fontWeight: 600, color: config.color }}>Analyze Risk →</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: darkMode ? "#1e1b4b" : "#f0f4ff", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, textAlign: "center", marginBottom: "3rem" }}>How It Works</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem" }}>
            {[
              { step: "01", title: "Enter Medical Data", desc: "Input your health vitals, lab results, and lifestyle factors", icon: "📋" },
              { step: "02", title: "AI Analysis", desc: "Our ensemble ML models process 50+ biomarkers instantly", icon: "🤖" },
              { step: "03", title: "Risk Assessment", desc: "Get probability scores with confidence intervals", icon: "📊" },
              { step: "04", title: "Personalized Insights", desc: "Receive actionable recommendations from our AI assistant", icon: "💡" },
            ].map(item => (
              <div key={item.step} style={{ textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 1rem" }}>{item.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#6366f1", marginBottom: 8 }}>STEP {item.step}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: textMuted, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
