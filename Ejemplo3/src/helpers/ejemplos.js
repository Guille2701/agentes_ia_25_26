import { config } from 'dotenv';
import { exec } from 'child_process';


config(); // <---- ha cargado en process.env las variables

const API_URL = process.env.API_URL;


export const getAllUsers = ()=>{
    const URL_BASE =`${API_URL}/users`;
    const cmd = `curl -s GET ${URL_BASE}`;
    exec(cmd,(error,stdout,stderror)=>{
        if(error){
            console.error("Error ejecutando el curl-->",error.message);
            return;
        }
        if(stderror){
             console.error("Error en la salida del curl-->",stderror);
            return;
        }
        const data = JSON.parse(stdout);
        console.table(data);
        console.log(data);
    
    });
}