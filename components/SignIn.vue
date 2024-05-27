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
            email: store.email,
            password: store.password,
        },
    })
        .then(async (data) => {
            if (data.msg == "sign in successful") {
                localStorage.setItem("email",store.email)
                const match = await $fetch(`${serverUrl}/check_match`, {
                    method: 'POST',
                    body: {
                        email: store.email,
                    }
                });
                if (match == "") {
                   await navigateTo('/bio')
                   location.reload()
                } else {
                    await  navigateTo('/')
                    location.reload()
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
        <p>Email:</p>
        <InputText class="input" type="email" v-model="store.email" required />
        <p>Password:</p>
        <InputText class="input" type="password"  v-model="store.password" required />
        <br>
        <Button class="btn" type="submit">sign in</Button>
        <p class="instead" @click="$emit('changeSignUpState', true)">
            Sign up instead
        </p>
    </form>
</template>


<style scoped>
@import url("~/assets/css/index.css");
</style>