# MetroTrust Fleet Management System (FMS)

> A modern, offline-first web application for managing vehicles, drivers, investors, remittances, maintenance, invoices, and role-based portals — all in one centralized platform.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Demo Accounts](#demo-accounts)
- [Modules](#modules)
- [Storage & Data Management](#storage--data-management)
- [Supabase Integration (Optional)](#supabase-integration-optional)
- [Responsive Design](#responsive-design)
- [Production Notes](#production-notes)
- [Known Limitations](#known-limitations)
- [Future Improvements](#future-improvements)
- [Image Attribution](#image-attribution)

---

## Overview

MetroTrust FMS is built with plain **HTML, CSS, and JavaScript**. It uses **LocalStorage** by default, enabling it to run entirely in the browser without a backend. For teams that need cloud persistence and authentication, an optional **Supabase** integration path is provided.

The system is designed around a transport business model, covering:

- Driver and staff management
- Fleet (vehicle) registration and tracking
- Maintenance logging and cost tracking
- Daily, weekly, and monthly remittance recording
- Investor earnings and financial summaries
- Invoice generation with live preview
- Role-based dashboards for all stakeholders

---

## Features

### Authentication & Access Control

Role-based login system supporting five user roles:

| Role        | Access Level                                      |
|-------------|---------------------------------------------------|
| Super Admin | Full system access — all modules and settings     |
| Manager     | Fleet, drivers, remittances, reports              |
| Staff       | Remittance recording and basic operations         |
| Driver      | Personal portal — trips and remittance history    |
| Investor    | Earnings portal — vehicle performance summaries   |

Magic link login is supported via Supabase Auth (optional).

---

### User Management

- Add, edit, and delete staff accounts
- Assign roles and permissions per user
- Manage drivers and investor profiles

---

### Fleet Management

- Register and configure vehicles
- Assign drivers and vehicle owners
- Track vehicle status: **Active**, **Maintenance**, or **Inactive**

---

### Maintenance Tracking

- Log vehicle service records
- Track service costs and provider details
- Monitor maintenance status and service history

---

### Remittance System

- Record driver daily earnings
- Supported payment methods: M-Pesa, Cash, Bank Transfer, and more
- Automated summaries:
  - Daily remittance totals
  - Weekly consolidations
  - Monthly reports

---

### Dashboard & Reports

Real-time statistics on the admin dashboard:

- Active driver count
- Fleet size
- Revenue totals
- Maintenance alerts

Generate printable PDF reports via the browser print dialog.

---

### Invoice Generator

Create invoices for:

- Maintenance work
- Remittance records
- Investor earnings

Live preview before export. Save as PDF using the browser's print-to-PDF feature.

---

### Investor Portal

- View earnings per assigned vehicle
- Track vehicle performance over time
- Access financial summaries and investor statements
- Download invoices

---

### Driver Portal

- View assigned vehicle details
- Access personal remittance history
- Track performance metrics

---

## Tech Stack

| Layer          | Technology                       |
|----------------|----------------------------------|
| Frontend       | HTML5, CSS3, JavaScript (ES6+)   |
| Storage        | LocalStorage (default)           |
| Backend        | Supabase (optional)              |
| PDF Generation | Browser print-to-PDF (built-in)  |
| Images         | Real local assets + inline SVG   |
| Icons          | Inline SVG (no emoji UI)         |

---

## Project Structure

```
metrotrust-fms/
│
├── index.html              # Main application entry point
├── README.md               # This file
├── .env.example            # Environment variables template
│
├── assets/
│   ├── css/
│   │   └── styles.css      # Global stylesheet
│   ├── images/
│   │   ├── driver-cabin.jpg
│   │   └── maintenance-bay.jpg
│   └── js/
│       └── app.js          # Core application logic
│
├── database/
│   └── schema.sql          # Supabase SQL schema
│
└── docs/
    └── IMAGE_SOURCES.md    # Image asset attribution
```

---

## Getting Started

### Prerequisites

No build tools or package manager required for the default local setup. A modern browser is sufficient.

### Option 1 — Open directly in browser

```bash
# Clone the repository
git clone https://github.com/your-username/metrotrust-fms.git
cd metrotrust-fms

# Open in browser
open index.html
```

### Option 2 — Serve with a local static server (recommended)

```bash
npx serve metrotrust-fms
```

Then visit `http://localhost:3000` in your browser.

---

## Demo Accounts

Use these credentials to explore each role's portal:

| Role        | Email                        | Password    |
|-------------|------------------------------|-------------|
| Super Admin | admin@metrotrust.local       | admin123    |
| Manager     | manager@metrotrust.local     | manager123  |
| Staff       | staff@metrotrust.local       | staff123    |
| Driver      | driver@metrotrust.local      | driver123   |
| Investor    | investor@metrotrust.local    | investor123 |

> **Note:** Replace all demo credentials with secure authentication before deploying to production.

---

## Modules

| Module          | Description                                                        |
|-----------------|--------------------------------------------------------------------|
| Fleet           | Vehicle registration, assignment, and status tracking             |
| Drivers         | Driver profiles, assignment, and performance                      |
| Investors       | Earnings per vehicle, financial summaries, invoices               |
| Remittances     | Daily earnings capture and payment reconciliation                 |
| Maintenance     | Service logs, costs, and provider management                      |
| Invoices        | Printable invoices for maintenance, remittances, and earnings     |
| Reports         | Aggregated stats with printable PDF output                        |
| Users           | Staff and role management                                         |
| Settings        | App configuration, backup, and restore                            |

---

## Storage & Data Management

All records are stored in browser **LocalStorage** under the key:

```
metrotrust_fms_robust_v1
```

### Backup & Restore

Use the **Settings** module to:

- Export all data as a local JSON file
- Restore data from a previously exported JSON backup

> Data stored in LocalStorage is device-specific and does not sync across browsers or devices. Use Supabase for multi-device access.

---

## Supabase Integration (Optional)

To enable cloud storage, multi-device sync, and magic link authentication:

### 1. Create a Supabase project

Visit [https://supabase.com](https://supabase.com) and create a new project.

### 2. Run the database schema

In your Supabase SQL editor, run the contents of:

```
database/schema.sql
```

### 3. Configure environment variables

Copy the example file and fill in your project credentials:

```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Wire the frontend

Update `assets/js/app.js` to import and use the Supabase client. A magic link authentication placeholder is already included in the UI.

---

## Responsive Design

MetroTrust FMS adapts to all screen sizes:

| Viewport | Navigation Style         |
|----------|--------------------------|
| Desktop  | Sidebar navigation       |
| Mobile   | Bottom tab navigation    |

The layout is optimized for both office workstations and driver/staff mobile devices.

---

## Production Notes

Before going live, ensure the following:

1. **Authentication** — Replace demo passwords with Supabase Auth. Do not use LocalStorage-based credentials in production.
2. **Row-Level Security** — Review and enforce Supabase RLS policies, especially for multi-tenant deployments.
3. **Server-Side Validation** — Add backend validation for payments, invoices, and any M-Pesa callback handling.
4. **PDF Generation** — Integrate jsPDF or a dedicated PDF service if one-click PDF export is required (instead of browser print-to-PDF).
5. **Scheduled Jobs** — Set up scheduled functions for service reminders and automated investor statement generation.
6. **Multi-Tenancy** — Review tenant isolation if operating multiple transport companies from the same deployment.

---

## Known Limitations

- Data is stored locally in the browser — not persistent across devices or browsers by default.
- Supabase integration is optional and not fully wired in the default build.
- No dedicated backend API layer (can be added via Supabase Edge Functions or an external service).
- PDF export relies on browser print-to-PDF; jsPDF is not pre-integrated.

---

## Future Improvements

- Full Supabase backend integration with real-time listeners
- Real-time dashboard updates via Supabase Realtime
- GPS tracking integration for live vehicle location
- M-Pesa API integration for automated payment confirmation
- One-click PDF export via jsPDF
- Scheduled reports and investor statement generation
- Multi-tenant support for operating multiple fleet companies
- Mobile app wrapper (PWA or React Native)

---

## Image Attribution

Real image assets are used throughout the application. See:

```
docs/IMAGE_SOURCES.md
```

for full attribution details.

---

## License

This project is proprietary to MetroTrust. Review your organization's license terms before distributing or deploying externally.

---

*MetroTrust FMS — Built for modern transport operations.*
