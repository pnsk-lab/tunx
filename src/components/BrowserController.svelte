<script lang="ts">
  import { get } from 'svelte/store';
  import { isLoading } from '../store'

  export let onReload: () => void
</script>
<div>
  <button class="text-2xl" on:click={() => {
    onReload()
  }}>
    {#if $isLoading}
      ✖
    {:else}
      🌀
    {/if}
  </button>
</div>