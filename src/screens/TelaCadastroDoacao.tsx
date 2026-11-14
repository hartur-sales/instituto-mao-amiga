import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Doacao, DoacaoRequest} from '../entities/doacao';
import {Ponto} from '../entities/ponto';
import * as doacoesService from '../services/doacoesService';
import * as pontosService from '../services/pontosService';
import {colors, spacing} from '../theme';

export default function TelaCadastroDoacao({navigation, route}: any) {
    const id = route.params?.doacaoId as string | undefined;
    const [pontos, setPontos] = useState<Ponto[]>([]);
    const [doacao, setDoacao] = useState<DoacaoRequest>({tipoItem: '', quantidade: 0, pontoDestino: ''});
    const [erro, setErro] = useState('');
    useEffect(() => {
        pontosService.listar(0, 100).then((resposta) => setPontos(resposta.content)).catch((e) => setErro(e.message));
        if (id) doacoesService.buscarPorId(id).then(({id: _id, criadoEm: _criado, ...dados}) => setDoacao(dados)).catch((e) => setErro(e.message));
    }, [id]);
    async function salvar() {
        if (!doacao.tipoItem.trim() || !doacao.pontoDestino || !Number.isInteger(doacao.quantidade) || doacao.quantidade <= 0) {
            setErro('Preencha o tipo, a quantidade e o ponto de destino.');
            return;
        }
        try {
            if (id) await doacoesService.editar(id, doacao); else await doacoesService.cadastrar(doacao);
            navigation.goBack();
        } catch (e) { setErro(e instanceof Error ? e.message : 'Não foi possível salvar a doação.'); }
    }
    return <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.conteudo}>
            <TextInput style={styles.input} placeholder="Tipo do item" value={doacao.tipoItem} onChangeText={(valor) => setDoacao({...doacao, tipoItem: valor})}/>
            <TextInput style={styles.input} placeholder="Quantidade" keyboardType="number-pad" value={doacao.quantidade ? String(doacao.quantidade) : ''} onChangeText={(valor) => setDoacao({...doacao, quantidade: Number(valor.replace(/[^0-9]/g, ''))})}/>
            <Text style={styles.rotulo}>Ponto de destino</Text>
            {pontos.map((ponto) => <TouchableOpacity key={ponto.id} style={[styles.ponto, doacao.pontoDestino === ponto.nome && styles.selecionado]} onPress={() => setDoacao({...doacao, pontoDestino: ponto.nome})}><Text>{ponto.nome}</Text></TouchableOpacity>)}
        </ScrollView>
        <View style={styles.rodape}>
            {!!erro && <Text style={styles.erro}>{erro}</Text>}
            <TouchableOpacity style={styles.botao} onPress={salvar}><Text style={styles.botaoTexto}>{id ? 'Salvar alterações' : 'Registrar doação'}</Text></TouchableOpacity>
        </View>
    </View>;
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: colors.background},
    conteudo: {padding: spacing.lg, gap: spacing.sm, paddingBottom: spacing.lg},
    input: {minHeight: 44, paddingHorizontal: spacing.md, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: spacing.sm},
    rotulo: {fontWeight: '600', marginTop: spacing.sm},
    ponto: {minHeight: 44, justifyContent: 'center', paddingHorizontal: spacing.md, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: spacing.sm},
    selecionado: {borderColor: colors.primary, backgroundColor: colors.primaryLight},
    erro: {color: colors.error},
    rodape: {padding: spacing.lg, paddingTop: spacing.sm, backgroundColor: colors.background},
    botao: {minHeight: 44, justifyContent: 'center', alignItems: 'center', marginTop: spacing.sm, backgroundColor: colors.primary, borderRadius: spacing.sm},
    botaoTexto: {color: colors.surface, fontWeight: '600'},
});
