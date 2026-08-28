/* ============================================================
   gap-fix.js: 방법 선택형 출제 구간 보강 (2026-08-27)

   아래 세 영역은 "여러 방법 중 하나를 고르는" 형태로 출제되며,
   방법 사이의 차이를 모르면 정답률이 크게 떨어짐.
   기존 자료에는 선택지로 등장하는 방법 일부가 빠져 있었음.
     (1) D5 컨텍스트 창 최적화: 슬라이딩 윈도, 구조화 상태 객체가 없었음
     (2) D4 구조화 출력 방법 선택: 프리필이 없었음
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

  {type:"concept", kind:"CONCEPT · 개념 설명", h:"컨텍스트 창이 가득 찼을 때 무엇을 버릴 것인가",
   html:`<p class="lead">이 파트 Ch1(긴 대화에서 핵심 정보 보존)에서는 <strong>요약(summarization)</strong>과 <strong>선택적 보존(selective retention)</strong> 두 가지만 다뤘음. 시험은 네 방식을 나란히 놓고 "이 상황에는 무엇을 쓰는가"를 물음. 나머지 두 가지인 <strong>슬라이딩 윈도(sliding window)</strong>와 <strong>구조화 상태 객체(structured state object)</strong>를 여기서 0부터 설명함.</p>
    <div class="callout">📖 용어 카드. <b>컨텍스트 창(context window)</b>: 모델이 한 번의 요청에서 읽을 수 있는 글의 총량 한도. 한도가 있으므로 대화가 길어지면 <b>일부는 반드시 빠짐</b>. <b>턴(turn)</b>: 사용자 메시지 하나와 그에 대한 응답 하나, 즉 한 번의 주고받음. "최근 10턴"은 최근 열 번의 주고받음이라는 뜻임.</div>
    <p>네 방식은 모두 같은 질문에 답함. <strong>"무엇을 버리고 무엇을 남기는가."</strong> 그러므로 네 가지를 모두 같은 형식으로 정리함.</p>

    <h4>① 요약(summarization): 압축해서 남김</h4>
    <ul>
      <li><strong>하는 일</strong>: 오래된 부분을 모델에게 압축시켜 산문 몇 줄로 바꿔 넣음</li>
      <li><strong>버리는 것</strong>: 원문 전체. 특히 금액, 날짜, 주문번호 같은 <strong>정밀한 값</strong>이 먼저 손실됨</li>
      <li><strong>남기는 것</strong>: 무슨 내용이었는지에 대한 요지. 대화 <strong>전 기간</strong>이 얇게라도 흔적을 남김</li>
      <li><strong>대가</strong>: 압축하려면 모델을 한 번 더 호출해야 함. 토큰 비용과 지연이 추가됨</li>
      <li><strong>실물</strong>: 앞 30턴을 "고객이 파손 상품 환불 요청, 사진 확인됨, 처리 협의 중" 세 줄로 바꿈</li>
    </ul>

    <h4>② 슬라이딩 윈도(sliding window): 통째로 버림</h4>
    <ul>
      <li><strong>이름의 뜻</strong>: 창(window)이 대화를 따라 앞으로 이동함(sliding). 창 안에는 항상 <strong>최근 N턴</strong>만 있고, 창 뒤로 밀려난 턴은 <strong>삭제됨</strong></li>
      <li><strong>버리는 것</strong>: 창 밖의 턴 <strong>전부</strong>. 요약조차 남지 않음</li>
      <li><strong>남기는 것</strong>: 창 안 N턴의 <strong>원문 그대로</strong>. 글자 하나 바뀌지 않음</li>
      <li><strong>대가</strong>: 거의 없음. 추가 모델 호출이 없으므로 비용과 지연이 붙지 않고, 구현은 배열 뒤에서 N개를 자르는 한 줄임</li>
      <li><strong>정확도 특성</strong>: 창 안은 100% 정확, 창 밖은 0%. 요약처럼 전체가 흐려지는 것이 아니라 <strong>남거나 없거나 둘 중 하나임</strong></li>
    </ul>
    <div style="font-family:ui-monospace,Menlo,monospace;font-size:12.5px;line-height:2;background:var(--code-bg);border:1px solid var(--line);border-radius:10px;padding:14px 18px;margin:14px 0;overflow-x:auto"><b>N=10 슬라이딩 윈도, 41번째 턴 시점</b><br>
턴 1 ~ 턴 31&nbsp;&nbsp;&nbsp;<span style="color:var(--dim)">…… 존재하지 않는 것과 같음 (요약도 없음)</span><br>
턴 32 ~ 턴 41&nbsp;&nbsp;<span style="color:var(--accent)">←← 창 안. 원문 그대로, 글자 하나 바뀌지 않음</span><br>
<br>
42번째 턴이 오면 → 창이 한 칸 이동함 → 턴 32가 창 밖으로 밀려나 삭제됨
    </div>

    <h4>③ 구조화 상태 객체(structured state object): 정해진 필드에 담아 유지함</h4>
    <ul>
      <li><strong>이름의 뜻</strong>: 대화를 문장으로 들고 가는 대신, <strong>필드(field)가 미리 정해진 데이터 한 묶음</strong>으로 들고 가는 방식임. 매 턴 그 묶음을 갱신하고, 매 턴 프롬프트에 통째로 다시 넣음</li>
      <li><strong>버리는 것</strong>: 자연어 대화 자체(표현, 뉘앙스, 그렇게 결정된 경위)</li>
      <li><strong>남기는 것</strong>: 정해 둔 필드의 값. <strong>글자 그대로</strong> 남고, <strong>어디에 속한 값인지까지</strong> 유지됨(금액이 어느 주문의 값인지가 필드로 묶여 있음)</li>
      <li><strong>크기 특성</strong>: 턴이 100개가 되어도 객체 크기는 <strong>필드 수만큼</strong>임. 요약처럼 늘었다 줄었다 하지 않고 <strong>상한이 있음</strong></li>
      <li><strong>대가</strong>: 스키마(schema)에 필드가 없는 정보는 <strong>담을 방법이 없음</strong>. 무엇이 중요할지 미리 알아야 쓸 수 있음</li>
    </ul>
    <div style="font-family:ui-monospace,Menlo,monospace;font-size:12.5px;line-height:2;background:var(--code-bg);border:1px solid var(--line);border-radius:10px;padding:14px 18px;margin:14px 0;overflow-x:auto"><b>구조화 상태 객체의 실물. 매 턴 이 객체를 갱신해서 프롬프트에 넣음</b><br>
{<br>
&nbsp;&nbsp;"order_id": "A-1042",&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:var(--accent)">← 필드가 미리 정해져 있음</span><br>
&nbsp;&nbsp;"refund_amount": 847.50,<br>
&nbsp;&nbsp;"deadline": "2026-03-15",<br>
&nbsp;&nbsp;"status": "awaiting_approval",<br>
&nbsp;&nbsp;"agreed_actions": ["원 결제수단으로 환불", "배송비 면제"],<br>
&nbsp;&nbsp;"constraints": ["결제 모듈은 건드리지 말 것"]<br>
}<br>
<span style="color:var(--accent)">→ 200턴 뒤에도 847.50이 847.50 그대로이고, 그 값이 A-1042의 것이라는 사실이 필드로 묶여 있음</span>
    </div>

    <h4>④ 선택적 보존(selective retention): 골라서 원문으로 남김</h4>
    <ul>
      <li><strong>하는 일</strong>: 턴마다 지킬 것과 버릴 것을 <strong>판정</strong>해서, 지킬 것만 원문 그대로 남기고 나머지는 버리거나 요약함</li>
      <li><strong>버리는 것</strong>: 낮은 중요도 판정을 받은 내용</li>
      <li><strong>남기는 것</strong>: 판정을 통과한 내용. <strong>원문 그대로</strong> 남음(③과 달리 미리 필드를 정해 두지 않아도 됨)</li>
      <li><strong>대가</strong>: 판정 규칙을 직접 작성해야 하고, 판정이 틀리면 그 내용이 <strong>드러나지 않게 손실됨</strong>. 매 턴 판정을 실행하면 그 비용도 추가됨</li>
      <li><strong>실물 규칙</strong>: "고객이 말한 조건, 합의 사항, 숫자가 든 문장은 원문 유지. 인사말과 확인 응답은 폐기"</li>
    </ul>
    <div class="callout">💡 ③과 ④의 차이. <b>③은 필드를 먼저 정하고 값을 채우는 방식</b>이고, <b>④는 원문 단위로 남길지 말지 고르는 방식</b>임. 지킬 항목의 목록을 미리 적을 수 있으면 ③이 유리하고, 미리 적을 수 없으면 ④를 씀.</div>`},

  {type:"concept", kind:"TOPIC · 주제 설명", h:"네 방법 비교: 어느 상황에 맞고 어느 상황에 치명적인가",
   html:`<p class="lead">시험에서 갈리는 지점은 정의가 아니라 <strong>상황 매칭</strong>임. 표를 먼저 보고 판별 순서를 익힐 것.</p>
    <table>
      <tr><th>방법</th><th>버리는 것</th><th>남기는 것</th><th>크기 변화</th><th>추가 비용·지연</th><th>이럴 때 맞음</th><th>이럴 때 치명적</th></tr>
      <tr>
        <td><strong>요약</strong><br>summarization</td>
        <td>원문 · 정밀한 값</td>
        <td>전 기간의 요지 (흐릿하게)</td>
        <td>압축할 때마다 줄었다 다시 늘어남</td>
        <td>있음 (압축용 모델 호출)</td>
        <td>대화의 <strong>흐름과 경위</strong>가 필요할 때. 오래된 내용도 "무슨 일이었는지"는 알아야 할 때</td>
        <td>금액·날짜·번호를 <strong>정확히</strong> 지켜야 할 때. 손실 압축이므로 숫자부터 값이 흐려짐</td>
      </tr>
      <tr>
        <td><strong>슬라이딩 윈도</strong><br>sliding window</td>
        <td>창 밖 턴 전부 (흔적 없음)</td>
        <td>최근 N턴 원문 그대로</td>
        <td>상한 고정 (항상 N턴)</td>
        <td>없음 (배열 자르기)</td>
        <td>오래된 내용이 <strong>정말 필요 없다는 근거</strong>가 있고, 추가 호출을 얹을 수 없을 때</td>
        <td>초반에 정한 <strong>제약과 합의</strong>가 끝까지 지켜져야 할 때. 창 밖으로 나가면 복구 불가</td>
      </tr>
      <tr>
        <td><strong>구조화 상태 객체</strong><br>structured state object</td>
        <td>대화의 표현 · 경위</td>
        <td>정해진 필드의 값 (소속 유지)</td>
        <td>거의 일정 (턴 수와 무관)</td>
        <td>작음 (값 추출과 갱신)</td>
        <td>지켜야 할 항목이 <strong>미리 확정</strong>돼 있을 때 (주문·예약·티켓·심사 항목)</td>
        <td>무엇이 중요할지 <strong>미리 모르는</strong> 열린 조사. 필드에 없는 값은 담을 방법이 없음</td>
      </tr>
      <tr>
        <td><strong>선택적 보존</strong><br>selective retention</td>
        <td>저중요 판정분</td>
        <td>고중요 판정분 (원문 그대로)</td>
        <td>규칙에 따라 달라짐 (잘못 쓰면 계속 커짐)</td>
        <td>판정 비용 (매 턴 실행하면 지연이 크게 늘어남)</td>
        <td>중요와 비중요가 <strong>규칙으로 갈리지만</strong> 필드까지는 정할 수 없을 때</td>
        <td>판정 기준을 세울 수 없을 때. 지금 중요해 보이지 않는 값이 나중에 중요해지는 과제</td>
      </tr>
    </table>

    <h4>혼동하기 쉬운 두 쌍</h4>
    <ul>
      <li><strong>요약과 슬라이딩 윈도</strong>: 둘 다 오래된 내용을 처리하지만 방향이 반대임. 요약은 <strong>압축해서 남기고</strong>, 윈도는 <strong>통째로 버림</strong>. 정확도는 윈도가 높고(창 안은 100%), 다루는 범위는 요약이 넓음(전 기간이 얇게라도 남음)</li>
      <li><strong>구조화 상태 객체와 선택적 보존</strong>: 둘 다 골라서 남기는 방식이지만, 앞은 <strong>필드 단위</strong>이고 뒤는 <strong>원문 단위</strong>임. 미리 필드를 적을 수 있으면 앞이 유리함. 값이 서로 섞이지 않고 크기에 상한이 생기기 때문임</li>
    </ul>

    <h4>판별 순서: 이 세 가지를 차례로 확인함</h4>
    <ul>
      <li><strong>1. 글자 그대로 살아야 하는 값이 있는가?</strong> → 있으면 <strong>요약 단독은 탈락</strong>임. 여기서 오답 하나가 지워짐</li>
      <li><strong>2. 그 값들의 목록을 미리 적을 수 있는가?</strong> → 적을 수 있으면 <strong>구조화 상태 객체</strong>, 적을 수 없으면 <strong>선택적 보존</strong></li>
      <li><strong>3. 오래된 내용이 정말 필요 없는가?</strong> → 근거가 있으면 <strong>슬라이딩 윈도</strong>. 비용이 가장 적고 구조가 가장 단순하며 창 안 정확도는 100%임</li>
    </ul>

    <h4>실전 정답은 조합인 경우가 많음</h4>
    <ul>
      <li>Ch1의 <strong>case facts 블록</strong>(매 턴 프롬프트에 다시 넣는 거래 사실 블록)이 조합의 예시임. 거래 사실은 <strong>구조화 상태 객체</strong>로 요약 대상에서 제외하고, 나머지 대화는 <strong>요약</strong>에 맡기는 형태임</li>
      <li>또 다른 조합: 대화는 <strong>슬라이딩 윈도</strong>로 가볍게 유지하고, 인용이나 제약처럼 반드시 살아야 하는 내용만 <strong>덧붙임 전용 블록</strong>으로 매 턴 다시 넣음</li>
      <li>선택지에 조합형이 있으면 단일 방법보다 먼저 검토할 것. 지문의 요구가 둘 이상이면 정답도 조합인 경우가 많음</li>
    </ul>
    <div class="callout">🎯 항상 오답인 선택지 세 가지. ① <b>"컨텍스트 창이 더 큰 모델로 교체"</b>: 시점을 미룰 뿐 규칙을 정하지 않은 조치이므로 언젠가 같은 지점에 다시 도달함. ② <b>"요약을 더 자주 또는 더 짧게"</b>: 손실 압축이라는 성질은 그대로이므로 빈도만 늘리면 손실이 더 자주 발생함. ③ <b>"프롬프트에 잊지 말라고 지시"</b>: 이미 컨텍스트에서 빠진 내용은 지시로 복구되지 않음.</div>`},

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
{ id:"p4c7", ch:"CH 7", title:"구조화 출력: 세 방법의 선택",
  steps:[

  {type:"concept", kind:"CONCEPT · 개념 설명", h:"형식을 강제하는 세 갈래와 각각이 강제하는 범위",
   html:`<p class="lead">이 파트 Ch3(tool_use와 JSON 스키마로 출력 강제)에서 <strong>tool use와 JSON 스키마</strong>는 다뤘음. 시험은 여기에 두 갈래를 더 붙여 셋 중 하나를 고르게 함. 나머지 둘이 <strong>프롬프트로 형식 지시</strong>와 <strong>프리필(prefill)</strong>임.</p>
    <div class="callout">📖 용어 카드. <b>구조화 출력(structured output)</b>: 사람이 읽는 문장이 아니라 <b>코드가 바로 읽을 수 있는 형태</b>(주로 JSON)로 답을 받는 것. <b>파싱(parsing)</b>: 그 답을 코드가 데이터로 쪼개 읽는 작업. 형식이 어긋나면 파싱이 실패하고 뒤 단계 전체가 멈춤.</div>

    <h4>① tool use와 JSON 스키마: 출력 양식을 지정함</h4>
    <ul>
      <li><strong>하는 일</strong>: 추출용 도구를 정의하고 그 도구의 입력 스키마로 출력 형태를 지정함. 모델은 그 도구를 호출하는 형태로 답하고, 그 호출의 입력값을 데이터로 꺼내 씀</li>
      <li><strong>강제하는 범위</strong>: 출력 <strong>객체 전체</strong>. 어떤 필드가 있고 각 필드가 무슨 타입인지까지 지정됨</li>
      <li><strong>남는 문제</strong>: <strong>의미 오류</strong>는 막지 못함(합계 불일치, 값이 엉뚱한 필드에 들어감). 그 문제는 Ch4(검증·재시도·피드백 루프)가 다룸</li>
      <li><strong>더 강한 변형</strong>: 공식 <strong>Structured outputs</strong> 기능이 두 갈래를 제공함. <code>strict: true</code>로 도구 이름과 입력의 스키마 검증을 보장하는 <strong>strict tool use</strong>, 그리고 도구 없이 응답 자체를 스키마에 맞춘 JSON으로 받는 <strong>JSON outputs</strong>(<code>output_config.format</code>)임. 다만 <strong>지원 모델 목록</strong>이 정해져 있음</li>
    </ul>

    <h4>② 프롬프트로 형식 지시: 문장으로 요청함</h4>
    <ul>
      <li><strong>하는 일</strong>: "JSON만 반환할 것. 설명 문장 금지. 키는 다음 11개" 같은 <strong>문장</strong>을 프롬프트에 씀</li>
      <li><strong>강제하는 범위</strong>: <strong>없음</strong>. 이것은 강제가 아니라 요청이며 확률적으로 지켜짐</li>
      <li><strong>대표적 실패 형태</strong>: 앞에 붙는 서두("Here is the JSON:"), 코드 펜스, 끝에 붙는 설명 한 줄, 키 이름의 미묘한 변형</li>
      <li><strong>대신 얻는 것</strong>: 비용이 가장 적고 <strong>형식 자유도가 가장 높음</strong>. 마크다운 표, YAML, 특정 문체처럼 JSON 스키마로 표현할 수 없는 형식까지 지시할 수 있음</li>
      <li><strong>공식 안내</strong>: 최근 모델은 구조를 지키라고 <strong>지시하면</strong> 복잡한 스키마도 상당히 잘 따른다고 안내돼 있음. 특히 재시도와 함께 쓸 때 그러함. 그래도 <strong>보장은 아님</strong></li>
    </ul>

    <h4>③ 프리필(prefill): 응답의 첫 부분을 미리 작성함</h4>
    <ul>
      <li><strong>0부터</strong>: API로 보내는 <code>messages</code> 배열은 보통 <code>user</code> 메시지로 끝남. 그런데 <strong>마지막 메시지를 <code>assistant</code> 역할로 두고 내용을 조금 적어 두면</strong>, 모델의 응답이 <strong>그 지점에서 이어져</strong> 시작됨. 이것이 프리필임</li>
      <li><strong>실물</strong>: <code>messages</code> 마지막에 <code>{"role":"assistant","content":"{"}</code> 를 넣으면 모델은 여는 중괄호 다음부터 씀. 서두 문장이 들어갈 <strong>자리 자체가 없어짐</strong></li>
      <li><strong>주의</strong>: 응답에는 <strong>이어지는 부분만</strong> 담김. 미리 넣은 조각은 응답 본문에 다시 담기지 않으므로, 파싱하려면 앞에 직접 붙여야 함</li>
      <li><strong>강제하는 범위</strong>: <strong>시작 지점만</strong>임. 끝은 고정되지 않으므로 닫는 괄호를 빠뜨리거나 JSON 뒤에 다른 문장이 붙을 수 있음</li>
      <li><strong>비용</strong>: 토큰 몇 개 수준으로 거의 들지 않음</li>
    </ul>
    <div class="callout">⚠️ <b>여기가 실전에서 갈리는 지점임.</b> 프리필은 <b>모델 지원에 제한이 있음</b>. Claude 4.6 계열 모델과 Claude Mythos Preview부터는 <b>마지막 assistant 턴의 프리필이 지원되지 않고</b>, 그런 요청은 <b>400 에러</b>로 실패함. 그 이전 세대 모델은 계속 지원함. 그리고 <b>대화 중간</b>에 들어 있는 assistant 메시지(이전 턴의 실제 응답 기록 등)는 이 제한과 무관하며 영향을 받지 않음.</div>
    <ul>
      <li><strong>형식 강제 용도의 프리필을 대체하는 방법</strong>: 공식 안내는 <strong>Structured outputs</strong>로 옮기라고 함. 분류 작업이면 <strong>허용 라벨을 enum으로 가진 도구</strong>나 구조화 출력을 쓰라고 명시돼 있음</li>
      <li><strong>서두 제거 용도의 프리필을 대체하는 방법</strong>: 시스템 프롬프트에 직접 지시하거나, XML 태그 안에 출력시키거나, 후처리로 잘라내라고 안내돼 있음</li>
    </ul>`},

  {type:"concept", kind:"TOPIC · 주제 설명", h:"세 방법 비교: 강제력, 비용, 유연성, 모델 지원",
   html:`<p class="lead">시험은 "이 상황에는 무엇을 쓰는가"를 물음. 네 가지 기준(강제력, 비용, 유연성, 모델 지원)으로 나누면 대부분 한 줄로 정리됨.</p>
    <table>
      <tr><th>방법</th><th>무엇을 강제하나</th><th>강제력</th><th>추가 비용</th><th>형식 유연성</th><th>모델 지원</th><th>대표 용도</th></tr>
      <tr>
        <td><strong>tool use와 JSON 스키마</strong></td>
        <td>출력 객체 <strong>전체</strong>의 형태 (필드·타입·필수 여부)</td>
        <td><strong>강함</strong> (strict면 스키마 준수 보장)</td>
        <td>도구 정의 토큰</td>
        <td>낮음 (JSON으로 표현되는 구조에 한정)</td>
        <td>현행 모델 전반 (strict와 JSON outputs는 지원 모델 목록 확인)</td>
        <td>추출·분류·사람 검수 없는 자동 적재</td>
      </tr>
      <tr>
        <td><strong>프롬프트로 형식 지시</strong></td>
        <td>강제 없음. <strong>요청</strong>일 뿐임</td>
        <td><strong>약함</strong> (확률적, 서두·코드 펜스·꼬리말이 붙음)</td>
        <td>거의 0</td>
        <td><strong>가장 높음</strong> (마크다운·YAML·문체까지)</td>
        <td>전 모델</td>
        <td>사람이 읽는 산출물, JSON이 아닌 형식</td>
      </tr>
      <tr>
        <td><strong>프리필</strong><br>prefill</td>
        <td>응답의 <strong>시작 지점</strong>만</td>
        <td><strong>중간</strong> (시작은 확실히 고정하지만 끝은 고정하지 못함)</td>
        <td>거의 0 (토큰 몇 개)</td>
        <td>높음 (어떤 형식이든 시작을 고정)</td>
        <td><strong>제한 있음.</strong> 4.6 계열과 Mythos Preview는 마지막 assistant 턴 프리필 불가 (400). 이전 세대는 지원</td>
        <td>이전 세대 모델에서 서두 제거와 형식 시작 고정</td>
      </tr>
    </table>

    <h4>선택 기준: 이 네 가지를 순서대로 확인함</h4>
    <ul>
      <li><strong>1. 다운스트림 코드가 사람 손 없이 바로 파싱하는가?</strong> → 그렇다면 <strong>tool use와 스키마</strong>(또는 구조화 출력의 JSON outputs). 강제력이 가장 높은 쪽을 선택함</li>
      <li><strong>2. 목표 형식이 JSON이 아닌가?</strong> (마크다운 보고서, 특정 문체, 자유 구조) → <strong>프롬프트 지시</strong>가 유일하게 가능한 방법임. 대신 Ch4의 검증 루프와 함께 씀</li>
      <li><strong>3. 문제가 형식 자체가 아니라 앞에 붙는 서두 한 줄인가?</strong> → 이전에는 프리필이 정답이었음. 현재는 시스템 프롬프트 직접 지시, XML 태그 안 출력, 후처리 제거가 공식 대체안임</li>
      <li><strong>4. 코드에 프리필이 이미 들어 있고 최신 모델로 올리는 중인가?</strong> → 그 요청은 400으로 실패함. 업그레이드 전에 반드시 제거해야 하는 마이그레이션 대상임</li>
    </ul>

    <h4>제약이 후보를 먼저 지움</h4>
    <ul>
      <li>실전 지문은 <strong>쓸 수 없는 것</strong>을 조건으로 제시함. 게이트웨이가 <code>tools</code>를 잘라낸다, 규제 때문에 모델이 고정돼 있다, 요청 형태를 바꿀 수 없다 같은 문장임</li>
      <li>그러면 일반적으로 가장 강한 방법이 정답이 아니게 됨. <strong>후보를 먼저 지우고 남은 것 중에서 강제력을 비교하는</strong> 순서로 풀 것</li>
    </ul>
    <div class="callout">🎯 출제 포인트. <b>"프리필이 JSON 강제의 가장 확실한 방법"</b>이라는 선택지는 두 군데에서 틀림. ① 시작만 고정하고 <b>끝은 고정하지 못함</b>(닫는 괄호 뒤는 여전히 자유임). ② 최신 모델 세대에서는 <b>지원 자체가 중단됨</b>.</div>`},

  {type:"concept", kind:"CONCEPT · 확인 노트", h:"이 챕터가 근거로 삼은 공식 문서",
   html:`<p class="lead">프리필은 최근에 동작이 바뀐 항목이므로, 아래 세 문서를 직접 열어 확인한 내용만 반영함 (확인일 2026-08-27).</p>
    <h4>① Messages API: 프리필의 메커니즘</h4>
    <ul>
      <li><code>platform.claude.com/docs/en/api/messages</code></li>
      <li>원문: <em>"If the final message uses the <code>assistant</code> role, the response content will continue immediately from the content in that message. This can be used to constrain part of the model's response."</em></li>
      <li>여기서 확인한 것: 프리필은 <strong>마지막 메시지를 assistant 역할로 두는 것</strong>이고, 응답은 그 내용에서 <strong>이어서</strong> 온다는 것</li>
    </ul>
    <h4>② Prompting best practices: Migrating away from prefilled responses</h4>
    <ul>
      <li><code>platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices#migrating-away-from-prefilled-responses</code></li>
      <li>여기서 확인한 것: <strong>Claude 4.6 계열 모델과 Claude Mythos Preview부터 마지막 assistant 턴의 프리필이 지원되지 않고, 해당 요청은 400 에러</strong>라는 것. <strong>이전 모델은 계속 지원</strong>하고, <strong>대화 중간의 assistant 메시지는 영향이 없다</strong>는 것</li>
      <li>용도별 대체안도 이 문서에 있음. 형식 강제는 구조화 출력으로, 분류는 enum 도구로, 서두 제거는 직접 지시·XML 태그·후처리로, 이어쓰기는 user 메시지로 옮겨 재요청함</li>
    </ul>
    <h4>③ Structured outputs</h4>
    <ul>
      <li><code>platform.claude.com/docs/en/build-with-claude/structured-outputs</code></li>
      <li>여기서 확인한 것: 두 기능으로 나뉜다는 것. <strong>JSON outputs</strong>(<code>output_config.format</code>)와 <strong>strict tool use</strong>(<code>strict: true</code>)임. 그리고 <strong>지원 모델 목록이 명시</strong>돼 있어서 오래된 모델에 고정된 상황에서는 쓸 수 없다는 것</li>
    </ul>
    <div class="callout">📌 문항에서 사실로 쓰는 내용은 세 가지임. 프리필의 메커니즘, 4.6 계열 이후의 400 제한과 그 적용 범위(마지막 턴에만), 구조화 출력이 공식 대체 경로라는 것. 그 밖의 세부 동작은 문서에서 확인되지 않아 문항에 넣지 않았음.</div>`},

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
   q:`A regulated client runs an on-prem gateway pinned to an older Claude model generation for the next two quarters, and the gateway strips the tools field from every outbound request. Their classifier has exactly one defect: roughly 7% of responses open with "Sure! Here is the classification:" before the JSON, which breaks a strict parser. Changing the model or the gateway is out of scope this quarter. What is the most direct fix available to them?`,
   opts:[
     {t:`Prefill the assistant turn with the opening of the expected output, so the response continues from that point and there is no position where a preamble could appear — this model generation still supports it.`, ok:true},
     {t:`Move the extraction to tool use with a JSON schema, the most reliable structured-output mechanism available.`},
     {t:`Enable structured outputs so the API constrains the response to the schema.`},
     {t:`Add "do not include any preamble" to the system prompt and retry any response that fails to parse.`}],
   hint:`쓸 수 없는 것부터 지울 것. 게이트웨이가 무엇을 잘라내는지, 고정된 모델 세대가 무엇을 지원하는지 두 조건이 선택지 둘을 지움. 남은 둘 중 서두가 들어갈 자리 자체를 없애는 것이 무엇인지 확인할 것.`,
   explain:{
     good:`도구를 쓸 수 없고 모델 세대가 고정된 조건에서 프리필은 여전히 유효함. 이전 세대 모델은 프리필을 계속 지원하고, 응답이 프리필 지점에서 이어지므로 서두가 들어갈 자리가 없어짐. 미지원은 4.6 계열과 Mythos Preview에 해당하는 내용임.`,
     wrongs:[
       `<b>B(tool use):</b> 일반론으로는 가장 강한 방법이 맞으므로 오답 유도 선택지임. 게이트웨이가 tools를 잘라내므로 이번 분기에는 사용할 수 없음.`,
       `<b>C(구조화 출력):</b> 지원 모델 목록이 정해져 있는 기능임. 고정된 이전 세대 모델과 모델 변경 불가라는 조건에 정면으로 부딪힘.`,
       `<b>D(지시와 재시도):</b> 확률을 낮출 뿐 7%를 0%로 만들지 못하고, 재시도만큼 비용과 지연이 추가됨.`,
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
       `<b>B:</b> 형식 강제 용도의 프리필은 구조화 출력이나 스키마 도구로 옮기라는 것이 공식 안내 그대로임.`,
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
  {type:"concept", kind:"TOPIC · 주제 설명", h:"판별 신호: 고정 순서인가, 발견에 따라 늘어나는가",
   html:`<p class="lead">두 방식의 정의는 앞에서 다뤘음. 실전에서 틀리는 지점은 정의가 아니라 <strong>판정</strong>임. 어느 쪽인지 알아보는 신호를 양쪽으로 정리함.</p>

    <h4>고정 순서(prompt chaining)가 옳다는 신호</h4>
    <ul>
      <li>시작 전에 <strong>단계 목록을 모두 적을 수 있음</strong>. 몇 개인지 셀 수 있음</li>
      <li>건마다 <strong>같은 단계</strong>를 밟음. 순서가 건별로 바뀌지 않음</li>
      <li>한 단계의 결과가 다음 단계의 <strong>존재 여부를 바꾸지 않음</strong>. 값만 바꿈</li>
      <li>감사와 재현성이 요구됨. 같은 입력이면 같은 경로를 거쳐야 함</li>
    </ul>

    <h4>동적 분해(dynamic decomposition)가 필요하다는 신호</h4>
    <ul>
      <li>시작 시점에 <strong>하위 작업의 개수를 셀 수 없음</strong></li>
      <li>중간 발견이 <strong>새 하위 작업을 만들어냄</strong>. 의존성을 발견하면 그것도 처리해야 하는 형태임</li>
      <li>무엇을 조사할지가 <strong>조사 결과에 달려 있음</strong></li>
      <li>계획을 세워도 <strong>첫 발견에서 계획을 고쳐야 함</strong></li>
    </ul>

    <h4>혼동하기 쉬운 지점 세 가지</h4>
    <ul>
      <li><strong>반복은 동적 분해가 아님.</strong> 파일 14개를 같은 절차로 처리하는 것은 <strong>개수</strong>가 늘 뿐 <strong>단계</strong>가 바뀌지 않으므로 고정 순서임. 건수가 많다는 것은 병렬화의 근거이지 동적 분해의 근거가 아님</li>
      <li><strong>조건 분기가 있다고 동적 분해가 되지 않음.</strong> if/else가 런북에 <strong>미리 다 적혀 있으면</strong> 여전히 고정 파이프라인임. 분기의 존재가 아니라 <strong>분기표를 미리 쓸 수 있는가</strong>가 기준임</li>
      <li><strong>동적 분해는 계획이 없다는 뜻이 아님.</strong> 계획을 세우되 <strong>발견마다 고쳐 쓰는 것</strong>이 동적 분해임. 계획 없이 바로 착수하는 것은 즉흥 처리이며 시험에서는 오답임</li>
    </ul>

    <h4>혼합형: 실전 정답이 이 형태인 경우가 많음</h4>
    <ul>
      <li><strong>바깥은 동적</strong>(무엇을 볼지 발견으로 결정)이고 <strong>안쪽 각 조사 단위는 고정 순서</strong>(대상이 정해지면 매번 같은 절차)임</li>
      <li>예: "결제 실패 원인 조사"에서 어느 서비스를 열지는 발견이 정하고, 서비스 하나를 열면 로그 → 설정 → 최근 배포 순서는 항상 같음</li>
    </ul>
    <div class="callout">🎯 항상 오답인 선택지 세 가지. 어느 쪽이 정답이든 <b>이 셋은 항상 틀림</b>. ① <b>"알파벳이나 디렉토리 순서로 순회"</b>: 탐색도 계획도 없는 기계적 순서임. ② <b>"한 번에 통째로 처리"</b>: 주의가 분산되어 일부 대상이 부실하게 처리됨. ③ <b>"더 큰 컨텍스트 창이나 더 큰 모델로 해결"</b>: 분해가 필요한 이유는 분량이 아니라 주의 배분과 순서이므로 문제가 그대로 남음.</div>`},

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

  /* ---------- ts 4.3 · 구조화 출력 방법 선택 4문항 ---------- */

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
   q:`A team must ship a classifier this week under two hard constraints: their proxy strips the tools field from every request, and they are pinned to a pre-4.6 Claude model for the quarter. Two failure modes: preamble text before the label, and occasional labels outside the allowed set. Which TWO measures are actually available to them and address those failures? (Select TWO.)`,
   opts:[
     {t:`Prefill the assistant turn with the opening of the expected output, which this model generation supports and which leaves no position for a preamble.`, ok:true},
     {t:`Enumerate the allowed labels explicitly in the prompt and reject-and-retry any response whose label falls outside that set.`, ok:true},
     {t:`Define a tool whose schema declares the allowed labels as an enum, and force it with tool_choice.`},
     {t:`Enable structured outputs with a JSON schema so the API constrains the response.`},
     {t:`Raise max_tokens so the model has room to finish the label without truncation.`},
   ],
   explain:{
     good:`제약 두 줄이 후보를 먼저 지움. 도구가 잘리므로 enum 스키마도 tool_choice도 쓸 수 없고, 구조화 출력은 지원 모델 목록에 걸림. 남는 것은 프리필(서두 제거)과 허용 목록 및 검증 재시도(범위 이탈 처리)임.`,
     wrongs:[
       `<b>C(enum 도구):</b> 닫힌 라벨 집합에는 enum 도구가 정석이 맞으므로 오답 유도 선택지임. 프록시가 tools를 잘라내므로 이번 분기에는 사용할 수 없음.`,
       `<b>D(구조화 출력):</b> 지원 모델이 정해져 있는 기능인데, 이번 분기에 모델을 바꿀 수 없다는 것이 지문의 조건임.`,
       `<b>E(max_tokens):</b> 잘림만 막음. 서두가 붙는 것도, 라벨이 집합을 벗어나는 것도 토큰 수와 무관함.`,
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
