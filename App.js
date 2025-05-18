import * as React from 'react';
import AuthContextProvider from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navigation from './Navigation';
import { NavigationContainer } from '@react-navigation/native';
import CanastaBoton from './components/CanastaBoton';
import { navigationRef } from './Navigation';
import { PaperProvider } from 'react-native-paper';


function App() {
  return (
  
    <ThemeProvider>
      <AuthContextProvider>
        <NavigationContainer ref={navigationRef}>
        <Navigation></Navigation>
        <CanastaBoton ></CanastaBoton>
        </NavigationContainer>
      </AuthContextProvider>
      </ThemeProvider>
    
  );
}
export default App;