package com.hartur.maoamiga.service;

import com.hartur.maoamiga.entity.Doacao;
import com.hartur.maoamiga.entity.dto.CriarDoacaoDTO;
import com.hartur.maoamiga.entity.dto.DoacaoResponseDTO;
import com.hartur.maoamiga.exception.EntidadeNotFound;
import com.hartur.maoamiga.repository.DoacaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DoacaoService {
    private final DoacaoRepository repository;
    private final PontoService pontoService;

    public List<DoacaoResponseDTO> listar() {
        return repository.findAll().stream().map(DoacaoResponseDTO::new).toList();
    }

    public DoacaoResponseDTO criar(CriarDoacaoDTO dto) {
        validarPonto(dto.pontoDestinoId());
        Doacao doacao = new Doacao();
        aplicar(doacao, dto);
        return new DoacaoResponseDTO(repository.save(doacao));
    }

    public DoacaoResponseDTO atualizar(Long id, CriarDoacaoDTO dto) {
        validarPonto(dto.pontoDestinoId());
        Doacao doacao = repository.findById(id)
                .orElseThrow(() -> new EntidadeNotFound("Doação não encontrada"));
        aplicar(doacao, dto);
        return new DoacaoResponseDTO(repository.save(doacao));
    }

    public void deletar(Long id) {
        if (!repository.existsById(id)) {
            throw new EntidadeNotFound("Doação não encontrada");
        }
        repository.deleteById(id);
    }

    private void validarPonto(Long pontoId) {
        pontoService.buscarPorId(pontoId);
    }

    private void aplicar(Doacao doacao, CriarDoacaoDTO dto) {
        doacao.setTipoItem(dto.tipoItem().trim());
        doacao.setQuantidade(dto.quantidade());
        doacao.setPontoDestinoId(dto.pontoDestinoId());
    }
}
