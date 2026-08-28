/* PART 1: 에이전트 아키텍처 & 오케스트레이션 (D1, 27%) */
window.CCAF_CONTENT.p1 = {
  id: "p1",
  lessons: [

  /* ================= CH 1 · 1.1 ================= */
  { id:"p1c1", ch:"CH 1", title:"에이전트 루프의 생명주기 (1.1)",
    steps:[
      {type:"concept", kind:"PART BRIEFING · 파트 설명", h:"PART 01. 스스로 판단하고 실행하는 구조",
       html:`<p class="lead">이 파트가 다루는 영역은 <strong>Agentic Architecture & Orchestration</strong>(에이전트 아키텍처와 오케스트레이션)임.</p>
        <h4>파트 프로필</h4>
        <ul>
          <li>출제 비중: <strong>27%, 약 16문항</strong>(5개 도메인 중 최대)</li>
          <li>출제 비중이 가장 크므로 학습 우선순위가 가장 높은 파트임. 이 영역에서 실점하면 다른 파트로 만회하기 어려움</li>
          <li>구성: 챕터 7개와 미니테스트, 약 2시간 분량(세션 S2~S5)</li>
        </ul>
        <h4>다루는 범위</h4>
        <ul>
          <li><strong>에이전트 루프(agent loop)</strong>: 작업이 끝날 때까지 반복되는 실행 주기 (Ch1)</li>
          <li><strong>작업 분해 전략</strong>: 큰 작업을 하위 작업으로 나누는 방식 (Ch2)</li>
          <li><strong>멀티에이전트</strong>: 코디네이터(coordinator)와 서브에이전트(subagent)의 역할 분담, 컨텍스트 전달 (Ch3~4)</li>
          <li><strong>강제 패턴과 훅(hook)</strong>: 규칙 위반을 코드로 차단하는 방법 (Ch5~6)</li>
          <li><strong>세션 관리</strong>: 이전 작업을 이어받는 방법(<code>--resume</code>, fork) (Ch7)</li>
        </ul>
        <div class="callout">🎯 이 파트의 공통 질문: <b>"권장 설계는 무엇이고, 겉보기에 그럴듯한 안티패턴은 무엇인가."</b> 프로그램으로 강제할 규칙과 프롬프트로 지시할 규칙을 구분하는 판단이 반복 출제됨.</div>`},
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"기본 용어: 대화 히스토리와 stop_reason",
       html:`<p class="lead">이 레슨에 필요한 용어는 두 개임. 그에 앞서 코스 전체에서 쓰는 기본 용어를 먼저 정리함.</p>
        <div class="callout">📖 용어 카드. <b>토큰(token)</b>: 모델이 글을 세는 단위(대략 단어 조각 하나). 분량과 비용, 속도가 모두 토큰 수로 계산됨. <b>컨텍스트 창(context window)</b>: 모델이 한 번에 보고 있는 내용 전체(현재 대화와 전달받은 자료). 창 크기는 한 번에 담을 수 있는 토큰 한도임. 두 용어는 이후 모든 파트에서 설명 없이 등장하므로 여기서 정리해 둘 것.</div>
        <h4>① 대화 히스토리</h4>
        <ul>
          <li>Claude API에서 대화 히스토리(conversation history)는 역할(user/assistant)이 붙은 <strong>메시지 목록</strong>임</li>
          <li>Claude는 매번 <strong>이 목록 전체를 다시 읽고</strong> 다음 응답을 생성함</li>
          <li>즉 기억이 아니라 <strong>기록을 읽는 방식</strong>임. 기록에 없는 내용은 알지 못함</li>
        </ul>
        <h4>② stop_reason</h4>
        <ul>
          <li>Claude 응답마다 붙는 <strong>응답을 중단한 이유를 나타내는 라벨</strong>임</li>
          <li><code>"tool_use"</code>: 도구 실행이 필요해서 중단했다는 뜻. 작업이 아직 끝나지 않은 상태임</li>
          <li><code>"end_turn"</code>: 할 응답을 모두 마쳤다는 뜻. 작업이 끝난 상태임</li>
          <li>보조 값 두 개도 알아 둘 것. <code>"max_tokens"</code>: 출력 길이 한도에 도달함(오류 처리, 한도를 늘려 재시도, 부분 결과 수용 중에서 선택). <code>"stop_sequence"</code>: 미리 지정한 중단 문자열을 감지함</li>
          <li>단, <strong>루프 종료의 공식 신호는 end_turn 하나</strong>임. 나머지 두 값은 각각 별도의 처리 분기를 갖는 상태값임</li>
        </ul>
        <div class="callout">📖 용어 카드. <b>API</b>: 프로그램끼리 요청과 응답을 주고받는 통로. "요청을 보낸다"는 것은 대화 기록 전체와 사용 가능한 도구 목록을 Claude에게 전송한다는 뜻임.</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"에이전트 루프가 반복되는 순서",
       html:`__MAP:loop__<p class="lead">위의 두 요소를 합친 것이 <strong>에이전트 루프</strong>임. 에이전트는 한 번 응답하고 끝나는 것이 아니라, 작업이 끝날 때까지 같은 단계를 반복함.</p>
        <div class="loopdia">
          <span class="nd">① 요청 보내기<small>대화 기록 전체</small></span><span class="ar">→</span>
          <span class="nd hot">② stop_reason 확인<small>tool_use? end_turn?</small></span><span class="ar">→</span>
          <span class="nd">③ 도구 실행<small>Claude가 요청한 도구</small></span><span class="ar">→</span>
          <span class="nd">④ 결과를 대화에 추가<small>다시 ①로</small></span>
        </div>
        <p>위 그림은 순서도임. 화살표는 실행 순서를 뜻하며, ④가 끝나면 다시 ①로 돌아가 ②에서 <code>"end_turn"</code>이 나올 때까지 같은 순서를 반복함.</p>
        <h4>핵심 규칙 두 가지</h4>
        <ul>
          <li>종료 판단의 공식 기준은 <strong>stop_reason 하나</strong>임. <code>"end_turn"</code>이면 멈추고, <code>"tool_use"</code>면 도구를 실행한 뒤 계속함(공식 문서의 루프도 "while stop_reason == tool_use" 형태임)</li>
          <li><strong>④ 결과 추가까지가 한 주기</strong>임. Claude의 요청은 <code>tool_use</code> 블록(도구 이름과 입력)으로 오고, 도구 결과(tool result)는 <code>tool_result</code> 블록에 담아 user 메시지로 돌려보냄. 이 블록이 없으면 Claude는 결과를 보지 못함</li>
        </ul>
        <h4>다음 행동을 정하는 주체: 모델 주도와 사전 결정 트리</h4>
        <ul>
          <li><strong>모델 주도(model-driven)</strong>: 다음에 호출할 도구를 <strong>Claude가 문맥을 보고 매번 판단함</strong>. 에이전트 루프의 핵심 성질임</li>
          <li><strong>사전 결정 트리(pre-configured decision tree)</strong>: 도구와 순서를 <strong>코드가 미리 고정함</strong>. 동작이 예측 가능하지만 계획에 없던 상황에는 대응하지 못함</li>
          <li>구분 기준: 이번 주기에 무엇을 할지 <strong>누가</strong> 정하는가. 모델이 정하면 에이전트, 코드가 정하면 고정 워크플로임(1.6의 프롬프트 체이닝 계열)</li>
          <li>결정성이 반드시 필요한 지점(정책, 검증)에서는 모델 주도를 버리는 것이 아니라 <strong>훅과 게이트로 보완함</strong>(1.4, 1.5)</li>
        </ul>
        <h4>안티패턴 세 가지(오답 선택지로 자주 출제됨)</h4>
        <ul>
          <li>반복 횟수 상한을 <strong>주 종료 조건</strong>으로 사용함. 상한은 보조 안전장치일 때만 타당함</li>
          <li>응답에 <strong>텍스트가 있는지</strong>로 완료를 판단함. 도구 요청과 텍스트는 한 응답에 함께 나올 수 있음</li>
          <li>"완료했습니다" 같은 <strong>자연어 표현을 파싱해</strong> 판단함. 표현이 바뀌면 동작하지 않음</li>
        </ul>
        <div class="callout">🎯 시험 포인트: 보조 안전장치를 주 종료 조건으로 바꿔 놓은 선택지가 자주 틀리는 지점임.</div>`},
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
       html:`<p class="lead">큰 작업을 에이전트에게 맡길 때 작업을 나누는 방식은 크게 두 가지임.</p>
        <h4>① 프롬프트 체이닝(prompt chaining): 고정 순차 파이프라인</h4>
        <ul>
          <li>순서가 <strong>미리 정해진</strong> 단계를 차례로 실행함</li>
          <li>예: 각 파일을 하나씩 분석한 뒤, 마지막에 파일 간 통합 검토를 수행함</li>
          <li>어떤 단계가 필요한지 <strong>미리 예측할 수 있는 작업</strong>에 적합함</li>
        </ul>
        <h4>② 동적 분해(dynamic decomposition)</h4>
        <ul>
          <li>중간에 <strong>발견한 내용에 따라</strong> 다음에 할 일이 바뀜</li>
          <li>예: 조사 중에 의존성(A를 고치려면 B도 함께 수정해야 하는 연결 관계)을 발견하면 계획에 새 하위 작업을 추가함</li>
          <li>무엇이 나올지 미리 알 수 없는 <strong>열린 조사 과제</strong>에 적합함</li>
        </ul>
        <div class="callout">📖 용어 카드. <b>파이프라인(pipeline)</b>: 한 단계의 결과물이 다음 단계의 입력이 되도록 정해진 순서로 이어 놓은 처리 구조.</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"작업 유형별 분해 방식 선택",
       html:`__MAP:decomp__<p class="lead">시험은 특정 작업에 어느 방식이 맞는지를 묻는다. 판별 기준과 대표 사례 두 가지를 정리함.</p>
        <h4>판별 기준</h4>
        <ul>
          <li>단계를 미리 예측할 수 있고 매번 같은 관점을 적용함: <strong>프롬프트 체이닝</strong></li>
          <li>중간 발견이 다음 단계를 결정함: <strong>동적 분해</strong></li>
        </ul>
        <h4>사례 1: 대형 코드 리뷰(프롬프트 체이닝의 대표 사례)</h4>
        <ul>
          <li>파일 14개를 한 번에 리뷰하면 <strong>주의력 희석</strong>이 생김. 일부 파일은 얕게 검토되고, 같은 패턴에 서로 모순된 피드백이 나옴</li>
          <li>권장 설계: <strong>파일별 개별 분석 패스</strong>와 별도의 <strong>파일 간 통합 패스</strong>를 나눠 실행함</li>
          <li>더 큰 모델이나 더 큰 컨텍스트로 해결한다는 선택지는 오답임. 주의력 희석 문제가 그대로 남음</li>
        </ul>
        <h4>사례 2: 레거시 코드(legacy code, 문서와 담당자가 남아 있지 않은 오래된 기존 코드)에 테스트를 전면 추가하는 작업(동적 분해의 대표 사례)</h4>
        <ul>
          <li>① 구조 파악(매핑) → ② 고영향 영역 식별 → ③ 우선순위 계획 수립</li>
          <li>계획은 고정하지 않고 <strong>의존성이 발견될 때마다 조정함</strong></li>
        </ul>
        <div class="callout">🎯 시험 포인트: 알파벳 순서로 파일마다 테스트를 생성하는 기계적 순회, 한 번에 전부 처리하는 방식이 오답 선택지로 출제됨.</div>`},
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
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"코디네이터와 서브에이전트: 허브 앤 스포크 구조",
       html:`<p class="lead">에이전트를 여러 개 운영할 때 쓰는 표준 구조임.</p>
        <h4>허브 앤 스포크(hub-and-spoke)</h4>
        <ul>
          <li>중심에 <strong>코디네이터</strong>가 있고, 그 바깥에 여러 <strong>서브에이전트</strong>가 연결됨</li>
          <li>모든 통신과 에러 처리, 정보 전달이 <strong>코디네이터를 거쳐 이뤄짐</strong></li>
          <li>이유: 관측 가능성(observability, 무슨 일이 있었는지 한 곳에서 확인 가능함), 일관된 에러 처리, 통제된 정보 흐름</li>
        </ul>
        <h4>컨텍스트 격리: 가장 많이 틀리는 지점</h4>
        <ul>
          <li>서브에이전트는 코디네이터의 대화 히스토리를 <strong>자동으로 물려받지 않음</strong></li>
          <li>서브에이전트는 프롬프트로 전달받은 내용만 알 수 있고, 코디네이터의 대화 기록 전체는 볼 수 없음</li>
        </ul>
        <h4>코디네이터가 담당하는 네 가지 일</h4>
        <ul>
          <li>작업 분해, 위임, 결과 취합, 그리고 <strong>어떤 서브에이전트를 호출할지 동적으로 선택함</strong>(쿼리 복잡도 기준)</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"코디네이터 설계가 실패하는 두 가지 유형과 처방",
       html:`__MAP:orch__<p class="lead">시험은 모든 구성 요소가 정상 동작하는데도 결과가 잘못된 상황을 제시하고 원인을 찾게 한다.</p>
        <h4>실패 유형 ①: 너무 좁은 작업 분해</h4>
        <ul>
          <li>증상: 서브에이전트는 각자 정상 수행했는데 <strong>최종 리포트에 큰 공백</strong>이 생김</li>
          <li>예: 창작 산업에 대한 AI 영향이라는 주제를 코디네이터가 디지털 아트, 그래픽 디자인, 사진으로만 분해하면 음악과 글, 영화가 전부 누락됨</li>
          <li>원인은 하위 단계(검색, 분석, 합성)가 아니라 <strong>분해를 수행한 코디네이터</strong>임</li>
        </ul>
        <h4>실패 유형 ②: 항상 전체 파이프라인 실행</h4>
        <ul>
          <li>단순 질의에도 매번 전체 서브에이전트를 실행하면 시간과 비용이 낭비됨</li>
          <li>권장 설계: 쿼리 요구사항을 분석해 <strong>필요한 서브에이전트만 동적으로 선택함</strong></li>
        </ul>
        <h4>처방: 반복 개선 루프(iterative refinement)</h4>
        <ul>
          <li>합성 결과의 <strong>공백을 코디네이터가 평가함</strong></li>
          <li>공백 영역을 겨냥한 쿼리로 검색과 분석에 <strong>재위임함</strong></li>
          <li>커버리지가 충분해질 때까지 <strong>재합성함</strong></li>
        </ul>
        <div class="callout">🎯 시험 포인트: 지문 로그에 분해 내역이 제시되면 그것이 정답의 근거임. 서브에이전트가 잘 수행했는지보다 무엇을 할당받았는지를 먼저 확인할 것.</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: Fast reports, slow answers",
       q:`Your research system produces excellent deep reports, but simple factual queries ("who is the CEO of X?") take 90+ seconds and cost the same as full reports. Logs show the coordinator always invokes all five subagents — search, two analysts, synthesis, report-writer — one after another, for every query. Subagent behavior is correct. What should change?`,
       opts:[
         {t:`Redesign the coordinator to analyze each query's requirements and dynamically select which subagents to invoke — and emit independent Task calls in a single response so the selected agents run in parallel.`, ok:true},
         {t:`Cache completed reports and serve them for sufficiently similar future queries, refreshing the cache on a weekly schedule so answers stay reasonably current.`},
         {t:`Let simple queries bypass the coordinator entirely and go directly to the synthesis agent, which is already good at producing concise, well-written answers.`},
         {t:`Build a second, lighter pipeline of faster subagents dedicated to simple queries, keeping the full pipeline untouched for deep research reports.`},
       ],
       hint:`코디네이터의 네 가지 역할 중 마지막 항목을 확인할 것. 지문의 "one after another"라는 표현도 근거임. 병렬 실행 규칙과 함께 볼 것.`,
       explain:{
         good:`결함이 두 가지임. ① 전체 파이프라인 고정 실행은 쿼리 복잡도 기반 동적 선택으로 고침(1.2). ② 순차 실행은 한 응답에 Task 호출을 함께 내보내는 병렬 실행으로 고침(1.3). 정답은 두 가지를 함께 고치는 선택지임.`,
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
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"서브에이전트를 생성하고 지시하는 구성 요소",
       html:`<p class="lead">Ch3에서 전체 구조를 다뤘음. 이번에는 서브에이전트를 실제로 생성하고 지시하는 구성 요소를 다룸.</p>
        <h4>Task 도구</h4>
        <ul>
          <li>서브에이전트를 생성(스폰, spawn)하는 공식 수단임</li>
          <li>단, 코디네이터의 <code>allowedTools</code> 목록에 <code>"Task"</code>가 있어야 호출할 수 있음. 목록에 없으면 서브에이전트를 생성할 수단 자체가 없음</li>
        </ul>
        <h4>AgentDefinition</h4>
        <ul>
          <li>서브에이전트의 정의 데이터임. 설명, 시스템 프롬프트, 사용 가능한 도구 제한을 담음</li>
        </ul>
        <h4>컨텍스트는 자동으로 전달되지 않음(재확인)</h4>
        <ul>
          <li>서브에이전트에게 알려줄 내용은 <strong>프롬프트에 직접 써서</strong> 넘겨야 함</li>
          <li>호출 사이에 공유되는 메모리도 없음. 호출할 때마다 사전 정보가 없는 상태에서 시작함</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"컨텍스트 전달 방법과 병렬 실행 방법",
       html:`__MAP:pass__<h4>① 발견 내용은 전체를 전달함</h4>
        <ul>
          <li>합성 에이전트에게는 검색 결과와 문서 분석 결과를 <strong>요약이 아니라 완전한 형태로</strong> 프롬프트에 포함함</li>
          <li>서브에이전트가 알아서 참조하는 경로는 없음. 프롬프트에 없는 내용은 알지 못함</li>
        </ul>
        <h4>② 내용과 메타데이터 분리</h4>
        <ul>
          <li>전달할 때 <strong>구조화된 형식</strong>을 씀. 내용과 출처(URL, 문서명, 페이지)를 분리함</li>
          <li>목적: 최종 리포트에서 <strong>출처 표기(attribution)를 보존하기 위함</strong></li>
        </ul>
        <h4>③ 병렬 실행</h4>
        <ul>
          <li>독립적인 하위 작업은 <strong>한 응답 안에 Task 호출 여러 개</strong>를 함께 내보냄</li>
          <li>턴을 나눠 하나씩 호출하면 순차 실행이 되어 지연이 늘어남</li>
        </ul>
        <h4>④ 프롬프트는 목표 중심으로 작성함</h4>
        <ul>
          <li>절차를 일일이 지시하지 않고 <strong>연구 목표와 품질 기준</strong>을 명시함</li>
          <li>그래야 서브에이전트가 상황에 맞춰 판단할 수 있음</li>
        </ul>
        <div class="callout">🎯 시험 포인트: 합성 결과가 앞선 발견을 반영하지 못하는 증상이 나오면, 원인은 대부분 발견 내용을 프롬프트에 넣지 않은 것임. 컨텍스트가 자동 상속된다고 전제한 선택지는 오답임.</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: The delegating coordinator that doesn't",
       q:`Your coordinator is configured with allowedTools: ["WebSearch", "Read"] and a detailed system prompt explaining exactly how to delegate to its three subagents. In production it never spawns a single subagent — it just answers everything itself using web search. What is wrong?`,
       opts:[
         {t:`"Task" is missing from the coordinator's allowedTools — without the Task tool it has no mechanism to spawn subagents, no matter how well the prompt describes delegation.`, ok:true},
         {t:`The system prompt's delegation language is too weak; it should state "you MUST use your subagents for every request."`},
         {t:`The subagents' AgentDefinitions are likely missing descriptions, making them invisible to the coordinator.`},
         {t:`WebSearch should be removed from allowedTools so the coordinator has no choice but to delegate.`},
       ],
       hint:`위임 지시는 완전한데 위임 수단이 있는지 확인할 것. allowedTools 목록을 항목별로 점검할 것.`,
       explain:{
         good:`서브에이전트를 생성하는 유일한 수단은 Task 도구임. 코디네이터의 allowedTools에 "Task"가 있어야 호출할 수 있음(1.3). 프롬프트가 아무리 정교해도 존재하지 않는 수단을 만들어 내지는 못함. 설정 진단 유형의 대표 문제임.`,
         wrongs:[
           `<b>B(지시 강화):</b> MUST를 반복해서 써도 Task 도구가 없으면 호출 자체가 불가능함.`,
           `<b>C(정의 누락 추정):</b> 정의가 완전해도 Task 도구가 없으면 호출할 수 없음. 지문에 근거가 없는 추측이기도 함.`,
           `<b>D(WebSearch 제거):</b> 위임 수단이 생기는 것이 아니라 코디네이터가 할 수 있는 일만 줄어듦.`,
         ]},
       principle:"수단 먼저, 지시는 그다음"},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 2: Five subtasks, two shapes",
       q:`A research run has five subtasks: three independent topic searches, plus (4) a comparison that requires all three search results, and (5) an executive summary that requires the comparison. How should the coordinator schedule its Task calls?`,
       opts:[
         {t:`Emit the three search Task calls together in a single response so they run in parallel; then invoke the comparison in a follow-up turn with the three results injected into its prompt, then the summary with the comparison's output.`, ok:true},
         {t:`Emit all five Task calls in one response — maximum parallelism minimizes total latency.`},
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
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"반드시 지켜야 하는 규칙: 결정론적 강제와 확률적 지시",
       html:`<p class="lead">이 챕터는 파트 1에서 출제 비중이 가장 높은 주제임. 공식 가이드 샘플 문제 1번(신원 검증 전 환불을 훅으로 차단하는 문제)도 이 주제에서 출제됨.</p>
        <h4>두 가지 통제 수단</h4>
        <ul>
          <li><strong>프로그램적 강제</strong>: 훅과 전제조건 게이트를 씀. 코드가 차단하므로 <strong>항상 지켜짐(결정론적)</strong></li>
          <li><strong>프롬프트 지시</strong>: 지시문으로 순서를 요구함. 대체로 따르지만 <strong>실패율이 0이 되지는 않음(확률적)</strong></li>
        </ul>
        <h4>판별 기준</h4>
        <ul>
          <li>위반 시 금전, 법률, 안전 사고로 이어지는 규칙: <strong>프로그램으로 강제함</strong></li>
          <li>문체, 성향, 품질 가이드: 프롬프트 지시로 충분함</li>
        </ul>
        <div class="callout">📖 용어 카드. <b>전제조건 게이트(prerequisite gate)</b>: A가 완료되기 전에는 B를 실행할 수 없도록 코드로 차단하는 장치. 예: 신원 확인(<code>get_customer</code>)이 끝나기 전에는 환불(<code>process_refund</code>) 호출 자체가 차단됨.</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"게이트 설계와 사람에게 넘기는 핸드오프",
       html:`__MAP:gate__<h4>① 전제조건 게이트: 자주 출제되는 정답 패턴</h4>
        <ul>
          <li>지문 단서: 12%의 사례에서 에이전트가 검증을 건너뛴다는 식의 <strong>실패율 데이터</strong>가 제시됨</li>
          <li>정답 패턴: <code>get_customer</code>가 검증된 고객 ID를 반환하기 전까지 <code>lookup_order</code>와 <code>process_refund</code> 호출을 <strong>프로그램으로 차단함</strong></li>
          <li>오답 패턴: 시스템 프롬프트 강화와 few-shot 예시 추가. 준수 확률을 높일 뿐 실패율을 0으로 만들지 못함</li>
        </ul>
        <h4>② 여러 문제가 섞인(multi-concern) 요청 처리</h4>
        <ul>
          <li>한 메시지에 여러 문제(환불, 배송, 계정)가 함께 들어오면 <strong>항목별로 분해</strong>한 뒤 공유 컨텍스트로 <strong>병렬 조사</strong>하고 <strong>하나의 답변으로 통합함</strong></li>
        </ul>
        <h4>③ 사람에게 넘기는 에스컬레이션 핸드오프(handoff)</h4>
        <ul>
          <li>전제: 상담사는 <strong>에이전트의 대화 기록에 접근할 수 없음</strong></li>
          <li>구조화 요약 4요소: <strong>고객 ID · 근본 원인 분석 · 환불 금액 · 권고 조치</strong></li>
        </ul>
        <div class="callout">🎯 시험 포인트: 신뢰성을 가장 효과적으로 높이는 조치를 묻고 선택지에 프롬프트 강화, few-shot, 게이트, 라우팅 분류기를 함께 제시하는 형태로 출제됨. 금전 사고가 걸린 상황이면 정답은 게이트임.</div>`},
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
       html:`<p class="lead">Ch5의 프로그램적 강제를 실제로 구현하는 수단이 훅임.</p>
        <h4>훅이란</h4>
        <ul>
          <li>에이전트 실행 흐름의 <strong>정해진 실행 지점</strong>에서 자동으로 실행되는 코드임</li>
          <li>에이전트의 판단과 무관하게 <strong>항상 실행됨</strong>. 그래서 결정론적임</li>
        </ul>
        <h4>시험에 출제되는 두 종류</h4>
        <ul>
          <li><strong>PostToolUse 훅</strong>: 도구 <strong>결과</strong>가 모델에 전달되기 전에 가로채서 변환함</li>
          <li><strong>도구 호출 가로채기 훅</strong>(통용 명칭 <strong>PreToolUse</strong>): 나가는 도구 <strong>호출</strong>을 검사해 정책 위반이면 차단하고 다른 경로로 전환함</li>
          <li>이름 구분: Post는 실행 <strong>후</strong>의 결과를 변환하고, Pre는 실행 <strong>전</strong>에 차단함</li>
        </ul>
        <div class="callout">📖 용어 카드. <b>Unix 타임스탬프</b>: 1970년 1월 1일부터 흐른 초를 센 숫자(예: 1785340800). <b>ISO 8601</b>: "2026-07-03T09:00:00" 형식의 국제 표준 날짜 표기. 시스템마다 날짜 표기가 다르므로 정규화가 필요함.</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"두 훅의 사용처: 정규화와 차단",
       html:`__MAP:gate__<h4>① PostToolUse: 형식이 다른 데이터의 정규화</h4>
        <ul>
          <li>상황: MCP 도구 A는 Unix 타임스탬프, B는 ISO 8601, C는 숫자 상태코드를 반환함</li>
          <li>형식이 섞인 데이터로 모델이 추론하면 오류가 발생함</li>
          <li>처방: PostToolUse 훅이 <strong>모델이 결과를 보기 전에</strong> 한 형식으로 통일함</li>
          <li>프롬프트로 형식을 변환해 추론하라고 지시하는 방식은 확률적이므로 오답 패턴임</li>
        </ul>
        <h4>② 호출 가로채기: 정책 위반 차단과 대체 경로 연결</h4>
        <ul>
          <li>상황: 500달러를 넘는 환불은 자동 처리를 금지한다는 식의 <strong>비즈니스 규칙</strong>이 있음</li>
          <li>처방: 훅이 <code>process_refund</code> 호출의 금액을 검사하고, 한도를 넘으면 <strong>차단한 뒤 사람에게 넘기는 에스컬레이션 경로로 전환함</strong></li>
          <li>주의: 차단만 해서는 설계가 완성되지 않음. <strong>대체 워크플로 연결까지</strong> 포함해야 정답임</li>
        </ul>
        <h4>훅과 프롬프트의 선택 기준(Ch5 복습)</h4>
        <ul>
          <li>보장이 필요한 규칙: 훅</li>
          <li>성향과 문체 유도: 프롬프트</li>
        </ul>
        <div class="callout">🎯 시험 포인트: 여러 MCP 도구의 응답 형식이 서로 다르다는 조건이 보이면 PostToolUse 정규화를 선택할 것.</div>`},
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
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"세션을 다루는 수단",
       html:`<p class="lead">세 가지 세션 관리 수단 중 무엇을 고를지 묻는 문제가 반복 출제되는 챕터임.</p>
        <h4>용어 정리</h4>
        <ul>
          <li><strong>CLI(command line interface)</strong>: 명령어를 입력해 프로그램을 조작하는 방식(Claude Code가 이 방식임)</li>
          <li><strong>플래그(flag)</strong>: 명령어 뒤에 붙이는 옵션 (예: <code>--resume</code>)</li>
          <li><strong>stale</strong>: 그 사이 대상이 바뀌어 기록된 내용이 더 이상 사실이 아닌 상태</li>
        </ul>
        <h4>세션 관리 수단 두 가지</h4>
        <ul>
          <li><code>--resume &lt;세션이름&gt;</code>: 이름을 지정해 둔 과거 대화를 <strong>그대로 이어서</strong> 계속함</li>
          <li><code>fork_session</code>: 공통 분석 지점에서 <strong>독립 분기</strong>를 만들어 서로 다른 접근을 나란히 탐색함</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"이어가기, 새로 시작하기, 분기하기의 판단 기준",
       html:`__MAP:session__<p class="lead">시험이 묻는 것은 기능 자체가 아니라 <strong>세 수단 중 무엇을 고를지의 기준</strong>이다.</p>
        <h4>① 이어가기(--resume)</h4>
        <ul>
          <li>조건: 이전 컨텍스트가 <strong>대체로 유효한 상태일 때</strong></li>
          <li>파일이 일부 바뀌었다면 재개하되 <strong>바뀐 파일을 알려서</strong> 그 부분만 재분석하게 함(전체 재탐색은 하지 않음)</li>
        </ul>
        <h4>② 새 세션에 구조화 요약 주입</h4>
        <ul>
          <li>조건: 이전 세션의 <strong>도구 결과가 stale한 상태일 때</strong>(그 사이 코드나 데이터가 광범위하게 바뀜)</li>
          <li>이유: stale한 도구 결과를 이어받으면 <strong>낡은 사실 위에서 추론</strong>하게 됨</li>
          <li>방법: 핵심 결론만 구조화 요약으로 정리해 <strong>새 세션 서두에 주입함</strong></li>
          <li>💡 출제 유형: 동료가 같은 프로젝트에서 별도의 대화를 진행한 뒤 작업을 재개하는 상황이 제시되면 이 방식이 정답임</li>
        </ul>
        <h4>③ 분기하기(fork_session)</h4>
        <ul>
          <li>조건: <strong>같은 분석 결과</strong>를 기반으로 <strong>서로 다른 접근 두 가지</strong>를 비교할 때</li>
          <li>예: 코드베이스 분석을 마친 뒤 테스트 전략 A안과 B안을 각 분기에서 탐색함</li>
          <li>이점: 분석을 두 번 반복하지 않아도 되고, 두 탐색이 서로의 컨텍스트에 영향을 주지 않음</li>
        </ul>
        <div class="callout">🎯 시험 포인트: 재개와 새 세션의 판별 기준은 <b>도구 결과가 여전히 유효한지 여부</b>임. 지문에서 그 사이 무엇이 얼마나 바뀌었는지를 확인할 것.</div>`},
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
