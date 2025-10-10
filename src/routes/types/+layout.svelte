<script>
  import Layout from "$lib/components/ui/layout/layout.svelte";
  import { getTypeInfoOrError } from "$lib/common.remote";

  let { children, params } = $props();

  const typeId = $derived(Number(params.typeId));
</script>

<Layout>
  {#snippet title()}
    Types
    {#if !Number.isNaN(typeId)}
      {console.log(params.typeId)}
      <span class="text-muted-foreground">
        > {(await getTypeInfoOrError(typeId)).typeInfo.typeName}
      </span>
    {/if}
  {/snippet}

  {@render children?.()}
</Layout>
