import React from 'react';

export const getThemeStyles = (darkMode: boolean) => {
  const bg = darkMode ? "#0f172a" : "#f8fafc";
  const surface = darkMode ? "#1e293b" : "#ffffff";
  const surfaceAlt = darkMode ? "#0f172a" : "#f1f5f9";
  const border = darkMode ? "#334155" : "#e2e8f0";
  const text = darkMode ? "#f1f5f9" : "#0f172a";
  const textMuted = darkMode ? "#94a3b8" : "#64748b";
  const cardBg = darkMode ? "#1e293b" : "#ffffff";

  return {
    colors: { bg, surface, surfaceAlt, border, text, textMuted, cardBg },
    app: { minHeight: "100vh", background: bg, color: text, fontFamily: "'Sora', sans-serif", transition: "background 0.3s, color 0.3s" } as React.CSSProperties,
    nav: { position: "sticky" as const, top: 0, zIndex: 100, background: darkMode ? "rgba(15,23,42,0.95)" : "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${border}`, padding: "0.5rem 1rem", display: "flex", flexWrap: "wrap" as const, alignItems: "center", justifyContent: "space-between", minHeight: 64, gap: "1rem" } as React.CSSProperties,
    navBrand: { fontSize: 20, fontWeight: 800, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", cursor: "pointer" } as React.CSSProperties,
    navLinks: { display: "flex", gap: 8, flexWrap: "wrap" as const, alignItems: "center" } as React.CSSProperties,
    navLink: (active: boolean): React.CSSProperties => ({ padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 14, fontWeight: active ? 600 : 400, background: active ? (darkMode ? "#312e81" : "#eef2ff") : "transparent", color: active ? "#6366f1" : textMuted, transition: "all 0.2s" }),
    card: { background: cardBg, borderWidth: 1, borderStyle: "solid", borderColor: border, borderRadius: 16, padding: "1.5rem", boxShadow: darkMode ? "0 4px 24px rgba(0,0,0,0.3)" : "0 2px 12px rgba(0,0,0,0.06)" } as React.CSSProperties,
    hero: { background: darkMode ? "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)" : "linear-gradient(135deg, #f0f4ff 0%, #faf5ff 50%, #ecfeff 100%)", padding: "6rem 2rem 4rem", textAlign: "center" as const, position: "relative" as const, overflow: "hidden" as const },
    heroTitle: { fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "1.5rem", background: "linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" } as React.CSSProperties,
    btn: (variant = "primary"): React.CSSProperties => ({
      padding: variant === "lg" ? "14px 32px" : "10px 20px",
      borderRadius: variant === "lg" ? 12 : 10,
      border: variant === "outline" ? "2px solid #6366f1" : "none",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: variant === "lg" ? 16 : 14,
      background: variant === "outline" ? "transparent" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
      color: variant === "outline" ? "#6366f1" : "#fff",
      transition: "all 0.2s",
    }),
    input: { width: "100%", padding: "10px 14px", borderRadius: 10, border: `1.5px solid ${border}`, background: darkMode ? "#0f172a" : "#f8fafc", color: text, fontSize: 14, outline: "none", boxSizing: "border-box" as const, fontFamily: "inherit" },
    select: { width: "100%", padding: "10px 14px", borderRadius: 10, border: `1.5px solid ${border}`, background: darkMode ? "#0f172a" : "#f8fafc", color: text, fontSize: 14, outline: "none", boxSizing: "border-box" as const, fontFamily: "inherit", cursor: "pointer" },
    label: { fontSize: 12, fontWeight: 600, color: textMuted, display: "block", marginBottom: 6, textTransform: "uppercase" as const, letterSpacing: "0.05em" },
    section: { maxWidth: 1200, margin: "0 auto", padding: "3rem 2rem" } as React.CSSProperties,
    grid2: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" } as React.CSSProperties,
    grid3: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" } as React.CSSProperties,
    riskBadge: (risk: string): React.CSSProperties => ({
      display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 700,
      background: risk === "High" ? "#fee2e2" : risk === "Moderate" ? "#fef3c7" : "#dcfce7",
      color: risk === "High" ? "#b91c1c" : risk === "Moderate" ? "#92400e" : "#166534",
    }),
    chatBubble: (role: string): React.CSSProperties => ({
      maxWidth: "85%", padding: "12px 16px", borderRadius: role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
      background: role === "user" ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : (darkMode ? "#1e293b" : "#f1f5f9"),
      color: role === "user" ? "#fff" : text, fontSize: 14, lineHeight: 1.6, alignSelf: role === "user" ? "flex-end" : "flex-start",
      border: role !== "user" ? `1px solid ${border}` : "none",
    }),
  };
};
