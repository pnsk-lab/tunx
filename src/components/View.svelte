<script lang='ts'>
  import { transformHTML } from '../compiler/html';
  import { processWindow } from './processWindow';
  import { REDIRECT_STATUS_CODES, type BrowserContext } from '../constants';
  import { createFetchWrapped } from '../proxy';

  const proxyFetch = createFetchWrapped()

  export let url: URL
  export let window: (Window & typeof globalThis) | undefined

  let iframe: HTMLIFrameElement
  let iframeParentUrl = '/internal/page.html'

  const context: BrowserContext = {
    get url () {
      return url
    },
    changeUrl (newUrl: URL) {
      url = newUrl
    }
  }
  async function access () {
    const res = await proxyFetch(url)
    const mimeType = res.headers.get('content-type')

    if (mimeType?.startsWith('text/html') || mimeType?.startsWith('application/binary') || !mimeType) {
      iframe.onload = () => {
        const contentWindow = iframe.contentWindow as (Window & typeof globalThis)
        window = contentWindow
        processWindow(window, context)
        if (REDIRECT_STATUS_CODES.has(res.status)) {
          const location = res.headers.get('location')
          if (location) {
            url = new URL(location, url)
          }
        }
      }
      const html = await res.text()
      const transformed = await transformHTML(html, context)
      iframeParentUrl = URL.createObjectURL(new Blob([transformed], { type: 'text/html' }))
    } else {
      iframeParentUrl = URL.createObjectURL(await res.blob())
    }
  }

  $: {
    if (url) {
      access()
    }
  }
</script>
<div class="w-full h-full p-2">
  <iframe
    src={iframeParentUrl}
    title="Tunx"
    class="w-full h-full border"
    bind:this={iframe}></iframe>
</div>
