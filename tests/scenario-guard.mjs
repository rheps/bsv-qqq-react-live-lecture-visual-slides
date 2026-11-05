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
ok("reader: 13 slides", rep.slides.length === 13);
ok("reader: deck title", rep.deckTitle === "QQQ 새 컴포넌트 시험");
ok("reader: **x** -> *x*", byId.s03.title === "이 프롬프트를 *그대로* 붙여 넣으세요");
ok("reader: prompt kept byte-for-byte", byId.s03.prompt.includes("**굵게**도.") && byId.s03.prompt.includes("\n\n[출력 형식]") && !byId.s03.prompt.startsWith(" "));
ok("reader: dotted array path", JSON.stringify(byId.s06.before.items) === JSON.stringify(["자료 찾기 1시간", "양식 직접 편집", "~매번 처음부터~"]));
ok("reader: literal \\n -> newline", byId.s08.left.body === "웹에서 만들어\n~다운로드~ 해서 쓴다");
ok("reader: backticks stripped", byId.s02.caption === "설치가 끝나면 claude를 입력하세요");
ok("reader: NEW component reported", rep.newComponents.length === 1 && rep.newComponents[0].type === "command-box" && rep.newComponents[0].alreadyImplemented);
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
const sec13 = tpl.slice(tpl.indexOf("## 13. `command-list`"), tpl.indexOf("## 8~13"));
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
