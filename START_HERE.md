# Start Here

This folder is the complete MetroTrust Fleet Management System package.

## Quick start

1. Open `index.html` in a browser.
2. Sign in with any account listed in `README.md`.
3. Use Settings to back up, restore, or reset local data.

## Recommended local server

```bash
npx serve .
```

Then open the local URL shown by the command.

## Important files

- `index.html` - main application.
- `assets/css/styles.css` - visual layout and responsive styling.
- `assets/js/app.js` - app logic, LocalStorage database, dashboards, forms, and reports.
- `assets/images/` - real local JPEG images.
- `database/schema.sql` - Supabase-ready database schema.
- `.env.example` - Supabase environment template.
- `README.md` - full project documentation and demo logins.
- `docs/IMAGE_SOURCES.md` - image attribution notes.

## Demo storage

This build uses browser LocalStorage by default. Data stays in the browser where the app is opened. Use Settings > Backup data before clearing browser storage or moving to another machine.
