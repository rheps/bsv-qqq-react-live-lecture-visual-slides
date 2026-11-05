// Guard: CSS class names from different references must not collide when they are pasted into one deck.
// A deck pastes CSS and JSX from several reference files into one page. A bare rule such as `.b1 { width:56vh }`
// (background blob) then also hits every other element with a `b1` class (outcome-cards' dashboard bars were
// drawn as huge circles over the slide). Rules checked here:
//   A. no CSS compound made only of short classes (`.b1`, `.n2`, `.bar`), unless it is shared base vocabulary.
//      Short classes stay compound with a longer one (`.blob.b1`, `.aurora.b`) or get a prefix.
//   B. no className token used by one reference file's JSX (or the gallery kit's HTML) matches a bare CSS rule
//      defined in another reference file.
//   C. component code in added-templates.md sections 8-18 uses prefixed classes only (`qqq-`, `oc-`, state `is-`)
//      apart from the shared base vocabulary.
// run: node tests/class-collision-guard.mjs
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = p => readFileSync(join(root, p), "utf8").replace(/\r\n/g, "\n");

// Shared base vocabulary every deck defines once and every template uses on purpose: the layout and type
// classes, the background layer, the runtime chrome (nav buttons, editor button, key hint, progress bar)
// and the shared idle-animation classes (anim-*). New component classes do not go here; they get a prefix.
export const SHARED = new Set(["box", "glass", "glass-card", "stage", "stage-box", "app-wrap", "bg-layer", "eyebrow", "t-hero", "t-title",
  "t-sub", "t-cap", "t-label", "t-body", "t-sm", "nofm", "show", "visible", "spring-pop", "build", "emoji-md",
  "nav", "editbtn", "hint"]);
const SHARED_PREFIX = ["theme-", "is-", "anim-", "progress-"];
const isShort = c => c.length <= 3 || /^[a-z]{1,2}\d+$/.test(c);
const shared = c => SHARED.has(c) || SHARED_PREFIX.some(p => c.startsWith(p));

const fences = (md, lang) => [...md.matchAll(new RegExp("```" + lang + "\\n([\\s\\S]*?)```", "g"))].map(m => m[1]).join("\n");

// CSS -> list of selectors (comments, @keyframes bodies and at-rule headers removed; @media bodies kept)
export function cssSelectors(css) {
  const t = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const out = [];
  let buf = "";
  for (let i = 0; i < t.length; i++) {
    const ch = t[i];
    if (ch === "{") {
      const sel = buf.trim(); buf = "";
      if (/^@(-webkit-)?keyframes|^@font-face/.test(sel)) { // skip the whole block
        let d = 1; while (d && ++i < t.length) { if (t[i] === "{") d++; else if (t[i] === "}") d--; }
        continue;
      }
      if (sel.startsWith("@")) continue;                     // @media / @supports: read the rules inside
      if (sel) out.push(sel);
      let d = 1; while (d && ++i < t.length) { if (t[i] === "{") d++; else if (t[i] === "}") d--; }
    } else if (ch === "}") buf = "";
    else buf += ch;
  }
  return out;
}
const splitTop = (s, seps) => {
  const out = []; let d = 0, cur = "";
  for (const ch of s) {
    if (ch === "(" || ch === "[") d++; else if (ch === ")" || ch === "]") d--;
    if (!d && seps.includes(ch)) { out.push(cur); cur = ""; } else cur += ch;
  }
  out.push(cur);
  return out.map(x => x.trim()).filter(Boolean);
};
// "a .b, .c:hover > .d.e" -> [[["b"]], [["c"], ["d","e"]]]  (classes per compound, pseudo/attr parts ignored)
export function compounds(selector) {
  return splitTop(selector, [","]).map(sel =>
    splitTop(sel, [" ", ">", "+", "~", "\n", "\t"]).map(cp =>
      [...cp.replace(/::?[\w-]+(\([^)]*\))?/g, "").replace(/\[[^\]]*\]/g, "").matchAll(/\.(-?[A-Za-z_][\w-]*)/g)].map(m => m[1])));
}

// JSX / HTML -> { tokens:Set (static class names), prefixes:Set (a literal followed by `+ x` or `${x}`) }
export function classUsage(src) {
  const tokens = new Set(), prefixes = new Set();
  const addLit = (lit, dynamicAfter) => {
    const parts = lit.split(/\s+/).filter(Boolean);
    if (dynamicAfter && parts.length && !/\s$/.test(lit)) prefixes.add(parts.pop());
    parts.forEach(p => tokens.add(p));
  };
  for (const m of src.matchAll(/className="([^"]*)"/g)) addLit(m[1], false);
  for (const m of src.matchAll(/\bclass="([^"$]*)"/g)) addLit(m[1], false);
  let i = 0;
  while ((i = src.indexOf("className={", i)) >= 0) {
    let j = i + 11, d = 1;
    while (d && j < src.length) { if (src[j] === "{") d++; else if (src[j] === "}") d--; j++; }
    const expr = src.slice(i + 11, j - 1);
    for (const m of expr.matchAll(/"([^"]*)"|'([^']*)'|`([^`]*)`/g)) {
      if (m[3] !== undefined) {
        const pieces = m[3].split(/\$\{[^}]*\}/);
        pieces.forEach((p, k) => addLit(p, k < pieces.length - 1));
      } else {
        const after = expr.slice(m.index + m[0].length), before = expr.slice(0, m.index);
        if (/[=!]==?\s*$/.test(before) || /^\s*[=!]==?/.test(after)) continue;   // st === "done": a comparison, not a class
        addLit(m[1] ?? m[2], /^\s*\+/.test(after));
      }
    }
    i = j;
  }
  return { tokens, prefixes };
}

// --- the three rules, as functions so the self-test below can feed them a known bad case ---
export function ruleA(cssByFile) {
  const bad = [];
  for (const [file, css] of Object.entries(cssByFile))
    for (const sel of cssSelectors(css))
      for (const chain of compounds(sel))
        for (const cls of chain)
          if (cls.length && cls.every(isShort) && !cls.some(shared)) bad.push(`${file}: "${sel.slice(0, 70)}" -> .${cls.join(".")}`);
  return bad;
}
export function bareClasses(css) {          // class names that are the whole subject of a rule
  const out = new Set();
  for (const sel of cssSelectors(css))
    for (const chain of compounds(sel)) { const last = chain[chain.length - 1] || []; if (last.length === 1) out.add(last[0]); }
  return out;
}
export function ruleB(cssByFile, usageByFile) {
  const bad = [];
  const bare = Object.fromEntries(Object.entries(cssByFile).map(([f, css]) => [f, bareClasses(css)]));
  for (const [uf, src] of Object.entries(usageByFile)) {
    const { tokens, prefixes } = classUsage(src);
    for (const [cf, set] of Object.entries(bare)) {
      if (cf === uf) continue;
      for (const c of set) {
        if (shared(c)) continue;
        if (tokens.has(c)) bad.push(`${uf} uses class "${c}", which ${cf} styles with a bare .${c} rule`);
        for (const p of prefixes) if (!shared(p) && c.startsWith(p) && c !== p && /^[\d]/.test(c.slice(p.length)))
          bad.push(`${uf} builds class "${p}<n>", which ${cf} styles with a bare .${c} rule`);
      }
    }
  }
  return bad;
}
const PREFIXED = c => /^(qqq-|oc-|is-)/.test(c) || SHARED.has(c);
export function ruleC(jsx) {
  const { tokens, prefixes } = classUsage(jsx);
  return [...[...tokens].filter(t => !PREFIXED(t)).map(t => `class "${t}" has no component prefix`),
    ...[...prefixes].filter(p => !PREFIXED(p) && !shared(p)).map(p => `built class "${p}…" has no component prefix`)];
}

// --- inputs ---
const refs = readdirSync(join(root, "references")).filter(f => f.endsWith(".md"));
const mdByFile = Object.fromEntries(refs.map(f => [f, read("references/" + f)]));
const cssByFile = Object.fromEntries(refs.map(f => [f, fences(mdByFile[f], "css")]));
const usageByFile = Object.fromEntries(refs.map(f => [f, fences(mdByFile[f], "jsx")]));
usageByFile["qqq-component-kit.js"] = read("references/qqq-component-kit.js");
const tpl = mdByFile["added-templates.md"];
const jsx818 = fences(tpl.slice(tpl.indexOf("## 8. `prompt-box`"), tpl.indexOf("## 8~18 공용 CSS")), "jsx");

const checks = [];
const ok = (name, cond, detail = []) => checks.push({ name, pass: !!cond, detail });

// self-test: the original collision (bare .b1 blob + outcome-cards "b" + k bars) must be caught
const demoCss = { "motion.md": ".blob { position:absolute; }\n.b1 { width:56vh; }\n.theme-dark .b1 { opacity:.4; }" };
const demoUse = { "tpl.md": '<rect key={k} className={"oc-bar b" + k}/>' };
ok("self-test: rule A flags a bare .b1", ruleA(demoCss).length === 2);
ok("self-test: rule B flags \"b\" + k against a bare .b1 in another file", ruleB(demoCss, demoUse).some(x => /b<n>/.test(x)));
ok("self-test: rule C flags an unprefixed modifier", ruleC(demoUse["tpl.md"]).some(x => /"b…"/.test(x)));
ok("self-test: scoped .blob.b1 and prefixed oc-b<n> pass",
  !ruleA({ m: ".blob.b1{} .theme-dark .blob.b1{}" }).length && !ruleB({ m: ".blob.b1{}" }, { t: '<rect className={"oc-bar oc-b" + k}/>' }).length);
ok("self-test: parser reads selectors inside @media and skips @keyframes",
  JSON.stringify(cssSelectors("@media (x){ .a .b1{c:d} }\n@keyframes k{ 0%{a:b} }\n.z{}")) === JSON.stringify([".a .b1", ".z"]));

const a = ruleA(cssByFile), b = ruleB(cssByFile, usageByFile), c = ruleC(jsx818);
ok("A: no bare short class rules in references/*.md CSS", !a.length, a);
ok("B: no class used in one reference is styled by a bare rule in another", !b.length, b);
ok("C: added-templates 8-18 component classes are prefixed", !c.length, c);
ok("motion-theme blobs are scoped (.blob.bN)", /\.blob\.b1 \{/.test(cssByFile["motion-theme-upgrades.md"]) && !/(^|\s)\.b[1-6]\s*\{/m.test(cssByFile["motion-theme-upgrades.md"]));
ok("outcome-cards bars are prefixed (oc-b<n>)", /"oc-bar oc-b" \+ k/.test(tpl) && /\.oc-bar\.oc-b3/.test(tpl));

let failed = 0;
for (const x of checks) {
  console.log(`${x.pass ? "PASS" : "FAIL"}  ${x.name}`);
  if (!x.pass) { failed++; x.detail.slice(0, 20).forEach(d => console.log("      " + d)); }
}
console.log(`\n${checks.length - failed}/${checks.length} passed`);
process.exit(failed ? 1 : 0);
