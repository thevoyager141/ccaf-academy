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
          <li>종료 판단은 <strong>stop_reason이 유일한 정석</strong> — <code>"end_turn"</code>이면 멈추고, <code>"tool_use"</code>면 도구 실행 후 계속</li>
          <li><strong>④ 결과 추가까지가 한 바퀴</strong> — 도구 결과를 대화 기록에 붙이지 않으면 Claude는 결과를 못 봄</li>
        </ul>
        <h4>안티패턴 3종 (오답 보기 단골)</h4>
        <ul>
          <li>반복 횟수 상한을 <strong>주 종료 조건</strong>으로 사용 — 안전장치는 보조일 때만 정당</li>
          <li>응답에 <strong>텍스트가 있는지</strong>로 완료 판단 — 도구 요청과 텍스트는 같이 나올 수 있음</li>
          <li>"완료했습니다" 같은 <strong>자연어 신호 파싱</strong> — 표현이 바뀌면 깨짐</li>
        </ul>
        <div class="callout">🎯 시험 포인트: "그럴듯한 안전장치"를 주 종료 조건으로 승격시킨 보기가 단골 오답 장치.</div>`},
      {type:"quiz", kind:"PRACTICE · 영어 출제", h:"Practice 1 — Loop termination",
       q:`You are implementing the agentic loop for a customer support agent built with the Claude API. Which loop control design is correct?`,
       opts:[
         {t:`Continue the loop while stop_reason is "tool_use", executing the requested tools and appending results to the conversation; terminate when stop_reason is "end_turn".`, ok:true},
         {t:`Terminate the loop once it reaches a fixed maximum of 10 iterations.`},
         {t:`Terminate the loop whenever the assistant's response contains any text content, since text indicates the final answer.`},
         {t:`Terminate the loop when the response contains a completion phrase such as "task complete".`},
       ],
       hint:`Claude가 스스로 "왜 말을 멈췄는지" 알려주는 공식 라벨이 있었지? 그 라벨 말고 다른 걸 종료 신호로 쓰면 어떤 문제가 생길까?`,
       explain:{
         good:`stop_reason은 모델이 공식적으로 알려주는 상태 신호라서, 이걸 기준으로 한 제어 흐름이 유일하게 신뢰할 수 있는 정석이야.`,
         wrongs:[
           `<b>B — fixed maximum of 10 iterations:</b> 작업이 9회에 끝나든 11회가 필요하든 기계적으로 잘라. 상한은 폭주 방지용 보조 장치일 때만 정당해.`,
           `<b>C — response contains any text:</b> Claude는 도구를 요청하면서 중간 설명 텍스트를 같이 낼 수 있어. 텍스트 존재 ≠ 작업 완료.`,
           `<b>D — completion phrase 감지:</b> 자연어는 계약이 아니야. "task complete"가 안 나오거나 다르게 표현되면 그대로 깨져.`,
         ]},
       principle:"원칙 ① 판단은 공식 신호로, 추측 금지"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2 — The iteration cap proposal",
       q:`Your research agent occasionally loops more than 20 times on complex topics, consuming excessive tokens. A teammate proposes making a 15-iteration cap the primary termination condition. What is the most appropriate design decision?`,
       opts:[
         {t:`Keep stop_reason-based termination as the primary mechanism, and add the iteration cap as a secondary safety guard that logs an alert when triggered.`, ok:true},
         {t:`Adopt the 15-iteration cap as the primary termination condition to eliminate cost overruns.`},
         {t:`Require user confirmation at every iteration so loop length stays under control.`},
         {t:`Detect completion phrases such as "search complete" in the response text and terminate early.`},
       ],
       hint:`문제의 근본 원인은 "루프가 길다"가 아니라 "왜 길어지는가"야. 정상적으로 16회가 필요한 작업이 있다면 15회 컷은 무슨 일을 일으킬까?`,
       explain:{
         good:`정석 종료(stop_reason)를 유지하면서 상한을 '보조 안전망 + 관측 신호'로 쓰는 게 정답. 정상 작업을 자르지 않으면서 이상 동작도 잡을 수 있어.`,
         wrongs:[
           `<b>B — cap을 주 조건으로 승격:</b> 16회가 필요한 정상 작업까지 미완성으로 잘라버려. 증상만 덮고 원인은 그대로.`,
           `<b>C — 매 반복 사용자 확인:</b> 자율 실행이라는 에이전트의 존재 이유를 없애는 과잉 개입.`,
           `<b>D — 자연어 신호 감지:</b> Practice 1에서 본 안티패턴 그대로. 표현이 조금만 달라져도 깨져.`,
         ]},
       principle:"원칙 ② 증상 말고 근본 원인 · ③ 과잉 설계 금지"},
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
      {type:"quiz", kind:"PRACTICE · 영어 출제", h:"Practice 1 — Choosing a decomposition pattern",
       q:`Every pull request in your team must be reviewed for the same three aspects: security issues, test coverage, and API convention violations. Reviews analyzing all aspects at once produce shallow results. What is the most appropriate restructuring?`,
       opts:[
         {t:`Use prompt chaining: run three sequential focused passes (security, then coverage, then conventions), each with its own criteria.`, ok:true},
         {t:`Use dynamic decomposition so the agent decides at runtime which aspects seem worth reviewing for each PR.`},
         {t:`Keep the single pass but double the length of the review prompt to emphasize all three aspects equally.`},
         {t:`Train a separate classifier model to route each PR to the aspect most likely to contain issues.`},
       ],
       hint:`세 관점이 매번 똑같이 반복되는, 예측 가능한 작업이지? 이런 작업에 어울리는 분해 방식이 뭐였지?`,
       explain:{
         good:`관점이 고정돼 있고 매번 반복되는 예측 가능한 작업 → prompt chaining으로 초점화된 순차 패스를 도는 게 정석. 패스마다 주의력이 한 관점에 집중돼 깊이가 생겨.`,
         wrongs:[
           `<b>B — 동적 분해:</b> 세 관점은 "반드시 전부" 봐야 하는 요구사항이야. 에이전트가 고르게 두면 커버리지 구멍이 생겨.`,
           `<b>C — 프롬프트만 강화:</b> 한 번에 다 보는 구조가 원인(주의력 희석)인데 지시만 늘리는 건 증상 처치.`,
           `<b>D — 분류 모델 학습:</b> 모든 관점을 다 봐야 하는 요구와 어긋나고, 프롬프트 구조 개선으로 풀 문제에 ML 인프라를 들이는 과잉 설계.`,
         ]},
       principle:"원칙 ② 근본 원인 · ③ 과잉 설계 금지"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2 — Legacy test coverage",
       q:`You ask an agent to "add comprehensive tests to a legacy codebase" with almost no existing tests. Which decomposition approach is most effective?`,
       opts:[
         {t:`First map the codebase structure, identify high-impact areas, then build a prioritized plan that adapts as dependencies are discovered.`, ok:true},
         {t:`Process files in alphabetical order, generating a test file for each source file until the codebase is covered.`},
         {t:`Generate all tests in a single large pass so the agent can keep the whole codebase in context.`},
         {t:`Write a fixed step-by-step plan upfront and follow it exactly, since changing plans mid-task wastes tokens.`},
       ],
       hint:`이건 뭐가 나올지 모르는 열린 과제야. 계획을 고정해도 될까, 아니면 발견에 따라 조정해야 할까?`,
       explain:{
         good:`열린 조사 과제의 정석: 구조 매핑 → 고영향 영역 식별 → 우선순위 계획 + 발견에 따른 조정. 가이드가 명시한 동적 분해의 대표 케이스야.`,
         wrongs:[
           `<b>B — 알파벳 순회:</b> 중요도와 무관한 기계적 순서. 고영향 영역이 뒤로 밀리고 의존성도 무시돼.`,
           `<b>C — 한 번에 전부:</b> 주의력 희석 + 컨텍스트 한계. 대형 작업 통짜 처리는 단골 오답.`,
           `<b>D — 고정 계획:</b> 레거시는 파보기 전엔 몰라. 적응 없는 계획은 발견된 의존성을 반영 못 해.`,
         ]},
       principle:"원칙 ② 근본 원인 (작업 성격에 맞는 분해)"},
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
      {type:"quiz", kind:"PRACTICE · 영어 출제", h:"Practice 1 — The missing domains",
       q:`Your multi-agent research system runs on "the impact of AI on healthcare." Every subagent completes successfully, yet the final report only covers medical imaging. The coordinator's logs show it decomposed the topic into "AI in radiology," "AI in CT scan analysis," and "AI in diagnostic imaging." What is the most likely root cause?`,
       opts:[
         {t:`The coordinator's task decomposition is too narrow, so the subagent assignments never covered domains like drug discovery, patient care, or hospital operations.`, ok:true},
         {t:`The synthesis agent lacks instructions for identifying coverage gaps in the findings it receives.`},
         {t:`The web search agent's queries are not comprehensive enough and should be expanded.`},
         {t:`The document analysis agent is filtering out non-imaging sources due to overly strict relevance criteria.`},
       ],
       hint:`로그에 나온 세 개의 하위 작업을 봐. 전부 '영상의학' 계열이지? 그 할당을 만든 게 누구야?`,
       explain:{
         good:`로그가 근본 원인을 직접 보여줘: 코디네이터가 healthcare를 imaging 계열로만 분해했어. 하류 에이전트들은 할당받은 일을 정확히 수행했을 뿐이야.`,
         wrongs:[
           `<b>B — 합성 에이전트 탓:</b> 합성은 받은 발견만 조합할 수 있어. 애초에 안 들어온 도메인은 못 만들어내.`,
           `<b>C — 검색 쿼리 탓:</b> 검색 에이전트는 할당된 주제 안에서 검색했고 성공했어. 범위를 정한 건 코디네이터.`,
           `<b>D — 필터링 탓:</b> 분석 에이전트도 할당 범위 안에서 정상 동작. 증거(로그)와 무관한 추측.`,
         ]},
       principle:"원칙 ② 근본 원인 — 로그가 가리키는 곳"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2 — Filling the gaps",
       q:`After fixing decomposition, some reports still ship with thin coverage on subtopics where sources were scarce. What is the most effective structural remedy?`,
       opts:[
         {t:`Add an iterative refinement loop: the coordinator evaluates the synthesis output for gaps, re-delegates targeted queries to the search and analysis subagents, and re-invokes synthesis until coverage is sufficient.`, ok:true},
         {t:`Always run one additional general web search pass before synthesis, regardless of what the first pass found.`},
         {t:`Allow the synthesis agent to communicate directly with the search agent so it can request more sources without involving the coordinator.`},
         {t:`Lengthen the synthesis agent's prompt with instructions to write more comprehensively about every subtopic.`},
       ],
       hint:`빈틈은 매번 다른 곳에서 생겨. "무조건 한 번 더"가 아니라, 빈틈을 '평가하고 겨냥하는' 구조가 필요하지 않을까? 그리고 통신은 누구를 거쳐야 했지?`,
       explain:{
         good:`가이드의 반복 개선 루프 그대로: 평가 → 타겟 재위임 → 재합성. 빈틈이 어디 생기든 그곳을 겨냥해 메꾸는 구조라 근본 처방이야.`,
         wrongs:[
           `<b>B — 무조건 추가 검색:</b> 빈틈과 무관한 일반 검색은 명중률이 낮고 비용만 늘어. 겨냥이 없어.`,
           `<b>C — 서브에이전트 직접 통신:</b> 허브-앤-스포크 위반. 관측 가능성과 일관된 에러 처리가 깨져.`,
           `<b>D — 프롬프트로 "더 풍부하게":</b> 소스가 없는데 풍부하게 쓰라면 지어내기(환각)를 유도할 뿐.`,
         ]},
       principle:"원칙 ② 근본 원인 · ⑤ 통신은 구조를 따라"},
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
      {type:"quiz", kind:"PRACTICE · 영어 출제", h:"Practice 1 — The oblivious synthesizer",
       q:`In your research pipeline, the web search and document analysis subagents produce solid findings, but the synthesis subagent generates generic reports that ignore them. The coordinator invokes the synthesis agent with the prompt: "Synthesize the research findings into a report." What is the most likely cause?`,
       opts:[
         {t:`The findings were never included in the synthesis agent's prompt — subagents do not automatically inherit the coordinator's context, so the agent had nothing concrete to work with.`, ok:true},
         {t:`The synthesis agent's max_tokens setting is too low to produce detailed reports.`},
         {t:`The synthesis agent needs a higher temperature to engage more creatively with the material.`},
         {t:`The pipeline should re-run synthesis twice, since the first pass primes the agent's memory with the findings.`},
       ],
       hint:`합성 에이전트가 받은 프롬프트를 그대로 읽어봐. 그 안에 '발견'이 들어 있어? 서브에이전트가 코디네이터의 대화를 볼 수 있었나?`,
       explain:{
         good:`프롬프트에 발견이 없으면 서브에이전트에겐 존재하지 않는 정보야. 완전한 발견 + 출처 메타데이터를 프롬프트에 직접 포함하는 게 정석.`,
         wrongs:[
           `<b>B — max_tokens:</b> 출력 길이 설정은 "입력에 내용이 없다"는 문제와 무관해.`,
           `<b>C — temperature:</b> 창의성 조절로는 없는 정보가 생기지 않아.`,
           `<b>D — 두 번 실행:</b> 호출 사이에 메모리 공유는 없어. 두 번째 실행도 똑같이 빈손이야.`,
         ]},
       principle:"원칙 ② 근본 원인 — 컨텍스트는 명시적으로"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2 — Cutting latency",
       q:`Your coordinator researches three independent subtopics by invoking a search subagent for one topic, waiting for the result, then invoking the next — tripling total latency. How should the coordinator invoke the subagents to run them in parallel?`,
       opts:[
         {t:`Emit multiple Task tool calls in a single coordinator response, one per subtopic.`, ok:true},
         {t:`Invoke each subagent in a separate conversational turn but ask them to respond quickly.`},
         {t:`Merge all three subtopics into one subagent invocation so a single agent handles them together.`},
         {t:`Introduce an external message queue system that schedules subagent jobs asynchronously.`},
       ],
       hint:`병렬의 공식 방법이 뭐였지? 힌트: "한 응답 안에서".`,
       explain:{
         good:`가이드 명시 패턴: 병렬 실행 = 한 응답 안에 Task 호출 여러 개. 턴을 나누면 순차가 되고, 이 방식이면 세 검색이 동시에 돈다.`,
         wrongs:[
           `<b>B — 턴 분리 + 빨리 해달라기:</b> 구조적으로 순차 실행 그대로야. "빨리"는 지연을 못 줄여.`,
           `<b>C — 한 에이전트에 몰아주기:</b> 병렬이 아니라 직렬 처리 + 주의력 분산. 지연도 그대로.`,
           `<b>D — 외부 큐 시스템:</b> SDK가 이미 제공하는 병렬 수단을 두고 인프라를 새로 짓는 과잉 설계.`,
         ]},
       principle:"원칙 ③ 과잉 설계 금지 — 있는 기능부터"},
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
      {type:"quiz", kind:"PRACTICE · 영어 출제", h:"Practice 1 — The skipped verification",
       q:`Production data shows that in 8% of cases, your support agent calls process_refund using order details volunteered by the customer, without ever verifying identity through get_customer — occasionally refunding the wrong account. What change most effectively eliminates this failure mode?`,
       opts:[
         {t:`Add a programmatic prerequisite that blocks process_refund (and lookup_order) until get_customer has returned a verified customer ID.`, ok:true},
         {t:`Strengthen the system prompt to state that identity verification via get_customer is mandatory before any refund operation.`},
         {t:`Add few-shot examples demonstrating the agent calling get_customer first even when customers volunteer order details.`},
         {t:`Deploy a routing classifier that analyzes each request and enables only the tools appropriate for that request type.`},
       ],
       hint:`"8% of cases"라는 숫자가 핵심 단서야. 확률을 줄이는 방법과 0으로 만드는 방법 중, 돈이 걸린 문제엔 뭐가 필요할까?`,
       explain:{
         good:`금전 사고가 걸린 필수 순서는 프로그램적 전제조건으로 강제해야 실패율이 0이 돼. V2 샘플 1번과 동일한 논리.`,
         wrongs:[
           `<b>B — 프롬프트 강화:</b> 확률적 준수. 8%를 2%로 줄일 순 있어도 0%는 보장 못 해.`,
           `<b>C — few-shot:</b> 마찬가지로 확률을 높일 뿐. 토큰 비용만 추가.`,
           `<b>D — 라우팅 분류기:</b> 문제는 도구 '가용성'이 아니라 '순서'야. 원인과 다른 곳을 고치는 과잉 설계.`,
         ]},
       principle:"원칙 ① 강제는 프로그램으로"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2 — The handoff package",
       q:`Your agent escalates a billing dispute mid-process to a human agent who has no access to the conversation transcript. What should the escalation handoff contain?`,
       opts:[
         {t:`A structured summary including the customer ID, root cause analysis, the disputed/refund amount, and a recommended action.`, ok:true},
         {t:`A link to the full conversation transcript so the human agent can read the entire interaction.`},
         {t:`The customer's sentiment score history so the agent can gauge frustration before responding.`},
         {t:`The raw logs of every tool call the agent made during the session.`},
       ],
       hint:`받는 사람 입장에서 생각해봐. 대화록을 못 보는 상담사가 바로 일을 이어받으려면 뭐가 필요할까? 그리고 문제에 "no access to transcript"라고 이미 못 박았지?`,
       explain:{
         good:`가이드의 구조화 핸드오프 4요소 그대로: 고객 ID + 근본 원인 + 금액 + 권고 조치. 대화록 없이도 즉시 인수인계 가능한 최소 완전 정보야.`,
         wrongs:[
           `<b>B — 대화록 링크:</b> 문제 조건상 접근 불가고, 접근 가능해도 전체를 읽게 만드는 건 인수인계가 아니라 숙제 전가.`,
           `<b>C — 감정 점수:</b> 처리에 필요한 사실(누구, 왜, 얼마)이 없어. 감정은 사건의 대체물이 아니야.`,
           `<b>D — 원시 툴 로그:</b> 사람이 파싱해야 하는 원자료 덤프. 구조화 요약의 반대말.`,
         ]},
       principle:"원칙 ⑤ 실패·인계는 구조화해서 전달"},
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
          <li><strong>도구 호출 가로채기 훅</strong> — 나가는 도구 <strong>호출</strong>을 검사해서 정책 위반이면 차단·리다이렉트</li>
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
      {type:"quiz", kind:"PRACTICE · 영어 출제", h:"Practice 1 — Mixed formats",
       q:`Your agent uses three MCP tools from different backend teams: one returns Unix timestamps, another ISO 8601 strings, and a third numeric status codes. The agent occasionally misinterprets dates when reasoning across tool results. What is the most reliable fix?`,
       opts:[
         {t:`Implement a PostToolUse hook that normalizes all tool results into consistent formats before the model processes them.`, ok:true},
         {t:`Add instructions to the system prompt telling the model to convert all timestamps into a single format while reasoning.`},
         {t:`Ask each backend team to change their API response format to match a shared standard.`},
         {t:`Post-process only the agent's final answer, correcting any date inconsistencies before showing it to users.`},
       ],
       hint:`"모델이 보기 전에" 데이터를 손보는 길목이 있었지? 그리고 프롬프트로 시키는 방식의 한계가 뭐였지?`,
       explain:{
         good:`PostToolUse 훅이 정확히 이 용도야: 이질적인 도구 결과를 모델이 처리하기 전에 결정론적으로 정규화.`,
         wrongs:[
           `<b>B — 프롬프트 지시:</b> 확률적 준수. 매번 변환을 잘한다는 보장이 없고, 추론 부담만 늘어.`,
           `<b>C — 백엔드 팀에 요청:</b> 통제 밖 의존 + 오래 걸림. 내 파이프라인에서 해결 가능한 문제를 남에게 넘기는 것.`,
           `<b>D — 최종 답만 후처리:</b> 이미 잘못된 데이터로 추론한 뒤라 중간 판단 오류는 그대로 남아.`,
         ]},
       principle:"원칙 ① 강제는 프로그램으로 (정규화도 보장이 필요)"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2 — The refund ceiling",
       q:`Compliance requires that refunds above $500 must never be processed automatically — they must go to a human. How should this rule be implemented?`,
       opts:[
         {t:`Implement a tool call interception hook that blocks process_refund calls exceeding $500 and redirects the case to the human escalation workflow.`, ok:true},
         {t:`State clearly in the system prompt: "Never process refunds above $500; always escalate them to a human agent."`},
         {t:`Add few-shot examples showing the agent escalating high-value refunds instead of processing them.`},
         {t:`Remove process_refund from the agent's tool list entirely so no refunds can be processed automatically.`},
       ],
       hint:`"must never"라는 단어가 나오면 어떤 종류의 통제가 필요했지? 그리고 규칙은 $500 '초과'에만 적용된다는 점도 봐.`,
       explain:{
         good:`"never"는 결정론적 보장 요구 → 호출 가로채기 훅으로 차단하고, 대체 경로(에스컬레이션)까지 연결하는 게 완전한 정답.`,
         wrongs:[
           `<b>B — 시스템 프롬프트:</b> 확률적. 컴플라이언스 규칙을 프롬프트에 맡기면 감사에서 걸려.`,
           `<b>C — few-shot:</b> 같은 이유로 보장이 안 돼.`,
           `<b>D — 도구 제거:</b> $500 이하 정상 환불까지 막아버려. 규칙보다 과하게 자르는 것도 오답.`,
         ]},
       principle:"원칙 ① 강제는 프로그램으로 · ③ 필요 이상 자르지 않기"},
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
      {type:"quiz", kind:"PRACTICE · 영어 출제 (1차 기출 재현)", h:"Practice 1 — The stale session",
       q:`You paused work in a Claude session that had analyzed your codebase extensively. While you were away, a teammate ran a separate session on the same project, modifying many of the files your session had analyzed. What is the optimal way to continue your work with this new context?`,
       opts:[
         {t:`Start a new session and inject a structured summary of your prior conclusions, since the old session's tool results are now stale.`, ok:true},
         {t:`Resume your previous session with --resume, since it already contains the full analysis history.`},
         {t:`Resume your previous session and ask Claude to be cautious about possibly outdated information.`},
         {t:`Fork your previous session so the original stays intact while you continue in a branch.`},
       ],
       hint:`네 세션이 기억하는 파일 내용과 지금 실제 파일 내용이 같아? 그 도구 결과들의 상태를 뭐라고 불렀지?`,
       explain:{
         good:`동료의 수정으로 이전 세션의 도구 결과(파일 분석)가 stale해졌어. 이럴 땐 핵심 결론을 구조화 요약으로 뽑아 새 세션에 주입하는 게 더 신뢰적 — 가이드 1.7이 명시한 판단 기준이야.`,
         wrongs:[
           `<b>B — 그냥 resume:</b> 낡은 파일 분석 위에서 추론하게 돼. "히스토리가 많다"는 게 장점이 아니라 오염원이 된 상황.`,
           `<b>C — resume + 조심해달라기:</b> 뭐가 낡았는지 모델도 모르는데 조심하라는 건 확률적 미봉책.`,
           `<b>D — fork:</b> 분기해도 stale한 분석을 그대로 물려받아. fork는 '두 접근 비교'용이지 신선도 문제의 해법이 아니야.`,
         ]},
       principle:"원칙 ② 근본 원인 — stale이면 요약 + 새 출발"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2 — Two strategies, one baseline",
       q:`After a long session analyzing a shared codebase, you want to explore two different refactoring strategies — one incremental, one aggressive — and compare their implications without redoing the analysis. What is the best approach?`,
       opts:[
         {t:`Use fork_session to create two independent branches from the shared analysis baseline, exploring one strategy in each.`, ok:true},
         {t:`Start two fresh sessions and repeat the codebase analysis in each before exploring the strategies.`},
         {t:`Explore both strategies sequentially within the same session, one after the other.`},
         {t:`Resume the session twice in parallel terminals so both share the live conversation state.`},
       ],
       hint:`"같은 분석 기반 + 서로 다른 접근 비교" — 이 조합에 딱 맞는 도구가 있었지?`,
       explain:{
         good:`fork_session의 존재 이유 그 자체: 공통 분석 baseline에서 독립 분기 두 개를 만들어 나란히 탐색. 분석 재작업도 없고 상호 오염도 없어.`,
         wrongs:[
           `<b>B — 새 세션 두 개:</b> 유효한 분석을 두 번 다시 하는 낭비. stale하지 않은데 버릴 이유가 없어.`,
           `<b>C — 한 세션에서 순차:</b> 첫 전략의 탐색 내용이 컨텍스트에 남아 두 번째 탐색을 오염시켜. 공정한 비교 불가.`,
           `<b>D — 동시 resume:</b> 세션은 그런 공유 실시간 상태가 아니야. 존재하지 않는 동작을 전제한 보기.`,
         ]},
       principle:"원칙 ③ 과잉 설계 금지 — 목적에 맞는 도구"},
    ]},
  ]
};
