/* PART 0: 오리엔테이션 */
window.CCAF_CONTENT.p0 = {
  id: "p0",
  lessons: [

  { id:"p0l1", ch:"0-1", title:"CCAR-F 시험 구조",
    steps:[
      {type:"concept", kind:"TOPIC · 시험 구조", h:"시험의 기본 조건",
   html:`<h4>① 기본 정보</h4>
<table>
<tr><th>항목</th><th>내용</th></tr>
<tr><td>시험 이름</td><td>Claude Certified Architect – Foundations. 시험 코드는 CCAR-F</td></tr>
<tr><td>문항 수</td><td>60문항</td></tr>
<tr><td>출제 구조</td><td>시나리오 6개 중 4개 출제</td></tr>
<tr><td>시험 시간</td><td>120분. 입실 확인과 안내를 포함한 전체 소요 시간은 약 135분</td></tr>
<tr><td>점수 범위</td><td>100~1000점</td></tr>
<tr><td>합격선</td><td>720점</td></tr>
<tr><td>응시료</td><td>125달러</td></tr>
<tr><td>시험 언어</td><td>영어, 일본어</td></tr>
<tr><td>감독</td><td>Pearson VUE. 시험장 또는 온라인 감독</td></tr>
<tr><td>결과 표시</td><td>합격 여부와 점수, 영역별 정답률</td></tr>
<tr><td>자격 유효 기간</td><td>12개월. 무료 갱신 평가로 연장</td></tr>
</table>
<h4>② 응시 조건과 접수</h4>
<ul>
<li>응시 조건: Claude Partner Network에 속한 조직의 회사 이메일 계정. 만 18세 이상</li>
<li>접수 경로: Partner Academy의 시험 페이지에서 등록한 뒤 Pearson 사이트로 이동해 일정 예약</li>
<li>일정 변경과 취소: 예약 시각 24시간 전까지 가능. 그 뒤에 바꾸면 응시료를 돌려받지 못함</li>
<li>시험 당일 준비물: 정부가 발급한 사진 신분증. 등록한 이름과 신분증의 이름이 같아야 함</li>
</ul>
<h4>③ 응시 규칙</h4>
<ul>
<li>문항 형식: 답을 하나 고르는 문항과 여러 개 고르는 문항. 고를 개수는 문항에 표시</li>
<li>참고 자료, 번역 도구, AI 사용 불가</li>
<li>점수는 시험이 끝나면 화면에 표시</li>
<li>문항을 건너뛰거나 돌아와서 고칠 수 있는지는 공식 자료에 안내 없음</li>
</ul>
<h4>④ 재응시 대기</h4>
<table>
<tr><th>불합격 횟수</th><th>대기 기간</th></tr>
<tr><td>1회</td><td>14일</td></tr>
<tr><td>2회</td><td>30일</td></tr>
<tr><td>3회</td><td>90일</td></tr>
</table>
<ul>
<li>12개월 동안 최대 4회까지 응시 가능. 응시할 때마다 응시료 납부</li>
</ul>
<h4>⑤ 출제 영역과 비중</h4>
<table>
<tr><th>영역</th><th>내용</th><th>비중</th><th>이 사이트의 파트</th></tr>
<tr><td>D1</td><td>에이전트 아키텍처와 오케스트레이션</td><td>27%</td><td>Part 1</td></tr>
<tr><td>D3</td><td>Claude Code 설정과 워크플로</td><td>20%</td><td>Part 3</td></tr>
<tr><td>D4</td><td>프롬프트 엔지니어링과 구조화된 출력</td><td>20%</td><td>Part 4</td></tr>
<tr><td>D2</td><td>도구 설계와 MCP 통합</td><td>18%</td><td>Part 2</td></tr>
<tr><td>D5</td><td>컨텍스트 관리와 신뢰성</td><td>15%</td><td>Part 5</td></tr>
</table>
<ul>
<li>비중이 큰 순서: D1, D3과 D4, D2, D5. 앞의 세 영역 합계는 67%</li>
<li>출처: 공식 시험 가이드 1.0판(2026년 7월 적용)과 Partner Academy의 자주 묻는 질문. 확인 날짜 2026-11-24</li>
<li>시험 규정은 바뀔 수 있으므로 접수 전에 Partner Academy의 시험 페이지에서 다시 확인</li>
</ul>`},

      {type:"concept", kind:"TOPIC · 출제 형식", h:"시나리오 묶음 출제",
   html:`<h4>① 출제 구조</h4>
<ul>
<li>상황 설명 하나 아래에 그 상황을 바탕으로 한 문항 여러 개가 묶여서 출제</li>
<li>준비된 시나리오는 6개. 그중 4개가 무작위로 출제</li>
<li>어느 4개가 나올지는 시험을 시작할 때까지 알 수 없음</li>
<li>시나리오마다 시스템 구성과 목표를 설명하는 글로 시작</li>
</ul>
<div class="fig">시험 한 회의 구성<br>
시나리오 A 설명 <span class="an">← 한 번 읽기</span><br>
&nbsp;&nbsp;문항 1, 문항 2, 문항 3 … <span class="an">← 같은 설명이 근거</span><br>
시나리오 B 설명<br>
&nbsp;&nbsp;문항 …<br>
시나리오 C 설명, 시나리오 D 설명도 같은 구조</div>
<h4>② 읽는 방법</h4>
<ul>
<li>상황 설명을 처음 읽을 때 도구 목록, 목표 수치, 제약 조건 확인</li>
<li>상황을 잘못 이해하면 그 아래 문항을 함께 틀림</li>
<li>문항마다 상황을 다시 읽지 않으므로 처음 읽는 데 시간을 더 배정</li>
</ul>
<h4>③ 학습 방향</h4>
<ul>
<li>문항이 묻는 내용: 이 상황에 가장 맞는 방법</li>
<li>개념 하나의 뜻보다 여러 방법 사이의 선택 기준이 필요</li>
<li>시나리오 6개의 상황을 미리 알아 두면 시험장에서 읽는 시간 단축</li>
</ul>`},

      {type:"concept", kind:"TOPIC · 시나리오 6종", h:"시나리오 6개",
   html:`<ul>
<li>아래 6개 중 4개가 무작위로 출제</li>
<li>시나리오 설명과 관련 영역은 공식 시험 가이드의 내용. 묻는 내용은 이 사이트가 정리한 내용</li>
<li>괄호 안은 그 내용을 다루는 이 사이트의 파트와 챕터</li>
<li>예시 문항은 Part 6의 연습 문항</li>
</ul>
<div class="scgrid">
<div class="scb">
<div class="scn">SCENARIO 01</div>
<h5>고객지원 해결 에이전트</h5>
<div class="sce">Customer Support Resolution Agent</div>
<div class="scd">Agent SDK로 만든 고객지원 에이전트. 반품, 결제 분쟁, 계정 문제 처리. MCP 도구 4개(get_customer, lookup_order, process_refund, escalate_to_human) 사용. 목표는 첫 문의에서 해결하는 비율 80% 이상</div>
<div class="scdom"><span>D1 27%</span><span>D2 18%</span><span>D5 15%</span></div>
<div class="sclab">묻는 내용</div>
<ul>
<li>환불처럼 금액이 걸린 작업 전에 본인 확인을 강제하는 방법. 지시문이 아니라 프로그램으로 차단 (Part 1 CH 5)</li>
<li>도구가 실패했을 때 오류의 종류와 재시도 가능 여부를 함께 돌려주는 구조 (Part 2 CH 2)</li>
<li>사람에게 넘기는 기준. 고객의 명시적 요구, 규칙에 없는 상황, 더 진행할 수 없는 상태. 감정 표현은 기준이 아님 (Part 5 CH 2)</li>
<li>긴 대화에서 금액, 날짜, 주문 번호를 요약 대상에서 빼고 따로 보관하는 방법 (Part 5 CH 1)</li>
</ul>
<div class="scq"><b>예시 문항</b>A customer message contains two requests: (a) a refund for order #B-2210, fully covered by your return policy, and (b) compensation for "emotional distress," which your policy does not address at all.<br>규칙에 있는 요청과 규칙에 없는 요청을 한 메시지 안에서 나눠 각각 직접 해결과 사람 전달로 처리하는지 묻는 문항</div>
</div>
<div class="scb">
<div class="scn">SCENARIO 02</div>
<h5>Claude Code 코드 생성</h5>
<div class="sce">Code Generation with Claude Code</div>
<div class="scd">팀이 코드 작성, 구조 정리, 오류 수정, 문서 작성에 Claude Code를 쓰는 상황. 슬래시 명령으로 실행하는 스킬, CLAUDE.md 설정, 플랜 모드와 바로 실행 사이의 선택이 등장</div>
<div class="scdom"><span>D3 20%</span><span>D5 15%</span></div>
<div class="sclab">묻는 내용</div>
<ul>
<li>CLAUDE.md를 두는 위치와 위치별 적용 대상 (Part 3 CH 1)</li>
<li>스킬을 두는 위치와 SKILL.md 설정 항목 (Part 3 CH 2)</li>
<li>플랜 모드를 쓰는 조건. 큰 변경, 가능한 방법이 여러 개인 경우, 구조에 대한 결정 (Part 3 CH 4)</li>
<li>이전 세션을 이어 갈지 요약을 넣어 새로 시작할지의 판단 (Part 1 CH 7)</li>
</ul>
<div class="scq"><b>예시 문항</b>A senior dev's Claude Code generates code with tabs and semicolons; everyone else's uses the team standard (spaces, no semicolons).<br>설정이 개인용 위치와 프로젝트 위치 중 어디에 있어서 팀원마다 결과가 다른지 찾는 문항</div>
</div>
<div class="scb">
<div class="scn">SCENARIO 03</div>
<h5>멀티에이전트 리서치 시스템</h5>
<div class="sce">Multi-Agent Research System</div>
<div class="scd">코디네이터가 웹 검색, 문서 분석, 종합, 보고서 작성 서브에이전트에 작업을 나눠 주는 구조. 목표는 출처가 붙은 종합 보고서</div>
<div class="scdom"><span>D1 27%</span><span>D2 18%</span><span>D5 15%</span></div>
<div class="sclab">묻는 내용</div>
<ul>
<li>모든 전달이 코디네이터를 거치게 하는 이유 (Part 1 CH 3)</li>
<li>서브에이전트는 코디네이터의 대화 기록을 물려받지 않는다는 점. 필요한 정보는 지시문에 직접 포함 (Part 1 CH 4)</li>
<li>실패를 보고할 때 담을 네 가지. 실패 종류, 시도한 내용, 부분 결과, 대안 (Part 5 CH 3)</li>
<li>주장과 출처의 연결을 종합 단계까지 유지하는 방법 (Part 5 CH 6)</li>
</ul>
<div class="scq"><b>예시 문항</b>An engineer proposes: "Let the synthesis agent message the search agent directly when it needs more sources. Cutting the coordinator out saves a round trip."<br>서브에이전트끼리 직접 주고받게 하는 제안으로 잃는 것을 묻는 문항</div>
</div>
<div class="scb">
<div class="scn">SCENARIO 04</div>
<h5>개발자 생산성 도구</h5>
<div class="sce">Developer Productivity with Claude</div>
<div class="scd">Agent SDK로 만든 개발 지원 도구. 처음 보는 코드 탐색, 오래된 시스템 이해, 반복되는 기본 코드 작성, 반복 작업 자동화. 내장 도구(Read, Write, Bash, Grep, Glob)와 MCP 서버를 함께 사용</div>
<div class="scdom"><span>D2 18%</span><span>D3 20%</span><span>D1 27%</span></div>
<div class="sclab">묻는 내용</div>
<ul>
<li>상황에 맞는 내장 도구 선택. 파일 내용 검색은 Grep, 파일 이름 검색은 Glob (Part 2 CH 5)</li>
<li>MCP 서버 설정 위치. 팀 공용은 프로젝트의 .mcp.json, 개인용은 ~/.claude.json (Part 2 CH 4)</li>
<li>도구가 너무 많으면 선택이 부정확해진다는 점 (Part 2 CH 3)</li>
<li>작업을 나누는 방식의 선택. 진행하며 계획이 바뀌는 작업과 순서가 정해진 작업의 구분 (Part 1 CH 2)</li>
</ul>
<div class="scq"><b>예시 문항</b>You must find every place the deprecated formatCurrency function is effectively used.<br>다른 이름으로 다시 내보낸 함수까지 모두 찾는 데 필요한 도구와 순서를 묻는 문항</div>
</div>
<div class="scb">
<div class="scn">SCENARIO 05</div>
<h5>Claude Code CI/CD 통합</h5>
<div class="sce">Claude Code for Continuous Integration</div>
<div class="scd">CI 파이프라인에서 코드 리뷰, 테스트 작성, PR 의견 작성을 자동으로 수행. 목표는 바로 반영할 수 있는 의견과 낮은 오탐 비율</div>
<div class="scdom"><span>D3 20%</span><span>D4 20%</span></div>
<div class="sclab">묻는 내용</div>
<ul>
<li>사람 없이 실행하는 옵션 -p와 출력 형식 옵션(--output-format json, --json-schema) (Part 3 CH 6)</li>
<li>코드를 만든 세션과 리뷰하는 세션의 분리 (Part 4 CH 6)</li>
<li>오탐을 줄이는 방법. 막연한 지시 대신 종류별 기준 명시 (Part 4 CH 1)</li>
<li>병합 전 검사는 일반 요청, 밤이나 주 단위 분석은 배치 (Part 4 CH 5)</li>
</ul>
<div class="scq"><b>예시 문항</b>Your pipeline stage generates a code patch with Claude, then, in the same session, appends "now review your patch carefully for bugs before we merge."<br>코드를 만든 세션이 자기 코드를 리뷰할 때의 한계와 바꿀 구조를 묻는 문항</div>
</div>
<div class="scb">
<div class="scn">SCENARIO 06</div>
<h5>구조화 데이터 추출</h5>
<div class="sce">Structured Data Extraction</div>
<div class="scd">형식이 정해지지 않은 문서에서 정보를 뽑아 JSON 스키마로 검증. 조건은 높은 정확도 유지, 예외적인 문서의 안전한 처리, 다음 시스템과의 연결</div>
<div class="scdom"><span>D4 20%</span><span>D5 15%</span></div>
<div class="sclab">묻는 내용</div>
<ul>
<li>형식을 강제해도 내용 오류는 남는다는 점. 문서에 없을 수 있는 항목은 빈 값 허용 (Part 4 CH 3)</li>
<li>재시도가 효과 있는 경우와 없는 경우의 구분 (Part 4 CH 4)</li>
<li>전체 정확도가 특정 문서 종류의 낮은 정확도를 가린다는 점. 신뢰도는 보정한 뒤에 사용 (Part 5 CH 5)</li>
<li>배치 처리 조건. 비용 50% 절감, 최대 24시간, 완료 시각 보장 없음 (Part 4 CH 5)</li>
</ul>
<div class="scq"><b>예시 문항</b>You want to auto-approve extractions the model is confident about and route the rest to reviewers.<br>Claude가 매긴 신뢰도를 자동 승인 기준으로 쓰기 전에 할 일을 묻는 문항</div>
</div>
</div>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>MCP</b>: Claude에 외부 도구와 자료를 연결하는 표준 방식</li>
<li><b>서브에이전트(subagent)</b>: 에이전트가 일부 작업을 맡기려고 따로 실행하는 에이전트</li>
<li><b>CI 파이프라인</b>: 코드가 올라올 때마다 검사와 테스트를 자동으로 실행하는 장치</li>
<li><b>오탐</b>: 문제가 아닌 것을 문제라고 잘못 알리는 일</li>
<li><b>PR(pull request)</b>: 코드 변경을 합쳐 달라고 올리는 요청</li>
</ul>
</div>`},

      {type:"concept", kind:"TOPIC · 시간 배분", h:"시간 배분",
   html:`<h4>① 시간을 쓰는 두 곳</h4>
<table>
<tr><th>쓰는 곳</th><th>배정</th><th>계산</th></tr>
<tr><td>상황 설명 읽기</td><td>약 10분</td><td>시나리오 4개. 하나에 2~3분</td></tr>
<tr><td>문항 풀기</td><td>약 110분</td><td>60문항. 문항 하나에 약 1분 50초</td></tr>
</table>
<h4>② 문항마다 답을 정하는 방식</h4>
<ul>
<li>문항을 건너뛰거나 돌아와서 고칠 수 있는지는 공식 자료에 안내 없음</li>
<li>연습은 문항마다 그 자리에서 답을 정하는 방식으로 진행</li>
<li>확신이 없는 문항도 선택지를 제외한 뒤 남은 것 중 하나를 그 자리에서 선택</li>
<li>문항 하나의 상한 3분. 3분이 지나면 남은 선택지 중 하나를 고르고 진행</li>
</ul>
<h4>③ 배분 기준</h4>
<ul>
<li>바로 판단되는 문항은 30초 안에 처리. 아낀 시간은 글이 긴 문항에 사용</li>
<li>답을 여러 개 고르는 문항은 고를 개수 확인. 시간을 더 배정</li>
<li>글이 긴 문항은 마지막 질문 문장을 먼저 읽은 뒤 상황 읽기</li>
</ul>
<h4>④ 시간이 부족할 때</h4>
<ul>
<li>남은 시간을 남은 문항 수로 나눠 문항 하나에 쓸 시간을 다시 계산</li>
<li>끝나는 시점에 60문항 모두 답이 선택된 상태</li>
</ul>`},

      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"부정형 질문 연습",
       q:`Which of the following is an anti-pattern when a subagent reports a failed web search to the coordinator?`,
       opts:[
         {t:`Returning an empty result set marked as successful after the search times out.`, ok:true},
         {t:`Including the exact query that was attempted along with the failure type.`},
         {t:`Attaching the two partial results retrieved before the timeout.`},
         {t:`Retrying the transient timeout twice locally before reporting upward.`},
       ],
       hint:`질문이 묻는 것은 "안티패턴"임. 좋은 것 셋과 나쁜 것 하나가 섞여 있으므로, 고를 방향을 먼저 확인할 것.`,
       explain:{
         good:`실패를 성공으로 위장하는 것은 3대 안티패턴(위장, 뭉개기, 전체 중단) 중 하나임. 코디네이터가 "검색 결과 없음"으로 잘못 읽어 복구 기회가 사라짐. 나머지 셋은 모두 권장 사항임. 시도한 쿼리와 부분 결과는 구조화 전달의 4요소에 해당하고, 일시 오류를 아래에서 재시도한 뒤 해결하지 못한 것만 위로 올리는 것은 오류 전파 설계(TS 5.3)가 명시한 방법임.`,
         wrongs:[
           `<b>B. 시도한 쿼리와 실패 유형:</b> 구조화 오류 전달 4요소 중 둘임. 권장 사항임.`,
           `<b>C. 부분 결과 동봉:</b> 코디네이터가 다음 행동을 판단하는 재료임. 권장 사항임.`,
           `<b>D. 일시 실패의 로컬 재시도:</b> 서브에이전트가 스스로 복구할 수 있는 오류는 아래에서 처리하고, 해결하지 못한 것만 위로 전달함. 권장 사항임.`,
         ]},
       principle:"부정형 질문은 방향부터 확인"},
    ]},

  { id:"p0l3", ch:"0-2", title:"판단 원칙 5가지",
    steps:[
      {type:"concept", kind:"TOPIC · 핵심 도구", h:"판단 기준 다섯 가지",
   html:`<ul>
<li>공식 시험 가이드의 예시 문항 해설에 반복해서 나오는 정답 근거를 이 사이트가 다섯 가지로 정리한 내용</li>
<li>가이드에 실린 목록은 아님</li>
<li>이 사이트의 연습 문항 해설에 해당 기준의 번호 표시</li>
</ul>
<h4>① 반드시 지킬 규칙은 프로그램으로 강제</h4>
<ul>
<li>대상: 금액, 본인 확인, 규정처럼 예외 없이 지켜야 하는 규칙</li>
<li>수단: 훅이나 프로그램으로 만든 사전 조건 검사</li>
<li>지시문의 한계: "반드시"라고 적어도 어기는 경우가 남음</li>
<li>문항의 단서: occasionally, 12% of cases처럼 실패 비율을 적은 표현</li>
</ul>
<h4>② 증상보다 원인</h4>
<ul>
<li>정답: 기록과 자료가 가리키는 원인을 직접 고치는 선택지</li>
<li>오답: 증상만 가리는 선택지. 예: 제한 추가, 결과를 나중에 걸러 내기</li>
</ul>
<h4>③ 필요 이상으로 큰 설계 제외</h4>
<ul>
<li>오답인 경우가 많은 선택지: 별도 분류 모델 학습, 새 분배 단계 구축</li>
<li>"가장 효과적인 첫 조치"를 묻는 문항의 정답: 비용이 적고 원인을 직접 고치는 조치</li>
</ul>
<h4>④ 필요한 도구만 제공</h4>
<ul>
<li>에이전트에는 역할에 필요한 도구만 제공</li>
<li>도구가 많을수록 잘못된 도구를 고를 가능성 증가</li>
<li>자주 하는 작업에는 범위가 좁은 전용 도구 하나. 나머지는 기존 방법 유지</li>
</ul>
<h4>⑤ 실패는 내용을 갖춰 전달</h4>
<ul>
<li>오답: 빈 결과를 성공으로 보고. 작업 전체 중단. 내용 없는 실패 메시지</li>
<li>정답: 실패 종류, 시도한 내용, 부분 결과, 대안을 담아 전달</li>
</ul>
<h4>⑥ 적용 순서</h4>
<ul>
<li>첫째, 선택지 네 개를 읽고 기준에 어긋나는 선택지 제외. 대개 두 개가 남음</li>
<li>둘째, 남은 두 개 중 비용이 적은 조치를 먼저 시도하는 선택지 확인</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>훅(hook)</b>: 정해 둔 시점에 자동으로 실행되는 프로그램. 예: 도구를 실행하기 직전</li>
<li><b>기록(log)</b>: 프로그램이 실행된 과정을 시간 순서로 남긴 글</li>
</ul>
</div>`},
    ]},

  { id:"p0l4", ch:"0-3", title:"비출제 범위와 선택지 소거법",
    steps:[
      {type:"concept", kind:"TOPIC · 범위 밖 주제", h:"시험 범위 밖 주제",
   html:`<ul>
<li>공식 시험 가이드는 출제하지 않는 주제 16개를 목록으로 제시</li>
<li>범위 밖 용어가 들어간 선택지는 대부분 오답</li>
</ul>
<h4>① 출제하지 않는 주제</h4>
<table>
<tr><th>구분</th><th>주제</th></tr>
<tr><td>모델 내부와 학습</td><td>파인튜닝, 직접 만드는 모델 학습, Claude의 내부 구조와 학습 과정, Constitutional AI, RLHF, 안전성 학습 방법</td></tr>
<tr><td>계정과 요금</td><td>API 인증, 결제, 계정 관리, 사용량 한도, 요금 계산, 토큰 수를 세는 방식</td></tr>
<tr><td>서버 운영</td><td>MCP 서버를 올리고 운영하는 방법, 특정 클라우드 설정(AWS, GCP, Azure)</td></tr>
<tr><td>다른 기능</td><td>computer use, 이미지 분석, 스트리밍</td></tr>
<tr><td>보안 절차</td><td>OAuth, API 키 교체, 인증 방식의 상세 동작</td></tr>
<tr><td>기타</td><td>임베딩 모델과 벡터 DB 구현, 성능 측정과 모델 비교 지표, 프롬프트 캐싱의 구현 방법, 특정 프로그래밍 언어와 프레임워크의 상세 구현</td></tr>
</table>
<h4>② 선택지 제외 방법</h4>
<ul>
<li>"파인튜닝으로 해결"이 든 선택지 제외. 범위 밖이고 필요 이상으로 큰 설계</li>
<li>"벡터 DB 구축", "Kubernetes", "별도 분류 모델 학습"이 든 선택지 제외</li>
<li>없는 기능을 쓴 선택지 제외. 가이드의 예시 문항에 나온 예: CLAUDE_HEADLESS 환경 변수, --batch 옵션</li>
</ul>
<h4>③ 개념만 출제되는 주제</h4>
<table>
<tr><th>주제</th><th>출제 범위</th><th>범위 밖</th></tr>
<tr><td>프로그래밍 언어와 프레임워크</td><td>도구와 스키마 설정에 필요한 수준</td><td>상세 구현</td></tr>
<tr><td>인증</td><td>MCP 서버 설정에서 환경 변수의 값을 불러 쓰는 방식</td><td>OAuth 절차, API 키 교체</td></tr>
<tr><td>프롬프트 캐싱</td><td>기능이 있다는 사실</td><td>구현 방법</td></tr>
</table>
<h4>④ 모르는 문항</h4>
<ul>
<li>범위 밖 용어가 든 선택지부터 제외</li>
<li>남은 선택지 중 하나를 그 자리에서 결정</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>파인튜닝</b>: 이미 만들어진 모델을 추가 자료로 더 학습시키는 일</li>
<li><b>환경 변수</b>: 프로그램 밖에 저장해 두고 프로그램이 읽어 쓰는 값. 비밀 키 보관에 사용</li>
<li><b>벡터 DB</b>: 글을 숫자 묶음으로 바꿔 저장하고 뜻이 비슷한 글을 찾는 데이터베이스</li>
</ul>
</div>`},
    ]},
  ]
};
