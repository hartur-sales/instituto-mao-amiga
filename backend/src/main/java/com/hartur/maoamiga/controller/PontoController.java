package com.hartur.maoamiga.controller;

import com.hartur.maoamiga.entity.dto.CriarPontoDTO;
import com.hartur.maoamiga.entity.dto.PontoResponseDTO;
import com.hartur.maoamiga.service.PontoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pontos")
@RequiredArgsConstructor
public class PontoController {
    private final PontoService service;

    @GetMapping
    public List<PontoResponseDTO> listar() {
        return service.listar();
    }

    @PostMapping
    public ResponseEntity<PontoResponseDTO> criar(@RequestBody @Valid CriarPontoDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(dto));
    }
}
