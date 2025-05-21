# Layout & Navigation

**Location:** `src/components/Layout.jsx`

## Responsibilities
- Provide the main “shell” of the SPA with a persistent sidebar.
- Render nested routes via `children` / `<Outlet />`.
- Sidebar links for Dashboard, Inventory, Employees.
- “Logout” button clears token and redirects to `/login`.

## Example
```jsx
export default function Layout({ children }) {
  // …
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        {/* ...nav links... */}
      </aside>
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
