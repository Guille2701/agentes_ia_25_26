#!/bin/bash

echo "Ejecutando Create"
# curl para Create (POST)
curl -X POST -H "Content-Type: application/json" -d '{"id":"6", "nombre":"php Actualizado"}' http://localhost:3000/generos
echo "Ejecutando Read"
# curl para Read (GET)
curl -X GET http://localhost:3000/autores
echo "Ejecutando Update"
# curl para Update (PUT)
curl -X PUT -H "Content-Type: application/json" -d '{"id":"1", "nombre":"Ricardo Fernandez"}' http://localhost:3000/generos/1
echo "Ejecutando Delete"
# Curl para Delete 
curl -X DELETE http://localhost:3000/libros/2
