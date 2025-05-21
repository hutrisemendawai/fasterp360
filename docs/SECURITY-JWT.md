
---

### **`docs/security-jwt.md`**
```markdown
# Security & JWT (Backend)

**Location:** `src/main/java/com/project/fasterp360/security/SecurityConfig.java`

## Responsibilities
1. CORS configuration to allow `http://localhost:5173`.
2. Disable CSRF for stateless JWT API.
3. Whitelist `/api/auth/**`, secure all other endpoints.
4. Insert `JwtFilter` before Spring Security’s username/password filter.

```java
http
  .cors(...)  
  .csrf(csrf->csrf.disable())
  .authorizeHttpRequests(auth->auth
      .requestMatchers("/api/auth/**").permitAll()
      .anyRequest().authenticated()
  )
  .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
