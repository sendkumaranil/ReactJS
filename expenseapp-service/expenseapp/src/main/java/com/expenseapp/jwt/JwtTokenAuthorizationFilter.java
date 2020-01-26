package com.expenseapp.jwt;

import com.expenseapp.model.User;
import com.expenseapp.repository.UserRepository;
import io.jsonwebtoken.ExpiredJwtException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayDeque;

@CrossOrigin(origins = "http://localhost:3000")
@Component
public class JwtTokenAuthorizationFilter extends OncePerRequestFilter {
    private final Logger logger = LoggerFactory.getLogger(JwtTokenAuthorizationFilter.class);

    @Autowired
    private UserDetailsService userDetailsService;

    @Value("${jwt.http.request.header}")
    private String tokenHeader;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        logger.info("Authentication Request For '{}'", request.getRequestURL());

        String reqTokenHeader=request.getHeader(this.tokenHeader);

        String username=null;
        String jwtToken=null;

        if(reqTokenHeader!=null && reqTokenHeader.startsWith("Bearer ")){
            jwtToken=reqTokenHeader.substring(7);
            try{
                username=jwtTokenUtil.getUsernameFromToken(jwtToken);
            }catch(IllegalArgumentException exp){
                logger.error("Error getting username from token ",exp);
            }catch(ExpiredJwtException e){
                logger.error("Token Expiration: ",e);
            }
        }

        try {
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                User userDetails = userRepository.findByUsername(username);
                if (jwtTokenUtil.validateToken(jwtToken, userDetails)) {
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                            new UsernamePasswordAuthenticationToken(userDetails, null, new ArrayDeque<>());
                    usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                }
            }
        }catch(Exception e){
            logger.error("Error occurred in token validation::"+e.getMessage());
            throw new AuthenticationException("Token Validation Internal Error::",e);
        }
        filterChain.doFilter(request,httpServletResponse);
    }
}
