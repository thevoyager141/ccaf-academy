/* PART 3 · Claude Code 설정 & 워크플로 (D3, 20%) */
window.CCAF_CONTENT.p3 = {
  id: "p3",
  lessons: [

  /* ===== CH 1 · 3.1 CLAUDE.md 계층 ===== */
  { id:"p3c1", ch:"CH 1", title:"CLAUDE.md 계층과 모듈화 (3.1)",
    steps:[
      {type:"concept", kind:"PART BRIEFING · 파트 설명", h:"PART 03 · 팀 전체에 같은 설정을 적용하는 방법",
       html:`<p class="lead">이 파트의 주제는 <strong>Claude Code Configuration & Workflows</strong>임.</p>
        <h4>파트 프로필</h4>
        <ul>
          <li>출제 비중 <strong>20% ≈ 12문항</strong> · 여러 설정 수단 중 하나를 고르는 형태로 출제됨</li>
          <li>챕터 6개 + 미니테스트 · 약 1.7시간 (세션 S8~S9)</li>
        </ul>
        <h4>다루는 범위</h4>
        <ul>
          <li><strong>CLAUDE.md 계층</strong>: 지시를 어디에 두는가 (Ch1)</li>
          <li><strong>커맨드·스킬</strong>: 반복 작업의 패키징 (Ch2)</li>
          <li><strong>경로별 규칙</strong>: 파일 위치에 따른 규칙 로딩 (Ch3)</li>
          <li><strong>plan mode vs 직접 실행</strong>: 계획을 먼저 세울 시점의 판단 (Ch4)</li>
          <li><strong>반복 개선 기법</strong>: 결과 품질을 높이는 대화 방식 (Ch5)</li>
          <li><strong>CI/CD 통합</strong>: 자동화 파이프라인에서의 실행 (Ch6)</li>
        </ul>
        <div class="callout">🎯 이 파트의 공통 질문: <b>"이 지시나 설정을 어디에 둘 것인가."</b> 판단 기준은 두 가지임. 누구에게 적용되는가(개인만? 팀 전체?), 그리고 언제 로드되는가(항상? 조건부? 호출 시?).</div>`},
      {type:"concept", kind:"CONCEPT · 개념 설명 ①", h:"먼저 그림부터: CLAUDE.md는 컴퓨터 어디에 있는 파일인가",
       html:`<p class="lead">CLAUDE.md는 <strong>일반 텍스트 파일</strong>임. "작업할 때 이 규칙을 지킬 것"이라고 적어 두는 지시문 파일임. 다만 <strong>어느 폴더에 두는가</strong>에 따라 적용 범위가 달라짐. 아래 그림의 세 위치가 전부임.</p>
        <div style="font-family:ui-monospace,Menlo,monospace;font-size:12.5px;line-height:2;background:var(--code-bg);border:1px solid var(--line);border-radius:10px;padding:14px 18px;margin:14px 0;overflow-x:auto">
🖥 <b>로컬 컴퓨터</b><br>
├─ 🏠 홈 폴더 <b>~</b> (사용자 계정의 개인 폴더)<br>
│&nbsp;&nbsp;&nbsp;└─ .claude/<br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ CLAUDE.md&nbsp;&nbsp;<span style="color:var(--accent)">← ① 사용자 레벨: 모든 프로젝트에 적용, 해당 사용자에게만</span><br>
│<br>
└─ 📁 our-shop/ (프로젝트 폴더 = 팀 저장소(repository)를 로컬 컴퓨터로 복제한 것)<br>
&nbsp;&nbsp;&nbsp;&nbsp;├─ CLAUDE.md&nbsp;&nbsp;<span style="color:var(--accent)">← ② 프로젝트 레벨: 이 프로젝트에서 팀 전체에게 적용</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;├─ backend/<br>
&nbsp;&nbsp;&nbsp;&nbsp;└─ frontend/<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ CLAUDE.md&nbsp;&nbsp;<span style="color:var(--accent)">← ③ 디렉토리 레벨: frontend 폴더 작업에만 추가 적용</span>
        </div>
        <h4>위치별 특성 한눈에</h4>
        <table>
          <tr><th>레벨</th><th>파일 위치</th><th>누구에게</th><th>팀 공유</th><th>여기 담는 것</th></tr>
          <tr><td>① 사용자</td><td><code>~/.claude/CLAUDE.md</code></td><td>본인만, 모든 프로젝트</td><td>❌ (로컬 컴퓨터에만)</td><td>개인 설정 ("응답은 한국어로")</td></tr>
          <tr><td>② 프로젝트</td><td>프로젝트 루트 <code>CLAUDE.md</code> 또는 <code>.claude/CLAUDE.md</code></td><td>이 프로젝트의 팀 전원</td><td>✅ (저장소에 커밋)</td><td>팀 표준 ("들여쓰기 4칸")</td></tr>
          <tr><td>③ 디렉토리</td><td>하위 폴더 안 <code>CLAUDE.md</code></td><td>그 폴더 작업 시 추가</td><td>✅</td><td>그 영역 전용 규칙</td></tr>
        </table>
        <h4>가장 자주 틀리는 지점</h4>
        <ul>
          <li>①만 <strong>팀 저장소 밖(사용자 홈 폴더)</strong>에 있음. 그래서 <strong>버전 관리로 공유되지 않음</strong>. "새 팀원에게 지시가 적용되지 않음" 문제의 원인은 대부분 ①에 들어 있는 팀 규칙임</li>
        </ul>
        <div class="callout">📖 용어 카드. <b>~ (물결)</b>: 사용자 홈 폴더의 줄임 표기임. 컴퓨터에서 사용자 계정에 할당된 개인 폴더를 가리킴. <b>저장소 복제(clone)</b>: 팀 공용 저장소를 로컬 컴퓨터로 통째로 내려받는 것임. ②③은 그 안에 있으므로 팀 전체가 같은 파일을 가짐.</div>`},
      {type:"concept", kind:"CONCEPT · 개념 설명 ②", h:"'연결 로드'의 실체: 세 파일이 하나의 지시문으로 합쳐진다",
       html:`<p class="lead">Claude가 frontend 폴더에서 작업을 시작하면 세 파일을 <strong>따로 참조하지 않음</strong>. 상위 경로에 있는 것부터 순서대로 <strong>이어 붙여 하나의 지시문으로 만든 뒤 전체를</strong> 읽음. 이것이 "연결(concatenate) 로드"임.</p>
        <div style="margin:16px 0">
          <div style="border:1px solid var(--line);border-radius:10px;padding:10px 14px;background:var(--surface)"><span class="eyebrow">① 사용자 ~/.claude/CLAUDE.md</span><br><code>응답은 한국어로 작성할 것</code></div>
          <div style="text-align:center;color:var(--dim);font-weight:800;line-height:1.6">＋</div>
          <div style="border:1px solid var(--line);border-radius:10px;padding:10px 14px;background:var(--surface)"><span class="eyebrow">② 프로젝트 our-shop/CLAUDE.md</span><br><code>들여쓰기는 4칸으로</code></div>
          <div style="text-align:center;color:var(--dim);font-weight:800;line-height:1.6">＋</div>
          <div style="border:1px solid var(--line);border-radius:10px;padding:10px 14px;background:var(--surface)"><span class="eyebrow">③ 디렉토리 frontend/CLAUDE.md</span><br><code>이 폴더는 들여쓰기 2칸으로</code></div>
          <div style="text-align:center;color:var(--accent);font-weight:800;line-height:2.2">↓ 상위 경로에 있는 것부터 순서대로 이어 붙임 ↓</div>
          <div style="border:2px solid var(--accent-line);border-radius:12px;padding:12px 16px;background:var(--accent-soft)"><span class="eyebrow">Claude가 실제로 읽는 것: 하나로 합쳐진 지시문</span><br>
            <code>1. 응답은 한국어로 작성할 것</code><br>
            <code>2. 들여쓰기는 4칸으로</code><br>
            <code>3. 이 폴더는 들여쓰기 2칸으로</code>
          </div>
        </div>
        <h4>이 그림이 보여 주는 규칙 세 가지</h4>
        <ul>
          <li><strong>덮어쓰기가 아니다</strong>: ③이 ②를 지우지 않음. 세 문장이 모두 남아 하나의 지시문에 들어감. 이것이 "연결"이라 부르는 이유임</li>
          <li><strong>충돌이 없으면 전부 적용</strong>: "한국어로"는 상충하는 지시가 없으므로 그대로 적용됨</li>
          <li><strong>충돌하는 경우(4칸 vs 2칸)</strong>: 작업 위치에 가까운 ③이 <strong>마지막에 읽히므로</strong> 그쪽이 적용될 가능성이 높음. 다만 공식 문서는 <strong>"충돌 시 임의로 하나를 고를 수 있다"</strong>고 명시함. 보장된 동작이 아니므로 <strong>충돌 자체를 만들지 않는 것이 정석임</strong> (예: ②를 "frontend 제외, 들여쓰기 4칸"으로 작성)</li>
        </ul>
        <h4>③에만 적용되는 규칙: 로드 시점이 다름</h4>
        <ul>
          <li>①②는 <strong>세션 시작 시 항상 로드됨</strong>. 로드 조건이 없음</li>
          <li>③(하위 디렉토리)은 <strong>frontend 폴더의 파일을 실제로 읽거나 수정할 때 로드됨</strong>. 상시 로드가 아니므로 토큰이 절약됨</li>
        </ul>
        <h4>공식 문서가 추가로 명시하는 내용</h4>
        <ul>
          <li><strong>CLAUDE.md는 컨텍스트일 뿐 강제 설정이 아님</strong>: "행동을 차단해야 하면 PreToolUse 훅(hook)을 쓸 것"이라고 공식 문서가 명시함 (원칙 ①: 반드시 지켜야 하는 것은 프롬프트가 아니라 설정으로 강제한다)</li>
          <li>계층은 실제로 네 단계임: 조직 관리(managed policy) → ① → ② → <code>CLAUDE.local.md</code>(개인용 프로젝트 메모, .gitignore 대상)</li>
          <li>@import는 <strong>최대 4단계</strong>까지 재귀 가능함. 백틱(\`)으로 감싼 @경로는 임포트되지 않음</li>
          <li>.claude/rules/에서 <strong>paths가 없는 규칙은 상시 로드됨</strong>. 조건부 규칙(conditional rules)이 되려면 paths가 있어야 함</li>
        </ul>
        <h4>모듈화 수단 2가지</h4>
        <ul>
          <li><code>@import</code>: 다른 파일을 참조로 불러와 CLAUDE.md의 분량을 줄임 (원본은 한 곳에 두고 필요한 것만 포함함)</li>
          <li><code>.claude/rules/</code>: 주제별 파일(testing.md, api-conventions.md)로 분할함</li>
        </ul>
        <div class="callout">📖 용어 카드. <b>/memory 슬래시 커맨드(slash command)</b>: 현재 세션에 어떤 메모리 파일이 로드됐는지 확인하는 명령임. "세션마다 행동이 다름" 문제의 진단 수단임.</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"어디에 둘 것인가: 진단과 처방",
       html:`__MAP3:hier__<h4>케이스 1: 새 팀원에게 코딩 표준이 적용되지 않음</h4>
        <ul>
          <li>진단: 표준이 작성자의 <code>~/.claude/CLAUDE.md</code>(사용자 레벨)에 있었음</li>
          <li>처방: 프로젝트 레벨로 이동함. 저장소를 복제하면 전원에게 적용됨</li>
        </ul>
        <h4>케이스 2: 모노레포, 패키지마다 다른 표준</h4>
        <ul>
          <li>처방: 각 패키지 CLAUDE.md에서 <strong>@import로 관련 표준 파일만 선택해 포함함</strong></li>
          <li>패키지 관리자가 자신의 도메인 지식을 근거로 필요한 표준을 선택함</li>
        </ul>
        <h4>케이스 3: CLAUDE.md가 800줄까지 커짐</h4>
        <ul>
          <li>처방: <code>.claude/rules/</code>에 주제별로 분할함 (testing.md / api-conventions.md / deployment.md)</li>
        </ul>
        <h4>케이스 4: 세션마다 다르게 동작함</h4>
        <ul>
          <li>진단 수단: <code>/memory</code>로 어떤 파일이 로드됐는지 먼저 확인함</li>
        </ul>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: The ghost convention",
       q:`Three weeks ago your team deleted the "always write JSDoc for every function" rule from the project CLAUDE.md — yet on your machine, Claude still adds JSDoc everywhere, while teammates' sessions stopped. You've pulled latest; the rule is confirmed gone from the repo. What is the right diagnostic step, and the likely finding?`,
       opts:[
         {t:`Run /memory to list which memory files are actually loaded this session — you'll likely find a stale copy of the rule in your user-level ~/.claude/CLAUDE.md that loads alongside the project file.`, ok:true},
         {t:`Restart Claude Code to flush its instruction cache; deleted rules can linger in memory for several weeks.`},
         {t:`Re-clone the repository from scratch — your working copy's CLAUDE.md is probably corrupted.`},
         {t:`Add an explicit counter-rule to the project CLAUDE.md: "do not write JSDoc unless asked."`},
       ],
       hint:`특정 사용자에게만 나타나고 팀원에게는 나타나지 않는 지시 문제이며, 저장소에는 해당 규칙이 남아 있지 않음. 지시가 어디에서 로드되는지 확인하는 수단을 먼저 사용할 것.`,
       explain:{
         good:`세션 간, 사람 간 행동 차이의 1차 진단은 /memory임. 어떤 파일이 로드됐는지 먼저 확인함(3.1). 저장소에 규칙이 없는데 특정 사용자에게만 나타난다면 남는 원인은 그 사용자의 사용자 레벨 파일임. 계층은 겹쳐 로드되므로 거기 남은 사본이 원인임.`,
         wrongs:[
           `<b>B(재시작·캐시):</b> "몇 주간 유지되는 지시 캐시"는 존재하지 않는 동작임. 그럴듯하게 꾸며 낸 선택지임.`,
           `<b>C(저장소 재복제):</b> 저장소는 이미 확인됐음. 주어진 근거와 무관한 조치임.`,
           `<b>D(반대 규칙 추가):</b> 지시로 지시를 덮는 방식은 동작이 보장되지 않고, 팀원에게는 불필요한 규칙이 추가됨. 원인이 되는 파일을 제거하는 것이 맞음.`,
         ]},
       principle:"진단 먼저: /memory로 로드 목록 확인"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2: The monorepo standards",
       q:`Your monorepo has packages/web, packages/api, and packages/data-pipeline, each needing different subsets of the company's 12 standards documents. Package maintainers know best which standards apply to them. What is the most maintainable setup?`,
       opts:[
         {t:`Keep the 12 standards as separate files and have each package's CLAUDE.md use @import to include only the relevant ones, curated by that package's maintainer.`, ok:true},
         {t:`Paste all 12 standards into the root CLAUDE.md so every package inherits everything.`},
         {t:`Duplicate the relevant standards' text into each package's CLAUDE.md.`},
         {t:`Keep standards in a wiki and instruct developers to paste relevant sections into prompts as needed.`}],
       hint:`"필요한 것만 선택해 포함하고 원본은 한 곳에 둔다"를 가능하게 하는 문법이 무엇인지 확인할 것.`,
       explain:{
         good:`@import의 용도임. 표준 원본은 한 곳에 두고 각 패키지 CLAUDE.md가 필요한 것만 참조함. 패키지 관리자의 도메인 지식으로 선별한다는 가이드 3.1의 시나리오와 동일함.`,
         wrongs:[
           `<b>B:</b> 모든 패키지에 무관한 표준까지 로드됨. 컨텍스트가 낭비되고 지시가 상충할 위험이 있음.`,
           `<b>C:</b> 복사본이 12개 생김. 표준이 바뀔 때마다 전부 수동으로 동기화해야 하므로 유지보수 비용이 커짐.`,
           `<b>D:</b> 사람이 매번 붙여 넣는 방식은 자동 로드라는 CLAUDE.md의 용도를 포기하는 것임.`,
         ]},
       principle:"원본은 하나, 포함은 @import로 선택"},
    ]},

  /* ===== CH 2 · 3.2 커맨드와 스킬 ===== */
  { id:"p3c2", ch:"CH 2", title:"커스텀 슬래시 커맨드와 스킬 (3.2)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"반복 작업을 패키징하는 두 가지 방법",
       html:`<h4>슬래시 커맨드</h4>
        <ul>
          <li><code>/review</code>처럼 타이핑해서 실행하는 저장된 프롬프트</li>
          <li><strong>프로젝트</strong> <code>.claude/commands/</code>: 저장소에 커밋되어 팀 전체가 공유함</li>
          <li><strong>개인</strong> <code>~/.claude/commands/</code>: 해당 사용자에게만 적용됨</li>
        </ul>
        <h4>스킬 (Skills)</h4>
        <ul>
          <li><code>.claude/skills/</code> 폴더의 <code>SKILL.md</code>: 더 복잡한 작업을 담는 패키지임</li>
          <li>파일 맨 위 <strong>YAML frontmatter</strong>로 동작을 설정함. frontmatter는 파일 첫머리에 ---로 감싸 넣는 설정 구역이고, YAML은 그 안을 "이름: 값" 형태로 적는 표기법임</li>
        </ul>
        <h4>frontmatter 3종 (암기 필수)</h4>
        <ul>
          <li><code>context: fork</code>: 스킬을 <strong>격리된 컨텍스트</strong>에서 실행함. 분량이 큰 출력이 본 대화에 남지 않음</li>
          <li><code>allowed-tools</code>: 스킬 실행 중 <strong>사용 가능한 도구를 제한함</strong> (파일 삭제처럼 되돌릴 수 없는 동작을 막음)</li>
          <li><code>argument-hint</code>: 인자 없이 호출하면 <strong>필요한 파라미터를 요청함</strong></li>
        </ul>
        <div class="callout">📖 용어 카드. <b>YAML frontmatter</b>: 파일 맨 위 <code>---</code> 두 줄 사이에 쓰는 설정 구역임.</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"스킬 설계와 배치 위치 판단",
       html:`__MAP3:skills__<h4>frontmatter 사용 시나리오</h4>
        <ul>
          <li>코드베이스 분석처럼 <strong>출력 분량이 큰 스킬</strong>: <code>context: fork</code>로 격리하고 요약만 본 대화로 전달함</li>
          <li>브레인스토밍처럼 <strong>탐색 컨텍스트</strong>가 쌓이는 스킬도 fork 대상임</li>
          <li>파일 생성 스킬이 파일을 삭제하지 않게 하려면 <code>allowed-tools</code>를 쓰기 계열 도구로 제한함</li>
          <li>대상 디렉토리 같은 필수 인자는 <code>argument-hint</code>로 요구함</li>
        </ul>
        <h4>개인 커스터마이징</h4>
        <ul>
          <li>팀 스킬을 개인 방식대로 바꾸려면 <code>~/.claude/skills/</code>에 <strong>다른 이름으로 개인 변형을 만듦</strong>. 팀 스킬 파일은 수정하지 않음</li>
        </ul>
        <h4>스킬과 CLAUDE.md의 판단 기준</h4>
        <ul>
          <li><strong>스킬</strong>은 필요할 때 호출하는 작업별 워크플로임</li>
          <li><strong>CLAUDE.md</strong>는 항상 로드되는 보편 표준임</li>
          <li>판별 기준은 "매번 적용돼야 하는가"임. 그렇다면 CLAUDE.md, 특정 작업에서만 필요하다면 스킬임</li>
        </ul>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: Three needs, three homes",
       q:`Your team has three requirements: (1) a "generate release notes from merged PRs" workflow every developer should run on demand; (2) your personal shortcut that reformats commit messages your preferred way; (3) the API error-handling standard that must shape every piece of generated code, always, for everyone. Which allocation is correct?`,
       opts:[
         {t:`(1) a project-scoped command/skill in .claude/, shared via version control; (2) a user-scoped command in ~/.claude/commands/; (3) the project CLAUDE.md, since universal standards must load on every session rather than wait to be invoked.`, ok:true},
         {t:`All three as project-scoped skills — skills are the most capable packaging, and consistency of mechanism simplifies maintenance.`},
         {t:`(1) and (3) as project skills invoked when relevant; (2) in the project CLAUDE.md marked "for Kim only."`},
         {t:`All three in the project CLAUDE.md — fewer moving parts than commands and skills combined.`},
       ],
       hint:`두 가지 기준으로 나눌 것. 누구에게 적용되는가(팀/개인), 언제 로드되는가(호출 시/항상). (3)의 "always"가 결정적 단서임.`,
       explain:{
         good:`3.2의 배치 원칙임. 필요할 때 호출하는 팀 워크플로는 프로젝트 커맨드나 스킬, 개인 설정은 사용자 스코프, 항상 적용돼야 하는 보편 표준은 CLAUDE.md임. (3)을 스킬로 만들면 호출해야 로드되므로 매번 적용된다는 보장이 없음. 이 지점이 이 문제에서 자주 틀리는 부분임.`,
         wrongs:[
           `<b>B(전부 스킬):</b> (3)이 어긋남. 표준이 호출될 때만 적용되므로 상당수 코드가 표준을 벗어난 상태로 생성됨. (2)는 개인 설정을 팀 저장소에 넣는 배치임.`,
           `<b>C(표준을 스킬로):</b> "관련될 때 호출"은 항상 적용돼야 한다는 요구와 맞지 않음. 개인 설정을 팀 파일에 넣은 것도 배치가 반대임.`,
           `<b>D(전부 CLAUDE.md):</b> 필요할 때만 쓰는 워크플로가 모든 세션에 상시 로드됨. 토큰이 낭비되고 개인 설정이 팀 전원에게 적용됨.`,
         ]},
       principle:"누구에게, 언제. 두 기준으로 배치"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2: Designing the audit skill",
       q:`You are building a dependency-audit skill that (a) produces extremely verbose scan output that shouldn't pollute the main conversation, (b) must never modify or delete files — read-only analysis, and (c) requires a target directory that developers keep forgetting to pass. Which frontmatter configuration is correct?`,
       opts:[
         {t:`context: fork to isolate the verbose output, allowed-tools restricted to read-only tools, and argument-hint to prompt for the target directory.`, ok:true},
         {t:`context: fork alone — isolation automatically prevents file modification and handles missing arguments.`},
         {t:`allowed-tools alone — restricting tools also isolates output and can define default arguments.`},
         {t:`Write the three requirements as instructions in the skill's prompt body, since frontmatter is only for metadata.`}],
       hint:`요구사항이 세 개이고 frontmatter 옵션도 세 개임. 각 요구사항을 옵션 하나씩에 연결할 것.`,
       explain:{
         good:`요구사항과 옵션이 1대1로 대응함. 출력 격리는 context: fork, 읽기 전용 강제는 allowed-tools, 필수 인자 요구는 argument-hint임. 세 옵션은 역할이 달라 서로를 대체하지 못함.`,
         wrongs:[
           `<b>B:</b> fork는 컨텍스트 격리만 담당함. 도구 제한과 인자 요구는 하지 않음.`,
           `<b>C:</b> allowed-tools는 도구 제한만 담당함. 출력은 여전히 본 대화로 들어옴.`,
           `<b>D:</b> 프롬프트 본문에 적은 지시는 지켜진다는 보장이 없음. "수정 금지"는 allowed-tools로 강제해야 함 (원칙 ①: 반드시 지켜야 하는 것은 설정으로 강제한다).`,
         ]},
       principle:"강제는 설정으로. frontmatter 3종의 역할 구분"},
    ]},

  /* ===== CH 3 · 3.3 경로별 규칙 ===== */
  { id:"p3c3", ch:"CH 3", title:"경로별 규칙: 조건부 컨벤션 로딩 (3.3)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"글롭 패턴(glob pattern): 여러 파일을 조건 한 줄로 지정하는 경로 표기법",
       html:`<p class="lead">이 챕터에서 다루는 설정은 <strong>.claude/rules/ 와 paths</strong>임. paths에 적는 <strong>글롭 패턴</strong>을 먼저 알아야 함. 이것을 모르면 이후 내용을 읽을 수 없음.</p>
        <h4>① 왜 필요한가: "어떤 파일을 편집할 때 이 규칙을 적용할 것인가"</h4>
        <ul>
          <li>규칙 파일에는 <strong>적용될 조건</strong>을 적어야 함. 대상 파일이 수백 개라면 이름을 전부 나열할 수 없음</li>
          <li>글롭 패턴은 여러 파일을 <strong>조건 한 줄로 지정하는 표기법</strong>임. "terraform 폴더 아래 전부" 같은 조건을 프로그램이 읽을 수 있는 형태로 적은 것임</li>
        </ul>
        <h4>② 기호는 두 개뿐</h4>
        <ul>
          <li><code>*</code>: <strong>이름 한 단계</strong>를 대신함. 폴더 경계(/)를 <strong>넘지 못함</strong>. <code>*.ts</code>는 "이름은 무엇이든, 확장자가 .ts인 파일"이라는 뜻임</li>
          <li><code>**</code>: <strong>폴더 몇 단계든</strong> 대신함. 깊이에 상관없이 하위 폴더 전체를 포함함</li>
        </ul>
        <h4>③ 읽는 법: 왼쪽부터 끊어 읽음</h4>
        <ul>
          <li><code>src/api/**/*.ts</code>는 <code>src/api/</code>(시작 위치) + <code>**/</code>(하위 폴더 몇 단계든) + <code>*.ts</code>(이름은 무엇이든 .ts로 끝남)으로 나뉨</li>
          <li>한국어로 옮기면 <strong>"src/api 아래에 있다면 깊이에 상관없이 모든 .ts 파일"</strong>임</li>
        </ul>
        <div style="font-family:ui-monospace,Menlo,monospace;font-size:12.5px;line-height:2;background:var(--code-bg);border:1px solid var(--line);border-radius:10px;padding:14px 18px;margin:14px 0;overflow-x:auto">
<b>paths: ["src/api/**/*.ts"]</b> 가 적용되는 파일<br>
📁 src/<br>
&nbsp;&nbsp;├─ api/<br>
&nbsp;&nbsp;│&nbsp;&nbsp;├─ index.ts&nbsp;&nbsp;<span style="color:var(--accent)">✅ 매칭 (바로 아래 깊이도 포함)</span><br>
&nbsp;&nbsp;│&nbsp;&nbsp;├─ README.md&nbsp;&nbsp;❌ 끝이 .ts가 아님<br>
&nbsp;&nbsp;│&nbsp;&nbsp;└─ v2/handlers/<br>
&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ payment.ts&nbsp;&nbsp;<span style="color:var(--accent)">✅ 매칭 (**가 v2/handlers 아래까지 포함)</span><br>
&nbsp;&nbsp;└─ web/<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ app.ts&nbsp;&nbsp;❌ src/api 밖<br>
<br>
같은 자리에 <b>*</b> 하나만 쓰면 <b>src/api/*.ts</b> 가 되어 payment.ts는 ❌ (한 단계를 넘어가므로 매칭되지 않음. 자주 틀리는 지점)
        </div>
        <h4>④ .claude/rules/ 와 paths</h4>
        <ul>
          <li>규칙 .md 파일의 YAML frontmatter에 <code>paths: ["terraform/**/*"]</code>처럼 글롭 패턴을 지정함</li>
          <li>효과: <strong>매칭되는 파일을 편집할 때만</strong> 그 규칙이 컨텍스트에 로드됨</li>
          <li>이점: 무관한 컨텍스트가 줄어 <strong>토큰이 절약되고</strong> 지시 간섭도 감소함</li>
        </ul>
        <h4>⑤ 글롭 패턴이 출제되는 두 지점</h4>
        <ul>
          <li><code>.claude/rules/</code>의 <code>paths</code>(이 챕터): 규칙을 <strong>언제 로드할지</strong> 정하는 조건임</li>
          <li>기본 제공 도구(built-in tools)인 <code>Glob</code>(2.5): 같은 문법으로 <strong>파일을 찾는</strong> 도구임. 문법은 같고 용도가 다름</li>
          <li><strong>CLAUDE.md에는 글롭 패턴이 쓰이지 않음</strong>. 항상 로드되므로 조건이 필요 없음. 글롭 패턴은 조건부 로딩을 만들 때만 사용함</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"글롭 규칙과 디렉토리 CLAUDE.md의 선택 기준",
       html:`__MAP3:rules__<h4>결정 기준: 대상 파일이 어디에 있는가</h4>
        <ul>
          <li>대상이 <strong>한 폴더에 모여</strong> 있으면 디렉토리 CLAUDE.md도 사용 가능함</li>
          <li>대상이 <strong>코드베이스 전역에 흩어져</strong> 있으면(Button.test.tsx가 Button.tsx 옆에 있는 구조) <strong>글롭 규칙이 정답임</strong></li>
          <li>디렉토리 CLAUDE.md는 특정 폴더에만 적용되므로 흩어진 파일을 포괄하지 못함</li>
        </ul>
        <h4>공식 가이드 샘플 문제 6번 (가이드 말미 예시 12문항 중 하나로, 흩어져 있는 컨벤션의 자동 적용을 묻는 문제)</h4>
        <ul>
          <li>React 컴포넌트, API 핸들러, DB 모델, 테스트가 각각 다른 컨벤션을 따름</li>
          <li>테스트 파일은 코드 옆에 흩어져 있고, 요구사항에 "자동 적용"이 명시됨</li>
          <li>정답은 <code>.claude/rules/</code>와 글롭 패턴임 (스킬은 호출해야 하므로 자동 적용이 되지 않고, 루트 CLAUDE.md 한 파일에 몰아넣는 방식은 모델의 추론에 의존함)</li>
        </ul>
        <div class="callout">🎯 시험 포인트: "spread throughout the codebase"와 "automatically"가 함께 보이면 글롭 규칙이 정답임.</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: The rule that won't fire",
       q:`You created .claude/rules/api-conventions.md with frontmatter paths: ["src/api/*.ts"]. It works when editing src/api/index.ts, but the conventions never load for src/api/v2/handlers/payment.ts or src/api/middleware/auth/verify.ts — where most API code actually lives. The rule file's content is correct. What is wrong?`,
       opts:[
         {t:`The glob src/api/*.ts matches only files directly inside src/api/, not nested subdirectories — change it to src/api/**/*.ts so the rule fires at any depth.`, ok:true},
         {t:`Rules can only match files up to one directory deep by design; nested conventions need per-directory CLAUDE.md files.`},
         {t:`The frontmatter needs multiple entries — paths accepts only one directory level per pattern, so each subdirectory must be listed.`},
         {t:`YAML frontmatter is case-sensitive about the paths key; it should be capitalized as Paths.`},
       ],
       hint:`적용되는 파일과 적용되지 않는 파일의 경로를 나란히 비교할 것. 차이는 경로 깊이 하나임. *와 **의 차이를 확인할 것.`,
       explain:{
         good:`글롭 문법 판독임. *는 이름 한 단계, **는 모든 하위 폴더를 의미함. 중첩된 폴더 구조에서 규칙이 로드되지 않으면 대부분 **가 빠진 경우임. 시험도 이런 패턴 판독을 요구함.`,
         wrongs:[
           `<b>B(깊이 제한):</b> 존재하지 않는 제약임. **가 바로 이 경우를 위해 있는 문법임.`,
           `<b>C(폴더별 나열):</b> 하위 폴더가 새로 생길 때마다 목록을 갱신해야 함. ** 하나로 해결되는 일을 유지보수 부담으로 바꾸는 선택임.`,
           `<b>D(대문자 Paths):</b> 존재하지 않는 문법 규칙임. 오답 유도 선택지임.`,
         ]},
       principle:"* 는 한 층, ** 는 전부"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2: The overloaded context",
       q:`Your root CLAUDE.md now carries Terraform conventions, React style rules, SQL migration policies, and API design standards (1,100 lines). Developers editing a single React component get all of it loaded, and Claude occasionally applies Terraform advice to React code. What is the best restructuring?`,
       opts:[
         {t:`Split the conventions into .claude/rules/ files with path scoping — e.g., paths: ["terraform/**/*"] for Terraform, ["src/**/*.tsx"] for React — so each loads only when matching files are edited.`, ok:true},
         {t:`Keep the root CLAUDE.md but add clearer section headers so Claude knows which section to apply.`},
         {t:`Move all conventions into the user-level ~/.claude/CLAUDE.md to shorten the project file.`},
         {t:`Convert each convention set into a slash command developers run before editing.`}],
       hint:`증상이 두 가지임. 토큰 낭비와 규칙 간섭(Terraform 조언이 React 코드에 적용됨)임. 두 증상 모두 모든 규칙이 항상 로드되는 구조에서 발생함.`,
       explain:{
         good:`조건부 로딩이 두 증상을 함께 해결함. 매칭되는 파일을 편집할 때만 해당 규칙이 로드되므로 토큰이 절약되고 무관한 규칙의 간섭이 사라짐. 가이드 3.1과 3.3을 결합한 형태임.`,
         wrongs:[
           `<b>B:</b> 헤더를 정리해도 모델의 추론에 의존하는 상태는 그대로임. 전부 로드되는 구조가 바뀌지 않음.`,
           `<b>C:</b> 팀 공유가 끊김. 문제를 다른 위치로 옮긴 것에 불과함.`,
           `<b>D:</b> 커맨드는 수동으로 호출해야 함. 컨벤션의 자동 적용이라는 목적과 맞지 않음.`,
         ]},
       principle:"항상 로드 대신 조건부 로딩"},
    ]},

  /* ===== CH 4 · 3.4 plan mode vs 직접 실행 ===== */
  { id:"p3c4", ch:"CH 4", title:"plan mode vs 직접 실행 (3.4)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"계획을 먼저 세울 작업과 바로 실행할 작업",
       html:`<h4>plan mode</h4>
        <ul>
          <li>코드 수정 전에 <strong>탐색과 설계만</strong> 하는 모드임. 먼저 조사하고 접근 방식을 정한 뒤 실행함</li>
          <li>적합한 경우: <strong>대규모 변경 · 유효한 접근이 여러 개 · 아키텍처 결정 · 다중 파일 수정</strong></li>
          <li>예: 모놀리스에서 마이크로서비스로의 전환(하나로 합쳐진 애플리케이션을 작은 서비스 여러 개로 분리하는 작업), 파일 45개 이상을 수정해야 하는 라이브러리 마이그레이션(사용하던 라이브러리를 다른 라이브러리로 전면 교체), 인프라 요구사항이 서로 다른 통합 방식 중 하나를 선택하는 작업</li>
        </ul>
        <h4>직접 실행</h4>
        <ul>
          <li>적합한 경우: <strong>범위가 명확한 단순 변경</strong></li>
          <li>예: 스택 트레이스가 있는 단일 파일 버그, 날짜 검증 조건 하나 추가</li>
        </ul>
        <div class="callout">📖 지문 독해 용어 카드 (시험 지문에 자주 나오는 4종). <b>crash</b>: 프로그램이 에러로 강제 종료되는 것임. <b>null</b>: 값이 없는 상태임. "crashes on null input"은 빈 값이 들어오면 프로그램이 종료된다는 뜻임. <b>stack trace</b>: 프로그램이 종료될 때 자동으로 출력되는 오류 기록이며, 어느 파일 몇 번째 줄에서 어떤 에러가 났는지 담김. 지문에 "stack trace makes the cause clear"가 있으면 <b>원인 진단이 이미 끝났다</b>는 뜻임. <b>guard clause</b>: 함수 첫머리에서 잘못된 입력을 걸러 내는 한 줄 코드임. "one-line guard clause fixes it"은 수정이 한 줄로 끝난다는 뜻임.</div>
        <div class="callout">🎯 독해 기준: stack trace가 명확하고, 수정이 한 줄이며, 기존(existing) 테스트가 있으면 절차를 추가하는 선택지(plan mode, Explore, fork)는 전부 오답임. already와 existing에 표시하며 읽을 것.</div>
        <h4>Explore 서브에이전트(subagent)</h4>
        <ul>
          <li>분량이 큰 <strong>탐색 출력을 격리</strong>하고 요약만 반환함. 본 대화의 컨텍스트가 보존됨</li>
          <li>다단계 작업에서 컨텍스트 고갈을 막는 수단임</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"판단 기준과 두 모드의 조합",
       html:`__MAP3:mode__<h4>판단 기준 세 가지</h4>
        <ul>
          <li>유효한 접근이 <strong>여러 개</strong>인가. 그렇다면 plan mode임</li>
          <li>수정할 파일이 <strong>몇 개</strong>인가. 많으면 plan mode임</li>
          <li>이미 <strong>수정 방법이 명확</strong>한가(스택 트레이스, 한 줄 수정). 그렇다면 직접 실행임</li>
        </ul>
        <h4>조합 패턴</h4>
        <ul>
          <li><strong>plan mode로 조사와 설계를 하고 직접 실행으로 구현함</strong>. 마이그레이션의 기본 절차임</li>
          <li>탐색 단계가 길면 <strong>Explore 서브에이전트</strong>로 탐색 출력을 격리함</li>
        </ul>
        <h4>오답 유도 선택지 (공식 가이드 샘플 5번, plan mode와 직접 실행을 구분하는 문제 기준)</h4>
        <ul>
          <li>"일단 직접 실행으로 시작하고 복잡해지면 plan mode로 전환한다": 복잡성이 <strong>이미 요구사항에 명시</strong>돼 있는데 이를 무시하는 선택지임</li>
          <li>"구현하면서 작업 범위를 발견한다": 뒤늦은 재작업을 초래하는 선택지임</li>
        </ul>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: The fix that grew",
       q:`You started in direct execution to fix "a timezone bug in the invoice renderer" — a clear, single-file task. Ten minutes in, Claude reports the real cause: three services each apply their own timezone conversion, sometimes double-converting; a proper fix means choosing where conversion should live and touching ~20 files. There are at least two defensible designs. What should you do?`,
       opts:[
         {t:`Stop implementing and switch to plan mode: explore the three services' conversion paths and design the approach — this has become an architectural decision with multiple valid options.`, ok:true},
         {t:`Stay in direct execution but patch the renderer to compensate for the double conversion — the original ticket only covered the renderer.`},
         {t:`Stay in direct execution and fix all ~20 files now, since Claude has already identified the root cause and momentum matters.`},
         {t:`Abandon the session and open a fresh one in plan mode, since mode decisions must be made before work begins.`},
       ],
       hint:`작업의 실제 복잡도가 방금 달라졌음. 모드는 티켓 제목이 아니라 드러난 복잡도를 기준으로 정함. D의 전제가 사실인지도 확인할 것.`,
       explain:{
         good:`3.4의 판단 기준은 작업 시작 시점에 고정되지 않음. 단순해 보였던 작업이 아키텍처 결정(유효한 설계 복수 + 파일 20개)으로 드러나면 그 시점에 plan mode로 전환하는 것이 맞음. 조사와 설계 후 직접 실행으로 구현하는 조합 패턴이 실제로 적용되는 형태임.`,
         wrongs:[
           `<b>B(렌더러 보정 패치):</b> 이중 변환 위에 보정을 한 번 더 얹는 방식임. 근본 원인을 알고도 증상만 가리는 선택임.`,
           `<b>C(설계 없이 파일 20개 수정):</b> 유효한 설계 두 가지 중 무엇을 택할지 정하지 않은 상태에서 실행부터 시작함. 재작업이 발생함.`,
           `<b>D(새 세션 시작):</b> 모드는 세션 도중에도 전환 가능함. 지금까지의 탐색으로 확보한 원인 정보를 버릴 이유가 없음.`,
         ]},
       principle:"복잡도가 드러나면 모드를 전환한다"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2: The vanishing context",
       q:`A multi-phase task requires first exploring a large codebase (which produces thousands of lines of file listings and searches), then designing and implementing a fix. In past attempts, by the time implementation started, the main conversation was full of exploration noise and Claude had lost track of the design. What is the best structural fix?`,
       opts:[
         {t:`Delegate the verbose discovery phase to the Explore subagent, which returns concise summaries, keeping the main conversation focused on design and implementation.`, ok:true},
         {t:`Ask Claude to "keep responses short" during exploration to reduce noise.`},
         {t:`Split the work across three separate sessions: one for exploration, one for design, one for implementation.`},
         {t:`Skip exploration and implement directly from the task description to save context.`}],
       hint:`분량이 큰 탐색 출력을 격리하고 요약만 받는 전용 수단이 무엇인지 확인할 것.`,
       explain:{
         good:`Explore 서브에이전트의 용도임. 탐색 출력을 격리하고 요약만 본 대화로 전달해 컨텍스트 고갈을 막음. 가이드 3.4에 명시된 패턴임.`,
         wrongs:[
           `<b>B:</b> 짧게 답하라는 요청은 지켜진다는 보장이 없고, 탐색에 필요한 정보량 자체도 줄지 않음.`,
           `<b>C:</b> 세션을 나누면 설계 컨텍스트를 매번 다시 전달해야 함. 격리가 아니라 정보 단절임.`,
           `<b>D:</b> 탐색을 생략하면 파악되지 않은 코드를 추측으로 수정하게 됨.`,
         ]},
       principle:"탐색 출력은 Explore로 격리"},
    ]},

  /* ===== CH 5 · 3.5 반복 개선 기법 ===== */
  { id:"p3c5", ch:"CH 5", title:"반복 개선 기법 (3.5)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"결과 품질을 높이는 네 가지 대화 기법",
       html:`<h4>① 구체적 입출력 예시</h4>
        <ul>
          <li>문장으로 설명한 변환 요구가 <strong>일관되지 않게 해석</strong>될 때는 <strong>예시 2~3개</strong>를 제시하는 것이 가장 효과가 큼</li>
          <li>엣지 케이스(예: 마이그레이션 중 null(값 없음)이 들어오는 경우)는 입력과 기대 출력을 함께 담은 테스트 케이스로 제시함</li>
        </ul>
        <h4>② 테스트 주도 반복</h4>
        <ul>
          <li>기대 동작, 엣지 케이스, 성능을 포함하는 <strong>테스트를 먼저</strong> 작성하고, 실패한 결과를 공유하며 점진적으로 개선함</li>
        </ul>
        <h4>③ 인터뷰 패턴</h4>
        <ul>
          <li>구현 전에 <strong>Claude가 질문하도록</strong> 함. 개발자가 놓친 고려사항을 찾아냄. 예: 캐시 무효화(저장해 둔 이전 결과를 언제 폐기할지), 실패 모드(어떤 방식으로 동작이 깨질 수 있는지)</li>
          <li>익숙하지 않은 도메인일수록 효과가 큼</li>
        </ul>
        <h4>④ 한 번에 전달할지, 순차로 전달할지</h4>
        <ul>
          <li>문제들이 <strong>서로 영향을 주고받으면(interacting)</strong> 한 메시지에 상세히 함께 담음</li>
          <li><strong>독립적</strong>이면 하나씩 순차로 수정함</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"증상별 처방 매칭",
       html:`__MAP3:iterate__<h4>증상과 기법의 대응표</h4>
        <ul>
          <li>"설명은 자세히 했으나 출력 형식이 매번 다름": <strong>입출력 예시</strong></li>
          <li>"수정했다고 하지만 엣지 케이스에서 여전히 실패함": <strong>구체적 테스트 케이스</strong>(null 입력과 기대 출력)</li>
          <li>"요구사항을 다 전달했다고 생각했으나 빠진 항목이 계속 발견됨": <strong>인터뷰 패턴</strong>(구현 전에 질문을 받음)</li>
          <li>"버그 5개를 하나씩 고치니 서로를 다시 깨뜨림": <strong>서로 영향을 주는 문제는 한 메시지에 함께 전달함</strong></li>
        </ul>
        <div class="callout">🎯 시험 포인트: "prose 설명이 일관되지 않게 해석된다(interpreted inconsistently)"는 표현이 보이면 정답은 대부분 concrete examples임.</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: Five bugs, one queue",
       q:`Five bug reports landed on the checkout module: #1 and #2 both involve the shared CartState cache — last sprint, fixing one broke the other; #3 is a typo in an error message, #4 a broken date formatter in receipts, #5 a missing null check in an unrelated utility. How should you feed these to Claude Code?`,
       opts:[
         {t:`Present #1 and #2 together in one detailed message so their shared-state interaction is solved jointly; handle #3, #4, and #5 as separate sequential fixes since they're independent.`, ok:true},
         {t:`All five in one message — a single comprehensive pass ensures nothing gets forgotten and gives Claude full context.`},
         {t:`All five sequentially, hardest first — one problem at a time is always cleaner to review and test.`},
         {t:`#1 and #2 sequentially with a regression test added between them; #3-#5 batched into one cleanup message.`},
       ],
       hint:`가이드의 기준은 문제의 개수가 아니라 문제 사이의 상호작용임. 어떤 쌍이 서로를 다시 깨뜨렸는지 지문의 이력에 단서가 있음.`,
       explain:{
         good:`3.5의 배분 원칙임. 상호작용하는 문제(#1과 #2, 공유 상태)는 한 메시지에 함께 담아 동시에 조율하고, 독립적인 문제는 순차로 처리함. 지난 스프린트에 하나를 고치면 다른 하나가 깨졌다는 이력이 상호작용의 근거임.`,
         wrongs:[
           `<b>B(전부 한 번에):</b> 무관한 5개를 섞으면 각 문제에 배분되는 주의가 분산됨. 상호작용하는 것만 묶는 것이 원칙이며 많이 묶는 것이 원칙은 아님.`,
           `<b>C(전부 순차):</b> #1과 #2를 따로 고치면 지난번과 같은 실패가 반복됨. 상호작용하는 쌍은 개별 처리로 해결되지 않음.`,
           `<b>D(상호작용하는 문제를 순차 처리하고 회귀 테스트 추가):</b> 테스트는 문제 발생을 탐지할 뿐임. 상호작용의 조율은 두 문제를 함께 볼 때만 가능함.`,
         ]},
       principle:"상호작용하면 묶고, 독립이면 나눈다"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2: The unknown domain",
       q:`You ask Claude to implement a caching layer for a domain you barely know. Past attempts produced working code that later failed in ways you hadn't anticipated (stale invalidation, thundering herd). What interaction pattern best prevents this?`,
       opts:[
         {t:`Use the interview pattern: have Claude ask you clarifying questions before implementing, surfacing considerations like invalidation strategy and failure modes upfront.`, ok:true},
         {t:`Ask Claude to implement the cache, then review the code yourself for missed considerations.`},
         {t:`Provide a longer prompt listing every caching concern you can think of.`},
         {t:`Have Claude generate three alternative implementations and pick the most robust-looking one.`}],
       hint:`원인은 익숙하지 않은 도메인이라 무엇을 요구해야 할지 모른다는 점임. 그 빈틈을 누가 먼저 질문으로 채워야 하는지 생각할 것.`,
       explain:{
         good:`인터뷰 패턴을 쓰는 지점임. 익숙하지 않은 도메인에서 개발자가 예상하지 못한 고려사항(캐시 무효화, 실패 모드)을 구현 전에 질문으로 찾아냄. 가이드 3.5의 내용과 동일함.`,
         wrongs:[
           `<b>B:</b> 익숙하지 않은 도메인이므로 리뷰에서도 같은 항목을 놓침. 문제가 해결되지 않음.`,
           `<b>C:</b> 생각나는 항목을 전부 적는 방식으로는 해결되지 않음. 생각하지 못한 항목이 있다는 것이 원인임.`,
           `<b>D:</b> 대안이 세 개 있어도 판단 기준이 없으면 선택할 수 없음.`,
         ]},
       principle:"익숙하지 않은 도메인은 질문을 먼저 받는다"},
    ]},

  /* ===== CH 6 · 3.6 CI/CD 통합 ===== */
  { id:"p3c6", ch:"CH 6", title:"CI/CD 파이프라인 통합 (3.6)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"사람이 개입하지 않는 환경에서 Claude를 실행하는 방법",
       html:`<div class="callout">📖 용어 카드. <b>CI/CD</b>: 코드를 올릴 때마다 검사, 테스트, 배포를 자동으로 실행하는 체계임. <b>PR(pull request)</b>: 코드 변경을 반영해 달라고 요청하는 문서임. <b>파이프라인(pipeline)</b>: 그 자동 실행 단계들을 순서대로 연결한 것임.</div>
        <div style="font-family:ui-monospace,Menlo,monospace;font-size:12.5px;line-height:2;background:var(--code-bg);border:1px solid var(--line);border-radius:10px;padding:14px 18px;margin:14px 0;overflow-x:auto">
<b>CI에서 Claude가 실행되는 순서 (로컬 컴퓨터에서는 실행되지 않음)</b><br>
[로컬 컴퓨터]&nbsp;&nbsp;코드 수정 → push (서버로 전송)<br>
&nbsp;&nbsp;&nbsp;&nbsp;↓<br>
[GitHub 서버]&nbsp;&nbsp;PR 감지 → 저장소 안의 워크플로 설정 파일 발견 → <b>러너</b>(작업용 임시 가상 컴퓨터) 시작<br>
&nbsp;&nbsp;&nbsp;&nbsp;↓<br>
[러너 안]&nbsp;&nbsp;① 저장소 내려받기 → ② Claude Code 설치 → ③ <b>claude -p "이 변경을 리뷰할 것" --output-format json</b> <span style="color:var(--accent)">← 사람이 없으므로 비대화형(-p)</span> → ④ 결과를 PR 코멘트로 게시<br>
&nbsp;&nbsp;&nbsp;&nbsp;↓<br>
[GitHub 서버]&nbsp;&nbsp;러너 폐기 · <b>"적용"은 설정 파일을 저장소에 커밋하는 것 · "실행"은 GitHub 서버가 담당</b>
        </div>
        <h4>CLI 플래그 3종 (암기 필수)</h4>
        <ul>
          <li><code>-p</code>(<code>--print</code>): <strong>비대화형 모드</strong>임. 프롬프트를 처리하고 출력한 뒤 종료함. 이 플래그가 없으면 CI에서 입력을 기다리며 <strong>멈춤</strong></li>
          <li><code>--output-format json</code>: 결과를 프로그램이 파싱할 수 있는 JSON으로 출력함</li>
          <li><code>--json-schema</code>: 그 JSON의 <strong>구조를 스키마로 강제함</strong></li>
        </ul>
        <h4>CI에서의 컨텍스트 제공</h4>
        <ul>
          <li><strong>CLAUDE.md</strong>는 CI 실행에도 프로젝트 컨텍스트를 제공함. 테스트 표준, 픽스처, 리뷰 기준을 문서로 남겨 두면 CI 결과의 품질이 올라감</li>
        </ul>
        <h4>세션 격리 원칙</h4>
        <ul>
          <li>코드를 <strong>생성한 세션</strong>은 자신이 만든 변경을 리뷰하는 데 적합하지 않음. 생성 시점의 추론이 컨텍스트에 남아 자신의 결정을 다시 검토하기 어려움</li>
          <li>리뷰는 <strong>독립 인스턴스</strong>로 실행함 (D4 Ch6에서 자세히 다룸)</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"CI 리뷰·테스트 생성의 품질 규칙",
       html:`__MAP3:ci__<h4>① 중복 코멘트 방지</h4>
        <ul>
          <li>새 커밋 이후의 재리뷰가 <strong>같은 지적을 반복</strong>하는 문제임</li>
          <li>처방: <strong>이전 리뷰의 발견 사항을 컨텍스트에 포함함</strong>. 여기에 "새 이슈와 미해결 항목만 보고할 것"을 함께 지시함</li>
        </ul>
        <h4>② 중복 테스트 방지</h4>
        <ul>
          <li>테스트 생성이 이미 존재하는 시나리오를 다시 제안하는 문제임</li>
          <li>처방: <strong>기존 테스트 파일을 컨텍스트에 제공함</strong></li>
        </ul>
        <h4>③ 저가치 테스트 방지</h4>
        <ul>
          <li>처방: CLAUDE.md에 <strong>테스트 표준, 가치 판단 기준, 픽스처</strong>를 문서화함</li>
        </ul>
        <div class="callout">🎯 시험 포인트: CI 문제의 오답 유도 선택지는 존재하지 않는 플래그임(CLAUDE_HEADLESS 환경변수, --batch 플래그). 실제로 존재하는 것은 -p, --output-format json, --json-schema임.</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: Pipeline design review",
       q:`A teammate's new CI review stage: (i) runs claude -p "Review this diff..." — works; (ii) extracts findings from the prose output with regex patterns like /(?:issue|bug):\\s*(.+)/i, which breaks weekly; (iii) reuses the same pipeline session that generated the code fix earlier in the job "to save tokens on context." Reviews miss obvious problems in the generated code. Which revision addresses the actual defects?`,
       opts:[
         {t:`Keep -p; replace the regex extraction with --output-format json plus --json-schema for machine-parseable findings; and run the review as a separate step with an independent instance that never saw the generation context.`, ok:true},
         {t:`Keep everything but harden the regex patterns to cover more phrasing variants of the findings.`},
         {t:`Replace -p with --output-format json, which handles both non-interactive execution and structured output in one flag.`},
         {t:`Add "review your earlier work with fresh eyes and maximum skepticism" to the same-session review prompt.`},
       ],
       hint:`결함이 두 가지임. 출력 구조를 보장하는 수단이 없다는 점(ii), 그리고 코드를 생성한 세션이 자기 코드를 리뷰한다는 점(iii)임. 두 결함의 공식 처방을 모두 담은 선택지를 고를 것. 일부만 고치는 선택지가 오답 유도임.`,
       explain:{
         good:`3.6의 두 항목을 함께 적용함. 구조화 출력(structured output)은 --output-format json과 --json-schema로 만들고(정규식 보완이 아님), 리뷰 품질은 세션 격리로 확보함(생성 맥락이 없는 독립 인스턴스). -p는 이미 올바르게 쓰고 있으므로 유지함. 무엇이 결함이고 무엇이 결함이 아닌지 구분하는 것까지가 이 문제의 요구사항임.`,
         wrongs:[
           `<b>B(정규식 강화):</b> 자연어 출력의 표현이 바뀔 때마다 정규식을 계속 따라가야 함. 매주 깨지는 구조가 그대로 남음.`,
           `<b>C(플래그 혼동):</b> --output-format json은 출력 구조만 담당함. 비대화형 실행(-p)을 대체하지 않음. 일반적으로는 맞는 설명이지만 이 문제의 조건에서는 틀린 선택지임.`,
           `<b>D("fresh eyes" 지시 추가):</b> 같은 세션에 남아 있는 추론 맥락은 지시문으로 제거되지 않음. D4 Ch6(리뷰는 독립 인스턴스로 실행함)에서 다루는 내용과 같음.`,
         ]},
       principle:"출력 구조는 플래그로, 리뷰는 세션 격리로"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2: Groundhog-day reviews",
       q:`Your CI review bot re-reviews a PR after each new commit. Developers complain it re-posts the same findings each time — issue #4521 got the same "missing input validation" comment four times, even after it was fixed in commit 3. What is the best fix?`,
       opts:[
         {t:`Include the prior review findings in context when re-running, and instruct Claude to report only new issues or ones still unaddressed in the latest code.`, ok:true},
         {t:`Deduplicate comments in a post-processing step by string-matching against previously posted comments.`},
         {t:`Only review once, when the PR is first opened, to avoid repeats entirely.`},
         {t:`Have the bot delete all its previous comments before each re-review so duplicates never coexist.`}],
       hint:`같은 지적이 반복되는 이유는 이전 리뷰에서 무엇을 지적했는지 알지 못하기 때문임. 그 정보를 어디에 넣어야 하는지 확인할 것.`,
       explain:{
         good:`가이드 3.6에 명시된 처방임. 재리뷰 시 이전 발견 사항을 컨텍스트에 포함하고, 새 이슈와 미해결 항목만 보고하게 함. 이미 수정된 이슈는 제외되고 새 커밋에서 발생한 문제만 보고됨.`,
         wrongs:[
           `<b>B:</b> 문자열 매칭은 표현이 조금만 달라져도 걸러 내지 못함. 이미 수정된 항목을 계속 지적하는 문제도 해결하지 못함.`,
           `<b>C:</b> 이후 커밋이 검사 없이 통과됨. 리뷰를 하는 목적 자체가 사라짐.`,
           `<b>D:</b> 코멘트 이력이 사라지고 반복의 원인은 그대로 남음.`,
         ]},
       principle:"원칙 ②(증상이 아니라 원인 제거): 이전 리뷰 결과를 컨텍스트로 제공한다"},
    ]},

  /* ===== D3 미니테스트 ===== */
  { id:"p3test", type:"test", title:"D3 미니테스트: Claude Code 12문항",
    questions:[
    {ts:"3.1", lvl:"기초", q:`Which CLAUDE.md location makes instructions apply to every developer who clones the repository?`,
     opts:[
       {t:`The project level — .claude/CLAUDE.md or a root CLAUDE.md committed to the repo.`, ok:true},
       {t:`The user level — ~/.claude/CLAUDE.md.`},
       {t:`Any location, as long as the file is named CLAUDE.md.`},
       {t:`The system level — /etc/claude/CLAUDE.md.`}],
     explain:{good:`프로젝트 레벨은 저장소에 커밋되므로 저장소를 복제하는 즉시 팀 전체에 적용됨.`,
       wrongs:[`<b>B:</b> 사용자 레벨은 해당 사용자에게만 적용됨.`,`<b>C:</b> 파일 위치가 적용 범위를 결정함.`,`<b>D:</b> 존재하지 않는 계층임.`]},
     principle:"팀 적용 = 프로젝트 레벨"},
    {ts:"3.1", lvl:"실전", q:`Claude applies your testing conventions in some sessions but not others on the same machine and project. Which diagnostic step best identifies the cause?`,
     opts:[
       {t:`Run /memory to verify which memory files are actually loaded in the current session and compare across sessions.`, ok:true},
       {t:`Reinstall Claude Code to reset configuration state.`},
       {t:`Move all conventions to the user-level CLAUDE.md, which loads more reliably.`},
       {t:`Add "always follow the testing conventions" to the start of every prompt.`}],
     explain:{good:`세션마다 동작이 다른 문제의 1차 진단은 /memory임. 어떤 파일이 로드됐는지 먼저 확인함. 가이드 3.1이 제시하는 진단 수단임.`,
       wrongs:[`<b>B:</b> 원인을 파악하지 않은 재설치는 근거가 없는 조치임.`,`<b>C:</b> 사용자 레벨이 더 확실하게 로드된다는 규칙은 없음. 적용 범위만 좁아짐.`,`<b>D:</b> 로드되지 않은 파일의 내용은 프롬프트 지시만으로 불러올 수 없음.`]},
     principle:"진단 먼저: /memory"},
    {ts:"3.2", lvl:"기초", q:`A brainstorming skill produces long exploratory output that pollutes the main conversation. Which frontmatter option isolates it?`,
     opts:[
       {t:`context: fork — the skill runs in an isolated sub-agent context.`, ok:true},
       {t:`allowed-tools — restricting tools reduces output length.`},
       {t:`argument-hint — prompting for arguments keeps output focused.`},
       {t:`paths — scoping the skill to specific directories.`}],
     explain:{good:`context: fork는 격리 실행 설정임. 분량이 큰 출력이 본 대화에 남지 않음.`,
       wrongs:[`<b>B:</b> 도구 제한은 출력 격리와 무관함.`,`<b>C:</b> 인자를 요구하는 기능일 뿐임.`,`<b>D:</b> paths는 rules의 필드임. 스킬 frontmatter의 옵션이 아님.`]},
     principle:"출력 분량이 큰 스킬은 fork"},
    {ts:"3.2", lvl:"실전", q:`Your team's shared format-commit skill works well, but you personally want a variant with different commit message conventions — without affecting teammates. What is the correct approach?`,
     opts:[
       {t:`Create a personal variant under ~/.claude/skills/ with a different name, leaving the team's skill untouched.`, ok:true},
       {t:`Edit the team's skill in .claude/skills/ — your preferences are improvements others will appreciate.`},
       {t:`Add an if-branch inside the team skill keyed to your username.`},
       {t:`Override the team skill by creating a personal skill with the exact same name.`}],
     explain:{good:`가이드 3.2에 명시됨. 개인 커스터마이징은 ~/.claude/skills/에 다른 이름의 변형으로 만듦. 팀 자산을 수정하지 않는 격리 원칙임.`,
       wrongs:[`<b>B:</b> 저장소에 커밋되는 팀 스킬을 임의로 변경하는 것임. 팀 전원에게 영향을 줌.`,`<b>C:</b> 팀 스킬에 개인용 분기를 넣는 방식임.`,`<b>D:</b> 이름이 같으면 어느 스킬이 실행되는지 불분명해짐. 가이드가 다른 이름을 명시한 이유임.`]},
     principle:"개인 변형은 개인 스코프 + 다른 이름"},
    {ts:"3.3", lvl:"기초", q:`What does the paths field in a .claude/rules/ file's YAML frontmatter control?`,
     opts:[
       {t:`When the rule loads — only while editing files that match the glob patterns.`, ok:true},
       {t:`Which directories the agent is allowed to modify.`},
       {t:`Where the rule file itself must be stored.`},
       {t:`The order in which rules override each other.`}],
     explain:{good:`paths의 글롭 패턴은 조건부 로딩을 지정함. 매칭되는 파일을 편집할 때만 규칙이 컨텍스트에 들어감.`,
       wrongs:[`<b>B:</b> 수정 권한을 제어하는 필드가 아님.`,`<b>C:</b> 규칙 파일 자체의 저장 위치와는 무관함.`,`<b>D:</b> 우선순위를 정하는 필드가 아님.`]},
     principle:"paths = 조건부 로딩"},
    {ts:"3.3", lvl:"실전", q:`SQL migration conventions must apply to migration files that live in db/migrations/, scripts/migrations/, and several service-specific folders like services/billing/migrations/. All migration files end in .sql. Which single rule configuration covers them all?`,
     opts:[
       {t:`One .claude/rules/ file with paths: ["**/migrations/**/*.sql"] matching migration SQL files wherever they live.`, ok:true},
       {t:`A CLAUDE.md file placed inside each of the migration directories.`},
       {t:`paths: ["db/migrations/*.sql"] — the other folders can be added later if problems appear.`},
       {t:`A root CLAUDE.md section titled "SQL migrations" that Claude applies when it sees .sql files.`}],
     explain:{good:`위치는 여러 곳이지만 패턴은 하나임(**/migrations/**/*.sql). 글롭 패턴 하나로 흩어진 위치를 전부 포함함. 3.3의 핵심 이점임.`,
       wrongs:[`<b>B:</b> 폴더마다 파일을 복제해야 함. 유지보수 부담이 커지고 누락 위험이 있음.`,`<b>C:</b> 이미 알고 있는 위치를 제외하면 규칙이 적용되지 않는 구간이 그대로 남음.`,`<b>D:</b> 항상 로드되고 모델의 추론에 의존함. 조건을 명시해 매칭하는 방식보다 신뢰도가 낮음.`]},
     principle:"흩어진 위치는 글롭 패턴 하나로"},
    {ts:"3.4", lvl:"기초", q:`Which task is appropriate for direct execution rather than plan mode?`,
     opts:[
       {t:`Fixing a single-file bug with a clear stack trace pointing to the faulty line.`, ok:true},
       {t:`Migrating a library used across 45+ files.`},
       {t:`Restructuring a monolith into microservices.`},
       {t:`Choosing between two integration approaches with different infrastructure requirements.`}],
     explain:{good:`범위가 명확하고 단일 파일이며 수정 방법이 이미 보이는 작업은 직접 실행임.`,
       wrongs:[`<b>B:</b> 다중 파일 대규모 변경은 plan mode임.`,`<b>C:</b> 아키텍처 결정은 plan mode임.`,`<b>D:</b> 유효한 접근이 여러 개이면 plan mode임.`]},
     principle:"명확·소규모 = 직접 실행"},
    {ts:"3.4", lvl:"실전", q:`For a 45-file library migration, your team plans to (1) investigate the codebase and design the approach, then (2) execute the changes. How should Claude Code's modes map onto this?`,
     opts:[
       {t:`Use plan mode for the investigation and design phase, then switch to direct execution to implement the planned approach.`, ok:true},
       {t:`Use plan mode for both phases — execution is safer when everything stays hypothetical.`},
       {t:`Use direct execution for both phases — the plan is just overhead once the team agrees.`},
       {t:`Use direct execution first to gather real errors, then plan mode to interpret them.`}],
     explain:{good:`가이드 3.4의 조합 패턴임. plan mode로 조사와 설계를 하고 직접 실행으로 구현함. 각 모드를 알맞은 단계에 배치함.`,
       wrongs:[`<b>B:</b> plan mode는 코드를 수정하지 않음. 계획만으로는 마이그레이션이 완료되지 않음.`,`<b>C:</b> 파일 45개를 설계 없이 수정하면 재작업이 발생함.`,`<b>D:</b> 에러를 먼저 만들고 해석하는 순서로, 두 모드의 역할이 뒤바뀐 선택지임.`]},
     principle:"plan으로 설계, direct로 구현"},
    {ts:"3.5", lvl:"기초", q:`Claude's output format varies between runs despite detailed prose instructions. What is the most effective fix?`,
     opts:[
       {t:`Provide 2-3 concrete examples demonstrating the exact expected output format.`, ok:true},
       {t:`Repeat the format instructions twice in the prompt for emphasis.`},
       {t:`Ask Claude to acknowledge the format before starting.`},
       {t:`Reduce max_tokens so there is less room for deviation.`}],
     explain:{good:`출력 형식이 일정하지 않을 때의 1차 처방은 구체적 예시임. 문장으로 된 지시보다 실제 예시가 효과가 큼.`,
       wrongs:[`<b>B:</b> 같은 지시를 반복해도 해석이 갈리는 문제는 해결되지 않음.`,`<b>C:</b> 형식을 확인했다는 응답이 형식 준수를 보장하지 않음.`,`<b>D:</b> 출력 길이 제한은 형식 일관성과 무관함.`]},
     principle:"형식은 예시로 고정"},
    {ts:"3.5", lvl:"실전", q:`Claude fixed five reported bugs one at a time, but each fix broke one of the previous ones — the bugs share state in the same module. What does best practice recommend?`,
     opts:[
       {t:`Present all five issues together in a single detailed message, since interacting problems need to be solved jointly.`, ok:true},
       {t:`Continue one at a time but add regression tests after each fix.`},
       {t:`Fix them in reverse order of severity so the critical ones land last.`},
       {t:`Ask Claude to refactor the entire module first, then re-report whichever bugs remain.`}],
     explain:{good:`가이드 3.5의 내용임. 서로 영향을 주는(interacting) 문제는 한 메시지에 함께 담아 동시에 조율해야 함. 독립적인 경우에만 순차 처리가 정답임.`,
       wrongs:[`<b>B:</b> 회귀 테스트는 문제 발생을 탐지할 뿐이며, 서로 영향을 주는 수정을 조율하지 못함.`,`<b>C:</b> 처리 순서를 바꿔도 상호작용 문제는 해결되지 않음.`,`<b>D:</b> 문제를 정의하지 않은 상태에서 전면 리팩토링부터 하면 작업 범위가 과도하게 커짐.`]},
     principle:"상호작용하면 한 번에, 독립이면 순차"},
    {ts:"3.6", lvl:"기초", q:`Which flag combination makes Claude Code produce machine-parseable, schema-conforming output for CI automation?`,
     opts:[
       {t:`--output-format json together with --json-schema.`, ok:true},
       {t:`--print together with --verbose.`},
       {t:`--json together with --strict.`},
       {t:`--output xml together with --schema.`}],
     explain:{good:`CI의 구조화 출력은 --output-format json과 --json-schema의 조합임.`,
       wrongs:[`<b>B:</b> -p는 비대화형 실행 플래그일 뿐이며 출력 구조를 보장하지 않음.`,`<b>C:</b> --json과 --strict는 존재하지 않는 플래그임. 오답 유도 선택지임.`,`<b>D:</b> --output xml과 --schema도 존재하지 않는 조합임.`]},
     principle:"실제로 존재하는 플래그 3종 암기"},
    {ts:"3.6", lvl:"실전", q:`Your CI test-generation job produces many low-value tests (trivial getters) and duplicates of scenarios the suite already covers. Which combination of fixes matches best practice?`,
     opts:[
       {t:`Provide the existing test files in context so duplicates are avoided, and document testing standards and valuable-test criteria (plus available fixtures) in CLAUDE.md.`, ok:true},
       {t:`Raise the temperature so generated tests are more diverse and less duplicative.`},
       {t:`Post-process the output to delete short tests, which are usually low-value.`},
       {t:`Limit generation to 5 tests per run so reviewers can filter quality manually.`}],
     explain:{good:`중복 방지는 기존 테스트 파일 제공, 저가치 테스트 방지는 CLAUDE.md에 표준과 가치 판단 기준, 픽스처를 문서화하는 것임. 가이드 3.6의 두 처방을 결합한 선택지임.`,
       wrongs:[`<b>B:</b> 다양성과 가치는 다름. 무엇이 가치 있는 테스트인지 기준이 없다는 것이 원인임.`,`<b>C:</b> 테스트 길이는 가치를 판단하는 지표가 아님.`,`<b>D:</b> 개수를 줄여도 품질 기준이 없으면 저가치 테스트의 비율은 그대로임.`]},
     principle:"컨텍스트 제공이 CI 품질을 결정한다"},
    ]},
  ]
};
