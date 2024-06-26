<script lang="ts">
  import Omnibox from './components/Omnibox.svelte'
  import View from './components/View.svelte';

  let url: URL
</script>

<main class="h-[100dvh]">
  <div class="flex flex-col h-full">
    <div class="m-1">
      <Omnibox bind:url={url} />
    </div>
    <div class="grow">
      <View bind:url={url} />
    </div>
  </div>
</main>