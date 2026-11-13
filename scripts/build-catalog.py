#!/usr/bin/env python3
"""
Build src/data/catalog.ts from the harvested Shopify catalog.

Takes:  /tmp/asc/catalog_clean.json  (77 products, full variants)
        /tmp/asc/image_manifest.json  (local image paths per handle)
Emits:  src/data/catalog.ts
"""
import json, re, os, unicodedata

ROOT = '/Users/julylan/.t3/scratch/2026-11-13-i-would-like-you-to-4f4781fd'
cat = json.load(open('/tmp/asc/catalog_clean.json'))
imgs = json.load(open('/tmp/asc/image_manifest.json'))

# ---- Collection routing ----------------------------------------------------
# Shopify product_type is messy (case + plural drift). Map to clean collections.
CATEGORY_MAP = {
    'saddle': 'saddles', 'saddles': 'saddles',
    'tack': 'tack',
    'bags': 'saddle-bags',
    'holster': 'holsters', 'holsters': 'holsters',
    'clothing': 'clothing',
    'cleaner': 'leatherkeep', 'cleaners': 'leatherkeep',
    'girth': 'girths', 'girths': 'girths',
    'belt': 'belts',
    'pads': 'saddle-pads',
    'tools, tack': 'tack',
}
# Handle-level overrides for untyped / oddly-typed products.
OVERRIDE = {
    'muster-master-lite': 'saddles',
    'poncho': 'clothing',
    'jay-el-beeswax-leather-dressing': 'leatherkeep',
    'leather-pouch-fencing-tool-pouch': 'tack',
    'monkey-grip': 'tack',
    'overgirth-4-inch-ring-billet': 'girths',
    'double-ring-overgirth': 'girths',
    'stirrup-pad-replacements': 'tack',
    'skoal-pouch': 'holsters',
    'single-buscadero-belt-right': 'belts',
    'bucket-scabbard': 'holsters',
    'us-holster': 'holsters',
    'utility-scabbard': 'holsters',
    'butt-scabbard': 'holsters',
    'buttstock-cover': 'holsters',
}

# "Stirrups" is a sub-set of Tack on the source site but deserves its own shelf.
STIRRUP_HANDLES = {
    'aussie-safety-stirrup', 'bling-oxbow-stirrups', 'down-n-out-stirrup',
    'stirrup-pad-replacements',
}

def esc(s):
    if s is None: return ''
    return (s.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
             .replace('\r', ''))

def js_str(s):
    """Emit a safe single-quoted TS string literal."""
    s = esc(s or '')
    return "'" + s.replace("'", "\\'").replace('\n', '\\n') + "'"

def slugify(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode()
    s = re.sub(r'[^a-zA-Z0-9]+', '-', s).strip('-').lower()
    return s

COLLECTIONS = {
    'saddles': {
        'name': 'Saddles', 'slug': 'saddles',
        'blurb': 'Hand-built Australian stock saddles on a proprietary aluminum and wood tree.',
        'note': 'Every saddle is built to order and fitted to your tracings.',
    },
    'tack': {
        'name': 'Bridles & Tack', 'slug': 'tack',
        'blurb': 'Bridles, breastplates, stirrups, halters and the hardware that holds it together.',
        'note': 'The working kit for the working horse.',
    },
    'stirrups': {
        'name': 'Stirrups', 'slug': 'stirrups',
        'blurb': 'Australian and western stirrups — safety, bling, and down-and-out.',
        'note': 'Fits Aussie or western saddles.',
    },
    'saddle-pads': {
        'name': 'Saddle Pads', 'slug': 'saddle-pads',
        'blurb': 'Pads that take the heat off the horse and keep the back sound.',
        'note': 'All types of saddle pads for Australian saddles.',
    },
    'saddle-bags': {
        'name': 'Saddle Bags', 'slug': 'saddle-bags',
        'blurb': 'Leather saddle bags, cantle bags, wither bags and hay nets.',
        'note': 'Carry what the day needs.',
    },
    'clothing': {
        'name': 'Oilskin Clothing', 'slug': 'clothing',
        'blurb': 'Oilskin and canvas that keeps you warm and dry out on the horse.',
        'note': 'Weatherproofed for the long ride.',
    },
    'holsters': {
        'name': 'Holsters & Scabbards', 'slug': 'holsters',
        'blurb': 'Kidskin-lined leather holsters and scabbards for mounted shooters and gun owners.',
        'note': 'Belt, bandolier and saddle-mounted.',
    },
    'girths': {
        'name': 'Girths & Cinches', 'slug': 'girths',
        'blurb': 'Traditional Australian girthing, western rigs, overgirths and billets.',
        'note': 'Converts between Aussie and western rigging.',
    },
    'leatherkeep': {
        'name': 'Aussie Leatherkeep', 'slug': 'leatherkeep',
        'blurb': 'All-natural leather conditioner made from tallow, lanolin, beeswax, pine extract and tea tree oil.',
        'note': 'Developed over a decade ago. Feeds and waterproofs your leather.',
    },
    'belts': {
        'name': 'Belts & Accessories', 'slug': 'belts',
        'blurb': 'Cartridge belts, buscadero belts and the small leather goods that finish the kit.',
        'note': 'The last details matter.',
    },
}

def collection_for(c):
    h = c['handle']
    if h in OVERRIDE:
        return OVERRIDE[h]
    if h in STIRRUP_HANDLES:
        return 'stirrups'
    return CATEGORY_MAP.get((c['type'] or '').lower().strip(), 'tack')

# ---- Build product records -------------------------------------------------
products = []
for c in cat:
    h = c['handle']
    local = imgs.get(h) or []
    variants = []
    for v in c['variants']:
        variants.append({
            'title': v['title'],
            'price': v['price'],
            'available': v['available'],
            'option1': v.get('option1') or '',
            'option2': v.get('option2') or '',
            'option3': v.get('option3') or '',
        })
    prices = [v['price'] for v in variants] or [c['price']]
    products.append({
        'handle': h,
        'title': c['title'],
        'collection': collection_for(c),
        'description': c['description'],
        'price': min(prices),
        'priceMax': max(prices),
        'images': local,
        'variants': variants,
        'options': c['options'],
        'optionValues': c['optionValues'],
        'available': c['available'],
        'tags': c['tags'],
        'brand': c['vendor'],
    })

# Featured saddles — the hero products of the shop
FEATURED = [
    'saddle-american-poley', 'muster-master', 'fox-poley',
    'survivor-poley', 'patrol-poley', 'drover-poley', 'muster-master-lite',
]

def ts_product(p):
    lines = []
    lines.append('  {')
    lines.append(f"    handle: {js_str(p['handle'])},")
    lines.append(f"    title: {js_str(p['title'])},")
    lines.append(f"    collection: {js_str(p['collection'])},")
    lines.append(f"    price: {p['price']},")
    lines.append(f"    priceMax: {p['priceMax']},")
    lines.append(f"    available: {'true' if p['available'] else 'false'},")
    lines.append(f"    description: {js_str(p['description'])},")
    lines.append(f"    images: [{', '.join(js_str(i) for i in p['images'])}],")
    lines.append(f"    options: [{', '.join(js_str(o) for o in p['options'])}],")
    ov = ', '.join(f"{js_str(k)}: [{', '.join(js_str(x) for x in v)}]" for k, v in p['optionValues'].items())
    lines.append(f"    optionValues: {{{ov}}},")
    vs = []
    for v in p['variants']:
        vs.append(f"{{ title: {js_str(v['title'])}, price: {v['price']}, available: {'true' if v['available'] else 'false'} }}")
    lines.append(f"    variants: [{', '.join(vs)}],")
    lines.append('  },')
    return '\n'.join(lines)

out = []
out.append('/* AUTO-GENERATED by scripts/build-catalog.py — do not edit by hand. */')
out.append('/* Source: australiansaddleco.com Shopify catalog, harvested 2026-11-13. */')
out.append('')
out.append('export type Variant = {')
out.append('  title: string;')
out.append('  price: number;')
out.append('  available: boolean;')
out.append('};')
out.append('')
out.append('export type Product = {')
out.append('  handle: string;')
out.append('  title: string;')
out.append('  collection: string;')
out.append('  price: number;')
out.append('  priceMax: number;')
out.append('  available: boolean;')
out.append('  description: string;')
out.append('  images: string[];')
out.append('  options: string[];')
out.append('  optionValues: Record<string, string[]>;')
out.append('  variants: Variant[];')
out.append('};')
out.append('')
out.append('export type Collection = {')
out.append('  name: string;')
out.append('  slug: string;')
out.append('  blurb: string;')
out.append('  note: string;')
out.append('};')
out.append('')
out.append('export const collections: Collection[] = [')
for slug, c in COLLECTIONS.items():
    out.append('  {')
    out.append(f"    name: {js_str(c['name'])},")
    out.append(f"    slug: {js_str(c['slug'])},")
    out.append(f"    blurb: {js_str(c['blurb'])},")
    out.append(f"    note: {js_str(c['note'])},")
    out.append('  },')
out.append('];')
out.append('')
out.append('export const products: Product[] = [')
for p in products:
    out.append(ts_product(p))
out.append('];')
out.append('')
out.append('export const featuredHandles: string[] = [')
for h in FEATURED:
    if any(p['handle'] == h for p in products):
        out.append(f"  {js_str(h)},")
out.append('];')
out.append('')

os.makedirs(os.path.join(ROOT, 'src/data'), exist_ok=True)
with open(os.path.join(ROOT, 'src/data/catalog.ts'), 'w') as f:
    f.write('\n'.join(out))

# Report
from collections import Counter
cnt = Counter(p['collection'] for p in products)
print("products:", len(products))
for slug in COLLECTIONS:
    n = cnt.get(slug, 0)
    print(f"  {slug:16s} {n:>3}  {'OK' if n else 'EMPTY'}")
print("\nwrote src/data/catalog.ts", os.path.getsize(os.path.join(ROOT,'src/data/catalog.ts'))//1024, "KB")
noimg = [p['handle'] for p in products if not p['images']]
print("products without images:", noimg)
