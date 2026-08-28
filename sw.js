/* CCA-F ACADEMY 오프라인 캐시
   한 번 접속하면 사이트 전체를 브라우저에 저장해, 이후 인터넷이 없어도 같은 주소로 열림.
   내용을 갱신해 배포할 때는 아래 CACHE 뒤 숫자를 1 올릴 것. */
const CACHE = "ccaf-v2";
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
  "./content/sprint.js", "./content/ko-gloss.js"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.all(ASSETS.map(u => c.add(u).catch(() => null))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* 캐시를 먼저 보여주고, 뒤에서 조용히 최신본을 받아 둠.
   그래서 오프라인에서도 즉시 열리고, 갱신본은 다음 접속 때 반영됨. */
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;   /* 폰트 CDN 등 외부는 건드리지 않음 */
  e.respondWith(
    caches.match(req).then(hit => {
      const net = fetch(req).then(res => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
