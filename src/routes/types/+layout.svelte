<script>
  import Layout from "$lib/components/ui/layout/layout.svelte";
  import { page } from "$app/state";

  let { children } = $props();
  let typeName = $derived(page.data.typeInfo.typeName);
</script>

<Layout>
  {#snippet title()}
    Types
    {#if typeName}
      <span class="text-muted-foreground">
        > {typeName}
      </span>
    {/if}
  {/snippet}

  {@render children?.()}
</Layout>
