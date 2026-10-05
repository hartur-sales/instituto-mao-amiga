import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, spacing} from '../theme';

export type ResumoDoacao = {
    tipoItem: string;
    quantidadeTotal: number;
    quantidadeDoacoes: number;
};

type Props = {
    totalDoacoes: number;
    resumo: ResumoDoacao[];
};

export default function ResumoDoacoes({totalDoacoes, resumo}: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Resumo de doações</Text>
            <Text style={styles.total}>
                Total: {totalDoacoes} {totalDoacoes === 1 ? 'doação' : 'doações'}
            </Text>
            {resumo.length === 0 ? (
                <Text style={styles.vazio}>Nenhuma doação registrada ainda.</Text>
            ) : (
                resumo.map((item) => (
                    <Text key={item.tipoItem} style={styles.item}>
                        {item.tipoItem}: {item.quantidadeTotal}{' '}
                        {item.quantidadeTotal === 1 ? 'unidade' : 'unidades'} em{' '}
                        {item.quantidadeDoacoes}{' '}
                        {item.quantidadeDoacoes === 1 ? 'doação' : 'doações'}
                    </Text>
                ))
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderRadius: spacing.md,
        borderWidth: 1,
        marginBottom: spacing.lg,
        padding: spacing.lg,
    },
    titulo: {color: colors.text, fontSize: 18, fontWeight: 'bold', marginBottom: spacing.sm},
    total: {color: colors.textSecondary, fontSize: 14, marginBottom: spacing.sm},
    item: {color: colors.text, fontSize: 14, marginTop: spacing.sm},
    vazio: {color: colors.textSecondary, fontSize: 14},
});
