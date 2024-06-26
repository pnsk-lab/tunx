import type { BrowserContext } from "../constants"

export const processWindow = (window: typeof globalThis & Window, ctx: BrowserContext) => {
  // Inject eruda
  if ('ontouchstart' in window) {
    window.eval(`
      (() => {
        const script = document.createElement('script');
        script.src="https://cdn.jsdelivr.net/npm/eruda";
        document.body.append(script);
        script.onload = function () { eruda.init(); } 
      })()
    `)
  }

  window.document.querySelectorAll('a').forEach(elem => {
    let url: URL
    try {
      const href = elem.href
      url = new URL(href, ctx.url)
    } catch (_e) {
      return
    }

    const onclick = elem.getAttribute('onclick')
    const onclickFn = onclick && new Function('event', onclick)
    elem.removeAttribute('onclick')
    elem.removeAttribute('href')
    elem.onclick = (event) => {
      onclickFn && onclickFn(event)
      ctx.changeUrl(url)
    }
  })

  return
}
