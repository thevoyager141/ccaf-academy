/* D1 미니테스트: TS별 [기초 1 + 실전 1] 페어, 14문항, 합격선 75% */
window.CCAF_CONTENT.p1.lessons.push(
  { id:"p1test", type:"test", title:"D1 미니테스트: 에이전트 아키텍처 14문항",
    questions:[

    /* ---- 1.1 agentic loop ---- */
    {ts:"1.1", lvl:"기초", q:`Your agent calls the same search tool repeatedly with identical arguments and never progresses. Logs show tool results are being discarded after execution instead of being added to the conversation. Why does this cause the loop?`,
     opts:[
       {t:`The model never sees the tool results, so from its perspective the search has not happened yet — it keeps requesting the same call.`, ok:true},
       {t:`The search tool is rate-limited, causing the model to retry automatically.`},
       {t:`The model's temperature is too low, making it repeat identical outputs.`},
       {t:`The conversation history is too long, so older messages are being truncated.`}],
     explain:{good:`도구 결과(tool result)를 대화에 추가해야 모델이 이미 검색을 실행했다는 사실을 알 수 있음. 결과를 버리면 모델은 그 검색이 실행됐다는 사실 자체를 알지 못함.`,
       wrongs:[`<b>B:</b> 레이트 리밋은 로그에 제시된 결과 폐기와 무관한 추측임.`,`<b>C:</b> temperature는 동일 호출 반복의 원인이 아님.`,`<b>D:</b> 히스토리 길이 문제라는 근거가 없음. 로그가 가리키는 원인은 결과 폐기임.`]},
     principle:"원칙 ② 로그가 가리키는 근본 원인"},
    {ts:"1.1", lvl:"실전", q:`A teammate's loop implementation: exit when (a) the response contains any text block, OR (b) 25 iterations are reached; tool results with HTTP status 200 are appended to the conversation, while non-200 results are silently dropped. Production shows two symptoms: tasks frequently end with unfinished work, and the agent sometimes calls lookup_order repeatedly with identical arguments. Which diagnosis is correct?`,
     opts:[
       {t:`Unfinished work comes from exiting on text blocks (text can accompany "tool_use"); repeated calls come from dropping non-200 results — the model never learns the call failed. Gate the loop on stop_reason and append error results as structured tool results.`, ok:true},
       {t:`Both symptoms come from the 25-iteration cap; raising it to 100 will fix premature endings and repeated calls.`},
       {t:`Unfinished work comes from the iteration cap and repeated calls from API rate limiting; add exponential backoff between iterations.`},
       {t:`Both symptoms indicate weak prompting; add an instruction to "always finish all work before responding."`}],
     explain:{good:`증상 두 개를 각각의 결함에 연결해야 함. ① 텍스트 존재로 종료하면 "tool_use"와 텍스트가 함께 나온 응답에서 조기 종료됨(작업 미완성). ② 200이 아닌 결과를 폐기하면 모델이 실패 사실을 알지 못해 같은 호출을 반복함. 실패한 결과도 구조화된 도구 결과로 돌려줘야 함.`,
       wrongs:[`<b>B:</b> 25회 상한은 두 증상 어느 쪽도 설명하지 못함. 로그의 근거와 맞지 않음.`,`<b>C:</b> 레이트 리밋이라면 백오프가 맞지만, 지문이 제시한 원인은 결과를 버리는 코드임.`,`<b>D:</b> 루프 제어 결함은 프롬프트로 고칠 수 없음. 구현 문제에 지시를 추가하는 것은 증상만 다루는 조치임.`]},
     principle:"원칙 ② 근본 원인 · ⑤ 실패도 구조화해서 전달"},

    /* ---- 1.6 decomposition ---- */
    {ts:"1.6", lvl:"기초", q:`Which task is the best fit for dynamic adaptive decomposition rather than a fixed sequential pipeline?`,
     opts:[
       {t:`Investigating an unfamiliar legacy codebase to add comprehensive tests, where dependencies are discovered along the way.`, ok:true},
       {t:`Reviewing every PR for the same fixed checklist of security, coverage, and conventions.`},
       {t:`Converting 500 documents from one format to another with identical steps per document.`},
       {t:`Generating a weekly report that always aggregates the same four data sources.`}],
     explain:{good:`중간 발견인 의존성이 다음 작업을 결정하는 열린 과제이므로 동적 분해에 해당함. 나머지는 모두 단계를 예측할 수 있는 반복 작업임.`,
       wrongs:[`<b>B:</b> 고정 체크리스트를 반복하므로 프롬프트 체이닝임.`,`<b>C:</b> 문서마다 동일한 단계를 거치므로 파이프라인임.`,`<b>D:</b> 매주 같은 소스를 집계하므로 파이프라인임.`]},
     principle:"작업 성격에 따라 분해 방식을 선택"},
    {ts:"1.6", lvl:"실전", q:`Your nightly CI job reviews the day's merged changes — typically 20-40 files across billing-api, notification-worker, and shared/utils. The single-pass review misses obvious bugs in some files and gives contradictory judgments on identical patterns. The team debates four redesigns. Which is best?`,
     opts:[
       {t:`Run a per-file local-analysis pass over each changed file, then one separate integration pass examining cross-file data flow among the changed services (e.g., billing-api ↔ shared/utils call sites).`, ok:true},
       {t:`First summarize each file, then run a single review over the summaries so everything fits in one focused pass.`},
       {t:`Switch to a model with a larger context window so all files receive adequate attention in one pass.`},
       {t:`Keep the single pass but run it three times and post only findings that appear in at least two runs.`}],
     explain:{good:`원인은 주의력 희석임. 파일별 패스가 개별 파일의 버그를 일정한 깊이로 찾아내고, 별도의 통합 패스가 서비스 간 데이터 흐름(호출 지점)을 확인함. 가이드가 제시한 프롬프트 체이닝의 대표 사례임.`,
       wrongs:[`<b>B:</b> 그럴듯해 보이지만 자주 틀리는 선택지임. 요약은 라인 수준 정보를 잃으므로 개별 파일의 버그를 오히려 더 놓침. 요약본을 검토하는 것은 코드 리뷰가 아님.`,`<b>C:</b> 컨텍스트 크기를 늘려도 주의력 희석 문제는 해결되지 않음.`,`<b>D:</b> 두 번 이상 나온 결과만 채택하는 방식은 간헐적으로만 발견되는 실제 버그를 제외하게 됨.`]},
     principle:"원칙 ② 근본 원인: 주의력 희석"},

    /* ---- 1.2 orchestration ---- */
    {ts:"1.2", lvl:"기초", q:`A research system on "renewable energy adoption" produces reports covering only solar power. Logs show the coordinator created subtasks: "solar panel costs," "residential solar trends," "solar subsidies." Every subagent succeeded. Where is the failure?`,
     opts:[
       {t:`In the coordinator's task decomposition — it never assigned wind, hydro, geothermal, or policy subtopics, so no downstream agent could cover them.`, ok:true},
       {t:`In the synthesis agent, which failed to notice the missing energy types.`},
       {t:`In the web search agent, whose queries were too narrow.`},
       {t:`In the report generator, which trimmed non-solar sections for length.`}],
     explain:{good:`분해 로그가 원인을 직접 보여줌. 코디네이터가 태양광 주제로만 분해함. 하위 에이전트는 할당받은 작업을 정상 수행했을 뿐임.`,
       wrongs:[`<b>B:</b> 합성 단계는 전달받은 내용만 조합할 수 있음.`,`<b>C:</b> 검색은 할당받은 범위 안에서 정상 수행함.`,`<b>D:</b> 로그에 없는 추측임. 근거는 분해 단계를 가리킴.`]},
     principle:"원칙 ② 로그가 가리키는 근본 원인"},
    {ts:"1.2", lvl:"실전", q:`Reviewing a run on "global AI regulation": the coordinator decomposed it into "EU AI Act obligations," "EU AI Act enforcement timeline," and "EU AI Act penalties." The search and analysis agents each fetched largely identical EU sources (tripling token spend), and the report ignores the US, China, and international standards bodies. What is the best correction?`,
     opts:[
       {t:`Rework the coordinator's decomposition to partition the research scope into distinct, non-overlapping subtopics and source types (e.g., EU / US / China / international standards), minimizing duplication while covering the full topic.`, ok:true},
       {t:`Add a deduplication filter in the synthesis stage that drops repeated sources before the report is written.`},
       {t:`Allow the search agents to see each other's result sets directly so they stop re-fetching the same sources.`},
       {t:`Double the number of search subagents so more regions get covered.`}],
     explain:{good:`증상은 두 개(중복 조회로 인한 비용 낭비, 커버리지 공백)이지만 원인은 하나임. 좁고 서로 겹치는 분해임. 조사 범위를 상호 배타적인 하위 주제와 소스 유형으로 나누면 두 증상이 함께 해결됨. 가이드 1.2가 제시한 중복 최소화 파티셔닝에 해당함.`,
       wrongs:[`<b>B:</b> 중복이라는 증상만 제거하고 커버리지 공백은 그대로 남김. 이미 소모한 토큰도 회수되지 않음.`,`<b>C:</b> 서브에이전트 간 직접 통신은 허브 앤 스포크 구조에 어긋남. 관측 가능성과 에러 처리의 일관성이 사라짐.`,`<b>D:</b> 분해를 고치지 않으면 에이전트를 늘려도 같은 EU 소스만 더 많이 수집함.`]},
     principle:"원칙 ② 근본 원인 · 조사 범위 파티셔닝"},

    /* ---- 1.3 context passing ---- */
    {ts:"1.3", lvl:"기초", q:`A coordinator must run three independent document analyses. Which invocation pattern minimizes latency?`,
     opts:[
       {t:`Emit three Agent tool calls in a single coordinator response so the subagents run in parallel.`, ok:true},
       {t:`Invoke one Agent tool call per conversational turn, waiting for each result before the next.`},
       {t:`Ask one subagent to analyze all three documents in sequence.`},
       {t:`Spawn a subagent that itself spawns three more subagents.`}],
     explain:{good:`병렬 실행의 공식 패턴은 한 응답 안에 Agent 도구 호출 여러 개를 함께 내보내는 것임.`,
       wrongs:[`<b>B:</b> 턴을 나누면 순차 실행이 됨.`,`<b>C:</b> 한 에이전트가 직렬로 처리하므로 지연이 줄지 않음.`,`<b>D:</b> 불필요한 중첩임. 코디네이터가 직접 병렬로 호출하면 됨.`]},
     principle:"원칙 ③ 있는 기능부터"},
    {ts:"1.3", lvl:"실전", q:`Your coordinator passes findings to the synthesis agent by concatenating each subagent's full transcript — including intermediate reasoning and tool chatter — into one markdown blob. Final reports mix up publication dates and misattribute quotes to the wrong papers. Which change best fixes attribution?`,
     opts:[
       {t:`Have subagents return structured findings — claim, evidence excerpt, source URL, document name, publication date — and pass that structure to synthesis instead of raw transcripts.`, ok:true},
       {t:`Pass the coordinator's entire conversation history to the synthesis agent so it has maximum context to sort out sources.`},
       {t:`Instruct the synthesis agent to re-verify every quote against the web before including it in the report.`},
       {t:`Reduce the number of findings passed per run so the synthesis agent can track sources more easily.`}],
     explain:{good:`출처가 섞이는 원인은 입력 구조임. 추론 과정과 사실이 한 묶음으로 전달되어 주장과 출처의 연결이 끊어짐. 내용과 메타데이터(출처 URL, 문서명, 발행일)를 구조화해 분리 전달하는 것이 가이드 1.3의 권장 방식임.`,
       wrongs:[`<b>B:</b> 불필요한 정보를 더 늘리는 방향임. 전부 전달하면 알아서 처리한다는 접근은 오답 패턴임.`,`<b>C:</b> 합성 에이전트의 역할을 벗어난 도구를 쓰게 되고 왕복 비용도 크게 늘어남. 입력 구조라는 근본 원인은 그대로 남음.`,`<b>D:</b> 정보를 줄여 증상만 완화할 뿐임. 남은 발견도 여전히 섞임.`]},
     principle:"원칙 ② 근본 원인 · 출처는 구조화 전달"},

    /* ---- 1.4 enforcement & handoff ---- */
    {ts:"1.4", lvl:"기초", q:`In 12% of cases, your agent skips get_customer and calls lookup_order with only the customer's stated name, occasionally misidentifying accounts. What most effectively fixes this?`,
     opts:[
       {t:`A programmatic prerequisite that blocks lookup_order and process_refund until get_customer has returned a verified customer ID.`, ok:true},
       {t:`A system prompt stating that verification via get_customer is mandatory before order operations.`},
       {t:`Few-shot examples showing get_customer always being called first.`},
       {t:`A routing classifier that enables only the tools relevant to each request type.`}],
     explain:{good:`금전 사고로 이어지는 순서 규칙은 프로그램적 전제조건으로 강제해야 실패율이 0이 됨. 공식 가이드 샘플 문제 1번(검증 전 환불 차단 훅 문제)과 동일한 논리임.`,
       wrongs:[`<b>B:</b> 확률적 준수임. 12%를 줄일 뿐 0으로 만들지 못함.`,`<b>C:</b> 마찬가지로 확률적인 방식임.`,`<b>D:</b> 문제는 도구 호출 순서이지 도구 가용성이 아님.`]},
     principle:"원칙 ① 강제는 프로그램으로"},
    {ts:"1.4", lvl:"실전", q:`A customer writes: "I was double-charged on order #A-1042, my other order #A-1038 hasn't shipped in 12 days, and my loyalty points from last month never appeared." Your agent refunds the double charge and ends the conversation. What is the correct handling pattern?`,
     opts:[
       {t:`Decompose the message into three distinct issues, investigate them in parallel using the shared customer context, then synthesize one unified resolution covering all three.`, ok:true},
       {t:`Resolve the double charge first and ask the customer to open separate tickets for the shipping and loyalty issues.`},
       {t:`Escalate the whole message to a human agent, since multi-issue requests exceed a single agent's scope.`},
       {t:`Add a system prompt instruction telling the agent to "answer every part of the customer's message thoroughly."`}],
     explain:{good:`가이드 1.4가 명시한 패턴임. 여러 문제가 섞인 요청은 항목별로 분해한 뒤 공유 컨텍스트로 병렬 조사하고 하나의 답변으로 통합함. 고객은 한 번에 완결된 답을 받아야 함.`,
       wrongs:[`<b>B:</b> 시스템이 처리할 일을 고객에게 넘김. 첫 접촉 해결률(FCR)도 크게 떨어짐.`,`<b>C:</b> 에이전트가 처리할 수 있는 일반적인 이슈 세 건임. 과잉 에스컬레이션도 오답임.`,`<b>D:</b> 빠짐없이 답하라는 지시는 확률적임. 분해, 병렬 조사, 통합이라는 구조가 없으면 같은 문제가 반복됨.`]},
     principle:"원칙 ① 구조로 해결 · ③ 과잉 에스컬레이션 금지"},

    /* ---- 1.5 hooks ---- */
    {ts:"1.5", lvl:"기초", q:`Policy: refunds above $500 must always go to a human. Which implementation guarantees compliance while keeping normal refunds automated?`,
     opts:[
       {t:`An interception hook that blocks process_refund calls over $500 and redirects them to the escalation workflow.`, ok:true},
       {t:`A system prompt rule: "always escalate refunds above $500."`},
       {t:`Removing process_refund from the agent entirely.`},
       {t:`Logging all refunds and auditing violations weekly.`}],
     explain:{good:`차단과 대체 경로 연결을 함께 구현해야 완전함. 한도 이하 금액의 자동 처리도 그대로 유지됨.`,
       wrongs:[`<b>B:</b> 확률적인 방식이므로 컴플라이언스 요구에는 부족함.`,`<b>C:</b> 정상 환불까지 차단하는 과잉 조치임.`,`<b>D:</b> 사후 감사는 위반을 막지 못함.`]},
     principle:"원칙 ① 강제는 프로그램으로 · 필요 이상 차단하지 않기"},
    {ts:"1.5", lvl:"실전", q:`Two rules for your refund agent: (1) data returned by lookup_order mixes Unix epochs and ISO 8601 timestamps and must be consistent before the model reasons about refund deadlines; (2) refunds over $1,000 must never execute automatically. An engineer proposes implementing both rules in a single PostToolUse hook. What is the correct assessment?`,
     opts:[
       {t:`Rule 1 belongs in PostToolUse (transform results before the model sees them), but rule 2 requires an outgoing tool-call interception hook — by the time PostToolUse fires, process_refund has already executed.`, ok:true},
       {t:`Both rules fit in PostToolUse, since it can inspect amounts in the tool results and reject violations it finds.`},
       {t:`Rule 1 needs an interception hook and rule 2 belongs in PostToolUse, since results reveal the final refund amount.`},
       {t:`Neither rule needs hooks if the system prompt states both requirements as absolute constraints.`}],
     explain:{good:`훅이 적용되는 단계를 아는지 묻는 문제임. PostToolUse는 실행 후 결과 단계이므로 정규화(규칙 1)에 맞음. 실행 자체를 막아야 하는 규칙 2는 나가는 호출을 가로채는 훅이어야 함. 결과 단계에서 차단하면 환불은 이미 실행된 뒤임.`,
       wrongs:[`<b>B:</b> PostToolUse가 위반을 발견해도 실행은 이미 끝난 상태임. 사후 발견은 차단이 아님.`,`<b>C:</b> 두 규칙의 배치가 모두 반대임. 정규화는 결과 단계, 차단은 호출 단계에서 수행함.`,`<b>D:</b> "must never"는 결정론적 보장을 요구하는 조건임. 프롬프트는 확률적임.`]},
     principle:"원칙 ① 차단은 호출 전, 변환은 결과 후"},

    /* ---- 1.7 sessions ---- */
    {ts:"1.7", lvl:"기초", q:`Yesterday's session analyzed a large codebase. Overnight, an automated dependency upgrade changed many files across the repository. You need to continue the analysis today. What is the most reliable approach?`,
     opts:[
       {t:`Start a fresh session, injecting a structured summary of yesterday's key conclusions, because the session's tool results are now stale.`, ok:true},
       {t:`Resume yesterday's session unchanged — the history is valuable context.`},
       {t:`Resume yesterday's session and mention that "some things may have changed."`},
       {t:`Fork yesterday's session and continue in the branch.`}],
     explain:{good:`광범위한 파일 변경이 있으면 도구 결과가 stale해지므로, 구조화 요약을 새 세션에 주입하는 것이 권장 방식임.`,
       wrongs:[`<b>B:</b> 낡은 분석 위에서 추론하게 됨.`,`<b>C:</b> 무엇이 바뀌었는지 특정하지 못하는 임시 조치임.`,`<b>D:</b> fork는 stale 문제를 해결하지 못함. 분기도 낡은 상태를 그대로 물려받음.`]},
     principle:"stale이면 구조화 요약과 새 세션"},
    {ts:"1.7", lvl:"실전", q:`Your named session "checkout-migration" holds a deep analysis of the payments module. Since then, exactly one thing changed: you merged a PR renaming PaymentGateway to PaymentProvider across 6 files. You want to continue migration planning now. What is the most efficient approach?`,
     opts:[
       {t:`Resume "checkout-migration" with --resume and inform the agent that PaymentGateway was renamed to PaymentProvider in those 6 files, so it re-analyzes only the affected parts.`, ok:true},
       {t:`Start a new session with a structured summary — any file change makes the old session's tool results stale.`},
       {t:`Fork the session and continue in the branch, keeping the original untouched.`},
       {t:`Resume the session without mentioning the rename; the agent will notice the change when it next reads the files.`}],
     explain:{good:`기초 문제와의 차이가 판단 기준임. 여기서는 변경이 특정적이고 소규모(파일 6개의 이름 변경)이며 나머지 분석은 유효함. 이 경우 재개한 뒤 변경 사실을 알리고 해당 부분만 재분석하는 것이 가장 효율적임. 가이드 1.7이 제시한 방식과 같음. stale 여부는 변경의 범위로 판단함.`,
       wrongs:[`<b>B:</b> 과잉 대응임. 변경이 있다고 해서 항상 stale인 것은 아님. 유효한 대규모 분석을 버리는 낭비임.`,`<b>C:</b> fork의 목적인 두 접근 비교가 이 상황에는 없음.`,`<b>D:</b> 변경을 알리지 않고 재개하면 낡은 이름(PaymentGateway)을 전제로 계획을 세울 위험이 있음.`]},
     principle:"stale은 변경 범위로 판단하고, 소규모면 재개 후 변경 고지"},
    ]}
);
