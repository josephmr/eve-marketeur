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
    class: className,
  }: {
    title: string;
    orders: Array<MarketOrder>;
    class?: ClassValue;
  } = $props();

  function calculateTimeRemaining(order: MarketOrder): string {
    const endDate = addDays(new Date(order.issued), order.duration);
    const now = new Date();

    if (now >= endDate) {
      return "Expired";
    }

    const duration = intervalToDuration({ start: now, end: endDate });
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

<Card.Root class={cn("w-full max-w-5xl", className)}>
  <Card.Header>
    <Card.Title>{title}</Card.Title>
  </Card.Header>
  <Card.Content>
    <ScrollArea orientation="vertical" type="hover" class="h-96">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>Quantity</Table.Head>
            <Table.Head>Price</Table.Head>
            <Table.Head>Location ID</Table.Head>
            <Table.Head>Range</Table.Head>
            <Table.Head>Expires In</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {#each orders as order (order.orderId)}
            <Table.Row>
              <Table.Cell class="text-right">{order.volumeRemain}</Table.Cell>
              <Table.Cell class="text-right">{order.price}</Table.Cell>
              <Table.Cell>{order.locationId}</Table.Cell>
              <Table.Cell>{order.range}</Table.Cell>
              <Table.Cell>{calculateTimeRemaining(order)}</Table.Cell>
            </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>
    </ScrollArea>
  </Card.Content>
</Card.Root>
