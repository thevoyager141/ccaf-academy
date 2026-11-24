/* PART 7. 모의고사 시뮬레이터: 시나리오 메타 + 문제은행 확장 + 미니테스트→시나리오 매핑 */

/* 시나리오 메타 */
window.CCAF_SCENARIOS = {
  s1:{no:"①", name:"고객지원 해결 에이전트", en:"Customer Support Resolution Agent",
      brief:"Agent SDK로 만든 고객지원 에이전트임. MCP 도구 4종은 get_customer, lookup_order, process_refund, escalate_to_human이고, 목표는 첫 접촉 해결률(first contact resolution, FCR) 80% 이상임."},
  s2:{no:"②", name:"Claude Code 코드 생성", en:"Code Generation with Claude Code",
      brief:"팀 개발 워크플로에 Claude Code를 통합함. 출제 범위는 커스텀 커맨드, CLAUDE.md, 계획 모드(plan mode)와 직접 실행의 구분임."},
  s3:{no:"③", name:"멀티에이전트 리서치 시스템", en:"Multi-Agent Research System",
      brief:"코디네이터가 웹 검색, 문서 분석, 종합, 리포트 생성 서브에이전트(subagent)에 작업을 위임함. 목표는 출처가 표기된 종합 리포트임."},
  s4:{no:"④", name:"개발자 생산성 도구", en:"Developer Productivity with Claude",
      brief:"코드베이스 탐색, 레거시 코드 이해, 보일러플레이트 생성을 돕는 도구임. 기본 제공 도구(built-in tools)인 Read/Write/Bash/Grep/Glob과 MCP 서버를 함께 사용함."},
  s5:{no:"⑤", name:"Claude Code CI/CD 통합", en:"Claude Code for Continuous Integration",
      brief:"CI 파이프라인에서 코드 리뷰, 테스트 생성, PR 피드백을 자동화함. 목표는 실행 가능한 피드백과 낮은 오탐률임."},
  s6:{no:"⑥", name:"구조화 데이터 추출", en:"Structured Data Extraction",
      brief:"비정형 문서에서 값을 추출한 뒤 JSON 스키마로 검증하고 다운스트림 시스템에 연동함. 목표는 엣지 케이스(edge case)를 오류 없이 처리하는 것임."},
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
   explain:{good:`서로 다른 표현을 하나로 통일하는 정규화는 PostToolUse 훅(hook)이 담당함. 모델이 도구 결과를 읽기 전에 코드가 표현을 통일하면 등급 판단이 항상 같은 값으로 이루어지므로 추론 오류가 발생하지 않음.`,
     wrongs:[`<b>B:</b> 모델이 매번 변환하는 방식은 확률적임. 가끔 틀리는 현재 증상이 그대로 남음.`,`<b>C:</b> 백엔드를 소유한 팀들의 일정에 의존하게 됨. 이 문제는 에이전트 쪽 파이프라인에서 해결할 수 있음.`,`<b>D:</b> 최종 출력 단계에서 고치면 할인 등급을 판단하는 중간 추론이 이미 잘못된 값으로 끝난 뒤임.`]},
   principle:"도구 결과는 모델이 읽기 전에 정규화함"},
  {scenario:"s1", ts:"1.4", q:`A customer reports a double charge, a missing loyalty credit, and asks about return shipping — in one message. Your agent's current behavior: answer the first issue and close. Beyond decomposition, what execution pattern does the guide prescribe for the investigation phase?`,
   opts:[
     {t:`Investigate the distinct issues in parallel using the shared customer context, then synthesize one unified resolution.`, ok:true},
     {t:`Investigate sequentially, sending the customer a partial reply after each issue resolves.`},
     {t:`Pick the issue with the highest financial value and defer the others to a follow-up ticket.`},
     {t:`Ask the customer which issue matters most and handle only that one this session.`}],
   explain:{good:`1.4가 정한 처리 순서임. 요청을 분해하고, 공유된 고객 컨텍스트(context)로 각 이슈를 병렬 조사한 뒤, 하나의 응답으로 통합함. 고객은 한 번에 완결된 답을 받고 병렬 조사는 응답 지연도 줄임.`,
     wrongs:[`<b>B:</b> 이슈마다 부분 답장을 보내면 고객이 혼란스럽고 대화 맥락도 나뉨.`,`<b>C:</b> 금액이 큰 이슈만 처리하면 나머지 두 이슈가 남음. 첫 접촉 해결률이 떨어짐.`,`<b>D:</b> 세 이슈 모두 처리할 수 있는 상황에서 고객에게 하나를 고르게 하는 것은 에이전트가 할 일을 고객에게 넘기는 것임.`]},
   principle:"병렬로 조사하고 하나로 통합해 응답함"},
  {scenario:"s1", ts:"5.2", q:`get_customer returns two records for "M. Park": one with a matching email domain, one with a matching phone area code. The agent must process a $240 refund. The confidence gap between the two matches is small. What should the agent do?`,
   opts:[
     {t:`Ask the customer for an additional identifier (order number or registered email) rather than selecting between the matches heuristically.`, ok:true},
     {t:`Pick the record with the matching email domain — email is a stronger signal than area code.`},
     {t:`Process the refund to both accounts' most recent orders to guarantee coverage.`},
     {t:`Escalate to a human agent to make the identity decision.`}],
   explain:{good:`5.2의 내용임. 조회 결과가 여러 건이면 어느 쪽이 더 그럴듯한지 추측해서 고르지 않고 추가 식별자를 요청함. 금액이 걸린 신원 확인을 신호 강도 추정에 맡기면 안 됨.`,
     wrongs:[`<b>B:</b> 이메일이 더 강한 신호라는 판단이 바로 금지된 추측임. 그럴듯한 근거일수록 잘못된 계정에 환불될 위험이 큼.`,`<b>C:</b> 두 계정 모두에 환불하면 잘못된 환불이 한 건 더 늘어남.`,`<b>D:</b> 고객이 주문번호 하나만 알려주면 해소되는 모호성임. 사람이 받아도 같은 질문을 해야 하므로 불필요한 에스컬레이션(escalation, 사람에게 넘김)임.`]},
   principle:"신원이 모호하면 추가 식별자를 요청함"},

  /* ---- s2 ---- */
  {scenario:"s2", ts:"3.3", q:`Your monorepo's GraphQL resolvers live in packages/api/src/resolvers/, packages/admin/src/resolvers/, and various feature folders — all ending in .resolver.ts. Resolver conventions must load automatically whenever such files are edited, and nowhere else. What is the correct mechanism?`,
   opts:[
     {t:`A .claude/rules/ file with YAML frontmatter paths: ["**/*.resolver.ts"], loading only when matching files are edited.`, ok:true},
     {t:`A CLAUDE.md file in each folder that currently contains resolvers.`},
     {t:`A section in the root CLAUDE.md titled "Resolver conventions."`},
     {t:`A /resolver-rules slash command developers run before editing resolvers.`}],
   explain:{good:`3.3의 내용임. 대상 파일이 여러 폴더에 흩어져 있고, 자동으로 적용돼야 하며, 해당 파일을 편집할 때만 로드돼야 하는 조건이면 paths 글롭 패턴을 지정한 조건부 규칙(conditional rules) 파일을 씀. 파일 이름 패턴은 폴더 위치보다 안정적인 식별 기준임.`,
     wrongs:[`<b>B:</b> 새 feature 폴더가 생길 때마다 파일을 추가해야 함. 언젠가 누락됨.`,`<b>C:</b> 루트 CLAUDE.md는 모든 편집에서 로드됨. 리졸버와 무관한 작업에도 토큰을 쓰고 간섭함.`,`<b>D:</b> 개발자가 직접 실행하는 방식은 자동 적용이라는 요구 조건과 맞지 않음.`]},
   principle:"여러 폴더에 흩어진 파일의 자동 규칙은 글롭 패턴으로 지정함"},
  {scenario:"s2", ts:"3.5", q:`You ask Claude Code to convert legacy date-handling utilities to a new library. The prose spec was detailed, yet each attempt interprets "preserve timezone behavior" differently — one converts to UTC, another keeps local offsets. What is the fastest way to converge?`,
   opts:[
     {t:`Provide 2-3 concrete input/output test cases — including a DST-boundary edge case — demonstrating exactly what "preserve timezone behavior" means.`, ok:true},
     {t:`Expand the prose spec with a section defining timezone terminology.`},
     {t:`Have Claude propose its interpretation and iterate through discussion each attempt.`},
     {t:`Set temperature to 0 so at least the interpretation stays consistent.`}],
   explain:{good:`3.5의 내용임. 산문 명세가 시도마다 다르게 해석되면 구체적인 입력과 출력 예시를 주는 방법이 가장 효과적임. 서머타임 경계 같은 엣지 케이스까지 실제 값으로 보여 주면 해석의 여지가 남지 않음.`,
     wrongs:[`<b>B:</b> 산문에 산문을 더하면 해석이 갈릴 지점도 함께 늘어남.`,`<b>C:</b> 예시 몇 개로 끝날 일을 시도마다 토론으로 반복하는 방식임. 시간이 더 듦.`,`<b>D:</b> 온도를 0으로 두면 해석이 일정해질 뿐이며, 그 해석이 맞다는 보장은 없음.`]},
   principle:"해석이 갈리면 입출력 예시로 고정함"},
  {scenario:"s2", ts:"3.1", q:`Your 900-line root CLAUDE.md mixes team coding standards with one developer's personal shortcuts ("always show me diffs before applying"). Teammates complain Claude shows them unwanted diffs. How should the content be reorganized?`,
   opts:[
     {t:`Keep team standards at the project level; the personal preferences move to that developer's ~/.claude/CLAUDE.md, and consider splitting large topic areas into .claude/rules/ files.`, ok:true},
     {t:`Delete the personal preferences entirely — they have no legitimate home.`},
     {t:`Wrap personal preferences in a comment addressed to teammates: "ignore unless you're Kim."`},
     {t:`Move everything to each developer's user level so everyone curates their own copy.`}],
   explain:{good:`3.1의 계층 구분임. 팀 표준은 프로젝트 레벨에, 개인 취향은 사용자 레벨인 ~/.claude/CLAUDE.md에 둠. 각 내용이 맞는 계층에 있으면 다른 팀원에게 간섭할 경로 자체가 없어짐.`,
     wrongs:[`<b>B:</b> 개인 취향에는 사용자 레벨이라는 정당한 위치가 있음. 삭제는 과한 조치임.`,`<b>C:</b> 특정 사람만 따르라는 주석은 조건 분기를 모델의 확률적 판단에 맡기는 방식임.`,`<b>D:</b> 팀 표준을 각자 사본으로 갖게 되면 시간이 지나며 내용이 서로 달라짐.`]},
   principle:"내용의 적용 범위에 맞는 계층에 둠"},

  /* ---- s3 ---- */
  {scenario:"s3", ts:"1.2", q:`After synthesis, your coordinator notices the report covers regulation and market size but says nothing about the "talent migration" subtopic it assigned. The search agent's output for that subtopic was thin. What is the correct coordinator behavior?`,
   opts:[
     {t:`Run an iterative refinement loop: re-delegate targeted queries for the gap to the search and analysis agents, then re-invoke synthesis until coverage is sufficient.`, ok:true},
     {t:`Ship the report — two of three subtopics is acceptable coverage.`},
     {t:`Have the synthesis agent expand the thin section using its general knowledge.`},
     {t:`Restart the entire research pipeline from decomposition.`}],
   explain:{good:`1.2의 반복 개선 루프임. 빠진 부분을 평가하고, 그 부분만 겨냥해 다시 위임하고, 다시 종합함. 코디네이터가 커버리지를 확인하는 품질 점검 역할을 맡음.`,
     wrongs:[`<b>B:</b> 스스로 할당한 주제를 비운 채 리포트를 내보내는 것임. 커버리지 책임을 지지 않음.`,`<b>C:</b> 일반 지식으로 빈 부분을 채우면 출처가 없는 내용이 리서치 결과처럼 보이게 됨.`,`<b>D:</b> 정상적으로 조사된 두 주제까지 다시 실행하게 됨. 빠진 부분만 다시 위임하면 됨.`]},
   principle:"빠진 부분만 겨냥해 다시 위임함"},
  {scenario:"s3", ts:"1.3", q:`Your coordinator spawns the document-analysis subagent with the prompt: "Analyze the documents relevant to our research." The subagent replies asking which documents. The coordinator's own history contains the full list of 12 URLs from the search phase. What is the root cause?`,
   opts:[
     {t:`Subagents don't inherit the coordinator's conversation history — the document list must be included explicitly in the spawning prompt.`, ok:true},
     {t:`The subagent's clarifying question indicates its system prompt lacks initiative instructions.`},
     {t:`The Agent tool call failed to attach the conversation context flag.`},
     {t:`The document list exceeded the subagent's context limit and was silently dropped.`}],
   explain:{good:`1.3의 첫 번째 규칙임. 서브에이전트(subagent)는 코디네이터의 대화 히스토리(conversation history)를 물려받지 않음. 검색 단계에서 모은 12개 URL은 서브에이전트를 띄우는 프롬프트에 직접 적어 넘겨야 함.`,
     wrongs:[`<b>B:</b> 모르는 것을 되묻는 동작 자체는 정상임. 문제는 정보를 전달하지 않은 코디네이터 쪽에 있음.`,`<b>C:</b> 대화 컨텍스트를 첨부하는 플래그는 존재하지 않음. 없는 기능을 제시한 오답 유도 선택지임.`,`<b>D:</b> URL 12개는 컨텍스트 한계에 한참 못 미치는 분량이며, 지문에 그런 근거도 없음.`]},
   principle:"서브에이전트는 상속받지 않으므로 프롬프트에 명시함"},
  {scenario:"s3", ts:"5.6", q:`Reviewing a report draft, you find: "AI adoption in healthcare rose from 22% to 38%." The synthesis agent merged two findings — but one number is from a 2021 survey of US hospitals and the other from a 2024 global survey with different methodology. The structured findings lacked both dates and methodology context. What upstream change prevents this class of error?`,
   opts:[
     {t:`Require subagents to include publication/collection dates and methodological context (population, scope) in their structured outputs, so synthesis can detect that the figures aren't comparable.`, ok:true},
     {t:`Prohibit the synthesis agent from ever combining two numbers into a trend statement.`},
     {t:`Have synthesis flag any pair of differing numbers as a contradiction for human review.`},
     {t:`Limit research to sources from a single year so temporal mixing can't occur.`}],
   explain:{good:`5.6의 내용임. 조사 시점과 방법론 맥락(대상 집단, 조사 범위)을 구조화된 출력(structured output)의 필수 필드로 둠. 두 숫자를 비교할 수 있는지 판단할 근거를 상류 단계가 제공해야 함. 22%와 38%는 추세가 아니라 조건이 다른 두 번의 측정임.`,
     wrongs:[`<b>B:</b> 정당한 추세 서술까지 막는 과한 조치임. 같은 조사의 시계열이면 두 숫자를 묶는 것이 맞음.`,`<b>C:</b> 숫자쌍마다 사람이 검토하면 리뷰 단계가 막힘. 판단 근거를 필드로 주면 자동으로 걸러낼 수 있음.`,`<b>D:</b> 단일 연도로 제한하면 리서치 범위가 좁아지고 시계열 분석 자체가 불가능해짐.`]},
   principle:"조사 시점과 방법론은 구조화된 출력의 필수 필드임"},

  /* ---- s4 ---- */
  {scenario:"s4", ts:"2.5", q:`Task: "find where the config value MAX_RETRY_DELAY is defined, and every file that reads it." The codebase has 1,400 files. Which tool sequence is correct?`,
   opts:[
     {t:`Grep for MAX_RETRY_DELAY across the codebase to find the definition and all readers, then Read the key files to understand usage context.`, ok:true},
     {t:`Glob for **/*config* files, read each, then guess likely readers from imports.`},
     {t:`Read the entry-point file and follow every import chain until the value appears.`},
     {t:`Bash-execute the app with a debugger breakpoint on the constant.`}],
   explain:{good:`상수 이름으로 찾는 작업은 파일 내용 검색이므로 Grep을 씀. 정의 위치와 사용처를 한 번에 찾을 수 있음. 그다음 핵심 파일만 Read로 확인하는 것이 2.5의 점진적 탐색 전략임.`,
     wrongs:[`<b>B:</b> 파일 이름을 추측하는 방식임. 상수가 다른 이름의 파일에 있으면 찾지 못하고 사용처는 아예 확인할 수 없음.`,`<b>C:</b> import를 전부 따라가면 1,400개 파일에서 컨텍스트 창(context window)이 금방 가득 참.`,`<b>D:</b> 코드를 읽으면 되는 질문에 실행과 디버깅을 동원하는 방식임. 과한 조치이고 위험함.`]},
   principle:"식별자를 찾을 때는 Grep부터 씀"},
  {scenario:"s4", ts:"3.4", q:`Developers use your agent to answer codebase questions during onboarding. Each question triggers extensive Grep/Read exploration whose raw output floods the conversation, and by the fifth question the agent has forgotten its earlier findings. What is the right architecture?`,
   opts:[
     {t:`Delegate each exploration to the Explore subagent, which isolates the verbose discovery output and returns concise summaries to the main conversation.`, ok:true},
     {t:`Limit developers to three questions per session to preserve context.`},
     {t:`Instruct the agent to Grep less and rely more on its general knowledge of typical codebases.`},
     {t:`Increase max_tokens on responses so findings are stated more completely.`}],
   explain:{good:`3.4가 설명하는 Explore 서브에이전트의 용도임. 길게 나오는 탐색 출력을 별도 컨텍스트에 가두고 요약만 본 대화로 돌려줌. 다섯 번째 질문에서도 앞선 발견이 그대로 남아 있음.`,
     wrongs:[`<b>B:</b> 설계 문제를 사용자 질문 횟수 제한으로 넘기는 방식임.`,`<b>C:</b> 일반적인 코드베이스 지식으로 답하면 이 코드베이스에 대한 답이 아니게 됨.`,`<b>D:</b> max_tokens는 응답 길이만 정함. 입력 쪽 컨텍스트가 잠식되는 문제와 관계없음.`]},
   principle:"탐색 출력은 격리하고 요약만 본 대화에 남김"},
  {scenario:"s4", ts:"2.1", q:`Your productivity agent has search_code (semantic, symbol-aware) and find_text (exact string match). Both descriptions say "Searches the codebase." Developers report the agent using find_text for "find functions similar to authenticate" and search_code for exact error strings — each tool's weakness. What is the first fix?`,
   opts:[
     {t:`Rewrite both descriptions to state each tool's mechanism, ideal inputs, example queries, and when to choose it over the other.`, ok:true},
     {t:`Merge the two tools into one search tool with a mode parameter.`},
     {t:`Add few-shot examples of correct tool selection to the system prompt.`},
     {t:`Route by heuristic: quoted strings → find_text, everything else → search_code.`}],
   explain:{good:`2.1의 내용임. 두 도구의 설명이 같은 한 문장이면 모델이 어느 쪽을 고를지 판단할 근거가 없음. 각 도구의 동작 방식, 적합한 입력, 예시 질의, 다른 도구 대신 선택할 조건을 설명에 적는 것이 비용이 적게 들면서 원인을 직접 고치는 방법임.`,
     wrongs:[`<b>B:</b> 모드 파라미터를 두면 같은 선택 문제가 도구 안으로 옮겨갈 뿐임.`,`<b>C:</b> 원인인 도구 설명을 그대로 둔 채 시스템 프롬프트 토큰만 늘리는 방식임.`,`<b>D:</b> 따옴표 유무로 나누는 규칙은 authenticate와 비슷한 함수를 찾아 달라는 자연어 질의를 잘못 분류함.`]},
   principle:"도구 설명이 모델의 선택 기준임"},

  /* ---- s5 ---- */
  {scenario:"s5", ts:"1.6", q:`Your repo-wide nightly review examines security, dependency hygiene, and API compatibility. A single combined pass produces shallow, inconsistent findings. The three concerns are independent and well-defined. Which restructuring fits?`,
   opts:[
     {t:`Prompt chaining: three sequential focused passes (security, then dependencies, then API compatibility), each with its own criteria and output schema.`, ok:true},
     {t:`Dynamic decomposition that decides nightly which concerns seem worth checking.`},
     {t:`One pass with triple the token budget so all concerns get room.`},
     {t:`Random rotation: one concern per night, cycling every three days.`}],
   explain:{good:`1.6의 내용임. 관점이 고정돼 있고 매번 같은 순서로 반복하는 작업은 프롬프트 체이닝(prompt chaining)으로 나눔. 한 패스가 한 관점만 다루면 검사 깊이가 확보되고 출력 스키마도 관점별로 맞출 수 있음.`,
     wrongs:[`<b>B:</b> 세 관점 모두 매일 확인해야 함. 에이전트가 고르게 두면 확인이 빠지는 날이 생김.`,`<b>C:</b> 토큰 예산을 늘려도 한 패스가 세 관점을 동시에 다루는 구조는 그대로임.`,`<b>D:</b> 3일 주기로 돌리면 이틀 지난 취약점을 방치하게 됨. 보안 검사에 맞지 않음.`]},
   principle:"관점이 고정된 반복 작업은 프롬프트 체이닝으로 나눔"},
  {scenario:"s5", ts:"3.6", q:`To give your CI reviewer project context, the team debates where review criteria, testing standards, and fixture documentation should live so both interactive sessions and the -p pipeline runs pick them up consistently. What is the right home?`,
   opts:[
     {t:`The project's CLAUDE.md (with .claude/rules/ for topic-specific detail) — loaded in interactive and non-interactive runs alike, versioned with the code it governs.`, ok:true},
     {t:`The CI workflow YAML, injected as a prompt prefix only during pipeline runs.`},
     {t:`A wiki page linked in each PR description for the model to fetch.`},
     {t:`Hard-coded into the pipeline's prompt string by the DevOps team.`}],
   explain:{good:`3.6의 내용임. CLAUDE.md는 대화형 실행과 CI 파이프라인 실행 모두에 로드됨. 두 경로가 같은 기준을 보게 되고, 기준이 그 기준을 적용받는 코드와 함께 버전 관리됨.`,
     wrongs:[`<b>B:</b> 파이프라인에만 주입하면 대화형 세션과 CI가 서로 다른 기준을 쓰게 됨.`,`<b>C:</b> 위키 링크는 모델이 실제로 읽는다는 보장이 없고, 코드가 바뀌어도 함께 갱신되지 않음.`,`<b>D:</b> 파이프라인 문자열에 넣으면 기준을 고칠 때마다 DevOps 팀을 거쳐야 함.`]},
   principle:"리뷰 기준은 CLAUDE.md에 두고 코드와 함께 관리함"},
  {scenario:"s5", ts:"4.2", q:`Your PR reviewer inconsistently formats findings — sometimes prose paragraphs, sometimes bullet lists, field names varying run to run — despite detailed formatting instructions. Downstream tooling needs: location, issue, severity, suggested fix. Besides schema enforcement, what prompt technique does the guide recommend for output consistency?`,
   opts:[
     {t:`Include few-shot examples demonstrating the exact desired output format (location, issue, severity, suggested fix) so the model anchors on demonstrated structure.`, ok:true},
     {t:`Repeat the formatting instructions at both the start and end of the prompt.`},
     {t:`Lower temperature to zero and accept whatever format that yields consistently.`},
     {t:`Ask the model to self-check its format before responding.`}],
   explain:{good:`4.2의 내용임. 상세한 지시를 줘도 출력 형식이 흔들리면 원하는 형식을 그대로 보여 주는 퓨샷 예시(few-shot examples)가 가장 효과적임. 모델이 예시로 본 구조를 따라가므로 형식이 일정해짐.`,
     wrongs:[`<b>B:</b> 지시를 반복하는 것은 강조일 뿐이며 출력 형식을 정하는 규격이 되지 못함.`,`<b>C:</b> 온도를 0으로 두면 형식이 일정해질 뿐이며, 원하는 형식이 나온다는 보장은 없음.`,`<b>D:</b> 스스로 점검하라는 지시도 확률적임. 대조할 형식 실물이 없으면 무엇을 점검할지도 모호함.`]},
   principle:"출력 형식은 예시로 고정함"},

  /* ---- s6 ---- */
  {scenario:"s6", ts:"4.5", q:`Your extraction service promises results within 12 hours of document upload. You want Batches API savings (processing up to 24h). What does the math say?`,
   opts:[
     {t:`The Batches API alone cannot guarantee a 12-hour SLA since a single batch may take up to 24 hours — use the synchronous API for this service, or renegotiate the SLA.`, ok:true},
     {t:`Submit batches hourly; frequent submission compresses the processing window below 12 hours.`},
     {t:`Use batches but mark late documents as "processing" — customers rarely check before 24h.`},
     {t:`Split each document into smaller chunks so its batch completes faster.`}],
   explain:{good:`4.5에서 자주 틀리는 지점임. 제출 주기를 아무리 줄여도 배치 처리 자체가 최대 24시간 걸림. 12시간 약속과 함께 성립할 수 없음. Batches API는 SLA가 처리 상한보다 길 때만 쓸 수 있음.`,
     wrongs:[`<b>B:</b> 제출 주기를 줄이면 제출을 기다리는 시간만 줄어듦. 처리 시간 24시간은 그대로임.`,`<b>C:</b> 상태 표시를 바꿔도 SLA 위반은 그대로 발생함.`,`<b>D:</b> 문서를 나누는 것은 컨텍스트 초과를 푸는 방법이며, 배치 처리 완료 시각을 보장하지 못함.`]},
   principle:"SLA가 처리 상한보다 짧으면 배치를 쓸 수 없음"},
  {scenario:"s6", ts:"5.5", q:`Your two reviewers can check 60 extractions daily out of 3,000. Current routing sends them a random sample. Yesterday a batch of ambiguous scanned receipts — the known weakest segment — sailed through auto-approval. How should the 60 slots be allocated?`,
   opts:[
     {t:`Prioritize extractions with low calibrated confidence and documents with ambiguous or contradictory sources; keep a small stratified sample of high-confidence extractions for ongoing monitoring.`, ok:true},
     {t:`Review the 60 highest-dollar-value documents regardless of confidence.`},
     {t:`Keep the pure random sample — it's the only unbiased allocation.`},
     {t:`Review only scanned receipts until that segment improves, ignoring the rest.`}],
   explain:{good:`5.5가 제시한 검토 배분 방식임. 검토 인원 대부분은 신뢰도가 낮은 추출과 출처가 모호하거나 서로 어긋나는 문서에 배정하고, 일부는 신뢰도가 높은 건에서 층화 표집해 감시용으로 남김. 위험이 높은 곳에 집중하는 목적과 새로운 오류 유형을 발견하는 목적을 60건 안에서 함께 달성함.`,
     wrongs:[`<b>B:</b> 금액 크기와 오류 발생 확률은 서로 다른 기준임. 금액순으로 뽑으면 오류가 많은 건을 놓침.`,`<b>C:</b> 무작위 표본만 쓰면 이미 약점으로 알려진 스캔 영수증이 2% 확률로만 검토됨.`,`<b>D:</b> 한 유형에만 배정하면 다른 문서에서 새로 생기는 오류 유형을 전부 놓침.`]},
   principle:"신뢰도가 낮은 건에 사람을 배정하고 나머지는 표본으로 감시함"},
  {scenario:"s6", ts:"4.3", q:`Legal wants your contract extractor to categorize clauses. The clause taxonomy evolves monthly as lawyers encounter new clause types. Your current enum has 15 fixed values and misclassifies novel clauses into the nearest existing category. What schema design accommodates the evolving taxonomy?`,
   opts:[
     {t:`Keep the enum for the 15 established categories, add "other" with a required detail string describing the novel clause, and "unclear" for genuinely ambiguous ones — review "other" values monthly to grow the taxonomy.`, ok:true},
     {t:`Replace the enum with free text so any clause type can be expressed.`},
     {t:`Expand the enum to 60 categories preemptively to cover future types.`},
     {t:`Reject documents containing clauses outside the current 15 categories.`}],
   explain:{good:`4.3의 확장 가능한 분류 설계임. 확정된 범주는 enum으로 두고, 새 유형은 "other"와 상세 설명 문자열로 받고, 판단이 어려운 건은 "unclear"로 받음. "other"로 들어온 값을 매달 검토하면 분류 체계를 넓히는 절차도 함께 생김.`,
     wrongs:[`<b>B:</b> 자유 텍스트는 집계와 검색이 되지 않음. 구조화된 출력을 쓰는 이유가 사라짐.`,`<b>C:</b> 앞으로 나올 유형 60개를 미리 맞힐 수 없고, 비슷한 범주가 늘어나면 오분류만 많아짐.`,`<b>D:</b> 새 조항이 들어 있는 계약이 법무팀이 확인해야 할 문서임. 거부하면 도구의 목적과 반대가 됨.`]},
   principle:"enum에 other와 unclear를 더해 분류 체계를 확장함"},
];

/* Part 7 정의: 모의고사 유닛 */
window.CCAF_CONTENT.p7 = {
  id: "p7",
  lessons: [
    { id:"exam", type:"exam", title:"모의고사: 풀 시뮬레이션" },
  ]
};
