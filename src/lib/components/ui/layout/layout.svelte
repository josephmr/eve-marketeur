<script lang="ts">
  import type { Snippet } from "svelte";
  import { ScrollArea } from "$lib/components/ui/scroll-area";

  interface Props {
    children: Snippet;
    title: Snippet;
  }

  let { children, title }: Props = $props();
</script>

<header class="h-12 p-2 pl-4 flex shrink-0 border-b">
  <div class="flex w-full items-center">
    <h1 class="text-lg font-medium">
      {@render title()}
    </h1>
  </div>
</header>

<main class="flex-1 overflow-hidden">
  <ScrollArea orientation="both" class="h-full" type="auto">
    <div class="p-4 pt-2">
      {@render children()}
    </div>
  </ScrollArea>
</main>
