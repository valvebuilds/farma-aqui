import React, { createContext, useContext, useState } from 'react';
import { Appearance } from 'react-native';

const lightTheme = {
  colors: {
    background: '#FFFFFF',
    text: '#000000',
    primary: '#28BC63',
    card: '#F5F5F5'
  }
};

const darkTheme = {
  colors: {
    background: '#121212',
    text: '#FFFFFF',
    primary: '#28BC63',
    card: '#1E1E1E'
  }
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemPref = Appearance.getColorScheme();
  const [modoOscuro, setModoOscuro] = useState(systemPref === 'dark');

  const toggleTheme = () => setModoOscuro(prev => !prev);

  const theme = modoOscuro ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ modoOscuro, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme debe usarse dentro de ThemeProvider');
  return context;
};
