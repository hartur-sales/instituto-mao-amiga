package com.hartur.maoamiga.controller;

import com.hartur.maoamiga.dto.PontoRequestDTO;
import com.hartur.maoamiga.dto.PontoResponseDTO;
import com.hartur.maoamiga.service.PontoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/pontos")
@RequiredArgsConstructor
public class PontoController {
    private final PontoService service;

    @GetMapping
    public Page<PontoResponseDTO> listar(
            @RequestParam(required = false, defaultValue = "") String filtro,
            @PageableDefault(size = 10, sort = "nome") Pageable pageable
    ) {
        return service.listar(filtro, pageable);
    }

    @GetMapping("/filtro")
    public Page<PontoResponseDTO> filtrar(
            @RequestParam(required = false, defaultValue = "") String filtro,
            @PageableDefault(size = 10, sort = "nome") Pageable pageable
    ) {
        return service.listar(filtro, pageable);
    }

    @GetMapping("/{id}")
    public PontoResponseDTO buscar(@PathVariable UUID id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public ResponseEntity<PontoResponseDTO> criar(@RequestBody @Valid PontoRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(dto));
    }

    @PutMapping("/{id}")
    public PontoResponseDTO atualizar(@PathVariable UUID id, @RequestBody @Valid PontoRequestDTO dto) {
        return service.atualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable UUID id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
