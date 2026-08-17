import { useRouter } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
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
      <Text style={styles.titulo}>Instituto Mão Amiga</Text>
      <Text style={styles.subtitulo}>Pontos de coleta e distribuição</Text>

      <FlatList
        data={pontosMock}
        keyExtractor={(ponto) => ponto.id}
        renderItem={({ item }) => (
          <PontoItem
            ponto={item}
            onPress={() =>
              router.push({
                pathname: '/pontos/[id]',
                params: { id: item.id },
              })
            }
          />
        )}
        style={styles.lista}
        contentContainerStyle={styles.listaContent}
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
  lista: {
    flex: 1,
  },
  listaContent: {
    paddingBottom: 20,
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
