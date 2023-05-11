<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { HEADER_COLS, IItems } from "@/store/mask";

const store = useStore();
store.dispatch("fetchData");
const tableData = computed((): Array<IItems> => store.getters.getItemsGeneric);
const tableItems = computed((): Array<IItems> => store.getters.getItems);
const footerTotal = (key: string) => {
  return {
    [key]: tableItems.value.reduce((previousValue, currentValue) => {
      return previousValue + currentValue[key];
    }, 0),
  };
};

const footerPercent = (bigNum: number, smallNum: number) => {
  if (!bigNum || !smallNum) return 0;
  return Math.ceil((smallNum / bigNum) * 10000) / 100;
};
const footerData = ref<IItems>({});
const clickRow = (value?: string) => {
  tableData.value.map((element) => {
    if (element.parentId === value)
      element.collapseHide = !element.collapseHide;
  });
};
const rowIsClickable = computed(() => {
  return (row: IItems) => {
    return !!row?.children?.length;
  };
});

watch(
  tableItems,
  () => {
    if (!tableItems.value.length) return;

    footerData.value = {
      ...footerTotal("countView"),
      ...footerTotal("countPlay"),
      ...footerTotal("countSend"),
      ...footerTotal("countOrder"),
      ...footerTotal("countPay"),
    };
    footerData.value.viewSend = footerPercent(
      footerData.value.countView,
      footerData.value.countSend
    );
    footerData.value.viewPay = footerPercent(
      footerData.value.countPay,
      footerData.value.countPlay
    );
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>

<template>
  <div class="home">
    <TaskTable class="m-auto" width="75" groupDivider>
      <template #header>
        <TaskTableRow :cols="HEADER_COLS" />
      </template>
      <template #default>
        <template v-for="(data, index) in tableData" :key="index">
          <TaskTableRow
            :class="data.collapseHide ? 'd-none' : ''"
            @row:click="clickRow(data?.collapseId)"
            :clickable="rowIsClickable(data)"
          >
            <template #default="{ isOpen, clickable }">
              <TaskTableCol
                class="text-start"
                :class="data.classes"
                scope="row"
                colspan="4"
                :clickable="clickable"
                :isOpen="isOpen"
              >
                {{ data.title }}
              </TaskTableCol>
              <TaskTableCol>{{ data.countView }}</TaskTableCol>
              <TaskTableCol>{{ data.countPlay }}</TaskTableCol>
              <TaskTableCol>{{ data.countSend }}</TaskTableCol>
              <TaskTableCol>{{ data.countOrder }}</TaskTableCol>
              <TaskTableCol>{{ data.countPay }}</TaskTableCol>
              <TaskTableCol>{{ data.viewSend }}</TaskTableCol>
              <TaskTableCol>{{ data.viewPay }}</TaskTableCol>
            </template>
          </TaskTableRow>
        </template>
      </template>
      <template #footer>
        <TaskTableRow variant="secondary">
          <TaskTableCol is="th" class="text-start" scope="row" colspan="4">
            Итого
          </TaskTableCol>
          <TaskTableCol>{{ footerData.countView }}</TaskTableCol>
          <TaskTableCol>{{ footerData.countPlay }}</TaskTableCol>
          <TaskTableCol>{{ footerData.countSend }}</TaskTableCol>
          <TaskTableCol>{{ footerData.countOrder }}</TaskTableCol>
          <TaskTableCol>{{ footerData.countPay }}</TaskTableCol>
          <TaskTableCol>{{ footerData.viewSend }} %</TaskTableCol>
          <TaskTableCol>{{ footerData.viewPay }} %</TaskTableCol>
        </TaskTableRow>
      </template>
    </TaskTable>
  </div>
</template>
