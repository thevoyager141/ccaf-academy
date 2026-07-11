/* PART 6 — 시나리오 실전: 시험이 나오는 무대 6곳 */
window.CCAF_CONTENT.p6 = {
  id: "p6",
  lessons: [

  /* ===== 시나리오 ① 고객지원 해결 에이전트 ===== */
  { id:"p6s1", ch:"①", title:"고객지원 해결 에이전트", scenario:"s1",
    steps:[
      {type:"concept", kind:"SCENARIO BRIEFING", h:"무대 ① — Customer Support Resolution Agent",
       html:`<p class="lead">실제 시험 지문: Agent SDK로 만든 고객지원 에이전트. 반품·결제 분쟁·계정 이슈 같은 <strong>모호성 높은 요청</strong>을 처리.</p>
        <h4>시스템 구성 (지문에 명시되는 것)</h4>
        <ul>
          <li>MCP 도구 4종: <code>get_customer</code> · <code>lookup_order</code> · <code>process_refund</code> · <code>escalate_to_human</code></li>
          <li>목표: <strong>첫 접촉 해결률(FCR) 80%+</strong>, 단 넘겨야 할 때를 아는 것 포함</li>
          <li>주 도메인: <strong>D1 + D2 + D5</strong></li>
        </ul>
        <h4>이 무대의 단골 판단 포인트</h4>
        <ul>
          <li>신원 확인 순서 강제 → <strong>프로그램적 게이트</strong> (프롬프트 아님)</li>
          <li>금액 상한·정책 규칙 → <strong>차단 훅 + 대체 경로</strong></li>
          <li>에스컬레이션 3대 트리거 vs 감정·신뢰도 (가짜 지표)</li>
          <li>긴 대화의 금액·날짜 보존 → <strong>case facts 블록</strong></li>
          <li>실패 응답 → <strong>errorCategory·isRetryable</strong> 구조화</li>
        </ul>
        <div class="callout">🎯 무대 ①의 정답 냄새: "돈이 걸린 규칙"이 보이면 결정론적 강제, "고객이 사람 찾으면" 존중, "요약하다 숫자 날아가면" 요약 밖 금고.</div>`},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S1-1 — Two issues, one gap",
       q:`A customer message contains two requests: (a) a refund for order #B-2210, fully covered by your return policy, and (b) compensation for "emotional distress," which your policy does not address at all. What is the correct handling?`,
       opts:[
         {t:`Decompose the message; resolve the refund autonomously since it's within policy, and escalate the compensation request to a human with a structured summary, since the policy is silent on it.`, ok:true},
         {t:`Escalate the entire conversation — mixed requests are too risky to partially automate.`},
         {t:`Resolve the refund and politely decline the compensation, since undefined requests default to denial.`},
         {t:`Offer a small goodwill credit for the distress claim to close both issues in one contact.`}],
       hint:`두 요청의 성격이 달라 — 하나는 정책 안, 하나는 정책의 침묵. 각각의 처방이 뭐였지?`,
       explain:{good:`멀티 컨선 분해(1.4) + 정책 공백 에스컬레이션(5.2)의 결합. 할 수 있는 건 하고, 정책이 침묵하는 건 지어내지 말고 넘겨 — 구조화 요약과 함께.`,
         wrongs:[`<b>B:</b> 정책 안의 환불까지 넘기는 과잉 에스컬레이션 — FCR 붕괴.`,`<b>C:</b> 거절도 정책 발명이야. 정책은 금지한 적 없어.`,`<b>D:</b> 크레딧 발명은 더 적극적인 정책 창작 — 감사에서 걸릴 행동.`]},
       principle:"할 수 있는 건 하고, 공백은 넘긴다", ts:"5.2"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S1-2 — The distinguishable failures",
       q:`process_refund can fail three ways: the payments service times out; the refund exceeds the order amount (invalid input); the order is past the return window (policy). Currently all three return {"isError": true, "message": "refund failed"}. Which redesign lets the agent respond correctly to each?`,
       opts:[
         {t:`Return structured metadata per failure: errorCategory ("transient"/"validation"/"business"), isRetryable (true only for the timeout), and a human-readable description — with a customer-friendly explanation for the policy case.`, ok:true},
         {t:`Add a system prompt rule describing the three failure types so the agent can guess which occurred.`},
         {t:`Return isError only for the timeout, and success-with-warning for the other two.`},
         {t:`Standardize on retrying every failure twice before telling the customer anything.`}],
       hint:`에이전트가 "무슨 종류의 실패인지" 알아야 재시도/수정/설명 중 하나를 고를 수 있어. 그 정보는 누가 줘야 하지?`,
       explain:{good:`에러 4분류 + isRetryable + 설명(2.2)의 정석 적용. 타임아웃은 재시도, 검증 오류는 입력 수정, 정책 위반은 고객 설명으로 — 도구가 분류를 줘야 에이전트가 갈라 탈 수 있어.`,
         wrongs:[`<b>B:</b> 같은 메시지에서 유형을 '추측'하라는 건 정보 없이 찍기.`,`<b>C:</b> 실패를 성공으로 위장 — 검증 오류가 승인된 것처럼 보여.`,`<b>D:</b> 정책 위반 재시도는 낭비, 무조건 2회는 분류의 반대말.`]},
       principle:"원칙 ⑤ 실패는 구조화", ts:"2.2"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S1-3 — The forgotten agreement",
       q:`In a 40-turn dispute conversation, the agent agreed to refund $312.40 by March 15. Twenty turns later — after summarization kicked in — it offers "a refund of the appropriate amount at the earliest convenience." The customer is furious. Beyond this ticket, what systemic fix prevents recurrence?`,
       opts:[
         {t:`Extract agreed amounts, dates, order numbers and statuses into a persistent case-facts block that is excluded from summarization and injected into every prompt.`, ok:true},
         {t:`Reduce the summarization frequency so agreements survive longer in raw form.`},
         {t:`Instruct the summarizer to write longer, more detailed summaries.`},
         {t:`Have the agent re-ask the customer for the agreed amount when unsure.`}],
       hint:`요약이라는 압축기에 합의 내용이 들어가면 뭉개져. 합의는 어디 보관해야 했지?`,
       explain:{good:`5.1의 case facts 패턴: 거래 사실은 요약 파이프라인 밖 구조화 블록에. 압축을 안 거치니 뭉개질 수 없고, 매 프롬프트에 원형 그대로 들어가.`,
         wrongs:[`<b>B:</b> 늦출 뿐 — 대화가 더 길어지면 같은 사고.`,`<b>C:</b> "자세히 요약해"도 압축은 압축 — 확률적.`,`<b>D:</b> 고객에게 자기 약속을 되묻는 건 신뢰 파괴의 완성.`]},
       principle:"숫자는 요약 밖 금고에", ts:"5.1"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S1-4 — The stubborn 5%",
       q:`Policy requires a verified receipt before any refund over $100. You strengthened the system prompt twice and added few-shot examples; the violation rate dropped from 9% to 5% but won't reach zero. Compliance demands zero. What does this situation tell you, and what is the fix?`,
       opts:[
         {t:`Prompt-based guidance is probabilistic and cannot guarantee compliance; implement a programmatic prerequisite that blocks process_refund above $100 until receipt verification has completed.`, ok:true},
         {t:`Add more diverse few-shot examples until the remaining 5% is covered.`},
         {t:`Lower the threshold to $50 so violations matter less individually.`},
         {t:`Fine-tune a custom model on compliant conversations to internalize the rule.`}],
       hint:`9% → 5%로 '줄었다'는 게 핵심 단서야. 프롬프트 개선의 천장이 어디였지?`,
       explain:{good:`1.4의 핵심 구분: 프롬프트는 실패율을 줄일 뿐 0으로 못 만들어. "zero"가 요구되는 순간 답은 프로그램적 게이트 하나뿐.`,
         wrongs:[`<b>B:</b> 예시를 늘려도 확률의 성질은 안 변해 — 같은 축 위의 미세 조정.`,`<b>C:</b> 요구사항을 바꾸는 건 답이 아니야 — 위반은 여전히 위반.`,`<b>D:</b> 파인튜닝도 확률적 + 대형 인프라 — 이중 과잉.`]},
       principle:"원칙 ① zero가 필요하면 코드로", ts:"1.4"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S1-5 — Two angry customers",
       q:`Two simultaneous chats: (a) a furious customer, caps-lock and threats, whose issue is a standard address change the agent can do in one step; (b) a calm, polite customer requesting a warranty extension your policy doesn't mention anywhere. Which handling is correct?`,
       opts:[
         {t:`(a) Acknowledge the frustration and complete the address change immediately; (b) escalate to a human, because the policy is silent on warranty extensions.`, ok:true},
         {t:`(a) Escalate due to the hostile tone; (b) resolve autonomously since the customer is cooperative.`},
         {t:`Escalate both — one is emotionally risky, the other has no policy coverage.`},
         {t:`Resolve both autonomously — an agent should maximize first-contact resolution.`}],
       hint:`감정은 난이도의 지표가 아니었지. 에스컬레이션을 결정하는 건 뭐였지?`,
       explain:{good:`5.2의 핵심 대비: 감정 ≠ 복잡도. (a)는 능력 안의 단순 작업 — 불만 인정 + 즉시 해결. (b)는 정책 공백 — 태도가 아무리 협조적이어도 에이전트가 정책을 지어낼 순 없어.`,
         wrongs:[`<b>B:</b> 정확히 거꾸로 — 감정 기반 에스컬레이션 + 정책 발명.`,`<b>C:</b> (a)까지 넘기면 FCR 붕괴 — 과잉.`,`<b>D:</b> (b) 자율 해결 = 보증 정책 창작.`]},
       principle:"감정이 아니라 정책과 능력으로", ts:"5.2"},
    ]},

  /* ===== 시나리오 ② Claude Code 코드 생성 ===== */
  { id:"p6s2", ch:"②", title:"Claude Code 코드 생성", scenario:"s2",
    steps:[
      {type:"concept", kind:"SCENARIO BRIEFING", h:"무대 ② — Code Generation with Claude Code",
       html:`<p class="lead">실제 시험 지문: 팀이 Claude Code로 코드 생성·리팩토링·디버깅·문서화를 가속. 커스텀 커맨드와 CLAUDE.md로 워크플로에 통합.</p>
        <h4>시스템 구성</h4>
        <ul>
          <li>커스텀 슬래시 커맨드 · CLAUDE.md 설정 · plan mode vs 직접 실행 판단</li>
          <li>주 도메인: <strong>D3 + D5</strong> (설정 계층·스킬·세션·컨텍스트)</li>
        </ul>
        <h4>이 무대의 단골 판단 포인트</h4>
        <ul>
          <li>"어디에 두나": 커맨드·스킬·규칙·CLAUDE.md의 <strong>스코프와 로딩 시점</strong></li>
          <li>plan mode 3조건 (대규모·복수 접근·아키텍처) vs 명확한 단일 수정</li>
          <li>세션 재개 판단: <strong>변경의 범위</strong>가 stale을 결정</li>
          <li>긴 세션의 컨텍스트 열화 → 스크래치패드·Explore·단계 요약</li>
        </ul>
        <div class="callout">🎯 무대 ②의 정답 냄새: "팀 전체", "자동으로", "새 팀원" 같은 단어가 나오면 스코프 문제. "그 사이 코드가 바뀜"이 나오면 세션 신선도 문제.</div>`},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S2-1 — The conflicting conventions",
       q:`A senior dev's Claude Code generates code with tabs and semicolons; everyone else's uses the team standard (spaces, no semicolons). Investigation shows the team standard lives in the project CLAUDE.md, and the senior dev has personal formatting rules in ~/.claude/CLAUDE.md. What is happening, and what should change?`,
       opts:[
         {t:`Both files load together and the user-level personal rules are interfering; the senior dev should remove the conflicting personal formatting rules so the shared project standard governs team code.`, ok:true},
         {t:`The project CLAUDE.md is corrupted for that developer and should be re-cloned.`},
         {t:`User-level files always override project files by design, so the team standard should move to every developer's user level.`},
         {t:`Add a stronger "ignore personal preferences" instruction to the project CLAUDE.md.`}],
       hint:`사용자 레벨 + 프로젝트 레벨은 '함께' 로드돼. 충돌하는 지시 두 벌이 같이 들어가면 무슨 일이 생길까?`,
       explain:{good:`3.1 계층의 실전형: 두 레벨이 동시에 로드되니 상충 지시가 섞여 — 팀 작업엔 개인 포맷 규칙을 빼는 게 맞아. /memory로 어떤 파일이 로드됐는지 확인하는 게 진단 루트.`,
         wrongs:[`<b>B:</b> 파일 손상 증거가 없어 — 증상은 정확히 '개인 규칙 존재'와 일치.`,`<b>C:</b> 팀 표준을 각자 사용자 레벨로 = 공유·버전 관리 포기, 표류 시작.`,`<b>D:</b> 지시로 지시를 이기려는 확률적 씨름 — 원인 제거가 답.`]},
       principle:"계층은 겹쳐 로드된다 — 충돌 원인 제거", ts:"3.1"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S2-2 — The scaffold skill",
       q:`You're building a team skill that scaffolds new API endpoints: it must create files from templates (write operations required), must never execute shell commands, and requires an endpoint name that developers keep omitting. Which SKILL.md frontmatter configuration is right?`,
       opts:[
         {t:`allowed-tools limited to file write/read operations (excluding Bash), plus argument-hint for the endpoint name; context: fork is optional since scaffold output is compact.`, ok:true},
         {t:`context: fork alone — isolation prevents both shell execution and missing arguments.`},
         {t:`argument-hint alone — once the name is provided, the skill body can enforce the tool rules.`},
         {t:`No frontmatter needed; state all three requirements clearly in the skill's prompt body.`}],
       hint:`요구를 옵션에 1:1로 붙여봐 — "절대 셸 금지"는 어떤 옵션만이 보장하지?`,
       explain:{good:`3.2 frontmatter의 역할 분담: 도구 차단은 allowed-tools(강제), 필수 인자는 argument-hint. fork는 장황한 출력 격리용이라 이 스킬엔 필수 아님 — 옵션의 목적을 정확히 아는지 묻는 문제.`,
         wrongs:[`<b>B:</b> fork는 컨텍스트 격리만 — 도구도 인자도 통제 안 해.`,`<b>C:</b> 프롬프트 본문의 "셸 금지"는 확률적 — Bash가 도구 목록에 있으면 쓸 수 있어.`,`<b>D:</b> 셋 다 확률에 맡기는 최약체 구성.`]},
       principle:"원칙 ① 강제는 frontmatter로", ts:"3.2"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S2-3 — Three tasks, three modes?",
       q:`Monday's queue: (a) fix a null-pointer crash with a stack trace pointing to one line in payment.ts; (b) migrate the ORM library used across 60+ files; (c) add a feature that could reasonably be built three different ways with different infra costs. Which mode assignment is correct?`,
       opts:[
         {t:`(a) direct execution; (b) plan mode to investigate, then direct execution to implement; (c) plan mode to compare the approaches before committing.`, ok:true},
         {t:`Plan mode for all three — planning never hurts.`},
         {t:`Direct execution for all three — experienced teams don't need plan mode.`},
         {t:`(a) plan mode since payments are critical; (b) direct execution to save time; (c) direct execution with the first approach that comes to mind.`}],
       hint:`판단 3문답: 접근이 여러 개인가? 파일이 많은가? 정답 경로가 이미 명확한가?`,
       explain:{good:`3.4의 세 판단 기준을 한 번에: 명확한 단일 수정 = direct / 대규모 = plan→direct 조합 / 복수 접근 = plan. 조합 패턴(b)까지 아는지 묻는 구성.`,
         wrongs:[`<b>B:</b> (a)에 plan은 낭비 — 스택 트레이스가 이미 답을 줬어.`,`<b>C:</b> 60파일 마이그레이션 무계획 실행 = 재작업 예약.`,`<b>D:</b> 중요도와 복잡도를 혼동 — 크리티컬해도 명확하면 direct.`]},
       principle:"모드는 복잡도로, 중요도로 아님", ts:"3.4"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S2-4 — The long migration",
       q:`Your ORM migration will take two weeks of daily Claude Code sessions. You want each day to build on prior analysis without re-exploring, and colleagues merge small PRs daily that touch some analyzed files. Which session strategy fits?`,
       opts:[
         {t:`Use a named session with --resume each day, informing the agent at the start of each day which files changed since yesterday so it re-analyzes only those.`, ok:true},
         {t:`Start a fresh session every morning and re-run the full codebase analysis for accuracy.`},
         {t:`Resume the named session daily without mentioning changes — daily PRs are too small to matter.`},
         {t:`Fork the session every morning so each day's work is isolated from the last.`}],
       hint:`매일의 변경은 '소규모·특정적'이야. 이럴 때 resume의 올바른 사용법에 한 가지가 더 붙었지?`,
       explain:{good:`1.7의 "resume + 변경 고지 + 타겟 재분석" 패턴: 대부분의 분석은 유효하고 변경은 특정적 — 매일 요약을 새로 만드는 것보다 효율적이고, 고지가 stale 위험을 막아.`,
         wrongs:[`<b>B:</b> 2주 × 전체 재분석 = 유효한 작업의 반복 폐기.`,`<b>C:</b> 고지 없는 resume은 낡은 파일 전제의 추론 위험 — '작아서 괜찮다'는 도박.`,`<b>D:</b> fork는 분기 비교용 — 매일 fork하면 어제 작업과 단절될 뿐.`]},
       principle:"resume + 변경 고지", ts:"1.7"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S2-5 — The three-hour refactor",
       q:`Hour three of a large refactoring session: Claude's suggestions increasingly cite "standard repository patterns" instead of the specific UserRepository and OrderService classes it analyzed in hour one, and it just proposed a change that conflicts with a constraint it identified earlier. What combination addresses this?`,
       opts:[
         {t:`Record key findings and constraints in scratchpad files as they're discovered and reference them in later prompts; for the next phase, summarize findings before continuing and consider /compact to clear verbose exploration output.`, ok:true},
         {t:`Ask Claude to "remember the constraints from earlier" at each step.`},
         {t:`Restart the session and redo the analysis with instructions to be more careful.`},
         {t:`Switch to a model with a larger context window so nothing falls out.`}],
       hint:`"구체적 클래스 → 일반 패턴"으로의 후퇴, 이 증상의 이름이 뭐였지? 그리고 대화 '밖'의 대응 수단은?`,
       explain:{good:`컨텍스트 열화(5.4)의 시그니처와 3종 대응: 스크래치패드(외부 기록) + 단계 요약 + /compact. 기록이 기억을 대신하게 만드는 구조적 처방.`,
         wrongs:[`<b>B:</b> 밀려난 기억은 지시로 소환 안 돼.`,`<b>C:</b> 재시작 + 재분석은 비용 재지불, 새 세션도 3시간 뒤 같은 열화.`,`<b>D:</b> 창이 커져도 주의력 품질과 열화는 그대로.`]},
       principle:"기록이 기억을 대신한다", ts:"5.4"},
    ]},

  /* ===== 시나리오 ③ 멀티에이전트 리서치 ===== */
  { id:"p6s3", ch:"③", title:"멀티에이전트 리서치 시스템", scenario:"s3",
    steps:[
      {type:"concept", kind:"SCENARIO BRIEFING", h:"무대 ③ — Multi-Agent Research System",
       html:`<p class="lead">실제 시험 지문: 코디네이터가 전문 서브에이전트들에 위임 — 웹 검색 / 문서 분석 / 종합(synthesis) / 리포트 생성. 출처가 달린 종합 리포트가 목표.</p>
        <h4>시스템 구성</h4>
        <ul>
          <li>허브-앤-스포크: 모든 통신은 코디네이터 경유</li>
          <li>주 도메인: <strong>D1 + D2 + D5</strong></li>
        </ul>
        <h4>이 무대의 단골 판단 포인트</h4>
        <ul>
          <li>결과가 이상하면 <strong>분해 로그부터</strong> — 범인은 대개 코디네이터</li>
          <li>컨텍스트는 <strong>프롬프트에 명시 전달</strong> + 내용/메타데이터 분리</li>
          <li>병렬 = 한 응답에 Task 여러 개</li>
          <li>실패 전파 4요소, 부분 결과 + 커버리지 주석</li>
          <li>출처: claim-source 매핑, 발행일 필수, 충돌은 둘 다 주석</li>
        </ul>
        <div class="callout">🎯 무대 ③의 정답 냄새: "서브에이전트끼리 직접 얘기하게 하자"는 보기는 관측성 파괴로 거의 항상 오답. "임의로 하나를 고른다"도 마찬가지.</div>`},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S3-1 — Writing the coordinator's orders",
       q:`Your coordinator's prompts to the search subagent currently read like scripts: "First query X, then query Y, then if results < 5, query Z..." On novel topics the agent follows the script even when it clearly doesn't fit. How should coordinator prompts be designed instead?`,
       opts:[
         {t:`Specify the research goal and quality criteria (coverage, source diversity, recency) and let the subagent adapt its approach to what it finds.`, ok:true},
         {t:`Write longer scripts covering more topic types so novel cases are anticipated.`},
         {t:`Remove instructions entirely — subagents perform best with maximum freedom.`},
         {t:`Have the coordinator revise the script mid-task each time results disappoint.`}],
       hint:`절차를 시키면 절차를 따르고, 목표를 주면 적응해. 가이드 1.3의 프롬프트 설계 원칙이 뭐였지?`,
       explain:{good:`1.3 명시: 코디네이터 프롬프트는 단계별 절차가 아니라 목표·품질 기준을 명시 — 그래야 서브에이전트가 상황에 적응해. 스크립트는 예측 못 한 주제에서 경직돼.`,
         wrongs:[`<b>B:</b> 스크립트를 늘리는 건 경직성의 확장 — 세상 모든 주제를 열거할 순 없어.`,`<b>C:</b> 기준 없는 자유는 품질 복불복 — 목표·기준은 필요해.`,`<b>D:</b> 매번 수동 개입은 위임의 목적 상실 + 왕복 폭증.`]},
       principle:"절차 말고 목표와 기준", ts:"1.3"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S3-2 — The tempting shortcut",
       q:`An engineer proposes: "Let the synthesis agent message the search agent directly when it needs more sources — cutting the coordinator out saves a round trip." The system currently routes everything through the coordinator. What is the correct evaluation?`,
       opts:[
         {t:`Reject it: routing through the coordinator preserves observability, consistent error handling, and controlled information flow; for the frequent simple lookups, give synthesis a scoped verify_fact tool instead.`, ok:true},
         {t:`Accept it: fewer hops always means better latency, and agents coordinate fine peer-to-peer.`},
         {t:`Accept it but log the direct messages so observability is retained.`},
         {t:`Reject it and instead forbid the synthesis agent from ever needing verification.`}],
       hint:`허브-앤-스포크가 존재하는 이유 3가지 + 왕복 오버헤드의 공식 처방(85/15)을 합쳐봐.`,
       explain:{good:`1.2의 구조 원칙과 2.3의 scoped tool 처방 결합: 직접 통신은 관측성·에러 일관성·정보 통제를 깨. 지연 문제는 좁은 전용 도구로 풀어 — 구조를 깨지 않고.`,
         wrongs:[`<b>B:</b> 홉 수 최적화가 구조 파괴를 정당화하지 않아 — 디버깅 불가 시스템이 돼.`,`<b>C:</b> 로그는 사후 기록일 뿐, 에러 처리 일관성과 정보 통제는 여전히 깨져.`,`<b>D:</b> 검증 필요는 합성의 본질 — 금지는 품질 포기.`]},
       principle:"구조는 지키고, 병목은 좁은 도구로", ts:"1.2"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S3-3 — The budget squeeze",
       q:`Your report-generation agent has a tight context budget, but upstream subagents return full reasoning chains — thousands of tokens of "I searched X, considered Y, then..." — alongside their findings. Reports are missing late-arriving findings as a result. What is the systemic fix?`,
       opts:[
         {t:`Modify the upstream agents to return structured data — key facts, citations, relevance scores — instead of verbose content and reasoning chains.`, ok:true},
         {t:`Give the report agent a larger context window allocation and keep upstream output unchanged.`},
         {t:`Have the report agent summarize each upstream payload before using it.`},
         {t:`Drop the findings from the slowest subagent to fit the budget.`}],
       hint:`하류가 빠듯할 때 고치는 건 하류가 아니라 어디였지?`,
       explain:{good:`5.1 명시: 다운스트림 예산이 빠듯하면 업스트림이 구조화 데이터만 반환하게 수정. 추론 사슬은 상류의 작업 노트지 하류의 입력이 아니야.`,
         wrongs:[`<b>B:</b> 창을 늘려도 잡음 비율은 그대로 — 잠식은 계속.`,`<b>C:</b> 하류에서 요약하면 이미 예산을 쓴 뒤 + 요약 손실 추가.`,`<b>D:</b> 커버리지를 버리는 건 리서치 목적 훼손.`]},
       principle:"상류에서 구조화", ts:"5.1"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S3-4 — Writing the honest report",
       q:`Your synthesis produced: (a) a claim supported by five independent sources, (b) a claim where two credible sources directly disagree, and (c) a subtopic where the only source was paywalled and unavailable. How should the final report present these?`,
       opts:[
         {t:`Structure the report with explicit sections: (a) under well-established findings; (b) under contested findings with both values and their source attributions; (c) flagged as a coverage gap due to source unavailability.`, ok:true},
         {t:`Include (a) and the more recent value from (b); omit (c) so the report reads cleanly.`},
         {t:`Present all three uniformly — distinguishing them injects editorial bias.`},
         {t:`Hold the report until (b) is resolved and (c)'s source becomes available.`}],
       hint:`확립/논쟁/공백 — 세 상태를 리포트에서 어떻게 구분하라고 했지?`,
       explain:{good:`5.6(확립 vs 논쟁 구분, 충돌 주석) + 5.3(커버리지 주석)의 결합. 정직한 리포트는 자신의 확신 수준과 빈 곳을 명시해 — 독자가 잘못된 확신을 갖지 않게.`,
         wrongs:[`<b>B:</b> 최신 우선 임의 선택 + 공백 은폐 — 두 안티패턴의 합작.`,`<b>C:</b> 구분이 곧 정보야 — 균일 처리가 오히려 왜곡.`,`<b>D:</b> 외부 사정에 무기한 인질 — 부분 진행 + 주석이 정석.`]},
       principle:"확신 수준을 명시하는 리포트", ts:"5.6"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S3-5 — The overreaching analyst",
       q:`Logs show your document-analysis subagent occasionally calls web search tools mid-analysis "to fill gaps," producing untracked sources that bypass the search agent's quality filters. The analysis agent has access to 11 tools including the full search suite. What is the right fix?`,
       opts:[
         {t:`Restrict the analysis agent's toolset to its role (document processing); when it identifies gaps, it should report them to the coordinator, which delegates additional search to the search agent.`, ok:true},
         {t:`Keep the tools but instruct the agent to prefer document analysis over searching.`},
         {t:`Let it search but require it to copy the search agent's quality filter prompt.`},
         {t:`Remove all tools from the analysis agent and route every operation through the coordinator.`}],
       hint:`전문 밖 도구를 주면 오용한다 — 그리고 빈틈 발견은 누구에게 보고해야 했지?`,
       explain:{good:`2.3(역할별 스코핑) + 1.2(코디네이터 경유): 분석 에이전트의 검색은 품질 필터 우회 + 출처 추적 이탈. 빈틈은 코디네이터에 보고 → 검색 전문가에 위임이 구조적 정답.`,
         wrongs:[`<b>B:</b> 도구가 있으면 쓴다 — 지시는 확률적, 접근 제거가 결정론적.`,`<b>C:</b> 프롬프트 복사는 전문성 복제가 아니야 — 역할 혼합은 그대로.`,`<b>D:</b> 문서 처리 도구까지 뺏으면 일을 못 해 — 필요 이상 자르는 과잉.`]},
       principle:"원칙 ④ 역할 밖 도구는 제거", ts:"2.3"},
    ]},

  /* ===== 시나리오 ④ 개발자 생산성 도구 ===== */
  { id:"p6s4", ch:"④", title:"개발자 생산성 도구", scenario:"s4",
    steps:[
      {type:"concept", kind:"SCENARIO BRIEFING", h:"무대 ④ — Developer Productivity with Claude",
       html:`<p class="lead">실제 시험 지문: 엔지니어가 낯선 코드베이스를 탐색하고, 레거시(오래된 기존 코드)를 이해하고, 보일러플레이트(매번 반복되는 기본 틀 코드)를 생성하고, 반복 작업을 자동화하는 Agent SDK 도구.</p>
        <h4>시스템 구성</h4>
        <ul>
          <li>내장 도구 사용: <strong>Read · Write · Bash · Grep · Glob</strong> + MCP 서버 통합</li>
          <li>주 도메인: <strong>D2 + D3 + D1</strong></li>
        </ul>
        <h4>이 무대의 단골 판단 포인트</h4>
        <ul>
          <li>상황 → 내장 도구 매칭 (이름=Glob, 내용=Grep, Edit 실패=Read+Write)</li>
          <li>점진적 탐색: 진입점부터, 전부 읽기 금지</li>
          <li>MCP: 커뮤니티 서버 vs 커스텀, 설명 품질, 리소스 카탈로그</li>
          <li>범용 도구 → 제약된 대안 (fetch_url → load_document)</li>
          <li>열린 과제 → 동적 분해 + Explore 격리</li>
        </ul>
        <div class="callout">🎯 무대 ④의 정답 냄새: "전부 읽고 시작", "알파벳 순서로", "표준 연동인데 커스텀 제작" 보기는 오답 장치.</div>`},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S4-1 — Tracing through the wrappers",
       q:`You must find every place the deprecated formatCurrency function is effectively used. The catch: three wrapper modules re-export it under different names (formatMoney, toCurrencyString, fmtC). What is the correct tracing strategy?`,
       opts:[
         {t:`First identify all exported names for the function across the wrapper modules, then Grep for each name across the codebase.`, ok:true},
         {t:`Grep only for "formatCurrency" — wrappers will show up as callers anyway.`},
         {t:`Glob for files named "*currency*" and read them.`},
         {t:`Read the entire codebase once so no usage can hide.`}],
       hint:`래퍼가 이름을 바꿔 내보내면, 검색해야 할 이름이 하나가 아니지.`,
       explain:{good:`2.5의 래퍼 추적 패턴: export된 모든 이름을 먼저 수집 → 각 이름을 전체 검색. 원래 이름만 찾으면 별명으로 쓰인 사용처를 전부 놓쳐.`,
         wrongs:[`<b>B:</b> formatMoney로 쓰는 코드는 formatCurrency 검색에 안 걸려 — 마이그레이션 구멍.`,`<b>C:</b> 파일명과 함수 사용처는 무관.`,`<b>D:</b> 전부 읽기는 컨텍스트 폭발 안티패턴.`]},
       principle:"이름을 모으고, 이름마다 Grep", ts:"2.5"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S4-2 — Build or borrow",
       q:`Your team needs two MCP integrations: (a) standard Jira issue tracking, and (b) your company's proprietary internal deployment approval system. What is the recommended sourcing decision?`,
       opts:[
         {t:`Use an existing community MCP server for Jira; build a custom server only for the proprietary approval system.`, ok:true},
         {t:`Build both in-house for consistency and full control.`},
         {t:`Use community servers for both — someone has probably built an approval-system server.`},
         {t:`Skip MCP and give the agent raw HTTP tools to call both APIs directly.`}],
       hint:`표준 연동과 팀 고유 워크플로 — 가이드가 그은 선이 어디였지?`,
       explain:{good:`2.4 명시: 표준 연동(Jira)은 커뮤니티 서버, 커스텀 제작은 팀 고유 워크플로에만. 유지보수 비용을 아껴 진짜 필요한 곳에 쓰는 판단.`,
         wrongs:[`<b>B:</b> Jira 서버 재발명은 유지보수 낭비 — "통제"는 필요가 아니라 취향.`,`<b>C:</b> 사내 전용 시스템의 커뮤니티 서버는 존재할 수 없어.`,`<b>D:</b> 원시 HTTP 도구는 MCP의 표준화·설명·에러 구조를 전부 버리는 후퇴.`]},
       principle:"표준은 빌리고, 고유한 것만 만든다", ts:"2.4"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S4-3 — The dangerous fetcher",
       q:`Your productivity agent has a generic fetch_url tool for retrieving internal documentation. Logs show it occasionally fetching arbitrary external URLs found inside code comments, once pulling content from an expired domain now serving spam. What is the best fix?`,
       opts:[
         {t:`Replace fetch_url with a constrained load_document tool that validates URLs against the internal documentation domains before fetching.`, ok:true},
         {t:`Add a system prompt rule: "only fetch internal documentation URLs."`},
         {t:`Keep fetch_url but log all fetches for weekly security review.`},
         {t:`Remove fetching entirely and paste documentation into prompts manually.`}],
       hint:`범용 도구가 사고를 치면 처방은 지시가 아니라 도구 자체를 어떻게 하는 거였지?`,
       explain:{good:`2.3 명시 패턴 그대로: 범용 도구를 제약된 대안으로 교체 (fetch_url → 검증하는 load_document). 도구 계약 수준에서 막으면 결정론적이야.`,
         wrongs:[`<b>B:</b> 지시는 확률적 — 코멘트 속 URL의 유혹은 반복돼.`,`<b>C:</b> 사후 로그는 스팸을 이미 읽은 뒤 — 예방이 아니야.`,`<b>D:</b> 자동화 포기 — 필요 이상 자르는 과잉.`]},
       principle:"범용 도구는 제약된 대안으로", ts:"2.3"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S4-4 — The adaptive generator",
       q:`"Generate boilerplate CRUD code for every entity in this legacy system" — but entities are scattered, some use inheritance patterns, and several have undocumented interdependencies you'll only discover mid-task. Which decomposition fits?`,
       opts:[
         {t:`Dynamic decomposition: map the entity structure first, identify groups and dependencies, build a prioritized plan, and adapt it as interdependencies surface.`, ok:true},
         {t:`A fixed pipeline: list entities alphabetically and generate CRUD for each in order.`},
         {t:`Generate everything in one large pass so all entities share context.`},
         {t:`Ask the user to document all interdependencies first, then run a fixed plan.`}],
       hint:`"작업 중에야 발견되는 의존성" — 이 문구가 가리키는 분해 방식은?`,
       explain:{good:`1.6: 중간 발견이 다음 할 일을 결정하는 열린 과제 = 동적 분해. 구조 매핑 → 우선순위 → 발견에 따른 조정.`,
         wrongs:[`<b>B:</b> 알파벳 순회는 의존성을 무시 — 상속 부모보다 자식을 먼저 만들면 깨져.`,`<b>C:</b> 통짜 처리 = 주의력 희석 + 컨텍스트 한계.`,`<b>D:</b> 문서화가 안 돼 있다는 게 전제 — 그걸 요구하는 건 과제 반려지 수행이 아니야.`]},
       principle:"발견이 계획을 바꾸는 과제 = 동적 분해", ts:"1.6"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S4-5 — The catalog play",
       q:`Every session, your agent spends its first several turns calling list_schemas, list_tables, and describe_table to rediscover the same database structure before answering the actual question. The structure changes maybe once a month. What MCP capability fixes this efficiently?`,
       opts:[
         {t:`Expose the database schema as an MCP resource — a content catalog visible to the agent without exploratory tool calls.`, ok:true},
         {t:`Cache the discovery calls' results in the system prompt and update the prompt monthly by hand.`},
         {t:`Create a run_all_discovery tool that batches the three calls into one.`},
         {t:`Accept the cost — discovery calls guarantee freshness every session.`}],
       hint:`"행동"이 아니라 "뭐가 있는지 보여주기"가 필요한 상황 — MCP의 어떤 기능이었지?`,
       explain:{good:`2.4: 리소스 = 콘텐츠 카탈로그(스키마·문서 계층) 노출 → 탐색성 호출 자체가 사라져. 도구는 행동, 리소스는 목록이라는 역할 구분.`,
         wrongs:[`<b>B:</b> 수동 갱신은 잊히고, 잊히면 낡은 스키마로 추론.`,`<b>C:</b> 세 번을 한 번으로 포장해도 매 세션 탐색 비용은 남아.`,`<b>D:</b> 월 1회 변화에 매 세션 재발견은 신선도가 아니라 낭비.`]},
       principle:"카탈로그는 리소스로", ts:"2.4"},
    ]},

  /* ===== 시나리오 ⑤ CI/CD 통합 ===== */
  { id:"p6s5", ch:"⑤", title:"Claude Code CI/CD 통합", scenario:"s5",
    steps:[
      {type:"concept", kind:"SCENARIO BRIEFING", h:"무대 ⑤ — Claude Code for Continuous Integration",
       html:`<p class="lead">실제 시험 지문: CI/CD 파이프라인에 Claude Code 통합 — 자동 코드 리뷰, 테스트 생성, PR 피드백. 실행 가능한 피드백과 낮은 오탐이 목표.</p>
        <h4>시스템 구성</h4>
        <ul>
          <li>비대화형 실행(-p) · 구조화 출력(--output-format json + --json-schema) · CLAUDE.md 컨텍스트</li>
          <li>주 도메인: <strong>D3 + D4</strong></li>
        </ul>
        <h4>이 무대의 단골 판단 포인트</h4>
        <ul>
          <li>실존 플래그 3종 vs 허구 플래그 (CLAUDE_HEADLESS, --batch)</li>
          <li>오탐 → 범주형 기준 + 문제 범주 일시 비활성</li>
          <li>생성 세션 ≠ 리뷰 세션 (독립 인스턴스)</li>
          <li>대형 PR → 파일별 + 통합 패스</li>
          <li>블로킹(머지 전) = 실시간 / 논블로킹(야간) = 배치</li>
        </ul>
        <div class="callout">🎯 무대 ⑤의 정답 냄새: "신뢰를 잃었다"가 나오면 기준·범주 문제. "일관성이 없다"가 나오면 패스 분리나 실물 예시.</div>`},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S5-1 — Generator, meet reviewer",
       q:`Your pipeline stage generates a code patch with Claude, then — in the same session — appends "now review your patch carefully for bugs before we merge." Post-merge defect rates are no better than having no review at all. What is the structural explanation and fix?`,
       opts:[
         {t:`The session retains its generation reasoning and won't genuinely question its own decisions; run the review as a separate pipeline step with an independent Claude instance that receives only the patch and review criteria.`, ok:true},
         {t:`The review instruction is too soft — demand it "find at least five issues."`},
         {t:`Reviews need extended thinking enabled to reach sufficient depth.`},
         {t:`Merge timing is the issue — run the same-session review twice with a delay.`}],
       hint:`세션에 남아 있는 '무엇'이 자기 비판을 막았지? 지시 강도의 문제가 아니야.`,
       explain:{good:`4.6 + 3.6의 세션 격리 원칙: 생성 맥락이 남은 세션은 자기 결정을 옹호해. CI에선 리뷰를 별도 스텝 + 독립 인스턴스로 — 패치와 기준만 주고.`,
         wrongs:[`<b>B:</b> 개수 강요는 억지 오탐 제조기 — 신뢰 하락의 지름길.`,`<b>C:</b> 같은 맥락 안의 더 깊은 사고 = 더 정교한 자기 설득.`,`<b>D:</b> 지연·반복은 편향을 못 지워.`]},
       principle:"생성과 리뷰는 다른 세션", ts:"4.6"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S5-2 — The severity lottery",
       q:`Your CI review bot's severity labels gate merges (critical blocks, minor doesn't). Developers found identical hardcoded-credential findings labeled critical on Monday and minor on Thursday, and now dispute every blocked merge. The prompt defines severities in one abstract sentence each. What is the fix?`,
       opts:[
         {t:`Define each severity level with explicit criteria and concrete code examples (e.g., hardcoded credentials → critical, with a sample), so identical issues classify identically.`, ok:true},
         {t:`Let developers vote on severity when they disagree with the bot.`},
         {t:`Remove severity levels and block merges on any finding.`},
         {t:`Average severity across three review runs to smooth the variance.`}],
       hint:`"serious problems" 같은 추상 정의가 흔들림의 원인이야. 정의에 뭘 붙여야 일관돼지지?`,
       explain:{good:`4.1: 심각도 일관성은 레벨별 명시 기준 + 구체적 코드 예시에서 나와. 게이트 역할일수록 분류가 재현 가능해야 신뢰가 유지돼.`,
         wrongs:[`<b>B:</b> 투표는 분류 체계 포기 — 봇의 존재 이유 상실.`,`<b>C:</b> 전부 차단은 minor 오탐 하나에도 팀이 멈춰 — 과잉.`,`<b>D:</b> 3회 평균은 비용 3배로 비일관성을 가리는 화장.`]},
       principle:"게이트의 기준은 실물 예시로", ts:"4.1"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S5-3 — Splitting the workload",
       q:`Your CI runs two Claude workloads: (1) a security check that must pass before any merge, and (2) generation of candidate test cases for yesterday's merged code, reviewed by developers each morning. Costs are high. Which architecture is correct?`,
       opts:[
         {t:`Keep the security check on the synchronous API (blocking, needs immediate results); move the nightly test generation to the Message Batches API for the 50% savings, correlating results by custom_id.`, ok:true},
         {t:`Move both to the Batches API and poll aggressively so the security check rarely waits long.`},
         {t:`Move both to the synchronous API — reliability matters more than cost.`},
         {t:`Alternate weekly between APIs and compare bills.`}],
       hint:`둘 중 하나만 사람이 결과를 기다려. 배치의 자격 조건이 뭐였지?`,
       explain:{good:`4.5의 분류 적용: 블로킹(머지 게이트) = 실시간, 논블로킹(야간 생성) = 배치. 각 워크로드를 맞는 API에 — 절반 비용은 기다릴 수 있는 쪽에서만 가져와.`,
         wrongs:[`<b>B:</b> "rarely waits"는 SLA가 아니야 — 24시간 케이스 하나가 전 팀을 세워.`,`<b>C:</b> 야간 작업에 실시간 단가는 순수 낭비 — 신뢰성과 무관.`,`<b>D:</b> A/B는 이미 답이 정해진 질문에 실험 비용을 내는 것.`]},
       principle:"블로킹 여부가 API를 정한다", ts:"4.5"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S5-4 — The malformed comments",
       q:`Your pipeline parses Claude's review output to post inline PR comments. About 15% of runs fail parsing: the model returns prose intros ("Here are the issues I found..."), inconsistent field names, or unquoted strings. You already use -p. What completes the setup?`,
       opts:[
         {t:`Add --output-format json with --json-schema defining the findings structure, so output is machine-parseable and schema-conforming instead of free-form text.`, ok:true},
         {t:`Post-process the output with regex to strip prose and normalize field names.`},
         {t:`Add a prompt instruction: "respond with valid JSON only, no commentary."`},
         {t:`Retry failed runs until they happen to produce parseable output.`}],
       hint:`-p는 비대화형일 뿐이야. 출력의 '형태'를 강제하는 플래그 조합이 따로 있었지?`,
       explain:{good:`3.6의 구조화 출력 플래그: --output-format json + --json-schema가 형태를 강제해. 프롬프트 부탁이 아니라 계약 — 15%의 형식 복불복이 사라져.`,
         wrongs:[`<b>B:</b> 정규식 세탁은 필드명 변형마다 깨지는 두더지 잡기.`,`<b>C:</b> 지시는 확률적 — 85%는 원래도 됐어, 문제는 나머지 15%.`,`<b>D:</b> 재시도 룰렛은 비용만 태우는 비결정론 수용.`]},
       principle:"형태는 플래그로 계약", ts:"3.6"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S5-5 — Rebuilding trust",
       q:`Developer trust in your review bot collapsed: its "code duplication" category has an 85% false-positive rate (it flags idiomatic test setup as duplication), and devs now dismiss even its accurate security findings. What is the correct recovery sequence?`,
       opts:[
         {t:`Temporarily disable the duplication category to restore trust in the remaining categories; improve its prompt with explicit criteria and contrast examples (idiomatic setup vs real duplication); re-enable only after it passes on a labeled test set.`, ok:true},
         {t:`Keep all categories on but add a banner asking developers to bear with the bot while it improves.`},
         {t:`Delete the duplication category permanently and expand the security category to compensate.`},
         {t:`Reset trust by renaming the bot and relaunching it with identical behavior.`}],
       hint:`오탐 범주 하나가 전체 신뢰를 무너뜨릴 때의 3단계 처방 — 끄고, 고치고, 증명하고.`,
       explain:{good:`4.1의 신뢰 복구 절차 완결판: 문제 범주 일시 비활성 → 명시 기준 + 대비쌍으로 개선 → 라벨 데이터로 검증 후 재활성. 신뢰는 데이터로 회복해.`,
         wrongs:[`<b>B:</b> 노이즈를 계속 쏘면서 양해를 구하는 건 신뢰 하락 가속.`,`<b>C:</b> 영구 삭제는 개선 검증도 없이 가치를 포기.`,`<b>D:</b> 이름만 바꾼 같은 봇 — 첫 오탐에 들통나고 신뢰는 더 깊이 추락.`]},
       principle:"끄고 → 고치고 → 증명하고", ts:"4.1"},
    ]},

  /* ===== 시나리오 ⑥ 구조화 데이터 추출 ===== */
  { id:"p6s6", ch:"⑥", title:"구조화 데이터 추출", scenario:"s6",
    steps:[
      {type:"concept", kind:"SCENARIO BRIEFING", h:"무대 ⑥ — Structured Data Extraction",
       html:`<p class="lead">실제 시험 지문: 비정형 문서에서 정보를 추출해 JSON 스키마로 검증하고, 높은 정확도를 유지하며 다운스트림 시스템과 연동.</p>
        <h4>시스템 구성</h4>
        <ul>
          <li>tool_use + JSON 스키마 · Pydantic 검증 · 배치 처리 · 인간 리뷰 라우팅</li>
          <li>주 도메인: <strong>D4 + D5</strong></li>
        </ul>
        <h4>이 무대의 단골 판단 포인트</h4>
        <ul>
          <li>required + 정보 부재 = 환각 → <strong>nullable</strong></li>
          <li>enum엔 <strong>"other"+상세 / "unclear"</strong> 출구</li>
          <li>재시도 가능(형식) vs 불가(정보 부재) 판별</li>
          <li>집계 정확도의 함정 → 세그먼트 분해 + 층화 표집</li>
          <li>신뢰도는 <strong>보정 후에만</strong> 라우팅 기준</li>
        </ul>
        <div class="callout">🎯 무대 ⑥의 정답 냄새: "strict 스키마로 다 해결" 보기는 문법≠의미 함정. "무조건 재시도"는 정보 부재 판별 실패.</div>`},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S6-1 — The invented signatory",
       q:`Your contract extractor's schema requires counterparty_signatory (the person who signed for the other party). For unsigned draft contracts — which have no signatory at all — the model outputs plausible executive names pulled from the letterhead. What is the correct fix?`,
       opts:[
         {t:`Make counterparty_signatory nullable so drafts return null, and add a document_status field (enum: signed/draft/unclear) so downstream systems know why.`, ok:true},
         {t:`Add a prompt warning: "do not guess signatories under any circumstances."`},
         {t:`Filter out extracted names that also appear in the letterhead.`},
         {t:`Route all contracts to human review since extraction can't be trusted.`}],
       hint:`초안엔 서명자가 '없다' — required 스키마가 없는 것에 어떻게 반응했지?`,
       explain:{good:`4.3의 nullable 원칙 + enum 상태 필드 결합: 구조가 정직한 null을 허용해야 환각이 멈춰. 상태 필드는 다운스트림이 null의 의미를 알게 해.`,
         wrongs:[`<b>B:</b> 구조가 강요하는 걸 지시로 막는 확률전 — 진 싸움.`,`<b>C:</b> 레터헤드 밖에서 지어낸 이름은 통과 — 우회로만 좁힌 필터.`,`<b>D:</b> 전량 인간 리뷰는 자동화 포기 — 스키마 수정이면 될 일에.`]},
       principle:"없을 수 있으면 nullable + 상태 필드", ts:"4.3"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S6-2 — Which failures to retry",
       q:`Overnight extraction results: 312 documents failed Pydantic validation with type errors (dates as strings); 89 returned null for tax_registration_number, which your auditors confirmed only exists in separate registry documents; 23 have line items that don't sum to stated totals. What is the correct triage?`,
       opts:[
         {t:`Retry the 312 with error feedback (format errors are fixable from the source); don't retry the 89 (information absent — route for registry lookup or accept null); flag the 23 via calculated-vs-stated comparison fields for review, since the source data itself may conflict.`, ok:true},
         {t:`Retry all 424 failures with error feedback — retries are cheap relative to manual work.`},
         {t:`Retry nothing; all three groups indicate the model is unfit for this document type.`},
         {t:`Retry the 89 with higher temperature so the model searches more creatively.`}],
       hint:`세 그룹의 실패 원인이 다 달라 — 형식 / 정보 부재 / 원본 모순. 각각의 처방을 매칭해봐.`,
       explain:{good:`4.4의 트리아지 완결판: 형식 오류만 재시도가 통하고, 정보 부재는 몇 번을 돌려도 없고, 합계 불일치는 self-check 필드로 표면화해 사람이 봐야 해.`,
         wrongs:[`<b>B:</b> 89건 재시도는 낭비이자 환각 유도 — 없는 걸 찾으라 조르는 것.`,`<b>C:</b> 312건은 명백히 고쳐지는 실패 — 전면 포기는 과잉.`,`<b>D:</b> temperature로 '창의적으로 찾기' = 지어내기 요청.`]},
       principle:"실패 원인별로 다른 경로", ts:"4.4"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S6-3 — The calibration step",
       q:`You want to auto-approve extractions the model is confident about and route the rest to reviewers. The model outputs a confidence score per field. A pilot shows fields marked 0.9+ confidence are actually correct only 78% of the time. What must happen before confidence-based routing goes live?`,
       opts:[
         {t:`Calibrate the scores against a labeled validation set — map raw model confidence to observed accuracy, and set routing thresholds on the calibrated values.`, ok:true},
         {t:`Raise the auto-approval threshold from 0.9 to 0.95 to be safe.`},
         {t:`Ask the model to be more honest about its confidence in the prompt.`},
         {t:`Abandon confidence routing and review a random 20% instead.`}],
       hint:`"0.9라고 말했는데 실제론 78%" — 이 간극을 메우는 작업의 이름이 뭐였지?`,
       explain:{good:`5.5의 보정 원칙: 원시 자기 보고 점수는 과신 편향이 있어. 라벨 세트로 "모델의 0.9 = 실제 78%"를 측정하고, 실측 기반 임계값으로 라우팅해야 안전해.`,
         wrongs:[`<b>B:</b> 보정 없는 임계값 조정은 눈금 없는 저울에서 추 옮기기.`,`<b>C:</b> 정직 요청으로 보정이 되면 보정이라는 개념이 없었겠지.`,`<b>D:</b> 무작위 20%는 위험 집중 없이 자원만 소모 — 라우팅의 하위 호환.`]},
       principle:"신뢰도는 보정 후에만 기준", ts:"5.5"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S6-4 — The missing dimension",
       q:`Your extraction pipeline reports 96% overall field accuracy. A month after auto-approving high-confidence extractions, Finance discovers that handwritten-annotation invoices — 4% of volume — have a 61% error rate that was invisible in the aggregate. Which two practices would have caught this before and after launch?`,
       opts:[
         {t:`Before launch: validate accuracy segmented by document type and field, not just in aggregate. After launch: stratified random sampling of auto-approved extractions to continuously measure error rates and catch novel patterns.`, ok:true},
         {t:`Before: raise the overall accuracy bar to 99%. After: wait for downstream teams to report anomalies.`},
         {t:`Before: double the validation set size. After: re-run the same validation set quarterly.`},
         {t:`Before and after: trust field-level confidence scores to surface problem documents.`}],
       hint:`평균이 숨긴 4%를 잡는 도구 두 개 — 출시 전 하나, 출시 후 하나.`,
       explain:{good:`5.5의 두 축: 세그먼트 분해 검증(출시 전) + 층화 표집 감시(출시 후). 96% 평균 아래 61% 세그먼트가 숨는 게 집계 지표의 함정이야.`,
         wrongs:[`<b>B:</b> 99% 평균도 평균 — 같은 함정의 높은 버전. 고객을 탐지기로 쓰는 건 최악의 사후 대응.`,`<b>C:</b> 같은 세트를 키우고 반복해도 신규 유형(손글씨)은 세트에 없어.`,`<b>D:</b> 미보정 신뢰도는 낯선 유형에서 오히려 과신해 — S6-3의 교훈.`]},
       principle:"평균을 쪼개고, 표본으로 감시", ts:"5.5"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S6-5 — Format chaos",
       q:`Source invoices write dates as "3/4/25", "April 3, 2025", and "2025-04-03", and amounts as "1.234,56 €" or "$1,234.56". Your schema stores dates as ISO 8601 and amounts as numeric USD-normalized values. Extraction output is structurally valid but values are inconsistently normalized. What does the guide prescribe?`,
       opts:[
         {t:`Include explicit format-normalization rules in the prompt alongside the strict output schema — the schema enforces structure, the rules govern how varied source formats map into it.`, ok:true},
         {t:`Loosen the schema to accept dates and amounts as raw strings, normalizing later in code.`},
         {t:`Reject documents whose formats differ from ISO 8601 at intake.`},
         {t:`Run a second model pass that re-normalizes the first pass's output.`}],
       hint:`스키마는 '형태'만 강제해. 형식이 제각각인 원본을 그 형태에 '어떻게' 담을지는 어디에 적었지?`,
       explain:{good:`4.3 명시: 정규화 규칙을 스키마와 함께 프롬프트에 동봉. 스키마(구조)와 규칙(변환 방법)은 역할이 달라 — 둘이 함께 있어야 일관된 값이 나와.`,
         wrongs:[`<b>B:</b> 원시 문자열 수용은 구조화의 목적 후퇴 — 코드 정규화는 "April 3"의 무한 변형과 싸우게 돼.`,`<b>C:</b> 현실 문서를 거부하는 파이프라인은 파이프라인이 아니야.`,`<b>D:</b> 2패스 비용 + 첫 패스 모호값은 2패스도 못 살려.`]},
       principle:"스키마 + 정규화 규칙 동봉", ts:"4.3"},
    ]},
  ]
};
