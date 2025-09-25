#!/bin/bash
#@autor: Guillermo Bazan Diaz
#@comment:-
#@description:Script que usa las opciones GET, POST, DELETE, PATCH Y PUT del comando curl (HTTP)

echo "ejecutando curl con GET"

curl -X GET https://jsonplaceholder.typicode.com/posts/1
echo -e "\n"


echo "ejecutando curl con POST"

curl -X POST https://jsonplaceholder.typicode.com/posts \
    -H "Content-Type: application/json" \
    -d '{"title":"nuevo","body":"contenido","userId":1}'

echo -e "\n"

echo "ejecutando curl con PUT"

curl -X PUT https://jsonplaceholder.typicode.com/posts/1 \
    -H "Content-Type: application/json" \
    -d '{"id":1,"title":"actualizado","body":"texto","userId":1}'
echo -e "\n"

echo "ejecutando curl con PATCH"

curl -X PATCH https://jsonplaceholder.typicode.com/posts/1 \
    -H "Content-Type: application/json" \
    -d '{"title":"solo título"}'

echo -e "\n"

echo "ejecutando curl con DELETE"

curl -X DELETE https://jsonplaceholder.typicode.com/posts/1
echo -e "\n"