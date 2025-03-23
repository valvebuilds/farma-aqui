import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  Bienvenida  from './screens/Bienvenida';
import  Canasta  from './screens/Canasta';
import  Turnos  from './screens/Turnos';
import  Perfil from './screens/Perfil';
import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import IMAGES from './index';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
          <Tab.Screen name="Home" component={Bienvenida} 
          options= {{tabBarIcon: ({ focused }) => (
          <Image source={IMAGES.HOME} style={{height: 24, width: 24}}/>
          ),
          }}/>
          <Tab.Screen name="Canasta" component={Canasta}
          options= {{tabBarIcon: ({ focused }) => (
            <Image source={IMAGES.CANASTA} style={{height: 24, width: 24}}/>
            ),
            }}/>
          <Tab.Screen name="Turnos" component={Turnos}
          options= {{tabBarIcon: ({ focused }) => (
            <Image source={IMAGES.CALENDARIO} style={{height: 24, width: 24}}/>
            ),
            }} />
          <Tab.Screen name="Perfil" component={Perfil}
          options= {{tabBarIcon: ({ focused }) => (
            <Image source={IMAGES.PERFIL} style={{height: 24, width: 24}}/>
            ),
            }} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}
export default App;