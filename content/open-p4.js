/* ============================================================
   OPEN-P4 · D4(프롬프트 엔지니어링과 구조화 출력) 오프닝 레슨 + 이유 카드 + 용어 보강
   로드 순서: part4.js · gap-fix.js · appendix.js 뒤
   추가와 보강만 함. 기존 원소는 지우지도 덮어쓰지도 않음
   ============================================================ */
(function(){
  "use strict";
  if(window.__ccafOpenP4Loaded) return;          /* 두 번 eval 가드 */
  var C = window.CCAF_CONTENT, p4 = C && C.p4;
  if(!p4 || !Array.isArray(p4.lessons)) return;

/* ------------------------------------------------------------
   (1) 오프닝 레슨 p4c0 · p4 맨 앞에 삽입
   ------------------------------------------------------------ */
var BRIEF = {
  title: "D4 SCENARIO · DOCUMENT EXTRACTION AT SCALE",
  body: "Your company runs an internal document service built on Claude, and two paths share one extraction prompt. The nightly path takes about 40,000 scanned vendor invoices and contracts that finish arriving at 11 PM, pulls 14 fields out of each one, and loads the rows straight into the finance database with no human review anywhere in between. Finance reconciles those rows during a weekly close, so a full day of turnaround on the nightly load is acceptable and no per-document completion time has been promised to anyone. The interactive path is a web form where a staff member uploads a single document by hand and has to see the extracted fields while the page waits, under a product budget of two seconds. Three complaints came in this month. First, roughly 0.5 percent of nightly responses arrived with a sentence of commentary wrapped around the JSON, and the loader rejected the entire row rather than the stray sentence. Second, invoices that print the total in a page footer instead of a line-item table come back with total set to null, and invoices from two vendors put the shipping address into the billing address field, even though any person who opens those files can read both values. Third, the finance lead wants to know why the nightly run costs the same per document as the interactive one when nobody opens the output until the following week. The model, the 14 fields, and the two-second interactive budget are all fixed for this quarter."
};

if(!p4.lessons.some(function(l){ return l.id === "p4c0"; })){
p4.lessons.unshift({ id:"p4c0", ch:"OPEN", title:"D4는 시험에서 이렇게 나온다", steps:[

/* ① 실전 형태 예고 */
{type:"concept", kind:"PART BRIEFING · 파트 설명", h:"먼저 시험지의 형태부터 확인할 것",
 html:`<p class="lead">챕터로 들어가기 전에 D4가 <strong>시험지 위에서 어떤 형태</strong>로 나오는지 먼저 확인함. 개념을 외운 사람이 아니라 이 형태에 익숙한 사람이 정답을 고름.</p>
  <h4>D4의 위치</h4>
  <ul>
    <li>출제 비중은 <strong>20% ≈ 12문항</strong>임. 다섯 도메인 중 두 번째로 큰 영역임</li>
    <li>주된 출제 상황은 <strong>구조화 데이터 추출</strong>(시나리오 ⑥)임. 비정형 문서에서 값을 뽑아 JSON으로 만들고, 검증한 뒤 다음 시스템에 넘기는 파이프라인임</li>
    <li>D5(컨텍스트와 에러 처리)와 자주 함께 출제됨. 한 지문 안에 두 도메인이 섞여 있는 경우가 많음</li>
  </ul>
  <h4>실전 문제지의 실제 형태</h4>
  <ul>
    <li>낱개 문항이 나열되는 것이 아니라 <strong>상황 브리핑 하나 아래에 문항 여러 개</strong>가 붙어 있음</li>
    <li>브리핑은 길다. 문단 하나에 시스템 구성·증상·수치·제약이 모두 들어 있고, 문항마다 그중 <strong>다른 줄</strong>이 근거가 됨</li>
    <li>그래서 문항 하나씩 따로 읽으면 계속 틀림. <strong>브리핑을 한 번 제대로 읽고 문항 세 개를 그 위에서 푸는 것</strong>이 실제 동작임</li>
  </ul>
  <div class="callout">📊 이 영역에서 정답률이 가장 낮은 자리는 <b>구조화 출력(structured output) 방법 선택</b>임. 이 자리는 <b>tool use + 스키마(schema) · 프롬프트 지시 · 프리필(prefill)</b> 세 수단을 나란히 놓고 "이 상황에는 무엇을 쓸 것인가"를 고르는 형태로 출제됨. 수단 사이의 차이를 모르면 보기를 소거할 수 없어 정답률이 크게 떨어짐. 그래서 이 오프닝의 첫 문항이 정확히 그 형태임.</div>
  <h4>이 오프닝에서 할 것</h4>
  <ul>
    <li>브리핑 하나와 문항 세 개를 <strong>실전과 같은 묶음으로</strong> 한 번 통과하기</li>
    <li>세 문항이 각각 무엇을 물었는지 복기하고, D4 문제를 가르는 <strong>판단 기준</strong>을 정리하기</li>
    <li>파트 전체 지도를 한 장으로 보고, 그 위의 <strong>용어를 0부터</strong> 채우기</li>
  </ul>`},

/* ② 시나리오 블록 · 브리핑 읽는 법 */
{type:"concept", brief:BRIEF, kind:"CONCEPT · 개념 설명", h:"브리핑 읽는 법: 네 부분으로 나누기",
 html:`<p class="lead">위 박스가 실전 브리핑의 길이와 밀도임. 통째로 읽고 기억하려 하지 말고 <strong>네 부분으로 나누면서</strong> 읽을 것.</p>
  <h4>① 시스템 구성: 무엇이 무엇을 하는 시스템인가</h4>
  <ul>
    <li>여기서는 <strong>경로가 둘</strong>이라는 것이 핵심 문장임. 야간 대량 처리 4만 건과 웹 폼 실시간 1건인데, <strong>추출 프롬프트는 하나를 공유</strong>함</li>
    <li>경로가 둘이면 <strong>정답도 둘로 갈릴 수 있음</strong>. "전부 하나로 통일" 보기가 오답 유도 선택지인 경우가 많음</li>
  </ul>
  <h4>② 증상: 무엇이 어떻게 잘못됐는가 (수치까지)</h4>
  <ul>
    <li>0.5%의 응답에 JSON 바깥 문장이 붙어 로더가 행을 통째로 거부함 → <strong>형식</strong> 문제</li>
    <li>푸터에 있는 total이 null로 나오고 배송지가 청구지 칸에 들어감 → <strong>정밀도</strong> 문제 (사람은 읽을 수 있다고 명시돼 있음)</li>
    <li>야간 건당 비용이 실시간과 동일함 → <strong>처리 방식</strong> 문제</li>
  </ul>
  <h4>③ 제약: 바꿀 수 없는 것</h4>
  <ul>
    <li>모델 고정 · 14개 필드 고정 · 실시간 2초 예산 고정 · 야간은 사람 검수 없음</li>
    <li><strong>제약이 보기를 먼저 탈락시킴</strong>. "일반적으로 가장 좋은 방법"이 이 지문에서는 불가능한 경우가 실전에서 자주 나옴</li>
  </ul>
  <h4>④ 질문: 문항이 브리핑의 어느 줄을 겨냥하는가</h4>
  <ul>
    <li>문항을 읽고 나서 <strong>브리핑으로 되돌아가 근거 줄을 짚는</strong> 순서로 풀 것</li>
    <li>근거 줄을 짚지 못하면 아직 풀 수 없는 문제임. 추측으로 고르지 말고 다시 확인할 것</li>
  </ul>
  <div class="callout">🎯 지금부터 문항 세 개가 <b>같은 브리핑</b> 위에서 출제됨. 브리핑 박스는 문항마다 계속 표시되므로 오가면서 확인해도 됨.</div>`},

/* ②-1 문항 1 · 형식 강제 비교형 */
{type:"quiz", brief:BRIEF, kind:"PRACTICE · 시나리오 실전", h:"Q1 — What enforces the shape",
 q:"Focus on the first complaint. The nightly path writes to the finance database with no human review, and once every few hundred documents a stray sentence around the JSON makes the loader reject the whole row. The team is choosing how the nightly path should enforce its output format. Which option fits this path?",
 opts:[
   {t:"Define the extraction as a tool with a JSON schema and read the tool input, so the constraint covers the whole object — which keys exist and what type each value is — instead of only where the response starts.", ok:true},
   {t:"Prefill the assistant turn with an opening brace so a preamble has nowhere to appear, which is the cheapest change and needs no schema work."},
   {t:"Sharpen the prompt to \"Return only JSON. No preamble, no code fences, no trailing commentary.\" and retry any response that fails to parse."},
   {t:"Leave the prompt alone and have the loader keep only the text between the outermost braces before parsing."},
 ],
 hint:`이 경로에는 사람 검수가 없음. 형식이 틀어졌을 때 잡아 줄 사람이 없다는 뜻임. 각 보기가 출력의 어디까지를 강제하는지 하나씩 확인할 것. 시작만인가, 요청일 뿐인가, 객체 전체인가.`,
 explain:{
   good:`셋을 강제 범위로 나눠 보면 정답이 하나임. tool use + 스키마는 <b>객체 전체</b>(칸 이름·타입·필수 여부)를 고정하므로, JSON 바깥에 문장이 붙을 자리가 구조적으로 없어짐. 사람 검수 없이 DB로 바로 들어가는 경로라면 확률이 아니라 구조로 막아야 함.`,
   wrongs:[
     `<b>B(프리필):</b> 강제하는 것은 <b>시작</b>뿐임. 여는 중괄호 다음부터 쓰게 만들 뿐 닫는 괄호 뒤는 여전히 열려 있어 꼬리 문장 사고는 그대로 남음. 또한 Claude 4.6 계열과 Mythos Preview부터는 마지막 assistant 턴 프리필이 400으로 차단돼 있음.`,
     `<b>C(강한 지시 + 재시도):</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 0.5%가 낮아지기는 함. 그러나 프롬프트 지시는 강제가 아니라 요청이라 0이 되지 않고, 재시도만큼 비용과 시간이 늘어남. 사람이 확인하지 않는 적재 경로에서 "대체로 지켜짐"에 기대는 설계임.`,
     `<b>D(로더에서 잘라내기):</b> 파싱(parsing)은 통과시키지만 강제한 것이 아무것도 없음. 칸 이름이 바뀌거나 타입이 달라져도 그대로 통과하므로, 잘못된 값이 조용히 DB에 들어가는 더 나쁜 사고로 바뀜.`,
   ]},
 why:{ q:`왜 이 경로에서 tool use + 스키마가 정답이 되는가?`,
   opts:[
     {t:`사람 검수 없이 코드가 바로 파싱해 적재하는 경로라 형식이 틀어져도 중간에서 잡아 줄 사람이 없고, 요청 수준(프롬프트)이나 시작만 고정하는 수준(프리필)이 아니라 객체 전체를 강제하는 수단이 필요하기 때문임`, ok:true},
     {t:`스키마를 쓰면 값이 맞는지까지 API가 대신 검사해 줘서 검증 단계를 없앨 수 있기 때문임`},
     {t:`구조화 출력은 tool use가 정석이라, 공식 문서도 이 방법을 항상 제일 먼저 쓰라고 안내하기 때문임`},
     {t:`프리필이 최신 모델에서 400으로 차단돼 쓸 수 있는 선택지가 사실상 이것 하나만 남기 때문임`},
   ],
   explain:`강제 수단을 고르는 기준은 "형식이 틀어졌을 때 누가 잡아 주는가"임. 사람이 중간에 있으면 약한 강제로도 동작하고, 없으면 코드가 읽을 모양을 통째로 고정해야 함. 이 질문은 D2의 tool_choice 문항에도 그대로 쓰임.`},
 principle:"강제 범위: 시작만인가 객체 전체인가"},

/* ②-2 문항 2 · 정밀도 */
{type:"quiz", brief:BRIEF, kind:"PRACTICE · 시나리오 실전", h:"Q2 — The fields it can read but does not",
 q:"Focus on the second complaint. The totals and the address swaps fail on specific layouts, and the brief states a person opening those files can read both values. A teammate proposes marking total and billing_address as required in the schema so the model can no longer return null and has to locate them. What should ship instead?",
 opts:[
   {t:"Add a handful of targeted examples covering exactly the layouts that fail — one invoice with the total in a footer, one from each vendor whose address blocks are arranged differently — and state in the prompt which block on the page counts as billing and which counts as shipping.", ok:true},
   {t:"Mark the two fields as required, as proposed, so every row arrives complete and the null problem disappears at the schema level."},
   {t:"Raise max_tokens so the model has enough room to work through the entire page before answering."},
   {t:"Add \"read the whole document carefully and do not miss any field\" to the prompt, and lower temperature so the extraction is more deliberate."},
 ],
 hint:`먼저 나눠야 할 것이 하나 있음. 그 정보가 문서 안에 있는가, 없는가. 브리핑이 그 답을 한 줄로 명시함. 있는데 찾지 못하는 것이라면 모자란 것이 능력인가, 판단 기준인가.`,
 explain:{
   good:`정보는 문서 안에 있고, 실패가 <b>특정 레이아웃 몇 종류에 몰려</b> 있음. 이런 실패는 "이 자리의 이 값이 그 칸"이라는 판단 기준이 없어서 발생함. 따라서 실패하는 레이아웃 자체를 예시로 보여 주고 청구지와 배송지의 구분 기준을 문장으로 명시하는 것이 정확한 처방임. 예시는 개수가 아니라 <b>어디를 겨냥하는가</b>가 값어치를 정함.`,
   wrongs:[
     `<b>B(required로 강제):</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. null은 확실히 사라짐. 대신 문서에 실제로 없는 경우까지 모델이 지어내서 채우게 됨. 브리핑의 다른 증상(값이 엉뚱한 칸에 들어감)을 오히려 늘리는 방향임.`,
     `<b>C(max_tokens 상향):</b> 출력 길이 한도임. 문서를 얼마나 잘 훑는지와 무관하고, 지금 나오는 것은 잘린 출력이 아니라 null이 채워진 정상 형식의 출력임.`,
     `<b>D(주의 요구 + temperature):</b> "꼼꼼히 볼 것" 계열은 판단 기준을 하나도 만들지 않음. 분산을 줄이면 같은 오답으로 더 일관되게 수렴할 뿐임.`,
   ]},
 why:{ q:`왜 예시와 명시 기준이 이 문항의 정답인가?`,
   opts:[
     {t:`정보가 문서 안에 있는데도 찾지 못하고 실패가 특정 레이아웃에 몰려 있어, 모자란 것이 모델의 능력이 아니라 "어느 자리의 값이 어느 칸인가"라는 판단 기준이기 때문임`, ok:true},
     {t:`예시를 넣을수록 추출 정확도가 함께 올라가므로, 지금처럼 정확도가 부족할 때는 예시를 늘리는 것이 가장 효과가 크기 때문임`},
     {t:`few-shot은 프롬프트 엔지니어링의 기본기라, 추출 품질 문제에는 일단 예시부터 넣는 것이 순서이기 때문임`},
     {t:`required로 강제하면 모델이 값을 지어내므로, 어떤 상황에서도 nullable로 두는 쪽이 옳기 때문임`},
   ],
   explain:`"그 정보가 문서 안에 있는가"가 D4 정밀도 문제의 첫 갈림길임. 있는데 찾지 못하면 기준과 예시 문제이고, 아예 없으면 nullable과 사람 라우팅 문제임. 처방이 완전히 갈림.`},
 principle:"있는데 찾지 못하면 기준 문제"},

/* ②-3 문항 3 · 처리 방식 선택 */
{type:"quiz", brief:BRIEF, kind:"PRACTICE · 시나리오 실전", h:"Q3 — Two paths, one cost question",
 q:"Focus on the third complaint. Finance wants the per-document cost down. Which processing arrangement fits both paths as described?",
 opts:[
   {t:"Move the nightly 40,000 documents to the Batches API and keep the web form on synchronous calls: the nightly results are not read until the weekly close and carry no promised completion time, while the form has a two-second budget that no batch turnaround can meet.", ok:true},
   {t:"Move both paths to the Batches API, since the discount applies per request and the web form can poll for its result once the batch returns."},
   {t:"Keep both paths synchronous and pursue the savings by compressing the prompt instead, because batch processing offers no completion time guarantee."},
   {t:"Route every upload through the Batches API and fall back to a synchronous call whenever a batch result has not arrived within the two-second budget."},
 ],
 hint:`배치 처리(Batches API)가 무엇을 주고 무엇을 가져가는지 한 줄로 정리할 것. 그 교환이 성립하는 조건이 두 경로 중 어디에 있는지 브리핑에서 근거 문장을 찾을 것. 건수는 근거가 아님.`,
 explain:{
   good:`배치는 비용을 절반으로 줄이는 대신 <b>최대 24시간</b>을 가져가고 "몇 시까지"라는 보장은 하지 않음. 그래서 지연 허용치가 그 최대치보다 긴 경로에서만 성립함. 야간 경로는 주간 마감 때 확인하고 약속된 완료 시각도 없으므로 조건을 통과하고, 2초짜리 웹 폼은 통과할 수 없음. <b>한 시스템 안에서 두 방식이 공존하는 것이 정상</b>이라는 것이 이 문항의 핵심임.`,
   wrongs:[
     `<b>B(둘 다 배치 + 폴링):</b> 폴링을 붙여도 결과가 없으면 보여 줄 수 없음. 2초 예산은 바꿀 수 없는 제약이라고 브리핑이 명시함.`,
     `<b>C(둘 다 동기 유지):</b> "배치는 완료 시각을 보장하지 않는다"는 서술 자체는 맞음. 그래서 오답 유도 선택지임. 야간 경로에는 지켜야 할 시각이 애초에 없으므로 그 사실이 배제 사유가 되지 않음.`,
     `<b>D(배치 먼저, 2초 뒤 동기 폴백):</b> 2초 안에 배치 결과가 오는 일은 없으므로 사실상 전부 동기로 두 번 처리하는 셈임. 비용이 오히려 늘어남.`,
   ]},
 why:{ q:`왜 야간만 배치로 옮기고 웹 폼은 동기로 남기는가?`,
   opts:[
     {t:`배치가 주는 것은 비용 절감이고 가져가는 것은 시간이라, 결과를 나중에 확인해도 되는 경로에서만 그 교환이 성립하고 2초 안에 화면에 표시돼야 하는 경로에서는 성립하지 않기 때문임`, ok:true},
     {t:`한 번에 보내는 건수가 많을수록 배치가 유리해서, 4만 건은 배치가 맞고 한 건짜리 업로드는 동기가 맞기 때문임`},
     {t:`대량 처리는 배치로, 실시간은 동기로 나누는 것이 표준 아키텍처라 원래 그렇게 쓰는 것이 맞기 때문임`},
     {t:`배치는 최대 24시간까지 걸릴 수 있고 지연 보장이 없어서, 급한 작업에는 어차피 쓸 수 없기 때문임`},
   ],
   explain:`배치와 동기를 가르는 것은 건수가 아니라 <b>지연 허용치</b>임. 허용치가 최대 처리시간보다 짧으면 건수가 아무리 많아도 배치는 후보에서 빠지고, 길면 한 건이어도 배치가 후보에 들어옴.`},
 principle:"배치의 조건은 건수가 아니라 지연 허용치"},

/* ③ 블록 복기 */
{type:"concept", kind:"TOPIC · 주제 설명", h:"복기: 세 문항은 각각 무엇을 물었는가",
 html:`<p class="lead">같은 브리핑인데 문항마다 근거로 쓴 줄이 달랐음. 실전 블록은 늘 이렇게 <strong>한 상황을 여러 각도로</strong> 나눠 물음.</p>
  <table>
    <tr><th>문항</th><th>브리핑의 근거 줄</th><th>물어본 것</th><th>가른 기준</th></tr>
    <tr>
      <td><strong>Q1</strong> 형식</td>
      <td>사람 검수 없음 + JSON 바깥 문장에 로더가 행을 거부함</td>
      <td>출력 형식을 <strong>무엇으로 강제</strong>할지 (tool use + 스키마 · 프롬프트 지시 · 프리필)</td>
      <td>각 수단이 강제하는 <strong>범위</strong>. 객체 전체인가, 시작만인가, 요청일 뿐인가</td>
    </tr>
    <tr>
      <td><strong>Q2</strong> 정밀도</td>
      <td>사람은 읽을 수 있는 값인데 특정 레이아웃에서만 실패함</td>
      <td>추출 <strong>품질</strong>을 어떻게 올릴지 (명시 기준 · 겨냥한 예시)</td>
      <td>정보가 문서에 <strong>있는가 없는가</strong>. 있으면 판단 기준 문제, 없으면 nullable 문제</td>
    </tr>
    <tr>
      <td><strong>Q3</strong> 처리 방식</td>
      <td>주간 마감 때 확인 · 완료 시각 미약속 vs 2초 예산</td>
      <td>배치와 동기를 <strong>어디에 배치</strong>할지</td>
      <td><strong>지연 허용치</strong>가 최대 처리시간보다 긴가. 건수는 근거가 아님</td>
    </tr>
  </table>
  <h4>D4 문항을 가르는 판단 기준 세 가지</h4>
  <p>어떤 D4 지문을 만나도 아래 세 줄을 먼저 채우면 후보가 절반으로 줄어듦.</p>
  <table>
    <tr><th>판단 기준</th><th>지문에서 찾을 문장</th><th>갈림길</th><th>이 파트의 챕터</th></tr>
    <tr>
      <td><strong>① 누가 형식을 강제하는가</strong><br>모델인가 프로그램인가</td>
      <td>"사람 검수 없이 적재" · "게이트웨이가 tools를 잘라냄" · "모델 세대 고정" · "출력은 마크다운 보고서"</td>
      <td>프로그램이 고정함(tool use + 스키마 · 구조화 출력) ↔ 모델에게 요청함(프롬프트 지시) ↔ 시작만 고정함(프리필)</td>
      <td>Ch3 · Ch7</td>
    </tr>
    <tr>
      <td><strong>② 언제 결과가 필요한가</strong><br>즉시인가 나중인가</td>
      <td>"화면이 기다림 · N초 예산" · "다음날 아침 마감" · "주간 마감 때 확인" · "완료 시각 미약속"</td>
      <td>동기 호출 ↔ 배치(50% 절감, 최대 24h, 지연 보장 없음). 허용치 &lt; 최대 처리시간이면 배치 탈락</td>
      <td>Ch5</td>
    </tr>
    <tr>
      <td><strong>③ 틀렸을 때 어떻게 아는가</strong><br>검증(validation)</td>
      <td>"합계가 안 맞음" · "값이 엉뚱한 칸에" · "없는 값을 지어냄" · "재시도 성공률 12%"</td>
      <td>모양 오류는 스키마가 제거함 ↔ 내용 오류는 검증 루프(원본 + 실패 출력 + 구체적 오류) ↔ 정보 부재면 null과 사람 라우팅</td>
      <td>Ch4</td>
    </tr>
  </table>
  <div class="callout">⚠️ 세 기준은 <b>서로 대체하지 못함</b>. 스키마가 아무리 엄격해도 합계 불일치는 잡지 못하고, 검증 루프가 아무리 좋아도 문서에 없는 값은 만들지 못함. 한 기준의 도구로 다른 기준의 문제를 푸는 보기가 실전의 대표 오답 유도 장치임.</div>`},

/* ④ 개념 지도 */
{type:"concept", kind:"CONCEPT · 개념 설명", h:"D4 전체 지도 한 장",
 html:`<p class="lead">챕터 일곱 개가 각각 지도의 어디를 맡는지 먼저 확인함.</p>
  __MAP4:all__
  <h4>읽는 법</h4>
  <ul>
    <li><strong>윗줄은 모델에 넣기 전</strong>임. 입력을 설계하는 구간임. 왼쪽에서 오른쪽으로 진행함. 문서가 들어오고, 무엇을 보고하고 무엇을 건너뛸지 기준을 붙이고(Ch1), 애매한 경우는 예시로 가르쳐서(Ch2) 모델에 넣음</li>
    <li><strong>가운데는 출력이 나온 뒤</strong>임. 왼쪽 칸이 형식을 강제하는 구간(Ch3 · Ch7), 오른쪽 칸이 내용이 맞는지 대조하는 구간(Ch4)임. <code>↩</code>가 재시도 루프이며, 검증이 실패하면 오류를 붙여 다시 요청하는 흐름임</li>
    <li><strong>아랫줄은 운영 방식</strong>임. 위 흐름을 <strong>어떤 방식으로 실행하는가</strong>임. 왼쪽이 배치 처리(Ch5), 오른쪽이 리뷰를 몇 번 어떻게 나눠 도는가(Ch6)임. 둘은 순서가 아니라 <strong>선택지</strong>이고, 한 시스템 안에서 동기 호출과 함께 공존함</li>
  </ul>
  <h4>지도와 판단 기준의 대응</h4>
  <ul>
    <li>복기에서 정리한 <strong>기준 ①(누가 형식을 강제하는가)</strong> = 가운데 왼쪽 칸</li>
    <li><strong>기준 ②(언제 결과가 필요한가)</strong> = 아랫줄 왼쪽 칸</li>
    <li><strong>기준 ③(틀렸을 때 어떻게 아는가)</strong> = 가운데 오른쪽 칸 + 재시도 화살표</li>
    <li>윗줄 두 칸은 세 기준의 <strong>앞단</strong>임. 여기가 부실하면 뒤에서 아무리 강제하고 검증해도 값이 맞지 않음</li>
  </ul>
  <div class="callout">🗺 각 챕터 안에도 같은 지도가 다시 나오는데, 그때는 <b>지금 배우는 칸이 강조되어</b> 표시됨. 위치를 잃으면 그 강조된 칸이 어디쯤인지 확인할 것.</div>`},

/* ⑤ 지도 위의 용어 · 0부터 */
{type:"concept", kind:"CONCEPT · 개념 설명", h:"지도에 나오는 용어를 0부터 채우기",
 html:`<p class="lead">위 지도에 나온 단어들을 하나도 전제하지 않고 설명함. 개발 경험이 없어도 여기만 읽으면 D4 지문이 읽힘.</p>

  <h4>JSON: 데이터를 글자로 적는 표기법</h4>
  <ul>
    <li>중괄호 <code>{ }</code> 안에 <code>"이름": 값</code> 짝을 쉼표로 나열한 형태임</li>
    <li>실물: <code>{"invoice_id": "INV-2201", "total": 1240.5, "po_number": null}</code></li>
    <li>사람도 읽을 수는 있지만 목적은 <strong>프로그램이 읽는 것</strong>임. 쉼표 하나, 괄호 하나가 어긋나면 읽기가 통째로 실패함</li>
    <li><code>null</code>은 "값이 비어 있음"을 나타내는 표시임. 0이나 빈 글자와 달리 "여기에는 값이 없음"이라는 뜻임</li>
  </ul>

  <h4>파싱: 그 문자열을 데이터로 나눠 읽기</h4>
  <ul>
    <li>모델이 준 답은 사실 <strong>긴 문자열</strong>임. 프로그램이 그것을 <code>total</code> 칸의 값은 1240.5, <code>po_number</code> 칸은 비어 있음과 같이 나눠 읽는 작업이 파싱임</li>
    <li>앞이나 뒤에 문장 한 줄만 더 붙어도 파싱이 실패함. 브리핑에서 로더가 행을 통째로 거부한 것이 정확히 이 사고임</li>
  </ul>

  <h4>스키마: 출력에 어떤 칸이 있는지 미리 적어 둔 정의서</h4>
  <ul>
    <li>"이 출력에는 어떤 칸이 있고, 각 칸에는 어떤 종류의 값이 들어가는가"를 선언해 둔 문서임. 이것도 JSON으로 적음</li>
    <li>API 요청을 보낼 때 도구 정의 안에 함께 실어 보냄. 모델은 그 정의를 읽고 그대로 맞춰 답함</li>
    <li>스키마가 보장하는 것은 <strong>모양</strong>임. 칸 이름, 값의 종류(글자·숫자·참거짓), 비워도 되는지 여부까지임</li>
  </ul>

  <h4>required · nullable · enum: 스키마 안에서 칸마다 거는 조건</h4>
  <ul>
    <li><strong>required</strong>: 반드시 값이 있어야 하는 칸임. 문서에 그 정보가 없어도 모델은 어떻게든 채워야 하므로 <strong>그럴듯한 값을 지어냄</strong>. D4 사고의 대표적인 원인임</li>
    <li><strong>nullable</strong>: 비워도 되는 칸임. 값 자리에 <code>null</code>을 넣을 수 있어 모델이 "이 문서에는 없음"을 정직하게 표시할 수 있음</li>
    <li><strong>enum</strong>: 값을 미리 정한 목록 중에서만 고르게 하는 조건임. 예: <code>["signed", "draft", "unclear"]</code></li>
    <li>enum에는 <strong>예외 항목</strong>이 필요함. 목록에 없는 경우가 왔을 때 <code>"other"</code>(+상세 설명 칸)나 <code>"unclear"</code>가 없으면 모델이 억지로 가장 가까운 항목을 고름. 자동차 부품이 "식품"으로 분류되는 사고가 그렇게 발생함</li>
  </ul>

  <h4>tool use로 출력 형식을 강제하기: 무슨 뜻인가</h4>
  <ul>
    <li><strong>도구(tool)</strong>는 모델이 호출할 수 있도록 <strong>이름 · 설명 · 입력 스키마</strong>를 적어 요청에 함께 보내는 정의임. 실제 코드가 아니라 <strong>설정 데이터</strong>임</li>
    <li>모델은 "이 도구를 이런 값으로 호출해 달라"는 형태로 답함. 실제로 사용하는 것은 그 <strong>호출의 입력값</strong>임</li>
    <li>그 입력값은 스키마를 따르므로 칸 이름과 값의 종류가 고정됨. 앞뒤로 다른 문장이 붙을 <strong>자리 자체가 없어짐</strong>. 이것이 형식 강제의 실제 동작임</li>
    <li>막지 못하는 것: 칸은 전부 맞는데 <strong>값이 틀린 경우</strong>임. 합계가 맞지 않거나 배송지가 청구지 칸에 들어간 출력도 모양은 정상이라 통과함</li>
    <li>더 강한 방식으로 공식 <strong>Structured outputs</strong> 기능이 있음. <code>strict: true</code>를 붙인 도구 호출과, 도구 없이 응답 자체를 스키마 JSON으로 받는 방식 두 갈래임. 다만 <strong>지원 모델 목록</strong>이 정해져 있음</li>
  </ul>

  <h4>프리필: 응답의 첫 글자를 미리 써 두기</h4>
  <ul>
    <li>API로 보내는 <code>messages</code> 배열은 보통 <code>user</code> 메시지로 끝남. 그런데 <strong>마지막 메시지를 <code>assistant</code> 역할로 두고 내용을 조금 적어 두면</strong> 모델 응답이 <strong>그 지점에서 이어져</strong> 시작함</li>
    <li>실물: 마지막에 <code>{"role":"assistant","content":"{"}</code> 를 넣으면 모델은 여는 중괄호 다음부터 작성함. "Here is the JSON:" 같은 서두가 들어갈 자리가 사라짐</li>
    <li>주의할 점 두 가지. 응답에는 <strong>이어진 부분만</strong> 오므로 파싱 전에 넣어 둔 조각을 앞에 다시 붙여야 하고, 강제하는 것은 <strong>시작뿐</strong>이라 끝은 강제하지 못함</li>
    <li>제한: <strong>Claude 4.6 계열 모델과 Claude Mythos Preview부터 마지막 assistant 턴 프리필이 지원되지 않으며 그런 요청은 400 에러</strong>로 실패함. 이전 세대 모델은 계속 지원하고, <strong>대화 중간</strong>에 들어 있는 assistant 메시지는 이 제한과 무관함</li>
  </ul>

  <h4>동기 호출과 배치 처리: 무엇이 다른가</h4>
  <ul>
    <li><strong>동기 호출(synchronous call)</strong>: 요청을 보내고 <strong>그 자리에서</strong> 응답이 올 때까지 기다림. 사용자가 화면 앞에서 기다리는 경로는 전부 여기임</li>
    <li><strong>배치 처리</strong>: 요청 여러 건을 <strong>한 묶음으로 제출해 두고 나중에 결과를 받아</strong> 감. 요청마다 <code>custom_id</code>를 붙여 나중에 어느 결과가 어느 요청의 것인지 맞춤</li>
    <li>교환 조건: 비용 <strong>50% 절감</strong> · 처리에 <strong>최대 24시간</strong> · "몇 시까지 끝난다"는 <strong>지연 보장 없음</strong></li>
    <li>고르는 기준은 건수가 아니라 <strong>지연 허용치</strong>임. 허용치가 최대 처리시간보다 짧으면 건수가 아무리 많아도 배치는 쓸 수 없음</li>
    <li>둘은 한 시스템 안에서 <strong>함께 쓰는 것이 정상</strong>임. 야간 대량은 배치, 화면이 기다리는 요청은 동기임. 실전 지문에서 자주 나오는 구성임</li>
  </ul>

  <h4>검증: 왜 따로 필요한가</h4>
  <ul>
    <li>모델이 낸 출력을 <strong>프로그램이 규칙과 대조해</strong> 통과와 실패를 판정하는 별도 단계임. 파이썬에서는 <strong>Pydantic</strong> 같은 검사기를 씀</li>
    <li>필요한 이유: 스키마는 <strong>모양</strong>만 보장하고, 모델은 자기 답이 맞는지 스스로 보증하지 못함. 품목 합계와 총액이 맞지 않는 출력, 날짜가 매번 다른 형식으로 나온 출력, 값이 옆 칸에 들어간 출력은 전부 모양이 정상이라 스키마를 그냥 통과함</li>
    <li>실패했을 때: <strong>원본 문서 + 실패한 출력 + 구체적으로 무엇이 어긋났는지</strong> 세 가지를 붙여 다시 요청함. "다시 해 줄 것"만 보내면 성공률이 우연 수준으로 떨어짐</li>
    <li>재시도로 풀 수 없는 경우도 있음. 애초에 <strong>문서에 그 정보가 없는</strong> 경우임. 그것은 몇 번을 반복해도 없으므로 <code>null</code> 허용이나 사람에게 넘기는 경로로 빠져야 함</li>
  </ul>`},

/* ⑥ 학습 순서 */
{type:"concept", kind:"CONCEPT · 개념 설명", h:"이제 어떤 순서로 볼 것인가",
 html:`<p class="lead">챕터는 번호 순서대로 배치돼 있지만 <strong>실제로 읽기 좋은 순서는 조금 다름</strong>. 아래 순서를 권함.</p>
  <h4>권장 순서</h4>
  <ul>
    <li><strong>1. Ch1 명시적 기준</strong>: 모든 D4 문제의 앞단임. "신중하게 할 것" 계열 보기를 지우는 눈이 여기서 생김</li>
    <li><strong>2. Ch2 few-shot</strong>: Ch1의 기준이 판단선을 정하고, 예시가 그 선의 실물을 보여 줌. 둘은 짝이라 붙여서 보는 것이 좋음</li>
    <li><strong>3. Ch3 tool use + JSON 스키마</strong>: 형식 강제의 기본형임</li>
    <li><strong>4. Ch7 구조화 출력 세 방법의 선택</strong>: <strong>Ch3 바로 다음에 볼 것</strong>. 배열상으로는 맨 뒤에 있지만, Ch3에서 배운 방법을 나머지 둘(프롬프트 지시 · 프리필)과 나란히 놓고 고르는 챕터임. 이 영역에서 정답률이 가장 낮게 나오는 자리가 여기임</li>
    <li><strong>5. Ch4 검증과 재시도</strong>: 형식을 강제한 뒤에도 남는 내용 오류를 다루는 곳임</li>
    <li><strong>6. Ch5 배치 처리</strong>: 기준 ②임. 지연 허용치로 역산하는 계산이 반복 출제됨</li>
    <li><strong>7. Ch6 다중 인스턴스와 다중 패스 리뷰</strong>: 코드 리뷰 출제 상황(시나리오 ②)과 함께 나옴</li>
    <li><strong>8. D4 미니테스트 12문항</strong>: 여기서 틀린 문항의 <strong>판단 기준 번호</strong>를 적어 두고 해당 챕터로 돌아갈 것</li>
  </ul>
  <h4>공부할 때 지킬 것 두 가지</h4>
  <ul>
    <li><strong>정답 문장을 외우지 말 것</strong>: 실전 보기는 레슨과 어휘가 겹치지 않게 작성돼 있음. 외운 문장은 그대로 나오지 않음</li>
    <li>대신 문항마다 <strong>이유 카드</strong>를 붙여 뒀음. 정답을 맞혀도 "왜 이것이 답인지"를 고르지 못하면 다음으로 넘어가지 못함. 그 칸이 실제 훈련임</li>
  </ul>
  <div class="callout">📌 각 챕터의 연습 문제는 <b>실전형 선택 비교형</b>임. "A와 B와 C 중 이 상황에는 무엇인가"를 묻는 형태임. 단일 개념 확인형("정석이 무엇인가")으로 읽혔다면 지문의 제약 문장을 놓친 것이므로 다시 확인할 것.</div>`},
]});
}

/* ------------------------------------------------------------
   (2) 기존 p4 레슨의 quiz 스텝 전부에 why 이유 카드 붙이기
   ------------------------------------------------------------ */
(function(){
  var find = function(id){ return p4.lessons.find(function(l){ return l.id === id; }); };
  var q = function(id, n){
    var L = find(id);
    if(!L || !Array.isArray(L.steps)) return null;
    return L.steps.filter(function(s){ return s.type === "quiz"; })[n] || null;
  };
  var set = function(id, n, why){
    var s = q(id, n);
    if(s && !s.why) s.why = why;      /* 이미 있으면 건드리지 않음 */
  };

  /* --- Ch1 · 4.1 명시적 기준 --- */
  set("p4c1", 0, {
    q:`왜 두 번의 실패가 "같은 원인"으로 묶이는가?`,
    opts:[
      {t:`"위험한 것"도 "확신 있는 것"도 범주가 아니라 정도를 나타내는 말이라, 어느 쪽 프롬프트에도 무엇을 보고하고 무엇을 건너뛸지가 정의된 적이 없기 때문임`, ok:true},
      {t:`두 번 다 프롬프트를 한 번에 크게 바꿔서 무엇이 효과를 냈는지 분리해 볼 수 없었기 때문임`},
      {t:`오탐과 미탐은 원래 서로 맞바꾸는 관계라 어느 쪽으로 조정해도 반대쪽이 나빠지도록 되어 있기 때문임`},
      {t:`프롬프트 개선은 명시적 기준부터 시작하는 것이 정석인데 그 순서를 지키지 않았기 때문임`},
    ],
    explain:`정도를 조절하는 말("더 강하게 / 더 조심스럽게")은 몇 번을 고쳐도 판단선을 만들지 못함. 오탐이 늘든 누락이 늘든, 먼저 확인할 것은 "보고 범주와 건너뛸 범주가 이름으로 적혀 있는가"임.`});
  set("p4c1", 1, {
    q:`왜 형용사 정의로는 심각도가 매번 흔들리는가?`,
    opts:[
      {t:`"serious"가 어디서 끊기는지가 문서마다 달라 모델이 매 요청마다 그 경계를 새로 해석하게 되고, 해석이 매번 같을 이유가 없기 때문임`, ok:true},
      {t:`심각도 레벨이 세 개라 경계가 두 군데나 생기고, 레벨 수 자체가 많으면 흔들림도 함께 커지기 때문임`},
      {t:`모델이 심각도 판단 같은 주관적 작업에 원래 약해서 사람이 최종 등급을 매기는 것이 맞기 때문임`},
      {t:`가이드가 심각도마다 코드 예시를 붙이라고 명시했는데 그대로 따르지 않았기 때문임`},
    ],
    explain:`분류를 일관되게 만드는 것은 정의의 길이가 아니라 <b>기준점의 구체성</b>임. 실물 예시가 붙으면 모델이 해석 대신 대조를 하게 됨. 4.2의 few-shot이 통하는 이유도 같음.`});

  /* --- Ch2 · 4.2 few-shot --- */
  set("p4c2", 0, {
    q:`왜 같은 스타일의 예시를 12개로 늘려도 효과가 없는가?`,
    opts:[
      {t:`여섯 예시가 전부 명백한 경우라 모델이 이미 잘하는 구간만 반복해 보여 주고 있고, 실패는 애매한 경계에서 나는데 그 경계를 가르치는 예시가 하나도 없기 때문임`, ok:true},
      {t:`예시가 많아지면 프롬프트가 길어져 앞쪽 예시가 컨텍스트에서 밀려나기 때문임`},
      {t:`예시 개수가 늘수록 모델이 예시 자체를 외워 새로운 입력에 적용하지 못하게 되기 때문임`},
      {t:`few-shot은 2~4개가 정석이라고 가이드에 적혀 있어 12개는 권장 범위를 벗어나기 때문임`},
    ],
    explain:`예시의 값어치는 개수가 아니라 <b>어디를 겨냥하는가</b>로 정해짐. 실패가 나는 지점의 예시 두세 개가, 잘 되는 지점의 예시 열두 개보다 강함.`});
  set("p4c2", 1, {
    q:`왜 이 null 문제를 few-shot으로 푸는가?`,
    opts:[
      {t:`정보는 문서 안에 있는데 문서마다 그 정보가 놓인 자리가 달라서, 구조 변형에 대응하는 방법은 서로 다른 구조의 실물을 보여 주는 것이 가장 직접적이기 때문임`, ok:true},
      {t:`few-shot이 null 값을 줄이는 데 특히 효과적인 기법이라 빈 필드 문제에는 예시 추가가 표준 대응이기 때문임`},
      {t:`nullable로 둔 필드는 모델이 채우기를 포기하기 쉬워서 예시로 채우는 방식을 보여 줘야 하기 때문임`},
      {t:`스키마를 고치는 것보다 프롬프트를 고치는 것이 항상 먼저라는 원칙 때문임`},
    ],
    explain:`null이 나왔을 때 첫 질문은 늘 같음. <b>그 값이 문서 안에 있는가</b>임. 있으면 예시와 기준으로 찾게 만드는 문제이고, 없으면 스키마와 라우팅으로 정직하게 비우는 문제임.`});

  /* --- Ch3 · 4.3 tool_use 스키마 --- */
  set("p4c3", 0, {
    q:`왜 세 사고를 한 번에 고치려면 수정이 셋이어야 하는가?`,
    opts:[
      {t:`세 사고의 원인이 서로 다른 설계 결함이라서, 필수 강제 · 예외 항목 없는 목록 · 정규화 규칙 부재는 각각 다른 칸에서 나온 문제라 하나의 조치로 함께 해결되지 않기 때문임`, ok:true},
      {t:`스키마는 한 번 배포하면 자주 바꾸지 못하므로 가능한 수정을 한꺼번에 모아 넣는 것이 운영상 유리하기 때문임`},
      {t:`세 사고가 모두 프로덕션에서 발생해 심각도가 같고, 같은 심각도는 같은 배포에서 처리하는 것이 원칙이기 때문임`},
      {t:`스키마 설계의 정석이 required·enum·형식 규칙 세 가지를 함께 점검하는 것이라 셋을 같이 손보는 것이 맞기 때문임`},
    ],
    explain:`증상 개수가 아니라 <b>원인 개수</b>가 처방 개수를 정함. 여러 증상이 한 원인에서 나오면 조치는 하나로 충분하고, 원인이 갈리면 하나짜리 만능 보기는 거의 항상 오답임.`});
  set("p4c3", 1, {
    q:`왜 여기서 tool_choice가 "any"인가?`,
    opts:[
      {t:`요구가 둘로 갈려 있어서, 도구 호출은 반드시 일어나야 하지만 어느 도구인지는 문서를 본 모델이 정해야 하므로 그 조합에 해당하는 설정이 하나뿐이기 때문임`, ok:true},
      {t:`도구가 세 개 이상일 때는 특정 도구를 지정할 수 없어 any가 유일한 선택지이기 때문임`},
      {t:`any가 auto보다 더 최신이고 권장되는 설정이라 구조화 출력에는 기본으로 any를 쓰는 것이 맞기 때문임`},
      {t:`대화 텍스트로 새는 것을 막아야 하는데 auto는 도구를 아예 쓰지 않을 수도 있어 위험하기 때문임`},
    ],
    explain:`tool_choice는 "무엇을 보장하고 싶은가"에서 거꾸로 고르는 값임. 호출 자체를 보장하고 싶으면 any, 특정 도구까지 고정하고 싶으면 이름 지정, 모델 재량이면 auto임. 요구를 두 조각으로 나누면 바로 나옴.`});

  /* --- Ch4 · 4.4 검증과 재시도 --- */
  set("p4c4", 0, {
    q:`왜 재시도 횟수를 늘리는 것이 정답이 아닌가?`,
    opts:[
      {t:`재시도 요청에 무엇이 어떻게 틀렸는지가 들어 있지 않아 매 시도가 앞선 시도와 완전히 같은 조건에서 반복되고, 조건이 그대로면 횟수만 늘려도 성공률의 원인이 바뀌지 않기 때문임`, ok:true},
      {t:`재시도는 최대 2회까지만 허용되는 것이 API의 제약이라 6회는 애초에 불가능하기 때문임`},
      {t:`재시도를 반복하면 같은 오류가 대화에 쌓여 모델이 그 오류를 정답 패턴으로 학습하게 되기 때문임`},
      {t:`재시도 3종 세트가 가이드에 명시된 표준 절차라 절차를 따르지 않은 구현은 어떤 수치가 나와도 인정되지 않기 때문임`},
    ],
    explain:`실패율을 볼 때 물어야 할 것은 "몇 번 더 실행할까"가 아니라 "<b>한 번의 시도에 정보가 얼마나 들어가는가</b>"임. 정보량이 그대로면 반복은 비용만 늘림.`});
  set("p4c4", 1, {
    q:`왜 (a)와 (b)를 다르게 다뤄야 하는가?`,
    opts:[
      {t:`(a)는 필요한 값이 파이프라인이 받는 문서 밖에 있고 (b)는 값이 문서 안에 다 있어서, 재시도가 통하는 것은 재료가 손안에 있을 때뿐이기 때문임`, ok:true},
      {t:`(a)는 필드 하나짜리 문제이고 (b)는 여러 필드가 얽힌 계산 문제라 영향 범위가 다르면 처리도 달라야 하기 때문임`},
      {t:`(a)는 매번 실패하고 (b)는 가끔 실패하므로 실패 빈도가 높은 쪽을 먼저 사람에게 넘기는 것이 순서이기 때문임`},
      {t:`정보 부재는 재시도 불가라고 가이드가 명시했으니 그 규칙을 그대로 적용해야 하기 때문임`},
    ],
    explain:`재시도 가능 여부를 가르는 것은 <b>정보의 소재</b>임. 모델이 볼 수 있는 자리에 답이 있으면 피드백으로 고쳐지고, 없으면 몇 번을 반복해도 지어내기만 늘어남.`});

  /* --- Ch5 · 4.5 배치 처리 --- */
  set("p4c5", 0, {
    q:`왜 "보통 2~3시간"이 근거가 되지 못하는가?`,
    opts:[
      {t:`규제 마감은 최악의 경우까지 지켜야 하는 약속이라 평소 관측값이 아니라 보장된 최대치로 계산해야 하는데, 배치에는 그 보장이 아예 없기 때문임`, ok:true},
      {t:`2~3시간이라는 수치가 문서에 명시된 값이 아니라 엔지니어의 경험담이라 출처가 없는 숫자는 계산에 쓸 수 없기 때문임`},
      {t:`2만 건은 평소 관측 규모보다 훨씬 커서 그 경험값이 이 규모에는 적용되지 않기 때문임`},
      {t:`규제 업무에는 배치를 쓰지 않는 것이 원칙이라 처음부터 후보가 아니기 때문임`},
    ],
    explain:`마감이 걸린 계산에서는 늘 <b>보장된 최대치</b>로 역산함. "대체로 이만큼 걸린다"는 관측이지 약속이 아니라서, 한 번의 예외가 그대로 위반이 됨.`});
  set("p4c5", 1, {
    q:`왜 처리 시간이 아니라 제출 주기가 핵심인가?`,
    opts:[
      {t:`고객이 세는 시간은 업로드 순간부터 시작하는데 배치는 다음 제출 때까지 문서를 보관하므로, 그 대기 시간이 처리 시간과 별개로 SLA를 소모하기 때문임`, ok:true},
      {t:`제출 주기를 짧게 하면 배치당 건수가 줄어 각 배치의 처리 시간도 함께 줄어들기 때문임`},
      {t:`배치는 제출 직후부터 우선순위가 높아 자주 제출할수록 전체 대기열에서 앞자리를 차지하기 때문임`},
      {t:`SLA 계산은 대기와 처리를 합쳐서 하는 것이 표준이라 표준 계산법을 따르면 자동으로 나오는 결과이기 때문임`},
    ],
    explain:`약속한 시간과 비교할 값은 처리 시간 하나가 아니라 <b>대기 + 처리</b>임. 사용자 쪽 시간이 언제부터 시작하는지를 먼저 정해야 이 계산이 맞음.`});

  /* --- Ch6 · 4.6 다중 인스턴스 리뷰 --- */
  set("p4c6", 0, {
    q:`왜 18%와 71%의 차이를 프롬프트 품질로 메울 수 없는가?`,
    opts:[
      {t:`같은 세션 안에서는 그 코드를 왜 그렇게 작성했는지에 대한 근거가 그대로 남아 있어, 더 깊이 생각하게 해도 그 근거를 더 촘촘히 옹호하는 쪽으로 가고 맥락 자체는 지시로 지워지지 않기 때문임`, ok:true},
      {t:`extended thinking은 코드 리뷰 같은 검사 작업에 효과가 적은 기능이라 다른 기능을 켜야 수치가 올라가기 때문임`},
      {t:`50건은 표본이 작아 18%와 71%의 차이가 우연일 수 있고 결론을 내기 전에 표본을 늘려야 하기 때문임`},
      {t:`독립 인스턴스 리뷰가 가이드가 제시한 정석 아키텍처라 자기 리뷰는 애초에 권장되지 않는 방식이기 때문임`},
    ],
    explain:`수치를 볼 때는 <b>조정으로 움직이는 폭</b>과 <b>구조가 만든 폭</b>을 나눠야 함. 4포인트는 조정의 폭이고 53포인트는 맥락 유무의 폭임. 후자는 프롬프트를 아무리 고쳐도 움직이지 않음.`});
  set("p4c6", 1, {
    q:`왜 신뢰도 점수를 그대로 쓰면 안 되는가?`,
    opts:[
      {t:`모델이 말하는 0.9가 실제로 열 번 중 아홉 번 맞는다는 뜻인지 아무도 확인한 적이 없어, 정답이 붙은 검증 세트로 대조해 보기 전에는 그 숫자가 무엇을 가리키는지 알 수 없기 때문임`, ok:true},
      {t:`모델의 신뢰도 점수는 요청할 때마다 값이 달라져 같은 발견에도 다른 점수가 나오기 때문임`},
      {t:`신뢰도 점수는 심각도와 함께 볼 때만 의미가 있어 단독으로는 라우팅 기준이 될 수 없기 때문임`},
      {t:`보정을 거친 뒤에 쓰는 것이 정석 절차라 절차를 건너뛴 설계는 채택될 수 없기 때문임`},
    ],
    explain:`모델이 내놓은 숫자는 <b>보정 전에는 단위가 없는 값</b>임. 정답지와 대조해 "이 값이 실제 몇 %에 해당하는가"를 붙여야 임계값이라는 말이 성립함.`});

  /* --- Ch7 · gap-fix가 추가한 구조화 출력 세 방법 --- */
  set("p4c7", 0, {
    q:`왜 두 사고가 한 번에 없어지는가?`,
    opts:[
      {t:`두 사고가 프리필의 서로 다른 성질(시작만 강제한다는 점과 최신 모델 세대에서 차단됐다는 점)에서 나왔으므로, 프리필을 걷어내고 객체 전체를 스키마로 강제하면 두 원인이 동시에 사라지기 때문임`, ok:true},
      {t:`tool use가 프리필보다 상위 기능이라 상위 기능으로 올리면 하위 기능에서 나던 문제는 자동으로 해결되기 때문임`},
      {t:`꼬리 문장 사고와 400 에러가 사실 같은 원인이라 원인 하나를 없애면 증상 둘이 함께 사라지기 때문임`},
      {t:`구조화 출력이 프리필의 공식 대체 경로로 안내돼 있어 문서가 가리키는 경로를 따르면 되기 때문임`},
    ],
    explain:`한 수단을 걷어낼 때는 그 수단이 <b>무엇을 강제했고 어디까지 지원됐는가</b>를 따로 확인할 것. 두 성질이 각각 사고를 하나씩 만들고 있었다면, 두 성질을 다 대체하는 수단만이 정답임.`});
  set("p4c7", 1, {
    q:`왜 여기서는 가장 약한 강제 수단이 정답이 되는가?`,
    opts:[
      {t:`게이트웨이가 tools를 잘라내고 모델 세대가 고정돼 있어 강한 수단들이 이 분기에는 존재하지 않고, 남은 후보 중에서 서두가 들어갈 자리 자체를 없애는 것이 프리필뿐이기 때문임`, ok:true},
      {t:`문제가 7%로 크지 않아 가볍고 저렴한 수단으로 충분하고 무거운 수단은 과잉이기 때문임`},
      {t:`서두 제거는 원래 프리필의 대표 용도라 용도가 맞으면 다른 조건과 무관하게 프리필을 쓰는 것이 맞기 때문임`},
      {t:`규제 환경에서는 요청 구조를 바꾸지 않는 최소 변경이 원칙이라 가장 적게 수정하는 방법을 골라야 하기 때문임`},
    ],
    explain:`실전 지문은 "쓸 수 없는 것"을 조건으로 깔아 둠. 그러면 일반적으로 가장 강한 방법이 정답에서 빠짐. <b>후보를 먼저 지우고 남은 것 중에서</b> 강제력을 따지는 순서로 풀어야 함.`});
  set("p4c7", 2, {
    q:`왜 그 한 줄만 지침에서 빠져야 하는가?`,
    opts:[
      {t:`제한이 걸리는 자리가 마지막 assistant 턴 하나로 한정돼 있어 대화 중간의 assistant 메시지는 영향이 없는데, 그것까지 모두 지우라고 하면 정상적인 대화 기록을 삭제하게 되기 때문임`, ok:true},
      {t:`마이그레이션 지침에는 삭제 지시를 넣지 않고 대체 방법만 적는 것이 관행이라 그 줄의 형식이 맞지 않기 때문임`},
      {t:`대화 중간의 assistant 메시지도 언젠가 제한 대상이 될 수 있어 지금 단정적으로 적어 두면 나중에 틀린 문서가 되기 때문임`},
      {t:`나머지 세 줄이 공식 문서에 그대로 있는 문장이라 문서에 없는 줄은 지침에서 빼는 것이 원칙이기 때문임`},
    ],
    explain:`제한이나 규칙을 읽을 때는 <b>적용 범위</b>를 문장에서 그대로 확인할 것. "지원 안 됨"이 어디까지인지가 한 단어(마지막 턴)에 걸려 있고, 그 범위를 넓혀 읽는 순간 지침 전체가 틀려짐.`});
})();

/* ------------------------------------------------------------
   (3) 용어사전 D4 확장 · 최소 18개 채우기
   프리필과 구조화 출력 서술은 gap-fix.js가 공식 문서로 확인한 범위만 사용함
   ------------------------------------------------------------ */
(function(){
  var A = window.CCAF_APPENDIX;
  if(!A || !Array.isArray(A.glossary)) return;
  var have = {};
  A.glossary.forEach(function(g){ have[g.c + "|" + g.t] = true; });
  var add = [
   {c:"D4", t:"구조화 출력 (structured output)", d:"사람이 읽는 문장이 아니라 코드가 바로 읽는 모양(주로 JSON)으로 답을 받는 것임. 다음 프로그램이 그대로 쓰는 것이 목적임."},
   {c:"D4", t:"파싱 (parsing)", d:"모델이 준 문자열을 프로그램이 데이터로 나눠 읽는 작업임. 앞뒤에 문장 한 줄만 붙어도 통째로 실패함."},
   {c:"D4", t:"스키마 (schema)", d:"출력에 어떤 칸이 있고 각 칸에 어떤 종류의 값이 들어가는지 미리 적어 둔 정의서임. JSON으로 적어 도구 정의 안에 실어 보냄."},
   {c:"D4", t:"tool use + JSON 스키마", d:"추출용 도구를 정의하고 그 입력 스키마로 출력 모양을 고정하는 방식임. 강제 범위는 객체 전체이며 칸 이름·타입·필수 여부까지 포함함."},
   {c:"D4", t:"Structured outputs (strict / JSON outputs)", d:"공식 기능 두 갈래임. strict:true로 스키마 준수를 보장하는 도구 호출, 그리고 도구 없이 응답 자체를 스키마 JSON으로 받는 방식임. 지원 모델 목록이 정해져 있음."},
   {c:"D4", t:"프롬프트로 형식 지시", d:"'JSON만 반환할 것' 같은 문장으로 요청하는 방식임. 강제가 아니라 요청이라 확률적임. 대신 가장 저렴하고 마크다운·YAML까지 형식 유연성이 가장 높음."},
   {c:"D4", t:"프리필 (prefill)", d:"messages 마지막 메시지를 assistant 역할로 두고 일부를 적어 두면 응답이 그 지점에서 이어져 시작함. 강제하는 것은 시작뿐이고 끝은 강제하지 못함."},
   {c:"D4", t:"프리필 400 제한", d:"Claude 4.6 계열과 Mythos Preview부터 마지막 assistant 턴 프리필을 지원하지 않으며 해당 요청은 400임. 이전 세대는 계속 지원하고 대화 중간 assistant 메시지는 무관함."},
   {c:"D4", t:"required / nullable", d:"반드시 값이 있어야 하는 칸과 비워도 되는 칸임. 정보가 없는데 required이면 모델이 그럴듯한 값을 지어내 채움."},
   {c:"D4", t:"enum + 예외 항목", d:"값을 정해 둔 목록 중에서만 고르게 하는 조건임. 'other'(+상세 칸)나 'unclear' 같은 예외 항목이 없으면 억지 분류가 나옴."},
   {c:"D4", t:"문법 오류 vs 의미 오류", d:"괄호·타입 같은 모양 오류는 스키마가 제거하고, 합계 불일치나 값이 옆 칸에 들어간 오류는 검증 루프의 몫임. 모양이 정상인 오류는 스키마를 그냥 통과함."},
   {c:"D4", t:"검증 (validation)", d:"모델 출력을 프로그램이 규칙과 대조해 통과와 실패를 판정하는 별도 단계임. 모델이 자기 답을 스스로 보증하지 못하므로 따로 필요함."},
   {c:"D4", t:"자기 검증 필드", d:"stated_total과 calculated_total처럼 서로 대조되는 값을 나란히 추출해 불일치를 표시하는 설계임."},
   {c:"D4", t:"동기 호출 vs 배치 처리", d:"요청을 보내고 그 자리에서 기다리는 방식과, 묶어서 제출하고 나중에 받아 가는 방식임. 가르는 기준은 건수가 아니라 지연 허용치이며, 한 시스템에서 공존하는 것이 정상임."},
   {c:"D4", t:"명시적 기준 (explicit criteria)", d:"보고할 범주와 건너뛸 범주를 이름으로 고정하고 범주마다 실물 예시를 붙이는 것임. '신중하게 할 것' 계열 지시의 대체 수단임."},
   {c:"D4", t:"정밀도 (precision)", d:"낸 지적 중 실제로 맞는 것의 비율임. 오탐이 늘수록 떨어지고, 떨어지면 맞는 지적까지 함께 무시당함."},
   {c:"D4", t:"심각도 (severity)", d:"지적마다 붙이는 등급임. 형용사 정의만 있으면 매 요청마다 해석이 달라져 흔들림. 레벨별 코드 예시가 있어야 일관됨."},
   {c:"D4", t:"다중 패스 리뷰", d:"파일별 패스로 세부를 확인하고 통합 패스로 파일 간 상호작용을 보는 구조임. 한 번에 다 보게 하면 둘 다 얕아짐."},
   {c:"D4", t:"D4 판단 기준 3개", d:"누가 형식을 강제하는가(모델인가 프로그램인가) · 언제 결과가 필요한가(즉시인가 나중인가) · 틀렸을 때 어떻게 아는가(검증)임. 한 기준의 도구로 다른 기준을 다루지 못함."}
  ];
  add.forEach(function(g){
    if(!have[g.c + "|" + g.t]) A.glossary.push(g);
  });
})();

  window.__ccafOpenP4Loaded = true;
})();
