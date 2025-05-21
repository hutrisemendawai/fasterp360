# 🚀 fasterp360 — Usage Guide

This document walks you through installing, configuring, and running the full-stack **fasterp360** ERP application (Spring Boot backend + React / Vite / Tailwind frontend), including user registration tied to employee records.

---

## 📋 Prerequisites

* **Java & Spring Boot**

  * JDK 17 or higher
  * Maven 3.8+

* **Database**

  * PostgreSQL 12+

* **Frontend**

  * Node.js 16+ (npm included)

* **Tools**

  * Git
  * VS Code (or your IDE of choice)
  * Postman / curl (for API testing)

---

## 📥 1. Clone the repository

```bash
git clone https://github.com/<your-org>/fasterp360.git
cd fasterp360
```

---

## 🐘 2. Backend Setup (Spring Boot)

1. **Create your database & user**

   ```sql
   CREATE DATABASE fasterp360;
   CREATE USER fasterp_user WITH ENCRYPTED PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE fasterp360 TO fasterp_user;
   ```

2. **Configure Spring Boot**
   Edit `src/main/resources/application.properties` and set:

   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/fasterp360
   spring.datasource.username=fasterp_user
   spring.datasource.password=your_password

   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   spring.jpa.open-in-view=false

   server.port=8080

   springdoc.api-docs.path=/api-docs
   springdoc.swagger-ui.path=/swagger-ui.html
   ```

3. **Ensure `User` & `Role` table mapping**

   * Make sure your entities match table names (e.g., `@Table(name = "app_user")`).
   * The application seeds `ROLE_ADMIN` and `ROLE_USER` on startup (`Fasterp360Application`).

4. **Build & launch**

   ```bash
   mvn clean package
   mvn spring-boot:run
   ```

   * The API will be live on **[http://localhost:8080/](http://localhost:8080/)**
   * Swagger UI → **[http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)**

---

## ⚛️ 3. Frontend Setup (React + Vite + Tailwind)

> All commands below assume you’re in the project root (`fasterp360/`).

1. **Scaffold**

   ```bash
   npm init vite@latest fasterp360-frontend -- --template react
   cd fasterp360-frontend
   npm install
   ```

2. **Install styling & PostCSS plugins**

   ```bash
   npm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss
   ```

3. **Create configuration files**

   * **tailwind.config.cjs**

     ```js
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
   * **postcss.config.cjs**

     ```js
     module.exports = {
       plugins: {
         '@tailwindcss/postcss': {},
         autoprefixer: {},
       },
     };
     ```

4. **Add Tailwind imports**
   In `src/index.css` replace everything with:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

   And ensure `src/main.jsx` includes:

   ```js
   import React from 'react'
   import ReactDOM from 'react-dom/client'
   import App from './App'
   import './index.css'   // ← Tailwind styles

   ReactDOM.createRoot(document.getElementById('root')).render(
     <React.StrictMode><App/></React.StrictMode>
   )
   ```

5. **Install runtime dependencies**

   ```bash
   npm install axios react-router-dom
   ```

6. **Configure API client**
   Create `src/api/axios.js`:

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
   ```

7. **Verify folder structure**

   ```
   fasterp360-frontend/
   ├── public/
   ├── src/
   │   ├── api/           — axios.js
   │   ├── components/    — Layout, ProtectedRoute
   │   ├── pages/         — Login.jsx, Register.jsx, Inventory/, hr/
   │   ├── App.jsx
   │   └── main.jsx
   ├── tailwind.config.cjs
   ├── postcss.config.cjs
   └── vite.config.js
   ```

8. **Start development server**

   ```bash
   npm run dev
   ```

   * Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

---

## ▶️ 4. Running & Testing

1. **Registration (new user)**

   * Navigate to **[http://localhost:5173/register](http://localhost:5173/register)**
   * Select an existing employee record or use `?employeeId=<id>` to prefill the dropdown
   * On success: redirected to **/login**

2. **Login**

   * **POST** `http://localhost:8080/api/auth/login`

     ```json
     { "username": "admin", "password": "admin123" }
     ```
   * On success: saves `token` in `localStorage` and redirects to **/dashboard**

3. **Access protected pages**

   * All `/dashboard/**` routes require a valid JWT; otherwise `<ProtectedRoute>` sends you back to `/login`.

4. **Inventory Endpoints**

   | Action         | URL                           | Method  |
   | -------------- | ----------------------------- | ------- |
   | List products  | `/api/inventory/products`     | GET     |
   | Create product | `/api/inventory/products`     | POST    |
   | View / Edit    | `/api/inventory/products/:id` | GET/PUT |

5. **HR Endpoints**

   | Action               | URL                     | Method  |
   | -------------------- | ----------------------- | ------- |
   | List employees       | `/api/hr/employees`     | GET     |
   | Create employee      | `/api/hr/employees`     | POST    |
   | View / Edit employee | `/api/hr/employees/:id` | GET/PUT |

6. **Run backend tests**

   ```bash
   mvn test
   ```

7. **Manual frontend checks**

   * Verify register and login flows.
   * Create, list, edit employees via UI.

---

## 📦 5. Production Build

1. **Backend fat-jar**

   ```bash
   mvn clean package
   ```
2. **Frontend bundle**

   ```bash
   cd fasterp360-frontend
   npm run build
   ```
3. **Serve static assets**

   * Copy `fasterp360-frontend/dist/*` → `src/main/resources/static/`
4. **Run combined app**

   ```bash
   java -jar target/fasterp360-0.0.1-SNAPSHOT.jar
   ```

   * Now both API and frontend UI are served from **[http://localhost:8080/](http://localhost:8080/)**

---

## 🤝 Contributing

1. Fork & clone
2. Create feature branch (`git checkout -b feature/xyz`)
3. Commit & push
4. Open a PR against `main`

Please follow existing module structure under `src/main/java/com/project/fasterp360/module/…`.

---

## 📄 License

This project is MIT-licensed. See [LICENSE](../LICENSE) for details.
