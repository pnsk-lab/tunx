<script lang="ts">
  import Omnibox from './components/Omnibox.svelte'
  import View from './components/View.svelte'
  import Toolbar from './components/Toolbar.svelte'
  import BrowserController from './components/BrowserController.svelte';

  let url: URL
  let window: (Window & typeof globalThis) | undefined
</script>

<main class="h-[100dvh]">
  <div class="flex flex-col h-full">
    <div class="m-1 flex">
      <BrowserController onReload={() => {
        
      }} />
      <div class="grow">
        <Omnibox bind:url={url} />
      </div>
      <Toolbar onEruda={async () => {
        const code = await fetch('https://cdn.jsdelivr.net/npm/eruda').then(res => res.text())
        const initCode = `(async () => {
          ${code}
        })().then(() => eruda.init())`
        window?.eval(initCode)
      }} />
    </div>
    <div class="grow">
      <View bind:url={url} bind:window={window} />
    </div>
  </div>
</main>