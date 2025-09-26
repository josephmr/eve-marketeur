<script lang="ts">
  import type { PageProps } from "./$types";
  import * as Card from "$lib/components/ui/card";
  import * as Table from "$lib/components/ui/table";

  let { data }: PageProps = $props();
</script>

<Card.Root class="w-full max-w-xl">
  <Card.Header>
    <Card.Title>{data.typeInfo.typeName}</Card.Title>
  </Card.Header>
  <Card.Content>
    <p>Type ID: {data.typeInfo.typeId}</p>
  </Card.Content>
</Card.Root>

<Card.Root class="w-full max-w-5xl mt-6">
  <Card.Header>
    <Card.Title>Sell Orders</Card.Title>
  </Card.Header>
  <Card.Content class="overflow-x-auto">
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head>Price</Table.Head>
          <Table.Head>Quantity</Table.Head>
          <Table.Head>Issued</Table.Head>
          <Table.Head>Location ID</Table.Head>
          <Table.Head>Range</Table.Head>
          <Table.Head>Duration</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each data.orders.sell as orders (orders.order_id)}
          <Table.Row>
            <Table.Cell>{orders.price}</Table.Cell>
            <Table.Cell
              >{orders.volume_remain} / {orders.volume_total}</Table.Cell
            >
            <Table.Cell>{new Date(orders.issued).toLocaleString()}</Table.Cell>
            <Table.Cell>{orders.location_id}</Table.Cell>
            <Table.Cell>{orders.range}</Table.Cell>
            <Table.Cell>{orders.duration} days</Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </Card.Content>
</Card.Root>

<Card.Root class="w-full max-w-5xl mt-6">
  <Card.Header>
    <Card.Title>Buy Orders</Card.Title>
  </Card.Header>
  <Card.Content class="overflow-x-auto">
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head>Price</Table.Head>
          <Table.Head>Quantity</Table.Head>
          <Table.Head>Issued</Table.Head>
          <Table.Head>Location ID</Table.Head>
          <Table.Head>Range</Table.Head>
          <Table.Head>Duration</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each data.orders.buy as orders (orders.order_id)}
          <Table.Row>
            <Table.Cell>{orders.price}</Table.Cell>
            <Table.Cell
              >{orders.volume_remain} / {orders.volume_total}</Table.Cell
            >
            <Table.Cell>{new Date(orders.issued).toLocaleString()}</Table.Cell>
            <Table.Cell>{orders.location_id}</Table.Cell>
            <Table.Cell>{orders.range}</Table.Cell>
            <Table.Cell>{orders.duration} days</Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </Card.Content>
</Card.Root>
