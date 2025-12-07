# Generador de Preguntas con Ollama 🤖

Hecho por Guillermo Bazán y Mateo Sáez

## Descripción general 

Este proyecto consiste en un generador de preguntas tipo test con una IA en local. Para la realización de este proyecto se ha usado JavaScript puro, Mistral como la inteligencia artificial y SQLite3 como base de datos para las preguntas generadas.

## Estructura de carpetas
Para este proyecto hemos separado en dos grandes carpetas: backend y frontend.

### 🛠️ Backend
En esta carpeta se almacena toda la lógica, endpoints y comunicación con la IA al frontend. Actúa como intermediario con la API de la IA para evitar un uso indebido de su API.

#### db.js
En este archivo hemos creado la estructura de la base de datos. Crea automáticamente un archivo .db

#### prompts.js
Este archivo guarda en un array de objetos los prompts que se le darán a la IA para que genere preguntas de los temas determinados.

#### routes.js
Aquí guardamos todos los endpoints de nuestra API con sus respectivos métodos que nos permiten comunicarnos con la IA.

#### server.js
En este archivo se inicializa el servidor con unos archivos estáticos y conecta el puerto necesario para el servicio.

#### services.js
Aquí encontramos toda la lógica principal del proyecto. La comunicación con la API de nuestra inteligencia artificial se encuentra en este archivo.

#### 🐋dockerfile
En este archivo se encuentra la configuración del contenedor backend de la aplicación.

### 🎨 Frontend
Aquí se ha guardado todo lo que ve el usuario. El código HTML, CSS y lógica / interactividad JavaScript está aquí.

#### index.html
Encontramos aquí el código HTML de la página web con las etiquetas determinadas.

#### style.css
En este archivo encontramos todos los estilos asociados a los elementos del código HTML 

#### main.js
Encontramos aquí la lógica JavaScript del frontend. Los métodos se comunican con los elementos del DOM establecidos en el código HTML y con el backend mediante el uso del async/await, dado que estamos esperando unos datos en una cola de concurrencia.

#### dockerfile
En este dockerfile se monta el contenedor del frontend.

### Fuera de la estructura principal
Es necesario hablar de unos archivos importantes que se encuentran fuera de la estructura principal conformada por las carpetas frontend y backend.

#### validacion.http
En este archivo se encuentran unos métodos curl usando REST client para probar los endpoints de nuestra API

#### docker-compose.yml
En el docker-compose levantamos todos los contenedores a la vez haciendo uso de sus dockerfiles correspondientes.

#### README.md
Este archivo en el que nos encontramos contiene toda la documentación importante respecto a este proyecto.

## API Endpoints

Hemos hecho siete endpoints para nuestra API de inteligencia artificial.

El primer endpoint es: /api/health con el siguiente método
```JavaScript
router.get("/health", async (req, res) => {
  const status = await healthCheck();
  res.json(status);
});
```
Este método revisa el estado general de la API.


Nuestro segundo endpoint es /api/temas

```JavaScript
router.get("/temas", (req, res) => {
  res.json(getTemas());
});
```
Este método nos muestra los temas que hay en la base de datos para ser utilizados.

El tercer endpoint creado es /api/preguntas con el método
```JavaScript
router.get("/preguntas", async (req, res) => {
  const { tema } = req.query;
  const preguntas = services().obtenerPreguntas(tema);
  res.json(preguntas);
});
```
Este método nos permite obtener de la base de datos las preguntas creadas.

El cuarto endpoint es /api/preguntas/:id con el siguiente método
```JavaScript
router.get("/preguntas/:id", (req, res) => {
  const pregunta = obtenerPreguntaPorId(req.params.id);
  if (!pregunta) return res.status(404).json({ error: "No encontrada" });

  res.json(pregunta);
});
```
Con este método obtenemos una pregunta concreta determinada por su identificador único.

El quinto endpoint que hemos creado es /api/generate con el siguiente método
```JavaScript
router.post("/generate", async (req, res) => {
  try {
    const { tema, numPreguntas, subtema } = req.body;

    if (!tema || !numPreguntas) {
      return res.status(400).json({ success: false, error: "Datos incompletos." });
    }

    const preguntas = await services().generarPreguntas(tema, numPreguntas, subtema);

    res.json({ success: true, preguntas });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
```
Este método es el que nos genera las preguntas según los parámetros que reciba en el body.

El sexto endpoint es /api/preguntas/:id con el método siguiente
```JavaScript
router.delete("/preguntas/:id", (req, res) => {
  services().eliminarPregunta(req.params.id);
  res.json({ success: true, mensaje: "Eliminada" });
});
```
Este método nos permite eliminar una pregunta concreta determinada por su id.

El último endpoint que hemos creado es /api/preguntas/tema/:tema con el método
```JavaScript
router.delete("/preguntas/tema/:tema", (req, res) => {
  const count = services().limpiarTema(req.params.tema);
  res.json({ success: true, eliminadas: count });
});
```
Este último método nos permite eliminar las preguntas con un nombre común en su totalidad de la base de datos. 