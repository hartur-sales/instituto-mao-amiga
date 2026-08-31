import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TelaListaPontos from './TelaListaPontos';
import TelaDetalhePonto from './TelaDetalhePonto';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="TelaListaPontos"
        screenOptions={{
          headerStyle: { backgroundColor: '#2563EB' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold', color: '#FFFFFF' },
          contentStyle: { backgroundColor: '#F5F7FA' },
        }}
      >
        <Stack.Screen
          name="TelaListaPontos"
          component={TelaListaPontos}
          options={{ title: 'Pontos de Coleta' }}
        />
        <Stack.Screen
          name="TelaDetalhePonto"
          component={TelaDetalhePonto}
          options={{ title: 'Detalhes do Ponto' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
