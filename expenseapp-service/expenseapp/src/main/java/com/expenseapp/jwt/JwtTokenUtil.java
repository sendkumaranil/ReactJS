package com.expenseapp.jwt;

import com.expenseapp.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Clock;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.DefaultClock;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtTokenUtil {

    private static Clock clock= DefaultClock.INSTANCE;

    @Value("${jwt.signing.key.secret}")
    private String secretKey;

    @Value("${jwt.token.expiration.seconds}")
    private Long expiration;

    private Claims getAllClaimsForToken(String token){
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    }

    public  <T> T getClaimForToken(String token, Function<Claims,T> claimsResolver){
        final Claims claims=getAllClaimsForToken(token);
        return claimsResolver.apply(claims);
    }

    public  String getUsernameFromToken(String token){
        return getClaimForToken(token,Claims::getSubject);
    }

    public  Date getIssuedAtDateFromToken(String token){
        return getClaimForToken(token,Claims::getIssuedAt);
    }

    public  Date getExpirationDateFromToken(String token){
        return getClaimForToken(token,Claims::getExpiration);
    }

    public  boolean isTokenExpired(String token){
        Date dateExpiration=getExpirationDateFromToken(token);
        return dateExpiration.before(clock.now());
    }

    private  boolean ignoreTokenExpiration(String token){
        return false;
    }

    public  String generateToken(User userDetails){
        Map<String,Object> claims=new HashMap<>();
        return doGenerateToken(claims,userDetails.getUsername());
    }

    private  String doGenerateToken(Map<String,Object> claims,String subject){
        Date createdDate=clock.now();
        Date expirationDate=calculateExpirationDate(createdDate);

        String token=Jwts.builder().setClaims(claims)
                        .setSubject(subject)
                        .setIssuedAt(createdDate)
                        .setExpiration(expirationDate)
                        .signWith(SignatureAlgorithm.HS512,secretKey)
                        .compact();
        return token;
    }

    public  String refreshToken(String token){
        final Date createdDate=clock.now();
        final Date expirationDate=calculateExpirationDate(createdDate);

        final Claims claims=getAllClaimsForToken(token);
        claims.setIssuedAt(createdDate);
        claims.setExpiration(expirationDate);

        return Jwts.builder().setClaims(claims)
                .signWith(SignatureAlgorithm.HS512,secretKey)
                .compact();
    }

    public  boolean validateToken(String token,User userDetails) throws AuthenticationException{
        final String username=getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public  boolean canTokenBeRefreshed(String token){
        return (!isTokenExpired(token) || ignoreTokenExpiration(token));
    }

    private  Date calculateExpirationDate(Date createdDate){
        return new Date(createdDate.getTime() + expiration * 1000);
    }
}
