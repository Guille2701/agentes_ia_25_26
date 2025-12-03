import { dotenv } from "dotenv";
import express from "express";
import router from "./routes.js";
import cors from "cors";
import db from "./db.js";

dotenv.config();

const app = express();
