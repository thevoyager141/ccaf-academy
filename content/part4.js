/* PART 4 · 프롬프트 엔지니어링 & 구조화 출력 (D4, 20%) */
window.CCAF_CONTENT.p4 = {
  id: "p4",
  lessons: [

  /* ===== CH 1 · 4.1 명시적 기준 ===== */
  { id:"p4c1", ch:"CH 1", title:"명시적 기준으로 정밀도 올리기 (4.1)",
    steps:[
      {type:"concept", kind:"PART BRIEFING · 파트 설명", h:"PART 04 · 프롬프트 설계로 출력 품질을 통제하는 방법",
       html:`<p class="lead">이 파트의 주제는 <strong>Prompt Engineering & Structured Output</strong>임.</p>
        <h4>파트 프로필</h4>
        <ul>
          <li>출제 비중 <strong>20% ≈ 12문항</strong> · 여러 프롬프트 설계 방식 중 상황에 맞는 하나를 고르는 형태로 출제됨</li>
          <li>선택지에는 "더 신중히 지시하기", "모델 교체", "재시도 횟수 늘리기"가 자주 섞여 있음. 각 수단이 실제로 무엇을 보장하는지 모르면 정답률이 크게 떨어짐</li>
          <li>챕터 6개 + 미니테스트 · 약 1.5시간 (세션 S10~S11)</li>
        </ul>
        <h4>다루는 범위</h4>
        <ul>
          <li><strong>명시적 기준(explicit criteria)</strong>: 오탐 줄이기 (Ch1)</li>
          <li><strong>few-shot</strong>: 예시로 판단 기준 전달하기 (Ch2)</li>
          <li><strong>tool_use + JSON 스키마(schema)</strong>: 구조화 출력(structured output) 보장 (Ch3)</li>
          <li><strong>검증(validation)·재시도 루프</strong>: 추출 품질 관리 (Ch4)</li>
          <li><strong>배치 처리(batch processing)</strong>: Batches API (Ch5)</li>
          <li><strong>다중 인스턴스·다중 패스 리뷰</strong> (Ch6)</li>
        </ul>
        <div class="callout">🎯 이 파트의 공통 질문: <b>"출력 품질 문제를 어떤 수단으로 고칠 것인가."</b> 판단 기준은 두 가지임. 원인이 기준 부재인가 정보 부재인가, 그리고 그 수단이 보장하는 것이 문법인가 의미인가.</div>`},
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"'신중하게 하라'는 지시는 기준이 아니다",
       html:`<div class="callout">🎬 이 챕터의 출제 상황: 3.6에서 다룬 <b>자동 코드 리뷰 봇</b>임. CI에서 Claude가 PR(코드 변경 승인 요청)을 검사해 지적 코멘트를 다는 상황임. 이 챕터에서 말하는 "에러"는 <b>봇의 지적 자체가 틀리는 것</b>을 뜻함.</div>
        <div class="callout">📖 용어 카드. <b>오탐(false positive, FP)</b>: 문제가 <b>아닌 것</b>을 문제라고 지적하는 것임. <b>미탐(false negative)</b>: 진짜 문제를 놓치는 것임. <b>정밀도(precision)</b>: 봇이 낸 지적 중 진짜 문제였던 것의 비율임. 오탐이 늘수록 낮아짐.</div>
        <div style="font-family:ui-monospace,Menlo,monospace;font-size:12.5px;line-height:2;background:var(--code-bg);border:1px solid var(--line);border-radius:10px;padding:14px 18px;margin:14px 0;overflow-x:auto"><b>봇이 PR에 다는 코멘트의 실물: 정탐과 오탐</b><br>
[버그 · 심각도 high] payment.ts 42행: 환불 금액을 검증 없이 저장, 음수 입력 시 이중 환불 가능&nbsp;&nbsp;<span style="color:var(--accent)">← 정탐 (진짜 문제)</span><br>
[스타일 · 심각도 low] utils.ts 7행: 변수명 tmp가 모호함, dataBuffer 권장&nbsp;&nbsp;← 오탐 (이 팀 컨벤션에선 tmp 허용)
        </div>
        <h4>막연한 지시가 실패하는 이유</h4>
        <ul>
          <li>"be conservative", "확신이 높은 것만 보고할 것" 같은 지시는 모델에게 <strong>판단 경계가 어디인지</strong> 알려주지 않음</li>
          <li>정밀도 개선에 실패하는 전형적인 형태임. 지시의 강도만 올라가고 <strong>분류 기준은 없는 상태</strong>임</li>
        </ul>
        <h4>명시적 기준의 형태</h4>
        <ul>
          <li>❌ "주석이 정확한지 확인할 것"</li>
          <li>✅ "주석의 <strong>주장이 실제 코드 동작과 모순될 때만</strong> 플래그할 것"</li>
          <li>보고할 범주(버그·보안)와 <strong>제외할 범주</strong>(사소한 스타일, 프로젝트 로컬 패턴)를 함께 명시함</li>
        </ul>
        <h4>오탐이 늘면 생기는 결과</h4>
        <ul>
          <li>오탐 코멘트가 PR마다 수십 개 달리면 개발자가 봇 코멘트를 <strong>읽지 않게 됨</strong>. 그 결과 함께 달린 <strong>진짜 버그 지적도 같이 무시됨</strong></li>
          <li>오탐이 많은 범주 하나가 <strong>정확한 범주에 대한 신뢰까지 떨어뜨림</strong>. 이것이 "개발자가 봇 전체를 무시하기 시작한다"는 서술의 의미임</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"오탐을 줄이는 세 가지 방법",
       html:`__MAP4:criteria__<h4>① 범주형 기준 (범주 = 지적의 종류 묶음: 버그/보안/스타일/문서)</h4>
        <ul>
          <li>보고 대상은 버그와 보안 취약점임. 제외 대상은 사소한 스타일과 프로젝트 로컬 패턴임</li>
          <li>"확신도 기반 선별"이 아니라 <strong>범주 기반 규칙</strong>으로 정의함</li>
        </ul>
        <h4>② 오탐이 몰린 범주를 일시 비활성화</h4>
        <ul>
          <li>오탐이 집중된 범주는 <strong>끄고</strong>, 그 범주의 프롬프트를 개선한 뒤 다시 켬</li>
          <li>목적은 나머지 범주에 대한 <strong>개발자 신뢰 회복</strong>임</li>
        </ul>
        <h4>③ 심각도 정의에 실물 예시 붙이기</h4>
        <ul>
          <li>심각도(severity)는 지적 하나하나에 붙이는 등급임. 무엇부터 고칠지 정렬하는 데 씀</li>
          <li>심각도 레벨마다 <strong>구체적 코드 예시</strong>를 붙여야 모델의 분류가 일관됨</li>
          <li>실물: "high = 데이터 손실·보안 (예: 사용자 입력을 그대로 DB 쿼리에 붙임) / low = 이름·포맷 (예: 변수명 스타일)"</li>
        </ul>
        <div class="callout">🎯 시험 포인트: "be more careful" 계열 선택지는 대부분 오답임. 정답은 무엇을 보고하고 무엇을 제외하는지를 명시적으로 정의하는 선택지임.</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: Two edits, two failures",
       q:`Your security reviewer's prompt says "flag risky code." Iteration 1: it floods PRs with findings on test fixtures and TODO comments. Iteration 2: you add "be conservative — only report issues you're confident about," and the noise drops, but so does a real SQL injection it had caught before. The team concludes prompt engineering "just trades noise for misses." What actually went wrong across both iterations?`,
       opts:[
         {t:`Neither iteration defined the decision boundary: replace both vague instructions with categorical criteria — report injection, authz bypass, secrets exposure; skip test fixtures, TODOs, style — with a code example per category.`, ok:true},
         {t:`Iteration 2 was right but overtuned; the fix is finding the sweet spot between "flag risky code" and "be conservative" through A/B testing prompt phrasings.`},
         {t:`The model lacks security depth; route PRs to a security-specialized model and keep the current prompt.`},
         {t:`Exclude test directories and files containing TODO from review scope, then restore the original prompt.`},
       ],
       hint:`두 번의 실패는 방향이 반대지만 원인은 같음. 무엇을 보고하고 무엇을 제외할지에 대한 정의가 양쪽 프롬프트 어디에도 없었음.`,
       explain:{
         good:`4.1의 요지임. 노이즈와 누락은 판단 기준이 없을 때 함께 나타나는 두 증상임. "위험한 것"도 "확신 있는 것"도 범주 정의가 아님. 보고 범주와 제외 범주를 명시하고 범주마다 실물 예시를 붙이면 두 증상이 함께 해소됨. "프롬프트 엔지니어링은 노이즈와 누락을 맞바꾸는 일"이라는 결론 자체가 잘못된 전제임.`,
         wrongs:[
           `<b>B(문구 A/B 테스트):</b> 모호한 지시의 강도만 조절하는 방법임. 어느 지점에서도 판단 기준은 생기지 않음.`,
           `<b>C(모델 교체):</b> injection을 이미 찾아낸 적이 있다는 사실 자체가 모델 능력의 증거임. 능력이 아니라 기준의 문제임.`,
           `<b>D(디렉토리 제외):</b> 일반적으로는 맞지만 이 문제의 조건에서는 틀림. 노이즈 일부는 줄어도 프로덕션 코드 안의 오탐과 기준 부재는 그대로 남음.`,
         ]},
       principle:"노이즈와 누락의 원인은 모두 기준 부재임"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2: Severity chaos",
       q:`Your reviewer labels findings as critical/major/minor, but identical issues get different severities across runs — a SQL injection was "minor" once and "critical" twice. The prompt already defines each level in one sentence ("critical: serious problems..."). How do you achieve consistent classification?`,
       opts:[
         {t:`Define explicit severity criteria with concrete code examples for each level, so the model anchors on demonstrated cases rather than abstract adjectives.`, ok:true},
         {t:`Ask the model to explain its severity choice, which forces more careful classification.`},
         {t:`Remove the minor level so there are fewer boundaries to confuse.`},
         {t:`Average the severity across three runs for each finding.`}],
       hint:`"serious problems" 같은 형용사 정의가 문제임. 심각도 정의에 무엇을 함께 붙여야 하는지 확인할 것.`,
       explain:{
         good:`가이드 4.1. 심각도 분류의 일관성은 레벨마다 구체적 코드 예시를 붙일 때 확보됨. 형용사만으로 정의하면 해석이 실행마다 달라짐.`,
         wrongs:[
           `<b>B:</b> 판단 이유를 설명하게 하면 사후 정당화가 늘어날 뿐 분류 기준은 생기지 않음.`,
           `<b>C:</b> 레벨을 줄여도 남은 레벨 사이의 구분이 흔들리는 것은 동일함.`,
           `<b>D:</b> 세 번 실행해 평균을 내는 방법임. 비용은 3배가 되고 비일관성 자체는 그대로 남는 증상 처리임.`,
         ]},
       principle:"추상적 형용사 대신 실물 예시를 붙임"},
    ]},

  /* ===== CH 2 · 4.2 few-shot ===== */
  { id:"p4c2", ch:"CH 2", title:"few-shot 프롬프팅 (4.2)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"예시가 지시보다 효과가 큰 경우",
       html:`<h4>few-shot이 1순위 수단이 되는 조건</h4>
        <ul>
          <li>지시를 상세히 써도 <strong>형식과 판단이 일정하지 않을 때</strong>임. 일관성 확보에 효과가 가장 큰 수단임</li>
          <li>중요한 것은 예시의 개수가 아니라 어떤 예시를 고르는가임. <strong>목표가 분명한 예시 2~4개</strong>로 충분함</li>
        </ul>
        <h4>무엇을 예시로 고를 것인가</h4>
        <ul>
          <li><strong>판단이 애매한 케이스</strong>를 고름. 명백한 케이스의 예시는 효과가 없음</li>
          <li>왜 그 행동을 골랐는지 <strong>이유(추론)까지 함께 적음</strong>. 그래야 판단 기준이 전달됨</li>
        </ul>
        <div style="font-family:ui-monospace,Menlo,monospace;font-size:12.5px;line-height:2;background:var(--code-bg);border:1px solid var(--line);border-radius:10px;padding:14px 18px;margin:14px 0;overflow-x:auto"><b>시스템 프롬프트에 들어가는 few-shot의 실물</b><br>
예시 1) 고객: "환불도 해주고 배송 주소도 바꿔줘"<br>
&nbsp;&nbsp;올바른 처리: 요청이 2개 → ① lookup_order로 환불 자격 확인 ② update_address 호출. <span style="color:var(--accent)">이유: 멀티 요청은 분해부터.</span><br>
예시 2) 고객: "이거 왜 이래요"<br>
&nbsp;&nbsp;올바른 처리: 도구를 부르지 말고 주문번호부터 묻기. <span style="color:var(--accent)">이유: 추측으로 도구를 부르지 않는다.</span><br>
이제 실제 고객 메시지를 처리할 것: "(새 입력)"
        </div>
        <h4>few-shot이 일반화되는 과정</h4>
        <ul>
          <li>① 모델은 예시에서 <strong>"이런 입력에는 이렇게 한다"는 규칙을 스스로 추출</strong>해 새 입력에 적용함</li>
          <li>② 예시에 <strong>이유(추론)</strong>가 붙어 있으면 겉모양을 따라 하는 대신 <strong>판단 기준을 학습함</strong>. 예시에 없던 새 패턴에도 그 기준을 적용하는 것이 <strong>일반화</strong>임</li>
          <li>③ <strong>환각이 줄어드는 원리</strong>: "PO 번호가 문서에 없음 → po_number: null (값을 지어내지 않음)" 예시를 직접 보여주면, 모델은 값이 없을 때 지어내는 대신 <strong>없다고 답하는 것이 정답 행동</strong>임을 학습함. 다양한 문서 구조에 대응하는 능력도 같은 원리로 생김</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"few-shot 설계 시나리오 3종",
       html:`__MAP4:fewshot__<h4>① 도구 선택이 애매할 때</h4>
        <ul>
          <li>애매한 요청에 대해 어떤 도구를 쓰는지와 <strong>왜 그 도구인지</strong>를 함께 보여주는 예시 2~4개를 넣음</li>
          <li>실물: "계정이 이상해요" → get_account부터 호출함(search_docs 아님). <strong>이유: 개인 계정 상태는 문서에 없음</strong>. 이 요청과 처리 한 쌍이 예시 하나임</li>
        </ul>
        <h4>② 출력 형식 통일</h4>
        <ul>
          <li>위치, 이슈, 심각도, 수정 제안까지 원하는 형식 그대로의 예시를 제시함</li>
          <li>실물 한 줄: "[high] auth.ts:12 · 토큰 만료 미확인 · 수정: expiry 검사 추가". 이 형태 자체를 예시로 넣음</li>
        </ul>
        <h4>③ 오탐 감소와 문서 구조 대응</h4>
        <ul>
          <li>수용 가능한 코드 패턴과 진짜 이슈를 <strong>대비쌍</strong>으로 제시함. 오탐이 줄면서 일반화 능력은 유지됨</li>
          <li>실물 쌍: "테스트 파일 안의 console.log = 수용(디버그 관례) ↔ 프로덕션 코드 안의 console.log = 이슈". 같은 코드라도 맥락에 따라 판단이 달라진다는 것을 쌍으로 보여줌</li>
          <li>인라인 인용과 참고문헌, 서술형과 표처럼 <strong>구조가 다른 문서들의 추출 예시</strong>를 넣으면 null 추출과 환각이 줄어듦</li>
        </ul>
        <div class="callout">🎯 시험 포인트: few-shot과 4.1 명시적 기준의 관계임. 기준이 판단 경계를 정의하고 예시가 그 경계의 실물을 보여줌. "규칙 + 애매한 케이스 예시" 조합이 정답인 경우가 많음.</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: Auditing the example set",
       q:`Your routing agent's prompt contains six few-shot examples, all shaped like: "Customer: 'I want a refund for order #123, it arrived broken.' → Action: process_refund. ✓" Production tickets show it still flails on messages like "this isn't really what I imagined it would be..." A teammate proposes doubling the example set to twelve in the same style. What is the correct assessment?`,
       opts:[
         {t:`The set teaches nothing the model doesn't already do well: replace it with 2-4 ambiguous-case examples that include the reasoning for why one action beat the plausible alternatives — that's what generalizes to novel gray-zone messages.`, ok:true},
         {t:`Approve the proposal — more demonstrations of correct behavior strengthen the pattern regardless of case difficulty.`},
         {t:`The examples are fine but mislabeled; adding an explicit "difficulty: easy" tag to each will help the model calibrate.`},
         {t:`Few-shot has hit its ceiling here; the gray-zone cases need a fine-tuned classifier trained on labeled tickets.`},
       ],
       hint:`여섯 예시의 공통점을 확인할 것. 전부 명백한 케이스이며, 모델이 이미 잘 처리하는 상황을 여섯 번 반복해 보여주고 있음. 예시에 빠진 것은 선택의 이유임.`,
       explain:{
         good:`4.2의 예시 선택 원칙임. 예시의 가치는 개수가 아니라 어느 지점을 다루는가(판단이 애매한 경계)와 무엇을 담는가(선택 이유)에서 나옴. 명백한 케이스 12개는 6개와 같은 것을 가르침. 이유가 담긴 애매한 케이스 2~4개라야 새 패턴으로 일반화됨.`,
         wrongs:[
           `<b>B(같은 형식의 예시 2배):</b> "더 많이"가 오답 유도 지점임. 이미 잘 처리하는 영역을 강화해도 경계 판단은 달라지지 않음.`,
           `<b>C(난이도 태그):</b> 근거 없이 만들어낸 방법임. 태그를 붙여도 없던 판단 기준이 생기지는 않음.`,
           `<b>D(파인튜닝):</b> few-shot의 한계가 아니라 few-shot을 잘못 쓴 것임. 예시 선택을 고치기 전에 ML 인프라를 도입하는 것은 과도한 대응임.`,
         ]},
       principle:"예시는 개수가 아니라 선택이 중요함"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2: The empty fields",
       q:`Your extraction pipeline processes research papers with wildly different structures — some use inline citations, others bibliographies; some have methodology sections, others embed methods in results. Required fields often come back null even when the information exists in the document. What is the best fix?`,
       opts:[
         {t:`Add few-shot examples demonstrating correct extraction from documents with varied structures — one with inline citations, one with a bibliography, one with embedded methodology.`, ok:true},
         {t:`Make all fields required in the schema so the model is forced to find values.`},
         {t:`Preprocess every paper into a single normalized format before extraction.`},
         {t:`Raise max_tokens so the model has room to search the document more thoroughly.`}],
       hint:`정보가 문서에 있는데 찾지 못하는 원인은 문서 구조가 제각각이라는 점임. 구조 다양성에 대응하는 few-shot 사용법을 떠올릴 것.`,
       explain:{
         good:`가이드 4.2에 명시된 내용임. 형식이 다양한 문서들의 추출 예시가 구조 변형에 대한 대응력을 만들어 null 추출을 줄임. 구조 유형마다 예시를 하나씩 넣음.`,
         wrongs:[
           `<b>B:</b> required로 강제하면 정보가 실제로 없을 때 값을 지어내는 환각이 발생함. 4.3에서 nullable이 정답인 이유임.`,
           `<b>C:</b> 정규화 전처리기를 만드는 일 자체가 대형 프로젝트임. 과도한 설계임.`,
           `<b>D:</b> 출력 길이 한도는 문서 탐색 능력과 무관함.`,
         ]},
       principle:"구조 다양성은 예시로 가르친다"},
    ]},

  /* ===== CH 3 · 4.3 tool_use 스키마 ===== */
  { id:"p4c3", ch:"CH 3", title:"tool_use와 JSON 스키마로 출력 강제 (4.3)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"스키마를 주면 출력 형식은 보장된다",
       html:`<div class="callout">📖 용어 카드. <b>JSON 스키마</b>: 출력이 따라야 할 항목 정의서임. <b>required</b>는 반드시 채워야 하는 항목, <b>nullable</b>은 비워도 되는 항목, <b>enum</b>은 정해진 값 중에서 고르는 항목임.</div>
        <h4>스키마가 무엇인가</h4>
        <ul>
          <li>스키마는 출력이 따라야 할 <strong>항목 정의서</strong>임. 실체는 <strong>JSON으로 적은 텍스트</strong>이며, API 요청의 도구 정의 안에 넣는 설정 데이터임</li>
          <li>"이 출력에는 어떤 항목이 있고, 각 항목에는 어떤 종류의 값이 들어가는가"를 선언함. 모델은 그 정의대로만 출력함</li>
        </ul>
        <div style="font-family:ui-monospace,Menlo,monospace;font-size:12.5px;line-height:2;background:var(--code-bg);border:1px solid var(--line);border-radius:10px;padding:14px 18px;margin:14px 0;overflow-x:auto"><b>JSON 스키마의 가장 기본적인 모양 (인보이스 추출 도구)</b><br>
{ "name": "extract_invoice",<br>
&nbsp;&nbsp;"input_schema": {<br>
&nbsp;&nbsp;&nbsp;&nbsp;"type": "object",<br>
&nbsp;&nbsp;&nbsp;&nbsp;"properties": {<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"invoice_id": { "type": "string" },&nbsp;&nbsp;<span style="color:var(--accent)">← 문자열 항목</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"total": { "type": "number" },&nbsp;&nbsp;<span style="color:var(--accent)">← 숫자 항목</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"po_number": { "type": ["string", "null"] },&nbsp;&nbsp;<span style="color:var(--accent)">← 비워도 되는 항목 (nullable)</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"category": { "enum": ["food", "clothing", "other"] }&nbsp;&nbsp;<span style="color:var(--accent)">← 정해진 값 중 선택 (enum)</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;},<br>
&nbsp;&nbsp;&nbsp;&nbsp;"required": ["invoice_id", "total"]&nbsp;&nbsp;<span style="color:var(--accent)">← 반드시 채워야 하는 항목</span><br>
&nbsp;&nbsp;} }
        </div>
        <h4>왜 tool_use를 쓰는가</h4>
        <ul>
          <li>추출 도구를 정의하고 스키마를 입력 파라미터로 지정함. 모델의 tool_use 응답에서 구조화 데이터를 꺼냄</li>
          <li>효과: <strong>JSON 문법 오류가 사라짐</strong>. 스키마 준수가 보장됨</li>
          <li>한계: <strong>의미 오류는 막지 못함</strong> (합계 불일치, 값이 다른 항목에 들어감)</li>
        </ul>
        <h4>tool_choice 복습 (D2 Ch3과 연결)</h4>
        <ul>
          <li>"auto"는 텍스트 응답으로 빠질 수 있음. "any"는 도구 중 하나를 반드시 호출하게 함. 이름 지정은 특정 도구를 강제함</li>
          <li>문서 유형을 모르고 추출 스키마가 여러 개인 경우: <strong>"any"</strong></li>
          <li>특정 추출이 반드시 먼저 실행돼야 하는 경우: <strong>도구 이름 지정</strong>. 실물 문법: <code>tool_choice: {"type": "tool", "name": "extract_metadata"}</code>이며 "이번 응답은 반드시 이 도구를 호출한다"는 뜻임</li>
          <li>왜 필요한가 (가이드 원문 4.3-S3): 뒤에 오는 <strong>enrichment 단계</strong>(추출된 기본 데이터에 추가 정보를 붙이는 후속 처리)가 그 추출 결과를 입력으로 쓰기 때문임. 파이프라인 <strong>순서 보장</strong>이 목적임</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"값을 지어내지 않게 만드는 스키마 설계",
       html:`__MAP4:schema__<h4>① nullable: 환각을 막는 핵심 수단</h4>
        <ul>
          <li>원본에 없을 수 있는 정보를 <strong>required로 두면 모델이 값을 지어냄</strong></li>
          <li>처방은 optional(nullable)로 두고 값이 없으면 null을 반환하게 하는 것임</li>
          <li>입력 형태: 스키마에 <code>"po_number": {"type": ["string", "null"]}</code>로 쓰고 required 목록에서 제외함. 이 두 가지가 "비워도 됨"의 실물임</li>
        </ul>
        <h4>② enum 확장 패턴</h4>
        <ul>
          <li>판단이 애매한 케이스를 위해 <code>"unclear"</code> 값을 추가함</li>
          <li>분류 목록이 고정되지 않는 경우 <code>"other"</code>와 <strong>상세 문자열 항목</strong>을 함께 둠</li>
          <li>입력 형태: <code>"category": {"enum": ["food", "clothing", "unclear", "other"]}</code>에 <code>"other_detail": {"type": "string"}</code> 항목을 짝으로 추가함</li>
        </ul>
        <h4>③ 정규화 규칙은 프롬프트에 함께 넣음</h4>
        <ul>
          <li>원본 형식이 제각각인 값(전화번호, 날짜, 통화)은 <strong>형식 정규화 규칙을 스키마와 함께</strong> 프롬프트에 넣음</li>
          <li>실물 문장: "날짜는 전부 YYYY-MM-DD로 통일한다. 전화번호는 하이픈을 제거한다. 통화는 숫자만 적는다." 스키마는 항목의 <strong>구조</strong>만 강제하므로, 값을 <strong>어떤 형식으로 적을지</strong>는 프롬프트 문장으로 지정함</li>
        </ul>
        <div class="callout">🎯 시험 포인트: "스키마를 strict로 하면 전부 해결된다"는 선택지에 주의할 것. strict는 <b>문법</b>만 보장하며, 합계나 항목 배치 같은 <b>의미</b>는 4.4의 검증 루프가 담당함.</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: Schema post-mortem",
       q:`A schema review after three production incidents. The schema: every field required; product_category is enum ["electronics","clothing","food"]; dates are free-form strings. The incidents: (1) fabricated supplier_tax_id values on documents that lack one; (2) a niche automotive part classified as "food"; (3) the same delivery date extracted as "3/4/25", "2025-04-03", and "April 3rd" across documents. Which single schema revision addresses all three?`,
       opts:[
         {t:`Make fields that may be absent optional/nullable; extend the enum with "other" plus a detail string and an "unclear" value; and add explicit format-normalization rules to the prompt alongside the schema.`, ok:true},
         {t:`Keep all fields required for data completeness, but add prompt warnings: "never fabricate values, never force categories, always use ISO dates."`},
         {t:`Convert every field to free-form strings so the model is never forced into a wrong structure.`},
         {t:`Enable strict schema mode, which rejects fabricated values, wrong categories, and malformed dates at the API level.`},
       ],
       hint:`세 건의 사고는 각각 다른 설계 결함에서 나옴(전 항목 required 강제, 예외 값이 없는 enum, 정규화 규칙 부재). 하나만 고치는 선택지와 셋을 모두 고치는 선택지를 구분할 것. D는 strict가 무엇을 보장하는지 아는지 확인하는 오답 유도 선택지임.`,
       explain:{
         good:`사고와 처방이 하나씩 대응함. 환각은 required와 정보 부재가 겹쳐 생기므로 nullable로 바꿈. 강제 분류는 값이 닫힌 enum에서 생기므로 other와 상세 항목, unclear를 추가함. 형식 난립은 규칙 부재에서 생기므로 정규화 규칙을 프롬프트에 함께 넣음. 4.3의 세 가지 설계 원칙을 하나의 스키마에 적용하는 문제임.`,
         wrongs:[
           `<b>B(required 유지 + 경고문):</b> 구조가 강제하는 결과를 지시로 막으려는 방식임. 첫 번째 사고의 원인 구조가 그대로 남음.`,
           `<b>C(전부 자유 문자열):</b> 구조화의 목적 자체를 포기하는 방식임. 후속 검증과 집계가 불가능해짐.`,
           `<b>D(strict 모드):</b> strict는 문법만 보장함. 지어낸 값도 틀린 분류도 문법적으로는 유효하므로 그대로 통과함. 일반적으로는 맞아 보이지만 이 문제의 조건에서는 틀린 선택지임.`,
         ]},
       principle:"결함이 셋이면 처방도 셋임"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2: Unknown document types",
       q:`Your pipeline receives mixed documents — invoices, contracts, and shipping manifests — and has three extraction tools (extract_invoice, extract_contract, extract_manifest), each with its own schema. The document type is unknown at request time, and the response must always be structured output, never conversational text. Which tool_choice configuration is correct?`,
       opts:[
         {t:`tool_choice: "any" — the model must call one of the tools and can pick the schema matching the document it sees.`, ok:true},
         {t:`tool_choice: {"type": "tool", "name": "extract_invoice"} — force the most common type.`},
         {t:`tool_choice: "auto" with a prompt instruction to always use a tool.`},
         {t:`Run all three tools on every document and keep whichever output validates.`}],
       hint:`요구 조건은 두 가지임. 반드시 도구를 호출할 것, 그리고 어느 도구를 쓸지는 모델이 문서를 보고 판단할 것. 이 조합에 해당하는 설정값을 고를 것.`,
       explain:{
         good:`반드시 도구를 호출하되 선택은 모델에게 맡기는 설정이 "any"임. 문서 유형 판단은 모델이 가장 잘 수행하고, 텍스트 응답으로 빠지는 경로는 구조적으로 차단됨(가이드 4.3에 명시된 사례임).`,
         wrongs:[
           `<b>B:</b> 계약서에 인보이스 스키마를 강제하게 됨. 가장 흔한 유형이라는 이유로 전부 그 유형으로 처리할 수는 없음.`,
           `<b>C:</b> auto에 지시를 더하는 방식은 확률적임. 대화 텍스트로 빠지는 경로가 남음.`,
           `<b>D:</b> 호출 비용이 3배가 되고, "검증 통과"가 정확성을 보장하지도 않음(문법 통과와 올바른 추출은 다름).`,
         ]},
       principle:"필요한 보장 수준에 맞춰 tool_choice를 고름"},
    ]},

  /* ===== CH 4 · 4.4 검증·재시도 ===== */
  { id:"p4c4", ch:"CH 4", title:"검증·재시도·피드백 루프 (4.4)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"무엇이 틀렸는지 알려주고 다시 시킨다",
       html:`<div class="callout">📖 용어 카드. <b>Pydantic</b>: 파이썬의 데이터 검증 라이브러리임. 출력이 스키마에 맞는지 자동으로 대조하고 어긋난 지점을 알려줌. <b>문법 오류와 의미 오류의 구분</b>: 문법 오류(괄호 누락, 타입 불일치)는 tool_use가 제거함. 의미 오류(합계 불일치, 값이 다른 항목에 들어감)는 검증 루프가 담당함.</div>
        <h4>retry-with-error-feedback의 정의</h4>
        <ul>
          <li>재시도(retry)이되 "다시 하라"고만 하지 않고 <strong>무엇이 어떻게 틀렸는지를 첨부해서</strong> 다시 시키는 방식임</li>
          <li>실체: 검증 코드가 오류를 발견하면 아래 세 가지를 담은 <strong>새 API 요청</strong>을 자동으로 만들어 보냄</li>
        </ul>
        <div style="font-family:ui-monospace,Menlo,monospace;font-size:12.5px;line-height:2;background:var(--code-bg);border:1px solid var(--line);border-radius:10px;padding:14px 18px;margin:14px 0;overflow-x:auto"><b>재시도 요청의 실물: 세 가지 구성 요소</b><br>
"다음 문서에서 다시 추출할 것.<br>
① 원본 문서: (인보이스 전문 그대로 첨부)&nbsp;&nbsp;<span style="color:var(--accent)">← 고칠 대상 자료</span><br>
② 지난번 추출: { "total": 1200, "items_sum": 1350, … }&nbsp;&nbsp;<span style="color:var(--accent)">← 직전 결과</span><br>
③ 검증 오류: items 합계(1350)와 total(1200) 불일치. items 3번의 수량×단가 재확인"&nbsp;&nbsp;<span style="color:var(--accent)">← 오류 위치</span>
        </div>
        <h4>세 가지를 모두 넣는 이유</h4>
        <ul>
          <li><strong>원본 문서, 실패한 추출 결과, 구체적 검증 오류</strong>가 모두 있어야 모델이 교정할 수 있음. 각각 고칠 대상 자료, 직전 결과, 오류 위치에 해당함</li>
          <li>"다시 해 보라"가 아니라 "이 지점이 이렇게 틀렸으니 다시 하라"의 형태임</li>
        </ul>
        <h4>재시도의 한계 (출제 빈도가 높음)</h4>
        <ul>
          <li>통하는 경우: <strong>형식 불일치와 구조 오류</strong>임. 고칠 근거가 문서 안에 있음</li>
          <li>통하지 않는 경우: <strong>정보가 원본에 아예 없는 경우</strong>임(외부 문서에만 존재). 몇 번을 다시 시켜도 없는 정보는 나오지 않음</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"자기 검증 항목과 패턴 추적으로 루프를 시스템화하기",
       html:`__MAP4:validate__<h4>① 자기 검증 항목 설계</h4>
        <ul>
          <li>'필드'는 스키마의 항목임. 자기 검증 필드는 <strong>모델이 검산 값을 직접 적게 만드는 추가 항목</strong>임</li>
          <li>실물: <code>"stated_total"</code> 항목에는 문서에 적힌 총액을 그대로 적게 하고, <code>"calculated_total"</code> 항목에는 items를 직접 합산한 값을 적게 함. <strong>애플리케이션 코드가 두 항목을 비교</strong>해 다르면 표시함. 모델의 "맞다"는 답을 믿는 것이 아니라 두 항목을 대조하는 구조임</li>
          <li>원본 데이터 자체가 모순이면 <code>conflict_detected</code> 불리언 항목으로 표시함</li>
        </ul>
        <h4>② detected_pattern: 오탐 발생 원인 추적</h4>
        <ul>
          <li>기각(dismiss)은 개발자가 봇의 지적을 "문제 아님"으로 닫는 것임</li>
          <li><code>detected_pattern</code>은 발견마다 <strong>어떤 코드 형태가 이 지적을 발생시켰는지</strong>를 적게 만든 항목임</li>
          <li>진행 과정: 한 달치 <strong>기각된 발견</strong>을 모아 패턴별로 집계함 → "kwargs 전달 패턴을 버그로 오인"이 기각의 40%를 차지함 → 그 패턴을 4.2의 <strong>대비쌍 예시("수용 가능")로 프롬프트에 추가</strong>함 → 해당 오탐이 사라짐</li>
          <li>어디서 하는가: 별도 Claude 세션(채팅이든 Claude Code든)에 기각 로그를 주고 공통 패턴을 뽑게 함. 분석도 Claude에게 맡기는 것이 표준 방식임</li>
        </ul>
        <h4>③ 재시도 판단 순서</h4>
        <ul>
          <li>실패를 발견하면 <strong>원인 분류가 먼저임</strong>. 형식이나 구조의 문제인가, 정보 부재인가</li>
          <li>정보 부재이면 재시도 대신 null 허용이나 사람에게 넘기는 등 <strong>다른 경로</strong>를 씀</li>
        </ul>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: The 12% retry loop",
       q:`A teammate implemented the validation-retry loop: on Pydantic failure, it re-prompts with only "Your previous output had validation errors. Please fix them and try again." Retry success rate: 12%. He proposes raising max retries from 2 to 6 since "each attempt is another chance." What is the correct diagnosis?`,
       opts:[
         {t:`The retry prompt gives the model nothing to work with — include the original document, the failed extraction, and the specific validation errors; with that feedback, format-level failures typically resolve in one retry, making 6 attempts unnecessary.`, ok:true},
         {t:`12% is within normal range for retry loops; raising the cap to 6 attempts compounds the odds to an acceptable success rate.`},
         {t:`Retries should use a stronger model tier — validation failures signal the base model has reached its capability limit.`},
         {t:`The loop should lower temperature on each successive retry so outputs converge toward validity.`},
       ],
       hint:`"고치라"는 말만 받은 모델이 무엇을 고쳐야 하는지 알 수 있는지 확인할 것. 12%는 아무 정보 없이 다시 시도했을 때의 성공률에 가까움.`,
       explain:{
         good:`4.4의 재시도 구성 요소가 전부 빠져 있음. 원본, 실패한 출력, 구체적 오류 세 가지가 필요함. 정보 없는 재시도는 같은 요청을 그대로 다시 보내는 것과 같아서 12%가 나옴. 정보를 함께 주면 형식 오류는 보통 1회에 해결됨. 시도 횟수가 아니라 각 시도에 담기는 정보량의 문제임.`,
         wrongs:[
           `<b>B(확률 누적 논리):</b> 계산은 그럴듯하지만 각 시도가 정보 없이 반복되는 상태라는 전제를 그대로 받아들이는 방식임. 비용을 3배로 늘려 우연에 기대는 설계임.`,
           `<b>C(모델 등급 상향):</b> 능력의 한계라는 증거가 없음. 피드백이 없는 프롬프트는 어느 모델에게도 정보가 부족함.`,
           `<b>D(temperature 하향):</b> 수렴할 목표 정보가 없는 상태에서 편차만 줄이면 같은 오답으로 수렴할 뿐임.`,
         ]},
       principle:"재시도는 횟수가 아니라 담기는 정보가 중요함"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2: When retries can't win",
       q:`Two recurring extraction failures: (a) supplier_tax_id is empty because it only appears in a separate registration document your pipeline never receives; (b) invoice line items sometimes don't sum to the stated total. Which handling is correct?`,
       opts:[
         {t:`(a) is unfixable by retry — the information isn't in the source, so allow null or route for human input; (b) needs a self-correction design — extract calculated_total alongside stated_total and flag discrepancies.`, ok:true},
         {t:`Retry both with error feedback — the model will eventually find the tax ID and fix the sums.`},
         {t:`(a) needs more retries with higher temperature for creativity; (b) should be silently auto-corrected to the calculated sum.`},
         {t:`Mark both documents as corrupt and exclude them from the pipeline.`}],
       hint:`(a)의 정보가 파이프라인이 받는 문서 안에 있는지 밖에 있는지 확인할 것. 재시도가 통하지 않는 조건이 무엇인지 떠올릴 것.`,
       explain:{
         good:`재시도 가능 여부 판별과 자기 검증 설계를 함께 묻는 문제임. (a)는 정보 부재이므로 몇 번을 다시 시켜도 값이 나오지 않음. (b)는 calculated_total과 stated_total을 나란히 추출해 불일치를 표시하는 가이드 패턴에 해당함.`,
         wrongs:[
           `<b>B:</b> "언젠가는 찾을 것"이라는 기대는 환각을 기다리는 것과 같음. 없는 정보에 대한 재시도는 비용 낭비이자 위험임.`,
           `<b>C:</b> temperature를 올리면 값을 지어낼 뿐임. 표시 없이 자동으로 보정하면 원본의 모순이 감춰짐.`,
           `<b>D:</b> 문서 자체에는 문제가 없음. 파이프라인 설계의 한계임.`,
         ]},
       principle:"재시도 한계 판별과 자기 검증 항목"},
    ]},

  /* ===== CH 5 · 4.5 배치 처리 ===== */
  { id:"p4c5", ch:"CH 5", title:"배치 처리 전략: Batches API (4.5)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"비용 50% 절감의 조건은 지연 허용이다",
       html:`<h4>Batches API가 무엇인가</h4>
        <ul>
          <li>요청 수천 건을 <strong>한 번에 제출해 두고 나중에 결과를 한꺼번에 회수하는</strong> 별도 API임</li>
          <li>실체: 채팅 화면의 기능이 아니라 <strong>개발자가 코드로 사용하는 제출 방식</strong>임. 그 제출 스크립트를 Claude Code에게 작성하게 할 수는 있음</li>
        </ul>
        <div style="font-family:ui-monospace,Menlo,monospace;font-size:12.5px;line-height:2;background:var(--code-bg);border:1px solid var(--line);border-radius:10px;padding:14px 18px;margin:14px 0;overflow-x:auto"><b>동기 API와 배치의 흐름 비교</b><br>
[동기 API]&nbsp;&nbsp;요청 → (대기) → 응답&nbsp;&nbsp;<span style="color:var(--accent)">← 한 건씩 곧바로 응답</span><br>
[Batches]&nbsp;&nbsp;요청 1만 건 제출 → "접수됨(batch_id)" → <b>연결 끊김</b><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;… 몇 분 ~ 최대 24시간 …<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;폴링(가끔 상태만 확인) → ended → 결과 1만 건 한꺼번에 회수<br>
핵심: <b>제출과 회수 사이에 개입할 수 없다</b>. 그래서 중간에 도구를 실행해 결과를 돌려주는 왕복이 불가능함
        </div>
        <h4>Message Batches API 스펙 (숫자 암기 대상)</h4>
        <ul>
          <li>비용 <strong>50% 절감</strong>임(모든 사용량이 표준 단가의 절반)</li>
          <li>처리 시간은 <strong>최대 24시간</strong>이며 <strong>지연 보장(SLA)이 없음</strong>. 대부분 1시간 안에 끝나지만 그것은 약속이 아님. 24시간 안에 끝나지 않은 요청은 <strong>expired</strong>로 처리되고 과금되지 않음</li>
          <li><code>custom_id</code>로 요청과 응답을 대조함. <strong>결과가 제출 순서와 무관하게 돌아오므로</strong> 이것이 유일한 대조 수단임. 형식은 영숫자·하이픈·언더스코어 1~64자임</li>
        </ul>
        <div style="font-family:ui-monospace,Menlo,monospace;font-size:12.5px;line-height:2;background:var(--code-bg);border:1px solid var(--line);border-radius:10px;padding:14px 18px;margin:14px 0;overflow-x:auto"><b>custom_id 실물: 제출할 때 부여하고 회수할 때 대조함</b><br>
제출: {"custom_id": "invoice-0001", "params": { …문서1 추출 요청… }}<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"custom_id": "invoice-0002", "params": { …문서2 추출 요청… }}<br>
회수: 결과가 <b>제출 순서와 다른 순서</b>로 옴 → {"custom_id": "invoice-0002", "result": …}<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ 애플리케이션 코드가 custom_id를 보고 원본 문서와 결과를 대조함
        </div>
        <ul>
          <li><strong>배치 요청 안에서는 멀티턴 도구 호출이 불가능함</strong>. 중간에 도구를 실행하고 결과를 돌려받는 흐름은 쓸 수 없음(시험 가이드에 명시됨)</li>
        </ul>
        <h4>공식 문서의 운영 세부 사항</h4>
        <ul>
          <li>배치 한도: <strong>10만 건 또는 256MB</strong> 중 먼저 도달하는 값</li>
          <li>결과 보관: 생성 후 <strong>29일</strong>이며 그 이후에는 다운로드가 불가능함</li>
          <li>결과 4상태: succeeded / errored / canceled / expired. 실패·취소·만료분은 과금되지 않음</li>
          <li>상태 추적: <code>processing_status</code>가 in_progress에서 ended로 바뀜</li>
        </ul>
        <h4>적합한 작업과 부적합한 작업</h4>
        <ul>
          <li>블로킹은 그 결과가 나와야 <strong>다음 일이 진행되는</strong> 흐름임. 예: PR 병합 버튼이 리뷰 결과를 기다리는 상황이며, 사람이 화면 앞에서 대기함</li>
          <li>논블로킹은 결과가 언제 오든 <strong>다른 일이 멈추지 않는</strong> 흐름임. 예: 야간 리포트이며 아침에 준비돼 있으면 됨</li>
          <li>✅ 논블로킹이고 지연이 허용되는 작업: 야간 리포트, 주간 감사, 야간 테스트 생성</li>
          <li>❌ 블로킹 작업: <strong>병합 전 검사</strong>처럼 사람이 결과를 기다리는 흐름</li>
        </ul>
        <div class="callout">📖 용어 카드. <b>SLA</b>(Service Level Agreement, 서비스 수준 협약): 언제까지 끝낸다는 계약상의 약속임. Batches API에는 이 약속이 없으므로 "보통 빨리 끝난다"는 관찰에 기대면 안 됨.</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"배치 운영의 세 가지 계산",
       html:`__MAP4:batch__<h4>① 워크플로 분류가 먼저임</h4>
        <ul>
          <li>같은 시스템 안에서도 <strong>블로킹 작업은 실시간 API로, 논블로킹 작업은 배치로</strong> 분리함(공식 가이드 샘플 11번은 병합 차단 리뷰와 야간 감사를 구분하는 문제임)</li>
        </ul>
        <h4>② SLA 역산</h4>
        <ul>
          <li>배치 최대 24시간에 서비스 SLA 30시간이면 <strong>여유가 6시간</strong>이므로 4시간 간격 제출이 안전함</li>
          <li>계산식: 제출 주기 ≤ (서비스 SLA − 배치 최대 처리시간)</li>
        </ul>
        <h4>③ 실패 처리와 사전 조정</h4>
        <ul>
          <li>실패분만 <code>custom_id</code>로 식별해 <strong>수정 후 재제출</strong>함(컨텍스트 초과 문서는 분할함)</li>
          <li>대량 처리 전에 <strong>샘플로 프롬프트를 먼저 조정</strong>함. 1차 통과율을 높이면 재제출 비용이 줄어듦</li>
        </ul>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: The 9 AM deadline",
       q:`Your compliance team needs 20,000 documents scanned nightly, results ready by a hard 9:00 AM regulatory deadline. Documents finish arriving at 11:00 PM. An engineer proposes the Batches API for the 50% savings: "submit at 11 PM, batches usually finish in 2-3 hours." Finance loves it. What is the correct evaluation?`,
       opts:[
         {t:`Reject it as designed: the 11 PM → 9 AM window is 10 hours, but batch processing can take up to 24 hours with no latency SLA — "usually 2-3 hours" cannot back a hard regulatory deadline. Keep synchronous processing, or renegotiate the deadline before touching batches.`, ok:true},
         {t:`Approve it but move submission to noon, giving the batch 21 hours before the deadline — comfortably inside the 24-hour maximum.`},
         {t:`Approve it with monitoring: poll the batch hourly and alert the team if it's still running at 6 AM.`},
         {t:`Approve it with the workload split into four smaller 5,000-document batches, since smaller batches complete proportionally faster.`},
       ],
       hint:`"usually"는 SLA가 아님. B의 21시간도 다시 확인할 것. 최대치가 24시간인데 21시간이면 보장이 생기는지, 그리고 문서가 언제 모두 모이는지도 함께 볼 것.`,
       explain:{
         good:`4.5의 역산이 성립하려면 대기 시간과 최대 처리시간의 합이 마감 이내여야 함. 10시간이든 21시간이든 최대치인 24시간보다 짧으면 보장이 없음. 정오 제출은 문서가 밤 11시에 모두 모인다는 조건과도 맞지 않음. 규제 마감이 걸린 작업은 블로킹 워크로드이므로 배치에 적합하지 않음.`,
         wrongs:[
           `<b>B(정오 제출):</b> 21시간은 24시간보다 짧아 여전히 보장이 없고, 그 시각에는 스캔할 문서가 아직 다 모이지 않음.`,
           `<b>C(모니터링):</b> 오전 6시에 미완료 사실을 알게 될 뿐임. 3시간 안에 2만 건을 처리할 대체 방안이 없으면 경보만으로는 마감을 지킬 수 없음.`,
           `<b>D(배치 분할):</b> 작은 배치가 빨리 끝난다는 것은 규정된 보장이 아님. 각 배치가 여전히 최대 24시간임.`,
         ]},
       principle:"마감이 최대 처리시간보다 짧으면 배치를 쓸 수 없음"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2: The 30-hour promise",
       q:`Your document service promises customers results within 30 hours of upload. You batch-process uploads with the Batches API (up to 24h per batch). Some documents fail on first pass (oversized ones exceed context limits) and need resubmission. Which operating design meets the SLA?`,
       opts:[
         {t:`Submit batches every 4 hours; identify failures by custom_id and resubmit them promptly with fixes (e.g., chunking oversized documents) — the 6-hour margin covers one resubmission cycle only if submissions are frequent.`, ok:true},
         {t:`Submit one batch daily at midnight; 24 hours of processing still fits inside 30 hours.`},
         {t:`Submit continuously but rely on batches typically finishing within 2-3 hours.`},
         {t:`Switch failed documents to the real-time API but keep daily batch submission for the rest.`}],
       hint:`배치 제출 직후에 업로드된 문서를 기준으로 생각할 것. 하루에 한 번만 제출하면 그 문서는 최악의 경우 몇 시간 뒤에 처리되는가.`,
       explain:{
         good:`가이드 4.5의 SLA 역산임. 제출 간격이 길면 대기시간이 SLA를 잠식함. 4시간 간격이면 대기 4시간에 처리 24시간을 더해 28시간이므로 30시간 안에 들어옴. 실패분은 custom_id로 골라 분할한 뒤 재제출함.`,
         wrongs:[
           `<b>B:</b> 자정 직후 업로드된 문서는 대기 24시간에 처리 24시간을 더해 최대 48시간이 걸림. SLA를 지킬 수 없음.`,
           `<b>C:</b> "typically"는 SLA가 아님. 24시간이 걸리는 경우가 한 번만 나와도 약속 위반임.`,
           `<b>D:</b> 실패분을 실시간 API로 넘기면 비용 절감 목적과 어긋나고, 근본 원인인 제출 주기와 문서 분할 문제를 고치지 못함.`,
         ]},
       principle:"SLA 역산: 대기 시간 + 처리 시간 ≤ 약속 시간"},
    ]},

  /* ===== CH 6 · 4.6 다중 인스턴스 리뷰 ===== */
  { id:"p4c6", ch:"CH 6", title:"다중 인스턴스·다중 패스 리뷰 (4.6)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"생성한 세션은 자기 결과를 검토하지 못한다",
       html:`<h4>자기 리뷰(self-review)의 구조적 한계</h4>
        <ul>
          <li>생성한 세션에는 <strong>생성 당시의 추론 맥락</strong>이 남아 있음</li>
          <li>그 맥락이 자기 결정을 옳다고 보는 편향으로 작동함. 그래서 <strong>자기 결정을 의심하지 못함</strong></li>
          <li>"더 신중히 검토하라"는 지시나 extended thinking으로도 <strong>해결되지 않음</strong>. 맥락 자체가 원인이기 때문임</li>
        </ul>
        <h4>처방: 독립 리뷰 인스턴스</h4>
        <ul>
          <li>생성자의 추론 맥락이 <strong>없는 별도 세션</strong>이 미묘한 이슈를 더 잘 찾아냄</li>
          <li>D3 Ch6의 "CI에서 생성 세션과 리뷰 세션을 분리한다"와 같은 원리임</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"패스 분리와 신뢰도 보고",
       html:`__MAP4:review__<h4>① 다중 패스 (1.6·3.6과 연결)</h4>
        <ul>
          <li>대형 리뷰는 <strong>파일별 로컬 분석 패스</strong>와 <strong>파일 간 통합 패스</strong>로 나눔</li>
        </ul>
        <div style="font-family:ui-monospace,Menlo,monospace;font-size:12.5px;line-height:2;background:var(--code-bg);border:1px solid var(--line);border-radius:10px;padding:14px 18px;margin:14px 0;overflow-x:auto"><b>정답 구조와 대표 오답 3종의 구조 비교</b><br>
<span style="color:var(--accent)">[정답] 독립 리뷰 + 다중 패스</span><br>
&nbsp;&nbsp;생성 세션 ──코드만 전달──→ 리뷰 인스턴스 (생성 추론을 보지 않은 별도 세션)<br>
&nbsp;&nbsp;리뷰: 패스1 = 파일별 집중 ×14회 → 패스2 = 파일 간 통합 ×1회 → 병합 리포트<br>
<br>
[오답 ①] self-review: 생성 세션 ──→ <b>같은 세션</b>이 자기 코드 리뷰 (추론 맥락 잔존 → 같은 맹점 반복)<br>
[오답 ②] 단일 패스: 파일 14개 ──→ <b>한 번에 전부</b> (주의력 분산 → 검토 깊이가 일정하지 않고 모순된 판정 발생)<br>
[오답 ③] 3회 다수결: 그 단일 패스를 <b>3회 실행해 투표</b> (비용 3배, 주의력 분산은 그대로이므로 투표로 해결되지 않음)
        </div>
        <ul>
          <li>효과: 주의력 분산을 막고 서로 모순되는 피드백을 없앰</li>
        </ul>
        <h4>② 신뢰도 자기 보고 기반 라우팅</h4>
        <ul>
          <li>발견마다 <strong>신뢰도를 함께 보고</strong>하게 한 뒤 보정(calibration)을 거쳐 리뷰 라우팅에 활용함</li>
          <li>주의: 자기 보고 신뢰도는 <strong>보정 없이는 신뢰할 수 없음</strong>(5.5에서 심화함)</li>
        </ul>
        <div class="callout">🎯 시험 포인트: "같은 세션에 self-review 지시 추가", "extended thinking으로 해결", "더 큰 모델로 교체"가 대표적인 오답 선택지임. 정답의 판단 기준은 독립 인스턴스와 패스 분리임.</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1: The seeded-bug experiment",
       q:`Your team ran an experiment on 50 code changes with deliberately seeded bugs. Same-session self-review caught 14%; same-session with extended thinking caught 18%; a fresh instance receiving only the diff and review criteria caught 71%. A senior engineer argues the extended-thinking number "just proves we need better self-review prompts — the model clearly can reason deeply." How should you read this data?`,
       opts:[
         {t:`The 18% vs 71% gap is structural, not prompt-quality: the generating session retains its reasoning context and defends its own decisions, and deeper thinking inside that context mostly deepens the self-justification. Ship the independent-instance design.`, ok:true},
         {t:`The engineer is right — extended thinking improved results by 4 points, so iterating on self-review prompts should close the remaining gap.`},
         {t:`All three numbers are too low to trust; rerun the experiment with more seeded bugs before deciding anything.`},
         {t:`Combine approaches: run extended-thinking self-review first, then the independent instance, and union the findings for maximum coverage.`},
       ],
       hint:`4%p 개선과 53%p 격차를 구분할 것. 하나는 프롬프트 조정으로 좁힐 수 있는 차이이고 다른 하나는 구조에서 오는 차이임. extended thinking이 어느 맥락 안에서 수행되는지가 판단 기준임.`,
       explain:{
         good:`4.6의 원리를 실험 데이터로 읽는 문제임. 자기 리뷰의 한계는 생성 맥락 자체에서 오므로 지시나 사고 깊이로는 넘을 수 없음. 71%는 맥락을 제거해서 얻은 결과임. 프롬프트 개선으로 18%를 71%로 만들 수는 없음.`,
         wrongs:[
           `<b>B(4포인트 개선에 근거한 기대):</b> 개선이 있었던 것은 사실이지만 같은 조건 안에서의 미세 조정이므로 구조적 격차인 53%p에는 도달하지 못함.`,
           `<b>C(재실험):</b> 50건에서 14%, 18%, 71%로 나온 방향은 분명함. 결정을 미루는 비용이 더 큼.`,
           `<b>D(두 방식 결합):</b> 자기 리뷰가 추가로 찾아내는 발견이 거의 없음(대부분 71%에 포함됨). 비용은 2배가 되고 이득은 오차 수준임. 독립 인스턴스 단독이 비용 대비 효과가 맞음.`,
         ]},
       principle:"조정으로 좁힐 차이와 구조에서 오는 차이를 구분할 것"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2: Calibrated routing",
       q:`Your review bot now runs as an independent instance and produces good findings, but human reviewers can't keep up with the volume. You want to route only the findings that most need human eyes. Which design follows best practice?`,
       opts:[
         {t:`Have the model self-report a confidence score alongside each finding, calibrate those scores against a labeled validation set, then route low-confidence findings to human review.`, ok:true},
         {t:`Route findings to humans randomly at a fixed 20% sampling rate.`},
         {t:`Trust the model's raw confidence scores as-is and route anything below 0.7.`},
         {t:`Route only critical-severity findings and auto-accept the rest.`}],
       hint:`신뢰도 점수를 쓰기 전에 반드시 거쳐야 하는 단계가 무엇인지 확인할 것.`,
       explain:{
         good:`신뢰도 자기 보고, 라벨된 검증 세트를 이용한 보정, 그다음 라우팅의 순서임. 보정 단계가 핵심임. 원시 자기 보고 점수에는 과신 편향이 있음(가이드 4.6과 5.5의 연결 지점임).`,
         wrongs:[
           `<b>B:</b> 무작위 표집은 모니터링 방법이지 라우팅 기준이 아님. 위험한 발견이 80% 확률로 검토 없이 통과함.`,
           `<b>C:</b> 보정 없는 원시 점수를 신뢰하는 것이 바로 이 문제의 오답 유도 지점임. 0.7이라는 값이 실제 정확도와 무관할 수 있음.`,
           `<b>D:</b> 심각도와 불확실성은 서로 다른 기준임. 확신이 낮은 minor 발견도 사람이 확인해야 함.`,
         ]},
       principle:"신뢰도는 보정한 뒤에만 라우팅 기준으로 씀"},
    ]},

  /* ===== D4 미니테스트 ===== */
  { id:"p4test", type:"test", title:"D4 미니테스트: 프롬프트 & 구조화 출력 12문항",
    questions:[
    {ts:"4.1", lvl:"기초", q:`Which instruction style most improves precision in an automated review prompt?`,
     opts:[
       {t:`Explicit categorical criteria: "flag comments only when the claimed behavior contradicts the actual code behavior."`, ok:true},
       {t:`"Be conservative and only report issues you are highly confident about."`},
       {t:`"Review carefully and thoroughly, considering all edge cases."`},
       {t:`"Act as a world-class senior reviewer with 20 years of experience."`}],
     explain:{good:`정밀도는 무엇을 보고하고 무엇을 제외할지 명시할 때 올라감. 형용사가 아니라 범주 기준이 필요함.`,
       wrongs:[`<b>B:</b> "보수적으로"에는 판단 기준이 없음. 가이드가 실패 사례로 명시한 표현임.`,`<b>C:</b> 신중하게 하라는 지시도 마찬가지임.`,`<b>D:</b> 역할을 부여해도 분류 기준은 생기지 않음.`]},
     principle:"기준은 범주로 정의함"},
    {ts:"4.1", lvl:"실전", q:`After you disabled the style category (80% FP) and improved its prompt, you must decide when to re-enable it. Which re-enablement criterion is most sound?`,
     opts:[
       {t:`Re-enable after the improved prompt demonstrates an acceptable false-positive rate on a labeled test set of past PRs.`, ok:true},
       {t:`Re-enable after two weeks — enough time for developers to forget the bad experience.`},
       {t:`Re-enable immediately but mark style findings as "beta" so developers discount them.`},
       {t:`Keep it disabled permanently; style findings are inherently low-value.`}],
     explain:{good:`재활성화 조건은 시간이 아니라 증거임. 라벨된 테스트 세트에서 오탐률 개선을 확인한 뒤에 다시 켬. 신뢰는 데이터로 회복함.`,
       wrongs:[`<b>B:</b> 시간이 지나도 오탐률은 달라지지 않음. 같은 경험이 반복되면 신뢰가 영구히 손상됨.`,`<b>C:</b> "beta" 표시는 무시해도 된다는 신호로 읽힘. 노이즈를 다시 공급하는 것임.`,`<b>D:</b> 개선 가능성을 검증도 없이 포기하는 선택임.`]},
     principle:"재활성화는 검증 데이터로 판단함"},
    {ts:"4.2", lvl:"기초", q:`What kind of cases should few-shot examples target to improve an agent's judgment?`,
     opts:[
       {t:`Ambiguous cases, with the reasoning for why one action was chosen over plausible alternatives.`, ok:true},
       {t:`The most common, clear-cut cases the agent already handles well.`},
       {t:`Randomly sampled production cases for statistical coverage.`},
       {t:`Only failure cases, to teach the agent what not to do.`}],
     explain:{good:`가이드 4.2. 판단이 애매한 케이스와 선택 이유를 함께 넣어야 판단 기준이 새 패턴으로 일반화됨.`,
       wrongs:[`<b>B:</b> 이미 잘 처리하는 것을 더 가르치는 낭비임.`,`<b>C:</b> 무작위 표집에는 목표가 없음.`,`<b>D:</b> 부정 예시만으로는 무엇을 해야 하는지 알 수 없음.`]},
     principle:"애매한 케이스와 선택 이유"},
    {ts:"4.2", lvl:"실전", q:`Your code reviewer flags legitimate project-specific patterns (e.g., intentional empty catch blocks with logging decorators) as bugs. You need fewer false positives without missing real empty-catch bugs. What is the best few-shot design?`,
     opts:[
       {t:`Contrast pairs: examples of the acceptable project pattern labeled "do not flag," alongside genuinely buggy empty catches labeled "flag," with the distinguishing reasoning.`, ok:true},
       {t:`Examples of only the acceptable pattern, so the model learns to skip empty catches.`},
       {t:`A rule: "never flag empty catch blocks in this project."`},
       {t:`More examples of unrelated real bugs to strengthen general bug detection.`}],
     explain:{good:`가이드 4.2. 수용 가능한 패턴과 진짜 이슈를 대비쌍으로 제시함. 오탐은 줄고 실제 버그 탐지 능력은 유지됨.`,
       wrongs:[`<b>B:</b> 건너뛰는 것만 가르치면 진짜 빈 catch 버그도 놓침.`,`<b>C:</b> 전면 금지 규칙은 실제 버그 경보까지 차단함. 범주를 통째로 끄는 과도한 대응임.`,`<b>D:</b> 무관한 예시는 이 경계 판단 문제를 해결하지 못함.`]},
     principle:"대비쌍으로 경계의 양쪽을 보여줌"},
    {ts:"4.3", lvl:"기초", q:`What does using tool_use with a strict JSON schema guarantee — and what does it not guarantee?`,
     opts:[
       {t:`It eliminates JSON syntax errors, but does not prevent semantic errors like line items that don't sum to the stated total.`, ok:true},
       {t:`It guarantees both syntactic and semantic correctness of the output.`},
       {t:`It prevents hallucinated values in required fields.`},
       {t:`It guarantees the model will always choose the correct extraction tool.`}],
     explain:{good:`문법은 보장되고 의미는 보장되지 않음. 의미 검증은 4.4의 루프가 담당함.`,
       wrongs:[`<b>B:</b> 의미 오류는 스키마로 잡히지 않음.`,`<b>C:</b> required와 정보 부재가 겹치면 오히려 환각이 발생함. nullable이 처방임.`,`<b>D:</b> 도구 선택은 tool_choice와 도구 설명이 담당하는 영역임.`]},
     principle:"문법 보장은 의미 보장이 아님"},
    {ts:"4.3", lvl:"실전", q:`Your product-category field uses enum: ["electronics", "clothing", "food"]. Two failure modes: niche products get forced into wrong categories, and genuinely ambiguous items get inconsistent labels across runs. Which schema evolution is correct?`,
     opts:[
       {t:`Add "other" with a companion detail string field for products outside the fixed list, and an "unclear" value for genuinely ambiguous cases.`, ok:true},
       {t:`Expand the enum to 40 fine-grained categories so everything fits somewhere.`},
       {t:`Remove the enum and accept free-text categories for flexibility.`},
       {t:`Keep the enum and add a prompt instruction to "choose the closest category."`}],
     explain:{good:`가이드 4.3의 enum 확장 패턴임. "other"와 상세 문자열 항목으로 분류를 확장하고 "unclear"로 애매한 케이스를 처리함. 강제 분류와 비일관된 라벨이 함께 해소됨.`,
       wrongs:[`<b>B:</b> 40개로 늘려도 41번째 제품이 나옴. 구조가 바뀌지 않음.`,`<b>C:</b> 자유 텍스트는 후속 집계가 불가능함. 구조화의 목적을 포기하는 것임.`,`<b>D:</b> "closest"는 틀린 분류를 지시로 승인하는 것임.`]},
     principle:"enum에는 other와 unclear를 함께 둠"},
    {ts:"4.4", lvl:"기초", q:`Which failure type can a retry-with-error-feedback loop fix?`,
     opts:[
       {t:`Format mismatches and structural output errors — the correct information exists in the document.`, ok:true},
       {t:`Information that exists only in an external document not provided to the model.`},
       {t:`Contradictions inside the source document itself.`},
       {t:`Network timeouts during the extraction call.`}],
     explain:{good:`재시도는 문서 안에 근거가 있을 때만 통함. 형식 오류와 구조 오류가 그 경우임.`,
       wrongs:[`<b>B:</b> 없는 정보는 몇 번을 다시 시켜도 나오지 않음. 재시도가 통하지 않는 대표 사례임.`,`<b>C:</b> 원본의 모순은 conflict_detected로 표시할 사안임.`,`<b>D:</b> 일시적 에러이며 백오프 재시도가 담당하는 다른 영역임.`]},
     principle:"재시도의 한계를 먼저 판별함"},
    {ts:"4.4", lvl:"실전", q:`Developers dismiss many of your review bot's findings, but you can't tell which code constructs cause the bad findings. What design enables systematic false-positive analysis?`,
     opts:[
       {t:`Add a detected_pattern field to each structured finding, recording which code construct triggered it — then analyze dismissal rates by pattern.`, ok:true},
       {t:`Log the full prompt and response for every review for manual inspection.`},
       {t:`Survey developers monthly about which findings felt wrong.`},
       {t:`Track the dismissal rate as a single overall metric per release.`}],
     explain:{good:`가이드 4.4. detected_pattern 항목이 발견과 그것을 유발한 코드 형태를 연결함. 기각률을 패턴별로 분석해 오탐을 체계적으로 제거함.`,
       wrongs:[`<b>B:</b> 원시 로그를 전부 수동으로 검토하는 방식은 규모가 커지면 불가능함.`,`<b>C:</b> 기억에 의존한 설문은 부정확하고 늦음.`,`<b>D:</b> 총계 지표는 어떤 패턴이 원인인지 알려주지 않음.`]},
     principle:"분석이 가능하도록 패턴 항목을 설계함"},
    {ts:"4.5", lvl:"기초", q:`Which workload is appropriate for the Message Batches API?`,
     opts:[
       {t:`A nightly technical-debt analysis whose results are read the next morning.`, ok:true},
       {t:`A pre-merge check developers wait on before merging.`},
       {t:`An interactive chatbot answering customer questions.`},
       {t:`A multi-turn agent that executes tools mid-request.`}],
     explain:{good:`논블로킹이고 지연이 허용되면 배치에 적합함. 50% 절감을 쓸 수 있는 사용처임.`,
       wrongs:[`<b>B:</b> 블로킹 작업이며 SLA가 없는 배치와 맞지 않음.`,`<b>C:</b> 실시간 대화도 블로킹임.`,`<b>D:</b> 배치는 요청 안에서의 멀티턴 도구 호출을 지원하지 않음.`]},
     principle:"블로킹 여부로 판별함"},
    {ts:"4.5", lvl:"실전", q:`In a 5,000-document batch run, 3% failed — mostly oversized documents exceeding context limits. What is the correct failure-handling design?`,
     opts:[
       {t:`Identify the failed requests by custom_id, chunk the oversized documents, and resubmit only the failures.`, ok:true},
       {t:`Resubmit the entire 5,000-document batch after fixing the size issue.`},
       {t:`Drop the 3% — a 97% completion rate is acceptable for batch work.`},
       {t:`Retry the failures unchanged; batch failures are usually transient.`}],
     explain:{good:`custom_id로 실패분만 식별하고 원인인 문서 크기에 맞춰 분할한 뒤 실패분만 재제출함. 가이드 4.5의 실패 처리 방식임.`,
       wrongs:[`<b>B:</b> 성공한 97%를 다시 실행하는 중복 비용이 발생함.`,`<b>C:</b> 실패에는 대형 문서라는 패턴이 있음. 버리면 특정 문서 유형이 계통적으로 누락됨.`,`<b>D:</b> 컨텍스트 초과는 결정론적 실패임. 그대로 다시 제출하면 같은 결과가 나옴.`]},
     principle:"custom_id로 실패분만 골라 수정 후 재제출함"},
    {ts:"4.6", lvl:"기초", q:`Why is a separate Claude instance better at reviewing generated code than the session that generated it?`,
     opts:[
       {t:`The independent instance lacks the generator's reasoning context, so it isn't biased toward defending the original decisions.`, ok:true},
       {t:`Separate instances run on newer model versions by default.`},
       {t:`The generating session's context window is too full to review effectively.`},
       {t:`Independent instances have higher default temperature, making them more critical.`}],
     explain:{good:`자기 리뷰 한계의 원인은 남아 있는 추론 맥락임. 독립 인스턴스에는 그 편향이 없음.`,
       wrongs:[`<b>B:</b> 그런 기본 동작은 없음.`,`<b>C:</b> 컨텍스트 공간의 문제가 아니라 편향의 문제임.`,`<b>D:</b> temperature와 비판적 검토 능력은 무관함.`]},
     principle:"편향을 없애는 방법은 맥락 분리임"},
    {ts:"4.6", lvl:"실전", q:`A 16-file PR review produces contradictory findings — a pattern flagged in payments.ts but approved in identical form in orders.ts — plus shallow coverage on half the files. The team proposes: (A) larger context model, (B) three redundant full-PR runs with majority voting, (C) per-file passes plus a cross-file integration pass, (D) instructing the reviewer to "be consistent." Which proposal fixes the root cause?`,
     opts:[
       {t:`(C) — attention dilution across 16 files causes both symptoms; per-file passes give uniform depth and the integration pass handles cross-file consistency.`, ok:true},
       {t:`(A) — with enough context, all 16 files get adequate attention in one pass.`},
       {t:`(B) — majority voting cancels out the inconsistencies between runs.`},
       {t:`(D) — the model needs to be reminded that identical patterns deserve identical judgments.`}],
     explain:{good:`모순된 판정과 얕은 커버리지라는 두 증상의 공통 원인은 주의력 분산임. 패스를 나누는 것이 근본 처방임. 공식 가이드 샘플 12번(다중 패스 리뷰 문제)의 확장임.`,
       wrongs:[`<b>B(A):</b> 컨텍스트가 커져도 주의력의 품질은 달라지지 않음.`,`<b>C(B):</b> 다수결은 간헐적으로만 발견되는 진짜 버그를 지워버림. 비용은 3배가 되고 검출력은 떨어짐.`,`<b>D:</b> 일관성은 지시가 아니라 구조에서 나옴.`]},
     principle:"원칙 ②(증상이 아니라 원인 제거): 근본 원인은 주의력 분산임"},
    ]},
  ]
};
