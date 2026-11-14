import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE = '@mao-amiga:favoritos';

export async function listar(): Promise<string[]> {
    const valor = await AsyncStorage.getItem(CHAVE);
    return valor ? JSON.parse(valor) as string[] : [];
}

export async function alternar(id: string): Promise<string[]> {
    const atuais = await listar();
    const proximos = atuais.includes(id) ? atuais.filter((item) => item !== id) : [...atuais, id];
    await AsyncStorage.setItem(CHAVE, JSON.stringify(proximos));
    return proximos;
}

export async function remover(id: string): Promise<string[]> {
    const proximos = (await listar()).filter((item) => item !== id);
    await AsyncStorage.setItem(CHAVE, JSON.stringify(proximos));
    return proximos;
}
