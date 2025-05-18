import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { FarmaciaCard } from "./FarmaciaCard"
import { Modal, View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"; // ✅
import { Button, Card } from "react-native-paper";

const ModalDisponibilidad = ({visible, onClose, navigation}) =>{
    
    const { canasta, stock, farmacias } = useContext(AuthContext);
    const [resultado, setResultado] = useState({ todos: [], algunos: [], ninguno: false });

    const irADetalleFarmacia = (nombre) => {
        const farmaciaEncontrada = farmacias.find(f => f.nombre_del_establecimiento === nombre);
            if (farmaciaEncontrada) {navigation.navigate('Detalles de Farmacia', { item: farmaciaEncontrada });
            } else {
                Alert.alert('Error', 'No se encontró la información de esta farmacia');
            }
        };

    useEffect(()=> {
        if (visible){
            const analizarStock = () => {
            const todos = [];
            const algunos = [];
            const total = canasta.length;

            stock.forEach(farmacia => {
                const disponibles = canasta.filter(med =>
                farmacia.medicamentos.some(m =>
                    m.id_medicamento === med.id && m.cantidad > 0
                )
                );

                    if (disponibles.length === total) {
                    todos.push(farmacia.nombre_farmacia);
                    } else if (disponibles.length > 0) {
                    algunos.push({
                        farmacia: farmacia.nombre_farmacia,
                        disponibles: disponibles
                    });
                    }
                });
                const ninguno = todos.length === 0 && algunos.length === 0;
                
            return { todos, algunos, ninguno};
        };
        const resultadoAnalisis = analizarStock();
        setResultado(resultadoAnalisis);
    }
}, [visible, canasta,stock]);

    return(

        <Modal visible={visible} animationType="slide" >
           <View style={styles.modalBackground}>
            <View style={styles.modal}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: '80%' }}>
                <Text style={styles.title}>Puede encontrar sus medicamentos en: </Text>
           
           {resultado.todos.length > 0 && (
                <View style={styles.card}>
                 <Text style={styles.subtitle}>Farmacias con todos los medicamentos:</Text>
                    {resultado.todos.map((farm, id) => (
                        <TouchableOpacity key={id} onPress={() => irADetalleFarmacia(farm)}>
                            <Text key={id} style={styles.text}> * {farm}</Text>
                        </TouchableOpacity>
                ))}
            </View>
            )}

           {resultado.algunos.length > 0 && (
                <View style={styles.card}>
                    <Text style={styles.subtitle}>Farmacias con algunos medicamentos:</Text>
                    {resultado.algunos.map((item, id) => (
                        <TouchableOpacity onPress={() => irADetalleFarmacia(item.farmacia)}>
                            <View key={id}>
                                <Text style={styles.text}>• {item.farmacia}</Text>
                                <Text style={styles.text}>Tiene: {item.disponibles.map(d => d.name).join(', ')}</Text>
                            </View>
                        </TouchableOpacity>
          ))}
        </View>
      )}

      {resultado.ninguno && (
        <Text style={{ color: 'gray', marginTop: 15 }}>Ninguna farmacia tiene los medicamentos en stock.</Text>
      )}
      </ScrollView>
      <Button mode="contained" onPress={onClose} style={{ marginTop: 20 }}>
            Cerrar
          </Button>
     </View>
    </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
modalBackground: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    backgroundColor: 'white', // Color del modal en sí
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  text: {
    fontSize: 18,
    padding: 10
  },
  card:{
    backgroundColor: '#c2dfe3',
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 3, // sombra Android
    shadowColor: '#000', // sombra iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#f0f3bd',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});
export default ModalDisponibilidad;