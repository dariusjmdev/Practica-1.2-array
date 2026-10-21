/*
  app.js - Página del registro de notas
  Usa las funciones de notas.js. La lista verdadera es "alumnos":
  filtrar y ordenar trabajan con copias y nunca la modifican.
*/

/* ---------- Datos y elementos del HTML ---------- */

// Copia de la lista inicial para no alterar la constante
const alumnos = [...ALUMNOS_INICIALES];

const selectFiltro = document.getElementById("filtro");
const selectOrden = document.getElementById("orden");
const cuerpo = document.getElementById("cuerpo");
const resumen = document.getElementById("resumen");
const formulario = document.getElementById("formulario");
const inputNombre = document.getElementById("nombre");
const inputNota = document.getElementById("nota");
const mensaje = document.getElementById("mensaje");

/* ---------- Dibujo de la página ---------- */

/**
 * Dibuja la tabla. Es la única función que la dibuja y se llama
 * cada vez que algo cambia: aplica el filtro, el orden y escribe las filas.
 */
function pintarTabla() {
  const filtrados = filtrarAlumnos(alumnos, selectFiltro.value);
  const visibles = ordenarAlumnos(filtrados, selectOrden.value);

  cuerpo.innerHTML = "";

  if (visibles.length === 0) {
    const fila = document.createElement("tr");
    const celda = document.createElement("td");
    celda.colSpan = 3;
    celda.textContent = "No hay alumnos que mostrar.";
    fila.appendChild(celda);
    cuerpo.appendChild(fila);
  }

  for (const alumno of visibles) {
    const fila = document.createElement("tr");

    const celdaNombre = document.createElement("td");
    celdaNombre.textContent = alumno.nombre;

    // La clase cambia el color según la nota
    const celdaNota = document.createElement("td");
    celdaNota.textContent = alumno.nota;
    celdaNota.className = alumno.nota >= 5 ? "aprobado" : "suspenso";

    const celdaBorrar = document.createElement("td");
    const boton = document.createElement("button");
    boton.type = "button";
    boton.textContent = "✕";
    boton.addEventListener("click", function () {
      borrarPorNombre(alumnos, alumno.nombre);
      pintarTabla();
    });
    celdaBorrar.appendChild(boton);

    fila.append(celdaNombre, celdaNota, celdaBorrar);
    cuerpo.appendChild(fila);
  }

  pintarResumen();
}

/** Escribe el resumen de toda la lista (no solo de lo que se ve). */
function pintarResumen() {
  const maxima = notaMaxima(alumnos);
  resumen.textContent =
    "Alumnos: " + alumnos.length +
    " | Nota media: " + notaMedia(alumnos).toFixed(2) +
    " | Nota máxima: " + (maxima === null ? "-" : maxima) +
    " | Aprobados: " + aprobados(alumnos).length;
}

/* ---------- Filtro y orden ---------- */

selectFiltro.addEventListener("change", pintarTabla);
selectOrden.addEventListener("change", pintarTabla);

/* ---------- Añadir alumno ---------- */

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault(); // evita que el formulario recargue la página

  const nombre = inputNombre.value.trim();
  const nota = inputNota.value;

  if (nombre === "") {
    mensaje.textContent = "El nombre no puede estar vacío.";
    return;
  }
  if (buscarPorNombre(alumnos, nombre) !== undefined) {
    mensaje.textContent = "Ya existe un alumno con ese nombre.";
    return;
  }
  if (!esNotaValida(nota)) {
    mensaje.textContent = "La nota debe ser un número de 0 a 10.";
    return;
  }

  anadirAlumno(alumnos, nombre, Number(nota));
  mensaje.textContent = "";
  formulario.reset();
  pintarTabla();
});

/* ---------- Inicio ---------- */

pintarTabla();