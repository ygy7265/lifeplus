package com.example.lifeplus.service;

import com.example.lifeplus.dto.MemberRequestDTO;
import com.example.lifeplus.dto.MemberResponseDTO;
import com.example.lifeplus.dto.TokenDTO;
import com.example.lifeplus.entity.Member;
import com.example.lifeplus.jwt.TokenProvider;
import com.example.lifeplus.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final AuthenticationManagerBuilder managerBuilder;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;

    public MemberResponseDTO singup(MemberRequestDTO requestDTO){
        if(memberRepository.findByEmail(requestDTO.getEmail()) != null){
            throw  new RuntimeException("이미 가입되있는 유저입니다");
        }
        log.info(requestDTO);
        Member member = requestDTO.toMember(passwordEncoder);
        log.info(member.toString());
        return MemberResponseDTO.of(memberRepository.save(member));
    }

    public TokenDTO login(MemberRequestDTO requestDTO){
        UsernamePasswordAuthenticationToken authenticationToken = requestDTO.toAuthentication();

        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);
        return tokenProvider.generateTokenDto(authentication);
    }
}
