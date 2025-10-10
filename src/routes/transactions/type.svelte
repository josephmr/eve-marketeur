<script lang="ts">
  import { getTypeInfo } from "$lib/common.remote";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import * as format from "$lib/format";

  interface Props {
    typeID: number;
  }

  let { typeID }: Props = $props();

  const item = $derived(await getTypeInfo(typeID));
</script>

{#if !item}
  <div>Unknown Type ID: {typeID}</div>
{:else}
  <Tooltip.Provider delayDuration={200}>
    <Tooltip.Root>
      <Tooltip.Trigger>
        <span
          class="underline decoration-dotted decoration-muted-foreground cursor-help"
          >{item.typeInfo.typeName}</span
        >
      </Tooltip.Trigger>
      <Tooltip.Content>
        <div class="flex">
          <img
            src={`https://images.evetech.net/types/${item.typeInfo.typeID}/icon?size=64`}
            alt={item.typeInfo.typeName}
            class="h-[64px] w-[64px] pr-2"
          />
          <div class="flex flex-col min-w-40">
            <div class="pb-1 font-bold">{item.typeInfo.typeName}</div>
            <div class="flex justify-between">
              <div>Type ID:&nbsp;</div>
              <div>{item.typeInfo.typeID}</div>
            </div>
            <div class="flex justify-between">
              <div>Group:&nbsp;</div>
              <div>{item.marketGroup?.marketGroupName}</div>
            </div>
            {#if item.typeInfo.volume}
              <div class="flex justify-between">
                <div>Volume:&nbsp;</div>
                <div>
                  {format.volume(item.typeInfo.volume)}
                </div>
              </div>
            {/if}
          </div>
        </div>
      </Tooltip.Content>
    </Tooltip.Root>
  </Tooltip.Provider>
  <a
    href={`/types/${item.typeInfo.typeID}`}
    class="icon-[streamline--expand-window-2] text-muted-foreground"
    aria-label="Open type details"
  ></a>
{/if}
