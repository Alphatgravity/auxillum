# =============================================================================
#  OBJETS 3D EN VERRE DISPERSIF — palette Auxillum
#  #2A4E62 bleu pétrole / #FFC9A3 pêche / #FFF2DC crème / #B1BAC7 / #001C2F
#  5 icônes : flamme (logo), bulle de discussion, cœur, étincelle IA, flamme bleue
#
#  Blender 4.x / 5.x — Cycles. Le script vide la scène courante.
#  En ligne de commande :
#    set AUX_RENDER=1 && blender --background --python auxillum_glass_3d.py
# =============================================================================

import bpy
import os
import json
from math import radians, cos, sin, pi
from mathutils import Vector

ICI = os.path.dirname(os.path.abspath(__file__))
SORTIE = os.path.join(ICI, "rendus")

RENDU_AUTO = os.environ.get("AUX_RENDER") == "1"
SAMPLES = int(os.environ.get("AUX_SAMPLES", "256"))
RES_PCT = int(os.environ.get("AUX_RES_PCT", "100"))


def hex_lineaire(h):
    h = h.lstrip('#')
    out = []
    for i in (0, 2, 4):
        c = int(h[i:i + 2], 16) / 255
        out.append(c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4)
    return tuple(out)


PECHE = hex_lineaire("FFC9A3")
CREME = hex_lineaire("FFF2DC")

# -----------------------------------------------------------------------------
# Nettoyage
# -----------------------------------------------------------------------------
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete()
scene = bpy.context.scene


# -----------------------------------------------------------------------------
# Outils de construction
# -----------------------------------------------------------------------------
def arrondi_coins(points, rayon=0.09, seg=6):
    n = len(points)
    out = []
    for i in range(n):
        p = Vector(points[i])
        a = Vector(points[i - 1])
        b = Vector(points[(i + 1) % n])
        v1, v2 = a - p, b - p
        r = min(rayon, v1.length * 0.45, v2.length * 0.45)
        if r < 1e-4:
            out.append((p.x, p.y))
            continue
        p1 = p + v1.normalized() * r
        p2 = p + v2.normalized() * r
        for j in range(seg + 1):
            t = j / seg
            q = (1 - t) ** 2 * p1 + 2 * (1 - t) * t * p + t ** 2 * p2
            out.append((q.x, q.y))
    return out


def cercle(cx, cy, r, n=40):
    return [(cx + r * cos(2 * pi * i / n), cy + r * sin(2 * pi * i / n))
            for i in range(n)]


def objet(nom, contours, materiau, position, rotation_deg, trous=None,
          rayon=0.09, seg=6, epaisseur=0.34, biseau=0.055):
    cd = bpy.data.curves.new(nom, type='CURVE')
    cd.dimensions = '2D'
    cd.fill_mode = 'BOTH'
    cd.extrude = epaisseur
    cd.bevel_depth = biseau
    cd.bevel_resolution = 6

    def ajoute(pts):
        sp = cd.splines.new('POLY')
        sp.points.add(len(pts) - 1)
        for pt, (x, y) in zip(sp.points, pts):
            pt.co = (x, y, 0.0, 1.0)
        sp.use_cyclic_u = True
        sp.use_smooth = True

    for c in contours:
        ajoute(arrondi_coins(c, rayon, seg) if rayon > 0 else c)
    for t in (trous or []):
        ajoute(t)

    obj = bpy.data.objects.new(nom, cd)
    scene.collection.objects.link(obj)
    obj.location = position
    obj.rotation_euler = tuple(radians(a) for a in rotation_deg)
    obj.data.materials.append(materiau)
    return obj


# -----------------------------------------------------------------------------
# Matériau verre dispersif teinté (3 Glass BSDF R/G/B + absorption volumique)
# -----------------------------------------------------------------------------
def verre_dispersif(nom, teinte, couleur_absorption, densite):
    mat = bpy.data.materials.new(nom)
    mat.use_nodes = True
    nodes, links = mat.node_tree.nodes, mat.node_tree.links
    nodes.clear()
    output = nodes.new('ShaderNodeOutputMaterial')

    glasses = []
    for canal, ior in zip(range(3), (1.435, 1.45, 1.472)):
        g = nodes.new('ShaderNodeBsdfGlass')
        col = [0.0, 0.0, 0.0, 1.0]
        col[canal] = teinte[canal]
        g.inputs['Color'].default_value = col
        g.inputs['Roughness'].default_value = 0.0
        g.inputs['IOR'].default_value = ior
        glasses.append(g)

    add1 = nodes.new('ShaderNodeAddShader')
    add2 = nodes.new('ShaderNodeAddShader')
    links.new(glasses[0].outputs[0], add1.inputs[0])
    links.new(glasses[1].outputs[0], add1.inputs[1])
    links.new(add1.outputs[0], add2.inputs[0])
    links.new(glasses[2].outputs[0], add2.inputs[1])
    links.new(add2.outputs[0], output.inputs['Surface'])

    vol = nodes.new('ShaderNodeVolumeAbsorption')
    vol.inputs['Color'].default_value = (*couleur_absorption, 1.0)
    vol.inputs['Density'].default_value = densite
    links.new(vol.outputs[0], output.inputs['Volume'])
    return mat


mat_peche = verre_dispersif("VerrePeche", (1.0, 0.80, 0.64), (1.0, 0.70, 0.52), 0.6)
mat_creme = verre_dispersif("VerreCreme", CREME, (1.0, 0.92, 0.78), 0.35)
# Bleu pétrole éclairci : le fond du site est sombre, le verre doit rester lisible
mat_bleu = verre_dispersif("VerreBleu", (0.42, 0.68, 0.88), (0.30, 0.55, 0.78), 1.2)

# -----------------------------------------------------------------------------
# Silhouettes
# -----------------------------------------------------------------------------
# 1. Flamme — vectorisée depuis le logo (3 rubans), normalisée dans [-1, 1]
with open(os.path.join(ICI, "flamme.json")) as f:
    FLAMME = [[(x * 1.3, y * 1.3) for x, y in c["pts"]] for c in json.load(f)]

# 2. Bulle de discussion : rectangle très arrondi + queue, 3 points = trous
sil_bulle = [
    (-1.15, -0.55), (-1.15, 0.85), (1.15, 0.85), (1.15, -0.55),
    (-0.15, -0.55), (-0.70, -1.10), (-0.62, -0.55),
]
trous_bulle = [cercle(x, 0.15, 0.17, 36) for x in (-0.55, 0.0, 0.55)]

# 3. Cœur paramétrique
sil_coeur = []
for i in range(26):
    t = 2 * pi * i / 26
    x = 16 * sin(t) ** 3
    y = 13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t)
    sil_coeur.append((x / 15, y / 15 + 0.1))

# 5. Document : feuille à coin replié + 3 lignes de texte (trous)
sil_document = [
    (-0.80, -1.05), (-0.80, 1.05), (0.30, 1.05), (0.80, 0.55), (0.80, -1.05),
]


def ligne(x0, x1, y, h=0.16, n=14):
    """Fente arrondie (capsule) servant de ligne de texte."""
    r = h / 2
    pts = [(x1 + r * cos(-pi / 2 + pi * i / n), y + r * sin(-pi / 2 + pi * i / n)) for i in range(n + 1)]
    pts += [(x0 + r * cos(pi / 2 + pi * i / n), y + r * sin(pi / 2 + pi * i / n)) for i in range(n + 1)]
    return pts


trous_document = [ligne(-0.42, 0.42, 0.30), ligne(-0.42, 0.42, -0.10), ligne(-0.42, 0.12, -0.50)]

# 4. Étincelle IA : étoile à 4 branches aux flancs concaves
sil_etincelle = []
for i in range(48):
    t = 2 * pi * i / 48
    c, s = cos(t), sin(t)
    k = 3.2
    x = (abs(c) ** k) * (1 if c >= 0 else -1)
    y = (abs(s) ** k) * (1 if s >= 0 else -1)
    sil_etincelle.append((x * 1.25, y * 1.25))

objets = [
    objet("flamme",        FLAMME,          mat_peche, (-6.6, 0, 0), (-14, 18, 6),  rayon=0.02, seg=3),
    objet("bulle",         [sil_bulle],     mat_bleu,  (-3.3, 0, 0), (-16, -20, 7), trous=trous_bulle, rayon=0.42, seg=10),
    objet("coeur",         [sil_coeur],     mat_peche, ( 0.0, 0, 0), (-18, 16, -9), rayon=0.16, seg=5),
    objet("document",      [sil_document],  mat_peche, ( 9.9, 0, 0), (-16, 20, -8), trous=trous_document, rayon=0.14, seg=6),
    objet("etincelle",     [sil_etincelle], mat_creme, ( 3.3, 0, 0), (-15, 20, 10), rayon=0.12, seg=5),
    objet("flamme_bleue",  FLAMME,          mat_bleu,  ( 6.6, 0, 0), (-16, -18, -6), rayon=0.02, seg=3),
]

# -----------------------------------------------------------------------------
# Caméra
# -----------------------------------------------------------------------------
cam_data = bpy.data.cameras.new("Camera")
cam_data.lens = 85
cam = bpy.data.objects.new("Camera", cam_data)
cam.location = (0, 0, 8.5)
scene.collection.objects.link(cam)
scene.camera = cam

cible = bpy.data.objects.new("Cible", None)
cible.location = (0, 0.05, 0)
scene.collection.objects.link(cible)
cam.constraints.new('TRACK_TO').target = cible


# -----------------------------------------------------------------------------
# Éclairage studio : bandes crème + rims pêche / bleu
# -----------------------------------------------------------------------------
def bande(nom, loc, energie, couleur=(1, 1, 1), taille=(8, 0.6)):
    d = bpy.data.lights.new(nom, type='AREA')
    d.energy = energie
    d.color = couleur
    d.shape = 'RECTANGLE'
    d.size, d.size_y = taille
    o = bpy.data.objects.new(nom, d)
    o.location = loc
    scene.collection.objects.link(o)
    o.constraints.new('TRACK_TO').target = cible
    return o


bande("Key",      ( 3.5,  3.0,  6.0), 1200, (1.0, 0.95, 0.86))
bande("Fill",     (-4.5, -1.0,  5.0),  500, (0.90, 0.94, 1.0))
bande("RimPeche", ( 3.0, -3.5, -4.0), 1500, (1.0, 0.70, 0.48), (6, 1.2))
bande("RimBleu",  (-3.5,  2.5, -4.0), 1300, (0.45, 0.65, 0.90), (6, 1.2))

world = bpy.data.worlds.new("Monde")
world.use_nodes = True
world.node_tree.nodes["Background"].inputs['Color'].default_value = (1.0, 0.93, 0.84, 1)
world.node_tree.nodes["Background"].inputs['Strength'].default_value = 1.0
scene.world = world

scene.render.engine = 'CYCLES'
scene.cycles.samples = SAMPLES
scene.cycles.use_denoising = True
scene.cycles.max_bounces = 16
scene.cycles.transmission_bounces = 16
scene.cycles.transparent_max_bounces = 16
scene.cycles.glossy_bounces = 8
scene.cycles.caustics_refractive = True
scene.cycles.blur_glossy = 0.8

try:
    scene.cycles.device = 'GPU'
    prefs = bpy.context.preferences.addons['cycles'].preferences
    for backend in ('OPTIX', 'CUDA', 'HIP', 'METAL', 'ONEAPI'):
        try:
            prefs.compute_device_type = backend
            prefs.get_devices()
            break
        except Exception:
            continue
    for d in prefs.devices:
        d.use = True
except Exception:
    scene.cycles.device = 'CPU'

scene.render.film_transparent = True
scene.view_settings.view_transform = 'Standard'
scene.render.resolution_x = 1080
scene.render.resolution_y = 1080
scene.render.resolution_percentage = RES_PCT
scene.render.image_settings.file_format = 'PNG'
scene.render.image_settings.color_mode = 'RGBA'

# -----------------------------------------------------------------------------
# Export : un PNG transparent par objet
# -----------------------------------------------------------------------------
if RENDU_AUTO:
    os.makedirs(SORTIE, exist_ok=True)
    seuls = [n for n in os.environ.get("AUX_ONLY", "").split(",") if n]
    for obj in objets:
        if seuls and obj.name not in seuls:
            continue
        for autre in objets:
            autre.hide_render = autre is not obj
        origine = obj.location.copy()
        obj.location = (0, 0, 0)
        scene.render.filepath = os.path.join(SORTIE, f"{obj.name}.png")
        bpy.ops.render.render(write_still=True)
        obj.location = origine
        print(f"Rendu : {scene.render.filepath}")
    for obj in objets:
        obj.hide_render = False
    open(os.path.join(SORTIE, "_termine.txt"), "w").write("ok")
