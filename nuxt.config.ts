// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['nuxt-primevue', "@pinia/nuxt", '@vueuse/nuxt',],
  css: ['primevue/resources/themes/lara-dark-purple/theme.css' , 'primeicons/primeicons.css'],
})