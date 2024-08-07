import { createContext } from "react";

export type ThemeContextType = "light" | "dark";

export const ThemeContext = createContext<ThemeContextType>("light");