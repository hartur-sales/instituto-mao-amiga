import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ponto} from '../entities/ponto';
import {pontosMock} from '../mockdata/pontosMock';
import {apiRequest} from './api';

const CHAVE_PONTOS = '@pontos_coleta:pontos';

export async function listarPontos(): Promise<Ponto[]> {
    try {
        const pontos = await apiRequest<Ponto[]>('/pontos');
        await AsyncStorage.setItem(CHAVE_PONTOS, JSON.stringify(pontos));
        return pontos;
    } catch (erro) {
        console.warn('API de pontos indisponível; usando dados locais.', erro);
        const salvo = await AsyncStorage.getItem(CHAVE_PONTOS);
        return salvo ? JSON.parse(salvo) as Ponto[] : pontosMock;
    }
}

export async function salvarPonto(novoPonto: Ponto): Promise<Ponto[]> {
    try {
        await apiRequest<Ponto>('/pontos', {
            method: 'POST',
            body: JSON.stringify({
                nome: novoPonto.nome,
                endereco: novoPonto.endereco,
                diasHorarios: novoPonto.diasHorarios,
                funcionamento: novoPonto.funcionamento,
            }),
        });
    } catch (erro) {
        console.warn('API de pontos indisponível; salvando ponto localmente.', erro);
        const pontos = [...await listarPontos(), novoPonto];
        await AsyncStorage.setItem(CHAVE_PONTOS, JSON.stringify(pontos));
        return pontos;
    }

    return listarPontos();
}