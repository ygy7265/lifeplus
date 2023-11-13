package com.example.lifeplus.config;

import com.example.lifeplus.jwt.JwtFilter;
import com.example.lifeplus.jwt.TokenProvider;
import com.example.lifeplus.service.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
    private final TokenProvider tokenProvider;
    private final CustomUserDetailsService customUserDetailsService;

    public void configure(HttpSecurity http){
        // Assuming JwtFilter constructor requires two arguments
        JwtFilter customFilter = new JwtFilter(tokenProvider, customUserDetailsService);
        http.addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
    }

}
