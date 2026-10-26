package com.hartur.maoamiga.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.OffsetDateTime;

@Entity
@Table(name = "doacao")
@Data
public class Doacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String tipoItem;

    @Column(nullable = false)
    private Integer quantidade;

    @Column(nullable = false)
    private Long pontoDestinoId;

    @Column(nullable = false)
    private OffsetDateTime criadoEm;

    @PrePersist
    void definirDataCriacao() {
        if (criadoEm == null) {
            criadoEm = OffsetDateTime.now();
        }
    }
}
