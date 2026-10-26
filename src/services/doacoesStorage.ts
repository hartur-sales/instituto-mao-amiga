import AsyncStorage from '@react-native-async-storage/async-storage';
import {Doacao, NovaDoacao} from '../entities/doacao';
import {apiRequest} from './api';

const CHAVE_DOACOES = '@pontos_coleta:doacoes';

export async function listarDoacoes(): Promise<Doacao[]> {
    try {
        const doacoes = await apiRequest<Doacao[]>('/doacoes');
        await AsyncStorage.setItem(CHAVE_DOACOES, JSON.stringify(doacoes));
        return doacoes;
    } catch (erro) {
        console.warn('API de doações indisponível; usando dados locais.', erro);
        const salvo = await AsyncStorage.getItem(CHAVE_DOACOES);
        return salvo ? JSON.parse(salvo) as Doacao[] : [];
    }
}

export async function salvarDoacao(novaDoacao: NovaDoacao): Promise<Doacao[]> {
    try {
        await apiRequest<Doacao>('/doacoes', {
            method: 'POST',
            body: JSON.stringify(novaDoacao),
        });
        return listarDoacoes();
    } catch (erro) {
        console.warn('API de doações indisponível; salvando doação localmente.', erro);
        const doacoes = await listarDoacoes();
        let id = Date.now();
        while (doacoes.some((doacao) => doacao.id === id)) {
            id += 1;
        }

        doacoes.push({...novaDoacao, id, criadoEm: new Date().toISOString()});
        await AsyncStorage.setItem(CHAVE_DOACOES, JSON.stringify(doacoes));
        return doacoes;
    }
}

export async function atualizarDoacao(doacaoAtualizada: Doacao): Promise<Doacao[]> {
    try {
        await apiRequest<Doacao>(`/doacoes/${doacaoAtualizada.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                tipoItem: doacaoAtualizada.tipoItem,
                quantidade: doacaoAtualizada.quantidade,
                pontoDestinoId: doacaoAtualizada.pontoDestinoId,
            }),
        });
        return listarDoacoes();
    } catch (erro) {
        console.warn('API de doações indisponível; atualizando doação localmente.', erro);
        const doacoes = await listarDoacoes();
        const doacoesAtualizadas = doacoes.map((doacao) =>
            doacao.id === doacaoAtualizada.id ? doacaoAtualizada : doacao
        );
        await AsyncStorage.setItem(CHAVE_DOACOES, JSON.stringify(doacoesAtualizadas));
        return doacoesAtualizadas;
    }
}

export async function excluirDoacao(id: number): Promise<Doacao[]> {
    try {
        await apiRequest<void>(`/doacoes/${id}`, {method: 'DELETE'});
        return listarDoacoes();
    } catch (erro) {
        console.warn('API de doações indisponível; excluindo doação localmente.', erro);
        const doacoes = await listarDoacoes();
        const doacoesAtualizadas = doacoes.filter((doacao) => doacao.id !== id);
        await AsyncStorage.setItem(CHAVE_DOACOES, JSON.stringify(doacoesAtualizadas));
        return doacoesAtualizadas;
    }
}
