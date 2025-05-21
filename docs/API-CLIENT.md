# API Client

**Location:** `src/api/axios.js`

## Responsibilities
- Centralize all HTTP calls to the backend.
- Configure base URL and `Content-Type: application/json`.
- Automatically inject the JWT from `localStorage` into the `Authorization` header.

## Example
```js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
});

// attach token automatically
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;


---

### **`docs/auth-helpers.md`**
```markdown
# Authentication Helpers

## 1. ProtectedRoute
**Location:** `src/components/ProtectedRoute.jsx`

Wraps React Router routes, checks for a valid token, and redirects to `/login` if absent.

## 2. Login / Register Pages
**Locations:**  
- `src/pages/Login.jsx`  
- `src/pages/Register.jsx`

Drive the JWT-based signup/login flows against `/api/auth/**`, store token in `localStorage`, and navigate into the protected app.

### Key Points
- Form validation & error handling.
- On success: save `response.data.token` → `localStorage.setItem('token', …)` and navigate to `/dashboard`.
