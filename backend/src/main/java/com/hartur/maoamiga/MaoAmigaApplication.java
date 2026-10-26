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
