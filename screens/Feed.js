import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet, FlatList } from "react-native";
import axios from "axios";

const Feed = () => {
  const [getResponse, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicamentos = async () => {
      try {
        const response = await axios.get('https://farma-aqui-default-rtdb.firebaseio.com/medicamentos.json'); 
        setResponse(response.data);
      } catch (error) {
        console.error("Error al obtener listado de medicamentos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMedicamentos();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={getResponse}
        renderItem={({ item }) => (
          <View style = {styles.feedcard}>
            <Text>{item.name}</Text>
            <Text>{item.dosis} — {item.presentacion}</Text>
            <Text>{item.indicaciones}</Text>
          </View>
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
  text: {
    fontSize: 20,
    color: '#2c3e50',
  },
  feedcard: {
    marginBottom: 10,
  }
});

export default Feed;
