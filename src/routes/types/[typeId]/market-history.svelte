<script lang="ts">
  import {
    RectY,
    Line,
    Plot,
    Pointer,
    Dot,
    AxisX,
    Text,
    RuleX,
    RuleY,
  } from "svelteplot";
  import { getMarketHistory } from "../../types/[typeId]/market.remote";
  import { browser } from "$app/environment";
  import type { MarketHistory } from "$lib/server/api/esi";
  import AreaY from "svelteplot/marks/AreaY.svelte";

  let { typeID }: { typeID: number } = $props();

  const data = await getMarketHistory(typeID);

  let sel: MarketHistory[] | undefined = $state(undefined);
</script>

<div class="overflow-hidden h-[530px]">
  {#if browser}
    <Plot
      frame
      height={120}
      y={{ axis: "right" }}
      margin={{ left: 40, right: 40 }}
    >
      <AxisX interval="month" />
      <RectY {data} x="date" y="volume" interval="day" fill="var(--chart-2)" />
      <Pointer {data} x="date" onupdate={(d) => (sel = d)} />
      {#if sel}
        <Text
          data={sel}
          textAnchor="end"
          frameAnchor="top-right"
          dx={-10}
          dy={10}
          text={(d) => `${d.volume.toLocaleString()}`}
        />
        <RectY data={sel} x="date" y="volume" interval="day" fil="white" />
      {/if}
    </Plot>
    <Plot frame y={{ nice: true }} margin={{ left: 40, right: 40 }}>
      <AxisX interval="month" />
      <Line {data} x="date" y="average" />
      <AreaY {data} x="date" y1="lowest" y2="highest" opacity={0.2} />
      {#if sel}
        <Text
          data={sel}
          textAnchor="end"
          frameAnchor="top-right"
          dx={-10}
          dy={10}
          text={(d) =>
            `${d.average.toLocaleString(undefined, {
              maximumFractionDigits: d.average > 1000 ? 0 : 2,
              minimumFractionDigits: d.average > 1000 ? 0 : 2,
            })}`}
        />
        <Text
          data={sel}
          textAnchor="begin"
          frameAnchor="top-left"
          dx={10}
          dy={10}
          text={(d) => `${d.date.toLocaleDateString()}`}
        />
        <RuleX data={sel} x="date" opacity={0.2} />
        <RuleY data={sel} y="average" opacity={0.2} />
        <Dot data={sel} x="date" y="average" fill />
      {/if}
      <Pointer {data} x="date" onupdate={(d) => (sel = d)} />
    </Plot>
  {/if}
</div>
