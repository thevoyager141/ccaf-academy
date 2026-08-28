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

  var OPEN = { id:"p5c0", ch:"OPEN", title:"D5는 시험에서 이렇게 나온다", steps:[

  /* ── ① 실전 형태 예고 ── */
  {type:"concept", kind:"PART BRIEFING · 파트 설명", h:"출제 비중은 가장 작지만 정답률은 가장 낮은 도메인",
   html:`<p class="lead">D5는 출제 비중 <strong>15%</strong>로 여섯 도메인 중 가장 작음. 그런데도 이 파트를 먼저 여는 이유는 비중이 작은 것과 학습하지 않아도 되는 것이 다르기 때문임.</p>
    <h4>숫자로 확인</h4>
    <ul>
      <li>15% = <strong>60문항 중 9문항</strong>. 한 회차에 아홉 번 출제됨</li>
      <li>합격 여부는 전체 정답 수로 결정되므로, 이 9문항에서 4문항을 맞히는 경우와 8문항을 맞히는 경우의 차이가 결과를 가를 수 있음</li>
      <li>이 도메인에서 정답률이 가장 낮게 나타나는 영역은 <strong>컨텍스트 창(context window) 최적화</strong>와 <strong>대형 코드베이스 탐색 전략</strong> 두 곳임</li>
      <li>두 영역의 정답률이 낮은 이유는 개념의 난이도가 아니라 출제 형태에 있음. 선택지에 관리 방식 네 가지가 이름만 제시되므로, 각 방식의 전제를 배운 적이 없으면 비교 자체가 불가능함</li>
    </ul>
    <div class="callout">🎯 D5를 학습하지 않으면 9문항을 포기한 상태로 시험을 시작하게 됨. 정답률이 낮은 두 영역은 <b>내용이 어려워서가 아니라 선택지에 등장하는 방식 자체를 모르는 상태</b>에서 풀기 때문에 틀림. 그래서 Ch7을 따로 둠.</div>
    <h4>이 도메인의 출제 형태</h4>
    <ul>
      <li>문항을 하나씩 나열하지 않음. <strong>상황 브리핑 하나를 제시하고 그 아래에 문항을 여러 개</strong> 붙이는 형태임</li>
      <li>브리핑은 같지만 문항마다 <strong>묻는 지점이 다름</strong>. 무엇을 버릴지, 사람을 언제 부를지, 어떻게 찾을지를 각각 물음</li>
      <li>선택지는 <strong>"A와 B와 C 중 이 상황에 맞는 것"</strong> 형태가 기본임. "일반적으로 권장되는 방법은 무엇인가"를 묻는 문항은 거의 없음</li>
      <li>그래서 정답 패턴 암기가 가장 통하지 않는 도메인임. 같은 방법이 어떤 브리핑에서는 정답이고 다른 브리핑에서는 최악의 선택이 됨</li>
    </ul>
    <h4>이 오프닝에서 하는 것</h4>
    <ul>
      <li>실제 시험과 같은 <strong>브리핑 + 문항 3개</strong> 묶음을 하나 풀어 볼 것 (바로 다음 스텝)</li>
      <li>세 문항이 각각 무엇을 물었는지 확인하고, D5 문항을 구분하는 <strong>판단 기준 세 가지</strong>를 정리할 것</li>
      <li>D5 전체 구조를 한 장으로 확인하고, 구조도에 나오는 <strong>용어를 처음부터</strong> 정리할 것</li>
    </ul>
    <div class="callout">⚖️ 문항마다 <b>이유 카드</b>가 붙어 있음. 정답을 골라도 그것이 정답인 이유를 한 번 더 맞혀야 다음으로 넘어감. 추측으로 맞힌 경우와 문장을 외워서 맞힌 경우를 걸러내기 위한 장치임. 실전 점수와 가장 직접 연결되는 부분임.</div>`},

  /* ── ②-a 브리핑 읽는 법 ── */
  {type:"concept", brief:BRIEF, kind:"CONCEPT · 개념 설명", h:"브리핑 읽는 법: 네 항목으로 나누어 정리함",
   html:`<p class="lead">위 박스가 실제 시험에서 보게 될 브리핑임. 영어 열 몇 줄이라 그냥 읽으면 전부 중요해 보이지만, 문항이 실제로 근거로 삼는 자리는 <strong>네 종류</strong>뿐임. 처음 읽을 때 이 네 항목으로 정리해 두면 문항마다 다시 정독할 필요가 없음.</p>
    <table>
      <tr><th>항목</th><th>무엇을 뽑는가</th><th>이 브리핑에서는</th></tr>
      <tr><td><strong>시나리오</strong></td><td>누가, 무엇을, 얼마나 오래 하는가. 규모와 시간이 곧 제약임</td><td>120만 줄 40개 서비스 · 마이그레이션 리포트 · <strong>연속 7시간 한 세션</strong></td></tr>
      <tr><td><strong>증상</strong></td><td>이미 발생한 실패. 과거형 문장을 찾을 것</td><td>1시간째 원문 전체가 대화에 쌓임 · <strong>3시간째부터 구체적 클래스 대신 일반론으로 답함</strong></td></tr>
      <tr><td><strong>제약</strong></td><td>must, cannot, nobody knows가 붙은 문장. 오답을 지우는 근거가 여기서 나옴</td><td>7시간 뒤에도 <strong>글자 그대로 인용</strong>돼야 하는 결정 3종 · 파일명과 행 번호 필수 · <strong>무엇이 중요한지 미리 알 수 없음</strong></td></tr>
      <tr><td><strong>질문</strong></td><td>지금 결정해야 하는 것이 무엇인가</td><td>세 번째 시도 전에 계획을 어떻게 고칠 것인가</td></tr>
    </table>
    <h4>영어가 부담되면 이 순서로 읽을 것</h4>
    <ul>
      <li><strong>1.</strong> must / must not / cannot / nobody knows / only. 이 단어가 든 문장에 먼저 표시할 것. 제약 항목이 여기서 전부 나옴</li>
      <li><strong>2.</strong> 과거형으로 쓰인 문장이 증상임. stopped citing, dumped, failed 같은 표현임</li>
      <li><strong>3.</strong> 숫자는 전부 옮겨 적을 것 (1.2 million, 40, seven hours, thirty minutes, three services). D5 문항은 숫자 사이의 <strong>간격</strong>을 물음. 30분에 정한 것을 7시간 뒤에 사용한다는 간격이 이 브리핑의 핵심임</li>
      <li><strong>4.</strong> 나머지 설명 문장은 빠르게 읽고 넘어가도 됨</li>
    </ul>
    <div class="callout">💡 이 브리핑에서 가장 중요한 문장 하나는 <b>"무엇이 중요한지 미리 알 수 없고, 그것을 찾아내는 것이 이 작업의 목적이다"</b>임. 이 한 문장이 세 문항 전부에 영향을 줌. 뒤에서 확인할 것.</div>`},
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
  OPEN.steps.push({type:"concept", kind:"TOPIC · 주제 설명", h:"방금 세 문항이 각각 물은 것",
   html:`<p class="lead">브리핑은 하나였지만 문항 셋이 서로 다른 지점을 물었음. 실제 시험의 문항 묶음이 이 형태임. 브리핑을 한 번 제대로 정리해 두면 세 번 사용하게 됨.</p>
    <table>
      <tr><th></th><th>실제로 물은 것</th><th>브리핑의 어느 문장이 근거인가</th><th>정답을 정한 판단 기준</th></tr>
      <tr>
        <td><strong>Q1</strong></td>
        <td>컨텍스트가 넘칠 때 <strong>무엇을 버리고 무엇을 글자 그대로 남기는가</strong></td>
        <td>"첫 30분에 정한 결정 3종이 7시간 뒤에도 그대로 인용돼야 함"</td>
        <td>지킬 목록을 <strong>미리 적을 수 있는가</strong>. 적을 수 있으므로 구조화 상태 객체</td>
      </tr>
      <tr>
        <td><strong>Q2</strong></td>
        <td>지시가 없는 상황에서 <strong>누가 결정하는가</strong></td>
        <td>"건드리면 안 되는 세 서비스" + "롤백 규칙은 수정 대상 서비스에만 적용됨"</td>
        <td>물어서 해결되는 <strong>모호함</strong>인가, 규칙 자체가 없는 <strong>공백</strong>인가. 공백이므로 사람에게</td>
      </tr>
      <tr>
        <td><strong>Q3</strong></td>
        <td>발견이 흐려지는 것을 <strong>무엇으로 막는가</strong></td>
        <td>"1시간째 원문 전체가 쌓임" + "3시간째부터 일반론으로 답함"</td>
        <td>증상이 <strong>둘</strong>이면 수단도 둘. 유입 차단(범위 좁히기·위임) + 대화 밖 기록(스크래치패드)</td>
      </tr>
    </table>
    <h4>D5 문항을 구분하는 판단 기준 세 가지</h4>
    <p>어떤 브리핑이 나와도 문항은 결국 이 셋 중 하나를 물음. 문제를 읽자마자 어느 기준에 해당하는지 먼저 정하면 선택지 절반이 지워짐.</p>
    <table>
      <tr><th>판단 기준</th><th>문항의 형태</th><th>확인 순서</th><th>자주 나오는 오답</th></tr>
      <tr>
        <td><strong>① 무엇을 잃어도 되는가</strong></td>
        <td>요약, 슬라이딩 윈도, 구조화 상태 객체, 선택적 보존을 나란히 놓고 고르게 함</td>
        <td>글자 그대로 남아야 할 값이 있는가 → 그 목록을 미리 적을 수 있는가 → 오래된 내용이 정말 불필요한가</td>
        <td>"컨텍스트 창이 더 큰 모델로 교체" · "요약을 더 자주 실행" · "잊지 말라고 프롬프트에 지시"</td>
      </tr>
      <tr>
        <td><strong>② 잃으면 어떤 증상이 나오는가</strong></td>
        <td>증상을 제시하고 원인과 대응책을 거꾸로 찾게 함</td>
        <td>일반론 답변 = 컨텍스트 열화 · 원문 누적 = 컨텍스트 잠식 · 재시작 시 초기화 = 상태 소실 · 값이 뒤바뀜 = 소속 정보 손실</td>
        <td>세 항목 중 둘만 맞는 선택지(가장 고르기 쉬움) · 사후 압축으로 전부 해결하려는 선택지</td>
      </tr>
      <tr>
        <td><strong>③ 사람이 개입하는 기준이 무엇인가</strong></td>
        <td>에스컬레이션, 리뷰 라우팅, 자동 승인 문턱을 언제 어떻게 설정하는가</td>
        <td>정당한 트리거 3종(명시적 요구 · 정책 공백 · 진전 불가)인가, 근거가 되지 못하는 지표인가</td>
        <td>감정 점수 · 보정되지 않은 자기 신뢰도 · 턴 수 · 문서 평균 점수</td>
      </tr>
    </table>
    <div class="callout">🎯 세 기준을 한 문장으로 묶으면 이 파트의 공통 질문이 나옴. <b>"정보가 손실되는 지점이 어디이고, 무엇으로 막고, 막지 못하면 누가 받는가."</b> 선택지가 이 셋 중 아무것도 다루지 않으면 오답일 가능성이 높음.</div>`});

  /* ── ④ 개념 구조도 ── */
  OPEN.steps.push({type:"concept", kind:"TOPIC · 주제 설명", h:"D5 전체 구조도: 윗줄 하나, 아랫줄 다섯",
   html:`__MAP5:__<p class="lead">파트 전체가 이 한 장에 들어 있음. 각 챕터에 들어갈 때 같은 구조도가 다시 나오며, 그때는 지금 학습하는 항목이 밝게 표시됨.</p>
    <h4>읽는 법</h4>
    <ul>
      <li><strong>윗줄은 입력 관리</strong>임. 대화가 길어질 때 <strong>모델에게 무엇을 넣어 줄 것인가</strong>의 문제임. Ch1과 Ch7이 여기에 해당하며, 정답률이 가장 낮게 나타나는 영역임</li>
      <li><strong>아랫줄 두 행은 안전장치 5종</strong>임. 에스컬레이션, 에러 전파, 장기 탐색 지원, 품질 게이트, 출처 보존임</li>
      <li>화살표는 <strong>윗줄에만</strong> 있음. 입력 관리는 에이전트 쪽으로 들어가는 방향이 있지만, 아랫줄 다섯은 방향이 없음</li>
    </ul>
    <h4>아랫줄 다섯은 순서가 아니라 각각 다른 문제를 담당함</h4>
    <ul>
      <li><strong>에스컬레이션</strong>: 에이전트가 <strong>결정할 권한이 없는 것</strong>을 혼자 결정하는 문제</li>
      <li><strong>에러 전파</strong>: 실패가 <strong>성공으로 보고</strong>되어 상위 쪽이 복구할 기회를 잃는 문제</li>
      <li><strong>장기 탐색 지원</strong>: 몇 시간 전에 <strong>이미 확인한 것을 잊는</strong> 문제, 그리고 세션이 종료되면서 전부 사라지는 문제</li>
      <li><strong>품질 게이트</strong>: 틀린 결과가 <strong>높은 신뢰도 점수를 달고</strong> 사람 검토를 그대로 통과하는 문제</li>
      <li><strong>출처 보존</strong>: 내용은 맞지만 <strong>어느 자료에서 나왔는지</strong>를 제시하지 못하는 문제</li>
    </ul>
    <div class="callout">⚠️ 다섯을 "1번 다음 2번" 순서로 외우면 시험에서 정답률이 크게 떨어짐. 문항은 <b>증상 하나</b>를 제시하고 다섯 중 <b>그 증상을 담당하는 항목</b>을 고르게 함. 순서가 아니라 <b>담당</b>으로 외울 것. 위 다섯 줄이 그 담당표임.</div>
    <h4>다섯이 서로 겹쳐 보일 때</h4>
    <ul>
      <li><strong>에스컬레이션과 에러 전파</strong>: 받는 쪽이 다름. 에스컬레이션은 <strong>사람</strong>에게, 에러 전파는 <strong>코디네이터</strong>에게 전달함. "누가 이것을 받고 무엇을 결정해야 하는가"를 물으면 구분됨</li>
      <li><strong>품질 게이트와 출처 보존</strong>: 품질 게이트는 <strong>맞았는가 틀렸는가</strong>를 다루고, 출처 보존은 <strong>어디서 나왔는가</strong>를 다룸. 둘 다 신뢰라는 단어를 쓰지만 지키는 대상이 다름</li>
      <li><strong>장기 탐색 지원과 윗줄 입력 관리</strong>: 윗줄은 <strong>대화 안</strong>에서 무엇을 남길지의 문제이고, 장기 탐색 지원은 <strong>대화 밖 파일</strong>로 빼내는 문제임. 스크래치패드와 매니페스트가 대화 밖 담당임</li>
    </ul>`});

  /* ── ⑤ 구조도에 나오는 용어 (처음부터) ── */
  OPEN.steps.push({type:"concept", kind:"CONCEPT · 개념 설명", h:"구조도에 나오는 용어: 처음부터 정리함",
   html:`<p class="lead">아래 용어들은 이미 알고 있다고 전제하고 넘어가는 경우가 많음. 그런데 D5에서 틀리는 이유의 절반이 이 용어들을 흐릿하게 아는 데서 나옴. 비유를 쓰지 않고 <strong>실제로 무슨 일이 일어나는지</strong>로 설명함.</p>

    <h4>토큰 (token)</h4>
    <ul>
      <li>모델이 글을 세는 단위임. 글자도 단어도 아니고 그 중간 크기로 쪼갠 조각임. 영어는 대략 네 글자가 한 토큰, 한국어는 글자 한두 개가 한 토큰 정도임</li>
      <li>알아야 하는 이유는 <strong>요금도 한도도 전부 이 단위</strong>이기 때문임. "컨텍스트가 가득 찼다"는 말은 토큰 수가 한도에 도달했다는 뜻임</li>
    </ul>

    <h4>턴 (turn)</h4>
    <ul>
      <li>사용자 메시지 하나와 그에 대한 응답 하나임. 한 번의 주고받음임. "최근 10턴"은 최근 열 번의 주고받음을 뜻함</li>
    </ul>

    <h4>컨텍스트 창 (context window)</h4>
    <ul>
      <li>한 번의 요청에서 모델이 읽을 수 있는 <strong>토큰 총량의 한도</strong>임</li>
      <li>여기가 오해가 가장 많은 지점임. 모델은 앞의 대화를 <strong>기억하고 있지 않음</strong>. 매 턴마다 지금까지의 대화 전체를 <strong>처음부터 다시 통째로 읽음</strong>. 그래서 대화가 길어질수록 매 턴 읽는 양이 커지고 한도에 점점 가까워짐</li>
      <li>모델을 호출하는 쪽(앱 또는 에이전트 코드)이 <strong>매 턴 프롬프트를 새로 조립해서</strong> 보내는 구조임. 이 파트에서 배우는 방법들은 전부 그 조립을 어떻게 하는가에 대한 것임</li>
    </ul>

    <h4>창이 넘칠 때 실제로 벌어지는 일</h4>
    <ul>
      <li>모델이 잊는 것이 아님. <strong>보내는 쪽이 잘라냄</strong>. 프롬프트를 조립할 때 오래된 부분을 빼거나 요약으로 바꿔 넣음</li>
      <li>잘려 나간 내용은 모델 입장에서 <strong>애초에 존재한 적이 없는 것</strong>이 됨. 그래서 앞에서 말했다는 지적도, 잊지 말라는 지시도 효과가 없음. 지시는 없는 내용을 되살리는 수단이 아님</li>
      <li>잘라내지 않고 한도를 넘겨 보내면 요청이 <strong>에러로 거절</strong>됨. 그래서 무엇을 자를지는 <strong>미리 정해 두는 규칙</strong>의 문제이지 그때그때 판단할 문제가 아님</li>
      <li>가장 흔한 형태는 초반에 합의한 조건, 금액, 날짜가 조용히 사라진 상태에서 에이전트가 <strong>확신을 갖고 틀린 답</strong>을 내놓는 경우임. 조용하다는 점이 핵심임. 에러가 나지 않음</li>
    </ul>

    <h4>lost in the middle</h4>
    <ul>
      <li>창 안에 들어 있다고 해서 안전한 것은 아님. 긴 입력을 주면 모델의 주의는 <strong>맨 앞</strong>(주로 지시문이 놓이는 자리)과 <strong>맨 뒤</strong>(가장 최근에 읽은 내용)에 쏠리고 <strong>한가운데의 정확도가 떨어짐</strong>. 실험으로 확인된 현상이라 이름이 붙었음</li>
      <li>실물 예시: 긴 문서 묶음의 한가운데 있는 수치를 물으면 찾지 못하거나 없는 값을 지어냄. 같은 수치를 맨 앞으로 옮기면 정확히 찾음</li>
      <li>그래서 대응책이 <strong>배치</strong>임. 핵심 요약을 맨 앞에 두고, 섹션 헤더를 명시해 어디에 무엇이 있는지 표시해 두는 것임</li>
    </ul>

    <h4>세션 (session)</h4>
    <ul>
      <li>하나로 이어진 대화 전체임. 새 세션을 열면 컨텍스트가 <strong>빈 상태</strong>로 시작함</li>
      <li>세션이 끊기면(창을 닫거나 크래시가 나면) <strong>대화 안에만 있던 내용은 함께 사라짐</strong>. 여섯 시간 분석이 밤에 종료되면 아침에 처음부터 다시 시작하는 이유가 이것임</li>
    </ul>

    <h4>스크래치패드 (scratchpad)</h4>
    <ul>
      <li>에이전트가 발견한 내용을 <strong>파일에 기록해 두는 것</strong>임. 대화 밖에 있으므로 컨텍스트가 차도, 세션이 종료돼도 남음</li>
      <li>사람이 받아 적는 것이 아님. 지시문에 <strong>"핵심 발견은 scratchpad.md에 기록하며 진행하고, 이전 발견이 흐릿해지면 그 파일을 다시 읽을 것"</strong> 한 줄을 넣으면 에이전트가 Write와 Read 도구로 직접 수행함</li>
      <li>같은 계열로 <strong>매니페스트</strong>가 있음. 무엇이 끝났고 무엇이 남았고 결과 파일이 어디 있는지를 적은 진행 상태 파일임. 크래시 뒤에는 이 파일부터 읽고 재개함</li>
    </ul>

    <h4>에스컬레이션 (escalation)</h4>
    <ul>
      <li>에이전트가 스스로 처리하지 않고 <strong>사람에게 넘기는 것</strong>임. 넘기는 것이 실패가 아니라, 넘겨야 할 것을 넘기지 않는 것이 실패임</li>
      <li>정당한 트리거 세 가지: <strong>고객이나 사용자가 사람을 명시적으로 요구</strong>, <strong>정책에 조항이 없거나 예외인 상황</strong>, <strong>더 진전이 되지 않는 상태</strong></li>
      <li>근거가 되지 못하는 지표 세 가지: <strong>감정 점수</strong>(화가 났다고 해서 어려운 문제인 것은 아님), <strong>모델의 자기 신뢰도</strong>(보정 전에는 난이도와 무관함), <strong>턴 수</strong>(질문이 많은 사용자가 걸릴 뿐임)</li>
      <li>넘길 때 함께 올려야 하는 것: <strong>무엇이 걸렸는가 · 무엇을 시도했는가 · 지금까지의 부분 결과 · 가능한 선택지</strong></li>
    </ul>

    <h4>신뢰도 (confidence)와 보정 (calibration)</h4>
    <ul>
      <li><strong>신뢰도</strong>: 모델이 자기 답에 스스로 매긴 확신 수치임(0.92 같은 값). 문제는 이 숫자가 <strong>실제 정답률과 자주 어긋난다</strong>는 점임. 0.92라고 표시된 답들이 실제로는 70%만 맞는 경우가 있음</li>
      <li><strong>보정</strong>: "0.9라고 표시된 답 중 실제로 90%가 맞았는가"를 <strong>정답이 붙은 검증 세트로 대조</strong>해 숫자와 실제를 맞추는 작업임. 이 작업 없이 0.9 이상 자동 승인 같은 문턱을 세우면 그 문턱은 아무것도 걸러내지 못함</li>
      <li>함께 출제되는 오답 유도 항목은 <strong>문서 평균 점수</strong>임. 열 필드 중 아홉이 좋으면 평균은 높게 유지되고 틀린 한 필드가 그 아래에 가려짐. 그래서 <strong>필드 단위</strong> 신뢰도가 필요함</li>
    </ul>

    <h4>출처 보존 (provenance)</h4>
    <ul>
      <li>어떤 주장이 <strong>어느 문서 어느 문장에서 나왔는지</strong>를 결과와 함께 유지하는 것임</li>
      <li>어려운 이유는 요약을 한 번 거칠 때 <strong>가장 먼저 사라지는 것이 출처와 날짜</strong>이기 때문임. 문장은 남고 출처 표시만 없어짐</li>
      <li>그래서 대응책이 묶음 처리임. <strong>주장 + 근거 문장 + 출처 + 발행일</strong>을 처음부터 한 묶음으로 만들어 요약을 거쳐도 묶음째 옮겨지게 함</li>
      <li><strong>발행일</strong>이 특히 중요함. 날짜가 없으면 2021년 45%와 2024년 28%가 <strong>모순처럼</strong> 보이지만, 날짜가 붙으면 <strong>시간에 따른 변화</strong>라는 발견이 됨</li>
    </ul>
    <div class="callout">📌 여기까지가 구조도에 나오는 용어 전부임. 다음 챕터부터는 이 용어들을 설명 없이 사용하므로, 흐릿한 부분이 있으면 지금 다시 읽고 갈 것.</div>`});

  /* ── ⑥ 학습 순서 ── */
  OPEN.steps.push({type:"concept", kind:"TOPIC · 주제 설명", h:"이 파트를 학습하는 순서",
   html:`<p class="lead">챕터가 일곱 개이지만 번호 순서대로 학습하는 것이 최선은 아님. 정답률이 낮게 나타나는 영역을 먼저 메우는 순서를 권장함.</p>
    <table>
      <tr><th>순서</th><th>챕터</th><th>구조도의 어느 항목</th><th>여기서 얻는 것</th></tr>
      <tr><td>1</td><td><strong>Ch1</strong> 긴 대화에서 핵심 정보 보존</td><td>윗줄 · 컨텍스트 창 관리</td><td>정보가 손실되는 경로 셋 + case facts 블록</td></tr>
      <tr><td>2</td><td><strong>Ch7</strong> 컨텍스트 창 최적화 (네 방법)</td><td>윗줄 · 컨텍스트 창 관리</td><td>Q1이 물었던 <strong>바로 그 비교</strong>임. 정답률이 가장 낮은 영역이므로 여기서 점수 차이가 크게 남</td></tr>
      <tr><td>3</td><td><strong>Ch4</strong> 대형 코드베이스 탐색</td><td>장기 탐색 지원</td><td>Q3이 물었던 것. 정답률이 두 번째로 낮은 영역임</td></tr>
      <tr><td>4</td><td><strong>Ch2</strong> 에스컬레이션과 모호성</td><td>에스컬레이션</td><td>Q2가 물었던 것. 정당한 트리거와 근거가 되지 못하는 지표의 구분</td></tr>
      <tr><td>5</td><td><strong>Ch3</strong> 멀티에이전트 에러 전파</td><td>에러 전파</td><td>실패를 상위로 보고하는 형식 네 가지</td></tr>
      <tr><td>6</td><td><strong>Ch5</strong> 인간 리뷰와 신뢰도 보정</td><td>품질 게이트</td><td>자동 승인 문턱을 어디에 어떻게 설정하는가</td></tr>
      <tr><td>7</td><td><strong>Ch6</strong> 출처 보존과 불확실성</td><td>출처 보존</td><td>충돌·날짜·커버리지 주석 처리</td></tr>
      <tr><td>8</td><td><strong>미니테스트</strong> 12문항</td><td>전체</td><td>판단 기준 세 가지가 실제로 정리됐는지 확인</td></tr>
    </table>
    <h4>학습 방법</h4>
    <ul>
      <li>전체 <strong>2시간</strong> 정도임. 한 번에 끝내려 하지 말고 Ch1과 Ch7을 한 번에, 나머지를 다음 차례로 나누어도 됨</li>
      <li>문항마다 <strong>이유 카드</strong>를 통과해야 다음으로 넘어감. 정답을 맞히고 이유를 틀렸다면 그것은 <strong>아직 이해하지 못한 상태</strong>임. 선택지가 조금만 바뀌어도 틀리게 됨</li>
      <li>틀린 문항은 해설의 <strong>오답 설명 세 줄</strong>까지 읽을 것. D5의 오답 선택지는 매번 같은 형태로 반복됨. "컨텍스트 창이 더 큰 모델로", "잊지 말라고 지시", "감정 점수로 판단", "평균 점수로 자동 승인"이 대표적임</li>
      <li>각 챕터를 열면 구조도가 다시 나오고 <strong>지금 학습하는 항목이 밝게</strong> 표시됨. 그 항목이 어느 문제를 담당하는지 확인하고 들어갈 것</li>
    </ul>
    <div class="callout">🎯 목표는 9문항 중 <b>7문항 이상</b>임. 판단 기준 세 가지와 Ch7의 네 방법 비교만 정리해도 그 수준에 도달함.</div>`});

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
      {t:`구조화 출력에는 메타데이터를 넣는 것이 정석이기 때문임.`},
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
      {c:"D5", t:"발행일 · 수집일", d:"구조화 출력(structured output)에 시점을 필수로 넣는 규칙임. 날짜가 없으면 2021년 45%와 2024년 28%가 모순으로 보이고, 붙이면 시간에 따른 변화라는 발견이 됨."},
      {c:"D5", t:"충돌 주석 (conflict annotation)", d:"수치가 어긋나면 임의 선택도 평균도 금지함. 출처, 시점, 방법론을 붙여 둘 다 보존하고 조정은 상위로 넘김. 최신성은 방법론 차이(실측과 전망)를 판단하는 근거가 되지 못함."},
    ].forEach(function(g){
      if(!have[g.c + "|" + g.t]) AX.glossary.push(g);
    });
  }

})();
