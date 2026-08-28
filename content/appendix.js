/* 부록: 핵심 치트시트 · 판단 도구 · 용어사전 */
window.CCAF_APPENDIX = {

cheat: `
<h4>🛠 기본 제공 도구(built-in tools) 6종 선택표: 상황별 도구 선택</h4>
<p style="font-size:13px;color:var(--muted)">지문의 상황 서술만 보고 도구 하나를 고르는 형태로 반복 출제됨. 도구 사이의 역할 차이를 구분하지 못하면 정답률이 크게 떨어지는 영역이므로 표 전체를 외울 것.</p>
<table>
<tr><th>상황 (지문에 이렇게 나옴)</th><th>답</th></tr>
<tr><td>"find all <b>callers</b> of function X" · "어디서 이 함수를 쓰나"</td><td><b>Grep</b>: 호출자 찾기는 파일 <b>내용</b> 검색</td></tr>
<tr><td>"find all files <b>named</b> *.test.tsx" · 경로·확장자 패턴</td><td><b>Glob</b>: 파일 <b>이름·경로</b> 패턴 전용</td></tr>
<tr><td>Edit이 <b>앵커 중복</b>으로 실패 · "non-unique match"</td><td><b>Read + Write</b> (공식적으로 제시된 대안) · 확인은 Grep</td></tr>
<tr><td>파일 일부만 정확히 수정 · 앵커가 유일함</td><td><b>Edit</b></td></tr>
<tr><td>파일 전체 내용이 필요 · 통째로 새로 씀</td><td><b>Read</b> / <b>Write</b></td></tr>
<tr><td>테스트 실행·빌드·git 등 명령 실행</td><td><b>Bash</b></td></tr>
</table>
<p style="font-size:13px;color:var(--muted)">판별 기준: <b>파일 이름·경로로 찾으면 Glob, 파일 내용으로 찾으면 Grep.</b> Glob은 파일을 찾는 도구이고 수정하는 도구가 아니라서 Edit 실패의 답이 될 수 없음.</p>

<h4>🔦 시험 보기에 설명 없이 그대로 나오는 용어 목록</h4>
<p style="font-size:13px;color:var(--muted)">실제 시험 보기에는 아래 이름들이 별도 설명 없이 등장함. 각각의 뜻을 한 줄로 정확히 알고 있으면 보기를 해석할 수 있음.</p>
<table>
<tr><th>표기</th><th>뜻</th></tr>
<tr><td><code>Read / Write / Edit</code></td><td>파일 읽기 / 통째 쓰기 / <b>유일한 앵커 텍스트</b>로 부분 수정 (앵커가 여러 곳이면 실패하므로 Read+Write로 처리)</td></tr>
<tr><td><code>Grep / Glob / Bash</code></td><td>파일 <b>속 내용</b> 검색 / 파일 <b>이름·경로 패턴</b>으로 찾기 / 터미널 명령 실행</td></tr>
<tr><td><code>claude -p</code> (=--print)</td><td><b>비대화형</b> 1회 실행. CI에서 이 플래그가 없으면 입력 대기 상태로 정지함</td></tr>
<tr><td><code>--output-format json</code> · <code>--json-schema</code></td><td>기계가 파싱할 JSON 출력 / 그 JSON의 형태 강제</td></tr>
<tr><td><code>--resume</code> · <code>fork_session</code></td><td>지난 세션 이어가기 / 한 지점에서 두 갈래로 분기 (비교할 안이 2개 이상일 때만)</td></tr>
<tr><td>🚫 <code>CLAUDE_HEADLESS</code> · <code>--batch</code></td><td><b>존재하지 않음.</b> 보기에 나오면 즉시 소거할 것 (batch는 API 기능이며 CLI 플래그가 아님)</td></tr>
<tr><td><code>/compact</code> · <code>/clear</code></td><td>대화를 요약 압축 / 통째로 비움 (fork는 격리, compact는 요약, clear는 삭제)</td></tr>
<tr><td><code>PreToolUse / PostToolUse</code></td><td>도구 실행 <b>전</b> 차단·검사 / 실행 <b>후</b> 결과 정규화</td></tr>
<tr><td><code>tool_choice: auto·any·none·{"type":"tool",...}</code></td><td>모델 재량 / 도구 강제 / 도구 금지(산문 응답 강제) / 특정 도구 지정</td></tr>
<tr><td><code>stop_reason</code> 7값</td><td>end_turn(끝)·tool_use(도구 요청)·max_tokens(잘림)·stop_sequence·pause_turn(이어서)·refusal(거부)·model_context_window_exceeded</td></tr>
<tr><td><code>tool_use / tool_result / isError</code></td><td>모델의 도구 요청 블록 / 애플리케이션이 돌려주는 결과 블록 / 그 결과가 에러라는 표시</td></tr>
<tr><td><code>CLAUDE.md · .claude/rules/ · .mcp.json · settings.local.json</code></td><td>항상 로드 지침 / paths 글롭 조건부 규칙(conditional rules) / 팀 공유 MCP 설정 / <b>커밋 안 되는</b> 프로젝트 개인 설정</td></tr>
<tr><td><code>context: fork · allowed-tools · argument-hint</code></td><td>스킬 격리 실행 / 도구 허용 목록(강제) / 인자 힌트(<b>강제 아님</b>)</td></tr>
<tr><td><code>custom_id · nullable · enum · strict</code></td><td>배치 요청-응답 짝 맞추기 / 비워도 되는 칸 / 정해진 값 중 선택 / 문법만 보장(의미 오류는 막지 못함)</td></tr>
</table>

<h4>숫자 암기표</h4>
<table>
<tr><th>항목</th><th>값</th></tr>
<tr><td>시험</td><td><b>60문항 · 120분</b> · 시나리오 6개 중 <b>4개 랜덤</b> · 합격 <b>720</b>/1000 · 유효 <b>12개월</b> · 답해야 다음 문항 진행(건너뛰기 불가)</td></tr>
<tr><td>도메인 가중치</td><td>D1 <b>27%</b> · D3 20% · D4 20% · D2 18% · D5 15%</td></tr>
<tr><td>Batches API</td><td>비용 <b>50% 절감</b> · 처리 <b>최대 24시간</b> · <b>SLA 없음</b> · 요청 내 멀티턴 도구 호출 불가 · 짝 맞추기는 custom_id</td></tr>
<tr><td>도구 개수 감각</td><td>역할당 <b>4~5개</b>가 적정함. 18개면 도구 선택 신뢰도가 떨어짐</td></tr>
<tr><td>few-shot</td><td>애매한 케이스 <b>2~4개</b> + 선택 이유 포함</td></tr>
</table>

<h4>위치 암기표: 설정을 어디에 두는가</h4>
<table>
<tr><th>항목</th><th>팀 공유</th><th>개인</th></tr>
<tr><td>슬래시 커맨드</td><td><code>.claude/commands/</code></td><td><code>~/.claude/commands/</code></td></tr>
<tr><td>스킬</td><td><code>.claude/skills/</code> (SKILL.md)</td><td><code>~/.claude/skills/</code> (다른 이름으로)</td></tr>
<tr><td>MCP 서버</td><td><code>.mcp.json</code> + <code>\${ENV_VAR}</code></td><td><code>~/.claude.json</code></td></tr>
<tr><td>항상 로드 지시</td><td>프로젝트 <code>CLAUDE.md</code> (+디렉토리)</td><td><code>~/.claude/CLAUDE.md</code></td></tr>
<tr><td>조건부 규칙</td><td colspan="2"><code>.claude/rules/</code> + frontmatter <code>paths: ["글롭"]</code>. 여러 폴더에 흩어진 파일에는 <code>**/*.test.tsx</code></td></tr>
</table>

<h4>플래그·명령 암기표</h4>
<ul>
<li><code>-p</code> (<code>--print</code>): 비대화형 실행이며 CI에서 필수임. 없으면 입력 대기 상태로 정지함</li>
<li><code>--output-format json</code> + <code>--json-schema</code>: 기계 파싱용 구조화 출력(structured output)</li>
<li><code>--resume &lt;세션이름&gt;</code>: 세션 이어가기 / <code>fork_session</code>: 공통 기반에서 분기 비교</li>
<li><code>/memory</code>: 로드된 메모리 파일 확인(행동 불일치 진단) / <code>/compact</code>: 탐색이 길어진 뒤 대화 압축</li>
<li>스킬 frontmatter 3종: <code>context: fork</code>(격리) · <code>allowed-tools</code>(도구 제한) · <code>argument-hint</code>(인자 요구)</li>
</ul>

<h4>stop_reason</h4>
<ul>
<li>시험 핵심 2값: <code>"tool_use"</code>는 도구 실행 후 계속 진행 · <code>"end_turn"</code>은 정상 종료를 뜻하는 유일한 값</li>
<li>보조: <code>"max_tokens"</code>는 길이 한도 · <code>"stop_sequence"</code>는 지정 문자열 감지</li>
<li>공식 API에는 <code>"pause_turn"</code>(서버 도구 루프 한도)과 <code>"refusal"</code>(거부) 등도 실제로 존재함. 따라서 stop_reason 값에는 "존재하지 않는 기능"이라는 이유로 소거를 적용하지 말 것</li>
</ul>

<h4>에러 4분류 (시험 목표 2.2: MCP 도구의 구조화 에러 응답)</h4>
<table>
<tr><th>errorCategory</th><th>isRetryable</th><th>예</th><th>에이전트의 올바른 행동</th></tr>
<tr><td>transient</td><td>✅</td><td>타임아웃, 서비스 다운</td><td>제한된 재시도</td></tr>
<tr><td>validation</td><td>❌</td><td>잘못된 입력</td><td>수정된 입력 요청</td></tr>
<tr><td>business</td><td>❌</td><td>정책 위반(기간 만료)</td><td>고객 친화 설명으로 전환</td></tr>
<tr><td>permission</td><td>❌</td><td>권한 없음</td><td>에스컬레이션/설명</td></tr>
</table>
<ul><li>접근 실패(자료를 보지 못한 경우)와 정상 빈 결과(조회했으나 대상이 없는 경우)는 반드시 다른 형태로 구분해 돌려줄 것</li></ul>

<h4>tool_choice (시험 목표 2.3 도구 배분, 4.3 출력 강제)</h4>
<ul>
<li><code>"auto"</code>는 텍스트 응답 허용(도구 제공 시 기본값) · <code>"any"</code>는 어떤 도구든 강제 · <code>{"type":"tool","name":"..."}</code>는 특정 도구 강제 · <code>"none"</code>은 도구 금지(공식 4번째 값이며 도구 미제공 시 기본값)</li>
<li>실제 API 표기는 전부 객체 형태(<code>{"type":"auto"}</code>)이고 가이드가 축약 표기를 씀. any 또는 특정 도구를 강제하면 자연어 설명 없이 곧장 도구를 호출함</li>
</ul>

<h4>공식 문서와 대조해 확인한 세부 사항</h4>
<ul>
<li>도구 설명은 <b>최소 3~4문장</b>으로 작성함. 공식 문서는 도구 설명을 "성능의 가장 중요한 단일 요인"으로 서술함</li>
<li>도구 이름과 custom_id 형식: 영숫자·하이픈·언더스코어 <b>1~64자</b></li>
<li>배치: 10만 건/256MB 한도 · 결과 29일 보관 · 결과 순서 비보장 · expired 미과금</li>
<li>CLAUDE.md는 덮어쓰기 방식이 아니라 <b>전부 이어 붙여 로드</b>됨. 가까운 위치의 파일이 나중에 읽힘. 지침이 충돌하면 어느 쪽이 적용될지 보장되지 않으므로 충돌 자체를 없애는 것이 정석임. 공식 문서는 "차단이 필요하면 PreToolUse 훅(hook)"이라고 명시함</li>
<li>@import 최대 4단계 · paths가 없는 rules 파일은 상시 로드 · CLAUDE.local.md(개인용이며 gitignore 대상)가 존재함</li>
</ul>

<h4>상황 신호별 정답 방향</h4>
<table>
<tr><th>상황 신호</th><th>정답 방향</th></tr>
<tr><td>돈·보안·순서 + "never/must/N%" 실패율</td><td>프로그램적 게이트·PreToolUse 훅 (+대체 경로 연결)</td></tr>
<tr><td>도구 오선택 "첫 조치"</td><td>description 확충 (입력·예시·경계)</td></tr>
<tr><td>결과 이상 + 분해 로그 제시</td><td>코디네이터 분해 수정 (하류 탓 금지)</td></tr>
<tr><td>합성이 발견 무시</td><td>프롬프트에 명시 전달 (자동 상속 없음)</td></tr>
<tr><td>지연·왕복 과다</td><td>한 응답 병렬 Task / 85%엔 scoped 도구</td></tr>
<tr><td>형식이 일정하지 않음</td><td>입출력 예시 / few-shot 형식 데모</td></tr>
<tr><td>없는 값을 지어냄(환각)</td><td>nullable + enum other/unclear</td></tr>
<tr><td>재시도 무한</td><td>원인 판별: 형식 오류(재시도 O) vs 정보 부재(재시도 X)</td></tr>
<tr><td>블로킹 vs 야간 처리</td><td>실시간 API vs Batches</td></tr>
<tr><td>자기 리뷰 실패</td><td>독립 인스턴스 (+파일별·통합 패스)</td></tr>
<tr><td>숫자·날짜 누락</td><td>case facts 블록 (요약 밖)</td></tr>
<tr><td>화난 고객/신뢰도 낮음</td><td>에스컬레이션 사유가 아님. 3대 트리거만 해당</td></tr>
<tr><td>통계 충돌</td><td>둘 다 제시 + 출처·시점 주석 (임의 선택 금지)</td></tr>
<tr><td>정확도 97% 자동화</td><td>세그먼트 분해 검증 + 층화 표집 감시</td></tr>
</table>

<h4>오답 선택지에 반복되는 유형: 보이면 소거할 것</h4>
<ul>
<li><b>프롬프트 강조:</b> "CRITICAL:", "MUST", few-shot 추가로 필수 규칙을 지키게 하려는 보기. 프롬프트만으로는 실패 확률이 0이 되지 않음</li>
<li><b>가짜 지표:</b> 감정 점수·보정하지 않은 자기 신뢰도·턴 수로 판단하는 보기</li>
<li><b>과잉 설계:</b> 분류기 학습, 라우팅 레이어, 파이프라인 복제, 파인튜닝</li>
<li><b>실패 은폐:</b> 빈 결과를 성공으로 처리, "unavailable" 한 마디로 끝내기, 전체 작업 중단</li>
<li><b>같은 세션 리뷰:</b> extended thinking이나 강한 지시로 자기 리뷰를 개선하려는 시도</li>
<li><b>존재하지 않는 기능:</b> CLAUDE_HEADLESS, --batch 플래그, 세션 공유 메모리, 도구 배열 순서 = 실행 순서</li>
<li><b>범위 밖 해법:</b> 벡터 DB, Kubernetes, RLHF, OAuth 구현 (파트 0의 비출제 범위 레슨에서 다룸)</li>
<li><b>일반적으로는 맞지만 이 문제의 조건에서는 틀린 보기:</b> 맞는 서술로 시작해 틀린 결론에 도달함 ("배치는 보통 빨리 끝나니까...", "파일 다시 읽으면 최신이니까...")</li>
</ul>`,

glossary: [
 {c:"기초", t:"API", d:"프로그램끼리 요청과 응답을 주고받기 위한 규약과 그 접점. 요청을 보낸다는 것은 대화 기록 전체와 도구 목록을 Claude에 전송한다는 뜻임."},
 {c:"기초", t:"CLI / 플래그", d:"명령어를 입력해 프로그램을 조작하는 방식(Claude Code) / 명령 뒤에 붙이는 옵션(-p 등)."},
 {c:"기초", t:"환경변수", d:"운영체제에 이름과 값의 쌍으로 저장해 두는 설정값. 이름은 팀이 공유하되 값은 각자의 기계에만 두는 방식이 비밀키 관리의 기본임."},
 {c:"기초", t:"버전 관리 / 커밋", d:"팀이 같은 폴더(저장소)를 공유하는 시스템 / 저장소에 변경을 올리는 것. 커밋한 내용은 팀 전체가 볼 수 있음."},
 {c:"기초", t:"JSON / JSON 스키마", d:"기계가 읽는 데이터 표기법 / 출력이 지켜야 할 형식 정의. required는 필수 항목, nullable은 비워도 되는 항목, enum은 정해진 값 중 선택임."},
 {c:"기초", t:"YAML frontmatter", d:"파일 맨 위 --- 사이에 두는 설정 구역 (SKILL.md, rules 파일)."},
 {c:"기초", t:"글롭 패턴", d:"파일 경로 패턴. *는 한 단계 이름, **는 모든 하위 폴더를 뜻함. **/*.test.tsx는 위치와 무관하게 모든 테스트 파일을 가리킴."},
 {c:"기초", t:"CI/CD · PR", d:"코드를 올릴 때마다 자동으로 검사하고 배포하는 자동화 절차 / 코드 변경 승인 요청서."},
 {c:"D1", t:"에이전틱 루프", d:"요청, stop_reason 확인, 도구 실행, 결과를 대화에 추가, 반복의 순서로 진행됨. 도구 결과(tool result)를 대화에 추가하는 데까지가 1회임."},
 {c:"D1", t:"stop_reason", d:"응답이 멈춘 이유를 알려주는 값으로 응답마다 함께 반환됨. tool_use(계속), end_turn(종료), max_tokens(한도), stop_sequence(지정 문자열)."},
 {c:"D1", t:"대화 히스토리", d:"role(user/assistant)이 붙은 메시지 목록. 모델은 매번 전체를 다시 읽음. 모델의 기억이 아니라 요청마다 함께 보내는 기록임."},
 {c:"D1", t:"허브-앤-스포크", d:"코디네이터가 모든 서브에이전트(subagent) 통신과 에러, 정보 흐름을 중계하는 구조. 관측성과 일관성, 통제가 이 구조를 쓰는 이유임."},
 {c:"D1", t:"Task 도구 / allowedTools", d:"서브에이전트를 만드는 공식 수단 / 에이전트가 쓸 수 있는 도구 목록. Task 도구가 없으면 위임이 불가능함."},
 {c:"D1", t:"AgentDefinition", d:"서브에이전트를 정의하는 설정. 설명, 시스템 프롬프트, 사용 가능한 도구 제한을 담음."},
 {c:"D1", t:"prompt chaining / 동적 분해", d:"미리 정해 둔 순차 단계(예측 가능한 반복 작업) / 앞 단계의 발견이 다음 단계를 정하는 방식(범위가 열린 과제)."},
 {c:"D1", t:"훅 (PostToolUse / PreToolUse)", d:"실행 흐름의 정해진 지점에서 조건 없이 실행되는 코드. Post는 결과 변환(정규화·트리밍), Pre는 호출 차단과 리다이렉트를 담당함."},
 {c:"D1", t:"전제조건 게이트", d:"A가 끝나기 전에는 B가 실행되지 않도록 코드로 차단함. 검증 전 환불 금지 같은 순서 규칙을 결정론적으로 강제함."},
 {c:"D1", t:"--resume / fork_session / stale", d:"세션 이어가기 / 공통 분석 지점에서 분기해 비교 / 실제 코드가 바뀌어 세션 기록이 낡은 상태. 변경 범위를 기준으로 판단함."},
 {c:"D2", t:"description (도구 설명)", d:"모델이 도구를 고르는 1차 근거. 입력 형식, 예시 질의, 예외 상황, 사용 경계를 담아야 도구 오선택이 사라짐."},
 {c:"D2", t:"isError / errorCategory / isRetryable", d:"MCP 실패 신호 / 실패 유형(transient·validation·business·permission) / 재시도할 가치가 있는지를 나타내는 불리언 값."},
 {c:"D2", t:"tool_choice", d:"auto는 자율 판단, any는 어떤 도구든 호출 강제, 특정 도구 지정은 호출 순서까지 보장함. 요구 수준에 맞춰 선택함."},
 {c:"D2", t:"MCP / MCP 리소스", d:"외부 시스템 연결 표준 프로토콜 / 행동(도구)이 아니라 콘텐츠 카탈로그(스키마·문서 목록)를 노출하는 기능. 탐색용 도구 호출을 줄임."},
 {c:"D2", t:"내장 도구 6종", d:"Grep은 내용 검색, Glob은 이름 패턴, Read/Write는 전체 읽기와 쓰기, Edit은 고유 앵커 매칭 수정(실패 시 Read+Write), Bash는 셸 명령 실행."},
 {c:"D3", t:"CLAUDE.md 3계층", d:"사용자 범위(~/.claude, 본인에게만 적용), 프로젝트 범위(팀 공유), 디렉토리 범위. 세 계층이 함께 로드되며 충돌 시 더 구체적인 위치가 우선하는 경향이 있음."},
 {c:"D3", t:"@import", d:"CLAUDE.md에서 외부 표준 파일을 참조로 포함함. 원본 파일은 하나만 두고 필요한 곳에서 선택적으로 불러옴."},
 {c:"D3", t:".claude/rules/ + paths", d:"글롭에 매칭되는 파일을 편집할 때만 로드되는 조건부 규칙(conditional rules). 토큰을 절약하고 무관한 규칙의 간섭을 없앰."},
 {c:"D3", t:"plan mode / Explore", d:"파일을 수정하지 않고 탐색과 설계부터 하는 모드(대규모 작업, 접근법이 여럿인 경우, 아키텍처 결정) / 길어지는 탐색을 격리하고 요약만 돌려주는 서브에이전트."},
 {c:"D3", t:"context: fork / allowed-tools / argument-hint", d:"스킬을 격리해 실행 / 스킬 실행 중 도구 제한 / 인자가 없으면 사용자에게 요구. 세 가지 모두 스킬 frontmatter 항목임."},
 {c:"D3", t:"인터뷰 패턴", d:"구현 전에 Claude가 먼저 질문하게 해서 놓친 고려사항(캐시 무효화, 실패 모드)을 찾아냄. 익숙하지 않은 도메인에서 사용함."},
 {c:"D4", t:"오탐 (false positive)", d:"문제가 아닌 것을 문제라고 보고하는 것. 오탐이 많은 범주 하나가 결과 전체에 대한 신뢰를 떨어뜨림. 해당 범주를 일시 비활성화하고 기준을 개선함."},
 {c:"D4", t:"few-shot", d:"예시를 제시해 판단 기준을 학습시키는 방법. 애매한 케이스 2~4개와 선택 이유를 함께 주면 새로운 패턴으로 일반화됨."},
 {c:"D4", t:"Pydantic", d:"파이썬 형식 검사기. 출력이 스키마에 맞는지 대조하고 어긋난 지점을 알려줌. 재시도 시 피드백 재료로 사용함."},
 {c:"D4", t:"재시도 3종 세트", d:"원본 문서, 실패한 출력, 구체적 오류를 함께 넣어 재요청함. 정보가 없어서 실패한 경우는 재시도로 해결되지 않으므로 null 처리하거나 사람에게 전달함."},
 {c:"D4", t:"Batches API / custom_id / SLA", d:"비용 50% 절감에 최대 24시간이 걸리고 지연 보장이 없는 처리 방식 / 요청과 응답의 짝을 맞추는 식별자 / 처리 완료 시점에 대한 보장. 배치에는 SLA가 없음."},
 {c:"D4", t:"독립 리뷰 인스턴스", d:"생성 맥락이 전혀 없는 별도 세션. 자기 리뷰의 구조적 한계(스스로 내린 결정을 옹호하는 경향)를 해결하는 방법임."},
 {c:"D5", t:"lost in the middle", d:"긴 입력에서 중간에 놓인 정보가 누락되는 현상. 핵심 요약을 맨 앞에 두고 섹션 헤더를 명시해 대응함."},
 {c:"D5", t:"case facts 블록", d:"금액, 날짜, 주문번호를 요약 파이프라인 밖의 구조화 블록에 보관하고 매 프롬프트에 포함함. 이슈가 여러 개면 이슈별로 나누어 관리함."},
 {c:"D5", t:"에스컬레이션 3대 트리거", d:"사용자가 사람을 명시적으로 요구할 때, 정책에 예외나 공백이 있을 때, 더 이상 진전이 불가능할 때. 감정, 자기 신뢰도, 턴 수는 가짜 지표임."},
 {c:"D5", t:"에러 전파 4요소", d:"실패 유형, 시도한 것, 부분 결과, 대안. 잘못된 처리 방식은 원인을 뭉뚱그리기, 실패를 성공으로 표시하기, 전체 작업 중단하기임."},
 {c:"D5", t:"스크래치패드 / 매니페스트", d:"대화 밖 파일에 발견을 기록해 컨텍스트 열화에 대응하는 방법 / 상태 export의 색인. 크래시 이후 코디네이터가 매니페스트를 로드해 작업을 재개함."},
 {c:"D5", t:"층화 표집 / 보정", d:"그룹별로 고르게 표본을 뽑아 자동화 구간을 감시하는 방법(stratified sampling) / 모델이 말한 90% 확신이 실제로 몇 %인지 정답지와 대조하는 것(calibration)."},
 {c:"D5", t:"claim-source 매핑", d:"주장, 증거 발췌, 출처, 발행일을 하나로 묶어 두는 것. 요약을 거치더라도 이 묶음을 보존하고 병합해야 출처가 남음."},
 {c:"D5", t:"커버리지 주석", d:"리포트에서 근거가 충분한 발견과 자료가 부족한 영역을 구분해 표시함. 확인된 범위를 있는 그대로 밝히기 위한 장치임."},
],

principles: `
<ul>
<li><b>① 반드시 지켜야 할 규칙은 프로그램으로 강제하고, 선호에 해당하는 요구는 프롬프트로 전달함.</b> 지문에 "never", "must", "N% 실패율" 같은 신호가 있으면 전제조건 게이트나 훅이 정답 방향임. 문체와 출력 형식 요구는 프롬프트로 처리함.</li>
<li><b>② 증상이 아니라 근본 원인을 고침.</b> 로그가 가리키는 지점을 직접 수정하는 보기가 정답임. 증상만 가리거나 표면을 정리하는 보기는 오답임.</li>
<li><b>③ 과잉 설계를 하지 않음.</b> "가장 효과적인 첫 조치"를 묻는 문항의 정답은 비용이 적게 드는 조치로 원인을 직접 고치는 것임. 분류기 학습, 라우팅 레이어, 파이프라인 복제는 대개 오답임.</li>
<li><b>④ 최소 권한을 적용함.</b> 역할에 필요한 도구만 부여함. 전체의 85%를 차지하는 고빈도 작업에는 범위를 좁힌 전용 도구를 주고, 나머지 15%는 기존 경로로 처리함.</li>
<li><b>⑤ 실패는 구조화해서 전달함.</b> 실패 유형, 시도한 것, 부분 결과, 대안을 함께 넘김. 실패를 숨기거나 뭉뚱그리지 않고, 전체 작업을 중단하지도 않음.</li>
</ul>`
};
