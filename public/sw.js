self.addEventListener('fetch', /** @param {FetchEvent} evt */(evt) => {
  const req = evt.request

  const url = new URL(req.url)

  if (!url.pathname.startsWith('/_tunx/')) {
    return
  }

  evt.respondWith((async () => {
    const path = '/src/sw/main.ts'
    const mod = await import(path)

    return await mod.default(req)
  })())
})

self.addEventListener('install', () => {
  self.skipWaiting()
})