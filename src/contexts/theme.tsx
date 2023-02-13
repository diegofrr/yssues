import { createContext, ReactNode, useEffect, useState } from "react";
import { light } from "~/styles/themes/light";
import { dark } from "~/styles/themes/dark"
import { ThemeProvider } from "styled-components";
import { Theme } from "~/@types";

interface ContextProps {
  children: ReactNode
}

interface ProviderProps {
  theme: Theme,
  toggleTheme: () => void
}

export const ThemeContext = createContext({} as ProviderProps);

export default function CustomThemeProvider({ children }: ContextProps) {
  const [theme, setTheme] = useState<Theme>(light);

  useEffect(() => {
    const theme = localStorage.getItem("@theme");
    if (theme) setTheme(JSON.parse(theme));
  }, []);

  function toggleTheme(): void {
    const _theme = theme.name === "light" ? dark : light;
    setTheme(_theme);
    localStorage.setItem("@theme", JSON.stringify(_theme));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}
