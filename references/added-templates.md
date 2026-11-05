# 추가 템플릿 + kinetic type kit (복붙용 스펙, 1~18절)

`bsv-qqq-react-live-lecture-visual-slides`로 실제 강의 덱을 만들며 검증된 7개 템플릿(1~7)과, 강의 시나리오(`bsv-qqq-lecture-scenario`의 SLIDES.md)용으로 추가한 5개 템플릿(8~12: `prompt-box`·`screenshot-slot`·`pink-reversal`·`before-after-panel`·`command-box`), plus 13 `command-list` (multi-line command copy), 14 `capture-compare` (before → after capture pairs with enlarge), 15 the kinetic type kit (ported from the user's video skill), 16 `big-question` and 17 `key-message` (new default looks for two base templates, `variant:"classic"` keeps the old look) and 18 `outcome-cards` (No. 89, learning outcomes with built-in mini-visuals). 모두 **모듈 레벨 함수**(render 함수 안 정의 금지 — snap 방지)이고, 공용 헬퍼 `hl()`·`MI`·`Idle`·`Eyebrow`·`vF`·`PCOL`을 그대로 쓴다. 글자는 전부 24px+, 그라디언트 텍스트는 `color` fallback 먼저(`hl`이 처리). 등장은 FM 프리셋(`MI`), 지속 모션은 비텍스트(`Idle`)에만.

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

- `image`: 덱 HTML 기준 상대 경로(`img/s07-result.png`, 시나리오가 준 파일 이름 `실습1-결과.png` 그대로) 또는 `data:` URI. Rendered through `imgSrc()` (section 14), so an image embedded in `<template id="qqq-images">` under the same path is used first (one-file offline deck). 편집기의 `image` 칸에 경로를 넣으면 바로 바뀐다. 비어 있거나 `[강사 캡처 예정]`처럼 **대괄호로 감싼 표시**면 자리 표시 틀을 그린다.
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
          ? <img src={imgSrc(s.image)} alt={s.alt||""} onError={()=>setBroken(true)}
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

## 14. `capture-compare` — before → after capture pairs (No. 88)
**When**: 2–3 real result captures, each shown as a pair: the capture before the change → the capture after it. One row per case: a label and a one-line note, then the before image, an arrow and the after image. One whole-screen capture stays `screenshot-slot` (9). Text-only before/after lists stay `before-after-panel` (11). Requested by the scenario as `component: NEW capture-compare` (slots: `title`·`cases.N.label`·`cases.N.before`·`cases.N.after`·`cases.N.note`·`cases.N.alt`·`caption`).

- `before`/`after` are image paths relative to the deck HTML (the scenario's `assets/…` names, kept as written) or `data:` URIs. `imgSrc()` (below) first looks for an embedded copy, so a one-file offline deck keeps the scenario paths in its data: put each image in `<template id="qqq-images"><img data-src="assets/x.png" src="data:image/png;base64,…"></template>` in `<body>`. A `<template>` is a DOM element, so the built-in editor's save keeps it. `screenshot-slot` uses the same `imgSrc()`.
- Each row is a glass card. The before cell has a rose border, the after cell a blue border, with the arrow between them (the same colour code as `before-after-panel`). Images keep their aspect ratio inside a 456×120 cell. Small strips are scaled up to 2× at most, so thin crops stay readable without blurring. A missing or broken image shows a dashed cell with `QQQ_UI.shotEmpty`.
- **Enlarge**: the whole pair is one `<button>`. A click, or Tab then Enter/Space, opens a full-viewport dialog (`ReactDOM.createPortal` to `document.body`, so the canvas scale does not shrink it). The dialog shows the label, the before image, ↓, the after image and the note, each image up to about 40vh. Esc, a click anywhere or the `✕ Esc` button closes it, and focus goes back to the pair. While it is open, a capture-phase key listener stops the slide navigation keys. Clicks inside call `stopPropagation()`, so neither the stage click nor the portal's React bubbling moves the slide.
- `alt` is the button's accessible name, after the label (`label — alt`). It is not drawn on the slide. The images inside the button use `alt=""`, so screen readers do not read the case twice. `label`, `note`, `title` and `caption` go through `hl()`.
- Text: label 28px, note 26px, the dialog's label 30px, note 26px and close button 24px. Rows: 3 cases fit in 792px with the title and caption. 4 or more cases: split the slide in the scenario (the reader warns outside 2–3).
- No new UI strings: the component reuses `QQQ_UI.shotEmpty`. The close button is the symbol `✕` and the key name `Esc`. Needs `QQQ_UI` from section 8.

Data:
```js
{ id, type:"capture-compare", theme:"light", eyebrow, title:"Dates move with the *weekday*",
  cases:[
    { label:"Date and weekday", before:"assets/case-a-before.png", after:"assets/case-a-after.png",
      note:"3rd Tuesday stays 3rd Tuesday", alt:"Left: last year's deadline boxed in red. Right: this year's date on the same line." },
    { label:"Linked dates", before:"assets/case-b-before.png", after:"assets/case-b-after.png", note:"The next day moves too", alt:"…" },
  ],
  caption, builds:["title","c0","c1","caption"] }   // one "c<n>" per case; caption only when present
```
```jsx
// Embedded image lookup (shared with screenshot-slot): <template id="qqq-images"><img data-src="assets/x.png" src="data:…"></template>
const QQQ_IMAGES = (() => { const o = {}; try {
  const t = document.getElementById("qqq-images");
  if (t) t.content.querySelectorAll("img[data-src]").forEach(im => { o[im.dataset.src] = im.getAttribute("src"); });
} catch (e) {} return o; })();
const imgSrc = p => { const k = String(p || "").trim(); return QQQ_IMAGES[k] || k; };
const isShot = p => { const k = String(p || "").trim(); return !!k && !/^\[.*\]$/.test(k); };   // "[강사 캡처 예정]" = empty
const CC_W = 456, CC_H = 120, CC_UP = 2;           // image box inside a cell; max upscale for thin strips

function CaptureCell({ src, tone }) {
  const [nat, setNat] = React.useState(null);
  const [broken, setBroken] = React.useState(false);
  React.useEffect(() => { setNat(null); setBroken(false); }, [src]);
  const ok = isShot(src) && !broken;
  const k = nat ? Math.min(CC_UP, CC_W / nat.w, CC_H / nat.h) : 1;
  return (
    <div className={"qqq-cc-cell " + (tone === "before" ? "is-before" : "is-after")}>
      {ok
        ? <img src={imgSrc(src)} alt="" draggable="false" onError={() => setBroken(true)}
            onLoad={e => setNat({ w: e.currentTarget.naturalWidth || 1, h: e.currentTarget.naturalHeight || 1 })}
            style={nat ? { width: Math.round(nat.w * k), height: Math.round(nat.h * k) } : { maxWidth: CC_W, maxHeight: CC_H }}/>
        : <span className="qqq-cc-miss"><span aria-hidden="true">🖼️</span> {QQQ_UI.shotEmpty}</span>}
    </div>
  );
}

function CaptureZoom({ c, onClose }) {
  const closeRef = React.useRef(null);
  React.useEffect(() => {
    const onKey = e => {                      // capture phase: runs before the deck's key navigation
      e.stopPropagation();
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") { e.preventDefault(); onClose(); }
      else if (e.key !== "Tab") e.preventDefault();
    };
    window.addEventListener("keydown", onKey, true);
    if (closeRef.current) closeRef.current.focus();
    return () => window.removeEventListener("keydown", onKey, true);
  }, [onClose]);
  const shot = p => isShot(p) ? <img src={imgSrc(p)} alt="" className="qqq-cc-zimg"/> : <span className="qqq-cc-miss">{QQQ_UI.shotEmpty}</span>;
  const name = String(c.label || "").replace(/[*~_]/g, "");
  return ReactDOM.createPortal(
    <div className="qqq-cc-zoom" role="dialog" aria-modal="true" aria-label={name}
      onClick={e => { e.stopPropagation(); onClose(); }} onMouseDown={stopNav} onTouchStart={stopNav} onTouchEnd={stopNav}>
      <div className="qqq-cc-zhead">
        <span className="qqq-cc-zlabel">{hl(c.label || "")}</span>
        <button type="button" ref={closeRef} className="qqq-copy" onClick={e => { e.stopPropagation(); onClose(); }}>✕ Esc</button>
      </div>
      <div className="qqq-cc-zpair">
        <div className="qqq-cc-zbox is-before">{shot(c.before)}</div>
        <div className="qqq-cc-zarrow" aria-hidden="true">↓</div>
        <div className="qqq-cc-zbox is-after">{shot(c.after)}</div>
      </div>
      {c.note && <div className="qqq-cc-znote">{hl(c.note)}</div>}
    </div>, document.body);
}

function CaptureRow({ c, show }) {
  const [open, setOpen] = React.useState(false);
  const btnRef = React.useRef(null);
  const close = React.useCallback(() => { setOpen(false); setTimeout(() => btnRef.current && btnRef.current.focus(), 0); }, []);
  const name = [c.label, c.alt].filter(Boolean).map(x => String(x).replace(/[*~_]/g, "")).join(" — ");
  return (
    <MI show={show} className="glass qqq-cc-row" style={{ width: "100%", padding: "12px 18px 14px", textAlign: "left" }}>
      <div className="qqq-cc-head">
        <span className="t-label qqq-cc-label">{hl(c.label || "")}</span>
        {c.note && <span className="t-body qqq-cc-note">{hl(c.note)}</span>}
      </div>
      <button type="button" ref={btnRef} className="qqq-cc-pair" aria-label={name} aria-haspopup="dialog"
        onClick={e => { e.stopPropagation(); setOpen(true); }}
        onKeyDown={e => { if (e.key === " " || e.key === "Enter") e.stopPropagation(); }}>
        <CaptureCell src={c.before} tone="before"/>
        <svg className="qqq-cc-arrow" width="48" height="40" viewBox="0 0 48 40" aria-hidden="true">
          <defs><linearGradient id="cc-arrow" gradientUnits="userSpaceOnUse" x1="4" y1="20" x2="44" y2="20"><stop offset="0" stopColor="#F43F5E"/><stop offset="1" stopColor="#3B82F6"/></linearGradient></defs>
          <path d="M4 20 H38" stroke="url(#cc-arrow)" strokeWidth="7" strokeLinecap="round" fill="none"/>
          <path d="M28 8 L42 20 L28 32" stroke="#3B82F6" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
        <CaptureCell src={c.after} tone="after"/>
      </button>
      {open && <CaptureZoom c={c} onClose={close}/>}
    </MI>
  );
}

function CaptureCompare({s,step}){
  const cases = s.cases || [];
  const n = cases.length;
  return (
    <div className="box">
      {s.eyebrow && <Eyebrow>{hl(s.eyebrow)}</Eyebrow>}
      <MI show={vF(0,step)} className="t-title" style={{marginBottom:22}}>{hl(s.title)}</MI>
      <div style={{display:"flex",flexDirection:"column",gap:12,width:"100%",maxWidth:1056}}>
        {cases.map((c,i)=><CaptureRow key={i} c={c||{}} show={vF(1+i,step)}/>)}
      </div>
      {s.caption && <MI show={vF(1+n,step)} className="t-cap" style={{marginTop:18}}>{hl(s.caption)}</MI>}
    </div>
  );
}
```

---

## 15. Kinetic type kit — shared pieces for 16–18 (ported from the video skill)

**What it is**: a small set of module-level pieces that design the *letters themselves* — staggered word reveal, marker sweeps and hand-drawn underlines on emphasized words, 4-point sparkles and a count-up number. Sections 16 (`big-question`), 17 (`key-message`) and 18 (`outcome-cards`) use them. Any other template may use `KineticText` for a hero sentence too (one line swap from `<MI className="t-hero">{hl(x)}</MI>`).

**Source**: the ideas come from the user's own video skill `youtube-longform-maker` / `youtube-shorts-maker` (repo `rheps/youtube-maker`, private, no licence file). Nothing was copied verbatim. The patterns were re-implemented in QQQ's style (CSS transitions on a `show` class, `hl()` marker syntax, Pretendard, 24px+):

| Video skill pattern | QQQ piece |
|---|---|
| Sequential build-up: items appear one by one, item stagger 15–18 frames, ease-out cubic, small moves ≤ 30px (`DESIGN_GUIDE` motion table, `lib/anim.ts` `appear`/`rise`) | `KineticText` — words rise 0.38em with a blur-off, 55ms apart, `cubic-bezier(.22,1,.36,1)` |
| "Data gets drawn": lines draw from start to end (`strokeDashoffset`, 30 frames) | `mark="underline"` hand-drawn underline, the sub-question arrow, the checklist ticks, the dashboard ring and sparkline |
| Key number inline in the title, blue accent only (pattern 20 intro) | `mark="swipe"` highlighter band behind `*word*` after the words land |
| 4-point sparkle cluster around the hero, appearing after the title (pattern 18) | `Sparkle4` |
| Counter 0 → N, ease-out cubic, 30–40 frames (motion table) | `CountText` (reserves its final width, no layout shift) |
| Layout stability: reserve the space before the reveal (`Reveal` keeps its place) | every piece is laid out at full size from the start; only opacity/transform/filter animate |
| Theme tokens with meaning (`theme.ts` tone helpers) | the existing `--blue`/`--rose`/`--emerald` variables: `*x*` blue, `~x~` rose, `_x_` emerald, in light, dark and bling |

Rules kept from QQQ: reading text gets an **entrance only, never an idle loop** (sparkles, quote marks and the big `?` are decoration and may breathe). `hl()` itself is unchanged — the global "no marker sweep inside `hl()`" rule still holds; the sweep lives only inside `KineticText`. **Reduced motion and review mode** (`html[data-review]`): every piece shows its final state at once (CSS `@media (prefers-reduced-motion: reduce)` plus `KSTILL()`). No new UI strings.

```jsx
// still mode: reduced motion or review stills -> final state, no transitions
const KSTILL = () => { try {
  return document.documentElement.hasAttribute("data-review") || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
} catch (e) { return false; } };

// show -> on one frame later, so CSS transitions also run on the first mount
function useOn(show) {
  const [on, setOn] = React.useState(false);
  React.useEffect(() => {
    if (!show) { setOn(false); return; }
    if (KSTILL()) { setOn(true); return; }
    let r2 = 0;
    const r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(() => setOn(true)); });
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); };
  }, [show]);
  return on;
}

// hl() markup -> word tokens. A marked phrase (*a b*) stays one token so its marker is one band.
const K_MARK = /^(\*[^*]+\*|~[^~]+~|_[^_]+_)$/;
function kTokens(text) {
  const out = []; let i = 0;
  String(text == null ? "" : text).split(/(\*[^*]+\*|~[^~]+~|_[^_]+_)/).forEach(seg => {
    if (!seg) return;
    if (K_MARK.test(seg)) { out.push({ k: "w", s: seg.slice(1, -1), m: seg[0] === "*" ? "b" : seg[0] === "~" ? "r" : "g", i: i++ }); return; }
    seg.split(/(\n)/).forEach(part => {
      if (part === "\n") { out.push({ k: "br" }); return; }
      part.split(/(\s+)/).forEach(w => {
        if (!w) return;
        if (/^\s+$/.test(w)) out.push({ k: "sp" }); else out.push({ k: "w", s: w, m: null, i: i++ });
      });
    });
  });
  return out;
}

// Kinetic sentence: staggered word reveal; marked words get a marker. mark: "swipe" | "underline" | "ink"
function KineticText({ text, show, mark = "swipe", delay = 0, as = "div", className, style }) {
  const on = useOn(show);
  const toks = kTokens(text);
  const n = toks.filter(t => t.k === "w").length;
  const Tag = as;
  const nl = s => String(s).split("\n").map((x, j) => j ? [<br key={"b" + j}/>, x] : x);
  return (
    <Tag className={"qqq-kt" + (on ? " is-on" : "") + (className ? " " + className : "")}
      style={{ ...(style || {}), "--kd": delay + "s", "--kn": n }}>
      {toks.map((t, j) => t.k === "br" ? <br key={j}/> : t.k === "sp" ? " " :
        <span key={j} className={"qqq-kw" + (t.m ? " qqq-mk is-" + t.m + " qqq-mark-" + mark : "")} style={{ "--i": t.i }}>
          {t.m ? <span className="qqq-mk-ink">{nl(t.s)}</span> : t.s}
          {t.m && mark === "underline" &&
            <svg className="qqq-mk-line" viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true">
              <path d="M2 8 C 20 3, 44 11, 66 6 S 90 4, 98 7" pathLength="1"/>
            </svg>}
        </span>)}
    </Tag>
  );
}

// 4-point sparkle (decoration): pops in when an ancestor gets .is-on, then twinkles
function Sparkle4({ size = 34, tone = "sky", delay = 0, style }) {
  return (
    <svg className={"qqq-spk is-" + tone} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"
      style={{ ...(style || {}), "--sd": delay + "s" }}>
      <path d="M12 0C12.9 7.6 16.4 11.1 24 12C16.4 12.9 12.9 16.4 12 24C11.1 16.4 7.6 12.9 0 12C7.6 11.1 11.1 7.6 12 0Z"/>
    </svg>
  );
}

// Count-up number (ease-out cubic). Width is reserved for the final value, so nothing shifts.
function CountText({ value, show, seconds = 0.9, suffix = "" }) {
  const target = Number(value) || 0;
  const [v, setV] = React.useState(0);
  React.useEffect(() => {
    if (!show) { setV(0); return; }
    if (KSTILL()) { setV(target); return; }
    let raf = 0, t0 = null;
    const tick = t => {
      if (t0 === null) t0 = t;
      const p = Math.min(1, (t - t0) / (seconds * 1000));
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [show, target, seconds]);
  const full = target.toLocaleString() + suffix;
  return <span className="qqq-count" style={{ minWidth: full.length + "ch" }}>{v.toLocaleString()}{suffix}</span>;
}
```

---

## 16. `big-question` — kinetic display question (No. 7, new default look)

**When**: the one question thrown to the audience. Slots: `title` (the judging sentence, `**emphasis**` in SLIDES.md), `question`, the optional `sub` and the common `eyebrow`/`caption`. Old SLIDES.md and decks with only `question` still work. The new look is the **default**. `variant:"classic"` keeps the old look (big blue `?` above the sentence).

- **Which line is big** (`bqLines`, used by both variants and mirrored by the reader's `buildsFor`):
  - `title` **and** a different `question` → `title` is the big line and `question` is the arrow line under it. `sub` (if any) follows as a second arrow line.
  - only one of them, or both the same sentence (markers and spaces ignored) → that sentence is the big line and `sub` is the arrow line.
- **Kinetic (default)**: no box. The big line is display type (80px/900, tight tracking, `text-wrap:balance`) and rises word by word. The `*emphasized*` word gets the gradient fill plus a **hand-drawn underline** drawn after the words land (`~x~` rose, `_x_` emerald). A huge faint gradient `?` sits behind the sentence and breathes (decoration). Three `Sparkle4` pop in after the big line.
- Arrow lines: **not in a box** — a hand-drawn curved arrow draws itself, then the line appears in 36px with a slight tilt, like a note written beside the big line. Each arrow line is its own build step (the second one has no arrow of its own).
- builds: `["title", "question", "sub"?, "caption"?]` when `title` and `question` differ, else `["question", "sub"?, "caption"?]` (the reader adds `sub`/`caption` only when present). The component reads steps by index, so the names are labels.
- `variant`: `"kinetic"` (default, also when empty) or `"classic"`. The editor may change it; the two variants are separate components, so switching remounts cleanly.

Data:
```js
{ id, type:"big-question", theme:"dark", eyebrow,
  title:"Can we use AI worksheets *as they are*?",   // big line (judging sentence)
  question:"What do we check first?",              // arrow line under it ("" -> title only)
  sub:"",                      // optional extra arrow line
  caption:"", variant:"",      // "" = kinetic; "classic" = old look
  builds:["title","question"] }  // only question (or title == question): ["question"]; + "sub" / "caption" when present
```
```jsx
// title + a different question -> title is the big line, question (then sub) the arrow lines.
// Only one of them, or the same sentence twice -> that sentence is the big line, sub the arrow line.
const bqKey = x => String(x == null ? "" : x).replace(/[*~_\s]/g, "");
function bqLines(s) {
  const t = String(s.title || "").trim(), q = String(s.question || "").trim();
  const both = !!(t && q && bqKey(t) !== bqKey(q));
  return { head: both ? t : (q || t), follow: [both ? q : "", s.sub].filter(x => String(x || "").trim()) };
}

function BigQuestionClassic({ s, step }) {
  const { head, follow } = bqLines(s);
  return (
    <div className="box">
      {s.eyebrow && <Eyebrow>{hl(s.eyebrow)}</Eyebrow>}
      <MI show={vF(0, step)} anim="pop" style={{ marginBottom: 18 }}>
        <Idle kind="breathe" style={{ fontSize: 120, fontWeight: 900, color: "var(--blue)" }}>?</Idle>
      </MI>
      <MI show={vF(0, step)} className="t-hero" style={{ fontSize: 64, lineHeight: 1.3, maxWidth: 1000 }}>{hl(head)}</MI>
      {follow.map((f, k) => <MI key={k} show={vF(1 + k, step)} className="t-sub" style={{ fontSize: 32, marginTop: k ? 10 : 24 }}>{hl(f)}</MI>)}
      {s.caption && <MI show={vF(1 + follow.length, step)} className="t-cap" style={{ marginTop: 28 }}>{hl(s.caption)}</MI>}
    </div>
  );
}

function BqFollow({ text, show, first }) {
  const on = useOn(show);
  return (
    <div className={"qqq-bq-sub" + (first ? "" : " qqq-bq-sub2") + (on ? " is-on" : "")}>
      {first ? <svg className="qqq-bq-arrow" viewBox="0 0 90 60" aria-hidden="true">
        <path d="M8 6 C 6 30, 26 48, 72 46" pathLength="1"/>
        <path d="M60 34 L74 46 L58 56" pathLength="1"/>
      </svg> : <span className="qqq-bq-arrow" aria-hidden="true"/>}
      <KineticText as="span" className="t-sub qqq-bq-subt" text={text} show={show} delay={first ? 0.3 : 0} mark="ink"/>
    </div>
  );
}

function BigQuestionKinetic({ s, step }) {
  const { head, follow } = bqLines(s);
  const q = vF(0, step);
  const qOn = useOn(q);
  return (
    <div className="box qqq-bq">
      {s.eyebrow && <Eyebrow>{hl(s.eyebrow)}</Eyebrow>}
      <div className={"qqq-bq-stage" + (qOn ? " is-on" : "")}>
        <div className="qqq-bq-glyph" aria-hidden="true">
          <MI show={q} anim="zoom"><Idle kind="breathe"><span className="qqq-bq-qm">?</span></Idle></MI>
        </div>
        <Sparkle4 size={44} tone="sky" delay={0.9} style={{ left: "4%", top: "6%" }}/>
        <Sparkle4 size={28} tone="blue" delay={1.2} style={{ right: "16%", top: "-2%" }}/>
        <Sparkle4 size={34} tone="amber" delay={1.5} style={{ right: "3%", bottom: "4%" }}/>
        <KineticText className="t-hero qqq-bq-q" text={head} show={q} mark="underline"/>
      </div>
      {follow.map((f, k) => <BqFollow key={k} text={f} show={vF(1 + k, step)} first={k === 0}/>)}
      {s.caption && <MI show={vF(1 + follow.length, step)} className="t-cap" style={{ marginTop: 30 }}>{hl(s.caption)}</MI>}
    </div>
  );
}

function BigQuestion({ s, step }) {
  return s.variant === "classic" ? <BigQuestionClassic s={s} step={step}/> : <BigQuestionKinetic s={s} step={step}/>;
}
```

---

## 17. `key-message` — editorial pull-quote (No. 4, new default look)

**When**: one sentence the lecturer stands behind — a claim, or their own words ("학교 일을 하며 제가 느낀 것"). Same type and slots as before (`lead`, `message`) plus the optional `by` (attribution line) and the common `eyebrow`/`caption`. The new look is the **default**. `variant:"classic"` keeps the old look (small muted `lead` over a centred 58px `message`).

- **Quote (default)**: an editorial pull-quote, **no box**. `lead` becomes the kicker above the quote (28px/800 in `--blue`, after a 56px gradient rule). Large gradient quotation marks are drawn in SVG (not a font glyph): the opening mark pops in at the top left, a small closing mark follows at the bottom right. `message` is display type (62px/800, left-aligned, max 980px) and rises word by word. `*emphasized*` words get a **highlighter sweep** behind them after the words land. `by` is the attribution line under the quote (`— name`, 28px muted).
- builds: `["lead"?, "message", "by"?, "caption"?]`. Hint: for the lecturer's own words, put the setup in `lead` ("학교 일을 하며 제가 느낀 것") and the point in `message` (SKILL #17: the point is the hero).
- `variant`: `"quote"` (default, also when empty) or `"classic"`.

Data:
```js
{ id, type:"key-message", theme:"light", eyebrow,
  title:"",                                  // editor label only (not drawn)
  lead:"What I learned at school",            // kicker: the setup (e.g. the lecturer's "what I felt doing school work")
  message:"The *structure* does the work",
  by:"", caption:"", variant:"",             // "" = quote; "classic" = old look
  builds:["lead","message"] }                // + "by" / "caption" when present
```
```jsx
function KeyMessageClassic({ s, step }) {
  const iMsg = s.lead ? 1 : 0;
  return (
    <div className="box">
      {s.eyebrow && <Eyebrow>{hl(s.eyebrow)}</Eyebrow>}
      {s.lead && <MI show={vF(0, step)} className="t-sub" style={{ marginBottom: 18 }}>{hl(s.lead)}</MI>}
      <MI show={vF(iMsg, step)} className="t-hero" style={{ fontSize: 58 }}>{hl(s.message)}</MI>
      {s.by && <MI show={vF(iMsg + 1, step)} className="t-sub" style={{ fontSize: 28, marginTop: 24 }}>{hl(s.by)}</MI>}
      {s.caption && <MI show={vF(iMsg + (s.by ? 2 : 1), step)} className="t-cap" style={{ marginTop: 28 }}>{hl(s.caption)}</MI>}
    </div>
  );
}

const KM_MARK = "M10 66C10 38 22 18 46 6L51 14C36 24 29 36 28 46C41 44 52 54 52 67C52 81 41 91 28 91C17 91 10 81 10 66Z";
function KmMark({ className }) {
  return (
    <svg className={className} viewBox="0 0 120 96" aria-hidden="true">
      <defs><linearGradient id="qqq-km-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" style={{ stopColor: "var(--blue)" }}/><stop offset="1" style={{ stopColor: "var(--sky)" }}/>
      </linearGradient></defs>
      <path d={KM_MARK} fill="url(#qqq-km-g)"/>
      <path d={KM_MARK} transform="translate(58 0)" fill="url(#qqq-km-g)"/>
    </svg>
  );
}

function KeyMessageQuote({ s, step }) {
  const iMsg = s.lead ? 1 : 0;
  const msgOn = useOn(vF(iMsg, step));
  return (
    <div className="box qqq-km">
      {s.eyebrow && <Eyebrow>{hl(s.eyebrow)}</Eyebrow>}
      <figure className={"qqq-km-fig" + (msgOn ? " is-on" : "")}>
        {s.lead && <MI show={vF(0, step)} anim="left" className="qqq-km-lead">{hl(s.lead)}</MI>}
        <div className="qqq-km-body">
          <KmMark className="qqq-km-open"/>
          <KineticText as="blockquote" className="t-hero qqq-km-msg" text={s.message} show={vF(iMsg, step)} mark="swipe" delay={0.15}/>
          <KmMark className="qqq-km-close"/>
        </div>
        {s.by && <MI show={vF(iMsg + 1, step)} anim="rise" className="qqq-km-by"><span className="qqq-km-dash" aria-hidden="true"/>{hl(s.by)}</MI>}
      </figure>
      {s.caption && <MI show={vF(iMsg + (s.by ? 2 : 1), step)} className="t-cap" style={{ marginTop: 34 }}>{hl(s.caption)}</MI>}
    </div>
  );
}

function KeyMessage({ s, step }) {
  return s.variant === "classic" ? <KeyMessageClassic s={s} step={step}/> : <KeyMessageQuote s={s} step={step}/>;
}
```

> **Replacing the base templates**: `KeyMessage` and `BigQuestion` were part of the 13 base templates (`structure-catalog.md`). When a deck uses these sections, delete the deck's old `KeyMessage`/`BigQuestion` functions and paste 15–17. The old `chips` row of some decks' `KeyMessage` (an older variant) is not part of the contract: use `keymsg` (No. 78) for a sentence with chips.

---

## 18. `outcome-cards` — what the audience will be able to do (No. 89)

**When**: "연수를 다 마치면, 이 세 가지를 배우게 됩니다" — 2–4 learning outcomes, each shown as a **designed mini-visual drawn in CSS/SVG** (not a screenshot) above a label and a short description. Ordered or unordered, but each outcome is a *result*, so the visual shows the result happening. Plain parallel items without a result stay `four-card`. Requested by the scenario as `component: outcome-cards` (slots: `title` · `items.N.icon` · `items.N.label` · `items.N.desc` · `items.N.visual` · `caption`).

- `items.N.icon`: an emoji (`📁`) or a built-in icon key: `folder`, `chart`, `doc`, `check`, `calendar`, `clock`, `spark` (white-on-colour line icons). Shown next to the card number; with the `icon` visual it is drawn big in the orb instead.
- `items.N.visual` (optional): one key from the built-in set. Unknown or empty → `icon`.

  | key | what it draws (plays once when the card appears) |
  |---|---|
  | `folder-sort` | three loose files drop into three coloured sub-folders |
  | `mini-dashboard` | a small window: four bars grow, a ring fills, a sparkline draws |
  | `doc-year-flip` | a document whose year flips from last year to this year (calendar year from the viewer's clock); last year moves up, struck through in rose, then a check stamp is drawn |
  | `checklist` (generic) | three rows tick off one after another |
  | `icon` (generic, default) | the icon in a glossy orb with a slowly turning dashed ring and two sparkles |

- Card: glass, a 5px top accent in the card's colour (blue, emerald, amber, sky in order), the visual (aspect 280:160), then `01` number + icon, `label` (32px/900; 28px with 4 cards) and `desc` (26px; 24px with 4 cards). `label`, `desc`, `title` and `caption` go through `hl()`.
- Motion: cards enter from left / flip / right (`["left","flipX","right"]`, 4 cards `["left","flipX","flipX","right"]`); the visual plays after its card lands. Only the decorative parts keep a light idle (the orb ring, the dashboard's live dot). Reduced motion / review: final state at once.
- 2–4 items. The reader warns outside that range and when `label` is missing. No new UI strings (numbers and years are drawn, not words).

Data:
```js
{ id, type:"outcome-cards", theme:"light", eyebrow,
  title:"By the end, you will have *three* things",
  items:[
    { icon:"📁", label:"Sorted folders", desc:"Files land in the right place", visual:"folder-sort" },
    { icon:"chart", label:"A live dashboard", desc:"See every task at a glance", visual:"mini-dashboard" },
    { icon:"doc", label:"This year's documents", desc:"Last year's files, updated", visual:"doc-year-flip" },
  ],
  caption, builds:["title","o0","o1","o2","caption"] }   // one "o<n>" per item; caption only when present
```
```jsx
const OC_ICON = {
  folder: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  chart: "M5 20V11M11 20V5M17 20v-6M3 20h18",
  doc: "M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h4",
  check: "M5 12.5l4.5 4.5L19 7",
  calendar: "M4 6h16v14H4zM4 10h16M9 3v5M15 3v5",
  clock: "M12 3a9 9 0 1 0 0.01 0zM12 7v5l3.5 2.5",
  spark: "M12 3l2.3 6.4L21 12l-6.7 2.6L12 21l-2.3-6.4L3 12l6.7-2.6z",
};
const OC_VISUALS = ["folder-sort", "mini-dashboard", "doc-year-flip", "checklist", "icon"];
const OC_TONES = ["blue", "emerald", "amber", "sky"];
const OC_ANIM = n => n >= 4 ? ["left", "flipX", "flipX", "right"] : n === 2 ? ["left", "right"] : ["left", "flipX", "right"];

function OcIcon({ icon, size = 40 }) {
  const k = String(icon || "").trim();
  if (OC_ICON[k]) return (
    <span className="qqq-oc-ico" style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 24 24" width={size * 0.62} height={size * 0.62}><path d={OC_ICON[k]}/></svg>
    </span>);
  return k ? <span className="qqq-oc-emoji" style={{ fontSize: size }} aria-hidden="true">{k}</span> : null;
}

function OcVisual({ kind, icon, n }) {
  if (kind === "folder-sort") return (
    <svg className="qqq-oc-svg oc-v-folder" viewBox="0 0 280 160" aria-hidden="true">
      {[0, 1, 2].map(k => <path key={"b" + k} className={"oc-fback oc-k" + k} transform={`translate(${28 + k * 84} 86)`}
        d="M0 8Q0 0 8 0H26L34 8H62Q70 8 70 16V62Q70 70 62 70H8Q0 70 0 62Z"/>)}
      {[0, 1, 2].map(k => <g key={"f" + k} className={"oc-file oc-f" + k}>
        <path className="oc-sheet" d="M0 0H22L32 10V44H0Z"/><path className="oc-fold" d="M22 0V10H32"/>
        <path className="oc-ln" d="M6 20H26M6 28H26M6 36H18"/></g>)}
      {[0, 1, 2].map(k => <path key={"c" + k} className={"oc-ffront oc-k" + k} transform={`translate(${28 + k * 84} 86)`}
        d="M0 28Q0 22 6 22H64Q70 22 70 28V62Q70 70 62 70H8Q0 70 0 62Z"/>)}
    </svg>);
  if (kind === "mini-dashboard") return (
    <svg className="qqq-oc-svg oc-v-dash" viewBox="0 0 280 160" aria-hidden="true">
      <rect className="oc-win" x="14" y="6" width="252" height="148" rx="14"/>
      <path className="oc-winbar" d="M14 20Q14 6 28 6H252Q266 6 266 20V28H14Z"/>
      {[0, 1, 2].map(k => <circle key={k} className={"oc-dot oc-d" + k} cx={30 + k * 13} cy="17" r="4"/>)}
      {[0.42, 0.68, 0.54, 0.9].map((h, k) => <rect key={k} className={"oc-bar oc-b" + k} x={34 + k * 30} y={140 - h * 92} width="20" height={h * 92} rx="5"/>)}
      <path className="oc-base" d="M28 141H158"/>
      <circle className="oc-ring-bg" cx="214" cy="74" r="28"/>
      <circle className="oc-ring" cx="214" cy="74" r="28" pathLength="1" transform="rotate(-90 214 74)"/>
      <path className="oc-spark" d="M182 134L198 122L212 128L230 110L248 116" pathLength="1"/>
    </svg>);
  if (kind === "doc-year-flip") {
    const y = new Date().getFullYear();
    return (
      <div className="qqq-oc-doc">
        <svg className="qqq-oc-svg oc-v-doc" viewBox="0 0 280 160" aria-hidden="true">
          <path className="oc-page" d="M68 6H184L212 34V154H68Z"/><path className="oc-pfold" d="M184 6V34H212"/>
          <path className="oc-pln" d="M88 96H192M88 112H192M88 128H156"/>
          <circle className="oc-stamp" cx="194" cy="130" r="17"/>
          <path className="oc-tick" d="M185 130L191 136L203 123" pathLength="1"/>
        </svg>
        <div className="qqq-oc-year" aria-hidden="true"><span className="oc-y-old">{y - 1}</span><span className="oc-y-new">{y}</span></div>
      </div>);
  }
  if (kind === "checklist") return (
    <svg className="qqq-oc-svg oc-v-check" viewBox="0 0 280 160" aria-hidden="true">
      {[0, 1, 2].map(k => <g key={k} className={"oc-row oc-r" + k}>
        <rect className="oc-box" x="54" y={20 + k * 44} width="30" height="30" rx="8"/>
        <path className="oc-tick" d={`M61 ${35 + k * 44}L67 ${41 + k * 44}L78 ${28 + k * 44}`} pathLength="1"/>
        <path className="oc-rl" d={`M98 ${35 + k * 44}H${k === 2 ? 188 : 226}`}/></g>)}
    </svg>);
  return (
    <div className="qqq-oc-orbwrap">
      <span className="qqq-oc-ring" aria-hidden="true"/>
      <span className="qqq-oc-orb"><OcIcon icon={icon} size={n >= 4 ? 52 : 68}/></span>
      <Sparkle4 size={26} tone="sky" delay={0.6} style={{ left: "22%", top: "10%" }}/>
      <Sparkle4 size={20} tone="amber" delay={1.0} style={{ right: "22%", bottom: "12%" }}/>
    </div>);
}

function OcCard({ it, i, n, show }) {
  const on = useOn(show);
  const v = OC_VISUALS.includes(it.visual) ? it.visual : "icon";
  return (
    <MI show={show} anim={OC_ANIM(n)[i]} className={"glass qqq-oc-card qqq-oc-t-" + OC_TONES[i % 4] + (on ? " is-on" : "")}>
      <div className="qqq-oc-vis"><OcVisual kind={v} icon={it.icon} n={n}/></div>
      <div className="qqq-oc-head">
        <span className="qqq-oc-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
        {v !== "icon" && <OcIcon icon={it.icon} size={n >= 4 ? 36 : 40}/>}
      </div>
      <div className="t-label qqq-oc-label">{hl(it.label || "")}</div>
      {it.desc && <div className="t-body qqq-oc-desc">{hl(it.desc)}</div>}
    </MI>
  );
}

function OutcomeCards({s,step}){
  const items = (s.items || []).slice(0, 4);
  const n = items.length;
  return (
    <div className="box">
      {s.eyebrow && <Eyebrow>{hl(s.eyebrow)}</Eyebrow>}
      <MI show={vF(0,step)} className="t-title" style={{marginBottom:30}}>{hl(s.title)}</MI>
      <div className={"qqq-oc qqq-oc-n" + n}>
        {items.map((it,i)=><OcCard key={i} it={it||{}} i={i} n={n} show={vF(1+i,step)}/>)}
      </div>
      {s.caption && <MI show={vF(1+n,step)} className="t-cap" style={{marginTop:26}}>{hl(s.caption)}</MI>}
    </div>
  );
}
```

---

## 8~18 공용 CSS (덱 `<style>`에 추가)
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
/* capture-compare (uses .qqq-copy above for the close button) */
.qqq-cc-head{ display:flex; align-items:baseline; gap:18px; margin-bottom:8px; flex-wrap:wrap; }
.qqq-cc-label{ font-size:28px; font-weight:900; color:var(--blue); }
.qqq-cc-note{ font-size:26px; font-weight:700; line-height:1.35; }
.qqq-cc-pair{ display:grid; grid-template-columns:1fr 48px 1fr; align-items:center; gap:12px; width:100%; padding:0; margin:0;
  border:0; background:transparent; cursor:zoom-in; font:inherit; color:inherit; border-radius:14px; }
.qqq-cc-pair:focus-visible{ outline:4px solid var(--blue); outline-offset:4px; }
.qqq-cc-cell{ height:132px; display:flex; align-items:center; justify-content:center; padding:6px; border-radius:12px;
  background:#fff; border:3px solid; overflow:hidden; transition:transform .2s ease, box-shadow .2s ease; }
.qqq-cc-cell.is-before{ border-color:rgba(244,63,94,.7); }
.qqq-cc-cell.is-after{ border-color:rgba(59,130,246,.75); }
.qqq-cc-pair:hover .qqq-cc-cell{ transform:translateY(-3px); box-shadow:0 10px 24px rgba(59,130,246,.22); }
.qqq-cc-cell img{ display:block; object-fit:contain; image-rendering:auto; }
.qqq-cc-arrow{ justify-self:center; }
.qqq-cc-miss{ font-size:24px; font-weight:800; color:#3B82F6; }
.qqq-cc-zoom{ position:fixed; inset:0; z-index:40; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px;
  padding:3vh 4vw; background:rgba(15,23,42,.86); cursor:zoom-out; color:#fff;
  font-family:"Pretendard","Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif; }
.qqq-cc-zhead{ display:flex; align-items:center; gap:24px; width:100%; max-width:92vw; justify-content:space-between; }
.qqq-cc-zlabel{ font-size:30px; font-weight:900; color:#fff; }
.qqq-cc-zlabel span{ color:#7AB8FF !important; -webkit-text-fill-color:#7AB8FF !important; }
.qqq-cc-zpair{ display:flex; flex-direction:column; align-items:center; gap:8px; min-height:0; }
.qqq-cc-zbox{ background:#fff; border-radius:14px; padding:8px; border:4px solid; display:flex; }
.qqq-cc-zbox.is-before{ border-color:#F43F5E; }
.qqq-cc-zbox.is-after{ border-color:#3B82F6; }
.qqq-cc-zimg{ display:block; max-width:90vw; max-height:36vh; width:auto; height:auto; object-fit:contain; }
.qqq-cc-zarrow{ font-size:36px; font-weight:900; line-height:1; color:#7AB8FF; }
.qqq-cc-znote{ font-size:26px; font-weight:700; color:#E2E8F0; text-align:center; }
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

/* 15. kinetic type kit — words rise 55ms apart; markers land after the last word */
.qqq-kt{ --k-ease:cubic-bezier(.22,1,.36,1); --k-draw:cubic-bezier(.65,0,.35,1); }
.qqq-kw{ display:inline-block; opacity:0; transform:translateY(.38em); filter:blur(6px);
  transition:opacity .5s var(--k-ease), transform .75s var(--k-ease), filter .5s ease;
  transition-delay:calc(var(--kd,0s) + var(--i,0) * 55ms); }
.qqq-kt.is-on .qqq-kw{ opacity:1; transform:none; filter:none; }
.qqq-mk{ position:relative; isolation:isolate; font-weight:900; }
.qqq-mk.is-b{ --mk:rgba(59,130,246,.2);  --mkl:#0EA5E9; }
.qqq-mk.is-r{ --mk:rgba(244,63,94,.17);  --mkl:#F43F5E; }
.qqq-mk.is-g{ --mk:rgba(16,185,129,.2);  --mkl:#10B981; }
.qqq-mk.is-b .qqq-mk-ink{ color:var(--blue); background:linear-gradient(135deg,var(--blue),var(--sky));
  -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
.qqq-mk.is-r .qqq-mk-ink{ color:var(--rose); -webkit-text-fill-color:var(--rose); }
.qqq-mk.is-g .qqq-mk-ink{ color:var(--emerald); -webkit-text-fill-color:var(--emerald); }
.qqq-mk.qqq-mark-swipe::before{ content:""; position:absolute; z-index:-1; left:-.1em; right:-.1em; bottom:.04em; height:.46em;
  border-radius:.14em .3em .22em .12em; background:var(--mk); transform:scaleX(0); transform-origin:0 50%;
  transition:transform .6s var(--k-draw); transition-delay:calc(var(--kd,0s) + var(--kn,1) * 55ms + .4s); }
.qqq-kt.is-on .qqq-mk.qqq-mark-swipe::before{ transform:scaleX(1); }
.qqq-mk-line{ position:absolute; left:-3%; bottom:-.16em; width:106%; height:.3em; overflow:visible; pointer-events:none; }
.qqq-mk-line path{ fill:none; stroke:var(--mkl); stroke-width:3.6; stroke-linecap:round; stroke-dasharray:1; stroke-dashoffset:1;
  transition:stroke-dashoffset .7s var(--k-draw); transition-delay:calc(var(--kd,0s) + var(--kn,1) * 55ms + .4s); }
.qqq-kt.is-on .qqq-mk-line path{ stroke-dashoffset:0; }
.theme-dark .qqq-mk.is-b{ --mk:rgba(122,184,255,.26); --mkl:#4FD0FF; }
.theme-dark .qqq-mk.is-r{ --mk:rgba(255,128,149,.24); --mkl:#FF8095; }
.theme-dark .qqq-mk.is-g{ --mk:rgba(62,224,163,.22);  --mkl:#3EE0A3; }
.theme-bling .qqq-mk.is-b{ --mk:rgba(255,255,255,.6); --mkl:#BE185D; }
.qqq-spk{ position:absolute; z-index:2; pointer-events:none; opacity:0; transform:scale(.2) rotate(-40deg);
  transition:opacity .4s ease, transform .6s cubic-bezier(.34,1.56,.64,1); transition-delay:var(--sd,0s); }
.qqq-spk path{ fill:currentColor; transform-box:fill-box; transform-origin:center; }
.qqq-spk.is-sky{ color:#0EA5E9; } .qqq-spk.is-blue{ color:#3B82F6; } .qqq-spk.is-amber{ color:#F59E0B; }
.is-on .qqq-spk{ opacity:1; transform:none; }
.is-on .qqq-spk path{ animation:qqqTwinkle 2.6s ease-in-out calc(var(--sd,0s) + .6s) infinite; }
@keyframes qqqTwinkle{ 0%,100%{ transform:scale(1); opacity:1; } 50%{ transform:scale(.62) rotate(20deg); opacity:.55; } }
.qqq-count{ display:inline-block; font-variant-numeric:tabular-nums; text-align:right; }

/* 16. big-question (kinetic) */
.qqq-bq-stage{ position:relative; width:100%; max-width:1020px; padding:36px 48px; }
.qqq-bq-glyph{ position:absolute; z-index:0; right:-84px; top:50%; transform:translateY(-54%); pointer-events:none; }
.qqq-bq-qm{ display:block; font-size:420px; font-weight:900; line-height:.9; color:transparent; opacity:.16;
  background:linear-gradient(160deg,#3B82F6,#0EA5E9); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
.theme-dark .qqq-bq-qm{ opacity:.26; background:linear-gradient(160deg,#7AB8FF,#4FD0FF); -webkit-background-clip:text; background-clip:text; }
.qqq-bq-q{ position:relative; z-index:1; margin:0; font-size:80px; font-weight:900; line-height:1.2; letter-spacing:-.035em; text-wrap:balance; }
.qqq-bq-sub{ display:flex; align-items:center; justify-content:center; gap:14px; margin-top:18px; transform:rotate(-1.2deg); }
.qqq-bq-arrow{ width:84px; height:56px; flex-shrink:0; overflow:visible; }
.qqq-bq-arrow path{ fill:none; stroke:var(--blue); stroke-width:4.5; stroke-linecap:round; stroke-linejoin:round;
  stroke-dasharray:1; stroke-dashoffset:1; transition:stroke-dashoffset .5s cubic-bezier(.65,0,.35,1); }
.qqq-bq-arrow path + path{ transition-delay:.42s; transition-duration:.25s; }
.qqq-bq-sub.is-on .qqq-bq-arrow path{ stroke-dashoffset:0; }
.qqq-bq-sub2{ margin-top:6px; }
.qqq-bq-subt{ font-size:36px; font-weight:700; line-height:1.4; }

/* 17. key-message (quote) */
.qqq-km-fig{ position:relative; margin:0; width:fit-content; min-width:min(560px,100%); max-width:980px; text-align:left; }
.qqq-km-lead{ display:flex; align-items:center; gap:16px; margin-bottom:14px; font-size:28px; font-weight:800; letter-spacing:.02em; color:var(--blue); }
.qqq-km-lead::before{ content:""; flex-shrink:0; width:56px; height:6px; border-radius:9px; background:linear-gradient(90deg,var(--blue),var(--sky)); }
.qqq-km-body{ position:relative; padding:82px 64px 6px 0; }
.qqq-km-open{ position:absolute; left:-14px; top:-2px; width:108px; height:auto; opacity:0; transform:scale(.5) rotate(-14deg); transform-origin:30% 70%;
  transition:opacity .35s ease, transform .7s cubic-bezier(.34,1.56,.64,1); }
.qqq-km-close{ position:absolute; right:0; bottom:-30px; width:62px; height:auto; opacity:0; transform:rotate(180deg) scale(.5);
  transition:opacity .35s ease 1.1s, transform .7s cubic-bezier(.34,1.56,.64,1) 1.1s; }
.qqq-km-fig.is-on .qqq-km-open{ opacity:.95; transform:none; }
.qqq-km-fig.is-on .qqq-km-close{ opacity:.5; transform:rotate(180deg); }
.qqq-km-msg{ margin:0; font-size:62px; font-weight:800; line-height:1.34; letter-spacing:-.025em; text-wrap:pretty; }
.qqq-km-by{ display:flex; align-items:center; gap:14px; margin-top:38px; font-size:28px; font-weight:700; color:var(--muted,#475569); }
.qqq-km-dash{ width:40px; height:4px; border-radius:4px; background:currentColor; }
.theme-dark .qqq-km-by{ color:#CBD5E1; }

/* 18. outcome-cards — colour hex in --och/--och2 (fills), text tone in --oc (theme-aware), --ochd for text on white */
.qqq-oc{ display:grid; gap:22px; width:100%; max-width:1056px; grid-template-columns:repeat(3,minmax(0,1fr)); }
.qqq-oc.qqq-oc-n2{ grid-template-columns:repeat(2,minmax(0,1fr)); max-width:900px; }
.qqq-oc.qqq-oc-n4{ grid-template-columns:repeat(4,minmax(0,1fr)); gap:16px; }
.qqq-oc-card{ --oc:var(--blue); --och:#3B82F6; --och2:#0EA5E9; --ochd:#1D4ED8; display:flex; flex-direction:column; align-items:flex-start;
  min-width:0; padding:14px 18px 22px; text-align:left; border-top:5px solid var(--och); }
.qqq-oc-card.qqq-oc-t-emerald{ --oc:var(--emerald); --och:#10B981; --och2:#14B8A6; --ochd:#047857; }
.qqq-oc-card.qqq-oc-t-amber{ --oc:var(--amber); --och:#F59E0B; --och2:#F97316; --ochd:#B45309; }
.qqq-oc-card.qqq-oc-t-sky{ --oc:var(--sky); --och:#0EA5E9; --och2:#14B8A6; --ochd:#0369A1; }
.qqq-oc-vis{ position:relative; width:100%; aspect-ratio:280/160; margin-bottom:12px; border-radius:14px;
  background:linear-gradient(180deg,rgba(255,255,255,.6),rgba(255,255,255,.18)); }
.theme-dark .qqq-oc-vis{ background:rgba(255,255,255,.06); }
.qqq-oc-svg{ display:block; width:100%; height:100%; overflow:visible; }
.qqq-oc-head{ display:flex; align-items:center; gap:12px; margin-bottom:6px; }
.qqq-oc-num{ font-size:24px; font-weight:900; letter-spacing:.04em; color:var(--oc); }
.qqq-oc-ico{ display:inline-flex; align-items:center; justify-content:center; flex-shrink:0; border-radius:12px;
  background:linear-gradient(180deg,rgba(255,255,255,.3),rgba(255,255,255,0) 48%),linear-gradient(135deg,var(--och),var(--och2));
  box-shadow:0 6px 14px rgba(15,23,42,.18), inset 0 1px 0 rgba(255,255,255,.55); }
.qqq-oc-ico svg{ fill:none; stroke:#fff; stroke-width:2.2; stroke-linecap:round; stroke-linejoin:round; }
.qqq-oc-emoji{ display:inline-block; line-height:1; font-family:"Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif; }
.qqq-oc-label{ font-size:32px; font-weight:900; line-height:1.25; }
.qqq-oc-desc{ margin-top:6px; font-size:26px; font-weight:600; line-height:1.4; }
.qqq-oc.qqq-oc-n4 .qqq-oc-label{ font-size:28px; }
.qqq-oc.qqq-oc-n4 .qqq-oc-desc{ font-size:24px; }
/* folder-sort */
.oc-v-folder .oc-fback.oc-k0{ fill:#2563EB; } .oc-v-folder .oc-fback.oc-k1{ fill:#059669; } .oc-v-folder .oc-fback.oc-k2{ fill:#D97706; }
.oc-v-folder .oc-ffront.oc-k0{ fill:#60A5FA; } .oc-v-folder .oc-ffront.oc-k1{ fill:#34D399; } .oc-v-folder .oc-ffront.oc-k2{ fill:#FBBF24; }
.oc-v-folder .oc-ffront{ filter:drop-shadow(0 -2px 3px rgba(15,23,42,.14)); }
.oc-v-folder .oc-sheet{ fill:#fff; stroke:#94A3B8; stroke-width:1.6; stroke-linejoin:round; }
.oc-v-folder .oc-fold{ fill:#E2E8F0; stroke:#94A3B8; stroke-width:1.6; stroke-linejoin:round; }
.oc-v-folder .oc-ln{ fill:none; stroke:#CBD5E1; stroke-width:3; stroke-linecap:round; }
.oc-v-folder .oc-file{ transform-box:fill-box; transform-origin:center; transition:transform .85s cubic-bezier(.34,1.3,.64,1); }
.oc-v-folder .oc-file.oc-f0{ --fk:0; transform:translate(98px,12px) rotate(-16deg); }
.oc-v-folder .oc-file.oc-f1{ --fk:1; transform:translate(124px,2px) rotate(7deg); }
.oc-v-folder .oc-file.oc-f2{ --fk:2; transform:translate(150px,16px) rotate(19deg); }
.is-on .oc-v-folder .oc-file{ transition-delay:calc(.35s + var(--fk) * .18s); }
.is-on .oc-v-folder .oc-file.oc-f0{ transform:translate(47px,66px) rotate(0deg); }
.is-on .oc-v-folder .oc-file.oc-f1{ transform:translate(131px,66px) rotate(0deg); }
.is-on .oc-v-folder .oc-file.oc-f2{ transform:translate(215px,66px) rotate(0deg); }
/* mini-dashboard */
.oc-v-dash .oc-win{ fill:rgba(255,255,255,.88); stroke:rgba(15,23,42,.14); stroke-width:1.5; }
.oc-v-dash .oc-winbar{ fill:rgba(15,23,42,.06); }
.theme-dark .oc-v-dash .oc-win{ fill:rgba(255,255,255,.08); stroke:rgba(255,255,255,.22); }
.theme-dark .oc-v-dash .oc-winbar{ fill:rgba(255,255,255,.08); }
.oc-v-dash .oc-dot.oc-d0{ fill:#F43F5E; } .oc-v-dash .oc-dot.oc-d1{ fill:#F59E0B; } .oc-v-dash .oc-dot.oc-d2{ fill:#10B981; }
.oc-v-dash .oc-bar{ fill:var(--och); transform-box:fill-box; transform-origin:50% 100%; transform:scaleY(0); transition:transform .7s cubic-bezier(.22,1,.36,1); }
.oc-v-dash .oc-bar.oc-b3{ fill:var(--och2); }
.is-on .oc-v-dash .oc-bar{ transform:scaleY(1); }
.is-on .oc-v-dash .oc-bar.oc-b0{ transition-delay:.3s; } .is-on .oc-v-dash .oc-bar.oc-b1{ transition-delay:.42s; }
.is-on .oc-v-dash .oc-bar.oc-b2{ transition-delay:.54s; } .is-on .oc-v-dash .oc-bar.oc-b3{ transition-delay:.66s; }
.oc-v-dash .oc-base{ stroke:rgba(15,23,42,.25); stroke-width:2; }
.theme-dark .oc-v-dash .oc-base{ stroke:rgba(255,255,255,.3); }
.oc-v-dash .oc-ring-bg{ fill:none; stroke:rgba(15,23,42,.1); stroke-width:10; }
.theme-dark .oc-v-dash .oc-ring-bg{ stroke:rgba(255,255,255,.14); }
.oc-v-dash .oc-ring{ fill:none; stroke:var(--och); stroke-width:10; stroke-linecap:round; stroke-dasharray:1; stroke-dashoffset:1;
  transition:stroke-dashoffset 1s cubic-bezier(.65,0,.35,1) .6s; }
.is-on .oc-v-dash .oc-ring{ stroke-dashoffset:.28; }
.oc-v-dash .oc-spark{ fill:none; stroke:var(--och2); stroke-width:4; stroke-linecap:round; stroke-linejoin:round; stroke-dasharray:1; stroke-dashoffset:1;
  transition:stroke-dashoffset .8s cubic-bezier(.65,0,.35,1) .95s; }
.is-on .oc-v-dash .oc-spark{ stroke-dashoffset:0; }
.is-on .oc-v-dash .oc-dot.oc-d2{ animation:qqqLive 1.6s ease-in-out 1.8s infinite; }
@keyframes qqqLive{ 0%,100%{ opacity:1; } 50%{ opacity:.3; } }
/* doc-year-flip */
.qqq-oc-doc{ position:relative; width:100%; height:100%; }
.oc-v-doc .oc-page{ fill:#fff; stroke:#94A3B8; stroke-width:2; stroke-linejoin:round; }
.oc-v-doc .oc-pfold{ fill:#E2E8F0; stroke:#94A3B8; stroke-width:2; stroke-linejoin:round; }
.oc-v-doc .oc-pln{ fill:none; stroke:#CBD5E1; stroke-width:5; stroke-linecap:round; }
.oc-v-doc .oc-stamp{ fill:var(--och); opacity:0; transform-box:fill-box; transform-origin:center; transform:scale(.3);
  transition:opacity .3s ease 1.25s, transform .5s cubic-bezier(.34,1.56,.64,1) 1.25s; }
.is-on .oc-v-doc .oc-stamp{ opacity:1; transform:none; }
.oc-v-doc .oc-tick{ fill:none; stroke:#fff; stroke-width:4; stroke-linecap:round; stroke-linejoin:round; stroke-dasharray:1; stroke-dashoffset:1;
  transition:stroke-dashoffset .4s ease 1.6s; }
.is-on .oc-v-doc .oc-tick{ stroke-dashoffset:0; }
.qqq-oc-year{ position:absolute; left:47%; top:30%; transform:translateX(-50%); display:grid; perspective:420px;
  font-size:32px; font-weight:900; line-height:1.1; letter-spacing:.01em; font-variant-numeric:tabular-nums; }
.qqq-oc-year span{ grid-area:1/1; backface-visibility:hidden; transition:transform .45s cubic-bezier(.65,0,.35,1), opacity .3s ease, color .3s ease; }
.qqq-oc-year .oc-y-old{ color:#64748B; }
.qqq-oc-year .oc-y-new{ color:var(--ochd); transform:rotateX(90deg); opacity:0; }
.is-on .qqq-oc-year .oc-y-old{ transform:translate(-64%,-80%) scale(.78); color:#E11D48; text-decoration:line-through 3px; transition-delay:.55s; }
.is-on .qqq-oc-year .oc-y-new{ transform:none; opacity:1; transition-delay:.85s; }
/* checklist */
.oc-v-check .oc-box{ fill:rgba(255,255,255,.9); stroke:#94A3B8; stroke-width:2; transition:fill .3s ease, stroke .3s ease; }
.oc-v-check .oc-tick{ fill:none; stroke:#fff; stroke-width:4.5; stroke-linecap:round; stroke-linejoin:round; stroke-dasharray:1; stroke-dashoffset:1;
  transition:stroke-dashoffset .35s ease; }
.oc-v-check .oc-rl{ fill:none; stroke:#CBD5E1; stroke-width:7; stroke-linecap:round; }
.theme-dark .oc-v-check .oc-rl{ stroke:rgba(255,255,255,.28); }
.is-on .oc-v-check .oc-box{ fill:var(--och); stroke:var(--och); }
.is-on .oc-v-check .oc-tick{ stroke-dashoffset:0; }
.is-on .oc-v-check .oc-r0 *{ transition-delay:.4s; } .is-on .oc-v-check .oc-r1 *{ transition-delay:.75s; } .is-on .oc-v-check .oc-r2 *{ transition-delay:1.1s; }
/* icon (default) */
.qqq-oc-orbwrap{ position:relative; width:100%; height:100%; display:flex; align-items:center; justify-content:center; }
.qqq-oc-orb{ position:relative; z-index:1; height:72%; aspect-ratio:1; border-radius:50%; display:flex; align-items:center; justify-content:center;
  background:radial-gradient(circle at 32% 28%,rgba(255,255,255,.7),rgba(255,255,255,0) 42%),linear-gradient(135deg,var(--och),var(--och2));
  box-shadow:0 14px 30px rgba(15,23,42,.18), inset 0 -6px 14px rgba(0,0,0,.14);
  opacity:0; transform:scale(.6); transition:transform .7s cubic-bezier(.34,1.56,.64,1) .25s, opacity .3s ease .25s; }
.is-on .qqq-oc-orb{ opacity:1; transform:none; }
.qqq-oc-orb .qqq-oc-ico{ background:none; box-shadow:none; }
.qqq-oc-ring{ position:absolute; height:92%; aspect-ratio:1; border-radius:50%; border:3px dashed var(--och); opacity:.45; }
.is-on .qqq-oc-ring{ animation:qqqSpin 18s linear infinite; }
@keyframes qqqSpin{ to{ transform:rotate(360deg); } }
/* 15~18: reduced motion and review stills show the final state at once */
@media (prefers-reduced-motion: reduce){
  .qqq-kw, .qqq-mk::before, .qqq-mk-line path, .qqq-spk, .qqq-spk path, .qqq-bq-arrow path, .qqq-km-open, .qqq-km-close,
  .qqq-oc-card *, .qqq-oc-year span{ transition:none !important; animation:none !important; }
}
html[data-review] .qqq-kw, html[data-review] .qqq-mk::before, html[data-review] .qqq-mk-line path, html[data-review] .qqq-spk,
html[data-review] .qqq-spk path, html[data-review] .qqq-bq-arrow path, html[data-review] .qqq-km-open, html[data-review] .qqq-km-close,
html[data-review] .qqq-oc-card *, html[data-review] .qqq-oc-year span{ transition:none !important; animation:none !important; }
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
case "capture-compare":    return <CaptureCompare s={s} step={step}/>;
case "big-question":       return <BigQuestion s={s} step={step}/>;   // 16 — replaces the base template
case "key-message":        return <KeyMessage s={s} step={step}/>;    // 17 — replaces the base template
case "outcome-cards":      return <OutcomeCards s={s} step={step}/>;
```

## 다크/핑크 테마 메모
- 다 light/dark/bling 모두에서 동작(글자색·glass는 테마 CSS가 처리). 단 `platforms`/`keymsg`의 칩 배경이 옅은 블루라 다크에서 약하면 칩 배경을 `rgba(255,255,255,.08)`로.
- 섹션 전환·강조 한 장은 dark, "그러나/반전" 한 장은 `pink-reversal`(항상 bling 핑크)로 쓰면 리듬이 산다.
- **bling 배경은 위 "8~18 공용 CSS"의 `.app-wrap.theme-bling`이 정의한다**(예전엔 오로라·블롭·✨만 있고 배경 그라디언트가 없었다). 다른 type에 `theme:"bling"`을 줘도 같은 핑크 배경·강조색이 된다.
- `prompt-box`·`command-box`·`screenshot-slot`·`before-after-panel`은 light/dark 모두 확인했다. `command-list` was checked in light and dark at 1920×1080 and 1280×720. `capture-compare` was checked in light at 1920×1080 and 1280×720 (rows, enlarge dialog, keyboard open and close). 다크에선 프롬프트 상자·자리 표시 틀이 투명 톤으로 바뀐다(공용 CSS의 `.theme-dark` 줄).
- Sections 15–18 (`big-question` kinetic and classic, `key-message` quote and classic, `outcome-cards` with 2, 3 and 4 items and every built-in visual) were rendered from this file's code in headless Chromium at 1920×1080 and 1280×720, in light and dark, mid-animation, and with reduced motion (final state at once). No text under 24px, content height ≤ 792px, no console errors.
- Class names: component classes carry a prefix (`qqq-`, `oc-`; outcome-cards modifiers are `oc-b0`, `oc-f0`, `oc-k0`, `oc-d0`, `oc-r0`, `oc-y-old`, `oc-v-dash`, `qqq-oc-t-blue`, `qqq-oc-n4`; kinetic marks are `qqq-mark-swipe`). The background blobs are scoped as `.blob.b1`…`.blob.b6` (`motion-theme-upgrades.md` 8). `tests/class-collision-guard.mjs` fails on a bare short class rule or a class one reference uses that another styles bare. Checked with the blob background, outcome-cards (3 and 4 items) and `big-question` with `title` + `question` at 1920×1080 and 1280×720: bars stay inside their window, the struck-through old year stays inside the visual.
