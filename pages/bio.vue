<script setup>
import { State } from "country-state-city";
let states = ref();

onMounted(() => {
  const allStates = computed(() => State.getAllStates());
  const statesArray = allStates.value.map((state) => state.name);
  states.value = statesArray.map((state) => ({ name: state }));
});

const filteredStates = ref();
const search = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            filteredStates.value = [...states.value];
        } else {
            filteredStates.value = states.value.filter((state) => {
                return state.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 250);
}

import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Textarea from "primevue/textarea";

import { serverUrl } from "@/assets/serverUrl";
import { useDatesStore } from "@/stores/dates_store";
const store = useDatesStore();

const formData = new FormData();

const handleImage = (e) => {
  if (e.target.files[0].size > 5242880) {
    alert("image size is too big");
    let form = document.getElementById("header");
    form.reset();
    return;
  } else {
    let selectedFile = document.querySelector("#userImage");
    let reader = new FileReader();

    reader.onload = function (event) {
      selectedFile.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);

    formData.append("file", e.target.files[0]);
    formData.append("email", localStorage.getItem("email"));
  }
};

const formSubmitted = () => {
  $fetch(
    `${serverUrl}/upload_image`,
    { method: "POST", body: formData },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
  navigateTo("/filter");
};
</script>

<template>
  <form
    id="header"
    @submit.prevent="formSubmitted"
    enctype="multipart/form-data"
  >
    <img id="userImage" alt="" />
    <section>
      <h1 class="heading">Image:</h1>
      <input type="file" accept="image/*" @change="handleImage" required />
    </section>

    <section>
      <h1 class="heading">Instagram:</h1>
      <InputText id="input" v-model="store.instagram" required />
    </section>

    <section>
      <h1 class="heading">Bio:</h1>
      <Textarea v-model="store.bio" rows="2" cols="19" />
    </section>

    <section>
      <h1 class="heading">State:</h1>
      <AutoComplete
        v-model="store.state"
        optionLabel="name"
        :suggestions="filteredStates"
        @complete="search"
      />
    </section>

    <Button type="submit">Next</Button>
  </form>
</template>

<style src="@vueform/slider/themes/default.css"></style>
<style scoped>
#header {
  padding: 10px;
  height: 55%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

img {
  width: clamp(130px, 40%, 200px);
  border-radius: 7px;
}

section {
  height: 150px;
  width: 20%;
}

.heading {
  font-weight: 500;
  font-size: 20px;
}

@media screen and (max-width: 680px) {
  #header {
    align-items: flex-start;
  }

  #input {
    width: 250px;
  }
}
</style>
