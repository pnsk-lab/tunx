<script lang="ts">
  import Omnibox from './components/Omnibox.svelte'
    import View from './components/View.svelte';

  let url: URL

  const goUrl = (userUrl: URL) => {
    url = userUrl
  }
</script>

<main class="h-[100dvh]">
  <div class="flex flex-col h-full">
    <div class="m-1">
      <Omnibox onGoto={goUrl} />
    </div>
    <div class="grow">
      <View bind:url={url} />
    </div>
  </div>
</main>