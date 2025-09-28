<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";
  import { ModeWatcher } from "mode-watcher";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher defaultMode={"dark"} />
<div class="min-h-screen p-2">
  {@render children?.()}
</div>
