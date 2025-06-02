import * as Location from 'expo-location';
import { Button } from 'react-native-paper';

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

