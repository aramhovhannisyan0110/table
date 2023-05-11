<script setup lang="ts">
import { computed } from "vue";

interface TableProps {
  header?: boolean;
  footer?: boolean;
  width?: "25" | "50" | "75" | "100";
  groupDivider?: boolean;
}
// eslint-disable-next-line
const { header, footer, width } = withDefaults(defineProps<TableProps>(), {
  header: true,
  footer: true,
  groupDivider: false,
});

const tableClasses = computed(() => ["table", width && `w-${width}`]);
</script>

<template>
  <table :class="tableClasses">
    <thead v-if="header">
      <slot name="header" />
    </thead>
    <tbody :class="[groupDivider && 'table-group-divider']">
      <slot />
    </tbody>
    <tfoot v-if="footer" :class="[groupDivider && 'table-group-divider']">
      <slot name="footer" />
    </tfoot>
  </table>
</template>

<style scoped></style>
