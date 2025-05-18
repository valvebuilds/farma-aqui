import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from "react-native";
import { Button, Card } from "react-native-paper";
import CanastaBoton from "./CanastaBoton";
import FiltroEpsCard from "./FiltroEpsCard";


const FarmaciaDetail = ({ route }) => {
  const { item: farmacia } = route.params;
  const {canasta, stock, redEps, isLoading }= useContext(AuthContext); 
  const [eps, setEps] = useState([]);

  useEffect(() => {
      const epsAsociadas = redEps.filter(element =>
        element.farmacias.includes(farmacia.nombre_del_establecimiento)
      ).map(element=> element.prestador);
      setEps(epsAsociadas);
    }, [redEps, farmacia]);  

  return (
    <View style={styles.container}>
      <CanastaBoton></CanastaBoton>
      <Card style={styles.card}>
        <Card.Content>
        <Text style={styles.title}>{farmacia.nombre_del_establecimiento}</Text>
          <Text style={styles.detailsTitle}>Detalles</Text>
          <Text style={styles.description}> Direccion: 
            {farmacia.direccion} </Text>
            <Text style={styles.description}> Teléfono: 
            {farmacia.telefono} </Text>
          <Text style={styles.detailsText}>Servicio de inyectología: {farmacia.servicios_adicionales_inyectologia} </Text>
        </Card.Content>
      </Card>

      <Text style={styles.listTitle}>EPS Asociadas</Text>
            {eps.length > 0 ? (
              <FlatList
                data={eps}
                renderItem={({ item }) => (
                  <Card style={styles.pharmacyCard}>
                    <Card.Content>
                      <Text style={styles.pharmacyName}>{item}</Text>
                    </Card.Content>
                  </Card>
                )}
                contentContainerStyle={{ paddingBottom: 20 }}
              />
            ) : (
              <Text style={styles.noStockText}>
                Esta farmacia no tiene convenio con ninguna EPS.
              </Text>
            )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FAFAFA",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2C2C2C",
    marginBottom: 5,
    paddingTop: 12
  },
  description: {
    fontSize: 18,
    color: "#555",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  detailsText: {
    fontSize: 16,
    color: "#666",
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    marginRight: 10,
    backgroundColor: "#FFFFFF",
  },
  filterButton: {
    borderRadius: 8,
    paddingVertical: 6,
    backgroundColor: "#2196F3",
  },
  listTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C2C2C",
    marginBottom: 10,
  },
  pharmacyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 12,
    padding: 10,
    elevation: 1,
  },
  pharmacyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  pharmacyInfo: {
    fontSize: 16,
    color: "#555",
    marginTop: 4,
  },
  noStockText: {
    fontSize: 18,
    color: "#C62828",
    textAlign: "center",
    marginTop: 20,
  },
});

export default FarmaciaDetail;
