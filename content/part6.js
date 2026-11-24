/* PART 6 · 시나리오 실전: 출제 시나리오 6종 */
window.CCAF_CONTENT.p6 = {
  id: "p6",
  lessons: [

  /* ===== 시나리오 ① 고객지원 해결 에이전트 ===== */
  { id:"p6s1", ch:"①", title:"고객지원 해결 에이전트", scenario:"s1",
    steps:[
      {type:"concept", kind:"SCENARIO BRIEFING", h:"시나리오 ① 고객지원 해결 에이전트",
   html:`<h4>① 상황</h4>
<ul>
<li>Agent SDK로 만든 고객지원 에이전트</li>
<li>반품, 결제 분쟁, 계정 문제처럼 요구가 분명하지 않은 요청 처리</li>
</ul>
<h4>② 시스템 구성</h4>
<ul>
<li>MCP 도구 4개: get_customer, lookup_order, process_refund, escalate_to_human</li>
<li>목표: 첫 문의에서 해결하는 비율 80% 이상. 사람에게 넘길 시점의 판단도 목표에 포함</li>
<li>관련 영역: D1, D2, D5</li>
</ul>
<h4>③ 자주 묻는 내용</h4>
<table>
<tr><th>내용</th><th>판단 기준</th></tr>
<tr><td>본인 확인 순서 강제</td><td>프로그램으로 만든 사전 조건 검사. 지시문으로는 보장 불가</td></tr>
<tr><td>금액 상한과 규정</td><td>훅으로 차단하고 다른 처리 경로 안내</td></tr>
<tr><td>사람에게 넘기는 기준</td><td>정당한 경우 세 가지. 감정 표현과 신뢰도는 기준이 아님</td></tr>
<tr><td>긴 대화의 금액과 날짜</td><td>요약 대상에서 뺀 별도 자리에 보관</td></tr>
<tr><td>도구 실패 응답</td><td>오류 종류와 재시도 가능 여부를 항목으로 구분</td></tr>
</table>
<h4>④ 자주 나오는 오답</h4>
<ul>
<li>금액이 걸린 규칙을 지시문 강화로 해결하는 선택지</li>
<li>사람을 요청한 고객에게 자동 응대를 계속하는 선택지</li>
<li>숫자가 사라지는 문제를 요약 횟수 조정으로 해결하는 선택지</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>첫 문의 해결 비율(FCR)</b>: 고객이 다시 문의하지 않아도 되게 첫 문의에서 해결한 비율</li>
<li><b>에스컬레이션</b>: 에이전트가 직접 처리하지 않고 사람에게 넘기는 일</li>
</ul>
</div>`},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S1-1: Two issues, one gap",
       q:`A customer message contains two requests: (a) a refund for order #B-2210, fully covered by your return policy, and (b) compensation for "emotional distress," which your policy does not address at all. What is the correct handling?`,
       opts:[
         {t:`Decompose the message; resolve the refund autonomously since it's within policy, and escalate the compensation request to a human with a structured summary, since the policy is silent on it.`, ok:true},
         {t:`Escalate the entire conversation — mixed requests are too risky to partially automate.`},
         {t:`Resolve the refund and politely decline the compensation, since undefined requests default to denial.`},
         {t:`Offer a small goodwill credit for the distress claim to close both issues in one contact.`}],
       hint:`두 요청의 성격이 다름. 하나는 정책 범위 안의 요청이고, 다른 하나는 정책에 해당 조항이 없는 요청임. 각각에 대한 처리 방법을 확인할 것.`,
       explain:{good:`여러 요청이 섞인 메시지의 분해(1.4)와 정책 공백 시 에스컬레이션(5.2)을 함께 적용하는 문제임. 정책 범위 안의 요청은 에이전트가 처리하고, 정책에 조항이 없는 요청은 답을 지어내지 않고 구조화된 요약과 함께 사람에게 넘김.`,
         wrongs:[`<b>B:</b> 정책 범위 안의 환불까지 사람에게 넘기는 과잉 에스컬레이션임. 첫 접촉 해결률이 크게 떨어짐.`,`<b>C:</b> 거절 역시 없는 정책을 만들어 내는 것임. 정책에 금지 조항이 있는 것이 아니라 조항 자체가 없음.`,`<b>D:</b> 보상 크레딧을 임의로 제공하는 것은 더 적극적으로 정책을 만들어 내는 행위임. 감사에서 문제가 됨.`]},
       principle:"정책 범위 안은 처리하고, 정책 공백은 넘김", ts:"5.2"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S1-2: The distinguishable failures",
       q:`process_refund can fail three ways: the payments service times out; the refund exceeds the order amount (invalid input); the order is past the return window (policy). Currently all three return {"isError": true, "message": "refund failed"}. Which redesign lets the agent respond correctly to each?`,
       opts:[
         {t:`Return structured metadata per failure: errorCategory ("transient"/"validation"/"business"), isRetryable (true only for the timeout), and a human-readable description — with a customer-friendly explanation for the policy case.`, ok:true},
         {t:`Add a system prompt rule describing the three failure types so the agent can guess which occurred.`},
         {t:`Return isError only for the timeout, and success-with-warning for the other two.`},
         {t:`Standardize on retrying every failure twice before telling the customer anything.`}],
       hint:`에이전트는 실패의 종류를 알아야 재시도, 입력 수정, 고객 설명 중 하나를 고를 수 있음. 그 정보를 누가 제공해야 하는지 확인할 것.`,
       explain:{good:`에러를 네 가지로 분류하고 isRetryable과 설명을 함께 반환하는 2.2의 내용임. 타임아웃은 재시도, 검증 오류는 입력 수정, 정책 위반은 고객 설명으로 처리함. 도구가 분류 정보를 주어야 에이전트가 셋 중 하나를 고를 수 있음.`,
         wrongs:[`<b>B:</b> 동일한 메시지만 보고 유형을 추측하라는 방식임. 판단 근거가 되는 정보가 없음.`,`<b>C:</b> 실패를 성공으로 표시하는 방식임. 검증 오류가 승인된 것처럼 보이게 됨.`,`<b>D:</b> 정책 위반을 재시도하는 것은 낭비임. 조건 없이 2회 재시도하는 방식은 실패를 분류하지 않겠다는 것과 같음.`]},
       principle:"원칙 ⑤ 실패는 구조화해서 반환함", ts:"2.2"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S1-3: The forgotten agreement",
       q:`In a 40-turn dispute conversation, the agent agreed to refund $312.40 by March 15. Twenty turns later — after summarization kicked in — it offers "a refund of the appropriate amount at the earliest convenience." The customer is furious. Beyond this ticket, what systemic fix prevents recurrence?`,
       opts:[
         {t:`Extract agreed amounts, dates, order numbers and statuses into a persistent case-facts block that is excluded from summarization and injected into every prompt.`, ok:true},
         {t:`Reduce the summarization frequency so agreements survive longer in raw form.`},
         {t:`Instruct the summarizer to write longer, more detailed summaries.`},
         {t:`Have the agent re-ask the customer for the agreed amount when unsure.`}],
       hint:`합의 내용이 요약 과정에 들어가면 압축되면서 세부 값이 사라짐. 합의 내용을 어디에 보관해야 하는지 확인할 것.`,
       explain:{good:`5.1의 case facts 패턴임. 거래 사실은 요약 파이프라인 밖의 구조화 블록에 보관함. 압축을 거치지 않으므로 값이 바뀌지 않고, 매 프롬프트에 원래 형태 그대로 포함됨.`,
         wrongs:[`<b>B:</b> 발생 시점을 늦출 뿐임. 대화가 더 길어지면 같은 문제가 발생함.`,`<b>C:</b> 더 자세히 요약하라고 지시해도 요약은 여전히 압축이며, 특정 값이 남는다는 보장이 없음.`,`<b>D:</b> 에이전트가 자신이 한 약속을 고객에게 되묻는 방식이며, 남은 신뢰까지 잃게 됨.`]},
       principle:"금액과 날짜는 요약 대상에서 제외함", ts:"5.1"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S1-4: The stubborn 5%",
       q:`Policy requires a verified receipt before any refund over $100. You strengthened the system prompt twice and added few-shot examples; the violation rate dropped from 9% to 5% but won't reach zero. Compliance demands zero. What does this situation tell you, and what is the fix?`,
       opts:[
         {t:`Prompt-based guidance is probabilistic and cannot guarantee compliance; implement a programmatic prerequisite that blocks process_refund above $100 until receipt verification has completed.`, ok:true},
         {t:`Add more diverse few-shot examples until the remaining 5% is covered.`},
         {t:`Lower the threshold to $50 so violations matter less individually.`},
         {t:`Fine-tune a custom model on compliant conversations to internalize the rule.`}],
       hint:`위반율이 9%에서 5%로 줄어들기만 했다는 점이 핵심 단서임. 프롬프트 개선으로 도달할 수 있는 한계가 어디인지 확인할 것.`,
       explain:{good:`1.4가 구분하는 지점임. 프롬프트는 실패율을 낮출 뿐 0으로 만들지 못함. 위반 0건이 요구되는 순간 답은 코드로 만든 게이트뿐임.`,
         wrongs:[`<b>B:</b> 예시를 늘려도 프롬프트가 확률적이라는 성질은 변하지 않음. 같은 방법 안에서의 미세 조정임.`,`<b>C:</b> 요구 조건 자체를 바꾸는 방식임. 기준을 낮춰도 위반은 그대로 발생함.`,`<b>D:</b> 파인튜닝(fine-tuning)의 결과도 확률적이며, 대규모 인프라까지 필요함.`]},
       principle:"원칙 ① 위반 0건이 필요하면 코드로 강제함", ts:"1.4"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S1-5: Two angry customers",
       q:`Two simultaneous chats: (a) a furious customer, caps-lock and threats, whose issue is a standard address change the agent can do in one step; (b) a calm, polite customer requesting a warranty extension your policy doesn't mention anywhere. Which handling is correct?`,
       opts:[
         {t:`(a) Acknowledge the frustration and complete the address change immediately; (b) escalate to a human, because the policy is silent on warranty extensions.`, ok:true},
         {t:`(a) Escalate due to the hostile tone; (b) resolve autonomously since the customer is cooperative.`},
         {t:`Escalate both — one is emotionally risky, the other has no policy coverage.`},
         {t:`Resolve both autonomously — an agent should maximize first-contact resolution.`}],
       hint:`감정 상태는 난이도의 지표가 아님. 에스컬레이션 여부를 결정하는 기준이 무엇인지 확인할 것.`,
       explain:{good:`5.2가 구분하는 지점임. 감정 상태와 요청의 복잡도는 별개임. (a)는 에이전트가 처리할 수 있는 단순 작업이므로 불만을 인정한 뒤 즉시 해결함. (b)는 정책에 조항이 없는 경우이며, 고객의 태도가 협조적이어도 에이전트가 정책을 만들어 낼 수는 없음.`,
         wrongs:[`<b>B:</b> 두 처리가 정확히 반대로 되어 있음. 감정을 기준으로 에스컬레이션하고, 없는 정책을 만들어 냄.`,`<b>C:</b> (a)까지 사람에게 넘기면 첫 접촉 해결률이 크게 떨어짐. 과한 조치임.`,`<b>D:</b> (b)를 자율 처리하는 것은 보증 정책을 새로 만들어 내는 것과 같음.`]},
       principle:"감정이 아니라 정책과 처리 능력을 기준으로 판단함", ts:"5.2"},
    ]},

  /* ===== 시나리오 ② Claude Code 코드 생성 ===== */
  { id:"p6s2", ch:"②", title:"Claude Code 코드 생성", scenario:"s2",
    steps:[
      {type:"concept", kind:"SCENARIO BRIEFING", h:"시나리오 ② Claude Code 코드 생성",
   html:`<h4>① 상황</h4>
<ul>
<li>팀이 Claude Code로 코드 작성, 구조 정리, 오류 수정, 문서 작성 속도를 높이는 상황</li>
<li>스킬과 CLAUDE.md로 팀의 개발 과정에 연결</li>
</ul>
<h4>② 시스템 구성</h4>
<ul>
<li>슬래시 명령으로 실행하는 스킬, CLAUDE.md 설정, 플랜 모드와 바로 실행 사이의 선택</li>
<li>관련 영역: D3, D5</li>
</ul>
<h4>③ 자주 묻는 내용</h4>
<table>
<tr><th>내용</th><th>판단 기준</th></tr>
<tr><td>지시를 둘 위치</td><td>스킬, 규칙 파일, CLAUDE.md의 적용 대상과 읽히는 시점</td></tr>
<tr><td>플랜 모드 사용 조건</td><td>큰 변경, 가능한 방법이 여러 개인 경우, 구조에 대한 결정. 분명한 수정 하나는 바로 실행</td></tr>
<tr><td>세션 이어 가기</td><td>그 사이 바뀐 코드의 범위가 이전 분석의 유효 여부를 결정</td></tr>
<tr><td>긴 세션의 품질 저하</td><td>스크래치패드, Explore 서브에이전트, 단계별 요약</td></tr>
</table>
<h4>④ 자주 나오는 오답</h4>
<ul>
<li>팀 전체에 적용할 설정을 개인용 위치에 두는 선택지</li>
<li>코드가 크게 바뀐 뒤에도 이전 세션의 분석을 그대로 쓰는 선택지</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>플랜 모드(plan mode)</b>: 파일을 고치지 않고 계획만 세우는 실행 방식</li>
<li><b>스크래치패드</b>: 에이전트가 발견한 내용을 적어 두는 파일</li>
</ul>
</div>`},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S2-1: The conflicting conventions",
       q:`A senior dev's Claude Code generates code with tabs and semicolons; everyone else's uses the team standard (spaces, no semicolons). Investigation shows the team standard lives in the project CLAUDE.md, and the senior dev has personal formatting rules in ~/.claude/CLAUDE.md. What is happening, and what should change?`,
       opts:[
         {t:`Both files load together and the user-level personal rules are interfering; the senior dev should remove the conflicting personal formatting rules so the shared project standard governs team code.`, ok:true},
         {t:`The project CLAUDE.md is corrupted for that developer and should be re-cloned.`},
         {t:`User-level files always override project files by design, so the team standard should move to every developer's user level.`},
         {t:`Add a stronger "ignore personal preferences" instruction to the project CLAUDE.md.`}],
       hint:`사용자 레벨과 프로젝트 레벨은 함께 로드됨. 서로 충돌하는 지시 두 벌이 같이 들어갈 때 어떤 일이 생기는지 확인할 것.`,
       explain:{good:`3.1의 계층 구조를 실제 상황에 적용한 문제임. 두 레벨이 동시에 로드되므로 서로 충돌하는 지시가 함께 들어감. 팀 작업에서는 개인 포맷 규칙을 제거하는 것이 맞음. 진단 방법은 /memory로 어떤 파일이 로드됐는지 확인하는 것임.`,
         wrongs:[`<b>B:</b> 파일이 손상됐다는 근거가 지문에 없음. 증상은 개인 규칙이 존재한다는 사실과 정확히 일치함.`,`<b>C:</b> 팀 표준을 각자의 사용자 레벨로 옮기면 공유와 버전 관리를 포기하게 되며, 사람마다 설정이 달라짐.`,`<b>D:</b> 지시로 다른 지시를 이기려는 방식이며 결과가 확률적임. 충돌 원인을 제거하는 것이 답임.`]},
       principle:"계층은 겹쳐 로드되므로 충돌 원인을 제거함", ts:"3.1"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S2-2: The scaffold skill",
       q:`You're building a team skill that scaffolds new API endpoints: it must create files from templates (write operations required), must never execute shell commands, and requires an endpoint name that developers keep omitting. Which SKILL.md frontmatter configuration is right?`,
       opts:[
         {t:`disallowed-tools removing Bash so that no shell command can run, plus argument-hint showing that an endpoint name is expected; context: fork is optional since scaffold output is compact.`, ok:true},
         {t:`context: fork alone — isolation prevents both shell execution and missing arguments.`},
         {t:`argument-hint alone — once the name is provided, the skill body can enforce the tool rules.`},
         {t:`No frontmatter needed; state all three requirements clearly in the skill's prompt body.`}],
       hint:`요구 조건을 각 옵션에 하나씩 대응시킬 것. 셸 실행 금지를 확실하게 보장하는 옵션이 무엇인지 확인할 것.`,
       explain:{good:`스킬 설정 항목별 기능을 묻는 문제. 도구 차단은 disallowed-tools, 넘길 값 안내는 argument-hint. fork는 출력이 길 때 컨텍스트를 격리하는 용도이므로 이 스킬에는 필수 아님.`,
         wrongs:[`<b>B:</b> fork는 컨텍스트를 격리할 뿐이며 도구와 인자를 통제하지 않음.`,`<b>C:</b> 프롬프트 본문에 셸 금지를 적는 방식은 확률적임. Bash가 도구 목록에 남아 있으면 호출될 수 있음.`,`<b>D:</b> 세 요구를 모두 확률에 맡기는 구성이며, 네 선택지 중 강제력이 가장 약함.`]},
       principle:"원칙 ① 강제는 스킬 설정 항목으로", ts:"3.2"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S2-3: Three tasks, three modes?",
       q:`Monday's queue: (a) fix a null-pointer crash with a stack trace pointing to one line in payment.ts; (b) migrate the ORM library used across 60+ files; (c) add a feature that could reasonably be built three different ways with different infra costs. Which mode assignment is correct?`,
       opts:[
         {t:`(a) direct execution; (b) plan mode to investigate, then direct execution to implement; (c) plan mode to compare the approaches before committing.`, ok:true},
         {t:`Plan mode for all three — planning never hurts.`},
         {t:`Direct execution for all three — experienced teams don't need plan mode.`},
         {t:`(a) plan mode since payments are critical; (b) direct execution to save time; (c) direct execution with the first approach that comes to mind.`}],
       hint:`세 가지를 확인할 것. 접근 방식이 여럿인가, 관련 파일이 많은가, 해결 경로가 이미 명확한가.`,
       explain:{good:`3.4의 세 판단 기준을 한 문항에 모아 둔 문제임. 명확한 단일 수정은 direct, 대규모 변경은 plan으로 조사한 뒤 direct로 구현하는 조합, 접근 방식이 여럿인 경우는 plan임. (b)의 조합 패턴까지 아는지 묻는 구성임.`,
         wrongs:[`<b>B:</b> (a)에 plan mode를 쓰는 것은 낭비임. 스택 트레이스가 수정할 위치를 이미 지목함.`,`<b>C:</b> 60개 파일 마이그레이션을 계획 없이 실행하면 재작업이 발생함.`,`<b>D:</b> 중요도와 복잡도를 혼동한 배치임. 중요한 작업이어도 수정 지점이 명확하면 direct임.`]},
       principle:"모드는 중요도가 아니라 복잡도로 정함", ts:"3.4"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S2-4: The long migration",
       q:`Your ORM migration will take two weeks of daily Claude Code sessions. You want each day to build on prior analysis without re-exploring, and colleagues merge small PRs daily that touch some analyzed files. Which session strategy fits?`,
       opts:[
         {t:`Use a named session with --resume each day, informing the agent at the start of each day which files changed since yesterday so it re-analyzes only those.`, ok:true},
         {t:`Start a fresh session every morning and re-run the full codebase analysis for accuracy.`},
         {t:`Resume the named session daily without mentioning changes — daily PRs are too small to matter.`},
         {t:`Fork the session every morning so each day's work is isolated from the last.`}],
       hint:`매일 발생하는 변경은 규모가 작고 대상이 특정됨. 이 조건에서 세션 재개에 함께 붙는 절차가 무엇인지 확인할 것.`,
       explain:{good:`1.7의 패턴임. 세션을 재개하고, 바뀐 파일을 알려 주고, 그 파일만 다시 분석함. 기존 분석 대부분은 그대로 유효하고 변경 대상은 특정되어 있음. 매일 전체를 다시 분석하는 것보다 효율적이며, 변경 고지가 낡은 전제로 추론할 위험을 막음.`,
         wrongs:[`<b>B:</b> 2주 동안 매일 전체를 다시 분석하면 아직 유효한 작업 결과를 매번 버리게 됨.`,`<b>C:</b> 변경을 알리지 않고 재개하면 낡은 파일 내용을 전제로 추론하게 됨. 변경이 작으니 괜찮다는 판단에는 근거가 없음.`,`<b>D:</b> fork는 여러 갈래를 비교할 때 씀. 매일 fork하면 전날 작업과 연결이 끊어짐.`]},
       principle:"세션 재개와 변경 고지를 함께 함", ts:"1.7"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S2-5: The three-hour refactor",
       q:`Hour three of a large refactoring session: Claude's suggestions increasingly cite "standard repository patterns" instead of the specific UserRepository and OrderService classes it analyzed in hour one, and it just proposed a change that conflicts with a constraint it identified earlier. What combination addresses this?`,
       opts:[
         {t:`Record key findings and constraints in scratchpad files as they're discovered and reference them in later prompts; for the next phase, summarize findings before continuing and consider /compact to clear verbose exploration output.`, ok:true},
         {t:`Ask Claude to "remember the constraints from earlier" at each step.`},
         {t:`Restart the session and redo the analysis with instructions to be more careful.`},
         {t:`Switch to a model with a larger context window so nothing falls out.`}],
       hint:`구체적인 클래스 이름 대신 일반적인 패턴을 언급하기 시작한 증상의 이름을 확인할 것. 그리고 대화 안이 아니라 대화 밖에 기록을 남기는 대응 수단을 확인할 것.`,
       explain:{good:`컨텍스트 열화(context degradation, 5.4)의 대표 증상과 세 가지 대응임. 스크래치패드 파일에 외부 기록을 남기고, 단계마다 요약하고, /compact로 길어진 탐색 출력을 정리함. 대화에 남은 기억 대신 파일 기록에 의존하도록 구조를 바꾸는 방법임.`,
         wrongs:[`<b>B:</b> 컨텍스트에서 밀려난 내용은 다시 기억하라는 지시로 되살아나지 않음.`,`<b>C:</b> 재시작한 뒤 다시 분석하면 같은 비용을 다시 지불하게 됨. 새 세션도 3시간이 지나면 같은 열화가 발생함.`,`<b>D:</b> 컨텍스트 창(context window)이 커져도 모델의 주의가 분산되는 현상과 열화는 그대로 남음.`]},
       principle:"기록이 기억을 대신하게 함", ts:"5.4"},
    ]},

  /* ===== 시나리오 ③ 멀티에이전트 리서치 ===== */
  { id:"p6s3", ch:"③", title:"멀티에이전트 리서치 시스템", scenario:"s3",
    steps:[
      {type:"concept", kind:"SCENARIO BRIEFING", h:"시나리오 ③ 멀티에이전트 리서치 시스템",
   html:`<h4>① 상황</h4>
<ul>
<li>코디네이터가 서브에이전트에 작업을 나눠 주는 구조</li>
<li>서브에이전트 역할 넷: 웹 검색, 문서 분석, 종합, 보고서 작성</li>
<li>목표: 출처가 붙은 종합 보고서</li>
</ul>
<h4>② 시스템 구성</h4>
<ul>
<li>모든 전달이 코디네이터를 거치는 구조</li>
<li>관련 영역: D1, D2, D5</li>
</ul>
<h4>③ 자주 묻는 내용</h4>
<table>
<tr><th>내용</th><th>판단 기준</th></tr>
<tr><td>결과가 이상할 때 먼저 볼 곳</td><td>코디네이터가 작업을 나눈 기록. 원인은 대개 코디네이터</td></tr>
<tr><td>서브에이전트에 정보 전달</td><td>필요한 내용을 지시문에 직접 포함. 본문과 출처 정보를 구분</td></tr>
<tr><td>병렬 실행</td><td>응답 한 번에 Agent 도구 호출 여러 개</td></tr>
<tr><td>실패 보고</td><td>실패 종류, 시도한 내용, 부분 결과, 대안. 빠진 범위 표시</td></tr>
<tr><td>출처 처리</td><td>주장마다 출처와 발행일 표시. 값이 서로 다르면 둘 다 기재</td></tr>
</table>
<h4>④ 자주 나오는 오답</h4>
<ul>
<li>서브에이전트끼리 직접 주고받게 하는 선택지</li>
<li>서로 다른 값 중 하나를 임의로 고르는 선택지</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>코디네이터(coordinator)</b>: 서브에이전트에게 일을 나눠 주고 결과를 모으는 에이전트</li>
<li><b>종합(synthesis)</b>: 여러 자료의 내용을 하나의 결론으로 모으는 일</li>
</ul>
</div>`},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S3-1: Writing the coordinator's orders",
       q:`Your coordinator's prompts to the search subagent currently read like scripts: "First query X, then query Y, then if results < 5, query Z..." On novel topics the agent follows the script even when it clearly doesn't fit. How should coordinator prompts be designed instead?`,
       opts:[
         {t:`Specify the research goal and quality criteria (coverage, source diversity, recency) and let the subagent adapt its approach to what it finds.`, ok:true},
         {t:`Write longer scripts covering more topic types so novel cases are anticipated.`},
         {t:`Remove instructions entirely — subagents perform best with maximum freedom.`},
         {t:`Have the coordinator revise the script mid-task each time results disappoint.`}],
       hint:`절차를 지시하면 그 절차를 그대로 따르고, 목표를 주면 상황에 맞춰 방법을 조정함. 가이드 1.3의 프롬프트 설계 원칙을 확인할 것.`,
       explain:{good:`1.3에 있는 내용임. 코디네이터 프롬프트에는 단계별 절차가 아니라 목표와 품질 기준을 적음. 그래야 서브에이전트가 상황에 맞게 방법을 조정할 수 있음. 절차를 그대로 적어 두면 예상하지 못한 주제에서도 맞지 않는 절차를 따르게 됨.`,
         wrongs:[`<b>B:</b> 절차를 더 길게 쓰는 것은 같은 문제를 키우는 방식임. 모든 주제 유형을 미리 나열할 수는 없음.`,`<b>C:</b> 기준 없이 맡기면 결과 품질이 매번 달라짐. 목표와 품질 기준은 필요함.`,`<b>D:</b> 매번 사람이 개입하면 위임의 목적이 사라지고 주고받는 횟수가 크게 늘어남.`]},
       principle:"절차가 아니라 목표와 기준을 지시함", ts:"1.3"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S3-2: The tempting shortcut",
       q:`An engineer proposes: "Let the synthesis agent message the search agent directly when it needs more sources — cutting the coordinator out saves a round trip." The system currently routes everything through the coordinator. What is the correct evaluation?`,
       opts:[
         {t:`Reject it: routing through the coordinator preserves observability, consistent error handling, and controlled information flow; for the frequent simple lookups, give synthesis a scoped verify_fact tool instead.`, ok:true},
         {t:`Accept it: fewer hops always means better latency, and agents coordinate fine peer-to-peer.`},
         {t:`Accept it but log the direct messages so observability is retained.`},
         {t:`Reject it and instead forbid the synthesis agent from ever needing verification.`}],
       hint:`허브 앤 스포크 구조를 쓰는 이유 세 가지와, 왕복 비용을 줄이는 처방을 함께 확인할 것.`,
       explain:{good:`1.2의 구조 원칙과 2.3의 범위를 좁힌 도구 처방을 함께 적용하는 문제임. 직접 통신은 관측성, 에러 처리의 일관성, 정보 흐름 통제를 모두 깨뜨림. 지연 문제는 구조를 바꾸지 않고 좁은 전용 도구를 주는 방식으로 해결함.`,
         wrongs:[`<b>B:</b> 통신 단계를 줄이는 이득이 구조를 깨뜨릴 근거가 되지는 않음. 문제가 생겼을 때 원인을 추적할 수 없는 시스템이 됨.`,`<b>C:</b> 로그는 사후 기록일 뿐이며, 에러 처리의 일관성과 정보 흐름 통제는 그대로 깨짐.`,`<b>D:</b> 사실 확인은 종합 작업에 원래 필요한 절차임. 이를 금지하면 리포트 품질을 포기하게 됨.`]},
       principle:"구조는 유지하고, 병목은 범위를 좁힌 도구로 해결함", ts:"1.2"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S3-3: The budget squeeze",
       q:`Your report-generation agent has a tight context budget, but upstream subagents return full reasoning chains — thousands of tokens of "I searched X, considered Y, then..." — alongside their findings. Reports are missing late-arriving findings as a result. What is the systemic fix?`,
       opts:[
         {t:`Modify the upstream agents to return structured data — key facts, citations, relevance scores — instead of verbose content and reasoning chains.`, ok:true},
         {t:`Give the report agent a larger context window allocation and keep upstream output unchanged.`},
         {t:`Have the report agent summarize each upstream payload before using it.`},
         {t:`Drop the findings from the slowest subagent to fit the budget.`}],
       hint:`다운스트림의 예산이 빠듯할 때 무엇을 고쳐야 하는지 확인할 것.`,
       explain:{good:`5.1에 있는 내용임. 다운스트림(downstream, 앞 단계의 결과를 받아 쓰는 뒤쪽 단계)의 컨텍스트 예산이 빠듯하면 업스트림(upstream, 결과를 만들어 넘기는 앞쪽 단계)이 구조화된 데이터만 반환하도록 수정함. 추론 과정 기록은 업스트림의 작업 노트이며 다운스트림의 입력이 아님.`,
         wrongs:[`<b>B:</b> 컨텍스트 할당을 늘려도 불필요한 내용의 비율은 그대로이며, 예산 잠식은 계속됨.`,`<b>C:</b> 다운스트림에서 요약하면 이미 예산을 쓴 뒤가 되며, 요약 과정의 손실까지 더해짐.`,`<b>D:</b> 조사 범위를 줄이는 방식이며 리서치의 목적을 훼손함.`]},
       principle:"구조화는 업스트림에서 함", ts:"5.1"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S3-4: Writing the honest report",
       q:`Your synthesis produced: (a) a claim supported by five independent sources, (b) a claim where two credible sources directly disagree, and (c) a subtopic where the only source was paywalled and unavailable. How should the final report present these?`,
       opts:[
         {t:`Structure the report with explicit sections: (a) under well-established findings; (b) under contested findings with both values and their source attributions; (c) flagged as a coverage gap due to source unavailability.`, ok:true},
         {t:`Include (a) and the more recent value from (b); omit (c) so the report reads cleanly.`},
         {t:`Present all three uniformly — distinguishing them injects editorial bias.`},
         {t:`Hold the report until (b) is resolved and (c)'s source becomes available.`}],
       hint:`확립된 사실, 논쟁 중인 사실, 자료 공백이라는 세 상태를 리포트에서 어떻게 구분해 표시하는지 확인할 것.`,
       explain:{good:`확립된 사실과 논쟁 중인 사실을 구분하고 충돌을 주석으로 남기는 5.6, 자료가 없는 영역을 표시하는 5.3을 함께 적용하는 문제임. 정직한 리포트는 확신 수준과 비어 있는 영역을 명시함. 독자가 근거보다 강한 확신을 갖지 않게 하기 위한 것임.`,
         wrongs:[`<b>B:</b> 더 최근 값을 임의로 고르고 자료 공백을 감추는 방식이며, 피해야 할 처리 두 가지가 겹쳐 있음.`,`<b>C:</b> 세 상태를 구분하는 것 자체가 독자에게 필요한 정보임. 균일하게 처리하면 오히려 사실이 왜곡됨.`,`<b>D:</b> 외부 사정이 해결될 때까지 리포트를 무기한 보류하는 방식임. 부분 결과를 내고 주석을 붙이는 것이 맞음.`]},
       principle:"확신 수준을 명시해서 보고함", ts:"5.6"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S3-5: The overreaching analyst",
       q:`Logs show your document-analysis subagent occasionally calls web search tools mid-analysis "to fill gaps," producing untracked sources that bypass the search agent's quality filters. The analysis agent has access to 11 tools including the full search suite. What is the right fix?`,
       opts:[
         {t:`Restrict the analysis agent's toolset to its role (document processing); when it identifies gaps, it should report them to the coordinator, which delegates additional search to the search agent.`, ok:true},
         {t:`Keep the tools but instruct the agent to prefer document analysis over searching.`},
         {t:`Let it search but require it to copy the search agent's quality filter prompt.`},
         {t:`Remove all tools from the analysis agent and route every operation through the coordinator.`}],
       hint:`역할 밖의 도구를 주면 그 도구가 쓰임. 자료의 빈 곳을 발견했을 때 누구에게 보고해야 하는지 확인할 것.`,
       explain:{good:`역할별로 도구 범위를 나누는 2.3과 코디네이터를 거치는 1.2를 함께 적용하는 문제임. 분석 에이전트가 직접 검색하면 검색 에이전트의 품질 확인 절차를 건너뛰고 출처 추적에서도 벗어남. 빈 곳을 발견하면 코디네이터에 보고하고, 코디네이터가 검색 에이전트에 위임하는 것이 구조상 맞음.`,
         wrongs:[`<b>B:</b> 도구가 남아 있으면 호출됨. 지시는 확률적이고, 접근 자체를 제거하는 방법만 결과가 일정함.`,`<b>C:</b> 프롬프트를 복사해도 검색 전문성이 옮겨지지 않으며, 역할이 섞인 상태는 그대로임.`,`<b>D:</b> 문서 처리 도구까지 회수하면 원래 맡은 일을 할 수 없음. 필요 이상으로 줄인 조치임.`]},
       principle:"원칙 ④ 역할 밖의 도구는 제거함", ts:"2.3"},
    ]},

  /* ===== 시나리오 ④ 개발자 생산성 도구 ===== */
  { id:"p6s4", ch:"④", title:"개발자 생산성 도구", scenario:"s4",
    steps:[
      {type:"concept", kind:"SCENARIO BRIEFING", h:"시나리오 ④ 개발자 생산성 도구",
   html:`<h4>① 상황</h4>
<ul>
<li>Agent SDK로 만든 개발 지원 도구</li>
<li>처음 보는 코드 탐색, 오래된 코드 이해, 반복되는 기본 코드 작성, 반복 작업 자동화</li>
</ul>
<h4>② 시스템 구성</h4>
<ul>
<li>내장 도구: Read, Write, Bash, Grep, Glob</li>
<li>MCP 서버 연결</li>
<li>관련 영역: D2, D3, D1</li>
</ul>
<h4>③ 자주 묻는 내용</h4>
<table>
<tr><th>내용</th><th>판단 기준</th></tr>
<tr><td>도구 선택</td><td>파일 이름 검색은 Glob. 파일 내용 검색은 Grep. Edit이 실패하면 Read와 Write</td></tr>
<tr><td>탐색 순서</td><td>시작 지점부터 따라가기. 전체를 먼저 읽지 않음</td></tr>
<tr><td>MCP 서버</td><td>이미 공개된 서버와 직접 만드는 서버의 구분. 도구 설명의 품질</td></tr>
<tr><td>범위가 넓은 도구</td><td>범위가 좁은 도구로 교체. 예: fetch_url 대신 load_document</td></tr>
<tr><td>범위가 정해지지 않은 작업</td><td>진행하며 나누는 방식과 Explore 서브에이전트</td></tr>
</table>
<h4>④ 자주 나오는 오답</h4>
<ul>
<li>전부 읽고 시작하는 선택지</li>
<li>알파벳 순서로 처리하는 선택지</li>
<li>공개된 서버가 있는 연결을 직접 만드는 선택지</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>코드베이스(codebase)</b>: 한 프로젝트의 코드 전체</li>
<li><b>MCP 서버</b>: Claude에 외부 도구와 자료를 제공하는 프로그램</li>
</ul>
</div>`},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S4-1: Tracing through the wrappers",
       q:`You must find every place the deprecated formatCurrency function is effectively used. The catch: three wrapper modules re-export it under different names (formatMoney, toCurrencyString, fmtC). What is the correct tracing strategy?`,
       opts:[
         {t:`First identify all exported names for the function across the wrapper modules, then Grep for each name across the codebase.`, ok:true},
         {t:`Grep only for "formatCurrency" — wrappers will show up as callers anyway.`},
         {t:`Glob for files named "*currency*" and read them.`},
         {t:`Read the entire codebase once so no usage can hide.`}],
       hint:`래퍼 모듈이 이름을 바꿔 다시 내보내면 검색해야 할 이름이 하나가 아님.`,
       explain:{good:`2.5의 래퍼 추적 패턴임. export된 모든 이름을 먼저 수집한 뒤 이름마다 전체 검색을 함. 원래 이름만 검색하면 다른 이름으로 쓰인 사용처를 전부 놓침.`,
         wrongs:[`<b>B:</b> formatMoney로 호출하는 코드는 formatCurrency 검색에 걸리지 않으며, 마이그레이션 누락이 생김.`,`<b>C:</b> 파일 이름과 함수 사용처는 관계가 없음.`,`<b>D:</b> 전체를 읽는 방식은 컨텍스트를 가득 채우는 잘못된 처리임.`]},
       principle:"이름을 모두 모은 뒤 이름마다 Grep으로 검색함", ts:"2.5"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S4-2: Build or borrow",
       q:`Your team needs two MCP integrations: (a) standard Jira issue tracking, and (b) your company's proprietary internal deployment approval system. What is the recommended sourcing decision?`,
       opts:[
         {t:`Use an existing community MCP server for Jira; build a custom server only for the proprietary approval system.`, ok:true},
         {t:`Build both in-house for consistency and full control.`},
         {t:`Use community servers for both — someone has probably built an approval-system server.`},
         {t:`Skip MCP and give the agent raw HTTP tools to call both APIs directly.`}],
       hint:`표준 연동과 팀 고유 워크플로를 가이드가 어떻게 나누는지 확인할 것.`,
       explain:{good:`2.4에 있는 내용임. Jira 같은 표준 연동은 커뮤니티 서버를 쓰고, 직접 제작은 팀 고유 워크플로에만 함. 유지보수 비용을 줄여 실제로 필요한 곳에 쓰는 판단임.`,
         wrongs:[`<b>B:</b> 이미 있는 Jira 서버를 다시 만드는 것은 유지보수 낭비임. 통제권 확보는 이 상황에서 요구된 조건이 아님.`,`<b>C:</b> 사내 전용 시스템을 대상으로 한 커뮤니티 서버는 존재할 수 없음.`,`<b>D:</b> HTTP 호출 도구를 직접 주면 MCP의 표준화, 도구 설명, 에러 구조를 모두 잃음.`]},
       principle:"표준 연동은 기존 서버를 쓰고, 고유한 것만 직접 만듦", ts:"2.4"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S4-3: The dangerous fetcher",
       q:`Your productivity agent has a generic fetch_url tool for retrieving internal documentation. Logs show it occasionally fetching arbitrary external URLs found inside code comments, once pulling content from an expired domain now serving spam. What is the best fix?`,
       opts:[
         {t:`Replace fetch_url with a constrained load_document tool that validates URLs against the internal documentation domains before fetching.`, ok:true},
         {t:`Add a system prompt rule: "only fetch internal documentation URLs."`},
         {t:`Keep fetch_url but log all fetches for weekly security review.`},
         {t:`Remove fetching entirely and paste documentation into prompts manually.`}],
       hint:`범용 도구에서 문제가 생겼을 때의 처방은 지시 추가가 아님. 도구 자체를 어떻게 하는지 확인할 것.`,
       explain:{good:`2.3이 제시한 패턴 그대로임. 범용 도구를 범위가 제한된 대안으로 교체함. fetch_url을 URL을 검증하는 load_document로 바꾸는 방식임. 도구의 동작 규격 수준에서 막으면 항상 같은 결과가 나옴.`,
         wrongs:[`<b>B:</b> 지시는 확률적이며, 주석에 적힌 URL을 다시 가져오는 일이 반복됨.`,`<b>C:</b> 사후 로그 검토는 이미 스팸 내용을 읽은 뒤의 조치이며 예방이 아님.`,`<b>D:</b> 자동화를 포기하는 방식이며 필요 이상으로 줄인 조치임.`]},
       principle:"범용 도구는 범위가 제한된 대안으로 교체함", ts:"2.3"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S4-4: The adaptive generator",
       q:`"Generate boilerplate CRUD code for every entity in this legacy system" — but entities are scattered, some use inheritance patterns, and several have undocumented interdependencies you'll only discover mid-task. Which decomposition fits?`,
       opts:[
         {t:`Dynamic decomposition: map the entity structure first, identify groups and dependencies, build a prioritized plan, and adapt it as interdependencies surface.`, ok:true},
         {t:`A fixed pipeline: list entities alphabetically and generate CRUD for each in order.`},
         {t:`Generate everything in one large pass so all entities share context.`},
         {t:`Ask the user to document all interdependencies first, then run a fixed plan.`}],
       hint:`작업 중에야 발견되는 의존성이라는 조건이 어떤 분해 방식을 가리키는지 확인할 것.`,
       explain:{good:`1.6의 내용임. 중간에 발견한 사실이 다음 할 일을 결정하는 과제는 동적 분해에 해당함. 구조를 먼저 파악하고, 우선순위를 정하고, 새로 발견한 내용에 따라 계획을 조정함.`,
         wrongs:[`<b>B:</b> 알파벳 순서 처리는 의존성을 무시함. 상속 관계의 부모보다 자식을 먼저 생성하면 코드가 동작하지 않음.`,`<b>C:</b> 한 번에 전부 처리하면 모델의 주의가 분산되고 컨텍스트 한계에 부딪힘.`,`<b>D:</b> 문서화가 되어 있지 않다는 것이 이 과제의 전제임. 문서화를 먼저 요구하는 것은 과제를 되돌려보내는 것이며 수행이 아님.`]},
       principle:"발견이 계획을 바꾸는 과제에는 동적 분해를 씀", ts:"1.6"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S4-5: The catalog play",
       q:`Every session, your agent spends its first several turns calling list_schemas, list_tables, and describe_table to rediscover the same database structure before answering the actual question. The structure changes maybe once a month. What MCP capability fixes this efficiently?`,
       opts:[
         {t:`Expose the database schema as an MCP resource — a content catalog visible to the agent without exploratory tool calls.`, ok:true},
         {t:`Cache the discovery calls' results in the system prompt and update the prompt monthly by hand.`},
         {t:`Create a run_all_discovery tool that batches the three calls into one.`},
         {t:`Accept the cost — discovery calls guarantee freshness every session.`}],
       hint:`행동을 실행하는 것이 아니라 무엇이 있는지 보여 주는 기능이 필요한 상황임. MCP의 어떤 기능인지 확인할 것.`,
       explain:{good:`2.4의 내용임. 리소스는 스키마나 문서 계층 같은 콘텐츠 목록을 보여 주는 기능이며, 무엇이 있는지 확인하려는 도구 호출 자체가 사라짐. 도구는 행동을 실행하고 리소스는 목록을 제공한다는 역할 구분임.`,
         wrongs:[`<b>B:</b> 사람이 직접 갱신하는 방식은 누락되기 쉬우며, 누락되면 낡은 스키마를 근거로 추론하게 됨.`,`<b>C:</b> 호출 세 번을 하나로 묶어도 매 세션의 탐색 비용은 그대로 남음.`,`<b>D:</b> 한 달에 한 번 바뀌는 정보를 매 세션 다시 조회하는 것은 최신성 확보가 아니라 낭비임.`]},
       principle:"콘텐츠 목록은 리소스로 제공함", ts:"2.4"},
    ]},

  /* ===== 시나리오 ⑤ CI/CD 통합 ===== */
  { id:"p6s5", ch:"⑤", title:"Claude Code CI/CD 통합", scenario:"s5",
    steps:[
      {type:"concept", kind:"SCENARIO BRIEFING", h:"시나리오 ⑤ Claude Code CI/CD 통합",
   html:`<h4>① 상황</h4>
<ul>
<li>CI/CD 파이프라인에 Claude Code를 연결한 상황</li>
<li>자동 코드 리뷰, 테스트 작성, PR 의견 작성</li>
<li>목표: 바로 반영할 수 있는 의견과 낮은 오탐 비율</li>
</ul>
<h4>② 시스템 구성</h4>
<ul>
<li>사람 없이 실행하는 옵션 -p</li>
<li>출력 형식 옵션: --output-format json, --json-schema</li>
<li>CLAUDE.md로 프로젝트 정보 제공</li>
<li>관련 영역: D3, D4</li>
</ul>
<h4>③ 자주 묻는 내용</h4>
<table>
<tr><th>내용</th><th>판단 기준</th></tr>
<tr><td>실행 옵션</td><td>실제로 있는 옵션과 없는 옵션의 구분. CLAUDE_HEADLESS와 --batch는 없는 옵션</td></tr>
<tr><td>오탐 대응</td><td>종류별 기준 명시. 오탐이 많은 종류는 잠시 끄고 기준 수정</td></tr>
<tr><td>리뷰 구조</td><td>코드를 만든 세션과 리뷰하는 세션 분리</td></tr>
<tr><td>큰 PR</td><td>파일별 검토와 전체 검토를 나눠 실행</td></tr>
<tr><td>처리 방식</td><td>병합 전에 결과가 필요한 작업은 일반 요청. 밤에 실행하는 작업은 배치</td></tr>
</table>
<h4>④ 자주 나오는 오답</h4>
<ul>
<li>같은 세션에 자기 코드를 리뷰시키는 선택지</li>
<li>오탐이 많을 때 지시문에 신중하라고만 추가하는 선택지</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>CI/CD 파이프라인</b>: 코드가 올라올 때마다 검사, 테스트, 배포를 자동으로 실행하는 장치</li>
<li><b>PR(pull request)</b>: 코드 변경을 합쳐 달라고 올리는 요청</li>
<li><b>오탐</b>: 문제가 아닌 것을 문제라고 잘못 알리는 일</li>
</ul>
</div>`},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S5-1: Generator, meet reviewer",
       q:`Your pipeline stage generates a code patch with Claude, then — in the same session — appends "now review your patch carefully for bugs before we merge." Post-merge defect rates are no better than having no review at all. What is the structural explanation and fix?`,
       opts:[
         {t:`The session retains its generation reasoning and won't genuinely question its own decisions; run the review as a separate pipeline step with an independent Claude instance that receives only the patch and review criteria.`, ok:true},
         {t:`The review instruction is too soft — demand it "find at least five issues."`},
         {t:`Reviews need extended thinking enabled to reach sufficient depth.`},
         {t:`Merge timing is the issue — run the same-session review twice with a delay.`}],
       hint:`세션에 남아 있는 무엇이 자기 비판을 막았는지 확인할 것. 지시 강도의 문제가 아님.`,
       explain:{good:`4.6과 3.6의 세션 격리 원칙임. 생성 과정의 맥락이 남아 있는 세션은 자신이 내린 결정을 옹호하게 됨. CI에서는 리뷰를 별도 스텝으로 분리하고, 독립 인스턴스에 패치와 리뷰 기준만 전달함.`,
         wrongs:[`<b>B:</b> 지적 개수를 강제하면 억지로 만든 오탐이 늘어나며 신뢰가 더 빨리 떨어짐.`,`<b>C:</b> 같은 맥락 안에서 더 깊이 생각하게 하면 자기 결정을 더 정교하게 옹호하게 됨.`,`<b>D:</b> 시간을 두거나 반복해도 같은 세션에 남은 편향은 사라지지 않음.`]},
       principle:"생성과 리뷰는 서로 다른 세션에서 함", ts:"4.6"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S5-2: The severity lottery",
       q:`Your CI review bot's severity labels gate merges (critical blocks, minor doesn't). Developers found identical hardcoded-credential findings labeled critical on Monday and minor on Thursday, and now dispute every blocked merge. The prompt defines severities in one abstract sentence each. What is the fix?`,
       opts:[
         {t:`Define each severity level with explicit criteria and concrete code examples (e.g., hardcoded credentials → critical, with a sample), so identical issues classify identically.`, ok:true},
         {t:`Let developers vote on severity when they disagree with the bot.`},
         {t:`Remove severity levels and block merges on any finding.`},
         {t:`Average severity across three review runs to smooth the variance.`}],
       hint:`serious problems 같은 추상적인 정의가 분류가 흔들리는 원인임. 정의에 무엇을 덧붙여야 일관되는지 확인할 것.`,
       explain:{good:`4.1의 내용임. 심각도 분류의 일관성은 레벨별 명시 기준과 구체적인 코드 예시에서 나옴. 머지를 막는 게이트 역할일수록 같은 사안이 같은 등급으로 분류되어야 신뢰가 유지됨.`,
         wrongs:[`<b>B:</b> 투표로 정하는 것은 분류 체계를 포기하는 방식이며, 자동 리뷰를 두는 이유가 사라짐.`,`<b>C:</b> 모든 지적에 머지를 막으면 minor 등급 오탐 하나에도 팀 전체가 멈춤. 과한 조치임.`,`<b>D:</b> 3회 평균은 비용을 3배로 쓰면서 비일관성을 가리기만 함.`]},
       principle:"게이트의 기준은 구체적 예시와 함께 정의함", ts:"4.1"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S5-3: Splitting the workload",
       q:`Your CI runs two Claude workloads: (1) a security check that must pass before any merge, and (2) generation of candidate test cases for yesterday's merged code, reviewed by developers each morning. Costs are high. Which architecture is correct?`,
       opts:[
         {t:`Keep the security check on the synchronous API (blocking, needs immediate results); move the nightly test generation to the Message Batches API for the 50% savings, correlating results by custom_id.`, ok:true},
         {t:`Move both to the Batches API and poll aggressively so the security check rarely waits long.`},
         {t:`Move both to the synchronous API — reliability matters more than cost.`},
         {t:`Alternate weekly between APIs and compare bills.`}],
       hint:`둘 중 하나만 사람이 결과를 기다림. 배치 처리를 쓸 수 있는 조건이 무엇인지 확인할 것.`,
       explain:{good:`4.5의 분류를 적용하는 문제임. 머지를 막는 검사는 결과를 곧바로 받아야 하므로 실시간 API를 쓰고, 야간 테스트 생성은 기다릴 수 있으므로 배치 API를 씀. 비용이 절반으로 줄어드는 이득은 기다릴 수 있는 작업에서만 얻을 수 있음.`,
         wrongs:[`<b>B:</b> 오래 기다리는 경우가 드물다는 것은 보장 조건이 아님. 24시간이 걸리는 사례 하나로 팀 전체가 멈춤.`,`<b>C:</b> 야간 작업에 실시간 단가를 지불하는 것은 낭비이며, 신뢰성과는 관계가 없음.`,`<b>D:</b> 주 단위로 번갈아 쓰는 방식은 이미 판단 기준이 정해진 문제에 실험 비용을 지불하는 것임.`]},
       principle:"결과를 기다려야 하는지 여부가 API를 정함", ts:"4.5"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S5-4: The malformed comments",
       q:`Your pipeline parses Claude's review output to post inline PR comments. About 15% of runs fail parsing: the model returns prose intros ("Here are the issues I found..."), inconsistent field names, or unquoted strings. You already use -p. What completes the setup?`,
       opts:[
         {t:`Add --output-format json with --json-schema defining the findings structure, so output is machine-parseable and schema-conforming instead of free-form text.`, ok:true},
         {t:`Post-process the output with regex to strip prose and normalize field names.`},
         {t:`Add a prompt instruction: "respond with valid JSON only, no commentary."`},
         {t:`Retry failed runs until they happen to produce parseable output.`}],
       hint:`-p는 비대화형 실행만 지정함. 출력 형태를 강제하는 플래그 조합이 따로 있음.`,
       explain:{good:`3.6의 구조화된 출력 플래그임. --output-format json과 --json-schema가 출력 형태를 강제함. 프롬프트로 요청하는 것이 아니라 규격으로 고정하는 방식이며, 15%에서 발생하던 형식 오류가 사라짐.`,
         wrongs:[`<b>B:</b> 정규식 후처리는 필드 이름이 바뀔 때마다 다시 깨지며, 같은 문제가 계속 다른 형태로 나타남.`,`<b>C:</b> 지시는 확률적임. 85%는 지시 없이도 성공했고 문제는 나머지 15%임.`,`<b>D:</b> 될 때까지 재시도하는 방식은 비용만 쓰면서 결과가 매번 달라지는 상태를 그대로 두는 것임.`]},
       principle:"출력 형태는 플래그로 고정함", ts:"3.6"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S5-5: Rebuilding trust",
       q:`Developer trust in your review bot collapsed: its "code duplication" category has an 85% false-positive rate (it flags idiomatic test setup as duplication), and devs now dismiss even its accurate security findings. What is the correct recovery sequence?`,
       opts:[
         {t:`Temporarily disable the duplication category to restore trust in the remaining categories; improve its prompt with explicit criteria and contrast examples (idiomatic setup vs real duplication); re-enable only after it passes on a labeled test set.`, ok:true},
         {t:`Keep all categories on but add a banner asking developers to bear with the bot while it improves.`},
         {t:`Delete the duplication category permanently and expand the security category to compensate.`},
         {t:`Reset trust by renaming the bot and relaunching it with identical behavior.`}],
       hint:`오탐이 많은 범주 하나가 전체 신뢰를 떨어뜨렸을 때의 3단계 처방을 확인할 것. 비활성화, 개선, 검증의 순서임.`,
       explain:{good:`4.1의 신뢰 복구 절차임. 문제가 있는 범주를 일시 비활성화하고, 명시 기준과 대비되는 예시 쌍으로 개선하고, 라벨이 붙은 데이터로 검증한 뒤 다시 활성화함. 신뢰는 측정 결과로 회복함.`,
         wrongs:[`<b>B:</b> 오탐을 계속 내보내면서 양해를 구하면 신뢰가 더 빨리 떨어짐.`,`<b>C:</b> 범주를 영구 삭제하면 개선 가능성을 확인하지도 않고 그 기능의 가치를 포기하게 됨.`,`<b>D:</b> 동작이 같은 상태에서 이름만 바꾼 것임. 첫 오탐에서 드러나고 신뢰는 더 크게 떨어짐.`]},
       principle:"비활성화한 뒤 개선하고, 검증한 뒤 다시 켬", ts:"4.1"},
    ]},

  /* ===== 시나리오 ⑥ 구조화 데이터 추출 ===== */
  { id:"p6s6", ch:"⑥", title:"구조화 데이터 추출", scenario:"s6",
    steps:[
      {type:"concept", kind:"SCENARIO BRIEFING", h:"시나리오 ⑥ 구조화 데이터 추출",
   html:`<h4>① 상황</h4>
<ul>
<li>형식이 정해지지 않은 문서에서 정보를 뽑아 JSON 스키마로 검증</li>
<li>추출 결과를 회계 시스템이나 데이터베이스 같은 다음 시스템에 전달</li>
</ul>
<h4>② 시스템 구성</h4>
<ul>
<li>구조화된 출력과 JSON 스키마</li>
<li>프로그램 검증, 배치 처리, 사람 검토로 보내는 기준</li>
<li>관련 영역: D4, D5</li>
</ul>
<h4>③ 자주 묻는 내용</h4>
<table>
<tr><th>내용</th><th>판단 기준</th></tr>
<tr><td>필수 항목인데 문서에 정보가 없는 경우</td><td>Claude가 값을 지어냄. 빈 값 허용으로 해결</td></tr>
<tr><td>정해진 값 중 하나를 고르는 항목</td><td>other와 상세 설명, unclear를 함께 제공</td></tr>
<tr><td>재시도</td><td>형식 오류에는 효과 있음. 문서에 정보가 없으면 효과 없음</td></tr>
<tr><td>정확도 확인</td><td>전체 평균만 보면 놓치는 문서 종류가 생김. 종류별로 나눠 확인</td></tr>
<tr><td>신뢰도 점수</td><td>보정한 뒤에만 사람 검토 기준으로 사용</td></tr>
</table>
<h4>④ 자주 나오는 오답</h4>
<ul>
<li>엄격한 스키마 하나로 모두 해결된다는 선택지. 형식이 맞는 것과 값이 맞는 것은 다른 문제</li>
<li>조건 없이 재시도하는 선택지</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>JSON 스키마</b>: 출력에 들어갈 항목과 값의 종류를 정해 둔 양식</li>
<li><b>보정(calibration)</b>: 정답이 붙은 자료로 신뢰도 수치와 실제 정답률을 맞추는 작업</li>
</ul>
</div>`},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S6-1: The invented signatory",
       q:`Your contract extractor's schema requires counterparty_signatory (the person who signed for the other party). For unsigned draft contracts — which have no signatory at all — the model outputs plausible executive names pulled from the letterhead. What is the correct fix?`,
       opts:[
         {t:`Make counterparty_signatory nullable so drafts return null, and add a document_status field (enum: signed/draft/unclear) so downstream systems know why.`, ok:true},
         {t:`Add a prompt warning: "do not guess signatories under any circumstances."`},
         {t:`Filter out extracted names that also appear in the letterhead.`},
         {t:`Route all contracts to human review since extraction can't be trusted.`}],
       hint:`초안 계약서에는 서명자가 존재하지 않음. 필수 필드로 지정된 스키마가 값이 없는 상황에서 어떻게 동작했는지 확인할 것.`,
       explain:{good:`4.3의 nullable 원칙과 enum 상태 필드를 함께 적용하는 문제임. 스키마가 null을 허용해야 없는 값을 지어내는 동작이 멈춤. 상태 필드는 다운스트림이 그 null이 어떤 상황에서 나온 값인지 알게 해 줌.`,
         wrongs:[`<b>B:</b> 스키마 구조가 값을 요구하는 상황을 지시로 막으려는 방식이며, 결과가 확률적이라 위반이 남음.`,`<b>C:</b> 레터헤드 밖에서 지어낸 이름은 그대로 통과함. 문제의 일부 경로만 막는 조치임.`,`<b>D:</b> 전량을 사람 리뷰로 보내는 것은 자동화를 포기하는 방식임. 스키마 수정으로 해결되는 문제임.`]},
       principle:"값이 없을 수 있는 필드는 nullable로 두고 상태 필드를 함께 둠", ts:"4.3"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S6-2: Which failures to retry",
       q:`Overnight extraction results: 312 documents failed Pydantic validation with type errors (dates as strings); 89 returned null for tax_registration_number, which your auditors confirmed only exists in separate registry documents; 23 have line items that don't sum to stated totals. What is the correct triage?`,
       opts:[
         {t:`Retry the 312 with error feedback (format errors are fixable from the source); don't retry the 89 (information absent — route for registry lookup or accept null); flag the 23 via calculated-vs-stated comparison fields for review, since the source data itself may conflict.`, ok:true},
         {t:`Retry all 424 failures with error feedback — retries are cheap relative to manual work.`},
         {t:`Retry nothing; all three groups indicate the model is unfit for this document type.`},
         {t:`Retry the 89 with higher temperature so the model searches more creatively.`}],
       hint:`세 그룹의 실패 원인이 각각 다름. 형식 오류, 정보 부재, 원본 자료의 모순이며 각각에 맞는 처방을 연결할 것.`,
       explain:{good:`4.4의 실패 분류 처리임. 형식 오류에만 재시도가 통하고, 정보 부재는 몇 번을 다시 돌려도 값이 나오지 않으며, 합계 불일치는 계산값과 기재값을 비교하는 자체 점검 필드로 드러내 사람이 확인해야 함.`,
         wrongs:[`<b>B:</b> 89건 재시도는 낭비이며 없는 값을 지어내게 만듦. 존재하지 않는 정보를 계속 요구하는 방식임.`,`<b>C:</b> 312건은 재시도로 해결되는 실패임. 전체를 포기하는 것은 과한 조치임.`,`<b>D:</b> temperature를 올려 더 다양하게 찾게 하는 것은 값을 지어내라고 요구하는 것과 같음.`]},
       principle:"실패 원인별로 다른 경로로 처리함", ts:"4.4"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S6-3: The calibration step",
       q:`You want to auto-approve extractions the model is confident about and route the rest to reviewers. The model outputs a confidence score per field. A pilot shows fields marked 0.9+ confidence are actually correct only 78% of the time. What must happen before confidence-based routing goes live?`,
       opts:[
         {t:`Calibrate the scores against a labeled validation set — map raw model confidence to observed accuracy, and set routing thresholds on the calibrated values.`, ok:true},
         {t:`Raise the auto-approval threshold from 0.9 to 0.95 to be safe.`},
         {t:`Ask the model to be more honest about its confidence in the prompt.`},
         {t:`Abandon confidence routing and review a random 20% instead.`}],
       hint:`모델이 0.9라고 보고했지만 실제 정확도는 78%임. 이 차이를 메우는 작업의 이름을 확인할 것.`,
       explain:{good:`5.5의 보정 원칙임. 모델이 스스로 보고한 점수는 실제 정확도보다 높게 나오는 경향이 있음. 라벨이 붙은 검증 세트로 모델의 0.9가 실제 정확도 몇 퍼센트에 해당하는지 측정하고, 그 실측값을 기준으로 임계값을 정해야 안전함.`,
         wrongs:[`<b>B:</b> 보정 없이 임계값만 올리면 실제 정확도가 얼마인지 모르는 상태는 그대로임.`,`<b>C:</b> 더 정직하게 답하라는 요청으로는 실측 정확도와의 차이를 측정할 수 없음.`,`<b>D:</b> 무작위 20% 검토는 위험이 높은 건에 자원을 집중하지 못하며, 라우팅보다 효과가 낮음.`]},
       principle:"신뢰도는 보정을 거친 뒤에만 기준으로 씀", ts:"5.5"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S6-4: The missing dimension",
       q:`Your extraction pipeline reports 96% overall field accuracy. A month after auto-approving high-confidence extractions, Finance discovers that handwritten-annotation invoices — 4% of volume — have a 61% error rate that was invisible in the aggregate. Which two practices would have caught this before and after launch?`,
       opts:[
         {t:`Before launch: validate accuracy segmented by document type and field, not just in aggregate. After launch: stratified random sampling of auto-approved extractions to continuously measure error rates and catch novel patterns.`, ok:true},
         {t:`Before: raise the overall accuracy bar to 99%. After: wait for downstream teams to report anomalies.`},
         {t:`Before: double the validation set size. After: re-run the same validation set quarterly.`},
         {t:`Before and after: trust field-level confidence scores to surface problem documents.`}],
       hint:`전체 평균에 가려진 4%를 찾아내는 방법 두 가지를 확인할 것. 출시 전에 쓰는 것 하나, 출시 후에 쓰는 것 하나임.`,
       explain:{good:`5.5의 두 가지 방법임. 출시 전에는 세그먼트별로 나눠 정확도를 검증하고, 출시 후에는 층화 표집으로 계속 감시함. 96%라는 전체 평균 아래에 정확도 61%인 구간이 가려지는 것이 집계 지표만 볼 때 생기는 문제임.`,
         wrongs:[`<b>B:</b> 99%도 여전히 전체 평균이며 같은 문제가 그대로 남음. 다운스트림 팀의 신고를 기다리는 것은 가장 늦은 대응임.`,`<b>C:</b> 같은 검증 세트를 키우고 반복해도 손글씨 같은 신규 유형은 그 세트에 들어 있지 않음.`,`<b>D:</b> 보정하지 않은 신뢰도 점수는 낯선 문서 유형에서 오히려 실제보다 높게 나옴. 앞 문항 S6-3에서 확인한 내용임.`]},
       principle:"평균을 세그먼트로 나누고 표본으로 감시함", ts:"5.5"},
      {type:"quiz", kind:"PRACTICE · 시나리오 실전", h:"S6-5: Format chaos",
       q:`Source invoices write dates as "3/4/25", "April 3, 2025", and "2025-04-03", and amounts as "1.234,56 €" or "$1,234.56". Your schema stores dates as ISO 8601 and amounts as numeric USD-normalized values. Extraction output is structurally valid but values are inconsistently normalized. What does the guide prescribe?`,
       opts:[
         {t:`Include explicit format-normalization rules in the prompt alongside the strict output schema — the schema enforces structure, the rules govern how varied source formats map into it.`, ok:true},
         {t:`Loosen the schema to accept dates and amounts as raw strings, normalizing later in code.`},
         {t:`Reject documents whose formats differ from ISO 8601 at intake.`},
         {t:`Run a second model pass that re-normalizes the first pass's output.`}],
       hint:`스키마는 출력의 형태만 강제함. 형식이 제각각인 원본을 그 형태에 어떻게 옮길지를 어디에 적는지 확인할 것.`,
       explain:{good:`4.3에 있는 내용임. 정규화 규칙을 스키마와 함께 프롬프트에 넣음. 스키마는 구조를 정하고 규칙은 변환 방법을 정하므로 역할이 다름. 둘이 함께 있어야 일관된 값이 나옴.`,
         wrongs:[`<b>B:</b> 원본 문자열을 그대로 받으면 구조화의 목적이 사라짐. 코드로 정규화하면 April 3 같은 표기의 온갖 변형을 직접 처리해야 함.`,`<b>C:</b> 실제로 들어오는 문서를 거부하면 파이프라인이 처리할 대상이 남지 않음.`,`<b>D:</b> 두 번 처리하는 비용이 들고, 첫 패스에서 값이 모호해진 경우는 두 번째 패스에서도 복구되지 않음.`]},
       principle:"스키마와 정규화 규칙을 함께 전달함", ts:"4.3"},
    ]},
  ]
};
