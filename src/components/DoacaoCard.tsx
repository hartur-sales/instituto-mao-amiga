import {StyleSheet, Text, View} from 'react-native';
import {Doacao} from '../entities/doacao';
import {colors, spacing} from '../theme';

export function DoacaoCard({doacao, nomePonto}: {doacao: Doacao; nomePonto: string}) {
    return (
        <View style={styles.card}>
            <Text style={styles.tipoItem}>{doacao.tipoItem}</Text>
            <Text style={styles.quantidade}>Quantidade: {doacao.quantidade}</Text>
            <View style={styles.tag}>
                <Text style={styles.ponto}>Destino: {nomePonto}</Text>
            </View>
        </View>
    );
}

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
    tipoItem: {fontSize: 16, fontWeight: 'bold', color: colors.text, marginBottom: 4},
    quantidade: {fontSize: 14, color: colors.textSecondary, marginBottom: spacing.sm},
    tag: {
        backgroundColor: colors.primaryLight,
        borderRadius: 6,
        paddingVertical: 6,
        paddingHorizontal: 10,
        alignSelf: 'flex-start',
        borderLeftWidth: 3,
        borderLeftColor: colors.primary,
    },
    ponto: {fontSize: 12, fontWeight: '600', color: colors.primary},
});
