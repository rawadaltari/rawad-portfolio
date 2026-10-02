import { createContext } from 'react';
import type { Theme } from '@/types';

export interface ThemeContextValue {
  theme: Theme;
  /** Toggle theme; optional origin (viewport px) powers the circular reveal transition. */
  toggleTheme: (origin?: { x: number; y: number }) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
export const THEME_STORAGE_KEY = 'ra-theme';
