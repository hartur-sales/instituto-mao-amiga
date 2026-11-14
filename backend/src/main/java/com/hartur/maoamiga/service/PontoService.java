package com.hartur.maoamiga.service;

import com.hartur.maoamiga.dto.PontoRequestDTO;
import com.hartur.maoamiga.dto.PontoResponseDTO;
import com.hartur.maoamiga.entity.Ponto;
import com.hartur.maoamiga.exception.EntidadeNotFound;
import com.hartur.maoamiga.repository.PontoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PontoService {
    private final PontoRepository repository;

    public Page<PontoResponseDTO> listar(String filtro, Pageable pageable) {
        String termo = filtro == null ? "" : filtro.trim();
        pageable = normalizarOrdenacao(pageable);
        Page<Ponto> pagina = termo.isEmpty()
                ? repository.findAll(pageable)
                : repository.findByNomeContainingIgnoreCaseOrBairroContainingIgnoreCase(termo, termo, pageable);
        return pagina.map(PontoResponseDTO::new);
    }

    private Pageable normalizarOrdenacao(Pageable pageable) {
        Sort sort = Sort.by(pageable.getSort().stream()
                .filter(order -> order.getProperty().equals("nome") || order.getProperty().equals("bairro"))
                .toList());
        if (sort.isUnsorted()) {
            sort = Sort.by(Sort.Order.asc("nome"));
        }
        return PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
    }

    public PontoResponseDTO buscarPorId(UUID id) {
        return new PontoResponseDTO(repository.findById(id)
                .orElseThrow(() -> new EntidadeNotFound("Ponto não encontrado")));
    }

    public PontoResponseDTO criar(PontoRequestDTO dto) {
        return new PontoResponseDTO(repository.save(aplicar(new Ponto(), dto)));
    }

    public PontoResponseDTO atualizar(UUID id, PontoRequestDTO dto) {
        Ponto ponto = repository.findById(id)
                .orElseThrow(() -> new EntidadeNotFound("Ponto não encontrado"));
        return new PontoResponseDTO(repository.save(aplicar(ponto, dto)));
    }

    public void deletar(UUID id) {
        if (!repository.existsById(id)) {
            throw new EntidadeNotFound("Ponto não encontrado");
        }
        repository.deleteById(id);
    }

    private Ponto aplicar(Ponto ponto, PontoRequestDTO dto) {
        ponto.setNome(dto.nome().trim());
        ponto.setEndereco(dto.endereco().trim());
        ponto.setBairro(dto.bairro().trim());
        ponto.setHorario(dto.horario().trim());
        ponto.setTipo(dto.tipo());
        return ponto;
    }
}
