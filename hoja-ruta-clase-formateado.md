# 📚 Biblioteca de Fábulas — Guía de Clase Git y GitHub

---

## 🌱 Parte 1 — Git local: la máquina del tiempo

⏱️ **Duración:** 25 minutos

> Cada persona trabaja en su computador, en una carpeta propia.

### 📝 Ejercicio 1: Crear la carpeta de la fábula

```bash
mkdir fabula-git
cd fabula-git
```

**Crear archivo:**

```bash
notepad fabula.md
```

O si usan VS Code:

```bash
code fabula.md
```

**Contenido inicial:**

```markdown
# La liebre y el búho

## Inicio

Había una vez una liebre que presumía de ser la más rápida del bosque.
```

Luego inicializan Git:

```bash
git init
git status
```

💡 **Explicación sencilla:**

> "Acabamos de decirle a Git: desde ahora, vigile esta carpeta."

---

### 📝 Ejercicio 2: Primer commit — Inicio

```bash
git add fabula.md
git commit -m "docs: agregar inicio de la fabula"
```

💡 **Explicación:**

> "Este commit es la primera foto de nuestra historia."

---

### 📝 Ejercicio 3: Segundo commit — Nudo

**Editan el archivo:**

```markdown
## Nudo

Un día, el búho le propuso una carrera, pero con una condición: la liebre debía detenerse a escuchar a otros animales durante el camino.
```

Luego:

```bash
git status
git add fabula.md
git commit -m "docs: agregar nudo de la fabula"
```

---

### 📝 Ejercicio 4: Tercer commit — Desenlace y moraleja

**Editan:**

```markdown
## Desenlace

La liebre descubrió que correr rápido no servía de mucho si no entendía el camino.

## Moraleja

Antes de avanzar rápido, conviene entender bien hacia dónde se va.
```

Luego:

```bash
git add fabula.md
git commit -m "docs: agregar desenlace y moraleja"
```

---

### 📝 Ejercicio 5: Ver la historia

```bash
git log --oneline
```

**Aquí paras y haces que todos miren su historial.**

💡 **Explicas:**

> "Cada línea es una versión guardada. No tenemos tres archivos diferentes; tenemos una sola historia con tres momentos importantes."

---

### 📝 Ejercicio 6: Viajar al pasado

Toman el código del primer commit y hacen:

```bash
git checkout CODIGO_DEL_COMMIT
```

**Abren fabula.md.** Ahí deberían ver solo el inicio.

Luego vuelven al presente:

```bash
git switch main
```

O, si a alguien Git le creó la rama como `master`:

```bash
git switch master
```

💡 **Explicación:**

> "No borramos nada. Solo visitamos una versión anterior de la historia. Git nos deja viajar al pasado y regresar al presente."

ℹ️ **Nota:** Aquí puedes decirles que este estado se llama **"modo visitante"** o **"modo museo"**, para no meter todavía el concepto técnico de _detached HEAD_.

---

## 🚀 Parte 2 — GitHub: biblioteca compartida

⏱️ **Duración:** 25 minutos

> Aquí tú haces primero una demo creando el repositorio central.

### 📋 Repositorio central sugerido

**Nombre:**

```
biblioteca-fabulas
```

**Estructura:**

```
biblioteca-fabulas/
├── index.html
├── styles.css
├── app.js
├── README.md
└── fabulas/
    └── ejemplo-profesor.md
```

✨ **Nota importante:** La idea del front "bien gamín" está buenísima porque les da recompensa visual inmediata. No solo suben un archivo: **ven su fábula aparecer como una tarjeta/módulo en la biblioteca**.

---

### 🔄 Flujo de GitHub sin ramas

**La regla para esta primera clase:**

> Todos trabajamos directamente sobre `main`, pero cada persona toca **solo su propio archivo**.
>
> Eso evita conflictos en la mayoría de casos.

**Cada persona crea:**

```
fabulas/nombre-apellido.md
```

**Ejemplos:**

- `fabulas/ana-gomez.md`
- `fabulas/carlos-perez.md`
- `fabulas/laura-martinez.md`
- `fabulas/sergio-roa.md`

---

### 📝 Ejercicio GitHub 1: Clonar la biblioteca

Tú muestras el repo en GitHub y copian la URL.

```bash
git clone URL_DEL_REPOSITORIO
cd biblioteca-fabulas
```

💡 **Explicación:**

> "Clonar es traer una copia de la biblioteca a mi computador."

---

### 📝 Ejercicio GitHub 2: Agregar mi fábula consolidada

Cada persona copia su fábula final local y la pega en un nuevo archivo dentro de `fabulas/`.

**Ejemplo:** `fabulas/sergio-roa.md`

```markdown
# La liebre y el búho

## Inicio

Había una vez una liebre que presumía de ser la más rápida del bosque.

## Nudo

Un día, el búho le propuso una carrera, pero con una condición: la liebre debía detenerse a escuchar a otros animales durante el camino.

## Desenlace

La liebre descubrió que correr rápido no servía de mucho si no entendía el camino.

## Moraleja

Antes de avanzar rápido, conviene entender bien hacia dónde se va.
```

Luego:

```bash
git status
git add fabulas/sergio-roa.md
git commit -m "docs: agregar fabula de Sergio Roa"
```

---

### 📝 Ejercicio GitHub 3: Traer cambios antes de subir

Como todos están trabajando sobre el mismo repo, antes de subir cada persona debería hacer:

```bash
git pull
```

💡 **Explicación sencilla:**

> "Antes de subir mi aporte, reviso si alguien más ya publicó algo nuevo en la biblioteca."

> ℹ️ Como cada quien toca un archivo distinto, normalmente **no debería haber conflicto**.

---

### 📝 Ejercicio GitHub 4: Subir mi fábula

```bash
git push
```

💡 **Explicación:**

> "Push es publicar mi cambio en GitHub."

Luego refrescan el navegador y ven que aparece un nuevo archivo en la carpeta `fabulas`.

Si el front está armado para leer los archivos, o si tú tienes un listado manual temporal, pueden ver la fábula como tarjeta.

---

### ⚙️ Orden práctico para que no se vuelva caos

Como es primera clase, **no dejarías que 20 personas hagan push al mismo tiempo**.

**Haría esto:**

1. **Todos clonan** 
2. **Todos crean su archivo**
3. **Todos hacen commit local**
4. **Luego vas por filas o grupos:**
   - **Grupo 1** → `git pull` → `git push` → Se refresca GitHub
   - **Grupo 2** → `git pull` → `git push` → Se refresca GitHub

Así reduces errores y además ellos ven cómo **la biblioteca se va llenando en vivo**.

---

### ⚠️ Posible problema: "mi push fue rechazado"

Es muy probable que a alguien le salga algo como:

```
rejected
fetch first
```

**Para público no técnico, no lo explicaría como error grave.** Lo explicarías así:

> "GitHub está diciendo: alguien publicó algo antes que usted. Primero traiga lo nuevo y luego vuelva a subir lo suyo."

**Comandos:**

```bash
git pull
git push
```

> Si cada persona toca solo su archivo, **debería resolverse fácil**.

---

## 📺 Guion final de la clase

### ⏰ **Minuto 0–5** — Presentación de la metáfora

- 🔐 Git guarda la historia
- 🤝 GitHub reúne las historias

### ⏰ **Minuto 5–30** — Trabajo local

```bash
git init
git status
git add
git commit
git log --oneline
git checkout
git switch main
```

**Resultado:** Cada persona tiene una fábula con tres commits.

### ⏰ **Minuto 30–35** — Tú creas el repositorio en GitHub y muestras:

- ✅ Nombre del repo
- ✅ README
- ✅ Carpeta `fabulas`
- ✅ Front de la biblioteca

### ⏰ **Minuto 35–55** — Trabajo remoto

```bash
git clone
git status
git add
git commit
git pull
git push
```

**Resultado:** Cada persona publica su fábula en la biblioteca común.

### ⏰ **Minuto 55–60** — Cierre

> "Hoy aprendimos a guardar versiones y a publicar cambios. En la siguiente clase vamos a aprender a trabajar con caminos alternativos, revisiones y aprobaciones antes de unir cambios: eso se llama **ramas** y **Pull Requests**."

---

## 📌 Comandos mínimos para esta primera clase

**Chuleta / Diapositiva:**

```bash
git init
git status
git add archivo
git commit -m "mensaje"
git log --oneline
git checkout CODIGO_COMMIT
git switch main
git clone URL
git pull
git push
```

**Nada más.** ✨
