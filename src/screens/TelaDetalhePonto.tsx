import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Ponto} from '../entities/ponto';
import {colors, spacing} from '../theme';

export default function TelaDetalhePonto({route, pontos}: {route: any; pontos: Ponto[]}) {
    const ponto = pontos.find((item) => item.id === route.params.pontoId);

    if (!ponto) {
        return (
            <View style={styles.container}>
                <Text style={styles.erro}>Ponto de coleta não encontrado.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.nome}>{ponto.nome}</Text>
                <View style={styles.divisor}/>
                <Text style={styles.label}>Endereço</Text>
                <Text style={styles.valor}>{ponto.endereco}</Text>
                <Text style={styles.label}>Dias e Horários</Text>
                <Text style={styles.valor}>{ponto.diasHorarios}</Text>
                <Text style={styles.label}>Atendimento</Text>
                <View style={styles.tagFuncionamento}>
                    <Text style={styles.funcionamento}>{ponto.funcionamento}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: colors.background, padding: spacing.lg},
    card: {
        backgroundColor: colors.surface,
        borderRadius: spacing.lg,
        padding: spacing.xl,
        borderWidth: 1,
        borderColor: colors.border,
        elevation: 2,
    },
    nome: {fontSize: 22, fontWeight: 'bold', color: colors.text, marginBottom: spacing.sm},
    divisor: {height: 1, backgroundColor: colors.border, marginVertical: spacing.md},
    label: {fontSize: 14, fontWeight: 'bold', color: colors.primary, marginTop: spacing.md, marginBottom: 4},
    valor: {fontSize: 15, color: colors.textSecondary, lineHeight: 22},
    tagFuncionamento: {
        backgroundColor: colors.primaryLight,
        borderRadius: spacing.sm,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        marginTop: 6,
        alignSelf: 'flex-start',
        borderLeftWidth: 4,
        borderLeftColor: colors.primary,
    },
    funcionamento: {fontSize: 13, fontWeight: '600', color: colors.primary, lineHeight: 18},
    erro: {color: colors.error, fontSize: 16, textAlign: 'center', marginTop: 40},
});
