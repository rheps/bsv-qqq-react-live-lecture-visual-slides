# 추가 템플릿 13종 (복붙용 스펙)

`bsv-qqq-react-live-lecture-visual-slides`로 실제 강의 덱을 만들며 검증된 7개 템플릿(1~7)과, 강의 시나리오(`bsv-qqq-lecture-scenario`의 SLIDES.md)용으로 추가한 5개 템플릿(8~12: `prompt-box`·`screenshot-slot`·`pink-reversal`·`before-after-panel`·`command-box`), plus 13 `command-list` (multi-line command copy). 모두 **모듈 레벨 함수**(render 함수 안 정의 금지 — snap 방지)이고, 공용 헬퍼 `hl()`·`MI`·`Idle`·`Eyebrow`·`vF`·`PCOL`을 그대로 쓴다. 글자는 전부 24px+, 그라디언트 텍스트는 `color` fallback 먼저(`hl`이 처리). 등장은 FM 프리셋(`MI`), 지속 모션은 비텍스트(`Idle`)에만.

전제 헬퍼(생성기 본문에 이미 있는 것):
```js
const vF=(i,step)=>i<step;                 // build 가시성
const PCOL={blue:"#3B82F6",emerald:"#10B981",amber:"#F59E0B",rose:"#F43F5E",sky:"#0EA5E9",teal:"#14B8A6"};
// hl(text), MI({show,children,style,className,delay,hover}), Idle({children,kind,style}), Eyebrow({children})
```
`Slide` 스위치에 각 `case`를 등록한다.

---

## 1. `reproduce` — 재생산 루프 (1차→2차→3차 → 핵심 키워드)
**언제**: "한 번 쓰고 끝이 아니라, 계속 재사용·재생산되는 도구를 만든다" 같은 *지속/반복/일관성* 메시지. 허브(도구) → 반복 산출 체인 → 핵심 단어 hero.

데이터:
```js
{ id, type:"reproduce", theme:"light", eyebrow, title,
  hubEmoji:"🏭", hubSub:"한 번 쓰고 끝나는 결과물이 아니라", hubLabel:"재사용되는 *도구·플랫폼*을 만든다",
  outputs:["📄 1차 생성","📑 2차 활용","🔁 3차 재생산","♾️ 계속"],
  keyword:"일관성", keywordSub:"지속적·반복적으로 _같은 품질_을 뽑아낼 수 있느냐",
  caption:"생성물이 아니라, *생성하는 도구*를 만든다",
  builds:["title","hub","outputs","keyword","caption"] }
```
```jsx
function Reproduce({s,step}){
  return (
    <div className="box">
      <Eyebrow>{s.eyebrow}</Eyebrow>
      <MI show={vF(0,step)} className="t-title" style={{marginBottom:28}}>{hl(s.title)}</MI>
      <MI show={vF(1,step)} hover className="glass" style={{padding:"24px 44px",borderTop:"4px solid var(--blue)",marginBottom:24}}>
        <Idle kind="breathe" style={{fontSize:68}}>{s.hubEmoji}</Idle>
        <div className="t-sub" style={{fontSize:25,marginTop:4}}>{hl(s.hubSub)}</div>
        <div className="t-label" style={{fontSize:34,marginTop:6}}>{hl(s.hubLabel)}</div>
      </MI>
      <MI show={vF(2,step)} style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap",justifyContent:"center",marginBottom:26}}>
        {s.outputs.map((o,i)=>(
          <React.Fragment key={i}>
            {i>0 && <span style={{fontSize:32,fontWeight:900,color:"var(--sky)"}}>→</span>}
            <span className="glass" style={{padding:"12px 22px",fontSize:26,fontWeight:800}}>{hl(o)}</span>
          </React.Fragment>
        ))}
      </MI>
      <MI show={vF(3,step)}>
        <div className="t-hero" style={{fontSize:58}}>{hl("결국 핵심은 *"+s.keyword+"*")}</div>
        <div className="t-sub" style={{fontSize:27,marginTop:8}}>{hl(s.keywordSub)}</div>
      </MI>
      <MI show={vF(4,step)} className="t-cap" style={{marginTop:24}}>{hl(s.caption)}</MI>
    </div>
  );
}
```

---

## 2. `platforms` — 카테고리별 묶음 (그룹 + 칩)
**언제**: 한 주제 아래 *여러 분야*가 있고 분야마다 *대표 항목 몇 개*가 붙을 때(예: 이미지 모델들 / 영상 모델들). 2~3 그룹 권장.

데이터:
```js
{ id, type:"platforms", theme:"light", eyebrow, title, subtitle,
  groups:[ {emoji:"🎨", label:"이미지", items:["나노바나나","이미지 2.0","미드저니"]},
           {emoji:"🎬", label:"영상",  items:["Veo","Seedance","Kling"]} ],
  caption, builds:["title","sub","g0","g1","caption"] }   // 그룹 수만큼 g0,g1,g2
```
```jsx
function Platforms({s,step}){
  return (
    <div className="box">
      <Eyebrow>{s.eyebrow}</Eyebrow>
      <MI show={vF(0,step)} className="t-title" style={{marginBottom:12}}>{hl(s.title)}</MI>
      <MI show={vF(1,step)} className="t-sub" style={{fontSize:28,marginBottom:34}}>{hl(s.subtitle)}</MI>
      <div style={{display:"flex",gap:26,justifyContent:"center",width:"100%"}}>
        {s.groups.map((g,i)=>(
          <MI key={i} show={vF(2+i,step)} hover className="glass" style={{flex:1,maxWidth:460,padding:"30px 26px",borderTop:`4px solid ${i?PCOL.rose:PCOL.blue}`}}>
            <Idle kind="float" style={{fontSize:60}}>{g.emoji}</Idle>
            <div className="t-label" style={{fontSize:32,marginTop:10,color:i?PCOL.rose:PCOL.blue}}>{hl(g.label)}</div>
            <div style={{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center",marginTop:18}}>
              {g.items.map((it,j)=>(<span key={j} style={{fontSize:25,fontWeight:800,padding:"9px 18px",borderRadius:999,background:"rgba(59,130,246,.10)",color:"var(--ink)"}}>{hl(it)}</span>))}
            </div>
          </MI>
        ))}
      </div>
      <MI show={vF(2+s.groups.length,step)} className="t-cap" style={{marginTop:34}}>{hl(s.caption)}</MI>
    </div>
  );
}
```

---

## 3. `reasons` — 이유·근거 세로 나열
**언제**: 한 주장(=title) 아래 *이유/근거/장점 2~3개*를 나란히 댈 때. 행마다 이모지 + 굵은 라벨 + 설명. `subtitle`은 선택(있으면 빌드 인덱스 하나 차지).

데이터:
```js
{ id, type:"reasons", theme:"light", eyebrow, title, subtitle,
  rows:[ {emoji:"🌐", label:"범용성", detail:"만들 수 있는 범위가 _넓다_"},
         {emoji:"🔧", label:"적응성", detail:"_수정·확장_이 쉽다"} ],
  caption, builds:["title","sub","r0","r1","caption"] }   // subtitle 없으면 ["title","r0","r1","caption"]
```
```jsx
function Reasons({s,step}){
  const base=s.subtitle?2:1;
  return (
    <div className="box">
      <Eyebrow>{s.eyebrow}</Eyebrow>
      <MI show={vF(0,step)} className="t-title" style={{marginBottom:10}}>{hl(s.title)}</MI>
      {s.subtitle && <MI show={vF(1,step)} className="t-sub" style={{fontSize:28,marginBottom:30}}>{hl(s.subtitle)}</MI>}
      <div style={{display:"flex",flexDirection:"column",gap:16,width:"100%",maxWidth:860}}>
        {s.rows.map((r,i)=>(
          <MI key={i} show={vF(base+i,step)} hover className="glass" style={{display:"flex",alignItems:"center",gap:22,padding:"22px 30px",textAlign:"left"}}>
            <Idle kind="breathe" style={{fontSize:46}}>{r.emoji}</Idle>
            <div style={{minWidth:170}}><div className="t-label" style={{fontSize:30,color:"var(--blue)"}}>{hl(r.label)}</div></div>
            <div className="t-body" style={{fontSize:27,flex:1}}>{hl(r.detail)}</div>
          </MI>
        ))}
      </div>
      <MI show={vF(base+s.rows.length,step)} className="t-cap" style={{marginTop:28}}>{hl(s.caption)}</MI>
    </div>
  );
}
```

---

## 4. `keymsg` — 핵심 문장 + 칩 묶음
**언제**: 한 문장 주장(hero) + *증거/예시 칩 몇 개*(파일형식·동작·항목)로 받칠 때. `chipNote`·`lead`는 선택.

데이터:
```js
{ id, type:"keymsg", theme:"light", eyebrow,
  title:"사실 *웹 챗봇*도 코딩을 잘한다", lead:"브라우저 속 GPT·클로드도 코드는 물론",
  chips:["xls","docx","py","html"], chipNote:"이런 파일을 만들어 _다운로드_해 쓸 수 있다",
  caption, builds:["title","lead","chips","caption"] }
```
```jsx
function KeyMsg({s,step}){
  return (
    <div className="box">
      <Eyebrow>{s.eyebrow}</Eyebrow>
      <MI show={vF(0,step)} className="t-hero" style={{fontSize:58,marginBottom:18}}>{hl(s.title)}</MI>
      <MI show={vF(1,step)} className="t-sub" style={{fontSize:30,marginBottom:30}}>{hl(s.lead)}</MI>
      <MI show={vF(2,step)} style={{display:"flex",gap:14,flexWrap:"wrap",justifyContent:"center"}}>
        {s.chips.map((c,i)=>(<span key={i} className="glass" style={{padding:"14px 26px",fontSize:30,fontWeight:900,color:"var(--blue)"}}>{hl(c)}</span>))}
      </MI>
      {s.chipNote && <MI show={vF(2,step)} className="t-body" style={{fontSize:26,marginTop:18}}>{hl(s.chipNote)}</MI>}
      <MI show={vF(3,step)} className="t-cap" style={{marginTop:30}}>{hl(s.caption)}</MI>
    </div>
  );
}
```

---

## 5. `versus` — 단방향/양방향 대결 (VS)
**언제**: 두 방식의 *핵심 대조 한 방*(요약·펀치라인). `icon-versus`와 형제지만, 각 카드에 `tag`(분류)+`head`(큰 결론어)+`body`를 둬 결론을 더 키운다.

데이터:
```js
{ id, type:"versus", theme:"light", eyebrow, title,
  left:{ tag:"웹 챗봇", emoji:"📤", head:"단방향", body:"웹에서 만들어\n~다운로드~ 해서 쓴다" },
  right:{ tag:"코딩 에이전트", emoji:"🔄", head:"양방향", body:"로컬 파일을 직접\n_생성·읽기·수정·삭제_" },
  caption, builds:["title","left","vs","right","caption"] }
```
```jsx
function Versus({s,step}){
  const card=(d,accent,vis)=>(
    <MI show={vis} hover className="glass" style={{flex:1,maxWidth:430,padding:"32px 28px",borderTop:`4px solid ${accent}`,display:"flex",flexDirection:"column",alignItems:"center"}}>
      <div style={{fontSize:24,fontWeight:800,color:accent}}>{hl(d.tag)}</div>
      <Idle kind="breathe" style={{fontSize:72,margin:"10px 0"}}>{d.emoji}</Idle>
      <div className="t-hero" style={{fontSize:50,color:accent}}>{hl(d.head)}</div>
      <div className="t-body" style={{marginTop:14,fontSize:28,lineHeight:1.45}}>{hl(d.body)}</div>
    </MI>
  );
  return (
    <div className="box">
      <Eyebrow>{s.eyebrow}</Eyebrow>
      <MI show={vF(0,step)} className="t-title" style={{marginBottom:34}}>{hl(s.title)}</MI>
      <div style={{display:"flex",gap:18,alignItems:"center",justifyContent:"center",width:"100%"}}>
        {card(s.left,PCOL.rose,vF(1,step))}
        <MI show={vF(2,step)} style={{fontSize:42,fontWeight:900,color:"var(--blue)",background:"#fff",borderRadius:999,width:78,height:78,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 24px rgba(59,130,246,.25)",flexShrink:0}}>VS</MI>
        {card(s.right,PCOL.blue,vF(3,step))}
      </div>
      <MI show={vF(4,step)} className="t-cap" style={{marginTop:34}}>{hl(s.caption)}</MI>
    </div>
  );
}
```

---

## 6. `bridge` — A →(라벨)→ B + 설명 카드
**언제**: "예전 A에서 지금 B로, *무엇 때문에* 바뀌었나"처럼 전환의 *원동력*을 화살표에 얹고, 아래에 용어/배경 설명을 붙일 때. `flow`의 변형(설명 카드 포함).

데이터:
```js
{ id, type:"bridge", theme:"light", eyebrow, title,
  fromEmoji:"💿", fromLabel:"SOFTWARE", toEmoji:"🌐", toLabel:"WEB · APP",
  arrowLabels:["☁ 클라우드","🧩 SaaS 확대"],
  explainTitle:"SaaS — 서비스형 소프트웨어",
  explain:"설치·평생 라이선스 대신,\n필요한 만큼 _구독_하고 브라우저·앱으로 *접속해서* 쓰는 방식",
  caption, builds:["title","bridge","explain","caption"] }
```
```jsx
function Bridge({s,step}){
  return (
    <div className="box">
      <Eyebrow>{s.eyebrow}</Eyebrow>
      <MI show={vF(0,step)} className="t-title" style={{marginBottom:34}}>{hl(s.title)}</MI>
      <MI show={vF(1,step)} style={{display:"flex",alignItems:"center",gap:18,justifyContent:"center",width:"100%",marginBottom:30}}>
        <div className="glass" style={{padding:"24px 30px",minWidth:210}}>
          <Idle kind="breathe" style={{fontSize:58}}>{s.fromEmoji}</Idle>
          <div className="t-label" style={{fontSize:28,marginTop:8}}>{hl(s.fromLabel)}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",minWidth:200,gap:4}}>
          {s.arrowLabels.map((a,i)=>(<div key={i} style={{fontSize:24,fontWeight:800,color:i?PCOL.teal:PCOL.sky}}>{hl(a)}</div>))}
          <div style={{fontSize:52,fontWeight:900,color:"var(--blue)",lineHeight:1}}>→</div>
        </div>
        <div className="glass" style={{padding:"24px 30px",minWidth:210,borderTop:"4px solid var(--blue)"}}>
          <Idle kind="float" style={{fontSize:58}}>{s.toEmoji}</Idle>
          <div className="t-label" style={{fontSize:28,marginTop:8,color:"var(--blue)"}}>{hl(s.toLabel)}</div>
        </div>
      </MI>
      <MI show={vF(2,step)} className="glass" style={{padding:"24px 34px",maxWidth:840,borderLeft:"5px solid var(--teal)",textAlign:"left"}}>
        <div className="t-label" style={{fontSize:28,color:"var(--teal)"}}>{hl(s.explainTitle)}</div>
        <div className="t-body" style={{fontSize:26,marginTop:10}}>{hl(s.explain)}</div>
      </MI>
      <MI show={vF(3,step)} className="t-cap" style={{marginTop:26}}>{hl(s.caption)}</MI>
    </div>
  );
}
```

---

## 7. `tradeoff` — 단점 N + 큰 장점 1 (그래도 하는 이유)
**언제**: "불편하지만 그래도 쓰는 이유" — 단점 카드 2개(로즈) + 장점 카드 1개(블루·넓게)로 *결론(장점)*을 더 크게. `pros-cons`의 강조형.

데이터:
```js
{ id, type:"tradeoff", theme:"light", eyebrow, title,
  cons:[ {emoji:"🛂", label:"심사 필요", detail:"앱스토어 ~심사~를 거쳐야 해 느리다"},
         {emoji:"🐢", label:"수동 업데이트", detail:"사용자가 직접 ~업데이트~ 해야 한다"} ],
  pro:{ emoji:"📲", label:"그래도 쓰는 이유", detail:"카메라·GPS·푸시 등\n_고유 기능_을 제대로 쓸 수 있다" },
  caption, builds:["title","con0","con1","pro","caption"] }
```
```jsx
function Tradeoff({s,step}){
  return (
    <div className="box">
      <Eyebrow>{s.eyebrow}</Eyebrow>
      <MI show={vF(0,step)} className="t-title" style={{fontSize:46,marginBottom:26}}>{hl(s.title)}</MI>
      <div style={{display:"flex",gap:18,justifyContent:"center",width:"100%",marginBottom:22}}>
        {s.cons.map((c,i)=>(
          <MI key={i} show={vF(1+i,step)} hover className="glass" style={{flex:1,maxWidth:400,padding:"22px 24px",borderTop:`4px solid ${PCOL.rose}`}}>
            <Idle kind="wave" style={{fontSize:46}}>{c.emoji}</Idle>
            <div className="t-label" style={{fontSize:28,marginTop:8,color:PCOL.rose}}>{hl(c.label)}</div>
            <div className="t-body" style={{fontSize:25,marginTop:8}}>{hl(c.detail)}</div>
          </MI>
        ))}
      </div>
      <MI show={vF(1+s.cons.length,step)} hover className="glass" style={{maxWidth:840,padding:"24px 34px",borderTop:`4px solid ${PCOL.blue}`,display:"flex",alignItems:"center",gap:24,textAlign:"left"}}>
        <Idle kind="breathe" style={{fontSize:62}}>{s.pro.emoji}</Idle>
        <div>
          <div className="t-label" style={{fontSize:30,color:PCOL.blue}}>{hl(s.pro.label)}</div>
          <div className="t-body" style={{fontSize:27,marginTop:8}}>{hl(s.pro.detail)}</div>
        </div>
      </MI>
      <MI show={vF(2+s.cons.length,step)} className="t-cap" style={{marginTop:24}}>{hl(s.caption)}</MI>
    </div>
  );
}
```

---

## 8. `prompt-box` — 복사 가능한 전체 프롬프트 (번호 83)
**언제**: 실습에서 수강생이 **프롬프트 전문을 그대로 복사해 붙여 넣어야** 할 때. 화면에 전문을 크게 보여 주고 `복사` 버튼 한 번으로 클립보드에 담는다. 긴 한국어 프롬프트도 글자를 줄이지 않고(24px) **상자 안에서만 스크롤**한다.

- **"본문 3줄 초과 금지" 규칙의 예외**다. 프롬프트는 읽히는 설명문이 아니라 복사할 재료라서 전문을 그대로 둔다(줄이거나 notes로 빼지 않는다).
- `prompt`는 **`hl()`을 통과시키지 않는다**(프롬프트 속 `*`·`_`·`~`가 마커로 먹히면 원문이 깨진다). 줄바꿈·공백 그대로 `white-space:pre-wrap`으로 렌더하고, 복사도 원문 문자열 그대로 한다. `title`·`caption`·`hint`는 다른 칸처럼 `hl()`.
- 상자·버튼 클릭은 `stopPropagation()` — 슬라이드 좌/우 클릭 이동이 같이 발동하지 않게(텍스트 드래그 선택도 가능). 복사 뒤 버튼 `blur()`(Space=다음 키가 버튼을 다시 누르지 않게).
- 복사: `navigator.clipboard.writeText` → 실패·미지원이면 숨은 textarea + `document.execCommand("copy")` 폴백 → 그것도 실패하면 상자 글자를 전체 선택하고 버튼에 `Ctrl+C`를 띄운다(직접 복사 안내). 성공하면 1.8초 동안 `복사됨`.
- 고정 UI 라벨은 `QQQ_UI` 한 곳에 둔다(`복사`/`복사됨`/`Ctrl+C`). 덱마다 문구를 새로 짓지 않는다.

데이터:
```js
{ id, type:"prompt-box", theme:"light", eyebrow, title:"이 프롬프트를 *그대로* 붙여 넣으세요",
  hint:"ChatGPT 새 대화창에",            // 상자 머리줄의 짧은 안내(선택)
  prompt:"너는 중학교 2학년 과학 교사야.\n아래 조건으로 수업 활동지를 만들어 줘.\n- 주제: 광합성\n- 분량: A4 한 장",
  caption, builds:["title","box","caption"] }
```
```jsx
const QQQ_UI = { copy:"복사", copied:"복사됨", copyManual:"Ctrl+C", shotEmpty:"캡처 화면을 넣으세요" };
const MONO = '"JetBrains Mono","Cascadia Mono","D2Coding",Consolas,"Pretendard",monospace';

function copyFallback(text){
  try{
    const ta=document.createElement("textarea");
    ta.value=text; ta.setAttribute("readonly","");
    ta.style.cssText="position:fixed;top:0;left:0;opacity:0;pointer-events:none";
    document.body.appendChild(ta); ta.select();
    const ok=document.execCommand("copy");
    document.body.removeChild(ta); return ok;
  }catch(e){ return false; }
}
function copyText(text){
  if(navigator.clipboard && window.isSecureContext){
    return navigator.clipboard.writeText(text).then(()=>true, ()=>copyFallback(text));
  }
  return Promise.resolve(copyFallback(text));
}
function selectNode(el){
  try{ const r=document.createRange(); r.selectNodeContents(el);
       const sel=window.getSelection(); sel.removeAllRanges(); sel.addRange(r); }catch(e){}
}

// 복사 버튼 상태 훅 — prompt-box·command-box 공용(모듈 레벨)
function useCopy(text, nodeRef){
  const [st,setSt]=React.useState("idle");          // idle | done | fail
  React.useEffect(()=>{ setSt("idle"); },[text]);
  React.useEffect(()=>{
    if(st!=="done") return;
    const t=setTimeout(()=>setSt("idle"),1800); return ()=>clearTimeout(t);
  },[st]);
  const onCopy=e=>{
    e.stopPropagation(); e.currentTarget.blur();     // 좌/우 클릭 이동 차단 + Space 재발동 방지
    copyText(String(text||"")).then(ok=>{
      if(ok) setSt("done"); else { setSt("fail"); selectNode(nodeRef.current); }
    });
  };
  const label = st==="done" ? "✓ "+QQQ_UI.copied : st==="fail" ? QQQ_UI.copyManual : "📋 "+QQQ_UI.copy;
  return {st,label,onCopy};
}
const stopNav=e=>e.stopPropagation();

function PromptBox({s,step}){
  const preRef=React.useRef(null);
  const {st,label,onCopy}=useCopy(s.prompt,preRef);
  const stop=stopNav;
  const maxH = s.caption ? 420 : 500;
  return (
    <div className="box">
      {s.eyebrow && <Eyebrow>{hl(s.eyebrow)}</Eyebrow>}
      <MI show={vF(0,step)} className="t-title" style={{marginBottom:22}}>{hl(s.title)}</MI>
      <MI show={vF(1,step)} className="glass qqq-prompt" style={{width:"100%",maxWidth:1040,padding:"18px 22px 22px",borderTop:"4px solid var(--blue)",textAlign:"left"}}>
        <div onClick={stop} style={{display:"flex",alignItems:"center",gap:16,marginBottom:14}}>
          <div className="t-sub" style={{flex:1,fontSize:24,fontWeight:700}}>{s.hint ? hl(s.hint) : null}</div>
          <button type="button" className={"qqq-copy"+(st==="done"?" is-done":"")} onClick={onCopy} aria-live="polite">{label}</button>
        </div>
        <pre ref={preRef} className="qqq-prompt-pre" onClick={stop} onMouseDown={stop} onTouchStart={stop} onTouchEnd={stop}
          style={{maxHeight:maxH,fontFamily:MONO}}>{String(s.prompt||"")}</pre>
      </MI>
      {s.caption && <MI show={vF(2,step)} className="t-cap" style={{marginTop:22}}>{hl(s.caption)}</MI>}
    </div>
  );
}
```

---

## 9. `screenshot-slot` — 결과 캡처 자리 (번호 84)
**언제**: "이렇게 나옵니다" 같은 **결과 화면 캡처**를 보여 줄 때. `image`가 비어 있으면 **점선 자리 표시 틀**(🖼️ + `캡처 화면을 넣으세요` + `alt`에 적은 "무슨 화면인지")을 그려 강사가 나중에 캡처를 넣게 한다. 경로가 깨져도(`onError`) 같은 틀로 돌아간다.

- `image`: 덱 HTML 기준 상대 경로(`img/s07-result.png`, 시나리오가 준 파일 이름 `실습1-결과.png` 그대로) 또는 `data:` URI. 편집기의 `image` 칸에 경로를 넣으면 바로 바뀐다. 비어 있거나 `[강사 캡처 예정]`처럼 **대괄호로 감싼 표시**면 자리 표시 틀을 그린다.
- `alt`: 이미지 대체 텍스트이자, 비어 있을 때 틀 안에 보이는 "넣을 화면 설명". 시나리오가 준 문구 그대로.
- 이미지는 `object-fit:contain`으로 비율 유지, 최대 1040×(캡션 있으면 520, 없으면 590)px. 의미 없는 장식 이미지 금지 규칙은 그대로 — **결과·화면 증거**에만 쓴다. 영상이 있으면 `video`가 우선.

데이터:
```js
{ id, type:"screenshot-slot", theme:"light", eyebrow, title:"이런 *활동지*가 나와요",
  image:"",                                   // 비우면 자리 표시 틀
  alt:"ChatGPT가 만든 광합성 활동지 첫 화면",
  caption, builds:["title","shot","caption"] }
```
```jsx
function ScreenshotSlot({s,step}){
  const [broken,setBroken]=React.useState(false);
  React.useEffect(()=>{ setBroken(false); },[s.image]);
  const raw = String(s.image||"").trim();
  const has = !!raw && !/^\[.*\]$/.test(raw) && !broken;   // "[강사 캡처 예정]" 같은 대괄호 표시는 빈 칸으로 본다
  const maxH = s.caption ? 520 : 590;
  return (
    <div className="box">
      {s.eyebrow && <Eyebrow>{hl(s.eyebrow)}</Eyebrow>}
      <MI show={vF(0,step)} className="t-title" style={{marginBottom:22}}>{hl(s.title)}</MI>
      <MI show={vF(1,step)} className={has?"glass qqq-shot":"qqq-shot-empty"} style={has?{padding:12,display:"inline-flex"}:{width:960,height:Math.min(540,maxH)}}>
        {has
          ? <img src={s.image} alt={s.alt||""} onError={()=>setBroken(true)}
              style={{display:"block",maxWidth:1016,maxHeight:maxH-24,width:"auto",height:"auto",objectFit:"contain",borderRadius:12}}/>
          : <div role="img" aria-label={s.alt||QQQ_UI.shotEmpty} style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:14,height:"100%",padding:"0 40px"}}>
              <Idle kind="float" style={{fontSize:72}}>🖼️</Idle>
              <div className="t-label" style={{fontSize:32,color:"var(--blue)"}}>{QQQ_UI.shotEmpty}</div>
              {s.alt && <div className="t-sub" style={{fontSize:26,textAlign:"center"}}>{hl(s.alt)}</div>}
            </div>}
      </MI>
      {s.caption && <MI show={vF(2,step)} className="t-cap" style={{marginTop:22}}>{hl(s.caption)}</MI>}
    </div>
  );
}
```

---

## 10. `pink-reversal` — "그러나…" 반전 한 장 (번호 85)
**언제**: 앞에서 쌓은 흐름을 **뒤집는 한 장**("그러나…", "그런데 문제는…"). 강한 핑크 배경(`bling` 테마) + 큰 제목 하나. 덱 전체 1~2장, 연속 금지.

- **테마는 항상 `bling`**: App에서 `const theme = s.type==="pink-reversal" ? "bling" : (s.theme||"light")`. 시나리오가 다른 theme을 적어도 이 type은 bling으로 그린다(이 type의 존재 이유가 핑크 반전).
- `eyebrow`("그러나…")는 이 type에서만 **작은 밑줄 라벨이 아니라 큰 도입어**(56px)로 그린다 — 반전 신호가 핵심이라서. 그래서 이 장엔 `layoutId` 모핑 앵커가 없다(앞뒤 장과는 크로스페이드). 의도된 예외.
- 제목은 hero 66px, 핵심어는 `*단어*`(bling에서 진한 핑크 그라디언트). 셋업(앞 주장)이 아니라 **반전 뒤 핵심**이 제목이다(강조 역전 금지 — SKILL #17).

데이터:
```js
{ id, type:"pink-reversal", theme:"bling", eyebrow:"그러나…",
  title:"AI가 만든 활동지, *그대로 쓰면* 안 됩니다",
  caption:"사실 확인은 여전히 교사의 몫",
  builds:["eyebrow","title","caption"] }
```
```jsx
function PinkReversal({s,step}){
  return (
    <div className="box" style={{alignItems:"center",textAlign:"center"}}>
      <MI show={vF(0,step)} className="qqq-rev-lead">{hl(s.eyebrow||"")}</MI>
      <MI show={vF(0,step)} className="qqq-rev-bar" style={{margin:"18px auto 30px"}}><span/></MI>
      <MI show={vF(1,step)} className="t-hero" style={{fontSize:66,lineHeight:1.3,maxWidth:1000}}>{hl(s.title)}</MI>
      {s.caption && <MI show={vF(2,step)} className="t-cap" style={{fontSize:30,marginTop:34}}>{hl(s.caption)}</MI>}
    </div>
  );
}
```

---

## 11. `before-after-panel` — 전(빨강) → 후(파랑) (번호 15)
**언제**: **변화 전·후**(손으로 하던 방식 → AI와 하는 방식). 왼쪽 로즈 카드(before) → 그려지는 화살표 → 오른쪽 블루 카드(after). `versus`는 "VS"(대결), 이것은 "→"(변화 방향)다. 변화 **원인**이 핵심이면 `bridge`/`cause-effect-chain`.

- 색 고정: before = 로즈(`PCOL.rose`·글자는 `var(--rose)`), after = 블루(`PCOL.blue`·`var(--blue)`). 다크에서 글자색은 변수라 자동으로 밝아진다.
- `items`는 쪽마다 2~4개, 항목은 짧은 구(한 줄 18자 안팎). 양쪽 개수가 달라도 된다.

데이터:
```js
{ id, type:"before-after-panel", theme:"light", eyebrow, title:"활동지 만들기, *이렇게* 바뀝니다",
  before:{ label:"BEFORE · 혼자", items:["자료 찾기 1시간","양식 직접 편집","~매번 처음부터~"] },
  after:{  label:"AFTER · AI와", items:["조건만 말하기","초안 _3분_","*고치기*에 집중"] },
  caption, builds:["title","before","arrow","after","caption"] }
```
```jsx
function BeforeAfterPanel({s,step}){
  const side=(d,fg,cssVar,vis)=>(
    <MI show={vis} hover className="glass" style={{flex:1,maxWidth:440,minHeight:300,padding:"26px 30px",borderTop:`5px solid ${fg}`,textAlign:"left"}}>
      <div className="t-label" style={{fontSize:30,color:`var(${cssVar})`,textAlign:"center",marginBottom:18}}>{hl(d.label)}</div>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        {(d.items||[]).map((it,i)=>(
          <div key={i} style={{display:"flex",gap:14,alignItems:"flex-start"}}>
            <span style={{flexShrink:0,width:14,height:14,borderRadius:999,marginTop:15,background:fg,boxShadow:`0 0 10px ${fg}88`}}/>
            <span className="t-body" style={{fontSize:28,fontWeight:700,lineHeight:1.45}}>{hl(it)}</span>
          </div>
        ))}
      </div>
    </MI>
  );
  return (
    <div className="box">
      {s.eyebrow && <Eyebrow>{hl(s.eyebrow)}</Eyebrow>}
      <MI show={vF(0,step)} className="t-title" style={{marginBottom:34}}>{hl(s.title)}</MI>
      <div style={{display:"flex",gap:14,alignItems:"center",justifyContent:"center",width:"100%"}}>
        {side(s.before||{},PCOL.rose,"--rose",vF(1,step))}
        <MI show={vF(2,step)} style={{flexShrink:0,width:124,display:"flex",justifyContent:"center"}}>
          {/* 가로 직선은 bbox 높이가 0이라 objectBoundingBox 그라디언트가 안 먹는다 → userSpaceOnUse 필수 */}
          <svg width="120" height="72" viewBox="0 0 120 72" aria-hidden="true">
            <defs><linearGradient id="ba-arrow" gradientUnits="userSpaceOnUse" x1="8" y1="36" x2="108" y2="36"><stop offset="0" stopColor="#F43F5E"/><stop offset="1" stopColor="#3B82F6"/></linearGradient></defs>
            <path d="M8 36 H98" stroke="url(#ba-arrow)" strokeWidth="11" strokeLinecap="round" fill="none"/>
            <path d="M78 12 L108 36 L78 60" stroke="#3B82F6" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </MI>
        {side(s.after||{},PCOL.blue,"--blue",vF(3,step))}
      </div>
      {s.caption && <MI show={vF(4,step)} className="t-cap" style={{marginTop:34}}>{hl(s.caption)}</MI>}
    </div>
  );
}
```

---

## 12. `command-box` — 한 줄 명령 복사 (번호 86)
**언제**: 설치·실행 **명령 한 줄**(`npm install -g …`, `claude`)을 그대로 복사하게 할 때. 실습 프롬프트(`prompt-box`)와 따로 두어 `prompt-box`가 덱당 5장 한도를 넘지 않게 한다. 시나리오에선 `component: NEW command-box`로 처음 요청돼 이 템플릿으로 추가됐다(slots: `command`·`hint`·`caption`).

- `command`도 `prompt`처럼 **`hl()` 비통과·원문 그대로 복사**한다. 앞의 `$` 표시는 장식이라 복사되지 않는다.
- 한 줄 고정(`white-space:pre`), 길면 줄바꿈하지 않고 **상자 안에서 가로 스크롤**. 글자 30px.
- 복사 동작·라벨·`stopPropagation`은 `prompt-box`와 같은 `useCopy` 훅을 쓴다(8번 코드가 먼저 있어야 한다).

데이터:
```js
{ id, type:"command-box", theme:"light", eyebrow, title:"*한 줄*이면 설치 끝",
  command:"npm install -g @anthropic-ai/claude-code",
  hint:"PowerShell 창에 붙여 넣고 Enter",
  caption, builds:["title","box","hint","caption"] }   // hint 없으면 ["title","box","caption"]
```
```jsx
function CommandBox({s,step}){
  const codeRef=React.useRef(null);
  const {st,label,onCopy}=useCopy(s.command,codeRef);
  return (
    <div className="box">
      {s.eyebrow && <Eyebrow>{hl(s.eyebrow)}</Eyebrow>}
      <MI show={vF(0,step)} className="t-title" style={{marginBottom:34}}>{hl(s.title)}</MI>
      <MI show={vF(1,step)} className="glass qqq-cmd" style={{width:"100%",maxWidth:1040,padding:"18px 18px 18px 26px",borderLeft:"6px solid var(--blue)",display:"flex",alignItems:"center",gap:18}}>
        <span aria-hidden="true" className="qqq-cmd-sign">$</span>
        <code ref={codeRef} className="qqq-cmd-code" onClick={stopNav} onMouseDown={stopNav} onTouchStart={stopNav} onTouchEnd={stopNav}
          style={{fontFamily:MONO}}>{String(s.command||"")}</code>
        <button type="button" className={"qqq-copy"+(st==="done"?" is-done":"")} onClick={onCopy} aria-live="polite">{label}</button>
      </MI>
      {s.hint && <MI show={vF(2,step)} className="t-sub" style={{fontSize:26,marginTop:22}}>{hl(s.hint)}</MI>}
      {s.caption && <MI show={vF(s.hint?3:2,step)} className="t-cap" style={{marginTop:22}}>{hl(s.caption)}</MI>}
    </div>
  );
}
```

---

## 13. `command-list` — copyable command list (No. 87)
**When**: 2–4 install or setup commands that the audience runs in order, each with a short label — for example on Windows cmd: the `winget` lines first, then the CLI install lines. A single command stays `command-box` (12). A prompt stays `prompt-box` (8). Requested by the scenario as `component: command-list` (slots: `title`·`caption`·`items[]`(`label`·`command`)·`hint`).

- Each row is a glass card with the same styling as `command-box`: left 6px blue border, the decorative `>` sign, monospace command text and its own copy button. Each row has its own `useCopy` state, so `복사됨` shows only on the row that was copied.
- `items[i].command` does not go through `hl()` and is copied byte for byte. `label`, `title`, `hint` and `caption` go through `hl()` as usual. The `>` sign and the row number are decoration and are not copied.
- Command text is 26px. With 2–3 items a long command wraps inside the row (`pre-wrap` + `overflow-wrap:anywhere`) and scrolls vertically inside the row after two lines (`max-height`). With 4 items the list is dense (`.qqq-cmdl-dense`): each command stays on one line and scrolls horizontally inside the row, like `command-box`. Either way the slide never overflows and the font size never shrinks. Labels are 26px, the button and row number 24px.
- 2–4 items. The reader warns outside that range. With 5 or more commands, split the slide in the scenario.
- Row clicks call `stopPropagation()` like `command-box`, so selecting text or pressing a button does not move the slide. The component reuses the copy labels (`QQQ_UI.copy` / `copied` / `copyManual`) and adds no new UI strings. It needs the section 8 helpers (`useCopy`, `MONO`, `stopNav`).

Data:
```js
{ id, type:"command-list", theme:"light", eyebrow, title:"Install in *two steps*",
  items:[
    { label:"Node.js", command:"winget install --id OpenJS.NodeJS.LTS -e" },
    { label:"Git",     command:"winget install --id Git.Git -e" },
    { label:"Claude Code", command:"npm install -g @anthropic-ai/claude-code" },
  ],
  hint:"Paste each line into cmd and press Enter",
  caption, builds:["title","i0","i1","i2","hint","caption"] }   // one "i<n>" per item; hint/caption only when present
```
```jsx
function CommandRow({it,i,show}){
  const codeRef=React.useRef(null);
  const cmd=String((it&&it.command)||"");
  const {st,label,onCopy}=useCopy(cmd,codeRef);
  return (
    <MI show={show} className="glass qqq-cmd qqq-cmdl-row" style={{width:"100%",padding:"10px 16px 10px 20px",borderLeft:"6px solid var(--blue)",textAlign:"left"}}>
      <div onClick={stopNav} style={{display:"flex",alignItems:"center",gap:12,marginBottom:2}}>
        <span aria-hidden="true" className="qqq-cmdl-num">{i+1}</span>
        <span className="t-label qqq-cmdl-label">{hl((it&&it.label)||"")}</span>
        <button type="button" className={"qqq-copy qqq-cmdl-copy"+(st==="done"?" is-done":"")} onClick={onCopy} aria-live="polite">{label}</button>
      </div>
      <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
        <span aria-hidden="true" className="qqq-cmd-sign qqq-cmdl-sign">&gt;</span>
        <code ref={codeRef} className="qqq-cmdl-code" onClick={stopNav} onMouseDown={stopNav} onTouchStart={stopNav} onTouchEnd={stopNav}
          style={{fontFamily:MONO}}>{cmd}</code>
      </div>
    </MI>
  );
}
function CommandList({s,step}){
  const items=s.items||[];
  const n=items.length;
  return (
    <div className="box">
      {s.eyebrow && <Eyebrow>{hl(s.eyebrow)}</Eyebrow>}
      <MI show={vF(0,step)} className="t-title" style={{marginBottom:24}}>{hl(s.title)}</MI>
      <div className={n>=4?"qqq-cmdl-dense":""} style={{display:"flex",flexDirection:"column",gap:12,width:"100%",maxWidth:1040}}>
        {items.map((it,i)=><CommandRow key={i} it={it} i={i} show={vF(1+i,step)}/>)}
      </div>
      {s.hint && <MI show={vF(1+n,step)} className="t-sub" style={{fontSize:26,marginTop:18}}>{hl(s.hint)}</MI>}
      {s.caption && <MI show={vF(1+n+(s.hint?1:0),step)} className="t-cap" style={{marginTop:14}}>{hl(s.caption)}</MI>}
    </div>
  );
}
```

---

## 8~13 공용 CSS (덱 `<style>`에 추가)
```css
/* prompt-box */
.qqq-prompt-pre{ margin:0; font-size:24px; line-height:1.6; font-weight:600; white-space:pre-wrap; word-break:break-word;
  overflow-y:auto; overscroll-behavior:contain; padding:18px 22px; border-radius:14px; color:inherit;
  background:rgba(15,23,42,.05); border:1px solid rgba(59,130,246,.18); cursor:text; user-select:text; }
.qqq-prompt-pre::-webkit-scrollbar{ width:12px; }
.qqq-prompt-pre::-webkit-scrollbar-thumb{ background:rgba(59,130,246,.45); border-radius:8px; border:3px solid transparent; background-clip:padding-box; }
.theme-dark .qqq-prompt-pre{ background:rgba(255,255,255,.06); border-color:rgba(255,255,255,.14); }
.qqq-copy{ flex-shrink:0; font:inherit; font-size:24px; font-weight:800; color:#fff; cursor:pointer;
  padding:10px 24px; border:0; border-radius:14px; background:linear-gradient(135deg,#3B82F6,#0EA5E9);
  box-shadow:0 6px 18px rgba(59,130,246,.35); transition:background .2s ease, transform .15s ease; }
.qqq-copy:hover{ transform:translateY(-2px); }
.qqq-copy.is-done{ background:linear-gradient(135deg,#10B981,#14B8A6); box-shadow:0 6px 18px rgba(16,185,129,.35); }
/* command-box */
.qqq-cmd-sign{ flex-shrink:0; font-size:32px; font-weight:900; color:var(--blue); }
.qqq-cmd-code{ flex:1; min-width:0; font-size:30px; font-weight:700; white-space:pre; overflow-x:auto; overscroll-behavior:contain;
  padding:10px 4px; color:inherit; cursor:text; user-select:text; text-align:left; }
.qqq-cmd-code::-webkit-scrollbar{ height:10px; }
.qqq-cmd-code::-webkit-scrollbar-thumb{ background:rgba(59,130,246,.45); border-radius:8px; }
/* command-list (uses .qqq-cmd-sign and .qqq-copy above) */
.qqq-cmdl-num{ flex-shrink:0; width:38px; height:38px; border-radius:999px; display:inline-flex; align-items:center; justify-content:center;
  font-size:24px; font-weight:900; color:#fff; background:linear-gradient(135deg,#3B82F6,#0EA5E9); box-shadow:0 4px 12px rgba(59,130,246,.3); }
.qqq-cmdl-label{ flex:1; min-width:0; font-size:26px; font-weight:800; color:var(--blue); }
.qqq-cmdl-copy{ padding:4px 16px; line-height:1.25; }
.qqq-cmdl-sign{ font-size:28px; line-height:1.45; }
.qqq-cmdl-code{ flex:1; min-width:0; display:block; font-size:26px; line-height:1.45; font-weight:700; color:inherit; text-align:left;
  white-space:pre-wrap; word-break:normal; overflow-wrap:anywhere; max-height:calc(2 * 1.45em + 4px); overflow-y:auto;
  overscroll-behavior:contain; padding:2px 4px; cursor:text; user-select:text; }
.qqq-cmdl-dense .qqq-cmdl-code{ white-space:pre; overflow-wrap:normal; max-height:none; overflow-x:auto; overflow-y:hidden; }
.qqq-cmdl-code::-webkit-scrollbar{ width:10px; height:10px; }
.qqq-cmdl-code::-webkit-scrollbar-thumb{ background:rgba(59,130,246,.45); border-radius:8px; }
/* screenshot-slot */
.qqq-shot-empty{ display:block; border:4px dashed rgba(59,130,246,.45); border-radius:22px; background:rgba(255,255,255,.35);
  backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px); }
.theme-dark .qqq-shot-empty{ border-color:rgba(122,184,255,.5); background:rgba(255,255,255,.04); }
/* pink-reversal */
.qqq-rev-lead{ font-size:56px; font-weight:900; letter-spacing:-.01em; color:#BE185D; }
.qqq-rev-bar{ width:220px; height:10px; }
.qqq-rev-bar span{ display:block; height:100%; border-radius:999px; background:linear-gradient(90deg,#fff,#F472B6,#BE185D);
  box-shadow:0 4px 16px rgba(190,24,93,.35); }
/* bling(핑크) 테마 배경·강조색 — pink-reversal이 쓰는 테마. 블롭·오로라·✨는 motion-theme-upgrades.md 8번 */
.app-wrap.theme-bling{ background:linear-gradient(135deg,#FFC2DD 0%,#FF9ECB 48%,#FFB8D7 100%); color:#3F0A24;
  --ink:#3F0A24; --muted:#831843; --blue:#BE185D; --sky:#E11D48; --rose:#9F1239; --emerald:#047857; }
.theme-bling .t-hero, .theme-bling .t-title{ color:#3F0A24; }
.theme-bling .t-sub, .theme-bling .t-cap{ color:#831843; }
```
> bling은 `--blue`를 진한 핑크로 덮어써 `*단어*`·Eyebrow 밑줄·카드 강조가 핑크 계열이 된다(핑크 장에서만). 보라 금지 규칙은 그대로 — 핑크·로즈만 쓴다. 배경 `#FF9ECB` 위 `#3F0A24` 글자 대비 ≈ 8.6:1, `#831843`(캡션) ≈ 5:1, `#BE185D` ≈ 3.2:1(56px 굵은 글씨라 큰 글자 기준 통과).

---

## Slide 스위치 등록
```jsx
case "reproduce": return <Reproduce s={s} step={step}/>;
case "platforms": return <Platforms s={s} step={step}/>;
case "reasons":   return <Reasons s={s} step={step}/>;
case "keymsg":    return <KeyMsg s={s} step={step}/>;
case "versus":    return <Versus s={s} step={step}/>;
case "bridge":    return <Bridge s={s} step={step}/>;
case "tradeoff":  return <Tradeoff s={s} step={step}/>;
case "prompt-box":         return <PromptBox s={s} step={step}/>;
case "screenshot-slot":    return <ScreenshotSlot s={s} step={step}/>;
case "pink-reversal":      return <PinkReversal s={s} step={step}/>;
case "before-after-panel": return <BeforeAfterPanel s={s} step={step}/>;
case "command-box":        return <CommandBox s={s} step={step}/>;
case "command-list":       return <CommandList s={s} step={step}/>;
```

## 다크/핑크 테마 메모
- 다 light/dark/bling 모두에서 동작(글자색·glass는 테마 CSS가 처리). 단 `platforms`/`keymsg`의 칩 배경이 옅은 블루라 다크에서 약하면 칩 배경을 `rgba(255,255,255,.08)`로.
- 섹션 전환·강조 한 장은 dark, "그러나/반전" 한 장은 `pink-reversal`(항상 bling 핑크)로 쓰면 리듬이 산다.
- **bling 배경은 위 "8~12 공용 CSS"의 `.app-wrap.theme-bling`이 정의한다**(예전엔 오로라·블롭·✨만 있고 배경 그라디언트가 없었다). 다른 type에 `theme:"bling"`을 줘도 같은 핑크 배경·강조색이 된다.
- `prompt-box`·`command-box`·`screenshot-slot`·`before-after-panel`은 light/dark 모두 확인했다. `command-list` was checked in light and dark at 1920×1080 and 1280×720. 다크에선 프롬프트 상자·자리 표시 틀이 투명 톤으로 바뀐다(공용 CSS의 `.theme-dark` 줄).
