// Guard: the QQQ standard background (references/sky-background.css + .js).
// User decision 2026-11-06: "빨리 우리 스킬의 기본 재료로 써. 낮 배경은 무조건 비행기야" — the day (light) background is
// always the airplane sky. This test renders the Background component with a tiny stand-in React and reads the CSS:
//   - a light/day slide renders the airplane sky: 11 white clouds + 10 planes (inline SVG) with contrails, no blob background;
//   - warm maps to the same day sky, dark renders the night sky, bling renders pink;
//   - prefers-reduced-motion stops every moving part of the sky and review mode (html[data-review]) pauses it;
//   - day text tokens keep large-text contrast (>= 3:1) on the darkest sky colour;
//   - the plane is drawn in code (no image file, no URL), and the docs carry the rule.
// run: node tests/sky-guard.mjs
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = p => readFileSync(join(root, p), "utf8").replace(/\r\n/g, "\n");
const css = read("references/sky-background.css");
const js = read("references/sky-background.js");
const require = createRequire(import.meta.url);
globalThis.innerWidth = 1920;
globalThis.addEventListener = () => {};
globalThis.removeEventListener = () => {};

// stand-in React: createElement builds a plain tree, hooks return their initial value
const R = {
  createElement: (type, props, ...kids) => ({ type, props: props || {}, kids: kids.flat(Infinity).filter(k => k != null && k !== false) }),
  useState: v => [v, () => {}],
  useEffect: () => {},
};
globalThis.React = R;
const Sky = require(join(root, "references/sky-background.js"));

const all = (n, out = []) => { out.push(n); (n.kids || []).forEach(k => typeof k === "object" && all(k, out)); return out; };
const render = theme => {
  const tree = Sky.Background({ theme });
  const els = all(tree);
  const cls = c => els.filter(e => (e.props.className || "").split(" ").includes(c));
  return { tree, els, cls };
};

const checks = [];
const ok = (name, cond, detail) => checks.push({ name, pass: !!cond, detail });

// --- theme mapping ---
ok("skyOf: light / warm / missing -> day", ["light", "warm", undefined, ""].every(t => Sky.skyOf(t) === "day"));
ok("skyOf: dark -> night, bling -> pink", Sky.skyOf("dark") === "night" && Sky.skyOf("bling") === "pink");

// --- day = airplane sky ---
for (const theme of ["light", "warm"]) {
  const d = render(theme);
  ok(`${theme}: bg-layer data-sky="day"`, d.tree.props.className === "bg-layer" && d.tree.props["data-sky"] === "day");
  ok(`${theme}: 2 aurora layers`, d.cls("aurora").length === 2);
  ok(`${theme}: 11 white clouds`, d.cls("cloud").length === 11 && d.cls("cloud").filter(c => /255,255,255/.test(c.props.style.background)).length === 9);
  const fl = d.cls("flight");
  ok(`${theme}: 10 planes (.flight) with an inline SVG plane of 5 paths`, fl.length === 10 &&
    fl.every(f => f.kids.length === 1 && f.kids[0].type === "svg" && f.kids[0].kids.filter(p => p.type === "path").length === 5));
  ok(`${theme}: planes cross one at a time (delays 0,12,...,108 s) on straight edge-to-edge routes`,
    fl.map(f => f.props.style["--delay"]).join() === "0s,12s,24s,36s,48s,60s,72s,84s,96s,108s" &&
    fl.every(f => /^path\("M (-60|1980) \d+ L (-60|1980) \d+"\)$/.test(f.props.style.offsetPath)));
  ok(`${theme}: contrail length follows the route`, fl.every(f => f.props.style["--len"] > 1900));
  ok(`${theme}: review stills — first five planes carry negative --rv, the rest 0s`,
    fl.map(f => f.props.style["--rv"]).join() === "-3s,-5s,-7s,-9s,-11s,0s,0s,0s,0s,0s");
  ok(`${theme}: no blob background, no night sky, no sparkles`,
    !d.els.some(e => /\bblob\b|\bb[1-6]\b/.test(e.props.className || "")) && !d.cls("milkyway").length && !d.cls("shoot").length && !d.cls("spark").length);
}

// --- night ---
const n = render("dark");
ok("dark: data-sky=night", n.tree.props["data-sky"] === "night");
ok("dark: milky way + 28 star dust + 18 shooting stars + 24 sparkles", n.cls("milkyway").length === 1 && n.cls("mwdust").length === 28 && n.cls("shoot").length === 18 && n.cls("spark").length === 24);
ok("dark: 6 toned-down colour clouds, no planes", n.cls("cloud").length === 6 && !n.cls("flight").length);

// --- pink ---
const p = render("bling");
ok("bling: data-sky=pink, 6 colour clouds + 24 sparkles, no planes, no night sky",
  p.tree.props["data-sky"] === "pink" && p.cls("cloud").length === 6 && p.cls("spark").length === 24 && !p.cls("flight").length && !p.cls("milkyway").length);
ok("bling: ✨ on the canvas corners", /\.theme-bling \.stage-box::after\{content:"✨"/.test(css) && /\.theme-bling \.stage-box::before\{content:"✨"/.test(css));

// --- plain DOM renderer gives the same children ---
ok("nodes(): day/night/pink child counts match the React render",
  Sky.nodes("light", 1920).length === render("light").tree.kids.length && Sky.nodes("dark", 1920).length === n.tree.kids.length && Sky.nodes("bling", 1920).length === p.tree.kids.length);

// --- CSS: each sky has its own base, the planes animate, contrails fade ---
ok("CSS: day gradient on .bg-layer[data-sky=day] and on .app-wrap.theme-light/.theme-warm",
  /\.bg-layer\[data-sky="day"\]\{background-color:#A5CEEB;background-image:linear-gradient\(180deg,#93C2E6/.test(css) &&
  /\.app-wrap\.theme-light,\.app-wrap\.theme-warm\{background-color:#A5CEEB/.test(css));
ok("CSS: night and pink bases", /\.bg-layer\[data-sky="night"\]\{background:linear-gradient\(135deg,#000000/.test(css) && /\.bg-layer\[data-sky="pink"\]\{background:linear-gradient\(135deg,#FFC2DD/.test(css));
ok("CSS: plane flies along offset-path, body and contrail fade (120 s loop)",
  /\.flight\{[^}]*offset-rotate:auto;[^}]*animation:flight 120s linear var\(--delay\) infinite/.test(css) &&
  /@keyframes flight\{0%\{offset-distance:0%\}10%,100%\{offset-distance:100%\}\}/.test(css) &&
  /\.flight::after\{[^}]*animation:flightTrail 120s/.test(css));
ok("CSS: no blob rules", !/\.blob\b|\.b[1-6]\b/.test(css));

// --- reduced motion and review mode freeze the sky ---
const media = (css.match(/@media \(prefers-reduced-motion:reduce\)\{([\s\S]*?)\n\}/) || [])[1] || "";
const MOVING = [".aurora", ".cloud", ".spark", ".shoot", ".flight", ".flight svg", ".flight::after", ".stage-box::before", ".stage-box::after"];
ok("reduced motion: every moving sky part gets animation:none",
  /animation:none !important/.test(media) && MOVING.every(s => media.split("{")[0].split(",").map(x => x.trim()).includes(s)));
const review = css.replace(/\/\*[\s\S]*?\*\//g, "").match(/(html\[data-review\][^{]*)\{animation-play-state:paused !important;\}/);
ok("review mode: every moving sky part is paused",
  !!review && MOVING.every(s => review[1].split(",").map(x => x.trim()).includes("html[data-review] " + s)));
ok("review mode: planes stop at --rv", /html\[data-review\] \.flight,html\[data-review\] \.flight svg,html\[data-review\] \.flight::after\{animation-delay:var\(--rv\);\}/.test(css));

// --- day text contrast on the darkest sky colour (large text >= 3:1) ---
const lum = hex => { const c = hex.replace("#", ""); return [0, 2, 4].map(i => parseInt(c.slice(i, i + 2), 16) / 255)
  .map(v => v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4).reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0); };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, k) => k - m); return (x + 0.05) / (y + 0.05); };
const tokens = Object.fromEntries([...(css.match(/\.app-wrap\.theme-light,\.app-wrap\.theme-warm\{\n\s*(--muted[^}]*)\}/) || ["", ""])[1].matchAll(/--([a-z]+):(#[0-9A-Fa-f]{6})/g)].map(m => [m[1], m[2]]));
const low = Object.entries({ ink: "#0F172A", ...tokens }).map(([k, v]) => [k, v, ratio(v, "#93C2E6")]).filter(([, , r]) => r < 3);
ok("day text tokens: muted, blue, sky, emerald, rose, amber, teal are overridden", ["muted", "blue", "sky", "emerald", "rose", "amber", "teal"].every(k => tokens[k]));
ok("day text tokens: every one >= 3:1 on #93C2E6", !low.length, low.map(([k, v, r]) => `${k} ${v} ${r.toFixed(2)}:1`));

// --- template text sits on the sky: its colour comes from the theme variables (day deepens them), not from PCOL hex ---
const tplJsx = [...read("references/added-templates.md").matchAll(/```jsx\n([\s\S]*?)```/g)].map(m => m[1]).join("\n");
const hexText = [...tplJsx.matchAll(/[{,]\s*color\s*:\s*[^,}]*PCOL\.[^,}]*/g)].map(m => m[0].trim());
ok("added-templates: text colours use var(--…), never PCOL hex (bridge arrow labels, tradeoff, reasons labels)", !hexText.length, hexText);

// --- the plane is code, not an image; nothing is fetched ---
ok("sky script: no image files, no URLs (only the SVG namespace)",
  !/\.(png|jpe?g|gif|webp|svg)["']/i.test(js) && !/url\(/.test(js) && [...js.matchAll(/https?:\/\/[^\s"']+/g)].every(m => m[0] === "http://www.w3.org/2000/svg"));
ok("sky CSS: no external url()", !/url\(/.test(css));

// --- the rule is written down where the skill reads it, and the galleries use the sky ---
const RULE = /낮\(라이트\) 배경은 항상 비행기 하늘\. 다른 배경으로 바꾸지 않는다/;
for (const f of ["SKILL.md", "references/architecture.md", "references/motion-theme-upgrades.md", "references/design-and-readability.md"])
  ok(`${f}: states the airplane-sky rule with the 2026-11-06 user decision`, RULE.test(read(f)) && /2026-11-06/.test(read(f)));
ok("SKILL.md: no pastel mesh light default left", !/기본 라이트는 블루\/하늘\/틸 파스텔 메시/.test(read("SKILL.md")) && !/드리프트 글로우 블롭 5~6개/.test(read("SKILL.md")));
for (const f of ["component-gallery.html", "component-gallery-v2.html", "_kit-catalog.html"]) {
  const h = read(f);
  ok(`${f}: draws the day sky (sky-background.css/js + QQQSky.mount) and has no blob background`,
    /references\/sky-background\.css/.test(h) && /references\/sky-background\.js/.test(h) && /QQQSky\.mount\(document\.getElementById\("sky"\), "light"\)/.test(h) && !/class="blob/.test(h));
}

let failed = 0;
for (const c of checks) {
  console.log(`${c.pass ? "PASS" : "FAIL"}  ${c.name}`);
  if (!c.pass) { failed++; if (c.detail) console.log("      " + JSON.stringify(c.detail)); }
}
console.log(`\n${checks.length - failed}/${checks.length} passed`);
process.exit(failed ? 1 : 0);
