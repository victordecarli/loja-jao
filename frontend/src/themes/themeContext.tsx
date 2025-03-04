// src/theme/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'default' | 'lol' | 'stardewValley';

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: 'default',
  setTheme: () => {}
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('default');

  useEffect(() => {
    // Define o atributo "data-theme" no elemento raiz para aplicar os estilos do tema
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
