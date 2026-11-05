# Scenario Input — BRIEF.md · SLIDES.md 읽기 (bsv-qqq-lecture-scenario → QQQ)

`bsv-qqq-lecture-scenario` 스킬이 만든 **BRIEF.md**(연수 개요)와 **SLIDES.md**(장별 시나리오)를 QQQ가 어떻게 읽어 `const slides=[...]`로 옮기는지 정한 문서다. 형식 원본(writer 쪽 계약)은 그 스킬의 `docs/slides-md-format.md`이고, 이 문서는 **reader 쪽 규칙**이다.

## 0. 원칙 — 내용은 다시 쓰지 않는다

- SLIDES.md가 있으면 **그것이 원본**이다. 원문(교과서·녹취)을 다시 분해하거나 장을 합치·쪼개지 않는다. 장 순서·개수·type·theme·화면 글·notes를 그대로 옮긴다.
- 바꾸는 것은 **표기뿐**: `**굵게**`→`*굵게*`(QQQ 블루 마커), `` `코드` ``→`코드`(백틱 제거), 글자 그대로의 `\n`→줄바꿈.
- 화면 글이 24px로 안 들어가면 글을 줄이거나 고치지 말고 **사용자에게 알린다**(시나리오에서 장을 나누도록). QQQ가 할 수 있는 것은 레이아웃·builds 조정뿐이다.
- `component: NEW <name>`이 있으면 **덱을 만들기 전에 그 컴포넌트를 QQQ에 먼저 추가**한다(5절).
- BRIEF.md는 덱 제목·청중·시간·톤을 확인하는 참고 자료다. 화면에 옮기지 않는다.

## 1. 변환 도구

```bash
node scripts/slides-md-to-json.mjs path/to/SLIDES.md            # 보고서(JSON): deckTitle·slides·newComponents·warnings
node scripts/slides-md-to-json.mjs path/to/SLIDES.md --slides   # slides 배열만
```

의존성 없는 Node 스크립트다. 출력 `slides`를 덱의 `const slides=` 자리에 그대로 넣는다. `warnings`(알 수 없는 type, notes 누락, 화면 칸의 `[강사 …]` 표시 등)와 `newComponents`는 덱을 만들기 전에 확인한다.

## 2. SLIDES.md 한 장의 모양

```
## S01 · <역할>
- title: <제목, 강조 단어는 **굵게**>
- composition: <비교|대조|순서|결과 먼저|질문|선언|반전|실습|설치|시연|경험담|전환|행동 촉구>
- component: <QQQ type>           # 또는: NEW <kebab-name>
- theme: <light|dark|warm|bling>
- skip_if_short: true             # 선택
- slots:
  - <slotName>: <화면 글>
  - <slotName>.<sub>: <화면 글>
- prompt: |                       # prompt-box 전용, 4칸 들여쓴 본문
    ...
- new_component:                  # NEW 전용
  - purpose: ...
  - slots: ...
- notes: <발표 노트>
```

`# SLIDES — <제목>` 줄의 제목이 `deckTitle`이 된다. 첫 `## S` 앞의 글은 읽지 않는다.

## 3. 키 → slide 필드

| SLIDES.md | slide 필드 | 규칙 |
|---|---|---|
| `## Snn · 역할` | `id:"snn"`, `role` | `role`은 편집기 목록용 꼬리표. 화면에 그리지 않는다(Eyebrow로 쓰지 않는다 — 화면 글은 slots에서만 온다) |
| `title` | `title` | `**x**`→`*x*`. `key-message`·`closing-prompt`·`video`는 제목을 화면에 안 그리고 편집기 이름표로만 쓴다(보이는 문장은 `message`) |
| `composition` | (저장 안 함) | builds 리듬·레이아웃 판단에만 쓴다 |
| `component` | `type` | `NEW <name>`이면 `type:"<name>"` + 5절 절차 |
| `theme` | `theme` | 그대로. 단 `pink-reversal`은 무엇을 적어도 `bling`(경고 남김) |
| `skip_if_short: true` | `skipIfShort:true` | 화면엔 안 보인다. 런타임은 notes를 console에 낼 때 앞에 `[skip_if_short]`를 붙인다. 짧은 버전을 사용자가 요청할 때만 그 장을 뺀다 |
| `slots` 각 줄 | 점 경로 그대로 | `before.items.0` → `before.items[0]`, `stages.1.items.2` → `stages[1].items[2]`. 숫자 마디 = 배열 index(0부터) |
| `prompt: \|` | `prompt` | 4칸 들여쓰기를 걷어 낸 **원문 그대로**(마커·백틱 변환 없음) |
| `new_component` | 보고서 `newComponents` | slide에 넣지 않는다 |
| `notes` | `notes` | 그대로. `[강사 확인]` 같은 표시도 notes에만 둔다 |
| (자동) | `builds` | type별 등장 순서를 스크립트가 만든다(`buildsFor`). 선택 칸이 비면 그 단계도 뺀다 |

값 변환: `true`/`false` → 불리언, `value`·`start`·`end`·`side`·`fontScale`의 숫자 → number. 나머지는 문자열.

`slots.image`가 `[강사 캡처 예정]`처럼 **대괄호 표시**면 `screenshot-slot`이 자리 표시 틀을 그린다. 파일 이름(`결과-안내문.png`)은 덱 HTML과 같은 폴더 기준 상대 경로로 그대로 둔다.

## 4. type별 필드 이름 (계약 이름 → QQQ prop)

계약 문서에서 †로 표시된 이름은 QQQ 문서에 없던 것이다. 아래 표가 **QQQ 쪽 정식 필드 이름**이다. 실제 덱(촉법소년 논증게임·Teacher Manager 소개)에서 쓰던 이름이 있으면 그 이름으로 맞추고, 리더가 자동으로 바꾼다(`SLOT_RENAME`).

| type | SLIDES.md slot | slide 필드 | 비고 |
|---|---|---|---|
| `hero-title` | `label`† | `eyebrow` | 제목 위 라벨("LECTURE 01" 자리) |
| | `subtitle`† | `subtitle` | (옛 덱의 `sub`와 같은 칸) |
| `key-message` | `lead`, `message` | 같음 | |
| `big-question` | `question`† | `question` | 큰 `?` 아래 질문 한 문장 |
| `section-divider` | `part`†, `prev`†, `next`† | 같음 | `part`=파트 번호·이름, `title`=파트 제목, `prev`/`next`=이전·다음 파트 이름. build 없음 |
| `closing-prompt` | `message`† | `message` | 마무리 문장 |
| | `action`† | `sub` | 행동 지시 한 줄 |
| | `chips.N`† | `items[N]` | 선택 |
| `four-card` | `cards.N.emoji`†, `cards.N.label`† | `items[N].emoji`, `items[N].label` | (+ 선택 `desc`) |
| `animated-bar-chart` | `data.N.label`, `data.N.value`, `unit`† | 같음 | `value`는 number |
| `table-slide` | `headers.N`†, `rows.N.M`† | `headers[]`, `rows[][]` | 4×4 이하 |
| `keyword-cluster` | `center`†, `keywords.N`† | `center`, `keywords[]` | 10개 미만 |
| `flow` | `stages.N.emoji/label/sub`, `stages.1.items.N` | 같음 | 정확히 3노드 |
| `vertical-step-flow` | `steps.N.emoji/label/sub` | 같음 | |
| `icon-versus` | `left.*`, `right.*` | 같음 | |
| `trinity` | `items.N.*`, `core`, `coreEmoji` | 같음 | |
| `video` | `videoId`, `vertical`, `start`, `end` | 같음 | |
| 75~81 (`reproduce`~`tradeoff`) | `added-templates.md` 필드 | 같음 | 템플릿 코드가 무조건 `hl()`로 그리는 `caption`·`lead`·`subtitle`이 없으면 빈 문자열을 채운다("undefined" 방지, 화면 글 추가 아님) |
| `prompt-box` | `hint`, `caption` + `prompt:` 블록 | `hint`, `caption`, `prompt` | |
| `screenshot-slot` | `image`, `alt`, `caption` | 같음 | |
| `pink-reversal` | `eyebrow`, `caption` | 같음 | theme 강제 bling |
| `before-after-panel` | `before.label`, `before.items.N`, `after.label`, `after.items.N`, `caption` | 같음 | |
| `command-box` | `command`, `hint`, `caption` | 같음 | `command`는 원문 그대로 복사 |
| `command-list` | `items.N.label`, `items.N.command`, `hint`, `caption` | `items[N].label`, `items[N].command`, `hint`, `caption` | 2–4 items (the reader warns otherwise). Each `command` is copied byte for byte; `label` gets marker conversion |

공통 선택 칸: `eyebrow`, `emoji`, `caption`. 이름이 둘 다 오면(`label`과 `eyebrow`) 정식 이름 쪽을 남기고 경고한다.

## 5. `component: NEW <name>` — 새 컴포넌트를 먼저 만든다

1. 보고서 `newComponents`에서 `type`·`purpose`·`slots`를 읽는다. `alreadyImplemented:true`면(예: `command-box`) 이미 추가된 것이니 그대로 쓴다.
2. 없으면 **QQQ 저장소 원본**(`C:\AI\bsv-qqq-react-live-lecture-visual-slides`)에 추가한다. 설치본만 고치지 않는다.
   - `references/added-templates.md`에 새 절: 언제 쓰나 + 데이터 스키마(시나리오 slots 이름 그대로) + 모듈 레벨 컴포넌트 코드(`hl()`·`MI`·`Idle`·`Eyebrow`·`vF`·`PCOL`, 글자 24px+, FM 등장/비텍스트만 idle) + `Slide` 스위치 `case`.
   - `references/component-registry.md`에 다음 번호로 등록, `component-gallery.html`에 축소 그림 추가, `component-selection-rules.md` intent 표에 한 줄.
   - `scripts/slides-md-to-json.mjs`의 `KNOWN_TYPES`와 `buildsFor`에 추가.
   - 시험 덱으로 렌더(넘침·24px·콘솔 오류)를 확인한다.
3. 커밋·push(사용자의 일반 규칙대로) → 설치본 동기화 → 그다음 덱을 만든다.
4. 비슷한 기존 type이 있어도 시나리오가 NEW를 골랐다면 임의로 바꾸지 않는다. 기존 type이 정확히 같은 일을 하면 사용자에게 한 번 알리고 따른다.

## 6. 덱 단위 점검 (리더 쪽)

writer 쪽 `check_slides.py`가 이미 거른 규칙(같은 type 연속 금지, type당 5장 이하, 텍스트 중심 3장 연속 금지, `pink-reversal` 1장·bling 전용)은 다시 고치지 않는다. 리더는 다음만 확인해 **경고로 알린다**:

- 알 수 없는 type(=NEW 표시 없이 구현 안 된 type)
- `notes` 누락
- `image` 외 화면 칸의 `[강사 …]` 표시
- 렌더 후 넘침·24px 미만(SKILL.md 마지막 점검)
