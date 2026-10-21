# Notas · Práctica 2 · Arrays

Apuntes de cada fase. La columna «Predicción» se rellena ANTES de ejecutar cada línea en la consola; la columna «Salió» es el resultado real.

## Fase 1 · Explora los arrays

| Nº | Línea | Predicción | Salió |
|----|-------|------------|-------|
| 1 | `a[0]` | | `"x"` |
| 2 | `a[3]` | | `undefined` |
| 3 | `a.length` | | `3` |
| 4 | `[1, "dos", true].length` | | `3` |
| 5 | `const c = [1]; c.push(2); c` | | `[1, 2]` (const no impide modificar el contenido) |
| 6 | `q.push(4)` y mirar `p` | | Devuelve `4`; `p` también es `[1, 2, 3, 4]` |
| 7 | `let r = [...p]; r.push(5)` y mirar `p` | | Devuelve `5`; `r` es `[1, 2, 3, 4, 5]` y `p` sigue en `[1, 2, 3, 4]` |
| 8 | `[10, 9, 1].sort()` | | `[1, 10, 9]` |
| 9 | `[10, 9, 1].sort((x, y) => x - y)` | | `[1, 9, 10]` |
| 10 | `n.push(4)` | | Devuelve `4`; `n` cambia a `[3, 1, 2, 4]` |
| 11 | `n.pop()` | | Devuelve `2`; `n` cambia a `[3, 1]` |
| 12 | `n.slice(0, 2)` | | Devuelve `[3, 1]`; `n` no cambia (`[3, 1, 2]`) |
| 13 | `n.map(x => x * 2)` | | Devuelve `[6, 2, 4]`; `n` no cambia (`[3, 1, 2]`) |

**1. ¿Qué da `a[3]` si el array solo tiene 3 elementos? ¿Por qué?**
Da `undefined`. Los índices empiezan en 0, así que las posiciones válidas son 0, 1 y 2. La posición 3 no existe y JavaScript no lanza error: devuelve `undefined`.

**2. ¿Por qué `q.push(4)` cambió `p` y `r.push(5)` no?**
`let q = p` no copia el array: `q` y `p` apuntan al mismo array en memoria (referenciar). Cualquier cambio hecho desde uno se ve desde el otro. `[...p]` crea un array nuevo con los mismos valores (copiar), y `r` es independiente de `p`.

**3. ¿Por qué `[10, 9, 1].sort()` no dio `[1, 9, 10]`?**
Sin función de comparación, `sort` convierte los elementos a texto y los ordena alfabéticamente. Como texto, `"1"` va antes que `"10"` y `"10"` antes que `"9"`, por eso sale `[1, 10, 9]`.

**4. Bloque D: ¿qué métodos cambian el array y cuáles devuelven uno nuevo?**
Cambian el array: `push` y `pop`. Devuelven un array nuevo sin tocar el original: `slice` y `map`.

## Fase 2 · Añadir, quitar, buscar y ordenar

| Función | ¿Cambia la lista? |
|---------|-------------------|
| `anadirAlumno` | Cambia (`push`) |
| `quitarUltimo` | Cambia (`pop`) |
| `buscarPorNombre` | No cambia (`find`) |
| `insertarEn` | Cambia (`splice`) |
| `borrarPorNombre` | Cambia (`splice`) |
| `ordenarPorNota` | No cambia (ordena una copia) |
| `ordenarPorNombre` | No cambia (ordena una copia) |

Comprobación: con los 10 alumnos, `ordenarPorNota` deja a Lucía (10) primera y a Marta (9,25) segunda. Hugo (9) queda tercero, porque 9,25 es mayor que 9.

**1. ¿Qué funciones cambian la lista y cuáles no? ¿Cómo lo sé?**
Cambian la lista `anadirAlumno`, `quitarUltimo`, `insertarEn` y `borrarPorNombre`. No la cambian `buscarPorNombre`, `ordenarPorNota` y `ordenarPorNombre`. Lo sé por el método que usan (`push`, `pop` y `splice` modifican; `find` y `sort` sobre una copia no) y porque lo comprobé mostrando la lista con `console.table` antes y después de llamarlas.

**2. ¿Por qué `ordenarPorNota` hace una copia antes de ordenar?**
Porque `sort` modifica el array sobre el que se llama. Con `[...lista]` se ordena la copia y la lista original queda intacta.

**3. ¿Qué pasaría con 10, 9 y 1 sin función de comparación?**
Saldría `[1, 10, 9]`, porque se compararía como texto.

## Fase 3 · Estadísticas de la clase

**Experimento 1: todas las funciones con una lista vacía**

| Función | Devuelve |
|---------|----------|
| `notaMedia([])` | `0` |
| `notaMaxima([])` | `null` |
| `aprobados([])` | `[]` |
| `nombresAprobados([])` | `[]` |
| `hayAlgunDiez([])` | `false` |
| `todosAprobados([])` | `true` |
| `ranking([], 3)` | `[]` |

**Experimento 2: `reduce` sin valor inicial con lista vacía**
Error: `TypeError: Reduce of empty array with no initial value`. Después volví a poner el valor inicial `0`.

**1. ¿Por qué `reduce` necesita un valor inicial cuando la lista está vacía?**
Sin valor inicial, `reduce` usa el primer elemento como acumulador de partida. En una lista vacía no hay primer elemento y lanza un `TypeError`. Con el valor inicial `0` devuelve `0`.

**2. ¿Qué devuelve `todosAprobados` con una lista vacía? ¿Es lógico?**
Devuelve `true`. `every` es verdadero cuando ningún elemento incumple la condición, y en una lista vacía no hay ninguno que la incumpla. Es lógico matemáticamente, pero puede sorprender: si hiciera falta saber que «hay alumnos y todos aprueban», habría que comprobar también `lista.length > 0`.

**3. ¿Qué diferencia hay entre `map` y `filter`?**
`map` transforma cada elemento y devuelve un array con la misma cantidad de elementos. `filter` se queda solo con los que cumplen una condición, así que el resultado puede ser más corto. En mi código, `aprobados` usa `filter(alumno => alumno.nota >= 5)` y `nombresAprobados` usa `map(alumno => alumno.nombre)` sobre ese resultado.

## Fase 4 · Tabla dinámica con filtro y orden

**1. ¿Por qué `filtrarAlumnos` y `ordenarAlumnos` devuelven copias?**
La lista verdadera es `alumnos`. Filtrar y ordenar solo cambian lo que se ve, así que trabajan con copias y dejan los datos como estaban.

**2. ¿Qué pasaría si `ordenarAlumnos` cambiara la lista original?**
La lista guardada quedaría reordenada cada vez que el usuario cambiase el selector y se perdería el orden original. Los datos y su presentación quedarían mezclados, y otras operaciones, como el resumen o añadir y borrar, trabajarían con una lista distinta de la que esperábamos.

## Fase 5 · Depura con `console.table`

`console.table(alumnos)` muestra la lista como una tabla con una fila por alumno y las columnas `nombre` y `nota`. `console.table(alumnos.map(a => a.nota))` muestra una sola columna con las notas y sus índices.

| Fallo | Qué pasaba | Por qué | Cómo lo arreglé | Herramienta |
|-------|-----------|---------|-----------------|-------------|
| 1 | Salía `[1, 10, 5, 9]` en vez de `[1, 5, 9, 10]` | `sort()` sin comparador ordena como texto | `notas.sort((a, b) => a - b)` | `console.log` |
| 2 | `alumnos` aparecía ordenado | `const copia = alumnos` no copia, solo referencia el mismo array | `const copia = [...alumnos]` | `console.table` |
| 3 | `suma([])` lanzaba un `TypeError` | `reduce` sin valor inicial falla en una lista vacía | `notas.reduce((a, b) => a + b, 0)` | Mensaje de la consola |
| 4 | Daba el error `Cannot read properties of undefined (reading 'nombre')` | `i <= alumnos.length` hace una vuelta de más y `alumnos[i]` es `undefined` | `i < alumnos.length` | Mensaje de la consola |