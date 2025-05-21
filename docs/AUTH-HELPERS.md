# Authentication Helpers

This module contains all components and utilities related to authentication flows within the frontend.

---

## 1. API Client Interceptor

**Location:** `src/api/axios.js`

* Automatically attaches the stored JWT to every request:

  ```js
  api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  ```

* Base URL and JSON headers configuration ensure consistency across calls.

---

## 2. ProtectedRoute Component

**Location:** `src/components/ProtectedRoute.jsx`

```jsx
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  return token
    ? children
    : <Navigate to="/login" replace />;
}
```

* Checks for a JWT in `localStorage`.
* Redirects to `/login` if the token is missing.
* Wraps any route or section requiring authentication.

---

## 3. Login Page

**Location:** `src/pages/Login.jsx`

* Form for `username` and `password`.
* Calls `api.post('/auth/login', { username, password })`.
* On success:

  1. Stores token: `localStorage.setItem('token', token)`
  2. Navigates to `/dashboard`.
* Displays server-side errors (e.g. "Invalid credentials").

---

## 4. Register Page

**Location:** `src/pages/Register.jsx`

* Dropdown of existing Employees fetched from `/hr/employees`.
* Supports URL param `?employeeId=` for pre-selection.
* Calls `api.post('/auth/register', formData)`.
* On success: navigates to `/login`.
* Shows validation errors (username taken, invalid employee ID, etc.).

---

## 5. Logout Flow

* Implemented in `Layout.jsx`:

  ```jsx
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };
  ```
* Clears JWT from storage and redirects to the login screen.

---

## 6. Token Validation & Auto-Refresh (Optional)

* While not currently implemented, you can extend the interceptor to:

  * Detect token expiration.
  * Trigger a refresh flow or force logout.

---

**Summary:**

* **API Interceptor** ensures JWT is sent with every request.
* **ProtectedRoute** guards private routes.
* **Login/Register** handle form interactions and token management.
* **Logout** removes the token and returns to the public entrypoint.

These helpers work in concert to secure the frontend and integrate seamlessly with the Spring Boot JWT backend.
