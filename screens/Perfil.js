import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function Perfil() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={120} color="#00BCD4" />
        <Text style={styles.nombre}>X</Text>
        <Text style={styles.correo}>UsuarioX123@example.com</Text>
      </View>

      <View style={styles.seccion}>
        <TouchableOpacity style={styles.opcion}>
          <MaterialIcons name="edit" size={24} color="#0097A7" />
          <Text style={styles.opcionTexto}>Editar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.opcion}>
          <Ionicons name="settings-outline" size={24} color="#0097A7" />
          <Text style={styles.opcionTexto}>Configuración</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.opcion}>
          <MaterialIcons name="logout" size={24} color="#FF5252" />
          <Text style={[styles.opcionTexto, { color: '#FF5252' }]}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF', 
    alignItems: 'center',
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  nombre: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004D40',
    marginTop: 10,
  },
  correo: {
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 5,
  },
  seccion: {
    width: '90%',
    marginTop: 20,
  },
  opcion: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  opcionTexto: {
    fontSize: 18,
    marginLeft: 15,
    color: '#0097A7',
    fontWeight: '600',
  },
});
