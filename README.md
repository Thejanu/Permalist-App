# Permalist (Persistent To-Do App)

Permalist is a lightweight task management application built with **Node.js**, **Express**, **EJS**, and **PostgreSQL**. It allows users to add, edit, and delete items that are stored permanently in a database. The project is designed to be simple, minimal, and easy to set up, making it ideal for learning full-stack development or as a portfolio project.

---

## Features
- Add, edit and delete list items (server-side, persisted in PostgreSQL)  
- Very small codebase, perfect for learning or as a capstone/demo

---

## Prerequisites
- Node.js (recommended v16 or v18+)
- npm (bundled with Node)
- PostgreSQL server (local or remote)
- psql CLI (or use any Postgres client)
- A terminal and Git for pushing to GitHub

---

## Quick setup (local)

1. Clone the repo and enter it:
```bash
git clone https://github.com/Thejanu/Permalist-App.git
cd Permalist-App
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file in the project root with your Postgres connection values. Example .env:
```
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=permalist_db
DB_PASSWORD=supersecret
DB_PORT=5432
```

4. Create the database and table. Use the included queries.sql:
```bash
# create database
createdb permalist_db

# apply schema + seed
psql -U your_db_user -d permalist_db -f queries.sql
```

5. Start the server with nodemon:
```bash
nodemon index.js
```

By default the server listens on port 3000  
Open http://localhost:3000 in your browser.

---

## Project structure
```
.
├─ index.js            # Express server (routes: GET /, POST /add, /edit, /delete)
├─ package.json        # dependencies
├─ queries.sql         # CREATE TABLE items ... + two INSERTs
├─ views/
│  ├─ index.ejs        # main EJS template
│  ├─ header.ejs       # partial
│  └─ footer.ejs       # partial
├─ public/
│  ├─ assets/          # icons and static assets
│  └─ styles/
│     └─ main.css      # main stylesheet
├─ .env                # not committed, DB config
```

---

## Routes and behaviour
- GET / - Fetches all items and renders the list view  
- POST /add - Inserts a new item  
- POST /edit - Updates existing item  
- POST /delete - Deletes item  

---

## Screenshots
<img width="1833" height="934" alt="Screenshot 2025-09-11 161554" src="https://github.com/user-attachments/assets/05777df0-ad1c-4638-97e6-a1419a219a4c" />


---

## Deploying
### Heroku, Render or Railway
- Set the environment variables in the platform dashboard (DB credentials)  
- Ensure your platform provides a Postgres add-on or use a managed DB  
- Change port binding in index.js to use:
```js
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
```

---

## Example .gitignore
```
node_modules/
.env
```

---

## Troubleshooting
- ECONNREFUSED: check .env, ensure Postgres is running and credentials are correct  
- Views not found: ensure views/index.ejs exists and partials are included correctly  
- ES modules: note "type": "module" in package.json, so use import not require  

---

## Contributing
Open issues or PRs for improvements.

---

## License
MIT License  
Copyright (c) 2025 Thejanu
