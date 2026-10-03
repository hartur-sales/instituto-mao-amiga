import React, {useEffect, useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, TouchableOpacity} from 'react-native';
import TelaListaPontos from './src/screens/TelaListaPontos';
import TelaDetalhePonto from './src/screens/TelaDetalhePonto';
import TelaCadastroDoacao from './src/screens/TelaCadastroDoacao';
import {Ponto} from './src/entities/ponto';
import {Doacao} from './src/entities/doacao';
import {pontosMock} from './src/mockdata/pontosMock';
import {listarDoacoes, salvarDoacao} from './src/services/doacoesStorage';
import {colors} from './src/theme';

const Stack = createNativeStackNavigator();
export default function App() {
    const [pontos, setPontos] = useState<Ponto[]>(pontosMock);
    const [doacoes, setDoacoes] = useState<Doacao[]>([]);

    useEffect(() => {
        listarDoacoes().then(setDoacoes);
    }, []);

    function adicionarPonto(ponto: Ponto) {
        setPontos((atual) => [...atual, ponto]);
    }

    function adicionarDoacao(doacao: Doacao) {
        salvarDoacao(doacao).then(setDoacoes);
    }

    return (
        <NavigationContainer>
            <StatusBar style="light" />
            <Stack.Navigator
                initialRouteName="TelaListaPontos"
                screenOptions={{
                    headerStyle: {backgroundColor: colors.primary},
                    headerTintColor: colors.surface,
                    headerTitleStyle: {fontWeight: 'bold', color: colors.surface},
                    contentStyle: {backgroundColor: colors.background},
                }}
            >
                <Stack.Screen
                    name="TelaListaPontos"
                    options={({ navigation }) => ({
                        title: 'Pontos de Coleta',
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('TelaCadastroDoacao')}
                                style={{
                                    minWidth: 80,
                                    minHeight: 44,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 8,
                                }}
                            >
                                <Text
                                    style={{
                                        color: colors.surface,
                                        fontWeight: '600',
                                        textAlign: 'center',
                                    }}
                                >
                                    + Doação
                                </Text>
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
