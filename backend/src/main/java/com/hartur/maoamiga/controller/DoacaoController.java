package com.hartur.maoamiga.controller;

import com.hartur.maoamiga.entity.dto.CriarDoacaoDTO;
import com.hartur.maoamiga.entity.dto.DoacaoResponseDTO;
import com.hartur.maoamiga.service.DoacaoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/doacoes")
@RequiredArgsConstructor
public class DoacaoController {
    private final DoacaoService service;

    @GetMapping
    public List<DoacaoResponseDTO> listar() {
        return service.listar();
    }

    @PostMapping
    public ResponseEntity<DoacaoResponseDTO> criar(@RequestBody @Valid CriarDoacaoDTO dto) {
        return ResponseEntity.status(201).body(service.criar(dto));
    }

    @PutMapping("/{id}")
    public DoacaoResponseDTO atualizar(@PathVariable Long id, @RequestBody @Valid CriarDoacaoDTO dto) {
        return service.atualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
