<script>
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import { page } from "$app/state";

  let { children } = $props();
  let typeName = $derived(page.data.typeInfo.typeName);
</script>

<header class="h-12 p-2 pl-4 flex shrink-0 border-b">
  <div class="flex w-full items-center">
    <h1 class="text-lg font-medium">
      Types
      {#if typeName}
        <span class="text-muted-foreground">
          > {typeName}
        </span>
      {/if}
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
