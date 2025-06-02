import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import Medicamentos from './screens/Medicamentos';
import MedicamentoDetail from './components/MedicamentoDetail';
import  Canasta  from './screens/Canasta';
import  Turnos  from './screens/Turnos';
import Ajustes from './screens/Ajustes';
import LoginScreen from './screens/LoginScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import CanastaBoton from './components/CanastaBoton';
import FarmaciaDetail from './components/FarmaciaDetail';
import CrearTurno from './screens/CrearTurno';
import { createNavigationContainerRef } from '@react-navigation/native';


export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

const Stack= createNativeStackNavigator();

function StackGroup(){
    return(
    <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component ={LoginScreen}></Stack.Screen>
        <Stack.Screen name="Home" component={TabGroup} options={{ headerShown: false }}/>
        <Stack.Screen name="Medicamentos" component={Medicamentos} />
        <Stack.Screen name="Detalles" component={MedicamentoDetail}/>
        <Stack.Screen name="Detalles de Farmacia" component={FarmaciaDetail}/>
        <Stack.Screen name="CrearTurno" component={CrearTurno}></Stack.Screen>
    </Stack.Navigator>
    )
}

const Tab = createBottomTabNavigator();

function TabGroup(){
    return(
        <Tab.Navigator
        screenOptions={({route}) => ({
            tabBarActiveTintColor: 'tomato',
            tabBarIcon: ({focused}) => {
                let iconName;
                if (route.name === "Home"){
                    iconName = focused? "home": "home-outline";
                } else if (route.name === "Canasta"){
                    iconName = focused? "basket" : "basket-outline";
                } else if (route.name === "Turnos"){
                    iconName = focused? "calendar-number" : "calendar-number-outline";
                } else if (route.name === "Ajustes"){
                    iconName = focused? "settings" : "settings-outline";
                }
                return <Ionicons name={iconName} size={26} color={'tomato'}/>
            },
            })}>
            <Tab.Screen name="Home" 
                        component={Home} />
            <Tab.Screen name="Canasta" 
                        component={Canasta}/>
            <Tab.Screen name="Turnos" 
                        component={Turnos}/>
            <Tab.Screen name="Ajustes" 
                        component={Ajustes}/>
        </Tab.Navigator>
    )
}

export default function Navigation(){

return( 
    <StackGroup/>
);
} 