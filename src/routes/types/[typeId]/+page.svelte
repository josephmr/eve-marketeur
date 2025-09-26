<script lang="ts">
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<h1>{data.item.typeInfo.typeName}</h1>
<p>Type ID: {data.item.typeInfo.typeId}</p>
{#if data.item.marketGroup}
  <p>Market Group: {data.item.marketGroup.marketGroupName}</p>
{/if}
