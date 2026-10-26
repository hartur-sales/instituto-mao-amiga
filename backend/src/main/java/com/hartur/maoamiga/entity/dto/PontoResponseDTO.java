package com.hartur.maoamiga.entity.dto;

import com.hartur.maoamiga.entity.Ponto;

public record PontoResponseDTO(
        Long id,
        String nome,
        String endereco,
        String diasHorarios,
        String funcionamento
) {
    public PontoResponseDTO(Ponto ponto) {
        this(ponto.getId(), ponto.getNome(), ponto.getEndereco(),
                ponto.getDiasHorarios(), ponto.getFuncionamento());
    }
}
