import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TouchableOpacity } from 'react-native';
import TelaListaPontos, {pontoMock, Ponto} from './TelaListaPontos';
import TelaDetalhePonto from './TelaDetalhePonto';
import TelaCadastroDoacao, {Doacao} from './TelaCadastroDoacao';

const Stack = createNativeStackNavigator();

export default function App() {
    const [pontos, setPontos] = useState<Ponto[]>(pontoMock);
    const [doacoes, setDoacoes] = useState<Doacao[]>([]);

    function adicionarPonto(ponto: Ponto) {
        setPontos((atual) => [...atual, ponto]);
    }

    function adicionarDoacao(doacao: Doacao) {
        setDoacoes((atual) => [...atual, doacao]);
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
                <Stack.Screen
                    name="TelaListaPontos"
                    options={({ navigation }) => ({
                        title: 'Pontos de Coleta',
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('TelaCadastroDoacao')}
                                style={{ paddingHorizontal: 4, paddingVertical: 4 }}
                            >
                                <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>+ Doação</Text>
                            </TouchableOpacity>
                        ),
                    })}
                >
                    {(props) => (
                        <TelaListaPontos {...props} pontos={pontos} onAdicionarPonto={adicionarPonto} />
                    )}
                </Stack.Screen>
                <Stack.Screen name="TelaDetalhePonto" options={{ title: 'Detalhes do Ponto' }}>
                    {(props) => <TelaDetalhePonto {...props} pontos={pontos} />}
                </Stack.Screen>
                <Stack.Screen name="TelaCadastroDoacao" options={{ title: 'Cadastro de Doação' }}>
                    {(props) => (
                        <TelaCadastroDoacao
                            {...props}
                            pontos={pontos}
                            doacoes={doacoes}
                            onAdicionarDoacao={adicionarDoacao}
                        />
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}