<script setup lang="ts">
</script>

<template>
  <main>
    <NuxtLink to='/' class="logo">
      Blinddd <i>Straightforward way to dating</i>
    </NuxtLink>
    <NuxtPage />
  </main>
</template>

<style scoped>
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
  color:rgb(30, 0, 39);
  color:#673ab7;
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