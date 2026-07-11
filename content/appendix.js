/* 부록 — 핵심 치트시트 · 판단 도구 · 용어사전 */
window.CCAF_APPENDIX = {

cheat: `
<h4>숫자 암기표</h4>
<table>
<tr><th>항목</th><th>값</th></tr>
<tr><td>시험</td><td><b>60문항 · 120분</b> · 시나리오 6개 중 <b>4개 랜덤</b> · 합격 <b>720</b>/1000 · 유효 <b>12개월</b> · 답해야 다음 문항 진행(건너뛰기 불가)</td></tr>
<tr><td>도메인 가중치</td><td>D1 <b>27%</b> · D3 20% · D4 20% · D2 18% · D5 15%</td></tr>
<tr><td>Batches API</td><td>비용 <b>50% 절감</b> · 처리 <b>최대 24시간</b> · <b>SLA 없음</b> · 요청 내 멀티턴 도구 호출 불가 · 짝 맞추기는 custom_id</td></tr>
<tr><td>도구 개수 감각</td><td>역할당 <b>4~5개</b> 적정 — 18개면 선택 신뢰도 하락</td></tr>
<tr><td>few-shot</td><td>애매한 케이스 <b>2~4개</b> + 선택 이유 포함</td></tr>
</table>

<h4>위치 암기표 — "어디에 두나"</h4>
<table>
<tr><th>것</th><th>팀 공유</th><th>개인</th></tr>
<tr><td>슬래시 커맨드</td><td><code>.claude/commands/</code></td><td><code>~/.claude/commands/</code></td></tr>
<tr><td>스킬</td><td><code>.claude/skills/</code> (SKILL.md)</td><td><code>~/.claude/skills/</code> (다른 이름으로)</td></tr>
<tr><td>MCP 서버</td><td><code>.mcp.json</code> + <code>\${ENV_VAR}</code></td><td><code>~/.claude.json</code></td></tr>
<tr><td>항상 로드 지시</td><td>프로젝트 <code>CLAUDE.md</code> (+디렉토리)</td><td><code>~/.claude/CLAUDE.md</code></td></tr>
<tr><td>조건부 규칙</td><td colspan="2"><code>.claude/rules/</code> + frontmatter <code>paths: ["글롭"]</code> — 산재 파일엔 <code>**/*.test.tsx</code></td></tr>
</table>

<h4>플래그·명령 암기표</h4>
<ul>
<li><code>-p</code> (<code>--print</code>) — 비대화형 실행, CI 필수 (없으면 입력 대기 정지)</li>
<li><code>--output-format json</code> + <code>--json-schema</code> — 기계 파싱용 구조화 출력</li>
<li><code>--resume &lt;세션이름&gt;</code> — 세션 이어가기 / <code>fork_session</code> — 공통 기반에서 분기 비교</li>
<li><code>/memory</code> — 로드된 메모리 파일 확인 (행동 불일치 진단) / <code>/compact</code> — 장황한 탐색 후 압축</li>
<li>스킬 frontmatter 3종: <code>context: fork</code>(격리) · <code>allowed-tools</code>(도구 제한) · <code>argument-hint</code>(인자 요구)</li>
</ul>

<h4>stop_reason</h4>
<ul>
<li>시험 핵심 2값: <code>"tool_use"</code> 도구 실행 후 계속 · <code>"end_turn"</code> 종료(유일한 정석)</li>
<li>보조: <code>"max_tokens"</code> 길이 한도 · <code>"stop_sequence"</code> 지정 문자열 감지</li>
<li>공식 API엔 <code>"pause_turn"</code>(서버 도구 루프 한도)·<code>"refusal"</code> 등도 실존 — "없는 기능" 소거를 stop_reason 값에는 함부로 쓰지 말 것</li>
</ul>

<h4>에러 4분류 (2.2)</h4>
<table>
<tr><th>errorCategory</th><th>isRetryable</th><th>예</th><th>에이전트의 올바른 행동</th></tr>
<tr><td>transient</td><td>✅</td><td>타임아웃, 서비스 다운</td><td>제한된 재시도</td></tr>
<tr><td>validation</td><td>❌</td><td>잘못된 입력</td><td>수정된 입력 요청</td></tr>
<tr><td>business</td><td>❌</td><td>정책 위반(기간 만료)</td><td>고객 친화 설명으로 전환</td></tr>
<tr><td>permission</td><td>❌</td><td>권한 없음</td><td>에스컬레이션/설명</td></tr>
</table>
<ul><li>+ 접근 실패(못 봄)와 정상 빈 결과(봤는데 없음)는 반드시 다른 형태로</li></ul>

<h4>tool_choice (2.3/4.3)</h4>
<ul>
<li><code>"auto"</code> 텍스트 응답 허용(도구 제공 시 기본값) · <code>"any"</code> 어떤 도구든 강제 · <code>{"type":"tool","name":"..."}</code> 특정 도구 강제 · <code>"none"</code> 도구 금지(공식 4번째 값, 도구 미제공 시 기본값)</li>
<li>실제 API 표기는 전부 객체(<code>{"type":"auto"}</code>) — 가이드는 축약 표기. any/강제 시 자연어 설명 없이 곧장 도구 호출</li>
</ul>

<h4>공식 문서 검증 디테일 (7/11 감사)</h4>
<ul>
<li>도구 설명은 <b>최소 3~4문장</b> — "성능의 가장 중요한 단일 요인" (공식 문서)</li>
<li>도구 이름·custom_id 형식: 영숫자·하이픈·언더스코어 <b>1~64자</b></li>
<li>배치: 10만 건/256MB 한도 · 결과 29일 보관 · 결과 순서 비보장 · expired 미과금</li>
<li>CLAUDE.md는 덮어쓰기가 아니라 <b>전부 연결 로드</b>, 가까운 파일이 나중에 읽힘 · 충돌 시 임의 선택 가능 → 충돌 제거가 정석 · "차단이 필요하면 PreToolUse 훅" (공식 문구)</li>
<li>@import 최대 4단계 · paths 없는 rules는 상시 로드 · CLAUDE.local.md(개인·gitignore) 존재</li>
</ul>

<h4>도메인별 정답 패턴</h4>
<table>
<tr><th>상황 신호</th><th>정답 방향</th></tr>
<tr><td>돈·보안·순서 + "never/must/N%" 실패율</td><td>프로그램적 게이트·PreToolUse 훅 (+대체 경로 연결)</td></tr>
<tr><td>도구 오선택 "첫 조치"</td><td>description 확충 (입력·예시·경계)</td></tr>
<tr><td>결과 이상 + 분해 로그 제시</td><td>코디네이터 분해 수정 (하류 탓 금지)</td></tr>
<tr><td>합성이 발견 무시</td><td>프롬프트에 명시 전달 (자동 상속 없음)</td></tr>
<tr><td>지연·왕복 과다</td><td>한 응답 병렬 Task / 85%엔 scoped 도구</td></tr>
<tr><td>형식 들쭉날쭉</td><td>입출력 예시 / few-shot 형식 데모</td></tr>
<tr><td>환각 값</td><td>nullable + enum other/unclear</td></tr>
<tr><td>재시도 무한</td><td>원인 판별: 형식(재시도 O) vs 정보 부재(X)</td></tr>
<tr><td>블로킹 vs 야간</td><td>실시간 API vs Batches</td></tr>
<tr><td>자기 리뷰 실패</td><td>독립 인스턴스 (+파일별·통합 패스)</td></tr>
<tr><td>숫자·날짜 증발</td><td>case facts 블록 (요약 밖)</td></tr>
<tr><td>화난 고객/신뢰도 낮음</td><td>에스컬레이션 사유 아님 — 3대 트리거만</td></tr>
<tr><td>통계 충돌</td><td>둘 다 + 출처·시점 주석 (임의 선택 금지)</td></tr>
<tr><td>정확도 97% 자동화</td><td>세그먼트 분해 검증 + 층화 표집 감시</td></tr>
</table>

<h4>오답 장치 도감 — 보면 소거</h4>
<ul>
<li><b>프롬프트 강조:</b> "CRITICAL:", "MUST", few-shot 추가로 필수 규칙 해결 — 확률은 0이 안 됨</li>
<li><b>가짜 지표:</b> 감정 점수·미보정 자기 신뢰도·턴 수로 판단</li>
<li><b>과잉 설계:</b> 분류기 학습, 라우팅 레이어, 파이프라인 복제, 파인튜닝</li>
<li><b>실패 은폐:</b> 빈 결과를 성공으로, "unavailable" 한 마디, 전체 중단</li>
<li><b>같은 세션 리뷰:</b> extended thinking·강한 지시로 자기 리뷰 개선 시도</li>
<li><b>존재하지 않는 기능:</b> CLAUDE_HEADLESS, --batch 플래그, 세션 공유 메모리, 도구 배열 순서 = 실행 순서</li>
<li><b>범위 밖 해법:</b> 벡터 DB, Kubernetes, RLHF, OAuth 구현 (0-4 레슨 참고)</li>
<li><b>절반의 진실:</b> 맞는 얘기로 시작해 틀린 결론 ("배치는 보통 빨리 끝나니까...", "파일 다시 읽으면 최신이니까...")</li>
</ul>`,

glossary: [
 {c:"기초", t:"API", d:"프로그램끼리 요청·응답을 주고받는 창구. '요청을 보낸다' = 대화 기록 전체 + 도구 목록을 Claude에 전송."},
 {c:"기초", t:"CLI / 플래그", d:"명령어 타이핑으로 프로그램을 조작하는 방식(Claude Code) / 명령 뒤에 붙는 옵션 스위치(-p 등)."},
 {c:"기초", t:"환경변수", d:"컴퓨터에 붙여두는 이름표. 이름은 공유해도 값은 각자 기계에만 — 비밀키 관리의 기본."},
 {c:"기초", t:"버전 관리 / 커밋", d:"팀이 같은 폴더(저장소)를 공유하는 시스템 / 저장소에 변경을 올리는 것. 올라간 건 팀 전체가 봄."},
 {c:"기초", t:"JSON / JSON 스키마", d:"기계가 읽는 데이터 표기법 / 출력의 빈칸 양식 — required 필수, nullable 비워도 됨, enum 보기 중 선택."},
 {c:"기초", t:"YAML frontmatter", d:"파일 맨 위 --- 사이의 설정 라벨 구역 (SKILL.md, rules 파일)."},
 {c:"기초", t:"글롭 패턴", d:"파일 경로 패턴. * = 한 단계 이름, ** = 모든 하위 폴더. **/*.test.tsx = 위치 불문 테스트 파일."},
 {c:"기초", t:"CI/CD · PR", d:"코드를 올릴 때마다 자동 검사·배포하는 컨베이어 벨트 / 코드 변경 승인 요청서."},
 {c:"D1", t:"에이전틱 루프", d:"요청 → stop_reason 확인 → 도구 실행 → 결과를 대화에 추가 → 반복. 결과 추가까지가 한 바퀴."},
 {c:"D1", t:"stop_reason", d:"응답마다 붙는 '왜 멈췄나' 라벨. tool_use(계속)/end_turn(종료)/max_tokens(한도)/stop_sequence(지정 문자열)."},
 {c:"D1", t:"대화 히스토리", d:"role(user/assistant)이 붙은 메시지 목록. 모델은 매번 전체를 다시 읽음 — 기억이 아니라 기록."},
 {c:"D1", t:"허브-앤-스포크", d:"코디네이터가 모든 서브에이전트 통신·에러·정보 흐름을 중계하는 구조. 관측성·일관성·통제가 이유."},
 {c:"D1", t:"Task 도구 / allowedTools", d:"서브에이전트를 만드는 공식 수단 / 에이전트가 쓸 수 있는 도구 목록 — Task가 없으면 위임 불가."},
 {c:"D1", t:"AgentDefinition", d:"서브에이전트의 이력서: 설명, 시스템 프롬프트, 도구 제한."},
 {c:"D1", t:"prompt chaining / 동적 분해", d:"미리 정한 순차 단계(예측 가능한 반복 작업) / 발견이 다음 단계를 정하는 방식(열린 과제)."},
 {c:"D1", t:"훅 (PostToolUse / PreToolUse)", d:"실행 흐름의 길목에서 무조건 도는 코드. Post = 결과 변환(정규화·트리밍), Pre = 호출 차단+리다이렉트."},
 {c:"D1", t:"전제조건 게이트", d:"A 완료 전 B 실행을 코드로 차단. 검증 전 환불 금지 같은 순서 규칙의 결정론적 강제."},
 {c:"D1", t:"--resume / fork_session / stale", d:"세션 이어가기 / 공통 분석에서 분기 비교 / 현실이 바뀌어 기록이 낡은 상태 — 변경 '범위'로 판단."},
 {c:"D2", t:"description (도구 설명)", d:"모델이 도구를 고르는 1차 근거. 입력 형식·예시 질의·엣지·경계를 담아야 오선택이 사라짐."},
 {c:"D2", t:"isError / errorCategory / isRetryable", d:"MCP 실패 신호 / 실패 유형(transient·validation·business·permission) / 재시도 가치 불리언."},
 {c:"D2", t:"tool_choice", d:"auto(자율) · any(어떤 도구든 강제) · 특정 지정(순서 보장). 요구 수준에 맞춰 선택."},
 {c:"D2", t:"MCP / MCP 리소스", d:"외부 시스템 연결 표준 프로토콜 / 행동(도구)이 아닌 콘텐츠 카탈로그(스키마·문서 목록) 노출 — 탐색 호출 절약."},
 {c:"D2", t:"내장 도구 6종", d:"Grep 내용 검색 · Glob 이름 패턴 · Read/Write 전체 읽기·쓰기 · Edit 고유 매칭 수정(실패 시 Read+Write) · Bash 셸."},
 {c:"D3", t:"CLAUDE.md 3계층", d:"사용자(~/.claude, 나만) / 프로젝트(팀 공유) / 디렉토리. 함께 로드, 충돌 시 구체적 위치 우선 경향."},
 {c:"D3", t:"@import", d:"CLAUDE.md에서 외부 표준 파일을 참조로 포함 — 원본 하나, 선택적 포함."},
 {c:"D3", t:".claude/rules/ + paths", d:"글롭 매칭 파일 편집 시에만 로드되는 조건부 규칙 — 토큰 절약 + 간섭 제거."},
 {c:"D3", t:"plan mode / Explore", d:"수정 없이 탐색·설계부터 (대규모·복수 접근·아키텍처) / 장황한 탐색을 격리하고 요약만 반환하는 서브에이전트."},
 {c:"D3", t:"context: fork / allowed-tools / argument-hint", d:"스킬 격리 실행 / 스킬 중 도구 제한 / 인자 없으면 물어보기 — 스킬 frontmatter 3종."},
 {c:"D3", t:"인터뷰 패턴", d:"구현 전에 Claude가 질문하게 해 놓친 고려사항(캐시 무효화, 실패 모드)을 발굴 — 낯선 도메인용."},
 {c:"D4", t:"오탐 (false positive)", d:"아닌 걸 문제라고 보고. 오탐 많은 범주 하나가 전체 신뢰를 무너뜨림 → 일시 비활성 + 기준 개선."},
 {c:"D4", t:"few-shot", d:"예시로 판단을 가르치기. 애매 케이스 2~4개 + 선택 이유 → 새 패턴으로 일반화."},
 {c:"D4", t:"Pydantic", d:"파이썬 양식 검사기. 출력이 스키마에 맞는지 대조하고 틀린 지점을 알려줌 — 재시도 피드백의 재료."},
 {c:"D4", t:"재시도 3종 세트", d:"원본 문서 + 실패한 출력 + 구체적 오류를 동봉해 재요청. 정보 부재는 재시도 불가 — null·인간 라우팅."},
 {c:"D4", t:"Batches API / custom_id / SLA", d:"50% 절감, 최대 24h, 지연 보장 없음 / 요청-응답 짝 맞추기 / '언제까지'라는 약속 — 배치엔 없음."},
 {c:"D4", t:"독립 리뷰 인스턴스", d:"생성 맥락이 없는 별도 세션. 자기 리뷰의 구조적 한계(자기 결정 옹호)를 유일하게 넘는 방법."},
 {c:"D5", t:"lost in the middle", d:"긴 입력의 중간 정보가 누락되는 현상 → 핵심 요약 맨 앞 + 명시적 섹션 헤더."},
 {c:"D5", t:"case facts 블록", d:"금액·날짜·주문번호를 요약 파이프라인 밖 구조화 블록에 보관, 매 프롬프트 포함. 멀티 이슈면 이슈별 레이어."},
 {c:"D5", t:"에스컬레이션 3대 트리거", d:"명시적 인간 요구 / 정책 예외·공백 / 진전 불가. 감정·자기 신뢰도·턴 수는 가짜 지표."},
 {c:"D5", t:"에러 전파 4요소", d:"실패 유형 + 시도한 것 + 부분 결과 + 대안. 안티패턴: 뭉뚱그림, 성공 위장, 전체 중단."},
 {c:"D5", t:"스크래치패드 / 매니페스트", d:"대화 밖 파일에 발견 기록(열화 대응) / 상태 export의 색인 — 크래시 후 코디네이터가 로드해 재개."},
 {c:"D5", t:"층화 표집 / 보정", d:"그룹별로 골고루 표본 추출(자동화 구간 감시) / 모델의 '90% 확신'이 실제 몇 %인지 정답지로 대조."},
 {c:"D5", t:"claim-source 매핑", d:"주장 + 증거 발췌 + 출처 + 발행일 묶음. 요약을 거쳐도 보존·병합해야 출처가 살아남음."},
 {c:"D5", t:"커버리지 주석", d:"리포트에서 탄탄한 발견 vs 소스 공백 영역을 구분 표시 — 정직한 부분 진행의 장치."},
],

principles: `
<ul>
<li><b>① 강제는 프로그램으로, 성향은 프롬프트로</b> — "never/must/N% 실패" 신호 = 게이트·훅. 스타일·형식 = 프롬프트.</li>
<li><b>② 증상 말고 근본 원인</b> — 로그가 가리키는 지점을 직접 고치는 보기가 정답. 증상 처치·화장은 오답.</li>
<li><b>③ 과잉 설계 금지</b> — "가장 효과적인 첫 조치"는 낮은 비용으로 원인을 직접 고치는 것. 분류기·레이어·복제는 대개 오답.</li>
<li><b>④ 최소 권한</b> — 역할에 필요한 도구만. 85% 고빈도엔 좁은 전용 도구, 15%는 기존 경로.</li>
<li><b>⑤ 실패는 구조화해서 전달</b> — 유형·시도·부분 결과·대안. 숨기지도, 뭉개지도, 전체를 세우지도 말 것.</li>
</ul>`
};
