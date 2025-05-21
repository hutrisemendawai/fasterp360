
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
