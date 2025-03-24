import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const Bienvenida = () => {
  const [busqueda, setBusqueda] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a la Farmacia!</Text>
      <Text style={styles.subtitle}>Consulta medicamentos y gestiona tus turnos fácilmente.</Text>
      
      <View style={styles.searchContainer}> //barra de busqueda//
        <TextInput
          style={styles.searchBar}
          placeholder="🔍 Buscar medicamento..."
          placeholderTextColor="#B0B0B0"
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>

      <TouchableOpacity style={styles.button}>   // boton seleccionar el tipo de EPS //
        <Text style={styles.buttonText}>Tipo de EPS</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.consultButton]}> //*boton de consultar*//
        <Text style={styles.buttonText}>Consultar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  searchContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
  },
  searchBar: {
    height: 45,
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    backgroundColor: '#3498db',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
  },
  consultButton: {
    backgroundColor: '#2ecc71', // color del boton consultar //
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Bienvenida;
