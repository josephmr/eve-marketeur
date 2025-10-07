<script lang="ts">
  import { getCharacterInfo } from "$lib/common.remote";
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    title: Snippet;
  }
  let { children, title }: Props = $props();

  const characterInfo = await getCharacterInfo();
</script>

<div class="flex flex-col h-screen overflow-hidden">
  <header class="h-12 flex shrink-0 border-b justify-between pl-4">
    <div class="flex p-2 items-center">
      <h1 class="text-lg font-medium">
        {@render title()}
      </h1>
    </div>
    {#if characterInfo}
      <div class="flex items-center pr-1">
        <div class="pr-2 text-muted-foreground">
          <span class="">{characterInfo.name}</span>
        </div>
        <img
          class="h-10"
          src={`https://images.evetech.net/characters/${characterInfo.characterID}/portrait`}
          alt="Character portrait"
        />
      </div>
    {:else}
      <a href="/login" class="p-2">
        <img
          src={"https://web.ccpgamescdn.com/eveonlineassets/developers/eve-sso-login-black-small.png"}
          alt="Log in with EVE SSO"
        />
      </a>
    {/if}
  </header>

  <main class="flex-1 overflow-hidden">
    <ScrollArea orientation="vertical" class="h-full" type="auto">
      <div class="p-4 pt-2">
        {@render children()}
      </div>
    </ScrollArea>
  </main>
</div>
