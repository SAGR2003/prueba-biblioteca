#!/usr/bin/env python3
"""
generar_catalogo.py
-------------------
Recorre la carpeta fabulas/, lee cada archivo .md y genera
data/catalogo.json que el frontend usa para construir las tarjetas.

Uso (desde la raíz del proyecto):
    python scripts/generar_catalogo.py
"""

import json
import re
from pathlib import Path

# ===== CONFIGURACIÓN =====
CARPETA_FABULAS  = Path("fabulas")
ARCHIVO_CATALOGO = Path("data") / "catalogo.json"


# ===== EXTRACCIÓN DE CAMPOS =====

def extraer_titulo(lineas: list[str]) -> str:
    """Devuelve el texto del primer encabezado # encontrado."""
    for linea in lineas:
        if linea.startswith("# "):
            return linea[2:].strip()
    return "Sin título"


def extraer_descripcion(lineas: list[str]) -> str:
    """
    Devuelve el primer párrafo de texto plano (no encabezado, no metadata,
    no separador). Recorta a 160 caracteres si es necesario.
    """
    for linea in lineas:
        l = linea.strip()
        # Ignora líneas vacías, encabezados, separadores y líneas de metadata
        if l and not l.startswith("#") and l != "---" and not re.match(r"^\*\*\w+:", l):
            descripcion = re.sub(r"\*+", "", l)  # quita asteriscos de negrita/cursiva
            if len(descripcion) > 160:
                descripcion = descripcion[:157] + "..."
            return descripcion
    return "Una fábula sobre sabiduría y aprendizaje."


def nombre_archivo_a_autor(nombre_archivo: str) -> str:
    """
    Infiere el nombre del autor desde el nombre del archivo.
    Ejemplo: 'sergio-roa.md' → 'Sergio Roa'
    """
    stem = Path(nombre_archivo).stem           # 'sergio-roa'
    palabras = stem.replace("-", " ").replace("_", " ").split()
    return " ".join(p.capitalize() for p in palabras)


def extraer_autor_del_contenido(lineas: list[str]) -> str | None:
    """
    Si el archivo tiene una línea con '**Autor:** Nombre', devuelve ese nombre.
    Devuelve None si no encuentra la línea.
    """
    for linea in lineas:
        match = re.search(r"\*\*Autor:\*\*\s*(.+)", linea)
        if match:
            return match.group(1).strip()
    return None


# ===== PROCESAMIENTO DE CADA FÁBULA =====

def procesar_fabula(ruta: Path) -> dict | None:
    """Lee un .md y retorna el dict con los campos del catálogo."""
    try:
        contenido = ruta.read_text(encoding="utf-8")
    except Exception as e:
        print(f"  ⚠️  No se pudo leer {ruta.name}: {e}")
        return None

    lineas = contenido.splitlines()

    titulo = extraer_titulo(lineas)
    descripcion = extraer_descripcion(lineas)

    # Prioriza el autor declarado en el archivo; si no, lo infiere del nombre
    autor = extraer_autor_del_contenido(lineas) or nombre_archivo_a_autor(ruta.name)

    return {
        "id":          ruta.stem,
        "titulo":      titulo,
        "autor":       autor,
        "descripcion": descripcion,
        "archivo":     f"fabulas/{ruta.name}",
    }


# ===== MAIN =====

def main() -> None:
    print("📚 Generando catálogo de fábulas...\n")

    # Verifica que exista la carpeta de fábulas
    if not CARPETA_FABULAS.exists():
        print(f"❌ No existe la carpeta '{CARPETA_FABULAS}'.")
        print("   Crea al menos un archivo .md dentro de ella y vuelve a ejecutar.")
        return

    # Crea la carpeta data/ si no existe
    ARCHIVO_CATALOGO.parent.mkdir(parents=True, exist_ok=True)

    archivos = sorted(CARPETA_FABULAS.glob("*.md"))

    if not archivos:
        print(f"⚠️  No se encontraron archivos .md en '{CARPETA_FABULAS}/'")
        return

    catalogo = []
    for ruta in archivos:
        print(f"  📄 {ruta.name}")
        entrada = procesar_fabula(ruta)
        if entrada:
            catalogo.append(entrada)

    # Escribe el JSON con formato legible
    ARCHIVO_CATALOGO.write_text(
        json.dumps(catalogo, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )

    print(f"\n✅ Catálogo guardado en: {ARCHIVO_CATALOGO}")
    print(f"   {len(catalogo)} fábula(s) incluidas.")


if __name__ == "__main__":
    main()
