<script lang="ts">
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<h1>{data.item.name}</h1>
<p>Type ID: {data.item.id}</p>
