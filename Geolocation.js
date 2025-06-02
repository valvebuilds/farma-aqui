import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import * as Location from 'expo-location';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//funciones que sue utilizaron una sola vez: 
// para conseguir las coordenadas de cada farmacia y almacenar en FIREBASE
async function getCoordinates(address) {
      const fullAddress = `${address}, Pereira, Colombia`;
      try {
        const geocode = await Location.geocodeAsync(fullAddress);
        if (geocode.length > 0) {
          return {  
            latitude: geocode[0].latitude,
            longitude: geocode[0].longitude,
          };
        }
      } catch (error) {
        console.log('Error en geocodificación:', error);
      }
      return null;
    }
  const agregarCoords = async (farmaciaId, coords) => {
    if (!coords) return;
    try {
        const response = await axios.patch(`${DB_URL}/farmacias/${farmaciaId}.json`, {
          coords: {
            latitude: coords.latitude,
            longitude: coords.longitude,
          },
        });
        console.log(`Coords guardadas para ${farmaciaId}:`, response.data);
      } catch (err) {
        console.error(`Error guardando coords en ${farmaciaId}:`, err.response?.data || err.message);
      }
};
  async function actualizarTodasLasFarmacias() {

    for (const [id, datos] of Object.entries(farmacias)) {
      try {
        const coords = await getCoordinates(datos.direccion);
        if (coords) {
          console.log(`📍 ${id}: ${datos.direccion} ->`, coords);
          await agregarCoords(id, coords);
          await new Promise(resolve => setTimeout(resolve, 300)); // opcional delay
        } else {
          console.log(`No se pudo geocodificar ${id}: ${datos.direccion}`);
        }
      } catch (innerError) {
        console.error(` Error en la iteración de ${id}:`, innerError.message);
      }
    }
    console.log('Proceso de actualización completado.');
  } 

//Función que solicitda permisos del dispositivo del usuario
export default function Ubicacion() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permiso denegado');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
        <Text style={{textAlign:'center', marginBottom: '6%'}}>Tu ubicación</Text>
      {location ? (
            <View>
                <MapView style={styles.map}
                
                initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}>
                <Marker
                coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                title="Farmacia Ejemplo"
                />
            </MapView>
            </View>
      ) : (
        <Text>Obteniendo ubicación...</Text>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: '10%',
  },
  map: {
    height: 300,
  },
});