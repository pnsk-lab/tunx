<script lang="ts">
  let input: HTMLInputElement
  export let url: URL

  $: {
    if (url) {
      input.value = url.href
    }
  }
</script>

<input
  type="url"
  placeholder="Enter URL..."
  class="w-full p-1 rounded-sm border"
  bind:this={input}
  on:change={(e) => {
    url = new URL(e.currentTarget.value)
  }}
/>
