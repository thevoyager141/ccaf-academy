/* PART 0: 오리엔테이션 */
window.CCAF_CONTENT.p0 = {
  id: "p0",
  lessons: [

  { id:"p0l1", ch:"0-1", title:"V2 시험 해부",
    steps:[
      {type:"concept", kind:"TOPIC · 시험 구조", h:"시험의 기본 조건",
       html:`<p class="lead">응시 조건을 먼저 확정함. 문항 수, 시간, 합격선, 도메인 가중치는 학습 계획을 세우는 기준이 됨.</p>
        <h4>기본 정보</h4>
        <table>
          <tr><th>항목</th><th>내용</th></tr>
          <tr><td>문항 수</td><td>60문항</td></tr>
          <tr><td>시험 시간</td><td>120분</td></tr>
          <tr><td>점수 스케일</td><td>100~1000점</td></tr>
          <tr><td>합격선</td><td>720점</td></tr>
          <tr><td>시험 코드</td><td>CCAR-F</td></tr>
          <tr><td>응시료</td><td>$125</td></tr>
          <tr><td>감독</td><td>Pearson VUE(시험장 또는 온라인 감독)</td></tr>
          <tr><td>자격 유효기간</td><td>12개월</td></tr>
        </table>
        <h4>응시 규칙</h4>
        <ul>
          <li>객관식과 복수응답(multiple-response)이 섞여 출제됨. 복수응답 문항은 <strong>몇 개를 고르라는 지시가 문항에 직접 적혀 있음</strong>. 지시한 개수를 확인하고 답할 것</li>
          <li><strong>답을 골라야 다음 문항으로 넘어감.</strong> 건너뛰기 기능이 없음</li>
          <li>합격 여부는 응시를 종료한 직후 화면에 표시됨</li>
        </ul>
        <h4>재응시 대기 규칙</h4>
        <ul>
          <li>1회 불합격 후: 14일 대기</li>
          <li>2회 불합격 후: 30일 대기</li>
          <li>3회 불합격 후: 90일 대기</li>
          <li>12개월 동안 최대 4회까지 응시 가능함</li>
        </ul>
        <h4>도메인 5개와 가중치</h4>
        <table>
          <tr><th>도메인</th><th>영역</th><th>가중치</th></tr>
          <tr><td>D1</td><td>에이전트 아키텍처와 오케스트레이션</td><td><strong>27%</strong></td></tr>
          <tr><td>D3</td><td>Claude Code 설정과 워크플로</td><td>20%</td></tr>
          <tr><td>D4</td><td>프롬프트 엔지니어링과 구조화 출력</td><td>20%</td></tr>
          <tr><td>D2</td><td>도구 설계와 MCP 통합</td><td>18%</td></tr>
          <tr><td>D5</td><td>컨텍스트 관리와 신뢰성</td><td>15%</td></tr>
        </table>
        <div class="callout">가중치 순서로 읽을 것. D1이 27%로 가장 크고, D1과 D3과 D4를 합치면 67%임. 이 세 영역의 정답률이 낮으면 720점을 넘기기 어려움.</div>`},

      {type:"concept", kind:"TOPIC · 출제 형식", h:"상황 하나에 문항 여러 개가 묶여 나옴",
       html:`<p class="lead">문항이 개별로 흩어져 있지 않음. 하나의 상황 설명 아래에 그 상황을 전제로 하는 문항 여러 개가 묶여서 나옴.</p>
        <h4>출제 구조</h4>
        <ul>
          <li>시나리오는 모두 <strong>6개</strong>가 준비돼 있고, 그중 <strong>4개가 무작위로 선택</strong>되어 출제됨. 어떤 4개가 나올지는 응시 시점까지 알 수 없음</li>
          <li>각 시나리오는 시스템 구성과 목표를 설명하는 지문으로 시작함. 그 아래에 문항 여러 개가 이어짐</li>
          <li>60문항이 시나리오 4개에 나뉘어 배치되므로, 시나리오 하나가 담당하는 문항 수가 적지 않음</li>
        </ul>
        <h4>이 형식이 읽는 방식을 바꾸는 이유</h4>
        <ul>
          <li>상황 설명은 한 번 읽고, 그 뒤로는 문항 여러 개를 그 상황 위에서 처리함. 처음 읽을 때 <strong>시스템 구성(도구 목록, 목표 지표, 제약 조건)</strong>을 정확히 잡아 두는 것이 이후 문항 전체의 정답률을 좌우함</li>
          <li>상황을 잘못 이해하면 그 아래 문항이 함께 틀림. 반대로 정확히 잡으면 같은 판단 기준으로 문항 여러 개를 빠르게 처리할 수 있음</li>
          <li>문항마다 상황을 다시 읽지 않아도 되므로, 상황 설명을 읽는 데 시간을 더 배정하는 편이 전체 시간에서 유리함</li>
        </ul>
        <h4>이 형식이 요구하는 학습 방향</h4>
        <ul>
          <li>개념을 낱개로 외우는 방식은 잘 맞지 않음. 문항이 묻는 것은 "이 상황에서 무엇이 최선인가"이므로, 개념 사이의 선택 기준을 알아야 함</li>
          <li>6개 시나리오의 상황 설명을 미리 알고 들어가면 시험장에서 지문을 파악하는 시간이 줄어듦</li>
        </ul>
        <div class="callout">다음 스텝에서 6개 시나리오를 한 화면에 정리함. 각 시나리오가 어떤 상황이고, 그 상황에서 무엇을 묻는지, 실제 문항이 어떤 모양인지까지 함께 확인할 것.</div>`},

      {type:"concept", kind:"TOPIC · 시나리오 6종", h:"출제되는 상황 6개",
       html:`<p class="lead">아래 6개 중 4개가 출제됨. "이 상황에서 묻는 것"은 공식 시험 가이드의 Task Statement 번호를 근거로 정리한 것이고, 예시 문항은 파트 6의 실제 연습 문항에서 가져온 것임.</p>
        <div class="scgrid">

          <div class="scb">
            <div class="scn">SCENARIO 01</div>
            <h5>고객지원 해결 에이전트</h5>
            <div class="sce">Customer Support Resolution Agent</div>
            <div class="scd">Agent SDK로 만든 고객지원 에이전트가 반품, 결제 분쟁, 계정 문제를 처리함. MCP 도구 4종(get_customer, lookup_order, process_refund, escalate_to_human)을 쓰고, 첫 접촉 해결률(FCR) 80% 이상이 목표임.</div>
            <div class="scdom"><span>D1 27%</span><span>D2 18%</span><span>D5 15%</span></div>
            <div class="sclab">이 상황에서 묻는 것</div>
            <ul>
              <li>금액이 걸린 작업 전에 신원 확인을 강제하는 방법. 프롬프트 지시가 아니라 전제 조건이 끝날 때까지 process_refund를 차단하는 프로그램적 게이트 (TS 1.4)</li>
              <li>도구 실패를 일시 오류, 검증 오류, 정책 위반, 권한 오류로 구분해 isRetryable과 함께 반환하는 구조 (TS 2.2)</li>
              <li>에스컬레이션 기준. 고객이 사람을 요구한 경우, 정책에 조항이 없는 경우, 진전이 불가능한 경우가 기준이며 감정 표현은 기준이 아님 (TS 5.2)</li>
              <li>긴 대화에서 금액, 날짜, 주문번호를 요약 대상에서 제외한 별도 블록으로 보존하는 방법 (TS 5.1)</li>
            </ul>
            <div class="scq"><b>예시 문항</b>A customer message contains two requests: (a) a refund for order #B-2210, fully covered by your return policy, and (b) compensation for "emotional distress," which your policy does not address at all.<br>정책이 다루는 요청과 정책에 조항이 없는 요청을 한 메시지 안에서 갈라, 각각 자율 해결과 에스컬레이션으로 보낼 수 있는지 판단하는 문항임.</div>
          </div>

          <div class="scb">
            <div class="scn">SCENARIO 02</div>
            <h5>Claude Code 코드 생성</h5>
            <div class="sce">Code Generation with Claude Code</div>
            <div class="scd">팀 개발 워크플로에 Claude Code를 통합함. 커스텀 슬래시 커맨드, CLAUDE.md 설정, plan mode와 직접 실행 중 무엇을 쓸지의 판단이 지문에 등장함.</div>
            <div class="scdom"><span>D3 20%</span><span>D5 15%</span></div>
            <div class="sclab">이 상황에서 묻는 것</div>
            <ul>
              <li>CLAUDE.md의 계층(사용자 레벨, 프로젝트 레벨, 디렉터리 레벨)과 각 계층이 누구에게 적용되는지의 구분 (TS 3.1)</li>
              <li>슬래시 커맨드와 스킬의 배치 위치, SKILL.md의 frontmatter 설정(context: fork, allowed-tools, argument-hint) (TS 3.2)</li>
              <li>plan mode를 쓰는 조건(대규모 변경, 복수의 유효한 접근, 아키텍처 결정)과 직접 실행이 맞는 조건의 구분 (TS 3.4)</li>
              <li>세션을 --resume으로 이어갈 때와 구조화 요약을 넣어 새로 시작할 때의 판단, fork_session의 용도 (TS 1.7)</li>
            </ul>
            <div class="scq"><b>예시 문항</b>A senior dev's Claude Code generates code with tabs and semicolons; everyone else's uses the team standard (spaces, no semicolons).<br>설정이 사용자 레벨과 프로젝트 레벨 중 어디에 있어서 팀원마다 결과가 달라지는지 찾아내는 문항임.</div>
          </div>

          <div class="scb">
            <div class="scn">SCENARIO 03</div>
            <h5>멀티에이전트 리서치 시스템</h5>
            <div class="sce">Multi-Agent Research System</div>
            <div class="scd">코디네이터가 웹 검색, 문서 분석, 종합, 리포트 생성 서브에이전트(subagent)에 작업을 위임함. 출처가 붙은 종합 리포트를 만드는 것이 목표임.</div>
            <div class="scdom"><span>D1 27%</span><span>D2 18%</span><span>D5 15%</span></div>
            <div class="sclab">이 상황에서 묻는 것</div>
            <ul>
              <li>모든 통신을 코디네이터로 경유시키는 구조를 유지하는 이유. 관측성과 일관된 오류 처리, 정보 흐름 통제가 근거임 (TS 1.2)</li>
              <li>서브에이전트가 코디네이터의 대화 히스토리(conversation history)를 자동으로 상속하지 않는다는 것과, 필요한 정보를 프롬프트에 직접 넣어 전달하는 방법 (TS 1.3)</li>
              <li>실패를 위로 전달할 때 담아야 하는 4가지: 실패 유형, 시도한 내용, 부분 결과, 대안 (TS 5.3)</li>
              <li>주장과 출처의 대응을 종합 단계까지 유지하는 방법. 상충하는 수치는 하나를 고르지 않고 출처와 함께 표시함 (TS 5.6)</li>
            </ul>
            <div class="scq"><b>예시 문항</b>An engineer proposes: "Let the synthesis agent message the search agent directly when it needs more sources — cutting the coordinator out saves a round trip."<br>서브에이전트끼리 직접 통신하게 만드는 제안이 구조상 무엇을 잃게 하는지 판단하는 문항임.</div>
          </div>

          <div class="scb">
            <div class="scn">SCENARIO 04</div>
            <h5>개발자 생산성 도구</h5>
            <div class="sce">Developer Productivity with Claude</div>
            <div class="scd">코드베이스 탐색, 오래된 코드 이해, 반복 코드 생성을 돕는 도구임. 기본 제공 도구(built-in tools)인 Read, Write, Bash, Grep, Glob과 MCP 서버를 함께 씀.</div>
            <div class="scdom"><span>D1 27%</span><span>D3 20%</span><span>D2 18%</span></div>
            <div class="sclab">이 상황에서 묻는 것</div>
            <ul>
              <li>상황에 맞는 기본 제공 도구 선택. 파일 내용 검색은 Grep, 파일명 패턴은 Glob, Edit의 기준 텍스트가 중복될 때는 Read 후 Write (TS 2.5)</li>
              <li>MCP 서버의 설정 위치. 팀 공용은 프로젝트의 .mcp.json, 개인용은 ~/.claude.json이며 표준 연동은 커뮤니티 서버를 먼저 검토함 (TS 2.4)</li>
              <li>도구를 너무 많이 주면 선택 신뢰도가 떨어진다는 것과, 범용 도구를 제약된 도구로 교체하는 방법 (TS 2.3)</li>
              <li>진행하면서 발견한 내용이 계획을 바꾸는 과제는 동적 분해, 미리 정해진 여러 관점의 검토는 순차 체이닝 (TS 1.6)</li>
            </ul>
            <div class="scq"><b>예시 문항</b>You must find every place the deprecated formatCurrency function is effectively used.<br>다른 이름으로 재export된 함수까지 모두 찾으려면 어떤 도구를 어떤 순서로 써야 하는지 판단하는 문항임.</div>
          </div>

          <div class="scb">
            <div class="scn">SCENARIO 05</div>
            <h5>Claude Code CI/CD 통합</h5>
            <div class="sce">Claude Code for Continuous Integration</div>
            <div class="scd">CI 파이프라인에서 코드 리뷰, 테스트 생성, PR 피드백을 자동으로 수행함. 실행 가능한 피드백과 낮은 오탐률이 목표임.</div>
            <div class="scdom"><span>D3 20%</span><span>D4 20%</span></div>
            <div class="sclab">이 상황에서 묻는 것</div>
            <ul>
              <li>비대화형 실행 플래그 -p와 구조화 출력 플래그(--output-format json, --json-schema), CI 실행에도 컨텍스트를 공급하는 CLAUDE.md (TS 3.6)</li>
              <li>코드를 생성한 세션이 자기 코드를 리뷰하면 효과가 떨어진다는 것과, 독립 인스턴스로 리뷰를 분리하는 구조 (TS 4.6)</li>
              <li>오탐을 줄이는 방법. 모호한 지시 대신 범주별 명시 기준을 쓰고, 오탐이 많은 범주는 일시적으로 끈 뒤 개선함 (TS 4.1)</li>
              <li>머지를 막는 검사는 동기 API, 야간이나 주간 분석은 배치 API. 배치는 최대 24시간이고 지연 보장이 없음 (TS 4.5)</li>
            </ul>
            <div class="scq"><b>예시 문항</b>Your pipeline stage generates a code patch with Claude, then — in the same session — appends "now review your patch carefully for bugs before we merge."<br>코드를 생성한 세션이 자기 코드를 리뷰할 때 왜 효과가 없는지, 무엇으로 바꿔야 하는지 판단하는 문항임.</div>
          </div>

          <div class="scb">
            <div class="scn">SCENARIO 06</div>
            <h5>구조화 데이터 추출</h5>
            <div class="sce">Structured Data Extraction</div>
            <div class="scd">비정형 문서에서 정보를 추출해 JSON 스키마로 검증한 뒤 다음 단계 시스템으로 넘김. 정보가 없거나 모호한 문서를 안전하게 처리하는 것이 목표임.</div>
            <div class="scdom"><span>D4 20%</span><span>D5 15%</span></div>
            <div class="sclab">이 상황에서 묻는 것</div>
            <ul>
              <li>tool_use와 JSON 스키마로 출력을 강제해도 의미 오류(합계 불일치, 잘못된 필드 배치)는 남는다는 것. 원문에 없을 수 있는 필드는 nullable, 분류 항목에는 other와 상세 문자열, unclear를 둠 (TS 4.3)</li>
              <li>재시도가 통하는 경우(형식과 구조 오류)와 통하지 않는 경우(원문에 정보 자체가 없음)의 구분 (TS 4.4)</li>
              <li>집계 정확도가 특정 문서 유형의 낮은 성능을 가린다는 것. 층화 표집으로 감시하고, 신뢰도는 라벨링된 검증셋으로 보정한 뒤에만 라우팅 기준으로 씀 (TS 5.5)</li>
              <li>배치 처리의 조건. 비용은 절감되지만 최대 24시간이 걸리고 지연 보장이 없으므로 SLA를 역산해 동기 API와 나눔 (TS 4.5)</li>
            </ul>
            <div class="scq"><b>예시 문항</b>You want to auto-approve extractions the model is confident about and route the rest to reviewers.<br>모델이 보고한 신뢰도를 라우팅 기준으로 쓰기 전에 무엇을 먼저 해야 하는지 판단하는 문항임.</div>
          </div>

        </div>
        <div class="callout">읽는 법: 위 6개 블록은 병렬 관계이며 순서가 없음. 출제 시에는 이 중 4개가 무작위로 선택됨. 파트 6에서 시나리오별로 한 레슨씩 다룸.</div>`},

      {type:"concept", kind:"TOPIC · 시간 배분", h:"120분을 나누는 방법",
       html:`<p class="lead">60문항 120분이므로 문항당 평균 2분임. 다만 이 시간은 문항에만 쓰이지 않고 시나리오 상황 설명을 읽는 데도 쓰임.</p>
        <h4>시간을 쓰는 두 곳</h4>
        <ul>
          <li><strong>상황 설명 읽기</strong>: 출제되는 시나리오는 4개임. 하나당 2~3분을 배정해도 합계 10분 안팎임. 여기서 시스템 구성과 목표 지표를 정확히 잡아 두면 그 아래 문항의 판단이 빨라짐</li>
          <li><strong>문항 풀기</strong>: 남는 110분을 60문항에 배분하면 문항당 약 1분 50초임</li>
        </ul>
        <h4>건너뛰기가 없다는 조건이 만드는 제약</h4>
        <ul>
          <li>답을 고르지 않으면 다음 문항으로 넘어가지 않음. <strong>표시해 두고 나중에 돌아오는 방식이 성립하지 않음</strong></li>
          <li>따라서 매 문항을 그 자리에서 결정해야 함. 확신이 없을 때도 선택지를 소거해 남은 것 중 하나를 고르고 넘어가는 것이 유일한 방법임</li>
          <li>한 문항에 오래 붙잡히면 뒤 문항의 시간을 그대로 가져감. 상한을 미리 정해 둘 것. 3분을 넘기면 소거하고 남은 선택지 중 하나를 고른 뒤 진행함</li>
        </ul>
        <h4>배분 기준</h4>
        <ul>
          <li>선택지를 읽자마자 판단이 서는 문항은 30초 안에 끝냄. 여기서 아낀 시간이 지문이 긴 문항의 여유가 됨</li>
          <li>복수응답 문항은 지시한 개수를 확인하는 절차가 더 붙으므로 평균보다 시간을 더 배정함</li>
          <li>지문이 긴 문항은 마지막 질문 문장을 먼저 읽고 상황으로 돌아가는 순서가 빠름. 무엇을 묻는지 알고 읽으면 필요한 정보만 골라낼 수 있음</li>
        </ul>
        <div class="callout">시간이 부족해질 때: 남은 문항 수와 남은 시간을 비교해 문항당 가용 시간을 다시 계산할 것. 미응답 문항은 존재할 수 없으므로 종료 시점에는 60문항 전부에 답이 채워져 있어야 함.</div>`},

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
      {type:"concept", kind:"TOPIC · 핵심 도구", h:"모든 문제에 적용하는 판단 기준 5가지",
       html:`<p class="lead">공식 시험 가이드 맨 뒤에는 <strong>예시 문제 12개</strong>가 실려 있음. 이후 강의에서 "샘플 N번"이라고 부르는 것이 그 문항들임. 이 레슨의 원칙 5개는 그 12문항의 정답 논리를 정리한 것임. 앞으로 나오는 모든 연습 문제 해설에 이 원칙 번호가 붙음.</p>
        <h4>① 강제는 프로그램으로, 성향은 프롬프트로</h4>
        <ul>
          <li>금액, 인증, 규정처럼 <strong>100% 지켜야 하는 규칙</strong>은 훅(hook)이나 전제 조건 게이트로 차단함</li>
          <li>프롬프트 지시는 확률적임. "반드시 ~할 것"이라고 써도 실패율이 0이 되지 않음</li>
          <li>문항의 단서: "occasionally", "12% of cases" 같은 실패율 언급이 나오면 프로그램적 강제가 정답임</li>
        </ul>
        <h4>② 증상이 아니라 원인</h4>
        <ul>
          <li>로그나 데이터가 가리키는 <strong>원인을 직접 고치는 선택지</strong>가 정답임</li>
          <li>증상만 덮는 선택지는 오답임. 제한을 추가하거나 결과를 사후에 걸러내는 방식이 여기에 해당함</li>
        </ul>
        <h4>③ 과잉 설계 금지</h4>
        <ul>
          <li>"별도 분류 모델 학습", "라우팅 레이어 구축"처럼 규모가 큰 선택지는 대개 오답임</li>
          <li>"가장 효과적인 <strong>첫</strong> 조치"를 묻는 문항의 정답은 비용이 적게 드는 조치로 원인을 직접 고치는 것임</li>
        </ul>
        <h4>④ 최소 권한</h4>
        <ul>
          <li>에이전트에는 역할에 필요한 도구만 줌. 도구가 많아지면 잘못된 도구를 고를 확률이 올라감</li>
          <li>요구의 대부분(85%)을 차지하는 작업에는 좁은 전용 도구를 하나 두고, 나머지(15%)는 기존 경로를 유지함</li>
        </ul>
        <h4>⑤ 실패는 구조화해서 전달</h4>
        <ul>
          <li>오류를 숨기는 것(빈 결과를 성공으로 반환), 전체 작업 중단, 내용 없는 "실패" 메시지는 모두 오답임</li>
          <li>정답 형태: <strong>실패 유형, 시도한 내용, 부분 결과, 대안</strong>을 담아 상위로 전달함</li>
        </ul>
        <div class="callout">실전 적용 순서: 선택지 4개를 읽고 "원칙 몇 번 위반"으로 소거하면 대개 2개가 남음. 남은 2개 중에서는 비용이 적게 드는 조치를 먼저 시도하는 쪽이 정답인 경우가 많음.</div>`},
    ]},

  { id:"p0l4", ch:"0-3", title:"비출제 범위와 선택지 소거법",
    steps:[
      {type:"concept", kind:"TOPIC · 범위 밖 주제", h:"불필요하게 복잡하거나 어려운 개념이 들어간 선택지는 오답일 가능성이 높음",
       html:`<p class="lead">공식 가이드는 시험에 나오지 않는 주제를 목록으로 명시함. 이 목록은 학습 범위를 줄이는 데만 쓰이지 않음. <strong>범위 밖 용어가 들어간 선택지는 대부분 오답임.</strong></p>
        <h4>공식 비출제 목록 (가이드 명시)</h4>
        <ul>
          <li><strong>모델 내부와 학습</strong>: 파인튜닝, 커스텀 모델 학습, Claude 내부 아키텍처와 가중치, Constitutional AI, RLHF</li>
          <li><strong>계정과 요금</strong>: API 인증, 빌링, 계정 관리, 레이트 리밋과 쿼터, 요금 계산, 토큰 카운팅 알고리즘</li>
          <li><strong>인프라</strong>: MCP 서버 배포와 호스팅(네트워크, 컨테이너), 특정 클라우드(AWS, GCP, Azure) 설정</li>
          <li><strong>다른 기능 영역</strong>: computer use(브라우저와 데스크톱 자동화), 비전과 이미지 분석, 스트리밍 API와 SSE</li>
          <li><strong>보안 프로토콜</strong>: OAuth, API 키 로테이션, 인증 프로토콜의 상세 동작</li>
          <li><strong>기타</strong>: 임베딩과 벡터 DB 구현, 성능 벤치마킹과 모델 비교 지표, 프롬프트 캐싱의 구현 상세(존재만 알면 됨), 특정 언어와 프레임워크의 심화 내용</li>
        </ul>
        <h4>선택지를 소거하는 방법</h4>
        <ul>
          <li>선택지에 <strong>"파인튜닝으로 해결"</strong>이 보이면 소거함. 범위 밖이면서 동시에 과잉 설계임</li>
          <li>선택지에 <strong>"벡터 DB를 구축해서"</strong>, <strong>"Kubernetes에"</strong>, <strong>"별도 분류 모델을 학습"</strong>이 보이면 소거함</li>
          <li><strong>존재하지 않는 기능</strong>을 쓴 선택지도 소거함. CLAUDE_HEADLESS 환경변수, --batch 플래그, 세션 공유 메모리, 컨텍스트 첨부 플래그가 여기에 해당함</li>
        </ul>
        <h4>개념까지만 출제되는 주제</h4>
        <ul>
          <li>RAG: 외부 지식을 컨텍스트에 넣는다는 개념까지만 출제됨. 임베딩과 벡터 DB 구현은 범위 밖임</li>
          <li>인증: 비밀키를 환경변수에 두고 \${ENV_VAR}로 확장한다는 것까지만 출제됨. OAuth 플로우는 범위 밖임</li>
          <li>프롬프트 캐싱: 존재한다는 사실까지만 출제됨. 구현 상세는 범위 밖임</li>
        </ul>
        <div class="callout">⚠️ 구버전 자료 주의: V1 기반 자료에 나오는 "모르는 문항은 표시하고 넘어갔다가 나중에 돌아온다" 전략은 <b>V2에서 성립하지 않음.</b> V2는 답을 골라야 다음 문항으로 진행되고 건너뛰기가 없음. 매 문항에서 소거한 뒤 그 자리에서 결정할 것.</div>`},
    ]},
  ]
};
