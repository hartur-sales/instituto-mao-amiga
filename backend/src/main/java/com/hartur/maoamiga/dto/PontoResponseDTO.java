package com.hartur.maoamiga.dto;

import com.hartur.maoamiga.entity.Ponto;

import java.util.UUID;

public record PontoResponseDTO(UUID id, String nome, String endereco, String bairro, String horario, String tipo) {
    public PontoResponseDTO(Ponto ponto) {
        this(ponto.getId(), ponto.getNome(), ponto.getEndereco(), ponto.getBairro(), ponto.getHorario(), ponto.getTipo().name());
    }
}
