import { createStore } from "vuex";
import { AxiosError, AxiosResponse } from "axios";
import { request } from "@/utils/request";
import { IItems } from "@/store/mask";
import { dataGenerator } from "@/utils/dataGenerator";

export default createStore({
  state: {
    items: {} as Array<IItems>,
    genericItems: {} as Array<IItems>,
    count: 0,
  },
  getters: {
    getItems(state) {
      return state.items;
    },
    getItemsGeneric(state) {
      return state.genericItems;
    },
    getCount(state) {
      return state.count;
    },
  },
  mutations: {
    SET_ITEMS(state, value) {
      state.items = value;
      state.genericItems = dataGenerator(value);
    },
    SET_COUNT(state, value) {
      state.count = value;
    },
  },
  actions: {
    fetchData({ commit }) {
      return new Promise((resolve, reject) => {
        const { axios, url } = request("get", "data");
        axios
          .get(url)
          .then((response: AxiosResponse) => {
            const { items, count } = response.data;
            commit("SET_ITEMS", items);
            commit("SET_COUNT", count);
            resolve(response.data);
          })
          .catch((errors: AxiosError) => {
            console.error(errors.message);
            reject(errors);
          });
      });
    },
  },
});
