import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedStack from './screens/FeedStack';
import  Canasta  from './screens/Canasta';
import  Turnos  from './screens/Turnos';
import  Perfil from './screens/Perfil';
import LoginScreen from './screens/login.screen';
import * as React from 'react';
import { View, Text, Image, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import IMAGES from './index';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthContextProvider from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';


const Tab = createBottomTabNavigator();

function App() {
  return (
    <ThemeProvider>
    <AuthContextProvider>
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Login" component={LoginScreen} 
          options= {{tabBarIcon: ({ focused }) => (
          <Image source={IMAGES.HOME} style={{height: 24, width: 24}}/>
          ),
          }}/>
          <Tab.Screen name="Home" component={FeedStack} 
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
    </AuthContextProvider>
    </ThemeProvider>
  );
}
export default App;