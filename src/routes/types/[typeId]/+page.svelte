<script lang="ts">
  import type { PageProps } from "./$types";
  import * as Card from "$lib/components/ui/card";
  import * as Chart from "$lib/components/ui/chart";
  import OrderTable from "$lib/components/ui/order-table/order-table.svelte";
  import { scaleUtc } from "d3-scale";
  import { LineChart } from "layerchart";
  import { getMarketHistory } from "./page.remote";

  let { data }: PageProps = $props();

  const chartConfig = {
    average: {
      label: "Average",
      color: "var(--chart-1)",
    },
  } satisfies Chart.ChartConfig;
</script>

<Card.Root class="w-full max-w-xl">
  <Card.Header class="text-lg">
    <Card.Title>{data.typeInfo.typeName}</Card.Title>
  </Card.Header>
  <Card.Content>
    <p>Type ID: {data.typeInfo.typeId}</p>
    {#if data.marketGroup}
      <p>Market Group: {data.marketGroup.marketGroupName}</p>
    {/if}
  </Card.Content>
</Card.Root>

<Card.Root class="w-full mt-2 p-4">
  <Card.Content>
    <Chart.Container config={chartConfig} class="w-full h-96">
      {#await getMarketHistory(data.typeInfo.typeId) then history}
        <LineChart
          data={history}
          axis
          x={(d) => new Date(d.date)}
          xScale={scaleUtc()}
          series={[
            {
              key: "average",
              label: "Average",
              color: chartConfig.average.color,
            },
          ]}
          props={{
            xAxis: {
              format: (v: Date) =>
                v.toLocaleDateString("en-US", { month: "short" }),
            },
            yAxis: {
              format: (v: number) =>
                v >= 1e6
                  ? `$${(v / 1e6).toFixed(1)}M`
                  : v >= 1e3
                    ? `$${(v / 1e3).toFixed(1)}K`
                    : `$${v.toFixed(2)}`,
              ticks: 5,
            },
          }}
        />
      {/await}
    </Chart.Container>
  </Card.Content>
</Card.Root>

<div class="flex flex-row items-center w-full flex-wrap gap-2 mt-2">
  <OrderTable
    title="Sell Orders"
    orders={data.orders.sell}
    time={data.time}
    class="flex-1"
  />

  <OrderTable
    title="Buy Orders"
    orders={data.orders.buy}
    time={data.time}
    class="flex-1"
  />
</div>
