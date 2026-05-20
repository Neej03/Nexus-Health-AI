import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { getThemeStyles } from '../styles/theme';
import { DISEASE_CONFIG } from '../config/constants';

export function AssistantPage() {
  const { chatMessages, chatInput, setChatInput, chatLoading, handleChat, result, selectedDisease, darkMode } = useAppContext();
  const styles = getThemeStyles(darkMode);
  const { textMuted, border } = styles.colors;
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  return (
    <div style={{ ...styles.section, maxWidth: 800 }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>AI Health Assistant</h2>
        <p style={{ color: textMuted }}>Ask our AI assistant about your health risks, medications, diet, or lifestyle advice</p>
      </div>
      
      <div style={{ ...styles.card, display: "flex", flexDirection: "column", height: 520 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, paddingBottom: "1rem", borderBottom: `1px solid ${border}`, marginBottom: "1rem" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🤖</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>MediAI Assistant</div>
            <div style={{ fontSize: 12, color: "#10b981", display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", display: "inline-block" }} /> Online · Powered by AI
            </div>
          </div>
          {result && <span style={{ marginLeft: "auto", ...styles.riskBadge(result.risk) }}>Active: {DISEASE_CONFIG[selectedDisease].label}</span>}
        </div>
        
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
          {chatMessages.map((msg, i) => (
            <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
              <div style={styles.chatBubble(msg.role)}>{msg.text}</div>
            </div>
          ))}
          {chatLoading && (
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div style={{ ...styles.chatBubble("assistant"), display: "flex", gap: 6, alignItems: "center" }}>
                {[0, 0.2, 0.4].map((d, i) => <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#6366f1", animation: `bounce 0.8s ${d}s ease-in-out infinite` }} />)}
                <style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}`}</style>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        
        <div style={{ paddingTop: "1rem", borderTop: `1px solid ${border}`, display: "flex", gap: 10 }}>
          <input style={{ ...styles.input, flex: 1 }} placeholder="Ask about your health, medications, diet, lifestyle..." value={chatInput}
            onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleChat()} />
          <button style={{ ...styles.btn(), padding: "10px 20px" }} onClick={handleChat} disabled={chatLoading}>Send</button>
        </div>
        
        <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["What should I eat?", "Explain my risk factors", "Exercise recommendations", "What tests should I take?"].map(q => (
            <button key={q} style={{ fontSize: 12, padding: "5px 12px", borderRadius: 20, border: `1px solid ${border}`, background: "transparent", color: textMuted, cursor: "pointer" }} onClick={() => setChatInput(q)}>{q}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
