import { Card, Text, Button } from 'react-native-paper';
import { StyleSheet} from 'react-native';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';


const MedicamentoCard = ({ medicamento }) => {

  const context = useContext(AuthContext);
  const {canasta, añadirCanasta, eliminarCanasta} = context;

  const yaEstaEnCanasta = canasta.some(item => item.id === medicamento.id);

  const handleAdd = () => {
    añadirCanasta(medicamento);
  }

  const handleDelete = () => {
    eliminarCanasta(medicamento);
  }

  return (
    <Card style={styles.feedcard } >
      <Text style= {styles.title}>{medicamento.name}</Text>
      <Text style={styles.description}>Dosis: {medicamento.dosis}</Text>
      <Text style={styles.description}>Cantidad: {medicamento.presentacion}</Text>
      <Text style={styles.description}>Descripcion: {medicamento.descripcion}</Text>
     
      {!yaEstaEnCanasta&& <Button mode="contained" onPress={() => handleAdd()} style={{ marginTop: 5 }}>
        Agregar a canasta
      </Button>}
      {yaEstaEnCanasta&& <Button mode="contained" onPress={() => handleDelete()} style={{ marginTop: 5 }}>
        Eliminar
      </Button>}
    </Card>

  );
};

const styles = StyleSheet.create({
feedcard: {
  backgroundColor: 'white',
  padding: 20,
  borderRadius: 15,
  marginBottom: 12,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 6,
  elevation: 4, 
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'left',
},
title: {
  fontSize: 40,
  fontWeight: "bold",
  color: "#2C2C2C",
  marginBottom: 10,
  paddingTop: 120,
},
description: {
  fontSize: 18,
  color: "#555",
  marginBottom: 20,
  color: "gray", 
  paddingBottom: 8 }

})
export default MedicamentoCard;
