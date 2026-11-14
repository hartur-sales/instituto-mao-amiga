import React, {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Ponto} from '../entities/ponto';
import * as pontosService from '../services/pontosService';
import {colors, spacing} from '../theme';

export default function TelaDetalhePonto({navigation, route}: any) {
    const [ponto, setPonto] = useState<Ponto | null>(null);
    const [erro, setErro] = useState('');
    const id = route.params.pontoId as string;
    const carregar = useCallback(() => {
        setErro('');
        pontosService.buscarPorId(id)
            .then(setPonto)
            .catch((e) => setErro(e.message.includes('404') ? 'Ponto não encontrado.' : e.message));
    }, [id]);
    useFocusEffect(carregar);
    if (erro) return <View style={styles.container}><Text style={styles.erro}>{erro}</Text></View>;
    if (!ponto) return <View style={styles.container}><Text>Carregando...</Text></View>;
    return <View style={styles.container}><View style={styles.card}>
        <Text style={styles.nome}>{ponto.nome}</Text><Text>Endereço: {ponto.endereco}</Text><Text>Bairro: {ponto.bairro}</Text><Text>Horário: {ponto.horario}</Text><Text>Tipo: {ponto.tipo}</Text>
    </View>
    <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('TelaCadastroPonto', {pontoId: id})}><Text style={styles.botaoTexto}>Editar ponto</Text></TouchableOpacity>
    <TouchableOpacity style={styles.excluir} onPress={() => Alert.alert('Excluir ponto', 'Tem certeza?', [{text: 'Cancelar', style: 'cancel'}, {text: 'Excluir', style: 'destructive', onPress: async () => { try { await pontosService.excluir(id); navigation.goBack(); } catch (e) { setErro(e instanceof Error ? e.message : 'Não foi possível excluir.'); } }}])}><Text style={styles.botaoTexto}>Excluir ponto</Text></TouchableOpacity>
    </View>;
}

const styles = StyleSheet.create({
    container: {flex: 1, padding: spacing.lg, backgroundColor: colors.background},
    card: {padding: spacing.lg, gap: spacing.md, backgroundColor: colors.surface, borderRadius: spacing.md, borderWidth: 1, borderColor: colors.border},
    nome: {fontSize: 22, fontWeight: 'bold', color: colors.text},
    erro: {color: colors.error, textAlign: 'center', marginTop: spacing.xl},
    botao: {minHeight: 44, marginTop: spacing.lg, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.primary, borderRadius: spacing.sm},
    excluir: {minHeight: 44, marginTop: spacing.sm, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.error, borderRadius: spacing.sm},
    botaoTexto: {color: colors.surface, fontWeight: '600'},
});
