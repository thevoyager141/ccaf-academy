/* PART 5 — 컨텍스트 관리 & 신뢰성 (D5, 15%) — 1차 최약점 */
window.CCAF_CONTENT.p5 = {
  id: "p5",
  lessons: [

  /* ===== CH 1 · 5.1 정보 보존 ===== */
  { id:"p5c1", ch:"CH 1", title:"긴 대화에서 핵심 정보 보존 (5.1)",
    steps:[
      {type:"concept", kind:"PART BRIEFING · 파트 설명", h:"PART 05 — 1차 50%, 뒤집어야 할 도메인",
       html:`<p class="lead">이 파트는 <strong>Context Management & Reliability</strong>. 1차에서 절반밖에 못 맞힌 최약점.</p>
        <h4>파트 프로필</h4>
        <ul>
          <li>출제 비중 <strong>15% ≈ 9문항</strong> · 1차 점수 <strong>50%</strong> 🔴</li>
          <li>목표: 9문항 중 <strong>7개 이상</strong> — 이 파트만 뒤집어도 합격선이 보임</li>
          <li>챕터 6개 + 미니테스트 · 약 2시간 (세션 S12~S13)</li>
        </ul>
        <h4>다루는 범위</h4>
        <ul>
          <li><strong>정보 보존</strong> — 긴 대화에서 숫자·날짜 지키기 (Ch1)</li>
          <li><strong>에스컬레이션</strong> — 언제 사람에게 넘기나 (Ch2)</li>
          <li><strong>에러 전파</strong> — 멀티에이전트의 실패 신호 (Ch3)</li>
          <li><strong>대형 코드베이스 탐색</strong> — 장기전의 컨텍스트 (Ch4)</li>
          <li><strong>인간 리뷰·신뢰도 보정</strong> (Ch5)</li>
          <li><strong>출처 보존·불확실성</strong> (Ch6)</li>
        </ul>
        <div class="callout">🎯 이 파트의 공통 질문: <b>"정보가 새거나 뭉개지는 지점이 어디고, 무엇으로 지키나."</b> 감·지시가 아니라 구조(블록, 매핑, 표집)로 지키는 보기가 정답.</div>`},
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"컨텍스트가 새는 세 개의 구멍",
       html:`<h4>① 점진적 요약의 손실</h4>
        <ul>
          <li>긴 대화를 요약해 압축할 때 <strong>숫자·퍼센트·날짜·고객이 말한 기대치</strong>가 뭉개짐</li>
          <li>"$847.50 환불, 3/15까지"가 "환불 문의 처리 중"이 되는 현상</li>
        </ul>
        <h4>② lost in the middle</h4>
        <ul>
          <li>모델은 긴 입력의 <strong>처음과 끝은 잘</strong> 처리, <strong>중간은 누락</strong> 위험</li>
        </ul>
        <h4>③ 도구 결과의 토큰 잠식</h4>
        <ul>
          <li>주문 조회 하나가 <strong>40개+ 필드</strong>를 반환하는데 유의미한 건 5개</li>
          <li>이런 결과가 누적되며 컨텍스트를 관련도와 무관하게 잡아먹음</li>
        </ul>
        <div class="callout">📖 용어 카드 — <b>컨텍스트 창</b>: 모델이 한 번에 읽을 수 있는 작업대 크기. 작업대가 차면 뭔가를 내려놓아야 하는데, 그때 뭘 지킬지가 이 챕터의 주제.</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"구멍별 마개: 블록·트리밍·배치",
       html:`__MAP5:ctx__<h4>① case facts 블록 — 요약 밖의 금고</h4>
        <ul>
          <li>거래 사실(금액·날짜·주문번호·상태)을 <strong>구조화 블록으로 추출</strong></li>
          <li>이 블록은 <strong>요약 대상에서 제외</strong>하고 매 프롬프트에 그대로 포함</li>
          <li>멀티 이슈 세션이면 이슈별 구조화 데이터(주문 ID·금액·상태)를 별도 레이어로</li>
        </ul>
        <h4>② 트리밍 — 쌓이기 전에 자르기</h4>
        <ul>
          <li>장황한 도구 출력에서 <strong>관련 필드만 남기고</strong> 나머지는 컨텍스트에 넣지 않기</li>
        </ul>
        <h4>③ 위치 배치 — 중간을 믿지 말 것</h4>
        <ul>
          <li>핵심 발견 요약은 <strong>맨 앞에</strong>, 상세는 명시적 섹션 헤더로 조직</li>
        </ul>
        <h4>④ 상류에서 구조화 — 하류가 빠듯할 때</h4>
        <ul>
          <li>다운스트림 에이전트의 컨텍스트 예산이 작으면, 업스트림이 <strong>장황한 추론 대신 구조화 데이터</strong>(핵심 사실·인용·관련도)만 반환하게 수정</li>
        </ul>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1 — Crossed wires",
       q:`A customer has three open issues in one session: a refund on order #A-1042 ($89), a replacement for #A-1077, and a billing dispute over #A-1103 ($312). Twenty turns in, the agent offers "the $312 refund for your order #A-1042" — splicing issue 3's amount onto issue 1's order. A case-facts block exists, but it's one flat list of every number mentioned. What is the right fix?`,
       opts:[
         {t:`Restructure the persistent layer per issue: each open issue carries its own structured record (order ID, amounts, status, agreed actions), so facts can't cross-contaminate between concurrent threads.`, ok:true},
         {t:`Limit sessions to one issue each, asking multi-issue customers to open separate conversations.`},
         {t:`Add a prompt instruction: "always double-check which order each amount belongs to before responding."`},
         {t:`Sort the flat facts list chronologically so related facts naturally cluster together.`},
       ],
       hint:`case facts 블록이 '있는데도' 섞였다는 게 포인트야 — 블록의 존재가 아니라 '구조'가 문제지. 가이드 5.1의 멀티 이슈 처방을 봐.`,
       explain:{
         good:`5.1의 두 번째 층위: 멀티 이슈 세션은 이슈별 구조화 데이터를 별도 레이어로. 평면 리스트는 보존은 해도 '소속'을 안 지켜서 $312가 #A-1042에 붙는 사고가 나 — 구조가 곧 정확성이야.`,
         wrongs:[
           `<b>B — 세션 분리 강제:</b> 시스템 결함을 고객 불편으로 전가 — FCR도 무너져.`,
           `<b>C — 재확인 지시:</b> 확률적 — 뒤섞인 평면 리스트를 보고 재확인해봤자 같은 혼선.`,
           `<b>D — 시간순 정렬:</b> 절반의 진실 — 고객이 이슈를 오가며 말하면 시간순은 소속과 무관해져.`,
         ]},
       principle:"보존만으론 부족 — 소속까지 구조로"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2 — The 40-field flood",
       q:`Each lookup_order call returns 40+ fields (warehouse codes, internal SKUs, carrier metadata...), but the return-processing agent only needs 5. After a few lookups, the context is dominated by irrelevant fields, and the agent starts missing details from earlier conversation turns. Where should the fix go?`,
       opts:[
         {t:`Trim tool outputs to the return-relevant fields before they enter the conversation context, so irrelevant data never accumulates.`, ok:true},
         {t:`Summarize the whole conversation more aggressively to make room for the tool outputs.`},
         {t:`Instruct the agent to "focus only on relevant fields" when reading tool results.`},
         {t:`Run /compact after every third lookup to shrink the context.`}],
       hint:`쓰레기가 쌓여서 문제라면, 쌓인 다음에 치우는 것과 애초에 안 들이는 것 중 뭐가 구조적일까?`,
       explain:{
         good:`가이드 5.1: 장황한 도구 출력은 컨텍스트에 쌓이기 전에 관련 필드만 남기고 트리밍. 유입 지점 차단이 근본 처방.`,
         wrongs:[
           `<b>B:</b> 대화(진짜 정보)를 눌러서 쓰레기(무관 필드) 자리를 만드는 역방향.`,
           `<b>C:</b> 읽을 때 무시하라 해도 토큰은 이미 소모 — 잠식은 그대로.`,
           `<b>D:</b> 사후 압축은 이미 들어온 노이즈와 함께 진짜 정보도 뭉갤 위험.`,
         ]},
       principle:"유입 전에 트리밍 — 쌓인 뒤는 늦다"},
    ]},

  /* ===== CH 2 · 5.2 에스컬레이션 ===== */
  { id:"p5c2", ch:"CH 2", title:"에스컬레이션과 모호성 해결 (5.2)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"넘길 때와 붙잡을 때",
       html:`<h4>정당한 에스컬레이션 트리거 3종 (암기)</h4>
        <ul>
          <li>① 고객이 <strong>인간을 명시적으로 요구</strong></li>
          <li>② <strong>정책 예외·공백</strong> — 정책이 이 케이스에 침묵함 (복잡한 케이스 일반이 아니라!)</li>
          <li>③ <strong>의미 있는 진전 불가</strong></li>
        </ul>
        <h4>신뢰할 수 없는 대리 지표 2종 (오답 장치 단골)</h4>
        <ul>
          <li><strong>감정 기반</strong> — 화난 고객 ≠ 복잡한 케이스. 감성 분석 에스컬레이션은 오답</li>
          <li><strong>자기 보고 신뢰도</strong> — 어려운 케이스에서 이미 과신하는 모델의 점수는 못 믿음</li>
        </ul>
        <h4>미묘한 균형 (시험이 좋아하는 지점)</h4>
        <ul>
          <li>명시적 인간 요구 → <strong>조사 시도 없이 즉시 존중</strong></li>
          <li>단, 이슈가 단순하면: 불만을 인정하며 <strong>해결을 한 번 제안</strong> → 고객이 재차 원하면 즉시 에스컬레이션</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"판단 케이스 4종 세트",
       html:`__MAP5:esc__<h4>케이스 ①: 55% 해결률, 거꾸로 된 에스컬레이션 (공식 가이드 샘플 3번 — 에스컬레이션 기준을 묻는 문제)</h4>
        <ul>
          <li>단순 케이스(사진 있는 파손 교환)는 넘기고, 정책 예외는 붙잡는 증상</li>
          <li>처방: <strong>명시적 에스컬레이션 기준 + few-shot</strong> (넘길 때 vs 붙잡을 때 예시)</li>
          <li>오답: 신뢰도 임계값, 감성 분석, 별도 분류기 학습</li>
        </ul>
        <h4>케이스 ②: 정책의 침묵</h4>
        <ul>
          <li>자사 정책은 자사 사이트 가격 조정만 언급 — 고객은 <strong>경쟁사 가격 매칭</strong> 요구</li>
          <li>정책이 침묵 = 에이전트가 지어내면 안 됨 → <strong>에스컬레이션</strong></li>
        </ul>
        <h4>케이스 ③: 고객 매칭이 여러 명</h4>
        <ul>
          <li>같은 이름 3명 → 휴리스틱(최근 가입자?)으로 <strong>고르지 말고</strong></li>
          <li><strong>추가 식별자 요청</strong> (이메일, 주문번호)</li>
        </ul>
        <h4>케이스 ④: 화났지만 단순한 요청</h4>
        <ul>
          <li>불만 인정 + 능력 안이면 해결 제안 → 재차 요구 시 에스컬레이션</li>
        </ul>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1 — Auditing the trigger config",
       q:`Your escalation config uses three automated triggers: sentiment_score < -0.5, self_confidence < 0.6, and turn_count > 8. Production data: furious customers with one-click issues get escalated (annoying the human team); calm customers requesting things the policy never mentions get confidently auto-"resolved" with invented terms; and thorough customers who simply ask many questions hit the turn limit. What is the correct redesign?`,
       opts:[
         {t:`Replace the proxy triggers with the legitimate ones — explicit customer request for a human, policy exceptions/gaps, and inability to make progress — expressed as prompt criteria with few-shot examples, since none of the current three signals measures case complexity.`, ok:true},
         {t:`Keep the framework but tune the thresholds — sentiment < -0.7, confidence < 0.4, turns > 12 — based on a month of production data.`},
         {t:`Add a fourth trigger for policy-gap detection on top of the existing three, giving the system defense in depth.`},
         {t:`Combine the three signals into one weighted composite escalation score instead of independent thresholds.`},
       ],
       hint:`세 증상이 세 트리거의 결함을 하나씩 고발해 — 감정≠난이도, 자기 신뢰도≠보정됨, 턴 수≠막힘. 이게 임계값의 문제일까, 신호 자체의 문제일까?`,
       explain:{
         good:`5.2의 정당 트리거 3종(명시 요구/정책 공백/진전 불가)과 가짜 지표의 대비를 설정 감사로 묻는 문제. 세 신호 모두 복잡도의 대리물이 못 되니, 임계값 조정이나 가중 합성은 잘못된 신호를 더 정교하게 쓰는 것일 뿐이야.`,
         wrongs:[
           `<b>B — 임계값 튜닝:</b> 절반의 진실 함정 — "데이터 기반"처럼 보이지만 신호가 틀렸으면 어떤 임계값도 맞을 수 없어.`,
           `<b>C — 4번째 트리거 추가:</b> 방향은 맞지만 틀린 신호 셋을 남겨둬 — 오발 에스컬레이션과 침묵 정책 발명이 계속돼.`,
           `<b>D — 가중 합성:</b> 틀린 신호 셋을 섞으면 더 그럴듯하게 틀린 신호 하나가 나올 뿐.`,
         ]},
       principle:"임계값이 아니라 신호를 의심하라"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2 — Three Kims and a silent policy",
       q:`Two production incidents this week: (a) get_customer returned three customers named "J. Kim" and the agent picked the most recently active one — wrong; (b) a customer requested price-matching against a competitor, your policy only covers own-site price drops, and the agent invented a 10% goodwill discount. What is the correct pair of behaviors?`,
       opts:[
         {t:`(a) Ask the customer for an additional identifier (email or order number) instead of selecting heuristically; (b) escalate to a human, because the policy is silent on competitor matching.`, ok:true},
         {t:`(a) Pick the customer whose recent orders best match the conversation topic; (b) offer the smallest reasonable discount to preserve goodwill.`},
         {t:`(a) Escalate to a human whenever multiple matches occur; (b) refuse the request, since the policy doesn't authorize it.`},
         {t:`(a) Ask for an additional identifier; (b) apply the own-site price-drop policy as the closest analogous rule.`}],
       hint:`(a) 모호성은 고객이 풀 수 있는 모호성이야 — 누구에게 물어야 할까? (b) 정책이 침묵할 때 에이전트가 하면 안 되는 일이 뭐였지?`,
       explain:{
         good:`(a) 다중 매칭 = 추가 식별자 요청 (휴리스틱 선택 금지). (b) 정책 공백 = 에스컬레이션 — 에이전트가 정책을 지어내거나 유추 적용하면 안 돼. 가이드 5.2의 두 케이스 그대로.`,
         wrongs:[
           `<b>B:</b> (a) 대화 주제 매칭도 휴리스틱이야 — 세련돼 보여도 같은 실수. (b) 할인 발명이 바로 사고 원인.`,
           `<b>C:</b> (a) 고객에게 물으면 풀리는 걸 인간에게 — 과잉 에스컬레이션. (b) 거절도 정책 발명 — 정책은 허용도 금지도 안 했어.`,
           `<b>D:</b> (a)는 맞지만 (b) 유사 규칙의 유추 적용은 정책 침묵을 메꾸는 또 다른 발명.`,
         ]},
       principle:"모호성은 물어서, 공백은 넘겨서"},
    ]},

  /* ===== CH 3 · 5.3 에러 전파 ===== */
  { id:"p5c3", ch:"CH 3", title:"멀티에이전트 에러 전파 (5.3)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"실패 신호의 해부학",
       html:`<h4>구조화 에러 컨텍스트 4요소 (암기)</h4>
        <ul>
          <li>① <strong>실패 유형</strong> (타임아웃? 권한? 빈 결과?)</li>
          <li>② <strong>시도한 것</strong> (어떤 쿼리를 던졌나)</li>
          <li>③ <strong>부분 결과</strong> (건진 게 있으면 같이)</li>
          <li>④ <strong>대안</strong> (다른 접근 제안)</li>
        </ul>
        <h4>안티패턴 3종 (오답 보기 단골)</h4>
        <ul>
          <li><strong>뭉뚱그린 상태</strong> — "search unavailable"만 반환 (재시도 소진 후라도)</li>
          <li><strong>실패의 성공 위장</strong> — 타임아웃을 빈 결과로 반환</li>
          <li><strong>전체 중단</strong> — 실패 하나에 워크플로 종료</li>
        </ul>
        <h4>2.2와의 관계</h4>
        <ul>
          <li>2.2는 <strong>도구→에이전트</strong>의 에러 형식, 5.3은 <strong>서브에이전트→코디네이터</strong>의 전파 전략 — 원리는 동일: 구조화</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"코디네이터가 똑똑해지는 조건",
       html:`__MAP5:err__<h4>① 왜 4요소인가</h4>
        <ul>
          <li>코디네이터의 선택지: 수정 쿼리로 재시도 / 대안 접근 / 부분 결과로 진행</li>
          <li>4요소가 없으면 이 선택 자체가 불가능 — "search unavailable"론 아무 판단도 못 함</li>
        </ul>
        <h4>② 로컬 복구 먼저</h4>
        <ul>
          <li>일시 실패는 서브에이전트가 <strong>자체 복구</strong> (제한된 재시도)</li>
          <li>해결 못 한 것만 <strong>부분 결과·시도 내역과 함께</strong> 위로</li>
        </ul>
        <h4>③ 커버리지 주석</h4>
        <ul>
          <li>일부 소스 실패 채로 합성했다면: 리포트에 <strong>어느 발견이 탄탄하고 어느 주제에 공백</strong>이 있는지 표시</li>
          <li>독자가 빈 곳을 아는 리포트가 정직한 리포트</li>
        </ul>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1 — The green pipeline that lied",
       q:`Overnight research stayed "green," but this morning's competitive-analysis report simply lacks its pricing section. Logs: the pricing subagent hit paywalls on both target sources and returned {"results": [], "status": "ok"} — its author added that behavior "so one flaky source doesn't fail the whole pipeline." The coordinator, seeing success, proceeded to synthesis. What is the correct fix?`,
       opts:[
         {t:`Have the subagent report the failure as structured error context — failure type (access/paywall), what was attempted, any partial results, and alternatives (cached copies, substitute sources) — so the coordinator can choose to retry differently, substitute, or ship with a coverage note.`, ok:true},
         {t:`Keep the suppression but have the coordinator scan synthesized reports for suspiciously empty sections before shipping.`},
         {t:`Make source failures fatal: any failed fetch halts the pipeline until a human investigates the cause.`},
         {t:`Point the pricing subagent at five sources instead of two so at least one usually succeeds, keeping the "ok" behavior as resilience.`},
       ],
       hint:`"파이프라인을 초록으로 유지하자"는 선의가 뭐를 죽였는지 봐 — 코디네이터의 '결정할 기회' 자체가 사라졌지.`,
       explain:{
         good:`실패의 성공 위장은 3대 안티패턴 중 하나(5.3) — 코디네이터의 복구 선택지(대안 소스, 캐시, 커버리지 주석)가 전부 봉쇄됐어. 구조화 4요소가 올라가면 '유연한 파이프라인'이라는 원래 목표도 제대로 달성돼 — 유연성은 은폐가 아니라 정보 있는 복구에서 나오는 거야.`,
         wrongs:[
           `<b>B — 빈 섹션 스캔:</b> 하류에서 증상을 역추적하는 반쪽 보완 — 왜 비었는지(접근 실패? 진짜 데이터 없음?)를 모르면 올바른 대응도 불가해.`,
           `<b>C — 전액 중단:</b> 실패 하나에 워크플로 종료는 반대편 안티패턴 — 저자가 피하려던 바로 그 문제야.`,
           `<b>D — 소스 다섯개:</b> 확률 완화일 뿐 — 전부 실패하는 날 같은 은폐가 재발하고, 그날이 오기 전까지 결함이 보이지 않아.`,
         ]},
       principle:"초록 불이 정직하지 않으면 무의미"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2 — The honest report",
       q:`In a 5-source research run, two sources failed (one paywalled, one timed out) despite local retries. The synthesis must still ship. Which output design is correct?`,
       opts:[
         {t:`Complete the synthesis with available findings, annotating coverage: which conclusions are well-supported and which topic areas have gaps due to the unavailable sources.`, ok:true},
         {t:`Delay the report until all five sources succeed, since partial synthesis misleads readers.`},
         {t:`Synthesize from the three available sources without mentioning the failures, to keep the report clean.`},
         {t:`Have the synthesis agent fill the gaps from its general knowledge so coverage looks complete.`}],
       hint:`부분 결과로 진행하는 건 맞아. 문제는 독자가 '빈 곳'을 알 수 있느냐야.`,
       explain:{
         good:`가이드 5.3: 커버리지 주석 — 탄탄한 발견과 소스 공백 영역을 구분 표시. 부분 결과로 진행하되 정직하게.`,
         wrongs:[
           `<b>B:</b> 페이월은 재시도로 안 풀려 — 무기한 지연.`,
           `<b>C:</b> 공백을 숨긴 리포트는 완전해 보이는 불완전 — 독자가 잘못된 확신을 갖게 돼.`,
           `<b>D:</b> 일반 지식으로 메꾸기 = 출처 없는 환각을 리서치로 위장.`,
         ]},
       principle:"부분 진행 + 커버리지 주석"},
    ]},

  /* ===== CH 4 · 5.4 대형 코드베이스 탐색 ===== */
  { id:"p5c4", ch:"CH 4", title:"대형 코드베이스 탐색의 컨텍스트 관리 (5.4)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"장기전의 적: 컨텍스트 열화",
       html:`<h4>열화의 증상 (알아채는 법)</h4>
        <ul>
          <li>앞서 발견한 <strong>구체적 클래스·함수</strong> 대신 <strong>"일반적 패턴"</strong>을 말하기 시작</li>
          <li>같은 질문에 세션 초반과 다른 답</li>
        </ul>
        <h4>대응 도구 4종</h4>
        <ul>
          <li><strong>스크래치패드 파일</strong> — 핵심 발견을 파일로 기록, 이후 질문에서 참조</li>
          <li><strong>서브에이전트 위임</strong> — 장황한 조사는 위임, 본 에이전트는 고수준 조율만</li>
          <li><strong>단계 간 요약 주입</strong> — 한 단계의 핵심을 요약해 다음 단계 초기 컨텍스트로</li>
          <li><code>/compact</code> — 장황한 발견으로 컨텍스트가 차면 압축</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"장기 탐색의 설계도",
       html:`__MAP5:explore__<h4>① 질문 단위 위임</h4>
        <ul>
          <li>"모든 테스트 파일 찾기", "환불 흐름 의존성 추적" 같은 구체 질문을 서브에이전트에</li>
          <li>본 에이전트는 결과 요약만 받아 <strong>고수준 이해를 유지</strong></li>
        </ul>
        <h4>② 스크래치패드 운영</h4>
        <ul>
          <li>발견 즉시 기록 → 이후 질문에서 <strong>파일을 참조</strong> — 컨텍스트 열화를 파일이 상쇄</li>
        </ul>
        <h4>③ 크래시 복구 — 매니페스트</h4>
        <ul>
          <li>각 에이전트가 <strong>상태를 정해진 위치로 내보냄</strong> (구조화 상태 export)</li>
          <li>재개 시 코디네이터가 <strong>매니페스트를 로드</strong>해 에이전트 프롬프트에 주입</li>
          <li>1.7의 세션 복구와 같은 철학: 기록이 기억을 대신한다</li>
        </ul>
        <div class="callout">📖 용어 카드 — <b>스크래치패드</b>: 연습장. 대화 밖의 파일이라 컨텍스트가 차도 안 사라짐. <b>매니페스트</b>: 짐 목록 — 어떤 상태 파일이 어디 있는지의 색인.</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1 — Three symptoms, three tools",
       q:`One week with your codebase-analysis agent produced three incidents: (a) by hour three it answers "repositories typically handle caching like..." instead of citing the CacheManager class it analyzed at hour one; (b) every new question triggers Grep/Read floods that bury the conversation in raw output; (c) last night's six-hour run crashed at 2 AM and today restarted from zero. Which countermeasure mapping is correct?`,
       opts:[
         {t:`(a) scratchpad files recording key findings as they're discovered, referenced in later prompts; (b) delegate exploration to subagents that return only summaries; (c) structured state exports to known locations, with a manifest the coordinator loads on resume.`, ok:true},
         {t:`(a) run /compact to refresh the session's memory; (b) scratchpad files to absorb the raw output; (c) split the nightly run into two three-hour halves.`},
         {t:`(a) re-run the full analysis each morning for freshness; (b) a larger context window; (c) wrap the run in an automatic restart loop.`},
         {t:`(a) prompt reminders to "always cite the specific classes you found"; (b) subagent delegation; (c) manifest-based state recovery.`},
       ],
       hint:`(a)는 열화, (b)는 잠식, (c)는 휘발 — 각각 전용 도구가 있어. 둘만 맞는 보기가 제일 위험해.`,
       explain:{
         good:`5.4의 3종 세트 매칭: 열화=스크래치패드(대화 밖 기록), 잠식=위임 격리(요약만 본선으로), 크래시=매니페스트 복구. D는 (b)(c)가 맞아서 제일 유혹적이지만 (a)를 지시로 때워 — 밀려난 기억은 지시로 소환 안 돼.`,
         wrongs:[
           `<b>B — /compact로 열화 대응:</b> 압축은 복원이 아니야 — 이미 뫟개진 구체 발견을 되살리지 못해. 반쪽 배치.`,
           `<b>C — 재분석 + 재시작 루프:</b> 비용 재지불의 자동화 — 아무것도 보존하지 않아.`,
           `<b>D — (a)만 지시 처방:</b> 절반 이상의 진실 함정 — 나머지 둘이 맞아서 더 위험해. 잊은 걸 인용하라는 지시는 빈손 요구야.`,
         ]},
       principle:"증상마다 전용 도구 — 섞으면 함정"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2 — The overnight crash",
       q:`Your overnight multi-agent codebase analysis (a coordinator plus four explorers) crashed at 3 AM, six hours in. Currently a crash means restarting from zero. Which design enables recovery without redoing completed work?`,
       opts:[
         {t:`Have each agent export structured state to a known location as it works; on resume, the coordinator loads a manifest of those exports and injects the state into each agent's prompt.`, ok:true},
         {t:`Wrap the entire run in a retry loop that relaunches the full analysis on failure.`},
         {t:`Keep all intermediate results in the coordinator's conversation history so nothing is lost.`},
         {t:`Split the analysis into independent nightly jobs so a crash only loses one night.`}],
       hint:`크래시가 지워버리는 건 대화 속 상태야. 대화 밖에, 재개 절차까지 갖춘 구조가 있었지?`,
       explain:{
         good:`가이드 5.4의 크래시 복구 설계 그대로: 상태를 정해진 위치로 export + 매니페스트 로드 + 프롬프트 주입. 완료된 작업이 파일로 살아남아.`,
         wrongs:[
           `<b>B:</b> 전체 재실행 루프 — "처음부터"를 자동화했을 뿐.`,
           `<b>C:</b> 대화 히스토리는 크래시와 함께 사라지는 바로 그것.`,
           `<b>D:</b> 일 단위 분할은 손실 단위를 줄일 뿐 복구 메커니즘이 아니야.`,
         ]},
       principle:"상태는 밖으로 — export + 매니페스트"},
    ]},

  /* ===== CH 5 · 5.5 인간 리뷰·신뢰도 보정 ===== */
  { id:"p5c5", ch:"CH 5", title:"인간 리뷰 워크플로와 신뢰도 보정 (5.5)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"97%라는 숫자를 의심하라",
       html:`<div class="callout">📖 용어 카드 — <b>층화 표집</b>: 전체에서 막 뽑지 않고 그룹(문서 유형)별로 나눠 골고루 뽑기. <b>보정(calibration)</b>: 모델의 "90% 확신"이 실제로 90% 맞는지 정답지로 대조하는 작업.</div>
        <h4>집계 지표의 함정</h4>
        <ul>
          <li>전체 정확도 97% ← 그 안에 <strong>특정 문서 유형은 70%</strong>가 숨어 있을 수 있음</li>
          <li>자동화 확대 전에 <strong>문서 유형별 × 필드별</strong>로 정확도 분해 검증</li>
        </ul>
        <h4>층화 무작위 표집의 용도</h4>
        <ul>
          <li>고신뢰 추출에서도 계층별로 표본 추출 → <strong>지속적 오류율 측정</strong> + <strong>새 오류 패턴 탐지</strong></li>
        </ul>
        <h4>필드 수준 신뢰도</h4>
        <ul>
          <li>문서 하나가 아니라 <strong>필드마다</strong> 신뢰도 점수 출력</li>
          <li>라벨된 검증 세트로 <strong>임계값을 보정</strong>한 뒤에만 라우팅 기준으로 사용</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"리뷰 인력이 모자랄 때의 설계",
       html:`__MAP5:conf__<h4>리뷰 라우팅 우선순위</h4>
        <ul>
          <li>① <strong>모델 신뢰도가 낮은</strong> 추출</li>
          <li>② 원본이 <strong>모호하거나 모순</strong>인 문서</li>
          <li>한정된 리뷰어 시간을 이 둘에 집중</li>
        </ul>
        <h4>자동화 확대의 절차</h4>
        <ul>
          <li>세그먼트별 정확도 검증 → 고신뢰 구간 자동화 → <strong>층화 표집으로 계속 감시</strong></li>
          <li>감시 없는 자동화는 새 문서 유형이 들어올 때 조용히 무너짐</li>
        </ul>
        <div class="callout">🎯 시험 포인트: "정확도가 높으니 리뷰를 줄이자" 문제의 정답엔 반드시 <b>세그먼트 분해</b>나 <b>층화 표집</b>이 들어 있어. "전체 지표가 좋으니 그냥 줄인다"는 항상 오답.</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1 — The averaged-away tax ID",
       q:`Your extractor outputs one confidence score per document; documents averaging 0.93+ auto-approve. Finance just found tax_registration_number wrong on 18% of auto-approved invoices — the other nine fields were nearly perfect, so the document average stayed high while the weakest field sailed through unreviewed. What is the correct redesign?`,
       opts:[
         {t:`Have the model output field-level confidence scores, calibrate them per field against a labeled validation set, and route documents whose critical fields fall below their calibrated thresholds — a document average cannot protect an individual field.`, ok:true},
         {t:`Raise the document-level auto-approval bar from 0.93 to 0.97, cutting how much error can hide beneath the average.`},
         {t:`Route every document that contains a tax-ID field to human review, regardless of its confidence scores.`},
         {t:`Remove tax_registration_number from automated extraction and have finance key that field in manually.`},
       ],
       hint:`평균 속에 약한 필드가 숨는 구조야 — 문서 단위 숫자를 아무리 올려도 '필드'는 안 보여. 97% 함정의 필드 버전이지.`,
       explain:{
         good:`5.5의 필드 수준 신뢰도 + 필드별 보정: 문서 평균은 아홉 필드의 우수함으로 한 필드의 실패를 가려 — 집계 지표 함정의 필드 버전이야. 임계값은 필드 단위로, 그것도 보정 후에.`,
         wrongs:[
           `<b>B — 문서 기준 상향:</b> 절반의 진실 — 0.97도 평균이라 좀 덜 숨을 뿐 여전히 숨어. 처리량만 급감하고.`,
           `<b>C — 해당 필드 전량 리뷰:</b> 정확한 82%까지 사람에게 — 리뷰 병목 재생산으로 자동화 목적 상실.`,
           `<b>D — 필드 수동화:</b> 필드 하나 못 지키는 시스템이라는 자백 — 개선 가능한 결함을 포기로 바꿔치기.`,
         ]},
       principle:"평균은 필드를 못 지킨다"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2 — Guarding the automated lane",
       q:`You automated high-confidence invoice extractions after proper segment validation. Six months later, a new supplier's invoice layout starts failing silently inside the automated lane. Which ongoing safeguard would have caught this?`,
       opts:[
         {t:`Stratified random sampling of high-confidence extractions for continuous error-rate measurement and novel-pattern detection.`, ok:true},
         {t:`Re-running the original validation set quarterly to confirm the model still passes.`},
         {t:`Requiring the model to output a warning when it sees unfamiliar layouts.`},
         {t:`Lowering the automation threshold so more documents route to humans overall.`}],
       hint:`새 패턴은 '고신뢰 구간 안'에서 조용히 생겨. 그 구간을 계속 들여다보는 장치가 뭐였지?`,
       explain:{
         good:`층화 표집의 존재 이유 그 자체: 고신뢰(자동) 구간에서도 계층별 표본을 계속 뽑아 오류율 변화와 새 오류 패턴(새 공급사 레이아웃)을 탐지 (가이드 5.5).`,
         wrongs:[
           `<b>B:</b> 옛 검증 세트엔 새 공급사가 없어 — 과거를 재확인할 뿐 미래를 못 봐.`,
           `<b>C:</b> "낯설면 경고해"는 자기 인식에 기대는 확률적 장치 — 모델은 종종 낯선 걸 낯설다고 못 느껴.`,
           `<b>D:</b> 전체 임계값 하향은 비용만 올리고 새 패턴 탐지는 여전히 우연에 맡겨.`,
         ]},
       principle:"자동화엔 감시를 — 층화 표집"},
    ]},

  /* ===== CH 6 · 5.6 출처 보존·불확실성 ===== */
  { id:"p5c6", ch:"CH 6", title:"출처 보존과 불확실성 처리 (5.6)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"주장과 출처의 연결이 끊기는 순간",
       html:`<h4>어디서 끊기나</h4>
        <ul>
          <li><strong>요약 단계</strong> — 발견을 압축할 때 claim-source 연결이 유실</li>
          <li>합성 후 리포트에서 "누가 말했는지"를 되찾을 수 없게 됨</li>
        </ul>
        <h4>처방: 구조화 claim-source 매핑</h4>
        <ul>
          <li>서브에이전트 출력 형식: <strong>주장 + 증거 발췌 + 출처 URL/문서명 + 발행일</strong></li>
          <li>합성 에이전트는 이 매핑을 <strong>보존·병합</strong>해야 함 (버리면 안 됨)</li>
        </ul>
        <h4>시점 데이터의 함정</h4>
        <ul>
          <li>2019년 통계와 2024년 통계가 <strong>다르면 모순이 아니라 변화</strong>일 수 있음</li>
          <li>처방: 구조화 출력에 <strong>발행일·수집일 필수</strong> — 시점 차이를 모순으로 오독하는 걸 방지</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"충돌·논쟁·형식 — 정직한 리포트의 규칙",
       html:`__MAP5:prov__<h4>① 신뢰할 만한 소스끼리 충돌하면</h4>
        <ul>
          <li>임의로 하나를 <strong>고르지 말 것</strong> — 둘 다 출처와 함께 <strong>충돌 주석</strong></li>
          <li>분석 단계는 충돌 값을 포함한 채 완료 → <strong>조정은 코디네이터의 몫</strong>으로 넘김</li>
        </ul>
        <h4>② 확립 vs 논쟁 구분</h4>
        <ul>
          <li>리포트를 <strong>확립된 발견 / 논쟁 중인 발견</strong> 명시적 섹션으로 구성</li>
          <li>원 소스의 표현 강도·방법론 맥락을 보존</li>
        </ul>
        <h4>③ 콘텐츠 유형별 렌더링</h4>
        <ul>
          <li>재무 데이터 = <strong>표</strong> / 뉴스 = <strong>산문</strong> / 기술 발견 = <strong>구조화 목록</strong></li>
          <li>전부 한 형식으로 뭉개는 획일 변환은 정보 손실</li>
        </ul>
        <div class="callout">🎯 시험 포인트: "어느 쪽이 맞는지 모델이 정하게 하라"는 보기는 오답. 정답은 언제나 "둘 다, 출처와 시점을 달아서".</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1 — 'Just take the newer number'",
       q:`Two credible figures for the same market size: $4.2B from a 2023 industry-association census, $5.1B from a 2024 analyst projection. Your PM pushes: "Obviously use the 2024 number — it's more current, and shipping two numbers makes us look indecisive." What should the analysis stage actually do?`,
       opts:[
         {t:`Include both values, annotated with source, date, and methodology (census vs projection), and pass the conflict upward for the coordinator to reconcile — recency doesn't adjudicate between different methodologies, and honesty about conflict isn't indecision.`, ok:true},
         {t:`Follow the PM: newer data supersedes older, and a single clean number keeps the report actionable for decision-makers.`},
         {t:`Average the two to $4.65B and footnote both sources, satisfying accuracy and decisiveness at once.`},
         {t:`Fetch a third source as a tie-breaker and report whichever value two of the three agree on.`},
       ],
       hint:`2024가 2023을 '정정'한 게 아니야 — 하나는 실측, 하나는 전망이지. 최신성이 방법론 차이를 심판할 수 있나?`,
       explain:{
         good:`5.6의 충돌 처리: 임의 선택 금지 — 특히 방법론이 다르면(센서스 vs 전망) 최신성은 심판이 아니야. 출처·시점·방법론 주석과 함께 둘 다 보존하고 조정은 상위로 — 권위자의 "깔끔하게" 압박이 이 문제의 함정 서사야.`,
         wrongs:[
           `<b>B — 최신 우선:</b> 절반의 진실 — 같은 조사의 개정판이라면 맞지만, 여긴 방법론이 달라 전망이 실측을 대체하지 않아.`,
           `<b>C — 평균 내기:</b> $4.65B는 어느 소스도 말한 적 없는 발명 수치 — 각주가 있어도 발명은 발명이야.`,
           `<b>D — 다수결:</b> 세 번째 소스가 둘 중 하나를 인용했다면 2:1은 무의미 — 표 세기는 방법론 평가가 아니야.`,
         ]},
       principle:"최신성은 심판이 아니다 — 주석하고 올려라"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2 — The false contradiction",
       q:`Your synthesis agent flags a "contradiction": one finding says remote work adoption is 45%, another says 28%. Investigation reveals the first is from a 2021 survey, the second from 2024 — but the subagents' structured outputs contain no dates, so synthesis couldn't tell. What is the systemic fix?`,
       opts:[
         {t:`Require subagents to include publication or data-collection dates in their structured outputs, so temporal differences are interpreted as change over time rather than contradiction.`, ok:true},
         {t:`Instruct the synthesis agent to search the web for dates whenever it detects conflicting figures.`},
         {t:`Have synthesis discard the older figure whenever a conflict is detected.`},
         {t:`Treat all conflicting statistics as unreliable and exclude them from reports.`}],
       hint:`합성이 오독한 건 능력 부족이 아니라 입력에 뭐가 빠져 있었기 때문이야.`,
       explain:{
         good:`가이드 5.6 명시: 구조화 출력에 발행일·수집일 필수 — 시점 차이가 모순으로 오독되는 것을 구조적으로 방지. 상류 형식을 고치는 게 시스템 처방.`,
         wrongs:[
           `<b>B:</b> 사후 웹 검색은 왕복 비용 + 못 찾을 수도 — 상류에서 원래 갖고 있던 정보를 버린 게 원인.`,
           `<b>C:</b> 날짜를 모르는 상태에서 "older"를 판별할 수도 없고, 시계열 변화 자체가 중요한 발견일 수 있어.`,
           `<b>D:</b> 충돌 = 불신이라는 등식은 정보 손실 — 45%→28%는 강력한 트렌드 발견이야.`,
         ]},
       principle:"시점은 데이터다 — 날짜 필수"},
    ]},

  /* ===== D5 미니테스트 ===== */
  { id:"p5test", type:"test", title:"D5 미니테스트 — 컨텍스트 & 신뢰성 12문항",
    questions:[
    {ts:"5.1", lvl:"기초", q:`Why do progressively summarized conversations lose refund amounts and promised dates?`,
     opts:[
       {t:`Summarization condenses specific numerical values and dates into vague generalities unless they are extracted into a separate persistent structure.`, ok:true},
       {t:`The model's context window truncates numbers first.`},
       {t:`Numerical tokens cost more, so summaries drop them to save budget.`},
       {t:`Dates are personally identifiable information and get filtered automatically.`}],
     explain:{good:`요약은 압축이고, 압축은 구체 수치를 일반 서술로 뭉갬 — 그래서 case facts 블록을 요약 밖에 두는 것.`,
       wrongs:[`<b>B:</b> 절삭은 위치 기준이지 숫자 우선이 아니야.`,`<b>C:</b> 숫자 토큰이 더 비싸서 버려진다는 메커니즘은 존재하지 않아.`,`<b>D:</b> 날짜가 PII로 자동 필터된다는 동작도 발명된 것.`]},
     principle:"압축은 수치의 적"},
    {ts:"5.1", lvl:"실전", q:`Your report generator receives aggregated findings from five subagents as one long input. QA shows conclusions from sections 2-4 (the middle) are routinely missing from final reports, while sections 1 and 5 are well covered. What is the best mitigation?`,
     opts:[
       {t:`Place a summary of key findings at the beginning of the aggregated input and organize detailed results with explicit section headers — mitigating the lost-in-the-middle effect.`, ok:true},
       {t:`Randomize section order on each run so no section is always in the middle.`},
       {t:`Split the report generation into five separate runs, one per section.`},
       {t:`Instruct the generator to "pay equal attention to all sections."`}],
     explain:{good:`중간 누락 = lost in the middle. 핵심 요약 선두 배치 + 명시적 섹션 헤더가 가이드 5.1의 완화책.`,
       wrongs:[`<b>B:</b> 피해자를 돌아가며 뽑을 뿐 — 매번 누군가는 중간이야.`,`<b>C:</b> 섹션 간 종합이 리포트의 목적인데 5분할하면 종합이 사라져.`,`<b>D:</b> 주의력 편향은 지시로 안 고쳐져.`]},
     principle:"위치 배치 — 처음과 끝을 써라"},
    {ts:"5.2", lvl:"기초", q:`Which situation is a legitimate escalation trigger per best practice?`,
     opts:[
       {t:`The customer's request falls into a policy gap — the policy is silent on this specific case.`, ok:true},
       {t:`Sentiment analysis detects the customer is very frustrated.`},
       {t:`The agent's self-reported confidence drops below 0.6.`},
       {t:`The conversation exceeds ten turns.`}],
     explain:{good:`정당 트리거 3종: 명시적 인간 요구 / 정책 예외·공백 / 진전 불가. 정책 침묵이 그중 하나.`,
       wrongs:[`<b>B:</b> 감정 ≠ 난이도 — 신뢰할 수 없는 대리 지표.`,`<b>C:</b> 자기 보고 신뢰도도 마찬가지.`,`<b>D:</b> 턴 수는 복잡성의 증거가 아니야.`]},
     principle:"트리거 3종 암기"},
    {ts:"5.2", lvl:"실전", q:`A customer's first message: "Your app deleted my playlist. Get me a human. NOW." Playlist restoration is a one-click operation well within the agent's capability. What is the correct behavior?`,
     opts:[
       {t:`Acknowledge the frustration, offer the immediate one-click restoration since the issue is straightforward — and escalate immediately if the customer reiterates their preference for a human.`, ok:true},
       {t:`Escalate immediately without any attempt — the customer explicitly demanded a human.`},
       {t:`Restore the playlist first, then ask whether they still want a human.`},
       {t:`Explain that human agents have long wait times and the bot can help faster.`}],
     explain:{good:`가이드 5.2의 미묘한 균형: 이슈가 단순하면 불만 인정 + 해결 제안 1회, 재차 요구 시 즉시 에스컬레이션. 무조건 즉시 넘기기가 아니라는 게 이 문항의 함정.`,
       wrongs:[`<b>B:</b> 그럴듯하지만 — 가이드는 "단순한 이슈면 해결을 제안하라"고 명시. 복잡하거나 재요구면 그때 즉시.`,`<b>C:</b> 동의 없이 계정에 조치부터 — 고객 의사보다 행동이 앞섰어.`,`<b>D:</b> 인간 회피 설득은 고객 요구 존중 원칙 위반.`]},
     principle:"단순하면 한 번 제안, 재요구엔 즉시"},
    {ts:"5.3", lvl:"기초", q:`Which of the following is an error-propagation anti-pattern in multi-agent systems?`,
     opts:[
       {t:`Catching a timeout and returning an empty result set marked as successful.`, ok:true},
       {t:`Attempting limited local retries for transient failures before propagating.`},
       {t:`Including partial results alongside the error context.`},
       {t:`Reporting what query was attempted when propagating a failure.`}],
     explain:{good:`실패의 성공 위장은 3대 안티패턴 중 하나 — 복구 기회를 없애고 불완전한 결과를 확정시켜.`,
       wrongs:[`<b>B:</b> 일시 실패의 제한된 로컬 재시도는 권장 패턴이야.`,`<b>C:</b> 부분 결과 동봉도 권장 — 코디네이터의 진행 판단 재료.`,`<b>D:</b> 시도한 쿼리 보고는 구조화 4요소 중 하나.`]},
     principle:"위장·뭉개기·전체중단 = 3대 안티패턴"},
    {ts:"5.3", lvl:"실전", q:`Your coordinator receives {"status": "no_data"} from the market-data subagent in two very different situations: when the data API is down, and when a legitimate query genuinely has no matching records. Recently the coordinator skipped a retry during an outage, shipping a report missing an entire section. What is the fix?`,
     opts:[
       {t:`Change the subagent's reporting to distinguish access failures (with failure type and retry-relevant context) from valid empty results, so the coordinator can retry outages but accept true empties.`, ok:true},
       {t:`Have the coordinator always retry once on "no_data" regardless of cause.`},
       {t:`Treat "no_data" as fatal and halt report generation for investigation.`},
       {t:`Add a disclaimer to all reports that sections may be missing during outages.`}],
     explain:{good:`접근 실패 vs 정상 빈 결과의 구분 — 2.2·5.3 공통 원리. 구분이 생기면 코디네이터가 상황별 올바른 행동(재시도 vs 수용)을 고를 수 있어.`,
       wrongs:[`<b>B:</b> 진짜 빈 결과까지 재시도 — 낭비이고, 장애가 재시도 1회보다 길면 여전히 구멍.`,`<b>C:</b> 정상 빈 결과에도 전체 중단 — 과잉.`,`<b>D:</b> 면책 문구는 구분 불능이라는 원인을 안 고쳐.`]},
     principle:"못 본 것과 없는 것을 가려라"},
    {ts:"5.4", lvl:"기초", q:`What is the telltale sign of context degradation in an extended code-exploration session?`,
     opts:[
       {t:`The model starts referencing "typical patterns" instead of the specific classes and functions it discovered earlier.`, ok:true},
       {t:`Responses become shorter as the session progresses.`},
       {t:`The model asks more clarifying questions than before.`},
       {t:`Tool calls start taking longer to execute.`}],
     explain:{good:`구체 → 일반으로의 후퇴가 열화의 시그니처. 발견했던 AuthGateway 대신 "보통 인증 서비스는..."이 나오기 시작해.`,
       wrongs:[`<b>B:</b> 응답 길이는 열화와 무관 — 짧아도 구체적일 수 있어.`,`<b>C:</b> 명확화 질문 증가는 오히려 건강한 행동일 수 있어.`,`<b>D:</b> 도구 실행 속도는 인프라 문제 — 모델 컨텍스트와 무관.`]},
     principle:"열화 신호: 구체가 일반이 될 때"},
    {ts:"5.4", lvl:"실전", q:`A three-phase codebase analysis (map structure → trace dependencies → propose refactors) keeps failing in phase 3: the proposals ignore constraints discovered in phase 1 because the context filled with phase 2's verbose dependency dumps. Which restructuring is best?`,
     opts:[
       {t:`Summarize each phase's key findings before starting the next, injecting the summaries into the next phase's initial context — and delegate verbose tracing to subagents that return only structured results.`, ok:true},
       {t:`Run /compact once at the end of phase 2 to shrink the dependency dumps.`},
       {t:`Merge all three phases into one continuous run so nothing needs handing over.`},
       {t:`Ask phase 3 to re-read the phase 1 outputs from the conversation history.`}],
     explain:{good:`가이드 5.4의 단계 간 요약 주입 + 서브에이전트 격리 결합. 각 단계가 필요한 핵심만 들고 시작해 잠식이 없어.`,
       wrongs:[`<b>B:</b> 사후 압축은 phase 1 제약도 함께 뭉갤 위험 — 선별 없는 압축.`,`<b>C:</b> 합치면 잠식이 더 빨라져 — 반대 방향.`,`<b>D:</b> 히스토리 속 phase 1은 이미 밀려났거나 뭉개진 상태 — 그게 증상이잖아.`]},
     principle:"단계 사이 요약 주입 + 위임 격리"},
    {ts:"5.5", lvl:"기초", q:`Why can a 97% aggregate accuracy metric be misleading before automating away human review?`,
     opts:[
       {t:`It can mask poor performance on specific document types or fields — some segments may be far below average.`, ok:true},
       {t:`Aggregate metrics are always computed on training data.`},
       {t:`97% is below the industry standard for automation.`},
       {t:`Accuracy metrics cannot be computed for extraction tasks.`}],
     explain:{good:`평균은 세그먼트 저성능을 숨겨 — 자동화 전 유형별·필드별 분해 검증이 필수.`,
       wrongs:[`<b>B:</b> 집계 지표가 훈련 데이터에서만 계산된다는 규칙은 없어.`,`<b>C:</b> "자동화 업계 표준 수치" 같은 건 존재하지 않아.`,`<b>D:</b> 추출 과제도 라벨만 있으면 정확도 계산이 가능해.`]},
     principle:"평균의 함정"},
    {ts:"5.5", lvl:"실전", q:`With only two human reviewers for thousands of daily extractions, which routing design uses their capacity best?`,
     opts:[
       {t:`Route extractions with low calibrated confidence scores, plus documents whose sources are ambiguous or contradictory, to human review first.`, ok:true},
       {t:`Review a fixed random 5% of all extractions daily.`},
       {t:`Review the highest-value invoices only, regardless of confidence.`},
       {t:`Review whatever the reviewers select themselves from a dashboard.`}],
     explain:{good:`가이드 5.5: 한정된 리뷰 자원은 저신뢰 + 모호·모순 소스에 우선 배치. 보정된 신뢰도가 라우팅 축이야.`,
       wrongs:[`<b>B:</b> 무작위는 감시용(층화 표집)이지 부족한 자원의 라우팅 기준이 아니야.`,`<b>C:</b> 금액과 오류 확률은 다른 축 — 고액이라도 고신뢰면 후순위.`,`<b>D:</b> 사람의 임의 선택은 체계가 아니야.`]},
     principle:"불확실한 곳에 사람을"},
    {ts:"5.6", lvl:"기초", q:`During multi-step summarization, what must be preserved to keep final reports trustworthy?`,
     opts:[
       {t:`The claim-source mappings — which statement came from which source, with URLs/document names.`, ok:true},
       {t:`The full text of every source document.`},
       {t:`The order in which sources were fetched.`},
       {t:`The token counts of each intermediate summary.`}],
     explain:{good:`요약 단계에서 끊기기 쉬운 게 claim-source 연결 — 구조화 매핑으로 보존·병합해야 해.`,
       wrongs:[`<b>B:</b> 전문 보존은 요약의 목적과 모순 — 매핑만 있으면 돼.`,`<b>C:</b> 소스를 가져온 순서는 신뢰성과 무관.`,`<b>D:</b> 중간 요약의 토큰 수도 출처 신뢰성과 무관.`]},
     principle:"주장-출처 연결이 생명선"},
    {ts:"5.6", lvl:"실전", q:`Your final research reports render everything as uniform bullet lists — quarterly financials, breaking news quotes, and API benchmark results all look identical, and reviewers say the financials are unreadable. What does best practice prescribe?`,
     opts:[
       {t:`Render content types appropriately in synthesis output — financial data as tables, news as prose, technical findings as structured lists — rather than converting everything to one format.`, ok:true},
       {t:`Convert everything to prose paragraphs, the most readable universal format.`},
       {t:`Let the model choose one format per report based on the dominant content type.`},
       {t:`Attach the raw source files so readers can consult the originals.`}],
     explain:{good:`가이드 5.6: 콘텐츠 유형별 렌더링 — 재무는 표, 뉴스는 산문, 기술은 구조화 목록. 획일 변환은 정보 손실.`,
       wrongs:[`<b>B:</b> 산문 획일화도 같은 실수의 다른 방향 — 재무 수치는 산문에서 더 죽어.`,`<b>C:</b> 리포트 하나에 유형이 섞여 있는 게 문제인데 '지배적 유형 하나'로는 못 풀어.`,`<b>D:</b> 원본 첨부는 렌더링 실패의 면책이 아니야.`]},
     principle:"유형에 맞는 옷을 입혀라"},
    ]},
  ]
};
