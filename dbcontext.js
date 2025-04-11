import React, { useEffect } from "react";
import axios from "axios";
import { View, Button } from 'react-native';

export default function DbContext() {
 
    const MIURL = "https://farma-aqui-default-rtdb.firebaseio.com/";
   
    const uploadMedicamentos = async () => {
        try {
          const response = await axios.put(
            `${MIURL}medicamentos.json`, // use `.post` if you want to append
            medicamentos
          );
          console.log("Success:", response.data);
        } catch (error) {
          console.error("Error uploading data:", error);
        }
      };

  const medicamentos = [
    {
      id: 1,
      name: "Pregabalina",
      presentacion: "30 cápsulas",
      dosis: "75 mg",
      via_administracion: "Oral",
      laboratorio: "Pfizer",
      indicaciones: "Tratamiento del dolor neuropático y epilepsia"
    },
    {
      id: 2,
      name: "Escitalopram",
      presentacion: "28 comprimidos",
      dosis: "10 mg",
      via_administracion: "Oral",
      laboratorio: "Lundbeck",
      indicaciones: "Tratamiento de la depresión y trastornos de ansiedad"
    },
    {
      id: 3,
      name: "Acetaminofén",
      presentacion: "20 tabletas",
      dosis: "500 mg",
      via_administracion: "Oral",
      laboratorio: "Genfar",
      indicaciones: "Alivio del dolor leve a moderado y fiebre"
    },
    {
      id: 4,
      name: "Ibuprofeno",
      presentacion: "30 tabletas",
      dosis: "400 mg",
      via_administracion: "Oral",
      laboratorio: "Bayer",
      indicaciones: "Tratamiento de inflamación, dolor y fiebre"
    },
    {
      id: 5,
      name: "Losartán",
      presentacion: "30 tabletas",
      dosis: "50 mg",
      via_administracion: "Oral",
      laboratorio: "Sanofi",
      indicaciones: "Hipertensión arterial y protección renal en diabéticos"
    },
    {
      id: 6,
      name: "Omeprazol",
      presentacion: "14 cápsulas",
      dosis: "20 mg",
      via_administracion: "Oral",
      laboratorio: "Sandoz",
      indicaciones: "Tratamiento de reflujo gastroesofágico y úlceras"
    },
    {
      id: 7,
      name: "Amoxicilina",
      presentacion: "21 cápsulas",
      dosis: "500 mg",
      via_administracion: "Oral",
      laboratorio: "Tecnoquímicas",
      indicaciones: "Infecciones bacterianas respiratorias, urinarias y dérmicas"
    },
    {
      id: 8,
      name: "Clonazepam",
      presentacion: "30 tabletas",
      dosis: "0.5 mg",
      via_administracion: "Oral",
      laboratorio: "Roche",
      indicaciones: "Ansiedad, crisis convulsivas y trastornos del sueño"
    },
    {
      id: 9,
      name: "Metformina",
      presentacion: "60 tabletas",
      dosis: "850 mg",
      via_administracion: "Oral",
      laboratorio: "Merck",
      indicaciones: "Control de la glucemia en diabetes tipo 2"
    },
    {
      id: 10,
      name: "Salbutamol",
      presentacion: "Inhalador 200 dosis",
      dosis: "100 mcg/dosis",
      via_administracion: "Inhalatoria",
      laboratorio: "GlaxoSmithKline",
      indicaciones: "Tratamiento del asma y enfermedades pulmonares obstructivas"
    }
  ];
  
  return (
    <View style={{ marginTop: 50 }}>
      <Button title="Subir Medicamentos" onPress={uploadMedicamentos} />
    </View>
  );

}
