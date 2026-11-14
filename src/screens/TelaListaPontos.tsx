import React, {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Ponto} from '../entities/ponto';
import {PontoCard} from '../components/PontoCard';
import * as pontosService from '../services/pontosService';
import * as favoritosService from '../services/favoritosService';
import {colors, spacing} from '../theme';

export default function TelaListaPontos({navigation}: any) {
    const [pontos, setPontos] = useState<Ponto[]>([]);
    const [favoritos, setFavoritos] = useState<string[]>([]);
    const [busca, setBusca] = useState('');
    const [pagina, setPagina] = useState(0);
    const [ultima, setUltima] = useState(false);
    const [carregando, setCarregando] = useState(true);
    const [carregandoMais, setCarregandoMais] = useState(false);
    const [erro, setErro] = useState('');

    const carregar = useCallback(async (filtro: string, page: number, substituir: boolean) => {
        if (page > 0) setCarregandoMais(true); else setCarregando(true);
        try {
            const resposta = await pontosService.listarPagina(filtro, page);
            setPontos((atuais) => substituir ? resposta.content : [...atuais, ...resposta.content]);
            setPagina(page);
            setUltima(resposta.page.last);
            setErro('');
        } catch (e) {
            setErro(e instanceof Error ? `Não foi possível carregar os pontos: ${e.message}` : 'Não foi possível carregar os pontos.');
        } finally {
            setCarregando(false);
            setCarregandoMais(false);
        }
    }, []);

    useFocusEffect(useCallback(() => {
        carregar(busca, 0, true);
        favoritosService.listar().then(setFavoritos);
    }, [carregar, busca]));

    function buscar(texto: string) {
        setBusca(texto);
    }

    async function alternarFavorito(id: string) {
        setFavoritos(await favoritosService.alternar(id));
    }

    return <View style={styles.container}>
        <TextInput style={styles.busca} placeholder="Buscar por nome ou bairro" value={busca} onChangeText={buscar}/>
        {carregando ? <ActivityIndicator style={styles.carregando}/> : erro ? <Text style={styles.erro}>{erro}</Text> : <FlatList
            data={pontos}
            keyExtractor={(item) => item.id}
            onEndReached={() => { if (!ultima && !carregandoMais) carregar(busca, pagina + 1, false); }}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={<Text style={styles.vazio}>Nenhum ponto encontrado.</Text>}
            ListFooterComponent={carregandoMais ? <ActivityIndicator/> : null}
            renderItem={({item}) => <View>
                <PontoCard ponto={item} onPress={() => navigation.navigate('TelaDetalhePonto', {pontoId: item.id})}/>
                <TouchableOpacity style={styles.favorito} onPress={() => alternarFavorito(item.id)}>
                    <Text style={styles.favoritoTexto}>{favoritos.includes(item.id) ? '♥' : '♡'}</Text>
                </TouchableOpacity>
            </View>}
            contentContainerStyle={styles.lista}
        />}
        <TouchableOpacity style={styles.meusPontos} onPress={() => navigation.navigate('TelaMeusPontos')}><Text style={styles.meusPontosTexto}>Meus pontos</Text></TouchableOpacity>
        <TouchableOpacity style={styles.adicionar} onPress={() => navigation.navigate('TelaCadastroPonto')}><Text style={styles.adicionarTexto}>+</Text></TouchableOpacity>
    </View>;
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: colors.background},
    busca: {margin: spacing.lg, minHeight: 44, paddingHorizontal: spacing.md, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: spacing.sm},
    carregando: {marginTop: spacing.xl},
    erro: {padding: spacing.lg, color: colors.error},
    vazio: {padding: spacing.lg, textAlign: 'center', color: colors.textSecondary},
    lista: {paddingHorizontal: spacing.lg, paddingBottom: 120},
    favorito: {position: 'absolute', right: spacing.lg, top: spacing.md, minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center'},
    favoritoTexto: {fontSize: 28, color: colors.primary},
    meusPontos: {position: 'absolute', left: spacing.lg, bottom: spacing.lg, minHeight: 44, paddingHorizontal: spacing.md, justifyContent: 'center', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.primary, borderRadius: spacing.sm},
    meusPontosTexto: {color: colors.primary, fontWeight: '600'},
    adicionar: {position: 'absolute', right: spacing.lg, bottom: spacing.lg, width: 58, height: 58, borderRadius: 29, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center'},
    adicionarTexto: {color: colors.surface, fontSize: 32},
});
