<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import * as Table from "$lib/components/ui/table";
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import type { MarketOrder } from "$lib/server/api/esi";
  import { cn } from "$lib/utils.js";
  import type { ClassValue } from "svelte/elements";
  import { addDays, intervalToDuration, formatDuration } from "date-fns";

  let {
    title,
    orders,
    time,
    class: className,
  }: {
    title: string;
    orders: MarketOrder[];
    time: Date;
    class?: ClassValue;
  } = $props();

  function calculateTimeRemaining(order: MarketOrder): string {
    const endDate = addDays(new Date(order.issued), order.duration);

    if (time >= endDate) {
      return "Expired";
    }

    const duration = intervalToDuration({ start: time, end: endDate });
    const formatted = formatDuration(duration, {
      format: ["days", "hours", "minutes", "seconds"],
      delimiter: " ",
      zero: false,
    })
      .replace(/ days?/, "d")
      .replace(/ hours?/, "h")
      .replace(/ minutes?/, "m")
      .replace(/ seconds?/, "s");

    return formatted;
  }
</script>

<Card.Root class={cn(className)}>
  <Card.Header>
    <Card.Title>{title}</Card.Title>
  </Card.Header>
  <Card.Content>
    <ScrollArea orientation="vertical" type="hover" class="h-96">
      <Table.Root class="border-2 min-w-200" style="table-layout: fixed;">
        <Table.Header>
          <Table.Row>
            <Table.Head class="border-2 w-[15%]">Quantity</Table.Head>
            <Table.Head class="border-2 w-[10%]">Price</Table.Head>
            <Table.Head class="border-2 w-[40%]">Location</Table.Head>
            <Table.Head class="border-2 w-[10%]">Range</Table.Head>
            <Table.Head class="border-2 w-[15%]">Expires In</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {#each orders as order (order.orderId)}
            <Table.Row>
              <Table.Cell class="text-right border-2"
                >{order.volumeRemain.toLocaleString()}</Table.Cell
              >
              <Table.Cell class="text-right border-2"
                >{order.price.toLocaleString()}</Table.Cell
              >
              <Table.Cell class="border-2 overflow-hidden overflow-ellipsis"
                >{order.locationName}</Table.Cell
              >
              <Table.Cell class="border-2"
                >{order.range === "solarsystem"
                  ? "system"
                  : order.range}</Table.Cell
              >
              <Table.Cell class="border-2"
                >{calculateTimeRemaining(order)}</Table.Cell
              >
            </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>
    </ScrollArea>
  </Card.Content>
</Card.Root>
