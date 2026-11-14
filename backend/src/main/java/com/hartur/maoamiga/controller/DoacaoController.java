package com.hartur.maoamiga.controller;

import com.hartur.maoamiga.dto.DoacaoRequestDTO;
import com.hartur.maoamiga.dto.DoacaoResponseDTO;
import com.hartur.maoamiga.service.DoacaoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/doacoes")
@RequiredArgsConstructor
public class DoacaoController {
    private final DoacaoService service;

    @GetMapping("/filtro")
    public Page<DoacaoResponseDTO> filtrar(
            @RequestParam(required = false, defaultValue = "") String filtro,
            @PageableDefault(size = 10, sort = "criadoEm", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        return service.listar(filtro, pageable);
    }

    @GetMapping("/{id}")
    public DoacaoResponseDTO buscar(@PathVariable UUID id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public ResponseEntity<DoacaoResponseDTO> criar(@RequestBody @Valid DoacaoRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(dto));
    }

    @PutMapping("/{id}")
    public DoacaoResponseDTO atualizar(@PathVariable UUID id, @RequestBody @Valid DoacaoRequestDTO dto) {
        return service.atualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable UUID id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
