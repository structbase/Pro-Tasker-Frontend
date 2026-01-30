import { createContext } from "react";
import type { ThemeContextValue } from "../../types/theme-state";

export const ThemeContext = createContext<ThemeContextValue | null>(null);

