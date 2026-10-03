import AsyncStorage from '@react-native-async-storage/async-storage';
import {Doacao} from '../entities/doacao';

const CHAVE_DOACOES = '@pontos_coleta:doacoes';

export async function listarDoacoes(): Promise<Doacao[]> {
    const salvo = await AsyncStorage.getItem(CHAVE_DOACOES);
    return salvo ? JSON.parse(salvo) as Doacao[] : [];
}

export async function salvarDoacao(novaDoacao: Doacao): Promise<Doacao[]> {
    const doacoes = [...await listarDoacoes(), novaDoacao];
    await AsyncStorage.setItem(CHAVE_DOACOES, JSON.stringify(doacoes));
    return doacoes;
}
