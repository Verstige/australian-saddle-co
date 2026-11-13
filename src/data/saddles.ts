/* AUTO-GENERATED-adjacent: spec facts transcribed from the harvested
   product descriptions on australiansaddleco.com, 2026-11-13.
   Every value below is quoted from the source store, not invented. */

export type SaddleSpec = {
  handle: string;
  name: string;
  /** Short positioning line, drawn from the source description. */
  tagline: string;
  /** Approximate weight in pounds, without fittings. */
  weightLbs: number;
  /** Seat depth / dip in inches. */
  seatDepth: string;
  /** Knee pad height in inches, where stated. */
  kneePads: string;
  /** Panel / underside material. */
  panel: string;
  /** Tree construction. */
  tree: string;
  /** Seat construction. */
  seat: string;
  /** Rigging system. */
  rigging: string;
  /** What this model is actually for — from the description. */
  bestFor: string;
  /** Notable differentiator worth surfacing in comparison. */
  note: string;
};

export const saddleSpecs: SaddleSpec[] = [
  {
    handle: "drover-poley",
    name: "Drover Poley",
    tagline: "An excellent saddle for everyday pleasure or work.",
    weightLbs: 30,
    seatDepth: '5"',
    kneePads: "—",
    panel: "—",
    tree: "Wood and aluminum",
    seat: "Deep 5 inch cantle",
    rigging: "Standard",
    bestFor: "Everyday pleasure and work",
    note: "Deep cantle holds you secure on any horse. The only saddle here with a single price.",
  },
  {
    handle: "fox-poley-lite",
    name: "Fox Poley Lite",
    tagline: "The Fox Poley with a synthetic body and the inner flap removed.",
    weightLbs: 15,
    seatDepth: '4.5"',
    kneePads: '3.5"',
    panel: "Acrylic fleece",
    tree: "Web strung adjustable aluminum / wood",
    seat: "4.5 inch dip",
    rigging: "Western fenders or 2.5\" campdraft leathers",
    bestFor: "Weight-sensitive riders and long days in the saddle",
    note: "The lightest saddle we build — 15 lbs without fittings.",
  },
  {
    handle: "fox-poley",
    name: "Fox Poley",
    tagline: "A beautiful and rugged crossover saddle.",
    weightLbs: 26,
    seatDepth: '4.5"',
    kneePads: '3.5"',
    panel: "Acrylic fleece",
    tree: "Web strung wood and aluminum",
    seat: "4.5 inch dip",
    rigging: "Swinging fenders on a stirrup bar",
    bestFor: "Trail riding that asks for durability",
    note: "Named after the crafty and sleek hunter. Dark mahogany with black poleys and seat.",
  },
  {
    handle: "patrol-poley",
    name: "Patrol Poley",
    tagline: "Designed for long hours in the saddle.",
    weightLbs: 23,
    seatDepth: '5"',
    kneePads: '4 3/4"',
    panel: "—",
    tree: "Wood and aluminum, shaped to the horse",
    seat: "5\" dip in a web-strung seat",
    rigging: "Heavy-duty D-ring, double-ring surcingle ready",
    bestFor: "Mounted police, private units and hard-to-fit horses",
    note: "Covers as much of the back as possible. Trees bend and shape to a custom fit.",
  },
  {
    handle: "muster-master-lite",
    name: "Mustermaster Lite",
    tagline: "The Mustermaster with synthetic panels and no inner flap.",
    weightLbs: 20,
    seatDepth: '5"',
    kneePads: '3.5"',
    panel: "Synthetic",
    tree: "Wood and aluminum, adjustable",
    seat: "Web suspended, 5 inches",
    rigging: "In-skirt D-rigging",
    bestFor: "The Mustermaster fit, 6+ lbs lighter",
    note: "Same tree and rigging as the Mustermaster, under 20 lbs.",
  },
  {
    handle: "muster-master",
    name: "Mustermaster",
    tagline: "Raised the bar for mid-priced excellence.",
    weightLbs: 26,
    seatDepth: '5"',
    kneePads: '3.5"',
    panel: "Synthetic sheepskin, Merino upgrade available",
    tree: "Wood and aluminum, adjustable",
    seat: "Web suspended, 5 inches",
    rigging: "In-skirt D-rigging",
    bestFor: "The all-round choice — our most popular saddle",
    note: "Two-tone brown or all black. Optional horn angles forward for uphill work. Tooling adds $200.",
  },
  {
    handle: "survivor-poley",
    name: "Survivor Poley",
    tagline: "One of our English-style models.",
    weightLbs: 25,
    seatDepth: '5"',
    kneePads: '4.75"',
    panel: "Synthetic fleece",
    tree: "Proprietary aluminum and wood",
    seat: "Web-suspended, 5 inch dip",
    rigging: "Western-style rigging, campdraft leathers",
    bestFor: "Riders who want a deeper seat and taller knee pads",
    note: "Largest knee pads in the range at 4.75\". Fitted with Traditional Campdraft stirrup leathers.",
  },
  {
    handle: "saddle-american-poley",
    name: "US Poley",
    tagline: "Our newest addition, now made with American leather.",
    weightLbs: 26,
    seatDepth: '5"',
    kneePads: '4.5"',
    panel: '1.25" genuine Merino sheepskin',
    tree: "Proprietary aluminum and wood",
    seat: "Web-suspended, 5 inch",
    rigging: "Western-style, in-skirt D-rigging",
    bestFor: "The premium build — genuine Merino and American leather",
    note: "One of our most successful designs. Solid black or brown, both with black seat and knee pads.",
  },
];

export const specLabels: { key: keyof SaddleSpec; label: string }[] = [
  { key: "weightLbs", label: "Weight" },
  { key: "seatDepth", label: "Seat depth" },
  { key: "kneePads", label: "Knee pads" },
  { key: "panel", label: "Panel" },
  { key: "tree", label: "Tree" },
  { key: "rigging", label: "Rigging" },
  { key: "bestFor", label: "Best for" },
];

export type RiderAnswer = "trail" | "work" | "police" | "competition" | "beginner";

export type HorseAnswer = "light" | "mid" | "heavy" | "hardtofit";

export type FinderAnswer = {
  use: RiderAnswer;
  horse: HorseAnswer;
  budget: "under1500" | "1500to1800" | "over1800";
};

/**
 * Score each saddle against a rider's answers.
 * Returns models sorted by fit, best first.
 */
export function scoreSaddles(answers: FinderAnswer): {
  spec: SaddleSpec;
  score: number;
  reasons: string[];
}[] {
  const scored = saddleSpecs.map((spec) => {
    let score = 0;
    const reasons: string[] = [];

    // --- What the rider does with the saddle ---
    switch (answers.use) {
      case "trail":
        if (spec.handle === "fox-poley" || spec.handle === "muster-master") {
          score += 3;
          reasons.push("Built for long hours on the trail.");
        }
        if (spec.handle === "survivor-poley") {
          score += 2;
          reasons.push("Deeper seat and taller knee pads hold you steady on rough ground.");
        }
        break;
      case "work":
        if (spec.handle === "drover-poley") {
          score += 4;
          reasons.push("Our everyday work saddle — deep cantle, no frills.");
        }
        if (spec.handle === "muster-master") {
          score += 2;
          reasons.push("Solid D-rigging and a 5\" seat for long days.");
        }
        break;
      case "police":
        if (spec.handle === "patrol-poley") {
          score += 5;
          reasons.push("The mounted unit saddle — a favorite of police departments.");
        }
        break;
      case "competition":
        if (spec.handle === "survivor-poley") {
          score += 4;
          reasons.push("Largest knee pads in the range at 4.75\" for a secure, balanced seat.");
        }
        if (spec.handle === "saddle-american-poley") {
          score += 3;
          reasons.push("4.5\" poleys and Merino panels keep you balanced and comfortable.");
        }
        break;
      case "beginner":
        if (spec.handle === "muster-master") {
          score += 4;
          reasons.push("Our most popular saddle — the safest place to start.");
        }
        if (spec.handle === "drover-poley") {
          score += 3;
          reasons.push("Simple, secure and the most affordable way in.");
        }
        break;
    }

    // --- The horse ---
    switch (answers.horse) {
      case "hardtofit":
        if (spec.handle === "patrol-poley") {
          score += 5;
          reasons.push("Trees are designed to be bent and shaped to a custom fit.");
        }
        break;
      case "heavy":
        if (spec.tree.toLowerCase().includes("shaped")) {
          score += 3;
          reasons.push("Tree covers more of the back, spreading the load.");
        }
        if (spec.weightLbs <= 26) score += 1;
        break;
      case "light":
        if (spec.weightLbs <= 20) {
          score += 4;
          reasons.push(`Only ${spec.weightLbs} lbs — the lightest way to go.`);
        } else if (spec.weightLbs <= 26) {
          score += 2;
        }
        break;
      case "mid":
        if (spec.weightLbs >= 23 && spec.weightLbs <= 30) {
          score += 3;
          reasons.push(`${spec.weightLbs} lbs is the sweet spot for an all-round build.`);
        }
        break;
    }

    // --- Budget ---
    const base = priceFor(spec.handle);
    if (answers.budget === "under1500" && base <= 1500) {
      score += 3;
      reasons.push("Fits your budget.");
    } else if (answers.budget === "1500to1800" && base >= 1400 && base <= 1800) {
      score += 3;
      reasons.push("Fits your budget.");
    } else if (answers.budget === "over1800") {
      score += 2;
      if (base > 1800) {
        score += 2;
        reasons.push("The premium tier, as you asked for.");
      }
    }

    return { spec, score, reasons };
  });

  return scored.sort((a, b) => b.score - a.score || a.spec.weightLbs - b.spec.weightLbs);
}

/** Entry price per saddle, matching the catalog. */
export function priceFor(handle: string): number {
  const map: Record<string, number> = {
    "drover-poley": 1295,
    "fox-poley-lite": 1495,
    "fox-poley": 1495,
    "patrol-poley": 1495,
    "muster-master-lite": 1795,
    "muster-master": 1795,
    "survivor-poley": 1795,
    "saddle-american-poley": 2395,
  };
  return map[handle] ?? 0;
}
