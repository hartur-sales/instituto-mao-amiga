import { StyleSheet, Text, View } from 'react-native';

type Ponto = {
  id: string;
  nome: string;
  endereco: string;
  diasHorarios: string;
  atendimento: string;
};

const pontosMock: Ponto[] = [
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

type PontoItemProps = {
  ponto: Ponto;
};

function PontoItem({ ponto }: PontoItemProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.nome}>{ponto.nome}</Text>
      <Text style={styles.info}>{ponto.endereco}</Text>
      <Text style={styles.info}>{ponto.diasHorarios}</Text>
    </View>
  );
}

export default function TelaListaPontos() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Instituto Mao Amiga</Text>
      <Text style={styles.subtitulo}>Pontos de coleta e distribuicao</Text>

      {pontosMock.map((ponto) => (
        <PontoItem key={ponto.id} ponto={ponto} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F8FC',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B3A5C',
  },
  subtitulo: {
    fontSize: 14,
    color: '#4C5D70',
    marginTop: 6,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DCE5EE',
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B3A5C',
  },
  info: {
    fontSize: 14,
    color: '#4C5D70',
    marginTop: 4,
  },
});
