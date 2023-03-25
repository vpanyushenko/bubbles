<script>
  import { scale, fade } from "svelte/transition";
  import { quintOut } from "svelte/easing";
</script>

<div
  in:scale={{
    duration: 1500,
    delay: 400,
    opacity: 0,
    start: 0.5,
    easing: quintOut,
  }}
>
  <slot />
</div>

<style>
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transition: all 0.1s ease;
    transition: transform 0.4s;
    width: 100%;
  }</style>
