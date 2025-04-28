import React, { useState, useEffect, useContext } from "react";
import { View, Text, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import  MedicamentoCard  from "../components/MedicamentoCard";

const Feed = ({navigation}) => {
  const {misDatos, isLoading }= useContext(AuthContext);
  const [seleccionado, setSeleccionado] = useState("");
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
        data={misDatos}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Medicamento', {medicamento: item})}>
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

export default Feed;
