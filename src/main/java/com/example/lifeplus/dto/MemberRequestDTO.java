package com.example.lifeplus.dto;

import com.example.lifeplus.entity.Autnority;
import com.example.lifeplus.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberRequestDTO {

    private Long id;
    private String email;
    private String password;
    private String username;

    public Member toMember(PasswordEncoder passwordEncoder){
        return Member.builder()
                .id(id)
                .email(email)
                .password(passwordEncoder.encode(password))
                .username(username)
                .autnority(Autnority.ROLE_USER)
                .build();
    }

    public UsernamePasswordAuthenticationToken toAuthentication(){
        return new UsernamePasswordAuthenticationToken(email,password);
    }
}
