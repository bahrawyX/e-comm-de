package com.java.dih.e_commerce.api.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("DIH E-Commerce API")
                        .version("1.0.0")
                        .description("REST API for the DIH E-Commerce application")
                        .contact(new Contact()
                                .name("DIH Team")));
    }
}

