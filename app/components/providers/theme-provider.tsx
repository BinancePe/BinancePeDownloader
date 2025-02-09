import { createContext, useContext, useEffect, useState } from "react";

// Context for the theme
const ThemeContext = createContext({
  theme: "light",
  setTheme: (theme: string) => {},
});

export function ThemeProvider({
  children,
  initialTheme = "light",
}: {
  children: React.ReactNode;
  initialTheme?: string;
}) {
  const [theme, setTheme] = useState(initialTheme);

  // Update `document.documentElement` class for theme changes
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to use theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
