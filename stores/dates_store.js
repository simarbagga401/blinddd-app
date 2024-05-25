import { defineStore } from "pinia";

export const useDatesStore = defineStore("dates", {
  state: () => {
    return {
      email: "",
      password: "",
      age: 18,
      gender: {name:'Man'},
      dates_gender: {name:'Woman'},
      age_range: [18, 25],
      match: null,
      instagram: "",
      bio:"",
      state:""
    };
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
