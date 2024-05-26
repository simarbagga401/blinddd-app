<script setup>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import { useDatesStore } from "@/stores/dates_store";
import { serverUrl } from "~/assets/serverUrl";
const store = useDatesStore();

let payload = ref("");
onMounted(() => {
  $fetch(`${serverUrl}/profile_settings`, {
    method: "POST",
    body: {
      email: localStorage.getItem("email"),
    },
  })
    .then((res) => {
      payload.value = res;
    })
    .catch((e) => console.log(e));
});


const formData = new FormData();
const handleImage = (e) => {
  if (e.target.files[0].size > 5242880) {
    alert("image size is too big");
    let form = document.getElementById("header");
    form.reset();
    return;
  } else {
    let selectedFile = document.querySelector("#userImage");
    let reader = new FileReader();

    reader.onload = function (event) {
      selectedFile.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);

    formData.append("file", e.target.files[0]);
    formData.append("email", localStorage.getItem("email"));
  }
};

const updateProfile = () => {
  formData.append("password", payload.value.password);
  formData.append("instagram", payload.value.instagram);
  formData.append("bio", payload.value.bio);

  if (formData.get("file") == null) {
    $fetch(`${serverUrl}/profile_settings`, {
      method: "PUT",
      body: {
        email: localStorage.getItem("email"),
        password: payload.value.password,
        instagram: payload.value.instagram,
        bio: payload.value.bio,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  } else {
    $fetch(
      `${serverUrl}/profile_settings`,
      { method: "PUT", body: formData },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }
};

const deleteProfile = () => {
  console.log("delete profile ran");
  $fetch(`${serverUrl}/profile_settings`, {
    method: "DELETE",
    body: { username: localStorage.getItem("email") },
  })
    .then((res) => {
      console.log(res);
      const signOut = async () => {
        await navigateTo("/");
        localStorage.setItem("email", "null");
        location.reload();
      };
      signOut();
    })
    .catch((e) => console.log(e));
};
</script>

<template>
  <form id="header" @submit.prevent="updateProfile">
    <h1>Profile Settings</h1>
    <img id="userImage" :src="payload.userImageLink" />
    <h1 class="heading">Image</h1>
    <input type="file" accept="image/*" @change="handleImage" />

    <section>
      <p>Password:</p>
      <InputText v-model="payload.password" required />
    </section>

    <section>
      <p>Instagram:</p>
      <InputText v-model="payload.instagram" required />
    </section>

    <section>
      <p>Bio:</p>
      <Textarea v-model="payload.bio" rows="2" cols="19" />
    </section>
    <Button type="submit" class="btn">Update</Button>
    <Button class="btn danger" @click="deleteProfile">Delete Profile</Button>
  </form>
</template>

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

.danger {
  background: #ff2d2d;
}
.btn {
  margin: 10px;
}

.heading {
  font-weight: 500;
  font-size: 20px;
}

img {
  width: clamp(200px, 40%, 400px);
  border-radius: 7px;
}

@media screen and (max-width: 680px) {
  #header {
    align-items: flex-start;
  }
}
</style>
