package com.example.lifeplus.service;

import com.example.lifeplus.config.SecurityUtil;
import com.example.lifeplus.dto.MemberResponseDTO;
import com.example.lifeplus.entity.Member;
import com.example.lifeplus.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberResponseDTO getMyInfoBySecurity(){
        return memberRepository.findById(SecurityUtil.getCurrentMemberId())
                .map(MemberResponseDTO::of)
                .orElseThrow(()-> new RuntimeException("로그인 유저 정보가없습니다."));
    }
    @Transactional
    public MemberResponseDTO changeMemberUsername(String userid,String username){
        Member member = memberRepository.findByEmail(userid).orElseThrow(()-> new RuntimeException("로그인 유저 정보가없습니다."));
        member.setUsername(username);
        return MemberResponseDTO.of(memberRepository.save(member));
    }

    @Transactional
    public MemberResponseDTO changeMemberPassword(String userid,String exPassword,String newPassword){
        Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId()).orElseThrow(()-> new RuntimeException("로그인 유저 정보가없습니다."));
        if(!passwordEncoder.matches(exPassword,member.getPassword())){
            throw new RuntimeException("비밀번호가 맞지않습니다");
        }
        member.setPassword(passwordEncoder.encode((newPassword)));
        return MemberResponseDTO.of(memberRepository.save(member));
    }
}

