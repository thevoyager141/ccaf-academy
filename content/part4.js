/* PART 4 — 프롬프트 엔지니어링 & 구조화 출력 (D4, 20%) */
window.CCAF_CONTENT.p4 = {
  id: "p4",
  lessons: [

  /* ===== CH 1 · 4.1 명시적 기준 ===== */
  { id:"p4c1", ch:"CH 1", title:"명시적 기준으로 정밀도 올리기 (4.1)",
    steps:[
      {type:"concept", kind:"PART BRIEFING · 파트 설명", h:"PART 04 — 유일한 강점을 만점 도메인으로",
       html:`<p class="lead">이 파트는 <strong>Prompt Engineering & Structured Output</strong>.</p>
        <h4>파트 프로필</h4>
        <ul>
          <li>출제 비중 <strong>20% ≈ 12문항</strong> · 1차 점수 <strong>75%</strong> — 유일한 강점 도메인</li>
          <li>전략: 아는 것 다지기 + V2 세부(배치·Pydantic·다중 패스)만 보강 → <strong>만점 노리기</strong></li>
          <li>챕터 6개 + 미니테스트 · 약 1.5시간 (세션 S10~S11)</li>
        </ul>
        <h4>다루는 범위</h4>
        <ul>
          <li><strong>명시적 기준</strong> — 오탐 줄이기 (Ch1)</li>
          <li><strong>few-shot</strong> — 예시로 판단 가르치기 (Ch2)</li>
          <li><strong>tool_use + JSON 스키마</strong> — 구조화 출력 보장 (Ch3)</li>
          <li><strong>검증·재시도 루프</strong> — 추출 품질 (Ch4)</li>
          <li><strong>배치 처리</strong> — Batches API (Ch5)</li>
          <li><strong>다중 인스턴스·다중 패스 리뷰</strong> (Ch6)</li>
        </ul>`},
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"'신중하게 해'는 기준이 아니다",
       html:`<h4>막연한 지시가 실패하는 이유</h4>
        <ul>
          <li>"be conservative", "확신 높은 것만 보고해" — 모델에게 <strong>판단선이 어딘지</strong> 알려주지 않음</li>
          <li>정밀도 개선 실패의 전형: 지시는 강해졌는데 <strong>분류 기준이 없음</strong></li>
        </ul>
        <h4>명시적 기준의 모양</h4>
        <ul>
          <li>❌ "주석이 정확한지 확인해"</li>
          <li>✅ "주석의 <strong>주장이 실제 코드 동작과 모순될 때만</strong> 플래그해"</li>
          <li>보고할 범주(버그·보안)와 <strong>스킵할 범주</strong>(사소한 스타일, 로컬 패턴)를 명시</li>
        </ul>
        <h4>오탐(false positive)의 사회학</h4>
        <ul>
          <li>오탐 많은 범주 하나가 <strong>정확한 범주까지 불신</strong>하게 만듦 — 개발자가 봇 전체를 무시하기 시작</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"오탐과 싸우는 세 가지 무기",
       html:`__MAP4:criteria__<h4>① 범주형 기준</h4>
        <ul>
          <li>보고: 버그, 보안 취약점 / 스킵: 사소한 스타일, 프로젝트 로컬 패턴</li>
          <li>"확신도 기반 필터링"이 아니라 <strong>범주 기반 규칙</strong>으로</li>
        </ul>
        <h4>② 오탐 범주 일시 비활성화</h4>
        <ul>
          <li>오탐이 집중된 범주는 <strong>끄고</strong>, 그 범주의 프롬프트를 개선한 뒤 재활성화</li>
          <li>목적: 나머지 범주에 대한 <strong>개발자 신뢰 복구</strong></li>
        </ul>
        <h4>③ 심각도에 실물 예시</h4>
        <ul>
          <li>심각도 레벨마다 <strong>구체적 코드 예시</strong>를 붙여야 분류가 일관됨</li>
        </ul>
        <div class="callout">🎯 시험 포인트: "be more careful" 계열 보기는 거의 항상 오답. 정답은 언제나 "무엇을 보고하고 무엇을 스킵하는지"의 명시적 정의.</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1 — Two edits, two failures",
       q:`Your security reviewer's prompt says "flag risky code." Iteration 1: it floods PRs with findings on test fixtures and TODO comments. Iteration 2: you add "be conservative — only report issues you're confident about," and the noise drops, but so does a real SQL injection it had caught before. The team concludes prompt engineering "just trades noise for misses." What actually went wrong across both iterations?`,
       opts:[
         {t:`Neither iteration defined the decision boundary: replace both vague instructions with categorical criteria — report injection, authz bypass, secrets exposure; skip test fixtures, TODOs, style — with a code example per category.`, ok:true},
         {t:`Iteration 2 was right but overtuned; the fix is finding the sweet spot between "flag risky code" and "be conservative" through A/B testing prompt phrasings.`},
         {t:`The model lacks security depth; route PRs to a security-specialized model and keep the current prompt.`},
         {t:`Exclude test directories and files containing TODO from review scope, then restore the original prompt.`},
       ],
       hint:`두 번의 실패는 반대 방향으로 틀렸지만 원인이 같아 — 뭘 보고하고 뭘 스킵할지 어느 쪽 프롬프트에도 '정의'가 없었어.`,
       explain:{
         good:`4.1의 핵심: 노이즈와 누락은 판단선 부재의 양면이야. "위험한 것"도 "확신 있는 것"도 범주가 아니야 — 보고/스킵 범주를 명시하고 범주별 실물 예시를 붙이면 두 증상이 같이 풀려. "프롬프트 엔지니어링은 트레이드오프"라는 결론 자체가 틀린 프레임이야.`,
         wrongs:[
           `<b>B — 문구 A/B 스윗스팟:</b> 모호함의 강도를 조절하는 것 — 어느 지점에서도 판단선은 생기지 않아.`,
           `<b>C — 모델 교체:</b> injection을 이미 잡았었다는 게 능력의 증거 — 능력이 아니라 기준 문제.`,
           `<b>D — 디렉토리 제외:</b> 절반의 진실 — 노이즈 일부는 줄지만 프로덕션 코드 내 오탐과 기준 부재는 그대로.`,
         ]},
       principle:"노이즈와 누락은 같은 병 — 기준 부재"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2 — Severity chaos",
       q:`Your reviewer labels findings as critical/major/minor, but identical issues get different severities across runs — a SQL injection was "minor" once and "critical" twice. The prompt already defines each level in one sentence ("critical: serious problems..."). How do you achieve consistent classification?`,
       opts:[
         {t:`Define explicit severity criteria with concrete code examples for each level, so the model anchors on demonstrated cases rather than abstract adjectives.`, ok:true},
         {t:`Ask the model to explain its severity choice, which forces more careful classification.`},
         {t:`Remove the minor level so there are fewer boundaries to confuse.`},
         {t:`Average the severity across three runs for each finding.`}],
       hint:`"serious problems"라는 형용사가 문제야. 심각도 정의에 뭘 붙이라고 했었지?`,
       explain:{
         good:`가이드 4.1: 심각도 일관성은 레벨마다 구체적 코드 예시를 붙일 때 나와. 형용사 정의는 해석이 매번 달라져.`,
         wrongs:[
           `<b>B:</b> 설명 요구는 사후 합리화를 늘릴 뿐 기준을 만들지 않아.`,
           `<b>C:</b> 경계를 줄여도 남은 경계가 흔들리는 건 같아.`,
           `<b>D:</b> 세 번 돌려 평균 — 비용 3배로 비일관성을 가리는 증상 처치.`,
         ]},
       principle:"추상 형용사 대신 실물 예시"},
    ]},

  /* ===== CH 2 · 4.2 few-shot ===== */
  { id:"p4c2", ch:"CH 2", title:"few-shot 프롬프팅 (4.2)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"예시는 지시보다 강하다",
       html:`<h4>few-shot이 1순위가 되는 조건</h4>
        <ul>
          <li>상세 지시로도 <strong>형식·판단이 들쭉날쭉</strong>할 때 — 일관성 확보의 최고 효과 수단</li>
          <li>핵심은 양이 아니라 조준: <strong>2~4개의 타겟된 예시</strong></li>
        </ul>
        <h4>무엇을 예시로 골라야 하나</h4>
        <ul>
          <li><strong>애매한 케이스</strong> — 명백한 케이스 예시는 낭비</li>
          <li>왜 그 행동을 골랐는지 <strong>이유(추론)까지 포함</strong> — 판단 기준이 전이됨</li>
        </ul>
        <h4>few-shot의 힘: 일반화</h4>
        <ul>
          <li>예시와 똑같은 케이스만 처리하는 게 아니라 <strong>새로운 패턴으로 일반화</strong></li>
          <li>추출 과제에선 환각 감소 효과 — 다양한 문서 구조 대응력</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"few-shot 설계 시나리오 3종",
       html:`__MAP4:fewshot__<h4>① 도구 선택이 애매할 때</h4>
        <ul>
          <li>애매한 요청 → 어떤 도구 + <strong>왜 그쪽인지</strong>를 보여주는 예시 2~4개</li>
        </ul>
        <h4>② 출력 형식 통일</h4>
        <ul>
          <li>위치·이슈·심각도·수정 제안 — 원하는 형식 그대로의 예시 제시</li>
        </ul>
        <h4>③ 오탐 감소와 문서 구조 대응</h4>
        <ul>
          <li>수용 가능한 코드 패턴 vs 진짜 이슈를 <strong>대비쌍</strong>으로 — 오탐이 줄면서 일반화는 유지</li>
          <li>인라인 인용 vs 참고문헌, 서술형 vs 표 — <strong>구조가 다른 문서들의 추출 예시</strong>로 null 추출·환각 감소</li>
        </ul>
        <div class="callout">🎯 시험 포인트: few-shot과 4.1 명시 기준의 관계 — 기준이 판단선을 긋고, 예시가 그 선의 실물을 보여줘. "규칙+애매 케이스 예시" 조합이 자주 정답.</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1 — Auditing the example set",
       q:`Your routing agent's prompt contains six few-shot examples, all shaped like: "Customer: 'I want a refund for order #123, it arrived broken.' → Action: process_refund. ✓" Production tickets show it still flails on messages like "this isn't really what I imagined it would be..." A teammate proposes doubling the example set to twelve in the same style. What is the correct assessment?`,
       opts:[
         {t:`The set teaches nothing the model doesn't already do well: replace it with 2-4 ambiguous-case examples that include the reasoning for why one action beat the plausible alternatives — that's what generalizes to novel gray-zone messages.`, ok:true},
         {t:`Approve the proposal — more demonstrations of correct behavior strengthen the pattern regardless of case difficulty.`},
         {t:`The examples are fine but mislabeled; adding an explicit "difficulty: easy" tag to each will help the model calibrate.`},
         {t:`Few-shot has hit its ceiling here; the gray-zone cases need a fine-tuned classifier trained on labeled tickets.`},
       ],
       hint:`여섯 예시의 공통점을 봐 — 전부 명백한 케이스지? 모델이 이미 잘하는 걸 여섯 번 보여주고 있었어. 예시에 빠져 있는 건 '이유'야.`,
       explain:{
         good:`4.2의 조준 원칙: 예시의 가치는 개수가 아니라 위치(애매한 경계)와 내용(선택 이유). 명백한 케이스 12개는 6개와 같은 걸 가르쳐 — 아무것도. 이유가 담긴 애매 케이스 2~4개가 새 패턴으로 일반화돼.`,
         wrongs:[
           `<b>B — 같은 스타일 2배:</b> "더 많이"가 함정 — 이미 잘하는 영역의 강화는 경계 판단을 한 뼘도 못 옮겨.`,
           `<b>C — 난이도 태그:</b> 발명된 메커니즘 — 태그가 없는 판단 기준을 만들어주지 않아.`,
           `<b>D — 파인튜닝:</b> few-shot의 천장이 아니라 few-shot의 오사용이었어 — 조준을 고치기 전에 ML 인프라부터 꺼내는 과잉.`,
         ]},
       principle:"예시는 개수가 아니라 조준"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2 — The empty fields",
       q:`Your extraction pipeline processes research papers with wildly different structures — some use inline citations, others bibliographies; some have methodology sections, others embed methods in results. Required fields often come back null even when the information exists in the document. What is the best fix?`,
       opts:[
         {t:`Add few-shot examples demonstrating correct extraction from documents with varied structures — one with inline citations, one with a bibliography, one with embedded methodology.`, ok:true},
         {t:`Make all fields required in the schema so the model is forced to find values.`},
         {t:`Preprocess every paper into a single normalized format before extraction.`},
         {t:`Raise max_tokens so the model has room to search the document more thoroughly.`}],
       hint:`정보는 있는데 못 찾는 이유가 "문서 구조가 다양해서"야. 구조 다양성에 대응하는 few-shot 사용처가 있었지?`,
       explain:{
         good:`가이드 4.2 명시: 형식이 다양한 문서들의 추출 예시가 구조 변형 대응력을 만들어 null 추출을 줄여. 각 구조 유형별로 한 예시씩.`,
         wrongs:[
           `<b>B:</b> required 강제는 정보가 진짜 없을 때 지어내기(환각)를 유발 — 4.3에서 nullable이 정답인 이유.`,
           `<b>C:</b> 정규화 전처리기를 만드는 건 그 자체가 대형 프로젝트 — 과잉 설계.`,
           `<b>D:</b> 출력 길이는 탐색 능력과 무관.`,
         ]},
       principle:"구조 다양성은 예시로 가르친다"},
    ]},

  /* ===== CH 3 · 4.3 tool_use 스키마 ===== */
  { id:"p4c3", ch:"CH 3", title:"tool_use와 JSON 스키마로 출력 강제 (4.3)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"양식지를 쥐여주면 형식은 보장된다",
       html:`<div class="callout">📖 용어 카드 — <b>JSON 스키마</b>: 출력의 빈칸 양식. <b>required</b> = 필수 기입란, <b>nullable</b> = 비워도 되는 란, <b>enum</b> = 보기 중 선택.</div>
        <h4>왜 tool_use인가</h4>
        <ul>
          <li>추출 도구를 정의하고 스키마를 입력 파라미터로 → 모델의 tool_use 응답에서 구조화 데이터를 꺼냄</li>
          <li>효과: <strong>JSON 문법 오류 제거</strong> — 스키마 준수가 보장됨</li>
          <li>한계: <strong>의미 오류는 못 막음</strong> (합계 불일치, 값이 엉뚱한 필드에)</li>
        </ul>
        <h4>tool_choice 복습 (D2 Ch3과 연결)</h4>
        <ul>
          <li>"auto" — 텍스트로 샐 수 있음 / "any" — 어떤 도구든 강제 / 지정 — 특정 도구 강제</li>
          <li>문서 유형을 모르고 추출 스키마가 여러 개 → <strong>"any"</strong></li>
          <li>특정 추출이 반드시 먼저 → <strong>강제 지정</strong></li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"지어내지 못하게 만드는 스키마 설계",
       html:`__MAP4:schema__<h4>① nullable — 환각 방지의 핵심</h4>
        <ul>
          <li>원본에 없을 수 있는 정보를 <strong>required로 두면 모델이 값을 지어냄</strong></li>
          <li>처방: optional(nullable)로 → 없으면 null을 반환하게</li>
        </ul>
        <h4>② enum 확장 패턴</h4>
        <ul>
          <li>애매한 케이스용 <code>"unclear"</code> 값 추가</li>
          <li>분류가 열려 있으면 <code>"other"</code> + <strong>상세 문자열 필드</strong> 조합</li>
        </ul>
        <h4>③ 정규화 규칙은 프롬프트에 동봉</h4>
        <ul>
          <li>원본 형식이 제각각(전화번호, 날짜, 통화)이면 <strong>형식 정규화 규칙을 스키마와 함께</strong> 프롬프트에</li>
        </ul>
        <div class="callout">🎯 시험 포인트: "스키마를 strict로 하면 다 해결" 보기 조심 — strict는 <b>문법</b>만 보장, 합계·필드 배치 같은 <b>의미</b>는 4.4의 검증 루프가 담당.</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1 — Schema post-mortem",
       q:`A schema review after three production incidents. The schema: every field required; product_category is enum ["electronics","clothing","food"]; dates are free-form strings. The incidents: (1) fabricated supplier_tax_id values on documents that lack one; (2) a niche automotive part classified as "food"; (3) the same delivery date extracted as "3/4/25", "2025-04-03", and "April 3rd" across documents. Which single schema revision addresses all three?`,
       opts:[
         {t:`Make fields that may be absent optional/nullable; extend the enum with "other" plus a detail string and an "unclear" value; and add explicit format-normalization rules to the prompt alongside the schema.`, ok:true},
         {t:`Keep all fields required for data completeness, but add prompt warnings: "never fabricate values, never force categories, always use ISO dates."`},
         {t:`Convert every field to free-form strings so the model is never forced into a wrong structure.`},
         {t:`Enable strict schema mode, which rejects fabricated values, wrong categories, and malformed dates at the API level.`},
       ],
       hint:`세 사고 = 세 가지 설계 결함 (필수 강제 / 출구 없는 enum / 정규화 규칙 부재). 하나씩만 고치는 보기와 셋 다 고치는 보기를 가려. D는 strict가 '무엇을' 보장하는지 아는지 묻는 함정이야.`,
       explain:{
         good:`사고와 처방의 1:1 매핑: 환각 ← required+부재 → nullable / 강제 분류 ← 닫힌 enum → other+detail, unclear / 형식 난립 ← 규칙 부재 → 프롬프트에 정규화 규칙 동봉. 4.3의 세 설계 원칙을 한 스키마에서 조립하는 문제야.`,
         wrongs:[
           `<b>B — required 유지 + 경고문:</b> 구조가 강요하는 걸 지시로 막는 확률전 — 첫 사고의 원인 구조가 그대로.`,
           `<b>C — 전부 자유 문자열:</b> 구조화의 목적 포기 — 다운스트림 검증·집계가 전멸해.`,
           `<b>D — strict 모드:</b> strict는 '문법'만 보장 — 지어낸 값도, 틀린 분류도 문법적으론 유효해서 통과해. 절반의 진실 함정.`,
         ]},
       principle:"사고마다 결함이 다르면 처방도 셋"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2 — Unknown document types",
       q:`Your pipeline receives mixed documents — invoices, contracts, and shipping manifests — and has three extraction tools (extract_invoice, extract_contract, extract_manifest), each with its own schema. The document type is unknown at request time, and the response must always be structured output, never conversational text. Which tool_choice configuration is correct?`,
       opts:[
         {t:`tool_choice: "any" — the model must call one of the tools and can pick the schema matching the document it sees.`, ok:true},
         {t:`tool_choice: {"type": "tool", "name": "extract_invoice"} — force the most common type.`},
         {t:`tool_choice: "auto" with a prompt instruction to always use a tool.`},
         {t:`Run all three tools on every document and keep whichever output validates.`}],
       hint:`요구 둘: ①반드시 도구 호출 ②어느 도구인지는 모델이 문서를 보고 판단. 이 조합의 설정값이 뭐였지?`,
       explain:{
         good:`"반드시 도구, 단 선택은 모델이" = "any". 문서 유형 판단은 모델이 제일 잘하고, 텍스트로 새는 건 구조적으로 차단돼 (가이드 4.3 명시 케이스).`,
         wrongs:[
           `<b>B:</b> 계약서에 인보이스 양식을 강제 — 다수 유형이라고 전부는 아니야.`,
           `<b>C:</b> auto + 지시는 확률적 — 대화 텍스트로 샐 길이 남아.`,
           `<b>D:</b> 호출 3배 비용 + "검증 통과"가 정확성 보장이 아니야 (문법 통과 ≠ 맞는 추출).`,
         ]},
       principle:"보장 수준 → tool_choice 매칭"},
    ]},

  /* ===== CH 4 · 4.4 검증·재시도 ===== */
  { id:"p4c4", ch:"CH 4", title:"검증·재시도·피드백 루프 (4.4)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"틀렸으면 뭐가 틀렸는지 알려주고 다시",
       html:`<div class="callout">📖 용어 카드 — <b>Pydantic</b>: 파이썬의 양식 검사기. 출력이 스키마에 맞는지 자동 대조하고 틀린 지점을 알려줌. <b>의미 오류 vs 문법 오류</b>: 문법(괄호 빠짐, 타입 틀림)은 tool_use가 제거 — 의미(합계 불일치, 필드 뒤바뀜)는 검증 루프의 몫.</div>
        <h4>retry-with-error-feedback</h4>
        <ul>
          <li>재시도 요청에 3종 세트 동봉: <strong>원본 문서 + 실패한 추출 + 구체적 검증 오류</strong></li>
          <li>"다시 해봐"가 아니라 "여기가 이렇게 틀렸어, 다시"</li>
        </ul>
        <h4>재시도의 한계 (시험 단골)</h4>
        <ul>
          <li>통하는 경우: <strong>형식 불일치, 구조 오류</strong> — 고칠 재료가 문서 안에 있음</li>
          <li>안 통하는 경우: <strong>정보가 원본에 아예 없음</strong> (외부 문서에만 존재) — 몇 번을 돌려도 없음</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"루프를 시스템으로 — 자기 검증과 패턴 추적",
       html:`__MAP4:validate__<h4>① 자기 검증 필드 설계</h4>
        <ul>
          <li><code>calculated_total</code>(항목 합산)과 <code>stated_total</code>(문서 기재)을 <strong>나란히 추출</strong> → 불일치를 플래그</li>
          <li>원본 데이터 자체가 모순이면 <code>conflict_detected</code> 불리언으로 표시</li>
        </ul>
        <h4>② detected_pattern — 오탐의 계보 추적</h4>
        <ul>
          <li>발견마다 <strong>어떤 코드 구조가 트리거했는지</strong> 기록하는 필드</li>
          <li>개발자가 기각(dismiss)한 발견들을 패턴별로 분석 → 체계적 오탐 제거</li>
        </ul>
        <h4>③ 재시도 판단 순서</h4>
        <ul>
          <li>실패 발견 → <strong>원인 분류부터</strong>: 형식/구조 문제인가, 정보 부재인가</li>
          <li>정보 부재면 재시도 대신 null 허용·인간 라우팅 등 <strong>다른 경로</strong></li>
        </ul>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1 — The 12% retry loop",
       q:`A teammate implemented the validation-retry loop: on Pydantic failure, it re-prompts with only "Your previous output had validation errors. Please fix them and try again." Retry success rate: 12%. He proposes raising max retries from 2 to 6 since "each attempt is another chance." What is the correct diagnosis?`,
       opts:[
         {t:`The retry prompt gives the model nothing to work with — include the original document, the failed extraction, and the specific validation errors; with that feedback, format-level failures typically resolve in one retry, making 6 attempts unnecessary.`, ok:true},
         {t:`12% is within normal range for retry loops; raising the cap to 6 attempts compounds the odds to an acceptable success rate.`},
         {t:`Retries should use a stronger model tier — validation failures signal the base model has reached its capability limit.`},
         {t:`The loop should lower temperature on each successive retry so outputs converge toward validity.`},
       ],
       hint:`"고쳐라"만 받은 모델의 입장이 돼봐 — 뭘 고쳐야 하는지 알 수 있어? 12%는 사실상 우연 재추첨의 성공률이야.`,
       explain:{
         good:`4.4의 재시도 공식이 통째로 빠졌어: 원본 + 실패 출력 + 구체적 오류. 정보 없는 재시도는 재추첨이라 12%가 나오는 거고, 정보를 주면 형식 오류는 보통 1회에 풀려 — 횟수를 늘리는 게 아니라 각 회의 정보량을 늘리는 문제야.`,
         wrongs:[
           `<b>B — 확률 누적론:</b> 그럴듯한 수학이지만 각 시도가 눈먼 재추첨이라는 전제를 받아들이는 것 — 비용 3배로 운을 사는 설계.`,
           `<b>C — 모델 티어:</b> 능력 한계 증거가 없어 — 피드백 없는 프롬프트는 어느 모델에게도 불충분해.`,
           `<b>D — temperature 하강:</b> 수렴할 목표 정보가 없는데 분산만 줄이면 같은 오답으로 수렴할 뿐.`,
         ]},
       principle:"횟수가 아니라 정보 — 재시도 3종 세트"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2 — When retries can't win",
       q:`Two recurring extraction failures: (a) supplier_tax_id is empty because it only appears in a separate registration document your pipeline never receives; (b) invoice line items sometimes don't sum to the stated total. Which handling is correct?`,
       opts:[
         {t:`(a) is unfixable by retry — the information isn't in the source, so allow null or route for human input; (b) needs a self-correction design — extract calculated_total alongside stated_total and flag discrepancies.`, ok:true},
         {t:`Retry both with error feedback — the model will eventually find the tax ID and fix the sums.`},
         {t:`(a) needs more retries with higher temperature for creativity; (b) should be silently auto-corrected to the calculated sum.`},
         {t:`Mark both documents as corrupt and exclude them from the pipeline.`}],
       hint:`(a)의 정보는 어디에 있지? 파이프라인이 받는 문서 안? 밖? 재시도의 한계 조건이 뭐였지?`,
       explain:{
         good:`재시도 가능/불가 판별 + 자기 검증 설계의 결합. (a)는 정보 부재 — 몇 번을 돌려도 없는 건 없어. (b)는 calculated vs stated 나란히 추출해 불일치를 플래그하는 가이드 패턴.`,
         wrongs:[
           `<b>B:</b> "언젠간 찾겠지"는 환각을 기다리는 것 — 없는 정보의 재시도는 낭비이자 위험.`,
           `<b>C:</b> temperature로 창의성을 올리면 지어낼 뿐. 자동 무음 보정은 원본 모순을 숨겨.`,
           `<b>D:</b> 문서는 멀쩡해 — 파이프라인 설계가 한계인 것.`,
         ]},
       principle:"재시도 한계 판별 + 자기 검증 필드"},
    ]},

  /* ===== CH 5 · 4.5 배치 처리 ===== */
  { id:"p4c5", ch:"CH 5", title:"배치 처리 전략 — Batches API (4.5)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"반값의 대가는 기다림",
       html:`<h4>Message Batches API 스펙 (숫자 암기)</h4>
        <ul>
          <li>비용 <strong>50% 절감</strong> (모든 사용량이 표준 단가의 절반)</li>
          <li>처리 시간 <strong>최대 24시간</strong> — <strong>지연 보장(SLA) 없음</strong> (대부분 1시간 안에 끝나지만 '대부분'은 약속이 아님). 24시간 안에 못 끝낸 요청은 <strong>expired</strong> 처리되고 과금 안 됨</li>
          <li><code>custom_id</code>로 요청-응답 짝 맞추기 — <strong>결과는 제출 순서와 무관하게 돌아오므로</strong> 이게 유일한 매칭 수단. 형식: 영숫자·하이픈·언더스코어 1~64자</li>
          <li><strong>배치 요청 안에서 멀티턴 도구 호출 불가</strong> — 중간에 내 도구를 실행하고 결과 받는 흐름은 못 씀 (시험 가이드 명시)</li>
        </ul>
        <h4>공식 문서의 운영 디테일</h4>
        <ul>
          <li>배치 한도: <strong>10만 건 또는 256MB</strong> 중 먼저 닿는 것</li>
          <li>결과 보관: 생성 후 <strong>29일</strong> — 이후엔 다운로드 불가</li>
          <li>결과 4상태: succeeded / errored / canceled / expired — 실패·취소·만료분은 과금 없음</li>
          <li>상태 추적: <code>processing_status</code>가 in_progress → ended</li>
        </ul>
        <h4>적합 vs 부적합</h4>
        <ul>
          <li>✅ 논블로킹·지연 허용: 야간 리포트, 주간 감사, 야간 테스트 생성</li>
          <li>❌ 블로킹: <strong>머지 전 검사</strong>처럼 사람이 결과를 기다리는 흐름</li>
        </ul>
        <div class="callout">📖 용어 카드 — <b>SLA</b>: "언제까지 끝내준다"는 서비스 약속. Batches API엔 이 약속이 없어서 "보통 빨리 끝나던데"에 기대면 안 됨.</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"배치 운영의 세 가지 계산",
       html:`__MAP4:batch__<h4>① 워크플로 분류부터</h4>
        <ul>
          <li>같은 시스템 안에서도 <strong>블로킹은 실시간, 논블로킹은 배치</strong>로 분리 (샘플 11번)</li>
        </ul>
        <h4>② SLA 역산</h4>
        <ul>
          <li>배치 최대 24시간 + 서비스 SLA 30시간 → <strong>여유 6시간</strong> → 4시간 간격 제출이면 안전</li>
          <li>공식: 제출 주기 ≤ (서비스 SLA − 배치 최대 처리시간)</li>
        </ul>
        <h4>③ 실패 처리와 사전 다듬기</h4>
        <ul>
          <li>실패분만 <code>custom_id</code>로 식별해 <strong>수정 후 재제출</strong> (컨텍스트 초과 문서는 청킹)</li>
          <li>대량 처리 전 <strong>샘플로 프롬프트 먼저 다듬기</strong> → 1차 통과율 극대화 = 재제출 비용 최소화</li>
        </ul>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1 — The 9 AM deadline",
       q:`Your compliance team needs 20,000 documents scanned nightly, results ready by a hard 9:00 AM regulatory deadline. Documents finish arriving at 11:00 PM. An engineer proposes the Batches API for the 50% savings: "submit at 11 PM, batches usually finish in 2-3 hours." Finance loves it. What is the correct evaluation?`,
       opts:[
         {t:`Reject it as designed: the 11 PM → 9 AM window is 10 hours, but batch processing can take up to 24 hours with no latency SLA — "usually 2-3 hours" cannot back a hard regulatory deadline. Keep synchronous processing, or renegotiate the deadline before touching batches.`, ok:true},
         {t:`Approve it but move submission to noon, giving the batch 21 hours before the deadline — comfortably inside the 24-hour maximum.`},
         {t:`Approve it with monitoring: poll the batch hourly and alert the team if it's still running at 6 AM.`},
         {t:`Approve it with the workload split into four smaller 5,000-document batches, since smaller batches complete proportionally faster.`},
       ],
       hint:`"usually"는 SLA가 아니야. 그리고 B의 21시간도 다시 봐 — 최대치가 24시간인데 21시간이면 보장이 생기나? 문서가 언제 다 모이는지도.`,
       explain:{
         good:`4.5의 역산이 성립하려면 '대기 + 최대 처리시간 ≤ 마감'이어야 해. 10시간이든 21시간이든 24시간 최대치보다 짧으면 보장은 없어 — 게다가 정오 제출은 문서가 밤 11시에야 다 모인다는 사실과도 모순. 규제 마감 = 블로킹 워크로드, 배치 부적격.`,
         wrongs:[
           `<b>B — 정오 제출:</b> 이중 함정 — 21 < 24라 여전히 무보장 + 그 시각엔 스캔할 문서 자체가 없어.`,
           `<b>C — 모니터링:</b> 오전 6시에 미완료를 '알게' 될 뿐 — 3시간 안에 2만 건을 처리할 플랜 B가 없으면 경보는 장식이야.`,
           `<b>D — 배치 분할:</b> "작으면 빨리 끝난다"는 보장 규정이 아니야 — 각 배치가 여전히 최대 24시간.`,
         ]},
       principle:"마감 < 최대 처리시간이면 배치 불가"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2 — The 30-hour promise",
       q:`Your document service promises customers results within 30 hours of upload. You batch-process uploads with the Batches API (up to 24h per batch). Some documents fail on first pass (oversized ones exceed context limits) and need resubmission. Which operating design meets the SLA?`,
       opts:[
         {t:`Submit batches every 4 hours; identify failures by custom_id and resubmit them promptly with fixes (e.g., chunking oversized documents) — the 6-hour margin covers one resubmission cycle only if submissions are frequent.`, ok:true},
         {t:`Submit one batch daily at midnight; 24 hours of processing still fits inside 30 hours.`},
         {t:`Submit continuously but rely on batches typically finishing within 2-3 hours.`},
         {t:`Switch failed documents to the real-time API but keep daily batch submission for the rest.`}],
       hint:`업로드가 배치 제출 직후에 들어온 문서를 생각해봐. 하루 한 번 제출이면 그 문서는 최악의 경우 몇 시간 만에 처리돼?`,
       explain:{
         good:`가이드 4.5의 SLA 역산: 제출 간격이 길면 대기시간이 SLA를 잡아먹어. 4시간 간격이면 대기 4h + 처리 24h = 28h < 30h. 실패분은 custom_id로 골라 청킹 후 재제출.`,
         wrongs:[
           `<b>B:</b> 자정 직후 업로드된 문서는 대기 24h + 처리 24h = 최대 48h — SLA 붕괴.`,
           `<b>C:</b> "typically"는 SLA가 아니야 — 24시간 케이스 하나면 약속 위반.`,
           `<b>D:</b> 실패분 실시간 전환은 비용 절감 목적과 어긋나고, 근본 원인(제출 주기·청킹)을 안 고쳐.`,
         ]},
       principle:"SLA 역산 — 대기 + 처리 ≤ 약속"},
    ]},

  /* ===== CH 6 · 4.6 다중 인스턴스 리뷰 ===== */
  { id:"p4c6", ch:"CH 6", title:"다중 인스턴스·다중 패스 리뷰 (4.6)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"자기가 쓴 글은 자기가 못 고친다",
       html:`<h4>자기 리뷰(self-review)의 구조적 한계</h4>
        <ul>
          <li>생성한 세션엔 <strong>생성 당시의 추론 맥락</strong>이 남아 있음</li>
          <li>그 맥락이 "내 결정은 옳았지"라는 편향으로 작동 → <strong>자기 결정을 의심하지 못함</strong></li>
          <li>"더 신중히 리뷰해" 지시나 extended thinking으로도 <strong>극복 안 됨</strong> — 맥락 자체가 문제라서</li>
        </ul>
        <h4>처방: 독립 리뷰 인스턴스</h4>
        <ul>
          <li>생성자의 추론 맥락이 <strong>없는 별도 세션</strong>이 미묘한 이슈를 더 잘 잡음</li>
          <li>D3 Ch6의 "CI에서 생성 세션 ≠ 리뷰 세션"과 같은 원리</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"패스를 나누고, 신뢰도를 달아라",
       html:`__MAP4:review__<h4>① 다중 패스 (1.6·3.6과 연결)</h4>
        <ul>
          <li>대형 리뷰 = <strong>파일별 로컬 분석 패스</strong> + <strong>파일 간 통합 패스</strong></li>
          <li>효과: 주의력 희석 방지 + 모순된 피드백 제거</li>
        </ul>
        <h4>② 신뢰도 자기 보고 라우팅</h4>
        <ul>
          <li>발견마다 <strong>신뢰도를 함께 보고</strong>하게 → 보정(calibration) 후 리뷰 라우팅에 활용</li>
          <li>주의: 자기 보고 신뢰도는 <strong>보정 없이는 신뢰 불가</strong> (5.5에서 심화)</li>
        </ul>
        <div class="callout">🎯 시험 포인트: "같은 세션에 self-review 지시 추가", "extended thinking으로 해결", "더 큰 모델로 교체"가 3대 오답 장치. 정답 축은 독립 인스턴스와 패스 분리.</div>`},
      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice 1 — The seeded-bug experiment",
       q:`Your team ran an experiment on 50 code changes with deliberately seeded bugs. Same-session self-review caught 14%; same-session with extended thinking caught 18%; a fresh instance receiving only the diff and review criteria caught 71%. A senior engineer argues the extended-thinking number "just proves we need better self-review prompts — the model clearly can reason deeply." How should you read this data?`,
       opts:[
         {t:`The 18% vs 71% gap is structural, not prompt-quality: the generating session retains its reasoning context and defends its own decisions, and deeper thinking inside that context mostly deepens the self-justification. Ship the independent-instance design.`, ok:true},
         {t:`The engineer is right — extended thinking improved results by 4 points, so iterating on self-review prompts should close the remaining gap.`},
         {t:`All three numbers are too low to trust; rerun the experiment with more seeded bugs before deciding anything.`},
         {t:`Combine approaches: run extended-thinking self-review first, then the independent instance, and union the findings for maximum coverage.`},
       ],
       hint:`4%p 개선과 53%p 격차 — 하나는 조정의 여지, 하나는 구조의 벽이야. extended thinking이 '어느 맥락 안에서' 생각하는지가 핵심.`,
       explain:{
         good:`4.6의 원리를 데이터로 읽는 문제: 자기 리뷰의 한계는 생성 맥락 그 자체라 지시·사고 깊이로 못 넘어. 71%는 맥락 제거의 효과 — 프롬프트 개선으로 18%를 71%로 만들 수 없어.`,
         wrongs:[
           `<b>B — 4포인트 희망론:</b> 절반의 진실 함정 — 개선은 사실이지만 같은 축 위의 미세 조정이라 구조적 격차(53%p)에 못 닿아.`,
           `<b>C — 재실험:</b> 50건에서 14/18/71의 방향성은 명확 — 결정을 미루는 비용이 더 커.`,
           `<b>D — 유니온:</b> 그럴듯하지만 자기 리뷰의 추가분이 거의 없어(71%의 부분집합에 가까움) — 비용 2배에 이득은 오차 수준. 독립 인스턴스 단독이 비례에 맞아.`,
         ]},
       principle:"조정의 여지 vs 구조의 벽을 가려라"},
      {type:"quiz", kind:"PRACTICE · 실전형 변형", h:"Practice 2 — Calibrated routing",
       q:`Your review bot now runs as an independent instance and produces good findings, but human reviewers can't keep up with the volume. You want to route only the findings that most need human eyes. Which design follows best practice?`,
       opts:[
         {t:`Have the model self-report a confidence score alongside each finding, calibrate those scores against a labeled validation set, then route low-confidence findings to human review.`, ok:true},
         {t:`Route findings to humans randomly at a fixed 20% sampling rate.`},
         {t:`Trust the model's raw confidence scores as-is and route anything below 0.7.`},
         {t:`Route only critical-severity findings and auto-accept the rest.`}],
       hint:`신뢰도 점수를 쓰긴 쓰는데, 쓰기 전에 반드시 거쳐야 하는 단계가 있었지?`,
       explain:{
         good:`신뢰도 자기 보고 → 라벨된 검증 세트로 보정 → 라우팅. 보정 단계가 핵심 — 원시 자기 보고 점수는 과신 편향이 있어 (가이드 4.6 + 5.5 연결).`,
         wrongs:[
           `<b>B:</b> 무작위 표집은 모니터링용이지 라우팅 기준이 아니야 — 위험한 발견이 80% 확률로 무검토 통과.`,
           `<b>C:</b> 보정 없는 원시 점수 신뢰가 바로 그 함정 — 0.7이 실제 정확도와 무관할 수 있어.`,
           `<b>D:</b> 심각도와 불확실성은 다른 축 — 확신 없는 minor 발견도 사람이 봐야 해.`,
         ]},
       principle:"신뢰도는 보정 후에만 라우팅 기준"},
    ]},

  /* ===== D4 미니테스트 ===== */
  { id:"p4test", type:"test", title:"D4 미니테스트 — 프롬프트 & 구조화 출력 12문항",
    questions:[
    {ts:"4.1", lvl:"기초", q:`Which instruction style most improves precision in an automated review prompt?`,
     opts:[
       {t:`Explicit categorical criteria: "flag comments only when the claimed behavior contradicts the actual code behavior."`, ok:true},
       {t:`"Be conservative and only report issues you are highly confident about."`},
       {t:`"Review carefully and thoroughly, considering all edge cases."`},
       {t:`"Act as a world-class senior reviewer with 20 years of experience."`}],
     explain:{good:`정밀도는 판단선(무엇을 보고/스킵)의 명시에서 나와 — 형용사가 아니라 범주 기준.`,
       wrongs:[`<b>B:</b> "보수적으로"는 판단선이 없어 — 가이드가 명시한 실패 사례.`,`<b>C:</b> 신중함 지시도 동일.`,`<b>D:</b> 역할 부여는 기준을 만들지 않아.`]},
     principle:"기준은 범주로"},
    {ts:"4.1", lvl:"실전", q:`After you disabled the style category (80% FP) and improved its prompt, you must decide when to re-enable it. Which re-enablement criterion is most sound?`,
     opts:[
       {t:`Re-enable after the improved prompt demonstrates an acceptable false-positive rate on a labeled test set of past PRs.`, ok:true},
       {t:`Re-enable after two weeks — enough time for developers to forget the bad experience.`},
       {t:`Re-enable immediately but mark style findings as "beta" so developers discount them.`},
       {t:`Keep it disabled permanently; style findings are inherently low-value.`}],
     explain:{good:`재활성 조건은 시간이 아니라 증거 — 라벨된 세트에서 오탐률 개선을 확인한 뒤. 신뢰는 데이터로 회복해.`,
       wrongs:[`<b>B:</b> 시간은 오탐률을 안 바꿔 — 같은 경험이 반복되면 신뢰는 영구 손상.`,`<b>C:</b> "beta" 딱지는 무시해도 된다는 신호 — 노이즈 재공급.`,`<b>D:</b> 개선 가능성을 검증도 없이 포기.`]},
     principle:"재활성은 검증 데이터로"},
    {ts:"4.2", lvl:"기초", q:`What kind of cases should few-shot examples target to improve an agent's judgment?`,
     opts:[
       {t:`Ambiguous cases, with the reasoning for why one action was chosen over plausible alternatives.`, ok:true},
       {t:`The most common, clear-cut cases the agent already handles well.`},
       {t:`Randomly sampled production cases for statistical coverage.`},
       {t:`Only failure cases, to teach the agent what not to do.`}],
     explain:{good:`가이드 4.2: 애매한 케이스 + 선택 이유 — 그래야 판단 기준이 새 패턴으로 일반화돼.`,
       wrongs:[`<b>B:</b> 잘하는 걸 더 가르치는 낭비.`,`<b>C:</b> 무작위는 조준이 없어.`,`<b>D:</b> 부정 예시만으론 뭘 해야 하는지 몰라.`]},
     principle:"애매 케이스 + 이유"},
    {ts:"4.2", lvl:"실전", q:`Your code reviewer flags legitimate project-specific patterns (e.g., intentional empty catch blocks with logging decorators) as bugs. You need fewer false positives without missing real empty-catch bugs. What is the best few-shot design?`,
     opts:[
       {t:`Contrast pairs: examples of the acceptable project pattern labeled "do not flag," alongside genuinely buggy empty catches labeled "flag," with the distinguishing reasoning.`, ok:true},
       {t:`Examples of only the acceptable pattern, so the model learns to skip empty catches.`},
       {t:`A rule: "never flag empty catch blocks in this project."`},
       {t:`More examples of unrelated real bugs to strengthen general bug detection.`}],
     explain:{good:`가이드 4.2: 수용 가능한 패턴 vs 진짜 이슈를 대비쌍으로 — 오탐은 줄고 실제 버그 탐지(일반화)는 유지.`,
       wrongs:[`<b>B:</b> 스킵만 가르치면 진짜 빈 catch 버그도 놓쳐.`,`<b>C:</b> 전면 금지 규칙은 실제 버그까지 침묵 — 범주를 통째로 끄는 과잉.`,`<b>D:</b> 무관한 예시는 이 경계 문제를 못 풀어.`]},
     principle:"대비쌍 — 경계의 양쪽을 보여줘라"},
    {ts:"4.3", lvl:"기초", q:`What does using tool_use with a strict JSON schema guarantee — and what does it not guarantee?`,
     opts:[
       {t:`It eliminates JSON syntax errors, but does not prevent semantic errors like line items that don't sum to the stated total.`, ok:true},
       {t:`It guarantees both syntactic and semantic correctness of the output.`},
       {t:`It prevents hallucinated values in required fields.`},
       {t:`It guarantees the model will always choose the correct extraction tool.`}],
     explain:{good:`구조(문법)는 보장, 의미는 비보장 — 의미 검증은 4.4의 루프가 담당.`,
       wrongs:[`<b>B:</b> 의미 오류는 스키마가 못 잡아.`,`<b>C:</b> required + 정보 부재는 오히려 환각 유발 — nullable이 처방.`,`<b>D:</b> 도구 선택은 tool_choice·설명의 영역.`]},
     principle:"문법 보장 ≠ 의미 보장"},
    {ts:"4.3", lvl:"실전", q:`Your product-category field uses enum: ["electronics", "clothing", "food"]. Two failure modes: niche products get forced into wrong categories, and genuinely ambiguous items get inconsistent labels across runs. Which schema evolution is correct?`,
     opts:[
       {t:`Add "other" with a companion detail string field for products outside the fixed list, and an "unclear" value for genuinely ambiguous cases.`, ok:true},
       {t:`Expand the enum to 40 fine-grained categories so everything fits somewhere.`},
       {t:`Remove the enum and accept free-text categories for flexibility.`},
       {t:`Keep the enum and add a prompt instruction to "choose the closest category."`}],
     explain:{good:`가이드 4.3의 enum 확장 패턴 그대로: "other"+상세 문자열(확장 가능 분류) + "unclear"(애매 케이스). 강제 분류와 비일관 라벨이 동시에 풀려.`,
       wrongs:[`<b>B:</b> 40개로 늘려도 41번째 제품이 나와 — 근본 구조가 안 바뀜.`,`<b>C:</b> 자유 텍스트는 다운스트림 집계 불가 — 구조화의 목적 포기.`,`<b>D:</b> "closest"는 틀린 분류를 지시로 승인하는 것.`]},
     principle:"enum엔 출구를 — other + unclear"},
    {ts:"4.4", lvl:"기초", q:`Which failure type can a retry-with-error-feedback loop fix?`,
     opts:[
       {t:`Format mismatches and structural output errors — the correct information exists in the document.`, ok:true},
       {t:`Information that exists only in an external document not provided to the model.`},
       {t:`Contradictions inside the source document itself.`},
       {t:`Network timeouts during the extraction call.`}],
     explain:{good:`재시도는 문서 안에 재료가 있을 때만 통해 — 형식·구조 오류가 그 경우.`,
       wrongs:[`<b>B:</b> 없는 정보는 몇 번을 돌려도 없어 — 재시도 무용의 대표 케이스.`,`<b>C:</b> 원본 모순은 conflict_detected로 표시할 일.`,`<b>D:</b> 그건 일시 에러 — 다른 종류의 재시도(백오프) 영역.`]},
     principle:"재시도의 한계 판별"},
    {ts:"4.4", lvl:"실전", q:`Developers dismiss many of your review bot's findings, but you can't tell which code constructs cause the bad findings. What design enables systematic false-positive analysis?`,
     opts:[
       {t:`Add a detected_pattern field to each structured finding, recording which code construct triggered it — then analyze dismissal rates by pattern.`, ok:true},
       {t:`Log the full prompt and response for every review for manual inspection.`},
       {t:`Survey developers monthly about which findings felt wrong.`},
       {t:`Track the dismissal rate as a single overall metric per release.`}],
     explain:{good:`가이드 4.4: detected_pattern 필드가 발견과 유발 구조를 연결 → 기각률을 패턴별로 분석해 체계적으로 오탐 제거.`,
       wrongs:[`<b>B:</b> 원시 로그 전수 수동 검토는 규모가 안 나와.`,`<b>C:</b> 기억 기반 설문은 부정확하고 늦어.`,`<b>D:</b> 총계 지표는 어떤 패턴이 범인인지 안 알려줘.`]},
     principle:"분석 가능하게 설계 — 패턴 필드"},
    {ts:"4.5", lvl:"기초", q:`Which workload is appropriate for the Message Batches API?`,
     opts:[
       {t:`A nightly technical-debt analysis whose results are read the next morning.`, ok:true},
       {t:`A pre-merge check developers wait on before merging.`},
       {t:`An interactive chatbot answering customer questions.`},
       {t:`A multi-turn agent that executes tools mid-request.`}],
     explain:{good:`논블로킹 + 지연 허용 = 배치 적합. 50% 절감의 정당한 사용처.`,
       wrongs:[`<b>B:</b> 블로킹 — SLA 없는 배치와 상극.`,`<b>C:</b> 실시간 대화도 블로킹.`,`<b>D:</b> 배치는 요청 내 멀티턴 도구 호출을 지원 안 해.`]},
     principle:"블로킹 여부로 판별"},
    {ts:"4.5", lvl:"실전", q:`In a 5,000-document batch run, 3% failed — mostly oversized documents exceeding context limits. What is the correct failure-handling design?`,
     opts:[
       {t:`Identify the failed requests by custom_id, chunk the oversized documents, and resubmit only the failures.`, ok:true},
       {t:`Resubmit the entire 5,000-document batch after fixing the size issue.`},
       {t:`Drop the 3% — a 97% completion rate is acceptable for batch work.`},
       {t:`Retry the failures unchanged; batch failures are usually transient.`}],
     explain:{good:`custom_id로 실패분만 식별 → 원인(크기)에 맞게 수정(청킹) → 실패분만 재제출. 가이드 4.5의 실패 처리 공식.`,
       wrongs:[`<b>B:</b> 성공한 97%를 다시 돌리는 이중 비용.`,`<b>C:</b> 실패엔 패턴(대형 문서)이 있어 — 버리면 특정 문서 유형이 계통적으로 누락.`,`<b>D:</b> 컨텍스트 초과는 결정론적 실패 — 그대로 다시 내면 그대로 또 실패.`]},
     principle:"custom_id — 실패분만, 고쳐서"},
    {ts:"4.6", lvl:"기초", q:`Why is a separate Claude instance better at reviewing generated code than the session that generated it?`,
     opts:[
       {t:`The independent instance lacks the generator's reasoning context, so it isn't biased toward defending the original decisions.`, ok:true},
       {t:`Separate instances run on newer model versions by default.`},
       {t:`The generating session's context window is too full to review effectively.`},
       {t:`Independent instances have higher default temperature, making them more critical.`}],
     explain:{good:`자기 리뷰 한계의 본질은 남아 있는 추론 맥락 — 독립 인스턴스는 그 편향이 없어.`,
       wrongs:[`<b>B:</b> 그런 기본 동작은 없어.`,`<b>C:</b> 공간이 아니라 편향 문제.`,`<b>D:</b> temperature와 비판력은 무관.`]},
     principle:"편향 제거 = 맥락 분리"},
    {ts:"4.6", lvl:"실전", q:`A 16-file PR review produces contradictory findings — a pattern flagged in payments.ts but approved in identical form in orders.ts — plus shallow coverage on half the files. The team proposes: (A) larger context model, (B) three redundant full-PR runs with majority voting, (C) per-file passes plus a cross-file integration pass, (D) instructing the reviewer to "be consistent." Which proposal fixes the root cause?`,
     opts:[
       {t:`(C) — attention dilution across 16 files causes both symptoms; per-file passes give uniform depth and the integration pass handles cross-file consistency.`, ok:true},
       {t:`(A) — with enough context, all 16 files get adequate attention in one pass.`},
       {t:`(B) — majority voting cancels out the inconsistencies between runs.`},
       {t:`(D) — the model needs to be reminded that identical patterns deserve identical judgments.`}],
     explain:{good:`두 증상(모순 판정 + 얕은 커버리지)의 공통 원인은 주의력 희석. 패스 분리가 근본 처방 (V2 샘플 12번 확장).`,
       wrongs:[`<b>B(A):</b> 컨텍스트가 커져도 주의력 품질은 그대로.`,`<b>C(B):</b> 다수결은 간헐적으로만 잡히는 진짜 버그를 소거 — 비용 3배로 검출력 하락.`,`<b>D:</b> 일관성은 지시가 아니라 구조에서 나와.`]},
     principle:"원칙 ② 근본 원인 — 주의력 희석"},
    ]},
  ]
};
