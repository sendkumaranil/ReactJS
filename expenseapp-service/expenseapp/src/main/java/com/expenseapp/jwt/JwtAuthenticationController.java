package com.expenseapp.jwt;

import com.expenseapp.model.User;
import com.expenseapp.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class JwtAuthenticationController {

    private Logger logger= LoggerFactory.getLogger(JwtAuthenticationController.class);

    @Value("${jwt.http.request.header}")
    private String tokenHeader;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping(value = "${jwt.get.token.uri}")
    public ResponseEntity<?> createAuthToken(@RequestBody JwtTokenRequest jwtTokenRequest)
        throws AuthenticationException {

        if(authenticate(jwtTokenRequest.getUsername(),jwtTokenRequest.getPassword())){
            final User user=userRepository.findByUsername(jwtTokenRequest.getUsername());
            String jwtToken=jwtTokenUtil.generateToken(user);
            return ResponseEntity.ok(new JwtTokenResponse(jwtToken));
        }else {
            InvalidCredentialResponse invalidCreds=new InvalidCredentialResponse(
                    jwtTokenRequest.getUsername(),"Invalid Credentials");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(invalidCreds);
        }
    }

    @GetMapping(value="${jwt.refresh.token.uri}")
    public ResponseEntity<?> refreshAndGetAuthenticationToken(HttpServletRequest request){
        String authToken=request.getHeader(tokenHeader);
        final String token=authToken.substring(7);
        String username=jwtTokenUtil.getUsernameFromToken(token);
        JwtUserDetails user=(JwtUserDetails) userDetailsService.loadUserByUsername(username);
        if(jwtTokenUtil.canTokenBeRefreshed(token)){
            String refreshToken=jwtTokenUtil.refreshToken(token);
            return ResponseEntity.ok(new JwtTokenResponse(refreshToken));
        }else {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<String> handleAuthenticationException(AuthenticationException exp){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(exp.getMessage());
    }

    private boolean authenticate(String username,String password){
        Objects.requireNonNull(username);
        Objects.requireNonNull(password);

        try{
            List<SimpleGrantedAuthority> authorities=new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority("ROLE_USER_2"));

            UsernamePasswordAuthenticationToken uat = new UsernamePasswordAuthenticationToken(username, password, authorities);
            authenticationManager.authenticate(uat);

        }catch(DisabledException exp){
            logger.error("Error",exp);
            return false;
        }catch(BadCredentialsException exp){
            logger.error("Error: Invalid username and password",exp);
            return false;
        }
        return true;
    }

}
