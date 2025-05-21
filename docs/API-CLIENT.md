# API Client

**Location:** `src/api/axios.js`

## Responsibilities
- Define a single Axios instance for all HTTP calls.
- Set `baseURL` to the backend API root (`http://localhost:8080/api`).
- Default all requests to `Content-Type: application/json`.
- Attach the JWT from `localStorage` into the `Authorization` header.
- Globally handle authentication errors (e.g. 401 → redirect to login).

---

## Configuration

```js
import axios from 'axios';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
});

// 1. Request interceptor: add JWT if available
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 2. Response interceptor: handle 401 Unauthorized globally
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // clear token and send user to login
      localStorage.removeItem('token');
      history.push('/login');
    }
    return Promise.reject(error);
  }
);

export default api;
````

---

## Usage Examples

### 1. Authentication

```js
// Login → returns { token }
const { data } = await api.post('/auth/login', {
  username,
  password
});
localStorage.setItem('token', data.token);

// Register → link a new User to an existing Employee
await api.post('/auth/register', {
  username,
  password,
  employeeId
});
```

### 2. Inventory Module

```js
// Fetch all products
const { data: products } = await api.get('/inventory/products');
```

### 3. HR Module (Employees)

```js
// List all employees
const { data: employees } = await api.get('/hr/employees');

// Get one employee
const { data: employee } = await api.get(`/hr/employees/${id}`);

// Create new employee
await api.post('/hr/employees', {
  firstName, lastName, email, hireDate, … 
});

// Update existing employee
await api.put(`/hr/employees/${id}`, {
  firstName, lastName, email, hireDate, … 
});

// Delete an employee
await api.delete(`/hr/employees/${id}`);
```

---

## Extending the Client

* **Error UI**: hook into the response interceptor to show toasts or modals.
* **Retries**: integrate with libraries like `axios-retry` for transient failures.
* **Timeouts & Cancellations**: configure `timeout` or use `CancelToken` for long requests.
* **Mocking**: swap out `baseURL` in tests for a mock server or use Axios mocks.

```

This document covers everything you need about the API client, from setup through common endpoint calls and ideas for further enhancement.
```
