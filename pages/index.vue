<script setup>
import Button from "primevue/button";
import InputText from "primevue/inputtext";

import { serverUrl } from "@/assets/serverUrl";
import { useDatesStore } from "@/stores/dates_store";
const store = useDatesStore();


let signUpState = ref(false);
let signUpData = ref();
let signInData = ref();

const signIn = () => {
  $fetch(`${serverUrl}/sign_in`, {
    method: "POST",
    body: {
      username: store.username,
      password: store.password,
    },
  })
    .then(async (data) => {
      if (data.msg == "sign in successful") {
        const match = await $fetch(`${serverUrl}/check_match`, {
          method: 'POST',
          body: {
            username: store.username,
          }
        });
        if (match == "") {
          navigateTo('/bio')
        } else {
          navigateTo('/find-date')
        }
        signInData.value = data.msg;
      } else {
        signInData.value = data.msg;
      }
    })
    .catch((err) => console.log(err));
};

const signUp = () => {
  $fetch(
    `${serverUrl}/sign_up`,
    {
      method: "POST", body: {

        username: store.username,
        password: store.password,
      }
    }
  )
    .then((data) => {
      signUpData.value = data;
      console.log(data);
    })
    .catch((err) => console.log(err));
};
</script>

<template>
  <main>
    <img src="~/assets/SVG/3.svg" alt="" />
    <div>
      <form v-show="signUpState" @submit.prevent="signUp">
        <h3>{{ signUpData }}</h3>
        <h1>Sign up</h1>
        <p>Username</p>
        <InputText id="username" v-model="store.username" required />
        <p>Password</p>
        <InputText type="password" id="password" v-model="store.password" required />
        <Button class="btn" type="submit">sign up</Button>
        <p class="instead" @click="signUpState = !signUpState">
          Sign in instead
        </p>
      </form>
      <br />
      <form v-show="!signUpState" @submit.prevent="signIn">
        <h3>{{ signInData }}</h3>
        <h1>Sign in</h1>
        <p>Username</p>
        <InputText id="username" v-model="store.username" required />
        <p>Password</p>
        <InputText type="password" id="password" v-model="store.password" required />
        <Button class="btn" type="submit">sign in</Button>
        <p class="instead" @click="signUpState = !signUpState">
          Sign up instead
        </p>
      </form>
    </div>
  </main>
</template>

<style scoped>
@import url("~/assets/css/index.css");
</style>
