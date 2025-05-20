package com.project.fasterp360.controller;

import com.project.fasterp360.dto.AuthRequest;
import com.project.fasterp360.dto.AuthResponse;
import com.project.fasterp360.security.entity.User;
import com.project.fasterp360.security.repository.UserRepository;
import com.project.fasterp360.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authManager;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest req) {
        try {
            log.info("Attempting registration for {}", req.getUsername());

            if (userRepository.findByUsername(req.getUsername()).isPresent()) {
                log.warn("Registration failed: username {} already exists", req.getUsername());
                return ResponseEntity
                  .badRequest()
                  .body("Username already exists");
            }

            User user = new User();
            user.setUsername(req.getUsername());
            user.setPassword(passwordEncoder.encode(req.getPassword()));
            user.setRole("ROLE_USER");
            userRepository.save(user);

            log.info("User {} registered successfully", req.getUsername());
            return ResponseEntity.ok("User registered");
        } catch (Exception e) {
            log.error("Error during registration for {}: {}", req.getUsername(), e.getMessage(), e);
            return ResponseEntity
              .status(500)
              .body("Registration error: " + e.getMessage());
        }
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
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}
