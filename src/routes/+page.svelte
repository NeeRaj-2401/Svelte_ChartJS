<script type="ts">
  import { onMount } from "svelte";
  import data from "../data.json";

  const components = {
    Radar: () => import("./../components/Radar.svelte"),
    Line: () => import("./../components/Line.svelte"),
    Bar: () => import("./../components/Bar.svelte"),
    Pie: () => import("../components/Pie.svelte"),
  };

  let gridItems = [];

  onMount(() => {
    gridItems = data.map((item) => ({
      column: `${item.columnStart} / ${item.columnEnd}`,
      row: `${item.rowStart} / ${item.rowEnd}`,
      component: item.component,
      instance: null,
    }));
  });

</script>

<!-- hard Coded component Calls -->
<!-- <div class="grid">

    <div   class="box"  style="grid-column: 3/8; grid-row: 1/3;">
        <Radar />
    </div>
    <div  class="box"  style="grid-column: 17/22; grid-row: 1/3;">
        <Bar />
    </div>
    <div class="box"  style="grid-column: 3/8; grid-row: 4/6;">
        <Pie />
    </div>
    <div class="box" style="grid-column: 17/22; grid-row: 4/6;">
        <Line />
    </div>

  </div> -->

<div class="grid">
  {#each gridItems as item, index}
    <div class="box" style="grid-column: {item.column}; grid-row: {item.row};">
      {#await components[item.component]()}
        <p>Loading...</p>
      {:then Component}
        <Component.default />
      {/await}
    </div>
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(24, 1fr);
    grid-template-rows: repeat(6, 1fr);
    gap: 8px;
    width: 100vw;
    height: 100vh;
    padding: 16px;
    box-sizing: border-box;
  }

  .box {
    /* background-color: #3498db; */
    border: 1px solid #2980b9;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
</style>
