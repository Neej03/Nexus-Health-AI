import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { getThemeStyles } from '../../styles/theme';

export function Navbar() {
  const { page, setPage, darkMode, setDarkMode } = useAppContext();
  const styles = getThemeStyles(darkMode);
  
  return (
    <nav style={styles.nav}>
      <div role="button" tabIndex={0} onKeyDown={e => e.key==="Enter"&&setPage("landing")} style={styles.navBrand} onClick={() => setPage("landing")}>
        ⚕️ NexusHealth AI
      </div>
      <div style={styles.navLinks}>
        {(Object.entries({
          landing: "Home",
          predict: "Predict",
          dashboard: "Dashboard",
          assistant: "AI Assistant"
        }) as [any, string][]).map(([p, l]) => (
          <button key={p} style={styles.navLink(page === p)} onClick={() => setPage(p)}>{l}</button>
        ))}
      </div>
      <button style={{ padding: "8px 14px", borderRadius: 10, border: `1px solid ${styles.colors.border}`, background: "transparent", cursor: "pointer", fontSize: 18 }} onClick={() => setDarkMode(d => !d)}>
        {darkMode ? "☀️" : "🌙"}
      </button>
    </nav>
  );
}
