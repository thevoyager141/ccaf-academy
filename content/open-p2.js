/* PART 2 OPENING: D2 오프닝 레슨 + 이유 카드 + 용어 확장
   로드 순서: part2.js · appendix.js 뒤. 추가·보강만 하고 기존 원소는 건드리지 않음. */
(function(){
  if(window.__CCAF_OPEN_P2__) return;      /* 두 번 eval돼도 중복 삽입되지 않게 함 */
  window.__CCAF_OPEN_P2__ = true;

  var C = window.CCAF_CONTENT, A = window.CCAF_APPENDIX;
  if(!C || !C.p2 || !C.p2.lessons) return;

  /* ========== (1) 오프닝 레슨 ========== */

  /* 문항 3개가 공유하는 상황 브리핑. 영어 순수 텍스트이며 HTML 태그를 넣지 않음 */
  var B = {
    title:"SCENARIO ① · CUSTOMER SUPPORT RESOLUTION AGENT",
    body:`Northbay Retail runs a customer support resolution agent built with the Agent SDK. It handles returns, billing disputes and account changes for about 4,000 conversations a week, and the team's target is 80% first-contact resolution. The agent reaches four internal systems through MCP servers: an order database, a payments service, a warehouse shipping API, and an internal policy wiki. Seven tools are exposed, among them get_customer, lookup_order, track_shipment, process_refund, search_policy, list_policy_categories and open_policy_page. Two of those tools carry a one-line description: lookup_order says "Retrieves order details, including delivery status" and track_shipment says "Provides shipment information". Since last month's release three patterns keep showing up in the logs. First, shipment questions such as "where is my package" are answered by lookup_order rather than track_shipment. Second, in almost every conversation the agent spends its first three or four turns calling list_policy_categories and open_policy_page to rediscover how the policy wiki is organised before it answers anything. Third, when process_refund fails it always returns the same payload, an isError flag with the message "refund failed", whether the payments service timed out, the requested amount was larger than the order total, or the return window had already closed. No tool code was changed in that release.`
  };

  var OPEN = {
    id:"p2c0", ch:"OPEN", title:"Part 2 문항의 출제 형태",
    steps:[

    /* ① 실전 형태 예고 */
    {type:"concept", kind:"PART BRIEFING · 파트 설명", h:"문항이 출제되는 형태",
   html:`<h4>① 출제 규모</h4>
<ul>
<li>영역 이름: D2 도구 설계와 MCP 통합</li>
<li>출제 비중 18%. 60문항 기준 약 11문항</li>
</ul>
<h4>② 출제 형태</h4>
<ul>
<li>먼저 브리핑 제시. 어떤 팀이 무엇을 만들었고 무엇이 연결돼 있고 지금 무엇이 안 되는지 포함</li>
<li>브리핑 아래에 문항 여러 개. 같은 상황에서 서로 다른 내용을 질문</li>
<li>브리핑을 한 번 정확히 읽어 두면 뒤 문항에서 다시 읽을 필요 없음</li>
</ul>
<h4>③ 이 영역이 주로 나오는 시나리오</h4>
<table>
<tr><th>시나리오</th><th>내용</th></tr>
<tr><td>고객지원 해결 에이전트</td><td>사내 시스템 여러 개를 도구로 연결해 환불, 배송, 정책 처리</td></tr>
<tr><td>개발자 생산성 도구</td><td>코드를 찾고 고치는 작업. 기본 제공 도구와 MCP 서버 출제</td></tr>
</table>
<ul>
<li>두 시나리오의 공통 질문: 에이전트가 도구를 잘못 고르거나 실패에서 벗어나지 못할 때 고칠 곳</li>
</ul>`},

    /* ② 시나리오 블록: 브리핑 읽는 법 */
    {type:"concept", brief:B, kind:"TOPIC · 지문 읽는 법", h:"브리핑에서 확인할 네 가지",
   html:`<h4>① 구성</h4>
<ul>
<li>고객지원 에이전트 하나와 사내 시스템 넷. 주문 자료, 결제, 배송, 정책 문서</li>
<li>연결 방식: MCP 서버. 도구 7개</li>
</ul>
<h4>② 증상</h4>
<ul>
<li>배송 질문에 다른 도구 호출</li>
<li>대화를 시작할 때마다 목록 조회를 서너 번 반복</li>
<li>환불 실패가 원인과 무관하게 항상 같은 응답</li>
</ul>
<h4>③ 제약</h4>
<ul>
<li>숫자: 첫 문의 해결률 목표 80%, 주당 4,000건, 도구 7개</li>
<li>지나가듯 적힌 문장: "설명 두 개가 한 줄", "지난달 릴리스 이후", "도구 코드는 바뀌지 않음"</li>
<li>이런 문장이 판단의 근거로 쓰이는 경우가 많음</li>
</ul>
<h4>④ 질문</h4>
<ul>
<li>증상이 세 개면 문항도 대체로 세 개</li>
<li>문항을 읽자마자 할 일: 세 증상 중 어느 것에 관한 문항인지 확인</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 브리핑을 읽고 적은 메모</div>
구성: 에이전트 1, 사내 시스템 4, MCP 도구 7<br>
증상 1: 배송 질문에 다른 도구<br>
증상 2: 목록 조회 반복<br>
증상 3: 환불 실패가 항상 같은 응답<br>
<span class="sel">제약: 해결률 80%. 도구 코드는 그대로. 지난달 릴리스 이후 발생</span>
</div>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>MCP 서버</b>: 외부 서비스의 도구를 Claude에 연결해 주는 프로그램</li>
<li><b>첫 문의 해결률(FCR)</b>: 고객이 처음 문의했을 때 해결된 비율</li>
<li><b>릴리스(release)</b>: 프로그램의 새 판을 내보내는 일</li>
</ul>
</div>`},

    /* ②-Q1 도구 description · 잘못된 선택 */
    {type:"quiz", kind:"PRACTICE · 시나리오 실전", brief:B, h:"Q1 — Where the shipment questions go",
     q:`The team wants "where is my package" to reach track_shipment. Four proposals are on the table. Which one removes the cause rather than working around it?`,
     opts:[
       {t:`Rewrite both descriptions so each states the input it expects, two or three example customer questions, and one sentence naming the sibling tool to use instead — the model has nothing else to separate them by.`, ok:true},
       {t:`Delete the phrase "including delivery status" from lookup_order, leaving track_shipment's description untouched.`},
       {t:`Put a classifier in front of the model that labels each incoming message and passes only the matching tool for that label.`},
       {t:`Add a line to the system prompt: whenever a message mentions shipping, delivery or tracking, call track_shipment.`},
     ],
     hint:`두 설명을 나란히 놓고 읽을 것. 모델이 이 둘을 구분할 때 사용할 수 있는 재료가 정확히 무엇인가. 그리고 그 재료가 지난달에 어떻게 달라졌는가.`,
     explain:{
       good:`도구 코드는 그대로인데 행동만 바뀌었다는 것은 바뀐 것이 선택 재료라는 뜻임. 새 도구가 추가되면서 "배송 상태"를 두 설명이 함께 주장하게 됐음. 따라서 양쪽 설명을 모두 고쳐 각자 받는 입력, 예시 질문, 서로를 가리키는 문장까지 넣어야 겹침이 사라짐.`,
       wrongs:[
         `<b>B(한쪽만 삭제):</b> 겹침은 줄지만 track_shipment의 설명은 여전히 한 줄임. 선택돼야 할 도구에 선택될 근거가 생기지 않았으므로 절반만 고친 것임.`,
         `<b>C(앞단 분류기 도입):</b> 설명 두 줄을 고치면 되는 문제에 새 구성요소를 추가하는 과잉 대응임. 분류기 자체도 틀릴 수 있고, 도구가 늘어날 때마다 함께 수정해야 함.`,
         `<b>D(프롬프트 규칙 추가):</b> 특정 단어에 도구를 묶는 지시는 확률적이고, 다음에 겹치는 도구가 또 생기면 규칙을 계속 추가해야 함.`,
       ]},
     principle:"코드가 바뀌지 않았으면 바뀐 것은 선택 재료임",
     why:{ q:`설명을 고치는 것이 첫 조치인 이유는 무엇인가?`,
       opts:[
         {t:`모델이 도구를 고를 때 실제로 읽는 것은 이름, 설명, 입력 양식뿐임. 두 설명이 같은 일을 주장하는 한 구분할 근거 자체가 없음`, ok:true},
         {t:`도구 설명은 서너 문장 이상 쓰라고 공식 문서가 권장하는 정석이기 때문임`},
         {t:`설명 수정은 코드 배포 없이 가능한, 비용이 가장 적게 드는 변경이기 때문임`},
         {t:`도구가 일곱 개나 되면 원래 선택 정확도가 떨어지기 때문임`},
       ],
       explain:`"증상이 어느 재료의 문제인가"를 먼저 물을 것. 선택이 틀렸으면 선택 재료(설명), 실행이 틀렸으면 실행 규칙(설정), 뒤처리가 틀렸으면 응답 구조임. D2 문항 대부분이 이 세 갈래로 갈림.`}},

    /* ②-Q2 MCP 리소스와 도구 */
    {type:"quiz", kind:"PRACTICE · 시나리오 실전", brief:B, h:"Q2 — The three wasted turns",
     q:`Before answering anything, the agent burns three or four turns calling list_policy_categories and open_policy_page to relearn the wiki's structure. The structure itself changes roughly once a month. Which change fits the MCP server's own capabilities best?`,
     opts:[
       {t:`Publish the wiki's structure as an MCP resource the server exposes as browsable content, and keep search_policy as the tool that performs actual lookups.`, ok:true},
       {t:`Fold list_policy_categories and open_policy_page into a single list_policy_tree tool so the same discovery takes one call instead of four.`},
       {t:`Expose search_policy as a resource as well, since everything the agent reads from the wiki should be served the same way.`},
       {t:`Paste the full policy wiki into the system prompt at the start of every conversation so no lookup is needed.`},
     ],
     hint:`MCP 서버가 내놓을 수 있는 것은 도구만이 아님. 지금 그 서너 번의 호출이 무엇을 하고 있는지 확인할 것. 무언가를 실행하는 중인가, 무엇이 있는지 확인하는 중인가.`,
     explain:{
       good:`"무엇이 있는지"를 확인하는 일은 실행이 아니라 열람임. MCP 서버는 그 열람용으로 리소스(resource)를 따로 내줄 수 있고, 카탈로그가 이미 제공돼 있으면 탐색 호출 자체가 필요 없어짐. 실제 조회는 여전히 행동이므로 search_policy는 도구로 남겨 둠.`,
       wrongs:[
         `<b>B(탐색 도구 통합):</b> 네 번이 한 번으로 줄어드는 것은 맞지만 매 대화마다 구조를 다시 확인하는 구조는 그대로임. 낭비의 횟수만 줄인 절반의 해법임.`,
         `<b>C(search_policy도 리소스로):</b> 조건을 받아 결과를 만들어내는 것은 행동임. 이것을 리소스로 옮기면 인자를 받을 자리가 사라짐.`,
         `<b>D(위키를 통째로 프롬프트에):</b> 매 대화마다 쓰지 않을 내용까지 컨텍스트를 채우고, 위키가 커지면 바로 한도에 부딪힘.`,
       ]},
     principle:"실행이면 도구, 열람이면 리소스",
     why:{ q:`리소스가 정답인 이유는 무엇인가?`,
       opts:[
         {t:`목록을 확인하는 일은 무언가를 바꾸거나 실행하는 일이 아님. 호출할 필요 없이 미리 제공해 두는 쪽이 그 성격에 맞음`, ok:true},
         {t:`MCP 규격이 도구와 리소스를 나눠 두었으니 나눠 쓰는 것이 원칙이기 때문임`},
         {t:`탐색 호출이 사라지면 턴 수와 토큰이 줄기 때문임`},
         {t:`정책 위키는 한 달에 한 번 정도만 바뀌는 정적인 자료이기 때문임`},
       ],
       explain:`도구인지 리소스인지는 자주 바뀌는지가 아니라 <b>행동인지 열람인지</b>로 갈림. 이 한 줄이면 "이것을 도구로 만들지 리소스로 낼지" 문항은 모두 정리됨.`}},

    /* ②-Q3 실패 결과 반환 */
    {type:"quiz", kind:"PRACTICE · 시나리오 실전", brief:B, h:"Q3 — One payload for three failures",
     q:`process_refund fails in three distinct ways — a payments timeout, an amount larger than the order total, and a closed return window — and all three come back as the same isError payload. Which redesign lets the agent respond correctly to each?`,
     opts:[
       {t:`Return the failure category and a retryable flag alongside the message: retryable for the timeout, not retryable for the oversized amount with the offending field named, and not retryable for the closed window with wording the agent can read out to the customer.`, ok:true},
       {t:`Keep the payload shape but write a detailed sentence for each cause, and let the agent work out from the wording whether retrying makes sense.`},
       {t:`Have the agent retry any failed refund three times before it says anything to the customer.`},
       {t:`Return the closed-window case as a successful call with an empty result, since a policy outcome is not a system failure.`},
     ],
     hint:`실패를 받은 에이전트가 그다음에 할 수 있는 행동이 몇 가지인가. 그 갈래를 세어 보고, 지금 응답에 그 갈래를 구분할 정보가 있는지 확인할 것.`,
     explain:{
       good:`실패 뒤 에이전트가 고를 수 있는 행동은 세 갈래임. 그대로 다시 시도, 입력을 고쳐서 다시 시도, 고객에게 설명하고 종료임. 지금 응답에는 그 셋을 구분할 정보가 하나도 없음. 도구가 실패 유형과 재시도 가능 여부를 함께 실어 보내야 에이전트가 상황에 맞는 행동을 고를 수 있음.`,
       wrongs:[
         `<b>B(문장만 자세히):</b> 사람이 읽기에는 나아지지만 기계가 분기할 필드는 여전히 없음. 문구 해석에 기대는 것은 확률에 기대는 것임.`,
         `<b>C(무조건 3회 재시도):</b> 금액 초과와 기간 만료는 몇 번을 보내도 결과가 같음. 고객을 기다리게 하는 낭비임.`,
         `<b>D(성공으로 반환):</b> 환불이 되지 않았는데 성공으로 보이면 에이전트가 "처리됐다"고 안내함. 가장 위험한 선택지임.`,
       ]},
     principle:"실패는 분류와 함께 돌려줌: 받는 쪽이 행동을 고를 수 있게 함",
     why:{ q:`응답 구조를 바꾸는 것이 정답인 이유는 무엇인가?`,
       opts:[
         {t:`실패 뒤 갈라져야 할 행동이 셋인데 지금 응답에는 그 셋을 구분할 정보가 전혀 없음. 에이전트가 판단할 재료를 도구가 제공해야 함`, ok:true},
         {t:`MCP 도구는 실패할 때 isError를 붙이게 되어 있는 것이 규격이기 때문임`},
         {t:`같은 응답이 계속 돌아오면 재시도가 반복돼 토큰이 낭비되기 때문임`},
         {t:`반품 기간이 지난 고객에게는 안내 문구를 보여 줘야 응대 품질이 유지되기 때문임`},
       ],
       explain:`실패 응답을 볼 때는 <b>"이것을 받은 쪽이 다음에 무엇을 할 수 있는가"</b>를 물을 것. 이 질문 하나로 에러 설계 문항은 D2든 D5든 모두 풀림.`}},

    /* ③ 블록 복기 */
    {type:"concept", kind:"TOPIC · 블록 복기", h:"정리: 같은 브리핑, 다른 질문 세 개",
   html:`<h4>① 문항별 내용</h4>
<table>
<tr><th>문항</th><th>증상</th><th>물어본 내용</th><th>해당 챕터</th></tr>
<tr><td>Q1</td><td>배송 질문에 다른 도구</td><td>Claude가 도구를 고르는 근거</td><td>CH 1</td></tr>
<tr><td>Q2</td><td>목록 조회 반복</td><td>MCP 서버가 제공하는 두 종류 중 맞는 쪽</td><td>CH 4</td></tr>
<tr><td>Q3</td><td>실패가 항상 같은 응답</td><td>실패를 돌려주는 형식</td><td>CH 2</td></tr>
</table>
<h4>② 브리핑에서 메모할 다섯 가지</h4>
<ul>
<li>도구 이름과 설명의 분량</li>
<li>반복되거나 낭비되는 호출</li>
<li>실패했을 때 돌아오는 응답의 형태</li>
<li>목표 수치와 상한 같은 제약</li>
<li>"지난달 릴리스 이후"처럼 변화 시점을 알려 주는 문장</li>
</ul>
<h4>③ 정답 문장 암기의 한계</h4>
<ul>
<li>같은 시나리오에서 문항마다 다른 지점을 질문. 암기한 문장은 한 문항에만 통함</li>
<li>통하는 방법: 증상이 선택, 제공, 결과 중 어느 지점의 문제인지 구분</li>
</ul>`},

    /* ④ 개념 지도 */
    {type:"concept", kind:"CONCEPT · 개념 지도", h:"이 파트 전체 지도",
   html:`__MAP2:all__
<h4>① 윗줄: 도구 호출 한 번의 순서</h4>
<table>
<tr><th>칸</th><th>뜻</th><th>챕터</th></tr>
<tr><td>도구 선택</td><td>어느 도구를 호출할지 고르는 지점. 근거는 도구 설명</td><td>CH 1</td></tr>
<tr><td>tool_choice</td><td>고를 자유를 어디까지 줄지 정하는 설정</td><td>CH 3</td></tr>
<tr><td>호출</td><td>에이전트를 돌리는 프로그램이 실제로 실행</td><td></td></tr>
</table>
<h4>② 가운데: 도구가 제공되는 두 경로</h4>
<table>
<tr><th>경로</th><th>내용</th><th>챕터</th></tr>
<tr><td>기본 제공 도구</td><td>Read, Write, Edit, Bash, Grep, Glob</td><td>CH 5</td></tr>
<tr><td>MCP 서버</td><td>서버가 제공하는 도구와 리소스. 설정 범위 세 가지</td><td>CH 4</td></tr>
</table>
<ul>
<li>두 경로는 순서가 아니라 함께 쓰는 관계</li>
</ul>
<h4>③ 아랫줄: 결과가 돌아오는 경로</h4>
<ul>
<li>성공이면 결과, 실패면 실패 표시와 종류 정보가 대화 기록에 추가. CH 2의 내용</li>
<li>Claude는 돌아온 내용을 보고 다음 행동 선택. 돌아오는 형식이 결과를 좌우</li>
</ul>
<h4>④ 문항 위치 찾기</h4>
<table>
<tr><th>문항이 다루는 곳</th><th>문제의 종류</th></tr>
<tr><td>선택 칸</td><td>도구 설명</td></tr>
<tr><td>설정 칸</td><td>tool_choice</td></tr>
<tr><td>가운데</td><td>도구 배분과 MCP</td></tr>
<tr><td>아랫줄</td><td>오류 응답 설계</td></tr>
</table>`},

    /* ⑤ 지도에 나온 용어 정리 */
    {type:"concept", kind:"CONCEPT · 용어 0부터", h:"지도에 나온 용어 정리",
   html:`<h4>① 도구</h4>
<ul>
<li>요청을 보낼 때 함께 보내는 기능 설명서. 예: "get_customer라는 도구가 있고 이메일 주소를 받아 고객 정보를 돌려준다"</li>
<li>Claude가 하는 일은 실행이 아니라 지목. "get_customer를 이 이메일로 호출해 달라"는 요청 작성</li>
<li>실행은 에이전트를 돌리는 프로그램이 담당. 결과를 대화 기록에 추가해 다시 Claude에 전송</li>
<li>도구는 Claude의 능력이 아니라 Claude가 요청할 수 있는 목록</li>
</ul>
<h4>② 도구 설명이 선택의 근거인 이유</h4>
<ul>
<li>Claude가 보는 내용: 도구 이름, 설명, 입력 양식</li>
<li>도구가 7개면 설명 7개를 놓고 지금 요청에 맞는 것을 선택</li>
<li>설명이 한 줄이면 비슷한 도구와 구분할 근거 없음</li>
</ul>
<h4>③ 스키마</h4>
<ul>
<li>도구가 받는 입력값의 양식. 항목 이름, 값의 종류, 필수 여부</li>
<li>도구 정의의 세 항목: name, description, input_schema</li>
</ul>
<h4>④ 서버, API, MCP 서버</h4>
<ul>
<li>서버: 계속 켜진 상태로 요청을 기다리는 프로그램</li>
<li>API: 그 프로그램에 요청을 넣는 통로</li>
<li>사내의 주문, 결제, 배송 시스템은 각각 다른 서버. 요청 방식과 응답 형태가 서로 다름</li>
<li>MCP 서버: 서로 다른 통로를 한 가지 방식으로 맞춰 주는 중간 프로그램. 쓸 수 있는 도구와 입력 양식을 표준 형식으로 제공</li>
<li>널리 쓰는 서비스는 이미 만들어진 MCP 서버 사용</li>
</ul>
<h4>⑤ 리소스와 도구</h4>
<table>
<tr><th>종류</th><th>뜻</th><th>예</th></tr>
<tr><td>도구</td><td>실행하거나 바꾸는 기능</td><td>검색, 환불</td></tr>
<tr><td>리소스(resource)</td><td>읽을 수 있게 제공되는 자료</td><td>정책 문서 목록, 자료 구조</td></tr>
</table>
<ul>
<li>리소스를 쓰면 무엇이 있는지 확인하려고 도구를 여러 번 호출하는 낭비 감소</li>
</ul>
<h4>⑥ tool_choice와 isError</h4>
<ul>
<li>tool_choice: 도구를 호출할지와 어떤 도구를 호출할지 정하는 설정</li>
<li>isError: 도구가 실패했다는 표시. 어떤 실패인지가 함께 전달돼야 다음 행동 선택 가능</li>
<li>이 파트의 용어 전체: 레슨 화면 아래의 "이 파트 용어" 버튼</li>
</ul>`},

    /* ⑥ 학습 순서 */
    {type:"concept", kind:"TOPIC · 학습 순서", h:"이 파트 학습 순서",
   html:`<h4>① 챕터 순서</h4>
<table>
<tr><th>챕터</th><th>익히는 내용</th></tr>
<tr><td>CH 1 도구 설명</td><td>설명 작성 기준. 이 영역 문항의 절반이 관련</td></tr>
<tr><td>CH 2 오류 응답</td><td>오류 네 종류와 재시도 여부</td></tr>
<tr><td>CH 3 도구 배분과 호출 설정</td><td>auto, any, 도구 이름 지정을 요구 수준과 연결</td></tr>
<tr><td>CH 4 MCP 서버 연결</td><td>설정 범위, 만들지 가져다 쓸지, 도구인지 리소스인지</td></tr>
<tr><td>CH 5 기본 제공 도구</td><td>상황을 보고 도구 고르기</td></tr>
<tr><td>CH 6 서버 도구와 Agent Skills</td><td>도구가 실행되는 장소. 보충 내용</td></tr>
</table>
<h4>② 문항을 푸는 순서</h4>
<ul>
<li>1단계: 증상이 선택, 실행, 결과 중 어느 지점의 문제인지 구분</li>
<li>2단계: 지도에서 그 위치와 챕터 확인</li>
<li>3단계: 선택지를 그 챕터의 해결 방법과 대조</li>
<li>프롬프트 지시로 해결하는 선택지와 새 장치를 만드는 선택지는 맞지 않는 경우가 많음</li>
</ul>
<h4>③ 이유 카드</h4>
<ul>
<li>문항마다 "이 답이 맞는 이유"를 고르는 단계 추가</li>
<li>목적: 근거 없이 고르는 습관 방지. 이유를 고를 수 있으면 처음 보는 문항도 같은 방법으로 해결</li>
</ul>
<h4>④ 자주 틀리는 두 가지</h4>
<ul>
<li>도구 설명을 고치지 않고 프롬프트로 해결하는 선택지</li>
<li>여러 실패를 하나로 합쳐서 돌려주는 선택지</li>
</ul>`},
  ]};

  if(!C.p2.lessons.some(function(l){ return l.id === "p2c0"; })){
    C.p2.lessons.unshift(OPEN);
  }

  /* ========== (2) 기존 레슨 연습 문제에 이유 카드 붙이기 ========== */
  var find = function(id){ return C.p2.lessons.find(function(l){ return l.id === id; }); };
  var q = function(id, n){
    var L = find(id);
    if(!L || !L.steps) return null;
    return L.steps.filter(function(s){ return s.type === "quiz"; })[n];
  };
  var setWhy = function(id, n, w){ var s = q(id, n); if(s && !s.why) s.why = w; };

  /* --- Ch 1 --- */
  setWhy("p2c1", 0, {
    q:`두 설명을 모두 고치는 것이 첫 조치인 이유는 무엇인가?`,
    opts:[
      {t:`코드가 아니라 도구 목록이 바뀐 상황임. 두 설명이 같은 일을 주장하는 한 모델에게는 구분할 근거가 없으므로 한쪽만 고쳐서는 해결되지 않음`, ok:true},
      {t:`도구 설명에는 경계 문장을 넣는 것이 권장 서식이기 때문임`},
      {t:`도구 수가 늘면 선택 정확도가 떨어지는 것이 알려진 현상이기 때문임`},
      {t:`라우팅 레이어를 새로 만들면 유지보수 비용이 늘어나기 때문임`},
    ],
    explain:`증상이 <b>언제부터</b> 시작됐는지가 원인을 알려 줌. 무엇이 바뀌었는지 먼저 찾고, 바뀐 그 재료를 고치는 것이 순서임.`});

  setWhy("p2c1", 1, {
    q:`도구 하나를 셋으로 나누는 것이 정답인 이유는 무엇인가?`,
    opts:[
      {t:`도구 하나가 서로 다른 결과 세 가지를 낼 수 있으면 이름도 설명도 "호출하면 무엇이 돌아오는가"를 약속하지 못하기 때문임`, ok:true},
      {t:`도구는 한 가지 일만 하게 만드는 것이 좋은 설계라고 배웠기 때문임`},
      {t:`mode 같은 파라미터를 늘리면 입력 양식이 복잡해지기 때문임`},
      {t:`목적별 이름을 쓰면 로그에서 어떤 요청이었는지 확인하기 좋기 때문임`},
    ],
    explain:`<b>"이 도구를 호출하면 무엇이 돌아오는가"</b>에 한 문장으로 답할 수 없으면 그 도구는 나눌 대상임. 선택 정확도와 사용 정확도가 함께 올라감.`});

  /* --- Ch 2 --- */
  setWhy("p2c2", 0, {
    q:`전부 재시도 가능으로 두면 안 되는 이유는 무엇인가?`,
    opts:[
      {t:`오타처럼 입력이 잘못된 실패는 같은 요청을 다시 보내도 결과가 바뀌지 않음. 그 사실을 아는 쪽은 도구이므로 도구가 알려 줘야 함`, ok:true},
      {t:`에러를 네 가지로 분류하는 것이 표준이기 때문임`},
      {t:`네 번씩 재시도하면 응답이 느려지고 토큰이 낭비되기 때문임`},
      {t:`고객에게 코드를 다시 확인해 달라고 말하는 편이 응대상 더 친절하기 때문임`},
    ],
    explain:`<b>"다시 보내면 결과가 달라질 실패인가"</b>로 재시도 여부가 갈림. 달라지지 않을 실패에는 재시도가 아니라 다른 행동이 필요함.`});

  setWhy("p2c2", 1, {
    q:`현재 응답 형태가 문제인 이유는 무엇인가?`,
    opts:[
      {t:`조회 자체를 못 한 경우와 조회는 됐는데 결과가 없는 경우가 같은 형태로 나옴. 받는 쪽이 둘을 구분할 방법이 전혀 없음`, ok:true},
      {t:`타임아웃은 원래 에러로 처리하게 되어 있기 때문임`},
      {t:`장애 중에 "주문이 없다"고 안내하면 고객이 항의하기 때문임`},
      {t:`빈 결과를 성공으로 반환하면 재시도가 일어나지 않기 때문임`},
    ],
    explain:`한 가지 응답 형태가 두 가지 사건을 뜻하고 있으면 그 자체가 결함임. 성공과 실패뿐 아니라 <b>"없음"</b>도 별개 사건으로 구분해야 함.`});

  /* --- Ch 3 --- */
  setWhy("p2c3", 0, {
    q:`지시를 더 강하게 쓰는 것으로는 해결되지 않는 이유는 무엇인가?`,
    opts:[
      {t:`"auto"에서는 텍스트로 답하는 것이 애초에 허용된 행동임. 지시로 줄일 수는 있어도 없앨 수는 없음`, ok:true},
      {t:`구조화된 출력이 필요하면 "any"를 쓰라고 정해져 있기 때문임`},
      {t:`4%면 무시하고 넘어갈 수 없는 실패율이기 때문임`},
      {t:`뒤에 붙은 파서가 JSON만 받도록 만들어져 있기 때문임`},
    ],
    explain:`설정이 허용한 행동은 지시로 막을 수 없음. <b>"지시했는데도 몇 %가 남는다"</b>는 문장이 보이면 프롬프트가 아니라 설정을 먼저 확인할 것.`});

  setWhy("p2c3", 1, {
    q:`"any"로는 부족하고 특정 도구 지정이어야 하는 이유는 무엇인가?`,
    opts:[
      {t:`요구가 "도구를 호출하라"가 아니라 "이 도구를 먼저"임. 그 순서를 보장하는 설정이 특정 지정 하나뿐임`, ok:true},
      {t:`순서가 중요한 작업에는 강제 지정을 쓰라고 가이드에 나와 있기 때문임`},
      {t:`손상된 레코드 9%는 나중에 되돌리는 비용이 크기 때문임`},
      {t:`도구 목록에 적은 순서로는 실행 순서를 정할 수 없기 때문임`},
    ],
    explain:`보장 수단은 <b>요구의 강도</b>에 맞춰 고를 것. "무엇이든 하나"와 "반드시 이것"은 필요한 설정이 다름.`});

  /* --- Ch 4 --- */
  setWhy("p2c4", 0, {
    q:`설정 위치를 옮기는 것이 정답인 이유는 무엇인가?`,
    opts:[
      {t:`"팀장 기계에서만 동작한다"는 증상 자체가 설정이 개인 파일에 있다는 증거임. 개인 파일은 저장소를 통해 다른 사람에게 전달되지 않음`, ok:true},
      {t:`팀이 공유하는 설정은 .mcp.json에 두는 것이 원칙이기 때문임`},
      {t:`새 사람이 올 때마다 손으로 설정하면 온보딩이 느려지기 때문임`},
      {t:`저장소에 토큰을 올리면 보안 사고가 나기 때문임`},
    ],
    explain:`<b>"누구는 되고 누구는 안 된다"</b>가 나오면 스코프 문제임. 어느 파일에 적혀 있는지부터 찾으면 처방이 따라 나옴.`});

  setWhy("p2c4", 1, {
    q:`더 강력한 도구가 선택되지 않은 이유는 무엇인가?`,
    opts:[
      {t:`모델에게 그 도구의 능력을 알려 주는 것은 설명문뿐인데 거기에 능력이 하나도 적혀 있지 않음. 그래서 상대적으로 Grep이 더 나은 후보로 보임`, ok:true},
      {t:`MCP 도구는 설명을 자세히 쓰라고 문서가 권장하기 때문임`},
      {t:`심볼을 이해하는 검색이 단순 텍스트 검색보다 정확하기 때문임`},
      {t:`Grep을 제거하면 단순 텍스트 검색이 맞는 작업까지 막히기 때문임`},
    ],
    explain:`도구가 선택되지 않을 때 고칠 곳은 도구의 성능이 아니라 <b>도구가 스스로를 소개하는 문장</b>임. 기본 제공 도구든 MCP 도구든 같은 기준으로 경쟁함.`});

  /* --- Ch 5 --- */
  setWhy("p2c5", 0, {
    q:`내용 검색으로 시작하는 계획이 맞는 이유는 무엇인가?`,
    opts:[
      {t:`바꿀 대상이 코드, 설정, 문자열에 흩어져 있어 파일 이름이나 import 관계로는 전부를 모을 수 없음. 내용을 직접 훑는 검색만 빠짐없이 찾아냄`, ok:true},
      {t:`Grep으로 찾고 Read로 확인하고 Edit으로 고치는 것이 코드 수정의 표준 순서이기 때문임`},
      {t:`일괄 치환은 잘못 바뀌었을 때 되돌리기 어렵기 때문임`},
      {t:`900개 파일을 다 읽으면 컨텍스트 한도를 넘기기 때문임`},
    ],
    explain:`<b>"빠짐없이"</b>가 요구되면 무엇을 기준으로 훑는지를 확인할 것. 이름 기준과 관계 기준은 항상 누락이 생기고, 내용 기준만 전수 조사가 됨.`});

  setWhy("p2c5", 1, {
    q:`Read + Write가 맞는 대응인 이유는 무엇인가?`,
    opts:[
      {t:`Edit이 실패한 이유가 그 문장이 파일 안에서 유일하지 않아서임. 파일 전체를 다루면 "넷 중 어느 것"인지 지목할 수 있게 됨`, ok:true},
      {t:`Edit이 실패하면 Read + Write로 가라고 정해져 있기 때문임`},
      {t:`일괄 치환을 쓰면 바꾸면 안 되는 세 곳까지 바뀌기 때문임`},
      {t:`자동화를 사람 손에 넘기기에는 아직 이른 단계이기 때문임`},
    ],
    explain:`실패 메시지가 밝힌 원인(유일하지 않음)을 <b>없애는 쪽</b>으로 고를 것. 기준 문장을 더 줄이거나 범위를 넓히는 것은 반대 방향임.`});

  /* ========== (3) 용어사전 확장: D2 ========== */
  if(A && Array.isArray(A.glossary)){
    var have = {};
    A.glossary.forEach(function(g){ have[g.c + "|" + g.t] = true; });
    var add = [
      {c:"D2", t:"도구 (tool)", d:"요청에 함께 실어 보내는 기능 설명서 한 장임. 모델은 '이것을 이 입력으로 호출해 달라'고 지목만 하고, 실제 실행과 결과 전달은 에이전트 실행 프로그램이 함."},
      {c:"D2", t:"도구 정의 3요소", d:"name + description + input_schema임. 모델이 볼 수 있는 도구의 전부이므로, 여기에 없는 정보는 모델에게 존재하지 않는 것과 같음."},
      {c:"D2", t:"input_schema (입력 스키마)", d:"도구가 받는 입력의 양식임. 항목 이름, 타입, 필수 여부를 적어 두면 모델이 그 양식대로 값을 채움."},
      {c:"D2", t:"도구 이름 규칙", d:"영숫자, 하이픈, 언더스코어로 1~64자임. 공백이나 점은 쓸 수 없으므로 지문에 규칙에 어긋난 이름이 나오면 확인할 지점임."},
      {c:"D2", t:"오선택 (tool misselection)", d:"맞는 도구가 있는데 다른 도구가 호출되는 것임. 원인은 대체로 설명이 겹치거나 비어 있는 것이며, 모델의 성능 문제가 아니라 판단 재료의 문제임."},
      {c:"D2", t:"경계 설명", d:"설명 안에 '이런 경우에는 저 도구를 쓸 것'을 적어 두는 문장임. 비슷한 도구끼리 겹칠 때의 표준 처방임."},
      {c:"D2", t:"범용 도구 분할", d:"한 도구가 여러 일을 하면 목적별로 나누는 것임. 이름과 설명이 곧 입출력 계약이 되므로 선택과 사용이 함께 정확해짐."},
      {c:"D2", t:"제약된 대안 도구", d:"위험한 범용 도구를 검증이 붙은 좁은 도구로 교체하는 것임(fetch_url을 내부 문서만 받는 load_document로 교체). 지시가 아니라 계약으로 막는 방식임."},
      {c:"D2", t:"스코프드 액세스", d:"역할에 필요한 도구만 주는 것임. 도구가 많아질수록 선택 신뢰도가 떨어지고 전문 영역 밖 도구는 오용됨."},
      {c:"D2", t:"85/15 배분 패턴", d:"교차 요구의 대다수에는 좁은 전용 도구를 직접 주고, 드물게 필요한 나머지는 기존 코디네이터 경로로 보내는 배분임."},
      {c:"D2", t:`tool_choice "none"`, d:"도구를 아예 사용하지 못하게 하는 네 번째 값임. 도구를 주지 않았을 때의 기본값이므로 선택지에 나와도 없는 기능이 아님."},
      {c:"D2", t:"forced tool selection (특정 도구 강제)", d:"이름을 지정해 그 도구부터 호출하게 하는 설정임. 'A가 반드시 먼저'라는 선행 순서를 보장하는 유일한 수단임."},
      {c:"D2", t:"에러 4분류", d:"transient 일시, validation 입력, business 정책, permission 권한임. 같은 입력을 다시 보내 결과가 달라질 수 있는 것은 사실상 첫째뿐임."},
      {c:"D2", t:"접근 실패 vs 빈 결과", d:"조회를 하지 못한 것과 조회했으나 결과가 없는 것임. 같은 형태로 반환하면 에이전트가 장애 중에 '없다'고 안내하게 됨."},
      {c:"D2", t:"MCP 서버", d:"사내 시스템마다 다른 창구를 한 규격으로 덮어 주는 별도 프로그램임. 인증과 오류 처리를 에이전트 밖에 모아 두고 팀이 같은 것을 재사용함."},
      {c:"D2", t:".mcp.json (프로젝트 스코프)", d:"저장소에 커밋되는 MCP 설정임. 클론하면 팀 전원이 같은 서버를 얻으므로 팀 공용 도구는 여기에 둠."},
      {c:"D2", t:"~/.claude.json (사용자 스코프)", d:"자기 기계에만 있는 MCP 설정임. 개인 실험용이라 다른 사람에게 전달되지 않으며, '한 사람에게만 동작하는' 증상의 원인임."},
      {c:"D2", t:"환경변수 확장", d:"설정 파일에는 이름표만 적고 값은 각자 기계에서 채우는 방식임. 비밀키를 저장소에 올리지 않고도 설정을 공유하는 방법임."},
      {c:"D2", t:"도구 발견 (discovery)", d:"연결된 모든 MCP 서버의 도구가 연결 시점에 한꺼번에 목록으로 올라오는 것임. 하나씩 켜고 끄는 방식이 아님."},
      {c:"D2", t:"커뮤니티 서버 vs 커스텀 서버", d:"Jira나 GitHub 같은 표준 연동은 이미 만들어진 것을 가져다 쓰고, 직접 만드는 것은 팀 고유 워크플로에만 적용함."},
      {c:"D2", t:"Edit 고유 매칭", d:"Edit은 파일 안에서 유일한 문장을 찾아 바꿈. 같은 문장이 여러 곳에 있으면 실패함. 그때는 앞뒤 내용을 포함한 더 긴 문장을 지정하거나 Read + Write로 전환함."},
      {c:"D2", t:"점진적 탐색", d:"전부 읽지 말고 Grep으로 진입점을 찾은 뒤 Read로 import를 따라가는 방식임. '전체 파일 먼저 읽기'는 대표적인 오답 선택지임."},
    ];
    add.forEach(function(g){
      if(!have[g.c + "|" + g.t]){ A.glossary.push(g); have[g.c + "|" + g.t] = true; }
    });
  }
})();
