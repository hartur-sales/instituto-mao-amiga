import {Ponto, PontoRequest} from '../entities/ponto';
import {del, get, post, put} from './api';

export type Page<T> = {
    content: T[];
    page: {number: number; totalPages: number; last: boolean};
};

export const listarPagina = (filtro = '', page = 0, size = 10) =>
    get<Page<Ponto>>(`/pontos/filtro?filtro=${encodeURIComponent(filtro)}&page=${page}&size=${size}`);
export const listar = (page = 0, size = 100) =>
    get<Page<Ponto>>(`/pontos?page=${page}&size=${size}`);
export const buscarPorId = (id: string) => get<Ponto>(`/pontos/${id}`);
export const cadastrar = (ponto: PontoRequest) => post<Ponto>('/pontos', ponto);
export const editar = (id: string, ponto: PontoRequest) => put<Ponto>(`/pontos/${id}`, ponto);
export const excluir = (id: string) => del(`/pontos/${id}`);
