/* PART 3 — Claude Code 설정 & 워크플로 (D3, 20%) */
window.CCAF_CONTENT.p3 = {
  id: "p3",
  lessons: [

  /* ===== CH 1 · 3.1 CLAUDE.md 계층 ===== */
  { id:"p3c1", ch:"CH 1", title:"CLAUDE.md 계층과 모듈화 (3.1)",
    steps:[
      {type:"concept", kind:"PART BRIEFING · 파트 설명", h:"PART 03 — 팀 전체가 같은 Claude를 쓰게 만드는 법",
       html:`<p class="lead">이 파트는 <strong>Claude Code Configuration & Workflows</strong>.</p>
        <h4>파트 프로필</h4>
        <ul>
          <li>출제 비중 <strong>20% ≈ 12문항</strong> · 1차 점수 <strong>61%</strong></li>
          <li>챕터 6개 + 미니테스트 · 약 1.7시간 (세션 S8~S9)</li>
        </ul>
        <h4>다루는 범위</h4>
        <ul>
          <li><strong>CLAUDE.md 계층</strong> — 지시를 어디에 두나 (Ch1)</li>
          <li><strong>커맨드·스킬</strong> — 반복 작업의 패키징 (Ch2)</li>
          <li><strong>경로별 규칙</strong> — 파일 위치 따라 규칙 로딩 (Ch3)</li>
          <li><strong>plan mode vs 직접 실행</strong> — 언제 계획부터 (Ch4)</li>
          <li><strong>반복 개선 기법</strong> — 결과를 끌어올리는 대화법 (Ch5)</li>
          <li><strong>CI/CD 통합</strong> — 자동화 파이프라인 속 Claude (Ch6)</li>
        </ul>
        <div class="callout">🎯 이 파트의 공통 질문: <b>"이 지시/설정은 어디에 두는 게 맞나."</b> 판단 축은 두 개 — 누구에게 적용되나(나만? 팀?) × 언제 로드되나(항상? 조건부? 호출 시?).</div>`},
      {type:"concept", kind:"CONCEPT · 개념 설명 ①", h:"먼저 그림부터: CLAUDE.md는 컴퓨터 어디에 있는 파일인가",
       html:`<p class="lead">CLAUDE.md는 그냥 <strong>메모장 파일</strong>이야. "Claude야, 일할 때 이거 지켜"라고 적어두는 쪽지. 다만 <strong>어느 폴더에 두느냐</strong>에 따라 적용 범위가 달라져. 아래 그림의 세 위치가 전부야.</p>
        <div style="font-family:ui-monospace,Menlo,monospace;font-size:12.5px;line-height:2;background:var(--code-bg);border:1px solid var(--line);border-radius:10px;padding:14px 18px;margin:14px 0;overflow-x:auto">
🖥 <b>내 컴퓨터</b><br>
├─ 🏠 홈 폴더 <b>~</b> (내 계정의 개인 공간)<br>
│&nbsp;&nbsp;&nbsp;└─ .claude/<br>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ CLAUDE.md&nbsp;&nbsp;<span style="color:var(--accent)">← ① 사용자 레벨 — 내 모든 프로젝트에, 나에게만</span><br>
│<br>
└─ 📁 our-shop/ (프로젝트 폴더 = 팀 저장소를 내 컴퓨터로 복제한 것)<br>
&nbsp;&nbsp;&nbsp;&nbsp;├─ CLAUDE.md&nbsp;&nbsp;<span style="color:var(--accent)">← ② 프로젝트 레벨 — 이 프로젝트에, 팀 전체에게</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;├─ backend/<br>
&nbsp;&nbsp;&nbsp;&nbsp;└─ frontend/<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ CLAUDE.md&nbsp;&nbsp;<span style="color:var(--accent)">← ③ 디렉토리 레벨 — frontend 폴더 작업에만 추가</span>
        </div>
        <h4>위치별 특성 한눈에</h4>
        <table>
          <tr><th>레벨</th><th>파일 위치</th><th>누구에게</th><th>팀 공유</th><th>여기 담는 것</th></tr>
          <tr><td>① 사용자</td><td><code>~/.claude/CLAUDE.md</code></td><td>나만, 모든 프로젝트</td><td>❌ (내 컴퓨터에만)</td><td>개인 취향 ("응답은 한국어로")</td></tr>
          <tr><td>② 프로젝트</td><td>프로젝트 루트 <code>CLAUDE.md</code> 또는 <code>.claude/CLAUDE.md</code></td><td>이 프로젝트의 팀 전원</td><td>✅ (저장소에 커밋)</td><td>팀 표준 ("들여쓰기 4칸")</td></tr>
          <tr><td>③ 디렉토리</td><td>하위 폴더 안 <code>CLAUDE.md</code></td><td>그 폴더 작업 시 추가</td><td>✅</td><td>그 영역 전용 규칙</td></tr>
        </table>
        <h4>가장 많이 나오는 함정</h4>
        <ul>
          <li>①만 <strong>팀 저장소 밖(내 홈 폴더)</strong>에 있어. 그래서 <strong>버전 관리로 공유되지 않음</strong> → "새 팀원에게 지시가 적용 안 됨" 문제의 원인은 항상 ①에 있는 팀 규칙</li>
        </ul>
        <div class="callout">📖 용어 카드 — <b>~ (물결)</b>: 내 홈 폴더의 줄임 표기. 컴퓨터에서 내 계정의 개인 서랍이라고 생각하면 됨. <b>저장소 복제(클론)</b>: 팀 공용 폴더를 내 컴퓨터로 통째로 내려받는 것 — ②③은 그 안에 있어서 팀 전체가 같은 파일을 가짐.</div>`},
      {type:"concept", kind:"CONCEPT · 개념 설명 ②", h:"'연결 로드'의 정체: 쪽지 세 장을 스테이플러로 찍는다",
       html:`<p class="lead">Claude가 frontend 폴더에서 일을 시작하면, 세 쪽지를 <strong>따로따로 참조하는 게 아니라</strong> 멀리 있는 것부터 순서대로 <strong>이어 붙여 한 장의 지시문으로 만든 뒤 통째로</strong> 읽어. 이게 "연결(concatenate) 로드"야.</p>
        <div style="margin:16px 0">
          <div style="border:1px solid var(--line);border-radius:10px;padding:10px 14px;background:var(--surface)"><span class="eyebrow">① 사용자 ~/.claude/CLAUDE.md</span><br><code>응답은 한국어로 해줘</code></div>
          <div style="text-align:center;color:var(--dim);font-weight:800;line-height:1.6">＋</div>
          <div style="border:1px solid var(--line);border-radius:10px;padding:10px 14px;background:var(--surface)"><span class="eyebrow">② 프로젝트 our-shop/CLAUDE.md</span><br><code>들여쓰기는 4칸으로</code></div>
          <div style="text-align:center;color:var(--dim);font-weight:800;line-height:1.6">＋</div>
          <div style="border:1px solid var(--line);border-radius:10px;padding:10px 14px;background:var(--surface)"><span class="eyebrow">③ 디렉토리 frontend/CLAUDE.md</span><br><code>이 폴더는 들여쓰기 2칸으로</code></div>
          <div style="text-align:center;color:var(--accent);font-weight:800;line-height:2.2">↓ 멀리 있는 것부터 순서대로 이어 붙임 ↓</div>
          <div style="border:2px solid var(--accent-line);border-radius:12px;padding:12px 16px;background:var(--accent-soft)"><span class="eyebrow">Claude가 실제로 받아 읽는 것 — 한 장짜리 지시문</span><br>
            <code>1. 응답은 한국어로 해줘</code><br>
            <code>2. 들여쓰기는 4칸으로</code><br>
            <code>3. 이 폴더는 들여쓰기 2칸으로</code>
          </div>
        </div>
        <h4>이 그림에서 나오는 규칙 세 개</h4>
        <ul>
          <li><strong>덮어쓰기가 아니다</strong> — ③이 ②를 지우지 않아. 세 문장이 전부 살아서 한 장에 들어 있음 (그래서 "연결")</li>
          <li><strong>충돌이 없으면 전부 적용</strong> — "한국어로"는 경쟁자가 없으니 그냥 지켜짐</li>
          <li><strong>충돌하면(4칸 vs 2칸)?</strong> 작업 위치에 가까운 ③이 <strong>마지막에 읽혀서</strong> 그쪽으로 기우는 경향 — 사람도 마지막에 들은 지시가 귀에 남는 것과 같아. 단, 공식 문서는 <strong>"충돌 시 임의로 하나를 고를 수 있다"</strong>고 명시 → 보장이 아니니 <strong>충돌 자체를 없애는 게 정석</strong> (예: ②를 "frontend 제외, 들여쓰기 4칸"으로)</li>
        </ul>
        <h4>③만의 특별 규칙: 방에 들어갈 때만 보는 안내문</h4>
        <ul>
          <li>①②는 <strong>출근하면 무조건 받는 전체 공지</strong> — 세션 시작 때 항상 로드</li>
          <li>③(하위 디렉토리)은 <strong>그 방 문에 붙은 안내문</strong> — frontend 폴더의 파일을 실제로 만질 때에야 로드됨 (상시 로드 아님, 토큰 절약)</li>
        </ul>
        <h4>공식 문서가 주는 보너스 디테일</h4>
        <ul>
          <li><strong>CLAUDE.md는 컨텍스트일 뿐 강제 설정이 아님</strong> — "행동을 차단해야 하면 PreToolUse 훅을 쓰라"고 공식 문서가 직접 명시 (원칙 ①의 공식 근거)</li>
          <li>계층은 사실 넷: 조직 관리(managed policy) → ① → ② → <code>CLAUDE.local.md</code>(개인용 프로젝트 메모, .gitignore 대상)</li>
          <li>@import는 <strong>최대 4단계</strong>까지 재귀 가능, 백틱(\`)으로 감싼 @경로는 임포트되지 않음</li>
          <li>.claude/rules/에서 <strong>paths가 없는 규칙은 상시 로드</strong> — 조건부가 되려면 paths가 있어야 함</li>
        </ul>
        <h4>모듈화 도구 2가지</h4>
        <ul>
          <li><code>@import</code> — 다른 파일을 참조로 불러와 CLAUDE.md를 얇게 유지 (원본은 한 곳, 포함은 선택)</li>
          <li><code>.claude/rules/</code> — 주제별 파일(testing.md, api-conventions.md)로 분할</li>
        </ul>
        <div class="callout">📖 용어 카드 — <b>/memory 명령</b>: 지금 세션에 어떤 메모리 파일들이 로드됐는지 확인하는 명령. "세션마다 행동이 다른" 문제의 진단 도구.</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"어디에 두나 — 진단과 처방",
       html:`__MAP3:hier__<h4>케이스 1: 새 팀원에게 코딩 표준이 적용 안 됨</h4>
        <ul>
          <li>진단: 표준이 작성자의 <code>~/.claude/CLAUDE.md</code>(사용자 레벨)에 있었음</li>
          <li>처방: 프로젝트 레벨로 이동 → 클론만 하면 전원 적용</li>
        </ul>
        <h4>케이스 2: 모노레포, 패키지마다 다른 표준</h4>
        <ul>
          <li>처방: 각 패키지 CLAUDE.md에서 <strong>@import로 관련 표준 파일만 선택 포함</strong></li>
          <li>메인테이너가 자기 도메인 지식으로 어떤 표준이 필요한지 고름</li>
        </ul>
        <h4>케이스 3: CLAUDE.md가 800줄 괴물이 됨</h4>
        <ul>
          <li>처방: <code>.claude/rules/</code>에 주제별 분할 (testing.md / api-conventions.md / deployment.md)</li>
        </ul>
        <h4>케이스 4: 세션마다 다르게 행동</h4>
        <ul>
          <li>진단 도구: <code>/memory</code>로 어떤 파일이 로드됐는지 확인부터</li>
        </ul>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1 — The ghost convention",
       q:`Three weeks ago your team deleted the "always write JSDoc for every function" rule from the project CLAUDE.md — yet on your machine, Claude still adds JSDoc everywhere, while teammates' sessions stopped. You've pulled latest; the rule is confirmed gone from the repo. What is the right diagnostic step, and the likely finding?`,
       opts:[
         {t:`Run /memory to list which memory files are actually loaded this session — you'll likely find a stale copy of the rule in your user-level ~/.claude/CLAUDE.md that loads alongside the project file.`, ok:true},
         {t:`Restart Claude Code to flush its instruction cache; deleted rules can linger in memory for several weeks.`},
         {t:`Re-clone the repository from scratch — your working copy's CLAUDE.md is probably corrupted.`},
         {t:`Add an explicit counter-rule to the project CLAUDE.md: "do not write JSDoc unless asked."`},
       ],
       hint:`"나만 겪고 팀원은 안 겪는" 지시 문제 + 저장소엔 흔적이 없음. 그럼 지시가 어디서 로드되는지 '확인하는 도구'부터 써야지.`,
       explain:{
         good:`세션 간·사람 간 행동 차이의 1차 진단은 /memory — 어떤 파일이 로드됐는지부터 확인(3.1). 저장소가 깨끗한데 나만 겪는다면 남는 용의자는 내 사용자 레벨 파일이야. 계층은 겹쳐 로드되니 거기 남은 사본이 범인.`,
         wrongs:[
           `<b>B — 재시작/캐시:</b> "몇 주 남는 지시 캐시"는 존재하지 않는 메커니즘 — 그럴듯한 허구.`,
           `<b>C — 재클론:</b> 저장소는 이미 확인됐어 — 증거와 무관한 삽질.`,
           `<b>D — 반대 규칙 추가:</b> 지시로 지시를 덮는 확률전 + 팀원들에겐 불필요한 규칙 오염. 원인 파일 제거가 답.`,
         ]},
       principle:"진단 먼저 — /memory로 로드 목록부터"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2 — The monorepo standards",
       q:`Your monorepo has packages/web, packages/api, and packages/data-pipeline, each needing different subsets of the company's 12 standards documents. Package maintainers know best which standards apply to them. What is the most maintainable setup?`,
       opts:[
         {t:`Keep the 12 standards as separate files and have each package's CLAUDE.md use @import to include only the relevant ones, curated by that package's maintainer.`, ok:true},
         {t:`Paste all 12 standards into the root CLAUDE.md so every package inherits everything.`},
         {t:`Duplicate the relevant standards' text into each package's CLAUDE.md.`},
         {t:`Keep standards in a wiki and instruct developers to paste relevant sections into prompts as needed.`}],
       hint:`"선택적으로 포함 + 원본은 한 곳" — 이 조합을 가능하게 하는 문법이 있었지?`,
       explain:{
         good:`@import의 존재 이유: 표준 원본은 한 곳에 두고, 각 패키지 CLAUDE.md가 필요한 것만 참조. 메인테이너의 도메인 지식으로 선별한다는 가이드 3.1 시나리오 그대로.`,
         wrongs:[
           `<b>B:</b> 모든 패키지에 무관한 표준까지 로드 — 컨텍스트 낭비 + 상충 위험.`,
           `<b>C:</b> 복사본 12벌 — 표준이 바뀔 때마다 전부 수동 동기화해야 하는 유지보수 지옥.`,
           `<b>D:</b> 사람이 매번 붙여넣는 방식은 자동 로드라는 CLAUDE.md의 존재 이유를 버리는 것.`,
         ]},
       principle:"원본은 하나, 포함은 @import로 선택"},
    ]},

  /* ===== CH 2 · 3.2 커맨드와 스킬 ===== */
  { id:"p3c2", ch:"CH 2", title:"커스텀 슬래시 커맨드와 스킬 (3.2)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"반복 작업을 포장하는 두 가지 방법",
       html:`<h4>슬래시 커맨드</h4>
        <ul>
          <li><code>/review</code>처럼 타이핑해서 실행하는 저장된 프롬프트</li>
          <li><strong>프로젝트</strong> <code>.claude/commands/</code> — 커밋되어 팀 공유</li>
          <li><strong>개인</strong> <code>~/.claude/commands/</code> — 나만</li>
        </ul>
        <h4>스킬 (Skills)</h4>
        <ul>
          <li><code>.claude/skills/</code> 폴더의 <code>SKILL.md</code> — 더 복잡한 작업 패키지</li>
          <li>파일 맨 위 <strong>YAML frontmatter</strong>로 동작 설정 — frontmatter = 파일 첫머리에 ---로 감싸 넣는 설정 머리말, YAML = 그 안을 "이름: 값" 꼴로 적는 표기법</li>
        </ul>
        <h4>frontmatter 3종 (암기 필수)</h4>
        <ul>
          <li><code>context: fork</code> — 스킬을 <strong>격리된 컨텍스트</strong>에서 실행 → 장황한 출력이 본 대화를 오염 안 시킴</li>
          <li><code>allowed-tools</code> — 스킬 실행 중 <strong>쓸 수 있는 도구 제한</strong> (파괴적 행동 방지)</li>
          <li><code>argument-hint</code> — 인자 없이 호출하면 <strong>필요한 파라미터를 물어봄</strong></li>
        </ul>
        <div class="callout">📖 용어 카드 — <b>YAML frontmatter</b>: 파일 맨 위 <code>---</code> 두 줄 사이에 쓰는 설정 라벨 구역.</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"스킬 설계와 '어디에 담을까' 판단",
       html:`__MAP3:skills__<h4>frontmatter 사용 시나리오</h4>
        <ul>
          <li>코드베이스 분석처럼 <strong>출력이 장황한 스킬</strong> → <code>context: fork</code>로 격리, 요약만 본 대화로</li>
          <li>브레인스토밍처럼 <strong>탐색 컨텍스트</strong>가 생기는 스킬도 fork 대상</li>
          <li>파일 생성 스킬이 실수로 삭제하지 않게 → <code>allowed-tools</code>를 쓰기 계열로 제한</li>
          <li>대상 디렉토리 같은 필수 인자 → <code>argument-hint</code>로 요구</li>
        </ul>
        <h4>개인 커스터마이징</h4>
        <ul>
          <li>팀 스킬을 내 취향대로 바꾸고 싶으면 → <code>~/.claude/skills/</code>에 <strong>다른 이름으로 개인 변형</strong> (팀 것을 건드리지 않기)</li>
        </ul>
        <h4>스킬 vs CLAUDE.md — 판단 기준</h4>
        <ul>
          <li><strong>스킬</strong> = 필요할 때 호출하는 작업별 워크플로</li>
          <li><strong>CLAUDE.md</strong> = 항상 로드되는 보편 표준</li>
          <li>"매번 적용돼야 하나?"가 갈림길 — 그렇다면 CLAUDE.md, 특정 작업에서만이라면 스킬</li>
        </ul>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1 — Three needs, three homes",
       q:`Your team has three requirements: (1) a "generate release notes from merged PRs" workflow every developer should run on demand; (2) your personal shortcut that reformats commit messages your preferred way; (3) the API error-handling standard that must shape every piece of generated code, always, for everyone. Which allocation is correct?`,
       opts:[
         {t:`(1) a project-scoped command/skill in .claude/, shared via version control; (2) a user-scoped command in ~/.claude/commands/; (3) the project CLAUDE.md, since universal standards must load on every session rather than wait to be invoked.`, ok:true},
         {t:`All three as project-scoped skills — skills are the most capable packaging, and consistency of mechanism simplifies maintenance.`},
         {t:`(1) and (3) as project skills invoked when relevant; (2) in the project CLAUDE.md marked "for Kim only."`},
         {t:`All three in the project CLAUDE.md — fewer moving parts than commands and skills combined.`},
       ],
       hint:`두 축으로 갈라봐: 누구에게(팀/나) × 언제(호출 시/항상). (3)의 "always"가 결정적 단서야.`,
       explain:{
         good:`3.2의 배치 원칙: 온디맨드 팀 워크플로 = 프로젝트 커맨드/스킬, 개인 취향 = 사용자 스코프, 항상 적용될 보편 표준 = CLAUDE.md. 특히 (3)을 스킬로 만들면 "호출해야 로드"라 매번 적용이 보장 안 돼 — 이게 이 문제의 함정 축이야.`,
         wrongs:[
           `<b>B — 전부 스킬:</b> (3)이 치명타 — 표준이 '호출될 때만' 적용돼 코드 절반이 표준 밖에서 생성돼. (2)는 팀 저장소 오염.`,
           `<b>C — 표준을 스킬로:</b> "관련될 때 호출"은 항상성 요구와 모순, 개인 취향을 팀 파일에 넣는 것도 역배치.`,
           `<b>D — 전부 CLAUDE.md:</b> 온디맨드 워크플로가 모든 세션에 상시 로드 — 토큰 낭비 + 개인 취향이 전원에게 강제.`,
         ]},
       principle:"누구에게 × 언제 — 두 축으로 배치"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2 — Designing the audit skill",
       q:`You are building a dependency-audit skill that (a) produces extremely verbose scan output that shouldn't pollute the main conversation, (b) must never modify or delete files — read-only analysis, and (c) requires a target directory that developers keep forgetting to pass. Which frontmatter configuration is correct?`,
       opts:[
         {t:`context: fork to isolate the verbose output, allowed-tools restricted to read-only tools, and argument-hint to prompt for the target directory.`, ok:true},
         {t:`context: fork alone — isolation automatically prevents file modification and handles missing arguments.`},
         {t:`allowed-tools alone — restricting tools also isolates output and can define default arguments.`},
         {t:`Write the three requirements as instructions in the skill's prompt body, since frontmatter is only for metadata.`}],
       hint:`요구가 세 개고, frontmatter 옵션도 세 개였지. 각 요구를 각 옵션에 연결해봐.`,
       explain:{
         good:`요구 1:1 매핑 — 장황한 출력 격리 = context: fork / 읽기 전용 강제 = allowed-tools / 필수 인자 요구 = argument-hint. 세 옵션은 역할이 달라서 서로를 대체 못 해.`,
         wrongs:[
           `<b>B:</b> fork는 컨텍스트 격리만 — 도구 제한도 인자 요구도 안 해줘.`,
           `<b>C:</b> allowed-tools는 도구 제한만 — 출력은 여전히 본 대화에 흘러.`,
           `<b>D:</b> 프롬프트 본문 지시는 확률적. "절대 수정 금지"는 allowed-tools로 강제해야 해 (원칙 ①).`,
         ]},
       principle:"원칙 ① 강제는 설정으로 — frontmatter 3종 역할 구분"},
    ]},

  /* ===== CH 3 · 3.3 경로별 규칙 ===== */
  { id:"p3c3", ch:"CH 3", title:"경로별 규칙 — 조건부 컨벤션 로딩 (3.3)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"글롭(glob) — 파일 묶음을 '조건'으로 가리키는 주소 패턴",
       html:`<p class="lead">이 챕터의 도구는 <strong>.claude/rules/ + paths</strong>. 그런데 paths에 적는 <strong>글롭(glob)</strong>부터 알아야 해 — 이걸 모르면 이 챕터가 통째로 암호문이거든.</p>
        <h4>① 왜 필요한가 — "어떤 파일을 만질 때 이 규칙을 켤까?"</h4>
        <ul>
          <li>규칙 파일엔 <strong>켜질 조건</strong>을 적어야 해. 대상 파일이 수백 개면 이름을 다 나열할 수 없지</li>
          <li>글롭 = 파일들을 <strong>조건 한 줄로 묶어 가리키는 표기법</strong>. "terraform 폴더 아래 전부" 같은 말을 컴퓨터가 읽을 수 있는 형태로 적은 것</li>
        </ul>
        <h4>② 기호는 딱 두 개</h4>
        <ul>
          <li><code>*</code> — <strong>이름 한 칸</strong>을 대신함. 폴더 경계(/)는 <strong>못 넘음</strong>. <code>*.ts</code> = "이름은 뭐든, 끝이 .ts인 파일"</li>
          <li><code>**</code> — <strong>폴더 몇 단계든</strong> 대신함. 하위 폴더 전부를 뚫고 내려감</li>
        </ul>
        <h4>③ 읽는 법 — 주소처럼 왼쪽부터 끊어 읽기</h4>
        <ul>
          <li><code>src/api/**/*.ts</code> = <code>src/api/</code>(여기서 시작) + <code>**/</code>(하위 폴더 몇 단계든) + <code>*.ts</code>(이름 뭐든 .ts로 끝)</li>
          <li>한국어로: <strong>"src/api 아래라면 깊이 불문, 모든 .ts 파일"</strong></li>
        </ul>
        <div style="font-family:ui-monospace,Menlo,monospace;font-size:12.5px;line-height:2;background:var(--code-bg);border:1px solid var(--line);border-radius:10px;padding:14px 18px;margin:14px 0;overflow-x:auto">
<b>paths: ["src/api/**/*.ts"]</b> 는 어떤 파일에 켜지나<br>
📁 src/<br>
&nbsp;&nbsp;├─ api/<br>
&nbsp;&nbsp;│&nbsp;&nbsp;├─ index.ts&nbsp;&nbsp;<span style="color:var(--accent)">✅ 매칭 — 바로 아래 깊이도 포함</span><br>
&nbsp;&nbsp;│&nbsp;&nbsp;├─ README.md&nbsp;&nbsp;❌ 끝이 .ts가 아님<br>
&nbsp;&nbsp;│&nbsp;&nbsp;└─ v2/handlers/<br>
&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ payment.ts&nbsp;&nbsp;<span style="color:var(--accent)">✅ 매칭 — **가 v2/handlers를 뚫고 내려감</span><br>
&nbsp;&nbsp;└─ web/<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ app.ts&nbsp;&nbsp;❌ src/api 밖<br>
<br>
같은 자리에 <b>*</b> 하나만 썼다면? <b>src/api/*.ts</b> → payment.ts가 ❌ (한 칸 초과 — 시험 단골 함정)
        </div>
        <h4>④ 이제 본론 — .claude/rules/ + paths</h4>
        <ul>
          <li>규칙 .md 파일의 YAML frontmatter에 <code>paths: ["terraform/**/*"]</code>처럼 글롭 지정</li>
          <li>효과: <strong>매칭되는 파일을 편집할 때만</strong> 그 규칙이 컨텍스트에 로드 — 조건부 스위치</li>
          <li>이점: 무관한 컨텍스트 감소 = <strong>토큰 절약</strong> + 지시 간섭 감소</li>
        </ul>
        <h4>⑤ 시험에서 글롭이 나오는 자리 (헷갈림 방지)</h4>
        <ul>
          <li><code>.claude/rules/</code>의 <code>paths</code> (이 챕터) — 규칙을 <strong>언제 켤지</strong> 정하는 조건</li>
          <li>내장 도구 <code>Glob</code> (2.5) — 같은 문법으로 <strong>파일을 찾는</strong> 도구. 문법은 같고 용도가 달라</li>
          <li><strong>CLAUDE.md에는 글롭이 안 나와</strong> — 항상 로드라 조건이 필요 없거든. 글롭은 "조건부"를 만들 때만 등장</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"글롭 규칙 vs 디렉토리 CLAUDE.md — 언제 무엇을",
       html:`__MAP3:rules__<h4>결정 기준: 대상 파일이 어디에 흩어져 있나</h4>
        <ul>
          <li>대상이 <strong>한 폴더에 모여</strong> 있다 → 디렉토리 CLAUDE.md도 가능</li>
          <li>대상이 <strong>코드베이스 전역에 산재</strong> (Button.test.tsx가 Button.tsx 옆에) → <strong>글롭 규칙이 정답</strong></li>
          <li>디렉토리 CLAUDE.md는 폴더에 묶여 있어 산재 파일을 못 따라감</li>
        </ul>
        <h4>공식 가이드 샘플 문제 6번 복기 (가이드 맨 뒤 예시 12문항 중 하나 — 산재 컨벤션 자동 적용을 묻는 문제)</h4>
        <ul>
          <li>React 컴포넌트·API 핸들러·DB 모델·테스트가 각각 다른 컨벤션</li>
          <li>테스트 파일은 코드 옆 산재 + "자동 적용" 요구</li>
          <li>→ <code>.claude/rules/</code> + 글롭 (스킬은 호출해야 해서 "자동"이 안 됨, 루트 통짜는 추론 의존)</li>
        </ul>
        <div class="callout">🎯 시험 포인트: "spread throughout the codebase" + "automatically"가 함께 보이면 글롭 규칙이 정답.</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1 — The rule that won't fire",
       q:`You created .claude/rules/api-conventions.md with frontmatter paths: ["src/api/*.ts"]. It works when editing src/api/index.ts, but the conventions never load for src/api/v2/handlers/payment.ts or src/api/middleware/auth/verify.ts — where most API code actually lives. The rule file's content is correct. What is wrong?`,
       opts:[
         {t:`The glob src/api/*.ts matches only files directly inside src/api/, not nested subdirectories — change it to src/api/**/*.ts so the rule fires at any depth.`, ok:true},
         {t:`Rules can only match files up to one directory deep by design; nested conventions need per-directory CLAUDE.md files.`},
         {t:`The frontmatter needs multiple entries — paths accepts only one directory level per pattern, so each subdirectory must be listed.`},
         {t:`YAML frontmatter is case-sensitive about the paths key; it should be capitalized as Paths.`},
       ],
       hint:`잘 되는 파일과 안 되는 파일의 경로를 나란히 놓고 봐 — 차이는 딱 하나, 깊이야. *와 **의 차이 기억나?`,
       explain:{
         good:`글롭 문법 디버깅: *는 한 단계 이름 하나, **는 모든 하위 폴더. 중첩 구조에서 규칙이 침묵하면 십중팔구 ** 누락이야. 시험도 이런 패턴 판독을 요구해.`,
         wrongs:[
           `<b>B — 깊이 제한설:</b> 존재하지 않는 제약 — **가 정확히 이 용도야.`,
           `<b>C — 폴더별 나열:</b> 새 하위 폴더마다 목록 갱신 — ** 하나로 될 일을 유지보수 짐으로.`,
           `<b>D — 대문자 Paths:</b> 허구의 문법 규칙 — 오답 장치.`,
         ]},
       principle:"* 는 한 층, ** 는 전부"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2 — The overloaded context",
       q:`Your root CLAUDE.md now carries Terraform conventions, React style rules, SQL migration policies, and API design standards (1,100 lines). Developers editing a single React component get all of it loaded, and Claude occasionally applies Terraform advice to React code. What is the best restructuring?`,
       opts:[
         {t:`Split the conventions into .claude/rules/ files with path scoping — e.g., paths: ["terraform/**/*"] for Terraform, ["src/**/*.tsx"] for React — so each loads only when matching files are edited.`, ok:true},
         {t:`Keep the root CLAUDE.md but add clearer section headers so Claude knows which section to apply.`},
         {t:`Move all conventions into the user-level ~/.claude/CLAUDE.md to shorten the project file.`},
         {t:`Convert each convention set into a slash command developers run before editing.`}],
       hint:`증상이 두 개야: 토큰 낭비 + 규칙 간섭(Terraform 조언이 React에). 둘 다 "전부 항상 로드"가 원인이지?`,
       explain:{
         good:`조건부 로딩이 두 증상을 한 번에 해결: 매칭 파일 편집 때만 해당 규칙 로드 → 토큰 절약 + 무관 규칙 간섭 제거. 가이드 3.1+3.3 결합 패턴.`,
         wrongs:[
           `<b>B:</b> 헤더 정리는 추론 의존 그대로 — 전부 로드되는 구조가 안 바뀌어.`,
           `<b>C:</b> 팀 공유가 깨져 — 문제를 옮겼을 뿐.`,
           `<b>D:</b> 커맨드는 수동 호출 — 컨벤션의 "자동 적용" 목적과 모순.`,
         ]},
       principle:"항상 로드 대신 조건부 로딩"},
    ]},

  /* ===== CH 4 · 3.4 plan mode vs 직접 실행 ===== */
  { id:"p3c4", ch:"CH 4", title:"plan mode vs 직접 실행 (3.4)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"계획부터 세울 일과 바로 할 일",
       html:`<h4>plan mode</h4>
        <ul>
          <li>코드 수정 전에 <strong>탐색·설계만</strong> 하는 모드 — 안전하게 조사하고 접근을 정한 뒤 실행</li>
          <li>적합: <strong>대규모 변경 · 복수의 유효한 접근 · 아키텍처 결정 · 다중 파일 수정</strong></li>
          <li>예: 모놀리스→마이크로서비스 전환(한 덩어리 앱을 작은 서비스 여러 개로 쪼개는 대공사), 45개+ 파일을 고쳐야 하는 라이브러리 마이그레이션(쓰던 부품을 다른 부품으로 통째 교체), 인프라 요구가 다른 통합 방식 선택</li>
        </ul>
        <h4>직접 실행</h4>
        <ul>
          <li>적합: <strong>범위가 명확한 단순 변경</strong></li>
          <li>예: 스택 트레이스가 있는 단일 파일 버그, 날짜 검증 조건 하나 추가</li>
        </ul>
        <div class="callout">📖 지문 독해 용어 카드 (시험 지문 단골 4종) — <b>crash</b>: 프로그램이 에러로 강제 종료. <b>null</b>: "값 없음" 빈칸 — "crashes on null input" = 빈 값이 들어오면 죽는다. <b>stack trace</b>: 프로그램이 죽을 때 자동으로 찍히는 사고 경위서(어느 파일 몇째 줄에서 무슨 에러). 지문에 "stack trace makes the cause clear"가 보이면 <b>진단은 이미 끝났다</b>는 신호. <b>guard clause</b>: 함수 첫머리의 한 줄 방어 코드 — "one-line guard clause fixes it" = 수정이 한 줄로 끝난다.</div>
        <div class="callout">🎯 독해 공식: stack trace 명확 + one-line 수정 + 기존(existing) 테스트 존재 → 절차를 더하는 보기(plan mode·Explore·fork)는 전부 함정. already/existing에 밑줄 긋는 습관.</div>
        <h4>Explore 서브에이전트</h4>
        <ul>
          <li>장황한 <strong>탐색 출력을 격리</strong>하고 요약만 반환 → 본 대화 컨텍스트 보존</li>
          <li>다단계 작업에서 컨텍스트 고갈을 막는 장치</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"판단 기준과 조합 사용",
       html:`__MAP3:mode__<h4>판단 3문답</h4>
        <ul>
          <li>유효한 접근이 <strong>여러 개</strong>인가? → plan mode</li>
          <li>파일 <strong>몇 개</strong>를 건드리나? 많으면 → plan mode</li>
          <li>이미 <strong>정답 경로가 명확</strong>한가? (스택 트레이스, 한 줄 수정) → 직접 실행</li>
        </ul>
        <h4>조합 패턴</h4>
        <ul>
          <li><strong>plan mode로 조사·설계 → 직접 실행으로 구현</strong> — 마이그레이션의 정석 흐름</li>
          <li>탐색 단계가 길면 <strong>Explore 서브에이전트</strong>로 발견 출력 격리</li>
        </ul>
        <h4>오답 장치 (공식 가이드 샘플 5번 — plan mode vs 직접 실행 판별 문제 기준)</h4>
        <ul>
          <li>"일단 직접 실행으로 시작하고 복잡해지면 plan mode로" — 복잡성이 <strong>이미 요구사항에 명시</strong>돼 있는데 무시하는 보기</li>
          <li>"구현하면서 자연스럽게 경계를 발견" — 뒤늦은 재작업을 부르는 보기</li>
        </ul>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1 — The fix that grew",
       q:`You started in direct execution to fix "a timezone bug in the invoice renderer" — a clear, single-file task. Ten minutes in, Claude reports the real cause: three services each apply their own timezone conversion, sometimes double-converting; a proper fix means choosing where conversion should live and touching ~20 files. There are at least two defensible designs. What should you do?`,
       opts:[
         {t:`Stop implementing and switch to plan mode: explore the three services' conversion paths and design the approach — this has become an architectural decision with multiple valid options.`, ok:true},
         {t:`Stay in direct execution but patch the renderer to compensate for the double conversion — the original ticket only covered the renderer.`},
         {t:`Stay in direct execution and fix all ~20 files now, since Claude has already identified the root cause and momentum matters.`},
         {t:`Abandon the session and open a fresh one in plan mode, since mode decisions must be made before work begins.`},
       ],
       hint:`작업의 '실제 복잡도'가 방금 바뀌었어. 모드는 티켓 제목이 아니라 드러난 복잡도를 따라가야지. D의 전제도 의심해봐.`,
       explain:{
         good:`3.4의 판단 기준은 시작 시점에 고정되지 않아 — 단순해 보였던 작업이 아키텍처 결정(복수 설계 + 20파일)으로 드러나면 그 시점에 plan mode로 전환하는 게 맞아. 조사·설계 후 직접 실행으로 구현하는 조합 패턴의 실전 형태야.`,
         wrongs:[
           `<b>B — 렌더러 보정 패치:</b> 이중 변환 위에 삼중 보정을 얹는 것 — 근본 원인을 알고도 증상을 덮는 선택.`,
           `<b>C — 기세로 20파일:</b> 두 가지 유효한 설계 중 뭘 택할지도 안 정했는데 실행부터 — 재작업 예약.`,
           `<b>D — 새 세션:</b> 모드는 세션 도중에도 전환 가능 — 지금까지의 탐색(원인 발견)을 버릴 이유가 없어.`,
         ]},
       principle:"복잡도가 드러나면 모드를 갈아탄다"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2 — The vanishing context",
       q:`A multi-phase task requires first exploring a large codebase (which produces thousands of lines of file listings and searches), then designing and implementing a fix. In past attempts, by the time implementation started, the main conversation was full of exploration noise and Claude had lost track of the design. What is the best structural fix?`,
       opts:[
         {t:`Delegate the verbose discovery phase to the Explore subagent, which returns concise summaries, keeping the main conversation focused on design and implementation.`, ok:true},
         {t:`Ask Claude to "keep responses short" during exploration to reduce noise.`},
         {t:`Split the work across three separate sessions: one for exploration, one for design, one for implementation.`},
         {t:`Skip exploration and implement directly from the task description to save context.`}],
       hint:`"장황한 발견 출력을 격리하고 요약만 받는" 전용 장치가 있었지?`,
       explain:{
         good:`Explore 서브에이전트의 존재 이유: 발견 출력을 격리해 요약만 본 대화로 → 컨텍스트 고갈 방지. 가이드 3.4의 명시 패턴.`,
         wrongs:[
           `<b>B:</b> 짧게 말해달라는 건 확률적이고, 탐색에 필요한 정보량 자체는 줄지 않아.`,
           `<b>C:</b> 세션을 쪼개면 설계 컨텍스트를 매번 다시 전달해야 — 격리가 아니라 단절.`,
           `<b>D:</b> 탐색 생략은 모르는 코드를 찍어서 고치겠다는 것.`,
         ]},
       principle:"장황한 탐색은 Explore로 격리"},
    ]},

  /* ===== CH 5 · 3.5 반복 개선 기법 ===== */
  { id:"p3c5", ch:"CH 5", title:"반복 개선 기법 (3.5)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"결과를 끌어올리는 네 가지 대화 기술",
       html:`<h4>① 구체적 입출력 예시</h4>
        <ul>
          <li>말로 설명한 변환 요구가 <strong>들쭉날쭉하게 해석</strong>될 때 → <strong>예시 2~3개</strong>가 최고 효과</li>
          <li>엣지 케이스(예: 마이그레이션 중 null(값 없음)이 들어오는 경우)는 입력+기대 출력 테스트 케이스로</li>
        </ul>
        <h4>② 테스트 주도 반복</h4>
        <ul>
          <li>기대 동작·엣지·성능을 커버하는 <strong>테스트를 먼저</strong> 작성 → 실패를 공유하며 점진 개선</li>
        </ul>
        <h4>③ 인터뷰 패턴</h4>
        <ul>
          <li>구현 전에 <strong>Claude가 질문하게</strong> 하기 → 개발자가 놓친 고려사항 발굴 — 예: 캐시 무효화(저장해둔 옛 결과를 언제 버릴지), 실패 모드(어떤 식으로 망가질 수 있는지)</li>
          <li>낯선 도메인일수록 효과적</li>
        </ul>
        <h4>④ 한 번에 vs 순차</h4>
        <ul>
          <li>문제들이 <strong>서로 얽혀(interacting)</strong> 있으면 → 한 메시지에 상세히 몰아서</li>
          <li><strong>독립적</strong>이면 → 하나씩 순차 수정</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"증상별 처방 매칭",
       html:`__MAP3:iterate__<h4>증상 → 기법 매칭표</h4>
        <ul>
          <li>"설명은 자세히 했는데 형식이 매번 다르게 나와" → <strong>입출력 예시</strong></li>
          <li>"고쳤다는데 여전히 엣지에서 깨져" → <strong>구체적 테스트 케이스</strong> (null 입력 + 기대 출력)</li>
          <li>"요구를 다 말했다고 생각했는데 놓친 게 계속 나와" → <strong>인터뷰 패턴</strong> (구현 전 질문 받기)</li>
          <li>"버그 5개를 하나씩 고치니 서로 도로 깨뜨려" → <strong>얽힌 문제는 한 메시지에</strong></li>
        </ul>
        <div class="callout">🎯 시험 포인트: "prose 설명이 일관되지 않게 해석된다(interpreted inconsistently)"는 표현이 보이면 답은 거의 항상 concrete examples.</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1 — Five bugs, one queue",
       q:`Five bug reports landed on the checkout module: #1 and #2 both involve the shared CartState cache — last sprint, fixing one broke the other; #3 is a typo in an error message, #4 a broken date formatter in receipts, #5 a missing null check in an unrelated utility. How should you feed these to Claude Code?`,
       opts:[
         {t:`Present #1 and #2 together in one detailed message so their shared-state interaction is solved jointly; handle #3, #4, and #5 as separate sequential fixes since they're independent.`, ok:true},
         {t:`All five in one message — a single comprehensive pass ensures nothing gets forgotten and gives Claude full context.`},
         {t:`All five sequentially, hardest first — one problem at a time is always cleaner to review and test.`},
         {t:`#1 and #2 sequentially with a regression test added between them; #3-#5 batched into one cleanup message.`},
       ],
       hint:`가이드의 기준은 '개수'가 아니라 '얽힘'이야. 어떤 쌍이 서로를 도로 깨뜨렸는지 이력에 힌트가 있어.`,
       explain:{
         good:`3.5의 배분 원칙: 상호작용하는 문제(#1·#2, 공유 상태)는 한 메시지에 몰아 한 시야에서 조율하고, 독립 문제는 순차로. 지난 스프린트의 "고치면 딴 게 깨짐" 이력이 얽힘의 증거야.`,
         wrongs:[
           `<b>B — 전부 한 방:</b> 무관한 5개를 섞으면 주의력 희석 — 얽힌 것만 묶는 게 원칙이지 많이 묶는 게 아니야.`,
           `<b>C — 전부 순차:</b> #1·#2를 떼어 고치면 지난번 실패의 재방송 — 얽힌 쌍은 개별 처리가 불가능해.`,
           `<b>D — 얽힌 걸 순차 + 회귀 테스트:</b> 테스트는 깨짐을 '탐지'할 뿐 — 상호작용의 '조율'은 같은 시야에서만 가능해.`,
         ]},
       principle:"얽히면 묶고, 독립이면 나눠라"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2 — The unknown domain",
       q:`You ask Claude to implement a caching layer for a domain you barely know. Past attempts produced working code that later failed in ways you hadn't anticipated (stale invalidation, thundering herd). What interaction pattern best prevents this?`,
       opts:[
         {t:`Use the interview pattern: have Claude ask you clarifying questions before implementing, surfacing considerations like invalidation strategy and failure modes upfront.`, ok:true},
         {t:`Ask Claude to implement the cache, then review the code yourself for missed considerations.`},
         {t:`Provide a longer prompt listing every caching concern you can think of.`},
         {t:`Have Claude generate three alternative implementations and pick the most robust-looking one.`}],
       hint:`문제의 원인은 "네가 모르는 도메인이라 뭘 요구해야 할지 모른다"야. 그 빈틈을 누가 먼저 물어봐줘야 할까?`,
       explain:{
         good:`인터뷰 패턴의 정확한 사용처: 낯선 도메인에서 개발자가 예상 못 한 고려사항(캐시 무효화, 실패 모드)을 구현 전에 질문으로 발굴. 가이드 3.5 그대로.`,
         wrongs:[
           `<b>B:</b> 모르는 도메인이라 리뷰에서도 같은 걸 놓쳐 — 원점 회귀.`,
           `<b>C:</b> "생각나는 것 전부"가 문제야 — 생각 못 하는 게 원인인데.`,
           `<b>D:</b> 대안 3개를 봐도 판단 기준이 없으면 고르지 못해.`,
         ]},
       principle:"모르는 도메인 = 질문부터 받기"},
    ]},

  /* ===== CH 6 · 3.6 CI/CD 통합 ===== */
  { id:"p3c6", ch:"CH 6", title:"CI/CD 파이프라인 통합 (3.6)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"사람 없는 곳에서 Claude를 돌리는 법",
       html:`<div class="callout">📖 용어 카드 — <b>CI/CD</b>: 코드를 올릴 때마다 자동으로 검사·테스트·배포하는 컨베이어 벨트. <b>PR(pull request)</b>: 코드 변경 승인 요청서. <b>파이프라인</b>: 그 자동 단계들의 연결.</div>
        <div style="font-family:ui-monospace,Menlo,monospace;font-size:12.5px;line-height:2;background:var(--code-bg);border:1px solid var(--line);border-radius:10px;padding:14px 18px;margin:14px 0;overflow-x:auto">
<b>CI에서 Claude가 도는 흐름 — 내 컴퓨터에선 아무 일도 안 일어난다</b><br>
[내 컴퓨터]&nbsp;&nbsp;코드 수정 → push (서버로 올리기)<br>
&nbsp;&nbsp;&nbsp;&nbsp;↓<br>
[GitHub 서버]&nbsp;&nbsp;PR 감지 → 리포 안의 워크플로 설정 파일 발견 → <b>러너</b>(작업용 임시 가상 컴퓨터) 부팅<br>
&nbsp;&nbsp;&nbsp;&nbsp;↓<br>
[러너 안]&nbsp;&nbsp;① 리포 내려받기 → ② Claude Code 설치 → ③ <b>claude -p "리뷰해줘" --output-format json</b> <span style="color:var(--accent)">← 사람이 없으니 비대화형(-p)</span> → ④ 결과를 PR 코멘트로 게시<br>
&nbsp;&nbsp;&nbsp;&nbsp;↓<br>
[GitHub 서버]&nbsp;&nbsp;러너 폐기 — <b>"적용" = 설정 파일을 리포에 커밋하는 것 · "실행" = 서버가 알아서</b>
        </div>
        <h4>CLI 플래그 3종 (암기 필수)</h4>
        <ul>
          <li><code>-p</code> (<code>--print</code>) — <strong>비대화형 모드</strong>. 프롬프트 처리 → 출력 → 종료. 없으면 CI에서 입력 대기로 <strong>무한 정지</strong></li>
          <li><code>--output-format json</code> — 결과를 기계가 파싱할 JSON으로</li>
          <li><code>--json-schema</code> — 그 JSON의 <strong>형태를 스키마로 강제</strong></li>
        </ul>
        <h4>CI 속 컨텍스트 공급</h4>
        <ul>
          <li><strong>CLAUDE.md</strong>가 CI 실행에도 프로젝트 컨텍스트 제공 — 테스트 표준, 픽스처, 리뷰 기준을 문서화해두면 CI 품질이 올라감</li>
        </ul>
        <h4>세션 격리 원칙</h4>
        <ul>
          <li>코드를 <strong>생성한 세션</strong>은 자기 변경을 리뷰하는 데 약함 — 생성 때의 추론이 남아 자기 결정을 의심 못 함</li>
          <li>리뷰는 <strong>독립 인스턴스</strong>로 (D4 Ch6에서 확장)</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"CI 리뷰·테스트 생성의 품질 규칙",
       html:`__MAP3:ci__<h4>① 중복 코멘트 방지</h4>
        <ul>
          <li>새 커밋 후 재리뷰가 <strong>같은 지적을 반복</strong>하는 문제</li>
          <li>처방: <strong>이전 리뷰 발견 사항을 컨텍스트에 포함</strong> + "새 이슈·미해결만 보고하라"</li>
        </ul>
        <h4>② 중복 테스트 방지</h4>
        <ul>
          <li>테스트 생성이 이미 있는 시나리오를 또 제안하는 문제</li>
          <li>처방: <strong>기존 테스트 파일을 컨텍스트에 제공</strong></li>
        </ul>
        <h4>③ 저가치 테스트 방지</h4>
        <ul>
          <li>처방: CLAUDE.md에 <strong>테스트 표준·가치 기준·픽스처</strong> 문서화</li>
        </ul>
        <div class="callout">🎯 시험 포인트: CI 문제의 오답 장치는 "존재하지 않는 플래그" (CLAUDE_HEADLESS 환경변수, --batch 플래그) — 실제 존재하는 건 -p, --output-format json, --json-schema.</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1 — Pipeline design review",
       q:`A teammate's new CI review stage: (i) runs claude -p "Review this diff..." — works; (ii) extracts findings from the prose output with regex patterns like /(?:issue|bug):\\s*(.+)/i, which breaks weekly; (iii) reuses the same pipeline session that generated the code fix earlier in the job "to save tokens on context." Reviews miss obvious problems in the generated code. Which revision addresses the actual defects?`,
       opts:[
         {t:`Keep -p; replace the regex extraction with --output-format json plus --json-schema for machine-parseable findings; and run the review as a separate step with an independent instance that never saw the generation context.`, ok:true},
         {t:`Keep everything but harden the regex patterns to cover more phrasing variants of the findings.`},
         {t:`Replace -p with --output-format json, which handles both non-interactive execution and structured output in one flag.`},
         {t:`Add "review your earlier work with fresh eyes and maximum skepticism" to the same-session review prompt.`},
       ],
       hint:`결함이 두 개야: 출력 '형태'의 계약 부재(ii), 그리고 생성 세션의 자기 리뷰(iii). 각각의 공식 처방을 합친 보기를 찾아 — 부분만 고치는 보기가 함정이야.`,
       explain:{
         good:`3.6의 두 축을 동시에: 구조화 출력은 --output-format json + --json-schema(정규식 세탁 아님), 리뷰 품질은 세션 격리(생성 맥락 없는 독립 인스턴스). -p는 이미 맞게 쓰고 있으니 유지 — 뭐가 문제고 뭐가 아닌지 가리는 것까지가 문제의 일부야.`,
         wrongs:[
           `<b>B — 정규식 강화:</b> 자연어 출력과의 군비경쟁 — 매주 깨지는 구조가 그대로.`,
           `<b>C — 플래그 오해:</b> --output-format json은 출력 형태만 담당 — 비대화형 실행(-p)을 대체하지 않아. 절반의 진실 함정.`,
           `<b>D — "fresh eyes" 지시:</b> 같은 세션의 추론 맥락은 지시로 안 지워져 — 4.6에서 배운 그대로.`,
         ]},
       principle:"형태는 플래그로, 리뷰는 격리로"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2 — Groundhog-day reviews",
       q:`Your CI review bot re-reviews a PR after each new commit. Developers complain it re-posts the same findings each time — issue #4521 got the same "missing input validation" comment four times, even after it was fixed in commit 3. What is the best fix?`,
       opts:[
         {t:`Include the prior review findings in context when re-running, and instruct Claude to report only new issues or ones still unaddressed in the latest code.`, ok:true},
         {t:`Deduplicate comments in a post-processing step by string-matching against previously posted comments.`},
         {t:`Only review once, when the PR is first opened, to avoid repeats entirely.`},
         {t:`Have the bot delete all its previous comments before each re-review so duplicates never coexist.`}],
       hint:`봇이 반복하는 이유는 "지난번에 뭘 지적했는지"를 모르기 때문이야. 그 정보를 어디에 넣어야 할까?`,
       explain:{
         good:`가이드 3.6 명시: 재리뷰 시 이전 발견을 컨텍스트에 포함 + 새 이슈·미해결만 보고. 고쳐진 이슈는 자연히 빠지고, 새 커밋의 새 문제만 올라와.`,
         wrongs:[
           `<b>B:</b> 문자열 매칭은 표현이 조금만 달라져도 뚫려 — 그리고 "고쳐졌는데도 지적"이라는 더 나쁜 증상은 못 잡아.`,
           `<b>C:</b> 이후 커밋들이 무검사 통과 — 리뷰의 목적 포기.`,
           `<b>D:</b> 코멘트 이력(대화 맥락)을 파괴 + 반복 원인은 그대로.`,
         ]},
       principle:"원칙 ② 근본 원인 — 봇에게 기억을 줘라"},
    ]},

  /* ===== D3 미니테스트 ===== */
  { id:"p3test", type:"test", title:"D3 미니테스트 — Claude Code 12문항",
    questions:[
    {ts:"3.1", lvl:"기초", q:`Which CLAUDE.md location makes instructions apply to every developer who clones the repository?`,
     opts:[
       {t:`The project level — .claude/CLAUDE.md or a root CLAUDE.md committed to the repo.`, ok:true},
       {t:`The user level — ~/.claude/CLAUDE.md.`},
       {t:`Any location, as long as the file is named CLAUDE.md.`},
       {t:`The system level — /etc/claude/CLAUDE.md.`}],
     explain:{good:`프로젝트 레벨은 저장소에 커밋되어 클론 즉시 팀 전체 적용.`,
       wrongs:[`<b>B:</b> 사용자 레벨은 그 사람에게만.`,`<b>C:</b> 위치가 곧 스코프야.`,`<b>D:</b> 존재하지 않는 계층.`]},
     principle:"팀 적용 = 프로젝트 레벨"},
    {ts:"3.1", lvl:"실전", q:`Claude applies your testing conventions in some sessions but not others on the same machine and project. Which diagnostic step best identifies the cause?`,
     opts:[
       {t:`Run /memory to verify which memory files are actually loaded in the current session and compare across sessions.`, ok:true},
       {t:`Reinstall Claude Code to reset configuration state.`},
       {t:`Move all conventions to the user-level CLAUDE.md, which loads more reliably.`},
       {t:`Add "always follow the testing conventions" to the start of every prompt.`}],
     explain:{good:`"세션마다 다른 행동"의 1차 진단은 /memory — 어떤 파일이 로드됐는지 확인부터. 가이드 3.1의 진단 도구야.`,
       wrongs:[`<b>B:</b> 원인 파악 없는 재설치는 도박.`,`<b>C:</b> 사용자 레벨이 더 잘 로드된다는 규칙은 없어 — 스코프만 좁아져.`,`<b>D:</b> 로드 안 된 파일은 지시로 소환 못 해.`]},
     principle:"진단 먼저 — /memory"},
    {ts:"3.2", lvl:"기초", q:`A brainstorming skill produces long exploratory output that pollutes the main conversation. Which frontmatter option isolates it?`,
     opts:[
       {t:`context: fork — the skill runs in an isolated sub-agent context.`, ok:true},
       {t:`allowed-tools — restricting tools reduces output length.`},
       {t:`argument-hint — prompting for arguments keeps output focused.`},
       {t:`paths — scoping the skill to specific directories.`}],
     explain:{good:`context: fork = 격리 실행 → 장황한 출력이 본 대화에 안 남아.`,
       wrongs:[`<b>B:</b> 도구 제한은 출력 격리와 무관.`,`<b>C:</b> 인자 요구 기능일 뿐.`,`<b>D:</b> paths는 rules의 필드 — 스킬 frontmatter가 아니야.`]},
     principle:"장황한 스킬 = fork"},
    {ts:"3.2", lvl:"실전", q:`Your team's shared format-commit skill works well, but you personally want a variant with different commit message conventions — without affecting teammates. What is the correct approach?`,
     opts:[
       {t:`Create a personal variant under ~/.claude/skills/ with a different name, leaving the team's skill untouched.`, ok:true},
       {t:`Edit the team's skill in .claude/skills/ — your preferences are improvements others will appreciate.`},
       {t:`Add an if-branch inside the team skill keyed to your username.`},
       {t:`Override the team skill by creating a personal skill with the exact same name.`}],
     explain:{good:`가이드 3.2 명시: 개인 커스터마이징은 ~/.claude/skills/에 다른 이름의 변형으로 — 팀 자산을 건드리지 않는 격리 원칙.`,
       wrongs:[`<b>B:</b> 커밋되는 팀 스킬 무단 변경 — 전원에게 영향.`,`<b>C:</b> 팀 스킬에 개인 분기를 심는 오염.`,`<b>D:</b> 같은 이름 충돌은 혼란의 씨앗 — 가이드가 "다른 이름"을 명시한 이유.`]},
     principle:"개인 변형은 개인 스코프 + 다른 이름"},
    {ts:"3.3", lvl:"기초", q:`What does the paths field in a .claude/rules/ file's YAML frontmatter control?`,
     opts:[
       {t:`When the rule loads — only while editing files that match the glob patterns.`, ok:true},
       {t:`Which directories the agent is allowed to modify.`},
       {t:`Where the rule file itself must be stored.`},
       {t:`The order in which rules override each other.`}],
     explain:{good:`paths 글롭 = 조건부 로딩 스위치. 매칭 파일 편집 시에만 규칙이 컨텍스트에 들어와.`,
       wrongs:[`<b>B:</b> 수정 권한 제어가 아니야.`,`<b>C:</b> 파일 위치와 무관.`,`<b>D:</b> 우선순위 규칙이 아니야.`]},
     principle:"paths = 조건부 로딩"},
    {ts:"3.3", lvl:"실전", q:`SQL migration conventions must apply to migration files that live in db/migrations/, scripts/migrations/, and several service-specific folders like services/billing/migrations/. All migration files end in .sql. Which single rule configuration covers them all?`,
     opts:[
       {t:`One .claude/rules/ file with paths: ["**/migrations/**/*.sql"] matching migration SQL files wherever they live.`, ok:true},
       {t:`A CLAUDE.md file placed inside each of the migration directories.`},
       {t:`paths: ["db/migrations/*.sql"] — the other folders can be added later if problems appear.`},
       {t:`A root CLAUDE.md section titled "SQL migrations" that Claude applies when it sees .sql files.`}],
     explain:{good:`위치가 여럿 + 패턴은 하나(**/migrations/**/*.sql) — 글롭 하나로 산재 위치를 전부 커버. 3.3의 핵심 이점이야.`,
       wrongs:[`<b>B:</b> 폴더마다 파일 복제 — 유지보수 부담과 누락 위험.`,`<b>C:</b> 알려진 위치를 일부러 빼는 건 구멍을 계획하는 것.`,`<b>D:</b> 항상 로드 + 추론 의존 — 조건부 명시 매칭보다 약해.`]},
     principle:"산재 위치 = 글롭 하나로"},
    {ts:"3.4", lvl:"기초", q:`Which task is appropriate for direct execution rather than plan mode?`,
     opts:[
       {t:`Fixing a single-file bug with a clear stack trace pointing to the faulty line.`, ok:true},
       {t:`Migrating a library used across 45+ files.`},
       {t:`Restructuring a monolith into microservices.`},
       {t:`Choosing between two integration approaches with different infrastructure requirements.`}],
     explain:{good:`범위 명확 + 단일 파일 + 정답 경로가 보이는 작업 = 직접 실행.`,
       wrongs:[`<b>B:</b> 다중 파일 대규모 = plan mode.`,`<b>C:</b> 아키텍처 결정 = plan mode.`,`<b>D:</b> 복수의 유효한 접근 = plan mode.`]},
     principle:"명확·소규모 = 직접 실행"},
    {ts:"3.4", lvl:"실전", q:`For a 45-file library migration, your team plans to (1) investigate the codebase and design the approach, then (2) execute the changes. How should Claude Code's modes map onto this?`,
     opts:[
       {t:`Use plan mode for the investigation and design phase, then switch to direct execution to implement the planned approach.`, ok:true},
       {t:`Use plan mode for both phases — execution is safer when everything stays hypothetical.`},
       {t:`Use direct execution for both phases — the plan is just overhead once the team agrees.`},
       {t:`Use direct execution first to gather real errors, then plan mode to interpret them.`}],
     explain:{good:`가이드 3.4의 조합 패턴: plan mode로 조사·설계 → 직접 실행으로 구현. 각 모드를 맞는 국면에 배치.`,
       wrongs:[`<b>B:</b> plan mode는 실행을 안 해 — 계획만으론 마이그레이션이 끝나지 않아.`,`<b>C:</b> 45파일 설계 없이 실행 = 재작업 예약.`,`<b>D:</b> 에러를 일부러 만드는 순서 역전.`]},
     principle:"plan으로 설계, direct로 구현"},
    {ts:"3.5", lvl:"기초", q:`Claude's output format varies between runs despite detailed prose instructions. What is the most effective fix?`,
     opts:[
       {t:`Provide 2-3 concrete examples demonstrating the exact expected output format.`, ok:true},
       {t:`Repeat the format instructions twice in the prompt for emphasis.`},
       {t:`Ask Claude to acknowledge the format before starting.`},
       {t:`Reduce max_tokens so there is less room for deviation.`}],
     explain:{good:`형식 불일치의 1번 처방 = 구체적 예시. 산문 지시보다 실물이 강해.`,
       wrongs:[`<b>B:</b> 반복은 해석 문제를 못 풀어.`,`<b>C:</b> 인지 확인 ≠ 준수 보장.`,`<b>D:</b> 길이 제한은 형식과 무관.`]},
     principle:"형식은 예시로 고정"},
    {ts:"3.5", lvl:"실전", q:`Claude fixed five reported bugs one at a time, but each fix broke one of the previous ones — the bugs share state in the same module. What does best practice recommend?`,
     opts:[
       {t:`Present all five issues together in a single detailed message, since interacting problems need to be solved jointly.`, ok:true},
       {t:`Continue one at a time but add regression tests after each fix.`},
       {t:`Fix them in reverse order of severity so the critical ones land last.`},
       {t:`Ask Claude to refactor the entire module first, then re-report whichever bugs remain.`}],
     explain:{good:`가이드 3.5: 서로 얽힌(interacting) 문제는 한 메시지에 몰아서 — 상호작용을 한 시야에서 조율해야 해. 독립적일 때만 순차가 정답.`,
       wrongs:[`<b>B:</b> 회귀 테스트는 깨짐을 탐지할 뿐, 얽힌 수정을 조율하진 못해.`,`<b>C:</b> 순서 바꾸기는 상호작용 문제를 못 풀어.`,`<b>D:</b> 문제 정의 없이 전면 리팩토링부터 — 범위 폭발.`]},
     principle:"얽히면 한 번에, 독립이면 순차"},
    {ts:"3.6", lvl:"기초", q:`Which flag combination makes Claude Code produce machine-parseable, schema-conforming output for CI automation?`,
     opts:[
       {t:`--output-format json together with --json-schema.`, ok:true},
       {t:`--print together with --verbose.`},
       {t:`--json together with --strict.`},
       {t:`--output xml together with --schema.`}],
     explain:{good:`구조화 CI 출력 = --output-format json + --json-schema.`,
       wrongs:[`<b>B:</b> -p는 비대화형 실행 플래그일 뿐, 출력 구조를 보장하지 않아.`,`<b>C:</b> --json, --strict는 존재하지 않는 플래그 — 오답 장치.`,`<b>D:</b> --output xml, --schema도 존재하지 않는 조합.`]},
     principle:"실존 플래그 3종 암기"},
    {ts:"3.6", lvl:"실전", q:`Your CI test-generation job produces many low-value tests (trivial getters) and duplicates of scenarios the suite already covers. Which combination of fixes matches best practice?`,
     opts:[
       {t:`Provide the existing test files in context so duplicates are avoided, and document testing standards and valuable-test criteria (plus available fixtures) in CLAUDE.md.`, ok:true},
       {t:`Raise the temperature so generated tests are more diverse and less duplicative.`},
       {t:`Post-process the output to delete short tests, which are usually low-value.`},
       {t:`Limit generation to 5 tests per run so reviewers can filter quality manually.`}],
     explain:{good:`중복 방지 = 기존 테스트 제공, 저가치 방지 = CLAUDE.md에 표준·기준·픽스처 문서화. 가이드 3.6의 두 처방을 정확히 결합.`,
       wrongs:[`<b>B:</b> 다양성 ≠ 가치. 무엇이 가치 있는지 기준이 없는 게 원인.`,`<b>C:</b> 길이는 가치의 대리 지표가 아니야.`,`<b>D:</b> 수를 줄여도 품질 기준이 없으면 같은 비율로 저가치.`]},
     principle:"컨텍스트 공급이 CI 품질을 만든다"},
    ]},
  ]
};
