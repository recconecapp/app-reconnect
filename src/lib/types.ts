// Tipos do Reconnect

export type UserMode = 'single' | 'couple';

export type EmotionalState = 
  | 'calm' 
  | 'anxious' 
  | 'sad' 
  | 'angry' 
  | 'confused' 
  | 'hopeful'
  | 'overwhelmed'
  | 'peaceful';

export interface User {
  id: string;
  name: string;
  mode: UserMode;
  createdAt: Date;
}

export interface DiaryEntry {
  id: string;
  userId: string;
  content: string;
  emotionalState: EmotionalState;
  aiInsights: string;
  patterns?: string[];
  triggers?: string[];
  createdAt: Date;
}

export interface CheckIn {
  id: string;
  userId: string;
  mood: EmotionalState;
  recommendation: string;
  createdAt: Date;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: 'single' | 'couple' | 'both';
  completed: boolean;
}

export interface AudioLibrary {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: 'confidence' | 'anxiety' | 'jealousy' | 'clarity' | 'reconnection';
  url: string;
}

export interface SOSSession {
  id: string;
  userId: string;
  mode: UserMode;
  crisis: string;
  guidance: string;
  breathingExercise?: boolean;
  createdAt: Date;
}

export interface RadarAnalysis {
  emotionalState: EmotionalState;
  patterns: string[];
  triggers: string[];
  hiddenFears: string[];
  practicalGuidance: string;
  immediateActions: string[];
}
