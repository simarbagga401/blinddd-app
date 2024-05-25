<script setup lang="ts">
import Menu from "primevue/menu";
import Button from "primevue/button";
import { ref } from "vue";

import { useDatesStore } from "@/stores/dates_store";
const store = useDatesStore();

let user: Ref<string | null> = ref("null");
onMounted(() => {
  user.value = localStorage.getItem("email");
});

const signOut = async () => {
  await navigateTo("/");
  localStorage.setItem("email", "null");
  location.reload();
};

const menu = ref();
const items = ref([
  {
    label: "Profile",
    items: [
      {
        label: "Settings",
        icon: "pi pi-cog",
        command:() => {
          navigateTo('/settings')
        }
      },
      {
        label: "Sign out",
        icon: "pi pi-sign-out",
        command:() => {
          signOut();
        }
      },
    ],
  },
]);

const toggle = (event: any) => {
  menu.value.toggle(event);
};
</script>

<template>
  <main>
    <header>
      <NuxtLink to="/" class="logo"> Blinddd </NuxtLink>

      <Button
        id="hamburger-icon"
        type="button"
        icon=" pi pi-bars"
        @click="toggle"
        aria-haspopup="true"
        aria-controls="overlay_menu"
        v-if="user !== 'null' && user !== null"
      />
      <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
    </header>
    <NuxtPage />
  </main>
</template>

<style scoped>
header {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}

#hamburger-icon{
  width: 30px;
  height: 30px;
  color:#673ab7;
  background-color: white;
  border:#673ab7 2px solid ;
  justify-self:flex-end;
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
  padding: 20px;
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
