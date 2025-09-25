#!/bin/bash
#@autor: Guillermo Bazan Diaz
#@comment:-
#@description: Script que valida si tenemos instalados: git, node, npm, curl
#Crear un script que usando el comando command -s verifique si tengo instalado o no los paquetes git, node, npm, curl.
#Si alguno no esta en el sistema mostraremos mensaje de error

echo "Verificando los paquetes"

if command -v node>/dev/null 2>&1;then
	NODE_VERSION=$(node --version)
	echo "Node instalado correctamente; version $NODE_VERSION"
else 
	echo "NodeJs no esta instalado"
	exit 1
fi

if command -v git>/dev/null 2>&1;then
	GIT_VERSION=$(git --version)
	echo "GIT instalado correctamente; version $GIT_VERSION"
else
	echo "No tienes instalado GIT"
	exit 1
fi

if command -v npm>/dev/null 2>&1;then
	NPM_VERSION=$(npm --version)
	echo "npm instalado correctamente; version $NPM_VERSION"
else
	echo "No tienes instalado npm"
	exit 1
fi	

if command -v curl>/dev/null 2>&1;then
	CURL_VERSION=$(curl --version)
	echo "Curl instalado correctamente; version $CURL_VERSION"
else
	echo "Curl no esta instalado"
	exit 1
fi

echo "Todos los paquetes estan instalados correctamente"
