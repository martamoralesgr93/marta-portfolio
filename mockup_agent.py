"""
Portfolio Mockup Agent — Marta Morales Product Designer
========================================================
Transforma las imágenes crudas de cada carpeta de proyecto en mockups
profesionales con:
  - Marco de browser (desktop) o teléfono (mobile)
  - Fondo con degradado de color por proyecto
  - Renombrado con convención clara: [proyecto]-[nn]-[fase]-[dispositivo].png
  - Guía MOCKUP_GUIDE.md en cada carpeta de salida

Uso:
  python3 mockup_agent.py

Salida:
  [carpeta_proyecto]/mockups/  — imágenes procesadas
  [carpeta_proyecto]/mockups/MOCKUP_GUIDE.md  — documentación
"""

from PIL import Image, ImageDraw, ImageFilter, ImageFont
import os
import shutil
import json
from datetime import datetime

# ─── CONFIGURACIÓN ──────────────────────────────────────────────────────────

BASE = "/sessions/funny-amazing-brown/mnt/Marta Morales — Product Designer_files"

PROJECTS = {
    "Booking Engine & Funnel UX": {
        "slug": "booking",
        "gradient": ((15, 23, 42), (30, 58, 138)),      # azul marino profundo
        "description": "Motor de reservas y funnel UX para ILUNION Hotels",
        "images": {
            "motor-antes-desk.png":             ("01", "motor-antes",     "desk"),
            "motor-antes-mobile.png":           ("02", "motor-antes",     "mobile"),
            "exp-destinos-desk.png":            ("03", "exp-destinos",    "desk"),
            "ilunion-exp-popup-destinos1.png":  ("04", "popup-destinos",  "desk"),
            "ilunion-exp-popup-destinos2.png":  ("05", "popup-destinos2", "desk"),
            "compo-result-desk.png":            ("06", "resultado",       "desk"),
            "compo-result-mobile.png":          ("07", "resultado",       "mobile"),
            "ilunion-mano.png":                 ("08", "handoff",         "comp"),
            # Ignoramos el duplicado "(2)" — se documenta en la guía
        },
        "skip": ["compo-result-desk (2).png"],
    },
    "CRO-carrito-abandonado": {
        "slug": "cro-cart",
        "gradient": ((20, 14, 38), (76, 29, 149)),       # morado oscuro
        "description": "Experimento CRO de recuperación de carrito abandonado",
        "images": {
            "carrito-abandonado-desk.png": ("01", "carrito-abandonado", "desk"),
            "exp-carrito-abandonado.png":  ("02", "carrito-abandonado", "mobile"),
        },
        "skip": [],
    },
    "EdTech Management Platform": {
        "slug": "edtech",
        "gradient": ((10, 25, 47), (12, 74, 110)),       # azul teal oscuro
        "description": "Plataforma de gestión académica CEF·UDIMA",
        "images": {
            "wire-desk-calendar.png":    ("01", "wireframe-calendario", "desk"),
            "wire-mobile-calendr.png":   ("02", "wireframe-calendario", "mobile"),
            "entrar-cef-user-desk.png":  ("03", "login",               "desk"),
            "entrar-cef-user.png":       ("04", "login",               "mobile"),
            "log-cef-mobile.png":        ("05", "login-alt",           "mobile"),
            "login-cef-pago-desk.png":   ("06", "pago",                "desk"),
            "pasarela-pago-cef.png":     ("07", "pasarela",            "desk"),
            "paserela-cef-mobile.png":   ("08", "pasarela",            "mobile"),
            "academic-1.png":            ("09", "academic",            "desk"),
            "calendar.png":              ("10", "calendario-detalle",  "desk"),
            "pasa.png":                  ("11", "pago-alt",            "desk"),
        },
        "skip": [],
    },
    "Growth Strategy & Conversion": {
        "slug": "growth",
        "gradient": ((10, 35, 30), (6, 78, 59)),         # verde oscuro
        "description": "Estrategia de crecimiento y conversión — ofertas y fidelización",
        "images": {
            "wire-home-desk-compo-ilu.png":   ("01", "wireframe-home",    "desk"),
            "wire-home-mobile-compo-ilu.png": ("02", "wireframe-home",    "mobile"),
            "offers-1.png":                   ("03", "ofertas-01",        "desk"),
            "offers-2.png":                   ("04", "ofertas-02",        "desk"),
            "ofertas-loyarlty-antes.png":     ("05", "loyalty-antes",     "mobile"),
            "ofertas-antes-mobile.png":       ("06", "ofertas-antes",     "mobile"),
            "ilunion-tarjeta.png":            ("07", "tarjeta-fidelidad", "comp"),
        },
        "skip": [],
    },
}

# ─── DIMENSIONES OUTPUT ──────────────────────────────────────────────────────

DESKTOP_OUTPUT_W = 2400
DESKTOP_OUTPUT_H = 1500
MOBILE_OUTPUT_W  = 900
MOBILE_OUTPUT_H  = 1700
COMP_OUTPUT_W    = 1800
COMP_OUTPUT_H    = 1400

# ─── COLORES UI ─────────────────────────────────────────────────────────────

BROWSER_BAR_H    = 52
BROWSER_BTN_R    = 9
BROWSER_BG       = (28, 28, 30)
BROWSER_URL_BG   = (44, 44, 46)
BROWSER_DOT_RED  = (255, 95, 86)
BROWSER_DOT_YEL  = (255, 189, 46)
BROWSER_DOT_GRN  = (39, 201, 63)

PHONE_CORNER_R   = 44
PHONE_FRAME_W    = 18
PHONE_BG         = (20, 20, 22)
PHONE_NOTCH_W    = 120
PHONE_NOTCH_H    = 28
PHONE_HOME_R     = 22

SHADOW_BLUR      = 28
SHADOW_OFFSET    = (0, 16)
SHADOW_COLOR     = (0, 0, 0, 160)


# ─── HELPERS ─────────────────────────────────────────────────────────────────

def make_gradient(width, height, c1, c2):
    """Degradado vertical de c1 (arriba) a c2 (abajo)."""
    img = Image.new("RGB", (width, height))
    draw = ImageDraw.Draw(img)
    for y in range(height):
        t = y / height
        r = int(c1[0] + (c2[0] - c1[0]) * t)
        g = int(c1[1] + (c2[1] - c1[1]) * t)
        b = int(c1[2] + (c2[2] - c1[2]) * t)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    return img


def add_shadow(img, blur=SHADOW_BLUR, offset=SHADOW_OFFSET, color=SHADOW_COLOR):
    """Añade sombra debajo de una imagen RGBA."""
    shadow = Image.new("RGBA", img.size, (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_draw.rectangle([0, 0, img.width, img.height], fill=color)
    shadow = shadow.filter(ImageFilter.GaussianBlur(blur))
    result = Image.new("RGBA", (img.width + abs(offset[0]) + blur * 2,
                                 img.height + abs(offset[1]) + blur * 2), (0, 0, 0, 0))
    result.paste(shadow, (blur + max(offset[0], 0), blur + max(offset[1], 0)))
    result.paste(img, (blur + max(-offset[0], 0), blur + max(-offset[1], 0)), img)
    return result


def rounded_mask(width, height, radius):
    """Máscara con esquinas redondeadas."""
    mask = Image.new("L", (width, height), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle([0, 0, width - 1, height - 1], radius=radius, fill=255)
    return mask


def add_browser_frame(ui_img):
    """Encuadra ui_img en un chrome de browser minimalista."""
    w, h = ui_img.size
    frame_w = w
    frame_h = h + BROWSER_BAR_H

    frame = Image.new("RGBA", (frame_w, frame_h), BROWSER_BG + (255,))
    draw = ImageDraw.Draw(frame)

    # Barra del browser
    draw.rectangle([0, 0, frame_w, BROWSER_BAR_H], fill=BROWSER_BG + (255,))

    # Botones semáforo
    bx, by = 20, BROWSER_BAR_H // 2
    for i, color in enumerate([BROWSER_DOT_RED, BROWSER_DOT_YEL, BROWSER_DOT_GRN]):
        cx = bx + i * (BROWSER_BTN_R * 2 + 7)
        draw.ellipse([cx - BROWSER_BTN_R, by - BROWSER_BTN_R,
                      cx + BROWSER_BTN_R, by + BROWSER_BTN_R], fill=color + (255,))

    # Barra URL
    url_x, url_y = 96, 10
    url_w, url_h = frame_w - 120, BROWSER_BAR_H - 20
    draw.rounded_rectangle([url_x, url_y, url_x + url_w, url_y + url_h],
                            radius=6, fill=BROWSER_URL_BG + (255,))

    # Pegar UI
    ui_rgba = ui_img.convert("RGBA")
    frame.paste(ui_rgba, (0, BROWSER_BAR_H))

    # Esquinas redondeadas en frame completo
    mask = rounded_mask(frame_w, frame_h, 12)
    frame.putalpha(mask)
    return frame


def add_phone_frame(ui_img):
    """Encuadra ui_img en un marco de teléfono minimalista."""
    ui_w, ui_h = ui_img.size
    fw = ui_w + PHONE_FRAME_W * 2
    fh = ui_h + PHONE_FRAME_W * 2 + PHONE_NOTCH_H + 20  # +20 home area

    frame = Image.new("RGBA", (fw, fh), PHONE_BG + (255,))
    draw = ImageDraw.Draw(frame)

    # Cuerpo del teléfono
    draw.rounded_rectangle([0, 0, fw - 1, fh - 1],
                            radius=PHONE_CORNER_R, fill=PHONE_BG + (255,))

    # Pantalla (recorte interior)
    sx, sy = PHONE_FRAME_W, PHONE_FRAME_W + PHONE_NOTCH_H
    screen_mask = rounded_mask(ui_w, ui_h, 6)
    ui_rgba = ui_img.convert("RGBA")
    frame.paste(ui_rgba, (sx, sy), screen_mask)

    # Notch
    nx = (fw - PHONE_NOTCH_W) // 2
    ny = PHONE_FRAME_W
    draw.rounded_rectangle([nx, ny, nx + PHONE_NOTCH_W, ny + PHONE_NOTCH_H],
                            radius=12, fill=PHONE_BG + (255,))

    # Botón home (círculo en parte inferior)
    hx, hy = fw // 2, fh - PHONE_FRAME_W - PHONE_HOME_R - 4
    draw.ellipse([hx - PHONE_HOME_R, hy - PHONE_HOME_R,
                  hx + PHONE_HOME_R, hy + PHONE_HOME_R],
                 outline=(60, 60, 65, 255), width=2)

    # Máscara exterior redondeada
    outer_mask = rounded_mask(fw, fh, PHONE_CORNER_R)
    frame.putalpha(outer_mask)
    return frame


def fit_ui_to_canvas(ui_img, canvas_w, canvas_h, max_fraction=0.82):
    """Escala la UI para que quepa en max_fraction del canvas, sin distorsión."""
    max_w = int(canvas_w * max_fraction)
    max_h = int(canvas_h * max_fraction)
    ui_img.thumbnail((max_w, max_h), Image.LANCZOS)
    return ui_img


def compose_on_gradient(framed_img, canvas_w, canvas_h, gradient_colors):
    """Pega framed_img (RGBA) centrado sobre un canvas con degradado."""
    bg = make_gradient(canvas_w, canvas_h, gradient_colors[0], gradient_colors[1])

    # Sombra
    shadowed = add_shadow(framed_img)

    # Centrar
    x = (canvas_w - shadowed.width) // 2
    y = (canvas_h - shadowed.height) // 2

    bg = bg.convert("RGBA")
    bg.paste(shadowed, (x, y), shadowed)
    return bg.convert("RGB")


def process_image(src_path, device_type, canvas_w, canvas_h, gradient_colors):
    """Pipeline completo: cargar → frame → sombra → canvas."""
    img = Image.open(src_path).convert("RGBA")

    if device_type == "desk":
        img = fit_ui_to_canvas(img, canvas_w - 200, canvas_h - 200)
        framed = add_browser_frame(img)
        framed = fit_ui_to_canvas(framed, canvas_w - 100, canvas_h - 100)
    elif device_type == "mobile":
        img = fit_ui_to_canvas(img, canvas_w - 120, canvas_h - 200)
        framed = add_phone_frame(img)
        framed = fit_ui_to_canvas(framed, canvas_w - 80, canvas_h - 120)
    else:  # comp / compositional — solo sombra suave, sin frame de dispositivo
        img = fit_ui_to_canvas(img, canvas_w - 200, canvas_h - 200)
        mask = rounded_mask(img.width, img.height, 16)
        img.putalpha(mask)
        framed = img

    return compose_on_gradient(framed, canvas_w, canvas_h, gradient_colors)


# ─── MOTOR PRINCIPAL ─────────────────────────────────────────────────────────

def run_agent():
    log = []
    summary = {"total": 0, "processed": 0, "skipped": 0, "errors": []}

    print("\n" + "═" * 64)
    print("  Portfolio Mockup Agent — Marta Morales")
    print("═" * 64)

    for folder_name, config in PROJECTS.items():
        folder_path = os.path.join(BASE, folder_name)
        out_dir = os.path.join(folder_path, "mockups")
        os.makedirs(out_dir, exist_ok=True)

        slug     = config["slug"]
        gradient = config["gradient"]
        mapping  = config["images"]
        skip_set = set(config.get("skip", []))

        print(f"\n📁  {folder_name}")
        project_log = []

        for original_name, (number, phase, device) in mapping.items():
            src = os.path.join(folder_path, original_name)
            summary["total"] += 1

            if not os.path.exists(src):
                msg = f"  ⚠  No encontrado: {original_name}"
                print(msg)
                summary["errors"].append({"file": original_name, "reason": "not found"})
                continue

            # Dimensiones según dispositivo
            if device == "desk":
                cw, ch = DESKTOP_OUTPUT_W, DESKTOP_OUTPUT_H
            elif device == "mobile":
                cw, ch = MOBILE_OUTPUT_W, MOBILE_OUTPUT_H
            else:
                cw, ch = COMP_OUTPUT_W, COMP_OUTPUT_H

            new_name = f"{slug}-{number}-{phase}-{device}.png"
            dst = os.path.join(out_dir, new_name)

            try:
                result = process_image(src, device, cw, ch, gradient)
                result.save(dst, "PNG", optimize=True)
                size_kb = os.path.getsize(dst) // 1024
                print(f"  ✓  {original_name:45s} → {new_name}  ({size_kb} KB)")
                project_log.append({
                    "original":    original_name,
                    "new_name":    new_name,
                    "device":      device,
                    "dimensions":  f"{cw}×{ch}",
                    "size_kb":     size_kb,
                    "phase":       phase,
                })
                summary["processed"] += 1
            except Exception as e:
                print(f"  ✗  Error en {original_name}: {e}")
                summary["errors"].append({"file": original_name, "reason": str(e)})

        # Archivos ignorados
        for skip_name in skip_set:
            print(f"  ○  Saltado (duplicado): {skip_name}")
            summary["skipped"] += 1

        # Guardar guía del proyecto
        write_guide(out_dir, folder_name, config, project_log)
        log.append({"project": folder_name, "images": project_log})

    # Guardar log JSON
    log_path = os.path.join(BASE, "mockup_agent_log.json")
    with open(log_path, "w", encoding="utf-8") as f:
        json.dump({"run_at": datetime.now().isoformat(), "projects": log,
                   "summary": summary}, f, indent=2, ensure_ascii=False)

    print("\n" + "─" * 64)
    print(f"  ✅  Procesadas : {summary['processed']} imágenes")
    print(f"  ○   Saltadas   : {summary['skipped']} duplicados")
    if summary["errors"]:
        print(f"  ⚠   Errores    : {len(summary['errors'])}")
    print(f"  📄  Log        : mockup_agent_log.json")
    print("─" * 64 + "\n")
    return summary


# ─── GENERADOR DE GUÍA MARKDOWN ──────────────────────────────────────────────

def write_guide(out_dir, folder_name, config, project_log):
    slug        = config["slug"]
    description = config["description"]
    lines = [
        f"# MOCKUP GUIDE — {folder_name}",
        f"> {description}",
        "",
        f"Generado por **Portfolio Mockup Agent** el {datetime.now().strftime('%Y-%m-%d %H:%M')}",
        "",
        "---",
        "",
        "## Convención de nombres",
        "",
        "```",
        f"{slug}-[nn]-[fase]-[dispositivo].png",
        "```",
        "",
        "| Campo       | Valores posibles              | Descripción                           |",
        "|-------------|-------------------------------|---------------------------------------|",
        f"| `{slug}`    | fijo                          | Slug único del proyecto               |",
        "| `nn`        | 01, 02, 03…                   | Orden narrativo dentro del case study |",
        "| `fase`      | ver tabla de imágenes abajo   | Pantalla o etapa del flujo            |",
        "| `dispositivo` | `desk` · `mobile` · `comp`  | Tipo de dispositivo o composición     |",
        "",
        "---",
        "",
        "## Imágenes generadas",
        "",
        "| # | Nombre original | Nuevo nombre | Dispositivo | Dimensiones | Tamaño |",
        "|---|-----------------|--------------|-------------|-------------|--------|",
    ]

    for entry in project_log:
        lines.append(
            f"| {entry['phase'][:2] if entry['phase'][:2].isdigit() else '—'} "
            f"| `{entry['original']}` "
            f"| `{entry['new_name']}` "
            f"| {entry['device']} "
            f"| {entry['dimensions']} "
            f"| {entry['size_kb']} KB |"
        )

    lines += [
        "",
        "---",
        "",
        "## Tratamiento visual aplicado",
        "",
        "### Desktop (`desk`)",
        "- **Marco**: Chrome de browser minimalista con barra de URL y botones semáforo",
        "- **Fondo**: Degradado vertical oscuro (color del proyecto)",
        "- **Sombra**: Difuminado gaussiano con desplazamiento vertical",
        "- **Canvas**: 2400 × 1500 px",
        "",
        "### Mobile (`mobile`)",
        "- **Marco**: Carcasa de teléfono con notch, esquinas redondeadas y botón home",
        "- **Fondo**: Degradado vertical oscuro (color del proyecto)",
        "- **Sombra**: Difuminado gaussiano con desplazamiento vertical",
        "- **Canvas**: 900 × 1700 px",
        "",
        "### Composición (`comp`)",
        "- **Marco**: Ninguno — imagen con esquinas suavemente redondeadas",
        "- **Fondo**: Degradado vertical oscuro (color del proyecto)",
        "- **Canvas**: 1800 × 1400 px",
        "",
        "---",
        "",
        "## Integración en el portafolio",
        "",
        "Ordena las imágenes en el case study según el número `nn` para mantener",
        "la progresión narrativa: problema → wireframe → solución → resultado.",
        "",
        "Los pares `desk` + `mobile` del mismo número deben mostrarse juntos",
        "para evidenciar el diseño responsive.",
        "",
    ]

    guide_path = os.path.join(out_dir, "MOCKUP_GUIDE.md")
    with open(guide_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))


# ─── ENTRY POINT ─────────────────────────────────────────────────────────────

if __name__ == "__main__":
    run_agent()
