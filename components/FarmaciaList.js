import { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { database } from "../firebase";
import { ref, set } from "firebase/database";

const onEliminar = (farmacia) => {
  setFarmacias((farmacias) => {
    const copyFarmacias = { ...farmacias };
    delete copyFarmacias[farmacia.id];
    return copyFarmacias;
  });
};

const FarmaciaList = () => {
  const [farmacias, setFarmacias] = useState({
    1: { id: 1, nombre: "Farmatodo Pereira", tipo: "Privada", direccion: "Cra. 7 #23-45", telefono: "3161234567" },
    2: { id: 2, nombre: "Cruz Verde - Clínica Los Rosales", tipo: "Privada", direccion: "Av. 30 de Agosto #27-75", telefono: "3179876543" },
    3: { id: 3, nombre: "Drogas La Rebaja", tipo: "Pública", direccion: "Cra. 8 #20-12", telefono: "3109988776" },
    4: { id: 4, nombre: "Farmacia Cafesalud", tipo: "EPS", direccion: "Cll 22 #6-30", telefono: "3181122334" },
    5: { id: 5, nombre: "Farmacia Colsubsidio", tipo: "EPS", direccion: "Cra. 10 #18-22", telefono: "3145566778" },
    6: { id: 6, nombre: "Farmasanitas", tipo: "EPS", direccion: "Av. Circunvalar #24-56", telefono: "3123344556" },
    7: { id: 7, nombre: "Droguería Alemana", tipo: "Privada", direccion: "Cra. 6 #18-30", telefono: "3167788990" },
    8: { id: 8, nombre: "Droguería Coopidrogas", tipo: "Pública", direccion: "Cll 21 #7-15", telefono: "3192233445" }
  });

  const subirFarmacias = () => {
    const farmaciasRef = ref(database, "farmacias/");
    set(farmaciasRef, farmacias)
      .then(() => console.log(" Farmacias subidas exitosamente a Firebase"))
      .catch((error) => console.error("Error al subir farmacias:", error));
  };

  return (
    <View>
      <Text>Lista de Farmacias</Text>
      <FlatList
        data={Object.values(farmacias)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.nombre}</Text>
            <Text>Tipo: {item.tipo}</Text>
            <Text>Dirección: {item.direccion}</Text>
            <Text>Teléfono: {item.telefono}</Text>
            <Text onPress={() => onEliminar(item)}>Eliminar</Text>
          </View>
        )}
      />
      <Text onPress={subirFarmacias}>Subir Farmacias a Firebase</Text>
    </View>
  );
};

export default FarmaciaList;