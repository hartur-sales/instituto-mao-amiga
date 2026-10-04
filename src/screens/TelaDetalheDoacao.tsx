import React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/AppNavigator';
import {colors, spacing} from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'TelaDetalheDoacao'> & {
    nomePonto: string;
    onExcluir: (id: number) => void;
};

export default function TelaDetalheDoacao({navigation, route, nomePonto, onExcluir}: Props) {
    const {doacao} = route.params;
    const data = new Date(doacao.criadoEm).toLocaleString('pt-BR');

    function confirmarExclusao() {
        Alert.alert(
            'Excluir doação',
            'Tem certeza que deseja excluir esta doação?',
            [
                {text: 'Cancelar', style: 'cancel'},
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: () => {
                        onExcluir(doacao.id);
                        navigation.goBack();
                    },
                },
            ],
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.tipo}>{doacao.tipoItem}</Text>
                <Text style={styles.campo}>Quantidade: {doacao.quantidade}</Text>
                <Text style={styles.campo}>Ponto de destino: {nomePonto}</Text>
                <Text style={styles.campo}>Data: {data}</Text>
            </View>
            <TouchableOpacity style={styles.botaoExcluir} onPress={confirmarExclusao}>
                <Text style={styles.botaoTexto}>Excluir doação</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: colors.background, padding: spacing.lg},
    card: {
        backgroundColor: colors.surface,
        borderRadius: spacing.md,
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: colors.border,
    },
    tipo: {fontSize: 20, fontWeight: 'bold', color: colors.text, marginBottom: spacing.lg},
    campo: {fontSize: 16, color: colors.text, marginBottom: spacing.md},
    botaoExcluir: {
        backgroundColor: colors.error,
        borderRadius: spacing.sm,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 44,
        marginTop: spacing.lg,
    },
    botaoTexto: {color: colors.surface, fontWeight: '600'},
});
