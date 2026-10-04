import {useEffect, useState} from 'react';
import {Doacao, NovaDoacao} from '../entities/doacao';
import {Ponto} from '../entities/ponto';
import {listarDoacoes, salvarDoacao} from '../services/doacoesStorage';
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
        salvarDoacao(doacao).then(setDoacoes);
    }

    return {pontos, doacoes, adicionarPonto, adicionarDoacao};
}
