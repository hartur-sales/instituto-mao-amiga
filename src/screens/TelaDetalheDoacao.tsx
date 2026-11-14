import React, {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Doacao} from '../entities/doacao';
import * as doacoesService from '../services/doacoesService';
import {colors, spacing} from '../theme';

export default function TelaDetalheDoacao({navigation, route}: any) {
    const id = route.params.doacaoId as string;
    const [doacao, setDoacao] = useState<Doacao | null>(null);
    const [erro, setErro] = useState('');
    const carregar = useCallback(() => {
        setErro('');
        doacoesService.buscarPorId(id)
            .then(setDoacao)
            .catch((e) => setErro(e.message.includes('404') ? 'Doação não encontrada.' : e.message));
    }, [id]);
    useFocusEffect(carregar);
    if (erro) return <View style={styles.container}><Text style={styles.erro}>{erro}</Text></View>;
    if (!doacao) return <View style={styles.container}><Text>Carregando...</Text></View>;
    return <View style={styles.container}><View style={styles.card}><Text style={styles.tipo}>{doacao.tipoItem}</Text><Text>Quantidade: {doacao.quantidade}</Text><Text>Ponto de destino: {doacao.pontoDestino}</Text><Text>Data: {new Date(doacao.criadoEm).toLocaleString('pt-BR')}</Text></View>
        <TouchableOpacity style={styles.editar} onPress={() => navigation.navigate('TelaCadastroDoacao', {doacaoId: id})}><Text style={styles.editarTexto}>Editar doação</Text></TouchableOpacity>
        <TouchableOpacity style={styles.excluir} onPress={() => Alert.alert('Excluir doação', 'Tem certeza?', [{text: 'Cancelar', style: 'cancel'}, {text: 'Excluir', style: 'destructive', onPress: async () => {try {await doacoesService.excluir(id); navigation.goBack();} catch (e) {setErro(e instanceof Error ? e.message : 'Não foi possível excluir.');}}}])}><Text style={styles.excluirTexto}>Excluir doação</Text></TouchableOpacity>
    </View>;
}

const styles = StyleSheet.create({
    container: {flex: 1, padding: spacing.lg, gap: spacing.md, backgroundColor: colors.background},
    card: {padding: spacing.lg, gap: spacing.md, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: spacing.md},
    tipo: {fontSize: 22, fontWeight: 'bold'}, erro: {color: colors.error, textAlign: 'center', marginTop: spacing.xl},
    editar: {minHeight: 44, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.primary, borderRadius: spacing.sm},
    editarTexto: {color: colors.primary, fontWeight: '600'}, excluir: {minHeight: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.error, borderRadius: spacing.sm},
    excluirTexto: {color: colors.surface, fontWeight: '600'},
});
