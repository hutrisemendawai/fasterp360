package com.project.fasterp360.controller;

import com.project.fasterp360.dto.AuthRequest;
import com.project.fasterp360.dto.AuthResponse;
import com.project.fasterp360.dto.RegisterRequest;
import com.project.fasterp360.entity.User;
import com.project.fasterp360.entity.Role;
import com.project.fasterp360.module.hr.entity.Employee;
import com.project.fasterp360.repository.UserRepository;
import com.project.fasterp360.repository.RoleRepository;
import com.project.fasterp360.module.hr.repository.EmployeeRepository;
import com.project.fasterp360.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private UserRepository userRepository;
    @Autowired private EmployeeRepository employeeRepository;
    @Autowired private RoleRepository roleRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private AuthenticationManager authManager;
    @Autowired private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        if (userRepository.findByUsername(req.getUsername()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username already exists");
        }

        Employee emp = employeeRepository.findById(req.getEmployeeId())
            .orElseThrow(() ->
                new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid employeeId")
            );

        Role defaultRole = roleRepository.findByName("ROLE_USER")
            .orElseThrow(() ->
                new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "ROLE_USER not configured")
            );

        User u = new User();
        u.setUsername(req.getUsername());
        u.setPassword(passwordEncoder.encode(req.getPassword()));
        u.setEmployee(emp);
        u.setRole(defaultRole);
        userRepository.save(u);

        return ResponseEntity.ok("User registered");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest req) {
        try {
            authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword())
            );
            String token = jwtUtil.generateToken(req.getUsername());
            return ResponseEntity.ok(new AuthResponse(token));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}
