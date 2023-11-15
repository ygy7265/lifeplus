package com.example.lifeplus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication()
public class LifeplusApplication {

    public static void main(String[] args) {
        SpringApplication.run(LifeplusApplication.class, args);
    }

}
