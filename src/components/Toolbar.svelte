<script lang="ts">
  import Settings from './Settings.svelte'

  let isShownSettings = false

  export let onEruda: () => void

  const onSettings = () => {
    isShownSettings = true
  }
</script>
{#if isShownSettings}
  <div class="w-full h-[100dvh] fixed top-0 left-0 bg-[#000a] p-5">
    <div class="bg-white w-full h-full rounded-md border">
      <Settings />
    </div>
  </div>
{/if}
<div class="grid grid-cols-2">
  <button on:click={onEruda} title="Open DevTools">🔧</button>
  <button on:click={onSettings} title="Open Settings">⚙️</button>
</div>
