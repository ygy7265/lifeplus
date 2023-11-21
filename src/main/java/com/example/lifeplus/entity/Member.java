package com.example.lifeplus.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@NoArgsConstructor
@Document("member")
public class Member {

    @Id
    private String id;
    private String email;
    private String password;
    private String name;
    private Autnority autnority;

    public void setUsername(String username) {
        this.name = name;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Builder
    public Member(String id, String email, String password, String name, Autnority autnority) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.autnority = autnority;
    }

}
