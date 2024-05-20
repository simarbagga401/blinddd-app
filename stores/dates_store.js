import { defineStore } from "pinia";

export const useDatesStore = defineStore("dates", {
  state: () => {
    return {
      username: "",
      password: "",
      age: 18,
      gender: "",
      dates_gender: "",
      age_range: [18, 25],
      match: null,
      instagram: "",
    };
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
