const CACHE='mapso-alignment-offline-v18';
const CORE=['./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{
  e.waitUntil((async()=>{
    const cache=await caches.open(CACHE);
    await cache.addAll(CORE.map(u=>new Request(u,{cache:'reload'})));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate',e=>{
  e.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k.startsWith('mapso-alignment-offline-')&&k!==CACHE).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET')return;
  const u=new URL(req.url);
  if(u.origin!==self.location.origin)return;
  if(req.mode==='navigate'){
    e.respondWith((async()=>{
      const cache=await caches.open(CACHE);
      // Read locally before trying the network: essential for iPhone offline starts.
      const local=await cache.match('./index.html');
      if(local)return local;
      try{const res=await fetch(req);if(res.ok)await cache.put('./index.html',res.clone());return res}
      catch(err){return new Response('MAPSO offline installation is incomplete. Connect to the internet and reopen the app.',{status:503,headers:{'Content-Type':'text/plain'}})}
    })());
    return;
  }
  e.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    const cached=await cache.match(req,{ignoreSearch:true});
    if(cached)return cached;
    return fetch(req);
  })());
});