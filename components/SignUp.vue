<script setup>
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { serverUrl } from "@/assets/serverUrl";
import { useDatesStore } from "@/stores/dates_store";
const store = useDatesStore();

let signUpData = ref();

const signUp = () => {
    $fetch(
        `${serverUrl}/sign_up`,
        {
            method: "POST", body: {

                email: store.email,
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


useHead({
  head: {
    title: "Sign Up",
    meta: [
      {
        hid: "description",
        name: "description",
        content: "Sign Up for Blinddd",
      },
    ],
  },
});
</script>

<template>
    <form @submit.prevent="signUp">
        <h3 class="danger">{{ signUpData }}</h3>
        <h1>Sign up</h1>
        <p>Email:</p>
        <InputText class="input" type="email"  v-model="store.email" required />
        <p>Password:</p>
        <InputText class="input" type="password"  v-model="store.password" required />
        <br>
        <Button class="signup btn" type="submit">sign up</Button>
        <p class="instead" @click="$emit('changeSignUpState',false)">
            Sign in instead
        </p>
    </form>
</template>


<style scoped>
@import url("~/assets/css/index.css");
</style>