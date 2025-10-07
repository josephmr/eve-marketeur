<script lang="ts">
  import { getCharacterInfo } from "$lib/common.remote";
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import { getCharacterContext } from "$lib/context/character";
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    title: Snippet;
  }
  let { children, title }: Props = $props();

  const characterContext = getCharacterContext();
</script>

<div class="flex flex-col">
  <header class="h-12 flex shrink-0 border-b justify-between pl-4">
    <div class="flex p-2 items-center">
      <h1 class="text-lg font-medium">
        {@render title()}
      </h1>
    </div>
    {#if characterContext}
      <div class="flex items-center">
        {#await getCharacterInfo(characterContext.characterID) then characterInfo}
          <div class="pr-2 text-muted-foreground">
            <span class="">{characterInfo?.name}</span>
          </div>
        {/await}
        <img
          class="h-10"
          src={`https://images.evetech.net/characters/${characterContext.characterID}/portrait`}
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
    <ScrollArea orientation="both" class="h-full" type="auto">
      <div class="p-4 pt-2">
        {@render children()}
      </div>
    </ScrollArea>
  </main>
</div>
