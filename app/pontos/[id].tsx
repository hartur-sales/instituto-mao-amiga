import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { pontosMock } from '@/constants/pontos';

function DetalhePonto({
  nome,
  endereco,
  diasHorarios,
  atendimento,
}: {
  nome: string;
  endereco: string;
  diasHorarios: string;
  atendimento: string;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.nome}>{nome}</Text>
      <Text style={styles.label}>Endereco</Text>
      <Text style={styles.valor}>{endereco}</Text>

      <Text style={styles.label}>Dias e horarios</Text>
      <Text style={styles.valor}>{diasHorarios}</Text>

      <Text style={styles.label}>Recebe e distribui</Text>
      <Text style={styles.valor}>{atendimento}</Text>
    </View>
  );
}

export default function TelaDetalhePonto() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const ponto = pontosMock.find((item) => item.id === id);

  if (!ponto) {
    return (
      <View style={styles.container}>
        <Text style={styles.naoEncontrado}>Ponto nao encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <DetalhePonto
        nome={ponto.nome}
        endereco={ponto.endereco}
        diasHorarios={ponto.diasHorarios}
        atendimento={ponto.atendimento}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F8FC',
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
  naoEncontrado: {
    fontSize: 16,
    color: '#425466',
  },
});
