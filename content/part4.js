/* PART 4 · 프롬프트 엔지니어링 & 구조화된 출력 (D4, 20%) */
window.CCAF_CONTENT.p4 = {
  id: "p4",
  lessons: [

  /* ===== CH 1 · 4.1 명시적 기준 ===== */
  { id:"p4c1", ch:"CH 1", title:"명시적 기준으로 정밀도 올리기 (4.1)",
    steps:[
      {type:"concept", kind:"PART BRIEFING · 파트 설명", h:"PART 04 · 프롬프트 설계로 출력 품질을 통제하는 방법",
   html:`<h4>① 다루는 영역</h4>
<ul>
<li>프롬프트(prompt): Claude에 보내는 지시문</li>
<li>이 파트의 주제: 지시문과 출력 양식을 설계해 결과의 품질을 일정하게 만드는 방법</li>
<li>영어 이름: Prompt Engineering &amp; Structured Output</li>
</ul>
<h4>② 챕터 구성</h4>
<table>
<tr><th>챕터</th><th>주제</th></tr>
<tr><td>CH 1</td><td>명시적 기준. 보고할 것과 제외할 것을 적은 규칙</td></tr>
<tr><td>CH 2</td><td>few-shot 예시. 예시로 판단 기준 전달</td></tr>
<tr><td>CH 3</td><td>구조화된 출력과 JSON 스키마. 답의 양식 고정</td></tr>
<tr><td>CH 4</td><td>검증과 재시도. 내용 오류를 찾아 고치는 절차</td></tr>
<tr><td>CH 5</td><td>배치 처리. 대량 요청을 모아 처리하는 방식</td></tr>
<tr><td>CH 6</td><td>독립 리뷰. 별도 세션의 검토</td></tr>
<tr><td>CH 7</td><td>출력 형식을 정하는 세 방법의 선택</td></tr>
<tr><td>CH 8</td><td>사고와 effort 설정</td></tr>
</table>
<h4>③ 파트 전체에 쓰는 판단 기준</h4>
<ul>
<li>원인 구분: 기준이 없어서 생긴 문제인지 정보가 없어서 생긴 문제인지</li>
<li>보장 범위 구분: 그 수단이 형식을 보장하는지 내용을 보장하는지</li>
<li>자격시험 출제 비중: 20%</li>
</ul>`},
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"명시적 기준: 보고할 것과 제외할 것을 적은 규칙",
   html:`<h4>① 예시 상황</h4>
<ul>
<li>자동 코드 리뷰. Claude가 코드 변경을 검사하고 문제를 지적하는 댓글 작성</li>
<li>이 챕터에서 다루는 문제: 지적 자체가 틀리는 경우</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 리뷰 댓글 두 개</div>
[버그 · 심각도 높음] payment.ts 42번째 줄: 환불 금액을 확인 없이 저장. 음수 입력 시 이중 환불 가능<br>
<span class="sel">[스타일 · 심각도 낮음] utils.ts 7번째 줄: 변수 이름 tmp가 모호</span>
</div>
<p class="cap">첫 댓글은 맞는 지적. 둘째 댓글은 오탐. 이 팀은 tmp라는 이름을 허용.</p>
<h4>② 막연한 지시의 한계</h4>
<ul>
<li>"보수적으로 판단", "확신이 높은 것만 보고" 같은 지시에는 판단의 경계가 없음</li>
<li>지시의 강도만 높아지고 분류 기준은 그대로</li>
</ul>
<h4>③ 명시적 기준의 형태</h4>
<div class="fig"><b>지시 비교</b><br>
막연한 지시: "주석이 정확한지 확인"&nbsp;&nbsp;<span class="an">← 어디까지가 부정확인지 불분명</span><br>
명시적 기준: "주석의 내용이 실제 코드 동작과 어긋날 때만 지적"&nbsp;&nbsp;<span class="an">← 지적할 조건 명확</span>
</div>
<ul>
<li>보고할 종류와 제외할 종류를 함께 작성</li>
<li>예: 보고 대상은 버그와 보안 문제. 제외 대상은 사소한 스타일과 이 프로젝트에서만 쓰는 관례</li>
</ul>
<h4>④ 오탐이 많을 때의 결과</h4>
<ul>
<li>오탐 댓글이 변경마다 수십 개 달리면 개발자가 댓글을 읽지 않음</li>
<li>함께 달린 진짜 버그 지적도 같이 무시</li>
<li>오탐이 많은 종류 하나가 정확한 종류의 신뢰까지 낮춤</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>오탐(false positive)</b>: 문제가 아닌 것을 문제로 지적하는 경우</li>
<li><b>미탐(false negative)</b>: 진짜 문제를 놓치는 경우</li>
<li><b>정밀도(precision)</b>: 지적한 것 중 진짜 문제였던 것의 비율. 오탐이 늘수록 낮아짐</li>
<li><b>주석(comment)</b>: 코드 안에 사람이 읽으라고 적어 둔 설명</li>
</ul>
</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"오탐을 줄이는 세 가지 방법",
   html:`__MAP4:criteria__<h4>① 종류별 기준</h4>
<ul>
<li>보고 대상: 버그, 보안 문제</li>
<li>제외 대상: 사소한 스타일, 프로젝트 관례</li>
<li>확신하는 정도가 아니라 지적의 종류로 규칙 작성</li>
</ul>
<h4>② 오탐이 몰린 종류의 일시 중지</h4>
<ul>
<li>오탐이 집중된 종류는 보고 중지</li>
<li>그 종류의 지시문을 고친 뒤 다시 사용</li>
<li>목적: 나머지 종류에 대한 개발자의 신뢰 회복</li>
</ul>
<h4>③ 심각도 정의에 예시 추가</h4>
<ul>
<li>심각도(severity): 지적마다 붙이는 등급. 먼저 고칠 순서를 정하는 용도</li>
<li>등급마다 구체적인 예시를 붙여야 분류가 일정</li>
</ul>
<table>
<tr><th>등급</th><th>정의</th><th>예시</th></tr>
<tr><td>높음</td><td>자료 손실, 보안 문제</td><td>사용자 입력을 확인 없이 데이터베이스 명령에 사용</td></tr>
<tr><td>낮음</td><td>이름, 형식</td><td>변수 이름 표기 방식</td></tr>
</table>
<div class="fig"><b>예시가 없는 정의와 있는 정의</b><br>
"심각한 문제는 높음으로 분류"&nbsp;&nbsp;<span class="an">← 같은 문제가 실행마다 다른 등급</span><br>
"높음: 자료 손실과 보안 문제. 예: 입력값을 확인 없이 데이터베이스 명령에 사용"&nbsp;&nbsp;<span class="an">← 등급 일정</span>
</div>
<ul>
<li>효과 없는 방법: "더 신중하게"라는 지시 추가</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>심각도(severity)</b>: 문제가 얼마나 중대한지 나타내는 등급</li>
<li><b>관례(convention)</b>: 팀이 정해 두고 따르는 코드 작성 방식</li>
</ul>
</div>`},
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
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"few-shot: 예시로 판단 기준을 전달하는 방법",
   html:`<h4>① few-shot 예시</h4>
<ul>
<li>프롬프트에 예시 몇 개를 넣어 원하는 처리 방식을 보여 주는 방법</li>
<li>쓰는 상황: 지시를 자세히 써도 형식과 판단이 일정하지 않은 경우</li>
<li>공식 문서의 권장 개수: 3~5개</li>
<li>표기: 예시 하나는 <code>&lt;example&gt;</code> 태그로 감싸고 전체는 <code>&lt;examples&gt;</code> 태그로 묶기</li>
<li>작성 기준 전체: <a href="https://platform.claude.com/docs/ko/build-with-claude/prompt-engineering/claude-prompting-best-practices" target="_blank" rel="noopener">Claude 공식 문서 '프롬프팅 모범 사례' 페이지</a> (한국어)의 '예시를 효과적으로 사용하기' 항목</li>
</ul>
<h4>② 예시 선택 기준</h4>
<ul>
<li>판단이 애매한 경우를 선택. 명백한 경우의 예시는 효과가 작음</li>
<li>그렇게 처리한 이유를 함께 작성. 이유가 있어야 판단 기준이 전달</li>
<li>실제 사용 상황과 가깝고 서로 다른 경우를 고루 포함</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 시스템 프롬프트에 넣은 예시</div>
&lt;examples&gt;<br>
&lt;example&gt;<br>
고객: "환불도 해 주고 배송 주소도 바꿔 줘"<br>
처리: 요청 2개로 나누기. 주문 조회로 환불 가능 여부를 확인한 뒤 주소 변경<br>
이유: 요청이 여러 개면 먼저 나누기<br>
&lt;/example&gt;<br>
&lt;example&gt;<br>
고객: "이거 왜 이래요"<br>
처리: 도구를 호출하지 않고 주문 번호부터 질문<br>
이유: 추측으로 도구를 호출하지 않기<br>
&lt;/example&gt;<br>
&lt;/examples&gt;
</div>
<p class="cap">이해를 돕기 위해 2개만 적은 예시.</p>
<h4>③ 예시가 작동하는 원리</h4>
<ul>
<li>Claude는 예시에서 처리 규칙을 찾아 새 입력에 적용</li>
<li>이유가 적힌 예시의 효과: 겉모양이 아니라 판단 기준을 따름. 예시에 없던 경우에도 같은 기준 적용</li>
<li>값을 지어내는 문제 감소: "주문 번호가 문서에 없으면 빈 값"이라는 예시를 보면 값이 없을 때 지어내지 않음</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>few-shot</b>: 예시를 몇 개 보여 준다는 뜻의 영어 표현</li>
<li><b>XML 태그</b>: 꺾쇠로 감싼 표시. 글의 범위를 구분하는 용도</li>
<li><b>환각(hallucination)</b>: 사실이 아닌 내용을 그럴듯하게 지어내는 현상</li>
</ul>
</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"few-shot 예시를 쓰는 상황",
   html:`__MAP4:fewshot__<h4>① 도구 선택이 애매한 요청</h4>
<ul>
<li>예시에 넣을 내용: 애매한 요청, 호출할 도구, 그 도구를 고른 이유</li>
<li>예: "계정이 이상해요"에는 문서 검색 도구가 아니라 계정 조회 도구(<code>get_account</code>) 호출. 이유: 개인 계정 상태는 문서에 없음</li>
</ul>
<h4>② 출력 형식 통일</h4>
<ul>
<li>원하는 형식 그대로의 예시 제시</li>
<li>포함할 항목: 위치, 문제, 심각도, 수정 제안</li>
</ul>
<div class="fig"><b>형식 예시 한 줄</b><br>
[높음] auth.ts 12번째 줄 · 토큰 만료 확인 누락 · 수정: 만료 시간 검사 추가
</div>
<h4>③ 오탐 감소</h4>
<ul>
<li>허용되는 코드와 진짜 문제를 짝지어 제시</li>
<li>같은 코드도 위치에 따라 판단이 달라진다는 점을 짝으로 전달</li>
</ul>
<div class="fig"><b>짝지은 예시</b><br>
테스트 파일 안의 console.log&nbsp;&nbsp;<span class="an">← 허용. 확인용으로 쓰는 관례</span><br>
서비스 코드 안의 console.log&nbsp;&nbsp;<span class="an">← 문제</span>
</div>
<h4>④ 구조가 다른 문서의 추출</h4>
<ul>
<li>문서마다 구조가 다른 경우: 구조별 추출 예시 추가</li>
<li>예: 본문 안의 인용과 참고 문헌 목록. 글로 된 자료와 표로 된 자료</li>
<li>효과: 빈 값으로 남는 항목과 지어낸 값 감소</li>
</ul>
<h4>⑤ 명시적 기준과 함께 사용</h4>
<ul>
<li>기준의 역할: 판단의 경계 정의</li>
<li>예시의 역할: 경계에 있는 실제 경우 제시</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>console.log</b>: 확인용 글을 화면에 찍는 코드. 개발 중에 쓰고 서비스 코드에서는 지우는 것이 보통</li>
<li><b>토큰 만료</b>: 로그인 정보의 유효 시간이 끝난 상태</li>
</ul>
</div>`},
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
  { id:"p4c3", ch:"CH 3", title:"구조화된 출력과 JSON 스키마 (4.3)",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"JSON 스키마: 출력 항목과 값의 종류를 정해 둔 양식",
       html:`<h4>① 구조화된 출력</h4>
        <ul>
          <li>프로그램이 바로 읽을 수 있는 정해진 양식의 답</li>
          <li>가장 많이 쓰는 양식은 JSON</li>
          <li>필요한 상황: Claude의 답을 사람이 읽지 않고 다른 프로그램이 이어서 처리하는 작업</li>
        </ul>
        <div class="fig"><b>같은 내용의 두 가지 답</b><br>
"영수증 번호는 A-1024, 합계는 38,000원입니다."&nbsp;&nbsp;<span class="an">← 사람이 읽는 글</span><br>
{ "invoice_id": "A-1024", "total": 38000 }&nbsp;&nbsp;<span class="an">← 프로그램이 읽는 JSON</span>
        </div>
        <h4>② JSON 스키마</h4>
        <ul>
          <li>출력에 들어갈 항목과 항목별 값의 종류를 정해 둔 양식</li>
          <li>사람이 미리 작성해서 Claude에 보내는 요청에 포함</li>
          <li>Claude는 양식에 있는 항목만 양식에 정한 종류의 값으로 작성</li>
        </ul>
        <div class="fig"><b>스키마 예시 · 영수증 정보</b><br>
{ "type": "object",<br>
&nbsp;&nbsp;"properties": {<br>
&nbsp;&nbsp;&nbsp;&nbsp;"invoice_id": { "type": "string" },&nbsp;&nbsp;<span class="an">← 글자 항목</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;"total": { "type": "number" },&nbsp;&nbsp;<span class="an">← 숫자 항목</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;"po_number": { "type": ["string", "null"] },&nbsp;&nbsp;<span class="an">← 비워도 되는 항목 (nullable)</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;"category": { "enum": ["food", "clothing", "other"] }&nbsp;&nbsp;<span class="an">← 정해진 값 중 선택 (enum)</span><br>
&nbsp;&nbsp;},<br>
&nbsp;&nbsp;"required": ["invoice_id", "total"]&nbsp;&nbsp;<span class="an">← 반드시 채워야 하는 항목</span><br>
}
        </div>
        <div class="screen"><div class="sbar">화면 예시 · 이 스키마로 받은 답</div>
{ "invoice_id": "A-1024", "total": 38000,<br>
&nbsp;&nbsp;"po_number": null, "category": "other" }
        </div>
        <p class="cap">영수증 한 장을 처리한 결과. 스키마에 정한 네 항목만 포함. 주문 번호가 없는 영수증이라 po_number는 빈 값.</p>
        <h4>③ 스키마 전달 방법</h4>
        <table>
          <tr><th>방법</th><th>스키마를 넣는 곳</th><th>양식에 맞춰지는 대상</th></tr>
          <tr><td>JSON 출력<br>JSON outputs</td><td><code>output_config.format</code></td><td>Claude의 답 전체</td></tr>
          <tr><td>엄격한 도구 사용<br>strict tool use</td><td>도구 정의의 입력 양식. <code>strict: true</code> 추가</td><td>Claude가 도구를 호출할 때 넣는 입력값</td></tr>
        </table>
        <ul>
          <li>양식에 맞춘 답만 필요한 작업에는 JSON 출력</li>
          <li>Claude가 도구를 호출하는 작업에는 엄격한 도구 사용</li>
          <li>공식 문서에 적힌 사용 가능 모델: 모든 모델</li>
          <li>사용법 전체: <a href="https://platform.claude.com/docs/ko/build-with-claude/structured-outputs" target="_blank" rel="noopener">Claude 공식 문서 '구조화된 출력' 페이지</a> (한국어)</li>
        </ul>
        <h4>④ 보장 범위</h4>
        <table>
          <tr><th>구분</th><th>내용</th></tr>
          <tr><td>보장</td><td>JSON 문법. 값의 종류. 필수 항목 포함</td></tr>
          <tr><td>보장 안 됨</td><td>값의 내용. 예: 합계가 실제 합과 다른 경우, 값이 다른 항목에 들어간 경우</td></tr>
          <tr><td>양식이 깨지는 경우</td><td>답이 길이 한도(<code>max_tokens</code>)에서 잘린 경우. Claude가 요청을 거절한 경우</td></tr>
        </table>
        <ul>
          <li>값의 내용 확인은 CH 4의 검증 단계에서 처리</li>
        </ul>
        <div class="callout">📖 <b>용어 카드</b>
          <ul>
            <li><b>JSON</b>: 항목 이름과 값을 짝지어 적는 글 형식. 프로그램끼리 자료를 주고받을 때 사용</li>
            <li><b>API 요청</b>: 프로그램이 Claude에 보내는 주문서. 모델 이름, 질문, 설정 포함</li>
            <li><b>스키마(schema)</b>: 출력 항목과 값의 종류를 정해 둔 양식</li>
            <li><b>required</b>: 반드시 채워야 하는 항목 목록</li>
            <li><b>nullable</b>: 비워도 되는 항목</li>
            <li><b>enum</b>: 정해진 값 중에서 하나를 고르는 항목</li>
            <li><b>도구(tool)</b>: Claude가 호출할 수 있게 연결해 둔 기능</li>
          </ul>
        </div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"스키마 설계와 도구 호출 설정",
       html:`__MAP4:schema__<h4>① 비워도 되는 항목</h4>
        <ul>
          <li>문제: 원본 문서에 없을 수 있는 정보를 필수 항목으로 지정하면 Claude가 값을 지어내는 현상</li>
          <li>해결: 비워도 되는 항목으로 지정. 값이 없으면 빈 값(null) 반환</li>
          <li>작성 방법: <code>"po_number": {"type": ["string", "null"]}</code>로 쓰고 required 목록에서 제외</li>
        </ul>
        <h4>② 목록에 없는 값</h4>
        <ul>
          <li>판단이 어려운 경우에 쓸 값 <code>"unclear"</code> 추가</li>
          <li>목록에 없는 경우에 쓸 값 <code>"other"</code> 추가. 내용을 적을 글자 항목도 함께 추가</li>
          <li>작성 방법: <code>"category": {"enum": ["food", "clothing", "unclear", "other"]}</code>와 <code>"other_detail": {"type": "string"}</code></li>
        </ul>
        <div class="fig"><b>자동차 부품 영수증 분류</b><br>
목록: food, clothing&nbsp;&nbsp;<span class="an">← 맞는 값이 없어 food로 잘못 분류</span><br>
목록: food, clothing, unclear, other&nbsp;&nbsp;<span class="an">← other 선택. other_detail에 "자동차 부품" 기록</span>
        </div>
        <h4>③ 값 형식 통일</h4>
        <ul>
          <li>스키마가 정하는 범위는 항목의 구조</li>
          <li>값을 적는 형식은 프롬프트에 문장으로 지정</li>
          <li>대상: 문서마다 적는 방식이 다른 날짜, 전화번호, 금액</li>
        </ul>
        <div class="screen"><div class="sbar">화면 예시 · 프롬프트에 넣는 형식 규칙</div>
날짜는 전부 YYYY-MM-DD로 통일.<br>
전화번호는 하이픈 제거.<br>
금액은 숫자만 기록.
        </div>
        <p class="cap">"3/4/25", "April 3rd", "2025-04-03"처럼 제각각인 날짜를 모두 "2025-04-03"으로 통일.</p>
        <h4>④ 도구 호출 설정</h4>
        <table>
          <tr><th><code>tool_choice</code> 값</th><th>동작</th></tr>
          <tr><td><code>auto</code></td><td>도구 호출 여부를 Claude가 결정. 글로만 답하는 경우도 있음</td></tr>
          <tr><td><code>any</code></td><td>연결된 도구 중 하나를 반드시 호출. 어느 도구인지는 Claude가 선택</td></tr>
          <tr><td>도구 이름 지정</td><td>지정한 도구를 반드시 호출</td></tr>
          <tr><td><code>none</code></td><td>도구 호출 금지</td></tr>
        </table>
        <ul>
          <li>문서 종류를 모르고 추출 도구가 여러 개인 경우: <code>any</code></li>
          <li>특정 추출이 가장 먼저 실행돼야 하는 경우: 도구 이름 지정. 작성 방법은 <code>tool_choice: {"type": "tool", "name": "extract_metadata"}</code></li>
          <li>이름을 지정하는 이유: 뒤 단계가 이 추출 결과를 입력으로 사용</li>
          <li>모델 조건: <code>any</code>와 도구 이름 지정은 일부 모델에서만 동작. Claude Fable 5.2, Opus 5.5, Sonnet 5.5는 400 오류로 거절</li>
          <li>거절하는 모델에서 쓰는 방법: <code>auto</code>와 엄격한 도구 사용을 함께 사용. 답의 양식만 고정하면 되는 작업은 JSON 출력</li>
          <li>모델별 지원 여부: <a href="https://platform.claude.com/docs/ko/agents-and-tools/tool-use/define-tools#forcing-tool-use" target="_blank" rel="noopener">Claude 공식 문서 '도구 정의하기' 페이지의 '도구 사용 강제하기' 항목</a> (한국어)</li>
        </ul>
        <div class="callout">📖 <b>용어 카드</b>
          <ul>
            <li><b>null</b>: 값이 없다는 표시</li>
            <li><b>프롬프트(prompt)</b>: Claude에 보내는 지시문</li>
            <li><b>400 오류</b>: 요청 내용에 문제가 있어 처리하지 않았다는 응답</li>
          </ul>
        </div>`},
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
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"오류 내용을 붙인 재시도",
   html:`<h4>① 두 종류의 오류</h4>
<table>
<tr><th>종류</th><th>예</th><th>막는 수단</th></tr>
<tr><td>형식 오류</td><td>괄호 누락. 값의 종류 불일치</td><td>구조화된 출력. CH 3의 내용</td></tr>
<tr><td>내용 오류</td><td>합계 불일치. 값이 다른 항목에 들어감</td><td>검증과 재시도. 이 챕터의 내용</td></tr>
</table>
<h4>② 오류 내용을 붙인 재시도</h4>
<ul>
<li>검증 코드가 오류를 발견하면 무엇이 어떻게 틀렸는지 붙여서 다시 요청하는 방식</li>
<li>영어 이름: retry with error feedback</li>
<li>재시도 요청에 넣는 세 가지: 원본 문서, 직전 추출 결과, 구체적인 검증 오류</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 재시도 요청</div>
다음 문서에서 다시 추출해 줘.<br>
① 원본 문서: (청구서 전체)<br>
② 직전 추출 결과: { "total": 1200, "items_sum": 1350 }<br>
<span class="sel">③ 검증 오류: 항목 합계 1350과 총액 1200 불일치. 3번 항목의 수량과 단가 재확인</span>
</div>
<p class="cap">①은 고칠 대상, ②는 직전 결과, ③은 오류 위치. "다시 해 줘"만 보낸 요청과의 차이는 ③.</p>
<h4>③ 재시도의 한계</h4>
<table>
<tr><th>경우</th><th>재시도 효과</th></tr>
<tr><td>형식이나 구조가 틀림. 고칠 근거가 문서 안에 있음</td><td>있음</td></tr>
<tr><td>필요한 정보가 원본 문서에 없음</td><td>없음. 몇 번을 반복해도 같은 결과</td></tr>
</table>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>검증(validation)</b>: 결과가 규칙에 맞는지 프로그램으로 확인하는 일</li>
<li><b>Pydantic</b>: 파이썬에서 쓰는 검증 도구. 결과가 스키마에 맞는지 확인하고 어긋난 위치를 알려 줌</li>
<li><b>추출(extraction)</b>: 문서에서 필요한 값만 뽑아내는 작업</li>
</ul>
</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"검산 항목과 오탐 원인 추적",
   html:`__MAP4:validate__<h4>① 검산 항목</h4>
<ul>
<li>스키마에 Claude가 검산 값을 직접 적는 항목 추가</li>
<li><code>stated_total</code>: 문서에 적힌 총액 그대로</li>
<li><code>calculated_total</code>: 항목을 직접 더한 값</li>
<li>프로그램이 두 값을 비교해 다르면 표시. Claude의 "맞다"는 답이 아니라 두 값의 비교로 판단하는 구조</li>
<li>원본 문서 자체에 모순이 있는 경우: <code>conflict_detected</code> 항목에 표시</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 검산 항목이 있는 추출 결과</div>
{ "stated_total": 1200,<br>
&nbsp;&nbsp;"calculated_total": 1350,<br>
&nbsp;&nbsp;"conflict_detected": true }<br>
<span class="sel">두 값이 달라 사람 확인 대상으로 분류</span>
</div>
<h4>② 오탐 원인 추적</h4>
<ul>
<li><code>detected_pattern</code>: 지적마다 어떤 코드 형태 때문에 지적했는지 적게 하는 항목</li>
<li>1단계: 개발자가 "문제 아님"으로 닫은 지적을 한 달 치 수집</li>
<li>2단계: <code>detected_pattern</code> 값별로 집계. 예: 한 가지 형태가 닫힌 지적의 40%</li>
<li>3단계: 그 형태를 "허용되는 코드" 예시로 프롬프트에 추가</li>
<li>집계 작업은 별도 Claude 세션에 맡기기 가능</li>
</ul>
<h4>③ 재시도 판단 순서</h4>
<ul>
<li>1단계: 실패 원인 분류. 형식이나 구조의 문제인지 정보가 없는 문제인지</li>
<li>2단계: 형식이나 구조의 문제면 오류 내용을 붙여 재시도</li>
<li>3단계: 정보가 없는 문제면 빈 값을 허용하거나 사람에게 넘기기</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>검산</b>: 계산 결과를 다른 방법으로 한 번 더 확인하는 일</li>
<li><b>항목(field)</b>: 스키마에서 값 하나를 담는 자리</li>
</ul>
</div>`},
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
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"배치 처리: 요청을 모아 제출하고 나중에 결과를 받는 방식",
   html:`<h4>① 배치 처리</h4>
<ul>
<li>요청 여러 건을 한 번에 제출하고 나중에 결과를 한꺼번에 받는 방식</li>
<li>API 이름: Message Batches API</li>
<li>프로그램으로 쓰는 기능. 채팅 화면에는 없는 기능</li>
</ul>
<div class="fig"><b>두 방식의 흐름</b><br>
일반 요청: 요청 → 대기 → 답&nbsp;&nbsp;<span class="an">← 한 건씩 바로 답</span><br>
<br>
배치: 요청 1만 건 제출 → 접수 번호 수령 → 연결 종료<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;… 몇 분에서 최대 24시간 …<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;상태 확인 → 완료 → 결과 1만 건 수령&nbsp;&nbsp;<span class="an">← 제출과 수령 사이에는 개입 불가</span>
</div>
<h4>② 주요 수치</h4>
<table>
<tr><th>항목</th><th>내용</th></tr>
<tr><td>비용</td><td>일반 요청 가격의 50%</td></tr>
<tr><td>처리 시간</td><td>대부분 1시간 안에 완료. 24시간 안에 처리되지 않은 요청은 만료. 완료 시각 보장 없음</td></tr>
<tr><td>한 번에 제출하는 양</td><td>요청 10만 건 또는 256MB 중 먼저 도달하는 쪽</td></tr>
<tr><td>결과 보관</td><td>생성 후 29일</td></tr>
<tr><td>결과 순서</td><td>제출 순서와 무관</td></tr>
<tr><td>결과 종류</td><td>succeeded, errored, canceled, expired. succeeded 외에는 비용 없음</td></tr>
</table>
<ul>
<li>설명 전체: <a href="https://platform.claude.com/docs/ko/build-with-claude/batch-processing" target="_blank" rel="noopener">Claude 공식 문서 '배치 처리' 페이지</a> (한국어)</li>
</ul>
<h4>③ custom_id</h4>
<ul>
<li>요청마다 붙이는 이름. 요청과 결과를 짝짓는 수단</li>
<li>형식: 영문자, 숫자, 하이픈, 밑줄로 1~64자</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 제출한 요청과 받은 결과</div>
제출: { "custom_id": "invoice-0001", … }<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ "custom_id": "invoice-0002", … }<br>
<span class="sel">수령: { "custom_id": "invoice-0002", "result": … }</span>
</div>
<p class="cap">결과는 제출 순서와 다른 순서로 도착. custom_id로 원본 문서와 결과를 연결.</p>
<h4>④ 도구 사용</h4>
<ul>
<li>내 프로그램에서 실행하는 도구: 요청 하나 안에서 도구 결과를 돌려주는 흐름 불가. 제출 뒤에는 연결이 끊긴 상태</li>
<li>Anthropic 서버에서 실행하는 도구: 배치에서도 동작. 예: 웹 검색, 코드 실행</li>
<li>결과의 <code>stop_reason</code>이 <code>pause_turn</code>인 경우: 작업 미완료. 받은 답을 붙인 다음 요청으로 계속 진행</li>
</ul>
<h4>⑤ 맞는 작업과 맞지 않는 작업</h4>
<table>
<tr><th>구분</th><th>예</th><th>배치</th></tr>
<tr><td>결과를 기다리는 작업<br>blocking</td><td>코드 반영 전 검사. 사람이 화면 앞에서 대기</td><td>부적합</td></tr>
<tr><td>결과를 기다리지 않는 작업<br>non-blocking</td><td>야간 보고서, 주간 감사, 대량 평가</td><td>적합</td></tr>
</table>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>SLA</b>: 언제까지 끝낸다는 계약상의 약속. 배치 처리에는 완료 시각 약속이 없음</li>
<li><b>폴링(polling)</b>: 완료됐는지 일정 간격으로 상태를 확인하는 일</li>
<li><b>만료(expired)</b>: 정해진 시간 안에 처리되지 않아 취소된 상태</li>
</ul>
</div>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"배치 운영의 세 가지 판단",
   html:`__MAP4:batch__<h4>① 작업 분류</h4>
<ul>
<li>같은 시스템 안에서도 작업별로 분리</li>
<li>결과를 기다리는 작업: 일반 요청. 예: 코드 반영 전 리뷰</li>
<li>결과를 기다리지 않는 작업: 배치. 예: 야간 전체 감사</li>
</ul>
<h4>② 제출 간격 계산</h4>
<ul>
<li>조건 예: 고객에게 약속한 처리 기한 30시간. 배치 최대 처리 시간 24시간</li>
<li>여유 시간: 30시간에서 24시간을 뺀 6시간</li>
<li>제출 간격은 여유 시간 이하로 설정. 예: 4시간</li>
<li>계산식: 제출 간격 ≤ 약속한 기한 − 배치 최대 처리 시간</li>
</ul>
<div class="fig"><b>4시간 간격으로 제출하는 경우</b><br>
업로드 ──(제출 대기 최대 4시간)── 제출 ──(처리 최대 24시간)── 결과<br>
<span class="an">합계 최대 28시간. 약속한 기한 30시간 이내</span>
</div>
<h4>③ 실패 처리와 사전 조정</h4>
<ul>
<li>실패한 요청만 <code>custom_id</code>로 찾아 고친 뒤 다시 제출</li>
<li>너무 긴 문서는 나누어 제출</li>
<li>대량 제출 전에 적은 수의 표본으로 프롬프트 조정. 첫 제출의 성공률이 높아져 재제출 비용 감소</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 배치 결과 집계</div>
succeeded: 9,940건<br>
errored: 52건<br>
<span class="sel">expired: 8건&nbsp;&nbsp;다시 제출할 대상: errored와 expired의 custom_id 60개</span>
</div>
<p class="cap">이해를 돕기 위한 예시 수치.</p>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>표본(sample)</b>: 전체 중에서 미리 뽑아 시험해 보는 일부</li>
<li><b>감사(audit)</b>: 정해진 기준을 지켰는지 전체를 점검하는 일</li>
</ul>
</div>`},
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
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"독립 리뷰: 작성 과정을 모르는 별도 세션의 검토",
       html:`<h4>① 자기 검토의 한계</h4>
        <ul>
          <li>결과물을 만든 세션: 만들 때의 판단 과정이 남아 있는 상태</li>
          <li>남은 판단 과정의 영향: 자기 결정을 옳다고 보는 편향</li>
          <li>해결되지 않는 방법: "더 신중히 검토하라"는 지시. 사고(thinking) 기능 사용. effort 올리기</li>
          <li>이유: 원인이 추론의 양이 아니라 세션에 남은 맥락</li>
        </ul>
        <h4>② 독립 리뷰</h4>
        <ul>
          <li>결과물만 전달받은 별도 세션의 검토</li>
          <li>작성 과정을 모르기 때문에 작성한 세션이 지나친 문제를 더 잘 발견</li>
          <li>Part 3 CH 6의 작성 세션과 리뷰 세션 분리와 같은 원리</li>
        </ul>
        <div class="fig"><b>두 방식 비교</b><br>
자기 검토: 작성 세션 → 같은 세션이 검토&nbsp;&nbsp;<span class="an">← 판단 과정이 남아 있음</span><br>
독립 리뷰: 작성 세션 → 결과물만 전달 → 새 세션이 검토&nbsp;&nbsp;<span class="an">← 판단 과정 없음</span>
        </div>
        <div class="callout">📖 <b>용어 카드</b>
          <ul>
            <li><b>세션(session)</b>: Claude와 주고받는 대화 한 묶음. 세션 안의 내용은 이어서 기억</li>
            <li><b>인스턴스(instance)</b>: 따로 실행한 Claude 하나. 다른 인스턴스의 대화 내용은 모름</li>
            <li><b>사고(thinking)</b>: Claude가 답하기 전에 단계별로 추론하는 기능</li>
            <li><b>effort</b>: 추론의 깊이를 정하는 설정. low, medium, high, xhigh, max 중 선택</li>
          </ul>
        </div>
        <ul>
          <li>사고와 effort 설정 방법: <a href="https://platform.claude.com/docs/ko/build-with-claude/adaptive-thinking" target="_blank" rel="noopener">Claude 공식 문서 '사고 조정하기' 페이지</a> (한국어)</li>
        </ul>`},
      {type:"concept", kind:"TOPIC · 주제 설명", h:"검토 단계 분리와 신뢰도 보고",
       html:`__MAP4:review__<h4>① 검토 단계 분리</h4>
        <ul>
          <li>파일이 많은 리뷰는 두 단계로 진행</li>
          <li>1단계: 파일을 하나씩 따로 검토</li>
          <li>2단계: 파일 사이의 관계만 한 번 검토</li>
          <li>효과: 파일마다 검토 깊이가 일정. 서로 어긋나는 판정 방지</li>
        </ul>
        <div class="fig"><b>파일 14개 리뷰 방식 비교</b><br>
<span class="an">✓ 독립 리뷰 + 단계 분리</span><br>
&nbsp;&nbsp;새 세션이 파일별 검토 14회 → 파일 간 검토 1회 → 결과 합치기<br>
<br>
✗ 자기 검토: 작성한 세션이 자기 결과물 검토&nbsp;&nbsp;<span class="an">← 같은 문제를 다시 지나침</span><br>
✗ 한 번에 전부: 파일 14개를 한 번에 검토&nbsp;&nbsp;<span class="an">← 파일마다 검토 깊이가 다름</span><br>
✗ 3회 반복 후 다수결: 한 번에 전부 검토를 세 번&nbsp;&nbsp;<span class="an">← 비용 3배. 검토 깊이 문제는 그대로</span>
        </div>
        <h4>② 신뢰도 보고</h4>
        <ul>
          <li>발견한 문제마다 확신하는 정도를 함께 보고하도록 지시</li>
          <li>용도: 확신이 낮은 항목만 사람이 확인</li>
          <li>조건: Claude가 스스로 매긴 신뢰도는 실제 정확도와 다를 수 있음</li>
          <li>사용 전 작업: 정답을 아는 표본으로 신뢰도와 실제 정확도를 맞춰 보기(보정). Part 5 CH 5에서 다룸</li>
        </ul>
        <div class="screen"><div class="sbar">화면 예시 · 신뢰도가 붙은 리뷰 결과</div>
[신뢰도 높음] 결제 파일 42번째 줄: 금액 반올림 오류<br>
[신뢰도 낮음] 장바구니 파일 118번째 줄: 할인 적용 순서 확인 필요<br>
<span class="sel">신뢰도 낮음 1건은 사람이 확인</span>
        </div>
        <p class="cap">이해를 돕기 위한 예시. 실제 출력 형식은 지시한 양식에 따라 달라짐.</p>
        <div class="callout">📖 <b>용어 카드</b>
          <ul>
            <li><b>패스(pass)</b>: 검토 한 차례. 다중 패스는 검토를 여러 차례로 나눈 방식</li>
            <li><b>보정(calibration)</b>: 스스로 매긴 신뢰도가 실제 정확도와 맞는지 확인하고 맞추는 작업</li>
          </ul>
        </div>`},
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
  { id:"p4test", type:"test", title:"D4 미니테스트: 프롬프트 & 구조화된 출력 12문항",
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
