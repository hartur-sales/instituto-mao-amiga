import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaListaPontos, {pontoMock, Ponto} from './TelaListaPontos';
import TelaDetalhePonto from './TelaDetalhePonto';
const Stack = createNativeStackNavigator();

export default function App() {
  const [pontos, setPontos] = useState<Ponto[]>(pontoMock);

  function adicionarPonto(ponto: Ponto) {
    setPontos((atual) => [...atual, ponto]);
  }

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
        <Stack.Screen name="TelaListaPontos" options={{ title: 'Pontos de Coleta' }}>
          {(props) => (
            <TelaListaPontos {...props} pontos={pontos} onAdicionarPonto={adicionarPonto} />
          )}
        </Stack.Screen>
        <Stack.Screen name="TelaDetalhePonto" options={{ title: 'Detalhes do Ponto' }}>
          {(props) => <TelaDetalhePonto {...props} pontos={pontos} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
