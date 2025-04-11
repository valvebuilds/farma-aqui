// navigation/HomeStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Bienvenida from './Bienvenida';
import Feed from './Feed';

const Stack = createNativeStackNavigator();

export default function BienvenidaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Bienvenida} options={{ headerShown: false }}/>
      <Stack.Screen name="Feed" component={Feed} />
    </Stack.Navigator>
  );
}
