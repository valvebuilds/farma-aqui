import { useContext } from 'react';
import { View, Text, Pressable, FlatList, TouchableOpacity} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import MedicamentoCard from '../components/MedicamentoCard';

function Canasta(){
    const { canasta, añadirCanasta, eliminarCanasta } = useContext(AuthContext);

    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <View style={{ padding: 20 }}>
            <FlatList
                data={canasta}
                renderItem={({ item }) => (
                <TouchableOpacity>
                <MedicamentoCard
                showAddButton={false}
                medicamento= {item}/>
                </TouchableOpacity>
      
        )}/>
        </View>


        </View>
    );
}
export default Canasta;
