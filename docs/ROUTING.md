### **`docs/routing.md`**
```markdown
# Routing Module

**Location:** `src/App.jsx`

## Structure

```jsx
<BrowserRouter>
  <Routes>
    {/* Public */}
    <Route path="/register" element={<Register/>}/>
    <Route path="/login"    element={<Login/>}/>

    {/* Protected dashboard & nested */}
    <Route path="/dashboard" element={<ProtectedRoute><Layout><Outlet/></Layout></ProtectedRoute>}>
      <Route index element={<Dashboard/>}/>
      <Route path="inventory" element={<InventoryList/>}/>
      <Route path="hr">
        <Route path="employees"     element={<EmployeesList/>}/>
        <Route path="employees/new" element={<EmployeeForm/>}/>
        <Route path="employees/:id" element={<EmployeeForm/>}/>
      </Route>
    </Route>

    {/* Fallback */}
    <Route path="*" element={<Navigate to="/login" replace/>}/>
  </Routes>
</BrowserRouter>

Key Points
Uses <Outlet/> for nested /dashboard/... routes.

Wraps protected area in ProtectedRoute + Layout.