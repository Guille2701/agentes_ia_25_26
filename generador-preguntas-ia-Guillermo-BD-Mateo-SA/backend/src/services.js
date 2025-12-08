import { temas } from "./prompts.js";
import db from "./db.js";

export default function services(){
    const OLLAMA_URL = process.env.VITE_OLLAMA_URL || "http://localhost";
    const OLLAMA_PORT = process.env.VITE_OLLAMA_PORT || "11434";
    const OLLAMA_MODEL = process.env.VITE_OLLAMA_MODEL || "mistral:latest";

    async function generarPreguntas(tema, num_preguntas = 2, num_opciones = 2, subtema = "general") {
    const temaBuscar = temas.find(t => t.id === tema);
    if (!temaBuscar) {
        throw new Error('Tema no encontrado');
    }

    const prompt = temaBuscar.prompt
        .replace('{num_preguntas}', num_preguntas)
        .replace('{subtema}', subtema)
        .replace('{num_opciones}', num_opciones);

    // Función para llamar a Ollama
    async function fetchFromOllama(prompt) {
        try {
            const response = await fetch(`${OLLAMA_URL}:${OLLAMA_PORT}/api/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ model: OLLAMA_MODEL, prompt, stream: false })
            });
            return response.json();
        } catch (error) {
            console.error('Error fetching from Ollama:', error);
            throw error;
        }
    }

    // Obtener datos de Ollama
    const data = await fetchFromOllama(prompt);

    // Parsear el JSON de data.response
    let objetoPreguntas = {};
    try {
        objetoPreguntas = JSON.parse(data.response);
    } catch (err) {
        console.error('Error parseando data.response:', err);
        objetoPreguntas = { preguntas: [] };
    }

    // Insertar cada pregunta en la base de datos
    for (const p of objetoPreguntas.preguntas) {
        const stmt = db.prepare(`
            INSERT INTO preguntas (nombre, descripcion, preguntas, opciones, correcta)
            VALUES (?, ?, ?, ?, ?)
        `);
        stmt.run(
            temaBuscar.nombre || temaBuscar.id,
            temaBuscar.descripcion || '',
            p.pregunta,
            JSON.stringify(p.opciones),
            p.correcta
        );
    }

    // Devolver la respuesta limpia
    return objetoPreguntas.response || data.response.replace("/^```", "").replace("/```", "").trim();
}



    function obtenerPreguntas(tema){
        const stmt = db.prepare(`SELECT * FROM preguntas WHERE nombre = ?`);
        const arrayPreguntas = stmt.all(tema);

        if(!arrayPreguntas){
            return []
        }

        return arrayPreguntas
    }

    function eliminarPregunta(idPregunta){
        const stmt = db.prepare(`DELETE FROM preguntas WHERE id= ?`);
        const result = stmt.run(idPregunta);

        if(result.changes===0){
            return false
        }

        return true
    }

    function limpiarTema(tema){
        const stmt = db.prepare(`DELETE FROM preguntas WHERE nombre=?`);
        const result = stmt.run(tema);
        return result.changes;
    }

    function verDb(){
        const stmt = db.prepare(`SELECT * FROM preguntas`);
        const result = stmt.all();

        return result;
    }

    return {
        generarPreguntas,
        obtenerPreguntas,
        eliminarPregunta,
        limpiarTema,
        verDb
    };
}