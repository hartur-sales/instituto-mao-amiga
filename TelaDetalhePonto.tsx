import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Ponto, pontoMock} from './TelaListaPontos';

function PontoDetalhe({ponto}: { ponto: Ponto }) {
    return (
        <View style={styles.cardDetalhe}>
            <Text style={styles.nome}>{ponto.nome}</Text>

            <View style={styles.divisor}/>

            <Text style={styles.label}>Endereço</Text>
            <Text style={styles.endereco}>{ponto.endereco}</Text>

            <Text style={styles.label}>Dias e Horários</Text>
            <Text style={styles.diasHorarios}>{ponto.diasHorarios}</Text>

            <Text style={styles.label}>Atendimento</Text>
            <View style={styles.tagFuncionamento}>
                <Text style={styles.funcionamento}>{ponto.funcionamento}</Text>
            </View>
        </View>
    );
}

function TelaDetalhePonto({route}: any) {
    const {pontoId} = route.params;
    const ponto = pontoMock.find((item) => item.id === pontoId);

    if (!ponto) {
        return (
            <View style={styles.container}>
                <Text style={styles.erroText}>Ponto de coleta não encontrado.</Text>
            </View>
        );
    }

    return (
        <View>
            <PontoDetalhe ponto={ponto}/>
        </View>
    );
}

export default TelaDetalhePonto;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    cardDetalhe: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    nome: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 8,
    },
    divisor: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 12,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2563EB',
        marginTop: 12,
        marginBottom: 4,
    },
    endereco: {
        fontSize: 15,
        color: '#4B5563',
        lineHeight: 22,
    },
    diasHorarios: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 20,
    },
    tagFuncionamento: {
        backgroundColor: '#EFF6FF',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginTop: 6,
        alignSelf: 'flex-start',
        borderLeftWidth: 4,
        borderLeftColor: '#2563EB',
    },
    funcionamento: {
        fontSize: 13,
        fontWeight: '600',
        color: '#2563EB',
        lineHeight: 18,
    },
    erroText: {
        color: '#DC2626',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 40,
    },
});
