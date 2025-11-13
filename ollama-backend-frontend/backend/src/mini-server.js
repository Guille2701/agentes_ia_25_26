import express from 'express';
import cors from "cors";
import { config } from "dotenv";



config();


const app = express();
const PORT = process.env.PORT || 3002;
const HOST = process.env.HOST || '0.0.0.0'
const SERVER_URL= process.env.SERVER_URL || 'http://localhost:3002';
const AI_API_URL = process.env.AI_API_URL || 'http://localhost:11434';
const AI_MODEL = process.env.AI_MODEL || 'llama3.2:1b';


app.use(cors());
app.use(express.json());


const getAppInfo = () =>({
    name: "Mini server backend ollama",
    version: "1.0.0",
    status: "running",
    description: "Servidor backend para manejar solicitudes de IA",
    endpoints:{
        "GET /api":"Información basica del servidor  y del modelo IA",
        "GET /api/modelos": "Informacion del modelo de IA configurado en ollama",
        "POST /api/consulta": "Enviar un prompt al modelo de IA y obtener una respuesta",
    },
    model:AI_MODEL,
    host: `${HOST}:${PORT}`,
    ollama:{
        url: AI_API_URL,
    },
});

app.get("/", (req,res)=>{
    res.json(getAppInfo());
});

app.get("/api", (req,res)=>{
    res.json(getAppInfo());
});

app.get("/api/modelos", async(req,res)=>{
    try {
        const response = await fetch(`${AI_API_URL}/api/tags`,{
            method : "GET",
            headers:{
                "Content-Type": "aplication/json",
            },
            signal: AbortSignal.timeout(5000),
        });
        if(!response.ok){
            return res.status(response.status).json({error:`Error fetching ollama:${response.statusText}`})
        };
        const data = await response.json();
        const modelos = data.models || [];
        res.json({
            total:modelos.length,
            modelos,
            origen:AI_API_URL,
        })
    } catch (error) {
        res.status(502).json({
            error:"Error al obtener los modelos",
            message:error.message,
        })
    }
});


app.post("api/consulta", async(req, res)=>{
    const { prompt, model } = req.body || {};
    if(!propt || typeof prompt !== 'string'){
        return res.status(400).json({error:"El campo 'prompt' es obligatorio y debe ser una cadena de texto"});
    }

    const targetModel = model || AI_MODEL;
    try {
        //peticion a ollama

        const response = await fetch(`${AI_API_URL}/api/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "aplication/json",
            },
            body: JSON.stringify({
                model: targetModel,
                prompt,
                stream: false,
            }),
            signal: AbortSignal.timeout(20000),
        });
        if(!response.ok){
            return res.status(response.status).json({error:`Error fetching ollama: ${response.statusText}`})
        }
        const data = await response.json();
        res.json({
            prompt,
            model:targetModel,
            response:data.response || "",
            origen:AI_API_URL,
            latency:data.latency ||0,
        });
    } catch (error) {
        res.status(502).json({
            error:"Error al obtener la respuesta del modelo",
            message:error.message,
        });
    }
});

app.listen(PORT, HOST, ()=>{
    console.log(`=====================================================
        Mini server backend ollama by Guillermo BD
        Servidor  backend mini-server escuchando en ${SERVER_URL} (entorno: ${process.env.NODE_ENV || 'development'})
        Por favor accede a : ${SERVER_URL}/api para ver la información del servidor
        Asegurate de que el servicio de IA (Ollama) esté funcionando en: ${AI_API_URL}
    =====================================================`);
});


export default app;