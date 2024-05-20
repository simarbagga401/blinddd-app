<script setup>
import Button from "primevue/button";

import { serverUrl } from "@/assets/serverUrl";
import { useDatesStore } from "@/stores/dates_store";
const store = useDatesStore();

let match = ref("Date not found");

onMounted(async () => {
  try {
    const data = await $fetch(`${serverUrl}/find_match`, {
      method: "POST",
      body: { username: localStorage.getItem('username') },
    });
    console.log(data);
    if (data == "not found" || data == "") {
      match.value = "Date not found";
    } else {
      match.value = data;
    }
  } catch (error) {
    console.log(error);
  }
});

const retryDate = () => {
  $fetch(`${serverUrl}/retry_date`, {
    body: {
      username:localStorage.getItem('username'),
      match: match.value.match,
    }, method: 'POST'
  })
    .then((res) => console.log(res))
    .catch((e) => console.log(e));
  navigateTo("/bio");
};
</script>

<template>
  <img v-if="match == 'Date not found'" src="~/assets/SVG/2.svg" alt="" />
  <div v-if="match == 'Date not found'">
    <h1>Date will be Found Soon!</h1>
    <p>Come back again after a while...</p>
  </div>
  <div v-else>
    <h1>Date Found</h1>
    <img :src="match.userImageLink" alt="userImage" />
    <p><span>Name:</span> {{ match.username }}</p>
    <p><span>Instagram:</span> {{ match.instagram }}</p>
    <p><span>Age:</span> {{ match.age }}</p>
    <p><span>Date's Location:</span> {{ match.date_location }}</p>
  </div>
  <div v-if="match != 'Date not found'">
    <Button class="danger" @click="retryDate">Cancel and Retry</Button>
  </div>
</template>

<style scoped>
.danger {
  background: #ff2d2d;
}

span {
  font-weight: bold;
}

div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

img {
  width: clamp(200px, 40%, 400px);
  border-radius: 7px;
}
</style>
