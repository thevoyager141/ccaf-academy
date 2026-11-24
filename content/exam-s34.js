/* 모의고사 문항 풀 확대: 시나리오 ③ 멀티에이전트 리서치(s3), ④ 개발자 생산성(s4)
   각 18문항 = 선택 비교형 10 + 부정형 4 + 복수응답 4
   exam-bank.js 이후에 로드함. 기존 문항은 수정하지 않고 추가만 함. */
(function(){
  if(window.__CCAF_EXAM_S34__) return; window.__CCAF_EXAM_S34__ = true;
  window.CCAF_EXAM_EXTRA = window.CCAF_EXAM_EXTRA || [];
  window.CCAF_EXAM_EXTRA.push(

  /* ═══════════ s3: 멀티에이전트 리서치 시스템 ═══════════ */

  /* --- D1 (6): 1.6 ×2 · 1.2 · 1.3 · 1.7 · 1.1 --- */

  {scenario:"s3", ts:"1.6", q:`Your research platform serves two recurring jobs. Job A is a monthly competitor brief: the same five sections (pricing, funding, hiring, product launches, patent filings) for the same eight companies, every month. Job B is "figure out why our enterprise renewals dropped in EMEA" — nobody yet knows which markets, contracts, or support incidents matter. An architect proposes one engine for both: the coordinator drafts a subtask list at the start of every run and never revises it. Which design is right?`,
   opts:[
     {t:`Give Job A a fixed sequential chain over its five known sections, and give Job B a plan that starts with a scoping pass and gains subtasks as each finding narrows the question — the two jobs differ in whether the subtasks can be listed before any evidence arrives.`, ok:true},
     {t:`Use the architect's single engine for both, since a subtask list written upfront makes both jobs auditable and comparable across runs.`},
     {t:`Use adaptive subtask generation for both jobs, because a coordinator that can revise its plan is never worse than one that cannot.`},
     {t:`Run Job B as a fixed chain too, but with a much longer subtask list so whichever areas turn out to matter are already covered.`}],
   explain:{good:`판별 기준은 "실행을 시작하는 시점에 하위작업(subtask)을 모두 적을 수 있는가"임. Job A는 매달 같은 다섯 항목을 다루므로 미리 적을 수 있음. Job B는 첫 증거가 나와야 다음 질문이 정해지므로 미리 적을 수 없음. 성격이 다른 두 작업을 하나의 엔진으로 처리하려는 것이 문제의 원인임.`,
     wrongs:[`<b>B(고정 목록이 감사에 유리):</b> 감사 가능성이라는 말 자체는 맞으므로 오답 유도 선택지임. 그러나 Job B는 처음에 목록을 적을 수 없으므로 고정 목록은 감사 기록이 아니라 빈칸 목록이 됨.`,`<b>C(항상 동적 분해):</b> 동적 방식이 항상 낫다는 전제가 틀림. 매달 같은 다섯 섹션에 매번 계획을 새로 세우면 월별 비교가 어려워지고 토큰만 더 소모함.`,`<b>D(목록을 길게):</b> 목록을 길게 늘려도 아직 드러나지 않은 조사 방향은 여전히 빠짐. 게다가 무관한 하위작업까지 실행되어 예산이 소모됨.`]},
   principle:"하위작업을 미리 적을 수 있는가: 이것이 판단 기준임"},

  {scenario:"s3", ts:"1.6", q:`A coordinator is six hours into "assess our exposure to the new cross-border data rules." So far it has surfaced three business units nobody listed at kickoff, and two of them use a vendor that was never in scope. Four changes are proposed for the next run. Which does the LEAST for this class of task?`,
   opts:[
     {t:`Raise the number of subagents run in parallel per wave from three to nine, so more of the plan finishes before the plan changes.`, ok:true},
     {t:`Have the coordinator re-examine its subtask list after every completed subagent report and append the subtasks the report implies.`},
     {t:`Require each subagent report to name any entity it encountered that no current subtask owns.`},
     {t:`Keep a running plan document that records each revision together with the finding that triggered it.`}],
   explain:{good:`병렬 실행 폭을 넓히는 것은 처리량에 대한 조치이며 "계획이 늦게 갱신된다"는 문제를 해결하지 못함. 오히려 계획이 갱신되기 전에 낡은 하위작업을 아홉 개씩 실행해 불필요한 작업이 늘어남. 나머지 셋은 모두 발견 결과를 계획으로 되돌리는 경로를 강화함.`,
     wrongs:[`<b>B(보고마다 목록 재검토):</b> 보고가 끝날 때마다 목록을 다시 검토하는 것이 동적 분해의 핵심 동작임. 미발견 사업부가 계속 나오는 현재 상황에 정확히 맞음.`,`<b>C(소속 없는 개체 보고):</b> 담당 하위작업이 없는 개체를 이름으로 보고하게 하면 새 하위작업의 근거가 자동으로 올라옴.`,`<b>D(개정 이력 기록):</b> 개정 이력을 남기면 계획을 변경해도 감사 추적이 유지됨. "고정해야 감사할 수 있다"는 오해를 해소하는 장치이기도 함.`]},
   principle:"부정형: 처리량을 늘려도 계획 갱신 문제는 해결되지 않음"},

  {scenario:"s3", ts:"1.2", q:`Your coordinator runs the full pipeline — web search, document analysis, synthesis, report generation — for every request. Telemetry over 2,000 requests: 46% were single-fact lookups like "what was Acme's 2024 headcount," and each cost an average of 41 seconds and four subagent invocations. Product wants sub-5-second lookups without losing depth on real research briefs. What changes?`,
   opts:[
     {t:`Have the coordinator read what the incoming request actually requires and invoke only the subagents it needs — a lookup goes to search and returns, while a brief still walks the whole pipeline.`, ok:true},
     {t:`Keep the full pipeline but cache lookup answers, so repeat questions return fast.`},
     {t:`Split the product into two systems with separate entry points and let users choose which one they are asking.`},
     {t:`Let the search subagent answer directly and bypass the coordinator for anything phrased as a question.`}],
   explain:{good:`코디네이터(coordinator)의 역할 중 하나가 "이 질의에 어느 서브에이전트(subagent)가 필요한가"를 판단하는 것임. 전체 파이프라인을 고정 호출하면 단순 조회 하나에 네 번의 위임을 소모함. 요구 사항을 먼저 읽고 선택적으로 위임하면 조회는 짧게 끝나고 리서치는 기존 깊이를 유지함.`,
     wrongs:[`<b>B(캐시):</b> 캐시는 반복되는 질문만 개선함. 처음 묻는 조회는 여전히 41초가 걸리므로 46% 중 대부분을 개선하지 못함. 개선처럼 보이는 오답 유도 선택지임.`,`<b>C(시스템 분리):</b> 사용자가 매번 "이것이 조회인가 리서치인가"를 판정하게 만드는 것은 시스템이 해야 할 판단을 사용자에게 넘기는 것임.`,`<b>D(코디네이터 우회):</b> 코디네이터를 건너뛰면 관측성, 일관된 오류 처리, 정보 흐름 통제가 한꺼번에 사라짐. 지연 시간 때문에 중심 조정자를 포기하는 대가가 너무 큼.`]},
   principle:"질의를 먼저 읽고 필요한 서브에이전트에만 위임함"},

  {scenario:"s3", ts:"1.3", multi:2, q:`A coordinator must launch four subagents at once: three independent source scans (EU filings, US filings, trade press) and one that summarizes whatever the other three return. Its spawning prompt for each currently reads "Continue the research." Which TWO changes does this wave require? (Select TWO.)`,
   opts:[
     {t:`Move the summarizing subagent out of the parallel wave — it consumes the other three, so it can only run after their results are back with the coordinator.`, ok:true},
     {t:`Write each scan subagent's prompt to stand on its own — the research question, its assigned jurisdiction, the source types in scope, the output shape expected — because none of them can see the coordinator's history.`, ok:true},
     {t:`Raise the coordinator's context limit so the four subagents have room to share it.`},
     {t:`Give all four subagents an identical prompt so their outputs stay comparable.`},
     {t:`Have each subagent watch the others' partial outputs so the summarizer can start early.`}],
   explain:{good:`병렬 실행은 작업이 서로 독립일 때만 성립함. 요약 서브에이전트는 나머지 셋의 결과를 입력으로 받으므로 다음 턴에 실행해야 함. 또한 서브에이전트는 코디네이터의 대화 히스토리(conversation history)를 볼 수 없으므로 프롬프트 하나가 그 서브에이전트에게 주어진 정보의 전부임. 이 두 가지가 1.3의 판단 기준임.`,
     wrongs:[`<b>C(컨텍스트 한도 상향):</b> 컨텍스트 창(context window) 한도는 나눠 쓰는 자원이 아님. 서브에이전트는 각자 격리된 컨텍스트에서 실행되므로 한도를 키워도 정보가 전달되지 않음.`,`<b>D(동일 프롬프트):</b> 프롬프트가 같으면 셋이 같은 관할을 조사해 중복만 늘어남. 비교 가능성은 출력 스키마를 맞춰서 확보하는 것이지 입력을 같게 해서 얻는 것이 아님.`,`<b>E(서로의 부분 출력 참조):</b> 서로의 부분 출력을 참조하는 것은 허브 앤 스포크(hub and spoke) 구조를 깨는 설계임. 몇 초를 앞당기는 대신 관측성과 오류 처리를 잃음.`]},
   principle:"독립일 때만 병렬 실행하고 프롬프트가 정보의 전부임"},

  {scenario:"s3", ts:"1.7", q:`A three-week research engagement runs in a named session. On day 12 the client republishes its market model — six of the eleven source documents the analysis subagents read on day 3 now carry revised figures. An analyst is about to resume the named session and ask for the final report. What should happen instead?`,
   opts:[
     {t:`Resuming is still the right base since most of the reasoning holds, but the session has to be told exactly which six documents changed so it re-reads those and leaves the other five analyses alone.`, ok:true},
     {t:`Start a brand-new session and re-run the full three weeks of exploration so nothing stale survives.`},
     {t:`Resume and ask for the report as planned — the model will notice the discrepancies while writing and correct them.`},
     {t:`Fork the session so the old figures and the new figures can be compared side by side, then report from the fork.`}],
   explain:{good:`판단 기준은 "이전 컨텍스트가 대체로 유효한가"임. 문서 열한 개 중 다섯 개는 그대로이므로 재개가 맞음. 다만 변경된 여섯 개를 명시적으로 알려야 그 부분만 다시 읽음. 알리지 않으면 3일차의 낡은 도구 결과(tool result)가 그대로 근거로 사용됨.`,
     wrongs:[`<b>B(전량 재실행):</b> 유효한 다섯 개 분석까지 버리는 전량 재실행임. 재개가 성립하는 조건에서 3주 작업을 다시 수행하는 낭비임.`,`<b>C(모델이 알아서 수정):</b> 세션은 문서가 변경된 사실을 알 방법이 없음. 재개된 세션 안에는 이전 수치가 사실로 남아 있으므로 스스로 알아챌 근거가 없음.`,`<b>D(세션 분기):</b> 세션 분기(fork)는 서로 다른 접근법을 나란히 시험할 때 쓰는 수단임. 지금 이전 수치는 보존할 대안이 아니라 틀린 값임.`]},
   principle:"대체로 유효하면 재개하되 변경된 항목을 명시함"},

  {scenario:"s3", ts:"1.1", q:`Your research coordinator runs its own agentic loop while orchestrating subagents. Last night's run logged "completed" after writing a report from four of the nine assigned subtopics. The team is auditing the loop's control logic. Which of the following is NOT a sound control rule for that loop?`,
   opts:[
     {t:`Cap the loop at 25 iterations and treat reaching the cap as the normal way a research run finishes.`, ok:true},
     {t:`Keep looping while stop_reason is "tool_use", appending each subagent's result to the conversation before the next request.`},
     {t:`Treat "max_tokens" as a cut-off response that needs continuation rather than as a finished turn.`},
     {t:`Stop when stop_reason is "end_turn" and the coordinator has produced its final synthesis.`}],
   explain:{good:`반복 상한은 무한 실행을 막는 안전장치이지 정상 종료 조건이 아님. 상한 도달을 정상 완료로 처리하면 어젯밤처럼 아홉 개 중 네 개만 담은 리포트가 "완료"로 기록됨. 나머지 셋은 stop_reason 값마다 분기하는 정상 동작임.`,
     wrongs:[`<b>B(tool_use 계속):</b> stop_reason이 tool_use이면 계속 반복하고 결과를 히스토리에 붙여 다음 요청을 보냄. 루프의 기본 동작임.`,`<b>C(max_tokens 처리):</b> max_tokens는 응답이 잘렸다는 신호이므로 이어받기가 필요함. 완료로 해석하면 절반짜리 결과가 나감.`,`<b>D(end_turn):</b> end_turn이 실제 완료 신호임.`]},
   principle:"부정형: 반복 상한은 안전장치이지 종료 조건이 아님"},

  /* --- D2 (3): 2.2 · 2.3 · 2.4 --- */

  {scenario:"s3", ts:"2.2", q:`Overnight log from the search subagent, three lines, all identical: isError true, message "Source fetch failed". The three underlying causes were a 30-second gateway timeout, a paywall requiring credentials the system does not hold, and a malformed query string the subagent built itself. The coordinator retried all three the same number of times and burned 18 minutes. What is the right change?`,
   opts:[
     {t:`Return each failure with its category and whether retrying can help — transient, permission, validation — plus what was already attempted, so the coordinator retries the timeout and routes the other two elsewhere.`, ok:true},
     {t:`Raise the retry count so the paywalled and malformed cases eventually succeed too.`},
     {t:`Stop retrying inside the subagent and escalate every failure to the coordinator on first occurrence.`},
     {t:`Have the subagent write a human-readable sentence explaining each failure so the coordinator can read it and decide.`}],
   explain:{good:`세 줄의 오류 메시지가 동일하면 코디네이터가 판단할 재료가 없음. 실패 범주와 재시도 가능 여부가 함께 반환되어야 타임아웃만 다시 시도하고 나머지 둘은 다른 경로로 보냄. 이미 시도한 내용까지 함께 올라오면 중복 시도도 사라짐.`,
     wrongs:[`<b>B(재시도 횟수 증가):</b> 유료 장벽과 잘못된 쿼리는 몇 번을 시도해도 같은 결과임. 횟수를 늘리면 18분이 30분으로 늘어날 뿐임.`,`<b>C(첫 실패에 전부 상위 보고):</b> 첫 실패에 모두 상위로 올리면 30초 타임아웃 같은 일시적 장애까지 코디네이터가 처리해야 함. 하위 단계의 자체 복구가 사라짐.`,`<b>D(자연어 설명):</b> 사람이 읽을 문장은 타당해 보이지만 재시도 가능 여부를 매번 자연어에서 추론하게 만듦. 불리언 값 하나로 확정할 수 있는 판단을 추론에 맡기는 것임.`]},
   principle:"실패에는 범주와 재시도 가능 여부를 함께 반환함"},

  {scenario:"s3", ts:"2.3", q:`Your document-analysis subagent must call register_source (which records URL, publisher, publication date) before any enrichment tool touches a document. Audit of 400 documents: it skipped register_source on 61, and every one of those reached the report without attribution. The system prompt already instructs it to register first. What is the most reliable fix?`,
   opts:[
     {t:`Configure tool choice so the first call of the turn is pinned to that specific tool, then let the enrichment tools run in the following turns once registration has returned.`, ok:true},
     {t:`Set tool choice to "any" so the subagent is guaranteed to call a tool rather than replying with text.`},
     {t:`Move the instruction to the top of the system prompt and repeat it at the end so the model sees it twice.`},
     {t:`Have the report generator drop any finding that lacks attribution, so unregistered documents never reach the reader.`}],
   explain:{good:`순서를 보장하려면 첫 호출을 특정 도구로 고정하는 강제 도구 선택(forced tool choice)이 필요함. 프롬프트 지시만으로는 85% 수준에 머무는 것이 이미 확인됐고, 확정이 필요한 지점에 확률적 동작을 두면 안 됨.`,
     wrongs:[`<b>B(tool choice any):</b> "any"는 도구를 하나라도 호출하게 할 뿐 어느 도구인지는 정하지 않음. 여전히 enrichment 도구부터 호출할 수 있으므로 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임.`,`<b>C(지시 반복):</b> 같은 지시를 두 번 읽히는 것은 강조이지 보장이 아님. 15% 실패율이 0이 되지 않음.`,`<b>D(하류에서 폐기):</b> 하류에서 폐기하면 출처 없는 문서가 리포트에 들어가지는 않음. 대신 그 문서에서 얻은 발견 자체가 사라져 조사 범위 손실이 겉으로 드러나지 않음.`]},
   principle:"순서 보장은 강제 도구 선택으로 함. any는 순서를 정하지 않음"},

  {scenario:"s3", ts:"2.4", multi:2, q:`Two things slow your research team down. First, every session opens with the agent calling list_collections, describe_collection and sample_documents against the internal archive server just to learn what is in there — the archive's structure changes about once a quarter. Second, a contractor keeps adding an experimental scraping server to the repository's shared configuration, and it breaks two analysts' sessions each time. Which TWO changes fit? (Select TWO.)`,
   opts:[
     {t:`Publish the archive's collection catalog as an MCP resource the agent can see without spending calls on discovery.`, ok:true},
     {t:`Move the contractor's experimental server into their own user-scoped configuration so it loads only for them.`, ok:true},
     {t:`Paste the discovery results into the system prompt and refresh them by hand each quarter.`},
     {t:`Let the contractor keep the server in the shared project configuration but add a comment asking teammates not to enable it.`},
     {t:`Replace the three discovery tools with one combined describe_archive tool so discovery costs one call instead of three.`}],
   explain:{good:`"무엇이 있는지" 보여주는 카탈로그는 MCP 리소스(resource)로 제공할 대상임. 리소스로 올리면 탐색 호출 자체가 사라짐. 또한 팀에 영향을 주면 안 되는 실험용 서버는 사용자 스코프(user scope) 설정에 두어야 함.`,
     wrongs:[`<b>C(수동 붙여넣기):</b> 손으로 붙여넣은 사본은 분기마다 사람이 갱신을 기억해야 하고, 한 번 놓치면 내용이 낡은 채로 남음. 리소스는 서버가 제공하는 최신본임.`,`<b>D(주석 추가):</b> 주석은 로드를 막지 못함. 공유 설정에 들어 있는 한 계속 로드되므로 증상이 그대로 남음.`,`<b>E(도구 통합):</b> 세 번 호출을 한 번으로 줄여도 매 세션 반복되는 탐색 호출은 남음. 원인인 "카탈로그가 도구 뒤에 감춰져 있음"이 그대로이므로 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임.`]},
   principle:"카탈로그는 리소스로, 실험용 서버는 사용자 스코프로"},

  /* --- D3 (2): 3.2 · 3.5 --- */

  {scenario:"s3", ts:"3.2", q:`Your analysts run a "deep source scan" by hand: it reads a topic brief, queries four archives, and dumps roughly 30,000 tokens of raw hits before anyone reads a line. Run inside the main session it leaves no room for the discussion that follows. It must never write files. And it takes one required argument — the topic — which analysts forget about half the time. What packaging fits?`,
   opts:[
     {t:`A project skill whose frontmatter runs it in an isolated forked context, removes the file-writing tools from what it may use, and shows the expected argument as a hint so analysts see that a topic is required.`, ok:true},
     {t:`A project skill holding only the prompt text with no frontmatter, since the procedure is invoked on demand.`},
     {t:`A section of the project's CLAUDE.md describing the procedure so it is always available.`},
     {t:`A user-scoped skill each analyst copies, so everyone can tune their own archive list.`}],
   explain:{good:`요구 사항 셋이 스킬(skill) 프론트매터(frontmatter) 항목 하나씩에 대응. 긴 출력은 격리 실행(context: fork), 파일 쓰기 금지는 도구 차단(disallowed-tools), 자주 빠지는 인자는 안내 문구(argument-hint)로 해결.`,
     wrongs:[`<b>B(프론트매터 없는 스킬):</b> 설정이 없으면 출력이 본 대화에 그대로 들어감. 3만 토큰 문제 미해결.`,`<b>C(CLAUDE.md):</b> CLAUDE.md는 항상 로드되는 위치임. 필요할 때만 실행하는 절차를 상시 로드하는 것은 요구와 반대이며 격리 실행도 불가능함.`,`<b>D(사용자 스코프 스킬):</b> 분석가마다 사본을 두면 아카이브 목록이 달라져 같은 주제에 다른 결과가 나옴. 개인별 변형은 팀 공통 절차가 없을 때 쓰는 방식임.`]},
   principle:"격리 실행, 도구 차단, 인자 안내: 스킬 프론트매터의 세 항목"},

  {scenario:"s3", ts:"3.5", q:`A client asked for "an executive-ready landscape of the battery-recycling market." Three drafts came back shaped completely differently — a five-page narrative, a vendor table, a risk memo. The brief is one paragraph of prose. Four fixes are on the table. Which is LEAST likely to converge the output?`,
   opts:[
     {t:`Add a paragraph to the brief defining what "executive-ready" means in the client's industry.`, ok:true},
     {t:`Attach one short worked example of a finished landscape — its sections, roughly how long each runs, and one entry filled in.`},
     {t:`Have the model interview the client's stakeholder about audience, the decision being made, and what must stay out, before drafting again.`},
     {t:`Write the acceptance checks first — which sections must exist, which questions the document must answer — and iterate by feeding back the checks that failed.`}],
   explain:{good:`산문 해석이 갈리는 상황에 산문을 더 추가하는 것이 가장 효과가 낮음. 새로 추가한 문단도 해석 대상이므로 해석이 갈릴 지점만 하나 늘어남. 나머지 셋은 모두 산문이 아닌 형태(완성 예시, 질문, 통과 기준)를 만들어냄.`,
     wrongs:[`<b>B(완성 예시):</b> 완성물 한 벌을 보여주면 "executive-ready"가 문장이 아니라 형태로 전달됨. 산문 지시가 불안정할 때 효과가 가장 큰 조치임.`,`<b>C(이해관계자 인터뷰):</b> 인터뷰는 브리프에 없는 정보를 끌어냄. 세 초안이 갈린 이유는 대개 "누가 어떤 결정을 위해 읽는가"가 정해지지 않은 데 있음.`,`<b>D(통과 기준 우선 작성):</b> 통과 기준을 먼저 쓰고 실패한 항목만 되먹이면 개선을 측정할 수 있음.`]},
   principle:"부정형: 산문에 산문을 더하는 것이 가장 효과가 낮음"},

  /* --- D4 (3): 4.1 · 4.3 · 4.6 --- */

  {scenario:"s3", ts:"4.1", q:`Your source-vetting subagent flags "low-credibility sources" for exclusion. Over the last month analysts overrode 63% of its exclusions — mostly preprints and government working papers — while it kept two vendor-sponsored blog posts that ended up quoted in a client deliverable. Its instruction reads: "Be conservative and only include high-quality, trustworthy sources." What is the right correction?`,
   opts:[
     {t:`Replace the general instruction with the conditions that actually decide inclusion — who published it, whether the method is stated, whether funding is disclosed, whether the figures can be checked — with a worked accept and reject example for each condition.`, ok:true},
     {t:`Tighten the wording to "be extremely conservative and exclude anything you are not fully confident about."`},
     {t:`Have the subagent attach a numeric credibility score to each source and drop everything under a threshold analysts tune.`},
     {t:`Turn source vetting off until it improves, and have analysts vet every source by hand.`}],
   explain:{good:`"고품질" 같은 일반적 지시로는 정밀도가 올라가지 않음. 분석가가 배제 결정의 63%를 뒤집은 것과 후원 블로그가 통과한 것은 같은 원인에서 나옴. 어떤 조건이 채택과 배제를 가르는지 범주로 적고 조건마다 채택 예시와 배제 예시를 붙여야 판정이 일관됨.`,
     wrongs:[`<b>B(표현 강화):</b> 강도만 올린 같은 종류의 지시임. 프리프린트 배제가 더 늘어 뒤집힘 비율이 오히려 올라감.`,`<b>C(신뢰도 점수):</b> 모델이 스스로 매긴 점수는 실제 품질의 대리 지표로 신뢰할 수 없음. 임계값을 조정해도 그 점수가 무엇을 측정하는지 정의되지 않았으므로 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임.`,`<b>D(기능 중단):</b> 오탐이 몰린 범주를 일시적으로 끄는 것은 쓸 수 있는 방법임. 그러나 여기서는 놓친 후원 블로그가 실제 피해를 냈으므로 전체를 끄면 그 위험이 그대로 사람에게 넘어감.`]},
   principle:"일반적 지시로는 정밀도가 오르지 않음. 조건을 범주로 적을 것"},

  {scenario:"s3", ts:"4.3", multi:2, q:`Findings arrive from subagents as markdown that the coordinator parses with regular expressions. Last week 4% of runs died on a stray colon inside a quoted excerpt, and one run silently produced a finding whose confidence field read "fairly high" where the coordinator expected a number. Which TWO changes address these two failures? (Select TWO.)`,
   opts:[
     {t:`Have each subagent return findings through a tool schema that declares the fields and their types, so the shape is enforced instead of parsed back out of prose.`, ok:true},
     {t:`Add a semantic check on top of the schema — confidence inside its allowed range, every claim carrying a source id that exists in the source list — since a schema can be satisfied by values that still make no sense.`, ok:true},
     {t:`Harden the regular expressions to tolerate colons, quotes and other punctuation inside excerpts.`},
     {t:`Instruct subagents in their system prompts to always emit valid markdown with consistent field labels.`},
     {t:`Have the coordinator re-ask any subagent whose output fails to parse, up to three times.`}],
   explain:{good:`실패가 두 종류이므로 처방도 둘임. 스키마(schema)가 구문 계열 실패(파싱 실패, 타입 불일치)를 없애고, 그 위의 의미 검증이 "스키마는 통과하지만 값이 성립하지 않는 경우"를 찾아냄.`,
     wrongs:[`<b>C(정규식 보강):</b> 정규식을 아무리 다듬어도 다음 특수문자에서 다시 깨짐. 산문을 구조화된 데이터로 취급한 설계가 원인임.`,`<b>D(프롬프트 지시):</b> 프롬프트 지시로 형식을 맞추는 것은 확률적임. 스키마는 강제되지만 지시는 강제되지 않음.`,`<b>E(재요청):</b> 재요청은 파싱 실패를 지연시킬 뿐이고, "fairly high" 같은 값은 파싱이 성공하므로 재시도가 아예 발동하지 않음.`]},
   principle:"스키마가 구문을, 의미 검증이 값을 담당함"},

  {scenario:"s3", ts:"4.6", q:`The synthesis agent writes the report and then, in the same session, runs a self-check instructed to "question every claim you just made." Across 30 reports the self-check changed two sentences and never caught any of the four attribution errors clients later found. There is budget for exactly one more model pass. Where should it go?`,
   opts:[
     {t:`A separate instance that receives only the report and the structured findings, carries none of the writing session's reasoning, and checks each claim against the finding it cites.`, ok:true},
     {t:`Extend the self-check by giving the same session a larger thinking budget before it answers.`},
     {t:`Move the self-check instruction to the start of the session so the agent works knowing it will be reviewed.`},
     {t:`Have the coordinator, which already saw every subagent result, run the check itself.`}],
   explain:{good:`원인은 컨텍스트에 있음. 같은 세션은 방금 그렇게 작성한 근거를 그대로 보유하고 있어 자기 결론을 의심하기 어려움. 리포트와 구조화된 발견만 전달받은 별도 인스턴스라야 인용이 실제로 맞는지 대조할 수 있음.`,
     wrongs:[`<b>B(사고 예산 증가):</b> 사고 예산을 늘려도 편향의 원인인 "생성 시 추론이 남아 있음"은 그대로임. 30건에 두 문장만 수정된 것이 그 근거임.`,`<b>C(검토 예고):</b> 검토받을 것을 미리 아는 것과 검토가 실제로 작동하는 것은 다른 문제임.`,`<b>D(코디네이터가 검토):</b> 코디네이터도 이 리포트가 만들어지는 과정을 함께 거쳤음. 독립 검토의 조건인 "사전 추론 없음"을 충족하지 못하므로 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임.`]},
   principle:"독립 검토의 조건은 사전 추론 맥락이 없는 것임"},

  /* --- D5 (4): 5.1 ×2 · 5.2 · 5.5 --- */

  {scenario:"s3", ts:"5.1", q:`A nine-hour research run is drifting: by hour six the coordinator paraphrases figures it had quoted exactly at hour two. What has to survive is whatever turns out to matter later — at hour eight an analyst may ask for a regulation clause's exact wording, a vendor's headcount, or a filing date, and nobody can list those in advance because the questions arrive from the client during the run. Extra model calls are acceptable. Which context strategy fits best?`,
   opts:[
     {t:`Judge each turn as it goes and keep the ones carrying quotations, figures or dates in their original wording, discarding the rest — because the list of what must survive cannot be written before the run starts.`, ok:true},
     {t:`Define fields up front for the values that must be preserved and rebuild that block into every prompt.`},
     {t:`Keep the most recent N turns exactly and drop everything older, which costs nothing extra to maintain.`},
     {t:`Summarize progressively every hour so all nine hours stay represented in compressed form.`}],
   explain:{good:`결정적 조건은 "보존할 항목의 목록을 미리 적을 수 없다"는 점임. 질문이 실행 도중에 고객에게서 오기 때문임. 이 경우 턴 단위로 판정해 원문 그대로 남기는 선택적 보존이 맞으며, 추가 모델 호출 비용이 허용된다는 조건과도 부합함.`,
     wrongs:[`<b>B(구조화 상태 객체):</b> 필드를 미리 정하는 구조화 상태 객체(structured state object)는 보존할 값의 목록이 확정됐을 때 가장 효과적임. 여기서는 여덟 시간째에 무엇을 물어올지 알 수 없으므로 필드를 채울 수 없음.`,`<b>C(슬라이딩 윈도):</b> 슬라이딩 윈도(sliding window) 바깥은 요약조차 남지 않음. 두 시간째의 인용이 정확히 그 범위 밖임. "유지 비용이 없다"는 설명이 사실이라 고르기 쉬운 오답임.`,`<b>D(점진적 요약):</b> 요약은 정확한 수치, 날짜, 문구가 가장 먼저 손실되는 방식임. 현재 증상이 바로 그 손실임.`]},
   principle:"보존 목록을 미리 적을 수 없으면 선택적 보존을 사용함"},

  {scenario:"s3", ts:"5.1", multi:2, q:`Two sessions run on the same research platform. Session A is a live analyst chat about a report that is already written — six months of logs show no answer ever needed anything said more than about ten turns back, and the platform forbids extra model calls in the request path. Session B is a four-hour multi-source investigation whose client constraints, budget cap and deadline were fixed in the opening turn and must hold to the last. Which TWO assignments are right? (Select TWO.)`,
   opts:[
     {t:`Session A keeps a window over the most recent turns and drops everything past it — the logs say nothing older is needed and it adds no call to the request path.`, ok:true},
     {t:`Session B holds the constraints, cap and deadline in dedicated fields rebuilt into every prompt, with the investigation narrative summarized around them.`, ok:true},
     {t:`Session A gets progressive summarization so nothing from the six months of history is ever lost.`},
     {t:`Session B gets a window over the most recent turns, since that is the cheapest way to keep a four-hour session affordable.`},
     {t:`Both sessions get per-turn selective retention, which is the most accurate option available.`}],
   explain:{good:`두 세션의 조건이 반대임. 세션 A는 "오래된 내용이 필요 없다"는 근거가 있고 요청 경로에 추가 호출이 금지되어 있음. 슬라이딩 윈도의 성립 조건 그대로임. 세션 B는 지켜야 할 값이 첫 턴에 확정됐으므로 전용 필드에 담고 나머지 서술은 요약에 맡김.`,
     wrongs:[`<b>C(세션 A에 점진적 요약):</b> 요약은 매번 추가 모델 호출이 필요함. 요청 경로에 추가 호출을 금지한 조건을 정면으로 위반함.`,`<b>D(세션 B에 윈도):</b> 첫 턴의 제약, 예산 상한, 마감은 네 시간 뒤에는 윈도 밖으로 밀려남. 비용이 가장 적다는 설명이 사실이라 고르기 쉬운 오답임.`,`<b>E(둘 다 선택적 보존):</b> 보존 목록이 이미 확정된 세션 B에는 과잉이고, 추가 호출이 금지된 세션 A에는 적용할 수 없음.`]},
   principle:"조건이 전략을 결정함: 근거, 비용, 확정 여부"},

  {scenario:"s3", ts:"5.2", q:`Your research coordinator may pause a run and put a question to the requesting analyst. Every situation below justifies pausing to ask, EXCEPT one. Which one?`,
   opts:[
     {t:`Two credible sources give different figures for the same metric and the coordinator cannot tell which is right.`, ok:true},
     {t:`The request says "our main competitors" and the client's own materials name two different competitor sets.`},
     {t:`The scope covers a jurisdiction the firm holds no source access for, so an assigned subtopic cannot be researched at all.`},
     {t:`The analyst wrote in the brief that they want to be consulted before any paid data purchase, and the next step needs one.`}],
   explain:{good:`상충하는 수치는 실행을 멈출 사유가 아니라 리포트에 함께 실을 대상임. 두 값과 각각의 출처를 나란히 적어 독자가 판단하게 하면 됨. 나머지 셋은 각각 정의의 모호함, 진행 불가, 요청자의 명시적 요구이므로 질문해야 하는 상황임.`,
     wrongs:[`<b>B(경쟁사 정의 충돌):</b> "주요 경쟁사"가 두 가지로 갈리면 추측으로 고를 것이 아니라 어느 쪽인지 확인받아야 함.`,`<b>C(접근 권한 없음):</b> 자료 접근 자체가 없어 조사를 진행할 수 없는 것은 전형적인 상위 보고 사유임.`,`<b>D(사전 상의 요청):</b> 요청자가 미리 상의해 달라고 명시한 사항은 그대로 지켜야 함.`]},
   principle:"부정형: 상충하는 수치는 멈출 사유가 아니라 함께 실을 대상임"},

  {scenario:"s3", ts:"5.5", q:`A partner personally reads 8 of the roughly 200 findings in each research report before it goes to the client. Today those 8 are whatever the synthesis agent labels "most important." Last quarter two client-facing errors slipped through: one figure came from a source the search agent had itself marked uncertain, and one claim rested on a single blog post but was presented flatly. How should those 8 slots be spent?`,
   opts:[
     {t:`Route the findings whose supporting evidence is weakest — single-sourced, self-flagged as uncertain, or contradicted elsewhere — and hold one or two slots as a spot check on findings the system rated solid, to catch miscalibration.`, ok:true},
     {t:`Keep sending the findings the synthesis agent considers most important, but ask it to rank them more carefully.`},
     {t:`Give the partner the 8 findings that appear earliest in the report, since those shape how the client reads the rest.`},
     {t:`Rotate the 8 slots evenly across the report's sections so every section gets partner attention each quarter.`}],
   explain:{good:`사람이 검토할 여덟 자리는 오류 위험이 높은 항목에 배정함. 단일 출처인 것, 스스로 불확실하다고 표시한 것, 다른 자료와 어긋나는 것이 여기에 해당함. 여기에 한두 자리를 "문제없다고 판정된 항목"의 표본 점검으로 남겨야 판정 자체가 어긋났을 때 확인할 수 있음.`,
     wrongs:[`<b>B(중요도 순):</b> 모델이 스스로 매긴 중요도는 오류 발생 확률의 대리 지표가 되지 못함. 지난 분기 두 건이 정확히 그 경로로 통과했음.`,`<b>C(등장 순서):</b> 등장 순서는 읽는 사람의 인상과 관련이 있을 뿐 오류 확률과는 무관함.`,`<b>D(균등 배분):</b> 균등 배분은 공평해 보이지만 단일 출처 발견이 한 섹션에 몰려 있어도 안전한 섹션과 같은 인원이 배정됨.`]},
   principle:"사람은 근거가 약한 항목에, 표본 점검은 감시 목적으로 배정함"},

  /* ═══════════ s4: 개발자 생산성 도구 ═══════════ */

  /* --- D1 (3): 1.6 · 1.7 · 1.3 --- */

  {scenario:"s4", ts:"1.6", q:`An 84-file pull request has to be reviewed before Friday. A single pass over all 84 files produced findings that thinned out badly after roughly the twentieth file, and it missed that a helper renamed in file 3 is still called under its old name in file 61. Which decomposition fits?`,
   opts:[
     {t:`Run one focused pass per file for issues that stay inside a file, then a separate pass whose only job is what crosses file boundaries — the two kinds of defect need different attention.`, ok:true},
     {t:`Keep the single pass but instruct it to maintain a running list of cross-file references as it goes.`},
     {t:`Let the reviewer decide each run which files look risky and review only those in depth.`},
     {t:`Split the 84 files into four passes of 21 and merge the findings.`}],
   explain:{good:`결함이 두 종류임. 파일 안에서 끝나는 것과 파일 경계를 넘는 것임. 파일별 집중 검토가 앞의 것을, 통합 검토가 뒤의 것을 담당함. 한 번의 검토에 두 가지를 함께 맡기면 주의가 분산되어 스무 번째 파일부터 발견이 줄어드는 현재 증상이 발생함.`,
     wrongs:[`<b>B(러닝 리스트):</b> 교차 참조 목록을 유지하라는 지시는 같은 검토의 주의를 더 분산시킴. 주의 분산이 원인인데 부담을 더 얹는 것임.`,`<b>C(위험 파일만 선별):</b> 위험해 보이는 파일만 고르면 3번 파일의 이름 변경 같은 변경을 놓침. 84개 전부가 검토 대상임.`,`<b>D(21개씩 4회 분할):</b> 21개씩 나누면 파일별 검토 깊이는 다소 나아짐. 그러나 3번과 61번 파일이 서로 다른 묶음에 들어가면 파일 경계를 넘는 결함은 여전히 발견되지 않음.`]},
   principle:"파일 내부 결함과 파일 경계를 넘는 결함은 검토를 분리함"},

  {scenario:"s4", ts:"1.7", q:`You spent Monday morning having Claude map a 200-file billing service — module boundaries, the three payment providers, the retry design. Two things now need doing: comparing a queue-based rewrite against an inline-retry rewrite from that same map, and, on Thursday, picking the work back up after a teammate merges 30 commits into the same service. What is the right use of session controls?`,
   opts:[
     {t:`Branch the mapped session into two independent lines so each rewrite is explored from the same baseline without contaminating the other, and on Thursday resume the mapped session while naming the files those 30 commits touched.`, ok:true},
     {t:`Keep one session for both rewrites so the comparison happens in a single conversation, and on Thursday start fresh to be safe.`},
     {t:`Start a new session for each rewrite with the map pasted in, and on Thursday resume without mentioning the merge, since the session already knows the codebase.`},
     {t:`Branch the session on Thursday to isolate the merged changes, and explore the two rewrites one after the other in the original session.`}],
   explain:{good:`같은 기준 시점에서 갈라지는 두 접근은 세션 분기(fork)를 사용할 자리임. 한쪽의 탐색이 다른 쪽 결론에 영향을 주지 않음. 목요일 작업은 이전 파악 내용이 대체로 유효하므로 재개가 맞으며, 30개 커밋이 변경한 파일을 명시해야 그 부분만 다시 확인함.`,
     wrongs:[`<b>B(한 대화에서 순차 실행):</b> 한 대화에서 두 접근을 이어서 하면 먼저 검토한 쪽의 추론이 뒤쪽 판단에 그대로 남음. 비교가 아니라 순서에 따른 편향이 됨.`,`<b>C(병합 사실 미고지):</b> 병합을 알리지 않으면 세션 안의 파일 내용은 월요일 상태 그대로임. 스스로 알아챌 방법이 없음.`,`<b>D(분기로 커밋 격리):</b> 분기는 탐색 경로를 나누기 위한 수단이지 다른 사람의 커밋을 격리하기 위한 수단이 아님. 게다가 두 재작성을 한 세션에서 순차로 하면 B와 같은 오염이 발생함.`]},
   principle:"접근이 갈리면 분기, 이어가면 재개. 단 변경된 파일은 명시함"},

  {scenario:"s4", ts:"1.3", multi:2, q:`A developer asks: "Where does the checkout flow read feature flags, where does it write audit logs, and what does the billing adapter depend on?" The three questions do not depend on one another. Your agent answers them one after another in the main conversation, and by the third answer it has lost the first two. Which TWO changes are right? (Select TWO.)`,
   opts:[
     {t:`Issue the three investigations in one turn so they run at the same time instead of in sequence.`, ok:true},
     {t:`Write each investigation's prompt so it stands alone — the question, where to start looking, the shape of answer wanted — because none of them can read the main conversation.`, ok:true},
     {t:`Ask the developer to submit the three questions as three separate requests on three separate days.`},
     {t:`Chain them so the first investigation hands its findings to the second and the second to the third, building context as it goes.`},
     {t:`Raise the main conversation's token limit so all three sets of raw search output fit.`}],
   explain:{good:`세 질문이 서로 독립이므로 한 턴에 함께 실행하는 것이 맞음. 각 프롬프트는 그것만 읽고도 작업이 가능하도록 자립해야 함. 위임받은 서브에이전트는 본 대화를 볼 수 없기 때문임.`,
     wrongs:[`<b>C(사용자 일정 조정):</b> 도구가 처리하지 못하는 부분을 사용자 일정으로 넘기는 답임.`,`<b>D(순차 연결):</b> 독립적인 세 작업을 순차로 묶으면 동시 실행의 이점이 사라지고, 앞 조사의 불필요한 정보가 뒤 조사에 영향을 줌.`,`<b>E(한도 상향):</b> 한도를 키워도 원시 검색 출력이 본 대화를 채우는 구조는 그대로임. 세 번째 답에서 앞 내용을 잊는 증상이 미뤄질 뿐임.`]},
   principle:"독립 작업은 동시에 실행하고 프롬프트는 자립하게 작성함"},

  /* --- D2 (5): 2.5 ×3 · 2.3 · 2.4 --- */

  {scenario:"s4", ts:"2.5", q:`You need the list of test files that actually exercise the payment retry path. The repo holds about 340 files under test directories with no naming convention — some end .spec.ts, some .test.ts, some are just tests/feature-name.ts. The last attempt read all 340 and blew the context window. What sequence gets there?`,
   opts:[
     {t:`Search file contents across the tree for the retry path's own identifiers — the function and the constant it uses — which returns the hit files regardless of what they are named, then open only those.`, ok:true},
     {t:`Match file names first with a pattern covering .spec.ts and .test.ts, then read each match to see whether it touches retries.`},
     {t:`Read the payment module first, list every symbol it exports, then read each of the 340 test files looking for those symbols.`},
     {t:`Run the test suite with coverage instrumentation and read the report to see which tests hit the retry code.`}],
   explain:{good:`이름 규칙이 없다는 점이 이 상황의 핵심이므로 파일명으로 범위를 좁히는 방법이 불가능함. 찾는 대상이 함수명과 상수명 같은 파일 내용이므로 내용 검색이 340개를 몇 개로 줄여 줌. 그다음 검색에 걸린 파일만 열면 컨텍스트가 넘치지 않음.`,
     wrongs:[`<b>B(파일명 패턴):</b> tests/feature-name.ts 같은 파일이 패턴에서 빠지고, 남은 파일을 전부 읽는 순간 지난번과 같은 컨텍스트 초과가 발생함. 이름 규칙이 있는 저장소라면 맞는 순서이므로 고르기 쉬운 오답임.`,`<b>C(심볼 목록):</b> 심볼 목록을 만드는 단계까지는 유용하지만 그다음이 결국 340개 전수 읽기임. 이미 실패한 방법과 같음.`,`<b>D(커버리지 실행):</b> 커버리지 실행은 빌드 환경과 실행 환경을 요구함. 정적 탐색으로 끝날 질문에 과한 수단이며, 테스트가 깨져 있으면 실행 자체가 불가능함.`]},
   principle:"이름 규칙이 없으면 내용 검색부터 시작함"},

  {scenario:"s4", ts:"2.5", q:`A deprecated import path @corp/logger-v1 has to become @corp/logger in 74 files. Two constraints: three of those files also contain the literal string @corp/logger-v1 inside test fixtures that have to stay exactly as they are, and every edited file has to end up formatted the way the repo's formatter leaves it. Which approach fits?`,
   opts:[
     {t:`Search the contents to get the 74 files and the exact lines, then change them one file at a time with anchors that include enough surrounding text to skip the fixture occurrences, running the formatter afterwards.`, ok:true},
     {t:`Run a stream edit over the whole tree replacing every occurrence, then revert the three fixture files by hand.`},
     {t:`Read each of the 74 files in full and write each one back with the change applied, since that always works.`},
     {t:`Change the three fixture files first so the remaining occurrences are all safe to replace globally.`}],
   explain:{good:`변경해야 할 문자열과 변경하면 안 되는 문자열이 동일함. 따라서 앵커에 주변 문맥을 포함해 구분하는 것이 정석이며, 대상 목록은 내용 검색으로 먼저 추출함. 서식은 마지막에 포매터가 정리함.`,
     wrongs:[`<b>B(전체 치환 후 되돌리기):</b> 전체 치환 후 되돌리려면 세 파일을 정확히 기억해야 함. 하나만 누락해도 픽스처가 어긋난 채로 남음. 빠르다는 점 때문에 고르기 쉬운 오답임.`,`<b>C(전 파일 읽고 쓰기):</b> 파일 전체를 읽고 다시 쓰는 방식은 앵커가 유일하지 않을 때의 예외 수단이지 기본값이 아님. 74개를 통째로 읽으면 컨텍스트를 크게 소모하고, 파일 전체를 다시 쓰는 만큼 의도하지 않은 변경 위험도 커짐.`,`<b>D(픽스처 먼저 수정):</b> 픽스처는 변경하면 안 되는 대상임. 먼저 수정하면 요구 사항을 정면으로 위반함.`]},
   principle:"같은 문자열이 섞여 있으면 앵커에 문맥을 포함함"},

  {scenario:"s4", ts:"2.5", q:`A new engineer must work out how the notification service decides between sending an email and sending a push message. The repo holds 1,100 files and they have never opened it. Four first moves are proposed. Which is the LEAST useful first move?`,
   opts:[
     {t:`Open the repository's largest source file and read it end to end to get a feel for the code style.`, ok:true},
     {t:`Search file contents for the words that would appear in that decision — push, email, channel — and see which files come back.`},
     {t:`List the files under the notification directory by name pattern to see how the service is laid out.`},
     {t:`Search for the service's entry point by its handler name, read that one file, and follow what it imports.`}],
   explain:{good:`가장 큰 파일을 처음부터 끝까지 읽는 것은 질문과 무관한 토큰을 가장 많이 소모하는 선택임. 파일 크기는 관련성의 지표가 아니며, 전부 읽은 뒤에도 채널 결정이 어디서 이루어지는지는 여전히 알 수 없음.`,
     wrongs:[`<b>B(키워드 내용 검색):</b> 결정 로직에 등장할 단어로 내용을 검색하는 것은 1,100개를 몇 개로 줄이는 정석적인 출발임.`,`<b>C(이름 패턴 탐색):</b> 이름 패턴으로 파일 배치를 파악하는 것은 비용이 적고 빠른 구조 파악 방법임.`,`<b>D(진입점부터 추적):</b> 진입점 하나를 읽고 import를 따라가는 것은 점진적 이해의 기본 경로임.`]},
   principle:"부정형: 파일 크기는 관련성의 지표가 아님"},

  {scenario:"s4", ts:"2.3", multi:2, q:`Your productivity agent carries 19 tools. Telemetry: it picks the wrong tool on 23% of turns, most often reaching for the generic run_shell tool to do things four purpose-built tools already cover, and it sometimes answers "which files changed" in prose without calling anything at all. Which TWO changes fit? (Select TWO.)`,
   opts:[
     {t:`Cut the agent down to the small set its role actually needs and put the rest behind a delegated subagent, since selection reliability falls as the option count grows.`, ok:true},
     {t:`For the turns that must end in a tool call, configure tool choice so the model is required to call some tool rather than replying conversationally.`, ok:true},
     {t:`Keep all 19 but rewrite run_shell's description to say it is a last resort.`},
     {t:`Force one specific tool on every turn so the agent can never pick wrong.`},
     {t:`Add a twentieth tool that routes each request to the correct one of the other 19.`}],
   explain:{good:`도구가 19개라는 규모 자체가 선택 신뢰도를 떨어뜨리므로 역할에 맞게 줄이는 것이 첫 조치임. 또한 도구를 반드시 호출해야 하는 턴은 "어떤 도구든 호출"로 설정하면 산문 답변이 사라짐.`,
     wrongs:[`<b>C(설명 보강):</b> 설명 보강은 도움이 되므로 일반적으로는 맞지만 이 문제의 조건에서는 부족함. 도구 19개라는 선택 폭 자체는 그대로 남음.`,`<b>D(매 턴 강제):</b> 매 턴 같은 도구를 강제하면 다른 작업을 수행할 수 없음. 강제 도구 선택은 순서를 고정해야 하는 특정 지점에 쓰는 방법임.`,`<b>E(라우터 추가):</b> 라우터를 추가하면 선택지가 20개가 됨. 문제를 한 겹 더 쌓는 것임.`]},
   principle:"선택지를 줄이고 필요한 턴은 호출을 강제함"},

  {scenario:"s4", ts:"2.4", q:`A platform team proposes building an MCP server exposing read_file, search_files and list_files against the repository, arguing it will "standardize how the agent touches code." The same team also needs the agent to open tickets in the company's homegrown release-approval system, which has an HTTP API and no public client. Where should the build effort go?`,
   opts:[
     {t:`Skip the repository server — those three operations are already covered by the agent's built-in file tools — and build the server for the release-approval system, which nothing else can reach.`, ok:true},
     {t:`Build both, so every capability the agent has arrives through one consistent interface.`},
     {t:`Build the repository server first, since standardizing file access lowers the risk of the agent running arbitrary shell commands.`},
     {t:`Build neither, and drive the release-approval system through shell commands against its HTTP API.`}],
   explain:{good:`MCP는 에이전트가 원래 접근할 수 없는 시스템을 연결하는 수단임. 파일 읽기, 검색, 목록 조회는 기본 제공 도구(built-in tools)가 이미 담당하므로 다시 만들면 유지보수 부담만 늘어남. 사내 승인 시스템은 대응하는 기본 도구가 없으므로 여기가 MCP 서버를 만들 자리임.`,
     wrongs:[`<b>B(일관된 인터페이스):</b> "하나의 일관된 인터페이스"는 그럴듯하게 들리는 근거임. 이미 존재하는 기능을 다시 만드는 비용을 일관성이라는 이름으로 정당화하는 것임.`,`<b>C(임의 셸 실행 우려):</b> 임의 셸 실행에 대한 우려는 타당한 문제 인식이지만, 도구 배분과 제약된 전용 도구로 해결할 문제이지 파일 도구를 새로 만들 이유가 아님.`,`<b>D(셸로 API 호출):</b> 셸로 API를 호출하면 승인이라는 민감한 동작이 제약 없는 범용 도구 뒤로 들어감. 제약된 전용 도구가 필요한 대표 사례임.`]},
   principle:"이미 있는 기능은 다시 만들지 않고 접근할 수 없는 시스템만 연결함"},

  /* --- D3 (3): 3.4 · 3.2 · 3.1 --- */

  {scenario:"s4", ts:"3.4", q:`Three tickets land on Monday. (a) A stack trace points at one line: a date parser throws on empty strings, and the fix is a guard. (b) The team must move off a logging library used in 45 files, and two routes exist — a shim that leaves call sites untouched, or rewriting the call sites now. (c) A flaky test needs a one-line timeout bump. What is the right allocation?`,
   opts:[
     {t:`(a) and (c) go straight to execution — the scope is settled and the change is local; (b) goes through a planning phase first, because 45 files with two viable routes is exactly where committing early costs rework.`, ok:true},
     {t:`All three go through a planning phase first, since planning never hurts and leaves a record of intent.`},
     {t:`All three go straight to execution, with (b) reviewed carefully afterwards.`},
     {t:`(b) and (c) go through planning — (c) because flaky tests have unknown causes — while (a) executes directly.`}],
   explain:{good:`판단 기준은 두 가지임. 범위가 분명한가, 그리고 유효한 접근이 여럿인가임. (a)와 (c)는 모두 한 줄짜리 국소 변경이고, (b)는 45개 파일에 두 가지 경로가 있어 먼저 정하고 진행해야 재작업을 피함.`,
     wrongs:[`<b>B(모두 계획 단계):</b> 한 줄짜리 가드 추가에 계획 단계를 붙이는 것은 지연만 발생시킴. "해서 나쁠 것은 없다"는 논리가 고르기 쉬운 오답임.`,`<b>C(먼저 구현 후 리뷰):</b> 45개 파일을 두 경로 중 임의로 진행한 뒤 리뷰에서 되돌리는 것이 계획 단계가 막으려는 재작업임.`,`<b>D(타임아웃 수정에 설계 단계):</b> (c)의 원인이 불분명하다는 지적은 맞음. 그러나 요구 사항은 타임아웃 한 줄 수정이고 범위가 이미 확정되어 설계 단계가 필요 없음.`]},
   principle:"범위가 분명하면 바로 실행하고 선택지가 여럿이면 계획부터 세움"},

  {scenario:"s4", ts:"3.2", q:`Your repo ships a scaffold-service skill everyone uses. One engineer wants hers to also emit a Terraform stub, which the rest of the team explicitly does not want in their output. She has been editing the shared skill file locally and keeps having to un-stage it before every commit. What is the right arrangement?`,
   opts:[
     {t:`She keeps her own variant under her user-scoped skills directory with a different name, leaving the shared skill untouched for everyone else.`, ok:true},
     {t:`Add a flag to the shared skill so it emits the Terraform stub only when asked for.`},
     {t:`Add a line to her personal always-loaded memory file telling the agent to add a Terraform stub whenever scaffolding runs.`},
     {t:`Fork the repository so her version of the skill lives on a long-running branch.`}],
   explain:{good:`팀 자산을 변경하지 않으면서 개인만 다르게 사용하려면 사용자 스코프에 이름이 다른 변형본을 두는 것이 정석임. 공유 파일을 매번 되돌리는 현재 방식은 언젠가 실수로 커밋됨.`,
     wrongs:[`<b>B(기본 비활성 옵션):</b> 기본값이 꺼져 있어도 팀이 원하지 않는 기능이 팀 자산에 포함됨. 유연해 보이지만 이 문제의 조건에서는 요구를 충족하지 못함.`,`<b>C(개인 메모리):</b> 항상 로드되는 개인 메모리에 넣으면 스캐폴딩과 무관한 작업에도 영향이 미침. 필요할 때만 실행하는 절차는 스킬로 만드는 것이 맞음.`,`<b>D(저장소 분기):</b> 저장소를 분기하면 스킬 하나 때문에 팀의 다른 변경을 계속 병합해야 함. 비용이 문제 크기와 맞지 않음.`]},
   principle:"팀 자산은 그대로 두고 개인용은 이름이 다른 변형본으로 둠"},

  {scenario:"s4", ts:"3.1", q:`A 60-person platform org is settling what its repository CLAUDE.md should hold. Which item does NOT belong there?`,
   opts:[
     {t:`A 400-line walkthrough of the payment module's internals, needed only by the two engineers who touch it.`, ok:true},
     {t:`The repo's build and test commands, which every session needs before it can run anything.`},
     {t:`The naming and error-handling conventions all code in the repo has to follow.`},
     {t:`A pointer to where the team's deeper topic guides live, so a session can pull one in when it becomes relevant.`}],
   explain:{good:`항상 로드되는 위치에는 모든 세션이 사용하는 내용만 둠. 두 사람만 필요한 400줄 모듈의 내부 설명은 매 세션 토큰을 소모하면서 나머지 58명에게는 불필요한 정보임. 필요할 때만 불러오는 위치로 옮겨야 함.`,
     wrongs:[`<b>B(빌드·테스트 명령):</b> 빌드와 테스트 명령은 세션마다 필요한 대표적인 상시 항목임.`,`<b>C(저장소 전체 컨벤션):</b> 저장소 전체에 적용되는 컨벤션도 상시 로드 위치가 맞음.`,`<b>D(위치만 표시):</b> 상세 문서는 위치만 표시하고 필요할 때 불러오는 것이 상시 로드 부담을 줄이는 정석임.`]},
   principle:"부정형: 상시 로드 위치에는 모두가 사용하는 내용만 둠"},

  /* --- D4 (3): 4.4 · 4.6 · 4.1 --- */

  {scenario:"s4", ts:"4.4", q:`Your agent generates repository boilerplate from a template and validates the result with the team's linter and type checker. Three failure kinds show up in the logs: a generated file missing a required export, a type error caused by a package version the agent guessed at, and a case where the template needs the service's owning team name, which appears nowhere in the repository or the request. Which retry policy is right?`,
   opts:[
     {t:`Retry the first two with the exact validator output appended so the model can correct itself, and stop on the third — the missing owner has to be supplied, not guessed at again.`, ok:true},
     {t:`Retry all three up to three times with the validator output appended, since self-correction handles most failures.`},
     {t:`Retry only the first, since the other two turn on information outside the generated file.`},
     {t:`Skip retries entirely and surface all three failures to the developer along with the validator output.`}],
   explain:{good:`재시도는 모델이 스스로 고칠 수 있는 실패에만 효과가 있음. 누락된 export와 타입 오류는 검증기 출력을 전달하면 스스로 수정함. 그러나 소유 팀 이름은 저장소에도 요청에도 없으므로 몇 번을 반복해도 지어낼 뿐임.`,
     wrongs:[`<b>B(팀 이름 재시도):</b> 정보가 아예 없는 항목은 세 번 반복해도 세 번 모두 지어낸 값임. 게다가 그럴듯한 값이 나오면 검증 없이 통과함.`,`<b>C(파일 밖 정보 기준):</b> "파일 밖 정보"라는 구분은 그럴듯하지만, 패키지 버전은 저장소 안에 있는 값이고 타입 오류는 검증기가 무엇이 틀렸는지 정확히 알려주므로 되먹임이 잘 작동함.`,`<b>D(전부 사람에게):</b> 자동으로 고칠 수 있는 두 건까지 사람에게 올리면 되먹임 루프의 이점을 전부 버림.`]},
   principle:"고칠 수 있는 실패는 되먹임으로, 없는 정보는 재시도하지 않음"},

  {scenario:"s4", ts:"4.6", multi:2, q:`Your agent generates a 12-file service scaffold and then, in the same conversation, reviews what it just wrote. Two months of data: the review approves 97% of its own output, and the defects reaching production split between single-file logic slips and mismatches where one file's schema disagrees with another's. Which TWO changes address this? (Select TWO.)`,
   opts:[
     {t:`Hand the finished scaffold to a fresh instance that never saw the generation reasoning, and let it review from the code alone.`, ok:true},
     {t:`Split the review into per-file passes for local logic plus a separate pass whose only job is agreement between files.`, ok:true},
     {t:`Instruct the reviewing turn to be more skeptical and to assume the code contains at least three defects.`},
     {t:`Have the generator explain its reasoning in more detail before reviewing, so the review has more to work with.`},
     {t:`Raise the review's thinking budget so it examines all 12 files more thoroughly.`}],
   explain:{good:`97%라는 자기 승인 비율은 생성할 때의 추론이 그대로 남아 있어서 나오는 수치임. 그 맥락이 없는 별도 인스턴스가 필요함. 또한 결함이 두 종류이므로 검토도 둘로 나눠야 각각에 주의가 배분됨.`,
     wrongs:[`<b>C(회의적 태도 지시):</b> 회의적으로 검토하라는 지시는 같은 세션이 같은 근거를 그대로 보유하고 있으므로 편향을 제거하지 못함.`,`<b>D(생성 추론 제공):</b> 생성 시 추론을 더 많이 보여주면 검토가 그 추론을 따라가게 됨. 필요한 방향과 반대임.`,`<b>E(사고 예산 증가):</b> 사고 예산은 12개 파일을 더 오래 검토하게 할 뿐 자기 결론을 의심하게 만들지는 못함.`]},
   principle:"사전 맥락이 없는 검토자와 결함 종류만큼의 검토 단계"},

  {scenario:"s4", ts:"4.1", q:`Your agent's inline pull-request comments are being ignored. Of last sprint's 210 comments, 138 were style nits the repo's formatter already handles, and developers now collapse the bot's section without reading it. Four fixes are proposed. Which does the LEAST for the actual problem?`,
   opts:[
     {t:`Add "only report findings you are highly confident about" to the review prompt.`, ok:true},
     {t:`List the categories the bot must report — correctness, security, data loss — and the categories it must skip, naming formatting among them.`},
     {t:`Switch the style category off entirely until its prompt is rewritten, so the remaining categories get read again.`},
     {t:`Define each severity level with a short code example of what does and does not qualify.`}],
   explain:{good:`"확신 있는 것만 보고하라"는 지시로는 정밀도가 오르지 않음. 포매터가 처리할 스타일 지적도 모델은 확신하기 때문임. 138건이 그대로 남음. 나머지 셋은 무엇을 보고할지를 범주와 예시로 확정함.`,
     wrongs:[`<b>B(보고 범주 명시):</b> 보고할 범주와 건너뛸 범주를 명시하는 것이 오탐을 줄이는 직접적인 조치임.`,`<b>C(범주 일시 중단):</b> 오탐이 몰린 범주를 일시적으로 끄면 남은 범주가 다시 읽힘. 접힌 섹션을 되살리는 현실적 수단임.`,`<b>D(심각도별 예시):</b> 심각도마다 해당 예시와 비해당 예시를 붙이면 분류가 일관되어 불필요한 보고가 줄어듦.`]},
   principle:"부정형: 확신을 요구해도 정밀도는 오르지 않음"},

  /* --- D5 (4): 5.4 ×2 · 5.1 · 5.2 --- */

  {scenario:"s4", ts:"5.4", q:`Hour three of a legacy-service audit. The agent has started answering with "services like this usually put retries in a middleware layer" instead of naming the RetryPolicy class it found in hour one, and two of this hour's answers contradict each other. Four hours remain and each remaining question needs a fresh round of searching. What is the right move?`,
   opts:[
     {t:`Write the findings so far into a file the agent can read back, and send each remaining question to a subagent that does the searching and returns only its conclusion.`, ok:true},
     {t:`Start over in a new session so the degradation is cleared, and re-explore from the beginning.`},
     {t:`Have the agent re-read the files it looked at in hour one so the specifics come back into context.`},
     {t:`Keep going but tell the agent to answer only from what it actually found and never from general patterns.`}],
   explain:{good:`"보통 이런 서비스는"이라는 표현이 나오기 시작한 것이 성능 저하 신호임. 발견 내용을 파일로 저장하면 컨텍스트에서 밀려나도 다시 읽을 수 있고, 남은 질문의 긴 검색은 서브에이전트가 수행하고 결론만 반환해야 네 시간을 더 진행할 수 있음.`,
     wrongs:[`<b>B(새 세션 시작):</b> 세 시간 동안의 발견을 전부 버림. 기록으로 옮기면 유지할 수 있는 내용을 재탐색에 다시 소모하는 낭비임.`,`<b>C(파일 재읽기):</b> 같은 파일을 다시 읽으면 이미 가득 찬 컨텍스트에 원문을 다시 넣게 됨. 성능 저하를 가속하는 방향임.`,`<b>D(지시로 해결):</b> 지시로 성능 저하를 막을 수는 없음. 구체적 사실이 컨텍스트에서 밀려난 것이 원인이므로 지시할수록 "모르겠다"는 답만 늘어남.`]},
   principle:"발견은 파일로 저장하고 탐색은 서브에이전트에 위임함"},

  {scenario:"s4", ts:"5.4", multi:2, q:`Your main agent coordinates a codebase audit and delegates investigations to subagents. Two problems in this week's logs: subagents keep returning 8,000-token narrations of everything they searched, and one that was asked to "look into the billing module" came back with a summary of its folder layout instead of the dependency answer the main agent actually needed. Which TWO changes fit? (Select TWO.)`,
   opts:[
     {t:`Have each subagent return only its answer in a fixed shape — the finding, the files it rests on, and whatever it could not determine — and leave the search narration behind.`, ok:true},
     {t:`Make each delegated question specific enough to have a checkable answer, stating what is being asked and what the main agent will do with it, instead of pointing at an area of the code.`, ok:true},
     {t:`Have the main agent run the investigations itself so nothing is lost in the handoff.`},
     {t:`Pass the main agent's full conversation to each subagent so it can work out what is really wanted.`},
     {t:`Cap each subagent's response length so the narration gets truncated.`}],
   explain:{good:`두 증상은 서로 다른 결함임. 반환 내용이 긴 것은 반환 형식을 정하지 않았기 때문이고, 엉뚱한 답이 온 것은 질문이 "빌링 모듈을 검토해 달라" 수준이라 무엇이 정답인지 정해지지 않았기 때문임. 형식을 고정하고 질문을 검증 가능한 하나로 좁히면 두 증상이 모두 사라짐.`,
     wrongs:[`<b>C(본 에이전트가 직접 수행):</b> 본 에이전트가 직접 하면 8천 토큰 규모의 탐색 결과가 본 대화에 그대로 들어감. 위임하는 이유 자체를 없애는 것임.`,`<b>D(히스토리 전달):</b> 히스토리를 통째로 넘기면 격리의 이점을 잃으면서 서브에이전트 컨텍스트까지 채움. 필요한 것은 전부가 아니라 그 질문에 필요한 정보만임.`,`<b>E(길이 상한):</b> 길이 상한은 분량만 자르므로 서술 대신 결론이 잘려나갈 수 있음. 무엇을 담을지 정하지 않은 채 분량만 조정하는 조치임.`]},
   principle:"반환 형식을 정하고 질문을 검증 가능하게 좁힘"},

  {scenario:"s4", ts:"5.1", q:`A pair-programming session runs all day and its context fills with tool output. Every measure below reduces what accumulates, EXCEPT one. Which one does NOT?`,
   opts:[
     {t:`Passing the full conversation history on every request so the agent keeps its bearings.`, ok:true},
     {t:`Trimming each file read down to the span actually discussed before it enters the history.`},
     {t:`Delegating verbose searches to a subagent that returns only what it concluded.`},
     {t:`Compacting the session once the discovery output has piled up.`}],
   explain:{good:`전체 대화 이력을 매 요청에 실어 보내는 것은 대화 일관성을 위해 필요한 동작이지 누적을 줄이는 조치가 아님. 오히려 쌓인 내용을 그대로 다시 전송하는 쪽임. 나머지 셋은 각각 잘라내기, 위임, 압축으로 실제 분량을 줄임.`,
     wrongs:[`<b>B(언급 구간만 보존):</b> 실제로 언급한 구간만 남기면 파일 전문이 누적되는 것을 막음.`,`<b>C(검색 위임):</b> 긴 검색을 위임하면 원시 출력이 본 대화에 들어오지 않음.`,`<b>D(압축):</b> 압축은 누적된 탐색 출력을 줄이는 정식 수단임.`]},
   principle:"부정형: 이력 전달은 필요조건이지 절감 수단이 아님"},

  {scenario:"s4", ts:"5.2", q:`A developer types: "clean up the old auth code." The repo contains a deprecated auth/ directory, a legacy_auth.py module that three live endpoints still import, and a feature-flagged rewrite under auth_v2/. Removing the wrong one takes production down. What should the agent do?`,
   opts:[
     {t:`Name the three candidates it found, say what depends on each, and ask which one "old auth code" means before touching anything.`, ok:true},
     {t:`Pick the deprecated auth/ directory, since "deprecated" is the strongest available signal of what "old" means.`},
     {t:`Remove all three and let the test suite reveal what was still needed.`},
     {t:`Ask the developer to write a more detailed ticket, and stop work until one exists.`}],
   explain:{good:`지시가 세 가지를 가리킬 수 있고 잘못 고르면 프로덕션이 중단됨. 이 경우 추측하지 말고 후보와 각각의 의존 관계를 제시한 뒤 확인받는 것이 맞음. 확인하는 비용은 문장 하나임.`,
     wrongs:[`<b>B(deprecated 표시로 추정):</b> "deprecated로 표시됐으니 그것이 old"라는 판단은 신호의 강도로 고르는 추정임. 이런 선택을 피하라고 배우는 지점임.`,`<b>C(테스트로 확인):</b> 테스트로 확인하겠다는 것은 세 엔드포인트가 실제로 사용하는 모듈을 삭제한 뒤에야 알게 되는 순서임.`,`<b>D(티켓 반려):</b> 티켓을 다시 작성하라고 반려하는 것은 과도함. 후보 세 가지를 제시하고 한 번만 확인받으면 현재 단계에서 해결됨.`]},
   principle:"잘못 선택하면 피해가 큰 모호함은 질문으로 해소함"}

  );
})();
