import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

// Lista de medicamentos disponibles
const medicamentosDisponibles = [
  { id: '1', name: 'Acetaminofén', precio: 1500 },
  { id: '2', name: 'Ibuprofeno', precio: 1800 },
  { id: '3', name: 'Loratadina', precio: 1200 },
  { id: '4', name: 'Omeprazol', precio: 2000 },
  { id: '5', name: 'Amoxicilina', precio: 1800 },
  { id: '6', name: 'Clonazepam', precio: 2200 },
  { id: '7', name: 'Metformina', precio: 2000 },
  { id: '8', name: 'Salbutamol', precio: 1500 },
];

export default function App() {
  const [canasta, setCanasta] = useState([]);
  const [cantidad, setCantidad] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [medicamentoSeleccionado, setMedicamentoSeleccionado] = useState(null);

  const buscarMedicamento = (text) => {
    setBusqueda(text);
    const encontrado = medicamentosDisponibles.find((med) =>
      med.name.toLowerCase().includes(text.toLowerCase())
    );
    setMedicamentoSeleccionado(encontrado || null);
  };

  const agregarAMiCanasta = () => {
    if (medicamentoSeleccionado && cantidad && parseInt(cantidad) > 0) {
      const nuevoMedicamento = {
        ...medicamentoSeleccionado,
        cantidad: parseInt(cantidad),
        total: medicamentoSeleccionado.precio * parseInt(cantidad),
      };
      setCanasta([...canasta, nuevoMedicamento]);
      setCantidad('');
      setBusqueda('');
      setMedicamentoSeleccionado(null);
      alert('Medicamento agregado a la canasta');
    } else {
      alert('Selecciona un medicamento y cantidad válida');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Canasta de Medicamentos</Text>

      {/* Barra de búsqueda */}
      <TextInput
        style={styles.inputBusqueda}
        placeholder="Buscar medicamento..."
        value={busqueda}
        onChangeText={buscarMedicamento}
      />

      {/* Mostrar el medicamento encontrado */}
      {medicamentoSeleccionado && (
        <View style={styles.medicamentoEncontrado}>
          <Text style={styles.itemText}>Medicamento: {medicamentoSeleccionado.name}</Text>
          <Text style={styles.precioText}>Precio: ${medicamentoSeleccionado.precio}</Text>
          <TextInput
            style={styles.inputCantidad}
            placeholder="Cantidad"
            keyboardType="numeric"
            value={cantidad}
            onChangeText={setCantidad}
          />
          <TouchableOpacity style={styles.botonAgregar} onPress={agregarAMiCanasta}>
            <Text style={styles.botonTexto}>Agregar a la Canasta</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Mostrar Canasta */}
      {canasta.length > 0 && (
        <View style={styles.canastaContainer}>
          <Text style={styles.subtitulo}>Medicamentos en tu Canasta:</Text>
          <FlatList
            data={canasta}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemCanasta}>
                <Text style={styles.nombreMed}>{item.name}</Text>
                <Text style={styles.detallesMed}>Cantidad: {item.cantidad}</Text>
                <Text style={styles.detallesMed}>Total: ${item.total}</Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
    padding: 20,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0097A7',
    marginBottom: 20,
    paddingTop: 10,
  },
  inputBusqueda: {
    borderWidth: 1,
    borderColor: '#00BCD4',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#ffffff',
  },
  medicamentoEncontrado: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  itemText: {
    fontSize: 18,
    color: '#004D40',
    fontWeight: '500',
    marginBottom: 10,
  },
  precioText: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 15,
  },
  inputCantidad: {
    borderWidth: 1,
    borderColor: '#00BCD4',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#ffffff',
  },
  botonAgregar: {
    backgroundColor: '#00BCD4',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignItems: 'center',
    elevation: 5,
  },
  botonTexto: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  canastaContainer: {
    marginTop: 30,
  },
  subtitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00695C',
    marginBottom: 10,
  },
  itemCanasta: {
    backgroundColor: '#E0F7FA',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  nombreMed: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004D40',
  },
  detallesMed: {
    fontSize: 16,
    color: '#00695C',
  },
});
