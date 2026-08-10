import { StyleSheet, Text, View } from 'react-native';

type Ponto = {
  nome: string;
  endereco: string;
  diasHorarios: string;
  recebeDistribui: string;
};

const pontoMock: Ponto = {
  nome: 'Centro Comunitario Nova Esperanca',
  endereco: 'Rua das Acacias, 210 - Bairro Nova Esperanca',
  diasHorarios: 'Seg a Sex, 08h as 17h',
  recebeDistribui: 'Recebe alimentos nao pereciveis e distribui cestas basicas',
};

function DetalhePonto({ ponto }: { ponto: Ponto }) {
  return (
    <View style={styles.card}>
      <Text style={styles.nome}>{ponto.nome}</Text>
      <Text style={styles.label}>Endereco</Text>
      <Text style={styles.valor}>{ponto.endereco}</Text>

      <Text style={styles.label}>Dias e horarios</Text>
      <Text style={styles.valor}>{ponto.diasHorarios}</Text>

      <Text style={styles.label}>Recebe e distribui</Text>
      <Text style={styles.valor}>{ponto.recebeDistribui}</Text>
    </View>
  );
}

export default function TelaDetalhePonto() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Detalhe do ponto</Text>
      <DetalhePonto ponto={pontoMock} />
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
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#DCE5EE',
  },
  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B3A5C',
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#4D6A8A',
    marginTop: 8,
  },
  valor: {
    fontSize: 15,
    color: '#425466',
    marginTop: 2,
  },
});
