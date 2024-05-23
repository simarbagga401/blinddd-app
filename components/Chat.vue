<script setup>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { serverUrl } from "~/assets/serverUrl";

import {io} from 'socket.io-client'
const socket = io(serverUrl)

socket.on('connect', () => {
    console.log(`connection to chat id:${socket.id}`)
})

</script>

<template>
  <h1>chat</h1>
  <div>
    <InputText />
    <Button>send</Button>
  </div>
</template>

<style scoped></style>
