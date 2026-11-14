package com.hartur.maoamiga.repository;

import com.hartur.maoamiga.entity.Doacao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface DoacaoRepository extends JpaRepository<Doacao, UUID> {
    Page<Doacao> findByTipoItemContainingIgnoreCase(String tipoItem, Pageable pageable);
}
