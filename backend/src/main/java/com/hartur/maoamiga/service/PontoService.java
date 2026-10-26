package com.hartur.maoamiga.service;

import com.hartur.maoamiga.entity.Ponto;
import com.hartur.maoamiga.entity.dto.CriarPontoDTO;
import com.hartur.maoamiga.entity.dto.PontoResponseDTO;
import com.hartur.maoamiga.exception.EntidadeNotFound;
import com.hartur.maoamiga.repository.PontoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PontoService {
    private final PontoRepository repository;

    public List<PontoResponseDTO> listar() {
        return repository.findAll().stream().map(PontoResponseDTO::new).toList();
    }

    public PontoResponseDTO criar(CriarPontoDTO dto) {
        Ponto ponto = new Ponto();
        aplicar(ponto, dto);
        return new PontoResponseDTO(repository.save(ponto));
    }

    public Ponto buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntidadeNotFound("Ponto de coleta não encontrado"));
    }

    private void aplicar(Ponto ponto, CriarPontoDTO dto) {
        ponto.setNome(dto.nome().trim());
        ponto.setEndereco(dto.endereco().trim());
        ponto.setDiasHorarios(dto.diasHorarios().trim());
        ponto.setFuncionamento(dto.funcionamento().trim());
    }
}
