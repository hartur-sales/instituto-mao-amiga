import React, {useState} from 'react';
import {FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Ponto} from './TelaListaPontos';

export type Doacao = {
    id: number;
    tipoItem: string;
    quantidade: number;
    pontoDestinoId: number;
};

function DoacaoItem({doacao, nomePonto}: { doacao: Doacao; nomePonto: string }) {
    return (
        <View style={styles.card}>
            <Text style={styles.tipoItem}>{doacao.tipoItem}</Text>
            <Text style={styles.quantidade}>Quantidade: {doacao.quantidade}</Text>
            <View style={styles.tagPonto}>
                <Text style={styles.ponto}>Destino: {nomePonto}</Text>
            </View>
        </View>
    );
}

function TelaCadastroDoacao({pontos, doacoes, onAdicionarDoacao}: any) {
    const [tipoItem, setTipoItem] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [pontoDestinoId, setPontoDestinoId] = useState('');
    const [erroTipoItem, setErroTipoItem] = useState('');
    const [erroQuantidade, setErroQuantidade] = useState('');
    const [erroPonto, setErroPonto] = useState('');

    function tratarMudancaQuantidade(valorDigitado: string) {
        const somenteNumeros = valorDigitado.replace(/[^0-9]/g, '');

        if (valorDigitado !== somenteNumeros) {
            setErroQuantidade('Digite apenas números.');
        } else {
            setErroQuantidade('');
        }

        setQuantidade(somenteNumeros);
    }

    function validarESalvar() {
        let valido = true;

        if (tipoItem.trim() === '') {
            setErroTipoItem('O tipo do item não pode ficar vazio.');
            valido = false;
        } else {
            setErroTipoItem('');
        }

        if (quantidade.trim() === '') {
            setErroQuantidade('A quantidade não pode ficar vazia.');
            valido = false;
        }

        if (pontoDestinoId === '') {
            setErroPonto('Selecione um ponto de destino.');
            valido = false;
        } else {
            setErroPonto('');
        }

        if (!valido) {
            return;
        }

        onAdicionarDoacao({
            id: Date.now(),
            tipoItem,
            quantidade: Number(quantidade),
            pontoDestinoId: Number(pontoDestinoId),
        });

        setTipoItem('');
        setQuantidade('');
        setPontoDestinoId('');
        Keyboard.dismiss();
    }

    function nomeDoPonto(id: number) {
        const ponto = pontos.find((item: Ponto) => item.id === id);
        return ponto ? ponto.nome : 'Ponto não encontrado';
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={doacoes}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={
                    <View style={styles.formulario}>
                        <Text style={styles.rotulo}>Tipo do item</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ex: Roupas, alimentos, brinquedos..."
                            value={tipoItem}
                            onChangeText={setTipoItem}
                            returnKeyType="next"
                        />
                        {erroTipoItem !== '' && <Text style={styles.erroFormulario}>{erroTipoItem}</Text>}

                        <Text style={styles.rotulo}>Quantidade</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ex: 5"
                            value={quantidade}
                            onChangeText={tratarMudancaQuantidade}
                            keyboardType="number-pad"
                            returnKeyType="done"
                        />
                        {erroQuantidade !== '' && <Text style={styles.erroFormulario}>{erroQuantidade}</Text>}

                        <Text style={styles.rotulo}>Ponto de destino</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={pontoDestinoId}
                                onValueChange={(valor) => setPontoDestinoId(valor)}
                                style={styles.picker}
                            >
                                <Picker.Item label="Selecione um ponto..." value="" color="#9CA3AF"/>
                                {pontos.map((ponto: Ponto) => (
                                    <Picker.Item key={ponto.id} label={ponto.nome} value={ponto.id.toString()}/>
                                ))}
                            </Picker>
                        </View>
                        {erroPonto !== '' && <Text style={styles.erroFormulario}>{erroPonto}</Text>}

                        <TouchableOpacity style={styles.botao} onPress={validarESalvar}>
                            <Text style={styles.botaoTexto}>Registrar doação</Text>
                        </TouchableOpacity>

                        {doacoes.length > 0 ? (
                            <Text style={styles.subtitulo}>Doações registradas</Text>
                        ) : (
                            <Text style={styles.vazio}>Nenhuma doação registrada ainda.</Text>
                        )}
                    </View>
                }
                renderItem={({item}) => (
                    <DoacaoItem doacao={item} nomePonto={nomeDoPonto(item.pontoDestinoId)}/>
                )}
                contentContainerStyle={styles.listaContainer}
            />
        </View>
    );
}

export default TelaCadastroDoacao;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    listaContainer: {
        padding: 16,
        paddingBottom: 32,
    },
    formulario: {
        marginBottom: 8,
        gap: 6,
    },
    rotulo: {
        fontSize: 13,
        fontWeight: '600',
        color: '#374151',
        marginTop: 6,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        color: '#111827',
    },
    pickerContainer: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        overflow: 'hidden',
    },
    picker: {
        color: '#111827',
    },
    erroFormulario: {
        color: '#DC2626',
        fontSize: 13,
    },
    botao: {
        backgroundColor: '#2563EB',
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 8,
    },
    botaoTexto: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    subtitulo: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111827',
        marginTop: 20,
        marginBottom: 4,
    },
    vazio: {
        fontSize: 13,
        color: '#9CA3AF',
        marginTop: 20,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    tipoItem: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 4,
    },
    quantidade: {
        fontSize: 14,
        color: '#4B5563',
        marginBottom: 8,
    },
    tagPonto: {
        backgroundColor: '#EFF6FF',
        borderRadius: 6,
        paddingVertical: 6,
        paddingHorizontal: 10,
        alignSelf: 'flex-start',
        borderLeftWidth: 3,
        borderLeftColor: '#2563EB',
    },
    ponto: {
        fontSize: 12,
        fontWeight: '600',
        color: '#2563EB',
    },
});