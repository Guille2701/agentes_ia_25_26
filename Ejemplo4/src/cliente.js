// el cliente lanzara peticiones a la api rest

const  traerPostVinos = async ()=>{
    try{
    const response = await fetch("http://192.168.70.145:4000/posts");
    const data = await response.json();
    console.log(data);

    }catch (error){
        console.error("Error al traer los post:", error);
    }
    
}

traerPostVinos();