import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

import AuthContextProvider from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navigation from './Navigation';
import { navigationRef } from './Navigation';
import CanastaBoton from './components/CanastaBoton';

// Configura el comportamiento de las notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function AppContent() {
  const { modoOscuro } = useTheme();
  const [expoPushToken, setExpoPushToken] = useState('');

  const navTheme = modoOscuro ? DarkTheme : DefaultTheme;

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      if (token) {
        setExpoPushToken(token);
        console.log("Token de notificaciones:", token);
      }
    });

    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log("Notificación recibida:", notification);
    });

    return () => subscription.remove();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef} theme={navTheme}>
        <Navigation />
        <CanastaBoton />
      </NavigationContainer>
    </View>
  );
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert('Permisos denegados', 'No se otorgaron permisos para notificaciones push');
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    Alert.alert('Solo funciona en dispositivo físico', 'Debes usar un dispositivo real para recibir notificaciones.');
  }

  return token;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthContextProvider>
        <PaperProvider>
          <AppContent />
        </PaperProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
