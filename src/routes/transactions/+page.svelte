<script lang="ts">
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<h1>Hi</h1>
<img
  src={`https://images.evetech.net/characters/${data.characterID}/portrait`}
  alt="Character portrait"
/>
