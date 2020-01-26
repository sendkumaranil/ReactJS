package com.expenseapp.jwt;

public class InvalidCredentialResponse {

    private String username;
    private String errorMessage;

    public InvalidCredentialResponse(String username, String errorMessage) {
        this.username = username;
        this.errorMessage = errorMessage;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}
