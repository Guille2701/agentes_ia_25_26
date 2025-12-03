// backend/routes.js
import { Router } from "express";
import {
  generarPreguntas,
  obtenerPreguntas,
  obtenerPreguntaPorId,
  eliminarPregunta,
  limpiarTema,
  getTemas,
  healthCheck
} from "./services.js";

const router = Router();

// POST /api/generate
router.post("/generate", async (req, res) => {
  try {
    const { tema, numPreguntas, subtema } = req.body;

    if (!tema || !numPreguntas) {
      return res.status(400).json({ success: false, error: "Datos incompletos." });
    }

    const preguntas = await generarPreguntas(tema, numPreguntas, subtema);

    res.json({ success: true, preguntas });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/preguntas
router.get("/preguntas", async (req, res) => {
  const { tema } = req.query;
  const preguntas = obtenerPreguntas(tema);
  res.json(preguntas);
});

// GET /api/preguntas/:id
router.get("/preguntas/:id", (req, res) => {
  const pregunta = obtenerPreguntaPorId(req.params.id);
  if (!pregunta) return res.status(404).json({ error: "No encontrada" });

  res.json(pregunta);
});

// DELETE /api/preguntas/:id
router.delete("/preguntas/:id", (req, res) => {
  eliminarPregunta(req.params.id);
  res.json({ success: true, mensaje: "Eliminada" });
});

// DELETE /api/preguntas/tema/:tema
router.delete("/preguntas/tema/:tema", (req, res) => {
  const count = limpiarTema(req.params.tema);
  res.json({ success: true, eliminadas: count });
});

// GET /api/temas
router.get("/temas", (req, res) => {
  res.json(getTemas());
});

// GET /api/health
router.get("/health", async (req, res) => {
  const status = await healthCheck();
  res.json(status);
});

export default router;
