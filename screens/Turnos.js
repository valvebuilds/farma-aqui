import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const Turnos = () => {
  const [turnos, setTurnos] = useState([
    { id: '1', fecha: '25/03/2025', hora: '10:30 AM', estado: 'Confirmado' },
    { id: '2', fecha: '27/03/2025', hora: '02:00 PM', estado: 'Pendiente' },
  ]);

  const agregarTurno = () => {
    const nuevoTurno = {
      id: (turnos.length + 1).toString(),
      fecha: '30/03/2025',
      hora: '11:00 AM',
      estado: 'Pendiente',
    };
    setTurnos([...turnos, nuevoTurno]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🗓 Mis Turnos</Text>
      
      <FlatList
        data={turnos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.turnoCard}>
            <View style={styles.turnoInfo}>
              <Text style={styles.turnoFecha}>📅 {item.fecha}</Text>
              <Text style={styles.turnoHora}>🕒 {item.hora}</Text>
            </View>
            <Text style={[styles.estado, item.estado === 'Confirmado' ? styles.confirmado : styles.pendiente]}>
              {item.estado}
            </Text>
          </View>
        )}
      />
      
      <TouchableOpacity style={styles.fab} onPress={agregarTurno}>
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 15,
  },
  turnoCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  turnoInfo: {
    flexDirection: 'column',
  },
  turnoFecha: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
  },
  turnoHora: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  estado: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  confirmado: {
    backgroundColor: '#2ecc71',
    color: '#fff',
  },
  pendiente: {
    backgroundColor: '#f39c12',
    color: '#fff',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#3498db',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5, 
  },
  fabText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Turnos;
