package com.hartur.maoamiga.repository;

import com.hartur.maoamiga.entity.Ponto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface PontoRepository extends JpaRepository<Ponto, UUID> {
    Page<Ponto> findByNomeContainingIgnoreCaseOrBairroContainingIgnoreCase(String nome, String bairro, Pageable pageable);
}
