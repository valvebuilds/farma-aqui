import React, { useContext, useState } from "react";
import axios from "axios";
import { View, Button, Alert } from 'react-native';

export default function DbContext() {
 
    const MIURL = "https://farma-aqui-default-rtdb.firebaseio.com/";
    const [medicamentos, setMedicamentos] = useState([]);
    const [error, setError] = useState(null);
   
    const getMedicamentos = async () => {
        try {
          const response = await axios.get(
            `${MIURL}medicamentos.json`
          );
          setMedicamentos(response.data);
        } catch (error) {
          console.error("Error uploading data:", error);
          setError(error);
        }

        if (error) return (Alert.alert("Error", "No se pudieron obtener los datos " + {error}))
      };

  
  return (
    <View style={{ marginTop: 50 }}>
      <Button title="Subir Medicamentos" onPress={uploadMedicamentos} />
    </View>
  );

}
