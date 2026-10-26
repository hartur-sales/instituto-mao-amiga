package com.hartur.maoamiga.entity.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CriarPontoDTO(
        @NotBlank(message = "O nome do ponto não pode ser vazio")
        @Size(max = 100, message = "O nome do ponto não pode ter mais de 100 caracteres")
        String nome,
        @NotBlank(message = "O endereço não pode ser vazio")
        String endereco,
        @NotBlank(message = "Os dias e horários não podem ser vazios")
        String diasHorarios,
        @NotBlank(message = "As informações de funcionamento não podem ser vazias")
        String funcionamento
) {
}
