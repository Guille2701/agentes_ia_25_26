import { temas } from "./prompts.js";
import db from "./db.js";

export default function services(){
    const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost";
    const OLLAMA_PORT = process.env.OLLAMA_PORT || "11434";
    const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3.2:1b";

    function generarPreguntas(tema, num_preguntas=2,num_opciones=2, subtema= "general"){
        const temaBuscar = temas.find(t => t.id === tema);
        if(!temaBuscar){
            throw new Error('Tema no encontrado');
        }

        const prompt = temaBuscar.prompt
            .replace('{num_preguntas}', num_preguntas)
            .replace('{subtema}', subtema)
            .replace('{num_opciones}', num_opciones);


        function fetchFromOllama(prompt){
            return fetch(`${OLLAMA_URL}:${OLLAMA_PORT}/api/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({  model: OLLAMA_MODEL, prompt, stream: false })
            })
            .then(response => response.json())
            .then(data => {return data})
            .catch(error => {
                console.error('Error fetching from Ollama:', error);
                throw error;
            });
        }
/*
        fetchFromOllama(prompt).then(data => {
            const stmt = db.prepare(`
                    INSERT INTO preguntas (nombre, descripcion, preguntas, opciones, correcta)
                    VALUES (?, ?, ?, ?, ?)
                `);
                stmt.run(
                    tema.nombre,
                    tema.descripcion,
                    data.preguntas,
                    data.opciones,
                    data.correcta
                );
        });*/

        return fetchFromOllama(prompt).then(data => data.response);
    }

    return {
        generarPreguntas
    };
}


async function test() {
    const prueba = await services().generarPreguntas('typescript', 3, 4, 'generics');
    console.log(prueba);
}

test();