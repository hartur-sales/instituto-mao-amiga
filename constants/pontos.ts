export type Ponto = {
  id: string;
  nome: string;
  endereco: string;
  diasHorarios: string;
  atendimento: string;
};

export const pontosMock: Ponto[] = [
  {
    id: '1',
    nome: 'Centro Comunitario Nova Esperanca',
    endereco: 'Rua das Acacias, 210 - Bairro Nova Esperanca',
    diasHorarios: 'Seg a Sex, 08h as 17h',
    atendimento: 'Recebe alimentos nao pereciveis e distribui cestas basicas',
  },
  {
    id: '2',
    nome: 'Paroquia Sao Jose',
    endereco: 'Av. Brasil, 1045 - Centro',
    diasHorarios: 'Terca e Quinta, 13h as 18h',
    atendimento: 'Recebe roupas infantis e distribui kits de inverno',
  },
  {
    id: '3',
    nome: 'Associacao Viver Melhor',
    endereco: 'Rua do Comercio, 58 - Vila Uniao',
    diasHorarios: 'Sabado, 09h as 12h',
    atendimento: 'Recebe frutas e verduras e distribui refeicoes prontas',
  },
];
