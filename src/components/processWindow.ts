import type { BrowserContext } from "../constants"
import { proxyFetch } from "../proxy"

export const processWindow = (window: typeof globalThis & Window, ctx: BrowserContext) => {
  window.fetch = proxyFetch

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
  window.document.querySelectorAll('form').forEach(elem => {
    console.log(elem.method)
    const isGET = elem.method === 'GET' || !elem.method || elem.method === 'get'
    elem.addEventListener('submit', (e) => {
      const data = isGET ? new URLSearchParams() : new FormData()

      elem.querySelectorAll('input').forEach(input => {
        data.append(input.name, input.value)
      })
      console.log(data)

      if (isGET) {
        const postUrl = new URL(elem.action, ctx.url)
        postUrl.search = (data as URLSearchParams).toString()
        ctx.changeUrl(postUrl)
      }
      e.preventDefault()
    })
  })
  return
}
