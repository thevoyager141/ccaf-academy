/* ============================================================
   open-p3.js · PART 3 (D3) 오프닝 레슨 + 이유 카드 + 용어사전 확장
   2026-08-27

   로드 순서: part3.js · mt-extra.js · p3-plus.js · appendix.js 뒤.
   기존 배열 원소는 지우거나 덮어쓰지 않고 추가만 함.

   구성
     (1) p3.lessons 맨 앞(index 0)에 오프닝 레슨 p3c0 삽입 (9스텝)
     (2) p3c1~p3c7 기존 quiz 스텝 21개 전부에 why(이유 카드) 부착
     (3) CCAF_APPENDIX.glossary 에 D3 용어 24개 추가

   사실 근거: p3-plus.js 머리말에 적힌 2026-08-27 확인분(공식 문서)만 사용함.
   새 플래그와 새 값은 지어내지 않음.
   ============================================================ */
(function(){
  var C = window.CCAF_CONTENT;
  if(!C || !C.p3 || !C.p3.lessons) return;
  /* 두 번 eval 돼도 중복 삽입되지 않게 하는 가드. 아래 (1)(2)(3) 전체를 한 번만 실행함 */
  if(C.p3.lessons.some(function(l){ return l.id === "p3c0"; })) return;

  /* ============================================================
     (1) 오프닝 레슨
     ============================================================ */

  /* 네 스텝이 공유하는 시나리오 브리핑. 영어 순수 텍스트이며 HTML 태그가 없음 */
  var BRIEF = {
    title: "SCENARIO · CLAUDE CODE IN A SHARED TEAM REPOSITORY",
    body: "Northwind Retail keeps one repository that 22 engineers share. Checkout code lives under services/checkout/, settlement jobs under pipelines/settlement/, and a React storefront under web/. The team adopted Claude Code six weeks ago and three complaints reached the platform lead this sprint. First, a 40-page payments compliance handbook was pasted into the repository's always-loaded instruction file so that nobody could miss it. Every session now carries it, storefront sessions included, and the team measured roughly 11,000 tokens of it on work that never touches payments. Second, an engineer asked for a small currency-rounding fix and the assistant changed nineteen files across two services, because rounding can either live in one shared money helper or be pushed out to each service boundary, and nobody had agreed on which. Third, the nightly pull-request review job runs unattended on a shared CI runner. Last week it was still alive at 9am, its final log line a request to approve a shell command, and the dashboard that ingests its findings breaks about once a week because it scrapes sentences out of prose. Compliance adds one hard requirement: the review step must never write to the repository. The quarter's budget is fixed, and the platform lead wants each complaint handled by the mechanism that actually addresses it."
  };

  var p3c0 = { id:"p3c0", ch:"OPEN", title:"D3는 시험에서 이렇게 나온다", steps:[

    /* ---------- ① 실전 형태 예고 ---------- */
    {type:"concept", kind:"PART BRIEFING · 파트 설명", h:"이 파트의 출제 비중과 문항 형태",
     html:`<p class="lead">이 파트는 <strong>Claude Code Configuration &amp; Workflows (D3)</strong>임. 출제 비중은 <strong>20% ≈ 12문항</strong>이고, 이 도메인이 얹히는 출제 상황은 거의 정해져 있음. <strong>시나리오 ② Claude Code 코드 생성</strong>과 <strong>시나리오 ⑤ CI/CD 통합</strong>임.</p>

      <h4>이 파트에서 정답률이 크게 떨어지는 이유</h4>
      <ul>
        <li>이 영역은 <strong>여러 설정 수단 중 하나를 고르는 형태</strong>로 출제됨. CLAUDE.md · 규칙 파일 · 스킬(skill) · 훅(hook) · 권한 설정이 한 문항의 보기에 함께 등장함</li>
        <li>수단 사이의 차이를 모르면 보기를 소거할 수 없으므로 정답률이 크게 떨어짐. 개념을 각각 아는 것과, 나란히 놓고 하나를 고르는 것은 서로 다른 능력임</li>
        <li>그래서 "이미 아는 내용"이라고 판단해 빠르게 넘기면 실전에서 같은 자리에서 막힘</li>
      </ul>

      <h4>단일 개념 확인형과 실전 선택 비교형의 차이</h4>
      <table>
        <tr><th></th><th>단일 개념 확인형</th><th>실제 시험</th></tr>
        <tr><td>묻는 방식</td><td>개념 하나를 확인함. "CLAUDE.md는 무엇인가"</td><td><strong>선택 비교</strong>. "CLAUDE.md인가 규칙 파일인가 스킬인가 훅인가 권한 설정인가"</td></tr>
        <tr><td>지문 구조</td><td>문항 하나에 상황 한 줄</td><td><strong>상황 브리핑 하나 + 그 아래 문항 여러 개</strong></td></tr>
        <tr><td>푸는 방식</td><td>외운 정답 패턴을 그대로 대응시킴</td><td>외운 패턴이 <strong>보기에 전부 들어 있음</strong>. 조건을 읽어야 갈림</td></tr>
      </table>

      <h4>비개발자가 막히는 지점</h4>
      <ul>
        <li>터미널 · 설정 파일 · 글롭 패턴(glob pattern) · 훅 · CI 같은 말이 지문에 설명 없이 등장함. 뜻을 모르면 조건을 읽을 수 없고, 조건을 읽지 못하면 비교형은 풀 수 없음</li>
        <li>그래서 이 오프닝의 뒷부분(스텝 8)에서 그 용어들을 <strong>0부터</strong> 정리함. 비유를 쓰지 않고 실제로 무슨 일이 일어나는지로만 서술함</li>
      </ul>

      <div class="callout">🎯 이 오프닝의 목적은 세 가지임. ① 실전 문항 묶음이 어떤 모양인지 <b>실물로</b> 한 번 확인하기 ② D3 전체 구조를 그림 한 장으로 파악하기 ③ 그림에 나오는 용어를 0부터 채우기. 다음 스텝부터 실물임.</div>`},

    /* ---------- ② 시나리오 블록 · 브리핑 읽는 법 ---------- */
    {type:"concept", brief:BRIEF, kind:"CONCEPT · 개념 설명", h:"실전 블록 실물: 브리핑 읽는 법 네 칸",
     html:`<p class="lead">위 회색 박스가 <strong>브리핑</strong>임. 실전에서는 이 박스 하나 아래에 문항이 여러 개 붙음. 지금부터 나오는 문항 세 개는 <strong>전부 같은 브리핑</strong> 위에서 출제됨. 스크롤을 올려 다시 읽을 수 있도록 박스가 계속 따라붙음.</p>

      <h4>브리핑은 네 칸으로 나눠 읽을 것</h4>
      <table>
        <tr><th>칸</th><th>찾을 것</th><th>이 브리핑에서는</th></tr>
        <tr><td><strong>시나리오 구성</strong></td><td>누가 어디서 무엇을 쓰는가</td><td>22명이 공유하는 저장소(repository) 하나 · 폴더 셋(checkout / settlement / web) · 도입 6주차</td></tr>
        <tr><td><strong>증상</strong></td><td>지금 무엇이 잘못됐는가. 수치가 붙어 있으면 그것이 채점 기준임</td><td>① 무관한 세션마다 11,000토큰 ② 작은 요청이 19파일로 번짐 ③ 밤새 승인 대기 + 대시보드 주 1회 파손</td></tr>
        <tr><td><strong>제약</strong></td><td>어길 수 없는 조건. 여기서 오답이 갈림</td><td>리뷰 단계는 저장소에 <strong>쓰기 금지</strong> · 분기 예산 고정 · 러너에 <strong>사람 없음</strong></td></tr>
        <tr><td><strong>질문</strong></td><td>증상 중 <strong>몇 개</strong>를 해결하라는 것인가</td><td>"각 불만을 실제로 해결하는 수단으로". 일부만 고치는 보기가 오답 유도 선택지임</td></tr>
      </table>

      <h4>읽는 순서: 증상보다 제약을 먼저</h4>
      <ul>
        <li>비교형에서 보기 넷은 대개 <strong>전부 그럴듯함</strong>. 갈라 주는 것은 제약 문장임</li>
        <li>"절대 / 반드시 / 보장 / 규정" 같은 말이 붙으면 <strong>지시문으로 요청하는 보기는 그 자리에서 탈락</strong>임. 실행 계층이 거부하는 수단만 남음</li>
        <li>"사람이 없음 / 자동으로 / 새 팀원" 같은 말이 붙으면 <strong>사람의 기억에 기대는 보기가 탈락</strong>임</li>
        <li>수치(11,000토큰, 19파일, 주 1회)는 장식이 아니라 <strong>정답이 반드시 해결해야 할 항목의 목록</strong>임</li>
      </ul>

      <div class="callout">📋 지금부터 문항 세 개임. 하나는 <b>지침을 어디에 둘 것인가</b>, 하나는 <b>어떤 실행 방식으로 갈 것인가</b>, 하나는 <b>CI에서 어떻게 부를 것인가</b>를 물음. 셋 다 "여러 수단 중 무엇을 쓸 것인가" 형태이고, 실전이 정확히 이 모양으로 출제됨.</div>`},

    /* ---------- ② 문항 1 · 지침을 어디에 두는가 ---------- */
    {type:"quiz", brief:BRIEF, kind:"PRACTICE · 선택 비교형", h:"Q1 — Where the handbook belongs",
     q:"Complaint one. The 40-page payments handbook sits in the repository's always-loaded instruction file. It is relevant only to work under services/checkout/ and pipelines/settlement/; both trees already exist and are edited most weeks; and the guidance has to reach whoever edits them without anyone remembering to switch it on. Which home fits every constraint?",
     opts:[
       {t:"A rule file under the project's rules folder whose frontmatter lists patterns for those two trees, so the handbook enters context only while such files are being edited and no other session carries any of it.", ok:true},
       {t:"Keep it in the always-loaded instruction file but move it to the end under a heading that tells the assistant to skip the section unless the current work is payments related."},
       {t:"Package it as a skill, which costs nothing until invoked, and tell the checkout and settlement engineers to invoke it at the start of any session touching those trees."},
       {t:"Move it into each payments engineer's personal instruction file, so only the people who actually work on payments pay for it."},
     ],
     hint:`조건을 두 가지로 나눌 것. ① 규칙을 켜는 조건이 될 파일이 <b>지금 존재</b>하는가 ② 사람이 기억해야 켜지는 방식이어도 되는가. 브리핑에 "아무도 켤 필요 없이"라는 말이 왜 들어갔는지 확인할 것.`,
     explain:{
       good:`조건부 로딩이 성립하는 표준 상황임. 규칙을 켜는 조건이 될 파일이 이미 있고, 경계가 폴더 두 개로 나뉘고, 자동으로 켜져야 함. 이 세 조건이 모두 맞으면 경로 조건이 붙은 규칙 파일이 정답임. 상시 로드는 <strong>비용</strong>을, 호출형은 <strong>사람의 기억</strong>을 대가로 요구하는데 브리핑이 둘 다 내줄 수 없다고 명시함.`,
       wrongs:[
         `<b>B(섹션을 나누고 건너뛰라고 적기):</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 문서 정리 방법으로는 옳음. 그러나 토큰은 <strong>컨텍스트에 로드되는 순간 이미 지불</strong>됨. 읽고 건너뛰든 아니든 11,000토큰은 그대로 청구되므로 증상이 전혀 줄지 않음.`,
         `<b>C(스킬로 만들고 부르게 하기):</b> 비용 문제는 해결됨. 대신 규정 준수를 "매번 잊지 않고 호출하기"에 맡기게 됨. 규칙을 켤 조건이 될 파일이 이미 있는데 사람의 기억을 조건으로 삼을 이유가 없음.`,
         `<b>D(개인 파일로 옮기기):</b> 개인 파일은 저장소 밖에 있어 버전 관리에 실리지 않음. 다음 주에 합류하는 사람의 환경에는 규정이 아예 없는 상태로 시작됨.`,
       ]},
     principle:"로드 시점 · 강제력 · 범위 세 가지 기준으로 나눌 것",
     why:{ q:`왜 이 상황에서 "경로 조건이 붙은 규칙 파일"이 정답이 되는가?`,
       opts:[
         {t:`조건부 로딩은 지금 편집 중인 파일을 조건으로 삼는데, 이 지문에는 그 조건이 될 파일이 이미 있고 경계도 폴더 두 개로 나뉘기 때문임`, ok:true},
         {t:`규칙 파일이 상시 로드 파일보다 우선순위가 높아 규정이 더 확실하게 지켜지기 때문임`},
         {t:`40페이지처럼 분량이 큰 문서는 규칙 파일에 두는 것이 정석이라고 배웠기 때문임`},
         {t:`규칙 파일에 넣으면 규정을 어기는 편집 자체를 차단해 주기 때문임`},
       ],
       explain:`조건부 로딩의 성립 조건은 하나임. <b>규칙을 켤 조건이 될 파일이 지금 존재하는가</b>. 아직 만들지 않은 파일에 대한 규칙이면 같은 보기가 그대로 오답이 됨.` }},

    /* ---------- ② 문항 2 · 실행 방식 ---------- */
    {type:"quiz", brief:BRIEF, kind:"PRACTICE · 선택 비교형", h:"Q2 — How the next attempt is run",
     q:"Complaint two. The rounding request grew into nineteen files across checkout and settlement because two designs are both defensible and neither was chosen. The payments owner now requires that the selected approach be written down and signed off before any file change lands. Which execution shape satisfies that?",
     opts:[
       {t:"Investigate and settle the approach with edits held back, hand the written approach to the payments owner for sign-off, and only afterwards switch to ordinary execution and build the agreed design.", ok:true},
       {t:"Let the assistant implement the shared-helper version straight away and describe the approach in the pull-request body, where the payments owner signs off during code review."},
       {t:"Have both designs implemented on separate branches so the payments owner can compare running code before signing, then delete the losing branch."},
       {t:"Keep ordinary execution but require a confirmation prompt before every single file write, so the payments owner approves the change file by file as it happens."},
     ],
     hint:`승인이 <b>무엇에 대한</b> 승인인지 확인할 것. 파일 한 장 한 장이 아니라 접근 방식에 대한 승인임. 그 승인이 <b>어느 두 단계 사이</b>에 들어가야 하는지도 문장에 그대로 적혀 있음.`,
     explain:{
       good:`유효한 설계가 둘이고 19파일이 걸리므로 조사와 설계를 먼저 분리하는 것은 확정임. 여기에 "파일 변경이 반영되기 전에 서명"이라는 조건이 하나 더 붙어 <strong>설계 → 사람 승인 → 실행</strong> 3단계가 됨. 승인이 끝나면 남은 선택지가 하나로 좁혀지므로 그 뒤는 일반 실행으로 충분함.`,
       wrongs:[
         `<b>B(PR 본문에서 승인):</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 대개의 팀에서 PR이 승인의 자리인 것은 사실임. 그러나 조건은 "파일 변경이 반영되기 전"임. PR 본문에 적는 시점에는 이미 19파일이 바뀐 뒤이므로 요구를 정면으로 위반함.`,
         `<b>C(두 설계를 모두 구현):</b> 승인 시점이 여전히 편집 뒤로 밀리고 비용과 위험만 두 배가 됨. 비교를 위해 동작하는 코드가 반드시 필요한 상황도 아님.`,
         `<b>D(파일마다 확인받기):</b> 승인의 단위가 틀림. 요구는 접근 방식 하나에 대한 서명이지 서른여덟 번의 예·아니오가 아님. 파일 단위로 물으면 정작 <strong>설계 선택은 아무도 검토하지 않고</strong> 지나감.`,
       ]},
     principle:"승인 게이트는 설계와 편집 사이",
     why:{ q:`왜 "계획 먼저, 그다음 승인, 그다음 실행"이 이 상황의 정답인가?`,
       opts:[
         {t:`유효한 설계가 둘이라 무엇을 만들지가 아직 정해지지 않았고, 승인 대상이 파일이 아니라 그 선택이라서 편집 전에 결정이 문서로 나와야 하기 때문임`, ok:true},
         {t:`계획을 먼저 세우면 같은 작업이라도 결과물의 품질이 더 좋게 나오기 때문임`},
         {t:`19파일처럼 규모가 큰 작업은 계획부터 세우는 것이 정석이라고 가이드에 나오기 때문임`},
         {t:`계획 단계에서는 편집이 차단돼 있어 승인 없이 파일이 바뀌는 사고를 시스템이 대신 막아 주기 때문임`},
       ],
       explain:`계획인가 직접 실행인가는 <b>작업 크기</b>가 아니라 <b>결정이 남아 있는가</b>로 갈림. 결정이 이미 하나로 좁혀져 있으면 19파일이라도 바로 실행이 맞음.` }},

    /* ---------- ② 문항 3 · CI 비대화형 호출 ---------- */
    {type:"quiz", brief:BRIEF, kind:"PRACTICE · 선택 비교형", h:"Q3 — Invoking the nightly reviewer",
     q:"Complaint three. The nightly review job stalled overnight at an approval prompt with nobody there to answer, the dashboard scrapes prose and breaks weekly, and compliance requires that the step never write to the repository. Which invocation shape covers all three?",
     opts:[
       {t:"Invoke it so it answers once and exits, start it in the mode that auto-denies anything outside a pre-approved list with only read and diff commands approved, and have it return schema-validated structured output the dashboard reads as fields.", ok:true},
       {t:"Invoke it so it answers once and exits, switch permission checking off entirely because the runner is disposable, and keep the prose output while making the dashboard's patterns stricter."},
       {t:"Keep the interactive invocation but raise the CI job's wall-clock timeout so an overnight stall is eventually killed, and add a line to the review prompt saying the assistant must never write files and must answer in JSON only."},
       {t:"Invoke it so it answers once and exits, add the flag that skips discovery of project context so every runner starts from an identical state, and cap the number of agentic turns so nothing can run all night."},
     ],
     hint:`요구가 셋임. 사람 없이 종료되기 / 저장소에 쓰지 못하게 하기 / 대시보드가 읽을 출력. 그리고 "지시로 요청하는 것"과 "실행 계층이 거부하는 것"의 차이를 구분할 것.`,
     explain:{
       good:`설정 수단이 셋이고 서로를 대신하지 못함. 비대화형 호출이 <strong>답하고 종료하기</strong>를, 미리 정한 것만 실행하는 권한 모드(permission mode)와 읽기·차이 확인으로 좁힌 허용 목록이 <strong>승인 대기 없음과 쓰기 불가</strong>를, 스키마로 검증된 구조화 출력(structured output)이 <strong>문장 대신 필드</strong>를 담당함. 하나라도 빼면 세 불만 중 하나가 그대로 남음.`,
       wrongs:[
         `<b>B(권한 검사를 전부 끄기):</b> 정지는 사라지지만 공유 러너에서 무엇이든 실행 가능한 상태가 됨. 쓰기 금지 요구와 정면으로 충돌하고 파싱 문제도 그대로임. 공식 문서가 이 모드를 격리된 컨테이너·VM 안으로 한정한 이유이기도 함.`,
         `<b>C(타임아웃을 늘리고 프롬프트로 금지):</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 끝나지 않는 작업을 중단시키기는 함. 그러나 그것은 <strong>결과 없이 종료되는 것</strong>이지 리뷰가 완료되는 것이 아님. 또한 "쓰지 말 것 / JSON으로만 답할 것"은 실행 계층의 거부가 아니라 요청이므로 규정의 근거가 되지 못함.`,
         `<b>D(탐색 건너뛰기 + 턴 상한):</b> 러너마다 시작 상태를 같게 만든다는 설명 자체는 정확함. 그러나 그 플래그는 저장소의 팀 표준까지 읽지 않아 리뷰 품질을 떨어뜨리고, 턴 상한은 <strong>승인 대기에도 파싱에도</strong> 영향이 없음.`,
       ]},
     principle:"비대화형 · 권한 · 출력 계약은 서로 다른 설정 수단",
     why:{ q:`왜 "프롬프트에 쓰지 말라고 적기"는 이 문항의 정답이 될 수 없는가?`,
       opts:[
         {t:`권한은 모델이 아니라 Claude Code가 집행하므로, 프롬프트나 지시문에 적은 금지는 무엇이 실행 가능한지를 바꾸지 못하기 때문임`, ok:true},
         {t:`프롬프트가 길어질수록 뒤쪽에 적은 지시를 모델이 놓칠 확률이 올라가기 때문임`},
         {t:`공식 문서가 CI에서는 프롬프트 대신 플래그를 쓰라고 권장하기 때문임`},
         {t:`JSON으로만 답하라고 지시하면 리뷰 내용 자체가 얕아지는 부작용이 있기 때문임`},
       ],
       explain:`조건에 "절대 / 보장 / 규정" 같은 말이 붙으면 <b>지시문 보기는 그 자리에서 탈락</b>임. 설정과 권한 계층에서만 정답이 나옴. D2·D5의 도구 제한 문항에도 그대로 쓰이는 판단 기준임.` }},

    /* ---------- ③ 블록 복기 ---------- */
    {type:"concept", kind:"TOPIC · 주제 설명", h:"방금 세 문항은 사실 같은 질문이었음",
     html:`<p class="lead">Q1은 "지침을 어디에 두는가", Q2는 "어떻게 실행하는가", Q3은 "CI에서 어떻게 부르는가"임. 표면은 서로 달라 보이지만 셋 다 <strong>여러 수단을 늘어놓고 이 조건에는 무엇을 쓸 것인가</strong>를 물었음. 실전 D3의 대부분이 이 형태임.</p>

      <h4>수단이 많아 보여도 갈리는 판단 기준은 세 가지임</h4>
      <ul>
        <li><strong>① 언제 로드되는가</strong>: 항상 / 조건이 맞을 때 / 부를 때 / 도구를 호출하는 순간</li>
        <li><strong>② 강제력이 있는가</strong>: 권고(모델이 따라 주기를 기대함) vs 집행(클라이언트가 실제로 거부함)</li>
        <li><strong>③ 범위가 어디까지인가</strong>: 본인만 / 팀 전원 / 이 폴더 / 이 실행 한 번</li>
      </ul>

      <h4>세 가지 판단 기준으로 정리한 비교표. D3의 핵심 도구임</h4>
      <table>
        <tr><th>수단</th><th>① 언제 로드되는가</th><th>② 강제력</th><th>③ 범위</th></tr>
        <tr><td>프로젝트 CLAUDE.md</td><td>세션 시작마다 항상</td><td>권고</td><td>저장소 전체 · 팀 전원 (커밋되므로)</td></tr>
        <tr><td>사용자 ~/.claude/CLAUDE.md</td><td>세션 시작마다 항상</td><td>권고</td><td>본인의 모든 프로젝트 · <strong>본인만</strong> (저장소 밖)</td></tr>
        <tr><td>.claude/rules/ + paths</td><td><strong>매칭되는 파일을 편집할 때만</strong></td><td>권고</td><td>글롭 패턴이 걸리는 파일 작업 · 팀 전원</td></tr>
        <tr><td>커스텀 커맨드 · 스킬</td><td><strong>부를 때만</strong> (그 전에는 이름과 설명만)</td><td>스킬의 도구 제한은 그 실행 중에만 집행됨</td><td>호출한 그 실행 한 번</td></tr>
        <tr><td>permissions allow / ask / deny</td><td>도구 호출 시점마다</td><td><strong>집행</strong>. 클라이언트가 거부함</td><td>세션 전체 · deny는 <strong>모든 모드에서</strong></td></tr>
        <tr><td>PreToolUse 훅</td><td>도구 호출 직전마다</td><td><strong>집행</strong></td><td>훅이 거는 조건에 걸리는 호출</td></tr>
        <tr><td>CLI 플래그 (--permission-mode · --allowedTools · --tools)</td><td>그 호출 한 번</td><td><strong>집행</strong></td><td>그 프로세스 하나</td></tr>
      </table>

      <h4>이 표를 문제에 쓰는 법: 조건 문장을 판단 기준으로 번역할 것</h4>
      <ul>
        <li>"항상 / 모든 세션에 / 새 팀원에게도" → 기준 ①이 <strong>항상</strong>, 기준 ③이 <strong>팀 전원</strong> → 프로젝트 CLAUDE.md</li>
        <li>"이 폴더를 편집할 때만 / 무관한 세션의 비용이 아까움" → 기준 ①이 <strong>조건부</strong> → 규칙 파일 + paths</li>
        <li>"한 달에 두 번 / 부를 때만 / 출력이 장황함" → 기준 ①이 <strong>호출 시</strong> → 커스텀 커맨드와 스킬</li>
        <li>"절대 / 반드시 / 이미 문서로 경고했는데 또 발생함" → 기준 ②가 <strong>집행</strong> → deny 규칙 · 훅 · 도구 제한</li>
        <li>"사람이 없는 CI에서" → 기준 ③이 <strong>이 실행 한 번</strong> → CLI 플래그</li>
      </ul>

      <div class="callout">🎯 시험에서 틀리는 자리는 거의 항상 기준 ②임. <b>권고 수단으로 집행을 요구하거나</b>(문서에 적어 뒀는데 또 발생함), <b>집행 수단으로 로딩 문제를 해결하려는</b>(규칙 파일이 쓰기를 막아 줄 것이라고 판단함) 두 방향으로 실수가 나옴. 보기를 볼 때마다 "이것은 요청인가, 거부인가"를 먼저 확인할 것.</div>`},

    /* ---------- ④ 개념 지도 ---------- */
    {type:"concept", kind:"CONCEPT · 개념 설명", h:"D3 전체 지도 한 장",
     html:`<p class="lead">앞으로 배울 것들이 서로 어디에 놓이는지 먼저 확인함. 챕터를 하나씩 볼 때마다 이 지도의 한 칸이 강조되어 다시 나옴.</p>

      __MAP3:__

      <h4>읽는 법: 윗줄과 아랫줄은 성격이 완전히 다름</h4>
      <ul>
        <li><strong>윗줄 세 칸은 순서가 아님.</strong> 왼쪽부터 하나씩 거쳐 가는 단계가 아니라 <strong>동시에 공존하는 세 경로</strong>임. 한 세션 안에서 CLAUDE.md도 로드되고, 조건이 맞으면 규칙 파일도 붙고, 스킬을 부르면 그것도 들어옴</li>
        <li>세 칸의 차이는 하나임. <strong>언제 로드되는가</strong>. 항상(CLAUDE.md) / 매칭 파일을 편집할 때(규칙 파일) / 부를 때(커맨드와 스킬). 앞 표의 기준 ①이 그대로 이 줄임</li>
        <li><strong>아랫줄 세 칸은 순서가 맞음.</strong> 로드된 지침 위에서 실제 작업이 진행되는 순서임. 실행 방식을 고르고(①), 결과를 반복해서 개선하고(②), 그 흐름을 자동화로 옮김(③)</li>
        <li>가운데 화살표가 두 줄을 잇는 지점임. <strong>윗줄은 "무엇을 아는 상태로 시작하는가", 아랫줄은 "그 상태에서 무엇을 하는가"</strong>임</li>
      </ul>

      <h4>지도에 그려지지 않았지만 시험에 나오는 두 가지</h4>
      <ul>
        <li><strong>권한 계층</strong> (allow / ask / deny · 권한 모드 · PreToolUse 훅): 윗줄이 "무엇을 읽는가"라면 이것은 "무엇을 <strong>할 수 있는가</strong>"임. 위 비교표의 기준 ②가 있는 자리이고, 지도로는 아랫줄 ①과 ③에 걸쳐 있음</li>
        <li><strong>CLI 호출</strong> (Ch7): 아랫줄 ③칸을 확대한 것이 통째로 한 챕터임. 사람이 없는 자리에서 Claude를 부르는 방법을 다룸</li>
      </ul>

      <div class="callout">⚠️ 윗줄을 "순서"로 잘못 읽으면 오답으로 이어짐. "CLAUDE.md에 적었는데 왜 스킬이 읽지 않는가" 같은 질문이 그 오해에서 나옴. 셋은 <b>서로를 거쳐 가지 않음</b>. 각자 자기 시점에 자기 내용을 같은 컨텍스트에 추가할 뿐임.</div>`},

    /* ---------- ⑤ 지도 위의 용어 · 0부터 ---------- */
    {type:"concept", kind:"CONCEPT · 개념 설명", h:"지도에 나오는 용어를 0부터 채우기",
     html:`<p class="lead">여기부터는 <strong>아무것도 모른다는 전제</strong>로 설명함. 비유를 쓰지 않고 실제로 무슨 일이 벌어지는지로만 서술함. 이 일곱 가지를 알면 D3 지문에서 막히는 자리가 거의 사라짐.</p>

      <h4>① 터미널(terminal)</h4>
      <ul>
        <li>컴퓨터에 <strong>글자로 명령을 입력하는 창</strong>임. 아이콘을 클릭하는 대신 <code>claude</code> 같은 단어를 입력하고 엔터를 누름</li>
        <li>쓰는 이유는 다음과 같음. 클릭은 사람 손이 있어야 하지만, 글자 명령은 <strong>파일에 적어 두면 컴퓨터가 대신 실행</strong>할 수 있음. 자동화가 여기에서 출발함</li>
        <li><strong>플래그(flag)</strong>는 명령 뒤에 붙이는 <code>--이름</code> 형태의 옵션임. <code>claude -p "리뷰해 줘"</code>에서 <code>-p</code>가 플래그임. "이번 실행은 이렇게 동작할 것"이라는 추가 지정임</li>
      </ul>

      <h4>② 저장소(repository)와 커밋(commit)</h4>
      <ul>
        <li><strong>저장소</strong>는 팀이 공유하는 프로젝트 폴더 전체임. 인터넷 어딘가에 원본이 있고, 각자 자기 컴퓨터로 사본을 내려받아서(<strong>클론, clone</strong>) 작업함</li>
        <li><strong>커밋</strong>은 내 사본의 변경을 저장소 이력에 등록하는 행위임. 커밋해서 올리면 <strong>팀 전원이 다음에 받아갈 때 그 변경을 함께 받음</strong></li>
        <li>D3에서 중요한 이유는 다음과 같음. "팀 전원에게 적용"이라는 말은 사실 <strong>"그 파일이 저장소에 커밋돼 있음"</strong>이라는 뜻임. 커밋되지 않은 파일은 본인에게만 있는 파일임</li>
      </ul>

      <h4>③ 설정 파일이 폴더 위치에 따라 효력이 갈리는 이유</h4>
      <ul>
        <li>Claude Code는 시작할 때 <strong>정해진 위치들을 순서대로 확인함</strong>. 홈 폴더 안의 <code>~/.claude/</code>, 지금 작업 중인 프로젝트 폴더, 그리고 지금 편집하는 파일이 들어 있는 하위 폴더임</li>
        <li>그러므로 같은 내용을 적어도 <strong>어느 폴더에 뒀는가가 곧 누구에게 언제 적용되는가</strong>가 됨</li>
        <li><code>~</code>(물결)는 홈 폴더를 가리키는 줄임 표기임. <strong>홈 폴더는 저장소 밖</strong>이므로 커밋될 수 없음. 그래서 여기 둔 규칙은 본인만 갖게 됨</li>
        <li>이름 앞에 점이 붙은 폴더(<code>.claude</code>)는 평소에 보이지 않도록 숨겨진 폴더임. 사람이 자주 열 파일이 아니라 프로그램이 읽을 파일을 모아 두는 자리임</li>
      </ul>

      <h4>④ 글롭 패턴(glob pattern)</h4>
      <ul>
        <li>"어떤 파일들"을 한 줄로 지정하는 표기법임. 파일을 일일이 나열하는 대신 경로의 모양으로 지정함</li>
        <li><code>*</code>: 이름 <strong>한 칸</strong>을 임의의 문자로 대신함. <code>src/api/*.ts</code>는 <code>src/api/</code> <strong>바로 안</strong>의 .ts 파일만 매칭함. 하위 폴더 안쪽은 매칭하지 못함</li>
        <li><code>**</code>: <strong>몇 겹이든 하위 폴더 전부</strong>를 대신함. <code>src/api/**/*.ts</code>는 <code>src/api/v2/handlers/payment.ts</code>까지 매칭함</li>
        <li>규칙이 켜지지 않는다는 지문이 나오면 <strong>대부분 <code>**</code>가 빠진 경우</strong>임. 적용되는 파일과 적용되지 않는 파일의 경로를 나란히 놓고 깊이만 비교할 것</li>
      </ul>

      <h4>⑤ 훅(hook)</h4>
      <ul>
        <li>정해진 순간이 오면 <strong>자동으로 실행되는 사용자 코드</strong>임. Claude가 도구를 호출하려는 직전에 실행되는 것이 <strong>PreToolUse</strong> 훅임</li>
        <li>실행되어 "이 호출 통과" 또는 "이 호출 거부"를 <strong>대신 판정함</strong>. 사람에게 묻는 대신 코드가 답하는 방식임</li>
        <li>필요한 이유는 다음과 같음. "금액 관련 파일은 수정하지 말 것" 같은 조건은 목록으로 전부 적기 어려운데, 훅이면 <strong>조건을 계산해서</strong> 판정할 수 있음</li>
      </ul>

      <h4>⑥ CI / CD</h4>
      <ul>
        <li><strong>CI</strong>는 누가 코드를 올릴 때마다 <strong>서버가 자동으로 검사를 실행하는 장치</strong>임. 테스트 실행, 문법 검사, 리뷰 같은 작업을 함</li>
        <li><strong>CD</strong>는 그 검사를 통과한 코드를 <strong>자동으로 실제 서비스에 배포</strong>하는 단계임</li>
        <li>검사를 실행하는 서버를 <strong>러너(runner)</strong>라고 부름. 여기가 핵심임. <strong>러너 앞에는 사람이 없음</strong>. 새벽 3시에 실행되는 작업이 "이 명령을 실행할까요?"를 띄우면 아침까지 아무도 답하지 않음</li>
        <li>D3의 CI 문항은 전부 이 한 가지 사실에서 파생됨. <strong>답할 사람이 없는 자리를 무엇으로 대신하는가</strong></li>
      </ul>

      <h4>⑦ 권한 모드(permission mode)가 필요한 이유</h4>
      <ul>
        <li>Claude Code는 파일을 수정하고 명령을 실행할 수 있음. 그래서 기본 동작이 "위험할 수 있는 것은 <strong>사람에게 확인하기</strong>"임</li>
        <li>확인하는 것이 맞는 상황이 있고(본인 노트북에서 작업 중), 확인하면 실패하는 상황이 있음(사람 없는 러너)</li>
        <li><strong>권한 모드</strong>는 그 <strong>기본 동작을 통째로 정하는 설정</strong>임. 매번 확인할지, 편집은 확인 없이 진행할지, 미리 허용한 것만 실행하고 나머지는 자동 거부할지를 정함</li>
        <li>모드와 별개로 <strong>개별 항목 목록</strong>도 있음. "이 명령들은 확인 없이 실행해도 됨"(허용) / "이것은 무조건 차단"(거부)임. 실전에서는 <strong>모드와 목록을 함께 쓰는 것이 정답 조합</strong>임</li>
        <li>기억할 한 줄은 다음과 같음. <strong>거부가 모드보다 우선함.</strong> 설정에 적어 둔 거부 규칙은 어떤 모드에서도 통과되지 않음</li>
      </ul>

      <div class="callout">📖 자주 함께 나오는 용어 두 가지. <b>파이프(<code>|</code>)</b>: 앞 명령의 출력을 뒤 명령의 입력으로 전달하는 기호임. <code>cat 로그파일 | claude -p "원인만 짧게"</code> 형태로 씀. <b>종료 코드(exit code)</b>: 명령이 끝나면서 남기는 숫자임. 성공이면 0, 실패면 0이 아닌 값임. 스크립트가 이 숫자를 보고 다음 단계를 실행할지 정함.</div>`},

    /* ---------- ⑥ 학습 순서 ---------- */
    {type:"concept", kind:"TOPIC · 주제 설명", h:"이 파트를 도는 순서: 시간을 어디에 더 쓸 것인가",
     html:`<p class="lead">챕터가 일곱 개인데 <strong>시간을 균등하게 배분하면 안 됨</strong>. 정답률이 낮은 영역과 그렇지 않은 영역의 차이가 크기 때문임.</p>

      <h4>어디에 시간을 몰아야 하는가: 출제 구조로 판단함</h4>
      <ul>
        <li>이 영역은 <strong>여러 설정 수단 중 하나를 고르는 형태</strong>로 출제되며, 수단 사이의 차이를 모르면 정답률이 크게 떨어짐</li>
        <li>정답률이 떨어지는 문항의 공통점은 두 가지임. ⓐ 여러 수단을 나란히 놓고 비교시키는 형태 ⓑ 학습 자료에서 다루지 않은 선택지가 보기에 들어 있는 형태</li>
        <li>이 둘이 겹치는 자리가 아래 세 영역이며, 여기에 시간을 몰아야 함</li>
      </ul>

      <h4>🔴 집중 학습 영역: 시간의 절반 이상을 여기에 배분할 것</h4>
      <table>
        <tr><th>영역</th><th>정답률이 낮은 이유</th><th>확인 신호</th></tr>
        <tr><td><strong>Ch1 · Ch2 · Ch3이 헷갈리는 지점</strong><br><small>CLAUDE.md · 커맨드와 스킬 · 규칙 파일 + paths</small></td><td>각각은 이해했더라도 <strong>셋을 나란히 놓고 고르는 문항</strong>에서 정답률이 크게 떨어짐. 실전 D3 비교형의 최대 지분임</td><td>세 챕터를 따로 이해했다고 넘어가면 안 됨. 스텝 6의 비교표를 보지 않고 판단 기준 세 가지를 말할 수 있어야 통과임</td></tr>
        <tr><td><strong>Ch7 CLI 호출과 실행 제어</strong><br><small>-p · 출력 형식 · 권한 모드 · 도구 제한</small></td><td>플래그 이름과 값이 보기에 그대로 등장하는데, 학습 자료에서 다루지 않으면 소거조차 할 수 없음. 그래서 정답률이 가장 낮게 나오는 영역임</td><td>플래그 이름을 외우는 것이 아니라 "사람이 없어서 비는 자리 다섯 가지"를 먼저 말할 수 있어야 함</td></tr>
        <tr><td><strong>Ch6 CI/CD 통합</strong><br><small>비대화형 실행 · 구조화 출력 · 리뷰 격리</small></td><td>Ch7과 묶여 한 문항으로 출제됨. 또한 비개발자에게 <strong>용어 장벽이 가장 높은</strong> 영역임</td><td>스텝 8의 ⑥⑦(CI · 권한 모드)을 다시 읽고 시작할 것</td></tr>
      </table>

      <h4>🟡 표준 속도로 볼 영역</h4>
      <ul>
        <li><strong>Ch4 plan mode vs 직접 실행</strong>: 판단 기준 자체는 단순함. 대신 실전은 여기에 <strong>승인 게이트</strong>를 얹어 3단계로 물어봄. Q2가 그 형태였음</li>
        <li><strong>Ch5 반복 개선</strong>: 원칙은 상식에 가까움. 대신 <strong>한 문항에 처방 세 가지를 겹쳐 쓰는</strong> 형태로 출제되므로 "하나만 고치는 보기"를 걸러내는 연습으로 볼 것</li>
      </ul>

      <h4>도는 방법: 세 번 통과</h4>
      <ul>
        <li><strong>1회차</strong>: Ch1부터 Ch7까지 순서대로 볼 것. 연습 문제는 <strong>틀려도 그대로 진행</strong>할 것. 전체 구조를 익히는 단계임</li>
        <li><strong>2회차</strong>: 집중 학습 영역 세 가지만 볼 것. 이번에는 문제를 풀기 전에 <strong>판단 기준 세 가지를 먼저 적용</strong>해 보고 보기를 볼 것</li>
        <li><strong>3회차</strong>: 미니테스트와 모의고사를 볼 것. 여기서 틀린 문항은 <strong>어느 판단 기준을 놓쳤는지</strong>로 기록할 것. "CLAUDE.md를 몰라서"가 아니라 "기준 ② 강제력을 확인하지 않아서"로 적을 것</li>
      </ul>

      <div class="callout">🎯 이 파트를 마친 뒤 스스로 확인할 한 문장. <b>"이 요구는 언제 로드돼야 하고, 요청이면 되는가 거부여야 하는가, 어디까지 적용돼야 하는가."</b> 이 셋을 지문에서 뽑아낼 수 있으면 D3 비교형은 대부분 소거로 풀림. 이제 Ch1부터 시작할 것.</div>`},
  ]};

  C.p3.lessons.unshift(p3c0);


  /* ============================================================
     (2) 기존 레슨 quiz 스텝 전부에 이유 카드(why) 부착
         q(레슨id, n) = 그 레슨의 n번째 quiz 스텝
     ============================================================ */
  var find = function(id){ return C.p3.lessons.find(function(l){ return l.id === id; }); };
  var q = function(id, n){
    var L = find(id);
    if(!L || !L.steps) return null;
    return L.steps.filter(function(s){ return s.type === "quiz"; })[n] || null;
  };
  var W = function(id, n, card){ var s = q(id, n); if(s && !s.why) s.why = card; };

  /* ---------- CH 1 · CLAUDE.md 계층 ---------- */
  W("p3c1", 0, { q:`왜 여기서 첫 조치가 "로드된 파일 목록을 확인하는 것"인가?`,
    opts:[
      {t:`저장소는 이미 깨끗한 것을 확인했는데 특정 사용자에게만 증상이 남았으므로, 남은 원인은 저장소 밖에서 함께 로드되는 파일뿐이기 때문임`, ok:true},
      {t:`지시가 사라지지 않을 때는 확인 도구부터 실행해 보는 것이 진단의 정석이기 때문임`},
      {t:`사용자 레벨 파일이 프로젝트 파일보다 우선순위가 높아 항상 먼저 의심해야 하기 때문임`},
      {t:`규칙을 지운 뒤에는 캐시가 남을 수 있어 무엇이 남았는지 비워 보기 전에 확인이 필요하기 때문임`},
    ],
    explain:`"특정 사용자만 겪고 팀원은 겪지 않음"이라는 문장이 나오면 범위가 이미 좁혀진 것임. 저장소에 실리지 않는 자리, 즉 개인 파일임. 기준 ③ 범위로 원인을 줄이는 전형적인 형태임.` });

  W("p3c1", 1, { q:`왜 표준 원본을 한 곳에 두고 참조로 불러오는 방식이 정답인가?`,
    opts:[
      {t:`패키지마다 필요한 표준이 다른데, 원본이 하나면 표준이 바뀔 때 고칠 자리도 하나로 남기 때문임`, ok:true},
      {t:`참조로 불러오는 방식이 붙여넣기보다 컨텍스트를 적게 쓰기 때문임`},
      {t:`공식 가이드가 모노레포에서는 참조 문법을 쓰라고 권장하기 때문임`},
      {t:`패키지 메인테이너가 무엇이 필요한지 가장 잘 알기 때문임`},
    ],
    explain:`"원본은 하나, 조합은 각자"는 유지보수 문제의 표준 해법임. 사본이 늘어나는 순간 동기화 누락은 시간 문제가 됨.` });

  W("p3c1", 2, { q:`왜 R2(인프라 명령 금지)만 다른 수단으로 가야 하는가?`,
    opts:[
      {t:`문서로 이미 경고했는데도 3월에 실행됐다는 이력이 지문에 있어, 필요한 것이 권고가 아니라 거부라는 점이 확정되기 때문임`, ok:true},
      {t:`인프라 명령은 되돌릴 수 없는 작업이라 원래 항상 설정 파일에서 다뤄야 하기 때문임`},
      {t:`메모리 파일에 금지 문구가 늘어나면 다른 지시까지 흐려지기 때문임`},
      {t:`거부 규칙이 메모리 파일보다 나중에 평가돼 결과적으로 우선하기 때문임`},
    ],
    explain:`판단 신호는 <b>"적어 뒀는데 또 발생함"</b>임. 이 문장이 보이면 기준 ②가 권고에서 집행으로 넘어간 것임. 수단도 함께 넘어가야 함.` });

  /* ---------- CH 2 · 커맨드와 스킬 ---------- */
  W("p3c2", 0, { q:`왜 (3) 에러 처리 표준만 스킬로 만들면 안 되는가?`,
    opts:[
      {t:`스킬은 호출해야 로드되는데 (3)의 요구는 "생성되는 모든 코드에 항상"이라, 호출을 잊는 순간 표준 밖 코드가 나오기 때문임`, ok:true},
      {t:`표준 문서는 분량이 커서 스킬로 만들면 실행할 때마다 비용이 크게 늘기 때문임`},
      {t:`스킬은 원래 절차를 담는 수단이고 표준을 담는 수단이 아니라고 정해져 있기 때문임`},
      {t:`스킬 안에서 만든 결과물은 본 대화로 요약만 돌아와 표준 적용 여부를 확인하기 어렵기 때문임`},
    ],
    explain:`"always / every / 모든"이라는 말이 요구에 붙으면 기준 ①이 <b>항상</b>으로 고정됨. 호출형 수단은 그 순간 전부 탈락임.` });

  W("p3c2", 1, { q:`왜 세 요구를 frontmatter 옵션 세 개에 하나씩 나눠 붙여야 하는가?`,
    opts:[
      {t:`출력 격리 · 도구 제한 · 인자 요구는 각각 다른 문제라서, 한 옵션이 다른 옵션의 역할을 대신하지 못하기 때문임`, ok:true},
      {t:`frontmatter에 옵션을 많이 적을수록 스킬이 더 안정적으로 동작하기 때문임`},
      {t:`세 옵션을 함께 쓰는 것이 스킬 작성의 표준 형식이라고 문서에 예시로 나와 있기 때문임`},
      {t:`옵션을 나눠 적으면 나중에 다른 사람이 스킬을 읽을 때 의도를 파악하기 쉽기 때문임`},
    ],
    explain:`요구 개수와 설정 항목 개수를 세어 맞춰 보는 습관이 D3 비교형의 기본기임. 요구가 셋인데 설정 항목이 하나인 보기는 그 자리에서 탈락임.` });

  W("p3c2", 2, { q:`왜 경로 조건 규칙으로 이 스캐폴딩 절차를 감쌀 수 없는가?`,
    opts:[
      {t:`절차가 필요한 시점은 그 파일들을 만들기 전인데, 조건부 로딩은 이미 있는 파일을 편집할 때 켜지는 장치라 켜 줄 조건 자체가 없기 때문임`, ok:true},
      {t:`글롭 패턴이 services 아래 전체를 덮으면 매칭되는 파일이 너무 많아 컨텍스트가 감당되지 않기 때문임`},
      {t:`아홉 단계짜리 긴 절차는 규칙 파일에 담기에는 분량 제한을 넘기 때문임`},
      {t:`규칙 파일은 컨벤션을 담는 용도라 절차를 담는 것은 용도에 맞지 않기 때문임`},
    ],
    explain:`조건부인지 아닌지는 <b>시점</b>으로 갈림. 규칙을 켤 조건이 될 파일이 <b>그 순간에</b> 존재하는가로 판단함. 오프닝 Q1과 정확히 짝을 이루는 판단임.` });

  /* ---------- CH 3 · 경로별 규칙 ---------- */
  W("p3c3", 0, { q:`왜 규칙이 일부 파일에서만 켜졌는가?`,
    opts:[
      {t:`별 하나는 이름 한 칸만 대신해 폴더 경계를 넘지 못하는데, 켜지지 않은 파일들은 전부 하위 폴더 안에 있기 때문임`, ok:true},
      {t:`규칙 파일이 한 번에 담을 수 있는 경로 패턴 수에 제한이 있기 때문임`},
      {t:`패턴을 쓸 때는 별 두 개를 쓰는 것이 기본이라고 배웠는데 그것을 지키지 않았기 때문임`},
      {t:`파일이 많은 폴더에서는 매칭 비용 때문에 일부만 걸리기 때문임`},
    ],
    explain:`적용되는 경로와 적용되지 않는 경로를 나란히 놓고 <b>다른 점 하나만</b> 찾는 것이 글롭 패턴 디버깅의 전부임. 여기서는 그것이 폴더 깊이였음.` });

  W("p3c3", 1, { q:`왜 섹션 정리가 아니라 파일 분리가 정답인가?`,
    opts:[
      {t:`증상이 토큰 낭비와 규칙 간섭 두 가지인데, 둘 다 "전부 항상 로드"되는 구조에서 나오므로 로드 방식을 바꿔야 사라지기 때문임`, ok:true},
      {t:`한 파일이 1,100줄을 넘으면 뒷부분을 모델이 놓칠 확률이 올라가기 때문임`},
      {t:`컨벤션은 종류별로 파일을 나눠 관리하는 것이 정석이라고 가이드에 적혀 있기 때문임`},
      {t:`파일을 나누면 각 컨벤션의 담당자를 따로 정할 수 있어 관리가 편해지기 때문임`},
    ],
    explain:`컨텍스트에 들어온 글은 <b>읽기 전에 이미 비용</b>이고, 들어와 있는 이상 간섭도 가능함. 그래서 "적게 넣기"만이 두 증상을 동시에 없앰.` });

  W("p3c3", 2, { q:`왜 (iii)과 (iv)만 다른 수단으로 빠지는가?`,
    opts:[
      {t:`(iii)은 규칙을 켤 조건이 될 파일이 아직 없어 조건부가 성립하지 않고, (iv)는 로딩이 아니라 거부의 문제라 권한 계층으로 가야 하기 때문임`, ok:true},
      {t:`(iii)과 (iv)는 저장소 전체에 걸리는 요구라 폴더 단위 수단으로는 범위가 모자라기 때문임`},
      {t:`외부 업체가 수정한 이력이 있는 폴더는 원래 설정 파일로 관리하는 것이 관례이기 때문임`},
      {t:`규칙 파일은 컨텍스트에 글을 넣을 뿐이라 파일 수가 많아지면 성능이 떨어지기 때문임`},
    ],
    explain:`네 요구를 두 질문으로 거르는 연습임. <b>① 지금 규칙을 켤 조건이 있는가 ② 알려 주면 되는가, 차단해야 하는가.</b> 이 둘이면 D3 배치 문항의 대부분이 갈림.` });

  /* ---------- CH 4 · plan mode vs 직접 실행 ---------- */
  W("p3c4", 0, { q:`왜 작업 도중에 모드를 전환하는 것이 맞는가?`,
    opts:[
      {t:`모드를 정하는 기준은 티켓 제목이 아니라 드러난 복잡도인데, 유효한 설계가 둘이라는 사실이 방금 밝혀졌기 때문임`, ok:true},
      {t:`20개 파일이 걸리는 작업은 규모 기준으로 계획 모드가 정석이기 때문임`},
      {t:`직접 실행 모드로 오래 돌리면 컨텍스트가 탐색 출력으로 차기 때문임`},
      {t:`이미 원인을 찾아낸 상태라 탐색 단계를 다시 밟는 것이 효율적이기 때문임`},
    ],
    explain:`모드 판단은 시작 시점에 고정되지 않음. <b>"결정이 남아 있는가"</b>가 바뀌는 순간이 곧 모드를 바꿀 순간임.` });

  W("p3c4", 1, { q:`왜 탐색을 서브에이전트(subagent)에 맡기는 것이 세션을 나누는 것보다 나은가?`,
    opts:[
      {t:`서브에이전트는 장황한 출력을 자기 쪽에 두고 요약만 돌려주므로, 본 대화의 설계 맥락을 끊지 않고도 불필요한 출력만 덜어내기 때문임`, ok:true},
      {t:`서브에이전트는 별도 모델을 써서 탐색 비용이 더 저렴하기 때문임`},
      {t:`탐색과 구현은 분리하라는 것이 워크플로 설계의 정석이기 때문임`},
      {t:`세션을 나누면 각 단계의 결과를 따로 저장해야 해서 관리가 번거롭기 때문임`},
    ],
    explain:`격리와 단절은 다름. <b>격리</b>는 불필요한 출력만 떼고 맥락을 남기고, <b>단절</b>은 맥락까지 함께 버림.` });

  W("p3c4", 2, { q:`왜 이 문항에서는 계획과 실행 사이에 사람이 한 번 들어가야 하는가?`,
    opts:[
      {t:`규제 요구가 "코드가 반영되기 전에 접근 방식이 승인돼 기록에 남을 것"이라, 승인의 대상도 시점도 편집보다 앞으로 지정돼 있기 때문임`, ok:true},
      {t:`설계가 둘 다 유효할 때는 사람이 고르는 것이 원칙이기 때문임`},
      {t:`결제 도메인은 민감해서 사람 승인을 넣는 것이 업계 관행이기 때문임`},
      {t:`계획 모드 결과를 사람이 보지 않으면 다음 단계로 넘어갈 수 없도록 되어 있기 때문임`},
    ],
    explain:`승인 게이트 문항은 <b>"무엇에 대한 승인인가"</b>와 <b>"어느 두 단계 사이인가"</b> 두 가지만 읽으면 됨. 오프닝 Q2가 같은 형태였음.` });

  /* ---------- CH 5 · 반복 개선 ---------- */
  W("p3c5", 0, { q:`왜 #1과 #2만 묶고 나머지는 나누는가?`,
    opts:[
      {t:`둘이 같은 공유 상태를 거치므로 한쪽 수정이 다른 쪽을 깨뜨린 이력이 있는데, 그 조율은 두 문제를 같은 시야에 놓아야만 가능하기 때문임`, ok:true},
      {t:`한 메시지에 담는 문제 수는 두 개까지가 적정선이기 때문임`},
      {t:`관련 있는 버그는 함께 처리하라는 것이 반복 개선의 정석이기 때문임`},
      {t:`#3부터 #5는 난이도가 낮아 순차로 처리해도 실수가 나오지 않기 때문임`},
    ],
    explain:`묶는 기준은 <b>개수</b>가 아니라 <b>상호 의존</b>임. 상호 의존의 증거는 대개 "고치면 다른 것이 깨짐"이라는 이력으로 지문에 들어 있음.` });

  W("p3c5", 1, { q:`왜 더 긴 프롬프트가 아니라 질문을 받는 방식인가?`,
    opts:[
      {t:`실패 원인이 "무엇을 요구해야 할지 모름"이라서, 빠진 항목을 대신 꺼내 줄 쪽이 필요하기 때문임`, ok:true},
      {t:`질문을 주고받으면 대화가 길어져 모델이 도메인을 더 깊이 파악하게 되기 때문임`},
      {t:`낯선 도메인에서는 인터뷰 패턴을 쓰라고 가이드에 나와 있기 때문임`},
      {t:`구현 전에 요구사항을 문서로 남겨 두면 나중에 검증이 쉽기 때문임`},
    ],
    explain:`"생각나는 것을 전부 적을 것"이 통하지 않는 상황이 있음. <b>생각하지 못하는 것</b>이 실패 원인일 때임. 그때는 질문이 유일한 방법임.` });

  W("p3c5", 2, { q:`왜 라운드 4에 처방 세 가지를 한꺼번에 적용해야 하는가?`,
    opts:[
      {t:`세 라운드가 각각 다른 이유로 실패했고 그 셋이 아직 그대로 남아 있어, 하나만 고치면 나머지 둘로 같은 라운드를 다시 반복하기 때문임`, ok:true},
      {t:`반복 개선은 라운드를 거듭할수록 지시를 촘촘하게 만들어야 효과가 나기 때문임`},
      {t:`같은 작업에서 네 번째 시도라면 접근을 크게 바꾸는 것이 정석이기 때문임`},
      {t:`세 처방이 서로 보완 관계라 함께 쓰면 각각의 효과가 커지기 때문임`},
    ],
    explain:`실패 이력이 여러 줄로 나열된 지문은 <b>줄마다 처방이 하나씩</b> 붙음. 정답 보기는 그 개수를 맞춰 놓은 보기임.` });

  /* ---------- CH 6 · CI/CD 통합 ---------- */
  W("p3c6", 0, { q:`왜 이 문항에서 비대화형 호출은 그대로 두는 것이 맞는가?`,
    opts:[
      {t:`지문의 결함은 출력 형태와 세션 격리 두 가지인데, 비대화형 호출은 그 둘과 무관하게 이미 제 역할을 하고 있기 때문임`, ok:true},
      {t:`한 번에 여러 설정을 바꾸면 무엇이 효과를 냈는지 알 수 없게 되기 때문임`},
      {t:`CI에서는 비대화형 호출이 필수라고 문서에 명시돼 있기 때문임`},
      {t:`출력 형식 플래그를 붙이면 비대화형 동작은 자동으로 따라오기 때문임`},
    ],
    explain:`"무엇이 문제가 아닌지"를 가려내는 것도 문제의 일부임. 정상 동작하는 부분까지 함께 바꾸는 보기는 실전 D3에서 자주 나오는 오답임.` });

  W("p3c6", 1, { q:`왜 이전 발견 내용을 다시 넣어 주는 것이 정답인가?`,
    opts:[
      {t:`봇이 같은 지적을 반복하는 이유가 지난번에 무엇을 말했는지 모른다는 것이라, 그 정보를 컨텍스트에 넣는 것이 원인을 직접 없애는 조치이기 때문임`, ok:true},
      {t:`중복 제거는 사후 처리보다 사전 처리가 항상 저렴하기 때문임`},
      {t:`재리뷰 시 이전 결과를 포함하라는 것이 리뷰 자동화의 정석이기 때문임`},
      {t:`이전 발견을 넣으면 리뷰가 더 깊어져 새 이슈도 더 잘 찾아내기 때문임`},
    ],
    explain:`같은 말을 반복하는 자동화를 보면 <b>기억이 없는 것</b>부터 확인할 것. 출력 쪽에서 걸러내는 처리는 증상만 덮는 방식임.` });

  W("p3c6", 2, { q:`왜 표준 문서를 프롬프트에 붙여넣지 않고 저장소에 둔 채로 두는가?`,
    opts:[
      {t:`비대화형 실행도 평소 세션과 같은 방식으로 저장소의 지침을 읽으므로, 붙여넣으면 같은 표준이 두 벌이 되고 곧 내용이 갈라지기 때문임`, ok:true},
      {t:`프롬프트가 길어지면 호출당 비용이 올라가기 때문임`},
      {t:`표준 문서는 저장소에 두는 것이 원래 정해진 자리이기 때문임`},
      {t:`프롬프트에 넣은 내용은 다음 실행에서 재사용되지 않기 때문임`},
    ],
    explain:`같은 규칙이 두 곳에 있으면 <b>내용이 갈라지는 것은 시간 문제</b>임. 사본을 만드는 보기가 보이면 유지보수 기준에서 먼저 걸러낼 것.` });

  /* ---------- CH 7 · CLI 호출과 실행 제어 ---------- */
  W("p3c7", 0, { q:`왜 네 가지를 전부 적용해야 하고 하나로는 안 되는가?`,
    opts:[
      {t:`답하고 종료하기 · 승인 대기 없애기 · 폭주 상한 · 출력 계약이 각각 다른 빈자리를 메우는 수단이라, 하나가 다른 하나의 역할을 대신하지 않기 때문임`, ok:true},
      {t:`CI에서는 플래그를 여러 개 조합해 쓰는 것이 표준 형태이기 때문임`},
      {t:`설정을 많이 걸수록 야간 작업의 실패 확률이 전반적으로 낮아지기 때문임`},
      {t:`증상이 세 가지나 되니 그중 어느 것이 진짜 원인인지 몰라 넓게 걸어 두는 것이 안전하기 때문임`},
    ],
    explain:`증상 목록과 설정 수단 목록의 <b>개수를 세어 맞추는 것</b>이 CI 문항의 기본 동작임. 하나가 비면 그 증상은 그대로 남음.` });

  W("p3c7", 1, { q:`왜 "가장 최근 대화 이어가기"로는 이 상황을 풀 수 없는가?`,
    opts:[
      {t:`리뷰 셋이 병렬로 실행됐으므로 어느 것이 가장 최근인지 통제할 수 없고, 이어가기를 반복해도 하나의 대화에 계속 이어질 뿐 갈래가 나뉘지 않기 때문임`, ok:true},
      {t:`병렬 실행에서는 세션 기록이 서로 덮어써져 최근 대화가 남지 않기 때문임`},
      {t:`감사 요구가 있으면 지정 재개를 쓰라는 것이 정해진 절차이기 때문임`},
      {t:`이어가기는 같은 폴더에서 시작한 세션만 대상으로 삼기 때문임`},
    ],
    explain:`"동시에 여러 개"라는 말이 지문에 있으면 <b>특정 세션을 지목할 수단</b>이 필요해짐. 그리고 "원본을 남길 것"이 붙으면 갈래를 나누는 수단이 하나 더 필요함.` });

  W("p3c7", 2, { q:`왜 프롬프트로 금지하는 것만으로는 보장이 되지 않는가?`,
    opts:[
      {t:`나머지 셋은 실행 계층이 호출 자체를 거부하는 장치인데, 프롬프트 문장은 모델이 따라 주기를 기대하는 확률적 유도이기 때문임`, ok:true},
      {t:`프롬프트에 적은 금지는 세션이 길어지면 앞부분이 밀려나 잊히기 때문임`},
      {t:`규제 대응은 설정 파일에 근거를 남기는 것이 감사 절차상 요구되기 때문임`},
      {t:`금지 문장을 넣으면 리뷰의 초점이 흐려져 발견 품질이 떨어지기 때문임`},
    ],
    explain:`조건에 "보장 / 절대 / 규정"이 붙는 순간 <b>지시문 보기는 자동 탈락</b>임. 이 판단 기준 하나로 D3와 D2의 여러 문항이 함께 풀림.` });


  /* ============================================================
     (3) 용어사전 · D3 확장 (기존 6개 + 24개 = 30개)
         사실 근거: p3-plus.js 머리말의 2026-08-27 확인분만 사용함
     ============================================================ */
  var A = window.CCAF_APPENDIX;
  if(A && Array.isArray(A.glossary)){
    A.glossary.push(
      {c:"D3", t:"비대화형 실행 (-p / --print)", d:"프롬프트 하나를 처리해 출력하고 종료함. 사람이 없는 CI와 스크립트용임. 표준 입력을 읽으므로 파이프로 자료를 전달할 수 있음(파이프 입력 상한 10MB)."},
      {c:"D3", t:"--output-format", d:"출력 형식을 고르는 플래그임. 값은 text(기본) · json · stream-json 세 가지임. json이면 본문이 result 필드에 오고 session_id·total_cost_usd 같은 메타 정보가 함께 옴."},
      {c:"D3", t:"--json-schema", d:"출력의 모양을 스키마로 고정함. 검증된 결과가 structured_output 필드로 옴. 스키마가 잘못되면 에러로 종료함. print 모드 전용임."},
      {c:"D3", t:"stream-json", d:"줄 단위 JSON을 순차적으로 내보내는 출력 형식임. 진행 상황을 실시간으로 보여줘야 할 때 씀."},
      {c:"D3", t:"--permission-mode", d:"승인에 대한 기본 동작을 정하는 설정임. 값은 default(별칭 manual) · acceptEdits · plan · auto · dontAsk · bypassPermissions임."},
      {c:"D3", t:"default 모드 (manual)", d:"읽기는 그대로 실행되고 나머지는 확인을 요청함. -p로 시작한 세션의 기본값이므로, 아무것도 지정하지 않으면 CI에서 승인 대기로 멈출 수 있음."},
      {c:"D3", t:"acceptEdits 모드", d:"파일 편집과 mkdir·touch·mv·cp 같은 기본 파일 명령을 확인 없이 진행함."},
      {c:"D3", t:"dontAsk 모드", d:"CI용 표준 선택임. 미리 허용한 규칙과 읽기 전용 명령, PreToolUse 훅이 승인한 것만 실행하고 나머지는 자동 거부함. 입력을 기다리는 일이 아예 없음."},
      {c:"D3", t:"bypassPermissions 모드", d:"권한 검사를 전부 통과시킴. 공식 문서가 컨테이너·VM 같은 격리 환경 안에서만 쓰라고 명시한 모드임."},
      {c:"D3", t:"--allowedTools", d:"확인 없이 실행해도 되는 허용 목록임. 예: \"Bash(npm test)\" \"Read\". 권한 모드와 함께 쓰는 것이 표준 조합임."},
      {c:"D3", t:"--disallowedTools", d:"거부 목록임. 이름만 쓰면 그 도구를 아예 제외하고, Bash(rm *)처럼 범위를 쓰면 도구는 남기고 매칭되는 호출만 차단함."},
      {c:"D3", t:"--tools", d:"세션에 제공할 내장 도구 목록 자체를 좁힘. 빈 값이면 전부 끔. 없는 도구는 호출될 수 없다는 점이 가장 단단한 제한임."},
      {c:"D3", t:"권한 규칙 문법의 공백", d:"Bash(git diff *)는 git diff로 시작하는 명령을 허용함. 공백을 빼고 Bash(git diff*)로 쓰면 git diff-index 같은 다른 명령까지 걸림."},
      {c:"D3", t:"deny 규칙", d:"설정 파일의 거부 규칙은 모든 모드에서 차단함. bypassPermissions에서도 차단함. 반대로 allow 규칙은 그 모드에서는 의미가 없어짐."},
      {c:"D3", t:"PreToolUse 훅", d:"도구 호출 직전에 실행되어 허용과 거부를 코드로 판정하는 장치임. 목록으로 전부 적기 어려운 조건을 계산으로 다룰 때 씀."},
      {c:"D3", t:"--max-turns", d:"에이전트 턴 수 상한임. 한도에 닿으면 에러로 종료함. 기본은 무제한이고 print 모드 전용임. 무한 루프 방지용임."},
      {c:"D3", t:"--max-budget-usd", d:"금액 상한임. 서브에이전트가 쓴 것도 합산되고, 한도에 닿으면 새 서브에이전트 생성이 Budget limit reached로 실패함. print 모드 전용임."},
      {c:"D3", t:"-c / --continue", d:"이 디렉토리의 가장 최근 대화를 이어감. 어느 것인지 고를 수 없으므로 병렬 실행에는 적합하지 않음."},
      {c:"D3", t:"-r / --resume", d:"세션 ID나 이름을 지정해서 이어감. 병렬로 여러 작업을 실행했다면 이쪽을 씀. ID는 json 출력의 session_id 필드에서 얻음."},
      {c:"D3", t:"--fork-session", d:"이어갈 때 새 세션 ID를 만들어 원본 대화를 보존함. 한 대화를 두 갈래로 실험하면서 감사 기록을 남길 때 씀."},
      {c:"D3", t:"--bare", d:"훅·스킬·커스텀 커맨드·서브에이전트·플러그인·MCP 서버·자동 메모리·CLAUDE.md까지 자동 탐색을 건너뛰고 시작함. 재현성은 얻지만 팀 표준도 함께 읽지 않는 대가가 있음."},
      {c:"D3", t:"claude setup-token", d:"CI와 스크립트에서 쓸 장기 토큰을 발급하는 명령임."},
      {c:"D3", t:"종료 코드", d:"명령이 끝나며 남기는 숫자 신호임. 성공은 0, 실패는 0이 아닌 값임. 밖에서 프로세스를 종료하면 143으로 끝나고 진행 중이던 턴은 미완으로 남아 결과가 기록되지 않음."},
      {c:"D3", t:"글롭 * 와 **", d:"*는 이름 한 칸만 대신해 폴더 경계를 넘지 못하고, **는 몇 겹이든 하위 폴더 전부를 대신함. 규칙이 중첩 폴더에서 켜지지 않으면 대부분 ** 누락임."}
    );
  }
})();
