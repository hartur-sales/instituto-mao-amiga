import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { pontosMock, type Ponto } from '@/constants/pontos';

type PontoItemProps = {
  ponto: Ponto;
  onPress: () => void;
};

function PontoItem({ ponto, onPress }: PontoItemProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.nome}>{ponto.nome}</Text>
      <Text style={styles.info}>{ponto.endereco}</Text>
      <Text style={styles.info}>{ponto.diasHorarios}</Text>
    </Pressable>
  );
}

export default function TelaListaPontos() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Instituto Mao Amiga</Text>
      <Text style={styles.subtitulo}>Pontos de coleta e distribuicao</Text>

      {pontosMock.map((ponto) => (
        <PontoItem
          key={ponto.id}
          ponto={ponto}
          onPress={() =>
            router.push({
              pathname: '/pontos/[id]',
              params: { id: ponto.id },
            })
          }
        />
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
