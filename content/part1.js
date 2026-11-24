/* PART 1: 에이전트 아키텍처 & 오케스트레이션 (D1, 27%) */
window.CCAF_CONTENT.p1 = {
  id: "p1",
  lessons: [

  /* ================= CH 1 · 1.1 ================= */
  { id:"p1c1", ch:"CH 1", title:"에이전트 루프의 생명주기 (1.1)",
    steps:[
      {type:"concept", kind:"PART BRIEFING · 파트 설명", h:"PART 01. 스스로 판단하고 실행하는 구조",
   html:`<h4>① 다루는 영역</h4>
<ul>
<li>에이전트(agent): 목표를 받으면 필요한 작업을 스스로 골라 끝날 때까지 실행하는 AI 프로그램</li>
<li>이 파트의 주제: 에이전트 한 개의 작동 방식과 에이전트 여러 개의 역할 분담</li>
<li>영어 이름: Agentic Architecture &amp; Orchestration</li>
</ul>
<h4>② 챕터 구성</h4>
<table>
<tr><th>챕터</th><th>주제</th></tr>
<tr><td>CH 1</td><td>에이전트 루프(agent loop). 작업이 끝날 때까지 반복되는 실행 순서</td></tr>
<tr><td>CH 2</td><td>작업 분해. 큰 작업을 작은 작업으로 나누는 방식</td></tr>
<tr><td>CH 3, CH 4</td><td>코디네이터(coordinator)와 서브에이전트(subagent)의 역할 분담과 자료 전달</td></tr>
<tr><td>CH 5, CH 6</td><td>규칙 위반을 프로그램으로 막는 방법. 게이트와 훅(hook)</td></tr>
<tr><td>CH 7</td><td>세션 관리. 이전 작업을 이어받는 방법</td></tr>
<tr><td>CH 8</td><td>에이전트를 실행하는 네 가지 방법</td></tr>
</table>
<h4>③ 파트 전체에 쓰는 판단 기준</h4>
<ul>
<li>반드시 지켜야 하는 규칙: 프로그램으로 강제</li>
<li>권장 사항과 문체: 프롬프트로 지시</li>
<li>자격시험 출제 비중: 27%. 다섯 영역 중 최대</li>
</ul>`},
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"대화 기록과 중지 이유(stop_reason)",
   html:`<h4>① 대화 기록</h4>
<ul>
<li>Claude에 요청을 보낼 때 함께 보내는 메시지 목록. 영어 이름은 conversation history</li>
<li>메시지마다 말한 쪽 표시. 사용자는 user, Claude는 assistant</li>
<li>Claude는 요청을 받을 때마다 목록 전체를 처음부터 읽고 답을 작성</li>
<li>목록에 없는 내용은 Claude가 알 수 없음</li>
</ul>
<div class="fig"><b>대화 기록 예시</b><br>
user: "주문 1024번 배송 상태 알려 줘"<br>
assistant: 주문 조회 도구 호출&nbsp;&nbsp;<span class="an">← 도구가 필요해서 멈춤</span><br>
user: 도구 결과 "배송 중. 내일 도착 예정"&nbsp;&nbsp;<span class="an">← 결과를 기록에 추가</span><br>
assistant: "내일 도착 예정입니다."&nbsp;&nbsp;<span class="an">← 답을 마침</span>
</div>
<h4>② 중지 이유</h4>
<ul>
<li>Claude의 답마다 붙는 값. 답을 멈춘 이유를 표시</li>
<li>항목 이름: <code>stop_reason</code></li>
</ul>
<table>
<tr><th>값</th><th>뜻</th><th>다음 행동</th></tr>
<tr><td><code>tool_use</code></td><td>도구 실행이 필요해서 멈춤</td><td>도구를 실행하고 결과를 돌려보내기</td></tr>
<tr><td><code>end_turn</code></td><td>할 답을 모두 마침</td><td>작업 종료</td></tr>
<tr><td><code>max_tokens</code></td><td>답 길이 한도 도달</td><td>한도를 늘려 다시 요청. 또는 이어서 작성 요청</td></tr>
<tr><td><code>stop_sequence</code></td><td>미리 정해 둔 중단 문자열 출력</td><td>정해 둔 처리 진행</td></tr>
<tr><td><code>pause_turn</code></td><td>Anthropic 서버에서 실행하는 도구의 반복 한도 도달</td><td>받은 답을 그대로 붙여 다시 요청</td></tr>
<tr><td><code>refusal</code></td><td>Claude가 요청을 거절</td><td>요청 내용 수정. 또는 다른 모델로 재시도</td></tr>
<tr><td><code>model_context_window_exceeded</code></td><td>답이 컨텍스트 창을 가득 채움</td><td>잘린 답으로 처리</td></tr>
</table>
<ul>
<li>반복을 계속하는 값: <code>tool_use</code></li>
<li>작업을 마쳤다는 값: <code>end_turn</code></li>
<li>값별 처리 방법: <a href="https://platform.claude.com/docs/ko/build-with-claude/handling-stop-reasons" target="_blank" rel="noopener">Claude 공식 문서 '중지 이유와 폴백' 페이지</a> (한국어)</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>토큰(token)</b>: Claude가 글을 세는 단위. 분량, 비용, 속도를 계산하는 기준</li>
<li><b>컨텍스트 창(context window)</b>: Claude가 한 번에 읽을 수 있는 글의 한도. 대화 기록과 전달받은 자료가 모두 포함</li>
<li><b>API</b>: 프로그램끼리 요청과 답을 주고받는 통로</li>
<li><b>도구(tool)</b>: Claude가 호출할 수 있게 연결해 둔 기능. 예: 주문 조회, 파일 읽기</li>
</ul>
</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"에이전트 루프의 반복 순서",
   html:`__MAP:loop__<h4>① 반복 순서</h4>
<div class="loopdia">
  <span class="nd">① 요청 보내기<small>대화 기록 전체</small></span><span class="ar">→</span>
  <span class="nd hot">② stop_reason 확인<small>tool_use? end_turn?</small></span><span class="ar">→</span>
  <span class="nd">③ 도구 실행<small>Claude가 요청한 도구</small></span><span class="ar">→</span>
  <span class="nd">④ 결과를 대화에 추가<small>다시 ①로</small></span>
</div>
<ul>
<li>④가 끝나면 ①로 돌아가 같은 순서 반복</li>
<li>②에서 <code>end_turn</code>이 나오면 종료</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 루프 실행 기록</div>
1회차&nbsp;&nbsp;stop_reason: tool_use&nbsp;&nbsp;주문 조회 도구 실행<br>
2회차&nbsp;&nbsp;stop_reason: tool_use&nbsp;&nbsp;배송 조회 도구 실행<br>
<span class="sel">3회차&nbsp;&nbsp;stop_reason: end_turn&nbsp;&nbsp;종료. 최종 답 전달</span>
</div>
<p class="cap">이해를 돕기 위한 예시. 요청 세 번 만에 작업이 끝난 경우.</p>
<h4>② 규칙 두 가지</h4>
<ul>
<li>계속할지 멈출지는 <code>stop_reason</code> 값으로 판단</li>
<li>도구 결과는 반드시 대화 기록에 추가. 추가하지 않은 결과는 Claude가 볼 수 없음</li>
</ul>
<div class="fig"><b>도구 요청과 결과가 오가는 형태</b><br>
Claude의 답: tool_use 블록&nbsp;&nbsp;<span class="an">← 도구 이름과 입력값</span><br>
다음 요청: tool_result 블록&nbsp;&nbsp;<span class="an">← 도구 실행 결과. user 메시지에 담아 전송</span>
</div>
<ul>
<li>Anthropic이 제공하는 개발 도구(SDK)의 도구 러너(tool runner)는 이 반복을 대신 처리</li>
</ul>
<h4>③ 다음 행동을 정하는 주체</h4>
<table>
<tr><th>방식</th><th>정하는 주체</th><th>특징</th></tr>
<tr><td>모델 주도<br>model-driven</td><td>Claude가 상황을 보고 매번 판단</td><td>예상하지 못한 상황에 대응 가능</td></tr>
<tr><td>사전 결정 트리<br>pre-configured decision tree</td><td>사람이 미리 작성한 순서</td><td>동작 예측 가능. 계획에 없던 상황에는 대응 불가</td></tr>
</table>
<ul>
<li>에이전트 루프는 모델 주도 방식</li>
<li>반드시 지켜야 하는 규칙이 있는 지점은 게이트와 훅으로 보완. CH 5와 CH 6의 내용</li>
</ul>
<h4>④ 잘못된 종료 판단</h4>
<table>
<tr><th>방식</th><th>문제</th></tr>
<tr><td>반복 횟수 상한을 종료 기준으로 사용</td><td>작업이 끝나기 전에 멈추는 경우 발생. 상한은 보조 안전장치 용도</td></tr>
<tr><td>답에 글이 있으면 종료로 판단</td><td>도구 요청과 글이 한 답에 함께 나오는 경우 존재</td></tr>
<tr><td>"완료했습니다" 같은 표현을 찾아 판단</td><td>표현이 바뀌면 동작 불가</td></tr>
</table>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>블록(block)</b>: 답이나 요청 안에서 내용을 종류별로 나눈 단위. 글, 도구 요청, 도구 결과가 각각 다른 블록</li>
<li><b>SDK</b>: 프로그램을 쉽게 만들 수 있게 미리 만들어 둔 개발 도구 묶음</li>
</ul>
</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: Four implementations",
       q:`Four teammates each implemented the agentic loop for your support agent. Whose implementation is correct?`,
       opts:[
         {t:`Ji-woo: continue while stop_reason is "tool_use", executing requested tools and appending every result — including tool errors — to the conversation as structured tool results; terminate on "end_turn".`, ok:true},
         {t:`Min-jun: same stop_reason logic, but drop failed tool results from the conversation so error noise doesn't confuse the model's reasoning.`},
         {t:`Sara: terminate when the response contains a final text block, since Claude ends its work with text; append successful tool results each cycle.`},
         {t:`Alex: continue on "tool_use", appending all results, but treat 12 iterations as the primary stopping condition to keep costs bounded.`},
       ],
       hint:`종료 조건과 "④ 결과 추가"의 범위를 함께 확인할 것. 성공한 결과만 추가하는지, 실패한 결과까지 추가하는지가 기준임. 오류 결과를 대화에서 빼는 선택지가 가장 자주 틀리는 지점임.`,
       explain:{
         good:`정답 구성은 stop_reason으로 종료를 판단하고, 실패한 결과까지 구조화해 대화에 추가하는 것임. 오류 결과를 대화에서 빼면 모델은 그 도구 호출이 실행됐다는 사실 자체를 알지 못하므로 같은 호출을 반복하고, 실패를 우회할 판단 기회도 사라짐.`,
         wrongs:[
           `<b>B(오류 결과 폐기):</b> 가장 자주 틀리는 선택지임. 노이즈 제거처럼 들리지만 실제로는 동일 호출 반복과 복구 판단 불가를 만듦.`,
           `<b>C(텍스트 존재로 종료):</b> 도구 요청과 설명 텍스트는 한 응답에 함께 나옴. 중간 설명 단계에서 조기 종료됨.`,
           `<b>D(12회 상한을 주 조건으로 사용):</b> 13회가 필요한 정상 작업을 미완성 상태로 중단시킴. 상한은 보조 안전장치일 때만 타당함.`,
         ]},
       principle:"원칙 ① 공식 신호로 판단 · ⑤ 실패도 기록으로 남김"},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 2: The token-saving 'optimization'",
       q:`To "save tokens," a teammate changed the loop: after executing requested tools, instead of appending the raw results, it appends a one-line prose note like "(fetched order data — looks normal)". Since the change, the agent re-requests lookups it already ran, and yesterday it quoted a shipping date that appears nowhere in the actual order data. What is the right fix?`,
       opts:[
         {t:`Append tool results to the conversation as structured tool results; if token cost is a real concern, trim them to the relevant fields before appending — don't replace data with prose impressions.`, ok:true},
         {t:`Keep the prose notes but make them longer and more structured — a bulleted digest of each result — so less information is lost while still saving tokens.`},
         {t:`Increase the context window budget so full raw results always fit, and revisit compression only if costs become a real problem.`},
         {t:`Add a prompt instruction telling the model not to re-request data it has already fetched, and to reason only from details it has actually seen in the conversation.`},
       ],
       hint:`"(looks normal)"이라는 문장만 남으면 모델에게 주문 데이터가 남는지 확인할 것. 두 증상(재조회, 존재하지 않는 날짜 인용)이 각각 왜 생겼는지 연결할 것. 토큰을 줄이는 올바른 방법은 5.1에 있음.`,
       explain:{
         good:`요약 문장은 데이터가 아님. 재조회(모델은 도구가 실행됐다는 사실을 모름)와 환각(존재하지 않는 날짜를 생성함)은 모두 원본 데이터가 없어서 생김. 정답은 구조화된 도구 결과를 유지하되 필요한 필드만 남기는 것임(5.1). 토큰 절약과 정확성을 함께 확보함.`,
         wrongs:[
           `<b>B(더 자세한 요약):</b> 요약을 늘려도 원본 필드는 여전히 없음. 모델이 참조할 데이터가 생기지 않음.`,
           `<b>C(컨텍스트 예산 증액):</b> 토큰을 줄이라는 요구를 무시함. 40개 필드 원본이 컨텍스트를 계속 소모하는 문제로 되돌아감.`,
           `<b>D(재조회 금지 지시):</b> 모델은 그 데이터를 받은 적이 없음. 재조회를 막으면 재조회 대신 환각이 늘어남.`,
         ]},
       principle:"원칙 ② 근본 원인: 데이터는 데이터로 전달"},
    ]},

  /* ================= CH 2 · 1.6 ================= */
  { id:"p1c2", ch:"CH 2", title:"작업 분해 전략 (1.6)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"작업을 나누는 두 가지 방식",
   html:`<h4>① 프롬프트 체이닝(prompt chaining)</h4>
<ul>
<li>미리 정한 단계를 순서대로 실행하는 방식</li>
<li>앞 단계의 결과가 다음 단계의 입력</li>
<li>맞는 작업: 필요한 단계를 시작 전에 모두 알 수 있는 작업</li>
<li>예: 파일을 하나씩 검토한 뒤 마지막에 파일 사이의 관계 검토</li>
</ul>
<h4>② 동적 분해(dynamic decomposition)</h4>
<ul>
<li>진행하면서 알게 된 내용에 따라 다음 작업을 정하는 방식</li>
<li>맞는 작업: 무엇이 나올지 미리 알 수 없는 조사</li>
<li>예: A를 고치는 중에 B도 함께 고쳐야 한다는 사실을 발견하면 B 수정을 계획에 추가</li>
</ul>
<div class="fig"><b>두 방식 비교</b><br>
프롬프트 체이닝: 1단계 → 2단계 → 3단계&nbsp;&nbsp;<span class="an">← 시작 전에 단계 확정</span><br>
동적 분해: 조사 → 발견 → 새 작업 추가 → 조사&nbsp;&nbsp;<span class="an">← 발견에 따라 계획 변경</span>
</div>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>파이프라인(pipeline)</b>: 앞 단계의 결과가 다음 단계의 입력이 되도록 순서대로 이어 놓은 처리 구조</li>
<li><b>의존성(dependency)</b>: A를 고치려면 B도 함께 고쳐야 하는 연결 관계</li>
</ul>
</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"작업 유형별 분해 방식 선택",
   html:`__MAP:decomp__<h4>① 판단 기준</h4>
<table>
<tr><th>작업의 성격</th><th>맞는 방식</th></tr>
<tr><td>단계를 미리 알 수 있고 매번 같은 기준 적용</td><td>프롬프트 체이닝</td></tr>
<tr><td>중간에 발견한 내용이 다음 단계를 결정</td><td>동적 분해</td></tr>
</table>
<h4>② 사례: 파일이 많은 코드 리뷰</h4>
<ul>
<li>문제: 파일 14개를 한 번에 검토하면 일부 파일은 얕게 검토. 같은 문제에 서로 다른 판정</li>
<li>원인: 한 번에 볼 내용이 많아 주의 분산</li>
<li>해결: 파일별 검토와 파일 사이의 관계 검토를 따로 실행. 프롬프트 체이닝에 해당</li>
<li>효과 없는 방법: 더 큰 모델이나 더 큰 컨텍스트 창. 주의 분산 문제는 그대로</li>
</ul>
<h4>③ 사례: 오래된 코드에 테스트 추가</h4>
<ul>
<li>대상: 문서와 담당자가 남아 있지 않은 오래된 코드(legacy code)</li>
<li>순서: 구조 파악, 영향이 큰 부분 찾기, 우선순위 계획</li>
<li>계획은 의존성을 발견할 때마다 수정. 동적 분해에 해당</li>
<li>효과 없는 방법: 파일 이름 순서대로 테스트 작성. 한 번에 전부 처리</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 동적 분해 계획의 변화</div>
처음 계획: ① 결제 모듈 테스트 ② 주문 모듈 테스트<br>
발견: 결제 모듈이 환율 모듈에 의존<br>
<span class="sel">수정한 계획: ① 환율 모듈 테스트 ② 결제 모듈 테스트 ③ 주문 모듈 테스트</span>
</div>
<p class="cap">이해를 돕기 위한 예시. 발견한 의존성 때문에 계획 맨 앞에 작업 하나 추가.</p>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>코드 리뷰(code review)</b>: 다른 사람이나 AI가 코드를 읽고 문제를 찾는 검토</li>
<li><b>테스트(test)</b>: 프로그램이 의도대로 동작하는지 확인하는 코드</li>
<li><b>모듈(module)</b>: 프로그램을 기능별로 나눈 한 부분</li>
</ul>
</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: The odd one out",
       q:`Which of these workloads should use a fixed sequential pipeline (prompt chaining) rather than dynamic adaptive decomposition?`,
       opts:[
         {t:`Nightly localization QA, where every support article goes through the same passes — terminology check, tone check, broken-link check — in the same order.`, ok:true},
         {t:`Investigating why checkout latency doubled last Tuesday, where each finding determines what to examine next.`},
         {t:`"Understand this unfamiliar payment service and propose improvements," where the scope emerges during exploration.`},
         {t:`Adding comprehensive tests to a legacy codebase, where interdependencies surface mid-task.`},
       ],
       hint:`네 선택지 중 하나만 단계가 미리 정해져 있고 매번 동일한 작업임. 나머지 세 개의 공통점을 먼저 찾을 것.`,
       explain:{
         good:`관점이 고정된 반복 작업(용어, 톤, 링크 순서가 매번 동일함)은 프롬프트 체이닝에 해당함. 판별 기준은 단계의 예측 가능성임.`,
         wrongs:[
           `<b>B(지연 원인 조사):</b> 발견이 다음 단계를 결정하는 전형적인 조사형 작업임. 동적 분해에 해당함.`,
           `<b>C(서비스 이해와 개선):</b> 범위 자체가 탐색 중에 드러나는 열린 과제임. 동적 분해에 해당함.`,
           `<b>D(레거시 코드 테스트 추가):</b> 가이드가 동적 분해의 대표 사례로 명시한 작업임.`,
         ]},
       principle:"예측 가능성이 분해 방식을 정한다"},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 2: Dana vs Raj",
       q:`Your agent must "add comprehensive tests to a 7-year-old legacy codebase." Two engineers disagree: Dana wants Claude to start generating tests for the main module immediately ("we learn the structure by doing"); Raj wants a complete fixed plan written upfront and followed exactly ("planning prevents waste"). What does best practice actually prescribe?`,
       opts:[
         {t:`Neither: first map the structure and identify high-impact areas, then build a prioritized plan — and treat that plan as adaptive, revising it as dependencies are discovered.`, ok:true},
         {t:`Dana's approach — early output builds momentum, and the codebase's structure reveals itself organically through the work.`},
         {t:`Raj's approach — a complete upfront plan is exactly what prevents wasted effort on a codebase this old.`},
         {t:`A compromise: generate tests module by module in directory order, which needs neither exploration nor planning.`},
       ],
       hint:`두 사람의 주장 모두 절반만 맞음. 가이드의 답은 계획을 세우되 그 계획을 적응형으로 운용하는 것임.`,
       explain:{
         good:`순서는 구조 파악, 고영향 영역 식별, 우선순위 계획 수립, 이후 적응임. Dana는 구조를 모르는 상태에서 작업을 시작하므로 영향이 작은 모듈에 노력을 낭비할 위험이 있음. Raj는 계획을 고정해 새로 발견된 의존성을 반영하지 못함. 정답은 적응형 계획이라는 세 번째 방식임.`,
         wrongs:[
           `<b>B(Dana):</b> 고영향 영역을 확인하지 않은 채 main module부터 시작함. 그 모듈이 고영향이라는 근거가 없음.`,
           `<b>C(Raj):</b> 레거시 코드의 구조는 조사하기 전에는 알 수 없음. 고정 계획은 첫 의존성이 발견되는 순간부터 맞지 않게 됨.`,
           `<b>D(디렉터리 순회):</b> 탐색도 계획도 없는 기계적 순서임. 두 방식의 단점만 합친 절충안임.`,
         ]},
       principle:"계획하되, 적응형으로"},
    ]},

  /* ================= CH 3 · 1.2 ================= */
  { id:"p1c3", ch:"CH 3", title:"코디네이터-서브에이전트 오케스트레이션 (1.2)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"허브 앤 스포크: 코디네이터를 중심에 둔 역할 분담 구조",
   html:`<h4>① 구조</h4>
<ul>
<li>코디네이터(coordinator): 작업을 나누고 맡기고 결과를 모으는 에이전트</li>
<li>서브에이전트(subagent): 코디네이터가 맡긴 작업 하나를 수행하는 에이전트</li>
<li>모든 지시, 결과, 오류 보고가 코디네이터를 거치는 구조</li>
</ul>
<div class="fig"><b>허브 앤 스포크(hub-and-spoke)</b><br>
코디네이터<br>
&nbsp;├─ 검색 서브에이전트&nbsp;&nbsp;<span class="an">← 지시를 받고 결과를 보고</span><br>
&nbsp;├─ 분석 서브에이전트<br>
&nbsp;└─ 작성 서브에이전트<br>
<span class="an">서브에이전트끼리 직접 주고받는 연결 없음</span>
</div>
<ul>
<li>장점: 진행 상황을 한 곳에서 확인. 오류 처리 방식 통일. 정보 흐름 통제</li>
</ul>
<h4>② 서브에이전트가 아는 범위</h4>
<ul>
<li>서브에이전트는 코디네이터의 대화 기록을 물려받지 않음</li>
<li>아는 내용: 코디네이터가 지시문에 적어 준 내용</li>
<li>예외: 포크(fork)로 만든 서브에이전트. 지금까지의 대화 전체를 물려받음</li>
<li>포크 설명: <a href="https://code.claude.com/docs/ko/sub-agents#fork-the-current-conversation" target="_blank" rel="noopener">Claude Code 공식 문서 '사용자 정의 subagent 만들기' 페이지의 '현재 대화 포크' 항목</a> (한국어)</li>
</ul>
<h4>③ 코디네이터의 역할</h4>
<ul>
<li>작업 분해</li>
<li>위임</li>
<li>결과 취합</li>
<li>호출할 서브에이전트 선택. 질문의 복잡도에 따라 필요한 서브에이전트만 호출</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>허브 앤 스포크(hub-and-spoke)</b>: 자전거 바퀴의 중심축(hub)과 바퀴살(spoke)처럼 중심 하나에 여럿이 연결된 구조</li>
<li><b>위임(delegation)</b>: 작업을 다른 에이전트에 맡기는 일</li>
<li><b>포크(fork)</b>: 지금까지의 대화를 그대로 복사해서 갈라져 나온 작업 공간</li>
</ul>
</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"코디네이터 설계의 실패 유형과 해결",
   html:`__MAP:orch__<h4>① 좁은 작업 분해</h4>
<ul>
<li>증상: 서브에이전트는 맡은 일을 모두 정상 수행. 최종 보고서에는 빠진 영역 존재</li>
<li>원인: 서브에이전트가 아니라 분해를 맡은 코디네이터</li>
<li>확인 순서: 서브에이전트의 수행 결과보다 서브에이전트가 받은 작업 목록 먼저 확인</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 코디네이터의 작업 분해 기록</div>
주제: AI가 창작 산업에 미치는 영향<br>
서브에이전트 1: 디지털 아트<br>
서브에이전트 2: 그래픽 디자인<br>
서브에이전트 3: 사진<br>
<span class="sel">음악, 글, 영화는 어느 서브에이전트에도 배정되지 않음</span>
</div>
<p class="cap">이해를 돕기 위한 예시. 세 서브에이전트가 일을 잘해도 보고서에는 음악, 글, 영화가 빠짐.</p>
<h4>② 매번 전체 실행</h4>
<ul>
<li>증상: 간단한 질문에도 모든 서브에이전트 실행. 시간과 비용 낭비</li>
<li>해결: 질문을 먼저 분석하고 필요한 서브에이전트만 선택</li>
</ul>
<h4>③ 반복 개선(iterative refinement)</h4>
<ul>
<li>1단계: 코디네이터가 모은 결과에서 빠진 영역 확인</li>
<li>2단계: 빠진 영역만 겨냥한 지시로 다시 위임</li>
<li>3단계: 결과를 다시 합치기</li>
<li>내용이 충분해질 때까지 1단계부터 반복. 반복을 멈추는 기준도 함께 지정</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>취합</b>: 여러 서브에이전트의 결과를 하나로 모으는 일</li>
<li><b>커버리지(coverage)</b>: 다뤄야 할 범위 중 실제로 다룬 범위</li>
</ul>
</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: Fast reports, slow answers",
       q:`Your research system produces excellent deep reports, but simple factual queries ("who is the CEO of X?") take 90+ seconds and cost the same as full reports. Logs show the coordinator always invokes all five subagents — search, two analysts, synthesis, report-writer — one after another, for every query. Subagent behavior is correct. What should change?`,
       opts:[
         {t:`Redesign the coordinator to analyze each query's requirements and dynamically select which subagents to invoke — and emit independent Agent tool calls in a single response so the selected agents run in parallel.`, ok:true},
         {t:`Cache completed reports and serve them for sufficiently similar future queries, refreshing the cache on a weekly schedule so answers stay reasonably current.`},
         {t:`Let simple queries bypass the coordinator entirely and go directly to the synthesis agent, which is already good at producing concise, well-written answers.`},
         {t:`Build a second, lighter pipeline of faster subagents dedicated to simple queries, keeping the full pipeline untouched for deep research reports.`},
       ],
       hint:`코디네이터의 네 가지 역할 중 마지막 항목을 확인할 것. 지문의 "one after another"라는 표현도 근거임. 병렬 실행 규칙과 함께 볼 것.`,
       explain:{
         good:`결함이 두 가지임. ① 전체 파이프라인 고정 실행은 쿼리 복잡도 기반 동적 선택으로 고침(1.2). ② 순차 실행은 한 응답에 Agent 도구 호출을 함께 내보내는 병렬 실행으로 고침(1.3). 정답은 두 가지를 함께 고치는 선택지임.`,
         wrongs:[
           `<b>B(리포트 캐시):</b> 충분히 비슷한 질의인지 판단하는 문제가 새로 생기고, 오래된 답을 제공할 위험도 있음. 구조 결함은 그대로 남음.`,
           `<b>C(합성 에이전트로 직행):</b> 합성 에이전트에는 검색 도구가 없으므로 자체 지식으로 답하게 됨. 출처 없는 환각이 발생하는 경로임.`,
           `<b>D(경량 파이프라인 추가):</b> 유지보수할 시스템이 두 배가 됨. 동적 선택 하나로 해결되는 문제에 대한 과잉 설계임.`,
         ]},
       principle:"동적 선택과 병렬 실행: 코디네이터의 역할"},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 2: The loop that wouldn't stop",
       q:`You added an iterative refinement loop. On "quantum networking startups in Africa," the coordinator has now run six refine cycles: targeted re-searches keep returning the same three thin sources, and each re-synthesis barely changes. Cost is ballooning. What is the correct design response?`,
       opts:[
         {t:`Give the loop coverage-sufficiency and stopping criteria: when targeted re-search stops yielding new sources, accept the synthesis and ship it with coverage annotations marking the thin areas.`, ok:true},
         {t:`Let the loop continue — the whole point of iterative refinement is to run until coverage is complete.`},
         {t:`After a fixed three cycles, have the synthesis agent fill any remaining gaps from its general knowledge.`},
         {t:`Diagnose it as a search-agent failure and swap in a different search provider.`},
       ],
       hint:`존재하는 소스가 세 개뿐이라면 일곱 번째 사이클에서 새로 찾을 수 있는 것이 무엇인지 확인할 것. 자료가 부족한 영역을 그대로 표시하는 방법은 5.3에 있음.`,
       explain:{
         good:`개선 루프에도 종료 기준이 필요함. 1.1에서 다룬 루프 통제 원칙을 그대로 적용하는 문제임. 새 소스가 더 나오지 않으면 현재 합성 결과를 수용하고, 커버리지 주석(5.3)으로 자료가 부족한 영역을 명시하는 것이 정답임.`,
         wrongs:[
           `<b>B(무한 개선):</b> 소스 자체가 없으면 완전한 커버리지에 도달할 수 없음. 종료 조건 없는 루프를 다시 만드는 것임.`,
           `<b>C(일반 지식으로 보완):</b> 리서치의 공백을 환각으로 채우는 방식임. 출처 없는 주장이 리포트에 섞임.`,
           `<b>D(검색 공급자 교체):</b> 검색은 정상 동작했음. 존재하는 소스가 적은 것은 도구의 문제가 아님.`,
         ]},
       principle:"루프에는 종료 기준, 공백에는 주석"},
    ]},

  /* ================= CH 4 · 1.3 ================= */
  { id:"p1c4", ch:"CH 4", title:"컨텍스트 전달과 병렬 실행 (1.3)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"서브에이전트 생성과 지시",
       html:`<h4>① Agent 도구</h4>
        <ul>
          <li>서브에이전트를 만드는 도구</li>
          <li>코디네이터가 Agent 도구를 호출하면 서브에이전트 하나가 생성되어 맡은 일을 수행</li>
          <li>사용 조건: 코디네이터의 허용 도구 목록(<code>allowedTools</code>)에 <code>"Agent"</code> 포함</li>
          <li>목록에 없으면 서브에이전트 생성 불가</li>
        </ul>
        <div class="fig"><b>서브에이전트 생성 흐름</b><br>
코디네이터&nbsp;&nbsp;──&nbsp;Agent 도구 호출&nbsp;──▶&nbsp;&nbsp;서브에이전트&nbsp;&nbsp;<span class="an">← 프롬프트에 적힌 내용만 전달</span><br>
코디네이터&nbsp;&nbsp;◀──&nbsp;&nbsp;결과 반환&nbsp;&nbsp;──&nbsp;&nbsp;&nbsp;서브에이전트&nbsp;&nbsp;<span class="an">← 작업 결과만 반환</span>
        </div>
        <h4>② 서브에이전트 정의(AgentDefinition)</h4>
        <ul>
          <li>서브에이전트마다 미리 적어 두는 설정 묶음</li>
        </ul>
        <table>
          <tr><th>항목</th><th>내용</th></tr>
          <tr><td><code>description</code></td><td>이 서브에이전트에게 맡길 일의 종류</td></tr>
          <tr><td><code>prompt</code></td><td>서브에이전트의 역할과 일하는 방식</td></tr>
          <tr><td><code>tools</code></td><td>서브에이전트가 쓸 수 있는 도구 목록</td></tr>
        </table>
        <h4>③ 서브에이전트가 아는 범위</h4>
        <ul>
          <li>서브에이전트는 아무 정보 없이 시작</li>
          <li>아는 내용은 코디네이터가 프롬프트에 적어 준 내용뿐</li>
          <li>코디네이터의 이전 대화는 전달 안 됨</li>
          <li>서브에이전트끼리 공유하는 기억 없음</li>
          <li>예외: 포크(fork) 방식으로 만든 서브에이전트는 코디네이터의 대화를 이어받음</li>
        </ul>
        <div class="callout">📖 <b>용어 카드</b>
          <ul>
            <li><b>에이전트(agent)</b>: 목표를 받으면 필요한 작업을 스스로 골라 수행하는 AI</li>
            <li><b>코디네이터(coordinator)</b>: 일을 나누어 서브에이전트에게 맡기는 에이전트</li>
            <li><b>서브에이전트(subagent)</b>: 코디네이터가 맡긴 일 하나를 수행하는 보조 에이전트</li>
            <li><b>프롬프트(prompt)</b>: AI에게 전달하는 지시문</li>
            <li><b>도구(tool)</b>: 에이전트가 검색이나 파일 읽기 같은 작업을 할 때 쓰는 기능</li>
            <li><b>허용 도구 목록(allowedTools)</b>: 에이전트가 쓸 수 있는 도구를 적어 둔 목록</li>
          </ul>
        </div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"자료 전달과 병렬 실행",
       html:`__MAP:pass__<h4>① 자료 전달: 전체를 프롬프트에 포함</h4>
        <ul>
          <li>앞 단계에서 찾은 자료는 요약하지 않고 전체를 프롬프트에 포함</li>
          <li>프롬프트에 없는 내용은 서브에이전트가 알 수 없음</li>
        </ul>
        <div class="fig"><b>프롬프트 비교</b><br>
✗ 부족한 프롬프트<br>
&nbsp;&nbsp;앞에서 찾은 자료로 보고서를 써 줘&nbsp;&nbsp;<span class="an">← 자료가 없음</span><br>
✓ 충분한 프롬프트<br>
&nbsp;&nbsp;목표: 전기차 배터리 시장 요약 보고서 작성<br>
&nbsp;&nbsp;자료 1: (기사 전문)&nbsp;&nbsp;출처: 기사 주소, 발행일&nbsp;&nbsp;<span class="an">← 내용과 출처를 함께 전달</span><br>
&nbsp;&nbsp;자료 2: (보고서 전문)&nbsp;&nbsp;출처: 문서 이름, 쪽수<br>
&nbsp;&nbsp;결과 형식: 항목별 요약과 출처 표기
        </div>
        <h4>② 내용과 출처 분리</h4>
        <ul>
          <li>자료마다 내용과 출처(주소, 문서 이름, 쪽수)를 구분해서 전달</li>
          <li>목적: 최종 보고서의 출처 표기 유지</li>
        </ul>
        <h4>③ 병렬 실행</h4>
        <ul>
          <li>서로 영향을 주지 않는 작업은 한 응답에서 Agent 도구를 여러 번 호출</li>
          <li>한 번에 하나씩 호출하면 앞 작업이 끝나야 다음 작업 시작</li>
        </ul>
        <div class="fig"><b>검색 작업 세 개의 소요 시간 (작업당 30초 가정)</b><br>
순차 실행&nbsp;&nbsp;[ 검색 A ]→[ 검색 B ]→[ 검색 C ]&nbsp;&nbsp;<span class="an">← 합계 90초</span><br>
병렬 실행&nbsp;&nbsp;[ 검색 A ]<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ 검색 B ]&nbsp;&nbsp;<span class="an">← 합계 30초</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ 검색 C ]
        </div>
        <h4>④ 프롬프트 작성 기준</h4>
        <ul>
          <li>절차를 하나하나 지시하는 대신 목표와 품질 기준 제시</li>
          <li>효과: 서브에이전트가 상황에 맞게 판단</li>
        </ul>
        <h4>⑤ 자주 생기는 문제</h4>
        <ul>
          <li>증상: 최종 결과에 앞 단계에서 찾은 내용이 빠짐</li>
          <li>원인: 찾은 내용을 프롬프트에 넣지 않음</li>
        </ul>
        <div class="callout">📖 <b>용어 카드</b>
          <ul>
            <li><b>병렬 실행</b>: 여러 작업을 동시에 진행하는 방식</li>
            <li><b>순차 실행</b>: 한 작업이 끝난 뒤 다음 작업을 진행하는 방식</li>
            <li><b>출처 표기(attribution)</b>: 내용이 어디서 나왔는지 밝히는 표시</li>
          </ul>
        </div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: The delegating coordinator that doesn't",
       q:`Your coordinator is configured with allowedTools: ["WebSearch", "Read"] and a detailed system prompt explaining exactly how to delegate to its three subagents. In production it never spawns a single subagent — it just answers everything itself using web search. What is wrong?`,
       opts:[
         {t:`"Agent" is missing from the coordinator's allowedTools — without the Agent tool it has no mechanism to spawn subagents, no matter how well the prompt describes delegation.`, ok:true},
         {t:`The system prompt's delegation language is too weak; it should state "you MUST use your subagents for every request."`},
         {t:`The subagents' AgentDefinitions are likely missing descriptions, making them invisible to the coordinator.`},
         {t:`WebSearch should be removed from allowedTools so the coordinator has no choice but to delegate.`},
       ],
       hint:`위임 지시는 완전한데 위임 수단이 있는지 확인할 것. allowedTools 목록을 항목별로 점검할 것.`,
       explain:{
         good:`서브에이전트를 생성하는 유일한 수단은 Agent 도구임. 코디네이터의 allowedTools에 "Agent"가 있어야 호출할 수 있음(1.3). 프롬프트가 아무리 정교해도 존재하지 않는 수단을 만들어 내지는 못함. 설정 진단 유형의 대표 문제임.`,
         wrongs:[
           `<b>B(지시 강화):</b> MUST를 반복해서 써도 Agent 도구가 없으면 호출 자체가 불가능함.`,
           `<b>C(정의 누락 추정):</b> 정의가 완전해도 Agent 도구가 없으면 호출할 수 없음. 지문에 근거가 없는 추측이기도 함.`,
           `<b>D(WebSearch 제거):</b> 위임 수단이 생기는 것이 아니라 코디네이터가 할 수 있는 일만 줄어듦.`,
         ]},
       principle:"수단 먼저, 지시는 그다음"},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 2: Five subtasks, two shapes",
       q:`A research run has five subtasks: three independent topic searches, plus (4) a comparison that requires all three search results, and (5) an executive summary that requires the comparison. How should the coordinator schedule its Agent tool calls?`,
       opts:[
         {t:`Emit the three search Agent tool calls together in a single response so they run in parallel; then invoke the comparison in a follow-up turn with the three results injected into its prompt, then the summary with the comparison's output.`, ok:true},
         {t:`Emit all five Agent tool calls in one response — maximum parallelism minimizes total latency.`},
         {t:`Run all five sequentially — mixing parallel and sequential execution complicates error handling too much.`},
         {t:`Run the searches in parallel, then let the comparison agent read the search results from the shared session memory.`},
       ],
       hint:`병렬 실행은 하위 작업이 독립일 때만 타당함. (4)와 (5)가 첫 응답에 들어갈 수 없는 이유를 확인할 것. 앞 단계 결과를 전달하는 방법도 함께 확인할 것.`,
       explain:{
         good:`독립 작업 세 개는 한 응답에서 병렬로 실행함(1.3). 의존 작업 두 개는 후속 턴에서 앞 단계 결과를 프롬프트에 명시적으로 주입함. 병렬 실행의 조건(독립성)과 전달 원칙(명시 전달)을 함께 묻는 문제임.`,
         wrongs:[
           `<b>B(다섯 개 전부 병렬):</b> (4)와 (5)는 입력이 아직 존재하지 않음. 입력 없이 실행되어 의미 없는 출력이 나옴.`,
           `<b>C(전부 순차):</b> 독립인 세 작업까지 직렬로 실행함. 지연이 세 배로 늘어나는 과잉 단순화임.`,
           `<b>D(공유 메모리 사용):</b> 세션 간 공유 메모리는 존재하지 않음. 프롬프트로 명시해 전달하는 것이 유일한 경로임.`,
         ]},
       principle:"독립은 병렬, 의존은 주입"},
    ]},

  /* ================= CH 5 · 1.4 ================= */
  { id:"p1c5", ch:"CH 5", title:"강제 패턴과 핸드오프 (1.4)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"프로그램 강제와 프롬프트 지시",
   html:`<h4>① 규칙을 지키게 하는 두 가지 방법</h4>
<table>
<tr><th>방법</th><th>방식</th><th>지켜지는 정도</th></tr>
<tr><td>프로그램 강제</td><td>조건을 충족하지 않은 실행을 프로그램이 차단</td><td>항상 지켜짐. 결정론적</td></tr>
<tr><td>프롬프트 지시</td><td>지시문에 순서와 규칙 작성</td><td>대부분 지켜지지만 어기는 경우가 남음. 확률적</td></tr>
</table>
<h4>② 선택 기준</h4>
<ul>
<li>어기면 돈, 법, 안전 문제로 이어지는 규칙: 프로그램 강제</li>
<li>문체, 말투, 품질 기준: 프롬프트 지시</li>
</ul>
<h4>③ 전제조건 게이트</h4>
<ul>
<li>앞 단계가 끝나기 전에는 뒤 단계를 실행할 수 없게 막는 장치. 영어 이름은 prerequisite gate</li>
<li>예: 본인 확인(<code>get_customer</code>)이 끝나기 전에는 환불(<code>process_refund</code>) 호출 차단</li>
</ul>
<div class="fig"><b>본인 확인 전에 들어온 환불 요청</b><br>
프롬프트 지시만 있는 경우: 대부분 본인 확인 후 처리&nbsp;&nbsp;<span class="an">← 일부는 확인 없이 환불</span><br>
게이트가 있는 경우: 본인 확인 여부 검사 후 미확인이면 차단&nbsp;&nbsp;<span class="an">← 예외 없음</span>
</div>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>결정론적(deterministic)</b>: 같은 조건에서 항상 같은 결과가 나오는 성질</li>
<li><b>확률적(probabilistic)</b>: 대체로 같지만 가끔 다른 결과가 나오는 성질</li>
<li><b>get_customer, process_refund</b>: 예시에 쓴 도구 이름. 고객 확인 도구와 환불 처리 도구</li>
</ul>
</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"게이트 설계와 상담사 인계",
   html:`__MAP:gate__<h4>① 게이트가 필요한 신호</h4>
<ul>
<li>신호: "12%의 경우 본인 확인을 건너뜀" 같은 실패 비율 기록</li>
<li>해결: <code>get_customer</code>가 확인된 고객 번호를 돌려주기 전까지 <code>lookup_order</code>와 <code>process_refund</code> 호출 차단</li>
<li>효과가 부족한 방법: 시스템 프롬프트 강화와 예시 추가. 어길 확률을 낮출 뿐 0으로 만들지 못함</li>
</ul>
<h4>② 요청 하나에 문제가 여러 개인 경우</h4>
<ul>
<li>예: 메시지 하나에 환불, 배송, 계정 문의가 함께 들어온 경우</li>
<li>1단계: 문제별로 나누기</li>
<li>2단계: 같은 고객 정보를 공유하며 동시에 조사</li>
<li>3단계: 답변 하나로 합치기</li>
</ul>
<h4>③ 상담사 인계</h4>
<ul>
<li>전제: 상담사는 에이전트의 대화 기록을 볼 수 없음</li>
<li>정리해서 넘길 네 가지: 고객 번호, 문제 원인, 환불 금액, 권고 조치</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 상담사에게 넘기는 요약</div>
고객 번호: C-20931<br>
문제 원인: 배송 9일 지연. 포장 파손<br>
환불 금액: 62,000원<br>
권고 조치: 전액 환불 승인
</div>
<p class="cap">이해를 돕기 위한 예시. 상담사가 대화 기록 없이 이 요약만 보고 처리할 수 있는 분량.</p>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>에스컬레이션(escalation)</b>: 에이전트가 직접 처리하지 않고 사람에게 넘기는 일</li>
<li><b>핸드오프(handoff)</b>: 넘길 때 필요한 정보를 함께 전달하는 일</li>
<li><b>시스템 프롬프트(system prompt)</b>: 대화 전체에 적용되는 기본 지시문</li>
<li><b>lookup_order</b>: 예시에 쓴 도구 이름. 주문 조회 도구</li>
</ul>
</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: Four policies, one matrix",
       q:`Your support agent has four policies to uphold: (1) identity must be verified before any account operation; (2) refunds over $500 must never auto-execute; (3) replies should address the customer by name; (4) responses should stay under 150 words. Which enforcement allocation is correct?`,
       opts:[
         {t:`(1) and (2) as programmatic controls — a prerequisite gate and a tool-call interception hook — because violations carry financial and security consequences; (3) and (4) as prompt guidance, since occasional misses are acceptable.`, ok:true},
         {t:`All four in the system prompt, with "CRITICAL:" prefixes on (1) and (2) — models follow strongly emphasized instructions far more reliably than plain ones.`},
         {t:`All four as programmatic hooks — consistency matters everywhere, hooks are the most reliable mechanism available, and uniform enforcement removes guesswork.`},
         {t:`(3) and (4) as hooks since they're easy to check programmatically; (1) and (2) in the prompt with few-shot examples, since judgment calls need language understanding.`},
       ],
       hint:`위반 시 사고로 이어지는 규칙과 가끔 어겨도 되는 규칙을 구분할 것. D는 그럴듯한 논리로 두 규칙을 반대로 배치한 선택지임.`,
       explain:{
         good:`1.4의 배치 원칙은 결정론적 보장이 필요한 규칙(금전, 보안)만 프로그램으로 강제하고, 문체와 성향은 프롬프트로 다루는 것임. 전부 훅으로 처리하는 선택지와 전부 프롬프트로 처리하는 선택지는 모두 오답임. 보장이 필요한 규칙과 그렇지 않은 규칙을 구분하는 것이 이 문제의 판단 기준임.`,
         wrongs:[
           `<b>B(CRITICAL 표기 추가):</b> 강조 표기는 준수 확률을 조금 높일 뿐임. (1)과 (2)의 실패율이 0이 되지 않음.`,
           `<b>C(전부 훅으로 처리):</b> 150단어를 넘는 응답을 차단하는 훅은 정상 대화까지 막는 과잉 통제임.`,
           `<b>D(반대로 배치):</b> 검사하기 쉬운 규칙을 강제하고 위험한 규칙을 확률에 맡김. 논리가 그럴듯해서 가장 자주 틀리는 선택지임.`,
         ]},
       principle:"보장이 필요한 규칙에만 강제를 적용"},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 2: The gate that worked too well",
       q:`Your prerequisite gate works — but too literally: it demands a fresh get_customer verification immediately before every gated call, so a conversation with three account operations verifies the same customer three times. Complaints are up, and an engineer proposes reverting to prompt-based ordering "since the gate clearly doesn't fit real conversations." What is the right move?`,
       opts:[
         {t:`Keep programmatic enforcement but fix the gate's logic: track verified-customer state for the session, and block gated tools only until the first successful verification.`, ok:true},
         {t:`Accept the proposal — the experiment showed programmatic enforcement is too rigid for conversational flows.`},
         {t:`Keep the gate exactly as is and add an apology template for the repeated verification steps.`},
         {t:`Run identity verification asynchronously in the background while account operations proceed in parallel.`},
       ],
       hint:`게이트 자체가 잘못된 것이 아니라 게이트의 조건이 부정확한 것임. 게이트도 코드이므로 설계를 수정할 수 있음. 강제와 사용 편의는 양자택일이 아님.`,
       explain:{
         good:`프로그램적 강제는 적용 여부만 고르는 것이 아니라 설계 대상임. 세션 상태를 기준으로 첫 검증이 성공할 때까지만 차단하도록 게이트를 바꾸면 보장과 사용성을 함께 확보함. 불편하니 프롬프트 방식으로 되돌리자는 서술이 이 문제에서 자주 틀리는 지점임.`,
         wrongs:[
           `<b>B(프롬프트 방식으로 회귀):</b> 실패율이 있는 방식으로 되돌아감. 사용 불편의 해법이 보장 포기일 수는 없음.`,
           `<b>C(사과 문구 추가):</b> 원인인 부정확한 게이트 조건은 그대로 두고 증상만 가림.`,
           `<b>D(비동기 검증):</b> 검증이 끝나기 전에 작업이 실행됨. 게이트를 두는 이유 자체가 사라짐.`,
         ]},
       principle:"강제는 유지, 설계를 개선"},
    ]},

  /* ================= CH 6 · 1.5 ================= */
  { id:"p1c6", ch:"CH 6", title:"Agent SDK 훅 (1.5)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"훅: 정해진 실행 지점에서 자동으로 실행되는 코드",
   html:`<h4>① 훅(hook)</h4>
<ul>
<li>에이전트가 일하는 흐름의 정해진 지점에서 자동으로 실행되는 코드</li>
<li>에이전트의 판단과 무관하게 항상 실행</li>
<li>CH 5의 프로그램 강제를 구현하는 수단</li>
</ul>
<h4>② 자주 쓰는 훅 이벤트</h4>
<table>
<tr><th>이벤트</th><th>실행 시점</th></tr>
<tr><td><code>PreToolUse</code></td><td>도구 실행 전</td></tr>
<tr><td><code>PostToolUse</code></td><td>도구 실행 후</td></tr>
<tr><td><code>UserPromptSubmit</code></td><td>사용자가 요청을 보낸 직후</td></tr>
<tr><td><code>Stop</code></td><td>Claude가 답을 마칠 때</td></tr>
<tr><td><code>SessionStart</code></td><td>세션을 시작하거나 다시 열 때</td></tr>
</table>
<ul>
<li>이름 구분: Pre는 실행 전, Post는 실행 후</li>
<li>이벤트 전체 목록: <a href="https://code.claude.com/docs/ko/hooks" target="_blank" rel="noopener">Claude Code 공식 문서 'Hooks 참조' 페이지</a> (한국어). 이벤트는 30개 이상</li>
</ul>
<h4>③ 두 이벤트에서 할 수 있는 일</h4>
<table>
<tr><th>이벤트</th><th>할 수 있는 일</th></tr>
<tr><td><code>PreToolUse</code></td><td>허용. 차단. 사용자 확인 요청. 도구 입력값 수정</td></tr>
<tr><td><code>PostToolUse</code></td><td>도구 결과 교체. Claude에 전달할 내용 추가</td></tr>
</table>
<div class="fig"><b>도구 호출 하나가 지나가는 순서</b><br>
Claude의 도구 호출<br>
&nbsp;→ PreToolUse 훅&nbsp;&nbsp;<span class="an">← 차단 가능</span><br>
&nbsp;→ 도구 실행<br>
&nbsp;→ PostToolUse 훅&nbsp;&nbsp;<span class="an">← 결과 교체 가능</span><br>
&nbsp;→ Claude가 결과 확인
</div>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>이벤트(event)</b>: 훅이 실행되는 시점의 이름</li>
<li><b>Unix 타임스탬프</b>: 1970년 1월 1일부터 흐른 초를 센 숫자. 예: 1785340800</li>
<li><b>ISO 8601</b>: 2026-07-29T09:00:00 형태의 국제 표준 날짜 표기</li>
</ul>
</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"훅 사용 사례: 형식 통일과 차단",
   html:`__MAP:gate__<h4>① PostToolUse: 결과 형식 통일</h4>
<ul>
<li>상황: 도구마다 날짜와 상태를 적는 형식이 다름</li>
<li>문제: 형식이 섞인 자료로 Claude가 판단하면 오류 발생</li>
<li>해결: PostToolUse 훅이 Claude가 결과를 보기 전에 한 가지 형식으로 통일</li>
<li>효과가 부족한 방법: 형식을 바꿔서 읽으라는 프롬프트 지시. 지켜지지 않는 경우가 남음</li>
</ul>
<div class="fig"><b>형식 통일 전후</b><br>
도구 A: 1785340800&nbsp;&nbsp;<span class="an">→ 2026-07-29</span><br>
도구 B: 2026-07-29T09:00:00&nbsp;&nbsp;<span class="an">→ 2026-07-29</span><br>
도구 C: 상태 코드 3&nbsp;&nbsp;<span class="an">→ 배송 중</span>
</div>
<h4>② PreToolUse: 규칙 위반 차단</h4>
<ul>
<li>상황: 500달러가 넘는 환불은 자동 처리 금지</li>
<li>해결: 훅이 <code>process_refund</code> 호출의 금액 검사. 한도를 넘으면 차단하고 상담사 인계 절차로 연결</li>
<li>주의: 차단만으로는 미완성. 차단 뒤에 이어질 절차까지 포함해야 완성</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 훅이 환불 호출을 막은 기록</div>
도구 호출: process_refund (금액 720달러)<br>
PreToolUse 훅: 차단. 사유 "500달러 초과 환불은 상담사 승인 필요"<br>
<span class="sel">다음 단계: 상담사 인계 절차 시작</span>
</div>
<p class="cap">이해를 돕기 위한 예시. 차단 사유가 Claude에 전달되어 다음 행동의 근거로 쓰임.</p>
<h4>③ 훅과 프롬프트 선택 기준</h4>
<ul>
<li>반드시 지켜야 하는 규칙: 훅</li>
<li>말투와 문체: 프롬프트</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>정규화(normalization)</b>: 서로 다른 형식을 한 가지로 맞추는 작업</li>
<li><b>MCP 도구</b>: 외부 서비스와 연결해 쓰는 도구. Part 2에서 다루는 내용</li>
</ul>
</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: 44 fields, three date formats",
       q:`lookup_order returns 44 fields per call (warehouse codes, carrier internals, audit metadata...), of which about 6 matter for refund decisions — and dates arrive in three different formats across backends. Long conversations degrade as these results accumulate, and the agent occasionally miscompares dates. Where is the right place to fix both problems at once?`,
       opts:[
         {t:`A PostToolUse hook that trims each result to the refund-relevant fields and normalizes the date formats — before the model ever processes the result.`, ok:true},
         {t:`A system prompt instruction to focus only on relevant fields and mentally convert all dates to one format.`},
         {t:`A request to the warehouse team to redesign their API response to return fewer, cleaner fields.`},
         {t:`A nightly maintenance job that compresses old conversation history to reclaim context space.`},
       ],
       hint:`트리밍(5.1)과 정규화(1.5)를 동시에 수행할 수 있는 실행 지점은 하나뿐임. 도구 결과가 모델에 전달되기 전 단계임.`,
       explain:{
         good:`PostToolUse는 두 처방을 한곳에서 적용할 수 있는 지점임. 유입 전 트리밍으로 컨텍스트 소모를 막고, 형식 통일로 추론 오류를 막음. 두 처리 모두 결정론적으로 수행됨. 한 문제에 두 챕터(1.5와 5.1)를 엮는 것이 실제 출제 방식임.`,
         wrongs:[
           `<b>B(프롬프트 지시):</b> 확률적인 방식이고, 무시하라고 지시해도 44개 필드의 토큰은 이미 소모됨.`,
           `<b>C(백엔드 재설계 요청):</b> 다른 팀의 일정에 의존하게 됨. 자체 파이프라인에서 즉시 해결할 수 있는 문제임.`,
           `<b>D(사후 압축):</b> 불필요한 데이터가 쌓인 뒤에 정리하는 방식임. 유입 자체를 막지 못하고, 압축 과정에서 필요한 정보까지 손실될 수 있음.`,
         ]},
       principle:"트리밍과 정규화는 모델이 결과를 보기 전에 수행"},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 2: The half-built hook",
       q:`Your interception hook correctly blocks process_refund calls over $500, returning {"isError": true, "message": "blocked by policy"}. Production logs show the agent retrying the identical call three times, then telling customers "I'm unable to process this." Escalations to humans aren't happening at all. What completes the design?`,
       opts:[
         {t:`Have the hook return a structured business error (retriable: false, with an explanation) and redirect the flow to the human escalation workflow — blocking without a redirect is only half the pattern.`, ok:true},
         {t:`Add a system prompt rule: "whenever you see 'blocked by policy', escalate the case to a human agent."`},
         {t:`Raise the block threshold so fewer refunds hit the ceiling and the dead-end occurs less often.`},
         {t:`Rewrite the hook's error message in friendlier language so the agent can relay it verbatim to customers.`},
       ],
       hint:`가이드의 훅 패턴은 차단 이후의 처리까지 포함함. 현재 구현에는 그 부분이 빠져 있음. 재시도가 세 번 발생한 이유는 응답에 어떤 필드가 없기 때문인지도 확인할 것(2.2).`,
       explain:{
         good:`1.5의 완전한 패턴은 차단과 대체 워크플로 연결을 함께 수행하는 것임. 재시도가 반복되는 이유는 응답에 retriable: false가 없기 때문임(2.2). B가 가장 자주 틀리는 선택지임. 동작은 하지만 확률적이고, 결정론적 경로 전환이 이미 훅 패턴에 포함돼 있으므로 프롬프트로 대체할 이유가 없음.`,
         wrongs:[
           `<b>B(에러 문구 감지 프롬프트):</b> 문구가 바뀌면 동작하지 않는 확률적 연결임. 컴플라이언스 경로를 프롬프트에 맡기는 방식임.`,
           `<b>C(임계값 완화):</b> 정책 자체를 바꾸는 것은 해결책이 아님. 한도를 넘는 사례는 여전히 처리되지 못함.`,
           `<b>D(문구 개선):</b> 거절 문구의 표현만 바꿈. 에스컬레이션이 없는 문제는 그대로 남음.`,
         ]},
       principle:"차단과 경로 전환을 함께 구현해야 완전한 훅"},
    ]},

  /* ================= CH 7 · 1.7 ================= */
  { id:"p1c7", ch:"CH 7", title:"세션 상태·재개·포크 (1.7)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"세션 관리 수단 세 가지",
   html:`<h4>① 세션(session)</h4>
<ul>
<li>에이전트가 일하는 동안 쌓이는 대화 기록 한 묶음. 요청, 도구 호출, 도구 결과, 답이 모두 포함</li>
<li>자동으로 저장되어 나중에 다시 열기 가능</li>
<li>저장 대상은 대화. 파일의 변경 내용은 세션에 저장되지 않음</li>
</ul>
<h4>② 세션 관리 수단</h4>
<table>
<tr><th>수단</th><th>동작</th><th>설정 이름</th></tr>
<tr><td>이어가기</td><td>현재 폴더의 가장 최근 세션을 이어서 진행</td><td><code>continue</code></td></tr>
<tr><td>재개</td><td>지정한 세션을 이어서 진행</td><td><code>resume</code></td></tr>
<tr><td>분기</td><td>기존 세션의 기록을 복사한 새 세션 시작. 원래 세션은 그대로 유지</td><td><code>fork_session</code></td></tr>
</table>
<ul>
<li>Claude Code에서 쓰는 명령: <code>claude --continue</code>, <code>claude --resume</code></li>
<li>사용법 전체: <a href="https://code.claude.com/docs/ko/agent-sdk/sessions" target="_blank" rel="noopener">Claude Code 공식 문서 '세션으로 작업하기' 페이지</a> (한국어)</li>
</ul>
<div class="fig"><b>세 수단의 차이</b><br>
이어가기: 가장 최근 세션 ──→ 계속&nbsp;&nbsp;<span class="an">← 세션을 고를 필요 없음</span><br>
재개: 세션 목록에서 하나 선택 ──→ 계속&nbsp;&nbsp;<span class="an">← 세션 ID 필요</span><br>
분기: 기존 세션 ──┬→ 원래 세션 그대로<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└→ 복사본에서 다른 방법 시도
</div>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>CLI</b>: 명령어를 입력해 프로그램을 쓰는 방식. Claude Code가 이 방식</li>
<li><b>플래그(flag)</b>: 명령어 뒤에 붙이는 옵션. 예: --resume</li>
<li><b>세션 ID</b>: 세션마다 붙는 고유 번호</li>
</ul>
</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"이어가기, 새 세션, 분기의 판단 기준",
   html:`__MAP:session__<h4>① 이어가기</h4>
<ul>
<li>조건: 이전 세션의 내용이 대부분 지금도 사실인 경우</li>
<li>파일이 일부 바뀐 경우: 이어가되 바뀐 파일을 알려 주고 그 부분만 다시 분석</li>
<li>알려 주지 않으면 Claude는 바뀐 사실을 알 수 없음</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 이어가면서 바뀐 내용을 알리는 요청</div>
&gt; 어제 분석한 뒤로 auth 폴더의 파일 2개가 바뀌었어.<br>
&nbsp;&nbsp;그 두 파일만 다시 읽고 분석을 이어가 줘.
</div>
<h4>② 새 세션에 요약 전달</h4>
<ul>
<li>조건: 이전 세션의 도구 결과가 지금 상태와 다른 경우. 예: 그 사이 코드나 자료가 크게 변경</li>
<li>이유: 오래된 도구 결과를 이어받으면 사실이 아닌 내용을 근거로 판단</li>
<li>방법: 핵심 결론만 정리한 요약을 새 세션 첫머리에 전달</li>
</ul>
<h4>③ 분기</h4>
<ul>
<li>조건: 같은 분석 결과에서 출발해 서로 다른 방법 두 가지를 비교하는 경우</li>
<li>예: 코드 분석을 마친 뒤 테스트 방법 A안과 B안을 각각 다른 분기에서 진행</li>
<li>장점: 분석을 두 번 하지 않음. 두 분기의 대화 기록이 서로 섞이지 않음</li>
<li>주의: 분기가 나누는 대상은 대화 기록. 파일은 나뉘지 않아 한 분기에서 고친 파일이 다른 분기에도 그대로 반영</li>
</ul>
<div class="fig"><b>판단 순서</b><br>
이전 세션의 내용이 지금도 사실인가?<br>
&nbsp;├─ 대부분 사실&nbsp;&nbsp;<span class="an">→ 이어가기. 바뀐 파일 알려 주기</span><br>
&nbsp;├─ 크게 달라짐&nbsp;&nbsp;<span class="an">→ 새 세션. 요약 전달</span><br>
&nbsp;└─ 같은 출발점에서 두 방법 비교&nbsp;&nbsp;<span class="an">→ 분기</span>
</div>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>오래된 도구 결과</b>: 실행한 뒤 대상이 바뀌어 지금 상태와 달라진 결과. 영어 표현은 stale</li>
<li><b>구조화 요약</b>: 정해진 항목에 맞춰 핵심만 정리한 요약</li>
</ul>
</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: Three situations, three tools",
       q:`Three situations came up this week: (a) overnight, an automated dependency upgrade rewrote imports across the entire repo you analyzed yesterday; (b) since your last session you renamed one class across 5 files; (c) on top of a completed analysis, you want to evaluate two competing caching strategies side by side. Which mechanism matches each situation?`,
       opts:[
         {t:`(a) new session with a structured summary of prior conclusions; (b) --resume, informing the agent of the specific rename for targeted re-analysis; (c) fork_session into two branches from the shared baseline.`, ok:true},
         {t:`(a) --resume with a note to "be careful about changes"; (b) new session with a summary; (c) explore both strategies sequentially in the old session.`},
         {t:`(a) fork_session to preserve the original analysis; (b) --resume without mentioning the rename; (c) two brand-new sessions, one per strategy.`},
         {t:`New sessions with structured summaries for all three — any file change invalidates a session's tool results.`},
       ],
       hint:`판단 기준은 두 가지임. 변경의 범위(광범위한가 특정적인가)와 작업의 목적(이어가기인가 비교인가)임. 세 상황이 세 수단에 하나씩 대응함.`,
       explain:{
         good:`stale 여부는 변경 범위로 판단함. (a)는 광범위한 변경이므로 새 세션에 구조화 요약을 주입함. (b)는 특정 변경이므로 재개한 뒤 변경 사실을 알리고 해당 부분만 재분석함. (c)는 비교 탐색이므로 fork를 씀. 세 수단을 한 문제에서 구분해 쓰게 하는 것이 실전 난이도임.`,
         wrongs:[
           `<b>B((a)에 주의 문구만 붙인 재개):</b> 무엇이 낡았는지 특정하지 못하는 임시 조치임. 게다가 (b)에서는 유효한 분석을 버리게 됨. 두 배치가 모두 반대임.`,
           `<b>C((a)에 fork):</b> 분기도 stale한 분석을 그대로 물려받음. fork는 이 문제의 해법이 아님. (b)에서 변경을 알리지 않고 재개하면 낡은 이름을 전제로 추론할 위험이 있음.`,
           `<b>D(전부 새 세션):</b> 변경이 있다고 해서 항상 stale인 것은 아님. (b)에서 대규모 분석을 불필요하게 폐기하게 됨.`,
         ]},
       principle:"변경 범위로 stale을 판단하고 목적으로 수단을 선택"},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 2: 'It will notice on its own'",
       q:`Before resuming yesterday's analysis session, you mention the team refactored two modules overnight. A teammate waves it off: "No need to tell the session — Claude re-reads files when it needs them, so it'll notice the changes on its own." What is the flaw in this reasoning?`,
       opts:[
         {t:`The session's history still contains conclusions and analysis built on the old code; the agent frequently reasons from those recorded conclusions without re-reading the underlying files — explicit notification is what triggers targeted re-analysis.`, ok:true},
         {t:`There is no flaw — file reads always return current content, so resumed sessions are self-correcting.`},
         {t:`The flaw is that resumed sessions cannot re-read files at all; only fresh sessions get file access.`},
         {t:`The flaw is that Claude Code locks previously analyzed files, so overnight changes couldn't have landed anyway.`}],
       hint:`파일을 다시 읽으면 최신 내용을 얻는 것은 맞음. 그러나 세션이 항상 다시 읽는지 확인할 것. 히스토리에 이미 결론이 기록돼 있는 경우를 함께 생각할 것.`,
       explain:{
         good:`동료의 설명은 일반적으로는 맞지만 이 상황에서는 위험함. 파일 내용은 다시 읽으면 최신이지만, 세션은 히스토리에 기록된 이전 결론을 근거로 파일을 다시 읽지 않고 추론하는 경우가 많음. 그래서 1.7은 변경 사실을 알려 해당 부분만 다시 분석하게 하라고 명시함.`,
         wrongs:[
           `<b>B(세션이 스스로 교정한다는 설명):</b> 읽은 내용은 최신이어도 다시 읽을지 결정하는 판단 자체가 낡은 결론에 좌우됨.`,
           `<b>C(재개 세션은 파일을 읽지 못한다):</b> 존재하지 않는 제약임. 재개한 세션도 파일을 읽을 수 있음.`,
           `<b>D(파일 잠금):</b> 역시 존재하지 않는 동작임. 실재하지 않는 기능을 제시한 선택지임.`,
         ]},
       principle:"기록된 결론이 재분석을 막으므로 변경 사실을 알려야 함"},
    ]},
  ]
};
