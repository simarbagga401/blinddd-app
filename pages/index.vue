<script setup>
import Button from "primevue/button";
import InputText from "primevue/inputtext";

import { serverUrl } from "@/assets/serverUrl";
import { useDatesStore } from "@/stores/dates_store";
import { ref } from "vue";
const store = useDatesStore();
const router = useRoute();

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
      if (data.data.msg == "sign in successful") {
        const match = await axios.post(`${serverUrl}/check_match`, {
          username: store.username,
        });
        if (match.data == "") {
          router.push("/bio");
        } else {
          router.push("/find_date");
        }
        signInData.value = data.data.msg;
      } else {
        signInData.value = data.data.msg;
      }
    })
    .catch((err) => console.log(err));
};

const signUp = () => {
  axios
    .post(`${serverUrl}/sign_up`, {
      username: store.username,
      password: store.password,
    })
    .then((data) => {
      signUpData.value = data.data;
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
        <InputText
          type="password"
          id="password"
          v-model="store.password"
          required
        />
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
        <InputText
          type="password"
          id="password"
          v-model="store.password"
          required
        />
        <Button class="btn" type="submit">sign in</Button>
        <p class="instead" @click="signUpState = !signUpState">
          Sign up instead
        </p>
      </form>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  width: 100%;
  height: 100%;
}
.btn {
  margin-left: 10px;
  margin-top: 10px;
}
p.instead {
  text-decoration: underline;
}
img {
  width: clamp(200px, 20%, 400px);
}
</style>
