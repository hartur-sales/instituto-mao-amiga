package com.hartur.maoamiga.config;

import com.hartur.maoamiga.entity.Ponto;
import com.hartur.maoamiga.entity.TipoPonto;
import com.hartur.maoamiga.repository.PontoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DadosIniciaisConfig {
    @Bean
    CommandLineRunner carregarPontos(PontoRepository repository) {
        return args -> {
            if (repository.count() > 0) return;
            repository.saveAll(List.of(
                    ponto("Associação Viver Melhor", "Rua Goiás, 315", "Setor Central", "Seg a Sex, 8h às 18h", "coleta"),
                    ponto("Casa de Apoio Nova Vida", "Avenida Independência, 780", "Setor Oeste", "Seg a Sáb, 8h às 17h", "distribuição"),
                    ponto("Projeto Sementes do Futuro", "Rua das Acácias, 126", "Jardim Primavera", "Seg a Sex, 9h às 17h", "coleta"),
                    ponto("Ponto Verde Reciclagem", "Avenida dos Ipês, 940", "Setor Industrial", "Seg a Sex, 8h às 16h", "coleta"),
                    ponto("ONG Coração Solidário", "Rua Bela Vista, 210", "Setor Universitário", "Ter a Sáb, 9h às 18h", "distribuição"),
                    ponto("Centro de Doações Recomeço", "Rua 14 de Julho, 560", "Santa Clara", "Seg a Sex, 8h às 17h", "coleta"),
                    ponto("Espaço Comunitário Esperança", "Avenida das Palmeiras, 1025", "São José", "Seg a Sáb, 8h às 18h", "distribuição"),
                    ponto("Biblioteca Comunitária Ler e Crescer", "Rua do Cerrado, 145", "Setor Aeroporto", "Seg a Sex, 9h às 18h", "coleta"),
                    ponto("Instituto Recomeçar", "Rua 1, 100", "Setor Bueno", "Seg a Sex, 8h às 17h", "coleta"),
                    ponto("Ação Social Goiás", "Rua 2, 200", "Setor Campinas", "Seg a Sáb, 8h às 16h", "distribuição"),
                    ponto("Casa Fraterna", "Rua 3, 300", "Vila Nova", "Seg a Sex, 9h às 18h", "coleta"),
                    ponto("Projeto Bem Viver", "Rua 4, 400", "Setor Pedro Ludovico", "Seg a Sex, 8h às 17h", "distribuição"),
                    ponto("Rede Solidária", "Rua 5, 500", "Jardim América", "Seg a Sáb, 8h às 18h", "coleta"),
                    ponto("Ponto Esperança", "Rua 6, 600", "Setor Leste", "Seg a Sex, 9h às 17h", "coleta"),
                    ponto("Caminho da Paz", "Rua 7, 700", "Setor Marista", "Seg a Sex, 8h às 18h", "distribuição"),
                    ponto("Mãos Unidas", "Rua 8, 800", "Setor Norte", "Seg a Sáb, 8h às 17h", "coleta"),
                    ponto("Instituto Acolher", "Rua 9, 900", "Setor Sul", "Seg a Sex, 9h às 18h", "distribuição"),
                    ponto("Vizinhos do Bem", "Rua 10, 1000", "Setor Bueno", "Seg a Sex, 8h às 17h", "coleta"),
                    ponto("Sementes de Goiás", "Rua 11, 1100", "Setor Oeste", "Seg a Sáb, 8h às 18h", "coleta"),
                    ponto("Casa do Voluntário", "Rua 12, 1200", "Setor Central", "Seg a Sex, 9h às 17h", "distribuição"),
                    ponto("Núcleo Cidadania", "Rua 13, 1300", "Setor Universitário", "Seg a Sex, 8h às 18h", "coleta"),
                    ponto("Projeto Girassol", "Rua 14, 1400", "Jardim Goiás", "Seg a Sáb, 8h às 17h", "distribuição"),
                    ponto("Espaço Cuidar", "Rua 15, 1500", "Setor Aeroporto", "Seg a Sex, 9h às 18h", "coleta"),
                    ponto("Centro Nova Chance", "Rua 16, 1600", "Campinas", "Seg a Sex, 8h às 17h", "coleta"),
                    ponto("Instituto Novo Dia", "Rua 17, 1700", "Setor Leste", "Seg a Sáb, 8h às 18h", "distribuição")
            ));
        };
    }

    private Ponto ponto(String nome, String endereco, String bairro, String horario, String tipo) {
        Ponto ponto = new Ponto();
        ponto.setNome(nome);
        ponto.setEndereco(endereco);
        ponto.setBairro(bairro);
        ponto.setHorario(horario);
        ponto.setTipo(TipoPonto.valueOf(tipo));
        return ponto;
    }
}
