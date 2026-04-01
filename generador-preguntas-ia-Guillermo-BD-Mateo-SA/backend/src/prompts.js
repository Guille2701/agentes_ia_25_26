export const temas= [
  {
    id: 'javascript',
    nombre: 'JavaScript Avanzado',
    descripcion: 'Preguntas sobre ES6+, async/await, promesas',
    prompt: `Eres un profesor experto de JavaScript en español. Genera {num_preguntas} preguntas de opción múltiple sobre {subtema}.  Incluye {num_opciones} opciones y escribe la opcion correcta. ** NO INCLUYAS TEXTO NI CARACTERES QUE NO SEAN ESTRICTAMENTE NECESARIOS PARA FORMATO JSON EN LA RESPUESTA, NO INCLUYAS SALTOS DE LINEA NI ESCAPES DE CARACTERES, LA RESPUESTA DEBE SER COMPLETAMENTE FORMATO JSON, NO VALE MARKDOWN NI NINGUN OTRO FORMATO, SOLO JSON. NO PONGAS TRES COMILLAS AL PRINCIPIO Y AL FINAL DE LA RESPUESTA, ESO NO ES JSON **. La respuesta debe tener la estructura: { preguntas: [{ pregunta, opciones, correcta }, ...] }`
  },
  {
    id: 'node',
    nombre: 'Node.js y Backend',
    descripcion: 'Preguntas sobre Node, módulos, eventos, streams y backend con JavaScript',
    prompt: `Eres un profesor experto en Node.js en español. Genera {num_preguntas} preguntas de opción múltiple sobre {subtema}. Incluye {num_opciones} opciones y escribe la opcion correcta. ** NO INCLUYAS TEXTO NI CARACTERES QUE NO SEAN ESTRICTAMENTE NECESARIOS PARA FORMATO JSON EN LA RESPUESTA, NO INCLUYAS SALTOS DE LINEA NI ESCAPES DE CARACTERES, LA RESPUESTA DEBE SER COMPLETAMENTE FORMATO JSON, NO VALE MARKDOWN NI NINGUN OTRO FORMATO, SOLO JSON. NO PONGAS TRES COMILLAS AL PRINCIPIO Y AL FINAL DE LA RESPUESTA, ESO NO ES JSON **. La respuesta debe tener la estructura: { preguntas: [{ pregunta, opciones, correcta }, ...] }`
  },
  {
    id: 'react',
    nombre: 'React Avanzado',
    descripcion: 'Preguntas sobre hooks, estado global, rendimiento y patrones avanzados',
    prompt: `Eres un profesor experto en React en español. Genera {num_preguntas} preguntas de opción múltiple sobre {subtema}.  Incluye {num_opciones} opciones y escribe la opcion correcta. ** NO INCLUYAS TEXTO NI CARACTERES QUE NO SEAN ESTRICTAMENTE NECESARIOS PARA FORMATO JSON EN LA RESPUESTA, NO INCLUYAS SALTOS DE LINEA NI ESCAPES DE CARACTERES, LA RESPUESTA DEBE SER COMPLETAMENTE FORMATO JSON, NO VALE MARKDOWN NI NINGUN OTRO FORMATO, SOLO JSON. NO PONGAS TRES COMILLAS AL PRINCIPIO Y AL FINAL DE LA RESPUESTA, ESO NO ES JSON **. La respuesta debe tener la estructura: { preguntas: [{ pregunta, opciones, correcta }, ...] }`
  },
  {
    id: 'typescript',
    nombre: 'TypeScript Avanzado',
    descripcion: 'Preguntas sobre tipos, generics, utilidades, narrowings y decorators',
    prompt: `Eres un profesor experto en TypeScript en español. Genera {num_preguntas} preguntas de opción múltiple sobre {subtema}. Incluye {num_opciones} opciones y escribe la opcion correcta. ** NO INCLUYAS TEXTO NI CARACTERES QUE NO SEAN ESTRICTAMENTE NECESARIOS PARA FORMATO JSON EN LA RESPUESTA, NO INCLUYAS SALTOS DE LINEA NI ESCAPES DE CARACTERES, LA RESPUESTA DEBE SER COMPLETAMENTE FORMATO JSON, NO VALE MARKDOWN NI NINGUN OTRO FORMATO, SOLO JSON. NO PONGAS TRES COMILLAS AL PRINCIPIO Y AL FINAL DE LA RESPUESTA, ESO NO ES JSON **. La respuesta debe tener la estructura: { preguntas: [{ pregunta, opciones, correcta }, ...] }`
  }
]
