<script lang="ts">
  import { settings } from '../store'
</script>

<div class="w-full h-full p-2">
  <div class="flex justify-between">
    <div class="text-3xl">Settings</div>
    <button class="font-mono text-2xl" on:click={() => location.reload()}>x</button>
  </div>
  <div>
    <div>
      <label>
        Proxy URL:
        <input class="p-1 m-1 rounded-full border" type="url" bind:value={$settings.proxyURL} placeholder="https://tunx-api.deno.dev/proxy" />
      </label>
    </div>
  </div>
</div>
