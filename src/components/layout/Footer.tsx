import React from 'react';
import { useAppContext } from '../../context/AppContext';

export function Footer() {
  const { darkMode } = useAppContext();
  
  return (
    <footer style={{ background: darkMode ? "#0f172a" : "#1e293b", color: "#94a3b8", padding: "2rem", textAlign: "center", fontSize: 13, marginTop: "auto" }}>
      <div style={{ fontWeight: 700, color: "#f1f5f9", marginBottom: 8 }}>⚕️ NexusHealth AI Risk Predictor</div>
      <p>⚠️ For informational purposes only. Not a substitute for professional medical advice.</p>
      <p style={{ marginTop: 8 }}>© 2025 NexusHealth AI · Privacy Policy · Terms of Service</p>
    </footer>
  );
}
