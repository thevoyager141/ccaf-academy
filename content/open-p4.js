/* ============================================================
   OPEN-P4 · D4(프롬프트 엔지니어링과 구조화된 출력) 오프닝 레슨 + 이유 카드 + 용어 보강
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
p4.lessons.unshift({ id:"p4c0", ch:"OPEN", title:"Part 4 문항의 출제 형태", steps:[

/* ① 실전 형태 예고 */
{type:"concept", kind:"PART BRIEFING · 파트 설명", h:"문항이 출제되는 형태",
   html:`<h4>① 출제 규모</h4>
<ul>
<li>영역 이름: D4 프롬프트 엔지니어링과 구조화된 출력</li>
<li>출제 비중 20%. 60문항 기준 약 12문항</li>
<li>주로 나오는 시나리오: 구조화 데이터 추출. 문서에서 값을 뽑아 JSON으로 만들고 검증한 뒤 다음 시스템에 전달하는 작업</li>
<li>D5의 내용과 한 브리핑 안에서 함께 출제되는 경우가 많음</li>
</ul>
<h4>② 출제 형태</h4>
<ul>
<li>브리핑 하나 아래에 문항 여러 개</li>
<li>브리핑 한 문단에 시스템 구성, 증상, 숫자, 제약이 모두 포함</li>
<li>문항마다 브리핑의 다른 줄이 근거</li>
</ul>
<h4>③ 가장 자주 틀리는 내용</h4>
<ul>
<li>출력 형식을 정하는 방법의 선택</li>
<li>스키마로 강제, 프롬프트로 요청, 프리필 세 방법 중 상황에 맞는 방법을 고르는 형태</li>
</ul>
<h4>④ 이 레슨의 순서</h4>
<ul>
<li>브리핑 하나와 문항 세 개로 실제 형태 확인</li>
<li>세 문항이 물은 내용과 판단 기준 정리</li>
<li>파트 전체 지도와 용어 정리</li>
</ul>`},

/* ② 시나리오 블록 · 브리핑 읽는 법 */
{type:"concept", brief:BRIEF, kind:"CONCEPT · 개념 설명", h:"브리핑에서 확인할 네 가지",
   html:`<h4>① 구성</h4>
<ul>
<li>처리 경로 두 개. 밤에 한꺼번에 처리하는 4만 건, 그리고 화면에서 바로 처리하는 1건</li>
<li>두 경로가 같은 추출 프롬프트 사용</li>
<li>경로가 둘이면 맞는 방법도 경로마다 다를 수 있음. 전부 한 가지로 통일하는 선택지는 맞지 않는 경우가 많음</li>
</ul>
<h4>② 증상</h4>
<table>
<tr><th>증상</th><th>문제의 종류</th></tr>
<tr><td>응답의 0.5%에 JSON 바깥 문장이 붙어 적재 프로그램이 행 전체를 거부</td><td>형식</td></tr>
<tr><td>문서 아래쪽의 합계가 빈 값으로 추출. 배송 주소가 청구 주소 항목에 들어감</td><td>추출 정확도. 사람은 읽을 수 있는 값</td></tr>
<tr><td>밤 처리의 건당 비용이 바로 처리하는 경로와 같음</td><td>처리 방식</td></tr>
</table>
<h4>③ 제약</h4>
<ul>
<li>모델 고정. 항목 14개 고정. 바로 처리하는 경로의 응답 시간 2초. 밤 처리에는 사람 검토 없음</li>
<li>제약이 선택지를 먼저 제외. 일반적으로 좋은 방법이 이 브리핑에서는 쓸 수 없는 경우 존재</li>
</ul>
<h4>④ 질문</h4>
<ul>
<li>문항을 읽은 뒤 브리핑에서 근거가 되는 줄 찾기</li>
<li>근거가 되는 줄을 찾지 못한 문항은 추측으로 고르지 않고 브리핑 다시 확인</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>적재 프로그램(loader)</b>: 받은 자료를 데이터베이스에 넣는 프로그램</li>
<li><b>JSON</b>: 항목 이름과 값을 짝지어 적는 글 형식</li>
<li><b>청구 주소, 배송 주소</b>: 요금 청구서를 받는 주소와 물건을 받는 주소</li>
</ul>
</div>`},

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
     {t:`구조화된 출력은 tool use가 정석이라, 공식 문서도 이 방법을 항상 제일 먼저 쓰라고 안내하기 때문임`},
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
{type:"concept", kind:"TOPIC · 주제 설명", h:"정리: 세 문항의 내용과 판단 기준",
   html:`<h4>① 문항별 내용</h4>
<table>
<tr><th>문항</th><th>브리핑의 근거</th><th>물어본 내용</th><th>가르는 기준</th></tr>
<tr><td>Q1 형식</td><td>사람 검토 없음. JSON 바깥 문장 때문에 행 거부</td><td>출력 형식을 강제하는 방법</td><td>방법마다 강제하는 범위. 답 전체인지, 시작 부분인지, 요청일 뿐인지</td></tr>
<tr><td>Q2 추출 정확도</td><td>사람은 읽을 수 있는 값이 특정 양식에서만 실패</td><td>추출 품질을 높이는 방법</td><td>정보가 문서에 있는지 여부. 있으면 기준과 예시의 문제, 없으면 빈 값 허용의 문제</td></tr>
<tr><td>Q3 처리 방식</td><td>주간 마감 때 확인하는 경로와 2초 안에 답해야 하는 경로</td><td>배치와 일반 요청의 배치</td><td>기다릴 수 있는 시간이 배치 최대 처리 시간보다 긴지. 건수는 기준이 아님</td></tr>
</table>
<h4>② 판단 기준 세 가지</h4>
<table>
<tr><th>기준</th><th>브리핑에서 찾을 문장</th><th>선택지</th><th>챕터</th></tr>
<tr><td>형식을 강제하는 주체</td><td>"사람 검토 없이 적재", "중간 서버가 tools 항목 삭제", "출력은 보고서 형식"</td><td>스키마로 강제, 프롬프트로 요청, 프리필</td><td>CH 3, CH 7</td></tr>
<tr><td>결과가 필요한 시점</td><td>"화면이 대기", "N초 안에", "다음 날 아침 마감", "완료 시각 약속 없음"</td><td>일반 요청, 배치</td><td>CH 5</td></tr>
<tr><td>틀린 결과를 알아내는 방법</td><td>"합계 불일치", "값이 다른 항목에", "없는 값을 지어냄", "재시도 성공률 12%"</td><td>형식 오류는 스키마, 내용 오류는 검증과 재시도, 정보가 없으면 빈 값과 사람 검토</td><td>CH 4</td></tr>
</table>
<ul>
<li>세 기준은 서로 대신할 수 없음</li>
<li>스키마가 엄격해도 합계 불일치는 찾지 못함. 검증이 좋아도 문서에 없는 값은 만들지 못함</li>
<li>한 기준의 수단으로 다른 기준의 문제를 풀려는 선택지는 맞지 않는 선택지</li>
</ul>`},

/* ④ 개념 지도 */
{type:"concept", kind:"CONCEPT · 개념 설명", h:"이 파트 전체 지도",
   html:`__MAP4:all__
<h4>① 지도 읽는 방법</h4>
<table>
<tr><th>위치</th><th>뜻</th><th>챕터</th></tr>
<tr><td>윗줄</td><td>Claude에 넣기 전. 문서에 기준을 붙이고 애매한 경우는 예시로 전달</td><td>CH 1, CH 2</td></tr>
<tr><td>가운데 왼쪽</td><td>출력 형식 강제</td><td>CH 3, CH 7</td></tr>
<tr><td>가운데 오른쪽</td><td>내용 검증. 실패하면 오류를 붙여 다시 요청</td><td>CH 4</td></tr>
<tr><td>아랫줄 왼쪽</td><td>배치 처리</td><td>CH 5</td></tr>
<tr><td>아랫줄 오른쪽</td><td>리뷰 구성</td><td>CH 6</td></tr>
</table>
<ul>
<li>아랫줄 두 칸은 순서가 아니라 선택지. 한 시스템 안에서 일반 요청과 함께 사용</li>
</ul>
<h4>② 지도와 판단 기준</h4>
<table>
<tr><th>판단 기준</th><th>지도의 위치</th></tr>
<tr><td>형식을 강제하는 주체</td><td>가운데 왼쪽</td></tr>
<tr><td>결과가 필요한 시점</td><td>아랫줄 왼쪽</td></tr>
<tr><td>틀린 결과를 알아내는 방법</td><td>가운데 오른쪽과 재시도 화살표</td></tr>
</table>
<ul>
<li>윗줄이 부실하면 뒤에서 강제하고 검증해도 값이 맞지 않음</li>
</ul>`},

/* ⑤ 지도 위의 용어 · 0부터 */
{type:"concept", kind:"CONCEPT · 개념 설명", h:"지도에 나온 용어 정리",
   html:`<h4>① JSON</h4>
<ul>
<li>중괄호 안에 항목 이름과 값을 짝지어 나열하는 글 형식</li>
<li>예: <code>{"invoice_id": "INV-2201", "total": 1240.5, "po_number": null}</code></li>
<li>프로그램이 읽는 용도. 쉼표나 괄호 하나가 어긋나면 읽기 전체 실패</li>
<li><code>null</code>: 값이 없다는 표시. 0이나 빈 글자와 다른 뜻</li>
</ul>
<h4>② 파싱</h4>
<ul>
<li>받은 글을 프로그램이 항목별로 나눠 읽는 작업</li>
<li>JSON 앞이나 뒤에 문장 한 줄만 붙어도 실패</li>
</ul>
<h4>③ 스키마</h4>
<ul>
<li>출력에 들어갈 항목과 값의 종류를 정해 둔 양식</li>
<li>보장 범위: 형식. 항목 이름, 값의 종류, 비워도 되는지 여부</li>
</ul>
<table>
<tr><th>조건</th><th>뜻</th><th>주의할 점</th></tr>
<tr><td>required</td><td>반드시 채워야 하는 항목</td><td>문서에 정보가 없으면 Claude가 값을 지어냄</td></tr>
<tr><td>nullable</td><td>비워도 되는 항목</td><td>정보가 없을 때 빈 값으로 표시 가능</td></tr>
<tr><td>enum</td><td>정해진 값 중 하나를 고르는 항목</td><td>목록에 없는 경우에 쓸 값 "other"나 "unclear" 필요</td></tr>
</table>
<h4>④ 형식 강제</h4>
<ul>
<li>JSON 출력: 스키마를 요청에 넣어 답 전체를 양식에 맞추는 기능. 도구 정의가 필요 없음</li>
<li>도구와 스키마: 도구의 입력 양식으로 스키마를 넣고 Claude가 그 도구를 호출하며 넣은 입력값을 결과로 사용. <code>strict: true</code>를 넣으면 양식 일치 보장</li>
<li>두 방식 모두 답 앞뒤에 다른 문장이 붙을 자리가 없음</li>
<li>막지 못하는 것: 형식은 맞고 값이 틀린 경우</li>
</ul>
<h4>⑤ 프리필</h4>
<ul>
<li>Claude가 쓸 답의 첫 부분을 요청에 미리 적어 두는 방식. 예: 여는 중괄호</li>
<li>강제 범위: 답의 시작 부분</li>
<li>Claude 4.6 이후 모델에서는 400 오류로 요청 실패. 대화 중간에 들어 있는 Claude의 이전 답은 제한 대상이 아님</li>
</ul>
<h4>⑥ 일반 요청과 배치</h4>
<table>
<tr><th>방식</th><th>동작</th><th>쓰는 경우</th></tr>
<tr><td>일반 요청</td><td>요청을 보내고 답이 올 때까지 대기</td><td>사용자가 화면 앞에서 기다리는 작업</td></tr>
<tr><td>배치</td><td>여러 건을 한 번에 제출하고 나중에 결과 수령. 비용 50%. 최대 24시간. 완료 시각 보장 없음</td><td>결과가 늦어도 되는 작업</td></tr>
</table>
<ul>
<li>선택 기준은 건수가 아니라 기다릴 수 있는 시간</li>
</ul>
<h4>⑦ 검증</h4>
<ul>
<li>출력을 프로그램이 규칙과 대조해 통과와 실패를 판정하는 단계</li>
<li>필요한 이유: 스키마는 형식만 보장. 합계가 맞지 않는 출력도 형식은 정상</li>
<li>실패했을 때: 원본 문서, 실패한 출력, 구체적인 오류 내용을 붙여 다시 요청</li>
<li>문서에 정보가 없는 경우: 재시도 효과 없음. 빈 값 허용이나 사람 검토로 처리</li>
</ul>`},

/* ⑥ 학습 순서 */
{type:"concept", kind:"CONCEPT · 개념 설명", h:"이 파트 학습 순서",
   html:`<h4>① 권장 순서</h4>
<table>
<tr><th>순서</th><th>챕터</th><th>이유</th></tr>
<tr><td>1</td><td>CH 1 명시적 기준</td><td>이 파트의 출발점. "신중하게"라는 지시의 한계 확인</td></tr>
<tr><td>2</td><td>CH 2 few-shot 예시</td><td>CH 1의 기준과 함께 쓰는 수단</td></tr>
<tr><td>3</td><td>CH 3 구조화된 출력과 JSON 스키마</td><td>형식 강제의 기본</td></tr>
<tr><td>4</td><td>CH 7 세 방법의 선택</td><td>CH 3에서 배운 방법을 다른 두 방법과 비교. 가장 자주 틀리는 내용</td></tr>
<tr><td>5</td><td>CH 4 검증과 재시도</td><td>형식을 강제한 뒤에 남는 내용 오류</td></tr>
<tr><td>6</td><td>CH 5 배치 처리</td><td>기다릴 수 있는 시간으로 계산하는 문제가 반복 출제</td></tr>
<tr><td>7</td><td>CH 6 독립 리뷰</td><td>코드 리뷰 시나리오와 함께 출제</td></tr>
<tr><td>8</td><td>CH 8 사고와 effort 설정</td><td>보충 내용</td></tr>
<tr><td>9</td><td>D4 미니테스트 12문항</td><td>틀린 문항의 판단 기준을 적고 해당 챕터로 돌아가기</td></tr>
</table>
<h4>② 학습할 때 지킬 두 가지</h4>
<ul>
<li>정답 문장을 외우지 않기. 실제 선택지는 레슨의 문장과 다른 표현으로 작성</li>
<li>이유 카드 활용. 답이 맞는 이유를 고를 수 있어야 다음 단계로 진행</li>
</ul>
<h4>③ 연습 문제의 형태</h4>
<ul>
<li>여러 방법 중 이 상황에 맞는 방법을 고르는 형태</li>
<li>방법 하나의 뜻을 묻는 문제로 읽혔다면 브리핑의 제약 문장을 놓친 경우</li>
</ul>`},
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
      {t:`any가 auto보다 더 최신이고 권장되는 설정이라 구조화된 출력에는 기본으로 any를 쓰는 것이 맞기 때문임`},
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

  /* --- Ch7 · gap-fix가 추가한 구조화된 출력 세 방법 --- */
  set("p4c7", 0, {
    q:`왜 두 사고가 한 번에 없어지는가?`,
    opts:[
      {t:`두 사고가 프리필의 서로 다른 성질(시작만 강제한다는 점과 최신 모델 세대에서 차단됐다는 점)에서 나왔으므로, 프리필을 걷어내고 객체 전체를 스키마로 강제하면 두 원인이 동시에 사라지기 때문임`, ok:true},
      {t:`tool use가 프리필보다 상위 기능이라 상위 기능으로 올리면 하위 기능에서 나던 문제는 자동으로 해결되기 때문임`},
      {t:`꼬리 문장 사고와 400 에러가 사실 같은 원인이라 원인 하나를 없애면 증상 둘이 함께 사라지기 때문임`},
      {t:`구조화된 출력이 프리필의 공식 대체 경로로 안내돼 있어 문서가 가리키는 경로를 따르면 되기 때문임`},
    ],
    explain:`한 수단을 걷어낼 때는 그 수단이 <b>무엇을 강제했고 어디까지 지원됐는가</b>를 따로 확인할 것. 두 성질이 각각 사고를 하나씩 만들고 있었다면, 두 성질을 다 대체하는 수단만이 정답임.`});
  set("p4c7", 1, {
    q:`왜 도구를 쓸 수 없는데도 스키마로 강제할 수 있는가?`,
    opts:[
      {t:`JSON 출력은 도구 정의 없이 output_config.format에 넣은 스키마로 응답 글 자체를 맞추는 방식이라, 게이트웨이가 tools 항목을 삭제해도 스키마가 요청에 그대로 남기 때문`, ok:true},
      {t:`게이트웨이가 tools 항목을 삭제해도 모델이 이전 요청의 도구 정의를 기억하고 있어 같은 양식으로 답하기 때문`},
      {t:`문제가 7%로 크지 않아 가볍고 저렴한 수단으로 충분하고 무거운 수단은 과잉이기 때문`},
      {t:`구조화된 출력이 프리필의 공식 대체 방법으로 안내돼 있어 조건과 무관하게 그 방법을 고르면 되기 때문`},
    ],
    explain:`문제는 쓸 수 없는 방법을 조건으로 제시함. <b>쓸 수 없는 방법을 먼저 제외하고 남은 방법 중에서</b> 강제력을 비교하는 순서. 제외되는 이유는 방법마다 다름. tool use는 게이트웨이 때문에, 프리필은 모델 때문에 제외.`});
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
   프리필과 구조화된 출력 서술은 gap-fix.js가 공식 문서로 확인한 범위만 사용함
   ------------------------------------------------------------ */
(function(){
  var A = window.CCAF_APPENDIX;
  if(!A || !Array.isArray(A.glossary)) return;
  var have = {};
  A.glossary.forEach(function(g){ have[g.c + "|" + g.t] = true; });
  var add = [
   {c:"D4", t:"구조화된 출력 (structured output)", d:"사람이 읽는 문장이 아니라 코드가 바로 읽는 모양(주로 JSON)으로 답을 받는 것임. 다음 프로그램이 그대로 쓰는 것이 목적임."},
   {c:"D4", t:"파싱 (parsing)", d:"모델이 준 문자열을 프로그램이 데이터로 나눠 읽는 작업임. 앞뒤에 문장 한 줄만 붙어도 통째로 실패함."},
   {c:"D4", t:"스키마 (schema)", d:"출력에 어떤 칸이 있고 각 칸에 어떤 종류의 값이 들어가는지 미리 적어 둔 정의서임. JSON으로 적어 도구 정의 안에 실어 보냄."},
   {c:"D4", t:"tool use + JSON 스키마", d:"추출용 도구를 정의하고 그 입력 스키마로 출력 모양을 고정하는 방식임. 강제 범위는 객체 전체이며 칸 이름·타입·필수 여부까지 포함함."},
   {c:"D4", t:"Structured outputs (strict / JSON outputs)", d:"공식 기능 두 갈래임. strict:true로 스키마 준수를 보장하는 도구 호출, 그리고 도구 없이 응답 자체를 스키마 JSON으로 받는 방식임. 공식 문서에 적힌 사용 가능 모델은 모든 모델."},
   {c:"D4", t:"프롬프트로 형식 지시", d:"'JSON만 반환할 것' 같은 문장으로 요청하는 방식임. 강제가 아니라 요청이라 확률적임. 대신 가장 저렴하고 마크다운·YAML까지 형식 유연성이 가장 높음."},
   {c:"D4", t:"프리필 (prefill)", d:"messages 마지막 메시지를 assistant 역할로 두고 일부를 적어 두면 응답이 그 지점에서 이어져 시작함. 강제하는 것은 시작뿐이고 끝은 강제하지 못함."},
   {c:"D4", t:"프리필 400 제한", d:"Claude 4.6 계열과 Mythos Preview부터 마지막 assistant 턴 프리필을 지원하지 않으며 해당 요청은 400임. 대화 중간 assistant 메시지는 무관함. 프리필을 지원하는 Claude Sonnet 4.5의 지원 종료일은 2026-11-30."},
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
