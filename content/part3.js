/* PART 3 · Claude Code 설정 & 워크플로 (D3, 20%) */
window.CCAF_CONTENT.p3 = {
  id: "p3",
  lessons: [

  /* ===== CH 1 · 3.1 CLAUDE.md 계층 ===== */
  { id:"p3c1", ch:"CH 1", title:"CLAUDE.md 계층과 모듈화 (3.1)",
    steps:[
      {type:"concept", kind:"PART BRIEFING · 파트 설명", h:"PART 03 · 팀 전체에 같은 설정을 적용하는 방법",
   html:`<h4>① 다루는 영역</h4>
<ul>
<li>Claude Code: 내 컴퓨터의 파일을 읽고 고치고 명령을 실행하는 Claude 프로그램</li>
<li>이 파트의 주제: Claude Code에 규칙과 업무 과정을 알려 주는 설정, 그리고 실행 방식</li>
<li>영어 이름: Claude Code Configuration &amp; Workflows</li>
</ul>
<h4>② 챕터 구성</h4>
<table>
<tr><th>챕터</th><th>주제</th></tr>
<tr><td>CH 1</td><td>CLAUDE.md. Claude가 항상 읽는 규칙 파일</td></tr>
<tr><td>CH 2</td><td>스킬. 반복하는 업무 과정을 저장해 두는 폴더</td></tr>
<tr><td>CH 3</td><td>경로별 규칙. 파일 위치에 따라 불러오는 규칙</td></tr>
<tr><td>CH 4</td><td>권한 모드와 plan mode. 승인 없이 진행할 범위</td></tr>
<tr><td>CH 5</td><td>반복 개선 기법. 결과 품질을 높이는 대화 방식</td></tr>
<tr><td>CH 6</td><td>CI/CD 통합. 자동 실행 체계 안에서의 사용</td></tr>
<tr><td>CH 7</td><td>명령어 실행 옵션</td></tr>
</table>
<h4>③ 파트 전체에 쓰는 판단 기준</h4>
<ul>
<li>적용 대상: 나만 쓰는 설정인지 팀 전체가 쓰는 설정인지</li>
<li>로드 시점: 항상인지, 조건에 맞을 때인지, 직접 실행할 때인지</li>
<li>자격시험 출제 비중: 20%</li>
</ul>`},
      {type:"concept", kind:"CONCEPT · 개념 설명 ①", h:"CLAUDE.md: Claude가 작업 전에 읽는 규칙 파일",
   html:`<h4>① CLAUDE.md</h4>
<ul>
<li>Claude가 작업을 시작할 때 읽는 글 파일</li>
<li>적는 내용: 지켜야 할 규칙과 프로젝트 정보</li>
<li>파일을 두는 폴더에 따라 적용 범위가 달라짐</li>
</ul>
<div class="fig"><b>CLAUDE.md 위치 세 곳</b><br>
🏠 홈 폴더 (~)<br>
&nbsp;└─ .claude/<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ CLAUDE.md&nbsp;&nbsp;<span class="an">← ① 사용자 위치. 나만 사용. 모든 프로젝트에 적용</span><br>
<br>
📁 our-shop/ (프로젝트 폴더)<br>
&nbsp;├─ CLAUDE.md&nbsp;&nbsp;<span class="an">← ② 프로젝트 위치. 팀 전원에게 적용</span><br>
&nbsp;├─ backend/<br>
&nbsp;└─ frontend/<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ CLAUDE.md&nbsp;&nbsp;<span class="an">← ③ 폴더 위치. frontend 폴더 작업에만 추가 적용</span>
</div>
<h4>② 위치별 적용 범위</h4>
<table>
<tr><th>위치</th><th>파일 경로</th><th>적용 대상</th><th>팀 공유</th><th>적는 내용</th></tr>
<tr><td>① 사용자</td><td><code>~/.claude/CLAUDE.md</code></td><td>나만. 모든 프로젝트</td><td>안 됨</td><td>개인 설정. 예: "답은 한국어로"</td></tr>
<tr><td>② 프로젝트</td><td>프로젝트 폴더의 <code>CLAUDE.md</code> 또는 <code>.claude/CLAUDE.md</code></td><td>이 프로젝트의 팀 전원</td><td>됨</td><td>팀 규칙. 예: "들여쓰기 4칸"</td></tr>
<tr><td>③ 폴더</td><td>아래쪽 폴더의 <code>CLAUDE.md</code></td><td>그 폴더 작업</td><td>됨</td><td>그 폴더에만 쓰는 규칙</td></tr>
</table>
<h4>③ 팀 규칙의 위치</h4>
<ul>
<li>사용자 위치의 파일은 내 컴퓨터에만 존재. 팀 저장소에 포함되지 않아 팀원에게 전달되지 않음</li>
<li>팀 규칙은 프로젝트 위치에 작성</li>
<li>자주 생기는 문제: 새 팀원에게 팀 규칙이 적용되지 않음. 원인은 사용자 위치에 적어 둔 팀 규칙</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>홈 폴더(~)</b>: 컴퓨터 사용자마다 하나씩 있는 개인 폴더. 경로에서 쓰는 줄임 표기는 ~</li>
<li><b>저장소(repository)</b>: 프로젝트 파일과 변경 이력을 함께 보관하는 공간. 팀이 같은 저장소를 공유</li>
<li><b>복제(clone)</b>: 팀 저장소를 내 컴퓨터로 내려받는 일</li>
<li><b>들여쓰기</b>: 코드 줄 앞에 넣는 빈칸. 팀마다 칸 수를 정해 둠</li>
</ul>
</div>`},
      {type:"concept", kind:"CONCEPT · 개념 설명 ②", h:"여러 CLAUDE.md를 읽는 방식",
   html:`<h4>① 이어 붙여 읽기</h4>
<ul>
<li>Claude는 해당하는 CLAUDE.md를 모두 읽음</li>
<li>위쪽 폴더의 파일부터 순서대로 이어 붙여 하나의 지시문으로 사용</li>
</ul>
<div style="margin:16px 0">
  <div style="border:1px solid var(--line);border-radius:10px;padding:10px 14px;background:var(--surface)"><span class="eyebrow">① 사용자 ~/.claude/CLAUDE.md</span><br><code>답은 한국어로 작성</code></div>
  <div style="text-align:center;color:var(--dim);font-weight:800;line-height:1.6">＋</div>
  <div style="border:1px solid var(--line);border-radius:10px;padding:10px 14px;background:var(--surface)"><span class="eyebrow">② 프로젝트 our-shop/CLAUDE.md</span><br><code>들여쓰기는 4칸</code></div>
  <div style="text-align:center;color:var(--dim);font-weight:800;line-height:1.6">＋</div>
  <div style="border:1px solid var(--line);border-radius:10px;padding:10px 14px;background:var(--surface)"><span class="eyebrow">③ 폴더 frontend/CLAUDE.md</span><br><code>이 폴더는 들여쓰기 2칸</code></div>
  <div style="text-align:center;color:var(--accent);font-weight:800;line-height:2.2">↓ 위쪽 폴더의 파일부터 순서대로 이어 붙임 ↓</div>
  <div style="border:2px solid var(--accent-line);border-radius:12px;padding:12px 16px;background:var(--accent-soft)"><span class="eyebrow">Claude가 실제로 읽는 지시문</span><br>
    <code>1. 답은 한국어로 작성</code><br>
    <code>2. 들여쓰기는 4칸</code><br>
    <code>3. 이 폴더는 들여쓰기 2칸</code>
  </div>
</div>
<h4>② 규칙 세 가지</h4>
<ul>
<li>뒤에 읽은 파일이 앞 파일을 지우지 않음. 모든 문장이 남는 방식</li>
<li>서로 어긋나지 않는 지시는 전부 적용</li>
<li>서로 어긋나는 지시(4칸과 2칸): Claude가 둘 중 하나를 임의로 고를 수 있음</li>
<li>해결: 어긋나는 지시를 만들지 않기. 예: 프로젝트 파일에 "frontend 폴더를 제외하고 들여쓰기 4칸"</li>
</ul>
<h4>③ 로드 시점</h4>
<table>
<tr><th>파일</th><th>로드 시점</th></tr>
<tr><td>작업 폴더와 그 위쪽 폴더의 CLAUDE.md</td><td>세션 시작 시</td></tr>
<tr><td>아래쪽 폴더의 CLAUDE.md</td><td>그 폴더의 파일을 읽거나 고칠 때</td></tr>
</table>
<h4>④ 함께 쓰는 기능</h4>
<table>
<tr><th>기능</th><th>내용</th></tr>
<tr><td><code>CLAUDE.local.md</code></td><td>나만 쓰는 프로젝트 메모. 팀 저장소에 올리지 않는 파일</td></tr>
<tr><td>관리형 정책</td><td>조직이 모든 구성원의 컴퓨터에 배포하는 CLAUDE.md</td></tr>
<tr><td><code>@경로</code> 가져오기</td><td>다른 파일의 내용을 불러오는 표기. 가져온 파일이 다시 다른 파일을 가져오는 깊이는 최대 4단계</td></tr>
<tr><td><code>.claude/rules/</code></td><td>규칙을 주제별 파일로 나누어 두는 폴더. CH 3에서 다루는 내용</td></tr>
<tr><td>자동 메모리</td><td>Claude가 작업 중에 배운 내용을 스스로 적어 두는 메모. 파일 이름은 <code>MEMORY.md</code>. 세션 시작 시 처음 200줄까지 로드</td></tr>
</table>
<ul>
<li>분량 기준: CLAUDE.md 파일 하나에 200줄 이하</li>
<li>CLAUDE.md는 참고 자료. 반드시 막아야 하는 행동은 PreToolUse 훅으로 강제</li>
<li>설명 전체: <a href="https://code.claude.com/docs/ko/memory" target="_blank" rel="noopener">Claude Code 공식 문서 'Claude가 프로젝트를 기억하는 방법' 페이지</a> (한국어)</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>로드(load)</b>: Claude가 파일 내용을 읽어 컨텍스트 창에 올리는 일</li>
<li><b>/memory</b>: 지금 세션에 로드된 파일을 확인하는 명령</li>
<li><b>PreToolUse 훅</b>: 도구 실행 전에 자동으로 실행되는 코드. Part 1 CH 6에서 다룬 내용</li>
</ul>
</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"문제 상황별 원인과 해결",
   html:`__MAP3:hier__<h4>① 상황별 해결</h4>
<table>
<tr><th>상황</th><th>원인</th><th>해결</th></tr>
<tr><td>새 팀원에게 팀 규칙이 적용되지 않음</td><td>규칙이 작성자의 사용자 위치 파일에 있음</td><td>프로젝트 위치로 이동</td></tr>
<tr><td>한 저장소 안의 패키지마다 다른 표준 사용</td><td>표준 문서 전체를 한 파일에서 관리</td><td>패키지별 CLAUDE.md에서 필요한 표준 파일만 <code>@경로</code>로 가져오기</td></tr>
<tr><td>CLAUDE.md가 800줄까지 늘어남</td><td>모든 규칙을 한 파일에 작성</td><td><code>.claude/rules/</code>에 주제별 파일로 나누기. 예: testing.md, api-conventions.md</td></tr>
<tr><td>세션마다 다르게 동작</td><td>로드된 파일이 세션마다 다름</td><td><code>/memory</code>로 로드된 파일 확인</td></tr>
</table>
<div class="screen"><div class="sbar">화면 예시 · /memory 실행 결과</div>
&gt; /memory<br>
로드된 파일<br>
&nbsp;&nbsp;~/.claude/CLAUDE.md<br>
&nbsp;&nbsp;our-shop/CLAUDE.md<br>
&nbsp;&nbsp;our-shop/frontend/CLAUDE.md
</div>
<p class="cap">지금 세션이 읽은 파일 목록. 실제 화면과 글자 배치 차이 있음.</p>
<h4>② 판단 순서</h4>
<ul>
<li>1단계: 규칙을 쓸 사람 확인. 나만 쓰면 사용자 위치, 팀이 쓰면 프로젝트 위치</li>
<li>2단계: 규칙이 필요한 범위 확인. 한 폴더에만 필요하면 그 폴더의 CLAUDE.md</li>
<li>3단계: 분량 확인. 길어지면 주제별 파일로 나누기</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>모노레포(monorepo)</b>: 여러 패키지를 한 저장소에 모아 둔 구조</li>
<li><b>패키지(package)</b>: 저장소 안에서 독립된 기능을 맡는 코드 묶음</li>
</ul>
</div>`},
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
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"스킬: 반복하는 업무 과정을 저장해 뒀다가 불러 쓸 수 있는 폴더",
       html:`<h4>① 스킬 구성</h4>
        <ul>
          <li>폴더 하나가 스킬 하나</li>
          <li>폴더 안의 <code>SKILL.md</code>: 업무 과정을 순서대로 적은 글 파일</li>
          <li>폴더 이름이 스킬 이름. 폴더 이름이 <code>weekly-report</code>이면 실행 명령은 <code>/weekly-report</code></li>
          <li>양식이나 참고 자료 파일도 같은 폴더에 보관 가능</li>
        </ul>
        <div class="fig"><b>스킬 폴더 구성</b><br>
📁 weekly-report/&nbsp;&nbsp;<span class="an">← 스킬 폴더. 폴더 이름이 스킬 이름</span><br>
&nbsp;&nbsp;├─ SKILL.md&nbsp;&nbsp;<span class="an">← 업무 과정을 적은 글 파일 (필수)</span><br>
&nbsp;&nbsp;└─ report-template.md&nbsp;&nbsp;<span class="an">← 보고서 양식 (선택)</span>
        </div>
        <h4>② 스킬 위치</h4>
        <table>
          <tr><th>구분</th><th>폴더 경로</th><th>사용 범위</th></tr>
          <tr><td>개인 스킬</td><td><code>~/.claude/skills/</code></td><td>본인만 사용. 모든 프로젝트에서 사용 가능</td></tr>
          <tr><td>프로젝트 스킬</td><td><code>프로젝트 폴더/.claude/skills/</code></td><td>그 프로젝트를 함께 쓰는 팀 전원</td></tr>
        </table>
        <ul>
          <li>이름이 같은 스킬이 두 위치에 모두 있으면 개인 스킬이 우선</li>
        </ul>
        <div class="fig"><b>스킬 위치</b><br>
🏠 홈 폴더 (~)<br>
&nbsp;&nbsp;└─ .claude/skills/<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ my-memo/SKILL.md&nbsp;&nbsp;<span class="an">← 개인 스킬</span><br>
📁 team-project/ (프로젝트 폴더)<br>
&nbsp;&nbsp;└─ .claude/skills/<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ weekly-report/SKILL.md&nbsp;&nbsp;<span class="an">← 프로젝트 스킬</span>
        </div>
        <h4>③ 스킬 실행 방식</h4>
        <ul>
          <li><strong>직접 실행</strong>: 입력창에 <code>/스킬 이름</code> 입력</li>
          <li><strong>자동 실행</strong>: Claude가 스킬 설명을 읽고 지금 받은 요청에 맞는 스킬을 골라 실행</li>
          <li>Claude가 읽는 범위
            <ul>
              <li>평소: 스킬 설명</li>
              <li>실행할 때: <code>SKILL.md</code> 전체</li>
            </ul>
          </li>
          <li><strong>슬래시 커맨드(slash command)</strong>: <code>/이름</code> 형태의 명령. <code>.claude/commands/</code> 폴더에 넣은 글 파일도 같은 방식으로 실행 가능</li>
        </ul>
        <div class="screen"><div class="sbar">화면 예시 · Claude Code 입력창</div>
&gt; /weekly<br>
<span class="sel">&nbsp;/weekly-report [주차]&nbsp;&nbsp;&nbsp;이번 주 작업 기록으로 주간 보고서 작성&nbsp;</span><br>
&nbsp;/weekly-plan&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;다음 주 일정 정리
        </div>
        <p class="cap">입력창에 <code>/</code>를 입력하면 나타나는 스킬 목록. 실제 화면과 글자 배치 차이 있음.</p>
        <div class="callout">📖 <b>용어 카드</b>
          <ul>
            <li><b>폴더</b>: 파일을 모아 두는 공간</li>
            <li><b>프로젝트 폴더</b>: 한 가지 일에 쓰는 파일을 모두 모아 둔 폴더</li>
            <li><b>홈 폴더(~)</b>: 컴퓨터 사용자마다 하나씩 있는 개인 폴더. 경로에서 쓰는 줄임 표기는 <code>~</code></li>
            <li><b>.md 파일</b>: 글만 들어 있는 파일. 메모장으로 열기 가능</li>
            <li><b>입력창</b>: Claude Code에서 요청을 적는 칸</li>
          </ul>
        </div>`},
      
{type:"concept", kind:"TOPIC · 주제 설명", h:"스킬 설정과 사용 기준",
       html:`__MAP3:skills__<h4>① 설정 구역</h4>
        <ul>
          <li><code>SKILL.md</code> 맨 위 <code>---</code> 두 줄 사이가 설정 구역. 영어 이름은 frontmatter</li>
          <li>설정 표기: 한 줄에 하나씩 <strong>"항목: 값"</strong> 형태</li>
          <li>설정 구역 아래: 업무 과정</li>
        </ul>
        <div class="fig"><b>weekly-report/SKILL.md 내용</b><br>
---<br>
description: 이번 주 작업 기록으로 주간 보고서 작성&nbsp;&nbsp;<span class="an">← 스킬 설명</span><br>
argument-hint: [주차]&nbsp;&nbsp;<span class="an">← 스킬 이름 뒤에 적을 내용 안내</span><br>
allowed-tools: Write&nbsp;&nbsp;<span class="an">← 승인 요청 없이 쓸 수 있는 도구</span><br>
---<br>
주간 보고서 작성 순서<br>
1. notes 폴더에서 이번 주 작업 기록 읽기<br>
2. report-template.md 양식에 맞춰 내용 정리<br>
3. reports 폴더에 새 파일로 저장
        </div>
        <h4>② 주요 설정 항목</h4>
        <table>
          <tr><th>설정 항목</th><th>기능</th><th>사용 상황</th></tr>
          <tr><td><code>description</code></td><td>스킬이 하는 일과 쓰는 때를 적는 설명</td><td>Claude가 자동 실행 여부를 판단하는 근거</td></tr>
          <tr><td><code>argument-hint</code></td><td>스킬 이름 뒤에 적을 내용을 입력창에 보여 주는 안내 문구</td><td>주차나 폴더 이름처럼 매번 달라지는 값이 필요한 스킬</td></tr>
          <tr><td><code>allowed-tools</code></td><td>승인 요청 없이 쓸 수 있는 도구 지정</td><td>매번 승인하지 않아도 되는 안전한 작업</td></tr>
          <tr><td><code>disallowed-tools</code></td><td>쓸 수 없는 도구 지정</td><td>파일을 고치거나 지우면 안 되는 작업</td></tr>
          <tr><td><code>context: fork</code></td><td>본 대화와 분리된 작업 공간에서 실행. 결과만 본 대화에 전달</td><td>중간 과정이 긴 분석 작업</td></tr>
          <tr><td><code>disable-model-invocation: true</code></td><td>자동 실행 차단. 직접 실행만 가능</td><td>잘못 실행되면 안 되는 작업</td></tr>
        </table>
        <ul>
          <li>전체 설정 항목: <a href="https://code.claude.com/docs/ko/skills#frontmatter-reference" target="_blank" rel="noopener">Claude Code 공식 문서 '스킬' 페이지의 설정 항목 표</a> (한국어)</li>
        </ul>
        <div class="screen"><div class="sbar">화면 예시 · 승인 요청</div>
Claude의 파일 만들기 요청<br>
&nbsp;&nbsp;reports/11월-3주차.md<br>
<span class="sel">&nbsp;1. 허용&nbsp;</span><br>
&nbsp;2. 이번 대화에서는 묻지 않고 허용<br>
&nbsp;3. 거부
        </div>
        <p class="cap"><code>allowed-tools: Write</code>를 적은 스킬에서는 이 화면 없이 바로 파일 생성. 실제 화면의 문구는 영어.</p>
        <h4>③ 팀 스킬의 개인용 수정</h4>
        <ul>
          <li>팀 스킬 파일은 수정 금지</li>
          <li>개인 스킬 위치(<code>~/.claude/skills/</code>)에 새 스킬 작성</li>
          <li>같은 이름으로 만들면 내 실행에서만 팀 스킬 대신 실행</li>
          <li>다른 이름으로 만들면 두 스킬 모두 사용 가능</li>
        </ul>
        <h4>④ 스킬과 CLAUDE.md 구분</h4>
        <ul>
          <li><strong>스킬</strong>: 필요할 때만 불러 쓰는 업무 과정</li>
          <li><strong>CLAUDE.md</strong>: Claude가 항상 읽는 공통 규칙</li>
          <li>판단 기준: 매번 적용할 내용이면 CLAUDE.md, 특정 작업에만 쓸 내용이면 스킬</li>
        </ul>
        <div class="callout">📖 <b>용어 카드</b>
          <ul>
            <li><b>도구(tool)</b>: Claude가 파일을 읽거나 고치거나 명령을 실행할 때 쓰는 기능</li>
            <li><b>Read</b>: 파일을 읽는 도구</li>
            <li><b>Write</b>: 파일을 새로 만드는 도구</li>
            <li><b>Edit</b>: 파일을 고치는 도구</li>
            <li><b>Bash</b>: 컴퓨터 명령을 실행하는 도구</li>
            <li><b>승인 요청</b>: Claude가 파일을 만들거나 고치기 전에 진행 여부를 묻는 화면</li>
          </ul>
        </div>`},
      
{type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: Three needs, three homes",
       q:`Your team has three requirements: (1) a "generate release notes from merged PRs" workflow every developer should run on demand; (2) your personal shortcut that reformats commit messages your preferred way; (3) the API error-handling standard that must shape every piece of generated code, always, for everyone. Which allocation is correct?`,
       opts:[
         {t:`(1) a project skill in .claude/skills/, shared via version control; (2) a personal skill in ~/.claude/skills/; (3) the project CLAUDE.md, since universal standards must load on every session rather than wait to be invoked.`, ok:true},
         {t:`All three as project-scoped skills — skills are the most capable packaging, and consistency of mechanism simplifies maintenance.`},
         {t:`(1) and (3) as project skills invoked when relevant; (2) in the project CLAUDE.md marked "for Kim only."`},
         {t:`All three in the project CLAUDE.md — fewer moving parts than a set of separate skills.`},
       ],
       hint:`두 가지 기준으로 나눌 것. 누구에게 적용되는가(팀/개인), 언제 로드되는가(호출 시/항상). (3)의 "always"가 결정적 단서임.`,
       explain:{
         good:`배치 기준은 두 가지. 필요할 때 불러 쓰는 팀 업무 과정은 프로젝트 스킬, 개인용은 개인 스킬, 항상 적용할 공통 규칙은 CLAUDE.md. (3)을 스킬로 만들면 실행할 때만 읽히므로 매번 적용된다는 보장 없음.`,
         wrongs:[
           `<b>B(전부 스킬):</b> (3)이 어긋남. 표준이 호출될 때만 적용되므로 상당수 코드가 표준을 벗어난 상태로 생성됨. (2)는 개인 설정을 팀 저장소에 넣는 배치임.`,
           `<b>C(표준을 스킬로):</b> "관련될 때 호출"은 항상 적용돼야 한다는 요구와 맞지 않음. 개인 설정을 팀 파일에 넣은 것도 배치가 반대임.`,
           `<b>D(전부 CLAUDE.md):</b> 필요할 때만 쓰는 워크플로가 모든 세션에 상시 로드됨. 토큰이 낭비되고 개인 설정이 팀 전원에게 적용됨.`,
         ]},
       principle:"누구에게, 언제. 두 기준으로 배치"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2: Designing the audit skill",
       q:`You are building a dependency-audit skill that (a) produces extremely verbose scan output that shouldn't pollute the main conversation, (b) must never modify or delete files — read-only analysis, and (c) requires a target directory that developers keep forgetting to pass. Which frontmatter configuration is correct?`,
       opts:[
         {t:`context: fork to isolate the verbose output, disallowed-tools to remove the tools that modify or delete files, and argument-hint to show which target directory to pass.`, ok:true},
         {t:`context: fork alone — isolation automatically prevents file modification and handles missing arguments.`},
         {t:`disallowed-tools alone — removing tools also isolates output and can define default arguments.`},
         {t:`Write the three requirements as instructions in the skill's prompt body, since frontmatter is only for metadata.`}],
       hint:`요구사항이 세 개이고 설정 항목도 세 개. 요구사항마다 설정 항목 하나씩 연결할 것.`,
       explain:{
         good:`요구사항과 설정 항목이 하나씩 대응. 출력 격리는 context: fork, 파일 수정 차단은 disallowed-tools, 넘길 값 안내는 argument-hint. 세 항목은 기능이 달라 서로 대체 불가.`,
         wrongs:[
           `<b>B:</b> fork의 기능은 컨텍스트 격리. 도구 차단과 값 안내 기능 없음.`,
           `<b>C:</b> disallowed-tools의 기능은 도구 차단. 출력은 그대로 본 대화에 남음.`,
           `<b>D:</b> 프롬프트 본문에 적은 지시는 지켜진다는 보장 없음. "수정 금지"는 disallowed-tools로 강제 (원칙 ①: 반드시 지켜야 하는 것은 설정으로 강제).`,
         ]},
       principle:"강제는 설정으로. 설정 항목의 기능 구분"},
    ]},

  /* ===== CH 3 · 3.3 경로별 규칙 ===== */
  { id:"p3c3", ch:"CH 3", title:"경로별 규칙: 조건부 컨벤션 로딩 (3.3)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"글롭 패턴: 여러 파일을 조건 한 줄로 지정하는 표기법",
   html:`<h4>① 필요한 이유</h4>
<ul>
<li>규칙 파일에는 적용 대상을 적어야 함</li>
<li>대상 파일이 수백 개면 이름을 모두 적을 수 없음</li>
<li>글롭 패턴(glob pattern): "terraform 폴더 아래 전부" 같은 조건을 한 줄로 적는 표기법</li>
</ul>
<h4>② 기호 두 개</h4>
<table>
<tr><th>기호</th><th>뜻</th><th>예</th></tr>
<tr><td><code>*</code></td><td>이름 한 단계. 폴더 경계(/)는 넘지 못함</td><td><code>*.ts</code>: 이름이 .ts로 끝나는 파일</td></tr>
<tr><td><code>**</code></td><td>폴더 여러 단계</td><td><code>src/**</code>: src 아래의 모든 폴더</td></tr>
</table>
<h4>③ 읽는 방법</h4>
<ul>
<li>왼쪽부터 끊어 읽기</li>
<li><code>src/api/**/*.ts</code>는 <code>src/api/</code>, <code>**/</code>, <code>*.ts</code> 세 부분</li>
<li>뜻: src/api 아래에 있는 모든 .ts 파일. 폴더 깊이와 무관</li>
</ul>
<div class="fig"><b>paths: ["src/api/**/*.ts"]에 해당하는 파일</b><br>
📁 src/<br>
&nbsp;&nbsp;├─ api/<br>
&nbsp;&nbsp;│&nbsp;&nbsp;├─ index.ts&nbsp;&nbsp;<span class="an">✅ 해당. 바로 아래 파일도 포함</span><br>
&nbsp;&nbsp;│&nbsp;&nbsp;├─ README.md&nbsp;&nbsp;❌ 이름이 .ts로 끝나지 않음<br>
&nbsp;&nbsp;│&nbsp;&nbsp;└─ v2/handlers/<br>
&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ payment.ts&nbsp;&nbsp;<span class="an">✅ 해당. **가 v2/handlers 아래까지 포함</span><br>
&nbsp;&nbsp;└─ web/<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ app.ts&nbsp;&nbsp;❌ src/api 밖<br>
<br>
<span class="an">* 하나만 쓴 src/api/*.ts에는 payment.ts가 해당하지 않음. *는 폴더 한 단계만 지정</span>
</div>
<h4>④ 규칙 파일과 paths</h4>
<ul>
<li>규칙 파일 위치: <code>.claude/rules/</code> 폴더의 .md 파일</li>
<li>파일 맨 위 설정 구역의 <code>paths</code> 항목에 글롭 패턴 작성</li>
<li>효과: 패턴에 해당하는 파일을 다룰 때만 규칙 로드</li>
<li>장점: 관계없는 규칙이 줄어 토큰 절약. 지시끼리 섞이는 문제 감소</li>
<li><code>paths</code>가 없는 규칙 파일은 항상 로드</li>
</ul>
<div class="fig"><b>.claude/rules/terraform.md 내용</b><br>
---<br>
paths: ["terraform/**/*"]&nbsp;&nbsp;<span class="an">← 이 패턴에 해당하는 파일을 다룰 때만 로드</span><br>
---<br>
리소스 이름은 소문자와 하이픈만 사용
</div>
<h4>⑤ 글롭 패턴을 쓰는 곳</h4>
<ul>
<li><code>.claude/rules/</code>의 <code>paths</code>: 규칙을 로드할 조건</li>
<li>Glob 도구: 같은 표기법으로 파일을 찾는 도구. Part 2 CH 5에서 다룬 내용</li>
<li>CLAUDE.md에는 쓰지 않음. 조건 없이 로드되는 파일</li>
<li>설명 전체: <a href="https://code.claude.com/docs/ko/memory#path-specific-rules" target="_blank" rel="noopener">Claude Code 공식 문서 'Claude가 프로젝트를 기억하는 방법' 페이지의 경로별 규칙 항목</a> (한국어)</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>확장자</b>: 파일 이름 끝의 .ts, .md 같은 표시. 파일 종류를 나타냄</li>
<li><b>설정 구역(frontmatter)</b>: 파일 맨 위 --- 두 줄 사이. 설정을 적는 자리</li>
<li><b>토큰(token)</b>: Claude가 글을 세는 단위</li>
</ul>
</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"경로별 규칙과 폴더별 CLAUDE.md의 선택 기준",
   html:`__MAP3:rules__<h4>① 판단 기준: 대상 파일의 위치</h4>
<table>
<tr><th>대상 파일의 위치</th><th>맞는 수단</th></tr>
<tr><td>한 폴더에 모여 있음</td><td>그 폴더의 CLAUDE.md. 경로별 규칙도 가능</td></tr>
<tr><td>여러 폴더에 흩어져 있음</td><td>경로별 규칙</td></tr>
</table>
<ul>
<li>폴더별 CLAUDE.md는 그 폴더에만 적용. 흩어진 파일을 한 번에 지정할 수 없음</li>
</ul>
<h4>② 사례: 흩어진 테스트 파일</h4>
<ul>
<li>상황: 화면 구성 코드, API 처리 코드, 데이터 모델, 테스트가 각각 다른 규칙 사용</li>
<li>조건: 테스트 파일은 코드 파일 옆에 흩어져 있음. 규칙은 자동으로 적용돼야 함</li>
<li>해결: <code>.claude/rules/</code>에 규칙 파일을 만들고 <code>paths</code>에 <code>**/*.test.tsx</code> 작성</li>
</ul>
<div class="fig"><b>흩어진 테스트 파일과 패턴 하나</b><br>
src/components/Button.tsx<br>
src/components/Button.test.tsx&nbsp;&nbsp;<span class="an">✅</span><br>
src/api/orders.ts<br>
src/api/orders.test.tsx&nbsp;&nbsp;<span class="an">✅</span><br>
<br>
paths: ["**/*.test.tsx"]&nbsp;&nbsp;<span class="an">← 위치와 무관하게 테스트 파일 전부 지정</span>
</div>
<table>
<tr><th>다른 방법</th><th>문제</th></tr>
<tr><td>스킬</td><td>직접 실행해야 적용. 자동 적용이 아님</td></tr>
<tr><td>프로젝트 CLAUDE.md 한 파일에 전부 작성</td><td>어느 규칙이 어느 파일에 해당하는지 Claude의 판단에 의존</td></tr>
</table>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>경로별 규칙</b>: paths에 적은 패턴에 해당하는 파일을 다룰 때만 로드되는 규칙 파일</li>
<li><b>.test.tsx</b>: 테스트 코드를 담은 파일의 이름 끝 표시</li>
</ul>
</div>`},
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
  { id:"p3c4", ch:"CH 4", title:"권한 모드와 plan mode (3.4)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"권한 모드: Claude가 승인 없이 할 수 있는 일의 범위",
       html:`<h4>① 권한 모드 여섯 가지</h4>
        <table>
          <tr><th>모드</th><th>승인 없이 하는 일</th><th>사용 상황</th></tr>
          <tr><td><code>default</code></td><td>파일 읽기</td><td>수정할 때마다 직접 확인하려는 경우</td></tr>
          <tr><td><code>acceptEdits</code></td><td>파일 읽기와 수정</td><td>수정 내용을 나중에 한꺼번에 검토하는 경우</td></tr>
          <tr><td><code>plan</code></td><td>파일 읽기와 조사. 수정 전에 계획 제안</td><td>큰 작업을 시작하기 전</td></tr>
          <tr><td><code>auto</code></td><td>대부분의 작업. 위험한 작업은 별도 검사 모델이 차단</td><td>긴 작업을 맡기는 경우</td></tr>
          <tr><td><code>dontAsk</code></td><td>미리 허용한 도구만 사용. 나머지는 자동 거부</td><td>사람이 없는 자동 실행</td></tr>
          <tr><td><code>bypassPermissions</code></td><td>모든 작업</td><td>외부와 분리된 실험 환경 전용</td></tr>
        </table>
        <ul>
          <li>모드 전환: 입력창에서 Shift+Tab</li>
          <li>모드별 조건과 설정 방법: <a href="https://code.claude.com/docs/ko/permission-modes" target="_blank" rel="noopener">Claude Code 공식 문서 '권한 모드' 페이지</a> (한국어)</li>
        </ul>
        <h4>② plan mode</h4>
        <ul>
          <li>파일을 고치기 전에 조사와 계획만 하는 모드</li>
          <li>Claude가 계획을 제안하고 사람이 승인한 뒤 수정 시작</li>
        </ul>
        <div class="screen"><div class="sbar">화면 예시 · plan mode에서 제안한 계획</div>
계획<br>
&nbsp;1. 결제 관련 파일 12개 조사<br>
&nbsp;2. 고칠 순서와 방법 정리<br>
&nbsp;3. 승인 후 수정 시작<br>
<span class="sel">&nbsp;1. 승인하고 진행&nbsp;</span><br>
&nbsp;2. 계획 수정 요청
        </div>
        <p class="cap">plan mode에서는 승인하기 전까지 파일 수정 없음. 실제 화면의 문구는 영어.</p>
        <h4>③ Explore 서브에이전트</h4>
        <ul>
          <li>조사만 하는 기본 제공 서브에이전트</li>
          <li>긴 조사 과정은 별도 공간에서 처리하고 요약만 본 대화에 전달</li>
          <li>효과: 본 대화의 컨텍스트 창 절약</li>
        </ul>
        <div class="callout">📖 <b>용어 카드</b>
          <ul>
            <li><b>승인 요청</b>: Claude가 파일을 고치거나 명령을 실행하기 전에 진행 여부를 묻는 화면</li>
            <li><b>권한 모드(permission mode)</b>: 승인 요청 없이 진행할 작업의 범위를 정하는 설정</li>
            <li><b>서브에이전트(subagent)</b>: 맡은 일 하나를 별도 공간에서 수행하는 보조 에이전트</li>
            <li><b>컨텍스트 창(context window)</b>: Claude가 한 번에 읽을 수 있는 글의 분량 한도</li>
          </ul>
        </div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"plan mode 사용 기준",
       html:`__MAP3:mode__<h4>① 판단 기준</h4>
        <table>
          <tr><th>질문</th><th>plan mode</th><th>바로 실행</th></tr>
          <tr><td>가능한 방법의 수</td><td>여러 개</td><td>하나</td></tr>
          <tr><td>고칠 파일의 수</td><td>많음</td><td>한두 개</td></tr>
          <tr><td>원인과 수정 방법</td><td>조사 필요</td><td>이미 확인됨</td></tr>
        </table>
        <h4>② 작업 예</h4>
        <ul>
          <li>plan mode: 프로그램 구조를 크게 바꾸는 작업</li>
          <li>plan mode: 파일 수십 개를 함께 고치는 작업</li>
          <li>plan mode: 방법마다 비용이 달라 비교가 필요한 작업</li>
          <li>바로 실행: 오류 위치가 확인된 파일 하나 수정</li>
          <li>바로 실행: 조건 한 줄 추가</li>
        </ul>
        <h4>③ 조합</h4>
        <ul>
          <li>plan mode로 조사와 계획, 승인 후 바로 실행으로 수정</li>
          <li>조사가 길어지면 Explore 서브에이전트에게 조사 위임</li>
        </ul>
        <h4>④ 피할 진행 방식</h4>
        <ul>
          <li>큰 작업을 계획 없이 시작하고 복잡해지면 plan mode로 전환</li>
          <li>수정하면서 작업 범위 파악. 뒤늦은 재작업 발생</li>
        </ul>
        <div class="callout">📖 <b>용어 카드 · 문제 지문에 나오는 영어</b>
          <ul>
            <li><b>crash</b>: 프로그램이 오류로 멈추는 현상</li>
            <li><b>null</b>: 값이 비어 있는 상태</li>
            <li><b>stack trace</b>: 오류가 난 파일과 줄 번호를 알려 주는 기록. 지문에 있으면 원인 확인이 끝났다는 뜻</li>
            <li><b>guard clause</b>: 잘못된 입력을 먼저 걸러 내는 한 줄. 지문에 있으면 수정이 한 줄로 끝난다는 뜻</li>
            <li><b>migration</b>: 쓰던 도구나 구조를 다른 것으로 옮기는 작업</li>
          </ul>
        </div>`},
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
   html:`<h4>① 입력과 출력 예시</h4>
<ul>
<li>쓰는 상황: 글로 설명한 요구를 Claude가 매번 다르게 해석하는 경우</li>
<li>방법: 입력과 기대하는 출력을 짝지은 예시 2~3개 제시</li>
<li>드물게 생기는 경우도 예시로 제시. 예: 값이 비어 있는 입력과 그때 기대하는 출력</li>
</ul>
<div class="fig"><b>예시가 필요한 요청</b><br>
글로만 설명: "날짜를 보기 좋게 바꿔 줘"&nbsp;&nbsp;<span class="an">← 실행마다 다른 형식</span><br>
예시 추가: "2025-04-03은 2025년 4월 3일로"&nbsp;&nbsp;<span class="an">← 형식 고정</span>
</div>
<h4>② 테스트 먼저 작성</h4>
<ul>
<li>방법: 기대 동작, 드물게 생기는 경우, 성능 기준을 담은 테스트를 먼저 작성</li>
<li>실패한 테스트 결과를 Claude에 보여 주며 고치기 반복</li>
</ul>
<h4>③ 인터뷰</h4>
<ul>
<li>방법: 만들기 전에 Claude가 먼저 질문하게 하기</li>
<li>효과: 사용자가 놓친 고려 사항 발견</li>
<li>잘 모르는 분야일수록 효과가 큼</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 인터뷰를 요청하는 입력</div>
&gt; 캐시 기능을 만들기 전에 내가 놓친 부분이 없는지 먼저 질문해 줘.<br>
<br>
Claude: 1. 저장한 결과는 얼마 동안 유효한가요?<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. 원본 자료가 바뀌면 저장한 결과를 바로 지워야 하나요?
</div>
<h4>④ 한 번에 전달과 하나씩 전달</h4>
<ul>
<li>서로 영향을 주는 문제들: 한 메시지에 함께 자세히 전달</li>
<li>서로 무관한 문제들: 하나씩 차례로 수정</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>엣지 케이스(edge case)</b>: 드물게 생기는 특수한 입력이나 상황</li>
<li><b>null</b>: 값이 없다는 표시</li>
<li><b>캐시(cache)</b>: 한 번 계산한 결과를 저장해 두고 다시 쓰는 기능</li>
</ul>
</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"증상별 기법 선택",
   html:`__MAP3:iterate__<h4>① 증상과 기법</h4>
<table>
<tr><th>증상</th><th>기법</th></tr>
<tr><td>설명은 자세히 했는데 출력 형식이 매번 다름</td><td>입력과 출력 예시</td></tr>
<tr><td>고쳤다고 하는데 드문 경우에서 계속 실패</td><td>그 경우의 입력과 기대 출력을 담은 테스트</td></tr>
<tr><td>요구를 다 전달했다고 생각했는데 빠진 항목이 계속 발견</td><td>인터뷰</td></tr>
<tr><td>오류 5개를 하나씩 고치면 서로를 다시 망가뜨림</td><td>서로 영향을 주는 오류를 한 메시지에 전달</td></tr>
</table>
<h4>② 판단 순서</h4>
<ul>
<li>1단계: 문제가 해석의 차이인지 확인. 해석이 매번 다르면 예시</li>
<li>2단계: 문제가 특정 경우의 실패인지 확인. 특정 경우에만 실패하면 테스트</li>
<li>3단계: 요구 자체가 덜 정리됐는지 확인. 빠진 항목이 계속 나오면 인터뷰</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 실패한 경우를 테스트로 전달</div>
&gt; 아래 입력에서 계속 실패해. 이 테스트를 통과하도록 고쳐 줘.<br>
&nbsp;&nbsp;입력: 주소 값이 비어 있음 (null)<br>
&nbsp;&nbsp;기대 출력: "주소 없음"
</div>
<p class="cap">이해를 돕기 위한 예시. "드문 경우도 처리해 줘"라는 말보다 입력과 기대 출력 한 쌍이 정확.</p>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>테스트 케이스(test case)</b>: 입력 하나와 기대하는 출력 하나를 짝지은 확인 항목</li>
</ul>
</div>`},
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
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"CI/CD: 사람 없이 Claude Code를 실행하는 환경",
   html:`<h4>① CI/CD</h4>
<ul>
<li>코드를 올릴 때마다 검사, 테스트, 배포를 자동으로 실행하는 체계</li>
<li>Claude Code를 이 체계에 넣으면 코드 변경마다 자동 리뷰 가능</li>
</ul>
<div class="fig"><b>CI에서 Claude Code가 실행되는 순서</b><br>
내 컴퓨터: 코드 수정 후 서버로 전송<br>
&nbsp;&nbsp;↓<br>
GitHub 서버: 변경 요청(PR) 감지. 러너 시작&nbsp;&nbsp;<span class="an">← 러너: 작업용 임시 컴퓨터</span><br>
&nbsp;&nbsp;↓<br>
러너: 저장소 내려받기 → Claude Code 설치 → claude -p "이 변경을 리뷰" → 결과를 PR 댓글로 게시<br>
&nbsp;&nbsp;↓<br>
GitHub 서버: 러너 삭제&nbsp;&nbsp;<span class="an">← 실행 장소는 내 컴퓨터가 아니라 서버</span>
</div>
<h4>② 실행 옵션</h4>
<table>
<tr><th>옵션</th><th>기능</th></tr>
<tr><td><code>-p</code></td><td>요청 하나를 처리하고 결과를 출력한 뒤 종료. 없으면 다음 입력을 기다리며 멈춤</td></tr>
<tr><td><code>--output-format json</code></td><td>결과를 프로그램이 읽을 수 있는 JSON으로 출력</td></tr>
<tr><td><code>--json-schema</code></td><td>결과 JSON의 양식을 스키마로 고정. 결과는 <code>structured_output</code> 항목에 포함</td></tr>
<tr><td><code>--bare</code></td><td>훅, 스킬, MCP 서버, 자동 메모리, CLAUDE.md를 불러오지 않고 시작. 스크립트 실행에 권장되는 옵션. 팀 규칙이 담긴 CLAUDE.md도 읽지 않는다는 점에 주의</td></tr>
</table>
<ul>
<li><code>claude -p</code>는 Agent SDK를 명령어로 쓰는 방식</li>
<li>CI 실행용으로 따로 있는 옵션이나 환경 변수는 없음. <code>--batch</code>, <code>CLAUDE_HEADLESS</code>는 없는 이름</li>
<li>옵션 설명 전체: <a href="https://code.claude.com/docs/ko/headless" target="_blank" rel="noopener">Claude Code 공식 문서 'Claude Code를 프로그래밍 방식으로 실행하기' 페이지</a> (한국어)</li>
<li>GitHub 연동 방법: <a href="https://code.claude.com/docs/ko/github-actions" target="_blank" rel="noopener">Claude Code 공식 문서 'Claude Code GitHub Actions' 페이지</a> (한국어)</li>
</ul>
<h4>③ CI에서 쓰는 CLAUDE.md</h4>
<ul>
<li>CI 실행에서도 CLAUDE.md가 프로젝트 정보 제공</li>
<li>테스트 기준, 테스트용 자료, 리뷰 기준을 적어 두면 결과 품질 향상</li>
</ul>
<h4>④ 작성 세션과 리뷰 세션 분리</h4>
<ul>
<li>코드를 작성한 세션은 자기 코드 리뷰에 부적합. 작성할 때의 판단 과정이 남아 있는 상태</li>
<li>리뷰는 별도 세션으로 실행. Part 4 CH 6에서 다루는 내용</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>PR(pull request)</b>: 코드 변경을 반영해 달라는 요청. 팀원이 검토한 뒤 반영</li>
<li><b>러너(runner)</b>: 자동 실행 작업을 처리하는 임시 컴퓨터</li>
<li><b>Agent SDK</b>: Claude Code의 기능을 다른 프로그램에서 쓰게 해 주는 개발 도구</li>
<li><b>JSON</b>: 항목 이름과 값을 짝지어 적는 글 형식. 프로그램끼리 자료를 주고받을 때 사용</li>
</ul>
</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"CI 리뷰와 테스트 생성의 품질 기준",
   html:`__MAP3:ci__<h4>① 문제별 해결</h4>
<table>
<tr><th>문제</th><th>해결</th></tr>
<tr><td>새 변경이 올라올 때마다 같은 지적 반복</td><td>이전 리뷰 결과를 함께 전달. "새 문제와 해결되지 않은 문제만 보고"라고 지시</td></tr>
<tr><td>이미 있는 테스트를 다시 제안</td><td>기존 테스트 파일을 함께 전달</td></tr>
<tr><td>가치가 낮은 테스트 생성</td><td>CLAUDE.md에 테스트 기준, 가치 판단 기준, 테스트용 자료 작성</td></tr>
</table>
<h4>② 공통 원리</h4>
<ul>
<li>Claude는 전달받지 않은 내용을 알 수 없음</li>
<li>반복과 중복의 원인: 이전 결과와 기존 자료가 전달되지 않은 상태</li>
<li>해결의 방향: 필요한 자료를 요청에 포함</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · PR에 달린 리뷰 댓글</div>
Claude 리뷰<br>
새로 발견한 문제 1건<br>
&nbsp;&nbsp;결제 파일 42번째 줄: 금액 반올림 오류<br>
이전 리뷰의 미해결 문제 1건<br>
&nbsp;&nbsp;주문 파일 17번째 줄: 입력값 확인 누락<br>
<span class="sel">이미 해결된 문제 3건은 다시 보고하지 않음</span>
</div>
<p class="cap">이해를 돕기 위한 예시. 이전 리뷰 결과를 함께 전달한 경우의 댓글.</p>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>테스트용 자료(fixture)</b>: 테스트를 실행할 때 쓰는 미리 준비한 입력 자료</li>
</ul>
</div>`},
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
         good:`3.6의 두 항목을 함께 적용함. 구조화된 출력(structured output)은 --output-format json과 --json-schema로 만들고(정규식 보완이 아님), 리뷰 품질은 세션 격리로 확보함(생성 맥락이 없는 독립 인스턴스). -p는 이미 올바르게 쓰고 있으므로 유지함. 무엇이 결함이고 무엇이 결함이 아닌지 구분하는 것까지가 이 문제의 요구사항임.`,
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
       {t:`Create a personal skill under ~/.claude/skills/, leaving the team's skill untouched.`, ok:true},
       {t:`Edit the team's skill in .claude/skills/ — your preferences are improvements others will appreciate.`},
       {t:`Add an if-branch inside the team skill keyed to your username.`},
       {t:`Add your variant to the project's .claude/skills/ under a new name so it is versioned with the repository.`}],
     explain:{good:`개인 스킬 위치(~/.claude/skills/)에 만들면 본인에게만 적용. 팀 스킬 파일은 그대로. 이름이 같으면 본인 실행에서만 개인 스킬이 우선.`,
       wrongs:[`<b>B:</b> 저장소에 커밋되는 팀 스킬을 임의로 변경하는 것임. 팀 전원에게 영향을 줌.`,`<b>C:</b> 팀 스킬에 개인용 분기를 넣는 방식임.`,`<b>D:</b> 저장소에 올라가 팀 전원에게 적용. 개인용이라는 조건 위반.`]},
     principle:"개인 변형은 개인 스킬 위치에"},
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
     explain:{good:`CI의 구조화된 출력은 --output-format json과 --json-schema의 조합임.`,
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
