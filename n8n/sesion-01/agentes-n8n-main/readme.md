# Guía de Inicio: Proyecto de Automatización de Correos con n8n

Este documento documenta el proceso visual para crear un nuevo proyecto en n8n desde cero. El objetivo del flujo de trabajo es leer una tabla con correos electrónicos desde una hoja de cálculo y enviar mensajes automáticamente a dichos destinatarios.

A continuación se muestran las capturas del proceso paso a paso, ordenadas cronológicamente para facilitar su seguimiento.

## Proceso de Configuración

### 1. Iniciar n8n y Configuración Inicial
Comenzamos lanzando la instancia de n8n (ya sea localmente mediante `npx n8n` o abriendo nuestra instancia en la nube) y abriendo la interfaz en el navegador.

![Configuración 1](./images/Captura%20de%20pantalla%202026-01-14%20183020.jpg)
*Pantalla de carga o terminal de inicio de n8n.*

![Configuración 2](./images/Captura%20de%20pantalla%202026-01-14%20183104.jpg)
*Interfaz inicial o login.*

![Configuración 3](./images/Captura%20de%20pantalla%202026-01-14%20183409.jpg)
*Vista del dashboard principal de n8n.*

### 2. Creación del Flujo de Trabajo (Workflow)
Creamos un nuevo "Workflow" en blanco. Este será el lienzo donde conectaremos nuestros nodos.

![Flujo 1](./images/Captura%20de%20pantalla%202026-01-14%20184902.jpg)
*Botón para crear nuevo workflow.*

![Flujo 2](./images/Captura%20de%20pantalla%202026-01-14%20184930.jpg)
*Lienzo vacío listo para agregar nodos.*

### 3. Integración de la Hoja de Cálculo (Google Sheets)
El primer paso lógico es obtener los datos. Agregamos el nodo de **Google Sheets** (o similar) para leer la tabla que contiene los correos electrónicos. Se configura la autenticación y se selecciona el archivo y la hoja correcta.

![Integración 1](./images/Captura%20de%20pantalla%202026-01-15%20102823.jpg)
*Búsqueda y selección del nodo de Google Sheets.*

![Integración 2](./images/Captura%20de%20pantalla%202026-01-15%20102858.jpg)
*Configuración de credenciales y selección del documento.*

![Integración 3](./images/Captura%20de%20pantalla%202026-01-15%20102925.jpg)
*Vista previa de los datos obtenidos (filas con correos).*

### 4. Configuración del Envío de Correos (Gmail / Email)
Una vez tenemos los datos, agremos un nodo de envío de correos, como **Gmail** o el nodo genérico de **Email**.

![Correo 1](./images/Captura%20de%20pantalla%202026-01-15%20103127.jpg)
*Selección del nodo de envío de correo.*

![Correo 2](./images/Captura%20de%20pantalla%202026-01-15%20103222.jpg)
*Conexión del nodo de Google Sheets con el nodo de Email.*

![Correo 3](./images/Captura%20de%20pantalla%202026-01-15%20103255.jpg)
*Configuración de la cuenta de salida.*

![Correo 4](./images/Captura%20de%20pantalla%202026-01-15%20103322.jpg)
*Definición de campos básicos (Asunto, Destinatario).*

### 5. Ajustes y Mapeo de Datos (Expresiones)
Es crucial conectar los datos leídos con los campos del correo. Usamos expresiones para arrastrar el campo "Email" de la hoja de cálculo al campo "To" (Destinatario) del nodo de correo.

![Ajustes 1](./images/Captura%20de%20pantalla%202026-01-15%20103546.jpg)
*Panel de mapeo de datos: Seleccionando la columna 'Email'.*

![Ajustes 2](./images/Captura%20de%20pantalla%202026-01-15%20103732.jpg)
*Configuración del cuerpo del mensaje (posiblemente dinámico).*

![Ajustes 3](./images/Captura%20de%20pantalla%202026-01-15%20103835.jpg)
*Verificación de que los datos fluyen correctamente entre nodos.*

### 6. Pruebas y Depuración
Antes de activar, ejecutamos el flujo manualmente para asegurar que funciona como se espera y corregir cualquier error.

![Pruebas 1](./images/Captura%20de%20pantalla%202026-01-15%20104540.jpg)
*Ejecución de prueba (Execute Workflow).*

![Pruebas 2](./images/Captura%20de%20pantalla%202026-01-15%20104936.jpg)
*Revisión de resultados de la ejecución.*

### 7. Finalización y Activación
Finalmente, guardamos el flujo de trabajo y lo activamos para que pueda funcionar automáticamente (si se configuró un trigger) o estar listo para uso futuro.

![Final 1](./images/Captura%20de%20pantalla%202026-01-15%20110009.jpg)
*Vista final del flujo completo.*

![Final 2](./images/Captura%20de%20pantalla%202026-01-15%20110041.jpg)
*Guardado del proyecto.*

![Final 3](./images/Captura%20de%20pantalla%202026-01-15%20110100.jpg)
*Activación (Toggle Active).*

![Final 4](./images/Captura%20de%20pantalla%202026-01-15%20110401.jpg)
*Dashboard mostrando el workflow activo.*
