/* PART E: 시험 영어 */
window.CCAF_CONTENT.pe = {
  id: "pe",
  lessons: [

  /* ================= E-1 · 시험 문항 해부 ================= */
  { id:"pec1", ch:"E-1", title:"시험 문항의 구조",
    steps:[
      {type:"concept", kind:"PART BRIEFING · 파트 설명", h:"PART E · 시험 영어 읽는 방법",
   html:`<h4>① 다루는 내용</h4>
<ul>
<li>시험 문항의 영어가 반복해서 쓰는 형식</li>
<li>문항 구조, 지시어, 조건 표현, 자주 나오는 어휘</li>
<li>문법 설명과 단어 암기는 다루지 않음</li>
<li>자격시험의 출제 범위에 들어가는 내용은 아님. 영어로 응시하는 사람을 위한 보충 파트</li>
</ul>
<h4>② 필요한 이유</h4>
<ul>
<li>시험 언어는 영어와 일본어. 영어로 응시하면 브리핑과 선택지가 모두 영어</li>
<li>60문항 120분. 문항 하나에 2분</li>
<li>긴 영어 글을 처음부터 끝까지 읽으면 2분을 읽는 데 모두 사용</li>
<li>내용을 알아도 시간이 모자라 풀지 못하는 경우의 원인은 읽는 순서</li>
<li>문항의 형식은 몇 가지로 정해져 있고 내용만 바뀌어 출제</li>
</ul>
<h4>③ 구성</h4>
<table>
<tr><th>레슨</th><th>내용</th></tr>
<tr><td>E-1 문항 구조</td><td>문항의 구성 요소와 2분 안에 읽는 순서</td></tr>
<tr><td>E-2 지시어</td><td>MOST, BEST, FIRST, LEAST, NOT이 요구하는 답의 종류</td></tr>
<tr><td>E-3 조건 표현</td><td>정답을 바꾸는 짧은 표현</td></tr>
<tr><td>E-4 어휘</td><td>문항에 자주 나오는 표현 120개</td></tr>
<tr><td>E-5 30초 확인 연습</td><td>긴 글에서 네 가지만 확인하는 방법</td></tr>
<tr><td>E-6 미니테스트</td><td>영어 독해 10문항</td></tr>
</table>`},

      {type:"concept", kind:"CONCEPT · 개념 설명", h:"문항의 구성 요소 여섯 가지",
   html:`<h4>① 구성 요소</h4>
<table>
<tr><th>번호</th><th>구성 요소</th><th>내용</th><th>정답 판단에 쓰이는 정도</th></tr>
<tr><td>1</td><td>시나리오 브리핑<br><small>scenario briefing</small></td><td>어떤 시스템인지 소개. 같은 시나리오의 문항이 함께 사용</td><td>낮음</td></tr>
<tr><td>2</td><td>상황<br><small>situation</small></td><td>팀 구성, 도구 목록, 목표 수치</td><td>낮음</td></tr>
<tr><td>3</td><td>증상과 숫자<br><small>symptoms</small></td><td>잘못된 내용. 예: 40% false positives, crashed at 3 AM</td><td>높음</td></tr>
<tr><td>4</td><td>제약<br><small>constraint</small></td><td>지켜야 하는 조건. 대개 짧은 표현 하나</td><td>높음</td></tr>
<tr><td>5</td><td>질문<br><small>stem</small></td><td>실제로 묻는 문장. 대개 마지막 문장이고 물음표로 끝남</td><td>높음</td></tr>
<tr><td>6</td><td>선택지<br><small>options</small></td><td>4개. 답을 여러 개 고르는 문항은 5개</td><td>높음</td></tr>
</table>
<h4>② 분량과 정보량의 차이</h4>
<ul>
<li>1번과 2번은 길고 정답 판단에 거의 쓰이지 않는 배경</li>
<li>3번, 4번, 5번은 짧고 정답의 조건이 모두 들어 있는 부분</li>
<li>선택지 네 개의 분량은 브리핑의 절반 정도인 경우가 많음</li>
<li>위에서 아래로 읽으면 배경에 시간을 쓰고 선택지를 읽다가 다시 위로 돌아가게 됨</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>stem</b>: 문항에서 실제로 묻는 문장. 물음표가 붙은 한 줄</li>
<li><b>option</b>: 선택지. A부터 D 또는 E까지</li>
<li><b>distractor</b>: 오답 선택지. 그럴듯하게 보이도록 만든 선택지</li>
</ul>
</div>`},

      {type:"concept", kind:"TOPIC · 주제 설명", h:"문항 하나의 구성 요소 구분",
   html:`<ul>
<li>실제 시험과 같은 형태로 만든 문항 하나를 구성 요소별로 구분한 예시</li>
<li>왼쪽 막대 색의 뜻: 회색은 배경, 빨강은 증상과 숫자, 노랑은 제약, 주황은 질문, 초록은 선택지</li>
</ul>
<div style="border-left:4px solid var(--dim);background:var(--surface2);padding:8px 12px;margin:8px 0;border-radius:0 8px 8px 0">
<div style="font-size:10.5px;font-weight:700;letter-spacing:.7px;color:var(--dim)">1 SCENARIO BRIEFING 시나리오 브리핑</div>
<div style="margin-top:4px">Your team runs a structured data extraction service built on the Claude API. It processes scanned supplier contracts and returns typed JSON for a procurement dashboard.</div>
<div style="font-size:12px;color:var(--muted);margin-top:5px">확인할 내용: 계약서 추출, JSON, 대시보드. 같은 시나리오의 다음 문항에서는 읽지 않음</div>
</div><div style="border-left:4px solid var(--dim);background:var(--surface2);padding:8px 12px;margin:8px 0;border-radius:0 8px 8px 0">
<div style="font-size:10.5px;font-weight:700;letter-spacing:.7px;color:var(--dim)">2 SITUATION 상황</div>
<div style="margin-top:4px">The pipeline uses a single extraction tool defined with a strict JSON schema. Fields include governing_law, renewal_term_months, and termination_notice_days. Roughly 9,000 contracts are processed each night.</div>
<div style="font-size:12px;color:var(--muted);margin-top:5px">확인할 내용: 항목 이름 renewal_term_months 하나. 나머지 항목과 9,000이라는 숫자는 이 문항에서 쓰이지 않음</div>
</div><div style="border-left:4px solid var(--no);background:var(--surface2);padding:8px 12px;margin:8px 0;border-radius:0 8px 8px 0">
<div style="font-size:10.5px;font-weight:700;letter-spacing:.7px;color:var(--no)">3 SYMPTOMS 증상과 숫자</div>
<div style="margin-top:4px">Since last week's schema update, the dashboard shows renewal_term_months: 12 for a batch of contracts that are one-time purchase orders with no renewal clause at all. Spot checks confirm the source documents contain no renewal language.</div>
<div style="font-size:12px;color:var(--muted);margin-top:5px">확인할 내용: 문서에 없는 값을 12로 채움. 값이 없는 경우이므로 필요한 해결은 빈 값 허용</div>
</div><div style="border-left:4px solid var(--warn);background:var(--surface2);padding:8px 12px;margin:8px 0;border-radius:0 8px 8px 0">
<div style="font-size:10.5px;font-weight:700;letter-spacing:.7px;color:var(--warn)">4 CONSTRAINT 제약</div>
<div style="margin-top:4px">The dashboard's downstream consumers cannot be modified this quarter, so the field must remain present in every record.</div>
<div style="font-size:12px;color:var(--muted);margin-top:5px">확인할 내용: 항목 삭제 불가. 이 문장으로 항목을 빼는 선택지 제외</div>
</div><div style="border-left:4px solid var(--accent);background:var(--surface2);padding:8px 12px;margin:8px 0;border-radius:0 8px 8px 0">
<div style="font-size:10.5px;font-weight:700;letter-spacing:.7px;color:var(--accent)">5 QUESTION 질문</div>
<div style="margin-top:4px">What is the MOST effective schema change?</div>
<div style="font-size:12px;color:var(--muted);margin-top:5px">확인할 내용: MOST는 맞는 선택지가 여러 개라는 뜻. schema change는 스키마를 고치는 답만 후보라는 뜻</div>
</div><div style="border-left:4px solid var(--ok);background:var(--surface2);padding:8px 12px;margin:8px 0;border-radius:0 8px 8px 0">
<div style="font-size:10.5px;font-weight:700;letter-spacing:.7px;color:var(--ok)">6 OPTIONS 선택지</div>
<div style="margin-top:4px">A. Make renewal_term_months nullable and instruct the model to return null when the contract has no renewal clause.<br>B. Remove renewal_term_months from the schema for purchase-order documents.<br>C. Add an enum of common renewal terms (6, 12, 24, 36) so the model only picks valid values.<br>D. Lower the temperature so the model stops inventing values.</div>
<div style="font-size:12px;color:var(--muted);margin-top:5px">B는 4번 제약으로 제외. C는 3번 증상으로 제외. 값이 없는 문서에 목록을 줘도 하나를 고르게 됨. D의 temperature 조정은 규칙을 만드는 수단이 아님. 남는 답은 A</div>
</div>
<h4>정답을 정한 부분</h4>
<ul>
<li>정답을 정한 부분은 3번과 4번. 영어 세 문장</li>
<li>1번과 2번의 다섯 문장은 정답 판단에 쓰이지 않음</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>nullable</b>: 값을 비워 둘 수 있게 허용한 항목</li>
<li><b>enum</b>: 정해진 값 중 하나만 고르게 한 항목</li>
<li><b>temperature</b>: 답의 무작위 정도를 정하는 설정값</li>
</ul>
</div>`},

      {type:"concept", kind:"TOPIC · 주제 설명", h:"읽는 순서",
   html:`<h4>① 순서</h4>
<table>
<tr><th>순서</th><th>읽을 부분</th><th>이유</th></tr>
<tr><td>1</td><td>질문. 마지막 물음표 문장</td><td>묻는 내용을 알아야 나머지 글에서 필요한 부분을 고를 수 있음</td></tr>
<tr><td>2</td><td>제약</td><td>정답을 정하는 짧은 표현. 대개 질문 문장 안이나 바로 앞 문장에 위치</td></tr>
<tr><td>3</td><td>선택지 4~5개</td><td>선택지를 보면 글에서 확인할 내용이 정해짐</td></tr>
<tr><td>4</td><td>증상과 숫자</td><td>선택지를 가르는 근거</td></tr>
<tr><td>5</td><td>상황과 브리핑</td><td>앞 단계에서 답이 정해지지 않은 경우에만 확인</td></tr>
</table>
<h4>② 두 가지 순서의 비교</h4>
<table>
<tr><th>순서</th><th>읽는 분량</th><th>결과</th></tr>
<tr><td>위에서 아래로</td><td>233단어 전부</td><td>마지막에야 묻는 내용 확인. 선택지를 읽다가 다시 위로 돌아가 두 번 읽게 됨</td></tr>
<tr><td>질문부터</td><td>163단어</td><td>브리핑과 상황 70단어는 읽지 않고 답 결정</td></tr>
</table>
<ul>
<li>줄어드는 시간의 대부분은 다시 읽는 시간</li>
</ul>
<h4>③ 같은 시나리오의 문항</h4>
<ul>
<li>시나리오 브리핑은 첫 문항에서 한 번만 읽기. 다음 문항부터는 같은 글</li>
<li>처음 읽을 때 시스템 이름 하나와 도구 이름 서너 개 기억</li>
</ul>
<h4>④ 순서를 바꾸는 경우</h4>
<table>
<tr><th>경우</th><th>표시</th><th>읽는 방법</th></tr>
<tr><td>부정형 질문</td><td>NOT, LEAST, EXCEPT, FALSE</td><td>선택지를 먼저 모두 읽고 맞는 내용과 틀린 내용 표시</td></tr>
<tr><td>답이 여러 개인 문항</td><td>Select TWO</td><td>선택지 5개를 모두 읽기. 하나만 찾고 멈추면 오답</td></tr>
</table>
<h4>⑤ 시간 배분</h4>
<table>
<tr><th>단계</th><th>시간</th></tr>
<tr><td>질문과 제약</td><td>15초</td></tr>
<tr><td>선택지 한 번 읽기</td><td>35초</td></tr>
<tr><td>증상과 대조</td><td>30초</td></tr>
<tr><td>결정</td><td>20초</td></tr>
</table>
<ul>
<li>합계 약 100초. 남는 20초는 여유 시간</li>
</ul>`},

      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: Read the last sentence first",
       q:`SCENARIO: A CI job runs Claude Code on every pull request and posts a review comment.<br>SITUATION: The job runs inside a GitHub Actions container with no TTY. It invokes the CLI, waits for the review, and posts whatever text comes back.<br>SYMPTOMS: Two thirds of runs end with the CLI still sitting at an interactive prompt and an empty comment body. The runs that do finish post free-form prose, which the comment parser silently discards.<br>CONSTRAINT: The parser belongs to another team, consumes strict JSON only, and will not change this quarter.<br>QUESTION: Which single change addresses both symptoms?`,
       opts:[
         {t:`Invoke the CLI with -p for non-interactive execution and --output-format json so the output is machine-parseable by the parser that already exists.`, ok:true},
         {t:`Replace the plain invocation with --output-format json, which covers both non-interactive execution and structured output in one flag.`},
         {t:`Invoke the CLI with -p and update the comment parser to accept prose output.`},
         {t:`Keep the current invocation, add a shell timeout, and retry the job up to three times so hung runs get killed and one eventually succeeds.`},
       ],
       hint:`질문 문장에 "both symptoms"와 "single change"가 붙어 있음. 증상이 몇 개이고 각각 무엇 때문에 생긴 것인지 먼저 구분할 것. 그리고 CONSTRAINT 줄이 보기 하나를 정확히 겨냥하고 있음.`,
       explain:{
         good:`증상이 두 개임. ①대화형 프롬프트에서 멈춤 ②산문 출력이 파서에서 버려짐. 각각의 처방이 -p(비대화형 실행)와 --output-format json(기계가 파싱할 수 있는 출력)이고 둘 다 필요함. 그리고 제약이 파서를 수정할 수 없다고 명시했으므로 파서를 손대는 답은 탈락함. 읽기 순서대로 하면 질문 8단어와 제약 한 문장만으로 보기 두 개가 이미 탈락함.`,
         wrongs:[
           `<b>B: 플래그 하나로 해결하려는 답.</b> 자주 틀리는 지점임. <code>--output-format json</code>은 출력 형태만 담당하며 비대화형 실행(-p)을 대신하지 않음. 멈춤 증상이 그대로 남음.`,
           `<b>C: 파서 수정.</b> 제약 줄이 "will not change this quarter"라고 명시함. 맞는 말처럼 들려도 조건 위반이므로 오답임.`,
           `<b>D: 타임아웃과 재시도.</b> 멈춤을 없애는 것은 증상 처치일 뿐이고 산문 출력 문제는 다루지 않음. "both"를 충족하지 못함.`,
         ]},
       principle:"원칙 ② 근본 원인: 증상 개수만큼 처방이 필요함"},

      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 2: Which sentence decided it",
       q:`SCENARIO: A nightly agent reconciles payment records between your billing system and the payment processor.<br>SITUATION: It pulls both sides, compares them, and writes a discrepancy report to a shared drive that the finance team reads each morning.<br>SYMPTOMS: Thursday's report listed zero discrepancies. Friday, finance found 214 unmatched transactions from Thursday. The run log shows the processor's API returned HTTP 503 on eleven of forty pages, and the fetch helper returns an empty page list on any non-200 response so that "one bad page doesn't kill the run."<br>CONSTRAINT: Finance treats a missing report as a failed control, so a report must be produced every night.<br>QUESTION: What is the correct fix?`,
       opts:[
         {t:`Make the fetch helper surface non-200 responses as structured failures, and have the job publish the report marked as partial, naming the pages it could not read, instead of reporting zero discrepancies.`, ok:true},
         {t:`Have the job abort and publish nothing when any page fails, so finance is never handed a report built on incomplete data.`},
         {t:`Add exponential backoff and retry each failed page up to five times, so transient 503s stop producing empty pages.`},
         {t:`Compare the transaction counts on both sides before writing the report, and re-run the whole reconciliation when the totals differ.`},
       ],
       hint:`증상 문단 마지막 줄에 "so that ..."으로 시작하는 인용이 있음. 그것이 원인 진술임. 그리고 CONSTRAINT 한 줄이 보기 하나를 정확히 탈락시킴.`,
       explain:{
         good:`원인은 실패를 성공처럼 반환하는 fetch helper임. 빈 목록이 정상 결과로 흘러들어가 불일치 0건이라는 결과가 만들어짐. 처방은 실패를 실패로 드러내는 것과 리포트를 부분 결과로 표시해 발행하는 것임. 제약이 매일 밤 리포트를 내야 한다고 정했으므로 중단은 선택지가 아님.`,
         wrongs:[
           `<b>B: 중단하고 미발행.</b> 잘못된 리포트를 막는다는 점은 맞지만 제약 줄이 "a report must be produced every night"라고 명시함. 조건 위반임.`,
           `<b>C: 백오프 재시도.</b> 재시도는 도움이 되지만 원인이 아님. 다섯 번 재시도해도 여전히 실패하면 helper는 또 빈 목록을 성공처럼 반환함.`,
           `<b>D: 건수 비교 후 전체 재실행.</b> 양쪽 건수가 같으면서도 매칭이 틀릴 수 있어 누락을 놓치고, 전체 재실행은 원인을 그대로 둔 채 비용만 늘림.`,
         ]},
       principle:"원칙 ⑤ 실패는 감추지 말고 구조화해 드러낼 것"},
    ]},

  /* ================= E-2 · 지시어 사전 ================= */
  { id:"pec2", ch:"E-2", title:"지시어: MOST, BEST, FIRST, LEAST, NOT",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"지시어",
   html:`<h4>① 뜻</h4>
<ul>
<li>질문 문장에서 답의 종류를 정하는 단어</li>
<li>지시어를 놓치면 글을 정확히 읽어도 다른 답을 고르게 됨</li>
</ul>
<h4>② 형태와 위치</h4>
<ul>
<li>대문자로 적는 경우: MOST, BEST, LEAST, NOT, EXCEPT, FALSE, TWO</li>
<li>소문자로 적는 경우: first, single, both, primary, guarantees</li>
<li>위치: 물음표가 붙은 질문 문장 안</li>
</ul>
<h4>③ 지시어에 따른 정답의 차이</h4>
<table>
<tr><th>질문</th><th>정답의 종류</th></tr>
<tr><td>What is the correct fix?</td><td>최종 해결 방법</td></tr>
<tr><td>What is the most effective FIRST step?</td><td>원인을 확인하는 첫 조치</td></tr>
</table>
<ul>
<li>브리핑과 선택지가 같아도 지시어가 바뀌면 정답이 다른 선택지로 이동</li>
<li>글보다 지시어를 먼저 읽는 이유</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>qualifier</b>: 지시어. 답의 범위를 좁히는 단어</li>
<li><b>superlative</b>: 최상급. most, best, least처럼 '가장'의 뜻을 만드는 형태. 맞는 선택지가 여러 개라는 표시</li>
</ul>
</div>`},

      {type:"concept", kind:"TOPIC · 주제 설명", h:"지시어 다섯 종류",
   html:`<h4>① 최상급: 맞는 선택지 여러 개 중 하나 고르기</h4>
<table>
<tr><th>영어</th><th>뜻</th><th>요구하는 답</th></tr>
<tr><td>MOST effective</td><td>가장 효과적인</td><td>브리핑의 조건에 가장 잘 맞는 선택지 하나</td></tr>
<tr><td>BEST, best fix, best design</td><td>가장 좋은</td><td>MOST와 같은 기준</td></tr>
<tr><td>MOST likely cause</td><td>가장 가능성이 높은 원인</td><td>기록과 숫자가 직접 가리키는 원인. 흔한 원인과 다를 수 있음</td></tr>
<tr><td>PRIMARY</td><td>주된</td><td>여러 원인 중 가장 큰 것. 부수적인 원인은 오답</td></tr>
<tr><td>GREATEST</td><td>가장 큰</td><td>영향과 위험의 크기 비교</td></tr>
<tr><td>MOST reliable, MOST maintainable</td><td>가장 안정적인, 가장 관리하기 쉬운</td><td>뒤에 붙은 형용사가 판단 기준</td></tr>
</table>
<h4>② 순서: 먼저 할 일</h4>
<table>
<tr><th>영어</th><th>뜻</th><th>요구하는 답</th></tr>
<tr><td>FIRST step, first move</td><td>첫 조치</td><td>원인을 확인하는 조치, 또는 비용이 적고 원인을 직접 고치는 조치</td></tr>
<tr><td>next step</td><td>다음 단계</td><td>브리핑에서 이미 한 일의 바로 다음 단계 하나</td></tr>
<tr><td>before, must happen before</td><td>~ 전에</td><td>먼저 갖춰야 하는 조건</td></tr>
<tr><td>going forward</td><td>앞으로는</td><td>이번 문제의 수습이 아니라 다시 생기지 않게 하는 설계</td></tr>
</table>
<h4>③ 부정: 맞지 않는 것 고르기</h4>
<table>
<tr><th>영어</th><th>뜻</th><th>요구하는 답</th></tr>
<tr><td>NOT</td><td>~이 아닌 것</td><td>선택지 셋은 맞는 내용. 틀린 내용 하나 선택</td></tr>
<tr><td>LEAST appropriate, LEAST effective</td><td>가장 적절하지 않은, 가장 효과가 적은</td><td>나머지 셋은 모두 적절한 조치</td></tr>
<tr><td>EXCEPT</td><td>~을 제외하고</td><td>NOT과 같은 구조</td></tr>
<tr><td>FALSE</td><td>틀린 것</td><td>맞는 내용 셋과 틀린 내용 하나</td></tr>
<tr><td>anti-pattern</td><td>피해야 하는 방식</td><td>부정어가 없어도 부정형 질문</td></tr>
</table>
<h4>④ 개수: 고를 수와 해결할 수</h4>
<table>
<tr><th>영어</th><th>뜻</th><th>요구하는 답</th></tr>
<tr><td>Select TWO, Which TWO</td><td>두 개 선택</td><td>정확히 두 개. 하나나 세 개를 고르면 오답</td></tr>
<tr><td>a single change, one change</td><td>변경 하나</td><td>변경 하나로 문제 전부 해결</td></tr>
<tr><td>both symptoms, all three</td><td>둘 다, 셋 다</td><td>증상의 수만큼 모두 해결. 하나만 고치는 선택지 제외</td></tr>
<tr><td>combination, pairing</td><td>조합</td><td>선택지 하나에 조치가 여러 개. 그 안의 조치가 모두 맞아야 정답</td></tr>
</table>
<h4>⑤ 강도: 필요한 확실성</h4>
<table>
<tr><th>영어</th><th>뜻</th><th>요구하는 답</th></tr>
<tr><td>guarantees, a guarantee, not a best effort</td><td>보장</td><td>예외 없는 수단. 지시문이나 예시로 요청하는 방법 제외</td></tr>
<tr><td>deterministic</td><td>매번 같은 결과를 내는</td><td>훅이나 사전 조건 검사처럼 프로그램이 강제하는 수단</td></tr>
<tr><td>reliably, consistently</td><td>안정적으로, 일관되게</td><td>guarantee보다 약한 표현. 방향은 같음</td></tr>
<tr><td>regardless of</td><td>~와 관계없이</td><td>예외 없음. 조건에 따라 달리 처리하는 선택지 제외</td></tr>
<tr><td>appropriate, legitimate</td><td>적절한, 정당한</td><td>권장 기준에 맞는 방법. 동작은 하지만 권장되지 않는 방법이 오답으로 등장</td></tr>
</table>
<ul>
<li>문항을 열면 먼저 질문 문장의 지시어가 다섯 종류 중 어느 것인지 확인</li>
</ul>`},

      {type:"concept", kind:"TOPIC · 주제 설명", h:"최상급 문항의 판단 순서",
   html:`<h4>① 최상급 문항의 특징</h4>
<table>
<tr><th>문항 종류</th><th>선택지</th><th>푸는 방법</th></tr>
<tr><td>일반 문항</td><td>틀린 내용 셋과 맞는 내용 하나</td><td>틀린 선택지 제외</td></tr>
<tr><td>최상급 문항</td><td>네 개 모두 맞는 내용</td><td>조건에 가장 잘 맞는 하나 비교</td></tr>
</table>
<h4>② 판단 순서</h4>
<ul>
<li>첫째, 브리핑의 제약에 어긋나는 선택지 제외. 대개 한두 개가 제외</li>
<li>둘째, 증상을 모두 해결하지 못하는 선택지 제외. 질문에 both나 single change가 있으면 이 단계가 중심</li>
<li>셋째, 남은 선택지 중 비용이 적고 원인을 직접 고치는 선택지 선택. 별도 모델 학습 같은 큰 조치는 이 단계에서 제외</li>
</ul>
<h4>③ FIRST가 함께 붙은 경우</h4>
<ul>
<li>제외되는 선택지: 전체 재설계, 새 시스템 도입, 지시문 전체 다시 쓰기</li>
<li>남는 선택지: 원인을 확인하는 조치, 또는 작은 직접 수정</li>
<li>브리핑에 원인을 모른다는 내용이 있으면 원인 확인이 정답인 경우가 많음</li>
</ul>
<h4>④ 주의할 점</h4>
<ul>
<li>선택지 네 개를 모두 읽은 뒤에 결정</li>
<li>첫 선택지가 맞는 내용이어도 더 잘 맞는 선택지가 뒤에 있을 수 있음</li>
<li>읽은 뒤에는 그 자리에서 결정</li>
</ul>`},

      {type:"concept", kind:"TOPIC · 주제 설명", h:"부정형 문항의 오답 유형",
   html:`<h4>① 오답 유형 세 가지</h4>
<table>
<tr><th>유형</th><th>내용</th><th>대응</th></tr>
<tr><td>앞 문항의 습관</td><td>앞 문항에서 가장 좋은 것을 고르던 대로 좋은 선택지 선택. NOT을 읽고도 발생</td><td>질문의 대문자 단어부터 확인</td></tr>
<tr><td>두 번 뒤집어 읽기</td><td>NOT a valid way에서 valid까지 반대로 해석</td><td>반대로 읽을 단어는 NOT 하나. 선택지 안의 not, never, without은 긍정문으로 바꿔 읽기</td></tr>
<tr><td>LEAST의 오해</td><td>나쁜 선택지 여러 개 중 가장 나쁜 것을 찾는 문항으로 이해</td><td>나머지 셋은 모두 적절한 조치. 적절하지 않은 하나 찾기</td></tr>
</table>
<h4>② LEAST 문항에서 답이 되는 선택지</h4>
<ul>
<li>지시문으로 규칙을 강제하려는 선택지</li>
<li>원인을 확인하지 않고 큰 변경을 하는 선택지</li>
<li>실패를 감추는 선택지</li>
</ul>
<h4>③ 푸는 순서</h4>
<ul>
<li>첫째, 질문에서 NOT, LEAST, EXCEPT, FALSE 확인</li>
<li>둘째, 선택지 네 개를 먼저 모두 읽고 맞는 내용과 틀린 내용 표시</li>
<li>셋째, 맞는 내용이 셋이고 틀린 내용이 하나면 틀린 내용이 답. 그렇지 않으면 질문 다시 확인</li>
</ul>`},

      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: Three of these are fine",
       q:`A subagent's overnight run failed at 03:12 with a tool timeout after two local retries. The on-call engineer has the full run log, the failing tool call, and a one-line fix already prepared for a known bug in that tool's argument handling. Which action is LEAST appropriate?`,
       opts:[
         {t:`Rewrite the coordinator to route around that tool for all future runs, before establishing whether the timeout was transient or caused by the known bug.`, ok:true},
         {t:`Apply the prepared one-line fix and re-run only the step that failed.`},
         {t:`Append the timeout to the conversation as a structured tool result carrying the failure type and whether a retry is worthwhile, so the agent can distinguish it from a successful call.`},
         {t:`Check the tool result's retryable flag before deciding whether a retry is even meaningful for this failure class.`},
       ],
       hint:`질문 문장에 대문자 단어가 하나 있음. 그것이 무엇을 요구하는지 확정한 뒤 보기를 읽을 것. 셋이 모두 괜찮아 보이면 제대로 읽고 있는 것임.`,
       explain:{
         good:`LEAST appropriate은 나머지 셋이 모두 적절하고 하나만 부적절하다는 뜻임. A는 원인을 확정하기 전에 코디네이터(coordinator)를 재설계하는 조치임. 과잉 설계와 근본 원인 미확인이 겹쳤음. 한 줄 수정이 준비된 상황에서 구조를 다시 만들 이유가 없음.`,
         wrongs:[
           `<b>B: 한 줄 수정 후 실패 단계만 재실행.</b> 적절함. 원인이 특정된 알려진 버그이고, 완료된 작업을 다시 하지 않는 재개임.`,
           `<b>C: 구조화된 실패 결과로 추가.</b> 적절함. 실패를 감추지 않고 재시도 가치까지 담아 올리는 정석임.`,
           `<b>D: 재시도 가능 여부 확인.</b> 적절함. transient인지 validation인지에 따라 재시도의 의미가 달라지므로 먼저 확인할 값이 맞음.`,
         ]},
       principle:"부정형: 셋이 모두 좋아 보이면 제대로 읽은 것"},

      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 2: What does PRIMARY point at",
       q:`Two MCP tools, fetch_order_status and fetch_shipment_status, are picked wrongly by the agent in about a third of calls. Both are registered correctly, both have well-formed input schemas with distinct parameter names, and both descriptions read "Retrieves status information." The team is arguing about where to intervene. What is the PRIMARY mechanism the model uses to choose between them, and what follows from that?`,
       opts:[
         {t:`The description text — the model reads descriptions to decide, so each one has to state what that tool returns and when to reach for it instead of the other.`, ok:true},
         {t:`The input schemas — tightening parameter names and types until the two signatures look nothing alike will make the distinction clear to the model.`},
         {t:`Registration order — listing the more frequently needed tool first biases selection toward it and cuts the error rate.`},
         {t:`tool_choice — forcing the more common of the two removes the ambiguity at its source, since the model no longer has a decision to make.`},
       ],
       hint:`질문에 PRIMARY가 붙었음. 여럿이 작동하지만 그 중 주된 것을 묻는 것임. 그리고 지문이 이미 세 가지를 정상이라고 확인해 주었는데 딱 하나만 두 도구가 동일함. 그 항목이 무엇인지 확인할 것.`,
       explain:{
         good:`지문이 등록, 스키마, 파라미터 이름을 모두 정상으로 확인해 주었고 "Retrieves status information."만 두 도구가 동일함. 모델이 도구를 고르는 주된 근거가 description이므로 원인과 처방 모두 그곳임. 각 설명이 무엇을 반환하는지와 언제 다른 쪽 대신 이것을 쓰는지를 명시해야 함.`,
         wrongs:[
           `<b>B: 스키마 강화.</b> 스키마는 호출을 <b>어떻게</b> 만들지를 정하고 <b>어느 것을</b> 고를지는 정하지 않음. 게다가 지문이 파라미터 이름은 이미 구분된다고 밝혔음.`,
           `<b>C: 등록 순서.</b> 선택은 순서가 아니라 의미로 이뤄짐. 자주 쓰는 쪽으로 기울이면 나머지 경우의 오선택이 늘어남.`,
           `<b>D: tool_choice로 강제.</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 강제하면 혼동은 사라지지만 <b>나머지 3분의 1의 정당한 호출을 하지 못하게</b> 만듦. 선택 자체가 필요한 상황에서 선택을 없애는 것은 해결이 아님.`,
         ]},
       principle:"원칙 ② 근본 원인: 지문이 정상이라고 밝힌 것은 원인이 아님"},

      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 3: FIRST narrows it down",
       q:`Your support agent's refund approval rate jumped from 31% to 68% on Tuesday. No code, prompt, or model change was deployed to the agent. On Monday night the policy team edited the refund-eligibility page that the agent's system prompt pulls in verbatim. Finance wants an explanation before Friday's audit. What is the MOST effective FIRST step?`,
       opts:[
         {t:`Diff Monday night's policy edit against the previous version to pin down exactly which eligibility condition loosened, before changing anything in the agent.`, ok:true},
         {t:`Roll the system prompt back to last week's version and revisit after the audit has passed.`},
         {t:`Add a hook that blocks process_refund above last week's median refund amount until the cause is understood.`},
         {t:`Rewrite the refund section of the system prompt with few-shot examples of correctly denied refunds.`},
       ],
       hint:`지시어가 두 개 붙어 있음. MOST effective와 FIRST임. FIRST가 후보를 어떻게 줄이는지 확인할 것. 그리고 지문이 무엇이 바뀌었는지를 이미 알려 주었는지 아직 알려 주지 않았는지 확인할 것.`,
       explain:{
         good:`FIRST가 붙으면 후보는 진단이나 한 줄 수정으로 좁혀짐. 지문은 <b>정책 페이지가 편집됐다는 것</b>까지만 알려 주었고 <b>어떤 조건이 느슨해졌는지는 아직 알 수 없음</b>. 두 버전을 비교하는 것은 비용이 적고 빠르며 원인을 정확히 특정함. 감사에 제출할 설명도 이 비교에서 나옴.`,
         wrongs:[
           `<b>B: 롤백.</b> 승인율은 즉시 내려가지만 <b>정당한 정책 변경까지 무효화</b>하고, 무엇이 문제였는지는 여전히 알 수 없어 감사에 제출할 설명이 나오지 않음.`,
           `<b>C: 금액 상한 훅.</b> 강제 수단 자체는 유효한 도구이지만 원인을 모르는 상태에서 <b>임의 기준선</b>을 세우는 것임. 문제가 금액이 아니라 자격 조건이라면 엉뚱한 곳을 막게 됨.`,
           `<b>D: few-shot 재작성.</b> 원인 확인 전의 해결책이고, 애초에 프롬프트가 아니라 프롬프트가 가져오는 정책 문서가 바뀐 상황임. 수정해야 할 곳을 수정하지 않음.`,
         ]},
       principle:"원칙 ③ 과잉 설계 금지: FIRST는 비용이 적고 직접적인 쪽"},
    ]},

  /* ================= E-3 · 조건을 숨기는 표현 ================= */
  { id:"pec3", ch:"E-3", title:"정답을 바꾸는 조건 표현",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"제약이 적히는 형태",
   html:`<h4>① 제약이 놓이는 위치</h4>
<table>
<tr><th>위치</th><th>예</th><th>특징</th></tr>
<tr><td>이름표가 붙은 줄</td><td>Constraint:, Team constraint:, Requirement:, Company policy:</td><td>찾기 쉬움</td></tr>
<tr><td>질문 문장 안</td><td>Which implementation guarantees compliance while keeping normal refunds automated?</td><td>가장 많은 형태</td></tr>
<tr><td>상황 설명의 마지막 줄</td><td>The parser belongs to another team and will not change this quarter.</td><td>평범한 문장처럼 보여 놓치기 쉬움</td></tr>
</table>
<h4>② 제약의 역할</h4>
<ul>
<li>선택지 하나나 둘을 제외하는 근거</li>
<li>제약이 없었다면 정답이었을 선택지가 제외 대상인 경우가 많음</li>
<li>유난히 그럴듯한 선택지가 있으면 그 선택지를 제외하는 제약이 있는지 확인</li>
</ul>
<h4>③ 제약을 알리는 단어 여섯 개</h4>
<ul>
<li>without, while, only, must, before, cannot</li>
<li>이 단어가 든 표현은 손가락이나 커서로 짚으며 읽기</li>
</ul>`},

      {type:"concept", kind:"TOPIC · 주제 설명", h:"조건 표현 여덟 종류",
   html:`<h4>① 바꿀 수 없는 대상</h4>
<table>
<tr><th>영어</th><th>뜻</th><th>제외되는 선택지</th></tr>
<tr><td>without changing X</td><td>X는 그대로 두고</td><td>X를 고치는 답</td></tr>
<tr><td>without affecting teammates, without affecting anyone else</td><td>다른 팀원에게 영향 없이</td><td>공유 설정이나 저장소 파일을 고치는 답</td></tr>
<tr><td>cannot be modified, will not change this quarter</td><td>수정 불가, 이번 분기에는 바뀌지 않음</td><td>그 대상을 고치는 답</td></tr>
<tr><td>is owned by another team</td><td>다른 팀 담당</td><td>다른 팀의 프로그램을 고치는 답</td></tr>
<tr><td>must remain present</td><td>남아 있어야 함</td><td>항목이나 분류를 삭제하는 답</td></tr>
<tr><td>while preserving Y, while keeping Z automated</td><td>Y를 유지하면서, Z는 자동 처리를 유지하면서</td><td>모두 사람에게 넘기는 답</td></tr>
<tr><td>read-only</td><td>읽기 전용</td><td>원본에 기록하는 답</td></tr>
</table>
<h4>② 비용과 자원의 상한</h4>
<table>
<tr><th>영어</th><th>뜻</th><th>제외되는 선택지</th></tr>
<tr><td>with minimal token spend</td><td>토큰을 가장 적게 써서</td><td>전부 다시 읽는 답</td></tr>
<tr><td>at the lowest cost</td><td>가장 낮은 비용으로</td><td>새 시스템이나 별도 모델을 만드는 답</td></tr>
<tr><td>within the existing context budget</td><td>지금의 컨텍스트 한도 안에서</td><td>컨텍스트 창을 키우는 답</td></tr>
<tr><td>without adding infrastructure</td><td>새 시스템 추가 없이</td><td>벡터 DB나 별도 서비스를 만드는 답</td></tr>
<tr><td>in a single batch run, in one pass</td><td>배치 한 번으로, 한 번에</td><td>여러 번 나눠 실행하는 답</td></tr>
</table>
<h4>③ 순서와 시점</h4>
<table>
<tr><th>영어</th><th>뜻</th><th>요구하는 내용</th></tr>
<tr><td>before Z, must happen before</td><td>Z 전에</td><td>먼저 할 일. Z를 먼저 하는 답 제외</td></tr>
<tr><td>until</td><td>~할 때까지</td><td>그때까지 차단 유지</td></tr>
<tr><td>as soon as</td><td>~하자마자</td><td>지연이 있는 답 제외</td></tr>
<tr><td>the cutoff has passed, the window has closed</td><td>마감이 지남, 기간이 끝남</td><td>처음부터 다시 하는 답 제외</td></tr>
</table>
<h4>④ 조건</h4>
<table>
<tr><th>영어</th><th>뜻</th><th>요구하는 내용</th></tr>
<tr><td>only if</td><td>~인 경우에만</td><td>항상 수행하는 답 제외</td></tr>
<tr><td>unless</td><td>~가 아니라면</td><td>기본은 수행. 예외인 경우에만 수행하지 않음</td></tr>
<tr><td>provided that</td><td>~라는 조건에서</td><td>조건이 맞지 않으면 그 답은 무효</td></tr>
</table>
<h4>⑤ 금지와 의무</h4>
<table>
<tr><th>영어</th><th>뜻</th><th>제외되는 선택지</th></tr>
<tr><td>must NOT be suppressed</td><td>숨기면 안 됨</td><td>걸러 내거나 삭제해서 양을 줄이는 답</td></tr>
<tr><td>must not improvise, is not permitted</td><td>지어내면 안 됨, 허용되지 않음</td><td>없는 규칙을 만들어 처리하는 답</td></tr>
<tr><td>is required to, has to</td><td>반드시 해야 함</td><td>선택 사항으로 두는 답</td></tr>
<tr><td>regardless of</td><td>~와 관계없이</td><td>조건에 따라 달리 처리하는 답</td></tr>
</table>
<h4>⑥ 확실성</h4>
<table>
<tr><th>영어</th><th>뜻</th><th>제외되는 선택지</th></tr>
<tr><td>a guarantee, not a best effort</td><td>노력이 아니라 보장</td><td>지시문, 예시, temperature 조정</td></tr>
<tr><td>guarantees compliance</td><td>규정 준수 보장</td><td>위와 같음</td></tr>
<tr><td>deterministic</td><td>매번 같은 결과를 내는</td><td>Claude의 판단에 맡기는 답</td></tr>
<tr><td>in every case, every time</td><td>모든 경우에</td><td>대부분 걸러 낸다는 답</td></tr>
</table>
<h4>⑦ 실행 환경</h4>
<table>
<tr><th>영어</th><th>뜻</th><th>요구하는 내용</th></tr>
<tr><td>non-interactively, with no TTY</td><td>대화 없이, 터미널 없이</td><td>사람 없이 실행하는 옵션</td></tr>
<tr><td>unattended, overnight</td><td>사람 없이, 밤사이</td><td>중간에 사람의 답이 필요한 답 제외</td></tr>
<tr><td>in CI, on every pull request</td><td>CI에서, PR마다</td><td>프로그램이 읽을 수 있는 출력 형식</td></tr>
<tr><td>a missing report is a failed control</td><td>보고서가 빠지면 통제 실패</td><td>중단하고 아무것도 내지 않는 답 제외</td></tr>
</table>
<h4>⑧ 범위</h4>
<table>
<tr><th>영어</th><th>뜻</th><th>요구하는 내용</th></tr>
<tr><td>a single change</td><td>변경 하나</td><td>하나로 모두 해결</td></tr>
<tr><td>the minimal change</td><td>가장 작은 변경</td><td>가장 적게 고치는 답</td></tr>
<tr><td>without redoing completed work</td><td>끝난 일을 다시 하지 않고</td><td>전체를 다시 실행하는 답 제외</td></tr>
<tr><td>only the affected parts</td><td>영향받은 부분만</td><td>전체를 다시 분석하는 답 제외</td></tr>
</table><div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>TTY</b>: 사람이 글자를 입력하고 결과를 보는 터미널 화면</li>
<li><b>CI</b>: 코드가 올라올 때마다 검사와 테스트를 자동으로 실행하는 장치</li>
<li><b>배치(batch)</b>: 여러 건을 한 번에 제출하고 나중에 결과를 받는 처리 방식</li>
</ul>
</div>`},

      {type:"concept", kind:"TOPIC · 주제 설명", h:"조건 표현에 따른 정답 변화 다섯 가지",
   html:`<h4>① without affecting teammates</h4>
<table>
<tr><th>브리핑</th><th>정답</th></tr>
<tr><td>팀이 함께 쓰는 /commit 스킬의 메시지 형식 변경</td><td>저장소의 .claude/skills/commit/SKILL.md 수정</td></tr>
<tr><td>같은 상황에 without affecting anyone else 추가</td><td>개인 스킬 위치인 ~/.claude/skills/에 배치</td></tr>
</table>
<ul>
<li>공유 파일을 고치면 팀 전체에 적용</li>
<li>개인 위치에 두면 내 실행에만 적용</li>
</ul>
<h4>② with minimal token spend</h4>
<table>
<tr><th>브리핑</th><th>정답</th></tr>
<tr><td>어제 세션에서 큰 코드베이스 분석. 밤사이 자동 업그레이드로 저장소 전반이 변경</td><td>새 세션에 어제 결론의 요약 전달. 이전 도구 결과가 지금 코드와 다르기 때문</td></tr>
<tr><td>같은 상황에서 바뀐 파일이 3개뿐이고 continue with minimal token spend 추가</td><td>세션을 이어 가고 바뀐 파일 3개를 알려 그 부분만 다시 분석</td></tr>
</table>
<ul>
<li>이전 분석을 계속 쓸지는 변경의 범위로 판단</li>
<li>토큰 상한 표현은 전부 다시 읽는 답을 제외</li>
</ul>
<h4>③ must NOT be suppressed before humans see them</h4>
<table>
<tr><th>브리핑</th><th>정답</th></tr>
<tr><td>리뷰 봇의 오탐이 40%여서 개발자가 의견을 읽지 않기 시작</td><td>신뢰도가 낮은 지적을 걸러 내 양 줄이기</td></tr>
<tr><td>같은 상황에 Team constraint: findings must NOT be suppressed before humans see them 추가</td><td>걸러 내지 않고 심각도 순으로 정렬. 지적마다 근거 표시</td></tr>
</table>
<ul>
<li>제약이 걸러 내기를 금지</li>
<li>남는 방법은 삭제가 아니라 순서와 근거 표시</li>
</ul>
<h4>④ runs in CI with no human at the terminal</h4>
<table>
<tr><th>브리핑</th><th>정답</th></tr>
<tr><td>Claude Code로 코드 리뷰 실행</td><td>평소처럼 대화하며 실행</td></tr>
<tr><td>같은 작업에 runs in a container with no TTY, on every pull request 추가</td><td>-p 옵션으로 사람 없이 실행. --output-format json으로 프로그램이 읽을 수 있는 출력</td></tr>
</table>
<ul>
<li>사람이 없다는 표현이 있으면 대화하며 실행하는 답은 모두 제외</li>
</ul>
<h4>⑤ downstream consumers cannot be modified</h4>
<table>
<tr><th>브리핑</th><th>정답</th></tr>
<tr><td>새 문서 종류에는 renewal_term_months에 해당하는 값이 없는데 Claude가 12를 채움</td><td>그 문서 종류의 스키마에서 해당 항목 삭제</td></tr>
<tr><td>같은 상황에 the field must remain present in every record 추가</td><td>항목은 유지하고 빈 값 허용. 해당 조항이 없으면 null 반환</td></tr>
</table>
<ul>
<li>제약이 항목 삭제를 제외</li>
<li>항목을 유지하면서 같은 문제를 해결하는 방법은 빈 값 허용</li>
</ul>
<h4>⑥ 다섯 예시의 공통점</h4>
<ul>
<li>제약이 없을 때의 정답은 더 단순하고 범위가 큰 조치</li>
<li>제약이 붙으면 같은 목적을 더 좁은 수단으로 이루는 답으로 이동</li>
</ul>`},

      {type:"concept", kind:"TOPIC · 주제 설명", h:"제약 확인 순서",
   html:`<h4>① 확인 순서</h4>
<ul>
<li>첫째, 질문 문장에서 without, while, only, must, before, cannot 찾기</li>
<li>둘째, 찾은 표현을 짧은 한국어로 바꿔 기억. 예: 팀 설정 변경 금지, 토큰 절약, 보고서 발행 필수</li>
<li>셋째, 선택지마다 그 조건에 어긋나는지 확인. 어긋나면 맞는 내용이어도 제외</li>
</ul>
<h4>② 제약이 없는 문항</h4>
<ul>
<li>모든 문항에 제약이 있는 것은 아님</li>
<li>제약이 없다고 판단했으면 다시 찾지 않고 선택지 비교로 진행</li>
</ul>
<h4>③ 제약이 두 개인 문항</h4>
<ul>
<li>예: guarantees compliance while keeping normal refunds automated</li>
<li>선택지 구성: 하나만 만족하는 선택지 둘, 둘 다 어기는 선택지 하나, 둘 다 만족하는 선택지 하나</li>
<li>맞는 선택지를 찾은 뒤에도 나머지 조건과 한 번 더 대조</li>
</ul>
<h4>④ 드는 시간</h4>
<ul>
<li>제약을 찾는 데 약 5초</li>
</ul>`},

      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: One clause, two locations",
       q:`Your repository ships a shared /review skill that every engineer on the team runs. You want /review itself to apply a stricter security checklist and a different output format whenever you run it, without changing what your teammates get when they run /review. What do you do?`,
       opts:[
         {t:`Create a personal skill named review in ~/.claude/skills/ that holds your stricter version; when a personal and a project skill share a name, the personal one runs, and only for you.`, ok:true},
         {t:`Create a personal skill under a different name such as /review-strict, leaving the repository's skill untouched.`},
         {t:`Edit the repository's .claude/skills/review/SKILL.md to include your stricter checklist, with a note in the file that the extra checks are optional.`},
         {t:`Add the stricter checklist to the project's CLAUDE.md so that it applies whenever /review runs.`},
       ],
       hint:`질문 문장에 조건이 두 개. /review itself와 without으로 시작하는 구절. 두 조건을 한국어 한 마디씩으로 바꾼 뒤 보기 네 개 확인.`,
       explain:{
         good:`조건은 두 가지. <b>실행 명령은 그대로 /review</b>, <b>팀원의 실행 결과는 그대로</b>. 개인 스킬 위치에 같은 이름으로 만들면 내 컴퓨터에서만 개인 스킬이 우선 실행. 두 조건 모두 충족.`,
         wrongs:[
           `<b>B: 다른 이름의 개인 스킬.</b> 가장 고르기 쉬운 오답. 팀에 영향은 없지만 <code>/review</code> 자체는 그대로. 첫째 조건 미충족.`,
           `<b>C: 공유 파일 수정 + 안내문.</b> 저장소에 올리는 순간 팀 전원의 <code>/review</code>가 바뀜. 안내문에는 강제력 없음.`,
           `<b>D: 프로젝트 CLAUDE.md에 추가.</b> CLAUDE.md는 팀 전원이 항상 읽는 파일. 팀원의 실행 결과도 바뀜.`,
         ]},
       principle:"개인 변형 = 개인 스킬 위치. 이름이 같으면 개인 스킬 우선"},

      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 2: Two constraints at once",
       q:`Your invoice-processing agent auto-approves vendor invoices end to end. Compliance now requires that every invoice containing a tax-ID field go to human review — as a guarantee, not a best effort — while invoices without a tax-ID field stay fully automated. Extraction confidence on the tax_id field currently averages 0.94. Which implementation satisfies both requirements?`,
       opts:[
         {t:`A programmatic gate that routes any extraction whose tax_id field is populated to human review, regardless of its confidence score, and leaves every other invoice on the automated path.`, ok:true},
         {t:`Route an invoice to human review whenever the tax_id confidence score falls below 0.90, since an unreliable field is what actually creates compliance risk.`},
         {t:`Add a system-prompt rule instructing the agent to always escalate any invoice on which it finds a tax ID.`},
         {t:`Route every invoice to human review, and let reviewers fast-approve the ones with no tax ID so throughput stays acceptable.`},
       ],
       hint:`조건이 두 개임. 하나는 강도(a guarantee, not a best effort)이고 하나는 유지(while ... stay fully automated)임. 보기마다 두 조건을 각각 대조할 것. 절반만 만족하는 보기가 몇 개인지 확인할 것.`,
       explain:{
         good:`두 조건을 모두 만족하는 것은 하나뿐임. 필드가 채워졌으면 무조건 사람에게 보내는 방식은 코드가 강제하므로 보장이고, 신뢰도와 무관하므로 "regardless of"까지 만족함. 그리고 tax_id가 없는 인보이스는 건드리지 않으므로 자동화도 유지됨.`,
         wrongs:[
           `<b>B: 신뢰도 0.90 기준.</b> 가장 그럴듯한 오답임. 지문이 평균 신뢰도 점수(confidence score)를 0.94라고 알려 주었음. 대부분의 tax-ID 인보이스가 <b>기준선을 넘어 자동 승인됨</b>. 요구는 tax ID가 있으면이지 신뢰도가 낮으면이 아님.`,
           `<b>C: 시스템 프롬프트 규칙.</b> 프롬프트 지시는 확률적임. "a guarantee, not a best effort"라는 구절이 이 종류의 답을 전부 탈락시킴.`,
           `<b>D: 전부 사람에게.</b> 보장은 만족하지만 두 번째 조건을 직접 위반함. tax ID가 없는 인보이스까지 사람이 처리하면 "fully automated"가 아님.`,
         ]},
       principle:"원칙 ① 강제는 프로그램으로. 조건은 전부 대조할 것"},

      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 3: The window has closed",
       q:`An overnight migration agent moved records from a legacy inventory database into a new schema. It ran unattended in a container with no human present. This morning the new database is missing 8,400 rows from the supplier_lots table. The run log shows verify_batch returned {"ok": true} for every batch, including three batches whose write step had timed out — its author made verify_batch report ok whenever it could not reach the target database, "so a flaky connection wouldn't fail the whole migration." The cutover window has closed and the legacy database is now read-only, so re-running the full migration is not available to you. What is the correct fix?`,
       opts:[
         {t:`Change verify_batch to report unreachable-target as a structured failure distinct from a clean verification, then identify the three timed-out batches from the log and re-migrate only those rows.`, ok:true},
         {t:`Re-run the migration from the beginning with verify_batch fixed, so every batch is verified under the corrected logic.`},
         {t:`Add retry-with-backoff around the write step so timed-out batches are retried until they succeed, and re-run the migration.`},
         {t:`Have verify_batch compare row counts between source and target after each batch, and abort the migration on the first mismatch.`},
       ],
       hint:`지문 뒤쪽에 "cutover window has closed"와 "read-only"가 붙어 있음. 그 두 표현이 보기 몇 개를 탈락시키는지 확인할 것. 그리고 8,400행이 사라진 원인이 타임아웃인지, 타임아웃을 성공이라고 보고한 것인지 구분할 것.`,
       explain:{
         good:`원인은 도달 실패를 성공으로 보고한 verify_batch임. 실패를 실패로 드러내게 수정하는 것이 근본 처방이고, 제약이 전체 재실행을 막았으므로 로그에서 실패한 세 배치를 특정해 그 부분만 다시 옮기는 것이 유일하게 가능한 복구 경로임.`,
         wrongs:[
           `<b>B: 처음부터 재실행.</b> 원인 수정은 맞지만 제약을 직접 위반함. cutover가 종료됐고 원본이 읽기 전용이라 전체 재실행 자체가 불가능함.`,
           `<b>C: 백오프 재시도 후 재실행.</b> 재시도는 도움이 되지만 근본 처방이 아님. 재시도가 모두 실패하면 verify_batch는 여전히 ok를 반환함. 게다가 이것도 전체 재실행을 전제하므로 제약 위반임.`,
           `<b>D: 건수 비교 후 첫 불일치에서 중단.</b> 검증 자체는 개선이지만 이미 누락된 8,400행을 어떻게 할지에 대한 답이 없음. 그리고 무인 야간 실행에서 첫 불일치에 중단하면 나머지 이관까지 전부 멈춤.`,
         ]},
       principle:"제약이 복구 경로를 정함: 남은 방법으로만 근본 원인을 수정할 것"},
    ]},

  /* ================= E-4 · 시험 어휘장 ================= */
  { id:"pec4", ch:"E-4", title:"시험 어휘: 문항에 자주 나오는 표현 120개",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"어휘 표 사용 방법",
   html:`<h4>① 구성</h4>
<ul>
<li>이 사이트의 연습 문항에 쓰인 표현 120개</li>
<li>영역별 여섯 묶음</li>
<li>항목마다 영어, 뜻, 문항에서의 쓰임 표시</li>
<li>가장 중요한 칸은 문항에서의 쓰임. 그 표현이 나왔을 때 판단할 내용</li>
</ul>
<h4>② 사용 방법</h4>
<ul>
<li>첫째, 세 칸을 모두 읽으며 모르는 항목 수 확인. 약 20분</li>
<li>둘째, 영어 칸만 보고 문항에서의 쓰임 떠올리기. 떠오르지 않는 항목에 표시</li>
<li>셋째, 표시한 항목만 다시 확인</li>
<li>모의고사에서 모르는 단어가 나오면 이 표에서 찾기</li>
</ul>`},

      {type:"concept", kind:"TOPIC · 주제 설명", h:"A. 에이전트 루프와 오케스트레이션 22개",
   html:`<table>
<tr><th>영어</th><th>뜻</th><th>문항에서의 쓰임</th></tr>
<tr><td><code>agentic loop</code></td><td>에이전트 루프</td><td>요청, 도구 실행, 결과를 대화에 추가하는 과정을 반복하는 구조</td></tr>
<tr><td><code>stop_reason</code></td><td>중단 이유</td><td>루프를 계속할지 정하는 기준 값</td></tr>
<tr><td><code>tool_use</code></td><td>도구 사용</td><td>도구가 필요해 멈춘 상태. 아직 작업 중이라는 뜻</td></tr>
<tr><td><code>end_turn</code></td><td>턴 종료</td><td>할 말을 마쳤다는 신호. 루프 종료의 정석 신호</td></tr>
<tr><td><code>max_tokens</code></td><td>출력 한도</td><td>출력 길이 상한에 걸려 멈춘 상태. 종료 신호가 아니라 별도 처리 분기</td></tr>
<tr><td><code>tool_result</code></td><td>도구 결과</td><td>실행 결과를 대화로 되돌려 넣는 블록. 이 블록이 빠지면 Claude는 도구가 실행된 사실을 알 수 없음</td></tr>
<tr><td><code>iteration</code></td><td>반복 회차</td><td>루프 한 회. "12 iterations" 같은 상한은 보조 안전망일 때만 정당</td></tr>
<tr><td><code>terminate</code></td><td>종료하다</td><td>루프를 끝내는 것. 종료 조건을 묻는 문항의 핵심어</td></tr>
<tr><td><code>coordinator</code></td><td>코디네이터</td><td>하위 작업을 분해하고 위임하며 결과를 취합하는 상위 에이전트</td></tr>
<tr><td><code>subagent</code></td><td>서브에이전트</td><td>위임받은 하위 작업을 수행하는 에이전트. 코디네이터의 대화 히스토리(conversation history)를 물려받지 않음</td></tr>
<tr><td><code>delegate</code></td><td>위임하다</td><td>코디네이터가 하위 작업을 넘기는 것</td></tr>
<tr><td><code>spawn</code></td><td>띄우다, 생성하다</td><td>서브에이전트를 새로 만드는 것. Agent 도구가 없으면 불가능</td></tr>
<tr><td><code>hub-and-spoke</code></td><td>허브 앤 스포크</td><td>모든 통신이 코디네이터를 거치는 표준 구조</td></tr>
<tr><td><code>decomposition</code></td><td>작업 분해</td><td>큰 작업을 하위 작업으로 나누기. 리서치 누락 사고의 주요 원인 지점</td></tr>
<tr><td><code>prompt chaining</code></td><td>프롬프트 체이닝</td><td>순서가 미리 고정된 파이프라인. 예측 가능한 반복 작업용</td></tr>
<tr><td><code>dynamic decomposition</code></td><td>동적 분해</td><td>중간 발견이 다음 작업을 바꾸는 방식. 열린 조사 과제용</td></tr>
<tr><td><code>synthesis</code></td><td>합성, 종합</td><td>서브에이전트 결과를 하나의 보고서로 묶는 마지막 단계</td></tr>
<tr><td><code>handoff</code></td><td>인계</td><td>한 에이전트에서 다음으로 넘기는 지점. 컨텍스트가 유실되는 지점</td></tr>
<tr><td><code>orchestration</code></td><td>오케스트레이션</td><td>여러 에이전트를 조율하는 설계 전반</td></tr>
<tr><td><code>in parallel</code></td><td>병렬로</td><td>서브에이전트를 동시에 실행하는 것. 중복 조사가 생기면 분해가 문제</td></tr>
<tr><td><code>sequential</code></td><td>순차적인</td><td>앞 단계가 끝나야 다음이 시작되는 방식</td></tr>
<tr><td><code>anti-pattern</code></td><td>안티패턴</td><td>그럴듯하지만 틀린 설계. 오답 보기의 정체이며 부정형 문항의 정답</td></tr>
</table>`},

      {type:"concept", kind:"TOPIC · 주제 설명", h:"B. 도구 설계와 MCP 20개",
   html:`<table>
<tr><th>영어</th><th>뜻</th><th>문항에서의 쓰임</th></tr>
<tr><td><code>tool description</code></td><td>도구 설명</td><td>모델이 도구를 고르는 <b>1차 근거</b>. 선택 오류 문항의 정답이 여기인 경우가 많음</td></tr>
<tr><td><code>tool selection</code></td><td>도구 선택</td><td>어느 도구를 부를지 정하는 일. 도구가 많을수록 잘못된 선택 증가</td></tr>
<tr><td><code>tool_choice</code></td><td>도구 선택 모드</td><td>auto, any, tool, none 중 하나로 지정</td></tr>
<tr><td><code>auto</code></td><td>자동</td><td>모델이 스스로 고르고, 필요 없으면 부르지 않을 수도 있음</td></tr>
<tr><td><code>any</code></td><td>아무거나 하나</td><td>반드시 도구 하나를 호출하게 하는 설정. 어느 도구인지는 Claude가 선택. 항상 사고하는 최신 모델에서는 400 오류</td></tr>
<tr><td><code>built-in tools</code></td><td>기본 제공 도구</td><td>Read, Write, Edit, Bash, Grep, Glob 여섯 개</td></tr>
<tr><td><code>Grep</code></td><td>내용 검색</td><td>파일 <b>안의 내용</b>을 찾을 때 사용. 함수 호출자 찾기가 대표 사례</td></tr>
<tr><td><code>Glob</code></td><td>이름 패턴 검색</td><td>경로나 파일명으로 찾을 때 사용. 내용 검색이 아님</td></tr>
<tr><td><code>MCP server</code></td><td>MCP 서버</td><td>외부 도구와 리소스를 에이전트에 연결하는 창구</td></tr>
<tr><td><code>.mcp.json</code></td><td>프로젝트 MCP 설정</td><td>팀 공유용. 리포지토리에 커밋해 모두가 같은 서버를 사용</td></tr>
<tr><td><code>~/.claude.json</code></td><td>개인 MCP 설정</td><td>개인만 사용하는 실험용 서버 자리. 팀에 영향이 없음</td></tr>
<tr><td><code>MCP resource</code></td><td>MCP 리소스</td><td>탐색 호출 없이 바로 조회되는 카탈로그성 데이터. 탐색 비용 없음</td></tr>
<tr><td><code>isError</code></td><td>에러 표시</td><td>도구 결과가 실패임을 알리는 플래그. 빠지면 실패가 성공으로 전달</td></tr>
<tr><td><code>errorCategory</code></td><td>에러 분류</td><td>transient, validation, business 중 하나. 다음 행동을 정하는 기준</td></tr>
<tr><td><code>isRetryable</code></td><td>재시도 가능</td><td>다시 호출할 가치가 있는 실패인지. transient만 true</td></tr>
<tr><td><code>transient</code></td><td>일시적인</td><td>타임아웃이나 502처럼 다시 하면 성공할 수도 있는 실패</td></tr>
<tr><td><code>validation error</code></td><td>검증 오류</td><td>입력이 틀린 것. 같은 입력으로 재시도하면 같은 실패. 입력 수정 필요</td></tr>
<tr><td><code>business rule</code></td><td>업무 규칙</td><td>정책상 불가능한 것. 재시도 대상이 아니며 대안 경로나 에스컬레이션(escalation)으로 처리</td></tr>
<tr><td><code>retry</code></td><td>재시도</td><td>실패한 호출을 다시 거는 것. 실패 종류를 확인하지 않고 재시도하면 무한 반복</td></tr>
<tr><td><code>narrow tool</code></td><td>좁은 전용 도구</td><td>고빈도 요구 하나만 처리하는 도구. 나머지는 기존 경로를 유지</td></tr>
</table>`},

      {type:"concept", kind:"TOPIC · 주제 설명", h:"C. Claude Code와 작업 흐름 20개",
   html:`<table>
<tr><th>영어</th><th>뜻</th><th>문항에서의 쓰임</th></tr>
<tr><td><code>CLAUDE.md</code></td><td>프로젝트 지침 파일</td><td>세션 시작 때 <b>항상</b> 로드되는 지침. 파일 위치에 따라 적용 범위 결정</td></tr>
<tr><td><code>frontmatter</code></td><td>프론트매터</td><td>파일 맨 위 --- 사이의 YAML 설정 블록. 프롬프트 본문이 아님</td></tr>
<tr><td><code>allowed-tools</code></td><td>사전 허용 도구</td><td>스킬이 실행되는 동안 승인 질문 없이 쓸 수 있는 도구 목록. 도구를 제한하는 설정은 disallowed-tools</td></tr>
<tr><td><code>argument-hint</code></td><td>인자 힌트</td><td>스킬에 넘길 입력값의 형식을 알려 주는 설정 항목</td></tr>
<tr><td><code>slash command</code></td><td>슬래시 명령</td><td>/commit처럼 입력해 스킬을 실행하는 방식</td></tr>
<tr><td><code>skill</code></td><td>스킬</td><td>필요할 때 로드되는 작업 지침 묶음. 항상 로드되는 CLAUDE.md와 대비</td></tr>
<tr><td><code>hook</code></td><td>훅</td><td>정해진 시점에 자동 실행되는 프로그램. 확률이 아니라 강제</td></tr>
<tr><td><code>PreToolUse</code></td><td>도구 실행 전 훅</td><td>호출 자체를 <b>차단</b>할 수 있는 지점. 금액 상한이나 전제조건 게이트가 여기에 해당</td></tr>
<tr><td><code>PostToolUse</code></td><td>도구 실행 후 훅</td><td>결과 정규화와 포맷 강제 지점. 차단은 불가능</td></tr>
<tr><td><code>plan mode</code></td><td>플랜 모드</td><td>실행 전에 계획을 먼저 제출하게 하는 모드. 파급이 큰 작업에 사용</td></tr>
<tr><td><code>-p</code> (print)</td><td>비대화형 실행</td><td>사람 없이 한 번 실행하고 종료. CI와 무인 실행에 필수</td></tr>
<tr><td><code>--output-format json</code></td><td>JSON 출력</td><td>기계가 파싱할 형태로 출력. <b>-p를 대신하지 않음</b>. 자주 틀리는 지점</td></tr>
<tr><td><code>--json-schema</code></td><td>스키마 강제</td><td>그 JSON의 형태를 고정. 정규식으로 추출하는 방식을 대체</td></tr>
<tr><td><code>session</code></td><td>세션</td><td>대화 한 줄기. 이름을 붙여 관리하고 나중에 이어갈 수 있음</td></tr>
<tr><td><code>--resume</code></td><td>세션 이어가기</td><td>이전 세션을 그대로 다시 여는 것. 변경이 작을 때의 정답</td></tr>
<tr><td><code>fork</code></td><td>분기</td><td>같은 지점에서 두 접근을 나눠 비교. stale 문제의 해법은 아님</td></tr>
<tr><td><code>stale</code></td><td>오래되어 지금 상태와 맞지 않음</td><td>세션이 기록해 둔 결론이 현재 상태와 맞지 않게 된 것</td></tr>
<tr><td><code>CI/CD</code></td><td>지속적 통합, 배포</td><td>PR마다 자동으로 실행되는 파이프라인. 사람이 없다는 뜻</td></tr>
<tr><td><code>pull request</code> (PR)</td><td>풀 리퀘스트</td><td>변경을 합치기 전 리뷰 단위. 리뷰 봇 시나리오가 놓이는 상황</td></tr>
<tr><td><code>diff</code></td><td>변경 내역</td><td>무엇이 어떻게 바뀌었는지의 차이. 원인 특정의 1순위 도구</td></tr>
</table>`},

      {type:"concept", kind:"TOPIC · 주제 설명", h:"D. 프롬프트와 구조화된 출력 20개",
   html:`<table>
<tr><th>영어</th><th>뜻</th><th>문항에서의 쓰임</th></tr>
<tr><td><code>system prompt</code></td><td>시스템 프롬프트</td><td>역할과 규칙을 정하는 최상위 지시. 확률적이므로 보장 수단은 아님</td></tr>
<tr><td><code>few-shot examples</code></td><td>예시 몇 개</td><td>원하는 판단을 보여 주는 본보기. 개수보다 <b>무엇을 고르는지</b>가 중요</td></tr>
<tr><td><code>edge case</code></td><td>경계 사례</td><td>애매해서 실제로 틀리는 경우. few-shot은 여기를 겨냥해야 효과가 있음</td></tr>
<tr><td><code>clear-cut case</code></td><td>명백한 사례</td><td>이미 잘 맞히는 쉬운 경우. 여기만 예시로 넣으면 개선이 없음</td></tr>
<tr><td><code>JSON schema</code></td><td>JSON 스키마</td><td>출력의 형태를 미리 정의한 틀</td></tr>
<tr><td><code>strict</code></td><td>엄격 모드</td><td>스키마를 위반한 출력을 막는 설정. 형태는 보장해도 <b>내용의 진위는 보장하지 않음</b></td></tr>
<tr><td><code>required</code></td><td>필수 필드</td><td>반드시 값이 있어야 하는 항목. 값이 없는 문서에서 지어내기를 유발</td></tr>
<tr><td><code>nullable</code></td><td>null 허용</td><td>값이 <b>아예 없을 때</b> 사용하는 처방</td></tr>
<tr><td><code>enum</code></td><td>열거형</td><td>정해진 목록 중에서만 고르게 하는 것. 목록에 없는 경우가 생기면 확장이 필요</td></tr>
<tr><td><code>unclear</code></td><td>불명확 값</td><td>값이 있지만 <b>어느 항목에도 맞지 않을 때</b> 사용하는 처방. null과 혼동하면 오답</td></tr>
<tr><td><code>field</code></td><td>필드</td><td>스키마의 항목 하나</td></tr>
<tr><td><code>schema evolution</code></td><td>스키마 확장</td><td>새로운 경우가 생겼을 때 스키마를 수정하는 일</td></tr>
<tr><td><code>force-fit</code></td><td>억지로 끼워 맞춤</td><td>맞지 않는 값을 있는 항목에 밀어 넣는 실패. enum이 좁을 때 발생</td></tr>
<tr><td><code>fabricate</code></td><td>지어내다</td><td>없는 값을 만들어내는 것. required와 값 없음의 조합이 원인</td></tr>
<tr><td><code>confidence score</code></td><td>신뢰도 점수</td><td>모델이 스스로 매긴 확신도. <b>실제 정확도가 아님</b>. 보정 없이 쓰면 위험</td></tr>
<tr><td><code>structured output</code></td><td>구조화된 출력</td><td>파싱 가능한 형태의 출력</td></tr>
<tr><td><code>free-form prose</code></td><td>자유 서술</td><td>파싱할 수 없는 산문. CI 파이프라인에서 조용히 버려지는 형태</td></tr>
<tr><td><code>extraction</code></td><td>추출</td><td>문서에서 필드 값을 뽑아내는 작업</td></tr>
<tr><td><code>classification</code></td><td>분류</td><td>정해진 범주로 나누는 작업</td></tr>
<tr><td><code>temperature</code></td><td>온도</td><td>출력의 무작위성. <b>규칙을 강제하는 수단이 아님</b>. 오답 보기로 자주 등장</td></tr>
</table>`},

      {type:"concept", kind:"TOPIC · 주제 설명", h:"E. 컨텍스트와 신뢰성 20개",
   html:`<table>
<tr><th>영어</th><th>뜻</th><th>문항에서의 쓰임</th></tr>
<tr><td><code>context window</code></td><td>컨텍스트 창</td><td>한 번에 볼 수 있는 내용의 한도. 키운다고 주의력 문제가 해결되지는 않음</td></tr>
<tr><td><code>token</code></td><td>토큰</td><td>분량, 비용, 속도를 재는 단위</td></tr>
<tr><td><code>token spend</code></td><td>토큰 소모</td><td>이번 작업이 사용한 양. "minimal token spend"가 붙으면 재실행 답이 탈락</td></tr>
<tr><td><code>context budget</code></td><td>컨텍스트 예산</td><td>이 작업에 허용된 컨텍스트 분량</td></tr>
<tr><td><code>context degradation</code></td><td>컨텍스트 열화</td><td>대화가 길어질수록 앞부분 내용을 사용하지 못하게 되는 현상</td></tr>
<tr><td><code>progressive summarization</code></td><td>점진적 요약</td><td>오래된 대화를 압축해 가는 방식. 숫자와 날짜가 사라지는 단계</td></tr>
<tr><td><code>case facts</code></td><td>사건 사실 블록</td><td>요약 대상에서 <b>제외</b>하고 원문 그대로 보존하는 항목. 금액과 주문 번호 보관</td></tr>
<tr><td><code>scratchpad</code></td><td>스크래치패드</td><td>발견과 제약을 적어 두는 외부 파일. 컨텍스트 밖에 두는 기록</td></tr>
<tr><td><code>escalate</code></td><td>사람에게 넘기다</td><td>에이전트가 판단을 멈추고 사람에게 인계하는 것</td></tr>
<tr><td><code>escalation trigger</code></td><td>에스컬레이션 조건</td><td>넘겨야 하는 상황의 정의. 감정 점수와 대화 횟수는 근거가 아님</td></tr>
<tr><td><code>policy gap</code></td><td>정책 공백</td><td>규정에 해당 조항이 아예 없는 경우. 지어내지 않고 사람에게 전달</td></tr>
<tr><td><code>improvise</code></td><td>즉흥적으로 만들어내다</td><td>없는 정책을 그 자리에서 지어내는 것. 감사에서 문제가 되는 행동</td></tr>
<tr><td><code>suppress</code></td><td>억누르다, 걸러 없애다</td><td>결과를 조건으로 걸러 삭제하는 것. 대개 오답 방향</td></tr>
<tr><td><code>attribution</code></td><td>출처 표시</td><td>어떤 주장이 어느 소스에서 왔는지 표시하는 것</td></tr>
<tr><td><code>verifiable</code></td><td>검증 가능한</td><td>원 소스로 되짚어 갈 수 있는 상태</td></tr>
<tr><td><code>partial results</code></td><td>부분 결과</td><td>일부만 성공했을 때 남은 것. 감추지 말고 표시해 발행할 것</td></tr>
<tr><td><code>observability</code></td><td>관측 가능성</td><td>무슨 일이 있었는지 한 곳에서 확인할 수 있는 정도</td></tr>
<tr><td><code>audit</code></td><td>감사</td><td>나중에 기록을 되짚어 검증하는 것. 기록을 남기는 설계가 정답</td></tr>
<tr><td><code>SLA</code></td><td>서비스 수준 합의</td><td>"N시간 안에" 같은 약속. 시간 제약 문항의 판단 기준</td></tr>
<tr><td><code>stratified sampling</code></td><td>층화 표집</td><td>범주별로 나눠 표본을 뽑는 것. 전체 정확도 수치의 착시를 제거</td></tr>
</table>`},

      {type:"concept", kind:"TOPIC · 주제 설명", h:"F. 문항에 반복해서 나오는 동사와 표현 18개",
   html:`<p class="lead">도메인 지식이 아니라 <strong>문항 문장 자체가 반복해서 쓰는</strong> 표현. 이 표현을 모르면 내용을 알아도 질문을 이해할 수 없음.</p>
<table>
<tr><th>영어</th><th>뜻</th><th>문항에서의 쓰임</th></tr>
<tr><td><code>address</code></td><td>해결하다, 다루다</td><td>이 조치가 그 문제를 실제로 다루는지 묻는 말</td></tr>
<tr><td><code>mitigate</code>, <code>mitigation</code></td><td>완화하다, 완화책</td><td>제거하지는 못해도 줄이는 것. 근본 해결과 구분해서 출제</td></tr>
<tr><td><code>surface</code> (동사)</td><td>드러내다</td><td>숨어 있던 실패나 정보를 보이게 하는 것. 정답 방향인 경우가 많음</td></tr>
<tr><td><code>propagate</code></td><td>전파하다</td><td>에러나 정보가 상위로 올라가는 것. 코디네이터까지 전달 필요</td></tr>
<tr><td><code>enforce</code>, <code>enforcement</code></td><td>강제하다, 강제</td><td>프로그램으로 지키게 만드는 것. 프롬프트 지시와 대비되는 말</td></tr>
<tr><td><code>guarantee</code></td><td>보장하다</td><td>예외가 0이라는 뜻. 확률적 처방은 이 단어 앞에서 전부 탈락</td></tr>
<tr><td><code>preserve</code></td><td>보존하다</td><td>그대로 유지하기. 요약 과정에서 무엇을 남길지 묻는 문항의 핵심어</td></tr>
<tr><td><code>bypass</code></td><td>우회하다</td><td>규칙을 건너뛰기. 우회가 가능한 설계는 보장이 아님</td></tr>
<tr><td><code>warrant</code></td><td>~할 만하다</td><td>이 작업이 그것을 쓸 만한지 묻는 말. 지나치게 큰 조치를 제외하는 기준</td></tr>
<tr><td><code>telltale sign</code></td><td>결정적 징후</td><td>원인을 특정해 주는 신호. 지문에 이 표현이 나오면 그곳이 답의 근거</td></tr>
<tr><td><code>root cause</code></td><td>근본 원인</td><td>증상이 아닌 실제 원인. 원칙 ②와 동일</td></tr>
<tr><td><code>countermeasure</code></td><td>대응책</td><td>증상에 맞는 처방. 짝짓기 문항으로 자주 출제</td></tr>
<tr><td><code>safeguard</code></td><td>안전장치</td><td>사고를 막는 장치. "ongoing safeguard"이면 재발 방지 설계를 묻는 것</td></tr>
<tr><td><code>redesign</code></td><td>재설계</td><td>구조를 바꾸는 수정. FIRST step 문항에서는 대개 오답</td></tr>
<tr><td><code>overhead</code></td><td>부가 비용</td><td>본 작업 외에 드는 비용. 탐색 호출과 중복 조사가 대표 사례</td></tr>
<tr><td><code>downstream</code></td><td>하류, 후속</td><td>이 단계 뒤에 붙는 것. "downstream consumers"는 수정할 수 없는 대상인 경우가 많음</td></tr>
<tr><td><code>upstream</code></td><td>상류, 선행</td><td>이 단계 앞에 있는 것. 원인이 여기 있는 경우가 많음</td></tr>
<tr><td><code>verbatim</code></td><td>글자 그대로</td><td>수정 없이 그대로 가져다 쓰는 것. 원본이 바뀌면 함께 영향</td></tr>
</table>
<div class="callout">📌 합계 22 + 20 + 20 + 20 + 20 + 18 = <b>120개</b>임. 전부 이 코스의 기존 문항에서 실제로 쓰인 표현.</div>`},
    ]},

  /* ================= E-5 · 30초 스캔 훈련 ================= */
  { id:"pec5", ch:"E-5", title:"30초 확인 연습: 네 가지 항목",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"긴 글에서 확인할 네 가지",
   html:`<h4>① 확인할 항목</h4>
<table>
<tr><th>항목</th><th>찾을 내용</th><th>기억하는 방법</th></tr>
<tr><td>시나리오<br><small>scenario</small></td><td>어떤 시스템인지</td><td>한 단어. 예: 추출, 리뷰 봇, 리서치, 고객지원, 이전 작업, CI</td></tr>
<tr><td>증상<br><small>symptom</small></td><td>잘못된 내용</td><td>동작 하나와 숫자 하나. 예: 8,400행 누락, 터키어 71%</td></tr>
<tr><td>제약<br><small>constraint</small></td><td>지켜야 하는 조건</td><td>짧은 한국어. 예: 다시 실행 불가, 항목 유지. 없으면 없음으로 판단</td></tr>
<tr><td>질문<br><small>ask</small></td><td>묻는 내용과 지시어</td><td>지시어와 대상. 예: MOST와 스키마 변경</td></tr>
</table>
<h4>② 확인 규칙</h4>
<ul>
<li>항목마다 다섯 단어 안으로 기억. 문장으로 정리하면 시간이 늘어남</li>
<li>숫자는 모두 확인. 예: 40%, 3 AM, 0.94, 8,400</li>
<li>도구 이름은 서로 구분할 수 있는 정도로만 읽기. 예: process_refund와 lookup_order</li>
<li>규모만 알려 주는 숫자와 판단에 쓰이는 숫자 구분. 증상 문장 안의 숫자가 판단에 쓰이는 숫자</li>
</ul>
<h4>③ 목표 시간</h4>
<ul>
<li>네 항목 확인에 30초</li>
<li>확인하지 못한 항목이 있으면 그 항목에 해당하는 부분만 다시 찾기</li>
</ul>`},

      {type:"concept", kind:"TOPIC · 주제 설명", h:"예시 1: 여러 언어의 리뷰 분류",
   html:`<ul>
<li>아래 글을 먼저 읽은 뒤 네 항목 확인</li>
</ul>
<div style="border:1px solid var(--line);background:var(--surface2);padding:10px 14px;border-radius:8px;margin:8px 0;line-height:1.7">
Your team runs a review-triage service on the Claude API. Every night it classifies roughly 40,000 customer reviews written in eleven languages into one of six product-issue categories, and the output feeds a quality dashboard used by regional managers.
<br><br>
Since the Turkish and Vietnamese locales were added six weeks ago, managers in those regions report that the dashboard shows almost everything under "general feedback." Sampling confirms it: 71% of Turkish reviews land in "general feedback" against 12% for English, even where the reviewer plainly describes shipping damage or a sizing problem.
<br><br>
The classification prompt carries eight few-shot examples, all written in English, all drawn from clear-cut cases. The six categories are keyed to three downstream reports and cannot be changed.
<br><br>
Which change MOST improves classification accuracy for the new locales?
</div>

<h4>① 네 항목</h4>
<table>
<tr><th>항목</th><th>확인한 내용</th><th>근거가 되는 위치</th></tr>
<tr><td>시나리오</td><td>밤마다 실행하는 리뷰 분류</td><td>첫 문장</td></tr>
<tr><td>증상</td><td>터키어 리뷰의 71%가 general feedback으로 분류. 영어는 12%</td><td>둘째 문단. 두 숫자를 함께 확인</td></tr>
<tr><td>제약</td><td>분류 6개 변경 불가</td><td>셋째 문단의 cannot be changed</td></tr>
<tr><td>질문</td><td>MOST와 정확도 개선</td><td>마지막 줄. 맞는 선택지가 여러 개라는 표시</td></tr>
</table>
<h4>② 선택지 판단</h4>
<table>
<tr><th>선택지</th><th>판단</th><th>근거</th></tr>
<tr><td>분류를 하나 추가</td><td>제외</td><td>제약</td></tr>
<tr><td>영어 예시 추가</td><td>제외</td><td>증상의 두 숫자. 영어는 이미 정확히 분류</td></tr>
<tr><td>모두 영어로 번역한 뒤 분류</td><td>제외</td><td>예시가 모두 분명한 경우뿐이라는 셋째 문단의 내용</td></tr>
<tr><td>새 언어의 애매한 경우를 예시로 추가</td><td>정답</td><td>증상과 원인에 모두 대응</td></tr>
</table>
<h4>③ 판단에 쓰이지 않은 내용</h4>
<ul>
<li>40,000건이라는 규모</li>
<li>언어 11개라는 숫자</li>
<li>대시보드를 보는 사람</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>few-shot 예시</b>: 지시문에 함께 넣는 입력과 출력의 본보기</li>
<li><b>locale</b>: 언어와 지역 설정. 예: 터키어, 베트남어</li>
</ul>
</div>`},

      {type:"concept", kind:"TOPIC · 주제 설명", h:"예시 2: 밤사이 실행하는 데이터 이전",
   html:`<ul>
<li>제약이 두 개이고 증상 문장 안에 원인이 적힌 글</li>
</ul>
<div style="border:1px solid var(--line);background:var(--surface2);padding:10px 14px;border-radius:8px;margin:8px 0;line-height:1.7">
A migration agent moves records from a legacy inventory database into a new schema. It runs unattended overnight in a container with no human present. For each table it reads a batch of rows, transforms them, writes them, and calls verify_batch to compare counts.
<br><br>
Last night's run reported "migration complete" at 04:12. This morning the new database is missing 8,400 rows from the supplier_lots table. The run log shows verify_batch returned ok for every batch, including three batches whose write step had timed out. The tool's author made verify_batch report ok whenever it could not reach the target database, "so a flaky connection wouldn't fail the whole migration."
<br><br>
The cutover window has closed and the legacy database is now read-only.
<br><br>
What is the correct fix?
</div>

<h4>① 네 항목</h4>
<table>
<tr><th>항목</th><th>확인한 내용</th><th>놓치기 쉬운 점</th></tr>
<tr><td>시나리오</td><td>사람 없이 밤사이 실행하는 데이터 이전</td><td>unattended와 no human present는 사람이 개입하는 답을 제외하는 표현</td></tr>
<tr><td>증상</td><td>8,400행 누락. verify_batch가 실패를 ok로 보고</td><td>누락은 결과, ok 보고는 원인. 따옴표 안의 문장이 원인 설명</td></tr>
<tr><td>제약</td><td>전체 다시 실행 불가. 이전 기간이 끝났고 원본은 읽기 전용</td><td>따로 떨어진 한 줄이라 놓치기 쉬움</td></tr>
<tr><td>질문</td><td>correct fix. 지시어 없음</td><td>최상급이 없으므로 틀린 선택지를 제외하는 방법 사용</td></tr>
</table>
<h4>② 따옴표 안의 문장</h4>
<ul>
<li>브리핑에서 누군가의 말을 따옴표로 인용한 부분은 잘못된 판단의 근거인 경우가 많음</li>
<li>예: "so one flaky source doesn't fail the whole pipeline", "error noise confuses the model", "to save tokens"</li>
<li>따옴표가 보이면 그 부분을 원인 후보로 먼저 확인</li>
</ul>
<h4>③ 정답 방향</h4>
<ul>
<li>대상 데이터베이스에 연결하지 못한 경우를 실패로 보고하도록 verify_batch 수정</li>
<li>기록에서 실패한 배치 세 개를 찾아 그 부분만 다시 이전</li>
<li>제약 때문에 전체 다시 실행은 불가. 남는 방법은 부분 복구</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>이전 작업(migration)</b>: 쓰던 시스템의 자료를 새 시스템으로 옮기는 작업</li>
<li><b>배치(batch)</b>: 한 번에 묶어 처리하는 자료 단위</li>
<li><b>읽기 전용(read-only)</b>: 읽을 수만 있고 고칠 수 없는 상태</li>
</ul>
</div>`},

      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: Two numbers, one cause",
       q:`New engineers ask an internal onboarding agent questions like "how do I request a staging database?" The agent has one tool, search_wiki, which returns the full text of every matching page from a 4,000-page internal wiki.<br><br>First-month metrics: a typical session runs 14 turns; from about turn 8 onward the agent starts answering with generic industry advice ("most teams handle staging access by...") instead of quoting the wiki pages it retrieved earlier in the same session; and 30% of sessions end with the engineer repeating their original question. Each search_wiki call returns between four and nine full pages, averaging 6,000 tokens per call.<br><br>The wiki's page structure is owned by the docs team and will not be reorganized. What is the MOST effective fix?`,
       opts:[
         {t:`Change search_wiki to return the matching excerpt plus the page title and link instead of full page text, so retrieved content stops crowding out what was established earlier in the session.`, ok:true},
         {t:`Add a system-prompt instruction telling the agent to always quote a retrieved wiki page and never answer from general knowledge.`},
         {t:`Reduce the number of matches search_wiki returns from nine to three, so fewer pages enter the conversation.`},
         {t:`Start a fresh session every eight turns, carrying over a summary of the conversation so far.`},
       ],
       hint:`②칸에 숫자를 두 개 함께 적을 것. "turn 8"과 "6,000 tokens per call"임. 이 둘을 곱하면 8번째 턴 무렵 대화에 무엇이 얼마나 쌓여 있는지가 나옴. 그리고 ③칸도 확인할 것. 무엇을 수정할 수 없는지 확인이 필요함.`,
       explain:{
         good:`숫자 두 개가 원인을 그대로 알려 줌. 호출당 6,000토큰이 여덟 턴 쌓이면 초기 대화가 컨텍스트 창에서 제외되고, 그래서 앞서 검색한 내용을 사용하지 못해 일반론으로 답하게 됨. 도구가 반환하는 양 자체를 줄이는 것이 근본 처방이고, 발췌와 제목과 링크만으로 필요한 정보는 모두 남음.`,
         wrongs:[
           `<b>B: 프롬프트 지시.</b> 가장 그럴듯한 오답임. 모델은 그 페이지를 <b>이미 보지 못하는 상태</b>임. 컨텍스트 창에서 제외됐기 때문임. 인용하라고 지시하면 인용 대신 지어내기가 늘어남.`,
           `<b>C: 결과 개수 축소.</b> 컨텍스트 점유는 줄지만 <b>페이지당 분량</b>이 그대로여서 여전히 쌓임. 게다가 관련 페이지를 놓치는 새 문제가 생김. 개수가 아니라 크기가 문제임.`,
           `<b>D: 8턴마다 새 세션.</b> 증상이 나타나는 시점에 맞춰 초기화하는 것이라 원인은 그대로이고, 요약 과정에서 구체적 링크와 절차가 다시 사라짐.`,
         ]},
       principle:"원칙 ② 근본 원인: 숫자 두 개가 곱해지는 지점"},

      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 2: What the policy says vs what it doesn't",
       q:`Your airline's baggage-claim agent handles delay-compensation requests end to end, using four tools: lookup_booking, lookup_baggage_status, issue_voucher, and escalate_to_agent. Company policy compensates delayed bags at a fixed daily rate, capped at five days.<br><br>This week a passenger asked for compensation for a bag delayed nine days, plus reimbursement for a wedding suit bought while waiting. The policy covers the delay days and caps them; it says nothing at all about replacement clothing. The agent issued a voucher covering all nine days and added a 20% "inconvenience credit."<br><br>Regulators audit these vouchers. What is the correct handling for a request like this one?`,
       opts:[
         {t:`Issue the voucher for the five days the policy actually covers, and escalate both the extra days and the clothing reimbursement to a human with a structured summary noting which parts the policy caps and which it does not address at all.`, ok:true},
         {t:`Escalate the whole request, since a mixed request that exceeds the policy cap is too risky to automate in any part.`},
         {t:`Issue the capped five-day voucher and decline the clothing reimbursement, since anything the policy does not list is denied by default.`},
         {t:`Issue the full nine days and flag the voucher for post-hoc review, so the passenger is not left waiting on a human.`},
       ],
       hint:`③칸을 정확히 채울 것. 정책이 5일까지라고 명시한 것과 아무 언급이 없는 것은 성격이 다름. 그리고 ①칸에 감사 대상이라고 적었는지 확인할 것.`,
       explain:{
         good:`요청이 세 조각임. 정책이 커버하는 5일, 정책이 상한으로 막은 4일, 정책에 조항이 없는 의류비임. 커버되는 것은 자동으로 처리하고 나머지 둘은 성격을 구분해 사람에게 넘기는 것이 정석임. 상한 초과와 정책 공백은 둘 다 에이전트가 단독으로 결정할 문제가 아님.`,
         wrongs:[
           `<b>B: 전부 에스컬레이션.</b> 정책에 명확히 포함된 5일치까지 사람에게 넘기는 과잉 대응임. 자동 해결률이 크게 떨어짐.`,
           `<b>C: 언급이 없으면 거절.</b> 거절도 정책을 지어내는 것임. 정책은 의류비를 금지한 적이 없고 아무 언급이 없을 뿐임. 규제 감사에서 문제가 되는 것은 승인만이 아님.`,
           `<b>D: 전액 + 사후 검토.</b> 지문 속 에이전트가 실제로 한 행동임. 상한을 초과했고, 20% 크레딧은 존재하지 않는 정책을 만들어낸 것이며, 사후 검토는 이미 발행된 바우처를 되돌리지 못함.`,
         ]},
       principle:"원칙 ⑤ 처리할 수 있는 것은 처리하고 정책 공백은 사람에게 넘길 것"},

      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 3: Scan, then flip",
       q:`A weekly inventory-forecast system runs a coordinator plus three subagents: demand_history, supplier_lead_times, and promotions_calendar. Each writes its own section and the coordinator assembles the report.<br><br>Last week the promotions subagent's data source was unreachable. It returned an empty section with the line "no promotions data available for this period." The coordinator assembled the report anyway, and the merchandising team ordered against a forecast that silently ignored a two-week promotion. A review of six weeks of runs found four other nights where a subagent's source was unreachable and the report still shipped as complete.<br><br>The report must be produced every week — merchandising treats a missing forecast as a failed control. Which change would be LEAST effective at preventing a repeat?`,
       opts:[
         {t:`Instruct each subagent in its prompt to be careful to distinguish "found nothing" from "could not run" when it writes its section.`, ok:true},
         {t:`Have subagents return a structured result that separates the scan outcome from the run outcome, so "could not run" cannot be represented as "nothing found."`},
         {t:`Have the coordinator inspect each subagent's run outcome before assembling, and mark the forecast as partial — naming the section that did not run — while still shipping it.`},
         {t:`Have the coordinator treat a declared data gap as a blocking condition that must appear in the report header rather than as an ordinary empty section.`},
       ],
       hint:`④칸에 지시어를 적었는지 확인할 것. 대문자 한 단어가 있음. 그리고 나머지 셋 중에서 코드가 강제하는 것과 요청에 그치는 것을 구분할 것. 요청에 그치는 것이 몇 개인지 확인할 것.`,
       explain:{
         good:`LEAST effective는 나머지 셋이 모두 효과가 있고 하나만 효과가 없다는 뜻임. A는 프롬프트로 구분을 요청하는 것인데 이것은 확률적이므로 다시 놓칠 수 있음. 같은 사고가 여섯 주에 다섯 번 발생했다는 것은 개별 판단의 문제가 아니라 <b>구조가 실패를 표현할 방법을 제공하지 않은 것</b>이라는 뜻임.`,
         wrongs:[
           `<b>B: 실행 결과와 조회 결과 분리.</b> 효과가 있음. 실행하지 못했음을 결과 없음으로 표현할 수 없게 만드는 것이 근본 처방임.`,
           `<b>C: 부분 표시 후 발행.</b> 효과가 있음. 제약(매주 발행)을 지키면서 누락을 드러냄.`,
           `<b>D: 헤더에 차단 조건 표시.</b> 효과가 있음. 빈 섹션이 평범한 결과로 섞이지 않도록 눈에 띄는 위치로 올림.`,
         ]},
       principle:"원칙 ① 강제는 프로그램으로: 요청만으로는 구조가 바뀌지 않음"},
    ]},

  /* ================= E-6 · 영어 독해 미니테스트 ================= */
  { id:"petest", type:"test", title:"E 미니테스트: 영어 독해 10문항",
    questions:[

    /* ---- E-1 문항 해부 ---- */
    {ts:"E-1", lvl:"기초", q:`Your extraction pipeline writes one typed JSON record per contract. A document type that appeared last month has no renewal clause at all, and the model has been filling renewal_term_months with 12 on those documents. The three dashboards that read these records are owned by other teams and cannot be changed this quarter. Which schema change fits?`,
     opts:[
       {t:`Make renewal_term_months nullable and instruct the model to return null when the document contains no renewal clause, so the field stays present in every record.`, ok:true},
       {t:`Drop renewal_term_months from the schema for that document type, since a field with no source value should not be emitted at all.`},
       {t:`Constrain renewal_term_months with an enum of 6, 12, 24, and 36 so the model can only emit terms that actually exist in your contracts.`},
       {t:`Lower the temperature on the extraction call so the model stops inventing a renewal term.`}],
     explain:{good:`질문 문장 앞에 붙은 "cannot be changed this quarter"가 필드를 삭제하는 답을 탈락시킴. 그리고 원인은 값이 <b>아예 없는</b> 경우이므로 처방은 nullable임. 없는 값은 null, 있지만 맞지 않는 값은 unclear임. 이 구분이 자주 출제됨.`,
       wrongs:[`<b>B: 필드 제거.</b> 제약을 직접 위반함. 하류 대시보드가 그 필드를 기대하고 있는데 레코드에서 빠지면 그쪽이 동작하지 않음.`,`<b>C: enum 추가.</b> 값이 없는 문서에 목록을 줘도 여전히 넷 중 하나를 고르게 될 뿐임. enum은 값이 있지만 맞지 않을 때의 도구임.`,`<b>D: 온도 낮추기.</b> 온도는 무작위성을 줄일 뿐 값이 없다는 사실을 표현할 방법을 주지 않음. 규칙을 만드는 수단이 아님.`]},
     principle:"제약 구절이 보기 하나를 정확히 겨냥함"},

    {ts:"E-1", lvl:"실전", q:`SCENARIO: A CI job runs Claude Code on every pull request and posts a review comment.<br>SITUATION: It runs inside a container with no TTY. The job invokes the CLI, waits, and posts whatever text comes back.<br>SYMPTOMS: Two thirds of runs end with the CLI still sitting at an interactive prompt and an empty comment body. The runs that do finish post free-form prose, which the comment parser silently discards.<br>CONSTRAINT: The parser belongs to another team, consumes strict JSON only, and will not change this quarter.<br>QUESTION: Which single change addresses both symptoms?`,
     opts:[
       {t:`Invoke the CLI with -p for non-interactive execution together with --output-format json, so the run never waits for input and the output is parseable by the parser that already exists.`, ok:true},
       {t:`Replace the plain invocation with --output-format json, which covers both non-interactive execution and structured output in a single flag.`},
       {t:`Invoke the CLI with -p and extend the comment parser so it also accepts prose output.`},
       {t:`Keep the invocation as it is, wrap it in a shell timeout, and retry the job up to three times so hung runs are killed and one eventually posts.`}],
     explain:{good:`증상이 두 개임. 대화형 프롬프트에서 멈추는 것과 산문 출력이 버려지는 것임. 각각 -p와 --output-format json이 필요하고 질문이 "single change"이므로 <b>한 보기 안에 둘 다 들어 있어야</b> 함. 제약이 파서 수정을 막았으므로 그 답은 탈락함.`,
       wrongs:[`<b>B: 플래그 하나로 해결.</b> --output-format json은 출력 형태만 담당함. -p를 대신하지 않으므로 멈춤 증상이 그대로 남음. 실전에서 자주 틀리는 지점임.`,`<b>C: 파서 확장.</b> "will not change this quarter"를 직접 위반함. 맞는 말처럼 들려도 조건 위반이면 오답임.`,`<b>D: 타임아웃 + 재시도.</b> 멈춤은 없애지만 산문 출력 문제는 다루지 않음. "both symptoms"를 충족하지 못함.`]},
     principle:"증상 개수 = 처방 개수, 제약은 보기를 탈락시킴"},

    /* ---- E-2 지시어 ---- */
    {ts:"E-2", lvl:"기초", q:`A team is deciding where to enforce the rule "identity must be verified before any account change." Three of the four statements below are accurate reasons to enforce it with a PreToolUse hook rather than a system-prompt instruction. Which one is NOT accurate?`,
     opts:[
       {t:`A hook lets the model reason about exceptions the rule's author did not anticipate, which a prompt instruction cannot support.`, ok:true},
       {t:`A prompt instruction is followed probabilistically, so a nonzero share of calls will skip verification no matter how the instruction is worded.`},
       {t:`A hook can block the tool call itself, so a violation never reaches the account-change tool.`},
       {t:`A hook's behavior is auditable — every blocked call leaves the same record regardless of how the request was phrased.`}],
     explain:{good:`부정형임. 셋은 맞는 말이고 하나만 틀림. A는 훅의 성질을 반대로 서술함. 훅의 가치는 <b>모델의 재량을 없애는 것</b>이지 예외를 판단하게 하는 것이 아님. 유연한 판단이 필요하다면 그것은 훅으로 강제할 규칙이 아님.`,
       wrongs:[`<b>B:</b> 맞는 말임. 프롬프트 준수는 확률적이므로 실패율이 0이 아님.`,`<b>C:</b> 맞는 말임. PreToolUse는 호출 자체를 차단할 수 있는 지점임.`,`<b>D:</b> 맞는 말임. 표현이 어떻든 같은 기록이 남는 것이 감사 대응의 핵심임.`]},
     principle:"부정형: 뒤집는 것은 NOT 하나뿐"},

    {ts:"E-2", lvl:"실전", multi:2, q:`An expense agent occasionally submits a report before validate_receipt has run for that expense, producing rejected filings. Finance wants a guarantee, not an improvement. Which TWO changes provide it? (Select TWO.)`,
     opts:[
       {t:`Add a PreToolUse hook that blocks submit_report whenever no validation result has been recorded for that expense.`, ok:true},
       {t:`Make validate_receipt a programmatic prerequisite in the code path, so submit_report cannot execute until validation returns.`, ok:true},
       {t:`Add a line to the system prompt instructing the agent to always validate receipts before submitting a report.`},
       {t:`Add a few-shot example that demonstrates the correct order of the two calls.`},
       {t:`Lower the temperature so the agent's ordering of the two calls becomes more consistent.`}],
     explain:{good:`지시어가 두 개임. "a guarantee, not an improvement"가 확률적 처방을 전부 탈락시키고 "TWO"가 개수를 지정함. 코드가 강제하는 것은 훅 차단과 전제조건 게이트 둘뿐임. 하나만 고르고 넘어가면 그 문항은 오답 처리되므로 복수응답은 <b>보기 다섯 개를 끝까지 읽는 것</b>이 규칙임.`,
       wrongs:[`<b>C: 시스템 프롬프트 지시.</b> 확률적임. "occasionally" 같은 실패율 언급이 지문에 있으면 프롬프트 답은 이미 탈락한 것임.`,`<b>D: few-shot 예시.</b> 성향을 강화할 뿐 순서를 보장하지 않음.`,`<b>E: temperature 낮추기.</b> 무작위성만 줄임. 실행 순서를 강제하는 수단이 아님.`]},
     principle:"원칙 ① 강제는 프로그램으로 + 개수 지시 확인"},

    /* ---- E-3 조건 구절 ---- */
    {ts:"E-3", lvl:"기초", q:`Your automated review bot comments on every pull request. False positives run at 40% and developers have started ignoring the comments entirely. Team constraint: findings must NOT be suppressed before a human has seen them. What is the correct change?`,
     opts:[
       {t:`Rank the findings by severity and attach the supporting evidence to each one, so low-value items sink below the ones worth reading while every finding still appears in the comment.`, ok:true},
       {t:`Drop findings whose confidence falls below a threshold before the comment is posted, so only findings likely to be real reach developers.`},
       {t:`Post only the three highest-severity findings per pull request and leave the rest in the job log for anyone who wants to dig them out.`},
       {t:`Move the bot's output to a separate channel that developers can opt into, so pull-request comments stay clean.`}],
     explain:{good:`"must NOT be suppressed before a human has seen them"이 처방의 종류 자체를 제한함. 삭제는 금지되고 남은 방법은 <b>순서와 맥락을 바꾸는</b> 쪽임. 심각도 정렬과 근거 첨부는 전부 남기면서 읽는 순서를 바꿈.`,
       wrongs:[`<b>B: 신뢰도 기준 삭제.</b> 제약을 직접 위반함. 사람이 보기 전에 삭제하는 것이 정확히 금지된 행동이고, 신뢰도는 실제 정확도도 아님.`,`<b>C: 상위 3건만 노출.</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 로그에 남긴다고 해도 <b>사람이 보는 자리에서는 사라진 것</b>이므로 제약을 위반함.`,`<b>D: 별도 채널로 이동.</b> 옵트인이므로 대부분이 확인하지 않음. 노이즈 문제도 그대로이고 사실상 억제와 같은 결과임.`]},
     principle:"제약이 처방의 종류를 제한함: 삭제가 막히면 정렬로"},

    {ts:"E-3", lvl:"실전", q:`Your invoice agent auto-approves vendor invoices end to end. Compliance now requires that every invoice containing a tax-ID field go to human review — as a guarantee, not a best effort — while invoices without one stay fully automated. Extraction confidence on the tax_id field currently averages 0.94. Which implementation satisfies both requirements?`,
     opts:[
       {t:`A programmatic gate that routes any extraction whose tax_id field is populated to human review regardless of its confidence score, leaving every other invoice on the automated path.`, ok:true},
       {t:`Route an invoice to human review whenever its tax_id confidence score falls below 0.90, since an unreliable field is what creates the compliance risk.`},
       {t:`Add a system-prompt rule instructing the agent to always escalate any invoice on which it finds a tax ID.`},
       {t:`Route every invoice to human review and let reviewers fast-approve the ones with no tax ID, so nothing containing a tax ID can slip through.`}],
     explain:{good:`조건이 두 개임. 강도(guarantee)와 유지(stay fully automated)임. 코드가 강제하는 게이트이므로 보장이고, 신뢰도와 무관하게 걸러 "regardless"까지 만족하며, tax_id가 없는 인보이스는 건드리지 않으므로 자동화도 유지됨.`,
       wrongs:[`<b>B: 신뢰도 0.90 기준.</b> 지문이 평균 0.94라고 알려 주었음. 대부분이 기준선을 넘어 자동 승인됨. 요구는 tax ID가 있으면이지 신뢰도가 낮으면이 아님.`,`<b>C: 프롬프트 규칙.</b> "a guarantee, not a best effort"가 이 종류를 전부 탈락시킴.`,`<b>D: 전부 사람에게.</b> 보장은 되지만 두 번째 조건을 위반함. 절반만 만족하는 답이 가장 그럴듯하게 서술되어 있음.`]},
     principle:"조건이 두 개면 둘 다 대조할 것"},

    /* ---- E-4 어휘 ---- */
    {ts:"E-4", lvl:"기초", q:`A booking agent's payment tool returned {"isError": true, "errorCategory": "validation", "isRetryable": false, "message": "seat_count must be a positive integer; received 0"}. The agent's next move was to call the same tool six more times with identical arguments. What does that tool result actually tell the agent to do?`,
     opts:[
       {t:`Correct the argument — a validation failure means an identical call fails identically, so seat_count has to change before another attempt makes sense.`, ok:true},
       {t:`Wait and retry with backoff, since the payment service may be temporarily unavailable and the call could succeed on a later attempt.`},
       {t:`Escalate to a human, since the tool has declared the request unrecoverable by the agent.`},
       {t:`Fall back to a different payment tool, since this one has rejected the request outright.`}],
     explain:{good:`세 항목이 행동을 정함. errorCategory "validation"은 입력이 틀렸다는 뜻이고, isRetryable false는 같은 인자로는 몇 번을 호출해도 동일하다는 뜻임. message가 무엇을 고쳐야 하는지까지 알려 주었음. transient였다면 재시도가 맞고, business였다면 대안 경로나 에스컬레이션임.`,
       wrongs:[`<b>B: 백오프 재시도.</b> transient일 때의 처방임. 여기는 validation이고 isRetryable이 false이므로 재시도 자체가 의미가 없음.`,`<b>C: 에스컬레이션.</b> 에이전트가 스스로 고칠 수 있는 입력 오류임. 사람에게 넘길 사안이 아님.`,`<b>D: 다른 도구로 우회.</b> 도구가 거부한 것이 아니라 <b>인자</b>가 거부된 것임. 다른 도구도 seat_count 0은 동일하게 거부함.`]},
     principle:"errorCategory 세 종류가 곧 세 가지 행동"},

    {ts:"E-4", lvl:"실전", q:`A named session holds a full dependency analysis of a 300-file service. Overnight an automated formatter rewrote every file in the repository, changing whitespace and import ordering but no logic. You need to continue the analysis this morning with minimal token spend. Two teammates disagree about whether the session is stale. What is the correct call?`,
     opts:[
       {t:`Resume the session and tell the agent that a repository-wide formatting pass changed whitespace and import order only, so it re-reads files just where exact line references matter.`, ok:true},
       {t:`Start a fresh session with a structured summary of yesterday's conclusions — every file in the repository changed, so all of the session's tool results are stale.`},
       {t:`Resume the session without mentioning the formatting pass, since no logic changed and the dependency conclusions are unaffected.`},
       {t:`Fork the session so the original analysis stays intact while you continue the dependency work in the branch.`}],
     explain:{good:`stale은 파일이 바뀌었는지가 아니라 <b>기록해 둔 결론이 아직 유효한지</b>임. 포맷 변경은 의존성 결론을 무효화하지 않으므로 300파일 분석을 버릴 이유가 없음. 다만 라인 번호와 정확한 인용은 어긋나므로 그 사실만 고지하면 됨. "minimal token spend" 구절이 전면 재분석 답을 한 번 더 탈락시킴.`,
       wrongs:[`<b>B: 새 세션.</b> 가장 그럴듯한 오답임. 모든 파일이 바뀐 것은 사실이지만 <b>의미는 바뀌지 않았음</b>. 유효한 대규모 분석을 버리는 데다 토큰 상한 조건까지 위반함.`,`<b>C: 고지 없이 재개.</b> 라인 번호나 import 위치를 근거로 답할 때 낡은 좌표를 그대로 사용하게 됨.`,`<b>D: fork.</b> fork는 두 접근을 나눠 비교할 때 사용함. 분기해도 낡은 좌표 문제는 그대로 남음.`]},
     principle:"stale은 변경의 범위가 아니라 결론의 유효성으로 판단함"},

    /* ---- E-5 스캔 ---- */
    {ts:"E-5", lvl:"기초", q:`A hiring-support agent screens inbound applications. For each one it calls parse_resume, then score_fit, then writes a one-paragraph summary for the recruiter.<br><br>Since volume doubled in March, recruiters report that summaries for applications processed late in a batch mention skills that appear nowhere in that candidate's resume. Logs show parse_resume returns each resume's full text — often 3,000+ tokens — and every parsed resume stays in the conversation for the whole batch of 60 applications.<br><br>Applications must be processed in a single batch run: the recruiter tooling polls for one combined output file. What is the correct fix?`,
     opts:[
       {t:`Process each application in its own isolated context so one candidate's resume text cannot bleed into another's summary, and assemble the per-application results into the single combined file the recruiter tooling expects.`, ok:true},
       {t:`Keep the single conversation but instruct the agent to use only the most recent parse_resume result when writing each summary.`},
       {t:`Have parse_resume return a trimmed 300-token extract so all 60 resumes fit comfortably inside one conversation.`},
       {t:`Split the batch into six runs of ten applications each and merge the six output files afterwards.`}],
     explain:{good:`증상은 <b>다른 지원자의 내용이 섞여 들어가는 것</b>이므로 원인은 60명의 이력서가 한 대화에 함께 있다는 데 있음. 후보별 격리가 근본 처방이고, 제약("single batch run · one combined output file")은 결과를 합쳐 하나로 내보내는 것으로 지킬 수 있음.`,
       wrongs:[`<b>B: 최근 결과만 쓰라고 지시.</b> 확률적임. 게다가 다른 이력서가 여전히 컨텍스트에 있는 한 섞임은 계속 발생함.`,`<b>C: 300토큰으로 축약.</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 컨텍스트 점유는 줄어도 <b>교차 오염 자체는 남음</b>. 60명분이 여전히 한 대화 안에 있기 때문임. 게다가 판단에 필요한 근거까지 잘려 나감.`,`<b>D: 여섯 번으로 분할.</b> 제약을 직접 위반함. 단일 배치 실행과 단일 출력 파일이 요구 조건이었음.`]},
     principle:"③칸 제약이 복구 방식을 정함"},

    {ts:"E-5", lvl:"실전", q:`SCENARIO: A nightly security-review system runs a coordinator plus three subagents — dependency_scan, secrets_scan, and config_scan — and posts one combined report to the security channel.<br>SITUATION: Each subagent writes its own section and the coordinator concatenates them.<br>SYMPTOMS: Last Thursday the secrets_scan provider was rate-limited and the subagent returned an empty section reading "no secrets found." The report shipped green. Two days later a live credential was found in the repository. Reviewing six weeks of reports turned up four other nights where a subagent's provider was unreachable and the report still shipped green.<br>CONSTRAINT: The report must ship every night — the security team treats a missing report as a failed control.<br>QUESTION: Which change would be LEAST effective at preventing a repeat?`,
     opts:[
       {t:`Instruct each subagent in its prompt to take care to distinguish "found nothing" from "could not run" when it writes its section.`, ok:true},
       {t:`Have subagents return a structured result that separates the scan outcome from the run outcome, so "could not run" cannot be represented as "no findings."`},
       {t:`Have the coordinator check each subagent's run outcome before assembling, and fail the control explicitly when a scan did not run — while still shipping the report.`},
       {t:`Have the coordinator mark the combined report as partial, naming the scan that did not run, instead of posting it as green.`}],
     explain:{good:`부정형이므로 셋은 효과가 있고 하나만 효과가 없음. A는 프롬프트로 구분을 요청하는 것이라 확률적이고, 여섯 주에 다섯 번 같은 일이 발생했다는 것은 개별 부주의가 아니라 <b>구조가 실행하지 못했음을 표현할 자리를 주지 않은 것</b>이라는 근거임. 요청만으로는 그 자리가 생기지 않음.`,
       wrongs:[`<b>B:</b> 효과가 있음. 실행 결과와 조회 결과를 분리하면 실패를 결과 없음으로 표현할 수 없게 됨.`,`<b>C:</b> 효과가 있음. 제약(매일 밤 발행)을 지키면서 통제 실패를 명시적으로 드러냄.`,`<b>D:</b> 효과가 있음. 초록으로 발행되던 리포트에 부분 표시가 붙어 사람이 알아챌 수 있음.`]},
     principle:"원칙 ① 강제는 프로그램으로: 요청만으로는 구조가 바뀌지 않음"},
    ]},

  ]
};
