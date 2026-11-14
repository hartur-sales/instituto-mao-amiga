import React, {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Doacao} from '../entities/doacao';
import DoacaoHistoricoItem from '../components/DoacaoHistoricoItem';
import * as doacoesService from '../services/doacoesService';
import {colors, spacing} from '../theme';

export default function TelaHistoricoDoacoes({navigation}: any) {
    const [doacoes, setDoacoes] = useState<Doacao[]>([]);
    const [busca, setBusca] = useState('');
    const [pagina, setPagina] = useState(0);
    const [ultima, setUltima] = useState(false);
    const [carregando, setCarregando] = useState(true);
    const [carregandoMais, setCarregandoMais] = useState(false);
    const [erro, setErro] = useState('');
    const carregar = useCallback(async (filtro: string, page: number, substituir: boolean) => {
        if (page === 0) setCarregando(true); else setCarregandoMais(true);
        try {
            const resposta = await doacoesService.listarPagina(filtro, page);
            setDoacoes((atuais) => substituir ? resposta.content : [...atuais, ...resposta.content]);
            setPagina(page); setUltima(resposta.page.last); setErro('');
        } catch (e) { setErro(e instanceof Error ? `Não foi possível carregar as doações: ${e.message}` : 'Não foi possível carregar as doações.'); }
        finally { setCarregando(false); setCarregandoMais(false); }
    }, []);
    useFocusEffect(useCallback(() => { carregar(busca, 0, true); }, [busca, carregar]));
    function buscar(texto: string) { setBusca(texto); }
    return <View style={styles.container}>
        <TextInput style={styles.busca} placeholder="Buscar por tipo de item" value={busca} onChangeText={buscar}/>
        {carregando ? <ActivityIndicator/> : erro ? <Text style={styles.erro}>{erro}</Text> : <FlatList data={doacoes} keyExtractor={(item) => item.id}
            onEndReached={() => {if (!ultima && !carregandoMais) carregar(busca, pagina + 1, false);}} onEndReachedThreshold={0.5}
            ListEmptyComponent={<Text style={styles.vazio}>Nenhuma doação encontrada.</Text>}
            renderItem={({item}) => <DoacaoHistoricoItem doacao={item} nomePonto={item.pontoDestino} onPress={() => navigation.navigate('TelaDetalheDoacao', {doacaoId: item.id})}/>}
            contentContainerStyle={styles.lista}/>}
        <TouchableOpacity style={styles.adicionar} onPress={() => navigation.navigate('TelaCadastroDoacao')}><Text style={styles.adicionarTexto}>+</Text></TouchableOpacity>
    </View>;
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: colors.background},
    busca: {margin: spacing.lg, minHeight: 44, paddingHorizontal: spacing.md, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: spacing.sm},
    erro: {padding: spacing.lg, color: colors.error}, vazio: {padding: spacing.lg, textAlign: 'center'}, lista: {paddingHorizontal: spacing.lg, paddingBottom: 100},
    adicionar: {position: 'absolute', right: spacing.lg, bottom: spacing.lg, width: 58, height: 58, borderRadius: 29, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center'},
    adicionarTexto: {color: colors.surface, fontSize: 32},
});
