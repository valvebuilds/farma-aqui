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
  const { turnos } = useContext(AuthContext);
  const navigation = useNavigation();
  
  const dataTurnos = Object.values(turnos);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {turnos.length === 0 ? (
          <Text style={styles.noTurnosText}>No tienes turnos disponibles</Text>
        ) : (
          <FlatList
            data={dataTurnos}
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
