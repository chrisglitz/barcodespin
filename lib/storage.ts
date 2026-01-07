import { Question, SEED_QUESTIONS } from './questions';

export interface SpinResult {
  questionId: string;
  timestamp: number;
}

export interface AppSettings {
  avoidRepeats: boolean;
}

export interface AppData {
  questions: Question[];
  usedQuestions: Set<string>;
  spinHistory: SpinResult[];
  settings: AppSettings;
}

const STORAGE_KEYS = {
  QUESTIONS: 'barcode-spin-questions',
  USED_QUESTIONS: 'barcode-spin-used',
  SPIN_HISTORY: 'barcode-spin-history',
  SETTINGS: 'barcode-spin-settings',
};

const DEFAULT_SETTINGS: AppSettings = {
  avoidRepeats: true,
};

// Type-safe localStorage helpers
function safeGetItem(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

export function getQuestions(): Question[] {
  const stored = safeGetItem(STORAGE_KEYS.QUESTIONS);
  if (!stored) {
    // Initialize with seed data
    saveQuestions(SEED_QUESTIONS);
    return SEED_QUESTIONS;
  }
  try {
    return JSON.parse(stored) as Question[];
  } catch {
    return SEED_QUESTIONS;
  }
}

export function saveQuestions(questions: Question[]): void {
  safeSetItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
}

export function getUsedQuestions(): Set<string> {
  const stored = safeGetItem(STORAGE_KEYS.USED_QUESTIONS);
  if (!stored) return new Set();
  try {
    const array = JSON.parse(stored) as string[];
    return new Set(array);
  } catch {
    return new Set();
  }
}

export function saveUsedQuestions(used: Set<string>): void {
  const array = Array.from(used);
  safeSetItem(STORAGE_KEYS.USED_QUESTIONS, JSON.stringify(array));
}

export function markQuestionAsUsed(questionId: string): void {
  const used = getUsedQuestions();
  used.add(questionId);
  saveUsedQuestions(used);
}

export function getSpinHistory(): SpinResult[] {
  const stored = safeGetItem(STORAGE_KEYS.SPIN_HISTORY);
  if (!stored) return [];
  try {
    return JSON.parse(stored) as SpinResult[];
  } catch {
    return [];
  }
}

export function saveSpinHistory(history: SpinResult[]): void {
  // Keep only last 25
  const trimmed = history.slice(-25);
  safeSetItem(STORAGE_KEYS.SPIN_HISTORY, JSON.stringify(trimmed));
}

export function addSpinResult(questionId: string): void {
  const history = getSpinHistory();
  history.push({ questionId, timestamp: Date.now() });
  saveSpinHistory(history);
}

export function getSettings(): AppSettings {
  const stored = safeGetItem(STORAGE_KEYS.SETTINGS);
  if (!stored) {
    saveSettings(DEFAULT_SETTINGS);
    return DEFAULT_SETTINGS;
  }
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: AppSettings): void {
  safeSetItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
}

export function resetAll(): void {
  saveUsedQuestions(new Set());
  saveSpinHistory([]);
  // Keep questions and settings
}

export function resetQuestions(): void {
  saveQuestions(SEED_QUESTIONS);
  saveUsedQuestions(new Set());
}
