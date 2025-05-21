
---

### **`docs/auth-controller.md`**
```markdown
# Auth Controller (Backend)

**Location:** `src/main/java/com/project/fasterp360/controller/AuthController.java`

## Endpoints

### `POST /api/auth/register`
- **Body:** `{ username, password, employeeId }`
- Links a new `User` to an existing `Employee` and assigns `ROLE_USER`.
- Errors if `username` exists or `employeeId` invalid.

### `POST /api/auth/login`
- **Body:** `{ username, password }`
- Uses Spring Security to authenticate.
- Returns `{ token }` (JWT) on success; `401` on failure.

## Example Register Flow
1. Lookup employee by ID.
2. Lookup `ROLE_USER` in `roles` table.
3. Create & save `User(username, encodedPassword, employee, role)`.
