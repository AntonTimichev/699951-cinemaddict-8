const refreshCache = async (request, response) => {
  if (request.method === 'PUT' || request.method === 'POST') return;
  const cache = await caches.open(`STATIC_V1.0`);
  return cache.put(request, response.clone());
};

self.addEventListener(`install`, (evt) => {
  const openCache = caches.open(`STATIC_V1.0`)
    .then((cache) => {
      return cache.addAll([
        `https://fonts.gstatic.com/s/opensans/v16/mem5YaGs126MiZpBA-UN7rgOVuhpOqc.woff2`,
        `/css`,
        `/images`,
        `/index.html`,
      ]);
  });
  evt.waitUntil(openCache);
});

self.addEventListener(`activate`, () => {
  console.log(`sw activated`);
});

self.addEventListener(`fetch`, (evt) => {
  evt.respondWith(async function() {
    try {
      const response = await fetch(evt.request);
      await refreshCache(evt.request, response);
      return response;
    } catch (err) {
      return caches.match(evt.request);
    }
  }());
});
