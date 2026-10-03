import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Ponto} from '../entities/ponto';
import {colors, spacing} from '../theme';

export function PontoCard({ponto, onPress}: {ponto: Ponto; onPress: () => void}) {
    return (
        <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress}>
            <Text style={styles.nome}>{ponto.nome}</Text>
            <Text style={styles.endereco}>{ponto.endereco}</Text>
            <Text style={styles.diasHorarios}>{ponto.diasHorarios}</Text>
            <View style={styles.tag}>
                <Text style={styles.funcionamento}>{ponto.funcionamento}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderRadius: spacing.md,
        padding: spacing.lg,
        marginBottom: spacing.lg,
        borderWidth: 1,
        borderColor: colors.border,
        elevation: 2,
    },
    nome: {fontSize: 18, fontWeight: 'bold', color: colors.text, marginBottom: spacing.sm},
    endereco: {fontSize: 14, color: colors.textSecondary, marginBottom: 6, lineHeight: 20},
    diasHorarios: {fontSize: 13, color: colors.textMuted, marginBottom: spacing.md, lineHeight: 18},
    tag: {
        backgroundColor: colors.primaryLight,
        borderRadius: 6,
        paddingVertical: 6,
        paddingHorizontal: 10,
        alignSelf: 'flex-start',
        borderLeftWidth: 3,
        borderLeftColor: colors.primary,
    },
    funcionamento: {fontSize: 12, fontWeight: '600', color: colors.primary},
});
