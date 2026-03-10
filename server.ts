import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database(path.join(__dirname, "journals.db"));

// Create table
db.exec(`
  CREATE TABLE IF NOT EXISTS journals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    name TEXT,
    rank TEXT,
    inputs TEXT,
    outputs TEXT,
    journal_data TEXT
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/journals", (req, res) => {
    const { date, name, rank, inputs, outputs, journal_data } = req.body;
    const stmt = db.prepare(
      "INSERT INTO journals (date, name, rank, inputs, outputs, journal_data) VALUES (?, ?, ?, ?, ?, ?)"
    );
    stmt.run(date, name, rank, JSON.stringify(inputs), JSON.stringify(outputs), JSON.stringify(journal_data));
    res.json({ success: true });
  });

  app.get("/api/journals", (req, res) => {
    const date = req.query.date as string;
    let rows;
    if (date) {
      rows = db.prepare("SELECT * FROM journals WHERE date = ? ORDER BY id DESC").all(date);
    } else {
      rows = db.prepare("SELECT * FROM journals ORDER BY id DESC").all();
    }
    
    const parsedRows = rows.map(row => ({
        ...row,
        inputs: JSON.parse(row.inputs as string),
        outputs: JSON.parse(row.outputs as string),
        journal_data: JSON.parse(row.journal_data as string)
    }));
    
    res.json(parsedRows);
  });

  app.delete("/api/journals/:id", (req, res) => {
    const { id } = req.params;
    db.prepare("DELETE FROM journals WHERE id = ?").run(id);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
