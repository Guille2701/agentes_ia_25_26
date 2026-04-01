// run_services.js
import services from './services.js';

async function run() {
    const svc = services();

    console.log('--- Generar preguntas ---');
    try {
        const respuesta = await svc.generarPreguntas('typescript', 2, 2, 'subtema');
        console.log('Respuesta de generarPreguntas:', respuesta);
    } catch (error) {
        console.error('Error en generarPreguntas:', error);
    }

    console.log('\n--- Obtener preguntas ---');
    try {
        const preguntas = svc.obtenerPreguntas('typescript');
        console.log('Preguntas obtenidas:', preguntas);
    } catch (error) {
        console.error('Error en obtenerPreguntas:', error);
    }

    console.log('\n--- Ver DB ---');
    try {
        const dbAll = svc.verDb();
        console.log('Contenido actual de la DB:', dbAll);
    } catch (error) {
        console.error('Error en verDb:', error);
    }

    console.log('\n--- Limpiar tema ---');
    try {
        const eliminadas = svc.limpiarTema('typescript');
        console.log(`Número de preguntas eliminadas del tema "typescript":`, eliminadas);
    } catch (error) {
        console.error('Error en limpiarTema:', error);
    }

    console.log('\n--- Ver DB después de limpiar ---');
    try {
        const dbAllAfter = svc.verDb();
        console.log('Contenido de la DB después de limpiar:', dbAllAfter);
    } catch (error) {
        console.error('Error en verDb:', error);
    }
}

run();
