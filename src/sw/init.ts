export async function initSW () {
  const register = () => navigator.serviceWorker.register('/sw.js', {
    scope: '/',
    type: 'module'
  })

  await (await register()).update()
}