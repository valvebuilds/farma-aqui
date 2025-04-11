import { useState } from "react";
import MedicamentoCard from "./MedicamentoCard";
import { FlatList } from "react-native";

const onEliminar = (medicamento) =>{
    setMedicamentos( medicamentos =>{
        const copyMedicamentos = medicamentos;
        delete copyMedicamentos[medicamento.id];
        return copyMedicamentos;}
    )};

const MedicamentoList = ()=>{
    const [medicamentos, setMedicamentos] = useState({
        1: { id: 1, nombre: "Paracetamol" },
        2: {id: 2, nombre: "ibuprofeno" },
        3: {id: 3, nombre: "Amoxicilina" },
        4: { id: 4, nombre: "Omeprazol" },
        5:{id: 5, nombre: "Metformina" },
        6:{ id: 6, nombre: "Losartán" },
        7:{ id: 7, nombre: "Atorvastatina" },
        8:{ id: 8, nombre: "Salbutamol" },
        9: { id: 9, nombre: "Cetirizina" },
        10: { id: 10, nombre: "Diclofenaco" }
    });
        return(
            <View>
                <Text>Lista de Medicamentos</Text>
                <FlatList>

                </FlatList>
            </View>
    );
};
