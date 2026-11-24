/* PART 5 · 컨텍스트 관리 & 신뢰성 (D5, 15%) */
window.CCAF_CONTENT.p5 = {
  id: "p5",
  lessons: [

  /* ===== CH 1 · 5.1 정보 보존 ===== */
  { id:"p5c1", ch:"CH 1", title:"긴 대화에서 핵심 정보 보존 (5.1)",
    steps:[
      {type:"concept", kind:"PART BRIEFING · 파트 설명", h:"PART 05 · 컨텍스트를 지키고 실패를 정직하게 다루는 방법",
   html:`<h4>① 다루는 영역</h4>
<ul>
<li>컨텍스트(context): Claude가 지금 읽고 있는 내용 전체. 대화 기록, 전달받은 자료, 도구 결과가 모두 포함</li>
<li>이 파트의 주제: 긴 작업에서 중요한 정보를 지키는 방법, 그리고 실패와 불확실한 내용을 숨기지 않고 전달하는 방법</li>
<li>영어 이름: Context Management &amp; Reliability</li>
</ul>
<h4>② 챕터 구성</h4>
<table>
<tr><th>챕터</th><th>주제</th></tr>
<tr><td>CH 1</td><td>정보 보존. 긴 대화에서 숫자와 날짜를 지키는 방법</td></tr>
<tr><td>CH 2</td><td>에스컬레이션. 사람에게 넘기는 기준</td></tr>
<tr><td>CH 3</td><td>오류 전달. 서브에이전트가 실패를 보고하는 형식</td></tr>
<tr><td>CH 4</td><td>대형 코드 탐색. 오래 걸리는 작업의 컨텍스트 관리</td></tr>
<tr><td>CH 5</td><td>사람 검토와 신뢰도 보정</td></tr>
<tr><td>CH 6</td><td>출처 보존과 불확실한 내용의 표시</td></tr>
<tr><td>CH 7</td><td>컨텍스트 창 관리 방법의 선택</td></tr>
</table>
<h4>③ 파트 전체에 쓰는 판단 기준</h4>
<ul>
<li>확인할 것: 정보가 사라지는 지점</li>
<li>해결 방향: 주의하라는 지시가 아니라 구조로 보호. 예: 따로 보관하는 자리, 출처를 함께 적는 양식</li>
<li>자격시험 출제 비중: 15%</li>
</ul>`},
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"정보가 사라지는 세 가지 경로",
   html:`<h4>① 요약 과정의 손실</h4>
<ul>
<li>사라지는 정보: 숫자, 날짜, 금액, 고객이 말한 조건 같은 정확한 값</li>
<li>이유: 대화가 길어지면 오래된 부분을 요약해서 줄임. 요약은 대략의 내용만 남기는 방식이라 정확한 값부터 사라짐</li>
</ul>
<div class="fig"><b>요약을 거친 문장의 변화</b><br>
처음: "847.50달러 환불. 3월 15일까지 처리"<br>
요약 두 번 뒤: "환불 문의 처리 중"&nbsp;&nbsp;<span class="an">← 금액과 기한이 사라짐</span>
</div>
<h4>② 긴 입력의 가운데 부분 누락</h4>
<ul>
<li>사라지는 정보: 긴 입력의 한가운데 놓인 내용</li>
<li>이유: Claude는 입력의 처음과 끝을 더 정확히 반영하고 가운데를 놓치는 경향이 있음. 영어 이름은 lost in the middle</li>
<li>예: 보고서 여러 개를 이어 붙인 긴 입력의 한가운데 있는 수치를 물으면 찾지 못하거나 없는 값을 지어냄</li>
</ul>
<h4>③ 도구 결과가 차지하는 분량</h4>
<ul>
<li>사라지는 것: 컨텍스트 창의 남은 분량</li>
<li>이유: 도구는 결과 전체를 반환. 주문 조회 한 번에 항목 40개가 돌아오고 그중 판단에 쓰는 항목은 5개</li>
<li>결과: 조회 10번이면 쓰지 않는 항목 350개가 쌓임. 그만큼 앞부분 대화가 밀려남</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 주문 조회 도구의 결과</div>
{ "id": "A-1042", "status": "shipped", "amount": 847.50,<br>
&nbsp;&nbsp;"warehouse_id": "W-07", "tax_code": "T2", "carrier_ref": "…",<br>
<span class="sel">&nbsp;&nbsp;… 판단에 쓰지 않는 항목 35개 …</span> }
</div>
<h4>④ 분량이 늘 때의 정확도</h4>
<ul>
<li>현재 모델의 컨텍스트 창: 100만 토큰</li>
<li>창이 커도 담긴 분량이 늘수록 정확도 하락. 영어 이름은 context rot</li>
<li>무엇을 담을지 고르는 일이 창의 크기만큼 중요</li>
<li>설명 전체: <a href="https://platform.claude.com/docs/ko/build-with-claude/context-windows" target="_blank" rel="noopener">Claude 공식 문서 '컨텍스트 윈도우' 페이지</a> (한국어)</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>컨텍스트 창(context window)</b>: Claude가 한 번에 읽을 수 있는 글의 한도</li>
<li><b>토큰(token)</b>: Claude가 글을 세는 단위. 한국어는 대략 한 글자가 1토큰 안팎</li>
<li><b>요약(summarization)</b>: 긴 내용을 짧게 줄여 요지만 남기는 일</li>
</ul>
</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"경로별 해결 방법",
   html:`__MAP5:ctx__<h4>① 핵심 사실 블록: 요약 손실의 해결</h4>
<ul>
<li>방법: 금액, 날짜, 주문 번호, 상태 같은 사실을 요약하지 않는 별도 자리에 보관. 영어 이름은 case facts 블록</li>
<li>사람이 정하는 것: "금액, 날짜, 주문 번호가 나오면 핵심 사실 블록에 옮겨 적고 이 블록은 요약하지 않기"라는 규칙</li>
<li>프로그램이 하는 것: 요청을 만들 때마다 이 블록을 원문 그대로 넣기</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 요청에 들어가는 두 부분</div>
[요약한 대화] 고객이 파손 상품 환불 요청. 사진 확인. 처리 협의 중<br>
<span class="sel">[핵심 사실 · 요약 금지]</span><br>
주문: A-1042 | 환불액: 847.50달러 | 기한: 2026-03-15 | 상태: 승인 대기
</div>
<p class="cap">대화 부분은 계속 줄어도 핵심 사실은 20번을 주고받은 뒤에도 그대로 유지.</p>
<h4>② 결과 줄이기: 분량 소모의 해결</h4>
<ul>
<li>방법: 도구 결과가 컨텍스트에 들어가기 전에 판단에 쓰는 항목만 남기기. 영어 이름은 trimming</li>
<li>수단: PostToolUse 훅. 또는 필요한 항목만 반환하도록 도구 수정</li>
</ul>
<div class="fig"><b>항목 40개에서 5개로</b><br>
도구 결과: id, status, amount, created_at, warehouse_id, tax_code … 40개<br>
컨텍스트에 넣는 내용: id, status, amount, eligible_return, deadline&nbsp;&nbsp;<span class="an">← 환불 판단에 쓰는 5개</span>
</div>
<h4>③ 배치 순서: 가운데 누락의 해결</h4>
<ul>
<li>맨 앞: 핵심 요약</li>
<li>가운데: 자료별 상세 내용. 제목으로 구분</li>
<li>맨 끝: 질문을 한 번 더 작성</li>
</ul>
<h4>④ 앞 단계의 출력 형식 변경: 뒤 단계의 분량 부족 해결</h4>
<ul>
<li>상황: 검색, 분석, 작성 순서로 이어지는 작업. 앞 단계가 긴 글을 그대로 넘겨 뒤 단계의 분량 부족</li>
<li>해결: 앞 단계의 지시문 수정. "긴 글 대신 핵심 사실, 인용, 관련도만 정리해서 반환"</li>
<li>뒤 단계에 요약 장치를 추가하는 방법보다 앞 단계의 출력을 바꾸는 방법이 원인을 직접 해결</li>
</ul>
<div class="fig"><b>자료가 이동하는 순서</b><br>
검색 에이전트 → 분석 에이전트 → 작성 에이전트<br>
<span class="an">앞 단계(upstream)의 출력이 뒤 단계(downstream)의 입력</span>
</div>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>핵심 사실 블록(case facts)</b>: 요약하지 않고 원문 그대로 유지하는 사실 모음</li>
<li><b>PostToolUse 훅</b>: 도구 실행 후 Claude가 결과를 보기 전에 실행되는 코드. Part 1 CH 6에서 다룬 내용</li>
<li><b>업스트림, 다운스트림</b>: 이어지는 작업에서 앞 단계와 뒤 단계를 가리키는 말</li>
</ul>
</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: Crossed wires",
       q:`A customer has three open issues in one session: a refund on order #A-1042 ($89), a replacement for #A-1077, and a billing dispute over #A-1103 ($312). Twenty turns in, the agent offers "the $312 refund for your order #A-1042" — splicing issue 3's amount onto issue 1's order. A case-facts block exists, but it's one flat list of every number mentioned. What is the right fix?`,
       opts:[
         {t:`Restructure the persistent layer per issue: each open issue carries its own structured record (order ID, amounts, status, agreed actions), so facts can't cross-contaminate between concurrent threads.`, ok:true},
         {t:`Limit sessions to one issue each, asking multi-issue customers to open separate conversations.`},
         {t:`Add a prompt instruction: "always double-check which order each amount belongs to before responding."`},
         {t:`Sort the flat facts list chronologically so related facts naturally cluster together.`},
       ],
       hint:`case facts 블록이 있는데도 값이 섞였다는 점이 단서임. 블록의 존재가 아니라 블록의 구조가 문제임. 가이드 5.1의 다중 이슈 대응책을 확인할 것.`,
       explain:{
         good:`5.1의 두 번째 단계임. 이슈가 여러 건인 세션은 이슈마다 별도의 구조화된 기록을 둠. 평면 목록은 값 자체는 보존하지만 어느 값이 어느 이슈에 속하는지는 보존하지 못하므로, $312가 #A-1042에 연결되는 오류가 발생함.`,
         wrongs:[
           `<b>B(세션 분리 강제):</b> 시스템 결함의 부담을 고객에게 넘기는 방식임. 한 번의 문의로 처리를 끝내는 비율(FCR, first contact resolution)도 낮아짐.`,
           `<b>C(재확인 지시):</b> 지시는 확실한 보장이 되지 못함. 값이 섞인 평면 목록을 다시 읽어도 같은 혼동이 반복됨.`,
           `<b>D(시간순 정렬):</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 고객이 여러 이슈를 번갈아 말하면 시간 순서는 값의 소속과 무관해짐.`,
         ]},
       principle:"값의 보존과 소속을 함께 구조로 남김"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2: The 40-field flood",
       q:`Each lookup_order call returns 40+ fields (warehouse codes, internal SKUs, carrier metadata...), but the return-processing agent only needs 5. After a few lookups, the context is dominated by irrelevant fields, and the agent starts missing details from earlier conversation turns. Where should the fix go?`,
       opts:[
         {t:`Trim tool outputs to the return-relevant fields before they enter the conversation context, so irrelevant data never accumulates.`, ok:true},
         {t:`Summarize the whole conversation more aggressively to make room for the tool outputs.`},
         {t:`Instruct the agent to "focus only on relevant fields" when reading tool results.`},
         {t:`Run /compact after every third lookup to shrink the context.`}],
       hint:`불필요한 데이터가 쌓여서 생긴 문제임. 쌓인 뒤에 정리하는 방법과 처음부터 넣지 않는 방법 중 어느 쪽이 근본 대응인지 확인할 것.`,
       explain:{
         good:`가이드 5.1의 내용임. 분량이 큰 도구 결과는 컨텍스트에 쌓이기 전에 필요한 필드만 남기고 제거함. 데이터가 들어오는 지점에서 막는 것이 근본 대응임.`,
         wrongs:[
           `<b>B:</b> 필요한 대화를 압축해서 불필요한 필드가 들어갈 자리를 만드는 방식이므로 방향이 반대임.`,
           `<b>C:</b> 읽을 때 무시하라고 지시해도 토큰은 이미 소모된 상태이므로 남은 분량은 그대로 줄어듦.`,
           `<b>D:</b> 나중에 압축하면 불필요한 데이터와 함께 필요한 정보까지 사라질 수 있음.`,
         ]},
       principle:"컨텍스트에 넣기 전에 트리밍함"},
    ]},

  /* ===== CH 2 · 5.2 에스컬레이션 ===== */
  { id:"p5c2", ch:"CH 2", title:"에스컬레이션과 모호성 해결 (5.2)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"에스컬레이션: 에이전트가 사람에게 일을 넘기는 기준",
   html:`<h4>① 에스컬레이션</h4>
<ul>
<li>에이전트가 처리하던 일을 사람 상담사에게 넘기는 일. 영어 이름은 escalation</li>
<li>실제 동작: <code>escalate_to_human</code> 같은 도구 호출 한 번</li>
</ul>
<h4>② 넘겨야 하는 세 가지 경우</h4>
<table>
<tr><th>경우</th><th>예</th></tr>
<tr><td>고객이 사람을 직접 요구</td><td>"상담사 연결해 주세요"</td></tr>
<tr><td>정책에 해당 조항 없음</td><td>정책 문서에 없는 가격 조정 요구</td></tr>
<tr><td>진전 없음</td><td>여러 번 시도해도 해결되지 않음</td></tr>
</table>
<h4>③ 기준으로 쓸 수 없는 두 가지</h4>
<table>
<tr><th>기준</th><th>쓸 수 없는 이유</th></tr>
<tr><td>고객의 감정</td><td>화난 고객의 요청이 복잡한 요청인 것은 아님</td></tr>
<tr><td>Claude가 스스로 매긴 확신 점수</td><td>어려운 경우일수록 실제보다 높게 보고하는 경향</td></tr>
</table>
<h4>④ 판단이 갈리는 경우</h4>
<ul>
<li>고객이 사람을 분명히 요구: 조사나 해결 시도 없이 바로 넘기기. 쉬운 일이어도 동일</li>
<li>감정 표현만 있고 요청은 단순: 불만을 인정하고 해결을 한 번 제안. 고객이 다시 사람을 요구하면 바로 넘기기</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 같은 감정, 다른 처리</div>
고객 A: "너무 화가 나네요. 주소만 바꿔 주세요."<br>
&nbsp;&nbsp;처리: 불만 인정 후 주소 변경<br>
<span class="sel">고객 B: "됐고 사람 바꿔 주세요."</span><br>
&nbsp;&nbsp;처리: 바로 상담사에게 넘기기
</div>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>에스컬레이션(escalation)</b>: 에이전트가 직접 처리하지 않고 사람에게 넘기는 일</li>
<li><b>정책(policy)</b>: 회사가 정해 둔 처리 규정</li>
<li><b>escalate_to_human</b>: 예시에 쓴 도구 이름. 상담사에게 넘기는 도구</li>
</ul>
</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"네 가지 상황별 판단",
   html:`__MAP5:esc__<h4>① 넘기는 기준이 거꾸로인 경우</h4>
<ul>
<li>증상: 사진이 첨부된 파손 교환처럼 단순한 일은 사람에게 넘김. 정책에 조항이 없는 일은 직접 처리하며 내용을 추측</li>
<li>원인: 기준이 없어 Claude가 임의로 결정</li>
<li>해결: 시스템 프롬프트에 넘길 조건, 직접 처리할 일, 예시 작성</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 시스템 프롬프트의 에스컬레이션 기준</div>
바로 상담사에게 넘기는 경우<br>
&nbsp;&nbsp;① 고객이 사람을 요구. 해결 시도 없이 넘기기<br>
&nbsp;&nbsp;② 정책 문서에 없는 요청<br>
&nbsp;&nbsp;③ 2회 시도에도 진전 없음<br>
직접 처리하는 일: 사진이 있는 파손 교환, 주소 변경, 배송 조회<br>
<br>
예시: "경쟁사가 더 싼데 가격을 맞춰 주세요"<br>
&nbsp;&nbsp;처리: 넘기기. 이유: 정책에 가격 맞춤 조항이 없고 정책을 임의로 만들 수 없음
</div>
<h4>② 정책에 조항이 없는 요청</h4>
<ul>
<li>상황: 정책에는 자사 가격 인하 조항만 있음. 고객은 경쟁사 가격에 맞춰 달라고 요구</li>
<li>판단: 넘기기. 거절과 승인 모두 정책을 새로 만드는 행위</li>
<li>지시문: "정책 문서에 근거 조항이 없는 요청은 직접 판단하지 말고 상담사에게 넘기기"</li>
</ul>
<h4>③ 조회 결과가 여러 명인 경우</h4>
<ul>
<li>상황: 같은 이름의 고객 3명 조회. 에이전트가 가장 최근 가입자를 임의로 선택</li>
<li>판단: 추측으로 선택 금지. 다른 사람의 계정을 바꾸는 사고로 연결</li>
<li>지시문: "조회 결과가 여러 명이면 이메일이나 주문 번호를 고객에게 요청"</li>
</ul>
<h4>④ 화났지만 요청은 단순한 경우</h4>
<ul>
<li>상황: 표현은 격하지만 요청은 주소 변경</li>
<li>판단: 감정은 넘기는 사유가 아님. 불만을 인정하고 해결 제안</li>
<li>지시문: "감정 표현만으로는 넘기지 않기. 고객이 거듭 사람을 요구하면 바로 넘기기"</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>휴리스틱(heuristic)</b>: 근거를 확인하지 않고 그럴듯한 쪽을 고르는 어림 판단</li>
<li><b>식별 정보</b>: 이메일이나 주문 번호처럼 한 사람을 특정할 수 있는 정보</li>
</ul>
</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: Auditing the trigger config",
       q:`Your escalation config uses three automated triggers: sentiment_score < -0.5, self_confidence < 0.6, and turn_count > 8. Production data: furious customers with one-click issues get escalated (annoying the human team); calm customers requesting things the policy never mentions get confidently auto-"resolved" with invented terms; and thorough customers who simply ask many questions hit the turn limit. What is the correct redesign?`,
       opts:[
         {t:`Replace the proxy triggers with the legitimate ones — explicit customer request for a human, policy exceptions/gaps, and inability to make progress — expressed as prompt criteria with few-shot examples, since none of the current three signals measures case complexity.`, ok:true},
         {t:`Keep the framework but tune the thresholds — sentiment < -0.7, confidence < 0.4, turns > 12 — based on a month of production data.`},
         {t:`Add a fourth trigger for policy-gap detection on top of the existing three, giving the system defense in depth.`},
         {t:`Combine the three signals into one weighted composite escalation score instead of independent thresholds.`},
       ],
       hint:`세 가지 증상이 세 트리거의 결함과 하나씩 대응함. 감정은 난이도가 아니고, 자기 보고 신뢰도는 보정되지 않았으며, 턴 수는 막힘의 근거가 아님. 임계값의 문제인지 신호 자체의 문제인지 판단할 것.`,
       explain:{
         good:`5.2의 정당한 트리거 3종(명시적 요구, 정책 공백, 진전 불가)과 신뢰할 수 없는 대리 지표의 차이를 설정 점검 형태로 묻는 문제임. 세 신호 모두 케이스 복잡도를 대신하지 못하므로, 임계값 조정이나 가중 합성은 잘못된 신호를 더 정교하게 쓰는 것에 그침.`,
         wrongs:[
           `<b>B(임계값 조정):</b> 데이터에 근거한 조치처럼 보이지만, 신호 자체가 잘못되어 있으면 어떤 임계값도 맞지 않음.`,
           `<b>C(네 번째 트리거 추가):</b> 방향은 맞지만 잘못된 신호 세 개를 그대로 두므로 불필요한 에스컬레이션과 정책 임의 생성이 계속됨.`,
           `<b>D(가중 합성):</b> 잘못된 신호 세 개를 합치면 잘못된 신호 하나가 될 뿐임.`,
         ]},
       principle:"임계값보다 신호 자체를 먼저 점검함"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2: Three Kims and a silent policy",
       q:`Two production incidents this week: (a) get_customer returned three customers named "J. Kim" and the agent picked the most recently active one — wrong; (b) a customer requested price-matching against a competitor, your policy only covers own-site price drops, and the agent invented a 10% goodwill discount. What is the correct pair of behaviors?`,
       opts:[
         {t:`(a) Ask the customer for an additional identifier (email or order number) instead of selecting heuristically; (b) escalate to a human, because the policy is silent on competitor matching.`, ok:true},
         {t:`(a) Pick the customer whose recent orders best match the conversation topic; (b) offer the smallest reasonable discount to preserve goodwill.`},
         {t:`(a) Escalate to a human whenever multiple matches occur; (b) refuse the request, since the policy doesn't authorize it.`},
         {t:`(a) Ask for an additional identifier; (b) apply the own-site price-drop policy as the closest analogous rule.`}],
       hint:`(a) 이 모호성은 고객이 직접 해소할 수 있는 종류임. 누구에게 물어야 하는지 확인할 것. (b) 정책에 조항이 없을 때 에이전트가 하면 안 되는 행동을 확인할 것.`,
       explain:{
         good:`(a) 조회 결과가 여러 건이면 추가 식별자를 요청함. 추측에 의한 선택은 금지임. (b) 정책 공백은 에스컬레이션 대상임. 에이전트가 정책을 새로 만들거나 유사 조항을 유추해 적용하면 안 됨. 가이드 5.2의 두 케이스와 동일함.`,
         wrongs:[
           `<b>B:</b> (a) 대화 주제로 고르는 것도 추측에 의한 선택이므로 같은 오류임. (b) 할인을 임의로 만든 것이 사고의 원인임.`,
           `<b>C:</b> (a) 고객에게 물으면 해결되는 건을 사람에게 넘기는 과잉 에스컬레이션임. (b) 거절도 정책을 새로 만드는 것임. 정책은 허용도 금지도 명시하지 않았음.`,
           `<b>D:</b> (a)는 맞지만 (b)에서 유사 규칙을 유추해 적용하는 것은 정책 공백을 임의로 메우는 행위임.`,
         ]},
       principle:"모호성은 고객에게 확인하고 정책 공백은 사람에게 넘김"},
    ]},

  /* ===== CH 3 · 5.3 에러 전파 ===== */
  { id:"p5c3", ch:"CH 3", title:"멀티에이전트 에러 전파 (5.3)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"실패 보고에 넣는 네 가지",
   html:`<h4>① 실패 보고의 네 요소</h4>
<table>
<tr><th>요소</th><th>내용</th></tr>
<tr><td>실패 종류</td><td>응답 시간 초과, 권한 문제, 결과 없음 중 무엇인지</td></tr>
<tr><td>시도한 내용</td><td>어떤 검색이나 호출을 했는지</td></tr>
<tr><td>부분 결과</td><td>일부라도 얻은 결과</td></tr>
<tr><td>대안</td><td>다른 방법</td></tr>
</table>
<div class="screen"><div class="sbar">화면 예시 · 서브에이전트가 코디네이터에게 보낸 실패 보고</div>
{ "status": "error",<br>
&nbsp;&nbsp;"failure_type": "timeout",<br>
&nbsp;&nbsp;"attempted": "전기차 배터리 인수합병 2025 검색",<br>
&nbsp;&nbsp;"partial_results": [ 2건 ],<br>
&nbsp;&nbsp;"alternatives": "산업 보고서 자료에서 다시 검색 가능" }
</div>
<p class="cap">위에서부터 실패 종류, 시도한 내용, 부분 결과, 대안.</p>
<h4>② 피해야 할 세 가지 보고</h4>
<table>
<tr><th>보고 방식</th><th>문제</th></tr>
<tr><td>"검색 불가" 한 줄</td><td>코디네이터가 다음 행동을 정할 근거 없음</td></tr>
<tr><td>실패를 빈 결과로 보고</td><td>코디네이터가 자료가 없다고 잘못 판단</td></tr>
<tr><td>실패 하나로 전체 작업 중단</td><td>이미 얻은 결과까지 버림</td></tr>
</table>
<h4>③ 도구 오류 응답과의 관계</h4>
<ul>
<li>Part 2 CH 2: 도구가 에이전트에 돌려주는 오류 형식</li>
<li>이 챕터: 서브에이전트가 코디네이터에게 올리는 실패 보고</li>
<li>공통 원리: 실패의 종류와 다음 행동의 근거를 함께 전달</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>코디네이터와 서브에이전트</b>: 작업을 나누고 모으는 에이전트와 맡은 작업 하나를 수행하는 에이전트. Part 1 CH 3에서 다룬 내용</li>
<li><b>타임아웃(timeout)</b>: 정해진 시간 안에 응답이 오지 않아 중단된 상태</li>
</ul>
</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"실패 뒤의 복구와 결과 표시",
   html:`__MAP5:err__<h4>① 네 요소가 필요한 이유</h4>
<ul>
<li>코디네이터가 고를 수 있는 행동: 검색어를 바꿔 재시도, 다른 방법 사용, 부분 결과로 진행</li>
<li>네 요소가 없으면 이 중 어느 것도 고를 수 없음</li>
</ul>
<h4>② 서브에이전트의 자체 복구</h4>
<ul>
<li>사람이 정하는 것: 서브에이전트 지시문에 재시도 규칙 작성</li>
<li>규칙 예: "검색이 시간 초과되면 최대 2회 재시도. 그래도 실패하면 정해진 형식으로 보고하고 나머지 작업은 계속 진행"</li>
<li>효과: 일시적인 실패는 서브에이전트 단계에서 해결. 해결되지 않은 실패만 코디네이터에 전달</li>
</ul>
<div class="fig"><b>실패가 전달되는 순서</b><br>
서브에이전트: 실패 → 재시도 2회&nbsp;&nbsp;<span class="an">← 일시적인 실패는 여기서 해결</span><br>
&nbsp;&nbsp;↓ 그래도 실패<br>
코디네이터: 실패 보고 확인 → 재시도, 다른 방법, 부분 결과 중 선택
</div>
<h4>③ 빠진 부분 표시</h4>
<ul>
<li>최종 결과물 끝에 근거가 충분한 부분과 빠진 부분을 적는 문장. 영어 이름은 coverage note</li>
<li>사람이 정하는 것: 작성 담당 에이전트의 지시문에 규칙 작성</li>
<li>규칙 예: "실패한 자료가 있으면 결과물 끝에 어느 내용의 근거가 충분하고 어느 주제가 비어 있는지 적기"</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 보고서 끝에 붙은 표시</div>
<span class="sel">확인 범위: 학술 자료 검색 실패 (시간 초과 3회)</span><br>
3장의 학술 근거는 웹 자료만 반영.<br>
1장 시장 규모와 2장 경쟁 구도는 자료 12건으로 확인.
</div>
<p class="cap">읽는 사람이 빠진 부분의 위치를 알 수 있는 결과물.</p>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>복구(recovery)</b>: 실패한 뒤 작업을 이어 가기 위한 조치</li>
<li><b>빠진 부분 표시(coverage note)</b>: 결과물에서 근거가 충분한 부분과 비어 있는 부분을 알리는 문장</li>
</ul>
</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: The green pipeline that lied",
       q:`Overnight research stayed "green," but this morning's competitive-analysis report simply lacks its pricing section. Logs: the pricing subagent hit paywalls on both target sources and returned {"results": [], "status": "ok"} — its author added that behavior "so one flaky source doesn't fail the whole pipeline." The coordinator, seeing success, proceeded to synthesis. What is the correct fix?`,
       opts:[
         {t:`Have the subagent report the failure as structured error context — failure type (access/paywall), what was attempted, any partial results, and alternatives (cached copies, substitute sources) — so the coordinator can choose to retry differently, substitute, or ship with a coverage note.`, ok:true},
         {t:`Keep the suppression but have the coordinator scan synthesized reports for suspiciously empty sections before shipping.`},
         {t:`Make source failures fatal: any failed fetch halts the pipeline until a human investigates the cause.`},
         {t:`Point the pricing subagent at five sources instead of two so at least one usually succeeds, keeping the "ok" behavior as resilience.`},
       ],
       hint:`파이프라인 상태를 정상으로 유지하려던 조치가 무엇을 없앴는지 확인할 것. 코디네이터가 복구 방법을 선택할 기회 자체가 사라졌음.`,
       explain:{
         good:`실패를 성공으로 반환하는 것은 5.3의 3대 안티패턴 중 하나임. 코디네이터의 복구 선택지(대안 소스, 캐시본, 커버리지 주석)가 모두 차단됨. 구조화 4요소가 전달되면 실패에 견디는 파이프라인이라는 원래 목표도 달성됨. 그 성질은 실패를 감추는 데서가 아니라 정보를 갖춘 복구에서 나옴.`,
         wrongs:[
           `<b>B(빈 섹션 검사):</b> 뒤 단계에서 증상만 역추적하는 부분적 보완임. 비어 있는 이유가 접근 실패인지 실제로 데이터가 없는 것인지 모르면 올바른 대응을 고를 수 없음.`,
           `<b>C(전체 중단):</b> 실패 하나로 워크플로를 종료하는 것은 반대편 안티패턴임. 작성자가 피하려던 문제와 같음.`,
           `<b>D(소스를 다섯 개로 확대):</b> 실패 확률만 낮추는 조치임. 모두 실패하는 날에는 같은 문제가 반복되고 그전까지는 결함이 드러나지 않음.`,
         ]},
       principle:"상태 표시가 실제 결과와 일치해야 함"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2: The honest report",
       q:`In a 5-source research run, two sources failed (one paywalled, one timed out) despite local retries. The synthesis must still ship. Which output design is correct?`,
       opts:[
         {t:`Complete the synthesis with available findings, annotating coverage: which conclusions are well-supported and which topic areas have gaps due to the unavailable sources.`, ok:true},
         {t:`Delay the report until all five sources succeed, since partial synthesis misleads readers.`},
         {t:`Synthesize from the three available sources without mentioning the failures, to keep the report clean.`},
         {t:`Have the synthesis agent fill the gaps from its general knowledge so coverage looks complete.`}],
       hint:`부분 결과로 진행하는 것 자체는 맞음. 판단 기준은 읽는 사람이 공백의 위치를 알 수 있는지임.`,
       explain:{
         good:`가이드 5.3의 커버리지 주석임. 근거가 충분한 발견과 소스가 비어 있는 영역을 구분해 표시함. 부분 결과로 진행하되 공백을 함께 밝힘.`,
         wrongs:[
           `<b>B:</b> 페이월은 재시도로 해결되지 않으므로 발행이 무기한 지연됨.`,
           `<b>C:</b> 공백을 숨긴 리포트는 완전한 것처럼 보이므로 읽는 사람이 잘못된 확신을 갖게 됨.`,
           `<b>D:</b> 일반 지식으로 채우는 것은 출처 없는 내용을 리서치 결과로 제시하는 것임.`,
         ]},
       principle:"부분 결과로 진행하고 커버리지 주석을 붙임"},
    ]},

  /* ===== CH 4 · 5.4 대형 코드베이스 탐색 ===== */
  { id:"p5c4", ch:"CH 4", title:"대형 코드베이스 탐색의 컨텍스트 관리 (5.4)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"긴 작업에서 답의 품질이 떨어지는 현상",
   html:`<h4>① 증상</h4>
<ul>
<li>앞에서 확인한 구체적인 이름 대신 일반적인 설명으로 답함</li>
<li>같은 질문에 작업 초반과 다른 답을 함</li>
<li>원인: 탐색 결과가 쌓여 컨텍스트 창이 가득 참</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 같은 질문의 답 변화</div>
작업 초반: "환불은 RefundService.process()가 처리. payment.ts 88번째 줄"<br>
<span class="sel">3시간 뒤: "보통 이런 프로젝트는 서비스 계층에서 환불을 처리합니다"</span>
</div>
<p class="cap">구체적인 위치가 사라지고 일반적인 설명으로 바뀐 답.</p>
<h4>② 해결 수단</h4>
<table>
<tr><th>수단</th><th>내용</th></tr>
<tr><td>기록 파일</td><td>핵심 발견을 파일에 적고 필요할 때 다시 읽기. 영어 이름은 scratchpad</td></tr>
<tr><td>서브에이전트 위임</td><td>분량이 큰 조사를 맡기고 요약만 받기</td></tr>
<tr><td>단계 사이 요약 전달</td><td>한 단계의 핵심을 요약해 다음 단계의 시작 자료로 사용</td></tr>
<tr><td><code>/compact</code></td><td>쌓인 대화를 요약해서 줄이는 Claude Code 명령</td></tr>
</table>
<h4>③ Claude Code의 기본 기능</h4>
<ul>
<li>Explore: 탐색 전용 기본 서브에이전트. 파일을 고치지 않고 코드를 찾아 읽은 뒤 요약만 본 대화에 전달</li>
<li>자동 메모리: Claude가 작업 중에 배운 내용을 스스로 적어 두는 메모. 다음 세션 시작 시 로드</li>
<li>서브에이전트 설명: <a href="https://code.claude.com/docs/ko/sub-agents#built-in-subagents" target="_blank" rel="noopener">Claude Code 공식 문서 '사용자 정의 subagent 만들기' 페이지의 '내장 subagent' 항목</a> (한국어)</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>코드베이스(codebase)</b>: 한 프로젝트의 코드 전체</li>
<li><b>기록 파일(scratchpad)</b>: 발견한 내용을 적어 두는 별도 파일. 대화 밖에 있어 컨텍스트가 가득 차도 남음</li>
</ul>
</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"긴 탐색 작업의 설계",
   html:`__MAP5:explore__<h4>① 서브에이전트 위임</h4>
<ul>
<li>효과: 분량이 큰 탐색 결과는 서브에이전트의 컨텍스트에서 소모. 본 대화에는 요약만 들어옴</li>
<li>항상 적용할 경우 지시문에 작성: "분량이 큰 탐색은 서브에이전트에 맡기고 요약만 받기"</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · Claude Code 입력창</div>
&gt; 서브에이전트에게 tests 폴더의 테스트 파일 목록을 정리하게 하고<br>
&nbsp;&nbsp;결과는 요약만 보여 줘.
</div>
<h4>② 기록 파일</h4>
<ul>
<li>사람이 정하는 것: "핵심 발견은 scratchpad.md에 적으며 진행. 이전 발견이 불분명해지면 그 파일을 다시 읽기"라는 규칙</li>
<li>에이전트가 하는 것: Write 도구와 Read 도구로 직접 기록하고 다시 읽기</li>
</ul>
<h4>③ 중단 뒤 이어서 진행</h4>
<ul>
<li>문제: 작업이 중간에 멈추면 대화에 있던 내용은 사라짐</li>
<li>해결: 진행 상태를 파일에 계속 기록. 이 파일의 영어 이름은 manifest</li>
<li>다시 시작한 코디네이터가 하는 일: 상태 파일을 먼저 읽고 남은 작업을 새 서브에이전트의 지시문에 포함</li>
</ul>
<div class="fig"><b>대화에 있는 것과 파일에 있는 것</b><br>
대화: 코디네이터와 서브에이전트가 주고받은 내용&nbsp;&nbsp;<span class="an">← 중단되면 사라짐</span><br>
파일: agent-state/A.json, findings/A.md, scratchpad.md&nbsp;&nbsp;<span class="an">← 중단돼도 남음</span><br>
<br>
다시 시작: 코디네이터가 agent-state/A.json 읽기 → "학술 자료 검색부터 이어서"를 새 지시문에 포함
</div>
<div class="screen"><div class="sbar">화면 예시 · 두 파일의 내용</div>
scratchpad.md<br>
&nbsp;&nbsp;환불 처리 순서: RefundService.process() 다음 PaymentGateway.reverse(). payment.ts 88번째 줄<br>
&nbsp;&nbsp;테스트 위치: tests/refund 폴더의 12개<br>
<br>
agent-state/A.json<br>
&nbsp;&nbsp;{ "done": ["웹 자료 40건 수집"], "pending": ["학술 자료 검색"], "findings_file": "findings/A.md" }
</div>
<ul>
<li>Part 1 CH 7의 세션 관리와 같은 원리. 대화에 남은 내용 대신 파일에 남은 기록 사용</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>상태 파일(manifest)</b>: 끝난 작업, 남은 작업, 결과 파일 위치를 적어 두는 파일</li>
<li><b>Write, Read</b>: 파일을 새로 만드는 도구와 파일을 읽는 도구</li>
</ul>
</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: Three symptoms, three tools",
       q:`One week with your codebase-analysis agent produced three incidents: (a) by hour three it answers "repositories typically handle caching like..." instead of citing the CacheManager class it analyzed at hour one; (b) every new question triggers Grep/Read floods that bury the conversation in raw output; (c) last night's six-hour run crashed at 2 AM and today restarted from zero. Which countermeasure mapping is correct?`,
       opts:[
         {t:`(a) scratchpad files recording key findings as they're discovered, referenced in later prompts; (b) delegate exploration to subagents that return only summaries; (c) structured state exports to known locations, with a manifest the coordinator loads on resume.`, ok:true},
         {t:`(a) run /compact to refresh the session's memory; (b) scratchpad files to absorb the raw output; (c) split the nightly run into two three-hour halves.`},
         {t:`(a) re-run the full analysis each morning for freshness; (b) a larger context window; (c) wrap the run in an automatic restart loop.`},
         {t:`(a) prompt reminders to "always cite the specific classes you found"; (b) subagent delegation; (c) manifest-based state recovery.`},
       ],
       hint:`(a)는 컨텍스트 열화, (b)는 컨텍스트 잠식, (c)는 상태 소실임. 각각에 대응하는 수단이 따로 있음. 셋 중 둘만 맞는 선택지에 주의할 것.`,
       explain:{
         good:`5.4의 세 가지 대응 수단을 짝짓는 문제임. 열화에는 스크래치패드(대화 밖 기록), 잠식에는 위임 격리(요약만 본 대화로 전달), 크래시에는 매니페스트 기반 복구를 씀. D는 (b)와 (c)가 맞아서 고르기 쉽지만 (a)를 지시문으로 처리함. 컨텍스트에서 밀려난 내용은 지시로 되살아나지 않음.`,
         wrongs:[
           `<b>B(/compact로 열화 대응):</b> 압축은 복원이 아님. 이미 사라진 구체적 발견을 되살리지 못하므로 대응 수단이 잘못 연결됨.`,
           `<b>C(재분석과 재시작 반복):</b> 같은 비용을 다시 지불하는 방식을 자동화한 것이며 아무것도 보존하지 않음.`,
           `<b>D((a)만 지시문으로 처리):</b> 나머지 둘이 맞아서 고르기 쉬운 선택지임. 이미 사라진 내용을 인용하라는 지시는 실행할 수 없는 요구임.`,
         ]},
       principle:"증상마다 대응 수단이 따로 있음"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2: The overnight crash",
       q:`Your overnight multi-agent codebase analysis (a coordinator plus four explorers) crashed at 3 AM, six hours in. Currently a crash means restarting from zero. Which design enables recovery without redoing completed work?`,
       opts:[
         {t:`Have each agent export structured state to a known location as it works; on resume, the coordinator loads a manifest of those exports and injects the state into each agent's prompt.`, ok:true},
         {t:`Wrap the entire run in a retry loop that relaunches the full analysis on failure.`},
         {t:`Keep all intermediate results in the coordinator's conversation history so nothing is lost.`},
         {t:`Split the analysis into independent nightly jobs so a crash only loses one night.`}],
       hint:`크래시로 사라지는 것은 대화 안에 있는 상태임. 상태를 대화 밖에 두고 재개 절차까지 갖춘 설계를 찾을 것.`,
       explain:{
         good:`가이드 5.4의 크래시 복구 설계와 동일함. 상태를 정해진 위치에 저장하고, 재개 시 매니페스트를 읽어 프롬프트에 주입함. 완료된 작업은 파일로 남음.`,
         wrongs:[
           `<b>B:</b> 전체 재실행 반복은 처음부터 다시 하는 절차를 자동화한 것에 그침.`,
           `<b>C:</b> 대화 히스토리(conversation history)는 크래시와 함께 사라지는 대상임.`,
           `<b>D:</b> 일 단위 분할은 손실 범위를 줄일 뿐 복구 방법이 아님.`,
         ]},
       principle:"상태는 파일로 저장하고 매니페스트로 재개함"},
    ]},

  /* ===== CH 5 · 5.5 인간 리뷰·신뢰도 보정 ===== */
  { id:"p5c5", ch:"CH 5", title:"인간 리뷰 워크플로와 신뢰도 보정 (5.5)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"전체 정확도와 종류별 정확도",
   html:`<h4>① 예시 상황</h4>
<ul>
<li>문서에서 값을 뽑아내는 작업을 하루 1만 건 처리</li>
<li>모든 결과를 사람이 확인할 수 없어 일부만 사람 검토로 전달</li>
</ul>
<div class="fig"><b>검토 대상을 나누는 구조</b><br>
문서 1만 건 → Claude가 추출 → 분류<br>
&nbsp;&nbsp;├─ 신뢰도 높음&nbsp;&nbsp;<span class="an">→ 자동 통과. 사람이 보지 않음</span><br>
&nbsp;&nbsp;└─ 신뢰도 낮음&nbsp;&nbsp;<span class="an">→ 사람 검토</span>
</div>
<ul>
<li>이 챕터의 질문 두 가지: 분류 기준을 무엇으로 정할지, 자동 통과 범위를 언제 넓혀도 되는지</li>
</ul>
<h4>② 전체 정확도에 가려지는 값</h4>
<ul>
<li>전체 정확도 97% 안에 정확도 71%인 문서 종류가 들어 있을 수 있음</li>
<li>자동 통과 범위를 넓히기 전에 문서 종류별, 항목별 정확도 확인</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 문서 종류별 정확도</div>
전체: 97%<br>
인쇄된 청구서 (전체의 90%): 99%<br>
<span class="sel">손으로 쓴 청구서 (전체의 10%): 71%</span>
</div>
<p class="cap">이해를 돕기 위한 예시 수치. 종류별로 나눠야 71%가 보임.</p>
<h4>③ 확인 방법 두 가지</h4>
<table>
<tr><th>방법</th><th>내용</th></tr>
<tr><td>층화 표집<br>stratified sampling</td><td>문서 종류별로 일정 수씩 뽑아 채점. 수가 적은 종류의 문제도 드러남</td></tr>
<tr><td>보정<br>calibration</td><td>Claude가 "확신 90%"라고 보고한 결과를 정답과 대조. 실제 정답률이 74%면 그 점수를 분류 기준으로 사용 불가</td></tr>
</table>
<h4>④ 문서 단위 점수와 항목 단위 점수</h4>
<ul>
<li>문서 단위: 문서 하나에 점수 하나. 항목 하나만 불확실해도 문서 전체가 사람 검토로 전달</li>
<li>항목 단위: 항목마다 점수. 불확실한 항목만 사람이 확인. 같은 인력으로 더 많은 문서 처리</li>
<li>어느 쪽이든 보정을 거친 점수만 분류 기준으로 사용</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>층화 표집(stratified sampling)</b>: 전체를 종류별로 나눈 뒤 종류마다 일정 수씩 뽑는 방법</li>
<li><b>보정(calibration)</b>: 스스로 매긴 확신 점수가 실제 정확도와 맞는지 정답과 대조하는 작업</li>
<li><b>자동 통과</b>: 사람 검토 없이 결과를 그대로 사용하는 처리</li>
</ul>
</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"검토 인력이 부족할 때의 설계",
   html:`__MAP5:conf__<h4>① 사람 검토로 보낼 대상</h4>
<ul>
<li>신뢰도가 낮은 추출 결과</li>
<li>원본 문서 자체가 모호하거나 모순인 경우</li>
<li>분류 기준은 사람이 정해 프로그램에 넣음. 에이전트가 그때그때 정하는 방식이 아님</li>
</ul>
<h4>② 자동 통과 범위를 넓히는 순서</h4>
<ul>
<li>1단계: 문서 종류별, 항목별 정확도 확인</li>
<li>2단계: 정확한 범위만 자동 통과로 전환. 부정확한 범위는 계속 사람 검토</li>
<li>3단계: 자동 통과 범위도 층화 표집으로 계속 표본 채점</li>
</ul>
<div class="fig"><b>3단계가 필요한 이유</b><br>
새 거래처의 새 양식 유입 → 자동 통과 범위에서 정확도 하락<br>
표본 채점이 없는 경우&nbsp;&nbsp;<span class="an">← 하락 사실이 드러나지 않음</span><br>
표본 채점이 있는 경우&nbsp;&nbsp;<span class="an">← 초기에 발견</span>
</div>
<h4>③ 사람이 하는 일</h4>
<table>
<tr><th>순서</th><th>작업</th></tr>
<tr><td>1</td><td>정답 자료 작성</td></tr>
<tr><td>2</td><td>보정 확인</td></tr>
<tr><td>3</td><td>분류 기준값 설정</td></tr>
<tr><td>4</td><td>표본 채점 주기 설정</td></tr>
</table>
<ul>
<li>Claude의 역할: 점수 산출</li>
<li>효과 없는 판단: 전체 정확도가 높다는 이유만으로 사람 검토 축소</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>기준값(threshold)</b>: 이 값 이상이면 자동 통과, 미만이면 사람 검토처럼 분류를 가르는 숫자</li>
<li><b>표본 채점</b>: 일부를 뽑아 정답과 대조하는 일</li>
</ul>
</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: The averaged-away tax ID",
       q:`Your extractor outputs one confidence score per document; documents averaging 0.93+ auto-approve. Finance just found tax_registration_number wrong on 18% of auto-approved invoices — the other nine fields were nearly perfect, so the document average stayed high while the weakest field sailed through unreviewed. What is the correct redesign?`,
       opts:[
         {t:`Have the model output field-level confidence scores, calibrate them per field against a labeled validation set, and route documents whose critical fields fall below their calibrated thresholds — a document average cannot protect an individual field.`, ok:true},
         {t:`Raise the document-level auto-approval bar from 0.93 to 0.97, cutting how much error can hide beneath the average.`},
         {t:`Route every document that contains a tax-ID field to human review, regardless of its confidence scores.`},
         {t:`Remove tax_registration_number from automated extraction and have finance key that field in manually.`},
       ],
       hint:`평균값 안에 정확도가 낮은 필드가 가려지는 구조임. 문서 단위 기준값을 올려도 개별 필드는 드러나지 않음. 전체 정확도 97% 사례의 필드 단위 형태임.`,
       explain:{
         good:`5.5의 필드 단위 신뢰도와 필드별 보정을 묻는 문제임. 문서 평균은 나머지 아홉 필드의 높은 정확도로 한 필드의 오류를 가림. 임계값은 필드 단위로 정하고, 보정을 거친 뒤에 적용함.`,
         wrongs:[
           `<b>B(문서 기준값 상향):</b> 0.97도 평균값이므로 정확도가 낮은 필드는 여전히 가려짐. 자동 통과 처리량만 크게 줄어듦.`,
           `<b>C(해당 필드 전량 리뷰):</b> 정확하게 추출된 82%까지 사람이 확인하게 되어 리뷰 병목이 다시 생기고 자동화의 목적이 사라짐.`,
           `<b>D(해당 필드 수동 입력):</b> 개선할 수 있는 결함을 해결하지 않고 자동화 범위에서 제외하는 조치임.`,
         ]},
       principle:"문서 평균으로는 개별 필드를 보장하지 못함"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2: Guarding the automated lane",
       q:`You automated high-confidence invoice extractions after proper segment validation. Six months later, a new supplier's invoice layout starts failing silently inside the automated lane. Which ongoing safeguard would have caught this?`,
       opts:[
         {t:`Stratified random sampling of high-confidence extractions for continuous error-rate measurement and novel-pattern detection.`, ok:true},
         {t:`Re-running the original validation set quarterly to confirm the model still passes.`},
         {t:`Requiring the model to output a warning when it sees unfamiliar layouts.`},
         {t:`Lowering the automation threshold so more documents route to humans overall.`}],
       hint:`새로운 오류 패턴은 신뢰도가 높은 구간 안에서 발생하며 곧바로 드러나지 않음. 그 구간을 계속 점검하는 수단을 확인할 것.`,
       explain:{
         good:`층화 표집을 사용하는 이유임. 신뢰도가 높은 자동 구간에서도 층별 표본을 계속 뽑아 오류율 변화와 새 오류 패턴(신규 공급사 레이아웃)을 확인함. 가이드 5.5의 내용임.`,
         wrongs:[
           `<b>B:</b> 기존 검증 세트에는 새 공급사 문서가 없으므로 과거 성능만 재확인할 뿐 새 패턴을 확인하지 못함.`,
           `<b>C:</b> 낯선 레이아웃에 경고를 내라는 지시는 모델의 자기 인식에 의존하는 방식임. 모델은 처음 보는 형식을 처음 보는 것으로 판단하지 못하는 경우가 많음.`,
           `<b>D:</b> 전체 임계값을 낮추면 검토 비용만 늘고 새 패턴의 발견 여부는 여전히 우연에 좌우됨.`,
         ]},
       principle:"자동 구간은 층화 표집으로 계속 감시함"},
    ]},

  /* ===== CH 6 · 5.6 출처 보존·불확실성 ===== */
  { id:"p5c6", ch:"CH 6", title:"출처 보존과 불확실성 처리 (5.6)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"출처 보존: 주장과 출처의 연결을 끝까지 유지하는 일",
   html:`<h4>① 연결이 끊기는 지점</h4>
<ul>
<li>출처 보존(provenance): 어떤 주장이 어느 자료에서 나왔는지를 최종 결과물까지 유지하는 일</li>
<li>끊기는 지점: 요약 단계. 내용을 줄일 때 주장과 출처의 연결이 사라짐</li>
<li>결과: 완성된 보고서에서 어느 자료의 내용인지 다시 확인 불가</li>
</ul>
<h4>② 주장과 출처를 함께 적는 양식</h4>
<ul>
<li>서브에이전트의 출력 항목: 주장, 근거 문장, 출처 이름이나 주소, 발행일</li>
<li>작성 담당 에이전트의 규칙: 이 묶음을 버리지 않고 보고서의 해당 문장에 출처 표시로 연결</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 서브에이전트의 출력 한 건</div>
{ "claim": "전기차 배터리 시장 연 40% 성장",<br>
&nbsp;&nbsp;"source": "BloombergNEF 2025 보고서",<br>
&nbsp;&nbsp;"excerpt": "…the market grew 40% year-over-year…",<br>
<span class="sel">&nbsp;&nbsp;"published": "2025-11"</span> }
</div>
<p class="cap">이해를 돕기 위한 예시. 글 안에 문장으로만 적은 출처는 다음 요약에서 사라짐.</p>
<h4>③ 시점이 다른 자료</h4>
<ul>
<li>2019년 통계와 2024년 통계가 다른 경우: 모순이 아니라 시간에 따른 변화일 수 있음</li>
<li>해결: 출력 양식에 발행일과 수집일 포함</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>출처 보존(provenance)</b>: 주장마다 어느 자료에서 나왔는지 추적할 수 있게 유지하는 일</li>
<li><b>근거 문장(excerpt)</b>: 주장을 뒷받침하는 원문의 한 부분</li>
</ul>
</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"자료가 어긋날 때의 보고서 작성 기준",
   html:`__MAP5:prov__<h4>① 믿을 만한 자료끼리 값이 다른 경우</h4>
<ul>
<li>하나를 임의로 고르지 않기</li>
<li>두 값을 모두 출처, 시점과 함께 남기고 서로 다르다는 표시 추가</li>
<li>분석 단계는 두 값을 그대로 포함해 마무리. 조정은 코디네이터가 담당</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 보고서의 한 문단</div>
시장 규모<br>
&nbsp;&nbsp;42억 달러 (2023년 업계 협회 전수 조사)<br>
&nbsp;&nbsp;51억 달러 (2024년 분석가 전망치)<br>
<span class="sel">두 값은 조사 시점과 방법이 다름</span>
</div>
<h4>② 확립된 내용과 논쟁 중인 내용</h4>
<ul>
<li>보고서를 두 부분으로 구분해 작성</li>
<li>원문의 표현 강도와 조사 방법 설명을 그대로 유지</li>
</ul>
<h4>③ 내용 종류별 표현 형식</h4>
<table>
<tr><th>내용</th><th>형식</th></tr>
<tr><td>재무 자료</td><td>표</td></tr>
<tr><td>뉴스</td><td>글</td></tr>
<tr><td>기술 조사 결과</td><td>항목 목록</td></tr>
</table>
<ul>
<li>모든 내용을 한 가지 형식으로 바꾸면 정보 손실</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>전수 조사</b>: 대상 전체를 빠짐없이 조사하는 방식</li>
<li><b>전망치</b>: 앞으로의 값을 예측한 수치</li>
</ul>
</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: 'Just take the newer number'",
       q:`Two credible figures for the same market size: $4.2B from a 2023 industry-association census, $5.1B from a 2024 analyst projection. Your PM pushes: "Obviously use the 2024 number — it's more current, and shipping two numbers makes us look indecisive." What should the analysis stage actually do?`,
       opts:[
         {t:`Include both values, annotated with source, date, and methodology (census vs projection), and pass the conflict upward for the coordinator to reconcile — recency doesn't adjudicate between different methodologies, and honesty about conflict isn't indecision.`, ok:true},
         {t:`Follow the PM: newer data supersedes older, and a single clean number keeps the report actionable for decision-makers.`},
         {t:`Average the two to $4.65B and footnote both sources, satisfying accuracy and decisiveness at once.`},
         {t:`Fetch a third source as a tie-breaker and report whichever value two of the three agree on.`},
       ],
       hint:`2024년 값이 2023년 값을 정정한 것이 아님. 하나는 실측 조사이고 다른 하나는 전망임. 최신성이 방법론 차이를 판정할 수 있는지 확인할 것.`,
       explain:{
         good:`5.6의 충돌 처리임. 임의 선택은 금지이며, 방법론이 다르면(실측 조사와 전망) 최신성은 판정 기준이 되지 못함. 출처, 시점, 방법론 주석과 함께 두 값을 모두 보존하고 조정은 상위 단계로 넘김. 하나로 정리하라는 상급자의 요구가 이 문제에서 오답을 유도하는 조건임.`,
         wrongs:[
           `<b>B(최신 값 우선):</b> 같은 조사의 개정판이라면 맞지만 이 문제에서는 방법론이 다르므로 전망이 실측을 대체하지 못함.`,
           `<b>C(평균 계산):</b> $4.65B는 어느 소스에도 없는 값임. 각주를 붙여도 없는 값을 만들어 낸 것임.`,
           `<b>D(다수결):</b> 세 번째 소스가 앞의 두 값 중 하나를 인용한 것이라면 2대 1이라는 결과는 의미가 없음. 개수를 세는 것은 방법론 평가가 아님.`,
         ]},
       principle:"최신성은 판정 기준이 아니며 충돌은 주석해 상위로 넘김"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2: The false contradiction",
       q:`Your synthesis agent flags a "contradiction": one finding says remote work adoption is 45%, another says 28%. Investigation reveals the first is from a 2021 survey, the second from 2024 — but the subagents' structured outputs contain no dates, so synthesis couldn't tell. What is the systemic fix?`,
       opts:[
         {t:`Require subagents to include publication or data-collection dates in their structured outputs, so temporal differences are interpreted as change over time rather than contradiction.`, ok:true},
         {t:`Instruct the synthesis agent to search the web for dates whenever it detects conflicting figures.`},
         {t:`Have synthesis discard the older figure whenever a conflict is detected.`},
         {t:`Treat all conflicting statistics as unreliable and exclude them from reports.`}],
       hint:`합성 단계가 잘못 판단한 원인은 능력 부족이 아니라 입력에 빠진 항목임. 무엇이 빠졌는지 확인할 것.`,
       explain:{
         good:`가이드 5.6의 내용임. 구조화된 출력에 발행일과 수집일을 반드시 포함해 시점 차이가 모순으로 해석되는 것을 방지함. 앞 단계의 출력 형식을 고치는 것이 근본 대응임.`,
         wrongs:[
           `<b>B:</b> 나중에 웹을 검색하면 비용이 추가되고 날짜를 찾지 못할 수도 있음. 원인은 앞 단계가 이미 가지고 있던 정보를 버린 것임.`,
           `<b>C:</b> 날짜를 모르면 어느 값이 더 오래된 것인지 판별할 수 없고, 시간에 따른 변화 자체가 중요한 발견일 수 있음.`,
           `<b>D:</b> 충돌을 곧 신뢰할 수 없음으로 처리하면 정보가 손실됨. 45%에서 28%로의 변화는 그 자체가 중요한 추세 정보임.`,
         ]},
       principle:"시점도 데이터이므로 날짜를 반드시 포함함"},
    ]},

  /* ===== D5 미니테스트 ===== */
  { id:"p5test", type:"test", title:"D5 미니테스트 · 컨텍스트 & 신뢰성 12문항",
    questions:[
    {ts:"5.1", lvl:"기초", q:`Why do progressively summarized conversations lose refund amounts and promised dates?`,
     opts:[
       {t:`Summarization condenses specific numerical values and dates into vague generalities unless they are extracted into a separate persistent structure.`, ok:true},
       {t:`The model's context window truncates numbers first.`},
       {t:`Numerical tokens cost more, so summaries drop them to save budget.`},
       {t:`Dates are personally identifiable information and get filtered automatically.`}],
     explain:{good:`요약은 압축이고 압축 과정에서 구체적 수치가 일반 서술로 바뀜. 그래서 case facts 블록을 요약 대상 밖에 둠.`,
       wrongs:[`<b>B:</b> 절삭은 위치를 기준으로 일어나며 숫자를 먼저 버리는 방식이 아님.`,`<b>C:</b> 숫자 토큰이 더 비싸서 버려진다는 동작은 존재하지 않음.`,`<b>D:</b> 날짜가 개인식별정보(PII)로 자동 필터링된다는 동작도 존재하지 않음.`]},
     principle:"요약은 구체적 수치를 남기지 못함"},
    {ts:"5.1", lvl:"실전", q:`Your report generator receives aggregated findings from five subagents as one long input. QA shows conclusions from sections 2-4 (the middle) are routinely missing from final reports, while sections 1 and 5 are well covered. What is the best mitigation?`,
     opts:[
       {t:`Place a summary of key findings at the beginning of the aggregated input and organize detailed results with explicit section headers — mitigating the lost-in-the-middle effect.`, ok:true},
       {t:`Randomize section order on each run so no section is always in the middle.`},
       {t:`Split the report generation into five separate runs, one per section.`},
       {t:`Instruct the generator to "pay equal attention to all sections."`}],
     explain:{good:`중간 부분의 누락은 lost in the middle 현상임. 핵심 요약을 맨 앞에 배치하고 섹션 헤더를 명시하는 것이 가이드 5.1의 대응책임.`,
       wrongs:[`<b>B:</b> 누락되는 섹션이 매번 바뀔 뿐이며 어떤 섹션은 항상 가운데에 놓임.`,`<b>C:</b> 섹션 간 종합이 리포트의 목적인데 다섯 번으로 나누면 종합 자체가 사라짐.`,`<b>D:</b> 입력 위치에 따른 반영 편차는 지시로 교정되지 않음.`]},
     principle:"핵심은 입력의 처음과 끝에 배치함"},
    {ts:"5.2", lvl:"기초", q:`Which situation is a legitimate escalation trigger per best practice?`,
     opts:[
       {t:`The customer's request falls into a policy gap — the policy is silent on this specific case.`, ok:true},
       {t:`Sentiment analysis detects the customer is very frustrated.`},
       {t:`The agent's self-reported confidence drops below 0.6.`},
       {t:`The conversation exceeds ten turns.`}],
     explain:{good:`정당한 트리거는 세 가지임. 명시적인 사람 요구, 정책 예외 또는 공백, 진전 불가임. 정책 공백은 그중 하나임.`,
       wrongs:[`<b>B:</b> 감정은 난이도를 나타내지 않으므로 신뢰할 수 없는 대리 지표임.`,`<b>C:</b> 자기 보고 신뢰도도 같은 이유로 사용할 수 없음.`,`<b>D:</b> 턴 수는 케이스 복잡도의 근거가 아님.`]},
     principle:"정당한 에스컬레이션 트리거 3종"},
    {ts:"5.2", lvl:"실전", q:`A customer's first message: "Your app deleted my playlist. Get me a human. NOW." Playlist restoration is a one-click operation well within the agent's capability. What is the correct behavior?`,
     opts:[
       {t:`Acknowledge the frustration, offer the immediate one-click restoration since the issue is straightforward — and escalate immediately if the customer reiterates their preference for a human.`, ok:true},
       {t:`Escalate immediately without any attempt — the customer explicitly demanded a human.`},
       {t:`Restore the playlist first, then ask whether they still want a human.`},
       {t:`Explain that human agents have long wait times and the bot can help faster.`}],
     explain:{good:`가이드 5.2에서 판단이 갈리는 지점임. 이슈가 단순하면 불만을 인정하고 해결을 한 번 제안하며, 고객이 다시 요구하면 즉시 넘김. 무조건 즉시 넘기는 것이 아니라는 점에서 오답이 나오기 쉬움.`,
       wrongs:[`<b>B:</b> 가이드는 단순한 이슈이면 해결을 제안하라고 명시함. 복잡하거나 고객이 다시 요구하는 경우에 즉시 넘김.`,`<b>C:</b> 동의 없이 계정에 변경을 먼저 적용하는 방식이며 고객의 의사 확인이 빠졌음.`,`<b>D:</b> 사람 연결을 피하도록 설득하는 것은 고객의 요구를 존중하는 원칙에 어긋남.`]},
     principle:"단순한 요청은 한 번 제안하고 재요구에는 즉시 넘김"},
    {ts:"5.3", lvl:"기초", q:`Which of the following is an error-propagation anti-pattern in multi-agent systems?`,
     opts:[
       {t:`Catching a timeout and returning an empty result set marked as successful.`, ok:true},
       {t:`Attempting limited local retries for transient failures before propagating.`},
       {t:`Including partial results alongside the error context.`},
       {t:`Reporting what query was attempted when propagating a failure.`}],
     explain:{good:`실패를 성공으로 반환하는 것은 3대 안티패턴 중 하나임. 복구 기회를 없애고 불완전한 결과를 그대로 확정함.`,
       wrongs:[`<b>B:</b> 일시적 실패에 대한 제한된 로컬 재시도는 권장 패턴임.`,`<b>C:</b> 부분 결과를 함께 반환하는 것도 권장 사항이며 코디네이터의 판단 근거가 됨.`,`<b>D:</b> 시도한 쿼리를 보고하는 것은 구조화 4요소 중 하나임.`]},
     principle:"성공 위장, 뭉뚱그린 상태, 전체 중단이 3대 안티패턴"},
    {ts:"5.3", lvl:"실전", q:`Your coordinator receives {"status": "no_data"} from the market-data subagent in two very different situations: when the data API is down, and when a legitimate query genuinely has no matching records. Recently the coordinator skipped a retry during an outage, shipping a report missing an entire section. What is the fix?`,
     opts:[
       {t:`Change the subagent's reporting to distinguish access failures (with failure type and retry-relevant context) from valid empty results, so the coordinator can retry outages but accept true empties.`, ok:true},
       {t:`Have the coordinator always retry once on "no_data" regardless of cause.`},
       {t:`Treat "no_data" as fatal and halt report generation for investigation.`},
       {t:`Add a disclaimer to all reports that sections may be missing during outages.`}],
     explain:{good:`접근 실패와 정상적인 빈 결과를 구분하는 원리이며 2.2와 5.3에 공통으로 적용됨. 구분이 되면 코디네이터가 상황에 맞는 행동(재시도 또는 수용)을 고를 수 있음.`,
       wrongs:[`<b>B:</b> 실제로 결과가 없는 경우까지 재시도하므로 낭비이고, 장애가 재시도 1회보다 오래 지속되면 해결되지 않음.`,`<b>C:</b> 정상적인 빈 결과에도 전체를 중단하는 과도한 대응임.`,`<b>D:</b> 면책 문구는 두 경우를 구분하지 못하는 원인을 해결하지 못함.`]},
     principle:"접근 실패와 빈 결과를 구분함"},
    {ts:"5.4", lvl:"기초", q:`What is the telltale sign of context degradation in an extended code-exploration session?`,
     opts:[
       {t:`The model starts referencing "typical patterns" instead of the specific classes and functions it discovered earlier.`, ok:true},
       {t:`Responses become shorter as the session progresses.`},
       {t:`The model asks more clarifying questions than before.`},
       {t:`Tool calls start taking longer to execute.`}],
     explain:{good:`구체적 내용에서 일반적 서술로 바뀌는 것이 열화의 신호임. 앞서 확인한 AuthGateway 대신 일반적인 인증 서비스 설명이 나오기 시작함.`,
       wrongs:[`<b>B:</b> 응답 길이는 열화와 무관하며 짧아도 구체적일 수 있음.`,`<b>C:</b> 확인 질문이 늘어나는 것은 오히려 정상적인 동작일 수 있음.`,`<b>D:</b> 도구 실행 속도는 인프라 문제이며 모델 컨텍스트와 무관함.`]},
     principle:"열화 신호는 구체적 내용이 일반 서술로 바뀌는 것"},
    {ts:"5.4", lvl:"실전", q:`A three-phase codebase analysis (map structure → trace dependencies → propose refactors) keeps failing in phase 3: the proposals ignore constraints discovered in phase 1 because the context filled with phase 2's verbose dependency dumps. Which restructuring is best?`,
     opts:[
       {t:`Summarize each phase's key findings before starting the next, injecting the summaries into the next phase's initial context — and delegate verbose tracing to subagents that return only structured results.`, ok:true},
       {t:`Run /compact once at the end of phase 2 to shrink the dependency dumps.`},
       {t:`Merge all three phases into one continuous run so nothing needs handing over.`},
       {t:`Ask phase 3 to re-read the phase 1 outputs from the conversation history.`}],
     explain:{good:`가이드 5.4의 단계 간 요약 주입과 서브에이전트 격리를 함께 적용함. 각 단계가 필요한 핵심만 가지고 시작하므로 컨텍스트 잠식이 없음.`,
       wrongs:[`<b>B:</b> 나중에 압축하면 phase 1의 제약까지 함께 사라질 수 있음. 선별 없는 압축임.`,`<b>C:</b> 세 단계를 합치면 잠식이 더 빨라지므로 방향이 반대임.`,`<b>D:</b> 히스토리에 있는 phase 1 내용은 이미 밀려났거나 요약된 상태이며, 그것이 이 문제의 증상임.`]},
     principle:"단계 사이 요약 주입과 위임 격리를 함께 적용함"},
    {ts:"5.5", lvl:"기초", q:`Why can a 97% aggregate accuracy metric be misleading before automating away human review?`,
     opts:[
       {t:`It can mask poor performance on specific document types or fields — some segments may be far below average.`, ok:true},
       {t:`Aggregate metrics are always computed on training data.`},
       {t:`97% is below the industry standard for automation.`},
       {t:`Accuracy metrics cannot be computed for extraction tasks.`}],
     explain:{good:`평균값은 특정 구간의 낮은 성능을 가림. 자동화 전에 유형별, 필드별 분해 검증이 필요함.`,
       wrongs:[`<b>B:</b> 집계 지표가 훈련 데이터에서만 계산된다는 규칙은 없음.`,`<b>C:</b> 자동화의 업계 표준 정확도 같은 기준은 존재하지 않음.`,`<b>D:</b> 추출 과제도 정답 라벨이 있으면 정확도를 계산할 수 있음.`]},
     principle:"평균값에 가려지는 구간이 있음"},
    {ts:"5.5", lvl:"실전", q:`With only two human reviewers for thousands of daily extractions, which routing design uses their capacity best?`,
     opts:[
       {t:`Route extractions with low calibrated confidence scores, plus documents whose sources are ambiguous or contradictory, to human review first.`, ok:true},
       {t:`Review a fixed random 5% of all extractions daily.`},
       {t:`Review the highest-value invoices only, regardless of confidence.`},
       {t:`Review whatever the reviewers select themselves from a dashboard.`}],
     explain:{good:`가이드 5.5의 내용임. 한정된 리뷰 인력은 신뢰도가 낮은 추출과 모호하거나 모순된 소스에 우선 배치함. 보정된 신뢰도가 라우팅의 판단 기준임.`,
       wrongs:[`<b>B:</b> 무작위 추출은 감시용 층화 표집의 방식이며 부족한 인력을 배분하는 기준이 아님.`,`<b>C:</b> 금액과 오류 확률은 서로 다른 기준임. 금액이 크더라도 신뢰도가 높으면 후순위임.`,`<b>D:</b> 리뷰어가 직접 고르는 방식은 기준이 없는 배분임.`]},
     principle:"신뢰도가 낮은 항목에 사람을 배치함"},
    {ts:"5.6", lvl:"기초", q:`During multi-step summarization, what must be preserved to keep final reports trustworthy?`,
     opts:[
       {t:`The claim-source mappings — which statement came from which source, with URLs/document names.`, ok:true},
       {t:`The full text of every source document.`},
       {t:`The order in which sources were fetched.`},
       {t:`The token counts of each intermediate summary.`}],
     explain:{good:`요약 단계에서 끊기기 쉬운 것이 주장과 출처의 연결임. 구조화된 매핑으로 보존하고 병합해야 함.`,
       wrongs:[`<b>B:</b> 원문 전체를 보존하는 것은 요약의 목적과 어긋나며 매핑만 있으면 충분함.`,`<b>C:</b> 소스를 수집한 순서는 신뢰성과 무관함.`,`<b>D:</b> 중간 요약의 토큰 수도 출처 신뢰성과 무관함.`]},
     principle:"주장과 출처의 연결을 끝까지 유지함"},
    {ts:"5.6", lvl:"실전", q:`Your final research reports render everything as uniform bullet lists — quarterly financials, breaking news quotes, and API benchmark results all look identical, and reviewers say the financials are unreadable. What does best practice prescribe?`,
     opts:[
       {t:`Render content types appropriately in synthesis output — financial data as tables, news as prose, technical findings as structured lists — rather than converting everything to one format.`, ok:true},
       {t:`Convert everything to prose paragraphs, the most readable universal format.`},
       {t:`Let the model choose one format per report based on the dominant content type.`},
       {t:`Attach the raw source files so readers can consult the originals.`}],
     explain:{good:`가이드 5.6의 콘텐츠 유형별 렌더링임. 재무 데이터는 표, 뉴스는 산문, 기술 내용은 구조화 목록으로 표현함. 획일 변환은 정보 손실을 일으킴.`,
       wrongs:[`<b>B:</b> 산문으로 통일하는 것도 같은 오류의 다른 형태임. 재무 수치는 산문 형태에서 더 읽기 어려움.`,`<b>C:</b> 리포트 하나에 여러 유형이 섞여 있는 것이 문제이므로 지배적 유형 하나를 고르는 방식으로는 해결되지 않음.`,`<b>D:</b> 원본 파일 첨부는 렌더링 문제의 해결책이 아님.`]},
     principle:"콘텐츠 유형에 맞는 형식으로 표현함"},
    ]},
  ]
};
