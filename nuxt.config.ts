// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['primeicons/primeicons.css' , 
    'public/mdc-dark-deeppurple/theme.css'
  ],
  modules: ['nuxt-primevue'  , '@pinia/nuxt', '@vueuse/nuxt']
})
