<script setup lang="ts">
import { useDatesStore } from "@/stores/dates_store";
const store = useDatesStore();

let user:Ref<string | null> = ref('null');
onMounted(() => {
  user.value = localStorage.getItem("username");
});

const signOut = async() => {
  await navigateTo("/");
  localStorage.setItem("username", "null");
  location.reload();
};
</script>

<template>
  <main>
    <header>
      <NuxtLink to="/" class="logo">
        Blinddd
      </NuxtLink>
      <p v-if="user !== 'null' && user !== null" class="sign-out" @click="signOut">
        sign out
      </p>
    </header>
    <NuxtPage />
  </main>
</template>

<style scoped>
header {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-around;
}

.sign-out {
  color: #ff2d2d;
  text-decoration: underline;
  align-self: center;
  justify-self: end;
  cursor: pointer;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 10px;
}

.logo {
  color: rgb(33, 33, 33);
  font-weight: bold;
  font-size: 70px;
  text-decoration: none;
}

i {
  color: rgb(30, 0, 39);
  color: #673ab7;
  font-weight: 500;
  font-size: 20px;
}

@media screen and (max-width: 680px) {
  .logo {
    font-size: 40px;
  }

  i {
    font-size: 10px;
  }
}
</style>
