package com.expenseapp.jwt;

import java.io.Serializable;

public class JwtTokenResponse implements Serializable {

    private static final long serialVersionUID=1234444L;

    private String token;

    public JwtTokenResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }
}
