import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { PredictPage } from './pages/PredictPage';
import { DashboardPage } from './pages/DashboardPage';
import { AssistantPage } from './pages/AssistantPage';
import { getThemeStyles } from './styles/theme';

function AppContent() {
  const { page, darkMode } = useAppContext();
  const styles = getThemeStyles(darkMode);

  return (
    <div style={styles.app}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
      <Navbar />
      {page === "landing" && <LandingPage />}
      {page === "predict" && <PredictPage />}
      {page === "dashboard" && <DashboardPage />}
      {page === "assistant" && <AssistantPage />}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
