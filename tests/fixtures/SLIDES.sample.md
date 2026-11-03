# SLIDES — QQQ 새 컴포넌트 시험

리더 시험용 고정 입력. 내용은 모두 지어낸 것이다.

## S01 · 도입
- title: 이번 실습은 **프롬프트 하나**로 시작합니다
- composition: 선언
- component: keymsg
- theme: light
- slots:
  - eyebrow: 실습 준비
  - lead: 복사해서 붙여 넣기만 하면 됩니다
  - chips.0: ChatGPT
  - chips.1: Claude
  - chips.2: Gemini
  - caption: 계정만 준비하세요
- notes: 도입

## S02 · 설치
- title: **한 줄**이면 설치 끝
- composition: 설치
- component: NEW command-box
- theme: light
- slots:
  - eyebrow: 설치
  - command: npm install -g @anthropic-ai/claude-code
  - hint: PowerShell 창에 붙여 넣고 Enter
  - caption: 설치가 끝나면 `claude`를 입력하세요
- new_component:
  - purpose: 설치 명령 한 줄을 크게 보여 주고 복사하게 한다
  - slots: command — 명령 한 줄, hint — 어디에 붙여 넣는지, caption — 다음 할 일
- notes: 명령 복사 시험

## S03 · 실습 1
- title: 이 프롬프트를 **그대로** 붙여 넣으세요
- composition: 실습
- component: prompt-box
- theme: light
- slots:
  - eyebrow: 실습 1
  - hint: ChatGPT 새 대화창에
  - caption: 길어도 괜찮아요 — 상자 안에서 스크롤
- prompt: |
    너는 중학교 2학년 과학 교사를 돕는 수업 설계 도우미야.
    아래 조건을 모두 지켜서 '광합성' 단원 활동지 초안을 만들어 줘.

    [조건]
    1. 대상: 중학교 2학년, 한 반 28명, 수업 시간 45분
    2. 구성: 도입 질문 1개 → 핵심 개념 정리 3줄 → 탐구 활동 2개 → 확인 문제 5개
    3. 탐구 활동에는 준비물, 순서, 관찰할 점을 각각 적어 줘.
    4. 확인 문제는 OX 2개, 선택형 2개, 서술형 1개로 하고 정답과 해설을 따로 붙여 줘.
    5. 문장은 학생이 읽기 쉽게 짧게 쓰고, 어려운 용어에는 괄호로 풀이를 달아 줘.
    6. *별표*나 _밑줄_ 같은 기호는 그대로 둬도 돼. ~물결~도 마찬가지야. **굵게**도.

    [출력 형식]
    - 제목, 학습 목표, 활동 1, 활동 2, 확인 문제, 정답과 해설 순서
    - 표가 필요하면 마크다운 표로
    - 마지막에 교사용 지도 팁 3가지
- notes: 긴 프롬프트 스크롤 시험

## S04 · 실습 1 결과
- title: 이런 **활동지**가 나와요
- composition: 결과 먼저
- component: screenshot-slot
- theme: light
- slots:
  - eyebrow: 실습 1 결과
  - image: [강사 캡처 예정]
  - alt: ChatGPT가 만든 광합성 활동지 첫 화면
  - caption: 캡처는 나중에 넣습니다
- notes: 빈 자리 표시

## S05 · 그러나
- title: AI가 만든 활동지, **그대로 쓰면** 안 됩니다
- composition: 반전
- component: pink-reversal
- theme: light
- skip_if_short: true
- slots:
  - eyebrow: 그러나…
  - caption: 사실 확인은 여전히 교사의 몫
- notes: theme을 light로 적어도 bling으로 그려지는지 시험

## S06 · 전후
- title: 활동지 만들기, **이렇게** 바뀝니다
- composition: 대조
- component: before-after-panel
- theme: light
- slots:
  - eyebrow: 달라진 점
  - before.label: BEFORE · 혼자
  - before.items.0: 자료 찾기 1시간
  - before.items.1: 양식 직접 편집
  - before.items.2: ~매번 처음부터~
  - after.label: AFTER · AI와
  - after.items.0: 조건만 말하기
  - after.items.1: 초안 _3분_
  - after.items.2: *고치기*에 집중
  - caption: 시간은 *검토*에 씁니다
- notes: 전후

## S07 · 실습 2 결과
- title: **완성** 화면
- composition: 결과 먼저
- component: screenshot-slot
- theme: light
- slots:
  - eyebrow: 실습 2 결과
  - image: img/완성-화면.png
  - alt: 완성된 활동지 화면
  - caption: 이미지가 있으면 비율을 지켜 보여 줍니다
- notes: 이미지 있음

## S08 · 정리
- title: 두 방식의 **차이**
- composition: 대조
- component: versus
- theme: light
- slots:
  - eyebrow: 정리
  - left.tag: 웹 챗봇
  - left.emoji: 📤
  - left.head: 단방향
  - left.body: 웹에서 만들어\n~다운로드~ 해서 쓴다
  - right.tag: 코딩 에이전트
  - right.emoji: 🔄
  - right.head: 양방향
  - right.body: 로컬 파일을 직접\n_생성·읽기·수정·삭제_
  - caption: 상황에 맞게 고르기
- notes: 기존 type

## S09 · 실습 2
- title: 다크에서도 **또렷하게**
- composition: 실습
- component: prompt-box
- theme: dark
- slots:
  - eyebrow: 실습 2
  - hint: Claude에
- prompt: |
    위 활동지를 초등학교 6학년 수준으로 다시 써 줘.
    확인 문제는 3개로 줄여 줘.
- notes: 다크 + 캡션 없음

## S10 · 다크 전후
- title: 다크 테마 **전·후**
- composition: 대조
- component: before-after-panel
- theme: dark
- slots:
  - eyebrow: 다크 전후
  - before.label: BEFORE
  - before.items.0: 손으로
  - before.items.1: 오래
  - after.label: AFTER
  - after.items.0: AI와 함께
  - after.items.1: 빠르게
  - after.items.2: 정확하게
- notes: 다크 전후

## S11 · 깨진 경로
- title: 경로가 틀리면 **자리 표시**로
- composition: 결과 먼저
- component: screenshot-slot
- theme: light
- slots:
  - eyebrow: 깨진 경로
  - image: img/missing-capture.png
  - alt: 깨진 경로 시험
- notes: onError 폴백

## S12 · 다크 명령
- title: 다크 **명령** 상자
- composition: 설치
- component: command-box
- theme: dark
- slots:
  - command: claude --dangerously-skip-permissions --model claude-opus-4-1 --add-dir C:/Users/teacher/Documents/수업자료/2026학년도/과학
- notes: 긴 한 줄 가로 스크롤
