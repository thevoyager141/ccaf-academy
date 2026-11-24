/* Claude 설계자 과정 · 2026-11 추가 레슨
   (1) 새 파트 pf: AI 이해 기초 (레슨 4개)
   (2) 기존 파트에 넣는 레슨 3개: p1c8, p2c6, p4c8 (미니테스트 앞에 삽입, 중복 삽입 방지) */
(function(){
  var C = window.CCAF_CONTENT; if(!C) return;
  C.pf = { id:"pf", lessons:[
{ id:"pfc1", ch:"CH 1", title:"생성형 AI의 작동 방식",
  steps:[
  {type:"concept", kind:"PART BRIEFING · 파트 설명", h:"PART 기초 · 생성형 AI를 이해하고 함께 일하는 방법",
   html:`<h4>① 다루는 영역</h4>
<ul>
<li>생성형 AI가 답을 만드는 원리</li>
<li>AI와 함께 일할 때 필요한 역량</li>
<li>Claude를 쓰기 전에 정하는 선택</li>
</ul>
<h4>② 챕터 구성</h4>
<table>
<tr><th>챕터</th><th>주제</th></tr>
<tr><td>CH 1</td><td>생성형 AI의 작동 방식. 네 가지 성질과 한계</td></tr>
<tr><td>CH 2</td><td>AI 협업 역량 네 가지. 위임, 설명, 분별, 책임</td></tr>
<tr><td>CH 3</td><td>프롬프트 작성 전 네 가지 선택</td></tr>
<tr><td>CH 4</td><td>모델 선택</td></tr>
</table>
<h4>③ 이 파트의 위치</h4>
<ul>
<li>Part 1부터 Part 5까지의 설계 원칙은 이 파트의 네 가지 성질에서 출발</li>
<li>개발 경험이 없어도 읽을 수 있는 내용</li>
<li>근거: Anthropic 공식 학습 과정의 기초 강의 네 개</li>
</ul>`},
  {type:"concept", kind:"CONCEPT · 개념 설명", h:"생성형 AI: 다음에 올 말을 예측해 새 내용을 만드는 AI",
   html:`<h4>① 생성형 AI</h4>
<ul>
<li>글, 코드, 요약 같은 새 내용을 만들어 내는 AI</li>
<li>분류형 AI와의 차이: 분류형 AI는 이미 있는 내용을 종류별로 나눔. 예: 스팸 메일 분류</li>
</ul>
<h4>② 만들어지는 두 단계</h4>
<table>
<tr><th>단계</th><th>하는 일</th><th>결과</th></tr>
<tr><td>사전 학습<br>pretraining</td><td>방대한 글에서 다음에 올 말을 예측하는 연습</td><td>글을 이어 쓰는 능력. 사람을 돕는다는 개념은 아직 없는 상태</td></tr>
<tr><td>미세 조정<br>fine-tuning</td><td>사람이 좋은 답으로 평가한 예시로 추가 학습</td><td>질문에 답하고 해로운 요청을 거절하는 도우미 행동</td></tr>
</table>
<ul>
<li>미세 조정이 남기는 경향: 사용자의 말에 맞장구치는 경향, 답이 길어지는 경향, 지나친 조심, 실제 정확도와 맞지 않는 자신감</li>
</ul>
<h4>③ 네 가지 성질</h4>
<table>
<tr><th>성질</th><th>뜻</th></tr>
<tr><td>다음 토큰 예측<br>next token prediction</td><td>앞의 내용 뒤에 올 가능성이 높은 말을 이어 쓰는 방식</td></tr>
<tr><td>지식<br>knowledge</td><td>학습 자료에서 얻은 지식. 학습이 끝난 시점에 고정</td></tr>
<tr><td>작업 기억<br>working memory</td><td>한 번에 읽을 수 있는 분량의 한도. 컨텍스트 창</td></tr>
<tr><td>조종 가능성<br>steerability</td><td>지시에 따라 답을 바꾸는 성질</td></tr>
</table>
<ul>
<li>네 성질 모두 같은 원리에서 강점과 한계가 함께 나옴</li>
<li>AI를 통째로 믿거나 통째로 의심하지 않기. 지금 맡길 일이 강점 쪽인지 한계 쪽인지 확인</li>
</ul>
<div class="fig"><b>다음 토큰 예측</b><br>
입력: "오늘 서울의 날씨는"<br>
이어 쓸 후보: "맑음" "흐림" "비"&nbsp;&nbsp;<span class="an">← 가능성이 높은 말을 골라 이어 쓰기</span><br>
<span class="an">사실을 찾아보는 방식이 아니라 그럴듯한 다음 말을 고르는 방식</span>
</div>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>토큰(token)</b>: AI가 글을 세는 단위. 단어보다 조금 작은 조각</li>
<li><b>학습(training)</b>: 많은 자료로 AI의 능력을 만드는 과정</li>
<li><b>컨텍스트 창(context window)</b>: AI가 한 번에 읽을 수 있는 글의 한도</li>
</ul>
</div>`},
  {type:"concept", kind:"TOPIC · 주제 설명", h:"네 성질의 강점과 한계",
   html:`<h4>① 성질별 강점과 한계</h4>
<table>
<tr><th>성질</th><th>잘하는 범위</th><th>한계가 드러나는 범위</th><th>보완 기능</th></tr>
<tr><td><strong>다음 토큰 예측</strong></td><td>자주 본 형태의 작업. 요약, 형식 바꾸기, 흔한 개념 설명</td><td>낯선 주제. 이름, 날짜, 통계, 인용, 주소 같은 구체적인 값</td><td>출처 표시. 구조화된 출력. 작성과 검토의 분리</td></tr>
<tr><td><strong>지식</strong></td><td>학습 자료에 자주, 일관되게 나온 주제</td><td>학습 이후의 일. 드문 주제. 지역 정보. 의견이 갈리는 주제</td><td>웹 검색. 자료 검색. 도구 사용</td></tr>
<tr><td><strong>작업 기억</strong></td><td>분량이 창 안에 여유 있게 들어가는 작업</td><td>매우 긴 문서와 대화. 대화를 새로 열면 사라지는 기억. 긴 입력의 가운데 부분</td><td>메모리. 압축. 프로젝트. 서브에이전트</td></tr>
<tr><td><strong>조종 가능성</strong></td><td>짧고 구체적이고 확인 가능한 지시. 형식, 길이, 역할</td><td>긴 추론. 모호한 지시. 정확한 계산</td><td>시스템 프롬프트. 코드 실행. 사고 기능. 구조화된 출력</td></tr>
</table>
<h4>② 기억할 세 가지</h4>
<ul>
<li>지어낸 내용은 구체적인 값에 집중. 구체적인 값일수록 확인 필요</li>
<li>AI는 사용자가 고쳐 준 내용에서 학습하지 않음. 지금 컨텍스트에 있는 내용에만 반응</li>
<li>지시를 글자 그대로 따랐는데 의도와 다른 결과가 나온 경우: 같은 지시를 더 강하게 반복하지 않고 목적을 다시 설명</li>
</ul>
<h4>③ 성질 두 개가 겹친 문제</h4>
<table>
<tr><th>증상</th><th>겹친 성질</th><th>해결</th></tr>
<tr><td>그럴듯한 가짜 인용</td><td>다음 토큰 예측과 지식</td><td>구체적인 값 확인. 자료를 직접 전달</td></tr>
<tr><td>긴 대화 뒤에 초반 지시를 따르지 않음</td><td>작업 기억과 조종 가능성</td><td>중요한 조건 다시 전달. 새 대화 시작</td></tr>
<tr><td>자신 있게 틀린 계산</td><td>다음 토큰 예측과 조종 가능성</td><td>계산을 코드 실행에 맡기기</td></tr>
<tr><td>틀린 전제에 동의</td><td>미세 조정이 남긴 경향</td><td>반대 의견과 반례 요청</td></tr>
</table>
<div class="screen"><div class="sbar">화면 예시 · 확인이 필요한 답</div>
질문: "이 주제의 대표 논문 3편 알려 줘"<br>
답: 저자, 발표 연도, 제목, 학술지 이름이 모두 적힌 목록<br>
<span class="sel">저자, 연도, 학술지 이름은 하나씩 직접 확인할 대상</span>
</div>
<p class="cap">이해를 돕기 위한 예시. 답이 매끄럽고 구체적이라는 점은 정확하다는 근거가 아님.</p>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>환각(hallucination)</b>: 사실이 아닌 내용을 그럴듯하게 지어내는 현상</li>
<li><b>지식 기준 시점</b>: 학습 자료가 끝나는 시점. 그 뒤의 일은 도구 없이 알 수 없음</li>
<li><b>코드 실행</b>: AI가 계산을 직접 하지 않고 프로그램을 실행해 결과를 얻는 기능</li>
</ul>
</div>`},
  {type:"quiz", kind:"PRACTICE · 확인 문제", h:"확인 문제: 지난달 정책의 수치",
   q:`Claude에게 지난달 발표된 정책의 세부 수치를 물었더니 구체적인 숫자가 담긴 답이 돌아왔다. 웹 검색 기능은 꺼져 있었다. 이 답을 다루는 방법으로 가장 맞는 것은?`,
   opts:[
     {t:`웹 검색을 켜거나 정책 원문을 직접 전달한 뒤 수치를 원문과 대조`, ok:true},
     {t:`답에 구체적인 숫자가 들어 있으므로 그대로 사용`},
     {t:`같은 질문을 더 강한 어조로 다시 입력해 같은 답이 나오는지 확인`},
     {t:`더 자세하고 긴 답을 요청해 내용이 일관되는지 확인`}
   ],
   hint:`두 가지 확인. 지난달의 일이 학습 자료에 들어 있는지, 그리고 지어낸 내용이 어떤 종류의 값에 몰리는지.`,
   explain:{
     good:`지난달의 일은 학습 이후의 정보일 가능성이 높음. 구체적인 수치는 지어낸 내용이 가장 많이 나타나는 값. 해결은 AI가 모르는 자료를 직접 주거나 검색하게 한 뒤 원문과 대조하는 방법.`,
     wrongs:[
       `<b>B:</b> 구체적이라는 점은 정확하다는 근거가 아님. 다음 토큰 예측은 그럴듯한 숫자를 이어 쓸 수 있음.`,
       `<b>C:</b> 같은 답이 반복돼도 사실 확인이 되지 않음. 같은 방식으로 다시 만든 답.`,
       `<b>D:</b> 답이 길어져도 근거가 되는 자료는 그대로 없음.`
     ]},
   principle:"구체적인 값은 원문과 대조"}
  ]},
{ id:"pfc2", ch:"CH 2", title:"AI 협업 역량 네 가지",
  steps:[
  {type:"concept", kind:"CONCEPT · 개념 설명", h:"4D: AI와 함께 일할 때 필요한 네 가지 역량",
   html:`<h4>① 네 가지 역량</h4>
<table>
<tr><th>역량</th><th>뜻</th><th>스스로 묻는 질문</th></tr>
<tr><td>위임<br>Delegation</td><td>AI에 맡길 일과 내가 할 일을 정하기</td><td>이 일의 어느 부분을 맡길까</td></tr>
<tr><td>설명<br>Description</td><td>필요한 것과 진행 방식을 분명하게 전달하기</td><td>원하는 결과를 충분히 설명했나</td></tr>
<tr><td>분별<br>Discernment</td><td>AI가 내놓은 결과를 쓰기 전에 평가하기</td><td>이 결과를 그대로 써도 되나</td></tr>
<tr><td>책임<br>Diligence</td><td>AI의 도움과 무관하게 최종 결과를 내가 책임지기</td><td>이 결과를 내 이름으로 내보낼 수 있나</td></tr>
</table>
<ul>
<li>영어 이름의 첫 글자가 모두 D라서 붙은 이름: 4D 프레임워크</li>
</ul>
<h4>② 두 개의 고리</h4>
<ul>
<li>안쪽 고리: 설명과 분별. 대화할 때마다 반복</li>
<li>바깥 고리: 위임과 책임. AI를 언제 어떻게 쓸지에 관한 큰 결정</li>
</ul>
<div class="fig"><b>일 하나가 지나가는 순서</b><br>
위임: 맡길 범위 결정<br>
&nbsp;&nbsp;↓<br>
설명 ⇄ 분별&nbsp;&nbsp;<span class="an">← 원하는 결과가 나올 때까지 반복</span><br>
&nbsp;&nbsp;↓<br>
책임: 최종 결과 확인 후 내보내기
</div>
<h4>③ CH 1의 네 성질과의 연결</h4>
<table>
<tr><th>성질</th><th>연결되는 역량</th><th>이유</th></tr>
<tr><td>지식</td><td>위임</td><td>AI의 지식이 얕은 범위를 알아야 맡길 일을 구분</td></tr>
<tr><td>작업 기억</td><td>설명</td><td>창의 한도를 알아야 무엇을 먼저 전달할지 결정</td></tr>
<tr><td>조종 가능성</td><td>설명</td><td>말과 의도 사이의 차이를 알아야 지시를 구체적으로 작성</td></tr>
<tr><td>다음 토큰 예측</td><td>분별</td><td>만들어진 답이라는 점을 알아야 확인할 대상을 선택</td></tr>
</table>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>프레임워크(framework)</b>: 생각을 정리하는 틀</li>
<li><b>위임</b>: 일을 다른 쪽에 맡기는 일</li>
<li><b>분별</b>: 옳고 그름, 쓸 수 있는 것과 없는 것을 가려내는 일</li>
</ul>
</div>`},
  {type:"concept", kind:"TOPIC · 주제 설명", h:"역량별 실천 기준",
   html:`<h4>① 위임</h4>
<ul>
<li>맡기기 좋은 일: 정해진 요구를 결과물로 만드는 작업</li>
<li>맡기면 안 되는 일: 판단. 누구를 위해 무엇을 만들지, 내보내도 되는지</li>
<li>맡기기 전에 할 일: 완료 기준 작성</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 맡기기 전에 적는 완료 기준</div>
작업: 설문 응답 500건 요약<br>
완료 기준 1. 응답을 주제 5개 이하로 분류<br>
완료 기준 2. 주제마다 실제 응답 문장 2개 인용<br>
<span class="sel">완료 기준 3. 인용 문장은 원문과 글자 그대로 일치</span>
</div>
<p class="cap">이해를 돕기 위한 예시. 완료 기준이 있어야 결과를 평가할 수 있음.</p>
<h4>② 설명</h4>
<ul>
<li>전달 순서: 사용자의 필요, 요구 사항, 세부 명세, AI에 주는 지시</li>
<li>프롬프트는 이 순서의 마지막 한 단계</li>
<li>AI는 전달받지 않은 내용을 알 수 없음</li>
<li>결과물이 동작하는데 쓸모가 없는 경우: 앞 단계 중 어디에서 설명이 빠졌는지 확인</li>
</ul>
<h4>③ 분별</h4>
<table>
<tr><th>확인 관점</th><th>질문</th></tr>
<tr><td>동작</td><td>실제 입력에서도 맞는 결과가 나오나</td></tr>
<tr><td>품질</td><td>실제 사용 조건에서도 잘 동작하나</td></tr>
<tr><td>적합성</td><td>처음의 문제를 해결하나</td></tr>
<tr><td>사용 경험</td><td>쓰는 사람에게 편한가</td></tr>
<tr><td>영향</td><td>누군가에게 피해를 주지 않나</td></tr>
</table>
<ul>
<li>"동작한다"는 기준 하나만으로는 부족</li>
</ul>
<h4>④ 책임</h4>
<ul>
<li>책임지는 대상은 결과. "AI가 작성했다"는 말은 설명도 변명도 아님</li>
<li>시험 삼아 만드는 일은 자유롭게, 내보내는 일은 가려서</li>
<li>내보내기 전에 확인: 이 결과물을 쓰지 못하는 사람이 있는지</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>완료 기준</b>: 어디까지 되면 끝난 것으로 볼지 미리 적어 둔 조건</li>
<li><b>명세(spec)</b>: 만들 것의 세부 내용을 적은 문서</li>
</ul>
</div>`},
  {type:"quiz", kind:"PRACTICE · 확인 문제", h:"확인 문제: 매끄러운 보고서 초안",
   q:`팀 프로젝트 보고서 초안을 Claude가 작성했다. 문장이 매끄럽고 통계 인용도 여러 개 들어 있다. 제출 전에 할 일로 가장 맞는 것은?`,
   opts:[
     {t:`통계와 인용을 원문과 대조하고, 보고서 내용 전체를 내 이름으로 책임질 수 있는지 확인`, ok:true},
     {t:`"AI가 작성함"이라는 문구를 넣고 그대로 제출`},
     {t:`같은 대화에서 Claude에게 틀린 곳이 없는지 물어보고 없다고 하면 제출`},
     {t:`문장이 매끄러우므로 통계 확인은 생략하고 표현만 다듬어 제출`}
   ],
   hint:`네 역량 중 마지막 두 가지에 해당하는 문제. 결과를 평가하는 일과 결과를 책임지는 일.`,
   explain:{
     good:`분별과 책임에 해당. 통계와 인용은 지어낸 내용이 몰리는 구체적인 값이라 원문 대조가 필요. 제출한 결과의 책임은 작성 방식과 무관하게 제출한 사람에게 있음.`,
     wrongs:[
       `<b>B:</b> 작성 방식을 밝히는 일과 내용을 확인하는 일은 별개. 책임은 그대로 제출자에게 있음.`,
       `<b>C:</b> 같은 대화의 자기 검토는 자기 답을 옳다고 보는 쪽으로 기울어짐. 확인은 원문 대조로 진행.`,
       `<b>D:</b> 매끄러운 문장은 정확하다는 근거가 아님.`
     ]},
   principle:"결과의 책임은 내보낸 사람에게"}
  ]},
{ id:"pfc3", ch:"CH 3", title:"프롬프트 작성 전 네 가지 선택",
  steps:[
  {type:"concept", kind:"CONCEPT · 개념 설명", h:"프롬프트보다 먼저 정하는 네 가지",
   html:`<h4>① 네 가지 선택</h4>
<table>
<tr><th>선택</th><th>정하는 내용</th></tr>
<tr><td>진입점<br><small>entry point</small></td><td>대화, 프로젝트, 아티팩트, 리서치 중 일을 시작할 곳</td></tr>
<tr><td>기능<br><small>capability layer</small></td><td>프로젝트, 스킬, 코드 실행, 메모리 중 함께 쓸 기능</td></tr>
<tr><td>모델<br><small>model</small></td><td>Haiku, Sonnet, Opus 계열 중 쓸 모델</td></tr>
<tr><td>컨텍스트 관리<br><small>context management</small></td><td>대화가 길어질 때 내용을 유지하는 방법</td></tr>
</table>
<ul>
<li>네 가지 선택이 결과물 품질의 상한을 결정</li>
<li>차이가 크게 나는 일: 반복하는 업무, 팀이 함께 하는 일, 검토를 받는 결과물</li>
<li>이 레슨의 기준은 Claude 앱. Claude Code와 API로 만드는 경우의 선택은 Part 1 CH 8에서 다루는 내용</li>
</ul>
<h4>② 진입점</h4>
<table>
<tr><th>일의 종류</th><th>진입점</th><th>설명</th></tr>
<tr><td>한 번 하고 끝나는 질문과 작업</td><td>대화<br><small>Chat</small></td><td>기본 진입점. 그 대화 안에서 시작하고 끝나는 일</td></tr>
<tr><td>배경 정보가 같은 반복 업무</td><td>프로젝트<br><small>Projects</small></td><td>지시문과 지식 자료를 한 번 넣어 두고 계속 쓰는 작업 공간</td></tr>
<tr><td>받는 사람이 열어서 읽는 결과물</td><td>아티팩트<br><small>Artifacts</small></td><td>대화 옆에 따로 열리는 결과물. 문서, 표, 보고서, 코드</td></tr>
<tr><td>여러 자료를 깊이 조사하고 종합하는 일</td><td>리서치<br><small>Research</small></td><td>여러 단계로 검색하고 종합. 간단한 최신 정보 확인은 대화의 웹 검색으로 충분</td></tr>
</table>
<ul>
<li>프로젝트를 만들 조건 세 가지: 반복되는 일, 매번 같은 배경 정보, 일정한 결과물 형식</li>
<li>셋 중 둘 이상에 해당하면 프로젝트가 유리</li>
<li>같은 프로젝트 안의 대화는 지시문과 지식 자료를 함께 사용. 대화 내용은 서로 공유하지 않음</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 매주 하는 회의록 정리</div>
바꾸기 전: 매주 새 대화. 동아리 소개, 정리 형식, 지난주에 남은 안건을 매번 입력<br>
바꾼 뒤: 프로젝트 하나. 동아리 소개와 정리 형식은 지시문과 지식 자료에 저장<br>
<span class="sel">매주 입력할 내용은 그 주의 회의록 하나</span>
</div>
<p class="cap">이해를 돕기 위한 예시. 결과물의 품질은 같고 매주 반복하던 준비 시간이 줄어듦.</p>
<h4>③ 기능</h4>
<table>
<tr><th>기능</th><th>맡는 일</th><th>쓰는 때</th></tr>
<tr><td>프로젝트</td><td>배경 지식과 지시 유지</td><td>같은 배경으로 반복하는 업무</td></tr>
<tr><td>스킬</td><td>정해진 작업 절차</td><td>매번 같은 방식으로 해야 하는 작업</td></tr>
<tr><td>코드 실행</td><td>계산 결과 검증</td><td>숫자를 보고할 때. 자료를 정리하고 바꿀 때. 차트나 내려받을 파일이 필요할 때</td></tr>
<tr><td>메모리</td><td>대화 사이의 연속성</td><td>역할, 선호하는 형식, 늘 적용되는 조건처럼 반복해서 쓰는 사실</td></tr>
</table>
<ul>
<li>네 기능은 서로 독립. 일에 필요한 것만 조합</li>
<li>한 번 묻고 끝나는 질문에는 네 기능이 모두 불필요</li>
<li>코드 실행이 필요한 이유: Claude가 글로 쓴 계산 결과는 그럴듯한 숫자. 코드를 실행해 얻은 결과는 실제로 계산한 값</li>
<li>스킬을 써도 결과는 실행할 때마다 조금씩 다름. 결과 검토는 계속 필요</li>
<li>다른 사람이 만든 스킬은 켜기 전에 출처와 요구하는 권한 확인</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>프롬프트(prompt)</b>: AI에 보내는 지시문</li>
<li><b>진입점(entry point)</b>: Claude 앱에서 일을 시작하는 곳. 대화, 프로젝트, 아티팩트, 리서치</li>
<li><b>지식 자료(knowledge base)</b>: 프로젝트에 올려 두고 모든 대화에서 참고하게 하는 문서</li>
<li><b>스킬(Skills)</b>: 반복하는 업무 과정을 저장해 뒀다가 불러 쓸 수 있는 폴더</li>
<li><b>코드 실행(Code Execution)</b>: Claude가 코드를 직접 작성하고 실행해 결과를 돌려주는 기능. 사용자가 코드를 쓸 필요 없음</li>
<li><b>메모리(Memory)</b>: 대화가 바뀌어도 유지되는 사실을 저장하는 기능</li>
</ul>
</div>`},
  {type:"concept", kind:"TOPIC · 주제 설명", h:"모델과 컨텍스트 관리",
   html:`<h4>① 모델</h4>
<table>
<tr><th>일의 성격</th><th>모델 계열</th></tr>
<tr><td>형식이 정해진 대량 작업. 분류, 추출, 형식 정리, 단순 요약</td><td>Haiku</td></tr>
<tr><td>일상적인 업무. 초안 작성, 종합, 분석, 문서 검토</td><td>Sonnet</td></tr>
<tr><td>복잡한 판단, 중요도가 높은 결과물, 해석이 필요한 애매한 입력</td><td>Opus</td></tr>
</table>
<ul>
<li>일상적인 업무의 기본 모델: Sonnet 계열</li>
<li>어떤 모델을 쓸지 모를 때의 시작 모델: Opus 계열</li>
<li>능력이 높은 계열일수록 느리고 사용량을 더 씀</li>
<li>지금 제공되는 모델 이름과 고르는 순서는 CH 4에서 다루는 내용</li>
</ul>
<h4>② 컨텍스트 관리</h4>
<ul>
<li>컨텍스트 창은 한도가 있는 자원</li>
<li>대화와 올린 문서가 쌓일수록 컨텍스트 창이 참</li>
<li>한도에 가까워지면 Claude 앱이 앞선 대화를 자동으로 요약하는 경우가 있음. 요약되면서 세부 내용이 줄어듦</li>
<li>결과: 대화 초반에 준 지시가 뒤로 갈수록 지켜지지 않음</li>
</ul>
<h4>③ 대응이 필요하다는 신호</h4>
<ul>
<li>앞에서 지키던 지시를 지키지 않음</li>
<li>직전 메시지에만 답하고 앞에서 정한 내용을 반영하지 않음</li>
<li>앞부분의 내용이 필요한 답에서 정확도 하락</li>
</ul>
<h4>④ 대응 세 가지</h4>
<table>
<tr><th>대응</th><th>방법</th><th>맞는 경우</th></tr>
<tr><td>새로 시작<br><small>restart</small></td><td>새 대화 열기. 프로젝트의 지시문과 지식 자료는 그대로 적용</td><td>대화가 많이 어긋났을 때. 같은 업무 안에서 새 작업을 시작할 때</td></tr>
<tr><td>요약<br><small>summarize</small></td><td>결정한 내용, 진행 중인 작업, 남은 질문을 요약하게 한 뒤 새 대화의 첫 메시지로 입력</td><td>하던 일을 이어 가야 할 때</td></tr>
<tr><td>저장<br><small>persist</small></td><td>메모리에 저장하거나 프로젝트의 지식 자료 갱신</td><td>앞으로의 모든 대화에 필요한 정보</td></tr>
</table>
<div class="screen"><div class="sbar">화면 예시 · 새 대화로 옮기기 전의 요약 요청</div>
지금까지의 내용을 새 대화에서 이어 갈 수 있게 정리해 줘.<br>
1. 결정한 내용<br>
2. 진행 중인 작업<br>
3. 남은 질문
</div>
<p class="cap">이해를 돕기 위한 예시. 받은 요약을 새 대화의 첫 메시지로 붙여 넣기.</p>
<ul>
<li>메모리는 정기적으로 검토. 오래되어 맞지 않는 내용은 삭제하거나 수정</li>
<li>능력이 높은 모델로 긴 작업을 하면 사용량 한도에 먼저 닿을 수 있음. 큰 작업은 나눠서 진행</li>
</ul>
<h4>⑤ 확인 순서</h4>
<ul>
<li>첫째, 진입점. 한 번 하는 일, 반복하는 일, 전달할 결과물, 깊은 조사 중 어느 것인지 확인</li>
<li>둘째, 기능. 배경 유지, 정해진 절차, 정확한 계산, 대화 사이의 연속성 중 필요한 것 확인</li>
<li>셋째, 모델. 일의 난이도와 분량 확인</li>
<li>넷째, 컨텍스트 관리. 대화가 길어질 때의 대응 확인</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>컨텍스트 창(context window)</b>: Claude가 한 번에 읽을 수 있는 분량의 한도</li>
<li><b>사용량 한도(usage limit)</b>: 정해진 기간에 Claude를 쓸 수 있는 양의 상한. 요금제마다 다름</li>
</ul>
</div>`},
  {type:"quiz", kind:"PRACTICE · 확인 문제", h:"확인 문제: 매주 반복하는 회의록 정리",
   q:`동아리 총무가 매주 회의록을 정리한다. 월요일마다 새 대화를 열어 동아리 소개, 정리 형식, 지난주에 남은 안건을 다시 입력한 뒤 그 주의 회의록을 붙여 넣는다. 정리 결과에는 만족한다. 준비에 드는 시간을 줄이는 방법은?`,
   opts:[
     {t:`프로젝트를 만들어 동아리 소개와 정리 형식을 지시문과 지식 자료에 넣어 두기`, ok:true},
     {t:`능력이 더 높은 모델로 교체`},
     {t:`리서치로 실행해 여러 자료를 조사하게 하기`},
     {t:`대화 하나를 닫지 않고 매주 같은 대화에 이어서 입력`}
   ],
   hint:`이 일이 반복되는지, 배경 정보가 매번 같은지 확인.`,
   explain:{
     good:`반복되는 일이고 배경 정보와 결과물 형식이 매번 같음. 프로젝트를 만들 조건 세 가지에 모두 해당. 배경을 한 번 넣어 두면 매주 입력할 내용은 그 주의 회의록 하나.`,
     wrongs:[
       `<b>B:</b> 결과 품질에는 이미 만족하는 상황. 모델을 바꿔도 배경을 다시 입력하는 시간은 그대로.`,
       `<b>C:</b> 리서치는 여러 자료를 깊이 조사하는 일에 맞는 진입점. 회의록 정리는 조사가 필요한 일이 아님.`,
       `<b>D:</b> 대화가 길어지면 컨텍스트 창이 차서 초반의 지시가 약해짐. 몇 주 뒤에는 정리 형식을 지키지 않게 됨.`
     ]},
   principle:"반복하는 일의 배경 정보는 프로젝트에 한 번만 입력"}
  ]},
{ id:"pfc4", ch:"CH 4", title:"모델 선택",
  steps:[
  {type:"concept", kind:"CONCEPT · 개념 설명", h:"현재 모델 네 가지",
   html:`<h4>① 모델 목록</h4>
<table>
<tr><th>모델</th><th>맞는 작업</th><th>속도</th><th>요금: 입력 / 출력</th></tr>
<tr><td>Claude Fable 5.2</td><td>어려운 추론. 오래 걸리는 에이전트 작업</td><td>보통</td><td>8달러 / 40달러</td></tr>
<tr><td>Claude Opus 5.5</td><td>오래 걸리는 코딩 에이전트 작업. 지식 업무</td><td>보통</td><td>4달러 / 20달러</td></tr>
<tr><td>Claude Sonnet 5.5</td><td>속도와 능력의 균형이 필요한 일상 작업</td><td>빠름</td><td>2달러 / 10달러</td></tr>
<tr><td>Claude Haiku 5.5</td><td>분류, 추출처럼 양이 많고 빠른 응답이 필요한 작업</td><td>가장 빠름</td><td>0.10달러부터 / 0.50달러부터</td></tr>
</table>
<ul>
<li>요금 단위: 토큰 100만 개당 미국 달러. API 사용 기준</li>
<li>네 모델 모두 컨텍스트 창 100만 토큰</li>
<li>확인 날짜 2026-11-23. 최신 목록과 요금: <a href="https://platform.claude.com/docs/ko/about-claude/models/overview" target="_blank" rel="noopener">Claude 공식 문서 '모델 개요' 페이지</a> (한국어)</li>
</ul>
<h4>② 선택 기준</h4>
<table>
<tr><th>기준</th><th>질문</th></tr>
<tr><td>능력</td><td>이 작업에 필요한 추론 수준은 어느 정도인가</td></tr>
<tr><td>속도</td><td>답이 얼마나 빨리 나와야 하나</td></tr>
<tr><td>비용</td><td>처리할 양과 예산은 얼마인가</td></tr>
<tr><td>effort</td><td>모델을 바꾸지 않고 추론 깊이 조정으로 해결되나</td></tr>
</table>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>입력 토큰, 출력 토큰</b>: Claude에 보낸 글의 토큰과 Claude가 쓴 답의 토큰. 요금이 따로 계산</li>
<li><b>effort</b>: 추론의 깊이를 정하는 설정. Part 4 CH 8에서 다루는 내용</li>
<li><b>에이전트 작업</b>: Claude가 도구를 쓰며 여러 단계를 스스로 진행하는 작업</li>
</ul>
</div>`},
  {type:"concept", kind:"TOPIC · 주제 설명", h:"모델 선택 순서",
   html:`<h4>① 시작 방법 두 가지</h4>
<table>
<tr><th>방법</th><th>순서</th><th>맞는 경우</th></tr>
<tr><td>효율 우선</td><td>Haiku 5.5로 시작. 충분히 시험. 부족한 능력이 확인될 때만 상위 모델로 이동</td><td>양이 많고 비용이 중요한 작업</td></tr>
<tr><td>능력 우선</td><td>Opus 5.5로 시작. 프롬프트 다듬기. 그 뒤 effort를 낮추거나 하위 모델로 이동</td><td>어려운 작업. 품질 확인이 먼저인 작업</td></tr>
</table>
<ul>
<li>일상적인 업무의 기본 모델: Sonnet 5.5</li>
<li>어떤 모델을 쓸지 모를 때의 시작 모델: Opus 5.5</li>
<li>Fable 5.2로 올리는 시점: Opus 5.5의 effort를 xhigh나 max로 올려도 결과가 부족한 경우</li>
<li>모델을 바꾸기 전에 effort 조정 먼저</li>
<li>기준 전체: <a href="https://platform.claude.com/docs/ko/about-claude/models/choosing-a-model" target="_blank" rel="noopener">Claude 공식 문서 '적합한 모델 선택하기' 페이지</a> (한국어)</li>
</ul>
<h4>② 용도별 예</h4>
<table>
<tr><th>필요</th><th>모델</th><th>예</th></tr>
<tr><td>가장 높은 능력</td><td>Fable 5.2</td><td>몇 시간씩 이어지는 에이전트 작업. 여러 단계의 깊은 조사</td></tr>
<tr><td>복잡한 코딩과 업무</td><td>Opus 5.5</td><td>스스로 코드를 고치는 에이전트. 대규모 코드 정리</td></tr>
<tr><td>일상 작업의 속도와 능력</td><td>Sonnet 5.5</td><td>코드 작성, 자료 분석, 글 작성</td></tr>
<tr><td>가장 빠른 응답과 낮은 비용</td><td>Haiku 5.5</td><td>실시간 서비스. 대량 처리. 서브에이전트 작업</td></tr>
</table>
<h4>③ 역할별로 다른 모델 사용</h4>
<div class="fig"><b>에이전트 여러 개를 쓰는 구성의 예</b><br>
코디네이터: Opus 5.5&nbsp;&nbsp;<span class="an">← 작업 분해와 최종 판단</span><br>
&nbsp;├─ 분류 서브에이전트: Haiku 5.5&nbsp;&nbsp;<span class="an">← 단순하고 양이 많은 작업</span><br>
&nbsp;└─ 분석 서브에이전트: Sonnet 5.5&nbsp;&nbsp;<span class="an">← 속도와 능력의 균형</span>
</div>
<div class="screen"><div class="sbar">화면 예시 · 효율 우선으로 시험한 기록</div>
1차: Haiku 5.5. 문의 500건 분류. 정확도 96%<br>
<span class="sel">판단: 목표 95% 충족. 상위 모델로 올리지 않음</span>
</div>
<p class="cap">이해를 돕기 위한 예시 수치.</p>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>상위 모델, 하위 모델</b>: 능력이 더 높은 모델과 더 가볍고 빠른 모델</li>
<li><b>실시간 서비스</b>: 사용자가 기다리는 동안 바로 답해야 하는 서비스</li>
</ul>
</div>`},
  {type:"quiz", kind:"PRACTICE · 확인 문제", h:"확인 문제: 문의 분류",
   q:`하루 30만 건의 고객 문의를 "환불, 배송, 계정, 기타" 네 가지로 분류하는 기능을 만든다. 답은 1초 안에 나와야 하고 예산이 빠듯하다. 처음 시험할 모델로 가장 맞는 것은?`,
   opts:[
     {t:`Haiku 5.5로 시작해 충분히 시험하고, 부족한 점이 확인되면 상위 모델 검토`, ok:true},
     {t:`Fable 5.2. 능력이 가장 높은 모델이 분류도 가장 정확`},
     {t:`Opus 5.5로 시작하고 effort를 max로 설정`},
     {t:`컨텍스트 창이 가장 큰 모델`}
   ],
   hint:`작업의 난이도, 처리할 양, 응답 시간, 예산을 차례로 확인.`,
   explain:{
     good:`단순 분류, 많은 양, 빠른 응답, 빠듯한 예산이라는 조건. 효율 우선 방법에 해당. 가장 빠르고 저렴한 모델로 시작해 시험하고 부족할 때만 올리는 순서.`,
     wrongs:[
       `<b>B:</b> 네 가지 분류에는 가장 높은 능력이 필요하지 않음. 속도와 비용 조건에 맞지 않음.`,
       `<b>C:</b> effort를 max로 올리면 시간과 비용 증가. 1초 조건과 예산에 맞지 않음.`,
       `<b>D:</b> 네 모델의 컨텍스트 창은 모두 100만 토큰. 선택 기준이 될 수 없음.`
     ]},
   principle:"작업 조건에 맞는 가장 가벼운 모델부터 시험"}
  ]}
  ]};
  function addBeforeTest(pk, L){
    var P = C[pk]; if(!P || !P.lessons) return;
    if(P.lessons.some(function(x){ return x && x.id === L.id; })) return;
    var i = P.lessons.findIndex(function(x){ return x && x.type === "test"; });
    if(i < 0) P.lessons.push(L); else P.lessons.splice(i, 0, L);
  }
  addBeforeTest("p1", { id:"p1c8", ch:"CH 8", title:"에이전트를 실행하는 네 가지 방법",
  steps:[
  {type:"concept", kind:"CONCEPT · 개념 설명", h:"에이전트 실행 방법 네 가지",
   html:`<h4>① 같은 구조, 다른 실행 방법</h4>
<ul>
<li>이 파트에서 다룬 구조: 에이전트 루프, 서브에이전트, 훅, 세션</li>
<li>이 구조를 실행하는 방법은 네 가지</li>
<li>차이: 반복 실행을 맡는 쪽과 실행 장소</li>
</ul>
<h4>② 네 가지 방법</h4>
<table>
<tr><th>방법</th><th>반복 실행을 맡는 쪽</th><th>실행 장소</th><th>맞는 상황</th></tr>
<tr><td>API 직접 호출</td><td>내가 만든 프로그램. 도구 러너 사용 가능</td><td>내 프로그램</td><td>반복 방식을 직접 설계하고 세밀하게 제어하는 경우</td></tr>
<tr><td>Agent SDK</td><td>Agent SDK</td><td>내 프로그램</td><td>Claude Code의 도구, 권한, 세션, 훅을 내 프로그램에 넣는 경우</td></tr>
<tr><td>Claude Code</td><td>Claude Code</td><td>내 컴퓨터의 터미널</td><td>대화하면서 직접 작업하는 경우. 한 번 실행하고 끝나는 작업</td></tr>
<tr><td>Managed Agents</td><td>Anthropic</td><td>Anthropic이 운영하는 환경. 자체 운영 환경도 가능</td><td>오래 걸리는 작업. 예약 실행. 상태를 서버에 보관하는 작업</td></tr>
</table>
<div class="fig"><b>맡는 범위 비교</b><br>
API 직접 호출: 반복 실행은 나, 도구 실행은 나, 실행 환경은 나<br>
Agent SDK: 반복 실행은 SDK, 도구 실행은 SDK, 실행 환경은 나<br>
Managed Agents: 반복 실행, 도구 실행, 실행 환경 모두 Anthropic&nbsp;&nbsp;<span class="an">← 맡기는 범위가 가장 넓음</span>
</div>
<ul>
<li>비교표 원문: <a href="https://code.claude.com/docs/ko/agent-sdk/overview" target="_blank" rel="noopener">Claude Code 공식 문서 'Agent SDK 개요' 페이지</a> (한국어)</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>SDK</b>: 프로그램을 쉽게 만들 수 있게 미리 만들어 둔 개발 도구 묶음</li>
<li><b>Agent SDK</b>: Claude Code의 기능을 내 프로그램에서 쓰게 해 주는 개발 도구</li>
<li><b>Managed Agents</b>: Anthropic이 실행 환경까지 운영해 주는 에이전트 서비스</li>
</ul>
</div>`},
  {type:"concept", kind:"TOPIC · 주제 설명", h:"Managed Agents의 구성과 방법 선택",
   html:`<h4>① Managed Agents의 구성 요소</h4>
<table>
<tr><th>요소</th><th>내용</th></tr>
<tr><td>에이전트<br>agent</td><td>모델, 시스템 프롬프트, 도구, MCP 서버, 스킬을 묶은 설정</td></tr>
<tr><td>환경<br>environment</td><td>세션이 실행되는 공간. 다른 것에 영향을 주지 않게 분리된 공간</td></tr>
<tr><td>세션<br>session</td><td>환경 안에서 작업 하나를 수행하는 실행 단위. 대화 기록과 작업 상태를 서버에 보관. 멈췄다가 이어서 진행 가능</td></tr>
<tr><td>이벤트<br>events</td><td>내 프로그램과 에이전트가 주고받는 메시지. 사용자 요청, 도구 결과, 상태 알림</td></tr>
</table>
<ul>
<li>설명 전체: <a href="https://platform.claude.com/docs/ko/managed-agents/overview" target="_blank" rel="noopener">Claude 공식 문서 'Claude Managed Agents 개요' 페이지</a> (한국어)</li>
</ul>
<h4>② 선택 순서</h4>
<ul>
<li>1단계: 사람이 대화하며 쓰는 작업인지 확인. 그렇다면 Claude Code</li>
<li>2단계: 내 프로그램에 에이전트를 넣는 작업인지 확인. Claude Code의 기능을 그대로 쓰려면 Agent SDK</li>
<li>3단계: 실행 환경 운영을 맡길지 확인. 맡기려면 Managed Agents</li>
<li>4단계: 반복 방식부터 직접 설계하려면 API 직접 호출</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 같은 작업의 네 가지 실행</div>
작업: 테스트가 실패하는 원인 찾기<br>
Claude Code: 터미널에 요청 입력<br>
Agent SDK: 내 프로그램의 코드에서 같은 요청 호출<br>
Managed Agents: 세션을 만들고 요청 전송. 진행 상황은 이벤트로 수신<br>
API 직접 호출: 요청 전송과 도구 실행을 내 코드가 반복
</div>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>샌드박스(sandbox)</b>: 다른 프로그램이나 자료에 영향을 주지 않게 분리해 둔 실행 공간</li>
<li><b>예약 실행</b>: 정해 둔 시각에 자동으로 실행되는 방식</li>
</ul>
</div>`},
  {type:"quiz", kind:"PRACTICE · 확인 문제", h:"확인 문제: 밤마다 도는 조사 에이전트",
   q:`한 팀이 매일 밤 2시간 넘게 걸리는 자료 조사 에이전트를 운영하려 한다. 팀은 실행 환경과 반복 실행을 직접 관리하고 싶지 않고, 작업이 중간에 멈추면 이어서 진행할 수 있어야 한다. 가장 맞는 방법은?`,
   opts:[
     {t:`Managed Agents. 반복 실행과 실행 환경을 Anthropic이 운영하고 세션 상태를 서버에 보관`, ok:true},
     {t:`API 직접 호출. 반복 실행을 가장 세밀하게 제어 가능`},
     {t:`Claude Code 대화형 실행. 매일 밤 담당자가 터미널에 요청 입력`},
     {t:`Agent SDK. Claude Code의 도구와 세션을 내 프로그램에서 사용 가능`}
   ],
   hint:`조건 두 가지 확인. 팀이 직접 관리하지 않으려는 대상, 그리고 멈춘 뒤 이어서 진행하는 방법.`,
   explain:{
     good:`실행 환경과 반복 실행을 맡기려는 조건, 오래 걸리는 예약 작업, 상태 보관이라는 조건이 모두 Managed Agents에 해당.`,
     wrongs:[
       `<b>B:</b> 반복 실행과 도구 실행, 실행 환경을 모두 팀이 만들고 운영해야 하는 방법. 직접 관리하지 않는다는 조건과 반대.`,
       `<b>C:</b> 사람이 매일 밤 입력해야 하는 방법. 예약 실행 조건에 맞지 않음.`,
       `<b>D:</b> 반복 실행은 SDK가 맡지만 실행 환경은 팀이 운영. 조건의 절반만 충족.`
     ]},
   principle:"실행 방법은 맡길 범위로 결정"}
  ]});
  addBeforeTest("p2", { id:"p2c6", ch:"CH 6", title:"서버에서 실행되는 도구와 Agent Skills",
  steps:[
  {type:"concept", kind:"CONCEPT · 개념 설명", h:"도구가 실행되는 장소: 내 프로그램과 Anthropic 서버",
   html:`<h4>① 실행 장소에 따른 구분</h4>
<table>
<tr><th>구분</th><th>실행 장소</th><th>내 프로그램이 할 일</th><th>예</th></tr>
<tr><td>클라이언트 도구<br>client tools</td><td>내 프로그램</td><td>Claude의 도구 요청을 받아 실행하고 결과를 돌려보내기</td><td>직접 만든 도구. Anthropic이 양식을 정해 둔 bash, 텍스트 편집기, 컴퓨터 사용, 메모리</td></tr>
<tr><td>서버 도구<br>server tools</td><td>Anthropic 서버</td><td>없음. 결과가 같은 답 안에 포함</td><td>웹 검색, 웹 페이지 가져오기, 코드 실행, 도구 검색</td></tr>
</table>
<div class="fig"><b>요청 한 번의 흐름</b><br>
클라이언트 도구: 요청 → Claude의 도구 요청 → 내 프로그램이 실행 → 결과 전송 → 답<br>
서버 도구: 요청 → Anthropic 서버가 도구 실행 → 답&nbsp;&nbsp;<span class="an">← 내 프로그램이 도구를 실행할 필요 없음</span>
</div>
<h4>② 서버 도구</h4>
<table>
<tr><th>도구</th><th>기능</th></tr>
<tr><td>웹 검색<br>web search</td><td>최신 정보를 검색해 답에 반영</td></tr>
<tr><td>웹 페이지 가져오기<br>web fetch</td><td>지정한 주소의 내용 읽기</td></tr>
<tr><td>코드 실행<br>code execution</td><td>분리된 공간에서 코드를 실행해 계산과 자료 분석</td></tr>
<tr><td>도구 검색<br>tool search</td><td>도구가 많을 때 필요한 도구만 찾아 불러오기</td></tr>
</table>
<ul>
<li>서버 도구의 반복이 한도에 닿으면 <code>stop_reason</code>이 <code>pause_turn</code>. 받은 답을 그대로 붙여 다시 요청</li>
<li>MCP 커넥터: 원격 MCP 서버를 API 요청에서 바로 연결하는 기능</li>
<li>설명 전체: <a href="https://platform.claude.com/docs/ko/agents-and-tools/tool-use/overview" target="_blank" rel="noopener">Claude 공식 문서 'Claude와 함께하는 도구 사용' 페이지</a> (한국어)</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>클라이언트(client)</b>: Claude를 호출하는 쪽. 여기서는 내 프로그램</li>
<li><b>서버(server)</b>: 요청을 받아 처리하는 쪽. 여기서는 Anthropic의 컴퓨터</li>
<li><b>pause_turn</b>: 서버 도구의 작업이 길어져 잠시 멈췄다는 표시. Part 1 CH 1에서 다룬 내용</li>
</ul>
</div>`},
  {type:"concept", kind:"TOPIC · 주제 설명", h:"Agent Skills: 필요할 때 불러 쓰는 업무 과정 묶음",
   html:`<h4>① Agent Skills</h4>
<ul>
<li>업무 과정과 참고 자료를 폴더로 묶어 Claude가 필요할 때 불러 쓰는 기능</li>
<li>Part 3 CH 2의 스킬과 같은 원리</li>
<li>구성: 지시문 파일 SKILL.md, 이름과 설명, 스크립트나 양식 같은 자료</li>
</ul>
<h4>② 단계별 로드</h4>
<table>
<tr><th>단계</th><th>로드되는 내용</th><th>로드 시점</th></tr>
<tr><td>1</td><td>이름과 설명</td><td>항상</td></tr>
<tr><td>2</td><td>SKILL.md 본문</td><td>요청이 스킬 설명에 해당할 때</td></tr>
<tr><td>3</td><td>참고 파일과 스크립트</td><td>필요할 때</td></tr>
</table>
<ul>
<li>효과: 스킬을 많이 등록해도 평소에 차지하는 컨텍스트는 이름과 설명 분량</li>
</ul>
<h4>③ Anthropic이 제공하는 스킬</h4>
<ul>
<li>파워포인트(pptx), 엑셀(xlsx), 워드(docx), PDF 문서 작업</li>
<li>직접 만든 스킬도 등록 가능</li>
</ul>
<h4>④ 사용하는 곳</h4>
<table>
<tr><th>곳</th><th>방법</th></tr>
<tr><td>Claude API</td><td>요청에 스킬 지정. 코드 실행 도구 필요</td></tr>
<tr><td>Claude Code</td><td>개인 스킬 폴더 또는 프로젝트 스킬 폴더에 보관</td></tr>
<tr><td>Claude 앱</td><td>스킬 파일 올리기. 지원하는 요금제에서 사용</td></tr>
</table>
<ul>
<li>설명 전체: <a href="https://platform.claude.com/docs/ko/agents-and-tools/agent-skills/overview" target="_blank" rel="noopener">Claude 공식 문서 'Agent Skills' 페이지</a> (한국어)</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 스킬을 쓴 요청과 결과</div>
요청: "3분기 매출 자료로 발표 자료 만들어 줘"<br>
Claude: pptx 스킬 로드 후 코드 실행 도구로 파일 작성<br>
<span class="sel">결과: 3분기-매출.pptx</span>
</div>
<p class="cap">이해를 돕기 위한 예시.</p>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>스크립트(script)</b>: 명령을 순서대로 적어 둔 파일</li>
<li><b>단계별 로드</b>: 필요한 시점에 필요한 만큼만 불러오는 방식. 영어 이름은 progressive disclosure</li>
</ul>
</div>`},
  {type:"quiz", kind:"PRACTICE · 확인 문제", h:"확인 문제: 최신 환율",
   q:`고객 문의 응답 서비스가 최신 환율을 반영해 답해야 한다. 개발 인력이 부족해서 도구를 실행하는 프로그램을 따로 만들고 운영하기 어렵다. 가장 맞는 방법은?`,
   opts:[
     {t:`웹 검색 서버 도구 사용. Anthropic 서버에서 실행되어 내 프로그램이 도구를 실행할 필요 없음`, ok:true},
     {t:`환율 조회 도구를 직접 만들어 클라이언트 도구로 연결`},
     {t:`시스템 프롬프트에 "항상 최신 환율로 답할 것"이라고 지시`},
     {t:`컨텍스트 창이 더 큰 모델로 교체`}
   ],
   hint:`두 조건 확인. 학습 이후의 정보가 필요하다는 점, 그리고 도구 실행 프로그램을 만들기 어렵다는 점.`,
   explain:{
     good:`최신 환율은 학습 이후의 정보라 도구가 필요. 서버 도구는 Anthropic 서버에서 실행되어 내 프로그램이 도구 요청을 받아 실행하는 부분이 필요 없음.`,
     wrongs:[
       `<b>B:</b> 가능한 방법이지만 도구 요청을 받아 실행하고 결과를 돌려보내는 프로그램을 만들고 운영해야 함. 인력 조건에 맞지 않음.`,
       `<b>C:</b> 지시만으로는 학습 이후의 정보를 알 수 없음. 그럴듯한 숫자를 지어낼 위험.`,
       `<b>D:</b> 컨텍스트 창의 크기는 최신 정보와 무관.`
     ]},
   principle:"학습 이후의 정보는 도구로 보완"}
  ]});
  addBeforeTest("p4", { id:"p4c8", ch:"CH 8", title:"사고와 effort 설정",
  steps:[
  {type:"concept", kind:"CONCEPT · 개념 설명", h:"사고: Claude가 답하기 전에 단계별로 추론하는 기능",
   html:`<h4>① 사고(thinking)</h4>
<ul>
<li>Claude가 답을 쓰기 전에 문제를 단계별로 풀어 보는 기능. 영어 이름은 extended thinking</li>
<li>필요한 이유: 여러 단계를 거쳐야 하는 질문에 바로 답하면 틀린 답을 자신 있게 내놓는 경우 발생</li>
</ul>
<h4>② 적응형 사고(adaptive thinking)</h4>
<ul>
<li>질문의 난이도에 따라 추론할지와 얼마나 추론할지를 Claude가 결정하는 방식</li>
<li>추론에 쓸 분량을 사람이 숫자로 정하지 않음</li>
<li>설정: <code>thinking</code> 항목에 <code>{"type": "adaptive"}</code></li>
<li>추론 내용 보기: <code>"display": "summarized"</code>를 추가하면 추론의 요약이 답과 함께 반환</li>
<li>Claude Fable 5.2, Opus 5.5, Sonnet 5.5는 항상 사고하는 모델</li>
</ul>
<h4>③ effort</h4>
<ul>
<li>추론의 깊이를 정하는 설정</li>
<li>설정 위치: <code>output_config</code> 항목. <code>thinking</code> 항목 안이 아님</li>
</ul>
<table>
<tr><th>값</th><th>추론 깊이</th></tr>
<tr><td><code>low</code></td><td>가장 얕음</td></tr>
<tr><td><code>medium</code></td><td>중간</td></tr>
<tr><td><code>high</code></td><td>깊음. 기본값</td></tr>
<tr><td><code>xhigh</code></td><td>더 깊음</td></tr>
<tr><td><code>max</code></td><td>가장 깊음</td></tr>
</table>
<div class="fig"><b>요청에 넣는 설정</b><br>
thinking: { "type": "adaptive", "display": "summarized" }&nbsp;&nbsp;<span class="an">← 추론 요약을 답과 함께 받기</span><br>
output_config: { "effort": "high" }&nbsp;&nbsp;<span class="an">← 추론 깊이</span>
</div>
<ul>
<li>설정 방법 전체: <a href="https://platform.claude.com/docs/ko/build-with-claude/adaptive-thinking" target="_blank" rel="noopener">Claude 공식 문서 '사고 조정하기' 페이지</a> (한국어)</li>
</ul>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>추론</b>: 주어진 내용에서 단계를 밟아 결론에 이르는 과정</li>
<li><b>요약 표시(summarized)</b>: 추론 전체가 아니라 추론을 줄인 내용을 돌려주는 설정</li>
</ul>
</div>`},
  {type:"concept", kind:"TOPIC · 주제 설명", h:"사고가 도움이 되는 작업과 effort 선택",
   html:`<h4>① 도움이 되는 작업</h4>
<ul>
<li>계산과 여러 단계의 논리</li>
<li>코드 오류의 원인 찾기</li>
<li>규정 해석</li>
<li>장단점을 따져 선택지를 비교하는 작업</li>
</ul>
<h4>② 도움이 되지 않는 작업</h4>
<ul>
<li>단순 분류, 추출, 정해진 양식 채우기. 시간과 비용만 증가</li>
<li>같은 세션의 자기 검토. 원인이 추론의 양이 아니라 세션에 남은 맥락. CH 6에서 다룬 내용</li>
</ul>
<h4>③ effort 선택</h4>
<table>
<tr><th>상황</th><th>조정</th></tr>
<tr><td>처음 시작</td><td>기본값 high</td></tr>
<tr><td>어려운 작업에서 결과가 부족</td><td>xhigh 또는 max로 올리기</td></tr>
<tr><td>단순한 작업에서 시간과 비용이 문제</td><td>medium 또는 low로 낮추기</td></tr>
</table>
<ul>
<li>effort가 높을수록 추론이 깊어지고 시간과 비용 증가</li>
<li>모델을 바꾸기 전에 effort 조정 먼저</li>
</ul>
<div class="screen"><div class="sbar">화면 예시 · 추론 요약이 함께 온 답</div>
[사고 요약] 경유지 후보 두 곳의 날씨와 이동 시간 비교. 한 곳은 맑지만 이동 3시간, 다른 곳은 흐리지만 1시간<br>
[도구 호출] 날씨 조회<br>
<span class="sel">[답] 추천 경로와 이유</span>
</div>
<p class="cap">이해를 돕기 위한 예시. 장단점을 비교하는 질문에서 사고 내용이 답의 근거로 쓰임.</p>
<div class="callout">📖 <b>용어 카드</b>
<ul>
<li><b>기본값</b>: 따로 지정하지 않을 때 적용되는 값</li>
<li><b>자기 검토</b>: 결과물을 만든 세션이 자기 결과물을 검토하는 일</li>
</ul>
</div>`},
  {type:"quiz", kind:"PRACTICE · 확인 문제", h:"확인 문제: 영수증 5만 건",
   q:`영수증에서 날짜와 금액만 뽑아내는 작업을 하루 5만 건 처리한다. 결과는 정확한데 비용과 처리 시간이 문제다. effort는 기본값인 high로 설정돼 있다. 가장 먼저 할 조치는?`,
   opts:[
     {t:`effort 낮추기. 단순 추출에는 깊은 추론이 필요 없어 시간과 비용만 증가`, ok:true},
     {t:`effort를 max로 올리기. 추론이 깊어지면 처리도 빨라짐`},
     {t:`추론 요약 표시 켜기`},
     {t:`프롬프트에 "빠르게 답할 것"이라고 추가`}
   ],
   hint:`작업의 종류 확인. 깊은 추론이 필요한 작업인지 단순한 작업인지.`,
   explain:{
     good:`날짜와 금액 추출은 단순 작업. 결과가 이미 정확하므로 추론 깊이를 낮춰 시간과 비용을 줄이는 조치가 먼저.`,
     wrongs:[
       `<b>B:</b> effort를 올리면 추론이 깊어져 시간과 비용이 더 증가.`,
       `<b>C:</b> 요약 표시는 추론 내용을 보여 주는 설정. 비용과 시간을 줄이지 않음.`,
       `<b>D:</b> 추론 깊이는 설정으로 정하는 값. 지시 문장보다 설정 조정이 직접적인 방법.`
     ]},
   principle:"추론 깊이는 작업 난이도에 맞춰 조정"}
  ]});
})();
