import React, {memo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Doacao} from '../entities/doacao';
import {colors, spacing} from '../theme';

type Props = {
    doacao: Doacao;
    nomePonto: string;
    onPress: () => void;
};

function DoacaoHistoricoItem({doacao, nomePonto, onPress}: Props) {
    const data = new Date(doacao.criadoEm).toLocaleString('pt-BR');

    return (
        <Pressable style={styles.card} onPress={onPress} accessibilityRole="button">
            <Text style={styles.tipoItem}>{doacao.tipoItem}</Text>
            <Text style={styles.detalhe}>Quantidade: {doacao.quantidade}</Text>
            <Text style={styles.detalhe}>Destino: {nomePonto}</Text>
            <Text style={styles.data}>Registrada em {data}</Text>
        </Pressable>
    );
}

export default memo(DoacaoHistoricoItem);

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderRadius: spacing.md,
        padding: spacing.lg,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
        elevation: 2,
    },
    tipoItem: {fontSize: 16, fontWeight: 'bold', color: colors.text, marginBottom: spacing.sm},
    detalhe: {fontSize: 14, color: colors.textSecondary, marginBottom: 4},
    data: {fontSize: 12, color: colors.textSecondary, marginTop: spacing.sm},
});
