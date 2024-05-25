import { defineStore } from "pinia";

export const useDatesStore = defineStore("dates", {
  state: () => {
    return {
      email: "",
      password: "",
      age: 18,
      gender: "Man",
      dates_gender: "Woman",
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
