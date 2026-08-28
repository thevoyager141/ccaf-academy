/* PART E: 시험 영어 */
window.CCAF_CONTENT.pe = {
  id: "pe",
  lessons: [

  /* ================= E-1 · 시험 문항 해부 ================= */
  { id:"pec1", ch:"E-1", title:"시험 문항 해부",
    steps:[
      {type:"concept", kind:"PART BRIEFING · 파트 설명", h:"PART E: 영어 학습이 아니라 이 시험 영어의 패턴을 익히는 파트",
       html:`<p class="lead">이 파트는 <strong>Exam English</strong>(시험 영어)를 다룸. 공식 시험 범위에 포함된 파트는 아니지만, 영어 지문 자체가 가장 큰 장벽이 되기 때문에 따로 구성함.</p>
        <h4>이 파트가 필요한 이유</h4>
        <ul>
          <li>이 시험의 문항은 지문과 선택지가 전부 영어로 출제됨</li>
          <li>실전은 <strong>60문항 · 120분</strong>이므로 한 문항에 쓸 수 있는 시간은 2분임. 긴 영어 지문을 처음부터 끝까지 정독하면 그 2분이 읽는 데만 소모됨</li>
          <li>내용을 알고도 시간이 부족해 풀지 못하는 상태가 발생함. 이것은 지식의 문제가 아니라 읽는 순서의 문제임</li>
        </ul>
        <h4>이 파트가 다루지 않는 것</h4>
        <ul>
          <li>영어 자체를 가르치지 않음. 문법 설명과 단어 암기는 포함하지 않음</li>
          <li>대신 <strong>이 시험의 영어가 반복하는 패턴</strong>만 다룸: 문항 구조, 지시어, 조건 구절, 반복 어휘</li>
          <li>패턴의 수는 한정되어 있음. 60문항이 서로 다른 영어를 쓰는 것이 아니라 같은 형식에 내용만 바뀌어 출제됨</li>
        </ul>
        <h4>구성</h4>
        <ul>
          <li><strong>E-1 문항 해부</strong>: 문항이 어떤 구성 요소로 되어 있고 2분 안에 어디부터 읽어야 하는지</li>
          <li><strong>E-2 지시어 사전</strong>: 지시어(qualifier)인 MOST / BEST / FIRST / LEAST / NOT이 각각 요구하는 답의 성격</li>
          <li><strong>E-3 조건을 숨기는 표현</strong>: 한 구절 때문에 정답이 바뀌는 지점</li>
          <li><strong>E-4 시험 어휘장</strong>: 기존 문항에서 실제로 쓰인 표현 120개</li>
          <li><strong>E-5 30초 스캔 훈련</strong>: 긴 지문에서 네 가지만 확인하는 방법</li>
          <li><strong>E-6 영어 독해 미니테스트</strong>: 10문항</li>
        </ul>`},

      {type:"concept", kind:"CONCEPT · 개념 설명", h:"문항은 성격이 다른 구성 요소 여섯 개로 이루어짐",
       html:`<p class="lead">시험 문항이 길어 보이는 이유는 문장이 어렵기 때문이 아님. <strong>성격이 완전히 다른 구성 요소 여섯 개</strong>가 하나로 붙어 있기 때문임. 구성 요소를 구분할 수 있으면 어디를 건너뛸지가 바로 보임.</p>
        <h4>구성 요소 6종</h4>
        <ul>
          <li><strong>① 시나리오 브리핑(scenario briefing)</strong>: 어떤 시스템에 관한 이야기인지 소개함. V2는 시나리오 4개 아래에 문항이 묶여 출제되므로, 같은 묶음의 문항들은 <strong>이 브리핑을 공유함</strong></li>
          <li><strong>② 상황 서술(situation)</strong>: 현재 무엇을 하고 있는지. 팀 구성, 도구 목록, 목표치</li>
          <li><strong>③ 증상 · 로그 · 수치(symptoms)</strong>: 무엇이 잘못됐는지. <code>40% false positives</code>, <code>crashed at 3 AM</code>, <code>8,400 rows</code> 같은 구체적 숫자가 여기에 나옴</li>
          <li><strong>④ 제약(constraint)</strong>: 지켜야 하는 조건. 보통 <strong>한 구절</strong>이며, 이것이 정답을 가름</li>
          <li><strong>⑤ 질문(stem)</strong>: 실제로 묻는 문장. 거의 항상 <strong>맨 마지막 한 문장</strong>이고 물음표로 끝남</li>
          <li><strong>⑥ 보기(options)</strong>: 4개, 복수응답이면 5개</li>
        </ul>
        <h4>구성 요소마다 정보 밀도가 다름</h4>
        <ul>
          <li>①②는 <strong>길지만 정보량이 적음</strong>. 배경이므로 정답 판별에 거의 쓰이지 않음</li>
          <li>③④⑤는 <strong>짧지만 정보량이 거의 전부임</strong>. 정답 조건이 여기에 모두 들어 있음</li>
          <li>⑥은 <strong>지문만큼 김</strong>. 보기 4개를 합치면 지문 절반 분량인 경우가 흔함</li>
          <li>그러므로 위에서 아래로 정독하는 방식이 가장 불리함. 밀도가 낮은 곳에서 시간을 소모하고, 보기를 읽다가 <strong>지문으로 되돌아가게 됨</strong>. 결과적으로 2회독이 됨</li>
        </ul>
        <div class="callout">📖 용어 카드. <b>stem(스템)</b>: 시험 업계 용어로 실제로 묻는 문장을 가리킴. 지문 전체가 아니라 물음표가 붙은 한 줄만 해당함. <b>option(옵션·보기)</b>: A~E 선택지. <b>distractor(디스트랙터)</b>: 오답 보기를 부르는 말. 주의를 분산시키는 것이라는 뜻이며, 실제로 그 목적으로 설계됨.</div>`},

      {type:"concept", kind:"TOPIC · 주제 설명", h:"실제 형태의 문항 하나를 구성 요소별로 분해하기",
       html:`<p class="lead">아래는 실전과 같은 형태로 만든 문항 하나임. 구성 요소마다 색 표시를 붙여 둠. 왼쪽 색 막대만 보고도 배경인지 결정적인 부분인지 구분되어야 함.</p>
        <div style="font-size:12px;color:var(--muted);margin:8px 0">
          <span style="color:var(--dim)">■ 회색 = 배경 (건너뛰어도 됨)</span> &nbsp;·&nbsp;
          <span style="color:var(--no)">■ 빨강 = 증상·수치</span> &nbsp;·&nbsp;
          <span style="color:var(--warn)">■ 노랑 = 제약</span> &nbsp;·&nbsp;
          <span style="color:var(--accent)">■ 주황 = 질문</span> &nbsp;·&nbsp;
          <span style="color:var(--ok)">■ 초록 = 보기</span>
        </div>

        <div style="border-left:4px solid var(--dim);background:var(--surface2);padding:8px 12px;margin:8px 0;border-radius:0 8px 8px 0">
          <div style="font-size:10.5px;font-weight:700;letter-spacing:.7px;color:var(--dim)">① SCENARIO BRIEFING · 시나리오 브리핑</div>
          <div style="margin-top:4px">Your team runs a structured data extraction service built on the Claude API. It processes scanned supplier contracts and returns typed JSON for a procurement dashboard.</div>
          <div style="font-size:12px;color:var(--muted);margin-top:5px">→ 확인할 것: <b>계약서 추출 · JSON · 대시보드</b> 세 단어. 같은 시나리오의 다음 문항에서는 읽지 않음</div>
        </div>

        <div style="border-left:4px solid var(--dim);background:var(--surface2);padding:8px 12px;margin:8px 0;border-radius:0 8px 8px 0">
          <div style="font-size:10.5px;font-weight:700;letter-spacing:.7px;color:var(--dim)">② SITUATION · 상황 서술</div>
          <div style="margin-top:4px">The pipeline uses a single extraction tool defined with a strict JSON schema. Fields include governing_law, renewal_term_months, and termination_notice_days. Roughly 9,000 contracts are processed each night.</div>
          <div style="font-size:12px;color:var(--muted);margin-top:5px">→ 확인할 것: <b>필드 이름 하나</b>인 renewal_term_months. 나머지 필드와 9,000이라는 숫자는 이 문항에서 쓰이지 않음. 배경 숫자와 결정적 숫자를 구분하는 방법은 E-5에서 다룸</div>
        </div>

        <div style="border-left:4px solid var(--no);background:var(--no-soft);padding:8px 12px;margin:8px 0;border-radius:0 8px 8px 0">
          <div style="font-size:10.5px;font-weight:700;letter-spacing:.7px;color:var(--no)">③ SYMPTOMS · 증상 · 수치</div>
          <div style="margin-top:4px">Since last week's schema update, the dashboard shows renewal_term_months: 12 for a batch of contracts that are one-time purchase orders with no renewal clause at all. Spot checks confirm the source documents contain no renewal language.</div>
          <div style="font-size:12px;color:var(--muted);margin-top:5px">→ 확인할 것: <b>없는 값을 12로 채워 넣음</b>. 이 한 줄이 nullable(값이 없음)인지 enum 확장(값이 맞지 않음)인지를 이미 결정함</div>
        </div>

        <div style="border-left:4px solid var(--warn);background:var(--warn-soft);padding:8px 12px;margin:8px 0;border-radius:0 8px 8px 0">
          <div style="font-size:10.5px;font-weight:700;letter-spacing:.7px;color:var(--warn)">④ CONSTRAINT · 제약</div>
          <div style="margin-top:4px">The dashboard's downstream consumers cannot be modified this quarter, so the field must remain present in every record.</div>
          <div style="font-size:12px;color:var(--muted);margin-top:5px">→ 확인할 것: <b>필드를 삭제하면 안 됨</b>. 이 한 문장이 그 필드를 빼라는 보기를 탈락시킴. 제약은 대개 이렇게 <strong>보기 하나를 정확히 겨냥해서</strong> 놓임</div>
        </div>

        <div style="border-left:4px solid var(--accent);background:var(--accent-soft);padding:8px 12px;margin:8px 0;border-radius:0 8px 8px 0">
          <div style="font-size:10.5px;font-weight:700;letter-spacing:.7px;color:var(--accent)">⑤ QUESTION (STEM) · 질문</div>
          <div style="margin-top:4px">What is the MOST effective schema change?</div>
          <div style="font-size:12px;color:var(--muted);margin-top:5px">→ 확인할 것: <b>MOST</b>(최상급이므로 여러 보기가 맞는 말이라는 뜻) + <b>schema change</b>(스키마를 수정하는 답만 후보). 여덟 단어에 판단 기준 두 개가 들어 있음</div>
        </div>

        <div style="border-left:4px solid var(--ok);background:var(--ok-soft);padding:8px 12px;margin:8px 0;border-radius:0 8px 8px 0">
          <div style="font-size:10.5px;font-weight:700;letter-spacing:.7px;color:var(--ok)">⑥ OPTIONS · 보기</div>
          <div style="margin-top:4px">
            A. Make renewal_term_months nullable and instruct the model to return null when the contract has no renewal clause.<br>
            B. Remove renewal_term_months from the schema for purchase-order documents.<br>
            C. Add an enum of common renewal terms (6, 12, 24, 36) so the model only picks valid values.<br>
            D. Lower the temperature so the model stops inventing values.
          </div>
          <div style="font-size:12px;color:var(--muted);margin-top:5px">→ B는 ④ 때문에 탈락하고, C는 ③ 때문에 탈락함(값이 없는 문서에 목록을 줘도 여전히 하나를 고르게 됨). D는 온도로 규칙을 만들 수 없음. 남는 것은 A임</div>
        </div>

        <div class="callout">🎯 여기서 확인되는 것. 답을 결정한 것은 ③과 ④이고 합쳐서 <b>영어 세 문장</b>임. ①②의 다섯 문장은 하나도 쓰이지 않음. 그런데 정독하면 ①②를 먼저, 그것도 가장 천천히 읽게 됨.</div>`},

      {type:"concept", kind:"TOPIC · 주제 설명", h:"2분을 지키는 읽기 순서: 질문부터 읽고 배경은 마지막",
       html:`<p class="lead">구성 요소를 파악했으면 다음은 순서임. 위에서 아래로 읽지 말고 <strong>⑤ → ④ → ⑥ → ③ → ②①</strong> 순으로 읽을 것.</p>
        <h4>순서와 이유</h4>
        <table>
          <tr><th>순서</th><th>어디를</th><th>왜 여기부터인가</th></tr>
          <tr><td>1</td><td>⑤ 질문. 맨 마지막 물음표 문장</td><td>무엇을 묻는지 모르고 지문을 읽으면 <b>전부 중요해 보임</b>. 질문을 먼저 알면 읽는 목적이 생겨 나머지가 걸러짐</td></tr>
          <tr><td>2</td><td>④ 제약</td><td>정답을 가르는 한 구절. 질문 문장 안이나 <b>바로 앞 문장</b>에 붙어 있는 경우가 대부분임</td></tr>
          <tr><td>3</td><td>⑥ 보기 4~5개</td><td>보기를 먼저 보면 <b>지문에서 확인할 것이 특정됨</b>. A가 nullable이고 C가 enum이면 지문에서 찾을 것은 값이 없는 것인지 맞지 않는 것인지 하나임</td></tr>
          <tr><td>4</td><td>③ 증상 · 수치</td><td>보기를 가르는 근거. 여기서 결정됨</td></tr>
          <tr><td>5</td><td>② 상황 · ① 브리핑</td><td>③④로 이미 갈렸으면 <b>읽지 않고 넘어감</b>. 갈리지 않았을 때만 확인함</td></tr>
        </table>
        <h4>같은 문항을 두 가지 순서로 읽었을 때의 차이</h4>
        <ul>
          <li><strong>정독 순서</strong>: 브리핑 30단어 → 상황 40 → 증상 45 → 제약 20 → 질문 8 → 보기 90. <strong>233단어를 모두 읽은 뒤에야</strong> 무엇을 묻는지 알게 됨. 그리고 보기를 읽다가 지문으로 되돌아가므로 사실상 <strong>2회독</strong>이 됨</li>
          <li><strong>역순</strong>: 질문 8 → 제약 20 → 보기 90 → 증상 45. <strong>163단어에서 답이 나오고</strong> 브리핑과 상황 70단어는 읽지 않음</li>
          <li>실제 절약 효과는 단어 수보다 <strong>되돌아 읽기를 없앤 데</strong> 있음. 정독 순서는 거의 항상 2회독이 됨</li>
        </ul>
        <h4>시나리오 묶음에서 시간을 더 줄이는 방법</h4>
        <ul>
          <li>V2는 시나리오 문항 풀 6개 중 4개가 선택되고, 문항이 그 아래에 묶여 출제됨</li>
          <li>같은 시나리오의 <strong>①브리핑은 첫 문항에서 한 번만</strong> 읽고 두 번째 문항부터는 건너뜀. 같은 텍스트임</li>
          <li>대신 첫 문항에서 읽을 때 <strong>시스템 이름 하나와 도구 이름 3~4개</strong>를 기억해 둘 것. 뒤 문항에서 그 이름이 나오면 배경을 아는 상태로 시작함</li>
        </ul>
        <h4>순서를 바꿔야 하는 예외 두 가지</h4>
        <ul>
          <li><strong>부정형</strong>: <code>NOT</code> / <code>LEAST</code> / <code>EXCEPT</code> / <code>FALSE</code>가 보이면 보기를 먼저 모두 읽고 참·거짓을 표시하는 편이 빠름. E-2에서 다룸</li>
          <li><strong>복수응답</strong>: <code>Select TWO</code>가 붙으면 보기 5개를 모두 읽어야 개수를 맞출 수 있음. 하나를 찾았다고 멈추면 그 문항은 오답이 됨</li>
        </ul>
        <div class="callout">⏱ 실전 시간 배분. 질문과 제약 15초 / 보기 1회독 35초 / 증상 대조 30초 / 결정 20초로 약 100초임. 남은 20초가 안전 마진임. 브리핑과 상황까지 내려갔다면 이미 마진을 쓰고 있는 상태임.</div>`},

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
  { id:"pec2", ch:"E-2", title:"지시어 사전: MOST · BEST · FIRST · LEAST · NOT",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"지시어: 질문 문장에 들어 있는 채점 기준",
       html:`<p class="lead">질문 문장(stem)에는 <strong>답의 성격을 지정하는 단어</strong>가 하나씩 들어 있음. 이것을 지시어라고 함. 지시어를 놓치면 지문을 정확히 읽어도 다른 답을 고르게 됨.</p>
        <h4>지시어의 형태</h4>
        <ul>
          <li>대문자로 인쇄되는 경우가 많음: <code>MOST</code> <code>BEST</code> <code>LEAST</code> <code>NOT</code> <code>EXCEPT</code> <code>FALSE</code> <code>TWO</code></li>
          <li>대문자가 아닌 것도 있음: <code>first</code> <code>single</code> <code>both</code> <code>primary</code> <code>guarantees</code></li>
          <li>위치는 거의 항상 <strong>질문 문장 안</strong>임. 지문 본문이 아니라 물음표가 붙은 한 줄임</li>
        </ul>
        <h4>지시어가 채점 기준인 이유</h4>
        <ul>
          <li>같은 지문과 같은 보기 4개라도 지시어만 바꾸면 <strong>정답이 다른 선택지로 옮겨감</strong></li>
          <li>예를 들어 "What is the correct fix?"의 정답과 "What is the most effective FIRST step?"의 정답은 대개 다른 보기임. 하나는 최종 해결책이고 하나는 진단이기 때문임</li>
          <li>그러므로 지문보다 지시어를 먼저 읽음. E-1의 읽기 순서가 질문부터인 이유가 이것임</li>
        </ul>
        <div class="callout">📖 용어 카드. <b>qualifier(지시어·한정어)</b>: 답의 범위를 좁히는 단어. <b>superlative(최상급)</b>: most / best / greatest / least처럼 가장 ~한을 만드는 형태. 최상급이 붙으면 비교 대상이 여럿이라는 뜻이고, 이는 <b>보기 여러 개가 모두 맞는 말</b>이라는 뜻임.</div>`},

      {type:"concept", kind:"TOPIC · 주제 설명", h:"지시어 전체 목록: 다섯 계열",
       html:`<p class="lead">시험에 출제되는 지시어는 다섯 계열임. 계열을 알면 처음 보는 표현도 어느 쪽인지 바로 분류됨.</p>
        <h4>① 최상급 계열: 모두 맞는 말 중 하나 고르기</h4>
        <table>
          <tr><th>영어</th><th>한국어</th><th>요구하는 답</th></tr>
          <tr><td><code>MOST effective</code></td><td>가장 효과적인</td><td>여러 보기가 모두 맞는 말임. 그 중 지문 조건에 가장 잘 맞는 하나</td></tr>
          <tr><td><code>BEST</code> · <code>best fix</code> · <code>best design</code></td><td>가장 좋은</td><td>MOST와 사실상 동일함. 정석 설계를 고르라는 뜻</td></tr>
          <tr><td><code>MOST likely cause</code></td><td>가장 그럴듯한 원인</td><td>로그와 수치가 <b>직접</b> 가리키는 원인. 일반적으로 흔한 원인이 아님</td></tr>
          <tr><td><code>PRIMARY</code></td><td>주된 · 1차적인</td><td>여럿이 작동하지만 그 중 주된 것. 보조 요인은 오답</td></tr>
          <tr><td><code>GREATEST</code></td><td>가장 큰</td><td>영향과 위험의 <b>크기</b> 비교. 눈에 잘 띄는 것이 아니라 파급이 큰 것</td></tr>
          <tr><td><code>MOST reliable</code> · <code>MOST maintainable</code></td><td>가장 믿을 만한 · 유지하기 좋은</td><td>뒤에 붙은 형용사가 판단 기준임. reliable이면 결정론적인 쪽, maintainable이면 한 곳에서 관리되는 쪽</td></tr>
        </table>
        <h4>② 순서 계열: 무엇부터</h4>
        <table>
          <tr><th>영어</th><th>한국어</th><th>요구하는 답</th></tr>
          <tr><td><code>FIRST step</code> · <code>first move</code></td><td>첫 조치</td><td>원인을 확인하는 <b>진단</b>이거나, 비용이 적게 들면서 원인을 직접 다루는 조치. 큰 재설계는 first가 아님</td></tr>
          <tr><td><code>next step</code></td><td>다음 단계</td><td>지문이 이미 한 것의 바로 다음 한 단계. 두 단계를 건너뛴 답은 오답</td></tr>
          <tr><td><code>before</code> · <code>must happen before</code></td><td>~ 전에</td><td>선행 조건. 자동화 전에 무엇을 해야 하는가 형태로 자주 출제됨</td></tr>
          <tr><td><code>going forward</code></td><td>앞으로는</td><td>이번 사고 수습이 아니라 <b>재발 방지</b> 설계를 고르라는 뜻</td></tr>
        </table>
        <h4>③ 부정 계열: 뒤집어서 고르기</h4>
        <table>
          <tr><th>영어</th><th>한국어</th><th>요구하는 답</th></tr>
          <tr><td><code>NOT</code></td><td>~이 아닌 것</td><td>보기 3개가 참, 1개가 거짓임. <b>거짓인 것</b>을 고름</td></tr>
          <tr><td><code>LEAST appropriate</code> · <code>LEAST effective</code></td><td>가장 부적절한 · 가장 효과 없는</td><td>나머지 3개는 <b>모두 적절한 조치</b>임. 셋이 모두 좋아 보이면 제대로 읽고 있는 것임</td></tr>
          <tr><td><code>EXCEPT</code></td><td>~을 제외하고</td><td>NOT과 같은 구조임. 다음 중 ~이 아닌 것은</td></tr>
          <tr><td><code>FALSE</code></td><td>거짓인 것</td><td>사실 3개 + 거짓 1개</td></tr>
          <tr><td><code>anti-pattern</code></td><td>안티패턴</td><td>부정어가 없어도 부정형임. 하면 안 되는 것을 고르라는 뜻</td></tr>
        </table>
        <h4>④ 개수 계열: 몇 개</h4>
        <table>
          <tr><th>영어</th><th>한국어</th><th>요구하는 답</th></tr>
          <tr><td><code>Select TWO.</code> · <code>Which TWO</code></td><td>두 개 고르기</td><td>정확히 2개. 1개만 고르거나 3개를 고르면 그 문항은 오답 처리됨</td></tr>
          <tr><td><code>a single change</code> · <code>one change</code></td><td>단 하나의 변경</td><td>하나로 문제 전부를 해결해야 함. 두 개를 합쳐야 하는 답은 탈락</td></tr>
          <tr><td><code>both symptoms</code> · <code>all three</code></td><td>둘 다 · 셋 다</td><td>증상 개수만큼 모두 설명하거나 해결해야 함. 하나만 고치는 보기는 탈락</td></tr>
          <tr><td><code>combination</code> · <code>pairing</code></td><td>조합 · 짝짓기</td><td>보기 하나가 이미 여러 조치를 묶고 있음. <b>그 안의 모든 항목</b>이 맞아야 정답</td></tr>
        </table>
        <h4>⑤ 강도 계열: 얼마나 확실해야 하는가</h4>
        <table>
          <tr><th>영어</th><th>한국어</th><th>요구하는 답</th></tr>
          <tr><td><code>guarantees</code> · <code>a guarantee, not a best effort</code></td><td>보장 · 최선이 아니라 보장</td><td>예외가 0이어야 함. 프롬프트 지시나 few-shot 같은 <b>확률적 처방은 전부 탈락</b></td></tr>
          <tr><td><code>deterministic</code></td><td>결정론적인</td><td>매번 같은 결과. 훅(hook)이나 게이트처럼 코드가 강제하는 쪽</td></tr>
          <tr><td><code>reliably</code> · <code>consistently</code></td><td>안정적으로 · 일관되게</td><td>guarantee보다 약하지만 방향은 같음. 결정론적인 쪽</td></tr>
          <tr><td><code>regardless of</code></td><td>~와 무관하게</td><td>예외 없음. 조건 분기를 두는 보기는 탈락</td></tr>
          <tr><td><code>appropriate</code> · <code>legitimate</code></td><td>적절한 · 정당한</td><td>정석 기준에 부합하는지. 동작은 하지만 정석은 아닌 답이 오답으로 배치됨</td></tr>
        </table>
        <div class="callout">🎯 문항을 열면 먼저 할 일. 질문 문장에서 <b>이 다섯 계열 중 어느 것이 붙었는지</b>를 확정할 것. 3초면 충분함.</div>`},

      {type:"concept", kind:"TOPIC · 주제 설명", h:"최상급 문항에서 소거법이 통하지 않는 이유와 대신 쓰는 3단 기준",
       html:`<p class="lead">최상급 문항은 선택지 네 개가 모두 맞는 말이 되도록 설계됨. 그래서 틀린 것을 지우는 방식이 통하지 않음.</p>
        <h4>소거법이 통하지 않는 이유</h4>
        <ul>
          <li>일반 문항: 오답 3개가 <strong>틀린 말</strong>임. 틀린 것을 지우면 하나가 남으므로 소거법이 통함</li>
          <li>최상급 문항: 보기 4개가 <strong>그 자체로는 모두 맞는 말</strong>임. 지울 대상이 없음</li>
          <li>공식 가이드는 오답 보기를 불완전하게 아는 사람이 고를 만하게 설계한다고 밝히고 있음. 최상급 문항이 그 설계의 결과임</li>
        </ul>
        <h4>대신 3단 기준으로 판단함</h4>
        <ul>
          <li><strong>1단, 조건 위반 탈락.</strong> 맞는 말이어도 지문의 제약을 위반하면 오답임. 여기서 보통 1~2개가 탈락함(E-3에서 다룸)</li>
          <li><strong>2단, 증상 전부 설명.</strong> 증상이 두 개인데 하나만 고치는 보기는 탈락함. 질문에 <code>both</code>나 <code>single change</code>가 붙어 있으면 이 단계가 판단의 핵심임</li>
          <li><strong>3단, 비용이 적고 원인을 직접 다루는 쪽.</strong> 그래도 둘이 남으면 원인을 직접 다루면서 비용이 낮은 쪽을 고름. 별도 모델 학습이나 라우팅 레이어 구축 같은 큰 조치는 여기서 탈락함</li>
        </ul>
        <h4>FIRST가 붙으면 후보가 줄어듦</h4>
        <ul>
          <li><code>MOST effective FIRST step</code>은 최상급과 순서가 겹친 형태인데, <strong>first가 후보를 크게 줄임</strong></li>
          <li>후보에서 자동 탈락: 대규모 재설계, 새 인프라 도입, 프롬프트 전면 재작성. 이런 것은 first step이 아님</li>
          <li>남는 것: <strong>원인을 확인하는 진단</strong>이거나 <strong>한 줄짜리 직접 수정</strong>임. 지문에 원인 미상이라는 서술이 있으면 진단이 정답인 경우가 많음</li>
        </ul>
        <div class="callout">⚠️ 최상급 문항에서 자주 하는 실수. 보기 하나를 읽고 맞다고 판단해 바로 확정하는 것임. 최상급은 <b>맞는 것을 찾는 문제가 아니라 더 나은 것을 고르는 문제</b>이므로 4개를 모두 읽기 전에는 확정하면 안 됨. V2는 되돌아가기가 없으므로 그 자리에서 확정됨.</div>`},

      {type:"concept", kind:"TOPIC · 주제 설명", h:"부정형 문항에서 자주 발생하는 오답 유형 세 가지",
       html:`<p class="lead">부정형은 아는 사람도 틀림. 지식이 아니라 <strong>앞 문항을 풀던 관성</strong> 때문에 틀리기 때문임.</p>
        <h4>오답 유형 ① 관성 오답. 가장 흔함</h4>
        <ul>
          <li>앞 문항이 전부 가장 좋은 것을 고르는 형태였으므로 자동으로 <strong>좋은 보기</strong>를 선택하게 됨</li>
          <li>NOT을 읽고도 좋은 답을 고름. 읽은 내용과 선택이 일치하지 않는 상태임</li>
          <li>V2는 <strong>답을 골라야 다음으로 넘어가고 건너뛰기가 없으므로</strong> 그 자리에서 확정됨</li>
        </ul>
        <h4>오답 유형 ② 이중 부정. 두 번 뒤집어 읽음</h4>
        <ul>
          <li><code>Which of the following is NOT a valid way to terminate the loop?</code>에서 <code>valid</code>까지 함께 뒤집어 읽음</li>
          <li>뒤집는 것은 <strong>NOT 하나뿐</strong>임. valid하지 않은 것, 즉 잘못된 종료 방식을 고르면 됨</li>
          <li>보기 안에 <code>not</code>, <code>never</code>, <code>without</code>이 또 들어 있으면 더 혼동됨. 그럴 때는 보기를 <strong>긍정문으로 바꿔 읽은 뒤</strong> 참·거짓을 표시할 것</li>
        </ul>
        <h4>오답 유형 ③ LEAST를 가장 나쁜 것으로 읽음</h4>
        <ul>
          <li><code>LEAST appropriate</code>은 안 좋은 것들 중 제일 안 좋은 것이라는 뜻이 아님</li>
          <li><strong>나머지 셋이 모두 적절</strong>하고 하나만 부적절한 구조임. 셋이 모두 괜찮아 보이는 것이 정상이며 제대로 읽고 있다는 신호임</li>
          <li>셋이 모두 좋아 보이면 <strong>나머지 하나를 찾을 것</strong>. 대개 프롬프트로 규칙을 강제하려는 보기, 원인 확인 없이 큰 변경을 하는 보기, 실패를 감추는 보기 중 하나임</li>
        </ul>
        <h4>3초 대응 절차</h4>
        <ul>
          <li>질문에서 <strong>대문자 단어</strong>를 먼저 찾을 것. NOT · LEAST · EXCEPT · FALSE 중 하나가 보이면 그 문항은 부정형으로 확정함</li>
          <li>E-1 읽기 순서의 예외를 적용함. <strong>보기 4개를 먼저 모두 읽고</strong> 옆에 참·거짓을 표시함</li>
          <li>참이 셋, 거짓이 하나면 거짓인 것이 답임. <strong>참이 둘만 나오면 잘못 읽은 것</strong>이므로 질문을 다시 확인할 것</li>
          <li>고르기 직전에 질문 문장을 <strong>한 번 더</strong> 읽을 것. 이 한 번이 관성 오답을 대부분 막아 줌</li>
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
  { id:"pec3", ch:"E-3", title:"조건을 숨기는 표현: 한 구절이 정답을 바꿈",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"제약은 문장이 아니라 구절로 제시됨",
       html:`<p class="lead">E-1에서 구성 요소 ④ 제약을 다뤘음. 이 챕터는 그 제약이 <strong>실제 영어로 어떤 형태인지</strong>를 다룸. 제약은 문단이 아니라 <strong>구절 하나</strong>로 제시됨.</p>
        <h4>제약이 놓이는 세 자리</h4>
        <ul>
          <li><strong>라벨이 붙은 경우</strong>: <code>Constraint:</code> <code>Team constraint:</code> <code>Requirement:</code> <code>Company policy:</code>. 표시가 되어 있으므로 놓치기 어려움</li>
          <li><strong>질문 문장 안에 붙은 경우</strong>: "Which implementation guarantees compliance <b>while keeping normal refunds automated</b>?"처럼 물음표 문장 끝에 붙어 있음. 이 경우가 가장 많음</li>
          <li><strong>상황 서술 마지막 줄에 섞어 놓은 경우</strong>: "The parser belongs to another team and will not change this quarter."처럼 평범한 문장 형태로 섞여 있음. 이 경우가 가장 놓치기 쉬움</li>
        </ul>
        <h4>제약의 역할</h4>
        <ul>
          <li><strong>보기 하나(가끔 둘)를 정확히 겨냥해 탈락시킴</strong>. 제약이 없으면 그 보기가 정답이었을 상황이 대부분임</li>
          <li>그러므로 제약을 놓치면 <strong>탈락해야 할 보기를 고르게 됨</strong>. 지문을 정확히 읽고도 틀리는 전형적인 경로임</li>
          <li>반대로 말하면 보기 중에 유난히 그럴듯한 것이 있으면 <strong>그것을 겨냥한 제약이 지문 어딘가에 있는지</strong> 먼저 확인하는 편이 빠름</li>
        </ul>
        <h4>신호가 되는 단어 여섯 개</h4>
        <ul>
          <li><code>without</code> · <code>while</code> · <code>only</code> · <code>must</code> · <code>before</code> · <code>cannot</code></li>
          <li>이 여섯 개가 보이면 해당 구절을 커서나 손가락으로 짚을 것. 눈으로만 훑으면 그냥 지나가게 됨</li>
        </ul>`},

      {type:"concept", kind:"TOPIC · 주제 설명", h:"조건 구절 카탈로그: 여덟 종류",
       html:`<p class="lead">기존 문항들에서 실제로 쓰인 표현만 모았음. 종류별로 묶어 두면 처음 보는 구절도 어느 항목인지 바로 분류됨.</p>
        <h4>A. 변경할 수 없는 대상을 지정</h4>
        <table>
          <tr><th>영어</th><th>한국어</th><th>탈락하는 보기</th></tr>
          <tr><td><code>without changing X</code></td><td>X는 그대로 두고</td><td>X를 수정하는 답</td></tr>
          <tr><td><code>without affecting teammates</code> · <code>without affecting anyone else</code></td><td>팀에 영향 없이</td><td>공유 설정이나 리포지토리 파일을 수정하는 답</td></tr>
          <tr><td><code>cannot be modified</code> · <code>will not change this quarter</code></td><td>수정 불가 · 이번 분기에는 변경되지 않음</td><td>그쪽을 수정하자는 답</td></tr>
          <tr><td><code>is owned by another team</code></td><td>다른 팀 소유</td><td>다른 팀의 컴포넌트를 수정하는 답</td></tr>
          <tr><td><code>must remain present</code> · <code>keyed to three downstream reports</code></td><td>남아 있어야 함 · 하류가 연결되어 있음</td><td>필드나 카테고리를 삭제하자는 답</td></tr>
          <tr><td><code>while preserving Y</code> · <code>while keeping Z automated</code></td><td>Y를 유지하면서 · Z는 자동인 채로</td><td>전부 사람에게 넘기는 답</td></tr>
          <tr><td><code>read-only</code></td><td>읽기 전용</td><td>원본에 쓰겠다는 답</td></tr>
        </table>
        <h4>B. 비용 · 자원 상한</h4>
        <table>
          <tr><th>영어</th><th>한국어</th><th>탈락하는 보기</th></tr>
          <tr><td><code>with minimal token spend</code></td><td>토큰 최소로</td><td>전부 다시 읽는 답, 컨텍스트를 통째로 다시 채우는 답</td></tr>
          <tr><td><code>at the lowest cost</code></td><td>가장 낮은 비용으로</td><td>새 인프라나 별도 모델을 구축하는 답</td></tr>
          <tr><td><code>within the existing context budget</code></td><td>현재 컨텍스트 예산 안에서</td><td>창을 키우면 된다는 답</td></tr>
          <tr><td><code>without adding infrastructure</code></td><td>인프라 추가 없이</td><td>벡터 DB나 별도 서비스를 구축하는 답</td></tr>
          <tr><td><code>in a single batch run</code> · <code>in one pass</code></td><td>한 번의 배치로 · 한 번에</td><td>여러 번 나눠 실행하자는 답</td></tr>
        </table>
        <h4>C. 순서 · 시점</h4>
        <table>
          <tr><th>영어</th><th>한국어</th><th>요구하는 것</th></tr>
          <tr><td><code>before Z</code> · <code>must happen before</code></td><td>Z 전에</td><td>선행 조건. Z를 먼저 하는 답은 전부 탈락</td></tr>
          <tr><td><code>until</code></td><td>~할 때까지</td><td>그때까지는 차단되어 있어야 함</td></tr>
          <tr><td><code>as soon as</code></td><td>~하자마자</td><td>지연이 들어간 답은 탈락</td></tr>
          <tr><td><code>the cutoff has passed</code> · <code>the window has closed</code></td><td>마감이 지남 · 기간이 종료됨</td><td>처음부터 다시 하는 답이 불가능해짐</td></tr>
        </table>
        <h4>D. 조건부</h4>
        <table>
          <tr><th>영어</th><th>한국어</th><th>요구하는 것</th></tr>
          <tr><td><code>only if</code></td><td>~인 경우에만</td><td>그 경우가 아니면 하면 안 됨. 항상 하는 답은 탈락</td></tr>
          <tr><td><code>unless</code></td><td>~가 아니라면</td><td>기본은 수행하고 예외에만 수행하지 않음</td></tr>
          <tr><td><code>provided that</code></td><td>~라는 조건 하에</td><td>전제가 깨지면 그 답은 무효</td></tr>
        </table>
        <h4>E. 금지 · 강제</h4>
        <table>
          <tr><th>영어</th><th>한국어</th><th>탈락하는 보기</th></tr>
          <tr><td><code>must NOT be suppressed</code></td><td>억제하면 안 됨</td><td>걸러내기나 삭제로 노이즈를 줄이는 답</td></tr>
          <tr><td><code>must not improvise</code> · <code>is not permitted</code></td><td>지어내면 안 됨 · 허용되지 않음</td><td>없는 정책을 만들어내는 답</td></tr>
          <tr><td><code>is required to</code> · <code>has to</code></td><td>반드시 해야 함</td><td>선택으로 두는 답</td></tr>
          <tr><td><code>regardless of</code></td><td>~와 무관하게</td><td>조건 분기를 두는 답(예: 신뢰도 점수로 거르는 답)</td></tr>
        </table>
        <h4>F. 확실성 강도</h4>
        <table>
          <tr><th>영어</th><th>한국어</th><th>탈락하는 보기</th></tr>
          <tr><td><code>a guarantee, not a best effort</code></td><td>최선이 아니라 보장</td><td>프롬프트 지시 · few-shot · temperature 조정. 전부 확률적이므로 탈락</td></tr>
          <tr><td><code>guarantees compliance</code></td><td>준수를 보장</td><td>위와 동일</td></tr>
          <tr><td><code>deterministic</code></td><td>결정론적인</td><td>모델 판단에 맡기는 답</td></tr>
          <tr><td><code>in every case</code> · <code>every time</code></td><td>모든 경우에</td><td>대부분 잡힌다는 답</td></tr>
        </table>
        <h4>G. 실행 환경</h4>
        <table>
          <tr><th>영어</th><th>한국어</th><th>요구하는 것</th></tr>
          <tr><td><code>non-interactively</code> · <code>with no TTY</code></td><td>대화 없이 · 터미널 없이</td><td>비대화형 실행 플래그가 필요해짐</td></tr>
          <tr><td><code>unattended</code> · <code>overnight</code></td><td>무인 · 야간</td><td>사람이 중간에 응답해야 하는 답은 탈락</td></tr>
          <tr><td><code>in CI</code> · <code>on every pull request</code></td><td>CI에서 · PR마다</td><td>기계가 파싱할 출력이 필요해짐</td></tr>
          <tr><td><code>a missing report is a failed control</code></td><td>리포트 누락 자체가 통제 실패</td><td>중단하고 아무것도 발행하지 않는 답</td></tr>
        </table>
        <h4>H. 범위 한정</h4>
        <table>
          <tr><th>영어</th><th>한국어</th><th>요구하는 것</th></tr>
          <tr><td><code>a single change</code></td><td>단 하나의 변경</td><td>하나로 전부 해결해야 함</td></tr>
          <tr><td><code>the minimal change</code></td><td>최소 변경</td><td>가장 적게 수정하는 쪽</td></tr>
          <tr><td><code>without redoing completed work</code></td><td>끝난 일을 다시 하지 않고</td><td>전체 재실행 답</td></tr>
          <tr><td><code>only the affected parts</code></td><td>영향받은 부분만</td><td>전면 재분석 답</td></tr>
        </table>`},

      {type:"concept", kind:"TOPIC · 주제 설명", h:"구절 하나로 정답이 바뀌는 실제 예시 다섯",
       html:`<p class="lead">같은 상황과 같은 보기에서 조건 구절 하나만 다를 때 정답이 어떻게 옮겨 가는지 확인할 것. 이 다섯 쌍이 시험에서 반복되는 형태임.</p>

        <h4>예시 1: <code>without affecting teammates</code></h4>
        <table>
          <tr><th>지문</th><th>정답</th></tr>
          <tr><td>팀이 공유하는 <code>/commit</code> 슬래시 커맨드(slash command)의 메시지 형식을 변경하려 함</td><td>리포지토리의 <code>.claude/commands/commit.md</code>를 수정</td></tr>
          <tr><td>같은 상황 + <b>"without affecting anyone else"</b></td><td><b>개인 스코프(user scope)인 <code>~/.claude/commands/</code>에 <u>다른 이름</u>으로 배치(예: <code>/my-commit</code>)</b></td></tr>
        </table>
        <ul>
          <li>구절 하나가 파일을 두는 위치를 바꿈. 공유 파일을 수정하는 순간 팀 전원에게 영향이 감</li>
          <li>그리고 지켜야 할 기준이 <b>두 개</b>임. 위치만 개인 스코프로 옮기고 <b>이름을 그대로 두면</b> 개인 커맨드가 팀 커맨드를 덮어써서 왜 다르게 동작하는지 추적할 수 없게 됨. 이름까지 바꿔야 조건을 온전히 만족함</li>
        </ul>

        <h4>예시 2: <code>with minimal token spend</code></h4>
        <table>
          <tr><th>지문</th><th>정답</th></tr>
          <tr><td>어제 세션이 대형 코드베이스를 분석했고 밤사이 자동 업그레이드가 리포지토리 전반을 변경함. 오늘 이어서 작업해야 함</td><td>새 세션 + 어제 결론의 구조화 요약. 도구 결과(tool result)가 이미 stale이기 때문</td></tr>
          <tr><td>같은 상황이지만 변경된 파일이 <b>3개뿐</b>이고 <b>"continue with minimal token spend"</b>가 붙음</td><td><b>세션 재개 + 변경된 파일 3개를 고지 + 그 부분만 재분석</b></td></tr>
        </table>
        <ul><li>stale 판단은 파일이 바뀌었는지가 아니라 <b>변경의 범위</b>로 함. 그리고 토큰 상한 구절이 전부 다시 읽는 답을 탈락시킴</li></ul>

        <h4>예시 3: <code>must NOT be suppressed before humans see them</code></h4>
        <table>
          <tr><th>지문</th><th>정답</th></tr>
          <tr><td>리뷰 봇의 false positive가 40%여서 개발자들이 코멘트를 무시하기 시작함</td><td>신뢰도가 낮은 findings를 걸러 노이즈를 줄이기</td></tr>
          <tr><td>같은 상황 + <b>"Team constraint: findings must NOT be suppressed before humans see them"</b></td><td><b>억제 대신 심각도 기준으로 정렬하고 근거를 함께 붙여, 사람이 보는 목록은 그대로 두되 읽는 순서를 바꾸기</b></td></tr>
        </table>
        <ul><li>제약이 걸러내기라는 처방 자체를 금지함. 남은 방법은 삭제가 아니라 <b>순서와 맥락을 바꾸는</b> 쪽임</li></ul>

        <h4>예시 4: <code>runs in CI with no human at the terminal</code></h4>
        <table>
          <tr><th>지문</th><th>정답</th></tr>
          <tr><td>Claude Code로 코드 리뷰를 실행하려 함</td><td>평소대로 대화형으로 실행</td></tr>
          <tr><td>같은 작업이지만 <b>"runs in a container with no TTY, on every pull request"</b>가 붙음</td><td><b><code>-p</code>로 비대화형 실행 + <code>--output-format json</code>으로 기계가 파싱할 수 있는 출력</b></td></tr>
        </table>
        <ul><li>환경 조건 구절이 플래그를 강제함. 사람이 없다는 서술이 나오면 대화형 답은 전부 탈락함</li></ul>

        <h4>예시 5: <code>downstream consumers cannot be modified</code></h4>
        <table>
          <tr><th>지문</th><th>정답</th></tr>
          <tr><td>새 문서 유형에는 <code>renewal_term_months</code>에 해당하는 값이 아예 없는데 모델이 12를 채워 넣음</td><td>그 문서 유형에서는 해당 필드를 스키마에서 제거</td></tr>
          <tr><td>같은 상황 + <b>"the downstream consumers cannot be modified, so the field must remain present in every record"</b></td><td><b>필드는 유지하고 nullable로 변경해, 조항이 없으면 null을 반환하게 하기</b></td></tr>
        </table>
        <ul><li>제약이 필드 제거를 탈락시키므로 필드를 유지한 채 같은 문제를 푸는 방법을 찾아야 함. 그것이 nullable임</li></ul>

        <div class="callout">🎯 다섯 쌍의 공통 구조. 제약이 없을 때의 정답은 <b>더 단순하고 더 과감한 조치</b>이고, 제약이 붙으면 <b>같은 목적을 더 좁은 수단으로</b> 달성하는 답으로 옮겨 감. 그러므로 보기 중에 유난히 깔끔한 것이 있으면 그것을 탈락시키는 구절이 지문에 있는지 확인할 것.</div>`},

      {type:"concept", kind:"TOPIC · 주제 설명", h:"제약을 놓치지 않는 절차: 실전에서 실제로 하는 동작",
       html:`<p class="lead">아는 것과 실전에서 수행하는 것은 다름. 시험장에서 실제로 할 수 있는 동작으로 정리함.</p>
        <h4>3단 절차</h4>
        <ul>
          <li><strong>① 질문 문장에서 신호 여섯 개를 짚음</strong>: <code>without</code> <code>while</code> <code>only</code> <code>must</code> <code>before</code> <code>cannot</code>. 화면이라 밑줄은 그을 수 없지만 커서나 손가락으로 짚는 것만으로 인식이 달라짐</li>
          <li><strong>② 짚은 구절을 한국어 한 마디로 바꿔 기억함</strong>: 팀을 건드리면 안 됨, 토큰을 아껴야 함, 리포트는 반드시 발행해야 함. 영어 그대로 기억하면 보기를 읽는 동안 흐려짐</li>
          <li><strong>③ 보기마다 그 한 마디로 확인함</strong>: 이 보기가 그 조건을 위반하는가. 위반하면 아무리 맞는 말이어도 즉시 탈락시킴</li>
        </ul>
        <h4>제약이 없는 문항도 있음</h4>
        <ul>
          <li>모든 문항에 제약이 있는 것은 아님. 없으면 <strong>제약 없음이라고 확정</strong>하고 넘어갈 것</li>
          <li>확정하지 않으면 보기를 고르는 동안 무엇을 놓쳤는지 계속 확인하게 되어 시간이 소모됨. 없다고 확정하는 것도 성과임</li>
        </ul>
        <h4>제약이 두 개 붙는 문항</h4>
        <ul>
          <li>실전에서 자주 출제됨. "guarantees compliance <b>while keeping</b> normal refunds automated"처럼 강도 조건과 유지 조건이 겹침</li>
          <li>이 경우 보기 4개는 <strong>하나만 만족 / 하나만 만족 / 둘 다 위반 / 둘 다 만족</strong> 구조가 대부분임</li>
          <li>그러므로 맞는 것을 찾았다고 판단해도 <strong>나머지 조건을 한 번 더 대조할 것</strong>. 절반만 만족하는 보기가 가장 그럴듯하게 서술되어 있음</li>
        </ul>
        <div class="callout">⏱ 시간 계산. 제약을 짚는 데 드는 시간은 <b>5초 안팎</b>임. 그 5초가 보기 두 개를 미리 탈락시키면 보기를 읽는 시간이 절반으로 줄어듦.</div>`},

      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: One clause, two locations",
       q:`Your repository ships a shared /review slash command that every engineer on the team runs. You want your own runs of it to use a stricter security checklist and a different output format, without changing what your teammates get when they run /review. What do you do?`,
       opts:[
         {t:`Put the variant in your user scope (~/.claude/commands/) under a different name such as /review-strict, leaving the repository's command untouched.`, ok:true},
         {t:`Put the variant in your user scope under the same name /review, so it cleanly overrides the team version for your runs only.`},
         {t:`Edit the repository's .claude/commands/review.md to include your stricter checklist, with a note in the file that the extra checks are optional.`},
         {t:`Add the variant to the project's .claude/commands/ as /review-strict so it is backed up along with the repository.`},
       ],
       hint:`질문 문장 끝에 without으로 시작하는 구절이 붙어 있음. 그것을 한국어 한 마디로 바꿔 보기 네 개를 확인할 것. 그리고 개인 변형에는 지켜야 할 기준이 하나가 아니라 둘임. 어디에 두는가와 무엇이라고 부르는가임.`,
       explain:{
         good:`개인 변형의 기준은 <b>user 스코프와 다른 이름</b>임. 위치를 개인 쪽으로 옮겨야 팀에 영향이 없고, 이름을 바꿔야 팀 커맨드를 덮어쓰지 않음. 둘 다 지켜야 팀을 건드리지 않는다는 조건을 온전히 만족함.`,
         wrongs:[
           `<b>B: 개인 스코프 + 같은 이름.</b> 가장 그럴듯한 오답임. 위치 기준은 맞지만 이름이 겹쳐서 개인 <code>/review</code>가 팀 커맨드를 <b>덮어씀</b>. 나중에 팀 커맨드가 왜 다르게 동작하는지 추적할 수 없음.`,
           `<b>C: 공유 파일 수정 + 안내문.</b> 조건을 직접 위반함. 커밋하는 순간 팀 전원의 실행이 바뀌고, 선택 사항이라는 안내문은 강제력이 없음.`,
           `<b>D: 프로젝트 폴더에 다른 이름.</b> 이름 기준은 맞지만 위치가 틀림. 프로젝트 폴더에 넣으면 커밋되어 팀 전원에게 적용됨. 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임.`,
         ]},
       principle:"개인 변형 = user 스코프 + 다른 이름"},

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
  { id:"pec4", ch:"E-4", title:"시험 어휘장: 실제로 출제된 표현 120개",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"이 어휘장을 만든 방법과 사용하는 방법",
       html:`<p class="lead">일반 영단어장이 아님. 이 코스의 P1~P6 문항과 확장 문제 풀에서 <strong>실제로 쓰인 표현만</strong> 뽑아 도메인별로 묶은 것임. 지어낸 항목은 없음.</p>
        <h4>구성</h4>
        <ul>
          <li>여섯 묶음, 총 <strong>120개</strong></li>
          <li>각 항목은 <strong>[영어 / 한국어 / 이 시험에서의 의미 한 줄]</strong>로 구성됨</li>
          <li>세 번째 칸이 가장 중요함. 사전적 뜻이 아니라 <strong>이 시험에서 그 단어가 나오면 어떤 판단을 하라는 신호인지</strong>를 적어 둠</li>
        </ul>
        <h4>사용 방법</h4>
        <ul>
          <li><strong>1회차</strong>: 세 칸을 모두 읽으며 훑음. 소요 시간 20분. 모르는 항목이 몇 개인지만 확인함</li>
          <li><strong>2회차</strong>: 영어 칸만 보고 세 번째 칸이 떠오르는지 확인함. 떠오르지 않는 것만 표시함</li>
          <li><strong>3회차</strong>: 표시한 것만 확인함. 대개 15~25개로 줄어듦</li>
          <li>모의고사를 풀다가 막히는 단어가 나오면 이 표에서 찾을 것. 표에 없으면 시험에 잘 출제되지 않는 단어이므로 넘어가도 됨</li>
        </ul>`},

      {type:"concept", kind:"TOPIC · 주제 설명", h:"묶음 A: 에이전트 루프 · 오케스트레이션 (22개)",
       html:`<table>
        <tr><th>영어</th><th>한국어</th><th>이 시험에서의 의미</th></tr>
        <tr><td><code>agentic loop</code></td><td>에이전트 루프</td><td>요청 → 도구 실행 → 결과를 대화에 추가를 반복하는 구조</td></tr>
        <tr><td><code>stop_reason</code></td><td>중단 이유</td><td>루프를 계속할지 멈출지 정하는 유일한 공식 신호</td></tr>
        <tr><td><code>tool_use</code></td><td>도구 사용</td><td>도구가 필요해 멈춘 상태. 아직 작업 중이라는 뜻</td></tr>
        <tr><td><code>end_turn</code></td><td>턴 종료</td><td>할 말을 마쳤다는 신호. 루프 종료의 정석 신호</td></tr>
        <tr><td><code>max_tokens</code></td><td>출력 한도</td><td>출력 길이 상한에 걸려 멈춘 상태. 종료 신호가 아니라 별도 처리 분기</td></tr>
        <tr><td><code>tool_result</code></td><td>도구 결과</td><td>실행 결과를 대화로 되돌려 넣는 블록. 이것이 빠지면 모델은 실행 사실을 알지 못함</td></tr>
        <tr><td><code>iteration</code></td><td>반복 회차</td><td>루프 한 회. "12 iterations" 같은 상한은 보조 안전망일 때만 정당함</td></tr>
        <tr><td><code>terminate</code></td><td>종료하다</td><td>루프를 끝내는 것. 종료 조건을 묻는 문항의 핵심어</td></tr>
        <tr><td><code>coordinator</code></td><td>코디네이터</td><td>하위 작업을 분해하고 위임하며 결과를 취합하는 상위 에이전트</td></tr>
        <tr><td><code>subagent</code></td><td>서브에이전트</td><td>위임받은 하위 작업을 수행하는 에이전트. 코디네이터의 대화 히스토리(conversation history)를 물려받지 않음</td></tr>
        <tr><td><code>delegate</code></td><td>위임하다</td><td>코디네이터가 하위 작업을 넘기는 것</td></tr>
        <tr><td><code>spawn</code></td><td>띄우다 · 생성하다</td><td>서브에이전트를 새로 만드는 것. Task 도구가 없으면 불가능함</td></tr>
        <tr><td><code>hub-and-spoke</code></td><td>허브 앤 스포크</td><td>모든 통신이 코디네이터를 거치는 표준 구조</td></tr>
        <tr><td><code>decomposition</code></td><td>작업 분해</td><td>큰 작업을 하위 작업으로 나누기. 리서치 누락 사고의 주요 원인 지점</td></tr>
        <tr><td><code>prompt chaining</code></td><td>프롬프트 체이닝</td><td>순서가 미리 고정된 파이프라인. 예측 가능한 반복 작업용</td></tr>
        <tr><td><code>dynamic decomposition</code></td><td>동적 분해</td><td>중간 발견이 다음 작업을 바꾸는 방식. 열린 조사 과제용</td></tr>
        <tr><td><code>synthesis</code></td><td>합성 · 종합</td><td>서브에이전트 결과를 하나의 보고서로 묶는 마지막 단계</td></tr>
        <tr><td><code>handoff</code></td><td>인계</td><td>한 에이전트에서 다음으로 넘기는 지점. 컨텍스트가 유실되는 지점</td></tr>
        <tr><td><code>orchestration</code></td><td>오케스트레이션</td><td>여러 에이전트를 조율하는 설계 전반</td></tr>
        <tr><td><code>in parallel</code></td><td>병렬로</td><td>서브에이전트를 동시에 실행하는 것. 중복 조사가 생기면 분해가 문제임</td></tr>
        <tr><td><code>sequential</code></td><td>순차적인</td><td>앞 단계가 끝나야 다음이 시작되는 방식</td></tr>
        <tr><td><code>anti-pattern</code></td><td>안티패턴</td><td>그럴듯하지만 틀린 설계. 오답 보기의 정체이며 부정형 문항의 정답임</td></tr>
        </table>`},

      {type:"concept", kind:"TOPIC · 주제 설명", h:"묶음 B: 도구 설계 · MCP (20개)",
       html:`<table>
        <tr><th>영어</th><th>한국어</th><th>이 시험에서의 의미</th></tr>
        <tr><td><code>tool description</code></td><td>도구 설명</td><td>모델이 도구를 고르는 <b>1차 근거</b>. 선택 오류 문항의 정답이 여기인 경우가 많음</td></tr>
        <tr><td><code>tool selection</code></td><td>도구 선택</td><td>어느 도구를 부를지 정하는 일. 도구가 많을수록 오선택이 늘어남</td></tr>
        <tr><td><code>tool_choice</code></td><td>도구 선택 모드</td><td>auto · any · 특정 도구 강제 중 하나를 지정</td></tr>
        <tr><td><code>auto</code></td><td>자동</td><td>모델이 스스로 고르고, 필요 없으면 부르지 않을 수도 있음</td></tr>
        <tr><td><code>any</code></td><td>아무거나 하나</td><td>반드시 도구 하나는 부르게 강제함. 어느 것인지는 모델이 고름</td></tr>
        <tr><td><code>built-in tools</code></td><td>기본 제공 도구</td><td>Read · Write · Edit · Bash · Grep · Glob 여섯 개</td></tr>
        <tr><td><code>Grep</code></td><td>내용 검색</td><td>파일 <b>안의 내용</b>을 찾을 때 사용함. 함수 호출자 찾기가 대표 사례</td></tr>
        <tr><td><code>Glob</code></td><td>이름 패턴 검색</td><td>경로나 파일명으로 찾을 때 사용함. 내용 검색이 아님</td></tr>
        <tr><td><code>MCP server</code></td><td>MCP 서버</td><td>외부 도구와 리소스를 에이전트에 연결하는 창구</td></tr>
        <tr><td><code>.mcp.json</code></td><td>프로젝트 MCP 설정</td><td>팀 공유용. 리포지토리에 커밋해 모두가 같은 서버를 사용함</td></tr>
        <tr><td><code>~/.claude.json</code></td><td>개인 MCP 설정</td><td>개인만 사용하는 실험용 서버 자리. 팀에 영향이 없음</td></tr>
        <tr><td><code>MCP resource</code></td><td>MCP 리소스</td><td>탐색 호출 없이 바로 조회되는 카탈로그성 데이터. 탐색 비용을 없앰</td></tr>
        <tr><td><code>isError</code></td><td>에러 표시</td><td>도구 결과가 실패임을 알리는 플래그. 빠지면 실패가 성공으로 전달됨</td></tr>
        <tr><td><code>errorCategory</code></td><td>에러 분류</td><td>transient · validation · business 중 하나. 이것이 다음 행동을 정함</td></tr>
        <tr><td><code>isRetryable</code></td><td>재시도 가능</td><td>다시 호출할 가치가 있는 실패인지. transient만 true임</td></tr>
        <tr><td><code>transient</code></td><td>일시적인</td><td>타임아웃이나 502처럼 다시 하면 성공할 수도 있는 실패</td></tr>
        <tr><td><code>validation error</code></td><td>검증 오류</td><td>입력이 틀린 것. 같은 인자로 재시도하면 동일하게 실패하므로 인자를 수정해야 함</td></tr>
        <tr><td><code>business rule</code></td><td>업무 규칙</td><td>정책상 불가능한 것. 재시도 대상이 아니며 대안 경로나 에스컬레이션(escalation)으로 처리함</td></tr>
        <tr><td><code>retry</code></td><td>재시도</td><td>실패한 호출을 다시 거는 것. 실패 종류를 확인하지 않고 하면 무한 반복이 됨</td></tr>
        <tr><td><code>narrow tool</code></td><td>좁은 전용 도구</td><td>고빈도 요구 하나만 처리하는 도구. 나머지는 기존 경로를 유지함</td></tr>
        </table>`},

      {type:"concept", kind:"TOPIC · 주제 설명", h:"묶음 C: Claude Code · 워크플로 (20개)",
       html:`<table>
        <tr><th>영어</th><th>한국어</th><th>이 시험에서의 의미</th></tr>
        <tr><td><code>CLAUDE.md</code></td><td>프로젝트 지침 파일</td><td>세션 시작 때 <b>항상</b> 로드되는 지침. 위치가 적용 범위를 정함</td></tr>
        <tr><td><code>frontmatter</code></td><td>프론트매터</td><td>파일 맨 위 --- 사이의 YAML 설정 블록. 프롬프트 본문이 아님</td></tr>
        <tr><td><code>allowed-tools</code></td><td>허용 도구</td><td>그 커맨드나 스킬이 사용할 수 있는 도구 목록. 프론트매터에 들어감</td></tr>
        <tr><td><code>argument-hint</code></td><td>인자 힌트</td><td>슬래시 커맨드가 어떤 인자를 받는지 알려 주는 프론트매터 항목</td></tr>
        <tr><td><code>slash command</code></td><td>슬래시 커맨드</td><td>/commit처럼 호출하는 사용자 정의 명령. 프로젝트용과 개인용의 위치가 다름</td></tr>
        <tr><td><code>skill</code></td><td>스킬</td><td>필요할 때 로드되는 작업 지침 묶음. 항상 로드되는 CLAUDE.md와 대비됨</td></tr>
        <tr><td><code>hook</code></td><td>훅</td><td>정해진 시점에 자동 실행되는 프로그램. 확률이 아니라 강제임</td></tr>
        <tr><td><code>PreToolUse</code></td><td>도구 실행 전 훅</td><td>호출 자체를 <b>차단</b>할 수 있는 지점. 금액 상한이나 전제조건 게이트가 여기에 해당함</td></tr>
        <tr><td><code>PostToolUse</code></td><td>도구 실행 후 훅</td><td>결과 정규화와 포맷 강제 지점. 차단은 불가능함</td></tr>
        <tr><td><code>plan mode</code></td><td>플랜 모드</td><td>실행 전에 계획을 먼저 제출하게 하는 모드. 파급이 큰 작업에 사용함</td></tr>
        <tr><td><code>-p</code> (print)</td><td>비대화형 실행</td><td>사람 없이 한 번 실행하고 종료함. CI와 무인 실행에 필수임</td></tr>
        <tr><td><code>--output-format json</code></td><td>JSON 출력</td><td>기계가 파싱할 형태로 출력함. <b>-p를 대신하지 않음</b>. 자주 틀리는 지점임</td></tr>
        <tr><td><code>--json-schema</code></td><td>스키마 강제</td><td>그 JSON의 형태를 고정함. 정규식으로 추출하는 방식을 대체함</td></tr>
        <tr><td><code>session</code></td><td>세션</td><td>대화 한 줄기. 이름을 붙여 관리하고 나중에 이어갈 수 있음</td></tr>
        <tr><td><code>--resume</code></td><td>세션 이어가기</td><td>이전 세션을 그대로 다시 여는 것. 변경이 작을 때의 정답</td></tr>
        <tr><td><code>fork</code></td><td>분기</td><td>같은 지점에서 두 접근을 나눠 비교함. stale 문제의 해법은 아님</td></tr>
        <tr><td><code>stale</code></td><td>낡음 · 유효하지 않게 됨</td><td>세션이 기록해 둔 결론이 현재 상태와 맞지 않게 된 것</td></tr>
        <tr><td><code>CI/CD</code></td><td>지속적 통합 · 배포</td><td>PR마다 자동으로 실행되는 파이프라인. 사람이 없다는 뜻임</td></tr>
        <tr><td><code>pull request</code> (PR)</td><td>풀 리퀘스트</td><td>변경을 합치기 전 리뷰 단위. 리뷰 봇 시나리오가 놓이는 상황임</td></tr>
        <tr><td><code>diff</code></td><td>변경 내역</td><td>무엇이 어떻게 바뀌었는지의 차이. 원인 특정의 1순위 도구</td></tr>
        </table>`},

      {type:"concept", kind:"TOPIC · 주제 설명", h:"묶음 D: 프롬프트 · 구조화 출력 (20개)",
       html:`<table>
        <tr><th>영어</th><th>한국어</th><th>이 시험에서의 의미</th></tr>
        <tr><td><code>system prompt</code></td><td>시스템 프롬프트</td><td>역할과 규칙을 정하는 최상위 지시. 확률적이므로 보장 수단은 아님</td></tr>
        <tr><td><code>few-shot examples</code></td><td>예시 몇 개</td><td>원하는 판단을 보여 주는 본보기. 개수보다 <b>무엇을 고르는지</b>가 중요함</td></tr>
        <tr><td><code>edge case</code></td><td>경계 사례</td><td>애매해서 실제로 틀리는 경우. few-shot은 여기를 겨냥해야 효과가 있음</td></tr>
        <tr><td><code>clear-cut case</code></td><td>명백한 사례</td><td>이미 잘 맞히는 쉬운 경우. 여기만 예시로 넣으면 개선이 없음</td></tr>
        <tr><td><code>JSON schema</code></td><td>JSON 스키마</td><td>출력의 형태를 미리 정의한 틀</td></tr>
        <tr><td><code>strict</code></td><td>엄격 모드</td><td>스키마를 위반한 출력을 막는 설정. 형태는 보장해도 <b>내용의 진위는 보장하지 않음</b></td></tr>
        <tr><td><code>required</code></td><td>필수 필드</td><td>반드시 값이 있어야 하는 항목. 값이 없는 문서에서 지어내기를 유발함</td></tr>
        <tr><td><code>nullable</code></td><td>null 허용</td><td>값이 <b>아예 없을 때</b> 사용하는 처방</td></tr>
        <tr><td><code>enum</code></td><td>열거형</td><td>정해진 목록 중에서만 고르게 하는 것. 목록에 없는 경우가 생기면 확장이 필요함</td></tr>
        <tr><td><code>unclear</code></td><td>불명확 값</td><td>값이 있지만 <b>어느 항목에도 맞지 않을 때</b> 사용하는 처방. null과 혼동하면 오답이 됨</td></tr>
        <tr><td><code>field</code></td><td>필드</td><td>스키마의 항목 하나</td></tr>
        <tr><td><code>schema evolution</code></td><td>스키마 확장</td><td>새로운 경우가 생겼을 때 스키마를 수정하는 일</td></tr>
        <tr><td><code>force-fit</code></td><td>억지로 끼워 맞춤</td><td>맞지 않는 값을 있는 항목에 밀어 넣는 실패. enum이 좁을 때 발생함</td></tr>
        <tr><td><code>fabricate</code></td><td>지어내다</td><td>없는 값을 만들어내는 것. required와 값 없음의 조합이 원인임</td></tr>
        <tr><td><code>confidence score</code></td><td>신뢰도 점수</td><td>모델이 스스로 매긴 확신도. <b>실제 정확도가 아님</b>. 보정 없이 쓰면 위험함</td></tr>
        <tr><td><code>structured output</code></td><td>구조화 출력</td><td>파싱 가능한 형태의 출력</td></tr>
        <tr><td><code>free-form prose</code></td><td>자유 서술</td><td>파싱할 수 없는 산문. CI 파이프라인에서 조용히 버려지는 형태</td></tr>
        <tr><td><code>extraction</code></td><td>추출</td><td>문서에서 필드 값을 뽑아내는 작업</td></tr>
        <tr><td><code>classification</code></td><td>분류</td><td>정해진 범주로 나누는 작업</td></tr>
        <tr><td><code>temperature</code></td><td>온도</td><td>출력의 무작위성. <b>규칙을 강제하는 수단이 아님</b>. 오답 보기로 자주 등장함</td></tr>
        </table>`},

      {type:"concept", kind:"TOPIC · 주제 설명", h:"묶음 E: 컨텍스트 · 신뢰성 (20개)",
       html:`<table>
        <tr><th>영어</th><th>한국어</th><th>이 시험에서의 의미</th></tr>
        <tr><td><code>context window</code></td><td>컨텍스트 창</td><td>한 번에 볼 수 있는 내용의 한도. 키운다고 주의력 문제가 해결되지는 않음</td></tr>
        <tr><td><code>token</code></td><td>토큰</td><td>분량 · 비용 · 속도를 재는 단위</td></tr>
        <tr><td><code>token spend</code></td><td>토큰 소모</td><td>이번 작업이 사용한 양. "minimal token spend"가 붙으면 재실행 답이 탈락함</td></tr>
        <tr><td><code>context budget</code></td><td>컨텍스트 예산</td><td>이 작업에 허용된 컨텍스트 분량</td></tr>
        <tr><td><code>context degradation</code></td><td>컨텍스트 열화</td><td>대화가 길어질수록 앞부분 내용을 사용하지 못하게 되는 현상</td></tr>
        <tr><td><code>progressive summarization</code></td><td>점진적 요약</td><td>오래된 대화를 압축해 가는 방식. 숫자와 날짜가 여기서 사라짐</td></tr>
        <tr><td><code>case facts</code></td><td>사건 사실 블록</td><td>요약 대상에서 <b>제외</b>하고 원문 그대로 보존하는 항목. 금액과 주문번호가 들어감</td></tr>
        <tr><td><code>scratchpad</code></td><td>스크래치패드</td><td>발견과 제약을 적어 두는 외부 파일. 컨텍스트 밖에 두는 기록</td></tr>
        <tr><td><code>escalate</code></td><td>사람에게 넘기다</td><td>에이전트가 판단을 멈추고 사람에게 인계하는 것</td></tr>
        <tr><td><code>escalation trigger</code></td><td>에스컬레이션 조건</td><td>넘겨야 하는 상황의 정의. 감정 점수와 턴 수는 근거가 되지 못함</td></tr>
        <tr><td><code>policy gap</code></td><td>정책 공백</td><td>규정에 해당 조항이 아예 없는 경우. 지어내지 말고 사람에게 넘겨야 함</td></tr>
        <tr><td><code>improvise</code></td><td>즉흥적으로 만들어내다</td><td>없는 정책을 그 자리에서 지어내는 것. 감사에서 문제가 되는 행동</td></tr>
        <tr><td><code>suppress</code></td><td>억누르다 · 걸러 없애다</td><td>결과를 조건으로 걸러 삭제하는 것. 대개 오답 방향임</td></tr>
        <tr><td><code>attribution</code></td><td>출처 표시</td><td>어떤 주장이 어느 소스에서 왔는지 표시하는 것</td></tr>
        <tr><td><code>verifiable</code></td><td>검증 가능한</td><td>원 소스로 되짚어 갈 수 있는 상태</td></tr>
        <tr><td><code>partial results</code></td><td>부분 결과</td><td>일부만 성공했을 때 남은 것. 감추지 말고 표시해 발행할 것</td></tr>
        <tr><td><code>observability</code></td><td>관측 가능성</td><td>무슨 일이 있었는지 한 곳에서 확인할 수 있는 정도</td></tr>
        <tr><td><code>audit</code></td><td>감사</td><td>나중에 기록을 되짚어 검증하는 것. 흔적을 남기는 설계가 정답이 됨</td></tr>
        <tr><td><code>SLA</code></td><td>서비스 수준 합의</td><td>"N시간 안에" 같은 약속. 시간 제약 문항의 판단 기준</td></tr>
        <tr><td><code>stratified sampling</code></td><td>층화 표집</td><td>범주별로 나눠 표본을 뽑는 것. 전체 정확도 수치의 착시를 제거함</td></tr>
        </table>`},

      {type:"concept", kind:"TOPIC · 주제 설명", h:"묶음 F: 문항 문장이 반복하는 동사 · 표현 (18개)",
       html:`<p class="lead">도메인 지식이 아니라 <strong>문항 문장 자체가 반복해서 쓰는</strong> 표현임. 이것이 읽히지 않으면 지문 내용을 알아도 질문을 파악하지 못함.</p>
        <table>
        <tr><th>영어</th><th>한국어</th><th>이 시험에서의 의미</th></tr>
        <tr><td><code>address</code></td><td>해결하다 · 다루다</td><td>이 조치가 그 문제를 실제로 다루는지 묻는 말</td></tr>
        <tr><td><code>mitigate</code> · <code>mitigation</code></td><td>완화하다 · 완화책</td><td>제거하지는 못해도 줄이는 것. 근본 처방과 구분해 물음</td></tr>
        <tr><td><code>surface</code> (동사)</td><td>드러내다</td><td>숨어 있던 실패나 정보를 보이게 하는 것. 정답 방향인 경우가 많음</td></tr>
        <tr><td><code>propagate</code></td><td>전파하다</td><td>에러나 정보가 상위로 올라가는 것. 코디네이터까지 도달해야 함</td></tr>
        <tr><td><code>enforce</code> · <code>enforcement</code></td><td>강제하다 · 강제</td><td>프로그램으로 지키게 만드는 것. 프롬프트 지시와 대비되는 말</td></tr>
        <tr><td><code>guarantee</code></td><td>보장하다</td><td>예외가 0이라는 뜻. 확률적 처방은 이 단어 앞에서 전부 탈락함</td></tr>
        <tr><td><code>preserve</code></td><td>보존하다</td><td>그대로 유지하기. 요약 과정에서 무엇을 남길지 묻는 문항의 핵심어</td></tr>
        <tr><td><code>bypass</code></td><td>우회하다</td><td>규칙을 건너뛰기. 우회가 가능한 설계는 보장이 아님</td></tr>
        <tr><td><code>warrant</code></td><td>~할 만하다</td><td>이 작업이 그것을 쓸 만한지 묻는 말. 과잉 대응을 가려냄</td></tr>
        <tr><td><code>telltale sign</code></td><td>결정적 징후</td><td>원인을 특정해 주는 신호. 지문에 이 표현이 나오면 그곳이 답의 근거임</td></tr>
        <tr><td><code>root cause</code></td><td>근본 원인</td><td>증상이 아닌 실제 원인. 원칙 ②와 동일함</td></tr>
        <tr><td><code>countermeasure</code></td><td>대응책</td><td>증상에 맞는 처방. 짝짓기 문항으로 자주 출제됨</td></tr>
        <tr><td><code>safeguard</code></td><td>안전장치</td><td>사고를 막는 장치. "ongoing safeguard"이면 재발 방지 설계를 묻는 것임</td></tr>
        <tr><td><code>redesign</code></td><td>재설계</td><td>구조를 바꾸는 수정. FIRST step 문항에서는 대개 오답임</td></tr>
        <tr><td><code>overhead</code></td><td>부가 비용</td><td>본 작업 외에 드는 비용. 탐색 호출과 중복 조사가 대표 사례</td></tr>
        <tr><td><code>downstream</code></td><td>하류 · 후속</td><td>이 단계 뒤에 붙는 것. "downstream consumers"는 수정할 수 없는 대상인 경우가 많음</td></tr>
        <tr><td><code>upstream</code></td><td>상류 · 선행</td><td>이 단계 앞에 있는 것. 원인이 여기 있는 경우가 많음</td></tr>
        <tr><td><code>verbatim</code></td><td>글자 그대로</td><td>수정 없이 그대로 가져다 쓰는 것. 원본이 바뀌면 그대로 영향을 받음</td></tr>
        </table>
        <div class="callout">📌 합계 22 + 20 + 20 + 20 + 20 + 18 = <b>120개</b>임. 전부 이 코스의 기존 문항에서 실제로 쓰인 표현임.</div>`},
    ]},

  /* ================= E-5 · 30초 스캔 훈련 ================= */
  { id:"pec5", ch:"E-5", title:"30초 스캔 훈련: 네 칸 채우기",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"긴 지문에서 확인할 항목은 네 개임",
       html:`<p class="lead">E-1이 <strong>어디부터 읽을지</strong>를 다뤘다면 E-5는 <strong>읽은 내용을 어떻게 정리해 둘지</strong>를 다룸. 200단어짜리 지문을 모두 기억할 필요는 없음. 네 칸만 채우면 됨.</p>
        <h4>스캔 카드의 네 칸</h4>
        <table>
          <tr><th>칸</th><th>영어에서 무엇을 찾는가</th><th>어떻게 적는가</th></tr>
          <tr><td><strong>① SCENARIO · 시나리오</strong></td><td>어떤 시스템에 관한 이야기인지</td><td>한 단어로: 추출 / 리뷰봇 / 리서치 / 지원 에이전트 / 마이그레이션 / CI</td></tr>
          <tr><td><strong>② SYMPTOM · 증상</strong></td><td>무엇이 잘못됐는지</td><td>동사 하나 + 숫자 하나로: "누락 8,400행", "터키어 71%"</td></tr>
          <tr><td><strong>③ CONSTRAINT · 제약</strong></td><td>무엇을 지켜야 하는지</td><td>한국어 한 마디로: "재실행 불가", "필드 유지". 없으면 <b>없음이라고 확정</b></td></tr>
          <tr><td><strong>④ ASK · 질문</strong></td><td>무엇을 묻는지 + 지시어</td><td>지시어 + 대상으로: "MOST + 스키마 변경", "LEAST + 재발 방지"</td></tr>
        </table>
        <h4>스캔 규칙 다섯</h4>
        <ul>
          <li><strong>각 칸은 다섯 단어 이내로 적음.</strong> 문장으로 적기 시작하면 시간이 다시 늘어남</li>
          <li><strong>숫자는 반드시 확인함.</strong> 40% · 3 AM · 0.94 · 8,400. 시험이 숫자를 넣은 이유는 그 숫자로 보기를 가르기 위해서임</li>
          <li><strong>고유명사는 철자를 읽지 않음.</strong> <code>process_refund</code>와 <code>lookup_order</code>를 서로 구분할 정도면 충분함. 발음하려고 하면 시간이 소모됨</li>
          <li><strong>③이 없음인 것도 성과임.</strong> 없다고 확정해야 보기를 고를 때 흔들리지 않음</li>
          <li><strong>배경 숫자와 결정적 숫자를 구분함.</strong> "9,000 contracts each night"처럼 규모만 알려 주는 숫자는 대개 쓰이지 않음. 증상 문장 안에 있는 숫자가 판단에 쓰이는 숫자임</li>
        </ul>
        <div class="callout">⏱ 네 칸을 채우는 목표 시간은 <b>30초</b>임. 모두 채워지면 보기 읽기로 넘어가고, 채워지지 않은 칸이 있으면 그 칸에 해당하는 부분만 지문에서 다시 찾을 것. 지문 전체를 다시 읽지 않음.</div>`},

      {type:"concept", kind:"TOPIC · 주제 설명", h:"시연 1: 다국어 리뷰 분류 파이프라인",
       html:`<p class="lead">먼저 지문을 읽을 것. 그 다음에 네 칸을 어떻게 채웠는지 확인할 것.</p>
        <div style="border:1px solid var(--line);background:var(--surface2);padding:10px 14px;border-radius:8px;margin:8px 0;line-height:1.7">
          Your team runs a review-triage service on the Claude API. Every night it classifies roughly 40,000 customer reviews written in eleven languages into one of six product-issue categories, and the output feeds a quality dashboard used by regional managers.
          <br><br>
          Since the Turkish and Vietnamese locales were added six weeks ago, managers in those regions report that the dashboard shows almost everything under "general feedback." Sampling confirms it: 71% of Turkish reviews land in "general feedback" against 12% for English, even where the reviewer plainly describes shipping damage or a sizing problem.
          <br><br>
          The classification prompt carries eight few-shot examples, all written in English, all drawn from clear-cut cases. The six categories are keyed to three downstream reports and cannot be changed.
          <br><br>
          Which change MOST improves classification accuracy for the new locales?
        </div>
        <h4>네 칸</h4>
        <table>
          <tr><th>칸</th><th>채운 내용</th><th>어느 문장에서</th></tr>
          <tr><td>① 시나리오</td><td>야간 리뷰 분류</td><td>첫 문장. 여기서 더 읽지 않아도 됨</td></tr>
          <tr><td>② 증상</td><td>터키어 71% → general feedback (영어 12%)</td><td>둘째 문단. 두 숫자를 <b>함께</b> 확인하는 것이 핵심임. 71%만 보면 원래 어려운 언어인가로 오해하게 됨</td></tr>
          <tr><td>③ 제약</td><td>카테고리 6개 변경 불가</td><td>셋째 문단 끝. "keyed to three downstream reports"가 이유이고 "cannot be changed"가 제약임</td></tr>
          <tr><td>④ 질문</td><td>MOST + 정확도 개선</td><td>마지막 줄. MOST가 붙었으므로 보기 여럿이 맞는 말임</td></tr>
        </table>
        <h4>네 칸만으로 보기가 갈리는 과정</h4>
        <ul>
          <li>카테고리를 하나 추가하자는 보기: <strong>③이 탈락시킴</strong></li>
          <li>영어 예시를 더 넣자는 보기: <strong>②의 대비(71% 대 12%)가 탈락시킴</strong>. 영어는 이미 잘 처리되고 있음</li>
          <li>전부 영어로 번역한 뒤 분류하자는 보기: 그럴듯하지만 원인이 언어 자체가 아니라 <strong>예시가 clear-cut 사례뿐</strong>이라는 데 있음. 셋째 문단이 그것을 알려 주었음</li>
          <li>남는 것은 새 로케일의 애매한 사례로 예시를 보강하는 답임</li>
        </ul>
        <div class="callout">🎯 여기서 읽지 않은 것. 40,000이라는 규모, 11개 언어라는 숫자, 대시보드를 누가 보는지에 대한 서술임. 셋 다 보기를 가르는 데 쓰이지 않았음. 배경 숫자였음.</div>`},

      {type:"concept", kind:"TOPIC · 주제 설명", h:"시연 2: 야간 데이터 마이그레이션 검증",
       html:`<p class="lead">이번에는 제약이 두 개 붙어 있고, 증상 문장 안에 원인 진술이 들어 있음.</p>
        <div style="border:1px solid var(--line);background:var(--surface2);padding:10px 14px;border-radius:8px;margin:8px 0;line-height:1.7">
          A migration agent moves records from a legacy inventory database into a new schema. It runs unattended overnight in a container with no human present. For each table it reads a batch of rows, transforms them, writes them, and calls verify_batch to compare counts.
          <br><br>
          Last night's run reported "migration complete" at 04:12. This morning the new database is missing 8,400 rows from the supplier_lots table. The run log shows verify_batch returned ok for every batch — including three batches whose write step had timed out. The tool's author made verify_batch report ok whenever it could not reach the target database, "so a flaky connection wouldn't fail the whole migration."
          <br><br>
          The cutover window has closed and the legacy database is now read-only.
          <br><br>
          What is the correct fix?
        </div>
        <h4>네 칸</h4>
        <table>
          <tr><th>칸</th><th>채운 내용</th><th>놓치기 쉬운 지점</th></tr>
          <tr><td>① 시나리오</td><td>야간 무인 DB 이관</td><td>"unattended"와 "no human present"는 사람이 개입하는 답이 전부 탈락한다는 신호임</td></tr>
          <tr><td>② 증상</td><td>8,400행 누락 · verify가 실패를 ok로 보고</td><td>증상이 사실 <b>두 개</b>임. 누락은 결과이고 ok 보고가 원인임. 인용부호 안의 "so a flaky connection wouldn't fail..."이 원인 진술임</td></tr>
          <tr><td>③ 제약</td><td>전체 재실행 불가(cutover 종료 · 원본 읽기 전용)</td><td>따로 떨어진 한 줄이라 지나치기 쉬움. 그러나 이것이 보기 두세 개를 탈락시킴</td></tr>
          <tr><td>④ 질문</td><td>correct fix. 지시어 없음</td><td>최상급이 없으므로 소거법이 통함. 명백히 틀린 것을 지우면 됨</td></tr>
        </table>
        <h4>인용부호를 만나면</h4>
        <ul>
          <li>지문에 <strong>큰따옴표로 누군가의 말</strong>이 인용되어 있으면 거의 항상 <strong>잘못된 판단의 근거</strong>임</li>
          <li>"so one flaky source doesn't fail the whole pipeline", "error noise confuses the model", "to save tokens". 전부 선의로 한 최적화가 사고를 낸 형태임</li>
          <li>그러므로 인용부호가 보이면 <strong>그곳이 원인</strong>이라고 먼저 확인할 것. 스캔에서 이것은 비용 없이 얻는 정보임</li>
        </ul>
        <div class="callout">🎯 정답 방향. 도달 실패를 실패로 드러내도록 verify_batch를 수정하고, 로그에서 실패한 세 배치만 특정해 그 부분만 다시 옮기는 것임. ③이 전체 재실행을 막았으므로 남은 방법은 부분 복구뿐임.</div>`},

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
