package com.project.fasterp360.dto;

public class RegisterRequest {
    private String username;
    private String password;
    private Long employeeId;

    public RegisterRequest() {}

    public String getUsername() { return username; }
    public void setUsername(String u) { this.username = u; }

    public String getPassword() { return password; }
    public void setPassword(String p) { this.password = p; }

    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long id) { this.employeeId = id; }
}
