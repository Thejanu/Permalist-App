import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

import dotenv from "dotenv";
dotenv.config();

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT id, title FROM items ORDER BY id");
    res.render("index.ejs", {
      listTitle: "Today",
      listItems: result.rows,
    });
  } catch (err) {
    console.error("Error fetching items:", err);
    res.status(500).send("Server error");
  }
});

app.post("/add", async (req, res) => {
  const itemTitle = (req.body.newItem || "").trim();
  if (!itemTitle) return res.redirect("/");

  try {
    await db.query("INSERT INTO items (title) VALUES ($1)", [itemTitle]);
    res.redirect("/");
  } catch (err) {
    console.error("Error inserting item:", err);
    res.status(500).send("Server error");
  }
});

app.post("/edit", async (req, res) => {
  const id = parseInt(req.body.updatedItemId, 10);
  const title = (req.body.updatedItemTitle || "").trim();

  if (!Number.isInteger(id) || !title) return res.redirect("/");

  try {
    await db.query("UPDATE items SET title = $1 WHERE id = $2", [title, id]);
    res.redirect("/");
  } catch (err) {
    console.error("Error updating item:", err);
    res.status(500).send("Server error");
  }
});

app.post("/delete", async (req, res) => {
  const id = parseInt(req.body.deleteItemId, 10);
  if (!Number.isInteger(id)) return res.redirect("/");

  try {
    await db.query("DELETE FROM items WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting item:", err);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

process.on("SIGINT", async () => {
  try {
    await db.end();
    console.log("Database connection closed.");
  } catch (err) {
    console.error("Error closing DB connection:", err);
  } finally {
    process.exit();
  }
});
