package com.example.lifeplus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class LifeplusApplication {

    public static void main(String[] args) {
        SpringApplication.run(LifeplusApplication.class, args);
    }

}
