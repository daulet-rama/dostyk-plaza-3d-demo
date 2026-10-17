// [K1-KU] sw.js панели Dostyk Plaza (сгенерирован scripts/build-kiosk.mjs, выкладка 7.2.0-8c84ffe-mvc3lxss).
'use strict';
const BUILD = "7.2.0-8c84ffe-mvc3lxss";
const ASSETS = 'dp-kiosk-assets';
const SHELL = 'dp-kiosk-shell-' + BUILD;
const PRECACHE = ["./","assets/BufferGeometryUtils-DdSxdpwN.js","assets/building-D4AaO1cx.js","assets/car-demo-BnXodaIR.js","assets/car-demo-BXvcr6j1.css","assets/car-ui-CVogfiCo.css","assets/car-ui-DAvNtrm3.js","assets/dist-DVTxHhsu.js","assets/en-7Mb6Oa6_.js","assets/exterior-build-BMoeg5AG.js","assets/fflate.module-DVTTPdyi.js","assets/floors-BbD6bjKP.js","assets/floors-build-Ba4aNpzU.js","assets/floors-detail-Cp_OyH64.js","assets/floors-fx-CTtWt6jB.js","assets/floors-p1-IrHwl1uF.js","assets/floors-ui-BsX6JLO6.js","assets/floors-ui-CPlsiBle.css","assets/geometry-DRNxi0sX.js","assets/i18n-Bvqx7h9N.js","assets/index-CTxzppzT.js","assets/kf-floors-Beduag6e.js","assets/kf-marker-Cqf-tpO-.js","assets/kf-nopeople-KV6YdULu.js","assets/kf-parking-CAs_4TBT.js","assets/kf-reflect-1HHuovYv.js","assets/kiosk-BqatIme-.js","assets/kiosk-Dy6i7fWk.css","assets/kiosk-tier-ClG2iUZ-.js","assets/kk-D0TNTk_l.js","assets/kx-city-Bded1wbK.js","assets/kx-core-BlErLLa4.js","assets/kx-env-BPNSwybz.js","assets/kx-facade-DtnNJyFW.js","assets/kx-ground-B2y3tThM.js","assets/kx-look-CS53crqX.js","assets/kx-sky-OLrd0mPJ.js","assets/kx-street-CLUvHp4Y.js","assets/l1-CfhtW5EL.js","assets/l1-runtime-CMlW37Hn.js","assets/l2-runtime-CCYFUggt.js","assets/l3-runtime-B-f2f6vp.js","assets/labels-B1hHNUTL.css","assets/labels-CRPb1Yu0.js","assets/level-ids-D727EiMK.js","assets/links-BweXbzLD.js","assets/loader-gltf-Bq3qfP95.js","assets/main-app-DgZHBpMZ.js","assets/main-batch-BFs-eg84.js","assets/main-data-floors-Cca6_8gh.js","assets/main-late-CcidTnVJ.js","assets/main-svg-plan-DWMUyFp6.js","assets/onest-cyrillic-400-normal-BQq8x-Ju.woff","assets/onest-cyrillic-400-normal-BTdD9fLi.woff2","assets/onest-cyrillic-500-normal-BMFE-GJD.woff","assets/onest-cyrillic-500-normal-CJRUgmys.woff2","assets/onest-cyrillic-600-normal-BZYKVyuq.woff2","assets/onest-cyrillic-600-normal-DXk93W_-.woff","assets/onest-cyrillic-ext-400-normal-C0aKJzIG.woff2","assets/onest-cyrillic-ext-400-normal-CV3RJNZo.woff","assets/onest-cyrillic-ext-500-normal-BRptT_Q-.woff2","assets/onest-cyrillic-ext-500-normal-C2Nf5dsb.woff","assets/onest-cyrillic-ext-600-normal-akDnvndp.woff2","assets/onest-cyrillic-ext-600-normal-DARnoHZf.woff","assets/onest-latin-400-normal-9AYXx_QC.woff2","assets/onest-latin-400-normal-RaMPE1jb.woff","assets/onest-latin-500-normal-2-RsuwM3.woff2","assets/onest-latin-500-normal-CVP923du.woff","assets/onest-latin-600-normal-D88KJsY0.woff","assets/onest-latin-600-normal-DM19Lk_j.woff2","assets/p1-runtime-84oUvvV-.js","assets/parking-build-D5bZp5lp.js","assets/parking-cars-bX3GxDfU.js","assets/parking-D9_7Hca8.js","assets/perf-panel-Xvz7mLBs.js","assets/poly-ty6ODsPX.js","assets/popular-BWlhKhyV.js","assets/post-DMOTNL_h.js","assets/present-Iw_D8ffh.js","assets/route-api-i7dZ2fp8.js","assets/route-demo-C6FeivLV.js","assets/route-demo-DSMeQYIp.css","assets/route-runtime-R9KmG9DS.js","assets/route-ui-BzRQhgyi.css","assets/route-ui-yStJ-dHa.js","assets/runtime-BB8UH2J3.js","assets/runtime-BC2YV6Mh.js","assets/ui-87Z2pmNl.js","assets/walk-ui-6Jg2NV5Q.js","assets/walk-ui-BTxc0w6L.css","demo/manifest.json","index.html","kiosk/credits.json","kiosk/manifest.json","kiosk.html","model/dostyk-plaza.core.glb","model/dostyk-plaza.env.glb"];
const scopePath = () => new URL('./', self.registration.scope).pathname;
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil((async () => {
    const c = await caches.open(SHELL);
    // по одному: отсутствующий файл не срывает установку
    await Promise.all(PRECACHE.map(p => fetch(new URL(p, self.registration.scope).href, { cache: 'no-cache' }).then(r => (r.ok ? c.put(new URL(p, self.registration.scope).href, r) : null)).catch(() => null)));
  })());
});
self.addEventListener('activate', e => e.waitUntil((async () => {
  for (const k of await caches.keys()) if (k.startsWith('dp-kiosk-shell-') && k !== SHELL) await caches.delete(k);
  await self.clients.claim();
})()));
async function cacheFirst(req) {
  const c = await caches.open(ASSETS);
  const hit = await c.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok && res.type === 'basic') c.put(req, res.clone()).catch(() => {});
  return res;
}
async function networkFirst(req) {
  const c = await caches.open(SHELL);
  try {
    const res = await fetch(req);
    if (res.ok && res.type === 'basic') c.put(req, res.clone()).catch(() => {});
    return res;
  } catch (err) {
    const hit = (await c.match(req)) || (req.mode === 'navigate' ? (await c.match(new URL('./', self.registration.scope).href, { ignoreSearch: true })) || (await c.match(new URL('./kiosk.html', self.registration.scope).href, { ignoreSearch: true })) : null);
    if (hit) return hit;
    // старые выкладки: тот же файл мог остаться в прежнем кэше страницы
    for (const k of await caches.keys()) if (k.startsWith('dp-kiosk-shell-')) { const h = await (await caches.open(k)).match(req); if (h) return h; }
    throw err;
  }
}
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.origin !== location.origin || !u.pathname.startsWith(scopePath())) return;
  if (r.headers.has('range')) return;
  const rel = u.pathname.slice(scopePath().length);
  if (u.searchParams.has('v') && /^(kiosk|demo)\//.test(rel)) e.respondWith(cacheFirst(r));
  else e.respondWith(networkFirst(r));
});
// после прогрева: убрать из кэша активов файлы, которых нет в текущих манифестах
self.addEventListener('message', e => {
  if (!e.data || e.data.type !== 'warm') return;
  e.waitUntil((async () => {
    const keep = new Set();
    for (const m of ['kiosk/manifest.json', 'demo/manifest.json']) {
      try {
        const res = await networkFirst(new Request(new URL(m, self.registration.scope).href, { cache: 'no-cache' }));
        const j = await res.json();
        for (const f of j.files || []) {
          const root = /^k\//.test(f.path) ? 'kiosk/' + f.path.slice(2) : 'demo/' + f.path;
          keep.add(new URL(root, self.registration.scope).pathname + '?v=' + String(f.sha256).slice(0, 10));
        }
      } catch (err) { return; }   // манифест не прочитан — ничего не трогаем
    }
    const c = await caches.open(ASSETS);
    for (const req of await c.keys()) { const u = new URL(req.url); if (!keep.has(u.pathname + u.search)) await c.delete(req); }
  })());
});
