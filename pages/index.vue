<script setup>
import { useDatesStore } from "@/stores/dates_store";
const store = useDatesStore();
let signUpState = ref(false);
</script>

<template>
  <main v-if="!store.signedIn">
    <img src="~/assets/SVG/3.svg" alt="" />
    <div>
      <SignUp v-show="signUpState" @changeSignUpState="(bool) => (signUpState = bool)" />
      <br />
      <SignIn v-show="!signUpState" @changeSignUpState="(bool) => (signUpState = bool)" />
    </div>
  </main>
  <main v-else>
    <FindDate />
  </main>
</template>

<style scoped>
@import url("~/assets/css/index.css");
</style>
