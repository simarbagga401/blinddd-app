<script setup>
import { useDatesStore } from "@/stores/dates_store";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { serverUrl } from "@/assets/serverUrl";

const store = useDatesStore();
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

</script>

<template>
    <form @submit.prevent="signIn">
        <h3 class="danger">{{ signInData }}</h3>
        <h1>Sign in</h1>
        <p>Username</p>
        <InputText  v-model="store.username" required />
        <p>Password</p>
        <InputText type="password"  v-model="store.password" required />
        <Button class="btn" type="submit">sign in</Button>
        <p class="instead" @click="$emit('changeSignUpState', true)">
            Sign up instead
        </p>
    </form>
</template>


<style scoped>
@import url("~/assets/css/index.css");
</style>