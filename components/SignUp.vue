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

</script>

<template>
    <form @submit.prevent="signUp">
        <h3 class="danger">{{ signUpData }}</h3>
        <h1>Sign up</h1>
        <p>Email:</p>
        <InputText type="email"  v-model="store.email" required />
        <p>Password:</p>
        <InputText type="password"  v-model="store.password" required />
        <Button class="signup btn" type="submit">sign up</Button>
        <p class="instead" @click="$emit('changeSignUpState',false)">
            Sign in instead
        </p>
    </form>
</template>


<style scoped>
@import url("~/assets/css/index.css");
</style>