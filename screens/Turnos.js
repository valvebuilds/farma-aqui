import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  Button,
  Alert,
  Platform,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const MIURL = "https://farma-aqui-default-rtdb.firebaseio.com/";

const Turnos = () => {
  const { farmacias, user } = useContext(AuthContext);
  const navigation = useNavigation();
  const farmaciasArray = farmacias ? Object.values(farmacias) : [];

  const [turnos, setTurnos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFarmaciaIndex, setSelectedFarmaciaIndex] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (!user) return;
    axios
      .get(`${MIURL}turnos/${user.uid}.json`)
      .then(res => {
        if (res.data) {
          const dataTurnos = Object.values(res.data);
          setTurnos(dataTurnos);
        } else {
          setTurnos([]);
        }
      })
      .catch(() => {
        Alert.alert('Error', 'No se pudieron cargar los turnos');
      });
  }, [user]);

  const guardarTurno = async () => {
    if (selectedFarmaciaIndex === null) {
      Alert.alert('Error', 'Por favor seleccione una farmacia');
      return;
    }

    const farmaciaSeleccionada = farmaciasArray[selectedFarmaciaIndex];
    if (!farmaciaSeleccionada) {
      Alert.alert('Error', 'Farmacia inválida seleccionada');
      return;
    }

    const fecha = selectedDate.toISOString().slice(0, 10);
    const hora = selectedDate.toTimeString().slice(0, 5);

    const nuevoTurno = {
      farmaciaNombre: farmaciaSeleccionada.nombre,
      fecha,
      hora,
      lugar: farmaciaSeleccionada.direccion,
      creadoEn: new Date().toISOString(),
    };

    try {
      await axios.post(`${MIURL}turnos/${user.uid}.json`, nuevoTurno);
      setTurnos([...turnos, nuevoTurno]);
      setModalVisible(false);
      setSelectedFarmaciaIndex(null);
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el turno');
    }
  };

  const handleDateChange = (event, date) => {
    if (date) setSelectedDate(date);
    setShowDatePicker(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {turnos.length === 0 ? (
          <Text style={styles.noTurnosText}>No tienes turnos disponibles</Text>
        ) : (
          <FlatList
            data={turnos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.cardTurno}>
                <Text>Farmacia: {item.farmaciaNombre}</Text>
                <Text>Fecha: {item.fecha} Hora: {item.hora}</Text>
                <Text>Lugar: {item.lugar}</Text>
              </View>
            )}
          />
        )}

        {/* Botón para ir a CrearTurno */}
        <TouchableOpacity style={styles.botonMas} onPress={() => navigation.navigate('CrearTurno')}>
          <Text style={styles.botonMasTexto}>＋</Text>
        </TouchableOpacity>

        {/* Modal para agregar turno (si se sigue usando manualmente) */}
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Asignar turno</Text>

              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedFarmaciaIndex}
                  onValueChange={(itemValue) => setSelectedFarmaciaIndex(itemValue)}
                >
                  <Picker.Item label="Seleccione una farmacia..." value={null} />
                  {farmaciasArray.map((farmacia, index) => (
                    <Picker.Item key={index} label={farmacia.nombre} value={index} />
                  ))}
                </Picker>
              </View>

              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="datetime"
                  display={Platform.OS === 'ios' ? 'inline' : 'default'}
                  onChange={handleDateChange}
                  minimumDate={new Date()}
                />
              )}

              <View style={styles.botonesModal}>
                <Button title="Cancelar" onPress={() => { setModalVisible(false); setSelectedFarmaciaIndex(null); }} />
                <Button title="Agregar turno" onPress={guardarTurno} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f4f4',
    flex: 1,
  },
  noTurnosText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  botonMas: {
    backgroundColor: '#2e86de',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    elevation: 4,
  },
  botonMasTexto: {
    fontSize: 40,
    color: '#fff',
    lineHeight: 40,
  },
  cardTurno: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
  },
  botonesModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default Turnos;
