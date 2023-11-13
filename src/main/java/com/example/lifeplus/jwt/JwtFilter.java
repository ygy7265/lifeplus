package com.example.lifeplus.jwt;

import com.example.lifeplus.dto.TokenDTO;
import com.example.lifeplus.service.CustomUserDetailsService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Log4j2
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String BEARER_PREFIX = "Bearer ";
    private final TokenProvider tokenProvider;
    private final CustomUserDetailsService customUserDetailsService;


    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
            return bearerToken.substring(7);
        }
        return null;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String jwt = resolveToken(request);

        if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
            Authentication authentication = tokenProvider.getAuthentication(jwt);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } else {
            // Token is not valid, try refreshing using the Refresh Token
            String refreshToken = request.getHeader("Refresh-Token");

            if (StringUtils.hasText(refreshToken)) {
                try {
                    Claims claims = Jwts.parser().setSigningKey(tokenProvider.getSecretKey()).parseClaimsJws(refreshToken).getBody();
                    String username = claims.getSubject();

                    if (StringUtils.hasText(username) && SecurityContextHolder.getContext().getAuthentication() == null) {
                        UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
                        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                        SecurityContextHolder.getContext().setAuthentication(authentication);

                        // Generate a new Access Token
                        TokenDTO newAccessToken = tokenProvider.generateTokenDto(authentication);

                        // Add the new Access Token to the response headers
                        response.setHeader("Access-Token", newAccessToken.getAccessToken());
                    }
                } catch (Exception e) {
                    log.error("Error refreshing Access Token: {}", e.getMessage());
                }
            }

            filterChain.doFilter(request, response);
        }
    }
}