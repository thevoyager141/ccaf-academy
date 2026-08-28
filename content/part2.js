/* PART 2 · 도구 설계 & MCP 통합 (D2, 18%) */
window.CCAF_CONTENT.p2 = {
  id: "p2",
  lessons: [

  /* ===== CH 1 · 2.1 도구 설명 설계 ===== */
  { id:"p2c1", ch:"CH 1", title:"도구 인터페이스와 설명 설계 (2.1)",
    steps:[
      {type:"concept", kind:"PART BRIEFING · 파트 설명", h:"PART 02 · 도구 설계와 MCP 통합",
       html:`<p class="lead">이 파트가 다루는 시험 영역은 <strong>Tool Design & MCP Integration</strong>임.</p>
        <h4>파트 프로필</h4>
        <ul>
          <li>출제 비중: <strong>18%</strong>, 약 11문항</li>
          <li>구성: 챕터 5개와 미니테스트, 약 1.5시간 (세션 S6~S7)</li>
          <li>출제 형태: 문제 상황을 제시하고 <strong>무엇을 먼저 고칠 것인가</strong>를 묻는 문항이 대부분임. 도구 설명 수정, 설정 변경, 인프라 추가 중 무엇이 원인을 고치는 조치인지 구분하지 못하면 정답률이 크게 떨어짐</li>
        </ul>
        <h4>다루는 범위</h4>
        <ul>
          <li><strong>도구 설명(description) 설계</strong>: 에이전트가 도구(tool)를 고르는 원리 (Ch1)</li>
          <li><strong>구조화 에러 응답</strong>: 실패의 종류를 에이전트가 알아볼 수 있게 반환하는 방법 (Ch2)</li>
          <li><strong>도구 배분과 tool_choice</strong>: 어떤 역할에 어떤 도구를 주는가 (Ch3)</li>
          <li><strong>MCP 서버(MCP server) 통합</strong>: 설정을 어느 위치에 두는가 (Ch4)</li>
          <li><strong>기본 제공 도구(built-in tools) 6종</strong>: Grep/Glob/Read/Write/Edit/Bash (Ch5)</li>
        </ul>
        <div class="callout">🎯 이 파트의 공통 질문: <b>"에이전트가 도구를 잘못 고르거나 실패에서 회복하지 못할 때 무엇을 먼저 고쳐야 하는가."</b> 정답은 대부분 인프라를 새로 붙이는 쪽이 아니라 도구 설명과 응답 구조를 고치는 쪽임.</div>`},
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"에이전트는 description을 읽고 도구를 고른다",
       html:`<h4>도구 선택의 원리</h4>
        <ul>
          <li>LLM이 여러 도구(tool) 중 하나를 고를 때 쓰는 주된 근거는 <strong>도구 설명(description)</strong>임</li>
          <li>설명이 한 줄뿐이면("Retrieves customer information") 기능이 비슷한 도구끼리 <strong>잘못 선택</strong>되는 일이 생김</li>
          <li>모델은 도구의 구현 코드를 볼 수 없음. 모델이 판단에 쓰는 정보는 설명 문장이 전부임</li>
        </ul>
        <h4>좋은 설명에 들어가는 네 가지</h4>
        <ul>
          <li><strong>입력 형식</strong>: 이 도구가 받는 값이 이메일인지, 주문번호인지, 고객 ID인지를 밝힘</li>
          <li><strong>예시 질의</strong>: 어떤 요청이 들어왔을 때 이 도구를 쓰는지를 보여 줌</li>
          <li><strong>예외 상황(edge case)</strong>: 입력이 애매할 때 도구가 어떻게 동작하는지를 적음</li>
          <li><strong>경계 설명</strong>: 기능이 비슷한 다른 도구 대신 이 도구를 쓰는 조건이 무엇인지를 밝힘</li>
        </ul>
        <h4>공식 문서의 구체 기준</h4>
        <ul>
          <li>도구 설명은 최소 <strong>3~4문장</strong>으로 쓰고, 복잡한 도구는 그보다 길게 씀. 공식 문서는 도구 설명을 도구 성능을 좌우하는 가장 중요한 요소로 명시함</li>
          <li>도구 이름 규칙: 영숫자와 하이픈, 언더스코어로 1~64자 (<code>^[a-zA-Z0-9_-]{1,64}$</code>)</li>
          <li>도구 정의 3요소: <code>name</code>, <code>description</code>, <code>input_schema</code>(입력 스키마(schema), JSON 형식으로 씀)</li>
        </ul>
        <div class="callout">📖 용어 카드. <b>description</b>: 도구 정의에 함께 넣는 설명문임. 사람이 읽는 문서가 아니라 <b>모델이 도구를 고를 때 읽는 판단 근거</b>임.</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"도구가 잘못 선택될 때 고치는 순서",
       html:`__MAP2:desc__<h4>① 첫 조치는 언제나 설명 보강</h4>
        <ul>
          <li>증상: "check my order #12345"라는 요청에 get_customer가 호출됨. 두 도구의 설명이 모두 한 줄짜리인 상태임</li>
          <li>조치: 입력 형식, 예시 질의, 경계 조건을 넣어 <strong>설명을 늘림</strong>. 비용이 가장 적게 들면서 효과가 큰 첫 조치임</li>
          <li>few-shot 예시를 추가하거나 라우팅 레이어를 새로 만드는 방법은 원인인 빈약한 설명을 그대로 둔 채 비용만 늘림</li>
        </ul>
        <h4>② 기능이 겹치면 이름부터 구분함</h4>
        <ul>
          <li>analyze_content와 analyze_document의 설명이 거의 같으면 모델이 둘을 구분하지 못함</li>
          <li>조치: <strong>이름을 바꾸고 설명을 구체화함</strong> (analyze_content를 extract_web_results로 변경)</li>
        </ul>
        <h4>③ 범용 도구는 목적별로 나눔</h4>
        <ul>
          <li>범용 도구 analyze_document 하나를 <strong>extract_data_points / summarize_content / verify_claim_against_source</strong>로 나눔</li>
          <li>무엇을 받아 무엇을 돌려주는지가 명확한 도구일수록 선택도 사용도 정확해짐</li>
        </ul>
        <h4>④ 시스템 프롬프트의 키워드 간섭 점검</h4>
        <ul>
          <li>"문서와 관련된 요청은 꼼꼼히 분석할 것" 같은 지시문이 특정 도구와 <strong>의도하지 않은 연결</strong>을 만들 수 있음</li>
          <li>잘 쓴 도구 설명을 시스템 프롬프트가 덮어쓰지 않는지 확인이 필요함</li>
        </ul>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"실전 진단 1 · 새 도구를 추가한 뒤 기존 도구가 잘못 선택됨",
       q:`lookup_order routed reliably for months. Last week the team added track_shipment ("Provides shipment and delivery information for orders"), and since then lookup_order — described as "Retrieves order details including delivery status" — receives half of the shipment questions, while track_shipment sometimes grabs refund-related order queries. Neither tool changed its code. What is the most effective first step?`,
       opts:[
         {t:`Revise both descriptions to remove the overlap and add boundary clauses — which query types belong to each tool, with example queries and an explicit "use X instead when..." line.`, ok:true},
         {t:`Roll back track_shipment until a dedicated routing layer can be built to classify queries before tool selection.`},
         {t:`Add few-shot examples to the system prompt showing shipment questions routing to track_shipment, expanding the set as new confusions appear.`},
         {t:`Merge both tools into one order_info tool, since two tools touching the same domain will always confuse the model.`},
       ],
       hint:`두 도구의 설명을 나란히 놓고 볼 것. "delivery status"가 양쪽에 모두 들어 있음. 코드는 그대로인데 동작이 달라진 이유는 모델이 보는 선택 근거가 달라졌기 때문임.`,
       explain:{
         good:`새 도구를 추가하면서 두 설명이 delivery라는 같은 기능을 가리키게 된 것이 원인임. 2.1이 제시하는 조치는 경계 설명임. 각 도구가 맡는 질의 유형, 예시 질의, "이 경우에는 다른 도구를 쓸 것"이라는 문장을 함께 넣음. 잘못된 선택이 양쪽에서 일어나므로 두 도구의 설명을 모두 고쳐야 함.`,
         wrongs:[
           `<b>B(롤백 후 라우팅 레이어 도입):</b> 설명을 고치면 해결되는 문제에 기능을 되돌리고 인프라까지 새로 만드는 조치임. 잃는 것과 드는 비용이 모두 큼.`,
           `<b>C(few-shot 예시 확장):</b> 혼동이 생길 때마다 예시를 계속 추가해야 함. 원인인 겹치는 설명은 그대로 남음.`,
           `<b>D(두 도구 통합):</b> "같은 영역을 다루면 반드시 혼동된다"는 전제가 틀림. 경계가 분명한 설명이면 두 도구는 함께 있어도 됨. 하나로 합치면 그 도구 안에서 무엇을 해야 할지가 도리어 모호해짐.`,
         ]},
       principle:"설명이 겹치면 경계 조건을 명시함"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"실전형 변형 2 · 도구 하나가 세 가지 일을 맡음",
       q:`Your document agent has a single analyze_document tool ("Analyzes a document and returns useful information"). Logs show three failure patterns: extraction requests return summaries, summary requests return raw data tables, and fact-check requests return generic analyses. The team wants reliable behavior for all three use cases. What is the best redesign?`,
       opts:[
         {t:`Split analyze_document into purpose-specific tools with defined input/output contracts — extract_data_points, summarize_content, and verify_claim_against_source — each with a description stating when to use it.`, ok:true},
         {t:`Keep the single tool but append the user's original request verbatim so the backend can infer the intent.`},
         {t:`Add a required "mode" parameter (extract | summarize | verify) to analyze_document and instruct the model to set it correctly in the system prompt.`},
         {t:`Create three copies of analyze_document with identical descriptions but different names.`},
       ],
       hint:`도구 하나가 세 가지 일을 맡고 있어서 모델도 백엔드도 어떤 결과를 요구받았는지 알 수 없음. 가이드가 범용 도구에 제시한 조치를 떠올릴 것.`,
       explain:{
         good:`가이드 2.1이 제시한 분할 방식임. 범용 도구를 목적별 도구로 나누고 각 도구가 받는 입력과 돌려주는 출력을 명확히 정함. 이름과 설명이 곧 용도를 나타내므로 잘못된 선택과 잘못된 사용이 함께 줄어듦.`,
         wrongs:[
           `<b>B(사용자 원문 전달):</b> 의도를 해석하는 일을 백엔드로 넘길 뿐임. 모델이 도구를 고르는 단계의 문제는 그대로 남음.`,
           `<b>C(mode 파라미터 추가):</b> 일반적으로는 맞는 방법처럼 보이지만, mode 값을 올바로 채우는 일 자체가 모델의 확률적 판단에 달려 있음. 정해진 입출력 규약이 아니라 지시에 기대는 방식임.`,
           `<b>D(같은 설명으로 이름만 세 개):</b> 설명이 같으면 고를 근거가 없다는 원래 문제가 세 배로 늘어남.`,
         ]},
       principle:"원칙 ② 근본 원인 해결: 입출력 규약을 명확히 함"},
    ]},

  /* ===== CH 2 · 2.2 구조화 에러 응답 ===== */
  { id:"p2c2", ch:"CH 2", title:"MCP 도구의 구조화 에러 응답 (2.2)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"실패에도 형식이 필요하다",
       html:`<h4>isError 플래그</h4>
        <ul>
          <li>MCP 서버(MCP server)의 도구가 실패를 에이전트에 알리는 공식 신호임</li>
          <li>이 플래그만으로는 부족함. <strong>어떤 종류의 실패인지</strong>가 함께 전달돼야 함</li>
        </ul>
        <h4>에러 네 가지 분류 (암기 필수)</h4>
        <ul>
          <li><strong>일시적(transient)</strong>: 타임아웃, 서비스 중단. 다시 시도할 가치가 있음</li>
          <li><strong>검증(validation)</strong>: 잘못된 입력. 입력을 고쳐야 함</li>
          <li><strong>비즈니스(business)</strong>: 정책 위반(환불 기간 만료 등). 다시 시도해도 결과가 같음</li>
          <li><strong>권한(permission)</strong>: 접근 권한 없음. 다시 시도해도 결과가 같음</li>
        </ul>
        <h4>함께 반환하는 구조화 메타데이터 세 가지</h4>
        <ul>
          <li><code>errorCategory</code>: 위 네 분류 중 어디에 해당하는지를 나타냄</li>
          <li><code>isRetryable</code>: 참과 거짓 두 값을 갖는 항목임. 의미 없는 재시도를 막음</li>
          <li>사람이 읽는 설명문. 비즈니스 에러에는 <strong>고객에게 그대로 전달할 수 있는 설명</strong>을 넣음</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"에러를 뭉뚱그리면 복구 판단이 불가능해진다",
       html:`__MAP2:err__<h4>① "Operation failed" 한 줄이 문제인 이유</h4>
        <ul>
          <li>에이전트는 에러 내용을 읽고 <strong>복구 방법을 결정함</strong>. 다시 시도할지, 입력을 고칠지, 사용자에게 상황을 설명할지를 여기서 정함</li>
          <li>모든 실패가 같은 문장으로 돌아오면 <strong>이 결정을 내릴 근거가 없음</strong></li>
          <li>자주 나타나는 증상: 정책 위반(비즈니스 에러)인데도 재시도를 반복함. 토큰이 낭비되고 고객은 계속 기다림</li>
        </ul>
        <h4>② 재시도 가능 여부는 도구가 알려줌</h4>
        <ul>
          <li>비즈니스 정책 위반에는 <code>retriable: false</code>와 고객에게 전달할 설명을 함께 반환함</li>
          <li>에이전트는 이 값을 받아 재시도를 멈추고 "환불 기간이 지나 처리가 어렵다"는 안내로 바로 넘어감</li>
        </ul>
        <h4>③ 접근 실패와 빈 결과는 다른 사건임</h4>
        <ul>
          <li><strong>접근 실패</strong>: 검색 자체를 수행하지 못한 상태임. 재시도 여부를 판단해야 함</li>
          <li><strong>빈 결과</strong>: 검색은 정상 수행됐고 조건에 맞는 항목이 없는 상태임. 정상 응답임</li>
          <li>이 둘을 같은 형태로 반환하면 에이전트는 "항목이 없음"과 "확인하지 못함"을 구분할 수 없음</li>
        </ul>
        <div class="callout">🎯 시험 포인트: 선택지에 "빈 결과를 성공으로 반환" 또는 "실패 전체를 일괄 재시도"가 들어 있으면 대부분 오답 유도 선택지임. 정답은 에러 분류, 재시도 가능 여부, 설명문 세 가지를 함께 반환하는 쪽임.</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"실전 진단 1 · 재시도할 실패와 다시 물어야 할 실패",
       q:`Your coupon tool's errors default to isRetryable: true "to be safe." Logs from yesterday: a customer typo'd a coupon code, and the agent silently retried the identical apply_coupon call four times before apologizing — never asking the customer to re-check the code. Meanwhile, a genuine 30-second service outage was handled well by the same retry logic. What should change?`,
       opts:[
         {t:`Classify errors correctly at the tool: validation errors (bad input) return isRetryable: false with a description prompting corrected input, while transient errors keep isRetryable: true — the same flag can't serve both.`, ok:true},
         {t:`Lower the retry cap from four to two so bad-input loops burn fewer calls before the apology.`},
         {t:`Have the agent compare consecutive identical results and stop retrying when nothing changes between attempts.`},
         {t:`Keep the defaults but add a prompt rule: "if a coupon fails twice, ask the customer to double-check the code."`},
       ],
       hint:`같은 입력을 다시 보냈을 때 결과가 달라지는 실패와 달라지지 않는 실패가 있음. "안전하게 전부 retryable로 둔다"는 설정이 왜 안전하지 않았는지 확인할 것.`,
       explain:{
         good:`2.2가 에러를 분류하는 이유임. 검증 에러는 재시도가 아니라 고쳐진 입력을 받아야 해결됨. 도구가 isRetryable: false와 설명문을 함께 돌려주면 에이전트는 곧바로 고객에게 코드 재확인을 요청함. 일시적 에러에 대한 재시도는 그대로 유지됨.`,
         wrongs:[
           `<b>B(재시도 상한 축소):</b> 낭비를 조금 줄일 뿐임. 재시도 대신 재요청을 해야 한다는 점은 고쳐지지 않고, 정상적으로 동작하던 일시적 에러 복구까지 함께 줄어듦.`,
           `<b>C(연속된 결과 비교):</b> 그럴듯해 보이지만 실제로 존재하지 않는 방식임. 에러 분류 정보가 있으면 필요 없는 우회 방법이며, 비교할 결과를 얻으려면 재시도부터 해야 하므로 낭비가 남음.`,
           `<b>D(프롬프트 규칙 추가):</b> 쿠폰에만 적용되는 지시임. 주소, 카드번호처럼 다른 검증 에러가 나올 때마다 규칙을 하나씩 더 붙여야 함.`,
         ]},
       principle:"재시도할 실패와 다시 물어야 할 실패를 구분함"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"실전형 변형 2 · 결과가 비어서 돌아옴",
       q:`Your order-search tool queries a warehouse API. Two situations currently produce the identical response {"results": []}: (a) the API timed out and the tool caught the exception, and (b) the query succeeded but no orders matched. The agent treats both as "no orders found" and tells customers their orders don't exist during outages. How should the tool behave?`,
       opts:[
         {t:`Distinguish the cases: return isError with errorCategory "transient" and isRetryable: true for timeouts, and a successful empty result only when the query actually ran and found no matches.`, ok:true},
         {t:`Return isError for both cases, since an empty result is also a kind of failure worth flagging.`},
         {t:`Have the tool retry internally forever until the warehouse API responds, so the agent never sees a timeout.`},
         {t:`Add a disclaimer to every "no orders found" message telling customers the system might be down.`},
       ],
       hint:`"확인하지 못했다"와 "확인했는데 없다"는 서로 다른 사건임. 현재 도구는 이 둘을 같은 형태로 반환하고 있음.`,
       explain:{
         good:`접근 실패와 정상적인 빈 결과를 구분해 반환하는 것이 가이드 2.2가 명시한 방식임. 이렇게 하면 에이전트가 재시도와 "주문 없음" 안내 중 상황에 맞는 행동을 고를 수 있음.`,
         wrongs:[
           `<b>B(빈 결과도 에러로 처리):</b> 반대 방향의 오류임. 정상적인 "조건에 맞는 항목 없음"을 실패로 표시하면 불필요한 재시도가 생김.`,
           `<b>C(도구 내부에서 무한 재시도):</b> 장애가 길어지면 도구가 응답을 돌려주지 않음. 에이전트와 고객이 모두 그 자리에서 대기하게 됨.`,
           `<b>D(면책 문구 추가):</b> 정상 응답까지 믿을 수 없게 만드는 증상 처치임. 두 상황을 구분하지 않았다는 원인은 그대로 남음.`,
         ]},
       principle:"원칙 ⑤ 접근 실패와 빈 결과를 구분함"},
    ]},

  /* ===== CH 3 · 2.3 도구 배분과 tool_choice ===== */
  { id:"p2c3", ch:"CH 3", title:"도구 배분과 tool_choice (2.3)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"도구가 많다고 선택이 정확해지지 않는다",
       html:`<h4>도구가 많아지면 생기는 일</h4>
        <ul>
          <li>도구를 4~5개 주는 대신 <strong>18개</strong>를 주면 고를 대상이 늘어나고, 그만큼 <strong>정확히 고를 확률이 떨어짐</strong></li>
          <li>담당 업무 밖의 도구를 주면 그 도구를 <strong>잘못 사용함</strong>. 합성 담당 에이전트가 웹 검색을 시도하는 경우가 그 예임</li>
        </ul>
        <h4>스코프드 액세스(scoped access)</h4>
        <ul>
          <li>기본 원칙: 역할 수행에 필요한 도구만 지급함</li>
          <li>예외: <strong>다른 역할의 기능이 자주 필요한 경우</strong>에는 범위가 좁은 전용 도구를 하나만 추가함. 합성 담당 에이전트에게 verify_fact를 주는 경우가 그 예임</li>
          <li>범용 도구는 범위가 제한된 도구로 교체함. fetch_url을 문서 URL만 검증해 받는 load_document로 바꾸는 방식임</li>
        </ul>
        <h4>tool_choice (API 설정값)</h4>
        <ul>
          <li><code>"auto"</code>: 도구를 쓸지 말지를 모델이 결정함. 텍스트로만 답해도 됨. 도구를 제공했을 때의 기본값임</li>
          <li><code>"any"</code>: <strong>제공된 도구 중 하나를 반드시 호출함</strong>. 텍스트만 반환할 수 없음</li>
          <li><code>{"type":"tool","name":"..."}</code>: <strong>지정한 도구를 반드시 호출하게 함</strong></li>
          <li>공식 문서에는 네 번째 값도 있음. <code>"none"</code>은 도구 사용을 금지하며, 도구를 제공하지 않았을 때의 기본값임. 시험 가이드는 앞의 세 가지만 다루지만 선택지에 none이 나와도 존재하지 않는 설정은 아님</li>
          <li>표기 차이: 실제 API에서는 모두 객체 형태(<code>{"type":"auto"}</code> 등)로 씀. 가이드와 시험은 줄인 표기를 씀</li>
          <li>any 또는 특정 도구 강제를 설정하면 모델은 <strong>자연어 설명 없이 바로 도구를 호출함</strong>. API가 그렇게 동작함</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"어떤 역할에 어떤 도구를 주고, 언제 호출을 강제하는가",
       html:`__MAP2:choice__<h4>① 85 대 15 배분 (공식 가이드 샘플 9번 유형, 다른 역할의 도구가 가끔 필요한 상황을 묻는 문제)</h4>
        <ul>
          <li>상황: 합성 담당 에이전트가 내는 검증 요청 중 85%는 단순 사실 확인이고 15%는 심층 조사임</li>
          <li>정답: 85%에 해당하는 작업에는 <strong>범위가 좁은 verify_fact 도구</strong>를 직접 지급하고, 15%는 기존대로 코디네이터를 거치게 함</li>
          <li>오답: 웹 검색 도구를 전부 지급하는 방법(필요 이상의 권한), 요청을 모아 한 번에 처리하는 방법(작업 사이의 선후 관계 무시), 미리 캐싱해 두는 방법(무엇이 필요할지 예측 불가)</li>
        </ul>
        <h4>② 특정 도구 강제를 쓰는 상황</h4>
        <ul>
          <li>"extract_metadata가 <strong>반드시 먼저</strong> 실행돼야 한다"는 요구가 있을 때 첫 턴에 그 도구를 강제하고, 이후 단계는 다음 턴에서 진행함</li>
        </ul>
        <h4>③ "any"를 쓰는 상황</h4>
        <ul>
          <li>구조화 출력(structured output)이 반드시 필요할 때 씀. 모델이 대화체 텍스트로 답하는 경로를 차단함</li>
          <li>추출 스키마(schema)가 여러 개이고 문서 유형을 미리 알 수 없을 때 씀. 어느 추출 도구를 고를지는 모델에 맡기되 도구 호출 자체는 보장됨</li>
        </ul>
        <div class="callout">🎯 시험 포인트: auto와 any와 특정 도구 강제 중 하나를 고르는 문제는 요구 수준을 확인할 것. "반드시 이 도구"는 특정 도구 강제, "반드시 도구를 쓰되 어느 것이든 됨"은 any, "필요하면 도구를 씀"은 auto임.</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"실전 진단 1 · 모델이 산문으로 답해 파서가 중단됨",
       q:`Your extraction step runs with tool_choice: "auto" and a firm prompt instruction to "always respond by calling an extraction tool." On clear documents it complies; on ambiguous ones it sometimes replies in prose — "This document appears to be a receipt, though I'm not fully certain..." — and the downstream JSON parser crashes. This happens in about 4% of runs. What is the correct fix?`,
       opts:[
         {t:`Set tool_choice: "any" so the model must call one of the extraction tools — structurally eliminating prose responses instead of discouraging them.`, ok:true},
         {t:`Wrap the parser in a try/catch that detects prose responses and re-submits the request until a tool call comes back.`},
         {t:`Force tool_choice to the most common extraction tool so there is never a choice to hedge over.`},
         {t:`Strengthen the instruction: "NEVER respond with text. You MUST call a tool. This is critical."`},
       ],
       hint:`지시문은 이미 있었는데도 4%가 어긋났음. "auto"가 허용하는 응답과 "any"가 차단하는 응답의 차이를 확인할 것.`,
       explain:{
         good:`"auto"는 텍스트 응답을 허용하는 설정이므로 지시문을 아무리 강하게 써도 일정 비율로 텍스트 응답이 나옴. "any"는 도구 호출을 설정 차원에서 보장하면서 어느 도구를 쓸지는 모델이 문서를 보고 고르게 남겨 둠. 문서가 모호할 때의 대응력을 유지하면서 텍스트 응답만 차단함.`,
         wrongs:[
           `<b>B(파서에 재시도 처리 추가):</b> 4%의 불확실성을 그대로 두고 호출 비용으로 메우는 증상 처치임. 설정값 하나로 발생 자체를 없앨 수 있는 문제임.`,
           `<b>C(특정 추출 도구 강제):</b> 영수증이 아닌 문서에도 영수증 스키마를 적용하게 됨. 텍스트 응답은 사라지지만 잘못된 추출이 늘어남.`,
           `<b>D(지시문 강화):</b> 이미 실패한 방법을 더 강한 어조로 반복하는 것임. auto가 허용한 텍스트 응답 경로는 지시문으로 막히지 않음.`,
         ]},
       principle:"설정이 허용한 응답 경로는 설정으로 막는다"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"실전형 변형 2 · 메타데이터 추출을 항상 먼저 실행하기",
       q:`Your document pipeline has four tools: extract_metadata, enrich_entities, classify_topic, and store_result. Correct enrichment requires metadata to be extracted first, but in 9% of runs the model starts with enrich_entities and produces corrupted records. Which configuration guarantees extract_metadata runs first?`,
       opts:[
         {t:`On the first request, force the tool with tool_choice: {"type": "tool", "name": "extract_metadata"}, then process subsequent steps in follow-up turns.`, ok:true},
         {t:`Set tool_choice: "any" so the model must call a tool rather than answering with text.`},
         {t:`Keep tool_choice: "auto" and add "always extract metadata first" to each tool description.`},
         {t:`Reorder the tool list so extract_metadata appears first in the tools array.`},
       ],
       hint:`"반드시 이 도구부터"라는 요구임. any가 보장하는 것과 특정 도구 강제가 보장하는 것을 비교할 것.`,
       explain:{
         good:`특정 도구가 먼저 실행돼야 한다면 그 도구를 지정해 강제하는 방법만이 순서를 보장함. 이후 단계는 다음 턴에서 이어서 진행하면 됨. 가이드 2.3이 제시한 방식임.`,
         wrongs:[
           `<b>B(any 설정):</b> 제공된 도구 중 하나를 호출한다는 것만 보장함. enrich_entities로 시작해도 이 설정의 조건은 충족됨.`,
           `<b>C(도구 설명에 지시 추가):</b> 모델의 확률적 판단에 기대는 방법임. 9%를 줄일 수는 있어도 0%로 만들지는 못함.`,
           `<b>D(배열 순서 변경):</b> 도구 목록의 순서는 실행 순서를 강제하지 않음. 존재하지 않는 동작에 기대는 선택지임.`,
         ]},
       principle:"원칙 ① 강제는 설정으로: tool_choice 세 가지 구분"},
    ]},

  /* ===== CH 4 · 2.4 MCP 서버 통합 ===== */
  { id:"p2c4", ch:"CH 4", title:"MCP 서버 통합 (2.4)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"MCP 서버 설정의 두 스코프와 비밀키 처리",
       html:`<h4>MCP 서버(MCP server) 설정을 두는 두 위치</h4>
        <ul>
          <li><strong>프로젝트 스코프</strong>인 <code>.mcp.json</code>: 저장소에 커밋되므로 <strong>팀 전체가 같은 설정을 씀</strong></li>
          <li><strong>사용자 스코프</strong>인 <code>~/.claude.json</code>: <strong>개인용, 실험용</strong>이며 그 사람 기계에만 적용됨</li>
        </ul>
        <h4>환경변수 확장</h4>
        <ul>
          <li><code>.mcp.json</code> 안에 <code>\${GITHUB_TOKEN}</code>처럼 쓰면 실행 시점에 각 사용자 기계의 값으로 치환됨</li>
          <li>효과: <strong>비밀키를 저장소에 올리지 않고</strong> 팀 공유 설정에 인증 정보를 넣을 수 있음</li>
        </ul>
        <h4>연결 시점의 도구 발견</h4>
        <ul>
          <li>연결된 <strong>모든 MCP 서버의 도구가 연결 시점에 발견되어</strong> 함께 사용 가능한 상태가 됨</li>
        </ul>
        <div class="callout">📖 용어 카드. <b>환경변수</b>: 컴퓨터에 이름과 값을 짝지어 저장해 둔 설정임. 이름은 공유해도 값은 각자 기계에만 있음. <b>커밋</b>: 팀 저장소에 파일을 올리는 동작임. 여기 올린 내용은 팀 전체가 볼 수 있음.</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"연결한 다음의 세 가지 판단",
       html:`__MAP2:mcp__<h4>① 연결한 MCP 도구를 에이전트가 쓰지 않을 때</h4>
        <ul>
          <li>증상: 성능이 좋은 MCP 검색 도구를 연결했는데도 에이전트가 <strong>기본 제공 도구(built-in tools)인 Grep만 씀</strong></li>
          <li>원인: MCP 도구의 설명이 빈약해서 그 도구가 무엇을 할 수 있는지 드러나지 않음</li>
          <li>조치: <strong>설명에 기능과 출력 형태를 자세히 씀</strong>. Ch1과 같은 원리임</li>
        </ul>
        <h4>② 직접 만들 것인가, 있는 것을 쓸 것인가</h4>
        <ul>
          <li>Jira, GitHub처럼 표준적인 연동은 <strong>공개된 MCP 서버</strong>를 가져다 씀</li>
          <li>직접 제작은 <strong>그 팀에만 있는 업무 흐름</strong>에만 적용함</li>
        </ul>
        <h4>③ 도구(tool)와 리소스(resource)의 차이</h4>
        <ul>
          <li><strong>도구</strong>는 행동을 수행함. 검색하기, 생성하기 같은 작업임</li>
          <li><strong>리소스</strong>는 보유한 콘텐츠 목록을 보여 줌. 이슈 요약, 문서 계층, 데이터베이스 스키마(schema)가 여기 해당함</li>
          <li>리소스로 어떤 데이터가 있는지 미리 보여 주면 <strong>무엇이 있는지 알아보려고 도구를 호출하는 횟수가 줄어듦</strong></li>
        </ul>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"실전 진단 1 · 새로 합류한 개발자에게만 MCP 도구가 없음",
       q:`A new developer clones the repo, runs Claude Code, and has none of the team's GitHub MCP tools — while everyone else has them. The team lead checks: the server works fine on his machine, the repo's .mcp.json doesn't mention it, and his ~/.claude.json contains the full server definition with a hardcoded token. What happened, and what is the right fix?`,
       opts:[
         {t:`The server was configured in the lead's user scope, which never leaves his machine; move the definition to the project's .mcp.json with \${GITHUB_TOKEN} environment expansion so the config is shared but each person's token stays local.`, ok:true},
         {t:`The new developer's MCP cache is stale; she should reinstall Claude Code and re-clone the repository.`},
         {t:`Copy the lead's ~/.claude.json to the new developer's machine — fastest path to parity, token included.`},
         {t:`Move the definition to .mcp.json as-is, keeping the hardcoded token since the repo is private anyway.`},
       ],
       hint:`"팀장 기계에서는 동작하는데 새 기계에는 없다"는 증상만으로 설정이 어느 스코프에 있는지 알 수 있음. 설정을 옮길 때 토큰을 어떻게 처리할지도 함께 볼 것.`,
       explain:{
         good:`증상이 설정 스코프를 알려 줌. 사용자 스코프(~/.claude.json)는 버전 관리 대상이 아니므로 다른 사람에게 전달되지 않음. 팀이 함께 쓰는 도구는 프로젝트 스코프인 .mcp.json으로 옮기고, 파일에 직접 적어 둔 토큰은 \${...} 환경변수 확장으로 바꿈. 설정 공유와 비밀키 보호를 한 번에 처리함.`,
         wrongs:[
           `<b>B(캐시 문제로 판단):</b> 그런 캐시 동작은 존재하지 않음. 설정이 어디에 있는지가 이미 원인을 가리키고 있음.`,
           `<b>C(설정 파일 복사):</b> 팀장의 개인 토큰이 다른 사람 기계로 넘어감. 보안 문제이며, 다음 사람이 합류할 때마다 같은 복사를 반복해야 함.`,
           `<b>D(토큰을 그대로 커밋):</b> 비공개 저장소라는 이유는 안전의 근거가 되지 않음. 한 번 커밋된 비밀키는 저장소 이력에 계속 남음.`,
         ]},
       principle:"증상으로 설정 스코프를 판별함"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"실전형 변형 2 · 성능이 좋은 MCP 도구가 선택되지 않음",
       q:`You connected a code-intelligence MCP server whose semantic_search tool understands symbols and call graphs — far more capable than plain text search. Yet the agent keeps using the built-in Grep for questions like "find every caller of processPayment." The MCP tool's description reads: "Searches code." What is the best fix?`,
       opts:[
         {t:`Enhance the MCP tool's description to explain its capabilities and outputs in detail — symbol-aware search, call-graph traversal, example queries — so the agent can see when it beats Grep.`, ok:true},
         {t:`Remove Grep from the agent's allowedTools so semantic_search becomes the only search option.`},
         {t:`Add a system prompt rule: "always prefer MCP tools over built-in tools."`},
         {t:`Rename the tool to super_search to signal that it is more powerful.`},
       ],
       hint:`에이전트가 이 도구에 대해 아는 정보는 "Searches code"라는 두 단어가 전부임. Grep의 설명이 더 구체적이라면 모델은 Grep을 고름.`,
       explain:{
         good:`가이드 2.4가 명시한 조치임. MCP 도구의 설명을 자세히 써서 기본 제공 도구(built-in tools)보다 나은 점이 드러나게 함. 도구 선택 문제의 근본 원인은 대부분 설명의 품질임.`,
         wrongs:[
           `<b>B(Grep 제거):</b> 단순 텍스트 검색이 더 적합한 작업까지 막는 과한 조치임. 최소 권한은 도구를 없애는 것이 아니라 상황에 맞는 도구를 주는 것임.`,
           `<b>C("MCP 우선" 규칙 추가):</b> 도구 종류를 가리지 않는 일괄 지시임. Grep이 적합한 상황에서도 선택이 왜곡됨.`,
           `<b>D(이름만 변경):</b> super라는 수식어는 그 도구가 무엇을 할 수 있는지 알려 주지 않음. 판단에 쓸 정보가 여전히 없음.`,
         ]},
       principle:"원칙 ② 근본 원인 해결: 설명이 선택을 결정함"},
    ]},

  /* ===== CH 5 · 2.5 기본 제공 도구 6종 ===== */
  { id:"p2c5", ch:"CH 5", title:"기본 제공 도구 6종 선택 기준 (2.5)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"기본 제공 도구 여섯 개의 용도 구분",
       html:`<h4>검색 도구 두 가지 (가장 자주 혼동되는 쌍)</h4>
        <ul>
          <li><strong>Grep</strong>: 파일 <strong>내용</strong>을 검색함. 함수 이름, 에러 메시지, import 구문을 찾을 때 씀</li>
          <li><strong>Glob</strong>: 파일 <strong>이름과 경로</strong>를 패턴으로 찾음 (<code>**/*.test.tsx</code>)</li>
          <li>구분 기준: "파일 안에 무엇이 쓰여 있는가"를 물으면 Grep, "어떤 이름의 파일이 있는가"를 물으면 Glob임</li>
        </ul>
        <h4>파일 조작 도구 세 가지</h4>
        <ul>
          <li><strong>Read</strong>는 파일 전체를 읽고, <strong>Write</strong>는 파일 전체를 씀</li>
          <li><strong>Edit</strong>은 파일 안에서 <strong>한 곳에만 있는 텍스트를 찾아</strong> 그 부분만 수정함</li>
          <li>수정하려는 텍스트가 여러 곳에 있어 Edit이 실패하면 <strong>Read와 Write</strong>로 대체함</li>
        </ul>
        <h4>Bash</h4>
        <ul>
          <li>셸 명령을 실행함. 테스트 실행, 빌드, git 명령 등에 씀</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"도구를 이어 쓰는 코드베이스 탐색 전략",
       html:`__MAP2:builtin__<h4>① 필요한 만큼만 읽어 나감</h4>
        <ul>
          <li>권장 순서: <strong>Grep으로 진입점을 찾음</strong>. 그다음 <strong>Read로 import를 따라가며</strong> 흐름을 추적함</li>
          <li>자주 나오는 오답: "모든 파일을 먼저 Read해서 전체를 파악한다". 컨텍스트 창(context window)을 낭비하고 모델의 주의가 분산됨</li>
        </ul>
        <h4>② 래퍼 모듈을 거치는 함수 추적</h4>
        <ul>
          <li>함수가 여러 래퍼를 거쳐 사용될 때는 <strong>export된 이름을 먼저 전부 확인</strong>한 다음, 각 이름을 코드베이스 전체에서 검색함</li>
        </ul>
        <h4>③ Edit이 실패했을 때</h4>
        <ul>
          <li>같은 코드 조각이 여러 곳에 있으면 Edit이 수정 위치를 하나로 특정하지 못해 실패함</li>
          <li>권장 대체 경로: Read로 파일 전체를 읽고 수정본을 Write로 씀. 결과가 확실하고 같은 절차를 반복할 수 있음</li>
        </ul>
        <div class="callout">🎯 시험 포인트: 상황을 읽고 도구를 바로 고르는 연습이 핵심임. "파일 이름 패턴"이라는 표현이 보이면 Glob, "내용", "호출자", "에러 문자열"이 보이면 Grep임.</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"실전 진단 1 · 네 가지 일괄 변경 계획",
       q:`The config key LEGACY_TIMEOUT must be renamed to REQUEST_TIMEOUT_MS across a 900-file repo. It appears in code, in *.yaml configs, and — the team suspects — in a few string literals used for logging. Four proposed plans. Which is right?`,
       opts:[
         {t:`Grep for LEGACY_TIMEOUT across all file contents to enumerate every occurrence (code, YAML, strings), Read the surrounding context of each, then Edit occurrence by occurrence — falling back to Read + Write where identical snippets defeat Edit's unique matching.`, ok:true},
         {t:`Glob for **/*.yaml and **/*.ts, open each matched file, and rename what's found — the file extensions define where configs can live.`},
         {t:`Run one Bash command — grep -rl | xargs sed -i 's/LEGACY_TIMEOUT/REQUEST_TIMEOUT_MS/g' — done in ten seconds across all 900 files.`},
         {t:`Read the repository's entry points and follow imports to find usages, renaming as the dependency tree unfolds.`},
       ],
       hint:`세 가지를 모두 갖춘 계획을 고를 것. ① 발생 지점을 빠짐없이 찾는 도구 ② 수정할 때의 정확도 ③ Edit이 실패했을 때의 대체 경로. C는 실행이 빠른 대신 무엇을 놓치는지 확인할 것.`,
       explain:{
         good:`내용 검색인 Grep이 파일 유형과 관계없이 모든 발생 지점을 찾아내고, Read로 앞뒤 맥락을 확인한 뒤 Edit으로 한 곳씩 정확히 수정함. 같은 텍스트가 여러 곳에 있어 Edit이 실패하면 Read와 Write로 대체함. 2.5에서 다룬 도구 사용 순서를 전부 조합하는 문제임.`,
         wrongs:[
           `<b>B(확장자로 Glob 검색):</b> "설정 값은 이 확장자 파일에만 있다"는 가정이 틀림. 로그 문자열처럼 다른 파일에 있는 발생 지점을 전부 놓침.`,
           `<b>C(sed 일괄 치환):</b> 실행은 빠르지만 맥락을 보지 않고 전체를 치환함. 주석, 이름이 비슷한 다른 값, 문서까지 함께 바뀌고 검토 단계가 없어 되돌리기도 어려움.`,
           `<b>D(import 추적):</b> 코드 흐름을 파악할 때는 유용하지만 YAML 설정과 문자열은 import 관계 밖에 있어 찾지 못함.`,
         ]},
       principle:"전수 탐색, 맥락 확인, 정밀 수정, 대체 경로 순으로 진행함"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"실전형 변형 2 · Edit이 수정 위치를 특정하지 못할 때",
       q:`During an automated refactor, your agent tries to Edit the line "return retry(fetchOrder);" in utils/orders.ts, but the Edit fails: the exact text appears in four places in the file. The agent must change only the occurrence inside the fetchWithBackoff function. What is the most reliable next step?`,
       opts:[
         {t:`Read the full file, apply the change to the correct occurrence in memory, and Write the updated file back.`, ok:true},
         {t:`Retry Edit with a shorter anchor string, such as "retry(", to loosen the match.`},
         {t:`Run a Bash sed command replacing all four occurrences at once.`},
         {t:`Ask the user to make this particular change manually since automation failed.`}],
       hint:`Edit이 수정 위치를 하나로 특정하지 못했을 때의 공식 대체 경로가 무엇이었는지 떠올릴 것.`,
       explain:{
         good:`가이드 2.5가 명시한 내용임. Edit이 한 곳에만 있는 기준 텍스트를 찾지 못하면 Read와 Write가 신뢰할 수 있는 대체 경로임. 파일 전체를 읽은 상태에서 원하는 위치만 정확히 고칠 수 있음.`,
         wrongs:[
           `<b>B(기준 텍스트를 더 짧게):</b> 일치하는 위치가 네 곳이라 실패한 상황임. 기준 텍스트를 줄이면 일치 위치가 더 늘어남.`,
           `<b>C(sed로 전체 치환):</b> 바꾸면 안 되는 세 곳까지 함께 바뀜.`,
           `<b>D(사용자에게 수동 수정 요청):</b> 공식 대체 경로가 있는 상황에서 자동화를 포기하는 것은 이르다.`,
         ]},
       principle:"Edit 실패 시 Read와 Write로 대체함"},
    ]},

  /* ===== D2 미니테스트 ===== */
  { id:"p2test", type:"test", title:"D2 미니테스트: 도구 설계와 MCP 10문항",
    questions:[
    {ts:"2.1", lvl:"기초", q:`Two tools with near-identical minimal descriptions keep getting confused by the agent. What is the primary mechanism an LLM uses to select among tools?`,
     opts:[
       {t:`The tool descriptions — they are the model's main evidence for choosing a tool.`, ok:true},
       {t:`The order in which tools appear in the tools array.`},
       {t:`The internal implementation code of each tool.`},
       {t:`The frequency with which each tool succeeded in past sessions.`}],
     explain:{good:`도구 선택의 주된 근거는 도구 설명(description)임. 그래서 잘못된 선택이 났을 때의 첫 조치는 언제나 설명을 보강하는 것임.`,
       wrongs:[`<b>B:</b> 배열 순서는 선택을 결정하지 않음.`,`<b>C:</b> 모델은 구현 코드를 볼 수 없음.`,`<b>D:</b> 과거 성공률을 자동으로 반영하는 동작은 없음.`]},
     principle:"설명이 선택 기준임"},
    {ts:"2.1", lvl:"실전", q:`After you added the system prompt line "For anything involving documents, analyze thoroughly before answering," the agent began routing web-page questions to analyze_document instead of extract_web_results — despite both tools having solid descriptions. What is the most likely cause and fix?`,
     opts:[
       {t:`The keyword-sensitive instruction created an unintended association with analyze_document; revise the system prompt wording rather than the tool descriptions.`, ok:true},
       {t:`The tool descriptions have degraded and should both be rewritten from scratch.`},
       {t:`The model needs few-shot examples of web questions routing to extract_web_results.`},
       {t:`analyze_document should be temporarily disabled until routing stabilizes.`}],
     explain:{good:`잘 쓴 도구 설명도 시스템 프롬프트에 들어간 키워드 지시("documents...analyze")에 덮일 수 있음. 가이드 2.1의 마지막 항목에 해당하며, 프롬프트 문구를 점검하고 수정하는 것이 정답임.`,
       wrongs:[`<b>B:</b> 도구 설명에는 문제가 없다고 지문에 명시돼 있음. 증상이 시작된 시점이 프롬프트 추가 직후라는 점이 원인을 가리킴.`,`<b>C:</b> 원인인 프롬프트 간섭을 그대로 둔 채 보정 장치만 추가함.`,`<b>D:</b> 정상 동작하는 도구를 끄는 과한 조치임.`]},
     principle:"원칙 ② 근본 원인 해결: 시스템 프롬프트 간섭"},
    {ts:"2.2", lvl:"기초", q:`Why do uniform error responses like "Operation failed" harm agent reliability?`,
     opts:[
       {t:`The agent cannot choose an appropriate recovery strategy — it can't tell retryable failures from policy violations or bad input.`, ok:true},
       {t:`They consume more tokens than structured errors.`},
       {t:`They cause the MCP connection to reset after repeated failures.`},
       {t:`They prevent the isError flag from being set.`}],
     explain:{good:`에러 내용이 복구 방법을 정하는 근거임. 모든 실패가 같은 문장으로 오면 재시도, 입력 수정, 사용자 안내 중 무엇을 해야 할지 알 수 없음.`,
       wrongs:[`<b>B:</b> 토큰 소비량이 아니라 전달되는 정보가 문제임.`,`<b>C:</b> MCP 연결 상태와는 관계가 없음.`,`<b>D:</b> isError는 별도로 설정할 수 있음.`]},
     principle:"원칙 ⑤ 실패는 구조화해서 반환함"},
    {ts:"2.2", lvl:"실전", q:`Your subagent's document-fetch tool fails intermittently with timeouts. The team debates where recovery should live. Per best practice, what should the subagent do?`,
     opts:[
       {t:`Attempt local recovery for transient failures (e.g., limited retries), and propagate to the coordinator only errors it cannot resolve — including what was attempted and any partial results.`, ok:true},
       {t:`Propagate every failure immediately to the coordinator, which has more context to decide.`},
       {t:`Suppress transient failures and return whatever partial results exist, marked as success.`},
       {t:`Terminate its task on first failure so the coordinator can restart the whole pipeline cleanly.`}],
     explain:{good:`가이드 2.2의 내용임. 일시적 에러는 서브에이전트(subagent)가 자체적으로 복구를 시도하고, 해결하지 못한 것만 시도 내역과 부분 결과를 붙여 코디네이터에 올림. 코디네이터가 판단할 양과 주고받는 횟수가 줄어듦.`,
       wrongs:[`<b>B:</b> 사소한 타임아웃까지 전부 올리면 코디네이터가 처리해야 할 정보가 불필요하게 늘어남.`,`<b>C:</b> 실패를 성공으로 표시하는 방식이며 가장 피해야 할 처리임.`,`<b>D:</b> 실패 하나로 전체 작업을 중단하는 것 역시 가이드가 피하라고 명시한 방식임.`]},
     principle:"자체 복구를 먼저 하고, 남은 실패는 구조화해서 올림"},
    {ts:"2.3", lvl:"기초", q:`Your extraction step must return structured data and never plain conversational text, but any of the three extraction tools is acceptable. Which tool_choice setting fits?`,
     opts:[
       {t:`tool_choice: "any" — the model must call some tool, but may choose which.`, ok:true},
       {t:`tool_choice: "auto" — the model decides whether to use a tool.`},
       {t:`Forced selection of one specific extraction tool.`},
       {t:`No tool_choice setting; rely on prompt instructions to always use a tool.`}],
     explain:{good:`"반드시 도구를 쓰되 어느 것이든 됨"에 해당하는 설정이 "any"임. 텍스트로만 답하는 경로를 설정 차원에서 차단함.`,
       wrongs:[`<b>B:</b> auto는 텍스트 응답을 허용함.`,`<b>C:</b> 문서 유형을 모르는 상태에서 특정 도구를 강제하면 맞지 않는 도구가 호출될 수 있음.`,`<b>D:</b> 프롬프트 지시에 기대는 방법은 일정 비율로 어긋남.`]},
     principle:"요구 수준에 맞는 tool_choice를 고름"},
    {ts:"2.3", lvl:"실전", q:`An 18-tool support agent shows degraded tool selection. Analysis: the returns workflow uses 4 tools for 90% of traffic; the remaining 14 tools serve rare admin tasks. What is the best restructuring?`,
     opts:[
       {t:`Scope the main agent to the 4 high-traffic tools, and route rare admin tasks to a separate path (e.g., a dedicated agent or coordinator) that has the remaining tools.`, ok:true},
       {t:`Keep all 18 tools but sort them by usage frequency in the tools array.`},
       {t:`Ask the model to "think carefully before selecting tools" in the system prompt.`},
       {t:`Merge the 14 rare tools into one mega_admin tool to reduce the count.`}],
     explain:{good:`도구가 18개로 많은 것이 선택 정확도를 떨어뜨린 원인임. 역할별로 도구 범위를 나누어 주 흐름에는 4개만 주고 드문 작업은 별도 경로로 보내는 것이 최소 권한을 적용한 형태임.`,
       wrongs:[`<b>B:</b> 배열 순서는 선택 품질을 보장하지 않음.`,`<b>C:</b> 신중히 고르라는 지시로는 고를 대상의 수가 줄지 않음.`,`<b>D:</b> 14개 기능을 도구 하나에 몰아넣으면 그 도구 안에서 무엇을 해야 할지가 모호해짐. 범용 도구를 만들지 말라는 항목에 해당함.`]},
     principle:"원칙 ④ 최소 권한: 역할별로 도구 범위를 나눔"},
    {ts:"2.4", lvl:"기초", q:`Where should a personal, experimental MCP server be configured so it doesn't affect teammates?`,
     opts:[
       {t:`In the user-scoped ~/.claude.json.`, ok:true},
       {t:`In the project-scoped .mcp.json.`},
       {t:`In CLAUDE.md at the project root.`},
       {t:`In .claude/commands/ as a slash command.`}],
     explain:{good:`개인용, 실험용 설정은 사용자 스코프인 ~/.claude.json에 둠. 버전 관리에 올라가지 않으므로 팀에 영향을 주지 않음.`,
       wrongs:[`<b>B:</b> .mcp.json은 커밋되므로 팀 전체에 적용됨.`,`<b>C:</b> CLAUDE.md는 지시와 배경 정보를 담는 파일이며 서버 설정 파일이 아님.`,`<b>D:</b> 슬래시 커맨드는 MCP 서버를 설정하는 수단이 아님.`]},
     principle:"팀 공유는 프로젝트 스코프, 개인용은 사용자 스코프"},
    {ts:"2.4", lvl:"실전", q:`Your agent wastes several turns per session calling list_tables, describe_table, and sample_rows just to discover what data exists before answering. What MCP capability addresses this exploration overhead?`,
     opts:[
       {t:`Expose the database schema as an MCP resource — a content catalog the agent can see without exploratory tool calls.`, ok:true},
       {t:`Increase the agent's max iterations so exploration completes reliably.`},
       {t:`Cache the results of list_tables in the system prompt manually each week.`},
       {t:`Create one more tool, explore_everything, that runs all discovery calls at once.`}],
     explain:{good:`리소스(resource)는 보유한 콘텐츠 목록을 보여 주는 기능임. 스키마, 문서 계층, 이슈 요약이 여기 해당함. 무엇이 있는지 확인하려고 도구를 호출할 필요 자체가 없어짐. 가이드 2.4가 제시한 리소스의 용도임.`,
       wrongs:[`<b>B:</b> 탐색에 쓰는 턴을 더 늘려 줄 뿐임.`,`<b>C:</b> 사람이 주마다 직접 갱신하면 실제와 다른 오래된 스키마가 남게 됨.`,`<b>D:</b> 호출을 하나로 묶어도 탐색에 드는 비용은 그대로임. 목록을 미리 제공하는 구조로 바꾼 것이 아니라 호출 형태만 바꾼 것임.`]},
     principle:"행동은 도구로, 콘텐츠 목록은 리소스로 제공함"},
    {ts:"2.5", lvl:"기초", q:`Which built-in tool should the agent use to find all callers of the function applyDiscount across the codebase?`,
     opts:[
       {t:`Grep — it searches file contents for the pattern.`, ok:true},
       {t:`Glob — it matches files by name pattern.`},
       {t:`Read — load every file and scan manually.`},
       {t:`Bash — list the directory tree first.`}],
     explain:{good:`함수 호출 지점을 찾는 일은 파일 내용을 검색하는 작업이므로 Grep을 씀.`,
       wrongs:[`<b>B:</b> Glob은 파일 이름과 경로 패턴에만 씀.`,`<b>C:</b> 모든 파일을 읽는 방법은 컨텍스트 창(context window)을 낭비하는 방식임.`,`<b>D:</b> 디렉터리 목록만으로는 호출 지점을 찾을 수 없음.`]},
     principle:"파일 내용 검색은 Grep"},
    {ts:"2.5", lvl:"실전", q:`An agent must understand how authentication works in an unfamiliar 800-file codebase before making changes. Which exploration strategy follows best practice?`,
     opts:[
       {t:`Start with Grep to locate entry points (e.g., "login", "verifyToken"), then Read those files and follow imports to trace the flow — building understanding incrementally.`, ok:true},
       {t:`Read all 800 files first so the full picture is in context before any conclusions.`},
       {t:`Use Glob to list every file, then summarize each one in order.`},
       {t:`Run Bash to dump the git history and infer the architecture from commit messages.`}],
     explain:{good:`가이드 2.5가 제시한 순서임. Grep으로 진입점을 찾고 Read로 import를 따라감. 필요한 파일만 읽으므로 컨텍스트가 보존됨.`,
       wrongs:[`<b>B:</b> 800개 파일을 먼저 읽으면 컨텍스트가 가득 차고 모델의 주의가 분산됨.`,`<b>C:</b> 파일 이름을 나열하고 순서대로 요약하는 방식으로는 호출 관계를 파악할 수 없음.`,`<b>D:</b> 커밋 메시지는 현재 코드가 어떻게 동작하는지를 정확히 알려 주지 않음.`]},
     principle:"진입점부터 단계적으로 탐색함"},
    ]},
  ]
};
