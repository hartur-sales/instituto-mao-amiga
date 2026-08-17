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
    nome: 'Centro Comunitário Nova Esperança',
    endereco: 'Rua das Acácias, 210 - Bairro Nova Esperança, Goiânia - GO, CEP 74000-000',
    diasHorarios: 'Segunda a sexta, 08h às 17h',
    atendimento: 'Recebe alimentos não perecíveis e distribui cestas básicas',
  },
  {
    id: '2',
    nome: 'Paróquia São José',
    endereco: 'Av. Brasil, 1045 - Centro, Goiânia - GO, CEP 74010-010',
    diasHorarios: 'Terça e quinta, 13h às 18h',
    atendimento: 'Recebe roupas infantis e distribui kits de inverno',
  },
  {
    id: '3',
    nome: 'Associação Viver Melhor',
    endereco: 'Rua do Comércio, 58 - Vila União, Goiânia - GO, CEP 74015-030',
    diasHorarios: 'Sábado, 09h às 12h',
    atendimento: 'Recebe frutas e verduras e distribui refeições prontas',
  },
  {
    id: '4',
    nome: 'Casa de Apoio Bom Samaritano',
    endereco: 'Rua 15 de Novembro, 320 - Setor Central, Aparecida de Goiânia - GO, CEP 74911-050',
    diasHorarios: 'Segunda, quarta e sexta, 14h às 19h',
    atendimento: 'Recebe cobertores e agasalhos e distribui kits de higiene',
  },
  {
    id: '5',
    nome: 'Igreja Presbiteriana Renovada',
    endereco: 'Av. Anhanguera, 2870 - Setor Oeste, Goiânia - GO, CEP 74120-020',
    diasHorarios: 'Domingo, 08h às 11h',
    atendimento: 'Recebe brinquedos e material escolar e distribui kits para crianças',
  },
  {
    id: '6',
    nome: 'Associação Beneficente Mãos que Ajudam',
    endereco: 'Rua T-30, 1200 - Setor Bueno, Goiânia - GO, CEP 74223-060',
    diasHorarios: 'Terça a sábado, 09h às 16h',
    atendimento: 'Recebe móveis e eletrodomésticos usados e distribui para famílias cadastradas',
  },
  {
    id: '7',
    nome: 'Centro Social São Francisco',
    endereco: 'Rua Barão do Rio Branco, 455 - Jardim América, Goiânia - GO, CEP 74275-040',
    diasHorarios: 'Segunda a sexta, 07h30 às 12h',
    atendimento: 'Recebe leite e alimentos infantis e distribui cestas para gestantes e lactantes',
  },
  {
    id: '8',
    nome: 'Instituto Vida Nova',
    endereco: 'Av. T-63, 890 - Setor Bueno, Goiânia - GO, CEP 74230-060',
    diasHorarios: 'Quarta e sexta, 15h às 19h',
    atendimento: 'Recebe roupas de adulto e calçados e distribui para famílias em vulnerabilidade',
  },
];
