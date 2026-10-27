"""Genera la imagen de portada con límites locales y valores ficticios.

Requiere geopandas y matplotlib. Ejecutar desde cualquier directorio:
python scripts/generate_mexico_map.py
"""
from pathlib import Path
import csv
import random

import geopandas as gpd
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "Insumos temporales" / "lim_estatal_inegi_2025.shp"
ASSETS = ROOT / "assets"
PALETTE = ["#e0e0e0", "#bcbcbc", "#969696", "#707070", "#454545"]


def main():
    states = gpd.read_file(SOURCE).sort_values("CVE_ENT").copy()
    if len(states) != 32 or states["CVE_ENT"].nunique() != 32:
        raise ValueError("Se esperaban las 32 entidades federativas.")
    rng = random.Random(2026)
    states["valor_ficticio"] = [rng.randint(1, 100) for _ in range(len(states))]
    ASSETS.mkdir(exist_ok=True)
    with (ASSETS / "mexico-valores-ejemplo.csv").open("w", newline="", encoding="utf-8") as output:
        writer = csv.writer(output)
        writer.writerow(["CVE_ENT", "entidad", "valor_ficticio"])
        for _, row in states.iterrows():
            writer.writerow([row["CVE_ENT"], row["NOMGEO"], row["valor_ficticio"]])

    # Proyección cónica para mantener proporciones cartográficas en México.
    projected = states.to_crs("+proj=lcc +lat_1=17.5 +lat_2=29.5 +lat_0=12 +lon_0=-102 +datum=WGS84 +units=m +no_defs")
    projected.geometry = projected.geometry.simplify(350, preserve_topology=True)
    plt.rcParams.update({"font.family": "DejaVu Sans", "svg.fonttype": "none", "svg.hashsalt": "mexico-portfolio"})
    fig = plt.figure(figsize=(5.6, 5.1), facecolor="#f7f7f7")
    ax = fig.add_axes([.025, .09, .95, .80])
    colors = [PALETTE[min((value - 1) // 20, 4)] for value in projected["valor_ficticio"]]
    projected.plot(ax=ax, color=colors, edgecolor="#f7f7f7", linewidth=.55)
    ax.set_axis_off()
    ax.margins(.025)
    fig.text(.93, .935, "N", fontsize=7, color="#707070", ha="center")
    ax.annotate("", xy=(.93, .90), xytext=(.93, .82), xycoords="figure fraction",
                arrowprops={"arrowstyle": "->", "color": "#707070", "linewidth": .7}, annotation_clip=False)
    fig.savefig(ASSETS / "mexico-coropletas.svg", facecolor=fig.get_facecolor(), metadata={"Date": None, "Description": "Mapa de las 32 entidades de México con valores ficticios del 1 al 100 en cinco clases de grises."})
    # Vista de revisión fuera de los archivos que se publicarán.
    import tempfile
    preview = Path(tempfile.gettempdir()) / "portfolio-mexico-preview.png"
    fig.savefig(preview, dpi=180, facecolor=fig.get_facecolor())
    plt.close(fig)
    print(f"Mapa generado: {ASSETS / 'mexico-coropletas.svg'}")
    print(f"Vista de revisión: {preview}")


if __name__ == "__main__":
    main()
