import React from 'react';
import {StatusBar} from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import {useAppData} from './src/hooks/useAppData';

export default function App() {
    const {pontos, doacoes, adicionarPonto, adicionarDoacao, removerDoacao} = useAppData();

    return (
        <>
            <StatusBar style="light" />
            <AppNavigator
                pontos={pontos}
                doacoes={doacoes}
                onAdicionarPonto={adicionarPonto}
                onAdicionarDoacao={adicionarDoacao}
                onRemoverDoacao={removerDoacao}
            />
        </>
    );
}
