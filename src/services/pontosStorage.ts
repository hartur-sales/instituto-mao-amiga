import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ponto} from '../entities/ponto';
import {pontosMock} from '../mockdata/pontosMock';

const CHAVE_PONTOS = '@pontos_coleta:pontos';

export async function listarPontos(): Promise<Ponto[]> {
    const salvo = await AsyncStorage.getItem(CHAVE_PONTOS);
    return salvo ? JSON.parse(salvo) as Ponto[] : pontosMock;
}

export async function salvarPonto(novoPonto: Ponto): Promise<Ponto[]> {
    const pontos = [...await listarPontos(), novoPonto];
    await AsyncStorage.setItem(CHAVE_PONTOS, JSON.stringify(pontos));
    return pontos;
}