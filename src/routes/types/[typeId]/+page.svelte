<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import OrderTable from "$lib/components/ui/order-table/order-table.svelte";
  import { getMarketOrders } from "./market.remote";
  import { getTypeInfo } from "$lib/common.remote";
  import MarketHistory from "./market-history.svelte";

  let { params } = $props();

  const time = new Date();
  const { typeInfo, marketGroup } = await getTypeInfo(parseInt(params.typeId));
  const orders = await getMarketOrders(typeInfo.typeID);
</script>

<Card.Root class="w-full max-w-xl">
  <Card.Header class="text-lg">
    <Card.Title>{typeInfo.typeName}</Card.Title>
  </Card.Header>
  <Card.Content>
    <img
      src={`https://images.evetech.net/types/${typeInfo.typeID}/icon?size=64`}
      alt={typeInfo.typeName}
      class="float-right"
    />
    <p>Type ID: {typeInfo.typeID}</p>
    {#if marketGroup}
      <p>Market Group: {marketGroup.marketGroupName}</p>
    {/if}
  </Card.Content>
</Card.Root>

<Card.Root class="w-full mt-2 min-w-200">
  <Card.Content class="w-full">
    <MarketHistory typeID={typeInfo.typeID} />
  </Card.Content>
</Card.Root>

<div class="flex flex-row items-center w-full flex-wrap gap-2 mt-2">
  <OrderTable title="Sell Orders" orders={orders.sell} {time} class="flex-1" />

  <OrderTable title="Buy Orders" orders={orders.buy} {time} class="flex-1" />
</div>
