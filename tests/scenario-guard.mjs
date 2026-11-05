// Guards for the lecture-scenario additions: templates, catalog entries and the SLIDES.md reader.
// run: node tests/scenario-guard.mjs
import { readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = p => readFileSync(join(root, p), "utf8").replace(/\r\n/g, "\n");
const tpl = read("references/added-templates.md");
const reg = read("references/component-registry.md");
const gallery = read("component-gallery.html");
const skill = read("SKILL.md");
const { parseSlidesMd, KNOWN_TYPES } = await import(pathToFileURL(join(root, "scripts", "slides-md-to-json.mjs")).href);

const checks = [];
const ok = (name, cond) => checks.push({ name, pass: !!cond });

const NEW = [
  ["prompt-box", "PromptBox", 83], ["screenshot-slot", "ScreenshotSlot", 84],
  ["pink-reversal", "PinkReversal", 85], ["command-box", "CommandBox", 86],
  ["before-after-panel", "BeforeAfterPanel", 15], ["command-list", "CommandList", 87],
  ["capture-compare", "CaptureCompare", 88], ["outcome-cards", "OutcomeCards", 89],
];
for (const [type, fn, n] of NEW) {
  ok(`${type}: component function`, new RegExp(`function ${fn}\\(\\{s,step\\}\\)`).test(tpl));
  ok(`${type}: switch case`, new RegExp(`case "${type}":\\s+return <${fn} `).test(tpl));
  ok(`${type}: registry #${n}`, new RegExp(`\\| ${n} \\| \`${type}\``).test(reg));
  ok(`${type}: reader knows type`, KNOWN_TYPES.has(type));
  if (n !== 15) ok(`${type}: gallery #${n}`, new RegExp(`\\{n:${n},type:"${type}"`).test(gallery));
}
ok("copy helper shared (useCopy)", /function useCopy\(/.test(tpl) && (tpl.match(/useCopy\(s\./g) || []).length === 2);
ok("clipboard fallback present", /execCommand\("copy"\)/.test(tpl) && /navigator\.clipboard/.test(tpl));
ok("prompt not passed through hl()", !/hl\(s\.prompt/.test(tpl) && !/hl\(s\.command/.test(tpl));
ok("bling background defined", /\.app-wrap\.theme-bling\{\s*background:linear-gradient/.test(tpl));
ok("no font-size under 24px in new template code", !/fontSize:(1\d|2[0-3])\b/.test(tpl.slice(tpl.indexOf("## 8. `prompt-box`"))));
ok("SKILL: scenario section", /BRIEF\.md · SLIDES\.md/.test(skill) && /scenario-input\.md/.test(skill));
ok("SKILL: no deleted audit skill reference", !/qqq-slide-emphasis-audit/.test(skill));

// reader on the fixture
const rep = parseSlidesMd(read("tests/fixtures/SLIDES.sample.md"));
const byId = Object.fromEntries(rep.slides.map(s => [s.id, s]));
ok("reader: 17 slides", rep.slides.length === 17);
ok("reader: deck title", rep.deckTitle === "QQQ 새 컴포넌트 시험");
ok("reader: **x** -> *x*", byId.s03.title === "이 프롬프트를 *그대로* 붙여 넣으세요");
ok("reader: prompt kept byte-for-byte", byId.s03.prompt.includes("**굵게**도.") && byId.s03.prompt.includes("\n\n[출력 형식]") && !byId.s03.prompt.startsWith(" "));
ok("reader: dotted array path", JSON.stringify(byId.s06.before.items) === JSON.stringify(["자료 찾기 1시간", "양식 직접 편집", "~매번 처음부터~"]));
ok("reader: literal \\n -> newline", byId.s08.left.body === "웹에서 만들어\n~다운로드~ 해서 쓴다");
ok("reader: backticks stripped", byId.s02.caption === "설치가 끝나면 claude를 입력하세요");
ok("reader: NEW component reported", rep.newComponents.length === 2 && rep.newComponents[0].type === "command-box" && rep.newComponents.every(c => c.alreadyImplemented));
ok("reader: NEW type mapped", byId.s02.type === "command-box" && byId.s02.command === "npm install -g @anthropic-ai/claude-code");
ok("reader: pink-reversal forced bling", byId.s05.theme === "bling" && rep.warnings.some(w => w.includes("s05")));
ok("reader: skip_if_short", byId.s05.skipIfShort === true);
ok("reader: builds per type", JSON.stringify(byId.s06.builds) === JSON.stringify(["title", "before", "arrow", "after", "caption"]) && JSON.stringify(byId.s09.builds) === JSON.stringify(["title", "box"]));
ok("reader: bracket image kept for placeholder", byId.s04.image === "[강사 캡처 예정]");
ok("reader: command-list items", byId.s13.type === "command-list" && byId.s13.items.length === 3
  && byId.s13.items[0].command === "winget install --id OpenJS.NodeJS.LTS -e --source winget" && byId.s13.items[2].label === "Claude *Code*");
ok("reader: command-list builds", JSON.stringify(byId.s13.builds) === JSON.stringify(["title", "i0", "i1", "i2", "hint"]));
ok("reader: command-list no warnings", !rep.warnings.some(w => w.startsWith("s13")));

// command-list template details and reader edge cases
const sec13 = tpl.slice(tpl.indexOf("## 13. `command-list`"), tpl.indexOf("## 14. `capture-compare`"));
ok("command-list: per-row copy hook", /function CommandRow\(/.test(sec13) && /useCopy\(cmd,codeRef\)/.test(sec13) && /<CommandRow /.test(sec13));
ok("command-list: command not passed through hl()", !/hl\(cmd/.test(sec13) && !/hl\(it\.command/.test(sec13));
const code13 = sec13.slice(sec13.indexOf("```jsx"));
ok("command-list: no new UI strings (labels come from useCopy)", !/QQQ_UI\./.test(code13) && !/[가-힣]/.test(code13));
ok("command-list: CSS wraps and scrolls inside the row", /\.qqq-cmdl-code\{[^}]*white-space:pre-wrap[^}]*overflow-wrap:anywhere[^}]*max-height:[^}]*overflow-y:auto/.test(tpl));
ok("command-list: CSS font sizes >= 24px", [...tpl.matchAll(/\.qqq-cmdl[^{]*\{[^}]*\}/g)].every(m => [...m[0].matchAll(/font-size:(\d+)px/g)].every(f => +f[1] >= 24)));
const cl = parseSlidesMd(`# SLIDES — t
## S01 · one
- title: t
- component: command-list
- slots:
  - items.0.label: Raw
  - items.0.command: echo \`a\` **b** \\n c
- notes: n
`);
ok("reader: command-list command byte-for-byte", cl.slides[0].items[0].command === "echo `a` **b** \\n c");
ok("reader: command-list warns outside 2-4", cl.warnings.some(w => /command-list has 1 items/.test(w)));

// capture-compare (No. 88): template, CSS, reader
const sec14 = tpl.slice(tpl.indexOf("## 14. `capture-compare`"), tpl.indexOf("## 15. Kinetic type kit"));
const code14 = sec14.slice(sec14.indexOf("```jsx"));
ok("capture-compare: section 14 and shared CSS heading", sec14.length > 200 && tpl.includes("## 8~18 공용 CSS"));
ok("capture-compare: row, cell and zoom components", /function CaptureRow\(/.test(code14) && /function CaptureCell\(/.test(code14) && /function CaptureZoom\(/.test(code14));
ok("capture-compare: enlarge is a button opening a portal dialog", /<button type="button"[^>]*className="qqq-cc-pair"/.test(code14) && /ReactDOM\.createPortal\(/.test(code14) && /role="dialog"/.test(code14));
ok("capture-compare: Esc closes and nav keys are stopped in capture phase", /addEventListener\("keydown", onKey, true\)/.test(code14) && /e\.key === "Escape"/.test(code14) && /e\.stopPropagation\(\)/.test(code14));
ok("capture-compare: clicks do not move the slide", (code14.match(/e\.stopPropagation\(\); (setOpen\(true\)|onClose\(\))/g) || []).length >= 3);
ok("capture-compare: images resolve through imgSrc (embedded first)", /const imgSrc = /.test(code14) && /id="qqq-images"|getElementById\("qqq-images"\)/.test(code14) && (code14.match(/imgSrc\(/g) || []).length >= 2);
ok("screenshot-slot: uses imgSrc too", /<img src=\{imgSrc\(s\.image\)\}/.test(tpl));
ok("capture-compare: no new Korean UI strings in code", !/[가-힣]/.test(code14.replace(/\/\/.*$/gm, "")));
ok("capture-compare: CSS font sizes >= 24px", [...tpl.matchAll(/\.qqq-cc[^{]*\{[^}]*\}/g)].every(m => [...m[0].matchAll(/font-size:(\d+)px/g)].every(f => +f[1] >= 24)) && /\.qqq-cc-zoom\{/.test(tpl));
ok("reader: capture-compare cases", byId.s14.type === "capture-compare" && byId.s14.cases.length === 2
  && byId.s14.cases[0].label === "Date and *weekday*" && byId.s14.cases[0].before === "assets/case-a-before.png" && byId.s14.cases[1].after === "[강사 캡처 예정]");
ok("reader: capture-compare builds", JSON.stringify(byId.s14.builds) === JSON.stringify(["title", "c0", "c1", "caption"]));
ok("reader: capture-compare placeholder image is not a warning", !rep.warnings.some(w => w.startsWith("s14")));
ok("reader: NEW capture-compare reported as already implemented", rep.newComponents.some(c => c.slide === "s14" && c.type === "capture-compare" && c.alreadyImplemented === true));
const cc = parseSlidesMd(`# SLIDES — t
## S01 · one
- title: t
- component: capture-compare
- slots:
  - cases.0.label: Only
  - cases.0.before: a.png
  - cases.0.note: n
- notes: n
`);
ok("reader: capture-compare warns outside 2-3 and on missing after", cc.warnings.some(w => /capture-compare has 1 cases/.test(w)) && cc.warnings.some(w => /cases\.0\.after missing/.test(w)));

// sections 15-18: kinetic type kit, big-question / key-message new looks, outcome-cards (No. 89)
const sec = (a, b) => tpl.slice(tpl.indexOf(a), tpl.indexOf(b));
const code = t => [...t.matchAll(/```jsx\n([\s\S]*?)```/g)].map(m => m[1]).join("\n");
const s15 = sec("## 15. Kinetic type kit", "## 16. `big-question`"), s16 = sec("## 16. `big-question`", "## 17. `key-message`");
const s17 = sec("## 17. `key-message`", "## 18. `outcome-cards`"), s18 = sec("## 18. `outcome-cards`", "## 8~18 공용 CSS");
const c1518 = code(s15) + code(s16) + code(s17) + code(s18);
const cssAll = tpl.slice(tpl.indexOf("## 8~18 공용 CSS"));
ok("kit: KineticText, useOn, kTokens, Sparkle4, CountText", ["KineticText", "useOn", "kTokens", "Sparkle4", "CountText"].every(f => code(s15).includes(`function ${f}(`)));
ok("kit: source and licence noted (ported, not copied)", /youtube-longform-maker/.test(s15) && /rheps\/youtube-maker/.test(s15) && /no licence/.test(s15) && /re-implemented/.test(s15));
ok("kit: still mode honours reduced motion and review", /prefers-reduced-motion: reduce/.test(code(s15)) && /data-review/.test(code(s15)));
ok("kit: hl() itself unchanged (no sweep in hl)", !/function hl\(/.test(c1518));
ok("big-question: kinetic default + classic variant", /function BigQuestionKinetic\(/.test(code(s16)) && /function BigQuestionClassic\(/.test(code(s16))
  && /s\.variant === "classic" \? <BigQuestionClassic/.test(code(s16)));
ok("key-message: quote default + classic variant", /function KeyMessageQuote\(/.test(code(s17)) && /function KeyMessageClassic\(/.test(code(s17))
  && /s\.variant === "classic" \? <KeyMessageClassic/.test(code(s17)));
ok("big-question / key-message: switch cases", /case "big-question":\s+return <BigQuestion /.test(tpl) && /case "key-message":\s+return <KeyMessage /.test(tpl));
ok("key-message: quote marks drawn in SVG, by-line slot", /function KmMark\(/.test(code(s17)) && /s\.by &&/.test(code(s17)));
ok("big-question: sub line drawn arrow, no box", /qqq-bq-arrow/.test(code(s16)) && !/className="glass/.test(code(s16)));
ok("outcome-cards: all built-in visuals drawn", ["folder-sort", "mini-dashboard", "doc-year-flip", "checklist"].every(k => code(s18).includes(`kind === "${k}"`)) && /OC_VISUALS\.includes\(it\.visual\) \? it\.visual : "icon"/.test(code(s18)));
ok("outcome-cards: icon keys or emoji", /const OC_ICON = \{/.test(code(s18)) && ["folder", "chart", "doc", "check", "calendar", "clock", "spark"].every(k => code(s18).includes(`  ${k}: "M`)));
ok("15-18: no Korean UI strings in code", !/[가-힣]/.test(c1518.replace(/\/\/.*$/gm, "")));
ok("15-18: no inline fontSize under 24", !/fontSize:\s*(1\d|2[0-3])\b/.test(c1518) && !/size=\{(1\d|2[0-3])\}/.test(code(s18).replace(/Sparkle4[^>]*/g, "")));
ok("15-18: CSS font sizes >= 24px", [...cssAll.matchAll(/\.qqq-(kt|kw|mk|bq|km|oc)[^{]*\{[^}]*\}/g)].every(m => [...m[0].matchAll(/font-size:(\d+)px/g)].every(f => +f[1] >= 24)));
ok("15-18: titles >= 48px (question 80, quote 62)", /\.qqq-bq-q\{[^}]*font-size:80px/.test(cssAll) && /\.qqq-km-msg\{[^}]*font-size:62px/.test(cssAll));
ok("15-18: reduced-motion and review blocks", /@media \(prefers-reduced-motion: reduce\)\{\s*\.qqq-kw/.test(cssAll) && /html\[data-review\] \.qqq-kw/.test(cssAll));
ok("reader: outcome-cards", byId.s15.type === "outcome-cards" && byId.s15.items.length === 3 && byId.s15.items[1].icon === "chart"
  && byId.s15.items[0].label === "Sorted *folders*" && byId.s15.items[2].visual === "doc-year-flip");
ok("reader: outcome-cards builds", JSON.stringify(byId.s15.builds) === JSON.stringify(["title", "o0", "o1", "o2", "caption"]) && !rep.warnings.some(w => w.startsWith("s15")));
ok("reader: big-question sub build", JSON.stringify(byId.s16.builds) === JSON.stringify(["question", "sub"]) && byId.s16.sub === "Or will it change *what* we teach?");
ok("reader: key-message by + classic variant", byId.s17.variant === "classic" && byId.s17.by === "Lecturer" && JSON.stringify(byId.s17.builds) === JSON.stringify(["lead", "message", "by"]) && !rep.warnings.some(w => w.startsWith("s17")));
const oc = parseSlidesMd(`# SLIDES — t
## S01 · one
- title: t
- component: outcome-cards
- slots:
  - items.0.label: Only
  - items.0.visual: rocket
  - variant: classic
- notes: n
## S02 · two
- title: t
- component: big-question
- slots:
  - question: q?
  - variant: fancy
- notes: n
`);
ok("reader: outcome-cards warns outside 2-4, missing icon, unknown visual", oc.warnings.some(w => /outcome-cards has 1 items/.test(w)) && oc.warnings.some(w => /items\.0\.icon missing/.test(w)) && oc.warnings.some(w => /visual "rocket" unknown/.test(w)));
ok("reader: variant warnings", oc.warnings.some(w => /s01: variant is only read by/.test(w)) && oc.warnings.some(w => /big-question variant "fancy" unknown/.test(w)));

// contract-name renames (hero-title label, closing-prompt action/chips, four-card cards)
const ren = parseSlidesMd(`# SLIDES — t
## S01 · 표지
- title: 제목 **하나**
- composition: 선언
- component: hero-title
- theme: dark
- slots:
  - label: LECTURE 01
  - subtitle: 부제
- notes: n
## S02 · 묶음
- title: 네 **가지**
- composition: 선언
- component: four-card
- theme: light
- slots:
  - cards.0.emoji: 🅰️
  - cards.0.label: 하나
  - cards.1.emoji: 🅱️
  - cards.1.label: 둘
- notes: n
## S03 · 끝
- title: 끝 **문장**
- composition: 행동 촉구
- component: closing-prompt
- theme: dark
- slots:
  - message: 끝 *문장*
  - action: 3분 적기
  - chips.0: 칩
- notes: n
`);
const [h, f, c] = ren.slides;
ok("rename: hero-title label -> eyebrow", h.eyebrow === "LECTURE 01" && h.label === undefined && h.subtitle === "부제");
ok("rename: four-card cards -> items", Array.isArray(f.items) && f.items[1].label === "둘" && f.cards === undefined);
ok("rename: closing-prompt action -> sub, chips -> items", c.sub === "3분 적기" && c.items[0] === "칩" && c.action === undefined);
ok("rename: no warnings", ren.warnings.length === 0);

let failed = 0;
for (const x of checks) { console.log(`${x.pass ? "PASS" : "FAIL"}  ${x.name}`); if (!x.pass) failed++; }
console.log(`\n${checks.length - failed}/${checks.length} passed`);
process.exit(failed ? 1 : 0);
