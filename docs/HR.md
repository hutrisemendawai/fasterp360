# HR Module Guide

This document outlines how the HR (Human Resources) module in Fasterp360 works, including user registration (tying an account to an employee record), adding a new employee, and editing existing employees.

---

## 1. User Registration

### 1.1 Purpose

Allow an existing employee record to become a logged-in user in the ERP system.

### 1.2 Backend Endpoint

* **URL:** `POST /api/auth/register`
* **Request Body:**

  ```json
  {
    "username": "string",
    "password": "string",
    "employeeId": number
  }
  ```
* **Responses:**

  * `200 OK` on success
  * `400 BAD_REQUEST` if username exists or `employeeId` invalid
  * `500 INTERNAL_SERVER_ERROR` if `ROLE_USER` not configured

### 1.3 Frontend Flow

* **Component:** `src/pages/Register.jsx`
* **Steps:**

  1. Fetch `/hr/employees` and populate the employee dropdown.
  2. User enters `username`, `password`, selects their employee record.
  3. On submit, the form posts to `/auth/register`.
  4. On success, navigate to `/login`.

### 1.4 Key Details

* The dropdown shows all employees without a user account.
* You can pre-fill the `employeeId` via a URL parameter `?employeeId=123`.
* After registration, the new user is granted the `ROLE_USER` role.

---

## 2. Adding a New Employee

### 2.1 Purpose

Create a new employee record in the HR database.

### 2.2 Backend Endpoint

* **URL:** `POST /api/hr/employees`
* **Request Body:** (JSON representation of `Employee` DTO)

  ```json
  {
    "firstName": "string",
    "middleName": "string",        // optional
    "lastName": "string",
    "email": "string",
    "phone": "string",            // optional
    "department": "string",
    "position": "string",
    "hireDate": "YYYY-MM-DD",     // **required**
    "salary": number,
    "manager": { "id": number } | null,
    "status": "ACTIVE" | "INACTIVE" | "ON_LEAVE"
  }
  ```
* **Responses:**

  * `200 OK` on success
  * `400 BAD_REQUEST` for validation errors

### 2.3 Frontend Flow

* **Component:** `src/pages/hr/EmployeeForm.jsx`
* **Route:** `/dashboard/hr/employees/new`
* **Steps:**

  1. Fetch existing employees for `Manager` dropdown.
  2. Fill in the form fields.
  3. Submit posts to `/hr/employees`.
  4. On success, navigate back to `/dashboard/hr/employees`.

### 2.4 Key Details

* The `hireDate` field is **required** by the database schema.
* Salary is stored as a number (parsed with `parseFloat`).
* Manager selection is optional; if none is selected, `manager` is set to `null`.

---

## 3. Editing an Existing Employee

### 3.1 Purpose

Update details of an existing employee record.

### 3.2 Backend Endpoint

* **URL:** `PUT /api/hr/employees/{id}`
* **Request Body:** same as in **Adding** (full DTO)
* **Responses:**

  * `200 OK` on success
  * `404 NOT_FOUND` if `id` does not exist
  * `400 BAD_REQUEST` for validation errors

### 3.3 Frontend Flow

* **Component:** `src/pages/hr/EmployeeForm.jsx`
* **Route:** `/dashboard/hr/employees/:id`
* **Steps:**

  1. Read `:id` from route params.
  2. Fetch `/hr/employees/{id}` and populate form.
  3. Update fields and submit with `PUT`.
  4. On success, navigate back to `/dashboard/hr/employees`.

### 3.4 Key Details

* The same form component handles both **create** and **edit** modes (detects `id === 'new'`).
* When editing, the `hireDate` input is pre-populated in `YYYY-MM-DD` format.

---

## 4. Listing & Detail View

* **List:** `src/pages/hr/EmployeesList.jsx` at `/dashboard/hr/employees` shows a table of all employees.
* **Detail:** `src/pages/hr/EmployeeDetail.jsx` at `/dashboard/hr/employees/view/:id` (if implemented) shows read-only details and an **Edit** link.

---

*End of HR Module Guide*
