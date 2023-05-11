<script setup lang="ts">
import { computed, ref, useSlots } from "vue";
import { TableColProps } from "@/components/TaskTableCol.vue";

export interface RowColProps extends TableColProps {
  text: string;
  attr?: any;
}
interface TableRowProps {
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
  cols?: Array<RowColProps>;
  clickable?: boolean;
}
interface TableColEmits {
  (event: "row:click", value: boolean): void;
}
const slots = useSlots();
// eslint-disable-next-line
const emits = defineEmits<TableColEmits>();
// eslint-disable-next-line
const { variant, cols, clickable } = withDefaults(
  // eslint-disable-next-line
  defineProps<TableRowProps>(),
  {
    clickable: false,
  }
);

const tableRowClasses = computed(() => [variant && `table-${variant}`]);
const colView = computed(() => !slots.default && cols && cols.length);
const isOpen = ref<boolean>(false);
const openRow = () => {
  if (!clickable) return;
  isOpen.value = !isOpen.value;
  emits("row:click", isOpen);
};
</script>

<template>
  <tr :class="tableRowClasses" @click="openRow">
    <template v-if="colView">
      <TaskTableCol
        v-for="(col, index) in cols"
        :key="index"
        :is="col.is"
        v-bind="col.attr"
        v-html="col.text"
        :isOpen="isOpen"
        :clickable="clickable"
      />
    </template>
    <slot v-else :isOpen="isOpen" :clickable="clickable" />
  </tr>
</template>

<style scoped></style>
