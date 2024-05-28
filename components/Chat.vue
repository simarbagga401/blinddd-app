<script setup>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { serverUrl } from "~/assets/serverUrl";
import { useDatesStore } from "@/stores/dates_store";
import { v4 as uuidv4 } from "uuid";
const store = useDatesStore();

import { db } from "~/firebase";
import { collection, doc, orderBy, setDoc } from "firebase/firestore";

let chats = useCollection(collection(db, "sam-priya"));
let msg = ref(null);

const sendMsg = async () => {
  console.log(msg.value);
  await setDoc(doc(db, "sam-priya", uuidv4()), {
    by: localStorage.getItem("email"),
    msg: msg.value,
    timestamp: Date.now(),
  });
};
</script>

<template>
  <h1>chat</h1>
  <div>
    <div class="chats">
      <template v-for="chat in chats">
        <i>{{ chat.by }}</i>
        <p>{{ chat.msg }}</p>
      </template>
    </div>
    <InputText v-model="msg" />
    <Button @click="sendMsg">send</Button>
  </div>
</template>

<style scoped></style>
