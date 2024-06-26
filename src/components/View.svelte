<script lang='ts'>
  import { createFetch } from '@pnsk-lab/tunx'
  import { transformHTML } from '../compiler/html';
  import { processWindow } from './processWindow';
  import { REDIRECT_STATUS_CODES, type BrowserContext } from '../constants';

  const proxyFetch = createFetch('https://tunx-api.deno.dev/proxy')

  export let url: URL

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

    if (mimeType?.startsWith('text/html')) {
      iframe.onload = () => {
        const window = iframe.contentWindow as (Window & typeof globalThis)
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
