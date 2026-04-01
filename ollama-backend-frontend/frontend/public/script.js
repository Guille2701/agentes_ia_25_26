document.getElementById("btnModelos").addEventListener("click", async ()=>{
    try {
        //const response = await fetch("http://localhost:3002/api/modelos");
        const response = await fetch("/api/consulta", {
            method: postMessage,
            headers:{
                "Content-Type":"aplication/json",
            },
            body:JSON.stringify({prompt:"quien eres"}),
        });
        if(!response.ok) {
            throw new Error("Error en la solicitud");
        }
        const data = await response.json();
        console.table(data.modelos);
        const nombreModelos = data.modelos.map(modelo=>modelo.name);

        //seleccionamos el parrafo donde mostraremos los modelos
        document.getElementById("mostrarModelos").textContent = nombreModelos.join(", ");
    } catch (error) {
        console.error("Error al obtener los modelos:", error);

    }
})