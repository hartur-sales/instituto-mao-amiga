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
                    />
                )}
                contentContainerStyle={doacoes.length ? styles.lista : styles.listaVazia}
                ListEmptyComponent={
                    <View style={styles.vazio}>
                        <Text style={styles.mensagem}>Você ainda não registrou nenhuma doação.</Text>
                        <TouchableOpacity
                            style={styles.botao}
                            onPress={() => navigation.navigate('TelaCadastroDoacao')}
                        >
                            <Text style={styles.botaoTexto}>Registrar doação</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: colors.background},
    lista: {padding: spacing.lg, paddingBottom: 32},
    listaVazia: {flexGrow: 1, padding: spacing.lg},
    vazio: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    mensagem: {fontSize: 16, color: colors.text, textAlign: 'center', marginBottom: spacing.lg},
    botao: {
        backgroundColor: colors.primary,
        borderRadius: spacing.sm,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 44,
        paddingHorizontal: spacing.lg,
    },
    botaoTexto: {color: colors.surface, fontWeight: '600'},
});
