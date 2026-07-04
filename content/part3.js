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
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"CLAUDE.md — 항상 로드되는 지시문의 3계층",
       html:`<h4>3계층 구조</h4>
        <ul>
          <li><strong>사용자 레벨</strong> <code>~/.claude/CLAUDE.md</code> — 그 사람의 모든 프로젝트에, <strong>그 사람에게만</strong></li>
          <li><strong>프로젝트 레벨</strong> <code>.claude/CLAUDE.md</code> 또는 루트 <code>CLAUDE.md</code> — 저장소에 커밋, <strong>팀 전체</strong></li>
          <li><strong>디렉토리 레벨</strong> — 하위 폴더의 CLAUDE.md, 그 폴더 작업에 추가 적용</li>
        </ul>
        <h4>가장 많이 나오는 함정</h4>
        <ul>
          <li>사용자 레벨은 <strong>버전 관리로 공유되지 않음</strong> → "새 팀원에게 지시가 적용 안 됨" 문제의 원인</li>
        </ul>
        <h4>모듈화 도구 2가지</h4>
        <ul>
          <li><code>@import</code> — 외부 파일을 참조로 불러와 CLAUDE.md를 얇게 유지</li>
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
      {type:"quiz", kind:"PRACTICE · 영어 출제", h:"Practice 1 — The unshared standards",
       q:`You wrote detailed coding standards that Claude Code follows perfectly on your machine. A new teammate clones the repository, but Claude ignores every standard for them. What is the most likely cause?`,
       opts:[
         {t:`The standards live in your user-level ~/.claude/CLAUDE.md, which is not shared through version control — they belong at the project level.`, ok:true},
         {t:`The teammate's Claude Code version is outdated and cannot parse CLAUDE.md.`},
         {t:`CLAUDE.md files require each user to enable them in settings first.`},
         {t:`The standards file is too long and was silently truncated for the teammate.`}],
       hint:`네 기계에서만 완벽하게 작동한다는 게 단서야. 사용자 레벨과 프로젝트 레벨의 차이가 뭐였지?`,
       explain:{
         good:`"나에겐 되고 팀원에겐 안 되는" 설정 문제의 전형적 원인: 사용자 레벨은 버전 관리 밖이라 공유가 안 돼. 프로젝트 레벨로 옮기면 클론 즉시 적용.`,
         wrongs:[
           `<b>B:</b> 버전 문제라면 부분적으로라도 다르게 나타나 — "전부 무시"는 파일 부재를 가리켜.`,
           `<b>C:</b> 그런 활성화 설정은 존재하지 않아 — 없는 기능 보기.`,
           `<b>D:</b> 자동 잘림 같은 동작도 존재하지 않아.`,
         ]},
       principle:"적용 범위: 사용자 = 나만, 프로젝트 = 팀"},
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
          <li>파일 맨 위 <strong>YAML frontmatter</strong>로 동작 설정</li>
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
      {type:"quiz", kind:"PRACTICE · 영어 출제", h:"Practice 1 — Team-wide /review",
       q:`You want a custom /review slash command running your team's standard checklist, available to every developer who clones or pulls the repository. Where should the command file live?`,
       opts:[
         {t:`In the .claude/commands/ directory inside the project repository.`, ok:true},
         {t:`In ~/.claude/commands/ in each developer's home directory.`},
         {t:`In the CLAUDE.md file at the project root.`},
         {t:`In a .claude/config.json file with a commands array.`}],
       hint:`"클론하면 전원 사용 가능" = 버전 관리로 공유된다는 뜻. 커맨드의 프로젝트 스코프 위치가 어디였지?`,
       explain:{
         good:`프로젝트 스코프 커맨드는 .claude/commands/ — 커밋되어 클론·풀만 하면 팀 전원에게 생겨 (V2 샘플 4번).`,
         wrongs:[
           `<b>B:</b> 개인 스코프 — 공유 안 됨.`,
           `<b>C:</b> CLAUDE.md는 지시·컨텍스트용이지 커맨드 정의 위치가 아니야.`,
           `<b>D:</b> 존재하지 않는 설정 메커니즘 — 없는 기능 보기.`,
         ]},
       principle:"팀 공유 = 프로젝트 스코프 디렉토리"},
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
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"규칙이 필요할 때만 나타나게",
       html:`<h4>.claude/rules/ + paths</h4>
        <ul>
          <li>규칙 파일의 YAML frontmatter에 <code>paths: ["terraform/**/*"]</code>처럼 글롭 패턴 지정</li>
          <li>효과: <strong>매칭되는 파일을 편집할 때만</strong> 그 규칙이 로드</li>
          <li>이점: 무관한 컨텍스트 감소 = <strong>토큰 절약</strong> + 지시 간섭 감소</li>
        </ul>
        <h4>글롭 패턴 읽는 법</h4>
        <ul>
          <li><code>*</code> — 아무 이름 하나 / <code>**</code> — 모든 하위 폴더</li>
          <li><code>**/*.test.tsx</code> — 위치 불문 모든 .test.tsx 파일</li>
          <li><code>src/api/**/*</code> — src/api 아래 전부</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"글롭 규칙 vs 디렉토리 CLAUDE.md — 언제 무엇을",
       html:`__MAP3:rules__<h4>결정 기준: 대상 파일이 어디에 흩어져 있나</h4>
        <ul>
          <li>대상이 <strong>한 폴더에 모여</strong> 있다 → 디렉토리 CLAUDE.md도 가능</li>
          <li>대상이 <strong>코드베이스 전역에 산재</strong> (Button.test.tsx가 Button.tsx 옆에) → <strong>글롭 규칙이 정답</strong></li>
          <li>디렉토리 CLAUDE.md는 폴더에 묶여 있어 산재 파일을 못 따라감</li>
        </ul>
        <h4>샘플 6번의 논리 복기</h4>
        <ul>
          <li>React 컴포넌트·API 핸들러·DB 모델·테스트가 각각 다른 컨벤션</li>
          <li>테스트 파일은 코드 옆 산재 + "자동 적용" 요구</li>
          <li>→ <code>.claude/rules/</code> + 글롭 (스킬은 호출해야 해서 "자동"이 안 됨, 루트 통짜는 추론 의존)</li>
        </ul>
        <div class="callout">🎯 시험 포인트: "spread throughout the codebase" + "automatically"가 함께 보이면 글롭 규칙이 정답.</div>`},
      {type:"quiz", kind:"PRACTICE · 영어 출제", h:"Practice 1 — Conventions for scattered tests",
       q:`Test files live next to the code they test throughout your codebase (e.g., Button.test.tsx beside Button.tsx), and all tests must automatically follow the same conventions regardless of location. What is the most maintainable mechanism?`,
       opts:[
         {t:`A .claude/rules/ file with YAML frontmatter paths: ["**/*.test.tsx"] so the conventions load whenever a matching file is edited.`, ok:true},
         {t:`A separate CLAUDE.md in each directory that contains test files.`},
         {t:`A skill in .claude/skills/ containing the test conventions.`},
         {t:`All conventions in the root CLAUDE.md under headers, letting Claude infer which section applies.`}],
       hint:`파일이 전역에 흩어져 있고 "자동" 적용이 조건이야. 디렉토리 파일과 스킬이 각각 왜 탈락인지 생각해봐.`,
       explain:{
         good:`산재 파일 + 자동 적용 = 글롭 경로 규칙의 존재 이유 (V2 샘플 6번).`,
         wrongs:[
           `<b>B:</b> 테스트가 있는 모든 폴더마다 CLAUDE.md — 유지 불가에 폴더 종속.`,
           `<b>C:</b> 스킬은 호출하거나 모델이 선택해야 로드 — "자동" 요구와 모순.`,
           `<b>D:</b> 추론 의존은 명시적 매칭보다 불안정.`,
         ]},
       principle:"산재 + 자동 = 글롭 규칙"},
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
          <li>예: 모놀리스→마이크로서비스, 45+ 파일 라이브러리 마이그레이션, 인프라 요구가 다른 통합 방식 선택</li>
        </ul>
        <h4>직접 실행</h4>
        <ul>
          <li>적합: <strong>범위가 명확한 단순 변경</strong></li>
          <li>예: 스택 트레이스가 있는 단일 파일 버그, 날짜 검증 조건 하나 추가</li>
        </ul>
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
        <h4>오답 장치 (샘플 5번)</h4>
        <ul>
          <li>"일단 직접 실행으로 시작하고 복잡해지면 plan mode로" — 복잡성이 <strong>이미 요구사항에 명시</strong>돼 있는데 무시하는 보기</li>
          <li>"구현하면서 자연스럽게 경계를 발견" — 뒤늦은 재작업을 부르는 보기</li>
        </ul>`},
      {type:"quiz", kind:"PRACTICE · 영어 출제", h:"Practice 1 — Monolith to microservices",
       q:`You are assigned to restructure a monolithic application into microservices — changes across dozens of files with decisions about service boundaries and module dependencies. Which approach should you take?`,
       opts:[
         {t:`Enter plan mode to explore the codebase, understand dependencies, and design the approach before making changes.`, ok:true},
         {t:`Start with direct execution and let the implementation reveal the natural service boundaries.`},
         {t:`Use direct execution with comprehensive upfront instructions detailing every service's structure.`},
         {t:`Begin in direct execution and switch to plan mode only if unexpected complexity appears.`}],
       hint:`대규모 + 아키텍처 결정 + 다중 파일 — plan mode의 세 조건이 전부 있지? 그리고 복잡성은 "예상 밖"이 아니라 이미 명시돼 있어.`,
       explain:{
         good:`plan mode의 정의 그대로인 과제 (V2 샘플 5번): 대규모 변경 + 복수 접근 + 아키텍처 결정. 탐색·설계 후 실행이 재작업을 막아.`,
         wrongs:[
           `<b>B:</b> 경계를 "구현이 알려줄 것"이라는 기대는 뒤늦은 의존성 발견 = 비싼 재작업.`,
           `<b>C:</b> 탐색 없이 구조를 이미 안다고 전제 — 모르니까 재구조화하는 건데.`,
           `<b>D:</b> 복잡성은 요구사항에 이미 명시 — "나중에 나타나면"이라는 전제가 틀렸어.`,
         ]},
       principle:"대규모·복수 접근·아키텍처 = plan mode"},
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
          <li>엣지 케이스(마이그레이션의 null 값 등)는 입력+기대 출력 테스트 케이스로</li>
        </ul>
        <h4>② 테스트 주도 반복</h4>
        <ul>
          <li>기대 동작·엣지·성능을 커버하는 <strong>테스트를 먼저</strong> 작성 → 실패를 공유하며 점진 개선</li>
        </ul>
        <h4>③ 인터뷰 패턴</h4>
        <ul>
          <li>구현 전에 <strong>Claude가 질문하게</strong> 하기 → 개발자가 놓친 고려사항(캐시 무효화, 실패 모드) 발굴</li>
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
      {type:"quiz", kind:"PRACTICE · 영어 출제", h:"Practice 1 — Inconsistent transformations",
       q:`You describe a data transformation in careful prose ("normalize phone numbers, preserving country codes where present..."), but Claude's implementations vary between attempts — each interpreting the description differently. What is the most effective way to pin down the requirement?`,
       opts:[
         {t:`Provide 2-3 concrete input/output example pairs demonstrating the expected transformation, including an edge case.`, ok:true},
         {t:`Rewrite the prose description to be twice as detailed.`},
         {t:`Ask Claude to explain its interpretation before each attempt and correct it verbally.`},
         {t:`Lower the temperature so implementations become more deterministic.`}],
       hint:`"산문이 일관되지 않게 해석된다" — 이 증상의 1번 처방이 뭐였지?`,
       explain:{
         good:`가이드 3.5 명시: prose가 들쭉날쭉 해석될 때 입출력 예시 2~3개가 가장 효과적. 예시는 해석의 여지를 없애는 실물 계약이야.`,
         wrongs:[
           `<b>B:</b> 산문을 늘리면 해석 지점도 늘어 — 같은 문제의 확대.`,
           `<b>C:</b> 매번 해석을 교정하는 왕복 — 예시 한 번이면 될 일을 반복 노동으로.`,
           `<b>D:</b> temperature는 일관성을 높여도 "무엇이 맞는지"를 못 정해 — 틀린 해석이 일관되게 나올 뿐.`,
         ]},
       principle:"모호하면 예시 — 산문보다 실물"},
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
      {type:"quiz", kind:"PRACTICE · 영어 출제", h:"Practice 1 — The hanging pipeline",
       q:`Your pipeline runs claude "Analyze this pull request for security issues" but the job hangs indefinitely, with logs showing Claude Code waiting for interactive input. What is the correct fix?`,
       opts:[
         {t:`Add the -p flag: claude -p "Analyze this pull request for security issues"`, ok:true},
         {t:`Set the environment variable CLAUDE_HEADLESS=true before the command.`},
         {t:`Redirect stdin from /dev/null so no input can be expected.`},
         {t:`Add the --batch flag to run in batch mode.`}],
       hint:`비대화형 실행의 공식 플래그 하나만 기억하면 되는 문제야. 나머지 보기 중 둘은 아예 존재하지 않는 기능이야.`,
       explain:{
         good:`-p(--print)가 비대화형 모드의 공식 플래그: 처리 → stdout 출력 → 종료 (V2 샘플 10번).`,
         wrongs:[
           `<b>B:</b> CLAUDE_HEADLESS는 존재하지 않는 환경변수 — 전형적 오답 장치.`,
           `<b>C:</b> 유닉스 우회술이지 Claude Code의 명령 문법을 고치는 게 아니야.`,
           `<b>D:</b> --batch도 존재하지 않는 플래그.`,
         ]},
       principle:"실존 기능 vs 그럴듯한 허구 구분"},
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
