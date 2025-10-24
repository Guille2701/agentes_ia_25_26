//IMPORTACIONES
import dotenv from "dotenv";

// CARGO las variables .env a este fichero
dotenv.config();
// todas las variables estan en process.env.nombre_de_la_variable

// mostrar por consola el valor de las variables de ENTORNO

//console.log("URL de acceso: ",process.env.URL);
//console.log("Puerto: ", process.env.PORT);
//console.log(`URL con Puerto: ${process.env.URL}:${Number(process.env.PORT)+1}`);

console.log("curl -X GET https://jsonplaceholder.typicode.com/posts")