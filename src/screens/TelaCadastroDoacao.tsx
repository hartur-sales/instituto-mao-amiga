import React, {useState} from 'react';
import {FlatList, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Doacao, NovaDoacao} from '../entities/doacao';
import {Ponto} from '../entities/ponto';
import {DoacaoCard} from '../components/DoacaoCard';
import {colors, spacing} from '../theme';

type Props = {pontos: Ponto[]; doacoes: Doacao[]; onAdicionarDoacao: (doacao: NovaDoacao) => void};

export default function TelaCadastroDoacao({pontos, doacoes, onAdicionarDoacao}: Props) {
    const [tipoItem, setTipoItem] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [pontoDestinoId, setPontoDestinoId] = useState('');
    const [erro, setErro] = useState('');

    function validarESalvar() {
        if (!tipoItem.trim() || !quantidade.trim() || !pontoDestinoId) {
            setErro('Preencha o tipo, a quantidade e o ponto de destino.');
            return;
        }
        const quantidadeNumerica = Number(quantidade);
        if (!Number.isInteger(quantidadeNumerica) || quantidadeNumerica <= 0) {
            setErro('A quantidade deve ser um número inteiro maior que zero.');
            return;
        }
        onAdicionarDoacao({
            tipoItem: tipoItem.trim(),
            quantidade: quantidadeNumerica,
            pontoDestinoId: Number(pontoDestinoId),
        });
        setTipoItem('');
        setQuantidade('');
        setPontoDestinoId('');
        setErro('');
        Keyboard.dismiss();
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <FlatList
                data={doacoes}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={
                    <View style={styles.formulario}>
                        <Text style={styles.rotulo}>Tipo do item</Text>
                        <TextInput style={styles.input} placeholder="Ex: Roupas, alimentos, brinquedos..." value={tipoItem} onChangeText={setTipoItem}/>
                        <Text style={styles.rotulo}>Quantidade</Text>
                        <TextInput style={styles.input} placeholder="Ex: 5" value={quantidade} onChangeText={(valor) => setQuantidade(valor.replace(/[^0-9]/g, ''))} keyboardType="number-pad"/>
                        <Text style={styles.rotulo}>Ponto de destino</Text>
                        <View style={styles.pickerContainer}>
                            <Picker selectedValue={pontoDestinoId} onValueChange={setPontoDestinoId}>
                                <Picker.Item label="Selecione um ponto..." value=""/>
                                {pontos.map((ponto) => <Picker.Item key={ponto.id} label={ponto.nome} value={ponto.id.toString()}/>)}
                            </Picker>
                        </View>
                        {!!erro && <Text style={styles.erro}>{erro}</Text>}
                        <TouchableOpacity style={styles.botao} onPress={validarESalvar}>
                            <Text style={styles.botaoTexto}>Registrar doação</Text>
                        </TouchableOpacity>
                    </View>
                }
                renderItem={({item}) => (
                    <DoacaoCard
                        doacao={item}
                        nomePonto={pontos.find((ponto) => ponto.id === item.pontoDestinoId)?.nome ?? 'Ponto não encontrado'}
                    />
                )}
                contentContainerStyle={styles.lista}
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: colors.background},
    lista: {padding: spacing.lg, paddingBottom: 32},
    formulario: {marginBottom: spacing.lg, gap: 6},
    rotulo: {fontSize: 13, fontWeight: '600', color: colors.text, marginTop: 6},
    input: {backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: spacing.sm, paddingHorizontal: spacing.md, paddingVertical: 10, color: colors.text},
    pickerContainer: {backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: spacing.sm, overflow: 'hidden'},
    erro: {color: colors.error, fontSize: 13},
    botao: {backgroundColor: colors.primary, borderRadius: spacing.sm, alignItems: 'center', justifyContent: 'center', minHeight: 44, marginTop: spacing.sm},
    botaoTexto: {color: colors.surface, fontWeight: '600'},
});
