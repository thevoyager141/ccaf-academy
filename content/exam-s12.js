/* 모의고사 확장 문항 풀. 시나리오 ① 고객지원 해결 에이전트(s1) · ② Claude Code 코드 생성(s2)
   exam-bank.js 뒤에 로드. CCAF_EXAM_EXTRA 에 추가만 함. s1 18 + s2 18 = 36문항. */
(function(){
  if(window.__CCAF_EXAM_S12__) return; window.__CCAF_EXAM_S12__ = true;
  window.CCAF_EXAM_EXTRA.push(

  /* ============================ SCENARIO 1 — Customer Support Resolution Agent ============================ */

  /* --- D1 (1.2 / 1.3 / 1.5 / 1.6 / 1.7) --- */

  {scenario:"s1", ts:"1.2", q:`Your support coordinator fans every incoming ticket out to four subagents — order history, billing, carrier tracking, policy lookup — and merges what comes back. Traffic analysis: 61% of tickets are plain "where is my order" questions that only ever need carrier tracking. Those tickets take 38 seconds and four subagent runs each; the queue backs up every afternoon. Which restructuring does the guide point to?`,
   opts:[
     {t:`Have the coordinator read what the ticket actually requires and spawn only the subagents that requirement calls for, keeping the full fan-out for tickets that genuinely span billing and delivery.`, ok:true},
     {t:`Collapse the four subagents into one agent holding all of their tools, so a ticket costs a single run.`},
     {t:`Keep the fan-out but cache each subagent's last answer per customer for ten minutes, so repeat tickets skip the work.`},
     {t:`Keep the fan-out and let each subagent return an empty result when it decides the ticket is not its concern.`}],
   explain:{good:`1.2가 지적한 두 번째 실패 유형임. 코디네이터가 하는 네 가지 일 중 마지막이 어떤 서브에이전트(subagent)를 호출할지 동적으로 고르는 것이고, 판단 근거는 그 요청이 실제로 무엇을 필요로 하는가임. 티켓의 61%가 배송 조회만 필요하면 그 하나만 호출하고, 결제와 배송이 함께 걸린 티켓에만 네 개 전체 호출을 남김.`,
     wrongs:[`<b>B:</b> 한 에이전트에 도구를 모두 몰아주면 2.3이 지적한 도구 과다 문제가 다시 생김. 중앙 코디네이터 구조가 주던 관측 가능성과 에러 처리 일원화도 함께 사라짐.`,`<b>C:</b> 배송 상태는 10분 사이에도 바뀌는 값임. 캐시는 지연을 줄이지만 고객에게 낡은 위치를 알려 주는 새로운 오류를 만듦.`,`<b>D:</b> 서브에이전트를 띄우는 비용은 이미 다 든 뒤이므로 38초가 줄지 않음. 담당이 아니라는 뜻을 빈 결과로 돌려주면 2.2가 경고한 실패를 성공처럼 반환하는 형태가 됨.`]},
   principle:"요청이 필요로 하는 서브에이전트만 호출함"},

  {scenario:"s1", ts:"1.3", multi:2, q:`Your coordinator investigates a ticket, then spawns a reply-drafting subagent. Two audit findings this month: (1) drafts say "your recent order" and "the amount discussed" instead of B-4471 and $312.40, because the coordinator hands the drafter a two-line summary of what it found; (2) when a customer disputes a figure, nobody can tell which record the number came from — the drafts carry no trace of it. Which TWO changes fix this at the point it breaks? (Select TWO.)`,
   opts:[
     {t:`Put the complete findings — order IDs, amounts, dates, statuses — into the drafting subagent's prompt instead of a condensed version of them.`, ok:true},
     {t:`Hand the findings over in a structured form that keeps the content and its origin (which tool, which record, which timestamp) as separate parts, so the drafted reply can still point at where a figure came from.`, ok:true},
     {t:`Give the drafting subagent lookup_order and get_customer so it can fetch whatever detail it needs while writing.`},
     {t:`Paste the coordinator's entire conversation transcript into the drafting prompt, so every detail is technically present.`},
     {t:`Add a line to the drafting subagent's system prompt telling it to keep the details from the earlier investigation steps in mind.`}],
   explain:{good:`1.3의 두 규칙이 그대로 적용되는 상황임. 첫째, 조사 결과는 요약이 아니라 완전한 형태로 프롬프트에 넣음. 압축하는 순간 주문번호와 금액이 사라짐. 둘째, 내용과 출처 메타데이터를 분리한 구조로 넘김. 그래야 답장에서 어느 기록에서 나온 값인지 표기할 수 있음. 두 감사 지적은 각각 이 두 규칙을 어긴 결과임.`,
     wrongs:[`<b>C:</b> 코디네이터가 이미 가진 데이터를 서브에이전트가 다시 조회하는 구조임. 같은 조회를 두 번 하고 2.3의 최소 권한 원칙도 어김. 출처가 남지 않는 문제도 그대로임.`,`<b>D:</b> 사실이 담기기는 하지만 필요한 값이 대화 전문 속에 묻힘. 1.3이 요구하는 것은 전체 붙여넣기가 아니라 구조화한 전달임.`,`<b>E:</b> 서브에이전트는 코디네이터의 대화 히스토리(conversation history)를 물려받지 않고 호출 사이에 메모리도 없음. 프롬프트에 없는 내용을 기억하라는 지시는 적용될 대상이 없음.`]},
   principle:"조사 결과는 완전한 형태로, 출처는 별도 필드로 전달함"},

  {scenario:"s1", ts:"1.5", q:`Six weeks ago you added an interception hook that blocks process_refund whenever the amount exceeds $500. Compliance violations went to zero. But CSAT for those cases fell to 2.1, and transcript review shows the pattern: the hook returns a refusal, the model reads it, and 300-odd conversations ended with "I'm not able to help with that" and no next step for the customer. What is missing from the design?`,
   opts:[
     {t:`The block has no destination — on refusal the hook should route the case into the human escalation path with the case facts attached, so the conversation continues somewhere instead of dead-ending.`, ok:true},
     {t:`The threshold is too aggressive for this business; raising it to $2,000 keeps most refunds automated and cuts the dead ends by an order of magnitude.`},
     {t:`The rule belongs in the system prompt rather than a hook, so the model can explain the limit in its own words and offer the customer alternatives.`},
     {t:`The refusal should be reshaped into a normal-looking tool result after execution, so the model can paraphrase it warmly rather than reading a raw refusal.`}],
   explain:{good:`1.5가 정한 내용임. 차단만 하는 설계는 절반이고, 대체 워크플로로 연결하는 것까지가 정답임. 훅(hook)이 호출을 막은 뒤 에스컬레이션(escalation, 사람에게 넘김) 경로로 넘기면서 고객 ID, 근본 원인, 금액, 권고 조치라는 1.4의 핸드오프 4요소를 함께 전달하면 규칙도 지켜지고 대화도 끊기지 않음.`,
     wrongs:[`<b>B:</b> 규칙이 존재하는 이유 자체를 되돌리는 선택임. 지문의 문제는 금액 기준선이 아니라 차단된 뒤에 이어질 경로가 없다는 것임.`,`<b>C:</b> 프롬프트로 옮기면 결정론적 보장이 사라짐. 현재 0건인 위반율을 다시 확률적 판단에 맡기게 됨.`,`<b>D:</b> 실행 후 결과를 다듬는 것은 PostToolUse 훅의 역할임. 여기서 막아야 할 호출은 실행 자체가 되면 안 되는 호출임. 문장을 부드럽게 고쳐도 고객이 갈 경로는 여전히 없음.`]},
   principle:"차단만으로는 부족하며 대체 경로 연결까지 필요함"},

  {scenario:"s1", ts:"1.6", q:`Support operations wants a nightly job over the previous day's closed tickets — about 1,200. For each ticket: (i) was a follow-up date recorded, (ii) does the cited policy clause match the resolution given, (iii) was the customer's closing sentiment negative. Compliance signed all three checks off in March and wants every ticket to get all three, with results comparable week over week. Which approach is LEAST appropriate here?`,
   opts:[
     {t:`Let the agent judge, per ticket, which of the three checks are worth running so its budget goes to the tickets that look risky.`, ok:true},
     {t:`Run the three checks as three separate focused passes, each with its own criteria and its own output fields.`},
     {t:`Keep the check list fixed and route any ticket that fails a check into a human queue.`},
     {t:`Fix the output shape per check so one night's numbers can be lined up against the previous week's.`}],
   explain:{good:`가장 적합하지 않은 선택지를 고르는 부정형 문항임. 검사 단계가 3월에 이미 확정됐고 모든 티켓에 세 가지를 전부 적용해야 하는 상황이면 고정 파이프라인이 맞음. 에이전트가 매번 항목을 고르게 하면 확인이 빠지는 티켓이 생기고, 밤마다 빠지는 항목이 달라져 주간 비교도 불가능해짐. 적응적으로 판단한다는 설명이 붙어 있어도 이 지문의 요구 조건과는 반대임.`,
     wrongs:[`<b>B:</b> 세 관점을 각각의 패스로 나누는 것이 프롬프트 체이닝(prompt chaining)의 정상적인 사용임. 한 패스가 한 관점만 다루게 되고 출력 형식도 관점별로 맞출 수 있음.`,`<b>C:</b> 검사 목록은 고정하고 실패한 건만 사람에게 보내는 방식임. 자동화와 예외 처리를 나눈 정상적인 설계임.`,`<b>D:</b> 출력 형태를 고정해야 주간 비교라는 요구가 성립함. 지문이 직접 요구한 조건임.`]},
   principle:"이미 확정된 검사 단계는 에이전트가 고르지 않음"},

  {scenario:"s1", ts:"1.7", q:`A B2B case has been open nine days and you have kept the same named session alive so the agent remembers what was agreed. On day six the account was moved onto a new billing platform: every order, invoice and entitlement record was recreated under new identifiers, and lookups against the old IDs now return not-found. The session's stored tool results describe the old records. What do you do on day seven?`,
   opts:[
     {t:`Open a fresh session seeded with a structured summary of what was actually agreed — amount, deadline, commitments made to the customer — and let it look the account up again against the new records.`, ok:true},
     {t:`Resume the named session and tell the agent which identifiers changed, so it re-reads only the affected records.`},
     {t:`Fork the nine-day session so one branch keeps the pre-migration analysis available for comparison while the other works on the new records.`},
     {t:`Keep resuming and add a standing instruction to prefer the newer of any two conflicting records it sees.`}],
   explain:{good:`세션을 이어서 쓸지 새로 열지는 저장된 도구 결과(tool result)가 아직 유효한가로 판단함. 이 상황은 식별자 체계가 전부 바뀌었으므로 세션에 쌓인 조회 결과가 모두 무효임. 그 위에서 추론하면 존재하지 않는 기록을 근거로 삼게 됨. 그러므로 합의된 금액, 기한, 약속만 구조화 요약으로 뽑아 새 세션 서두에 넣음.`,
     wrongs:[`<b>B:</b> 일부 기록만 바뀐 상황에서는 맞는 처방임. 이 지문은 일부가 아니라 전부가 바뀐 경우이므로 조건이 다름.`,`<b>C:</b> 세션 분기는 유효한 분석 결과 위에서 두 가지 접근을 비교할 때 쓰는 기능임. 무효해진 데이터를 보존하는 용도가 아님.`,`<b>D:</b> 무효해진 기록을 컨텍스트에 남겨 둔 채 충돌 해소를 모델의 확률적 판단에 맡기는 방식임. 1.4가 구분한 확률적 처리와 결정론적 처리 중 확률적 쪽을 택한 것임.`]},
   principle:"식별자 체계가 전부 바뀌었으면 요약만 들고 새 세션을 엶"},

  /* --- D2 (2.1 / 2.2 / 2.3 / 2.4) --- */

  {scenario:"s1", ts:"2.1", q:`You rewrote every tool description to four sentences with input formats, sample requests and explicit boundaries. escalate_to_human selection improved from 71% to 96%. But process_refund is still called on messages that only ask "has my refund gone through yet" — 9% of such messages. Your system prompt opens with: "Refund-related requests are our highest priority — handle them immediately." What is the next move?`,
   opts:[
     {t:`Rewrite that opening line: priority wording that reads as an instruction to act is pulling the model toward the refund action tool, overriding boundaries the descriptions already state correctly.`, ok:true},
     {t:`Add two or three examples showing a refund-status question routed to the order lookup rather than to the refund tool.`},
     {t:`Add a required boolean parameter to process_refund that the model must set to assert the customer actually asked for a refund.`},
     {t:`Set tool_choice to "any" for this agent so the model always commits to a tool rather than improvising.`},],
   explain:{good:`2.1의 네 번째 점검 항목임. 잘 작성한 도구 설명을 시스템 프롬프트의 표현이 덮어쓰는 경우임. 환불 요청을 즉시 처리하라는 문장이 환불 실행 도구와 의도하지 않은 연결을 만들고 있음. 에스컬레이션 선택률이 96%까지 오른 것이 설명 자체는 제 역할을 한다는 근거이므로, 간섭을 일으키는 문장을 먼저 고침.`,
     wrongs:[`<b>B:</b> 일반적으로는 맞는 처방임. 다만 지문은 설명 보강이 이미 끝났고 남은 오선택이 특정 문장 때문임을 알려 줌. 원인을 그대로 둔 채 예시로 덮는 방식임.`,`<b>C:</b> 파라미터를 필수로 만들어도 모델이 그 값을 true로 채우면 그대로 통과함. 스키마는 형식을 강제할 뿐 선택 의도를 검증하지 못함.`,`<b>D:</b> tool_choice를 any로 두면 도구를 반드시 하나 부르게 할 뿐 어느 도구인지는 정하지 않음. 오히려 단순 상태 문의에도 도구 호출을 강제해 증상이 심해짐.`]},
   principle:"시스템 프롬프트의 표현이 도구 설명을 덮어씀"},

  {scenario:"s1", ts:"2.2", q:`Your order-lookup tool now returns isError with a sentence: "The payment provider did not respond in time." A teammate argues this is enough — the model reads English, the sentence says what happened, adding machine fields is over-engineering. Meanwhile the provider shipped a wording change last month ("Upstream timeout while settling") and agent retry behaviour changed with it. What is the correct assessment?`,
   opts:[
     {t:`A sentence forces the agent to re-infer the failure type and the retry decision from wording every time, and the wording is owned by someone else — the same failure should arrive with its category and a retryable flag stated as fields.`, ok:true},
     {t:`The sentence is sufficient as long as every failure path is standardized on one fixed set of phrasings that the team controls.`},
     {t:`Attach the provider's raw stack trace to the message so the agent has the maximum available information about what went wrong.`},
     {t:`Have the agent retry twice on any isError result before reporting anything, which covers timeouts without needing categories at all.`}],
   explain:{good:`2.2의 요점은 문장이 아니라 필드임. errorCategory(일시적, 검증, 비즈니스, 권한)와 isRetryable이 값으로 와야 복구 전략 선택이 추론이 아니라 코드 분기가 됨. 문구가 바뀌자 재시도 동작이 함께 바뀌었다는 사실이 문장에 기대는 설계의 문제를 보여 줌.`,
     wrongs:[`<b>B:</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 표현을 표준화하는 것 자체는 개선이지만, 분류는 여전히 문장 해석에 달려 있고 문구를 정하는 주체가 외부 서비스라는 조건도 바뀌지 않음.`,`<b>C:</b> 스택 트레이스를 붙이면 내부 구현이 노출되고 컨텍스트만 늘어남. 부족한 것은 정보량이 아니라 코드가 판단할 수 있는 형태임.`,`<b>D:</b> 조건 없는 일괄 재시도는 2.2가 대표적인 오답 유도 선택지로 지목한 방식임. 정책 위반이나 잘못된 입력에도 두 번씩 재시도하며 고객을 기다리게 함.`]},
   principle:"문장은 추론을 요구하고 필드는 분기 근거가 됨"},

  {scenario:"s1", ts:"2.3", q:`Your intake step must always begin with get_customer. The team sets tool_choice to the specific tool form, naming get_customer, on the first API call of each conversation. Which outcome should the team NOT expect from this change?`,
   opts:[
     {t:`It will stop the agent from reaching process_refund later in the conversation before verification has actually completed.`, ok:true},
     {t:`The first response will contain a get_customer call rather than a natural-language greeting.`},
     {t:`The intake step will stop varying between conversations that open with get_customer and ones that open with lookup_order.`},
     {t:`Later turns can go back to "auto" so the agent picks tools according to what the case turns out to need.`}],
   explain:{good:`기대하면 안 되는 결과를 고르는 부정형 문항임. tool_choice는 그 API 요청 한 번에만 적용되는 설정이므로 첫 턴의 도구만 고정함. 세 턴 뒤의 환불 호출과는 관계가 없음. 순서를 보장하려면 1.4의 전제조건 게이트나 파라미터 필수화 같은 강제 장치가 따로 있어야 함.`,
     wrongs:[`<b>B:</b> 기대해도 되는 결과임. 특정 도구를 강제하면 모델은 인사말 없이 곧바로 그 호출을 내보냄.`,`<b>C:</b> 기대해도 되는 결과임. 그 턴에 한해 도구가 고정되므로 대화 시작 지점의 변동이 사라짐.`,`<b>D:</b> 기대해도 되는 결과임. tool_choice는 요청 단위 설정이므로 다음 턴에 auto로 되돌릴 수 있음.`]},
   principle:"tool_choice는 해당 요청에만 적용되며 순서 보장은 별도 강제 장치가 필요함"},

  {scenario:"s1", ts:"2.4", multi:2, q:`Each of your eleven support engineers connected the ticketing MCP server by hand in their personal configuration. Three are running an expired credential, and their agents quietly fall back to guessing ticket status. Separately, someone built an in-house MCP server wrapping the payment provider's public API, duplicating a maintained community server, while the refund-approval workflow that is unique to your team still has no server. Which TWO changes are right? (Select TWO.)`,
   opts:[
     {t:`Move the shared server into a project-scoped configuration file committed to the repository, with the credential written as an environment variable reference so each machine supplies its own value.`, ok:true},
     {t:`Drop the in-house payment wrapper in favour of the maintained community server, and spend the custom server effort on the refund-approval workflow that is specific to this team.`, ok:true},
     {t:`Put a known-good credential straight into the committed configuration so every engineer connects with a value that is verified to work.`},
     {t:`Have every engineer re-run the connection command at the start of each session so the credential is always fresh.`},
     {t:`Expose the ticket catalogue as a tool the agent calls at the top of every conversation to see which ticket types exist.`}],
   explain:{good:`2.4의 두 가지 판단이 한 문항에 들어 있음. 첫째는 설정 범위임. 팀이 함께 쓰는 설정은 저장소에 커밋되는 프로젝트 스코프에 두고, 자격증명은 환경변수 참조로 빼서 실제 값은 각 개발자 기계에만 둠. 둘째는 직접 만들지 가져다 쓸지의 판단임. 표준 연동은 유지보수되는 커뮤니티 서버를 쓰고, 직접 제작은 팀 고유 워크플로에만 씀.`,
     wrongs:[`<b>C:</b> 자격증명을 저장소에 올리면 그 자체가 유출임. 환경변수 참조 기능이 존재하는 이유가 이것을 피하기 위함임.`,`<b>D:</b> 개발자마다 매번 직접 실행해야 하는 절차임. 프로젝트 스코프가 없애려는 수동 작업을 오히려 규칙으로 만드는 방식이고, 세 명이 만료된 자격증명을 쓰게 된 원인도 그대로 남음.`,`<b>E:</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 무엇이 있는지 미리 보여 주는 방향은 옳으나 그 역할은 도구가 아니라 리소스(resource)가 맡음. 카탈로그를 매 대화마다 도구 호출로 받아오면 호출 횟수와 토큰만 늘어남.`]},
   principle:"공유 설정은 프로젝트 스코프에 두고 자격증명은 환경변수로 참조함"},

  /* --- D3 (3.1 / 3.6) --- */

  {scenario:"s1", ts:"3.1", q:`In the support-agent repository, prompts/ holds the agent's system-prompt templates. The root memory file says every markdown line must stay under 100 characters, which mangles the prompt templates. A maintainer proposes adding a memory file inside prompts/. That file delivers everything the team wants EXCEPT one thing. Which one does it fail to deliver?`,
   opts:[
     {t:`A guarantee that the root file's 100-character rule stops applying to anyone working inside prompts/.`, ok:true},
     {t:`Extra conventions that apply while someone is actually editing the templates in that folder.`},
     {t:`Delivery to every teammate who clones the repository, since the file is committed with the code.`},
     {t:`Conventions that sit on top of the root file's rules rather than replacing the file.`}],
   explain:{good:`제공하지 못하는 것을 고르는 부정형 문항임. 메모리 파일 계층은 덮어쓰기가 아니라 이어 붙이기임. 여러 파일의 내용이 하나로 연결돼 모든 문장이 그대로 모델에게 전달됨. 작업 위치에 가까운 파일이 뒤에 읽혀 그쪽으로 기우는 경향은 있으나, 공식 문서는 충돌 시 어느 쪽이 적용될지 정해져 있지 않다고 명시함. 100자 규칙이 적용되지 않는다는 보장이 필요하면 하위 파일을 추가할 것이 아니라 루트 규칙에 prompts 폴더 제외 조항을 넣어 충돌 자체를 없애야 함.`,
     wrongs:[`<b>B:</b> 디렉토리 레벨 메모리 파일의 본래 용도임. 실제로 제공되는 것임.`,`<b>C:</b> 저장소에 커밋되는 위치이므로 클론한 모든 팀원에게 전달됨. 실제로 제공되는 것임.`,`<b>D:</b> 이어 붙이는 방식이므로 루트 파일의 규칙을 지우지 않고 그 위에 더해짐. 정확한 설명임.`]},
   principle:"메모리 파일 계층은 이어 붙이기이며 덮어쓰기가 아님"},

  {scenario:"s1", ts:"3.6", q:`You want every pull request to the support-agent repository to replay 40 recorded customer conversations and post any regressions as a PR comment. A junior engineer's first workflow hangs the runner for 30 minutes until the job times out. The last line in the runner log is the agent's opening greeting. What happened, and what fixes it?`,
   opts:[
     {t:`The run was started in its interactive form and sat waiting for a person to type on a machine where nobody is sitting; start it with the non-interactive print flag and a machine-readable output format so the step finishes and its result can be turned into a comment.`, ok:true},
     {t:`Forty conversations exceed the runner's time budget; split them across four jobs of ten so each finishes inside the limit.`},
     {t:`The workflow is missing the headless environment variable that tells the CLI no terminal is attached; set it in the workflow file.`},
     {t:`Pull requests are the wrong place for a suite this heavy; move it to a nightly scheduled job so PRs are never blocked.`}],
   explain:{good:`로그의 마지막 줄이 인사말이라는 점이 판단의 근거임. 40건 중 한 건도 진행되지 않았고, 시간이 부족했던 것이 아니라 입력을 기다리며 멈춰 있었음. 사람이 없는 러너에서는 claude -p 로 비대화형 실행하고, --output-format json 으로 결과를 기계가 읽을 수 있는 형태로 받아야 PR 코멘트로 옮길 수 있음.`,
     wrongs:[`<b>B:</b> 지문의 로그와 맞지 않음. 40건이 진행되다 중단된 것이 아니라 한 건도 시작되지 않았음.`,`<b>C:</b> 그런 환경변수는 존재하지 않음. CI 문항에서 자주 나오는 오답 유도 방식이 존재하지 않는 플래그나 환경변수를 제시하는 것임.`,`<b>D:</b> 증상을 피하는 선택임. PR 단계의 검사를 포기하면 회귀가 머지된 뒤에야 드러남.`]},
   principle:"사람이 없는 러너에서는 비대화형 플래그로 실행함"},

  /* --- D4 (4.1 / 4.3 / 4.4 / 4.6) --- */

  {scenario:"s1", ts:"4.1", q:`Your system prompt tells the agent to be empathetic and professional, and also to be concise. QA scored 400 replies: 23% open with three paragraphs of apology before reaching the answer, and customers are complaining about length. The QA lead wants the wording strengthened again. What actually moves the number?`,
   opts:[
     {t:`Replace the adjectives with stated conditions — one acknowledgement sentence only when the customer reports a loss or a failure on our side, the resolution inside the first two sentences, no apology at all on status questions.`, ok:true},
     {t:`Repeat the conciseness instruction at the end of the system prompt as well, so it is the last thing the model reads before the customer message.`},
     {t:`Cap replies at 60 words by truncating them after generation, which makes over-long apologies structurally impossible.`},
     {t:`Add a self-review step where the model asks itself whether the reply was empathetic, professional and concise before sending.`}],
   explain:{good:`4.1의 내용임. 형용사는 판단 기준이 되지 못함. 공감 있게라는 표현은 어디까지가 허용인지 알려 주지 않으므로, 모델이 사과를 세 문단 써도 지시를 어긴 것이 아니게 됨. 언제 사과 문장을 넣고 언제 넣지 않는지, 해결책이 몇 번째 문장에 와야 하는지를 조건으로 적어야 결과가 일정해짐.`,
     wrongs:[`<b>B:</b> 반복은 강조일 뿐 기준이 아님. 같은 모호한 단어를 두 번 읽어도 판단 기준이 생기지 않음.`,`<b>C:</b> 생성 후 잘라내면 사과뿐 아니라 해결책까지 잘림. 고객이 답을 받지 못하는 새 문제가 생김.`,`<b>D:</b> 스스로 점검하게 하려면 대조할 기준이 있어야 하는데 그 기준이 지금 없음. 같은 모호한 단어로 스스로를 평가하게 될 뿐임.`]},
   principle:"형용사 대신 적용 조건을 적음"},

  {scenario:"s1", ts:"4.3", q:`Handoffs to human agents must carry the customer ID, the issue summary, what the agent already tried, and — when one exists — the refund amount under discussion. Today the agent writes a paragraph, and 12% of handoffs state a refund amount for cases where no amount was ever raised. Which schema design removes that class of error?`,
   opts:[
     {t:`Define the handoff as a tool whose input schema lets the amount field hold null and leaves it out of the required list, so "no amount was discussed" has a value the model can actually return.`, ok:true},
     {t:`Keep the amount required and add a prompt line telling the model never to guess an amount it did not see.`},
     {t:`Make the amount a string field so the model can write "not discussed" when there is no figure.`},
     {t:`Keep the payload as it is and have a validator strip out any amount the transcript does not support before the handoff is filed.`}],
   explain:{good:`4.3의 nullable 규칙임. 원본에 없을 수 있는 정보를 required로 두면 모델이 값을 지어냄. 스키마에서 null을 허용하는 것과 required 목록에서 빼는 것이 함께 적용돼야 없음이라는 상태를 값으로 표현할 수 있음.`,
     wrongs:[`<b>B:</b> 스키마가 값을 요구하는데 문장으로 채우지 말라고 하면 서로 어긋남. 모델은 빈칸을 낼 수 없으므로 결국 무언가를 쓰게 됨.`,`<b>C:</b> 타입을 문자열로 바꾸면 다운스트림이 금액을 숫자로 읽지 못하고, 자유 문자열이라 표현도 제각각이 됨.`,`<b>D:</b> 사후에 지우는 방식은 지어내는 동작 자체를 멈추지 못하고, 상담사는 0원과 논의되지 않음을 여전히 구분하지 못함.`]},
   principle:"없을 수 있는 필드는 null을 허용하고 required에서 제외함"},

  {scenario:"s1", ts:"4.4", multi:2, q:`Refund confirmations state the amount, the last four card digits, and the expected settlement date. Last month's audit: (a) in 4% of confirmations the stated amount differs from the amount actually passed to process_refund; (b) in 2%, a settlement date appears that the payments tool never returned — the tool returns nothing for that field while the provider still has the payout queued, and three retries never produced one. Which TWO changes address these at the level they occur? (Select TWO.)`,
   opts:[
     {t:`Have the composer write out both the amount it is about to state and the amount taken from the refund tool result as separate fields, and hold the message when a comparison of the two disagrees.`, ok:true},
     {t:`Treat a missing settlement date as absent information rather than a failure — send the confirmation without a date and follow up when the provider returns one.`, ok:true},
     {t:`Have the model re-read its own confirmation and mark it verified before it is sent.`},
     {t:`Retry the whole composition up to three times whenever any field looks wrong, since a retry costs almost nothing.`},
     {t:`Widen the settlement-date field so it also accepts free text, letting the model write "pending" when it has no date.`}],
   explain:{good:`4.4의 두 가지 내용임. 첫째는 자기 검증 필드임. 모델이 맞다고 답하는 것을 믿지 않고 두 필드를 코드가 대조하는 구조를 만듦. 둘째는 재시도의 한계임. 고칠 근거가 원본에 있으면 오류를 붙여 재시도하고, 정보가 애초에 없으면 몇 번을 돌려도 나오지 않으므로 null 허용이나 다른 경로로 처리함.`,
     wrongs:[`<b>C:</b> 모델이 스스로 확인했다고 표시하는 것은 검증이 아님. 4.4가 명시적으로 배제한 방식이며, 대조는 필드끼리 코드가 해야 함.`,`<b>D:</b> 무엇이 어떻게 틀렸는지 알려 주지 않고 다시 하라고만 반복하는 형태임. (b)처럼 정보가 없는 경우에는 세 번을 더 돌려도 결과가 같음.`,`<b>E:</b> 스키마를 느슨하게 만들어 미정 표시와 실제 날짜를 같은 필드에 섞는 방식임. 다운스트림 파싱이 깨지고 두 상태의 구분도 사라짐.`]},
   principle:"필드끼리 대조하고 정보가 없으면 재시도 대신 다른 경로로 처리함"},

  {scenario:"s1", ts:"4.6", q:`Every resolved conversation ends with the same session rating whether it applied policy correctly. Those self-ratings say 98% correct. A human audit of 900 conversations found policy misapplied in 12%. Which action is LEAST likely to close that gap?`,
   opts:[
     {t:`Instruct the resolving session to reconsider its own reasoning more critically before it produces the rating.`, ok:true},
     {t:`Run the audit in a separate session that receives the transcript and the policy text but not the resolving session's reasoning.`},
     {t:`Split the audit into a per-conversation policy-match pass and a second pass that looks across conversations for the same misapplication recurring.`},
     {t:`Have the audit attach a confidence to each finding and check those against the human-audited sample before letting them route anything.`}],
   explain:{good:`가능성이 가장 낮은 선택지를 고르는 부정형 문항임. 같은 세션이 자기 결과를 검토하지 못하는 이유는 노력이 부족해서가 아니라 생성 당시의 추론 맥락이 그대로 남아 있기 때문임. 더 비판적으로 보라는 지시나 사고 시간을 늘리는 방법으로는 그 맥락을 지울 수 없음. 자기 평가 98%와 사람 감사 88%의 차이가 그 근거임.`,
     wrongs:[`<b>B:</b> 생성 당시의 추론을 갖지 않은 독립 인스턴스에 검토를 맡기는 방식이며, 4.6이 제시한 정답 방향임.`,`<b>C:</b> 패스를 나누면 한 패스가 다루는 관점이 줄고, 같은 오류가 반복되는 패턴까지 확인할 수 있음.`,`<b>D:</b> 신뢰도 값은 보정하기 전에는 근거로 쓸 수 없음. 정답이 표시된 표본에 대조한 뒤 사용하는 것이 5.5가 정한 순서임.`]},
   principle:"같은 세션의 재검토는 같은 오류를 다시 놓침"},

  /* --- D5 (5.3 / 5.5 / 5.6) --- */

  {scenario:"s1", ts:"5.3", q:`The billing platform was down for 40 minutes last Tuesday. In all 63 tickets handled in that window, the billing subagent returned an empty charge list, and the coordinator told customers "I don't see any charges on your account." Two of them cancelled. What should the subagent return instead, and what else does the design need?`,
   opts:[
     {t:`A structured failure carrying the failure type, the query it attempted, whatever partial data it did get and a suggested alternative — plus a retry rule written into the subagent's own instructions so short outages resolve below the coordinator instead of surfacing at all.`, ok:true},
     {t:`The same empty list with a warning string attached, so the coordinator can see that something went wrong before it answers.`},
     {t:`An abort signal that ends the whole ticket, so no wrong answer can reach a customer while any subagent is failing.`},
     {t:`Nothing different from the subagent — the coordinator should cross-check every charge list against the customer's own account summary and escalate on disagreement.`}],
   explain:{good:`5.3이 지적한 대표적인 잘못된 설계임. 실패를 성공과 같은 형태로 반환하는 방식임. 타임아웃이 빈 목록으로 돌아오면 코디네이터는 청구 내역이 없다는 뜻으로 읽음. 구조화된 에러의 네 요소인 실패 유형, 시도한 조회, 확보한 부분 결과, 권고 대안이 있어야 재시도와 대안 접근과 부분 진행 중 하나를 고를 수 있음. 서브에이전트 지시문에 넣어 둔 재시도 규칙이 짧은 장애 대부분을 코디네이터까지 올라오기 전에 처리함.`,
     wrongs:[`<b>B:</b> 경고 문자열 하나는 5.3이 지적한 뭉뚱그린 상태 표시에 해당함. 응답의 형태는 여전히 성공임.`,`<b>C:</b> 전체 중단도 잘못된 설계임. 63건 중에는 결제와 무관한 문의도 있는데 전부 답을 받지 못하게 됨.`,`<b>D:</b> 결제 시스템이 멈춘 상황에서는 대조할 두 번째 출처 자체가 없음. 실패의 형태를 감춘 채 코디네이터에게 불가능한 확인을 요구하는 방식임.`]},
   principle:"실패를 성공과 같은 형태로 반환하지 않음"},

  {scenario:"s1", ts:"5.5", multi:2, q:`Tickets close automatically when the agent's self-reported resolution confidence clears 0.9 — that is 71% of volume, and their pooled CSAT is 4.6 out of 5. The ops lead wants to lower the bar to 0.75 next month. Last month's spot check found that among Spanish-language tickets, 9% of volume, the 0.9-and-above closures were wrong 19% of the time. Which TWO steps have to come first? (Select TWO.)`,
   opts:[
     {t:`Break the accuracy figures apart by ticket language and issue type instead of reading the pooled number, so segments hiding inside 4.6 become visible.`, ok:true},
     {t:`Score a labelled set to find out whether a stated 0.9 has actually meant 90% correct, since an uncalibrated self-report cannot carry a threshold.`, ok:true},
     {t:`Keep sampling auto-closed tickets at random after the change, at the rate used today.`},
     {t:`Have the agent produce a second, more conservative confidence score and require both to clear the bar.`},
     {t:`Move the bar to 0.95 for every ticket instead, and lower it once pooled CSAT reaches 4.8.`}],
   explain:{good:`5.5가 정한 순서임. 집계 지표는 세그먼트를 가리므로 문서 유형과 필드, 이 지문에서는 언어와 이슈 유형으로 나눠 보는 것이 먼저임. 그다음 모델이 말한 0.9가 실제로 90% 정확도였는지 정답이 표시된 세트에 대조하는 보정을 함. 이 두 단계가 끝난 뒤에야 임계값을 조정할 수 있음.`,
     wrongs:[`<b>C:</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 감시 없이 자동화를 넓히면 안 되므로 표집 자체는 필요함. 다만 9%인 스페인어 세그먼트를 찾아내지 못한 원인이 단순 무작위 표집이고, 지문이 묻는 것은 변경 전에 할 일인데 이 선택지는 변경 후의 조치임.`,`<b>D:</b> 보정되지 않은 값을 두 개로 늘려도 보정되지 않은 상태는 그대로임.`,`<b>E:</b> 세그먼트를 가린 그 집계 지표를 근거로 임계값만 반대로 옮기는 방식임. 스페인어 티켓의 19% 오류율은 그대로 남음.`]},
   principle:"집계 지표에 가려진 세그먼트를 먼저 나눠 보고 그다음 보정함"},

  {scenario:"s1", ts:"5.6", q:`Legal reviewed 200 replies and found the agent telling customers "our policy allows a 30-day return." The policy page has said 14 days since a January revision. The agent's answer traced to a summarized help-centre article still carrying 30 — and that article was itself edited last week, for formatting. Two internal documents disagree and the summary kept one of them. What is the fix?`,
   opts:[
     {t:`Have the policy lookup return each statement with the document it came from and that document's revision date, keep both readings when two documents disagree, and put the conflict in front of a human rather than resolving it in the agent.`, ok:true},
     {t:`Have the agent prefer whichever policy document was updated most recently when two sources disagree.`},
     {t:`Remove the help-centre article from the agent's source set so only the policy page can be quoted.`},
     {t:`Add a system-prompt line telling the agent to state a policy number only when it is certain of it.`}],
   explain:{good:`5.6의 두 규칙이 함께 적용되는 상황임. 주장과 출처를 연결한 형태, 즉 주장, 발췌, 문서명, 발행일과 개정일을 구조화된 출력(structured output)의 필수 항목으로 두면 요약 단계에서 연결이 끊기지 않음. 신뢰할 수 있는 문서끼리 충돌하면 하나를 임의로 고르지 않고 둘 다 출처와 함께 표시한 뒤 조정은 사람에게 넘김.`,
     wrongs:[`<b>B:</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 최신 문서를 우선하는 규칙은 대개 맞지만, 지문의 낡은 문서는 지난주에 서식 때문에 수정됐음. 수정 시각과 내용의 최신성은 서로 다른 기준임.`,`<b>C:</b> 이번 문서 하나를 제외해도 같은 내용이 중복 서술된 다음 문서에서 같은 오류가 반복됨.`,`<b>D:</b> 에이전트는 이미 그 값을 확신하고 있었음. 원인은 확신의 표현이 아니라 출처와 개정일이 빠진 것임.`]},
   principle:"문서가 충돌하면 둘 다 출처와 개정일을 붙여 표시함"},

  /* ============================ SCENARIO 2 — Code Generation with Claude Code ============================ */

  /* --- D1 (1.1 / 1.2 / 1.3 / 1.4) --- */

  {scenario:"s2", ts:"1.1", q:`A scaffolding harness drives Claude to generate a service module. Its loop stops when the response text contains the phrase "All done." Last week the prompt template was reworded and Claude began finishing with "Everything is complete." — 18 of 22 runs since then ran to the 40-iteration cap. Separately, three runs ended with a file cut off mid-function, and those responses carried a stop reason of max_tokens. Which change does NOT belong in the fix?`,
   opts:[
     {t:`Add the new phrasing to the list of completion strings the harness matches against, and keep the list updated as the prompt evolves.`, ok:true},
     {t:`Gate the loop on the response's stop reason — keep going while it reads tool_use, stop when it reads end_turn.`},
     {t:`Give max_tokens its own branch — raise the limit and retry, or accept the partial output deliberately — instead of letting it fall through as an ordinary turn.`},
     {t:`Keep the 40-iteration cap, but as a runaway guard rather than as the thing that decides the work is finished.`}],
   explain:{good:`해결책에 포함되면 안 되는 것을 고르는 부정형 문항임. 자연어 완료 신호를 문자열로 찾는 방식은 1.1이 지적한 잘못된 설계이며, 문구가 바뀌면 깨진다는 사실이 지문에서 이미 드러났음. 문자열 목록을 늘리는 것은 같은 구조를 유지한 채 다음 문구 변경을 기다리는 것과 같음. 종료 판단의 기준은 stop_reason 하나임.`,
     wrongs:[`<b>B:</b> 공식 문서의 루프가 이 형태임. stop_reason이 tool_use면 계속하고 end_turn이면 정지함.`,`<b>C:</b> max_tokens는 완료가 아니라 길이 한도에 도달했다는 별개의 값이므로 처리 분기가 따로 있어야 함. 파일이 중간에 잘린 세 건의 원인이 이것임.`,`<b>D:</b> 반복 상한은 안전장치로 쓸 때만 타당함. 주 종료 조건으로 삼으면 안 되지만 무한 반복 방지용으로는 남겨 두는 것이 맞음.`]},
   principle:"완료 판단은 stop_reason으로 하며 문자열 일치로 하지 않음"},

  {scenario:"s2", ts:"1.2", q:`Your endpoint-scaffolding workflow spawns four subagents at once: schema writer, handler writer, test writer, docs writer. The handler and the tests reference customer_ref, but the schema subagent settled on customer_id partway through its own run — a name that at that point existed only in its output, not yet on disk. Each subagent did exactly what it was told. Where does the fault sit?`,
   opts:[
     {t:`With the coordinator, which delegated four pieces as if they were independent — the handler and tests depend on the schema, so that step has to finish and its result has to be routed into the later prompts before those run.`, ok:true},
     {t:`With the handler subagent, which should have read the schema file itself instead of relying on what it was handed.`},
     {t:`With the context window, which cannot hold all four workstreams at once and dropped the rename before the handler prompt was assembled.`},
     {t:`With the missing shared memory between sibling subagents, which would have let the handler see the schema subagent's decision as it was made.`}],
   explain:{good:`1.2가 지적한 첫 번째 실패 유형에 해당함. 잘못한 쪽은 하위 서브에이전트가 아니라 작업을 분해하고 전달한 코디네이터임. 스키마에 의존하는 작업을 스키마 작업과 동시에 띄웠으므로 의존 관계를 무시한 병렬 실행이었음. 코디네이터가 스키마 결과를 받은 뒤 다음 프롬프트에 실어 보냈어야 함. 서로 독립인 작업만 동시에 띄우는 것이 1.3이 정한 병렬 조건임.`,
     wrongs:[`<b>B:</b> 그 이름은 그 시점에 디스크에 없었음. 존재하지 않는 내용을 읽으라는 요구이며, 서브에이전트는 프롬프트로 받은 내용만 알 수 있음.`,`<b>C:</b> 컨텍스트 크기를 원인으로 지목하는 오답 유도 선택지임. 지문에 한도 초과를 나타내는 근거가 없음.`,`<b>D:</b> 서브에이전트끼리 공유하는 메모리는 존재하지 않음. 없는 기능을 원인으로 지목한 선택지이며, 이 구조에서 정보는 코디네이터를 거쳐 흐름.`]},
   principle:"의존 관계가 있으면 병렬이 아니라 코디네이터를 거쳐 전달함"},

  {scenario:"s2", ts:"1.3", q:`You delegate "write the tests for the payment retry module" to a subagent with a 40-line prompt spelling out each step: open the file, list the exported functions, write one test per function, run the suite. It produced one test per function including trivial getters, and no test at all for retry exhaustion. A teammate wants to add twenty more lines of steps. What is the better move?`,
   opts:[
     {t:`Replace the step list with the goal and the bar it has to clear — which behaviours must be covered, including retry exhaustion, backoff timing and idempotency, and what counts as finished — and include the module findings the subagent needs to work from.`, ok:true},
     {t:`Keep the step list and add the missing case as step 41, since that is the gap the run actually exposed.`},
     {t:`Run the subagent twice with the same prompt and merge the two test files, so a gap in one run is covered by the other.`},
     {t:`Have the subagent stop and ask the coordinator whenever it is unsure which cases matter.`}],
   explain:{good:`1.3의 네 번째 규칙임. 프롬프트는 절차가 아니라 목표를 적음. 절차만 받은 서브에이전트는 그 절차를 정확히 수행하고도 목적을 놓침. 함수마다 테스트를 하나씩 쓰라는 지시를 지켰으므로 단순 게터에도 테스트가 붙었고, 재시도 소진은 함수 목록에 나타나지 않으므로 빠졌음. 달성해야 할 품질 기준을 주면 상황에 맞게 판단함.`,
     wrongs:[`<b>B:</b> 이번에 드러난 누락 하나는 채워지지만 누락을 만든 구조가 그대로 남음. 다음에 빠질 케이스는 41번째 줄에도 적혀 있지 않음.`,`<b>C:</b> 같은 프롬프트로 두 번 실행하면 같은 지점에서 똑같이 빠짐. 비용만 두 배가 됨.`,`<b>D:</b> 호출 사이에 메모리가 없고 되묻는 비용도 큼. 판단 기준은 물어서 받는 것이 아니라 프롬프트에 적혀 있어야 함.`]},
   principle:"절차 대신 목표와 품질 기준을 적음"},

  {scenario:"s2", ts:"1.4", multi:2, q:`Two incidents in the code-generation repo last quarter. (1) A session ran a force push to the shared main branch while cleaning up a rebase; the contributor guide has forbidden force pushes since 2023. (2) Generated migrations land without the paired down-migration about one time in five, even though the project memory file asks for one. Which TWO changes deliver what each incident actually needs? (Select TWO.)`,
   opts:[
     {t:`Intercept the shell call before it runs with a hook that refuses commands matching the force-push form, so the rule stops depending on the session's judgement.`, ok:true},
     {t:`Leave the down-migration as written guidance, and make the merge conditional on an automated check for the paired file so the one-in-five that slips through is caught before it lands.`, ok:true},
     {t:`Rewrite the memory file line as "NEVER force-push — this is a hard rule" and move it to the top of the file where it is read first.`},
     {t:`Add worked examples of a correct migration pair to the project memory file so the model sees the shape it should produce.`},
     {t:`Ask each engineer to read the diff before committing and add a reminder line to the pull request template.`}],
   explain:{good:`1.4의 판단 기준이 두 사건을 서로 다르게 나누는 문항임. (1)은 규칙을 어기면 공유 브랜치 이력이 사라지는 사고이므로 결정론적으로 강제함. 호출 자체가 실행되지 않게 막아야 함. (2)는 품질 미달이므로 지시는 그대로 두되 3.6의 자동 검사로 머지 전에 확인함. 문서에 적어 둔 규칙이 이미 한 번 지켜지지 않았다는 사실이 판단의 근거임.`,
     wrongs:[`<b>C:</b> 메모리 파일은 컨텍스트일 뿐 강제 설정이 아님. 대문자로 쓰고 위치를 옮겨도 준수 확률이 조금 오를 뿐 위반이 0이 되지 않음.`,`<b>D:</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 예시는 형태를 가르치는 좋은 수단이지만 20%의 누락을 0으로 만들지 못하고, 강제 푸시 사건에는 아무 효과가 없음.`,`<b>E:</b> 사람의 주의에 기대는 방식임. 두 사건 모두 규칙이 이미 문서에 적혀 있는데도 발생했다는 것이 지문의 조건임.`]},
   principle:"문서로 지켜지지 않은 규칙은 훅으로 막고 품질 미달은 자동 검사로 거름"},

  /* --- D2 (2.1 / 2.4 / 2.5) --- */

  {scenario:"s2", ts:"2.1", q:`Your internal MCP server exposes one tool, codebase_query, described as "Query the codebase." Depending on a free-text question argument it answers symbol lookups, dependency questions, or ownership questions. Claude Code reaches for it constantly and gets a usable answer about half the time; the other half it asks something the tool cannot answer and falls back to Grep. What is the right fix?`,
   opts:[
     {t:`Split it into tools with distinct contracts — find_symbol_definition, list_dependents, get_file_owner — each with its own inputs and a description that says which requests it serves and which it does not.`, ok:true},
     {t:`Keep the single tool and expand its description to four or more sentences listing everything it is able to answer.`},
     {t:`Leave the tool alone and add routing guidance to the project memory file explaining when to use it and when to use Grep instead.`},
     {t:`Require the tool whenever the request mentions the codebase, so the fallback to Grep stops happening.`}],
   explain:{good:`2.1의 세 번째 처방임. 범용 도구는 목적별로 나눔. 입력과 출력 계약이 뚜렷할수록 선택도 사용도 정확해짐. 현재는 도구 하나가 세 가지 일을 하므로 설명을 아무리 길게 써도 어느 요청에 이 도구가 맞는지 경계가 생기지 않음.`,
     wrongs:[`<b>B:</b> 설명을 보강하는 것은 대개 먼저 시도할 조치가 맞음. 다만 이 상황은 도구 하나가 세 가지 계약을 겸하는 것이 원인이므로 문장을 늘려도 입력 형식은 여전히 자유 텍스트임.`,`<b>C:</b> 도구 선택을 결정하는 주된 근거는 도구 설명임. 메모리 파일에 안내를 적는 것은 원인을 그대로 둔 채 우회 경로를 만드는 방식임.`,`<b>D:</b> 절반의 요청에 답하지 못하는 도구를 강제로 호출하게 만드는 선택임. 실패율이 오히려 올라감.`]},
   principle:"범용 도구 하나보다 계약이 뚜렷한 여러 도구가 나음"},

  {scenario:"s2", ts:"2.4", q:`Two needs. (i) Claude Code should open tracker tickets from the TODOs it generates — a standard integration with a widely used tracker. (ii) Before scaffolding, it should know which of your 340 internal service templates exist. An engineer proposes building both in-house: one server for the tracker, and one exposing the template list as a tool the agent calls to see what is available. What is the better shape?`,
   opts:[
     {t:`Adopt the maintained community server for the tracker rather than writing one, and publish the template catalogue as a resource so the agent can see what exists without spending a call to ask.`, ok:true},
     {t:`Build both in-house, since servers written by the team can be shaped around exactly the fields and workflows this team uses.`},
     {t:`Skip MCP for the tracker and have Claude Code call the tracker's command-line client through the shell.`},
     {t:`Build the tracker server in-house and register the templates as a tool that returns the full list of 340 on every call.`}],
   explain:{good:`2.4의 두 가지 판단이 각각 다른 답으로 이어지는 문항임. 표준 연동은 커뮤니티 서버를 쓰고 직접 제작은 팀 고유 워크플로에만 씀. 트래커는 표준 연동에 해당함. 그리고 무엇이 있는지 미리 보여 주는 역할은 도구가 아니라 리소스(resource)가 맡으므로, 카탈로그를 리소스로 노출하면 확인용 도구 호출 자체가 줄어듦.`,
     wrongs:[`<b>B:</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 템플릿 쪽은 이 팀 고유이므로 직접 만드는 것이 맞음. 다만 트래커까지 직접 만들면 다른 곳에서 유지보수하는 코드를 직접 떠안게 됨.`,`<b>C:</b> 동작은 하지만 넓은 셸 권한을 열어야 하고 도구 계약도 없음. 2.3의 최소 권한 원칙과 어긋남.`,`<b>D:</b> 두 판단을 모두 반대로 적용한 선택지임. 340개를 매번 전부 받아오면 컨텍스트만 소모함.`]},
   principle:"표준 연동은 기존 서버를 쓰고 카탈로그는 리소스로 노출함"},

  {scenario:"s2", ts:"2.5", q:`You need every place that ends up calling chargeCard(). The symbol is re-exported through two wrapper modules under different names — billing.charge and payments.run — and the repository holds 2,600 files. Which move is LEAST useful as a next step?`,
   opts:[
     {t:`Read every file under src/payments/ in full first, so the module is understood before any searching starts.`, ok:true},
     {t:`Search file contents for the original symbol to locate its definition and its direct callers.`},
     {t:`Open the two wrapper files to see what they re-export and under which names.`},
     {t:`Take each exported name the wrappers introduce and search the whole tree for it.`},],
   explain:{good:`가장 도움이 되지 않는 선택지를 고르는 부정형 문항임. 2.5가 지적한 대표적인 오답이 전부 먼저 읽고 시작하는 방식임. 컨텍스트를 낭비하고, 이 지문에서는 찾으려는 호출 지점이 그 폴더 밖에 있으므로 다 읽어도 답이 나오지 않음. 정상적인 방법은 진입점을 검색으로 찾고 필요한 파일만 읽는 점진적 이해임.`,
     wrongs:[`<b>B:</b> 식별자로 파일 내용을 검색하면 정의와 직접 호출자를 한 번에 찾을 수 있음. 첫 단계로 적절함.`,`<b>C:</b> 래퍼가 어떤 이름으로 다시 내보내는지 확인하는 단계임. 래퍼를 따라가려면 반드시 거쳐야 함.`,`<b>D:</b> 내보낸 이름을 전부 확인한 뒤 각 이름을 저장소 전체에서 검색하는 것이 래퍼를 따라가는 정식 절차임.`]},
   principle:"전부 읽고 시작하는 방식은 항상 오답임"},

  /* --- D3 (3.1 / 3.2 / 3.3 / 3.4 / 3.5 / 3.6) --- */

  {scenario:"s2", ts:"3.1", q:`A monorepo with nine packages. The root memory file has grown to 1,100 lines because every package appended its own standards to it. A session working in packages/mobile loads Go service conventions and Terraform rules it will never touch, and the three rules the mobile team actually cares about sit around line 940 where they get lost. What is the right reorganization?`,
   opts:[
     {t:`Keep the genuinely universal rules in the root file and give each package its own memory file that pulls in only the standard documents that package needs, so a mobile session loads the mobile set on top of the shared base.`, ok:true},
     {t:`Move all 1,100 lines into path-scoped rule files, so nothing loads at all unless a file matching its pattern is being edited.`},
     {t:`Have each team keep its package's standards in their own personal memory files, since only they work in that package anyway.`},
     {t:`Trim the root file to the 200 lines that matter most and move the rest onto the engineering wiki, linked from the file.`}],
   explain:{good:`3.1의 모노레포 사례임. 패키지별 메모리 파일이 필요한 표준 문서만 골라 가져오게 하면, 각 패키지 관리자가 자기 도메인 지식으로 필요한 문서를 고르고 세션은 공용 기반 위에 해당 패키지 내용만 얹게 됨. 무관한 1,100줄을 매번 읽는 낭비와 필요한 규칙이 묻히는 문제가 함께 해결됨.`,
     wrongs:[`<b>B:</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 경로 규칙 파일은 유용한 수단이나, 전부 옮기면 어느 패턴에도 해당하지 않는 세션에서 보편 규칙까지 로드되지 않음.`,`<b>C:</b> 사용자 레벨 파일은 저장소 밖에 있으므로 팀 전체에 전달되지 않음. 새로 합류한 사람은 아무것도 받지 못함.`,`<b>D:</b> 위키로 옮긴 규칙은 로드되지 않으므로 적용되지 않고, 표준이 코드와 별개로 낡아 감.`]},
   principle:"패키지마다 필요한 표준 문서만 골라 가져옴"},

  {scenario:"s2", ts:"3.2", multi:2, q:`Two things need a home in the repo. (i) A twelve-step release-notes procedure run once a sprint; a dry run produced about 800 lines of commit-log analysis in the conversation before it got to the notes. (ii) A one-line rule that generated code must never import from internal/. Which TWO placements are right? (Select TWO.)`,
   opts:[
     {t:`Package the release-notes procedure as a skill invoked when it is needed, with its frontmatter set to run in a forked context so the log analysis never lands in the working conversation.`, ok:true},
     {t:`Put the import rule in the project memory file, since it has to hold on every session rather than only when someone thinks to ask for it.`, ok:true},
     {t:`Put the release-notes procedure in the project memory file so it is always available when a sprint ends.`},
     {t:`Make the import rule a skill, invoked before each code-generation task so it is loaded exactly when it is relevant.`},
     {t:`Put both into one slash command the team runs at the start of every session.`}],
   explain:{good:`3.2의 판별 질문 하나로 갈리는 문항임. 매번 적용돼야 하는가를 물어서, 그렇다면 CLAUDE.md에 두고 특정 작업에서만 필요하면 스킬로 만듦. 릴리스 노트 절차는 2주에 한 번 부르는 작업이므로 스킬이고, 출력이 길므로 frontmatter의 분기 실행 설정으로 격리해 요약만 본 대화로 돌아오게 함. internal/ 임포트 금지는 항상 성립해야 하는 표준이므로 메모리 파일에 둠.`,
     wrongs:[`<b>C:</b> 12단계 절차가 모든 세션에 항상 로드됨. 한 달에 두 번 쓰는 내용에 매 세션 토큰을 쓰게 됨.`,`<b>D:</b> 스킬은 호출해야 적용됨. 항상 성립해야 하는 규칙을 호출 여부에 맡기면 호출하지 않은 세션에서 지켜지지 않음.`,`<b>E:</b> 세션마다 사람이 직접 실행해야 하는 절차이며, 슬래시 커맨드의 내용은 그때 보내는 프롬프트일 뿐 항상 적용되는 규칙이 아님.`]},
   principle:"매번 적용인지 호출할 때만인지가 판단 기준임"},

  {scenario:"s2", ts:"3.3", q:`A rule file carrying the API error-handling conventions declares paths: ["src/api/**/*.ts"]. A reviewer complains the conventions did not fire while they were writing code that broke them. The rule loads for every file below EXCEPT one. Which is the exception?`,
   opts:[
     {t:`src/web/api/client.ts`, ok:true},
     {t:`src/api/index.ts`},
     {t:`src/api/v2/handlers/payment.ts`},
     {t:`src/api/v2/handlers/payment.test.ts`}],
   explain:{good:`해당하지 않는 것을 고르는 부정형 문항임. 글롭 패턴은 왼쪽부터 순서대로 경로에 대응함. src/api/ 로 시작하는 경로만 대상이고, 그 안에서 ** 가 하위 폴더 깊이를 담당하고 *.ts 가 파일 이름을 담당함. src/web/api/ 는 폴더 이름이 api일 뿐 경로 시작이 다르므로 대응하지 않음. 그 파일을 편집하는 사람이 규칙을 받지 못하는 것이 패턴대로의 결과임.`,
     wrongs:[`<b>B:</b> ** 는 하위 폴더 0단계도 포함하므로 src/api/ 바로 아래 파일도 대응함.`,`<b>C:</b> ** 가 v2/handlers 두 단계를 포함하고 파일 이름이 .ts 로 끝나므로 대응함.`,`<b>D:</b> 파일 이름이 .test.ts 로 끝나도 .ts 로 끝나는 파일이므로 대응함. 테스트 파일을 제외하려면 패턴을 따로 지정해야 함.`]},
   principle:"글롭은 왼쪽부터 대응하므로 폴더 이름이 같아도 경로가 다르면 해당하지 않음"},

  {scenario:"s2", ts:"3.4", q:`You are replacing the auth middleware across five services. Two integration approaches are both defensible — a shared library versus a sidecar — with different operational costs. Mapping the current call sites takes hours and produces thousands of lines of search output; on the last attempt the session filled up and the plan it produced covered only the first two services. How should this run?`,
   opts:[
     {t:`Work in plan mode, and hand the call-site mapping to a subagent that returns a condensed summary, so the design gets decided from findings rather than from raw exploration output.`, ok:true},
     {t:`Work in plan mode and give the session a larger context budget so the whole mapping fits in one place.`},
     {t:`Start implementing the shared-library approach directly, and switch to plan mode if the sidecar turns out to be the better fit.`},
     {t:`Split it into five independent per-service tasks and let each session settle on its own approach for that service.`}],
   explain:{good:`3.4의 조합 패턴임. 타당한 접근이 두 가지이고 대상 파일도 여러 서비스에 걸쳐 있으므로 계획 모드(plan mode)가 맞음. 지난 실패의 원인은 탐색 출력이 컨텍스트를 채운 것이므로, 그 부분은 서브에이전트에 위임해 요약만 받음. 5.4와 이어지는 처방임.`,
     wrongs:[`<b>B:</b> 계획 모드를 쓴다는 부분은 맞지만 이 문제의 조건에서는 틀린 선택지임. 컨텍스트 예산을 늘려 푸는 방식은 오답 유도 선택지이며, 한 세션이 다루는 정보량 문제는 예산으로 해결되지 않음.`,`<b>C:</b> 두 접근을 비교해야 한다는 조건이 이미 지문에 있는데 무시하고 구현부터 시작하는 선택지임. 나중에 다시 작업하게 됨.`,`<b>D:</b> 아키텍처 결정을 다섯 개 세션으로 나누는 선택임. 서비스마다 다른 방식이 남게 됨.`]},
   principle:"설계는 계획 모드로 하고 탐색 출력은 서브에이전트에 위임함"},

  {scenario:"s2", ts:"3.5", q:`You are generating a rate limiter from a two-page spec. Round one ignored what happens when the system clock jumps. Round two had no answer for what a limited client actually receives back. Round three left it unclear whether limits are keyed per API key or per IP. Each version was functional; each time the gap was something you had not thought to write down. What should round four be?`,
   opts:[
     {t:`Have Claude put its open questions to you before it writes anything — what a clock jump should do, what the limited client receives, what the limit is keyed on — and answer them, then implement.`, ok:true},
     {t:`Add the three discovered gaps to the spec and regenerate from the updated version.`},
     {t:`Write failing tests for the three gaps and iterate until they all pass.`},
     {t:`Provide two or three input and output examples covering a limited request and an allowed one.`}],
   explain:{good:`3.5의 증상 대조표에서 요구사항을 다 적었다고 생각했는데 빠진 항목이 계속 나오는 경우에 해당함. 그 처방이 인터뷰 패턴임. 구현 전에 모델이 질문하게 해서 명세에 적지 못한 고려사항을 꺼내게 함. 익숙하지 않은 도메인일수록 효과가 큼.`,
     wrongs:[`<b>B:</b> 이미 드러난 세 가지는 채워지지만 실패의 형태가 미리 생각하지 못한 항목이 나오는 것이므로 네 번째 시도에서 네 번째 누락이 나옴.`,`<b>C:</b> 테스트를 먼저 쓰는 방법은 기대 동작을 알고 있을 때 효과적임. 이 상황은 무엇을 기대해야 하는지가 아직 정해지지 않았음.`,`<b>D:</b> 입출력 예시는 산문 명세가 시도마다 다르게 해석될 때 쓰는 처방임. 지문의 결과물은 매번 동작했고 해석이 흔들린 것이 아니라 요구사항이 비어 있었음.`]},
   principle:"명세에서 빠진 항목이 계속 나오면 구현 전에 질문을 받음"},

  {scenario:"s2", ts:"3.6", multi:2, q:`The pull-request review bot has run for six weeks. Two complaints. (a) After each new commit it re-posts the same 30 comments the author already dealt with. (b) The tests it proposes duplicate scenarios the existing suite already covers, and reviewers spend more time deleting than merging. Which TWO changes address these? (Select TWO.)`,
   opts:[
     {t:`Pass the previous review's findings into the run and tell it to report only issues that are new or still unresolved.`, ok:true},
     {t:`Put the existing test files into the run's context so it can see which scenarios are already covered before proposing more.`, ok:true},
     {t:`Have the bot replace its previous comment with a single fresh summary on each commit, so the thread stays short.`},
     {t:`Review only the final commit before merge, so intermediate pushes stop generating comments at all.`},
     {t:`Have the session that generated the code also generate the tests, since it already knows what it wrote and what is untested.`}],
   explain:{good:`3.6의 품질 규칙 두 가지가 그대로 적용됨. 중복 코멘트는 이전 리뷰의 발견 사항을 컨텍스트에 넣고 새로 생긴 이슈와 아직 해결되지 않은 이슈만 보고하도록 지정해 해결함. 중복 테스트는 기존 테스트 파일을 컨텍스트에 제공해 해결함. 두 경우 모두 이미 존재하는 것을 봇에게 보여 주는 방법임.`,
     wrongs:[`<b>C:</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 스레드는 짧아지지만 봇은 여전히 같은 30개를 매번 다시 만들어 내고, 해결된 항목과 남은 항목을 구분하지 못함.`,`<b>D:</b> 피드백을 수정 비용이 가장 큰 시점으로 미루는 선택이며, 중복 테스트 문제에는 아무 효과가 없음.`,`<b>E:</b> 코드를 생성한 세션은 자기 코드를 검증하는 데 적합하지 않음. 생성 당시의 추론이 남아 자기 결정을 의심하지 못함. 리뷰와 테스트 생성은 독립 인스턴스가 맡아야 함.`]},
   principle:"이전 결과를 컨텍스트로 제공해야 중복이 사라짐"},

  /* --- D4 (4.1 / 4.2 / 4.4) --- */

  {scenario:"s2", ts:"4.1", q:`The review bot posts about 40 style nits per pull request. Developers stopped reading it two months ago — and buried in last week's list, unread, was a real SQL injection it had correctly flagged. The prompt says "review carefully and report anything that looks off." A teammate proposes "only report things you are at least 80% confident about." What actually works?`,
   opts:[
     {t:`Name the categories that get reported — bugs, security, data loss — and the categories that get skipped, including formatting, naming and patterns local to this project.`, ok:true},
     {t:`Adopt the 80% confidence threshold, which lets the model filter out the nits it is least sure about.`},
     {t:`Turn the bot off for two weeks so developers come back to it without the accumulated resentment.`},
     {t:`Keep every finding but attach a severity label so developers can filter to the ones that matter.`}],
   explain:{good:`4.1의 정답 방향은 항상 무엇을 보고하고 무엇을 넘길지 명시적으로 정의하는 것임. 오탐이 몰린 범주 하나 때문에 정확한 지적까지 읽히지 않게 된다는 것이 지문의 SQL 인젝션 사례임. 범주 기반 규칙이 그 신뢰를 되찾는 방법임.`,
     wrongs:[`<b>B:</b> 확신도로 거르는 방식은 4.1이 범주 기반 규칙으로 대체하라고 지정한 방법임. 보정되지 않은 자기 보고 값이므로 80이라는 기준선이 실제로 무엇을 뜻하는지도 알 수 없음.`,`<b>C:</b> 기준이 그대로이면 다시 켠 봇도 40개를 그대로 남김. 개발자의 태도가 아니라 설계가 원인임.`,`<b>D:</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 심각도 표시는 유용하나 각 등급을 구체적인 코드 예시로 정의하지 않으면 분류가 흔들리고, 40개가 목록에 남아 있는 한 실제 결함은 계속 묻힘.`]},
   principle:"확신도 기준이 아니라 범주 기준으로 정의함"},

  {scenario:"s2", ts:"4.2", q:`Two problems trace to one missing piece of knowledge. The generator writes console.log calls into production handlers. The review bot flags every console.log it sees, including the ones in test files, where your team uses them deliberately while debugging. Reviewers dismissed 60 such findings last month. What is the targeted fix?`,
   opts:[
     {t:`Add paired examples showing the same statement in both places with the correct verdict for each, and the reason the location is what decides it.`, ok:true},
     {t:`Add several examples of clean production handlers so the model learns the pattern it should be producing.`},
     {t:`Add a memory-file rule forbidding console.log anywhere in the repository.`},
     {t:`Post-process the bot's output and drop any finding whose file path contains "test".`}],
   explain:{good:`4.2의 대비 예시임. 같은 코드가 위치에 따라 허용이 되기도 하고 이슈가 되기도 한다는 것을 가르치려면 두 경우를 한 쌍으로 보여 줘야 함. 테스트 파일 안의 console.log는 허용, 프로덕션 핸들러 안의 console.log는 이슈, 그리고 위치가 판단을 가른다는 이유까지 함께 적음. 이유가 있어야 예시에 없던 새 파일에도 같은 기준이 적용됨.`,
     wrongs:[`<b>B:</b> 한쪽만 보여 주는 예시는 형태는 가르쳐도 판단 경계는 가르치지 못함. 테스트 파일 오탐 60건은 그대로 남음.`,`<b>C:</b> 팀이 의도적으로 쓰는 방식을 금지하는 선택임. 규칙을 지문의 조건에 맞추는 것이 아니라 조건을 규칙에 맞추는 방식임.`,`<b>D:</b> 리뷰 쪽 증상만 가리며, 생성기가 프로덕션 핸들러에 로그를 넣는 문제는 그대로 남음.`]},
   principle:"판단 경계는 대비되는 예시 한 쌍으로 가르침"},

  {scenario:"s2", ts:"4.4", multi:2, q:`Your scaffolding pipeline asks Claude to emit a JSON manifest of what it generated: path, purpose, and paired test file. Two failure modes. (a) About 6% of manifests list a test file that was never created. (b) The manifest carries a ticket_id that exists only in a tracker the model has no access to; it invents one roughly one time in ten, and three automatic retries never once produced a correct value. Which TWO changes fit? (Select TWO.)`,
   opts:[
     {t:`Compare every listed path against the files that actually exist and, when they disagree, re-request the manifest with the original instructions, the manifest that failed, and the exact mismatch named.`, ok:true},
     {t:`Stop retrying the ticket field, let it come back empty, and fill it from the tracker inside the pipeline.`, ok:true},
     {t:`Raise the retry ceiling from three to eight so the ticket field eventually comes out right.`},
     {t:`Add a line to the prompt asking the model to be accurate about file paths and ticket identifiers.`},
     {t:`Have the model re-read its own manifest and confirm it is correct before returning it.`}],
   explain:{good:`4.4가 정한 재시도 판단 순서임. 실패를 발견하면 원인부터 분류함. (a)는 고칠 근거가 있으므로 원본 요청, 실패한 출력, 구체적인 검증 오류 세 가지를 붙여 재시도함. (b)는 정보 자체가 모델에게 없는 경우이므로 재시도로는 나오지 않으며, null 허용이나 파이프라인에서 값을 채우는 다른 경로로 처리함.`,
     wrongs:[`<b>C:</b> 모델에게 없는 정보는 여덟 번 물어도 나오지 않음. 재시도 상한을 올리는 것은 원인 분류를 건너뛴 대응임.`,`<b>D:</b> 정확하게 하라는 문장은 4.1이 지적한 모호한 지시임. 코드로 대조할 수 있는 결함을 문장에 맡기는 선택임.`,`<b>E:</b> 모델의 자기 확인은 검증이 아님. 디스크의 실제 파일과 대조하는 일은 코드가 해야 함.`]},
   principle:"고칠 근거가 있으면 피드백을 붙여 재시도하고 없으면 다른 경로로 처리함"},

  /* --- D5 (5.4 / 5.5) --- */

  {scenario:"s2", ts:"5.4", q:`A migration coordinator spawns one subagent per package across 180 files. At hour three the coordinator process was killed by an infrastructure restart. Every subagent's findings existed only as text returned into the coordinator's conversation, so the rerun repeated eleven packages of analysis that had already finished. How should the next run be designed?`,
   opts:[
     {t:`Have each subagent write its findings and a record of what it completed into files as it goes, so a restarted coordinator reads those records and dispatches only the packages still outstanding.`, ok:true},
     {t:`Have the coordinator fold each subagent's findings into its own running notes as they arrive, so nothing is lost when a subagent finishes.`},
     {t:`Reduce the number of packages handled per run so any single crash costs less rework.`},
     {t:`On restart, re-spawn every subagent with instructions to move faster now that the codebase is familiar.`}],
   explain:{good:`5.4의 장애 복구 구조임. 대화 컨텍스트에 있는 내용은 프로세스가 종료되면 함께 사라지고, 파일에 쓴 내용은 남음. 서브에이전트가 진행하면서 발견 사항과 완료 상태를 파일에 기록하게 하면, 다시 시작한 코디네이터가 그 파일을 읽고 남은 패키지만 새 프롬프트로 내보낼 수 있음.`,
     wrongs:[`<b>B:</b> 요약해서 옮겨도 여전히 대화 안에 있음. 이번에 사라진 위치가 바로 그곳이므로 같은 장애에서 같은 손실이 발생함.`,`<b>C:</b> 손실 범위만 줄이는 방법이며, 이미 끝난 작업을 보존하지는 못함.`,`<b>D:</b> 열한 개 패키지를 처음부터 다시 실행하는 것은 그대로임. 새 세션에는 이전 실행의 기억 자체가 없음.`]},
   principle:"대화 컨텍스트는 장애 시 사라지므로 진행 상태를 파일에 기록함"},

  {scenario:"s2", ts:"5.5", q:`Generated pull requests merge automatically when the test suite passes and the bot's self-reported risk score reads "low" — 84% of them do. An incident review of the six production regressions traced to auto-merged PRs found all six were labelled low risk, and all six touched files under payments/. Which action does NOT follow from what that review found?`,
   opts:[
     {t:`Tighten the bar so auto-merge requires a "very low" label instead of "low", keeping the same score as the gate.`, ok:true},
     {t:`Break the regression rate apart by directory and by change type instead of reading the pooled auto-merge rate.`},
     {t:`Route every change touching payments/ to a human reviewer regardless of its label, and leave the well-behaved areas automated.`},
     {t:`Score a labelled set of past pull requests to find out what a "low" label has actually corresponded to, before letting it gate anything.`}],
   explain:{good:`감사 결과에서 도출되지 않는 조치를 고르는 부정형 문항임. 여섯 건 전부가 low로 표시됐다는 것은 그 라벨이 위험을 구분하지 못한다는 뜻임. 같은 척도를 한 단계 더 조여도 척도 자체가 실제 위험과 맞지 않으면 결과는 같고, 보정되지 않은 자기 보고 점수를 머지 조건으로 쓰는 구조도 바뀌지 않음.`,
     wrongs:[`<b>B:</b> 여섯 건이 한 디렉토리에 몰렸다는 것은 집계 지표에 가려진 세그먼트가 있다는 근거임. 나눠서 확인하는 것이 5.5의 첫 단계임.`,`<b>C:</b> 오류가 많은 영역은 사람에게 보내고 안정적인 영역은 자동으로 두는 방식임. 부분 전환이 이 형태임.`,`<b>D:</b> 정답이 표시된 세트에 대조해 low가 실제로 무엇을 뜻했는지 확인하는 것이 보정임. 임계값을 조정하기 전에 해야 할 단계임.`]},
   principle:"보정되지 않은 자기 보고 점수는 기준을 조여도 그대로임"}

  );
})();
