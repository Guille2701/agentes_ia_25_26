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
  res.json(services().getTemas());
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
    const { tema, numPreguntas, numOpciones, subtema } = req.body;

    if (!tema || !numPreguntas) {
      return res.status(400).json({ success: false, error: "Datos incompletos." });
    }

    const preguntas = await services().generarPreguntas(tema, numPreguntas, numOpciones, subtema);

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

## Casos de Uso

Los casos de uso de este proyecto se dividen en dos categorías principales: **Funcionalidades de Consulta** (lectura de datos) y **Funcionalidades de Escritura/Generación** (modificación y creación de datos). El actor principal es el **Sistema Frontend**, que interactúa con el **Backend API** para satisfacer las necesidades del **Usuario Final (Profesor)**.

### I. Casos de Uso de Consulta y Estado

Estos casos de uso se enfocan en obtener información sobre el estado del servicio y el contenido existente.

| Caso de Uso | Actor | API Endpoint (Método) | Descripción |
| :--- | :--- | :--- | :--- |
| **1. Verificar Estado del Servicio** | Sistema Cliente | `/api/health` (`GET`) | Permite al Frontend verificar rápidamente si la API, Ollama (IA) y la Base de Datos están operando correctamente antes de intentar otras operaciones. |
| **2. Mostrar Temas Disponibles** | Sistema Cliente | `/api/temas` (`GET`) | El Frontend llama a este *endpoint* para obtener el listado de temas (tecnologías) que pueden ser usados para generar o filtrar preguntas. |
| **3. Consultar Banco de Preguntas** | Sistema Cliente | `/api/preguntas?tema=` (`GET`) | Obtener una lista de todas las preguntas almacenadas en la base de datos, con la opción de filtrar por un tema específico (ej: JavaScript). |
| **4. Visualizar Pregunta Específica** | Sistema Cliente | `/api/preguntas/:id` (`GET`) | Permite al Frontend cargar los detalles de una pregunta concreta, útil para la edición o visualización individual. |

### II. Casos de Uso de Generación y Gestión de Contenido

Estos casos de uso involucran la creación de nuevas preguntas mediante la IA y la gestión del banco de datos (CRUD).

| Caso de Uso | Actor | API Endpoint (Método) | Descripción |
| :--- | :--- | :--- | :--- |
| **5. Generar y Almacenar Preguntas** | Sistema Cliente / IA | `/api/generate` (`POST`) | **Caso de uso principal.** El Frontend envía los parámetros de configuración (tema, subtema, cantidad de preguntas, opciones) al *backend*. El *backend* interactúa con Ollama (Mistral) para generar el contenido y lo almacena en SQLite3. |
| **6. Eliminar Pregunta Individual** | Sistema Cliente | `/api/preguntas/:id` (`DELETE`) | Permite al Usuario (vía Frontend) retirar una pregunta específica del banco de datos. |
| **7. Limpiar un Tema Completo** | Sistema Cliente | `/api/preguntas/tema/:tema` (`DELETE`) | Permite al Usuario vaciar el banco de preguntas asociadas a una tecnología completa (ej: eliminar todas las preguntas de SQL). |

### Flujo Típico de Uso (Generación)

1.  El **Sistema Cliente** ejecuta el **Caso de Uso 1** (`/api/health`) para confirmar la disponibilidad.
2.  El **Sistema Cliente** ejecuta el **Caso de Uso 2** (`/api/temas`) para mostrar las opciones al usuario.
3.  El **Usuario** selecciona un tema y define la cantidad de preguntas y opciones.
4.  El **Sistema Cliente** inicia el **Caso de Uso 5** (`/api/generate`), esperando la respuesta de la IA.
5.  Una vez generadas, el **Sistema Cliente** puede usar el **Caso de Uso 3** (`/api/preguntas`) para mostrar las nuevas preguntas almacenadas en la interfaz.