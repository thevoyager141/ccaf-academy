/* ============================================================
   open-p5.js: D5(컨텍스트 관리 & 신뢰성) 오프닝 레슨 + 이유 카드 + 용어 확장
   2026-08-27

   로드 순서: part5.js / mt-extra.js / gap-fix.js / appendix.js **뒤**.
   기존 배열 원소는 건드리지 않고 추가·보강만 함. 두 번 로드돼도 중복 삽입 안 됨.
     (1) p5.lessons 맨 앞에 오프닝 레슨 p5c0 삽입
     (2) p5 기존 레슨의 모든 quiz 스텝에 why(이유 카드) 부착. p5c7 포함
     (3) CCAF_APPENDIX.glossary 의 D5 용어 확장
   ============================================================ */
(function(){
  var P5 = window.CCAF_CONTENT && window.CCAF_CONTENT.p5;
  if(!P5 || !Array.isArray(P5.lessons)) return;

  /* ===== 시나리오 브리핑. 스텝 4개가 공유함 (영어 순수 텍스트) ===== */
  var BRIEF = {
    title: "SCENARIO · LONG-RUNNING CODEBASE ANALYSIS",
    body: `Northwind Freight runs a payments platform of roughly 1.2 million lines spread over 40 services. A Claude-powered analysis agent has been asked to produce one migration report: every place the legacy billing client is called, what each call site depends on, and what would break if that client were replaced. The work is planned as a single continuous session of about seven hours. Two things were fixed in the first thirty minutes, in a conversation with the platform lead: the freeze date, the three services that must not be touched, and the rollback rule that applies to services being modified. Those decisions must still be quotable word for word at hour seven, and the final report must name the file and the line number for every call site it lists. Nobody knows in advance which files matter; discovering that is the point of the run. Two earlier attempts failed the same way. Hour-one Grep and Read calls dumped whole files into the conversation, and by hour three the agent had stopped citing the classes it had read and was answering from general knowledge about payment systems instead. The team wants to fix the plan before starting a third attempt.`
  };

  var OPEN = { id:"p5c0", ch:"OPEN", title:"Part 5 문항의 출제 형태", steps:[

  /* ── ① 실전 형태 예고 ── */
  {type:"concept", kind:"PART BRIEFING · 파트 설명", h:"문항이 출제되는 형태",
   html:`<h4>① 출제 규모</h4>
<ul>
<li>영역 이름: D5 컨텍스트 관리와 신뢰성</li>
<li>출제 비중 15%. 60문항 기준 약 9문항</li>
<li>다섯 영역 중 비중이 가장 작은 영역</li>
<li>자주 틀리는 내용 두 가지: 컨텍스트 창 관리 방법의 선택, 대형 코드 탐색의 컨텍스트 관리</li>
</ul>
<h4>② 출제 형태</h4>
<ul>
<li>브리핑 하나 아래에 문항 여러 개</li>
<li>문항마다 묻는 내용이 다름. 버릴 정보, 사람에게 넘길 시점, 탐색 방법</li>
<li>선택지는 여러 방법 중 이 상황에 맞는 방법을 고르는 형태</li>
<li>같은 방법이 한 브리핑에서는 정답이고 다른 브리핑에서는 오답</li>
</ul>
<h4>③ 자주 틀리는 이유</h4>
<ul>
<li>선택지에 관리 방법 네 가지가 이름만 등장</li>
<li>방법마다 버리는 정보와 남기는 정보를 알아야 비교 가능</li>
<li>네 방법의 비교는 CH 7에서 정리</li>
</ul>
<h4>④ 이 레슨의 순서</h4>
<ul>
<li>브리핑 하나와 문항 세 개로 실제 형태 확인</li>
<li>세 문항이 물은 내용과 판단 기준 정리</li>
<li>파트 전체 지도와 용어 정리</li>
</ul>`},

  /* ── ②-a 브리핑 읽는 법 ── */
  {type:"concept", brief:BRIEF, kind:"CONCEPT · 개념 설명", h:"브리핑에서 확인할 네 가지",
   html:`<h4>① 확인할 네 가지</h4>
<table>
<tr><th>항목</th><th>확인할 내용</th><th>이 브리핑의 경우</th></tr>
<tr><td>구성</td><td>누가 무엇을 얼마나 오래 하는지</td><td>코드 120만 줄, 서비스 40개. 이전 작업 보고서 작성. 한 세션으로 7시간 연속 작업</td></tr>
<tr><td>증상</td><td>이미 일어난 실패</td><td>1시간째에 파일 원문 전체가 대화에 누적. 3시간째부터 구체적인 클래스 이름 대신 일반적인 설명으로 답변</td></tr>
<tr><td>제약</td><td>어길 수 없는 조건</td><td>처음 30분에 정한 결정 세 가지를 7시간 뒤에도 글자 그대로 인용. 파일 이름과 줄 번호 필수. 무엇이 중요한지 미리 알 수 없음</td></tr>
<tr><td>질문</td><td>지금 정해야 하는 것</td><td>세 번째 시도 전에 고칠 계획의 내용</td></tr>
</table>
<ul>
<li>위쪽 회색 상자가 브리핑. 문항 세 개가 모두 같은 브리핑에서 출제</li>
</ul>
<h4>② 영어 브리핑을 읽는 순서</h4>
<ul>
<li>첫째, must, must not, cannot, nobody knows, only가 든 문장에 표시. 제약이 모두 이 문장에 있음</li>
<li>둘째, 과거형 문장 찾기. 과거형 문장이 증상. 예: stopped citing, dumped, failed</li>
<li>셋째, 숫자 옮겨 적기. 예: 1.2 million, 40, seven hours, thirty minutes, three services</li>
<li>넷째, 나머지 설명 문장은 빠르게 읽기</li>
</ul>
<h4>③ 숫자 사이의 간격</h4>
<ul>
<li>이 영역의 문항은 숫자 사이의 간격을 질문. 30분에 정한 내용을 7시간 뒤에 사용한다는 간격이 이 브리핑의 핵심</li>
<li>"무엇이 중요한지 미리 알 수 없고 그것을 찾는 것이 작업의 목적"이라는 문장은 세 문항 모두의 근거</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>세션(session)</b>: 하나로 이어진 대화 전체</li>
<li><b>이전 작업(migration)</b>: 쓰던 시스템을 새 시스템으로 옮기는 작업</li>
<li><b>클래스(class)</b>: 코드에서 관련된 기능을 한데 묶은 단위. 이름이 붙어 있음</li>
</ul>
</div>`},
  ]};

  /* ── ②-b Q1 · 컨텍스트가 넘칠 때 무엇을 버리나 (4방식 비교형) ── */
  OPEN.steps.push({type:"quiz", brief:BRIEF, kind:"PRACTICE · 실전 진단", h:"Q1 — What survives to hour seven",
   q:`Hour four of the third attempt. The session is approaching the context limit and the team has to decide what gets dropped as the run continues. Which strategy fits the constraints in the briefing?`,
   opts:[
     {t:`Hold the freeze date, the three protected services and the rollback rule in a structured state object that is rebuilt into every prompt verbatim, and let ordinary summarization compress the exploration narrative around it.`, ok:true},
     {t:`Summarize the session more often and more aggressively, so the decisions from the first thirty minutes are refreshed into the running summary on every pass.`},
     {t:`Keep a sliding window over the most recent turns, which preserves the retained text byte for byte and costs no extra model call.`},
     {t:`Use selective retention: keep verbatim any turn that mentions a date, a service name or a file path, and drop everything else.`},
   ],
   hint:`제약 항목부터 확인할 것. 7시간 뒤에도 글자 그대로 인용돼야 하는 항목이 몇 개이고, 그 목록을 지금 적을 수 있는가. 적을 수 있는지 여부가 네 방식을 구분하는 첫 번째 기준임.`,
   explain:{
     good:`지켜야 할 항목이 <b>세 개로 이미 확정</b>돼 있음. 이것이 구조화 상태 객체(structured state object)를 쓰는 조건임. 값이 글자 그대로 남고, 어느 결정이 무슨 값인지가 필드로 묶여 섞이지 않으며, 턴이 수백 개가 되어도 객체 크기는 늘어나지 않음. 나머지 탐색 기록은 요약에 맡기는 <b>조합</b>이 D5의 기본형임.`,
     wrongs:[
       `<b>B(요약 강화):</b> 요약은 손실 압축이므로 날짜와 서비스 이름 같은 정밀한 값부터 사라짐. 원인이 실행 빈도가 아니라 압축 방식 자체이므로, 자주 실행하면 더 자주 사라지기만 함.`,
       `<b>C(슬라이딩 윈도):</b> "창 안의 내용은 원문 그대로 남는다"는 설명 자체는 맞으므로 오답 유도 선택지임. 첫 30분에 정한 결정은 4시간 뒤에는 창 밖이고, 슬라이딩 윈도(sliding window)는 창 밖의 내용을 요약조차 남기지 않음.`,
       `<b>D(선택적 보존):</b> 지킬 목록이 이미 확정된 상황에서 매 턴 판정을 실행할 이유가 없음. 또한 "파일 경로가 포함된 턴"은 탐색 내내 발생하므로 남길 대상이 계속 늘어나 결국 창이 다시 참.`,
     ]},
   why:{ q:`왜 구조화 상태 객체가 정답인가?`,
     opts:[
       {t:`7시간 뒤에도 글자 그대로 필요한 항목이 세 개로 이미 확정돼 있기 때문임. 필드를 미리 정할 수 있으면 값도, 그 값이 어느 결정에 속하는지도 유지됨.`, ok:true},
       {t:`구조화 상태 객체가 네 방식 중 가장 정확한 방식이기 때문임.`},
       {t:`긴 세션에는 구조화 상태 객체를 쓰는 것이 정석이라고 배웠기 때문임.`},
       {t:`요약은 압축용 모델 호출이 한 번 더 붙어서 비용이 더 들기 때문임.`},
     ],
     explain:`이 판단 기준은 다른 브리핑에도 그대로 적용됨. 글자 그대로 남아야 할 값의 목록을 <b>미리 적을 수 있으면 구조화 상태 객체</b>, <b>적을 수 없으면 선택적 보존</b>임. 목록이 확정됐는지부터 확인하는 것이 순서임.`},
   principle:"지킬 목록이 확정돼 있으면 필드에 담아 유지함"});

  /* ── ②-c Q2 · 사람을 언제 부르나 ── */
  OPEN.steps.push({type:"quiz", brief:BRIEF, kind:"PRACTICE · 실전 진단", h:"Q2 — The rule that says nothing",
   q:`Still hour four. The agent finds that one of the three services the platform lead marked as untouchable does contain a call into the legacy billing client. The rollback rule the lead stated covers only services that are being modified, so it does not reach this case. The agent has re-read the lead's written instructions twice and they are silent on it. What should the agent do?`,
   opts:[
     {t:`Stop and escalate to the platform lead with the specific conflict, what it already checked, the call sites confirmed so far and the options it sees — the instructions have a gap, and only the lead can close it.`, ok:true},
     {t:`Apply the rollback rule to the protected service by analogy, since it is the closest rule the lead gave, and record the assumption in the report.`},
     {t:`Escalate, triggered by the agent's own confidence score for this section falling below the configured threshold.`},
     {t:`Leave that service out of the report with a coverage note saying it was not analyzed, so the run still finishes on schedule.`},
   ],
   hint:`사람을 부르는 정당한 트리거 세 가지를 확인할 것. 지시가 이 경우를 아예 다루지 않는 상황은 그중 어디에 해당하는가. 그리고 커버리지 주석이 맞는 자리는 따로 있음. 소스를 확보하지 못했을 때임.`,
   explain:{
     good:`지시에 해당 조항이 없는 <b>정책 공백</b>은 사람에게 넘기는 정당한 트리거임. 넘길 때는 진행이 막혔다는 사실만 전달하지 않고 <b>무엇이 걸렸는가, 무엇을 시도했는가, 지금까지의 부분 결과, 가능한 선택지</b> 네 가지를 함께 올려야 리드가 그 자리에서 결정할 수 있음. 에스컬레이션(escalation)과 구조화 실패 보고가 한 문항에 함께 나오는 것이 실제 출제 형태임.`,
     wrongs:[
       `<b>B(유추 적용):</b> 가장 가까운 규칙을 가져다 쓰는 것은 규칙을 지키는 것이 아니라 없던 규칙을 만드는 것임. 가정을 리포트에 기록해도 결정 권한이 없는 쪽이 결정했다는 사실은 그대로임.`,
       `<b>C(신뢰도 임계값으로 트리거):</b> 사람을 부른다는 결론은 맞지만 근거가 틀림. 보정되지 않은 자기 신뢰도는 케이스 난이도를 재지 못하며, 여기에는 "지시에 해당 조항이 없음"이라는 확실한 근거가 이미 있음. 근거가 틀리면 다음 케이스에서는 작동하지 않음.`,
       `<b>D(제외하고 커버리지 주석):</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지라서 가장 위험함. 커버리지 주석은 <b>소스를 확보하지 못했을 때</b> 빠진 부분을 정직하게 표시하는 장치이지, 결정이 필요한 충돌을 덮는 용도가 아님. 이 서비스는 이미 호출 지점이 발견된 상태임.`,
     ]},
   why:{ q:`왜 여기서 사람을 불러야 하는가?`,
     opts:[
       {t:`리드의 지시가 이 경우를 아예 다루지 않기 때문임. 규칙의 공백은 에이전트가 채울 수 있는 종류의 빈 자리가 아님.`, ok:true},
       {t:`모델이 이 구간에서 확신이 낮아졌기 때문임.`},
       {t:`장시간 세션은 중간에 사람 확인을 받는 것이 정석이기 때문임.`},
       {t:`프로덕션 결제 코드를 수정하는 작업이라 위험도가 높기 때문임.`},
     ],
     explain:`기준은 한 줄임. <b>물어보면 해결되는 모호함이면 물어서</b> 해결하고, <b>규칙 자체가 없는 공백이면 사람에게 넘김</b>. 감정 점수, 자기 확신, 경과 턴 수는 트리거가 아님.`},
   principle:"지시의 공백은 사람에게 넘기고 근거 네 가지를 함께 올림"});

  /* ── ②-d Q3 · 대형 코드베이스 탐색 전략 ── */
  OPEN.steps.push({type:"quiz", brief:BRIEF, kind:"PRACTICE · 실전 진단", h:"Q3 — Rewriting the exploration plan",
   q:`The team is now rewriting the exploration plan for the third attempt, aiming at both failures the earlier runs showed. Which plan fits the briefing best?`,
   opts:[
     {t:`Narrow with Glob and Grep first and Read only the matched regions; hand the bulk sweeps to subagents that return summaries carrying file and line references; and have the agent append every confirmed call site to a scratchpad file it can re-read later.`, ok:true},
     {t:`Read every file under the payment services up front so nothing is missed, then answer all later questions from what is already in the conversation.`},
     {t:`Keep the same Grep and Read pattern but run /compact whenever the conversation gets long, so there is always room for the next sweep.`},
     {t:`Move the run to the model with the largest available context window and keep the raw output in the conversation, since a bigger window removes the need to prune anything.`},
   ],
   hint:`증상 항목에 실패가 <b>두 가지</b> 적혀 있음. 원문 전체가 대화에 쌓인 것, 그리고 시간이 지나며 구체적 발견이 사라진 것임. 둘 중 하나만 해결하는 선택지부터 지울 것.`,
   explain:{
     good:`세 가지가 한 세트로 작동함. <b>범위 좁히기</b>(Glob과 Grep으로 후보를 추린 뒤 해당 구간만 Read)로 유입량을 줄이고, <b>위임</b>으로 대량 검색의 원문이 서브에이전트(subagent) 쪽에서 소모되게 하고, <b>스크래치패드(scratchpad)</b>로 확정된 발견을 대화 밖 파일에 남김. 앞의 둘이 컨텍스트 잠식을, 마지막이 컨텍스트 열화를 막음. 요약에 파일명과 행 번호를 함께 실어야 최종 리포트의 파일명·행 번호 요구까지 연결됨.`,
     wrongs:[
       `<b>B(전량 선행 읽기):</b> 놓치지 않으려는 의도이지만 1시간째 증상을 더 큰 규모로 재현함. 무엇이 중요한지 미리 알 수 없다고 브리핑에 적혀 있으므로, 120만 줄을 전부 읽는 것 말고는 대상을 고를 기준이 없음.`,
       `<b>C(/compact 반복):</b> 압축은 이미 들어온 원문과 실제 발견을 함께 뭉갬. 유입 지점은 그대로이므로 몇 번 검색하고 나면 같은 상태에 다시 도달함.`,
       `<b>D(더 큰 컨텍스트 창):</b> 한도에 도달하는 시점을 미룰 뿐임. 또한 창을 키워도 긴 입력의 한가운데는 여전히 정확도가 떨어지므로 3시간째의 증상은 그대로 남음.`,
     ]},
   why:{ q:`왜 세 가지를 함께 적용해야 하는가?`,
     opts:[
       {t:`원문이 대화로 들어오는 것을 막는 일과 이미 확인한 발견을 대화 밖에 남기는 일이 서로 다른 문제이기 때문임. 하나만 하면 나머지 증상이 그대로 남음.`, ok:true},
       {t:`Grep이 Read보다 토큰을 적게 쓰기 때문임.`},
       {t:`대형 코드베이스는 서브에이전트에 위임하는 것이 표준 절차이기 때문임.`},
       {t:`스크래치패드에 기록해 두면 세션이 종료돼도 복구할 수 있기 때문임.`},
     ],
     explain:`증상이 둘이면 대응책도 둘임. <b>컨텍스트가 차는 문제</b>와 <b>지나간 발견이 흐려지는 문제</b>는 원인이 다르므로, 한쪽 수단으로 다른 쪽을 막을 수 없음.`},
   principle:"범위를 좁히고 위임하고 파일에 기록함"});

  /* ── ③ 블록 복기 ── */
  OPEN.steps.push({type:"concept", kind:"TOPIC · 주제 설명", h:"정리: 세 문항의 내용과 판단 기준",
   html:`<h4>① 문항별 내용</h4>
<table>
<tr><th>문항</th><th>물어본 내용</th><th>브리핑의 근거</th><th>정답을 정한 기준</th></tr>
<tr><td>Q1</td><td>컨텍스트가 가득 찰 때 버릴 정보와 글자 그대로 남길 정보</td><td>처음 30분에 정한 결정 세 가지를 7시간 뒤에도 그대로 인용</td><td>지킬 항목을 미리 적을 수 있는지 여부. 적을 수 있으므로 구조화 상태 객체</td></tr>
<tr><td>Q2</td><td>지시가 없는 상황에서 결정하는 주체</td><td>건드리면 안 되는 서비스 셋. 되돌리기 규칙은 수정 대상 서비스에만 적용</td><td>규칙 자체가 없는 상황인지 여부. 규칙이 없으므로 사람에게 전달</td></tr>
<tr><td>Q3</td><td>발견한 내용이 흐려지는 문제의 해결 수단</td><td>1시간째 원문 누적. 3시간째부터 일반적인 설명으로 답변</td><td>증상이 둘이면 수단도 둘. 들어오는 양 줄이기, 그리고 대화 밖 파일에 기록</td></tr>
</table>
<h4>② 판단 기준 세 가지</h4>
<table>
<tr><th>기준</th><th>문항의 형태</th><th>확인 순서</th><th>자주 나오는 오답</th></tr>
<tr><td>잃어도 되는 정보</td><td>요약, 슬라이딩 윈도, 구조화 상태 객체, 선택적 보존 중 선택</td><td>글자 그대로 남길 값이 있는지. 그 목록을 미리 적을 수 있는지. 오래된 내용이 정말 필요 없는지</td><td>컨텍스트 창이 더 큰 모델로 교체. 요약을 더 자주 실행. 잊지 말라고 지시</td></tr>
<tr><td>정보를 잃었을 때의 증상</td><td>증상을 보고 원인과 해결 수단 찾기</td><td>일반적인 설명으로 답변하면 컨텍스트 품질 저하. 원문이 쌓이면 컨텍스트 낭비. 다시 시작할 때 처음으로 돌아가면 상태 소실</td><td>증상 둘 중 하나만 해결하는 선택지. 나중에 줄이는 방법 하나로 모두 해결하려는 선택지</td></tr>
<tr><td>사람에게 넘기는 기준</td><td>에스컬레이션, 사람 검토, 자동 승인 기준의 설정</td><td>정당한 경우 세 가지에 해당하는지. 사용자의 명시적 요구, 규칙에 없는 상황, 더 진행할 수 없는 상태</td><td>감정 점수. 보정하지 않은 신뢰도. 대화 횟수. 문서 평균 점수</td></tr>
</table>
<ul>
<li>세 기준이 함께 묻는 내용: 정보가 사라지는 지점, 막는 수단, 막지 못했을 때 받는 사람</li>
</ul>`});

  /* ── ④ 개념 구조도 ── */
  OPEN.steps.push({type:"concept", kind:"TOPIC · 주제 설명", h:"이 파트 전체 지도",
   html:`__MAP5:__
<h4>① 지도 읽는 방법</h4>
<table>
<tr><th>위치</th><th>뜻</th><th>챕터</th></tr>
<tr><td>윗줄</td><td>입력 관리. 대화가 길어질 때 Claude에 넣을 내용의 선택</td><td>CH 1, CH 7</td></tr>
<tr><td>가운데와 아랫줄</td><td>상황별 안전장치 다섯 가지</td><td>CH 2 ~ CH 6</td></tr>
</table>
<ul>
<li>챕터를 열 때마다 같은 지도가 다시 나오고 그 챕터의 위치가 밝게 표시</li>
<li>화살표는 윗줄에만 있음. 아래 다섯 칸은 순서가 없고 각각 다른 문제를 담당</li>
</ul>
<h4>② 안전장치 다섯 가지의 담당</h4>
<table>
<tr><th>안전장치</th><th>막는 문제</th><th>챕터</th></tr>
<tr><td>에스컬레이션</td><td>결정할 권한이 없는 일을 에이전트가 혼자 결정</td><td>CH 2</td></tr>
<tr><td>에러 전파</td><td>실패가 성공으로 보고되어 복구할 기회 상실</td><td>CH 3</td></tr>
<tr><td>장기 탐색 지원</td><td>몇 시간 전에 확인한 내용의 망각. 세션이 끝나면서 생기는 기록 소실</td><td>CH 4</td></tr>
<tr><td>품질 게이트</td><td>틀린 결과가 높은 신뢰도 점수로 사람 검토 없이 통과</td><td>CH 5</td></tr>
<tr><td>출처 보존</td><td>내용은 맞는데 어느 자료에서 나왔는지 제시 불가</td><td>CH 6</td></tr>
</table>
<ul>
<li>문항은 증상 하나를 제시하고 그 증상을 담당하는 안전장치를 질문. 순서가 아니라 담당으로 기억</li>
</ul>
<h4>③ 비슷해 보이는 항목의 구분</h4>
<table>
<tr><th>항목</th><th>구분 기준</th></tr>
<tr><td>에스컬레이션과 에러 전파</td><td>받는 쪽. 에스컬레이션은 사람, 에러 전파는 코디네이터</td></tr>
<tr><td>품질 게이트와 출처 보존</td><td>지키는 대상. 품질 게이트는 결과의 정확성, 출처 보존은 결과가 나온 자료</td></tr>
<tr><td>장기 탐색 지원과 윗줄</td><td>기록하는 자리. 윗줄은 대화 안에 남길 내용, 장기 탐색 지원은 대화 밖 파일</td></tr>
</table>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>코디네이터(coordinator)</b>: 서브에이전트에게 일을 나눠 주고 결과를 모으는 에이전트</li>
<li><b>에스컬레이션(escalation)</b>: 에이전트가 직접 처리하지 않고 사람에게 넘기는 일</li>
</ul>
</div>`});

  /* ── ⑤ 구조도에 나오는 용어 (처음부터) ── */
  OPEN.steps.push({type:"concept", kind:"CONCEPT · 개념 설명", h:"지도에 나온 용어 정리",
   html:`<h4>① 토큰과 턴</h4>
<ul>
<li>토큰(token): Claude가 글을 세는 단위. 글자보다 크고 단어보다 작은 조각</li>
<li>요금과 컨텍스트 창의 한도가 모두 토큰 수로 계산</li>
<li>턴(turn): 사용자 메시지 하나와 그에 대한 답 하나. 한 번의 주고받음</li>
</ul>
<h4>② 컨텍스트 창</h4>
<ul>
<li>요청 한 번에 Claude가 읽을 수 있는 토큰 수의 한도. 영어 이름은 context window</li>
<li>Claude는 앞의 대화를 기억하지 않음. 요청할 때마다 지금까지의 대화 전체를 다시 전달받아 처음부터 읽는 방식</li>
<li>대화를 모아 요청을 만드는 쪽은 Claude를 호출하는 프로그램. 이 파트의 방법은 모두 그 요청에 넣을 내용을 정하는 방법</li>
</ul>
<h4>③ 컨텍스트 창이 가득 찰 때</h4>
<ul>
<li>오래된 부분을 빼거나 요약으로 바꾸는 쪽은 요청을 만드는 프로그램</li>
<li>빠진 내용은 Claude가 읽은 적이 없는 내용. 잊지 말라는 지시로 되살릴 수 없음</li>
<li>가장 흔한 형태: 초반에 합의한 조건, 금액, 날짜가 빠진 상태에서 에이전트가 틀린 답을 확신 있게 제시. 오류 표시가 없음</li>
<li>버릴 내용은 미리 규칙으로 정할 대상</li>
</ul>
<h4>④ lost in the middle</h4>
<ul>
<li>긴 입력의 한가운데 놓인 내용을 Claude가 놓치는 경향</li>
<li>처음과 끝은 더 정확히 반영</li>
<li>해결: 핵심 요약을 맨 앞에 배치. 구역마다 제목을 달아 내용의 위치 표시</li>
</ul>
<h4>⑤ 세션</h4>
<ul>
<li>하나로 이어진 대화 전체. 새 세션은 빈 컨텍스트에서 시작</li>
<li>세션이 끊기면 대화 안에만 있던 내용도 함께 소실</li>
</ul>
<h4>⑥ 스크래치패드와 매니페스트</h4>
<table>
<tr><th>파일</th><th>적는 내용</th><th>쓰는 때</th></tr>
<tr><td>스크래치패드<br><small>scratchpad</small></td><td>에이전트가 발견한 내용</td><td>앞에서 확인한 내용이 흐려질 때 다시 읽기</td></tr>
<tr><td>매니페스트<br><small>manifest</small></td><td>끝난 일, 남은 일, 결과 파일의 위치</td><td>중단된 작업을 이어서 시작할 때 먼저 읽기</td></tr>
</table>
<ul>
<li>두 파일 모두 대화 밖에 있어서 컨텍스트가 가득 차거나 세션이 끝나도 유지</li>
<li>기록하는 쪽은 에이전트. 지시문에 기록 규칙 한 줄을 넣으면 에이전트가 Write와 Read 도구로 직접 수행</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 지시문에 넣는 기록 규칙</div>
<pre>핵심 발견은 scratchpad.md에 기록하며 진행할 것.
이전 발견이 흐릿해지면 그 파일을 다시 읽을 것.</pre></div>
<h4>⑦ 에스컬레이션</h4>
<table>
<tr><th>구분</th><th>내용</th></tr>
<tr><td>정당한 경우</td><td>사용자가 사람을 명시적으로 요구. 규칙에 없는 상황이나 예외. 더 진행할 수 없는 상태</td></tr>
<tr><td>근거가 되지 못하는 지표</td><td>감정 점수. 보정하지 않은 신뢰도. 대화 횟수</td></tr>
<tr><td>넘길 때 함께 전달할 내용</td><td>문제가 된 내용, 시도한 방법, 지금까지의 부분 결과, 가능한 선택지</td></tr>
</table>
<h4>⑧ 신뢰도와 보정</h4>
<ul>
<li>신뢰도(confidence): Claude가 자기 답에 매긴 확신 수치. 예: 0.92</li>
<li>이 수치는 실제 정답률과 어긋나는 경우가 많음</li>
<li>보정(calibration): 정답이 붙은 자료로 수치와 실제 정답률을 대조해 맞추는 작업</li>
<li>보정 없이 정한 자동 승인 기준은 틀린 답을 걸러내지 못함</li>
<li>문서 평균 점수의 한계: 항목 열 개 중 아홉 개가 정확하면 평균이 높아 틀린 항목 하나가 가려짐. 항목별 신뢰도 필요</li>
</ul>
<h4>⑨ 출처 보존</h4>
<ul>
<li>주장이 나온 문서와 문장을 결과와 함께 유지하는 일. 영어 이름은 provenance</li>
<li>요약을 거칠 때 가장 먼저 사라지는 정보가 출처와 날짜</li>
<li>해결: 주장, 근거 문장, 출처, 발행일을 처음부터 한 묶음으로 작성</li>
<li>발행일의 역할: 2021년 45%와 2024년 28%는 날짜가 없으면 서로 어긋나는 값, 날짜가 있으면 시간에 따른 변화</li>
</ul>`});

  /* ── ⑥ 학습 순서 ── */
  OPEN.steps.push({type:"concept", kind:"TOPIC · 주제 설명", h:"이 파트 학습 순서",
   html:`<h4>① 권장 순서</h4>
<table>
<tr><th>순서</th><th>챕터</th><th>지도의 위치</th><th>이유</th></tr>
<tr><td>1</td><td>CH 1 긴 대화에서 핵심 정보 보존</td><td>윗줄</td><td>정보가 사라지는 세 가지 경로. 파트의 출발점</td></tr>
<tr><td>2</td><td>CH 7 컨텍스트 창 관리 방법의 선택</td><td>윗줄</td><td>Q1에서 물은 비교. 자주 틀리는 내용</td></tr>
<tr><td>3</td><td>CH 4 대형 코드 탐색의 컨텍스트 관리</td><td>장기 탐색 지원</td><td>Q3에서 물은 내용. 자주 틀리는 내용</td></tr>
<tr><td>4</td><td>CH 2 에스컬레이션과 모호성 해결</td><td>에스컬레이션</td><td>Q2에서 물은 내용</td></tr>
<tr><td>5</td><td>CH 3 멀티에이전트 에러 전파</td><td>에러 전파</td><td>실패를 보고하는 형식</td></tr>
<tr><td>6</td><td>CH 5 사람 검토와 신뢰도 보정</td><td>품질 게이트</td><td>자동 승인 기준의 설정</td></tr>
<tr><td>7</td><td>CH 6 출처 보존과 불확실성 처리</td><td>출처 보존</td><td>값이 서로 다른 자료, 날짜, 빠진 범위의 표시</td></tr>
<tr><td>8</td><td>D5 미니테스트 12문항</td><td>전체</td><td>판단 기준 세 가지 확인</td></tr>
</table>
<h4>② 학습할 때 지킬 세 가지</h4>
<ul>
<li>이유 카드 활용. 답이 맞는 이유를 고를 수 있어야 다음 단계로 진행</li>
<li>틀린 문항은 오답 설명까지 읽기. 이 영역의 오답은 같은 형태로 반복</li>
<li>챕터를 열 때 지도에서 그 챕터가 담당하는 문제 확인</li>
</ul>
<h4>③ 반복되는 오답 형태</h4>
<ul>
<li>컨텍스트 창이 더 큰 모델로 교체</li>
<li>잊지 말라는 지시 추가</li>
<li>감정 점수로 사람에게 넘길지 판단</li>
<li>문서 평균 점수로 자동 승인</li>
</ul>`});

  /* ===== 오프닝 레슨 삽입 (중복 가드) ===== */
  if(!P5.lessons.some(function(l){ return l.id === "p5c0"; })){
    P5.lessons.unshift(OPEN);
  }

  /* ============================================================
     (2) 기존 레슨 연습 문제에 이유 카드 붙이기. p5c1 ~ p5c7 전부
     ============================================================ */
  var find = function(id){ return P5.lessons.find(function(l){ return l.id === id; }); };
  var q = function(id, n){
    var L = find(id); if(!L || !L.steps) return null;
    return L.steps.filter(function(s){ return s.type === "quiz"; })[n] || null;
  };
  var setWhy = function(id, n, why){
    var s = q(id, n); if(!s || s.why) return;   /* 이미 붙어 있으면 건드리지 않음 */
    s.why = why;
  };

  /* ── Ch1 · 정보 보존 ── */
  setWhy("p5c1", 0, { q:`왜 이슈별 구조화 레코드가 정답인가?`,
    opts:[
      {t:`case facts 블록이 이미 있었는데도 값이 섞였다는 점이 핵심이기 때문임. 값은 보존됐지만 그 값이 어느 이슈에 속하는지가 묶여 있지 않았음.`, ok:true},
      {t:`구조화된 데이터가 자연어보다 모델이 읽기에 정확하기 때문임.`},
      {t:`여러 이슈가 있는 세션은 이슈별로 나누는 것이 정석이라고 배웠기 때문임.`},
      {t:`평면 목록은 항목이 늘수록 컨텍스트를 더 많이 차지하기 때문임.`},
    ],
    explain:`보존했는데도 틀렸다면 다음 질문은 항상 <b>"값이 무엇에 묶여 있는가"</b>임. 금액과 날짜는 값 자체보다 소속 정보가 먼저 손실됨.`});

  setWhy("p5c1", 1, { q:`왜 도구 출력을 들어오기 전에 잘라야 하는가?`,
    opts:[
      {t:`한번 대화에 들어온 토큰은 무시하라고 지시해도 그 자리를 그대로 차지하기 때문임. 컨텍스트 잠식을 실제로 막을 수 있는 지점은 유입 지점뿐임.`, ok:true},
      {t:`도구 출력이 대화 내용보다 덜 중요한 정보이기 때문임.`},
      {t:`컨텍스트는 항상 짧게 유지하는 것이 정석이기 때문임.`},
      {t:`필드가 40개나 되면 모델이 어느 값을 볼지 혼동할 수 있기 때문임.`},
    ],
    explain:`쌓여서 생긴 문제는 쌓인 뒤에 정리하는 방식으로 해결되지 않음. 같은 판단 기준이 로그, 검색 결과, 파일 출력에도 그대로 적용됨.`});

  /* ── Ch2 · 에스컬레이션 ── */
  setWhy("p5c2", 0, { q:`왜 임계값 조정이 아니라 신호 교체가 정답인가?`,
    opts:[
      {t:`세 증상이 각각 세 신호가 케이스 난이도를 재지 못한다는 것을 보여주기 때문임. 재는 대상이 틀리면 그 위에 세운 어떤 숫자도 맞을 수 없음.`, ok:true},
      {t:`프로덕션 한 달치는 임계값을 다시 정하기에 표본이 부족하기 때문임.`},
      {t:`에스컬레이션은 프롬프트 기준으로 처리하는 것이 정석이기 때문임.`},
      {t:`자동 트리거보다 few-shot 예시가 언제나 더 정확하기 때문임.`},
    ],
    explain:`숫자를 고칠지 신호를 고칠지는 증상이 알려 줌. 증상이 "엉뚱한 케이스가 걸린다"면 문턱이 아니라 재는 대상이 틀린 것임.`});

  setWhy("p5c2", 1, { q:`왜 (a)는 고객에게 묻고 (b)는 사람에게 넘기는가?`,
    opts:[
      {t:`(a)는 고객이 답을 갖고 있는 모호함이고 (b)는 회사에 규칙 자체가 없는 공백이기 때문임. 답을 가진 쪽이 서로 다름.`, ok:true},
      {t:`(a)는 위험이 낮은 실수이고 (b)는 위험이 큰 실수이기 때문임.`},
      {t:`고객 응대는 가능한 한 사람 확인을 받는 것이 정석이기 때문임.`},
      {t:`휴리스틱으로 판단하면 정확도가 떨어지기 때문임.`},
    ],
    explain:`물어서 해결되면 묻고, 규칙이 없으면 넘김. 이 한 줄이 D5 에스컬레이션 문항의 대부분을 구분함.`});

  /* ── Ch3 · 에러 전파 ── */
  setWhy("p5c3", 0, { q:`왜 구조화된 실패 보고가 정답인가?`,
    opts:[
      {t:`실패가 성공으로 보고되는 순간 코디네이터가 고를 수 있던 복구 선택지가 통째로 사라지기 때문임. 대응의 유연함은 정보에서 나옴.`, ok:true},
      {t:`빈 결과에 status ok를 붙이는 것은 잘못된 구현이기 때문임.`},
      {t:`에러는 무조건 위로 올리는 것이 정석이기 때문임.`},
      {t:`페이월은 재시도로 해결되는 종류의 실패가 아니기 때문임.`},
    ],
    explain:`실패 보고의 목적은 책임 표시가 아니라 <b>상위 쪽이 결정할 수 있게 하는 것</b>임. 그래서 4요소에 "대안과 선택지"가 들어 있음.`});

  setWhy("p5c3", 1, { q:`왜 커버리지 주석까지 붙여야 하는가?`,
    opts:[
      {t:`세 소스로 만든 결론과 다섯 소스가 필요했던 결론이 리포트 위에서는 똑같아 보이기 때문임. 독자가 빠진 부분을 알 방법이 그것뿐임.`, ok:true},
      {t:`실패한 소스를 기록해 두면 나중에 다시 시도할 수 있기 때문임.`},
      {t:`리포트에는 한계를 적어 두는 것이 정석이기 때문임.`},
      {t:`무기한 지연보다 부분 결과라도 내보내는 편이 낫기 때문임.`},
    ],
    explain:`정직한 부분 진행의 조건은 <b>진행</b>이 아니라 <b>표시</b>임. 표시가 없으면 완전해 보이는 불완전한 결과가 됨.`});

  /* ── Ch4 · 대형 코드베이스 탐색 ── */
  setWhy("p5c4", 0, { q:`D도 (b)와 (c)는 맞는데 왜 A인가?`,
    opts:[
      {t:`컨텍스트에서 밀려난 내용은 지시로 되돌아오지 않기 때문임. (a)의 열화는 대화 밖 기록으로만 막히며, "찾은 클래스를 반드시 인용하라"는 지시는 없는 내용을 요구하는 것과 같음.`, ok:true},
      {t:`A가 세 도구를 모두 언급해서 더 완전한 선택지이기 때문임.`},
      {t:`증상별 도구 매핑이 정석이라고 배웠는데 A가 그 표와 그대로 일치하기 때문임.`},
      {t:`스크래치패드가 서브에이전트 위임보다 강한 수단이기 때문임.`},
    ],
    explain:`매핑 문항은 <b>가장 약한 항목</b>으로 판정함. 셋 중 둘이 맞아도 하나가 어긋나면 오답이므로, 절반만 맞는 선택지가 가장 위험함.`});

  setWhy("p5c4", 1, { q:`왜 상태를 파일로 빼야 하는가?`,
    opts:[
      {t:`크래시가 지우는 것이 정확히 대화 안에 있던 내용이기 때문임. 재개하려면 대화 밖에 남아 있는 것이 있어야 함.`, ok:true},
      {t:`여러 에이전트가 같은 상태를 공유해야 하기 때문임.`},
      {t:`장시간 작업은 체크포인트를 남기는 것이 정석이기 때문임.`},
      {t:`매니페스트가 있으면 진행 상황을 사람이 볼 수 있기 때문임.`},
    ],
    explain:`"무엇이 사라지는가"부터 확인할 것. 사라지는 것이 대화 안의 내용이면 대응책은 언제나 대화 밖임.`});

  /* ── Ch5 · 신뢰도 보정 ── */
  setWhy("p5c5", 0, { q:`왜 필드 단위 신뢰도와 보정이 정답인가?`,
    opts:[
      {t:`문서 평균이 잘 처리된 아홉 필드로 잘못 처리된 한 필드를 가리기 때문임. 지켜야 하는 단위가 필드면 재는 단위도 필드여야 함.`, ok:true},
      {t:`0.93이라는 자동 승인 문턱이 애초에 낮게 설정돼 있기 때문임.`},
      {t:`신뢰도 점수는 보정 없이 쓰면 안 된다고 배웠기 때문임.`},
      {t:`세금 등록번호가 다른 아홉 필드보다 중요한 값이기 때문임.`},
    ],
    explain:`집계 지표는 항상 약한 항목을 가림. 문서 평균, 전체 정확도, 파이프라인 성공률이 전부 같은 형태의 오답 유도 항목임.`});

  setWhy("p5c5", 1, { q:`왜 층화 표집이 정답인가?`,
    opts:[
      {t:`새로운 실패가 사람이 검토하지 않는 고신뢰 구간 <b>안에서</b> 조용히 발생하기 때문임. 그 구간을 계속 표본으로 확인하는 장치가 필요함.`, ok:true},
      {t:`무작위 표집보다 층화 표집이 통계적으로 더 정확하기 때문임.`},
      {t:`자동화 구간에는 모니터링을 붙이는 것이 정석이기 때문임.`},
      {t:`공급사가 늘어나면 전체 오류율이 올라가기 때문임.`},
    ],
    explain:`지문에 <b>조용히 실패한다</b>는 서술이 나오면 대응책은 항상 <b>계속 실행되는 표본 검사</b>임. 한 번의 검증은 그 시점만 증명함.`});

  /* ── Ch6 · 출처 보존 ── */
  setWhy("p5c6", 0, { q:`왜 최신 수치를 그대로 쓰면 안 되는가?`,
    opts:[
      {t:`2024 수치가 2023 수치를 정정한 것이 아니라 조사 방법이 다른 자료이기 때문임. 실측과 전망 사이의 차이는 최신성으로 판단할 수 없음.`, ok:true},
      {t:`분석 단계는 원래 최종 결정을 내리는 자리가 아니기 때문임.`},
      {t:`리포트에는 출처를 둘 이상 다는 것이 정석이기 때문임.`},
      {t:`PM에게는 데이터 판단 권한이 없기 때문임.`},
    ],
    explain:`충돌을 만나면 <b>"무엇이 다른가"</b>부터 확인할 것. 시점이 다른 것인지 방법이 다른 것인지에 따라 대응책이 달라짐.`});

  setWhy("p5c6", 1, { q:`왜 상류 출력에 날짜를 넣는 것이 시스템 차원의 대응인가?`,
    opts:[
      {t:`합성 단계가 잘못 읽은 이유가 능력 부족이 아니라 입력에 시점 정보가 없었던 것이기 때문임. 없는 정보로는 어떤 판단도 할 수 없음.`, ok:true},
      {t:`날짜가 있으면 최신 자료를 우선할 수 있기 때문임.`},
      {t:`구조화된 출력에는 메타데이터를 넣는 것이 정석이기 때문임.`},
      {t:`합성 에이전트의 프롬프트가 부실했기 때문임.`},
    ],
    explain:`하류가 잘못 판단하면 상류 출력에 무엇이 빠졌는지부터 확인할 것. 프롬프트를 고치기 전에 출력 형식을 고치는 것이 시스템 차원의 대응임.`});

  /* ── Ch7 · 컨텍스트 창 최적화 (gap-fix 추가분) ── */
  setWhy("p5c7", 0, { q:`왜 구조화 상태 객체인가?`,
    opts:[
      {t:`아홉 개 필드가 하루가 시작되기 전에 이미 확정돼 있기 때문임. 필드를 미리 정할 수 있으면 값도 소속도 유지되고 크기까지 일정하게 유지됨.`, ok:true},
      {t:`요약이 손실 압축이라 정밀한 숫자를 지키지 못하기 때문임.`},
      {t:`300턴짜리 세션에는 상태 객체를 쓰는 것이 정석이기 때문임.`},
      {t:`토큰 예산이 이미 한계라 컨텍스트 크기를 줄여야 하기 때문임.`},
    ],
    explain:`오답을 지운 근거와 정답을 고른 근거는 다름. 정답 쪽 근거는 항상 <b>"이 상황의 어떤 조건이 그 방법의 전제와 맞는가"</b>임.`});

  setWhy("p5c7", 1, { q:`왜 슬라이딩 윈도가 맞는가?`,
    opts:[
      {t:`여섯 달치 기록이 <b>10분보다 오래된 내용은 답을 바꾼 적이 없음</b>을 증명하기 때문임. 버려도 된다는 증거가 있을 때만 통째로 버릴 수 있음.`, ok:true},
      {t:`슬라이딩 윈도가 네 방법 중 비용이 가장 적기 때문임.`},
      {t:`실시간 처리에는 최근 데이터만 쓰는 것이 정석이기 때문임.`},
      {t:`800ms 예산 안에서는 추가 모델 호출을 넣을 수 없기 때문임.`},
    ],
    explain:`슬라이딩 윈도는 <b>증거</b>가 있을 때만 안전함. "오래된 내용은 필요 없을 것이다"가 추측이면 그것은 설계가 아님.`});

  setWhy("p5c7", 2, { q:`왜 누진 요약이 가장 나쁜 선택인가?`,
    opts:[
      {t:`규칙이 요구하는 것은 원문 문장과 URL 그대로인데, 네 선택지 중 그 원문을 없애는 것은 요약뿐이기 때문임. 30분마다 압축하면 첫 시간의 문장은 열두 번 압축된 상태가 됨.`, ok:true},
      {t:`요약은 압축용 모델 호출이 붙어서 비용이 크기 때문임.`},
      {t:`2K 토큰이라는 상한이 6시간 분량을 담기에 너무 작기 때문임.`},
      {t:`리서치 작업에는 요약을 쓰지 않는 것이 정석이기 때문임.`},
    ],
    explain:`부정형 문항은 요구사항을 <b>유일하게</b> 어기는 선택지를 찾는 것임. 나머지 셋이 왜 문제가 없는지까지 확인해야 확신이 생김.`});


  /* ============================================================
     (3) 용어사전: D5 확장
     ============================================================ */
  var AX = window.CCAF_APPENDIX;
  if(AX && Array.isArray(AX.glossary)){
    var have = {};
    AX.glossary.forEach(function(g){ have[g.c + "|" + g.t] = 1; });
    [
      {c:"D5", t:"토큰 (token)", d:"모델이 글을 세는 단위이며 단어보다 잘게 쪼갠 조각임. 영어는 대략 네 글자, 한국어는 한두 글자가 한 토큰임. 요금도 컨텍스트 한도도 전부 이 단위임."},
      {c:"D5", t:"턴 (turn)", d:"사용자 메시지 하나와 응답 하나, 즉 한 번의 주고받음임. '최근 10턴'은 최근 열 번의 주고받음임."},
      {c:"D5", t:"컨텍스트 창 (context window)", d:"한 요청에서 모델이 읽을 수 있는 토큰 총량의 한도임. 모델은 기억하는 것이 아니라 매 턴 대화 전체를 다시 읽는 구조이므로, 대화가 길어질수록 한도에 가까워짐."},
      {c:"D5", t:"창이 넘칠 때 실제로 벌어지는 일", d:"모델이 잊는 것이 아니라 프롬프트를 조립하는 쪽이 잘라냄. 잘린 부분은 모델에게 존재한 적 없는 내용이 되므로, 앞에서 말했다는 지적도 잊지 말라는 지시도 효과가 없음. 자르지 않고 넘기면 요청이 에러로 거절됨."},
      {c:"D5", t:"슬라이딩 윈도 (sliding window)", d:"최근 N턴만 남기고 창 밖은 요약도 없이 폐기함. 창 안은 원문 100% 정확, 창 밖은 0%임. 추가 호출이 없어 비용이 가장 적고 구조가 단순함. 오래된 내용이 정말 불필요하다는 증거가 있을 때만 사용함."},
      {c:"D5", t:"구조화 상태 객체 (structured state object)", d:"미리 정한 필드에 값을 담아 매 턴 갱신하고 다시 투입함. 값이 글자 그대로 남고 소속(어느 주문인지, 어느 결정인지)까지 묶임. 크기가 턴 수와 무관하게 일정함. 필드에 없는 정보는 담을 수 없음."},
      {c:"D5", t:"선택적 보존 (selective retention)", d:"턴 단위로 지킬지 버릴지 판정해 지킬 것만 원문으로 유지함. 필드를 미리 정할 수 없을 때 쓰는 방식임. 판정 비용이 붙고 판정이 틀리면 조용히 손실됨."},
      {c:"D5", t:"누진 요약 (progressive summarization)", d:"오래된 부분을 주기적으로 압축해 산문으로 대체함. 전 기간이 얇게라도 남는 대신 손실 압축이라 금액, 날짜, 출처부터 사라짐. 추적성이 필요한 요구와는 맞지 않음."},
      {c:"D5", t:"컨텍스트 열화", d:"장시간 세션에서 앞서 찾은 구체적 클래스나 수치 대신 일반론으로 답하기 시작하는 증상임. 대응책은 압축이 아니라 대화 밖 기록(스크래치패드)임. 밀려난 내용은 지시로 되돌아오지 않음."},
      {c:"D5", t:"컨텍스트 잠식 / 도구 출력 트리밍", d:"분량이 큰 도구 결과가 쌓여 실제 대화를 밀어내는 현상임. 대응은 컨텍스트에 들어오기 전에 필요한 필드만 남기는 것임. 사후 압축은 불필요한 데이터와 필요한 정보를 함께 뭉갬."},
      {c:"D5", t:"/compact", d:"Claude Code에서 대화를 요약 압축하는 명령임. 자리를 만드는 수단이며 복원 수단이 아니므로, 이미 흐려진 발견을 되살리지 못함."},
      {c:"D5", t:"모호성 vs 정책 공백", d:"동명이인이나 중의적 요청처럼 상대가 답을 가진 경우는 물어서 해결함. 규칙 자체가 없는 경우는 사람에게 넘김. 유사 규칙의 유추 적용은 규칙 준수가 아니라 규칙을 새로 만드는 것임."},
      {c:"D5", t:"가짜 에스컬레이션 지표", d:"감정 점수, 보정되지 않은 자기 신뢰도, 턴 수 세 가지임. 셋 다 케이스 난이도를 재지 못하므로 임계값 조정이나 가중 합성으로도 해결되지 않음."},
      {c:"D5", t:"실패의 성공 위장", d:"빈 결과에 status ok를 붙여 파이프라인을 정상으로 유지하는 안티패턴임. 상위 쪽의 복구 선택지(대체 소스, 캐시, 커버리지 주석)를 전부 차단함."},
      {c:"D5", t:"상태 export와 재개", d:"각 에이전트가 진행 상태를 정해진 위치의 파일로 계속 내보내고, 재시작한 코디네이터가 매니페스트를 읽어 프롬프트에 주입하는 복구 설계임. 대화 히스토리(conversation history)는 크래시와 함께 사라지는 대상임."},
      {c:"D5", t:"필드 수준 신뢰도 / 자동 승인 문턱", d:"문서 평균은 잘 처리된 아홉 필드로 잘못 처리된 한 필드를 가림. 필드별 점수를 필드별로 보정한 뒤 임계 미만만 사람에게 라우팅함. 지켜야 하는 단위와 재는 단위를 맞추는 것임."},
      {c:"D5", t:"발행일 · 수집일", d:"구조화된 출력(structured output)에 시점을 필수로 넣는 규칙임. 날짜가 없으면 2021년 45%와 2024년 28%가 모순으로 보이고, 붙이면 시간에 따른 변화라는 발견이 됨."},
      {c:"D5", t:"충돌 주석 (conflict annotation)", d:"수치가 어긋나면 임의 선택도 평균도 금지함. 출처, 시점, 방법론을 붙여 둘 다 보존하고 조정은 상위로 넘김. 최신성은 방법론 차이(실측과 전망)를 판단하는 근거가 되지 못함."},
    ].forEach(function(g){
      if(!have[g.c + "|" + g.t]) AX.glossary.push(g);
    });
  }

})();
