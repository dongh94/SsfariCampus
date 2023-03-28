package com.blockchain.cap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class CapApplication {

	public static void main(String[] args) {
		SpringApplication.run(CapApplication.class, args);
	}

}
