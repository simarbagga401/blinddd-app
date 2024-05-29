<script setup>
import Slider from "primevue/slider";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";

import { serverUrl } from "@/assets/serverUrl";
import { useDatesStore } from "@/stores/dates_store";
const store = useDatesStore();

const formSubmitted = () => {
  console.log("finding date");
  if (store.instagram == "") {
    $fetch(`${serverUrl}/find_date`, {
      method: "POST",
      body: {
        email: localStorage.getItem("email"),
        age: store.age,
        bio: store.bio,
        state: store.state.name,
        gender: store.gender.name,
        dates_gender: store.dates_gender.name,
        age_range: store.age_range,
        match: store.match,
      },
    })
      .then((res) => {
        setTimeout(async () => {
          console.log("wating 2 secs");
          console.log(res);
          await navigateTo("/");
          location.reload();
        }, 500);
      })
      .catch((err) => console.log(err));
  } else {
    $fetch(`${serverUrl}/find_date`, {
      method: "POST",
      body: {
        email: localStorage.getItem("email"),
        age: store.age,
        gender: store.gender.name,
        instagram: store.instagram,
        bio: store.bio,
        state: store.state.name,
        dates_gender: store.dates_gender.name,
        age_range: store.age_range,
        match: store.match,
      },
    })
      .then((res) => {
        setTimeout(async () => {
          console.log("wating 2 secs");
          await navigateTo("/");
          console.log(res);
          location.reload();
        }, 500);
      })
      .catch((err) => console.log(err));
  }
};

const genderOptions = ref([{ name: "Man" }, { name: "Woman" }]);
const age_range = ref([18, 80]);
</script>

<template>
  <form id="header" @submit.prevent="formSubmitted">
    <section>
      <h1 class="heading">Age</h1>
      <Slider class="input" :min="18" :max="80" v-model="store.age" required />
      {{ store.age }}
    </section>

    <section>
      <h1 class="heading">Gender:</h1>
      <Dropdown
        v-model="store.gender"
        :options="genderOptions"
        optionLabel="name"
        placeholder="Your Gender"
        class="w-full md:w-14rem"
        required
      />
    </section>

    <section>
      <h1 class="heading">Date's Gender:</h1>
      <Dropdown
        v-model="store.dates_gender"
        :options="genderOptions"
        optionLabel="name"
        placeholder="Date's Gender"
        class="w-full md:w-14rem"
        required
      />
    </section>

    <section>
      <h1 class="heading">Age Range:</h1>
      <Slider
        class="input"
        range
        v-model="store.age_range"
        :min="18"
        :max="80"
        required
      />
      <p>{{ store.age_range }}</p>
    </section>

    <Button type="submit">Find date</Button>
  </form>
</template>

<style scoped>
#header {
  padding: 10px;
  height: 60%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

section {
  height: 150px;
  width: 20%;
  /* display: flex;
  flex-direction: column;
  justify-content:space-evenly; */
}

.heading {
  font-weight: 500;
  font-size: 20px;
}

@media screen and (max-width: 680px) {
  #header {
    align-items: flex-start;
  }
  .input {
    width: 200px;
  }

  #email {
    width: 100px;
  }
}
</style>
