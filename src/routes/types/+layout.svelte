<script>
  import Layout from "$lib/components/ui/layout/layout.svelte";
  import { getTypeInfo } from "$lib/common.remote";

  let { children, params } = $props();
</script>

<Layout>
  {#snippet title()}
    Types
    {#if params.typeId}
      <span class="text-muted-foreground">
        > {(await getTypeInfo(parseInt(params.typeId))).typeInfo.typeName}
      </span>
    {/if}
  {/snippet}

  {@render children?.()}
</Layout>
