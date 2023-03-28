package com.blockchain.cap.config.Auth;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.blockchain.cap.api.service.UserService;
import com.blockchain.cap.domain.User.User;
import com.blockchain.cap.util.JwtTokenUtil;
import com.blockchain.cap.util.ResponseBodyWriteUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends BasicAuthenticationFilter {

    private UserService userService;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, UserService userService){
        super(authenticationManager);
        this.userService=userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String header=request.getHeader(JwtTokenUtil.HEADER_STRING);

        if(header==null || !header.startsWith(JwtTokenUtil.TOKEN_PRIFIX)) {
            chain.doFilter(request, response);
            return;
        }

        try {
            Authentication authentication=getAuthentication(request);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (Exception ex) {
            ResponseBodyWriteUtil.sendError(request,response,ex);
            return;
        }

        super.doFilterInternal(request, response, chain);
    }

    @Transactional(readOnly = true)
    public Authentication getAuthentication(HttpServletRequest request) throws Exception {
        String token=request.getHeader(JwtTokenUtil.HEADER_STRING);

        if(token!=null){
            JWTVerifier verifier=JwtTokenUtil.getVerifier();
            JwtTokenUtil.handleError(token);
            DecodedJWT decodedJWT=verifier.verify(token.replace(JwtTokenUtil.TOKEN_PRIFIX,""));
            String loginId=decodedJWT.getSubject();

            if(loginId!=null) {
                User user=userService.getUserByLoginId(loginId);
                if(user!=null) {
                    CapUserDetail userDetail=new CapUserDetail(user);
                    UsernamePasswordAuthenticationToken jwtAuthentication = new UsernamePasswordAuthenticationToken(loginId,null,userDetail.getAuthorities());
                    return jwtAuthentication;
                }
            }
        }

        return null;
    }

}
