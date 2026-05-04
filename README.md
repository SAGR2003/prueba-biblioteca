# 📚 Biblioteca de Fábulas

Un sitio web estático diseñado para una clase introductoria de **Git y GitHub**.  
Cada estudiante agrega una fábula al repositorio. El sitio la muestra automáticamente.

---

## Estructura del proyecto

```
libreria-de-fabulas/
├── index.html              ← Página principal del sitio
├── styles.css              ← Todos los estilos visuales
├── app.js                  ← Lógica del frontend (tarjetas, modal, buscador)
├── data/
│   └── catalogo.json       ← Índice de fábulas (se regenera automáticamente)
├── fabulas/
│   ├── ejemplo-profesor.md ← Ejemplo del docente
│   └── ana-gomez.md
├── scripts/
│   └── generar_catalogo.py ← Script Python (para correr localmente)
└── .github/
    └── workflows/
        └── actualizar-catalogo.yml  ← GitHub Action: regenera el catálogo en cada push
```

---

## Cómo correr el proyecto localmente

Este proyecto no usa Node ni npm. Solo necesitas Python instalado.

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/libreria-de-fabulas.git
cd libreria-de-fabulas
```

### 2. Inicia el servidor local

```bash
python -m http.server 8000
```

Abre el navegador en: **http://localhost:8000**

> Por qué un servidor local? El navegador bloquea `fetch()` sobre archivos locales
> (`file://`). El servidor de Python resuelve esto sin instalar nada extra.

---

## Cómo agregar tu fábula (flujo para estudiantes)

**Paso 1.** Crea un archivo `.md` dentro de `fabulas/` con tu nombre:

```
fabulas/tu-nombre.md
```

**Paso 2.** Escribe tu fábula con este formato:

```markdown
# Título de tu fábula

**Autor:** Tu Nombre
**Fecha:** Mayo 2026

---

Aquí va el texto de tu fábula...

## Una sección si quieres

Más texto...

**Moraleja:** La lección de tu historia.
```

**Paso 3.** Haz commit y push (¡solo esto!):

```bash
git add fabulas/tu-nombre.md
git commit -m "Agrega fábula de Tu Nombre"
git push
```

> El catálogo se actualiza solo gracias al GitHub Action.
> No necesitas correr ningún script Python.

---

## Cómo regenerar el catálogo manualmente (solo si trabajas en local)

Si quieres ver los cambios antes de hacer push, puedes correr el script Python:

```bash
python scripts/generar_catalogo.py
```

Esto actualiza `data/catalogo.json` localmente para que el servidor de prueba refleje los cambios.

---

## Despliegue en GitHub Pages

1. Sube el proyecto a un repositorio en GitHub.
2. Ve a **Settings → Pages**.
3. En **Source**, elige la rama `main` y carpeta `/` (raíz).
4. Haz clic en **Save**.
5. En unos minutos tu sitio estará en:  
   `https://tu-usuario.github.io/libreria-de-fabulas/`

---

## Formato Markdown soportado

El sitio renderiza un subconjunto de Markdown sin librerías externas:

| Sintaxis       | Resultado   |
|----------------|-------------|
| `# Título`     | Encabezado grande |
| `## Sección`   | Encabezado mediano |
| `### Subsección` | Encabezado pequeño |
| `- ítem`       | Lista con viñetas |
| `**negrita**`  | **negrita** |
| `*cursiva*`    | *cursiva* |
| `---`          | Línea separadora |

---

## Tecnologías usadas

| Tecnología | Uso |
|------------|-----|
| HTML       | Estructura del sitio |
| CSS        | Estilos y animaciones |
| JavaScript | Interactividad y carga dinámica |
| Python     | Script para generar el catálogo |
| JSON       | Formato del catálogo |
| Markdown   | Formato de las fábulas |

---

Hecho con 📚 para una clase de Git y GitHub.
