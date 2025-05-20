import React from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext'; // ruta correcta según tu estructura

export default function Ajustes() {
  const { modoOscuro, toggleTheme } = useTheme();

  const [notificaciones, setNotificaciones] = React.useState(true);
  const [recordatorios, setRecordatorios] = React.useState(true);
  const [mostrarInfoExtra, setMostrarInfoExtra] = React.useState(false);
  const [idioma, setIdioma] = React.useState('es');

  return (
    <View style={[styles.container, modoOscuro ? styles.oscuro : styles.claro]}>
      <Text style={[styles.titulo, modoOscuro && styles.textoClaro]}>
        Ajustes de la aplicación
      </Text>

      <View style={styles.opcion}>
        <Text style={[styles.texto, modoOscuro && styles.textoClaro]}>Modo Oscuro</Text>
        <Switch
          value={modoOscuro}
          onValueChange={toggleTheme}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={modoOscuro ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>

      <View style={styles.opcion}>
        <Text style={[styles.texto, modoOscuro && styles.textoClaro]}>Notificaciones</Text>
        <Switch
          value={notificaciones}
          onValueChange={setNotificaciones}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={notificaciones ? '#2196f3' : '#f4f3f4'}
        />
      </View>

      <View style={styles.opcion}>
        <Text style={[styles.texto, modoOscuro && styles.textoClaro]}>Recordatorios</Text>
        <Switch
          value={recordatorios}
          onValueChange={setRecordatorios}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={recordatorios ? '#2196f3' : '#f4f3f4'}
        />
      </View>

      <View style={styles.opcion}>
        <Text style={[styles.texto, modoOscuro && styles.textoClaro]}>Mostrar Info Extra</Text>
        <Switch
          value={mostrarInfoExtra}
          onValueChange={setMostrarInfoExtra}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={mostrarInfoExtra ? '#2196f3' : '#f4f3f4'}
        />
      </View>

      <View style={styles.opcion}>
        <Text style={[styles.texto, modoOscuro && styles.textoClaro]}>Idioma</Text>
        <View style={styles.botonesIdioma}>
          <TouchableOpacity
            style={[styles.botonIdioma, idioma === 'es' && styles.botonIdiomaSeleccionado]}
            onPress={() => setIdioma('es')}
          >
            <Text style={[styles.texto, idioma === 'es' && styles.textoIdiomaSeleccionado]}>ES</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botonIdioma, idioma === 'en' && styles.botonIdiomaSeleccionado]}
            onPress={() => setIdioma('en')}
          >
            <Text style={[styles.texto, idioma === 'en' && styles.textoIdiomaSeleccionado]}>EN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botonIdioma, idioma === 'fr' && styles.botonIdiomaSeleccionado]}
            onPress={() => setIdioma('fr')}
          >
            <Text style={[styles.texto, idioma === 'fr' && styles.textoIdiomaSeleccionado]}>FR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  claro: { backgroundColor: '#fff' },
  oscuro: { backgroundColor: '#121212' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, color: '#000' },
  textoClaro: { color: '#fff' },
  opcion: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  texto: { fontSize: 18 },
  botonesIdioma: { flexDirection: 'row' },
  botonIdioma: {
    borderWidth: 1,
    borderColor: '#888',
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 10,
    borderRadius: 6,
  },
  botonIdiomaSeleccionado: {
    backgroundColor: '#2196f3',
    borderColor: '#2196f3',
  },
  textoIdiomaSeleccionado: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
