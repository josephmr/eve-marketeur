<script lang="ts">
  import type { PageProps } from "./$types";
  import * as Card from "$lib/components/ui/card";

  let { data }: PageProps = $props();
</script>

<Card.Root class="w-full max-w-xl">
  <Card.Header>
    <Card.Title>{data.typeInfo.typeName}</Card.Title>
  </Card.Header>
  <Card.Content>
    <p>Type ID: {data.typeInfo.typeId}</p>
  </Card.Content>
</Card.Root>
