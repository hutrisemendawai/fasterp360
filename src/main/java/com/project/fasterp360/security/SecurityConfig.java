package com.project.fasterp360.security;

import com.project.fasterp360.filter.JwtFilter;
import com.project.fasterp360.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.*;
import org.springframework.security.authentication.*;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.*;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final UserService userService;
    private final JwtFilter jwtFilter;

    @Autowired
    public SecurityConfig(UserService userService, JwtFilter jwtFilter) {
        this.userService = userService;
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
          // 1) CORS config
          .cors(cors -> cors.configurationSource(req -> {
              var cfg = new CorsConfiguration();
              cfg.setAllowedOrigins(List.of("http://localhost:5173"));
              cfg.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
              cfg.setAllowedHeaders(List.of("*"));
              cfg.setAllowCredentials(true);
              return cfg;
          }))

          // 2) disable CSRF (for stateless JWT APIs)
          .csrf(csrf -> csrf.disable())

          // 3) endpoint authorization rules
          .authorizeHttpRequests(auth -> auth
              .requestMatchers("/api/auth/**").permitAll()
              .anyRequest().authenticated()
          )

          // 4) add JWT filter before Spring Security’s UsernamePasswordAuthenticationFilter
          .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
        ;

        return http.build();
    }

    /**  
     * Expose AuthenticationManager so you can inject it into your AuthController  
     * (needed for AuthenticationManager.authenticate(...)).  
     */
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception {
        return config.getAuthenticationManager();
    }

    /** Password encoder bean for encoding & matching user passwords. */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
