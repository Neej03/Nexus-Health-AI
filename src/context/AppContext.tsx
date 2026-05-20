import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DiseaseType, HistoryItem, ChatMessage, PredictionResult } from '../types';
import { simulatePrediction } from '../utils/predictions';
import { DISEASE_CONFIG } from '../config/constants';

interface AppState {
  page: "landing" | "predict" | "dashboard" | "assistant";
  setPage: (page: "landing" | "predict" | "dashboard" | "assistant") => void;
  selectedDisease: DiseaseType;
  setSelectedDisease: (disease: DiseaseType) => void;
  formData: Record<string, any>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  result: PredictionResult | null;
  setResult: (result: PredictionResult | null) => void;
  loading: boolean;
  history: HistoryItem[];
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  chatInput: string;
  setChatInput: (input: string) => void;
  chatLoading: boolean;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  handlePredict: () => void;
  handleChat: () => Promise<void>;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<"landing" | "predict" | "dashboard" | "assistant">("landing");
  const [selectedDisease, setSelectedDisease] = useState<DiseaseType>("heart");
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: "assistant", text: "Hello! I'm your AI health assistant. Select a disease prediction above, then ask me anything about your health results or risk factors." }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handlePredict = () => {
    setLoading(true);
    setTimeout(() => {
      const res = simulatePrediction(selectedDisease, formData);
      setResult(res);
      setHistory(h => [{
        id: Date.now(),
        disease: selectedDisease,
        risk: res.risk,
        probability: res.probability,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }, ...h.slice(0, 9)]);
      setLoading(false);
    }, 1800);
  };

  const handleChat = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatInput("");
    setChatMessages(m => [...m, { role: "user", text: userMsg }]);
    setChatLoading(true);
    try {
      const systemPrompt = `You are an expert AI medical assistant specializing in disease risk prediction and preventive healthcare. The user is asking about health-related topics. Be concise, empathetic, and evidence-based. If a prediction result is available, factor it in. Current selected disease: ${DISEASE_CONFIG[selectedDisease].label}. ${result ? `Current risk result: ${result.risk} risk at ${Math.round(result.probability)}% probability.` : ""}`;
      
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt,
          messages: [
            ...chatMessages.filter(m => m.role !== "system").slice(-6).map(m => ({ role: m.role, content: m.text })),
            { role: "user", content: userMsg }
          ],
        }),
      });
      const data = await response.json();
      const reply = data.reply || data.error || "I apologize, I couldn't process that. Please try again.";
      setChatMessages(m => [...m, { role: "assistant", text: reply }]);
    } catch {
      setChatMessages(m => [...m, { role: "assistant", text: "I'm having trouble connecting. Please try again in a moment." }]);
    }
    setChatLoading(false);
  };

  return (
    <AppContext.Provider value={{
      page, setPage,
      selectedDisease, setSelectedDisease,
      formData, setFormData,
      result, setResult,
      loading, history,
      chatMessages, setChatMessages,
      chatInput, setChatInput,
      chatLoading,
      darkMode, setDarkMode,
      handlePredict, handleChat
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
