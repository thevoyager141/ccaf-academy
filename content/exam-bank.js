/* PART 7 — 모의고사 시뮬레이터: 시나리오 메타 + 문제은행 확장 + 미니테스트→시나리오 매핑 */

/* 시나리오 메타 */
window.CCAF_SCENARIOS = {
  s1:{no:"①", name:"고객지원 해결 에이전트", en:"Customer Support Resolution Agent",
      brief:"Agent SDK 기반 지원 에이전트. MCP 도구: get_customer, lookup_order, process_refund, escalate_to_human. 목표 FCR 80%+."},
  s2:{no:"②", name:"Claude Code 코드 생성", en:"Code Generation with Claude Code",
      brief:"팀 개발 워크플로에 Claude Code 통합 — 커스텀 커맨드, CLAUDE.md, plan mode vs 직접 실행."},
  s3:{no:"③", name:"멀티에이전트 리서치 시스템", en:"Multi-Agent Research System",
      brief:"코디네이터가 웹 검색·문서 분석·종합·리포트 생성 서브에이전트에 위임. 출처 달린 종합 리포트가 목표."},
  s4:{no:"④", name:"개발자 생산성 도구", en:"Developer Productivity with Claude",
      brief:"코드베이스 탐색·레거시 이해·보일러플레이트 생성 도구. 내장 도구(Read/Write/Bash/Grep/Glob) + MCP 서버."},
  s5:{no:"⑤", name:"Claude Code CI/CD 통합", en:"Claude Code for Continuous Integration",
      brief:"CI 파이프라인의 자동 코드 리뷰·테스트 생성·PR 피드백. 실행 가능한 피드백과 낮은 오탐이 목표."},
  s6:{no:"⑥", name:"구조화 데이터 추출", en:"Structured Data Extraction",
      brief:"비정형 문서에서 추출 → JSON 스키마 검증 → 다운스트림 연동. 엣지 케이스의 우아한 처리가 목표."},
};

/* 미니테스트 문항 → 시나리오 매핑 (파트 테스트 id : 문항 순서대로) */
window.CCAF_MT_SCEN = {
  p1test: ["s1","s1","s5","s2","s3","s3","s3","s3","s1","s1","s1","s2","s2","s2"],
  p2test: ["s4","s4","s1","s3","s6","s1","s4","s4","s4","s4"],
  p3test: ["s2","s2","s2","s2","s2","s2","s2","s2","s5","s2","s5","s5"],
  p4test: ["s5","s5","s1","s5","s6","s6","s6","s5","s6","s6","s5","s5"],
  p5test: ["s1","s3","s1","s1","s3","s3","s4","s4","s6","s6","s3","s3"],
};

/* 모의고사 전용 추가 문항 (시나리오당 3개) */
window.CCAF_EXAM_EXTRA = [

  /* ---- s1 ---- */
  {scenario:"s1", ts:"1.5", q:`Your support agent's tools return customer tier as "GOLD", "2" (numeric code), or "premium" depending on which backend responds. The agent occasionally applies the wrong discount tier when reasoning across results. Where should normalization live?`,
   opts:[
     {t:`In a PostToolUse hook that maps all tier representations to one canonical format before the model processes the results.`, ok:true},
     {t:`In the system prompt, listing the equivalences for the model to convert mentally.`},
     {t:`In each backend service, by asking the owning teams to standardize their APIs.`},
     {t:`In a final output filter that corrects discounts before they reach the customer.`}],
   explain:{good:`이질적 표현의 정규화 = PostToolUse 훅. 모델이 보기 전에 결정론적으로 통일해야 추론 오류가 사라져.`,
     wrongs:[`<b>B:</b> 매번 머릿속 변환은 확률적 — 가끔 틀리는 지금 증상 그대로.`,`<b>C:</b> 세 팀의 로드맵에 인질 — 내 파이프라인에서 풀 수 있는 문제야.`,`<b>D:</b> 할인 계산이라는 중간 추론은 이미 오염된 뒤.`]},
   principle:"모델이 보기 전에 정규화"},
  {scenario:"s1", ts:"1.4", q:`A customer reports a double charge, a missing loyalty credit, and asks about return shipping — in one message. Your agent's current behavior: answer the first issue and close. Beyond decomposition, what execution pattern does the guide prescribe for the investigation phase?`,
   opts:[
     {t:`Investigate the distinct issues in parallel using the shared customer context, then synthesize one unified resolution.`, ok:true},
     {t:`Investigate sequentially, sending the customer a partial reply after each issue resolves.`},
     {t:`Pick the issue with the highest financial value and defer the others to a follow-up ticket.`},
     {t:`Ask the customer which issue matters most and handle only that one this session.`}],
   explain:{good:`1.4: 분해 → 공유 컨텍스트로 병렬 조사 → 통합 응답. 고객은 한 번에 완결된 답을 받아야 하고, 병렬이 지연도 줄여.`,
     wrongs:[`<b>B:</b> 부분 답장 연사는 고객 혼란 + 맥락 파편화.`,`<b>C:</b> 금액 기준 선별은 나머지 이슈 방치 — FCR 하락.`,`<b>D:</b> 셋 다 처리 가능한데 고객에게 고르게 하는 건 책임 전가.`]},
   principle:"병렬 조사, 통합 응답"},
  {scenario:"s1", ts:"5.2", q:`get_customer returns two records for "M. Park": one with a matching email domain, one with a matching phone area code. The agent must process a $240 refund. The confidence gap between the two matches is small. What should the agent do?`,
   opts:[
     {t:`Ask the customer for an additional identifier (order number or registered email) rather than selecting between the matches heuristically.`, ok:true},
     {t:`Pick the record with the matching email domain — email is a stronger signal than area code.`},
     {t:`Process the refund to both accounts' most recent orders to guarantee coverage.`},
     {t:`Escalate to a human agent to make the identity decision.`}],
   explain:{good:`5.2: 다중 매칭은 휴리스틱으로 고르지 말고 추가 식별자 요청. 돈이 걸린 신원 판단을 신호 강도 추측에 맡기면 안 돼.`,
     wrongs:[`<b>B:</b> "더 강한 신호" 선택이 바로 금지된 휴리스틱 — 그럴듯할수록 위험.`,`<b>C:</b> 이중 환불은 사고를 두 배로.`,`<b>D:</b> 고객이 한 마디면 풀 모호성 — 인간도 같은 질문을 해야 해서 과잉 에스컬레이션.`]},
   principle:"모호성은 고객에게 물어서"},

  /* ---- s2 ---- */
  {scenario:"s2", ts:"3.3", q:`Your monorepo's GraphQL resolvers live in packages/api/src/resolvers/, packages/admin/src/resolvers/, and various feature folders — all ending in .resolver.ts. Resolver conventions must load automatically whenever such files are edited, and nowhere else. What is the correct mechanism?`,
   opts:[
     {t:`A .claude/rules/ file with YAML frontmatter paths: ["**/*.resolver.ts"], loading only when matching files are edited.`, ok:true},
     {t:`A CLAUDE.md file in each folder that currently contains resolvers.`},
     {t:`A section in the root CLAUDE.md titled "Resolver conventions."`},
     {t:`A /resolver-rules slash command developers run before editing resolvers.`}],
   explain:{good:`3.3: 전역 산재 + 자동 적용 + 조건부 로딩 = paths 글롭 규칙. 파일 패턴이 위치보다 안정적인 식별자야.`,
     wrongs:[`<b>B:</b> 새 feature 폴더가 생길 때마다 파일 추가 — 누락 예약.`,`<b>C:</b> 루트 상주는 모든 편집에 로드 — 토큰 낭비 + 무관 간섭.`,`<b>D:</b> 수동 호출은 "자동으로"와 모순.`]},
   principle:"산재 + 자동 = 글롭 규칙"},
  {scenario:"s2", ts:"3.5", q:`You ask Claude Code to convert legacy date-handling utilities to a new library. The prose spec was detailed, yet each attempt interprets "preserve timezone behavior" differently — one converts to UTC, another keeps local offsets. What is the fastest way to converge?`,
   opts:[
     {t:`Provide 2-3 concrete input/output test cases — including a DST-boundary edge case — demonstrating exactly what "preserve timezone behavior" means.`, ok:true},
     {t:`Expand the prose spec with a section defining timezone terminology.`},
     {t:`Have Claude propose its interpretation and iterate through discussion each attempt.`},
     {t:`Set temperature to 0 so at least the interpretation stays consistent.`}],
   explain:{good:`3.5: 산문이 들쭉날쭉 해석되면 구체적 입출력 예시가 최고 효과. DST 엣지까지 실물로 못 박으면 해석의 여지가 사라져.`,
     wrongs:[`<b>B:</b> 산문에 산문을 더하면 해석 지점도 늘어.`,`<b>C:</b> 매 시도 토론은 예시 한 벌이면 끝날 일의 왕복 낭비.`,`<b>D:</b> 일관되게 틀린 해석이 나올 뿐.`]},
   principle:"모호하면 실물 예시"},
  {scenario:"s2", ts:"3.1", q:`Your 900-line root CLAUDE.md mixes team coding standards with one developer's personal shortcuts ("always show me diffs before applying"). Teammates complain Claude shows them unwanted diffs. How should the content be reorganized?`,
   opts:[
     {t:`Keep team standards at the project level; the personal preferences move to that developer's ~/.claude/CLAUDE.md, and consider splitting large topic areas into .claude/rules/ files.`, ok:true},
     {t:`Delete the personal preferences entirely — they have no legitimate home.`},
     {t:`Wrap personal preferences in a comment addressed to teammates: "ignore unless you're Kim."`},
     {t:`Move everything to each developer's user level so everyone curates their own copy.`}],
   explain:{good:`3.1의 스코프 정리: 팀 표준 = 프로젝트, 개인 취향 = 사용자 레벨. 각 내용이 맞는 계층에 있으면 간섭이 구조적으로 사라져.`,
     wrongs:[`<b>B:</b> 개인 취향의 정당한 집(사용자 레벨)이 있는데 삭제는 과잉.`,`<b>C:</b> "김 아니면 무시해"는 모델에게 조건 분기를 확률로 맡기는 것.`,`<b>D:</b> 팀 표준의 사본 분산 = 표류와 불일치의 시작.`]},
   principle:"내용마다 맞는 계층으로"},

  /* ---- s3 ---- */
  {scenario:"s3", ts:"1.2", q:`After synthesis, your coordinator notices the report covers regulation and market size but says nothing about the "talent migration" subtopic it assigned. The search agent's output for that subtopic was thin. What is the correct coordinator behavior?`,
   opts:[
     {t:`Run an iterative refinement loop: re-delegate targeted queries for the gap to the search and analysis agents, then re-invoke synthesis until coverage is sufficient.`, ok:true},
     {t:`Ship the report — two of three subtopics is acceptable coverage.`},
     {t:`Have the synthesis agent expand the thin section using its general knowledge.`},
     {t:`Restart the entire research pipeline from decomposition.`}],
   explain:{good:`1.2의 반복 개선 루프: 빈틈 평가 → 겨냥한 재위임 → 재합성. 코디네이터가 품질 게이트 역할을 해야 해.`,
     wrongs:[`<b>B:</b> 할당한 주제를 빈 채로 출고 — 커버리지 책임 방기.`,`<b>C:</b> 일반 지식 충전 = 출처 없는 환각을 리서치로 위장.`,`<b>D:</b> 유효한 두 주제까지 재실행 — 빈 곳만 겨냥하면 될 일.`]},
   principle:"빈틈은 겨냥해서 재위임"},
  {scenario:"s3", ts:"1.3", q:`Your coordinator spawns the document-analysis subagent with the prompt: "Analyze the documents relevant to our research." The subagent replies asking which documents. The coordinator's own history contains the full list of 12 URLs from the search phase. What is the root cause?`,
   opts:[
     {t:`Subagents don't inherit the coordinator's conversation history — the document list must be included explicitly in the spawning prompt.`, ok:true},
     {t:`The subagent's clarifying question indicates its system prompt lacks initiative instructions.`},
     {t:`The Task tool call failed to attach the conversation context flag.`},
     {t:`The document list exceeded the subagent's context limit and was silently dropped.`}],
   explain:{good:`1.3의 제1원칙: 컨텍스트 자동 상속은 없다. 팀장 회의록은 팀원에게 안 보여 — 프롬프트에 12개 URL을 직접 써서 넘겨야 해.`,
     wrongs:[`<b>B:</b> 모르는 걸 묻는 건 건강한 행동 — 문제는 정보를 안 준 쪽.`,`<b>C:</b> "컨텍스트 첨부 플래그" 같은 건 존재하지 않아 — 허구 기능 보기.`,`<b>D:</b> 12개 URL은 한계 근처도 아니고, 증거 없는 추측.`]},
   principle:"상속은 없다, 명시 전달뿐"},
  {scenario:"s3", ts:"5.6", q:`Reviewing a report draft, you find: "AI adoption in healthcare rose from 22% to 38%." The synthesis agent merged two findings — but one number is from a 2021 survey of US hospitals and the other from a 2024 global survey with different methodology. The structured findings lacked both dates and methodology context. What upstream change prevents this class of error?`,
   opts:[
     {t:`Require subagents to include publication/collection dates and methodological context (population, scope) in their structured outputs, so synthesis can detect that the figures aren't comparable.`, ok:true},
     {t:`Prohibit the synthesis agent from ever combining two numbers into a trend statement.`},
     {t:`Have synthesis flag any pair of differing numbers as a contradiction for human review.`},
     {t:`Limit research to sources from a single year so temporal mixing can't occur.`}],
   explain:{good:`5.6: 시점 + 방법론 맥락을 구조화 출력의 필수 필드로. 두 숫자가 비교 가능한지 판단할 재료를 상류가 줘야 해 — 22%→38%는 트렌드가 아니라 서로 다른 측정이야.`,
     wrongs:[`<b>B:</b> 정당한 트렌드 서술까지 금지하는 과잉 — 같은 조사 시계열이면 결합이 맞아.`,`<b>C:</b> 모든 숫자쌍 인간 검토 = 리뷰 병목 — 판별 재료를 주면 기계가 거를 수 있어.`,`<b>D:</b> 단년 제한은 리서치 범위 훼손 — 시계열 분석 자체가 불가능해져.`]},
   principle:"시점·방법론은 필수 필드"},

  /* ---- s4 ---- */
  {scenario:"s4", ts:"2.5", q:`Task: "find where the config value MAX_RETRY_DELAY is defined, and every file that reads it." The codebase has 1,400 files. Which tool sequence is correct?`,
   opts:[
     {t:`Grep for MAX_RETRY_DELAY across the codebase to find the definition and all readers, then Read the key files to understand usage context.`, ok:true},
     {t:`Glob for **/*config* files, read each, then guess likely readers from imports.`},
     {t:`Read the entry-point file and follow every import chain until the value appears.`},
     {t:`Bash-execute the app with a debugger breakpoint on the constant.`}],
   explain:{good:`상수명 = 내용 검색 = Grep이 정의와 사용처를 한 번에. 그다음 핵심 파일만 Read — 2.5의 점진 전략.`,
     wrongs:[`<b>B:</b> 파일명 추측은 상수가 다른 이름의 파일에 있으면 실패, 사용처는 아예 못 찾아.`,`<b>C:</b> import 추적 전수는 1,400파일에서 컨텍스트 폭발.`,`<b>D:</b> 정적 탐색 질문에 런타임 디버깅 — 과잉이고 위험.`]},
   principle:"식별자는 Grep부터"},
  {scenario:"s4", ts:"3.4", q:`Developers use your agent to answer codebase questions during onboarding. Each question triggers extensive Grep/Read exploration whose raw output floods the conversation, and by the fifth question the agent has forgotten its earlier findings. What is the right architecture?`,
   opts:[
     {t:`Delegate each exploration to the Explore subagent, which isolates the verbose discovery output and returns concise summaries to the main conversation.`, ok:true},
     {t:`Limit developers to three questions per session to preserve context.`},
     {t:`Instruct the agent to Grep less and rely more on its general knowledge of typical codebases.`},
     {t:`Increase max_tokens on responses so findings are stated more completely.`}],
   explain:{good:`3.4의 Explore 용도 그대로: 장황한 발견을 격리하고 요약만 본 대화로 — 다섯 번째 질문에도 컨텍스트가 살아 있어.`,
     wrongs:[`<b>B:</b> 도구의 한계를 사용자 쿼터로 떠넘기기.`,`<b>C:</b> "일반적 코드베이스" 지식으로 답하기 = 이 코드베이스가 아닌 답.`,`<b>D:</b> 출력 길이는 입력 잠식과 무관.`]},
   principle:"탐색은 격리, 요약만 본선에"},
  {scenario:"s4", ts:"2.1", q:`Your productivity agent has search_code (semantic, symbol-aware) and find_text (exact string match). Both descriptions say "Searches the codebase." Developers report the agent using find_text for "find functions similar to authenticate" and search_code for exact error strings — each tool's weakness. What is the first fix?`,
   opts:[
     {t:`Rewrite both descriptions to state each tool's mechanism, ideal inputs, example queries, and when to choose it over the other.`, ok:true},
     {t:`Merge the two tools into one search tool with a mode parameter.`},
     {t:`Add few-shot examples of correct tool selection to the system prompt.`},
     {t:`Route by heuristic: quoted strings → find_text, everything else → search_code.`}],
   explain:{good:`2.1: 동일한 한 줄 설명 = 판단 재료 제로. 메커니즘·입력·예시·경계를 담은 설명 확충이 저비용 첫 조치야.`,
     wrongs:[`<b>B:</b> 모드 파라미터는 같은 선택 문제를 도구 안으로 옮길 뿐.`,`<b>C:</b> 원인(설명) 방치 + 토큰 추가.`,`<b>D:</b> 따옴표 휴리스틱은 "authenticate와 비슷한" 같은 자연어를 오분류.`]},
   principle:"설명이 곧 선택 기준"},

  /* ---- s5 ---- */
  {scenario:"s5", ts:"1.6", q:`Your repo-wide nightly review examines security, dependency hygiene, and API compatibility. A single combined pass produces shallow, inconsistent findings. The three concerns are independent and well-defined. Which restructuring fits?`,
   opts:[
     {t:`Prompt chaining: three sequential focused passes (security, then dependencies, then API compatibility), each with its own criteria and output schema.`, ok:true},
     {t:`Dynamic decomposition that decides nightly which concerns seem worth checking.`},
     {t:`One pass with triple the token budget so all concerns get room.`},
     {t:`Random rotation: one concern per night, cycling every three days.`}],
   explain:{good:`1.6: 고정된 관점 반복 = prompt chaining. 패스마다 한 관점에 주의력을 몰아주면 깊이가 생기고 스키마도 관점별로 최적화돼.`,
     wrongs:[`<b>B:</b> 셋 다 "매일 반드시" — 에이전트가 고르게 두면 커버리지 구멍.`,`<b>C:</b> 토큰 예산은 주의력 희석을 못 풀어.`,`<b>D:</b> 3일 주기는 이틀 묵은 취약점을 허용 — 보안 검사에 부적합.`]},
   principle:"고정 관점 반복 = 체이닝"},
  {scenario:"s5", ts:"3.6", q:`To give your CI reviewer project context, the team debates where review criteria, testing standards, and fixture documentation should live so both interactive sessions and the -p pipeline runs pick them up consistently. What is the right home?`,
   opts:[
     {t:`The project's CLAUDE.md (with .claude/rules/ for topic-specific detail) — loaded in interactive and non-interactive runs alike, versioned with the code it governs.`, ok:true},
     {t:`The CI workflow YAML, injected as a prompt prefix only during pipeline runs.`},
     {t:`A wiki page linked in each PR description for the model to fetch.`},
     {t:`Hard-coded into the pipeline's prompt string by the DevOps team.`}],
   explain:{good:`3.6: CLAUDE.md가 CI 실행에도 컨텍스트를 공급 — 대화형과 파이프라인이 같은 기준을 보게 되고, 코드와 함께 버전 관리돼.`,
     wrongs:[`<b>B:</b> 파이프라인 전용 주입은 대화형 세션과 기준 분열.`,`<b>C:</b> 위키 링크는 fetch 보장이 없고 코드와 따로 늙어.`,`<b>D:</b> DevOps 소유 하드코딩은 개발팀이 기준을 못 고치는 관료제.`]},
   principle:"기준은 CLAUDE.md에, 코드와 함께"},
  {scenario:"s5", ts:"4.2", q:`Your PR reviewer inconsistently formats findings — sometimes prose paragraphs, sometimes bullet lists, field names varying run to run — despite detailed formatting instructions. Downstream tooling needs: location, issue, severity, suggested fix. Besides schema enforcement, what prompt technique does the guide recommend for output consistency?`,
   opts:[
     {t:`Include few-shot examples demonstrating the exact desired output format (location, issue, severity, suggested fix) so the model anchors on demonstrated structure.`, ok:true},
     {t:`Repeat the formatting instructions at both the start and end of the prompt.`},
     {t:`Lower temperature to zero and accept whatever format that yields consistently.`},
     {t:`Ask the model to self-check its format before responding.`}],
   explain:{good:`4.2: 상세 지시로도 형식이 흔들리면 few-shot 형식 데모가 최고 효과. 보여준 구조에 앵커링돼 일관성이 생겨.`,
     wrongs:[`<b>B:</b> 반복은 강조지 계약이 아니야.`,`<b>C:</b> 일관되게 이상한 형식이 나올 뿐 — 원하는 형식 보장이 아님.`,`<b>D:</b> 자기 점검 지시도 확률적 — 기준 실물이 없으면 점검할 대상도 모호.`]},
   principle:"형식은 예시로 고정"},

  /* ---- s6 ---- */
  {scenario:"s6", ts:"4.5", q:`Your extraction service promises results within 12 hours of document upload. You want Batches API savings (processing up to 24h). What does the math say?`,
   opts:[
     {t:`The Batches API alone cannot guarantee a 12-hour SLA since a single batch may take up to 24 hours — use the synchronous API for this service, or renegotiate the SLA.`, ok:true},
     {t:`Submit batches hourly; frequent submission compresses the processing window below 12 hours.`},
     {t:`Use batches but mark late documents as "processing" — customers rarely check before 24h.`},
     {t:`Split each document into smaller chunks so its batch completes faster.`}],
   explain:{good:`4.5 역산의 함정 케이스: 제출 주기를 아무리 줄여도 처리 자체가 최대 24h — 12h 약속과 구조적으로 양립 불가. 배치는 SLA가 처리 상한보다 길 때만 성립해.`,
     wrongs:[`<b>B:</b> 제출 주기는 '대기'만 줄여 — 처리 24h는 그대로.`,`<b>C:</b> SLA 위반을 UI로 가리는 건 위반이야.`,`<b>D:</b> 청킹은 컨텍스트 초과 해결책이지 처리 시간 보장이 아니야.`]},
   principle:"SLA < 처리 상한이면 배치 불가"},
  {scenario:"s6", ts:"5.5", q:`Your two reviewers can check 60 extractions daily out of 3,000. Current routing sends them a random sample. Yesterday a batch of ambiguous scanned receipts — the known weakest segment — sailed through auto-approval. How should the 60 slots be allocated?`,
   opts:[
     {t:`Prioritize extractions with low calibrated confidence and documents with ambiguous or contradictory sources; keep a small stratified sample of high-confidence extractions for ongoing monitoring.`, ok:true},
     {t:`Review the 60 highest-dollar-value documents regardless of confidence.`},
     {t:`Keep the pure random sample — it's the only unbiased allocation.`},
     {t:`Review only scanned receipts until that segment improves, ignoring the rest.`}],
   explain:{good:`5.5의 배치 공식: 주력은 저신뢰 + 모호·모순 소스 라우팅, 소량은 층화 표집 감시용. 두 목적(위험 집중 + 신규 패턴 탐지)을 60석 안에서 겸해.`,
     wrongs:[`<b>B:</b> 금액과 오류 확률은 다른 축.`,`<b>C:</b> 무작위 순수주의는 알려진 약점 세그먼트를 2% 확률에 맡기는 것.`,`<b>D:</b> 한 세그먼트 올인은 다른 곳의 신규 패턴을 전부 놓쳐.`]},
   principle:"불확실한 곳에 사람, 나머진 표본"},
  {scenario:"s6", ts:"4.3", q:`Legal wants your contract extractor to categorize clauses. The clause taxonomy evolves monthly as lawyers encounter new clause types. Your current enum has 15 fixed values and misclassifies novel clauses into the nearest existing category. What schema design accommodates the evolving taxonomy?`,
   opts:[
     {t:`Keep the enum for the 15 established categories, add "other" with a required detail string describing the novel clause, and "unclear" for genuinely ambiguous ones — review "other" values monthly to grow the taxonomy.`, ok:true},
     {t:`Replace the enum with free text so any clause type can be expressed.`},
     {t:`Expand the enum to 60 categories preemptively to cover future types.`},
     {t:`Reject documents containing clauses outside the current 15 categories.`}],
   explain:{good:`4.3의 확장 가능 분류 패턴: enum(안정 범주) + "other"+상세(신규 수용) + "unclear"(모호). "other" 검토가 분류 체계의 성장 경로까지 만들어.`,
     wrongs:[`<b>B:</b> 자유 텍스트는 집계·검색 불가 — 구조화 포기.`,`<b>C:</b> 미래 예측 60개는 못 맞추고, 비슷한 범주 난립으로 오분류만 늘어.`,`<b>D:</b> 신규 조항이 있는 계약이야말로 법무팀이 봐야 할 문서 — 거부는 목적 전도.`]},
   principle:"enum + other/unclear = 자라는 분류"},
];

/* Part 7 정의 — 모의고사 유닛 */
window.CCAF_CONTENT.p7 = {
  id: "p7",
  lessons: [
    { id:"exam", type:"exam", title:"모의고사 — 풀 시뮬레이션" },
  ]
};
