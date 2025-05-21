package com.project.fasterp360.security;

import com.project.fasterp360.filter.JwtFilter;
import com.project.fasterp360.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;                        // <— add this
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final JwtFilter jwtFilter;
    private final UserService userService;

    @Autowired
    public SecurityConfig(JwtFilter jwtFilter, UserService userService) {
        this.jwtFilter = jwtFilter;
        this.userService = userService;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
          // 1) CORS configuration
          .cors(cors -> cors.configurationSource(req -> {
              var cfg = new CorsConfiguration();
              cfg.setAllowedOrigins(List.of("http://localhost:5173"));
              cfg.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
              cfg.setAllowedHeaders(List.of("*"));
              cfg.setAllowCredentials(true);
              return cfg;
          }))

          // 2) disable CSRF (stateless JWT API)
          .csrf(csrf -> csrf.disable())

          // 3) authorize endpoints
          .authorizeHttpRequests(auth -> auth
              // open registration & login
              .requestMatchers("/api/auth/**").permitAll()

              // allow anyone to GET employees (list & single)
              .requestMatchers(HttpMethod.GET, "/api/hr/employees/**").permitAll()

              // everything else requires a valid JWT
              .anyRequest().authenticated()
          )

          // 4) add JWT filter before Spring Security’s processing
          .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /** Expose AuthenticationManager to be used in your AuthController */
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception {
        return config.getAuthenticationManager();
    }

    /** BCrypt password encoder for hashing and verifying user passwords */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
