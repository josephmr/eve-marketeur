<script lang="ts">
  import * as Table from "$lib/components/ui/table";
  import Time from "./time.svelte";
  import { getTransactions } from "./transactions.remote";

  const transactions = await getTransactions();
</script>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head class="border-2">Date</Table.Head>
      <Table.Head class="border-2">Type</Table.Head>
      <Table.Head class="border-2">Quantity</Table.Head>
      <Table.Head class="border-2">Price</Table.Head>
      <Table.Head class="border-2">Total</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each transactions as transaction (transaction.transactionId)}
      <Table.Row>
        <Table.Cell class="border-2"
          ><Time time={transaction.date} /></Table.Cell
        >
        <Table.Cell class="border-2">{transaction.typeId}</Table.Cell>
        <Table.Cell class="border-2">{transaction.quantity}</Table.Cell>
        <Table.Cell class="border-2"
          >{transaction.unitPrice.toFixed(2)}</Table.Cell
        >
        <Table.Cell class="border-2"
          >{(transaction.unitPrice * transaction.quantity).toFixed(
            2
          )}</Table.Cell
        >
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
