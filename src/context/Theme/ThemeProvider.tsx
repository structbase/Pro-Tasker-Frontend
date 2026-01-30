import { useState, useEffect } from "react";
import type { ReactNode } from "react";

import { ThemeContext } from "./ThemeContext";
import type { Theme } from "../../types/theme-state";

interface ThemeProviderProps {
    children: ReactNode;
}

const isTheme = (value: string | null): value is Theme =>
    value === "light" || value === "dark";

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem("theme");
        return isTheme(savedTheme) ? savedTheme : "light";
    });

    useEffect(() => {
        const root = document.documentElement;

        if (theme === "light") {
            root.style.setProperty("--bg", "hsl(0, 0%, 98%)");
            root.style.setProperty("--element", "hsl(0, 0%, 100%)");
            root.style.setProperty("--text", "hsl(200, 15%, 8%)");
            root.style.setProperty("--input", "hsl(0, 0%, 52%)");
        } else {
            root.style.setProperty("--bg", "hsl(207, 26%, 17%)");
            root.style.setProperty("--element", "hsl(209, 23%, 22%)");
            root.style.setProperty("--text", "hsl(0, 0%, 100%)");
            root.style.setProperty("--input", "hsl(0, 0%, 100%)");
        }

        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
