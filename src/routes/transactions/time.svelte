<script lang="ts">
  import * as Tooltip from "$lib/components/ui/tooltip";

  let { time }: { time: Date } = $props();
</script>

<Tooltip.Provider delayDuration={200}>
  <Tooltip.Root>
    <Tooltip.Trigger>
      <span
        class="underline decoration-dotted decoration-muted-foreground cursor-help"
        >{time.toLocaleDateString(undefined, { timeZone: "UTC" })}</span
      >
    </Tooltip.Trigger>
    <Tooltip.Content>
      <span>{time.toISOString()}</span>
    </Tooltip.Content>
  </Tooltip.Root>
</Tooltip.Provider>
