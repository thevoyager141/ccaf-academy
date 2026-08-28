/* PART 5 · 컨텍스트 관리 & 신뢰성 (D5, 15%) */
window.CCAF_CONTENT.p5 = {
  id: "p5",
  lessons: [

  /* ===== CH 1 · 5.1 정보 보존 ===== */
  { id:"p5c1", ch:"CH 1", title:"긴 대화에서 핵심 정보 보존 (5.1)",
    steps:[
      {type:"concept", kind:"PART BRIEFING · 파트 설명", h:"PART 05 · 컨텍스트를 지키고 실패를 정직하게 다루는 방법",
       html:`<p class="lead">이 파트의 주제는 <strong>Context Management & Reliability</strong>임.</p>
        <h4>파트 프로필</h4>
        <ul>
          <li>출제 비중 <strong>15% ≈ 9문항</strong> · 정보가 손실되는 지점과 그것을 막는 수단을 짝짓는 형태로 출제됨</li>
          <li>지시문으로 주의를 당부하는 선택지와 구조로 해결하는 선택지가 함께 제시되며, 둘을 구분하지 못하면 정답률이 크게 떨어짐</li>
          <li>챕터 6개 + 미니테스트 · 약 2시간 (세션 S12~S13)</li>
        </ul>
        <h4>다루는 범위</h4>
        <ul>
          <li><strong>정보 보존</strong>: 긴 대화에서 숫자와 날짜를 지키는 방법 (Ch1)</li>
          <li><strong>에스컬레이션</strong>: 사람에게 넘기는 시점의 기준 (Ch2)</li>
          <li><strong>에러 전파</strong>: 멀티에이전트에서 실패를 보고하는 형식 (Ch3)</li>
          <li><strong>대형 코드베이스 탐색</strong>: 장시간 작업의 컨텍스트 관리 (Ch4)</li>
          <li><strong>인간 리뷰와 신뢰도 보정</strong> (Ch5)</li>
          <li><strong>출처 보존과 불확실성 처리</strong> (Ch6)</li>
        </ul>
        <div class="callout">🎯 이 파트의 공통 질문은 <b>"정보가 손실되는 지점이 어디이고 무엇으로 지키는가"</b>임. 지시문 한 줄로 주의를 당부하는 보기가 아니라 구조(별도 블록, 출처 매핑, 층화 표집)로 지키는 보기가 정답임.</div>`},
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"정보가 손실되는 세 가지 경로",
       html:`<p class="lead">긴 대화나 큰 자료에서 정보가 사라지는 경로는 세 가지임. 각각을 <strong>[무엇이 손실되는가 → 왜 손실되는가 → 실물 예시]</strong> 순서로 정리함.</p>
        <div class="callout">📖 용어 카드. <b>컨텍스트 창(context window)</b>: 모델이 한 번에 읽을 수 있는 분량의 한도임. 한도가 차면 일부 내용은 제외되며, 그때 무엇을 남길지 정하는 것이 이 챕터의 주제임. <b>토큰(token)</b>: 그 분량을 세는 단위임. 모델이 글을 잘라 처리하는 조각 하나가 1토큰이고, 한국어는 대략 한 글자가 1토큰 안팎임.</div>
        <h4>경로 ① 요약 과정의 손실</h4>
        <ul>
          <li><strong>무엇이 손실되는가</strong>: 숫자, 날짜, 금액, 고객이 말한 조건처럼 정밀한 값</li>
          <li><strong>왜 손실되는가</strong>: 대화가 길어지면 오래된 부분을 요약해 압축함. 요약은 대략의 내용만 남기고 나머지를 버리는 <strong>손실 압축(lossy compression)</strong>이므로 정밀한 값부터 사라짐</li>
          <li><strong>실물 예시</strong>: "$847.50 환불, 3/15까지" → 요약 두어 번 뒤 → "환불 문의 처리 중"</li>
        </ul>
        <h4>경로 ② lost in the middle: 긴 입력의 중간 부분 누락</h4>
        <ul>
          <li><strong>무엇이 손실되는가</strong>: 긴 입력의 <strong>한가운데</strong> 놓인 정보</li>
          <li><strong>왜 손실되는가</strong>: 모델은 입력의 <strong>처음</strong>(주로 지시문이 놓이는 자리)과 <strong>끝</strong>(가장 최근에 읽은 내용)을 더 정확히 반영하고 가운데를 놓치는 경향이 있음. 이 현상의 이름이 lost in the middle임</li>
          <li><strong>실물 예시</strong>: 90K 토큰 분량의 보고서 묶음 한가운데 있는 수치를 물으면 찾지 못하거나 없는 값을 지어냄</li>
        </ul>
        <h4>경로 ③ 도구 결과가 차지하는 분량</h4>
        <ul>
          <li><strong>무엇이 손실되는가</strong>: 컨텍스트 창의 <strong>남은 분량</strong>임. 정보가 지워지는 것이 아니라 사용 가능한 분량이 소모되는 경우임</li>
          <li><strong>왜 손실되는가</strong>: 도구는 결과를 <strong>전부</strong> 반환함. 주문 조회 도구를 한 번 호출하면 금액과 상태뿐 아니라 창고 코드, 세금 코드, 내부 ID까지 <strong>40개 필드</strong>가 돌아옴. 환불 판단에 실제로 쓰는 필드는 5개이고 나머지 35개도 대화에 그대로 쌓임</li>
          <li><strong>실물 예시</strong>: 조회를 10번 하면 쓰지 않는 필드 350개가 컨텍스트를 차지함. 그만큼 초반 대화가 컨텍스트에서 밀려남</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"손실 유형별 대응책: 블록·트리밍·배치",
       html:`__MAP5:ctx__<p class="lead">손실 경로마다 대응책이 있음. 각각을 <strong>[대응책 → 사람이 설계하는 것 → 시스템이 실행하는 것]</strong> 순서로 정리함.</p>
        <h4>대응책 ① case facts 블록: 경로 ①(요약 손실)에 대응</h4>
        <ul>
          <li><strong>대응책</strong>: 거래 사실(금액, 날짜, 주문번호, 상태)을 <strong>요약 대상에서 제외되는 별도 블록</strong>에 분리해 보관함</li>
          <li><strong>사람이 설계하는 것</strong>: 에이전트 지시문에 규칙 한 줄을 넣음. "금액, 날짜, 주문번호가 나오면 CASE FACTS 블록으로 추출해 유지하고 이 블록은 요약하지 말 것."</li>
          <li><strong>시스템이 실행하는 것</strong>: 매 턴 프롬프트를 조립하는 코드가 이 블록을 원문 그대로 삽입하고, 요약 처리 대상에서 제외함</li>
        </ul>
        <div style="font-family:ui-monospace,Menlo,monospace;font-size:12.5px;line-height:2;background:var(--code-bg);border:1px solid var(--line);border-radius:10px;padding:14px 18px;margin:14px 0;overflow-x:auto"><b>case facts 블록의 실물 예시: 매 턴 프롬프트에 이렇게 들어감</b><br>
[요약된 대화] 고객이 파손 상품 환불 요청, 사진 확인됨, 처리 협의 중…&nbsp;&nbsp;<span style="color:var(--accent)">← 요약은 계속 압축되어도 무방함</span><br>
[CASE FACTS · 요약 금지, 그대로 유지]<br>
주문: #A-1042 | 환불액: $847.50 | 기한: 2026-03-15 | 상태: 승인 대기 | 요구: 원 결제수단으로<br>
<span style="color:var(--accent)">→ 20턴 뒤에도 "$847.50, 3/15"가 글자 그대로 남아 있음</span>
        </div>
        <h4>대응책 ② 트리밍(trimming): 경로 ③(분량 소모)에 대응</h4>
        <ul>
          <li><strong>대응책</strong>: 도구 결과가 컨텍스트에 들어가기 <strong>전에</strong> 판단에 쓰이는 필드만 남기고 제거함</li>
          <li><strong>사람이 설계하는 것</strong>: 필드를 걸러내는 코드를 배치함. <strong>1.5의 PostToolUse 훅(hook)</strong>이 바로 이 자리에 해당함. 훅은 도구가 실행된 뒤 모델이 결과를 보기 전에 실행되는 코드임. 또는 도구 자체가 필요한 필드만 반환하도록 수정함</li>
          <li><strong>시스템이 실행하는 것</strong>: 도구가 결과를 반환할 때마다 훅이 자동으로 실행되어 지정한 필드만 남김</li>
        </ul>
        <div style="font-family:ui-monospace,Menlo,monospace;font-size:12.5px;line-height:2;background:var(--code-bg);border:1px solid var(--line);border-radius:10px;padding:14px 18px;margin:14px 0;overflow-x:auto"><b>트리밍의 실물 예시: 40개 필드를 5개로</b><br>
도구 원본: { id, status, amount, created_at, warehouse_id, tax_code, …40개 필드 }<br>
컨텍스트 투입분: { id: "A-1042", status: "shipped", amount: 847.50, eligible_return: true, deadline: "03-15" }<br>
<span style="color:var(--accent)">→ 환불 판단에 쓰이는 5개만 남김. 나머지 35개는 처음부터 컨텍스트에 넣지 않음</span>
        </div>
        <h4>대응책 ③ 위치 배치: 경로 ②(중간 누락)에 대응</h4>
        <ul>
          <li><strong>대응책</strong>: 핵심 요약을 <strong>맨 앞</strong>에 두고, 중요한 내용을 끝에서 다시 명시하며, 상세 내용은 섹션 헤더로 구분함</li>
          <li><strong>사람이 설계하는 것</strong>: 합성용 입력을 조립할 때 <strong>배치 순서를 직접 정함</strong>. 프롬프트 구성은 "① 핵심 발견 요약(맨 앞) ② 소스별 상세(헤더로 구분) ③ 끝에 질문 재명시"임</li>
          <li><strong>시스템이 실행하는 것</strong>: 정해진 순서대로 입력을 조립해 모델에 전달함</li>
        </ul>
        <h4>대응책 ④ 앞 단계에서 구조화: 뒤 단계의 컨텍스트 분량이 부족할 때</h4>
        <ul>
          <li><strong>용어</strong>: 데이터가 이동하는 방향을 기준으로 <strong>앞 단계를 업스트림(upstream)</strong>, 그 결과를 받아 쓰는 <strong>뒤 단계를 다운스트림(downstream)</strong>이라고 함</li>
        </ul>
        <div style="font-family:ui-monospace,Menlo,monospace;font-size:12.5px;line-height:2;background:var(--code-bg);border:1px solid var(--line);border-radius:10px;padding:14px 18px;margin:14px 0;overflow-x:auto"><b>업스트림에서 다운스트림으로: 데이터가 이동하는 순서 (화살표는 병렬이 아니라 순서를 뜻함)</b><br>
[앞 단계 = 업스트림]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[뒤 단계 = 다운스트림]<br>
검색 에이전트 ──▶ 분석 에이전트 ──▶ 합성 에이전트<br>
(데이터를 만들어 넘기는 쪽)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(넘겨받아 사용하는 쪽)<br>
<br>
문제: 뒤 단계(합성)의 컨텍스트 분량이 작은데 앞 단계가 산문 155K 토큰을 그대로 넘김<br>
<span style="color:var(--accent)">대응책: 뒤 단계에서 줄이지 않고 앞 단계의 출력 형식을 바꿈. 앞 단계 에이전트의 지시문을 "산문 대신 핵심 사실, 인용, 관련도만 구조화해 반환할 것"으로 수정함</span>
        </div>
        <ul>
          <li><strong>사람이 설계하는 것</strong>: 앞 단계 에이전트의 <strong>지시문을 수정함</strong>. 뒤 단계에 요약 장치를 추가하는 것이 아니라 앞 단계의 출력 형식을 바꾸는 것임</li>
          <li><strong>시스템이 실행하는 것</strong>: 앞 단계 에이전트가 그 형식대로 결과를 반환하고, 뒤 단계는 줄어든 입력을 그대로 받음</li>
        </ul>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: Crossed wires",
       q:`A customer has three open issues in one session: a refund on order #A-1042 ($89), a replacement for #A-1077, and a billing dispute over #A-1103 ($312). Twenty turns in, the agent offers "the $312 refund for your order #A-1042" — splicing issue 3's amount onto issue 1's order. A case-facts block exists, but it's one flat list of every number mentioned. What is the right fix?`,
       opts:[
         {t:`Restructure the persistent layer per issue: each open issue carries its own structured record (order ID, amounts, status, agreed actions), so facts can't cross-contaminate between concurrent threads.`, ok:true},
         {t:`Limit sessions to one issue each, asking multi-issue customers to open separate conversations.`},
         {t:`Add a prompt instruction: "always double-check which order each amount belongs to before responding."`},
         {t:`Sort the flat facts list chronologically so related facts naturally cluster together.`},
       ],
       hint:`case facts 블록이 있는데도 값이 섞였다는 점이 단서임. 블록의 존재가 아니라 블록의 구조가 문제임. 가이드 5.1의 다중 이슈 대응책을 확인할 것.`,
       explain:{
         good:`5.1의 두 번째 단계임. 이슈가 여러 건인 세션은 이슈마다 별도의 구조화된 기록을 둠. 평면 목록은 값 자체는 보존하지만 어느 값이 어느 이슈에 속하는지는 보존하지 못하므로, $312가 #A-1042에 연결되는 오류가 발생함.`,
         wrongs:[
           `<b>B(세션 분리 강제):</b> 시스템 결함의 부담을 고객에게 넘기는 방식임. 한 번의 문의로 처리를 끝내는 비율(FCR, first contact resolution)도 낮아짐.`,
           `<b>C(재확인 지시):</b> 지시는 확실한 보장이 되지 못함. 값이 섞인 평면 목록을 다시 읽어도 같은 혼동이 반복됨.`,
           `<b>D(시간순 정렬):</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임. 고객이 여러 이슈를 번갈아 말하면 시간 순서는 값의 소속과 무관해짐.`,
         ]},
       principle:"값의 보존과 소속을 함께 구조로 남김"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2: The 40-field flood",
       q:`Each lookup_order call returns 40+ fields (warehouse codes, internal SKUs, carrier metadata...), but the return-processing agent only needs 5. After a few lookups, the context is dominated by irrelevant fields, and the agent starts missing details from earlier conversation turns. Where should the fix go?`,
       opts:[
         {t:`Trim tool outputs to the return-relevant fields before they enter the conversation context, so irrelevant data never accumulates.`, ok:true},
         {t:`Summarize the whole conversation more aggressively to make room for the tool outputs.`},
         {t:`Instruct the agent to "focus only on relevant fields" when reading tool results.`},
         {t:`Run /compact after every third lookup to shrink the context.`}],
       hint:`불필요한 데이터가 쌓여서 생긴 문제임. 쌓인 뒤에 정리하는 방법과 처음부터 넣지 않는 방법 중 어느 쪽이 근본 대응인지 확인할 것.`,
       explain:{
         good:`가이드 5.1의 내용임. 분량이 큰 도구 결과는 컨텍스트에 쌓이기 전에 필요한 필드만 남기고 제거함. 데이터가 들어오는 지점에서 막는 것이 근본 대응임.`,
         wrongs:[
           `<b>B:</b> 필요한 대화를 압축해서 불필요한 필드가 들어갈 자리를 만드는 방식이므로 방향이 반대임.`,
           `<b>C:</b> 읽을 때 무시하라고 지시해도 토큰은 이미 소모된 상태이므로 남은 분량은 그대로 줄어듦.`,
           `<b>D:</b> 나중에 압축하면 불필요한 데이터와 함께 필요한 정보까지 사라질 수 있음.`,
         ]},
       principle:"컨텍스트에 넣기 전에 트리밍함"},
    ]},

  /* ===== CH 2 · 5.2 에스컬레이션 ===== */
  { id:"p5c2", ch:"CH 2", title:"에스컬레이션과 모호성 해결 (5.2)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"사람에게 넘길 때와 직접 처리할 때",
       html:`<div class="callout">📖 용어 카드. <b>에스컬레이션(escalation)</b>: 에이전트가 처리하던 건을 <b>사람 상담원에게 넘기는 것</b>임. 실체는 escalate_to_human 같은 <b>도구 호출 한 번</b>임. 반대 선택지는 에이전트가 계속 처리해 해결하는 것임. 이 챕터는 넘기는 시점과 직접 처리하는 시점의 기준을 다룸.</div>
        <h4>정당한 에스컬레이션 트리거 3종 (암기)</h4>
        <ul>
          <li>① 고객이 <strong>사람을 직접 요구함</strong> ("상담원 연결해 주세요")</li>
          <li>② <strong>정책 공백</strong>: 정책 문서에 이 요청에 해당하는 <strong>조항이 없음</strong>. 케이스가 복잡하다는 것과는 다른 조건임</li>
          <li>③ <strong>진전 불가</strong>: 여러 번 시도해도 해결에 진전이 없음</li>
        </ul>
        <h4>신뢰할 수 없는 대리 지표 2종 (오답 선택지에 자주 등장함)</h4>
        <ul>
          <li><strong>감정 기반</strong>: 화난 고객이 곧 복잡한 케이스인 것은 아님. 감성 분석 점수를 기준으로 넘기는 설계는 오답임</li>
          <li><strong>자기 보고 신뢰도(self-reported confidence)</strong>: 모델은 어려운 케이스에서 실제보다 높은 확신을 보고하는 경향이 있으므로 그 점수를 기준으로 쓸 수 없음</li>
        </ul>
        <h4>판단이 갈리는 지점 (자주 출제됨)</h4>
        <ul>
          <li>고객이 사람을 명시적으로 요구하면 <strong>조사나 해결 시도 없이 즉시</strong> 넘김. 쉬운 작업이어도 동일함</li>
          <li>다만 감정 표현만 있고 요구 자체는 단순하면 불만을 인정하고 해결을 <strong>한 번</strong> 제안함. 고객이 다시 사람을 요구하면 즉시 넘김</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"판단 케이스 4종 세트",
       html:`__MAP5:esc__<p class="lead">케이스마다 <strong>[증상 → 판단 → 지시문에 넣는 문장]</strong> 순서로 정리함. 네 가지 모두 사람이 시스템 프롬프트에 적어 넣는 규칙 문장이고, 그 규칙에 따라 실행하는 쪽은 에이전트임.</p>
        <h4>케이스 ① 55% 해결률, 거꾸로 된 에스컬레이션 (공식 가이드 샘플 3번)</h4>
        <ul>
          <li><strong>증상</strong>: 단순한 케이스(사진이 첨부된 파손 교환)는 사람에게 넘기고, 정책에 조항이 없는 케이스는 직접 처리하며 내용을 추측함</li>
          <li><strong>판단</strong>: 기준이 없어서 모델이 임의로 결정하는 상태임. 명시적 기준과 양쪽 예시(few-shot)를 함께 제공함</li>
          <li><strong>지시문에 넣는 것</strong>: 아래 예시와 같이 넘길 조건 목록, 직접 해결할 목록, 예시 한 쌍을 적음</li>
        </ul>
        <div style="font-family:ui-monospace,Menlo,monospace;font-size:12.5px;line-height:2;background:var(--code-bg);border:1px solid var(--line);border-radius:10px;padding:14px 18px;margin:14px 0;overflow-x:auto"><b>시스템 프롬프트에 적히는 에스컬레이션 기준의 실물 예시</b><br>
즉시 escalate_to_human 호출: ① 고객이 사람을 요구할 때 (해결 시도 없이) ② 정책 문서에 없는 요청일 때 ③ 2회 시도에도 진전 없을 때<br>
직접 해결: 사진 있는 파손 교환, 주소 변경, 배송 조회<br>
예시) 고객: "경쟁사가 더 싼데 가격을 맞춰 주세요" → 정책에 가격 매칭 조항 없음 → escalate. <span style="color:var(--accent)">이유: 정책을 임의로 만들지 않음.</span><br>
예시) 고객: "화가 나서 못 참겠습니다. 주소나 바꿔 주세요" → 불만 인정 + 주소 변경 처리. <span style="color:var(--accent)">이유: 감정은 트리거가 아니고 요청은 처리 범위 안에 있음.</span>
        </div>
        <h4>케이스 ② 정책에 조항이 없는 요청</h4>
        <ul>
          <li><strong>증상</strong>: 자사 정책에는 자사 사이트 가격 인하 조항만 있는데 고객이 경쟁사 가격 매칭을 요구함</li>
          <li><strong>판단</strong>: 문서에 없는 요청은 에이전트가 결정하면 안 됨. 거절과 승인 모두 정책을 새로 만드는 행위이므로 사람에게 넘김</li>
          <li><strong>지시문에 넣는 것</strong>: "정책 문서에 근거 조항이 없는 요청은 직접 판단하지 말고 escalate_to_human을 호출할 것."</li>
        </ul>
        <h4>케이스 ③ 고객 매칭이 여러 명</h4>
        <ul>
          <li><strong>증상</strong>: 같은 이름의 고객 3명이 조회됨. 에이전트가 가장 최근 가입자를 임의로 선택함</li>
          <li><strong>판단</strong>: 추측에 의한 선택(휴리스틱, heuristic)은 금지임. 다른 사람의 계정을 변경하는 사고로 이어짐</li>
          <li><strong>지시문에 넣는 것</strong>: "조회 결과가 여러 명이면 임의로 고르지 말고 이메일이나 주문번호 같은 추가 식별자를 고객에게 요청할 것."</li>
        </ul>
        <h4>케이스 ④ 화났지만 단순한 요청</h4>
        <ul>
          <li><strong>증상</strong>: 표현은 격하지만 요구 내용은 주소 변경임</li>
          <li><strong>판단</strong>: 감정은 트리거가 아님. 불만을 인정하고 해결을 제안하되, 고객이 다시 사람을 요구하면 즉시 넘김</li>
          <li><strong>지시문에 넣는 것</strong>: "감정 표현 자체는 에스컬레이션 사유가 아니다. 불만을 인정하고 해결을 한 번 제안하되, 고객이 거듭 사람을 요구하면 즉시 넘길 것."</li>
        </ul>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: Auditing the trigger config",
       q:`Your escalation config uses three automated triggers: sentiment_score < -0.5, self_confidence < 0.6, and turn_count > 8. Production data: furious customers with one-click issues get escalated (annoying the human team); calm customers requesting things the policy never mentions get confidently auto-"resolved" with invented terms; and thorough customers who simply ask many questions hit the turn limit. What is the correct redesign?`,
       opts:[
         {t:`Replace the proxy triggers with the legitimate ones — explicit customer request for a human, policy exceptions/gaps, and inability to make progress — expressed as prompt criteria with few-shot examples, since none of the current three signals measures case complexity.`, ok:true},
         {t:`Keep the framework but tune the thresholds — sentiment < -0.7, confidence < 0.4, turns > 12 — based on a month of production data.`},
         {t:`Add a fourth trigger for policy-gap detection on top of the existing three, giving the system defense in depth.`},
         {t:`Combine the three signals into one weighted composite escalation score instead of independent thresholds.`},
       ],
       hint:`세 가지 증상이 세 트리거의 결함과 하나씩 대응함. 감정은 난이도가 아니고, 자기 보고 신뢰도는 보정되지 않았으며, 턴 수는 막힘의 근거가 아님. 임계값의 문제인지 신호 자체의 문제인지 판단할 것.`,
       explain:{
         good:`5.2의 정당한 트리거 3종(명시적 요구, 정책 공백, 진전 불가)과 신뢰할 수 없는 대리 지표의 차이를 설정 점검 형태로 묻는 문제임. 세 신호 모두 케이스 복잡도를 대신하지 못하므로, 임계값 조정이나 가중 합성은 잘못된 신호를 더 정교하게 쓰는 것에 그침.`,
         wrongs:[
           `<b>B(임계값 조정):</b> 데이터에 근거한 조치처럼 보이지만, 신호 자체가 잘못되어 있으면 어떤 임계값도 맞지 않음.`,
           `<b>C(네 번째 트리거 추가):</b> 방향은 맞지만 잘못된 신호 세 개를 그대로 두므로 불필요한 에스컬레이션과 정책 임의 생성이 계속됨.`,
           `<b>D(가중 합성):</b> 잘못된 신호 세 개를 합치면 잘못된 신호 하나가 될 뿐임.`,
         ]},
       principle:"임계값보다 신호 자체를 먼저 점검함"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2: Three Kims and a silent policy",
       q:`Two production incidents this week: (a) get_customer returned three customers named "J. Kim" and the agent picked the most recently active one — wrong; (b) a customer requested price-matching against a competitor, your policy only covers own-site price drops, and the agent invented a 10% goodwill discount. What is the correct pair of behaviors?`,
       opts:[
         {t:`(a) Ask the customer for an additional identifier (email or order number) instead of selecting heuristically; (b) escalate to a human, because the policy is silent on competitor matching.`, ok:true},
         {t:`(a) Pick the customer whose recent orders best match the conversation topic; (b) offer the smallest reasonable discount to preserve goodwill.`},
         {t:`(a) Escalate to a human whenever multiple matches occur; (b) refuse the request, since the policy doesn't authorize it.`},
         {t:`(a) Ask for an additional identifier; (b) apply the own-site price-drop policy as the closest analogous rule.`}],
       hint:`(a) 이 모호성은 고객이 직접 해소할 수 있는 종류임. 누구에게 물어야 하는지 확인할 것. (b) 정책에 조항이 없을 때 에이전트가 하면 안 되는 행동을 확인할 것.`,
       explain:{
         good:`(a) 조회 결과가 여러 건이면 추가 식별자를 요청함. 추측에 의한 선택은 금지임. (b) 정책 공백은 에스컬레이션 대상임. 에이전트가 정책을 새로 만들거나 유사 조항을 유추해 적용하면 안 됨. 가이드 5.2의 두 케이스와 동일함.`,
         wrongs:[
           `<b>B:</b> (a) 대화 주제로 고르는 것도 추측에 의한 선택이므로 같은 오류임. (b) 할인을 임의로 만든 것이 사고의 원인임.`,
           `<b>C:</b> (a) 고객에게 물으면 해결되는 건을 사람에게 넘기는 과잉 에스컬레이션임. (b) 거절도 정책을 새로 만드는 것임. 정책은 허용도 금지도 명시하지 않았음.`,
           `<b>D:</b> (a)는 맞지만 (b)에서 유사 규칙을 유추해 적용하는 것은 정책 공백을 임의로 메우는 행위임.`,
         ]},
       principle:"모호성은 고객에게 확인하고 정책 공백은 사람에게 넘김"},
    ]},

  /* ===== CH 3 · 5.3 에러 전파 ===== */
  { id:"p5c3", ch:"CH 3", title:"멀티에이전트 에러 전파 (5.3)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"실패를 보고하는 형식",
       html:`<h4>구조화 에러 컨텍스트 4요소 (암기)</h4>
        <ul>
          <li>① <strong>실패 유형</strong>: 타임아웃인지, 권한 문제인지, 결과가 없는 것인지</li>
          <li>② <strong>시도한 내용</strong>: 어떤 쿼리를 실행했는지</li>
          <li>③ <strong>부분 결과</strong>: 일부라도 확보한 결과가 있으면 함께 반환함</li>
          <li>④ <strong>대안</strong>: 다른 접근 방법을 제시함</li>
        </ul>
        <div style="font-family:ui-monospace,Menlo,monospace;font-size:12.5px;line-height:2;background:var(--code-bg);border:1px solid var(--line);border-radius:10px;padding:14px 18px;margin:14px 0;overflow-x:auto"><b>구조화 에러 응답의 실물 예시: 서브에이전트(subagent)가 코디네이터에게 반환하는 값</b><br>
{ "status": "error",<br>
&nbsp;&nbsp;"failure_type": "timeout",&nbsp;&nbsp;<span style="color:var(--accent)">← ① 실패 유형</span><br>
&nbsp;&nbsp;"attempted": "search('EV 배터리 M&amp;A 2025')",&nbsp;&nbsp;<span style="color:var(--accent)">← ② 시도한 것</span><br>
&nbsp;&nbsp;"partial_results": [ …2건… ],&nbsp;&nbsp;<span style="color:var(--accent)">← ③ 부분 결과</span><br>
&nbsp;&nbsp;"alternatives": "산업 리포트 DB로 재시도 가능" }&nbsp;&nbsp;<span style="color:var(--accent)">← ④ 대안</span><br>
<br>
비교. 안티패턴의 실물 예시: { "results": [] }&nbsp;&nbsp;← 타임아웃을 빈 결과로 반환한 경우이며, 코디네이터는 자료가 없다고 잘못 판단함
        </div>
        <h4>안티패턴 3종 (오답 선택지에 자주 등장함)</h4>
        <ul>
          <li><strong>뭉뚱그린 상태 반환</strong>: 재시도를 모두 소진한 뒤라도 "search unavailable"만 반환하는 것</li>
          <li><strong>실패를 성공으로 반환</strong>: 타임아웃을 빈 결과로 반환하는 것</li>
          <li><strong>전체 중단</strong>: 실패 하나로 워크플로 전체를 종료하는 것</li>
        </ul>
        <h4>2.2(도구 에러 처리)와의 관계</h4>
        <ul>
          <li>2.2는 <strong>도구에서 에이전트로</strong> 전달되는 에러의 형식이고, 5.3은 <strong>서브에이전트에서 코디네이터로</strong> 올리는 전파 방식임. 두 경우 모두 실패를 구조화해 전달한다는 원리는 같음</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"코디네이터가 올바른 복구를 선택할 수 있는 조건",
       html:`__MAP5:err__<h4>① 왜 4요소인가</h4>
        <ul>
          <li>코디네이터의 선택지: 수정 쿼리로 재시도 / 대안 접근 / 부분 결과로 진행</li>
          <li>4요소가 없으면 이 선택 자체가 불가능함. "search unavailable"만으로는 어떤 판단도 할 수 없음</li>
        </ul>
        <h4>② 로컬 복구 먼저: 자체 복구의 실체</h4>
        <ul>
          <li>실체는 <strong>사람이 서브에이전트 지시문에 적어 둔 재시도 규칙</strong>임. 또는 도구를 감싼 코드의 자동 재시도임</li>
          <li><strong>사람이 설계하는 것</strong>: 지시문에 규칙을 적음. "검색이 타임아웃이면 최대 2회 재시도할 것. 그래도 실패하면 위 구조화 에러 형식으로 보고하고 나머지 작업은 계속 진행할 것."</li>
          <li><strong>시스템이 실행하는 것</strong>: 서브에이전트가 그 규칙대로 재시도하고, 실패가 남으면 정해진 형식으로 코디네이터에게 보고함</li>
          <li>효과: 일시적 실패는 대부분 하위 단계에서 해소되고, <strong>해결되지 않은 실패만</strong> 부분 결과 및 시도 내역과 함께 코디네이터로 전달됨</li>
        </ul>
        <h4>③ 커버리지 주석: 사람이 규칙을 정하고 에이전트가 작성함</h4>
        <ul>
          <li>커버리지 주석(coverage note)은 최종 <strong>산출물</strong>(리서치 시나리오에서는 리포트, 다른 시나리오에서는 요약이나 분석 결과)에 어느 부분이 충분한 근거를 갖췄고 어느 부분이 비어 있는지 표시하는 문장임</li>
          <li><strong>사람이 설계하는 것</strong>: 합성 에이전트의 지시문에 규칙 한 줄을 넣음. "실패한 소스가 있으면 산출물 끝에 어느 발견이 충분히 뒷받침되고 어느 주제에 공백이 있는지 명시할 것."</li>
          <li><strong>시스템이 실행하는 것</strong>: 합성 에이전트가 산출물 끝에 그 주석을 붙임</li>
        </ul>
        <div style="font-family:ui-monospace,Menlo,monospace;font-size:12.5px;line-height:2;background:var(--code-bg);border:1px solid var(--line);border-radius:10px;padding:14px 18px;margin:14px 0;overflow-x:auto"><b>커버리지 주석의 실물 예시: 산출물 끝에 이렇게 붙음</b><br>
⚠ 커버리지: 학술 DB 접근 실패(타임아웃 3회). 3장의 학술 근거는 웹 소스만 반영됨.<br>
&nbsp;&nbsp;&nbsp;시장 규모(1장)·경쟁 구도(2장)는 소스 12건으로 탄탄함.<br>
<span style="color:var(--accent)">→ 읽는 사람이 공백의 위치를 알 수 있는 산출물이 정직한 산출물임</span>
        </div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: The green pipeline that lied",
       q:`Overnight research stayed "green," but this morning's competitive-analysis report simply lacks its pricing section. Logs: the pricing subagent hit paywalls on both target sources and returned {"results": [], "status": "ok"} — its author added that behavior "so one flaky source doesn't fail the whole pipeline." The coordinator, seeing success, proceeded to synthesis. What is the correct fix?`,
       opts:[
         {t:`Have the subagent report the failure as structured error context — failure type (access/paywall), what was attempted, any partial results, and alternatives (cached copies, substitute sources) — so the coordinator can choose to retry differently, substitute, or ship with a coverage note.`, ok:true},
         {t:`Keep the suppression but have the coordinator scan synthesized reports for suspiciously empty sections before shipping.`},
         {t:`Make source failures fatal: any failed fetch halts the pipeline until a human investigates the cause.`},
         {t:`Point the pricing subagent at five sources instead of two so at least one usually succeeds, keeping the "ok" behavior as resilience.`},
       ],
       hint:`파이프라인 상태를 정상으로 유지하려던 조치가 무엇을 없앴는지 확인할 것. 코디네이터가 복구 방법을 선택할 기회 자체가 사라졌음.`,
       explain:{
         good:`실패를 성공으로 반환하는 것은 5.3의 3대 안티패턴 중 하나임. 코디네이터의 복구 선택지(대안 소스, 캐시본, 커버리지 주석)가 모두 차단됨. 구조화 4요소가 전달되면 실패에 견디는 파이프라인이라는 원래 목표도 달성됨. 그 성질은 실패를 감추는 데서가 아니라 정보를 갖춘 복구에서 나옴.`,
         wrongs:[
           `<b>B(빈 섹션 검사):</b> 뒤 단계에서 증상만 역추적하는 부분적 보완임. 비어 있는 이유가 접근 실패인지 실제로 데이터가 없는 것인지 모르면 올바른 대응을 고를 수 없음.`,
           `<b>C(전체 중단):</b> 실패 하나로 워크플로를 종료하는 것은 반대편 안티패턴임. 작성자가 피하려던 문제와 같음.`,
           `<b>D(소스를 다섯 개로 확대):</b> 실패 확률만 낮추는 조치임. 모두 실패하는 날에는 같은 문제가 반복되고 그전까지는 결함이 드러나지 않음.`,
         ]},
       principle:"상태 표시가 실제 결과와 일치해야 함"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2: The honest report",
       q:`In a 5-source research run, two sources failed (one paywalled, one timed out) despite local retries. The synthesis must still ship. Which output design is correct?`,
       opts:[
         {t:`Complete the synthesis with available findings, annotating coverage: which conclusions are well-supported and which topic areas have gaps due to the unavailable sources.`, ok:true},
         {t:`Delay the report until all five sources succeed, since partial synthesis misleads readers.`},
         {t:`Synthesize from the three available sources without mentioning the failures, to keep the report clean.`},
         {t:`Have the synthesis agent fill the gaps from its general knowledge so coverage looks complete.`}],
       hint:`부분 결과로 진행하는 것 자체는 맞음. 판단 기준은 읽는 사람이 공백의 위치를 알 수 있는지임.`,
       explain:{
         good:`가이드 5.3의 커버리지 주석임. 근거가 충분한 발견과 소스가 비어 있는 영역을 구분해 표시함. 부분 결과로 진행하되 공백을 함께 밝힘.`,
         wrongs:[
           `<b>B:</b> 페이월은 재시도로 해결되지 않으므로 발행이 무기한 지연됨.`,
           `<b>C:</b> 공백을 숨긴 리포트는 완전한 것처럼 보이므로 읽는 사람이 잘못된 확신을 갖게 됨.`,
           `<b>D:</b> 일반 지식으로 채우는 것은 출처 없는 내용을 리서치 결과로 제시하는 것임.`,
         ]},
       principle:"부분 결과로 진행하고 커버리지 주석을 붙임"},
    ]},

  /* ===== CH 4 · 5.4 대형 코드베이스 탐색 ===== */
  { id:"p5c4", ch:"CH 4", title:"대형 코드베이스 탐색의 컨텍스트 관리 (5.4)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"장시간 작업에서 발생하는 컨텍스트 열화",
       html:`<h4>열화의 증상 (확인 방법)</h4>
        <ul>
          <li>앞서 확인한 <strong>구체적 클래스와 함수</strong> 대신 <strong>일반적인 패턴</strong>을 말하기 시작함</li>
          <li>같은 질문에 세션 초반과 다른 답을 내놓음</li>
        </ul>
        <h4>대응 도구 4종</h4>
        <ul>
          <li><strong>스크래치패드(scratchpad) 파일</strong>: 핵심 발견을 파일로 기록하고 이후 질문에서 참조함</li>
          <li><strong>서브에이전트 위임</strong>: 분량이 큰 조사는 위임하고 본 에이전트는 상위 수준의 조율만 담당함</li>
          <li><strong>단계 간 요약 주입</strong>: 한 단계의 핵심을 요약해 다음 단계의 초기 컨텍스트로 넣음</li>
          <li><code>/compact</code>: 탐색 결과가 쌓여 컨텍스트가 차면 압축함</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"장시간 탐색 작업의 설계",
       html:`__MAP5:explore__<h4>① 질문 단위 위임: 사람이 입력하는 프롬프트의 실물 예시</h4>
        <ul>
          <li>Claude Code 대화창에 다음과 같이 입력함. <strong>"서브에이전트에게 tests/ 아래 모든 테스트 파일 목록을 정리하도록 지시하고, 결과는 요약만 보여줄 것."</strong> 실행 실체는 Task 도구 호출임</li>
          <li>또는 지시문에 상시 규칙으로 넣음. "분량이 큰 탐색 작업은 서브에이전트에 위임하고 요약만 받을 것."</li>
          <li>효과: 분량이 큰 탐색 출력은 서브에이전트의 컨텍스트에서 소모되고, 본 대화에는 요약만 들어오므로 상위 수준의 이해가 유지됨</li>
        </ul>
        <h4>② 스크래치패드: 설계는 사람, 기록은 에이전트</h4>
        <ul>
          <li><strong>사람이 설계하는 것</strong>: 지시문에 규칙 한 줄을 넣음. "핵심 발견은 scratchpad.md 파일에 기록하며 진행하고, 이전 발견이 불분명해지면 그 파일을 다시 읽을 것."</li>
          <li><strong>시스템이 실행하는 것</strong>: 에이전트가 <strong>Write 도구와 Read 도구로</strong> 직접 기록하고 참조함. 사람이 손으로 받아 적는 방식이 아님</li>
        </ul>
        <h4>③ 크래시 복구: 매니페스트의 위치와 동작 순서</h4>
        <div style="font-family:ui-monospace,Menlo,monospace;font-size:12.5px;line-height:2;background:var(--code-bg);border:1px solid var(--line);border-radius:10px;padding:14px 18px;margin:14px 0;overflow-x:auto"><b>구조도: 대화(컨텍스트)에 있는 것과 파일로 저장된 것 (화살표는 병렬이 아니라 순서를 뜻함)</b><br>
[대화에 있는 것: 크래시하면 사라짐]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[파일로 저장된 것: 크래시해도 남음]<br>
코디네이터 ──Task──▶ 서브에이전트 A&nbsp;&nbsp;──Write──▶&nbsp;&nbsp;agent-state/A.json (매니페스트)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└──Write──▶&nbsp;&nbsp;findings/A.md + scratchpad.md<br>
<br>
💥 크래시 → 왼쪽은 사라지고, 오른쪽 파일은 그대로<br>
재시작한 코디네이터 ──Read──▶ 매니페스트 확인 → <span style="color:var(--accent)">"학술 DB부터 이어서"를 새 서브에이전트 프롬프트에 주입</span>
        </div>
        <div style="font-family:ui-monospace,Menlo,monospace;font-size:12.5px;line-height:2;background:var(--code-bg);border:1px solid var(--line);border-radius:10px;padding:14px 18px;margin:14px 0;overflow-x:auto"><b>파일 내용의 실물 예시</b><br>
# scratchpad.md&nbsp;&nbsp;<span style="color:var(--accent)">← 발견 내용을 적어두는 파일</span><br>
- 환불 흐름: RefundService.process() → PaymentGateway.reverse() (payment.ts 88행)<br>
- 테스트 위치: tests/refund/ 아래 12개<br>
<br>
# agent-state/A.json&nbsp;&nbsp;<span style="color:var(--accent)">← 매니페스트 (진행 상태의 색인)</span><br>
{ "done": ["웹 소스 40건 수집"], "pending": ["학술 DB 검색"], "findings_file": "findings/A.md" }
        </div>
        <ul>
          <li><strong>사람이 설계하는 것</strong>: 각 에이전트 지시문에 "진행 상태를 agent-state/이름.json에 계속 갱신할 것"이라는 규칙을 넣고, 재개 시 코디네이터가 그 파일들을 먼저 읽도록 절차를 정함</li>
          <li><strong>시스템이 실행하는 것</strong>: 각 에이전트가 상태 파일을 갱신하고, 재시작한 코디네이터가 그 파일을 읽어 남은 작업을 새 프롬프트에 넣음</li>
          <li>1.7(세션 복구)과 같은 원리임. <strong>대화에 남은 기억 대신 파일에 남은 기록을 사용함</strong></li>
        </ul>
        <div class="callout">📖 용어 카드. <b>스크래치패드</b>: 발견한 내용을 적어 두는 별도 파일임. 대화 밖에 있으므로 컨텍스트가 차도 사라지지 않음. <b>매니페스트(manifest)</b>: 진행 상태를 기록하는 파일임. 어떤 작업이 끝났고 무엇이 남았는지, 결과 파일이 어디 있는지를 담음.</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: Three symptoms, three tools",
       q:`One week with your codebase-analysis agent produced three incidents: (a) by hour three it answers "repositories typically handle caching like..." instead of citing the CacheManager class it analyzed at hour one; (b) every new question triggers Grep/Read floods that bury the conversation in raw output; (c) last night's six-hour run crashed at 2 AM and today restarted from zero. Which countermeasure mapping is correct?`,
       opts:[
         {t:`(a) scratchpad files recording key findings as they're discovered, referenced in later prompts; (b) delegate exploration to subagents that return only summaries; (c) structured state exports to known locations, with a manifest the coordinator loads on resume.`, ok:true},
         {t:`(a) run /compact to refresh the session's memory; (b) scratchpad files to absorb the raw output; (c) split the nightly run into two three-hour halves.`},
         {t:`(a) re-run the full analysis each morning for freshness; (b) a larger context window; (c) wrap the run in an automatic restart loop.`},
         {t:`(a) prompt reminders to "always cite the specific classes you found"; (b) subagent delegation; (c) manifest-based state recovery.`},
       ],
       hint:`(a)는 컨텍스트 열화, (b)는 컨텍스트 잠식, (c)는 상태 소실임. 각각에 대응하는 수단이 따로 있음. 셋 중 둘만 맞는 선택지에 주의할 것.`,
       explain:{
         good:`5.4의 세 가지 대응 수단을 짝짓는 문제임. 열화에는 스크래치패드(대화 밖 기록), 잠식에는 위임 격리(요약만 본 대화로 전달), 크래시에는 매니페스트 기반 복구를 씀. D는 (b)와 (c)가 맞아서 고르기 쉽지만 (a)를 지시문으로 처리함. 컨텍스트에서 밀려난 내용은 지시로 되살아나지 않음.`,
         wrongs:[
           `<b>B(/compact로 열화 대응):</b> 압축은 복원이 아님. 이미 사라진 구체적 발견을 되살리지 못하므로 대응 수단이 잘못 연결됨.`,
           `<b>C(재분석과 재시작 반복):</b> 같은 비용을 다시 지불하는 방식을 자동화한 것이며 아무것도 보존하지 않음.`,
           `<b>D((a)만 지시문으로 처리):</b> 나머지 둘이 맞아서 고르기 쉬운 선택지임. 이미 사라진 내용을 인용하라는 지시는 실행할 수 없는 요구임.`,
         ]},
       principle:"증상마다 대응 수단이 따로 있음"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2: The overnight crash",
       q:`Your overnight multi-agent codebase analysis (a coordinator plus four explorers) crashed at 3 AM, six hours in. Currently a crash means restarting from zero. Which design enables recovery without redoing completed work?`,
       opts:[
         {t:`Have each agent export structured state to a known location as it works; on resume, the coordinator loads a manifest of those exports and injects the state into each agent's prompt.`, ok:true},
         {t:`Wrap the entire run in a retry loop that relaunches the full analysis on failure.`},
         {t:`Keep all intermediate results in the coordinator's conversation history so nothing is lost.`},
         {t:`Split the analysis into independent nightly jobs so a crash only loses one night.`}],
       hint:`크래시로 사라지는 것은 대화 안에 있는 상태임. 상태를 대화 밖에 두고 재개 절차까지 갖춘 설계를 찾을 것.`,
       explain:{
         good:`가이드 5.4의 크래시 복구 설계와 동일함. 상태를 정해진 위치에 저장하고, 재개 시 매니페스트를 읽어 프롬프트에 주입함. 완료된 작업은 파일로 남음.`,
         wrongs:[
           `<b>B:</b> 전체 재실행 반복은 처음부터 다시 하는 절차를 자동화한 것에 그침.`,
           `<b>C:</b> 대화 히스토리(conversation history)는 크래시와 함께 사라지는 대상임.`,
           `<b>D:</b> 일 단위 분할은 손실 범위를 줄일 뿐 복구 방법이 아님.`,
         ]},
       principle:"상태는 파일로 저장하고 매니페스트로 재개함"},
    ]},

  /* ===== CH 5 · 5.5 인간 리뷰·신뢰도 보정 ===== */
  { id:"p5c5", ch:"CH 5", title:"인간 리뷰 워크플로와 신뢰도 보정 (5.5)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"전체 정확도 97%를 그대로 신뢰할 수 없는 이유",
       html:`<p class="lead">이 챕터의 출제 상황은 대량 추출 파이프라인임. <strong>사람 리뷰를 어디에 배치하고 언제 줄여도 되는가</strong>를 다룸.</p>
        <div style="font-family:ui-monospace,Menlo,monospace;font-size:12.5px;line-height:2;background:var(--code-bg);border:1px solid var(--line);border-radius:10px;padding:14px 18px;margin:14px 0;overflow-x:auto"><b>이 챕터의 전체 구조: 검토 대상 분기 설계 (화살표는 병렬이 아니라 처리 순서를 뜻함)</b><br>
문서 1만 건/일 ──▶ 모델이 추출 ──▶ 분기 (라우팅)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─ 신뢰도가 높음 → <span style="color:var(--accent)">자동 통과 (사람이 보지 않음)</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ 신뢰도가 낮음 → <span style="color:var(--accent)">사람 검토로</span><br>
질문 두 가지임. ① 이 분기 기준을 무엇으로 정하는가 ② 자동 통과 구간을 언제 넓혀도 되는가. 5.5는 이 두 가지를 다룸
        </div>
        <div class="callout">📖 용어 카드. <b>층화 무작위 표집(stratified random sampling)</b>: 전체에서 무작위로 뽑는 대신 그룹(층, strata. 예를 들어 문서 유형)별로 나눠 <b>각 그룹에서 일정 수씩 뽑는 방법</b>임. 손글씨 문서가 전체의 10%뿐이면 단순 무작위 표본에는 몇 장만 포함되어 그 유형의 문제가 드러나지 않음. <b>보정(calibration)</b>: 모델이 보고한 "확신 90%"가 실제로 90%인지 <b>정답이 붙은 검증 세트와 대조</b>하는 작업임. 이 작업으로 <b>과신</b>(90%라고 보고하지만 실제 정답률은 74%인 상태)을 찾아냄. <b>자동화 확대</b>: 사람 리뷰 없이 통과시키는 구간을 넓히는 것임.</div>
        <h4>집계 지표에서 자주 틀리는 지점</h4>
        <ul>
          <li>전체 정확도가 97%여도 그 안에 정확도 71%인 문서 유형이 포함되어 있을 수 있음</li>
          <li>자동화를 확대하기 전에 <strong>문서 유형별, 필드별</strong>로 정확도를 나눠 확인해야 함</li>
        </ul>
        <div style="font-family:ui-monospace,Menlo,monospace;font-size:12.5px;line-height:2;background:var(--code-bg);border:1px solid var(--line);border-radius:10px;padding:14px 18px;margin:14px 0;overflow-x:auto"><b>숫자로 보는 실물 예시: 97%에 가려지는 값, 층화 표집으로 드러나는 값, 보정으로 걸러지는 값</b><br>
[집계 지표] 전체 97% = 인쇄 인보이스(전체의 90%) 정확도 99% + 손글씨(10%) 정확도 71%의 평균<br>
[층화 표집] 문서 유형별로 50건씩 뽑아 채점 → 손글씨 71%가 비로소 드러남<br>
[보정] 모델이 "확신 90%"라고 보고한 추출 200건을 정답과 대조 → 실제 정답률이 74%라면 그 자기 보고 점수를 라우팅 기준으로 쓰면 안 됨
        </div>
        <h4>문서 단위 신뢰도와 필드 단위 신뢰도의 차이</h4>
        <ul>
          <li><strong>문서 단위</strong>: 문서 하나에 점수 하나임. 항목 하나만 신뢰도가 낮아도 문서 전체가 사람 검토로 넘어가므로 리뷰 시간이 낭비됨</li>
          <li><strong>필드 단위</strong>: 항목마다 점수가 있음. invoice_id는 99%인데 po_number만 60%라면 <strong>그 항목만</strong> 사람이 확인하므로 같은 인력으로 더 많은 문서를 처리함</li>
          <li>다만 어느 쪽이든 점수는 <strong>보정을 거친 뒤에만</strong> 분기 기준으로 사용함</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"리뷰 인력이 부족할 때의 설계",
       html:`__MAP5:conf__<h4>리뷰 라우팅: 사람이 정하는 부분과 시스템이 실행하는 부분</h4>
        <ul>
          <li>라우팅(routing)은 어떤 추출 결과를 사람 검토로 보낼지 정하는 <strong>분기 규칙</strong>임</li>
          <li><strong>사람이 설계하는 것</strong>: 임계값과 조건을 정해 코드에 넣음. <strong>시스템이 실행하는 것</strong>: 파이프라인이 그 기준대로 자동 분기함. 에이전트가 재량으로 정하는 방식이 아님</li>
          <li>우선 보낼 대상은 두 가지임. ① 모델 신뢰도가 낮은 추출 결과 ② 원본 자체가 모호하거나 모순인 문서. 한정된 리뷰어 시간을 이 두 가지에 집중함</li>
        </ul>
        <h4>자동화 확대 절차: 사람이 수행하는 순서</h4>
        <div style="font-family:ui-monospace,Menlo,monospace;font-size:12.5px;line-height:2;background:var(--code-bg);border:1px solid var(--line);border-radius:10px;padding:14px 18px;margin:14px 0;overflow-x:auto"><b>확대 3단계 (전부 사람의 설계 작업)</b><br>
1) <b>분해 검증</b>: 문서 유형별, 필드별로 정확도를 나눠 확인함 → 어느 구간이 정확하고 어느 구간이 부정확한지 파악함<br>
2) <b>부분 전환</b>: 정확한 구간만 자동 통과로 전환함 (부정확한 구간은 계속 사람 리뷰)<br>
3) <b>상시 감시</b>: 자동 구간도 층화 표집으로 계속 표본을 채점함 → <span style="color:var(--accent)">새 문서 유형이 유입되어도 조기에 발견함</span><br>
감시 없는 자동화는 새 유형이 들어올 때 정확도가 크게 떨어지고 그 사실이 드러나지 않음
        </div>
        <ul>
          <li><strong>사람이 하는 작업 요약</strong>: 정답 데이터(라벨) 작성 → 보정 확인 → 임계값 설정 → 표집 주기 설정. 이 네 가지는 모두 사람이 수행하고, 모델은 점수를 산출하는 역할만 함</li>
        </ul>
        <div class="callout">🎯 출제 포인트. "정확도가 높으니 리뷰를 줄인다" 유형의 정답에는 <strong>세그먼트 분해</strong>나 <strong>층화 표집</strong>이 반드시 포함됨. 전체 지표가 좋으니 그대로 줄인다는 선택지는 항상 오답임.</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: The averaged-away tax ID",
       q:`Your extractor outputs one confidence score per document; documents averaging 0.93+ auto-approve. Finance just found tax_registration_number wrong on 18% of auto-approved invoices — the other nine fields were nearly perfect, so the document average stayed high while the weakest field sailed through unreviewed. What is the correct redesign?`,
       opts:[
         {t:`Have the model output field-level confidence scores, calibrate them per field against a labeled validation set, and route documents whose critical fields fall below their calibrated thresholds — a document average cannot protect an individual field.`, ok:true},
         {t:`Raise the document-level auto-approval bar from 0.93 to 0.97, cutting how much error can hide beneath the average.`},
         {t:`Route every document that contains a tax-ID field to human review, regardless of its confidence scores.`},
         {t:`Remove tax_registration_number from automated extraction and have finance key that field in manually.`},
       ],
       hint:`평균값 안에 정확도가 낮은 필드가 가려지는 구조임. 문서 단위 기준값을 올려도 개별 필드는 드러나지 않음. 전체 정확도 97% 사례의 필드 단위 형태임.`,
       explain:{
         good:`5.5의 필드 단위 신뢰도와 필드별 보정을 묻는 문제임. 문서 평균은 나머지 아홉 필드의 높은 정확도로 한 필드의 오류를 가림. 임계값은 필드 단위로 정하고, 보정을 거친 뒤에 적용함.`,
         wrongs:[
           `<b>B(문서 기준값 상향):</b> 0.97도 평균값이므로 정확도가 낮은 필드는 여전히 가려짐. 자동 통과 처리량만 크게 줄어듦.`,
           `<b>C(해당 필드 전량 리뷰):</b> 정확하게 추출된 82%까지 사람이 확인하게 되어 리뷰 병목이 다시 생기고 자동화의 목적이 사라짐.`,
           `<b>D(해당 필드 수동 입력):</b> 개선할 수 있는 결함을 해결하지 않고 자동화 범위에서 제외하는 조치임.`,
         ]},
       principle:"문서 평균으로는 개별 필드를 보장하지 못함"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2: Guarding the automated lane",
       q:`You automated high-confidence invoice extractions after proper segment validation. Six months later, a new supplier's invoice layout starts failing silently inside the automated lane. Which ongoing safeguard would have caught this?`,
       opts:[
         {t:`Stratified random sampling of high-confidence extractions for continuous error-rate measurement and novel-pattern detection.`, ok:true},
         {t:`Re-running the original validation set quarterly to confirm the model still passes.`},
         {t:`Requiring the model to output a warning when it sees unfamiliar layouts.`},
         {t:`Lowering the automation threshold so more documents route to humans overall.`}],
       hint:`새로운 오류 패턴은 신뢰도가 높은 구간 안에서 발생하며 곧바로 드러나지 않음. 그 구간을 계속 점검하는 수단을 확인할 것.`,
       explain:{
         good:`층화 표집을 사용하는 이유임. 신뢰도가 높은 자동 구간에서도 층별 표본을 계속 뽑아 오류율 변화와 새 오류 패턴(신규 공급사 레이아웃)을 확인함. 가이드 5.5의 내용임.`,
         wrongs:[
           `<b>B:</b> 기존 검증 세트에는 새 공급사 문서가 없으므로 과거 성능만 재확인할 뿐 새 패턴을 확인하지 못함.`,
           `<b>C:</b> 낯선 레이아웃에 경고를 내라는 지시는 모델의 자기 인식에 의존하는 방식임. 모델은 처음 보는 형식을 처음 보는 것으로 판단하지 못하는 경우가 많음.`,
           `<b>D:</b> 전체 임계값을 낮추면 검토 비용만 늘고 새 패턴의 발견 여부는 여전히 우연에 좌우됨.`,
         ]},
       principle:"자동 구간은 층화 표집으로 계속 감시함"},
    ]},

  /* ===== CH 6 · 5.6 출처 보존·불확실성 ===== */
  { id:"p5c6", ch:"CH 6", title:"출처 보존과 불확실성 처리 (5.6)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"주장과 출처의 연결이 끊기는 지점",
       html:`<p class="lead">출처 보존(provenance)은 어떤 주장이 어느 자료에서 나왔는지를 최종 산출물까지 유지하는 것임. 이 연결은 아래 지점에서 끊김.</p>
        <h4>어디에서 끊기는가</h4>
        <ul>
          <li><strong>요약 단계</strong>: 발견 내용을 압축할 때 주장과 출처의 연결(claim-source mapping)이 사라짐</li>
          <li>합성이 끝난 리포트에서는 어느 출처의 내용인지 다시 확인할 수 없게 됨</li>
        </ul>
        <h4>대응책: 구조화된 주장-출처 매핑</h4>
        <ul>
          <li>서브에이전트 출력 형식: <strong>주장, 증거 발췌, 출처 URL 또는 문서명, 발행일</strong></li>
          <li>합성 에이전트는 이 매핑을 <strong>보존하고 병합</strong>해야 함. 매핑을 버리면 안 됨</li>
        </ul>
        <div style="font-family:ui-monospace,Menlo,monospace;font-size:12.5px;line-height:2;background:var(--code-bg);border:1px solid var(--line);border-radius:10px;padding:14px 18px;margin:14px 0;overflow-x:auto"><b>주장-출처 매핑의 실물 예시: 서브에이전트 출력 한 건</b><br>
{ "claim": "EV 배터리 시장 연 40% 성장",<br>
&nbsp;&nbsp;"source": "BloombergNEF 2025 리포트",<br>
&nbsp;&nbsp;"excerpt": "…the market grew 40% year-over-year…",<br>
&nbsp;&nbsp;"published": "2025-11" }<br>
<span style="color:var(--accent)">→ 합성 에이전트의 규칙: 이 매핑을 버리지 말고 리포트의 해당 문장에 [출처] 각주로 병합함. 산문 안에 문장으로만 적으면 다음 요약에서 사라짐</span>
        </div>
        <h4>시점이 다른 데이터에서 자주 틀리는 지점</h4>
        <ul>
          <li>2019년 통계와 2024년 통계가 다르면 모순이 아니라 <strong>시간에 따른 변화</strong>일 수 있음</li>
          <li>대응책: 구조화 출력에 <strong>발행일과 수집일을 반드시 포함함</strong>. 시점 차이를 모순으로 잘못 해석하는 것을 방지함</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"충돌, 논쟁, 형식: 정직한 리포트의 규칙",
       html:`__MAP5:prov__<h4>① 신뢰할 만한 소스끼리 충돌하면</h4>
        <ul>
          <li>임의로 하나를 <strong>고르지 말 것</strong>. 두 값을 모두 출처와 함께 남기고 <strong>충돌 주석</strong>을 붙임</li>
          <li>분석 단계는 충돌하는 값을 포함한 채로 마치고, <strong>조정은 코디네이터가 담당함</strong></li>
        </ul>
        <h4>② 확립 vs 논쟁 구분</h4>
        <ul>
          <li>리포트를 <strong>확립된 발견</strong>과 <strong>논쟁 중인 발견</strong> 두 섹션으로 명시적으로 나눠 구성함</li>
          <li>원 소스의 표현 강도와 방법론 맥락을 그대로 보존함</li>
        </ul>
        <h4>③ 콘텐츠 유형별 렌더링</h4>
        <ul>
          <li>재무 데이터는 <strong>표</strong>, 뉴스는 <strong>산문</strong>, 기술 발견은 <strong>구조화 목록</strong>으로 표현함</li>
          <li>모두 한 형식으로 바꾸는 획일 변환은 정보 손실을 일으킴</li>
        </ul>
        <div class="callout">🎯 출제 포인트. 어느 쪽이 맞는지 모델이 정하게 한다는 선택지는 오답임. 정답은 두 값을 모두 남기고 출처와 시점을 함께 표시하는 것임.</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: 'Just take the newer number'",
       q:`Two credible figures for the same market size: $4.2B from a 2023 industry-association census, $5.1B from a 2024 analyst projection. Your PM pushes: "Obviously use the 2024 number — it's more current, and shipping two numbers makes us look indecisive." What should the analysis stage actually do?`,
       opts:[
         {t:`Include both values, annotated with source, date, and methodology (census vs projection), and pass the conflict upward for the coordinator to reconcile — recency doesn't adjudicate between different methodologies, and honesty about conflict isn't indecision.`, ok:true},
         {t:`Follow the PM: newer data supersedes older, and a single clean number keeps the report actionable for decision-makers.`},
         {t:`Average the two to $4.65B and footnote both sources, satisfying accuracy and decisiveness at once.`},
         {t:`Fetch a third source as a tie-breaker and report whichever value two of the three agree on.`},
       ],
       hint:`2024년 값이 2023년 값을 정정한 것이 아님. 하나는 실측 조사이고 다른 하나는 전망임. 최신성이 방법론 차이를 판정할 수 있는지 확인할 것.`,
       explain:{
         good:`5.6의 충돌 처리임. 임의 선택은 금지이며, 방법론이 다르면(실측 조사와 전망) 최신성은 판정 기준이 되지 못함. 출처, 시점, 방법론 주석과 함께 두 값을 모두 보존하고 조정은 상위 단계로 넘김. 하나로 정리하라는 상급자의 요구가 이 문제에서 오답을 유도하는 조건임.`,
         wrongs:[
           `<b>B(최신 값 우선):</b> 같은 조사의 개정판이라면 맞지만 이 문제에서는 방법론이 다르므로 전망이 실측을 대체하지 못함.`,
           `<b>C(평균 계산):</b> $4.65B는 어느 소스에도 없는 값임. 각주를 붙여도 없는 값을 만들어 낸 것임.`,
           `<b>D(다수결):</b> 세 번째 소스가 앞의 두 값 중 하나를 인용한 것이라면 2대 1이라는 결과는 의미가 없음. 개수를 세는 것은 방법론 평가가 아님.`,
         ]},
       principle:"최신성은 판정 기준이 아니며 충돌은 주석해 상위로 넘김"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2: The false contradiction",
       q:`Your synthesis agent flags a "contradiction": one finding says remote work adoption is 45%, another says 28%. Investigation reveals the first is from a 2021 survey, the second from 2024 — but the subagents' structured outputs contain no dates, so synthesis couldn't tell. What is the systemic fix?`,
       opts:[
         {t:`Require subagents to include publication or data-collection dates in their structured outputs, so temporal differences are interpreted as change over time rather than contradiction.`, ok:true},
         {t:`Instruct the synthesis agent to search the web for dates whenever it detects conflicting figures.`},
         {t:`Have synthesis discard the older figure whenever a conflict is detected.`},
         {t:`Treat all conflicting statistics as unreliable and exclude them from reports.`}],
       hint:`합성 단계가 잘못 판단한 원인은 능력 부족이 아니라 입력에 빠진 항목임. 무엇이 빠졌는지 확인할 것.`,
       explain:{
         good:`가이드 5.6의 내용임. 구조화 출력에 발행일과 수집일을 반드시 포함해 시점 차이가 모순으로 해석되는 것을 방지함. 앞 단계의 출력 형식을 고치는 것이 근본 대응임.`,
         wrongs:[
           `<b>B:</b> 나중에 웹을 검색하면 비용이 추가되고 날짜를 찾지 못할 수도 있음. 원인은 앞 단계가 이미 가지고 있던 정보를 버린 것임.`,
           `<b>C:</b> 날짜를 모르면 어느 값이 더 오래된 것인지 판별할 수 없고, 시간에 따른 변화 자체가 중요한 발견일 수 있음.`,
           `<b>D:</b> 충돌을 곧 신뢰할 수 없음으로 처리하면 정보가 손실됨. 45%에서 28%로의 변화는 그 자체가 중요한 추세 정보임.`,
         ]},
       principle:"시점도 데이터이므로 날짜를 반드시 포함함"},
    ]},

  /* ===== D5 미니테스트 ===== */
  { id:"p5test", type:"test", title:"D5 미니테스트 · 컨텍스트 & 신뢰성 12문항",
    questions:[
    {ts:"5.1", lvl:"기초", q:`Why do progressively summarized conversations lose refund amounts and promised dates?`,
     opts:[
       {t:`Summarization condenses specific numerical values and dates into vague generalities unless they are extracted into a separate persistent structure.`, ok:true},
       {t:`The model's context window truncates numbers first.`},
       {t:`Numerical tokens cost more, so summaries drop them to save budget.`},
       {t:`Dates are personally identifiable information and get filtered automatically.`}],
     explain:{good:`요약은 압축이고 압축 과정에서 구체적 수치가 일반 서술로 바뀜. 그래서 case facts 블록을 요약 대상 밖에 둠.`,
       wrongs:[`<b>B:</b> 절삭은 위치를 기준으로 일어나며 숫자를 먼저 버리는 방식이 아님.`,`<b>C:</b> 숫자 토큰이 더 비싸서 버려진다는 동작은 존재하지 않음.`,`<b>D:</b> 날짜가 개인식별정보(PII)로 자동 필터링된다는 동작도 존재하지 않음.`]},
     principle:"요약은 구체적 수치를 남기지 못함"},
    {ts:"5.1", lvl:"실전", q:`Your report generator receives aggregated findings from five subagents as one long input. QA shows conclusions from sections 2-4 (the middle) are routinely missing from final reports, while sections 1 and 5 are well covered. What is the best mitigation?`,
     opts:[
       {t:`Place a summary of key findings at the beginning of the aggregated input and organize detailed results with explicit section headers — mitigating the lost-in-the-middle effect.`, ok:true},
       {t:`Randomize section order on each run so no section is always in the middle.`},
       {t:`Split the report generation into five separate runs, one per section.`},
       {t:`Instruct the generator to "pay equal attention to all sections."`}],
     explain:{good:`중간 부분의 누락은 lost in the middle 현상임. 핵심 요약을 맨 앞에 배치하고 섹션 헤더를 명시하는 것이 가이드 5.1의 대응책임.`,
       wrongs:[`<b>B:</b> 누락되는 섹션이 매번 바뀔 뿐이며 어떤 섹션은 항상 가운데에 놓임.`,`<b>C:</b> 섹션 간 종합이 리포트의 목적인데 다섯 번으로 나누면 종합 자체가 사라짐.`,`<b>D:</b> 입력 위치에 따른 반영 편차는 지시로 교정되지 않음.`]},
     principle:"핵심은 입력의 처음과 끝에 배치함"},
    {ts:"5.2", lvl:"기초", q:`Which situation is a legitimate escalation trigger per best practice?`,
     opts:[
       {t:`The customer's request falls into a policy gap — the policy is silent on this specific case.`, ok:true},
       {t:`Sentiment analysis detects the customer is very frustrated.`},
       {t:`The agent's self-reported confidence drops below 0.6.`},
       {t:`The conversation exceeds ten turns.`}],
     explain:{good:`정당한 트리거는 세 가지임. 명시적인 사람 요구, 정책 예외 또는 공백, 진전 불가임. 정책 공백은 그중 하나임.`,
       wrongs:[`<b>B:</b> 감정은 난이도를 나타내지 않으므로 신뢰할 수 없는 대리 지표임.`,`<b>C:</b> 자기 보고 신뢰도도 같은 이유로 사용할 수 없음.`,`<b>D:</b> 턴 수는 케이스 복잡도의 근거가 아님.`]},
     principle:"정당한 에스컬레이션 트리거 3종"},
    {ts:"5.2", lvl:"실전", q:`A customer's first message: "Your app deleted my playlist. Get me a human. NOW." Playlist restoration is a one-click operation well within the agent's capability. What is the correct behavior?`,
     opts:[
       {t:`Acknowledge the frustration, offer the immediate one-click restoration since the issue is straightforward — and escalate immediately if the customer reiterates their preference for a human.`, ok:true},
       {t:`Escalate immediately without any attempt — the customer explicitly demanded a human.`},
       {t:`Restore the playlist first, then ask whether they still want a human.`},
       {t:`Explain that human agents have long wait times and the bot can help faster.`}],
     explain:{good:`가이드 5.2에서 판단이 갈리는 지점임. 이슈가 단순하면 불만을 인정하고 해결을 한 번 제안하며, 고객이 다시 요구하면 즉시 넘김. 무조건 즉시 넘기는 것이 아니라는 점에서 오답이 나오기 쉬움.`,
       wrongs:[`<b>B:</b> 가이드는 단순한 이슈이면 해결을 제안하라고 명시함. 복잡하거나 고객이 다시 요구하는 경우에 즉시 넘김.`,`<b>C:</b> 동의 없이 계정에 변경을 먼저 적용하는 방식이며 고객의 의사 확인이 빠졌음.`,`<b>D:</b> 사람 연결을 피하도록 설득하는 것은 고객의 요구를 존중하는 원칙에 어긋남.`]},
     principle:"단순한 요청은 한 번 제안하고 재요구에는 즉시 넘김"},
    {ts:"5.3", lvl:"기초", q:`Which of the following is an error-propagation anti-pattern in multi-agent systems?`,
     opts:[
       {t:`Catching a timeout and returning an empty result set marked as successful.`, ok:true},
       {t:`Attempting limited local retries for transient failures before propagating.`},
       {t:`Including partial results alongside the error context.`},
       {t:`Reporting what query was attempted when propagating a failure.`}],
     explain:{good:`실패를 성공으로 반환하는 것은 3대 안티패턴 중 하나임. 복구 기회를 없애고 불완전한 결과를 그대로 확정함.`,
       wrongs:[`<b>B:</b> 일시적 실패에 대한 제한된 로컬 재시도는 권장 패턴임.`,`<b>C:</b> 부분 결과를 함께 반환하는 것도 권장 사항이며 코디네이터의 판단 근거가 됨.`,`<b>D:</b> 시도한 쿼리를 보고하는 것은 구조화 4요소 중 하나임.`]},
     principle:"성공 위장, 뭉뚱그린 상태, 전체 중단이 3대 안티패턴"},
    {ts:"5.3", lvl:"실전", q:`Your coordinator receives {"status": "no_data"} from the market-data subagent in two very different situations: when the data API is down, and when a legitimate query genuinely has no matching records. Recently the coordinator skipped a retry during an outage, shipping a report missing an entire section. What is the fix?`,
     opts:[
       {t:`Change the subagent's reporting to distinguish access failures (with failure type and retry-relevant context) from valid empty results, so the coordinator can retry outages but accept true empties.`, ok:true},
       {t:`Have the coordinator always retry once on "no_data" regardless of cause.`},
       {t:`Treat "no_data" as fatal and halt report generation for investigation.`},
       {t:`Add a disclaimer to all reports that sections may be missing during outages.`}],
     explain:{good:`접근 실패와 정상적인 빈 결과를 구분하는 원리이며 2.2와 5.3에 공통으로 적용됨. 구분이 되면 코디네이터가 상황에 맞는 행동(재시도 또는 수용)을 고를 수 있음.`,
       wrongs:[`<b>B:</b> 실제로 결과가 없는 경우까지 재시도하므로 낭비이고, 장애가 재시도 1회보다 오래 지속되면 해결되지 않음.`,`<b>C:</b> 정상적인 빈 결과에도 전체를 중단하는 과도한 대응임.`,`<b>D:</b> 면책 문구는 두 경우를 구분하지 못하는 원인을 해결하지 못함.`]},
     principle:"접근 실패와 빈 결과를 구분함"},
    {ts:"5.4", lvl:"기초", q:`What is the telltale sign of context degradation in an extended code-exploration session?`,
     opts:[
       {t:`The model starts referencing "typical patterns" instead of the specific classes and functions it discovered earlier.`, ok:true},
       {t:`Responses become shorter as the session progresses.`},
       {t:`The model asks more clarifying questions than before.`},
       {t:`Tool calls start taking longer to execute.`}],
     explain:{good:`구체적 내용에서 일반적 서술로 바뀌는 것이 열화의 신호임. 앞서 확인한 AuthGateway 대신 일반적인 인증 서비스 설명이 나오기 시작함.`,
       wrongs:[`<b>B:</b> 응답 길이는 열화와 무관하며 짧아도 구체적일 수 있음.`,`<b>C:</b> 확인 질문이 늘어나는 것은 오히려 정상적인 동작일 수 있음.`,`<b>D:</b> 도구 실행 속도는 인프라 문제이며 모델 컨텍스트와 무관함.`]},
     principle:"열화 신호는 구체적 내용이 일반 서술로 바뀌는 것"},
    {ts:"5.4", lvl:"실전", q:`A three-phase codebase analysis (map structure → trace dependencies → propose refactors) keeps failing in phase 3: the proposals ignore constraints discovered in phase 1 because the context filled with phase 2's verbose dependency dumps. Which restructuring is best?`,
     opts:[
       {t:`Summarize each phase's key findings before starting the next, injecting the summaries into the next phase's initial context — and delegate verbose tracing to subagents that return only structured results.`, ok:true},
       {t:`Run /compact once at the end of phase 2 to shrink the dependency dumps.`},
       {t:`Merge all three phases into one continuous run so nothing needs handing over.`},
       {t:`Ask phase 3 to re-read the phase 1 outputs from the conversation history.`}],
     explain:{good:`가이드 5.4의 단계 간 요약 주입과 서브에이전트 격리를 함께 적용함. 각 단계가 필요한 핵심만 가지고 시작하므로 컨텍스트 잠식이 없음.`,
       wrongs:[`<b>B:</b> 나중에 압축하면 phase 1의 제약까지 함께 사라질 수 있음. 선별 없는 압축임.`,`<b>C:</b> 세 단계를 합치면 잠식이 더 빨라지므로 방향이 반대임.`,`<b>D:</b> 히스토리에 있는 phase 1 내용은 이미 밀려났거나 요약된 상태이며, 그것이 이 문제의 증상임.`]},
     principle:"단계 사이 요약 주입과 위임 격리를 함께 적용함"},
    {ts:"5.5", lvl:"기초", q:`Why can a 97% aggregate accuracy metric be misleading before automating away human review?`,
     opts:[
       {t:`It can mask poor performance on specific document types or fields — some segments may be far below average.`, ok:true},
       {t:`Aggregate metrics are always computed on training data.`},
       {t:`97% is below the industry standard for automation.`},
       {t:`Accuracy metrics cannot be computed for extraction tasks.`}],
     explain:{good:`평균값은 특정 구간의 낮은 성능을 가림. 자동화 전에 유형별, 필드별 분해 검증이 필요함.`,
       wrongs:[`<b>B:</b> 집계 지표가 훈련 데이터에서만 계산된다는 규칙은 없음.`,`<b>C:</b> 자동화의 업계 표준 정확도 같은 기준은 존재하지 않음.`,`<b>D:</b> 추출 과제도 정답 라벨이 있으면 정확도를 계산할 수 있음.`]},
     principle:"평균값에 가려지는 구간이 있음"},
    {ts:"5.5", lvl:"실전", q:`With only two human reviewers for thousands of daily extractions, which routing design uses their capacity best?`,
     opts:[
       {t:`Route extractions with low calibrated confidence scores, plus documents whose sources are ambiguous or contradictory, to human review first.`, ok:true},
       {t:`Review a fixed random 5% of all extractions daily.`},
       {t:`Review the highest-value invoices only, regardless of confidence.`},
       {t:`Review whatever the reviewers select themselves from a dashboard.`}],
     explain:{good:`가이드 5.5의 내용임. 한정된 리뷰 인력은 신뢰도가 낮은 추출과 모호하거나 모순된 소스에 우선 배치함. 보정된 신뢰도가 라우팅의 판단 기준임.`,
       wrongs:[`<b>B:</b> 무작위 추출은 감시용 층화 표집의 방식이며 부족한 인력을 배분하는 기준이 아님.`,`<b>C:</b> 금액과 오류 확률은 서로 다른 기준임. 금액이 크더라도 신뢰도가 높으면 후순위임.`,`<b>D:</b> 리뷰어가 직접 고르는 방식은 기준이 없는 배분임.`]},
     principle:"신뢰도가 낮은 항목에 사람을 배치함"},
    {ts:"5.6", lvl:"기초", q:`During multi-step summarization, what must be preserved to keep final reports trustworthy?`,
     opts:[
       {t:`The claim-source mappings — which statement came from which source, with URLs/document names.`, ok:true},
       {t:`The full text of every source document.`},
       {t:`The order in which sources were fetched.`},
       {t:`The token counts of each intermediate summary.`}],
     explain:{good:`요약 단계에서 끊기기 쉬운 것이 주장과 출처의 연결임. 구조화된 매핑으로 보존하고 병합해야 함.`,
       wrongs:[`<b>B:</b> 원문 전체를 보존하는 것은 요약의 목적과 어긋나며 매핑만 있으면 충분함.`,`<b>C:</b> 소스를 수집한 순서는 신뢰성과 무관함.`,`<b>D:</b> 중간 요약의 토큰 수도 출처 신뢰성과 무관함.`]},
     principle:"주장과 출처의 연결을 끝까지 유지함"},
    {ts:"5.6", lvl:"실전", q:`Your final research reports render everything as uniform bullet lists — quarterly financials, breaking news quotes, and API benchmark results all look identical, and reviewers say the financials are unreadable. What does best practice prescribe?`,
     opts:[
       {t:`Render content types appropriately in synthesis output — financial data as tables, news as prose, technical findings as structured lists — rather than converting everything to one format.`, ok:true},
       {t:`Convert everything to prose paragraphs, the most readable universal format.`},
       {t:`Let the model choose one format per report based on the dominant content type.`},
       {t:`Attach the raw source files so readers can consult the originals.`}],
     explain:{good:`가이드 5.6의 콘텐츠 유형별 렌더링임. 재무 데이터는 표, 뉴스는 산문, 기술 내용은 구조화 목록으로 표현함. 획일 변환은 정보 손실을 일으킴.`,
       wrongs:[`<b>B:</b> 산문으로 통일하는 것도 같은 오류의 다른 형태임. 재무 수치는 산문 형태에서 더 읽기 어려움.`,`<b>C:</b> 리포트 하나에 여러 유형이 섞여 있는 것이 문제이므로 지배적 유형 하나를 고르는 방식으로는 해결되지 않음.`,`<b>D:</b> 원본 파일 첨부는 렌더링 문제의 해결책이 아님.`]},
     principle:"콘텐츠 유형에 맞는 형식으로 표현함"},
    ]},
  ]
};
