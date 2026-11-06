# motion-theme-upgrades.md — 동적 모션·테마 업그레이드

실제 강의 덱을 다듬으며 나온 피드백에서 정리한 업그레이드 모음이다. 다음 8가지를 다룬다.

1. 요소마다 다른 등장(모션 다양화 — "다 똑같이 띠용 튕긴다" 탈피)
2. Magic-Move 모핑(`layoutId` — 슬라이드 간 요소가 이어지며 변형)
3. 연결선·화살표 draw-on(`pathLength`)
4. **테마별 강조색**(다크에서 색 글씨가 묻히지 않게 — 가장 중요)
5. 밑줄형 Eyebrow(양옆 줄/알약 박스 폐기)
6. 다크 = 진짜 어둡게 + **밤하늘 배경**(은하수·별·별똥별)
7. 라이트 글래스 투명도(선택)
8. **배경 = 스킬 기본 하늘** — 낮(라이트) 배경은 항상 비행기 하늘(사용자 결정 2026-11-06), 다크는 밤하늘, bling은 핑크

> **충돌 시 이 문서가 우선.** 기존 `design-and-readability.md` 3-g("등장은 spring-pop 하나로 통일")와 3-f/3-e("다크에서 blob 더 진하게", 파스텔 라이트 배경)는 아래 1·6·8번으로 대체된다. `motion-system.md`의 모션 배정표는 1·2·3번으로 확장된다. `hl()`(design 3-b)은 코드 그대로 두되, 4번의 테마 변수 override를 추가하면 다크 가독성이 해결된다.

---

## 1. 요소마다 다른 등장 — 모션 다양화

문제: 등장 프리셋을 한 종류만 쓰면 모든 요소가 같은 스프링 팝으로 "띠용"만 반복해 단조롭다. (실제 피드백: "요소요소가 그냥 띠용 튕겨져 나오는 것밖에 없다.")

해법: **프리셋을 여러 개 두고, 요소 종류로 자동 배정하고, 카드 줄은 방향을 번갈아** 들어오게 한다. (캔버스 `overflow:visible` 전제 — `motion-system.md` 4절. 가로 이동도 안 잘림.)

```jsx
const M_OK = !!(window.Motion && window.Motion.motion);
const M = M_OK ? window.Motion.motion : null;
const EASE_OUT = [0.22, 1, 0.36, 1];

// from(숨김)/to(보임)/t(transition) — 11종
const PRESETS = {
  pop:   { from:{opacity:0,scale:0.7,y:24},                 to:{opacity:1,scale:1,y:0},                 t:{type:"spring",stiffness:320,damping:18} },
  rise:  { from:{opacity:0,y:46},                           to:{opacity:1,y:0},                          t:{duration:0.6,ease:EASE_OUT} },
  fall:  { from:{opacity:0,y:-46},                          to:{opacity:1,y:0},                          t:{duration:0.6,ease:EASE_OUT} },
  left:  { from:{opacity:0,x:-80},                          to:{opacity:1,x:0},                          t:{duration:0.62,ease:EASE_OUT} },
  right: { from:{opacity:0,x:80},                           to:{opacity:1,x:0},                          t:{duration:0.62,ease:EASE_OUT} },
  zoom:  { from:{opacity:0,scale:0.82},                     to:{opacity:1,scale:1},                      t:{duration:0.55,ease:EASE_OUT} },
  blur:  { from:{opacity:0,filter:"blur(14px)",y:12},       to:{opacity:1,filter:"blur(0px)",y:0},       t:{duration:0.7,ease:EASE_OUT} },
  flipX: { from:{opacity:0,rotateX:-78,y:18,transformPerspective:900}, to:{opacity:1,rotateX:0,y:0,transformPerspective:900}, t:{duration:0.7,ease:EASE_OUT} },
  flipY: { from:{opacity:0,rotateY:70,transformPerspective:900},       to:{opacity:1,rotateY:0,transformPerspective:900},     t:{duration:0.7,ease:EASE_OUT} },
  tilt:  { from:{opacity:0,scale:0.7,rotate:7},             to:{opacity:1,scale:1,rotate:0},             t:{type:"spring",stiffness:300,damping:16} },
  // 제목용 "모핑" 느낌: 좌→우 와이프(클립) 리빌
  reveal:{ from:{clipPath:"inset(0 100% 0 0)",opacity:0.001}, to:{clipPath:"inset(0 0% 0 0)",opacity:1}, t:{duration:0.7,ease:EASE_OUT} },
};

// 요소 종류로 어울리는 프리셋 자동 선택(명시 anim이 우선)
function autoAnim(kind, explicit){
  if(explicit) return explicit;
  if(kind==="title")   return "reveal"; // 제목 = 좌→우 와이프
  if(kind==="sub")     return "blur";   // 부제 = 블러 걷힘
  if(kind==="caption") return "rise";   // 캡션 = 아래에서 떠오름
  return "pop";
}

// MotionItem(motion-system.md) 옆에 두는 프리셋 래퍼.
function Anim({show, anim, kind, delay=0, hover, className, style, children}){
  if(!M_OK) return <div className={(className||"")+" nofm"+(show?" show":"")} style={style}>{children}</div>;
  const p = PRESETS[autoAnim(kind, anim)] || PRESETS.pop;
  return (
    <M.div className={className} style={style}
      initial={p.from} animate={show ? p.to : p.from} transition={{...p.t, delay}}
      whileHover={hover ? {scale:1.05,y:-7,transition:{type:"spring",stiffness:400,damping:18}} : undefined}>
      {children}
    </M.div>
  );
}
```

### 배정 규칙(이웃은 서로 다르게)

| 요소 | anim |
|---|---|
| 제목(hero/title) | `reveal`(좌→우 와이프) |
| 부제 | `blur` |
| 캡션 | `rise` |
| 카드 줄(3장) | `["left","flipX","right"][i]` — 왼쪽 카드는 왼쪽에서, 가운데는 플립, 오른쪽은 오른쪽에서 |
| 2분할(대조/from-to) | 왼쪽 `left` · 오른쪽 `right` · 화살표 `zoom` |
| 칩·배지 | `zoom` / `tilt` |
| 허브·중앙 카드 | `flipX` |
| 큰 이모지 | `flipX` 또는 `tilt`(등장) + 기존 idle(지속) |

핵심: **인접한 요소가 같은 방향/유형으로 우르르 들어오지 않게** 한다. 한 줄의 카드는 좌·우로 갈라 들어오고, 가운데는 플립/줌으로 다르게. 그러면 같은 화면 안에서 모션이 다채로워진다. (읽는 글씨에 *지속* 모션을 거는 금지 규칙은 그대로 — 여기 다양화는 **등장(enter)** 한정.)

---

## 2. Magic-Move 모핑 (`layoutId`)

키노트 Magic Move / PPT 모핑처럼, **슬라이드를 넘길 때 공유 요소가 옛 위치·크기에서 새 위치·크기로 미끄러지며 변형**되게 한다. 거의 모든 슬라이드에 있는 **Eyebrow(섹션 라벨)**를 앵커로 쓰는 게 가장 자연스럽다(내용 높이에 따라 위치·너비가 달라져 모핑이 눈에 띈다).

> **기본값(사용자 확정):** 새 덱은 **모핑을 켠다**(Eyebrow `layoutId="sectionTag"`) + 슬라이드 전환은 변형 없는 **크로스페이드**(`STAGE_FADE` = opacity만). "5종 화려한 슬라이드 전환"(가로 슬라이드·3D 회전)은 **모핑을 끌 때만** 쓰는 대안 — 모핑과 동시에 못 간다(아래 트레이드오프). 화면 안의 풍부함은 요소별 등장 다양화(1번) + 화려한 배경(8번)으로 채운다.

```jsx
const AP = window.Motion.AnimatePresence;
const M  = window.Motion.motion;

// 모든 슬라이드의 Eyebrow에 같은 layoutId
function Eyebrow({children}){
  return <M.div className="eyebrow" layoutId="sectionTag"
    transition={{duration:0.55, ease:[0.22,1,0.36,1]}}>{children}</M.div>;
}
```

### 필수 조건 — 전환은 "변형 없는 크로스페이드"

`layoutId` 모핑은 요소의 **화면상 박스를 측정**해 보간한다. 그래서 상위(스테이지) 컨테이너가 `x`/`scale`/`rotate`로 움직이면 측정이 흔들려 모핑이 튄다. 모핑을 쓰려면:

- 슬라이드 전환을 **`AnimatePresence` 기본(sync) 모드 + opacity 크로스페이드만**으로 둔다. (옛 슬라이드와 새 슬라이드가 잠시 공존해야 공유요소가 이어진다 — `mode="wait"`는 옛 것을 먼저 내보내서 모핑이 안 생긴다.)
- 스테이지에 `x/scale/rotateY` 같은 변형 전환을 주지 않는다.

```jsx
<AP initial={false}>
  <M.div key={cur.id} className="fmstage"
    initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
    transition={{duration:0.45, ease:[0.22,1,0.36,1]}}>
    <Slide s={cur} step={step}/>
  </M.div>
</AP>
```

**트레이드오프:** 화려한 슬라이드 전환(가로 슬라이드·3D 회전)과 `layoutId` 모핑은 동시에 못 간다. 둘 중 하나만 — 모핑을 택하면 슬라이드 전환은 크로스페이드, 요소별 등장 다양화(1번)로 화면 안의 풍부함을 채운다.

---

## 3. 연결선·화살표 draw-on (`pathLength`)

SVG 연결선/화살표는 단순 페이드 대신 **선이 그어지듯** 등장시킨다.

```jsx
<M.path d={d} fill="none" stroke={c} strokeWidth="5" strokeLinecap="round"
  markerEnd={`url(#ar-${color})`}
  initial={{pathLength:0, opacity:0}}
  animate={vis ? {pathLength:1, opacity:1} : {pathLength:0, opacity:0}}
  transition={{duration:0.75, ease:"easeInOut"}}/>
```

`stroke`/marker `fill`은 SVG 프레젠테이션 속성이라 `var(--x)`를 해석하지 못한다 → **SVG에는 hex를 쓴다**(4번의 텍스트 변수와 분리).

---

## 4. 테마별 강조색 — 다크에서 색 글씨가 묻히지 않게 ★중요

문제(실제 피드백): 다크 슬라이드에서 **흰 글씨(제목)는 잘 보이는데 `*파랑*`·`_초록_`·카드 라벨 같은 색 글씨가 묻혀 안 보인다.** 강조색(`#3B82F6`, `#10B981`, `#F43F5E`)이 라이트 배경 기준이라 검정 위에서 저대비이기 때문.

해법: **강조색을 CSS 변수로 두고 `.theme-dark`에서 밝은 톤으로 override** + 옅은 그림자. 그러면 `hl()`(이미 `var(--blue)` 등 사용)과 카드 라벨이 다크에서 자동으로 밝아진다.

```css
:root, .app-wrap {
  --blue:#3B82F6; --sky:#0EA5E9; --emerald:#10B981;
  --rose:#F43F5E; --amber:#F59E0B; --teal:#14B8A6;
}
/* 다크: 강조색을 밝은 톤으로 일괄 교체(제목 hl·카드 라벨·테두리가 같은 밝은 팔레트) */
.app-wrap.theme-dark {
  --blue:#7AB8FF; --sky:#4FD0FF; --emerald:#3EE0A3;
  --rose:#FF8095; --amber:#FBC560; --teal:#45D6C4;
}
/* 다크에서 강조 글씨 외곽에 옅은 어둠을 깔아 대비 ↑ (그라디언트 칸은 drop-shadow) */
.theme-dark .hl-b { filter: drop-shadow(0 1px 6px rgba(0,0,0,.55)); }
.theme-dark .hl-r, .theme-dark .hl-g { text-shadow: 0 1px 8px rgba(0,0,0,.5); }
```

### 텍스트 색은 변수로, 배경/글로우/SVG는 hex로

- **텍스트 색**(제목·라벨·`hl`)은 `var(--blue)` 등 **변수**를 쓴다 → `.theme-dark` override가 먹는다.
- **PALETTE는 hex 유지**(`design 1절` 규칙): 카드 배경·glow·테두리는 `${c.fg}dd` 알파 hex 연결이 필요하므로 hex. SVG `stroke`/`fill`도 hex.
- 그래서 카드 라벨처럼 **다크에서 묻히던 텍스트**는 `color: c.fg`(hex) 대신 `color: var(--blue)`(대응 변수)로 바꾼다. 배경/보더는 그대로 `c.bg`/`${c.fg}55` hex.

> `hl()`이 인라인 style 대신 클래스(`.hl-b/.hl-r/.hl-g`)를 쓰면 위 그림자 규칙을 한곳에서 건다(권장). 인라인 style을 유지하더라도 색을 `var(--blue/--rose/--emerald)`로 두면 override는 먹는다(그림자만 빠짐).

---

## 5. 밑줄형 Eyebrow (양옆 줄/알약 박스 폐기)

기존 "——— 텍스트 ———"(양옆 페이드 선)이나 알약 칩은 촌스럽고 다크에서 회색 글씨가 묻힌다. **텍스트 + 그라데이션 밑줄**로 바꾼다(박스 없음). 전경색을 상속해 라이트=잉크/다크=흰 글씨로 자동 또렷.

```css
.eyebrow {
  display: inline-block;
  margin-bottom: 26px;
  font-size: 24px;            /* 24px+ 가독성 규칙 유지 */
  font-weight: 800;
  letter-spacing: 0.04em;
  padding-bottom: 10px;
  /* color는 지정하지 않음 → 테마 전경색 상속 */
  background-image: linear-gradient(90deg, var(--blue), var(--sky));
  background-repeat: no-repeat;
  background-size: 100% 6px;     /* 밑줄 두껍게(3px→6px, 사용자 확정) */
  background-position: 0 100%;  /* 글자 아래 밑줄 */
}
```

이 형태는 `layoutId` 모핑 앵커로도 최적이다(슬라이드마다 너비가 달라 **밑줄이 늘어나며 미끄러진다**). 칩이 의미상 맞는 자리(키워드 알약·번호 배지)는 예외로 둔다.

---

## 6. 다크 = 진짜 어둡게 + 밤하늘 배경

문제: "다크에서 blob을 더 진하게"(옛 3-f) + 중앙 광원 효과를 쓰면 화면이 환해서 **다크답지 않다.** (실제 피드백: "다크모드가 너무 밝아, 검정에 가깝게.")

해법 A — 글로우를 확 낮춰 가장자리는 검정 유지: 밤 하늘의 색 구름 6개는 `filter:blur(80px); mix-blend-mode:screen; opacity:.4`, 색 알파 0.24~0.42(`FIELD_COLOURS.night`). 라이트 기준의 0.5~0.7을 그대로 쓰면 다시 환해진다. **중앙에서 빛이 퍼지는 burst(코어/갓레이)는 쓰지 않는다.**

해법 B — 다크 전용 **밤하늘**(은하수 띠 + 반짝이는 별 + 별똥별 여러 개). 낮·핑크에는 그리지 않는다(`QQQSky`가 테마로 분기).

- 은하수 띠(`.milkyway`)는 **또렷하게**: `rgba(214,225,255,.20)/rgba(150,140,220,.11)`, `blur(24px)`, −22° 기울임(옛 `.13/.07`은 너무 흐림).
- 별먼지(`.mwdust`) 28개는 은하수 띠를 따라 정적으로, 반짝임(`.spark`) 24개는 화면 전체에서 twinkle.
- 별똥별(`.shoot`)은 **18개**(주기 3.6~5.6s, delay 0~5s로 흩어 여러 개가 번갈아/동시에 자주 떨어지게). 10개는 너무 뜸하다는 피드백.
- reduced-motion이면 모두 멈춘다.

코드는 따로 짜지 않는다 — **스킬 기본 재료 `sky-background.css`·`.js`(8번)**에 전부 들어 있다.

해법 C(폐기) — 예전에는 라이트에 채도를 올린 색 블롭을 띄웠다. **이제 낮(라이트·웜) 배경은 항상 비행기 하늘이다**(8번, 사용자 결정 2026-11-06). 낮 하늘의 움직임은 흰 구름의 큰 궤도(±13~15vw/vh)와 화면을 가로지르는 비행기가 맡는다.

---

## 7. 라이트 글래스 투명도 (선택)

더 역동적으로 — 배경(흰 구름·비행기가 지나는 낮 하늘)이 카드 너머로 비치게 하려면 라이트 글래스를 더 투명하게.

```css
.glass-card {                /* 기본 0.65 → 0.40 */
  background: rgba(255,255,255,0.40);
  backdrop-filter: blur(22px) saturate(1.3);     /* 투명해진 만큼 프로스트 강화로 가독성 유지 */
  -webkit-backdrop-filter: blur(22px) saturate(1.3);
  border: 1px solid rgba(255,255,255,0.75);      /* 테두리는 또렷하게 */
  box-shadow: 0 10px 36px rgba(0,0,0,.08), 0 0 22px rgba(59,130,246,.12),
              inset 0 1px 0 rgba(255,255,255,.5);
}
```

투명도를 올릴수록 배경이 비쳐 화면이 살아 보이지만, **글자 가독성 점검**(특히 색 글씨)을 반드시 한 뒤 적용한다.

**다크 글래스도 투명하게(밤하늘이 카드 너머로 비치게) — 사용자 확정.** 옛 규칙("다크 글래스는 그대로 둔다")은 폐기한다. 카드 배경을 더 비치게 낮추되, 글자엔 `text-shadow`로 대비를 보강한다.

```css
.theme-dark .glass-card {
  background: rgba(255,255,255,0.04);          /* 0.06 → 0.04, 별·은하수가 카드 뒤로 비침 */
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow: 0 8px 32px rgba(0,0,0,.5), 0 0 32px rgba(59,130,246,.18);
}
/* 투명해진 만큼 다크 카드 글자는 그림자로 대비 확보 */
.theme-dark .glass-card .t-label,
.theme-dark .glass-card .t-body { text-shadow: 0 1px 8px rgba(0,0,0,.6); }
```

---

## 8. 배경 = 스킬 기본 하늘 — 낮은 무조건 비행기 (기본 재료, 하나도 빼지 말 것)

> **낮(라이트) 배경은 항상 비행기 하늘. 다른 배경으로 바꾸지 않는다.**
> 사용자 결정 2026-11-06: "빨리 우리 스킬의 기본 재료로 써. 낮 배경은 무조건 비행기야". 이 하늘은 선택지가 아니라 스킬의 기본 재료다. 예전의 파스텔 메시 그라디언트 + 색 블롭 6개(b1~b6) + 파란 입자 스택은 낮 배경에서 폐기했다.

배경은 덱마다 새로 짜지 않는다. 두 파일을 **그대로** 덱에 인라인한다.

| 파일 | 내용 |
|---|---|
| `references/sky-background.css` | 하늘 CSS 전부: 테마별 바탕, 오로라, 구름, 비행기와 비행운, 밤하늘, 반짝임, ✨, 낮 글씨 대비 변수, reduced-motion, 검토 모드 |
| `references/sky-background.js` | 클래식 스크립트 → `window.QQQSky`. 좌표 데이터(`DAY_CLOUDS` 11, `DAY_ROUTES` 10, `PLANE_PATHS` 5, `FIELD_CLOUDS` 6, `SPARKS` 24, `NIGHT_DUST` 28, `NIGHT_SHOOTERS` 18), `Background`(React), `mount(el, theme)`(React 없는 페이지), `nodes(theme, width)`, `skyOf(theme)` |

출처: 게시된 연수 슬라이드 `teacher-manager-intro.html`의 day/night/pink 하늘을 같은 값으로 옮겼다. 비행기는 코드로 그린 인라인 SVG 경로 5개(동체·두 날개·두 꼬리날개)이며 이미지 파일·외부 요청이 없다.

### 테마 대응

| 슬라이드 `theme` | 하늘(`.bg-layer[data-sky]`) | 그리는 것 |
|---|---|---|
| `light` (기본, 생략 포함) | **day — 비행기 하늘(필수)** | 하늘 그라디언트 `#93C2E6 → #A5CEEB → #B7D9F1 → #C8E3F5` + 오로라 2겹(흰·하늘색 conic, multiply) + 흰 구름 11개(궤도 이동) + 비행기 10노선. 12초 간격으로 한 대씩 화면을 가로지르고(120초 주기) 비행운이 뒤따라 길어졌다 사라진다 |
| `warm` | **day — 비행기 하늘** | `warm`도 낮 배경이라 가장 가까운 것은 낮 하늘이다. "낮 배경은 무조건 비행기" 결정에 따라 light와 같은 하늘을 쓴다(따뜻한 파스텔 바탕은 폐기) |
| `dark` | **night — 밤하늘** | 검정 그라디언트 + 오로라(screen, .2) + 톤 낮춘 색 구름 6개 + 은하수 띠 + 별먼지 28개 + 별똥별 18개 + 흰 반짝임 24개 |
| `bling` (`pink-reversal`) | **pink — 핑크** | bling 핑크 그라디언트(`#FFC2DD → #FF9ECB → #FFB8D7`, 글자 대비 수치는 design 3-e 그대로) + 핑크 오로라 + 색 구름 6개 + 흰 반짝임 24개 + 캔버스 모서리 ✨ 두 개 |

### 붙이는 법

```jsx
// 덱 <head>: <style> 안에 sky-background.css 전문, Babel 스크립트보다 앞에 <script> sky-background.js 전문(클래식)
const theme = cur?.type === "pink-reversal" ? "bling" : (cur?.theme || "light");
<div className={"app-wrap theme-" + theme}>
  <QQQSky.Background theme={theme}/>
  <div className="stage-box">…</div>
</div>
```

React가 없는 페이지(갤러리 등)는 `QQQSky.mount(document.getElementById("sky"), "light")`로 같은 하늘을 그린다(`#sky{position:fixed;inset:0;z-index:0}`).

- 배경은 viewport 레벨(`app-wrap` 직속 `.bg-layer`)에 둔다. 4:3 캔버스 안에 넣으면 구름·비행기가 경계에서 잘린다. 캔버스는 투명.
- 비행기 노선은 화면 너비(`innerWidth`)를 따라 좌우 끝 바깥 60px에서 출발·도착한다. resize마다 다시 그린다.
- `prefers-reduced-motion: reduce` → 오로라·구름·반짝임·별똥별·비행기·✨의 `animation:none`(하늘이 멈추고 비행기는 나타나지 않는다).
- 검토 모드(`?review=1` → `html[data-review]`) → 하늘 전체 `animation-play-state:paused`. 앞의 비행기 다섯 대는 `--rv`(−3·−5·−7·−9·−11초)만큼 날아간 자리에서 멈춰 스틸에 보이고, 나머지 다섯은 숨는다. 같은 장은 두 번 찍어도 같은 스틸.
- 클래스는 모두 `.bg-layer[data-sky=…]` 아래에서 테마가 갈린다. 다른 컴포넌트가 `cloud`·`flight`·`spark` 같은 이름을 쓰지 않는다(`tests/class-collision-guard.mjs`). 색 블롭 CSS를 다시 쓰게 되더라도 `.blob.b1`처럼 반드시 묶어 쓴다(맨 `.b1` 금지).

### 하늘 위 글씨 대비 (낮)

낮 하늘은 중간 밝기의 파랑이라, 파스텔 바탕 기준의 강조색(`#3B82F6`·`#0EA5E9`·`#10B981`·`#F43F5E`)으로 쓴 글씨는 하늘 위에서 대비가 2:1 아래로 떨어진다. 그래서 `sky-background.css`가 `.app-wrap.theme-light`·`.theme-warm`에서 **글씨용 강조색 변수를 한 단계 진하게** 덮어쓴다(4번 다크 override와 같은 방식, SVG·도형 hex는 그대로).

| 변수 | 파스텔 기준 | 낮 하늘 | 가장 어두운 하늘 `#93C2E6` 대비 |
|---|---|---|---|
| `--ink` | `#0F172A` | 그대로 | 9.3:1 |
| `--muted` | `#475569` | `#334155` | 5.5:1 |
| `--blue` | `#3B82F6` | `#1D4ED8` | 3.5:1 |
| `--sky` | `#0EA5E9` | `#075985` | 4.0:1 |
| `--emerald` | `#10B981` | `#065F46` | 4.0:1 |
| `--rose` | `#F43F5E` | `#BE123C` | 3.4:1 |
| `--amber` | `#F59E0B` | `#92400E` | 3.8:1 |
| `--teal` | `#14B8A6` | `#115E59` | 4.0:1 |

모든 글씨가 24px 이상 굵은 글씨라 큰 글씨 기준 3:1 이상이면 통과다. 유리 카드 안은 하늘보다 밝아 대비가 더 높다. 상자 없이 하늘 위에 바로 놓이는 글씨(kinetic `big-question`·`key-message`, eyebrow, 캡션)는 덱을 만든 뒤 스크린샷으로 한 번 더 본다. 그래도 흐리면 그 글씨에만 옅은 흰 `text-shadow`나 얇은 유리 판을 더한다.

---

## 적용 체크

- [ ] 같은 화면에서 요소들이 **서로 다른 방향/유형**으로 등장하는가(한 종류 띠용 반복 아님)?
- [ ] **모핑이 기본으로 켜져** Eyebrow가 슬라이드 넘김에 이어지며 변형되는가? 전환은 크로스페이드(변형 없음)인가?
- [ ] 다크 슬라이드에서 **색 글씨(`*파랑*`·라벨)가 또렷**한가? (`.theme-dark` 강조색 override 적용?)
- [ ] Eyebrow가 양옆 줄/알약이 아니라 **밑줄형(밑줄 6px)**인가?
- [ ] 다크가 **검정에 가깝고**(가장자리), **은하수가 또렷**하고 별·별똥별(16~20개)이 자주 보이는가? 중앙 burst는 없는가?
- [ ] **낮(라이트·웜) 슬라이드 배경이 비행기 하늘**인가(하늘 그라디언트 + 오로라 + 흰 구름 11개 + 비행기와 비행운, 색 블롭 없음)? 비행기가 한 대씩 가로지르는가? `sky-background.css`·`.js`를 고치지 않고 그대로 넣었는가?
- [ ] 하늘 위에 바로 놓인 글씨(kinetic 질문·핵심 문장·eyebrow·캡션)가 또렷한가(낮 강조색 override 적용)?
- [ ] reduced-motion·검토 모드(`?review=1`)에서 하늘이 멈추는가?
- [ ] **다크 글래스 카드가 투명**해 밤하늘이 카드 뒤로 비치는가? (글자엔 text-shadow로 가독성 확보?)
- [ ] **violet은 배경(밤·핑크의 오로라·색 구름)에만** 쓰였고 글씨·UI·카드·강조색엔 없는가?
