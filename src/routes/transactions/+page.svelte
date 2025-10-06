<script lang="ts">
  import type { PageProps } from "./$types";
  import { getTransactions } from "./page.remote";

  let { data }: PageProps = $props();
</script>

{#await getTransactions() then transactions}
  {#each transactions as transaction}
    <div class="border p-2 m-2">
      <div>Type ID: {transaction.typeId}</div>
    </div>
  {/each}
{/await}
