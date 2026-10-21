# Registro de notas

Práctica 2 · Arrays · Desarrollo Web en Entorno Cliente · 2º DAW · IES Juan García Valdemora

**Alumno/a:** _escribe aquí tu nombre_
**Página publicada (GitHub Pages):** _pega aquí la URL_
**Repositorio:** _pega aquí la URL del repositorio_

## Descripción

Registro de notas de una clase hecho solo con arrays. La página muestra una tabla de alumnos que se puede filtrar (todos, aprobados, suspensos), ordenar (por nombre o por nota), a la que se pueden añadir alumnos con validación y de la que se pueden borrar alumnos. Debajo de la tabla se muestra un resumen con el número de alumnos, la nota media, la nota máxima y el número de aprobados.

## Estructura del proyecto

| Archivo | Contenido |
|---------|-----------|
| `index.html` | Estructura de la página: selectores, tabla, resumen y formulario |
| `estilos.css` | Estilos, con distinto color para notas aprobadas y suspensas |
| `notas.js` | Las funciones que trabajan con la lista de alumnos, documentadas con JSDoc |
| `app.js` | Dibuja la tabla, gestiona los selectores, el formulario y el borrado |
| `notas.md` | Apuntes: predicciones, resultados y respuestas a las preguntas de cada fase |
| `README.md` | Este documento |

Para probarlo, abre `index.html` con Live Server.

## Funciones de `notas.js`

### Funciones que CAMBIAN la lista que reciben

| Función | Método | Qué hace |
|---------|--------|----------|
| `anadirAlumno(lista, nombre, nota)` | `push` | Añade un alumno al final y devuelve la nueva cantidad |
| `quitarUltimo(lista)` | `pop` | Quita y devuelve el último alumno |
| `insertarEn(lista, posicion, nombre, nota)` | `splice` | Inserta un alumno en una posición sin borrar a nadie |
| `borrarPorNombre(lista, nombre)` | `splice` | Borra al alumno con ese nombre; devuelve `true` o `false` |

### Funciones que NO cambian la lista (devuelven una copia o un dato)

| Función | Método | Qué devuelve |
|---------|--------|--------------|
| `buscarPorNombre(lista, nombre)` | `find` | El alumno, o `undefined` |
| `ordenarPorNota(lista)` | `sort` sobre una copia | Copia ordenada de mayor a menor nota |
| `ordenarPorNombre(lista)` | `sort` sobre una copia | Copia ordenada de la A a la Z |
| `notaMedia(lista)` | `reduce` | La media sin redondear (0 si no hay alumnos) |
| `notaMaxima(lista)` | `map` | La nota más alta (`null` si no hay alumnos) |
| `aprobados(lista)` | `filter` | Los alumnos con 5 o más |
| `nombresAprobados(lista)` | `map` | Los nombres de los aprobados |
| `hayAlgunDiez(lista)` | `some` | `true` si alguien tiene un 10 |
| `todosAprobados(lista)` | `every` | `true` si todos tienen 5 o más |
| `ranking(lista, n)` | `sort` sobre una copia y `slice` | Los n mejores alumnos |
| `filtrarAlumnos(lista, filtro)` | `filter` | Copia con los alumnos del filtro |
| `ordenarAlumnos(lista, criterio)` | funciones de la Fase 2 | Copia ordenada según el criterio |
| `esNotaValida(texto)` | — | `true` si es un número de 0 a 10 |

## Fases y capturas

Cada fase termina con un commit. Pega cada captura en la carpeta `capturas/` con el nombre indicado y el README la mostrará.

### Fase 1 · Explora los arrays

Commit: `Fase 1: exploración de arrays`. El detalle está en `notas.md`.

> **CAPTURA 1 · `tabla-predicciones.png`**
> <img width="1062" height="642" alt="image" src="https://github.com/user-attachments/assets/ba3380e0-f9a2-4aeb-8657-b4f9f0d2941c" />


### Fase 2 · Añadir, quitar, buscar y ordenar

Commit: `Fase 2: añadir, quitar, buscar y ordenar`.

> <img width="520" height="457" alt="image" src="https://github.com/user-attachments/assets/41384372-5fd0-4f1c-a529-bbba454ee757" />
> <img width="532" height="436" alt="image" src="https://github.com/user-attachments/assets/f7112cbf-7bdf-4b19-b48b-ea70399792b0" />



![Funciones en la consola](capturas/funciones-consola.png)

### Fase 3 · Estadísticas de la clase

Commit: `Fase 3: estadísticas de la clase`.

><img width="523" height="502" alt="image" src="https://github.com/user-attachments/assets/0d33d59d-cd3a-4c56-9c74-bb90973a781e" />


### Fase 4 · Tabla dinámica con filtro y orden

Commit: `Fase 4: tabla dinámica con filtro y orden`.

><img width="648" height="843" alt="image" src="https://github.com/user-attachments/assets/7ffde6ae-aada-421f-a91b-4745861edbf0" />


### Fase 5 · Depuración y documentación

Commit: `Fase 5: depuración y documentación`.

> <img width="526" height="345" alt="image" src="https://github.com/user-attachments/assets/4e7413c5-6a93-421c-98f6-f5c2efbc97e3" />
