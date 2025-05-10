import React, { useState, useEffect, useContext } from "react";
import { View, Text, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useRoute } from '@react-navigation/native';
import { AuthContext } from "../context/AuthContext";
import  MedicamentoCard  from "../components/MedicamentoCard";
import { Button } from "react-native-paper";

const FeedMedicamentos = ({ navigation }) => {
  const {medicamentos, isLoading, canasta }= useContext(AuthContext);
  const route = useRoute();
  const [filtrado, setFiltrado] = useState(medicamentos)
  
  useEffect(() => {
    if (route.params?.busqueda) {
      const { busqueda } = route.params;
      const resultados = medicamentos.filter(item =>
        item.name.toLowerCase().includes(busqueda.toLowerCase())
      );
      setFiltrado(resultados);
    } else {
      setFiltrado(medicamentos); // Si no hay búsqueda, muestra todos los medicamentos
    }
  }, [route.params?.busqueda, medicamentos]); 
  

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }
  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={filtrado}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Detalles', {item})}>
          <MedicamentoCard
          medicamento= {item}/>
        </TouchableOpacity>
      
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 40,
    justifyContent: 'center',
  },
  

});

export default FeedMedicamentos ;
