"""
Portfolio Mockup Agent v2 — Marta Morales Product Designer
===========================================================
Genera composiciones editoriales estilo Behance/Dribbble:
  - Frame iPhone 15 con Dynamic Island, status bar, home indicator
  - Hero compositions: 2-5 teléfonos rotados en layout scattered
  - Frame browser macOS con traffic lights
  - Sombras multicapa para profundidad real
  - Fondo casi negro con radial glow del color del proyecto
  - Rotaciones para look editorial de portafolio
"""

from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
import os, json, math
from datetime import datetime

BASE = os.path.dirname(os.path.abspath(__file__))

# ── PROYECTOS ──────────────────────────────────────────────────────────────
PROJECTS = {
    "Booking Engine & Funnel UX": {
        "slug": "booking",
        "bg": ((5, 8, 18), (8, 14, 32)),
        "accent": (29, 78, 216),
        "description": "Motor de reservas y funnel UX — ILUNION Hotels",
        "images": {
            "motor-antes-desk.png":            ("01", "motor-antes",    "desk"),
            "motor-antes-mobile.png":          ("02", "motor-antes",    "mobile"),
            "exp-destinos-desk.png":           ("03", "exp-destinos",   "desk"),
            "ilunion-exp-popup-destinos1.png": ("04", "popup-destinos", "desk"),
            "ilunion-exp-popup-destinos2.png": ("05", "popup-dest2",    "desk"),
            "compo-result-desk.png":           ("06", "resultado",      "desk"),
            "compo-result-mobile.png":         ("07", "resultado",      "mobile"),
            "ilunion-mano.png":                ("08", "handoff",        "comp"),
        },
        "skip": ["compo-result-desk (2).png"],
    },
    "CRO-carrito-abandonado": {
        "slug": "cro-cart",
        "bg": ((6, 3, 15), (14, 6, 38)),
        "accent": (109, 40, 217),
        "description": "Experimento CRO recuperación de carrito abandonado",
        "images": {
            "carrito-abandonado-desk.png": ("01", "carrito-desk",   "desk"),
            "exp-carrito-abandonado.png":  ("02", "carrito-mobile", "mobile"),
        },
        "skip": [],
    },
    "EdTech Management Platform": {
        "slug": "edtech",
        "bg": ((4, 10, 20), (6, 24, 44)),
        "accent": (2, 132, 199),
        "description": "Plataforma gestión académica CEF·UDIMA",
        "images": {
            "wire-desk-calendar.png":   ("01", "wire-calendario",   "desk"),
            "wire-mobile-calendr.png":  ("02", "wire-calendario",   "mobile"),
            "entrar-cef-user-desk.png": ("03", "login",             "desk"),
            "entrar-cef-user.png":      ("04", "login",             "mobile"),
            "log-cef-mobile.png":       ("05", "login-alt",         "mobile"),
            "login-cef-pago-desk.png":  ("06", "pago",              "desk"),
            "pasarela-pago-cef.png":    ("07", "pasarela",          "desk"),
            "paserela-cef-mobile.png":  ("08", "pasarela",          "mobile"),
            "academic-1.png":           ("09", "academic",          "desk"),
            "calendar.png":             ("10", "calendario-det",    "desk"),
            "pasa.png":                 ("11", "pago-alt",          "desk"),
        },
        "skip": [],
    },
    "Growth Strategy & Conversion": {
        "slug": "growth",
        "bg": ((3, 10, 8), (6, 22, 16)),
        "accent": (4, 120, 87),
        "description": "Estrategia de crecimiento y conversión",
        "images": {
            "wire-home-desk-compo-ilu.png":   ("01", "wire-home",       "desk"),
            "wire-home-mobile-compo-ilu.png": ("02", "wire-home",       "mobile"),
            "offers-1.png":                   ("03", "ofertas-01",      "desk"),
            "offers-2.png":                   ("04", "ofertas-02",      "desk"),
            "ofertas-loyarlty-antes.png":     ("05", "loyalty-antes",   "mobile"),
            "ofertas-antes-mobile.png":       ("06", "ofertas-antes",   "mobile"),
            "ilunion-tarjeta.png":            ("07", "tarjeta",         "comp"),
        },
        "skip": [],
    },
}

# ── DIMENSIONES ────────────────────────────────────────────────────────────
# Cada pantalla individual
CANVAS_DESK   = (2800, 1700)
CANVAS_MOBILE = (900,  1800)
CANVAS_COMP   = (1800, 1400)
# Hero compositions
CANVAS_HERO_MOBILE = (3400, 1900)
CANVAS_HERO_DESK   = (3400, 1900)

# ── PHONE FRAME (iPhone 15 style) ─────────────────────────────────────────
PH_SCR_W   = 393     # ancho pantalla
PH_SCR_H   = 852     # alto pantalla
PH_BEZEL_S = 12      # bezel lateral
PH_BEZEL_T = 12      # bezel top
PH_BEZEL_B = 12      # bezel bottom
PH_W       = PH_SCR_W + PH_BEZEL_S * 2   # 417
PH_H       = PH_SCR_H + PH_BEZEL_T + PH_BEZEL_B  # 876
PH_CORNER  = 50      # radio esquina exterior
PH_SCR_COR = 40      # radio esquina pantalla
PH_FRAME_C = (18, 18, 20)   # cuerpo casi negro
PH_EDGE_C  = (38, 38, 42)   # canto del teléfono (más claro)

DI_W = 118   # Dynamic Island ancho
DI_H = 33    # Dynamic Island alto
DI_R = 17    # Dynamic Island radio

HOME_W = 128
HOME_H = 5

# ── BROWSER FRAME (macOS style) ────────────────────────────────────────────
BR_BAR_H  = 42
BR_BTN_R  = 8
BR_CORNER = 12
BR_FRAME  = (20, 20, 22)
BR_BAR    = (26, 26, 28)
BR_URL_BG = (38, 38, 42)


# ══════════════════════════════════════════════════════════════════════════
# UTILIDADES
# ══════════════════════════════════════════════════════════════════════════

def rounded_mask(w, h, r):
    m = Image.new("L", (w, h), 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, w-1, h-1], radius=r, fill=255)
    return m


def make_bg(w, h, c1, c2, accent=None):
    """Fondo con degradado vertical + radial glow muy sutil del color accent."""
    img = Image.new("RGB", (w, h))
    draw = ImageDraw.Draw(img)
    for y in range(h):
        t = y / h
        col = tuple(int(c1[i] + (c2[i]-c1[i]) * t) for i in range(3))
        draw.line([(0, y), (w, y)], fill=col)

    if accent:
        glow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
        gd   = ImageDraw.Draw(glow)
        cx, cy = w // 2, h // 2
        max_r  = int(min(w, h) * 0.55)
        steps  = 60
        for i in range(steps, 0, -1):
            r = int(max_r * i / steps)
            a = int(18 * (1 - i / steps))
            gd.ellipse([cx-r, cy-r, cx+r, cy+r],
                       fill=(accent[0], accent[1], accent[2], a))
        img = Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB")
    return img


def drop_shadow(img_rgba, blur=40, offset=(0, 24), alpha=170):
    """Sombra direccional sobre imagen RGBA. Devuelve RGBA."""
    pad = blur * 2
    ow = img_rgba.width  + pad + abs(offset[0])
    oh = img_rgba.height + pad + abs(offset[1])

    shadow = Image.new("RGBA", (ow, oh), (0, 0, 0, 0))
    sd     = ImageDraw.Draw(shadow)
    sx     = pad // 2 + max(offset[0], 0)
    sy     = pad // 2 + max(offset[1], 0)
    # Dibujamos la silueta
    sd.rectangle([sx, sy, sx + img_rgba.width, sy + img_rgba.height],
                 fill=(0, 0, 0, alpha))
    shadow = shadow.filter(ImageFilter.GaussianBlur(blur))

    ix = pad // 2 + max(-offset[0], 0)
    iy = pad // 2 + max(-offset[1], 0)
    result = shadow.copy()
    result.paste(img_rgba, (ix, iy), img_rgba)
    return result


# ══════════════════════════════════════════════════════════════════════════
# PHONE FRAME
# ══════════════════════════════════════════════════════════════════════════

def make_phone(screen_img):
    """
    Envuelve screen_img en un frame iPhone 15 con Dynamic Island.
    Devuelve RGBA.
    """
    scr = screen_img.convert("RGBA").resize((PH_SCR_W, PH_SCR_H), Image.LANCZOS)

    ph = Image.new("RGBA", (PH_W, PH_H), (0, 0, 0, 0))
    d  = ImageDraw.Draw(ph)

    # Cuerpo exterior
    d.rounded_rectangle([0, 0, PH_W-1, PH_H-1],
                        radius=PH_CORNER, fill=PH_FRAME_C + (255,))
    # Borde lateral sutil (más claro)
    d.rounded_rectangle([0, 0, PH_W-1, PH_H-1],
                        radius=PH_CORNER, outline=PH_EDGE_C + (255,), width=2)

    # Área de pantalla (fondo negro)
    sx, sy = PH_BEZEL_S, PH_BEZEL_T
    d.rounded_rectangle([sx, sy, sx + PH_SCR_W - 1, sy + PH_SCR_H - 1],
                        radius=PH_SCR_COR, fill=(0, 0, 0, 255))

    # Contenido de pantalla con máscara redondeada
    scr_mask = rounded_mask(PH_SCR_W, PH_SCR_H, PH_SCR_COR)
    ph.paste(scr, (sx, sy), scr_mask)

    # Dynamic Island
    di_x = sx + (PH_SCR_W - DI_W) // 2
    di_y = sy + 10
    d.rounded_rectangle([di_x, di_y, di_x + DI_W, di_y + DI_H],
                        radius=DI_R, fill=(0, 0, 0, 255))

    # Home indicator
    hi_x = sx + (PH_SCR_W - HOME_W) // 2
    hi_y = sy + PH_SCR_H - 20
    d.rounded_rectangle([hi_x, hi_y, hi_x + HOME_W, hi_y + HOME_H],
                        radius=3, fill=(190, 190, 200, 160))

    # Máscara exterior redondeada final
    outer = rounded_mask(PH_W, PH_H, PH_CORNER)
    ph.putalpha(outer)
    return ph


# ══════════════════════════════════════════════════════════════════════════
# BROWSER FRAME
# ══════════════════════════════════════════════════════════════════════════

def make_browser(screen_img):
    """
    Envuelve screen_img en un frame browser macOS.
    Devuelve RGBA.
    """
    w, h  = screen_img.size
    fh    = h + BR_BAR_H
    frame = Image.new("RGBA", (w, fh), (0, 0, 0, 0))
    d     = ImageDraw.Draw(frame)

    # Cuerpo
    d.rounded_rectangle([0, 0, w-1, fh-1], radius=BR_CORNER, fill=BR_FRAME + (255,))

    # Barra superior
    d.rounded_rectangle([0, 0, w-1, BR_BAR_H + BR_CORNER],
                        radius=BR_CORNER, fill=BR_BAR + (255,))
    d.rectangle([0, BR_CORNER, w, BR_BAR_H], fill=BR_BAR + (255,))

    # Traffic lights
    for i, col in enumerate([(255, 95, 86), (255, 189, 46), (39, 201, 63)]):
        cx = 18 + i * (BR_BTN_R * 2 + 7)
        cy = BR_BAR_H // 2
        d.ellipse([cx-BR_BTN_R, cy-BR_BTN_R, cx+BR_BTN_R, cy+BR_BTN_R],
                  fill=col + (255,))

    # URL bar
    ux, uw = 68, w - 88
    uy, uh = 7, BR_BAR_H - 14
    d.rounded_rectangle([ux, uy, ux+uw, uy+uh], radius=5, fill=BR_URL_BG + (255,))

    # Pantalla
    scr = screen_img.convert("RGBA")
    frame.paste(scr, (0, BR_BAR_H), scr)

    # Máscara exterior
    outer = rounded_mask(w, fh, BR_CORNER)
    frame.putalpha(outer)
    return frame


# ══════════════════════════════════════════════════════════════════════════
# COMPOSICIONES
# ══════════════════════════════════════════════════════════════════════════

# Layouts para N teléfonos — (scale, rot_deg, x_frac, y_frac)
# x/y = posición del centro del teléfono en fracción del canvas
PHONE_LAYOUTS = {
    1: [(0.78,   0, 0.50, 0.50)],
    2: [(0.70, -10, 0.30, 0.52), (0.70,  10, 0.70, 0.52)],
    3: [(0.64, -16, 0.18, 0.54), (0.78,   0, 0.50, 0.49), (0.64,  16, 0.82, 0.54)],
    4: [(0.58, -20, 0.13, 0.56), (0.70, -9, 0.34, 0.51),
        (0.70,   9, 0.66, 0.51), (0.58,  20, 0.87, 0.56)],
    5: [(0.54, -24, 0.09, 0.57), (0.65, -13, 0.27, 0.52),
        (0.76,   0, 0.50, 0.48), (0.65,  13, 0.73, 0.52),
        (0.54,  24, 0.91, 0.57)],
}

DESK_LAYOUTS = {
    1: [(0.82,   0, 0.50, 0.50)],
    2: [(0.72,  -5, 0.30, 0.52), (0.72,   5, 0.70, 0.52)],
    3: [(0.60,  -8, 0.17, 0.54), (0.80,   0, 0.50, 0.49), (0.60,   8, 0.83, 0.54)],
}


def _paste_item(canvas, item_rgba, scale, rot, cx_frac, cy_frac, canvas_w, canvas_h):
    """Escala, rota, añade sombra y pega item_rgba en el canvas RGBA."""
    # Escalar
    target_h = int(canvas_h * scale)
    ratio     = target_h / item_rgba.height
    target_w  = int(item_rgba.width * ratio)
    scaled    = item_rgba.resize((target_w, target_h), Image.LANCZOS)

    # Sombra (antes de rotar para que sea natural)
    shadowed = drop_shadow(scaled, blur=38, offset=(0, 26), alpha=165)

    # Rotar
    if rot != 0:
        shadowed = shadowed.rotate(-rot, expand=True, resample=Image.BICUBIC)

    # Posicionar
    px = int(canvas_w * cx_frac) - shadowed.width  // 2
    py = int(canvas_h * cy_frac) - shadowed.height // 2
    canvas.paste(shadowed, (px, py), shadowed)


def scattered_phones(framed_list, canvas_w, canvas_h, bg_colors, accent):
    """Composición scattered de teléfonos — como reference 1."""
    n       = min(len(framed_list), 5)
    phones  = framed_list[:n]
    layouts = PHONE_LAYOUTS[n]

    bg     = make_bg(canvas_w, canvas_h, bg_colors[0], bg_colors[1], accent)
    canvas = bg.convert("RGBA")

    # Z-order: los extremos primero, el centro al final (encima)
    z_order = sorted(range(n), key=lambda i: -abs(i - n // 2))
    for i in z_order:
        s, r, x, y = layouts[i]
        _paste_item(canvas, phones[i], s, r, x, y, canvas_w, canvas_h)

    return canvas.convert("RGB")


def scattered_screens(framed_list, canvas_w, canvas_h, bg_colors, accent):
    """Composición scattered de pantallas desktop."""
    n       = min(len(framed_list), 3)
    screens = framed_list[:n]
    layouts = DESK_LAYOUTS[n]

    bg     = make_bg(canvas_w, canvas_h, bg_colors[0], bg_colors[1], accent)
    canvas = bg.convert("RGBA")

    z_order = sorted(range(n), key=lambda i: -abs(i - n // 2))
    for i in z_order:
        s, r, x, y = layouts[i]
        _paste_item(canvas, screens[i], s, r, x, y, canvas_w, canvas_h)

    return canvas.convert("RGB")


def single_on_bg(framed, canvas_w, canvas_h, bg_colors, accent):
    """Un único elemento centrado en su canvas."""
    bg     = make_bg(canvas_w, canvas_h, bg_colors[0], bg_colors[1], accent)
    canvas = bg.convert("RGBA")
    _paste_item(canvas, framed, 0.82, 0, 0.50, 0.50, canvas_w, canvas_h)
    return canvas.convert("RGB")


# ══════════════════════════════════════════════════════════════════════════
# AGENTE PRINCIPAL
# ══════════════════════════════════════════════════════════════════════════

def run():
    log = {"run_at": datetime.now().isoformat(), "projects": {},
           "summary": {"processed": 0, "hero_shots": 0, "errors": []}}

    print("\n" + "═" * 66)
    print("  Portfolio Mockup Agent v2 — Marta Morales")
    print("═" * 66)

    for folder_name, cfg in PROJECTS.items():
        folder_path = os.path.join(BASE, folder_name)
        out_dir     = os.path.join(folder_path, "mockups")
        os.makedirs(out_dir, exist_ok=True)

        slug      = cfg["slug"]
        bg_cols   = cfg["bg"]
        accent    = cfg["accent"]
        skip_set  = set(cfg.get("skip", []))

        print(f"\n📁  {folder_name}")

        mobile_frames = []   # (framed_RGBA, phase)
        desk_frames   = []
        proj_log      = []

        for orig_name, (num, phase, device) in cfg["images"].items():
            if orig_name in skip_set:
                print(f"  ○  Saltado: {orig_name}")
                continue

            src = os.path.join(folder_path, orig_name)
            if not os.path.exists(src):
                print(f"  ⚠  No encontrado: {orig_name}")
                log["summary"]["errors"].append({"file": orig_name, "reason": "not found"})
                continue

            try:
                ui       = Image.open(src).convert("RGBA")
                new_name = f"{slug}-{num}-{phase}-{device}.png"
                dst      = os.path.join(out_dir, new_name)

                if device == "mobile":
                    framed = make_phone(ui)
                    comp   = single_on_bg(framed, *CANVAS_MOBILE, bg_cols, accent)
                    mobile_frames.append(framed)

                elif device == "desk":
                    # Escalar para que quepan bien en el browser frame
                    max_w, max_h = 1400, 900
                    ui_copy = ui.copy()
                    ui_copy.thumbnail((max_w, max_h), Image.LANCZOS)
                    framed = make_browser(ui_copy)
                    comp   = single_on_bg(framed, *CANVAS_DESK, bg_cols, accent)
                    desk_frames.append(framed)

                else:  # comp
                    ui_copy = ui.copy()
                    ui_copy.thumbnail((1400, 1000), Image.LANCZOS)
                    mask = rounded_mask(ui_copy.width, ui_copy.height, 20)
                    ui_copy.putalpha(mask)
                    comp = single_on_bg(ui_copy, *CANVAS_COMP, bg_cols, accent)
                    framed = ui_copy  # no va al hero

                comp.save(dst, "PNG", optimize=True)
                kb = os.path.getsize(dst) // 1024
                print(f"  ✓  {orig_name:44s} → {new_name}  ({kb} KB)")
                log["summary"]["processed"] += 1
                proj_log.append({"original": orig_name, "new_name": new_name,
                                 "device": device, "kb": kb})

            except Exception as e:
                import traceback; traceback.print_exc()
                print(f"  ✗  {orig_name}: {e}")
                log["summary"]["errors"].append({"file": orig_name, "reason": str(e)})

        # ── HERO SHOT MOBILE ─────────────────────────────────────────────
        if len(mobile_frames) >= 2:
            try:
                hero_name = f"{slug}-HERO-mobile.png"
                hero_path = os.path.join(out_dir, hero_name)
                cw, ch    = CANVAS_HERO_MOBILE
                hero      = scattered_phones(mobile_frames, cw, ch, bg_cols, accent)
                hero.save(hero_path, "PNG", optimize=True)
                kb        = os.path.getsize(hero_path) // 1024
                print(f"  🌟  Hero mobile → {hero_name}  ({kb} KB)")
                log["summary"]["hero_shots"] += 1
            except Exception as e:
                import traceback; traceback.print_exc()
                print(f"  ✗  Hero mobile: {e}")

        # ── HERO SHOT DESKTOP ────────────────────────────────────────────
        if len(desk_frames) >= 2:
            try:
                hero_name = f"{slug}-HERO-desk.png"
                hero_path = os.path.join(out_dir, hero_name)
                cw, ch    = CANVAS_HERO_DESK
                hero      = scattered_screens(desk_frames[:3], cw, ch, bg_cols, accent)
                hero.save(hero_path, "PNG", optimize=True)
                kb        = os.path.getsize(hero_path) // 1024
                print(f"  🌟  Hero desktop → {hero_name}  ({kb} KB)")
                log["summary"]["hero_shots"] += 1
            except Exception as e:
                import traceback; traceback.print_exc()
                print(f"  ✗  Hero desktop: {e}")

        _write_guide(out_dir, folder_name, cfg, proj_log)
        log["projects"][folder_name] = proj_log

    # Log JSON
    with open(os.path.join(BASE, "mockup_agent_log.json"), "w", encoding="utf-8") as f:
        json.dump(log, f, indent=2, ensure_ascii=False)

    s = log["summary"]
    print(f"\n{'─'*66}")
    print(f"  ✅  Mockups individuales : {s['processed']}")
    print(f"  🌟  Hero compositions   : {s['hero_shots']}")
    if s["errors"]:
        print(f"  ⚠   Errores             : {len(s['errors'])}")
    print(f"{'─'*66}\n")


# ── GUÍA MARKDOWN ──────────────────────────────────────────────────────────

def _write_guide(out_dir, folder_name, cfg, proj_log):
    slug  = cfg["slug"]
    lines = [
        f"# MOCKUP GUIDE — {folder_name}",
        f"\n> {cfg['description']}",
        f"\nGenerado: {datetime.now().strftime('%Y-%m-%d %H:%M')}",
        "\n---\n",
        "## Convención de nombres",
        "```",
        f"{slug}-[nn]-[fase]-[dispositivo].png   ← mockup individual",
        f"{slug}-HERO-mobile.png                 ← composición multi-teléfono",
        f"{slug}-HERO-desk.png                   ← composición multi-pantalla desktop",
        "```",
        "\n## Imágenes generadas",
        "\n| Original | Nuevo nombre | Tipo | Tamaño |",
        "|----------|-------------|------|--------|",
    ]
    for e in proj_log:
        lines.append(f"| `{e['original']}` | `{e['new_name']}` | {e['device']} | {e['kb']} KB |")

    lines += [
        "\n---\n",
        "## Tratamiento visual aplicado",
        "",
        "### `mobile`",
        "- Frame iPhone 15: Dynamic Island, bezels finos (12px), home indicator",
        "- Fondo casi negro con radial glow del color del proyecto",
        "- Sombra multicapa (blur 38px, offset 26px)",
        "- Canvas individual: 900×1800 px",
        "",
        "### `desk`",
        "- Frame browser macOS: traffic lights, URL bar oscura",
        "- Sombra y glow de fondo idénticos",
        "- Canvas individual: 2800×1700 px",
        "",
        "### `comp`",
        "- Sin device frame, esquinas redondeadas (r=20)",
        "- Canvas: 1800×1400 px",
        "",
        "### `HERO`",
        "- Composición editorial con 2-5 pantallas rotadas (±24°)",
        "- Profundidad por z-order: el central encima, los laterales detrás",
        "- Canvas: 3400×1900 px",
        "",
        "## Uso en portafolio",
        "Abre el case study con el HERO shot. Usa los individuales para el detalle.",
        "Para flows responsive, muestra desk + mobile del mismo número juntos.",
    ]
    with open(os.path.join(out_dir, "MOCKUP_GUIDE.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(lines))


if __name__ == "__main__":
    run()
