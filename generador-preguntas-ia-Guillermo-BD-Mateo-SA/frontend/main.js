//seleccionamos los elementos del DOM
const selectTema = document.querySelector("#tema");
const numeroSelector = document.getElementById('num');
const generadorPreguntas = document.getElementById('generar-btn');
const limpiarBoton = document.getElementById('limpiar-btn');
const containerPreguntas = document.getElementById('preguntas-container');
const indicadorCarga = document.getElementById('loading-indicator');


//Funcion cargarTemas()
async function cargarTemas() {
  try {
    const response = await fetch('/api/temas');
    const temas = await response.json();
    console.log(temas)
    // Limpiamos las opciones anteriores
    selectTema.innerHTML = '';

    temas.forEach(tema => {
      const option = document.createElement('option');
      option.value = tema;
      option.textContent = tema;
      selectTema.appendChild(option);
    });
  } catch (error) {
    console.error('Error al obtener los temas:', error);
  }
}

//funcion generarPreguntas()
const generarPreguntas = async () => {
  const tema = selectTema.value;
  const numPreguntas = parseInt(numeroSelector.value, 10);

  if (!tema)
    return alert('Seleccione un tema');

  if (isNaN(numPreguntas) || numPreguntas < 1 || numPreguntas > 5)
    return alert('Seleccione un numero de preguntas entre 1 y 5');

  // Show spinner by changing display style, overriding CSS
  indicadorCarga.style.display = 'block';

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tema, numPreguntas }),
    });
    const data = await response.json();

    if (!data.success) {
      alert("Error al generar preguntas");
      indicadorCarga.style.display = 'none';
      return;
    }

    mostrarPreguntas(data.preguntas);

  } catch (error) {
    console.error('Error al generar preguntas:', error);
  }

  indicadorCarga.style.display = 'none';
}

//funcion para mostrar las preguntas 
function mostrarPreguntas(preguntas) {
  containerPreguntas.innerHTML = "";

  preguntas.forEach(p => {
    const card = document.createElement('div');
    card.classList.add('pregunta-card');

    const titulo = document.createElement('h3');
    titulo.textContent = p.pregunta;

    const lista = document.createElement("ul");
    p.opciones.forEach(op => {
      const li = document.createElement("li");
      li.textContent = op;
      lista.appendChild(li);
    });

    const eliminar = document.createElement("button");
    eliminar.textContent = "Eliminar";
    eliminar.classList.add("btn");
    eliminar.addEventListener("click", () => {
      eliminarPregunta(p.id);
    });

    const respuesta = document.createElement("p");
    respuesta.classList.add("respuesta");
    respuesta.innerHTML = `<strong>Respuesta Correcta:</strong> ${p.correcta}`;

    card.appendChild(titulo);
    card.appendChild(lista);
    card.appendChild(respuesta);
    card.appendChild(eliminar);

    containerPreguntas.appendChild(card);

  });
}

//Funcion para eliminar la pregunta dado un id
async function eliminarPregunta(id) {
  try {
    await fetch(`/api/preguntas/${id}`, { method: "DELETE" });
    alert("La pregunta ha sido eliminada");
    preguntasAnteriores();
  } catch (error) {
    alert("Error al eliminar la pregunta.");
    console.error(error);
  }
}

//creamos una funcion que mantiene la consistencia entre lo que hay en pantalla y lo que hay en la base de datos
async function preguntasAnteriores() {
  const tema = selectTema.value;

  if (!tema) return;

  const res = await fetch(`/api/preguntas?tema=${tema}`);
  const preguntas = await res.json();

  mostrarPreguntas(preguntas);
}

//funcion limpiar
async function limpiar() {
  containerPreguntas.innerHTML = "";
  numeroSelector.value = 3;

  const tema = selectTema.value;
  if (!tema) return;

  try {
    await fetch(`/api/preguntas/tema/${tema}`, { method: "DELETE" });
    alert("Preguntas del tema eliminadas.");
  } catch (error) {
    alert("Error al limpiar preguntas.");
    console.error(error);
  }
}

//creamos los eventos que se escucharán
generadorPreguntas.addEventListener('click', generarPreguntas);
limpiarBoton.addEventListener('click', limpiar);
selectTema.addEventListener('change', preguntasAnteriores);
numeroSelector.addEventListener('input', () => {
  const num = parseInt(numeroSelector.value, 10);
  if (num > 5) numeroSelector.value = 5;
  if (num < 1) numeroSelector.value = 1;
})

await cargarTemas();
await preguntasAnteriores();