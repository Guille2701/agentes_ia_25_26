import dotenv from "dotenv";
import express from "express";
import router from "./routes.js";
import cors from "cors";
import db from "./db.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3002",
        "http://127.0.0.1:3002",
    ],
    credentials: true,
  })
);

app.use("/api", router);

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));