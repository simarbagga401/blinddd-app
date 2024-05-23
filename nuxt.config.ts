// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "~/assets/css/main.css",
    "primevue/resources/themes/md-light-deeppurple/theme.css",
  ],
  modules: ["nuxt-primevue", "@pinia/nuxt",],
});
