import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button, SafeAreaView, FlatList } from "react-native"
import { useTheme } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';


const Home = ({ navigation }) => {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    console.log('⚠️ AuthContext es undefined');
    return <Text>Error al cargar contexto</Text>;
  }

  const { medicamentos, isLoading } = contexto;
  const [texto, setTexto] = useState('');
  const [busqueda, setBusqueda] = useState(null);
  const [filtrado, setFiltrado] = useState([]);

  const handleSearch = (text) => {
    setTexto(text);
    const resultados = medicamentos.filter(item =>
      item.name.toLowerCase().startsWith(text.toLowerCase())
    );
    setFiltrado(resultados);
  }

  useEffect(()=> {
    if (busqueda) {
      navigation.navigate('Medicamentos',{ busqueda: busqueda });
      setBusqueda(null);
    }
  }, [busqueda, navigation]);

  
  if (isLoading) return <Text>Cargando medicamentos...</Text>;

  const { colors, fonts } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a FarmAquí!</Text>
      <Text style={styles.subtitle}>Consulta medicamentos y gestiona tus turnos fácilmente.</Text>
      
      <View style={styles.searchContainer}> 
        <TextInput
          style={styles.searchBar}
          placeholder="🔍 Buscar medicamento..."
          placeholderTextColor="#B0B0B0"
          value={texto}
          onChangeText={handleSearch}
        />
        <FlatList
          data={filtrado}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setBusqueda(item.name)}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
  )}
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
    backgroundColor:'white',
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
