<script lang="ts">
  import * as Table from "$lib/components/ui/table";
  import * as format from "$lib/format";
  import Time from "./time.svelte";
  import { getTransactions } from "./transactions.remote";
  import Type from "./type.svelte";

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
        <Table.Cell class="border-2"
          ><Type typeID={transaction.typeId} /></Table.Cell
        >
        <Table.Cell class="border-2 text-right"
          >{format.quantity(transaction.quantity)}</Table.Cell
        >
        <Table.Cell class="border-2 text-right"
          >{format.price(transaction.unitPrice)}</Table.Cell
        >
        <Table.Cell class="border-2 text-right"
          >{format.price(
            transaction.unitPrice * transaction.quantity
          )}</Table.Cell
        >
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
