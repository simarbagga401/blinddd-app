<script setup>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { v4 as uuidv4 } from "uuid";
import { db } from "~/firebase";
import { collection, doc, orderBy, setDoc, query } from "firebase/firestore";
import { sortStrings } from "~/utils/sortStrings";


const collectionName = sortStrings(
  localStorage.getItem("email"),
  localStorage.getItem("match")
);

let chats = await useCollection(
  query(collection(db, collectionName), orderBy("timestamp"))
);

let msg = ref(null);
let email = localStorage.getItem("email");

const sendMsg = async () => {
  console.log(msg.value);
  await setDoc(doc(db, collectionName, uuidv4()), {
    by: localStorage.getItem("email"),
    msg: msg.value,
    timestamp: Date.now(),
  });
  document.getElementById("dummy").scrollIntoView();
  document.getElementById('input').value = ''
};
</script>

<template>
  <h1>chat</h1>
  <div>
    <div class="chats">
      <div :class="{ me: chat.by == email }" class="chat" v-for="chat in chats">
        <i>{{ chat.by }} :</i>
        <p>{{ chat.msg }}</p>
      </div>
      <div id="dummy"></div>
    </div>
    <InputText id="input" v-model="msg" />
    <Button @click="sendMsg" id="sendMsg">send</Button>
  </div>
</template>

<style scoped>
#input{
  margin-top:10px;
}
#sendMsg{
  margin-top:10px;
}

i {
  font-size: 15px;
  color:#673ab7;
}
.chat {
  /* background: orange; */
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 5px;
}
.me {
  align-items: flex-end;
}
.chats {
  width: 100%;
  height: 500px;
  overflow: scroll;
  /* background: yellow; */
  border: 2px solid;
  border-radius: 5px;
  padding: 10px;
}
</style>
