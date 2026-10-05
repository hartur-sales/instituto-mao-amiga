import React, {useMemo, useState} from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import {Doacao} from '../entities/doacao';
import {Ponto} from '../entities/ponto';
import DoacaoHistoricoItem from '../components/DoacaoHistoricoItem';
import ResumoDoacoes, {ResumoDoacao} from '../components/ResumoDoacoes';
import {colors, spacing} from '../theme';

type Props = {
    navigation: any;
    doacoes: Doacao[];
    pontos: Ponto[];
};

export default function TelaHistoricoDoacoes({navigation, doacoes, pontos}: Props) {
    const [busca, setBusca] = useState('');
    const doacoesFiltradas = useMemo(() => {
        const termo = busca.trim().toLocaleLowerCase();
        return doacoes.filter((doacao) => doacao.tipoItem.toLocaleLowerCase().includes(termo));
    }, [busca, doacoes]);
    const resumo = useMemo<ResumoDoacao[]>(() => {
        const porTipo = new Map<string, ResumoDoacao>();

        doacoes.forEach((doacao) => {
            const tipoItem = doacao.tipoItem.trim();
            const atual = porTipo.get(tipoItem) ?? {
                tipoItem,
                quantidadeTotal: 0,
                quantidadeDoacoes: 0,
            };

            porTipo.set(tipoItem, {
                tipoItem,
                quantidadeTotal: atual.quantidadeTotal + doacao.quantidade,
                quantidadeDoacoes: atual.quantidadeDoacoes + 1,
            });
        });

        return Array.from(porTipo.values()).sort(
            (a, b) => b.quantidadeTotal - a.quantidadeTotal || a.tipoItem.localeCompare(b.tipoItem),
        );
    }, [doacoes]);

    const nenhumaDoacao = doacoes.length === 0;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ResumoDoacoes totalDoacoes={doacoes.length} resumo={resumo} />
            <TextInput
                style={styles.busca}
                placeholder="Buscar por tipo de item"
                value={busca}
                onChangeText={setBusca}
                returnKeyType="search"
                accessibilityLabel="Filtrar doações por tipo de item"
            />
            <FlatList
                data={doacoesFiltradas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <DoacaoHistoricoItem
                        doacao={item}
                        nomePonto={pontos.find((ponto) => ponto.id === item.pontoDestinoId)?.nome ?? 'Ponto não encontrado'}
                        onPress={() => navigation.navigate('TelaDetalheDoacao', {doacao: item})}
                    />
                )}
                contentContainerStyle={doacoesFiltradas.length ? styles.lista : styles.listaVazia}
                ListEmptyComponent={
                    <View style={styles.vazio}>
                        <Text style={styles.mensagem}>
                            {nenhumaDoacao
                                ? 'Você ainda não registrou nenhuma doação.'
                                : `Nenhuma doação encontrada para "${busca}".`}
                        </Text>
                    </View>
                }
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
            />
            <TouchableOpacity
                accessibilityLabel="Adicionar doação"
                accessibilityRole="button"
                accessibilityHint="Abre o formulário para registrar uma doação"
                style={styles.botaoFlutuante}
                onPress={() => navigation.navigate('TelaCadastroDoacao')}
            >
                <Text style={styles.botaoFlutuanteTexto}>+</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: colors.background},
    busca: {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderRadius: spacing.sm,
        borderWidth: 1,
        color: colors.text,
        margin: spacing.lg,
        minHeight: 44,
        paddingHorizontal: spacing.md,
        paddingVertical: 10,
    },
    lista: {paddingHorizontal: spacing.lg, paddingBottom: 104},
    listaVazia: {flexGrow: 1, padding: spacing.lg, paddingBottom: 104},
    vazio: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    mensagem: {fontSize: 16, color: colors.text, textAlign: 'center', marginBottom: spacing.lg},
    botaoFlutuante: {
        position: 'absolute',
        right: spacing.lg,
        bottom: spacing.lg,
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    botaoFlutuanteTexto: {
        color: colors.surface,
        fontSize: 32,
        fontWeight: '300',
        lineHeight: 34,
    },
});
