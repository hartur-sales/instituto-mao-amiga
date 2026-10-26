package com.hartur.maoamiga.entity.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record CriarDoacaoDTO(
        @NotBlank(message = "O tipo do item não pode ser vazio")
        String tipoItem,
        @NotNull(message = "A quantidade não pode ser nula")
        @Positive(message = "A quantidade deve ser maior que zero")
        Integer quantidade,
        @NotNull(message = "O ponto de destino não pode ser nulo")
        Long pontoDestinoId
) {
}
