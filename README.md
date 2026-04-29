# 🚗 MetroTrust Fleet Management System (FMS)

MetroTrust FMS is a modern, web-based fleet management system designed to manage vehicles, drivers, investors, remittances, and maintenance operations in one centralized platform.

---

## 📌 Overview

This system provides a complete solution for managing transport operations, including:

* Driver and staff management
* Fleet (vehicle) tracking
* Maintenance logging
* Daily/weekly/monthly remittances
* Investor earnings tracking
* Invoice generation
* Role-based dashboards (Admin, Manager, Staff, Driver, Investor)

---

## 🚀 Features

### 🔐 Authentication & Access Control

* Role-based login system:

  * Super Admin
  * Manager
  * Staff
* Magic link login (via Supabase - optional)

---

### 👥 User Management

* Add, edit, delete staff
* Assign roles and permissions
* Manage drivers and investors

---

### 🚙 Fleet Management

* Register vehicles
* Assign drivers and owners
* Track vehicle status (Active, Maintenance, Inactive)

---

### 🔧 Maintenance Tracking

* Log vehicle services
* Track costs and service providers
* Monitor maintenance status

---

### 💰 Remittance System

* Record driver daily earnings
* Payment methods (M-Pesa, Cash, Bank, etc.)
* Auto summaries:

  * Daily
  * Weekly
  * Monthly

---

### 📊 Dashboard & Reports

* Real-time stats:

  * Active drivers
  * Fleet size
  * Revenue
  * Maintenance alerts
* Generate printable PDF reports

---

### 🧾 Invoice Generator

* Create invoices for:

  * Maintenance
  * Remittances
  * Investor earnings
* Live preview before export

---

### 👨‍💼 Investor Portal

* View earnings per vehicle
* Track performance
* Financial summaries

---

### 🧑‍✈️ Driver Portal

* View trips and remittances
* Performance tracking

---

## 🛠 Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Storage:** LocalStorage (default)
* **Backend (optional):** Supabase
* **PDF Generation:** jsPDF

---

## 📂 Project Structure

```
project-root/
│
├── index.html          # Main application file
├── assets/             # Images, icons (optional)
├── database/           # SQL & schema (if using Supabase)
├── docs/               # Documentation
├── .env.example        # Environment variables template
└── README.md
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/metrotrust-fms.git
cd metrotrust-fms
```

### 2. Run the project

Simply open the HTML file in your browser:

```bash
open index.html
```

Or use a local server (recommended):

```bash
npx serve
```

---



## 🌐 Supabase Integration (Optional)

To enable:

* Magic link authentication
* Cloud database storage

1. Create a project on Supabase
2. Add your keys to `.env`:

```
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

3. Update the frontend to use Supabase client

---

## 📱 Responsive Design

* Desktop sidebar navigation
* Mobile bottom navigation
* Optimized UI for small screens

---

## 🧠 Key Design Decisions

* Uses **localStorage** for offline-first functionality
* Modular UI with reusable components
* Role-based access control built into navigation
* Clean separation of features (Drivers, Fleet, Reports, etc.)

---

## ⚠️ Known Limitations

* Data is stored locally (not persistent across devices)
* Supabase integration is optional and not fully wired by default
* No backend API layer (can be added later)

---

## 🚀 Future Improvements

* Full Supabase backend integration
* Real-time updates
* GPS tracking integration
* Payment gateway (M-Pesa API)
* Multi-tenant support

---

## 👨‍💻 Author

Developed by a Software Developer specializing in modern web systems and scalable applications.

---

## 📄 License

This project is open-source and available for learning and customization.
