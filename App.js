import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {PaperProvider} from 'react-native-paper';
import sign_up from './src/Screens/sign_up';
import log_in from './src/Screens/log_in';
import main_menu from './src/Screens/main_menu'
import calculate_footprint from './src/Screens/calculate_footprint';
import result from './src/Screens/result';
import view_profile from './src/Screens/view_profile';
import recomendations from './src/Screens/recomendations';
import history from './src/Screens/history';
import educational from './src/Screens/educational';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="log_in">
          <Stack.Screen
            name="log_in"
            component={log_in}
            options={{ title: 'Iniciar Sesion' }}
          />
          <Stack.Screen
            name="sign_up"
            component={sign_up}
            options={{ title: 'Crear Perfil' }}
          />
          <Stack.Screen
            name="main_menu"
            component={main_menu}
            options={{ title: 'Menu Principal' }}
          />
          <Stack.Screen
            name="view_profile"
            component={view_profile}
            options={{ title: 'Ver Perfil' }}
          />
          <Stack.Screen
            name="calculate_footprint"
            component={calculate_footprint}
            options={{ title: 'Calcular Huella' }}
          />
          <Stack.Screen
            name="result"
            component={result}
            options={{ title: 'Resultado Huella' }}
          />
          <Stack.Screen
            name="recomendations"
            component={recomendations}
            options={{ title: 'Recomendaciones' }}
          />
          <Stack.Screen
            name="history"
            component={history}
            options={{ title: 'Historial de Huellas' }}
          />
          <Stack.Screen
            name="educational"
            component={educational}
            options={{ title: 'Contenido Educativo' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );

}