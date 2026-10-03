import AsyncStorage from '@react-native-async-storage/async-storage';
import {Doacao, NovaDoacao} from '../entities/doacao';

const CHAVE_DOACOES = '@pontos_coleta:doacoes';

export async function listarDoacoes(): Promise<Doacao[]> {
    const salvo = await AsyncStorage.getItem(CHAVE_DOACOES);
    return salvo ? JSON.parse(salvo) as Doacao[] : [];
}

export async function salvarDoacao(novaDoacao: NovaDoacao): Promise<Doacao[]> {
    const doacoes = await listarDoacoes();
    let id = Date.now();
    while (doacoes.some((doacao) => doacao.id === id)) {
        id += 1;
    }

    const doacao: Doacao = {
        ...novaDoacao,
        id,
        criadoEm: new Date().toISOString(),
    };
    doacoes.push(doacao);
    await AsyncStorage.setItem(CHAVE_DOACOES, JSON.stringify(doacoes));
    return doacoes;
}
