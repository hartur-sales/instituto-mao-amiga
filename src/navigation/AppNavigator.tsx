import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TelaCadastroDoacao from '../screens/TelaCadastroDoacao';
import TelaCadastroPonto from '../screens/TelaCadastroPonto';
import TelaDetalhePonto from '../screens/TelaDetalhePonto';
import TelaDetalheDoacao from '../screens/TelaDetalheDoacao';
import TelaHistoricoDoacoes from '../screens/TelaHistoricoDoacoes';
import TelaListaPontos from '../screens/TelaListaPontos';
import TelaMeusPontos from '../screens/TelaMeusPontos';
import HeaderButton from '../components/HeaderButton';
import {colors} from '../theme';

export type RootStackParamList = {
    TelaListaPontos: undefined;
    TelaDetalhePonto: {pontoId: string};
    TelaCadastroPonto: {pontoId?: string} | undefined;
    TelaCadastroDoacao: {doacaoId?: string} | undefined;
    TelaDetalheDoacao: {doacaoId: string};
    TelaHistoricoDoacoes: undefined;
    TelaMeusPontos: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle: {backgroundColor: colors.primary},
                headerTintColor: colors.surface,
                headerTitleStyle: {fontWeight: 'bold', color: colors.surface},
                contentStyle: {backgroundColor: colors.background},
            }}>
                <Stack.Screen name="TelaListaPontos" component={TelaListaPontos} options={({navigation}) => ({
                    title: 'Pontos de Coleta',
                    headerRight: () => <HeaderButton title="Doações" onPress={() => navigation.navigate('TelaHistoricoDoacoes')} />,
                })}/>
                <Stack.Screen name="TelaDetalhePonto" component={TelaDetalhePonto} options={{title: 'Detalhes do Ponto'}}/>
                <Stack.Screen name="TelaCadastroPonto" component={TelaCadastroPonto} options={({route}) => ({
                    title: route.params?.pontoId ? 'Editar ponto' : 'Cadastrar ponto',
                })}/>
                <Stack.Screen name="TelaCadastroDoacao" component={TelaCadastroDoacao} options={({route}) => ({
                    title: route.params?.doacaoId ? 'Editar doação' : 'Cadastrar doação',
                })}/>
                <Stack.Screen name="TelaDetalheDoacao" component={TelaDetalheDoacao} options={{title: 'Detalhe da doação'}}/>
                <Stack.Screen name="TelaHistoricoDoacoes" component={TelaHistoricoDoacoes} options={({navigation}) => ({
                    title: 'Doações',
                    headerRight: () => <HeaderButton title="Pontos" onPress={() => navigation.navigate('TelaListaPontos')} />,
                })}/>
                <Stack.Screen name="TelaMeusPontos" component={TelaMeusPontos} options={{title: 'Meus pontos'}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
