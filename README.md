# Datos & territorio

Primer diseño de un portafolio en español para estadística, ciencia de datos, análisis espacial, ciencias de la información geográfica y GeoWeb.

Diseño minimalista con una paleta exclusivamente en escala de grises, incluidos los gráficos y el icono.

Sitio estático compatible con GitHub Pages, sin instalación, compilación ni dependencias de JavaScript. Incluye diseño adaptable a móviles, filtros por disciplina, fichas de proyectos, navegación con teclado y gráficos SVG originales con datos sintéticos. Los cuatro proyectos están identificados como ejemplos; no representan trabajos o resultados reales.

## Archivos

- `index.html`: estructura, textos y tarjetas de proyectos.
- `styles.css`: diseño, colores y comportamiento adaptable.
- `script.js`: datos de contacto, fichas de ejemplo, filtros e ilustraciones.
- `assets/favicon.svg`: icono del sitio.
- `.nojekyll`: permite servir los archivos directamente en GitHub Pages.

## Vista previa

Abre `index.html` en tu navegador. También puedes servir la carpeta con Python:

```powershell
python -m http.server 8000
```

Visita `http://localhost:8000`. Detén el servidor con `Ctrl+C`.

Las fuentes DM Sans y Manrope se cargan desde Google Fonts y requieren internet; hay fuentes de sistema como alternativa. El resto del sitio es local.

## Personalización

1. En `script.js`, completa `profile` con tu nombre, correo y enlaces HTTPS de GitHub y LinkedIn. Los campos vacíos no generan enlaces. El nombre personaliza el título de la pestaña; puedes cambiar la marca visible directamente en `index.html`.
2. En `index.html`, reemplaza el texto de «Sobre mí» y la nota de personalización por tu biografía. Actualiza el título y la descripción del documento.
3. Sustituye las cuatro tarjetas de ejemplo en `index.html` y sus fichas en el objeto `projects` de `script.js`. Cada `data-project` debe coincidir con una clave de ese objeto. Añade resultados, fuentes y enlaces reales según corresponda.
4. Los filtros agrupan los proyectos en tres áreas: `datos` (Estadística y Ciencia de Datos), `espacial` (Análisis Espacial y SIG) y `geoweb` (GeoWeb). Asigna el valor correspondiente en `data-categories`; puedes separar varias áreas por espacios si un proyecto pertenece a más de una. Actualiza el contador «04» si cambias el número de proyectos.
5. Cuando todos los proyectos sean reales, retira las etiquetas «EJEMPLO» y los avisos de la ficha. Mantén los avisos en cualquier contenido que siga siendo de muestra.
6. Cambia los colores desde las variables al comienzo de `styles.css`.

## Publicar en GitHub Pages

Sube estos archivos a la raíz de tu repositorio, manteniendo la carpeta `assets`. Para una página personal puedes usar un repositorio llamado `TU-USUARIO.github.io`; también funciona un repositorio de proyecto.

En GitHub, abre **Settings → Pages**, selecciona **Deploy from a branch**, elige tu rama (normalmente `main`) y la carpeta **/ (root)**. Guarda y espera a que GitHub indique la dirección publicada. Todos los recursos usan rutas relativas para funcionar también bajo el nombre de un repositorio.

Esta carpeta todavía no tiene un repositorio Git inicializado. Si necesitas crear uno local, ejecuta desde esta carpeta:

```powershell
git init
git add .
git commit -m "Crea portafolio de datos y territorio"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
git push -u origin main
```

Reemplaza la dirección por la de tu repositorio real antes de ejecutar los dos últimos comandos. Si ya tienes un repositorio, copia los archivos allí y usa tu flujo habitual. No se ha hecho ningún commit ni publicación automáticamente.

## Mapa de portada

`assets/mexico-coropletas.svg` se genera a partir de las 32 entidades de la capa local `Insumos temporales/lim_estatal_inegi_2025.shp` y sus archivos asociados. Se utiliza una proyección cónica y una simplificación de 350 metros para reducir el peso de la imagen web. Los valores son ficticios, con semilla fija, y se guardan en `assets/mexico-valores-ejemplo.csv`. La clasificación usa cinco intervalos de igual amplitud entre 1 y 100. La imagen de portada muestra únicamente el mapa y el indicador del norte, sin título, leyenda ni notas.

Para regenerar el mapa, ejecuta `python scripts/generate_mexico_map.py` con GeoPandas y Matplotlib disponibles. El sitio publicado solo necesita el SVG generado; no necesita Python ni el shapefile. El nombre de la capa identifica el insumo proporcionado y no supone una verificación externa de su procedencia.
