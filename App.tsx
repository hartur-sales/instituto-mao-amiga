import React, {useEffect, useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TelaListaPontos from './src/screens/TelaListaPontos';
import TelaDetalhePonto from './src/screens/TelaDetalhePonto';
import TelaCadastroDoacao from './src/screens/TelaCadastroDoacao';
import {Ponto} from './src/entities/ponto';
import {Doacao, NovaDoacao} from './src/entities/doacao';
import {listarPontos, salvarPonto} from './src/services/pontosStorage';
import {colors} from './src/theme';
import {listarDoacoes, salvarDoacao} from "./src/services/doacoesStorage";

const Stack = createNativeStackNavigator();
export default function App() {
    const [pontos, setPontos] = useState<Ponto[]>([]);
    const [doacoes, setDoacoes] = useState<Doacao[]>([]);

    useEffect(() => {
        listarPontos().then(setPontos);
        listarDoacoes().then(setDoacoes);
    }, []);


    function adicionarPonto(ponto: Ponto) {
        salvarPonto(ponto).then(setPontos);
    }
    function adicionarDoacao(doacao: NovaDoacao) {
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
                    options={{title: 'Pontos de Coleta'}}
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
