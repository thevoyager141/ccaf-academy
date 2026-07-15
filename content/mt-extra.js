/* 미니테스트·모의고사 확장 문제 풀 — 취약점 기반 38문항 + 복수응답(Select TWO) 15문항 (가이드 V1.0 형식 반영) */
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
    "good": "가변 요청 = 모델 주도. 고정 트리는 예측 가능하지만 계획 밖 케이스에서 무너져. 판별 질문은 \"다음 행동을 누가 정해야 하나\" — 요청마다 다르면 모델.",
    "wrongs": [
     "<b>B:</b> 속도가 쟁점이 아냐 — 고정 시퀀스가 오히려 빠를 수도 있어. 문제는 유연성. 그럴듯한 절반의 진실.",
     "<b>C:</b> 과잉 일반화. 예측 가능한 반복 워크플로엔 고정 파이프라인(1.6 프롬프트 체이닝)이 정답이기도 해.",
     "<b>D:</b> stop_reason은 API가 응답마다 자동 반환 — 코드 구조와 무관하게 항상 옴."
    ]
   },
   "principle": "모델 주도 vs 사전 결정 — 가변성이 가른다"
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
    "good": "stop_reason은 이지선다가 아니라 열거형이야 — end_turn·tool_use·max_tokens·pause_turn·refusal 등 값마다 의미와 처방이 달라. 잘림(max_tokens)을 완료로 읽은 게 근본 원인.",
    "wrongs": [
     "<b>B:</b> 반복 횟수는 이 버그와 무관 — 잘린 응답을 완료로 오독하는 한 몇 바퀴를 돌아도 같은 지점에서 멈춰.",
     "<b>C:</b> 자연어 완료 신호 파싱은 대표 안티패턴 — 표현이 바뀌면 깨져.",
     "<b>D:</b> 동일 요청 재제출이면 max_tokens에서 똑같이 또 잘려. pause_turn(계속)과 refusal(중단)도 처방이 정반대라 뭉치면 안 돼."
    ]
   },
   "principle": "stop_reason은 열거형 — 값마다 분기"
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
    "good": "두 결함 = 종료 신호 오독 + 실패 은폐. 처방도 정확히 둘: stop_reason 기반 종료 + 실패 포함 전체 결과 추가. 복수응답은 이렇게 '결함 수 = 정답 수'로 짝이 맞아야 해.",
    "wrongs": [
     "<b>C:</b> 반복 상한을 주 조건으로 승격 — 안티패턴. 안전망은 보조일 때만 정당해.",
     "<b>D:</b> 자연어 완료 신호 파싱 — 표현이 바뀌면 깨지는 안티패턴.",
     "<b>E:</b> max_tokens·pause_turn·refusal은 처방이 제각각 — 동일 요청 재제출로 뭉치면 안 돼."
    ]
   },
   "principle": "stop_reason으로 돌고, 실패도 기록한다"
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
    "good": "낭비는 생긴 뒤 치우는 게 아니라 생기기 전에 막아. 사후 dedupe 시점엔 토큰도, 그 시간에 다뤘어야 할 미커버 영역도 이미 날아갔어.",
    "wrongs": [
     "<b>B:</b> '구현이 단순하다'는 절반의 진실 — 겹침 제거는 되지만 이미 두 배로 쓴 비용과 놓친 커버리지는 못 돌려받아.",
     "<b>C:</b> 격리는 사실이지만 결론이 반대야 — 서로 못 보기 때문에 코디네이터가 사전에 갈라주는 게 가능하고 필요한 것.",
     "<b>D:</b> 비용이 같지 않아 — A는 중복 작업 비용을 그대로 다 낸 뒤의 청소."
    ]
   },
   "principle": "낭비는 생기기 전에 — 사전 분할"
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
    "good": "역할 분담의 정석: 설계는 위(사전 분해·배정), 일상 복구는 아래(자율), 못 푸는 것만 위로. 코디네이터를 일상 에러에 끌어들이면 본업인 설계·종합이 밀려나.",
    "wrongs": [
     "<b>B:</b> '가시성'은 그럴듯하지만 과부하라는 근본 원인을 오히려 키워. 필요한 가시성은 구조화된 결과 보고로 충분해.",
     "<b>C:</b> 새 중간 장치 신설 — 분류기·레이어 추가는 거의 항상 과잉 설계야. 기존 에이전트에게 역할 규칙을 주면 끝날 일.",
     "<b>D:</b> 에러를 조용히 삼키면 코디네이터가 실패를 성공으로 오독해 — 안티패턴 중에서도 최악."
    ]
   },
   "principle": "설계는 위, 일상 복구는 아래"
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
    "good": "코디네이터의 일 = 사전 설계(분할·배정)와 사후 종합(갭 평가·재위임). 실행은 서브에이전트, 일상 복구도 서브에이전트 — 위·아래 역할 구분이 이 문제의 전부야.",
    "wrongs": [
     "<b>C:</b> 실행까지 코디네이터가 하면 위임 구조의 의미가 사라져 — 약하면 재위임이 정답.",
     "<b>D:</b> 일시 실패는 서브에이전트 로컬 복구 — 중앙으로 다 올리면 코디네이터 과부하.",
     "<b>E:</b> 직접 통신은 컨텍스트 격리·관측성 파괴 — 모든 통신은 코디네이터 경유."
    ]
   },
   "principle": "설계는 위, 실행·복구는 아래"
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
    "good": "Claude는 이미 한 응답에 여러 도구를 병렬 요청할 수 있어. 그 능력을 프롬프트로 끌어내면 새 코드 0줄로 왕복이 줄어. 새 도구 신설은 그 다음에나 검토.",
    "wrongs": [
     "<b>B:</b> composite tool은 만들고 유지해야 하고, 정확히 그 조합에만 작동해. 네 번째 조회가 생기면 또 만들어야 해 — 과잉 설계의 전형.",
     "<b>C:</b> 어떤 고객이 올지 모르는데 전 고객 데이터를 선로딩할 순 없고, 세션 중 갱신도 안 돼.",
     "<b>D:</b> 지문이 independent라고 명시했어 — '순차 의존'은 지문을 다시 읽으면 무너지는 보기."
    ]
   },
   "principle": "이미 있는 능력 먼저 — 병렬 호출은 프롬프트로"
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
    "good": "판별 질문: \"100% 지켜야 하나, 나아지면 되나?\" 컴플라이언스는 확률에 못 맡겨 → 프로그램 강제. 톤은 성향 → 프롬프트. 이 축이 D1 최다 출제 포인트.",
    "wrongs": [
     "<b>B:</b> 사후 필터는 환불이 이미 나간 뒤에나 잡아 — 컴플라이언스는 실행 전 차단이어야 해. 게다가 톤 필터는 brittle.",
     "<b>C:</b> '항상 검증 먼저' 지시는 확률적 — 88%는 지켜도 12%가 위반이면 컴플라이언스 실패.",
     "<b>D:</b> 톤을 훅으로 차단하면 정상 응답까지 막고, 어긋남 판정 자체가 모호해 — 강제와 성향을 반대로 배정한 보기."
    ]
   },
   "principle": "원칙 ① 강제는 프로그램, 성향은 프롬프트"
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
    "good": "'무관용(zero tolerance)' = 100% 강제 = 프로그램 레벨. 훅 차단과 필수 파라미터 둘 다 코드가 보장하는 길이야 — 게이트가 꼭 훅일 필요는 없다는 것까지 묻는 문제.",
    "wrongs": [
     "<b>C:</b> 프롬프트 지시는 확률적 — 88%를 100%로 못 만들어.",
     "<b>D:</b> few-shot도 성향 개선일 뿐 보장이 아냐 — 컴플라이언스엔 부족.",
     "<b>E:</b> 사후 필터는 환불이 이미 실행된 뒤 — 문구를 지워도 돈은 나갔어."
    ]
   },
   "principle": "원칙 ① 강제는 프로그램으로 — 경로는 둘"
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
    "good": "축은 '실행 전이냐 후냐'. 차단은 실행되기 전에만 의미가 있고(PreToolUse), 정규화는 결과가 나온 뒤에만 가능해(PostToolUse).",
    "wrongs": [
     "<b>B:</b> 정규화할 '결과'는 실행 전엔 존재하지 않아 — Pre로는 불가능.",
     "<b>C:</b> $500 초과 차단을 실행 후에 하면 환불은 이미 나갔어 — 절반의 진실 함정.",
     "<b>D:</b> 금액 상한은 100% 강제여야 하는 정책 — 프롬프트 지시는 확률적이라 컴플라이언스엔 부족."
    ]
   },
   "principle": "실행 전 차단, 실행 후 정규화"
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
    "good": "두 단계로 풀어: ① 부분 stale은 '무엇이 바뀌었는지 통보'로 표적 재분석(전면 재분석 불필요), ② 같은 기준선에서 갈래 비교는 fork의 존재 이유. 순서는 갱신 먼저, 분기 다음.",
    "wrongs": [
     "<b>B:</b> 56/60 파일 분석은 아직 유효해 — 전부 버리면 몇 시간을 다시 태워. '낡았으면 새로'는 부분 stale엔 과잉 처방.",
     "<b>C:</b> 세션은 파일 변경을 스스로 감지 못 해 — 낡은 분석 위에서 추론하다 틀린 결론을 내.",
     "<b>D:</b> 분기부터 하면 4개 파일 재분석을 두 갈래에서 두 번 해 — 갱신을 한 번으로 끝내고 갈라지는 게 순서."
    ]
   },
   "principle": "부분 stale은 통보로, 분기는 fork로"
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
    "good": "설명은 모델이 도구를 고르는 1차 근거 자료야. 공식 기준은 최소 3~4문장: 목적 + 입력 형식/예시 + 엣지 케이스 + 이웃 도구와의 경계.",
    "wrongs": [
     "<b>B:</b> 토큰 절약은 절반의 진실 — 최소 설명이 바로 오선택의 최다 원인이라 재시도 비용이 더 커.",
     "<b>C:</b> 통짜 문서 덤프는 선택 판단에 노이즈 — 필요한 건 '언제 쓰고 언제 안 쓰나'라는 판단 재료.",
     "<b>D:</b> 이름은 짧은 라벨일 뿐 — 근거 없는 속설이고, 비슷한 도구끼리는 이름만으로 못 갈라."
    ]
   },
   "principle": "설명 = 선택의 근거 자료"
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
    "good": "오선택의 1차 해법은 언제나 설명 보강. 새 장치(분류기·라우터) 신설은 비용·지연·새 오류 지점을 더할 뿐 근본 원인(빈약한 설명)을 안 고쳐.",
    "wrongs": [
     "<b>B:</b> '결정론'이라는 단어에 낚이지 마 — 결정론적 강제는 컴플라이언스(보안·정책)용이야. 이건 품질 문제고, 분류기도 결국 또 하나의 확률 모델이야.",
     "<b>C:</b> 합치면 경계가 더 흐려져 — 두 데이터 소스는 입력·출력·용도가 달라.",
     "<b>D:</b> tool_choice 강제는 어느 도구가 맞는지 코드가 매 요청마다 알아야 성립 — 그걸 알면 애초에 문제가 없지."
    ]
   },
   "principle": "오선택 1차 해법은 설명 보강"
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
    "good": "선택 신뢰도를 만드는 건 판단 재료: 입력 형식+예시, 그리고 이웃 도구와의 경계선. 공식 기준 3~4문장의 핵심 성분이 바로 이 둘이야.",
    "wrongs": [
     "<b>C:</b> 내부 구현은 선택 판단에 무관한 노이즈 — 필요한 건 '언제 쓰나'지 '어떻게 도는가'가 아냐.",
     "<b>D:</b> 한 줄 설명이 바로 오선택의 최다 원인 — 토큰 절약의 절반의 진실.",
     "<b>E:</b> '신중히 골라'는 판단선을 안 그어줘 — 4.1의 막연한 지시와 같은 실패."
    ]
   },
   "principle": "설명 = 입력 예시 + 경계선"
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
    "good": "'빈 결과'와 '접근 실패'는 다른 사건인데 같은 모양([])으로 나오는 게 근본 원인. 구분은 프롬프트가 아니라 인터페이스(응답 구조)에서 만들어줘야 해.",
    "wrongs": [
     "<b>B:</b> 유효한 빈 결과까지 3회 재시도 — 대부분의 재고 없음 상품에서 지연·비용 3배. 절반의 진실.",
     "<b>C:</b> 모델은 추측만 가능해 — 구분할 정보 자체가 응답에 없으니 지시로는 못 풀어.",
     "<b>D:</b> 둘 다 unknown이면 여전히 뭉뚱그림 — 재시도해야 할 케이스와 보고해야 할 케이스를 계속 못 갈라."
    ]
   },
   "principle": "빈 결과 ≠ 실패 — 모양부터 분리"
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
    "good": "복구 판단의 두 축 = 무슨 종류의 실패인가(범주) + 다시 하면 되는가(재시도 가능성). 이 둘이 있어야 재시도/우회/보고를 가를 수 있어.",
    "wrongs": [
     "<b>C:</b> 백엔드 스택 트레이스는 에이전트에겐 노이즈 — 판단 재료는 구조화된 분류지 원시 덤프가 아냐.",
     "<b>D:</b> 실패의 성공 위장 — 에이전트가 '재고 없음'류의 틀린 결론을 내리게 만드는 안티패턴.",
     "<b>E:</b> 무작위 코드는 정보를 파괴 — 존재하지 않는 설계 원칙."
    ]
   },
   "principle": "실패 유형 + 재시도 가능성 — 판단의 두 축"
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
    "good": "tool_choice 4옵션의 용도: auto=모델 재량 / any=도구 강제(프로즈 금지) / 특정 도구 강제 / none=도구 금지(프로즈 강제). '반드시'가 붙는 곳엔 재량(auto)이 아니라 강제를 써.",
    "wrongs": [
     "<b>B:</b> 뒤집힌 배정 — any를 요약에 걸면 요약이 도구 호출로 나와.",
     "<b>C:</b> 프롬프트 지시는 확률적 — '항상 구조화'가 요구사항이면 tool_choice로 보장해야 해. 그럴듯한 절반의 진실.",
     "<b>D:</b> 완전히 반대 — (1)에 none이면 추출 도구 호출이 금지돼."
    ]
   },
   "principle": "보장이 필요하면 tool_choice로"
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
    "good": "공유 파일과 개인 비밀의 분리 공식: 파일엔 자리표시자(${...}), 값은 각자 환경변수. 유출 토큰 회전까지가 처방 세트야.",
    "wrongs": [
     "<b>B:</b> 동작은 하지만 팀 공유의 이점(신규 합류 시 자동 적용)을 통째로 버려 — 개인 실험 서버용 위치야. 절반의 진실.",
     "<b>C:</b> .gitignore하면 팀 공유라는 목적 자체가 사라져 — 신규 멤버가 서버 설정을 못 받아.",
     "<b>D:</b> 커밋된 공유 토큰은 유출 문제를 키우고, 감사 추적(누가 했나)도 사라져."
    ]
   },
   "principle": "설정은 공유, 비밀은 환경변수"
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
    "good": "Edit의 전제는 '유일한 앵커 텍스트'. 그 전제가 깨지면 정식 탈출구는 Read(전체 로드) + Write(통째 재작성) — 7곳 중 정확히 의도한 1곳만 바꿀 수 있어.",
    "wrongs": [
     "<b>B:</b> 첫 매칭이 의도한 곳이라는 보장이 없어 — 7분의 1 확률에 리팩토링을 걸 순 없지.",
     "<b>C:</b> sed 전역 치환은 7곳을 전부 바꿔 — 의도는 1곳. 도구는 되지만 결과가 틀린 절반의 진실.",
     "<b>D:</b> 파일은 이미 알아 — Glob은 파일 찾기 도구라 단계가 어긋나."
    ]
   },
   "principle": "Edit 실패의 정식 탈출구 = Read+Write"
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
    "good": "이름·경로 패턴 = Glob, 내용 검색 = Grep — 두 도구의 축은 '파일 겉(이름)이냐 속(내용)이냐'야.",
    "wrongs": [
     "<b>C:</b> 반대로 배정 — Grep은 파일 속 텍스트를 찾는 도구.",
     "<b>D:</b> 전체 리포를 컨텍스트에 붓는 건 컨텍스트 낭비의 대표 안티패턴 — 검색 도구가 있는 이유.",
     "<b>E:</b> 글롭은 경로 문자열에만 작동 — 파일 내용은 못 봐."
    ]
   },
   "principle": "겉은 Glob, 속은 Grep"
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
    "good": "스코프 판별기는 단 하나: git에 커밋되는가. 커밋되면 클론·풀을 타고 전원에게, 아니면 내 컴퓨터에만. 이 한 줄이 user↔project 혼동(반복 오답 1순위)을 끊어.",
    "wrongs": [
     "<b>B:</b> ~/.claude/도 .claude 폴더야 — 위치(홈 vs 프로젝트)가 스코프를 가르지, 폴더 이름이 아냐. 딱 그 혼동을 노린 보기.",
     "<b>C:</b> 권한 계정 개념은 여기 없어 — 파일이 리포에 있으면 읽히는 게 메커니즘의 전부.",
     "<b>D:</b> ~/.claude/CLAUDE.md도 세션 시작에 로드돼 — 로드 시점과 적용 범위는 별개 축이야."
    ]
   },
   "principle": "스코프 판별 = git에 커밋되는가"
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
    "good": "3명은 되고 클론한 1명만 안 된다 = 그 규칙이 리포 밖(개인 user-level)에 있다는 신호. 가장 단순한 설명이 먼저(Occam) — 파일을 리포로 옮기면 미래 합류자까지 해결.",
    "wrongs": [
     "<b>B:</b> 버전 가설은 복잡한 설명으로의 점프 — 같은 리포를 클론했는데 안 된다는 사실이 이미 '리포에 없다'를 가리켜.",
     "<b>C:</b> 설치·활성화 단계는 존재하지 않아 — 파일이 폴더에 있으면 읽힌다, 그게 적용의 전부.",
     "<b>D:</b> CI 거부는 사후 강제 — 작성 시점에 규칙이 적용 안 되는 원인은 그대로라 개발 경험만 나빠져. 절반의 진실."
    ]
   },
   "principle": "원인은 스코프 — 파일이 어디 있나부터"
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
    "good": "판별기는 하나 — git에 커밋되는가. 루트 CLAUDE.md와 .claude/rules/는 클론·풀을 타고 전원에게 자동 도달. 미래 합류자까지 커버돼.",
    "wrongs": [
     "<b>C:</b> user 레벨은 각자 손으로 넣어야 하고 신규 멤버가 누락되는 바로 그 패턴 — 4회 이상 반복된 함정.",
     "<b>D:</b> local은 프로젝트 안에 있어도 gitignore 대상 — '폴더 위치'가 아니라 '커밋 여부'가 스코프를 갈라.",
     "<b>E:</b> 수동 적용은 자동화 요구 자체를 못 채워."
    ]
   },
   "principle": "스코프 판별 = git에 커밋되는가"
  }
 ],
 "3.2": [
  {
   "ts": "3.2",
   "lvl": "기초",
   "scenario": "s2",
   "q": "You want a personal variant of the team's shared /commit command with your own message style, without affecting anyone else. Where does it go, and what is it named?",
   "opts": [
    {
     "t": "In your user scope (~/.claude/commands/) under a different name like /my-commit — a same-named personal command would shadow the team's for you and make behavior confusing to debug.",
     "ok": true
    },
    {
     "t": "In your user scope with the same name /commit, so it cleanly overrides the team version just for you."
    },
    {
     "t": "Edit the team's project-level /commit directly — your improvements will help everyone."
    },
    {
     "t": "In the project's .claude/commands/ as /my-commit so it's backed up with the repo."
    }
   ],
   "explain": {
    "good": "개인 변형의 공식 = user 스코프 + 다른 이름. 두 축을 다 지켜야 해: 위치(나에게만)와 이름(충돌 회피).",
    "wrongs": [
     "<b>B:</b> 같은 이름은 그림자 충돌 — 팀 커맨드가 왜 다르게 도는지 아무도 추적 못 하는 상태를 만들어. 실제 재발 오답.",
     "<b>C:</b> 팀 전체의 워크플로를 개인 취향으로 바꿔버려 — '개인 변형' 요구와 정반대.",
     "<b>D:</b> 프로젝트 폴더에 넣으면 커밋돼 팀 전원에게 노출돼 — 위치 축이 틀렸어. 절반의 진실."
    ]
   },
   "principle": "개인 변형 = user 스코프 + 다른 이름"
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
    "good": "수명·위험·도구가 다른 두 작업이 한 스킬에 묶인 게 근본 원인. 분리 + 각자 최소 권한(allowed-tools) + 인자 없으면 SKILL.md가 묻기 — 세 겹이 함께 가는 처방.",
    "wrongs": [
     "<b>B:</b> argument-hint는 자동완성용 힌트일 뿐 강제력이 없어 — required로 만드는 기능 자체가 없어. 실제 재발 오답.",
     "<b>C:</b> 파괴적 작업(DB 적용)을 확률적 지시에 맡기는 것 — 두 번 사고 난 현장에서 또 확률에 걸 수 없지.",
     "<b>D:</b> apply 기능 자체가 업무 요건이야 — 기능 제거는 문제 회피지 해결이 아냐."
    ]
   },
   "principle": "위험이 다르면 스킬을 가른다 — 원칙 ④"
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
    "good": "위험이 다른 두 작업은 분리 + 각자 최소 권한 — 이 두 처방이 세트야. 분리만 하고 권한을 안 좁히면 create 스킬이 여전히 DB를 만질 수 있어.",
    "wrongs": [
     "<b>C:</b> argument-hint는 표시용 힌트일 뿐 강제 기능이 없어 — 반복 확인된 함정.",
     "<b>D:</b> 파괴적 작업을 확률적 지시에 맡기기 — 두 번 사고 난 현장의 재발 대기.",
     "<b>E:</b> apply는 업무 요건 — 기능 제거는 해결이 아니라 회피."
    ]
   },
   "principle": "분리 + 최소 권한은 세트 — 원칙 ④"
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
    "good": "판별축은 '경로 조건이냐, 작업 종류냐'. 경로에 반응해 항상 적용 = rules+paths. 같은 폴더 안에서도 특정 작업에만 = 온디맨드 스킬. 이 축이 두 번 틀린 그 지점이야.",
    "wrongs": [
     "<b>B:</b> paths는 그 경로를 만지는 '모든' 작업에 로드돼 — 버그픽스에도 예제 코드가 딸려 오는 게 바로 지문의 문제. 실제 재발 오답.",
     "<b>C:</b> (1)의 요구는 '자동 적용'이야 — 사람이 매번 불러야 하는 스킬은 잊히는 순간 규칙이 사라져. 6/11 재발 오답.",
     "<b>D:</b> CLAUDE.md 상시 로드는 infra를 안 만질 때도 컨텍스트를 차지하고, rules는 여전히 작업 종류를 못 갈라."
    ]
   },
   "principle": "경로는 rules, 작업은 스킬"
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
    "good": "지문의 already/existing 신호를 읽어: 진단 완료 + 검증 수단 존재 + 한 줄 수정. 남은 절차가 없는데 절차를 더하는 보기는 전부 함정 — 세 번 재발한 그 패턴이야.",
    "wrongs": [
     "<b>B:</b> plan mode는 대규모·다중 파일·복수 설계안용. '안전한 기본값'처럼 들리는 절반의 진실 — 끝난 진단을 다시 하는 비용만 추가돼.",
     "<b>C:</b> 수정안이 하나뿐이야(가드 한 줄) — 비교할 대안이 없는데 fork는 의미가 없어. 6/11 재발 오답.",
     "<b>D:</b> stack trace가 이미 원인 지점을 특정했어 — 탐색은 끝난 일. 'already identified'에 밑줄 긋는 훈련."
    ]
   },
   "principle": "already/existing이 보이면 절차 추가는 함정"
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
    "good": "plan mode의 3신호 = 대규모(다중 파일) · 복수의 유효한 접근 · 아키텍처 결정. 두 정답이 각각 이 신호들을 담고 있어.",
    "wrongs": [
     "<b>C:</b> 진단 끝 + 한 줄 수정 = 직접 실행 — 3회 반복된 그 함정. already가 보이면 절차 추가는 낭비.",
     "<b>D:</b> 오타 수정에 계획 단계는 비례성 위반.",
     "<b>E:</b> 범위 명확 + 검증 수단 존재 = 직접 실행의 교과서 케이스."
    ]
   },
   "principle": "plan mode 3신호: 규모·복수 접근·아키텍처"
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
    "good": "기준은 '서로 얽혔는가'. 얽힌 문제는 함께 줘야 상호작용을 추론하고, 독립 문제는 따로 줘야 집중돼. 개수가 아니라 의존 관계가 묶음을 정해.",
    "wrongs": [
     "<b>B:</b> 상호작용 구분 없는 한 방 덤프 — 독립 수정 셋이 얽힌 둘과 뒤섞여 충돌 위험. 절반의 진실.",
     "<b>C:</b> 얽힌 두 개를 순차로 쪼개면 첫 수정이 두 번째 전제를 깨 — 이 지문에서 정확히 실패하는 방식.",
     "<b>D:</b> 세션 5개는 컨텍스트 재구축 비용만 5배 — 오염 문제는 애초에 없었어."
    ]
   },
   "principle": "얽힌 것은 함께, 독립은 따로"
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
    "good": "사후 필터로 거르지 말고 맥락을 줘서 처음부터 안 내게 — 리뷰 재출제 최다 테마. 시그니처 매칭은 코드가 한 줄만 밀려도 새고, 같은 자리의 '새 버그'까지 조용히 삼켜.",
    "wrongs": [
     "<b>B:</b> '결정론적'이라는 단어의 함정 재등장 — brittle한 결정론은 확률적 판단보다 나빠. 게다가 진짜 회귀를 숨기는 부작용이 치명적.",
     "<b>C:</b> 피드백 주기를 늦추는 증상 회피 — 커밋 단위의 빠른 피드백이라는 CI의 목적을 버려.",
     "<b>D:</b> 수정한 세션의 self-review는 4.6의 함정 — 자기 수정을 '해결됐다'고 합리화하는 편향까지 얹혀."
    ]
   },
   "principle": "필터로 거르지 말고 맥락으로 안 내게"
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
    "good": "제약(억제 금지)과 병목(조사 시간)을 동시에 만족하는 보기를 골라야 해. 근거+확신도를 인라인으로 붙이면 사람의 판단 속도가 오르고, 아무것도 숨기지 않아.",
    "wrongs": [
     "<b>B:</b> 억제 금지 제약을 정면으로 위반 — 다른 상황이면 몰라도 이 지문에선 탈락. 실제 연습시험 오답.",
     "<b>C:</b> 막연한 '높은 확신만'은 정밀도를 안 올려 — 4.1 기초 개념 그대로. 구체 기준이나 근거 표시가 필요해.",
     "<b>D:</b> 카테고리 비활성화는 유효한 전술이지만 '사람이 다 봐야 한다'는 이 팀 제약과 충돌 — 조건이 정답을 바꾸는 대표 케이스."
    ]
   },
   "principle": "병목을 직접 겨눠라 — 원칙 ②"
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
    "good": "판별 공식: 실패 형태가 일정하면 few-shot, 갭이 가변적이면 self-critique. '첫 요청만 답하고 나머지 누락'은 완전히 일정한 형태 — 예시 2~3개면 잡혀.",
    "wrongs": [
     "<b>B:</b> 전처리 파이프라인 신설 = 과잉 설계 + 조각내면 요청 간 맥락(같은 주문 얘기인지)이 끊겨. 실제 연습시험 오답.",
     "<b>C:</b> self-critique도 동작은 하지만 매 응답 2배 비용 — 실패가 이렇게 예측 가능하면 예시가 더 싸고 직접적이야. 판별축 반대편.",
     "<b>D:</b> 스키마는 형식 검사지 행동 교육이 아냐 — '요청이 몇 개인지' 파악 자체를 못 하는 게 문제라 required가 성립 안 해."
    ]
   },
   "principle": "실패 형태가 일정하면 예시로"
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
    "good": "few-shot이 안 먹혔다는 지문 자체가 힌트 — 갭이 케이스마다 달라 고정 예시로는 못 덮어. 가변 갭 = 체크리스트 기반 자기평가(evaluator-optimizer).",
    "wrongs": [
     "<b>B:</b> 이미 5개로 실패했어 — 예시는 '보여준 형태'만 가르치는데 누락 형태가 매번 새로워. 같은 방향 증량은 같은 결과.",
     "<b>C:</b> 독립 인스턴스는 '합리화된 확신'을 깰 때 필요한 무기(4.6)야 — 단순 누락은 자기 눈으로도 보여서 self-critique로 충분하고 더 싸.",
     "<b>D:</b> 템플릿 헤더는 채워졌는지 보장 못 해 — 빈 섹션이나 형식적 한 줄로 통과돼. 절반의 진실."
    ]
   },
   "principle": "갭이 가변이면 자기평가로"
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
    "good": "이 구분이 6/16 실제 오답 지점이야: 값이 문서에 없으면 nullable(지어냄 방지), 값은 있는데 분류가 안 맞으면 enum 확장(unclear/other+detail). 처방을 바꿔 끼우면 안 돼.",
    "wrongs": [
     "<b>B:</b> 제품 유형은 문서에 '있는데 카테고리가 안 맞는' 문제 — null로 비우면 있는 정보를 버려. 정확히 그 재발 오답.",
     "<b>C:</b> PO 번호는 enum 필드가 아니야 — 자유값 필드의 부재엔 unknown 항목이 아니라 nullable이 처방.",
     "<b>D:</b> 재시도는 정보가 있을 때만 유효 — 없는 PO 번호는 몇 번을 다시 물어도 안 생겨(4.4 연결)."
    ]
   },
   "principle": "없는 값은 null, 안 맞는 값은 unclear"
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
    "good": "환각의 두 뿌리: 없는 값을 required가 강요(→nullable), 안 맞는 분류를 enum이 강요(→unclear/other). 각각의 탈출구를 열어주는 게 정답 쌍.",
    "wrongs": [
     "<b>C:</b> strict는 문법만 보장 — 지어낸 값도 문법적으로 유효하면 통과해. 절반의 진실.",
     "<b>D:</b> required 전부가 바로 지어내기의 원인 — 정답과 정반대 방향.",
     "<b>E:</b> 정보가 원본에 없으면 재시도는 무효 — 4.4의 판별 그대로."
    ]
   },
   "principle": "없는 값은 null, 안 맞는 값은 unclear"
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
    "good": "재시도의 유일한 판별 기준 = '고칠 정보가 소스에 있는가'. 합계 오류는 문서 안에 근거가 있으니 오류 명세를 붙여 재시도, 부재는 몇 번을 돌려도 무효 — 문서를 바꾸거나 null.",
    "wrongs": [
     "<b>B:</b> B그룹은 3회가 아니라 30회도 무효 — 없는 정보는 재시도가 못 만들어. 비용만 3배.",
     "<b>C:</b> A그룹은 기계 교정이 되는 유형이야 — 전부 사람에게 보내면 리뷰어가 병목이 돼. 절반의 진실.",
     "<b>D:</b> '더 주의해서'는 구체 피드백이 없는 재시도 — 무엇이 틀렸는지 모르는 채 같은 실수를 반복해."
    ]
   },
   "principle": "재시도는 정보가 있을 때만"
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
    "good": "판별축은 가격이 아니라 '블로킹인가'. 머지가 검사 결과를 기다려야 하면 상한 없는 지연(≤24h, SLA 없음)은 결격 — 6/16에 '보통 1시간'에 낚인 바로 그 문제.",
    "wrongs": [
     "<b>B:</b> 'usually'가 함정의 핵심 — 평균은 보장이 아니야. 꼬리 지연 하루면 팀 전체 머지가 멈춰.",
     "<b>C:</b> 타임아웃 자동 머지 = 검사가 안 끝난 코드를 통과시키는 것 — 검사 무력화. 절반의 진실.",
     "<b>D:</b> 방향은 맞는데 근거가 틀렸어 — 배치는 도구 '정의'는 지원해. 안 되는 건 미드-리퀘스트 도구 '실행 루프'."
    ]
   },
   "principle": "블로킹 요건은 가격을 이긴다"
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
    "good": "제출~회수 사이에 개입할 틈이 없다 — 이게 근본 제약이야. 도구를 '정의'하는 건 데이터라 문제없지만, 결과를 돌려주고 이어가는 왕복이 성립 안 해.",
    "wrongs": [
     "<b>B:</b> 정의는 지원돼 — '정의 미지원'은 실제 연습시험에서 헷갈린 그 오답. 정의(데이터)와 실행 루프(왕복)를 갈라.",
     "<b>C:</b> 24시간은 오히려 '너무 길어서' 블로킹에 부적합한 속성 — 그리고 지속시간은 근본 원인이 아냐.",
     "<b>D:</b> 순서 비보장은 사실이지만 여러 '요청 간' 얘기 — 한 요청 안의 루프가 불가능한 이유와 무관."
    ]
   },
   "principle": "배치의 근본 제약 = 왕복 없음"
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
    "good": "배치 적합 = 논블로킹 + 지연 허용. 야간 감사와 주간 스캔은 결과가 '언제' 오든 아무도 안 기다려 — 50% 절감을 공짜로 얻는 자리.",
    "wrongs": [
     "<b>C:</b> 머지 대기는 블로킹 — SLA 없는 최대 24시간에 팀을 세울 수 없어. '보통 1시간'은 약속이 아냐.",
     "<b>D:</b> 실시간 대화는 동기 API의 존재 이유.",
     "<b>E:</b> 배치는 제출~회수 사이에 개입 불가 — 미드-리퀘스트 도구 왕복이 성립 안 해."
    ]
   },
   "principle": "블로킹은 동기, 나머지만 배치"
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
    "good": "둘의 차이가 시험 단골: 누락(빠뜨림)은 자기 눈에도 보여 self-critique로 잡히지만, 확신(합리화된 결론)은 같은 맥락에선 같은 맹점으로 반복돼 — 새 눈(독립 인스턴스)이 필요해.",
    "wrongs": [
     "<b>B:</b> 프롬프트를 세게 써도 생성 추론이 컨텍스트에 남아 있는 한 확증 편향이 이겨 — 연습시험에서 네가 실제로 골랐던 오답 방향이야.",
     "<b>C:</b> 3표 다수결은 비용 3배인데 같은 세션이 던지는 3표 — 편향이 투표로 안 씻겨. 이것도 연습시험에서 실제로 골랐던 함정이야.",
     "<b>D:</b> 독립 Claude 인스턴스로 잡히는 유형이야 — 사람 전용으로 격상하면 리뷰가 병목이 돼."
    ]
   },
   "principle": "누락은 자기평가, 확신은 새 눈"
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
    "good": "신뢰의 두 축: 누가 보나(생성 추론 없는 새 눈) + 어떻게 보나(집중 패스 + 통합 패스). 3대 오답 장치(self-review·다수결·큰 모델)와 정확히 대비되는 쌍이야.",
    "wrongs": [
     "<b>C:</b> 프롬프트를 세게 써도 생성 맥락의 확증 편향은 남아 — 같은 세션의 한계.",
     "<b>D:</b> 같은 희석된 패스 3번 = 비용 3배, 편향은 투표로 안 씻겨.",
     "<b>E:</b> 모델 크기는 주의력 희석의 해답이 아냐 — 구조(패스 분리)가 해답."
    ]
   },
   "principle": "새 눈 + 패스 분리"
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
    "good": "lost in the middle — 긴 입력의 중간은 누락 위험이 커. 핵심 요약은 선두 배치 + 끝에 재강조 + 섹션 헤더가 완화책 세트야.",
    "wrongs": [
     "<b>B:</b> 골고루 분산은 매번 누군가를 중간에 앉히는 것 — 위치 효과를 피하는 게 아니라 피해자를 순환시킬 뿐.",
     "<b>C:</b> 끝만 쓰면 절반의 진실 — 시작이 가장 강하고, 처음+끝 조합이 정석.",
     "<b>D:</b> 헤더는 보조 수단이야 — 구조가 위치 효과를 대체하진 못해. 실증된 현상이야."
    ]
   },
   "principle": "처음과 끝을 써라"
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
    "good": "요약은 본질적으로 손실 압축이라 숫자·날짜가 먼저 뭉개져. 처방은 요약을 고치는 게 아니라 '뭉개면 안 되는 것'을 구조화해 따로 싣는 것 — case facts 블록.",
    "wrongs": [
     "<b>B:</b> 무한 성장 금지라는 제약을 정면 위반 — 22턴이 40턴 되면 같은 벽. 절반의 진실.",
     "<b>C:</b> 프롬프트 지시는 확률적 — 여러 번 압축을 거치면 결국 새. 보존은 구조로 보장해야 해.",
     "<b>D:</b> 대화 중 합의된 금액·기한은 DB에 없어 — 대화 안에서 만들어진 사실은 대화 쪽에서 보존해야 해. 새 장치 신설이기도 하고."
    ]
   },
   "principle": "요약은 압축, 사실은 별도 보존"
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
    "good": "보존은 지시가 아니라 구조로: 뭉개지면 안 되는 것은 요약 밖 금고(case facts)에, 애초에 쌓이지 말아야 할 것은 트리밍으로. 입구와 출구를 동시에 막는 쌍이야.",
    "wrongs": [
     "<b>C:</b> 프롬프트 지시는 확률적 — 여러 번 압축을 거치면 결국 새.",
     "<b>D:</b> 무한 성장 금지 제약을 정면 위반 — 40턴이 되면 같은 벽.",
     "<b>E:</b> 대화 중 합의된 금액·기한은 DB에 없어 — 대화 안에서 만들어진 사실은 대화 쪽에서 지켜야 해."
    ]
   },
   "principle": "구조로 지킨다 — 금고와 트리밍"
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
    "good": "명시적 요청은 해석이 필요 없는 직접 사건 — 즉시 수용이 유일한 정답. 쉬운 작업이라는 사실이 고객 의사를 덮을 근거가 못 돼. 두 번 틀린 그 규칙이야.",
    "wrongs": [
     "<b>B:</b> '먼저 해결'이 바로 그 재발 오답 — 시스템 효율 판단으로 고객 의사를 덮어쓰는 설계 오류.",
     "<b>C:</b> 에스컬레이션 트리거에 '복잡성'만 있는 게 아냐 — 명시적 요청·정책 공백은 난이도와 무관하게 트리거.",
     "<b>D:</b> 절충처럼 보이지만 이미 봇이 처리를 시작한 시점에 의사는 무시됐어. 절반의 진실."
    ]
   },
   "principle": "명시적 요청 > 능력·효율"
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
    "good": "정책 공백 = 에이전트가 답을 만들 권한이 없는 영역. 거절도 승인도 둘 다 '정책 창작'이라 위로 올리는 것만 정답.",
    "wrongs": [
     "<b>B:</b> '없음 = 금지'는 창작이야 — 회사가 아직 결정 안 한 것일 수 있어. 그럴듯한 절반의 진실.",
     "<b>C:</b> 승인 방향의 창작 — 전례가 만들어져 다음 고객부터 정책이 돼버려.",
     "<b>D:</b> 감정 점수는 대리지표 — 에스컬레이션 판단의 근거로 신뢰 불가. 트리거는 사건(요청·공백·룰)이지 추정값이 아냐."
    ]
   },
   "principle": "정책 공백은 위로"
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
    "good": "정당한 트리거는 해석이 필요 없는 사건 — 명시적 요청과 정책 공백. 나머지 셋은 전부 대리지표(추정값)라 신뢰 불가 — 이 대비가 5.2의 심장이야.",
    "wrongs": [
     "<b>C:</b> 감정 점수는 추정 — 화난 고객 ≠ 복잡한 케이스.",
     "<b>D:</b> 턴 수는 임의 기준 — 길다고 못 푸는 게 아니고 짧다고 풀리는 게 아냐.",
     "<b>E:</b> 자기보고 신뢰도는 보정 전엔 못 믿어 — 어려운 케이스일수록 과신해."
    ]
   },
   "principle": "트리거는 사건, 대리지표는 함정"
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
    "good": "충돌은 '보존하고 명시해서 위임'이 가이드 원문의 처방. 분석 자체는 계속 가능하니 멈출 이유가 없고, 해소 권한은 전체 그림을 가진 코디네이터에게.",
    "wrongs": [
     "<b>B:</b> 중단은 과잉 반응 — 충돌 값 둘을 안고도 나머지 분석은 유효하게 진행돼. '일상 처리는 아래' 원칙의 적용점.",
     "<b>C:</b> 서브에이전트의 임의 해소 — 최신이 항상 옳지 않고, 각주는 종합 단계에서 사라지기 쉬워.",
     "<b>D:</b> 평균은 통계적 창작 — 두 출처 어느 쪽도 26%라고 말한 적 없어. 숫자 뭉개기의 전형."
    ]
   },
   "principle": "충돌은 보존하고 주석 달아 위임"
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
    "good": "크래시 복구의 정석 = 구조화 상태 내보내기(매니페스트) + 재개 시 로드·주입. 1.7의 '요약을 새 세션에 주입'과 같은 철학 — 기록이 기억을 대신한다.",
    "wrongs": [
     "<b>B:</b> 크래시는 세션 자체가 소실되거나 도구 결과가 stale해지는 사건 — 살아 있는 세션을 전제하는 --resume에 걸 수 없어. 절반의 진실.",
     "<b>C:</b> 컨텍스트를 키워도 4시간짜리 작업의 중단 위험은 그대로 + context rot으로 품질만 떨어져.",
     "<b>D:</b> 통짜 로그 덤프는 구조가 없어 — 90% 노이즈 속에서 lost in the middle로 핵심을 놓쳐. 매니페스트와 덤프의 차이가 핵심."
    ]
   },
   "principle": "기록이 기억을 대신한다"
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
    "good": "집계 숫자는 약한 구간을 가려 — 문서 유형·필드별로 쪼개고, 고신뢰 구간도 층화 표집으로 실측한 뒤에만 자동화. '정밀해 보이는 한 숫자'에 끌리는 습관을 겨눈 문제야.",
    "wrongs": [
     "<b>B:</b> 97%가 가리는 게 문제의 전부 — 특정 세그먼트가 71%면 그 문서 유형은 3%가 아니라 29%씩 틀린 채 자동 통과돼.",
     "<b>C:</b> 자기보고 신뢰도는 보정(labeled validation set) 전엔 대리지표일 뿐 — 미보정 점수로 라우팅부터 하는 건 순서가 반대. 절반의 진실.",
     "<b>D:</b> 인력 2배는 문제 정의를 회피 — 목표가 리뷰 축소인데 확대로 답하고, 세그먼트 갭은 여전히 미측정."
    ]
   },
   "principle": "집계는 가린다 — 층화로 보라"
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
    "good": "출처가 산문 속에 있으면 요약(손실 압축)마다 떨어져 나가 — claim↔source를 구조(필드)로 묶어야 압축을 견뎌. 5.1 case facts와 같은 원리의 출처 버전.",
    "wrongs": [
     "<b>B:</b> 프롬프트 지시는 확률적 — 다단 요약을 거치면 결국 또 떨어져. 구조로 강제해야 해. 절반의 진실.",
     "<b>C:</b> 끝에 붙는 소스 목록은 어느 주장(claim)이 어느 출처인지 연결이 없어 — attribution의 핵심이 빠져.",
     "<b>D:</b> 매 리포트 사람 후처리는 규모가 안 나오고, 사람도 어느 주장이 어느 출처인지 몰라 — 정보는 이미 소실됐어."
    ]
   },
   "principle": "출처는 구조로 묶어야 산다"
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
    "good": "출처는 구조로 묶여야 압축을 견디고(매핑 보존), 시점은 데이터로 있어야 2019 vs 2024를 모순으로 오독하지 않아. 산문·각오·재량은 전부 압축 한 번에 증발해.",
    "wrongs": [
     "<b>C:</b> 끝에 붙는 목록은 어느 주장이 어느 출처인지 연결이 없어 — attribution의 핵심 부재.",
     "<b>D:</b> 프롬프트 지시는 다단 요약에서 확률적으로 새 — 구조 강제가 정답.",
     "<b>E:</b> 임의 해소는 금지 — 충돌은 둘 다 주석 달아 보존이 원칙."
    ]
   },
   "principle": "출처는 구조로, 시점은 필수로"
  }
 ]
};
