// Fichero encargado de levantar una API REST con Express
import { config } from "dotenv";
import express from "express";
import dataApi from "./db/db.js";
import cors from "cors";



config();

const PORT= process.env.PORT || "4001";
const NODE_ENV= process.env.NODE_ENV;
const SERVER_URL=process.env.SERVER_URL || "http://localhost";
const HOST=process.env.HOST;



const app=express();

// permitir CORS
app.use(cors());

// permitir JSON como cuerpo de peticion
app.use(express.json());

// middlewre
app.use((req,res,next)=>{
    const timeData = new Date().toISOString();
    console.log(`${timeData} ${req.method}${req.url} - IP ${req.ip}`);

    next();
});


app.get('/',(req,res)=>{
    res.json({
        message:"Mini api de post de monster",
        version:1.0,
        endpoints: {
            "GET /posts":"Obtiene todos los post de mi api"
        }
    })
});

app.get("/posts",(req,res)=>{
    console.log("Peticion GET para traer los post de mi api");
    
    res.json({
        succes:true,
        data:dataApi,
        //para que se autoincrementen : count:posts.length
        count: dataApi.length,
    });
});

app.delete("/posts",(req,res)=>{
    console.log("Peticion DELETE para borrar los datos de mi api");
    
    res.json({
        succes:true,
        data:dataApi,
    });
});

app.put("/posts",(req,res)=>{
    console.log("Peticion PUT para actualizar los datos de mi api");
    
    res.json({
        succes:true,
        data:dataApi,
    });
});

app.patch("/posts",(req,res)=>{
    console.log("Peticion PATCH para actualizar los datos de mi api");
    
    res.json({
        succes:true,
        data:dataApi,
    });
});





app.listen(PORT, HOST, ()=>{
    console.log(`Servidor de Guillermo Bazan 😊 --> ${SERVER_URL}:${PORT}`);
});