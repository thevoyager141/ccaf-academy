/* PART 0 — 오리엔테이션 */
window.CCAF_CONTENT.p0 = {
  id: "p0",
  lessons: [

  { id:"p0l1", ch:"0-1", title:"V2 시험 해부",
    steps:[
      {type:"concept", kind:"TOPIC · 시험 구조", h:"시험이 어떻게 생겼는지부터 알고 시작하자",
       html:`<p class="lead">상대를 알아야 전략이 나온다. V2 시험의 뼈 구조.</p>
        <h4>기본 정보</h4>
        <ul>
          <li><strong>60문항 · 120분</strong> — 문항당 평균 2분</li>
          <li>형식(가이드 V1.0 명시): <strong>객관식 + 복수응답(multiple-response) 혼합</strong> — 복수응답 문항은 <strong>"몇 개를 고르라"고 문항에 명시</strong>됨. 지시 개수를 꼭 확인하고 답할 것</li>
          <li>오답 보기들은 "불완전하게 아는 사람이 고를 만하게" 설계됨 — 이 사이트의 연습 문제는 단일 정답형으로 훈련하지만, 판단 원리는 동일</li>
          <li>운영 정보: 시험 코드 <strong>CCAR-F</strong> · $125 · Pearson VUE 감독(온라인/시험장) · 유효기간 12개월</li>
          <li>합격 여부는 <strong>응시 종료 직후 화면에서 바로</strong> 나옴 (실제 응시자 후기로 확인) — 끝나자마자 결과를 본다는 것까지 마음의 준비</li>
          <li>실제 응시 후기(7/16, 신규 버전): 개념 암기형이 아니라 <strong>"이 상황에서 어떻게 해결/가장 효율적인 설계는?"</strong> 판단형 위주. 출제 확인된 무대: <strong>구조화 데이터 추출 · CI/CD · Agent SDK 워크플로</strong> — 이 사이트의 실전 진단형 문항·모의고사 구조와 동일한 방향</li>
          <li><strong>답을 골라야 다음 문항으로</strong> — 건너뛰기 불가 (V2에서 바뀐 규칙)</li>
          <li>점수는 100~1,000 스케일 · <strong>합격선 720</strong> · 유효기간 12개월</li>
        </ul>
        <h4>시나리오 구조 (V2의 핵심)</h4>
        <ul>
          <li>시나리오 은행 <strong>6개</strong> 중 <strong>4개가 랜덤</strong>으로 출제</li>
          <li>문항이 개별로 흩어져 있지 않고 <strong>시나리오 아래 묶음</strong>으로 나옴</li>
          <li>6개 시나리오: ①고객지원 에이전트 ②Claude Code 코드 생성 ③멀티에이전트 리서치 ④개발자 생산성 도구 ⑤CI/CD 통합 ⑥구조화 데이터 추출</li>
        </ul>
        <h4>도메인 5개와 가중치</h4>
        <ul>
          <li>D1 에이전트 아키텍처 — <strong>27%</strong> (최대)</li>
          <li>D3 Claude Code — 20% · D4 프롬프트/구조화 출력 — 20%</li>
          <li>D2 도구·MCP — 18% · D5 컨텍스트/신뢰성 — 15%</li>
        </ul>
        <div class="callout">⏱ 시간 전략: 아는 문제는 30초 컷 → 아낀 시간을 긴 시나리오 지문 문제에 재배분. 미응답 불가라서 "일단 넘기고 나중에"가 없다. 매 문항 그 자리에서 결정.</div>`},
    ]},

  { id:"p0l2", ch:"0-2", title:"1차 629점 복기",
    steps:[
      {type:"concept", kind:"TOPIC · 데이터 복기", h:"어디서 91점이 새어나갔나",
       html:`<p class="lead">1차 결과(6/21)를 감정 빼고 데이터로만 보자.</p>
        <h4>결과 요약</h4>
        <ul>
          <li>629점 / 합격선 720 — <strong>91점 부족</strong></li>
          <li>37/60 정답 (62%) — 합격권은 약 <strong>45/60 (75%)</strong> → <strong>8문항</strong>을 더 잡아야 함</li>
        </ul>
        <h4>도메인별 성적</h4>
        <ul>
          <li>D5 컨텍스트/신뢰성 — <strong>50%</strong> 🔴 절반은 찍은 수준, 최우선 보강</li>
          <li>D1 에이전트 아키텍처 — <strong>60%</strong> 🔴 비중 27%라 실점이 가장 큼 (~6문항)</li>
          <li>D3 Claude Code — <strong>61%</strong> 🔴</li>
          <li>D2 도구·MCP — 64% 🟡</li>
          <li>D4 프롬프트/구조화 출력 — <strong>75%</strong> 🟢 유일한 강점, 만점 노리기</li>
        </ul>
        <h4>진짜 패인 (가이드 전수 대조로 확인됨)</h4>
        <ul>
          <li>범위 밖 출제가 아니었음 — 틀린 유형 대부분이 <strong>가이드 안에 그대로 있었음</strong></li>
          <li>용어는 알았지만 <strong>"이 상황에서 무엇이 최선인가"</strong>를 묻는 판단형에서 무너짐</li>
          <li>결론: 용어 암기 → <strong>판단 훈련</strong>으로 공부 방식 전환. 이 코스의 존재 이유</li>
        </ul>
        <div class="callout">🎯 목표 설정: D5 50%→75%+, D1 60%→75%+, D4 75%→90%+. 이것만 달성해도 45문항 라인을 넘는다.</div>`},
    ]},

  { id:"p0l3", ch:"0-3", title:"판단 원칙 5 — 문제 푸는 필터",
    steps:[
      {type:"concept", kind:"TOPIC · 핵심 도구", h:"모든 문제에 들이대는 5개의 필터",
       html:`<p class="lead">공식 시험 가이드 맨 뒤에는 <strong>예시 문제 12개</strong>가 실려 있어 — 이후 강의에서 "샘플 N번"이라고 부르는 게 바로 그 문항들이야. 이 레슨의 원칙 5개는 그 12문항의 정답 논리를 추출한 것. 앞으로 모든 연습 문제 해설에 이 태그가 붙는다.</p>
        <h4>① 강제는 프로그램으로, 성향은 프롬프트로</h4>
        <ul>
          <li>돈·인증·규정처럼 <strong>100% 지켜야 하는 규칙</strong> → 훅, 전제조건 게이트로 차단</li>
          <li>프롬프트 지시는 확률적 — "반드시 ~해"라고 써도 실패율이 0이 아님</li>
          <li>단서: "occasionally", "12% of cases" 같은 실패율 언급 → 프로그램적 강제가 정답</li>
        </ul>
        <h4>② 증상 말고 근본 원인</h4>
        <ul>
          <li>로그·데이터가 가리키는 <strong>원인을 직접 고치는 보기</strong>가 정답</li>
          <li>증상만 덮는 보기(제한 추가, 결과 필터링)는 오답</li>
        </ul>
        <h4>③ 과잉 설계 금지</h4>
        <ul>
          <li>"별도 분류 모델 학습", "라우팅 레이어 구축" 같은 거창한 보기 → 대개 오답</li>
          <li>"가장 효과적인 <strong>첫</strong> 조치"를 물으면 → 낮은 비용으로 원인을 직접 고치는 것</li>
        </ul>
        <h4>④ 최소 권한</h4>
        <ul>
          <li>에이전트에겐 역할에 필요한 도구만 — 도구가 많으면 오선택 증가</li>
          <li>고빈도 요구(85%)엔 좁은 전용 도구 하나, 나머지(15%)는 기존 경로 유지</li>
        </ul>
        <h4>⑤ 실패는 구조화해서 전달</h4>
        <ul>
          <li>에러 숨기기(빈 결과를 성공처럼), 전체 중단, 뭉뚱그린 "실패" → 전부 오답</li>
          <li>정답 패턴: <strong>실패 유형 + 시도한 것 + 부분 결과 + 대안</strong>을 담아 위로 전달</li>
        </ul>
        <div class="callout">🎯 실전 사용법: 보기 4개를 읽고 "이건 원칙 몇 번 위반"으로 소거하면 대부분 2개가 남고, 남은 2개는 "첫 조치로 더 싼 것"이 정답인 경우가 많다.</div>`},
    ]},

  { id:"p0l4", ch:"0-4", title:"비출제 범위 지도 — 오답 소거기",
    steps:[
      {type:"concept", kind:"TOPIC · 소거 도구", h:"몰라도 되는 것들이 오답을 골라준다",
       html:`<p class="lead">공식 가이드는 "시험에 안 나오는 것" 목록을 명시해뒀다. 이건 공부 시간 절약 이상의 무기 — <strong>범위 밖 키워드가 박힌 보기는 거의 항상 오답</strong>이다.</p>
        <h4>공식 비출제 목록 (가이드 명시)</h4>
        <ul>
          <li><strong>모델 내부·학습</strong>: 파인튜닝, 커스텀 모델 학습, Claude 내부 아키텍처·가중치, Constitutional AI, RLHF</li>
          <li><strong>계정·요금</strong>: API 인증·빌링·계정 관리, 레이트 리밋·쿼터·요금 계산, 토큰 카운팅 알고리즘</li>
          <li><strong>인프라</strong>: MCP 서버 배포·호스팅(네트워크·컨테이너), 특정 클라우드(AWS/GCP/Azure) 설정</li>
          <li><strong>다른 기능 영역</strong>: computer use(브라우저·데스크톱 자동화), 비전/이미지 분석, 스트리밍 API·SSE</li>
          <li><strong>보안 프로토콜</strong>: OAuth, API 키 로테이션, 인증 프로토콜 상세</li>
          <li><strong>기타</strong>: 임베딩·벡터 DB 구현, 성능 벤치마킹·모델 비교 지표, 프롬프트 캐싱 구현 상세(존재만 알면 됨), 특정 언어·프레임워크 심화</li>
        </ul>
        <h4>소거기로 쓰는 법</h4>
        <ul>
          <li>보기에 <strong>"파인튜닝으로 해결"</strong> → 소거 (범위 밖 + 과잉 설계 이중 위반)</li>
          <li>보기에 <strong>"벡터 DB를 구축해서"</strong>, <strong>"Kubernetes에"</strong>, <strong>"별도 분류 모델을 학습"</strong> → 소거</li>
          <li>보기에 <strong>존재하지 않는 기능</strong> — CLAUDE_HEADLESS 환경변수, --batch 플래그, 세션 공유 메모리, 컨텍스트 첨부 플래그 → 소거</li>
        </ul>
        <h4>경계선 주제 (개념만, 구현은 범위 밖)</h4>
        <ul>
          <li>RAG: "외부 지식을 컨텍스트에 넣는다"는 개념까지만 — 임베딩·벡터 DB 구현은 밖</li>
          <li>인증: "비밀키는 환경변수로, \${ENV_VAR} 확장" 까지만 — OAuth 플로우는 밖</li>
          <li>프롬프트 캐싱: 존재한다는 것까지만</li>
        </ul>
        <div class="callout">⚠️ 구버전 자료 주의: V1 기반 자료들의 "모르면 표시하고 넘어갔다가 나중에" 전략은 <b>V2에서 무효</b> — V2는 답을 골라야 다음 문항으로 진행되고 건너뛰기가 없다. 매 문항 그 자리에서 소거 → 결정.</div>`},
    ]},

  { id:"p0l5", ch:"0-5", title:"8/8 모의고사 복기 — 남은 약점 4개",
    steps:[
      {type:"concept", kind:"CONCEPT · 개념 설명", h:"880점, 그런데 읽는 법이 중요해",
       html:`<p class="lead">2026-08-08 모의고사 결과: <strong>880점 · 55/60 (92%)</strong>. 6/21 실전 629점에서 크게 올라왔어. 특히 최약점이던 D5가 50% → 93%.</p>
        <h4>도메인별</h4>
        <table>
        <tr><th>도메인</th><th>이번</th><th>6/21 실전</th></tr>
        <tr><td>D1 에이전트 아키텍처 (27%)</td><td>9/10</td><td>60%</td></tr>
        <tr><td>D2 도구·MCP (18%)</td><td>12/14</td><td>64%</td></tr>
        <tr><td>D3 Claude Code (20%)</td><td>3/3 ⚠</td><td>61%</td></tr>
        <tr><td>D4 프롬프트·구조화 (20%)</td><td>18/19</td><td>75%</td></tr>
        <tr><td>D5 컨텍스트·신뢰성 (15%)</td><td>13/14</td><td>50%</td></tr>
        </table>
        <h4>이 점수를 냉정하게 읽는 두 가지</h4>
        <ul>
          <li><strong>학습 효과가 섞여 있음</strong> — 직접 만들며 본 문항 풀이라 실전보다 후하게 나와. 실전은 처음 보는 지문이야</li>
          <li><strong>D3의 3/3은 증거가 아님</strong> — 이번에 뽑힌 시나리오가 ③④⑤⑥이라 ②코드생성이 안 나왔고, 그래서 D3 문항이 3개뿐이었어. 실전 비중 20%에 1차 61%였던 도메인이라 <strong>여전히 최대 미지수</strong></li>
        </ul>
        <div class="callout">🎯 교훈: 모의고사는 시나리오가 랜덤이라 <b>한 번의 결과로 도메인 실력을 판정하면 안 돼.</b> 도메인별 표본 수를 같이 봐야 해.</div>`},

      {type:"concept", kind:"TOPIC · 주제 설명", h:"틀린 5개가 가리키는 약점 4덩어리",
       html:`<h4>① 기본 제공 도구(built-in tools) 6종 역할 미정착 — 오답 5개 중 2개</h4>
        <ul>
          <li>함수 <strong>호출자</strong> 찾기에 Glob을 골랐음 → 정답은 <strong>Grep</strong> (호출자 찾기 = 파일 <strong>내용</strong> 검색)</li>
          <li>Edit 앵커 중복 실패에도 Glob을 골랐음 → 정답은 <strong>Read + Write</strong></li>
          <li>가장 큰 덩어리지만 <strong>암기 30분이면 끝나는 유형</strong>. 부록의 도구 선택표로</li>
        </ul>
        <h4>② nullable ↔ enum 확장 — <strong>3번째 재발</strong> (6/16 · 7월 · 8/8)</h4>
        <ul>
          <li>제품 유형이 "카테고리에 안 맞는" 문제에 nullable을 적용했음 → 있는 정보를 버리는 처방</li>
          <li>문장으로 외울 것: <strong>"없는 값은 null, 안 맞는 값은 unclear"</strong></li>
        </ul>
        <h4>③ 사후 정리 선호 — 고질 패턴 재확인</h4>
        <ul>
          <li>중복 검색 문제에서 사전 분할 대신 <strong>사후 dedupe</strong>를 골랐음</li>
          <li>보기에 "다 시킨 뒤 정리·제거·필터"가 보이면 <strong>일단 후보에서 내리기</strong></li>
        </ul>
        <h4>④ (신규) 부정형 질문에서 좋은 것/나쁜 것 뒤집기</h4>
        <ul>
          <li>"안티패턴은?" 질문에 <strong>권장 사항</strong>(시도한 쿼리 보고)을 골랐음 — 내용은 아는데 질문 방향을 놓친 것</li>
          <li>실전에서 점수를 가장 억울하게 잃는 유형이야</li>
        </ul>
        <div style="font-family:ui-monospace,Menlo,monospace;font-size:12.5px;line-height:2;background:var(--code-bg);border:1px solid var(--line);border-radius:10px;padding:14px 18px;margin:14px 0;overflow-x:auto"><b>시험장 체크 항목 4개 — 이번 오답에서 도출</b><br>
1. <b>부정형 표시</b>: anti-pattern · NOT · least · EXCEPT 가 보이면 그 단어에 표시하고, 고른 답이 "좋은 것"인지 "나쁜 것"인지 한 번 더 확인<br>
2. <b>사후 처리 소거</b>: filter · post-process · suppress · dedupe · 새 분류기/레이어 신설 → 후보에서 내리기<br>
3. <b>already / existing 밑줄</b>: 이미 끝난 작업을 다시 하는 보기는 함정<br>
4. <b>복수응답 개수 확인</b>: "몇 개를 고르라"는 지시를 읽고 답하기
        </div>`},

      {type:"quiz", kind:"PRACTICE · 실전 진단", h:"Practice — The negative-form trap",
       q:`Which of the following is an anti-pattern when a subagent reports a failed web search to the coordinator?`,
       opts:[
         {t:`Returning an empty result set marked as successful after the search times out.`, ok:true},
         {t:`Including the exact query that was attempted along with the failure type.`},
         {t:`Attaching the two partial results retrieved before the timeout.`},
         {t:`Retrying the transient timeout twice locally before reporting upward.`},
       ],
       hint:`질문이 "안티패턴은?"이야 — 좋은 것 셋과 나쁜 것 하나가 섞여 있어. 네 개 중 셋은 이 코스가 권장한 것들이지.`,
       explain:{
         good:`실패의 성공 위장 = 3대 안티패턴 중 하나(위장·뭉개기·전체 중단). 코디네이터가 "자료 없음"으로 오독해 복구 기회가 사라져. 나머지 셋은 전부 권장 사항 — 시도한 쿼리·부분 결과는 구조화 4요소이고, 로컬 재시도는 5.3의 정석이야.`,
         wrongs:[
           `<b>B — 시도한 쿼리 + 실패 유형:</b> 구조화 에러 4요소 중 둘. 권장 사항이야.`,
           `<b>C — 부분 결과 동봉:</b> 코디네이터의 진행 판단 재료. 권장 사항이야.`,
           `<b>D — 일시 실패 로컬 재시도:</b> "일상 복구는 아래에서"의 정석. 권장 사항이야.`,
         ]},
       principle:"부정형 질문 — 방향부터 확인"},
    ]},
  ]
};
