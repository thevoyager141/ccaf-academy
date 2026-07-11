/* PART 2 — 도구 설계 & MCP 통합 (D2, 18%) */
window.CCAF_CONTENT.p2 = {
  id: "p2",
  lessons: [

  /* ===== CH 1 · 2.1 도구 설명 설계 ===== */
  { id:"p2c1", ch:"CH 1", title:"도구 인터페이스와 설명 설계 (2.1)",
    steps:[
      {type:"concept", kind:"PART BRIEFING · 파트 설명", h:"PART 02 — 에이전트에게 좋은 연장을 쥐여주는 법",
       html:`<p class="lead">이 파트는 <strong>Tool Design & MCP Integration</strong>.</p>
        <h4>파트 프로필</h4>
        <ul>
          <li>출제 비중 <strong>18% ≈ 11문항</strong> · 1차 점수 <strong>64%</strong></li>
          <li>챕터 5개 + 미니테스트 · 약 1.5시간 (세션 S6~S7)</li>
        </ul>
        <h4>다루는 범위</h4>
        <ul>
          <li><strong>도구 설명 설계</strong> — 에이전트가 도구를 고르는 원리 (Ch1)</li>
          <li><strong>구조화 에러 응답</strong> — 실패를 쓸모 있게 알리기 (Ch2)</li>
          <li><strong>도구 배분·tool_choice</strong> — 누구에게 어떤 연장을 (Ch3)</li>
          <li><strong>MCP 서버 통합</strong> — 어디에 어떻게 연결하나 (Ch4)</li>
          <li><strong>내장 도구 6종</strong> — Grep/Glob/Read/Write/Edit/Bash (Ch5)</li>
        </ul>
        <div class="callout">🎯 이 파트의 공통 질문: <b>"에이전트가 도구를 잘못 고르거나 실패에서 회복 못 할 때, 어디를 고치는 게 첫 조치인가."</b> 답은 대부분 화려한 인프라가 아니라 설명(description)과 응답 구조에 있어.</div>`},
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"에이전트는 description을 읽고 도구를 고른다",
       html:`<h4>도구 선택의 원리</h4>
        <ul>
          <li>LLM이 도구를 고르는 <strong>주 메커니즘 = 도구 설명(description)</strong></li>
          <li>설명이 빈약하면("Retrieves customer information") 비슷한 도구끼리 <strong>오선택</strong> 발생</li>
          <li>모델은 코드를 못 봐 — <strong>설명이 곧 그 도구의 전부</strong></li>
        </ul>
        <h4>좋은 설명에 들어가는 4가지</h4>
        <ul>
          <li>받는 <strong>입력 형식</strong> (예: 이메일? 주문번호? 고객 ID?)</li>
          <li><strong>예시 질의</strong> — 어떤 요청에 이 도구를 쓰는지</li>
          <li><strong>엣지 케이스</strong> — 애매할 때의 동작</li>
          <li><strong>경계 설명</strong> — 비슷한 도구 대신 언제 이걸 쓰는지</li>
        </ul>
        <h4>공식 문서의 구체 기준</h4>
        <ul>
          <li>도구 설명은 <strong>최소 3~4문장</strong>, 복잡한 도구는 그 이상 — "성능에 가장 중요한 단일 요인"이라고 명시</li>
          <li>도구 이름 규칙: 영숫자·하이픈·언더스코어 1~64자 (<code>^[a-zA-Z0-9_-]{1,64}$</code>)</li>
          <li>도구 정의 3요소: <code>name</code> + <code>description</code> + <code>input_schema</code>(JSON 스키마)</li>
        </ul>
        <div class="callout">📖 용어 카드 — <b>description</b>: 도구 정의에 붙이는 설명문. 사람용 문서가 아니라 <b>모델이 읽는 선택 기준</b>이라는 게 핵심.</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"오선택이 났을 때 고치는 순서",
       html:`__MAP2:desc__<h4>① 첫 조치는 언제나 설명 확충</h4>
        <ul>
          <li>증상: "check my order #12345"에 get_customer가 불림 — 두 도구 설명이 둘 다 한 줄</li>
          <li>처방: 입력 형식·예시·경계를 담아 <strong>설명을 확장</strong> — 저비용·고효과의 첫 조치</li>
          <li>few-shot 추가·라우팅 레이어는 원인(빈약한 설명)을 안 고친 채 비용만 추가</li>
        </ul>
        <h4>② 기능이 겹치면 이름부터 갈라놓기</h4>
        <ul>
          <li>analyze_content vs analyze_document가 거의 같은 설명 → 오라우팅</li>
          <li>처방: <strong>이름 변경 + 설명 구체화</strong> (analyze_content → extract_web_results)</li>
        </ul>
        <h4>③ 범용 도구는 목적별로 쪼개기</h4>
        <ul>
          <li>generic analyze_document → <strong>extract_data_points / summarize_content / verify_claim_against_source</strong></li>
          <li>입출력 계약이 명확한 도구일수록 선택도 사용도 정확해짐</li>
        </ul>
        <h4>④ 시스템 프롬프트의 키워드 간섭 점검</h4>
        <ul>
          <li>"문서 관련 요청은 꼼꼼히 분석해" 같은 문장이 특정 도구와 <strong>의도치 않은 연상</strong>을 만들 수 있음</li>
          <li>잘 쓴 설명을 시스템 프롬프트가 덮어쓰지 않는지 검토</li>
        </ul>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1 — The new tool broke the old one",
       q:`lookup_order routed reliably for months. Last week the team added track_shipment ("Provides shipment and delivery information for orders"), and since then lookup_order — described as "Retrieves order details including delivery status" — receives half of the shipment questions, while track_shipment sometimes grabs refund-related order queries. Neither tool changed its code. What is the most effective first step?`,
       opts:[
         {t:`Revise both descriptions to remove the overlap and add boundary clauses — which query types belong to each tool, with example queries and an explicit "use X instead when..." line.`, ok:true},
         {t:`Roll back track_shipment until a dedicated routing layer can be built to classify queries before tool selection.`},
         {t:`Add few-shot examples to the system prompt showing shipment questions routing to track_shipment, expanding the set as new confusions appear.`},
         {t:`Merge both tools into one order_info tool, since two tools touching the same domain will always confuse the model.`},
       ],
       hint:`두 설명을 나란히 읽어봐 — "delivery status"가 양쪽에 다 있지? 코드는 안 바뀌었는데 행동이 바뀐 이유는 선택 재료가 바뀌었기 때문이야.`,
       explain:{
         good:`새 도구 추가로 설명 간 기능 겹침(delivery)이 생긴 게 원인이야. 2.1의 처방: 경계 설명 — 각자의 담당, 예시 질의, "이럴 땐 저 도구" 클로즈. 두 도구 모두 고쳐야 해, 오라우팅이 양방향이니까.`,
         wrongs:[
           `<b>B — 롤백 + 라우팅 레이어:</b> 설명 수정이면 될 일에 기능 후퇴 + 과잉 인프라 — 이중 과잉.`,
           `<b>C — few-shot 확장:</b> 혼동이 생길 때마다 예시를 늘리는 두더지 잡기 — 원인(겹치는 설명)은 그대로.`,
           `<b>D — 통합:</b> "같은 도메인 = 무조건 혼동"은 틀린 전제 — 경계가 명확한 설명이면 공존해. 통합은 내부 모호성만 키워.`,
         ]},
       principle:"겹침이 생겼으면 경계를 그어라"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2 — One tool, three jobs",
       q:`Your document agent has a single analyze_document tool ("Analyzes a document and returns useful information"). Logs show three failure patterns: extraction requests return summaries, summary requests return raw data tables, and fact-check requests return generic analyses. The team wants reliable behavior for all three use cases. What is the best redesign?`,
       opts:[
         {t:`Split analyze_document into purpose-specific tools with defined input/output contracts — extract_data_points, summarize_content, and verify_claim_against_source — each with a description stating when to use it.`, ok:true},
         {t:`Keep the single tool but append the user's original request verbatim so the backend can infer the intent.`},
         {t:`Add a required "mode" parameter (extract | summarize | verify) to analyze_document and instruct the model to set it correctly in the system prompt.`},
         {t:`Create three copies of analyze_document with identical descriptions but different names.`},
       ],
       hint:`한 도구가 세 가지 일을 하니까 모델도 백엔드도 뭘 원하는지 몰라. 가이드가 말한 "범용 도구" 처방이 뭐였지?`,
       explain:{
         good:`가이드 2.1의 분할 패턴 그대로: 범용 도구를 목적별 도구로 쪼개고 입출력 계약을 명확히. 이름과 설명 자체가 의도를 전달해서 오선택·오사용이 함께 줄어.`,
         wrongs:[
           `<b>B — 원문 전달:</b> 의도 해석 책임을 백엔드로 떠넘길 뿐, 모델의 도구 선택 문제는 그대로.`,
           `<b>C — mode 파라미터:</b> 그럴듯하지만 mode를 올바로 채우는 것 역시 확률적. 계약이 아니라 지시에 의존해.`,
           `<b>D — 이름만 셋:</b> 설명이 같으면 선택 기준이 없다는 원래 문제가 세 배로 늘어.`,
         ]},
       principle:"원칙 ② 근본 원인 — 계약을 명확히"},
    ]},

  /* ===== CH 2 · 2.2 구조화 에러 응답 ===== */
  { id:"p2c2", ch:"CH 2", title:"MCP 도구의 구조화 에러 응답 (2.2)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"실패에도 형식이 필요하다",
       html:`<h4>isError 플래그</h4>
        <ul>
          <li>MCP 도구가 실패를 에이전트에 알리는 공식 신호</li>
          <li>단, 플래그만으론 부족 — <strong>무슨 실패인지</strong>가 같이 가야 함</li>
        </ul>
        <h4>에러 4분류 (암기 필수)</h4>
        <ul>
          <li><strong>일시적(transient)</strong> — 타임아웃, 서비스 다운 → 재시도 가치 있음</li>
          <li><strong>검증(validation)</strong> — 잘못된 입력 → 입력을 고쳐야 함</li>
          <li><strong>비즈니스(business)</strong> — 정책 위반 (환불 기간 만료 등) → 재시도 무의미</li>
          <li><strong>권한(permission)</strong> — 접근 불가 → 재시도 무의미</li>
        </ul>
        <h4>구조화 메타데이터 3종 세트</h4>
        <ul>
          <li><code>errorCategory</code> — 위 4분류 중 무엇</li>
          <li><code>isRetryable</code> — 불리언. 재시도 낭비 방지</li>
          <li>사람이 읽을 설명 — 비즈니스 에러엔 <strong>고객 친화 설명</strong> 포함</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"뭉뚱그린 에러가 에이전트를 바보로 만든다",
       html:`__MAP2:err__<h4>① 왜 "Operation failed"가 최악인가</h4>
        <ul>
          <li>에이전트는 에러 내용을 보고 <strong>복구 전략을 고름</strong> — 재시도? 입력 수정? 포기하고 설명?</li>
          <li>모든 실패가 같은 문장이면 <strong>복구 판단 자체가 불가능</strong></li>
          <li>전형적 증상: 정책 위반(비즈니스 에러)인데 계속 재시도 → 토큰 낭비 + 고객 대기</li>
        </ul>
        <h4>② 재시도 가능 여부를 도구가 알려주기</h4>
        <ul>
          <li>비즈니스 위반엔 <code>retriable: false</code> + 고객에게 전할 설명</li>
          <li>에이전트는 그걸 받아 "환불 기간이 지나 처리가 어렵다"고 <strong>바로 설명</strong>으로 전환</li>
        </ul>
        <h4>③ 접근 실패 ≠ 빈 결과</h4>
        <ul>
          <li><strong>접근 실패</strong> — 검색을 못 한 것 → 재시도 판단 필요</li>
          <li><strong>빈 결과</strong> — 검색은 성공했고 매칭이 없는 것 → 정상 응답</li>
          <li>이 둘을 같은 형태로 반환하면 에이전트가 "없음"과 "못 봄"을 구분 못 함</li>
        </ul>
        <div class="callout">🎯 시험 포인트: 보기에 "빈 결과를 성공으로 반환" 또는 "일괄 재시도"가 보이면 거의 오답 장치. 정답은 분류 + 재시도 가능 여부 + 설명.</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1 — Retry vs re-ask",
       q:`Your coupon tool's errors default to isRetryable: true "to be safe." Logs from yesterday: a customer typo'd a coupon code, and the agent silently retried the identical apply_coupon call four times before apologizing — never asking the customer to re-check the code. Meanwhile, a genuine 30-second service outage was handled well by the same retry logic. What should change?`,
       opts:[
         {t:`Classify errors correctly at the tool: validation errors (bad input) return isRetryable: false with a description prompting corrected input, while transient errors keep isRetryable: true — the same flag can't serve both.`, ok:true},
         {t:`Lower the retry cap from four to two so bad-input loops burn fewer calls before the apology.`},
         {t:`Have the agent compare consecutive identical results and stop retrying when nothing changes between attempts.`},
         {t:`Keep the defaults but add a prompt rule: "if a coupon fails twice, ask the customer to double-check the code."`},
       ],
       hint:`같은 입력을 다시 보내면 결과가 달라지는 실패와 안 달라지는 실패가 있어. "안전하게 전부 retryable"이 왜 안전하지 않았는지 봐.`,
       explain:{
         good:`2.2의 분류가 존재하는 이유: 검증 에러는 재시도가 아니라 '수정된 입력'이 필요해. 도구가 isRetryable: false + 설명을 주면 에이전트는 즉시 고객에게 재확인을 요청하고, 일시 에러의 재시도는 그대로 살아 있어.`,
         wrongs:[
           `<b>B — 상한 축소:</b> 낭비를 줄일 뿐 잘못된 행동(재시도 대신 재요청)은 못 고치고, 정당한 일시 에러 복구까지 좁혀.`,
           `<b>C — 결과 비교 휴리스틱:</b> 그럴듯하지만 발명된 메커니즘 — 분류 정보가 있으면 필요 없는 우회로고, 첫 시도부터 낭비야.`,
           `<b>D — 프롬프트 보완:</b> 쿠폰에만 통하는 지시 — 다음 검증 에러(주소, 카드번호...)마다 규칙을 추가해야 하는 두더지 잡기.`,
         ]},
       principle:"재시도할 실패와 물어볼 실패를 가려라"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2 — Nothing came back",
       q:`Your order-search tool queries a warehouse API. Two situations currently produce the identical response {"results": []}: (a) the API timed out and the tool caught the exception, and (b) the query succeeded but no orders matched. The agent treats both as "no orders found" and tells customers their orders don't exist during outages. How should the tool behave?`,
       opts:[
         {t:`Distinguish the cases: return isError with errorCategory "transient" and isRetryable: true for timeouts, and a successful empty result only when the query actually ran and found no matches.`, ok:true},
         {t:`Return isError for both cases, since an empty result is also a kind of failure worth flagging.`},
         {t:`Have the tool retry internally forever until the warehouse API responds, so the agent never sees a timeout.`},
         {t:`Add a disclaimer to every "no orders found" message telling customers the system might be down.`},
       ],
       hint:`"못 봤다"와 "봤는데 없다"는 다른 사건이야. 지금 도구는 이 둘을 같은 모양으로 내보내고 있지?`,
       explain:{
         good:`접근 실패(재시도 판단 필요)와 정상 빈 결과(성공)를 구분해서 반환하는 게 가이드 2.2의 명시 패턴. 에이전트가 상황에 맞는 행동(재시도 vs "주문 없음" 안내)을 고를 수 있게 돼.`,
         wrongs:[
           `<b>B — 빈 결과도 에러 처리:</b> 반대 방향의 오류. 정상적인 "매칭 없음"을 실패로 위장하면 불필요한 재시도가 생겨.`,
           `<b>C — 무한 내부 재시도:</b> 장애 때 도구가 영원히 안 돌아와 — 에이전트도 고객도 묶여버려.`,
           `<b>D — 면책 문구:</b> 모든 정상 응답에 불신을 심는 증상 처치. 구분이라는 원인은 그대로.`,
         ]},
       principle:"원칙 ⑤ 접근 실패 ≠ 빈 결과"},
    ]},

  /* ===== CH 3 · 2.3 도구 배분과 tool_choice ===== */
  { id:"p2c3", ch:"CH 3", title:"도구 배분과 tool_choice (2.3)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"연장통이 크다고 일을 잘하는 게 아니다",
       html:`<h4>도구가 많으면 생기는 일</h4>
        <ul>
          <li>4~5개 대신 <strong>18개</strong>를 주면 → 선택 복잡도 증가 → <strong>선택 신뢰도 하락</strong></li>
          <li>전문 밖 도구를 주면 <strong>오용</strong>함 (합성 에이전트가 웹 검색을 시도)</li>
        </ul>
        <h4>스코프드 액세스 (scoped access)</h4>
        <ul>
          <li>기본: 역할에 필요한 도구만</li>
          <li>예외: <strong>고빈도 교차 요구</strong>엔 좁은 범위의 전용 도구 하나 (예: 합성 에이전트에게 verify_fact)</li>
          <li>범용 도구는 제약된 대안으로 교체 (fetch_url → 문서 URL만 검증해 받는 load_document)</li>
        </ul>
        <h4>tool_choice (API 설정)</h4>
        <ul>
          <li><code>"auto"</code> — 모델이 도구를 쓸지 말지 결정 (텍스트로 답해도 됨). 도구가 제공됐을 때의 기본값</li>
          <li><code>"any"</code> — <strong>어떤 도구든 반드시 호출</strong> (텍스트만 반환 불가)</li>
          <li><code>{"type":"tool","name":"..."}</code> — <strong>특정 도구를 강제</strong></li>
          <li>공식 문서엔 4번째 값도 있음: <code>"none"</code> — 도구 사용 금지 (도구를 안 줬을 때의 기본값). 시험 가이드는 위 3종만 다루지만, 보기에 none이 나와도 '없는 기능'은 아니라는 것</li>
          <li>표기 디테일: 실제 API에선 전부 객체 형태 (<code>{"type":"auto"}</code> 등) — 가이드·시험은 축약 표기를 씀</li>
          <li>any/특정 강제 시 모델은 <strong>자연어 설명 없이 곧장 도구를 호출</strong>함 (API가 그렇게 강제)</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"누구에게 무엇을, 그리고 언제 강제하나",
       html:`__MAP2:choice__<h4>① 85/15 패턴 (공식 가이드 샘플 9번 유형 — 다른 역할의 도구가 가끔 필요할 때를 묻는 문제)</h4>
        <ul>
          <li>상황: 합성 에이전트의 검증 요청 85%는 단순 사실 확인, 15%는 심층 조사</li>
          <li>정답: 85%엔 <strong>좁은 verify_fact 도구</strong>를 직접 지급, 15%는 기존 코디네이터 경유 유지</li>
          <li>오답: 웹 검색 도구 전부 지급(과잉 권한), 배치로 모아 처리(의존성 무시), 선제 캐싱(예측 불가)</li>
        </ul>
        <h4>② 강제 지정의 사용처</h4>
        <ul>
          <li>"extract_metadata가 <strong>반드시 먼저</strong> 실행돼야" → 첫 턴에 강제 지정, 후속 단계는 다음 턴에서</li>
        </ul>
        <h4>③ "any"의 사용처</h4>
        <ul>
          <li>구조화 출력이 반드시 필요할 때 — 모델이 대화 텍스트로 새는 걸 차단</li>
          <li>추출 스키마가 여러 개고 문서 유형을 모를 때: 어떤 추출 도구든 호출은 보장</li>
        </ul>
        <div class="callout">🎯 시험 포인트: "auto vs any vs 강제"를 고르게 하는 문제는 요구 수준을 봐 — "반드시 이 도구" = 강제, "반드시 도구(아무거나)" = any, "도구가 필요하면" = auto.</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1 — The parser-crashing hedge",
       q:`Your extraction step runs with tool_choice: "auto" and a firm prompt instruction to "always respond by calling an extraction tool." On clear documents it complies; on ambiguous ones it sometimes replies in prose — "This document appears to be a receipt, though I'm not fully certain..." — and the downstream JSON parser crashes. This happens in about 4% of runs. What is the correct fix?`,
       opts:[
         {t:`Set tool_choice: "any" so the model must call one of the extraction tools — structurally eliminating prose responses instead of discouraging them.`, ok:true},
         {t:`Wrap the parser in a try/catch that detects prose responses and re-submits the request until a tool call comes back.`},
         {t:`Force tool_choice to the most common extraction tool so there is never a choice to hedge over.`},
         {t:`Strengthen the instruction: "NEVER respond with text. You MUST call a tool. This is critical."`},
       ],
       hint:`지시는 이미 있었는데 4%가 샜지? "auto"가 허용하는 것과 "any"가 차단하는 것의 차이를 봐.`,
       explain:{
         good:`"auto"는 텍스트 응답을 허용하는 설정이라, 지시가 아무리 강해도 확률적으로 새. "any"는 도구 호출을 구조적으로 강제하되 어느 도구인지는 모델이 문서를 보고 고르게 남겨둬 — 모호한 문서 대응력을 지키면서 프로스를 차단해.`,
         wrongs:[
           `<b>B — 재시도 랩핑:</b> 4%의 비결정론을 받아들이고 비용으로 때우는 증상 처치 — 설정 한 줄이면 0%가 되는데.`,
           `<b>C — 특정 도구 강제:</b> 영수증 아닌 문서에 영수증 스키마를 강요 — 프로스는 없어지지만 오추출이 늘어.`,
           `<b>D — 지시 강화:</b> 이미 실패한 접근의 대문자 버전 — auto가 열어둔 문은 지시로 안 닫혀.`,
         ]},
       principle:"허용된 탈출구는 설정으로 닫는다"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2 — Metadata first, always",
       q:`Your document pipeline has four tools: extract_metadata, enrich_entities, classify_topic, and store_result. Correct enrichment requires metadata to be extracted first, but in 9% of runs the model starts with enrich_entities and produces corrupted records. Which configuration guarantees extract_metadata runs first?`,
       opts:[
         {t:`On the first request, force the tool with tool_choice: {"type": "tool", "name": "extract_metadata"}, then process subsequent steps in follow-up turns.`, ok:true},
         {t:`Set tool_choice: "any" so the model must call a tool rather than answering with text.`},
         {t:`Keep tool_choice: "auto" and add "always extract metadata first" to each tool description.`},
         {t:`Reorder the tool list so extract_metadata appears first in the tools array.`},
       ],
       hint:`"반드시 이 특정 도구부터"라는 요구야. any는 뭘 보장하고, 강제 지정은 뭘 보장했지?`,
       explain:{
         good:`특정 도구의 선행이 필수라면 forced tool selection이 유일한 보장. 이후 단계는 후속 턴에서 자연 진행 — 가이드 2.3 패턴 그대로.`,
         wrongs:[
           `<b>B — "any":</b> '아무 도구나' 호출 보장일 뿐, enrich_entities부터 시작해도 조건 충족이야.`,
           `<b>C — 설명에 지시:</b> 확률적 — 9%를 줄일 뿐 0%로 못 만들어.`,
           `<b>D — 배열 순서:</b> 도구 목록 순서는 실행 순서를 강제하지 않아. 존재하지 않는 메커니즘에 기대는 보기.`,
         ]},
       principle:"원칙 ① 강제는 설정으로 — tool_choice 3종 구분"},
    ]},

  /* ===== CH 4 · 2.4 MCP 서버 통합 ===== */
  { id:"p2c4", ch:"CH 4", title:"MCP 서버 통합 (2.4)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"연결의 두 스코프와 비밀키",
       html:`<h4>MCP 서버 설정의 두 위치</h4>
        <ul>
          <li><strong>프로젝트 스코프</strong> <code>.mcp.json</code> — 저장소에 커밋되어 <strong>팀 전체 공유</strong></li>
          <li><strong>사용자 스코프</strong> <code>~/.claude.json</code> — <strong>개인·실험용</strong>, 나에게만</li>
        </ul>
        <h4>환경변수 확장</h4>
        <ul>
          <li><code>.mcp.json</code> 안에 <code>\${GITHUB_TOKEN}</code>처럼 쓰면 각자 기계의 값으로 치환</li>
          <li>효과: <strong>비밀키를 저장소에 올리지 않고</strong> 팀 공유 설정에 인증 넣기</li>
        </ul>
        <h4>동시 발견</h4>
        <ul>
          <li>연결된 <strong>모든 MCP 서버의 도구가 연결 시점에 발견</strong>되어 동시에 사용 가능</li>
        </ul>
        <div class="callout">📖 용어 카드 — <b>환경변수</b>: 컴퓨터에 붙여두는 이름표. 이름은 공유해도 값은 각자 기계에만 있음. <b>커밋</b>: 팀 저장소에 파일을 올리는 것 — 여기 올라간 건 팀 전체가 봄.</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"연결한 다음의 세 가지 판단",
       html:`__MAP2:mcp__<h4>① MCP 도구가 외면당할 때</h4>
        <ul>
          <li>증상: 강력한 MCP 검색 도구를 연결했는데 에이전트가 <strong>내장 Grep만 씀</strong></li>
          <li>원인: MCP 도구 설명이 빈약해서 능력이 안 보임</li>
          <li>처방: <strong>설명에 능력과 출력을 상세히</strong> — Ch1과 같은 원리</li>
        </ul>
        <h4>② 만들 것인가, 가져다 쓸 것인가</h4>
        <ul>
          <li>표준 연동(Jira, GitHub 등) → <strong>커뮤니티 MCP 서버</strong> 사용</li>
          <li>커스텀 제작은 <strong>팀 고유 워크플로</strong>에만</li>
        </ul>
        <h4>③ 도구 vs 리소스</h4>
        <ul>
          <li><strong>도구</strong> = 행동 (검색해줘, 만들어줘)</li>
          <li><strong>리소스</strong> = 콘텐츠 카탈로그 노출 (이슈 요약, 문서 계층, DB 스키마)</li>
          <li>리소스로 "뭐가 있는지"를 미리 보여주면 <strong>탐색성 도구 호출이 줄어듦</strong></li>
        </ul>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1 — Onboarding day mystery",
       q:`A new developer clones the repo, runs Claude Code, and has none of the team's GitHub MCP tools — while everyone else has them. The team lead checks: the server works fine on his machine, the repo's .mcp.json doesn't mention it, and his ~/.claude.json contains the full server definition with a hardcoded token. What happened, and what is the right fix?`,
       opts:[
         {t:`The server was configured in the lead's user scope, which never leaves his machine; move the definition to the project's .mcp.json with \${GITHUB_TOKEN} environment expansion so the config is shared but each person's token stays local.`, ok:true},
         {t:`The new developer's MCP cache is stale; she should reinstall Claude Code and re-clone the repository.`},
         {t:`Copy the lead's ~/.claude.json to the new developer's machine — fastest path to parity, token included.`},
         {t:`Move the definition to .mcp.json as-is, keeping the hardcoded token since the repo is private anyway.`},
       ],
       hint:`"팀장 기계에선 되는데 새 기계에선 없다" — 이 증상 하나로 설정이 어느 스코프에 있는지 알 수 있어. 옮길 때 토큰 처리도 잊지 말고.`,
       explain:{
         good:`증상이 스코프를 증언해: 사용자 스코프(~/.claude.json)는 버전 관리 밖이라 공유가 안 돼. 팀 도구는 프로젝트 .mcp.json으로 + 하드코딩된 토큰은 \${...} 환경변수 확장으로 — 이전과 보안을 한 번에.`,
         wrongs:[
           `<b>B — 캐시 탓:</b> 존재하지 않는 메커니즘 + 증거(설정 위치)가 이미 원인을 특정했어.`,
           `<b>C — 파일 복사:</b> 팀장의 개인 토큰이 남의 기계로 — 보안 사고이자, 셋째 개발자가 오면 또 복사해야 하는 비확장 구조.`,
           `<b>D — 토큰째 커밋:</b> "private이니까"는 유출 사고의 서문 — 커밋된 비밀키는 히스토리에 영원히 남아.`,
         ]},
       principle:"증상이 스코프를 말해준다"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2 — The ignored power tool",
       q:`You connected a code-intelligence MCP server whose semantic_search tool understands symbols and call graphs — far more capable than plain text search. Yet the agent keeps using the built-in Grep for questions like "find every caller of processPayment." The MCP tool's description reads: "Searches code." What is the best fix?`,
       opts:[
         {t:`Enhance the MCP tool's description to explain its capabilities and outputs in detail — symbol-aware search, call-graph traversal, example queries — so the agent can see when it beats Grep.`, ok:true},
         {t:`Remove Grep from the agent's allowedTools so semantic_search becomes the only search option.`},
         {t:`Add a system prompt rule: "always prefer MCP tools over built-in tools."`},
         {t:`Rename the tool to super_search to signal that it is more powerful.`},
       ],
       hint:`에이전트 눈엔 "Searches code" 두 단어가 이 도구의 전부야. Grep 설명이 오히려 더 구체적이라면 뭘 고를까?`,
       explain:{
         good:`가이드 2.4 명시: MCP 도구 설명을 상세히 해서 내장 도구 대비 우위가 보이게 하라. 선택 문제의 근본 원인은 언제나 설명 품질이야.`,
         wrongs:[
           `<b>B — Grep 제거:</b> 단순 텍스트 검색이 더 적합한 작업까지 막는 과잉 조치. 최소 권한은 '뺏기'가 아니라 '맞는 도구 주기'.`,
           `<b>C — "MCP 우선" 규칙:</b> 도구 무관 일괄 지시는 키워드 간섭의 전형 — Grep이 맞는 상황에서도 왜곡돼.`,
           `<b>D — 이름만 변경:</b> super라는 형용사는 능력 정보가 아니야. 판단 재료는 여전히 없음.`,
         ]},
       principle:"원칙 ② 근본 원인 — 설명이 선택을 만든다"},
    ]},

  /* ===== CH 5 · 2.5 내장 도구 6종 ===== */
  { id:"p2c5", ch:"CH 5", title:"내장 도구 6종 선택 기준 (2.5)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"여섯 개의 연장, 각자의 자리",
       html:`<h4>검색 2종 — 가장 많이 헷갈리는 쌍</h4>
        <ul>
          <li><strong>Grep</strong> — 파일 <strong>내용</strong> 검색 (함수명, 에러 메시지, import문)</li>
          <li><strong>Glob</strong> — 파일 <strong>이름·경로</strong> 패턴 매칭 (<code>**/*.test.tsx</code>)</li>
          <li>구분법: "무엇이 쓰여 있나" = Grep / "어떤 이름의 파일이 있나" = Glob</li>
        </ul>
        <h4>파일 조작 3종</h4>
        <ul>
          <li><strong>Read</strong> — 파일 전체 읽기 / <strong>Write</strong> — 파일 전체 쓰기</li>
          <li><strong>Edit</strong> — <strong>고유한 텍스트 매칭</strong>으로 부분 수정</li>
          <li>Edit이 "매칭이 여러 곳"으로 실패하면 → <strong>Read + Write</strong>로 대체</li>
        </ul>
        <h4>Bash</h4>
        <ul>
          <li>셸 명령 실행 — 테스트 돌리기, 빌드, git 등</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"도구를 잇는 탐색 전략",
       html:`__MAP2:builtin__<h4>① 점진적 이해 — 전부 읽고 시작하지 않기</h4>
        <ul>
          <li>정석: <strong>Grep으로 진입점</strong> 찾기 → <strong>Read로 import 따라가며</strong> 흐름 추적</li>
          <li>오답 패턴: "모든 파일을 먼저 Read해서 전체를 파악" — 컨텍스트 낭비 + 주의력 희석</li>
        </ul>
        <h4>② 래퍼 모듈 추적</h4>
        <ul>
          <li>함수가 여러 래퍼를 거쳐 쓰일 때: <strong>export된 이름을 먼저 전부 확인</strong> → 각 이름을 코드베이스 전체에서 검색</li>
        </ul>
        <h4>③ Edit 실패 대응</h4>
        <ul>
          <li>같은 코드 조각이 여러 곳에 있으면 Edit의 고유 매칭이 실패</li>
          <li>정석 대체: Read로 전체 로드 → 수정본을 Write — 확실하고 재현 가능</li>
        </ul>
        <div class="callout">🎯 시험 포인트: 상황→도구 즉답 훈련이 전부야. "파일 이름 패턴" 단어가 보이면 Glob, "내용/호출자/에러 문자열"이면 Grep.</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1 — Four migration plans",
       q:`The config key LEGACY_TIMEOUT must be renamed to REQUEST_TIMEOUT_MS across a 900-file repo. It appears in code, in *.yaml configs, and — the team suspects — in a few string literals used for logging. Four proposed plans. Which is right?`,
       opts:[
         {t:`Grep for LEGACY_TIMEOUT across all file contents to enumerate every occurrence (code, YAML, strings), Read the surrounding context of each, then Edit occurrence by occurrence — falling back to Read + Write where identical snippets defeat Edit's unique matching.`, ok:true},
         {t:`Glob for **/*.yaml and **/*.ts, open each matched file, and rename what's found — the file extensions define where configs can live.`},
         {t:`Run one Bash command — grep -rl | xargs sed -i 's/LEGACY_TIMEOUT/REQUEST_TIMEOUT_MS/g' — done in ten seconds across all 900 files.`},
         {t:`Read the repository's entry points and follow imports to find usages, renaming as the dependency tree unfolds.`},
       ],
       hint:`①발생 지점을 '전부' 찾는 도구 ②고칠 때의 정밀도 ③Edit이 막힐 때의 대체 경로 — 세 박자를 다 갖춘 계획을 골라. C는 빠른 만큼 뭘 놓치는지 생각해봐.`,
       explain:{
         good:`내용 검색(Grep)이 파일 유형과 무관하게 전 발생 지점을 잡고, 맥락 확인(Read) 후 정밀 수정(Edit), 중복 매칭엔 Read+Write 폴백 — 2.5의 도구 체인 전체를 조립하는 문제야.`,
         wrongs:[
           `<b>B — 확장자 Glob:</b> "설정은 이 확장자에만 있다"는 가정이 함정 — 로그 문자열 등 다른 파일의 발생 지점을 통째로 놓쳐.`,
           `<b>C — 일괄 sed:</b> 빨라서 매력적이지만 무맥락 전역 치환 — 주석·유사 이름·문서까지 무차별로 바꾸고, 검토 단계가 없어 되돌리기도 어려워.`,
           `<b>D — import 추적:</b> 코드 흐름엔 좋지만 YAML·문자열은 import 그래프 밖이라 못 찾아.`,
         ]},
       principle:"전수 탐색 → 맥락 → 정밀 수정 + 폴백"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2 — When Edit refuses",
       q:`During an automated refactor, your agent tries to Edit the line "return retry(fetchOrder);" in utils/orders.ts, but the Edit fails: the exact text appears in four places in the file. The agent must change only the occurrence inside the fetchWithBackoff function. What is the most reliable next step?`,
       opts:[
         {t:`Read the full file, apply the change to the correct occurrence in memory, and Write the updated file back.`, ok:true},
         {t:`Retry Edit with a shorter anchor string, such as "retry(", to loosen the match.`},
         {t:`Run a Bash sed command replacing all four occurrences at once.`},
         {t:`Ask the user to make this particular change manually since automation failed.`}],
       hint:`Edit이 고유 매칭에 실패했을 때의 공식 대체 경로가 있었지?`,
       explain:{
         good:`가이드 2.5 명시: Edit이 고유 앵커를 못 찾으면 Read + Write가 신뢰할 수 있는 대체 경로. 파일 전체를 손에 쥐고 정확한 위치만 고칠 수 있어.`,
         wrongs:[
           `<b>B — 더 짧은 앵커:</b> 매칭이 4곳인 게 문제인데 앵커를 줄이면 매칭은 더 늘어 — 반대 방향.`,
           `<b>C — sed 전체 치환:</b> 바꾸면 안 되는 3곳까지 바꿔버리는 파괴적 조치.`,
           `<b>D — 수동 전환:</b> 공식 대체 경로가 있는데 자동화를 포기하는 건 이르다.`,
         ]},
       principle:"Edit 실패 → Read + Write"},
    ]},

  /* ===== D2 미니테스트 ===== */
  { id:"p2test", type:"test", title:"D2 미니테스트 — 도구 설계 & MCP 10문항",
    questions:[
    {ts:"2.1", lvl:"기초", q:`Two tools with near-identical minimal descriptions keep getting confused by the agent. What is the primary mechanism an LLM uses to select among tools?`,
     opts:[
       {t:`The tool descriptions — they are the model's main evidence for choosing a tool.`, ok:true},
       {t:`The order in which tools appear in the tools array.`},
       {t:`The internal implementation code of each tool.`},
       {t:`The frequency with which each tool succeeded in past sessions.`}],
     explain:{good:`도구 선택의 주 메커니즘은 description. 그래서 오선택의 첫 처방이 항상 설명 확충이야.`,
       wrongs:[`<b>B:</b> 배열 순서는 선택을 결정하지 않아.`,`<b>C:</b> 모델은 구현 코드를 볼 수 없어.`,`<b>D:</b> 그런 자동 학습 메커니즘은 없어.`]},
     principle:"설명이 곧 선택 기준"},
    {ts:"2.1", lvl:"실전", q:`After you added the system prompt line "For anything involving documents, analyze thoroughly before answering," the agent began routing web-page questions to analyze_document instead of extract_web_results — despite both tools having solid descriptions. What is the most likely cause and fix?`,
     opts:[
       {t:`The keyword-sensitive instruction created an unintended association with analyze_document; revise the system prompt wording rather than the tool descriptions.`, ok:true},
       {t:`The tool descriptions have degraded and should both be rewritten from scratch.`},
       {t:`The model needs few-shot examples of web questions routing to extract_web_results.`},
       {t:`analyze_document should be temporarily disabled until routing stabilizes.`}],
     explain:{good:`잘 쓴 설명도 시스템 프롬프트의 키워드 민감 지시("documents...analyze")가 덮어쓸 수 있어. 가이드 2.1의 마지막 항목 — 프롬프트 문구를 점검·수정하는 게 정답.`,
       wrongs:[`<b>B:</b> 설명은 문제없다고 지문에 명시됨 — 변경 시점(프롬프트 추가 직후)이 원인을 가리켜.`,`<b>C:</b> 원인(프롬프트 간섭)을 두고 보정 레이어만 추가.`,`<b>D:</b> 멀쩡한 도구를 끄는 과잉 조치.`]},
     principle:"원칙 ② 근본 원인 — 시스템 프롬프트 간섭"},
    {ts:"2.2", lvl:"기초", q:`Why do uniform error responses like "Operation failed" harm agent reliability?`,
     opts:[
       {t:`The agent cannot choose an appropriate recovery strategy — it can't tell retryable failures from policy violations or bad input.`, ok:true},
       {t:`They consume more tokens than structured errors.`},
       {t:`They cause the MCP connection to reset after repeated failures.`},
       {t:`They prevent the isError flag from being set.`}],
     explain:{good:`에러 내용이 복구 판단의 재료야. 전부 같은 문장이면 재시도/입력 수정/설명 전환 중 뭘 해야 할지 알 수 없어.`,
       wrongs:[`<b>B:</b> 토큰 문제가 아니라 정보 문제.`,`<b>C:</b> 연결과 무관.`,`<b>D:</b> isError는 별개로 설정 가능.`]},
     principle:"원칙 ⑤ 실패는 구조화"},
    {ts:"2.2", lvl:"실전", q:`Your subagent's document-fetch tool fails intermittently with timeouts. The team debates where recovery should live. Per best practice, what should the subagent do?`,
     opts:[
       {t:`Attempt local recovery for transient failures (e.g., limited retries), and propagate to the coordinator only errors it cannot resolve — including what was attempted and any partial results.`, ok:true},
       {t:`Propagate every failure immediately to the coordinator, which has more context to decide.`},
       {t:`Suppress transient failures and return whatever partial results exist, marked as success.`},
       {t:`Terminate its task on first failure so the coordinator can restart the whole pipeline cleanly.`}],
     explain:{good:`가이드 2.2: 일시 에러는 서브에이전트가 로컬 복구, 해결 못 한 것만 시도 내역·부분 결과와 함께 위로. 코디네이터의 결정 부담과 왕복이 줄어.`,
       wrongs:[`<b>B:</b> 사소한 타임아웃까지 전부 올리면 코디네이터가 노이즈에 잠겨.`,`<b>C:</b> 실패를 성공으로 위장 — 최악의 안티패턴.`,`<b>D:</b> 단일 실패로 전체 중단 역시 명시된 안티패턴.`]},
     principle:"로컬 복구 먼저, 전파는 구조화"},
    {ts:"2.3", lvl:"기초", q:`Your extraction step must return structured data and never plain conversational text, but any of the three extraction tools is acceptable. Which tool_choice setting fits?`,
     opts:[
       {t:`tool_choice: "any" — the model must call some tool, but may choose which.`, ok:true},
       {t:`tool_choice: "auto" — the model decides whether to use a tool.`},
       {t:`Forced selection of one specific extraction tool.`},
       {t:`No tool_choice setting; rely on prompt instructions to always use a tool.`}],
     explain:{good:`"반드시 도구, 어느 것이든" = "any". 텍스트로 새는 걸 구조적으로 차단해.`,
       wrongs:[`<b>B:</b> auto는 텍스트 응답을 허용.`,`<b>C:</b> 문서 유형을 모르면 특정 강제가 오히려 틀린 도구를 부를 수 있어.`,`<b>D:</b> 프롬프트 의존은 확률적.`]},
     principle:"요구 수준 → tool_choice 매칭"},
    {ts:"2.3", lvl:"실전", q:`An 18-tool support agent shows degraded tool selection. Analysis: the returns workflow uses 4 tools for 90% of traffic; the remaining 14 tools serve rare admin tasks. What is the best restructuring?`,
     opts:[
       {t:`Scope the main agent to the 4 high-traffic tools, and route rare admin tasks to a separate path (e.g., a dedicated agent or coordinator) that has the remaining tools.`, ok:true},
       {t:`Keep all 18 tools but sort them by usage frequency in the tools array.`},
       {t:`Ask the model to "think carefully before selecting tools" in the system prompt.`},
       {t:`Merge the 14 rare tools into one mega_admin tool to reduce the count.`}],
     explain:{good:`도구 과다(18개)가 선택 신뢰도를 떨어뜨리는 원인. 역할별 스코핑 — 주 흐름엔 4개만, 희귀 작업은 별도 경로 — 이 최소 권한의 적용이야.`,
       wrongs:[`<b>B:</b> 배열 순서는 선택 품질에 보장이 없어.`,`<b>C:</b> "신중히 골라"는 지시로 복잡도를 못 줄여.`,`<b>D:</b> 14개 기능을 한 도구에 욱여넣으면 내부 모호성이 폭증 — 범용 도구 안티패턴.`]},
     principle:"원칙 ④ 최소 권한 — 역할별 스코핑"},
    {ts:"2.4", lvl:"기초", q:`Where should a personal, experimental MCP server be configured so it doesn't affect teammates?`,
     opts:[
       {t:`In the user-scoped ~/.claude.json.`, ok:true},
       {t:`In the project-scoped .mcp.json.`},
       {t:`In CLAUDE.md at the project root.`},
       {t:`In .claude/commands/ as a slash command.`}],
     explain:{good:`개인·실험용은 사용자 스코프 ~/.claude.json — 버전 관리에 안 올라가서 팀에 영향 없음.`,
       wrongs:[`<b>B:</b> .mcp.json은 커밋되어 팀 전체에 적용.`,`<b>C:</b> CLAUDE.md는 지시·컨텍스트용이지 서버 설정이 아니야.`,`<b>D:</b> 커맨드는 MCP 서버 설정 메커니즘이 아니야.`]},
     principle:"스코프: 팀 = 프로젝트, 개인 = 사용자"},
    {ts:"2.4", lvl:"실전", q:`Your agent wastes several turns per session calling list_tables, describe_table, and sample_rows just to discover what data exists before answering. What MCP capability addresses this exploration overhead?`,
     opts:[
       {t:`Expose the database schema as an MCP resource — a content catalog the agent can see without exploratory tool calls.`, ok:true},
       {t:`Increase the agent's max iterations so exploration completes reliably.`},
       {t:`Cache the results of list_tables in the system prompt manually each week.`},
       {t:`Create one more tool, explore_everything, that runs all discovery calls at once.`}],
     explain:{good:`리소스 = 콘텐츠 카탈로그(스키마·문서 계층·이슈 요약) 노출 → 탐색성 호출 자체가 불필요해져. 가이드 2.4의 리소스 사용처 그대로.`,
       wrongs:[`<b>B:</b> 낭비를 더 오래 하게 해줄 뿐.`,`<b>C:</b> 수동 갱신은 낡은 스키마를 심는 지름길.`,`<b>D:</b> 호출을 하나로 묶어도 탐색 비용 자체는 그대로 — 구조(카탈로그)가 아니라 포장만 바꾼 것.`]},
     principle:"행동은 도구, 카탈로그는 리소스"},
    {ts:"2.5", lvl:"기초", q:`Which built-in tool should the agent use to find all callers of the function applyDiscount across the codebase?`,
     opts:[
       {t:`Grep — it searches file contents for the pattern.`, ok:true},
       {t:`Glob — it matches files by name pattern.`},
       {t:`Read — load every file and scan manually.`},
       {t:`Bash — list the directory tree first.`}],
     explain:{good:`함수 호출 = 파일 내용 검색 = Grep.`,
       wrongs:[`<b>B:</b> Glob은 이름·경로 패턴 전용.`,`<b>C:</b> 전부 읽기는 컨텍스트 낭비 안티패턴.`,`<b>D:</b> 디렉토리 목록은 호출자를 못 찾아.`]},
     principle:"내용은 Grep"},
    {ts:"2.5", lvl:"실전", q:`An agent must understand how authentication works in an unfamiliar 800-file codebase before making changes. Which exploration strategy follows best practice?`,
     opts:[
       {t:`Start with Grep to locate entry points (e.g., "login", "verifyToken"), then Read those files and follow imports to trace the flow — building understanding incrementally.`, ok:true},
       {t:`Read all 800 files first so the full picture is in context before any conclusions.`},
       {t:`Use Glob to list every file, then summarize each one in order.`},
       {t:`Run Bash to dump the git history and infer the architecture from commit messages.`}],
     explain:{good:`가이드 2.5의 점진 전략: Grep 진입점 → Read로 import 추적. 필요한 파일만 읽어 컨텍스트를 보존해.`,
       wrongs:[`<b>B:</b> 800파일 선독은 컨텍스트 폭발 + 주의력 희석.`,`<b>C:</b> 이름 나열·순서 요약은 흐름(호출 관계)을 못 잡아.`,`<b>D:</b> 커밋 메시지는 현재 코드 동작의 신뢰할 수 없는 대리물.`]},
     principle:"점진적 탐색 — 진입점부터"},
    ]},
  ]
};
