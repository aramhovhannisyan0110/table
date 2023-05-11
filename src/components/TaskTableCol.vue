<script setup lang="ts">
import { useAttrs } from "vue";

export interface TableColProps {
  is?: "th" | "td";
  clickable?: boolean;
  isOpen?: boolean;
}
// eslint-disable-next-line
const { is } = withDefaults(defineProps<TableColProps>(), {
  is: "td",
  clickable: false,
  isOpen: false,
});
const attributes = useAttrs();
</script>

<template>
  <component :is="is" v-bind="attributes">
    <template v-if="clickable">
      <i v-if="isOpen" class="bi bi-chevron-down"></i>
      <i v-else class="bi bi-chevron-right"></i>
    </template>
    <slot />
  </component>
</template>

<style scoped></style>
