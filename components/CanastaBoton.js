// BasketFloatingButton.js
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { navigate, navigationRef } from '../Navigation';

const CanastaBoton = () => {
  const { canasta } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    // Listener para cambios de navegación
    const unsubscribe = navigationRef.addListener('state', () => {
      const currentRoute = navigationRef.getCurrentRoute();
      if (currentRoute?.name === 'Canasta' || currentRoute?.name === 'Home' 
        ||currentRoute?.name === 'Turnos' || currentRoute?.name === 'Ajustes'
      ) {
        setIsVisible(false); // Ocultamos el botón cuando estamos en la pantalla 'Canasta'
      } else {
        setIsVisible(true); // Mostramos el botón cuando no estamos en la pantalla 'Canasta'
      }
    });

    return () => {
      // Limpiamos el listener al desmontar el componente
      unsubscribe();
    };
  }, []);

  if (!isVisible || canasta.length === 0) return null;

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigate('Home', { screen: 'Canasta' })}
    >
      <Text style={styles.text}>Ver canasta ({canasta.length})</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: 'tomato',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 150,
    zIndex: 100,
    elevation: 5,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CanastaBoton;
