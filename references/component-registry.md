# Component Registry — 번호로 고르는 컴포넌트 표

이 문서는 슬라이드에 쓸 수 있는 **모든 시각 컴포넌트에 번호를 매긴 단일 기준표**다.
사용자가 "23번으로 해줘", "62번 차트 써줘"처럼 **번호로 지시**하면 이 표에서 찾아 해당 컴포넌트를 만든다.

- 눈으로 보고 고르는 카탈로그: 스킬 폴더의 **`component-gallery.html`** (브라우저로 열면 모든 번호가 실제로 그려져 있음).
- 각 컴포넌트의 상세 규격: `visual-component-library.md`(SmartArt 계열) / `chart-components.md`(차트 계열) / `trinity-template.md`.
- 번호 ↔ 갤러리 ↔ 규격 문서는 **type 문자열로 연결**된다. 번호는 사람이 부르기 쉬우라고 붙인 것이고, 코드에 들어가는 식별자는 `type`이다.

## 표시 규칙

- `NEW` = 이번에 추가된 컴포넌트 (PowerPoint 기본 도표/차트를 옮겨온 것).
- `요청시` = 발표 화면 가독성 때문에 **기본 추천에서는 빠지지만** 사용자가 번호로 직접 고르면 쓰는 것 (옛 "금지" 항목). 왜 빼뒀는지 비고에 적었다.
- 비고 없는 것 = 원래부터 있던 권장 컴포넌트.

---

## A. 텍스트 강조 (1~7)

| # | type | 이름 | 언제 쓰나 | 비고 |
|---|---|---|---|---|
| 1 | `hero-title` | HeroTitle | 덱 표지, 강한 첫인상 | |
| 2 | `big-title` | BigTitle | 섹션 시작 알림 | |
| 3 | `big-keyword` | BigKeyword | 핵심 단어 하나 각인 | |
| 4 | `key-message` | KeyMessage | 핵심 주장 한 문장 | Default look since No. 89: editorial pull-quote (`added-templates.md` 17). `variant:"classic"` = old look. Optional `by` |
| 5 | `quote-focus` | QuoteFocus | 인용문·명언·선언 | |
| 6 | `section-divider` | SectionDivider | 파트 전환 | |
| 7 | `big-question` | BigQuestion | 수업 핵심 발문 | Default look since No. 89: kinetic display question (`added-templates.md` 16). `variant:"classic"` = old look. Optional `sub` |

## B. 키워드·목록 (8~13) — PPT SmartArt "목록(List)"

| # | type | 이름 | 언제 쓰나 | 비고 |
|---|---|---|---|---|
| 8 | `three-keywords` | ThreeKeywords | 핵심 요소 3개 | |
| 9 | `four-card` | FourCard | 위계 없는 병렬 3~4개 | |
| 10 | `keyword-cluster` | KeywordCluster | 관계 느슨한 용어 무리 | |
| 11 | `term-chip-group` | TermChipGroup | 용어 5~10개 칩 | |
| 12 | `numbered-steps` | NumberedSteps | 번호 매긴 목록 1~5 | |
| 13 | `checklist` | Checklist | 체크리스트·점검표 | |

## C. 비교·관계 (14~18) — PPT SmartArt "관계/행렬"

| # | type | 이름 | 언제 쓰나 | 비고 |
|---|---|---|---|---|
| 14 | `split-compare` | SplitCompare | A vs B 반반 비교 | |
| 15 | `before-after-panel` | BeforeAfterPanel | 변화 전·후 (왼 로즈 → 화살표 → 오른 블루, 항목 2~4) | ✅ 구현 — 코드 `added-templates.md` 11절 |
| 16 | `pros-cons-board` | ProsConsBoard | 장단점·찬반 | |
| 17 | `contrast` | ContrastKeyword | 키워드 수준 VS 대비 | |
| 18 | `two-by-two-matrix` | TwoByTwoMatrix | 2축 4분면 분류 | |

## D. 흐름·과정 (19~25) — PPT SmartArt "프로세스"

| # | type | 이름 | 언제 쓰나 | 비고 |
|---|---|---|---|---|
| 19 | `step-flow` | StepFlow | 가로 단계 과정 | |
| 20 | `vertical-step-flow` | VerticalStepFlow | 세로 단계 + 연결선 | |
| 21 | `horizontal-flow` | HorizontalFlow | 3~5단계 선형 파이프라인 | |
| 22 | `flow` | Flow | 입력→변환장치→결과 메커니즘 | |
| 23 | `cause-effect-chain` | CauseEffectChain | 원인→결과 사슬 | |
| 24 | `chevron-process` | ChevronProcess | 화살표 리본 단계 (PPT 갈매기) | NEW |
| 25 | `funnel-list` | FunnelList | 단계별로 걸러지는 깔때기 목록 | NEW |

## E. 주기·순환 (26~28) — PPT SmartArt "주기(Cycle)"

| # | type | 이름 | 언제 쓰나 | 비고 |
|---|---|---|---|---|
| 26 | `loop-diagram` | LoopDiagram / CycleDiagram | 반복 개선 사이클·PDCA | |
| 27 | `gear-cycle` | GearCycle | 맞물려 도는 톱니바퀴 (PPT 기어) · 라이트 광택 표준 | NEW |
| 28 | `segmented-cycle` | SegmentedCycle | 호(arc) 블록 순환 (PPT 블록 주기) · 라이트 광택 표준 | NEW |

## F. 계층·구조 (29~40) — PPT SmartArt "계층/관계/피라미드"

| # | type | 이름 | 언제 쓰나 | 비고 |
|---|---|---|---|---|
| 29 | `concept-map` | ConceptMap | 개념 연결 관계망 | |
| 30 | `actor-map` | ActorMap | 인물·집단 관계 구도 | |
| 31 | `pyramid` | Pyramid | 계층·위계 (아래 넓음) · 라이트 광택 표준 | |
| 32 | `inverted-pyramid` | InvertedPyramid | 역피라미드 (위 넓음·필터링) | NEW |
| 33 | `trinity` | Trinity | 셋이 모여 하나 (삼위일체) · 라이트 광택 표준 | |
| 34 | `tree-diagram` | TreeDiagram | 조직도·분류 트리 | |
| 35 | `hub-spoke` | HubSpoke / Mindmap | 한 중심에서 방사 · 라이트 광택 표준 | NEW |
| 36 | `ladder` | Ladder | 발전·숙달 단계 계단 | |
| 37 | `spectrum-line` | SpectrumLine | 연속 스펙트럼·입장 분포 | |
| 38 | `venn` | VennDiagram | 교집합·공통/차이 · 라이트 광택 표준 | NEW |
| 39 | `balance-scale` | BalanceScale | 양팔 저울 균형/대립 | NEW |
| 40 | `nested-target` | NestedTarget | 동심원·과녁 (포함 관계) | NEW |

## G. 타임라인 (41~43)

| # | type | 이름 | 언제 쓰나 | 비고 |
|---|---|---|---|---|
| 41 | `timeline-dots` | TimelineDots | 사건 3~5개 시간순 | |
| 42 | `chronology-ribbon` | ChronologyRibbon | 긴 시대 흐름 리본 | |
| 43 | `timeline-moment` | TimelineMoment | 한 순간 깊게 | |

## H. 수업·발문 (44~47)

| # | type | 이름 | 언제 쓰나 | 비고 |
|---|---|---|---|---|
| 44 | `discussion-prompt` | DiscussionPrompt | 모둠 토론 지시 | |
| 45 | `think-pause` | ThinkPause | 혼자 생각하기 | |
| 46 | `mini-quiz` | MiniQuiz | OX·선택지 퀴즈 | |
| 47 | `check-for-understanding` | CheckForUnderstanding | 형성평가 확인 | |

## I. 정리·마무리 (48~51)

| # | type | 이름 | 언제 쓰나 | 비고 |
|---|---|---|---|---|
| 48 | `recap-three` | RecapThree | 핵심 3요점 정리 | |
| 49 | `summary-map` | SummaryMap | 전체 구조 한눈에 | |
| 50 | `closing-prompt` | ClosingPrompt | 마무리·행동 촉구 | |
| 51 | `exit-ticket` | ExitTicket | 수업 끝 소감·과제 | |

## J. 데이터 차트 — 권장 (52~58)

차트 상세는 `chart-components.md`. 모두 SVG 직접 구현(외부 라이브러리 금지).

| # | type | 이름 | 언제 쓰나 | 비고 |
|---|---|---|---|---|
| 52 | `big-number` | BigNumber | 충격적 수치 하나 | |
| 53 | `bar-chart` | BarChart | 세로 막대, 항목 비교 3~5 | |
| 54 | `horizontal-bar` | HorizontalBar | 가로 막대, 긴 항목명 | |
| 55 | `lollipop-chart` | LollipopChart | 막대 대안, 깔끔한 순위 | |
| 56 | `line-chart` | LineChart | 시간 추세 | |
| 57 | `slope-chart` | SlopeChart | 두 시점 변화 비교 | |
| 58 | `stacked-bar-100` | Stacked100Bar | 비율·구성 (파이 대체) | |

## K. PPT 기본 차트 추가분 (59~70)

PowerPoint 기본 차트를 옮겨온 것. `요청시` 표시는 발표 화면에서 읽기 어려워 **기본 추천에서 빠지지만 번호로 고르면 쓴다**. 상세는 `chart-components.md` 섹션 12.

| # | type | 이름 | 언제 쓰나 | 비고 |
|---|---|---|---|---|
| 59 | `area-chart` | AreaChart | 추세 + 누적 양감 | NEW |
| 60 | `pie-chart` | PieChart | 한 전체의 구성 비율 | NEW · 요청시 (조각 크기 비교 어려움→58번 권장) |
| 61 | `donut-chart` | DonutChart | 비율 + 가운데 총합 강조 | NEW · 요청시 (파이와 동일 한계) |
| 62 | `radar-chart` | RadarChart | 여러 축 역량 프로필 | NEW · 요청시 (면적 해석 어려움→53번+색강조) |
| 63 | `scatter-plot` | ScatterPlot | 두 변수 상관·분포 | NEW |
| 64 | `bubble-chart` | BubbleChart | 3변수 (x·y·크기) | NEW · 요청시 (원 크기 비교 어려움→55번) |
| 65 | `waterfall-chart` | WaterfallChart | 증감 누적 (예산·손익) | NEW |
| 66 | `funnel-chart` | FunnelChart | 단계별 전환·감소 | NEW |
| 67 | `treemap` | Treemap | 비율 + 위계 사각 타일 | NEW |
| 68 | `histogram` | Histogram | 구간별 분포(도수) | NEW |
| 69 | `combo-chart` | ComboChart | 막대+꺾은선 복합 | NEW · 요청시 (이중축 혼란→두 장 분할 권장) |
| 70 | `gauge-chart` | GaugeChart | 단일 지표 게이지/달성률 | NEW |

## L. 사료·출처 (71~73)

| # | type | 이름 | 언제 쓰나 | 비고 |
|---|---|---|---|---|
| 71 | `quote-annotation` | QuoteAnnotation | 1차 사료 + 주석 | |
| 72 | `primary-source-lens` | PrimarySourceLens | 사료 분석 렌즈 | |
| 73 | `historical-figure-card` | HistoricalFigureCard | 인물 소개 카드 | |
| 82 | `brand-logos` | BrandLogos | AI 툴·개발 도구 공식 로고 타일 (brandTile/brandLogo) | NEW |

## M. 표 (74)

| # | type | 이름 | 언제 쓰나 | 비고 |
|---|---|---|---|---|
| 74 | `table-slide` | TableSlide | 항목×속성 격자 (4×4 이하) | |

## N. 검증된 추가 템플릿 (75~81)

코드·데이터 스키마·빌드 인덱스는 `added-templates.md` (복붙용). 모두 실제 강의 덱에서 검증됨.

| # | type | 이름 | 언제 쓰나 | 비고 |
|---|---|---|---|---|
| 75 | `reproduce` | Reproduce | 재사용/재생산 루프(허브→1·2·3차→핵심어). *지속·반복·일관성* | 핵심 단어를 hero로 |
| 76 | `platforms` | Platforms | 한 주제 아래 분야 2~3개 + 분야별 항목 칩(이미지/영상 모델 등) | `term-group`·`perspective` 실물 |
| 77 | `reasons` | Reasons | 한 주장 아래 이유·장점 2~3개 세로 나열(이모지+라벨+설명) | `recap`·근거 나열 실물 |
| 78 | `keymsg` | KeyMsg | 핵심 문장 hero + 증거/예시 칩 묶음 | `key-message` 칩 강화형 |
| 79 | `versus` | Versus | 두 방식 핵심 대조 한 방(tag+큰 결론어+body, 중앙 VS) | `icon-versus` 결론 강조형 |
| 80 | `bridge` | Bridge | A →(라벨)→ B + 설명 카드. 전환의 *원동력*을 화살표에 | `flow` 설명-카드 변형 |
| 81 | `tradeoff` | Tradeoff | 단점 N(로즈) + 큰 장점 1(블루·넓게). "그래도 쓰는 이유" | `pros-cons` 강조형 |

## O. 강의 시나리오 템플릿 (83~89)

`bsv-qqq-lecture-scenario`의 SLIDES.md(실습형 연수)를 위해 추가. 코드·스키마는 `added-templates.md` 8~18절, SLIDES.md 읽기는 `scenario-input.md`. 15번 `before-after-panel`도 같은 묶음에서 구현됐다(11절). 이 넷과 15번은 복사 버튼·이미지 상태가 있는 **React 템플릿**이라 모션 키트 `QQQ.mount(n)`로 그리지 않는다 — 덱에는 `added-templates.md` 코드를 넣는다(갤러리·키트 속 그림은 모양 확인용).

| # | type | 이름 | 언제 쓰나 | 비고 |
|---|---|---|---|---|
| 83 | `prompt-box` | PromptBox | 실습 프롬프트 전문 + 복사 버튼. 긴 글은 상자 안 스크롤 | NEW · "본문 3줄" 예외 |
| 84 | `screenshot-slot` | ScreenshotSlot | 결과 캡처. 빈 칸·깨진 경로면 점선 자리 표시 틀 | NEW |
| 85 | `pink-reversal` | PinkReversal | "그러나…" 반전 한 장. 항상 bling(핑크) 테마 | NEW · 덱당 1~2장 |
| 86 | `command-box` | CommandBox | 설치·실행 명령 한 줄 + 복사 버튼 | NEW · 시나리오의 `NEW command-box`로 추가 |
| 87 | `command-list` | CommandList | 2–4 labelled commands in order, one copy button per line (e.g. winget lines, then CLI installs) | NEW · `added-templates.md` section 13 |
| 88 | `capture-compare` | CaptureCompare | 2–3 real result captures, one row each: label + note, before image → after image; click or Enter enlarges the pair | NEW · `added-templates.md` section 14 |
| 89 | `outcome-cards` | OutcomeCards | 2–4 learning outcomes ("by the end you will…"), each a drawn mini-visual (`folder-sort`, `mini-dashboard`, `doc-year-flip`, `checklist`, `icon`) + label + desc | NEW · `added-templates.md` section 18 (uses the kinetic type kit, section 15) |

---

## 사용 흐름

1. 사용자가 번호로 지시 → 이 표에서 `type`·이름·용도 확인. (다음 새 번호는 90.)
2. SmartArt 계열은 `visual-component-library.md`, 차트 계열은 `chart-components.md`에서 상세 규격(SVG 패턴·등장 순서) 확인.
3. `요청시` 항목을 고르면, 더 읽기 쉬운 대안(비고에 적힌 번호)을 **한 번 안내한 뒤** 사용자가 그대로 원하면 그 번호로 만든다.
4. 모든 컴포넌트는 Modern Glassy Light 토큰(`design-and-readability.md`)과 spring-pop 등장, 24px+ 글자 규칙을 따른다.
