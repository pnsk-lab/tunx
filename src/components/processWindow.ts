import type { BrowserContext } from "../constants"
import { proxyFetch } from "../proxy"
import * as clientElements from '../client-scripts/dom/elements'

export const processWindow = (window: typeof globalThis & Window, ctx: BrowserContext) => {
  window.__tunx = {
    processElements: clientElements,
    browserContext: ctx
  }
  window.navigator.sendBeacon = (url, data) => {
    proxyFetch(url, { method: 'POST', body: data })
    return true
  }

  window.fetch = proxyFetch

  for (const [name, proc] of Object.entries(clientElements)) {
    document.querySelectorAll(name).forEach(elem => {
      (proc as clientElements.ElementExtend<Element>)(elem, ctx)
    })
  }

  return
}
