/* PART 1 — 에이전트 아키텍처 & 오케스트레이션 (D1, 27%) */
window.CCAF_CONTENT.p1 = {
  id: "p1",
  lessons: [

  /* ================= CH 1 · 1.1 ================= */
  { id:"p1c1", ch:"CH 1", title:"에이전트 루프의 생명주기 (1.1)",
    steps:[
      {type:"concept", kind:"PART BRIEFING · 파트 설명", h:"PART 01 — 여기서는 '스스로 일하는 구조'를 배운다",
       html:`<p class="lead">이 파트는 <strong>Agentic Architecture & Orchestration</strong>. 시험에서 가장 큰 덩어리.</p>
        <h4>파트 프로필</h4>
        <ul>
          <li>출제 비중 <strong>27% ≈ 16문항</strong> — 5개 도메인 중 최대</li>
          <li>1차 점수 <strong>60%</strong> — 여기서 약 6문항을 잃었음</li>
          <li>챕터 7개 + 미니테스트 · 약 2시간 (세션 S2~S5)</li>
        </ul>
        <h4>다루는 범위</h4>
        <ul>
          <li><strong>에이전트 루프</strong> — 에이전트가 도는 바퀴 (Ch1)</li>
          <li><strong>작업 분해 전략</strong> — 일을 쪼개는 방식 (Ch2)</li>
          <li><strong>멀티에이전트</strong> — 팀장-팀원 구조와 컨텍스트 전달 (Ch3~4)</li>
          <li><strong>강제 패턴·훅</strong> — 규칙을 어기지 못하게 만들기 (Ch5~6)</li>
          <li><strong>세션 관리</strong> — 작업 이어가기, --resume·fork (Ch7)</li>
        </ul>
        <div class="callout">🎯 이 파트의 공통 질문: <b>"정석 설계는 무엇이고, 그럴듯한 안티패턴은 무엇인가."</b> 특히 프로그램으로 강제할 일 vs 프롬프트로 지시할 일을 가르는 감각이 반복 출제됨.</div>`},
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"재료부터: 대화 히스토리와 stop_reason",
       html:`<p class="lead">이 레슨에 필요한 용어는 두 개.</p>
        <h4>① 대화 히스토리</h4>
        <ul>
          <li>Claude API에서 대화 = 역할(user/assistant)이 붙은 <strong>메시지 목록</strong></li>
          <li>Claude는 매번 <strong>이 목록 전체를 다시 읽고</strong> 다음 응답을 생성</li>
          <li>즉 "기억"이 아니라 <strong>"기록을 읽는 것"</strong> — 기록에 없으면 모름</li>
        </ul>
        <h4>② stop_reason</h4>
        <ul>
          <li>Claude 응답마다 붙는 <strong>"내가 왜 말을 멈췄는지" 라벨</strong></li>
          <li><code>"tool_use"</code> — "도구가 필요해서 멈췄어" → 아직 일하는 중</li>
          <li><code>"end_turn"</code> — "할 말 다 했어" → 작업 끝</li>
          <li>보조 2종도 알아두기: <code>"max_tokens"</code> — 출력 길이 한도 도달 (오류 처리·한도 늘려 재시도·부분 결과 수용 중 선택), <code>"stop_sequence"</code> — 미리 지정한 중단 문자열 감지</li>
          <li>단, <strong>루프 종료의 정석 신호는 여전히 end_turn 하나</strong> — 나머지는 각자의 처리 분기가 따로 있는 상태값이야</li>
        </ul>
        <div class="callout">📖 용어 카드 — <b>API</b>: 프로그램끼리 요청·응답을 주고받는 창구. "요청을 보낸다" = 대화 기록 전체 + 사용 가능한 도구 목록을 Claude에게 전송한다는 뜻.</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"조립: 에이전트 루프는 이렇게 돈다",
       html:`__MAP:loop__<p class="lead">위 두 재료를 조립하면 <strong>에이전트 루프</strong>. 에이전트는 '한 번 대답하고 끝'이 아니라 일이 끝날 때까지 도는 바퀴야.</p>
        <div class="loopdia">
          <span class="nd">① 요청 보내기<small>대화 기록 전체</small></span><span class="ar">→</span>
          <span class="nd hot">② stop_reason 확인<small>tool_use? end_turn?</small></span><span class="ar">→</span>
          <span class="nd">③ 도구 실행<small>Claude가 요청한 것</small></span><span class="ar">→</span>
          <span class="nd">④ 결과를 대화에 추가<small>다시 ①로</small></span>
        </div>
        <h4>정석 포인트 2가지</h4>
        <ul>
          <li>종료 판단은 <strong>stop_reason이 유일한 정석</strong> — <code>"end_turn"</code>이면 멈추고, <code>"tool_use"</code>면 도구 실행 후 계속 (공식 문서의 루프도 정확히 "while stop_reason == tool_use")</li>
          <li><strong>④ 결과 추가까지가 한 바퀴</strong> — 정확한 용어로: Claude의 요청은 <code>tool_use</code> 블록(이름+입력)으로 오고, 결과는 <code>tool_result</code> 블록으로 담아 user 메시지로 돌려보냄. 이 블록이 없으면 Claude는 결과를 못 봄</li>
        </ul>
        <h4>누가 다음 행동을 정하나 — 모델 주도 vs 사전 결정 트리</h4>
        <ul>
          <li><strong>모델 주도(model-driven)</strong>: 다음에 어떤 도구를 부를지 <strong>Claude가 문맥을 보고 그때그때 추론</strong> — 에이전트 루프의 본질</li>
          <li><strong>사전 결정 트리(pre-configured decision tree)</strong>: 도구와 순서를 <strong>코드가 미리 고정</strong> — 예측 가능하지만 계획 밖 상황엔 대응 불가</li>
          <li>구분 질문: "이번 바퀴에 뭘 할지 <strong>누가</strong> 정했나?" — 모델이면 에이전트, 코드면 고정 워크플로(1.6 프롬프트 체이닝 계열)</li>
          <li>결정성이 꼭 필요한 지점(정책·검증)은 모델 주도를 버리는 게 아니라 <strong>훅·게이트로 보완</strong>(1.4·1.5)</li>
        </ul>
        <h4>안티패턴 3종 (오답 보기 단골)</h4>
        <ul>
          <li>반복 횟수 상한을 <strong>주 종료 조건</strong>으로 사용 — 안전장치는 보조일 때만 정당</li>
          <li>응답에 <strong>텍스트가 있는지</strong>로 완료 판단 — 도구 요청과 텍스트는 같이 나올 수 있음</li>
          <li>"완료했습니다" 같은 <strong>자연어 신호 파싱</strong> — 표현이 바뀌면 깨짐</li>
        </ul>
        <div class="callout">🎯 시험 포인트: "그럴듯한 안전장치"를 주 종료 조건으로 승격시킨 보기가 단골 오답 장치.</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1 — Four implementations",
       q:`Four teammates each implemented the agentic loop for your support agent. Whose implementation is correct?`,
       opts:[
         {t:`Ji-woo: continue while stop_reason is "tool_use", executing requested tools and appending every result — including tool errors — to the conversation as structured tool results; terminate on "end_turn".`, ok:true},
         {t:`Min-jun: same stop_reason logic, but drop failed tool results from the conversation so error noise doesn't confuse the model's reasoning.`},
         {t:`Sara: terminate when the response contains a final text block, since Claude ends its work with text; append successful tool results each cycle.`},
         {t:`Alex: continue on "tool_use", appending all results, but treat 12 iterations as the primary stopping condition to keep costs bounded.`},
       ],
       hint:`종료 조건과 "④ 결과 추가"의 범위(성공만? 실패도?)를 함께 봐. 제일 그럴듯한 오답은 에러를 '배려해서' 숨기는 쪽이야.`,
       explain:{
         good:`정석 = stop_reason 종료 + 실패 결과까지 구조화해 추가. 에러를 숨기면 모델 입장에선 그 호출이 '아직 일어나지 않은 것'이라 같은 호출을 반복하고, 실패를 우회할 판단 기회도 사라져.`,
         wrongs:[
           `<b>B — 에러 결과 폐기:</b> 가장 그럴듯한 함정. "노이즈 제거"처럼 들리지만 실제론 동일 호출 무한 반복 + 복구 판단 불능을 만들어.`,
           `<b>C — 텍스트 존재로 종료:</b> 도구 요청과 설명 텍스트는 한 응답에 공존해 — 중간 설명에서 조기 종료돼.`,
           `<b>D — 12회 상한을 주 조건으로:</b> 13회가 필요한 정상 작업을 미완성으로 잘라. 상한은 보조 안전망일 때만 정당해.`,
         ]},
       principle:"원칙 ① 공식 신호로 · ⑤ 실패도 기록으로"},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 2 — The token-saving 'optimization'",
       q:`To "save tokens," a teammate changed the loop: after executing requested tools, instead of appending the raw results, it appends a one-line prose note like "(fetched order data — looks normal)". Since the change, the agent re-requests lookups it already ran, and yesterday it quoted a shipping date that appears nowhere in the actual order data. What is the right fix?`,
       opts:[
         {t:`Append tool results to the conversation as structured tool results; if token cost is a real concern, trim them to the relevant fields before appending — don't replace data with prose impressions.`, ok:true},
         {t:`Keep the prose notes but make them longer and more structured — a bulleted digest of each result — so less information is lost while still saving tokens.`},
         {t:`Increase the context window budget so full raw results always fit, and revisit compression only if costs become a real problem.`},
         {t:`Add a prompt instruction telling the model not to re-request data it has already fetched, and to reason only from details it has actually seen in the conversation.`},
       ],
       hint:`"(looks normal)"만 남으면 모델에게 주문 데이터가 존재해? 두 증상(재조회 + 없는 날짜 인용)이 각각 왜 생겼는지 연결해봐. 토큰 절약의 올바른 방법은 5.1에 있어.`,
       explain:{
         good:`프로스 인상은 데이터가 아니야. 재조회(모델에겐 미실행 상태)와 환각(없는 날짜를 지어냄) 둘 다 원본 부재가 원인. 정답은 구조화 결과 유지 + 관련 필드만 트리밍(5.1) — 절약과 정확성을 동시에.`,
         wrongs:[
           `<b>B — 더 긴 인상:</b> 길어진 인상도 인상 — 모델이 참조할 원본 필드는 여전히 없어.`,
           `<b>C — 예산 증액:</b> 절약 요구를 무시하는 답이고, 40필드 원본의 컨텍스트 잠식 문제로 되돌아가.`,
           `<b>D — 재조회 금지 지시:</b> 모델은 그 데이터를 '가진 적이 없어' — 금지하면 재조회 대신 환각이 늘어.`,
         ]},
       principle:"원칙 ② 근본 원인 — 데이터는 데이터로"},
    ]},

  /* ================= CH 2 · 1.6 ================= */
  { id:"p1c2", ch:"CH 2", title:"작업 분해 전략 (1.6)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"일을 쪼개는 두 가지 방식",
       html:`<p class="lead">큰 작업을 에이전트에게 시킬 때, 쪼개는 방식은 크게 둘.</p>
        <h4>① Prompt chaining — 고정 순차 파이프라인</h4>
        <ul>
          <li>순서가 <strong>미리 정해진</strong> 단계들을 차례로 실행</li>
          <li>예: "각 파일을 하나씩 분석 → 마지막에 파일 간 통합 검토"</li>
          <li>어떤 단계가 나올지 <strong>예측 가능한 작업</strong>에 적합</li>
        </ul>
        <h4>② Dynamic decomposition — 동적 분해</h4>
        <ul>
          <li>중간에 <strong>발견한 것에 따라</strong> 다음 할 일이 바뀜</li>
          <li>예: 조사하다가 의존성을 발견하면 계획에 새 하위 작업 추가</li>
          <li>뭐가 나올지 모르는 <strong>열린 조사 과제</strong>에 적합</li>
        </ul>
        <div class="callout">📖 용어 카드 — <b>파이프라인</b>: 공장 컨베이어 벨트처럼 결과물이 다음 단계의 입력이 되는 연결 구조.</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"어떤 작업에 어떤 분해를 쓰나",
       html:`__MAP:decomp__<p class="lead">시험은 "이 작업엔 어느 쪽?"을 물어본다. 판별 기준과 대표 케이스 두 개.</p>
        <h4>판별 기준</h4>
        <ul>
          <li>단계가 예측 가능 + 매번 같은 관점들 → <strong>prompt chaining</strong></li>
          <li>중간 발견이 다음 단계를 결정 → <strong>동적 분해</strong></li>
        </ul>
        <h4>케이스 1: 대형 코드 리뷰 (chaining의 대표 예)</h4>
        <ul>
          <li>파일 14개를 한 번에 리뷰 → <strong>주의력 희석</strong>: 어떤 파일은 대충, 같은 패턴에 모순된 피드백</li>
          <li>정석: <strong>파일별 개별 분석 패스</strong> + 별도의 <strong>파일 간 통합 패스</strong></li>
          <li>"더 큰 모델·더 큰 컨텍스트로 해결" → 주의력 문제는 그대로라 오답</li>
        </ul>
        <h4>케이스 2: "레거시 코드에 테스트 전면 추가" (동적 분해의 대표 예)</h4>
        <ul>
          <li>① 구조 파악(매핑) → ② 고영향 영역 식별 → ③ 우선순위 계획 수립</li>
          <li>계획은 고정이 아니라 <strong>의존성이 발견될 때마다 조정</strong></li>
        </ul>
        <div class="callout">🎯 시험 포인트: "알파벳 순서로 파일마다 테스트 생성" 같은 기계적 순회, "한 번에 전부" 같은 통짜 처리가 오답 장치로 나온다.</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1 — The odd one out",
       q:`Which of these workloads should use a fixed sequential pipeline (prompt chaining) rather than dynamic adaptive decomposition?`,
       opts:[
         {t:`Nightly localization QA, where every support article goes through the same passes — terminology check, tone check, broken-link check — in the same order.`, ok:true},
         {t:`Investigating why checkout latency doubled last Tuesday, where each finding determines what to examine next.`},
         {t:`"Understand this unfamiliar payment service and propose improvements," where the scope emerges during exploration.`},
         {t:`Adding comprehensive tests to a legacy codebase, where interdependencies surface mid-task.`},
       ],
       hint:`넷 중 하나만 "단계가 미리 정해져 있고 매번 같은" 작업이야. 나머지 셋의 공통점을 먼저 찾아봐.`,
       explain:{
         good:`고정 관점의 반복 작업(용어→톤→링크, 매번 동일) = prompt chaining. 예측 가능성이 갈림길이야.`,
         wrongs:[
           `<b>B — 지연 원인 조사:</b> 발견이 다음 단계를 결정하는 전형적 조사형 — 동적 분해.`,
           `<b>C — 서비스 이해·개선:</b> 범위 자체가 탐색 중에 드러나는 열린 과제 — 동적 분해.`,
           `<b>D — 레거시 테스트:</b> 가이드가 명시한 동적 분해의 대표 사례.`,
         ]},
       principle:"예측 가능성이 분해 방식을 정한다"},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 2 — Dana vs Raj",
       q:`Your agent must "add comprehensive tests to a 7-year-old legacy codebase." Two engineers disagree: Dana wants Claude to start generating tests for the main module immediately ("we learn the structure by doing"); Raj wants a complete fixed plan written upfront and followed exactly ("planning prevents waste"). What does best practice actually prescribe?`,
       opts:[
         {t:`Neither: first map the structure and identify high-impact areas, then build a prioritized plan — and treat that plan as adaptive, revising it as dependencies are discovered.`, ok:true},
         {t:`Dana's approach — early output builds momentum, and the codebase's structure reveals itself organically through the work.`},
         {t:`Raj's approach — a complete upfront plan is exactly what prevents wasted effort on a codebase this old.`},
         {t:`A compromise: generate tests module by module in directory order, which needs neither exploration nor planning.`},
       ],
       hint:`둘 다 반쪽이야. 가이드의 답은 "계획을 세우되, 계획에 형용사 하나"가 붙어.`,
       explain:{
         good:`매핑 → 고영향 식별 → 우선순위 계획 + 적응. Dana는 구조를 모른 채 일부터(저영향 모듈에 노력 낭비 위험), Raj는 계획을 고정해 발견된 의존성을 반영 못 해. 정답은 '적응형 계획'이라는 제3의 길.`,
         wrongs:[
           `<b>B — Dana:</b> 고영향 영역을 모른 채 "main module"부터 — 그게 고영향이라는 보장이 없어.`,
           `<b>C — Raj:</b> 레거시는 파보기 전엔 몰라 — 고정 계획은 첫 의존성 발견에서 무너져.`,
           `<b>D — 디렉토리 순회:</b> 탐색도 계획도 없는 기계적 순서 — 둘의 단점만 합친 절충.`,
         ]},
       principle:"계획하되, 적응형으로"},
    ]},

  /* ================= CH 3 · 1.2 ================= */
  { id:"p1c3", ch:"CH 3", title:"코디네이터-서브에이전트 오케스트레이션 (1.2)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"팀장 하나, 팀원 여럿 — 허브-앤-스포크",
       html:`<p class="lead">에이전트 여러 개를 굴릴 때의 표준 구조.</p>
        <h4>허브-앤-스포크 (hub-and-spoke)</h4>
        <ul>
          <li>가운데 <strong>코디네이터</strong>(팀장) — 바퀴살 끝에 <strong>서브에이전트</strong>(팀원)</li>
          <li>모든 통신·에러 처리·정보 라우팅이 <strong>코디네이터를 경유</strong></li>
          <li>이유: 관측 가능성(무슨 일이 있었는지 한 곳에서 보임), 일관된 에러 처리, 통제된 정보 흐름</li>
        </ul>
        <h4>컨텍스트 격리 — 가장 많이 틀리는 지점</h4>
        <ul>
          <li>서브에이전트는 코디네이터의 대화 히스토리를 <strong>자동으로 물려받지 않음</strong></li>
          <li>팀원은 팀장이 시킨 내용만 알고, 회의록 전체는 못 보는 것</li>
        </ul>
        <h4>코디네이터의 4가지 일</h4>
        <ul>
          <li>작업 분해 → 위임 → 결과 취합 → <strong>어떤 팀원을 부를지 동적 선택</strong> (쿼리 복잡도 기준)</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"코디네이터가 무너지는 두 가지 방식과 처방",
       html:`__MAP:orch__<p class="lead">시험은 "다 잘 돌아가는데 결과가 이상한" 상황을 주고 원인을 찾게 한다.</p>
        <h4>무너짐 ①: 너무 좁은 작업 분해</h4>
        <ul>
          <li>증상: 서브에이전트는 각자 완벽하게 일했는데 <strong>최종 리포트에 큰 구멍</strong></li>
          <li>예: "창작 산업에 대한 AI 영향" → 코디네이터가 "디지털 아트/그래픽 디자인/사진"으로만 분해 → 음악·글·영화 통째로 누락</li>
          <li>범인은 하류(검색·분석·합성)가 아니라 <strong>분해를 한 코디네이터</strong></li>
        </ul>
        <h4>무너짐 ②: 항상 풀 파이프라인</h4>
        <ul>
          <li>단순 질의도 매번 전체 서브에이전트를 태우면 낭비</li>
          <li>정석: 쿼리 요구를 분석해 <strong>필요한 서브에이전트만 동적 선택</strong></li>
        </ul>
        <h4>처방: 반복 개선 루프 (iterative refinement)</h4>
        <ul>
          <li>합성 결과의 <strong>빈틈을 코디네이터가 평가</strong></li>
          <li>빈 곳을 겨냥한 쿼리로 검색·분석에 <strong>재위임</strong></li>
          <li>커버리지가 충분할 때까지 <strong>재합성</strong></li>
        </ul>
        <div class="callout">🎯 시험 포인트: 로그에 분해 내역이 나오면 그게 답의 단서. "서브에이전트가 일을 잘했는가"보다 "무엇을 할당받았는가"를 먼저 보라.</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1 — Fast reports, slow answers",
       q:`Your research system produces excellent deep reports, but simple factual queries ("who is the CEO of X?") take 90+ seconds and cost the same as full reports. Logs show the coordinator always invokes all five subagents — search, two analysts, synthesis, report-writer — one after another, for every query. Subagent behavior is correct. What should change?`,
       opts:[
         {t:`Redesign the coordinator to analyze each query's requirements and dynamically select which subagents to invoke — and emit independent Task calls in a single response so the selected agents run in parallel.`, ok:true},
         {t:`Cache completed reports and serve them for sufficiently similar future queries, refreshing the cache on a weekly schedule so answers stay reasonably current.`},
         {t:`Let simple queries bypass the coordinator entirely and go directly to the synthesis agent, which is already good at producing concise, well-written answers.`},
         {t:`Build a second, lighter pipeline of faster subagents dedicated to simple queries, keeping the full pipeline untouched for deep research reports.`},
       ],
       hint:`코디네이터의 4가지 역할 중 마지막이 뭐였지? 그리고 "one after another"라는 표현도 단서야 — 병렬의 공식을 겹쳐봐.`,
       explain:{
         good:`두 결함이 한 문장에 있어: ①풀 파이프라인 고정 → 쿼리 복잡도 기반 동적 선택(1.2), ②순차 실행 → 한 응답에 Task 병렬(1.3). 정답은 둘을 함께 고치는 보기.`,
         wrongs:[
           `<b>B — 리포트 캐시:</b> "충분히 비슷한"의 판단이 새 문제 + 낡은 답 서빙 위험. 구조 결함은 그대로.`,
           `<b>C — 합성 직행:</b> 합성 에이전트는 검색 도구가 없어 자기 지식으로 답하게 돼 — 출처 없는 환각 경로.`,
           `<b>D — 라이트 파이프라인 복제:</b> 유지할 시스템이 두 배 — 동적 선택 하나로 될 일의 과잉 설계.`,
         ]},
       principle:"동적 선택 + 병렬 — 코디네이터의 존재 이유"},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 2 — The loop that wouldn't stop",
       q:`You added an iterative refinement loop. On "quantum networking startups in Africa," the coordinator has now run six refine cycles: targeted re-searches keep returning the same three thin sources, and each re-synthesis barely changes. Cost is ballooning. What is the correct design response?`,
       opts:[
         {t:`Give the loop coverage-sufficiency and stopping criteria: when targeted re-search stops yielding new sources, accept the synthesis and ship it with coverage annotations marking the thin areas.`, ok:true},
         {t:`Let the loop continue — the whole point of iterative refinement is to run until coverage is complete.`},
         {t:`After a fixed three cycles, have the synthesis agent fill any remaining gaps from its general knowledge.`},
         {t:`Diagnose it as a search-agent failure and swap in a different search provider.`},
       ],
       hint:`세상에 소스가 세 개뿐이라면, 일곱 번째 사이클이 뭘 더 찾아줄까? 그리고 '얇은 부분'을 정직하게 처리하는 장치가 5.3에 있었지.`,
       explain:{
         good:`개선 루프에도 종료 기준이 필요해 — 1.1에서 배운 루프 통제의 재적용이야. 새 소스가 안 나오면 수용하고, 커버리지 주석(5.3)으로 얇은 영역을 명시하는 게 정직한 완결.`,
         wrongs:[
           `<b>B — 무한 개선:</b> "완전한 커버리지"는 소스가 존재하지 않으면 도달 불가 — 종료 조건 없는 루프의 재발명.`,
           `<b>C — 일반 지식 충전:</b> 리서치의 빈틈을 환각으로 메꾸는 것 — 출처 없는 주장이 리포트에 섞여.`,
           `<b>D — 공급자 교체:</b> 검색은 정상 작동했어 — 세상에 소스가 적은 건 도구 탓이 아니야.`,
         ]},
       principle:"루프엔 종료 기준, 빈틈엔 주석"},
    ]},

  /* ================= CH 4 · 1.3 ================= */
  { id:"p1c4", ch:"CH 4", title:"컨텍스트 전달과 병렬 실행 (1.3)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"서브에이전트를 만들고 부리는 부품들",
       html:`<p class="lead">Ch3에서 구조를 봤으니, 이번엔 실제로 팀원을 '고용하고 지시하는' 부품들.</p>
        <h4>Task 도구</h4>
        <ul>
          <li>서브에이전트를 만드는(스폰하는) 공식 수단</li>
          <li>단, 코디네이터의 <code>allowedTools</code> 목록에 <code>"Task"</code>가 있어야 호출 가능 — 없으면 팀장이 채용 권한이 없는 것</li>
        </ul>
        <h4>AgentDefinition</h4>
        <ul>
          <li>서브에이전트의 <strong>이력서 겸 직무기술서</strong>: 설명, 시스템 프롬프트, 쓸 수 있는 도구 제한</li>
        </ul>
        <h4>컨텍스트는 자동으로 안 넘어간다 (재강조)</h4>
        <ul>
          <li>서브에이전트에게 알려줄 것은 <strong>프롬프트에 직접 써서</strong> 넘겨야 함</li>
          <li>호출 사이에 메모리 공유도 없음 — 매번 새로 채용된 팀원이라고 생각</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"잘 넘기고, 동시에 돌리는 법",
       html:`__MAP:pass__<h4>① 발견은 통째로 넘기기</h4>
        <ul>
          <li>합성 에이전트에게는 검색 결과·문서 분석 결과를 <strong>요약이 아니라 완전한 형태로</strong> 프롬프트에 포함</li>
          <li>"알아서 알겠지"는 없음 — 프롬프트에 없으면 모름</li>
        </ul>
        <h4>② 내용과 메타데이터 분리</h4>
        <ul>
          <li>전달할 때 <strong>구조화 형식</strong>으로: 내용 따로, 출처(URL·문서명·페이지) 따로</li>
          <li>목적: 나중에 리포트에서 <strong>출처 표기(attribution)가 보존</strong>되게</li>
        </ul>
        <h4>③ 병렬 실행</h4>
        <ul>
          <li>독립적인 하위 작업들은 <strong>한 응답 안에서 Task 호출 여러 개</strong>를 한꺼번에 내보내기</li>
          <li>턴을 나눠 하나씩 부르면 순차 실행이 돼서 느려짐</li>
        </ul>
        <h4>④ 프롬프트는 목표 지향으로</h4>
        <ul>
          <li>절차를 일일이 지시하지 말고 <strong>연구 목표와 품질 기준</strong>을 명시</li>
          <li>그래야 서브에이전트가 상황에 적응할 수 있음</li>
        </ul>
        <div class="callout">🎯 시험 포인트: "합성 결과가 앞선 발견을 반영 안 함" → 원인은 십중팔구 "발견을 프롬프트에 안 넣었음". 자동 상속을 전제한 보기는 오답.</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1 — The delegating coordinator that doesn't",
       q:`Your coordinator is configured with allowedTools: ["WebSearch", "Read"] and a detailed system prompt explaining exactly how to delegate to its three subagents. In production it never spawns a single subagent — it just answers everything itself using web search. What is wrong?`,
       opts:[
         {t:`"Task" is missing from the coordinator's allowedTools — without the Task tool it has no mechanism to spawn subagents, no matter how well the prompt describes delegation.`, ok:true},
         {t:`The system prompt's delegation language is too weak; it should state "you MUST use your subagents for every request."`},
         {t:`The subagents' AgentDefinitions are likely missing descriptions, making them invisible to the coordinator.`},
         {t:`WebSearch should be removed from allowedTools so the coordinator has no choice but to delegate.`},
       ],
       hint:`위임 '지시'는 완벽한데 위임 '수단'이 있는지 봐 — allowedTools 목록을 한 항목씩.`,
       explain:{
         good:`서브에이전트 스폰의 유일한 메커니즘은 Task 도구이고, 코디네이터의 allowedTools에 "Task"가 있어야 호출 가능(1.3). 프롬프트가 아무리 정교해도 없는 수단을 만들어내진 못해 — 설정 진단 문제의 전형.`,
         wrongs:[
           `<b>B — 지시 강화:</b> MUST를 백 번 써도 Task 도구가 없으면 물리적으로 불가능.`,
           `<b>C — 정의 추측:</b> 정의가 완벽해도 Task 없인 호출 불가 — 증거 없는 추측이기도 해.`,
           `<b>D — 검색 제거:</b> 위임 수단이 생기는 게 아니라 코디네이터가 무능해질 뿐.`,
         ]},
       principle:"수단 먼저, 지시는 그다음"},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 2 — Five subtasks, two shapes",
       q:`A research run has five subtasks: three independent topic searches, plus (4) a comparison that requires all three search results, and (5) an executive summary that requires the comparison. How should the coordinator schedule its Task calls?`,
       opts:[
         {t:`Emit the three search Task calls together in a single response so they run in parallel; then invoke the comparison in a follow-up turn with the three results injected into its prompt, then the summary with the comparison's output.`, ok:true},
         {t:`Emit all five Task calls in one response — maximum parallelism minimizes total latency.`},
         {t:`Run all five sequentially — mixing parallel and sequential execution complicates error handling too much.`},
         {t:`Run the searches in parallel, then let the comparison agent read the search results from the shared session memory.`},
       ],
       hint:`병렬은 '독립'일 때만 정당해. (4)와 (5)는 왜 첫 응답에 못 들어가지? 그리고 의존 결과는 어떻게 전달했지?`,
       explain:{
         good:`독립 3개 = 한 응답 병렬(1.3), 의존 2개 = 후속 턴에서 앞선 결과를 프롬프트에 명시 주입. 병렬의 조건(독립성)과 전달의 원칙(명시)을 동시에 묻는 구성이야.`,
         wrongs:[
           `<b>B — 5개 전부 병렬:</b> (4)(5)는 입력이 아직 존재하지 않아 — 빈손으로 실행돼 무의미한 출력.`,
           `<b>C — 전부 순차:</b> 독립인 3개까지 직렬화 — 지연 3배를 자청하는 과잉 단순화.`,
           `<b>D — 공유 메모리:</b> 세션 간 공유 메모리는 존재하지 않아 — 명시 전달이 유일한 경로.`,
         ]},
       principle:"독립은 병렬, 의존은 주입"},
    ]},

  /* ================= CH 5 · 1.4 ================= */
  { id:"p1c5", ch:"CH 5", title:"강제 패턴과 핸드오프 (1.4)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"'반드시'가 필요할 때: 결정론 vs 확률",
       html:`<p class="lead">이 챕터가 파트 1에서 제일 중요해. 1차 시험에서도, V2 샘플 1번에서도 나온 주제.</p>
        <h4>두 가지 통제 수단</h4>
        <ul>
          <li><strong>프로그램적 강제</strong> — 훅, 전제조건 게이트. 코드가 막으니 <strong>100% 지켜짐 (결정론적)</strong></li>
          <li><strong>프롬프트 지시</strong> — "반드시 ~부터 해". 대체로 따르지만 <strong>실패율이 0이 아님 (확률적)</strong></li>
        </ul>
        <h4>판별 기준</h4>
        <ul>
          <li>어기면 돈·법·안전 사고가 나는 규칙 → <strong>프로그램으로 강제</strong></li>
          <li>스타일·성향·품질 가이드 → 프롬프트로 충분</li>
        </ul>
        <div class="callout">📖 용어 카드 — <b>전제조건 게이트(prerequisite gate)</b>: "A가 완료되기 전엔 B 실행 불가"를 코드로 막는 장치. 예: 신원 확인(get_customer) 전에는 환불(process_refund) 호출 자체가 차단.</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"게이트 설계와 인간 인수인계",
       html:`__MAP:gate__<h4>① 전제조건 게이트 — 시험의 단골 정답</h4>
        <ul>
          <li>상황 신호: "12% of cases에서 에이전트가 검증을 건너뜀" 같은 <strong>실패율 데이터</strong></li>
          <li>정답 패턴: <code>get_customer</code>가 검증된 고객 ID를 반환하기 전까지 <code>lookup_order</code>·<code>process_refund</code> 호출을 <strong>프로그램으로 차단</strong></li>
          <li>오답 패턴: 시스템 프롬프트 강화, few-shot 추가 → 확률을 높일 뿐 0%로 못 만듦</li>
        </ul>
        <h4>② 멀티 컨선(multi-concern) 요청 처리</h4>
        <ul>
          <li>한 메시지에 여러 문제(환불+배송+계정)가 섞여 오면: <strong>항목별로 분해</strong> → 공유 컨텍스트로 <strong>병렬 조사</strong> → <strong>통합 답변</strong></li>
        </ul>
        <h4>③ 인간 에스컬레이션 핸드오프</h4>
        <ul>
          <li>전제: 상담사는 <strong>대화 기록에 접근 못 함</strong></li>
          <li>구조화 요약 4요소: <strong>고객 ID · 근본 원인 분석 · 환불 금액 · 권고 조치</strong></li>
        </ul>
        <div class="callout">🎯 시험 포인트: "가장 효과적으로 신뢰성을 높이는 조치"를 물으며 보기에 [프롬프트 강화 / few-shot / 게이트 / 라우팅 분류기]를 늘어놓는 패턴 → 금전 사고가 걸려 있으면 답은 게이트.</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1 — Four policies, one matrix",
       q:`Your support agent has four policies to uphold: (1) identity must be verified before any account operation; (2) refunds over $500 must never auto-execute; (3) replies should address the customer by name; (4) responses should stay under 150 words. Which enforcement allocation is correct?`,
       opts:[
         {t:`(1) and (2) as programmatic controls — a prerequisite gate and a tool-call interception hook — because violations carry financial and security consequences; (3) and (4) as prompt guidance, since occasional misses are acceptable.`, ok:true},
         {t:`All four in the system prompt, with "CRITICAL:" prefixes on (1) and (2) — models follow strongly emphasized instructions far more reliably than plain ones.`},
         {t:`All four as programmatic hooks — consistency matters everywhere, hooks are the most reliable mechanism available, and uniform enforcement removes guesswork.`},
         {t:`(3) and (4) as hooks since they're easy to check programmatically; (1) and (2) in the prompt with few-shot examples, since judgment calls need language understanding.`},
       ],
       hint:`"어기면 사고 나는 것"과 "가끔 어겨도 되는 것"을 갈라봐. D는 그럴듯한 논리로 정확히 거꾸로 배치한 함정이야.`,
       explain:{
         good:`1.4의 배치 원칙: 결정론이 필요한 규칙(돈·보안)만 프로그램으로, 스타일·성향은 프롬프트로. 전부 훅도, 전부 프롬프트도 오답 — 보장이 필요한 곳과 아닌 곳을 가르는 판단이 핵심이야.`,
         wrongs:[
           `<b>B — CRITICAL 라벨:</b> 대문자는 확률을 조금 올릴 뿐 — (1)(2)의 실패율이 0이 안 돼.`,
           `<b>C — 전부 훅:</b> 150단어 초과 응답을 차단하는 훅은 정상 대화를 부수는 과잉 통제.`,
           `<b>D — 역배치:</b> "쉬운 걸 강제하고 위험한 걸 확률에" — 논리가 그럴듯해서 제일 위험한 보기.`,
         ]},
       principle:"보장이 필요한 곳에만 강제를"},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 2 — The gate that worked too well",
       q:`Your prerequisite gate works — but too literally: it demands a fresh get_customer verification immediately before every gated call, so a conversation with three account operations verifies the same customer three times. Complaints are up, and an engineer proposes reverting to prompt-based ordering "since the gate clearly doesn't fit real conversations." What is the right move?`,
       opts:[
         {t:`Keep programmatic enforcement but fix the gate's logic: track verified-customer state for the session, and block gated tools only until the first successful verification.`, ok:true},
         {t:`Accept the proposal — the experiment showed programmatic enforcement is too rigid for conversational flows.`},
         {t:`Keep the gate exactly as is and add an apology template for the repeated verification steps.`},
         {t:`Run identity verification asynchronously in the background while account operations proceed in parallel.`},
       ],
       hint:`게이트가 틀린 게 아니라 게이트의 '조건'이 조악한 거야. 게이트도 코드니까 설계를 고칠 수 있어 — 강제 vs 편의가 양자택일이 아니지.`,
       explain:{
         good:`프로그램적 강제는 있다/없다의 이분법이 아니라 설계 대상이야. 세션 상태 기반 게이트(첫 검증 성공까지만 차단)로 바꾸면 보장과 UX를 둘 다 얻어. "불편하니 확률로 회귀하자"가 이 문제의 함정 서사.`,
         wrongs:[
           `<b>B — 프롬프트 회귀:</b> 실패율 있는 사고 모드로의 복귀 — 불편의 해법이 보장 포기일 순 없어.`,
           `<b>C — 사과 템플릿:</b> 원인(조악한 게이트 조건)은 방치하고 증상에 화장.`,
           `<b>D — 비동기 검증:</b> 검증 완료 전에 작업이 실행돼 — 게이트의 존재 이유를 무력화.`,
         ]},
       principle:"강제는 유지, 설계를 개선"},
    ]},

  /* ================= CH 6 · 1.5 ================= */
  { id:"p1c6", ch:"CH 6", title:"Agent SDK 훅 (1.5)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"훅 = 정해진 길목에 세우는 자동 검문소",
       html:`<p class="lead">Ch5의 '프로그램적 강제'를 실제로 구현하는 부품이 훅(hook).</p>
        <h4>훅이란</h4>
        <ul>
          <li>에이전트 실행 흐름의 <strong>정해진 길목</strong>에서 자동으로 실행되는 코드</li>
          <li>에이전트가 원하든 말든 <strong>무조건 거쳐감</strong> — 그래서 결정론적</li>
        </ul>
        <h4>시험에 나오는 두 종류</h4>
        <ul>
          <li><strong>PostToolUse 훅</strong> — 도구 <strong>결과</strong>가 모델에 도착하기 전에 가로채서 변환</li>
          <li><strong>도구 호출 가로채기 훅</strong> (통용 명칭 <strong>PreToolUse</strong>) — 나가는 도구 <strong>호출</strong>을 검사해서 정책 위반이면 차단·리다이렉트</li>
          <li>이름 암기법: Post = 실행 <strong>후</strong>의 결과를 다듬고, Pre = 실행 <strong>전</strong>에 막는다</li>
        </ul>
        <div class="callout">📖 용어 카드 — <b>Unix 타임스탬프</b>: 1970년 1월 1일부터 초를 센 숫자(예: 1785340800). <b>ISO 8601</b>: "2026-07-03T09:00:00" 형식의 국제 표준 날짜 표기. 시스템마다 날짜 표기가 달라서 정규화가 필요해진다.</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"두 훅의 사용처: 정규화와 차단",
       html:`__MAP:gate__<h4>① PostToolUse — 이질적인 데이터 정규화</h4>
        <ul>
          <li>상황: MCP 도구 A는 Unix 타임스탬프, B는 ISO 8601, C는 숫자 상태코드를 반환</li>
          <li>모델이 형식이 뒤섞인 데이터로 추론하면 실수 발생</li>
          <li>처방: PostToolUse 훅이 <strong>모델이 보기 전에</strong> 한 형식으로 통일</li>
          <li>프롬프트로 "형식을 변환해서 생각해"라고 시키는 건 확률적 → 오답 패턴</li>
        </ul>
        <h4>② 호출 가로채기 — 정책 위반 차단 + 대체 경로</h4>
        <ul>
          <li>상황: "$500 초과 환불은 자동 처리 금지" 같은 <strong>비즈니스 규칙</strong></li>
          <li>처방: 훅이 process_refund 호출의 금액을 검사 → 초과면 <strong>차단하고 인간 에스컬레이션으로 리다이렉트</strong></li>
          <li>포인트: 차단만 하면 반쪽 — <strong>대체 워크플로 연결까지</strong>가 정답</li>
        </ul>
        <h4>훅 vs 프롬프트 선택 기준 (Ch5 복습)</h4>
        <ul>
          <li>보장이 필요한 규칙 → 훅</li>
          <li>성향·스타일 유도 → 프롬프트</li>
        </ul>
        <div class="callout">🎯 시험 포인트: "여러 MCP 도구의 응답 형식이 제각각" 키워드가 보이면 PostToolUse 정규화를 찾아라.</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1 — 44 fields, three date formats",
       q:`lookup_order returns 44 fields per call (warehouse codes, carrier internals, audit metadata...), of which about 6 matter for refund decisions — and dates arrive in three different formats across backends. Long conversations degrade as these results accumulate, and the agent occasionally miscompares dates. Where is the right place to fix both problems at once?`,
       opts:[
         {t:`A PostToolUse hook that trims each result to the refund-relevant fields and normalizes the date formats — before the model ever processes the result.`, ok:true},
         {t:`A system prompt instruction to focus only on relevant fields and mentally convert all dates to one format.`},
         {t:`A request to the warehouse team to redesign their API response to return fewer, cleaner fields.`},
         {t:`A nightly maintenance job that compresses old conversation history to reclaim context space.`},
       ],
       hint:`트리밍(5.1)과 정규화(1.5)를 '동시에' 할 수 있는 길목은 하나뿐이야 — 결과가 모델에 닿기 전.`,
       explain:{
         good:`PostToolUse는 두 처방의 교차점이야: 유입 전 트리밍(잠식 차단) + 형식 통일(추론 오류 차단), 둘 다 결정론적으로. 문제 하나에 챕터 두 개(1.5+5.1)를 엮는 게 실전 출제 방식이야.`,
         wrongs:[
           `<b>B — 프롬프트 지시:</b> 확률적이고, "무시해"라고 해도 44필드의 토큰은 이미 소모됐어.`,
           `<b>C — 백엔드 재설계 요청:</b> 남의 로드맵에 인질 — 내 파이프라인에서 오늘 풀 수 있는 문제야.`,
           `<b>D — 사후 압축:</b> 노이즈가 이미 쌓인 뒤의 청소 — 유입 차단이 아니고, 압축이 진짜 정보도 뭉갤 수 있어.`,
         ]},
       principle:"모델이 보기 전에 — 트리밍과 정규화의 길목"},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 2 — The half-built hook",
       q:`Your interception hook correctly blocks process_refund calls over $500, returning {"isError": true, "message": "blocked by policy"}. Production logs show the agent retrying the identical call three times, then telling customers "I'm unable to process this." Escalations to humans aren't happening at all. What completes the design?`,
       opts:[
         {t:`Have the hook return a structured business error (retriable: false, with an explanation) and redirect the flow to the human escalation workflow — blocking without a redirect is only half the pattern.`, ok:true},
         {t:`Add a system prompt rule: "whenever you see 'blocked by policy', escalate the case to a human agent."`},
         {t:`Raise the block threshold so fewer refunds hit the ceiling and the dead-end occurs less often.`},
         {t:`Rewrite the hook's error message in friendlier language so the agent can relay it verbatim to customers.`},
       ],
       hint:`가이드의 훅 패턴은 "차단하고 ___한다" — 빈칸이 빠졌어. 그리고 재시도 3번은 어떤 필드가 없어서 생겼지? (2.2)`,
       explain:{
         good:`1.5의 완전형은 차단 + 대체 워크플로 리다이렉트. 그리고 재시도 낭비는 retriable: false가 없어서야(2.2). B가 최대 함정 — 동작은 하겠지만 확률적이고, 결정론적 리다이렉트가 이미 훅 패턴에 내장돼 있는데 프롬프트로 흉내 낼 이유가 없어.`,
         wrongs:[
           `<b>B — 에러 문구 감지 프롬프트:</b> 문구가 바뀌면 깨지는 확률적 연결 — 컴플라이언스 경로를 프롬프트에 맡기는 것.`,
           `<b>C — 임계값 완화:</b> 정책을 바꾸는 건 답이 아니야 — 남은 케이스는 여전히 막다른 길.`,
           `<b>D — 친절한 문구:</b> "안 됩니다"를 예쁘게 말할 뿐 — 에스컬레이션 부재는 그대로.`,
         ]},
       principle:"차단 + 리다이렉트 = 완전한 훅"},
    ]},

  /* ================= CH 7 · 1.7 ================= */
  { id:"p1c7", ch:"CH 7", title:"세션 상태·재개·포크 (1.7)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"세션을 다루는 도구 상자",
       html:`<p class="lead">1차 시험에서 당한 그 문제가 바로 이 챕터. 이번엔 확실하게.</p>
        <h4>용어 카드부터</h4>
        <ul>
          <li><strong>CLI</strong>: 명령어를 타이핑해서 프로그램을 조작하는 방식 (Claude Code가 이 방식)</li>
          <li><strong>플래그</strong>: 명령어 뒤에 붙이는 옵션 스위치 (예: <code>--resume</code>)</li>
          <li><strong>stale(스테일)</strong>: 그 사이 현실이 바뀌어서 기록이 더 이상 사실이 아닌 상태</li>
        </ul>
        <h4>세션 도구 두 개</h4>
        <ul>
          <li><code>--resume &lt;세션이름&gt;</code> — 이름 붙인 과거 대화를 <strong>그대로 이어서</strong> 계속</li>
          <li><code>fork_session</code> — 공통 분석 지점에서 <strong>독립 분기</strong>를 만들어 서로 다른 접근을 나란히 탐색</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"이어갈까, 새로 시작할까, 갈라질까 — 판단 기준",
       html:`__MAP:session__<p class="lead">시험이 묻는 건 기능이 아니라 <strong>선택 기준</strong>이야.</p>
        <h4>① 이어가기 (--resume)</h4>
        <ul>
          <li>조건: 이전 컨텍스트가 <strong>대체로 여전히 유효</strong>할 때</li>
          <li>파일이 일부 바뀌었다면: 재개하되 <strong>바뀐 파일을 알려줘서</strong> 그 부분만 재분석 (전체 재탐색 금지)</li>
        </ul>
        <h4>② 새 세션 + 구조화 요약 주입</h4>
        <ul>
          <li>조건: 이전 세션의 <strong>도구 결과가 stale</strong>할 때 (그 사이 코드·데이터가 많이 바뀜)</li>
          <li>이유: stale한 도구 결과를 이어받으면 <strong>낡은 사실 위에서 추론</strong>하게 됨</li>
          <li>방법: 핵심 결론만 구조화 요약으로 뽑아 <strong>새 세션 서두에 주입</strong></li>
          <li>💡 1차 기출 유형: "동료가 같은 프로젝트에서 다른 대화를 진행한 뒤 작업 재개" → 이쪽이 정답</li>
        </ul>
        <h4>③ 갈라지기 (fork_session)</h4>
        <ul>
          <li>조건: <strong>같은 분석 기반</strong>에서 <strong>서로 다른 접근 두 개</strong>를 비교하고 싶을 때</li>
          <li>예: 코드베이스 분석까지 해놓고 → 테스트 전략 A안/B안을 각 분기에서 탐색</li>
          <li>이점: 분석을 두 번 안 해도 되고, 두 탐색이 서로를 오염시키지 않음</li>
        </ul>
        <div class="callout">🎯 시험 포인트: "resume vs 새 세션+요약"의 갈림길은 <b>도구 결과의 신선도</b>. 지문에서 "그 사이 무엇이 바뀌었는가"를 찾아라.</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1 — Three situations, three tools",
       q:`Three situations came up this week: (a) overnight, an automated dependency upgrade rewrote imports across the entire repo you analyzed yesterday; (b) since your last session you renamed one class across 5 files; (c) on top of a completed analysis, you want to evaluate two competing caching strategies side by side. Which mechanism matches each situation?`,
       opts:[
         {t:`(a) new session with a structured summary of prior conclusions; (b) --resume, informing the agent of the specific rename for targeted re-analysis; (c) fork_session into two branches from the shared baseline.`, ok:true},
         {t:`(a) --resume with a note to "be careful about changes"; (b) new session with a summary; (c) explore both strategies sequentially in the old session.`},
         {t:`(a) fork_session to preserve the original analysis; (b) --resume without mentioning the rename; (c) two brand-new sessions, one per strategy.`},
         {t:`New sessions with structured summaries for all three — any file change invalidates a session's tool results.`},
       ],
       hint:`판단 축은 두 개야: 변경의 '범위'(광범위 vs 특정적)와 작업의 '목적'(잇기 vs 비교). 세 케이스가 세 도구의 존재 이유와 1:1이야.`,
       explain:{
         good:`stale은 변경 범위로 판단해: 광범위(a) → 새 세션+요약, 특정적(b) → resume+고지+타겟 재분석. 비교 탐색(c) → fork. 세 도구를 한 문제에서 갈라 쓰는 게 실전 난이도야.`,
         wrongs:[
           `<b>B — (a)에 "조심해" resume:</b> 뭐가 낡았는지 특정 못 하는 미봉책 + (b)의 유효한 분석을 버리는 낭비 — 둘 다 반대로.`,
           `<b>C — (a)에 fork:</b> 분기도 stale 분석을 물려받아 — fork는 신선도 해법이 아니야. (b) 무고지 resume은 낡은 이름 전제 위험.`,
           `<b>D — 전부 새 세션:</b> "변경 = 무조건 stale"이 아니야 — (b)에서 대규모 분석을 불필요하게 폐기.`,
         ]},
       principle:"범위로 stale 판단, 목적으로 도구 선택"},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 2 — 'It will notice on its own'",
       q:`Before resuming yesterday's analysis session, you mention the team refactored two modules overnight. A teammate waves it off: "No need to tell the session — Claude re-reads files when it needs them, so it'll notice the changes on its own." What is the flaw in this reasoning?`,
       opts:[
         {t:`The session's history still contains conclusions and analysis built on the old code; the agent frequently reasons from those recorded conclusions without re-reading the underlying files — explicit notification is what triggers targeted re-analysis.`, ok:true},
         {t:`There is no flaw — file reads always return current content, so resumed sessions are self-correcting.`},
         {t:`The flaw is that resumed sessions cannot re-read files at all; only fresh sessions get file access.`},
         {t:`The flaw is that Claude Code locks previously analyzed files, so overnight changes couldn't have landed anyway.`}],
       hint:`파일을 '다시 읽으면' 최신인 건 맞아. 그런데 세션이 항상 다시 읽을까? 히스토리에 이미 '결론'이 적혀 있다면?`,
       explain:{
         good:`동료 말은 절반만 진실이라 위험해. 파일 내용은 다시 읽으면 최신이지만, 세션은 히스토리에 기록된 자기 결론을 신뢰해서 재독 없이 그 위에서 추론하는 경우가 많아. 그래서 1.7이 "변경 사실을 알려서 타겟 재분석을 유도하라"고 명시한 거야.`,
         wrongs:[
           `<b>B — 자기 교정 신화:</b> 읽기는 최신이어도 '읽기로 결정하는 것' 자체가 낡은 결론에 좌우돼.`,
           `<b>C — 재독 불가:</b> 존재하지 않는 제약 — 재개 세션도 파일을 읽을 수 있어.`,
           `<b>D — 파일 잠금:</b> 역시 존재하지 않는 동작 — 허구 기능 보기.`,
         ]},
       principle:"기록된 결론이 재독을 막는다 — 고지가 트리거"},
    ]},
  ]
};
