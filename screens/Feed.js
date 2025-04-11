import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";

const Citas = () => {
  const [getResponse, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get('https://quote-api.com/api/v1/some'); //cambiar esta ruta si o si //
        setResponse(response.data.dat);
      } catch (error) {
        console.error("Error al obtener la cita:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuotes();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cita: {getResponse}</Text>
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
    padding: 20,
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: '#2c3e50',
  },
});

export default Citas;
