<script setup>
import { useDatesStore } from "@/stores/dates_store";
const store = useDatesStore();
let signUpState = ref(false);
let user = ref('null');
onMounted(() => {
  user.value = localStorage.getItem("email");
});
</script>

<template>
  <main v-if="user === null || user === 'null' ">
    <img src="~/assets/SVG/3.svg" alt="" />
    <div>
      <SignUp
        v-show="signUpState"
        @changeSignUpState="(bool) => (signUpState = bool)"
      />
      <br />
      <SignIn
        v-show="!signUpState"
        @changeSignUpState="(bool) => (signUpState = bool)"
      />
    </div>
  </main>
  <main v-else>
    <FindDate />
  </main>
</template>

<style scoped>
@import url("~/assets/css/index.css");
</style>
