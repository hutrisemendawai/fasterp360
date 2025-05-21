# Auth Controller (Backend)

**Location:**  
`src/main/java/com/project/fasterp360/controller/AuthController.java`

---

## Overview

The `AuthController` exposes two public endpoints under `/api/auth/**`:

1. **Register** a new user account linked to an existing Employee.  
2. **Login** with credentials to receive a JWT.

It uses Spring Security’s `AuthenticationManager` for login and a custom `JwtUtil` for token generation.

---

## Dependencies (injected)

```java
@Autowired private UserRepository        userRepository;
@Autowired private EmployeeRepository    employeeRepository;
@Autowired private RoleRepository        roleRepository;
@Autowired private PasswordEncoder       passwordEncoder;
@Autowired private AuthenticationManager authManager;
@Autowired private JwtUtil               jwtUtil;
````

* **`UserRepository`** — CRUD on `User` entities
* **`EmployeeRepository`** — lookup existing `Employee` by ID
* **`RoleRepository`** — fetch roles (e.g. `ROLE_USER`)
* **`PasswordEncoder`** — hash passwords (BCrypt)
* **`AuthenticationManager`** — validate credentials
* **`JwtUtil`** — generate & validate HS256 JWT tokens

---

## Endpoints

### 1. Register

```
POST /api/auth/register
Content-Type: application/json
```

#### Request Body

```json
{
  "username":    "alice",
  "password":    "s3cr3tPass",
  "employeeId":  42
}
```

#### Behavior

1. **Username check**
   Returns **400 Bad Request** if `username` already exists.
2. **Employee link**
   Fetches `Employee` by `employeeId`.
   Returns **400 Bad Request** if no such employee.
3. **Role assignment**
   Loads `Role` named `"ROLE_USER"` from the database.
   Returns **500 Internal Server Error** if missing.
4. **User creation**

   * Encodes `password` with `PasswordEncoder`.
   * Sets `employee` and `role`.
   * Saves the new `User` entity.

#### Success Response

* **200 OK**

  ```text
  "User registered"
  ```

#### Error Responses

* **400 Bad Request**

  * `"Username already exists"`
  * `"Invalid employeeId"`
* **500 Internal Server Error**

  * `"ROLE_USER not configured"`

---

### 2. Login

```
POST /api/auth/login
Content-Type: application/json
```

#### Request Body

```json
{
  "username": "alice",
  "password": "s3cr3tPass"
}
```

#### Behavior

1. Calls `authManager.authenticate(...)` with the credentials.
2. On success, generates a JWT via `jwtUtil.generateToken(username)`.
3. On authentication failure, returns **401 Unauthorized**.

#### Success Response

* **200 OK**

  ```json
  {
    "token": "<JWT_TOKEN>"
  }
  ```

#### Error Response

* **401 Unauthorized**

  ```text
  "Invalid credentials"
  ```

---

## Exception Handling

* Uses `ResponseStatusException` to map invalid inputs to appropriate HTTP status codes.
* Any unexpected error during registration (e.g. missing default role) bubbles up as **500 Internal Server Error**.

---

## Usage Flow

1. **User Registration**

   * Frontend `/pages/Register.jsx` fetches `/hr/employees` to populate a dropdown.
   * Submits `{ username, password, employeeId }` to `/api/auth/register`.
   * On success, the user is redirected to `/login`.

2. **User Login**

   * Frontend `/pages/Login.jsx` submits credentials to `/api/auth/login`.
   * Stores returned `token` in `localStorage`.
   * Redirects into the protected `/dashboard` area.

3. **Token Propagation**

   * All subsequent API requests go through `src/api/axios.js`, which injects
     `Authorization: Bearer <token>` into the header.
   * Backend `JwtFilter` validates the token and sets the security context.

---

## Sample cURL Requests

```bash
# Register
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"s3cr3t","employeeId":42}'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"s3cr3t"}'
```

---

*AuthController* is the entrypoint for all user‐facing account actions; it ties together user, employee, role repositories with Spring Security and JWT utilities to provide a seamless registration & authentication flow.
