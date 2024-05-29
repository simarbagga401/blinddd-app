// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "~/assets/css/main.css",
    "primevue/resources/themes/md-light-deeppurple/theme.css",
  ],
  modules: [
    "nuxt-primevue",
    "@pinia/nuxt",
    "nuxt-vuefire",
    "@nuxtjs/sitemap",
  ],
  vuefire: {
    config: {
      apiKey: "AIzaSyC0o27iPv_Q8uiuKbIxUp8aAoivZniz300",
      authDomain: "blindddchat.firebaseapp.com",
      projectId: "blindddchat",
      storageBucket: "blindddchat.appspot.com",
      messagingSenderId: "471241017972",
      appId: "1:471241017972:web:d5117e089830348709df21",
      measurementId: "G-B6SDRRJ84K",
    },
  },
  app: {
    head: {
      title: "Straightforward Way to Dating",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content:
            "Blindd is Dating App to find dates quickly without any hassle",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
});
