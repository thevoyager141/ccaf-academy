/* PART 2 · 도구 설계 & MCP 통합 (D2, 18%) */
window.CCAF_CONTENT.p2 = {
  id: "p2",
  lessons: [

  /* ===== CH 1 · 2.1 도구 설명 설계 ===== */
  { id:"p2c1", ch:"CH 1", title:"도구 인터페이스와 설명 설계 (2.1)",
    steps:[
      {type:"concept", kind:"PART BRIEFING · 파트 설명", h:"PART 02 · 도구 설계와 MCP 통합",
   html:`<h4>① 다루는 영역</h4>
<ul>
<li>도구(tool): Claude가 호출할 수 있게 연결해 둔 기능. 예: 주문 조회, 파일 읽기, 웹 검색</li>
<li>이 파트의 주제: Claude가 도구를 정확히 고르고 실패했을 때 회복하게 만드는 설계</li>
<li>영어 이름: Tool Design &amp; MCP Integration</li>
</ul>
<h4>② 챕터 구성</h4>
<table>
<tr><th>챕터</th><th>주제</th></tr>
<tr><td>CH 1</td><td>도구 설명(description) 작성. Claude가 도구를 고르는 근거</td></tr>
<tr><td>CH 2</td><td>오류 응답 형식. 실패의 종류를 Claude가 알아볼 수 있게 돌려주는 방법</td></tr>
<tr><td>CH 3</td><td>도구 배분과 호출 설정. 어떤 역할에 어떤 도구를 줄지 결정</td></tr>
<tr><td>CH 4</td><td>MCP 서버 연결. 외부 서비스의 도구를 가져오는 방법</td></tr>
<tr><td>CH 5</td><td>Claude Code의 기본 제공 도구 선택 기준</td></tr>
<tr><td>CH 6</td><td>서버에서 실행되는 도구와 Agent Skills</td></tr>
</table>
<h4>③ 파트 전체에 쓰는 판단 기준</h4>
<ul>
<li>도구를 잘못 고르는 문제의 첫 해결책: 도구 설명과 응답 형식 수정</li>
<li>새 장치를 추가하는 방법은 그다음 순서</li>
<li>자격시험 출제 비중: 18%</li>
</ul>`},
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"도구 설명: Claude가 도구를 고를 때 읽는 글",
   html:`<h4>① 도구 선택의 근거</h4>
<ul>
<li>Claude가 여러 도구 중 하나를 고를 때 읽는 글은 도구 설명(description)</li>
<li>Claude는 도구가 내부에서 어떻게 동작하는지 볼 수 없음</li>
<li>설명이 한 줄이면 기능이 비슷한 도구끼리 잘못 고르는 문제 발생</li>
</ul>
<h4>② 도구 정의의 세 항목</h4>
<table>
<tr><th>항목</th><th>내용</th></tr>
<tr><td><code>name</code></td><td>도구 이름. 영문자, 숫자, 하이픈, 밑줄로 1~64자</td></tr>
<tr><td><code>description</code></td><td>도구 설명. 하는 일, 쓰는 때, 쓰지 않는 때</td></tr>
<tr><td><code>input_schema</code></td><td>도구가 받는 입력값의 양식. JSON 스키마로 작성</td></tr>
</table>
<h4>③ 좋은 설명에 들어가는 네 가지</h4>
<ul>
<li>입력 형식: 받는 값이 이메일인지 주문 번호인지 고객 번호인지</li>
<li>사용 예시: 어떤 요청에 이 도구를 쓰는지</li>
<li>예외 상황: 입력이 애매할 때의 동작</li>
<li>다른 도구와의 경계: 기능이 비슷한 도구 대신 이 도구를 쓰는 조건</li>
</ul>
<div class="fig"><b>도구 설명 비교</b><br>
부족한 설명: "고객 정보를 조회"&nbsp;&nbsp;<span class="an">← 주문 조회 도구와 구분 불가</span><br>
<br>
충분한 설명: "고객 번호나 이메일로 고객의 이름, 연락처, 등급을 조회.<br>
&nbsp;&nbsp;본인 확인이 필요한 요청에서 가장 먼저 사용.<br>
&nbsp;&nbsp;주문 내역은 반환하지 않음. 주문 내역은 lookup_order 사용."<br>
<span class="an">← 입력 형식, 쓰는 때, 다른 도구와의 경계 포함</span>
</div>
<ul>
<li>분량 기준: 최소 서너 문장. 복잡한 도구는 더 길게</li>
<li>작성 기준 전체: <a href="https://platform.claude.com/docs/ko/agents-and-tools/tool-use/define-tools" target="_blank" rel="noopener">Claude 공식 문서 '도구 정의하기' 페이지</a> (한국어)</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>도구 설명(description)</b>: 도구 정의에 함께 넣는 글. 사람이 아니라 Claude가 도구를 고를 때 읽는 근거</li>
<li><b>JSON 스키마</b>: 항목과 값의 종류를 정해 둔 양식. Part 4 CH 3에서 다루는 내용</li>
<li><b>lookup_order</b>: 예시에 쓴 도구 이름. 주문 조회 도구</li>
</ul>
</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"잘못 고른 도구를 바로잡는 순서",
   html:`__MAP2:desc__<h4>① 설명 보강</h4>
<ul>
<li>증상: "주문 12345번 확인해 줘"라는 요청에 고객 조회 도구 호출. 두 도구의 설명이 모두 한 줄</li>
<li>해결: 입력 형식, 사용 예시, 다른 도구와의 경계를 설명에 추가</li>
<li>가장 먼저 하는 이유: 비용이 가장 적고 원인을 직접 수정</li>
<li>효과가 부족한 방법: 예시 추가, 요청을 미리 분류하는 장치 신설. 부족한 설명은 그대로 남음</li>
</ul>
<h4>② 기능이 겹치는 도구의 이름 구분</h4>
<ul>
<li>증상: <code>analyze_content</code>와 <code>analyze_document</code>의 설명이 거의 같아 Claude가 구분하지 못함</li>
<li>해결: 이름과 설명을 하는 일에 맞게 변경. 예: <code>analyze_content</code>를 <code>extract_web_results</code>로 변경</li>
</ul>
<h4>③ 여러 일을 하는 도구의 분리</h4>
<ul>
<li>증상: 도구 하나가 추출, 요약, 사실 확인을 모두 담당</li>
<li>해결: 목적별 도구로 분리</li>
</ul>
<div class="fig"><b>도구 분리 전후</b><br>
분리 전: analyze_document&nbsp;&nbsp;<span class="an">← 무엇을 돌려줄지 불분명</span><br>
분리 후: extract_data_points&nbsp;&nbsp;<span class="an">← 수치와 사실 추출</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;summarize_content&nbsp;&nbsp;<span class="an">← 요약</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;verify_claim_against_source&nbsp;&nbsp;<span class="an">← 원문과 대조</span>
</div>
<h4>④ 시스템 프롬프트 점검</h4>
<ul>
<li>증상: "문서와 관련된 요청은 꼼꼼히 분석할 것" 같은 문장 때문에 특정 도구만 계속 호출</li>
<li>해결: 시스템 프롬프트의 단어가 도구 이름이나 설명과 의도하지 않게 연결되는지 확인</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 도구 호출 기록</div>
요청: "주문 12345번 확인해 줘"<br>
<span class="sel">호출한 도구: get_customer</span><br>
기대한 도구: lookup_order
</div>
<p class="cap">이해를 돕기 위한 예시. 이런 기록이 반복되면 두 도구의 설명부터 확인.</p>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>시스템 프롬프트(system prompt)</b>: 대화 전체에 적용되는 기본 지시문</li>
<li><b>get_customer</b>: 예시에 쓴 도구 이름. 고객 조회 도구</li>
</ul>
</div>`},
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
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"오류 응답: 실패의 종류와 다음 행동을 알려 주는 형식",
   html:`<h4>① 실패 표시</h4>
<ul>
<li>MCP 도구가 실패를 알리는 표시: <code>isError</code></li>
<li>이 표시만으로는 부족. 어떤 종류의 실패인지가 함께 전달돼야 Claude가 다음 행동을 결정</li>
</ul>
<h4>② 오류 네 종류</h4>
<table>
<tr><th>종류</th><th>예</th><th>다시 시도</th></tr>
<tr><td>일시적 오류<br>transient</td><td>응답 시간 초과. 서비스 일시 중단</td><td>의미 있음</td></tr>
<tr><td>입력 오류<br>validation</td><td>형식이 틀린 주문 번호</td><td>입력을 고친 뒤에 의미 있음</td></tr>
<tr><td>정책 오류<br>business</td><td>환불 기간 만료</td><td>의미 없음</td></tr>
<tr><td>권한 오류<br>permission</td><td>접근 권한 없음</td><td>의미 없음</td></tr>
</table>
<h4>③ 오류와 함께 돌려주는 세 가지</h4>
<ul>
<li><code>errorCategory</code>: 위 네 종류 중 어느 것인지</li>
<li><code>isRetryable</code>: 다시 시도할 가치가 있는지. 참 또는 거짓</li>
<li>설명 문장: 사람이 읽을 수 있는 안내. 정책 오류에는 고객에게 그대로 전할 수 있는 문장</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 환불 도구가 돌려준 오류 응답</div>
isError: true<br>
errorCategory: "business"<br>
<span class="sel">isRetryable: false</span><br>
message: "환불 가능 기간 30일이 지나 환불할 수 없습니다."
</div>
<p class="cap">이해를 돕기 위한 예시. Claude는 다시 시도하지 않고 고객에게 안내 문장을 전달.</p>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>MCP 서버</b>: 외부 서비스의 도구를 Claude에 연결해 주는 프로그램. CH 4에서 다루는 내용</li>
<li><b>isError</b>: 도구 실행이 실패했다는 표시</li>
<li><b>재시도(retry)</b>: 같은 요청을 다시 보내는 일</li>
</ul>
</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"오류 응답 설계의 세 가지 기준",
   html:`__MAP2:err__<h4>① 실패마다 다른 응답</h4>
<ul>
<li>Claude는 오류 내용을 읽고 다음 행동을 결정. 다시 시도, 입력 수정, 사용자 안내 중 선택</li>
<li>모든 실패가 "Operation failed" 한 줄이면 결정할 근거 없음</li>
<li>자주 생기는 문제: 정책 오류에 재시도 반복. 비용이 늘고 고객 대기 시간 증가</li>
</ul>
<div class="fig"><b>같은 실패, 다른 응답</b><br>
"Operation failed"&nbsp;&nbsp;<span class="an">← 다시 시도할지 판단 불가. 재시도 반복</span><br>
종류: 정책 오류, 재시도: 불가, 안내 문장 포함&nbsp;&nbsp;<span class="an">← 재시도 없이 고객 안내</span>
</div>
<h4>② 재시도 여부는 도구가 전달</h4>
<ul>
<li>정책 오류: 재시도 불가 표시와 고객 안내 문장을 함께 반환</li>
<li>Claude의 다음 행동: 재시도를 멈추고 "환불 기간이 지나 처리가 어렵다"는 안내 전달</li>
</ul>
<h4>③ 접근 실패와 빈 결과의 구분</h4>
<table>
<tr><th>경우</th><th>뜻</th><th>응답</th></tr>
<tr><td>접근 실패</td><td>검색 자체를 하지 못함</td><td>오류로 반환. 재시도 여부 표시</td></tr>
<tr><td>빈 결과</td><td>검색은 정상. 조건에 맞는 항목 없음</td><td>정상 응답으로 반환</td></tr>
</table>
<ul>
<li>두 경우를 같은 형태로 돌려주면 Claude는 "없음"과 "확인하지 못함"을 구분할 수 없음</li>
<li>피해야 할 설계: 실패를 빈 결과로 반환. 모든 실패를 한꺼번에 재시도</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>타임아웃(timeout)</b>: 정해진 시간 안에 응답이 오지 않아 중단된 상태</li>
<li><b>정책 오류</b>: 요청 형식은 맞지만 회사 규정 때문에 처리할 수 없는 경우</li>
</ul>
</div>`},
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
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"도구 배분: 역할에 필요한 도구만 주는 원칙",
   html:`<h4>① 도구가 많을 때 생기는 문제</h4>
<ul>
<li>도구 4~5개 대신 18개를 주면 고를 대상이 늘어 잘못 고를 확률 증가</li>
<li>맡은 일과 무관한 도구를 주면 그 도구를 잘못 사용. 예: 보고서 작성 담당 에이전트가 웹 검색 시도</li>
</ul>
<h4>② 범위를 좁힌 도구 배분</h4>
<ul>
<li>원칙: 역할에 필요한 도구만 지급. 영어 이름은 scoped access</li>
<li>다른 역할의 기능이 자주 필요한 경우: 범위가 좁은 전용 도구 하나만 추가. 예: 작성 담당 에이전트에 사실 확인 도구 <code>verify_fact</code></li>
<li>범위가 넓은 도구: 범위를 제한한 도구로 교체. 예: 모든 주소를 여는 <code>fetch_url</code> 대신 문서 주소만 받는 <code>load_document</code></li>
</ul>
<div class="fig"><b>보고서 작성 담당 에이전트의 도구</b><br>
전부 지급: 웹 검색, 파일 수정, 메일 발송 등 18개&nbsp;&nbsp;<span class="an">← 맡은 일 밖의 도구 사용</span><br>
필요한 도구만: 자료 읽기, 요약, verify_fact&nbsp;&nbsp;<span class="an">← 맡은 일에 집중</span>
</div>
<h4>③ 도구 호출 설정</h4>
<table>
<tr><th><code>tool_choice</code> 값</th><th>동작</th></tr>
<tr><td><code>auto</code></td><td>도구 호출 여부를 Claude가 결정. 글로만 답하는 경우도 있음. 도구를 준 경우의 기본값</td></tr>
<tr><td><code>any</code></td><td>연결된 도구 중 하나를 반드시 호출</td></tr>
<tr><td>도구 이름 지정</td><td>지정한 도구를 반드시 호출</td></tr>
<tr><td><code>none</code></td><td>도구 호출 금지. 도구를 주지 않은 경우의 기본값</td></tr>
</table>
<ul>
<li>실제 요청에 적는 형태: <code>{"type": "auto"}</code>, <code>{"type": "tool", "name": "도구 이름"}</code></li>
<li><code>any</code>와 도구 이름 지정에서는 Claude가 설명 문장 없이 바로 도구 호출</li>
<li>모델 조건: <code>any</code>와 도구 이름 지정은 일부 모델에서만 동작. Claude Fable 5.2, Opus 5.5, Sonnet 5.5는 400 오류로 거절</li>
<li>모델별 지원 여부: <a href="https://platform.claude.com/docs/ko/agents-and-tools/tool-use/define-tools#forcing-tool-use" target="_blank" rel="noopener">Claude 공식 문서 '도구 정의하기' 페이지의 '도구 사용 강제하기' 항목</a> (한국어)</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>tool_choice</b>: 도구를 호출할지와 어떤 도구를 호출할지 정하는 설정</li>
<li><b>verify_fact, fetch_url, load_document</b>: 예시에 쓴 도구 이름. 사실 확인, 웹 주소 열기, 문서 불러오기 도구</li>
<li><b>400 오류</b>: 요청 내용에 문제가 있어 처리하지 않았다는 응답</li>
</ul>
</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"도구 배분과 호출 설정의 판단 기준",
   html:`__MAP2:choice__<h4>① 다른 역할의 도구가 가끔 필요한 경우</h4>
<ul>
<li>상황: 작성 담당 에이전트의 확인 요청 중 85%는 단순 사실 확인, 15%는 깊은 조사</li>
<li>해결: 85%에 해당하는 일은 범위가 좁은 <code>verify_fact</code>를 직접 지급. 15%는 지금처럼 코디네이터를 거쳐 처리</li>
</ul>
<table>
<tr><th>다른 방법</th><th>문제</th></tr>
<tr><td>웹 검색 도구 전체 지급</td><td>필요 이상의 권한</td></tr>
<tr><td>확인 요청을 모아 한 번에 처리</td><td>앞의 확인 결과가 필요한 뒤 작업이 멈춤</td></tr>
<tr><td>필요할 자료를 미리 저장</td><td>무엇이 필요할지 미리 알 수 없음</td></tr>
</table>
<h4>② 요구 수준별 설정</h4>
<table>
<tr><th>요구</th><th>설정</th></tr>
<tr><td>필요할 때만 도구 사용</td><td><code>auto</code></td></tr>
<tr><td>반드시 도구를 쓰되 어느 도구든 가능</td><td><code>any</code></td></tr>
<tr><td>반드시 특정 도구 사용</td><td>도구 이름 지정</td></tr>
</table>
<ul>
<li><code>any</code>를 쓰는 상황: 글이 아닌 정해진 양식의 결과가 반드시 필요한 작업. 문서 종류를 미리 알 수 없고 추출 도구가 여러 개인 작업</li>
<li>도구 이름 지정을 쓰는 상황: 특정 도구가 가장 먼저 실행돼야 하는 작업. 첫 요청에서 그 도구를 지정하고 다음 단계는 그다음 요청에서 진행</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · auto 설정에서 생긴 문제</div>
요청: 계약서에서 계약일과 금액 추출<br>
<span class="sel">답: "이 계약서의 계약일은 3월 4일이며 금액은..."</span><br>
기대한 답: 추출 도구 호출
</div>
<p class="cap">이해를 돕기 위한 예시. auto 설정에서는 글로 답하는 경우가 남음. 뒤 단계의 프로그램은 글로 된 답을 읽지 못함.</p>
<h4>③ 강제 호출을 거절하는 모델에서 쓰는 방법</h4>
<ul>
<li><code>auto</code>와 엄격한 도구 사용(<code>strict: true</code>)을 함께 사용. 도구 입력값이 양식과 일치하도록 보장</li>
<li>답의 양식만 고정하면 되는 작업: JSON 출력. Part 4 CH 3에서 다루는 내용</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>코디네이터(coordinator)</b>: 작업을 나누고 맡기고 결과를 모으는 에이전트. Part 1 CH 3에서 다룬 내용</li>
<li><b>엄격한 도구 사용(strict tool use)</b>: 도구 정의에 strict: true를 넣어 입력값이 양식과 일치하도록 보장하는 기능</li>
</ul>
</div>`},
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
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"MCP 서버 설정 범위와 비밀 값 관리",
       html:`<h4>① 설정 범위</h4>
        <table>
          <tr><th>범위</th><th>저장 위치</th><th>사용 범위</th></tr>
          <tr><td>local (기본값)</td><td><code>~/.claude.json</code></td><td>본인만 사용. 현재 프로젝트에서만 사용 가능</td></tr>
          <tr><td>project</td><td>프로젝트 폴더의 <code>.mcp.json</code></td><td>프로젝트를 함께 쓰는 팀 전원</td></tr>
          <tr><td>user</td><td><code>~/.claude.json</code></td><td>본인만 사용. 모든 프로젝트에서 사용 가능</td></tr>
        </table>
        <ul>
          <li>범위를 지정하지 않으면 local</li>
          <li>팀이 함께 쓸 서버는 project 범위에 설정</li>
          <li>이름이 같은 서버가 여러 범위에 있으면 local, project, user 순서로 우선</li>
        </ul>
        <h4>② 비밀 값 관리</h4>
        <ul>
          <li><code>.mcp.json</code>은 팀 전원이 보는 파일. 비밀 값을 직접 적으면 안 됨</li>
          <li>값 대신 <code>\${GITHUB_TOKEN}</code>처럼 환경변수 이름만 기재</li>
          <li>실행할 때 각자 컴퓨터에 저장된 값으로 자동 교체</li>
          <li>기본값 지정: <code>\${이름:-기본값}</code> 형태</li>
        </ul>
        <div class="fig"><b>.mcp.json 내용</b><br>
{<br>
&nbsp;&nbsp;"mcpServers": {<br>
&nbsp;&nbsp;&nbsp;&nbsp;"github": {&nbsp;&nbsp;<span class="an">← 서버 이름</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"type": "http",&nbsp;&nbsp;<span class="an">← 연결 방식</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"url": "https://mcp.example.com/mcp",&nbsp;&nbsp;<span class="an">← 서버 주소</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"headers": { "Authorization": "Bearer \${GITHUB_TOKEN}" }&nbsp;&nbsp;<span class="an">← 환경변수 이름</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;}<br>
&nbsp;&nbsp;}<br>
}
        </div>
        <h4>③ 연결 방식</h4>
        <ul>
          <li>인터넷에 있는 서버: HTTP 방식 권장</li>
          <li>내 컴퓨터에서 실행하는 서버: stdio 방식</li>
        </ul>
        <h4>④ 연결 후 도구 사용</h4>
        <ul>
          <li>연결된 모든 서버의 도구를 한 대화에서 함께 사용 가능</li>
          <li>도구가 많을 때는 필요한 도구만 찾아 불러오는 도구 검색(tool search) 기능 작동</li>
        </ul>
        <div class="screen"><div class="sbar">화면 예시 · 연결된 서버 확인</div>
&gt; /mcp<br>
&nbsp;github&nbsp;&nbsp;&nbsp;&nbsp;연결됨&nbsp;&nbsp;&nbsp;도구 12개<br>
&nbsp;notion&nbsp;&nbsp;&nbsp;&nbsp;연결됨&nbsp;&nbsp;&nbsp;도구 8개
        </div>
        <p class="cap">입력창에 <code>/mcp</code>를 입력하면 나타나는 서버 연결 상태. 실제 화면과 글자 배치 차이 있음.</p>
        <div class="callout">📖 <b>용어 카드</b>
          <ul>
            <li><b>MCP(Model Context Protocol)</b>: Claude를 외부 서비스와 연결하는 공통 규격</li>
            <li><b>MCP 서버</b>: 외부 서비스의 기능을 Claude에게 도구로 제공하는 프로그램</li>
            <li><b>범위(scope)</b>: 설정이 적용되는 대상</li>
            <li><b>환경변수</b>: 컴퓨터에 이름과 값을 짝지어 저장해 둔 설정. 이름은 공유하고 값은 각자 컴퓨터에만 보관</li>
            <li><b>토큰(token)</b>: 서비스 이용 권한을 증명하는 비밀 값</li>
            <li><b>홈 폴더(~)</b>: 컴퓨터 사용자마다 하나씩 있는 개인 폴더</li>
          </ul>
        </div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"연결 후 판단 기준 세 가지",
       html:`__MAP2:mcp__<h4>① 연결한 도구가 쓰이지 않는 경우</h4>
        <ul>
          <li>증상: 성능 좋은 검색 도구를 연결했는데 Claude가 기본 제공 검색 도구만 사용</li>
          <li>원인: 연결한 도구의 설명이 짧아 기능이 드러나지 않음</li>
          <li>해결: 도구 설명에 기능, 결과 형태, 사용 예 기재</li>
        </ul>
        <div class="fig"><b>도구 설명 비교</b><br>
✗ 코드를 검색함&nbsp;&nbsp;<span class="an">← 기본 검색과 차이가 보이지 않음</span><br>
✓ 함수 이름으로 정의 위치와 호출 위치를 찾음. 결과는 파일 이름과 줄 번호 목록.<br>
&nbsp;&nbsp;&nbsp;글자만 같은 다른 단어는 결과에서 제외&nbsp;&nbsp;<span class="an">← 기능, 결과 형태, 기본 검색과의 차이</span>
        </div>
        <h4>② 직접 제작과 공개 서버 사용</h4>
        <ul>
          <li>널리 쓰는 서비스(Jira, GitHub) 연결: 공개된 MCP 서버 사용</li>
          <li>직접 제작: 우리 팀에만 있는 업무 흐름</li>
        </ul>
        <h4>③ 도구와 리소스</h4>
        <table>
          <tr><th>구분</th><th>기능</th><th>예</th></tr>
          <tr><td>도구(tool)</td><td>행동 수행</td><td>검색, 이슈 생성</td></tr>
          <tr><td>리소스(resource)</td><td>보유 자료 목록 제공</td><td>이슈 요약, 문서 목록, 데이터 구조</td></tr>
        </table>
        <ul>
          <li>리소스로 자료 목록을 먼저 보여 주면 자료를 찾기 위한 도구 호출 감소</li>
        </ul>
        <div class="callout">📖 <b>용어 카드</b>
          <ul>
            <li><b>기본 제공 도구(built-in tools)</b>: 따로 연결하지 않아도 Claude Code에 들어 있는 도구</li>
            <li><b>도구 설명</b>: 도구가 하는 일을 적은 글. Claude는 이 글을 읽고 쓸 도구를 선택</li>
            <li><b>Jira</b>: 업무 요청과 진행 상황을 관리하는 서비스</li>
            <li><b>GitHub</b>: 프로젝트 파일을 올려 팀이 함께 관리하는 서비스</li>
          </ul>
        </div>`},
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

  /* ===== CH 5 · 2.5 자주 쓰는 기본 제공 도구 6개 ===== */
  { id:"p2c5", ch:"CH 5", title:"기본 제공 도구 선택 기준 (2.5)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"자주 쓰는 기본 제공 도구 여섯 개",
       html:`<h4>① 도구별 기능</h4>
        <table>
          <tr><th>도구</th><th>기능</th><th>사용 예</th></tr>
          <tr><td><code>Read</code></td><td>파일 읽기</td><td>보고서 파일 내용 확인</td></tr>
          <tr><td><code>Write</code></td><td>파일 새로 만들기. 기존 파일 전체 바꿔 쓰기</td><td>새 문서 작성</td></tr>
          <tr><td><code>Edit</code></td><td>파일에서 지정한 부분만 고치기</td><td>문장 하나 수정</td></tr>
          <tr><td><code>Grep</code></td><td>파일 내용 검색</td><td>"환불"이라는 단어가 들어 있는 파일 찾기</td></tr>
          <tr><td><code>Glob</code></td><td>파일 이름으로 찾기</td><td>이름이 "회의록"으로 시작하는 파일 찾기</td></tr>
          <tr><td><code>Bash</code></td><td>컴퓨터 명령 실행</td><td>프로그램 실행, 폴더 만들기</td></tr>
        </table>
        <ul>
          <li>Claude Code의 기본 제공 도구는 40개 이상. 전체 목록: <a href="https://code.claude.com/docs/ko/tools-reference" target="_blank" rel="noopener">Claude Code 공식 문서 '도구 참조' 페이지</a> (한국어)</li>
        </ul>
        <h4>② 검색 도구 구분</h4>
        <ul>
          <li>찾는 대상이 파일 안의 내용이면 Grep</li>
          <li>찾는 대상이 파일 이름이나 위치면 Glob</li>
          <li>macOS와 Linux에서는 Grep과 Glob 대신 Bash 도구의 검색 명령으로 같은 작업 수행</li>
        </ul>
        <div class="fig"><b>검색 대상에 따른 구분</b><br>
"환불 규정이 적힌 파일 찾기"&nbsp;&nbsp;<span class="an">← 파일 안의 내용: Grep</span><br>
"이름이 2026으로 시작하는 파일 찾기"&nbsp;&nbsp;<span class="an">← 파일 이름: Glob</span>
        </div>
        <h4>③ Edit 작동 조건</h4>
        <ul>
          <li>고칠 문장을 글자 그대로 지정</li>
          <li>지정한 문장이 파일 안에 한 번만 있어야 수정 가능</li>
          <li>같은 문장이 여러 번 있으면 수정 실패</li>
        </ul>
        <div class="screen"><div class="sbar">화면 예시 · Edit 실패</div>
수정 실패: 지정한 문장이 파일 안에 4곳<br>
&nbsp;&nbsp;"담당자에게 문의 바랍니다."<br>
어느 곳을 고칠지 정할 수 없음
        </div>
        <p class="cap">같은 문장이 여러 번 있을 때 나타나는 실패 안내. 실제 화면의 문구는 영어.</p>
        <div class="callout">📖 <b>용어 카드</b>
          <ul>
            <li><b>기본 제공 도구(built-in tools)</b>: 따로 연결하지 않아도 Claude Code에 들어 있는 도구</li>
            <li><b>컴퓨터 명령</b>: 글자로 입력해서 컴퓨터에 일을 시키는 지시</li>
            <li><b>macOS, Linux, Windows</b>: 컴퓨터를 움직이는 기본 프로그램의 종류</li>
          </ul>
        </div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"도구 조합과 Edit 실패 대응",
       html:`__MAP2:builtin__<h4>① 필요한 파일만 읽는 순서</h4>
        <ul>
          <li>1단계: 검색으로 관련 파일 찾기</li>
          <li>2단계: 찾은 파일만 Read로 읽기</li>
          <li>3단계: 읽은 파일이 가리키는 다른 파일을 이어서 읽기</li>
          <li>피할 방식: 모든 파일을 먼저 읽기. 컨텍스트 창이 불필요한 내용으로 채워짐</li>
        </ul>
        <div class="fig"><b>파일 900개 중 필요한 내용 찾기</b><br>
✗ 900개 전부 읽기&nbsp;&nbsp;<span class="an">← 컨텍스트 창 부족</span><br>
✓ 검색 → 관련 파일 6개 → 6개만 읽기&nbsp;&nbsp;<span class="an">← 필요한 내용만 컨텍스트 창에 포함</span>
        </div>
        <h4>② 이름이 여러 개인 대상 찾기</h4>
        <ul>
          <li>같은 기능이 파일마다 다른 이름으로 쓰이는 경우 있음</li>
          <li>순서: 쓰이는 이름을 먼저 모두 확인한 뒤 이름마다 검색</li>
        </ul>
        <h4>③ Edit 실패 대응</h4>
        <table>
          <tr><th>상황</th><th>대응</th></tr>
          <tr><td>여러 곳 중 한 곳만 수정</td><td>앞뒤 문장까지 포함해 한 곳만 가리키도록 다시 지정</td></tr>
          <tr><td>여러 곳 전부 수정</td><td>모두 바꾸기(<code>replace_all</code>) 사용</td></tr>
          <tr><td>위 방법으로 해결 안 됨</td><td>Read로 파일 전체를 읽고 Write로 새로 쓰기</td></tr>
        </table>
        <h4>④ 상황별 도구 선택</h4>
        <table>
          <tr><th>상황</th><th>도구</th></tr>
          <tr><td>특정 단어가 쓰인 곳 전부 찾기</td><td>Grep</td></tr>
          <tr><td>특정 이름이나 종류의 파일 찾기</td><td>Glob</td></tr>
          <tr><td>파일 내용 확인</td><td>Read</td></tr>
          <tr><td>파일 일부 수정</td><td>Edit</td></tr>
          <tr><td>프로그램 실행</td><td>Bash</td></tr>
        </table>
        <div class="callout">📖 <b>용어 카드</b>
          <ul>
            <li><b>컨텍스트 창(context window)</b>: Claude가 한 번에 읽을 수 있는 글의 분량 한도</li>
            <li><b>코드베이스(codebase)</b>: 프로젝트를 이루는 파일 전체</li>
          </ul>
        </div>`},
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
