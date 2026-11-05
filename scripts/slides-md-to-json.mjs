#!/usr/bin/env node
// SLIDES.md (bsv-qqq-lecture-scenario) -> QQQ `const slides=[...]` data.
// Contract: references/scenario-input.md. No dependencies (Node 18+).
//
//   node scripts/slides-md-to-json.mjs path/to/SLIDES.md            -> full report JSON
//   node scripts/slides-md-to-json.mjs path/to/SLIDES.md --slides   -> slides array only
//
// The reader does not rewrite content. It only converts markup:
//   **word** -> *word* (QQQ blue marker), `code` -> code, literal \n -> line break.
// prompt / command text (incl. command-list items.N.command) is copied byte-for-byte (no marker conversion).

import { readFileSync } from "node:fs";

// Types QQQ can render. Template code for the last group is in references/added-templates.md.
export const KNOWN_TYPES = new Set([
  "hero-title", "key-message", "big-question", "section-divider", "closing-prompt", "flow",
  "vertical-step-flow", "icon-versus", "four-card", "trinity", "animated-bar-chart",
  "table-slide", "keyword-cluster", "video",
  "reproduce", "platforms", "reasons", "keymsg", "versus", "bridge", "tradeoff",
  "prompt-box", "screenshot-slot", "pink-reversal", "before-after-panel", "command-box", "command-list",
  "capture-compare", "outcome-cards",
]);

// Template code (75~81) passes these fields through hl() without a guard; an absent value would
// print "undefined", so the reader fills an empty string. This adds no screen text.
const ALWAYS_RENDERED = {
  reproduce: ["caption"], platforms: ["subtitle", "caption"], reasons: ["caption"],
  keymsg: ["lead", "caption"], versus: ["caption"], bridge: ["caption"], tradeoff: ["caption"],
};

// SLIDES.md contract names (marked † in the scenario format) -> the prop names QQQ decks use.
// Only the first path segment is renamed: "cards.0.label" -> "items.0.label".
export const SLOT_RENAME = {
  "hero-title": { label: "eyebrow" },              // top label ("LECTURE 01")
  "closing-prompt": { action: "sub", chips: "items" },
  "four-card": { cards: "items" },
};

// Optional look switch for the two opening frames (added-templates 16-17). "" = the new default look.
export const VARIANTS = { "big-question": ["kinetic", "classic"], "key-message": ["quote", "classic"] };
// outcome-cards items.N.visual keys (added-templates 18); anything else falls back to "icon".
export const OC_VISUALS = ["folder-sort", "mini-dashboard", "doc-year-flip", "checklist", "icon"];

const NUMERIC_KEYS = new Set(["value", "start", "end", "side", "fontScale"]);
const len = a => (Array.isArray(a) ? a.length : 0);
const opt = (cond, name) => (cond ? [name] : []);

// big-question (added-templates 16, bqLines): a title plus a *different* question -> title is the big
// line and question the arrow line under it. Same sentence (markers and spaces ignored) -> one big line.
const bqKey = x => String(x == null ? "" : x).replace(/[*~_\s]/g, "");
export function bqBoth(s) {
  const t = String(s.title || "").trim(), q = String(s.question || "").trim();
  return !!(t && q && bqKey(t) !== bqKey(q));
}

// builds = sequential reveal steps. Order matters: component code reads them by index.
export function buildsFor(s) {
  const cap = opt(s.caption, "caption");
  switch (s.type) {
    case "hero-title": return [...opt(s.eyebrow, "eyebrow"), "title", ...opt(s.subtitle, "subtitle")];
    case "key-message": return [...opt(s.lead, "lead"), "message", ...opt(s.by, "by"), ...cap];
    case "big-question": return [...(bqBoth(s) ? ["title", "question"] : ["question"]), ...opt(s.sub, "sub"), ...cap];
    case "section-divider": return [];
    case "closing-prompt": return ["message", ...opt(s.sub, "sub"), ...opt(len(s.items), "items")];
    case "flow": return ["s0", "s1", "s2", ...cap];
    case "vertical-step-flow": return [...(s.steps || []).map((_, i) => "st" + i), ...cap];
    case "icon-versus": return ["left", "right", ...cap];
    case "four-card": return [...(s.items || []).map((_, i) => "c" + i), ...cap];
    case "trinity": return ["i0", "i1", "i2", ...opt(s.core, "core"), ...cap];
    case "animated-bar-chart": return [...(s.data || []).map((_, i) => "b" + i), ...cap];
    case "table-slide": return ["head", ...(s.rows || []).map((_, i) => "r" + i), ...cap];
    case "keyword-cluster": return ["center", "keywords", ...cap];
    case "video": return [];
    case "reproduce": return ["title", "hub", "outputs", "keyword", "caption"];
    case "platforms": return ["title", "sub", ...(s.groups || []).map((_, i) => "g" + i), "caption"];
    case "reasons": return ["title", ...opt(s.subtitle, "sub"), ...(s.rows || []).map((_, i) => "r" + i), "caption"];
    case "keymsg": return ["title", "lead", "chips", "caption"];
    case "versus": return ["title", "left", "vs", "right", "caption"];
    case "bridge": return ["title", "bridge", "explain", "caption"];
    case "tradeoff": return ["title", ...(s.cons || []).map((_, i) => "con" + i), "pro", "caption"];
    case "prompt-box": return ["title", "box", ...cap];
    case "screenshot-slot": return ["title", "shot", ...cap];
    case "pink-reversal": return ["eyebrow", "title", ...cap];
    case "before-after-panel": return ["title", "before", "arrow", "after", ...cap];
    case "command-box": return ["title", "box", ...opt(s.hint, "hint"), ...cap];
    case "command-list": return ["title", ...(s.items || []).map((_, i) => "i" + i), ...opt(s.hint, "hint"), ...cap];
    case "capture-compare": return ["title", ...(s.cases || []).map((_, i) => "c" + i), ...cap];
    case "outcome-cards": return ["title", ...(s.items || []).map((_, i) => "o" + i), ...cap];
    default: return []; // NEW type: the new template defines its own builds
  }
}

// screen text markup: **x** -> *x*, `x` -> x, literal "\n" -> newline
export function screenText(v) {
  return String(v)
    .replace(/\*\*([^*]+?)\*\*/g, "*$1*")
    .replace(/`([^`]+?)`/g, "$1")
    .replace(/\\n/g, "\n");
}

function coerce(key, v) {
  if (v === "true") return true;
  if (v === "false") return false;
  if (NUMERIC_KEYS.has(key) && /^-?\d+(\.\d+)?$/.test(v)) return Number(v);
  return v;
}

// "before.items.0" -> s.before.items[0]
function setPath(obj, path, value) {
  const segs = path.split(".");
  let cur = obj;
  segs.forEach((seg, i) => {
    const last = i === segs.length - 1;
    const key = /^\d+$/.test(seg) ? Number(seg) : seg;
    if (last) { cur[key] = value; return; }
    const nextIsIndex = /^\d+$/.test(segs[i + 1]);
    if (cur[key] === undefined) cur[key] = nextIsIndex ? [] : {};
    cur = cur[key];
  });
}

export function parseSlidesMd(text) {
  const lines = text.replace(/\r\n?/g, "\n").split("\n");
  const report = { deckTitle: null, slides: [], newComponents: [], warnings: [] };
  const titleLine = lines.find(l => /^# /.test(l));
  if (titleLine) report.deckTitle = titleLine.replace(/^#\s*(SLIDES\s*[—-]\s*)?/, "").trim();

  let cur = null, mode = null, promptBuf = null;
  const flushPrompt = () => {
    if (cur && promptBuf) {
      while (promptBuf.length && !promptBuf[promptBuf.length - 1].trim()) promptBuf.pop();
      cur._raw.prompt = promptBuf.join("\n");
    }
    promptBuf = null;
  };

  for (const line of lines) {
    const head = line.match(/^## S(\d{2,})\s*·\s*(.*)$/);
    if (head) {
      flushPrompt();
      cur = { _raw: { slots: [], newSpec: {} }, id: "s" + head[1], role: head[2].trim() };
      report.slides.push(cur); mode = null; continue;
    }
    if (!cur) continue;                       // overview text before the first slide
    if (/^## /.test(line)) { flushPrompt(); cur = null; continue; }

    if (mode === "prompt") {
      if (/^\S/.test(line)) { flushPrompt(); mode = null; }
      else { promptBuf.push(line.startsWith("    ") ? line.slice(4) : line.trimStart()); continue; }
    }
    const top = line.match(/^- ([a-z_]+):\s?(.*)$/);
    if (top) {
      const [, key, val] = top;
      mode = null;
      if (key === "slots") mode = "slots";
      else if (key === "new_component") mode = "new";
      else if (key === "prompt") {
        if (val.trim() === "|" || val.trim() === "") { mode = "prompt"; promptBuf = []; }
        else cur._raw.prompt = val;
      } else cur._raw[key] = val.trim();
      continue;
    }
    const sub = line.match(/^\s{2,}- ([^:]+?):\s?(.*)$/);
    if (sub && mode === "slots") { cur._raw.slots.push([sub[1].trim(), sub[2]]); continue; }
    if (sub && mode === "new") { cur._raw.newSpec[sub[1].trim()] = sub[2].trim(); continue; }
    if (line.trim()) report.warnings.push(`${cur.id}: unread line "${line.trim().slice(0, 60)}"`);
  }
  flushPrompt();

  report.slides = report.slides.map(raw => {
    const r = raw._raw;
    const s = { id: raw.id };
    let comp = (r.component || "").trim();
    const isNew = /^NEW\s+/i.test(comp);
    if (isNew) {
      comp = comp.replace(/^NEW\s+/i, "").trim();
      report.newComponents.push({ slide: raw.id, type: comp, purpose: r.newSpec.purpose || null, slots: r.newSpec.slots || null,
        alreadyImplemented: KNOWN_TYPES.has(comp) });
    } else if (!KNOWN_TYPES.has(comp)) {
      report.warnings.push(`${raw.id}: unknown component "${comp}" — implement it first (NEW path)`);
    }
    s.type = comp;
    s.theme = r.theme || "light";
    if (comp === "pink-reversal" && s.theme !== "bling") {
      report.warnings.push(`${raw.id}: pink-reversal theme "${s.theme}" -> rendered as bling`);
      s.theme = "bling";
    }
    s.role = raw.role;                        // scenario label, not rendered
    if (r.title !== undefined) s.title = screenText(r.title);
    const ren = SLOT_RENAME[comp] || {};
    const given = new Set(r.slots.map(([p]) => p.split(".")[0]));
    for (let [path, val] of r.slots) {
      const first = path.split(".")[0];
      if (ren[first]) {
        if (given.has(ren[first])) report.warnings.push(`${raw.id}: both "${first}" and "${ren[first]}" given; kept "${ren[first]}"`);
        else path = [ren[first], ...path.split(".").slice(1)].join(".");
      }
      const leaf = path.split(".").pop();
      // prompt-box prompt, command-box command, command-list items.N.command: copied byte-for-byte
      const isRaw = path === "prompt" || leaf === "command";
      let v = isRaw ? val : screenText(val);
      // image slots may hold the "[강사 캡처 예정]" placeholder (screenshot-slot image, capture-compare cases.N.before/after)
      const isImageSlot = path === "image" || (comp === "capture-compare" && (leaf === "before" || leaf === "after"));
      if (!isRaw && /^\[강사/.test(v.trim()) && !isImageSlot)
        report.warnings.push(`${raw.id}: lecturer marker on screen slot "${path}"`);
      setPath(s, path, isRaw ? v : coerce(leaf, v));
    }
    if (r.prompt !== undefined) s.prompt = r.prompt;  // byte-for-byte
    for (const f of ALWAYS_RENDERED[comp] || []) if (s[f] === undefined) s[f] = "";
    if (comp === "command-list") {
      const n = len(s.items);
      if (n < 2 || n > 4) report.warnings.push(`${raw.id}: command-list has ${n} items (expected 2-4)`);
      (s.items || []).forEach((it, i) => {
        if (!it || typeof it !== "object" || !String(it.command || "").trim()) report.warnings.push(`${raw.id}: command-list items.${i}.command missing`);
      });
    }
    if (comp === "capture-compare") {
      const n = len(s.cases);
      if (n < 2 || n > 3) report.warnings.push(`${raw.id}: capture-compare has ${n} cases (expected 2-3)`);
      (s.cases || []).forEach((c, i) => {
        for (const k of ["label", "before", "after"])
          if (!c || typeof c !== "object" || !String(c[k] || "").trim()) report.warnings.push(`${raw.id}: capture-compare cases.${i}.${k} missing`);
      });
    }
    if (comp === "outcome-cards") {
      const n = len(s.items);
      if (n < 2 || n > 4) report.warnings.push(`${raw.id}: outcome-cards has ${n} items (expected 2-4)`);
      (s.items || []).forEach((it, i) => {
        for (const k of ["icon", "label"])
          if (!it || typeof it !== "object" || !String(it[k] || "").trim()) report.warnings.push(`${raw.id}: outcome-cards items.${i}.${k} missing`);
        if (it && it.visual && !OC_VISUALS.includes(it.visual))
          report.warnings.push(`${raw.id}: outcome-cards items.${i}.visual "${it.visual}" unknown (drawn as icon)`);
      });
    }
    if (s.variant !== undefined) {
      const ok = VARIANTS[comp];
      if (!ok) report.warnings.push(`${raw.id}: variant is only read by big-question and key-message`);
      else if (s.variant && !ok.includes(s.variant)) report.warnings.push(`${raw.id}: ${comp} variant "${s.variant}" unknown (expected ${ok.join(" or ")})`);
    }
    if (r.skip_if_short === "true") s.skipIfShort = true;
    s.builds = buildsFor(s);
    s.notes = r.notes || "";
    if (!r.notes) report.warnings.push(`${raw.id}: notes missing`);
    return s;
  });
  return report;
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, "/").split("/").pop())) {
  const file = process.argv[2];
  if (!file) { console.error("usage: node slides-md-to-json.mjs SLIDES.md [--slides]"); process.exit(2); }
  const rep = parseSlidesMd(readFileSync(file, "utf8"));
  const out = process.argv.includes("--slides") ? rep.slides : rep;
  process.stdout.write(JSON.stringify(out, null, 2) + "\n");
  if (rep.warnings.length) console.error(rep.warnings.map(w => "warn: " + w).join("\n"));
}
