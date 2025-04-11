import React from "react";
import { Text, View, Card, Button } from "react-native";


const MedicamentoCard = ({ medicamento, onEliminar }) => {
  return (
    <Card style={{ marginBottom: 10, padding: 15 }}>
      <Text style={{ fontSize: 18 }}>{medicamento.nombre}</Text>
      <Text>Dosis: {medicamento.dosis}</Text>
      <Text>Cantidad: {medicamento.cantidad}</Text>
      <Button mode="contained" onPress={() => onEliminar(medicamento.id)} style={{ marginTop: 5 }}>
        Eliminar
      </Button>
    </Card>
  );
};

export default MedicamentoCard;
