package com.example.lifeplus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;


@SpringBootApplication(exclude = {
        MongoAutoConfiguration.class,
        DataSourceAutoConfiguration.class
})
public class LifeplusApplication {

    public static void main(String[] args) {
        SpringApplication.run(LifeplusApplication.class, args);
    }

}
