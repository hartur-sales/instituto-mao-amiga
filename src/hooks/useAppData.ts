import {useEffect, useState} from 'react';
import {Doacao, NovaDoacao} from '../entities/doacao';
import {Ponto} from '../entities/ponto';
import {atualizarDoacao, excluirDoacao, listarDoacoes, salvarDoacao} from '../services/doacoesStorage';
import {listarPontos, salvarPonto} from '../services/pontosStorage';

export function useAppData() {
    const [pontos, setPontos] = useState<Ponto[]>([]);
    const [doacoes, setDoacoes] = useState<Doacao[]>([]);

    useEffect(() => {
        Promise.all([listarPontos(), listarDoacoes()]).then(([pontosSalvos, doacoesSalvas]) => {
            setPontos(pontosSalvos);
            setDoacoes(doacoesSalvas);
        });
    }, []);

    function adicionarPonto(ponto: Ponto) {
        salvarPonto(ponto).then(setPontos);
    }

    function adicionarDoacao(doacao: NovaDoacao) {
        return salvarDoacao(doacao).then((doacoesAtualizadas) => {
            setDoacoes(doacoesAtualizadas);
            return doacoesAtualizadas;
        });
    }

    function editarDoacao(doacao: Doacao) {
        return atualizarDoacao(doacao).then((doacoesAtualizadas) => {
            setDoacoes(doacoesAtualizadas);
            return doacoesAtualizadas;
        });
    }

    function removerDoacao(id: number) {
        excluirDoacao(id).then(setDoacoes);
    }

    return {pontos, doacoes, adicionarPonto, adicionarDoacao, editarDoacao, removerDoacao};
}
