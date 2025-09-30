<script lang="ts">
  import type { PageProps } from "./$types";
  import * as Card from "$lib/components/ui/card";
  import * as Chart from "$lib/components/ui/chart";
  import OrderTable from "$lib/components/ui/order-table/order-table.svelte";
  import { scaleBand, scaleUtc } from "d3-scale";
  import { BarChart, LineChart } from "layerchart";
  import { getMarketHistory } from "./page.remote";

  let { data }: PageProps = $props();

  const chartConfig = {
    average: {
      label: "Average",
      color: "var(--chart-1)",
    },
    volume: {
      label: "Volume",
      color: "var(--chart-2)",
    },
  } satisfies Chart.ChartConfig;
</script>

<Card.Root class="w-full max-w-xl">
  <Card.Header class="text-lg">
    <Card.Title>{data.typeInfo.typeName}</Card.Title>
  </Card.Header>
  <Card.Content>
    <p>Type ID: {data.typeInfo.typeID}</p>
    {#if data.marketGroup}
      <p>Market Group: {data.marketGroup.marketGroupName}</p>
    {/if}
  </Card.Content>
</Card.Root>

<Card.Root class="w-full mt-2 p-4">
  <Card.Content class="w-full h-96 grid">
    {#await getMarketHistory(data.typeInfo.typeID) then history}
      <div class="flex flex-col" style="grid-area: 1/1;">
        <div class="flex-1"></div>
        <Chart.Container config={chartConfig} class="w-full h-32">
          <BarChart
            data={history}
            axis={true}
            grid={false}
            yNice
            x={(d) => new Date(d.date)}
            xScale={scaleBand().padding(0.2)}
            series={[
              {
                key: "volume",
                label: "Volume",
                color: chartConfig.volume.color,
              },
            ]}
            props={{
              bars: { radius: 1 },
              xAxis: {
                format: () => "",
              },
              yAxis: {
                placement: "right",
                format: (v: number) =>
                  v >= 1e6
                    ? `${(v / 1e6).toFixed(0)}M`
                    : v >= 1e3
                      ? `${(v / 1e3).toFixed(0)}K`
                      : `${v.toFixed(0)}`,
                ticks: 3,
              },
            }}
          />
        </Chart.Container>
      </div>
      <Chart.Container
        config={chartConfig}
        class="w-full h-96"
        style="grid-area: 1/1;"
      >
        <LineChart
          data={history}
          axis
          yNice
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
            spline: {
              strokeWidth: 2,
            },
            highlight: {
              points: {
                r: 4,
                motion: "none",
              },
            },
            xAxis: {
              format: (v: Date) =>
                v.toLocaleDateString("en-US", { month: "short" }),
              ticks: Math.max(3, history.length / 30),
            },
            yAxis: {
              format: (v: number) =>
                v >= 1e6
                  ? `${(v / 1e6).toFixed(1)}M`
                  : v >= 1e3
                    ? `${(v / 1e3).toFixed(1)}K`
                    : `${v.toFixed(2)}`,
              ticks: 5,
            },
          }}
        >
          {#snippet tooltip()}
            <Chart.Tooltip
              labelFormatter={(d) =>
                d.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
            >
              {#snippet formatter({ item })}
                <div class="flex flex-col">
                  <div>
                    Average: <span>{item.payload.average.toLocaleString()}</span
                    >
                  </div>
                  <div>
                    Volume: <span>{item.payload.volume.toLocaleString()}</span>
                  </div>
                </div>
              {/snippet}
            </Chart.Tooltip>
          {/snippet}
        </LineChart>
      </Chart.Container>
    {/await}
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
