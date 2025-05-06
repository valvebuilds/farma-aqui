// navigation/HomeStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import FeedMedicamentos from './FeedMedicamentos';
import MedicamentoDetail from './MedicamentoDetail';

const Stack = createNativeStackNavigator();

export default function FeedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
      <Stack.Screen name="Medicamentos" component={FeedMedicamentos} />
      <Stack.Screen name="Medicamento" component={MedicamentoDetail}/>
    </Stack.Navigator>
  );
}
