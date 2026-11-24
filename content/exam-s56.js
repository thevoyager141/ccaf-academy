/* ============================================================
   exam-s56.js: 모의고사 문항 풀 확대. 시나리오 ⑤ CI/CD 통합(s5), ⑥ 구조화 데이터 추출(s6)
   2026-08-28 작성. exam-bank.js, p3-plus.js, gap-fix.js 뒤에 로드함. 기존 문항은 수정하지 않고 추가만 함.

   목적
     s5 풀 28 → 46, s6 풀 26 → 44. 두 번 응시해도 같은 문장이 반복되지 않도록 함.
     두 시나리오 모두 여러 설정 수단 중 하나를 고르는 형태로 출제되며,
     수단 사이의 차이를 모르면 정답률이 크게 떨어지는 세부목표를 겨냥함.

   문항 형식 (시나리오당 18문항)
     선택 비교형 10 · 부정형(NOT/LEAST/EXCEPT) 4 · 복수응답(multi:2, 보기 5개) 4

   ts 분포
     s5: D1 3 (1.4/1.5/1.7) · D2 2 (2.4/2.5) · D3 7 (3.1/3.2/3.3/3.4/3.6×3) · D4 4 (4.1/4.2/4.4/4.6) · D5 2 (5.3/5.5)
     s6: D1 2 (1.2/1.6) · D2 2 (2.1/2.2) · D3 1 (3.5) · D4 10 (4.3×7/4.4/4.5×2) · D5 3 (5.2/5.3/5.6)

   사실 근거: 2026-08-28 WebFetch로 직접 확인한 공식 문서
     https://code.claude.com/docs/en/cli-reference
       · --print/-p, --output-format (text|json|stream-json), --json-schema (print 모드 전용)
       · --permission-mode (default|acceptEdits|plan|auto|dontAsk|bypassPermissions|manual)
       · --allowedTools (승인을 묻지 않고 실행할 목록) / --disallowedTools (거부) / --tools (도구 목록 자체를 좁힘)
       · --max-turns (에이전트 턴 상한, print 전용) / --max-budget-usd (금액 상한, 서브에이전트 지출 합산,
         한도 도달 시 새 서브에이전트 생성이 Budget limit reached 로 실패, print 전용)
       · -c/--continue (이 디렉토리의 가장 최근 대화) / -r/--resume (ID·이름 지정) / --fork-session (재개 시 새 ID)
       · --bare = hooks·skills·custom commands·subagents·plugins·MCP servers·auto memory·CLAUDE.md 자동 탐색 건너뜀
     https://code.claude.com/docs/en/permission-modes
       · claude -p 로 시작한 세션의 내장 기본 모드는 default(Manual)
       · dontAsk = 프롬프트가 뜰 상황을 전부 자동 거부. permissions.allow 규칙 · 읽기 전용 Bash 명령 ·
         PreToolUse 훅이 승인한 것만 실행. "the session never waits for input"
       · bypassPermissions = 전부 통과, "Isolated containers and VMs only"
       · "Deny rules block in every mode, including bypassPermissions. Allow rules have no effect in bypassPermissions."
       · 재개한 세션은 --permission-mode 를 다시 주지 않으면 원래 모드를 유지함
     https://code.claude.com/docs/en/permissions
       · "Permission rules are enforced by Claude Code, not by the model. Instructions in your prompt or
         CLAUDE.md shape what Claude tries to do, but they don't change what Claude Code allows."
       · Read/Edit deny 규칙은 Claude의 파일 도구와 Claude Code가 인식하는 파일 명령(cat/head/tail/sed)에 적용되고,
         파일을 직접 여는 임의의 하위 프로세스(파이썬·노드 스크립트)에는 적용되지 않음 → OS 수준 차단은 sandbox
       · PreToolUse 훅은 권한 프롬프트 앞에서 실행되고 deny/ask/skip-prompt 를 반환할 수 있음.
         훅 결정이 deny 규칙을 우회하지는 못하고, exit code 2 로 막는 훅은 allow 규칙보다 우선
     https://code.claude.com/docs/en/skills
       · 커스텀 커맨드는 스킬로 통합됨. SKILL.md frontmatter 의 allowed-tools 는
         "Tools Claude can use without asking permission during the turn that invokes this skill".
         사전 승인이지 제한이 아니며, 다음 메시지를 보내면 해제됨. 도구를 제외하는 것은 disallowed-tools 가 담당함
       · disable-model-invocation: true 로 사용자 호출 전용으로 만들 수 있음. context: fork 는 서브에이전트 컨텍스트
     https://platform.claude.com/docs/en/build-with-claude/structured-outputs
       · strict tool use (strict: true) = "Guarantee schema validation on tool names and inputs" (문법 제약 샘플링)
       · JSON outputs (output_config.format) = 응답 텍스트 자체를 스키마에 맞춘 JSON으로. 필드 타입·필수 필드 보장
       · 사용 가능 모델 표기: 모든 모델 (2026-11-23 확인)
       · minimum/maximum/minLength/maxLength 같은 제약은 직접 지원되지 않음 →
         "Update descriptions with constraint info ... The original constraints are still validated in your code"
       · "Structured outputs don't guarantee the capitalization of string enum and const values ...
         Compare enum values case-insensitively"
       · Message Prefilling: Incompatible with JSON outputs
     https://platform.claude.com/docs/en/build-with-claude/batch-processing
       · 50% 할인 · 24시간 상한(초과 시 만료) · 결과 순서 보장 없음 →
         "always use the custom_id field" · 결과는 생성 후 29일간 이용 가능
     https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
       (#migrating-away-from-prefilled-responses): 4.6 계열, Mythos Preview는 마지막 assistant 턴 프리필 미지원(400)

   문서에서 확인되지 않은 플래그·값·동작은 문항에 넣지 않음.
   ============================================================ */
(function(){
  if(window.__CCAF_EXAM_S56__) return; window.__CCAF_EXAM_S56__ = true;
  if(!window.CCAF_EXAM_EXTRA) window.CCAF_EXAM_EXTRA = [];

  window.CCAF_EXAM_EXTRA.push(

  /* ================================================================
     시나리오 ⑤: Claude Code CI/CD 통합 (18문항)
     ================================================================ */

  /* --- s5-1 · 3.6 · 선택 비교형 --- */
  {scenario:"s5", ts:"3.6",
   q:`A nightly repository-wide review runs unattended. One run last week cost $61: the transcript shows nine subagents spawned, several of which each walked the same package tree three or four times. The finance owner wants a hard ceiling on what any single run can spend. The platform owner objects that capping the number of agentic turns already covers it, and that adding a second limit is redundant. Which change actually enforces the finance owner's requirement?`,
   opts:[
     {t:`Add the print-mode dollar ceiling: spend from subagents counts toward it, and once the cap is reached the run stops rather than spawning another subagent.`, ok:true},
     {t:`Add the agentic-turn cap instead — a run that cannot take more turns cannot spend more, so the two controls are equivalent in effect.`},
     {t:`Have the CI platform kill the job at a wall-clock limit chosen so that a run cannot get expensive before it is stopped.`},
     {t:`Narrow the tool list so the reviewer cannot walk package trees at all, which removes the expensive behavior at its source.`}],
   explain:{
     good:`금액 상한은 금액 기준으로만 적용됨. print 모드의 예산 한도는 서브에이전트(subagent)가 사용한 금액까지 합산하며, 한도에 도달하면 새 서브에이전트 생성이 그 자리에서 실패함. 턴 수와 금액은 서로 다른 기준이므로 하나가 다른 하나를 대신하지 못함.`,
     wrongs:[
       `<b>B(턴 상한으로 대체):</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 턴 상한은 무한 루프에 맞는 처방이지만, 지문의 사고는 한 턴 안에서 서브에이전트 아홉 개가 각각 비용을 사용한 형태임. 허용된 턴 안에서도 청구 금액은 얼마든지 커질 수 있음.`,
       `<b>C(벽시계 타임아웃):</b> 외부에서 프로세스를 중단하면 진행 중이던 턴이 미완으로 남아 결과가 기록되지 않음. 비용은 이미 발생한 뒤이고 리뷰 결과만 손실됨.`,
       `<b>D(도구 목록 축소):</b> 반복 탐색은 줄지만 "어떤 실행도 이 금액을 넘지 않는다"는 보장이 되지 않음. 리뷰가 읽어야 할 파일까지 읽지 못하게 되는 손실도 있음.`]},
   principle:"횟수 상한과 금액 상한은 서로 다른 기준임"},

  /* --- s5-2 · 3.6 · 부정형 EXCEPT --- */
  {scenario:"s5", ts:"3.6",
   q:`Your CI reviewer behaves differently on three runner images: one host has an MCP server configured on it, another carries a plugin somebody installed six months ago, the third has neither. A teammate proposes adding the minimal-startup flag to every invocation so all three start identically. Adding that flag would deliver all of the following EXCEPT:`,
   opts:[
     {t:`The conventions the team committed to the repository still reach the reviewer, since they travel with the code rather than with the runner image.`, ok:true},
     {t:`Host-installed MCP servers are no longer discovered, so a server present on only one image cannot change that image's findings.`},
     {t:`Plugins and subagents are not auto-discovered, which removes the stale-plugin difference between the images.`},
     {t:`Hooks and skills are not auto-discovered, so something left on one runner cannot silently alter that runner's review.`}],
   explain:{
     good:`이 플래그가 건너뛰는 항목에 프로젝트 메모리 파일과 자동 메모리가 함께 포함됨. 러너 간 차이는 확실히 제거되지만, 저장소에 커밋해 둔 팀 표준도 함께 로드되지 않는 것이 대가임. 재현성과 표준 로드를 맞바꾸는 선택이므로, 지문이 "리뷰가 팀 컨벤션을 반영해야 한다"고 요구하는 순간 이 플래그는 오답이 됨.`,
     wrongs:[
       `<b>B(MCP 서버 미탐색):</b> 자동 탐색 대상 목록에 MCP 서버가 포함되어 있으므로 사실임. 이미지별 차이를 제거하는 데 정확히 기여함.`,
       `<b>C(플러그인과 서브에이전트 미탐색):</b> 둘 다 목록에 있으므로 사실임. 6개월 전에 설치된 플러그인 문제가 이 플래그로 사라짐.`,
       `<b>D(훅과 스킬 미탐색):</b> 역시 목록에 포함됨. 러너에 남아 있던 훅(hook)이 결과를 바꾸는 일이 없어짐.`]},
   principle:"재현성을 얻는 대가로 팀 표준 로드를 잃음"},

  /* --- s5-3 · 3.6 · 선택 비교형 --- */
  {scenario:"s5", ts:"3.6",
   q:`The review step runs on a shared build host that also serves other teams. Two symptoms this sprint: two runs sat at an approval request until the 60-minute job timeout killed them, and one run created a branch nobody asked for. Security states that a mode which skips checks is not acceptable on a host this size. Which configuration fits?`,
   opts:[
     {t:`Start the run in the mode that auto-denies anything not pre-approved, pre-approve only the read and diff commands the review needs, and commit deny rules for branch- and push-shaped commands so they are refused whatever mode a later edit picks.`, ok:true},
     {t:`Start the run in the mode that skips every permission check — both symptoms vanish at once, and the workspace is rebuilt between jobs anyway.`},
     {t:`Start the run in the mode that accepts edits without asking, and open the review prompt with a line forbidding the reviewer from creating branches.`},
     {t:`Keep the starting mode as it is and raise the job timeout to three hours, so an approval request has time to be answered by whoever is on call.`}],
   explain:{
     good:`세 계층이 각각 다른 역할을 함. 권한 모드(permission mode)는 미리 허용한 것만 실행한다는 기본 동작을 정하고 승인 대기를 없앰. 허용 목록은 그 미리 허용한 범위를 좁힘. 커밋된 거부 규칙은 어떤 모드에서도 실행을 막음. 브랜치 생성처럼 절대 허용하면 안 되는 동작은 세 번째 계층에 두어야 나중에 누가 모드를 바꿔도 유지됨.`,
     wrongs:[
       `<b>B(검사 전체 건너뛰기):</b> 증상은 사라지지만 보안 요건을 정면으로 위반함. 공식 문서도 이 모드를 격리된 컨테이너와 VM 전용으로 명시하고 있으며, 공유 빌드 호스트는 그 조건에 해당하지 않음.`,
       `<b>C(편집 자동 수락과 프롬프트 금지문):</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 편집 관련 프롬프트는 줄지만 그 밖의 승인 대기는 그대로 남음. 프롬프트 문장은 무엇이 허용되는지를 바꾸지 못함. 권한은 모델이 아니라 실행 계층이 집행하기 때문임.`,
       `<b>D(타임아웃 연장):</b> 답할 사람이 없어서 멈춘 상황인데 대기 시간만 세 배로 늘리는 것임. 브랜치 생성 문제도 해결되지 않음.`]},
   principle:"권한 모드, 허용 목록, 거부 규칙의 세 계층"},

  /* --- s5-4 · 3.1 · 선택 비교형 --- */
  {scenario:"s5", ts:"3.1",
   q:`Two complaints about the same CI reviewer land in the same retro. (1) It never mentions the team's error-envelope convention, which lives on a wiki page linked from the pull-request template. (2) It has twice run a script that rewrites lockfiles, which the release engineer says must never happen from CI. Which pairing of mechanisms is correct?`,
   opts:[
     {t:`Move the convention into the repository's always-loaded project memory so every run reads it, and express the lockfile prohibition as a committed deny rule — a written convention shapes what the reviewer attempts, while only a rule decides what it may actually do.`, ok:true},
     {t:`Put both into the project memory file, one as a convention and one as a firmly worded prohibition, so a single reviewed file governs the reviewer end to end.`},
     {t:`Leave the convention on the wiki and have the reviewer fetch that page at the start of each run, and forbid the lockfile script with a line at the top of the review prompt.`},
     {t:`Express both as a path-scoped rule file that loads whenever lockfiles or handler files appear in the diff.`}],
   explain:{
     good:`지시와 집행은 다른 계층임. 공식 문서가 권한 규칙은 모델이 아니라 Claude Code가 집행하고 프롬프트나 프로젝트 메모리의 지시는 무엇이 허용되는지를 바꾸지 않는다고 명시함. 컨벤션처럼 어겨도 사고가 나지 않는 내용은 상시 로드되는 문서에 두고, 절대 허용하면 안 되는 실행은 거부 규칙에 둘 것. 성격에 따라 계층을 나눠야 함.`,
     wrongs:[
       `<b>B(둘 다 프로젝트 메모리로):</b> 절반만 맞아서 고르기 쉬운 선택지임. 컨벤션은 정확한 처방이지만 금지를 문장으로 적어두는 것은 확률적 유도일 뿐 집행이 아님. 두 번째 사고가 다시 발생함.`,
       `<b>C(위키 fetch와 프롬프트 금지문):</b> 매 실행이 외부 페이지 접근에 의존하게 되고, 위키가 코드와 함께 버전 관리되지 않아 내용이 어긋남. 금지 부분은 B와 같은 이유로 효과가 없음.`,
       `<b>D(경로 규칙 하나로):</b> 경로 규칙은 특정 파일을 편집할 때 컨벤션을 함께 로드하는 조건부 규칙(conditional rules)임. 오류 응답 규약은 diff에 락파일이 있든 없든 매번 필요하고, 실행 금지는 규칙 파일이 담당하는 일이 아님.`]},
   principle:"지시는 유도이고 권한 규칙은 집행임"},

  /* --- s5-5 · 3.3 · 선택 비교형 --- */
  {scenario:"s5", ts:"3.3",
   q:`Your CI reviewer's output must always end with a three-line summary block that the merge-queue bot parses — on every pull request, whatever changed. A teammate proposes a rule file whose frontmatter declares a path pattern matching every file in the repository, arguing that this keeps all conventions in one consistent place. What is wrong with that, and what fits?`,
   opts:[
     {t:`A pattern that matches everything is a conditional mechanism doing an unconditional job. The requirement applies to every run, so it belongs in the always-loaded project memory; path-scoped rule files exist precisely to keep conventions out of context when they are irrelevant.`, ok:true},
     {t:`Nothing is wrong. A catch-all pattern is how a rule file is made unconditional, and keeping every convention in rule files is easier to audit than splitting them across two mechanisms.`},
     {t:`The requirement belongs in a skill, so the summary format is loaded at the moment the reviewer needs it instead of sitting in context all session.`},
     {t:`Put it in the CI workflow file and append it to the prompt at invocation time, so interactive sessions are not burdened with a rule that only the merge bot cares about.`}],
   explain:{
     good:`경로 규칙의 존재 이유는 무관할 때 로드하지 않는 것임. 매번 적용되는 내용에 전체 매칭 글롭을 씌우면 설정만 늘고 얻는 것이 없음. 판단 기준은 하나임. 매번 필요하면 상시 로드, 특정 파일을 편집할 때만 필요하면 경로 규칙임.`,
     wrongs:[
       `<b>B(전체 매칭이 정석):</b> 일관성이라는 근거가 그럴듯해 고르기 쉬운 선택지임. 조건부 로딩 장치를 조건 없이 쓰는 것은 일관성이 아니라 오용이며, 읽는 사람에게 이것이 언제 적용되는지를 한 번 더 확인하게 만듦.`,
       `<b>C(스킬로 전환):</b> 스킬 본문은 호출될 때 로드됨. 매 실행에 반드시 있어야 하는 출력 규약을 호출 여부에 맡기는 것임.`,
       `<b>D(워크플로 파일에서 프롬프트에 추가):</b> 규약이 코드와 함께 버전 관리되지 않고 파이프라인 설정에만 존재하게 됨. 대화형 세션에서 같은 리뷰를 실행하면 형식이 달라지고, 그 차이가 머지 봇에게는 파싱 실패로 나타남.`]},
   principle:"매번 필요하면 상시 로드, 가끔 필요하면 조건부 로드"},

  /* --- s5-6 · 3.2 · 선택 비교형 --- */
  {scenario:"s5", ts:"3.2",
   q:`The team wants a repeatable four-step release audit — read the changelog, diff the migration files, check the version manifest, emit a verdict — runnable identically by a developer typing a command and by the CI job. Compliance adds one requirement: the audit must be unable to write anything. A teammate proposes packaging it as a skill and listing only the read tools in the skill's allowed-tools frontmatter "so it is read-only by construction." What is right and what is wrong in that proposal?`,
   opts:[
     {t:`Packaging it as a skill is right, but that frontmatter field pre-approves the listed tools rather than withdrawing the others — the read-only property has to come from the permission layer, such as committed deny rules or a run that denies everything outside a pre-approved list.`, ok:true},
     {t:`Both halves are right — naming only the read tools in that field removes the remaining tools from the session for as long as the skill is active, which is exactly the guarantee compliance asked for.`},
     {t:`Neither half is right — a procedure that must run identically in two places belongs in the always-loaded project memory, and the write prohibition belongs in the review prompt.`},
     {t:`Packaging it as a skill is wrong, because a skill's body loads only when it is invoked, which makes the CI run's starting context differ from the developer's.`}],
   explain:{
     good:`필드 이름이 오해를 부르지만, 그 필드는 이 도구들은 승인을 묻지 않고 사용해도 된다는 사전 승인임. 나머지를 사용하지 못하게 하는 제한이 아니며, 다음 메시지를 보내면 승인도 해제됨. 도구를 실제로 제외하는 것은 별도 필드이고, 절대 사용할 수 없다는 보장은 권한 계층에서 나와야 함. 반복 절차를 하나로 묶는 수단으로 스킬을 고른 것 자체는 맞음.`,
     wrongs:[
       `<b>B(목록에 없으면 사용 불가):</b> 필드 이름만 보면 그렇게 읽히므로 가장 많이 선택되는 오답임. 허용 목록은 승인이지 제한이 아니며, 제한은 이름이 다른 필드가 담당함.`,
       `<b>C(프로젝트 메모리로):</b> 상시 로드되는 문서는 항상 적용되는 사실을 두는 위치임. 호출해서 실행하는 다단계 절차를 여기에 넣으면 매 대화가 그 본문을 함께 로드하게 됨.`,
       `<b>D(스킬은 CI에 부적합):</b> 지연 로딩은 설계 의도이지 결함이 아님. 사람이 호출하든 파이프라인이 호출하든 같은 이름으로 부르면 같은 본문이 로드됨.`]},
   principle:"허용 목록은 사전 승인이지 제한이 아님"},

  /* --- s5-7 · 3.4 · 선택 비교형 --- */
  {scenario:"s5", ts:"3.4",
   q:`Leadership wants the CI reviewer to stop commenting and start fixing: for every pull request it should produce the remediation itself. The work spans dependency bumps, a config migration whose three candidate approaches were argued about in the design channel last week, and occasional schema edits. The pipeline runs at 3am with nobody watching. An architect proposes running the step in plan mode "so the approach is approved before anything gets edited." Evaluate.`,
   opts:[
     {t:`Plan mode holds edits until a plan is approved, and at 3am there is nobody to approve one — the step would stall by design. Split it instead: an unattended stage that produces the proposed change as a reviewable artifact, and a later stage that applies it only after a person approves.`, ok:true},
     {t:`Plan mode is the right call — the approval it waits for is supplied by the pull-request review the team does the next morning, so the human gate is already in place.`},
     {t:`Drop the staging and let the step edit directly. The pull-request review is itself the human gate, and the changes are mechanical enough that a plan adds a step without adding safety.`},
     {t:`Run the step in plan mode but add an instruction stating that the plan is always accepted, which keeps the review framing without the wait.`}],
   explain:{
     good:`두 조건이 동시에 성립해서 답이 결정됨. 접근 방법이 여럿 경합하는 작업이므로 바로 실행하면 위험하고, 세션 안에서 승인을 기다리는 모드를 무인 파이프라인에 적용하면 아침까지 멈춰 있음. 그래서 승인 지점을 세션 밖으로 옮김. 무인 단계는 제안을 산출물로 남기고, 사람이 승인한 뒤 다른 단계가 적용함.`,
     wrongs:[
       `<b>B(PR 리뷰가 그 승인):</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. PR 리뷰가 사람의 승인 지점인 것은 맞지만, 계획 승인은 그 세션 안에서 받는 것이므로 아침까지 잡이 대기 상태로 남음. 승인 지점이 있다는 사실과 그 지점이 어디에 있느냐는 다른 문제임.`,
       `<b>C(바로 실행):</b> 지문이 세 가지 접근을 두고 논의했다고 명시함. 유효한 접근이 여럿이면 결정이 먼저이고, 사후 리뷰는 이미 한쪽으로 결정된 결과물을 보게 됨.`,
       `<b>D(계획 자동 승인):</b> 승인을 지시문으로 대신하는 것은 승인 지점을 없애고 이름만 남기는 것임. 세션 안에서 사람이 판단하는 자리를 프롬프트 문장이 채우지 못함.`]},
   principle:"승인할 사람이 없으면 승인 지점을 세션 밖으로 옮김"},

  /* --- s5-8 · 1.5 · 복수응답 --- */
  {scenario:"s5", ts:"1.5", multi:2,
   q:`A committed deny rule keeps the reviewer's file tools away from infra/secrets/. An audit still finds that directory's contents in a review transcript: the reviewer ran a short Python command that opened the files itself. Separately, the team wants every shell command the reviewer runs to be checked against an internal domain allowlist before it executes. Which TWO measures address these correctly? (Select TWO.)`,
   opts:[
     {t:`Turn on OS-level sandboxing for the shell tool, since file deny rules cover the assistant's own file tools and the file commands Claude Code recognizes, not an arbitrary subprocess that opens files on its own.`, ok:true},
     {t:`Register a PreToolUse hook that inspects each shell command and returns a denial when a disallowed domain appears, since that hook runs ahead of the permission decision on every tool call.`, ok:true},
     {t:`Record the secrets directory in the project memory file as off limits, which covers every route the model might take to it, including a subprocess.`},
     {t:`Move the existing deny rule from the project settings file into managed settings, which extends its reach to subprocesses the assistant starts.`},
     {t:`Add a hook that runs after each tool call and redacts secret-shaped strings from the transcript, so the audit finding cannot recur.`}],
   explain:{
     good:`두 요구가 서로 다른 계층에 해당함. 파일 거부 규칙은 어시스턴트의 파일 도구와 Claude Code가 인식하는 파일 명령까지 적용됨. 파이썬 스크립트가 파일을 직접 여는 것은 그 범위 밖이므로 OS 수준 차단이 필요함. 그리고 실행 전에 판단이 필요하면 권한 결정 앞에서 실행되는 훅(hook)이 그 역할을 함.`,
     wrongs:[
       `<b>C(프로젝트 메모리에 금지 명시):</b> 문서의 문장은 모델이 시도하는 내용을 바꿀 뿐 허용 여부를 바꾸지 않음. 하위 프로세스는 그 문장을 읽지도 않음.`,
       `<b>D(관리 설정으로 승격):</b> 규칙의 우선순위와 적용 범위에 대한 조치이므로 그럴듯하지만, 규칙이 적용되는 대상 자체는 그대로임. 하위 프로세스가 파일을 여는 경로는 여전히 열려 있음.`,
       `<b>E(사후 마스킹):</b> 이미 읽은 뒤에 기록만 지우는 것임. 감사 로그는 깨끗해지고 유출은 그대로 남으므로 오히려 더 나쁨.`]},
   principle:"권한 규칙이 미치지 않는 곳은 OS 차단, 실행 전 판단은 훅"},

  /* --- s5-9 · 1.7 · 복수응답 --- */
  {scenario:"s5", ts:"1.7", multi:2,
   q:`A release pipeline fires three unattended review runs in parallel, one per open pull request, and stores each run's JSON payload. The next morning two follow-ups are needed. For PR #812: ask a clarifying question about one of its findings. For PR #799: act on its findings — but that branch has since been rebased onto a release branch that moved the module layout, and eleven of the fourteen files it reviewed were rewritten. Which TWO handling choices are correct? (Select TWO.)`,
   opts:[
     {t:`For #812, address that run by the session identifier its stored payload already recorded, rather than picking up whichever conversation happens to be the most recent one in the directory.`, ok:true},
     {t:`For #799, start a fresh session seeded with a structured summary of the earlier findings, because the tool results that run reasoned from no longer describe the branch.`, ok:true},
     {t:`For #799, resume the run and tell it which files changed, since resuming and re-analyzing a few files always costs less than rebuilding the context from nothing.`},
     {t:`For #812, continue the most recent conversation in the directory — the three payloads sit side by side, so the latest one is the one being asked about.`},
     {t:`For both, replay the original prompts in new sessions, which avoids identifier bookkeeping and reproduces reviews that were cheap to run in the first place.`}],
   explain:{
     good:`두 가지를 따로 판단해야 함. 병렬로 세 세션이 실행됐다면 가장 최근이라는 기준으로는 지정할 수 없으므로 저장해 둔 식별자로 그 세션을 직접 지정해야 함. 그 사이 코드가 크게 바뀐 쪽은 낡은 도구 결과(tool result) 위에서 추론하지 않도록 새로 시작하되 결론만 구조화 요약으로 전달해야 함. 판단 기준은 그 사이 무엇이 바뀌었는가임.`,
     wrongs:[
       `<b>C(이어가면서 바뀐 파일만 통보):</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 일부만 바뀌고 맥락이 대체로 유효할 때는 이 방법이 정답임. 그러나 지문은 리베이스로 열네 개 중 열한 개가 재작성된 상황이므로, 이어받은 도구 결과 대부분이 더 이상 사실이 아님.`,
       `<b>D(가장 최근 대화 이어가기):</b> 세 세션이 언제 끝날지 통제할 수 없으므로 어느 것이 가장 최근인지도 통제할 수 없음. 나란히 저장되어 있다는 사실이 순서를 알려주지는 않음.`,
       `<b>E(전부 새로 재실행):</b> 후속 질문 하나 때문에 리뷰 세 건을 다시 실행하는 비용도 문제이고, #812의 findings가 나온 맥락이 재현된다는 보장도 없음.`]},
   principle:"병렬 실행이면 식별자로 지정하고 내용이 낡았으면 요약을 주입함"},

  /* --- s5-10 · 1.4 · 선택 비교형 --- */
  {scenario:"s5", ts:"1.4",
   q:`Your CI reviewer opens a ticket for the on-call security engineer whenever it finds a credential-shaped literal. The engineers call the tickets useless: each holds the finding sentence and a link to the pipeline run, and the run's logs have expired by the time anyone looks. Three of the last nine were closed as "cannot reproduce." What should the handoff carry?`,
   opts:[
     {t:`A self-contained record written at escalation time — the file and revision the literal sits at, the surrounding evidence, why the reviewer judged it a credential, and the recommended action — because the receiving engineer has no access to the conversation the finding came from.`, ok:true},
     {t:`A link to the review session, so the engineer can pick that conversation back up and ask the reviewer directly what it meant.`},
     {t:`The complete review transcript attached to the ticket, so that nothing is lost to summarization and the engineer can read the reasoning in full.`},
     {t:`A confidence value on every finding, so engineers can skip the doubtful ones and stop spending time on tickets that will not reproduce.`}],
   explain:{
     good:`인계는 받는 사람이 대화 기록에 접근하지 못한다는 전제로 작성해야 함. 무엇이, 어디서, 왜 그렇게 판단됐고, 무엇을 해야 하는지가 티켓 안에서 모두 읽혀야 티켓이 단독으로 성립함. 링크와 로그는 만료되며, 만료되는 것에 의존하면 지금과 같은 재현 불가 상태가 발생함.`,
     wrongs:[
       `<b>B(세션 링크):</b> 담당자가 그 세션을 열 수 있다는 보장이 없고, 열더라도 그 사이 브랜치가 변경됐다면 낡은 맥락을 받게 됨. 인계 내용을 상대가 직접 찾아오게 만드는 구조임.`,
       `<b>C(전체 기록 첨부):</b> 완결성 측면에서는 맞는 말이라 고르기 쉬움. 그러나 온콜 담당자가 새벽에 열어야 할 것은 요약이지 전체 기록이 아님. 로그 만료라는 원인도 그대로 남음.`,
       `<b>D(신뢰도 점수):</b> 티켓 수를 줄이는 데는 유용함. 그러나 지문의 병목은 분량이 아니라 열어봐도 판단할 재료가 없다는 점이고, 점수는 그 재료를 만들어 주지 않음.`]},
   principle:"인계 문서는 단독으로 성립해야 함"},

  /* --- s5-11 · 2.5 · 선택 비교형 --- */
  {scenario:"s5", ts:"2.5",
   q:`The reviewer is supposed to look only at what a pull request changed, but its findings keep citing files the pull request never touched. The prompt currently says "review the changes on this branch," and the session has the standard read tools plus a broad shell allowance. Which change actually scopes it?`,
   opts:[
     {t:`Have the pipeline compute the changed-file list with a narrowly pre-approved version-control command and pass that list into the prompt, then let the reviewer read only those paths — no file-search tool can know what a revision changed.`, ok:true},
     {t:`Swap the shell allowance for the pattern-matching file finder, which is the purpose-built tool for selecting a subset of files and keeps the session from running arbitrary commands.`},
     {t:`Add a prompt line saying to comment only on files that appear in the diff, which costs nothing and needs no pipeline change.`},
     {t:`Search the repository for the pull request's ticket number so that only files referencing that work item enter the review.`}],
   explain:{
     good:`무엇이 바뀌었는가는 파일 이름 패턴으로도 내용 검색으로도 알 수 없는 사실임. 버전 관리 시스템만 아는 정보이므로, 좁게 허용한 명령으로 변경 목록을 먼저 추출해 프롬프트에 전달해야 함. 읽기 도구는 그 목록을 받은 다음에야 제 역할을 함. 도구 선택 문제와 권한 설계가 한 문제에서 만나는 지점임.`,
     wrongs:[
       `<b>B(패턴 매칭 파일 탐색으로 교체):</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 파일 집합을 고르는 데 맞는 도구인 것은 사실이지만, 그 도구가 고르는 기준은 이름 패턴이지 변경 여부가 아님. 범위 문제는 그대로 남음.`,
       `<b>C(프롬프트 한 줄 추가):</b> 현재 프롬프트에 이미 비슷한 문장이 있는데도 증상이 발생하고 있음. 모델에게 주어지지 않은 정보를 문장으로 요구하는 것임.`,
       `<b>D(티켓 번호 검색):</b> 코드에 티켓 번호를 적어 두는 관행이 있어야 성립하고, 있더라도 새로 추가된 파일은 검색되지 않음. 우연에 의존하는 범위 설정임.`]},
   principle:"무엇이 바뀌었는지는 파일 도구가 알 수 없는 정보임"},

  /* --- s5-12 · 2.4 · 부정형 NOT --- */
  {scenario:"s5", ts:"2.4",
   q:`The reviewer should cite the acceptance criteria from each pull request's linked issue-tracker ticket. The team configured an MCP server for the tracker and it works in interactive sessions on developer machines. In CI the citations never appear. Which measure would NOT get them working?`,
   opts:[
     {t:`Write the acceptance criteria into the repository's project memory file so the reviewer always has them loaded.`, ok:true},
     {t:`Configure the tracker's MCP server in a settings file committed to the repository, so the runner discovers it the way the laptops do.`},
     {t:`Remove the minimal-startup flag from the CI invocation, which is currently skipping MCP server auto-discovery.`},
     {t:`Give the runner the credentials the server needs, since the laptops authenticate with a developer token that CI does not hold.`}],
   explain:{
     good:`상시 로드되는 프로젝트 문서는 매번 참인 사실을 담는 위치임. 수용 기준은 티켓마다 다르고 PR마다 바뀌는 건별 정보이므로 그 문서로는 채울 수 없음. 채우려면 매 PR마다 커밋해야 하는데, 그것이 바로 도구 연동으로 해결하려던 문제임. 나머지 셋은 모두 CI에서만 연동이 안 되는 실제 원인을 하나씩 지적함.`,
     wrongs:[
       `<b>B(커밋된 설정으로 서버 등록):</b> 랩톱에만 설정되어 있으면 러너는 서버의 존재를 알 수 없음. 저장소에 넣으면 러너도 같은 설정을 참조함.`,
       `<b>C(최소 시작 플래그 제거):</b> 그 플래그가 건너뛰는 항목에 MCP 서버가 포함됨. CI에서만 동작하지 않는 증상의 전형적인 원인임.`,
       `<b>D(러너 자격 증명):</b> 서버가 있어도 인증이 되지 않으면 결과가 오지 않음. 랩톱은 개발자 토큰으로 접속하는데 CI에는 그 토큰이 없는 상황이 흔함.`]},
   principle:"상시 로드 문서로는 건별 정보를 담을 수 없음"},

  /* --- s5-13 · 4.1 · 선택 비교형 --- */
  {scenario:"s5", ts:"4.1",
   q:`Two review categories, one prompt. Security must never miss string concatenation into a SQL statement, and the team explicitly accepts noise in that category. Style findings, by contrast, are dismissed nine times out of ten, and developers want them gone unless they are near-certain. The prompt currently ends with a single global line: "be conservative and report only issues you are confident about." What should replace it?`,
   opts:[
     {t:`Category-specific criteria: for security, spell out the code shapes that must be reported even when the reviewer is unsure; for style, spell out the narrow conditions under which a style finding is worth raising at all. One global confidence sentence cannot hold two opposite tolerances.`, ok:true},
     {t:`Keep the global line and strengthen it to "report only issues you are highly confident about," which is the shortest change and directly attacks the dismissal rate.`},
     {t:`Split the work into two pipeline steps that share the same prompt, so security and style findings can be counted and tracked separately.`},
     {t:`Have the reviewer attach a confidence number to each finding and let the merge bot drop style findings below a threshold.`}],
   explain:{
     good:`한 문장으로 서로 반대 방향의 허용 기준을 담을 수 없음. 놓치면 손실이 큰 범주는 이 형태이면 확신이 없어도 보고하도록, 오탐이 많은 범주는 이 조건을 모두 만족할 때만 보고하도록 기준을 범주별로 따로 작성해야 두 요구가 동시에 성립함. 전역 문장 하나는 반드시 한쪽 요구를 어김.`,
     wrongs:[
       `<b>B(전역 기준을 더 보수적으로):</b> 스타일 관련 오탐은 확실히 줄어듦. 그러나 지문이 절대 놓치면 안 된다고 명시한 보안 재현율도 함께 줄어듦. 지문 조건을 정면으로 위반하는 선택지임.`,
       `<b>C(단계 분리):</b> 집계와 추적에는 유용하지만 프롬프트가 같으면 동작은 그대로임. 나뉜 것은 보고서이지 판단 기준이 아님.`,
       `<b>D(신뢰도 임계값):</b> 보정되지 않은 자기 보고 점수 위에 판정 기준을 얹는 것이며, 보안 쪽 재현율 문제는 해결하지 못함. 스타일 한쪽만 겨냥한 처방임.`]},
   principle:"허용 기준이 다르면 판단 기준도 범주별로 작성함"},

  /* --- s5-14 · 4.2 · 복수응답 --- */
  {scenario:"s5", ts:"4.2", multi:2,
   q:`To cut false positives the team added twelve worked examples to the review prompt, all drawn from the authentication module because that is where the worst false positives were. Since then: auth false positives are down by half, findings in the payments and reporting modules have dropped to almost nothing, and the reviewer has started describing unrelated code in authentication vocabulary. Which TWO changes address this? (Select TWO.)`,
   opts:[
     {t:`Rebalance the example set so it spans the modules and finding categories the reviewer actually covers, instead of only the module that prompted the change.`, ok:true},
     {t:`Rewrite the examples around the finding category rather than one module's identifiers, file names and domain nouns, so what generalizes is the rule and not the setting.`, ok:true},
     {t:`Remove the examples and go back to written criteria, since a skewed example set does more damage than none at all.`},
     {t:`Raise the count of authentication examples from twelve to thirty, so the intended pattern is demonstrated precisely enough to stop leaking into other modules.`},
     {t:`Move the examples into the project memory file so they load on every run rather than only inside the review prompt.`}],
   explain:{
     good:`두 증상이 같은 원인을 가리킴. 예시가 한 모듈에 몰려 있으면 그 모듈 밖은 예시가 없는 영역이 되어 다른 모듈의 findings가 나오지 않음. 예시에 그 모듈의 고유명사가 많이 포함되면 규칙 대신 배경이 학습되어 엉뚱한 코드를 인증 관련 표현으로 서술함. 대표성과 일반성 두 가지를 함께 수정해야 함.`,
     wrongs:[
       `<b>C(예시 제거):</b> 예시가 편향의 원인이라는 진단까지는 맞지만 처방이 과함. 예시 구성을 조정하면 되는 문제를 예시 자체를 없애서 해결하려는 것임.`,
       `<b>D(인증 예시 증량):</b> 한쪽으로 치우친 원인을 그 방향으로 더 강화함. 증상 세 가지가 모두 악화됨.`,
       `<b>E(프로젝트 메모리로 이동):</b> 로드되는 위치만 바뀔 뿐 예시 구성은 그대로임. 게다가 리뷰용 예시 열두 개가 모든 대화에 상시 로드됨.`]},
   principle:"예시는 대표성과 일반성 두 가지를 함께 봄"},

  /* --- s5-15 · 4.4 · 선택 비교형 --- */
  {scenario:"s5", ts:"4.4",
   q:`The review step's structured output fails schema validation on about 6% of runs. The pipeline retries the whole step up to five times with an identical prompt; most failures still fail all five times, and the step's cost has tripled. Inspection shows two distinct shapes: findings whose severity value falls outside the allowed set, and findings naming a file path that is not in the diff the step was given. What is the right handling?`,
   opts:[
     {t:`Retry only the first shape, appending the specific validation error and the offending value so the correction has something to act on, and bound the attempts; treat the second shape as a content defect no retry can repair and drop or route those findings instead.`, ok:true},
     {t:`Keep retrying both shapes but append the validator's full stack trace, so the reviewer can see exactly what broke and correct it on the next attempt.`},
     {t:`Raise the retry ceiling from five to ten, since the failures are intermittent and a longer ladder will clear most of them.`},
     {t:`Drop schema validation and have the merge bot ignore any finding it cannot parse, which removes the retry cost entirely.`}],
   explain:{
     good:`재시도는 고칠 재료가 있는 실패에만 의미가 있음. 허용 값 밖의 심각도는 무엇이 왜 틀렸는지 알려주면 수정되는 형식 오류임. diff에 없는 경로를 지목한 것은 자료 자체의 문제이므로 같은 입력으로 몇 번을 실행해도 같은 답이 옴. 비용이 세 배가 된 이유가 정확히 두 번째 유형을 다섯 번씩 재시도한 것임.`,
     wrongs:[
       `<b>B(스택 트레이스 첨부):</b> 피드백을 붙인다는 방향은 맞아서 고르기 쉬움. 그러나 스택 트레이스는 검증기 내부 정보이므로 어느 필드의 어떤 값이 문제인지 알려주지 않고, 두 번째 유형은 여전히 수정되지 않음.`,
       `<b>C(재시도 상한 상향):</b> 지문이 다섯 번 모두 실패한다고 명시함. 열 번이면 열 번 모두 실패하고 비용만 두 배가 됨.`,
       `<b>D(검증 제거):</b> 파싱되지 않는 findings를 그냥 버리게 되는데, 그중에 실제 보안 발견이 섞여 있어도 아무도 알 수 없게 됨.`]},
   principle:"재시도는 고칠 재료가 있을 때만 효과가 있음"},

  /* --- s5-16 · 4.6 · 부정형 NOT --- */
  {scenario:"s5", ts:"4.6",
   q:`Three independent review instances run over every pull request and the pipeline posts the union of their findings. Developers now see the same issue up to three times in different wording and have started skimming. A teammate proposes replacing the union with a majority vote — keep only findings that at least two of the three reported. Which statement about that proposal is NOT correct?`,
   opts:[
     {t:`Majority voting is the standard way to consolidate multiple review passes, since agreement between independent instances is what makes a finding trustworthy.`, ok:true},
     {t:`Majority voting would discard findings that only one instance caught, which is exactly the recall the extra passes were paid for.`},
     {t:`The duplication is a presentation problem — one issue reported three times is still one issue, and merging findings by location and identity fixes it without dropping anything.`},
     {t:`A finding one instance raised and two missed can still be real, so agreement is evidence about confidence rather than a test of correctness.`}],
   explain:{
     good:`부정형 문항임. A는 정석처럼 보이도록 작성되어 있어 암기로 접근하면 그대로 지나치게 되지만, 다수결이 리뷰 합의의 표준이라는 근거는 어디에도 없음. 인스턴스를 여럿 두는 이유는 서로 다른 것을 찾아내게 하려는 것이고, 그렇게 찾아낸 것을 다수결로 걸러내면 인스턴스를 늘린 이유가 사라짐. 중복은 표시 방식의 문제이므로 병합으로 해결하면 됨.`,
     wrongs:[
       `<b>B(하나만 찾은 항목 폐기):</b> 다수결의 실제 손실을 정확히 지적함. 독립 검토를 늘려 얻은 재현율이 그 지점에서 사라짐.`,
       `<b>C(중복은 표시 문제):</b> 위치와 이슈 종류로 묶으면 하나로 표시되고 아무것도 버리지 않음. 증상에 맞는 처방임.`,
       `<b>D(합의는 확신의 근거):</b> 셋 다 놓치는 경우도, 하나만 찾아내는 경우도 실제로 발생함. 합의는 정답 판정 장치가 아님.`]},
   principle:"다수결은 재현율을 떨어뜨림"},

  /* --- s5-17 · 5.5 · 복수응답 --- */
  {scenario:"s5", ts:"5.5", multi:2,
   q:`Findings labeled critical block merges. Last quarter's data: critical findings are correct 88% of the time; the two engineers who arbitrate disputes handle about 30 blocked merges a week and say half their time goes to findings that turn out correct but trivial to fix. Leadership wants fewer blocked merges without giving up the security value. Which TWO changes fit? (Select TWO.)`,
   opts:[
     {t:`Block only on the categories where a missed issue is expensive and let the rest post as advisory comments, so blocking capacity is spent where blocking is worth its cost.`, ok:true},
     {t:`Separate the blocked merges by whether they need a judgment call: attach the concrete fix to the mechanical ones so the author clears them alone, and send only the disputed ones to the arbitrators.`, ok:true},
     {t:`Raise the bar for the critical label so fewer findings qualify — at 88% precision, roughly one block in eight is unjustified, and tightening the label removes those.`},
     {t:`Stop blocking altogether and rely on the advisory comments plus the human code review the team already does.`},
     {t:`Have the arbitrators handle a random sample of blocked merges and auto-approve the remainder, which cuts the queue by whatever fraction the team chooses.`}],
   explain:{
     good:`병목이 두 갈래임. 하나는 차단할 필요가 없는 범주까지 차단하고 있다는 것이고, 다른 하나는 차단된 것 중 절반은 사람의 판단이 필요 없는 건이라는 것임. 앞의 것은 차단 대상 범위를 좁혀서, 뒤의 것은 사람이 필요한 건과 아닌 건을 나눠서 해결함. 두 조치 모두 보안 가치를 훼손하지 않고 차단 건수를 줄임.`,
     wrongs:[
       `<b>C(critical 기준 상향):</b> 88%라는 수치가 붙어 있어 데이터 기반처럼 읽히지만 이 문제의 조건에서는 틀린 선택지임. 정밀도와 심각도는 다른 기준이고, 라벨 기준을 올리면 오탐과 함께 실제 critical도 함께 제외됨. 지문이 지키라고 한 가치가 바로 그것임.`,
       `<b>D(차단 폐지):</b> 보안 가치를 잃지 않으면서라는 조건을 정면으로 위반함.`,
       `<b>E(무작위 표본만 심사):</b> 나머지를 자동 승인하는 순간 검사 지점이 아니라 무작위 추출이 됨. 무엇을 통과시켰는지도 알 수 없게 됨.`]},
   principle:"차단할 가치가 있는 범위만 차단함"},

  /* --- s5-18 · 5.3 · 부정형 NOT --- */
  {scenario:"s5", ts:"5.3",
   q:`The pipeline's coordinator delegates a dependency audit, a coverage pass, and a license scan. Last Thursday the license scanner's data source was down and its subagent returned "unable to complete license scan." The coordinator's report went out as "No issues found - 3 checks passed," and a package with a disallowed license shipped. Which of the following is NOT part of a correct fix?`,
   opts:[
     {t:`Have the coordinator retry the failed check until it succeeds, so a report is only ever produced from three completed checks.`, ok:true},
     {t:`Require each subagent to return a structured result that separates "checked, found nothing" from "could not check," so the coordinator cannot read a failure as a pass.`},
     {t:`Have the coordinator report per-check status instead of one aggregate verdict, so a missing check is visible in the output the merge gate reads.`},
     {t:`Make the merge gate treat an incomplete check as not passing rather than as passing, so an outage cannot open the gate.`}],
   explain:{
     good:`사고의 원인은 실패를 통과로 처리한 것임. 실패와 무결과를 구분해 보고하고, 상태를 항목별로 보고하고, 게이트가 미완료를 통과로 처리하지 않게 하면 같은 사고가 재발하지 않음. 외부 장애 앞에서 성공할 때까지 재시도하는 것은 파이프라인을 계속 대기시킬 뿐 보고의 정확성과는 관계가 없음. 데이터 소스가 하루 종일 응답하지 않으면 작업이 끝나지 않음.`,
     wrongs:[
       `<b>B(구조화 결과로 구분):</b> 확인했으나 없음과 확인하지 못함이 같은 값으로 오면 코디네이터가 구분할 방법이 없음. 여기가 근본 원인임.`,
       `<b>C(항목별 상태 보고):</b> 집계 한 줄이 실패를 가렸음. 체크별로 상태가 보이면 머지 게이트도 사람도 누락을 확인할 수 있음.`,
       `<b>D(미완료는 통과가 아님):</b> 게이트의 기본값을 안전한 쪽으로 두는 조치임. 장애가 게이트를 통과시키는 일이 구조적으로 사라짐.`]},
   principle:"실패와 무결과는 다른 값임"},


  /* ================================================================
     시나리오 ⑥: 구조화 데이터 추출 (18문항)
     ================================================================ */

  /* --- s6-1 · 4.3 · 선택 비교형 --- */
  {scenario:"s6", ts:"4.3",
   q:`Besides the 22-field record it loads into the warehouse, the extraction service has to produce a one-page reviewer memo: a fixed section order, one plain-language paragraph per risk, and the client's mandated phrasing for hedged statements. An engineer proposes adding a memo string field to the extraction tool's schema, so that both outputs come back guaranteed-valid in a single call. Evaluate.`,
   opts:[
     {t:`A schema can guarantee that a memo string is present and typed and nothing about its section order, paragraph structure or phrasing — those live outside what a JSON Schema expresses. Keep the record on the schema-constrained path and produce the memo with explicit format instructions plus a check-and-retry loop.`, ok:true},
     {t:`The proposal is right: putting the memo in the schema is what makes both outputs enforceable in one call, and the section order and phrasing rules go into that field's description.`},
     {t:`Produce both with format instructions in a single prompt — running one enforced path and one unenforced path in the same service costs more to maintain than it buys.`},
     {t:`Prefill the assistant turn with the memo's first section heading so the ordering is anchored from the start, and keep the record on the schema path.`}],
   explain:{
     good:`스키마가 보장하는 범위는 그 필드가 존재하고 문자열이라는 것까지임. 절의 순서, 문단 구성, 문체는 JSON 스키마로 표현할 수 없으므로 필드에 넣는다고 강제되지 않음. 기계가 소비하는 레코드는 강제되는 경로에 두고, 사람이 읽는 메모는 형식 지시에 검증 재시도를 붙이는 것이 맞음. 한 번의 호출에 담느냐가 아니라 무엇이 실제로 강제되느냐가 기준임.`,
     wrongs:[
       `<b>B(설명란에 형식 규칙):</b> 설명란이 스키마로 표현할 수 없는 제약을 적는 위치인 것은 맞음. 그러나 거기 적힌 내용은 안내이지 강제가 아니고, 지금 필요한 보장은 메모가 아니라 레코드 쪽임.`,
       `<b>C(둘 다 형식 지시로):</b> 일관성을 위해 22개 필드의 보장을 포기하는 것임. 사람의 검수 없이 데이터 창고로 들어가는 경로에서 보장을 포기하는 것은 대가가 가장 큼.`,
       `<b>D(프리필로 순서 고정):</b> 프리필(prefill)은 응답의 시작 부분만 고정함. 두 번째 절부터는 여전히 자유 형식임. 게다가 응답 자체를 스키마로 받는 방식과는 함께 쓸 수 없고, 최신 모델 세대에서는 마지막 턴 프리필이 지원되지 않음.`]},
   principle:"스키마는 형태까지 보장하고 문체는 보장하지 못함"},

  /* --- s6-2 · 4.3 · 선택 비교형 --- */
  {scenario:"s6", ts:"4.3",
   q:`Your extraction already calls a tool with a JSON schema, and the loader still rejects about one payload in 300: a required field missing, or an integer arriving as a string. The team runs a current model and controls the request end to end. Two proposals are on the table: turn on the schema-validation guarantee for the tool, or drop the tool wrapper and take the response itself as schema-conforming JSON. What is the honest comparison?`,
   opts:[
     {t:`Both remove this class of failure — one guarantees the tool's name and inputs against the schema, the other constrains the response content itself — and the choice comes down to whether the call is conceptually a tool invocation. Neither touches values that are well-formed but wrong.`, ok:true},
     {t:`Only the tool-side guarantee helps here, because constraining the response content governs prose formatting and cannot enforce field types on a record.`},
     {t:`Neither helps: a schema was already in place, so the remaining failures must be semantic, and the fix is a validation loop rather than stronger enforcement.`},
     {t:`Take the response-as-JSON route only, because a tool's schema is guidance the model may deviate from while response formatting is enforced by the API.`}],
   explain:{
     good:`두 가지 방법이 있음. 도구 이름과 입력을 스키마로 검증해 보장하는 방식과, 응답 자체를 스키마에 맞춘 JSON으로 받는 구조화된 출력(structured output) 방식임. 현재 발생하는 실패인 필수 필드 누락과 타입 불일치는 두 방식 모두 없애 주므로, 선택은 이 호출이 도구 호출인가라는 설계 질문이 됨. 다만 형식은 맞지만 값이 틀린 경우는 어느 쪽도 잡지 못함. 그것은 검증 계층의 역할임.`,
     wrongs:[
       `<b>B(응답 제약은 타입을 보장하지 못함):</b> 사실이 아님. 응답을 스키마에 맞춰 받는 기능이 보장하는 것이 정확히 필드 타입과 필수 필드임.`,
       `<b>C(남은 것은 전부 의미 오류):</b> 구문과 의미를 구분하는 접근은 타당하지만 지문의 두 증상은 구문 쪽임. 필수 필드 누락과 문자열로 온 정수는 강제로 사라지는 항목임.`,
       `<b>D(도구 스키마는 힌트일 뿐):</b> 강제 옵션을 켜지 않은 상태라면 완전히 틀린 설명은 아님. 그러나 지문이 묻는 것은 강제를 켠 뒤의 비교이므로 전제가 어긋남.`]},
   principle:"보장 대상은 형태이지 값이 아님"},

  /* --- s6-3 · 4.3 · 선택 비교형 --- */
  {scenario:"s6", ts:"4.3",
   q:`A partner ingests a fixed-column text file: one record per line, amounts right-aligned in columns 41 to 52, dates as eight digits with no separator. The current prompt asks the model to emit that line directly, and roughly one line in 40 is off by a character. A teammate proposes moving the column layout into the field descriptions of a schema so the model is told exactly how to pad.`,
   opts:[
     {t:`Constrain the extracted values with the schema — amount as a number, date as a date-typed string — and have the pipeline's own code render the fixed-column line, since column padding is a deterministic formatting job and handing it to a model reintroduces the variance the schema exists to remove.`, ok:true},
     {t:`The teammate is right: field descriptions are where constraints a schema cannot express belong, so the padding rules go there and the model produces the finished line.`},
     {t:`Keep the model producing the line and add a validation-and-retry loop that re-requests any line failing the column check.`},
     {t:`Prefill the assistant turn with the first 40 columns of each line so the amount's starting position is anchored before the model writes it.`}],
   explain:{
     good:`자릿수 맞추기는 확률적 처리에 맡길 작업이 아님. 값만 스키마로 받고 문자열 조립은 코드가 하면 40건 중 1건의 오류가 0이 됨. 설명란에 제약 정보를 적는 것은 스키마가 직접 강제하지 못하는 항목을 검증 코드가 대신 확인하도록 안내하는 용도이지, 모델에게 서식 작업을 시키라는 뜻이 아님.`,
     wrongs:[
       `<b>B(설명란에 패딩 규칙):</b> 설명란의 용도를 절반만 반영한 선택지임. 최소값과 최대값 같은 제약을 설명으로 옮기고 코드로 검증하라는 안내는 실제로 존재하지만, 그것은 모델에게 시키라는 뜻이 아니라 코드가 확인하라는 뜻임.`,
       `<b>C(재시도 루프):</b> 확정적으로 해결할 수 있는 문제를 계속 확률 문제로 다루는 것임. 40건 중 1건이 400건 중 1건이 될 수는 있어도 0이 되지는 않으며 호출 비용만 늘어남.`,
       `<b>D(프리필로 정렬 고정):</b> 시작 부분만 고정되고 금액 자릿수는 그 뒤에서 결정됨. 최신 모델 세대에서는 마지막 턴 프리필이 400 오류로 거부되기도 함.`]},
   principle:"값은 모델이 만들고 서식은 코드가 만듦"},

  /* --- s6-4 · 4.3 · 복수응답 --- */
  {scenario:"s6", ts:"4.3", multi:2,
   q:`A claims pipeline makes two model calls. Call 1 turns a scanned form into 18 typed fields that load into a database with nobody in between. Call 2 writes the adjuster's narrative in the insurer's mandated wording: a required disclaimer sentence and a fixed ordering of four sections. Which TWO choices are correct? (Select TWO.)`,
   opts:[
     {t:`Call 1 goes on a schema-constrained path, because the loader parses it with no human in between and the rigidity is worth the guarantee.`, ok:true},
     {t:`Call 2 uses explicit format instructions plus a check that the disclaimer and the four sections are present, retrying when they are not, because mandated wording is not a shape a JSON Schema can enforce.`, ok:true},
     {t:`Call 2 uses an enum field listing the four section headings, which guarantees both their presence and their ordering.`},
     {t:`Call 1 uses format instructions with a retry on parse failure, which is cheaper and reaches the same reliability once the loop is in place.`},
     {t:`Both calls prefill the assistant turn with the opening of the expected output, the one technique that works the same way for JSON and for prose.`}],
   explain:{
     good:`두 호출의 요구가 서로 다름. 사람의 검수를 거치지 않고 적재되는 쪽은 강제력이 가장 높은 경로를 사용해야 함. JSON 스키마로 표현할 수 없는 문체와 문장 구성 요구는 형식 지시로 처리할 수밖에 없으므로 대신 검증과 재시도를 붙임. 무엇을 강제할 수 있는지를 먼저 구분한 뒤 방법을 고르는 순서임.`,
     wrongs:[
       `<b>C(절 제목 enum):</b> enum은 특정 필드의 값이 정해진 집합 안에 있게 하는 장치이지, 산문 안에서 절이 그 순서로 등장하게 만드는 장치가 아님.`,
       `<b>D(1번도 형식 지시와 재시도로):</b> 검수 없는 자동 적재에서 보장을 포기하는 것임. 재시도는 실패를 늦게 발견하게 할 뿐이고, 파싱은 성공했는데 필드가 누락된 경우는 검출되지도 않음.`,
       `<b>E(둘 다 프리필):</b> 시작 부분만 고정하고 끝은 고정하지 못함. 응답을 스키마로 받는 방식과 함께 쓸 수 없고, 최신 모델 세대에서는 마지막 assistant 턴 프리필 자체가 400 오류로 거부됨.`]},
   principle:"강제할 수 있는 것만 강제하고 나머지는 검증함"},

  /* --- s6-5 · 4.3 · 선택 비교형 --- */
  {scenario:"s6", ts:"4.3",
   q:`Schema review for a shipping-document extractor. Three fields are disputed. container_number appears on every document the pipeline accepts. broker_reference appears on about a third of them, and when it is absent the downstream system should record that the document was checked and carried none. insurance_certificate_id is one your team ingests only for customers on certain plans; when it is out of scope the record should carry no such key at all. How should the three be declared?`,
   opts:[
     {t:`container_number required and non-nullable; broker_reference required but nullable, so a checked-and-absent value arrives as an explicit null; insurance_certificate_id optional, so the key is simply not in the object when it is out of scope.`, ok:true},
     {t:`All three required, with broker_reference and insurance_certificate_id nullable, since null is the honest value whenever something is not there.`},
     {t:`container_number required and the other two optional, since a field that is not always present should never be declared required.`},
     {t:`All three optional and nullable, leaving the loader to decide what a missing key means, since business rules do not belong in a schema.`}],
   explain:{
     good:`세 가지 상태가 서로 다름. 항상 존재하는 값, 확인했으나 없는 값, 애초에 수집 범위 밖인 값임. 두 번째는 명시적 null로 와야 확인했으나 없었다는 사실이 기록되고, 세 번째는 키 자체가 없어야 이 계약은 해당 항목을 수집하지 않는 경우로 읽힘. 누락된 키와 null은 다운스트림에서 서로 다른 사실이므로 임의로 고를 수 없음.`,
     wrongs:[
       `<b>B(전부 required, 둘은 nullable):</b> null이 정확한 값이라는 설명 자체는 맞아서 고르기 쉬운 선택지임. 그러나 확인했으나 없음과 범위 밖을 같은 null로 합치면 데이터 품질 후속 조치를 어디에 적용할지 알 수 없게 됨.`,
       `<b>C(둘 다 optional):</b> 브로커 참조가 없을 때 키까지 사라지면 추출이 놓친 것인지 문서에 없던 것인지 구분할 수 없음. 지문이 요구한 기록이 사라짐.`,
       `<b>D(전부 optional에 nullable):</b> 판단을 전부 로더로 미루는 것임. 스키마가 표현할 수 있는 구분을 스키마에서 제거하고 하류에서 추측하게 만듦.`]},
   principle:"누락된 키와 null은 서로 다른 사실임"},

  /* --- s6-6 · 4.3 · 선택 비교형 --- */
  {scenario:"s6", ts:"4.3",
   q:`vat_status is an enum of standard, reduced and zero_rated. Two problems surface in the same week: a batch of invoices from a domestic supplier never mentions VAT at all, and a batch from a charity customer is genuinely VAT-exempt. Both currently land on standard. Finance says the two must drive different downstream handling — one is a data-quality follow-up, the other a legitimate accounting treatment. What is the right schema change?`,
   opts:[
     {t:`Add exempt as a real category value, and represent "the document does not state it" separately — an unclear value or an allowed null — because one of the two is a fact about the transaction and the other is a fact about the document.`, ok:true},
     {t:`Add a single other value with a free-text detail field and let the downstream rules read that text to tell the two cases apart.`},
     {t:`Add unknown and instruct the model to use it for both cases, then have a reviewer split them when the follow-up queue is worked.`},
     {t:`Drop the enum and accept free text, since the taxonomy has now proven incomplete twice in a single week.`}],
   explain:{
     good:`두 사건의 성격이 다름. 면세는 실제로 존재하는 분류이므로 정식 값으로 들어가야 하고, 문서에 아무 언급이 없는 것은 분류가 아니라 정보 부재이므로 unclear나 null에 해당함. 한 값으로 합치면 Finance가 요구한 두 갈래 처리가 구조적으로 불가능해짐. 분류의 빈칸과 정보의 빈칸은 서로 다른 위치임.`,
     wrongs:[
       `<b>B(other와 상세 텍스트):</b> 새 분류가 계속 생기는 상황의 정석 처방이라 그럴듯함. 그러나 여기서 둘 중 하나는 이미 알고 있는 분류이고 다른 하나는 분류 자체가 아님. 자유 텍스트를 다운스트림 규칙이 다시 파싱하게 만드는 것은 방금 없앤 비정형 처리를 되살리는 것임.`,
       `<b>C(둘 다 unknown):</b> 구분을 사람에게 넘기는 것인데, 문서만 봐도 구분되는 두 가지를 왜 사람이 다시 봐야 하는지 설명되지 않음. 자동 처리 대상이 전부 검토 큐로 흘러감.`,
       `<b>D(enum 폐지):</b> 두 번 비어 있었다는 이유로 닫힌 집합의 이점을 전부 버리는 과잉 조치임. 값의 표기가 흔들리기 시작하면 다운스트림 분기가 전부 깨짐.`]},
   principle:"분류의 빈칸과 정보의 빈칸은 서로 다른 위치임"},

  /* --- s6-7 · 4.3 · 부정형 NOT --- */
  {scenario:"s6", ts:"4.3",
   q:`An engineer circulates the extraction team's schema-design checklist for review. Which line should be struck as NOT correct?`,
   opts:[
     {t:`"Declaring a field optional and declaring it nullable are two spellings of the same idea, so pick whichever reads better and apply it consistently across the schema."`, ok:true},
     {t:`"A numeric range such as a minimum or a maximum is not something the structured-output path enforces for us — carry the constraint in the field's description and check it in our own validation code."`},
     {t:`"Compare enum values case-insensitively: a returned value can differ from the schema's value in capitalization alone."`},
     {t:`"Schema conformance says nothing about whether a value is right — line items that pass every type check can still fail to sum to the stated total."`}],
   explain:{
     good:`부정형 문항임. optional은 그 키가 아예 없을 수 있다는 뜻이고 nullable은 키는 있고 값이 null일 수 있다는 뜻이므로 다운스트림이 읽는 사실이 서로 다름. 읽기 편한 쪽으로 고르는 문제가 아님. 나머지 세 줄은 공식 문서에 그대로 있는 제약임.`,
     wrongs:[
       `<b>B(수치 범위는 코드로):</b> 최소값과 최대값 같은 키워드는 직접 지원되지 않으므로, 제약 정보를 설명란으로 옮기고 원래 제약은 각자 코드에서 검증하라고 안내되어 있음. 그대로 맞는 서술임.`,
       `<b>C(대소문자 무시 비교):</b> enum과 const 문자열 값의 대소문자는 보장되지 않는다고 명시되어 있고, 대소문자를 무시하고 비교하도록 권장함. 대소문자만 다른 값을 enum에 두지 말라는 안내도 함께 있음.`,
       `<b>D(준수와 정확성은 별개):</b> 스키마는 형태를 보장하지 값의 옳음을 보장하지 않음. 합계 불일치가 그 예임.`]},
   principle:"optional과 nullable은 서로 다른 의미임"},

  /* --- s6-8 · 4.4 · 부정형 LEAST --- */
  {scenario:"s6", ts:"4.4",
   q:`The team is specifying the semantic validation layer that runs after every extraction. The extraction itself already runs on a path where the schema is enforced. Which check is LEAST worth putting into that layer?`,
   opts:[
     {t:`Confirming that every required field is present and that each value carries its declared type.`, ok:true},
     {t:`Confirming that the line items sum to the stated invoice total, and flagging the record when they do not.`},
     {t:`Confirming that a numeric amount falls inside the plausible range for the document type, since range keywords are not enforced on that path.`},
     {t:`Confirming that the invoice date is not later than the payment due date, and routing the record for review when it is.`}],
   explain:{
     good:`부정형 문항임. 필수 필드의 존재와 타입은 강제 경로가 이미 보장하므로 검증 계층에서 다시 확인하면 코드만 늘고 잡히는 것은 없음. 나머지 셋은 모두 스키마가 확인하지 못하는 영역임. 필드 간 합계, 수치 범위, 필드 간 순서 관계임. 검증 계층은 스키마가 남긴 부분만 담당하도록 설계해야 함.`,
     wrongs:[
       `<b>B(합계 일치):</b> 형식적으로 완전한 숫자들이 서로 맞지 않는 전형적인 의미 오류임. 스키마 범위 밖의 일임.`,
       `<b>C(수치 범위):</b> 최소값과 최대값 같은 제약은 그 경로에서 직접 강제되지 않으므로 코드가 확인해야 함. 검증 계층의 정당한 역할임.`,
       `<b>D(날짜 순서):</b> 두 필드의 관계는 어느 한 필드의 타입으로 표현되지 않음. 검증 계층에서만 확인할 수 있음.`]},
   principle:"검증 계층은 스키마가 확인하지 못하는 것만 담당함"},

  /* --- s6-9 · 4.5 · 선택 비교형 --- */
  {scenario:"s6", ts:"4.5",
   q:`A nightly run of 4,000 invoices moved from synchronous calls to the Message Batches API last month. Finance now reports that about 30 records a night carry another supplier's data — one invoice's vendor name with a different invoice's amounts. The pipeline pairs returned results with the input list by position. Spend is down by half and nobody wants to give that up. What is the fix?`,
   opts:[
     {t:`Pair each result with its request by the custom_id it was submitted with, because batch results can come back in any order and position is not a valid key.`, ok:true},
     {t:`Submit the work in smaller batches so ordering is easier to preserve, and keep pairing by position inside each batch.`},
     {t:`Move the nightly run back to synchronous calls, since a guarantee about ordering is worth more than the discount.`},
     {t:`Add the supplier name to the extraction schema as a required field and cross-check it against the input file after loading.`}],
   explain:{
     good:`배치 결과는 제출 순서대로 반환되지 않음. 공식 문서가 그 때문에 항상 custom_id로 대응시키라고 명시함. 위치로 대응시키면 언젠가 어긋나고, 그 어긋남이 지금 밤마다 30건으로 나타나고 있음. 할인과 정확성을 모두 지키는 유일한 방법이 식별자 대응임.`,
     wrongs:[
       `<b>B(배치를 잘게 분할):</b> 규모가 작으면 안전해 보이지만 사실이 아님. 순서 보장은 배치 크기와 무관하므로 100건짜리 배치 안에서도 순서가 섞임.`,
       `<b>C(동기 호출로 전환):</b> 지문이 비용 절감을 유지하고 싶다고 명시했고, 정확성 문제는 대응 방식에서 발생한 것이므로 API를 바꿀 이유가 없음.`,
       `<b>D(사후 교차 확인):</b> 이미 잘못 적재된 뒤에 확인하는 것이므로 원인은 그대로임. 게다가 공급사명이 같은 두 인보이스는 이 검사를 그대로 통과함.`]},
   principle:"결과 대응은 위치가 아니라 식별자로 함"},

  /* --- s6-10 · 4.5 · 부정형 NOT --- */
  {scenario:"s6", ts:"4.5",
   q:`The team writes up the case for moving the monthly archive re-scan — 600,000 documents, results read the following week — onto the Message Batches API. Which line in the write-up is NOT accurate?`,
   opts:[
     {t:`"Batch requests are prioritized ahead of synchronous traffic, so the same volume comes back sooner than it would through the regular path."`, ok:true},
     {t:`"Usage inside a batch is charged at half the standard price, which is the whole reason to move a workload nobody is waiting on."`},
     {t:`"Results are matched to requests by the custom_id we submit, so a partial failure can be identified and resubmitted without re-running the entire job."`},
     {t:`"A batch may take up to 24 hours and anything unfinished by then expires, which is fine here because the results are read a week later."`}],
   explain:{
     good:`부정형 문항임. 배치를 사용하는 이유는 비용이 적기 때문이지 처리가 빠르기 때문이 아님. 대부분 한 시간 안에 끝나지만 그것은 관찰된 경향이지 보장이 아니며, 문서가 보장하는 것은 24시간 상한과 그 안에 끝나지 않으면 만료된다는 것뿐임. 우선 처리된다는 서술은 문서 어디에도 없음.`,
     wrongs:[
       `<b>B(50% 과금):</b> 문서에 그대로 있는 사실이며, 대기하는 사람이 없는 작업을 옮기는 근거로도 정확함.`,
       `<b>C(custom_id 대응):</b> 결과가 순서대로 오지 않으므로 custom_id로 대응시키라는 것이 공식 안내임. 실패분만 골라 재제출하는 근거로도 맞음.`,
       `<b>D(24시간 상한):</b> 상한과 만료 모두 문서에 명시되어 있음. 결과를 다음 주에 읽는 작업이면 이 조건을 충분히 만족함.`]},
   principle:"배치는 비용 때문에 사용하는 것이지 속도 때문이 아님"},

  /* --- s6-11 · 1.6 · 선택 비교형 --- */
  {scenario:"s6", ts:"1.6",
   q:`A 180-page reinsurance treaty has to become 60 fields. A single call over the whole document pulls values from the wrong article about a fifth of the time — the definitions article and the claims article use nearly identical wording. Across the corpus the structure is stable: the same eight articles, always in the same order. Which decomposition fits?`,
   opts:[
     {t:`A fixed chain: split on the known article boundaries, extract each article's fields with a prompt scoped to that article, then run a final pass that reconciles the fields appearing in more than one article.`, ok:true},
     {t:`Dynamic decomposition: let a first pass read the document and decide which sections each field should be pulled from, since the model reads the page better than a fixed rule does.`},
     {t:`One call over the whole document with an instruction to pay close attention to which article each value comes from.`},
     {t:`One call per field — 60 calls over the whole document — so each call has a single target and cannot confuse two articles.`}],
   explain:{
     good:`지문이 구조가 매번 같다고 명시함. 수행할 단계를 미리 예측할 수 있으면 단계를 고정할 수 있으므로 고정 순차 분해가 맞음. 조항 경계로 나눠 범위를 좁히면 문구가 비슷해서 생기던 혼동이 사라지고, 여러 조항에 걸치는 필드만 마지막 대조 단계가 담당하면 됨.`,
     wrongs:[
       `<b>B(동적 분해):</b> 중간 발견이 다음 단계를 정하는 열린 조사에는 맞는 처방임. 그러나 여기서는 구조가 이미 알려져 있으므로 매번 같은 결론이 나올 판단을 매번 모델에게 맡기는 것이며, 그 판단이 바로 지금 실패하는 지점임.`,
       `<b>C(전체를 한 번에 처리하고 주의 요구):</b> 180쪽 안에서 주의가 분산되는 것이 원인인데 주의하라는 지시로 해결하려는 것임. 전체를 한 번에 처리하는 방식은 반복 출제되는 오답 유형임.`,
       `<b>D(필드당 한 호출):</b> 호출은 60배가 되는데 각 호출이 여전히 180쪽 전체를 읽으므로 조항 혼동은 그대로임. 범위를 좁히지 않았기 때문임.`]},
   principle:"구조를 예측할 수 있으면 고정 순차 분해를 사용함"},

  /* --- s6-12 · 1.2 · 복수응답 --- */
  {scenario:"s6", ts:"1.2", multi:2,
   q:`The platform handles four document families — invoices, contracts, shipping manifests, lab reports — each with its own schema and quirks. A coordinator classifies each incoming document and delegates to that family's extractor. Two failures: extractors sometimes reply asking which schema to use, and a misclassified lab report was extracted as an invoice and loaded with nobody noticing. Which TWO changes are correct? (Select TWO.)`,
   opts:[
     {t:`Put everything the extractor needs into the delegating prompt — the schema, the family's quirks, and the document itself — since a subagent starts with none of the coordinator's history.`, ok:true},
     {t:`Have the extractor return its own read of the document family alongside the extraction, and have the coordinator refuse to load a record when that read disagrees with the classification it was sent under.`, ok:true},
     {t:`Give every extractor all four schemas and let it choose, which removes the dependency on the coordinator's classification entirely.`},
     {t:`Raise the coordinator's classification confidence threshold so that uncertain documents are not delegated at all.`},
     {t:`Attach the coordinator's full conversation history to each delegation so the extractor can see how the classification was reached.`}],
   explain:{
     good:`두 증상의 원인이 다르므로 처방도 둘임. 서브에이전트는 코디네이터의 이력을 물려받지 않으므로 필요한 정보는 위임 프롬프트에 직접 담아야 함. 잘못 분류된 문서가 검출되지 않고 통과한 것은 교차 확인이 없기 때문이므로, 추출기가 판단한 내용을 되돌려받아 대조해야 함. 상류의 판단을 하류가 검산하는 구조가 됨.`,
     wrongs:[
       `<b>C(네 가지 스키마를 모두 전달):</b> 질문은 사라지지만 분류 판단이 하류로 옮겨갈 뿐이므로 오분류는 그대로임. 매 호출이 사용하지 않을 스키마 세 개를 함께 전송하는 비용도 발생함.`,
       `<b>D(분류 임계값 상향):</b> 확신이 낮은 문서를 보내지 않는 조치인데, 지문의 사고는 확신이 높으면서 틀린 경우임. 처리량만 줄어듦.`,
       `<b>E(전체 이력 첨부):</b> 이력이 상속되지 않는다는 진단까지는 맞아서 고르기 쉬움. 그러나 처방이 반대 방향으로 과함. 필요한 것은 관련 내용의 명시적 전달이지 대화 전체의 복사가 아님.`]},
   principle:"필요한 내용은 명시적으로 전달하고 확인은 교차 검증으로 함"},

  /* --- s6-13 · 2.1 · 선택 비교형 --- */
  {scenario:"s6", ts:"2.1",
   q:`The extractor runs on an enforced schema and the loader has not rejected a payload in weeks. Yet on invoices that print two addresses, the shipping address regularly lands in billing_address. The two fields are typed identically. What is the most direct fix?`,
   opts:[
     {t:`Write each field's description so it says how to tell the two apart on the page — which label sits above it, where it usually appears, what to do when only one address is printed — because the schema states the shape of the slot and nothing about which value belongs in it.`, ok:true},
     {t:`Add a validation rule that compares the two addresses and retries whenever they come back identical, since duplicated values are the signal that the model was confused.`},
     {t:`Merge the two into an addresses array with a type enum, so the model no longer has to decide which slot to fill.`},
     {t:`Add worked examples of correctly filled invoices to the prompt, drawn from the single-address invoices that make up most of the corpus.`}],
   explain:{
     good:`스키마는 이 필드가 문자열이라는 것까지만 표현함. 어떤 값이 그 필드에 들어가야 하는지는 설명(description)이 정하며, 두 필드가 타입까지 같으면 구분 신호가 설명란 외에는 없음. 어떤 라벨 아래 있는 값인지, 주소가 하나만 인쇄된 문서에서는 어디로 넣을지를 설명란에 적어야 모델이 판단할 근거가 생김.`,
     wrongs:[
       `<b>B(동일값 검사 후 재시도):</b> 두 주소가 같은 값으로 온 경우만 검출함. 실제 문제인 서로 바뀌어 들어간 경우는 두 값이 다르므로 검사를 그대로 통과함.`,
       `<b>C(배열과 type enum):</b> 판단을 옮길 뿐 없애지 못하므로 이 문제의 조건에서는 부족함. 배열 원소마다 type을 고르는 그 판단이 지금 틀리고 있는 판단임.`,
       `<b>D(단일 주소 예시):</b> 실패가 발생하지 않는 경우에서 예시를 만든 것임. 두 주소가 함께 있을 때의 판단을 보여주지 않으므로 대상이 어긋남.`]},
   principle:"필드에 어떤 값이 들어가는지는 설명이 정함"},

  /* --- s6-14 · 2.2 · 복수응답 --- */
  {scenario:"s6", ts:"2.2", multi:2,
   q:`Extraction calls an internal MCP server that fetches page images for a document id. When a fetch fails the server returns the string "could not retrieve document." The agent's behavior on failure is erratic: sometimes eleven retries, sometimes invented field values, sometimes an empty record the loader happily accepts. Which TWO changes to the server's error response fix this? (Select TWO.)`,
   opts:[
     {t:`Return a structured error carrying a machine-readable code and whether the condition is retryable, so the agent stops guessing whether another attempt could possibly help.`, ok:true},
     {t:`Separate the failure kinds the caller must act on differently — document not found, permission denied, upstream timeout — instead of collapsing them into one sentence.`, ok:true},
     {t:`Return an empty page list on failure so the extraction path stays uniform and the record simply comes back with nulls.`},
     {t:`Have the server retry internally until it succeeds, so the agent never sees a failure at all.`},
     {t:`Add a line to the extraction prompt explaining that "could not retrieve document" means the agent should stop and report a failure.`}],
   explain:{
     good:`오류 응답도 도구 계약의 일부임. 오류 코드와 재시도 가능 여부가 함께 오면 에이전트가 추측할 필요가 없어지고, 문서 없음과 권한 없음과 상류 지연을 구분해 주면 각각에 다른 동작을 지정할 수 있음. 현재 동작이 일관되지 않은 이유가 정확히 판단할 재료가 문장 하나뿐이기 때문임.`,
     wrongs:[
       `<b>C(빈 목록 반환):</b> 실패를 성공처럼 보이게 만드는 것임. 로더가 받아들이는 빈 레코드가 지금도 문제인데 그것을 표준 동작으로 굳히게 됨.`,
       `<b>D(서버 내부 무한 재시도):</b> 권한 없음이나 문서 없음처럼 성공할 수 없는 실패에서 서버가 계속 대기함. 호출자는 왜 응답이 오지 않는지도 알 수 없음.`,
       `<b>E(프롬프트로 문자열 해석 지시):</b> 지시가 동작을 어느 정도 유도하는 것은 사실이므로 고르기 쉬움. 그러나 재시도해도 되는 실패인지를 그 문장에서는 알 수 없으므로, 열한 번 재시도하던 문제는 그대로 남음.`]},
   principle:"오류 응답도 도구 계약의 일부임"},

  /* --- s6-15 · 3.5 · 선택 비교형 --- */
  {scenario:"s6", ts:"3.5",
   q:`The effective_date field is wrong on about 12% of contracts. Reviewing the misses: some documents print a signature date and a separate commencement date, some say the agreement takes effect on the later of two signature dates, some carry an amendment that moves the date. The team has rewritten the prose instruction four times over three weeks and the rate has not moved. What converges fastest?`,
   opts:[
     {t:`Assemble a small labeled set covering the failing document shapes with the correct answer for each, fold those shapes into the instruction as worked examples, and re-measure on that set after every change so a rewrite that helps one shape and hurts another is visible.`, ok:true},
     {t:`Rewrite the instruction once more, this time defining the effective date formally in legal terms so that every shape is covered by a single definition.`},
     {t:`Split into three prompts, one per document shape, and route documents to them with a classifier trained on the layout.`},
     {t:`Accept the 12% and route every contract carrying more than one date to human review.`}],
   explain:{
     good:`산문 지시를 네 번 수정해도 결과가 바뀌지 않았으면 다섯 번째도 같음. 실패 사례를 실물로 모아 정답과 함께 붙이고, 수정할 때마다 그 세트로 다시 측정하는 것이 가장 빠르게 수렴함. 한 유형을 개선하면서 다른 유형을 악화시키는 변경이 눈에 보이기 때문임. 모호한 지시는 예시로 확정하고 개선 여부는 측정으로 판단하는 순서임.`,
     wrongs:[
       `<b>B(법률적 정의로 재작성):</b> 정의를 정밀하게 하면 나아진다는 판단 자체는 타당해서 고르기 쉬움. 그러나 실패의 원인은 정의가 느슨해서가 아니라 레이아웃마다 해석이 갈리기 때문이고, 산문에 산문을 더하면 해석이 갈릴 지점만 늘어남.`,
       `<b>C(유형별 분기와 분류기):</b> 비용이 적은 수단을 모두 시도하기 전에 학습 파이프라인부터 구축하는 것임. 라벨 세트는 어차피 필요하므로 순서가 뒤바뀜.`,
       `<b>D(12% 수용):</b> 날짜가 둘 이상인 계약이 절반이 넘으면 사람이 처리할 큐가 감당하지 못함. 그리고 아직 비용이 적은 수단이 남아 있음.`]},
   principle:"산문 대신 실물 예시로, 감각 대신 측정으로 판단함"},

  /* --- s6-16 · 5.2 · 선택 비교형 --- */
  {scenario:"s6", ts:"5.2",
   q:`An invoice's header total reads 48,200 and its line items sum to 48,020. The extraction has to emit one total_amount, and the document carries no other total. Under this customer's contract, anything the pipeline emits below 50,000 is paid automatically with no human sight. What should the extraction do?`,
   opts:[
     {t:`Emit neither figure as a confident value: record both readings with where each was found, mark the record as conflicting, and let that mark take it off the automatic path — the document disagrees with itself, and no rule inside the pipeline can settle which figure is real.`, ok:true},
     {t:`Emit the header total, since a stated total is the document's own assertion about itself while the itemization may simply be incomplete.`},
     {t:`Emit the line-item sum, since a figure derived from the itemization is more reliable than one typed into a header.`},
     {t:`Emit the header total with a low confidence value attached, and let the downstream threshold decide whether a person ever sees it.`}],
   explain:{
     good:`원문 자체가 서로 어긋나 있으면 추출 단계에서 고를 문제가 아님. 두 값을 모두 위치와 함께 남기고 충돌 표시를 붙여 자동 결제 경로 밖으로 보내는 것이 맞음. 어느 쪽이 맞는지는 문서 안에 답이 없고, 지문은 그 답 없는 선택이 그대로 지급으로 이어지는 구조라고 설명하고 있음.`,
     wrongs:[
       `<b>B(헤더 우선):</b> 일반론으로는 방어 가능한 규칙이라 가장 많이 선택되는 오답임. 그리고 그 규칙이 이 문서에서 틀렸을 때 180이 검토 없이 지급됨. 지문이 무인 자동 결제라고 명시한 순간 대체로 맞는 규칙은 근거가 되지 못함.`,
       `<b>C(합계 우선):</b> 반대 방향의 같은 잘못임. 라인 아이템이 한 줄 누락된 문서에서는 이 규칙이 틀림.`,
       `<b>D(낮은 신뢰도만 표시):</b> 점수를 붙여도 라우팅이 그 점수를 참조하지 않으면 50,000 미만은 그대로 자동 결제됨. 표시와 경로 변경은 서로 다른 조치임.`]},
   principle:"원문끼리 어긋나면 고르지 말고 자동 경로에서 제외함"},

  /* --- s6-17 · 5.3 · 복수응답 --- */
  {scenario:"s6", ts:"5.3", multi:2,
   q:`The pipeline runs OCR, then extraction, then validation, then load. Last month a scanner was recalibrated and its output degraded: OCR began returning text with roughly one character in twelve wrong, and reported success every time. Extraction produced schema-valid records from the noise, validation passed them because the types were right, and 2,100 records loaded before anyone noticed. Which TWO changes would have stopped this? (Select TWO.)`,
   opts:[
     {t:`Have the OCR stage emit a quality signal beside its text — per-page confidence or an unrecognized-character rate — and have the next stage refuse input below a threshold instead of treating any returned text as usable.`, ok:true},
     {t:`Add checks that can only pass on real data — an invoice number matching the expected pattern, a total that reconciles with the line items — so a record built from noise fails validation instead of sailing through it.`, ok:true},
     {t:`Set the extraction model's temperature to zero, so that degraded input produces a consistent and therefore detectable failure.`},
     {t:`Have the loader compare each night's record count against the previous night's and alert on a significant change.`},
     {t:`Add a prompt instruction telling the extractor to return nothing when the source text looks corrupted.`}],
   explain:{
     good:`사고의 원인은 성공 신호가 품질 신호를 대신한 것임. 상류가 자기 출력의 품질을 수치로 전달하고 하류가 그 수치로 거절할 수 있어야 하며, 검증은 타입이 아니라 실제 데이터에서만 성립하는 성질을 확인해야 함. 둘 중 하나만 있었어도 2,100건이 나가지 않았음.`,
     wrongs:[
       `<b>C(temperature 0):</b> 손상된 입력에서 일관되게 손상된 출력이 나올 뿐임. 일관성은 탐지가 아님.`,
       `<b>D(건수 비교 모니터링):</b> 운영 감시로는 일반적으로 맞는 처방이라 고르기 쉬움. 그러나 이 사고는 정확히 그 감시를 통과함. 건수가 평소와 같았기 때문임. 2,100건이 그대로 적재됐음.`,
       `<b>E(손상 시 반환 금지 지시):</b> 강제력이 없고, 열두 자 중 한 자가 틀린 텍스트는 손상된 것처럼 보이지도 않음. 문장이 대체로 읽히기 때문임.`]},
   principle:"성공 신호는 품질 신호가 아님"},

  /* --- s6-18 · 5.6 · 부정형 LEAST --- */
  {scenario:"s6", ts:"5.6",
   q:`An auditor picks 20 loaded records and asks your team to show, for each figure, where in the source document it came from. Today the warehouse holds only the extracted values. Which change would help LEAST with that request?`,
   opts:[
     {t:`Storing the model's confidence value for each field beside the value, so the auditor can see how sure the extraction was about it.`, ok:true},
     {t:`Storing the page number and the quoted source text each value was read from, captured as fields of the extraction schema itself.`},
     {t:`Storing the document version and revision identifier the extraction ran against, so a later amendment cannot be mistaken for the source that was read.`},
     {t:`Storing, for derived values, which inputs the derivation used, so a total that was summed is distinguishable from one printed on the page.`}],
   explain:{
     good:`부정형 문항임. 감사가 요구한 것은 어디서 왔는가인데 신뢰도는 얼마나 확신했는가를 나타내므로 질문에 답하지 못함. 0.97인 값이라도 출처를 보여주지 못하면 검증할 수 없고, 보정되지 않은 점수라면 그 수치 자체도 근거가 약함. 나머지 셋은 모두 출처를 재구성하는 재료임.`,
     wrongs:[
       `<b>B(페이지와 원문 인용):</b> 출처 추적의 핵심 내용임. 감사에서 바로 대조할 수 있음.`,
       `<b>C(문서 판본):</b> 어느 판본을 읽었는지가 없으면 나중 개정본과 대조하다가 잘못된 불일치가 발생함. 시점을 고정하는 필드임.`,
       `<b>D(파생값의 입력):</b> 인쇄된 값과 계산된 값을 구분해 줌. 페이지에서 찾을 수 없는 숫자가 왜 없는지를 설명하는 재료임.`]},
   principle:"신뢰도는 출처가 아님"}

  );
})();
