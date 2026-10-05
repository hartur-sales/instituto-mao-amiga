import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Doacao} from '../entities/doacao';
import {Ponto} from '../entities/ponto';
import DoacaoHistoricoItem from '../components/DoacaoHistoricoItem';
import {colors, spacing} from '../theme';

type Props = {
    navigation: any;
    doacoes: Doacao[];
    pontos: Ponto[];
};

export default function TelaHistoricoDoacoes({navigation, doacoes, pontos}: Props) {
    return (
        <View style={styles.container}>
            <FlatList
                data={doacoes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <DoacaoHistoricoItem
                        doacao={item}
                        nomePonto={pontos.find((ponto) => ponto.id === item.pontoDestinoId)?.nome ?? 'Ponto não encontrado'}
                        onPress={() => navigation.navigate('TelaDetalheDoacao', {doacao: item})}
                    />
                )}
                contentContainerStyle={doacoes.length ? styles.lista : styles.listaVazia}
                ListEmptyComponent={
                    <View style={styles.vazio}>
                        <Text style={styles.mensagem}>Você ainda não registrou nenhuma doação.</Text>
                    </View>
                }
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: colors.background},
    lista: {padding: spacing.lg, paddingBottom: 32},
    listaVazia: {flexGrow: 1, padding: spacing.lg},
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
