// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['nuxt-primevue', "@pinia/nuxt", '@vueuse/nuxt',],
  css: ['primevue/resources/themes/aura-light-green/theme.css' , 'primeicons/primeicons.css'],
})