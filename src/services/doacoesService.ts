import {Doacao, DoacaoRequest} from '../entities/doacao';
import {del, get, post, put} from './api';
import {Page} from './pontosService';

export const listarPagina = (filtro = '', page = 0, size = 10) =>
    get<Page<Doacao>>(`/doacoes/filtro?filtro=${encodeURIComponent(filtro)}&page=${page}&size=${size}`);
export const buscarPorId = (id: string) => get<Doacao>(`/doacoes/${id}`);
export const cadastrar = (doacao: DoacaoRequest) => post<Doacao>('/doacoes', doacao);
export const editar = (id: string, doacao: DoacaoRequest) => put<Doacao>(`/doacoes/${id}`, doacao);
export const excluir = (id: string) => del(`/doacoes/${id}`);
