<script>
  import Layout from "$lib/components/ui/layout/layout.svelte";
  import { getTypeInfoOrError } from "$lib/common.remote";

  let { children, params } = $props();
</script>

<Layout>
  {#snippet title()}
    Types
    {#if params.typeId}
      <span class="text-muted-foreground">
        > {(await getTypeInfoOrError(parseInt(params.typeId))).typeInfo
          .typeName}
      </span>
    {/if}
  {/snippet}

  {@render children?.()}
</Layout>
