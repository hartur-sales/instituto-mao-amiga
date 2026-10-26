package com.hartur.maoamiga;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition
public class MaoAmigaApplication {

    public static void main(String[] args) {
        SpringApplication.run(MaoAmigaApplication.class, args);
    }

}

//Na raiz do projeto:
//npm install
//cp .env.example .env
//Suba o backend em um terminal:
//npm run backend
//Em outro terminal, suba o Expo:
//npm start
//Depois escolha Web, Android ou iOS no menu do Expo.
//Para Android Emulator, configure o .env assim:
//EXPO_PUBLIC_API_URL=http://10.0.2.2:8080/api/v1
//Para navegador ou simulador iOS:
//EXPO_PUBLIC_API_URL=http://localhost:8080/api/v1
//Para celular físico, use o IP da máquina na rede local:
//EXPO_PUBLIC_API_URL=http://SEU_IP:8080/api/v1
//O Java usado pelo backend precisa ser o mesmo configurado no backend/pom.xml — atualmente Java 25. O backend fica disponível em http://localhost:8080; a documentação Swagger, se habilitada corretamente, em:
//http://localhost:8080/swagger-ui.html