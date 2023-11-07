package com.example.lifeplus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
<<<<<<< HEAD

@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
=======
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;


@SpringBootApplication(exclude = {
        MongoAutoConfiguration.class,
        DataSourceAutoConfiguration.class
})
>>>>>>> 9d25e815b3b7f077913c96d768e2187da70454b4
public class LifeplusApplication {

    public static void main(String[] args) {
        SpringApplication.run(LifeplusApplication.class, args);
    }

}
