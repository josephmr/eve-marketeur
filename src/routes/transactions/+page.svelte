<script lang="ts">
  import { getTransactions } from "./transactions.remote";
</script>

{#each await getTransactions() as transaction}
  <div class="border p-2 m-2">
    <div>Type ID: {transaction.typeId}</div>
  </div>
{/each}
