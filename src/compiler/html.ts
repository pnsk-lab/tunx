import { proxyFetch } from '../proxy'

const HAS_URL_ATTRS: string[] = ['src', 'href']
const TUNX_RAW_ATTR_SIGNAL = 'tunx-raw-'

interface Opts {
  url: URL
}
export const transformHTML = async (html: string, opts: Opts) => {
  const dom = new DOMParser().parseFromString(html, 'text/html')

  const hasUrl: { elem: Element, attr: string }[] = []

  for (const attr of HAS_URL_ATTRS) {
    dom.querySelectorAll(`[${attr}]`).forEach(elem => {
      hasUrl.push({ elem, attr })
    })
  }

  const promises: Promise<void>[] = []
  for (const { elem, attr } of hasUrl) {
    const value = elem.getAttribute(attr)
    if (!value) {
      continue
    }
    let url: URL
    try {
      url = new URL(value, opts.url)
    } catch (_e) {
      continue
    }
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      continue
    }
    promises.push((async () => {
      const res = await proxyFetch(url)
      const newUrl = URL.createObjectURL(await res.blob())
      elem.setAttribute(`${TUNX_RAW_ATTR_SIGNAL}${attr}`, value)
      elem.setAttribute(attr, newUrl)
      console.log(elem)
    })())
  }
  await Promise.allSettled(promises)

  const result = new XMLSerializer().serializeToString(dom)
  console.log(result)
  return result
}

