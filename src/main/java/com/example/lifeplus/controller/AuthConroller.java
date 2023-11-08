package com.example.lifeplus.controller;

import com.example.lifeplus.dto.MemberRequestDTO;
import com.example.lifeplus.dto.MemberResponseDTO;
import com.example.lifeplus.dto.TokenDto;
import com.example.lifeplus.service.AutnService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthConroller {

    private final AutnService service;

    @PostMapping("/signup")
    public ResponseEntity<MemberResponseDTO> singup(@RequestBody MemberRequestDTO requestDTO){
        return ResponseEntity.ok(service.singup(requestDTO));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody MemberRequestDTO requestDTO){
        return ResponseEntity.ok(service.login(requestDTO));
    }
}
