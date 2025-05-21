// src/main/java/com/project/fasterp360/dto/AuthRequest.java
package com.project.fasterp360.dto;

public class AuthRequest {
    private String username;
    private String password;

    public AuthRequest() {
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
