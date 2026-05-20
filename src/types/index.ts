export type DiseaseType = "heart" | "diabetes" | "kidney" | "liver" | "stroke" | "hypertension";

export interface PredictionResult {
  probability: number;
  confidence: number;
  risk: string;
  features: Array<{ name: string; importance: number; value: any }>;
}

export interface HistoryItem {
  id: number;
  disease: DiseaseType;
  risk: string;
  probability: number;
  date: string;
  time: string;
}

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  text: string;
}
