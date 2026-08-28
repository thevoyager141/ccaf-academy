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
    id:"p2c0", ch:"OPEN", title:"D2는 시험에서 이렇게 출제됨",
    steps:[

    /* ① 실전 형태 예고 */
    {type:"concept", kind:"PART BRIEFING · 파트 설명", h:"문제는 낱개로 출제되지 않음: 상황 하나에 문항 여러 개가 붙음",
     html:`<p class="lead">D2는 <strong>도구 설계 &amp; MCP 통합</strong>이고 출제 비중은 <strong>18%</strong>임. 60문항 기준 약 열한 문항임. 그런데 이 열한 문항이 따로따로 흩어져 출제되지 않음.</p>
      <h4>실전에서 마주치는 형태</h4>
      <ul>
        <li>먼저 <strong>상황 브리핑</strong>이 한 묶음으로 제시됨. 어떤 팀이 무엇을 만들었고, 무엇이 연결돼 있고, 지금 무엇이 안 되는지가 여기에 들어 있음</li>
        <li>그 아래에 문항이 붙음. 같은 상황을 두고 <strong>서로 다른 내용</strong>을 물음</li>
        <li>따라서 브리핑을 한 번 제대로 읽어 두면 뒤 문항에서는 다시 읽지 않아도 됨. 반대로 대충 읽으면 세 문제를 함께 놓침</li>
      </ul>
      <h4>D2가 주로 출제되는 시나리오 둘</h4>
      <ul>
        <li><strong>고객지원 해결 에이전트</strong>: 사내 시스템 여러 개에 도구로 연결해 환불, 배송, 정책을 처리하는 시나리오임</li>
        <li><strong>개발자 생산성 도구</strong>: 코드베이스를 탐색하고 수정하는 시나리오임. 기본 제공 도구(built-in tools) 6종과 MCP 서버가 여기서 출제됨</li>
        <li>둘 다 <strong>"에이전트가 도구를 잘못 고르거나 실패에서 빠져나오지 못할 때 어디를 고치는가"</strong>를 물음</li>
      </ul>
      <div class="callout">🎯 지금부터 그 형태를 실제로 한 번 확인함. 브리핑 하나를 읽고 문항 셋을 푸는, 실전과 같은 순서로 진행함.</div>`},

    /* ② 시나리오 블록: 브리핑 읽는 법 */
    {type:"concept", kind:"TOPIC · 지문 읽는 법", brief:B, h:"이 박스를 네 부분으로 나눠 읽을 것",
     html:`<p class="lead">위 박스가 실전에서 문항 앞에 제시되는 상황 브리핑임. 아직 문제는 없음. 읽는 순서만 정리함.</p>
      <h4>① 구성: 누가 무엇을 만들었나</h4>
      <ul>
        <li>고객지원 에이전트 하나와 사내 시스템 넷(주문 DB, 결제, 배송, 정책 위키)임</li>
        <li>연결 방식은 <strong>MCP(Model Context Protocol) 서버</strong>임. 도구는 일곱 개임</li>
      </ul>
      <h4>② 증상: 로그에 반복해 기록되는 것</h4>
      <ul>
        <li>배송 질문이 <strong>다른 도구</strong>로 감</li>
        <li>대화 시작마다 <strong>목록 조회를 서너 번</strong> 반복함</li>
        <li>환불 실패가 원인과 무관하게 <strong>항상 같은 응답</strong>으로 돌아옴</li>
      </ul>
      <h4>③ 제약: 선택지를 걸러낼 숫자와 조건</h4>
      <ul>
        <li>목표 FCR 80%, 주당 4,000건, 도구 7개임</li>
        <li>"설명 두 개가 한 줄", "지난달 릴리스 이후", "도구 코드는 바뀌지 않음". 지나가듯 적힌 이 문장들이 대체로 정답의 근거임</li>
      </ul>
      <h4>④ 질문: 어느 증상을 다루나</h4>
      <ul>
        <li>증상이 셋이면 문항도 대체로 셋임. 각각 <strong>다른 개념</strong>을 묻기 위해 의도적으로 배치한 것임</li>
        <li>문항을 읽자마자 할 일은 "이것이 셋 중 어느 증상에 관한 것인가"를 먼저 확인하는 것임</li>
      </ul>
      <div class="callout">📖 낯선 용어가 섞여 있어도 지금은 넘어가도 됨. 이 레슨 뒤쪽에 지도와 용어를 0부터 정리해 둠.</div>`},

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
    {type:"concept", kind:"TOPIC · 블록 복기", h:"같은 브리핑, 서로 다른 세 개의 질문",
     html:`<p class="lead">방금 푼 셋을 다시 보면 상황은 하나인데 묻는 지점이 전부 달랐음. 실전 블록이 정확히 이렇게 구성됨.</p>
      <h4>문항별로 무엇을 물었나</h4>
      <ul>
        <li><strong>Q1: 도구를 고르는 지점</strong>. 배송 질문이 다른 도구로 간 증상임. 모델이 무엇을 보고 도구를 고르는지를 물음 → <strong>Ch 1</strong></li>
        <li><strong>Q2: 도구가 제공되는 지점</strong>. 대화마다 목록 조회를 반복한 증상임. MCP가 내주는 두 종류 중 무엇을 쓰는지를 물음 → <strong>Ch 4</strong></li>
        <li><strong>Q3: 결과가 돌아오는 지점</strong>. 실패가 항상 같은 형태이던 증상임. 실패를 어떻게 돌려줘야 하는지를 물음 → <strong>Ch 2</strong></li>
      </ul>
      <h4>브리핑에서 메모해 둘 것: 다섯 개면 충분함</h4>
      <ul>
        <li>등장한 <strong>도구 이름</strong>과 그 설명이 얼마나 부실한지</li>
        <li><strong>반복되거나 낭비되는 호출</strong>이 있는지</li>
        <li>실패했을 때 <strong>돌아오는 응답의 형태</strong></li>
        <li>목표 수치, 상한, 정책 같은 <strong>제약</strong>(FCR 80%, 도구 7개)</li>
        <li>"지난달 릴리스 이후", "코드는 바뀌지 않음"처럼 <strong>변화 시점</strong>을 알려 주는 문장</li>
      </ul>
      <h4>정답 문장 암기가 통하지 않는 이유</h4>
      <ul>
        <li>정답 문장을 외워 두면 Q1은 맞힐 수 있음. 그러나 Q2와 Q3은 같은 시나리오에서 <strong>다른 지점</strong>을 물으므로 암기가 통하지 않음</li>
        <li>대신 "이 증상은 어느 지점에 관한 것인가"만 정리하면 셋 다 같은 방법으로 풀림</li>
      </ul>
      <div class="callout">🎯 시험장에서 브리핑을 여러 번 다시 읽느라 시간을 쓰는 것이 이 형태에서 자주 틀리는 지점임. 처음 읽을 때 위 다섯 개만 여백에 적어 두면 뒤 문항은 그것으로 모두 처리됨.</div>`},

    /* ④ 개념 지도 */
    {type:"concept", kind:"CONCEPT · 개념 지도", h:"D2 전체를 한 장에 정리함",
     html:`__MAP2:all__<p class="lead">위 그림이 이 파트에서 배울 내용 전부임. 칸마다 챕터가 하나씩 붙어 있음.</p>
      <h4>윗줄: 도구 호출 한 번이 흐르는 순서 (왼쪽에서 오른쪽으로)</h4>
      <ul>
        <li><strong>에이전트 → 도구 선택</strong>: 어느 도구를 호출할지 고르는 지점임. 고르는 재료가 description임 → <strong>Ch 1</strong></li>
        <li><strong>tool_choice</strong>: 고를 자유를 어디까지 줄지 정하는 설정임. auto / any / 특정 지정 → <strong>Ch 3</strong></li>
        <li><strong>호출</strong>: 여기서부터는 에이전트 실행 프로그램이 실제로 호출함</li>
      </ul>
      <h4>가운데: 도구가 제공되는 두 경로 (순서가 아니라 공존)</h4>
      <ul>
        <li><strong>기본 제공 도구 6종</strong> Read · Write · Edit · Bash · Grep · Glob → <strong>Ch 5</strong></li>
        <li><strong>MCP 서버</strong>가 내주는 도구와 리소스, 그리고 설정 파일 두 곳 → <strong>Ch 4</strong></li>
        <li>왼쪽과 오른쪽은 단계가 아님. 한 에이전트가 <strong>양쪽을 동시에</strong> 사용함. 그래서 "MCP 도구를 붙였는데 기본 제공 Grep만 쓴다" 같은 문제가 생김</li>
      </ul>
      <h4>아랫줄: 결과가 돌아오는 경로</h4>
      <ul>
        <li>성공이면 결과가, 실패면 isError와 분류 정보가 대화에 추가돼 에이전트로 돌아옴 → <strong>Ch 2</strong></li>
        <li>돌아온 것을 보고 에이전트가 다음 행동을 고름. 그래서 <strong>돌아오는 형태</strong>가 성능을 좌우함</li>
      </ul>
      <h4>Ch 3은 그림의 어디에 있나</h4>
      <ul>
        <li>윗줄 tool_choice 칸이 <strong>"언제 강제하는가"</strong>에 해당함. "누구에게 어떤 도구를 주는가"(도구 배분)는 가운데 두 경로에서 <strong>무엇을 골라 주는가</strong>의 문제임</li>
      </ul>
      <div class="callout">🎯 문항을 읽고 이 그림에서 해당 위치를 찾을 것. 선택 칸이면 설명 문제, 설정 칸이면 tool_choice 문제, 가운데면 배분과 MCP 문제, 아랫줄이면 에러 설계 문제임.</div>`},

    /* ⑤ 지도에 나온 용어 정리 */
    {type:"concept", kind:"CONCEPT · 용어 0부터", h:"지도에 나온 용어 정리: 전제 없이",
     html:`<p class="lead">위 그림에 나온 단어를 아는 것으로 전제하지 않음. 비유 없이 실제로 무슨 일이 일어나는지로 설명함.</p>
      <h4>도구(tool)란 무엇인가</h4>
      <ul>
        <li>모델에게 코드를 건네주는 것이 아님. 요청을 보낼 때 <strong>기능 설명서 한 장</strong>을 함께 실어 보내는 것임. "get_customer라는 것이 있고, 이메일 주소를 받고, 고객 정보를 돌려준다"는 내용임</li>
        <li>모델이 하는 일은 실행이 아니라 <strong>지목</strong>임. "get_customer를 이 이메일로 호출해 달라"는 문장을 내놓을 뿐임</li>
        <li>실제로 호출하는 것은 <strong>에이전트를 실행하는 프로그램</strong>임. 호출하고, 결과를 받아 대화 기록에 추가해 다시 모델에게 보냄. 여기까지가 한 주기임</li>
        <li>따라서 도구는 "모델이 가진 능력"이 아니라 <strong>"모델이 요청할 수 있는 목록"</strong>임</li>
      </ul>
      <h4>description이 모델의 선택 근거가 되는 이유</h4>
      <ul>
        <li>모델은 도구의 <strong>구현 코드를 볼 수 없음</strong>. 이름, 설명문, 입력 양식 세 가지만 봄</li>
        <li>도구가 일곱 개면 설명문 일곱 장을 나란히 놓고 지금 요청에 맞는 것을 고르는 것임</li>
        <li>설명이 "Retrieves order details" 한 줄이면 옆 도구와 구별할 재료가 없음. <strong>잘못된 선택은 모델의 성능 문제가 아니라 판단 재료가 없어서</strong> 생김</li>
        <li>그래서 D2 문항의 정답이 반복적으로 "설명을 고칠 것"인 것임</li>
      </ul>
      <h4>스키마(schema): 입력 양식</h4>
      <ul>
        <li>도구가 받는 입력을 <strong>표로 적어 둔 것</strong>임. 항목 이름, 타입(문자인지 숫자인지), 필수 여부를 적음</li>
        <li>모델은 이 양식을 보고 값을 채움. 양식이 불분명하면 잘못된 값이 들어옴</li>
        <li>도구 정의는 결국 셋임. <code>name</code> + <code>description</code> + <code>input_schema</code></li>
      </ul>
      <h4>서버, API, 그리고 MCP 서버</h4>
      <ul>
        <li><strong>서버(server)</strong>는 계속 실행된 상태로 요청을 기다리는 프로그램임. <strong>API</strong>는 그 프로그램에 요청을 넣는 창구임</li>
        <li>사내 주문 DB, 결제, 배송은 각각 다른 서버이고 창구도 제각각임. 인증 방식도 응답 형태도 모두 다름</li>
        <li><strong>MCP 서버</strong>는 그 제각각인 창구를 <strong>한 규격으로 덮어 주는 중간 프로그램</strong>임. "사용 가능한 도구는 이것이고 입력 양식은 이렇다"를 표준 형식으로 알려 줌</li>
        <li>에이전트 안에 넣지 않고 따로 두는 이유는 인증과 오류 처리 코드를 에이전트 밖에 모아 두고 <strong>다른 에이전트나 다른 팀원이 그대로 붙여 쓰게</strong> 하기 위함임. 그래서 Jira나 GitHub처럼 흔한 연동은 이미 만들어진 서버를 가져다 씀</li>
        <li>연결하면 그 서버의 도구가 <strong>연결 시점에 한꺼번에</strong> 목록으로 올라옴</li>
      </ul>
      <h4>리소스(resource)와 도구의 차이</h4>
      <ul>
        <li>같은 MCP 서버가 내놓는 <strong>두 번째 종류</strong>임. 도구는 "이것을 실행해 달라"(검색, 환불)이고, 리소스는 "이런 것이 있다"(정책 문서 목록, DB 테이블 구조)임</li>
        <li>리소스는 호출하는 것이 아니라 <strong>이미 제공돼 있는 목록</strong>에 가까움. 그래서 "무엇이 있는지" 확인하려고 도구를 여러 번 호출하던 낭비가 사라짐</li>
        <li>구분 기준 한 줄: <strong>바꾸거나 실행하면 도구, 그냥 보여 주는 것이면 리소스</strong></li>
      </ul>
      <h4>tool_choice와 isError</h4>
      <ul>
        <li><code>tool_choice</code>: 도구를 쓸지 말지를 누가 정하는지에 관한 <strong>API 설정</strong>임. auto는 모델이 정하고, any는 무엇이든 하나는 반드시 호출하게 하고, 특정 지정은 그 도구부터 호출하게 함</li>
        <li><code>isError</code>: 도구가 실패했음을 알리는 표시임. 표시만으로는 부족하고 <strong>어떤 실패인지</strong>가 함께 가야 에이전트가 다음 행동을 고를 수 있음</li>
      </ul>
      <div class="callout">📖 여기 나온 용어는 전부 파트 용어 화면에 한 줄 정의로 정리돼 있음. 레슨을 마친 뒤 <b>📖 이 파트 용어</b> 버튼을 눌러 한 번 확인할 것.</div>`},

    /* ⑥ 학습 순서 */
    {type:"concept", kind:"TOPIC · 학습 순서", h:"이 파트 학습 순서",
     html:`<p class="lead">챕터 다섯 개와 미니테스트로 구성되며 대략 한 시간 반 분량임. 순서대로 진행하되 어디에 시간을 쓸지는 미리 정해 둘 것.</p>
      <h4>학습 순서</h4>
      <ul>
        <li><strong>Ch 1 · 도구 설명 설계</strong>: D2 문항의 절반이 결국 여기로 돌아옴. 가장 오래 붙들 곳임</li>
        <li><strong>Ch 2 · 구조화 에러 응답</strong>: 유형 4분류와 재시도 가능 여부임. 외울 것이 적은데 점수는 확실함</li>
        <li><strong>Ch 3 · 도구 배분과 tool_choice</strong>: auto / any / 특정 지정 셋을 <strong>요구 문장과 짝지어</strong> 익힐 것</li>
        <li><strong>Ch 4 · MCP 서버 통합</strong>: 설정이 어느 파일에 있는가, 직접 만들 것인가 가져다 쓸 것인가, 도구인가 리소스인가. 세 갈래가 전부임</li>
        <li><strong>Ch 5 · 기본 제공 도구 6종</strong>: 상황을 보고 도구를 고르는 즉답 훈련임. 반복이 답임</li>
        <li><strong>D2 미니테스트</strong>: 틀린 것만 다시 볼 것. 오답이 곧 다음에 볼 곳임</li>
      </ul>
      <h4>문항을 만나면 이 순서로</h4>
      <ul>
        <li>① 증상이 <strong>선택</strong>의 문제인지 <strong>실행</strong>의 문제인지 <strong>결과</strong>의 문제인지 구분할 것</li>
        <li>② 지도에서 그 위치를 찾고, 그 챕터의 처방을 떠올릴 것</li>
        <li>③ 선택지 넷을 그 처방과 대조할 것. 지시(프롬프트)로 해결하는 선택지와 새 인프라를 만드는 선택지는 대체로 오답 유도용임</li>
      </ul>
      <h4>이 파트를 풀 때 함께 나오는 이유 카드</h4>
      <ul>
        <li>문항마다 <strong>"이것이 정답인 이유는 무엇인가"</strong>가 하나 더 붙음. 정답을 맞혀도 이유를 고르지 못하면 다음으로 넘어가지 않음</li>
        <li>번거롭지만 근거 없이 찍어서 맞히는 습관을 없애는 장치임. 이유를 고를 수 있으면 처음 보는 지문에서도 같은 방법으로 풀림</li>
      </ul>
      <div class="callout">🎯 이 파트에서 자주 틀리는 지점은 두 가지임. "설명을 고치는 대신 프롬프트로 해결하는 선택지"와 "실패를 하나로 뭉뚱그린 선택지"임. 그 둘만 걸러내도 점수가 크게 움직임.</div>`},
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
      {t:`구조화 출력이 필요하면 "any"를 쓰라고 정해져 있기 때문임`},
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
      {c:"D2", t:"Edit 고유 매칭", d:"Edit은 파일 안에서 유일한 문장을 찾아 바꿈. 같은 문장이 여러 곳에 있으면 실패하며, 그때 Read + Write로 전환함."},
      {c:"D2", t:"점진적 탐색", d:"전부 읽지 말고 Grep으로 진입점을 찾은 뒤 Read로 import를 따라가는 방식임. '전체 파일 먼저 읽기'는 대표적인 오답 선택지임."},
    ];
    add.forEach(function(g){
      if(!have[g.c + "|" + g.t]){ A.glossary.push(g); have[g.c + "|" + g.t] = true; }
    });
  }
})();
