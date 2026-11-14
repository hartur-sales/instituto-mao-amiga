package com.hartur.maoamiga.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record DoacaoRequestDTO(
        @NotBlank String tipoItem,
        @NotNull @Positive Integer quantidade,
        @NotBlank String pontoDestino
) {}
