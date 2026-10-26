package com.hartur.maoamiga.entity.dto;

import com.hartur.maoamiga.entity.Doacao;

import java.time.OffsetDateTime;

public record DoacaoResponseDTO(
        Long id,
        OffsetDateTime criadoEm,
        String tipoItem,
        Integer quantidade,
        Long pontoDestinoId
) {
    public DoacaoResponseDTO(Doacao doacao) {
        this(doacao.getId(), doacao.getCriadoEm(), doacao.getTipoItem(),
                doacao.getQuantidade(), doacao.getPontoDestinoId());
    }
}
