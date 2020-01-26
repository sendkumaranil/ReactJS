package com.expenseapp.jwt;

import java.io.Serializable;

public class JwtTokenRequest implements Serializable {

    private static final long serialVersionUID=19887111L;

    private String username;
    private String password;

    public JwtTokenRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public JwtTokenRequest(){
        super();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
