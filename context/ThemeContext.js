import React, { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../themes/themes';

const ThemeContext = createContext(lightTheme);

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme(); // 'light' o 'dark'
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
