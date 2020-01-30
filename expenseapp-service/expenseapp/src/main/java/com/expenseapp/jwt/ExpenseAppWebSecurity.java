package com.expenseapp.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
public class ExpenseAppWebSecurity extends WebSecurityConfigurerAdapter {

    private UserDetailsService userDetailsService;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Value("${jwt.get.token.uri}")
    private String authenticationPath;

    @Value("${app.create.user.uri}")
    private String createNewUserPath;

    @Autowired
    private JwtTokenAuthorizationFilter jwtTokenAuthorizationFilter;

    @Autowired
    private JwtUnAuthorizedResponseAuthenticationEntryPoint authenticationEntryPoint;

    public ExpenseAppWebSecurity(UserDetailsService userDetailsService,BCryptPasswordEncoder bCryptPasswordEncoder){
        this.userDetailsService=userDetailsService;
        this.bCryptPasswordEncoder=bCryptPasswordEncoder;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .exceptionHandling().authenticationEntryPoint(authenticationEntryPoint)
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST,"/expenseapp/h2db").permitAll()
                .anyRequest().authenticated();
        http.addFilterBefore(jwtTokenAuthorizationFilter, UsernamePasswordAuthenticationFilter.class);
        http.headers().frameOptions().disable();//for h2 console access
    }

    @Override
    public void configure(WebSecurity webSecurity) throws Exception {
        webSecurity
                .ignoring()
                .antMatchers(HttpMethod.POST,authenticationPath)
                .antMatchers(HttpMethod.POST,createNewUserPath)
                .antMatchers(HttpMethod.OPTIONS,"/**")
                .and()
                .ignoring()
                .antMatchers("/expenseapp/h2db/**/**");
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
