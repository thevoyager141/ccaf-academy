/* D1 미니테스트 — TS별 [기초 1 + 실전 1] 페어, 14문항, 합격선 75% */
window.CCAF_CONTENT.p1.lessons.push(
  { id:"p1test", type:"test", title:"D1 미니테스트 — 에이전트 아키텍처 14문항",
    questions:[

    /* ---- 1.1 agentic loop ---- */
    {ts:"1.1", lvl:"기초", q:`Your agent calls the same search tool repeatedly with identical arguments and never progresses. Logs show tool results are being discarded after execution instead of being added to the conversation. Why does this cause the loop?`,
     opts:[
       {t:`The model never sees the tool results, so from its perspective the search has not happened yet — it keeps requesting the same call.`, ok:true},
       {t:`The search tool is rate-limited, causing the model to retry automatically.`},
       {t:`The model's temperature is too low, making it repeat identical outputs.`},
       {t:`The conversation history is too long, so older messages are being truncated.`}],
     explain:{good:`도구 결과를 대화에 추가해야 모델이 "이미 검색했음"을 알 수 있어. 결과가 버려지면 모델 입장에선 검색이 아직 안 일어난 것.`,
       wrongs:[`<b>B:</b> 레이트리밋은 로그에 나온 "결과 폐기"와 무관한 추측.`,`<b>C:</b> temperature는 반복 호출의 원인이 아니야.`,`<b>D:</b> 히스토리 길이 문제라는 증거가 없어. 로그가 가리키는 원인은 결과 폐기.`]},
     principle:"원칙 ② 로그가 가리키는 근본 원인"},
    {ts:"1.1", lvl:"실전", q:`A teammate's loop implementation: exit when (a) the response contains any text block, OR (b) 25 iterations are reached; tool results with HTTP status 200 are appended to the conversation, while non-200 results are silently dropped. Production shows two symptoms: tasks frequently end with unfinished work, and the agent sometimes calls lookup_order repeatedly with identical arguments. Which diagnosis is correct?`,
     opts:[
       {t:`Unfinished work comes from exiting on text blocks (text can accompany "tool_use"); repeated calls come from dropping non-200 results — the model never learns the call failed. Gate the loop on stop_reason and append error results as structured tool results.`, ok:true},
       {t:`Both symptoms come from the 25-iteration cap; raising it to 100 will fix premature endings and repeated calls.`},
       {t:`Unfinished work comes from the iteration cap and repeated calls from API rate limiting; add exponential backoff between iterations.`},
       {t:`Both symptoms indicate weak prompting; add an instruction to "always finish all work before responding."`}],
     explain:{good:`증상 2개를 각각의 결함에 연결해야 해. ①텍스트 존재로 종료 → "tool_use"와 텍스트가 공존하는 응답에서 조기 종료(미완성 작업). ②비200 결과 폐기 → 모델이 실패 사실 자체를 몰라 같은 호출 반복. 실패도 구조화된 도구 결과로 돌려줘야 해.`,
       wrongs:[`<b>B:</b> 상한 25회는 두 증상 어느 쪽도 설명 못 해 — 로그의 증거와 안 맞아.`,`<b>C:</b> 레이트리밋이라면 백오프가 맞지만, 지문의 원인은 "결과를 버리는 코드"야.`,`<b>D:</b> 루프 제어 결함은 프롬프트로 못 고쳐. 구현 문제에 지시 추가는 증상 처치.`]},
     principle:"원칙 ② 근본 원인 · ⑤ 실패도 구조화해서 전달"},

    /* ---- 1.6 decomposition ---- */
    {ts:"1.6", lvl:"기초", q:`Which task is the best fit for dynamic adaptive decomposition rather than a fixed sequential pipeline?`,
     opts:[
       {t:`Investigating an unfamiliar legacy codebase to add comprehensive tests, where dependencies are discovered along the way.`, ok:true},
       {t:`Reviewing every PR for the same fixed checklist of security, coverage, and conventions.`},
       {t:`Converting 500 documents from one format to another with identical steps per document.`},
       {t:`Generating a weekly report that always aggregates the same four data sources.`}],
     explain:{good:`중간 발견(의존성)이 다음 할 일을 결정하는 열린 과제 → 동적 분해. 나머지는 전부 단계가 예측 가능한 반복 작업이야.`,
       wrongs:[`<b>B:</b> 고정 체크리스트 반복 → chaining.`,`<b>C:</b> 문서마다 동일 단계 → 파이프라인.`,`<b>D:</b> 매주 같은 소스 집계 → 파이프라인.`]},
     principle:"작업 성격 → 분해 방식 매칭"},
    {ts:"1.6", lvl:"실전", q:`Your nightly CI job reviews the day's merged changes — typically 20-40 files across billing-api, notification-worker, and shared/utils. The single-pass review misses obvious bugs in some files and gives contradictory judgments on identical patterns. The team debates four redesigns. Which is best?`,
     opts:[
       {t:`Run a per-file local-analysis pass over each changed file, then one separate integration pass examining cross-file data flow among the changed services (e.g., billing-api ↔ shared/utils call sites).`, ok:true},
       {t:`First summarize each file, then run a single review over the summaries so everything fits in one focused pass.`},
       {t:`Switch to a model with a larger context window so all files receive adequate attention in one pass.`},
       {t:`Keep the single pass but run it three times and post only findings that appear in at least two runs.`}],
     explain:{good:`원인은 주의력 희석. 파일별 패스가 로컬 버그를 일정한 깊이로 잡고, 별도 통합 패스가 서비스 간 데이터 흐름(호출 지점)을 커버해. 가이드의 prompt chaining 대표 케이스.`,
       wrongs:[`<b>B:</b> 그럴듯하지만 함정 — 요약은 라인 수준 디테일을 잃어서 로컬 버그를 오히려 더 놓쳐. 요약본 리뷰는 리뷰가 아니야.`,`<b>C:</b> 컨텍스트 크기는 주의력 품질 문제를 해결 못 해.`,`<b>D:</b> 합의 필터는 간헐적으로만 잡히는 진짜 버그를 억눌러.`]},
     principle:"원칙 ② 근본 원인 (주의력 희석)"},

    /* ---- 1.2 orchestration ---- */
    {ts:"1.2", lvl:"기초", q:`A research system on "renewable energy adoption" produces reports covering only solar power. Logs show the coordinator created subtasks: "solar panel costs," "residential solar trends," "solar subsidies." Every subagent succeeded. Where is the failure?`,
     opts:[
       {t:`In the coordinator's task decomposition — it never assigned wind, hydro, geothermal, or policy subtopics, so no downstream agent could cover them.`, ok:true},
       {t:`In the synthesis agent, which failed to notice the missing energy types.`},
       {t:`In the web search agent, whose queries were too narrow.`},
       {t:`In the report generator, which trimmed non-solar sections for length.`}],
     explain:{good:`분해 로그가 원인을 직접 증언해: 코디네이터가 태양광으로만 쪼갰어. 하류는 할당받은 일을 완수했을 뿐.`,
       wrongs:[`<b>B:</b> 합성은 받은 것만 조합 가능.`,`<b>C:</b> 검색은 할당 범위 안에서 정상 수행.`,`<b>D:</b> 로그에 없는 추측. 증거는 분해 단계를 가리켜.`]},
     principle:"원칙 ② 로그가 가리키는 근본 원인"},
    {ts:"1.2", lvl:"실전", q:`Reviewing a run on "global AI regulation": the coordinator decomposed it into "EU AI Act obligations," "EU AI Act enforcement timeline," and "EU AI Act penalties." The search and analysis agents each fetched largely identical EU sources (tripling token spend), and the report ignores the US, China, and international standards bodies. What is the best correction?`,
     opts:[
       {t:`Rework the coordinator's decomposition to partition the research scope into distinct, non-overlapping subtopics and source types (e.g., EU / US / China / international standards), minimizing duplication while covering the full topic.`, ok:true},
       {t:`Add a deduplication filter in the synthesis stage that drops repeated sources before the report is written.`},
       {t:`Allow the search agents to see each other's result sets directly so they stop re-fetching the same sources.`},
       {t:`Double the number of search subagents so more regions get covered.`}],
     explain:{good:`증상이 두 개(중복 낭비 + 커버리지 구멍)인데 원인은 하나 — 좁고 겹치는 분해. 스코프를 상호배타적 하위주제·소스유형으로 파티셔닝하면 둘 다 풀려. 가이드 1.2의 "중복 최소화 파티셔닝" 그대로.`,
       wrongs:[`<b>B:</b> 중복(증상)만 지우고 커버리지 구멍은 그대로. 이미 쓴 토큰도 못 살려.`,`<b>C:</b> 서브에이전트 간 직접 통신은 허브-앤-스포크 위반. 관측성·에러 처리 일관성이 깨져.`,`<b>D:</b> 분해를 안 고치면 에이전트가 늘어도 같은 EU 소스만 더 긁어.`]},
     principle:"원칙 ② 근본 원인 · 스코프 파티셔닝"},

    /* ---- 1.3 context passing ---- */
    {ts:"1.3", lvl:"기초", q:`A coordinator must run three independent document analyses. Which invocation pattern minimizes latency?`,
     opts:[
       {t:`Emit three Task tool calls in a single coordinator response so the subagents run in parallel.`, ok:true},
       {t:`Invoke one Task per conversational turn, waiting for each result before the next.`},
       {t:`Ask one subagent to analyze all three documents in sequence.`},
       {t:`Spawn a subagent that itself spawns three more subagents.`}],
     explain:{good:`병렬 실행 공식 패턴: 한 응답 안에 Task 호출 여러 개.`,
       wrongs:[`<b>B:</b> 턴 분리는 순차 실행.`,`<b>C:</b> 한 에이전트 직렬 처리라 지연 그대로.`,`<b>D:</b> 불필요한 중첩. 코디네이터가 직접 병렬 호출하면 될 일.`]},
     principle:"원칙 ③ 있는 기능부터"},
    {ts:"1.3", lvl:"실전", q:`Your coordinator passes findings to the synthesis agent by concatenating each subagent's full transcript — including intermediate reasoning and tool chatter — into one markdown blob. Final reports mix up publication dates and misattribute quotes to the wrong papers. Which change best fixes attribution?`,
     opts:[
       {t:`Have subagents return structured findings — claim, evidence excerpt, source URL, document name, publication date — and pass that structure to synthesis instead of raw transcripts.`, ok:true},
       {t:`Pass the coordinator's entire conversation history to the synthesis agent so it has maximum context to sort out sources.`},
       {t:`Instruct the synthesis agent to re-verify every quote against the web before including it in the report.`},
       {t:`Reduce the number of findings passed per run so the synthesis agent can track sources more easily.`}],
     explain:{good:`출처가 섞이는 원인은 입력 구조: 추론 잡음과 사실이 한 덩어리라 주장-출처 연결이 끊겨. 내용과 메타데이터(출처 URL·문서명·발행일)를 구조화해 분리 전달하는 게 가이드 1.3의 정석.`,
       wrongs:[`<b>B:</b> 잡음을 더 붓는 방향. 자동 상속처럼 "다 주면 알아서" 접근은 오답 패턴.`,`<b>C:</b> 역할 밖 도구 + 왕복 비용 폭증. 입력 구조라는 근본 원인은 방치.`,`<b>D:</b> 정보를 줄여 증상을 완화할 뿐, 남은 발견도 여전히 뒤섞여.`]},
     principle:"원칙 ② 근본 원인 · 출처는 구조화 전달"},

    /* ---- 1.4 enforcement & handoff ---- */
    {ts:"1.4", lvl:"기초", q:`In 12% of cases, your agent skips get_customer and calls lookup_order with only the customer's stated name, occasionally misidentifying accounts. What most effectively fixes this?`,
     opts:[
       {t:`A programmatic prerequisite that blocks lookup_order and process_refund until get_customer has returned a verified customer ID.`, ok:true},
       {t:`A system prompt stating that verification via get_customer is mandatory before order operations.`},
       {t:`Few-shot examples showing get_customer always being called first.`},
       {t:`A routing classifier that enables only the tools relevant to each request type.`}],
     explain:{good:`금전 사고가 걸린 순서 규칙은 프로그램적 전제조건으로 강제해야 실패율이 0이 돼. 공식 가이드 샘플 1번(검증 전 환불 차단 훅 문제)과 동일한 논리.`,
       wrongs:[`<b>B:</b> 확률적 준수 — 12%를 줄일 뿐 0으로 못 만들어.`,`<b>C:</b> 마찬가지로 확률적.`,`<b>D:</b> 문제는 도구 순서지 가용성이 아니야.`]},
     principle:"원칙 ① 강제는 프로그램으로"},
    {ts:"1.4", lvl:"실전", q:`A customer writes: "I was double-charged on order #A-1042, my other order #A-1038 hasn't shipped in 12 days, and my loyalty points from last month never appeared." Your agent refunds the double charge and ends the conversation. What is the correct handling pattern?`,
     opts:[
       {t:`Decompose the message into three distinct issues, investigate them in parallel using the shared customer context, then synthesize one unified resolution covering all three.`, ok:true},
       {t:`Resolve the double charge first and ask the customer to open separate tickets for the shipping and loyalty issues.`},
       {t:`Escalate the whole message to a human agent, since multi-issue requests exceed a single agent's scope.`},
       {t:`Add a system prompt instruction telling the agent to "answer every part of the customer's message thoroughly."`}],
     explain:{good:`가이드 1.4 명시 패턴: 멀티 컨선 요청은 항목 분해 → 공유 컨텍스트로 병렬 조사 → 통합 해결. 고객은 한 번에 완결된 답을 받아야 해.`,
       wrongs:[`<b>B:</b> 시스템의 일을 고객에게 전가. 첫 접촉 해결률(FCR)도 무너져.`,`<b>C:</b> 에이전트가 처리 가능한 일상 이슈 3개야. 과잉 에스컬레이션도 오답.`,`<b>D:</b> "빠짐없이 답해"는 확률적 지시. 구조(분해→병렬→통합)가 없으면 재발해.`]},
     principle:"원칙 ① 구조로 해결 · ③ 과잉 에스컬레이션 금지"},

    /* ---- 1.5 hooks ---- */
    {ts:"1.5", lvl:"기초", q:`Policy: refunds above $500 must always go to a human. Which implementation guarantees compliance while keeping normal refunds automated?`,
     opts:[
       {t:`An interception hook that blocks process_refund calls over $500 and redirects them to the escalation workflow.`, ok:true},
       {t:`A system prompt rule: "always escalate refunds above $500."`},
       {t:`Removing process_refund from the agent entirely.`},
       {t:`Logging all refunds and auditing violations weekly.`}],
     explain:{good:`차단 + 대체 경로 연결이 완전한 구현. 이하 금액 자동화도 유지돼.`,
       wrongs:[`<b>B:</b> 확률적 — 컴플라이언스엔 부족.`,`<b>C:</b> 정상 환불까지 차단하는 과잉.`,`<b>D:</b> 사후 감사는 위반을 막지 못해.`]},
     principle:"원칙 ① + 필요 이상 자르지 않기"},
    {ts:"1.5", lvl:"실전", q:`Two rules for your refund agent: (1) data returned by lookup_order mixes Unix epochs and ISO 8601 timestamps and must be consistent before the model reasons about refund deadlines; (2) refunds over $1,000 must never execute automatically. An engineer proposes implementing both rules in a single PostToolUse hook. What is the correct assessment?`,
     opts:[
       {t:`Rule 1 belongs in PostToolUse (transform results before the model sees them), but rule 2 requires an outgoing tool-call interception hook — by the time PostToolUse fires, process_refund has already executed.`, ok:true},
       {t:`Both rules fit in PostToolUse, since it can inspect amounts in the tool results and reject violations it finds.`},
       {t:`Rule 1 needs an interception hook and rule 2 belongs in PostToolUse, since results reveal the final refund amount.`},
       {t:`Neither rule needs hooks if the system prompt states both requirements as absolute constraints.`}],
     explain:{good:`훅의 방향을 아는지 묻는 문제야. PostToolUse는 "실행 후 결과" 단계라 정규화(규칙1)에 맞고, 실행 자체를 막아야 하는 규칙2는 "나가는 호출"을 가로채는 훅이어야 해. 결과 단계에서 차단하면 이미 돈이 나간 뒤야.`,
       wrongs:[`<b>B:</b> PostToolUse가 위반을 "발견"해도 실행은 이미 끝났어. 사후 발견 ≠ 차단.`,`<b>C:</b> 방향이 둘 다 반대. 정규화는 결과 단계, 차단은 호출 단계.`,`<b>D:</b> "must never"는 결정론적 보장 요구 — 프롬프트는 확률적.`]},
     principle:"원칙 ① 훅의 방향: 차단은 호출 전, 변환은 결과 후"},

    /* ---- 1.7 sessions ---- */
    {ts:"1.7", lvl:"기초", q:`Yesterday's session analyzed a large codebase. Overnight, an automated dependency upgrade changed many files across the repository. You need to continue the analysis today. What is the most reliable approach?`,
     opts:[
       {t:`Start a fresh session, injecting a structured summary of yesterday's key conclusions, because the session's tool results are now stale.`, ok:true},
       {t:`Resume yesterday's session unchanged — the history is valuable context.`},
       {t:`Resume yesterday's session and mention that "some things may have changed."`},
       {t:`Fork yesterday's session and continue in the branch.`}],
     explain:{good:`광범위한 파일 변경 → 도구 결과 stale → 구조화 요약 + 새 세션이 정석.`,
       wrongs:[`<b>B:</b> 낡은 분석 위에서 추론하게 됨.`,`<b>C:</b> 무엇이 바뀌었는지 특정하지 못하는 미봉책.`,`<b>D:</b> fork는 stale 문제를 해결하지 않아 — 분기도 낡은 상태를 물려받아.`]},
     principle:"stale이면 요약 + 새 출발"},
    {ts:"1.7", lvl:"실전", q:`Your named session "checkout-migration" holds a deep analysis of the payments module. Since then, exactly one thing changed: you merged a PR renaming PaymentGateway to PaymentProvider across 6 files. You want to continue migration planning now. What is the most efficient approach?`,
     opts:[
       {t:`Resume "checkout-migration" with --resume and inform the agent that PaymentGateway was renamed to PaymentProvider in those 6 files, so it re-analyzes only the affected parts.`, ok:true},
       {t:`Start a new session with a structured summary — any file change makes the old session's tool results stale.`},
       {t:`Fork the session and continue in the branch, keeping the original untouched.`},
       {t:`Resume the session without mentioning the rename; the agent will notice the change when it next reads the files.`}],
     explain:{good:`기초 문제와의 차이가 핵심: 여기선 변경이 특정적·소규모(6개 파일 리네임)고 나머지 분석은 유효해. 이럴 땐 재개 + 변경 사실 고지 + 타겟 재분석이 가장 효율적 — 가이드 1.7의 "resume하되 바뀐 파일을 알려라" 그대로. stale 판단은 변경의 범위로 하는 거야.`,
       wrongs:[`<b>B:</b> 과잉 반응. "변경 = 무조건 stale"이 아니야. 유효한 대규모 분석을 버리는 낭비.`,`<b>C:</b> fork의 목적(두 접근 비교)이 여기 없어.`,`<b>D:</b> 고지 없이 재개하면 낡은 이름(PaymentGateway) 전제로 계획을 세울 위험.`]},
     principle:"stale은 변경 범위로 판단 — 소규모면 resume+고지"},
    ]}
);
