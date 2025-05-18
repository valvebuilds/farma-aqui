import { Card, Text } from 'react-native-paper';
import { StyleSheet} from 'react-native';



const FarmaciaCard = ({ farmacia }) => {
  return (
    <Card style={{ marginBottom: 10, padding: 15 }}>
      <Text style= {styles.title}>{farmacia.nombre_de_establecimiento}</Text>
      <Text style={styles.description}>Dirección: {farmacia.direccion}</Text>
      <Text style={styles.description}>Teléfono: {farmacia.telefono}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
feedcard: {
  backgroundColor: '#fff',
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
export default FarmaciaCard;
