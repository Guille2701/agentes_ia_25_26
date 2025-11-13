import express, { response } from "express";
import cors from "cors";
import { config } from "dotenv";


// 0 Cargar las variables de entorno cargadas en memoria

config();

// 1 paso crear un servidor con express
const app = express();

// 2 crear variables basandonos en las variables de entorno cargadas con config

const PORT=Number(process.env.PORT)  || 3002
const HOST=process.env.HOST  || "0.0.0.0"
const NODE_ENV=process.env.NODE_ENV  || "developement"
const SERVER_URL=process.env.SERVER_URL  || "http://localhost:3002"
const AI_API_URL=process.env.AI_API_URL  || "http://localhost:11434"
const AI_MODEL=process.env.AI_MODEL  || "llama3.2:1b"

// 3 paso midlewares a mi aplicacion:
// A.  para habilitar los cors en los navegadores

app.use(cors());

//B. Habilitar json para preguntas y respuestas
app.use(express.json());

// 4 paso (opcional) crear una funcion que muestre info al usuario

const getInfoApi= () =>({ // los parentesis ejemplifican un return para que las llaves del objeto no parezcan las de la funcion
        service:"servicio api-ollama",
        status: "ready",
        endpoints: {
            "GET /api":"Mostramos informacion de la API-OLLAMA",
            "GET /api/modelos":"Mostramos informacion de los modelos disponibles",
            "POST /api/consulta":"Envia un prompt para realizar consultas a la IA"
        },
        model:AI_MODEL,
        host:`${HOST}:${PORT}`,
        ollama_url:AI_API_URL 
});

// 5 paso Generar los endpoints

// -> /
app.get("/",(req,res)=>{
    res.json(getInfoApi());
});

// -> /api

app.get("/api",(req,res)=>{
    res.json(getInfoApi());
});

// -> /api/models

app.get("/api/modelos",async(req,res)=>{
    try {
        const response = await fetch(`${AI_API_URL}/api/tags`,{
            method :"GET",
            headers:{
                "Content-Type":"application/json"
            },
            signal: AbortSignal.timeout(5000),
        });

        if(!response.ok) throw new Error("❌ Error al realizar la peticion");

        const data = await response.json();
        const models = data.models || [];
        const nameModels= models.map((model)=>({modelo:model.name}))

        res.json(nameModels);
    } catch (error) {
        res.status(502).json({
            error:"Fallo en el acceso al servidor con los modelos",
            message: error.message
        })
    }
});

// -> /api/consulta

app.post("/api/consulta", async(req,res)=>{
    console.log(`${AI_API_URL}/api/generate`)
    const { prompt, model } = req.body || {};
    // el prompt es de tipo string??
    if(!prompt || typeof prompt !== "string"){
        res.status(400).json({
            error:"Error al escribir el prompt",
            message: error.message
        })
    }
    console.log(res); 
    console.log(req.body);
    console.log(prompt);
    console.log(model);




    
    const modelSelect = model || AI_MODEL;/*
    try {
        const response = await fetch(`${AI_API_URL}/api/generate`,{
            method :"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                model:modelSelect,
                prompt,
                stream:false
            }),
            signal: AbortSignal.timeout(5000)
        }); 
        if(!response.ok) throw new Error("Error al realizar la peticin");
            const data = await response.json();
            res.json({
                prompt,
                model:modelSelect,
                response: data.resp
            })
    } catch (error) {
        req.status(502).json({
            error:"Fallo en el acceso al servidor con los modelos",
            message: error.message
        })
    }*/
})

// 6 paso Levantar el servidor express para escuchar peticiones a mis endpoints

app.listen(PORT,HOST,()=>{
    console.log("----------------------- 🎈 SERVIDOR EXPRESS FUNCIONANDO 🎈 ------------");
    console.log(`\t Servidor escuchando en http://${HOST} en el puerto ${PORT}`);
    console.log("\t Escuchando peticiones...")
})


// 