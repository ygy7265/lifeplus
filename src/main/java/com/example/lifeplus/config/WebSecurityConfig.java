package com.example.lifeplus.config;

import com.example.lifeplus.jwt.JwtAccessDeniedHandler;
import com.example.lifeplus.jwt.JwtAuthenticationEntryPoint;
import com.example.lifeplus.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.annotation.web.configurers.FormLoginConfigurer;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
@Component
public class WebSecurityConfig {
    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws  Exception{
        http
                //위변조 방지 비활성(개발할때만 끔)
                .csrf(CsrfConfigurer::disable)
                //기본 HTTP 인증방식 비활성
                .httpBasic(HttpBasicConfigurer::disable)
                //sessionManagement = 세션 비활성(세션말고 토큰씀)
                .sessionManagement(config -> config.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                //form login 비활성(토큰방식일때는 안씀)
                .formLogin(FormLoginConfigurer::disable)


                .exceptionHandling(exceptionHandling -> {
                    exceptionHandling.authenticationEntryPoint(jwtAuthenticationEntryPoint);
                    exceptionHandling.accessDeniedHandler(jwtAccessDeniedHandler);
                })

                .authorizeHttpRequests(authorizeHttpRequest -> authorizeHttpRequest
                        .requestMatchers("/").permitAll()//인가설정
                        .requestMatchers("/**").permitAll()
                        .anyRequest().authenticated()
                )
                //tokenProvider 적용
                .apply(new JwtSecurityConfig(tokenProvider));

        return http.build();
    }
}
