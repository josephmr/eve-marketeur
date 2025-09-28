<script lang="ts">
  import type { PageProps } from "./$types";
  import * as Card from "$lib/components/ui/card";
  import OrderTable from "$lib/components/ui/order-table/order-table.svelte";

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

<OrderTable
  title="Sell Orders"
  orders={data.orders.sell}
  time={data.time}
  class="mt-2"
/>

<OrderTable
  title="Buy Orders"
  orders={data.orders.buy}
  time={data.time}
  class="mt-2"
/>
