/* ============================================================
   gap-fix.js: 방법 선택형 출제 구간 보강 (2026-08-27)

   아래 세 영역은 "여러 방법 중 하나를 고르는" 형태로 출제되며,
   방법 사이의 차이를 모르면 정답률이 크게 떨어짐.
   기존 자료에는 선택지로 등장하는 방법 일부가 빠져 있었음.
     (1) D5 컨텍스트 창 최적화: 슬라이딩 윈도, 구조화 상태 객체가 없었음
     (2) D4 구조화된 출력 방법 선택: 프리필이 없었음
     (3) D1 동적 분해: 고정 순서와 발견 기반을 가르는 판별 신호가 부족했음

   로드 순서: part1.js / part4.js / part5.js / mt-extra.js 뒤.
   기존 항목은 수정하지 않고 추가만 함.
   ============================================================ */

/* ===== 공용 삽입 헬퍼: 중복 로드와 순서 오류 방지용 ===== */
(function(){
  window.__ccafInsertLesson = function(part, beforeId, lesson){
    if(!part || !Array.isArray(part.lessons)) return;
    if(part.lessons.some(function(l){ return l.id === lesson.id; })) return; /* 이미 들어 있으면 무시 */
    var i = part.lessons.findIndex(function(l){ return l.id === beforeId; });
    if(i < 0) part.lessons.push(lesson); else part.lessons.splice(i, 0, lesson);
  };
})();


/* ============================================================
   (1) D5 신규 챕터: p5c7 · 컨텍스트 창을 다루는 네 가지 방법
   ============================================================ */
window.__ccafInsertLesson(window.CCAF_CONTENT.p5, "p5test",
{ id:"p5c7", ch:"CH 7", title:"컨텍스트 창 최적화: 네 방법의 선택",
  steps:[

  {type:"concept", kind:"CONCEPT · 개념 설명", h:"컨텍스트 창 관리 방법 네 가지",
   html:`<h4>① 요약(summarization)</h4>
<ul>
<li>하는 일: 오래된 부분을 Claude에게 줄이게 해서 글 몇 줄로 교체</li>
<li>버리는 것: 원문. 금액, 날짜, 번호 같은 정확한 값이 먼저 사라짐</li>
<li>남기는 것: 대화 전체의 요지</li>
<li>비용: 줄이는 작업에 모델 호출 한 번 추가</li>
</ul>
<h4>② 슬라이딩 윈도(sliding window)</h4>
<ul>
<li>하는 일: 최근 N번의 주고받음만 남기고 그 앞은 삭제</li>
<li>버리는 것: 범위 밖의 대화 전부. 요약도 남지 않음</li>
<li>남기는 것: 최근 N번의 원문 그대로</li>
<li>비용: 거의 없음. 추가 모델 호출 없음</li>
</ul>
<div class="fig"><b>N이 10인 슬라이딩 윈도. 41번째 대화 시점</b><br>
1번 ~ 31번&nbsp;&nbsp;<span class="an">← 삭제. 요약도 없음</span><br>
32번 ~ 41번&nbsp;&nbsp;<span class="an">← 원문 그대로</span><br>
42번째 대화가 오면 32번 삭제
</div>
<h4>③ 구조화 상태 객체(structured state object)</h4>
<ul>
<li>하는 일: 미리 정한 항목에 값을 채워 매번 요청에 포함. 대화가 진행될 때마다 값 갱신</li>
<li>버리는 것: 대화의 표현과 결정에 이른 과정</li>
<li>남기는 것: 정해 둔 항목의 값. 어느 주문의 금액인지 같은 소속도 유지</li>
<li>크기: 대화가 길어져도 항목 수만큼으로 일정</li>
<li>한계: 항목에 없는 정보는 담을 수 없음</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 매번 요청에 넣는 상태 객체</div>
{ "order_id": "A-1042",<br>
&nbsp;&nbsp;"refund_amount": 847.50,<br>
&nbsp;&nbsp;"deadline": "2026-03-15",<br>
&nbsp;&nbsp;"status": "awaiting_approval",<br>
&nbsp;&nbsp;"agreed_actions": ["원래 결제 수단으로 환불", "배송비 면제"] }
</div>
<p class="cap">200번을 주고받은 뒤에도 847.50이 그대로 남고 A-1042 주문의 값이라는 점도 유지.</p>
<h4>④ 선택적 보존(selective retention)</h4>
<ul>
<li>하는 일: 남길 내용과 버릴 내용을 규칙으로 판정. 남길 내용은 원문 그대로 유지</li>
<li>규칙 예: "고객이 말한 조건, 합의한 내용, 숫자가 든 문장은 원문 유지. 인사말은 삭제"</li>
<li>한계: 판정 규칙을 직접 작성. 판정이 틀리면 필요한 내용이 사라짐</li>
</ul>
<h4>⑤ API가 제공하는 기능</h4>
<table>
<tr><th>기능</th><th>내용</th></tr>
<tr><td>압축<br>compaction</td><td>오래된 대화를 Anthropic 서버가 요약으로 교체. 요약 프로그램을 직접 만들 필요 없음</td></tr>
<tr><td>컨텍스트 편집<br>context editing</td><td>오래된 도구 결과를 서버가 비우는 기능</td></tr>
<tr><td>메모리 도구<br>memory tool</td><td>Claude가 파일에 정보를 적고 다시 읽는 도구. 파일은 내 저장 공간에 보관</td></tr>
</table>
<ul>
<li><a href="https://platform.claude.com/docs/ko/build-with-claude/compaction" target="_blank" rel="noopener">Claude 공식 문서 '압축 개요' 페이지</a> (한국어)</li>
<li><a href="https://platform.claude.com/docs/ko/build-with-claude/context-editing" target="_blank" rel="noopener">Claude 공식 문서 '컨텍스트 편집' 페이지</a> (한국어)</li>
<li><a href="https://platform.claude.com/docs/ko/agents-and-tools/tool-use/memory-tool" target="_blank" rel="noopener">Claude 공식 문서 '메모리 도구' 페이지</a> (한국어)</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>턴(turn)</b>: 사용자 메시지 하나와 그에 대한 답 하나. 한 번의 주고받음</li>
<li><b>상태 객체</b>: 지금까지 확정된 값을 항목별로 모아 둔 자료 묶음</li>
<li><b>베타(beta)</b>: 정식 출시 전 단계의 기능. 압축과 컨텍스트 편집은 요청에 베타 표시를 넣어 사용</li>
</ul>
</div>`},

  {type:"concept", kind:"TOPIC · 주제 설명", h:"네 방법의 비교와 선택 순서",
   html:`<h4>① 비교</h4>
<table>
<tr><th>방법</th><th>버리는 것</th><th>남기는 것</th><th>추가 비용</th><th>맞는 상황</th><th>맞지 않는 상황</th></tr>
<tr><td><strong>요약</strong></td><td>원문과 정확한 값</td><td>전체의 요지</td><td>있음</td><td>대화의 흐름과 과정이 필요한 작업</td><td>금액, 날짜, 번호를 정확히 지켜야 하는 작업</td></tr>
<tr><td><strong>슬라이딩 윈도</strong></td><td>범위 밖 대화 전부</td><td>최근 N번의 원문</td><td>없음</td><td>오래된 내용이 필요 없다는 근거가 있는 작업</td><td>초반에 정한 조건이 끝까지 지켜져야 하는 작업</td></tr>
<tr><td><strong>구조화 상태 객체</strong></td><td>대화의 표현과 과정</td><td>정해 둔 항목의 값</td><td>적음</td><td>지킬 항목이 미리 정해진 작업. 예: 주문, 예약, 심사</td><td>무엇이 중요할지 미리 알 수 없는 조사</td></tr>
<tr><td><strong>선택적 보존</strong></td><td>중요도가 낮다고 판정한 내용</td><td>중요하다고 판정한 원문</td><td>판정 비용</td><td>규칙으로 중요도를 가를 수 있지만 항목까지는 정할 수 없는 작업</td><td>판정 기준을 세울 수 없는 작업</td></tr>
</table>
<h4>② 헷갈리기 쉬운 두 쌍</h4>
<ul>
<li>요약과 슬라이딩 윈도: 요약은 줄여서 남김. 슬라이딩 윈도는 범위 밖을 전부 삭제</li>
<li>구조화 상태 객체와 선택적 보존: 앞은 항목 단위, 뒤는 원문 단위. 항목을 미리 적을 수 있으면 구조화 상태 객체</li>
</ul>
<h4>③ 선택 순서</h4>
<ul>
<li>1단계: 글자 그대로 남아야 하는 값이 있는지 확인. 있으면 요약만 쓰는 방법 제외</li>
<li>2단계: 그 값의 목록을 미리 적을 수 있는지 확인. 가능하면 구조화 상태 객체, 불가능하면 선택적 보존</li>
<li>3단계: 오래된 내용이 필요 없다는 근거가 있는지 확인. 있으면 슬라이딩 윈도</li>
</ul>
<h4>④ 함께 쓰는 경우</h4>
<ul>
<li>CH 1의 핵심 사실 블록: 사실은 상태 객체로 따로 보관하고 나머지 대화는 요약</li>
<li>대화는 슬라이딩 윈도로 유지하고 반드시 남아야 하는 조건만 별도 블록으로 매번 포함</li>
<li>요구가 둘 이상인 작업에서는 방법을 함께 쓰는 설계가 맞는 경우가 많음</li>
</ul>
<h4>⑤ 효과 없는 방법</h4>
<table>
<tr><th>방법</th><th>문제</th></tr>
<tr><td>컨텍스트 창이 더 큰 모델로 교체</td><td>문제가 생기는 시점을 늦출 뿐 무엇을 남길지는 그대로 미정</td></tr>
<tr><td>요약을 더 자주 실행</td><td>정확한 값이 사라지는 성질은 그대로. 손실이 더 자주 발생</td></tr>
<tr><td>"잊지 말 것"이라는 지시</td><td>이미 컨텍스트에서 빠진 내용은 지시로 되살릴 수 없음</td></tr>
</table>`},

  {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: Nine fields, 300 turns",
   q:`A trading-desk compliance agent runs one continuous session per trading day. At any point it must report the exact values of nine fields — client ID, instrument, notional, limit-breach flags, approver, and timestamps — all of which are fixed and known before the day starts. Sessions run 300+ turns and token spend is already at budget. Today the team summarizes the oldest 200 turns every hour; last week a report gave the notional as "roughly 4 million" when the booked figure was 4,182,500. Which context strategy fits?`,
   opts:[
     {t:`Maintain a structured state object with one field per required value, updated each turn and carried forward verbatim, and let ordinary summarization handle only the surrounding narrative.`, ok:true},
     {t:`Summarize more often so each summary covers less material and loses less per pass.`},
     {t:`Switch to a sliding window over the most recent 40 turns, which keeps the retained text byte-for-byte accurate.`},
     {t:`Use selective retention: keep in full any turn containing a currency figure, and drop the rest.`},
   ],
   hint:`판별 순서 2번을 먼저 적용할 것. 지켜야 할 값의 목록을 미리 적을 수 있는가. 그리고 개장 직후 확정된 값이 300턴 뒤에도 필요하다는 조건을 어기는 선택지를 지울 것.`,
   explain:{
     good:`아홉 개 필드가 하루 시작 전에 확정된다는 조건이 구조화 상태 객체가 맞는 조건임. 값이 글자 그대로 유지되고, 턴이 300개가 되어도 객체 크기는 일정하므로 예산 문제까지 함께 해결됨. 서사 맥락만 요약에 맡기는 조합이 5.1의 실전 형태임.`,
     wrongs:[
       `<b>B(요약 빈도 증가):</b> 손실 압축을 더 자주 실행하면 정밀한 값이 더 자주 손실됨. 원인이 빈도가 아니라 방식이므로 빈도를 조정해도 해결되지 않음.`,
       `<b>C(슬라이딩 윈도):</b> 창 안 원문이 100% 정확하다는 서술 자체는 맞으므로 오답 유도 선택지임. 개장 직후 확정된 값은 300턴 뒤에는 확실히 창 밖에 있고, 윈도는 창 밖을 요약조차 남기지 않음.`,
       `<b>D(선택적 보존):</b> 지킬 목록이 이미 확정된 상황에서는 판정을 실행할 이유가 없고, "통화 기호가 든 문장" 규칙은 승인자나 위반 플래그처럼 숫자가 아닌 필드를 통째로 놓침.`,
     ]},
   principle:"지킬 값이 미리 확정되면 구조화 상태 객체"},

  {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2: The alert stream",
   q:`An on-call triage assistant watches a Kubernetes alert stream. Each turn it receives the last minute of alerts and answers one question: "is anything actionable right now?" Six months of transcripts show that nothing older than about ten minutes has ever changed an answer. The latency budget is 800ms per turn and the team's standing rule is "no extra model calls in the request path." Which strategy fits best?`,
   opts:[
     {t:`A sliding window over the most recent turns — everything older is dropped outright, the retained alert text stays exact, and nothing extra runs to maintain it.`, ok:true},
     {t:`Progressive summarization of everything older than ten minutes, so no part of the stream is ever lost outright.`},
     {t:`A structured state object holding every alert type seen since the session began, which caps context growth.`},
     {t:`Selective retention driven by a per-turn relevance judgment, preserving anything the judge marks important for the rest of the session.`}],
   hint:`여섯 달치 기록이 확인해 준 사실 한 줄과 800ms 예산 한 줄이 선택지 셋을 지움. 무언가를 버리지 않으려는 선택지부터 검토할 것.`,
   explain:{
     good:`오래된 내용이 정말 필요 없다는 근거와 추가 호출 금지 조건이 함께 있으면 슬라이딩 윈도가 맞음. 비용이 가장 적고 구조가 가장 단순하며 창 안 정확도는 100%임.`,
     wrongs:[
       `<b>B(누진 요약):</b> 아무것도 잃지 않는다는 성질이 여기서는 이점이 아님. 필요 없다고 확인된 내용을 지키려고 800ms 예산에 압축 호출을 얹는 조치임.`,
       `<b>C(구조화 상태 객체):</b> 크기 상한이 생긴다는 서술은 맞음. 그러나 지문은 오래된 알림 자체가 가치가 없다고 명시함. 쓰지 않을 값을 세션 내내 유지하는 설계임.`,
       `<b>D(선택적 보존):</b> 매 턴 판정이 요청 경로에 판단을 하나 더 추가하므로 지연 규칙을 바로 어김. 게다가 중요로 표시된 내용이 계속 쌓여 결국 컨텍스트 창이 다시 가득 차게 됨.`,
     ]},
   principle:"오래된 내용이 정말 필요 없을 때만 슬라이딩 윈도"},

  {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 3: Traceability rule (LEAST)",
   q:`A six-hour multi-agent research run has one non-negotiable rule from the research lead: every claim in the final report must be traceable to the exact sentence and source URL that produced it, including sentences read in the first hour. Which context strategy is LEAST compatible with that rule?`,
   opts:[
     {t:`Progressive summarization: fold each agent's findings into a running narrative digest every 30 minutes, keeping the digest under 2K tokens.`, ok:true},
     {t:`A structured state object holding one record per claim: the claim, the supporting sentence, the source URL, and the retrieval time.`},
     {t:`Selective retention that keeps verbatim every sentence carrying a citation and drops procedural chatter and tool acknowledgements.`},
     {t:`A sliding window over recent conversational turns, combined with an append-only citations block re-included in every prompt.`},
   ],
   hint:`부정형 문항이므로 가장 부적합한 것을 골라야 함. 규칙이 요구하는 것은 정확한 문장과 URL임. 네 선택지 중 원문 문장을 유일하게 없애는 방식이 무엇인지 확인할 것.`,
   explain:{
     good:`누진 요약은 손실 압축이므로 압축을 거칠 때마다 문장도 URL도 흐려짐. 6시간을 30분마다 압축하면 1시간째 문장은 열두 번 압축된 상태이므로 추적 자체가 불가능해짐.`,
     wrongs:[
       `<b>B(구조화 상태 객체):</b> 주장마다 문장, URL, 시각을 필드로 유지하므로 규칙과 정확히 맞음. 여기서는 오답이 아니라 모범 답임.`,
       `<b>C(선택적 보존):</b> 인용이 달린 문장을 원문 그대로 남기므로 추적성이 유지됨. 버리는 것은 절차성 대화뿐임.`,
       `<b>D(윈도와 인용 블록 조합):</b> 대화는 가볍게 유지하고 인용은 별도 블록으로 매 턴 다시 넣는 조합형이며 규칙을 지킴.`,
     ]},
   principle:"손실 압축은 추적성과 함께 쓸 수 없음"},
]});


/* ============================================================
   (2) D4 신규 챕터: p4c7 · 출력 형식을 강제하는 세 가지 방법
   프리필 서술은 공식 문서에서 직접 확인한 내용만 씀 (URL은 확인 노트 스텝에)
   ============================================================ */
window.__ccafInsertLesson(window.CCAF_CONTENT.p4, "p4test",
{ id:"p4c7", ch:"CH 7", title:"구조화된 출력: 세 방법의 선택",
  steps:[

  {type:"concept", kind:"CONCEPT · 개념 설명", h:"출력 형식을 정하는 세 가지 방법",
   html:`<h4>① 스키마로 강제</h4>
    <ul>
      <li>방법: JSON 출력 또는 도구와 스키마. CH 3에서 다룬 내용</li>
      <li>강제 범위: 답 전체. 항목 이름과 값의 종류까지 포함</li>
      <li>남는 문제: 값의 내용 오류. CH 4의 검증 단계에서 처리</li>
    </ul>
    <h4>② 프롬프트로 요청</h4>
    <ul>
      <li>방법: "JSON만 반환. 설명 문장 금지" 같은 문장을 프롬프트에 작성</li>
      <li>강제 범위: 없음. 대부분 지켜지지만 보장은 없는 요청</li>
      <li>자주 생기는 문제: 답 앞에 붙는 인사 문장. 답 뒤에 붙는 설명. 항목 이름의 작은 차이</li>
      <li>장점: 추가 비용이 가장 적음. 표나 특정 문체처럼 JSON이 아닌 형식도 지정 가능</li>
    </ul>
    <div class="screen"><div class="sbar">화면 예시 · 프롬프트로만 요청해서 받은 답</div>
<span class="sel">Sure! Here is the JSON:</span><br>
{ "label": "refund" }
    </div>
    <p class="cap">첫 줄의 인사 문장 때문에 프로그램이 답을 읽지 못하는 경우.</p>
    <h4>③ 프리필(prefill)</h4>
    <ul>
      <li>방법: Claude가 쓸 답의 첫 부분을 요청에 미리 적어 두기. 예: 여는 중괄호 <code>{</code></li>
      <li>강제 범위: 답의 시작 부분. 끝부분은 고정되지 않아 답 뒤에 다른 문장이 붙을 수 있음</li>
      <li>사용 가능 모델: Claude 4.6보다 앞선 모델. Claude 4.6 이후 모델에서는 400 오류로 요청 실패</li>
      <li>제한 대상: 요청의 마지막에 미리 적어 둔 답의 첫 부분. 대화 중간에 들어 있는 Claude의 이전 답은 제한 대상이 아님</li>
    </ul>
    <h4>④ 프리필 대신 쓰는 방법</h4>
    <table>
      <tr><th>프리필을 쓰던 목적</th><th>대신 쓰는 방법</th></tr>
      <tr><td>답의 형식 고정</td><td>JSON 출력</td></tr>
      <tr><td>정해진 값 중 하나로 분류</td><td>값 목록을 enum으로 넣은 스키마</td></tr>
      <tr><td>답 앞의 인사 문장 제거</td><td>시스템 프롬프트에 직접 지시. XML 태그 안에 답을 쓰게 하기. 받은 뒤 잘라내기</td></tr>
    </table>
    <div class="callout">📖 <b>용어 카드</b>
      <ul>
        <li><b>구조화된 출력(structured outputs)</b>: 프로그램이 바로 읽을 수 있는 정해진 양식의 답</li>
        <li><b>파싱(parsing)</b>: 받은 답을 프로그램이 항목별로 나눠 읽는 작업. 형식이 어긋나면 실패</li>
        <li><b>프리필(prefill)</b>: 답의 첫 부분을 요청에 미리 적어 두는 방식</li>
        <li><b>시스템 프롬프트(system prompt)</b>: 대화 전체에 적용되는 기본 지시문</li>
        <li><b>XML 태그</b>: <code>&lt;answer&gt;</code>처럼 꺾쇠로 감싼 표시. 답의 범위를 구분하는 용도</li>
      </ul>
    </div>`},

  {type:"concept", kind:"TOPIC · 주제 설명", h:"세 방법 비교와 선택 기준",
   html:`<h4>① 세 방법 비교</h4>
    <table>
      <tr><th>방법</th><th>강제 범위</th><th>강제력</th><th>추가 비용</th><th>형식 자유도</th><th>사용 가능 모델</th></tr>
      <tr><td><strong>스키마로 강제</strong></td><td>답 전체</td><td>강함</td><td>스키마 분량만큼의 토큰</td><td>낮음. JSON 구조만 가능</td><td>모든 모델</td></tr>
      <tr><td><strong>프롬프트로 요청</strong></td><td>없음</td><td>약함</td><td>거의 없음</td><td>가장 높음</td><td>모든 모델</td></tr>
      <tr><td><strong>프리필</strong></td><td>답의 시작 부분</td><td>중간</td><td>거의 없음</td><td>높음</td><td>Claude 4.6보다 앞선 모델</td></tr>
    </table>
    <h4>② 선택 기준</h4>
    <ul>
      <li>답을 프로그램이 바로 읽는 작업: 스키마로 강제</li>
      <li>JSON이 아닌 형식이 필요한 작업: 프롬프트로 요청. CH 4의 검증 단계와 함께 사용</li>
      <li>답 앞의 인사 문장만 문제인 경우: 시스템 프롬프트에 직접 지시하거나 받은 뒤 잘라내기. 형식까지 고정하려면 JSON 출력</li>
      <li>기존 프로그램에 프리필이 들어 있는 경우: 모델을 바꾸기 전에 프리필 제거</li>
    </ul>
    <h4>③ 조건 확인 순서</h4>
    <ul>
      <li>문제에 쓸 수 없는 방법이 조건으로 제시되는 경우가 있음</li>
      <li>1단계: 조건 때문에 쓸 수 없는 방법 제외</li>
      <li>2단계: 남은 방법 중 강제력이 가장 강한 방법 선택</li>
    </ul>
    <div class="fig"><b>조건: 중간 서버가 요청의 tools 항목을 삭제. 모델은 현재 세대</b><br>
✗ 도구와 스키마&nbsp;&nbsp;<span class="an">← tools 항목 필요</span><br>
✗ 프리필&nbsp;&nbsp;<span class="an">← 현재 세대 모델에서 400 오류</span><br>
△ 프롬프트로 요청&nbsp;&nbsp;<span class="an">← 사용 가능. 보장 없음</span><br>
✓ JSON 출력&nbsp;&nbsp;<span class="an">← output_config.format 사용. tools 항목 불필요</span>
    </div>
    <div class="callout">📖 <b>용어 카드</b>
      <ul>
        <li><b>토큰(token)</b>: Claude가 글을 세는 단위. 요청과 답의 토큰 수에 따라 비용 계산</li>
        <li><b>중간 서버(gateway, proxy)</b>: 프로그램과 Claude 사이에서 요청을 받아 전달하는 서버</li>
        <li><b>tools 항목</b>: 요청 안에서 도구 정의를 적는 자리</li>
      </ul>
    </div>`},

  {type:"concept", kind:"CONCEPT · 확인 노트", h:"근거 공식 문서",
   html:`<p class="lead">이 챕터의 사실은 아래 네 문서에서 확인. 확인 날짜 2026-11-23.</p>
    <h4>① 구조화된 출력</h4>
    <ul>
      <li><a href="https://platform.claude.com/docs/ko/build-with-claude/structured-outputs" target="_blank" rel="noopener">Claude 공식 문서 '구조화된 출력' 페이지</a> (한국어)</li>
      <li>확인한 내용: 기능은 JSON 출력과 엄격한 도구 사용 두 가지. 사용 가능 모델 표기는 모든 모델. JSON 출력과 프리필은 함께 사용 불가</li>
    </ul>
    <h4>② 프리필 제한</h4>
    <ul>
      <li><a href="https://platform.claude.com/docs/ko/build-with-claude/prompt-engineering/claude-prompting-best-practices" target="_blank" rel="noopener">Claude 공식 문서 '프롬프팅 모범 사례' 페이지</a> (한국어)의 '미리 채워진 응답에서 마이그레이션하기' 항목</li>
      <li>확인한 내용: Claude 4.6 이후 모델은 마지막 assistant 턴의 프리필 미지원. 해당 요청은 400 오류. 대화 중간의 assistant 메시지는 영향 없음</li>
    </ul>
    <h4>③ 도구 호출 설정</h4>
    <ul>
      <li><a href="https://platform.claude.com/docs/ko/agents-and-tools/tool-use/define-tools#forcing-tool-use" target="_blank" rel="noopener">Claude 공식 문서 '도구 정의하기' 페이지의 '도구 사용 강제하기' 항목</a> (한국어)</li>
      <li>확인한 내용: tool_choice 값은 auto, any, 도구 이름 지정, none 네 가지. Claude Fable 5.2, Opus 5.5, Sonnet 5.5는 any와 도구 이름 지정을 400 오류로 거절</li>
    </ul>
    <h4>④ 모델 지원 종료 일정</h4>
    <ul>
      <li><a href="https://platform.claude.com/docs/ko/about-claude/model-deprecations" target="_blank" rel="noopener">Claude 공식 문서 '모델 지원 중단' 페이지</a> (한국어)</li>
      <li>확인한 내용: 프리필을 지원하는 Claude Sonnet 4.5의 지원 종료일은 2026-11-30</li>
    </ul>
    <div class="callout">📖 <b>용어 카드</b>
      <ul>
        <li><b>assistant 턴</b>: 대화에서 Claude가 답하는 차례</li>
        <li><b>지원 종료</b>: 해당 모델로 보낸 요청이 더는 처리되지 않는 상태</li>
      </ul>
    </div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: Two incidents, one prefill",
   q:`A nightly job extracts 14 fields from scanned purchase orders and loads them straight into Postgres with no human review. The current implementation prefills the assistant turn with an opening brace and a first key, then parses whatever comes back. Two problems this month: (1) about 0.4% of responses appended a trailing sentence after the closing brace, breaking the loader; (2) after the team pinned the job to a Claude 4.6 model, every request began failing with a 400. What should the pipeline move to?`,
   opts:[
     {t:`Define the extraction as a tool with a JSON schema and read the structured tool input — the schema constrains the whole object rather than just its first characters, and it carries no prefill restriction.`, ok:true},
     {t:`Keep the prefill, strip anything after the closing brace with a regex, and pin the job back to a pre-4.6 model.`},
     {t:`Replace the prefill with a strongly worded instruction — "output only JSON, nothing before or after" — which removes the model-support problem entirely.`},
     {t:`Keep the prefill but move the assistant message earlier in the conversation, which sidesteps the last-turn restriction.`},
   ],
   hint:`두 사고가 프리필의 서로 다른 성질에서 나왔음. 하나는 무엇을 강제하는가의 문제이고, 하나는 어디까지 지원되는가의 문제임. 그리고 사람 검수가 없다는 조건을 어기는 선택지를 지울 것.`,
   explain:{
     good:`프리필은 응답의 시작 지점만 고정함. 닫는 괄호 뒤는 그대로 열려 있으므로 (1)이 발생했고, 4.6 계열부터 마지막 assistant 턴 프리필이 막혀 400이 되므로 (2)가 발생했음. 두 문제를 함께 없애는 방법은 객체 전체를 스키마로 강제하는 tool use임.`,
     wrongs:[
       `<b>B(정규식과 구버전 고정):</b> 사고 원인은 그대로 두고 주변만 막는 임시 조치이며, 모델 업그레이드 경로를 계속 막아 둠.`,
       `<b>C(강한 지시로 교체):</b> 400은 사라지지만 강제력이 요청 수준으로 떨어짐. 사람 검수가 없는 야간 적재에서 0.4%보다 높은 형식 사고율을 감수하겠다는 의미임. 일반론으로는 맞는 말이라서 오답 유도 선택지임.`,
       `<b>D(assistant 메시지를 앞으로 이동):</b> 대화 중간의 assistant 메시지가 제한과 무관한 것은 사실임. 그러나 그것은 프리필이 아님. 응답 시작을 고정하려면 마지막 턴이어야 하므로 목적 자체가 사라짐.`,
     ]},
   principle:"시작만 고정하는 방식은 끝을 보장하지 못함"},

  {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2: Pinned model, stripped tools",
   q:`A regulated client runs an on-prem gateway pinned to a current-generation Claude model for the next two quarters. The gateway strips the tools field from every outbound request and passes every other field through unchanged. Their classifier has exactly one defect: roughly 7% of responses open with "Sure! Here is the classification:" before the JSON, which breaks a strict parser. Changing the model or the gateway is out of scope this quarter. What is the most direct fix available to them?`,
   opts:[
     {t:`Pass a JSON schema in output_config.format so the API constrains the response text itself to that schema; this path needs no tools field and leaves no position where a preamble could appear.`, ok:true},
     {t:`Move the extraction to tool use with a JSON schema, the most reliable structured-output mechanism available.`},
     {t:`Prefill the assistant turn with an opening brace so the response continues from that point and no preamble can appear.`},
     {t:`Add "do not include any preamble" to the system prompt and retry any response that fails to parse.`}],
   hint:`쓸 수 없는 방법부터 제외. 게이트웨이가 삭제하는 항목과 현재 세대 모델이 거절하는 방식이 선택지 둘을 지움. 남은 둘 중 강제력이 있는 쪽 확인.`,
   explain:{
     good:`게이트웨이가 삭제하는 항목은 tools 하나. JSON 출력은 <code>output_config.format</code>에 스키마를 넣는 방식이라 도구 정의가 필요 없음. 응답 글 자체가 스키마에 맞춰지므로 서두가 들어갈 자리가 없음.`,
     wrongs:[
       `<b>B(tool use):</b> 일반적으로는 강한 방법이라 고르기 쉬운 오답. 게이트웨이가 tools 항목을 삭제하므로 이번 분기에는 사용 불가.`,
       `<b>C(프리필):</b> Claude 4.6 이후 모델은 마지막 assistant 턴의 프리필 요청을 400 오류로 거절. 요청 자체가 실패.`,
       `<b>D(지시와 재시도):</b> 서두가 붙을 확률을 낮출 뿐 7%를 0%로 만들지 못함. 재시도만큼 비용과 지연 추가.`,
     ]},
   principle:"제약이 후보를 먼저 지움"},

  {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 3: Migration guide (NOT)",
   q:`A platform team is writing the internal migration guide for moving every service off prefilled assistant turns before an org-wide upgrade to Claude 4.6. Which line does NOT belong in that guide?`,
   opts:[
     {t:`"Assistant messages appearing earlier in the conversation must be removed too, since the restriction applies to every assistant message in the request."`, ok:true},
     {t:`"Services that prefilled an opening brace to force JSON should move to structured outputs, or to a tool with a JSON schema."`},
     {t:`"Services that prefilled 'Here is the summary:' to suppress preambles should instead instruct the model directly, emit inside XML tags, or strip the preamble in post-processing."`},
     {t:`"Requests that still carry a prefilled final assistant turn will fail with a 400 rather than silently ignoring the prefill."`},
   ],
   hint:`제한이 걸리는 범위가 판단 기준임. messages 안의 모든 assistant 메시지인가, 마지막 하나인가. 공식 마이그레이션 문서가 한 줄로 명시하고 있음. 부정형이므로 틀린 줄을 골라야 함.`,
   explain:{
     good:`제한은 <b>마지막</b> assistant 턴의 프리필에만 걸림. 대화 중간에 들어 있는 assistant 메시지(이전 턴의 실제 응답 기록 등)는 영향이 없다고 문서에 명시돼 있음. 그것을 모두 지우라는 지침은 정상적인 대화 기록을 삭제하게 만드는 잘못된 안내임.`,
     wrongs:[
       `<b>B:</b> 형식 강제 용도의 프리필은 구조화된 출력이나 스키마 도구로 옮기라는 것이 공식 안내 그대로임.`,
       `<b>C:</b> 서두 제거 용도의 대체안 세 가지(직접 지시, XML 태그 안 출력, 후처리 제거)도 문서가 그대로 제시함.`,
       `<b>D:</b> 조용히 무시되는 것이 아니라 400으로 실패함. 그러므로 업그레이드 전에 반드시 제거해야 함.`,
     ]},
   principle:"제한은 마지막 assistant 턴에만 적용됨"},
]});


/* ============================================================
   (3) D1 동적 분해: 기존 레슨 p1c2 (CH 2 · 작업 분해 전략 1.6) steps 끝에 추가
   ============================================================ */
(function(){
  var p1 = window.CCAF_CONTENT && window.CCAF_CONTENT.p1;
  if(!p1) return;
  var L = (p1.lessons||[]).find(function(l){ return l.id === "p1c2"; });
  if(!L || !Array.isArray(L.steps)) return;
  if(L.steps.some(function(s){ return s.h === "판별 신호: 고정 순서인가, 발견에 따라 늘어나는가"; })) return;

  L.steps.push(
  {type:"concept", kind:"TOPIC · 주제 설명", h:"분해 방식 판단 신호",
   html:`<h4>① 프롬프트 체이닝이 맞는 신호</h4>
<ul>
<li>시작 전에 단계 목록을 모두 적을 수 있는 작업</li>
<li>건마다 같은 단계를 같은 순서로 진행하는 작업</li>
<li>앞 단계의 결과가 다음 단계의 값만 바꾸고 단계 자체는 그대로인 작업</li>
<li>같은 입력에 같은 처리 과정이 요구되는 작업. 예: 감사 대상 업무</li>
</ul>
<h4>② 동적 분해가 맞는 신호</h4>
<ul>
<li>시작할 때 하위 작업의 개수를 셀 수 없는 작업</li>
<li>중간 발견이 새 하위 작업을 만드는 작업</li>
<li>조사할 대상이 조사 결과에 따라 정해지는 작업</li>
</ul>
<h4>③ 헷갈리기 쉬운 경우</h4>
<table>
<tr><th>경우</th><th>판단</th><th>이유</th></tr>
<tr><td>같은 절차로 파일 14개 처리</td><td>프롬프트 체이닝</td><td>건수가 늘 뿐 단계는 그대로. 많은 건수는 병렬 실행의 근거</td></tr>
<tr><td>조건에 따라 갈라지는 절차</td><td>프롬프트 체이닝</td><td>갈라지는 조건을 미리 전부 적을 수 있으면 고정된 절차</td></tr>
<tr><td>계획 없이 바로 시작</td><td>둘 다 아님</td><td>동적 분해도 계획을 세우고 시작. 발견에 따라 계획을 수정하는 방식</td></tr>
</table>
<h4>④ 두 방식을 함께 쓰는 경우</h4>
<ul>
<li>바깥은 동적 분해. 무엇을 조사할지는 발견에 따라 결정</li>
<li>안쪽은 프롬프트 체이닝. 조사 대상이 정해지면 매번 같은 절차</li>
<li>예: 결제 실패 원인 조사. 어느 서비스를 볼지는 발견에 따라 결정. 서비스 하나를 볼 때는 로그, 설정, 최근 배포 순서로 확인</li>
</ul>
<h4>⑤ 어느 경우에도 맞지 않는 방법</h4>
<ul>
<li>파일 이름이나 폴더 순서대로 처리</li>
<li>한 번에 전부 처리</li>
<li>더 큰 컨텍스트 창이나 더 큰 모델로 해결. 분해가 필요한 이유는 분량이 아니라 주의 배분과 순서</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>로그(log)</b>: 프로그램이 실행 중에 남기는 기록</li>
<li><b>배포(deploy)</b>: 고친 프로그램을 실제 서비스에 반영하는 일</li>
<li><b>병렬 실행</b>: 여러 작업을 동시에 진행하는 방식</li>
</ul>
</div>`},

  {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 3: Two teams, two shapes",
   q:`Two teams each need an agent. Team A must check 240 vendor contracts against the same five clauses, in the same order, producing a per-contract verdict and then one cross-contract summary. Team B must answer "why did our AWS bill jump 3x in June?" — where each metric they pull decides which service, region, or account to open next. A written cost-analysis runbook already exists for Team B. Which assignment of decomposition strategies is correct?`,
   opts:[
     {t:`Team A → fixed sequential pipeline (per-contract passes plus a cross-contract pass); Team B → dynamic decomposition.`, ok:true},
     {t:`Both → dynamic decomposition, since neither team knows what the individual items will contain before the run starts.`},
     {t:`Team A → dynamic decomposition, so each contract's findings can reshape the checks applied to the next one; Team B → a fixed pipeline that follows the cost-analysis runbook.`},
     {t:`Both → fixed pipelines, since Team A's clauses are enumerated and Team B has a written runbook to follow.`},
   ],
   hint:`240건이 많다는 것이 동적 분해의 근거가 되는가. 개수가 느는 것과 단계가 바뀌는 것을 구분할 것. 그리고 런북이 있다는 사실이 다음에 어느 계정을 열지까지 정해 주는지 확인할 것.`,
   explain:{
     good:`조항 5개를 매 건 같은 순서로 확인한다는 것은 단계 목록을 미리 다 적을 수 있다는 뜻이므로 고정 파이프라인임(건별 패스와 통합 패스). 청구서 조사는 지표 하나가 다음에 열 대상을 정하므로 동적 분해임. 판별 기준은 개수가 아니라 단계가 발견에 따라 바뀌는가임.`,
     wrongs:[
       `<b>B(둘 다 동적):</b> 건수가 많다는 것은 병렬화의 근거이지 동적 분해의 근거가 아님. 240건 모두 같은 다섯 단계를 밟음.`,
       `<b>C(배정이 반대):</b> 계약 검토가 앞 건의 발견에 따라 항목을 바꾸면 건마다 기준이 달라져 감사 일관성이 깨짐. 오히려 하면 안 되는 설계임.`,
       `<b>D(둘 다 고정):</b> 런북이 있다는 것은 일반적으로는 맞지만 이 문제의 조건에서는 근거가 되지 못함. 런북은 어떻게 볼지를 적어 둔 것이고, 다음에 어느 계정을 열지는 6월 지표를 봐야 정해짐.`,
     ]},
   principle:"개수가 아니라 단계 변동이 기준"},

  {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 4: The lead wants a plan",
   q:`An agent is told: "find out why our onboarding funnel drops 40% at step 3, and fix it." The engineering lead requires a written plan before any code changes. The cause is currently unknown. Which planning approach matches the shape of this task?`,
   opts:[
     {t:`Produce a first plan from an initial survey — instrumentation review, funnel data pull, step-3 code read — then treat the plan as revisable: each finding may add, drop, or reorder subtasks, and the plan document is updated as it goes.`, ok:true},
     {t:`Write the full subtask list upfront and freeze it, so the lead can approve a stable scope and progress stays measurable.`},
     {t:`Skip planning and start reading the step-3 code immediately, since any plan will be obsolete after the first finding anyway.`},
     {t:`Enumerate all seven funnel steps and run the same analysis pass over each in order, then compare the results.`},
   ],
   hint:`리드가 계획서를 요구한다고 해서 계획을 고정해야 하는 것은 아님. 동적 분해가 계획을 버리는 방식이 아니라는 점, 그리고 기계적 전수 순회가 항상 오답인 이유를 함께 확인할 것.`,
   explain:{
     good:`원인을 모르는 조사형 과제이므로 동적 분해임. 동적 분해도 계획서를 작성함. 첫 조사로 초안을 만들고 발견마다 고쳐 쓰는 적응형 계획임. 리드의 요구(문서)와 작업의 성질(발견 주도)이 동시에 충족됨.`,
     wrongs:[
       `<b>B(계획 동결):</b> 첫 발견에서 계획이 어긋남. 범위 승인이 필요하면 계획을 고정할 것이 아니라 개정 이력을 제시하면 됨.`,
       `<b>C(계획 생략):</b> 계획 없이 착수하는 것은 동적 분해가 아니라 즉흥 처리임. 어디를 먼저 볼지 근거가 없어 영향이 적은 영역에 시간을 쓰게 됨.`,
       `<b>D(7단계 전수 순회):</b> 예측 가능해 보이지만 지문은 이미 3단계로 범위를 좁혀 두었음. 기계적 순회는 어느 쪽 정답에서도 오답인 고정 장치임.`,
     ]},
   principle:"동적 분해도 계획서를 작성함"});
})();


/* ============================================================
   (4) 확장 문제 풀: 총 11문항
   ts "5.1" 4문항 · ts "4.3" 4문항 · ts "1.6" 3문항
   (part1.js CH 2 = "작업 분해 전략 (1.6)" 이므로 동적 분해의 ts는 1.6)
   부정형 2문항 (5.1-3, 4.3-3) · multi:2 복수응답 2문항 (5.1-2, 4.3-2)
   ============================================================ */
(function(){
  window.CCAF_MT_EXTRA = window.CCAF_MT_EXTRA || {};
  const E = window.CCAF_MT_EXTRA;
  const add = (ts,q)=>{ (E[ts]=E[ts]||[]).push(q); };

  /* ---------- ts 5.1 · 컨텍스트 창 최적화 4문항 ---------- */

  add("5.1", {ts:"5.1", lvl:"실전", scenario:"s3",
   q:`A research orchestrator runs five subagents for four hours. The synthesis step keeps producing reports where a 2019 figure is presented as current, and where two different sources' numbers get merged into a single sentence. The orchestrator currently compacts each subagent's transcript into a 500-token narrative every 20 minutes. Which change to the context strategy addresses both symptoms?`,
   opts:[
     {t:`Have subagents return findings as structured records — claim, figure, source, publication date, relevance — and carry those records forward unsummarized, keeping narrative compaction only for the conversational scaffolding around them.`, ok:true},
     {t:`Raise the compaction budget from 500 to 2,000 tokens so fewer details are lost on each pass.`},
     {t:`Move each subagent to a sliding window over its last 30 turns, which preserves the retained text exactly.`},
     {t:`Instruct the synthesis agent to always state publication dates and never merge figures from different sources.`},
   ],
   explain:{
     good:`두 증상 모두 값이 어디서 왔고 언제 것인지라는 부속 정보가 압축 과정에서 떨어져 나가 발생함. 산문 압축 대신 필드가 정해진 레코드로 유지하면 출처와 시점이 값에 붙어 다니므로 값 병합도 시점 오독도 생기지 않음.`,
     wrongs:[
       `<b>B(예산 4배 증가):</b> 손실 압축이라는 성질은 그대로임. 어느 시점에는 같은 증상이 다시 발생함. 규모를 키워도 방식의 문제는 해결되지 않음.`,
       `<b>C(슬라이딩 윈도):</b> 창 안 원문이 정확하다는 서술은 맞으므로 오답 유도 선택지임. 4시간짜리 실행에서 초반 발견은 창 밖으로 나가고, 윈도는 창 밖을 요약조차 남기지 않음.`,
       `<b>D(합성 에이전트에 지시):</b> 지시는 확률적이고, 애초에 압축 단계에서 사라진 날짜를 합성 에이전트가 복원할 방법이 없음.`,
     ]},
   principle:"출처와 시점은 값에 붙여 구조로 유지함"});

  add("5.1", {ts:"5.1", lvl:"실전", scenario:"s4", multi:2,
   q:`A developer-productivity agent holds one session per engineer per day. Two defects surfaced: (1) a constraint the engineer stated at 09:10 — "never touch the payments module" — was violated at 16:40; (2) token spend per session grew 5x because every file read is retained in full. The team already summarizes hourly. Which TWO changes fix the actual defects? (Select TWO.)`,
   opts:[
     {t:`Extract stated constraints into a persistent structured block that is re-included in every prompt and excluded from summarization.`, ok:true},
     {t:`Trim retained file reads down to the spans actually referenced, so whole files never accumulate in context.`, ok:true},
     {t:`Shorten the summarization interval from hourly to every 15 minutes.`},
     {t:`Switch the whole session to a sliding window over the last 25 turns.`},
     {t:`Add a system-prompt line telling the agent to re-read the earlier conversation before any write operation.`},
   ],
   explain:{
     good:`두 결함의 성질이 다름. 제약 소실은 요약 대상에서 제외한 구조 블록으로 해결하고, 토큰 증가는 컨텍스트 유입 전 트리밍으로 해결함. 각각 원인 지점에 조치를 적용하는 것이 5.1의 형태임.`,
     wrongs:[
       `<b>C(요약 주기 단축):</b> 손실 압축을 네 배 자주 실행하는 조치이므로 제약 문장이 더 빨리 손실됨.`,
       `<b>D(슬라이딩 윈도 전환):</b> 토큰은 줄지만 09:10에 말한 제약은 확실히 창 밖으로 나감. 결함 하나를 고치면서 다른 하나를 악화시키는 선택지임.`,
       `<b>E(재확인 지시):</b> 이미 컨텍스트에서 빠진 내용은 다시 읽을 수 없음. 지시로는 복구되지 않음.`,
     ]},
   principle:"결함이 둘이면 조치도 둘, 각각 원인 지점에 적용함"});

  add("5.1", {ts:"5.1", lvl:"실전", scenario:"s3",
   q:`A team is choosing a context strategy for an eight-hour multi-agent literature review. The deliverable must cite exact page numbers from sources that were read in the first hour. Which option is LEAST appropriate?`,
   opts:[
     {t:`Progressive summarization of each agent's reading notes into a rolling digest, refreshed every 30 minutes.`, ok:true},
     {t:`A structured state object with one record per citation: source, page, and the quoted span.`},
     {t:`Selective retention that keeps verbatim any note containing a page reference.`},
     {t:`A sliding window for conversational turns, combined with an append-only citations block re-injected into every prompt.`},
   ],
   explain:{
     good:`부정형 문항이므로 가장 부적합한 것을 고름. 정확한 페이지 번호가 8시간 뒤에도 살아 있어야 하는데, 누진 요약은 손실 압축이라 30분마다 압축되면서 숫자부터 값이 흐려짐. 네 선택지 중 유일하게 원문 숫자를 지킬 장치가 없음.`,
     wrongs:[
       `<b>B:</b> 인용마다 출처, 페이지, 구절을 필드로 유지하므로 요구와 정확히 맞음.`,
       `<b>C:</b> 페이지 참조가 든 노트를 원문 그대로 남기므로 8시간 뒤에도 숫자가 살아 있음.`,
       `<b>D:</b> 대화는 윈도로 가볍게 유지하고 인용은 별도 블록으로 매 턴 다시 넣는 조합형이며 요구를 지킴.`,
     ]},
   principle:"손실 압축은 정밀한 값을 지키지 못함"});

  add("5.1", {ts:"5.1", lvl:"기초", scenario:"s4",
   q:`A pair-programming assistant answers questions about the file currently open in the editor. Six months of transcripts show that no answer ever depended on anything said more than eight turns earlier, and the team has a hard rule of "no extra model calls in the request path." Which context strategy fits best, and why?`,
   opts:[
     {t:`A sliding window over the last N turns — turns outside the window are dropped outright, the ones inside stay byte-for-byte exact, and nothing extra runs to maintain it.`, ok:true},
     {t:`Progressive summarization — it leaves a trace of every turn, so nothing is ever fully lost.`},
     {t:`A structured state object — it caps context size regardless of how many turns accumulate.`},
     {t:`Selective retention with a per-turn importance judgment — it keeps exactly what matters and nothing else.`},
   ],
   explain:{
     good:`오래된 내용이 답에 영향을 준 적이 없다는 근거와 추가 호출 금지 조건이 함께 있으므로 슬라이딩 윈도임. 창 밖은 통째로 버려 흔적이 없지만 여기서는 그것이 손해가 아니고, 창 안은 100% 원문임.`,
     wrongs:[
       `<b>B(누진 요약):</b> 압축용 모델 호출이 필요하므로 추가 모델 호출 금지 규칙을 바로 어김.`,
       `<b>C(구조화 상태 객체):</b> 크기 상한이 생긴다는 서술은 맞음. 그러나 필드를 정의하고 매 턴 갱신하는 작업이 드는 반면, 지문은 오래된 값이 쓸모가 없다고 명시함.`,
       `<b>D(선택적 보존):</b> 매 턴 중요도 판정 자체가 요청 경로에 판단을 하나 더 추가하므로 규칙 위반이고, 얻는 것도 없음.`,
     ]},
   principle:"쓰지 않을 내용을 지키는 설계는 비용만 늘어남"});

  /* ---------- ts 4.3 · 구조화된 출력 방법 선택 4문항 ---------- */

  add("4.3", {ts:"4.3", lvl:"실전", scenario:"s6",
   q:`A document-extraction service turns 30,000 PDFs per night into warehouse rows with no human review. The current design ends its prompt with "Return only a JSON object with these 11 keys" and parses the text response; 2.3% of nights fail on malformed output. The team runs on current models and controls the request end to end. Which replacement is right?`,
   opts:[
     {t:`Define the extraction as a tool with a JSON schema — optionally with strict schema validation — and read the structured tool input, so the whole object is constrained rather than requested.`, ok:true},
     {t:`Prefill the assistant turn with an opening brace so the response starts inside the object.`},
     {t:`Add few-shot examples of correct JSON plus a retry loop on parse failure.`},
     {t:`Keep the prompt instruction but set temperature to 0, making the output deterministic.`},
   ],
   explain:{
     good:`사람 검수가 없고 요청을 통제할 수 있으면 강제력이 가장 높은 방법을 선택하는 것이 맞음. 스키마 도구는 객체 전체의 형태를 강제하고, strict를 켜면 스키마 준수가 보장됨.`,
     wrongs:[
       `<b>B(프리필):</b> 시작만 고정함. 닫는 괄호 뒤는 그대로 열려 있음. 게다가 현행 4.6 계열 모델에서는 마지막 assistant 턴 프리필이 400으로 막혀 있음.`,
       `<b>C(few-shot과 재시도):</b> 실패율을 낮춘다는 서술은 맞으므로 오답 유도 선택지임. 그래도 여전히 확률적이고, 재시도는 3만 건 야간 배치에서 비용과 지연으로 돌아옴.`,
       `<b>D(temperature 0):</b> 같은 입력에 같은 출력을 유도할 뿐 형식을 보장하지 않음. 틀린 형식이 결정적으로 반복될 수도 있음.`,
     ]},
   principle:"검수가 없으면 강제력이 가장 높은 방법"});

  add("4.3", {ts:"4.3", lvl:"실전", scenario:"s6", multi:2,
   q:`A team must ship a classifier this week under two hard constraints: their proxy strips the tools field from every request while passing every other field through, and they are pinned to a current-generation Claude model for the quarter. Two failure modes: preamble text before the label, and occasional labels outside the allowed set. Which TWO measures are actually available to them and address those failures? (Select TWO.)`,
   opts:[
     {t:`Pass a JSON schema in output_config.format, which needs no tools field, constrains the response text itself, and leaves no position for a preamble.`, ok:true},
     {t:`Enumerate the allowed labels explicitly in the prompt and reject-and-retry any response whose label falls outside that set.`, ok:true},
     {t:`Define a tool whose schema declares the allowed labels as an enum, and force it with tool_choice.`},
     {t:`Prefill the assistant turn with the opening of the expected output so that the response continues from that point.`},
     {t:`Raise max_tokens so the model has room to finish the label without truncation.`},
   ],
   explain:{
     good:`제약 두 줄이 후보를 먼저 지움. 프록시가 tools 항목을 삭제하므로 enum 도구와 tool_choice는 사용 불가. Claude 4.6 이후 모델은 마지막 assistant 턴의 프리필을 400 오류로 거절. 남는 조치는 도구 없이 응답 글을 스키마에 맞추는 JSON 출력, 그리고 허용 목록 검증과 재시도.`,
     wrongs:[
       `<b>C(enum 도구):</b> 닫힌 라벨 집합에는 enum 도구가 일반적으로 맞는 방법이라 고르기 쉬운 오답. 프록시가 tools 항목을 삭제하므로 이번 분기에는 사용 불가.`,
       `<b>D(프리필):</b> 현재 세대 모델에서는 요청 자체가 400 오류로 실패.`,
       `<b>E(max_tokens):</b> 잘림만 막는 설정. 서두가 붙는 문제와 라벨이 목록을 벗어나는 문제는 토큰 수와 무관.`,
     ]},
   principle:"쓸 수 있는 방법을 먼저 추린 뒤 강제력을 비교함"});

  add("4.3", {ts:"4.3", lvl:"실전", scenario:"s6",
   q:`An engineer writes the "output enforcement" section of an internal design review for a data-extraction service. Which line should the reviewer strike as NOT accurate?`,
   opts:[
     {t:`"Prefilling the assistant turn is the strongest guarantee of a well-formed JSON object, because once the opening brace is supplied the model cannot deviate from the structure."`, ok:true},
     {t:`"A JSON schema supplied through tool use eliminates syntax errors but does not prevent semantic errors such as line items that do not sum to the stated total."`},
     {t:`"tool_choice \\"any\\" forces a tool call while still letting the model pick which extraction schema fits the document in front of it."`},
     {t:`"Prompt-level format instructions are the most flexible option, since they can target formats a JSON schema cannot express, but they carry no hard guarantee."`},
   ],
   explain:{
     good:`부정형 문항임. 프리필은 응답의 <b>시작 지점</b>만 고정함. 여는 중괄호를 제공했다고 닫는 중괄호나 키 이름과 타입이 보장되지 않고, 뒤에 다른 문장이 붙을 수도 있음. 게다가 4.6 계열과 Mythos Preview에서는 마지막 assistant 턴 프리필이 400으로 막히므로 "가장 강한 보장"이라는 서술은 두 가지 이유로 틀림.`,
     wrongs:[
       `<b>B:</b> 4.3의 명시 사실임. 문법 오류는 막고 의미 오류는 막지 못함. 합계 불일치는 4.4 검증 루프가 다룸.`,
       `<b>C:</b> "any"의 정의 그대로임. 반드시 도구를 호출하되 어느 도구인지는 모델이 고름.`,
       `<b>D:</b> 프롬프트 지시는 JSON으로 표현할 수 없는 형식까지 다루지만 보장은 없다는 것으로 정확한 서술임.`,
     ]},
   principle:"프리필은 시작만 고정함. 보장이 아님"});

  add("4.3", {ts:"4.3", lvl:"기초", scenario:"s6",
   q:`A contract-review pipeline must return exactly one of four risk labels per document, and downstream code switches on the exact string. The team is on current models and can use any API feature. Which mechanism most directly guarantees the label is always one of the four?`,
   opts:[
     {t:`A tool whose input schema declares the label as an enum of the four values, invoked with tool_choice forcing that tool.`, ok:true},
     {t:`A prompt line listing the four labels and asking the model to pick one of them.`},
     {t:`Prefilling the assistant turn with "Label: " so the label is the first thing produced.`},
     {t:`Post-processing that maps any unexpected string onto the nearest of the four by edit distance.`},
   ],
   explain:{
     good:`값의 집합이 닫혀 있으면 enum이 그 집합을 스키마 차원에서 확정함. tool_choice로 그 도구를 강제하면 대화 텍스트로 답이 나가는 경로까지 막힘.`,
     wrongs:[
       `<b>B(프롬프트 목록):</b> 목록을 제시하는 것은 요청이지 강제가 아님. 넷 밖의 문자열이 나올 경로가 남아 있음.`,
       `<b>C(프리필):</b> 라벨이 나올 <b>자리</b>만 고정함. 그 자리에 무슨 글자가 오는지는 고정하지 못함. 현행 모델에서는 마지막 턴 프리필 자체가 400이기도 함.`,
       `<b>D(편집 거리 보정):</b> 틀린 라벨을 드러나지 않게 다른 라벨로 바꾸는 방식이므로 사고를 감추는 설계임.`,
     ]},
   principle:"닫힌 집합은 enum으로 지정함"});

  /* ---------- ts 1.6 · 동적 분해 3문항 ---------- */

  add("1.6", {ts:"1.6", lvl:"실전", scenario:"s1",
   q:`A support-operations agent handles "my order never arrived" tickets. Every ticket goes through the same four steps — verify the order, check carrier status, apply the refund/reship policy, write the customer reply — and the policy step's branch table is fully written out in the runbook. A new engineer proposes rebuilding it as a dynamic-decomposition agent "so it can adapt to unusual tickets." What is the strongest response?`,
   opts:[
     {t:`Keep the fixed pipeline: the step list and its branches are known before any run, so nothing is decided by intermediate discovery — dynamic decomposition would add nondeterminism without adding capability, and genuine exceptions belong in an escalation path.`, ok:true},
     {t:`Adopt dynamic decomposition, since real tickets always contain surprises a fixed step list cannot anticipate.`},
     {t:`Keep the fixed pipeline, because dynamic decomposition is only appropriate for code-related tasks.`},
     {t:`Adopt a hybrid in which the agent re-plans after every step, which is strictly safer than either option.`},
   ],
   explain:{
     good:`분기표까지 런북에 다 적혀 있다는 것은 단계가 중간 발견에 의해 정해지지 않는다는 뜻임. 이럴 때는 고정 파이프라인이 맞고, 예외는 동적 분해가 아니라 에스컬레이션(escalation) 경로로 처리하는 것이 정석임.`,
     wrongs:[
       `<b>B(예외를 근거로 동적 전환):</b> 예외가 있다는 서술 자체는 맞으므로 오답 유도 선택지임. 예외 처리를 위해 워크플로 전체의 결정성을 버리는 것은 과잉 조치임.`,
       `<b>C(코드 전용 규칙):</b> 그런 규칙은 없음. 판별 기준은 도메인이 아니라 예측 가능성임.`,
       `<b>D(매 단계 재계획):</b> 더 안전한 것이 아니라 더 비싸고 재현성이 낮음. 같은 티켓이 매번 다른 경로를 거치면 감사에서 문제가 됨.`,
     ]},
   principle:"분기까지 적혀 있으면 고정 파이프라인"});

  add("1.6", {ts:"1.6", lvl:"실전", scenario:"s3",
   q:`A research coordinator receives: "assess whether our data-retention practices meet the new regulation." Nobody yet knows which systems store personal data. The coordinator writes a 12-item subtask list on day one and forbids any change to it "so the audit trail stays clean." Three days in, subagents have found two undocumented data stores that are not on the list. What went wrong, and what is the fix?`,
   opts:[
     {t:`The subtasks here are discovered rather than enumerable upfront, so the plan should be a living document that gains subtasks as stores are found — and the audit trail is preserved by recording each revision, not by freezing the list.`, ok:true},
     {t:`Nothing went wrong: the two stores should be logged as out of scope and handled in a follow-up engagement.`},
     {t:`The coordinator should have skipped planning entirely and let subagents explore freely, merging their findings at the end.`},
     {t:`The list should have been longer — a 40-item checklist derived line by line from the regulation would have covered the undocumented stores.`},
   ],
   explain:{
     good:`하위 작업의 개수를 시작 시점에 셀 수 없는 과제이므로 동적 분해임. 그리고 감사 추적은 계획을 고정해서가 아니라 개정 이력을 남겨서 확보함. 두 요구는 서로 충돌하지 않음.`,
     wrongs:[
       `<b>B(범위 밖 처리):</b> 규정 준수 평가에서 발견된 저장소를 범위 밖으로 미루면 결과물 자체가 무효가 됨.`,
       `<b>C(계획 폐기):</b> 계획을 쓰지 않는 것은 동적 분해가 아님. 동적 분해는 계획을 세우고 발견마다 고쳐 쓰는 방식임.`,
       `<b>D(목록 늘리기):</b> 문서에 없는 저장소는 규정 문서에서 유도할 수 없음. 길이의 문제가 아니라 종류의 문제임.`,
     ]},
   principle:"개수를 셀 수 없으면 동적 분해. 감사는 개정 이력으로 확보함"});

  add("1.6", {ts:"1.6", lvl:"기초", scenario:"s1",
   q:`Two workloads: (i) a nightly pass that runs the same three quality checks over every newly published help-center article, and (ii) a one-off task to find out why one specific customer's refund silently failed last Thursday. Which pairing of decomposition strategies is right?`,
   opts:[
     {t:`(i) fixed sequential pipeline; (ii) dynamic decomposition.`, ok:true},
     {t:`(i) dynamic decomposition; (ii) fixed sequential pipeline.`},
     {t:`Both fixed pipelines, since each workload states a clear goal before it starts.`},
     {t:`Both dynamic decomposition, since an agent should always be free to choose its own next step.`},
   ],
   explain:{
     good:`매번 같은 세 가지 검사를 한다는 것은 단계가 미리 확정된다는 뜻이므로 고정 파이프라인임. 원인을 모르는 단건 조사는 다음에 볼 곳이 직전 발견으로 정해지므로 동적 분해임.`,
     wrongs:[
       `<b>B(배정이 반대):</b> 반복 품질 검사에 동적 분해를 쓰면 글마다 검사 항목이 달라져 품질 기준 자체가 성립하지 않음.`,
       `<b>C(둘 다 고정):</b> 목표가 분명한 것과 단계가 예측 가능한 것은 다른 문제임. (ii)는 목표는 분명해도 경로를 모름.`,
       `<b>D(둘 다 동적):</b> 예측 가능한 워크플로에서 매번 모델이 경로를 정하게 하면 비용과 변동성만 늘어남.`,
     ]},
   principle:"예측 가능성으로 구분함"});
})();
