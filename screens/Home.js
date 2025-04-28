import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button, SafeAreaView } from "react-native";
import Feed from './FeedMedicamentos';
import { useTheme } from '../context/ThemeContext';

const Home = ({ navigation }) => {
  const [busqueda, setBusqueda] = useState('');
  const { colors, fonts } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={[styles.container, {backgroundColor:colors.background}]}>
      <Text style={styles.title}>¡Bienvenido a PharmAquí!</Text>
      <Text style={styles.subtitle}>Consulta medicamentos y gestiona tus turnos fácilmente.</Text>
      
      <View style={styles.searchContainer}> 
        <TextInput
          style={styles.searchBar}
          placeholder="🔍 Buscar medicamento..."
          placeholderTextColor="#B0B0B0"
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>

      <TouchableOpacity style={[styles.button, styles.consultButton]}
      onPress={() => navigation.navigate('Medicamentos')}> 
        <Text style={styles.buttonText}>Consultar</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#3F3D56',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
  },
  consultButton: {
    backgroundColor: '#28BC63', // color del boton consultar //
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});

export default Home;
