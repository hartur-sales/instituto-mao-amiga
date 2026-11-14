package com.hartur.maoamiga.service;

import com.hartur.maoamiga.dto.DoacaoRequestDTO;
import com.hartur.maoamiga.dto.DoacaoResponseDTO;
import com.hartur.maoamiga.entity.Doacao;
import com.hartur.maoamiga.exception.EntidadeNotFound;
import com.hartur.maoamiga.repository.DoacaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DoacaoService {
    private final DoacaoRepository repository;

    public Page<DoacaoResponseDTO> listar(String filtro, Pageable pageable) {
        String termo = filtro == null ? "" : filtro.trim();
        pageable = normalizarOrdenacao(pageable);
        Page<Doacao> pagina = termo.isEmpty()
                ? repository.findAll(pageable)
                : repository.findByTipoItemContainingIgnoreCase(termo, pageable);
        return pagina.map(DoacaoResponseDTO::new);
    }

    private Pageable normalizarOrdenacao(Pageable pageable) {
        Sort sort = Sort.by(pageable.getSort().stream()
                .filter(order -> order.getProperty().equals("criadoEm"))
                .toList());
        if (sort.isUnsorted()) {
            sort = Sort.by(Sort.Order.desc("criadoEm"));
        }
        return PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
    }

    public DoacaoResponseDTO buscarPorId(UUID id) {
        return new DoacaoResponseDTO(repository.findById(id)
                .orElseThrow(() -> new EntidadeNotFound("Doação não encontrada")));
    }

    public DoacaoResponseDTO criar(DoacaoRequestDTO dto) {
        Doacao doacao = aplicar(new Doacao(), dto);
        doacao.setCriadoEm(LocalDateTime.now());
        return new DoacaoResponseDTO(repository.save(doacao));
    }

    public DoacaoResponseDTO atualizar(UUID id, DoacaoRequestDTO dto) {
        Doacao doacao = repository.findById(id)
                .orElseThrow(() -> new EntidadeNotFound("Doação não encontrada"));
        LocalDateTime criadoEm = doacao.getCriadoEm();
        aplicar(doacao, dto);
        doacao.setCriadoEm(criadoEm);
        return new DoacaoResponseDTO(repository.save(doacao));
    }

    public void deletar(UUID id) {
        if (!repository.existsById(id)) {
            throw new EntidadeNotFound("Doação não encontrada");
        }
        repository.deleteById(id);
    }

    private Doacao aplicar(Doacao doacao, DoacaoRequestDTO dto) {
        doacao.setTipoItem(dto.tipoItem().trim());
        doacao.setQuantidade(dto.quantidade());
        doacao.setPontoDestino(dto.pontoDestino().trim());
        return doacao;
    }
}
