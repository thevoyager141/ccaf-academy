/* 확장 문제 풀: 자주 틀리는 지점 38 + 복수 응답 15 + 조건 복합형 2 + 반복 출제 영역 6 */
window.CCAF_MT_EXTRA = {
 "1.1": [
  {
   "ts": "1.1",
   "lvl": "기초",
   "scenario": "s1",
   "q": "A travel-support agent handles requests like \"rebook my flight and align my hotel dates\" where the needed tools and their order vary per case. A teammate proposes hardcoding one fixed sequence (search_flights → book_flight → search_hotels → book_hotel) for every request. What is the strongest argument against this?",
   "opts": [
    {
     "t": "A pre-configured sequence cannot adapt when a request needs a different tool set or ordering; letting the model reason each turn about the next call is exactly what the agentic loop provides for variable requests.",
     "ok": true
    },
    {
     "t": "Fixed sequences run slower than model-driven loops because every step waits for the previous one."
    },
    {
     "t": "The model always makes better decisions than pre-written code, so sequences should never be hardcoded."
    },
    {
     "t": "Hardcoding the sequence prevents the API from returning stop_reason values, breaking loop termination."
    }
   ],
   "explain": {
    "good": "요청마다 필요한 도구와 순서가 달라지면 다음 행동을 모델이 매 턴 판단하게 해야 함. 이것이 에이전트 루프(agentic loop)의 용도임. 고정 시퀀스는 예측 가능하지만 미리 정해 둔 경우를 벗어나면 대응하지 못함. 판별 질문은 \"다음 행동을 누가 정하는가\"이며, 요청마다 달라지면 모델이 정함.",
    "wrongs": [
     "<b>B(속도 문제):</b> 속도는 이 문제의 쟁점이 아님. 고정 시퀀스가 오히려 더 빠를 수도 있음. 문제는 유연성임.",
     "<b>C(항상 모델이 낫다):</b> 과잉 일반화임. 단계가 예측 가능한 반복 워크플로에서는 고정 파이프라인(1.6: 단계가 미리 정해진 프롬프트 체이닝)이 정답임.",
     "<b>D(stop_reason 차단):</b> stop_reason은 API가 응답마다 자동으로 반환함. 코드 구조와 무관하게 항상 포함됨."
    ]
   },
   "principle": "모델 주도와 사전 결정: 가변성이 판단 기준임"
  },
  {
   "ts": "1.1",
   "lvl": "실전",
   "scenario": "s4",
   "q": "Overnight job log, iteration 7: the response has stop_reason \"max_tokens\" and a truncated partial tool_use block. Your loop treats any non-tool_use stop_reason as completion, so it marked the task done at 50%. What is the correct fix?",
   "opts": [
    {
     "t": "Branch on each stop_reason value explicitly: only end_turn means finished; max_tokens means the response was cut off and needs continuation or a higher limit — collapsing all non-tool_use values into \"done\" is the bug.",
     "ok": true
    },
    {
     "t": "Raise the iteration cap so the loop has more cycles to finish the remaining work."
    },
    {
     "t": "After each response, scan the text for phrases like \"task complete\" as a second completion check."
    },
    {
     "t": "Treat every non-end_turn stop_reason as a retryable error and resubmit the identical request."
    }
   ],
   "explain": {
    "good": "stop_reason은 두 값 중 하나가 아니라 여러 값을 가진 열거형임. end_turn, tool_use, max_tokens, pause_turn, refusal 등 값마다 의미와 대응이 다름. 잘린 응답(max_tokens)을 완료로 해석한 것이 근본 원인임.",
    "wrongs": [
     "<b>B(반복 횟수 증가):</b> 반복 횟수는 이 결함과 무관함. 잘린 응답을 완료로 읽는 한 반복을 늘려도 같은 지점에서 중단됨.",
     "<b>C(텍스트로 완료 판정):</b> 자연어 완료 신호를 파싱하는 방식은 대표적인 안티패턴임. 표현이 바뀌면 판정이 어긋남.",
     "<b>D(동일 요청 재제출):</b> 같은 요청을 다시 보내면 max_tokens에서 똑같이 잘림. pause_turn(계속 진행)과 refusal(중단)은 대응이 정반대이므로 하나로 묶으면 안 됨."
    ]
   },
   "principle": "stop_reason은 열거형: 값마다 분기함"
  },
  {
   "ts": "1.1",
   "lvl": "실전",
   "scenario": "s1",
   "multi": 2,
   "q": "A support agent's loop terminates whenever the response contains any text block, and it silently drops failed tool results \"to keep the context clean.\" Which TWO changes fix the actual defects? (Select TWO.)",
   "opts": [
    {
     "t": "Terminate based on stop_reason values (continue on \"tool_use\", stop on \"end_turn\") instead of the presence of text.",
     "ok": true
    },
    {
     "t": "Append every tool result to the conversation as structured tool_result blocks — including failures.",
     "ok": true
    },
    {
     "t": "Add a hard cap of 10 iterations as the primary stopping condition for safety."
    },
    {
     "t": "Scan responses for phrases like \"all done\" as a secondary completion check."
    },
    {
     "t": "Have the loop retry the identical request whenever any non-end_turn stop_reason appears."
    }
   ],
   "explain": {
    "good": "결함이 두 가지임. 종료 신호를 잘못 읽는 것과 실패한 도구 결과(tool result)를 버리는 것임. 대응도 두 가지임. stop_reason 기준 종료와 실패를 포함한 전체 결과 추가임. 복수 응답 문제는 이렇게 결함 개수와 정답 개수가 일치함.",
    "wrongs": [
     "<b>C(반복 상한을 주 조건으로):</b> 반복 상한을 주 종료 조건으로 쓰는 것은 안티패턴임. 상한은 보조 안전장치일 때만 타당함.",
     "<b>D(자연어 완료 신호):</b> 표현이 바뀌면 판정이 어긋나는 안티패턴임.",
     "<b>E(모든 값 재제출):</b> max_tokens, pause_turn, refusal은 각각 대응이 다름. 동일 요청 재제출로 묶으면 안 됨."
    ]
   },
   "principle": "stop_reason으로 반복하고 실패도 기록함"
  },
  {
   "ts": "1.1",
   "lvl": "실전",
   "scenario": "s4",
   "q": "Which of the following is NOT a valid way to terminate an agentic loop?",
   "opts": [
    {
     "t": "Stopping as soon as the response contains any text block, since Claude ends its work with text.",
     "ok": true
    },
    {
     "t": "Stopping when stop_reason is \"end_turn\"."
    },
    {
     "t": "Stopping when a hard iteration cap is hit, used only as a secondary safety net alongside stop_reason."
    },
    {
     "t": "Stopping when stop_reason is \"refusal\", since the model declined to proceed."
    }
   ],
   "explain": {
    "good": "부정형 질문임. 셋은 정당한 종료 방식이고 하나가 안티패턴임. 텍스트 블록이 있다는 이유로 종료하는 것이 안티패턴임. 도구 요청과 설명 텍스트는 한 응답에 함께 나오므로 중간 설명 단계에서 조기 종료됨.",
    "wrongs": [
     "<b>B(end_turn 종료):</b> end_turn 종료가 기본 방식이며 권장되는 동작임.",
     "<b>C(보조 안전망 상한):</b> 반복 상한을 보조 안전망으로만 쓰는 것은 정당함. 안티패턴은 상한을 주 종료 조건으로 쓸 때임. 지문의 조건을 정확히 읽어야 구분되는 선택지임.",
     "<b>D(refusal 종료):</b> refusal은 모델이 수행을 거부한 상태이므로 반복을 계속할 이유가 없음. 정당한 종료임."
    ]
   },
   "principle": "부정형 질문: 묻는 방향을 먼저 확인함"
  }
 ],
 "1.2": [
  {
   "ts": "1.2",
   "lvl": "기초",
   "scenario": "s3",
   "q": "Two research subagents on \"EV battery market\" returned the same three sources — 40% of tokens duplicated. Proposal A: the coordinator deduplicates results after collection. Proposal B: the coordinator assigns distinct subtopics and source types before delegation. Which is right, and why?",
   "opts": [
    {
     "t": "B — partitioning the research space before delegation prevents the duplicate work; post-collection dedupe still pays the doubled token cost and cannot recover the coverage that the wasted effort displaced.",
     "ok": true
    },
    {
     "t": "A — deduplication is simpler to implement and guarantees the final report contains no repeats."
    },
    {
     "t": "A — subagents cannot see each other's context, so duplication is unavoidable and can only be cleaned up afterward."
    },
    {
     "t": "Either works — they produce the same final report at the same total cost."
    }
   ],
   "explain": {
    "good": "중복 작업은 발생한 뒤에 제거하는 것이 아니라 발생 전에 막아야 함. 사후 중복 제거 시점에는 토큰 비용을 이미 지불했고, 그 시간에 다뤘어야 할 미조사 영역도 회복되지 않음. 코디네이터(coordinator)가 서브에이전트(subagent)에게 위임하기 전에 주제와 자료 유형을 나누는 것이 정답임.",
    "wrongs": [
     "<b>B(구현이 단순함):</b> 구현이 단순하다는 부분만 맞음. 중복 항목은 제거되지만 이미 두 배로 쓴 비용과 조사하지 못한 영역은 회복되지 않음.",
     "<b>C(격리라서 불가피함):</b> 서브에이전트끼리 서로의 컨텍스트를 보지 못하는 것은 사실이지만 결론이 반대임. 서로 볼 수 없기 때문에 코디네이터가 사전에 범위를 나눠 주는 것이 가능하고 또 필요함.",
     "<b>D(비용 동일):</b> 비용이 같지 않음. 사후 제거는 중복 작업 비용을 전부 지불한 뒤의 정리 작업임."
    ]
   },
   "principle": "중복은 사전 분할로 발생 전에 막음"
  },
  {
   "ts": "1.2",
   "lvl": "실전",
   "scenario": "s3",
   "q": "Your research coordinator is drowning: every transient search timeout, single-source conflict, and empty result set round-trips through it, and triage now consumes most of its context. How do you redesign responsibility?",
   "opts": [
    {
     "t": "Subagents handle routine recovery locally — retry transient failures, annotate conflicts in their output — and escalate only what they cannot resolve; the coordinator keeps task design, delegation, and synthesis.",
     "ok": true
    },
    {
     "t": "Route even more detail to the coordinator so it has full visibility into every failure before deciding."
    },
    {
     "t": "Insert a dedicated triage subagent between the coordinator and the workers to classify each incident first."
    },
    {
     "t": "Suppress error reporting so subagents always return best-effort results and the coordinator stays clean."
    }
   ],
   "explain": {
    "good": "역할 분담의 기준임. 작업 설계(사전 분해와 배정)는 코디네이터가, 일상적인 복구는 서브에이전트가 담당하고, 스스로 해결하지 못하는 것만 코디네이터로 올림. 코디네이터를 일상 오류 처리에 끌어들이면 설계와 종합이라는 본래 역할을 수행할 컨텍스트가 남지 않음.",
    "wrongs": [
     "<b>B(더 많은 정보를 코디네이터로):</b> 가시성 확보라는 명분은 타당해 보이지만 과부하라는 원인을 오히려 키움. 필요한 가시성은 구조화된 결과 보고로 확보됨.",
     "<b>C(분류 전담 서브에이전트 추가):</b> 중간 계층을 새로 만드는 방식임. 기존 에이전트에 역할 규칙을 부여하면 해결되는 문제이므로 과잉 설계임.",
     "<b>D(오류 보고 억제):</b> 오류를 보고하지 않으면 코디네이터가 실패를 성공으로 잘못 판단함. 가장 위험한 안티패턴임."
    ]
   },
   "principle": "설계는 코디네이터, 일상 복구는 서브에이전트"
  },
  {
   "ts": "1.2",
   "lvl": "기초",
   "scenario": "s3",
   "multi": 2,
   "q": "In a coordinator–subagent research system, which TWO are the coordinator's responsibilities? (Select TWO.)",
   "opts": [
    {
     "t": "Partitioning the research scope into non-overlapping subtopics before delegation.",
     "ok": true
    },
    {
     "t": "Aggregating subagent outputs and evaluating the synthesis for coverage gaps, re-delegating where thin.",
     "ok": true
    },
    {
     "t": "Executing the web searches itself when a subagent's results look weak."
    },
    {
     "t": "Handling every transient timeout centrally so subagents stay simple."
    },
    {
     "t": "Letting subagents exchange findings directly with each other to reduce round-trips."
    }
   ],
   "explain": {
    "good": "코디네이터의 역할은 사전 설계(범위 분할과 배정)와 사후 종합(누락 영역 평가와 재위임)임. 실제 조사 실행과 일상적인 오류 복구는 서브에이전트가 담당함. 두 계층의 역할 구분이 이 문제의 전부임.",
    "wrongs": [
     "<b>C(코디네이터가 직접 검색):</b> 코디네이터가 실행까지 맡으면 위임 구조의 의미가 사라짐. 결과가 부실하면 재위임하는 것이 정답임.",
     "<b>D(일시 실패 중앙 처리):</b> 일시적 실패는 서브에이전트가 자체 복구함. 전부 중앙으로 올리면 코디네이터가 과부하 상태가 됨.",
     "<b>E(서브에이전트 간 직접 통신):</b> 직접 통신은 컨텍스트 격리와 실행 추적을 무효화함. 모든 통신은 코디네이터를 거쳐야 함."
    ]
   },
   "principle": "설계는 코디네이터, 실행과 복구는 서브에이전트"
  }
 ],
 "1.3": [
  {
   "ts": "1.3",
   "lvl": "실전",
   "scenario": "s1",
   "q": "Every support case needs customer profile, order history, and shipping status — three independent lookups currently made sequentially (3x latency). A teammate proposes building a composite lookup_all tool. What is the better first move?",
   "opts": [
    {
     "t": "Prompt the agent to request all three independent lookups in a single response — parallel tool calls need no new tool, cut the round-trips, and work for any future combination of lookups.",
     "ok": true
    },
    {
     "t": "Build the composite lookup_all tool — one call is inherently more reliable than three."
    },
    {
     "t": "Preload all customer data into the system prompt at session start so no lookups are needed."
    },
    {
     "t": "Keep the calls sequential because each lookup's output feeds the next one's input."
    }
   ],
   "explain": {
    "good": "Claude는 한 응답에 여러 도구 호출을 함께 요청할 수 있음. 이 병렬 도구 호출(parallel tool calls)을 프롬프트로 요청하면 새 코드 없이 왕복 횟수가 줄어듦. 새 도구를 만드는 것은 그다음에 검토할 사항임.",
    "wrongs": [
     "<b>B(통합 도구 신설):</b> 통합 도구는 새로 만들고 계속 유지해야 하며 정확히 그 조합에서만 동작함. 네 번째 조회가 필요해지면 다시 만들어야 하므로 과잉 설계임.",
     "<b>C(전체 데이터 선로딩):</b> 어느 고객의 문의가 올지 알 수 없으므로 전체 고객 데이터를 미리 넣을 수 없고, 세션 중 갱신도 되지 않음.",
     "<b>D(순차 유지):</b> 지문에 세 조회가 independent라고 명시돼 있음. 앞 결과가 뒤 입력이 된다는 전제 자체가 지문과 어긋남."
    ]
   },
   "principle": "이미 있는 기능을 먼저 사용함: 병렬 호출은 프롬프트로"
  }
 ],
 "1.4": [
  {
   "ts": "1.4",
   "lvl": "실전",
   "scenario": "s1",
   "q": "One support agent, two defects: (1) it sometimes issues refunds before identity verification — a compliance violation; (2) its refund explanation messages vary awkwardly in tone. A teammate wants a single strict output filter for both. What is the correct split?",
   "opts": [
    {
     "t": "(1) needs programmatic enforcement — a prerequisite gate (e.g., PreToolUse hook) blocking process_refund until verification state is set; (2) is a style preference, handled by prompt instructions and examples. One mechanism cannot serve both.",
     "ok": true
    },
    {
     "t": "Apply the post-output filter to both — it catches violations and tone issues in one place."
    },
    {
     "t": "Handle both in the system prompt: \"always verify identity first, and keep a consistent tone.\""
    },
    {
     "t": "Hook both: block any refund output whose tone deviates from the approved template."
    }
   ],
   "explain": {
    "good": "판별 질문은 \"100% 지켜야 하는가, 개선되면 충분한가\"임. 컴플라이언스 요건은 확률에 맡길 수 없으므로 프로그램으로 강제함. 톤은 개선 대상이므로 프롬프트로 다룸. 여기서 강제 수단은 도구 실행 직전에 실행되는 훅(hook)임. 이 기준이 D1 영역에서 가장 자주 출제됨.",
    "wrongs": [
     "<b>B(출력 후 검사로 통합):</b> 출력 뒤에 검사하는 방식은 환불이 이미 실행된 뒤에야 확인됨. 컴플라이언스는 실행 전에 차단해야 함. 톤 검사 역시 표현이 조금만 달라져도 오판함.",
     "<b>C(둘 다 프롬프트):</b> \"항상 검증을 먼저 할 것\"이라는 지시는 확률적임. 88%를 지켜도 나머지 12%가 위반이면 컴플라이언스 요건을 충족하지 못함.",
     "<b>D(둘 다 훅):</b> 톤을 훅으로 차단하면 정상 응답까지 막히고, 어느 정도가 이탈인지 판정 기준 자체가 모호함. 강제 대상과 개선 대상을 서로 반대로 배정한 선택지임."
    ]
   },
   "principle": "원칙 ①: 강제는 프로그램으로, 성향은 프롬프트로"
  },
  {
   "ts": "1.4",
   "lvl": "기초",
   "scenario": "s1",
   "multi": 2,
   "q": "Policy: identity verification must happen before any refund, with zero tolerance for violations. Which TWO implementations provide the deterministic guarantee? (Select TWO.)",
   "opts": [
    {
     "t": "A PreToolUse hook that blocks process_refund whenever the session's verification state is not set.",
     "ok": true
    },
    {
     "t": "Making a verification token a required parameter of the process_refund tool itself, so unverified calls fail schema validation.",
     "ok": true
    },
    {
     "t": "A system-prompt rule: \"Always verify identity before processing any refund.\""
    },
    {
     "t": "Few-shot examples demonstrating verification-first behavior in past cases."
    },
    {
     "t": "A post-output filter that scans responses and removes refund confirmations lacking verification mentions."
    }
   ],
   "explain": {
    "good": "무관용(zero tolerance) 요건은 100% 강제이므로 프로그램 수준에서 보장해야 함. 훅 차단과 필수 파라미터는 모두 코드가 보장하는 방식임. 강제 수단이 반드시 훅일 필요는 없다는 점까지 묻는 문제임.",
    "wrongs": [
     "<b>C(프롬프트 규칙):</b> 프롬프트 지시는 확률적임. 88%를 100%로 만들지 못함.",
     "<b>D(퓨샷 예시):</b> 퓨샷 예시(few-shot examples)는 성향을 개선할 뿐 보장 수단이 아님. 컴플라이언스 요건에는 부족함.",
     "<b>E(출력 후 검사):</b> 출력 뒤에 문구를 지워도 환불은 이미 실행된 뒤임."
    ]
   },
   "principle": "원칙 ①: 강제는 프로그램으로. 훅과 필수 파라미터"
  }
 ],
 "1.5": [
  {
   "ts": "1.5",
   "lvl": "기초",
   "scenario": "s1",
   "q": "Match the hook to the job: (1) block process_refund whenever the amount exceeds $500; (2) normalize three backends' inconsistent date formats before the model reasons over the results.",
   "opts": [
    {
     "t": "(1) PreToolUse — intercept the call before execution to enforce the policy; (2) PostToolUse — transform results after execution, before they enter the model's context.",
     "ok": true
    },
    {
     "t": "Both PreToolUse — hooks should always act as early as possible in the pipeline."
    },
    {
     "t": "Both PostToolUse — inspect what happened and correct everything in one place afterward."
    },
    {
     "t": "(1) a system-prompt rule, (2) PostToolUse — policy belongs in instructions, transformation in hooks."
    }
   ],
   "explain": {
    "good": "판단 기준은 실행 전인가 실행 후인가임. 차단은 실행되기 전에만 의미가 있으므로 PreToolUse이고, 결과 형식 정규화는 결과가 나온 뒤에만 가능하므로 PostToolUse임.",
    "wrongs": [
     "<b>B(둘 다 PreToolUse):</b> 정규화할 결과 자체가 실행 전에는 존재하지 않음. PreToolUse로는 불가능함.",
     "<b>C(둘 다 PostToolUse):</b> 500달러 초과 차단을 실행 후에 하면 환불은 이미 실행된 뒤임. 일반적으로는 맞는 말이지만 이 문제의 조건에서는 틀린 선택지임.",
     "<b>D(금액 규칙을 프롬프트로):</b> 금액 상한은 100% 강제해야 하는 정책임. 프롬프트 지시는 확률적이라 컴플라이언스 요건에 부족함."
    ]
   },
   "principle": "실행 전에는 차단, 실행 후에는 정규화"
  }
 ],
 "1.7": [
  {
   "ts": "1.7",
   "lvl": "실전",
   "scenario": "s2",
   "q": "Monday's session \"billing-refactor\" analyzed 60 files. Wednesday: (a) another team changed 4 of those files, (b) you want to compare two competing refactor designs from the same analysis baseline. Best session strategy?",
   "opts": [
    {
     "t": "Resume the session and explicitly tell it which 4 files changed so it re-reads only those; then fork the updated session into two branches, one per design.",
     "ok": true
    },
    {
     "t": "Start two fresh sessions — Monday's analysis is stale, and forking stale context doubles the problem."
    },
    {
     "t": "Resume as-is and start comparing designs; the model will notice changed files when it touches them."
    },
    {
     "t": "Fork Monday's session directly into two branches and inform each about the file changes separately."
    }
   ],
   "explain": {
    "good": "두 단계로 나눠 판단함. 일부만 낡은 상태에서는 무엇이 바뀌었는지 알려 주고 그 파일만 다시 읽게 하면 됨. 전면 재분석은 필요하지 않음. 같은 기준선에서 두 설계안을 비교하는 것은 fork의 용도임. 순서는 갱신을 먼저 하고 분기를 나중에 하는 것임.",
    "wrongs": [
     "<b>B(전부 새 세션):</b> 60개 중 56개 파일 분석은 여전히 유효함. 전부 버리면 몇 시간 분량의 작업을 다시 수행하게 됨. 일부만 낡은 상황에 전면 재분석은 과한 조치임.",
     "<b>C(그대로 진행):</b> 세션은 파일 변경을 스스로 감지하지 못함. 낡은 분석을 근거로 추론해 틀린 결론에 도달함.",
     "<b>D(먼저 분기):</b> 분기를 먼저 하면 파일 4개 재분석을 두 갈래에서 각각 수행하게 됨. 갱신을 한 번만 하고 분기하는 것이 올바른 순서임."
    ]
   },
   "principle": "일부만 낡았으면 통보로, 분기는 fork로"
  },
  {
   "ts": "1.7",
   "lvl": "실전",
   "scenario": "s2",
   "q": "Yesterday's session crashed with an API error halfway through analyzing the checkout module (60 files done). Overnight, a teammate merged changes to 3 of those files. You must continue this morning with minimal token spend. What do you do?",
   "opts": [
    {
     "t": "Resume the session and explicitly tell it which 3 files changed so it re-reads only those, then continue — most of yesterday's analysis is still valid.",
     "ok": true
    },
    {
     "t": "Start a fresh session and re-analyze the module from scratch; after a crash and external changes, yesterday's context can't be trusted."
    },
    {
     "t": "Resume and continue immediately — the session will notice the teammate's changes when it next touches those files."
    },
    {
     "t": "Fork the crashed session into two branches and compare continuation strategies before committing to one."
    }
   ],
   "explain": {
    "good": "크래시, 야간 외부 변경, 토큰 효율이 함께 걸린 형태임. 원칙은 일부만 낡은 상태는 통보로 해결하는 것임. API 오류가 나도 세션 기록은 남아 있어 resume이 가능하고, 바뀐 3개만 다시 읽게 하면 어제 분석한 57개 파일을 그대로 재사용함. 토큰 효율의 정답은 유효한 결과를 버리지 않는 것임.",
    "wrongs": [
     "<b>B(전면 재분석):</b> 안전해 보이지만 유효한 57개 파일 분석까지 버리는 방식이며 토큰을 가장 많이 쓰는 경로임. 전면 재분석은 전체가 낡았을 때만 타당함.",
     "<b>C(그대로 계속):</b> 세션은 파일 변경을 스스로 감지하지 못함. 낡은 분석 위에서 틀린 결론을 내리게 됨.",
     "<b>D(fork):</b> fork는 비교할 안이 둘 이상일 때 쓰는 수단임. 여기에는 비교할 갈래가 없음. 정교해 보이지만 조건에 맞지 않는 선택지임."
    ]
   },
   "principle": "일부만 낡았으면 통보로: 유효한 결과는 버리지 않음"
  }
 ],
 "2.1": [
  {
   "ts": "2.1",
   "lvl": "기초",
   "scenario": "s4",
   "q": "Which tool description best supports reliable selection by the model?",
   "opts": [
    {
     "t": "Three or more sentences covering purpose, expected input format with an example query, edge cases, and an explicit boundary against the neighboring tool (\"use search_docs for guides; use this for product data\").",
     "ok": true
    },
    {
     "t": "A single precise sentence — longer descriptions waste context tokens on every request."
    },
    {
     "t": "The complete API documentation pasted in, so no detail is ever missing."
    },
    {
     "t": "A well-chosen tool name — models weight the name far more than the description text."
    }
   ],
   "explain": {
    "good": "도구 설명은 모델이 도구를 고를 때 쓰는 1차 근거임. 기준은 최소 3~4문장이며 목적, 입력 형식과 예시, 예외 상황, 인접 도구와 구분되는 사용 조건을 담음.",
    "wrongs": [
     "<b>B(한 문장):</b> 토큰 절약이라는 부분만 맞음. 설명이 최소한만 있는 것이 도구 오선택의 가장 큰 원인이며 재시도 비용이 더 큼.",
     "<b>C(전체 문서 붙여넣기):</b> 문서를 통째로 넣으면 선택 판단에 불필요한 내용까지 함께 들어감. 필요한 것은 언제 쓰고 언제 쓰지 않는지에 대한 판단 근거임.",
     "<b>D(이름 위주):</b> 이름은 짧은 표시일 뿐이며 근거 없는 주장임. 기능이 비슷한 도구는 이름만으로 구분되지 않음."
    ]
   },
   "principle": "설명이 곧 도구 선택의 근거임"
  },
  {
   "ts": "2.1",
   "lvl": "실전",
   "scenario": "s1",
   "q": "search_products and search_docs (both one-line descriptions) get confused in ~20% of calls. Proposal A: build an intent-routing classifier in front of the agent. Proposal B: rewrite both descriptions with purpose, input examples, and explicit \"use when / not when\" boundaries. Which first, and why?",
   "opts": [
    {
     "t": "B — descriptions are the primary mechanism the model uses for tool selection, so enriching them fixes the root cause with zero new components; a classifier adds a new failure point to route around a problem the descriptions should solve.",
     "ok": true
    },
    {
     "t": "A — a deterministic router beats probabilistic selection, and reliability requirements always favor determinism."
    },
    {
     "t": "Merge both into one search tool so there is nothing left to confuse."
    },
    {
     "t": "Force the right tool per request with tool_choice so selection never depends on descriptions."
    }
   ],
   "explain": {
    "good": "도구 오선택의 1차 해법은 설명 보강임. 분류기나 라우터를 새로 만드는 것은 비용, 지연, 새로운 오류 지점을 추가할 뿐 빈약한 설명이라는 원인을 고치지 못함.",
    "wrongs": [
     "<b>B(결정론적 라우터):</b> 결정론이라는 표현에 판단이 끌려가면 안 됨. 결정론적 강제는 보안과 정책 같은 컴플라이언스 요건에 쓰는 수단임. 이 문제는 품질 문제이고, 분류기 역시 또 하나의 확률 모델임.",
     "<b>C(도구 통합):</b> 합치면 구분 기준이 더 흐려짐. 두 데이터 소스는 입력, 출력, 용도가 다름.",
     "<b>D(tool_choice 강제):</b> tool_choice로 강제하려면 매 요청마다 어느 도구가 맞는지 코드가 이미 알고 있어야 함. 그것을 안다면 애초에 이 문제가 발생하지 않음."
    ]
   },
   "principle": "오선택의 1차 해법은 설명 보강임"
  },
  {
   "ts": "2.1",
   "lvl": "기초",
   "scenario": "s4",
   "multi": 2,
   "q": "Which TWO elements belong in a tool description to make selection reliable? (Select TWO.)",
   "opts": [
    {
     "t": "The expected input format with a concrete example query.",
     "ok": true
    },
    {
     "t": "An explicit boundary against the neighboring tool (\"use search_docs for guides; use this one for product data\").",
     "ok": true
    },
    {
     "t": "The tool's full internal implementation, so the model understands how it works."
    },
    {
     "t": "A single terse sentence, since long descriptions waste tokens on every request."
    },
    {
     "t": "A note telling the model to \"choose carefully\" when multiple tools seem relevant."
    }
   ],
   "explain": {
    "good": "선택 신뢰도를 만드는 것은 판단 근거임. 입력 형식과 예시, 그리고 인접 도구와 구분되는 사용 조건이 그 근거임. 기준으로 제시된 3~4문장의 핵심 구성 요소가 이 두 가지임.",
    "wrongs": [
     "<b>C(내부 구현):</b> 내부 구현은 선택 판단과 무관함. 필요한 것은 언제 쓰는가이지 어떻게 동작하는가가 아님.",
     "<b>D(한 문장):</b> 한 줄 설명이 오선택의 가장 큰 원인임. 토큰 절약이라는 부분만 맞음.",
     "<b>E(신중히 고르라는 문구):</b> \"신중히 고르라\"는 문구는 판단 기준을 제시하지 않음. 막연한 지시로는 정밀도가 오르지 않는다는 4.1의 개념과 같은 실패임."
    ]
   },
   "principle": "설명 구성: 입력 예시와 사용 조건"
  }
 ],
 "2.2": [
  {
   "ts": "2.2",
   "lvl": "실전",
   "scenario": "s1",
   "q": "Your inventory tool returns [] both when a product genuinely has no stock records and when the database times out. The agent sometimes tells customers \"no stock\" during DB outages. Where is the fix?",
   "opts": [
    {
     "t": "In the tool's response shape: timeout → structured error (errorCategory: transient, isRetryable: true); no records → success with an empty array. Give the agent the distinction and it can retry one case and report the other.",
     "ok": true
    },
    {
     "t": "Have the agent retry every empty result three times before trusting it."
    },
    {
     "t": "Add a system-prompt rule: \"when results are empty, consider that the database may be down.\""
    },
    {
     "t": "Return the string \"unknown\" for both cases so the agent never asserts a wrong answer."
    }
   ],
   "explain": {
    "good": "빈 결과와 접근 실패는 서로 다른 사건인데 동일한 형태([])로 반환되는 것이 근본 원인임. 이 구분은 프롬프트가 아니라 도구의 응답 구조에서 만들어 주어야 함.",
    "wrongs": [
     "<b>B(항상 3회 재시도):</b> 정상적인 빈 결과까지 3회 재시도하게 됨. 재고가 없는 대부분의 상품에서 지연과 비용이 3배가 됨.",
     "<b>C(프롬프트 규칙):</b> 모델은 추측만 할 수 있음. 구분할 정보 자체가 응답에 없으므로 지시로는 해결되지 않음.",
     "<b>D(둘 다 unknown):</b> 두 경우를 여전히 같은 값으로 반환함. 재시도해야 할 경우와 그대로 보고해야 할 경우를 구분하지 못함."
    ]
   },
   "principle": "빈 결과와 실패는 응답 구조부터 분리함"
  },
  {
   "ts": "2.2",
   "lvl": "실전",
   "scenario": "s1",
   "multi": 2,
   "q": "Your order-lookup tool currently returns the string \"failed\" for every problem. Which TWO fields, added to a structured error response, let the agent make correct recovery decisions? (Select TWO.)",
   "opts": [
    {
     "t": "errorCategory distinguishing transient / validation / permission failures.",
     "ok": true
    },
    {
     "t": "An isRetryable boolean telling the agent whether a retry can possibly succeed.",
     "ok": true
    },
    {
     "t": "The full internal stack trace of the backend service for transparency."
    },
    {
     "t": "An HTTP 200 status with an empty result set, so the agent never sees scary errors."
    },
    {
     "t": "A randomized error code so the agent learns not to over-fit to specific failures."
    }
   ],
   "explain": {
    "good": "복구 판단에 필요한 정보는 두 가지임. 어떤 종류의 실패인가(범주)와 다시 시도하면 성공할 수 있는가(재시도 가능성)임. 이 둘이 있어야 재시도, 우회, 보고를 구분할 수 있음.",
    "wrongs": [
     "<b>C(스택 트레이스):</b> 백엔드 스택 트레이스는 에이전트의 판단에 쓰이지 않음. 필요한 것은 구조화된 분류이지 원시 출력이 아님.",
     "<b>D(200과 빈 결과):</b> 실패를 성공으로 표시하는 방식임. 에이전트가 재고 없음 같은 틀린 결론을 내리게 만드는 안티패턴임.",
     "<b>E(무작위 코드):</b> 무작위 코드는 정보를 없앰. 실제로 존재하지 않는 설계 방식임."
    ]
   },
   "principle": "실패 유형과 재시도 가능성이 판단 근거임"
  }
 ],
 "2.3": [
  {
   "ts": "2.3",
   "lvl": "기초",
   "scenario": "s6",
   "q": "Match tool_choice to each call site: (1) the extraction step must always emit structured output through a tool, never prose; (2) the final user-facing summary must be prose, never a tool call; (3) a general conversation step where the model should decide.",
   "opts": [
    {
     "t": "(1) any — or force the specific extraction tool; (2) none; (3) auto.",
     "ok": true
    },
    {
     "t": "(1) auto, (2) any, (3) none."
    },
    {
     "t": "All three auto, with prompt instructions stating the requirement for each step."
    },
    {
     "t": "(1) none, (2) auto, (3) any."
    }
   ],
   "explain": {
    "good": "tool_choice의 네 가지 값은 용도가 다름. auto는 모델 재량, any는 도구 호출 강제(산문 응답 금지), 특정 도구 지정은 그 도구만 호출, none은 도구 호출 금지(산문 응답 강제)임. \"반드시\"라는 요건이 붙은 지점에는 재량(auto)이 아니라 강제를 씀. 구조화된 출력(structured output)을 보장해야 하는 단계가 여기에 해당함.",
    "wrongs": [
     "<b>B(배정 반대):</b> 배정이 뒤집혔음. any를 요약 단계에 걸면 요약이 도구 호출로 나옴.",
     "<b>C(전부 auto와 프롬프트):</b> 프롬프트 지시는 확률적임. 항상 구조화된 출력이어야 한다는 요구는 tool_choice로 보장해야 함. 일반적으로는 맞지만 이 문제의 조건에서는 틀린 선택지임.",
     "<b>D(완전 반대 배정):</b> (1)에 none을 걸면 추출 도구 호출 자체가 금지됨."
    ]
   },
   "principle": "보장이 필요하면 tool_choice로 지정함"
  }
 ],
 "2.4": [
  {
   "ts": "2.4",
   "lvl": "실전",
   "scenario": "s4",
   "q": "Six developers share a Jira MCP server; each has a personal API token. One teammate committed .mcp.json with his token written inline — it is now in git history. What is the correct setup going forward?",
   "opts": [
    {
     "t": "Keep the server in project .mcp.json but reference ${JIRA_TOKEN}; each developer sets the real value in their own environment, and the leaked token gets rotated. Config stays shared, secrets stay personal.",
     "ok": true
    },
    {
     "t": "Move the whole server config into each developer's ~/.claude.json so nothing sensitive is ever committed."
    },
    {
     "t": "Add .mcp.json to .gitignore so future commits can't leak anything."
    },
    {
     "t": "Create one shared service token and commit it — simpler than managing six personal tokens."
    }
   ],
   "explain": {
    "good": "공유 파일과 개인 비밀 정보를 분리하는 방식임. 파일에는 자리표시자(${...})를 두고 값은 각자 환경변수로 설정함. 유출된 토큰 회전까지가 함께 수행할 조치임.",
    "wrongs": [
     "<b>B(전부 개인 파일로):</b> 동작은 하지만 팀 공유의 이점(신규 합류자에게 자동 적용)을 포기하게 됨. 이 위치는 개인 실험용 서버를 두는 자리임.",
     "<b>C(.gitignore):</b> .gitignore에 넣으면 팀 공유라는 목적 자체가 사라짐. 신규 합류자가 서버 설정을 받지 못함.",
     "<b>D(공유 토큰 커밋):</b> 커밋된 공유 토큰은 유출 범위를 키우고 누가 수행했는지 추적할 수 없게 만듦."
    ]
   },
   "principle": "설정은 공유하고 비밀 정보는 환경변수로 둠"
  }
 ],
 "2.5": [
  {
   "ts": "2.5",
   "lvl": "실전",
   "scenario": "s4",
   "q": "An automated refactor uses Edit to change one occurrence of a config constant, but the anchor text appears in 7 places in the file and Edit keeps failing on the non-unique match. The workflow must stay reliable. What now?",
   "opts": [
    {
     "t": "Fall back to Read the full file, apply the change in memory, and Write it back — the documented fallback when unique anchoring fails — then optionally verify with Grep.",
     "ok": true
    },
    {
     "t": "Loosen the matching so Edit applies to the first occurrence it finds."
    },
    {
     "t": "Switch to a Bash one-liner (sed) that replaces the pattern across the whole file."
    },
    {
     "t": "Use Glob to locate the right file before retrying the same Edit."
    }
   ],
   "explain": {
    "good": "Edit은 앵커 텍스트가 파일에서 유일하다는 전제 위에서 동작함. 그 전제가 성립하지 않으면 공식 대안은 Read로 전체를 읽고 Write로 다시 쓰는 것임. 7곳 중 의도한 1곳만 정확히 변경할 수 있음.",
    "wrongs": [
     "<b>B(첫 매칭 적용):</b> 첫 번째 매칭이 의도한 위치라는 보장이 없음. 7분의 1 확률에 리팩터링을 맡길 수 없음.",
     "<b>C(sed 전역 치환):</b> sed 전역 치환은 7곳을 모두 변경함. 의도한 것은 1곳임. 명령은 실행되지만 결과가 요구와 다름.",
     "<b>D(Glob 재시도):</b> 파일 위치는 이미 알고 있음. Glob은 파일을 찾는 도구이므로 단계가 맞지 않음."
    ]
   },
   "principle": "Edit 실패의 공식 대안은 Read와 Write임"
  },
  {
   "ts": "2.5",
   "lvl": "기초",
   "scenario": "s4",
   "multi": 2,
   "q": "Match the built-in tool to the job. Which TWO pairings are correct? (Select TWO.)",
   "opts": [
    {
     "t": "Finding all files whose names match *.test.tsx anywhere in the repo → Glob.",
     "ok": true
    },
    {
     "t": "Finding every file whose contents mention validateCoupon → Grep.",
     "ok": true
    },
    {
     "t": "Finding files by name pattern → Grep, since it scans the filesystem."
    },
    {
     "t": "Reading the entire repository into context first, then searching manually → Read."
    },
    {
     "t": "Locating text inside files → Glob, because globs match any string."
    }
   ],
   "explain": {
    "good": "이름과 경로 패턴은 Glob, 파일 내용 검색은 Grep임. 두 기본 제공 도구(built-in tools)를 가르는 기준은 파일의 이름을 찾는가 내용을 찾는가임.",
    "wrongs": [
     "<b>C(이름 검색에 Grep):</b> 배정이 반대임. Grep은 파일 안의 텍스트를 찾는 도구임.",
     "<b>D(전체 읽기):</b> 저장소 전체를 컨텍스트에 넣는 것은 대표적인 컨텍스트 낭비 안티패턴임. 검색 도구가 존재하는 이유임.",
     "<b>E(내용 검색에 Glob):</b> 글롭 패턴은 경로 문자열에만 적용됨. 파일 내용은 검색하지 못함."
    ]
   },
   "principle": "이름은 Glob, 내용은 Grep"
  },
  {
   "ts": "2.5",
   "lvl": "실전",
   "scenario": "s4",
   "q": "An engineer needs two things in an unfamiliar repo: (a) locate every file whose name ends in .config.ts, and (b) find every place the constant MAX_RETRIES is actually referenced. Which pairing is correct?",
   "opts": [
    {
     "t": "(a) Glob — it matches file names and paths; (b) Grep — it searches file contents.",
     "ok": true
    },
    {
     "t": "(a) Grep, because it scans the filesystem for matching files; (b) Glob, because globs can match any string including code."
    },
    {
     "t": "(a) Glob; (b) Read every .ts file in the repo and scan the contents manually."
    },
    {
     "t": "(a) Bash with a find command; (b) Bash with a grep command — built-in tools are unnecessary here."
    }
   ],
   "explain": {
    "good": "판별 기준은 간단함. 이름과 경로는 Glob, 내용은 Grep임. (a)는 파일명 패턴이므로 Glob이고, (b)는 코드 안에서 참조를 찾는 것이므로 Grep임. 두 도구의 역할을 서로 바꿔 배정하는 형태로 자주 출제됨.",
    "wrongs": [
     "<b>B(반대 배정):</b> 정확히 반대로 배정했음. 글롭 패턴은 경로 문자열에만 적용되므로 파일 내용을 검색하지 못함.",
     "<b>C(전수 읽기):</b> (a)는 맞지만 (b)에서 모든 .ts 파일을 읽는 것은 컨텍스트 낭비 안티패턴임. 검색 도구가 존재하는 이유임.",
     "<b>D(전부 Bash):</b> Bash로도 가능하지만 전용 기본 제공 도구가 있는 작업에 셸을 쓰는 것은 불필요한 우회임. 시험은 상황과 기본 제공 도구의 대응을 묻는 형태로 출제됨."
    ]
   },
   "principle": "이름은 Glob, 내용은 Grep"
  },
  {
   "ts": "2.5",
   "lvl": "기초",
   "scenario": "s2",
   "q": "Edit fails repeatedly because the anchor text appears in several places in the file. Which tool sequence resolves it?",
   "opts": [
    {
     "t": "Read the full file, apply the change in memory, then Write it back — optionally verifying with Grep.",
     "ok": true
    },
    {
     "t": "Use Glob to locate the file again, then retry Edit with the same anchor."
    },
    {
     "t": "Use Bash with sed to replace the pattern throughout the file."
    },
    {
     "t": "Use Grep to count the occurrences, then run Edit once per occurrence."
    }
   ],
   "explain": {
    "good": "Edit은 앵커 텍스트가 유일하다는 전제 위에서 동작함. 전제가 깨지면 공식 대안은 Read와 Write임. 여기서 Glob을 고르는 오답이 자주 나옴. Glob은 파일을 찾는 도구이지 파일을 수정하는 도구가 아님.",
    "wrongs": [
     "<b>B(Glob 후 재시도):</b> 파일 위치는 이미 알고 있으므로 단계가 맞지 않고, 같은 앵커로 재시도하면 같은 실패가 반복됨.",
     "<b>C(sed 전역 치환):</b> sed 전역 치환은 여러 위치를 모두 변경함. 의도한 것은 한 곳임. 명령은 실행되지만 결과가 요구와 다름.",
     "<b>D(횟수를 세고 반복 Edit):</b> 횟수를 알아도 Edit은 여전히 앵커를 유일하게 지정하지 못함."
    ]
   },
   "principle": "Edit 실패의 공식 대안은 Read와 Write임"
  }
 ],
 "3.1": [
  {
   "ts": "3.1",
   "lvl": "기초",
   "scenario": "s2",
   "q": "A convention must reach every current and future teammate automatically, with no per-person setup. Which single test reliably tells you where the file must live?",
   "opts": [
    {
     "t": "\"Is it committed to the repo?\" — project-level files (root CLAUDE.md, .claude/rules/, .claude/settings.json, .mcp.json) travel with clone/pull to everyone; anything under ~/ stays on one machine.",
     "ok": true
    },
    {
     "t": "\"Is it inside a .claude folder?\" — that folder is what Claude Code scans for configuration."
    },
    {
     "t": "\"Was it created by an admin account?\" — team-wide settings require elevated permissions."
    },
    {
     "t": "\"Does Claude load it at session start?\" — automatic loading is what makes it apply to everyone."
    }
   ],
   "explain": {
    "good": "적용 범위를 가르는 기준은 하나임. 저장소(repository)에 커밋되는가임. 커밋되면 클론과 풀을 통해 팀 전원에게 전달되고, 커밋되지 않으면 그 컴퓨터에만 남음. 이 한 줄이 사용자 레벨과 프로젝트 레벨의 혼동을 정리함.",
    "wrongs": [
     "<b>B(.claude 폴더 여부):</b> ~/.claude/도 .claude 폴더임. 적용 범위를 가르는 것은 폴더 이름이 아니라 위치(홈 폴더인가 프로젝트 폴더인가)임. 사용자 레벨과 프로젝트 레벨을 혼동하게 만드는 선택지임.",
     "<b>C(관리자 계정):</b> 권한 계정이라는 개념은 여기에 없음. 파일이 저장소에 있으면 읽히는 것이 동작 방식의 전부임.",
     "<b>D(세션 시작 로드 여부):</b> ~/.claude/CLAUDE.md도 세션 시작에 로드됨. 로드 시점과 적용 범위는 서로 다른 기준임."
    ]
   },
   "principle": "적용 범위 판별: 저장소에 커밋되는가"
  },
  {
   "ts": "3.1",
   "lvl": "실전",
   "scenario": "s2",
   "q": "Three original developers get the team's naming conventions applied in every session; the newly joined fourth developer doesn't, despite cloning the same repo. What is the most likely cause and fix?",
   "opts": [
    {
     "t": "The conventions live in the original developers' user-level ~/.claude/CLAUDE.md files (added individually long ago); move them into the repo's project-level CLAUDE.md so cloning delivers them to everyone, including future hires.",
     "ok": true
    },
    {
     "t": "The new developer's Claude Code version predates CLAUDE.md support and needs an upgrade."
    },
    {
     "t": "The new developer must run an initialization command to download and activate the team conventions."
    },
    {
     "t": "Add a CI check that rejects commits violating the naming rules, so the conventions are enforced regardless."
    }
   ],
   "explain": {
    "good": "기존 3명은 적용되고 같은 저장소를 클론한 1명만 적용되지 않는다면 그 규칙이 저장소 밖(개인 사용자 레벨)에 있다는 뜻임. 가장 단순한 설명을 먼저 확인함. 파일을 저장소로 옮기면 앞으로 합류하는 사람까지 해결됨.",
    "wrongs": [
     "<b>B(버전 문제):</b> 버전 가설은 더 복잡한 설명으로 건너뛴 것임. 같은 저장소를 클론했는데 적용되지 않는다는 사실이 이미 저장소에 파일이 없음을 가리킴.",
     "<b>C(초기화 명령):</b> 설치나 활성화 단계는 존재하지 않음. 파일이 해당 폴더에 있으면 읽히는 것이 전부임.",
     "<b>D(CI 검사):</b> CI 거부는 사후 강제임. 코드를 작성하는 시점에 규칙이 적용되지 않는 원인은 그대로 남고 개발 과정만 불편해짐."
    ]
   },
   "principle": "원인은 적용 범위임: 파일 위치부터 확인함"
  },
  {
   "ts": "3.1",
   "lvl": "기초",
   "scenario": "s2",
   "multi": 2,
   "q": "A convention must reach every current and future teammate automatically. Which TWO locations achieve that? (Select TWO.)",
   "opts": [
    {
     "t": "CLAUDE.md at the project root, committed to the repo.",
     "ok": true
    },
    {
     "t": ".claude/rules/ files with path scoping, committed to the repo.",
     "ok": true
    },
    {
     "t": "Each developer's ~/.claude/CLAUDE.md, updated via team announcement."
    },
    {
     "t": ".claude/settings.local.json, since it lives inside the project folder."
    },
    {
     "t": "A pinned message in the team chat that everyone applies manually."
    }
   ],
   "explain": {
    "good": "판별 기준은 저장소에 커밋되는가 하나임. 루트 CLAUDE.md와 .claude/rules/는 클론과 풀을 통해 전원에게 자동으로 전달됨. 앞으로 합류하는 사람까지 포함됨.",
    "wrongs": [
     "<b>C(사용자 레벨과 공지):</b> 사용자 레벨은 각자 직접 넣어야 하고 신규 합류자가 누락되는 형태임. 이 영역에서 반복해서 출제되는 오답 유도 선택지임.",
     "<b>D(settings.local.json):</b> local 설정은 프로젝트 폴더 안에 있어도 gitignore 대상임. 폴더 위치가 아니라 커밋 여부가 적용 범위를 가름.",
     "<b>E(채팅 고정 메시지):</b> 수동으로 적용하는 방식은 자동 적용이라는 요구를 충족하지 못함."
    ]
   },
   "principle": "적용 범위 판별: 저장소에 커밋되는가"
  }
 ],
 "3.2": [
  {
   "ts": "3.2",
   "lvl": "기초",
   "scenario": "s2",
   "q": "You want the team's shared /commit skill to use your own message style when you run it, without affecting anyone else. Where does your version go, and what happens when the names match?",
   "opts": [
    {
     "t": "In your personal skills folder (~/.claude/skills/) — a personal skill with the same name runs in place of the project skill, and only on your machine.",
     "ok": true
    },
    {
     "t": "In your personal skills folder with the same name, although it will not take effect because the project skill always wins a name conflict."
    },
    {
     "t": "Edit the team's project-level /commit directly — your improvements will help everyone."
    },
    {
     "t": "In the project's .claude/skills/ under a new name so it's backed up with the repo."
    }
   ],
   "explain": {
    "good": "개인 스킬 위치에 두면 본인에게만 적용. 이름이 같으면 개인 스킬이 프로젝트 스킬보다 우선 실행. 팀원의 /commit은 그대로.",
    "wrongs": [
     "<b>B(프로젝트 스킬 우선이라는 설명):</b> 우선순위가 반대. 이름이 같으면 개인 스킬이 실행됨.",
     "<b>C(팀 스킬 직접 수정):</b> 팀 전원의 실행 결과가 바뀜. 본인만 바꾼다는 조건 위반.",
     "<b>D(프로젝트 폴더에 배치):</b> 저장소에 올라가 팀 전원에게 새 스킬이 생김. 본인의 /commit은 그대로."
    ]
   },
   "principle": "개인용 변형: 개인 스킬 위치. 이름이 같으면 개인 스킬 우선"
  },
  {
   "ts": "3.2",
   "lvl": "실전",
   "scenario": "s2",
   "q": "One /migration skill both creates SQL migration files and applies them to the database, with broad tool access. Twice it applied a migration when only a draft was wanted. Its argument-hint asks for \"create|apply\" but users skip it. What is the robust fix?",
   "opts": [
    {
     "t": "Split into /migration-create and /migration-apply with separately scoped allowed-tools (create: file tools only; apply: DB execution), and have SKILL.md ask for confirmation when the argument is missing — argument-hint is a display hint, not enforcement.",
     "ok": true
    },
    {
     "t": "Mark the argument as required in argument-hint so the skill cannot run without an explicit mode."
    },
    {
     "t": "Keep one skill but add a prompt instruction: \"always confirm with the user before applying to the database.\""
    },
    {
     "t": "Remove database execution tools from the skill entirely so nothing destructive can ever run."
    }
   ],
   "explain": {
    "good": "수명, 위험도, 필요한 도구가 다른 두 작업이 한 스킬에 묶여 있는 것이 근본 원인임. 스킬을 분리하고 각각에 필요한 최소 권한만 allowed-tools로 부여하며, 인자가 없으면 SKILL.md가 확인을 요청하도록 함. 이 세 가지를 함께 적용함.",
    "wrongs": [
     "<b>B(argument-hint 필수화):</b> argument-hint는 입력을 안내하는 표시일 뿐 강제력이 없음. 필수로 지정하는 기능 자체가 없음.",
     "<b>C(프롬프트 확인 지시):</b> 데이터베이스 적용처럼 되돌릴 수 없는 작업을 확률적 지시에 맡기는 방식임. 이미 두 번 사고가 발생한 상황에서 다시 확률에 맡길 수 없음.",
     "<b>D(적용 기능 제거):</b> 적용 기능 자체가 업무 요건임. 기능 제거는 해결이 아니라 요구사항 포기임."
    ]
   },
   "principle": "원칙 ④: 위험도가 다르면 스킬을 분리함"
  },
  {
   "ts": "3.2",
   "lvl": "실전",
   "scenario": "s2",
   "multi": 2,
   "q": "A /migration skill both drafts SQL files and applies them to the database, and twice applied when only a draft was wanted. Which TWO changes make it safe? (Select TWO.)",
   "opts": [
    {
     "t": "Split it into /migration-create and /migration-apply as separate skills.",
     "ok": true
    },
    {
     "t": "Scope each skill's allowed-tools to its job — file tools only for create; DB execution only for apply.",
     "ok": true
    },
    {
     "t": "Mark the mode argument as required in argument-hint so the skill can't run without it."
    },
    {
     "t": "Keep one skill but add \"always confirm before applying\" to its instructions."
    },
    {
     "t": "Delete the apply capability entirely so nothing destructive can run."
    }
   ],
   "explain": {
    "good": "위험도가 다른 두 작업은 분리하고 각각에 최소 권한을 부여함. 이 두 조치는 함께 적용해야 함. 분리만 하고 권한을 좁히지 않으면 생성용 스킬이 여전히 데이터베이스를 변경할 수 있음.",
    "wrongs": [
     "<b>C(argument-hint 필수화):</b> argument-hint는 표시용 안내일 뿐 강제 기능이 없음.",
     "<b>D(프롬프트 확인 지시):</b> 되돌릴 수 없는 작업을 확률적 지시에 맡기는 방식임. 이미 두 번 사고가 발생한 상황에서는 부적절함.",
     "<b>E(적용 기능 삭제):</b> 적용은 업무 요건임. 기능 제거는 해결이 아니라 요구사항 포기임."
    ]
   },
   "principle": "원칙 ④: 분리와 최소 권한은 함께 적용함"
  }
 ],
 "3.3": [
  {
   "ts": "3.3",
   "lvl": "실전",
   "scenario": "s2",
   "q": "Two needs in one repo: (1) Terraform style rules must apply whenever any file under infra/ is edited; (2) a worked example for scaffolding a new API endpoint is needed only when creating one — it is noise during bug fixes in the same directory. Match the mechanisms.",
   "opts": [
    {
     "t": "(1) .claude/rules/ with paths: [\"infra/**\"] — auto-loads whenever matching files are touched; (2) an on-demand skill — loads only when invoked for that task. Path scoping cannot distinguish task type within the same directory.",
     "ok": true
    },
    {
     "t": "Both as .claude/rules/ with paths — the api/ directory pattern will load the example exactly when it's needed."
    },
    {
     "t": "Both as skills — developers invoke /terraform-style or /new-endpoint when relevant."
    },
    {
     "t": "(1) in the root CLAUDE.md, (2) as a rules file — conventions belong in CLAUDE.md and examples in rules."
    }
   ],
   "explain": {
    "good": "판단 기준은 경로 조건인가 작업 종류인가임. 특정 경로의 파일을 만질 때 항상 적용돼야 하면 .claude/rules/의 경로 스코프(path scoping)를 씀. 같은 폴더 안에서도 특정 작업에만 필요하면 호출할 때 로드되는 스킬을 씀.",
    "wrongs": [
     "<b>B(둘 다 rules):</b> paths는 그 경로를 만지는 모든 작업에 로드됨. 버그 수정 중에도 예제 코드가 함께 로드되는 것이 지문에서 지적한 문제임.",
     "<b>C(둘 다 스킬):</b> (1)의 요구는 자동 적용임. 사람이 매번 호출해야 하는 스킬은 호출을 잊는 순간 규칙이 적용되지 않음.",
     "<b>D(CLAUDE.md와 rules):</b> CLAUDE.md는 상시 로드되므로 infra를 만지지 않을 때도 컨텍스트를 차지하고, rules는 여전히 작업 종류를 구분하지 못함."
    ]
   },
   "principle": "경로 조건은 rules, 작업 종류는 스킬"
  }
 ],
 "3.4": [
  {
   "ts": "3.4",
   "lvl": "실전",
   "scenario": "s2",
   "q": "Bug: a null customer address crashes checkout. The stack trace pinpoints the exact line; a failing regression test already exists; the fix is a one-line guard clause. Teammates propose: plan mode first / fork two candidate fixes / an Explore subagent to map the module. What do you do?",
   "opts": [
    {
     "t": "Direct execution: make the one-line fix and run the already-failing regression test to confirm. Diagnosis is finished (\"stack trace pinpoints\") and verification exists — every added process re-does completed work.",
     "ok": true
    },
    {
     "t": "Plan mode first — planning before touching code is the safe default for production bugs."
    },
    {
     "t": "Fork the session to compare two candidate fixes before committing to one."
    },
    {
     "t": "Run the Explore subagent first to understand the module's dependencies before changing it."
    }
   ],
   "explain": {
    "good": "지문의 already와 existing 표현을 읽어야 함. 진단이 끝났고, 검증 수단이 있으며, 수정은 한 줄임. 남은 절차가 없는 상태에서 절차를 추가하는 선택지는 모두 오답 유도임.",
    "wrongs": [
     "<b>B(plan mode):</b> plan mode는 대규모 작업, 여러 파일 변경, 복수의 설계안이 있을 때 씀. 안전한 기본값처럼 들리지만 이 조건에서는 이미 끝난 진단을 다시 하는 비용만 추가됨.",
     "<b>C(fork로 비교):</b> 수정안이 가드 절 한 줄 하나뿐임. 비교할 대안이 없으므로 fork를 쓸 이유가 없음.",
     "<b>D(Explore 서브에이전트):</b> 스택 트레이스가 이미 원인 지점을 특정했음. 탐색은 끝난 작업임."
    ]
   },
   "principle": "already나 existing이 보이면 절차 추가는 오답임"
  },
  {
   "ts": "3.4",
   "lvl": "기초",
   "scenario": "s2",
   "multi": 2,
   "q": "Which TWO tasks warrant plan mode rather than direct execution? (Select TWO.)",
   "opts": [
    {
     "t": "A 45-file library migration where two integration approaches are both defensible.",
     "ok": true
    },
    {
     "t": "Restructuring a monolith into microservices — an architectural decision with wide impact.",
     "ok": true
    },
    {
     "t": "A one-line guard-clause fix where the stack trace already pinpoints the faulty line."
    },
    {
     "t": "Fixing a typo in an error message string."
    },
    {
     "t": "Adding a single validation check to one function with an existing failing test."
    }
   ],
   "explain": {
    "good": "plan mode를 쓸 신호는 세 가지임. 대규모 작업(여러 파일), 유효한 접근이 둘 이상, 아키텍처 결정임. 두 정답이 각각 이 신호를 포함함.",
    "wrongs": [
     "<b>C(한 줄 수정):</b> 진단이 끝났고 수정이 한 줄이면 직접 실행이 정답임. already가 보이면 절차 추가는 낭비임.",
     "<b>D(오타 수정):</b> 오타 수정에 계획 단계를 두는 것은 작업 규모에 비해 과도함.",
     "<b>E(검증 수단이 있는 단일 검사 추가):</b> 범위가 명확하고 검증 수단이 있으므로 직접 실행에 해당하는 전형적인 경우임."
    ]
   },
   "principle": "plan mode 신호 세 가지: 규모, 복수 접근, 아키텍처"
  },
  {
   "ts": "3.4",
   "lvl": "기초",
   "scenario": "s2",
   "q": "A bug's stack trace pinpoints the faulty line, a failing regression test already exists, and the fix is one line. Which action is LEAST appropriate?",
   "opts": [
    {
     "t": "Switch to plan mode to explore the module before making any change.",
     "ok": true
    },
    {
     "t": "Apply the one-line fix directly."
    },
    {
     "t": "Run the existing failing test to verify the fix."
    },
    {
     "t": "Commit the change with a message referencing the failing test."
    }
   ],
   "explain": {
    "good": "부정형 질문이며 가장 부적절한 것을 묻고 있음. 진단이 끝났고 검증 수단이 있으며 수정이 한 줄이면 plan mode는 이미 끝난 작업을 다시 하는 절차 추가임. 나머지 셋은 정상적인 흐름임.",
    "wrongs": [
     "<b>B(직접 수정):</b> 이 조건에서는 직접 실행이 정답 행동임. 부적절하지 않음.",
     "<b>C(기존 테스트 실행):</b> 이미 실패하는 테스트로 검증하는 것이 정석임.",
     "<b>D(커밋):</b> 커밋은 워크플로의 정상적인 마무리임. 질문 방향(부적절한 것)을 놓치면 고르게 되는 선택지임."
    ]
   },
   "principle": "부정형 질문: 묻는 방향을 먼저 확인함"
  }
 ],
 "3.5": [
  {
   "ts": "3.5",
   "lvl": "기초",
   "scenario": "s2",
   "q": "Five issues to deliver as feedback: three are independent renames/typos; two interact (the cache-invalidation fix depends on the TTL change). How do you structure the feedback?",
   "opts": [
    {
     "t": "Put the two interacting fixes together in one detailed message so the model reasons about their interaction; handle the three independent ones separately — one undifferentiated dump invites conflated changes, and splitting the interacting pair breaks both.",
     "ok": true
    },
    {
     "t": "Send all five in one message — fewer round-trips means less context waste."
    },
    {
     "t": "Send all five sequentially, one per message, so each fix gets full attention."
    },
    {
     "t": "Open a fresh session per issue so no fix contaminates another."
    }
   ],
   "explain": {
    "good": "기준은 문제들이 서로 얽혀 있는가임. 얽힌 문제는 함께 전달해야 상호작용을 반영해 수정하고, 독립적인 문제는 따로 전달해야 집중됨. 개수가 아니라 의존 관계가 묶음을 결정함.",
    "wrongs": [
     "<b>B(한 번에 다섯 개):</b> 상호작용을 구분하지 않고 한 번에 전달하면 독립적인 수정 셋이 얽힌 둘과 섞여 잘못 반영될 위험이 있음.",
     "<b>C(하나씩 순차):</b> 얽힌 두 문제를 순차로 나누면 첫 수정이 두 번째 수정의 전제를 깨뜨림. 이 지문에서 정확히 실패하는 방식임.",
     "<b>D(세션 5개):</b> 세션을 다섯 개 만들면 컨텍스트를 다시 만드는 비용만 다섯 배가 됨. 서로 간섭하는 문제는 애초에 없었음."
    ]
   },
   "principle": "얽힌 것은 함께, 독립적인 것은 따로"
  }
 ],
 "3.6": [
  {
   "ts": "3.6",
   "lvl": "실전",
   "scenario": "s5",
   "q": "Your CI review bot keeps re-flagging issues developers already fixed in the previous round. A teammate wrote a post-filter that suppresses findings matching prior comments' file+line signatures. Why is the alternative better — and what is it?",
   "opts": [
    {
     "t": "Include prior review findings in the review context and instruct the model to report only new or unresolved issues — it judges semantically; line-signature suppression is brittle (line numbers shift on rework) and can silently hide a real regression at the same location.",
     "ok": true
    },
    {
     "t": "The filter is the better engineering choice — deterministic suppression beats asking a model to remember."
    },
    {
     "t": "Review only at merge time instead of every commit, so there is no previous round to re-flag."
    },
    {
     "t": "Have the session that wrote the fixes re-run the review, since it already knows what was addressed."
    }
   ],
   "explain": {
    "good": "결과를 사후에 걸러 내는 대신 이전 리뷰 결과를 컨텍스트에 넣어 처음부터 다시 지적하지 않게 하는 것이 정답임. 파일과 줄 번호로 대조하는 방식은 코드가 한 줄만 밀려도 어긋나고, 같은 위치에서 새로 생긴 문제까지 함께 숨김.",
    "wrongs": [
     "<b>B(사후 제거가 낫다):</b> 결정론적이라는 표현이 판단을 끌고 가는 지점임. 작은 변화에도 깨지는 결정론적 방식은 모델의 판단보다 나쁨. 실제 회귀를 숨기는 부작용도 치명적임.",
     "<b>C(머지 시점에만 리뷰):</b> 피드백 주기를 늦춰 증상을 피하는 방식임. 커밋 단위의 빠른 피드백이라는 CI의 목적을 포기하게 됨.",
     "<b>D(수정한 세션이 재검토):</b> 수정을 수행한 세션이 스스로 검토하는 것은 4.6에서 다루는 문제임. 자신의 수정을 해결됐다고 판단하는 편향이 더해짐."
    ]
   },
   "principle": "사후에 걸러 내지 말고 컨텍스트로 예방함"
  },
  {
   "ts": "3.6",
   "lvl": "실전",
   "scenario": "s5",
   "q": "Your CI review step must run unattended and emit machine-parseable output. Which command actually works?",
   "opts": [
    {
     "t": "claude -p \"Review this diff for security issues\" --output-format json --json-schema review-schema.json",
     "ok": true
    },
    {
     "t": "CLAUDE_HEADLESS=true claude \"Review this diff for security issues\" --format json"
    },
    {
     "t": "claude --batch review-requests.txt --output json --no-interactive"
    },
    {
     "t": "claude \"Review this diff for security issues\" --output-format json"
    }
   ],
   "explain": {
    "good": "실제로 존재하는 것은 -p(비대화형 실행), --output-format json, --json-schema 세 가지 조합임. 나머지는 실제로 없는 옵션임. 시험에서는 이런 명령이 설명 없이 제시되므로 존재하지 않는 옵션을 지워 나가는 것이 정답률을 결정함.",
    "wrongs": [
     "<b>B(CLAUDE_HEADLESS):</b> CLAUDE_HEADLESS 환경변수는 존재하지 않음. 비대화형 실행은 -p로 지정함.",
     "<b>C(--batch):</b> --batch라는 CLI 옵션은 없음. 배치는 Message Batches API의 기능이며 Claude Code 명령이 아님.",
     "<b>D(-p 누락):</b> 옵션 자체는 실제로 있지만 -p가 빠졌음. CI에서 대화형으로 실행되어 입력을 기다리며 멈춤."
    ]
   },
   "principle": "실제 존재하는 옵션 세 가지, 나머지는 소거"
  }
 ],
 "4.1": [
  {
   "ts": "4.1",
   "lvl": "실전",
   "scenario": "s5",
   "q": "Review-bot false positives run at 40%. Team constraint: findings must NOT be suppressed before humans see them. The measured bottleneck is the time developers spend investigating each finding. Which lever fits?",
   "opts": [
    {
     "t": "Have the model attach inline reasoning and a confidence level to every finding, so reviewers triage in seconds (skim low-confidence, dig into high) — it respects the no-suppression rule and attacks the actual bottleneck.",
     "ok": true
    },
    {
     "t": "Build a signature-based suppressor that drops findings matching known false-positive patterns."
    },
    {
     "t": "Add the instruction \"only report findings you are highly confident about.\""
    },
    {
     "t": "Temporarily disable the highest-FP categories until their prompts improve."
    }
   ],
   "explain": {
    "good": "제약(지적을 사람이 보기 전에 제거하지 않음)과 병목(지적마다 조사에 드는 시간)을 동시에 충족하는 선택지를 골라야 함. 근거와 확신도를 지적마다 함께 표시하면 검토 속도가 올라가고 아무것도 숨기지 않음.",
    "wrongs": [
     "<b>B(패턴 기반 자동 제거):</b> 사람이 보기 전에 제거하지 말라는 제약을 정면으로 위반함. 다른 상황에서는 유효할 수 있으나 이 지문에서는 탈락함.",
     "<b>C(높은 확신만 보고):</b> 확신이 높은 것만 보고하라는 막연한 지시는 정밀도를 올리지 못함. 구체적인 기준이나 근거 표시가 필요하다는 4.1의 개념 그대로임.",
     "<b>D(카테고리 비활성화):</b> 카테고리 비활성화는 유효한 수단이지만 사람이 모두 확인해야 한다는 이 팀의 제약과 충돌함. 조건이 정답을 바꾸는 대표적인 경우임."
    ]
   },
   "principle": "원칙 ②: 측정된 병목을 직접 겨냥함"
  }
 ],
 "4.2": [
  {
   "ts": "4.2",
   "lvl": "실전",
   "scenario": "s1",
   "q": "Support accuracy drops to 58% specifically on multi-concern messages (\"refund order A, also update my address, and reset my password\") — the failure form is consistent: the agent answers the first concern and drops the rest. Proposals: a separate decomposition model / a self-critique pass / few-shot examples demonstrating decompose → sequence tools → address all. Pick one.",
   "opts": [
    {
     "t": "Few-shot — the failure has one predictable shape, so 2-3 examples demonstrating the full reasoning and tool sequence for multi-concern messages teach the pattern directly.",
     "ok": true
    },
    {
     "t": "The separate decomposition model — splitting concerns before the agent sees them removes the failure mode entirely."
    },
    {
     "t": "The self-critique pass — the agent reviews its own draft and catches whatever it missed."
    },
    {
     "t": "A strict output schema with one required field per concern, so incomplete answers fail validation."
    }
   ],
   "explain": {
    "good": "판별 기준은 실패 형태가 일정한가임. 일정하면 퓨샷 예시, 누락되는 항목이 매번 다르면 자기평가(self-critique)임. 첫 요청만 답하고 나머지를 빠뜨리는 것은 형태가 완전히 일정하므로 예시 2~3개로 교정됨.",
    "wrongs": [
     "<b>B(분해 전용 모델):</b> 전처리 파이프라인을 새로 만드는 것은 과잉 설계이며, 요청을 나누면 요청 사이의 맥락(같은 주문에 대한 이야기인지)이 끊어짐.",
     "<b>C(자기평가 단계):</b> 자기평가도 동작하지만 응답마다 비용이 두 배가 됨. 실패가 이렇게 예측 가능하면 예시가 더 저렴하고 직접적임.",
     "<b>D(엄격한 스키마):</b> 스키마는 형식을 검사할 뿐 행동을 학습시키지 않음. 요청이 몇 개인지 파악하지 못하는 것이 문제이므로 필수 필드라는 방식이 성립하지 않음."
    ]
   },
   "principle": "실패 형태가 일정하면 예시로 교정함"
  },
  {
   "ts": "4.2",
   "lvl": "실전",
   "scenario": "s1",
   "q": "Draft replies each omit something different — a policy citation here, a timeline there, next steps elsewhere; no consistent pattern. You already added five few-shot examples and the metric barely moved. What now?",
   "opts": [
    {
     "t": "Add a self-critique (evaluator-optimizer) pass: the model checks its own draft against a completeness checklist (all concerns? policy? timeline? next steps?) and revises — variable gaps need per-case evaluation, not more fixed exemplars.",
     "ok": true
    },
    {
     "t": "Double the few-shot set to ten examples covering more omission types."
    },
    {
     "t": "Send every draft to a second independent Claude instance for review before it goes out."
    },
    {
     "t": "Enforce a response template with mandatory section headers so nothing can be skipped."
    }
   ],
   "explain": {
    "good": "퓨샷 예시가 효과가 없었다는 지문 자체가 근거임. 누락되는 항목이 사례마다 달라 고정된 예시로는 덮이지 않음. 누락 형태가 가변적이면 체크리스트를 기준으로 스스로 검토하고 수정하는 평가자·개선자(evaluator-optimizer) 구성이 정답임.",
    "wrongs": [
     "<b>B(예시 10개로 증량):</b> 이미 5개로 효과가 없었음. 예시는 보여 준 형태만 학습시키는데 누락 형태가 매번 다름. 같은 방향으로 늘리면 결과도 같음.",
     "<b>C(독립 인스턴스 검토):</b> 독립 인스턴스는 생성 과정에서 굳어진 판단을 깨야 할 때 쓰는 수단임(4.6: 생성한 세션의 자기 검토 한계). 단순 누락은 같은 세션에서도 확인되므로 자기평가로 충분하고 비용도 적음.",
     "<b>D(필수 섹션 템플릿):</b> 템플릿 제목이 있어도 내용이 채워졌는지는 보장되지 않음. 빈 섹션이나 형식적인 한 줄로도 통과됨."
    ]
   },
   "principle": "누락 형태가 가변적이면 자기평가로"
  }
 ],
 "4.3": [
  {
   "ts": "4.3",
   "lvl": "실전",
   "scenario": "s6",
   "q": "Two extraction defects in one invoice pipeline: (1) some invoices lack a PO number and the model fabricates one; (2) the product-type field sometimes receives documents fitting no category, and the model force-picks the nearest enum value. Give each its fix.",
   "opts": [
    {
     "t": "(1) Make po_number nullable so absence maps to null — a required field forces fabrication; (2) extend the enum with \"unclear\" plus \"other\" with a detail string — absence-of-information and category-mismatch are different defects with different cures.",
     "ok": true
    },
    {
     "t": "Make both fields nullable — null is the universal safe value for anything uncertain."
    },
    {
     "t": "Extend both fields' enums with \"unknown\" values so the model always has an honest option."
    },
    {
     "t": "Add a retry loop with validation feedback so the model corrects both defect types itself."
    }
   ],
   "explain": {
    "good": "구분 기준은 값이 원본 문서에 있는가임. 값이 없으면 nullable로 두어 지어내지 않게 하고, 값은 있는데 분류 목록에 맞지 않으면 enum을 확장함(unclear, other와 상세 문자열). 두 처방을 서로 바꿔 적용하면 안 됨.",
    "wrongs": [
     "<b>B(둘 다 nullable):</b> 제품 유형은 문서에 값이 있는데 분류가 맞지 않는 경우임. null로 비우면 있는 정보를 버리게 됨.",
     "<b>C(둘 다 enum 확장):</b> PO 번호는 enum 필드가 아님. 자유 입력 필드에 값이 없는 경우의 처방은 unknown 항목 추가가 아니라 nullable임.",
     "<b>D(재시도):</b> 재시도는 정보가 있을 때만 유효함. 문서에 없는 PO 번호는 몇 번을 다시 물어도 생기지 않음(4.4: 재시도는 고칠 정보가 원본에 있을 때만 유효함)."
    ]
   },
   "principle": "없는 값은 null, 맞지 않는 분류는 unclear"
  },
  {
   "ts": "4.3",
   "lvl": "기초",
   "scenario": "s6",
   "multi": 2,
   "q": "Which TWO schema-design moves prevent the model from fabricating or force-fitting values? (Select TWO.)",
   "opts": [
    {
     "t": "Make fields that may be absent from the source nullable instead of required.",
     "ok": true
    },
    {
     "t": "Extend category enums with \"unclear\" and \"other\" plus a detail string field.",
     "ok": true
    },
    {
     "t": "Enable strict mode so every output exactly matches the schema."
    },
    {
     "t": "Mark every field required so the model never leaves anything blank."
    },
    {
     "t": "Add a retry loop so wrong values get corrected on the second pass."
    }
   ],
   "explain": {
    "good": "값을 지어내는 원인은 두 가지임. 없는 값을 required가 강요하는 것(해법은 nullable)과 맞지 않는 분류를 enum이 강요하는 것(해법은 unclear와 other 추가)임. 각각의 대안을 열어 주는 것이 정답 두 항목임.",
    "wrongs": [
     "<b>C(strict 모드):</b> strict는 형식만 보장함. 지어낸 값도 형식이 맞으면 통과됨.",
     "<b>D(전부 required):</b> 모든 필드를 required로 두는 것이 값을 지어내게 만드는 원인임. 정답과 정반대 방향임.",
     "<b>E(재시도 루프):</b> 정보가 원본에 없으면 재시도는 효과가 없음. 재시도는 고칠 정보가 있을 때만 유효하다는 4.4의 판별 기준과 동일함."
    ]
   },
   "principle": "없는 값은 null, 맞지 않는 분류는 unclear"
  },
  {
   "ts": "4.3",
   "lvl": "기초",
   "scenario": "s6",
   "q": "A contract-extraction schema has two problem fields: signing_date (many contracts genuinely have no date printed) and jurisdiction (documents often name a region outside your enum list). Which fix pairing is correct?",
   "opts": [
    {
     "t": "signing_date → nullable; jurisdiction → extend the enum with \"other\" plus a detail string.",
     "ok": true
    },
    {
     "t": "Both → nullable, since both fields are unreliable."
    },
    {
     "t": "Both → extend the enums, so the model always has an honest option to pick."
    },
    {
     "t": "signing_date → extend the enum with \"unknown\"; jurisdiction → nullable."
    }
   ],
   "explain": {
    "good": "값이 문서에 없으면 nullable로 두어 지어내지 않게 하고, 값은 있는데 분류 목록에 맞지 않으면 enum을 확장함. 한 문장으로 정리하면 없는 값은 null, 맞지 않는 분류는 unclear 또는 other임.",
    "wrongs": [
     "<b>B(둘 다 nullable):</b> jurisdiction은 문서에 값이 있음. null로 비우면 있는 정보를 버리게 됨.",
     "<b>C(둘 다 enum 확장):</b> signing_date는 enum 필드가 아님. 자유 입력 필드에 값이 없는 경우의 처방은 nullable임.",
     "<b>D(반대 배정):</b> 두 처방을 서로 바꿔 적용한 형태임."
    ]
   },
   "principle": "없는 값은 null, 맞지 않는 분류는 unclear"
  }
 ],
 "4.4": [
  {
   "ts": "4.4",
   "lvl": "실전",
   "scenario": "s6",
   "q": "Failed extractions split into two groups: A failed validation with semantic errors (\"line items don't sum to the stated total\"); B failed because the referenced contract annex is not in the provided document. Design the retry strategy.",
   "opts": [
    {
     "t": "Group A: retry with the original document, the failed extraction, and the specific validation errors appended — that feedback guides correction. Group B: no retry — the information is absent from the source; fetch the annex or mark the fields null.",
     "ok": true
    },
    {
     "t": "Retry both groups up to three times — most transient extraction failures resolve on a second pass."
    },
    {
     "t": "Route both groups straight to human review — failed extractions are exactly what reviewers are for."
    },
    {
     "t": "Retry both with the instruction \"be more careful and double-check your numbers this time.\""
    }
   ],
   "explain": {
    "good": "재시도 여부를 가르는 기준은 고칠 정보가 원본에 있는가 하나임. 합계 오류는 문서 안에 근거가 있으므로 검증 오류 내용을 함께 붙여 재시도함. 원본에 없는 정보는 몇 번을 재시도해도 생기지 않으므로 문서를 보충하거나 해당 필드를 null로 둠.",
    "wrongs": [
     "<b>B(둘 다 3회 재시도):</b> B그룹은 3회가 아니라 30회를 시도해도 결과가 같음. 없는 정보는 재시도로 만들어지지 않고 비용만 3배가 됨.",
     "<b>C(둘 다 사람 검토):</b> A그룹은 기계적으로 교정 가능한 유형임. 전부 사람에게 보내면 검토자가 병목이 됨.",
     "<b>D(더 주의하라는 지시):</b> 무엇이 틀렸는지 알려 주지 않는 재시도임. 같은 실수를 반복함."
    ]
   },
   "principle": "재시도는 정보가 있을 때만 유효함"
  }
 ],
 "4.5": [
  {
   "ts": "4.5",
   "lvl": "실전",
   "scenario": "s5",
   "q": "Cost review meeting: the nightly repo-wide audit already runs on the Batches API (fine). A teammate proposes moving pre-merge PR checks there too: \"50% cheaper, and results usually come back within the hour.\" What decides this?",
   "opts": [
    {
     "t": "Pre-merge checks are blocking — the Batches API has no latency SLA and can take up to 24 hours; \"usually an hour\" is an observation, not a guarantee. Blocking workloads stay on the synchronous API regardless of the discount.",
     "ok": true
    },
    {
     "t": "Move them — a typical one-hour turnaround is acceptable for most PRs, and the savings compound."
    },
    {
     "t": "Move them, but auto-merge any PR whose batch result hasn't arrived within four hours."
    },
    {
     "t": "Don't move them — the Batches API cannot accept requests that include tool definitions."
    }
   ],
   "explain": {
    "good": "판단 기준은 가격이 아니라 블로킹 작업인가임. 머지가 검사 결과를 기다려야 하면 상한이 없는 지연(최대 24시간, 지연 SLA 없음)은 요건을 충족하지 못함. 메시지 배치 API(Message Batches API)는 기다리는 사람이 없는 작업에만 씀.",
    "wrongs": [
     "<b>B(보통 한 시간):</b> usually라는 표현이 판단을 흐리는 지점임. 평균 소요 시간은 보장이 아님. 드물게 하루가 걸리면 팀 전체의 머지가 멈춤.",
     "<b>C(4시간 후 자동 머지):</b> 시간 초과 시 자동 머지는 검사가 끝나지 않은 코드를 통과시키는 것임. 검사 자체를 무효화함.",
     "<b>D(도구 정의 불가):</b> 결론 방향은 맞지만 근거가 틀렸음. 배치는 도구 정의는 지원함. 지원하지 않는 것은 요청 중간의 도구 실행 왕복임."
    ]
   },
   "principle": "블로킹 요건이 가격보다 우선함"
  },
  {
   "ts": "4.5",
   "lvl": "기초",
   "scenario": "s5",
   "q": "Why can a code-review workflow that iteratively requests files (ask for a file → receive it → continue analysis) NOT run inside a single Batches API request?",
   "opts": [
    {
     "t": "Batch processing is submit → wait → collect: there is no channel to return tool results mid-request, so a multi-turn tool-execution loop cannot happen inside one request. Tool definitions are accepted; the loop is what's impossible.",
     "ok": true
    },
    {
     "t": "The Batches API rejects any request that contains tool definitions."
    },
    {
     "t": "Batch requests are limited to 24 hours, which is too short for iterative file analysis."
    },
    {
     "t": "Batch results come back in random order, so the loop's steps would be scrambled."
    }
   ],
   "explain": {
    "good": "배치 처리는 제출, 대기, 회수 순서로 진행되며 그 사이에 개입할 방법이 없음. 이것이 근본 제약임. 도구를 정의하는 것은 데이터이므로 문제가 없지만, 결과를 돌려주고 이어서 진행하는 왕복은 성립하지 않음.",
    "wrongs": [
     "<b>B(도구 정의 거부):</b> 도구 정의는 지원됨. 정의(데이터)와 실행 루프(왕복)를 구분해야 함.",
     "<b>C(24시간 제한):</b> 24시간은 짧아서가 아니라 길어서 블로킹 작업에 맞지 않는 속성임. 그리고 처리 시간은 근본 원인이 아님.",
     "<b>D(결과 순서):</b> 결과 순서가 보장되지 않는 것은 사실이지만 여러 요청 사이의 이야기임. 한 요청 안에서 루프가 불가능한 이유와는 무관함."
    ]
   },
   "principle": "배치의 근본 제약은 왕복이 없다는 것임"
  },
  {
   "ts": "4.5",
   "lvl": "기초",
   "scenario": "s5",
   "multi": 2,
   "q": "Which TWO workloads are appropriate for the Message Batches API? (Select TWO.)",
   "opts": [
    {
     "t": "A nightly audit that reviews the day's merged changes and files a morning report.",
     "ok": true
    },
    {
     "t": "A weekly compliance scan across the entire document archive.",
     "ok": true
    },
    {
     "t": "Pre-merge PR checks that developers wait on before merging."
    },
    {
     "t": "An interactive support conversation with a customer."
    },
    {
     "t": "A code-review workflow that iteratively requests files mid-analysis (tool loop)."
    }
   ],
   "explain": {
    "good": "배치에 적합한 작업은 결과를 기다리는 사람이 없고 지연을 허용하는 작업임. 야간 감사와 주간 스캔은 결과가 언제 오든 기다리는 사람이 없으므로 50% 절감을 그대로 얻을 수 있음.",
    "wrongs": [
     "<b>C(머지 전 검사):</b> 머지 대기는 블로킹 작업임. SLA가 없는 최대 24시간에 팀 작업을 맡길 수 없음. 보통 한 시간이라는 관찰은 보장이 아님.",
     "<b>D(실시간 대화):</b> 실시간 대화는 동기 API를 쓰는 대표적인 경우임.",
     "<b>E(도구 루프):</b> 배치는 제출과 회수 사이에 개입할 수 없음. 요청 중간의 도구 왕복이 성립하지 않음."
    ]
   },
   "principle": "블로킹은 동기 API, 나머지는 배치"
  },
  {
   "ts": "4.5",
   "lvl": "기초",
   "scenario": "s5",
   "q": "Which statement about the Message Batches API is FALSE?",
   "opts": [
    {
     "t": "Batch requests cannot include tool definitions.",
     "ok": true
    },
    {
     "t": "Batch processing offers roughly 50% cost savings."
    },
    {
     "t": "Processing can take up to 24 hours with no latency SLA."
    },
    {
     "t": "Within a single batch request, results from tools that your own application executes cannot be sent back so that the request continues."
    }
   ],
   "explain": {
    "good": "부정형 질문이며 틀린 설명을 고르는 문제임. 도구 정의는 데이터이므로 배치 요청에 포함할 수 있음. 불가능한 것은 도구를 실행해 결과를 돌려받고 이어 가는 왕복임. 정의와 실행 루프는 서로 다름.",
    "wrongs": [
     "<b>B(50% 절감):</b> 50% 절감은 사실임.",
     "<b>C(최대 24시간):</b> 최대 24시간이고 지연 SLA가 없다는 것도 사실임. 블로킹 워크플로에 쓸 수 없는 이유임.",
     "<b>D(내 애플리케이션의 도구 결과 전달 불가):</b> 내 애플리케이션이 실행하는 도구의 결과를 요청 중간에 돌려줄 수 없다는 것은 사실임. Anthropic 서버에서 실행하는 도구는 배치에서도 동작함. A는 정의에 대한 서술이라 거짓, D는 결과 전달에 대한 서술이라 참임."
    ]
   },
   "principle": "정의는 가능하고 실행 루프는 불가능함"
  }
 ],
 "4.6": [
  {
   "ts": "4.6",
   "lvl": "실전",
   "scenario": "s5",
   "q": "The session that generated a caching layer reviewed its own code and concluded \"the eviction logic is correct\" — production proves otherwise. Yet last week, a self-critique pass genuinely fixed your incomplete-reply problem. Why the difference, and what now for the cache bug?",
   "opts": [
    {
     "t": "Self-critique catches omissions (checklist gaps a model can see in its own draft), but a generator that already rationalized a design decision repeats the same blind spot when re-reading it; give the eviction logic to a fresh independent instance that never saw the generation reasoning.",
     "ok": true
    },
    {
     "t": "Run the same session's self-review again with a stronger prompt: \"assume the eviction logic is wrong and prove it.\""
    },
    {
     "t": "Run the generation three times and take a majority vote on whether the eviction logic is correct."
    },
    {
     "t": "Only a human reviewer can catch this class of bug — schedule a manual audit."
    }
   ],
   "explain": {
    "good": "두 경우의 차이가 자주 출제됨. 빠뜨린 항목은 같은 세션에서도 확인되므로 자기평가로 찾을 수 있지만, 이미 근거를 세워 내린 결론은 같은 컨텍스트에서 다시 읽어도 같은 판단이 반복됨. 생성 과정을 보지 않은 별도 인스턴스가 필요함.",
    "wrongs": [
     "<b>B(같은 세션에 강한 프롬프트):</b> 프롬프트를 강하게 써도 생성 시의 추론이 컨텍스트에 남아 있는 한 기존 판단을 확인하는 방향으로 기울어짐.",
     "<b>C(3회 다수결):</b> 같은 세션이 내는 세 번의 판단이므로 비용만 세 배가 되고 편향은 제거되지 않음.",
     "<b>D(사람만 가능):</b> 별도의 Claude 인스턴스로 찾을 수 있는 유형임. 사람 전용으로 올리면 검토가 병목이 됨."
    ]
   },
   "principle": "누락은 자기평가, 굳어진 결론은 별도 인스턴스"
  },
  {
   "ts": "4.6",
   "lvl": "기초",
   "scenario": "s5",
   "multi": 2,
   "q": "Which TWO practices make automated code review reliably catch subtle issues? (Select TWO.)",
   "opts": [
    {
     "t": "Review with a fresh independent instance that never saw the generation reasoning.",
     "ok": true
    },
    {
     "t": "Split large reviews into per-file focused passes plus a separate cross-file integration pass.",
     "ok": true
    },
    {
     "t": "Instruct the generating session to self-review with \"assume your code is wrong.\""
    },
    {
     "t": "Run the same review three times and take a majority vote."
    },
    {
     "t": "Switch to a larger model with a bigger context window for single-pass review."
    }
   ],
   "explain": {
    "good": "신뢰도를 높이는 기준은 두 가지임. 누가 검토하는가(생성 과정을 보지 않은 별도 인스턴스)와 어떻게 검토하는가(파일별 집중 검토와 별도의 통합 검토)임. 자주 나오는 오답 세 가지(같은 세션의 자기 검토, 다수결, 더 큰 모델)와 정확히 대비됨.",
    "wrongs": [
     "<b>C(같은 세션 자기 검토):</b> 프롬프트를 강하게 써도 생성 컨텍스트에서 오는 편향은 남음. 같은 세션의 한계임.",
     "<b>D(3회 다수결):</b> 같은 방식의 검토를 세 번 하면 비용만 세 배가 되고 편향은 제거되지 않음.",
     "<b>E(더 큰 모델):</b> 모델 크기는 주의가 분산되는 문제의 해법이 아님. 검토를 나누는 구조가 해법임."
    ]
   },
   "principle": "별도 인스턴스와 검토 단계 분리"
  }
 ],
 "5.1": [
  {
   "ts": "5.1",
   "lvl": "기초",
   "scenario": "s3",
   "q": "You are aggregating five subagent reports (~90K tokens) into one synthesis input. Where do the key-findings summaries go, and why?",
   "opts": [
    {
     "t": "At the beginning of the input — with critical items echoed at the end and explicit section headers throughout — because models process the start and end of long inputs reliably but tend to drop the middle.",
     "ok": true
    },
    {
     "t": "Distributed evenly through the input so every section gets equal attention."
    },
    {
     "t": "At the end only, since the model reads sequentially and remembers the most recent text best."
    },
    {
     "t": "Position doesn't matter if section headers are clear; structure substitutes for placement."
    }
   ],
   "explain": {
    "good": "긴 입력에서는 중간에 놓인 내용이 누락될 위험이 큼(lost in the middle). 핵심 요약은 앞에 배치하고, 중요한 항목은 끝에서 한 번 더 반복하며, 구간마다 섹션 제목을 붙이는 것이 함께 적용할 조치임.",
    "wrongs": [
     "<b>B(고르게 분산):</b> 고르게 분산하면 매번 어떤 내용이 중간에 놓이게 됨. 위치에 따른 누락을 피하는 방법이 아님.",
     "<b>C(끝에만 배치):</b> 끝에 두는 것만으로는 부족함. 앞부분의 반영이 가장 강하며 앞과 끝을 함께 쓰는 것이 정석임.",
     "<b>D(헤더로 대체):</b> 섹션 제목은 보조 수단임. 구조가 위치에 따른 누락을 대체하지 못하며 이 현상은 실증된 것임."
    ]
   },
   "principle": "앞과 끝을 함께 사용함"
  },
  {
   "ts": "5.1",
   "lvl": "실전",
   "scenario": "s1",
   "q": "A 22-turn refund case: early turns established $847.50 and a March 15 deadline; by turn 20 the agent writes \"the refund discussed earlier.\" Logs show periodic summarization compressed the numbers into prose. Fix it without unbounded context growth.",
   "opts": [
    {
     "t": "Extract transactional facts (amounts, dates, order IDs, statuses) into a persistent case-facts block that rides alongside every summarized context — summaries keep shrinking prose, but the facts block preserves exact values.",
     "ok": true
    },
    {
     "t": "Disable summarization for refund cases and keep the full conversation history."
    },
    {
     "t": "Rewrite the summarization prompt: \"never lose numerical values when summarizing.\""
    },
    {
     "t": "Add a database-lookup tool so the agent can re-fetch any figure it has forgotten."
    }
   ],
   "explain": {
    "good": "요약은 손실 압축이므로 금액과 날짜 같은 값이 먼저 부정확해짐. 처방은 요약 지시를 고치는 것이 아니라 손실되면 안 되는 값을 구조화해 따로 싣는 것임. 이것이 사건 사실 블록(case facts block)임.",
    "wrongs": [
     "<b>B(요약 비활성화):</b> 컨텍스트를 무한히 늘리지 말라는 제약을 정면으로 위반함. 22턴이 40턴이 되면 같은 한계에 도달함.",
     "<b>C(요약 프롬프트 수정):</b> 프롬프트 지시는 확률적임. 압축을 여러 번 거치면 결국 값이 누락됨. 보존은 구조로 보장해야 함.",
     "<b>D(데이터베이스 조회 도구):</b> 대화 중에 합의된 금액과 기한은 데이터베이스에 없음. 대화에서 만들어진 사실은 대화 쪽에서 보존해야 함. 새 도구를 추가하는 방식이기도 함."
    ]
   },
   "principle": "요약은 압축이고 사실은 따로 보존함"
  },
  {
   "ts": "5.1",
   "lvl": "실전",
   "scenario": "s1",
   "multi": 2,
   "q": "A 20-turn refund case keeps losing the exact amount and deadline established early on. Context cannot grow unboundedly. Which TWO mechanisms preserve the facts? (Select TWO.)",
   "opts": [
    {
     "t": "Extract transactional facts into a persistent case-facts block that is excluded from summarization and included every turn.",
     "ok": true
    },
    {
     "t": "Trim verbose tool outputs to the few decision-relevant fields before they enter context.",
     "ok": true
    },
    {
     "t": "Add \"never lose numerical values\" to the summarization prompt."
    },
    {
     "t": "Disable summarization and keep the full conversation history."
    },
    {
     "t": "Add a database-lookup tool so forgotten figures can be re-fetched."
    }
   ],
   "explain": {
    "good": "보존은 지시가 아니라 구조로 함. 손실되면 안 되는 값은 요약에서 제외한 별도 블록에 두고, 애초에 쌓이지 않아도 되는 내용은 도구 결과를 정리해 줄임. 들어오는 쪽과 압축되는 쪽을 함께 처리하는 두 항목임.",
    "wrongs": [
     "<b>C(요약 프롬프트 지시):</b> 프롬프트 지시는 확률적임. 압축을 여러 번 거치면 결국 값이 누락됨.",
     "<b>D(요약 비활성화):</b> 컨텍스트를 무한히 늘리지 말라는 제약을 정면으로 위반함. 40턴이 되면 같은 한계에 도달함.",
     "<b>E(데이터베이스 조회):</b> 대화 중에 합의된 금액과 기한은 데이터베이스에 없음. 대화에서 만들어진 사실은 대화 쪽에서 보존해야 함."
    ]
   },
   "principle": "구조로 보존함: 별도 블록과 결과 정리"
  }
 ],
 "5.2": [
  {
   "ts": "5.2",
   "lvl": "실전",
   "scenario": "s1",
   "q": "First message: \"Change my shipping address — and I want a human agent, not a bot.\" Address changes are your agent's single most reliable operation. The agent replies \"I can fix that right away!\" and proceeds. Evaluate this behavior.",
   "opts": [
    {
     "t": "Wrong — an explicit request for a human is honored immediately, without attempting resolution first; the agent's capability at the task does not override the customer's stated preference.",
     "ok": true
    },
    {
     "t": "Correct — resolving simple requests first and offering a human afterward gives the fastest outcome."
    },
    {
     "t": "Correct — escalation is designed for complex cases, and this is the simplest case there is."
    },
    {
     "t": "Partially correct — it should process the change while simultaneously queueing the human handoff."
    }
   ],
   "explain": {
    "good": "명시적인 요청은 해석이 필요 없는 사건이므로 즉시 수용하는 것이 유일한 정답임. 처리하기 쉬운 작업이라는 사실은 고객의 의사를 대신할 근거가 되지 못함.",
    "wrongs": [
     "<b>B(먼저 해결 후 연결):</b> 먼저 해결한다는 판단이 자주 선택되는 오답임. 시스템 효율을 근거로 고객의 의사를 무시하는 설계임.",
     "<b>C(복잡한 경우만 에스컬레이션):</b> 에스컬레이션 조건은 복잡성만이 아님. 명시적 요청과 정책 공백은 난이도와 무관하게 조건에 해당함.",
     "<b>D(동시 처리):</b> 절충처럼 보이지만 봇이 처리를 시작한 시점에 이미 고객의 의사가 무시됐음."
    ]
   },
   "principle": "명시적 요청이 처리 능력과 효율보다 우선함"
  },
  {
   "ts": "5.2",
   "lvl": "기초",
   "scenario": "s1",
   "q": "A customer asks for competitor price-matching. The policy document says nothing about price matching at all. The agent should:",
   "opts": [
    {
     "t": "Escalate — policy silence or ambiguity on the specific request is an escalation trigger; the agent must not improvise policy in either direction.",
     "ok": true
    },
    {
     "t": "Politely decline — anything not in the policy is by definition not offered."
    },
    {
     "t": "Approve a small match using judgment — customer retention is worth more than the difference."
    },
    {
     "t": "Check the customer's sentiment score first and escalate only if frustration is high."
    }
   ],
   "explain": {
    "good": "정책에 해당 조항이 없으면 에이전트가 답을 만들 권한이 없는 영역임. 거절도 승인도 모두 정책을 새로 만드는 행위이므로 상위로 올리는 것만 정답임.",
    "wrongs": [
     "<b>B(거절):</b> 조항이 없으므로 제공하지 않는다는 판단은 정책을 새로 만드는 것임. 회사가 아직 결정하지 않은 사안일 수 있음.",
     "<b>C(재량 승인):</b> 승인 방향으로 정책을 새로 만드는 것임. 전례가 생겨 다음 고객부터 사실상 정책이 됨.",
     "<b>D(감정 점수 확인):</b> 감정 점수는 간접 지표임. 에스컬레이션 판단의 근거로 신뢰할 수 없음. 조건은 사건(요청, 정책 공백, 규칙)이지 추정값이 아님."
    ]
   },
   "principle": "정책에 조항이 없으면 상위로 올림"
  },
  {
   "ts": "5.2",
   "lvl": "기초",
   "scenario": "s1",
   "multi": 2,
   "q": "Which TWO are legitimate escalation triggers for a support agent? (Select TWO.)",
   "opts": [
    {
     "t": "The customer explicitly asks for a human agent.",
     "ok": true
    },
    {
     "t": "The policy documentation is silent on the customer's specific request.",
     "ok": true
    },
    {
     "t": "The sentiment-analysis score crosses the frustration threshold."
    },
    {
     "t": "The conversation has exceeded ten turns."
    },
    {
     "t": "The model's self-reported confidence drops below 60%."
    }
   ],
   "explain": {
    "good": "정당한 에스컬레이션 조건은 해석이 필요 없는 사건임. 명시적 요청과 정책 공백이 그것임. 나머지 셋은 모두 간접 지표(추정값)이므로 신뢰할 수 없음. 이 대비가 5.2의 핵심임.",
    "wrongs": [
     "<b>C(감정 점수):</b> 감정 점수는 추정값임. 화가 난 고객이 곧 복잡한 사건인 것은 아님.",
     "<b>D(턴 수):</b> 턴 수는 임의의 기준임. 대화가 길다고 해결되지 않는 것도, 짧다고 해결되는 것도 아님.",
     "<b>E(자기보고 신뢰도):</b> 자기보고 신뢰도는 보정 전에는 신뢰할 수 없음. 어려운 사건일수록 과도하게 높게 나옴."
    ]
   },
   "principle": "조건은 사건이고 간접 지표는 오답 유도임"
  }
 ],
 "5.3": [
  {
   "ts": "5.3",
   "lvl": "실전",
   "scenario": "s3",
   "q": "Mid-analysis, a document subagent finds two credible sources stating 40% vs 12% for the same adoption metric — material to the conclusion. Per uncertainty-handling best practice, the subagent should:",
   "opts": [
    {
     "t": "Complete its analysis with both values included and explicitly annotated with their sources, letting the coordinator decide resolution — conflicts are data to preserve and surface, not errors to resolve locally.",
     "ok": true
    },
    {
     "t": "Halt immediately and escalate to the coordinator — a conflict this material invalidates further analysis."
    },
    {
     "t": "Proceed with the more recent source and note the choice in a footnote."
    },
    {
     "t": "Average the two values (26%) so the synthesis has one number to work with."
    }
   ],
   "explain": {
    "good": "충돌하는 값은 보존하고 출처를 명시해 코디네이터에게 넘기는 것이 가이드가 제시한 처방임. 분석 자체는 계속 가능하므로 중단할 이유가 없고, 해소 권한은 전체 결과를 보는 코디네이터에게 있음.",
    "wrongs": [
     "<b>B(즉시 중단):</b> 중단은 과도한 대응임. 충돌하는 두 값을 그대로 두고도 나머지 분석은 유효하게 진행됨. 일상적인 처리는 서브에이전트가 담당한다는 원칙이 적용되는 지점임.",
     "<b>C(최신 출처 채택):</b> 서브에이전트가 임의로 해소하는 방식임. 최신 자료가 항상 옳은 것도 아니고, 각주는 종합 단계에서 누락되기 쉬움.",
     "<b>D(평균):</b> 평균은 통계적으로 새로 만들어 낸 값임. 두 출처 어느 쪽도 26%라고 말한 적이 없음."
    ]
   },
   "principle": "충돌은 보존하고 주석을 붙여 위임함"
  }
 ],
 "5.4": [
  {
   "ts": "5.4",
   "lvl": "실전",
   "scenario": "s4",
   "q": "A four-hour multi-agent codebase audit crashed at 70% completion; the current design restarts from zero. How do you make it resumable?",
   "opts": [
    {
     "t": "Each agent exports structured state (a findings manifest) to a known location as it progresses; on resume, the coordinator loads the manifests and injects them into fresh agent prompts — durable records replace lost memory.",
     "ok": true
    },
    {
     "t": "Rely on session --resume after the crash — the conversation history contains everything the agents knew."
    },
    {
     "t": "Give the audit one much larger context window so it finishes in a single uninterrupted run."
    },
    {
     "t": "Log everything to a file and paste the full log into a new session after a crash."
    }
   ],
   "explain": {
    "good": "크래시 복구의 정석은 구조화 상태 객체(structured state object)를 알려진 위치에 기록하고 재개할 때 불러와 새 프롬프트에 주입하는 것임. 1.7에서 다룬 요약 주입(이전 세션의 결과를 새 세션에 넣어 주는 방식)과 같은 원리이며, 기록이 소실된 기억을 대신함.",
    "wrongs": [
     "<b>B(--resume 의존):</b> 크래시는 세션 자체가 소실되거나 도구 결과가 낡아지는 사건임. 세션이 살아 있다는 전제의 --resume에 맡길 수 없음.",
     "<b>C(더 큰 컨텍스트 창):</b> 컨텍스트 창(context window)을 키워도 4시간짜리 작업의 중단 위험은 그대로이고, 컨텍스트가 길어질수록 품질이 떨어짐.",
     "<b>D(전체 로그 붙여넣기):</b> 전체 로그 붙여넣기는 구조가 없음. 대부분이 불필요한 내용이라 긴 입력의 중간 누락으로 핵심을 놓침. 매니페스트와 로그 덤프의 차이가 핵심임."
    ]
   },
   "principle": "기록이 소실된 기억을 대신함"
  }
 ],
 "5.5": [
  {
   "ts": "5.5",
   "lvl": "실전",
   "scenario": "s6",
   "q": "The extraction pipeline reports 97% aggregate accuracy, and the team wants to drop human review for high-confidence items. What must happen before automating?",
   "opts": [
    {
     "t": "Break accuracy down by document type and field segment, and run stratified random sampling over high-confidence extractions — an aggregate can hide a failing segment (say, handwritten invoices at 71%) that automation would silently ship.",
     "ok": true
    },
    {
     "t": "Nothing — 97% exceeds the 95% industry bar, so the review capacity is better spent elsewhere."
    },
    {
     "t": "Start routing by the model's self-reported confidence scores immediately and audit later."
    },
    {
     "t": "Double the human review team first so any automation mistake gets caught downstream."
    }
   ],
   "explain": {
    "good": "집계 수치는 성능이 낮은 구간을 가림. 문서 유형과 필드별로 나누어 측정하고, 고신뢰 구간에도 층화 표집(stratified sampling)을 적용해 실제 정확도를 확인한 뒤에만 자동화함.",
    "wrongs": [
     "<b>B(97%면 충분):</b> 97%가 가리는 것이 문제의 핵심임. 특정 구간이 71%라면 그 문서 유형은 3%가 아니라 29%씩 틀린 채로 자동 통과됨.",
     "<b>C(신뢰도 점수로 즉시 라우팅):</b> 자기보고 신뢰도는 라벨링된 검증 세트로 보정하기 전에는 간접 지표일 뿐임. 보정하지 않은 점수로 라우팅부터 하는 것은 순서가 반대임.",
     "<b>D(검토 인력 2배):</b> 인력을 두 배로 늘리는 것은 문제 정의를 벗어남. 목표가 검토 축소인데 확대로 답했고, 구간별 격차는 여전히 측정되지 않음."
    ]
   },
   "principle": "집계는 가리므로 층화해서 측정함"
  }
 ],
 "5.6": [
  {
   "ts": "5.6",
   "lvl": "실전",
   "scenario": "s3",
   "q": "Final research reports say \"studies show...\" with no sources. Logs prove subagents DID return URLs — the synthesis agent's summaries dropped them. What is the durable fix?",
   "opts": [
    {
     "t": "Require subagents to output structured claim-source mappings (each claim tied to its URL/document/excerpt) that the synthesis agent must preserve and merge — attribution survives compression only when it is structural, not prose.",
     "ok": true
    },
    {
     "t": "Add to the synthesis prompt: \"always keep source URLs when summarizing findings.\""
    },
    {
     "t": "Append a bibliography of all consulted sources at the end of each report."
    },
    {
     "t": "Have a human editor re-attach sources to claims before reports go out."
    }
   ],
   "explain": {
    "good": "출처가 산문 안에 있으면 요약(손실 압축)을 거칠 때마다 떨어져 나감. 주장과 출처를 구조(필드)로 묶어야 압축을 견딤. 5.1의 사건 사실 블록과 같은 원리를 출처에 적용한 것임.",
    "wrongs": [
     "<b>B(프롬프트 지시):</b> 프롬프트 지시는 확률적임. 여러 단계의 요약을 거치면 결국 누락됨. 구조로 강제해야 함.",
     "<b>C(끝에 참고문헌):</b> 끝에 붙는 출처 목록은 어느 주장이 어느 출처에서 왔는지 연결하지 못함. 출처 귀속(attribution)의 핵심이 빠짐.",
     "<b>D(사람이 재연결):</b> 리포트마다 사람이 후처리하는 방식은 규모를 감당하지 못하고, 사람도 어느 주장이 어느 출처인지 알 수 없음. 정보가 이미 소실됐기 때문임."
    ]
   },
   "principle": "출처는 구조로 묶어야 유지됨"
  },
  {
   "ts": "5.6",
   "lvl": "기초",
   "scenario": "s3",
   "multi": 2,
   "q": "Which TWO practices keep final research reports verifiable back to their sources? (Select TWO.)",
   "opts": [
    {
     "t": "Require subagents to output structured claim-source mappings (claim + excerpt + URL + date) that synthesis must preserve and merge.",
     "ok": true
    },
    {
     "t": "Require publication or data-collection dates in structured outputs so temporal differences aren't misread as contradictions.",
     "ok": true
    },
    {
     "t": "Append a bibliography of all consulted sources at the end of each report."
    },
    {
     "t": "Add \"always keep source URLs\" to the synthesis agent's prompt."
    },
    {
     "t": "Let the synthesis agent pick the more credible source whenever two conflict."
    }
   ],
   "explain": {
    "good": "출처는 구조로 묶여야 압축을 견디고(매핑 보존), 시점은 데이터로 남아야 2019년과 2024년 수치를 모순으로 잘못 읽지 않음. 산문 서술이나 담당자의 재량에 맡기면 압축 한 번에 사라짐.",
    "wrongs": [
     "<b>C(끝에 참고문헌):</b> 끝에 붙는 목록은 어느 주장이 어느 출처에서 왔는지 연결하지 못함. 출처 귀속의 핵심이 빠짐.",
     "<b>D(프롬프트 지시):</b> 프롬프트 지시는 여러 단계의 요약에서 확률적으로 누락됨. 구조로 강제하는 것이 정답임.",
     "<b>E(종합 단계에서 임의 선택):</b> 임의 해소는 금지됨. 충돌은 양쪽 모두 주석을 붙여 보존하는 것이 원칙임."
    ]
   },
   "principle": "출처는 구조로, 시점은 필수 항목으로"
  }
 ]
};
