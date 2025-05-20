import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from "react-native";
import { useTheme } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';

const Home = ({ navigation }) => {
  const contexto = useContext(AuthContext);
  const { theme, modoOscuro } = useTheme();

  const [texto, setTexto] = useState('');
  const [busqueda, setBusqueda] = useState(null);
  const [filtrado, setFiltrado] = useState([]);

  if (!contexto) {
    console.log('⚠️ AuthContext es undefined');
    return <Text>Error al cargar contexto</Text>;
  }

  const { medicamentos, isLoading } = contexto;

  const handleSearch = (text) => {
    setTexto(text);
    const resultados = medicamentos.filter(item =>
      item.name.toLowerCase().startsWith(text.toLowerCase())
    );
    setFiltrado(resultados);
  };

  useEffect(() => {
    if (busqueda) {
      navigation.navigate('Medicamentos', { busqueda: busqueda });
      setBusqueda(null);
    }
  }, [busqueda, navigation]);

  if (isLoading) return <Text>Cargando medicamentos...</Text>;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>¡Bienvenido a FarmAquí!</Text>
        <Text style={[styles.subtitle, { color: theme.colors.text }]}>
          Consulta medicamentos y gestiona tus turnos fácilmente.
        </Text>

        <View
          style={[
            styles.searchContainer,
            {
              backgroundColor: theme.colors.cardBackground,
              // Aquí se quita el borde del contenedor para eliminar la línea externa
              // borderColor: modoOscuro ? '#CCCCCC' : theme.colors.text,
              // borderWidth: 1,
            },
          ]}
        >
          <TextInput
            style={[
              styles.searchBar,
              {
                color: theme.colors.text,
                backgroundColor: modoOscuro ? '#2A2A2A' : '#F2F2F2',
                borderRadius: 17,
                paddingHorizontal: 20,
                borderWidth: 1,
                borderColor: modoOscuro ? '#CCCCCC' : '#999',
              },
            ]}
            placeholder="🔍 Buscar medicamento..."
            placeholderTextColor={modoOscuro ? '#AAAAAA' : '#777'}
            value={texto}
            onChangeText={handleSearch}
          />

          <FlatList
            data={filtrado}
            keyExtractor={(item) => item.id?.toString() || item.name}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setBusqueda(item.name)}>
                <Text style={{ color: theme.colors.text }}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            styles.consultButton,
            {
              backgroundColor: modoOscuro ? '#28BC63' : theme.colors.primary,
              borderColor: modoOscuro ? '#28BC63' : 'transparent',
              borderWidth: modoOscuro ? 1 : 0,
            },
          ]}
          onPress={() => navigation.navigate('Medicamentos')}
        >
          <Text style={[styles.buttonText, { color: '#fff' }]}>Consultar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  searchContainer: {
    width: '100%',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    // Shadow o borde removidos para evitar líneas externas
  },
  searchBar: {
    height: 45,
    fontSize: 17,
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 7,
    alignItems: 'center',
    marginVertical: 5,
  },
  consultButton: {},
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
