// CrearTurno.js
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';

const MIURL = "https://farma-aqui-default-rtdb.firebaseio.com/";

const CrearTurno = ({ navigation }) => {
  const { farmacias, user } = useContext(AuthContext);
  const farmaciasArray = farmacias ? Object.values(farmacias) : [];

  const [selectedFarmaciaIndex, setSelectedFarmaciaIndex] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, date) => {
    if (date) setSelectedDate(date);
    setShowDatePicker(false);
  };

  const guardarTurno = async () => {
    if (selectedFarmaciaIndex === null) {
      Alert.alert('Error', 'Por favor seleccione una farmacia');
      return;
    }

    const farmacia = farmaciasArray[selectedFarmaciaIndex];
    if (!farmacia) {
      Alert.alert('Error', 'Farmacia no válida');
      return;
    }

    const turno = {
      farmaciaNombre: farmacia.nombre,
      lugar: farmacia.direccion,
      fecha: selectedDate.toISOString().slice(0, 10),
      hora: selectedDate.toTimeString().slice(0, 5),
      creadoEn: new Date().toISOString(),
    };

    try {
      await axios.post(`${MIURL}turnos/${user.uid}.json`, turno);
      Alert.alert('Turno guardado', 'El turno fue registrado correctamente');
      navigation.goBack(); // Volver a la pantalla anterior
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el turno');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asignar nuevo turno</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedFarmaciaIndex}
          onValueChange={value => setSelectedFarmaciaIndex(value)}
        >
          <Picker.Item label="Seleccione una farmacia..." value={null} />
          {farmaciasArray.map((f, idx) => (
            <Picker.Item key={idx} label={f.nombre} value={idx} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowDatePicker(true)}
      >
        <MaterialIcons name="calendar-today" size={20} color="#333" />
        <Text style={styles.datePickerText}>
          {selectedDate.toLocaleDateString()} - {selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="datetime"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}

      <View style={styles.buttons}>
        <Button title="Guardar Turno" onPress={guardarTurno} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginBottom: 20,
  },
  datePickerText: {
    marginLeft: 10,
    fontSize: 16,
  },
  buttons: {
    marginTop: 20,
  },
});

export default CrearTurno;
