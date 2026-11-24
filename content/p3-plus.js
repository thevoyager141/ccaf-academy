/* PART 3 PLUS · D3(Claude Code 설정 & 워크플로) 보강
   로드 순서: part3.js · mt-extra.js 다음. 기존 배열 원소는 건드리지 않고 추가만 함.

   구성
     (1) 신규 챕터 p3c7 "CLI 호출과 실행 제어": p3test 앞에 삽입
     (2) p3c1~p3c6 각 레슨 steps 끝에 선택 비교형 quiz 1개씩 (총 6문항)
     (3) 확장 문제 풀(window.CCAF_MT_EXTRA)에 D3 문항 12개

   CLI 사실 근거: 2026-08-27 WebFetch로 직접 확인한 공식 문서
     https://code.claude.com/docs/en/cli-reference      (docs.claude.com/en/docs/claude-code/cli-reference 가 302로 리다이렉트)
     https://code.claude.com/docs/en/headless           (비대화형 실행·구조화된 출력·세션 이어가기 예시)
     https://code.claude.com/docs/en/permission-modes   (권한 모드 7종과 -p의 시작 모드)
     https://code.claude.com/docs/en/permissions        (allow/ask/deny 규칙, PreToolUse 훅, 규칙 문법)
     https://code.claude.com/docs/en/tools-reference    (Glob·Grep·Read·Bash 동작)
   문서에서 확인되지 않은 플래그·값은 본문에 쓰지 않음.
*/
(function(){
  var C = window.CCAF_CONTENT;
  if(!C || !C.p3 || !C.p3.lessons) return;

  /* ============================================================
     (1) 신규 챕터: CLI 호출과 실행 제어
     ============================================================ */
  var p3c7 = { id:"p3c7", ch:"CH 7", title:"CLI 호출과 실행 제어", steps:[

    {type:"concept", kind:"CONCEPT · 개념 설명 ①", h:"터미널 실행: 명령어로 Claude Code를 시작하는 방식",
   html:`<h4>① 터미널</h4>
<ul>
<li>터미널(terminal): 글자로 명령을 입력하는 창</li>
<li><code>claude</code>를 입력하면 대화형 세션 시작</li>
<li>플래그(flag): 명령 뒤에 붙이는 <code>--이름</code> 형태의 옵션</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 터미널</div>
$ claude<br>
&nbsp;&nbsp;(대화형 세션 시작. 다음 입력 대기)<br>
<br>
$ claude -p "README 요약해 줘"<br>
&nbsp;&nbsp;(요약을 출력한 뒤 종료)
</div>
<h4>② 대화형 실행의 전제</h4>
<ul>
<li>전제: 화면 앞에 승인 요청에 답할 사람이 있음</li>
<li>사람이 없는 환경: CI 러너, 예약 실행, 자동화 스크립트</li>
</ul>
<h4>③ 사람이 없을 때 생기는 문제</h4>
<table>
<tr><th>문제</th><th>내용</th></tr>
<tr><td>① 종료되지 않는 세션</td><td>답을 출력한 뒤에도 다음 입력 대기</td></tr>
<tr><td>② 승인할 사람 없음</td><td>승인 요청에서 계속 대기</td></tr>
<tr><td>③ 결과를 읽을 사람 없음</td><td>글로 된 결과를 다음 프로그램이 사용하지 못함</td></tr>
<tr><td>④ 멈출 사람 없음</td><td>같은 작업을 반복해 비용 누적</td></tr>
<tr><td>⑤ 이전 대화를 아는 사람 없음</td><td>다음 질문을 어느 세션에 이을지 알 수 없음</td></tr>
</table>
<ul>
<li>이 챕터의 플래그는 모두 이 다섯 문제 중 하나의 해결 수단</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>파이프(|)</b>: 앞 명령의 출력을 뒤 명령의 입력으로 넘기는 기호</li>
<li><b>종료 코드(exit code)</b>: 명령이 끝날 때 남기는 숫자. 성공은 0, 실패는 0이 아닌 값</li>
<li><b>스크립트(script)</b>: 명령을 순서대로 적어 둔 파일. 한 번에 자동 실행</li>
</ul>
</div>`},

    {type:"concept", kind:"CONCEPT · 개념 설명 ②", h:"실행 종료와 결과 형식",
   html:`<h4>① 실행 종료: -p</h4>
<ul>
<li>문제: <code>claude "리뷰해 줘"</code>는 답을 출력한 뒤에도 다음 입력 대기. 자동화 흐름이 그 자리에서 정지</li>
<li>해결: <code>-p</code>. 요청 하나를 처리하고 출력한 뒤 종료. 긴 이름은 <code>--print</code></li>
<li>다른 명령의 출력을 입력으로 전달 가능. 예: <code>cat build-error.txt | claude -p "이 오류의 원인만 짧게"</code></li>
<li>종료 코드: 성공은 0, 실패는 0이 아닌 값</li>
</ul>
<h4>② 결과 형식: --output-format</h4>
<table>
<tr><th>값</th><th>형식</th></tr>
<tr><td><code>text</code></td><td>글. 기본값</td></tr>
<tr><td><code>json</code></td><td>JSON. 답은 <code>result</code> 항목. 세션 ID(<code>session_id</code>)와 비용(<code>total_cost_usd</code>) 포함</td></tr>
<tr><td><code>stream-json</code></td><td>한 줄에 하나씩 나오는 JSON. 진행 상황을 실시간으로 보여 줄 때 사용</td></tr>
</table>
<div class="screen"><div class="sbar">화면 예시 · --output-format json 결과</div>
{ "result": "변경 사항 3건을 검토했습니다...",<br>
&nbsp;&nbsp;"session_id": "5b3f2c1a-...",<br>
&nbsp;&nbsp;"total_cost_usd": 0.0042 }
</div>
<p class="cap">이해를 돕기 위해 항목을 줄인 예시. 실제 결과에는 항목이 더 많음.</p>
<h4>③ 결과 양식 고정: --json-schema</h4>
<ul>
<li>스키마에 맞는지 확인한 결과를 <code>structured_output</code> 항목으로 전달</li>
<li>스키마 자체가 잘못된 경우 오류로 종료</li>
</ul>
<h4>④ 두 플래그의 역할</h4>
<table>
<tr><th>플래그</th><th>역할</th></tr>
<tr><td><code>-p</code></td><td>실행 종료</td></tr>
<tr><td><code>--output-format json</code></td><td>결과 형식</td></tr>
</table>
<ul>
<li>두 플래그는 서로 대신할 수 없음. <code>-p</code>만 쓰면 결과가 글, <code>--output-format json</code>만 쓰면 세션이 종료되지 않음</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>JSON</b>: 항목 이름과 값을 짝지어 적는 글 형식</li>
<li><b>JSON 스키마</b>: JSON에 들어갈 항목과 값의 종류를 정해 둔 양식</li>
</ul>
</div>`},

    {type:"concept", kind:"CONCEPT · 개념 설명 ③", h:"승인 처리: 권한 모드와 도구 규칙",
   html:`<h4>① 권한 모드: --permission-mode</h4>
<table>
<tr><th>값</th><th>동작</th></tr>
<tr><td><code>default</code></td><td>읽기만 승인 없이 진행. 나머지는 승인 요청. <code>-p</code> 실행의 기본값</td></tr>
<tr><td><code>acceptEdits</code></td><td>파일 수정과 기본 파일 명령을 승인 없이 진행</td></tr>
<tr><td><code>plan</code></td><td>읽기 중심. 계획을 승인받기 전에는 수정 차단</td></tr>
<tr><td><code>auto</code></td><td>분류 모델이 작업을 검토하고 진행 여부 판단</td></tr>
<tr><td><code>dontAsk</code></td><td>미리 허용한 항목만 실행. 나머지는 자동 거부. 입력 대기 없음</td></tr>
<tr><td><code>bypassPermissions</code></td><td>모든 호출을 승인 없이 진행. 컨테이너 같은 격리 환경 전용</td></tr>
</table>
<ul>
<li>아무것도 지정하지 않으면 CI에서 승인 대기로 멈출 수 있음</li>
</ul>
<h4>② 도구 규칙 플래그</h4>
<table>
<tr><th>플래그</th><th>기능</th><th>예</th></tr>
<tr><td><code>--allowedTools</code></td><td>승인 요청 없이 실행할 항목의 목록</td><td><code>"Bash(npm test)" "Read"</code></td></tr>
<tr><td><code>--disallowedTools</code></td><td>거부 규칙. 도구 이름만 쓰면 그 도구 제외. 범위를 쓰면 해당 호출만 차단</td><td><code>"Bash(rm *)"</code></td></tr>
<tr><td><code>--tools</code></td><td>쓸 수 있는 기본 제공 도구 목록 자체를 축소</td><td><code>"Bash,Edit,Read"</code></td></tr>
</table>
<h4>③ 규칙 표기</h4>
<table>
<tr><th>표기</th><th>허용 범위</th></tr>
<tr><td><code>Bash(git diff *)</code></td><td>git diff로 시작하는 명령. * 앞의 빈칸이 범위를 결정</td></tr>
<tr><td><code>Bash(git diff*)</code></td><td>git diff-index 같은 다른 명령까지 포함</td></tr>
<tr><td><code>Bash(git *)</code></td><td>모든 git 명령. git push 포함</td></tr>
</table>
<h4>④ 함께 쓰는 조합</h4>
<div class="screen"><div class="sbar">화면 예시 · CI에서 테스트를 실행하는 명령</div>
$ claude -p "run the test suite" --permission-mode dontAsk --allowedTools "Bash(npm test)" "Read"
</div>
<ul>
<li>권한 모드의 역할: 미리 정한 항목만 실행</li>
<li>허용 목록의 역할: 허용할 항목 지정</li>
</ul>
<h4>⑤ 거부 규칙 우선</h4>
<ul>
<li>설정 파일의 거부(deny) 규칙은 모든 권한 모드에서 적용. <code>bypassPermissions</code>에서도 적용</li>
<li>허용(allow) 규칙은 <code>bypassPermissions</code>에서 의미 없음</li>
<li>설계 순서: 절대 허용하지 않을 항목을 먼저 지정</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>권한 모드(permission mode)</b>: 승인 요청 없이 진행할 범위를 정하는 설정. CH 4에서 다룬 내용</li>
<li><b>컨테이너(container)</b>: 다른 프로그램과 분리된 실행 공간</li>
<li><b>npm test, git diff, git push</b>: 예시에 쓴 명령. 테스트 실행, 변경 내용 비교, 서버로 전송</li>
</ul>
</div>`},

    {type:"concept", kind:"CONCEPT · 개념 설명 ④", h:"실행량 제한과 세션 이어가기",
   html:`<h4>① 실행량 제한</h4>
<table>
<tr><th>플래그</th><th>제한 대상</th><th>한도 도달 시</th></tr>
<tr><td><code>--max-turns 3</code></td><td>에이전트가 일한 차례 수. 기본값은 제한 없음</td><td>오류로 종료</td></tr>
<tr><td><code>--max-budget-usd 5.00</code></td><td>금액. 서브에이전트가 쓴 비용 포함</td><td>실행 중지</td></tr>
</table>
<ul>
<li>두 플래그 모두 <code>-p</code> 실행 전용</li>
<li>CI의 작업 제한 시간은 대체 수단이 아님. 밖에서 강제 종료하면 종료 코드 143. 진행 중이던 작업의 결과는 기록되지 않음</li>
</ul>
<h4>② 세션 이어가기</h4>
<table>
<tr><th>플래그</th><th>동작</th></tr>
<tr><td><code>-c</code>, <code>--continue</code></td><td>현재 폴더의 가장 최근 대화 이어가기</td></tr>
<tr><td><code>-r</code>, <code>--resume</code></td><td>세션 ID나 이름을 지정해서 이어가기</td></tr>
<tr><td><code>--fork-session</code></td><td>이어갈 때 새 세션 ID 생성. 원래 대화는 그대로 유지</td></tr>
</table>
<ul>
<li>세션 ID 확인 방법: <code>--output-format json</code> 결과의 <code>session_id</code> 항목</li>
<li>여러 작업을 동시에 실행한 경우: 세션을 지정할 수 있는 <code>--resume</code> 사용</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 세션을 지정해서 이어가기</div>
$ claude -p "어제 리뷰에서 2번 지적을 자세히 설명해 줘" --resume 5b3f2c1a-...
</div>
<h4>③ 함께 알아 둘 두 가지</h4>
<ul>
<li><code>--bare</code>: 훅, 스킬, 서브에이전트, 플러그인, MCP 서버, 자동 메모리, CLAUDE.md를 불러오지 않고 시작. 실행 환경마다 시작 상태가 같아지는 효과. 팀 규칙도 읽지 않음</li>
<li><code>claude setup-token</code>: CI와 스크립트에서 쓸 인증 토큰을 발급하는 명령</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>차례(turn)</b>: 에이전트가 요청을 한 번 보내고 답을 받는 단위</li>
<li><b>인증 토큰</b>: 사람 대신 프로그램이 로그인할 때 쓰는 긴 문자열</li>
</ul>
</div>`},

    {type:"concept", kind:"TOPIC · 주제 설명", h:"상황별 수단과 헷갈리기 쉬운 다섯 쌍",
   html:`<h4>① 상황별 수단</h4>
<table>
<tr><th>상황</th><th>수단</th></tr>
<tr><td>사람 없이 한 번 실행하고 종료</td><td><code>-p</code></td></tr>
<tr><td>결과를 다음 프로그램이 읽음</td><td><code>--output-format json</code></td></tr>
<tr><td>결과 양식 고정</td><td><code>--json-schema</code>. 결과는 <code>structured_output</code> 항목</td></tr>
<tr><td>진행 상황을 실시간으로 출력</td><td><code>--output-format stream-json</code></td></tr>
<tr><td>승인 요청에서 멈추면 안 됨</td><td><code>--permission-mode dontAsk</code></td></tr>
<tr><td>지정한 명령만 승인 없이 실행</td><td><code>--allowedTools</code></td></tr>
<tr><td>특정 호출만 차단</td><td><code>--disallowedTools</code></td></tr>
<tr><td>도구 목록 자체를 축소</td><td><code>--tools</code></td></tr>
<tr><td>반복과 비용 초과 방지</td><td><code>--max-turns</code>, <code>--max-budget-usd</code></td></tr>
<tr><td>직전 대화 이어가기</td><td><code>--continue</code></td></tr>
<tr><td>세션을 지정해서 이어가기</td><td><code>--resume</code></td></tr>
<tr><td>원래 대화를 두고 갈라서 진행</td><td><code>--fork-session</code></td></tr>
<tr><td>실행 환경마다 같은 시작 상태</td><td><code>--bare</code>. 팀 규칙도 읽지 않음</td></tr>
</table>
<h4>② 헷갈리기 쉬운 다섯 쌍</h4>
<table>
<tr><th>쌍</th><th>차이</th></tr>
<tr><td><code>-p</code>와 <code>--output-format json</code></td><td>실행 종료와 결과 형식. 서로 대신할 수 없음</td></tr>
<tr><td><code>--allowedTools</code>와 <code>--tools</code></td><td>승인 없이 실행할 항목과 쓸 수 있는 도구 목록</td></tr>
<tr><td><code>dontAsk</code>와 <code>bypassPermissions</code></td><td>미리 정한 항목만 실행과 전부 통과. 뒤쪽은 격리 환경 전용</td></tr>
<tr><td><code>--continue</code>와 <code>--resume</code></td><td>가장 최근 세션과 지정한 세션</td></tr>
<tr><td><code>--max-turns</code>와 <code>--max-budget-usd</code></td><td>횟수 제한과 금액 제한</td></tr>
</table>
<ul>
<li><code>-p</code> 실행 전용 플래그: <code>--max-turns</code>, <code>--max-budget-usd</code>, <code>--json-schema</code></li>
<li>플래그 전체 목록: <a href="https://code.claude.com/docs/ko/cli-reference" target="_blank" rel="noopener">Claude Code 공식 문서 'CLI 참조' 페이지</a> (한국어)</li>
</ul>`},

    {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: The nightly job that never reports",
     q:`A nightly dependency-audit job invokes Claude Code on a shared runner. Two failure shapes alternate: on some nights the job is still alive at 9am having produced nothing, and the runner log's last line is a request to approve a shell command; on other nights it finishes but bills $38, and the transcript shows the same three files re-read eleven times. The results are supposed to land in a dashboard that currently regex-scrapes the prose. Which revision addresses all three symptoms?`,
     opts:[
       {t:`Invoke it so the process completes and exits rather than waiting for a reply; start it in a mode that auto-denies anything outside a short pre-approved list so nothing can stall it; cap both the number of agentic turns and the dollars the run may spend; and emit schema-validated JSON so the dashboard reads fields instead of sentences.`, ok:true},
       {t:`Wrap the invocation so permission checks are skipped entirely — the stalls disappear immediately, and the runner is disposable anyway — then keep the prose output but tighten the dashboard's patterns.`},
       {t:`Cap the agentic turns and raise the CI job timeout so a slow night is not cut short; the approval stall and the scraping are separate concerns for a later sprint.`},
       {t:`Have the CI platform kill the process at a fixed wall-clock limit and parse whatever partial output landed on disk.`},
     ],
     hint:`증상이 세 가지임. 승인 대기 상태의 정지, 반복 루프로 인한 비용, 산문 출력 파싱임. 세 증상에 각각 대응하는 수단이 따로 있음. 하나만 해결하는 선택지를 제외할 것.`,
     explain:{
       good:`다섯 요건 중 ①②③④가 동시에 발생한 사례임. 실행을 종료시키고(비대화형(non-interactive) 실행), 승인 대기 자체를 없애고(미리 정한 것만 실행하는 모드와 좁은 허용 목록), 횟수와 금액에 상한을 걸고, 출력은 스키마로 구조를 고정함. 네 가지는 서로를 대신하지 못하므로 전부 필요함.`,
       wrongs:[
         `<b>B(권한 검사 전체 해제):</b> 정지는 사라지지만 공유 러너에서 어떤 명령이든 실행될 수 있는 상태가 됨. 공식 문서가 이 모드를 컨테이너·VM 안으로 한정한 이유임. 반복 루프와 파싱 문제는 해결되지 않음.`,
         `<b>C(타임아웃 연장):</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 작업이 중간에 잘리는 문제에는 맞는 처방이지만 지문의 증상은 종료되지 않고 계속 실행되는 것임. 시간을 늘리면 정지 상태가 길어질 뿐이고 승인 대기와 파싱 문제는 그대로 남음.`,
         `<b>D(외부에서 프로세스 종료):</b> 프로세스를 신호로 끊으면 진행 중이던 턴이 미완 상태로 남아 결과가 기록되지 않음. 대시보드가 받을 데이터가 없어짐.`,
       ]},
     principle:"요건마다 대응 수단이 따로 있다"},

    {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2: Three reviews, one terminal",
     q:`A release script fires three unattended review runs in parallel — one per open pull request — and stores each run's JSON payload. An hour later you need to (a) send a follow-up question into the run that reviewed PR #812 specifically, and (b) take that same conversation down two different remediation paths without losing the original for audit. Which handling is correct?`,
     opts:[
       {t:`Read the identifier the JSON payload recorded for each run, address PR #812's conversation by that identifier when sending the follow-up, and branch the experiment with the option that mints a fresh identifier on resume so the original transcript stays intact.`, ok:true},
       {t:`Continue the most recent conversation for the follow-up, then continue it twice more for the two remediation paths — each continuation naturally becomes its own thread.`},
       {t:`Paste a summary of PR #812's findings into a brand-new run, then repeat that for each remediation path so all three start from identical footing.`},
       {t:`Re-run the PR #812 review from scratch with the follow-up appended to the original prompt, since a review is cheap to reproduce and this avoids identifier bookkeeping.`},
     ],
     hint:`세 실행이 동시에 진행됨. "가장 최근"이라는 지정으로는 어느 세션인지 선택할 수 없음. 원본을 보존해야 한다는 조건이 하나 더 있음.`,
     explain:{
       good:`병렬 실행에서는 세션을 지정해 재개하는 방법만 성립함. 구조화된 출력(structured output)에 담겨 오는 세션 식별자를 저장해 두었다가 그 값으로 세션을 지정함. 갈래를 나눌 때 새 식별자를 생성하는 옵션을 사용하면 원본 대화가 그대로 남아 감사 자료로 사용할 수 있음.`,
       wrongs:[
         `<b>B(가장 최근 대화 이어가기):</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 실행이 하나뿐이면 맞는 방법임. 세 실행이 동시에 끝난 상황에서는 어느 것이 최근인지 통제할 수 없고, 이어가기를 반복해도 갈래가 나뉘지 않고 하나의 줄기에 계속 누적됨.`,
         `<b>C(요약 붙여넣기):</b> 리뷰가 실제로 무엇을 확인했는지는 요약에 담기지 않음. 이어가기 기능을 두고 맥락을 수작업으로 재구성하는 방식임.`,
         `<b>D(처음부터 재실행):</b> 감사 요구가 원본 보존인데 재실행은 원본을 대체할 뿐 보존하지 않음. 비용도 세 배가 됨.`,
       ]},
     principle:"병렬 실행은 세션 지정 재개, 갈래를 나눌 때는 새 식별자"},

    {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 3: The read-only reviewer",
     q:`A compliance rule says the automated review step must never alter the repository — not a file, not a branch, not a tag. Your team debates four measures. Which is LEAST able to deliver that guarantee?`,
     opts:[
       {t:`Opening the review prompt with a firm instruction that the assistant must not modify anything under any circumstances.`, ok:true},
       {t:`Narrowing the set of built-in tools the session is given so that editing and writing tools are not among them.`},
       {t:`Starting the session in the mode that denies anything outside a pre-approved list, and pre-approving only read and diff commands.`},
       {t:`Committing deny rules for write-shaped shell commands into the repository's settings file, which apply in every mode.`},
     ],
     hint:`부정형 문항임. 요구를 가장 보장하지 못하는 선택지를 고를 것. 네 선택지 중 셋은 실행 계층이 호출을 거부하는 방식이고, 하나는 모델이 지시를 따르기를 기대하는 방식임.`,
     explain:{
       good:`프롬프트 문장은 <strong>확률적 유도</strong>이고 나머지 셋은 <strong>실행 계층의 거부</strong>임. 공식 문서도 "권한 규칙은 모델이 아니라 Claude Code가 집행하며, 프롬프트나 CLAUDE.md의 지시는 무엇이 허용되는지를 바꾸지 않는다"고 명시함. 규제 요구에 보장이라는 조건이 있으면 지시문에 의존하는 선택지는 정답이 될 수 없음.`,
       wrongs:[
         `<b>B(도구 목록 좁히기):</b> 제공되지 않은 도구는 호출될 수 없음. 유효한 보장임.`,
         `<b>C(미리 정한 것만 실행):</b> 허용 목록 밖은 자동 거부되고 승인 대기도 발생하지 않음. CI 환경에 맞는 유효한 보장임.`,
         `<b>D(커밋된 거부 규칙):</b> 거부 규칙은 모든 모드에서 적용되므로 가장 강한 계층임.`,
       ]},
     principle:"원칙 ①: 보장이 필요하면 지시가 아니라 설정으로"},
  ]};

  var testIdx = C.p3.lessons.findIndex(function(l){ return l.id === "p3test"; });
  if(testIdx < 0) testIdx = C.p3.lessons.length;
  if(!C.p3.lessons.some(function(l){ return l.id === "p3c7"; })) C.p3.lessons.splice(testIdx, 0, p3c7);

  /* ============================================================
     (2) 기존 챕터에 선택 비교형 연습 문제 추가
     ============================================================ */
  function push(id, step){
    var L = C.p3.lessons.find(function(l){ return l.id === id; });
    if(L && L.steps) L.steps.push(step);
  }

  /* --- p3c1 · 설정 메커니즘 선택 --- */
  push("p3c1", {type:"quiz", kind:"PRACTICE · 선택 비교형", h:"Practice 3: Same repo, three different asks",
    q:`A fintech repo with 14 contributors brings three asks to you in one week. (R1) Money must be handled with the decimal type, never floats — this should shape generated code in every session, for everyone. (R2) No agent session may ever run the infrastructure apply command; a written warning already sits in the guidance document and an apply still happened in March. (R3) A 30-page reconciliation runbook should inform work only while someone is editing files under services/ledger/, and it currently costs roughly 9,000 tokens on every unrelated session. Which allocation fits all three?`,
    opts:[
      {t:`R1 into the repository's always-loaded memory file; R2 into a committed deny rule in the project settings, because the client refuses the call regardless of what the model intends; R3 into a rule file whose frontmatter names the matching paths, so the runbook enters context only when those files are open.`, ok:true},
      {t:`All three into the repository's memory file, with R2 written as an explicit prohibition in bold and R3 placed in a clearly labelled section the model can skip when irrelevant — one always-loaded source of truth is easier for 14 people to keep current than three mechanisms.`},
      {t:`R1 and R3 into the repository's memory file; R2 into a skill whose frontmatter restricts the tools it may call, so the restriction travels with the workflow that touches infrastructure.`},
      {t:`R1 into every contributor's personal memory file so it applies across all their projects; R2 into a pipeline check that fails the build when an apply is detected; R3 into a memory file placed inside services/ledger/.`},
    ],
    hint:`세 요구를 같은 질문 세 개로 나눠 볼 것. 언제 로드되는가, 강제력이 있는가, 적용 범위가 어디까지인가. R2에는 문서로 이미 경고했는데도 사고가 발생했다는 이력이 있음.`,
    explain:{
      good:`성격이 다른 세 요구임. R1은 상시 적용, 전원 대상, 권고 성격이므로 저장소 메모리 파일에 둠. R2는 <strong>권고로 이미 실패했고 차단이 필요</strong>하므로 커밋되는 거부 규칙(또는 PreToolUse 훅)에 둠. 거부 규칙은 모델의 의도와 무관하게 클라이언트가 호출을 차단하며 모든 권한 모드에서 적용됨. R3은 특정 파일을 편집할 때만 필요하고 상시 로드 비용이 측정돼 있으므로 경로 조건이 붙은 규칙 파일에 둠. 하나의 수단으로 셋을 모두 처리하려 하면 그중 하나가 요구를 충족하지 못함.`,
      wrongs:[
        `<b>B(전부 메모리 파일):</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 유지보수 관점의 설명은 옳고 R1에는 정확히 맞음. 그러나 R2는 문장으로 이미 실패한 이력이 지문에 있고, R3의 9,000토큰은 건너뛰라는 표시를 붙여도 줄지 않음. 로드되는 시점에 이미 소비된 비용이기 때문임.`,
        `<b>C(스킬의 도구 제한으로 R2 처리):</b> 그 제한은 스킬이 실행되는 동안에만 적용됨. 일반 세션에서 같은 명령을 호출하는 3월 사고의 경로는 그대로 열려 있음.`,
        `<b>D(개인 파일과 사후 검사):</b> R1이 개인 파일에 있으면 저장소에 포함되지 않아 새 기여자에게 도달하지 못함. R2의 파이프라인 검사는 이미 실행된 뒤에 알려주는 방식임. 되돌릴 수 없는 작업에는 사후 탐지가 해결책이 되지 못함.`,
      ]},
    principle:"판단 기준 세 가지: 로드 시점 · 강제력 · 범위"});

  /* --- p3c2 · 스킬/커맨드를 다른 수단과 비교 --- */
  push("p3c2", {type:"quiz", kind:"PRACTICE · 선택 비교형", h:"Practice 3: Where does the scaffolder live",
    q:`Your platform team runs a "stand up a new microservice" procedure about twice a month: nine steps, four parameters, produces roughly 40 files in a directory that does not exist yet, and prints several thousand lines of template inventory that nobody wants in their working conversation. Developers routinely forget to supply the target service name. A teammate proposes a rule file scoped with paths: ["services/**"] so the procedure loads automatically whenever anyone works in the services tree. What is the correct mechanism, and what breaks the proposal?`,
    opts:[
      {t:`Package it as a version-controlled skill that runs in a forked context and declares its expected arguments; the proposal fails on timing — at the moment the procedure is needed the target directory has not been created, so no path pattern has anything to match, and on the sessions where those files do exist it would load nine steps of noise into ordinary bug fixes.`, ok:true},
      {t:`Keep the path-scoped rule but narrow the pattern to services/*/ so it fires closer to the relevant work, and add the nine steps to the repository memory file as a fallback for the first run in a new service.`},
      {t:`Put the nine steps in the repository memory file so every session already knows the procedure, and add the parameter list as a comment at the top so nobody forgets the service name.`},
      {t:`Package it as a skill but leave it in your personal scope, since twice a month across the team is low traffic and personal scope avoids review overhead on the team's shared folder.`},
    ],
    hint:`조건부 로딩은 매칭되는 파일을 편집할 때 작동함. 이 절차가 필요한 시점에 그 파일들이 존재하는지 확인할 것. 요구가 세 가지라는 점도 확인할 것. 분량이 큰 출력, 필수 인자, 필요할 때만 호출임.`,
    explain:{
      good:`요구 세 가지가 전부 스킬을 가리킴. 필요할 때만 호출, 출력 격리, 인자 요구임. 경로 조건을 쓰자는 제안이 성립하지 않는 이유는 시점임. 조건부 규칙(conditional rules)은 <strong>이미 존재하는 파일을 편집할 때</strong> 작동하는데, 스캐폴딩은 그 파일들을 <strong>만들기 전에</strong> 필요함. 반대로 파일이 생긴 뒤에는 무관한 버그 수정 세션에까지 로드됨.`,
      wrongs:[
        `<b>B(패턴을 좁히고 메모리 파일에 백업):</b> 패턴을 어떻게 좁혀도 존재하지 않는 디렉토리는 매칭되지 않음. 백업본까지 두면 같은 절차가 두 곳에 존재해 갱신 누락이 생김.`,
        `<b>C(전부 메모리 파일):</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 상시 로드이므로 절차를 잊는 문제는 확실히 막음. 대신 한 달에 두 번 쓰는 아홉 단계를 전원의 모든 세션이 로드하게 되고, 주석으로 적은 파라미터 목록은 값을 요구하는 장치가 아니라 설명 문구에 그침.`,
        `<b>D(개인 스코프):</b> 팀 전체가 쓰는 절차이므로 저장소에 포함돼야 함. 개인 폴더에 두면 그 사람이 부재중일 때 다른 사람이 사용할 수 없음.`,
      ]},
    principle:"조건부 로딩은 편집할 파일이 있을 때만 성립. 없으면 호출형으로"});

  /* --- p3c3 · 글롭 paths를 다른 수단과 비교 --- */
  push("p3c3", {type:"quiz", kind:"PRACTICE · 선택 비교형", h:"Practice 3: Four conventions, one repo",
    q:`A 2,300-file repository needs homes for four things. (i) Migration conventions — migration files end in .sql and are scattered across six directories. (ii) A PCI checklist that applies while editing anything inside billing/, a single 90-file folder. (iii) A naming convention for a feature-flag file that does not exist yet and will be created by hand. (iv) A hard requirement that the vendored/ tree is never edited, after a contractor overwrote it twice last month. Which mapping is right?`,
    opts:[
      {t:`(i) a rule file whose pattern matches the suffix at any depth; (ii) either a rule file or a memory file inside that folder, since the boundary is the folder itself; (iii) neither of those, because nothing exists yet to trigger a match — it belongs where it is either always present or explicitly invoked; (iv) a committed deny rule, since a convention document cannot refuse a write.`, ok:true},
      {t:`All four as rule files with path patterns — path scoping is the general-purpose conditional loader, so (iv) simply gets a pattern covering vendored/ and (iii) gets one covering the directory the flag file will eventually live in.`},
      {t:`(i) and (ii) as rule files with path patterns; (iii) and (iv) as sections of the root memory file, since both need to hold repository-wide rather than in one folder.`},
      {t:`(i), (ii), and (iii) in the root memory file to keep one source of truth; (iv) as a pipeline check that fails any build whose diff touches vendored/.`},
    ],
    hint:`네 요구를 두 가지 질문으로 구분할 것. ① 지금 편집 중인 파일이 있어야만 작동하는 요구인가. ② 위반 시 차단해야 하는 요구인가, 알려 주면 되는 요구인가.`,
    explain:{
      good:`경로 조건은 <strong>편집 대상 파일</strong>이라는 조건에 의존함. (i)은 파일이 흩어져 있어도 확장자 패턴 하나로 지정되므로 적합하고, (ii)는 폴더 경계가 기준이므로 두 수단 모두 성립함. (iii)은 조건이 될 파일이 아직 없으므로 조건부 로딩 자체가 성립하지 않고, (iv)는 로딩이 아니라 차단의 문제이므로 권한 계층에서 처리해야 함. 네 요구를 한 수단으로 묶으면 (iii)과 (iv)에서 요구가 충족되지 않음.`,
      wrongs:[
        `<b>B(전부 경로 규칙으로):</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 조건부 로더라는 설명은 맞음. 그러나 (iii)은 매칭될 파일이 없고, (iv)는 규칙 파일이 컨텍스트에 문서를 넣을 뿐 쓰기를 막지 못함. 두 번 덮어쓴 이력이 그 근거임.`,
        `<b>C((iii)(iv)를 루트 메모리 파일로):</b> (iii)은 성립하지만 (iv)가 해결되지 않음. 문서에 적은 금지는 이미 한 번 실패한 방식임.`,
        `<b>D(사후 파이프라인 검사):</b> 빌드가 실패해서 알게 되는 시점은 이미 덮어쓴 뒤임. 그리고 (i)~(iii)을 전부 루트에 두면 이 챕터가 해결하려던 상시 로드 문제로 돌아감.`,
      ]},
    principle:"두 질문: 조건이 되는 파일이 있는가 · 차단해야 하는가"});

  /* --- p3c4 · 리뷰 아키텍처 선택 --- */
  push("p3c4", {type:"quiz", kind:"PRACTICE · 선택 비교형", h:"Practice 3: Where the approval goes",
    q:`Postmortem action item: change how retry backoff works in the payment gateway client. Two designs are defensible (jitter inside the client versus a policy at the queue layer), the change spans 9 files across two services, and the payments group requires a signed-off approach on record before any code lands — the last change that skipped that step produced duplicate charges for 1,400 customers. Which execution shape fits?`,
    opts:[
      {t:`Investigate and settle the approach with no edits taking place, hand that written approach to the payments group as the artefact they sign, and only then carry out the agreed design in a normal working session.`, ok:true},
      {t:`Build the jitter design straight away and open a pull request; the payments group signs off during code review, which is where approvals belong and where they can see the real change rather than a description.`},
      {t:`Have both designs implemented on separate branches so the payments group can compare working code, then discard the losing branch.`},
      {t:`Stay in the non-editing planning mode from start to finish so that every step remains reviewable, and let the payments group approve the accumulated plan at the end.`},
    ],
    hint:`승인이 <b>어느 두 단계 사이</b>에 들어가야 하는지가 판단 기준임. "코드가 반영되기 전에 접근 방식 승인이 기록에 남아야 한다"는 조건을 그대로 적용할 것.`,
    explain:{
      good:`유효한 설계가 둘이고 9개 파일이 관련되므로 조사와 설계를 먼저 분리하는 것이 확정임. 여기에 감사 요구가 더해져 <strong>설계와 편집 사이에 사람의 승인 단계</strong>가 들어가는 3단 구조가 됨. 승인이 끝난 뒤에는 방향이 하나로 정해졌으므로 일반적인 작업 세션에서 구현하면 됨.`,
      wrongs:[
        `<b>B(PR 리뷰에서 승인):</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 대부분의 팀에서 PR이 승인의 자리인 것은 맞음. 그러나 지문의 요구는 코드가 반영되기 전이고, 중복 청구 사고가 정확히 그 순서를 건너뛰어 발생했음. 승인 단계를 뒤로 미루면 요구 자체를 위반함.`,
        `<b>C(양쪽 다 구현):</b> 되돌리기 어려운 결제 경로에서 두 벌을 만드는 것은 위험과 비용을 두 배로 지불하면서 승인 시점은 여전히 편집 뒤로 미루는 선택임.`,
        `<b>D(끝까지 계획 모드 유지):</b> 그 모드는 편집을 수행하지 않음. 계획만 누적되고 액션 아이템이 완료되지 않음. 계획은 승인까지, 구현은 실행 모드로 넘기는 것이 맞음.`,
      ]},
    principle:"승인 단계는 설계와 편집 사이"});

  /* --- p3c5 · 반복 개선 워크플로 --- */
  push("p3c5", {type:"quiz", kind:"PRACTICE · 선택 비교형", h:"Practice 3: Round four on the normaliser",
    q:`You are three rounds into an address normaliser. Round 1: you described the output shape in two paragraphs and got a different key order on each run. Round 2: you said "make it more robust" and it refactored an unrelated geocoding module. Round 3: you reported three failures one at a time — an empty string, the literal "N/A", and a null — and each fix reintroduced one of the others; all three run through the same coercion helper. What should round 4 consist of?`,
    opts:[
      {t:`Hand over two or three filled-in before-and-after pairs so the shape stops being inferred from sentences, replace "more robust" with the exact input that failed plus what came back and what should have, and deliver the three missing-value cases as one package because they meet inside the same helper.`, ok:true},
      {t:`Open a clean session and write a much fuller written specification of the output shape and the robustness requirements, so none of the confusion from rounds 1 to 3 carries over.`},
      {t:`Keep the three missing-value cases separate but add a regression test after each one, so a reintroduced failure is caught the moment it comes back.`},
      {t:`Ask for three alternative implementations of the normaliser and keep whichever passes the most of your cases.`},
    ],
    hint:`세 라운드가 각각 다른 실패임. 출력 형식이 일정하지 않았던 것, 피드백이 막연했던 것, 서로 얽힌 문제를 따로 처리한 것임. 라운드 4는 세 실패를 각각 해결해야 함.`,
    explain:{
      good:`세 처방을 한 라운드에 함께 적용하는 문제임. 형식이 매번 달라지면 산문 설명 대신 입출력 예시 쌍을 제시하고, "더 견고하게" 같은 막연한 지시 대신 실패한 입력과 기대 출력을 명시하고, 같은 함수를 통과하는 세 케이스는 한 번에 함께 처리하도록 묶음. 셋 중 하나만 적용하면 이번 라운드도 일부만 개선되고 끝남.`,
      wrongs:[
        `<b>B(새 세션과 더 긴 명세):</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 오염된 맥락을 버리는 것은 종종 유효한 방법임. 그러나 라운드 1의 실패 원인이 <strong>산문 명세 자체</strong>였음. 같은 방식을 더 길게 쓰는 것은 같은 실패를 키우는 것임.`,
        `<b>C(순차 처리와 회귀 테스트):</b> 테스트는 다시 나타난 실패를 알려줄 뿐임. 세 케이스가 한 함수에서 만난다는 사실은 여전히 함께 조율되지 않은 채 남음.`,
        `<b>D(대안 구현 세 벌):</b> 무엇이 올바른 출력인지 아직 고정되지 않은 상태라 비교 기준이 없음. 형식을 먼저 확정하는 것이 순서임.`,
      ]},
    principle:"형태는 예시로, 피드백은 지목으로, 얽힌 문제는 한 묶음으로"});

  /* --- p3c6 · 리뷰 설정 종합 --- */
  push("p3c6", {type:"quiz", kind:"PRACTICE · 선택 비교형", h:"Practice 3: Rebuilding the review step",
    q:`Your pull-request review step currently runs the assistant on a shared runner with permission checks switched off. Three complaints arrived this sprint: reviews ignore the error-handling and logging standards that are documented in the repository; the metrics dashboard that ingests findings breaks about weekly because it pattern-matches the prose; and last Tuesday the step pushed a branch. Which revision resolves all three?`,
    opts:[
      {t:`Leave the documented standards where an ordinary session already picks them up so the unattended run reads them too; drop the checks-off setting in favour of a mode that denies anything outside a pre-approved list, allowing only read and diff commands; and have the step return schema-validated structured output so the dashboard consumes fields rather than sentences.`, ok:true},
      {t:`Add the flag that skips discovery of hooks, plugins and project context so every runner starts from an identical state, add a deny rule for pushes, and keep the prose output but freeze the review prompt's wording so the dashboard's patterns stop drifting.`},
      {t:`Add a deny rule for the push command and raise the turn limit so reviews go deeper, then rewrite the dashboard's patterns to be stricter about which sentences count as findings.`},
      {t:`Paste the standards into the review prompt itself, instruct the assistant to answer with JSON and nothing else, and put a dollar cap on the step so an expensive run cannot repeat.`},
    ],
    hint:`불만이 셋이고 대응 수단도 셋임. 표준을 읽게 하는 것, 수행 가능한 작업을 좁히는 것, 출력 구조를 고정하는 것임. 셋 중 하나가 빠진 선택지를 제외할 것.`,
    explain:{
      good:`세 가지를 동시에 수정해야 함. 표준은 저장소에 문서로 두면 비대화형 실행도 일반 세션과 같은 프로젝트 맥락을 읽음. 권한은 검사를 끄는 대신 미리 정한 것만 실행되는 모드로 바꾸고 허용 목록을 읽기와 차이 확인으로 좁히면 지난 화요일의 푸시 경로가 닫힘. 출력은 스키마로 검증된 구조를 반환하면 대시보드가 문장을 해석할 필요가 없어짐.`,
      wrongs:[
        `<b>B(탐색을 건너뛰는 플래그):</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 러너마다 결과를 동일하게 만든다는 설명은 정확함. 그러나 그 플래그는 저장소의 프로젝트 맥락까지 읽지 않으므로 <strong>첫 번째 불만인 표준 미반영을 오히려 확정</strong>시킴. 프롬프트 문구를 고정한다고 자연어 출력이 안정된 형식 계약이 되지도 않음.`,
        `<b>C(푸시만 차단하고 패턴 강화):</b> 푸시 하나는 차단되지만 권한 검사가 꺼진 상태는 그대로이므로 다음에는 다른 쓰기 작업이 실행됨. 턴 상한을 올리는 것은 세 불만 중 어느 것과도 관계없고, 패턴 강화는 매주 깨지던 방식의 연장임.`,
        `<b>D(프롬프트에 전부 포함):</b> 표준을 붙여 넣으면 저장소 문서와 프롬프트 두 벌이 생겨 내용이 갈라지고, "JSON만 출력하라"는 지시는 형식 계약이 아니라 요청에 그침. 권한 문제는 해결되지 않음.`,
      ]},
    principle:"표준 로드 · 권한 좁히기 · 출력 계약은 서로 다른 수단"});

  /* ============================================================
     (3) 확장 문제 풀: D3 12문항
     ============================================================ */
  var E = window.CCAF_MT_EXTRA = window.CCAF_MT_EXTRA || {};
  var add = function(ts, q){ (E[ts] = E[ts] || []).push(q); };

  /* --- 3.1 ① 설정 메커니즘 선택 (비교형) --- */
  add("3.1", {ts:"3.1", lvl:"실전", scenario:"s2",
    q:`An audit of one repository turns up three unrelated complaints. (1) Generated Go code wraps errors with the standard library in some files and with a helper the team deprecated in 2024 in others. (2) An agent session dropped a staging schema in March even though the contributor guide says never to run destructive database commands. (3) A 30-page incident playbook is relevant only while someone edits files under ops/runbooks/, yet it is loaded on all 260 sessions logged last month. Which allocation matches each complaint to a mechanism that can actually deliver it?`,
    opts:[
      {t:`(1) the repository's always-loaded memory file, since it is advisory shaping of generated code; (2) a deny rule committed with the project settings, because a sentence in a guide has already failed once and only the permission layer refuses a call outright; (3) a rule file carrying path patterns, so the playbook enters context only on sessions that touch those files.`, ok:true},
      {t:`All three in the repository's memory file — one always-loaded source of truth is far easier for contributors to keep current, and (2) simply needs to be stated more forcefully than it currently is.`},
      {t:`(1) and (3) in the repository's memory file; (2) handled by a skill whose frontmatter limits the tools available while the database workflow runs.`},
      {t:`(1) in each contributor's personal memory file so it follows them across repositories; (2) in a pipeline check that fails the build when a destructive command appears in the transcript; (3) in a memory file placed inside ops/runbooks/.`},
    ],
    explain:{
      good:`세 요구의 성격이 전부 다름. (1)은 상시 적용이고 권고 성격이므로 저장소 메모리 파일에 둠. (2)는 문서로 이미 실패했으므로 차단 계층인 커밋되는 거부 규칙(또는 PreToolUse 훅)에 둠. 거부 규칙은 모든 권한 모드에서 적용되고 모델의 의도와 무관하게 호출을 차단함. (3)은 조건이 명확하고 상시 로드 비용이 260세션으로 측정됐으므로 경로 조건이 붙은 규칙 파일에 둠. 하나의 수단으로 셋을 처리하려는 선택지가 오답 유도임.`,
      wrongs:[
        `<b>B:</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 유지보수 논리는 맞고 (1)에는 정확히 맞음. 그러나 (2)는 더 강하게 쓰는 방식이 이미 실패한 경로이고, (3)의 260세션 비용은 문서를 어떻게 쓰든 줄지 않음.`,
        `<b>C:</b> 스킬의 도구 제한은 그 스킬이 실행되는 동안에만 적용됨. 3월 사고처럼 일반 세션에서 호출하는 경로는 그대로 열려 있음.`,
        `<b>D:</b> 개인 파일은 저장소에 포함되지 않아 새 기여자에게 도달하지 못하고, 사후 파이프라인 검사는 스키마가 이미 삭제된 뒤에 알려주는 방식임.`,
      ]},
    principle:"판단 기준 세 가지: 로드 시점 · 강제력 · 범위"});

  /* --- 3.1 ② 부정형 --- */
  add("3.1", {ts:"3.1", lvl:"기초", scenario:"s2",
    q:`Nine of your 14 engineers joined in the last two quarters and two contractors rotate off every month. A new module-naming convention has to reach every current and future contributor with no per-person setup. Every option below can deliver that EXCEPT one. Which is the exception?`,
    opts:[
      {t:`Have each engineer paste the convention into their own personal memory file during onboarding, and post an update in the team channel whenever it changes.`, ok:true},
      {t:`Commit it to the memory file at the repository root.`},
      {t:`Commit it as a rule file with no path filter, so it is in context for every session in that repository.`},
      {t:`Commit it to the repository memory file and have the review checklist reference the same file.`},
    ],
    explain:{
      good:`부정형 문항임. 요구를 충족하지 못하는 선택지를 고르는 문제임. 판별 질문은 하나로 충분함. <strong>저장소에 커밋되는가.</strong> 커밋되는 파일은 복제와 갱신만으로 전원에게 도달하고 신규 입사자도 자동으로 받게 됨. 개인 파일과 공지를 쓰는 방식은 사람마다 수동 작업이 필요하고, 공지 이후에 합류한 사람은 그 공지를 받지 못함. 지문이 인원 변동을 숫자로 제시한 이유임.`,
      wrongs:[
        `<b>B:</b> 저장소 루트 메모리 파일은 복제 시 함께 따라옴. 요구를 정확히 충족함.`,
        `<b>C:</b> 경로 필터가 없는 규칙 파일은 상시 로드되고, 커밋되므로 전원에게 도달함.`,
        `<b>D:</b> 커밋된 파일 하나를 사람과 자동 검사가 함께 참조하는 형태임. 요구를 충족함.`,
      ]},
    principle:"부정형: 도달 여부는 커밋되는가로 판별"});

  /* --- 3.2 ① 복수응답 --- */
  add("3.2", {ts:"3.2", lvl:"실전", scenario:"s2", multi:2,
    q:`A "provision a new tenant" workflow runs about twice a month. It prints several thousand lines of inventory that developers do not want in their working conversation, and it must never touch anything outside the new tenant's directory — a run in June deleted a config file belonging to a neighbouring tenant. Which TWO changes address those two problems at the level they occur? (Select TWO.)`,
    opts:[
      {t:`Run it as a skill whose frontmatter forks the context, so only a summary returns to the main conversation.`, ok:true},
      {t:`Declare in the skill's frontmatter which tools it may call, so the destructive call is not available to be made.`, ok:true},
      {t:`Add a line to the skill's instructions telling it to stay inside the new tenant's directory and never remove files elsewhere.`},
      {t:`Move the workflow into the repository memory file so every session has it loaded and follows it.`},
      {t:`Give the skill a path filter matching the tenant directory so it only loads while files there are open.`},
    ],
    explain:{
      good:`문제가 둘이고 대응 수단도 둘임. 분량이 큰 출력은 <strong>컨텍스트 격리</strong>로 본 대화에서 분리하고, 6월 사고는 <strong>호출 가능한 도구 목록을 좁혀</strong> 그 호출 자체가 불가능하게 만드는 것이 정답임. 두 설정은 같은 frontmatter에 있지만 역할이 달라 서로를 대신하지 못함.`,
      wrongs:[
        `<b>C:</b> 지시문을 추가하는 방식임. 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 대부분의 경우 실제로 잘 지켜짐. 그러나 이미 파일이 삭제된 사고가 있었으므로 필요한 것은 잘 지켜지는 것이 아니라 불가능하게 만드는 것임.`,
        `<b>D:</b> 메모리 파일로 이동하는 방식임. 한 달에 두 번 쓰는 절차를 전원의 모든 세션에 상시 로드하게 되고, 출력 격리와 권한 제한 중 어느 것도 얻지 못함.`,
        `<b>E:</b> 경로 필터를 거는 방식임. 새 테넌트 디렉토리는 이 절차가 <strong>만들기 전</strong>이므로 매칭될 파일이 없음. 조건 자체가 성립하지 않음.`,
      ]},
    principle:"격리와 권한은 서로 다른 설정. 각각의 필드로 지정"});

  /* --- 3.2 ② 배치 비교형 --- */
  add("3.2", {ts:"3.2", lvl:"실전", scenario:"s4",
    q:`Three requests land in one week at a 20-person tooling team. (a) A one-line prompt everyone types before opening a pull request: "summarise my staged changes as a description." (b) A nine-step service-scaffolding procedure that reads a template, needs four parameters, and produces about 40 files — the target service name is forgotten on roughly half of runs. (c) A requirement that any generated Python uses the team's logging wrapper, on every turn, whether or not anyone invoked anything. Which allocation fits?`,
    opts:[
      {t:`(a) a short saved prompt in the project's shared command folder; (b) a project skill that declares the arguments it expects so a missing service name is requested rather than guessed; (c) the repository memory file, since nothing is invoked and it has to hold on every turn.`, ok:true},
      {t:`All three as project skills — skills are version controlled, accept arguments, and can be invoked by name, so a single mechanism covers every case with the least explaining to 20 people.`},
      {t:`(a) and (c) in the repository memory file; (b) as a rule file scoped to the path where the new service will eventually live.`},
      {t:`(a) as a personal command since it is a one-liner, (b) as a project skill, (c) as a rule file filtered to Python files so it does not waste context on other work.`},
    ],
    explain:{
      good:`두 가지 기준으로 나뉨. 누구에게 적용되는가(팀/개인)와 언제 로드되는가(호출 시/항상)임. (a)는 짧고 팀 전원이 필요할 때 입력하는 것이므로 공유 커맨드임. (b)는 단계가 여럿이고 파라미터를 요구하므로 인자를 선언하는 스킬임. (c)의 "on every turn, whether or not anyone invoked anything"이 결정적 단서임. 호출형 수단은 이 조건을 충족하지 못함.`,
      wrongs:[
        `<b>B:</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 스킬의 장점을 나열한 내용은 전부 사실임. 그러나 (c)는 호출되지 않은 턴에도 적용돼야 하므로 호출형 포장 자체가 요구와 충돌함.`,
        `<b>C:</b> (b)의 서비스 디렉토리는 이 절차가 만들기 전이므로 매칭될 파일이 없음. 조건부 규칙이 작동할 조건이 성립하지 않음.`,
        `<b>D:</b> (a)를 개인 스코프에 두면 팀 전체가 사용할 수 없고, (c)를 파이썬 파일 편집 조건에 걸면 편집이 없는 턴에서 "어떤 턴에도 적용"이라는 요구가 깨짐.`,
      ]},
    principle:"누구에게 · 언제. 두 기준으로 배치"});

  /* --- 3.3 ① 네 요구 매핑 --- */
  add("3.3", {ts:"3.3", lvl:"실전", scenario:"s2",
    q:`A 2,300-file repository needs homes for four things: (i) migration conventions, where migration files end in .sql and sit in six different directories; (ii) a PCI checklist that applies while editing anything inside billing/, one folder of 90 files; (iii) a naming convention for a feature-flag file that does not exist yet and will be created by hand next sprint; (iv) a hard requirement that the vendored/ tree is never edited, after it was overwritten twice last month. Which mapping is right?`,
    opts:[
      {t:`(i) a rule file whose pattern matches that suffix at any depth; (ii) a rule file or a folder-local memory file, since the boundary is a folder; (iii) neither, because nothing exists yet to trigger a match — it goes where it is always present or explicitly invoked; (iv) a committed deny rule, since a convention document cannot refuse a write.`, ok:true},
      {t:`All four as rule files with path patterns — path scoping is the general conditional loader, so (iv) gets a pattern covering vendored/ and (iii) gets one covering wherever the flag file will end up.`},
      {t:`(i) and (ii) as path-scoped rule files; (iii) and (iv) as sections in the root memory file, since neither is tied to a single folder.`},
      {t:`(i) through (iii) in the root memory file to keep one source of truth; (iv) as a pipeline check that fails any build whose diff touches vendored/.`},
    ],
    explain:{
      good:`경로 조건은 <strong>지금 편집 중인 파일</strong>이라는 조건에 의존함. (i)은 확장자 패턴 하나로 흩어진 파일을 지정하고, (ii)는 폴더 경계가 기준이므로 두 수단 모두 성립함. (iii)은 조건이 될 파일이 아직 없어 조건부 로딩이 성립하지 않고, (iv)는 로딩이 아니라 차단의 문제이므로 권한 계층에서 처리해야 함.`,
      wrongs:[
        `<b>B:</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 조건부 로더라는 설명은 맞음. 그러나 (iii)은 매칭 대상이 없고, (iv)는 규칙 파일이 컨텍스트에 문서를 넣을 뿐 쓰기를 막지 못함.`,
        `<b>C:</b> (iv)가 해결되지 않음. 문서로 적은 금지는 이미 실패한 방식임.`,
        `<b>D:</b> 빌드가 실패해서 알게 되는 시점은 이미 덮어쓴 뒤이고, (i)~(iii)을 전부 루트에 두면 상시 로드 문제로 돌아감.`,
      ]},
    principle:"두 질문: 조건이 되는 파일이 있는가 · 차단해야 하는가"});

  /* --- 3.3 ② 부정형 --- */
  add("3.3", {ts:"3.3", lvl:"실전", scenario:"s2",
    q:`A path-scoped rule file is the right instrument for every requirement below EXCEPT one. Which one does it fail?`,
    opts:[
      {t:`Preventing any write to the generated/ directory, which a build step owns and which a contractor overwrote twice last month.`, ok:true},
      {t:`Loading accessibility conventions while editing any .tsx file, wherever in the tree it sits.`},
      {t:`Loading Terraform naming rules while editing anything under infra/.`},
      {t:`Loading fixture conventions while editing files ending in .spec.ts, which sit beside the code they test.`},
    ],
    explain:{
      good:`부정형 문항임. 규칙 파일이 하는 일은 <strong>조건이 맞을 때 문서를 컨텍스트에 넣는 것</strong>까지임. 쓰기를 거부하는 것은 권한 계층(커밋되는 거부 규칙이나 PreToolUse 훅)의 역할임. 나머지 셋은 전부 특정 파일을 편집할 때 이 문서를 읽게 하라는 같은 형태이므로 규칙 파일에 적합함.`,
      wrongs:[
        `<b>B:</b> 확장자 기준으로 흩어진 파일을 지정하는 경우임. 경로 패턴의 대표 용례임.`,
        `<b>C:</b> 폴더 경계가 기준인 경우임. 패턴 하나로 지정됨.`,
        `<b>D:</b> 소스 옆에 흩어진 테스트 파일임. 폴더로는 묶이지 않고 패턴으로만 지정되는 전형적인 경우임.`,
      ]},
    principle:"부정형: 규칙 파일은 읽히게 하는 것까지, 차단은 권한 계층"});

  /* --- 3.4 ① 리뷰 아키텍처 --- */
  add("3.4", {ts:"3.4", lvl:"실전", scenario:"s2",
    q:`An action item from a duplicate-charge postmortem: change retry backoff in the payment gateway client. Two designs are defensible (jitter in the client versus a policy at the queue layer), the change spans 9 files across two services, and the payments group requires a signed-off approach on record before any code lands — skipping that step is what produced 1,400 duplicate charges. Which execution shape fits?`,
    opts:[
      {t:`Settle the approach first with no edits happening, put that written approach in front of the payments group as the thing they sign, then carry out the agreed design in an ordinary working session.`, ok:true},
      {t:`Implement the jitter design now and open a pull request; the payments group signs off at code review, where they can judge the real change instead of a description.`},
      {t:`Implement both designs on separate branches so the payments group compares working code, then discard the losing branch.`},
      {t:`Stay in the non-editing planning mode for the whole task so every step stays reviewable, and collect the approval at the end.`},
    ],
    explain:{
      good:`유효한 설계가 둘이고 9개 파일이 관련되므로 조사와 설계를 먼저 분리하는 것이 확정임. 감사 요구가 <strong>설계와 편집 사이</strong>에 사람의 승인 단계를 하나 더 추가함. 승인 뒤에는 방향이 하나로 정해졌으므로 일반적인 실행으로 넘기면 됨.`,
      wrongs:[
        `<b>B:</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 대부분의 팀에서 PR이 승인의 자리인 것은 맞음. 그러나 요구는 코드가 반영되기 전이고, 사고가 정확히 그 순서를 건너뛰어 발생했음.`,
        `<b>C:</b> 되돌리기 어려운 결제 경로에서 두 벌을 만드는 것은 위험과 비용을 두 배로 지불하면서 승인 시점은 여전히 편집 뒤에 두는 선택임.`,
        `<b>D:</b> 계획 모드는 편집을 수행하지 않음. 끝까지 계획만 하면 액션 아이템이 완료되지 않음.`,
      ]},
    principle:"승인 단계는 설계와 편집 사이"});

  /* --- 3.4 ② 코드베이스 탐색 #1 --- */
  add("3.4", {ts:"3.4", lvl:"실전", scenario:"s4",
    q:`You inherit a 180,000-line service and must find every place a deprecated switch named ENABLE_LEGACY_PRICING is still honoured. You know it appears in TypeScript, in a deployment manifest, in one shell script, and in a log message; you do not know which files. An earlier attempt that opened files one by one exhausted the context window before finishing. What sequence works?`,
    opts:[
      {t:`Search file contents for the literal across the whole tree first, which yields the exact hit list regardless of file type, then open only the hit locations to read the surrounding lines, widening to neighbouring code only where a hit is ambiguous.`, ok:true},
      {t:`List every .ts and .yaml file by name pattern, then read them in order until the switch stops appearing — the extensions tell you where configuration can live.`},
      {t:`Ask for an architectural summary of the repository, pick the three most likely modules from it, and read those modules in full.`},
      {t:`Read the deployment manifests end to end, since any switch that reaches production has to be declared there.`},
    ],
    explain:{
      good:`파일은 모르지만 문자열은 아는 경우 순서가 정해져 있음. <strong>내용 검색으로 위치를 먼저 확정</strong>하고, 그 위치만 열어 맥락을 확인함. 이렇게 하면 읽는 분량이 검색 결과 수에 비례하므로 컨텍스트 창(context window)을 초과하지 않음. 이름 패턴 검색은 어떤 이름의 파일이 있는지 확인할 때 쓰는 도구이며 이 문제에서는 순서가 반대임.`,
      wrongs:[
        `<b>B:</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 확장자로 좁히면 읽는 분량이 줄어드는 것은 맞음. 그러나 지문이 이미 셸 스크립트와 로그 메시지를 지목했음. 두 확장자만 가정하면 그 둘을 전부 놓침.`,
        `<b>C:</b> 아키텍처 요약은 추측의 출발점일 뿐이며, "every place"라는 요구에 완전성을 보장하지 못함.`,
        `<b>D:</b> 프로덕션에 반영되려면 매니페스트에 선언돼야 한다는 가정 자체가 코드 안의 기본값과 하드코딩된 값을 배제함.`,
      ]},
    principle:"파일을 모르면 내용 검색부터, 이름 검색은 그다음"});

  /* --- 3.4 ③ 코드베이스 탐색 #2 (복수응답) --- */
  add("3.4", {ts:"3.4", lvl:"기초", scenario:"s2", multi:2,
    q:`Two lookups open the same task. (A) "Which files are the Jest setup files?" — you know they follow the naming pattern jest.setup.*, you do not know where they sit in the tree. (B) "Which modules call chargeCard()?" — you know the symbol, not the filenames. Which TWO moves are the right first step for A and B respectively? (Select TWO.)`,
    opts:[
      {t:`For A, match files by name pattern across the whole tree.`, ok:true},
      {t:`For B, search inside file contents for the symbol across the whole tree.`, ok:true},
      {t:`For A, open the project's configuration file and follow whatever paths it references.`},
      {t:`For B, list every file under src/ and read them in dependency order until the calls are accounted for.`},
      {t:`For both, run a shell command that concatenates the repository into one buffer and scan it.`},
    ],
    explain:{
      good:`판단 기준은 하나임. <strong>파일 이름을 아는가, 파일 안에 쓰인 것을 아는가.</strong> A는 파일 이름 규칙을 알고 위치를 모르므로 이름 패턴 매칭이고, B는 심볼만 알므로 본문 검색임. 첫 단계를 잘못 고르면 이후의 읽기가 전부 낭비됨.`,
      wrongs:[
        `<b>C:</b> 설정 파일을 따라가는 방식임. 설정에 등록되지 않았거나 다른 이름으로 참조된 파일을 놓침. 이름 규칙을 이미 아는데 우회하는 방법임.`,
        `<b>D:</b> src/ 전부를 읽는 방식임. 컨텍스트를 소비하면서 정답률은 검색보다 낮아지는 전형적인 안티패턴임.`,
        `<b>E:</b> 저장소 전체를 이어 붙여 훑는 방식임. 대형 저장소에서는 출력 분량을 감당할 수 없고, 전용 검색 도구가 하는 일을 수작업으로 재현하는 것임.`,
      ]},
    principle:"이름은 패턴 매칭 · 내용은 본문 검색"});

  /* --- 3.5 ① 반복 개선 워크플로 --- */
  add("3.5", {ts:"3.5", lvl:"실전", scenario:"s2",
    q:`Three rounds into an address normaliser. Round 1: the output shape was described in two paragraphs and the key order came out different on each run. Round 2: the instruction "make it more robust" produced a refactor of an unrelated geocoding module. Round 3: three failures — an empty string, the literal "N/A", and a null — were reported one at a time, and each fix reintroduced one of the others; all three flow through the same coercion helper. What should round 4 consist of?`,
    opts:[
      {t:`Two or three filled-in before-and-after pairs so the shape is no longer inferred from sentences, the exact failing input named alongside what came back versus what should have, and the three missing-value cases delivered as one package because they meet in the same helper.`, ok:true},
      {t:`A clean session and a much fuller written specification covering the output shape and the robustness requirements, so nothing from the confused rounds carries over.`},
      {t:`The three missing-value cases kept separate, with a regression test added after each so a reintroduced failure is caught immediately.`},
      {t:`Three alternative implementations, keeping whichever passes the most of your cases.`},
    ],
    explain:{
      good:`세 라운드가 각각 다른 실패이므로 처방도 세 가지를 함께 적용해야 함. 형식은 입출력 예시 쌍으로 고정하고, 막연한 방향 지시 대신 실패한 입력과 기대 출력을 명시하고, 같은 함수를 지나는 케이스는 한 묶음으로 처리함. 하나만 수정하면 이번 라운드도 일부만 개선되고 끝남.`,
      wrongs:[
        `<b>B:</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 오염된 맥락을 버리는 것은 종종 옳은 방법임. 그러나 라운드 1의 원인이 산문 명세 자체였음. 같은 방식을 더 길게 쓰는 것에 해당함.`,
        `<b>C:</b> 테스트는 다시 나타난 실패를 알려줄 뿐이며, 세 케이스가 한 함수에서 만난다는 사실을 조율하지 못함.`,
        `<b>D:</b> 올바른 출력이 아직 고정되지 않은 상태라 비교 기준이 없음. 형식을 먼저 확정하는 것이 순서임.`,
      ]},
    principle:"형태는 예시로 · 피드백은 지목으로 · 얽힌 문제는 한 묶음으로"});

  /* --- 3.5 ② 부정형 --- */
  add("3.5", {ts:"3.5", lvl:"실전", scenario:"s4",
    q:`A data team's CSV-to-report generation comes out shaped differently on each run, and they have four ideas for round two. Which does the LEAST to fix output that is interpreted differently every time?`,
    opts:[
      {t:`Restating the same written description of the format at the top and again at the bottom of the prompt so it is seen twice.`, ok:true},
      {t:`Supplying two completed sample reports together with the source rows they came from.`},
      {t:`Turning the format description into a small set of assertions the output has to satisfy, and iterating until they pass.`},
      {t:`Having the assistant ask its own clarifying questions about the format before producing anything.`},
    ],
    explain:{
      good:`부정형 문항임. 문제의 원인은 <strong>산문이 여러 갈래로 해석된다</strong>는 점이므로, 같은 산문을 두 번 제시하는 것은 해석의 폭을 좁히지 못함. 나머지 셋은 각각 실제 예시, 검증 가능한 기준, 누락된 조건 확인이라는 서로 다른 경로로 해석의 폭을 줄임.`,
      wrongs:[
        `<b>B:</b> 형식 불일치의 첫 번째 처방임. 실제 예시가 산문보다 훨씬 강한 수단임.`,
        `<b>C:</b> 통과 여부를 기계가 판정할 수 있게 만드는 방법임. 해석의 여지를 없애는 방향임.`,
        `<b>D:</b> 무엇을 지정하지 않았는지 모를 때 그 누락된 조건을 먼저 드러내는 방법임.`,
      ]},
    principle:"부정형: 반복 제시는 해석을 고정하지 못함"});

  /* --- 3.6 리뷰 설정 종합 --- */
  add("3.6", {ts:"3.6", lvl:"실전", scenario:"s5",
    q:`A pull-request review step runs unattended on a shared runner with permission checks switched off. Three complaints this sprint: the reviews ignore the error-handling and logging standards documented in the repository; the metrics dashboard that ingests findings breaks about weekly because it pattern-matches prose; and last Tuesday the step pushed a branch. Which revision resolves all three?`,
    opts:[
      {t:`Leave the documented standards where an ordinary session already picks them up so the unattended run reads them too; replace the checks-off setting with a mode that denies anything outside a pre-approved list and pre-approve only read and diff commands; and return schema-validated structured output so the dashboard reads fields instead of sentences.`, ok:true},
      {t:`Add the option that skips discovery of project context, hooks and plugins so every runner starts identically, add a deny rule for pushes, and keep prose output but freeze the review prompt's wording so the dashboard's patterns stop drifting.`},
      {t:`Add a deny rule for the push command, raise the turn limit so reviews go deeper, and rewrite the dashboard's patterns to be stricter about which sentences count as findings.`},
      {t:`Paste the standards into the review prompt, instruct the assistant to reply with JSON and nothing else, and put a dollar cap on the step so an expensive run cannot repeat.`},
    ],
    explain:{
      good:`대응 수단이 셋이고 불만도 셋임. 표준은 저장소 문서로 두면 비대화형 실행도 일반 세션과 같은 프로젝트 맥락을 읽음. 권한은 검사를 끄는 대신 미리 정한 것만 실행되는 모드로 바꾸고 허용 목록을 읽기와 차이 확인으로 좁히면 푸시 경로가 닫힘. 출력은 스키마로 검증된 구조로 반환하면 파싱이 고정된 형식 계약이 됨.`,
      wrongs:[
        `<b>B:</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 러너 간 재현성 설명은 정확함. 그러나 그 옵션은 저장소의 프로젝트 맥락까지 건너뛰므로 첫 번째 불만인 표준 미반영을 오히려 확정시킴.`,
        `<b>C:</b> 푸시 하나는 차단되지만 권한 검사가 꺼진 상태는 그대로이므로 다음에는 다른 쓰기 작업이 실행됨. 턴 상한 조정은 세 불만 중 어느 것과도 무관하고, 패턴 강화는 매주 깨지던 방식의 연장임.`,
        `<b>D:</b> 표준이 저장소와 프롬프트 두 벌로 갈라지고, "JSON만 출력하라"는 지시는 형식 계약이 아니라 요청에 그침. 권한 문제는 해결되지 않음.`,
      ]},
    principle:"표준 로드 · 권한 좁히기 · 출력 계약"});

})();
