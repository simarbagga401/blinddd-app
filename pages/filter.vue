<script setup>
import Slider from 'primevue/slider'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'

import router from '@/router'
import { useDatesStore } from '@/stores/dates_store'
import MultiSlider from '@vueform/slider'
import axios from 'axios'
import { ref } from 'vue'
import { serverUrl } from '@/assets/serverUrl'
const store = useDatesStore()

const formSubmitted = () => {
  console.log('finding date')
  axios
    .post(`${serverUrl}/find_date`, {
      username: store.username,
      instagram: store.instagram,
      age: store.age,
      gender: store.gender.name,
      dates_gender: store.dates_gender.name,
      age_range: store.age_range,
      match: store.match
    })
    .then((res) => {
      setTimeout(() => {
        console.log('wating 2 secs')
        router.push('/find_date')
        console.log(res.data)
      }, 500)
    })
    .catch((err) => console.log(err))
}

const genderOptions = ref([{ name: 'Man' }, { name: 'Woman' }])
</script>

<template>
  <form id="header" @submit.prevent="formSubmitted">
    <section>
      <h1 class="heading">Age</h1>
      <Slider :min="18" :max="80" v-model="store.age" required />
      {{ store.age }}
    </section>

    <section>
      <h1 class="heading">Gender</h1>
      <Dropdown
        v-model="store.gender"
        :options="genderOptions"
        optionLabel="name"
        placeholder="Your Gender"
        class="w-full md:w-14rem"
      />
    </section>

    <section>
      <h1 class="heading">Date's Gender</h1>
      <Dropdown
        v-model="store.dates_gender"
        :options="genderOptions"
        optionLabel="name"
        placeholder="Date's Gender"
        class="w-full md:w-14rem"
      />
    </section>

    <section>
      <h1 class="heading">Age Range</h1>
      <MultiSlider class="slider-purple" :min="18" :max="80" v-model="store.age_range" />
    </section>

    <Button type="submit">Find date</Button>
  </form>
</template>

<style src="@vueform/slider/themes/default.css"></style>
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
  header {
    align-items: flex-start;
  }
  #username {
    width: 100px;
  }
}
</style>
