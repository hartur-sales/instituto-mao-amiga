import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TelaCadastroDoacao from '../screens/TelaCadastroDoacao';
import TelaDetalhePonto from '../screens/TelaDetalhePonto';
import TelaDetalheDoacao from '../screens/TelaDetalheDoacao';
import TelaHistoricoDoacoes from '../screens/TelaHistoricoDoacoes';
import TelaListaPontos from '../screens/TelaListaPontos';
import {Doacao, NovaDoacao} from '../entities/doacao';
import {Ponto} from '../entities/ponto';
import HeaderButton from '../components/HeaderButton';
import {colors} from '../theme';

export type RootStackParamList = {
    TelaListaPontos: undefined;
    TelaDetalhePonto: {pontoId: number};
    TelaCadastroDoacao: {doacao?: Doacao} | undefined;
    TelaDetalheDoacao: {doacao: Doacao};
    TelaHistoricoDoacoes: undefined;
};

type Props = {
    pontos: Ponto[];
    doacoes: Doacao[];
    onAdicionarPonto: (ponto: Ponto) => void;
    onAdicionarDoacao: (doacao: NovaDoacao) => void;
    onEditarDoacao: (doacao: Doacao) => Promise<Doacao[]>;
    onRemoverDoacao: (id: number) => void;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator({
    pontos,
    doacoes,
    onAdicionarPonto,
    onAdicionarDoacao,
    onEditarDoacao,
    onRemoverDoacao,
}: Props) {
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
                                title="Doações"
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
                <Stack.Screen
                    name="TelaCadastroDoacao"
                    options={({route}) => ({
                        title: route.params?.doacao ? 'Editar Doação' : 'Cadastro de Doação',
                    })}
                >
                    {(props) => (
                        <TelaCadastroDoacao
                            {...props}
                            pontos={pontos}
                            doacoes={doacoes}
                            onAdicionarDoacao={onAdicionarDoacao}
                            onEditarDoacao={onEditarDoacao}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen name="TelaDetalheDoacao" options={{title: 'Detalhe da Doação'}}>
                    {(props) => (
                        <TelaDetalheDoacao
                            {...props}
                            nomePonto={pontos.find((ponto) => ponto.id === props.route.params.doacao.pontoDestinoId)?.nome ?? 'Ponto não encontrado'}
                            onExcluir={onRemoverDoacao}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen
                    name="TelaHistoricoDoacoes"
                    options={({navigation}) => ({
                        title: 'Doações',
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
