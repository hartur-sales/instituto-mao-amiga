export type Doacao = {
    id: number;
    criadoEm: string;
    tipoItem: string;
    quantidade: number;
    pontoDestinoId: number;
};

export type NovaDoacao = Omit<Doacao, 'id' | 'criadoEm'>;
