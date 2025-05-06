import React from "react";
import axios from "axios";
import { View, Button } from 'react-native';

export default function DbContext() {

  const MIURL = "https://farma-aqui-default-rtdb.firebaseio.com/";

  const uploadMedicamentos = async () => {
    try {
      const response = await axios.put(
        `${MIURL}medicamentos.json`,
        medicamentos
      );
      console.log("Medicamentos subidos:", response.data);
    } catch (error) {
      console.error("Error al subir medicamentos:", error);
    }
  };

  const uploadFarmacias = async () => {
    const farmacias = {
      1: { id: 1, nombre: "Farmatodo Pereira", tipo: "Privada", direccion: "Cra. 7 #23-45", telefono: "3161234567" },
      2: { id: 2, nombre: "Cruz Verde - Clínica Los Rosales", tipo: "Privada", direccion: "Av. 30 de Agosto #27-75", telefono: "3179876543" },
      3: { id: 3, nombre: "Drogas La Rebaja", tipo: "Pública", direccion: "Cra. 8 #20-12", telefono: "3109988776" },
      4: { id: 4, nombre: "Farmacia Cafesalud", tipo: "EPS", direccion: "Cll 22 #6-30", telefono: "3181122334" },
      5: { id: 5, nombre: "Farmacia Colsubsidio", tipo: "EPS", direccion: "Cra. 10 #18-22", telefono: "3145566778" },
      6: { id: 6, nombre: "Farmasanitas", tipo: "EPS", direccion: "Av. Circunvalar #24-56", telefono: "3123344556" },
      7: { id: 7, nombre: "Droguería Alemana", tipo: "Privada", direccion: "Cra. 6 #18-30", telefono: "3167788990" },
      8: { id: 8, nombre: "Droguería Coopidrogas", tipo: "Pública", direccion: "Cll 21 #7-15", telefono: "3192233445" }
    };

    try {
      const response = await axios.put(
        `${MIURL}farmacias.json`,
        farmacias
      );
      console.log("Farmacias subidas:", response.data);
    } catch (error) {
      console.error("Error al subir farmacias:", error);
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
      <Button title="Subir Farmacias" onPress={uploadFarmacias} />
    </View>
  );
}
