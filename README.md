# MetroTrust Fleet Management System

MetroTrust FMS is a modern static web application for managing vehicles, drivers, investors, remittances, maintenance, invoices, and role-based portals. It is built with plain HTML, CSS, and JavaScript, and uses LocalStorage by default so it can run without a backend.

## What is included

- Role-based login for Super Admin, Manager, Staff, Driver, and Investor.
- Fleet, driver, investor, remittance, maintenance, invoice, report, user, and settings modules.
- Driver portal with assigned vehicle and remittance history.
- Investor portal with earnings, maintenance costs, net earnings, and invoices.
- Daily, weekly, and monthly remittance summaries.
- Printable report and invoice views that can be saved as PDF from the browser print dialog.
- Local JSON backup and restore.
- Supabase-ready `.env.example` and SQL schema for future cloud integration.
- Real local image assets and inline SVG icons. No emoji-based UI is used.

## Project structure

```text
metrotrust-fms-robust/
  index.html
  README.md
  .env.example
  assets/
    css/
      styles.css
    images/
      driver-cabin.jpg
      maintenance-bay.jpg
    js/
      app.js
  database/
    schema.sql
  docs/
    IMAGE_SOURCES.md
```

## Run locally

Open `index.html` directly in a browser, or serve the folder with any static server:

```bash
npx serve metrotrust-fms-robust
```

## Demo accounts

| Role | Email | Password |
| --- | --- | --- |
| Super Admin | `admin@metrotrust.local` | `admin123` |
| Manager | `manager@metrotrust.local` | `manager123` |
| Staff | `staff@metrotrust.local` | `staff123` |
| Driver | `driver@metrotrust.local` | `driver123` |
| Investor | `investor@metrotrust.local` | `investor123` |

## Storage

The app stores records in browser LocalStorage under `metrotrust_fms_robust_v1`. Use Settings to back up or restore data as JSON.

For Supabase, create a project, run `database/schema.sql`, copy `.env.example` to `.env`, and replace the placeholder project URL and anon key. The UI includes a magic-link action placeholder so authentication can be wired through Supabase Auth later.

## Production notes

- Replace demo passwords with Supabase Auth before live use.
- Review row-level security policies and tenant isolation if operating multiple companies.
- Add server-side validation for payments, invoices, and M-Pesa callbacks.
- Add a real PDF service or jsPDF integration if you need one-click PDF files instead of browser print-to-PDF.
- Add scheduled jobs for service reminders and investor statement generation.

## Image attribution

See `docs/IMAGE_SOURCES.md` for the real image assets used in this project.
