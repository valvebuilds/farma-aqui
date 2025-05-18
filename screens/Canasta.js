import { useContext, useState } from 'react';
import { Card, Text, Button } from 'react-native-paper';
import { View, Pressable, FlatList, TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import MedicamentoCard from '../components/MedicamentoCard';
import ModalDisponibilidad from '../components/ModalDisponibilidad';

function Canasta( {navigation}){
    const { canasta, añadirCanasta, eliminarCanasta, stock } = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);

  return ( 
  <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      {canasta.length > 0 ? (
        <>
          <View style={{ padding: 20 }}>
            <Button 
              mode="contained" 
              onPress={()=>setModalVisible(true)}
              style={styles.button}
              labelStyle={styles.text}
            >
              Ver disponibilidad
            </Button>

            <ModalDisponibilidad 
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            navigation={navigation} 
            />

          </View>

          <FlatList
            contentContainerStyle={{ padding: 20 }}
            data={canasta}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('Detalles', { item })}>
                <MedicamentoCard showAddButton={false} medicamento={item} />
              </TouchableOpacity>
            )}
          />
        </>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ fontSize: 18, color: 'gray', textAlign: 'center' }}>
            Tu canasta está vacía.
          </Text>
        </View>
      )}
    </View>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#F78FA',
        alignItems:'center'
    },
    button: {
        marginTop: 30,
        width:"auto",
    },
})
export default Canasta;
