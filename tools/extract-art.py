"""Slice the reference mockup into 9-slice frames, sprites and tiling textures."""
from PIL import Image, ImageDraw, ImageFilter
import os

SRC = 'design/steampunk-dashboard.png'
OUT = 'public/art'
im = Image.open(SRC).convert('RGBA')

# 9-slice sources mapped to the slice inset each one uses. Only the ring is
# ever drawn (no `fill`), so the interior is punched out to keep files small.
FRAMES = {
  'frame-chassis':  (0, 0, 1402, 1122),
  'frame-sidebar':  (26, 22, 274, 1094),
  'frame-header':   (322, 28, 1371, 114),
  'frame-card':     (329, 378, 651, 671),
  'frame-card-blocked': (666, 689, 1007, 1024),
  'frame-stat':     (333, 143, 581, 292),
  'frame-nav-active': (30, 222, 263, 271),
  'frame-plate':    (30, 958, 262, 1000),
  'frame-section-plate': (337, 326, 573, 364),
  'frame-ribbon':   (676, 973, 996, 1006),
}

SPRITES = {
  'logo-plate':  (44, 22, 268, 192),
  'wheel':       (138, 22, 178, 62),
  'btn-gear':    (1198, 30, 1270, 102),
  'btn-bell':    (1294, 28, 1370, 104),
  'gauges':      (22, 1000, 290, 1096),
  'rule-finial': (1340, 328, 1378, 362),
  'badge-count': (1341, 26, 1371, 56),
  'badge-build':      (578, 406, 634, 436),
  'badge-analysis':   (860, 406, 982, 436),
  'badge-intent':     (1281, 406, 1339, 436),
  'badge-scheduling': (547, 719, 631, 749),
  'badge-release':    (1270, 719, 1338, 749),
  'pill-filled':  (352, 448, 396, 462),
  'pill-current': (496, 448, 540, 462),
  'pill-empty':   (544, 448, 588, 462),
  'lamp-green': (350, 529, 368, 547),
  'lamp-amber': (807, 529, 825, 547),
  'lamp-red':   (803, 844, 821, 862),
  'lamp-idle':  (1169, 530, 1187, 548),
}

# Tiling patches. Mirrored into a 2x2 so they tile seamlessly in both axes.
TILES = {
  'tex-parchment-deep': ((80, 560, 240, 720), 'both'),    # sidebar / header stock
  'tex-parchment':      ((1130, 894, 1270, 974), 'both'),  # card stock
  'tex-backdrop':       ((1060, 1040, 1240, 1100), 'both'),
  'tex-pipe-h':         ((620, 338, 700, 356), 'x'),      # section-rule pipe run
  'tex-pipe-v':         ((296, 420, 316, 560), 'y'),      # sidebar riser
}

# For each frame: the corner size the 9-slice cuts at, the thickness of the
# straight brass run between corners, and what the panel interior is made of.
#
# The two differ because the corner gussets reach much further in than the edge
# does. Everything in an edge strip beyond `edge` is panel content in the source
# art (lettering, status lamps), and border-image would tile it along the run —
# so those bands are scrubbed with clean stock while the corner blocks, which
# hold the gussets, are left untouched.
FRAME_GEOM = {
  # The gear/bell escutcheons overhang the top pipe in the source, so their
  # tops land inside the chassis' top edge strip and would tile along the run.
  'frame-chassis':      dict(slice=40, edge=34, fill=('tile', 'tex-backdrop'),
                             wipes=[(1150, 0, 1390, 40)]),
  'frame-sidebar':      dict(slice=20, edge=14, fill=('tile', 'tex-parchment-deep')),
  'frame-header':       dict(slice=20, edge=14, fill=('tile', 'tex-parchment-deep')),
  'frame-card':         dict(slice=28, edge=11, fill=('tile', 'tex-parchment')),
  'frame-card-blocked': dict(slice=30, edge=12, fill=('tile', 'tex-parchment')),
  'frame-stat':         dict(slice=26, edge=10, fill=('tile', 'tex-parchment')),
  'frame-nav-active':   dict(slice=14, edge=7,  fill=('solid', (69, 39, 11, 255))),
  'frame-plate':        dict(slice=14, edge=8,  fill=('solid', (36, 19, 4, 255))),
  'frame-section-plate':dict(slice=14, edge=8,  fill=('tile', 'tex-parchment')),
  'frame-ribbon':       dict(slice=10, edge=5,  fill=('solid', (106, 26, 4, 255))),
}

BADGE_GEOM = dict(slice=10, edge=5)
BADGE_FILL = {
  'badge-build': (27, 43, 14, 255), 'badge-analysis': (28, 43, 56, 255),
  'badge-intent': (44, 28, 46, 255), 'badge-scheduling': (29, 43, 56, 255),
  'badge-release': (80, 39, 0, 255),
}

def make_fill(spec, size, tiles):
    w, h = size
    kind, val = spec
    if kind == 'solid':
        return Image.new('RGBA', size, val)
    patch = tiles[val]
    out = Image.new('RGBA', size)
    for y in range(0, h, patch.height):
        for x in range(0, w, patch.width):
            out.paste(patch, (x, y))
    return out

def scrub(img, slice_px, edge_px, fill_spec, tiles, wipes=()):
    """Replace panel content inside the four straight runs, and the middle."""
    w, h = img.size
    fill = make_fill(fill_spec, (w, h), tiles)
    def wipe(box):
        x0, y0, x1, y1 = box
        if x1 > x0 and y1 > y0:
            img.paste(fill.crop(box), (x0, y0))
    wipe((slice_px, edge_px, w - slice_px, slice_px))              # top run
    wipe((slice_px, h - slice_px, w - slice_px, h - edge_px))      # bottom run
    wipe((edge_px, slice_px, slice_px, h - slice_px))              # left run
    wipe((w - slice_px, slice_px, w - edge_px, h - slice_px))      # right run
    for box in wipes:
        wipe(box)
    # The middle is never drawn without `fill`; clear it to keep the PNG small.
    if w > slice_px * 2 and h > slice_px * 2:
        img.paste(Image.new('RGBA', (w - slice_px * 2, h - slice_px * 2), (0, 0, 0, 0)),
                  (slice_px, slice_px))
    return img

def mirror_tile(patch, axis='both'):
    """Mirror a patch so it tiles seamlessly.

    Pipe runs are cylinders: mirroring across the axis of the cylinder would
    flip the specular highlight, so those mirror along the tiling axis only.
    """
    w, h = patch.size
    if axis == 'x':
        out = Image.new('RGBA', (w * 2, h))
        out.paste(patch, (0, 0))
        out.paste(patch.transpose(Image.FLIP_LEFT_RIGHT), (w, 0))
        return out
    if axis == 'y':
        out = Image.new('RGBA', (w, h * 2))
        out.paste(patch, (0, 0))
        out.paste(patch.transpose(Image.FLIP_TOP_BOTTOM), (0, h))
        return out
    out = Image.new('RGBA', (w * 2, h * 2))
    out.paste(patch, (0, 0))
    out.paste(patch.transpose(Image.FLIP_LEFT_RIGHT), (w, 0))
    out.paste(patch.transpose(Image.FLIP_TOP_BOTTOM), (0, h))
    out.paste(patch.transpose(Image.ROTATE_180), (w, h))
    return out

os.makedirs(OUT, exist_ok=True)
written = []
# Tiles first — the frame scrubbing uses them as clean stock.
tiles = {}
for name, (box, axis) in TILES.items():
    t = mirror_tile(im.crop(box), axis)
    tiles[name] = t
    t.save(f'{OUT}/{name}.png', optimize=True)
    written.append((name, *t.size))

for name, box in FRAMES.items():
    g = FRAME_GEOM[name]
    img = scrub(im.crop(box).copy(), g['slice'], g['edge'], g['fill'], tiles,
                g.get('wipes', ()))
    if name == 'frame-header':
        # The header's right end sits underneath the bell escutcheon in the
        # source, so its top-right corner carries the bell's baked-in count
        # disc. Mirror the clean left end across to get an unpolluted corner.
        # Wider than the slice: the disc also bleeds into the top edge strip
        # just inside the corner block.
        n = g['slice'] + 26
        left = img.crop((0, 0, n, img.height)).transpose(Image.FLIP_LEFT_RIGHT)
        img.paste(left, (img.width - n, 0))
    img.save(f'{OUT}/{name}.png', optimize=True)
    written.append((name, *img.size))

ROUND_SPRITES = {'btn-gear', 'btn-bell', 'lamp-green', 'lamp-amber', 'lamp-red', 'lamp-idle'}

def circle_mask(img, feather=1.0):
    """Knock the corners out of a round sprite so it can sit on parchment."""
    w, h = img.size
    ss = 4  # supersample for a smooth edge
    m = Image.new('L', (w * ss, h * ss), 0)
    ImageDraw.Draw(m).ellipse([0, 0, w * ss - 1, h * ss - 1], fill=255)
    m = m.resize((w, h), Image.LANCZOS)
    if feather:
        m = m.filter(ImageFilter.GaussianBlur(feather))
    out = img.copy()
    out.putalpha(m)
    return out

for name, box in SPRITES.items():
    img = im.crop(box).copy()
    if name == 'btn-bell':
        # The reference bell carries a notification disc baked into the casting.
        # The count is data-driven, so the disc is patched out with the matching
        # quadrant of the gear escutcheon (identical brass ring) and re-rendered
        # as live type by the component.
        gear = im.crop(SPRITES['btn-gear']).copy().resize(img.size)
        img.paste(gear.crop((img.width // 2, 0, img.width, img.height // 2)),
                  (img.width // 2, 0))
    if name in BADGE_FILL:
        img = scrub(img, BADGE_GEOM['slice'], BADGE_GEOM['edge'],
                    ('solid', BADGE_FILL[name]), tiles)
    if name in ROUND_SPRITES:
        img = circle_mask(img)
    img.save(f'{OUT}/{name}.png', optimize=True)
    written.append((name, *img.size))

for n, w, h in written:
    print(f'{n:22} {w}x{h}')
