# Cheat Sheet - Taller Git y GitHub: Biblioteca de Fábulas

Bienvenido/a al taller práctico de Git y GitHub.

En este ejercicio vamos a usar una metáfora sencilla:

> Git nos ayuda a contar la historia de un trabajo, guardando momentos importantes como si fueran fotografías.  
> GitHub nos ayuda a compartir esa historia con otras personas en una biblioteca común.

Durante el taller vamos a crear una fábula, guardar sus versiones con Git y luego publicarla en un repositorio compartido en GitHub.

---

## Parte 1 - Git local: contar la historia de mi fábula

En esta primera parte vamos a trabajar en nuestro computador.

La idea es crear una fábula corta y guardar cuatro momentos importantes:

1. Inicio
2. Nudo
3. Desenlace 
4. Moraleja

### 1. Crear la carpeta de trabajo

Primero creamos una carpeta para nuestra fábula.

```bash
mkdir fabula-git
cd fabula-git
```

Esta carpeta será nuestro espacio de trabajo.

### 2. Decirle a Git que vigile esta carpeta

Para empezar a contar nuestra historia, debemos decirle a Git que esta carpeta será un repositorio.

Es decir: desde ahora, Git debe fijarse en los cambios que ocurran aquí.

```bash
git init
git status
```

Este comando nos dice qué archivos han cambiado, cuáles son nuevos y cuáles están listos para guardar.

### 3. Crear el archivo de la fábula

Creamos un archivo llamado `fabula.md`.

Dentro escribimos el inicio de nuestra fábula.

```markdown
# La liebre y el búho

## Inicio

Había una vez una liebre que presumía de ser la más rápida del bosque.
```

### 4. Revisar qué detectó Git

Después de crear el archivo, revisamos el estado:

```bash
git status
```

Git debería mostrar que hay un archivo nuevo llamado `fabula.md`.

En este punto Git ya vio el archivo, pero todavía no lo ha guardado como una versión oficial.

### 5. Preparar el archivo para guardar

Antes de tomar una foto de la historia, debemos decirle a Git qué queremos incluir en esa foto.

```bash
git add fabula.md
```

Este comando prepara el archivo para el próximo guardado.

### 6. Hacer el primer commit: el inicio de la historia

Ahora sí guardamos la primera versión importante de nuestra fábula.

```bash
git commit -m "docs: agregar inicio de la fabula"
```

Un commit es como una fotografía del proyecto en un momento específico.

En este caso, guardamos el inicio de la fábula.

### 7. Agregar el nudo de la fábula

Abrimos nuevamente `fabula.md` y agregamos el nudo.

```markdown
## Nudo

Un día, el búho le propuso una carrera, pero con una condición: la liebre debía detenerse a escuchar a otros animales durante el camino.
```

Luego revisamos qué cambió:

```bash
git status
```

Preparamos el archivo:

```bash
git add fabula.md
```

Y guardamos el segundo momento de la historia:

```bash
git commit -m "docs: agregar nudo de la fabula"
```

### 8. Agregar el desenlace y la moraleja

Ahora completamos la fábula.

```markdown
## Desenlace

La liebre descubrió que correr rápido no servía de mucho si no entendía el camino.

## Moraleja

Antes de avanzar rápido, conviene entender bien hacia dónde se va.
```

Luego hacemos el mismo proceso:

```bash
git status
git add fabula.md
git commit -m "docs: agregar desenlace y moraleja"
```

### 9. Ver la historia de la fábula

Para ver las versiones que hemos guardado, usamos:

```bash
git log --oneline
```

Este comando muestra una lista corta de commits.

Ejemplo:

```text
a1b2c3d docs: agregar desenlace y moraleja
e4f5g6h docs: agregar nudo de la fabula
i7j8k9l docs: agregar inicio de la fabula
```

Cada línea representa una fotografía de nuestra historia.

### 10. Viajar a una versión anterior

Git nos permite visitar versiones pasadas de nuestro trabajo.

Primero copiamos el código de un commit anterior. Por ejemplo:

```text
i7j8k9l
```

Luego usamos:

```bash
git checkout CODIGO_DEL_COMMIT
```

Ejemplo:

```bash
git checkout i7j8k9l
```

Ahora abrimos `fabula.md`.

Deberíamos ver cómo estaba la fábula en ese momento de la historia.

**Importante:**

Esto no borra nada. Solo estamos visitando una versión anterior.

### 11. Volver al presente

Para regresar a la versión actual de la fábula, usamos:

```bash
git switch main
```

Si el computador usa `master` en vez de `main`, usamos:

```bash
git switch master
```

Después de esto, volvemos a la versión más reciente de nuestra fábula.

### 12. ¿Qué pasa si me equivoco?

Ahora vamos a simular un error.

Abrimos `fabula.md` y escribimos algo incorrecto, por ejemplo:

```text
ASDKJASDKJASD TEXTO MAL ESCRITO
```

Luego revisamos el estado:

```bash
git status
```

Si todavía no hemos hecho commit y queremos descartar ese error, usamos:

```bash
git restore fabula.md
```

Este comando devuelve el archivo a la última versión guardada.

Es decir: Git nos ayuda a volver a la última foto buena.

### Resumen de comandos de Git local

| Acción | Comando |
| --- | --- |
| Crear una carpeta | `mkdir fabula-git` |
| Entrar a la carpeta | `cd fabula-git` |
| Iniciar Git | `git init` |
| Ver el estado | `git status` |
| Preparar archivo | `git add fabula.md` |
| Guardar versión | `git commit -m "mensaje"` |
| Ver historial | `git log --oneline` |
| Ver el pasado | `git checkout CODIGO_DEL_COMMIT` |
| Viajar al pasado | `git restore CODIGO_DEL_COMMIT` |
| Volver al presente | `git switch main` |
| Descartar un error no guardado | `git restore fabula.md` |

---

## Parte 2 - GitHub: publicar mi fábula en la biblioteca común

En esta segunda parte vamos a trabajar con GitHub.

La idea es que cada persona agregue su fábula a una biblioteca compartida.

GitHub será como una biblioteca en internet donde quedarán publicadas todas las fábulas del grupo.

### 1. Clonar el repositorio central

Se compartirá una URL del repositorio.

Ejemplo:

```text
https://github.com/usuario/biblioteca-fabulas.git
```

Para traer esa biblioteca a nuestro computador, usamos:

```bash
git clone URL_DEL_REPOSITORIO
```

Ejemplo:

```bash
git clone https://github.com/usuario/biblioteca-fabulas.git
```

Luego entramos a la carpeta:

```bash
cd biblioteca-fabulas
```

Clonar significa traer una copia de la biblioteca de GitHub a mi computador.

### 2. Ubicar la carpeta de fábulas

Dentro del repositorio encontraremos una carpeta llamada `fabulas/`.

Ahí es donde cada persona debe agregar su archivo.

La regla es simple:

Cada persona crea un solo archivo con su nombre y apellido.

Ejemplos:

- `fabulas/fulanito-gomez.md`
- `fabulas/juan-perez.md`
- `fabulas/harry-potter.md`
- `fabulas/sergio-roa.md`

### 3. Crear mi archivo de fábula

Creamos un archivo dentro de `fabulas/`.

Ejemplo:

```text
fabulas/sergio-roa.md
```

El contenido puede ser algo así:

```markdown
# La liebre y el búho

**Autor:** Juanito Alcachofa  
**Fecha:** Mayo 2026

---

## Inicio

Había una vez una liebre que presumía de ser la más rápida del bosque.

## Nudo

Un día, el búho le propuso una carrera, pero con una condición: la liebre debía detenerse a escuchar a otros animales durante el camino.

## Desenlace

La liebre descubrió que correr rápido no servía de mucho si no entendía el camino.

## Moraleja

Antes de avanzar rápido, conviene entender bien hacia dónde se va.
```

### 4. Revisar qué cambió

Después de crear nuestro archivo, revisamos el estado:

```bash
git status
```

Git debería mostrar que hay un archivo nuevo dentro de `fabulas/`.

### 5. Preparar mi archivo

Ahora preparamos nuestro archivo para guardarlo:

```bash
git add fabulas/nombre-apellido.md
```

Ejemplo:

```bash
git add fabulas/sergio-roa.md
```

### 6. Hacer commit de mi fábula

Guardamos el cambio con un mensaje claro:

```bash
git commit -m "docs: agregar fabula de Nombre Apellido"
```

Ejemplo:

```bash
git commit -m "docs: agregar fabula de Sergio Roa"
```

Este commit representa mi aporte a la biblioteca común.

### 7. Traer cambios nuevos antes de subir

Como varias personas están trabajando sobre la misma biblioteca, es posible que alguien haya subido su fábula antes que nosotros.

Antes de publicar nuestro cambio, traemos lo más reciente de GitHub:

```bash
git pull --rebase
```

Este comando significa: traer los cambios nuevos de GitHub y luego poner mi commit encima, para que la historia quede ordenada.

### 8. Subir mi fábula a GitHub

Ahora publicamos nuestro aporte:

```bash
git push
```

Después de esto, nuestra fábula debería aparecer en GitHub.

### 9. ¿Qué pasa si GitHub no me deja subir?

A veces puede aparecer un mensaje como:

```text
Updates were rejected
```

o:

```text
fetch first
```

Esto no significa que dañamos algo.

Significa que alguien publicó cambios antes que nosotros. Primero debemos traer esos cambios y luego volver a subir.

La solución es:

```bash
git pull --rebase
git push
```

### 10. Ver la biblioteca actualizada

Después del push, podemos abrir el repositorio en GitHub y revisar la carpeta `fabulas/`.

Ahí debería aparecer nuestro archivo.

Además, el sitio de la biblioteca se actualizará automáticamente para mostrar nuestra fábula como una tarjeta o módulo visual.

### Reglas importantes del ejercicio

Para que todo salga bien durante la clase:

**Regla 1:** Cada persona debe crear solo su propio archivo dentro de `fabulas/`.

Ejemplo:

```text
fabulas/nombre-apellido.md
```

**Regla 2:** No modificar archivos de otras personas.

**Regla 3:** No modificar manualmente `data/catalogo.json`.

Ese archivo se actualiza automáticamente.

**Regla 4:** Antes de hacer push, usar:

```bash
git pull --rebase
```

**Regla 5:** Si el push falla, repetir:

```bash
git pull --rebase
git push
```

### Resumen de comandos de GitHub

| Acción | Comando |
| --- | --- |
| Clonar biblioteca | `git clone URL_DEL_REPOSITORIO` |
| Entrar a la carpeta | `cd biblioteca-fabulas` |
| Ver cambios | `git status` |
| Preparar mi fábula | `git add fabulas/nombre-apellido.md` |
| Guardar mi aporte | `git commit -m "docs: agregar fabula de Nombre Apellido"` |
| Traer cambios recientes | `git pull --rebase` |
| Subir mi aporte | `git push` |

### Flujo completo para publicar mi fábula

```bash
git clone URL_DEL_REPOSITORIO
cd biblioteca-fabulas

# Crear mi archivo dentro de fabulas/
# Ejemplo: fabulas/sergio-roa.md

git status
git add fabulas/sergio-roa.md
git commit -m "docs: agregar fabula de Sergio Roa"
git pull --rebase
git push
```

### Frase para recordar

Git guarda la historia de mi trabajo.
GitHub comparte esa historia con mi equipo.