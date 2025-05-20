# 📁 Project Structure

Below is the directory layout for both backend and frontend. Save this as `docs/STRUCTURE.md`.

```text
fasterp360/
├── docs/
│   ├── USAGE.md             # Getting-started guide
│   └── STRUCTURE.md         # Project structure overview
│
├── pom.xml                  # Maven parent POM
└── src/
    ├── main/
    │   ├── java/
    │   │   └── com/project/fasterp360/
    │   │       ├── config/
    │   │       │   └── SecurityConfig.java
    │   │       ├── module/
    │   │       │   ├── inventory/
    │   │       │   │   ├── controller/   # REST endpoints
    │   │       │   │   ├── dto/          # Data Transfer Objects
    │   │       │   │   ├── entity/       # JPA entities
    │   │       │   │   ├── repository/   # Spring Data repos
    │   │       │   │   └── service/      # Business logic
    │   │       │   ├── hr/               # (future modules)
    │   │       │   ├── finance/
    │   │       │   └── sales/
    │   │       ├── security/
    │   │       │   ├── entity/           # User entity (@Table("app_user"))
    │   │       │   ├── repository/       # UserRepository
    │   │       │   └── service/          # UserDetailsService impl
    │   │       └── Fasterp360Application.java
    │   │
    │   └── resources/
    │       ├── application.properties   # DataSource, JPA, Swagger config
    │       └── static/                  # (for production frontend assets)
    │
    └── test/                            # (unit & integration tests)
        └── java/com/project/fasterp360/

fasterp360-frontend/
├── public/
│   └── vite.svg                       # Vite default asset
│
├── src/
│   ├── api/
│   │   └── axios.js                   # API client baseURL=http://localhost:8080/api
│   │
│   ├── components/
│   │   ├── Layout.jsx                 # Header/navigation + <Outlet/>
│   │   └── ProtectedRoute.jsx         # Route guard for auth
│   │
│   ├── pages/
│   │   ├── Login.jsx                  # /login form
│   │   └── Inventory/
│   │       ├── List.jsx               # GET /products list
│   │       └── Detail.jsx             # GET/PUT /products/:id
│   │
│   ├── App.jsx                        # Routes setup (react-router)
│   └── main.jsx                       # ReactDOM.render + import './index.css'
│
├── index.html                         # Vite entry HTML
├── package.json                       # deps & scripts (dev, build, preview, tw:init)
├── tailwind.config.cjs                # content paths + purge config
├── postcss.config.cjs                 # { plugins: { '@tailwindcss/postcss', autoprefixer } }
└── vite.config.js                     # Vite React plugin

README.md                              # Project overview & quick links
LICENSE                                # MIT (or Apache 2.0) license
```
