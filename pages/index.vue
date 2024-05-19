<script setup>
let signUpState = ref(false);
</script>

<template>
  <main>
    <img src="~/assets/SVG/3.svg" alt="" />
    <div v-if="!signIn">
      <SignUp v-show="signUpState" @changeSignUpState="(bool) => (signUpState = bool)" />
      <br />
      <SignIn v-show="!signUpState" @changeSignUpState="(bool) => (signUpState = bool)" />
    </div>
  </main>
</template>

<style scoped>
@import url("~/assets/css/index.css");
</style>
