package com.example.lifeplus.controller;

import com.example.lifeplus.dto.MemberRequestDTO;
import com.example.lifeplus.dto.MemberResponseDTO;
import com.example.lifeplus.dto.TokenDTO;
import com.example.lifeplus.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Log4j2
@RequiredArgsConstructor
public class AuthController {

    private final AuthService service;

    @PostMapping("/signup")
    public ResponseEntity<MemberResponseDTO> singup(@RequestBody MemberRequestDTO requestDTO){
        return ResponseEntity.ok(service.singup(requestDTO));
    }


    @PostMapping("/login")
    public ResponseEntity<TokenDTO> login(@RequestBody MemberRequestDTO requestDTO){
        log.info(requestDTO.getEmail());
        log.info(requestDTO.getPassword());
        return ResponseEntity.ok(service.login(requestDTO));
    }
}
