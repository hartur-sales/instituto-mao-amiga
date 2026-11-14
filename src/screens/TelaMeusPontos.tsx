import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Ponto} from '../entities/ponto';
import {PontoCard} from '../components/PontoCard';
import * as pontosService from '../services/pontosService';
import * as favoritosService from '../services/favoritosService';
import {colors, spacing} from '../theme';

export default function TelaMeusPontos({navigation}: any) {
    const [pontos, setPontos] = useState<Ponto[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    const carregar = useCallback(async () => {
        try {
            const ids = await favoritosService.listar();
            const resultados = await Promise.all(ids.map((id) => pontosService.buscarPorId(id).catch(() => null)));
            setPontos(resultados.filter((ponto): ponto is Ponto => ponto !== null));
        } catch (e) {
            setErro(e instanceof Error ? e.message : 'Não foi possível carregar os favoritos.');
        } finally {
            setCarregando(false);
        }
    }, []);
    useEffect(() => { carregar(); }, [carregar]);
    async function remover(id: string) {
        await favoritosService.remover(id);
        setPontos((atuais) => atuais.filter((ponto) => ponto.id !== id));
    }
    if (carregando) return <ActivityIndicator style={styles.carregando}/>;
    if (erro) return <Text style={styles.erro}>{erro}</Text>;
    return <FlatList data={pontos} keyExtractor={(item) => item.id} contentContainerStyle={pontos.length ? styles.lista : styles.vazio}
        ListEmptyComponent={<Text>Nenhum ponto favorito.</Text>}
        renderItem={({item}) => <View><PontoCard ponto={item} onPress={() => navigation.navigate('TelaDetalhePonto', {pontoId: item.id})}/><TouchableOpacity style={styles.remover} onPress={() => remover(item.id)}><Text style={styles.removerTexto}>♥ Desmarcar</Text></TouchableOpacity></View>}/>;
}

const styles = StyleSheet.create({
    carregando: {marginTop: spacing.xl},
    erro: {padding: spacing.lg, color: colors.error},
    lista: {padding: spacing.lg},
    vazio: {flexGrow: 1, alignItems: 'center', justifyContent: 'center'},
    remover: {alignSelf: 'flex-end', marginTop: -spacing.md, marginBottom: spacing.md, minHeight: 44, justifyContent: 'center', paddingHorizontal: spacing.md},
    removerTexto: {color: colors.primary, fontWeight: '600'},
});
