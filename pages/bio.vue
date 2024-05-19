<script setup>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

import { serverUrl } from '@/assets/serverUrl'
import { useDatesStore } from "@/stores/dates_store";
const store = useDatesStore();

const formData = new FormData()

const handleImage = (e) => {
  if (e.target.files[0].size > 4194304) {
    alert('image size is too big')
  } else {
    let reader = new FileReader()
    let selectedFile = document.getElementById('userImage')

    reader.onload = function (event) {
      selectedFile.src = event.target.result
    }
    reader.readAsDataURL(e.target.files[0])

    formData.append('file', e.target.files[0])
    formData.append('username', store.username)
  }
}

const formSubmitted = () => {
  $fetch(`${serverUrl}/upload_image`, { method: 'POST', body: formData }, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => console.log(err))
  navigateTo('/filter')
}
</script>

<template>
  <form id="header" @submit.prevent="formSubmitted" enctype="multipart/form-data">
    <img id="userImage" alt="" />
    <section>
      <h1 class="heading">Image</h1>
      <input type="file" accept="image/*" @change="handleImage" required />
    </section>

    <section>
      <h1 class="heading">Instagram</h1>
      <InputText id="username" v-model="store.instagram" required />
    </section>

    <Button type="submit">Next</Button>
  </form>
</template>

<style src="@vueform/slider/themes/default.css"></style>
<style scoped>
#header {
  padding: 10px;
  height: 55%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

img {
  width: clamp(130px, 40%, 200px);
  border-radius: 7px;
}

section {
  height: 150px;
  width: 20%;
}

.heading {
  font-weight: 500;
  font-size: 20px;
}

@media screen and (max-width: 680px) {
  header {
    align-items: flex-start;
  }

  #username {
    width: 100px;
  }
}
</style>
