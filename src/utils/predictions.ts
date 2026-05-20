import { DISEASE_CONFIG, FIELD_CONFIG } from '../config/constants';
import { PredictionResult } from '../types';

export function simulatePrediction(disease: string, formData: any): PredictionResult {
  const config = DISEASE_CONFIG[disease];
  let baseScore = Math.random() * 40 + 10;
  if (formData.age && parseInt(formData.age) > 55) baseScore += 15;
  if (formData.bmi && parseFloat(formData.bmi) > 30) baseScore += 10;
  if (formData.smoking === "Current" || formData.smokingStatus === "Smokes") baseScore += 12;
  if (formData.glucose && parseInt(formData.glucose) > 140) baseScore += 18;
  if (formData.cholesterol && parseInt(formData.cholesterol) > 240) baseScore += 10;
  if (formData.bloodPressure && parseInt(formData.bloodPressure) > 90) baseScore += 8;
  if (formData.familyHistory === "Yes") baseScore += 10;
  
  baseScore = Math.min(95, Math.max(3, baseScore));
  const risk = baseScore > config.thresholds.medium ? "High" : baseScore > config.thresholds.low ? "Moderate" : "Low";
  
  const features = config.features.map((f: string) => ({
    name: FIELD_CONFIG[f]?.label || f,
    importance: Math.random() * 0.3 + 0.05,
    value: formData[f] || "N/A",
  })).sort((a: any, b: any) => b.importance - a.importance).slice(0, 5);
  
  const total = features.reduce((s: number, f: any) => s + f.importance, 0);
  features.forEach((f: any) => f.importance = (f.importance / total) * 100);
  
  return { probability: baseScore, confidence: 78 + Math.random() * 18, risk, features };
}
