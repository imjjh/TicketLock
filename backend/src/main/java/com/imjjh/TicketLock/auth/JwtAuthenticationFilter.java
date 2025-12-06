package com.imjjh.TicketLock.auth;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * JWT 인증 필터
 * OncePerRequestFilter 상속으로 요청당 한 번만 실행 보장
 *
 */
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    /**
     * Request Header에서 토큰을 추출하여 유효성 검사 후 SecurityContext에 Authentication 객체를 저장합니다.
     * @param request
     * @param response
     * @param filterChain
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // Request Header 에서 토큰 추출
        String token = resolveToken(request);

        // 토큰 유효성 검사
        if (token !=null && jwtTokenProvider.validateToken(token)){
            // 토큰으로부터 유저 정보를 받아옵니다.
            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            // SecurityContext에 Authentication 객체를 저장합니다. (인증 완료 처리)
            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.debug("Security Context에 '{}' 인증 정보를 저장했습니다, uri: {}", authentication.getName(), request.getRequestURI());
        }
        // 다음 필터로 요청 넘기기
        filterChain.doFilter(request,response);
    }


    /**
     *
     *  Request Header 에서 "Bearer "로 시작하는 토큰 정보를 추출하는 메서드
     * @param request
     * @return
     */
    private String resolveToken(HttpServletRequest request) {
            String bearerToken = request.getHeader("Authorization");
            if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")){
                return bearerToken.substring(7); // "Bearer " 이후의 문자열(토큰 본문)
            }
            return null;
    }


}

