package com.imjjh.TicketLock.config;

import com.imjjh.TicketLock.auth.JwtAuthenticationFilter;
import com.imjjh.TicketLock.auth.JwtTokenProvider;
import com.imjjh.TicketLock.auth.handler.OAuth2SuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final OAuth2SuccessHandler oAuth2SuccessHandler;
    private final JwtTokenProvider jwtTokenProvider;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
                .csrf(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)

                // 스프링 시큐리티는 기본적으로 세션을 사용
                // JWT 사용시 세션을 아예 생성하지 않도록 (Stateless) 설정
                .sessionManagement(session->session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(auth-> auth
                        // 로그인 이전 허용 페이지
                        // 소셜 로그인 관련 URL과 로그인 페이지
                        .requestMatchers("/oauth2/**", "/log").permitAll()
                        // 그외 모든 요청은 인증된 사용자만 접근 가능
                        .anyRequest().authenticated()
                )

                .oauth2Login(oauth2->oauth2
                        .successHandler(oAuth2SuccessHandler)
                )

                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}
