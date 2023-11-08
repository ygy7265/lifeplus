package com.example.lifeplus.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Builder
@NoArgsConstructor
@Document("member")
public class Member {

    @Id
    private Long id;
    private String email;
    private String password;
    private String username;
    private String ipAddress;
    private Autnority autnority;

    public void setUsername(String username){
        this.username = username;
    }
    public void setPassword(String password){
        this.password = password;
    }

    @Builder
    public Member(Long id, String email,String password,String username,String ipAddress,Autnority autnority){
        this.id = id;
        this.email = email;
        this.password = password;
        this.username = username;
        this.ipAddress = ipAddress;
        this.autnority = autnority;
    }

}
