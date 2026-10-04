import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TelaCadastroDoacao from '../screens/TelaCadastroDoacao';
import TelaDetalhePonto from '../screens/TelaDetalhePonto';
import TelaHistoricoDoacoes from '../screens/TelaHistoricoDoacoes';
import TelaListaPontos from '../screens/TelaListaPontos';
import {Doacao, NovaDoacao} from '../entities/doacao';
import {Ponto} from '../entities/ponto';
import HeaderButton from '../components/HeaderButton';
import {colors} from '../theme';

type Props = {
    pontos: Ponto[];
    doacoes: Doacao[];
    onAdicionarPonto: (ponto: Ponto) => void;
    onAdicionarDoacao: (doacao: NovaDoacao) => void;
};

const Stack = createNativeStackNavigator();

export default function AppNavigator({pontos, doacoes, onAdicionarPonto, onAdicionarDoacao}: Props) {
    return (
        <NavigationContainer>
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
                    options={({navigation}) => ({
                        title: 'Pontos de Coleta',
                        headerRight: () => (
                            <HeaderButton
                                title="Minhas doações"
                                onPress={() => navigation.navigate('TelaHistoricoDoacoes')}
                            />
                        ),
                    })}
                >
                    {(props) => (
                        <TelaListaPontos {...props} pontos={pontos} onAdicionarPonto={onAdicionarPonto} />
                    )}
                </Stack.Screen>
                <Stack.Screen name="TelaDetalhePonto" options={{title: 'Detalhes do Ponto'}}>
                    {(props) => <TelaDetalhePonto {...props} pontos={pontos} />}
                </Stack.Screen>
                <Stack.Screen name="TelaCadastroDoacao" options={{title: 'Cadastro de Doação'}}>
                    {(props) => (
                        <TelaCadastroDoacao
                            {...props}
                            pontos={pontos}
                            doacoes={doacoes}
                            onAdicionarDoacao={onAdicionarDoacao}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen
                    name="TelaHistoricoDoacoes"
                    options={({navigation}) => ({
                        title: 'Minhas doações',
                        headerRight: () => (
                            <HeaderButton
                                title="Pontos"
                                onPress={() => navigation.navigate('TelaListaPontos')}
                            />
                        ),
                    })}
                >
                    {(props) => (
                        <TelaHistoricoDoacoes {...props} pontos={pontos} doacoes={doacoes} />
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
