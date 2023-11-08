package com.example.lifeplus.service;

import com.example.lifeplus.dto.MemberRequestDTO;
import com.example.lifeplus.dto.MemberResponseDTO;
import com.example.lifeplus.dto.TokenDto;
import com.example.lifeplus.entity.Member;
import com.example.lifeplus.jwt.TokenProvider;
import com.example.lifeplus.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AutnService {

    private final AuthenticationManagerBuilder managerBuilder;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;

    public MemberResponseDTO singup(MemberRequestDTO requestDTO){
//        if(memberRepository.findById(requestDTO.getId())){
//            throw  new RuntimeException("이미 가입되있는 유저입니다");
//        }

        Member member = requestDTO.toMember(passwordEncoder);
        return MemberResponseDTO.of(memberRepository.save(member));
    }

    public TokenDto login(MemberRequestDTO requestDTO){
        UsernamePasswordAuthenticationToken authenticationToken = requestDTO.toAuthentication();

        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);
        return tokenProvider.generateTokenDto(authentication);
    }
}
