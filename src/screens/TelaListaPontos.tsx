import React, {useRef, useState} from 'react';
import {FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Ponto} from '../entities/ponto';
import {PontoCard} from '../components/PontoCard';
import {colors, spacing} from '../theme';

type Props = {
    navigation: any;
    pontos: Ponto[];
    onAdicionarPonto: (ponto: Ponto) => void;
};

export default function TelaListaPontos({navigation, pontos, onAdicionarPonto}: Props) {
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [erro, setErro] = useState('');
    const inputEnderecoRef = useRef<TextInput>(null);

    function validarESalvar() {
        if (!nome.trim()) {
            setErro('O nome não pode ficar vazio.');
            return;
        }
        if (!endereco.trim()) {
            setErro('O endereço não pode ficar vazio.');
            return;
        }
        onAdicionarPonto({
            id: Date.now(),
            nome: nome.trim(),
            endereco: endereco.trim(),
            diasHorarios: 'Horário a confirmar',
            funcionamento: 'Informações de recebimento a confirmar',
        });
        setNome('');
        setEndereco('');
        setErro('');
        Keyboard.dismiss();
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={pontos}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={
                    <View style={styles.formulario}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome do ponto de coleta"
                            value={nome}
                            onChangeText={setNome}
                            returnKeyType="next"
                            onSubmitEditing={() => inputEnderecoRef.current?.focus()}
                        />
                        <TextInput
                            ref={inputEnderecoRef}
                            style={styles.input}
                            placeholder="Endereço"
                            value={endereco}
                            onChangeText={setEndereco}
                            returnKeyType="done"
                            onSubmitEditing={validarESalvar}
                        />
                        {!!erro && <Text style={styles.erro}>{erro}</Text>}
                        <TouchableOpacity style={styles.botao} onPress={validarESalvar}>
                            <Text style={styles.botaoTexto}>Cadastrar ponto</Text>
                        </TouchableOpacity>
                    </View>
                }
                renderItem={({item}) => (
                    <PontoCard
                        ponto={item}
                        onPress={() => navigation.navigate('TelaDetalhePonto', {pontoId: item.id})}
                    />
                )}
                contentContainerStyle={styles.lista}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: colors.background},
    lista: {padding: spacing.lg, paddingBottom: 32},
    formulario: {marginBottom: spacing.lg, gap: spacing.sm},
    input: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: spacing.sm,
        paddingHorizontal: spacing.md,
        paddingVertical: 10,
        color: colors.text,
    },
    erro: {color: colors.error, fontSize: 13},
    botao: {
        backgroundColor: colors.primary,
        borderRadius: spacing.sm,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 44,
    },
    botaoTexto: {color: colors.surface, fontWeight: '600'},
});
