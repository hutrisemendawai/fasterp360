# Data Model & Repositories (Backend)

## Employee
- Entity under `module.hr`
- Fields: `id, firstName, lastName, email, hireDate, status, …`
- `EmployeeRepository` for CRUD.

## User / Role / Permission
- `User` links to an `Employee` & a `Role`.
- `Role` has many `Permission`s.
- Repos: `UserRepository`, `RoleRepository`, `PermissionRepository`.
- `UserService` implements `UserDetailsService` to load by username for authentication.
