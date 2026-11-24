/* Claude 설계자 과정 오프라인 저장
   인터넷이 될 때는 항상 서버의 최신 파일을 먼저 받아서 보여 줌. 새로고침 한 번이면 최신 화면이 나옴.
   받은 파일은 브라우저에 저장해 두고, 인터넷이 안 될 때만 저장본을 보여 줌.
   내용만 고쳐서 배포할 때는 이 파일을 고칠 필요 없음.
   파일을 추가하거나 삭제했을 때만 아래 ASSETS 목록을 고칠 것. */
const CACHE = "ccaf-v4";
const OLD_STYLE = ["ccaf-v1", "ccaf-v2", "ccaf-v3"];   /* 저장본을 먼저 보여 주던 예전 방식의 저장소 이름 */
const ASSETS = [
  "./", "./index.html",
  "./content/part0.js", "./content/part1.js", "./content/part1-test.js",
  "./content/part2.js", "./content/part3.js", "./content/part4.js",
  "./content/part5.js", "./content/part6.js", "./content/parte.js",
  "./content/exam-bank.js", "./content/exam-s12.js", "./content/exam-s34.js",
  "./content/appendix.js", "./content/mt-extra.js",
  "./content/p3-plus.js", "./content/gap-fix.js", "./content/exam-s56.js",
  "./content/open-p1.js", "./content/open-p2.js", "./content/open-p3.js",
  "./content/open-p4.js", "./content/open-p5.js", "./content/open-p6.js",
  "./content/basics.js",
  "./content/sprint.js", "./content/ko-gloss.js"
];

/* 설치: 서버에서 새로 받은 파일로 저장소를 채움 (브라우저의 임시 저장본을 쓰지 않음) */
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.all(ASSETS.map(u => c.add(new Request(u, {cache: "reload"})).catch(() => null))))
      .then(() => self.skipWaiting())
  );
});

/* 활성화: 예전 저장소를 지움.
   예전 방식에서 넘어오는 경우에는 열려 있는 화면이 예전 저장본이므로 한 번 자동으로 다시 불러옴. */
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => {
      const fromOld = keys.some(k => OLD_STYLE.includes(k));
      return Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
        .then(() => self.clients.claim())
        .then(() => fromOld ? self.clients.matchAll({type: "window"}) : [])
        .then(list => { list.forEach(c => { c.navigate(c.url).catch(() => null); }); });   /* 기다리지 않음. 기다리면 활성화가 끝나지 않음 */
    })
  );
});

/* 요청 처리: 서버에서 먼저 받음. 받은 파일은 저장소에 넣어 둠.
   인터넷이 끊겼거나 4초 안에 응답이 없으면 저장본을 보여 줌. */
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;   /* 폰트 CDN 등 외부는 건드리지 않음 */
  e.respondWith(
    caches.match(req).then(hit => {
      const net = fetch(req.url, {cache: "no-cache"}).then(res => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      });
      if (!hit) return net;
      return Promise.race([
        net.catch(() => hit),
        new Promise(done => setTimeout(() => done(hit), 4000))
      ]);
    })
  );
});
