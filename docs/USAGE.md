# fasterp360 ERP — Getting Started Guide

This document describes all requirements, setup steps, and basic usage for the **fasterp360** ERP system, covering both the Spring Boot backend and the React+Vite+Tailwind frontend.

---

## 📋 Prerequisites

- **Java & Spring Boot**  
  - JDK 17 or higher  
  - Maven 3.8+  

- **Database**  
  - PostgreSQL 12+  

- **Frontend**  
  - Node.js 16+ (npm included)  
  - (Optional) Yarn or pnpm  

- **Tools**  
  - Git  
  - VS Code (or your IDE of choice)  
  - Postman or curl (for API testing)

---

## 🔧 Backend Setup (Spring Boot)

### 1. Clone the repo
```
git clone https://github.com/<your-org>/fasterp360.git
cd fasterp360
```

### 2. Configure PostgreSQL

1. Start your Postgres server.
2. Create database & user:

   ```
   CREATE DATABASE fasterp360;
   CREATE USER fasterp_user WITH ENCRYPTED PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE fasterp360 TO fasterp_user;
   ```

### 3. Configure `application.properties`

Edit `src/main/resources/application.properties`:

```
spring.datasource.url=jdbc:postgresql://localhost:5432/fasterp360
spring.datasource.username=fasterp_user
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.open-in-view=false

server.port=8080

# Swagger/OpenAPI
springdoc.api-docs.path=/api-docs
springdoc.swagger-ui.path=/swagger-ui.html
```

### 4. Apply the "app\_user" table fix

Ensure your `User` entity is annotated:

```
@Entity
@Table(name = "app_user")
public class User implements UserDetails {
  // … fields + methods …
}
```

### 5. Build & run

```
mvn clean package
mvn spring-boot:run
```

* The app will start on **`http://localhost:8080`**.
* Swagger UI is available at **`/swagger-ui.html`**.

### 6. Verify

* Connect to Postgres and run `\dt` to see tables: `product`, `app_user`, etc.
* A default admin user (`admin`/`admin123`) is seeded at startup.

---

## ⚛️ Frontend Setup (React + Vite + Tailwind)

### 1. Scaffold the frontend

From the repo root:

```
npm init vite@latest fasterp360-frontend -- --template react
cd fasterp360-frontend
npm install
```

### 2. Install styling tools

```
npm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss
```

### 3. Create configs by hand

#### `tailwind.config.cjs`

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: { extend: {} },
  plugins: [],
};
```

#### `postcss.config.cjs`

```
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
```

### 4. Add Tailwind imports

In `src/index.css`, replace contents with:

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Then in `src/main.jsx` ensure you have:

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';   // ← Tailwind styles
```

### 5. Install Axios & React Router

```
npm install axios react-router-dom
```

### 6. Configure API client

Create `src/api/axios.js`:

```
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
});

export default api;
```

### 7. Basic project structure

```
fasterp360-frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── api/
│   │   └── axios.js
│   ├── components/
│   │   ├── Layout.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   └── Inventory/
│   │       ├── List.jsx
│   │       └── Detail.jsx
│   ├── App.jsx
│   └── main.jsx
├── tailwind.config.cjs
├── postcss.config.cjs
└── vite.config.js
```

### 8. Start the frontend

```
npm run dev
```

* Visit **`http://localhost:5173`** (or the URL Vite prints).

---

## 🚀 Usage

1. **Login**

   * POST `http://localhost:8080/api/auth/login`
   * Store the returned token in `localStorage` or React state.

2. **Inventory CRUD**

   * **List**: GET  `/api/inventory/products`
   * **Create**: POST `/api/inventory/products`
   * **Detail**: GET  `/api/inventory/products/:id`

3. **Protect routes**

   * Wrap inventory pages in `<ProtectedRoute>` to redirect to `/login` if no token.

---

## 🧪 Testing

* **Backend**:

  ```bash
  mvn test
  ```
* **Frontend**:
  You can add Jest or Vitest later; for now, manually verify via browser.

---

## 📦 Production Build

1. **Backend**:

   ```
   mvn clean package
   ```

2. **Frontend**:

   ```
   npm run build
   ```

   * Copy the contents of `fasterp360-frontend/dist/` into your Spring Boot `src/main/resources/static/` folder.

3. **Run**

   ```
   java -jar target/fasterp360-0.0.1-SNAPSHOT.jar
   ```

   The full-stack app will now serve both API and static UI from one Spring Boot process.

---

## 🤝 Contributing

1. Fork & clone
2. Create feature branches off `main` (e.g. `git checkout -b feature/hr-module`)
3. Commit & push
4. Open a PR against `main`

Please follow the existing package structure and add any new modules under `module/`.

---

## 📄 License

This project is licensed under MIT. See [LICENSE](../LICENSE) for details.
