import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export type Ponto = {
    id: number;
    nome: string;
    endereco: string;
    diasHorarios: string;
    funcionamento: string;
};

export const pontoMock: Ponto[] = [
    {
        id: 1,
        nome: "Associação Viver Melhor",
        endereco: "Rua Goiás, 315 - Setor Central",
        diasHorarios: "Segunda a Sexta, das 08h às 18h",
        funcionamento: "Recebe: Alimentos não perecíveis, roupas e produtos de higiene"
    },
    {
        id: 2,
        nome: "Casa de Apoio Nova Vida",
        endereco: "Avenida Independência, 780 - Setor Oeste",
        diasHorarios: "Segunda a Sábado, das 08h às 17h",
        funcionamento: "Recebe: Roupas, calçados, cobertores e itens de higiene pessoal"
    },
    {
        id: 3,
        nome: "Projeto Sementes do Futuro",
        endereco: "Rua das Acácias, 126 - Jardim Primavera",
        diasHorarios: "Segunda a Sexta, das 09h às 17h",
        funcionamento: "Recebe: Livros, materiais escolares, brinquedos e jogos educativos"
    },
    {
        id: 4,
        nome: "Ponto Verde Reciclagem",
        endereco: "Avenida dos Ipês, 940 - Setor Industrial",
        diasHorarios: "Segunda a Sexta, das 08h às 16h\nSábado, das 08h às 12h",
        funcionamento: "Recebe: Papelão, garrafas PET, latinhas e resíduos eletrônicos"
    },
    {
        id: 5,
        nome: "ONG Coração Solidário",
        endereco: "Rua Bela Vista, 210 - Setor Universitário",
        diasHorarios: "Terça a Sábado, das 09h às 18h",
        funcionamento: "Recebe: Alimentos, roupas, fraldas e produtos de limpeza"
    },
    {
        id: 6,
        nome: "Centro de Doações Recomeço",
        endereco: "Rua 14 de Julho, 560 - Bairro Santa Clara",
        diasHorarios: "Segunda a Sexta, das 08h às 17h",
        funcionamento: "Recebe: Móveis, colchões, utensílios domésticos e eletrodomésticos"
    },
    {
        id: 7,
        nome: "Espaço Comunitário Esperança",
        endereco: "Avenida das Palmeiras, 1025 - Bairro São José",
        diasHorarios: "Segunda a Sábado, das 08h às 18h",
        funcionamento: "Recebe: Cestas básicas, roupas infantis, brinquedos e cobertores"
    },
    {
        id: 8,
        nome: "Biblioteca Comunitária Ler e Crescer",
        endereco: "Rua do Cerrado, 145 - Setor Aeroporto",
        diasHorarios: "Segunda a Sexta, das 09h às 18h",
        funcionamento: "Recebe: Livros, revistas, gibis e materiais de leitura infantil"
    }
];


function PontoItem({ponto, onPress}: { ponto: Ponto; onPress: () => void }) {
    return (
        <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress}>
            <Text style={styles.nome}>{ponto.nome}</Text>
            <Text style={styles.endereco}>{ponto.endereco}</Text>
            <Text style={styles.diasHorarios}>{ponto.diasHorarios}</Text>
            <View style={styles.tagFuncionamento}>
                <Text style={styles.funcionamento}>{ponto.funcionamento}</Text>
            </View>
        </TouchableOpacity>
    );
}

function TelaListaPontos({navigation}: any) {
    return (
        <View style={styles.container}>
            <FlatList
                data={pontoMock}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <PontoItem
                        ponto={item}
                        onPress={() => navigation.navigate('TelaDetalhePonto', {pontoId: item.id})}
                    />
                )}
                contentContainerStyle={styles.listaContainer}
            />
        </View>
    );
}

export default TelaListaPontos;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    listaContainer: {
        padding: 16,
        paddingBottom: 32,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    nome: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 8,
    },
    endereco: {
        fontSize: 14,
        color: '#4B5563',
        marginBottom: 6,
        lineHeight: 20,
    },
    diasHorarios: {
        fontSize: 13,
        color: '#6B7280',
        marginBottom: 12,
        lineHeight: 18,
    },
    tagFuncionamento: {
        backgroundColor: '#EFF6FF',
        borderRadius: 6,
        paddingVertical: 6,
        paddingHorizontal: 10,
        alignSelf: 'flex-start',
        borderLeftWidth: 3,
        borderLeftColor: '#2563EB',
    },
    funcionamento: {
        fontSize: 12,
        fontWeight: '600',
        color: '#2563EB',
    },
});
