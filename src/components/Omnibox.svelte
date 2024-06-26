<script lang="ts">
  let url: string = 'https://google.com/'

  export let onGoto: (url: URL) => void
</script>

<input
  type="url"
  placeholder="Enter URL..."
  bind:value={url}
  class="w-full p-1 rounded-sm border"
  on:keydown={(e) => e.code === 'Enter' && onGoto(new URL(url))}
/>
