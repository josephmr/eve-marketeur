<script>
  import Layout from "$lib/components/ui/layout/layout.svelte";

  let { children } = $props();
</script>

<Layout>
  {#snippet title()}
    Transactions
  {/snippet}

  {@render children?.()}
</Layout>
