package com.hartur.maoamiga.config;

import com.hartur.maoamiga.entity.Ponto;
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
            if (repository.count() > 0) {
                return;
            }
            repository.saveAll(List.of(
                    ponto("Associação Viver Melhor", "Rua Goiás, 315 - Setor Central",
                            "Segunda a Sexta, das 08h às 18h",
                            "Recebe: Alimentos não perecíveis, roupas e produtos de higiene"),
                    ponto("Casa de Apoio Nova Vida", "Avenida Independência, 780 - Setor Oeste",
                            "Segunda a Sábado, das 08h às 17h",
                            "Recebe: Roupas, calçados, cobertores e itens de higiene pessoal"),
                    ponto("Projeto Sementes do Futuro", "Rua das Acácias, 126 - Jardim Primavera",
                            "Segunda a Sexta, das 09h às 17h",
                            "Recebe: Livros, materiais escolares, brinquedos e jogos educativos"),
                    ponto("Ponto Verde Reciclagem", "Avenida dos Ipês, 940 - Setor Industrial",
                            "Segunda a Sexta, das 08h às 16h; sábado, das 08h às 12h",
                            "Recebe: Papelão, garrafas PET, latinhas e resíduos eletrônicos"),
                    ponto("ONG Coração Solidário", "Rua Bela Vista, 210 - Setor Universitário",
                            "Terça a Sábado, das 09h às 18h",
                            "Recebe: Alimentos, roupas, fraldas e produtos de limpeza"),
                    ponto("Centro de Doações Recomeço", "Rua 14 de Julho, 560 - Bairro Santa Clara",
                            "Segunda a Sexta, das 08h às 17h",
                            "Recebe: Móveis, colchões, utensílios domésticos e eletrodomésticos"),
                    ponto("Espaço Comunitário Esperança", "Avenida das Palmeiras, 1025 - Bairro São José",
                            "Segunda a Sábado, das 08h às 18h",
                            "Recebe: Cestas básicas, roupas infantis, brinquedos e cobertores"),
                    ponto("Biblioteca Comunitária Ler e Crescer", "Rua do Cerrado, 145 - Setor Aeroporto",
                            "Segunda a Sexta, das 09h às 18h",
                            "Recebe: Livros, revistas, gibis e materiais de leitura infantil")
            ));
        };
    }

    private Ponto ponto(String nome, String endereco, String diasHorarios, String funcionamento) {
        Ponto ponto = new Ponto();
        ponto.setNome(nome);
        ponto.setEndereco(endereco);
        ponto.setDiasHorarios(diasHorarios);
        ponto.setFuncionamento(funcionamento);
        return ponto;
    }
}
