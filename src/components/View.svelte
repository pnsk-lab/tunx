<script lang='ts'>
  import { createFetch } from '@pnsk-lab/tunx'
  import { transformHTML } from '../compiler/html';

  const proxyFetch = createFetch('https://tunx-api.deno.dev/proxy')

  export let url: URL

  let iframe: HTMLIFrameElement
  let iframeParentUrl = ''

  async function access (url: URL) {
    const res = await proxyFetch(url)
    const mimeType = res.headers.get('content-type')

    if (mimeType?.startsWith('text/html')) {
      iframe.onload = () => {
        const window = iframe.contentWindow as (Window & typeof globalThis)
        console.log(window.eval(`
        var script = document.createElement('script');
        script.src="https://cdn.jsdelivr.net/npm/eruda";
        document.body.append(script);
        script.onload = function () { eruda.init(); }
        `))
      }
      const html = await res.text()
      const transformed = await transformHTML(html, { url })
      iframeParentUrl = URL.createObjectURL(new Blob([transformed], { type: 'text/html' }))
    } else {
      iframeParentUrl = URL.createObjectURL(await res.blob())
    }
  }
  $: access(url)
</script>
<div class="w-full h-full p-2">
  <iframe
    src={iframeParentUrl}
    title="Tunx"
    class="w-full h-full border"
    bind:this={iframe}></iframe>
</div>
