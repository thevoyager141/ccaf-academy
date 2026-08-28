/* ============================================================
   OPEN-P1: D1(파트 1) 오프닝 레슨 + 이유 카드 + 용어 보강
   로드 순서: part1.js · part1-test.js · appendix.js (· gap-fix.js) 뒤
   기존 배열 원소는 건드리지 않고 추가·보강만 함
   ============================================================ */
(function(){
  var C = window.CCAF_CONTENT, A = window.CCAF_APPENDIX;
  if(!C || !C.p1 || !Array.isArray(C.p1.lessons)) return;
  var P1 = C.p1;

  /* ============================================================
     (1) 오프닝 레슨 p1c0: 맨 앞에 삽입 (중복 삽입 가드)
     ============================================================ */
  var BRIEF = {
    title:"SCENARIO ③ · MULTI-AGENT RESEARCH SYSTEM",
    body:`Northwind Analytics runs a multi-agent research system built on the Claude Agent SDK. A coordinator agent receives each research request, delegates to three specialist subagents — web search, document analysis, and synthesis — and assembles a sourced report. Every subagent call goes through the coordinator; the subagents never message each other directly. Analysts open a research session in the morning and keep working inside that same session all day, often returning to it after lunch. Since the last release the team has logged three complaints. Some runs never finish and keep spending tokens until an operator kills them at the 40-iteration cap. A simple two-source question takes as long and costs as much as a full market survey. And reports sometimes quote figures from a competitor list that the data team replaced days ago. The system opens to paying customers in four weeks.`
  };

  if(!P1.lessons.some(function(l){ return l && l.id === "p1c0"; })){
    P1.lessons.unshift({ id:"p1c0", ch:"OPEN", title:"D1은 시험에서 이렇게 출제됨", steps:[

    /* ---------- ① 실전 형태 예고 ---------- */
    {type:"concept", kind:"PART BRIEFING · 파트 설명", h:"시험지의 형태부터 확인함",
     html:`<p class="lead">이 파트가 <strong>D1 · 에이전트 아키텍처 &amp; 오케스트레이션</strong>임. 다섯 도메인 중 출제 비중이 가장 큼.</p>
      <h4>출제 규모</h4>
      <ul>
        <li>출제 비중 <strong>27%</strong>. 전체 65문항 기준 <strong>약 16문항</strong>임</li>
        <li>비중이 가장 크므로 이 파트에서 실점하면 다른 파트로 만회하기 어려움</li>
      </ul>
      <h4>문제가 출제되는 형태</h4>
      <ul>
        <li>단독 문항이 흩어져 나오지 않음. <strong>상황 브리핑 하나 아래에 문항 여러 개</strong>가 묶여 출제됨</li>
        <li>브리핑은 대여섯 문장 분량의 영어 상황 설명임. 시스템 구성, 증상, 제약이 모두 여기에 들어 있음</li>
        <li>문항들은 같은 상황을 <strong>서로 다른 관점</strong>으로 물음. 하나는 루프, 하나는 위임, 하나는 세션을 묻는 방식임</li>
        <li>따라서 브리핑을 한 번 읽고 <strong>메모로 처리하는 것</strong>이 실전 기술임. 문항마다 다시 읽으면 시간이 부족함</li>
      </ul>
      <h4>D1이 주로 출제되는 시나리오 둘</h4>
      <ul>
        <li><strong>멀티에이전트 리서치 시스템</strong>: 코디네이터(coordinator)가 검색·분석·종합 담당에게 작업을 나눠 주는 구조임</li>
        <li><strong>고객지원 해결 에이전트</strong>: 환불과 계정 처리를 스스로 하다가 사람에게 넘겨야 할 시점을 판단하는 구조임</li>
      </ul>
      <div class="callout">🎯 다음 네 스텝은 <b>실전과 같은 형태</b>임. 브리핑 하나와 그 아래 문항 셋. 문제를 풀기 전에 브리핑 읽는 방법을 먼저 정리함.</div>`},

    /* ---------- ② 시나리오 블록: 브리핑 읽는 법 ---------- */
    {type:"concept", brief:BRIEF, kind:"TOPIC · 주제 설명", h:"브리핑 읽는 법: 확인할 네 지점",
     html:`<p class="lead">위 회색 박스가 브리핑임. 실전에서는 이것이 문항 위에 붙어 있고 <strong>다음 문항으로 넘어가도 사라지지 않음</strong>. 다음 세 스텝에서도 그대로 유지됨.</p>
      <h4>읽을 때 확인할 네 지점</h4>
      <ul>
        <li><strong>① 구성</strong>: 누가 있고 어떻게 연결돼 있는가. 여기서는 코디네이터 하나와 서브에이전트(subagent) 셋, 그리고 <strong>모든 통신이 코디네이터를 거친다는 규칙</strong>임</li>
        <li><strong>② 증상</strong>: 현재 무엇이 잘못됐는가. 이 브리핑에는 증상이 세 개 들어 있음. 번호를 매겨 두면 문항이 어느 증상을 다루는지 바로 확인됨</li>
        <li><strong>③ 제약</strong>: 바꾸면 안 되는 것과 남은 기간임. 제약을 어기는 선택지는 아무리 좋아 보여도 오답임</li>
        <li><strong>④ 질문</strong>: 문항마다 묻는 내용이 다름. 브리핑을 처음부터 다시 읽지 말고 메모해 둔 증상 번호에서 출발할 것</li>
      </ul>
      <div class="callout">📖 용어 카드. <b>코디네이터(coordinator)</b>: 요청을 가장 먼저 받고 최종 답을 조립하는 에이전트 하나. <b>서브에이전트(subagent)</b>: 코디네이터가 만들어서 작업 일부를 맡기는 별도 에이전트. <b>세션(session)</b>: 한 작업에서 오간 대화 기록 묶음. 세 용어 모두 이 레슨 뒤쪽 "지도에 나온 용어 정리"에서 0부터 다시 설명함. 지금은 이 정도만 알아 둘 것.</div>
      <h4>이 브리핑에서 뽑아낼 메모</h4>
      <ul>
        <li>증상 ①: 종료되지 않고 토큰만 소모하다가 40회 반복 지점에서 운영자가 중단시키는 실행이 있음</li>
        <li>증상 ②: 자료 두 건짜리 질문이 시장조사 한 건과 같은 시간, 같은 비용을 씀</li>
        <li>증상 ③: 며칠 전 교체된 경쟁사 목록의 숫자가 리포트에 그대로 실림</li>
        <li>제약: 서브에이전트끼리 직접 통신하지 않음. 유료 고객 오픈까지 4주 남음</li>
      </ul>
      <div class="callout">🎯 증상이 셋이면 문항도 대체로 셋 이상임. 위 세 줄을 적어 두고 다음 스텝으로 넘어갈 것.</div>`},

    /* ---------- ② 문항 1: 루프 · stop_reason ---------- */
    {type:"quiz", brief:BRIEF, kind:"PRACTICE · 실전 진단", h:"Q1 — The runs that never finish",
     q:`Investigating complaint one, you find the coordinator's loop works like this: it sends the conversation to the model, and if the response contains any text block it treats the run as finished; otherwise it executes the requested tools, appends only the successful results to the conversation, and repeats until the 40-iteration cap forces a stop. Which change addresses the root cause of the runaway runs?`,
     opts:[
       {t:`Drive the loop off stop_reason — keep going while it is "tool_use" and stop on "end_turn" — and append every tool result, failures included, as structured tool results so a failing call is not silently repeated.`, ok:true},
       {t:`Lower the iteration cap from 40 to 12, so a runaway run is cut off long before the token spend becomes noticeable.`},
       {t:`Keep the text-block check, but require the text to contain a completion marker such as "Final report:" before the loop exits.`},
       {t:`Keep appending only successful results, and add a system prompt instruction telling the coordinator to stop calling tools once it already has enough sources.`},
     ],
     hint:`40회 반복 지점에서 중단되는 것이 원인인지 결과인지 판단할 것. 그리고 "성공한 결과만 추가한다"는 문장이 실패한 호출을 모델에게 어떻게 보이게 만드는지 확인할 것.`,
     explain:{
       good:`두 곳이 동시에 고장 나 있음. 첫째, 종료 판정을 텍스트 유무로 하고 있음. 도구 요청과 설명 텍스트는 한 응답에 함께 나올 수 있으므로 이 방식으로는 구분되지 않음. 둘째, 실패한 결과를 대화에 추가하지 않으므로 모델은 그 호출이 실행됐다는 사실 자체를 알지 못하고 같은 호출을 계속 다시 요청함. 반복 상한은 그 폭주를 40회에서 끊어 주는 안전장치일 뿐 원인이 아님.`,
       wrongs:[
         `<b>B(상한 낮추기):</b> 폭주를 더 일찍 끊을 뿐임. 게다가 40회가 실제로 필요한 정상 리서치까지 12회에서 잘림.`,
         `<b>C(완료 문구 파싱):</b> 표현이 한 글자만 바뀌어도 동작하지 않고, 모델이 중간 설명에서 그 문구를 쓰면 조기 종료됨.`,
         `<b>D(프롬프트로 중단 지시):</b> 일반적으로는 맞아 보이지만 이 조건에서는 틀림. 실패 결과가 여전히 대화에 없으므로 모델은 자신이 무엇을 반복하고 있는지 알지 못함. 확률적 지시로 결정론적 결함을 덮는 방식임.`,
       ]},
     principle:"종료는 stop_reason으로 판정하고 실패도 기록으로 남김",
     why:{ q:`"stop_reason으로 종료 판정 + 실패 결과까지 추가"가 정답인 이유는 무엇인가?`,
       opts:[
         {t:`폭주의 원인이 두 개인데 이 선택지 하나가 둘을 함께 해결함. 종료 판정이 응답에 붙어 오는 공식 라벨 기준으로 바뀌고, 실패한 호출도 대화에 남아 모델이 같은 호출을 다시 요청할 이유가 사라짐`, ok:true},
         {t:`공식 문서의 루프 예제가 stop_reason 기준으로 작성돼 있고, 정석 구현을 그대로 따르는 것이 시험에서 안전하기 때문임`},
         {t:`에러를 대화에 남겨 두면 나중에 사람이 로그를 볼 때 무슨 일이 있었는지 추적하기 쉽기 때문임`},
         {t:`stop_reason으로 바꾸면 불필요한 반복이 줄어 토큰 비용이 내려가기 때문임`},
       ],
       explain:`모델이 대화에서 보지 못하는 것은 모델에게 일어나지 않은 일임. 에러를 지우든, 요약으로 축약하든, 한 줄 메모로 바꾸든 결과는 같음.`}},

    /* ---------- ② 문항 2: 분해 · 위임 ---------- */
    {type:"quiz", brief:BRIEF, kind:"PRACTICE · 실전 진단", h:"Q2 — Two sources, market-survey price",
     q:`Complaint two: the two-source question and the full market survey run identically — the coordinator forwards every request to all three specialists and waits for each one to return before starting the next. The team wants short requests to finish fast without weakening long ones, and the coordinator must stay in the middle of all traffic. Which redesign fits?`,
     opts:[
       {t:`Have the coordinator judge per request which specialists that request actually needs, then issue the independent ones as Task calls inside a single response so they run at the same time, leaving only genuinely dependent steps for later turns.`, ok:true},
       {t:`Keep all three specialists on every request but shorten each one's instructions and output length, so the whole chain finishes faster.`},
       {t:`Let the synthesis subagent call the search subagent directly when it only needs one more source, removing the extra round trip through the coordinator.`},
       {t:`Collapse the three specialists into one general-purpose subagent that searches, analyzes and synthesizes in one prompt, so each request needs only a single delegation.`},
     ],
     hint:`느린 이유가 하나인지 둘인지 확인할 것. "누구를 호출할지"와 "언제 호출할지"를 따로 셀 것. 그리고 브리핑에 적힌 통신 규칙을 어기는 선택지가 하나 섞여 있음.`,
     explain:{
       good:`짧은 요청이 느린 이유가 둘임. 요청마다 전문 담당을 전부 호출하는 것(필요한 담당을 고르지 않음), 그리고 서로 무관한 작업을 한 줄로 세워 기다리는 것(동시에 실행하지 않음)임. 코디네이터가 요청을 먼저 읽고 필요한 담당만 고른 뒤, 서로 독립인 작업을 한 응답에 Task 여러 개로 함께 호출하면 둘 다 해결됨. 실제 의존 관계가 있는 단계만 다음 턴으로 미루면 됨.`,
       wrongs:[
         `<b>B(지시문 줄이기):</b> 셋을 모두 호출하고 순서대로 기다리는 구조는 그대로임. 각 단계가 조금 빨라져도 자료 두 건짜리 질문이 시장조사와 같은 경로를 거치는 것은 변하지 않음.`,
         `<b>C(서브에이전트 직접 통신):</b> 브리핑에 모든 통신이 코디네이터를 거친다고 적혀 있음. 지문이 지키라고 명시한 조건을 어기는 선택지는 아무리 빨라져도 정답이 아님.`,
         `<b>D(하나로 통합):</b> 위임 횟수는 줄지만 역할별 도구 제한과 전문성 구분이 함께 사라짐. 짧은 요청을 살리려고 긴 요청의 품질을 내주는 교환임.`,
       ]},
     principle:"필요한 담당만 호출하고 독립된 작업은 동시에 실행함",
     why:{ q:`"요청별로 담당 선택 + 한 응답에 Task 여러 개"가 정답인 이유는 무엇인가?`,
       opts:[
         {t:`지연의 원인이 두 개인데 이 선택지 하나가 둘을 함께 해결함. 필요 없는 담당을 호출하지 않는 것으로 하나, 서로 기다릴 필요가 없는 작업을 함께 호출하는 것으로 하나임`, ok:true},
         {t:`멀티에이전트 설계에서는 병렬 실행이 정석으로 통하고, 정석대로 하는 것이 실전에서 안전하기 때문임`},
         {t:`서브에이전트끼리 직접 통신하면 안 된다는 것이 이 문항이 실제로 묻는 내용이기 때문임`},
         {t:`Task 호출을 한 응답에 모으면 코디네이터가 주고받는 왕복이 줄어 토큰이 절약되기 때문임`},
       ],
       explain:`증상이 여러 개면 원인이 몇 개인지 먼저 셀 것. 하나만 고치는 선택지는 대체로 오답이고, 지문이 지키라고 한 조건을 어기는 선택지는 아무리 효율적이어도 오답임.`}},

    /* ---------- ② 문항 3: 세션 · 상태 ---------- */
    {type:"quiz", brief:BRIEF, kind:"PRACTICE · 실전 진단", h:"Q3 — The competitor list that changed at lunch",
     q:`Complaint three, traced to one analyst's day: she has worked in the same session since 9am. Over lunch the data team replaced the competitor list her morning analysis was built on — same file names, different contents. She now wants to continue the afternoon work, and she also wants to compare two different framings of the same afternoon question side by side. Which handling is correct?`,
     opts:[
       {t:`Resume the session but state explicitly that the competitor list was replaced and which morning conclusions rest on it, so the agent re-reads that file and redoes the affected analysis; then fork the resumed session into two branches to compare the two framings from one shared baseline.`, ok:true},
       {t:`Resume the session and say nothing about the swap — the agent re-reads files when it needs them, so it will pick up the new list on its own; then run the two framings one after the other in that session.`},
       {t:`Start a fresh session for the afternoon and paste in the morning's raw notes, then run the two framings one after the other in the new session.`},
       {t:`Resume the morning session for the continuation, and start two brand-new sessions for the two framings so neither comparison branch is polluted by morning context.`},
     ],
     hint:`파일이 바뀌었을 때 위험한 것은 파일 내용이 아니라 세션 기록에 이미 적혀 있는 결론임. 그리고 "같은 기반에서 두 갈래를 비교"하는 동작에는 별도의 이름이 있음.`,
     explain:{
       good:`두 가지를 한 번에 물었음. 하나는 낡은 정보 처리임. 바뀐 범위가 파일 하나로 특정되므로 세션을 통째로 버리지 말고 재개한 뒤, 무엇이 바뀌었는지 알려 그 부분만 다시 확인하게 하는 쪽이 맞음. 세션은 아침에 자신이 내린 결론을 기록에서 읽고 그 위에서 계속 추론하므로, 알려 주지 않으면 파일을 다시 열 이유 자체가 생기지 않음. 다른 하나는 비교임. 같은 기반에서 두 갈래를 나란히 두는 동작이 fork임.`,
       wrongs:[
         `<b>B(에이전트가 알아서 파악):</b> 일반적으로는 맞지만 이 조건에서는 틀린 선택지라 가장 위험함. 파일을 다시 열면 내용이 최신인 것은 맞음. 문제는 세션이 이미 기록해 둔 결론을 근거로 삼아 파일을 열지 않는 경우가 많다는 점이고, 그래서 아침 숫자가 오후 리포트에 그대로 실림.`,
         `<b>C(통째로 새 세션):</b> 바뀐 것이 파일 하나인데 하루치 분석을 버리는 과잉 대응임. 새 세션과 요약은 이전 작업 전체가 낡았을 때 쓰는 방식임.`,
         `<b>D(비교용으로 새 세션 둘):</b> 공통 기반을 두 번 다시 만들어야 하고, 두 갈래가 정말 같은 출발점에서 갈라졌는지 보장되지 않음. 그 보장이 fork가 존재하는 이유임.`,
       ]},
     principle:"바뀐 범위를 기준으로 고르고 비교는 fork로 함",
     why:{ q:`새 세션이 아니라 "재개 + 변경 고지"가 맞는 이유는 무엇인가?`,
       opts:[
         {t:`낡은 것이 세션 전체가 아니라 파일 하나임. 범위가 좁으면 기록을 버리지 말고 무엇이 바뀌었는지 알려 그 부분만 다시 확인하게 하는 쪽이 맞음`, ok:true},
         {t:`세션을 다루는 기본 방식이 --resume이고, 특별한 사정이 없으면 기본을 따르는 것이 맞기 때문임`},
         {t:`세션을 재개하면 에이전트가 파일을 자동으로 다시 읽어 어차피 최신 상태가 되기 때문임`},
         {t:`새 세션을 만들면 아침 대화를 다시 채워 넣어야 해서 토큰과 시간이 두 배로 들기 때문임`},
       ],
       explain:`세션 문항은 항상 "무엇이 얼마나 낡았는가"로 갈림. 범위가 좁으면 재개와 변경 고지, 전체가 낡았으면 새 세션과 요약, 갈래를 비교하려면 fork임. 이 순서로 확인할 것.`}},

    /* ---------- ③ 블록 복기 ---------- */
    {type:"concept", kind:"CONCEPT · 개념 설명", h:"복기: 브리핑 하나가 세 번 사용됨",
     html:`<p class="lead">방금 푼 문항 셋은 모두 같은 브리핑에서 나왔음. 그런데 묻는 내용은 셋 다 달랐음.</p>
      <table>
        <tr><th>문항</th><th>다룬 증상</th><th>물어본 내용</th><th>해당 챕터</th></tr>
        <tr><td>Q1</td><td>① 종료되지 않는 실행</td><td>루프 종료 판정, 실패 결과 기록</td><td>CH 1</td></tr>
        <tr><td>Q2</td><td>② 짧은 질문이 느림</td><td>요청별 위임 선택, 병렬 호출</td><td>CH 3 · CH 4</td></tr>
        <tr><td>Q3</td><td>③ 낡은 숫자</td><td>세션 재개와 분기, 낡음 판단</td><td>CH 7</td></tr>
      </table>
      <h4>여기서 확인할 것</h4>
      <ul>
        <li>브리핑 하나가 <strong>여러 챕터를 동시에 출제 범위로 삼음</strong>. "이 문제가 어느 챕터인가"는 브리핑만 보고 정할 수 없음. 정하는 것은 문항임</li>
        <li>같은 상황인데 각 문항이 <strong>다른 증상 하나</strong>씩을 다뤘음. 그래서 증상에 번호를 매기는 방법이 실전에서 효과가 큼</li>
        <li>세 문항 모두 오답 하나가 <strong>브리핑의 조건을 어기고 있었음</strong>(Q2의 직접 통신, Q3의 통째 폐기). 조건을 적어 두지 않으면 그 선택지가 가장 그럴듯해 보임</li>
      </ul>
      <h4>브리핑에서 메모할 네 줄</h4>
      <ul>
        <li><strong>구성원과 연결 규칙</strong>: "코디네이터 경유" 같은 한 줄임. 나중에 지름길을 제안하는 선택지를 걸러낼 때 씀</li>
        <li><strong>증상 번호</strong>: 문항 하나가 증상 하나를 다룸. 번호만 봐도 어느 챕터인지 좁혀짐</li>
        <li><strong>제약과 기한</strong>: 지문이 지키라고 한 것을 어기는 선택지는 항상 매력적으로 작성돼 있음</li>
        <li><strong>이미 시도한 것</strong>: "프롬프트를 두 번 강화했는데 5%가 남았다" 같은 문장은 그 방향의 선택지를 전부 배제하라는 신호임</li>
      </ul>
      <div class="callout">🎯 브리핑은 한 번만 읽을 것. 두 번째 문항부터는 메모만 보고 푸는 것이 목표임. 실전에서는 다시 읽을 시간이 나지 않음.</div>`},

    /* ---------- ④ 개념 지도 ---------- */
    {type:"concept", kind:"TOPIC · 주제 설명", h:"이 파트 전체 지도",
     html:`<p class="lead">이 파트에서 배울 내용이 한 그림에 모두 들어 있음. 지금은 외우지 말고 <strong>칸 이름만</strong> 익혀 둘 것.</p>
      __MAP:all__
      <h4>지도 읽는 법</h4>
      <ul>
        <li><strong>맨 윗줄</strong>: 요청 한 건이 흐르는 순서임. 왼쪽에서 오른쪽으로 사용자 → 코디네이터 → 훅(hook)·게이트 → 도구로 진행함</li>
        <li><strong>점선 줄</strong>: 코디네이터가 작업을 넘기는 지점임. 넘길 때 필요한 정보는 자동으로 따라가지 않으므로 프롬프트에 적어서 전달해야 함</li>
        <li><strong>서브에이전트 세 칸</strong>: 위아래가 아니라 나란히 놓인 이유가 있음. 서로 기다릴 필요가 없으면 동시에 실행할 수 있음</li>
        <li><strong>맨 아랫줄</strong>: 위와 다른 시간 기준임. 위가 "요청 한 건"이라면 아래는 "이 작업이 며칠에 걸쳐 유지되는 과정"임</li>
      </ul>
      <h4>어느 칸이 어느 챕터인가</h4>
      <table>
        <tr><th>지도의 칸</th><th>챕터</th><th>가이드 번호</th></tr>
        <tr><td>① 에이전트 루프</td><td>CH 1</td><td>1.1</td></tr>
        <tr><td>② 작업 분해</td><td>CH 2</td><td>1.6</td></tr>
        <tr><td>서브에이전트 세 칸, 결과는 코디네이터로</td><td>CH 3</td><td>1.2</td></tr>
        <tr><td>점선 줄: Task 호출, 컨텍스트 전달, 병렬</td><td>CH 4</td><td>1.3</td></tr>
        <tr><td>⛩ 훅·게이트 중 <strong>막는 쪽</strong></td><td>CH 5</td><td>1.4</td></tr>
        <tr><td>⛩ 훅·게이트 중 <strong>결과를 손질하는 쪽</strong></td><td>CH 6</td><td>1.5</td></tr>
        <tr><td>🕐 세션 타임라인</td><td>CH 7</td><td>1.7</td></tr>
      </table>
      <div class="callout">📌 지도에 없는 칸은 이 파트에도 없음. 반대로 문제에서 낯선 용어가 나오면 이 지도의 어느 칸에 해당하는지부터 찾을 것. 대체로 찾아짐.</div>`},

    /* ---------- ⑤ 지도에 나온 용어 정리 ---------- */
    {type:"concept", kind:"CONCEPT · 개념 설명", h:"지도에 나온 용어 정리: 0부터",
     html:`<p class="lead">지도에 적힌 용어를 실제로 무슨 일이 일어나는지로 설명함. 비슷한 것에 빗대지 않고 동작 그대로 서술함.</p>
      <h4>코디네이터 (메인 에이전트)</h4>
      <ul>
        <li>사용자 요청을 <strong>가장 먼저 받는 에이전트 하나</strong>임</li>
        <li>직접 도구를 호출하기도 하고, 일부를 다른 에이전트에게 넘기기도 함</li>
        <li>넘긴 작업의 결과는 전부 코디네이터로 돌아옴. 최종 답을 조립하는 것도 코디네이터임</li>
        <li>그래서 결과가 이상할 때 <strong>가장 먼저 확인할 곳도 코디네이터</strong>임. 누구에게 무엇을 어떻게 지시했는지가 여기에 남음</li>
      </ul>
      <h4>서브에이전트</h4>
      <ul>
        <li>코디네이터가 <strong>Task라는 도구를 호출해 만들어내는</strong> 별도의 에이전트임</li>
        <li>자기만의 대화 기록을 새로 시작함. 코디네이터가 지금까지 나눈 대화를 <strong>물려받지 않음</strong></li>
        <li>사용할 수 있는 도구도 따로 지정함. 검색 담당에게 파일 쓰기 도구를 주지 않는 방식임</li>
        <li>그래서 "이 서브에이전트가 알아야 할 내용"은 호출할 때 프롬프트에 <strong>적어서 전달해야 함</strong>. 적지 않으면 모르는 상태로 작업함</li>
      </ul>
      <h4>에이전트 루프(agent loop)</h4>
      <ul>
        <li>모델이 한 번 대답하고 끝나는 것이 아니라, 작업이 끝날 때까지 같은 네 단계를 반복하는 것임</li>
        <li>① 지금까지의 대화 전체를 모델에 보냄 → ② 응답에 붙어 온 stop_reason 확인 → ③ 모델이 요청한 도구를 에이전트 실행 프로그램이 실행 → ④ 실행 결과를 대화에 추가 → 다시 ①</li>
        <li>stop_reason이 <code>end_turn</code>이면 멈추고, <code>tool_use</code>면 한 주기 더 반복함</li>
        <li>④까지 해야 한 주기임. 결과를 추가하지 않으면 모델은 다음 주기에서 그 결과를 보지 못함</li>
      </ul>
      <h4>도구 호출</h4>
      <ul>
        <li>모델이 직접 웹을 검색하거나 데이터베이스를 열지 않음. <strong>"이 도구를 이 입력으로 실행해 달라"는 요청을 내놓을 뿐</strong>임</li>
        <li>그 요청의 형식이 <code>tool_use</code> 블록임. 도구 이름과 입력값이 들어 있음</li>
        <li>실제 실행은 에이전트 실행 프로그램이 함. 결과는 <code>tool_result</code> 블록에 담아 대화에 다시 넣어 줘야 모델이 볼 수 있음</li>
        <li>결과를 넣지 않으면 모델은 <strong>그 도구 호출이 실행됐다는 사실 자체를 알지 못함</strong>. 성공이든 실패든 동일함</li>
      </ul>
      <h4>훅(hook)</h4>
      <ul>
        <li>도구 호출이 지나가는 실행 지점에 <strong>미리 등록해 둔 별도의 코드</strong>임. 조건에 맞으면 모델의 판단과 무관하게 항상 실행됨</li>
        <li><strong>PreToolUse</strong>: 실행 <strong>전</strong>에 개입함. 호출을 막을 수도 있고 다른 처리로 보낼 수도 있음</li>
        <li><strong>PostToolUse</strong>: 실행 <strong>후</strong>, 결과가 모델에 들어가기 전에 개입함. 필요 없는 필드를 잘라내거나 형식을 통일하는 자리임</li>
        <li>프롬프트로 "하지 말 것"이라고 적는 방식과 다른 점은 하나임. 훅은 <strong>확률이 아니라 코드</strong>이므로 예외가 생기지 않음</li>
      </ul>
      <h4>세션</h4>
      <ul>
        <li>한 작업에서 오간 대화 기록 묶음과 거기 붙은 이름표(세션 ID)임</li>
        <li><strong>--resume</strong>: 그 기록에 이어서 계속함. 이전에 내린 결론을 그대로 유지함</li>
        <li><strong>fork</strong>: 같은 기록에서 두 갈래로 나눔. 공통 분석 위에서 안 A와 안 B를 나란히 비교할 때 씀</li>
        <li><strong>stale</strong>: 기록은 그대로인데 외부가 바뀐 상태임. 파일이 수정됐거나 데이터가 교체됐는데 세션은 이전 결론을 그대로 유지하고 있는 상태임</li>
      </ul>
      <div class="callout">📖 용어 카드. <b>Task 도구</b>: 서브에이전트를 만드는 유일한 수단임. 코디네이터의 허용 도구 목록에 이것이 없으면 위임(delegation) 자체가 불가능함. <b>MCP</b>: 주문 조회나 결제 같은 외부 시스템을 도구로 붙여 주는 규격임. <b>게이트</b>: A가 끝나기 전에는 B를 호출하지 못하도록 코드로 막아 두는 장치임. <b>병렬(parallel)</b>: 서로의 결과를 기다릴 필요가 없는 호출을 한 응답에 함께 내보내 동시에 실행하는 것임.</div>`},

    /* ---------- ⑥ 학습 순서 ---------- */
    {type:"concept", kind:"CONCEPT · 개념 설명", h:"이 파트 학습 순서",
     html:`<p class="lead">챕터 일곱 개와 미니테스트로 구성됨. 번호 순서대로 진행하는 것이 맞음. 뒤 챕터가 앞 챕터의 용어를 설명 없이 사용함.</p>
      <table>
        <tr><th>순서</th><th>챕터</th><th>여기서 익히는 것</th><th>체감 출제량</th></tr>
        <tr><td>1</td><td>CH 1 · 에이전트 루프의 생명주기 (1.1)</td><td>stop_reason, 결과 기록, 종료 판정</td><td>많음</td></tr>
        <tr><td>2</td><td>CH 2 · 작업 분해 전략 (1.6)</td><td>고정 순서와 동적 분해 구분</td><td>보통</td></tr>
        <tr><td>3</td><td>CH 3 · 코디네이터-서브에이전트 (1.2)</td><td>허브-앤-스포크, 동적 선택, 역할 분리</td><td>최다</td></tr>
        <tr><td>4</td><td>CH 4 · 컨텍스트 전달과 병렬 (1.3)</td><td>Task 도구, 명시 전달, 병렬 조건</td><td>최다</td></tr>
        <tr><td>5</td><td>CH 5 · 강제 패턴과 핸드오프 (1.4)</td><td>코드로 보장하는 경우와 프롬프트로 지시하는 경우</td><td>많음</td></tr>
        <tr><td>6</td><td>CH 6 · Agent SDK 훅 (1.5)</td><td>Pre/Post 위치 선택, 차단과 리다이렉트</td><td>보통</td></tr>
        <tr><td>7</td><td>CH 7 · 세션 상태·재개·포크 (1.7)</td><td>resume, fork, 새 세션 구분</td><td>보통</td></tr>
      </table>
      <h4>시간이 부족한 경우</h4>
      <ul>
        <li>가장 먼저 <strong>CH 3 · CH 4 · CH 5</strong>임. 멀티에이전트 설계와 강제 판단이 D1 문항에서 가장 큰 비중을 차지함</li>
        <li>그다음 <strong>CH 1</strong>임. 루프 종료와 결과 기록은 다른 챕터 문항에도 계속 섞여 출제됨</li>
        <li><strong>CH 2 · CH 6 · CH 7</strong>은 문항 수는 적어도 판단 기준이 뚜렷해서 학습 시간 대비 효율이 좋음</li>
      </ul>
      <h4>학습을 마친 뒤</h4>
      <ul>
        <li><strong>D1 미니테스트 14문항</strong>으로 확인할 것. 틀린 문항의 챕터로 바로 돌아가는 것이 가장 빠름</li>
        <li>파트 6의 <strong>시나리오 ① 고객지원 · 시나리오 ③ 멀티에이전트 리서치</strong>가 D1 문항이 실제로 붙는 자리임. 거기까지 학습하면 출제 형태에 당황하지 않음</li>
      </ul>
      <div class="callout">🎯 이 파트를 학습하는 내내 유지할 질문 하나. <b>"이것은 코드로 보장해야 하는가, 프롬프트로 지시해도 되는가."</b> D1 오답의 상당수가 이 판단 하나에서 갈림.</div>`},
    ]});
  }

  /* ============================================================
     (2) 기존 레슨 연습 문제에 이유 카드(why) 붙이기. 이미 있으면 건드리지 않음
     ============================================================ */
  var find = function(id){ return P1.lessons.find(function(l){ return l && l.id === id; }); };
  var qz = function(id, n){
    var L = find(id);
    if(!L || !Array.isArray(L.steps)) return null;
    return L.steps.filter(function(s){ return s && s.type === "quiz"; })[n] || null;
  };
  var why = function(id, n, w){ var s = qz(id, n); if(s && !s.why) s.why = w; };

  /* ----- CH 1 · 에이전트 루프 (1.1) ----- */
  why("p1c1", 0, {
    q:`Ji-woo의 구현만 맞는 이유는 무엇인가? 나머지 셋과 갈리는 결정적 지점은 어디인가?`,
    opts:[
      {t:`도구가 실패한 결과까지 대화에 남겨야 모델이 "그 호출은 이미 실행됐고 이렇게 실패했다"를 알 수 있음. 남기지 않으면 같은 호출을 계속 다시 요청함`, ok:true},
      {t:`공식 문서의 루프 예제가 그 형태이고, 정석 구현을 그대로 따르는 것이 안전하기 때문임`},
      {t:`에러를 대화에 남겨 두면 나중에 사람이 로그를 볼 때 무슨 일이 있었는지 추적하기 쉽기 때문임`},
      {t:`반복 횟수 상한으로는 비용이 얼마나 나갈지 미리 예측할 수 없기 때문임`},
    ],
    explain:`모델이 대화에서 보지 못하는 것은 모델에게 일어나지 않은 일임. 에러를 지우든 요약으로 축약하든 결과는 같음.`});

  why("p1c1", 1, {
    q:`재조회와 존재하지 않는 날짜 인용, 이 두 증상이 같은 원인에서 나온 이유는 무엇인가?`,
    opts:[
      {t:`대화에 원본 필드가 하나도 남지 않음. 모델 입장에서는 조회를 한 적도 없고 참조할 날짜도 없으므로 그럴듯한 날짜를 생성하게 됨`, ok:true},
      {t:`도구 결과는 원본 그대로 넣는 것이 원칙이고, 원칙을 어겨서 문제가 생겼기 때문임`},
      {t:`한 줄 메모가 너무 짧아 정보가 손실됐고, 더 길고 구조적으로 쓰면 해결되는 문제이기 때문임`},
      {t:`대화가 길어지면서 오래된 조회 결과가 컨텍스트 뒤로 밀려났기 때문임`},
    ],
    explain:`데이터가 들어갈 자리에 요약된 인상을 넣으면 절약이 아니라 삭제임. 절약이 필요하면 필드를 줄여야 하고 형태를 바꾸면 안 됨.`});

  /* ----- CH 2 · 작업 분해 (1.6) ----- */
  why("p1c2", 0, {
    q:`야간 로컬라이제이션 QA만 고정 파이프라인인 이유는 무엇인가?`,
    opts:[
      {t:`시작하기 전에 단계 목록을 전부 적을 수 있고, 어떤 글이 들어와도 그 순서가 바뀌지 않기 때문임`, ok:true},
      {t:`반복 작업은 고정 파이프라인으로 처리하는 것이 표준이기 때문임`},
      {t:`처리할 글 수가 많아서 같은 절차를 여러 번 반복하는 쪽이 효율적이기 때문임`},
      {t:`야간 배치라 사람이 중간에 개입할 수 없고, 그래서 예측 가능한 방식이어야 하기 때문임`},
    ],
    explain:`분해 방식은 "단계를 미리 셀 수 있는가" 하나로 갈림. 건수가 많은 것은 병렬로 풀 문제이고, 새로운 발견이 새 단계를 만들어내는 것이 동적 분해임.`});

  why("p1c2", 1, {
    q:`Dana도 Raj도 아닌 이유를 한 문장으로 고르면 무엇인가?`,
    opts:[
      {t:`무엇이 중요한지는 구조를 봐야 알 수 있고 무엇을 놓쳤는지는 실행해 봐야 알 수 있음. 매핑으로 우선순위를 잡되 계획은 발견할 때마다 고쳐 쓰는 쪽이 둘 다 만족시킴`, ok:true},
      {t:`양극단 선택지는 대체로 오답이고 중간을 고르는 것이 안전하기 때문임`},
      {t:`7년 된 레거시는 문서가 없어서 계획을 미리 세우는 것 자체가 불가능하기 때문임`},
      {t:`테스트는 커버리지가 목표라 모듈을 빠짐없이 순회해야 하고, 그러려면 계획이 필요하기 때문임`},
    ],
    explain:`"둘 다 아님"이 답인 문항은 제3의 절차가 지문 안에 들어 있음. 두 극단이 각각 무엇을 하지 못하는지 적어 보면 그 절차가 드러남.`});

  /* gap-fix.js가 뒤에 붙이는 Practice 3. 로드 순서상 있을 때만 적용됨 */
  why("p1c2", 2, {
    q:`240건이라는 숫자와 런북이 있다는 사실, 둘 다 판단 근거가 되지 못하는 이유는 무엇인가?`,
    opts:[
      {t:`분해 방식을 가르는 기준은 "단계가 발견에 따라 바뀌는가" 하나임. 건수는 반복 횟수만 늘리고, 런북은 다음에 어느 계정을 열지까지 정해 주지 않음`, ok:true},
      {t:`문서로 정리된 절차가 있으면 고정 파이프라인으로 보는 것이 기본이기 때문임`},
      {t:`계약서 240건은 서로 독립이라 어차피 병렬로 실행할 수 있기 때문임`},
      {t:`청구서 조사는 정답이 하나로 정해져 있지 않은 열린 문제이기 때문임`},
    ],
    explain:`분해 방식 문항에서 건수, 분량, 문서 유무는 전부 오답 유도용임. 확인할 것은 하나임. 시작 전에 단계 목록을 끝까지 적을 수 있는가.`});

  why("p1c2", 3, {
    q:`원인을 모르는 조사 과제인데도 계획서를 작성하는 것이 맞는 이유는 무엇인가?`,
    opts:[
      {t:`동적 분해는 계획을 쓰지 않는 것이 아니라 계획을 고쳐 쓰는 것임. 첫 조사로 초안을 만들고 발견할 때마다 갱신하면 문서 요구와 발견 주도 성질이 동시에 지켜짐`, ok:true},
      {t:`엔지니어링 리드가 문서를 요구했고, 요구사항은 일단 맞춰 주는 것이 맞기 때문임`},
      {t:`계획서를 작성해 두면 나중에 무엇을 왜 했는지 사람이 되짚어 보기 좋기 때문임`},
      {t:`온보딩 퍼널 이탈은 원인 후보가 몇 개 안 되므로 미리 다 적어 둘 수 있기 때문임`},
    ],
    explain:`"계획 없이 바로 착수"는 동적 분해가 아니라 즉흥임. 발견이 계획을 바꾸는 것과 계획이 아예 없는 것을 혼동하지 말 것.`});

  /* ----- CH 3 · 코디네이터-서브에이전트 (1.2) ----- */
  why("p1c3", 0, {
    q:`"동적 선택 + 한 응답에 병렬 Task"가 정답인 이유는 무엇인가?`,
    opts:[
      {t:`90초가 두 원인에서 나옴. 매번 다섯을 모두 호출하는 것과 다섯을 한 줄로 세워 기다리는 것인데, 이 선택지 하나가 둘을 함께 해결함`, ok:true},
      {t:`코디네이터는 원래 요청을 분류하고 위임하는 역할이라 역할대로 되돌린 것이기 때문임`},
      {t:`서브에이전트 동작에는 문제가 없다고 지문이 명시했으므로 고칠 곳이 코디네이터밖에 없기 때문임`},
      {t:`병렬로 실행하면 같은 시간에 더 많은 요청을 처리할 수 있기 때문임`},
    ],
    explain:`증상 문장에 원인이 두 개 들어 있으면 하나만 고치는 선택지는 전부 오답임. 지문의 증상 개수를 먼저 세는 습관이 필요함.`});

  why("p1c3", 1, {
    q:`여섯 주기를 반복하고도 멈추지 않은 것이 설계 문제인 이유는 무엇인가?`,
    opts:[
      {t:`루프에 "무엇이 되면 충분한가"가 적혀 있지 않음. 종료 기준이 없으면 결과가 더 나빠져도 계속 반복하는 것이 그 루프의 정상 동작임`, ok:true},
      {t:`에이전트 루프에는 항상 종료 조건이 있어야 한다는 것이 기본 원칙이기 때문임`},
      {t:`아프리카 양자 네트워킹처럼 자료가 희박한 주제는 애초에 리서치 대상으로 부적절하기 때문임`},
      {t:`비용이 계속 늘어나고 있어서 어떻게든 멈춰야 하는 상황이기 때문임`},
    ],
    explain:`반복이 있는 곳에는 전부 "언제 멈추는가"가 필요함. 에이전트 루프든 개선 루프든 재시도든 동일함. 채우지 못한 부분은 감추지 말고 주석으로 남길 것.`});

  /* ----- CH 4 · 컨텍스트 전달과 병렬 (1.3) ----- */
  why("p1c4", 0, {
    q:`프롬프트가 그렇게 자세한데도 위임이 한 번도 일어나지 않은 이유는 무엇인가?`,
    opts:[
      {t:`서브에이전트를 만드는 수단이 Task 도구 하나뿐인데 허용 목록에 없음. 목록에 없는 도구는 아무리 지시해도 호출할 수 없음`, ok:true},
      {t:`allowedTools에 Task를 넣는 것이 멀티에이전트 설정의 기본이기 때문임`},
      {t:`시스템 프롬프트가 너무 길어서 위임 지시 부분이 다른 지시에 묻혔기 때문임`},
      {t:`WebSearch만으로도 답이 나오므로 모델이 더 쉬운 경로를 고른 것이기 때문임`},
    ],
    explain:`행동이 0번 일어났으면 확률 문제가 아니라 수단 문제임. "가끔 하지 않음"과 "한 번도 하지 않음"은 원인이 다름.`});

  why("p1c4", 1, {
    q:`셋만 한 응답에 묶고 나머지 둘은 다음 턴으로 미루는 이유는 무엇인가?`,
    opts:[
      {t:`동시에 실행할 수 있는 조건이 "서로의 결과를 기다릴 필요가 없을 것"임. 비교는 검색 셋의 결과가 있어야 시작하고, 요약은 비교 결과가 있어야 시작함`, ok:true},
      {t:`한 응답에 넣을 수 있는 Task 개수에 권장 상한이 있기 때문임`},
      {t:`검색 셋은 같은 종류의 작업이라 묶기 좋고, 비교와 요약은 종류가 다르기 때문임`},
      {t:`병렬로 실행하면 전체 소요 시간이 줄어들기 때문임`},
    ],
    explain:`병렬의 기준은 작업 종류가 아니라 의존 관계임. 그리고 앞 단계 결과는 저절로 넘어가지 않으므로 다음 서브에이전트 프롬프트에 직접 적어야 함.`});

  /* ----- CH 5 · 강제 패턴과 핸드오프 (1.4) ----- */
  why("p1c5", 0, {
    q:`(1)(2)만 코드로 막고 (3)(4)는 프롬프트로 두는 이유는 무엇인가?`,
    opts:[
      {t:`한 번 어겼을 때 되돌릴 수 없는 대가가 생기는 규칙만 보장이 필요함. 이름 누락이나 길이 초과는 가끔 어겨도 복구가 됨`, ok:true},
      {t:`보안과 금액에 관한 규칙은 코드로 강제하는 것이 업계 표준이기 때문임`},
      {t:`프롬프트에 지시를 네 개나 넣으면 서로 경쟁해서 지시가 희석되기 때문임`},
      {t:`훅을 많이 걸수록 응답이 느려지므로 꼭 필요한 곳에만 걸어야 하기 때문임`},
    ],
    explain:`강제할지 여부는 규칙의 중요도가 아니라 "실패를 감당할 수 있는가"로 갈림. 위반 0건이 요구되면 코드로 막고, 대체로 지켜지면 되는 규칙이면 프롬프트로 지시함.`});

  why("p1c5", 1, {
    q:`게이트가 불편하다는 이유로 프롬프트 방식으로 되돌리면 안 되는 이유는 무엇인가?`,
    opts:[
      {t:`불편의 원인이 "강제한다는 것"이 아니라 "매번 새 검증을 요구하는 게이트 조건"임. 조건을 세션 상태 기준으로 바꾸면 보장은 유지하면서 불편만 없앨 수 있음`, ok:true},
      {t:`프로그램적 강제는 프롬프트 지시보다 언제나 우월한 수단이기 때문임`},
      {t:`되돌리면 위반율이 다시 올라가 컴플라이언스 승인을 받지 못하기 때문임`},
      {t:`고객 불만의 실제 원인은 검증 횟수가 아니라 응답이 느려진 것이기 때문임`},
    ],
    explain:`"이 방식이 불편하다"는 신고는 대체로 방식이 아니라 조건이 잘못됐다는 신호임. 방식을 버리기 전에 조건을 먼저 확인할 것.`});

  /* ----- CH 6 · Agent SDK 훅 (1.5) ----- */
  why("p1c6", 0, {
    q:`PostToolUse 자리여야 하는 이유는 무엇인가?`,
    opts:[
      {t:`도구 결과가 모델에 들어가기 직전 자리임. 컨텍스트 소모도 형식 불일치도 모델이 보기 전에 끊어야 막히고, 두 가지 손질을 한 곳에서 처리할 수 있음`, ok:true},
      {t:`도구 결과 가공은 PostToolUse에서 하도록 정해져 있기 때문임`},
      {t:`44개 필드 중 6개만 쓰므로 나머지를 버리면 토큰이 크게 줄기 때문임`},
      {t:`날짜 형식이 백엔드마다 달라서 백엔드를 고치는 것보다 훅이 빨리 적용되기 때문임`},
    ],
    explain:`훅 문항은 항상 "언제 개입하는가"로 답이 갈림. 막아야 하면 실행 전(Pre), 손질해야 하면 실행 후 모델이 보기 전(Post)임.`});

  why("p1c6", 1, {
    q:`훅이 정확히 막고 있는데도 에스컬레이션이 0건인 이유는 무엇인가?`,
    opts:[
      {t:`막힌 다음에 갈 곳을 지정하지 않음. 차단은 "하지 말 것"까지이고, "대신 이쪽으로"를 훅이 함께 돌려줘야 흐름이 사람에게 넘어감`, ok:true},
      {t:`훅 패턴은 차단과 리다이렉트를 한 쌍으로 쓰게 되어 있기 때문임`},
      {t:`에러 메시지가 너무 짧아서 에이전트가 상황을 이해하지 못했기 때문임`},
      {t:`같은 호출을 세 번이나 재시도하느라 에스컬레이션까지 갈 시간이 없었기 때문임`},
    ],
    explain:`차단 설계는 항상 두 부분임. 무엇을 막을지, 막힌 흐름을 어디로 보낼지임. 재시도 낭비는 retriable:false가 함께 해결함.`});

  /* ----- CH 7 · 세션 상태·재개·포크 (1.7) ----- */
  why("p1c7", 0, {
    q:`세 상황에 세 도구가 갈리는 기준은 무엇인가?`,
    opts:[
      {t:`기존 기록을 얼마나 신뢰할 수 있는가임. 전체가 낡았으면 기록을 버리고 요약만 가져가고, 한 곳만 낡았으면 그 부분만 다시 확인하게 하고, 기록은 정상인데 갈래를 비교하려면 나눔`, ok:true},
      {t:`resume, fork, 새 세션은 각각 정해진 용도가 있어서 용도대로 맞춘 것이기 때문임`},
      {t:`작업량이 큰 상황일수록 더 무거운 도구를 골라야 하기 때문임`},
      {t:`이전 분석은 어차피 하루가 지났으니 새로 시작하는 쪽이 안전하고, 비교는 어차피 두 번 실행해야 하기 때문임`},
    ],
    explain:`세션 문항은 "무엇이 얼마나 낡았는가" 한 줄로 정리하면 도구가 자동으로 정해짐.`});

  why("p1c7", 1, {
    q:`동료가 한 말에서 위험한 지점은 어디인가?`,
    opts:[
      {t:`파일을 다시 열면 최신인 것은 맞지만, 세션은 히스토리에 적힌 자기 결론을 근거로 답을 만드는 경우가 많아 파일을 다시 열 이유 자체가 생기지 않음`, ok:true},
      {t:`변경 사항은 세션에 알려 주는 것이 원칙이기 때문임`},
      {t:`리팩터링된 파일이 두 개뿐이라 에이전트가 인지할 신호가 너무 약하기 때문임`},
      {t:`세션을 재개하면 대화가 길어져 오래된 내용이 컨텍스트 뒤로 밀리기 때문임`},
    ],
    explain:`세션이 "다시 읽지 않는" 것이 아니라 "다시 읽을 이유를 찾지 못하는" 것임. 그 이유를 만들어 주는 것이 변경 고지임.`});

  /* ============================================================
     (3) 용어사전 확장: D1. 이미 있는 이름이면 건너뜀
     ============================================================ */
  if(A && Array.isArray(A.glossary)){
    var seen = {};
    A.glossary.forEach(function(g){ if(g) seen[g.c + "|" + g.t] = 1; });
    [
      {c:"D1", t:"코디네이터 (메인 에이전트)", d:"요청을 가장 먼저 받고 최종 답을 조립하는 에이전트 하나임. 일부를 서브에이전트에 넘겨도 결과는 전부 여기로 돌아옴."},
      {c:"D1", t:"서브에이전트", d:"코디네이터가 Task 도구로 만들어내는 별도 에이전트임. 자기만의 대화 기록과 자기에게 허용된 도구만 가짐."},
      {c:"D1", t:"오케스트레이션", d:"여러 에이전트에게 무엇을 언제 시킬지 정하고 결과를 모아 조립하는 일임. 코디네이터가 하는 일 전체를 가리킴."},
      {c:"D1", t:"위임 (delegation)", d:"코디네이터가 작업 일부를 서브에이전트에 맡기는 것임. 맡길 때 필요한 정보를 프롬프트에 적어 주지 않으면 상대는 모르는 상태로 작업함."},
      {c:"D1", t:"tool_use / tool_result 블록", d:"모델이 내놓는 '이 도구를 이 입력으로 실행해 달라'는 요청과, 실행 프로그램이 얻은 결과를 담아 대화에 되돌려주는 블록임. 결과를 넣지 않으면 모델은 그 호출이 실행됐다는 사실 자체를 알지 못함."},
      {c:"D1", t:"모델 주도 vs 사전 결정 트리", d:"다음에 무엇을 할지 모델이 그때그때 정하는 방식과, 코드가 순서를 미리 고정해 둔 방식임. '누가 정하는가'로 구분함."},
      {c:"D1", t:"반복 상한 (max iterations)", d:"루프가 정해진 횟수를 넘으면 강제로 끊는 안전장치임. 주 종료 조건으로 쓰면 정상 작업까지 잘리므로 오답 선택지로 자주 출제됨."},
      {c:"D1", t:"종료 기준 (stopping criteria)", d:"'무엇이 되면 충분한가'를 미리 적어 둔 조건임. 개선 루프나 재시도처럼 반복이 있는 곳에는 전부 필요함."},
      {c:"D1", t:"적응형 계획", d:"먼저 구조를 훑어 우선순위 계획을 세우되, 새로 발견한 내용이 나오면 계획을 고쳐 쓰는 방식임. 계획 없음과도, 계획 고정과도 다름."},
      {c:"D1", t:"병렬 Task 호출", d:"서로의 결과를 기다릴 필요가 없는 위임 여러 개를 한 응답에 함께 내보내 동시에 실행하는 것임. 기준은 작업 종류가 아니라 의존 관계임."},
      {c:"D1", t:"컨텍스트 명시 전달", d:"서브에이전트는 코디네이터의 대화를 물려받지 않으므로, 필요한 사실을 호출할 때 프롬프트에 적어 전달하는 것임."},
      {c:"D1", t:"프로그램적 강제 vs 프롬프트 지시", d:"코드로 막아 예외를 없애는 방식과, 지시로 대체로 지켜지게 하는 방식임. 위반 대가를 되돌릴 수 없으면 앞쪽을 씀."},
      {c:"D1", t:"차단 + 리다이렉트", d:"훅으로 호출을 막고 끝내지 말고, 대신 갈 경로(사람 에스컬레이션 등)까지 함께 돌려주는 완전형 패턴임."},
      {c:"D1", t:"결과 트리밍 / 정규화", d:"도구 결과에서 쓰지 않는 필드를 잘라내고 날짜 같은 형식을 통일하는 것임. 모델이 결과를 보기 전 자리에서 해야 효과가 남."},
      {c:"D1", t:"관측성 (observability)", d:"시스템 안에서 무슨 일이 있었는지 밖에서 확인할 수 있는 성질임. 모든 통신을 코디네이터로 모으는 이유 중 하나임."},
      {c:"D1", t:"도구 스코핑", d:"에이전트마다 자기 역할에 필요한 도구만 남기는 것임. 역할 밖 도구를 가지고 있으면 결국 사용하게 됨."},
      {c:"D1", t:"세션 (session)", d:"한 작업에서 오간 대화 기록 묶음과 거기 붙은 이름표임. 이어가기(resume)와 나누기(fork)의 단위임."},
      {c:"D1", t:"시나리오 블록", d:"상황 브리핑 하나 아래에 문항 여러 개가 묶여 나오는 실전 출제 형태임. 브리핑은 한 번 읽고 메모로 처리하는 것이 요령임."},
    ].forEach(function(g){
      if(!seen[g.c + "|" + g.t]){ seen[g.c + "|" + g.t] = 1; A.glossary.push(g); }
    });
  }
})();
