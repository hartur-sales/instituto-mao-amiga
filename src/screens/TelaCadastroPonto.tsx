import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Ponto, PontoRequest} from '../entities/ponto';
import * as pontosService from '../services/pontosService';
import {colors, spacing} from '../theme';

export default function TelaCadastroPonto({navigation, route}: any) {
    const [ponto, setPonto] = useState<PontoRequest>({nome: '', endereco: '', bairro: '', horario: '', tipo: 'coleta'});
    const [erro, setErro] = useState('');
    const id = route.params?.pontoId as string | undefined;

    useEffect(() => {
        if (id) pontosService.buscarPorId(id).then(({id: _id, ...dados}) => setPonto(dados)).catch((e) => setErro(e.message));
    }, [id]);

    function atualizar(campo: keyof PontoRequest, valor: string) {
        setPonto((atual) => ({...atual, [campo]: valor}));
    }

    async function salvar() {
        if (Object.values(ponto).some((valor) => !valor.trim())) {
            setErro('Preencha todos os campos.');
            return;
        }
        try {
            if (id) await pontosService.editar(id, ponto);
            else await pontosService.cadastrar(ponto);
            navigation.goBack();
        } catch (e) {
            setErro(e instanceof Error ? e.message : 'Não foi possível salvar o ponto.');
        }
    }

    return <View style={styles.container}>
        {(['nome', 'endereco', 'bairro', 'horario'] as const).map((campo) => (
            <TextInput key={campo} style={styles.input} placeholder={campo === 'horario' ? 'Horário' : campo[0].toUpperCase() + campo.slice(1)}
                value={ponto[campo]} onChangeText={(valor) => atualizar(campo, valor)}/>
        ))}
        <Text style={styles.rotulo}>Tipo</Text>
        <View style={styles.tipos}>
            {(['coleta', 'distribuição'] as const).map((tipo) => <TouchableOpacity key={tipo}
                style={[styles.tipo, ponto.tipo === tipo && styles.tipoSelecionado]} onPress={() => atualizar('tipo', tipo)}>
                <Text>{tipo}</Text>
            </TouchableOpacity>)}
        </View>
        {!!erro && <Text style={styles.erro}>{erro}</Text>}
        <TouchableOpacity style={styles.botao} onPress={salvar}><Text style={styles.botaoTexto}>{id ? 'Salvar alterações' : 'Cadastrar ponto'}</Text></TouchableOpacity>
    </View>;
}

const styles = StyleSheet.create({
    container: {flex: 1, padding: spacing.lg, gap: spacing.sm, backgroundColor: colors.background},
    input: {backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: spacing.sm, minHeight: 44, paddingHorizontal: spacing.md},
    rotulo: {fontWeight: '600', color: colors.text},
    tipos: {flexDirection: 'row', gap: spacing.sm},
    tipo: {flex: 1, minHeight: 44, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: spacing.sm, backgroundColor: colors.surface},
    tipoSelecionado: {backgroundColor: colors.primaryLight, borderColor: colors.primary},
    erro: {color: colors.error},
    botao: {minHeight: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary, borderRadius: spacing.sm, marginTop: spacing.sm},
    botaoTexto: {color: colors.surface, fontWeight: '600'},
});
