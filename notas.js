/*
  notas.js - Registro de notas
  Funciones que trabajan con una lista de alumnos. Cada alumno es un objeto { nombre, nota }.
  Cada función indica si CAMBIA la lista que recibe o NO la cambia.
*/

/** Lista inicial de la clase (10 alumnos). */
const ALUMNOS_INICIALES = [
  { nombre: "Ana", nota: 7.5 },
  { nombre: "Luis", nota: 4 },
  { nombre: "Marta", nota: 9.25 },
  { nombre: "Pablo", nota: 5 },
  { nombre: "Lucía", nota: 10 },
  { nombre: "Diego", nota: 3.5 },
  { nombre: "Elena", nota: 6.75 },
  { nombre: "Hugo", nota: 9 },
  { nombre: "Sara", nota: 1 },
  { nombre: "Iván", nota: 5.5 }
];

/* ---------- Fase 2: añadir, quitar, buscar y ordenar ---------- */

/**
 * Añade un alumno al final de la lista.
 * @param {Array} lista - Lista de alumnos.
 * @param {string} nombre - Nombre del alumno.
 * @param {number} nota - Nota del alumno.
 * @returns {number} La nueva cantidad de alumnos.
 * Cambia la lista: SÍ (push).
 */
function anadirAlumno(lista, nombre, nota) {
  return lista.push({ nombre, nota });
}

/**
 * Quita el último alumno de la lista.
 * @param {Array} lista - Lista de alumnos.
 * @returns {Object|undefined} El alumno quitado (undefined si la lista estaba vacía).
 * Cambia la lista: SÍ (pop).
 */
function quitarUltimo(lista) {
  return lista.pop();
}

/**
 * Busca un alumno por su nombre.
 * @param {Array} lista - Lista de alumnos.
 * @param {string} nombre - Nombre a buscar.
 * @returns {Object|undefined} El alumno, o undefined si no existe.
 * Cambia la lista: NO (find).
 */
function buscarPorNombre(lista, nombre) {
  return lista.find((alumno) => alumno.nombre === nombre);
}

/**
 * Inserta un alumno en una posición sin borrar a nadie.
 * @param {Array} lista - Lista de alumnos.
 * @param {number} posicion - Posición donde se inserta.
 * @param {string} nombre - Nombre del alumno.
 * @param {number} nota - Nota del alumno.
 * @returns {void} No devuelve nada.
 * Cambia la lista: SÍ (splice).
 */
function insertarEn(lista, posicion, nombre, nota) {
  lista.splice(posicion, 0, { nombre, nota });
}

/**
 * Borra al alumno con ese nombre.
 * @param {Array} lista - Lista de alumnos.
 * @param {string} nombre - Nombre del alumno a borrar.
 * @returns {boolean} true si ha borrado a alguien, false si no existía.
 * Cambia la lista: SÍ (splice), solo si lo encuentra.
 */
function borrarPorNombre(lista, nombre) {
  const posicion = lista.findIndex((alumno) => alumno.nombre === nombre);
  if (posicion === -1) {
    return false;
  }
  lista.splice(posicion, 1);
  return true;
}

/**
 * Ordena por nota, de la más alta a la más baja.
 * @param {Array} lista - Lista de alumnos.
 * @returns {Array} Una copia ordenada.
 * Cambia la lista: NO (ordena una copia hecha con [...lista]).
 */
function ordenarPorNota(lista) {
  return [...lista].sort((a, b) => b.nota - a.nota);
}

/**
 * Ordena por nombre, de la A a la Z.
 * @param {Array} lista - Lista de alumnos.
 * @returns {Array} Una copia ordenada.
 * Cambia la lista: NO (ordena una copia hecha con [...lista]).
 */
function ordenarPorNombre(lista) {
  return [...lista].sort((a, b) => a.nombre.localeCompare(b.nombre));
}

/* ---------- Fase 3: estadísticas de la clase ---------- */

/**
 * Calcula la nota media sin redondear.
 * @param {Array} lista - Lista de alumnos.
 * @returns {number} La media, o 0 si no hay alumnos.
 * Cambia la lista: NO (reduce).
 */
function notaMedia(lista) {
  const suma = lista.reduce((total, alumno) => total + alumno.nota, 0);
  return lista.length === 0 ? 0 : suma / lista.length;
}

/**
 * Busca la nota más alta.
 * @param {Array} lista - Lista de alumnos.
 * @returns {number|null} La nota máxima, o null si no hay alumnos.
 * Cambia la lista: NO (map).
 */
function notaMaxima(lista) {
  if (lista.length === 0) {
    return null;
  }
  return Math.max(...lista.map((alumno) => alumno.nota));
}

/**
 * Selecciona los alumnos con 5 o más.
 * @param {Array} lista - Lista de alumnos.
 * @returns {Array} Nuevo array con los aprobados.
 * Cambia la lista: NO (filter).
 */
function aprobados(lista) {
  return lista.filter((alumno) => alumno.nota >= 5);
}

/**
 * Obtiene solo los nombres de los aprobados.
 * @param {Array} lista - Lista de alumnos.
 * @returns {string[]} Nombres de los aprobados.
 * Cambia la lista: NO (usa aprobados y map).
 */
function nombresAprobados(lista) {
  return aprobados(lista).map((alumno) => alumno.nombre);
}

/**
 * Indica si algún alumno tiene un 10.
 * @param {Array} lista - Lista de alumnos.
 * @returns {boolean} true si hay algún 10.
 * Cambia la lista: NO (some).
 */
function hayAlgunDiez(lista) {
  return lista.some((alumno) => alumno.nota === 10);
}

/**
 * Indica si todos los alumnos tienen 5 o más.
 * @param {Array} lista - Lista de alumnos.
 * @returns {boolean} true si todos aprueban (true también con lista vacía).
 * Cambia la lista: NO (every).
 */
function todosAprobados(lista) {
  return lista.every((alumno) => alumno.nota >= 5);
}

/**
 * Devuelve los n mejores alumnos.
 * @param {Array} lista - Lista de alumnos.
 * @param {number} n - Cuántos alumnos se quieren.
 * @returns {Array} Los n mejores, de mayor a menor nota.
 * Cambia la lista: NO (ordenarPorNota trabaja con una copia).
 */
function ranking(lista, n) {
  return ordenarPorNota(lista).slice(0, n);
}

/* ---------- Fase 4: filtro, orden y validación ---------- */

/**
 * Filtra los alumnos según el filtro elegido.
 * @param {Array} lista - Lista de alumnos.
 * @param {string} filtro - "todos", "aprobados" o "suspensos" (suspenso: menos de 5).
 * @returns {Array} Una copia con los alumnos que cumplen el filtro.
 * Cambia la lista: NO.
 */
function filtrarAlumnos(lista, filtro) {
  if (filtro === "aprobados") {
    return aprobados(lista);
  }
  if (filtro === "suspensos") {
    return lista.filter((alumno) => alumno.nota < 5);
  }
  return [...lista];
}

/**
 * Ordena los alumnos según el criterio elegido.
 * @param {Array} lista - Lista de alumnos.
 * @param {string} criterio - "nombre", "nota-desc" o "nota-asc".
 * @returns {Array} Una copia ordenada.
 * Cambia la lista: NO (usa ordenarPorNombre y ordenarPorNota, que ya copian).
 */
function ordenarAlumnos(lista, criterio) {
  if (criterio === "nombre") {
    return ordenarPorNombre(lista);
  }
  if (criterio === "nota-asc") {
    return ordenarPorNota(lista).reverse(); // reverse actúa sobre la copia
  }
  return ordenarPorNota(lista);
}

/**
 * Comprueba si un texto es un número entre 0 y 10.
 * @param {string} texto - Texto escrito por el usuario.
 * @returns {boolean} true si es un número de 0 a 10; false si está vacío o no es número.
 * Cambia la lista: NO (no recibe ninguna lista).
 */
function esNotaValida(texto) {
  if (texto.trim() === "") {
    return false;
  }
  const numero = Number(texto);
  return !Number.isNaN(numero) && numero >= 0 && numero <= 10;
}