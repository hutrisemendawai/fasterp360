# Application Bootstrap

**Location:** `src/main/java/com/project/fasterp360/Fasterp360Application.java`

## On Startup
- Ensures `ROLE_ADMIN` exists (creates if missing).
- Ensures an “admin@erp.com” `Employee` with today’s hire date.
- If no users exist, creates `admin` / `admin123` with `ROLE_ADMIN` & that employee.

## Why
- Guarantees you always have an administrator account to log in and manage the system.
