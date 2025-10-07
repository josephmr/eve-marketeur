<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";
  import { ModeWatcher } from "mode-watcher";
  import { setCharacterContext } from "$lib/context/character";

  let { data, children } = $props();

  if (data.characterID) {
    setCharacterContext({ characterID: data.characterID });
  }
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher defaultMode={"dark"} />
<div class="h-screen overflow-hidden">
  {@render children?.()}
</div>
