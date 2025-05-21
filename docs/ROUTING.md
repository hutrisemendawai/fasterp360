# Routing Module

**Location:** `src/App.jsx`

## Overview

This app uses React Router v6 to define:

- **Public** routes (no auth required):  
  `/register`, `/login`

- **Protected** routes (must be authenticated):  
  `/dashboard/*`

- A **fallback** redirect for all other URLs to `/login`.

All protected routes live under a single layout (`Layout.jsx`) and share a route guard (`ProtectedRoute.jsx`).

---

## Top-Level Structure

```jsx
<BrowserRouter>
  <Routes>
    {/* 1. Public */}
    <Route path="/register" element={<Register />} />
    <Route path="/login"    element={<Login    />} />

    {/* 2. Protected Dashboard Area */}
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Layout>
            {/* renders nested <Route> via <Outlet/> */}
            <Outlet />
          </Layout>
        </ProtectedRoute>
      }
    >
      { /* nested child routes go here */ }
    </Route>

    {/* 3. Catch-all → redirect to /login */}
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
</BrowserRouter>
````

* **`ProtectedRoute`** checks for a stored JWT; if absent/invalid, it navigates to `/login`.
* **`Layout`** renders the sidebar & main content; inside it, `<Outlet/>` renders whichever nested child route matched.

---

## Nested “/dashboard” Routes

```jsx
<Routes>
  <Route path="/dashboard" …>
    {/* Dashboard home */}
    <Route index element={<Dashboard />} />

    {/* Inventory */}
    <Route path="inventory" element={<InventoryList />} />

    {/* HR / Employees */}
    <Route path="hr">
      {/* list all employees */}
      <Route path="employees"     element={<EmployeesList />} />

      {/* create new */}
      <Route path="employees/new" element={<EmployeeForm />} />

      {/* edit by ID */}
      <Route path="employees/:id" element={<EmployeeForm />} />
    </Route>
  </Route>
</Routes>
```

1. **`/dashboard`** → `Dashboard.jsx`
2. **`/dashboard/inventory`** → `Inventory/List.jsx`
3. **`/dashboard/hr/employees`** → `EmployeesList.jsx`
4. **`/dashboard/hr/employees/new`** → same `EmployeeForm.jsx`, `isNew = true`
5. **`/dashboard/hr/employees/:id`** → same `EmployeeForm.jsx`, `isNew = false`, `useParams().id`

---

## Dynamic Parameters

* `:id` in `/dashboard/hr/employees/:id` is read via:

  ```js
  const { id } = useParams();
  ```
* Used both for **detail** (`EmployeeDetail.jsx`) and **edit** (`EmployeeForm.jsx`).

---

## Link & NavLink Usage

* **Sidebar** (`Layout.jsx`):

  ```jsx
  <NavLink to="/dashboard"     …>Dashboard</NavLink>
  <NavLink to="/dashboard/inventory" …>Inventory</NavLink>
  <NavLink to="/dashboard/hr/employees" …>Employees</NavLink>
  ```
* **In-page links**:

  ```jsx
  <Link to="/dashboard/hr/employees/new">+ New Employee</Link>
  <Link to={`/dashboard/hr/employees/${emp.id}`}>Edit</Link>
  ```

---

## Redirects After Actions

* **After login** → navigate to `/dashboard`
* **After create/edit** employee → `navigate('/dashboard/hr/employees')`
* **Unauthorized access** → `ProtectedRoute` redirects to `/login`.

---

## Fallback

Any unmatched route (e.g. `/foo`) hits:

```jsx
<Route path="*" element={<Navigate to="/login" replace />} />
```

which ensures you never see a 404 screen—unauthenticated users go to login, authenticated ones will see `/dashboard`.

---

## Summary

* **Public**: `/login`, `/register`
* **Protected**: `/dashboard` subtree (with nested `/inventory`, `/hr/employees`, etc.)
* **Route Guard**: `ProtectedRoute.jsx` + JWT in `localStorage`
* **Layout**: sidebar + `<Outlet/>`
* **Dynamic**: `:id` for employee edit/detail
* **Redirects**: catch-all → login; post-action navigations inside code.

```
```
